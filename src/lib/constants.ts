/**
 * Application Constants
 */

export const APP_CONFIG = {
  NAME: 'Digital Birthday Surprise',
  STORAGE_KEYS: {
    SOUND_MUTED: 'bday_sound_muted',
    EXPERIENCE_PROGRESS: 'bday_exp_progress',
  },
  ANIMATION: {
    SCENE_DURATION: 0.4,
    MICRO_DURATION: 0.25,
  },
  ACCESSIBILITY: {
    MIN_TOUCH_TARGET_SIZE_PX: 44,
  },
} as const;
