# 🛡️ SafeTour Guardian - Tourist Safety & Emergency Rescue Platform

A comprehensive **MERN Stack** (**M**ongoDB, **E**xpress.js, **R**eact, **N**ode.js) platform built with real-time Socket.IO communication, designed for traveler protection, emergency SOS broadcasts, safety zone navigation, and authority command & dispatch control.

---

## 🌟 Key Features

- 🚨 **One-Touch Emergency SOS**: Instant panic distress button capturing device GPS coordinates and broadcasting to responders in real time.
- 📡 **Real-Time Dispatch Console (Socket.IO)**: Police & Rescue Command Center for monitoring incoming alerts, deploying response units, and resolving emergencies.
- 🗺️ **Safe Havens & Caution Zones**: Perimeter monitoring with real-time risk assessment and distance calculation.
- ⚠️ **Crowd-Sourced Incident Reporting**: Verified community reports on pickpocketing, scams, harassment, medical hazards, and travel risks.
- 📞 **In Case of Emergency (ICE) Contacts**: Direct SMS and call triggers for primary emergency contacts.
- 🔐 **Role-Based Access Control**: Tailored portals for **Tourists**, **Responders/Police**, and **Admins**.

---

## 📂 Project Architecture

```
tourist-safety-app/
├── package.json              # Root orchestration (concurrently runs client & server)
├── .env.example              # Environment variable template
├── server/                   # Backend (Node.js, Express.js, MongoDB / Mongoose, Socket.io)
│   ├── src/
│   │   ├── config/           # MongoDB connection handler
│   │   ├── models/           # Mongoose schemas (User, SOSAlert, IncidentReport, SafetyZone, etc.)
│   │   ├── controllers/      # Business logic & socket broadcasters
│   │   ├── routes/           # REST endpoints (/api/auth, /api/sos, /api/incidents, /api/safety-zones)
│   │   ├── middleware/       # JWT auth & error handling
│   │   ├── seed.ts           # Demo database seed script
│   │   └── server.ts         # Server bootstrap
│   └── package.json
└── client/                   # Frontend (React 19, Vite, Tailwind CSS v4, Lucide React, React Router)
    ├── src/
    │   ├── components/       # SOS Button, Navbar, AlertBanner, ZoneCard, IncidentCard
    │   ├── context/          # AuthContext, AlertContext (Socket.IO event listener)
    │   ├── pages/            # Tourist portal pages & Admin Command Center
    │   ├── services/         # Axios API & Socket.io client
    │   └── App.tsx           # Route layout and guards
    └── package.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** (Local instance running at `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)

### 2. Setup Environment
Ensure your `.env` in `server/.env` (and root `.env`) has:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tourist_safety_db
JWT_SECRET=super_secret_jwt_key_tourist_safety_2026
CLIENT_URL=http://localhost:3000
```

### 3. Install All Dependencies
```bash
npm run install:all
```

### 4. Seed Demo Data (Optional)
To populate demo users (Tourist, Responder, Admin) and initial safe zones:
```bash
npm run seed
```

### 5. Run the Application
Start both the Express backend (`http://localhost:5000`) and the React client (`http://localhost:3000`) concurrently:
```bash
npm run dev
```

- **Tourist Portal**: [http://localhost:3000](http://localhost:3000)
- **Police & Rescue Command Center**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🔑 Demo Accounts

| Role | Email | Password | Access |
|------|-------|----------|--------|
| **Tourist** | `tourist@safetour.app` | `password123` | SOS Panic Button, Contacts, Incident Reporting |
| **Responder / Police** | `responder@safetour.app` | `password123` | Real-time SOS Dispatch, Incident Verification |
| **Admin** | `admin@safetour.app` | `password123` | Full Access + Safety Zone Management |
