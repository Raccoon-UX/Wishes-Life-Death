'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Heart, Check, Volume2, RotateCcw } from 'lucide-react';
import { THEME_PRESETS, ThemeId } from '@/config/theme.config';
import { SceneTitle } from '@/components/typography/SceneTitle';
import { SectionHeading } from '@/components/typography/SectionHeading';
import { HandwrittenText } from '@/components/typography/HandwrittenText';
import { Card } from '@/components/ui/Card';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/common/Button';
import { FloatingHeart } from '@/components/decorative/FloatingHeart';
import { Sparkle } from '@/components/decorative/Sparkle';
import { Star } from '@/components/decorative/Star';
import { OrnamentDivider } from '@/components/decorative/OrnamentDivider';
import { BackgroundLayer } from '@/components/backgrounds/BackgroundLayer';
import { FadeIn } from '@/components/animations/FadeIn';
import { SlideIn } from '@/components/animations/SlideIn';
import { ScaleIn } from '@/components/animations/ScaleIn';

export default function StyleLabPage() {
  const [activeTheme, setActiveTheme] = useState<ThemeId>('romantic');
  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <div
      data-theme={activeTheme}
      className="min-h-screen bg-[var(--bg-primary)] text-brand-cream-50 relative pb-20 transition-colors duration-500"
    >
      <BackgroundLayer theme={activeTheme} />

      {/* Top sticky navigation bar */}
      <nav className="sticky top-0 z-30 w-full backdrop-blur-md bg-brand-purple-950/70 border-b border-brand-white-translucent px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-pink-300 hover:text-brand-pink-200 transition-colors min-h-[44px] min-w-[44px] px-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Experience</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-pink-400/20 text-brand-pink-300 border border-brand-pink-400/30">
              Phase 2 Design System Lab
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-12 relative z-10">
        {/* Header Intro */}
        <header className="text-center space-y-3">
          <SceneTitle
            badge="Visual Foundation"
            title="Design System & Style Lab"
            subtitle="Centralized design tokens, typography, glassmorphic cards, accessible buttons, and romantic motion primitives."
            variant="romantic"
          />
        </header>

        {/* SECTION 1: THEME PRESETS */}
        <section className="space-y-4">
          <SectionHeading icon={<Sparkles className="w-5 h-5" />}>
            1. Visual Theme Presets
          </SectionHeading>
          <p className="text-xs sm:text-sm text-brand-cream-200/70">
            Switch themes dynamically to preview how semantic tokens, background gradients, and decorative layers adapt.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {(Object.keys(THEME_PRESETS) as ThemeId[]).map((themeKey) => {
              const theme = THEME_PRESETS[themeKey];
              const isSelected = activeTheme === themeKey;
              return (
                <button
                  key={themeKey}
                  type="button"
                  onClick={() => setActiveTheme(themeKey)}
                  className={`min-h-[48px] p-3 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-brand-pink-400/20 border-brand-pink-400 text-brand-white-pure shadow-glow-pink-soft scale-[1.02]'
                      : 'bg-brand-white-translucent border-brand-white-translucent text-brand-cream-200/80 hover:bg-brand-white-glow'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold">{theme.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-brand-pink-300" />}
                  </div>
                  <span className="text-[10px] opacity-70 mt-1 capitalize">{theme.particleType}</span>
                </button>
              );
            })}
          </div>
        </section>

        <OrnamentDivider symbol="sparkle" />

        {/* SECTION 2: TYPOGRAPHY HIERARCHY */}
        <section className="space-y-4">
          <SectionHeading icon={<Sparkles className="w-5 h-5" />}>
            2. Typography Hierarchy
          </SectionHeading>
          <Card variant="glass" className="space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8B2648] font-semibold">Display / Hero (Cinzel / Serif)</span>
              <h1 className="text-3xl sm:text-4xl font-bold font-display text-gradient-romantic">
                Happy Birthday, Meghna! ✨🎂
              </h1>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#D9A441] font-semibold">Gold Gradient Heading</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-gradient-gold">
                A Magical Year Awaits
              </h2>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8B2648] font-semibold">Section Heading</span>
              <h3 className="text-xl font-bold font-display text-[#3B0D1E]">
                Memories Down the Lane
              </h3>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8B2648] font-semibold">Body Sans-Serif (Plus Jakarta Sans)</span>
              <p className="text-sm sm:text-base text-[#3B0D1E]/90 leading-relaxed max-w-xl">
                Every moment shared with you has been a cherished memory. May this upcoming chapter be filled with wild adventures, peaceful moments, and radiant joy.
              </p>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#E86A92] font-semibold">Handwritten / Intimate Accent (Caveat)</span>
              <HandwrittenText size="lg" variant="pink">
                “You make the world brighter simply by being in it.” ✨
              </HandwrittenText>
            </div>
          </Card>
        </section>

        <OrnamentDivider symbol="heart" />

        {/* SECTION 3: COLOR PALETTE & TOKENS */}
        <section className="space-y-4">
          <SectionHeading icon={<Sparkles className="w-5 h-5" />}>
            3. Central Color System & Design Tokens
          </SectionHeading>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <div className="p-3.5 rounded-xl bg-[#F8B4C8] text-[#3B0D1E] font-bold text-xs space-y-1 shadow-sm">
              <div>Blush Pink</div>
              <div className="text-[10px] opacity-80">#F8B4C8</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#E86A92] text-white font-bold text-xs space-y-1 shadow-sm">
              <div>Rose Pink</div>
              <div className="text-[10px] opacity-80">#E86A92</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] text-[#3B0D1E] font-bold text-xs space-y-1">
              <div>Warm Cream</div>
              <div className="text-[10px] opacity-80">#FFF9F5</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#E8DDF5] text-[#3B0D1E] font-bold text-xs space-y-1 shadow-sm">
              <div>Lavender Haze</div>
              <div className="text-[10px] opacity-80">#E8DDF5</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#D9A441] text-[#3B0D1E] font-bold text-xs space-y-1 shadow-glow-gold-soft">
              <div>Champagne Gold</div>
              <div className="text-[10px] opacity-80">#D9A441</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#3B0D1E] text-white font-bold text-xs space-y-1 shadow-sm">
              <div>Deep Berry</div>
              <div className="text-[10px] opacity-80">#3B0D1E</div>
            </div>
          </div>
        </section>

        <OrnamentDivider symbol="dot" />

        {/* SECTION 4: GLASS / CARD SYSTEM */}
        <section className="space-y-4">
          <SectionHeading icon={<Sparkles className="w-5 h-5" />}>
            4. Glass & Card System
          </SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card variant="romantic" hoverable>
              <div className="flex items-center gap-2 mb-2">
                <FloatingHeart size="sm" color="pink" />
                <h4 className="font-bold font-display text-base">Romantic Glass Card</h4>
              </div>
              <p className="text-xs text-brand-cream-200/80">
                Frosted velvet background with warm pink light reflections and delicate rose-tinted border.
              </p>
            </Card>

            <Card variant="goldGlow" hoverable>
              <div className="flex items-center gap-2 mb-2">
                <Sparkle size="sm" color="gold" />
                <h4 className="font-bold font-display text-base">Gold Glow Card</h4>
              </div>
              <p className="text-xs text-brand-cream-200/80">
                Warm champagne border, gold ambient halo, and celebratory depth.
              </p>
            </Card>

            <Card variant="glass" hoverable>
              <h4 className="font-bold font-display text-base mb-1">Frosted Glass Panel</h4>
              <p className="text-xs text-brand-cream-200/80">
                Translucent white glass surface with 16px backdrop blur and subtle border.
              </p>
            </Card>

            <Card variant="elevated" hoverable>
              <h4 className="font-bold font-display text-base mb-1">Elevated Surface Card</h4>
              <p className="text-xs text-brand-cream-200/80">
                Deep purple elevated surface with strong contrast for heavy interactive scenes.
              </p>
            </Card>
          </div>
        </section>

        <OrnamentDivider symbol="sparkle" />

        {/* SECTION 5: BUTTON SYSTEM */}
        <section className="space-y-4">
          <SectionHeading icon={<Sparkles className="w-5 h-5" />}>
            5. Accessible Button System
          </SectionHeading>
          <p className="text-xs sm:text-sm text-brand-cream-200/70">
            All buttons enforce ≥44px touch targets, visible keyboard focus rings, active press scales, and reduced motion safety.
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            <Button variant="primary" size="md">
              <span>Primary Button</span>
            </Button>

            <Button variant="romantic" size="md">
              <Heart className="w-4 h-4" />
              <span>Romantic Button</span>
            </Button>

            <Button variant="gold" size="md">
              <Sparkles className="w-4 h-4" />
              <span>Gold Celebration</span>
            </Button>

            <Button variant="secondary" size="md">
              <span>Secondary Glass</span>
            </Button>

            <Button variant="ghost" size="md">
              <span>Ghost Button</span>
            </Button>

            <Button
              variant="primary"
              size="md"
              isLoading={buttonLoading}
              onClick={() => {
                setButtonLoading(true);
                setTimeout(() => setButtonLoading(false), 2000);
              }}
            >
              <span>{buttonLoading ? 'Loading' : 'Click to Test Loading'}</span>
            </Button>

            <Button variant="icon" size="icon" aria-label="Volume sample">
              <Volume2 className="w-4 h-4" />
            </Button>

            <Button variant="icon" size="icon" aria-label="Restart sample">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </section>

        <OrnamentDivider symbol="heart" />

        {/* SECTION 6: DECORATIVE ELEMENTS & GLOWS */}
        <section className="space-y-4">
          <SectionHeading icon={<Sparkles className="w-5 h-5" />}>
            6. Decorative Primitives & Glow Levels
          </SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <GlassPanel className="flex flex-col items-center justify-center p-6 gap-3">
              <div className="flex items-center gap-2">
                <FloatingHeart size="sm" color="pink" />
                <FloatingHeart size="md" color="pink" />
                <FloatingHeart size="lg" color="pink" />
              </div>
              <span className="text-xs font-semibold">Floating Hearts</span>
            </GlassPanel>

            <GlassPanel className="flex flex-col items-center justify-center p-6 gap-3">
              <div className="flex items-center gap-3">
                <Sparkle size="sm" color="gold" />
                <Sparkle size="md" color="pink" />
                <Sparkle size="lg" color="white" />
              </div>
              <span className="text-xs font-semibold">Twinkling Sparkles</span>
            </GlassPanel>

            <GlassPanel className="flex flex-col items-center justify-center p-6 gap-3">
              <div className="flex items-center gap-3">
                <Star size="sm" color="gold" />
                <Star size="md" color="pink" />
                <Star size="lg" color="gold" />
              </div>
              <span className="text-xs font-semibold">Glowing Stars</span>
            </GlassPanel>
          </div>
        </section>

        <OrnamentDivider symbol="sparkle" />

        {/* SECTION 7: MOTION PRIMITIVES */}
        <section className="space-y-4">
          <SectionHeading icon={<Sparkles className="w-5 h-5" />}>
            7. Motion Primitives
          </SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FadeIn delay={0.1}>
              <Card variant="glass" className="text-center p-4">
                <span className="text-xs font-bold text-brand-pink-300">FadeIn</span>
                <p className="text-[11px] text-brand-cream-200/70 mt-1">Standard 350ms fade</p>
              </Card>
            </FadeIn>

            <SlideIn direction="up" delay={0.2}>
              <Card variant="glass" className="text-center p-4">
                <span className="text-xs font-bold text-brand-gold-300">SlideIn (Up)</span>
                <p className="text-[11px] text-brand-cream-200/70 mt-1">Gentle 400ms spring slide</p>
              </Card>
            </SlideIn>

            <ScaleIn delay={0.3}>
              <Card variant="glass" className="text-center p-4">
                <span className="text-xs font-bold text-brand-violet-300">ScaleIn</span>
                <p className="text-[11px] text-brand-cream-200/70 mt-1">Soft pop scale 350ms</p>
              </Card>
            </ScaleIn>
          </div>
        </section>
      </main>
    </div>
  );
}
