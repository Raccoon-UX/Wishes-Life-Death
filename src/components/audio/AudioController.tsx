'use client';

import React, { useEffect, useRef } from 'react';
import { useExperience } from '@/hooks/useExperience';

const AUDIO_SRC = '/audio/arj-kiya-hai.mp3';
const TARGET_VOLUME = 1.0; // Full Volume (100%)
const STORAGE_KEY = 'birthday_music_muted';

/**
 * Global helper to trigger playback from any user interaction (buttons, touch, etc.)
 */
export function playBackgroundMusic() {
  if (typeof window === 'undefined') return;
  const audio = document.getElementById('birthday-background-music') as HTMLAudioElement | null;
  if (audio) {
    audio.volume = TARGET_VOLUME;
    audio.muted = false;
    audio.play().catch(() => {});
  }
}

export function AudioController() {
  const { state, dispatch } = useExperience();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;
  const isInitializedRef = useRef(false);

  // 1. Initialize Audio Element and Autoplay / Interaction Fallback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Check user's saved preference
    let savedMutePreference = false;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'true') {
        savedMutePreference = true;
        dispatch({ type: 'SET_MUTED', payload: true });
      }
    } catch {
      // localStorage may be unavailable in some browser modes
    }

    audio.volume = TARGET_VOLUME;
    audio.muted = savedMutePreference;

    const handlePlay = () => {
      dispatch({ type: 'SET_MUSIC_PLAYING', payload: true });
    };

    const handlePause = () => {
      dispatch({ type: 'SET_MUSIC_PLAYING', payload: false });
    };

    const handleEnded = () => {
      // Modern browsers loop automatically when audio.loop is true.
      if (!stateRef.current.isMuted && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = TARGET_VOLUME;
        audioRef.current.play().catch(() => {});
      }
    };

    const handleError = () => {
      dispatch({ type: 'SET_MUSIC_PLAYING', payload: false });
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Setup first interaction fallback listener for gestures
    const interactionEvents = [
      'pointerdown',
      'touchstart',
      'touchend',
      'click',
      'keydown',
    ] as const;

    const removeInteractionListeners = () => {
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction, true);
        document.removeEventListener(evt, handleFirstInteraction, true);
      });
    };

    const handleFirstInteraction = () => {
      if (audioRef.current && !stateRef.current.isMuted) {
        audioRef.current.volume = TARGET_VOLUME;
        audioRef.current.muted = false;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              removeInteractionListeners();
            })
            .catch(() => {
              // Keep listeners attached if playback not yet ready
            });
        }
      }
    };

    // Attempt immediate autoplay on page open if not muted
    if (!savedMutePreference) {
      audio.volume = TARGET_VOLUME;
      audio.muted = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay succeeded immediately on page open!
          })
          .catch(() => {
            // Autoplay was blocked by browser policy; attach interaction listeners for immediate start
            interactionEvents.forEach((evt) => {
              window.addEventListener(evt, handleFirstInteraction, { passive: true, capture: true });
              document.addEventListener(evt, handleFirstInteraction, { passive: true, capture: true });
            });
          });
      } else {
        interactionEvents.forEach((evt) => {
          window.addEventListener(evt, handleFirstInteraction, { passive: true, capture: true });
          document.addEventListener(evt, handleFirstInteraction, { passive: true, capture: true });
        });
      }
    }

    isInitializedRef.current = true;

    return () => {
      removeInteractionListeners();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [dispatch]);

  // 2. React to isMuted state changes (manual user toggle)
  useEffect(() => {
    if (!isInitializedRef.current) return;
    const audio = audioRef.current;
    if (!audio) return;

    if (state.isMuted) {
      audio.pause();
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        // localStorage write error handled safely
      }
    } else {
      audio.volume = TARGET_VOLUME;
      audio.muted = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Play prevented
        });
      }
      try {
        localStorage.setItem(STORAGE_KEY, 'false');
      } catch {
        // localStorage write error handled safely
      }
    }
  }, [state.isMuted]);

  return (
    <audio
      ref={audioRef}
      id="birthday-background-music"
      src={AUDIO_SRC}
      preload="auto"
      loop
      autoPlay
      playsInline
      className="fixed -top-full -left-full w-0 h-0 opacity-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
