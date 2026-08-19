import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      alert(`${t('auth.login_failed')} ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="flex h-screen w-full font-display text-slate-900 dark:text-slate-100 antialiased overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Absolute Language Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button onClick={handleLanguageToggle} className="px-3 py-1 rounded-md bg-white/20 backdrop-blur-md dark:bg-slate-800/50 font-bold hover:bg-white/40 dark:hover:bg-slate-700/50 transition-colors text-xs text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700">
          {i18n.language.toUpperCase()}
        </button>
      </div>

      {/* Left Side: Cinematic Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" data-alt="Cinematic Danang skyline at night with blue lights" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0BDXC_kNU_g-xx8Kxs9zePTbqGxzL4pR2VvAHHcsIBSC8JVx7dpJJ5fVW9UCYwf4rmHqwFb0zsQS1a9XqZcxntfKxwsD0h0PusB1SHCvc0lgareuI0PQ2uj5yncJEW6o6m_tUhcb_Yaw3tLtcrBjZwQDL1n7xFG308tsdM5DdexjQu3IH4oLWH6c9_JfjV9uIPbO0DvTc-ipH1hJAmESSQjnlzMiXiU3XBXTCkuwaMRdUJjKIR9thq43aB_9eKqrzSYsoeQqCKg')" }}>
        </div>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
        <div className="absolute bottom-12 left-12 z-10 max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white">explore</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">VibeMap Danang</h1>
          </div>
          <h2 className="text-4xl font-extrabold leading-tight text-white mb-4">
            {t('home.title_part1')} <br/> {t('home.title_part2')}.
          </h2>
          <p className="text-slate-300 text-lg">
            {t('home.steps_desc')}
          </p>
        </div>
      </div>
      {/* Right Side: Login Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-background-light dark:bg-background-dark">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <Link to="/">
              <span className="material-symbols-outlined text-primary text-4xl">explore</span>
            </Link>
            <span className="text-2xl font-bold dark:text-white">VibeMap Danang</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold tracking-tight dark:text-slate-100">{t('auth.welcome_back')}</h3>
            <p className="text-slate-500 dark:text-slate-400">{t('auth.enter_details')}</p>
          </div>
          {/* Social Logins */}
          <div className="grid grid-cols-3 gap-4">
            <button className="flex items-center justify-center py-3 px-4 rounded-xl border border-slate-200 dark:border-primary/20 bg-white dark:bg-primary/5 hover:bg-slate-50 dark:hover:bg-primary/10 transition-colors">
              <img alt="" className="h-5 w-5" data-alt="Google logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9uriqIrx3QZb0fad2oK4TGIhixKxd9Lq_GmU-awhZDwsdyELA9Ml2xjO74dONYUXQanZp953AqmnMY2PGypn_AtO-13Q3MPR_Rf2qtUlGSUNfMYMCTZPh_3bnd_UmhNgosYjOB8D_hE26RnW83VvrDCzJe0hkGnZza_JynSoPxqpXajHUzz91y-pzeRFsQmJOaK3LkD6kl6_JsnQ6r2EIB8WlsyoES57YmM1KcJGCpw6oPi_lLJ5Uuo0W_Zi7GzPxXAjz0Ov1pA"/>
            </button>
            <button className="flex items-center justify-center py-3 px-4 rounded-xl border border-slate-200 dark:border-primary/20 bg-white dark:bg-primary/5 hover:bg-slate-50 dark:hover:bg-primary/10 transition-colors">
              <img alt="" className="h-5 w-5 dark:invert" data-alt="Apple logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZceTbM7xkJNzOHwd5F8t1bPsQuUpb1fgpt2QOS-RbvQtc4xZ1H7RnHfpX0VFu5dQzRvjcKhPgQXUIr40IyyPfDq1O2WZ1D2m_jdpfygbG0EvdGU4Jskv8TgDoZ7hWJF-LeS13L-2cAQObklbE9qOIzu14o3Uayw_7AiD3xtNCknMZ_ZfVLxZ6d093K_L44qXo50nxlW3f-1U8RoIlr2ZAXK9FtQ-tfpiCDX70uG8Ru9s9Qoi7lMf0QpYdJ3OQ96kMSeKFUCEhMA"/>
            </button>
            <button className="flex items-center justify-center py-3 px-4 rounded-xl border border-slate-200 dark:border-primary/20 bg-white dark:bg-primary/5 hover:bg-slate-50 dark:hover:bg-primary/10 transition-colors">
              <img alt="" className="h-5 w-5" data-alt="Facebook logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfv7-D3JguIMwfS92ExzCzjlWQ7Q7cQL7RUjQKBCahQ6G2Pa7QS6UuGviDEEbg8ieUxeoczPJJqCRD1DFlEK3ZuhLmN_tVwycTv6OjaAvTe4cmnqLQzPcW3flmb38zyj4i1YC1CLNlOmBKmcfzdtu7EYXYvnKH_Lb0xZl3F9ilXtM_1XMPIgcSi3GYi0Pvb2aFbkrfJDrlNXROD6dUlMX9imFpxZ4c2CmI5AfDH1HBqyY6i8rEhUBDUSGwMfOn3ZlUaon3QS0BHA"/>
            </button>
          </div>
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background-light dark:bg-background-dark px-2 text-slate-500">{t('auth.or_continue')}</span>
            </div>
          </div>
          
          {error && <div className="text-red-500 text-sm font-semibold text-center">{error}</div>}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="email">{t('auth.email')}</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
                <input 
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-500" 
                  id="email" placeholder="name@example.com" type="email"
                  value={email} onChange={(e) => setEmail(e.target.value)} required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="password">{t('auth.password')}</label>
                <a className="text-xs font-semibold text-primary hover:underline" href="#">{t('auth.forgot_password')}</a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
                <input 
                  className="w-full pl-12 pr-12 py-4 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-500" 
                  id="password" placeholder="••••••••" type="password"
                  value={password} onChange={(e) => setPassword(e.target.value)} required
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" type="button">
                  <span className="material-symbols-outlined text-lg">visibility</span>
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary dark:bg-slate-900" id="remember" type="checkbox"/>
              <label className="text-sm text-slate-600 dark:text-slate-400" htmlFor="remember">{t('auth.remember_me')}</label>
            </div>
            <button disabled={isLoading} className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70" type="submit">
              {isLoading ? t('auth.signing_in') : t('auth.sign_in')}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </form>
          <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
            {t('auth.dont_have_account')} 
            <Link className="text-primary font-bold hover:underline ml-1" to="/register">{t('auth.sign_up')}</Link>
          </p>
        </div>
        {/* Footer Small Link */}
        <div className="absolute bottom-8 text-xs text-slate-500 dark:text-slate-600">
          {t('home.footer')}
        </div>
      </div>
    </div>
  );
}
