import { Request, Response } from 'express';
import { sendEmergencyAlert } from '../utils/smsUtils.js';

export const sendSms = async (req: Request, res: Response): Promise<void> => {
  try {
    const { to, message, templateId } = req.body;

    if (!to || !message) {
      res.status(400).json({ success: false, message: 'Missing required fields: to, message' });
      return;
    }

    const result = await sendEmergencyAlert(to, message, templateId);

    res.status(200).json({
      success: true,
      message: 'SMS sent successfully',
      data: result
    });
  } catch (error: any) {
    // Specifically handle known errors like API key missing or number not verified
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to send SMS'
    });
  }
};
