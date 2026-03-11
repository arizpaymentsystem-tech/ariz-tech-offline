import React, { useState, useEffect } from 'react';
import { useTranslation } from '../lib/translations';
import { Bell, Zap, HeartPulse, Target, Star } from 'lucide-react';

export const NewsTicker = () => {
  const { t } = useTranslation();
  
  const news = [
    { text: t.ticker, icon: <Bell className="w-4 h-4" /> },
    { text: "Balegize: Your new personal daily goal assistant is here!", icon: <Target className="w-4 h-4 text-orange-400" /> },
    { text: "Ayizony: Never miss your medication again. Your health, our priority.", icon: <HeartPulse className="w-4 h-4 text-rose-400" /> },
    { text: "Arif Aychekulm: Start your 60-day challenge and transform your life.", icon: <Star className="w-4 h-4 text-yellow-400" /> },
    { text: "Update: Offline tracking enabled for all your plans and meds.", icon: <Zap className="w-4 h-4 text-blue-400" /> }
  ];

  return (
    <div className="bg-blue-950/40 border-y border-blue-900/30 overflow-hidden py-3 backdrop-blur-md">
      <div className="flex whitespace-nowrap animate-ticker">
        {[...news, ...news].map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-8 border-r border-blue-900/50">
            <div className="p-1.5 bg-blue-900/30 rounded-lg text-blue-400">
              {item.icon}
            </div>
            <span className="text-sm font-bold text-blue-200 tracking-tight uppercase italic">
              {item.text}
            </span>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
      `}</style>
    </div>
  );
};