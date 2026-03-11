import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Clock, User, Calendar as CalendarIcon, ChevronDown, Send, ArrowRight } from 'lucide-react';
import { useTranslation } from '../lib/translations';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const ARIZ_LOGO = "https://storage.googleapis.com/dala-prod-public-storage/attachments/25cab608-917a-4966-b9cf-701cc0d43455/1773267721969_ARIZONA-removebg-preview.png";

export const Header = ({ onNavigate }: { onNavigate: (section: string) => void }) => {
  const { language, setLanguage, t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [localTime, setLocalTime] = useState(new Date());
  const [globalTime, setGlobalTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime(new Date());
      const now = new Date();
      setGlobalTime(new Date(now.getTime() + now.getTimezoneOffset() * 60000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'balegize', label: t.balegize },
    { id: 'aizoyn', label: t.aizoyn },
    { id: 'arif', label: t.arif },
    { id: 'shekay', label: t.shekay },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1B2B] text-white shadow-lg border-b border-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => onNavigate('home')}>
          <img src={ARIZ_LOGO} alt="Ariz Logo" className="h-10 w-auto object-contain" />
          <span className="hidden sm:block font-black text-xl tracking-tight text-white">ARIZ TECH</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Time & Date (Hidden on Mobile) */}
          <div className="hidden lg:flex flex-col text-[10px] leading-tight text-blue-200 border-x border-blue-900/30 px-4">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-blue-400" />
              <span>{t.localTime}: {format(localTime, 'HH:mm:ss')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-blue-400" />
              <span>{t.globalTime}: {format(globalTime, 'HH:mm:ss')}</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <CalendarIcon className="w-3 h-3 text-blue-400" />
              <span>{format(localTime, 'dd/MM/yyyy')}</span>
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative group shrink-0">
            <button className="flex items-center gap-1 text-xs md:text-sm bg-blue-900/30 px-2 py-1.5 rounded-lg hover:bg-blue-800/50 transition-colors border border-blue-800/20">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="uppercase font-bold">{language}</span>
              <ChevronDown className="w-3 h-3 opacity-50" />
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-[#0B1B2B] border border-blue-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] overflow-hidden">
              {(['am', 'en', 'ar', 'fr'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-800 transition-colors ${language === lang ? 'bg-blue-600/20 text-blue-400 font-bold' : 'text-blue-100'}`}
                >
                  {lang === 'am' ? 'አማርኛ' : lang === 'en' ? 'English' : lang === 'ar' ? 'العربية' : 'Français'}
                </button>
              ))}
            </div>
          </div>

          {/* Account Button */}
          <button 
            onClick={() => setIsAccountOpen(true)}
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-900/20 shrink-0"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Hamburger Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-blue-900/50 rounded-xl transition-colors border border-blue-800/20 shrink-0"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Hamburger Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-[#0B1B2B] shadow-2xl z-50 border-l border-blue-800/50 flex flex-col"
            >
              <div className="p-6 border-b border-blue-900/30 flex justify-between items-center">
                <span className="font-bold text-blue-400">MENU</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-blue-900/50 rounded-lg">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col gap-1 p-4 flex-grow overflow-y-auto">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-4 rounded-xl hover:bg-blue-800/50 text-blue-100 transition-all font-semibold text-lg flex items-center justify-between group"
                  >
                    {item.label}
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
              
              {/* Sidebar Footer with Clock */}
              <div className="p-6 bg-blue-950/20 border-t border-blue-900/30 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-blue-300">
                  <Clock className="w-5 h-5" />
                  <div className="flex flex-col">
                    <span className="text-xs uppercase opacity-60">{t.localTime}</span>
                    <span className="text-lg font-mono font-bold">{format(localTime, 'HH:mm:ss')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-blue-300">
                  <CalendarIcon className="w-5 h-5" />
                  <div className="flex flex-col">
                    <span className="text-xs uppercase opacity-60">Date</span>
                    <span className="text-sm font-medium">{format(localTime, 'EEEE, MMMM do')}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Account Modal */}
      <AnimatePresence>
        {isAccountOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAccountOpen(false)}
              className="absolute inset-0 bg-[#0B1B2B]/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative w-full max-w-md bg-[#112336] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-blue-800/50 p-8 overflow-hidden"
            >
              {/* Decorative light */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/20 blur-[80px] rounded-full" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-black tracking-tight text-white uppercase">
                    {t.account}
                  </h2>
                  <button 
                    onClick={() => setIsAccountOpen(false)}
                    className="p-2 rounded-full hover:bg-blue-800/50 text-blue-400 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form className="space-y-5" onSubmit={(e) => {
                  e.preventDefault();
                  setIsAccountOpen(false);
                }}>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-blue-400 uppercase tracking-widest px-1">{t.name}</label>
                    <input type="text" placeholder="Abebe Bikila" className="w-full bg-[#0B1B2B] border border-blue-800 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-blue-400 uppercase tracking-widest px-1">{t.email}</label>
                    <input type="email" placeholder="example@ariztech.com" className="w-full bg-[#0B1B2B] border border-blue-800 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-blue-400 uppercase tracking-widest px-1">{t.password}</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-[#0B1B2B] border border-blue-800 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-lg py-4 rounded-xl mt-4 transition-all active:scale-95 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
                    {t.submit}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};