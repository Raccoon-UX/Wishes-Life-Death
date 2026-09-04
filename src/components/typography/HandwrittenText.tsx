import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface HandwrittenTextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'pink' | 'cream';
}

export function HandwrittenText({
  children,
  size = 'md',
  variant = 'pink',
  className,
  ...props
}: HandwrittenTextProps) {
  const sizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  };

  const variants = {
    pink: 'text-brand-pink-300',
    gold: 'text-brand-gold-300',
    cream: 'text-brand-cream-100',
  };

  return (
    <p
      className={cn(
        'font-handwriting leading-relaxed tracking-wide',
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
