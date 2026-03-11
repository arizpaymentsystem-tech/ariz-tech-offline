import React, { useState, useEffect } from 'react';
import { BookOpen, ShieldCheck, Sparkles, Brain, CheckCircle2, Trophy, ArrowRight, Zap, Flame, UserCheck, Plus } from 'lucide-react';
import { useTranslation } from '../lib/translations';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Habit {
  id: string;
  name: string;
  startDate: number;
  completedDays: number[];
}

export const ArifAychekulm = () => {
  const { t } = useTranslation();
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('ariz_habits');
    return saved ? JSON.parse(saved) : [];
  });
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    localStorage.setItem('ariz_habits', JSON.stringify(habits));
  }, [habits]);

  const startChallenge = () => {
    if (!newHabit) return;
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit,
      startDate: Date.now(),
      completedDays: [],
    };
    setHabits([...habits, habit]);
    setNewHabit('');
    toast.success('60-ቀን ቻሌንጅ ተጀምሯል! በርታ! (60-Day Challenge Started!)');
  };

  const toggleDay = (habitId: string, day: number) => {
    setHabits(habits.map(h => {
      if (h.id === habitId) {
        const days = h.completedDays.includes(day)
          ? h.completedDays.filter(d => d !== day)
          : [...h.completedDays, day];
        return { ...h, completedDays: days };
      }
      return h;
    }));
  };

  const guidanceItems = [
    {
      title: t.selfCare,
      icon: <UserCheck className="w-8 h-8" />,
      content: "ራስን ማርካት የሚጀምረው በራስ በመተማመን ነው። በየቀኑ ምስጋናን ተለማመዱ። ትናንሽ ድሎችን ማክበር አይርሱ። አንተ ለራስህ በቂ ነህ።",
      details: "True satisfaction comes from inner peace. Practice gratitude daily and acknowledge your small wins.",
      color: "blue"
    },
    {
      title: t.depressionGuidance,
      icon: <Brain className="w-8 h-8" />,
      content: "ድብርት ጊዜያዊ ደመና እንጂ ሰማዩ አይደለም። ከወዳጅ ዘመድ ጋር ይነጋገሩ፣ ሰውነትዎን ለ10 ደቂቃ ያንቀሳቅሱ። ይህ ስሜት እንደሚያልፍ ያስታውሱ።",
      details: "Depression is a cloud, not the sky. Reach out to loved ones, move your body even for 10 minutes.",
      color: "purple"
    },
    {
      title: t.addictionRecovery,
      icon: <ShieldCheck className="w-8 h-8" />,
      content: "ሱስን ለማሸነፍ በየሰከንዱ የምታደርገው ውሳኔ ድል ነው። ለሱስ መነሻ የሆኑ ሁኔታዎችን ለይተህ እወቅ። መጥፎ ልምዶችን በጥሩ ይተኩ።",
      details: "Every second you choose differently is a victory. Identify triggers and replace bad habits with positive ones.",
      color: "green"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-16">
      <div className="relative overflow-hidden rounded-[3rem] p-12 text-center border border-blue-800/30 shadow-2xl">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa1b9dd0-7b7d-48f5-98da-33c9a52f4c3a/arif-aychekulm-background-555f25a1-1773268778625.webp" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none scale-110" 
          alt="background"
        />
        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic"
          >
            {t.arif}
          </motion.h1>
          <p className="text-blue-300 text-xl max-w-2xl mx-auto font-medium leading-relaxed italic">
            "ቀስ በቀስ እንቁላል በእግሩ ይሄዳል።" የተሻለ ማንነትዎን ለመገንባት የቀን በቀን ጥረት።
          </p>
        </div>
      </div>

      {/* Guidance Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {guidanceItems.map((item, i) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={item.title}
            className="p-10 bg-[#112336] border border-blue-800/30 rounded-[2.5rem] relative overflow-hidden group hover:border-blue-500/50 hover:shadow-2xl transition-all"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.color}-500/5 blur-[100px] rounded-full group-hover:bg-${item.color}-500/10 transition-all`} />
            <div className={`w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 mb-8 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all`}>
              {item.icon}
            </div>
            <h3 className="text-3xl font-black text-white mb-4 tracking-tight uppercase italic">{item.title}</h3>
            <p className="text-blue-100 leading-relaxed font-medium mb-4">
              {item.content}
            </p>
            <p className="text-blue-500/60 text-xs italic">
              {item.details}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Habit Challenge Section */}
      <section className="bg-[#112336] rounded-[3rem] border border-blue-800/50 p-10 md:p-16 shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div>
              <h2 className="text-5xl font-black text-white flex items-center gap-4 tracking-tighter uppercase italic">
                <Trophy className="w-12 h-12 text-yellow-500" />
                {t.habitChallenge}
              </h2>
              <p className="text-blue-300 mt-2 text-lg font-medium">አዲስ ልምድ ለመጀመር 60 ቀናት ይወስዳል።</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="አዲስ ልምድ ያስገቡ (ለምሳሌ: ንባብ)"
                className="bg-[#0B1B2B] border border-blue-800 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-80 font-medium placeholder:text-blue-900"
              />
              <button
                onClick={startChallenge}
                className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-90"
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {habits.map((habit) => (
              <div key={habit.id} className="bg-[#0B1B2B]/40 p-10 rounded-[2.5rem] border border-blue-800/30 hover:border-blue-500/30 transition-all shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-3xl font-black text-white uppercase italic tracking-tight">{habit.name}</h4>
                      <p className="text-blue-500 text-sm font-bold uppercase tracking-widest mt-1">Consistency is Key</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="text-3xl font-black text-blue-400 tabular-nums">{habit.completedDays.length}</div>
                     <div className="text-blue-800 font-black uppercase text-xs tracking-widest leading-none">DAYS<br/>DONE</div>
                     <div className="w-px h-8 bg-blue-900 mx-2" />
                     <div className="text-3xl font-black text-blue-900 tabular-nums">60</div>
                  </div>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-3">
                  {Array.from({ length: 60 }).map((_, i) => {
                    const day = i + 1;
                    const isCompleted = habit.completedDays.includes(day);
                    return (
                      <button
                        key={i}
                        onClick={() => toggleDay(habit.id, day)}
                        className={`aspect-square rounded-xl text-xs font-black transition-all border-2 flex items-center justify-center ${
                          isCompleted
                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                            : 'bg-blue-950/20 border-blue-900/30 text-blue-900 hover:border-blue-500/50 hover:text-blue-500'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {habits.length === 0 && (
              <div className="text-center py-24 border-4 border-dashed border-blue-900/10 rounded-[3rem]">
                <div className="w-24 h-24 bg-blue-900/10 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-900">
                  <Zap className="w-12 h-12" />
                </div>
                <p className="text-blue-900 font-black text-2xl uppercase tracking-tighter italic">ምንም ንቁ ቻሌንጅ የለም</p>
                <p className="text-blue-900/40 text-sm mt-2">ህይወትዎን ለመለወጥ ከላይ ቻሌንጅ ይጀምሩ</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};