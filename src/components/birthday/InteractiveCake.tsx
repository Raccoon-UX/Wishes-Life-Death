'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Sparkles } from 'lucide-react';

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
  flavor = 'Strawberry Vanilla Cream Cake 🍰',
}: InteractiveCakeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[340px] mx-auto flex flex-col items-center select-none py-2">
      
      {/* Dynamic Candle Light Glow in Background */}
      <div
        className={`absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-2xl -z-10 transition-all duration-700 pointer-events-none ${
          candlesLit.some(Boolean)
            ? 'bg-brand-champagne/30 scale-110'
            : 'bg-brand-blush/20 scale-90'
        }`}
      />

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
              className="group relative flex flex-col items-center justify-end min-w-[44px] min-h-[64px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne rounded-lg p-1 transition-transform active:scale-95 cursor-pointer"
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
                              scale: [1, 1.18, 0.96, 1.12, 1],
                              opacity: [0.95, 1, 0.92, 1, 0.95],
                              rotate: [-2, 2, -1, 3, 0],
                            }
                      }
                      exit={{ scale: 0, opacity: 0, y: -10 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.6 + (index % 3) * 0.3,
                        ease: 'easeInOut',
                      }}
                      className="relative flex items-center justify-center"
                    >
                      {/* Outer Flame Radiant Glow */}
                      <div className="absolute w-8 h-8 rounded-full bg-brand-champagne/45 blur-[7px]" />

                      {/* Flame Teardrop SVG */}
                      <svg
                        viewBox="0 0 20 28"
                        className="w-5 h-7 drop-shadow-[0_0_10px_rgba(217,164,65,0.95)]"
                      >
                        <defs>
                          <radialGradient id={`flameGrad-${index}`} cx="50%" cy="60%" r="50%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="35%" stopColor="#FCE4AB" />
                            <stop offset="70%" stopColor="#D9A441" />
                            <stop offset="100%" stopColor="#E86A92" />
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
                      initial={{ opacity: 0.8, y: 0, scale: 0.4 }}
                      animate={{ opacity: 0, y: -24, scale: 1.5, x: [-2, 4, -2] }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="pointer-events-none flex flex-col items-center"
                    >
                      {/* Animated Smoke Puff SVG */}
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-brand-rose/40 fill-current">
                        <path d="M12 2a4 4 0 0 0-4 4c0 .3.04.58.11.86A5 5 0 0 0 4 12a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5c0-2.4-1.7-4.4-4-4.9.04-.36.1-.7.1-1.1a4 4 0 0 0-8-4z" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* WICK */}
              <div className="w-[2px] h-2 bg-brand-deepRose rounded-full mb-[1px]" />

              {/* CANDLE BODY */}
              <div
                className={`w-3.5 h-10 sm:h-12 rounded-t-sm shadow-sm transition-all duration-300 ${
                  index % 3 === 0
                    ? 'bg-gradient-to-b from-brand-blush via-brand-rose to-brand-deepRose'
                    : index % 3 === 1
                    ? 'bg-gradient-to-b from-brand-cream-50 via-brand-champagne to-brand-gold-600'
                    : 'bg-gradient-to-b from-brand-lavender via-brand-violet-300 to-brand-violet-500'
                }`}
              >
                {/* Spiral decorative stripes */}
                <div className="w-full h-full flex flex-col justify-around py-1 opacity-50">
                  <div className="w-full h-[2px] bg-white rotate-[-20deg]" />
                  <div className="w-full h-[2px] bg-white rotate-[-20deg]" />
                  <div className="w-full h-[2px] bg-white rotate-[-20deg]" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* CAKE CONTAINER SVG */}
      <div className="relative w-full z-10 filter drop-shadow-[0_12px_24px_rgba(232,106,146,0.22)]">
        <svg
          viewBox="0 0 300 190"
          className="w-full h-auto overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="plateGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FFF9F5" />
              <stop offset="100%" stopColor="#FCE4EC" />
            </linearGradient>

            <linearGradient id="topTierGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF5F8" />
              <stop offset="40%" stopColor="#F8B4C8" />
              <stop offset="100%" stopColor="#E86A92" />
            </linearGradient>

            <linearGradient id="bottomTierGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FCE4EC" />
              <stop offset="45%" stopColor="#F8B4C8" />
              <stop offset="100%" stopColor="#E86A92" />
            </linearGradient>

            <linearGradient id="frostingCream" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#FFF9F5" />
              <stop offset="100%" stopColor="#FFF1E8" />
            </linearGradient>
          </defs>

          {/* 1. PORCELAIN SERVING PLATTER */}
          <ellipse cx="150" cy="170" rx="140" ry="16" fill="url(#plateGrad)" stroke="#E86A92" strokeWidth="1.5" strokeOpacity="0.4" />
          <ellipse cx="150" cy="167" rx="130" ry="12" fill="#FFFFFF" opacity="0.95" />

          {/* 2. BOTTOM CAKE TIER */}
          <path
            d="M45 110 C45 110, 45 155, 45 155 C45 168, 255 168, 255 155 C255 155, 255 110, 255 110 Z"
            fill="url(#bottomTierGrad)"
          />
          <ellipse cx="150" cy="110" rx="105" ry="15" fill="#F8B4C8" />

          {/* Bottom Tier Gold Pearl Beads */}
          <g fill="#D9A441" opacity="0.95">
            {Array.from({ length: 11 }).map((_, i) => (
              <circle key={i} cx={60 + i * 18} cy={155 + Math.sin(i * 0.6) * 3} r="3.5" />
            ))}
          </g>

          {/* 3. TOP CAKE TIER */}
          <path
            d="M80 55 C80 55, 80 105, 80 105 C80 118, 220 118, 220 105 C220 105, 220 55, 220 55 Z"
            fill="url(#topTierGrad)"
          />
          <ellipse cx="150" cy="55" rx="70" ry="12" fill="#FCE4EC" />

          {/* Dripping Strawberry Cream Frosting */}
          <path
            d="M80 55 Q90 75 100 62 Q110 82 122 60 Q135 88 150 64 Q165 85 178 60 Q190 80 202 62 Q212 75 220 55 C220 48, 80 48, 80 55 Z"
            fill="url(#frostingCream)"
            stroke="#F8B4C8"
            strokeWidth="0.5"
          />

          {/* Cream Swirls on Top */}
          <g fill="#FFFFFF" stroke="#F8B4C8" strokeWidth="1">
            <ellipse cx="100" cy="53" rx="7" ry="4" />
            <ellipse cx="125" cy="56" rx="7" ry="4" />
            <ellipse cx="150" cy="57" rx="8" ry="5" />
            <ellipse cx="175" cy="56" rx="7" ry="4" />
            <ellipse cx="200" cy="53" rx="7" ry="4" />
          </g>
        </svg>
      </div>

      {/* Flavor subtitle */}
      <span className="text-xs font-semibold tracking-wider text-brand-rose mt-2 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-brand-champagne" />
        <span>{flavor}</span>
      </span>
    </div>
  );
}
