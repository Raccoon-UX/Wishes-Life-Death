import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SceneTitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  badge?: string;
  as?: 'h1' | 'h2' | 'h3';
  variant?: 'romantic' | 'gold' | 'white';
  align?: 'center' | 'left' | 'right';
}

export function SceneTitle({
  title,
  subtitle,
  badge,
  as: HeadingTag = 'h1',
  variant = 'romantic',
  align = 'center',
  className,
  ...props
}: SceneTitleProps) {
  const alignmentClass = {
    center: 'text-center items-center',
    left: 'text-left items-start',
    right: 'text-right items-end',
  }[align];

  const variantGradients = {
    romantic: 'text-gradient-romantic drop-shadow-[0_2px_15px_rgba(244,114,182,0.3)]',
    gold: 'text-gradient-gold drop-shadow-[0_2px_15px_rgba(245,158,11,0.3)]',
    white: 'text-brand-cream-50',
  };

  return (
    <div
      className={cn('flex flex-col gap-2 select-none', alignmentClass, className)}
      {...props}
    >
      {badge && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-brand-pink-400/15 text-brand-pink-300 border border-brand-pink-400/25 shadow-glow-pink-soft">
          {badge}
        </span>
      )}

      <HeadingTag
        className={cn(
          'text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight leading-tight',
          variantGradients[variant]
        )}
      >
        {title}
      </HeadingTag>

      {subtitle && (
        <p className="text-xs sm:text-sm md:text-base text-brand-cream-200/80 font-sans max-w-sm sm:max-w-md">
          {subtitle}
        </p>
      )}
    </div>
  );
}
