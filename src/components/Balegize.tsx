import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Trash2, CheckCircle, XCircle, Flame, Target } from 'lucide-react';
import { useTranslation } from '../lib/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface Plan {
  id: string;
  text: string;
  time: string;
  type: string;
  completed?: boolean;
  failed?: boolean;
  createdAt: number;
  prompted?: boolean;
}

export const Balegize = () => {
  const { t } = useTranslation();
  const [plans, setPlans] = useState<Plan[]>(() => {
    const saved = localStorage.getItem('ariz_plans');
    return saved ? JSON.parse(saved) : [];
  });
  const [newPlan, setNewPlan] = useState('');
  const [newTime, setNewTime] = useState('');
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('ariz_streak')) || 0);

  useEffect(() => {
    localStorage.setItem('ariz_plans', JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem('ariz_streak', streak.toString());
  }, [streak]);

  // Sync with background timer updates
  useEffect(() => {
    const syncInterval = setInterval(() => {
       const saved = localStorage.getItem('ariz_plans');
       if (saved) setPlans(JSON.parse(saved));
       const savedStreak = localStorage.getItem('ariz_streak');
       if (savedStreak) setStreak(Number(savedStreak));
    }, 2000);
    return () => clearInterval(syncInterval);
  }, []);

  const addPlan = () => {
    if (!newPlan || !newTime) return;
    const plan: Plan = {
      id: Date.now().toString(),
      text: newPlan,
      time: newTime,
      type: 'daily',
      createdAt: Date.now(),
    };
    setPlans([plan, ...plans]);
    setNewPlan('');
    setNewTime('');
    toast.success('እቅድ ተመዝግቧል! (Plan recorded!)');
  };

  const deletePlan = (id: string) => {
    setPlans(plans.filter(p => p.id !== id));
  };

  const markStatus = (id: string, success: boolean) => {
    setPlans(plans.map(p => {
      if (p.id === id) {
        if (success && !p.completed) setStreak(s => s + 1);
        return { ...p, completed: success, failed: !success, prompted: true };
      }
      return p;
    }));
    toast.info(success ? 'ጎበዝ! ስትሪክ ጨምረሃል።' : 'እቅዱ አልተሳካም። በሚቀጥለው ይሳካል።');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="relative overflow-hidden rounded-[2rem] p-8 mb-8 border border-blue-800/50 shadow-2xl">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa1b9dd0-7b7d-48f5-98da-33c9a52f4c3a/balegize-background-4b6d4581-1773268779223.webp" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" 
          alt="background"
        />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black text-white flex items-center gap-3 tracking-tighter uppercase italic">
              {t.balegize}
            </h1>
            <p className="text-blue-300 mt-2 font-medium">የእለት እቅድዎን ይመዝግቡ፣ በሰዓቱ ይተግብሩ።</p>
          </div>
          <div className="flex items-center gap-4 bg-[#0B1B2B]/80 backdrop-blur-xl p-5 rounded-3xl border border-orange-500/30 shadow-lg shadow-orange-500/5">
            <Flame className="w-10 h-10 text-orange-500 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-xs text-orange-300 uppercase font-black tracking-widest">{t.streak}</span>
              <span className="text-3xl font-black text-white tabular-nums">{streak} DAYS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#112336] p-8 rounded-[2rem] border border-blue-800/50 shadow-2xl mb-12 relative overflow-hidden group">
        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
          <Plus className="w-6 h-6 text-blue-400" />
          {t.addPlan}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <input
              type="text"
              value={newPlan}
              onChange={(e) => setNewPlan(e.target.value)}
              placeholder={t.planPlaceholder}
              className="w-full bg-[#0B1B2B] border border-blue-800 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-blue-900"
            />
          </div>
          <div className="md:col-span-3">
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full bg-[#0B1B2B] border border-blue-800 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <button
            onClick={addPlan}
            className="md:col-span-3 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl px-6 py-4 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
          >
            {t.save.toUpperCase()}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode='popLayout'>
          {plans.map((plan) => (
            <motion.div
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={plan.id}
              className={`p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
                plan.completed ? 'bg-green-950/20 border-green-500/30' : 
                plan.failed ? 'bg-red-950/20 border-red-500/30' : 
                'bg-[#112336] border-blue-800/30 hover:border-blue-500/50'
              }`}
            >
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  plan.completed ? 'bg-green-500/20 text-green-400' : 
                  plan.failed ? 'bg-red-500/20 text-red-400' : 
                  'bg-blue-500/10 text-blue-400'
                }`}>
                  <Target className="w-8 h-8" />
                </div>
                <div>
                  <h4 className={`text-2xl font-black tracking-tight ${
                    plan.completed ? 'text-green-300' : 
                    plan.failed ? 'text-red-300' : 
                    'text-white uppercase italic'
                  }`}>
                    {plan.text}
                  </h4>
                  <div className="flex items-center gap-2 text-blue-400 font-mono text-sm mt-1 bg-blue-900/20 px-3 py-0.5 rounded-full w-fit">
                    <Clock className="w-4 h-4" />
                    {plan.time}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {!plan.prompted && (
                   <div className="flex items-center gap-2 p-1.5 bg-[#0B1B2B] rounded-2xl border border-blue-900/30">
                     <span className="text-[10px] font-black text-blue-500 uppercase px-3 tracking-widest">{t.didSuccess}</span>
                     <button 
                        onClick={() => markStatus(plan.id, true)} 
                        className="p-3 bg-green-500/10 hover:bg-green-500/30 text-green-400 rounded-xl transition-all active:scale-90"
                      >
                       <CheckCircle className="w-6 h-6" />
                     </button>
                     <button 
                        onClick={() => markStatus(plan.id, false)} 
                        className="p-3 bg-red-500/10 hover:bg-red-500/30 text-red-400 rounded-xl transition-all active:scale-90"
                      >
                       <XCircle className="w-6 h-6" />
                     </button>
                   </div>
                )}
                {plan.prompted && (
                  <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${plan.completed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {plan.completed ? 'SUCCESS' : 'FAILED'}
                  </div>
                )}
                <button
                  onClick={() => deletePlan(plan.id)}
                  className="p-4 text-red-900 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {plans.length === 0 && (
          <div className="text-center py-24 bg-blue-950/10 rounded-[3rem] border-4 border-dashed border-blue-900/20">
            <div className="w-24 h-24 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-800">
              <Target className="w-12 h-12" />
            </div>
            <p className="text-blue-500 font-black text-xl uppercase tracking-tighter italic">ምንም እቅድ አልተመዘገበም</p>
            <p className="text-blue-800 text-sm mt-2">የእለቱን እቅድ ከላይ ይጨምሩ</p>
          </div>
        )}
      </div>
    </div>
  );
};