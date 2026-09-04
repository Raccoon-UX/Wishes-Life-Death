import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design Tokens: Pastel Pink, Soft Cream, Deep Purple, Violet, Warm Gold, White
        brand: {
          pink: {
            50: '#FDF2F8',
            100: '#FCE7F3',
            200: '#FBCFE8',
            300: '#F9A8D4',
            400: '#F472B6',
            500: '#EC4899',
            600: '#DB2777',
          },
          cream: {
            50: '#FFFDF9',
            100: '#FFFBEB',
            200: '#FEF3C7',
            300: '#FDE68A',
            400: '#FCD34D',
          },
          purple: {
            950: '#0F061D',
            900: '#1A0B2E',
            800: '#2D124D',
            700: '#441B6F',
            600: '#5E2894',
            500: '#7B39B8',
          },
          violet: {
            300: '#C4B5FD',
            400: '#A78BFA',
            500: '#8B5CF6',
            600: '#7C3AED',
            700: '#6D28D9',
          },
          gold: {
            300: '#FDE68A',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
          },
          white: {
            pure: '#FFFFFF',
            soft: '#F8FAFC',
            translucent: 'rgba(255, 255, 255, 0.12)',
            glow: 'rgba(255, 255, 255, 0.25)',
            faint: 'rgba(255, 255, 255, 0.06)',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        serif: ['var(--font-display)', 'Georgia', 'serif'],
        handwriting: ['var(--font-handwriting)', 'cursive'],
      },
      minHeight: {
        dvh: '100dvh',
      },
      borderRadius: {
        'sm': '0.5rem',
        'md': '0.75rem',
        'lg': '1.25rem',
        'xl': '1.75rem',
        '2xl': '2rem',
        'full': '9999px',
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.35)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'dramatic': '0 25px 50px -12px rgba(0, 0, 0, 0.85)',
        'glow-pink-soft': '0 0 20px -5px rgba(244, 114, 182, 0.25)',
        'glow-pink': '0 0 30px -5px rgba(244, 114, 182, 0.45)',
        'glow-pink-strong': '0 0 45px -5px rgba(244, 114, 182, 0.65)',
        'glow-gold-soft': '0 0 20px -5px rgba(245, 158, 11, 0.25)',
        'glow-gold': '0 0 30px -5px rgba(245, 158, 11, 0.45)',
        'glow-gold-strong': '0 0 45px -5px rgba(245, 158, 11, 0.65)',
        'glow-violet-soft': '0 0 20px -5px rgba(139, 92, 246, 0.25)',
        'glow-violet': '0 0 30px -5px rgba(139, 92, 246, 0.45)',
        'glow-violet-strong': '0 0 45px -5px rgba(139, 92, 246, 0.65)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'twinkle': 'twinkle 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
