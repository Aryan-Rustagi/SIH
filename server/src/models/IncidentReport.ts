import mongoose, { Document, Schema, Types } from 'mongoose';

export type IncidentCategory =
  | 'THEFT'
  | 'HARASSMENT'
  | 'SCAM'
  | 'MEDICAL'
  | 'NATURAL_HAZARD'
  | 'OTHER';

export interface IIncidentReport extends Document {
  userId?: Types.ObjectId;
  title: string;
  description: string;
  category: IncidentCategory;
  latitude: number;
  longitude: number;
  address?: string;
  isVerified: boolean;
  verifiedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const IncidentReportSchema = new Schema<IIncidentReport>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Incident title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Incident description is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['THEFT', 'HARASSMENT', 'SCAM', 'MEDICAL', 'NATURAL_HAZARD', 'OTHER'],
      default: 'OTHER',
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
    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

IncidentReportSchema.index({ createdAt: -1 });

export const IncidentReport = mongoose.model<IIncidentReport>(
  'IncidentReport',
  IncidentReportSchema
);
export default IncidentReport;
