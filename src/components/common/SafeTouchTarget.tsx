import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface SafeTouchTargetProps {
  children: ReactNode;
  className?: string;
  minSizePx?: number;
}

export function SafeTouchTarget({
  children,
  className,
}: SafeTouchTargetProps) {
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center min-w-[44px] min-h-[44px]',
        className
      )}
    >
      {children}
    </div>
  );
}
