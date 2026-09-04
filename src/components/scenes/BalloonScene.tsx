'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/hooks/useExperience';
import { useBirthdayConfig } from '@/context/ConfigContext';
import { BalloonItem } from '@/types/config.types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { FloatingBalloon } from '@/components/birthday/FloatingBalloon';
import { HandwrittenText } from '@/components/typography/HandwrittenText';
import { Sparkle } from '@/components/decorative/Sparkle';
import { ChevronLeft, ArrowRight, PartyPopper, MessageSquareHeart } from 'lucide-react';

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
    <Container className="flex flex-col items-center justify-center my-auto py-4">
      <Card
        variant={isAllPopped ? 'goldGlow' : 'romantic'}
        glow={isAllPopped ? 'gold' : 'soft'}
        padded={false}
        className="w-full max-w-sm sm:max-w-md p-5 sm:p-7 flex flex-col items-center text-center relative overflow-hidden transition-all duration-500"
      >
        {/* Ambient background decoration */}
        <div aria-hidden="true" className="absolute top-4 left-4 opacity-40 pointer-events-none">
          <Sparkle size="md" color="gold" />
        </div>

        {/* Scene Title */}
        <div className="space-y-1.5 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase bg-brand-violet-400/20 text-brand-violet-200 border border-brand-violet-400/30">
            <PartyPopper className="w-3.5 h-3.5 text-brand-gold-300" />
            <span>Interactive Balloons</span>
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold font-display text-gradient-romantic">
            {birthdayConfig.balloons.title}
          </h2>

          <p className="text-xs sm:text-sm text-brand-cream-200/80 max-w-xs mx-auto">
            {isAllPopped
              ? '?? All surprise wishes have been revealed!'
              : birthdayConfig.balloons.instruction}
          </p>
        </div>

        {/* BALLOONS INTERACTION CLUSTER */}
        <div className="w-full flex items-center justify-center gap-3 sm:gap-6 my-2 py-2">
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

        {/* REVEALED MESSAGE TRAY */}
        <div className="w-full min-h-[100px] flex items-center justify-center my-3">
          <AnimatePresence mode="wait">
            {activeMessage ? (
              <motion.div
                key={activeMessage.id}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full bg-brand-purple-950/85 rounded-2xl p-4 border border-brand-pink-400/40 shadow-glow-pink-soft text-center space-y-1"
              >
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-brand-pink-300">
                  <span className="text-lg">{activeMessage.emoji}</span>
                  <span>Surprise Note</span>
                </div>
                <HandwrittenText size="md" variant="pink">
                  &ldquo;{activeMessage.secretMessage}&rdquo;
                </HandwrittenText>
              </motion.div>
            ) : (
              <div className="text-xs text-brand-cream-300/60 italic py-4">
                Tap any floating balloon above to pop it and reveal its secret note ?
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Action Buttons */}
        <div className="w-full flex items-center justify-between gap-3 pt-1">
          <Button
            variant="secondary"
            size="md"
            onClick={prevScene}
            aria-label="Return to birthday cake scene"
            className="flex-1 flex items-center justify-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button
            variant={isAllPopped ? 'gold' : 'romantic'}
            size="md"
            onClick={handleContinue}
            aria-label="Proceed to surprise messages scene"
            className="flex-1 flex items-center justify-center gap-2 font-bold shadow-glow-pink"
          >
            <MessageSquareHeart className="w-4 h-4 text-brand-pink-300" />
            <span>Special Notes</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </Container>
  );
}
