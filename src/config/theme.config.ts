/**
 * Visual Design System Theme Tokens & Presets
 */

export type ThemeId = 'romantic' | 'dreamy' | 'cute' | 'elegant' | 'celebration';

export interface ThemePreset {
  id: ThemeId;
  name: string;
  description: string;
  accent: string;
  accentGradient: string;
  glowColor: string;
  orbColors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  cardVariant: 'romantic' | 'glass' | 'goldGlow' | 'elevated' | 'default';
  particleType: 'hearts' | 'stars' | 'sparkles' | 'mixed';
}

export const THEME_PRESETS: Record<ThemeId, ThemePreset> = {
  romantic: {
    id: 'romantic',
    name: 'Romantic Velvet',
    description: 'Warm, intimate pastel pinks, deep purple velvet, and soft rose glow.',
    accent: '#F472B6',
    accentGradient: 'from-brand-pink-400 via-brand-pink-500 to-brand-violet-500',
    glowColor: 'rgba(244, 114, 182, 0.4)',
    orbColors: {
      primary: '#F472B6',
      secondary: '#8B5CF6',
      tertiary: '#F59E0B',
    },
    cardVariant: 'romantic',
    particleType: 'hearts',
  },
  dreamy: {
    id: 'dreamy',
    name: 'Starlight Dream',
    description: 'Midnight blue, dreamy violet, and twinkling golden stars.',
    accent: '#A78BFA',
    accentGradient: 'from-brand-violet-400 via-indigo-500 to-brand-pink-400',
    glowColor: 'rgba(167, 139, 250, 0.4)',
    orbColors: {
      primary: '#A78BFA',
      secondary: '#60A5FA',
      tertiary: '#FDE68A',
    },
    cardVariant: 'glass',
    particleType: 'stars',
  },
  cute: {
    id: 'cute',
    name: 'Sweet Pastel',
    description: 'Playful cotton candy tones, rosy blushes, and bouncy joy.',
    accent: '#F9A8D4',
    accentGradient: 'from-brand-pink-300 via-brand-pink-400 to-brand-gold-400',
    glowColor: 'rgba(249, 168, 212, 0.45)',
    orbColors: {
      primary: '#F472B6',
      secondary: '#EC4899',
      tertiary: '#FBBF24',
    },
    cardVariant: 'romantic',
    particleType: 'sparkles',
  },
  elegant: {
    id: 'elegant',
    name: 'Golden Elegance',
    description: 'Refined deep obsidian, rich warm gold accents, and champagne highlights.',
    accent: '#F59E0B',
    accentGradient: 'from-brand-gold-300 via-brand-gold-400 to-brand-gold-600',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    orbColors: {
      primary: '#F59E0B',
      secondary: '#D97706',
      tertiary: '#FEF3C7',
    },
    cardVariant: 'goldGlow',
    particleType: 'sparkles',
  },
  celebration: {
    id: 'celebration',
    name: 'Festive Carnival',
    description: 'Vibrant celebratory confetti, gold bursts, and festive energy.',
    accent: '#EC4899',
    accentGradient: 'from-brand-pink-500 via-brand-gold-400 to-brand-violet-500',
    glowColor: 'rgba(236, 72, 153, 0.5)',
    orbColors: {
      primary: '#EC4899',
      secondary: '#F59E0B',
      tertiary: '#8B5CF6',
    },
    cardVariant: 'goldGlow',
    particleType: 'mixed',
  },
};

export const MOTION_DURATIONS = {
  MICRO: 0.15,
  STANDARD: 0.35,
  DRAMATIC: 0.6,
  CINEMATIC: 1.0,
} as const;
