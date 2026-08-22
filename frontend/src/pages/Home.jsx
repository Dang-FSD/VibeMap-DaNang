import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
      duration: 500,
      easing: 'ease-in-out',
    });
  }, []);

  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <header data-aos="fade-down" className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
          <div className="glass-panel border-b border-white/5 dark:border-white/5">
              <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                      <div className="size-8 text-primary flex items-center justify-center">
                          <span className="material-symbols-outlined text-3xl">travel_explore</span>
                      </div>
                      <h2 className="text-xl font-extrabold tracking-tight">VibeMap</h2>
                  </div>
                  <div className="hidden md:flex items-center gap-8">
                      <a className="text-sm font-medium hover:text-primary transition-colors text-slate-600 dark:text-slate-300" href="#">{t('nav.how_it_works')}</a>
                      <a className="text-sm font-medium hover:text-primary transition-colors text-slate-600 dark:text-slate-300" href="#">{t('nav.gallery')}</a>
                      <Link className="text-sm font-medium hover:text-primary transition-colors text-slate-600 dark:text-slate-300" to="/login">{t('nav.login')}</Link>
                      
                      <button onClick={handleLanguageToggle} className="px-3 py-1 rounded-md bg-slate-200 dark:bg-slate-800 font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-xs text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700">
                        {i18n.language.toUpperCase()}
                      </button>

                      <Link to="/register" className="bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2.5 px-5 rounded-lg transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(13,166,242,0.3)] inline-block">
                          {t('nav.start_planning')}
                      </Link>
                  </div>
                  <div className="md:hidden flex items-center gap-4">
                    <button onClick={handleLanguageToggle} className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 font-bold text-xs text-slate-900 dark:text-white">
                      {i18n.language.toUpperCase()}
                    </button>
                    <button className="text-slate-900 dark:text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                  </div>
              </div>
          </div>
      </header>

      <main className="flex flex-col w-full min-h-screen pt-[72px]">
          <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background-dark z-10"></div>
                  <div className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105" data-alt="Cinematic night view of Danang Dragon Bridge and skyline" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1559592442-741eaf7397b6")' }}></div>
              </div>
              <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center max-w-4xl mt-10">
                  <span data-aos="fade-down" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-medium text-white mb-6">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      {t('home.ai_powered')}
                  </span>
                  <h1 data-aos="fade-up" data-aos-delay="200" className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight text-white mb-6 drop-shadow-xl">
                      <span className="whitespace-nowrap">{t('home.title_part1')}</span><br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300">{t('home.title_part2')}</span>
                  </h1>
                  <p data-aos="fade-up" data-aos-delay="400" className="text-lg md:text-xl text-slate-200 max-w-2xl font-light leading-relaxed mb-10 drop-shadow-md">
                      {t('home.subtitle')}
                  </p>
                  <div data-aos="zoom-in" data-aos-delay="600" className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                      <Link to="/register" className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white text-base font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(13,166,242,0.4)] hover:shadow-[0_0_30px_rgba(13,166,242,0.6)] hover:-translate-y-1">
                          <span>{t('home.start_journey')}</span>
                          <span className="material-symbols-outlined text-lg">arrow_forward</span>
                      </Link>
                      <button className="flex items-center justify-center gap-2 glass-panel hover:bg-white/10 text-white text-base font-bold py-4 px-8 rounded-xl transition-all">
                          <span className="material-symbols-outlined text-lg">play_circle</span>
                          <span>{t('home.watch_demo')}</span>
                      </button>
                  </div>
              </div>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
                  <span className="material-symbols-outlined text-3xl">keyboard_arrow_down</span>
              </div>
          </section>

          <section className="w-full bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-white/5 py-8 overflow-hidden">
              <div className="container mx-auto px-6 mb-4" data-aos="fade-right">
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('home.trending')}</p>
              </div>
              <div className="flex overflow-x-auto no-scrollbar pb-4 px-6 gap-6 snap-x" data-aos="fade-up">
                  <div className="snap-center shrink-0 w-[280px] md:w-[320px] group cursor-pointer">
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                          <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1590001158193-79cd6248e391")' }}></div>
                          <div className="absolute bottom-3 left-4 z-20">
                              <h3 className="text-white font-bold text-lg">{t('home.cyberpunk_title')}</h3>
                          </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm pl-1">{t('home.cyberpunk_desc')}</p>
                  </div>
                  <div className="snap-center shrink-0 w-[280px] md:w-[320px] group cursor-pointer">
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                          <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1583417319070-4a69db38a482")' }}></div>
                          <div className="absolute bottom-3 left-4 z-20">
                              <h3 className="text-white font-bold text-lg">{t('home.zen_title')}</h3>
                          </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm pl-1">{t('home.zen_desc')}</p>
                  </div>
                  <div className="snap-center shrink-0 w-[280px] md:w-[320px] group cursor-pointer">
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                          <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1559592442-741eaf7397b6")' }}></div>
                          <div className="absolute bottom-3 left-4 z-20">
                              <h3 className="text-white font-bold text-lg">{t('home.historical_title')}</h3>
                          </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm pl-1">{t('home.historical_desc')}</p>
                  </div>
              </div>
          </section>

          <section className="py-24 bg-background-light dark:bg-background-dark relative">
              <div className="container mx-auto px-6 relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                      <div className="max-w-2xl" data-aos="fade-right">
                          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                              {t('home.steps_title')}<br/>
                              <span className="text-primary">{t('home.steps_subtitle')}</span>
                          </h2>
                          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                              {t('home.steps_desc')}
                          </p>
                      </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div data-aos="fade-up" data-aos-delay="100" className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-primary/10">
                          <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                              <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('home.step1_title')}</h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-6">{t('home.step1_desc')}</p>
                      </div>
                      <div data-aos="fade-up" data-aos-delay="300" className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-primary/10">
                          <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary relative">
                              <span className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20"></span>
                              <span className="material-symbols-outlined text-3xl">view_in_ar</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('home.step2_title')}</h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-6">{t('home.step2_desc')}</p>
                      </div>
                      <div data-aos="fade-up" data-aos-delay="500" className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-primary/10">
                          <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                              <span className="material-symbols-outlined text-3xl">map</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('home.step3_title')}</h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-6">{t('home.step3_desc')}</p>
                      </div>
                  </div>
              </div>
          </section>

          <section className="relative py-32 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-slate-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent z-10"></div>
                  <div className="w-full h-full bg-cover bg-center opacity-30" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1583417319070-4a69db38a482")' }}></div>
              </div>
              <div className="relative z-20 text-center px-6 max-w-3xl mx-auto" data-aos="zoom-in">
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{t('home.ready_title')}</h2>
                  <p className="text-lg md:text-xl text-slate-300 mb-10 font-light">{t('home.ready_desc')}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Link to="/register" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-lg font-bold py-4 px-10 rounded-xl transition-all shadow-[0_0_20px_rgba(13,166,242,0.4)] inline-block">
                          {t('home.start_free')}
                      </Link>
                  </div>
              </div>
          </section>
      </main>

      <footer className="bg-background-dark border-t border-white/5 pt-16 pb-8 text-white">
          <div className="container mx-auto px-6 text-center">
              <p>{t('home.footer')}</p>
          </div>
      </footer>
    </>
  );
}
