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
    const baseMockLocations = [
      // ĐÀ NẴNG
      { name: 'Cầu Rồng (Dragon Bridge)', category: 'Landmark', duration: '1 hour', description: 'Biểu tượng của thành phố Đà Nẵng, đặc biệt đẹp vào ban đêm.', coordinates: [16.0611, 108.2268] },
      { name: 'Chợ Hàn (Han Market)', category: 'Shopping', duration: '2 hours', description: 'Chợ truyền thống sầm uất nhất Đà Nẵng.', coordinates: [16.0680, 108.2238] },
      { name: 'Bãi biển Mỹ Khê', category: 'Nature / Beach', duration: '3 hours', description: 'Một trong những bãi biển quyến rũ nhất hành tinh.', coordinates: [16.0620, 108.2483] },
      { name: 'Bà Nà Hills', category: 'Entertainment', duration: '6 hours', description: 'Khu du lịch trên núi tuyệt đẹp với Cầu Vàng.', coordinates: [15.9996, 107.9890] },
      { name: 'Chùa Linh Ứng - Bán đảo Sơn Trà', category: 'Culture / Nature', duration: '2 hours', description: 'Ngôi chùa linh thiêng với tượng Phật Bà Quan Âm cao nhất Việt Nam.', coordinates: [16.1011, 108.2758] },
      { name: 'Ngũ Hành Sơn (Marble Mountains)', category: 'Nature / Cave', duration: '3 hours', description: 'Quần thể 5 ngọn núi đá vôi với nhiều hang động huyền bí.', coordinates: [16.0028, 108.2646] },
      { name: 'Cầu Tình Yêu Đà Nẵng', category: 'Landmark', duration: '1 hour', description: 'Nơi lưu giữ những chiếc ổ khóa tình yêu lãng mạn ven sông Hàn.', coordinates: [16.0624, 108.2274] },
      { name: 'Bảo tàng Điêu khắc Chăm', category: 'Culture / Heritage', duration: '2 hours', description: 'Nơi lưu giữ di sản văn hóa Chăm Pa lớn nhất Việt Nam.', coordinates: [16.0601, 108.2235] },
      { name: 'Công viên Châu Á (Asia Park)', category: 'Entertainment', duration: '4 hours', description: 'Khu vui chơi giải trí hàng đầu với vòng quay Sun Wheel.', coordinates: [16.0382, 108.2274] },
      { name: 'Bãi tắm Non Nước', category: 'Nature / Beach', duration: '3 hours', description: 'Bãi biển hoang sơ, cát trắng mịn nằm ngay chân Ngũ Hành Sơn.', coordinates: [15.9982, 108.2657] },
      { name: 'Đèo Hải Vân', category: 'Nature / Scenic', duration: '2 hours', description: 'Thiên hạ đệ nhất hùng quan nối liền Đà Nẵng và Thừa Thiên Huế.', coordinates: [16.1925, 108.1258] },
      { name: 'Hồ Hòa Trung', category: 'Nature / Lake', duration: '2 hours', description: 'Hồ nước yên bình như thảo nguyên Mông Cổ giữa lòng Đà Nẵng.', coordinates: [16.0827, 108.0831] },
      { name: 'Rạn Nam Ô', category: 'Nature / Scenic', duration: '2 hours', description: 'Bãi rạn đá ngầm phủ đầy rêu xanh mướt tuyệt đẹp.', coordinates: [16.1260, 108.1363] },
      // HỘI AN
      { name: 'Phố Cổ Hội An', category: 'Culture / Heritage', duration: '4 hours', description: 'Phố cổ ngập tràn đèn lồng, di sản văn hóa thế giới.', coordinates: [15.8778, 108.3283] },
      { name: 'Cù Lao Chàm', category: 'Nature / Island', duration: '8 hours', description: 'Hòn đảo hoang sơ thích hợp lặn ngắm san hô.', coordinates: [15.9525, 108.5283] },
      { name: 'Rừng Dừa Bảy Mẫu', category: 'Nature / Eco', duration: '3 hours', description: 'Khám phá miền Tây thu nhỏ giữa lòng Hội An với thuyền thúng.', coordinates: [15.8722, 108.3614] },
      { name: 'Làng gốm Thanh Hà', category: 'Culture / Craft', duration: '2 hours', description: 'Trải nghiệm tự tay làm gốm truyền thống.', coordinates: [15.8795, 108.3039] },
      { name: 'Chùa Cầu (Japanese Bridge)', category: 'Landmark / Heritage', duration: '1 hour', description: 'Biểu tượng lịch sử nổi tiếng nhất Hội An.', coordinates: [15.8771, 108.3256] },
      { name: 'Reaching Out Teahouse', category: 'Cafe', duration: '1 hour', description: 'Quán trà yên tĩnh tuyệt đối giữa lòng phố cổ.', coordinates: [15.8774, 108.3275] },
      // HUẾ
      { name: 'Đại Nội Huế', category: 'Culture / Heritage', duration: '4 hours', description: 'Kinh thành xưa của triều Nguyễn với kiến trúc lộng lẫy.', coordinates: [16.4678, 107.5772] },
      { name: 'Lăng Khải Định', category: 'Culture / Heritage', duration: '2 hours', description: 'Sự pha trộn tinh tế giữa kiến trúc Đông và Tây.', coordinates: [16.3989, 107.5902] },
      { name: 'Chùa Thiên Mụ', category: 'Culture / Religion', duration: '2 hours', description: 'Ngôi chùa cổ kính nằm e ấp bên bờ sông Hương.', coordinates: [16.4534, 107.5445] },
      { name: 'Lăng Tự Đức', category: 'Culture / Heritage', duration: '2 hours', description: 'Lăng tẩm lãng mạn và thơ mộng nhất triều Nguyễn.', coordinates: [16.4331, 107.5658] },
      { name: 'Chợ Đông Ba', category: 'Shopping / Food', duration: '2 hours', description: 'Trung tâm mua sắm và ẩm thực truyền thống lớn nhất Huế.', coordinates: [16.4716, 107.5925] }
    ];

    // Thuật toán xáo trộn (Fisher-Yates) để đảm bảo không bị lặp lại thứ tự
    const shuffleArray = (array) => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    let shuffledLocations = shuffleArray(baseMockLocations);
    let mockIndex = 0;

    return Array.from({ length: durationDays }, (_, i) => {
      const dayLocations = [];
      for (let j = 0; j < 3; j++) {
        // Nếu đã dùng hết danh sách, xáo trộn lại một lần nữa rồi vòng lại từ đầu
        if (mockIndex >= shuffledLocations.length) {
          shuffledLocations = shuffleArray(baseMockLocations);
          mockIndex = 0;
        }
        dayLocations.push(shuffledLocations[mockIndex]);
        mockIndex++;
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
