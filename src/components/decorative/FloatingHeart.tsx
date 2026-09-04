import React from 'react';
import { cn } from '@/lib/utils';

export interface FloatingHeartProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'pink' | 'gold' | 'violet';
  delay?: string;
  className?: string;
}

export function FloatingHeart({
  size = 'md',
  color = 'pink',
  delay = '0s',
  className,
}: FloatingHeartProps) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }[size];

  const colorMap = {
    pink: 'text-brand-pink-400 fill-brand-pink-400/80 drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]',
    gold: 'text-brand-gold-400 fill-brand-gold-400/80 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]',
    violet: 'text-brand-violet-400 fill-brand-violet-400/80 drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]',
  }[color];

  return (
    <span
      aria-hidden="true"
      className={cn('inline-block animate-float-medium transform-gpu select-none', className)}
      style={{ animationDelay: delay }}
    >
      <svg
        viewBox="0 0 24 24"
        className={cn(sizeMap, colorMap)}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </span>
  );
}
