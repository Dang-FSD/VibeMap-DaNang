import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Timeline from '../components/Planner/Timeline';
import DynamicMap from '../components/Map/DynamicMap';
import { ArrowLeft, Share2, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockItinerary = [
  {
    day: 1,
    locations: [
      { name: 'Cầu Rồng (Dragon Bridge)', category: 'Landmark', duration: '1 hour', description: 'Biểu tượng của thành phố Đà Nẵng, đặc biệt đẹp vào ban đêm với màn phun lửa và nước cuối tuần.', coordinates: [16.0611, 108.2268] },
      { name: 'Chợ Hàn (Han Market)', category: 'Shopping', duration: '2 hours', description: 'Chợ truyền thống sầm uất nhất Đà Nẵng, nơi tuyệt vời để thử đặc sản địa phương và mua quà lưu niệm.', coordinates: [16.0680, 108.2238] },
      { name: 'Bãi biển Mỹ Khê', category: 'Nature / Beach', duration: '3 hours', description: 'Một trong những bãi biển quyến rũ nhất hành tinh với dải cát trắng mịn màng.', coordinates: [16.0620, 108.2483] }
    ]
  },
  {
    day: 2,
    locations: [
      { name: 'Bà Nà Hills', category: 'Attraction', duration: '6 hours', description: 'Khu du lịch trên núi với Cầu Vàng nổi tiếng thế giới và Làng Pháp cổ kính.', coordinates: [15.9984, 107.9897] },
      { name: 'Bán đảo Sơn Trà', category: 'Nature', duration: '3 hours', description: 'Lá phổi xanh của thành phố, nơi có Chùa Linh Ứng và tượng Phật Bà Quan Âm cao nhất Việt Nam.', coordinates: [16.1218, 108.2750] }
    ]
  }
];

const Planner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(mockItinerary[0].locations[0].coordinates);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState('0-0');

  // Flatten locations for the map
  const allLocations = mockItinerary.flatMap(day => day.locations);

  const handleLocationSelect = (coordinates, index) => {
    setSelectedLocation(coordinates);
    setSelectedLocationIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
                Da Nang Adventure
              </h1>
              <p className="text-xs text-gray-400">2 Days • Chill & Nature</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
              <Share2 size={18} />
            </button>
            <button className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
              <Download size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Split Screen */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Left Column: Timeline (Scrollable) */}
        <div className="w-full lg:w-2/5 h-[50vh] lg:h-[calc(100vh-64px)] overflow-y-auto p-4 lg:p-8 styled-scrollbar">
          <div className="max-w-xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Your Itinerary</h2>
              <p className="text-gray-400">Perfectly crafted based on your selected vibes.</p>
            </div>
            
            <Timeline 
              days={mockItinerary} 
              onLocationSelect={handleLocationSelect}
              selectedLocationIndex={selectedLocationIndex}
            />
          </div>
        </div>

        {/* Right Column: Dynamic Map (Fixed) */}
        <div className="w-full lg:w-3/5 h-[50vh] lg:h-[calc(100vh-64px)] p-4 lg:p-6 lg:pl-0 bg-gray-900 relative">
          {/* A gradient overlay to blend map edges softly into the dark theme */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-900 to-transparent z-10 hidden lg:block pointer-events-none"></div>
          
          <DynamicMap 
            locations={allLocations} 
            selectedLocation={selectedLocation} 
          />
        </div>

      </main>
      
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
