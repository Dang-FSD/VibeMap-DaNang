import Trip from '../models/Trip.js';

export const saveTrip = async (req, res) => {
  try {
    const { title, budgetLevel, durationDays, itinerary } = req.body;
    const userId = req.user.id;

    const newTrip = new Trip({
      user: userId,
      title,
      budgetLevel,
      durationDays,
      itinerary
    });

    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    console.error('Error saving trip:', error);
    res.status(500).json({ message: 'Failed to save trip' });
  }
};

export const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    console.error('Error getting trips:', error);
    res.status(500).json({ message: 'Failed to get trips' });
  }
};
