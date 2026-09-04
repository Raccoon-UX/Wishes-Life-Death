'use client';

import React from 'react';
import { useExperience } from '@/hooks/useExperience';
import { birthdayConfig } from '@/config/birthday.config';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { Sparkles, ArrowRight } from 'lucide-react';

export function IntroScenePlaceholder() {
  const { nextScene, totalScenes } = useExperience();

  return (
    <Container className="flex flex-col items-center justify-center text-center">
      <Card className="w-full flex flex-col items-center gap-4 py-8">
        <div className="w-12 h-12 rounded-full bg-brand-pink-400/20 flex items-center justify-center text-brand-pink-300">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-pink-300">
            {birthdayConfig.intro.badgeText}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-cream-50">
            {birthdayConfig.intro.greeting}
          </h1>
          <p className="text-sm text-brand-cream-200/80 max-w-xs mx-auto">
            {birthdayConfig.intro.subheading}
          </p>
        </div>

        {/* Phase 1 Architectural Diagnostic Box */}
        <div className="w-full bg-brand-purple-950/70 rounded-xl p-3.5 border border-brand-white-translucent text-left text-xs text-brand-cream-200/70 space-y-1">
          <div><strong className="text-brand-gold-300">Scene Name:</strong> Personal Intro</div>
          <div><strong className="text-brand-gold-300">Scene ID:</strong> <code>intro</code></div>
          <div><strong className="text-brand-gold-300">Progress:</strong> Scene 1 of {totalScenes}</div>
          <div><strong className="text-brand-gold-300">Config Recipient:</strong> {birthdayConfig.recipient.name} ({birthdayConfig.recipient.nickname})</div>
        </div>

        <div className="w-full pt-2">
          <Button
            variant="primary"
            fullWidth
            onClick={nextScene}
            aria-label="Start Birthday Experience"
            className="flex items-center justify-center gap-2"
          >
            <span>{birthdayConfig.intro.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </Container>
  );
}
