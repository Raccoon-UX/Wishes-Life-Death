'use client';

import { useEffect, useRef } from 'react';
import { useExperience } from '@/hooks/useExperience';

const AUDIO_SRC = '/audio/arj-kiya-hai.mp3';
const TARGET_VOLUME = 1.0; // Full Volume (100%)
const STORAGE_KEY = 'birthday_music_muted';

export function AudioController() {
  const { state, dispatch } = useExperience();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;
  const isInitializedRef = useRef(false);

  // 1. Initialize Audio Element and Autoplay / Interaction Fallback
  useEffect(() => {
    if (audioRef.current) return;

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

    // Create persistent Audio instance
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = TARGET_VOLUME;
    audioRef.current = audio;

    const handlePlay = () => {
      dispatch({ type: 'SET_MUSIC_PLAYING', payload: true });
    };

    const handlePause = () => {
      dispatch({ type: 'SET_MUSIC_PLAYING', payload: false });
    };

    const handleEnded = () => {
      // Modern browsers loop automatically when audio.loop is true.
      // Re-trigger playback if interrupted:
      if (!stateRef.current.isMuted) {
        audio.currentTime = 0;
        audio.volume = TARGET_VOLUME;
        audio.play().catch(() => {});
      }
    };

    const handleError = () => {
      // Gracefully handle missing asset or network error without throwing uncaught exceptions
      dispatch({ type: 'SET_MUSIC_PLAYING', payload: false });
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Setup first interaction fallback listener
    const interactionEvents = [
      'pointerdown',
      'touchstart',
      'touchend',
      'click',
      'keydown',
      'pointermove',
      'scroll',
    ] as const;

    const removeInteractionListeners = () => {
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction);
        document.removeEventListener(evt, handleFirstInteraction);
      });
    };

    const handleFirstInteraction = () => {
      if (audioRef.current && !stateRef.current.isMuted) {
        audioRef.current.volume = TARGET_VOLUME;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              removeInteractionListeners();
            })
            .catch(() => {
              // Interaction handling pending
            });
        }
      } else {
        removeInteractionListeners();
      }
    };

    // Attempt immediate autoplay on page open if not muted
    if (!savedMutePreference) {
      audio.volume = TARGET_VOLUME;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay succeeded immediately on page open!
          })
          .catch(() => {
            // Autoplay was blocked by browser policy; attach interaction listeners for immediate start
            interactionEvents.forEach((evt) => {
              window.addEventListener(evt, handleFirstInteraction, { passive: true });
              document.addEventListener(evt, handleFirstInteraction, { passive: true });
            });
          });
      } else {
        interactionEvents.forEach((evt) => {
          window.addEventListener(evt, handleFirstInteraction, { passive: true });
          document.addEventListener(evt, handleFirstInteraction, { passive: true });
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
      audio.pause();
      audioRef.current = null;
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

  return null;
}
