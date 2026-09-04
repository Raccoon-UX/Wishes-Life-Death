import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: 'h2' | 'h3' | 'h4';
  icon?: React.ReactNode;
}

export function SectionHeading({
  children,
  as: Heading = 'h2',
  icon,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-2">
      {icon && <span className="text-brand-gold-300">{icon}</span>}
      <Heading
        className={cn(
          'text-lg sm:text-xl font-bold font-display text-brand-cream-50 tracking-tight',
          className
        )}
        {...props}
      >
        {children}
      </Heading>
    </div>
  );
}
