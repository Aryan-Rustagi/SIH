import { Request, Response } from 'express';
import { Vehicle } from '../models/Vehicle.js';
import { io } from '../server.js';

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await Vehicle.find().populate('assignedRoute', 'name');
    res.status(200).json({ success: true, vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateVehicleLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { latitude, longitude } = req.body;
    
    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      {
        currentLocation: { type: 'Point', coordinates: [longitude, latitude] },
        lastUpdated: new Date()
      },
      { new: true }
    );
    
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    
    io.emit('vehicle-position-update', vehicle);
    res.status(200).json({ success: true, vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
