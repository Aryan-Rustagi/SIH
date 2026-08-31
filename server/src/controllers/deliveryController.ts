import { Request, Response } from 'express';
import { DeliveryTracking } from '../models/DeliveryTracking.js';

export const getDeliveries = async (req: Request, res: Response) => {
  try {
    const deliveries = await DeliveryTracking.find().populate('vehicleId', 'vehicleId type driverName driverPhone currentLocation');
    res.status(200).json({ success: true, deliveries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
