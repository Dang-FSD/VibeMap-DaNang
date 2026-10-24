import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { register } from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 8) {
      setError(i18n.language === 'en' ? 'Password must be at least 8 characters' : 'Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }

    if (password !== confirmPassword) {
      setError(i18n.language === 'en' ? 'Passwords do not match' : 'Mật khẩu xác nhận không khớp');
      return;
    }

    setIsLoading(true);
    
    try {
      const data = await register(name, email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      alert(`${t('auth.register_failed')} ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col font-display text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden bg-background-light dark:bg-background-dark">
      {/* Navbar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-6 md:px-10 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <svg className="size-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
              <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">VibeMap Danang</h2>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" to="/">{t('nav.home')}</Link>
            <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">{t('nav.explore')}</a>
            <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">{t('nav.itineraries')}</a>
          </nav>

          <button onClick={handleLanguageToggle} className="px-3 py-1 rounded-md bg-slate-200 dark:bg-slate-800 font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-xs text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700">
            {i18n.language.toUpperCase()}
          </button>

          <Link to="/login" className="hidden md:flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary hover:bg-primary/20 text-sm font-bold transition-all">
            {t('nav.login')}
          </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left Side: Visual/Hero */}
        <div className="relative w-full md:w-1/2 min-h-[300px] md:h-auto overflow-hidden bg-slate-900 flex items-center justify-center">
          <div className="absolute inset-0 z-0 opacity-60 bg-cover bg-center" data-alt="Beautiful aerial view of Danang Golden Bridge at sunset" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBycGCL0vwgGyB53LA2jnIfc8qohr7LneR23emhMcUCTPIo-YKu_imREayHAayBRTt6zXB0h2VFE2NecUatxo2c4s0ExMMeWqHBLwRlPTUOIS1Ss3W9NKjpDRmVtia5ADURV3CL4OfqACMu6Ucqx89p_pYAFCWkVvDij3Qk2KRodEoodvFCnseJprGg3rpyjmrbjdZS-V0nxOOnTlQO5qhaJ5sr02Nu6bJpp1cUh9eZ-oVFgOz7Geuv3HVffC6OGkfkv8ZyrGzACg')" }}></div>
          <div className="absolute inset-0 z-10 bg-gradient-to-tr from-background-dark via-background-dark/40 to-transparent"></div>
          {/* Floating 3D Elements Placeholder */}
          <div className="relative z-20 p-12 max-w-lg">
            <div className="mb-8 flex space-x-4">
              <div className="bg-primary/20 backdrop-blur-xl border border-primary/30 p-4 rounded-2xl shadow-2xl animate-bounce-slow">
                <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
              </div>
              <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl">
                <span className="material-symbols-outlined text-4xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              {t('home.title_part1')} <br/><span className="text-primary">{t('home.title_part2')}</span>.
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {t('home.steps_desc')}
            </p>
            <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-slate-800" data-alt="User profile avatar one" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7o-cCaLmRT3BHfRa5p3QP6H2atbSDC3mCTG1nw_LHc-XNYy8hmjEMyA0WCad4bDBmWAFsLM2eQsXTP0yvpnjByju6MBtLTzEJnZMI793O6a7Gtr1l6UudfvIhAlcu8DALt6O4c8clC6_ksDcKtFLgnmIZKOzcm4schSFCGUeibYS6vaq8lHc9OJhVqJjR17wkXg8V5Y1iflCnmdu8f8UXm9G6Lu2BQBBGWEJQo6EIfV6VLu1lpyY5sh2gLqK3cwh5hZ1bAsgyQQ"/>
                <img className="w-8 h-8 rounded-full border-2 border-slate-800" data-alt="User profile avatar two" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-B-APHKXyc4fmxR7-KiVDu4oBCkOth1PbQFI4oNez5L7cf8UQa1q95gX9O9qRWGbomjk6IN7deO6_sEmf3dxVvdGtQKZplqfvPkANuypJ3xcVaIM4bdJV15lmpKAnLV99OFAU_gE9x50ZmOt3Rhd_fnmLJeUGL3wzV54bqqIGNj7l88Q1iYBsAoOTUlkJxHw8oJ9Fwy_WZvSe0OQg5MiAX7TA9mcf45JMbZqw8cqBvrcitfai7gK-kC9LNUOPxnEF-AolMA3BNw"/>
                <img className="w-8 h-8 rounded-full border-2 border-slate-800" data-alt="User profile avatar three" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7NI9k55Wf9AKSYkzbGFCLDoeclOM89bjqWX5t5uQ1Zoo_U9VuhVWMOQM7qRRXhGgiYrp3iQR6Y4i2UcwDJkFf4-JPGSuK4EyqAKPjAuEJNv1sZ8J6opYlqjZknfrSq0D8JmyECCZCakNxvZyzpdqc7RIFy002c8omeFpLfHI0dbMCVhihj1TjnGFysSZpteWq2LSVfq54g1H70CoZ3XNH5vkg2qFxh4o2ZOMi9Q_0XssOrefxLcB3VhlEXUrDYQp26C9NQQ5b7A"/>
              </div>
              <p className="text-sm text-slate-300 font-medium">Joined by 2,000+ travelers today</p>
            </div>
          </div>
        </div>
        {/* Right Side: Sign Up Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-20 bg-background-light dark:bg-background-dark">
          <div className="w-full max-w-[440px] space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t('auth.create_account')}</h2>
              <p className="text-slate-500 dark:text-slate-400">{t('auth.join_future')}</p>
            </div>
            
            {error && <div className="text-red-500 text-sm font-semibold text-center bg-red-100 dark:bg-red-900/30 p-2 rounded">{error}</div>}

            <form className="space-y-5" onSubmit={handleRegister}>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">{t('auth.full_name')}</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">person</span>
                  <input className="w-full pl-12 pr-4 h-12 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all outline-none" placeholder="John Doe" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">{t('auth.email')}</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">mail</span>
                  <input className="w-full pl-12 pr-4 h-12 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all outline-none" placeholder="john@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">{t('auth.password')}</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">lock</span>
                    <input className="w-full pl-12 pr-4 h-12 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all outline-none" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">{t('auth.confirm_password')}</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">shield_lock</span>
                    <input className="w-full pl-12 pr-4 h-12 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all outline-none" placeholder="••••••••" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2">
                <input className="size-5 rounded-md border-slate-300 dark:border-slate-700 text-primary focus:ring-primary bg-transparent" id="terms" type="checkbox" required />
                <label className="text-sm text-slate-600 dark:text-slate-400" htmlFor="terms">
                  {t('auth.agree_terms')}
                </label>
              </div>
              <button disabled={isLoading} className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-[0_0_20px_rgba(13,166,242,0.4)] hover:shadow-[0_0_35px_rgba(13,166,242,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group disabled:opacity-70" type="submit">
                <span>{isLoading ? t('auth.creating_btn') : t('auth.create_btn')}</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </form>
            <div className="relative py-4 flex items-center">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="flex-shrink mx-4 text-sm text-slate-500 font-medium">{t('auth.or_signup_with')}</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 h-12 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <img alt="Google Logo" className="size-5" data-alt="Google colorful brand icon logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxowY245KehwW8aP-0z1rlni7UXIPqU2kTjhfv-wSMXdz5K0wEkp2NPUFnKzbPGkueti7NAzWVChQGcaML5cjEuVBaL82AscW-zovTVL3rmLge_IuzZSaKqqbQostNhJDr6tkQCLvRRPgjs5mkXE8rlyNmK0etBB0q96mL0bHv2Q0LGcnQdrkNHp9_SIjDu-5z3tGiFzrhZWfER59yBc-SDAvRZWLFrXDfcJU-r2NP-coHFK7vv7MsTegnmQBe8-LtFb6MyxFTZA"/>
                <span className="text-sm font-semibold dark:text-white">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 h-12 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <img alt="Apple Logo" className="size-5 dark:invert" data-alt="Apple brand icon logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg-uQ-0KY9HHcICwpyA2iwnzLi6rHV1S5en_6YRhOiVqU6byejUAtPqish8xX3ewnzwDteAaa2xJUklSthvTfzWJPEk-CEGgvMcg6Dh3xv0ZcycywMLMwhhQSHr-RAbBNKOIzWRsCK83P02VRmuXUBPyqILppr66anCETykh7ovaXiMHThNZRAwhjzeFt3YH7T796H2tjlZowdG1ldqzdk7D3B1hb_vDctTSOrQVIsVIx5In2F7L9z1cunnggBwgdhbzD3NycKCA"/>
                <span className="text-sm font-semibold dark:text-white">Apple</span>
              </button>
            </div>
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              {t('auth.already_have_account')} <Link className="text-primary font-bold hover:underline ml-1" to="/login">{t('auth.sign_in')}</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
