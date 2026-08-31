import { Request, Response } from 'express';
import { Alert } from '../models/Alert.js';
import { io } from '../server.js';

export const getActiveAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await Alert.find({ isActive: true }).sort('-createdAt');
    res.status(200).json({ success: true, alerts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createAlert = async (req: Request, res: Response) => {
  try {
    const alert = new Alert(req.body);
    await alert.save();
    io.emit('alert-broadcast', alert);
    res.status(201).json({ success: true, alert });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
