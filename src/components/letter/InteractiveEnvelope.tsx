'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Sparkles, Heart } from 'lucide-react';

export interface InteractiveEnvelopeProps {
  isOpened: boolean;
  onOpen: () => void;
  senderName?: string;
  recipientName?: string;
}

export function InteractiveEnvelope({
  isOpened,
  onOpen,
  senderName = 'Alex',
  recipientName = 'Sarah',
}: InteractiveEnvelopeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-[320px] sm:max-w-[360px] mx-auto flex flex-col items-center select-none py-4">
      {/* Interactive Envelope Container Button */}
      <button
        type="button"
        onClick={onOpen}
        disabled={isOpened}
        aria-expanded={isOpened}
        aria-label={`Personal letter for ${recipientName} from ${senderName}, tap the gold seal to open`}
        className="group relative w-full h-48 sm:h-56 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400 rounded-2xl cursor-pointer"
      >
        {/* ENVELOPE BACK BASE */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#2D124D] via-[#220B3B] to-[#160626] border border-brand-pink-400/40 shadow-dramatic overflow-hidden">
          {/* Subtle textured grid/stars */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#F472B6_1px,transparent_1px)] [background-size:14px_14px]" />
        </div>

        {/* LETTER SHEET INSIDE (EMERGES WHEN OPENED) */}
        <motion.div
          initial={{ y: 0, opacity: 0.9 }}
          animate={
            isOpened
              ? { y: -80, scale: 1.05, opacity: 1 }
              : { y: 0, scale: 0.98, opacity: 0.9 }
          }
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-4 top-2 h-40 sm:h-48 rounded-xl bg-gradient-to-b from-[#FFFDF9] to-[#FEF3C7] shadow-xl border border-brand-gold-300/80 p-3.5 flex flex-col justify-between text-neutral-800 z-10"
        >
          <div className="flex items-center justify-between border-b border-brand-gold-300/40 pb-1.5">
            <span className="text-[11px] font-bold font-display uppercase tracking-wider text-brand-purple-900">
              Personal Letter
            </span>
            <span className="text-xs text-brand-pink-500">💌</span>
          </div>

          <div className="space-y-1.5 my-auto text-left">
            <div className="w-3/4 h-2 bg-neutral-300/80 rounded-full" />
            <div className="w-full h-2 bg-neutral-300/60 rounded-full" />
            <div className="w-5/6 h-2 bg-neutral-300/60 rounded-full" />
          </div>

          <div className="text-right text-[11px] font-bold text-brand-purple-900 font-display">
            For {recipientName} ✨
          </div>
        </motion.div>

        {/* ENVELOPE FRONT POCKET (LEFT, RIGHT, BOTTOM FLAPS) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <svg
            viewBox="0 0 340 200"
            className="w-full h-full filter drop-shadow-[0_-3px_8px_rgba(0,0,0,0.4)]"
          >
            <defs>
              <linearGradient id="pocketGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3E1766" />
                <stop offset="100%" stopColor="#1E0933" />
              </linearGradient>
            </defs>
            {/* Left triangle flap */}
            <polygon points="0,0 170,120 0,200" fill="url(#pocketGrad)" opacity="0.96" />
            {/* Right triangle flap */}
            <polygon points="340,0 170,120 340,200" fill="url(#pocketGrad)" opacity="0.96" />
            {/* Bottom triangle flap */}
            <polygon points="0,200 170,105 340,200" fill="#250C3D" stroke="rgba(244,114,182,0.35)" strokeWidth="1" />
          </svg>
        </div>

        {/* TOP FLAP WITH WAX SEAL */}
        <motion.div
          animate={
            isOpened
              ? { rotateX: -160, transformOrigin: 'top' }
              : { rotateX: 0, transformOrigin: 'top' }
          }
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.55, ease: 'easeInOut' }}
          className="absolute inset-x-0 top-0 h-28 z-30 pointer-events-none"
        >
          <svg viewBox="0 0 340 120" className="w-full h-full filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
            <defs>
              <linearGradient id="topFlapGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4A1D6D" />
                <stop offset="100%" stopColor="#2D124D" />
              </linearGradient>
            </defs>
            <polygon points="0,0 170,110 340,0" fill="url(#topFlapGrad)" stroke="rgba(244,114,182,0.45)" strokeWidth="1.5" />
          </svg>

          {/* Golden Wax Seal */}
          <div className="absolute top-[85px] sm:top-[92px] left-1/2 -translate-x-1/2 pointer-events-auto">
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-brand-gold-300 to-amber-100 border-2 border-amber-200 flex items-center justify-center shadow-glow-gold text-brand-purple-950 font-bold"
            >
              <Heart className="w-5 h-5 fill-brand-purple-950 text-brand-purple-950" />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Sparkles around seal */}
        <div className="absolute -top-2 -right-2 z-40">
          <Sparkles className="w-5 h-5 text-brand-gold-300 animate-pulse" />
        </div>
      </button>

      <span className="text-xs font-semibold text-brand-gold-300/90 mt-4 tracking-wide flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-brand-gold-300" />
        <span>Tap the golden wax seal to open your letter</span>
      </span>
    </div>
  );
}
