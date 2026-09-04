'use client';

import React, { createContext, useReducer, useMemo, ReactNode } from 'react';
import { SceneId } from '@/types/scene.types';
import {
  ExperienceState,
  ExperienceAction,
  ExperienceContextValue,
  InteractionFlags,
} from '@/types/experience.types';
import { SCENE_ORDER } from '@/config/scenes.config';

const initialInteractionFlags: InteractionFlags = {
  isIntroComplete: false,
  isCakeInteracted: false,
  balloonsPoppedCount: 0,
  isLetterOpened: false,
  isExperienceComplete: false,
};

const initialCompletedScenes = SCENE_ORDER.reduce<Record<SceneId, boolean>>(
  (acc, id) => {
    acc[id] = false;
    return acc;
  },
  {} as Record<SceneId, boolean>
);

const initialState: ExperienceState = {
  currentScene: SCENE_ORDER[0],
  currentSceneIndex: 0,
  direction: 'forward',
  isMuted: false,
  isMusicPlaying: false,
  completedScenes: initialCompletedScenes,
  interactionFlags: initialInteractionFlags,
};

function experienceReducer(
  state: ExperienceState,
  action: ExperienceAction
): ExperienceState {
  switch (action.type) {
    case 'NEXT_SCENE': {
      const nextIndex = state.currentSceneIndex + 1;
      if (nextIndex >= SCENE_ORDER.length) {
        return state;
      }
      const nextScene = SCENE_ORDER[nextIndex];
      return {
        ...state,
        currentScene: nextScene,
        currentSceneIndex: nextIndex,
        direction: 'forward',
      };
    }

    case 'PREVIOUS_SCENE': {
      const prevIndex = state.currentSceneIndex - 1;
      if (prevIndex < 0) {
        return state;
      }
      const prevScene = SCENE_ORDER[prevIndex];
      return {
        ...state,
        currentScene: prevScene,
        currentSceneIndex: prevIndex,
        direction: 'backward',
      };
    }

    case 'GO_TO_SCENE': {
      const targetIndex = SCENE_ORDER.indexOf(action.payload);
      if (targetIndex === -1 || targetIndex === state.currentSceneIndex) {
        return state;
      }
      return {
        ...state,
        currentScene: action.payload,
        currentSceneIndex: targetIndex,
        direction: targetIndex > state.currentSceneIndex ? 'forward' : 'backward',
      };
    }

    case 'COMPLETE_SCENE': {
      return {
        ...state,
        completedScenes: {
          ...state.completedScenes,
          [action.payload]: true,
        },
      };
    }

    case 'TOGGLE_SOUND': {
      return {
        ...state,
        isMuted: !state.isMuted,
      };
    }

    case 'SET_MUTED': {
      return {
        ...state,
        isMuted: action.payload,
      };
    }

    case 'SET_MUSIC_PLAYING': {
      return {
        ...state,
        isMusicPlaying: action.payload,
      };
    }

    case 'SET_INTERACTION_FLAG': {
      return {
        ...state,
        interactionFlags: {
          ...state.interactionFlags,
          [action.payload.key]: action.payload.value,
        },
      };
    }

    case 'REPLAY_EXPERIENCE':
    case 'RESET_EXPERIENCE': {
      return {
        ...initialState,
        isMuted: state.isMuted, // Preserve user mute preference
      };
    }

    default:
      return state;
  }
}

export const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export interface ExperienceProviderProps {
  children: ReactNode;
  initialScene?: SceneId;
}

export function ExperienceProvider({
  children,
  initialScene,
}: ExperienceProviderProps) {
  const [state, dispatch] = useReducer(
    experienceReducer,
    initialState,
    (baseState) => {
      if (initialScene && SCENE_ORDER.includes(initialScene)) {
        const index = SCENE_ORDER.indexOf(initialScene);
        return {
          ...baseState,
          currentScene: initialScene,
          currentSceneIndex: index,
        };
      }
      return baseState;
    }
  );

  const totalScenes = SCENE_ORDER.length;
  const canGoNext = state.currentSceneIndex < totalScenes - 1;
  const canGoPrev = state.currentSceneIndex > 0;
  const progressPercentage = Math.round(
    ((state.currentSceneIndex + 1) / totalScenes) * 100
  );

  const nextScene = () => dispatch({ type: 'NEXT_SCENE' });
  const prevScene = () => dispatch({ type: 'PREVIOUS_SCENE' });
  const goToScene = (sceneId: SceneId) =>
    dispatch({ type: 'GO_TO_SCENE', payload: sceneId });
  const completeScene = (sceneId: SceneId) =>
    dispatch({ type: 'COMPLETE_SCENE', payload: sceneId });
  const toggleSound = () => dispatch({ type: 'TOGGLE_SOUND' });
  const setInteractionFlag = <K extends keyof InteractionFlags>(
    key: K,
    value: InteractionFlags[K]
  ) => {
    dispatch({ type: 'SET_INTERACTION_FLAG', payload: { key, value } });
  };
  const replayExperience = () => dispatch({ type: 'REPLAY_EXPERIENCE' });
  const resetExperience = () => dispatch({ type: 'RESET_EXPERIENCE' });

  const value = useMemo<ExperienceContextValue>(
    () => ({
      state,
      dispatch,
      nextScene,
      prevScene,
      goToScene,
      completeScene,
      toggleSound,
      setInteractionFlag,
      replayExperience,
      resetExperience,
      canGoNext,
      canGoPrev,
      progressPercentage,
      totalScenes,
    }),
    [
      state,
      canGoNext,
      canGoPrev,
      progressPercentage,
      totalScenes,
    ]
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}
