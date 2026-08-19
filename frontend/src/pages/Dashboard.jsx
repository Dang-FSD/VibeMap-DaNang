import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AiScannerModal from '../components/AiScannerModal';
import { analyzeMoodboard } from '../services/api';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [budget, setBudget] = useState(2);
  const [duration, setDuration] = useState(3);
  const [imageBase64, setImageBase64] = useState(null);

  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imageBase64) {
      alert(t('dashboard.upload_placeholder') || 'Please upload an image first!');
      return;
    }
    
    setIsScanning(true);
    try {
      const result = await analyzeMoodboard(imageBase64, duration, budget);
      // Navigate to planner with the result
      navigate('/planner', { state: { itinerary: result.itinerary, vibes: result.vibes } });
    } catch (error) {
      console.error(error);
      alert('Failed to analyze image. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-primary">VibeMap Danang</h1>
          <div className="flex gap-4 items-center">
            <button onClick={handleLanguageToggle} className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
              {i18n.language.toUpperCase()}
            </button>
            <button onClick={() => navigate('/')} className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {t('nav.home')}
            </button>
          </div>
        </header>

        <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold mb-4">{t('dashboard.title')}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">{t('dashboard.subtitle')}</p>
          </div>

          <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center hover:border-primary transition-colors cursor-pointer mb-8 bg-slate-50 dark:bg-slate-900/50 block relative overflow-hidden">
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            {imageBase64 ? (
              <div className="absolute inset-0">
                <img src={imageBase64} alt="Uploaded moodboard" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <span className="text-white font-bold text-xl">Change Image</span>
                </div>
              </div>
            ) : (
              <>
                <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">cloud_upload</span>
                <h3 className="text-xl font-bold mb-2">{t('dashboard.upload_placeholder')}</h3>
                <p className="text-slate-500">{t('dashboard.upload_button')}</p>
              </>
            )}
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 z-10 relative">
            <div>
              <label className="block text-sm font-semibold mb-4">{t('dashboard.budget')}</label>
              <input type="range" min="1" max="4" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full accent-primary" />
              <div className="text-center font-bold text-primary mt-3 text-sm bg-primary/10 py-2 rounded-lg border border-primary/20">
                {t(`dashboard.budget_level_${budget}`)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-4">{t('dashboard.duration')} ({duration})</label>
              <input type="range" min="1" max="14" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full accent-primary" />
            </div>
          </div>

          <button onClick={handleAnalyze} className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-bold text-lg shadow-lg hover:shadow-primary/50 transition-all flex justify-center items-center gap-2 group z-10 relative">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">auto_awesome</span>
            {t('dashboard.analyze_btn')}
          </button>
        </div>
      </div>
      
      <AiScannerModal isOpen={isScanning} />
    </div>
  );
}
