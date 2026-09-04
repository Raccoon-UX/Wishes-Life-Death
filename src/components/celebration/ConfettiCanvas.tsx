'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ConfettiCanvasProps {
  colors?: string[];
  particleCount?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  shape: 'rect' | 'circle' | 'heart';
  opacity: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
}

export function ConfettiCanvas({
  colors = ['#F472B6', '#FBBF24', '#8B5CF6', '#FFFFFF', '#F9A8D4', '#FDE68A'],
  particleCount = 65,
  className,
}: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize Confetti Particles
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.4 - height * 0.4,
      vx: (Math.random() - 0.5) * 2.5,
      vy: Math.random() * 2.5 + 1.8,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 6,
      shape: Math.random() > 0.3 ? 'rect' : Math.random() > 0.5 ? 'circle' : 'heart',
      opacity: Math.random() * 0.4 + 0.6,
    }));

    // Fireworks Sparks
    const sparks: Spark[] = [];
    const launchFirework = (targetX: number, targetY: number) => {
      const sparkColor = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 24; i++) {
        const angle = (Math.PI * 2 * i) / 24;
        const speed = Math.random() * 3.5 + 1.5;
        sparks.push({
          x: targetX,
          y: targetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: sparkColor,
          size: Math.random() * 2.5 + 1.5,
          alpha: 1,
          life: Math.random() * 30 + 35,
        });
      }
    };

    // Initial burst & interval fireworks
    launchFirework(width * 0.3, height * 0.25);
    launchFirework(width * 0.7, height * 0.25);

    let fireworkTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render Confetti
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Heart shape
          ctx.beginPath();
          const s = p.size * 0.4;
          ctx.moveTo(0, s / 2);
          ctx.bezierCurveTo(-s, -s, -s * 2, s / 3, 0, s * 2);
          ctx.bezierCurveTo(s * 2, s / 3, s, -s, 0, s / 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // 2. Render Fireworks Sparks
      fireworkTimer++;
      if (fireworkTimer % 75 === 0) {
        launchFirework(
          Math.random() * width * 0.8 + width * 0.1,
          Math.random() * height * 0.35 + height * 0.1
        );
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05; // gentle gravity
        s.alpha -= 1 / s.life;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colors, particleCount, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none select-none z-0 flex items-center justify-center opacity-30"
      >
        <span className="text-4xl">? ?? ?</span>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none select-none z-0 ${className || ''}`}
    />
  );
}
