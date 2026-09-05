import express from 'express';
import * as authController from '../controllers/auth/authController.js';
import { authenticateToken, isAdmin, isUser } from '../middlewares/authMiddleware.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

// Public Authentication Routes
router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/refresh', authLimiter, authController.refresh);

// Email Verification Routes
router.get('/verify-email', authController.verifyEmail);
router.post('/resend-verification', authLimiter, authController.resendEmail);

// Password Reset Routes
router.post('/forgot-password', authLimiter, authController.forgotPassword);
router.post('/reset-password', authLimiter, authController.resetPassword);

// Session Management Routes
router.post('/logout', authController.logout);
router.post('/logout-of-all-devices', authController.logoutOfAllDevices);

export default router;