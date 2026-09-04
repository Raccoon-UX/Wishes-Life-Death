'use client';

import React from 'react';
import { useExperience } from '@/hooks/useExperience';
import { birthdayConfig } from '@/config/birthday.config';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { ChevronLeft, RotateCcw, PartyPopper } from 'lucide-react';

export function CelebrationScenePlaceholder() {
  const { prevScene, replayExperience, totalScenes } = useExperience();

  return (
    <Container className="flex flex-col items-center justify-center text-center">
      <Card variant="goldGlow" className="w-full flex flex-col items-center gap-4 py-8">
        <div className="w-12 h-12 rounded-full bg-brand-gold-400/30 flex items-center justify-center text-brand-gold-300">
          <PartyPopper className="w-6 h-6 animate-bounce" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-cream-50">
            {birthdayConfig.celebration.title}
          </h2>
          <p className="text-sm text-brand-cream-200/80 max-w-xs mx-auto">
            {birthdayConfig.celebration.subtitle}
          </p>
        </div>

        {/* Diagnostic info */}
        <div className="w-full bg-brand-purple-950/70 rounded-xl p-3.5 border border-brand-white-translucent text-left text-xs text-brand-cream-200/70 space-y-1">
          <div><strong className="text-brand-gold-300">Scene Name:</strong> Final Celebration</div>
          <div><strong className="text-brand-gold-300">Scene ID:</strong> <code>celebration</code></div>
          <div><strong className="text-brand-gold-300">Progress:</strong> Scene 8 of {totalScenes} (Final)</div>
          <div><strong className="text-brand-gold-300">Replay Action:</strong> Resets journey to Scene 1</div>
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <Button
            variant="secondary"
            onClick={prevScene}
            aria-label="Go to previous scene"
            className="w-full sm:flex-1 flex items-center justify-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button
            variant="gold"
            onClick={replayExperience}
            aria-label="Replay experience from beginning"
            className="w-full sm:flex-1 flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{birthdayConfig.celebration.replayButtonText}</span>
          </Button>
        </div>
      </Card>
    </Container>
  );
}
