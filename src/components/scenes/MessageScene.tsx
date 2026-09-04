'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/hooks/useExperience';
import { useBirthdayConfig } from '@/context/ConfigContext';
import { Sparkles, ArrowRight, ChevronLeft, CheckCircle2, MessageSquareHeart } from 'lucide-react';

export function MessageScene() {
  const { nextScene, prevScene, completeScene } = useExperience();
  const birthdayConfig = useBirthdayConfig();

  const messages = birthdayConfig.messages.messages;
  const question = birthdayConfig.messages.questions?.[0];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleContinue = () => {
    completeScene('message');
    nextScene();
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-6 py-6 flex flex-col items-center justify-center text-center select-none relative z-10">
      
      {/* 1. Header Atmosphere */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="space-y-2 mb-4"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-pink-400/15 text-brand-pink-300 border border-brand-pink-400/30">
          <MessageSquareHeart className="w-3.5 h-3.5 text-brand-pink-300" />
          <span>Words From The Heart</span>
        </span>

        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gradient-romantic">
          {birthdayConfig.messages.title || 'Special Birthday Notes 💌'}
        </h2>
      </motion.div>

      {/* 2. INTIMATE BIRTHDAY NOTE CARDS */}
      <div className="w-full space-y-3 mb-5">
        {messages.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
            className="w-full bg-brand-purple-950/60 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 text-left shadow-soft space-y-1.5 hover:border-brand-pink-400/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-brand-pink-400/20 text-brand-pink-300 border border-brand-pink-400/30">
                {item.tag}
              </span>
              <span className="text-xs text-brand-gold-300 font-medium">✨ Note #{idx + 1}</span>
            </div>

            <h3 className="text-sm sm:text-base font-bold font-display text-brand-cream-50 pt-1">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-brand-cream-100/85 leading-relaxed font-sans">
              {item.message}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 3. PLAYFUL INTERACTIVE QUESTION */}
      {question && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full bg-gradient-to-br from-brand-purple-950/80 to-brand-purple-900/60 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-brand-gold-400/30 text-center space-y-3 mb-6 shadow-soft"
        >
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-brand-gold-300">
            <Sparkles className="w-4 h-4 text-brand-gold-400" />
            <span>{question.question}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedOption(idx)}
                className={`flex-1 min-h-[44px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-200 flex items-center justify-center gap-2 ${
                  selectedOption === idx
                    ? 'bg-brand-gold-400/25 border-brand-gold-400 text-brand-gold-200 shadow-glow-gold-soft scale-[1.02]'
                    : 'bg-white/5 border-white/10 text-brand-cream-100 hover:bg-white/10'
                }`}
              >
                {selectedOption === idx && <CheckCircle2 className="w-4 h-4 text-brand-gold-300" />}
                <span>{option.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {selectedOption !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden pt-1"
              >
                <p className="font-handwriting text-2xl sm:text-3xl text-brand-gold-300">
                  “{question.options[selectedOption].reaction}”
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* 4. Navigation Actions */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleContinue}
          aria-label="Proceed to memory lane scene"
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-brand-pink-500 to-brand-gold-400 text-brand-purple-950 font-bold text-base shadow-glow-pink hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 group"
        >
          <span>Memory Lane 📸</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
        </button>

        <button
          type="button"
          onClick={prevScene}
          aria-label="Return to balloon scene"
          className="text-xs text-brand-cream-300/50 hover:text-brand-cream-200 transition-colors flex items-center gap-1 py-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}
