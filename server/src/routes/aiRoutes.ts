import { Router } from 'express';
import {
  getRiskScore,
  generateRedZones,
  safetyChat,
  generateRiskZones,
  checkGeofence,
} from '../controllers/aiController.js';

const router = Router();

// Groq-powered
router.post('/risk-score', getRiskScore);
router.post('/generate-red-zones', generateRedZones);

// xAI Grok-powered
router.post('/chat', safetyChat);
router.post('/check-geofence', checkGeofence);
router.post('/generate-risk-zones', generateRiskZones);

export default router;
