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
  const recipientName = (birthdayConfig.recipient.name || 'Sarah').toUpperCase();
  const senderName = birthdayConfig.sender.name || 'Alex';

  return (
    <div className="w-full max-w-xl mx-auto px-6 sm:px-8 py-8 flex flex-col items-center justify-center text-center select-none relative z-10">
      
      {/* 1. High-Performance Canvas Confetti & Particle Fireworks */}
      <ConfettiCanvas
        colors={birthdayConfig.celebration.confettiColors || ['#F472B6', '#FBBF24', '#8B5CF6', '#FFFFFF', '#F9A8D4']}
        particleCount={65}
      />

      {/* 2. Grand Radiance Light Halo in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full bg-gradient-to-tr from-brand-gold-500/20 via-brand-pink-500/15 to-brand-violet-500/15 blur-3xl pointer-events-none -z-10 animate-pulse-slow" />

      {/* 3. Emblem Celebration Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: getDelay(0.2), ease: 'easeOut' }}
        className="mb-4 flex flex-col items-center gap-2"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500/30 via-brand-pink-500/20 to-brand-gold-300/30 border border-brand-gold-400/50 flex items-center justify-center shadow-glow-gold backdrop-blur-sm">
          <PartyPopper className="w-8 h-8 text-brand-gold-300 animate-bounce" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-brand-gold-400/20 text-brand-gold-300 border border-brand-gold-400/40 shadow-glow-gold-soft">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold-300" />
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
        <p className="text-sm sm:text-base font-bold uppercase tracking-[0.3em] text-brand-gold-300 font-display">
          Happy Birthday
        </p>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-display text-gradient-gold tracking-tight leading-none drop-shadow-[0_4px_30px_rgba(245,158,11,0.5)]">
          {recipientName}
        </h1>

        <p className="text-sm sm:text-base text-brand-cream-100/90 font-sans leading-relaxed max-w-md mx-auto pt-2">
          {birthdayConfig.celebration.subtitle || 'Let the celebrations begin! May your day be filled with endless love and joy.'}
        </p>
      </motion.div>

      {/* 5. Personal Closing Note from Sender */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: getDelay(0.7), ease: 'easeOut' }}
        className="w-full max-w-md mx-auto p-4 sm:p-5 rounded-2xl bg-brand-purple-950/60 backdrop-blur-md border border-brand-gold-400/30 mb-8 shadow-dramatic text-center space-y-1.5"
      >
        <div className="flex items-center justify-center gap-1.5 text-xs text-brand-pink-300 font-semibold">
          <Heart className="w-3.5 h-3.5 fill-brand-pink-400 text-brand-pink-400" />
          <span>Forever Cherished</span>
        </div>

        <p className="font-handwriting text-2xl sm:text-3xl text-brand-gold-300 leading-relaxed">
          “May your year ahead be as radiant, joyful, and deeply loved as you are.”
        </p>

        <p className="text-xs text-brand-cream-200/80 pt-1 font-sans">
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
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-400 via-brand-gold-400 to-amber-500 text-brand-purple-950 font-bold text-base shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 group"
        >
          <RotateCcw className="w-5 h-5 group-hover:rotate-[-90deg] transition-transform duration-300" />
          <span>{birthdayConfig.celebration.replayButtonText || 'Experience Again 🔄'}</span>
        </button>

        <button
          type="button"
          onClick={prevScene}
          aria-label="Return to personal letter scene"
          className="text-xs text-brand-cream-300/50 hover:text-brand-cream-200 transition-colors flex items-center gap-1 py-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back to Letter</span>
        </button>
      </motion.div>
    </div>
  );
}
