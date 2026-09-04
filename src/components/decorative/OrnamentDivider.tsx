import React from 'react';
import { Sparkle } from './Sparkle';
import { FloatingHeart } from './FloatingHeart';
import { cn } from '@/lib/utils';

export interface OrnamentDividerProps {
  symbol?: 'sparkle' | 'heart' | 'dot';
  className?: string;
}

export function OrnamentDivider({
  symbol = 'sparkle',
  className,
}: OrnamentDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('w-full flex items-center justify-center gap-3 my-3 select-none', className)}
    >
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-brand-white-translucent to-brand-pink-400/40" />
      <span className="flex-shrink-0">
        {symbol === 'sparkle' && <Sparkle size="sm" color="gold" />}
        {symbol === 'heart' && <FloatingHeart size="sm" color="pink" />}
        {symbol === 'dot' && <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 shadow-glow-gold-soft" />}
      </span>
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-brand-white-translucent to-brand-pink-400/40" />
    </div>
  );
}
