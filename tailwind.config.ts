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
        // Semantic Tokens: Blush Pink, Rose, Soft Pink, Warm Cream, Lavender, Champagne Gold, Deep Rose, Berry, White
        brand: {
          blush: '#F8B4C8',
          rose: '#E86A92',
          softPink: '#FCE4EC',
          lavender: '#E8DDF5',
          deepRose: '#B83B68',
          berry: '#3B0D1E',
          champagne: '#D9A441',
          pink: {
            50: '#FDF2F8',
            100: '#FCE7F3',
            200: '#FBCFE8',
            300: '#F9A8D4',
            400: '#F8B4C8',
            500: '#E86A92',
            600: '#B83B68',
            700: '#8B2648',
            800: '#5A1830',
            900: '#3B0D1E',
          },
          cream: {
            50: '#FFFFFF',
            100: '#FFF9F5',
            200: '#FFF1E8',
            300: '#FDE6D2',
            400: '#FCD3B3',
          },
          purple: {
            950: '#2A0815',
            900: '#3B0D1E',
            800: '#5A1830',
            700: '#732140',
            600: '#8B2648',
            500: '#B83B68',
          },
          violet: {
            100: '#F4F0FB',
            200: '#E8DDF5',
            300: '#D4C2EE',
            400: '#B89EE2',
            500: '#8B5CF6',
            600: '#7C3AED',
            700: '#6D28D9',
          },
          gold: {
            100: '#FEF9EE',
            200: '#FDF0D5',
            300: '#FCE4AB',
            400: '#E9BA5D',
            500: '#D9A441',
            600: '#B88228',
          },
          white: {
            pure: '#FFFFFF',
            soft: '#FFF9F5',
            translucent: 'rgba(255, 255, 255, 0.75)',
            glow: 'rgba(255, 255, 255, 0.9)',
            faint: 'rgba(255, 255, 255, 0.4)',
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
        'subtle': '0 4px 20px -2px rgba(232, 106, 146, 0.12)',
        'card': '0 10px 30px -10px rgba(232, 106, 146, 0.18)',
        'elevated': '0 20px 40px -15px rgba(232, 106, 146, 0.22)',
        'dramatic': '0 25px 50px -12px rgba(232, 106, 146, 0.28)',
        'glow-pink-soft': '0 0 20px -5px rgba(248, 180, 200, 0.5)',
        'glow-pink': '0 0 30px -5px rgba(232, 106, 146, 0.45)',
        'glow-pink-strong': '0 0 45px -5px rgba(232, 106, 146, 0.65)',
        'glow-gold-soft': '0 0 20px -5px rgba(217, 164, 65, 0.35)',
        'glow-gold': '0 0 30px -5px rgba(217, 164, 65, 0.5)',
        'glow-gold-strong': '0 0 45px -5px rgba(217, 164, 65, 0.7)',
        'glow-violet-soft': '0 0 20px -5px rgba(139, 92, 246, 0.25)',
        'glow-violet': '0 0 30px -5px rgba(139, 92, 246, 0.45)',
        'glow-violet-strong': '0 0 45px -5px rgba(139, 92, 246, 0.65)',
        'glass': '0 8px 32px 0 rgba(232, 106, 146, 0.15)',
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
