import { BirthdayConfig, BirthdayTheme } from '@/types/config.types';
import { DEFAULT_BIRTHDAY_CONFIG } from './birthday.defaults';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  validatedConfig?: BirthdayConfig;
}

const VALID_THEMES: BirthdayTheme[] = ['romantic', 'dreamy', 'cute', 'elegant', 'celebration'];

/**
 * Validates any unknown input configuration object.
 * Returns clear, human-readable error messages for invalid fields.
 */
export function validateBirthdayConfig(input: unknown): ValidationResult {
  const errors: string[] = [];

  if (!input || typeof input !== 'object') {
    return { isValid: false, errors: ['Configuration must be a valid JSON object.'] };
  }

  const raw = input as Partial<BirthdayConfig>;

  // 1. Recipient validation
  if (!raw.recipient || typeof raw.recipient !== 'object') {
    errors.push('Missing "recipient" section.');
  } else {
    if (!raw.recipient.name || typeof raw.recipient.name !== 'string' || !raw.recipient.name.trim()) {
      errors.push('Recipient name is required and cannot be empty.');
    }
  }

  // 2. Sender validation
  if (!raw.sender || typeof raw.sender !== 'object') {
    errors.push('Missing "sender" section.');
  } else {
    if (!raw.sender.name || typeof raw.sender.name !== 'string' || !raw.sender.name.trim()) {
      errors.push('Sender name is required and cannot be empty.');
    }
  }

  // 3. Theme validation
  if (raw.theme && !VALID_THEMES.includes(raw.theme)) {
    errors.push(`Invalid theme "${String(raw.theme)}". Allowed themes: ${VALID_THEMES.join(', ')}.`);
  }

  // 4. Cake validation
  if (raw.cake) {
    if (typeof raw.cake.candleCount !== 'number' || raw.cake.candleCount < 1 || raw.cake.candleCount > 10) {
      errors.push('Candle count must be a number between 1 and 10.');
    }
  }

  // 5. Letter validation
  if (raw.letter) {
    if (raw.letter.paragraphs && !Array.isArray(raw.letter.paragraphs)) {
      errors.push('Letter paragraphs must be an array of strings.');
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Safe merge with defaults to populate any missing optional sub-properties
  const validatedConfig = mergeWithDefaults(raw);
  return { isValid: true, errors: [], validatedConfig };
}

/**
 * Merges a partial configuration object safely over default values.
 */
export function mergeWithDefaults(partial: Partial<BirthdayConfig>): BirthdayConfig {
  return {
    recipient: {
      ...DEFAULT_BIRTHDAY_CONFIG.recipient,
      ...(partial.recipient || {}),
    },
    sender: {
      ...DEFAULT_BIRTHDAY_CONFIG.sender,
      ...(partial.sender || {}),
    },
    theme: partial.theme && VALID_THEMES.includes(partial.theme) ? partial.theme : DEFAULT_BIRTHDAY_CONFIG.theme,
    intro: {
      ...DEFAULT_BIRTHDAY_CONFIG.intro,
      ...(partial.intro || {}),
    },
    reveal: {
      ...DEFAULT_BIRTHDAY_CONFIG.reveal,
      ...(partial.reveal || {}),
    },
    cake: {
      ...DEFAULT_BIRTHDAY_CONFIG.cake,
      ...(partial.cake || {}),
    },
    balloons: {
      ...DEFAULT_BIRTHDAY_CONFIG.balloons,
      ...(partial.balloons || {}),
      items: Array.isArray(partial.balloons?.items) && partial.balloons.items.length > 0
        ? partial.balloons.items
        : DEFAULT_BIRTHDAY_CONFIG.balloons.items,
    },
    messages: {
      ...DEFAULT_BIRTHDAY_CONFIG.messages,
      ...(partial.messages || {}),
      messages: Array.isArray(partial.messages?.messages) && partial.messages.messages.length > 0
        ? partial.messages.messages
        : DEFAULT_BIRTHDAY_CONFIG.messages.messages,
    },
    memories: {
      ...DEFAULT_BIRTHDAY_CONFIG.memories,
      ...(partial.memories || {}),
      timeline: Array.isArray(partial.memories?.timeline) && partial.memories.timeline.length > 0
        ? partial.memories.timeline
        : DEFAULT_BIRTHDAY_CONFIG.memories.timeline,
    },
    photos: Array.isArray(partial.photos) && partial.photos.length > 0
      ? partial.photos
      : DEFAULT_BIRTHDAY_CONFIG.photos,
    letter: {
      ...DEFAULT_BIRTHDAY_CONFIG.letter,
      ...(partial.letter || {}),
      paragraphs: Array.isArray(partial.letter?.paragraphs) && partial.letter.paragraphs.length > 0
        ? partial.letter.paragraphs
        : DEFAULT_BIRTHDAY_CONFIG.letter.paragraphs,
    },
    celebration: {
      ...DEFAULT_BIRTHDAY_CONFIG.celebration,
      ...(partial.celebration || {}),
    },
    audio: {
      ...DEFAULT_BIRTHDAY_CONFIG.audio,
      ...(partial.audio || {}),
    },
  };
}
