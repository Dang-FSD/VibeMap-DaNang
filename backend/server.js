import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';
import tripRoutes from './src/routes/tripRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit for image uploads

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/trips', tripRoutes);
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'VibeMap Danang API is running' });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
