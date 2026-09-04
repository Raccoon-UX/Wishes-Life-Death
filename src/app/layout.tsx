import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Cinzel, Caveat } from 'next/font/google';
import './globals.css';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const displayFont = Cinzel({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const handwritingFont = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'A Special Birthday Surprise ??',
  description: 'An interactive, personalized birthday celebration experience.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F061D',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${displayFont.variable} ${handwritingFont.variable} dark`}
    >
      <body className="min-h-screen bg-brand-purple-950 text-brand-cream-50 font-sans antialiased selection:bg-brand-pink-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
