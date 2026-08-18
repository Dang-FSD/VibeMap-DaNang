import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  budgetLevel: { type: Number, min: 1, max: 4, default: 2 }, // Vibe-to-budget
  durationDays: { type: Number, required: true, default: 3 },
  itinerary: [{
    day: { type: Number },
    locations: [{
      location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
      timeFrame: { type: String } // e.g., 'Morning', 'Afternoon', 'Evening'
    }]
  }]
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
