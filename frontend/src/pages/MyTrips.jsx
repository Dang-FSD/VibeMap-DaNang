import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getMyTrips } from '../services/api';
import { Map, Calendar, Loader } from 'lucide-react';

export default function MyTrips() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getMyTrips();
        // Assuming backend returns { data: [trips] } or just [trips]
        setTrips(data.data || data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const handleViewTrip = (trip) => {
    // Navigate to planner passing the saved itinerary
    navigate('/planner', { state: { itinerary: trip.itinerary, vibes: ['saved'] } });
  };

  return (
    <div className="min-h-screen bg-slate-900 font-display text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-cyan-300 bg-clip-text text-transparent">VibeMap Danang</h1>
          <button onClick={() => navigate('/dashboard')} className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors">
            {t('nav.home')}
          </button>
        </header>

        <h2 className="text-4xl font-extrabold mb-8">{t('trips.title')}</h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="animate-spin text-cyan-400" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.length === 0 ? (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-white/20 bg-white/5 backdrop-blur-sm rounded-3xl">
                <span className="material-symbols-outlined text-6xl text-slate-500 mb-4">flight_takeoff</span>
                <h3 className="text-xl font-bold text-slate-400">{t('trips.empty')}</h3>
              </div>
            ) : (
              trips.map((trip) => (
                <div key={trip._id} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors shadow-xl group">
                  <h3 className="text-2xl font-bold text-white mb-2">{trip.title || 'My Danang Trip'}</h3>
                  <div className="flex items-center gap-4 text-sm text-cyan-300 mb-6">
                    <span className="flex items-center gap-1"><Calendar size={16}/> {trip.durationDays} {t('trips.days')}</span>
                    <span className="flex items-center gap-1"><Map size={16}/> {trip.itinerary?.length || 0} Days Plan</span>
                  </div>
                  <button 
                    onClick={() => handleViewTrip(trip)}
                    className="w-full py-3 bg-gradient-to-r from-primary to-cyan-500 hover:from-primary hover:to-cyan-400 rounded-xl font-bold transition-transform group-hover:scale-105 shadow-lg shadow-cyan-500/20"
                  >
                    {t('trips.view_trip')}
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
