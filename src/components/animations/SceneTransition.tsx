'use client';

import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SceneId, SceneDirection } from '@/types/scene.types';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  sceneTransitionVariants,
  reducedMotionSceneVariants,
} from '@/lib/animation-variants';

export interface SceneTransitionProps {
  children: ReactNode;
  currentScene: SceneId;
  direction: SceneDirection;
}

export function SceneTransition({
  children,
  currentScene,
  direction,
}: SceneTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full flex-1 flex flex-col overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentScene}
          custom={direction}
          variants={
            prefersReducedMotion
              ? reducedMotionSceneVariants
              : sceneTransitionVariants
          }
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full flex-1 flex flex-col justify-center items-center"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
