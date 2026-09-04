'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useExperience } from '@/hooks/useExperience';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useBirthdayConfig } from '@/context/ConfigContext';
import { Sparkles, ArrowRight, ChevronLeft, Cake } from 'lucide-react';

export function RevealScene() {
  const { nextScene, prevScene, completeScene } = useExperience();
  const birthdayConfig = useBirthdayConfig();
  const prefersReducedMotion = useReducedMotion();

  const handleContinue = () => {
    completeScene('reveal');
    nextScene();
  };

  const getDelay = (seconds: number) => (prefersReducedMotion ? 0 : seconds);

  const headline = birthdayConfig.reveal.headline || `Happy Birthday, ${birthdayConfig.recipient.name || 'Meghna'}! 🎂✨`;
  const subheadline = birthdayConfig.reveal.subheadline || 'Today is all about celebrating you.';
  const highlightText = birthdayConfig.reveal.highlightText || 'May this year bring you endless joy and magic.';

  return (
    <div className="w-full max-w-xl mx-auto px-6 sm:px-8 py-8 flex flex-col items-center justify-center text-center select-none relative z-10">
      
      {/* 1. Dramatic Ambient Light Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-brand-blush/40 via-brand-champagne/25 to-brand-lavender/35 blur-3xl pointer-events-none -z-10 animate-pulse-slow" />

      {/* 2. Delicate Header Crown/Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: getDelay(0.2), ease: 'easeOut' }}
        className="mb-6 flex items-center justify-center gap-2"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/80 text-brand-champagne border border-brand-champagne/40 shadow-glow-gold-soft backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-champagne" />
          <span>The Grand Reveal</span>
        </span>
      </motion.div>

      {/* 3. Hero Typography Headline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: getDelay(0.4), ease: [0.22, 1, 0.36, 1] }}
        className="space-y-4 mb-8"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-gradient-romantic tracking-tight leading-[1.1] drop-shadow-sm">
          {headline}
        </h1>

        <p className="text-sm sm:text-lg text-brand-berry font-sans leading-relaxed max-w-md mx-auto font-medium">
          {subheadline}
        </p>
      </motion.div>

      {/* 4. Handwritten Floating Quote */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: getDelay(0.8), ease: 'easeOut' }}
        className="max-w-md mx-auto mb-10 px-5 py-3.5 rounded-2xl bg-white/85 backdrop-blur-md border border-brand-blush shadow-subtle"
      >
        <p className="font-handwriting text-2xl sm:text-3xl text-brand-deepRose leading-snug">
          &ldquo;{highlightText}&rdquo;
        </p>
      </motion.div>

      {/* 5. Navigation Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: getDelay(1.1), ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-xs flex flex-col items-center gap-3"
      >
        <button
          type="button"
          onClick={handleContinue}
          aria-label="Proceed to birthday cake scene"
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-brand-rose via-brand-blush to-brand-champagne text-brand-berry font-bold text-base shadow-glow-pink hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 group border border-white/40"
        >
          <Cake className="w-5 h-5 text-brand-berry" />
          <span>Make a Wish</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
        </button>

        <button
          type="button"
          onClick={prevScene}
          aria-label="Return to intro scene"
          className="text-xs text-brand-muted hover:text-brand-deepRose transition-colors flex items-center gap-1 py-1 font-medium"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </motion.div>
    </div>
  );
}
