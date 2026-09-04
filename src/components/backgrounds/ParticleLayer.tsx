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
  kind: 'heart' | 'star' | 'sparkle' | 'petal';
}

function ParticleShape({ kind, size }: { kind: ParticleItem['kind']; size: number }) {
  if (kind === 'heart') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className="fill-brand-rose/40 stroke-brand-rose/70 stroke-[1.5]"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  if (kind === 'star') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className="fill-brand-champagne/40 stroke-brand-champagne/80 stroke-1"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }
  if (kind === 'sparkle') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className="fill-brand-blush/60 stroke-brand-rose/50 stroke-1"
      >
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="fill-brand-softPink/80 stroke-brand-blush/80 stroke-1"
    >
      <path d="M12 2 C8 7, 6 12, 12 22 C18 12, 16 7, 12 2 Z" />
    </svg>
  );
}

export function ParticleLayer({
  type = 'mixed',
  density = 'normal',
  className,
}: ParticleLayerProps) {
  // Pre-computed static positions to avoid hydration mismatch and high DOM count
  const count = density === 'sparse' ? 6 : 10;

  const getKind = (index: number): ParticleItem['kind'] => {
    if (type === 'hearts') return 'heart';
    if (type === 'stars') return 'star';
    if (type === 'sparkles') return 'sparkle';
    const pool: ParticleItem['kind'][] = ['heart', 'sparkle', 'star', 'petal'];
    return pool[index % pool.length];
  };

  const particles: ParticleItem[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${(i * 9 + 8) % 85}%`,
    left: `${(i * 19 + 7) % 88}%`,
    size: 14 + (i % 4) * 4,
    duration: `${5 + (i % 3) * 2}s`,
    delay: `${(i * 0.8) % 3}s`,
    opacity: 0.35 + (i % 3) * 0.15,
    kind: getKind(i),
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
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        >
          <ParticleShape kind={p.kind} size={p.size} />
        </span>
      ))}
    </div>
  );
}
