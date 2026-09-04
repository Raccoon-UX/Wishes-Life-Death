import { Variants } from 'framer-motion';

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export const sceneTransitionVariants: Variants = {
  enter: (direction: 'forward' | 'backward') => ({
    y: direction === 'forward' ? 24 : -24,
    opacity: 0,
    scale: 0.97,
    filter: 'blur(4px)',
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: 'forward' | 'backward') => ({
    y: direction === 'forward' ? -20 : 20,
    opacity: 0,
    scale: 0.97,
    filter: 'blur(4px)',
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const reducedMotionSceneVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
