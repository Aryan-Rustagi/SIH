import mongoose, { Document, Schema } from 'mongoose';

export interface IRouteDisruption extends Document {
  routeId: mongoose.Types.ObjectId;
  type: 'LANDSLIDE' | 'FLOOD' | 'RAINFALL' | 'ROAD_DAMAGE' | 'CONGESTION' | 'OTHER';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  location: {
    type: 'Point';
    coordinates: number[];
  };
  predictedDurationHours?: number;
  status: 'ACTIVE' | 'RESOLVED';
  reportedBy?: mongoose.Types.ObjectId;
}

const RouteDisruptionSchema = new Schema<IRouteDisruption>(
  {
    routeId: { type: Schema.Types.ObjectId, ref: 'Route', required: true },
    type: { type: String, enum: ['LANDSLIDE', 'FLOOD', 'RAINFALL', 'ROAD_DAMAGE', 'CONGESTION', 'OTHER'], required: true },
    severity: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], required: true },
    location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
    },
    predictedDurationHours: { type: Number },
    status: { type: String, enum: ['ACTIVE', 'RESOLVED'], default: 'ACTIVE' },
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

RouteDisruptionSchema.index({ location: '2dsphere' });

export const RouteDisruption = mongoose.model<IRouteDisruption>('RouteDisruption', RouteDisruptionSchema);
export default RouteDisruption;
