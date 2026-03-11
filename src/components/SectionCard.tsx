import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Target, HeartPulse, Brain } from 'lucide-react';

interface SectionCardProps {
  id: string;
  title: string;
  index: number;
  onClick: () => void;
}

const icons = {
  balegize: <Target className="w-8 h-8" />,
  aizoyn: <HeartPulse className="w-8 h-8" />,
  arif: <Brain className="w-8 h-8" />,
  shekay: <Clock className="w-8 h-8" />,
};

export const SectionCard = ({ id, title, index, onClick }: SectionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div className="absolute inset-0 bg-blue-600/10 blur-3xl group-hover:bg-blue-600/20 transition-all rounded-3xl" />
      <div className="relative h-full bg-[#112336]/80 backdrop-blur-xl border border-blue-900/30 p-8 rounded-[2rem] overflow-hidden group-hover:border-blue-500/50 transition-all">
        
        <div className="flex flex-col h-full">
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:text-blue-300 transition-all mb-6">
            {icons[id as keyof typeof icons] || <ArrowRight />}
          </div>
          
          <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors uppercase">
            {title}
          </h3>
          
          <p className="text-blue-300/60 text-sm leading-relaxed mb-8 flex-grow">
            Access the {title} ecosystem. Personalized offline tracking for your daily needs.
          </p>
          
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
            Explore <ArrowRight className="w-4 h-4" />
          </div>
        </div>
        
        {/* Decorative corner light */}
        <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-blue-500/10 blur-2xl group-hover:bg-blue-500/30 transition-all rounded-full" />
      </div>
    </motion.div>
  );
};