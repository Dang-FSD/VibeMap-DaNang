import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ['Food', 'Cafe', 'Nature', 'Culture', 'Nightlife', 'Accommodation'], required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  tags: [{ type: String }], // e.g., ['cyberpunk', 'neon', 'street_food', 'minimalist']
  priceLevel: { type: Number, min: 1, max: 4, default: 2 }, // 1: Cheap, 4: Luxury
  images: [{ type: String }]
}, { timestamps: true });

const Location = mongoose.model('Location', locationSchema);
export default Location;
