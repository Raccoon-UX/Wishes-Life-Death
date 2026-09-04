import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export function Container({
  as: Component = 'div',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'w-full max-w-md mx-auto px-4 sm:px-6 md:max-w-lg lg:max-w-xl transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
