import { Router } from 'express';
import {
  triggerSOS,
  getActiveAlerts,
  getMyAlerts,
  acknowledgeAlert,
  resolveAlert,
  cancelAlert,
} from '../controllers/sosController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

// Tourist triggers SOS
router.post('/', protect, triggerSOS);

// Get current user's alerts
router.get('/my-alerts', protect, getMyAlerts);

// Responders & Police Command: get active alerts
router.get('/active', protect, authorize('ADMIN'), getActiveAlerts);

// Responder acknowledges alert
router.patch('/:id/acknowledge', protect, authorize('ADMIN'), acknowledgeAlert);

// Resolve alert (Responders, Admin, or User)
router.patch('/:id/resolve', protect, resolveAlert);

// Cancel alert (Tourist)
router.patch('/:id/cancel', protect, cancelAlert);

export default router;
