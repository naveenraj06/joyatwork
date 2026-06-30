import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { EffectType } from '../types';

// Create a custom main-thread confetti instance to avoid iframe/sandbox worker
// issues where OffscreenCanvas throws "canvas.getBoundingClientRect is not a function"
const mainThreadConfetti = confetti.create(undefined, {
  useWorker: false,
  resize: true
});

interface EffectsControllerProps {
  effect: EffectType;
  isActive: boolean;
  reducedMotion?: boolean;
}

export const EffectsController: React.FC<EffectsControllerProps> = ({
  effect,
  isActive,
  reducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Trigger confetti when active
  useEffect(() => {
    if (!isActive || reducedMotion) return;

    if (effect === 'confetti') {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        mainThreadConfetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
        });
        mainThreadConfetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
        });

        if (Date.now() < end) {
          animationFrameId.current = requestAnimationFrame(frame);
        }
      };

      frame();

      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      };
    }
  }, [effect, isActive, reducedMotion]);

  // Handle canvas-based sparkles, floatingEmojis, and balloons
  useEffect(() => {
    if (!isActive || effect === 'confetti' || reducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 600;
      height = canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color?: string;
      alpha: number;
      decay: number;
      char?: string;
      angle?: number;
      sway?: number;
      swaySpeed?: number;
    }

    const particles: Particle[] = [];

    // Initialize particles based on effect
    if (effect === 'sparkles') {
      // Golden stars sparkling in arbitrary locations
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 0.6 - 0.2,
          size: Math.random() * 4 + 2,
          color: `hsl(${45 + Math.random() * 15}, 100%, ${60 + Math.random() * 20}%)`, // Gold / Yellow
          alpha: Math.random(),
          decay: Math.random() * 0.01 + 0.005,
        });
      }
    } else if (effect === 'floatingEmojis') {
      const emojis = ['🎉', '❤️', '👏', '🎂', '🌟', '🙌', '✨', '🎈', '🥳'];
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: Math.random() * width,
          y: height + Math.random() * 100,
          vx: (Math.random() - 0.5) * 1,
          vy: -Math.random() * 1.5 - 1,
          size: Math.random() * 14 + 18,
          char: emojis[Math.floor(Math.random() * emojis.length)],
          alpha: 1,
          decay: Math.random() * 0.008 + 0.004,
          sway: Math.random() * 2 * Math.PI,
          swaySpeed: Math.random() * 0.02 + 0.01,
        });
      }
    } else if (effect === 'balloons') {
      const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: Math.random() * width,
          y: height + Math.random() * 150 + 50,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 1.2 - 0.8,
          size: Math.random() * 12 + 18, // Balloon radius
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.9,
          decay: Math.random() * 0.003 + 0.002,
          sway: Math.random() * 2 * Math.PI,
          swaySpeed: Math.random() * 0.015 + 0.005,
        });
      }
    }

    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, index) => {
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          // Recycle/respawn particle to keep the effect continuous while active
          p.alpha = 1;
          p.y = effect === 'sparkles' ? Math.random() * height : height + Math.random() * 50;
          p.x = Math.random() * width;
        }

        // Apply physics
        if (p.sway !== undefined && p.swaySpeed !== undefined) {
          p.sway += p.swaySpeed;
          p.x += Math.sin(p.sway) * 0.5;
        } else {
          p.x += p.vx;
        }
        p.y += p.vy;

        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (effect === 'sparkles') {
          ctx.fillStyle = p.color || '#fff';
          drawStar(p.x, p.y, 5, p.size, p.size / 2);
          ctx.fill();
        } else if (effect === 'floatingEmojis') {
          ctx.font = `${p.size}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.char || '', p.x, p.y);
        } else if (effect === 'balloons') {
          // Draw balloon
          ctx.fillStyle = p.color || '#ff0000';
          ctx.beginPath();
          // Balloon shape is slightly oval: ellipse
          ctx.ellipse(p.x, p.y, p.size * 0.8, p.size, 0, 0, 2 * Math.PI);
          ctx.fill();

          // Balloon tie/knot
          ctx.beginPath();
          ctx.moveTo(p.x, p.y + p.size);
          ctx.lineTo(p.x - 4, p.y + p.size + 6);
          ctx.lineTo(p.x + 4, p.y + p.size + 6);
          ctx.closePath();
          ctx.fillStyle = p.color || '#ff0000';
          ctx.fill();

          // String
          ctx.beginPath();
          ctx.moveTo(p.x, p.y + p.size + 6);
          // Swaying string
          const stringSway = Math.sin((p.sway || 0) * 2) * 5;
          ctx.bezierCurveTo(
            p.x + stringSway,
            p.y + p.size + 20,
            p.x - stringSway,
            p.y + p.size + 40,
            p.x,
            p.y + p.size + 60
          );
          ctx.strokeStyle = 'rgba(150, 150, 150, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [effect, isActive, reducedMotion]);

  if (effect === 'confetti' || reducedMotion || !isActive) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};

export default EffectsController;
