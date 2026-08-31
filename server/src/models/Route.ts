import mongoose, { Document, Schema } from 'mongoose';

export interface IRoute extends Document {
  name: string;
  startPoint: string;
  endPoint: string;
  waypoints: {
    type: 'LineString';
    coordinates: number[][];
  };
  districtsCovered: string[];
  condition: 'OPEN' | 'PARTIALLY_BLOCKED' | 'CLOSED';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  lastUpdated: Date;
}

const RouteSchema = new Schema<IRoute>(
  {
    name: { type: String, required: true },
    startPoint: { type: String, required: true },
    endPoint: { type: String, required: true },
    waypoints: {
      type: { type: String, enum: ['LineString'], required: true },
      coordinates: { type: [[Number]], required: true },
    },
    districtsCovered: [{ type: String }],
    condition: { type: String, enum: ['OPEN', 'PARTIALLY_BLOCKED', 'CLOSED'], default: 'OPEN' },
    riskLevel: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'LOW' },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

RouteSchema.index({ waypoints: '2dsphere' });

export const Route = mongoose.model<IRoute>('Route', RouteSchema);
export default Route;
