'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useExperience } from '@/hooks/useExperience';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useBirthdayConfig } from '@/context/ConfigContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { ConfettiCanvas } from '@/components/celebration/ConfettiCanvas';
import { HandwrittenText } from '@/components/typography/HandwrittenText';
import { Sparkle } from '@/components/decorative/Sparkle';
import { OrnamentDivider } from '@/components/decorative/OrnamentDivider';
import { ChevronLeft, RotateCcw, PartyPopper, Heart } from 'lucide-react';

export function CelebrationScene() {
  const { prevScene, replayExperience } = useExperience();
  const birthdayConfig = useBirthdayConfig();
  const prefersReducedMotion = useReducedMotion();

  const getDelay = (seconds: number) => (prefersReducedMotion ? 0 : seconds);
  const recipientName = birthdayConfig.recipient.name.toUpperCase();

  return (
    <Container className="flex flex-col items-center justify-center my-auto py-3 relative">
      {/* High-Performance Canvas Confetti & Particle Fireworks */}
      <ConfettiCanvas
        colors={birthdayConfig.celebration.confettiColors}
        particleCount={65}
      />

      <Card
        variant="goldGlow"
        glow="gold"
        padded={false}
        className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden z-10"
      >
        {/* Ambient background decoration */}
        <div aria-hidden="true" className="absolute top-4 left-4 opacity-40 pointer-events-none">
          <Sparkle size="md" color="gold" />
        </div>
        <div aria-hidden="true" className="absolute top-4 right-4 opacity-40 pointer-events-none">
          <Sparkle size="md" color="pink" />
        </div>

        {/* 1. Header Emblem & Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: getDelay(0.15), ease: 'easeOut' }}
          className="flex flex-col items-center gap-2 mb-3"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-gold-400/30 via-brand-pink-500/20 to-brand-gold-300/30 border border-brand-gold-400/50 flex items-center justify-center shadow-glow-gold">
            <PartyPopper className="w-7 h-7 text-brand-gold-300 animate-bounce" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-brand-gold-400/20 text-brand-gold-200 border border-brand-gold-400/35 shadow-glow-gold-soft">
            <span>The Grand Celebration</span>
          </span>
        </motion.div>

        {/* 2. Grand Birthday Typography */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: getDelay(0.35), ease: [0.22, 1, 0.36, 1] }}
          className="space-y-1 mb-4"
        >
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-brand-gold-300/90 font-display">
            Happy Birthday
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display text-gradient-gold tracking-tight leading-none drop-shadow-[0_4px_20px_rgba(245,158,11,0.4)] px-1">
            {recipientName}
          </h1>

          <p className="text-xs sm:text-sm text-brand-cream-100/90 font-sans leading-relaxed max-w-xs sm:max-w-sm mx-auto pt-1.5">
            {birthdayConfig.celebration.subtitle}
          </p>
        </motion.div>

        {/* 3. Personal Closing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: getDelay(0.55), ease: 'easeOut' }}
          className="w-full bg-brand-purple-950/85 rounded-2xl p-4 sm:p-5 border border-brand-gold-400/35 mb-4 shadow-glass text-center space-y-1.5"
        >
          <div className="flex items-center justify-center gap-1 text-xs text-brand-pink-300 font-semibold">
            <Heart className="w-3.5 h-3.5 fill-brand-pink-400" />
            <span>Forever Cherished</span>
          </div>

          <HandwrittenText size="md" variant="gold" className="italic leading-relaxed">
            �May your day and year ahead be as radiant, joyful, and deeply loved as you are.�
          </HandwrittenText>

          <p className="text-[11px] text-brand-cream-200/70 pt-1 font-sans">
            � With all my love, {birthdayConfig.sender.name} ??
          </p>
        </motion.div>

        {/* 4. Delicate Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: getDelay(0.7) }}
          className="w-full max-w-xs mb-4"
        >
          <OrnamentDivider symbol="sparkle" />
        </motion.div>

        {/* 5. Navigation Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: getDelay(0.85), ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex items-center justify-between gap-3"
        >
          <Button
            variant="secondary"
            size="md"
            onClick={prevScene}
            aria-label="Return to personal letter scene"
            className="flex-1 flex items-center justify-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button
            variant="gold"
            size="md"
            onClick={replayExperience}
            aria-label="Replay experience from beginning"
            className="flex-1 flex items-center justify-center gap-2 font-bold shadow-glow-gold"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{birthdayConfig.celebration.replayButtonText}</span>
          </Button>
        </motion.div>
      </Card>
    </Container>
  );
}
