'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BalloonItem } from '@/types/config.types';
import { Sparkles } from 'lucide-react';

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
    pink: 'from-[#FFF5F8] via-[#F8B4C8] to-[#E86A92]',
    gold: 'from-[#FFFDF9] via-[#FCE4AB] to-[#D9A441]',
    violet: 'from-[#FDF2F8] via-[#E8DDF5] to-[#B89EE2]',
  }[item.color as 'pink' | 'gold' | 'violet'] || 'from-[#FFF5F8] via-[#F8B4C8] to-[#E86A92]';

  const glowShadow = {
    pink: 'shadow-glow-pink',
    gold: 'shadow-glow-gold',
    violet: 'shadow-glow-violet',
  }[item.color as 'pink' | 'gold' | 'violet'] || 'shadow-glow-pink';

  if (isPopped) {
    return (
      <div className="w-20 h-28 sm:w-24 sm:h-32 flex flex-col items-center justify-center opacity-40 select-none">
        <div className="w-10 h-10 rounded-full bg-white/80 border border-brand-rose/40 flex items-center justify-center text-brand-rose shadow-subtle">
          <Sparkles className="w-5 h-5" />
        </div>
        <span className="text-[10px] text-brand-muted font-bold mt-1">Popped ✨</span>
      </div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={() => onPop(item)}
      aria-label={`Floating balloon with ${item.emoji}, tap to pop and reveal secret birthday wish`}
      whileHover={prefersReducedMotion ? {} : { scale: 1.1, y: -4 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
      animate={
        prefersReducedMotion
          ? {}
          : {
              y: [0, -12, 0],
              x: [-2, 2, -2],
              rotate: [-3, 3, -3],
            }
      }
      transition={{
        repeat: Infinity,
        duration: 3.2 + (index % 3) * 0.7,
        ease: 'easeInOut',
      }}
      className="relative group flex flex-col items-center min-w-[64px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-rose rounded-full p-2 cursor-pointer select-none"
    >
      {/* 2.5D BALLOON OVAL SPHERE */}
      <div
        className={`w-18 h-24 sm:w-22 sm:h-28 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-tr ${colorGradients} ${glowShadow} relative flex items-center justify-center border border-white/60 transform-gpu transition-shadow duration-300`}
      >
        {/* Curved Specular 3D Highlight */}
        <div className="absolute top-2.5 left-3 w-5 h-8 rounded-full bg-white/70 blur-[1px] rotate-[-30deg]" />
        
        {/* Soft Secondary Rim Light */}
        <div className="absolute bottom-3 right-3 w-4 h-6 rounded-full bg-white/40 blur-[2px]" />

        {/* Emoji Symbol */}
        <span className="text-2xl sm:text-3xl drop-shadow-sm select-none group-hover:scale-125 transition-transform duration-200">
          {item.emoji}
        </span>

        {/* Balloon Tied Knot */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-2.5 bg-brand-rose/60 border border-white/40 rounded-b-sm" />
      </div>

      {/* Dangling String SVG */}
      <svg width="24" height="36" viewBox="0 0 24 36" className="opacity-75 overflow-visible">
        <path
          d="M12 0 Q6 12, 18 22 T12 36"
          fill="none"
          stroke="#B83B68"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
      </svg>
    </motion.button>
  );
}
