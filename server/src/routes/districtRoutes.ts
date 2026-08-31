import express from 'express';
import { getDistricts } from '../controllers/districtController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getDistricts);

export default router;
