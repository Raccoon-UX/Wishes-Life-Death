'use client';

import React, { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface MotionWrapperProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

export function MotionWrapper({
  children,
  className,
  ...props
}: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
}
