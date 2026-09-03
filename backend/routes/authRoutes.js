import express from 'express';
import * as authController from '../controllers/auth/authController.js';
import { authenticateToken, isAdmin, isUser } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('refresh', authLimiter, authController.refresh);
router.post('/logout', authController.logout);
router.post('/logoutOfAllDevices', authController.logoutOfAllDevices);

export default router;