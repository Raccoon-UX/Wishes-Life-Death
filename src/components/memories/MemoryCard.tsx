'use client';

import React from 'react';
import { MemoryItem } from '@/types/config.types';
import { cn } from '@/lib/utils';
import { Sparkle } from '@/components/decorative/Sparkle';
import { Camera, Calendar } from 'lucide-react';

export interface MemoryCardProps {
  item: MemoryItem;
  index: number;
  onSelect?: (item: MemoryItem) => void;
}

export function MemoryCard({ item, index, onSelect }: MemoryCardProps) {
  const isEven = index % 2 === 0;

  // Curated artistic gradient themes for memory placeholder photos
  const photoThemes = [
    'from-rose-500/80 via-purple-600/70 to-indigo-700/80',
    'from-amber-400/80 via-pink-500/70 to-purple-700/80',
    'from-violet-500/80 via-fuchsia-500/70 to-pink-600/80',
  ][index % 3];

  return (
    <div
      className={cn(
        'w-full bg-brand-purple-950/80 rounded-2xl p-4 sm:p-5 border border-brand-white-translucent backdrop-blur-md shadow-card transition-all duration-300 hover:shadow-glow-pink-soft hover:border-brand-pink-400/40 relative group cursor-pointer',
        isEven ? 'sm:rotate-[-0.75deg]' : 'sm:rotate-[0.75deg]'
      )}
      onClick={() => onSelect?.(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(item);
        }
      }}
      aria-label={`Memory ${index + 1}: ${item.title}. Tap to view.`}
    >
      {/* Top corner paper tape / decorative highlight */}
      <div
        aria-hidden="true"
        className="absolute -top-2 left-6 w-12 h-3.5 bg-brand-white-glow rounded-sm -rotate-2 pointer-events-none opacity-60"
      />

      {/* POLAROID-STYLE PHOTO FRAME */}
      <div className="w-full h-36 sm:h-44 rounded-xl bg-gradient-to-tr overflow-hidden relative mb-3 border border-white/10 flex items-center justify-center p-2 shadow-inner">
        <div className={cn('absolute inset-0 bg-gradient-to-tr', photoThemes)} />

        {/* Ambient shimmer & vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Decorative Photo Illustration Badge */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-1.5 text-center text-white p-2 select-none">
          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-md">
            <Camera className="w-4 h-4 text-brand-gold-300" />
          </div>
          <span className="text-[11px] font-semibold text-brand-cream-100/90 tracking-wide drop-shadow-sm">
            {item.title}
          </span>
        </div>

        {/* Top-right sparkle */}
        <div className="absolute top-2 right-2">
          <Sparkle size="sm" color="gold" />
        </div>
      </div>

      {/* MEMORY DETAILS */}
      <div className="space-y-1.5 text-left">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-brand-gold-400/20 text-brand-gold-300 border border-brand-gold-400/30">
            <Calendar className="w-3 h-3" />
            <span>{item.yearOrTag}</span>
          </span>
          <span className="text-[10px] text-brand-pink-300/80 font-medium">
            Tap to expand ??
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-bold font-display text-brand-cream-50 leading-snug">
          {item.title}
        </h3>

        <p className="text-xs text-brand-cream-200/80 font-sans leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </div>
    </div>
  );
}
