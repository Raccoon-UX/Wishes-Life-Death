'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useExperience } from '@/hooks/useExperience';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useBirthdayConfig } from '@/context/ConfigContext';
import { ConfettiCanvas } from '@/components/celebration/ConfettiCanvas';
import { Sparkles, RotateCcw, ChevronLeft, Heart, PartyPopper } from 'lucide-react';

export function CelebrationScene() {
  const { prevScene, replayExperience } = useExperience();
  const birthdayConfig = useBirthdayConfig();
  const prefersReducedMotion = useReducedMotion();

  const getDelay = (seconds: number) => (prefersReducedMotion ? 0 : seconds);
  const recipientName = (birthdayConfig.recipient.name || 'Meghna').toUpperCase();
  const senderName = birthdayConfig.sender.name || 'Tushar';

  return (
    <div className="w-full max-w-xl mx-auto px-6 sm:px-8 py-8 flex flex-col items-center justify-center text-center select-none relative z-10">
      
      {/* 1. High-Performance Canvas Confetti & Particle Fireworks */}
      <ConfettiCanvas
        colors={birthdayConfig.celebration.confettiColors || ['#F8B4C8', '#E86A92', '#E8DDF5', '#D9A441', '#FFF9F5', '#FFFFFF']}
        particleCount={65}
      />

      {/* 2. Grand Radiance Light Halo in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full bg-gradient-to-tr from-[#F8B4C8]/30 via-[#E86A92]/20 to-[#D9A441]/25 blur-3xl pointer-events-none -z-10 animate-pulse-slow" />

      {/* 3. Emblem Celebration Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: getDelay(0.2), ease: 'easeOut' }}
        className="mb-4 flex flex-col items-center gap-2"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FCE4EC] via-[#F8B4C8]/60 to-[#FFF9F5] border border-[#D9A441]/50 flex items-center justify-center shadow-romantic backdrop-blur-sm">
          <PartyPopper className="w-8 h-8 text-[#D9A441] animate-bounce" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-[#FFF5EB] text-[#8B2648] border border-[#D9A441]/40 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
          <span>The Grand Celebration</span>
        </span>
      </motion.div>

      {/* 4. Hero Typographic Climax */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: getDelay(0.4), ease: [0.22, 1, 0.36, 1] }}
        className="space-y-2 mb-6"
      >
        <p className="text-sm sm:text-base font-bold uppercase tracking-[0.3em] text-[#8B2648] font-display">
          Happy Birthday
        </p>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-display text-gradient-romantic tracking-tight leading-none drop-shadow-[0_4px_25px_rgba(232,106,146,0.4)]">
          {recipientName}
        </h1>

        <p className="text-sm sm:text-base text-[#3B0D1E]/90 font-sans leading-relaxed max-w-md mx-auto pt-2">
          {birthdayConfig.celebration.subtitle || 'Let the celebrations begin! May your day be filled with endless love and joy.'}
        </p>
      </motion.div>

      {/* 5. Personal Closing Note from Sender */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: getDelay(0.7), ease: 'easeOut' }}
        className="w-full max-w-md mx-auto p-4 sm:p-5 rounded-2xl bg-[#FFFDF9]/90 backdrop-blur-md border border-[#F8B4C8] mb-8 shadow-romantic text-center space-y-1.5"
      >
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#8B2648] font-semibold">
          <Heart className="w-3.5 h-3.5 fill-[#E86A92] text-[#E86A92]" />
          <span>Forever Cherished</span>
        </div>

        <p className="font-handwriting text-2xl sm:text-3xl text-[#3B0D1E] leading-relaxed">
          “May your year ahead be as radiant, joyful, and deeply loved as you are.”
        </p>

        <p className="text-xs text-[#8B2648] pt-1 font-sans font-medium">
          — With all my love, {senderName} ✨
        </p>
      </motion.div>

      {/* 6. Navigation / Replay Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: getDelay(0.95), ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-xs flex flex-col items-center gap-3"
      >
        <button
          type="button"
          onClick={replayExperience}
          aria-label="Replay experience from beginning"
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#E86A92] via-[#E86A92] to-[#D9A441] text-white font-bold text-base shadow-romantic hover:shadow-glow-pink hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 group"
        >
          <RotateCcw className="w-5 h-5 group-hover:rotate-[-90deg] transition-transform duration-300" />
          <span>{birthdayConfig.celebration.replayButtonText || 'Experience Again 🔄'}</span>
        </button>

        <button
          type="button"
          onClick={prevScene}
          aria-label="Return to personal letter scene"
          className="text-xs text-[#8B2648]/70 hover:text-[#3B0D1E] transition-colors flex items-center gap-1 py-1 font-medium"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back to Letter</span>
        </button>
      </motion.div>
    </div>
  );
}
