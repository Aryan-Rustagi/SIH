import mongoose, { Document, Schema } from 'mongoose';

export interface IVehicle extends Document {
  vehicleId: string;
  type: 'TRUCK' | 'AMBULANCE' | 'SUPPLY' | 'OFFICIAL';
  currentLocation: {
    type: 'Point';
    coordinates: number[];
  };
  driverName: string;
  driverPhone: string;
  cargoType: 'MEDICINE' | 'FOOD' | 'CONSTRUCTION' | 'GENERAL' | 'NONE';
  status: 'IN_TRANSIT' | 'DELIVERED' | 'DELAYED' | 'IDLE';
  assignedRoute?: mongoose.Types.ObjectId;
  lastUpdated: Date;
}

const VehicleSchema = new Schema<IVehicle>(
  {
    vehicleId: { type: String, required: true, unique: true },
    type: { type: String, enum: ['TRUCK', 'AMBULANCE', 'SUPPLY', 'OFFICIAL'], required: true },
    currentLocation: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
    },
    driverName: { type: String, required: true },
    driverPhone: { type: String, required: true },
    cargoType: { type: String, enum: ['MEDICINE', 'FOOD', 'CONSTRUCTION', 'GENERAL', 'NONE'], required: true },
    status: { type: String, enum: ['IN_TRANSIT', 'DELIVERED', 'DELAYED', 'IDLE'], default: 'IDLE' },
    assignedRoute: { type: Schema.Types.ObjectId, ref: 'Route' },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

VehicleSchema.index({ currentLocation: '2dsphere' });

export const Vehicle = mongoose.model<IVehicle>('Vehicle', VehicleSchema);
export default Vehicle;
