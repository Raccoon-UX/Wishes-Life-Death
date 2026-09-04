import { BirthdayConfig } from '@/types/config.types';
import { DEFAULT_BIRTHDAY_CONFIG } from './birthday.defaults';

/**
 * Canonical default configuration instance.
 */
export const birthdayConfig: BirthdayConfig = DEFAULT_BIRTHDAY_CONFIG;

/**
 * Reusable personalization helper functions
 */
export function getRecipientName(config?: BirthdayConfig): string {
  return config?.recipient?.name || DEFAULT_BIRTHDAY_CONFIG.recipient.name;
}

export function getRecipientNickname(config?: BirthdayConfig): string {
  return config?.recipient?.nickname || config?.recipient?.name || DEFAULT_BIRTHDAY_CONFIG.recipient.nickname || '';
}

export function getSenderName(config?: BirthdayConfig): string {
  return config?.sender?.name || DEFAULT_BIRTHDAY_CONFIG.sender.name;
}

export function getTheme(config?: BirthdayConfig): string {
  return config?.theme || DEFAULT_BIRTHDAY_CONFIG.theme;
}
