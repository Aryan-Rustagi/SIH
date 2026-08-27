import { Router } from 'express';
import {
  createIncident,
  getIncidents,
  getAllIncidentsAdmin,
  verifyIncident,
  deleteIncident,
} from '../controllers/incidentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

// Public / Tourist view of verified incidents (or own incidents if logged in)
router.get('/', getIncidents);

// Tourist or Responder reports an incident
router.post('/', protect, createIncident);

// Admin: get all incidents including unverified
router.get('/admin/all', protect, authorize('ADMIN', 'RESPONDER'), getAllIncidentsAdmin);

// Admin: verify incident
router.patch('/:id/verify', protect, authorize('ADMIN', 'RESPONDER'), verifyIncident);

// Admin or Author: delete incident
router.delete('/:id', protect, deleteIncident);

export default router;
