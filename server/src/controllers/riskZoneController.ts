import { Request, Response, NextFunction } from 'express';
import { RiskZone } from '../models/RiskZone.js';
import IncidentReport from '../models/IncidentReport.js';

/**
 * GET /api/risk-zones
 * Returns all AI-generated risk zones as a GeoJSON FeatureCollection of circles
 * (represented as Points with radius_km metadata for rendering on the map).
 */
export const getRiskZones = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let zones = await RiskZone.find({}).sort({ createdAt: -1 });

    // Keep the map useful without an AI key: turn seeded/reported incidents into
    // conservative circles until an admin generates clustered AI zones.
    if (zones.length === 0) {
      const incidents = await IncidentReport.find({ latitude: { $exists: true }, longitude: { $exists: true } })
        .sort({ createdAt: -1 })
        .limit(20);

      if (incidents.length > 0) {
        await RiskZone.insertMany(
          incidents.map((incident) => ({
            lat: incident.latitude,
            lng: incident.longitude,
            radius_km: 0.5,
            risk_level: ['VIOLENCE', 'ASSAULT', 'THEFT'].includes(incident.category)
              ? 'HIGH'
              : 'MEDIUM',
            generatedAt: new Date(),
          }))
        );
        zones = await RiskZone.find({}).sort({ createdAt: -1 });
      }
    }

    // Build a GeoJSON FeatureCollection so the frontend can use it directly
    const geoJson = {
      type: 'FeatureCollection',
      features: zones.map((zone) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [zone.lng, zone.lat],
        },
        properties: {
          id: zone._id,
          radius_km: zone.radius_km,
          risk_level: zone.risk_level,
          generatedAt: zone.generatedAt,
        },
      })),
    };

    res.json({
      success: true,
      count: zones.length,
      zones,
      geoJson,
    });
  } catch (error) {
    next(error);
  }
};
