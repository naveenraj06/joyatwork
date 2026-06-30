import React, { useEffect, useState } from 'react';
import { useEmployeeMoments } from '../providers/EmployeeMomentsProvider';

interface Balloon {
  id: number;
  color: string;
  left: string;
  delay: string;
  duration: string;
  scale: number;
}

export const BalloonsEffect: React.FC = () => {
  const { reducedMotion } = useEmployeeMoments();
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    if (reducedMotion) return;

    const colors = [
      '#ef4444', // red
      '#3b82f6', // blue
      '#10b981', // emerald
      '#f59e0b', // amber
      '#ec4899', // pink
      '#8b5cf6', // purple
    ];

    const newBalloons = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${4 + Math.random() * 3}s`,
      scale: 0.8 + Math.random() * 0.4,
    }));

    setBalloons(newBalloons);
  }, [reducedMotion]);

  if (reducedMotion || balloons.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20" id="balloons-effect-container">
      <style>{`
        @keyframes balloon-rise {
          0% { transform: translateY(120%) rotate(0deg); opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.9; }
          100% { transform: translateY(-30%) rotate(10deg); opacity: 0; }
        }
        @keyframes balloon-sway {
          0%, 100% { margin-left: 0px; }
          50% { margin-left: 15px; }
        }
        .animate-balloon-rise {
          animation: balloon-rise linear infinite;
        }
        .animate-balloon-sway {
          animation: balloon-sway ease-in-out infinite alternate;
        }
      `}</style>
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute bottom-0 animate-balloon-rise"
          style={{
            left: balloon.left,
            animationDelay: balloon.delay,
            animationDuration: balloon.duration,
            transform: `scale(${balloon.scale})`,
          }}
        >
          <div className="animate-balloon-sway" style={{ animationDuration: '2.5s' }}>
            {/* Balloon Body */}
            <div
              className="relative w-12 h-14 rounded-full shadow-md"
              style={{
                backgroundColor: balloon.color,
                boxShadow: `inset -6px -8px 0 rgba(0,0,0,0.15), 0 4px 6px rgba(0,0,0,0.1)`,
              }}
            >
              {/* Highlight */}
              <div className="absolute top-2 left-2 w-3 h-4 bg-white/30 rounded-full" />
              
              {/* Balloon Tie */}
              <div
                className="absolute bottom-[-4px] left-[20px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px]"
                style={{ borderBottomColor: balloon.color }}
              />
              
              {/* Balloon String */}
              <svg className="absolute bottom-[-40px] left-[22px] w-4 h-10 overflow-visible text-gray-400" viewBox="0 0 10 40">
                <path
                  d="M5,0 Q8,10 2,20 T5,40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="2,2"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BalloonsEffect;
