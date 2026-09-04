'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/hooks/useExperience';
import { useBirthdayConfig } from '@/context/ConfigContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { HandwrittenText } from '@/components/typography/HandwrittenText';
import { Sparkle } from '@/components/decorative/Sparkle';
import { OrnamentDivider } from '@/components/decorative/OrnamentDivider';
import { ChevronLeft, ArrowRight, MessageSquareHeart, HelpCircle, CheckCircle2 } from 'lucide-react';

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
    <Container className="flex flex-col items-center justify-center my-auto py-4">
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

        {/* Scene Title */}
        <div className="space-y-1 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase bg-brand-pink-400/20 text-brand-pink-200 border border-brand-pink-400/30">
            <MessageSquareHeart className="w-3.5 h-3.5 text-brand-gold-300" />
            <span>Words From The Heart</span>
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold font-display text-gradient-romantic">
            {birthdayConfig.messages.title}
          </h2>
        </div>

        {/* CARDS LIST */}
        <div className="w-full space-y-3 mb-4">
          {messages.map((item, idx) => (
            <div
              key={item.id}
              className="w-full bg-brand-purple-950/75 rounded-2xl p-4 border border-brand-white-translucent text-left shadow-card space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-pink-400/20 text-brand-pink-300 border border-brand-pink-400/30">
                  {item.tag}
                </span>
                <span className="text-xs text-brand-gold-300">? Note #{idx + 1}</span>
              </div>

              <h3 className="text-sm font-bold font-display text-brand-cream-50">
                {item.title}
              </h3>

              <p className="text-xs text-brand-cream-100/85 leading-relaxed font-sans">
                {item.message}
              </p>
            </div>
          ))}
        </div>

        {/* INTERACTIVE QUESTION PROMPT */}
        {question && (
          <div className="w-full bg-brand-purple-900/60 rounded-2xl p-4 border border-brand-gold-400/30 text-center space-y-2.5 mb-4 shadow-glass">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-brand-gold-300">
              <HelpCircle className="w-4 h-4" />
              <span>{question.question}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedOption(idx)}
                  className={`flex-1 min-h-[44px] py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    selectedOption === idx
                      ? 'bg-brand-gold-400/25 border-brand-gold-400 text-brand-gold-200 shadow-glow-gold-soft scale-[1.02]'
                      : 'bg-brand-white-translucent border-brand-white-translucent text-brand-cream-100 hover:bg-brand-white-glow'
                  }`}
                >
                  {selectedOption === idx && <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold-300" />}
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
                  className="overflow-hidden"
                >
                  <HandwrittenText size="sm" variant="gold" className="pt-1">
                    �{question.options[selectedOption].reaction}�
                  </HandwrittenText>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <OrnamentDivider symbol="heart" />

        {/* Navigation Action Buttons */}
        <div className="w-full flex items-center justify-between gap-3 pt-1">
          <Button
            variant="secondary"
            size="md"
            onClick={prevScene}
            aria-label="Return to balloon scene"
            className="flex-1 flex items-center justify-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button
            variant="romantic"
            size="md"
            onClick={handleContinue}
            aria-label="Proceed to memory lane scene"
            className="flex-1 flex items-center justify-center gap-2 font-bold shadow-glow-pink"
          >
            <span>Memory Lane</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </Container>
  );
}
