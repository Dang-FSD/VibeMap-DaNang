import express from 'express';
import { saveTrip, getMyTrips } from '../controllers/tripController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, saveTrip);
router.get('/', protect, getMyTrips);

export default router;
