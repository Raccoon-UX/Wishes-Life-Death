'use client';

import React from 'react';
import { useExperience } from '@/hooks/useExperience';
import { birthdayConfig } from '@/config/birthday.config';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { ChevronLeft, ChevronRight, Cake } from 'lucide-react';

export function CakeScenePlaceholder() {
  const { nextScene, prevScene, totalScenes } = useExperience();

  return (
    <Container className="flex flex-col items-center justify-center text-center">
      <Card className="w-full flex flex-col items-center gap-4 py-8">
        <div className="w-12 h-12 rounded-full bg-brand-pink-400/20 flex items-center justify-center text-brand-pink-300">
          <Cake className="w-6 h-6" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-cream-50">
            Interactive Cake
          </h2>
          <p className="text-sm text-brand-cream-200/80 max-w-xs mx-auto">
            {birthdayConfig.cake.wishPrompt}
          </p>
        </div>

        {/* Diagnostic info */}
        <div className="w-full bg-brand-purple-950/70 rounded-xl p-3.5 border border-brand-white-translucent text-left text-xs text-brand-cream-200/70 space-y-1">
          <div><strong className="text-brand-gold-300">Scene Name:</strong> Interactive Cake</div>
          <div><strong className="text-brand-gold-300">Scene ID:</strong> <code>cake</code></div>
          <div><strong className="text-brand-gold-300">Progress:</strong> Scene 3 of {totalScenes}</div>
          <div><strong className="text-brand-gold-300">Configured Candles:</strong> {birthdayConfig.cake.candleCount} candles</div>
          <div><strong className="text-brand-gold-300">Flavor:</strong> {birthdayConfig.cake.flavor}</div>
        </div>

        <div className="w-full flex items-center justify-between gap-3 pt-2">
          <Button
            variant="secondary"
            onClick={prevScene}
            aria-label="Go to previous scene"
            className="flex-1 flex items-center justify-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button
            variant="primary"
            onClick={nextScene}
            aria-label="Go to next scene"
            className="flex-1 flex items-center justify-center gap-1.5"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </Container>
  );
}
