import express from 'express';
import { getDeliveries } from '../controllers/deliveryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getDeliveries);

export default router;
