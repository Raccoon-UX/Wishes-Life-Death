'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/hooks/useExperience';
import { useBirthdayConfig } from '@/context/ConfigContext';
import { InteractiveCake } from '@/components/birthday/InteractiveCake';
import { Sparkles, ArrowRight, ChevronLeft, Wind } from 'lucide-react';

export function CakeScene() {
  const { nextScene, prevScene, completeScene, setInteractionFlag } = useExperience();
  const birthdayConfig = useBirthdayConfig();

  const totalCandles = birthdayConfig.cake.candleCount || 3;
  const [candlesLit, setCandlesLit] = useState<boolean[]>(() =>
    Array(totalCandles).fill(true)
  );
  const [allExtinguished, setAllExtinguished] = useState(false);

  const handleToggleCandle = (index: number) => {
    setCandlesLit((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleBlowAll = () => {
    setCandlesLit(Array(totalCandles).fill(false));
  };

  useEffect(() => {
    const isDone = candlesLit.every((lit) => !lit);
    if (isDone && !allExtinguished) {
      setAllExtinguished(true);
      setInteractionFlag('isCakeInteracted', true);
      completeScene('cake');
    }
  }, [candlesLit, allExtinguished, completeScene, setInteractionFlag]);

  const handleContinue = () => {
    nextScene();
  };

  const litCount = candlesLit.filter(Boolean).length;
  const recipientName = birthdayConfig.recipient.name || 'Meghna';

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-6 py-6 flex flex-col items-center justify-center text-center select-none relative z-10">
      
      {/* 1. Header Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="space-y-2 mb-2"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 text-brand-rose border border-brand-rose/30 shadow-glow-pink-soft backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-champagne" />
          <span>{allExtinguished ? 'Wish Released' : 'Make A Wish'}</span>
        </span>

        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gradient-romantic">
          {allExtinguished ? `Wish Granted, ${recipientName}!` : 'Close Your Eyes & Wish'}
        </h2>

        <p className="text-xs sm:text-sm text-brand-berry font-sans max-w-xs sm:max-w-sm mx-auto leading-relaxed font-medium">
          {allExtinguished
            ? 'Your birthday wish is officially on its way to the stars ✨'
            : birthdayConfig.cake.blowPrompt || 'Tap the candles to blow them out!'}
        </p>
      </motion.div>

      {/* 2. Primary Hero Visual: Cake */}
      <div className="w-full my-3 sm:my-5 flex justify-center">
        <InteractiveCake
          candleCount={totalCandles}
          candlesLit={candlesLit}
          onToggleCandle={handleToggleCandle}
          flavor={birthdayConfig.cake.flavor}
        />
      </div>

      {/* 3. Interactive State Feedback & Quick Action */}
      <div className="w-full max-w-xs mx-auto mb-6 min-h-[54px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {allExtinguished ? (
            <motion.div
              key="granted"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full py-2.5 px-4 rounded-2xl bg-white/90 border border-brand-champagne/50 shadow-glow-gold-soft text-center"
            >
              <p className="font-handwriting text-2xl sm:text-3xl text-brand-deepRose">
                May all your dreams blossom this year ✨
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="burning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-3"
            >
              <span className="text-xs text-brand-muted font-medium">
                {litCount} of {totalCandles} candles lit
              </span>
              <button
                type="button"
                onClick={handleBlowAll}
                className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-brand-rose border border-brand-blush text-xs font-bold flex items-center gap-1.5 transition-all shadow-subtle"
              >
                <Wind className="w-3.5 h-3.5 text-brand-rose" />
                <span>Blow All Out</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Navigation Actions */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleContinue}
          aria-label="Proceed to balloon popping scene"
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-brand-rose via-brand-blush to-brand-champagne text-brand-berry font-bold text-base shadow-glow-pink hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 group border border-white/40"
        >
          <span>Pop Birthday Balloons 🎈</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
        </button>

        <button
          type="button"
          onClick={prevScene}
          aria-label="Return to reveal scene"
          className="text-xs text-brand-muted hover:text-brand-deepRose transition-colors flex items-center gap-1 py-1 font-medium"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}
