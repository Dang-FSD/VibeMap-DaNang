import Location from '../models/Location.js';

export const findMatchingLocations = async (vibeTags, budgetLevel) => {
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

export const generateItinerary = async (vibes, durationDays, budgetLevel) => {
  const locations = await findMatchingLocations(vibes, budgetLevel);
  
  if (locations.length === 0) {
    console.log('No locations in DB, returning mock itinerary');
    return Array.from({ length: durationDays }, (_, i) => ({
      day: i + 1,
      locations: [
        { name: 'Cầu Rồng (Dragon Bridge)', category: 'Landmark', duration: '1 hour', description: 'Biểu tượng của thành phố Đà Nẵng, đặc biệt đẹp vào ban đêm.', coordinates: [16.0611, 108.2268] },
        { name: 'Chợ Hàn (Han Market)', category: 'Shopping', duration: '2 hours', description: 'Chợ truyền thống sầm uất nhất Đà Nẵng.', coordinates: [16.0680, 108.2238] },
        { name: 'Bãi biển Mỹ Khê', category: 'Nature / Beach', duration: '3 hours', description: 'Một trong những bãi biển quyến rũ nhất hành tinh.', coordinates: [16.0620, 108.2483] }
      ]
    }));
  }

  const itinerary = [];
  let locationIndex = 0;

  for (let i = 1; i <= durationDays; i++) {
    const dayLocations = [];
    const locsPerDay = Math.min(3, locations.length - locationIndex);
    
    for (let j = 0; j < locsPerDay; j++) {
      if (locationIndex < locations.length) {
        const loc = locations[locationIndex];
        // Ensure coordinates are [lat, lng] for frontend
        const lat = loc.coordinates.coordinates[1];
        const lng = loc.coordinates.coordinates[0];
        
        dayLocations.push({
          name: loc.name,
          category: loc.category,
          duration: '2 hours',
          description: loc.description,
          coordinates: [lat, lng]
        });
        locationIndex++;
      }
    }
    
    if (dayLocations.length > 0) {
      itinerary.push({ day: i, locations: dayLocations });
    }
  }

  return itinerary;
};
