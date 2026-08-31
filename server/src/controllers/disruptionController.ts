import { Request, Response } from 'express';
import { RouteDisruption } from '../models/RouteDisruption.js';
import { io } from '../server.js';
import { IUser } from '../models/User.js';

export const getDisruptions = async (req: Request, res: Response) => {
  try {
    const disruptions = await RouteDisruption.find().populate('routeId', 'name startPoint endPoint');
    res.status(200).json({ success: true, disruptions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createDisruption = async (req: Request, res: Response) => {
  try {
    const { routeId, type, severity, latitude, longitude, predictedDurationHours } = req.body;
    const user = req.user as IUser;
    
    const disruption = new RouteDisruption({
      routeId,
      type,
      severity,
      location: { type: 'Point', coordinates: [longitude, latitude] },
      predictedDurationHours,
      reportedBy: user._id
    });
    
    await disruption.save();
    const populated = await disruption.populate('routeId', 'name startPoint endPoint');
    
    io.emit('new-disruption', populated);
    res.status(201).json({ success: true, disruption: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
