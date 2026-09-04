'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useExperience } from '@/hooks/useExperience';
import { useBirthdayConfig } from '@/context/ConfigContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { InteractiveCake } from '@/components/birthday/InteractiveCake';
import { FloatingHeart } from '@/components/decorative/FloatingHeart';
import { Sparkle } from '@/components/decorative/Sparkle';
import { HandwrittenText } from '@/components/typography/HandwrittenText';
import { ChevronLeft, ArrowRight, Sparkles, PartyPopper } from 'lucide-react';

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

  return (
    <Container className="flex flex-col items-center justify-center my-auto py-4">
      <Card
        variant={allExtinguished ? 'goldGlow' : 'romantic'}
        glow={allExtinguished ? 'gold' : 'soft'}
        padded={false}
        className="w-full max-w-sm sm:max-w-md p-5 sm:p-7 flex flex-col items-center text-center relative overflow-hidden transition-all duration-500"
      >
        {/* Ambient background decoration */}
        <div aria-hidden="true" className="absolute top-4 right-4 opacity-40 pointer-events-none">
          <Sparkle size="md" color={allExtinguished ? 'gold' : 'pink'} />
        </div>
        <div aria-hidden="true" className="absolute bottom-4 left-4 opacity-40 pointer-events-none">
          <FloatingHeart size="sm" color={allExtinguished ? 'gold' : 'pink'} />
        </div>

        {/* Scene Title / Status */}
        <div className="space-y-1.5 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase bg-brand-pink-400/15 text-brand-pink-300 border border-brand-pink-400/25">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-300" />
            <span>Interactive Birthday Cake</span>
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold font-display text-gradient-romantic">
            {allExtinguished ? '? Wish Granted! ?' : 'Make A Wish ??'}
          </h2>

          <p className="text-xs sm:text-sm text-brand-cream-200/80 max-w-xs mx-auto">
            {allExtinguished
              ? `Happy Birthday, ${birthdayConfig.recipient.name}! May all your dreams come true.`
              : birthdayConfig.cake.blowPrompt}
          </p>
        </div>

        {/* INTERACTIVE DIGITAL CAKE */}
        <div className="w-full my-1 flex justify-center">
          <InteractiveCake
            candleCount={totalCandles}
            candlesLit={candlesLit}
            onToggleCandle={handleToggleCandle}
            flavor={birthdayConfig.cake.flavor}
          />
        </div>

        {/* Dynamic State Feedback Box */}
        <div className="w-full my-3">
          {allExtinguished ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-brand-purple-950/80 rounded-xl p-3.5 border border-brand-gold-400/40 shadow-glow-gold-soft space-y-1"
            >
              <div className="flex items-center justify-center gap-2 text-brand-gold-300 font-bold text-xs">
                <PartyPopper className="w-4 h-4" />
                <span>All candles blown out!</span>
              </div>
              <HandwrittenText size="md" variant="gold">
                �Here is to your sweetest and brightest year yet!�
              </HandwrittenText>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs text-brand-cream-200/70">
                {candlesLit.filter(Boolean).length} of {totalCandles} candles burning
              </span>
              <button
                type="button"
                onClick={handleBlowAll}
                className="text-[11px] font-semibold text-brand-gold-300 hover:text-brand-gold-200 underline underline-offset-2 px-2 py-1"
              >
                Blow All Out
              </button>
            </div>
          )}
        </div>

        {/* Navigation Action Buttons */}
        <div className="w-full flex items-center justify-between gap-3 pt-1">
          <Button
            variant="secondary"
            size="md"
            onClick={prevScene}
            aria-label="Return to birthday reveal scene"
            className="flex-1 flex items-center justify-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button
            variant={allExtinguished ? 'gold' : 'romantic'}
            size="md"
            onClick={handleContinue}
            aria-label="Proceed to balloon popping scene"
            className="flex-1 flex items-center justify-center gap-2 font-bold shadow-glow-pink"
          >
            <span>Pop Balloons</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </Container>
  );
}
