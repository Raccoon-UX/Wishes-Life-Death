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
  // Artistic dreamy romantic themes for memory photo card
  const photoThemes = [
    'from-[#E86A92] via-[#F8B4C8] to-[#E8DDF5]',
    'from-[#D9A441] via-[#E86A92] to-[#FCE4EC]',
    'from-[#B83B68] via-[#E86A92] to-[#D9A441]',
  ][index % 3];

  return (
    <div className="w-full max-w-sm mx-auto bg-[#FFFDF9] text-[#3B0D1E] rounded-2xl p-4 sm:p-5 shadow-romantic border border-[#F8B4C8]/40 relative select-none transform-gpu rotate-[-1deg] transition-all duration-300 hover:rotate-0">
      
      {/* Washi Tape Decor on Top */}
      <div
        aria-hidden="true"
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#F8B4C8]/85 border border-[#E86A92]/40 rounded-sm rotate-[-2deg] shadow-sm backdrop-blur-[1px] pointer-events-none"
      />

      {/* POLAROID PHOTO FRAME */}
      <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden relative mb-4 border border-[#F8B4C8]/30 flex items-center justify-center p-3 shadow-inner bg-gradient-to-tr">
        <div className={`absolute inset-0 bg-gradient-to-tr ${photoThemes} opacity-90`} />

        {/* Ambient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* Center Photo Badge / Content */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-center text-white p-2">
          <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center shadow-md">
            <Camera className="w-6 h-6 text-white drop-shadow" />
          </div>
          <span className="text-base font-display font-bold text-white tracking-wide drop-shadow-md">
            {item.title}
          </span>
        </div>

        {/* Top-right sparkle */}
        <div className="absolute top-3 right-3 text-[#D9A441] drop-shadow">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* POLAROID HANDWRITTEN CAPTION */}
      <div className="space-y-2 text-left px-1">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FCE4EC] text-[#8B2648] border border-[#F8B4C8]">
            <Calendar className="w-3 h-3 text-[#E86A92]" />
            <span>{item.yearOrTag}</span>
          </span>

          <span className="text-xs font-handwriting text-[#8B2648] font-bold">
            Chapter {index + 1} of {totalCount}
          </span>
        </div>

        <p className="font-handwriting text-xl sm:text-2xl text-[#3B0D1E] leading-snug pt-1">
          {item.description}
        </p>
      </div>
    </div>
  );
}
