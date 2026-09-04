import rateLimit from "express-rate-limit";
import dotenv from 'dotenv';

dotenv.config();

// Strict limiter for authentication endpoints (login, register, refresh)
export const authLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 failed/successful attempts per window
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    message: {
        success: false,
        message: "Too many attempts from this IP. Please try again after 15 minutes."
    }
});

// General limiter for public or API routes
export const apiLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // Limit each IP to 100 requests per 15 minutes
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests from this IP, please try again after 15 minutes."
    }
});
