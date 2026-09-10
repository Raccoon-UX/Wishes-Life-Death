import { BirthdayConfig } from '@/types/config.types';

export const DEFAULT_BIRTHDAY_CONFIG: BirthdayConfig = {
  recipient: {
    name: 'Meghna',
    nickname: 'Sunshine',
    relation: 'Best Friend',
    birthDate: 'October 24',
  },
  sender: {
    name: 'Tushar',
    signature: 'With all my love, Tushar',
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
        imageUrl: '/assets/images/1st Time.jpeg',
        imagePlaceholder: '/assets/images/1st Time.jpeg',
      },
      {
        id: 'mem-2',
        yearOrTag: 'Chapter 2',
        title: 'Late Night Laughs & Road Trips',
        description: 'Blasting our favorite playlist under the open night sky.',
        imageUrl: '/assets/images/nightSky.jpeg',
        imagePlaceholder: '/assets/images/nightSky.jpeg',
        linkUrl: 'https://open.spotify.com/playlist/1BZyvp6rOqGDiJQBVbM5aC?si=zdgJBzf8R3iiMOX4g60PxA&utm_source=whatsapp&pi=TnO7li1FSYaC0&sci=spotify%3Acard-config%3A72BP9wcSfldAaq0mXvWgMF',
        linkText: 'Listen on Spotify 🎵',
      },
      {
        id: 'mem-3',
        yearOrTag: 'Chapter 3',
        title: 'Celebrating Another Beautiful Year',
        description: 'Here is to celebrating you and all the unforgettable chapters yet to come.',
        imageUrl: '/assets/images/lastTimeWith US.png',
        imagePlaceholder: '/assets/images/lastTimeWith US.png',
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
    salutation: 'Hi! Meghana,',
    paragraphs: [
      'Happiest Birthday 💐 Dear.......',
      'Ese toh Hame Mile Jyada Samay nhi hua Lekin Phirbhi Lagta hi nhi Ki Mai Tumse Abhi Mila hu....... Apni Apni Se Lagne Lagi Ho Kuch Samay Se Mujhe Tum 💞🫶',
      'Khair, Mai Toh Bas Yhi Bhagwan Se tumhare liye Mangunga ki Tum Successful hoo Jaao, Mai Tumhare Peeche hi nhi Balki Har Ek Mod per Saath Bhi Hu, Hum Sath milke Sab Kuchh Achieve lenge, Mujhe Bas Tumhara sath Chahiye.... Har Utaar-Chadaav Me har Mood Pe.',
      'Mai Special toh Nhi Kahunga Per Tum Voo Khubsurat Insaan Ho Meri Zindagi ki Jisne Mere Liye Apna Tumne Keemtee Samay Nikala, jo maine kabhi Socha bhi nhi tha......',
      'Jo Bhi Galat Fehmiyaaan ya Jhagde hue hain Hamare Beech, Mai un sab Ke Liye Tumse Maafi Maanta hu, Cheejein Kabhi Theek toh nhi Hoti Per aur Behtar Banaya Jaa Sakta hai Aur Mai Hamare Liye ye Jarur Kaunga...... Aasha Karta hu Tum Mujhe Samajhne ki Kosish karogi aur Maaf Kar Dogi.......',
      'Mai Nhi Chahata ki Tum ya Phir Mai Ya Phir Hum Ek Dusre ke Liye Kabhi Badlee, Bas Tum Jaisi Ho Waisi hi Mujhe Bahut Pasand ho 😊',
      'Mujhe Bas Meri Khushi Chahiye.... Aur Voo Tumhari ek Muskaan Me hai..... Mujhe Meri Pahale Wali Meghna Chahiye 🥹',
      'Happiest Birthday 🎂🎈 to you My Dream gurllll 🫀🫂',
    ],
    highlightQuote: '',
    closing: '',
    signature: 'Yours Tushar',
  },
  celebration: {
    title: 'Happy Birthday, Meghna! 🎉',
    subtitle: 'Let the celebrations begin! May your day be filled with endless love, laughter, and magic.',
    confettiColors: ['#F8B4C8', '#E86A92', '#E8DDF5', '#D9A441', '#FFF9F5', '#FFFFFF'],
    replayButtonText: 'Experience Again 🔄',
  },
  audio: {
    bgMusicUrl: '/audio/arj-kiya-hai.mp3',
    defaultVolume: 1.0,
    soundEffectsEnabled: true,
  },
};
