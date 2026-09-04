'use client';

import React from 'react';
import { useExperience } from '@/hooks/useExperience';
import { useBirthdayConfig } from '@/context/ConfigContext';
import { HeaderControls } from './HeaderControls';
import { SceneContainer } from './SceneContainer';
import { SceneTransition } from '@/components/animations/SceneTransition';
import { SceneRegistry } from '@/components/scenes/SceneRegistry';
import { BackgroundLayer } from '@/components/backgrounds/BackgroundLayer';
import { AudioController } from '@/components/audio/AudioController';

export function ExperienceShell() {
  const { state } = useExperience();
  const config = useBirthdayConfig();

  return (
    <SceneContainer className="text-brand-cream-50 relative selection:bg-brand-pink-500 selection:text-white">
      {/* Cinematic Dynamic Background Ambient Layers */}
      <BackgroundLayer theme={config.theme} />

      {/* Audio Controller System */}
      <AudioController />

      {/* Floating Minimalist Controls (Top-Right Sound & Replay) */}
      <HeaderControls />

      {/* Full-Viewport Immersive Scene Stage */}
      <div className="relative z-10 w-full h-full min-h-[100dvh] flex flex-col justify-center items-center">
        <SceneTransition
          currentScene={state.currentScene}
          direction={state.direction}
        >
          <SceneRegistry currentScene={state.currentScene} />
        </SceneTransition>
      </div>
    </SceneContainer>
  );
}
