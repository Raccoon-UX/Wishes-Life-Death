import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format scene index into accessible label
 */
export function formatSceneProgress(currentIndex: number, totalScenes: number): string {
  return `Scene ${currentIndex + 1} of ${totalScenes}`;
}
