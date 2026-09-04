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
import Link from 'next/link';
import { Palette, Sliders } from 'lucide-react';

export function ExperienceShell() {
  const { state } = useExperience();
  const config = useBirthdayConfig();

  return (
    <SceneContainer className="text-brand-cream-50 relative">
      {/* Dynamic Background Ambient Layers */}
      <BackgroundLayer theme={config.theme} />

      {/* Audio Controller System */}
      <AudioController />

      {/* Header controls with progress and audio toggle */}
      <HeaderControls />

      {/* Dynamic Animated Scene Container */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center my-auto py-2">
        <SceneTransition
          currentScene={state.currentScene}
          direction={state.direction}
        >
          <SceneRegistry currentScene={state.currentScene} />
        </SceneTransition>
      </div>

      {/* Bottom Footer with Customizer & Style Lab links */}
      <footer className="w-full max-w-md mx-auto py-2 flex items-center justify-between text-[11px] text-brand-cream-300/40 select-none z-10 px-2">
        <Link
          href="/customize"
          className="flex items-center gap-1 text-brand-gold-300/70 hover:text-brand-gold-300 transition-colors p-1"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Customize Gift</span>
        </Link>
        <Link
          href="/style-lab"
          className="flex items-center gap-1 text-brand-pink-300/60 hover:text-brand-pink-300 transition-colors p-1"
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Style Lab</span>
        </Link>
      </footer>
    </SceneContainer>
  );
}
