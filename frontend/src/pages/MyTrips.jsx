import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function MyTrips() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-primary">VibeMap Danang</h1>
          <button onClick={() => navigate('/dashboard')} className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {t('nav.dashboard')}
          </button>
        </header>

        <h2 className="text-4xl font-extrabold mb-8">{t('nav.myTrips')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Empty State placeholder */}
          <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
            <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">flight_takeoff</span>
            <h3 className="text-xl font-bold text-slate-500">No trips planned yet.</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
