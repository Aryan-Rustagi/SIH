import { Request, Response, NextFunction } from 'express';
import { SafetyZone } from '../models/SafetyZone.js';
import { AuthRequest } from '../middleware/auth.js';

// Haversine formula to compute distance in meters between two lat/lng points
function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Get all safety zones
export const getSafetyZones = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const zones = await SafetyZone.find().sort({ riskLevel: -1, createdAt: -1 });
    res.json({
      success: true,
      count: zones.length,
      zones,
    });
  } catch (error) {
    next(error);
  }
};

// Create safety zone (Admin only)
export const createSafetyZone = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description, riskLevel, latitude, longitude, radiusMeters } = req.body;

    if (!name || latitude === undefined || longitude === undefined) {
      res.status(400).json({
        success: false,
        message: 'Zone name and coordinates are required',
      });
      return;
    }

    const zone = await SafetyZone.create({
      name,
      description,
      riskLevel: riskLevel || 'LOW',
      latitude,
      longitude,
      radiusMeters: radiusMeters || 500,
    });

    res.status(201).json({
      success: true,
      message: 'Safety zone created successfully',
      zone,
    });
  } catch (error) {
    next(error);
  }
};

// Update safety zone (Admin only)
export const updateSafetyZone = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const zone = await SafetyZone.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!zone) {
      res.status(404).json({ success: false, message: 'Safety zone not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Safety zone updated successfully',
      zone,
    });
  } catch (error) {
    next(error);
  }
};

// Delete safety zone (Admin only)
export const deleteSafetyZone = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const zone = await SafetyZone.findByIdAndDelete(id);

    if (!zone) {
      res.status(404).json({ success: false, message: 'Safety zone not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Safety zone deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Proximity risk evaluation for current tourist location
export const checkLocationRisk = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      res.status(400).json({
        success: false,
        message: 'Latitude and longitude query parameters are required',
      });
      return;
    }

    const userLat = parseFloat(latitude as string);
    const userLng = parseFloat(longitude as string);

    const zones = await SafetyZone.find();

    // Check which zone user is inside
    const insideZones: Array<{ zone: typeof zones[0]; distance: number }> = [];

    for (const zone of zones) {
      const dist = calculateDistanceMeters(userLat, userLng, zone.latitude, zone.longitude);
      if (dist <= zone.radiusMeters) {
        insideZones.push({ zone, distance: Math.round(dist) });
      }
    }

    // Determine current highest risk level
    let currentRisk = 'LOW';
    if (insideZones.some((z) => z.zone.riskLevel === 'CRITICAL')) {
      currentRisk = 'CRITICAL';
    } else if (insideZones.some((z) => z.zone.riskLevel === 'HIGH')) {
      currentRisk = 'HIGH';
    } else if (insideZones.some((z) => z.zone.riskLevel === 'MEDIUM')) {
      currentRisk = 'MEDIUM';
    }

    res.json({
      success: true,
      currentRisk,
      activeZones: insideZones,
      totalZonesCount: zones.length,
    });
  } catch (error) {
    next(error);
  }
};
