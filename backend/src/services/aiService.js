// Mock implementation for AI Service. Will integrate with Google Gemini 1.5 Pro Vision API later.

/**
 * Analyzes an image and returns a list of vibe tags.
 * @param {string} base64Image - The image to analyze in base64 format.
 * @returns {Promise<string[]>} - Array of tags e.g., ['cyberpunk', 'neon', 'nightlife']
 */
export const analyzeImageVibe = async (base64Image) => {
  console.log('Sending image to AI for analysis...');
  // TODO: Integrate actual Google Gemini API here
  
  // Mock response for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['cyberpunk', 'neon', 'nightlife', 'street_food']);
    }, 2000); // simulate 2s API delay
  });
};
