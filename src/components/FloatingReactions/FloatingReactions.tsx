import React, { useState, useEffect } from 'react';

interface FloatingReaction {
  id: string;
  emoji: string;
  left: number; // percentage left
  sway1: string;
  sway2: string;
  sway3: string;
  rot1: string;
  rot2: string;
  rot3: string;
  duration: number; // random duration in ms
  size: number; // random font size
}

export const FloatingReactions: React.FC<{ eventId?: string }> = ({ eventId }) => {
  const [reactions, setReactions] = useState<FloatingReaction[]>([]);

  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEv = e as CustomEvent<{ emoji: string; eventId?: string }>;
      
      const triggeredEventId = customEv.detail?.eventId;
      
      // If both eventIds are specified, check if they match to avoid spilling reactions into other cards
      if (eventId && triggeredEventId && triggeredEventId !== eventId) {
        return;
      }
      
      const emoji = customEv.detail?.emoji || '❤️';
      
      // Spawn a burst of 3 to 5 floating emojis for that lush, high-fidelity cascade feeling
      const count = Math.floor(Math.random() * 3) + 3; // 3 to 5 emojis per click
      const now = Date.now();
      
      const newReactions = Array.from({ length: count }).map((_, idx) => {
        // Distribute starting position around the right-hand side (like Instagram Live)
        const leftOffset = Math.random() * 35 + 50; // Between 50% and 85% width
        
        // Randomize sway trajectories
        const sway1 = `${(Math.random() - 0.4) * 50}px`;
        const sway2 = `${(Math.random() - 0.6) * 100}px`;
        const sway3 = `${(Math.random() - 0.5) * 140}px`;
        
        // Randomize 3D rotations
        const rot1 = `${(Math.random() - 0.5) * 35}deg`;
        const rot2 = `${(Math.random() - 0.5) * 80}deg`;
        const rot3 = `${(Math.random() - 0.5) * 160}deg`;
        
        const duration = 2000 + Math.random() * 800; // 2.0s to 2.8s
        const size = 22 + Math.random() * 16; // 22px to 38px
        
        return {
          id: `${now}-${idx}-${Math.random()}`,
          emoji,
          left: leftOffset,
          sway1,
          sway2,
          sway3,
          rot1,
          rot2,
          rot3,
          duration,
          size,
        };
      });

      setReactions((prev) => [...prev, ...newReactions]);
    };

    window.addEventListener('reaction-trigger', handleTrigger);
    return () => {
      window.removeEventListener('reaction-trigger', handleTrigger);
    };
  }, [eventId]);

  // Clean up expired reactions from state to keep DOM light and responsive
  useEffect(() => {
    if (reactions.length === 0) return;
    
    const interval = setInterval(() => {
      const now = Date.now();
      setReactions((prev) =>
        prev.filter((r) => {
          const timestamp = parseInt(r.id.split('-')[0], 10);
          return now - timestamp < r.duration + 200; // safety margin
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [reactions]);

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-visible z-[100]" 
      aria-hidden="true"
    >
      {reactions.map((r) => (
        <span
          key={r.id}
          className="absolute bottom-24 select-none animate-instagram-float filter drop-shadow-md"
          style={{
            left: `${r.left}%`,
            fontSize: `${r.size}px`,
            animationDuration: `${r.duration}ms`,
            // Inject random trajectories as CSS variables to feed our keyframes
            // @ts-ignore
            '--sway-1': r.sway1,
            '--sway-2': r.sway2,
            '--sway-3': r.sway3,
            '--rot-1': r.rot1,
            '--rot-2': r.rot2,
            '--rot-3': r.rot3,
          }}
        >
          {r.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingReactions;
