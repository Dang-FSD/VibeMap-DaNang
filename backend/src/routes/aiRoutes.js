import express from 'express';
import { analyzeImage, chat } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Yêu cầu đăng nhập mới được tạo lịch trình AI (tránh bị spam hao phí token)
router.post('/analyze', protect, analyzeImage);
router.post('/chat', chat);

export default router;
