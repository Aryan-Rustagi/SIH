import { Router } from 'express';
import {
  predictDisruption,
  suggestAlternateRoutes,
  logisticsChat,
  getCorridorRisk,
} from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// AI Intelligence Endpoints
router.post('/predict-disruption', protect, predictDisruption);
router.post('/suggest-routes', protect, suggestAlternateRoutes);
router.post('/chat', protect, logisticsChat);
router.post('/corridor-risk', protect, getCorridorRisk);

export default router;
