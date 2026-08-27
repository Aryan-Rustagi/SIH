import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IEmergencyContact extends Document {
  userId: Types.ObjectId;
  name: string;
  phone: string;
  relationship?: string;
  isPrimary: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EmergencyContactSchema = new Schema<IEmergencyContact>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    relationship: {
      type: String,
      trim: true,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const EmergencyContact = mongoose.model<IEmergencyContact>(
  'EmergencyContact',
  EmergencyContactSchema
);
export default EmergencyContact;
