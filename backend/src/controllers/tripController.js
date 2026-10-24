import Trip from '../models/Trip.js';
import { securityLog } from '../middleware/securityLogger.js';

// OWASP A03 (Injection) & A04 (Insecure Design) Protection
export const saveTrip = async (req, res) => {
  try {
    const { title, budgetLevel, durationDays, itinerary } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      securityLog('UNAUTHORIZED_SAVE_TRIP_ATTEMPT', req);
      return res.status(401).json({ message: 'Vui lòng đăng nhập để lưu lịch trình' });
    }

    // Input Validation
    if (!title || typeof title !== 'string' || title.trim().length === 0 || title.length > 100) {
      return res.status(400).json({ message: 'Tên chuyến đi không hợp lệ (tối đa 100 ký tự)' });
    }

    const parsedDuration = parseInt(durationDays, 10);
    if (isNaN(parsedDuration) || parsedDuration < 1 || parsedDuration > 30) {
      return res.status(400).json({ message: 'Số ngày phải từ 1 đến 30 ngày' });
    }

    const parsedBudget = parseInt(budgetLevel, 10);
    const validBudget = (!isNaN(parsedBudget) && parsedBudget >= 1 && parsedBudget <= 4) ? parsedBudget : 2;

    if (!Array.isArray(itinerary) || itinerary.length === 0 || itinerary.length > 30) {
      return res.status(400).json({ message: 'Dữ liệu lịch trình không hợp lệ' });
    }

    // Sanitize itinerary items
    const sanitizedItinerary = itinerary.slice(0, 30).map((dayItem, idx) => ({
      day: parseInt(dayItem.day || idx + 1, 10),
      locations: Array.isArray(dayItem.locations) 
        ? dayItem.locations.slice(0, 10).map(loc => ({
            name: String(loc.name || '').substring(0, 100),
            category: String(loc.category || 'General').substring(0, 50),
            duration: String(loc.duration || '2 hours').substring(0, 50),
            description: String(loc.description || '').substring(0, 500),
            coordinates: Array.isArray(loc.coordinates) && loc.coordinates.length === 2
              ? [Number(loc.coordinates[0]), Number(loc.coordinates[1])]
              : [16.0544, 108.2022]
          }))
        : []
    }));

    const newTrip = new Trip({
      user: userId,
      title: title.trim(),
      budgetLevel: validBudget,
      durationDays: parsedDuration,
      itinerary: sanitizedItinerary
    });

    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    console.error('Error saving trip:', error);
    res.status(500).json({ message: 'Không thể lưu lịch trình lúc này' });
  }
};

export const getMyTrips = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Chưa xác thực' });
    }
    const trips = await Trip.find({ user: userId }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    console.error('Error getting trips:', error);
    res.status(500).json({ message: 'Không thể tải danh sách chuyến đi' });
  }
};
