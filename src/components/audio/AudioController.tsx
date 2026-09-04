'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useExperience } from '@/hooks/useExperience';

export function AudioController() {
  const { state } = useExperience();
  const audioContextRef = useRef<AudioContext | null>(null);

  // Soft celebratory chime synthesizer using Web Audio API (zero external asset requirement)
  const playCelebrationChime = useCallback(() => {
    if (state.isMuted) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Harmonious chime chord: C5, E5, G5, C6
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(
          0.08,
          ctx.currentTime + idx * 0.12 + 0.05
        );
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + idx * 0.12 + 1.2
        );

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 1.3);
      });
    } catch {
      // Gracefully silent if Web Audio is restricted
    }
  }, [state.isMuted]);

  // Play chime when entering celebration scene
  useEffect(() => {
    if (state.currentScene === 'celebration' && !state.isMuted) {
      const timer = setTimeout(() => {
        playCelebrationChime();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [state.currentScene, state.isMuted, playCelebrationChime]);

  return null;
}
