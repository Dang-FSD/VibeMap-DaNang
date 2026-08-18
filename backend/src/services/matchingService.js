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
    const allMockLocations = [
      { name: 'Cầu Rồng (Dragon Bridge)', category: 'Landmark', duration: '1 hour', description: 'Biểu tượng của thành phố Đà Nẵng, đặc biệt đẹp vào ban đêm.', coordinates: [16.0611, 108.2268] },
      { name: 'Chợ Hàn (Han Market)', category: 'Shopping', duration: '2 hours', description: 'Chợ truyền thống sầm uất nhất Đà Nẵng.', coordinates: [16.0680, 108.2238] },
      { name: 'Bãi biển Mỹ Khê', category: 'Nature / Beach', duration: '3 hours', description: 'Một trong những bãi biển quyến rũ nhất hành tinh.', coordinates: [16.0620, 108.2483] },
      { name: 'Bà Nà Hills', category: 'Entertainment', duration: '6 hours', description: 'Khu du lịch trên núi tuyệt đẹp với Cầu Vàng.', coordinates: [15.9996, 107.9890] },
      { name: 'Chùa Linh Ứng - Bán đảo Sơn Trà', category: 'Culture / Nature', duration: '2 hours', description: 'Ngôi chùa linh thiêng với tượng Phật Bà Quan Âm cao nhất Việt Nam.', coordinates: [16.1011, 108.2758] },
      { name: 'Ngũ Hành Sơn (Marble Mountains)', category: 'Nature / Cave', duration: '3 hours', description: 'Quần thể 5 ngọn núi đá vôi với nhiều hang động huyền bí.', coordinates: [16.0028, 108.2646] },
      { name: 'Phố Cổ Hội An', category: 'Culture / Heritage', duration: '4 hours', description: 'Phố cổ ngập tràn đèn lồng, cách Đà Nẵng 30km.', coordinates: [15.8778, 108.3283] },
      { name: 'Cù Lao Chàm', category: 'Nature / Island', duration: '8 hours', description: 'Hòn đảo hoang sơ thích hợp lặn ngắm san hô.', coordinates: [15.9525, 108.5283] },
      { name: 'Đèo Hải Vân', category: 'Nature / Scenic', duration: '2 hours', description: 'Thiên hạ đệ nhất hùng quan nối liền Đà Nẵng và Thừa Thiên Huế.', coordinates: [16.1925, 108.1258] },
    ];

    let mockIndex = 0;
    return Array.from({ length: durationDays }, (_, i) => {
      const dayLocations = [];
      for (let j = 0; j < 3; j++) {
        if (mockIndex < allMockLocations.length) {
          dayLocations.push(allMockLocations[mockIndex]);
          mockIndex++;
        } else {
          dayLocations.push(allMockLocations[mockIndex % allMockLocations.length]);
          mockIndex++;
        }
      }
      return {
        day: i + 1,
        locations: dayLocations
      };
    });
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
