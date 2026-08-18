import express from 'express';
import { processMoodboard } from '../controllers/aiController.js';

const router = express.Router();

router.post('/analyze', processMoodboard);

export default router;
