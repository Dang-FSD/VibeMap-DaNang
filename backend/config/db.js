import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/vibemap_danang';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ Warning: Could not connect to MongoDB (${error.message}).`);
    console.warn('👉 Gợi ý: Hãy kiểm tra xem Cluster trên MongoDB Atlas có bị TẠM DỪNG (Paused) hoặc đổi connection string không.');
    console.warn('🔄 Server vẫn đang chạy để phục vụ API và sẽ tự động thử kết nối lại sau mỗi 30 giây...');
    
    // Tự động thử kết nối lại trong nền sau 30 giây thay vì sập server (process.exit)
    setTimeout(connectDB, 30000);
  }
};

export default connectDB;
