import React from 'react';
import { cn } from '@/lib/utils';

export interface ParticleLayerProps {
  type?: 'hearts' | 'stars' | 'sparkles' | 'mixed';
  density?: 'sparse' | 'normal';
  className?: string;
}

interface ParticleItem {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: string;
  delay: string;
  opacity: number;
  symbol: string;
}

export function ParticleLayer({
  type = 'mixed',
  density = 'normal',
  className,
}: ParticleLayerProps) {
  // Pre-computed static positions to avoid hydrations mismatch and high DOM count
  const count = density === 'sparse' ? 6 : 10;

  const getSymbol = (index: number) => {
    if (type === 'hearts') return '??';
    if (type === 'stars') return '?';
    if (type === 'sparkles') return '?';
    const pool = ['?', '??', '?', '??'];
    return pool[index % pool.length];
  };

  const particles: ParticleItem[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${(i * 9 + 8) % 85}%`,
    left: `${(i * 19 + 7) % 88}%`,
    size: 10 + (i % 4) * 3,
    duration: `${5 + (i % 3) * 2}s`,
    delay: `${(i * 0.8) % 3}s`,
    opacity: 0.25 + (i % 3) * 0.15,
    symbol: getSymbol(i),
  }));

  return (
    <div
      aria-hidden="true"
      className={cn(
        'fixed inset-0 pointer-events-none select-none z-0 overflow-hidden',
        className
      )}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute animate-float-medium transform-gpu"
          style={{
            top: p.top,
            left: p.left,
            fontSize: `${p.size}px`,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}
