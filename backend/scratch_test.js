import { generateAIItinerary } from './src/services/aiService.js';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  console.log("Testing generateAIItinerary...");
  try {
    const itinerary = await generateAIItinerary(['chill', 'nature'], 14, 2);
    if (!itinerary) {
      console.log("Returned null, meaning it failed and fell back to mock.");
    } else {
      console.log("Success! Generated days:", itinerary.length);
    }
  } catch (e) {
    console.error("Error:", e);
  }
}

test();
