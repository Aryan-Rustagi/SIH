import { Router } from 'express';
import { getRedZones } from '../controllers/redZoneController.js';

const router = Router();

router.get('/', getRedZones);

export default router;
