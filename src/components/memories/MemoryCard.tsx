'use client';

import React from 'react';
import { MemoryItem } from '@/types/config.types';
import { Camera, Calendar, Sparkles } from 'lucide-react';

export interface MemoryCardProps {
  item: MemoryItem;
  index: number;
  totalCount: number;
}

export function MemoryCard({ item, index, totalCount }: MemoryCardProps) {
  // Artistic themes for memory photo card
  const photoThemes = [
    'from-rose-500/80 via-purple-600/70 to-indigo-700/80',
    'from-amber-400/80 via-pink-500/70 to-purple-700/80',
    'from-violet-500/80 via-fuchsia-500/70 to-pink-600/80',
  ][index % 3];

  return (
    <div className="w-full max-w-sm mx-auto bg-[#FFFDF9] text-neutral-900 rounded-2xl p-4 sm:p-5 shadow-dramatic relative select-none transform-gpu rotate-[-1deg] transition-all duration-300 hover:rotate-0">
      
      {/* Washi Tape Decor on Top */}
      <div
        aria-hidden="true"
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-200/80 border border-amber-300/60 rounded-sm rotate-[-2deg] shadow-sm backdrop-blur-[1px] pointer-events-none"
      />

      {/* POLAROID PHOTO FRAME */}
      <div className="w-full h-48 sm:h-56 rounded-xl bg-neutral-950 overflow-hidden relative mb-4 border border-neutral-200/80 flex items-center justify-center p-3 shadow-inner">
        <div className={`absolute inset-0 bg-gradient-to-tr ${photoThemes}`} />

        {/* Ambient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

        {/* Center Photo Badge / Content */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-center text-white p-2">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg">
            <Camera className="w-6 h-6 text-amber-300" />
          </div>
          <span className="text-sm font-display font-bold text-white tracking-wide drop-shadow-md">
            {item.title}
          </span>
        </div>

        {/* Top-right sparkle */}
        <div className="absolute top-3 right-3 text-amber-300">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* POLAROID HANDWRITTEN CAPTION */}
      <div className="space-y-2 text-left px-1">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-300">
            <Calendar className="w-3 h-3 text-amber-600" />
            <span>{item.yearOrTag}</span>
          </span>

          <span className="text-xs font-handwriting text-neutral-500 font-bold">
            Chapter {index + 1} of {totalCount}
          </span>
        </div>

        <p className="font-handwriting text-xl sm:text-2xl text-neutral-800 leading-snug pt-1">
          {item.description}
        </p>
      </div>
    </div>
  );
}
