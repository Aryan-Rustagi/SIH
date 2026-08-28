import { Router } from 'express';
import { handleSMSWebhook } from '../controllers/smsWebhookController.js';

const router = Router();

// Endpoint for receiving SMS webhook
router.post('/', handleSMSWebhook);

export default router;
