import { verifyAccessToken } from '../utils/tokenUtils.js';
/**
 * Normalizes the user object from the token.
 * Provides aliases (id, userId, user_id) so all controllers work,
 * regardless of which variable name they prefer.
 */

const normalizeDecodedUser = (decoded) => {
    if (!decoded) return null;

    // Extract the ID from whichever field holds it in the token
    const idValue = decoded.user_id || decoded.userId || decoded.id;

    return {
        // 1. The Real Data (Snake Case for DB consistency)
        user_id: idValue,
        display_name: decoded.display_name || decoded.displayName || decoded.email,
        username: decoded.username,
        // email: decoded.email,
        role: decoded.role,
        // 2. Aliases (For compatibility with all controllers)
        id: idValue,      // For controllers using req.user.id
        userId: idValue,  // For controllers using req.user.userId
    };
};


export const authenticateToken = (req, res, next) => {
    try {

        let token = null;
        const authHeader = req.headers.authorization;

        // 1️⃣ Try Authorization header
        if (authHeader?.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }

        // 2️⃣ Fallback: query param token (downloads)
        // if (!token && req.query?.token) {
        //     token = req.query.token;
        // }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        try {
            const decoded = verifyAccessToken(token);
            req.user = normalizeDecodedUser(decoded);
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token.'
            });
        }

    } catch (error) {
        next(error);
    }
}

export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        });
    }
    next();
}

export const isUser = (req, res, next) => {
    if (!req.user || (req.user.role !== 'user' && req.user.role !== 'admin')) {
        return res.status(403).json({
            success: false,
            message: 'Access denied. User privileges required.'
        });
    }
    next();
}