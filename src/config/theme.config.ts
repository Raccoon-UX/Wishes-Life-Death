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
    name: 'Romantic Blush (Light)',
    description: 'Soft blush pink, warm cream, delicate lavender haze, and champagne gold highlights.',
    accent: '#E86A92',
    accentGradient: 'from-brand-pink-400 via-brand-pink-500 to-brand-gold-500',
    glowColor: 'rgba(232, 106, 146, 0.35)',
    orbColors: {
      primary: '#F8B4C8',
      secondary: '#E8DDF5',
      tertiary: '#D9A441',
    },
    cardVariant: 'romantic',
    particleType: 'hearts',
  },
  dreamy: {
    id: 'dreamy',
    name: 'Dreamy Lavender',
    description: 'Soft lavender haze, pale periwinkle, and champagne golden sparkles.',
    accent: '#A78BFA',
    accentGradient: 'from-brand-violet-400 via-indigo-400 to-brand-pink-400',
    glowColor: 'rgba(167, 139, 250, 0.35)',
    orbColors: {
      primary: '#DDD6FE',
      secondary: '#E8DDF5',
      tertiary: '#FDE68A',
    },
    cardVariant: 'glass',
    particleType: 'stars',
  },
  cute: {
    id: 'cute',
    name: 'Sweet Pastel',
    description: 'Playful cotton candy tones, rosy blushes, and bouncy joy.',
    accent: '#F472B6',
    accentGradient: 'from-brand-pink-300 via-brand-pink-400 to-brand-gold-400',
    glowColor: 'rgba(248, 180, 200, 0.45)',
    orbColors: {
      primary: '#F8B4C8',
      secondary: '#FCE4EC',
      tertiary: '#FBBF24',
    },
    cardVariant: 'romantic',
    particleType: 'sparkles',
  },
  elegant: {
    id: 'elegant',
    name: 'Golden Elegance',
    description: 'Refined warm cream, champagne gold accents, and pearl white highlights.',
    accent: '#D9A441',
    accentGradient: 'from-brand-gold-300 via-brand-gold-400 to-brand-gold-600',
    glowColor: 'rgba(217, 164, 65, 0.35)',
    orbColors: {
      primary: '#D9A441',
      secondary: '#FCE4AB',
      tertiary: '#FFF9F5',
    },
    cardVariant: 'goldGlow',
    particleType: 'sparkles',
  },
  celebration: {
    id: 'celebration',
    name: 'Festive Confetti',
    description: 'Pastel celebration confetti, warm gold bursts, and celebratory energy.',
    accent: '#E86A92',
    accentGradient: 'from-brand-pink-500 via-brand-gold-400 to-brand-violet-400',
    glowColor: 'rgba(232, 106, 146, 0.4)',
    orbColors: {
      primary: '#F8B4C8',
      secondary: '#D9A441',
      tertiary: '#E8DDF5',
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
