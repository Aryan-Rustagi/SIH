import express from 'express';
import { getRoutes, updateRouteCondition } from '../controllers/routeController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getRoutes);
router.patch('/:id/condition', protect, authorize('ADMIN', 'FIELD_OFFICER'), updateRouteCondition);

export default router;
