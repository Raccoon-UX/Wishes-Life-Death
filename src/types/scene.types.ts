/**
 * Scene Identification & Navigation Types
 */

export const SCENE_IDS = {
  INTRO: 'intro',
  REVEAL: 'reveal',
  CAKE: 'cake',
  BALLOON: 'balloon',
  MESSAGE: 'message',
  MEMORY: 'memory',
  LETTER: 'letter',
  CELEBRATION: 'celebration',
} as const;

export type SceneId = (typeof SCENE_IDS)[keyof typeof SCENE_IDS];

export type SceneDirection = 'forward' | 'backward';

export interface SceneMetadata {
  id: SceneId;
  title: string;
  subtitle: string;
  order: number;
  description: string;
}

export interface SceneProps {
  sceneId: SceneId;
  metadata: SceneMetadata;
  isCurrent: boolean;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
}
