/**
 * Experience State and Action Types
 * Powers the central experience state container and navigation reducer.
 */

import { SceneId, SceneDirection } from './scene.types';

export interface InteractionFlags {
  isIntroComplete: boolean;
  isCakeInteracted: boolean;
  balloonsPoppedCount: number;
  isLetterOpened: boolean;
  isExperienceComplete: boolean;
}

export interface ExperienceState {
  currentScene: SceneId;
  currentSceneIndex: number;
  direction: SceneDirection;
  isMuted: boolean;
  isMusicPlaying: boolean;
  completedScenes: Record<SceneId, boolean>;
  interactionFlags: InteractionFlags;
}

export type ExperienceAction =
  | { type: 'NEXT_SCENE' }
  | { type: 'PREVIOUS_SCENE' }
  | { type: 'GO_TO_SCENE'; payload: SceneId }
  | { type: 'COMPLETE_SCENE'; payload: SceneId }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'SET_MUTED'; payload: boolean }
  | { type: 'SET_MUSIC_PLAYING'; payload: boolean }
  | {
      type: 'SET_INTERACTION_FLAG';
      payload: {
        key: keyof InteractionFlags;
        value: boolean | number;
      };
    }
  | { type: 'REPLAY_EXPERIENCE' }
  | { type: 'RESET_EXPERIENCE' };

export interface ExperienceContextValue {
  state: ExperienceState;
  dispatch: React.Dispatch<ExperienceAction>;
  nextScene: () => void;
  prevScene: () => void;
  goToScene: (sceneId: SceneId) => void;
  completeScene: (sceneId: SceneId) => void;
  toggleSound: () => void;
  setInteractionFlag: <K extends keyof InteractionFlags>(
    key: K,
    value: InteractionFlags[K]
  ) => void;
  replayExperience: () => void;
  resetExperience: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  progressPercentage: number;
  totalScenes: number;
}
