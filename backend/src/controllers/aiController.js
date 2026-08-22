import { analyzeImageVibe, generateChatResponse, generateAIItinerary } from '../services/aiService.js';
import { generateItinerary as generateMockItinerary } from '../services/matchingService.js';

export const analyzeImage = async (req, res) => {
  try {
    const { image, duration, durationDays, budgetVND, mood, preferences } = req.body;
    
    // Ensure we have a valid duration number
    const finalDuration = durationDays || duration || 3;
    const finalBudget = budgetVND || 1500000; // default 1.5m VND

    // 1. Analyze Vibes
    let vibes = [];
    if (image) {
      vibes = await analyzeImageVibe(image);
    }
    
    // If user provided a mood, we can prepend it to the AI detected vibes to strengthen it
    if (mood) {
      if (!vibes.includes(mood)) {
        vibes.unshift(mood);
      }
    }
    
    if (vibes.length === 0) {
      vibes = ['chill']; // Ultimate fallback
    }
    
    // 2. Generate Smart Itinerary using AI directly
    let itinerary = await generateAIItinerary(vibes, finalDuration, finalBudget, preferences);
    
    // 3. Fallback to Mock if AI fails
    if (!itinerary) {
      console.warn("Falling back to matchingService mock due to AI failure or missing API key.");
      itinerary = await generateMockItinerary(vibes, finalDuration, finalBudget);
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
