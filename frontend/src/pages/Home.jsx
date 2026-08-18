import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
      duration: 500,
      easing: 'ease-in-out',
    });
  }, []);

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
                      <a className="text-sm font-medium hover:text-primary transition-colors text-slate-600 dark:text-slate-300" href="#">How it Works</a>
                      <a className="text-sm font-medium hover:text-primary transition-colors text-slate-600 dark:text-slate-300" href="#">Gallery</a>
                      <Link className="text-sm font-medium hover:text-primary transition-colors text-slate-600 dark:text-slate-300" to="/login">Login</Link>
                      <Link to="/register" className="bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2.5 px-5 rounded-lg transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(13,166,242,0.3)] inline-block">
                          Start Planning
                      </Link>
                  </div>
                  <button className="md:hidden text-slate-900 dark:text-white">
                      <span className="material-symbols-outlined">menu</span>
                  </button>
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
                      AI-Powered Travel Planning
                  </span>
                  <h1 data-aos="fade-up" data-aos-delay="200" className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight text-white mb-6 drop-shadow-xl">
                      Your Vibe,<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300">Your Voyage</span>
                  </h1>
                  <p data-aos="fade-up" data-aos-delay="400" className="text-lg md:text-xl text-slate-200 max-w-2xl font-light leading-relaxed mb-10 drop-shadow-md">
                      Experience Danang through the lens of your imagination. Our AI creates the perfect trip based on the photos you love.
                  </p>
                  <div data-aos="zoom-in" data-aos-delay="600" className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                      <Link to="/register" className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white text-base font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(13,166,242,0.4)] hover:shadow-[0_0_30px_rgba(13,166,242,0.6)] hover:-translate-y-1">
                          <span>Start Your Journey</span>
                          <span className="material-symbols-outlined text-lg">arrow_forward</span>
                      </Link>
                      <button className="flex items-center justify-center gap-2 glass-panel hover:bg-white/10 text-white text-base font-bold py-4 px-8 rounded-xl transition-all">
                          <span className="material-symbols-outlined text-lg">play_circle</span>
                          <span>Watch Demo</span>
                      </button>
                  </div>
              </div>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
                  <span className="material-symbols-outlined text-3xl">keyboard_arrow_down</span>
              </div>
          </section>

          <section className="w-full bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-white/5 py-8 overflow-hidden">
              <div className="container mx-auto px-6 mb-4" data-aos="fade-right">
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Trending Vibes</p>
              </div>
              <div className="flex overflow-x-auto no-scrollbar pb-4 px-6 gap-6 snap-x" data-aos="fade-up">
                  <div className="snap-center shrink-0 w-[280px] md:w-[320px] group cursor-pointer">
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                          <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1590001158193-79cd6248e391")' }}></div>
                          <div className="absolute bottom-3 left-4 z-20">
                              <h3 className="text-white font-bold text-lg">Cyberpunk City</h3>
                          </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm pl-1">Neon lights & night markets</p>
                  </div>
                  <div className="snap-center shrink-0 w-[280px] md:w-[320px] group cursor-pointer">
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                          <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1583417319070-4a69db38a482")' }}></div>
                          <div className="absolute bottom-3 left-4 z-20">
                              <h3 className="text-white font-bold text-lg">Tropical Zen</h3>
                          </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm pl-1">Nature, resorts & spa</p>
                  </div>
                  <div className="snap-center shrink-0 w-[280px] md:w-[320px] group cursor-pointer">
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                          <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1559592442-741eaf7397b6")' }}></div>
                          <div className="absolute bottom-3 left-4 z-20">
                              <h3 className="text-white font-bold text-lg">Historical Soul</h3>
                          </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm pl-1">Temples, pagodas & culture</p>
                  </div>
              </div>
          </section>

          <section className="py-24 bg-background-light dark:bg-background-dark relative">
              <div className="container mx-auto px-6 relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                      <div className="max-w-2xl" data-aos="fade-right">
                          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                              3 Simple Steps to<br/>
                              <span className="text-primary">Your Perfect Trip</span>
                          </h2>
                          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                              We use advanced Computer Vision to match your visual taste with real-world destinations in Danang. No more generic itineraries.
                          </p>
                      </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div data-aos="fade-up" data-aos-delay="100" className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-primary/10">
                          <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                              <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Upload Aesthetic Photos</h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-6">Curate a moodboard of images that inspire you. It can be anything from Pinterest pins to Instagram saves.</p>
                      </div>
                      <div data-aos="fade-up" data-aos-delay="300" className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-primary/10">
                          <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary relative">
                              <span className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20"></span>
                              <span className="material-symbols-outlined text-3xl">view_in_ar</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. AI Scans Your Style</h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-6">Our AI analyzes patterns, colors, and architectural styles to understand exactly what you are looking for.</p>
                      </div>
                      <div data-aos="fade-up" data-aos-delay="500" className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-primary/10">
                          <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                              <span className="material-symbols-outlined text-3xl">map</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Get Your Unique Itinerary</h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-6">Receive a personalized map and plan for Danang that hits all the right spots for your vibe.</p>
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
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to find your vibe?</h2>
                  <p className="text-lg md:text-xl text-slate-300 mb-10 font-light">Join thousands of travelers exploring Danang in a whole new way.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Link to="/register" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-lg font-bold py-4 px-10 rounded-xl transition-all shadow-[0_0_20px_rgba(13,166,242,0.4)] inline-block">
                          Start Planning Free
                      </Link>
                  </div>
              </div>
          </section>
      </main>

      <footer className="bg-background-dark border-t border-white/5 pt-16 pb-8 text-white">
          <div className="container mx-auto px-6 text-center">
              <p>© 2024 VibeMap Danang. All rights reserved.</p>
          </div>
      </footer>
    </>
  );
}
