import models from "../../models/postgreSQL/associations";
import { sequelize } from "../../models/postgreSQL/associations";
import { registrationValidation, loginValidation, resetPasswordValidation } from "../../utils/validators";
import { hashPassword, verifyPassword } from "../../utils/hashUtils";
import { DATE, NOW, Op, where } from "sequelize";
import { generateAccessToken, verifyAccessToken, generateRefreshToken, verifyRefreshToken, hashToken } from "../../utils/tokenUtils";
import { storeRefreshToken, getRefreshToken, deleteRefreshToken, revokeAllUserTokens, hasRefreshToken, getEmailVerificationToken, deleteEmailVerificationToken, storeEmailVerificationToken, getResendEmailCooldown, storeResetPasswordToken, getResetPasswordToken, deleteResetPasswordToken } from "../../utils/redisUtils";
import { sendVerificationEmail } from "../../services/verificationEmailService";
import { sendResetPasswordEmail } from "../../services/resetPasswordEmailService";

const { User } = models;

const TTL_SECONDS = 30 * 24 * 60 * 60; // 30 Days

// Helper options for HttpOnly Refresh Cookie
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "strict",
    maxAge: TTL_SECONDS * 1000 // milliseconds
};

/**
 * @desc      Register a new user account or resend verification for unverified accounts
 * @route     POST /api/v1/auth/register
 * @access    Public
 * @param     {Object} req - Express request object containing registration details in body
 * @param     {Object} res - Express response object
 * @param     {Function} next - Express next middleware function
 * @returns   {Promise<Response>} 201 Created on success, 200 OK if unverified email resend, or error status
 */

export const register = async (req, res, next) => {
    try {
        const { error } = registrationValidation.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const { email, phone_number, display_name, username, password, gender, role, birthdate } = req.body;

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email: email }, { phone_number: phone_number }],
            },
        });

        if (existingUser && existingUser.is_email_verified === true) {
            const conflictField = existingUser.email === email ? "Email" : "Phone Number";
            return res.status(409).json({
                success: false,
                message: `User with this ${conflictField} already exists`,
            });
        }

        // now if there is a exisitingUser means he has not verified his email. 
        // so just tell them to verify. if new password is provided it will not be updated. Old password stays. username also stays old
        // if they want to update they can update later by going in to the profile.
        if (existingUser && existingUser.is_email_verified === false) {
            // await existingUser.destroy();
            const { error } = resetPasswordValidation.valid(password);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.details[0].message,
                });
            }
            existingUser.password_hash = await hashPassword(password);
            if (display_name) {
                existingUser.display_name = display_name;
            }
            await existingUser.save();

            // Generate raw verification token and hash it for Redis
            const rawToken = crypto.randomUUID();
            const hashedToken = hashToken(rawToken);

            // Store token in Redis (1-hour expiration = 3600 seconds)
            await storeEmailVerificationToken(user.user_id, hashedToken);
            // store email cool down in redis with 2 min expiration
            await storeEmailVerificationToken(user.user_id);

            // sending verification mail
            await sendVerificationEmail(user.email, user.display_name, rawToken);

            return res.status(200).json({
                success: true,
                message: "Account exists but was unverified. We have sent a new verification link to your email. Verify and then login again"
            });

        }

        const existingUsername = await User.findOne({
            where: {
                username: username
            }
        });

        if (existingUsername) {
            return res.status(409).json({
                success: false,
                message: `User with this username already exists`,
            });
        }

        const password_hash = await hashPassword(password);

        const user = await User.create({
            email: email,
            phone_number: phone_number,
            display_name: display_name,
            username: username,
            password_hash: password_hash,
            gender: gender || 'other',
            role: role || 'user',
            birthdate: birthdate || null,
        });

        // Generate raw verification token and hash it for Redis
        const rawToken = crypto.randomUUID();
        const hashedToken = hashToken(rawToken);

        // Store token in Redis (1-hour expiration = 3600 seconds)
        await storeEmailVerificationToken(user.user_id, hashedToken);
        // store email cool down in redis with 2 min expiration
        await storeEmailVerificationToken(user.user_id);

        // sending verification mail
        await sendVerificationEmail(user.email, user.display_name, rawToken);

        const userResponse = user.toJSON();
        delete userResponse.password_hash;

        return res.status(201).json({
            success: true,
            message: "User created Successfully",
            data: userResponse
        });

    } catch (error) {
        next(error);
    }
}

/**
 * @desc      Authenticate user with credentials & issue JWT tokens (Access + HttpOnly Refresh Cookie)
 * @route     POST /api/v1/auth/login
 * @access    Public
 * @param     {Object} req - Express request object containing email/phone_number and password
 * @param     {Object} res - Express response object
 * @param     {Function} next - Express next middleware function
 * @returns   {Promise<Response>} 200 OK with Access Token & set Refresh Cookie, or 401/403 status
 */

export const login = async (req, res, next) => {
    try {
        const { error, value } = loginValidation.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const { email, phone_number, password } = value;

        const searchCondition = email ? { email } : { phone_number };

        const user = await User.findOne({
            where: searchCondition,
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: `User with ${searchCondition} does not exists`
            });
        }

        const is_email_verified = user.is_email_verified;
        if (!is_email_verified) {
            return res.status(403).json({
                "success": false,
                "message": "Your email is not verified. Please check your inbox or request a new verification link."
            });
        }

        const userPassword = user.password_hash;

        const isMatch = await verifyPassword(userPassword, password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Wrong Password. Please recheck and retry",
            });
        }

        // now whent the password matches and the user is valid we need to do the following
        // 1. create access token and create refresh token
        // 2. store the refresh token in the redis cache
        // 3. send access token along with refresh token in response

        const payload = {
            user_id: user.user_id,
            // email: user.email,
            // phone_number: user.phone_number,
            display_name: user.display_name,
            username: user.username,
            role: user.role
        };

        const accessToken = generateAccessToken(payload);

        const tokenId = crypto.randomUUID();
        const familyId = crypto.randomUUID();
        const userId = user.user_id;

        const refreshToken = generateRefreshToken(userId, tokenId, familyId);

        await storeRefreshToken(userId, tokenId, hashToken(refreshToken), TTL_SECONDS);

        // now I am stuck at setting up those access token and refresh token in cookies and response data
        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

        return res.status(200).json({
            success: true,
            message: "Login Successfull",
            data: {
                accessToken: accessToken,
                refreshToken: { userId, tokenId, familyId, refreshToken }, // I think we will not need this
            }
        });

    } catch (error) {
        next(error);
    }
}

/**
 * @desc      Refresh expired access token using rotating refresh token strategy
 * @route     POST /api/v1/auth/refresh
 * @access    Public (Requires valid Refresh Token in Cookie or Authorization header)
 * @param     {Object} req - Express request object containing refresh token
 * @param     {Object} res - Express response object
 * @param     {Function} next - Express next middleware function
 * @returns   {Promise<Response>} 200 OK with new Access Token & new Refresh Cookie, or 401/403 status
 */

export const refresh = async (req, res, next) => {
    try {
        // here I need to divide the task into following steps
        // 1. retrieve the userId, tokenId, familyId and refreshToken from cookies

        const refreshToken = req.cookies?.refreshToken || req.headers.authorization?.replace("Bearer ", "");

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh Token Missing"
            });
        }

        const decoded = verifyRefreshToken(refreshToken);
        const { userId, tokenId, familyId } = decoded;

        // 2. check if refreshToken matches the exisiting one in the redis database
        const storedHash = await getRefreshToken(userId, tokenId);
        const incomingHash = hashToken(refreshToken);

        if (!storedHash || storedHash !== incomingHash) {
            await revokeAllUserTokens(userId);
            res.clearCookie("refreshToken", COOKIE_OPTIONS);
            return res.status(403).json({
                success: false,
                message: "Unauthenticated attempt detected. Logging out of all devices"
            });
        }

        // 3. now the refresh token matches the one in redis. so we need to create new refresh token 
        // new access token and then again set in cookies and return in res.
        // first delete the present refresh token in the redis database
        await deleteRefreshToken(userId, tokenId);
        // now create access tokens
        // find the user first

        const user = await User.findOne({
            where: {
                user_id: userId,
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist",
            });
        }

        const payload = {
            user_id: user.user_id,
            // email: user.email,
            // phone_number: user.phone_number,
            display_name: user.display_name,
            username: user.username,
            role: user.role
        };

        const newAccessToken = generateAccessToken(payload);

        const newTokenId = crypto.randomUUID();
        const newRefreshToken = generateRefreshToken(userId, newTokenId, familyId);

        await storeRefreshToken(userId, newTokenId, hashToken(newRefreshToken), TTL_SECONDS);

        res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);

        return res.status(200).json({
            success: true,
            message: "Refresh Successfull",
            data: {
                accessToken: newAccessToken,
                // refreshToken: { userId, newTokenId, familyId, newRefreshToken },
            }
        });

    } catch (error) {
        next(error);
    }


}

/**
 * @desc      Logout user from current device by clearing refresh token from Redis & Cookies
 * @route     POST /api/v1/auth/logout
 * @access    Private
 * @param     {Object} req - Express request object containing refresh token
 * @param     {Object} res - Express response object
 * @param     {Function} next - Express next middleware function
 * @returns   {Promise<Response>} 200 OK on successful logout
 */

export const logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken || req.headers.authorization?.replace("Bearer ", "");

        if (refreshToken) {
            try {
                const decoded = verifyRefreshToken(refreshToken);
                const { userId, tokenId, familyId } = decoded;
                await deleteRefreshToken(userId, tokenId);
            } catch (error) {
                console.log(error, "Error occurred because user might be logged out already");
            }
        }

        res.clearCookie("refreshToken", COOKIE_OPTIONS);

        return res.status(200).json({
            success: true,
            message: "Logout Successful"
        })

    } catch (error) {
        next(error);
    }
}

/**
 * @desc      Revoke all active sessions and refresh tokens for the user across all devices
 * @route     POST /api/v1/auth/logout-all
 * @access    Private
 * @param     {Object} req - Express request object containing user session data
 * @param     {Object} res - Express response object
 * @param     {Function} next - Express next middleware function
 * @returns   {Promise<Response>} 200 OK on successful global logout
 */

export const logoutOfAllDevices = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken || req.headers?.authorization?.replace("Bearer ", "");

        if (refreshToken) {
            try {
                const decoded = verifyRefreshToken(refreshToken);
                const { userId, tokenId, familyId } = decoded;
                await revokeAllUserTokens(userId);
            } catch (error) {
                console.log(error, "Error occurred because user might be logged out already");
            }
        }

        res.clearCookie("refreshToken", COOKIE_OPTIONS);
        return res.status(200).json({
            success: true,
            message: "Logout Successful"
        });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc      Verify user's email address using the token sent via email
 * @route     GET /api/v1/auth/verify-email
 * @access    Public
 * @param     {Object} req - Express request object containing verification `token` in query params
 * @param     {Object} res - Express response object
 * @param     {Function} next - Express next middleware function
 * @returns   {Promise<Response>} 200 OK on successful email verification, or 400/409 status
 */

export const verifyEmail = async (req, res, next) => {
    try {
        const token = req.query.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Verification token is required",
            });
        }

        const hashed_token = hashToken(token);
        const userId = await getEmailVerificationToken(hashed_token);
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification link",
            });
        }

        const existingUser = await User.findOne({
            where: {
                user_id: userId
            },
        });

        if (!existingUser) {
            return res.status(409).json({
                success: false,
                message: `User Does not Exists`,
            });
        }

        existingUser.is_email_verified = true;
        existingUser.email_verified_at = new Date();
        await existingUser.save();

        // const isDeleted = await deleteEmailVerificationToken(hashed_token);
        // if (!isDeleted) {
        //     return res.status(400).json({
        //         success: false,
        //         message: `User Email Verified but token not deleted`,
        //     });
        // }

        // Cleanup token asynchronously (don't block/fail response if Redis cleanup fails)
        
        // option 1:
        // deleteEmailVerificationToken(hashed_token).catch((error) =>
        //     console.error("Failed to delete Redis verification token:", error)
        // );
        
        //option 2:
        try {
            await deleteEmailVerificationToken(hashed_token);
        } catch (error) {
            console.error("Failed to delete Redis Verification token:", error);
        }

        return res.status(200).json({
            success: true,
            message: "Email verified successfully! You can now log in."
        });

    } catch (error) {
        next(error);
    }
}

/**
 * @desc      Resend email verification link to unverified user (with rate-limiting cooldown)
 * @route     POST /api/v1/auth/resend-email
 * @access    Public
 * @param     {Object} req - Express request object containing email in body
 * @param     {Object} res - Express response object
 * @param     {Function} next - Express next middleware function
 * @returns   {Promise<Response>} 200 OK when email is queued/sent, or 400/401 status
 */

export const resendEmail = async (req, res, next) => {
    try {
        const email = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email Required"
            });
        }

        const user = User.findOne({
            where: {
                email: email,
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User With this Email does not exists. Come with your original email"
            });
        }

        if (user.is_email_verified === true) {
            return res.status(401).json({
                success: false,
                message: "Email is Already verified. You can directly Log in"
            });
        }

        const cooldown = getResendEmailCooldown(user.user_id);
        if (cooldown) {
            return res.status(400).json({
                success: false,
                message: "Wait for 2 minutes to resend verification email"
            });
        }

        // Generate raw verification token and hash it for Redis
        const rawToken = crypto.randomUUID();
        const hashedToken = hashToken(rawToken);

        // Store token in Redis (1-hour expiration = 3600 seconds)
        await storeEmailVerificationToken(user.user_id, hashedToken);
        // store email cool down in redis with 2 min expiration
        await storeEmailVerificationToken(user.user_id);

        // sending verification mail
        await sendVerificationEmail(user.email, user.display_name, rawToken);

        return res.status(200).json({
            success: true,
            message: "Email Verification Mail Resend",
        });

    } catch (error) {
        next(error);
    }
}

/**
 * @desc      Initiate password reset flow by sending a reset link to registered email
 * @route     POST /api/v1/auth/forgot-password
 * @access    Public
 * @param     {Object} req - Express request object containing email in body
 * @param     {Object} res - Express response object
 * @param     {Function} next - Express next middleware function
 * @returns   {Promise<Response>} 200 OK when reset link is generated and sent
 */

export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email Required"
            });
        }

        const user = await User.findOne({
            where: {
                email: email,
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User With this Email does not exists. Come with your original email"
            });
        }

        const rawToken = crypto.randomUUID();
        const hashed_token = hashToken(rawToken);

        // store token in redis (1 hour expiration = 3600 seconds)
        await storeResetPasswordToken(user.user_id, hashed_token);

        // send reset password mail
        await sendResetPasswordEmail(user.email, user.display_name, rawToken);

        return res.status(200).json({
            success: true,
            message: "Reset Password Mail Resend",
        });

    } catch (error) {
        next(error);
    }
}

/**
 * @desc      Reset user password using token received in email & revoke all existing user sessions
 * @route     POST /api/v1/auth/reset-password
 * @access    Public
 * @param     {Object} req - Express request object containing token and new password in body
 * @param     {Object} res - Express response object
 * @param     {Function} next - Express next middleware function
 * @returns   {Promise<Response>} 200 OK on successful password update, or 400/409 status
 */

export const resetPassword = async (req, res, next) => {
    try {
        const { error, value } = resetPasswordValidation.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const { password, token } = value;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Verification token is required",
            });
        }

        const hashed_token = hashToken(token);
        const userId = await getResetPasswordToken(hashed_token);
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification link",
            });
        }

        const existingUser = await User.findOne({
            where: {
                user_id: userId
            },
        });

        if (!existingUser) {
            return res.status(409).json({
                success: false,
                message: `User Does not Exists`,
            });
        }


        const hash_password = await hashPassword(password);
        existingUser.password_hash = hash_password;
        await existingUser.save();

        // or you can use
        // User.update({ password_hash }, { where: { user_id: userId } })).

        // Cleanup token asynchronously (don't block/fail response if Redis cleanup fails)
        try {
            await deleteResetPasswordToken(hashed_token);
        } catch (error) {
            console.error("Failed to delete Redis reset password token:", error);
        }

        // once password is changed log out of all devices
        await revokeAllUserTokens(userId);

        return res.status(200).json({
            success: true,
            message: "Password Reset Successful",
        });

    } catch (error) {
        next(error);
    }
};

// export const verifyResetPassword = async (req, res, next) => {
//     try {
//         const token = req.query.token;

//         if (!token) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Verification token is required",
//             });
//         }

//         const hashed_token = hashToken(token);
//         const userId = await getResetPasswordToken(hashed_token);
//         if (!userId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid or expired verification link",
//             });
//         }

//         const existingUser = await User.findOne({
//             where: {
//                 user_id: userId
//             },
//         });

//         if (!existingUser) {
//             return res.status(409).json({
//                 success: false,
//                 message: `User Does not Exists`,
//             });
//         }

//         // Cleanup token asynchronously (don't block/fail response if Redis cleanup fails)
//         deleteResetPasswordToken(hashed_token).catch((error) =>
//             console.error("Failed to delete Redis reset password token:", error)
//         );

//         return res.status(200).json({
//             success: true,
//             message: "Reset password token verified successfully! You can now Reset Password in."
//         });
//     } catch (error) {

//     }
// }