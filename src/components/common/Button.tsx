'use client';

import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon' | 'gold' | 'romantic';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {

    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-purple-950 disabled:opacity-50 disabled:pointer-events-none select-none relative overflow-hidden active:scale-[0.98]';

    const variants = {
      primary:
        'bg-gradient-to-r from-brand-pink-400 via-brand-pink-500 to-brand-violet-500 text-brand-white-pure hover:from-brand-pink-500 hover:to-brand-violet-600 shadow-glow-pink font-semibold border border-brand-white-translucent/30',
      romantic:
        'bg-gradient-to-r from-brand-pink-400 to-brand-pink-600 text-brand-white-pure hover:brightness-110 shadow-glow-pink-strong font-semibold border border-brand-pink-300/40',
      secondary:
        'bg-brand-white-translucent text-brand-cream-100 hover:bg-brand-white-glow border border-brand-white-translucent backdrop-blur-sm shadow-subtle',
      ghost:
        'bg-transparent text-brand-cream-200 hover:bg-brand-white-translucent hover:text-brand-white-pure',
      icon:
        'bg-brand-white-translucent text-brand-cream-100 hover:bg-brand-white-glow border border-brand-white-translucent rounded-full shadow-subtle',
      gold:
        'bg-gradient-to-r from-brand-gold-300 via-brand-gold-400 to-brand-gold-500 text-brand-purple-950 font-bold hover:brightness-105 shadow-glow-gold border border-brand-gold-300/50',
    };

    const sizes = {
      sm: 'min-h-[44px] px-4 py-2 text-xs sm:text-sm gap-1.5',
      md: 'min-h-[48px] px-6 py-2.5 text-sm sm:text-base gap-2',
      lg: 'min-h-[52px] px-8 py-3 text-base sm:text-lg gap-2.5',
      icon: 'min-h-[44px] min-w-[44px] p-2.5',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
