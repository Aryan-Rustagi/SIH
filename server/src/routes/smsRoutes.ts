import express from 'express';
import { sendSms } from '../controllers/smsController.js';

const router = express.Router();

// POST /api/sms/send
router.post('/send', sendSms);

export default router;
