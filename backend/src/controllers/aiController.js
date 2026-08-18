import { analyzeImageVibe, generateChatResponse } from '../services/aiService.js';
import { generateItinerary } from '../services/matchingService.js';

export const analyzeImage = async (req, res) => {
  try {
    const { image, duration, budget } = req.body;
    const vibes = await analyzeImageVibe(image);
    const itinerary = await generateItinerary(vibes, duration || 3, budget || 2);
    res.json({ vibes, itinerary });
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ message: 'Failed to analyze image' });
  }
};

export const chat = async (req, res) => {
  try {
    const { messages } = req.body;
    const reply = await generateChatResponse(messages);
    res.json({ reply });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ message: 'Failed to chat' });
  }
};
