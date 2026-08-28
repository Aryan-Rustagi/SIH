import { Router } from 'express';
import { getRiskZones } from '../controllers/riskZoneController.js';

const router = Router();

router.get('/', getRiskZones);

export default router;
