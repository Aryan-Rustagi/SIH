import express from 'express';
import { getVehicles, updateVehicleLocation } from '../controllers/vehicleController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getVehicles);
router.patch('/:id/location', protect, authorize('ADMIN', 'FIELD_OFFICER'), updateVehicleLocation);

export default router;
