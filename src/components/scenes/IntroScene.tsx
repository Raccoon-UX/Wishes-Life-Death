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
import { OrnamentDivider } from '@/components/decorative/OrnamentDivider';
import { HandwrittenText } from '@/components/typography/HandwrittenText';
import { ArrowRight, Gift } from 'lucide-react';

export function IntroScene() {
  const { nextScene, completeScene, setInteractionFlag } = useExperience();
  const birthdayConfig = useBirthdayConfig();
  const prefersReducedMotion = useReducedMotion();

  const handleOpenGift = () => {
    completeScene('intro');
    setInteractionFlag('isIntroComplete', true);
    nextScene();
  };

  // Stagger animation timing helper
  const getDelay = (seconds: number) => (prefersReducedMotion ? 0 : seconds);

  return (
    <Container className="flex flex-col items-center justify-center my-auto py-4">
      <Card
        variant="romantic"
        glow="soft"
        padded={false}
        className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Floating background decorative accents */}
        <div
          aria-hidden="true"
          className="absolute -top-6 -right-6 pointer-events-none opacity-40"
        >
          <FloatingHeart size="lg" color="pink" delay="0.5s" />
        </div>
        <div
          aria-hidden="true"
          className="absolute -bottom-6 -left-6 pointer-events-none opacity-40"
        >
          <FloatingHeart size="md" color="gold" delay="1.2s" />
        </div>

        {/* 1. Header Emblem & Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: getDelay(0.15), ease: 'easeOut' }}
          className="flex flex-col items-center gap-3 mb-4"
        >
          <div className="relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-brand-pink-500/20 via-brand-purple-800/60 to-brand-gold-400/20 border border-brand-pink-400/40 flex items-center justify-center shadow-glow-pink-soft">
              <Gift className="w-7 h-7 sm:w-8 sm:h-8 text-brand-pink-300 animate-pulse-subtle" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkle size="sm" color="gold" delay="0.3s" />
            </div>
          </div>

          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase bg-brand-pink-400/15 text-brand-pink-200 border border-brand-pink-400/30 shadow-glow-pink-soft">
            {birthdayConfig.intro.badgeText}
          </span>
        </motion.div>

        {/* 2. Recipient Name & Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: getDelay(0.3), ease: [0.22, 1, 0.36, 1] }}
          className="space-y-2 mb-3"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-gradient-romantic tracking-tight leading-tight px-1">
            {birthdayConfig.intro.greeting}
          </h1>

          {birthdayConfig.recipient.nickname && (
            <p className="text-xs sm:text-sm font-medium text-brand-gold-300/90 tracking-wide uppercase">
              ? For My Dearest {birthdayConfig.recipient.nickname} ?
            </p>
          )}
        </motion.div>

        {/* 3. Emotional Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: getDelay(0.45), ease: 'easeOut' }}
          className="max-w-xs sm:max-w-sm mb-4"
        >
          <p className="text-xs sm:text-sm md:text-base text-brand-cream-100/85 leading-relaxed font-sans">
            {birthdayConfig.intro.subheading}
          </p>
        </motion.div>

        {/* 4. Handwritten Personal Accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: getDelay(0.6), ease: 'easeOut' }}
          className="mb-4"
        >
          <HandwrittenText size="md" variant="pink">
            �A little digital world created just for you...�
          </HandwrittenText>
        </motion.div>

        {/* 5. Delicate Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: getDelay(0.7) }}
          className="w-full max-w-xs mb-5"
        >
          <OrnamentDivider symbol="sparkle" />
        </motion.div>

        {/* 6. Primary CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: getDelay(0.8), ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <Button
            variant="romantic"
            size="lg"
            fullWidth
            onClick={handleOpenGift}
            aria-label={`${birthdayConfig.intro.ctaText} for ${birthdayConfig.recipient.name}`}
            className="group flex items-center justify-center gap-2.5 font-bold shadow-glow-pink"
          >
            <span>{birthdayConfig.intro.ctaText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
          </Button>

          <p className="text-[10px] sm:text-[11px] text-brand-cream-200/50 mt-2.5 tracking-wide">
            Tap to begin your celebration journey
          </p>
        </motion.div>
      </Card>
    </Container>
  );
}
