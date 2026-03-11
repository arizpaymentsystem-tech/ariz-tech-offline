import React from 'react';
import { useTranslation } from '../lib/translations';
import { motion } from 'framer-motion';

const HERO_IMAGE = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa1b9dd0-7b7d-48f5-98da-33c9a52f4c3a/ariz-tech-hero-33cf4bfa-1773267816724.webp";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-[#0B1B2B]/70" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase">
          {t.title}
        </h1>
        <p className="text-xl md:text-3xl text-blue-300 font-medium max-w-2xl mx-auto border-t border-blue-500/30 pt-4">
          {t.subtitle}
        </p>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1B2B] to-transparent" />
    </div>
  );
};