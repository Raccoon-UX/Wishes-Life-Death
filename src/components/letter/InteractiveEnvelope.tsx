'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Sparkle } from '@/components/decorative/Sparkle';
import { Heart } from 'lucide-react';

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
    <div className="relative w-full max-w-[300px] sm:max-w-[340px] mx-auto flex flex-col items-center select-none py-4">
      {/* Interactive Envelope Container Button */}
      <button
        type="button"
        onClick={onOpen}
        disabled={isOpened}
        aria-expanded={isOpened}
        aria-label={`Personal letter for ${recipientName} from ${senderName}, tap to open`}
        className="group relative w-full h-44 sm:h-52 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-purple-950 rounded-2xl cursor-pointer"
      >
        {/* ENVELOPE BACK BASE */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#2A0F45] to-[#160626] border border-brand-pink-400/40 shadow-dramatic overflow-hidden">
          {/* Inner lining pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#F472B6_1px,transparent_1px)] [background-size:12px_12px]" />
        </div>

        {/* LETTER SHEET INSIDE (EMERGES WHEN OPENED) */}
        <motion.div
          initial={{ y: 0, opacity: 0.9 }}
          animate={
            isOpened
              ? { y: -70, scale: 1.05, opacity: 1 }
              : { y: 0, scale: 0.98, opacity: 0.9 }
          }
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-4 top-2 h-36 sm:h-44 rounded-xl bg-gradient-to-b from-[#FFFDF9] to-[#FEF3C7] shadow-lg border border-brand-gold-300/60 p-3 flex flex-col justify-between text-neutral-800 z-10"
        >
          <div className="flex items-center justify-between border-b border-brand-gold-300/40 pb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-purple-900">
              Personal Letter
            </span>
            <span className="text-xs text-brand-pink-500">??</span>
          </div>

          <div className="space-y-1 my-auto text-left">
            <div className="w-2/3 h-1.5 bg-neutral-300/70 rounded-full" />
            <div className="w-full h-1.5 bg-neutral-300/50 rounded-full" />
            <div className="w-4/5 h-1.5 bg-neutral-300/50 rounded-full" />
          </div>

          <div className="text-right text-[10px] font-bold text-brand-purple-900 font-display">
            For {recipientName} ??
          </div>
        </motion.div>

        {/* ENVELOPE FRONT POCKET (LEFT, RIGHT, BOTTOM FLAPS) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Left / Right Pocket Triangles */}
          <svg
            viewBox="0 0 340 200"
            className="w-full h-full filter drop-shadow-[0_-2px_6px_rgba(0,0,0,0.3)]"
          >
            <defs>
              <linearGradient id="pocketGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3B1560" />
                <stop offset="100%" stopColor="#1C0930" />
              </linearGradient>
            </defs>
            {/* Left triangle */}
            <polygon points="0,0 170,120 0,200" fill="url(#pocketGrad)" opacity="0.95" />
            {/* Right triangle */}
            <polygon points="340,0 170,120 340,200" fill="url(#pocketGrad)" opacity="0.95" />
            {/* Bottom triangle */}
            <polygon points="0,200 170,105 340,200" fill="#250C3D" stroke="rgba(244,114,182,0.3)" strokeWidth="1" />
          </svg>
        </div>

        {/* TOP FLAP WITH WAX SEAL */}
        <motion.div
          animate={
            isOpened
              ? { rotateX: -160, transformOrigin: 'top' }
              : { rotateX: 0, transformOrigin: 'top' }
          }
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.5, ease: 'easeInOut' }}
          className="absolute inset-x-0 top-0 h-24 sm:h-28 z-30 pointer-events-none"
        >
          <svg viewBox="0 0 340 120" className="w-full h-full filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            <defs>
              <linearGradient id="topFlapGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4A1D6D" />
                <stop offset="100%" stopColor="#2D124D" />
              </linearGradient>
            </defs>
            <polygon points="0,0 170,110 340,0" fill="url(#topFlapGrad)" stroke="rgba(244,114,182,0.4)" strokeWidth="1.5" />
          </svg>

          {/* Golden Wax Seal */}
          <div className="absolute top-[80px] sm:top-[90px] left-1/2 -translate-x-1/2 pointer-events-auto">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full bg-gradient-to-tr from-brand-gold-500 via-brand-gold-300 to-amber-200 border-2 border-brand-gold-200 flex items-center justify-center shadow-glow-gold text-brand-purple-950 font-bold"
            >
              <Heart className="w-5 h-5 fill-brand-purple-950" />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Sparkles around seal */}
        <div className="absolute -top-1 -right-1 z-40">
          <Sparkle size="sm" color="gold" delay="0.4s" />
        </div>
      </button>

      <span className="text-[11px] font-semibold text-brand-pink-300/80 mt-3 tracking-wide flex items-center gap-1.5">
        <span>? Tap the wax seal to open your letter ?</span>
      </span>
    </div>
  );
}
