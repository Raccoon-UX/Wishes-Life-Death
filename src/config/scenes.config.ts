import { SceneId, SceneMetadata, SCENE_IDS } from '@/types/scene.types';

export const SCENE_ORDER: SceneId[] = [
  SCENE_IDS.INTRO,
  SCENE_IDS.REVEAL,
  SCENE_IDS.CAKE,
  SCENE_IDS.BALLOON,
  SCENE_IDS.MESSAGE,
  SCENE_IDS.MEMORY,
  SCENE_IDS.LETTER,
  SCENE_IDS.CELEBRATION,
];

export const SCENE_METADATA_MAP: Record<SceneId, SceneMetadata> = {
  [SCENE_IDS.INTRO]: {
    id: SCENE_IDS.INTRO,
    title: 'Personal Intro',
    subtitle: 'A Special Gift Awaits',
    order: 1,
    description: 'Personal intro and invitation to start the birthday journey',
  },
  [SCENE_IDS.REVEAL]: {
    id: SCENE_IDS.REVEAL,
    title: 'Birthday Reveal',
    subtitle: 'The Grand Reveal',
    order: 2,
    description: 'Cinematic birthday reveal and heartfelt greeting',
  },
  [SCENE_IDS.CAKE]: {
    id: SCENE_IDS.CAKE,
    title: 'Interactive Cake',
    subtitle: 'Make A Wish & Blow Candles',
    order: 3,
    description: 'Make a wish, blow out the candles, and cut the digital cake',
  },
  [SCENE_IDS.BALLOON]: {
    id: SCENE_IDS.BALLOON,
    title: 'Balloon Wishes',
    subtitle: 'Floating Surprise Notes',
    order: 4,
    description: 'Pop floating balloons to unlock secret surprise messages',
  },
  [SCENE_IDS.MESSAGE]: {
    id: SCENE_IDS.MESSAGE,
    title: 'Surprise Messages',
    subtitle: 'Warm Wishes & Fun Prompts',
    order: 5,
    description: 'Heartfelt interactive cards and personalized prompts',
  },
  [SCENE_IDS.MEMORY]: {
    id: SCENE_IDS.MEMORY,
    title: 'Memory Lane',
    subtitle: 'Moments to Remember',
    order: 6,
    description: 'A timeline of shared memories and special milestones',
  },
  [SCENE_IDS.LETTER]: {
    id: SCENE_IDS.LETTER,
    title: 'Personal Letter',
    subtitle: 'From The Heart',
    order: 7,
    description: 'An intimate written letter and personal expressions',
  },
  [SCENE_IDS.CELEBRATION]: {
    id: SCENE_IDS.CELEBRATION,
    title: 'Final Celebration',
    subtitle: 'Grand Finale & Replay',
    order: 8,
    description: 'Festive finale, confetti burst, and replay action',
  },
};
