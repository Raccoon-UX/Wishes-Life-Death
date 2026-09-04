'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/hooks/useExperience';
import { useBirthdayConfig } from '@/context/ConfigContext';
import { MemoryItem } from '@/types/config.types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { MemoryCard } from '@/components/memories/MemoryCard';
import { Sparkle } from '@/components/decorative/Sparkle';
import { OrnamentDivider } from '@/components/decorative/OrnamentDivider';
import { ChevronLeft, ArrowRight, BookOpen, X, Heart } from 'lucide-react';

export function MemoryScene() {
  const { nextScene, prevScene, completeScene } = useExperience();
  const birthdayConfig = useBirthdayConfig();

  const memories = birthdayConfig.memories.timeline;
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  const handleContinue = () => {
    completeScene('memory');
    nextScene();
  };

  return (
    <Container className="flex flex-col items-center justify-center my-auto py-3">
      <Card
        variant="romantic"
        glow="soft"
        padded={false}
        className="w-full max-w-sm sm:max-w-md p-4 sm:p-6 flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Ambient background decoration */}
        <div aria-hidden="true" className="absolute top-4 left-4 opacity-40 pointer-events-none">
          <Sparkle size="md" color="gold" />
        </div>

        {/* Scene Header */}
        <div className="space-y-1 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase bg-brand-pink-400/20 text-brand-pink-200 border border-brand-pink-400/30">
            <BookOpen className="w-3.5 h-3.5 text-brand-gold-300" />
            <span>Shared Moments</span>
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold font-display text-gradient-romantic">
            {birthdayConfig.memories.title}
          </h2>

          <p className="text-xs text-brand-cream-200/80 max-w-xs mx-auto">
            {birthdayConfig.memories.subtitle}
          </p>
        </div>

        {/* SCROLLABLE MEMORY TIMELINE CONTAINER */}
        <div className="w-full max-h-[340px] sm:max-h-[380px] overflow-y-auto px-1 py-2 space-y-3 relative pr-1.5 select-none focus:outline-none">
          {/* Vertical connecting glowing stem */}
          <div
            aria-hidden="true"
            className="absolute top-4 bottom-4 left-4 sm:left-6 w-[2px] bg-gradient-to-b from-brand-pink-400 via-brand-violet-400 to-brand-gold-400 opacity-30 pointer-events-none"
          />

          {memories.map((memory, index) => (
            <MemoryCard
              key={memory.id}
              item={memory}
              index={index}
              onSelect={setSelectedMemory}
            />
          ))}
        </div>

        <OrnamentDivider symbol="sparkle" />

        {/* Navigation Action Buttons */}
        <div className="w-full flex items-center justify-between gap-3 pt-1">
          <Button
            variant="secondary"
            size="md"
            onClick={prevScene}
            aria-label="Return to special notes scene"
            className="flex-1 flex items-center justify-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button
            variant="romantic"
            size="md"
            onClick={handleContinue}
            aria-label="Proceed to personal letter scene"
            className="flex-1 flex items-center justify-center gap-2 font-bold shadow-glow-pink"
          >
            <span>A Letter For You</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* FOCUSED MEMORY LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-purple-950/85 backdrop-blur-md"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-brand-purple-900 border border-brand-pink-400/40 rounded-3xl p-5 shadow-dramatic text-center space-y-3 relative"
            >
              <button
                type="button"
                onClick={() => setSelectedMemory(null)}
                aria-label="Close memory modal"
                className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-brand-white-translucent text-brand-cream-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-10 h-10 rounded-full bg-brand-pink-400/20 text-brand-pink-300 mx-auto flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>

              <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-brand-gold-400/20 text-brand-gold-300 inline-block">
                {selectedMemory.yearOrTag}
              </span>

              <h3 className="text-xl font-bold font-display text-brand-cream-50">
                {selectedMemory.title}
              </h3>

              <p className="text-xs sm:text-sm text-brand-cream-100/90 leading-relaxed font-sans px-2">
                {selectedMemory.description}
              </p>

              <div className="pt-2">
                <Button
                  variant="romantic"
                  size="sm"
                  fullWidth
                  onClick={() => setSelectedMemory(null)}
                >
                  Close Memory
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}
