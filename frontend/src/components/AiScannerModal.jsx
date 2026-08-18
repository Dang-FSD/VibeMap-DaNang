import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function AiScannerModal({ isOpen }) {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          // Fake progress up to 95%, waiting for real API to finish and close modal
          if (prev >= 95) {
            return 95;
          }
          return prev + Math.floor(Math.random() * 10) + 2;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-surface-dark border border-slate-700 rounded-3xl p-8 shadow-2xl flex flex-col items-center overflow-hidden">
        {/* Animated Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse" style={{ top: `${progress}%`, boxShadow: '0 0 15px 5px rgba(13, 166, 242, 0.5)' }}></div>
        
        <div className="w-24 h-24 mb-6 rounded-full border-4 border-slate-700 border-t-primary animate-spin"></div>
        
        <h3 className="text-2xl font-bold text-white mb-2">{t('dashboard.scanning')}</h3>
        <div className="w-full h-2 bg-slate-800 rounded-full mt-4 overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-slate-400 mt-2 text-sm">{progress}%</p>
      </div>
    </div>
  );
}
