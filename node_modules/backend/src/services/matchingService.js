import Location from '../models/Location.js';

/**
 * Matches extracted vibe tags from an image against the locations in the DB.
 * @param {string[]} vibeTags - Tags extracted from the AI.
 * @param {number} budgetLevel - Budget level from 1 to 4.
 * @returns {Promise<Object[]>} - Array of matched locations.
 */
export const findMatchingLocations = async (vibeTags, budgetLevel) => {
  // Simple algorithm: Find locations that contain at least one of the tags
  // and match the budget level (or are cheaper).
  
  // In a real scenario, this could use Vector Search or more advanced MongoDB queries.
  try {
    const locations = await Location.find({
      tags: { $in: vibeTags },
      priceLevel: { $lte: budgetLevel }
    }).limit(10);
    
    return locations;
  } catch (error) {
    console.error('Error finding matching locations:', error);
    throw error;
  }
};
