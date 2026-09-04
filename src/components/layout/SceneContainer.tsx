import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface SceneContainerProps {
  children: ReactNode;
  className?: string;
}

export function SceneContainer({ children, className }: SceneContainerProps) {
  return (
    <main
      className={cn(
        'w-full min-h-[100dvh] flex flex-col justify-center items-center relative overflow-hidden safe-area-inset',
        className
      )}
    >
      {children}
    </main>
  );
}
