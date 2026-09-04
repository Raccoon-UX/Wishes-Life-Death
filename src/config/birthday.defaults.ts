import { BirthdayConfig } from '@/types/config.types';

export const DEFAULT_BIRTHDAY_CONFIG: BirthdayConfig = {
  recipient: {
    name: 'Meghna',
    nickname: 'Sunshine',
    relation: 'Best Friend',
    birthDate: 'October 24',
  },
  sender: {
    name: 'Alex',
    signature: 'With all my love, Alex',
    relationship: 'Forever Friend',
  },
  theme: 'romantic',
  intro: {
    greeting: 'Hey Meghna 🌸',
    subheading: 'I made a little digital universe created just for your special day...',
    badgeText: 'A Special Birthday Surprise ✨',
    ctaText: 'Open Your Gift →',
  },
  reveal: {
    headline: 'Happy Birthday, Meghna! 🎂✨',
    subheadline: 'Today is all about celebrating the wonderful, radiant human you are.',
    highlightText: 'May this year bring you endless joy, love, laughter, and magic.',
  },
  cake: {
    candleCount: 3,
    flavor: 'Strawberry Vanilla Cream Cake 🍰',
    wishPrompt: 'Close your eyes and make a heartfelt wish...',
    blowPrompt: 'Tap each candle to blow it out and make your wish come true!',
  },
  balloons: {
    title: 'Secret Floating Balloons 🎈',
    instruction: 'Tap each balloon to pop it and reveal a hidden birthday secret.',
    items: [
      {
        id: 'b-1',
        color: 'pink',
        emoji: '💖',
        secretMessage: 'You bring unmatched warmth, energy, and smiles wherever you go!',
      },
      {
        id: 'b-2',
        color: 'gold',
        emoji: '⭐',
        secretMessage: 'May every dream you chase this year turn into reality.',
      },
      {
        id: 'b-3',
        color: 'violet',
        emoji: '✨',
        secretMessage: 'Thank you for being the most genuine, caring friend anyone could ever ask for.',
      },
    ],
  },
  messages: {
    title: 'Special Birthday Notes 💌',
    messages: [
      {
        id: 'm-1',
        tag: 'Gratitude',
        title: 'Thank You For Being You',
        message: 'Your kindness and radiant energy light up the lives of everyone around you.',
      },
      {
        id: 'm-2',
        tag: 'Wishes',
        title: 'A Year of Adventures',
        message: 'May this new chapter be filled with wild adventures, peaceful moments, and great triumphs.',
      },
    ],
    questions: [
      {
        id: 'q-1',
        question: 'Ready for the most amazing, unforgettable year of your life?',
        options: [
          { label: 'Yes, absolutely! ✨', reaction: 'That is the spirit! Here is to reaching new heights together!' },
          { label: 'Born ready! 🚀', reaction: 'Unstoppable energy! Let us make every second memorable.' },
        ],
      },
    ],
  },
  memories: {
    title: 'Our Journey Down Memory Lane 📸',
    subtitle: 'A few unforgettable milestones we have shared together...',
    timeline: [
      {
        id: 'mem-1',
        yearOrTag: 'Chapter 1',
        title: 'Where It All Began',
        description: 'The first time we met and talked for hours like old friends.',
        imagePlaceholder: '/assets/images/memory-1.jpg',
      },
      {
        id: 'mem-2',
        yearOrTag: 'Chapter 2',
        title: 'Late Night Laughs & Road Trips',
        description: 'Blasting our favorite playlist under the open night sky.',
        imagePlaceholder: '/assets/images/memory-2.jpg',
      },
      {
        id: 'mem-3',
        yearOrTag: 'Today',
        title: 'Celebrating Another Beautiful Year',
        description: 'Here is to celebrating you and all the unforgettable chapters yet to come.',
        imagePlaceholder: '/assets/images/memory-3.jpg',
      },
    ],
  },
  photos: [
    {
      id: 'photo-1',
      url: '/assets/images/photo-1.jpg',
      caption: 'Unfiltered joy and radiant smiles',
      alt: 'Meghna smiling brightly',
    },
    {
      id: 'photo-2',
      url: '/assets/images/photo-2.jpg',
      caption: 'The unforgettable getaway',
      alt: 'Beautiful travel memory',
    },
  ],
  letter: {
    title: 'A Letter Just For You 💌',
    salutation: 'Dearest Meghna,',
    paragraphs: [
      'As you turn another page in your book of life, I wanted to take a quiet moment to tell you how deeply appreciated and cherished you are.',
      'Through every high and low, your strength, compassion, and humor have inspired everyone lucky enough to be in your orbit.',
      'Never stop dreaming big and radiating the light that makes you so uniquely wonderful.',
    ],
    highlightQuote: '“You do not just exist in the world; you make the world brighter for everyone in it.”',
    closing: 'Always cheering for you,',
    signature: 'Alex ✨',
  },
  celebration: {
    title: 'Happy Birthday, Meghna! 🎉',
    subtitle: 'Let the celebrations begin! May your day be filled with endless love, laughter, and magic.',
    confettiColors: ['#F8B4C8', '#E86A92', '#E8DDF5', '#D9A441', '#FFF9F5', '#FFFFFF'],
    replayButtonText: 'Experience Again 🔄',
  },
  audio: {
    bgMusicUrl: '/assets/audio/ambient-celebration.mp3',
    defaultVolume: 0.5,
    soundEffectsEnabled: true,
  },
};
