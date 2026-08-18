import React from 'react';
import { MapPin, Clock, Navigation } from 'lucide-react';

const Timeline = ({ days, onLocationSelect, selectedLocationIndex }) => {
  return (
    <div className="space-y-8 pb-10">
      {days.map((day, dayIndex) => (
        <div key={dayIndex} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-6 sticky top-0 bg-gray-900/40 backdrop-blur-md p-2 rounded-xl text-center z-10">
            Day {dayIndex + 1}
          </h3>
          
          <div className="relative border-l-2 border-indigo-400/50 ml-4 space-y-8">
            {day.locations.map((loc, locIndex) => {
              // Create a unique key/index to track selection
              const uniqueIndex = `${dayIndex}-${locIndex}`;
              const isSelected = selectedLocationIndex === uniqueIndex;
              
              return (
                <div 
                  key={locIndex} 
                  className={`relative pl-8 cursor-pointer transition-all duration-300 transform ${isSelected ? 'scale-105' : 'hover:scale-102 hover:translate-x-2'}`}
                  onClick={() => onLocationSelect(loc.coordinates, uniqueIndex)}
                >
                  {/* Dot on the timeline */}
                  <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-gray-900 ${isSelected ? 'bg-indigo-400' : 'bg-gray-400'}`}></div>
                  
                  {/* Content Card */}
                  <div className={`bg-white/5 backdrop-blur-sm p-5 rounded-2xl border ${isSelected ? 'border-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.5)]' : 'border-white/10'} hover:bg-white/10 transition-colors`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-semibold text-white">{loc.name}</h4>
                      <span className="flex items-center text-xs font-medium bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">
                        <Clock size={12} className="mr-1" /> {loc.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <MapPin size={14} className="mr-1 text-pink-400" />
                      {loc.category}
                    </div>
                    
                    <p className="text-gray-300 text-sm line-clamp-2">{loc.description}</p>
                    
                    {isSelected && (
                      <div className="mt-4 flex gap-2">
                        <button className="flex items-center justify-center w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-medium transition-colors">
                          <Navigation size={14} className="mr-2" /> Directions
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
