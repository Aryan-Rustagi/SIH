import mongoose, { Document, Schema } from 'mongoose';

export interface IDistrict extends Document {
  name: string;
  state: string;
  connectivityStatus: 'CONNECTED' | 'PARTIAL' | 'DISCONNECTED';
  activeDisruptionsCount: number;
  lastUpdated: Date;
}

const DistrictSchema = new Schema<IDistrict>(
  {
    name: { type: String, required: true },
    state: { type: String, required: true },
    connectivityStatus: { type: String, enum: ['CONNECTED', 'PARTIAL', 'DISCONNECTED'], default: 'CONNECTED' },
    activeDisruptionsCount: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

DistrictSchema.index({ name: 1, state: 1 }, { unique: true });

export const District = mongoose.model<IDistrict>('District', DistrictSchema);
export default District;
