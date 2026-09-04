import React from 'react';
import { cn } from '@/lib/utils';

export interface DecorativeBlobProps {
  className?: string;
  variant?: 'pink' | 'violet' | 'gold';
}

export function DecorativeBlob({
  className,
  variant = 'pink',
}: DecorativeBlobProps) {
  const gradientFills = {
    pink: 'from-brand-pink-400/20 via-brand-pink-500/10 to-transparent',
    violet: 'from-brand-violet-500/20 via-brand-purple-700/10 to-transparent',
    gold: 'from-brand-gold-400/20 via-brand-gold-600/10 to-transparent',
  }[variant];

  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute rounded-full bg-gradient-to-br blur-3xl pointer-events-none opacity-40 animate-float-slow',
        gradientFills,
        className
      )}
    />
  );
}
