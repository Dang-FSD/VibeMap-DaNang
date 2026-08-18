import { analyzeImageVibe } from '../services/aiService.js';
import { generateItinerary } from '../services/matchingService.js';

export const processMoodboard = async (req, res) => {
  try {
    const { image, duration, budget } = req.body;
    
    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // 1. Send image to AI to get vibe tags
    const vibes = await analyzeImageVibe(image);
    console.log('Detected vibes:', vibes);

    // 2. Generate itinerary based on vibes, duration, and budget
    const itinerary = await generateItinerary(vibes, duration, budget);

    res.json({ vibes, itinerary });
  } catch (error) {
    console.error('AI Processing Error:', error);
    res.status(500).json({ message: 'Failed to process moodboard' });
  }
};
