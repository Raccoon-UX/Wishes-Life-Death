'use client';

import React from 'react';
import { SceneId, SCENE_IDS } from '@/types/scene.types';
import { IntroScene } from './IntroScene';
import { RevealScene } from './RevealScene';
import { CakeScene } from './CakeScene';
import { BalloonScene } from './BalloonScene';
import { MessageScene } from './MessageScene';
import { MemoryScene } from './MemoryScene';
import { LetterScene } from './LetterScene';
import { CelebrationScene } from './CelebrationScene';

export interface SceneRegistryProps {
  currentScene: SceneId;
}

const SCENE_COMPONENTS: Record<SceneId, React.ComponentType> = {
  [SCENE_IDS.INTRO]: IntroScene,
  [SCENE_IDS.REVEAL]: RevealScene,
  [SCENE_IDS.CAKE]: CakeScene,
  [SCENE_IDS.BALLOON]: BalloonScene,
  [SCENE_IDS.MESSAGE]: MessageScene,
  [SCENE_IDS.MEMORY]: MemoryScene,
  [SCENE_IDS.LETTER]: LetterScene,
  [SCENE_IDS.CELEBRATION]: CelebrationScene,
};

export function SceneRegistry({ currentScene }: SceneRegistryProps) {
  const SceneComponent = SCENE_COMPONENTS[currentScene] || IntroScene;
  return <SceneComponent />;
}
