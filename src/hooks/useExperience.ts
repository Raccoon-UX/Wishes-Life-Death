'use client';

import { useContext } from 'react';
import { ExperienceContext } from '@/context/ExperienceContext';
import { ExperienceContextValue } from '@/types/experience.types';

export function useExperience(): ExperienceContextValue {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within an <ExperienceProvider>');
  }
  return context;
}
