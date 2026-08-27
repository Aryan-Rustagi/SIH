import { Response, NextFunction } from 'express';
import { IncidentReport } from '../models/IncidentReport.js';
import { AuthRequest } from '../middleware/auth.js';

// Create a new incident report
export const createIncident = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, category, latitude, longitude, address } = req.body;

    if (!title || !description || latitude === undefined || longitude === undefined) {
      res.status(400).json({
        success: false,
        message: 'Title, description, and location coordinates are required',
      });
      return;
    }

    const incident = await IncidentReport.create({
      userId: req.user?._id,
      title,
      description,
      category: category || 'OTHER',
      latitude,
      longitude,
      address,
      // If submitted by Admin or Responder, auto-verify
      isVerified: req.user?.role === 'ADMIN',
      verifiedBy: req.user?.role === 'ADMIN' ? req.user._id : undefined,
    });

    res.status(201).json({
      success: true,
      message: 'Incident reported successfully',
      incident,
    });
  } catch (error) {
    next(error);
  }
};

// Get public / tourist view of incidents (verified incidents or current user's incidents)
export const getIncidents = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, verifiedOnly } = req.query;

    const filter: Record<string, unknown> = {};

    if (category) {
      filter.category = category;
    }

    if (verifiedOnly === 'true' || !req.user || req.user.role === 'TOURIST') {
      filter.isVerified = true;
    }

    const incidents = await IncidentReport.find(filter)
      .sort({ createdAt: -1 })
      .populate('userId', 'name role')
      .populate('verifiedBy', 'name role');

    res.json({
      success: true,
      count: incidents.length,
      incidents,
    });
  } catch (error) {
    next(error);
  }
};

// Get all incidents (Admin view including unverified)
export const getAllIncidentsAdmin = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const incidents = await IncidentReport.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email phone role')
      .populate('verifiedBy', 'name role');

    res.json({
      success: true,
      count: incidents.length,
      incidents,
    });
  } catch (error) {
    next(error);
  }
};

// Admin verifies / un-verifies an incident report
export const verifyIncident = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { isVerified } = req.body;

    const incident = await IncidentReport.findById(id);
    if (!incident) {
      res.status(404).json({ success: false, message: 'Incident report not found' });
      return;
    }

    incident.isVerified = isVerified !== undefined ? isVerified : true;
    incident.verifiedBy = req.user?._id;
    await incident.save();

    res.json({
      success: true,
      message: `Incident ${incident.isVerified ? 'verified' : 'unverified'} successfully`,
      incident,
    });
  } catch (error) {
    next(error);
  }
};

// Delete incident report
export const deleteIncident = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const incident = await IncidentReport.findById(id);

    if (!incident) {
      res.status(404).json({ success: false, message: 'Incident report not found' });
      return;
    }

    // Only Admin or author can delete
    if (
      req.user?.role !== 'ADMIN' &&
      incident.userId?.toString() !== req.user?._id.toString()
    ) {
      res.status(403).json({ success: false, message: 'Not authorized to delete this incident' });
      return;
    }

    await incident.deleteOne();

    res.json({
      success: true,
      message: 'Incident report deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
