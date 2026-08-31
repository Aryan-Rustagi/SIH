import { Request, Response } from 'express';
import { District } from '../models/District.js';

export const getDistricts = async (req: Request, res: Response) => {
  try {
    const districts = await District.find().sort('name');
    res.status(200).json({ success: true, districts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
