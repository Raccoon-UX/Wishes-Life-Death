'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useExperience } from '@/hooks/useExperience';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useBirthdayConfig } from '@/context/ConfigContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { FloatingHeart } from '@/components/decorative/FloatingHeart';
import { Sparkle } from '@/components/decorative/Sparkle';
import { Star } from '@/components/decorative/Star';
import { OrnamentDivider } from '@/components/decorative/OrnamentDivider';
import { HandwrittenText } from '@/components/typography/HandwrittenText';
import { ChevronLeft, ArrowRight, Cake, Sparkles } from 'lucide-react';

export function RevealScene() {
  const { nextScene, prevScene, completeScene } = useExperience();
  const birthdayConfig = useBirthdayConfig();
  const prefersReducedMotion = useReducedMotion();

  const handleContinue = () => {
    completeScene('reveal');
    nextScene();
  };

  const getDelay = (seconds: number) => (prefersReducedMotion ? 0 : seconds);

  return (
    <Container className="flex flex-col items-center justify-center my-auto py-4">
      <Card
        variant="romantic"
        glow="medium"
        padded={false}
        className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Ambient floating elements */}
        <div aria-hidden="true" className="absolute top-4 left-4 opacity-40 pointer-events-none">
          <Sparkle size="md" color="gold" delay="0.2s" />
        </div>
        <div aria-hidden="true" className="absolute top-8 right-6 opacity-40 pointer-events-none">
          <FloatingHeart size="md" color="pink" delay="0.8s" />
        </div>
        <div aria-hidden="true" className="absolute bottom-6 right-6 opacity-40 pointer-events-none">
          <Star size="sm" color="gold" />
        </div>

        {/* 1. Header Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: getDelay(0.15), ease: 'easeOut' }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase bg-brand-pink-400/20 text-brand-pink-200 border border-brand-pink-400/35 shadow-glow-pink-soft">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-300" />
            <span>The Grand Reveal</span>
          </span>
        </motion.div>

        {/* 2. Grand Birthday Statement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: getDelay(0.3), ease: [0.22, 1, 0.36, 1] }}
          className="space-y-2 mb-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-gradient-romantic tracking-tight leading-tight">
            {birthdayConfig.reveal.headline}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-brand-cream-100/90 font-sans leading-relaxed max-w-xs sm:max-w-sm mx-auto">
            {birthdayConfig.reveal.subheadline}
          </p>
        </motion.div>

        {/* 3. Highlight Message Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: getDelay(0.5), ease: 'easeOut' }}
          className="w-full bg-brand-purple-950/70 rounded-2xl p-4 sm:p-5 border border-brand-pink-400/25 mb-4 shadow-glass"
        >
          <HandwrittenText size="lg" variant="gold" className="italic">
            &ldquo;{birthdayConfig.reveal.highlightText}&rdquo;
          </HandwrittenText>
          <p className="text-[11px] text-brand-pink-300/80 mt-2 font-medium">
            � Wishing you all the wonder in the world ?
          </p>
        </motion.div>

        {/* 4. Delicate Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: getDelay(0.65) }}
          className="w-full max-w-xs mb-5"
        >
          <OrnamentDivider symbol="sparkle" />
        </motion.div>

        {/* 5. Navigation Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: getDelay(0.75), ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex items-center justify-between gap-3"
        >
          <Button
            variant="secondary"
            size="md"
            onClick={prevScene}
            aria-label="Return to intro scene"
            className="flex-1 flex items-center justify-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button
            variant="romantic"
            size="md"
            onClick={handleContinue}
            aria-label="Proceed to birthday cake scene"
            className="flex-1 flex items-center justify-center gap-2 font-bold shadow-glow-pink"
          >
            <Cake className="w-4 h-4 text-brand-gold-300" />
            <span>Make a Wish</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </Card>
    </Container>
  );
}
