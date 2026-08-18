import express from 'express';
import { analyzeImage, chat } from '../controllers/aiController.js';

const router = express.Router();

router.post('/analyze', analyzeImage);
router.post('/chat', chat);

export default router;
