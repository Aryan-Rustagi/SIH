import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { SOSAlert } from '../models/SOSAlert.js';
import { User } from '../models/User.js';
import { getSOSSocketIO } from './sosController.js';

export const handleSMSWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { from, body } = req.body;

    if (!body || typeof body !== 'string') {
      res.status(400).json({ success: false, message: 'Invalid payload: body is required' });
      return;
    }

    // Expected format: ID:123|LAT:26.1445|LNG:91.7362|SOS
    // Parse the body string using split method
    const parts = body.split('|');
    const data: Record<string, string> = {};

    parts.forEach((part) => {
      const [key, value] = part.split(':');
      if (key && value) {
        data[key.trim()] = value.trim();
      } else if (key && !value) {
        // Handle flags like SOS
        data[key.trim()] = 'true';
      }
    });

    const userId = data['ID'];
    const latStr = data['LAT'];
    const lngStr = data['LNG'];
    const hasSOS = 'SOS' in data || body.includes('SOS');

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ success: false, message: 'Invalid or missing User ID in SMS body' });
      return;
    }

    if (!latStr || !lngStr) {
      res.status(400).json({ success: false, message: 'Missing LAT or LNG in SMS body' });
      return;
    }

    const latitude = parseFloat(latStr);
    const longitude = parseFloat(lngStr);

    if (isNaN(latitude) || isNaN(longitude)) {
      res.status(400).json({ success: false, message: 'Invalid LAT or LNG values' });
      return;
    }

    // Find the user in MongoDB using the ID
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    // Update the user's lat and lng in MongoDB
    user.latitude = latitude;
    user.longitude = longitude;
    await user.save();

    // If SOS is present, creates a new SOSAlert document with status PENDING
    if (hasSOS) {
      const alert = await SOSAlert.create({
        userId: user._id,
        latitude,
        longitude,
        message: `EMERGENCY SOS via SMS: Tourist in distress! Sender: ${from || 'Unknown'}`,
        status: 'PENDING',
      });

      const populatedAlert = await SOSAlert.findById(alert._id).populate(
        'userId',
        'name email phone role'
      );

      // Uses getSOSSocketIO() to emit an event named new_sos_alert to all connected clients
      const io = getSOSSocketIO();
      if (io && populatedAlert) {
        io.emit('new_sos_alert', populatedAlert);
      }
    }

    // Returns a 200 response with success message
    res.status(200).json({
      success: true,
      message: 'SMS Webhook processed successfully',
    });
  } catch (error) {
    console.error('Error processing SMS webhook:', error);
    next(error);
  }
};
