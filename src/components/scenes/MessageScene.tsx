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
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 text-brand-rose border border-brand-rose/30 shadow-glow-pink-soft backdrop-blur-sm">
          <MessageSquareHeart className="w-3.5 h-3.5 text-brand-rose" />
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
            className="w-full bg-white/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-brand-blush/60 text-left shadow-card space-y-1.5 hover:border-brand-rose/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-brand-softPink text-brand-deepRose border border-brand-blush">
                {item.tag}
              </span>
              <span className="text-xs text-brand-champagne font-semibold">✨ Note #{idx + 1}</span>
            </div>

            <h3 className="text-sm sm:text-base font-bold font-display text-brand-berry pt-1">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-brand-berry/90 leading-relaxed font-sans font-normal">
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
          className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-brand-champagne/40 text-center space-y-3 mb-6 shadow-card"
        >
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-brand-champagne">
            <Sparkles className="w-4 h-4 text-brand-champagne" />
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
                    ? 'bg-brand-blush/40 border-brand-rose text-brand-deepRose shadow-glow-pink-soft scale-[1.02] font-bold'
                    : 'bg-brand-softPink/60 border-brand-blush/70 text-brand-berry hover:bg-brand-softPink'
                }`}
              >
                {selectedOption === idx && <CheckCircle2 className="w-4 h-4 text-brand-rose" />}
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
                <p className="font-handwriting text-2xl sm:text-3xl text-brand-deepRose">
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
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-brand-rose via-brand-blush to-brand-champagne text-brand-berry font-bold text-base shadow-glow-pink hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 group border border-white/40"
        >
          <span>Memory Lane 📸</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
        </button>

        <button
          type="button"
          onClick={prevScene}
          aria-label="Return to balloon scene"
          className="text-xs text-brand-muted hover:text-brand-deepRose transition-colors flex items-center gap-1 py-1 font-medium"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}
