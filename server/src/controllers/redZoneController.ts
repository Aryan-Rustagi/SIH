import { Request, Response, NextFunction } from 'express';
import { RedZone } from '../models/RedZone.js';

export const getRedZones = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const zones = await RedZone.find({ isActive: true });
    
    // Format into GeoJSON FeatureCollection
    const features = zones.map(zone => ({
      type: 'Feature',
      properties: {
        id: zone._id,
        name: zone.name,
        description: zone.description,
      },
      geometry: {
        type: 'Polygon',
        coordinates: zone.coordinates
      }
    }));

    const geoJson = {
      type: 'FeatureCollection',
      features
    };

    res.json({
      success: true,
      geoJson
    });
  } catch (error) {
    next(error);
  }
};
