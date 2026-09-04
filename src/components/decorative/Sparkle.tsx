import React from 'react';
import { cn } from '@/lib/utils';

export interface SparkleProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'gold' | 'pink' | 'white';
  delay?: string;
  className?: string;
}

export function Sparkle({
  size = 'md',
  color = 'gold',
  delay = '0s',
  className,
}: SparkleProps) {
  const sizeMap = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  }[size];

  const colorMap = {
    gold: 'text-brand-gold-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]',
    pink: 'text-brand-pink-300 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]',
    white: 'text-brand-white-pure drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]',
  }[color];

  return (
    <span
      aria-hidden="true"
      className={cn('inline-block animate-twinkle transform-gpu select-none', className)}
      style={{ animationDelay: delay }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn(sizeMap, colorMap)}
      >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
    </span>
  );
}
