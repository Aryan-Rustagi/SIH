import { Response, NextFunction } from 'express';
import { SOSAlert } from '../models/SOSAlert.js';
import { AuthRequest } from '../middleware/auth.js';
import { Server as SocketIOServer } from 'socket.io';
import { sendEmergencyAlert } from '../utils/smsUtils.js';

let ioInstance: SocketIOServer | null = null;

export const setSOSSocketIO = (io: SocketIOServer) => {
  ioInstance = io;
};

export const getSOSSocketIO = () => ioInstance;

// Trigger Emergency SOS
export const triggerSOS = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const { latitude, longitude, address, message } = req.body;

    if (latitude === undefined || longitude === undefined) {
      res.status(400).json({
        success: false,
        message: 'GPS Coordinates (latitude and longitude) are required for SOS',
      });
      return;
    }

    // Check if there is already an ACTIVE SOS for this user
    const existingActive = await SOSAlert.findOne({
      userId: req.user._id,
      status: { $in: ['ACTIVE', 'ACKNOWLEDGED'] },
    });

    let alert;
    if (existingActive) {
      // Update existing alert location and message
      existingActive.latitude = latitude;
      existingActive.longitude = longitude;
      if (address) existingActive.address = address;
      if (message) existingActive.message = message;
      alert = await existingActive.save();
    } else {
      alert = await SOSAlert.create({
        userId: req.user._id,
        latitude,
        longitude,
        address,
        message: message || 'EMERGENCY SOS: Tourist in distress!',
        status: 'ACTIVE',
      });
    }

    // Populate user details for broadcasting
    const populatedAlert = await SOSAlert.findById(alert._id).populate(
      'userId',
      'name email phone role'
    );

    // Broadcast via Socket.IO
    if (ioInstance) {
      ioInstance.emit('new_sos_alert', populatedAlert);
      console.log(`[Socket.IO] Broadcasted SOS Alert ID: ${alert._id}`);
    }

    // Send SMS to nearest police station
    try {
      // Placeholder 10-digit number for the nearest police station
      const nearestPoliceStationNumber = '9876543210';
      const smsMessage = `EMERGENCY SOS from ${req.user.name || 'Tourist'}: Location: ${latitude}, ${longitude}. ${address ? 'Address: ' + address : ''}. Message: ${alert.message}`;
      await sendEmergencyAlert(nearestPoliceStationNumber, smsMessage);
      console.log(`[SMS] Sent emergency alert to nearest police station: ${nearestPoliceStationNumber}`);
    } catch (smsError: any) {
      console.error(`[SMS Error] Failed to send emergency alert: ${smsError.message}`);
      // Not throwing the error to ensure the SOS request still completes successfully
    }

    res.status(201).json({
      success: true,
      message: 'SOS Alert dispatched successfully. Help is on the way!',
      alert: populatedAlert,
    });
  } catch (error) {
    next(error);
  }
};

// Get all active / acknowledged SOS alerts (for Responders & Police dashboard)
export const getActiveAlerts = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const alerts = await SOSAlert.find({
      status: { $in: ['ACTIVE', 'ACKNOWLEDGED'] },
    })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email phone role')
      .populate('acknowledgedBy', 'name email role');

    res.json({
      success: true,
      count: alerts.length,
      alerts,
    });
  } catch (error) {
    next(error);
  }
};

// Get current user's active & past alerts
export const getMyAlerts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authorized' });
      return;
    }

    const alerts = await SOSAlert.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      alerts,
    });
  } catch (error) {
    next(error);
  }
};

// Responder acknowledges alert
export const acknowledgeAlert = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const alert = await SOSAlert.findById(id);

    if (!alert) {
      res.status(404).json({ success: false, message: 'Alert not found' });
      return;
    }

    alert.status = 'ACKNOWLEDGED';
    alert.acknowledgedBy = req.user?._id;
    await alert.save();

    const updated = await SOSAlert.findById(alert._id)
      .populate('userId', 'name email phone role')
      .populate('acknowledgedBy', 'name email role');

    if (ioInstance) {
      ioInstance.emit('alert_acknowledged', updated);
    }

    res.json({
      success: true,
      message: 'Alert status set to ACKNOWLEDGED',
      alert: updated,
    });
  } catch (error) {
    next(error);
  }
};

// Resolve alert (Responder or Tourist)
export const resolveAlert = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const alert = await SOSAlert.findById(id);

    if (!alert) {
      res.status(404).json({ success: false, message: 'Alert not found' });
      return;
    }

    alert.status = 'RESOLVED';
    alert.resolvedAt = new Date();
    await alert.save();

    const updated = await SOSAlert.findById(alert._id)
      .populate('userId', 'name email phone role')
      .populate('acknowledgedBy', 'name email role');

    if (ioInstance) {
      ioInstance.emit('alert_resolved', updated);
    }

    res.json({
      success: true,
      message: 'Alert resolved successfully',
      alert: updated,
    });
  } catch (error) {
    next(error);
  }
};

// Cancel alert (Tourist)
export const cancelAlert = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const alert = await SOSAlert.findById(id);

    if (!alert) {
      res.status(404).json({ success: false, message: 'Alert not found' });
      return;
    }

    // Check ownership if tourist
    if (req.user?.role === 'TOURIST' && alert.userId.toString() !== req.user._id.toString()) {
      res.status(403).json({ success: false, message: 'Cannot cancel another user\'s alert' });
      return;
    }

    alert.status = 'CANCELLED';
    alert.resolvedAt = new Date();
    await alert.save();

    if (ioInstance) {
      ioInstance.emit('alert_cancelled', { id: alert._id });
    }

    res.json({
      success: true,
      message: 'SOS Alert cancelled',
      alert,
    });
  } catch (error) {
    next(error);
  }
};
