import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Timeline from '../components/Planner/Timeline';
import DynamicMap from '../components/Map/DynamicMap';
import { ArrowLeft, Share2, Download, Save, CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const mockItinerary = [
  {
    day: 1,
    locations: [
      { name: 'Cầu Rồng (Dragon Bridge)', category: 'Landmark', duration: '1 hour', description: 'Biểu tượng của thành phố Đà Nẵng.', coordinates: [16.0611, 108.2268] }
    ]
  }
];

const Toast = ({ message, visible }) => (
  <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-emerald-500 text-white font-bold flex items-center gap-2 shadow-2xl transition-all duration-300 z-50 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
    <CheckCircle size={20} />
    {message}
  </div>
);

const Planner = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get real data from state, or fallback to mock
  const itinerary = location.state?.itinerary || mockItinerary;
  const vibes = location.state?.vibes || ['chill'];

  const [selectedLocation, setSelectedLocation] = useState(itinerary[0]?.locations[0]?.coordinates || [16.0544, 108.2022]);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState('0-0');
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Flatten locations for the map
  const allLocations = itinerary.flatMap(day => day.locations);

  const handleLocationSelect = (coordinates, index) => {
    setSelectedLocation(coordinates);
    setSelectedLocationIndex(index);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!');
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownload = () => {
    let content = `VibeMap Danang - Custom Itinerary\n=================================\n\n`;
    itinerary.forEach(day => {
      content += `Day ${day.day}\n---------------------------------\n`;
      day.locations.forEach(loc => {
        content += `- ${loc.name} (${loc.duration})\n  ${loc.category} | ${loc.description}\n\n`;
      });
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'VibeMap_Danang_Itinerary.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(i18n.language === 'en' ? 'Itinerary downloaded!' : 'Đã tải lịch trình!');
  };

  const handleSaveTrip = async () => {
    try {
      const { saveTrip } = await import('../services/api');
      await saveTrip('My Danang Trip', 2, itinerary.length, itinerary);
      showToast('Trip saved successfully!');
    } catch (e) {
      alert(e.message || 'Failed to save trip. Are you logged in?');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-display">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-cyan-300 bg-clip-text text-transparent">
                VibeMap Adventure
              </h1>
              <p className="text-xs text-slate-400">{itinerary.length} Days • Custom Trip</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleShare} className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors tooltip-trigger" title={t('planner.share')}>
              <Share2 size={18} />
            </button>
            <button onClick={handleDownload} className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors tooltip-trigger" title={t('planner.export')}>
              <Download size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Split Screen */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Left Column: Timeline (Scrollable) */}
        <div className="w-full lg:w-2/5 h-[50vh] lg:h-[calc(100vh-64px)] overflow-y-auto p-4 lg:p-8 styled-scrollbar relative z-10">
          <div className="max-w-xl mx-auto">
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{t('planner.title')}</h2>
                <div className="flex gap-2 flex-wrap mt-2">
                  {vibes.map((vibe, idx) => (
                    <span key={idx} className="bg-primary/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-primary/30">
                      {vibe}
                    </span>
                  ))}
                </div>
              </div>
              <button onClick={handleSaveTrip} className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary hover:to-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/30 transition-transform hover:scale-105">
                <Save size={16} /> {t('planner.save_trip')}
              </button>
            </div>
            
            <Timeline 
              days={itinerary} 
              onLocationSelect={handleLocationSelect}
              selectedLocationIndex={selectedLocationIndex}
            />
          </div>
        </div>

        {/* Right Column: Dynamic Map (Fixed) */}
        <div className="w-full lg:w-3/5 h-[50vh] lg:h-[calc(100vh-64px)] p-4 lg:p-6 lg:pl-0 bg-slate-900 relative">
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-900 to-transparent z-10 hidden lg:block pointer-events-none"></div>
          
          <DynamicMap 
            locations={allLocations} 
            selectedLocation={selectedLocation} 
          />
        </div>
      </main>
      
      <Toast message={toastMessage} visible={toastVisible} />

      <style>{`
        .styled-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .styled-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .styled-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Planner;
