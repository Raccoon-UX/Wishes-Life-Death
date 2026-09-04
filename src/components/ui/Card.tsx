'use client';

import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'romantic' | 'goldGlow';
  glow?: 'none' | 'soft' | 'medium' | 'strong' | 'pink' | 'gold' | 'violet';
  hoverable?: boolean;
  padded?: boolean;
}

export function Card({
  className,
  variant = 'romantic',
  glow = 'none',
  hoverable = false,
  padded = true,
  children,
  ...props
}: CardProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    default:
      'bg-brand-purple-900/60 backdrop-blur-md border border-brand-white-translucent text-brand-cream-50 shadow-card',
    glass:
      'bg-brand-white-translucent backdrop-blur-glass border border-brand-white-glow text-brand-cream-50 shadow-glass',
    elevated:
      'bg-brand-purple-800/80 backdrop-blur-md border border-brand-purple-600/50 text-brand-cream-50 shadow-elevated',
    romantic: 'glass-card-romantic text-brand-cream-50',
    goldGlow: 'glass-card-gold text-brand-cream-50',
  };

  const glowStyles = {
    none: '',
    soft: 'shadow-glow-pink-soft',
    medium: 'shadow-glow-pink',
    strong: 'shadow-glow-pink-strong',
    pink: 'shadow-glow-pink',
    gold: 'shadow-glow-gold',
    violet: 'shadow-glow-violet',
  }[glow];

  const content = (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300 relative overflow-hidden',
        variants[variant],
        glowStyles,
        padded && 'p-5 sm:p-6 md:p-8',
        hoverable && !prefersReducedMotion && 'hover:-translate-y-1 hover:shadow-dramatic',
        className
      )}
      {...props}
    >
      {/* Subtle top-edge light reflection */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-white-glow to-transparent pointer-events-none"
      />
      {children}
    </div>
  );

  return content;
}
