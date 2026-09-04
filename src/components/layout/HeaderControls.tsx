'use client';

import React from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useExperience } from '@/hooks/useExperience';
import { SCENE_ORDER, SCENE_METADATA_MAP } from '@/config/scenes.config';
import { cn } from '@/lib/utils';

export function HeaderControls() {
  const {
    state,
    toggleSound,
    replayExperience,
    progressPercentage,
  } = useExperience();

  const currentMetadata = SCENE_METADATA_MAP[state.currentScene];

  return (
    <header className="w-full max-w-md mx-auto px-4 py-3 sm:py-4 flex flex-col gap-2.5 z-20 select-none">
      {/* Top action row */}
      <div className="flex items-center justify-between">
        {/* Sound toggle button */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={state.isMuted ? 'Unmute sound' : 'Mute sound'}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-brand-white-translucent hover:bg-brand-white-glow text-brand-cream-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink-400"
        >
          {state.isMuted ? (
            <VolumeX className="w-5 h-5 text-brand-pink-300" />
          ) : (
            <Volume2 className="w-5 h-5 text-brand-gold-300" />
          )}
        </button>

        {/* Scene progress badge */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-pink-300/80">
            {currentMetadata?.title || 'Scene'}
          </span>
          <span className="text-xs font-medium text-brand-cream-200/90">
            {state.currentSceneIndex + 1} of {SCENE_ORDER.length}
          </span>
        </div>

        {/* Restart / Replay button */}
        <button
          type="button"
          onClick={replayExperience}
          aria-label="Restart experience from beginning"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-brand-white-translucent hover:bg-brand-white-glow text-brand-cream-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink-400"
        >
          <RotateCcw className="w-4 h-4 text-brand-cream-200 hover:rotate-[-45deg] transition-transform" />
        </button>
      </div>

      {/* Progress track bar */}
      <div
        className="w-full h-1.5 bg-brand-purple-950/60 rounded-full overflow-hidden border border-brand-white-translucent/40"
        role="progressbar"
        aria-valuenow={progressPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Experience Progress"
      >
        <div
          className="h-full bg-gradient-to-r from-brand-pink-400 via-brand-violet-400 to-brand-gold-400 rounded-full transition-all duration-300 ease-out"
          style={{ width: String(progressPercentage) + '%' }}
        />
      </div>

      {/* Scene Dots */}
      <div className="flex justify-between items-center px-1" aria-hidden="true">
        {SCENE_ORDER.map((sceneId, idx) => {
          const isActive = idx === state.currentSceneIndex;
          const isDone = idx < state.currentSceneIndex;
          return (
            <span
              key={sceneId}
              className={cn(
                'h-1.5 rounded-full transition-all duration-200',
                isActive
                  ? 'w-4 bg-brand-gold-400 shadow-glow-gold'
                  : isDone
                  ? 'w-1.5 bg-brand-pink-400/80'
                  : 'w-1.5 bg-brand-purple-700/50'
              )}
            />
          );
        })}
      </div>
    </header>
  );
}
