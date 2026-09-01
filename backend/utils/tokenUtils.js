import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateAccessToken = (userPayload) => {
    try {
        const token = jwt.sign(
            userPayload,
            process.env.ACCESS_TOKEN_JWT_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_JWT_SECRET_EXPIRES_IN
            }
        );
        return token;
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
