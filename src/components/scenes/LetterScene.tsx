'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/hooks/useExperience';
import { useBirthdayConfig } from '@/context/ConfigContext';
import { InteractiveEnvelope } from '@/components/letter/InteractiveEnvelope';
import { Sparkles, ArrowRight, ChevronLeft, Mail } from 'lucide-react';

export function LetterScene() {
  const { nextScene, prevScene, completeScene, setInteractionFlag } = useExperience();
  const birthdayConfig = useBirthdayConfig();

  const [isOpened, setIsOpened] = useState(false);
  const letter = birthdayConfig.letter;

  const handleOpenLetter = () => {
    setIsOpened(true);
    setInteractionFlag('isLetterOpened', true);
    completeScene('letter');
  };

  const handleContinue = () => {
    nextScene();
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-6 py-6 flex flex-col items-center justify-center text-center select-none relative z-10">
      
      {/* 1. Header Atmosphere */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="space-y-1.5 mb-2"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#FCE4EC] text-[#8B2648] border border-[#F8B4C8]">
          <Mail className="w-3.5 h-3.5 text-[#E86A92]" />
          <span>From The Heart</span>
        </span>

        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gradient-romantic">
          {letter.title || 'A Letter Just For You 💌'}
        </h2>
      </motion.div>

      {/* 2. INTERACTIVE ENVELOPE OR EXPANDED STATIONERY LETTER */}
      <div className="w-full my-3 min-h-[360px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="envelope-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.45 }}
              className="w-full flex flex-col items-center py-2"
            >
              <InteractiveEnvelope
                isOpened={isOpened}
                onOpen={handleOpenLetter}
                recipientName={birthdayConfig.recipient.name}
                senderName={birthdayConfig.sender.name}
              />
            </motion.div>
          ) : (
            <motion.div
              key="letter-expanded-view"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md bg-gradient-to-b from-[#FFFDF9] via-[#FFF9F5] to-[#FFF0F5] text-[#3B0D1E] rounded-2xl p-5 sm:p-6 border border-[#D9A441]/60 shadow-romantic text-left space-y-4 max-h-[380px] sm:max-h-[420px] overflow-y-auto pr-2 relative select-text"
            >
              {/* Letter Header Ribbon */}
              <div className="flex items-center justify-between border-b border-[#D9A441]/30 pb-2 select-none">
                <span className="text-sm font-bold font-display text-[#3B0D1E] tracking-wide">
                  {letter.salutation}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[#8B2648] font-semibold font-handwriting">
                  <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>With Love</span>
                </div>
              </div>

              {/* Letter Body Paragraphs */}
              <div className="space-y-3 text-xs sm:text-sm text-[#3B0D1E]/90 leading-relaxed font-sans">
                {letter.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Highlight Handwritten Quote Block */}
              {letter.highlightQuote && (
                <div className="bg-[#FFF5EB] rounded-xl p-3.5 border-l-4 border-[#D9A441] shadow-sm">
                  <p className="font-handwriting text-xl sm:text-2xl text-[#3B0D1E] leading-snug">
                    {letter.highlightQuote}
                  </p>
                </div>
              )}

              {/* Letter Closing & Signature Stamp */}
              <div className="pt-2 border-t border-[#D9A441]/20 text-right space-y-0.5">
                <p className="text-xs text-[#8B2648] font-sans italic">
                  {letter.closing}
                </p>
                <p className="font-handwriting text-2xl sm:text-3xl text-[#E86A92] font-bold">
                  {letter.signature}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Navigation Actions */}
      <div className="w-full max-w-xs flex flex-col items-center gap-2.5 pt-2">
        <button
          type="button"
          onClick={handleContinue}
          aria-label="Proceed to celebration scene"
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#E86A92] via-[#E86A92] to-[#D9A441] text-white font-bold text-base shadow-romantic hover:shadow-glow-pink hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 group"
        >
          <span>Celebrate Together 🎉</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
        </button>

        <button
          type="button"
          onClick={prevScene}
          aria-label="Return to memory lane scene"
          className="text-xs text-[#8B2648]/70 hover:text-[#3B0D1E] transition-colors flex items-center gap-1 py-1 font-medium"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}
