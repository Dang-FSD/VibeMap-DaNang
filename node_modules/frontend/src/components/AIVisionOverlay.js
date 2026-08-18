import React from 'react';

const AIVisionOverlay = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0f172a] border border-blue-500/30">
      {/* Scanner Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-[2px] bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] animate-scan" />
      </div>
      
      <div className="p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Analyzing Your Visual Style</h3>
        <p className="text-gray-400">Detecting themes like #MinimalistArchitecture and #CoastalAesthetics</p>
      </div>
      {/* Grid ảnh mockup của ông dán vào đây */}
    </div>
  );
};

export default AIVisionOverlay;