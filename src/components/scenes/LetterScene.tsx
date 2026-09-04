'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/hooks/useExperience';
import { useBirthdayConfig } from '@/context/ConfigContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { InteractiveEnvelope } from '@/components/letter/InteractiveEnvelope';
import { HandwrittenText } from '@/components/typography/HandwrittenText';
import { Sparkle } from '@/components/decorative/Sparkle';
import { OrnamentDivider } from '@/components/decorative/OrnamentDivider';
import { ChevronLeft, ArrowRight, Mail, Sparkles } from 'lucide-react';

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
    <Container className="flex flex-col items-center justify-center my-auto py-3">
      <Card
        variant="romantic"
        glow="soft"
        padded={false}
        className="w-full max-w-sm sm:max-w-md p-5 sm:p-7 flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Ambient background decoration */}
        <div aria-hidden="true" className="absolute top-4 right-4 opacity-40 pointer-events-none">
          <Sparkle size="md" color="gold" />
        </div>

        {/* Scene Header */}
        <div className="space-y-1 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase bg-brand-pink-400/20 text-brand-pink-200 border border-brand-pink-400/30">
            <Mail className="w-3.5 h-3.5 text-brand-gold-300" />
            <span>From The Heart</span>
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold font-display text-gradient-romantic">
            {letter.title}
          </h2>
        </div>

        {/* INTERACTIVE ENVELOPE OR EXPANDED LETTER SHEET */}
        <div className="w-full my-2">
          <AnimatePresence mode="wait">
            {!isOpened ? (
              <motion.div
                key="envelope-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full bg-gradient-to-b from-[#FFFDF9] via-[#FFFBEB] to-[#FEF3C7] text-neutral-900 rounded-2xl p-5 sm:p-6 border border-brand-gold-300 shadow-dramatic text-left space-y-3.5 max-h-[350px] sm:max-h-[390px] overflow-y-auto pr-2 relative select-text"
              >
                {/* Letter Header Ribbon */}
                <div className="flex items-center justify-between border-b border-brand-gold-400/30 pb-2 select-none">
                  <span className="text-[11px] font-bold font-display text-brand-purple-900 tracking-wide">
                    {letter.salutation}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-brand-pink-600 font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>Special Letter</span>
                  </div>
                </div>

                {/* Letter Paragraphs */}
                <div className="space-y-2.5 text-xs sm:text-sm text-neutral-800/90 leading-relaxed font-sans">
                  {letter.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Highlight Quote Box */}
                {letter.highlightQuote && (
                  <div className="bg-brand-gold-100/70 rounded-xl p-3.5 border-l-4 border-brand-gold-500 shadow-sm">
                    <HandwrittenText size="sm" variant="gold" className="text-neutral-900 font-medium italic">
                      {letter.highlightQuote}
                    </HandwrittenText>
                  </div>
                )}

                {/* Letter Closing & Signature */}
                <div className="pt-2 border-t border-brand-gold-400/20 text-right space-y-0.5">
                  <p className="text-xs text-neutral-700 font-sans italic">
                    {letter.closing}
                  </p>
                  <HandwrittenText size="lg" variant="pink" className="text-brand-pink-600 font-bold">
                    {letter.signature}
                  </HandwrittenText>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <OrnamentDivider symbol="heart" />

        {/* Navigation Action Buttons */}
        <div className="w-full flex items-center justify-between gap-3 pt-1">
          <Button
            variant="secondary"
            size="md"
            onClick={prevScene}
            aria-label="Return to memory lane scene"
            className="flex-1 flex items-center justify-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button
            variant={isOpened ? 'gold' : 'romantic'}
            size="md"
            onClick={handleContinue}
            aria-label="Proceed to celebration scene"
            className="flex-1 flex items-center justify-center gap-2 font-bold shadow-glow-pink"
          >
            <span>Celebrate!</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </Container>
  );
}
