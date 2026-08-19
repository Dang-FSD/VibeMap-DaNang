import { analyzeImageVibe, generateChatResponse, generateAIItinerary } from '../services/aiService.js';
import { generateItinerary as generateMockItinerary } from '../services/matchingService.js';

export const analyzeImage = async (req, res) => {
  try {
    const { image, duration, budget } = req.body;
    
    // 1. Analyze Vibes
    const vibes = await analyzeImageVibe(image);
    
    // 2. Generate Smart Itinerary using AI directly
    let itinerary = await generateAIItinerary(vibes, duration || 3, budget || 2);
    
    // 3. Fallback to Mock if AI fails
    if (!itinerary) {
      console.warn("Falling back to matchingService mock due to AI failure or missing API key.");
      itinerary = await generateMockItinerary(vibes, duration || 3, budget || 2);
    }

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
