import React from 'react';
import { GlowOrb } from './GlowOrb';
import { ParticleLayer, ParticleLayerProps } from './ParticleLayer';
import { ThemeId, THEME_PRESETS } from '@/config/theme.config';
import { cn } from '@/lib/utils';

export interface BackgroundLayerProps {
  theme?: ThemeId;
  particleType?: ParticleLayerProps['type'];
  className?: string;
}

export function BackgroundLayer({
  theme = 'romantic',
  particleType,
  className,
}: BackgroundLayerProps) {
  const currentTheme = THEME_PRESETS[theme] || THEME_PRESETS.romantic;
  const activeParticleType = particleType || currentTheme.particleType;

  return (
    <div
      aria-hidden="true"
      className={cn('fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-gradient-to-b from-[#FFF9F5] via-[#FFF5F8] to-[#FCE4EC]/50', className)}
    >
      {/* Dynamic ambient blur orbs */}
      <GlowOrb color="pink" intensity="medium" size="xl" position="top-left" pulse />
      <GlowOrb color="lavender" intensity="soft" size="lg" position="top-right" />
      <GlowOrb color="gold" intensity="soft" size="md" position="bottom-left" pulse />
      <GlowOrb color="pink" intensity="soft" size="lg" position="bottom-right" />
      <GlowOrb color="cream" intensity="strong" size="xl" position="center" />

      {/* Floating subtle particle layer */}
      <ParticleLayer type={activeParticleType} density="normal" />
    </div>
  );
}
