import React from 'react';
import { cn } from '@/lib/utils';

export interface GlowOrbProps {
  color?: 'pink' | 'rose' | 'lavender' | 'gold' | 'cream' | 'violet';
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
    pink: 'bg-[#F8B4C8]',
    rose: 'bg-[#E86A92]',
    lavender: 'bg-[#E8DDF5]',
    violet: 'bg-[#DDD6FE]',
    gold: 'bg-[#D9A441]',
    cream: 'bg-[#FFF9F5]',
  }[color];

  const intensityOpacities = {
    soft: 'opacity-45 blur-[80px]',
    medium: 'opacity-60 blur-[100px]',
    strong: 'opacity-75 blur-[120px]',
  }[intensity];

  const sizeStyles = {
    sm: 'w-48 h-48 sm:w-60 sm:h-60',
    md: 'w-64 h-64 sm:w-80 sm:h-80',
    lg: 'w-80 h-80 sm:w-96 sm:h-96',
    xl: 'w-96 h-96 sm:w-[500px] sm:h-[500px]',
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
        'absolute rounded-full pointer-events-none select-none z-0 transform-gpu',
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
