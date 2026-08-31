import { Request, Response } from 'express';
import { Route } from '../models/Route.js';

export const getRoutes = async (req: Request, res: Response) => {
  try {
    const routes = await Route.find();
    res.status(200).json({ success: true, routes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateRouteCondition = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { condition, riskLevel } = req.body;
    
    const route = await Route.findByIdAndUpdate(
      id,
      { condition, riskLevel, lastUpdated: new Date() },
      { new: true }
    );
    
    res.status(200).json({ success: true, route });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
