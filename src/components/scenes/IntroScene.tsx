'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useExperience } from '@/hooks/useExperience';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useBirthdayConfig } from '@/context/ConfigContext';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

export function IntroScene() {
  const { nextScene, completeScene, setInteractionFlag } = useExperience();
  const birthdayConfig = useBirthdayConfig();
  const prefersReducedMotion = useReducedMotion();

  const handleOpenGift = () => {
    completeScene('intro');
    setInteractionFlag('isIntroComplete', true);
    nextScene();
  };

  const getDelay = (seconds: number) => (prefersReducedMotion ? 0 : seconds);

  const recipientName = birthdayConfig.recipient.name || 'Sarah';
  const recipientNickname = birthdayConfig.recipient.nickname;

  return (
    <div className="w-full max-w-lg mx-auto px-6 sm:px-8 py-10 flex flex-col items-center justify-center text-center select-none relative z-10">
      
      {/* 1. Subtle Ambient Glowing Star Accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: getDelay(0.2), ease: 'easeOut' }}
        className="mb-8 relative"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-pink-500/20 via-brand-purple-800/40 to-brand-gold-400/20 border border-brand-pink-400/30 flex items-center justify-center shadow-glow-pink-soft backdrop-blur-sm">
          <Sparkles className="w-7 h-7 text-brand-gold-300 animate-pulse-subtle" />
        </div>
        <div className="absolute -inset-2 rounded-full bg-brand-pink-500/10 blur-xl -z-10 animate-pulse" />
      </motion.div>

      {/* 2. Intimate Personal Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: getDelay(0.5), ease: [0.22, 1, 0.36, 1] }}
        className="space-y-3 mb-6"
      >
        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-pink-300/80">
          A Moment For You
        </p>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gradient-romantic tracking-tight leading-tight">
          Hey {recipientName}
        </h1>

        {recipientNickname && (
          <p className="text-sm sm:text-base font-medium text-brand-gold-300/90 tracking-wide flex items-center justify-center gap-1.5 pt-1">
            <Heart className="w-3.5 h-3.5 fill-brand-pink-400/60 text-brand-pink-400" />
            <span>For {recipientNickname}</span>
            <Heart className="w-3.5 h-3.5 fill-brand-pink-400/60 text-brand-pink-400" />
          </p>
        )}
      </motion.div>

      {/* 3. Quiet Handwritten Line */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: getDelay(0.9), ease: 'easeOut' }}
        className="max-w-xs sm:max-w-sm mb-10 space-y-2"
      >
        <p className="text-base sm:text-lg text-brand-cream-100/90 font-sans leading-relaxed">
          I made a little digital universe created just for your special day...
        </p>
        <p className="font-handwriting text-2xl sm:text-3xl text-brand-pink-300 pt-1 rotate-[-1deg]">
          A little surprise made with love ✨
        </p>
      </motion.div>

      {/* 4. Natural CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: getDelay(1.3), ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-xs"
      >
        <button
          type="button"
          onClick={handleOpenGift}
          aria-label={`Open your birthday gift for ${recipientName}`}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-brand-pink-500 via-brand-pink-400 to-brand-gold-400 text-brand-purple-950 font-bold text-base shadow-glow-pink hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group"
        >
          <span className="tracking-wide">{birthdayConfig.intro.ctaText || 'Open Your Gift →'}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
        </button>

        <p className="text-[11px] text-brand-cream-300/40 mt-3.5 tracking-wider">
          Tap to begin
        </p>
      </motion.div>
    </div>
  );
}
