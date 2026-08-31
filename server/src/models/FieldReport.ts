import mongoose, { Document, Schema } from 'mongoose';

export interface IFieldReport extends Document {
  reportedBy: mongoose.Types.ObjectId;
  location: {
    type: 'Point';
    coordinates: number[];
  };
  district: string;
  type: 'ROAD_BLOCKED' | 'BRIDGE_DAMAGED' | 'FLOODING' | 'OTHER';
  description: string;
  photos: string[];
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: Date;
}

const FieldReportSchema = new Schema<IFieldReport>(
  {
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
    },
    district: { type: String, required: true },
    type: { type: String, enum: ['ROAD_BLOCKED', 'BRIDGE_DAMAGED', 'FLOODING', 'OTHER'], required: true },
    description: { type: String, required: true },
    photos: [{ type: String }],
    severity: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

FieldReportSchema.index({ location: '2dsphere' });

export const FieldReport = mongoose.model<IFieldReport>('FieldReport', FieldReportSchema);
export default FieldReport;
