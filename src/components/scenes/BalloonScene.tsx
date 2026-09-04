'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/hooks/useExperience';
import { useBirthdayConfig } from '@/context/ConfigContext';
import { BalloonItem } from '@/types/config.types';
import { FloatingBalloon } from '@/components/birthday/FloatingBalloon';
import { Sparkles, ArrowRight, ChevronLeft, Heart } from 'lucide-react';

export function BalloonScene() {
  const { nextScene, prevScene, completeScene, setInteractionFlag } = useExperience();
  const birthdayConfig = useBirthdayConfig();

  const balloons = birthdayConfig.balloons.items;
  const [poppedIds, setPoppedIds] = useState<string[]>([]);
  const [activeMessage, setActiveMessage] = useState<BalloonItem | null>(null);

  const handlePop = (item: BalloonItem) => {
    if (poppedIds.includes(item.id)) return;

    const newPopped = [...poppedIds, item.id];
    setPoppedIds(newPopped);
    setActiveMessage(item);
    setInteractionFlag('balloonsPoppedCount', newPopped.length);

    if (newPopped.length === balloons.length) {
      completeScene('balloon');
    }
  };

  const isAllPopped = poppedIds.length === balloons.length;

  const handleContinue = () => {
    completeScene('balloon');
    nextScene();
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-6 py-6 flex flex-col items-center justify-center text-center select-none relative z-10">
      
      {/* 1. Header Atmosphere */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="space-y-2 mb-2"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 text-brand-rose border border-brand-rose/30 shadow-glow-pink-soft backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-champagne" />
          <span>Secret Balloon Messages</span>
        </span>

        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gradient-romantic">
          {birthdayConfig.balloons.title || 'Floating Secrets 🎈'}
        </h2>

        <p className="text-xs sm:text-sm text-brand-berry font-sans max-w-xs sm:max-w-sm mx-auto leading-relaxed font-medium">
          {isAllPopped
            ? 'All secret messages have been unlocked! ✨'
            : birthdayConfig.balloons.instruction || 'Tap each floating balloon to reveal a secret note.'}
        </p>
      </motion.div>

      {/* 2. BALLOONS FLOATING CLUSTER */}
      <div className="w-full flex items-center justify-center gap-4 sm:gap-8 my-4 py-3 min-h-[160px]">
        {balloons.map((balloon, index) => (
          <FloatingBalloon
            key={balloon.id}
            item={balloon}
            index={index}
            isPopped={poppedIds.includes(balloon.id)}
            onPop={handlePop}
          />
        ))}
      </div>

      {/* 3. REVEALED SECRET NOTE DISPLAY */}
      <div className="w-full max-w-md mx-auto min-h-[110px] flex items-center justify-center mb-6">
        <AnimatePresence mode="wait">
          {activeMessage ? (
            <motion.div
              key={activeMessage.id}
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.45 }}
              className="w-full p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-brand-blush shadow-card text-center space-y-1.5"
            >
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-rose">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Secret Unlocked</span>
                <span className="text-base">{activeMessage.emoji}</span>
              </div>
              <p className="font-handwriting text-2xl sm:text-3xl text-brand-deepRose leading-snug">
                &ldquo;{activeMessage.secretMessage}&rdquo;
              </p>
            </motion.div>
          ) : (
            <div className="text-xs text-brand-muted italic py-4 font-medium">
              Tap any balloon above to pop it and reveal its hidden secret ✨
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Navigation Actions */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleContinue}
          aria-label="Proceed to surprise messages scene"
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-brand-rose via-brand-blush to-brand-champagne text-brand-berry font-bold text-base shadow-glow-pink hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 group border border-white/40"
        >
          <span>Special Notes 💌</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
        </button>

        <button
          type="button"
          onClick={prevScene}
          aria-label="Return to cake scene"
          className="text-xs text-brand-muted hover:text-brand-deepRose transition-colors flex items-center gap-1 py-1 font-medium"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}
