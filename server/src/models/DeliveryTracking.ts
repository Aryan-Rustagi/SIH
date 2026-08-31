import mongoose, { Document, Schema } from 'mongoose';

export interface IDeliveryTracking extends Document {
  vehicleId: mongoose.Types.ObjectId;
  origin: string;
  destination: string;
  cargoManifest: string;
  estimatedArrival: Date;
  actualArrival?: Date;
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'DELAYED' | 'BLOCKED';
  alerts: string[];
}

const DeliveryTrackingSchema = new Schema<IDeliveryTracking>(
  {
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    cargoManifest: { type: String, required: true },
    estimatedArrival: { type: Date, required: true },
    actualArrival: { type: Date },
    status: { type: String, enum: ['PENDING', 'IN_TRANSIT', 'DELIVERED', 'DELAYED', 'BLOCKED'], default: 'PENDING' },
    alerts: [{ type: String }],
  },
  { timestamps: true }
);

export const DeliveryTracking = mongoose.model<IDeliveryTracking>('DeliveryTracking', DeliveryTrackingSchema);
export default DeliveryTracking;
