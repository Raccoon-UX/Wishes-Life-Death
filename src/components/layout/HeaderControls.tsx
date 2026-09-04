'use client';

import React from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useExperience } from '@/hooks/useExperience';

export function HeaderControls() {
  const { state, toggleSound, replayExperience } = useExperience();

  return (
    <header className="fixed top-3 sm:top-5 right-3 sm:right-6 z-50 flex items-center gap-2 select-none pointer-events-auto">
      {/* Sound toggle button */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={state.isMuted ? 'Unmute ambient sound' : 'Mute sound'}
        className="min-h-[42px] min-w-[42px] p-2.5 rounded-full bg-brand-purple-950/60 hover:bg-brand-purple-900/80 backdrop-blur-md border border-white/10 text-brand-cream-100 shadow-soft hover:shadow-glow-pink-soft transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink-400 active:scale-95 flex items-center justify-center group"
      >
        {state.isMuted ? (
          <VolumeX className="w-4 h-4 text-brand-pink-300 group-hover:scale-110 transition-transform" />
        ) : (
          <Volume2 className="w-4 h-4 text-brand-gold-300 group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Subtle replay action visible only on celebration scene */}
      {state.currentScene === 'celebration' && (
        <button
          type="button"
          onClick={replayExperience}
          aria-label="Restart experience"
          className="min-h-[42px] min-w-[42px] p-2.5 rounded-full bg-brand-purple-950/60 hover:bg-brand-purple-900/80 backdrop-blur-md border border-white/10 text-brand-cream-200 hover:text-white shadow-soft transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400 active:scale-95 flex items-center justify-center group"
          title="Restart from beginning"
        >
          <RotateCcw className="w-4 h-4 text-brand-gold-300 group-hover:rotate-[-90deg] transition-transform duration-300" />
        </button>
      )}
    </header>
  );
}
