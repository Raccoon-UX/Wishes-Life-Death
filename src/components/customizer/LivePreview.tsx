'use client';

import React, { useState } from 'react';
import { BirthdayConfig } from '@/types/config.types';
import { HandwrittenText } from '@/components/typography/HandwrittenText';
import { OrnamentDivider } from '@/components/decorative/OrnamentDivider';
import { Button } from '@/components/common/Button';
import { Cake, Sparkles, Mail, PartyPopper, Heart } from 'lucide-react';

export interface LivePreviewProps {
  config: BirthdayConfig;
}

export function LivePreview({ config }: LivePreviewProps) {
  const [activeTab, setActiveTab] = useState<'intro' | 'reveal' | 'cake' | 'letter' | 'celebration'>('intro');

  return (
    <div className="w-full flex flex-col gap-3 select-none">
      {/* Mini Preview Tab Switcher */}
      <div className="flex items-center justify-between bg-[#FFFDF9] p-1.5 rounded-xl border border-[#F8B4C8] text-xs shadow-sm">
        {(['intro', 'reveal', 'cake', 'letter', 'celebration'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 px-2 rounded-lg font-semibold capitalize transition-colors min-h-[36px] ${
              activeTab === tab
                ? 'bg-[#E86A92] text-white font-bold shadow-romantic'
                : 'text-[#8B2648]/80 hover:text-[#3B0D1E] hover:bg-[#FCE4EC]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Live Preview Miniature Device Frame */}
      <div
        data-theme={config.theme}
        className="w-full rounded-2xl bg-gradient-to-b from-[#FFF9F5] via-[#FFF0F5] to-[#FCE4EC] border border-[#F8B4C8] p-4 sm:p-6 shadow-romantic relative overflow-hidden transition-colors duration-300 text-[#3B0D1E]"
      >
        {/* Ambient glow orbs */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#F8B4C8]/40 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#D9A441]/25 blur-2xl pointer-events-none" />

        {/* 1. INTRO PREVIEW */}
        {activeTab === 'intro' && (
          <div className="bg-[#FFFDF9] rounded-2xl p-5 text-center space-y-3 border border-[#F8B4C8] shadow-sm">
            <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FCE4EC] text-[#8B2648] border border-[#F8B4C8]">
              {config.intro.badgeText || 'A Special Birthday Surprise ✨'}
            </span>

            <h3 className="text-2xl font-bold font-display text-gradient-romantic">
              {config.intro.greeting || 'Hey Meghna 🌸'}
            </h3>

            {config.recipient.nickname && (
              <p className="text-xs text-[#8B2648] font-semibold tracking-wide flex items-center justify-center gap-1">
                <Heart className="w-3 h-3 fill-current text-[#E86A92]" />
                <span>For {config.recipient.nickname}</span>
                <Heart className="w-3 h-3 fill-current text-[#E86A92]" />
              </p>
            )}

            <p className="text-xs text-[#3B0D1E]/80 leading-relaxed max-w-xs mx-auto">
              {config.intro.subheading || 'Someone created a digital universe just for your special day...'}
            </p>

            <HandwrittenText size="sm" variant="pink">
              “A little digital world created just for you...”
            </HandwrittenText>

            <OrnamentDivider symbol="sparkle" className="my-2" />

            <Button variant="romantic" size="sm" fullWidth className="font-bold">
              {config.intro.ctaText || 'Open Your Gift →'}
            </Button>
          </div>
        )}

        {/* 2. REVEAL PREVIEW */}
        {activeTab === 'reveal' && (
          <div className="bg-[#FFFDF9] rounded-2xl p-5 text-center space-y-3 border border-[#F8B4C8] shadow-sm">
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FCE4EC] text-[#8B2648] border border-[#F8B4C8]">
              <Sparkles className="w-3 h-3 text-[#D9A441]" />
              <span>The Grand Reveal</span>
            </span>

            <h3 className="text-2xl font-bold font-display text-gradient-romantic">
              {config.reveal.headline || 'Happy Birthday, Meghna! 🎂✨'}
            </h3>

            <p className="text-xs text-[#3B0D1E]/90 leading-relaxed max-w-xs mx-auto">
              {config.reveal.subheadline || 'Today is all about celebrating you.'}
            </p>

            <div className="bg-[#FFF5EB] rounded-xl p-3 border border-[#D9A441]/40">
              <HandwrittenText size="sm" variant="gold" className="italic text-[#3B0D1E]">
                &ldquo;{config.reveal.highlightText || 'May this year bring you endless joy and magic.'}&rdquo;
              </HandwrittenText>
            </div>

            <Button variant="romantic" size="sm" fullWidth className="font-bold">
              Make A Wish 🎂 →
            </Button>
          </div>
        )}

        {/* 3. CAKE PREVIEW */}
        {activeTab === 'cake' && (
          <div className="bg-[#FFFDF9] rounded-2xl p-5 text-center space-y-3 border border-[#F8B4C8] shadow-sm">
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FCE4EC] text-[#8B2648] border border-[#F8B4C8]">
              <Cake className="w-3 h-3 text-[#E86A92]" />
              <span>Interactive Cake</span>
            </span>

            <h3 className="text-xl font-bold font-display text-gradient-romantic">
              Make A Wish ✨
            </h3>

            <div className="flex items-center justify-center gap-3 py-2">
              {Array.from({ length: config.cake.candleCount || 3 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-sm">🔥</span>
                  <div className="w-3 h-8 bg-gradient-to-b from-[#E86A92] to-[#D9A441] rounded-t-sm" />
                </div>
              ))}
            </div>

            <p className="text-xs text-[#8B2648] font-sans flex items-center justify-center gap-1 font-medium">
              <Sparkles className="w-3 h-3 text-[#D9A441]" />
              <span>{config.cake.flavor}</span>
            </p>

            <Button variant="gold" size="sm" fullWidth className="font-bold">
              Pop Balloons 🎈 →
            </Button>
          </div>
        )}

        {/* 4. LETTER PREVIEW */}
        {activeTab === 'letter' && (
          <div className="bg-[#FFFDF9] rounded-2xl p-5 text-center space-y-3 border border-[#F8B4C8] shadow-sm">
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FCE4EC] text-[#8B2648] border border-[#F8B4C8]">
              <Mail className="w-3 h-3 text-[#E86A92]" />
              <span>From The Heart</span>
            </span>

            <div className="bg-gradient-to-b from-[#FFFDF9] to-[#FFF9F5] text-[#3B0D1E] rounded-xl p-4 border border-[#D9A441]/50 text-left space-y-2 shadow-sm">
              <span className="text-[11px] font-bold font-display text-[#3B0D1E]">
                {config.letter.salutation || 'Dearest Meghna,'}
              </span>
              <p className="text-xs text-[#3B0D1E]/90 line-clamp-3">
                {config.letter.paragraphs[0] || 'As you turn another page in your book of life...'}
              </p>
              <div className="text-right text-xs font-bold text-[#E86A92] font-handwriting">
                {config.letter.signature || 'With love, Alex ✨'}
              </div>
            </div>

            <Button variant="romantic" size="sm" fullWidth className="font-bold">
              Celebrate! 🎉 →
            </Button>
          </div>
        )}

        {/* 5. CELEBRATION PREVIEW */}
        {activeTab === 'celebration' && (
          <div className="bg-[#FFFDF9] rounded-2xl p-5 text-center space-y-3 border border-[#D9A441]/50 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#FFF5EB] border border-[#D9A441]/50 flex items-center justify-center text-[#D9A441] mx-auto">
              <PartyPopper className="w-5 h-5" />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B2648] font-display">
              Happy Birthday
            </p>

            <h3 className="text-3xl font-extrabold font-display text-gradient-romantic">
              {(config.recipient.name || 'Meghna').toUpperCase()}
            </h3>

            <p className="text-xs text-[#3B0D1E]/90 leading-relaxed max-w-xs mx-auto">
              {config.celebration.subtitle || 'Let the celebrations begin!'}
            </p>

            <div className="bg-[#FFF5EB] rounded-xl p-3 border border-[#D9A441]/40 text-xs">
              <HandwrittenText size="sm" variant="gold" className="italic text-[#3B0D1E]">
                “{config.celebration.title || 'Forever Cherished'}”
              </HandwrittenText>
              <p className="text-[10px] text-[#8B2648] pt-1 font-medium">
                — {config.sender.name || 'Alex'} ✨
              </p>
            </div>

            <Button variant="gold" size="sm" fullWidth className="font-bold">
              {config.celebration.replayButtonText || 'Experience Again 🔄'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
