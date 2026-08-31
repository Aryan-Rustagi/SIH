import mongoose, { Document, Schema } from 'mongoose';

export interface IAlert extends Document {
  type: 'ROAD_BLOCKED' | 'REGION_INACCESSIBLE' | 'DELIVERY_DELAYED' | 'HIGH_RISK_CORRIDOR';
  message: string;
  affectedDistricts: string[];
  affectedRoutes: mongoose.Types.ObjectId[];
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  isActive: boolean;
  createdAt: Date;
}

const AlertSchema = new Schema<IAlert>(
  {
    type: { type: String, enum: ['ROAD_BLOCKED', 'REGION_INACCESSIBLE', 'DELIVERY_DELAYED', 'HIGH_RISK_CORRIDOR'], required: true },
    message: { type: String, required: true },
    affectedDistricts: [{ type: String }],
    affectedRoutes: [{ type: Schema.Types.ObjectId, ref: 'Route' }],
    severity: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Alert = mongoose.model<IAlert>('Alert', AlertSchema);
export default Alert;
