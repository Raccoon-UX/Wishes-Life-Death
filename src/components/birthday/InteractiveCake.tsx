'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface InteractiveCakeProps {
  candleCount: number;
  candlesLit: boolean[];
  onToggleCandle: (index: number) => void;
  flavor?: string;
}

export function InteractiveCake({
  candleCount,
  candlesLit,
  onToggleCandle,
  flavor = 'Strawberry Vanilla Cream',
}: InteractiveCakeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[320px] mx-auto flex flex-col items-center select-none py-2">
      {/* CANDLES ROW */}
      <div className="relative z-20 flex items-end justify-center gap-4 sm:gap-6 -mb-3 px-2">
        {Array.from({ length: candleCount }).map((_, index) => {
          const isLit = candlesLit[index] ?? true;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onToggleCandle(index)}
              aria-label={`Candle ${index + 1}, ${isLit ? 'lit - tap to blow out' : 'extinguished'}`}
              className="group relative flex flex-col items-center justify-end min-w-[44px] min-h-[64px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-purple-950 rounded-lg p-1 transition-transform active:scale-95 cursor-pointer"
            >
              {/* FLAME / SMOKE CONTAINER */}
              <div className="relative w-6 h-8 flex items-center justify-center mb-0.5">
                <AnimatePresence mode="wait">
                  {isLit ? (
                    <motion.div
                      key="flame"
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={
                        prefersReducedMotion
                          ? { scale: 1, opacity: 1 }
                          : {
                              scale: [1, 1.15, 0.95, 1.1, 1],
                              opacity: [0.95, 1, 0.9, 1, 0.95],
                              rotate: [-2, 2, -1, 3, 0],
                            }
                      }
                      exit={{ scale: 0, opacity: 0, y: -8 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.8 + (index % 3) * 0.4,
                        ease: 'easeInOut',
                      }}
                      className="relative flex items-center justify-center"
                    >
                      {/* Outer Flame Glow */}
                      <div className="absolute w-7 h-7 rounded-full bg-brand-gold-400/40 blur-[6px]" />

                      {/* Flame Teardrop SVG */}
                      <svg
                        viewBox="0 0 20 28"
                        className="w-5 h-7 drop-shadow-[0_0_10px_rgba(245,158,11,0.85)]"
                      >
                        <defs>
                          <radialGradient id={`flameGrad-${index}`} cx="50%" cy="60%" r="50%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="35%" stopColor="#FDE68A" />
                            <stop offset="70%" stopColor="#F59E0B" />
                            <stop offset="100%" stopColor="#EF4444" />
                          </radialGradient>
                        </defs>
                        <path
                          d="M10 0 C13 7, 19 14, 19 20 C19 25, 15 28, 10 28 C5 28, 1 25, 1 20 C1 14, 7 7, 10 0 Z"
                          fill={`url(#flameGrad-${index})`}
                        />
                      </svg>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="smoke"
                      initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
                      animate={{ opacity: 0, y: -20, scale: 1.4 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="text-[11px] text-brand-cream-300 font-bold select-none pointer-events-none"
                    >
                      ??
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* WICK */}
              <div className="w-[2px] h-2 bg-neutral-900 rounded-full mb-[1px]" />

              {/* CANDLE BODY */}
              <div
                className={`w-3.5 h-10 sm:h-12 rounded-t-sm shadow-md transition-all duration-300 ${
                  index % 3 === 0
                    ? 'bg-gradient-to-b from-brand-pink-200 via-brand-pink-400 to-brand-pink-500'
                    : index % 3 === 1
                    ? 'bg-gradient-to-b from-brand-cream-100 via-brand-gold-300 to-brand-gold-500'
                    : 'bg-gradient-to-b from-brand-violet-300 via-brand-violet-400 to-brand-violet-600'
                }`}
              >
                {/* Spiral decorative stripes */}
                <div className="w-full h-full flex flex-col justify-around py-1 opacity-40">
                  <div className="w-full h-[2px] bg-white/70 rotate-[-20deg]" />
                  <div className="w-full h-[2px] bg-white/70 rotate-[-20deg]" />
                  <div className="w-full h-[2px] bg-white/70 rotate-[-20deg]" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* CAKE CONTAINER SVG */}
      <div className="relative w-full z-10 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]">
        <svg
          viewBox="0 0 300 190"
          className="w-full h-auto overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="plateGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>

            <linearGradient id="topTierGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FCE7F3" />
              <stop offset="40%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>

            <linearGradient id="bottomTierGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A1D6D" />
              <stop offset="50%" stopColor="#2D124D" />
              <stop offset="100%" stopColor="#1A0B2E" />
            </linearGradient>

            <linearGradient id="frostingCream" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="70%" stopColor="#FFFBEB" />
              <stop offset="100%" stopColor="#FEF3C7" />
            </linearGradient>
          </defs>

          {/* 1. PORCELAIN SERVING PLATTER */}
          <ellipse cx="150" cy="170" rx="140" ry="16" fill="url(#plateGrad)" stroke="#CBD5E1" strokeWidth="2" />
          <ellipse cx="150" cy="167" rx="130" ry="12" fill="#F8FAFC" opacity="0.9" />

          {/* 2. BOTTOM CAKE TIER */}
          <path
            d="M45 110 C45 110, 45 155, 45 155 C45 168, 255 168, 255 155 C255 155, 255 110, 255 110 Z"
            fill="url(#bottomTierGrad)"
          />
          <ellipse cx="150" cy="110" rx="105" ry="15" fill="#5E2894" />

          {/* Bottom Tier Gold Pearl Beads */}
          <g fill="#FBBF24" opacity="0.9">
            {Array.from({ length: 11 }).map((_, i) => (
              <circle key={i} cx={60 + i * 18} cy={155 + Math.sin(i * 0.6) * 3} r="3.5" />
            ))}
          </g>

          {/* 3. TOP CAKE TIER */}
          <path
            d="M80 55 C80 55, 80 105, 80 105 C80 118, 220 118, 220 105 C220 105, 220 55, 220 55 Z"
            fill="url(#topTierGrad)"
          />
          <ellipse cx="150" cy="55" rx="70" ry="12" fill="#FBCFE8" />

          {/* Dripping Strawberry Cream Frosting */}
          <path
            d="M80 55 Q90 75 100 62 Q110 82 122 60 Q135 88 150 64 Q165 85 178 60 Q190 80 202 62 Q212 75 220 55 C220 48, 80 48, 80 55 Z"
            fill="url(#frostingCream)"
          />

          {/* Cream Swirls on Top */}
          <g fill="#FFFDF9" stroke="#FBCFE8" strokeWidth="1">
            <ellipse cx="100" cy="53" rx="7" ry="4" />
            <ellipse cx="125" cy="56" rx="7" ry="4" />
            <ellipse cx="150" cy="57" rx="8" ry="5" />
            <ellipse cx="175" cy="56" rx="7" ry="4" />
            <ellipse cx="200" cy="53" rx="7" ry="4" />
          </g>
        </svg>
      </div>

      {/* Flavor subtitle */}
      <span className="text-[10px] sm:text-[11px] font-medium tracking-wider uppercase text-brand-pink-300/80 mt-1">
        ?? {flavor}
      </span>
    </div>
  );
}
