import express from 'express';
import { getDisruptions, createDisruption } from '../controllers/disruptionController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getDisruptions);
router.post('/', protect, authorize('FIELD_OFFICER', 'ADMIN'), createDisruption);

export default router;
