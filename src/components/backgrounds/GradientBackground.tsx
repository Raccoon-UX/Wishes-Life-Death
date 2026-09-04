import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface GradientBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'romantic' | 'deep' | 'celebration' | 'dreamy';
}

export function GradientBackground({
  variant = 'romantic',
  className,
  children,
  ...props
}: GradientBackgroundProps) {
  const variantStyles = {
    romantic: 'bg-gradient-to-b from-brand-purple-950 via-brand-purple-900 to-brand-purple-950',
    deep: 'bg-gradient-to-b from-[#0F061D] via-[#1A0B2E] to-[#0A0314]',
    celebration: 'bg-gradient-to-b from-[#1A0826] via-[#2C0D40] to-[#14061F]',
    dreamy: 'bg-gradient-to-b from-[#0B132B] via-[#1C2541] to-[#0B132B]',
  }[variant];

  return (
    <div
      className={cn('relative w-full h-full min-h-screen overflow-hidden', variantStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
}
