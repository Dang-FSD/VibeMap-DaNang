import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  budgetLevel: { type: Number, min: 1, max: 4, default: 2 }, // Vibe-to-budget
  durationDays: { type: Number, required: true, default: 3 },
  itinerary: [{
    day: { type: Number },
    locations: [{
      name: String,
      category: String,
      duration: String,
      description: String,
      coordinates: [Number]
    }]
  }]
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
