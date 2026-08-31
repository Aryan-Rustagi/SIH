import express from 'express';
import { getActiveAlerts, createAlert } from '../controllers/alertController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/active', protect, getActiveAlerts);
router.post('/', protect, authorize('ADMIN'), createAlert);

export default router;
