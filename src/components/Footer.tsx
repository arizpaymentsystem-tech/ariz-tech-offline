import React from 'react';
import { useTranslation } from '../lib/translations';
import { Phone, Send } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#050b12] text-white py-16 px-4 border-t border-blue-900/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-bold text-blue-400 tracking-tight leading-none uppercase">
            {t.footerText}
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-900/10 border border-blue-900/30 w-fit">
              <div className="bg-blue-600/20 p-3 rounded-xl border border-blue-500/30">
                <Phone className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Call Us</span>
                <span className="text-lg font-mono font-bold text-white tracking-wider">+251970025517</span>
              </div>
            </div>

            <a 
              href="https://t.me/ArizInsight_bot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#0088cc]/10 border border-[#0088cc]/30 w-fit hover:bg-[#0088cc]/20 transition-all group"
            >
              <div className="bg-[#0088cc] p-3 rounded-xl shadow-lg shadow-[#0088cc]/20 group-hover:scale-110 transition-transform">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Telegram Bot</span>
                <span className="text-lg font-bold text-white">@ArizInsight_bot</span>
                <span className="text-[10px] text-blue-600 font-bold uppercase italic mt-0.5 group-hover:text-[#0088cc]">Adding...</span>
              </div>
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-end items-end gap-4 text-right">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white tracking-tighter uppercase">Ariz Tech</span>
              <span className="text-blue-500 text-sm font-medium">Innovative Africa</span>
            </div>
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-4xl shadow-2xl shadow-blue-600/20">
              A
            </div>
          </div>
          <p className="max-w-xs text-blue-900 text-xs font-medium leading-relaxed">
            Leading the digital frontier with offline-first solutions tailored for Ethiopia and beyond. Connect, innovate, and grow with Ariz.
          </p>
          <div className="text-[10px] text-blue-950 font-black uppercase tracking-[0.2em] pt-4">
            © 2024 ARIZ INSIGHT TECH • EST 2024
          </div>
        </div>
      </div>
    </footer>
  );
};