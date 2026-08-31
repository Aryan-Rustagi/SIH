# AI-Powered Smart Logistics Accessibility Intelligence Platform for NER

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111827)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-realtime-010101?logo=socket.io&logoColor=white)

An AI-powered Smart and Logistics Accessibility Intelligence Platform tailored for the North Eastern Region (NER). The platform addresses challenges related to difficult terrain, weather-induced disruptions, and limited transport connectivity in remote areas. It leverages Artificial Intelligence (AI), Machine Learning (ML), GIS mapping, weather data, and real-time field inputs to monitor transportation networks and improve the movement of essential goods and services.

A comprehensive **MERN Stack** (**M**ongoDB, **E**xpress.js, **R**eact, **N**ode.js) platform built with real-time Socket.IO communication, featuring AI models for route optimization and GIS visualizations.

---

## Problem Statement

This platform seeks the development of an AI-powered Smart Logistics Accessibility Intelligence Platform for the NER to address challenges related to difficult terrain, weather-induced disruptions, and limited transport connectivity in remote areas.

The platform aims to:
- Monitor real-time road, bridge, and transport accessibility across districts and remote locations.
- Predict route disruptions caused by landslides, floods, heavy rainfall, road damage, or traffic congestion.
- Provide AI-based alternate route suggestions and estimated travel delays.
- Track movement of vehicles carrying essential commodities through GPS integration.
- Generate automated alerts for blocked roads, inaccessible regions, delayed deliveries, and high-risk transport corridors.
- Enable field officials and local authorities to upload geo-tagged updates, photographs, and incident reports.
- Create centralized dashboards for visualizing connectivity, logistics bottlenecks, emergency routes, and delivery status.
- Support multilingual notifications and offline data synchronization for low-network areas.

---

## Project Architecture

```
ner-logistics-platform/
├── package.json              # Root orchestration (concurrently runs clients & server)
├── .env.example              # Environment variable template
├── server/                   # Backend (Node.js, Express.js, MongoDB, Socket.io)
│   ├── src/
│   │   ├── config/           # Database connection & integrations
│   │   ├── models/           # Mongoose schemas (Vehicle, Incident, Route, Alert)
│   │   ├── controllers/      # Business logic & socket broadcasters
│   │   ├── routes/           # REST endpoints
│   │   └── server.ts         # Server bootstrap
│   └── package.json
├── client-field/             # Field App for Reporting & Monitoring (React 19, Vite)
├── client-dashboard/         # GIS-Enabled Central Dashboard (React 19, Vite)
└── ai-service/               # AI Route Prediction Engine (FastAPI, Python)
```

---

## Getting Started

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** (Local instance running at `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)
- **Python 3.10+** (For the AI Route Prediction Service)

### 2. Setup Environment
Ensure your `.env` in `server/.env` (and root `.env`) has:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ner_logistics_db
JWT_SECRET=super_secret_jwt_key
CLIENT_URL=http://localhost:3000
```

### 3. Install All Dependencies
```bash
npm run install:all
```

### 4. Run the Application
Start the Express backend, React clients, and AI service concurrently:
```bash
npm run dev
```

- **Field Application**: [http://localhost:3000](http://localhost:3000)
- **Centralized Dashboard**: [http://localhost:3002](http://localhost:3002)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **AI Service**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Production Docker Deployment

Copy `.env.production.example` to `.env.production`, replace placeholders, and run:

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

The stack serves the Field App on port `3000`, the Central Dashboard on port `3002`, and the API on port `5000`. MongoDB uses the persistent `mongo_data` volume.

Check the API with `http://localhost:5000/api/health`. Stop the stack with:

```bash
docker compose -f docker-compose.prod.yml down
```
