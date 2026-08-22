import Location from '../models/Location.js';
import { mockLocations } from '../data/mockLocations.js';

export const findMatchingLocations = async (vibeTags, budgetLevel) => {
  // budgetLevel is kept for legacy support in this function if needed, 
  // but we mostly rely on the updated logic inside generateItinerary
  try {
    const locations = await Location.find({
      tags: { $in: vibeTags },
      priceLevel: { $lte: budgetLevel }
    }).limit(15);
    return locations;
  } catch (error) {
    console.error('Error finding matching locations:', error);
    throw error;
  }
};

export const generateItinerary = async (vibes, durationDays, budgetVND) => {
  // Try to find matching locations in DB if we had real tags
  // For now, since the DB might not be populated with price_per_pax, 
  // we will fallback to mockLocations heavily.
  
  // Filter mock locations based on the exact budgetVND
  let budgetFilteredLocations = mockLocations.filter(loc => loc.price_per_pax <= budgetVND);
  
  // Fallback just in case filter results in too few locations (e.g. extremely low budget)
  if (budgetFilteredLocations.length < 5) {
    budgetFilteredLocations = mockLocations.filter(loc => loc.price_per_pax === 0);
    // If still empty, just take the cheapest ones
    if (budgetFilteredLocations.length < 5) {
      budgetFilteredLocations = mockLocations.slice(0, 15);
    }
  }

  // Thuật toán xáo trộn (Fisher-Yates) để đảm bảo không bị lặp lại thứ tự
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  let shuffledLocations = shuffleArray(budgetFilteredLocations);
  let mockIndex = 0;

  return Array.from({ length: durationDays }, (_, i) => {
    const dayLocations = [];
    for (let j = 0; j < 3; j++) {
      // Nếu đã dùng hết danh sách, xáo trộn lại một lần nữa rồi vòng lại từ đầu
      if (mockIndex >= shuffledLocations.length) {
        shuffledLocations = shuffleArray(budgetFilteredLocations);
        mockIndex = 0;
      }
      const loc = shuffledLocations[mockIndex];
      dayLocations.push({
        name: loc.name,
        category: loc.category,
        duration: '2-3 hours',
        description: loc.description,
        coordinates: loc.coordinates
      });
      mockIndex++;
    }
    return {
      day: i + 1,
      locations: dayLocations
    };
  });
};

