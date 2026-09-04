import React from 'react';
import { cn } from '@/lib/utils';

export interface GlowOrbProps {
  color?: 'pink' | 'violet' | 'gold' | 'cream';
  intensity?: 'soft' | 'medium' | 'strong';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  pulse?: boolean;
  className?: string;
}

export function GlowOrb({
  color = 'pink',
  intensity = 'soft',
  size = 'md',
  position = 'center',
  pulse = false,
  className,
}: GlowOrbProps) {
  const colorStyles = {
    pink: 'bg-brand-pink-500',
    violet: 'bg-brand-violet-600',
    gold: 'bg-brand-gold-500',
    cream: 'bg-brand-cream-300',
  }[color];

  const intensityOpacities = {
    soft: 'opacity-15 blur-[80px]',
    medium: 'opacity-25 blur-[95px]',
    strong: 'opacity-35 blur-[110px]',
  }[intensity];

  const sizeStyles = {
    sm: 'w-48 h-48 sm:w-60 sm:h-60',
    md: 'w-64 h-64 sm:w-80 sm:h-80',
    lg: 'w-80 h-80 sm:w-96 sm:h-96',
    xl: 'w-96 h-96 sm:w-[480px] sm:h-[480px]',
  }[size];

  const positionStyles = {
    'top-left': '-top-20 -left-20 sm:-top-28 sm:-left-28',
    'top-right': '-top-20 -right-20 sm:-top-28 sm:-right-28',
    'bottom-left': '-bottom-20 -left-20 sm:-bottom-28 sm:-left-28',
    'bottom-right': '-bottom-20 -right-20 sm:-bottom-28 sm:-right-28',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  }[position];

  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute rounded-full pointer-events-none select-none z-0',
        colorStyles,
        intensityOpacities,
        sizeStyles,
        positionStyles,
        pulse && 'animate-pulse-subtle',
        className
      )}
    />
  );
}
