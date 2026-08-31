import { Request, Response } from 'express';
import { FieldReport } from '../models/FieldReport.js';
import { io } from '../server.js';
import { IUser } from '../models/User.js';

export const getFieldReports = async (req: Request, res: Response) => {
  try {
    const reports = await FieldReport.find().populate('reportedBy', 'name designation assignedDistrict').sort('-timestamp');
    res.status(200).json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createFieldReport = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude, district, type, description, photos, severity } = req.body;
    const user = req.user as IUser;
    
    const report = new FieldReport({
      reportedBy: user._id,
      location: { type: 'Point', coordinates: [longitude, latitude] },
      district,
      type,
      description,
      photos,
      severity
    });
    
    await report.save();
    const populated = await report.populate('reportedBy', 'name designation assignedDistrict');
    
    io.emit('new-field-report', populated);
    res.status(201).json({ success: true, report: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
