/**
 * Personalization Configuration Types
 * Fully decouples recipient and event metadata from UI components.
 */

export type BirthdayTheme = 'romantic' | 'dreamy' | 'cute' | 'elegant' | 'celebration';

export interface RecipientInfo {
  name: string;
  nickname?: string;
  relation?: string;
  birthDate?: string;
}

export interface SenderInfo {
  name: string;
  signature?: string;
  relationship?: string;
}

export interface IntroConfig {
  greeting: string;
  subheading: string;
  badgeText: string;
  ctaText: string;
}

export interface BirthdayRevealConfig {
  headline: string;
  subheadline: string;
  highlightText: string;
}

export interface CakeConfig {
  candleCount: number;
  flavor: string;
  wishPrompt: string;
  blowPrompt: string;
}

export interface BalloonItem {
  id: string;
  color: string;
  emoji: string;
  secretMessage: string;
}

export interface BalloonConfig {
  title: string;
  instruction: string;
  items: BalloonItem[];
}

export interface SurpriseMessageItem {
  id: string;
  tag: string;
  title: string;
  message: string;
}

export interface QuestionOption {
  label: string;
  reaction: string;
}

export interface SurpriseQuestion {
  id: string;
  question: string;
  options: QuestionOption[];
}

export interface MessageConfig {
  title: string;
  messages: SurpriseMessageItem[];
  questions?: SurpriseQuestion[];
}

export interface MemoryItem {
  id: string;
  yearOrTag: string;
  title: string;
  description: string;
  imagePlaceholder?: string;
}

export interface MemoryConfig {
  title: string;
  subtitle: string;
  timeline: MemoryItem[];
}

export interface PhotoGalleryItem {
  id: string;
  url: string;
  caption: string;
  alt: string;
}

export interface LetterConfig {
  title: string;
  salutation: string;
  paragraphs: string[];
  highlightQuote: string;
  closing: string;
  signature: string;
}

export interface CelebrationConfig {
  title: string;
  subtitle: string;
  confettiColors: string[];
  replayButtonText: string;
}

export interface AudioConfig {
  bgMusicUrl?: string;
  defaultVolume: number;
  soundEffectsEnabled: boolean;
}

export interface BirthdayConfig {
  recipient: RecipientInfo;
  sender: SenderInfo;
  theme: BirthdayTheme;
  intro: IntroConfig;
  reveal: BirthdayRevealConfig;
  cake: CakeConfig;
  balloons: BalloonConfig;
  messages: MessageConfig;
  memories: MemoryConfig;
  photos: PhotoGalleryItem[];
  letter: LetterConfig;
  celebration: CelebrationConfig;
  audio: AudioConfig;
}
