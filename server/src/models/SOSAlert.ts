import mongoose, { Document, Schema, Types } from 'mongoose';

export type AlertStatus = 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED' | 'CANCELLED';

export interface ISOSAlert extends Document {
  userId: Types.ObjectId;
  status: AlertStatus;
  latitude: number;
  longitude: number;
  address?: string;
  message?: string;
  resolvedAt?: Date;
  acknowledgedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SOSAlertSchema = new Schema<ISOSAlert>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'ACKNOWLEDGED', 'RESOLVED', 'CANCELLED'],
      default: 'ACTIVE',
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
    address: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      default: 'Emergency SOS activated! Immediate assistance required.',
    },
    resolvedAt: {
      type: Date,
    },
    acknowledgedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for querying active alerts by location/time
SOSAlertSchema.index({ status: 1, createdAt: -1 });

export const SOSAlert = mongoose.model<ISOSAlert>('SOSAlert', SOSAlertSchema);
export default SOSAlert;
