import express from 'express';
import { getFieldReports, createFieldReport } from '../controllers/fieldReportController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getFieldReports);
router.post('/', protect, authorize('FIELD_OFFICER'), createFieldReport);

export default router;
