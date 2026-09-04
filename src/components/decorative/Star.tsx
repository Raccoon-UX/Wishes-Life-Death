import React from 'react';
import { cn } from '@/lib/utils';

export interface StarProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'gold' | 'pink' | 'white';
  className?: string;
}

export function Star({
  size = 'md',
  color = 'gold',
  className,
}: StarProps) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];

  const colorMap = {
    gold: 'text-brand-gold-300 fill-brand-gold-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]',
    pink: 'text-brand-pink-300 fill-brand-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.6)]',
    white: 'text-brand-white-pure fill-brand-white-pure drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]',
  }[color];

  return (
    <span aria-hidden="true" className={cn('inline-block select-none', className)}>
      <svg
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        className={cn(sizeMap, colorMap)}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </span>
  );
}
