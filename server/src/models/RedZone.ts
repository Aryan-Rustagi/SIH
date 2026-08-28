import mongoose, { Document, Schema } from 'mongoose';

export interface IRedZone extends Document {
  name: string;
  description?: string;
  coordinates: number[][][]; // GeoJSON Polygon coordinates: [[[lng, lat], [lng, lat], ...]]
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RedZoneSchema = new Schema<IRedZone>(
  {
    name: {
      type: String,
      required: [true, 'Red Zone name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    coordinates: {
      type: [[[Number]]],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RedZone = mongoose.model<IRedZone>('RedZone', RedZoneSchema);
export default RedZone;
