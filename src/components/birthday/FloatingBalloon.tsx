'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BalloonItem } from '@/types/config.types';

export interface FloatingBalloonProps {
  item: BalloonItem;
  index: number;
  isPopped: boolean;
  onPop: (item: BalloonItem) => void;
}

export function FloatingBalloon({
  item,
  index,
  isPopped,
  onPop,
}: FloatingBalloonProps) {
  const prefersReducedMotion = useReducedMotion();

  const colorGradients = {
    pink: 'from-brand-pink-300 via-brand-pink-400 to-brand-pink-600',
    gold: 'from-brand-gold-300 via-brand-gold-400 to-brand-gold-600',
    violet: 'from-brand-violet-300 via-brand-violet-400 to-brand-violet-600',
  }[item.color as 'pink' | 'gold' | 'violet'] || 'from-brand-pink-300 to-brand-violet-500';

  const glowShadow = {
    pink: 'shadow-glow-pink',
    gold: 'shadow-glow-gold',
    violet: 'shadow-glow-violet',
  }[item.color as 'pink' | 'gold' | 'violet'] || 'shadow-glow-pink';

  if (isPopped) {
    return (
      <div className="w-20 h-24 sm:w-24 sm:h-28 flex flex-col items-center justify-center opacity-30 select-none">
        <span className="text-2xl">?</span>
        <span className="text-[10px] text-brand-cream-300 font-semibold mt-1">Popped!</span>
      </div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={() => onPop(item)}
      aria-label={`Floating balloon ${index + 1} with ${item.emoji}, tap to pop and reveal surprise wish`}
      whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
      animate={
        prefersReducedMotion
          ? {}
          : {
              y: [0, -10, 0],
              rotate: [-2, 2, -2],
            }
      }
      transition={{
        repeat: Infinity,
        duration: 3 + (index % 3) * 0.8,
        ease: 'easeInOut',
      }}
      className="relative group flex flex-col items-center min-w-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400 rounded-full p-2 cursor-pointer select-none"
    >
      {/* BALLOON OVAL BODY */}
      <div
        className={`w-16 h-20 sm:w-20 sm:h-24 rounded-[50%] bg-gradient-to-tr ${colorGradients} ${glowShadow} relative flex items-center justify-center border border-white/20 transform-gpu`}
      >
        {/* Specular Highlight */}
        <div className="absolute top-2 left-2.5 w-4 h-6 rounded-full bg-white/45 blur-[1px] rotate-[-25deg]" />

        {/* Emoji Badge */}
        <span className="text-xl sm:text-2xl drop-shadow-md select-none group-hover:scale-110 transition-transform">
          {item.emoji}
        </span>

        {/* Balloon Knot */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2 bg-inherit rounded-b-sm" />
      </div>

      {/* Balloon Hanging String SVG */}
      <svg width="20" height="28" viewBox="0 0 20 28" className="opacity-60 overflow-visible">
        <path
          d="M10 0 Q6 10, 14 18 T10 28"
          fill="none"
          stroke="#FFFDF9"
          strokeWidth="1.2"
        />
      </svg>
    </motion.button>
  );
}
