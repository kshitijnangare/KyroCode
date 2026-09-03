import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const generateAccessToken = (userPayload) => {
    try {
        const accessToken = jwt.sign(
            userPayload,
            process.env.ACCESS_TOKEN_JWT_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_JWT_SECRET_EXPIRES_IN
            }
        );
        return accessToken;
    } catch (error) {
        console.error("Failed to generate the token", error);
        throw error;
    }
}

const verifyAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error("Failed to verify the token", error);
        throw error;
    }
}

const generateRefreshToken = (userId, tokenId, familyId) => {
    try {
        if (!userId || !familyId) {
            console.error("UserId or FamilyId is missing");
            throw new Error("Cannot generate refresh token: missing required parameters");
        }
        const refreshToken = jwt.sign(
            { userId, tokenId, familyId },
            process.env.REFRESH_TOKEN_JWT_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_JWT_SECRET_EXPIRES_IN
            }
        );
        return refreshToken;
    } catch (error) {
        console.error("Cannot generate the refresh token:", error);
        throw error;
    }
};

const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error("Failed to verify the token", error);
        throw error;
    }
}

const hashToken = (tokenString) => {
    return crypto.createHash('sha256').update(tokenString).digest('hex');
};

export { generateAccessToken, verifyAccessToken, generateRefreshToken,  verifyRefreshToken, hashToken };