import React, { useState, useEffect } from 'react';
import { Pill, Clock, Plus, Trash2, Heart, HeartPulse } from 'lucide-react';
import { useTranslation } from '../lib/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface Medication {
  id: string;
  name: string;
  time: string;
  createdAt: number;
}

export const Ayizony = () => {
  const { t } = useTranslation();
  const [meds, setMeds] = useState<Medication[]>(() => {
    const saved = localStorage.getItem('ariz_meds');
    return saved ? JSON.parse(saved) : [];
  });
  const [newName, setNewName] = useState('');
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    localStorage.setItem('ariz_meds', JSON.stringify(meds));
  }, [meds]);

  const addMed = () => {
    if (!newName || !newTime) return;
    const med: Medication = {
      id: Date.now().toString(),
      name: newName,
      time: newTime,
      createdAt: Date.now(),
    };
    setMeds([med, ...meds]);
    setNewName('');
    setNewTime('');
    toast.success('የመድሃኒት ሰዓት ተመዝግቧል! (Medicine set!)');
  };

  const deleteMed = (id: string) => {
    setMeds(meds.filter(m => m.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="relative overflow-hidden rounded-[2rem] p-8 mb-8 border border-rose-800/30 shadow-2xl">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa1b9dd0-7b7d-48f5-98da-33c9a52f4c3a/ayizony-background-76e1b62a-1773268779738.webp" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" 
          alt="background"
        />
        <div className="relative z-10">
          <h1 className="text-5xl font-black text-white flex items-center gap-3 tracking-tighter uppercase italic">
            <HeartPulse className="w-12 h-12 text-rose-500" />
            {t.aizoyn}
          </h1>
          <p className="text-rose-300 mt-2 font-medium">የጤና ረዳትዎ - መድሃኒትዎን በሰዓቱ ይውሰዱ።</p>
        </div>
      </div>

      <div className="bg-[#112336] p-8 rounded-[2rem] border border-blue-800/50 shadow-2xl mb-12 relative overflow-hidden group">
        <div className="absolute inset-0 bg-rose-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
          <Pill className="w-6 h-6 text-rose-400" />
          {t.takeMed}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={t.medName}
              className="w-full bg-[#0B1B2B] border border-blue-800 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-rose-500 outline-none transition-all placeholder:text-blue-900"
            />
          </div>
          <div className="md:col-span-3">
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full bg-[#0B1B2B] border border-blue-800 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-rose-500 outline-none transition-all"
            />
          </div>
          <button
            onClick={addMed}
            className="md:col-span-3 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-2xl px-6 py-4 transition-all active:scale-95 shadow-lg shadow-rose-600/20"
          >
            {t.save.toUpperCase()}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <AnimatePresence mode='popLayout'>
          {meds.map((med) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={med.id}
              className="p-8 bg-[#112336] border border-blue-800/30 rounded-[2rem] flex items-center justify-between group hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-500/5 transition-all relative overflow-hidden"
            >
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Pill className="w-32 h-32 text-rose-500" />
              </div>
              
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:bg-rose-500/20 transition-all">
                  <Pill className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic">{med.name}</h4>
                  <div className="flex items-center gap-2 text-rose-300 font-mono text-xl mt-1">
                    <Clock className="w-5 h-5 opacity-60" />
                    {med.time}
                  </div>
                </div>
              </div>
              <button
                onClick={() => deleteMed(med.id)}
                className="p-4 text-red-900 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all relative z-10"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {meds.length === 0 && (
        <div className="text-center py-24 bg-rose-950/5 rounded-[3rem] border-4 border-dashed border-rose-900/10">
          <div className="w-24 h-24 bg-rose-900/10 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-900">
            <HeartPulse className="w-12 h-12" />
          </div>
          <p className="text-rose-900 font-black text-xl uppercase tracking-tighter italic">ምንም የመድሃኒት ሰዓት የለም</p>
          <p className="text-rose-900/40 text-sm mt-2">መድሃኒቶችዎን ከላይ ይመዝግቡ</p>
        </div>
      )}
    </div>
  );
};