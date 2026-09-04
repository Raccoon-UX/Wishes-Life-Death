'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/hooks/useExperience';
import { useBirthdayConfig } from '@/context/ConfigContext';
import { MemoryCard } from '@/components/memories/MemoryCard';
import { ArrowRight, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

export function MemoryScene() {
  const { nextScene, prevScene, completeScene } = useExperience();
  const birthdayConfig = useBirthdayConfig();

  const memories = birthdayConfig.memories.timeline;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextMemory = () => {
    if (currentIndex < memories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      completeScene('memory');
      nextScene();
    }
  };

  const handlePrevMemory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleContinue = () => {
    completeScene('memory');
    nextScene();
  };

  const currentMemory = memories[currentIndex] || memories[0];

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-6 py-6 flex flex-col items-center justify-center text-center select-none relative z-10">
      
      {/* 1. Header Atmosphere */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="space-y-1.5 mb-3"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 text-brand-rose border border-brand-rose/30 shadow-glow-pink-soft backdrop-blur-sm">
          <BookOpen className="w-3.5 h-3.5 text-brand-champagne" />
          <span>Scrapbook Memories</span>
        </span>

        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gradient-romantic">
          {birthdayConfig.memories.title || 'Our Memory Lane 📸'}
        </h2>

        <p className="text-xs sm:text-sm text-brand-berry font-sans max-w-xs mx-auto font-medium">
          {birthdayConfig.memories.subtitle || 'A few unforgettable moments we have shared...'}
        </p>
      </motion.div>

      {/* 2. SINGLE HERO POLAROID MEMORY CARD */}
      <div className="w-full my-2 sm:my-3 min-h-[360px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMemory?.id || currentIndex}
            initial={{ opacity: 0, scale: 0.94, rotate: currentIndex % 2 === 0 ? -2 : 2 }}
            animate={{ opacity: 1, scale: 1, rotate: currentIndex % 2 === 0 ? -1 : 1 }}
            exit={{ opacity: 0, scale: 0.94, rotate: currentIndex % 2 === 0 ? 2 : -2 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {currentMemory && (
              <MemoryCard
                item={currentMemory}
                index={currentIndex}
                totalCount={memories.length}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. MEMORY SCRAPBOOK CONTROLS */}
      <div className="w-full max-w-xs mx-auto flex items-center justify-between gap-2 my-2">
        <button
          type="button"
          onClick={handlePrevMemory}
          disabled={currentIndex === 0}
          aria-label="Previous memory"
          className="p-2.5 rounded-full bg-white/80 hover:bg-white disabled:opacity-30 disabled:pointer-events-none text-brand-rose border border-brand-blush/60 transition-colors shadow-subtle"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {memories.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to memory ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-6 bg-brand-rose shadow-glow-pink-soft'
                  : 'w-2 bg-brand-blush/60 hover:bg-brand-blush'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNextMemory}
          aria-label={currentIndex === memories.length - 1 ? 'Finish memories' : 'Next memory'}
          className="p-2.5 rounded-full bg-white/80 hover:bg-white text-brand-rose border border-brand-blush/60 transition-colors shadow-subtle"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4. Navigation Actions */}
      <div className="w-full max-w-xs flex flex-col items-center gap-2.5 pt-2">
        <button
          type="button"
          onClick={handleContinue}
          aria-label="Proceed to personal letter scene"
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-brand-rose via-brand-blush to-brand-champagne text-brand-berry font-bold text-base shadow-glow-pink hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 group border border-white/40"
        >
          <span>A Personal Letter 💌</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
        </button>

        <button
          type="button"
          onClick={prevScene}
          aria-label="Return to special notes scene"
          className="text-xs text-brand-muted hover:text-brand-deepRose transition-colors flex items-center gap-1 py-1 font-medium"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}
