import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';
import tripRoutes from './src/routes/tripRoutes.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

dotenv.config();

const app = express();

// Trust reverse proxy (Cần thiết khi chạy sau Render, Cloudflare để nhận diện đúng IP client)
app.set('trust proxy', 1);

// Security Middlewares
app.use(helmet()); // Set security HTTP headers
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks

// Safe CORS Whitelist
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5173',
  'https://vibemap-danang-1.onrender.com',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Cho phép request từ mobile app, native apps, hoặc curl (không có Origin header) hoặc nằm trong whitelist
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Nguồn truy cập không được phép'));
  },
  credentials: true
}));

// General Rate Limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Tăng lên 300 để tránh chặn nhầm người dùng hợp lệ
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Quá nhiều yêu cầu từ IP của bạn, vui lòng thử lại sau 15 phút' }
});
app.use('/api', generalLimiter);

// Dedicated Rate Limiting cho AI (Chống spam làm cạn kiệt Quota / Tiền AI)
const aiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // tối đa 20 yêu cầu AI trong 5 phút / IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Bạn đang gửi yêu cầu AI quá nhanh. Vui lòng đợi ít phút trước khi thử lại.' }
});
app.use('/api/ai', aiLimiter);

app.use(express.json({ limit: '10mb' })); // Increase limit for image uploads

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/trips', tripRoutes);
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'VibeMap Danang API is running' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({ message: err.message });
  }
  console.error('Unhandled server error:', err);
  res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
});

const PORT = process.env.PORT || 5000;

// Khởi động server lắng nghe PORT để Render không bị crash khi deploy
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  // Kết nối MongoDB trong nền
  connectDB();
});
