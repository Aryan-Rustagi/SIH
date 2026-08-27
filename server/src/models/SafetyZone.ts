import mongoose, { Document, Schema } from 'mongoose';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ISafetyZone extends Document {
  name: string;
  description?: string;
  riskLevel: RiskLevel;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  createdAt: Date;
  updatedAt: Date;
}

const SafetyZoneSchema = new Schema<ISafetyZone>(
  {
    name: {
      type: String,
      required: [true, 'Zone name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    riskLevel: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      default: 'LOW',
      index: true,
    },
    latitude: {
      type: Number,
      required: [true, 'Latitude is required'],
    },
    longitude: {
      type: Number,
      required: [true, 'Longitude is required'],
    },
    radiusMeters: {
      type: Number,
      default: 500,
    },
  },
  {
    timestamps: true,
  }
);

export const SafetyZone = mongoose.model<ISafetyZone>('SafetyZone', SafetyZoneSchema);
export default SafetyZone;
