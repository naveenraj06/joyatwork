import React, { useEffect, useState } from 'react';
import { useEmployeeMoments } from '../providers/EmployeeMomentsProvider';

interface EmojiBubble {
  id: number;
  emoji: string;
  left: string;
  delay: string;
  duration: string;
  size: string;
}

export const FloatingEmojisEffect: React.FC = () => {
  const { reducedMotion } = useEmployeeMoments();
  const [emojis, setEmojis] = useState<EmojiBubble[]>([]);

  useEffect(() => {
    if (reducedMotion) return;

    const emojiPool = ['🎉', '💖', '👏', '🥳', '✨', '🎂', '🙌', '🌟'];
    const newEmojis = Array.from({ length: 15 }).map((_, i) => {
      const emoji = emojiPool[Math.floor(Math.random() * emojiPool.length)];
      return {
        id: i,
        emoji,
        left: `${Math.random() * 80 + 10}%`,
        delay: `${Math.random() * 2.5}s`,
        duration: `${3 + Math.random() * 2}s`,
        size: `${Math.random() * 16 + 18}px`,
      };
    });

    setEmojis(newEmojis);
  }, [reducedMotion]);

  if (reducedMotion || emojis.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20" id="floating-emojis-container">
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(110%) scale(0.5); opacity: 0; }
          10% { opacity: 0.85; }
          90% { opacity: 0.85; }
          100% { transform: translateY(-20%) scale(1.1); opacity: 0; }
        }
        .animate-float-up {
          animation: float-up linear infinite;
        }
      `}</style>
      {emojis.map((bubble) => (
        <span
          key={bubble.id}
          className="absolute animate-float-up select-none bottom-0"
          style={{
            left: bubble.left,
            fontSize: bubble.size,
            animationDelay: bubble.delay,
            animationDuration: bubble.duration,
          }}
        >
          {bubble.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingEmojisEffect;
