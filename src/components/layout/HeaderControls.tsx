'use client';

import React from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useExperience } from '@/hooks/useExperience';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function HeaderControls() {
  const { state, toggleSound, replayExperience } = useExperience();
  const prefersReducedMotion = useReducedMotion();

  const isPlaying = !state.isMuted && state.isMusicPlaying;

  return (
    <header className="fixed top-3 sm:top-5 right-3 sm:right-6 z-50 flex items-center gap-2.5 select-none pointer-events-auto">
      {/* Music / Sound toggle button */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={state.isMuted ? 'Turn music on' : 'Turn music off'}
        title={state.isMuted ? 'Turn music on' : 'Turn music off'}
        className="min-h-[42px] px-3 py-2 rounded-full bg-[#FFFDF9]/90 hover:bg-white backdrop-blur-md border border-[#F8B4C8]/60 hover:border-[#E86A92] text-[#3B0D1E] shadow-romantic transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E86A92] active:scale-95 flex items-center gap-2 group cursor-pointer"
      >
        {state.isMuted ? (
          <VolumeX className="w-4 h-4 text-[#8B2648] group-hover:scale-110 transition-transform" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-4 h-4 text-[#E86A92] group-hover:scale-110 transition-transform" />
            {!prefersReducedMotion && isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E86A92] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E86A92]"></span>
              </span>
            )}
          </div>
        )}

        <span className="text-xs font-semibold text-[#8B2648] group-hover:text-[#3B0D1E] transition-colors hidden sm:inline">
          {state.isMuted ? 'Music Off' : 'Music On'}
        </span>
      </button>

      {/* Subtle replay action visible only on celebration scene */}
      {state.currentScene === 'celebration' && (
        <button
          type="button"
          onClick={replayExperience}
          aria-label="Restart experience from beginning"
          className="min-h-[42px] min-w-[42px] p-2.5 rounded-full bg-[#FFFDF9]/90 hover:bg-white backdrop-blur-md border border-[#D9A441]/50 text-[#D9A441] shadow-romantic hover:shadow-glow-gold-soft transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] active:scale-95 flex items-center justify-center group cursor-pointer"
          title="Restart from beginning"
        >
          <RotateCcw className="w-4 h-4 text-[#D9A441] group-hover:rotate-[-90deg] transition-transform duration-300" />
        </button>
      )}
    </header>
  );
}
