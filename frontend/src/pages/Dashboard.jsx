import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AiScannerModal from '../components/AiScannerModal';
import { analyzeMoodboard } from '../services/api';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  
  const [imageBase64, setImageBase64] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budgetVND, setBudgetVND] = useState(1500000);
  const [mood, setMood] = useState('chill');
  
  const [preferences, setPreferences] = useState({
    companion: 'solo',
    pace: 'moderate',
    dietary: 'none',
    transport: 'motorbike',
    primaryGoal: 'exploration'
  });

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
    
    if (!startDate || !endDate) {
      alert('Please select start and end dates.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      alert('End date must be after start date.');
      return;
    }
    
    const diffTime = Math.abs(end - start);
    const durationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    setIsScanning(true);
    try {
      const payload = {
        image: imageBase64,
        durationDays,
        budgetVND: Number(budgetVND),
        mood,
        preferences
      };
      const result = await analyzeMoodboard(payload);
      // Navigate to planner with the result
      navigate('/planner', { state: { itinerary: result.itinerary, vibes: result.vibes } });
    } catch (error) {
      console.error(error);
      alert('Failed to analyze image. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const handlePrefChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Core Settings */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-slate-200 dark:border-slate-700 pb-2">Trip Settings</h3>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-2">Start Date</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-2">End Date</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Budget per day (VND)</label>
                <div className="relative">
                  <input type="number" min="0" step="100000" value={budgetVND} onChange={(e) => setBudgetVND(e.target.value)} className="w-full p-3 pl-4 pr-16 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none font-bold" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">VNĐ</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Example: 1500000 = 1.5 Million VND / day</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Current Mood</label>
                <select value={mood} onChange={(e) => setMood(e.target.value)} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none">
                  <option value="chill">Chill & Relaxing</option>
                  <option value="adventurous">Adventurous & Active</option>
                  <option value="romantic">Romantic & Intimate</option>
                  <option value="cultural">Cultural & Historic</option>
                  <option value="party">Nightlife & Party</option>
                </select>
              </div>
            </div>

            {/* Travel Preferences */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-slate-200 dark:border-slate-700 pb-2">Travel Preferences</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-600 dark:text-slate-400">Who's traveling?</label>
                  <select name="companion" value={preferences.companion} onChange={handlePrefChange} className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none text-sm">
                    <option value="solo">Solo</option>
                    <option value="couple">Couple</option>
                    <option value="family">Family (with kids/elders)</option>
                    <option value="friends">Group of Friends</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-600 dark:text-slate-400">Pace</label>
                  <select name="pace" value={preferences.pace} onChange={handlePrefChange} className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none text-sm">
                    <option value="relaxed">Relaxed (2-3 places/day)</option>
                    <option value="moderate">Moderate</option>
                    <option value="fast">Fast-packed (Explore all!)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-600 dark:text-slate-400">Dietary</label>
                  <select name="dietary" value={preferences.dietary} onChange={handlePrefChange} className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none text-sm">
                    <option value="none">No restrictions</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="halal">Halal</option>
                    <option value="no-seafood">Seafood Allergy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-600 dark:text-slate-400">Transport</label>
                  <select name="transport" value={preferences.transport} onChange={handlePrefChange} className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none text-sm">
                    <option value="motorbike">Motorbike Rental</option>
                    <option value="grab">Taxi / Grab</option>
                    <option value="walking">Walking / Bicycle</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-slate-600 dark:text-slate-400">Primary Goal</label>
                  <select name="primaryGoal" value={preferences.primaryGoal} onChange={handlePrefChange} className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none text-sm">
                    <option value="exploration">Exploration & Sightseeing</option>
                    <option value="relaxation">Relaxation & Healing</option>
                    <option value="food">Food Tour</option>
                    <option value="photography">Photography / Check-ins</option>
                  </select>
                </div>
              </div>
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
