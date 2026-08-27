import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ILocationHistory extends Document {
  userId: Types.ObjectId;
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: Date;
}

const LocationHistorySchema = new Schema<ILocationHistory>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false,
  }
);

export const LocationHistory = mongoose.model<ILocationHistory>(
  'LocationHistory',
  LocationHistorySchema
);
export default LocationHistory;
