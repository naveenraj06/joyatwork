import React, { useEffect, useState } from 'react';
import { useEmployeeMoments } from '../providers/EmployeeMomentsProvider';

interface Sparkle {
  id: number;
  top: string;
  left: string;
  size: string;
  delay: string;
}

export const SparklesEffect: React.FC = () => {
  const { reducedMotion } = useEmployeeMoments();
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (reducedMotion) return;

    // Generate 12 random sparkles inside the container
    const newSparkles = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      size: `${Math.random() * 12 + 8}px`,
      delay: `${Math.random() * 2}s`,
    }));

    setSparkles(newSparkles);
  }, [reducedMotion]);

  if (reducedMotion || sparkles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20" id="sparkles-container">
      <style>{`
        @keyframes sparkle-animation {
          0%, 100% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1); opacity: 0.85; }
        }
        .animate-sparkle {
          animation: sparkle-animation 2.2s ease-in-out infinite;
        }
      `}</style>
      {sparkles.map((sparkle) => (
        <svg
          key={sparkle.id}
          className="absolute text-yellow-400 fill-current animate-sparkle"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: sparkle.delay,
          }}
          viewBox="0 0 24 24"
        >
          <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
        </svg>
      ))}
    </div>
  );
};

export default SparklesEffect;
