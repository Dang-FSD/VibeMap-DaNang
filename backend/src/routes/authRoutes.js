import express from 'express';
import { register, login } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';
import { securityLog } from '../middleware/securityLogger.js';

const router = express.Router();

// Anti-Brute Force Limiter for Login (OWASP A07 & A04)
// Tối đa 5 lần thử đăng nhập trong 15 phút trên mỗi địa chỉ IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    securityLog('RATE_LIMIT_LOGIN_BLOCKED', req, { email: req.body?.email });
    res.status(429).json({ 
      message: 'Quá nhiều lần thử đăng nhập không thành công. Vui lòng thử lại sau 15 phút để đảm bảo an toàn tài khoản.' 
    });
  }
});

// Anti-Spam Registration Limiter (Chống bot spam tạo tài khoản hàng loạt)
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    securityLog('RATE_LIMIT_REGISTER_BLOCKED', req, { email: req.body?.email });
    res.status(429).json({ 
      message: 'Quá nhiều yêu cầu đăng ký từ IP của bạn. Vui lòng thử lại sau ít phút.' 
    });
  }
});

router.post('/register', registerLimiter, register);
router.post('/login', loginLimiter, login);

export default router;
