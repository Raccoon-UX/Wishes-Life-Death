import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  border?: 'subtle' | 'standard' | 'accent' | 'none';
  blur?: 'sm' | 'md' | 'lg';
}

export function GlassPanel({
  children,
  border = 'standard',
  blur = 'md',
  className,
  ...props
}: GlassPanelProps) {
  const borderStyles = {
    none: '',
    subtle: 'border border-brand-white-faint',
    standard: 'border border-brand-white-translucent',
    accent: 'border border-brand-pink-400/30 shadow-glow-pink-soft',
  }[border];

  const blurStyles = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-glass',
  }[blur];

  return (
    <div
      className={cn(
        'bg-brand-white-translucent rounded-xl p-4 text-brand-cream-50',
        blurStyles,
        borderStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
