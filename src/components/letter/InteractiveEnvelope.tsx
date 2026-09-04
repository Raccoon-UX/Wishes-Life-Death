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
  recipientName = 'Meghna',
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
        className="group relative w-full h-48 sm:h-56 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] rounded-2xl cursor-pointer"
      >
        {/* ENVELOPE BACK BASE */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#FFF0F5] via-[#FCE4EC] to-[#F8B4C8] border border-[#E86A92]/40 shadow-romantic overflow-hidden">
          {/* Subtle textured grid/sparkles */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E86A92_1px,transparent_1px)] [background-size:14px_14px]" />
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
          className="absolute inset-x-4 top-2 h-40 sm:h-48 rounded-xl bg-gradient-to-b from-[#FFFDF9] to-[#FFF9F5] shadow-xl border border-[#D9A441]/60 p-3.5 flex flex-col justify-between text-[#3B0D1E] z-10"
        >
          <div className="flex items-center justify-between border-b border-[#D9A441]/30 pb-1.5">
            <span className="text-[11px] font-bold font-display uppercase tracking-wider text-[#3B0D1E]">
              Personal Letter
            </span>
            <span className="text-xs text-[#E86A92]">💌</span>
          </div>

          <div className="space-y-1.5 my-auto text-left">
            <div className="w-3/4 h-2 bg-[#F8B4C8]/50 rounded-full" />
            <div className="w-full h-2 bg-[#F8B4C8]/40 rounded-full" />
            <div className="w-5/6 h-2 bg-[#F8B4C8]/40 rounded-full" />
          </div>

          <div className="text-right text-[11px] font-bold text-[#8B2648] font-display">
            For {recipientName} ✨
          </div>
        </motion.div>

        {/* ENVELOPE FRONT POCKET (LEFT, RIGHT, BOTTOM FLAPS) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <svg
            viewBox="0 0 340 200"
            className="w-full h-full filter drop-shadow-[0_-2px_6px_rgba(232,106,146,0.25)]"
          >
            <defs>
              <linearGradient id="pocketGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F8B4C8" />
                <stop offset="100%" stopColor="#FCE4EC" />
              </linearGradient>
            </defs>
            {/* Left triangle flap */}
            <polygon points="0,0 170,120 0,200" fill="url(#pocketGrad)" opacity="0.98" />
            {/* Right triangle flap */}
            <polygon points="340,0 170,120 340,200" fill="url(#pocketGrad)" opacity="0.98" />
            {/* Bottom triangle flap */}
            <polygon points="0,200 170,105 340,200" fill="#FCE4EC" stroke="rgba(232,106,146,0.35)" strokeWidth="1" />
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
          <svg viewBox="0 0 340 120" className="w-full h-full filter drop-shadow-[0_4px_8px_rgba(232,106,146,0.3)]">
            <defs>
              <linearGradient id="topFlapGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F8B4C8" />
                <stop offset="100%" stopColor="#E86A92" />
              </linearGradient>
            </defs>
            <polygon points="0,0 170,110 340,0" fill="url(#topFlapGrad)" stroke="rgba(232,106,146,0.45)" strokeWidth="1.5" />
          </svg>

          {/* Golden Wax Seal */}
          <div className="absolute top-[85px] sm:top-[92px] left-1/2 -translate-x-1/2 pointer-events-auto">
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D9A441] via-[#F3CE72] to-[#FFF5DB] border-2 border-[#D9A441] flex items-center justify-center shadow-glow-gold text-[#3B0D1E] font-bold cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-[#3B0D1E] text-[#3B0D1E]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Sparkles around seal */}
        <div className="absolute -top-2 -right-2 z-40">
          <Sparkles className="w-5 h-5 text-[#D9A441] animate-pulse" />
        </div>
      </button>

      <span className="text-xs font-semibold text-[#8B2648] mt-4 tracking-wide flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
        <span>Tap the golden wax seal to open your letter</span>
      </span>
    </div>
  );
}
