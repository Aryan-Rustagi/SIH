import mongoose, { Document, Schema } from 'mongoose';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface IRiskZone extends Document {
  lat: number;
  lng: number;
  radius_km: number;
  risk_level: RiskLevel;
  generatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RiskZoneSchema = new Schema<IRiskZone>(
  {
    lat: {
      type: Number,
      required: [true, 'Latitude is required'],
      index: true,
    },
    lng: {
      type: Number,
      required: [true, 'Longitude is required'],
      index: true,
    },
    radius_km: {
      type: Number,
      required: [true, 'Radius in km is required'],
      min: 0,
    },
    risk_level: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      required: [true, 'Risk level is required'],
      index: true,
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Geospatial index for future proximity queries
RiskZoneSchema.index({ lat: 1, lng: 1 });

export const RiskZone = mongoose.model<IRiskZone>('RiskZone', RiskZoneSchema);
export default RiskZone;
