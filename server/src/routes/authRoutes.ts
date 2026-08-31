import { Router } from 'express';
import {
  register,
  login,
  googleAuth,
  getMe,
  updateProfile,
  getTourists,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Register & Login
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);

// Get All Users (Admin only)
router.get('/users', getTourists);

// Get Current User
router.get('/me', protect, getMe);
router.put('/me', protect, updateProfile);

export default router;
