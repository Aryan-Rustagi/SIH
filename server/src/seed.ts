import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Models
import User from './models/User.js';
import Vehicle from './models/Vehicle.js';
import Route from './models/Route.js';
import RouteDisruption from './models/RouteDisruption.js';
import DeliveryTracking from './models/DeliveryTracking.js';
import Alert from './models/Alert.js';
import District from './models/District.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ner_logistics_db';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    // Clear existing
    await User.deleteMany({});
    await Vehicle.deleteMany({});
    await Route.deleteMany({});
    await RouteDisruption.deleteMany({});
    await DeliveryTracking.deleteMany({});
    await Alert.deleteMany({});
    await District.deleteMany({});

    console.log('Cleared existing database.');

    // Users
    const adminUser = await User.create({
      name: 'Central Admin',
      email: 'admin@safetour.app',
      password: 'password123',
      role: 'ADMIN',
      phone: '+919999999999',
    });

    const fieldOfficer = await User.create({
      name: 'Field Officer Raj',
      email: 'tourist@safetour.app', // keep same email for demo
      password: 'password123',
      role: 'FIELD_OFFICER',
      phone: '+918888888888',
      assignedDistrict: 'Kamrup Metropolitan',
      designation: 'Logistics Supervisor',
    });

    // Districts
    const districtsData = [
      { name: 'Kamrup Metropolitan', state: 'Assam', connectivityStatus: 'CONNECTED' },
      { name: 'East Khasi Hills', state: 'Meghalaya', connectivityStatus: 'PARTIAL', activeDisruptionsCount: 1 },
      { name: 'Tawang', state: 'Arunachal Pradesh', connectivityStatus: 'DISCONNECTED', activeDisruptionsCount: 1 },
      { name: 'Dimapur', state: 'Nagaland', connectivityStatus: 'CONNECTED' },
      { name: 'Imphal West', state: 'Manipur', connectivityStatus: 'PARTIAL', activeDisruptionsCount: 1 },
    ];
    await District.insertMany(districtsData);

    // Routes
    const route1 = await Route.create({
      name: 'Guwahati - Shillong Corridor',
      startPoint: 'Guwahati, Assam',
      endPoint: 'Shillong, Meghalaya',
      waypoints: {
        type: 'LineString',
        coordinates: [
          [91.7362, 26.1445], // Guwahati
          [91.8833, 25.5788], // Shillong
        ],
      },
      districtsCovered: ['Kamrup Metropolitan', 'Ri Bhoi', 'East Khasi Hills'],
      condition: 'OPEN',
      riskLevel: 'LOW',
    });

    const route2 = await Route.create({
      name: 'Tezpur - Tawang Highway',
      startPoint: 'Tezpur, Assam',
      endPoint: 'Tawang, Arunachal Pradesh',
      waypoints: {
        type: 'LineString',
        coordinates: [
          [92.7926, 26.6528], // Tezpur
          [91.8673, 27.5878], // Tawang
        ],
      },
      districtsCovered: ['Sonitpur', 'West Kameng', 'Tawang'],
      condition: 'CLOSED',
      riskLevel: 'CRITICAL',
    });

    // Vehicles
    const vehicle1 = await Vehicle.create({
      vehicleId: 'AS-01-HC-1234',
      type: 'TRUCK',
      currentLocation: { type: 'Point', coordinates: [91.75, 26.12] },
      driverName: 'Sanjay Kumar',
      driverPhone: '+91 7777777777',
      cargoType: 'MEDICINE',
      status: 'IN_TRANSIT',
      assignedRoute: route1._id,
    });

    const vehicle2 = await Vehicle.create({
      vehicleId: 'AR-02-B-9876',
      type: 'SUPPLY',
      currentLocation: { type: 'Point', coordinates: [92.1, 27.2] },
      driverName: 'Dorjee',
      driverPhone: '+91 6666666666',
      cargoType: 'FOOD',
      status: 'DELAYED',
      assignedRoute: route2._id,
    });

    // Disruptions
    await RouteDisruption.create({
      routeId: route2._id,
      type: 'LANDSLIDE',
      severity: 'CRITICAL',
      location: { type: 'Point', coordinates: [92.1, 27.2] },
      predictedDurationHours: 48,
      status: 'ACTIVE',
      reportedBy: fieldOfficer._id,
    });

    // Deliveries
    await DeliveryTracking.create({
      vehicleId: vehicle1._id,
      origin: 'Guwahati Depot',
      destination: 'Shillong Civil Hospital',
      cargoManifest: 'Medical Supplies & Vaccines',
      estimatedArrival: new Date(Date.now() + 1000 * 60 * 60 * 2), // +2 hours
      status: 'IN_TRANSIT',
    });

    // Alerts
    await Alert.create({
      type: 'REGION_INACCESSIBLE',
      message: 'Tawang district disconnected due to massive landslides in West Kameng.',
      affectedDistricts: ['Tawang', 'West Kameng'],
      affectedRoutes: [route2._id],
      severity: 'CRITICAL',
      isActive: true,
    });

    console.log('Seed data inserted successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
