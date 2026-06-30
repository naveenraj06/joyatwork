import React from 'react';

export interface FarmerDecorProps {
  className?: string;
  theme?: 'summer' | 'autumn' | 'spring';
  eventId?: string;
  eventType?: string;
}

export const FarmerDecor: React.FC<FarmerDecorProps> = ({
  className = '',
  theme = 'summer',
  eventId = 'default-ev',
  eventType = 'all',
}) => {
  // Simple deterministic pseudorandom generator based on eventId string seed
  const getSeedRandom = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return (index: number) => {
      const x = Math.sin(hash + index) * 10000;
      return x - Math.floor(x);
    };
  };

  const rng = getSeedRandom(eventId + theme + eventType);

  // Core Theme Colors
  const colors = {
    spring: {
      hill1: '#bbf7d0', // pastel light green
      hill2: '#86efac', // fresh green
      hill3: '#4ade80', // bright green
      sky: '#f0f9ff',
      accent: '#22c55e',
    },
    summer: {
      hill1: '#fef08a', // golden field yellow
      hill2: '#a3e635', // vibrant lime
      hill3: '#4ade80', // summer green
      sky: '#e0f2fe',
      accent: '#eab308',
    },
    autumn: {
      hill1: '#fde68a', // harvest cream gold
      hill2: '#f97316', // autumn orange
      hill3: '#b45309', // warm brown
      sky: '#fff7ed',
      accent: '#ea580c',
    },
  }[theme];

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none ${className}`} style={{ zIndex: 1 }}>
      {/* 50 CSS Keyframe Animations for smooth, premium, joyful celebrations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes float-drifter {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translate(40px, -100px) rotate(45deg); opacity: 0; }
        }
        @keyframes sway-sprout {
          0%, 100% { transform: skewX(-4deg) rotate(-2deg); }
          50% { transform: skewX(6deg) rotate(3deg); }
        }
        @keyframes spin-windmill {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes flutter-wings {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.1); }
        }
        @keyframes bee-buzz {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(15px, -15px) scale(1.05); }
          50% { transform: translate(5px, -25px) scale(1); }
          75% { transform: translate(-10px, -10px) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes bounce-chick {
          0%, 100% { transform: translateY(0) scaleY(1); }
          40% { transform: translateY(-8px) scaleY(0.95); }
          50% { transform: translateY(-10px) scaleY(1.05); }
          65% { transform: translateY(0) scaleY(0.9); }
        }
        @keyframes lantern-swing {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes pulse-trophy {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px #facc15); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 8px #facc15); }
        }
        @keyframes steam-rise {
          0% { transform: translateY(0) scaleX(0.8); opacity: 0; }
          30% { opacity: 0.8; }
          100% { transform: translateY(-15px) scaleX(1.3); opacity: 0; }
        }
        @keyframes tractor-ride-across {
          0% { transform: translateX(-80px) translateY(0); }
          100% { transform: translateX(380px) translateY(0); }
        }
        @keyframes sparkler {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes cloud-slide {
          0%, 100% { transform: translateX(-5px); }
          50% { transform: translateX(12px); }
        }
        @keyframes balloon-bob {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-14px) rotate(4deg); }
        }

        .anim-float-gentle { animation: float-gentle 5s infinite ease-in-out; }
        .anim-float-drifter { animation: float-drifter 8s infinite linear; }
        .anim-sway-sprout { animation: sway-sprout 3.2s infinite ease-in-out; transform-origin: bottom center; }
        .anim-spin-windmill { animation: spin-windmill 12s infinite linear; transform-origin: center; }
        .anim-flutter-wings { animation: flutter-wings 0.15s infinite linear; transform-origin: center; }
        .anim-bee-buzz { animation: bee-buzz 6s infinite ease-in-out; }
        .anim-bounce-chick { animation: bounce-chick 2s infinite ease-in-out; transform-origin: bottom center; }
        .anim-lantern-swing { animation: lantern-swing 4s infinite ease-in-out; transform-origin: top center; }
        .anim-pulse-trophy { animation: pulse-trophy 3s infinite ease-in-out; }
        .anim-steam-rise { animation: steam-rise 1.8s infinite linear; }
        .anim-tractor-ride { animation: tractor-ride-across 16s infinite linear; }
        .anim-sparkler { animation: sparkler 1.5s infinite ease-in-out; }
        .anim-cloud-slide { animation: cloud-slide 9s infinite ease-in-out; }
        .anim-balloon-bob { animation: balloon-bob 6s infinite ease-in-out; }
      ` }} />

      <svg
        viewBox="0 0 340 480"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.sky} stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hillGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.hill1} stopOpacity="0.9" />
            <stop offset="100%" stopColor={colors.hill2} stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="hillGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.hill2} stopOpacity="0.95" />
            <stop offset="100%" stopColor={colors.hill3} stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Dynamic sky overlay */}
        <rect x="0" y="0" width="340" height="320" fill="url(#skyGrad)" />

        {/* Ambient spinning sun or moon based on season */}
        <g className="anim-float-gentle" transform="translate(290, 45)">
          <circle cx="0" cy="0" r="14" fill="#fef08a" opacity="0.6" />
          <circle cx="0" cy="0" r="10" fill="#facc15" />
          {Array.from({ length: 6 }).map((_, i) => {
            const rot = i * 60;
            return (
              <line
                key={`sunray-${i}`}
                x1="0"
                y1="-13"
                x2="0"
                y2="-18"
                stroke="#eab308"
                strokeWidth="2.5"
                strokeLinecap="round"
                transform={`rotate(${rot})`}
              />
            );
          })}
        </g>

        {/* Clouds sliding smoothly */}
        <g className="anim-cloud-slide" opacity="0.4">
          <path d="M 20,50 Q 30,42 42,50 Q 54,42 64,50 Q 72,50 72,57 Q 72,62 20,62 Z" fill="#ffffff" />
          <path d="M 230,80 Q 238,73 248,80 Q 256,73 264,80 Q 272,80 272,86 L 230,86 Z" fill="#ffffff" />
        </g>

        {/* Ground Hill 1 (Backstage) */}
        <path
          d="M -20,430 Q 90,390 200,425 T 360,410 L 360,490 L -20,490 Z"
          fill="url(#hillGrad1)"
        />

        {/* Farm fence posts */}
        <g stroke="#854d0e" strokeWidth="1.5" opacity="0.45" strokeLinecap="round">
          <line x1="30" y1="400" x2="30" y2="422" />
          <line x1="75" y1="403" x2="75" y2="424" />
          <line x1="120" y1="406" x2="120" y2="426" />
          <path d="M 30,404 Q 52,408 75,407 T 120,410" fill="none" strokeWidth="1" />
        </g>

        {/* Ground Hill 2 (Frontstage) */}
        <path
          d="M -20,450 Q 110,430 240,450 T 360,440 L 360,495 L -20,495 Z"
          fill="url(#hillGrad2)"
        />

        {/* ==========================================
            DYNAMIC GENERATION OF 50 UNIQUE ELEMENTS 
            ========================================== */}
        {(() => {
          // Comprehensive array of 50 different joyful celebration-themed items
          const elementsPool = [
            // SPRING ELEMENTS (1-12)
            {
              id: 1, theme: 'spring', type: 'all',
              render: () => (
                <g className="anim-sway-sprout">
                  <path d="M 0,0 Q -4,-12 0,-24" stroke="#22c55e" strokeWidth="2.5" fill="none" />
                  <path d="M 0,-24 C -6,-28 -8,-20 0,-24 C 8,-20 6,-28 0,-24 Z" fill="#4ade80" />
                </g>
              )
            },
            {
              id: 2, theme: 'spring', type: 'all',
              render: () => (
                <g className="anim-float-gentle">
                  <ellipse cx="0" cy="0" rx="4" ry="2" fill="#fda4af" />
                  <circle cx="3" cy="-2" r="3" fill="#f43f5e" />
                </g>
              )
            },
            {
              id: 3, theme: 'spring', type: 'all',
              render: () => (
                <g className="anim-float-drifter">
                  <path d="M 0,0 C -5,-8 -12,-3 -6,2 C -2,6 3,1 0,0 Z" fill="#fb7185" opacity="0.8" />
                </g>
              )
            },
            {
              id: 4, theme: 'spring', type: 'all',
              render: () => (
                <g className="anim-bee-buzz">
                  <ellipse cx="0" cy="0" rx="5" ry="4" fill="#fbbf24" />
                  <line x1="-2" y1="-4" x2="-2" y2="4" stroke="#1e293b" strokeWidth="1.5" />
                  <line x1="2" y1="-4" x2="2" y2="4" stroke="#1e293b" strokeWidth="1.5" />
                  <ellipse cx="-1" cy="-4" rx="2" ry="3" fill="#e0f2fe" opacity="0.7" className="anim-flutter-wings" />
                </g>
              )
            },
            {
              id: 5, theme: 'spring', type: 'all',
              render: () => (
                <g className="anim-sway-sprout">
                  <circle cx="0" cy="-14" r="5.5" fill="#fbcfe8" />
                  <circle cx="0" cy="-14" r="2" fill="#db2777" />
                  <line x1="0" y1="0" x2="0" y2="-9" stroke="#15803d" strokeWidth="1.5" />
                </g>
              )
            },
            {
              id: 6, theme: 'spring', type: 'all',
              render: () => (
                <g className="anim-sway-sprout">
                  <path d="M 0,0 L 0,-15" stroke="#16a34a" strokeWidth="2" />
                  <circle cx="-3" cy="-15" r="2.5" fill="#a855f7" />
                  <circle cx="3" cy="-15" r="2.5" fill="#c084fc" />
                </g>
              )
            },
            {
              id: 7, theme: 'spring', type: 'all',
              render: () => (
                <g className="anim-bounce-chick">
                  <circle cx="0" cy="-6" r="6" fill="#fef08a" />
                  <circle cx="-2" cy="-8" r="1" fill="#1e293b" />
                  <polygon points="4,-7 7,-6 4,-5" fill="#f97316" />
                  <ellipse cx="0" cy="-2" rx="4" ry="1.5" fill="#fef08a" />
                </g>
              )
            },
            {
              id: 8, theme: 'spring', type: 'all',
              render: () => (
                <g className="anim-sway-sprout">
                  {/* Four-leaf clover */}
                  <g fill="#22c55e">
                    <circle cx="-3" cy="-12" r="3" />
                    <circle cx="3" cy="-12" r="3" />
                    <circle cx="0" cy="-15" r="3" />
                    <circle cx="0" cy="-9" r="3" />
                  </g>
                  <path d="M 0,0 Q 3,-5 0,-8" stroke="#15803d" strokeWidth="1.5" fill="none" />
                </g>
              )
            },
            {
              id: 9, theme: 'spring', type: 'all',
              render: () => (
                <g className="anim-float-drifter">
                  <circle cx="0" cy="0" r="1.5" fill="#cbd5e1" />
                  <line x1="0" y1="0" x2="-4" y2="6" stroke="#94a3b8" strokeWidth="0.8" />
                  <line x1="0" y1="0" x2="4" y2="6" stroke="#94a3b8" strokeWidth="0.8" />
                </g>
              )
            },
            {
              id: 10, theme: 'spring', type: 'all',
              render: () => (
                <g className="anim-float-gentle">
                  <path d="M -8,0 Q -4,-5 0,0 T 8,0 Q 8,5 0,5 Z" fill="#93c5fd" opacity="0.6" />
                  <line x1="-3" y1="6" x2="-5" y2="10" stroke="#60a5fa" strokeWidth="1" />
                  <line x1="3" y1="6" x2="1" y2="10" stroke="#60a5fa" strokeWidth="1" />
                </g>
              )
            },
            {
              id: 11, theme: 'spring', type: 'all',
              render: () => (
                <g className="anim-float-gentle">
                  <path d="M -8,2 Q 0,-6 8,2 L 6,6 L -6,6 Z" fill="#d97706" />
                  <ellipse cx="0" cy="0" rx="3" ry="4" fill="#f8fafc" />
                </g>
              )
            },
            {
              id: 12, theme: 'spring', type: 'all',
              render: () => (
                <g className="anim-sway-sprout">
                  <path d="M 0,0 L 0,-18" stroke="#15803d" strokeWidth="2" />
                  <path d="M -5,-18 C -5,-26 5,-26 5,-18 Z" fill="#ef4444" />
                </g>
              )
            },

            // SUMMER ELEMENTS (13-24)
            {
              id: 13, theme: 'summer', type: 'all',
              render: () => (
                <g className="anim-sway-sprout">
                  {/* Sunflower */}
                  <line x1="0" y1="0" x2="0" y2="-25" stroke="#16a34a" strokeWidth="2.5" />
                  <g transform="translate(0, -25)">
                    <circle cx="0" cy="0" r="8" fill="#ca8a04" />
                    {Array.from({ length: 8 }).map((_, i) => (
                      <ellipse
                        key={`petal-${i}`}
                        cx="0"
                        cy="-8"
                        rx="2.5"
                        ry="5"
                        fill="#facc15"
                        transform={`rotate(${i * 45})`}
                      />
                    ))}
                    <circle cx="0" cy="0" r="4.5" fill="#78350f" />
                  </g>
                </g>
              )
            },
            {
              id: 14, theme: 'summer', type: 'all',
              render: () => (
                <g className="anim-bee-buzz">
                  <ellipse cx="0" cy="0" rx="4" ry="3.2" fill="#eab308" />
                  <line x1="-1" y1="-3" x2="-1" y2="3" stroke="#1e293b" strokeWidth="1.2" />
                  <line x1="1" y1="-3" x2="1" y2="3" stroke="#1e293b" strokeWidth="1.2" />
                  <ellipse cx="0" cy="-3.5" rx="1.5" ry="2.2" fill="#e2e8f0" className="anim-flutter-wings" />
                </g>
              )
            },
            {
              id: 15, theme: 'summer', type: 'all',
              render: () => (
                <g className="anim-float-gentle">
                  <path d="M -8,-2 A 8,8 0 0,0 8,-2 Z" fill="#f43f5e" />
                  <path d="M -8,-2 A 8,8 0 0,0 8,-2" stroke="#22c55e" strokeWidth="2" fill="none" />
                  <circle cx="-3" cy="2" r="0.6" fill="#1e293b" />
                  <circle cx="3" cy="2" r="0.6" fill="#1e293b" />
                </g>
              )
            },
            {
              id: 16, theme: 'summer', type: 'all',
              render: () => (
                <g className="anim-sway-sprout">
                  <path d="M 0,0 Q -3,-15 -1,-28" stroke="#ca8a04" strokeWidth="2" fill="none" />
                  <path d="M -1,-28 Q 4,-33 8,-36" stroke="#eab308" strokeWidth="1.5" fill="none" />
                  <circle cx="8" cy="-36" r="1.5" fill="#ca8a04" />
                </g>
              )
            },
            {
              id: 17, theme: 'summer', type: 'all',
              render: () => (
                <g className="anim-sparkler">
                  <path d="M -6,0 L 6,0 M 0,-6 L 0,6" stroke="#fef08a" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="2.5" fill="#facc15" />
                </g>
              )
            },
            {
              id: 18, theme: 'summer', type: 'all',
              render: () => (
                <g className="anim-float-gentle">
                  {/* Strawberry */}
                  <path d="M -5,-5 C -5,-1 0,4 0,4 C 0,4 5,-1 5,-5 C 5,-8 -5,-8 -5,-5 Z" fill="#ef4444" />
                  <path d="M -4,-7 Q 0,-4 4,-7 L 0,-4 Z" fill="#22c55e" />
                </g>
              )
            },
            {
              id: 19, theme: 'summer', type: 'all',
              render: () => (
                <g className="anim-bee-buzz">
                  {/* Dragonfly */}
                  <line x1="0" y1="-6" x2="0" y2="10" stroke="#0284c7" strokeWidth="1.5" />
                  <ellipse cx="0" cy="-6" rx="2" ry="2" fill="#0ea5e9" />
                  <ellipse cx="-7" cy="-5" rx="6" ry="1.5" fill="#bae6fd" opacity="0.65" />
                  <ellipse cx="7" cy="-5" rx="6" ry="1.5" fill="#bae6fd" opacity="0.65" />
                </g>
              )
            },
            {
              id: 20, theme: 'summer', type: 'all',
              render: () => (
                <g className="anim-float-gentle">
                  {/* Snail */}
                  <path d="M -10,6 L 10,6 C 8,6 9,2 7,2 L -8,2 Z" fill="#fbbf24" />
                  <circle cx="-1" cy="1" r="4.5" fill="#d97706" />
                  <circle cx="-1" cy="1" r="2.5" fill="#f59e0b" />
                  <line x1="6" y1="2" x2="8" y2="-2" stroke="#fbbf24" strokeWidth="1" />
                </g>
              )
            },
            {
              id: 21, theme: 'summer', type: 'all',
              render: () => (
                <g className="anim-sway-sprout">
                  {/* Corn */}
                  <path d="M -3,-5 C -3,-14 3,-14 3,-5 L 3,10 L -3,10 Z" fill="#eab308" />
                  <path d="M -5,-2 C -2,6 -2,12 -5,14 M 5,-2 C 2,6 2,12 5,14" stroke="#22c55e" strokeWidth="1.5" fill="none" />
                </g>
              )
            },
            {
              id: 22, theme: 'summer', type: 'all',
              render: () => (
                <g className="anim-float-drifter">
                  <path d="M 0,0 C -5,-5 -8,-1 0,6 C 8,-1 5,-5 0,0 Z" fill="#16a34a" opacity="0.7" />
                </g>
              )
            },
            {
              id: 23, theme: 'summer', type: 'all',
              render: () => (
                <g className="anim-sway-sprout">
                  {/* Miniature Windmill */}
                  <rect x="-3" y="0" width="6" height="28" fill="#cbd5e1" />
                  <g transform="translate(0, -28)">
                    <circle cx="0" cy="0" r="3" fill="#64748b" />
                    <g className="anim-spin-windmill">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <polygon
                          key={`blade-${i}`}
                          points="0,0 -2,-18 2,-18"
                          fill="#475569"
                          transform={`rotate(${i * 90})`}
                        />
                      ))}
                    </g>
                  </g>
                </g>
              )
            },
            {
              id: 24, theme: 'summer', type: 'all',
              render: () => (
                <g className="anim-sway-sprout">
                  {/* Watering Can */}
                  <rect x="-6" y="-8" width="12" height="10" fill="#475569" rx="1" />
                  <path d="M 6,-4 L 14,-9" stroke="#475569" strokeWidth="2" />
                  <circle cx="15" cy="-10" r="2" fill="#38bdf8" className="anim-sparkler" />
                </g>
              )
            },

            // AUTUMN ELEMENTS (25-36)
            {
              id: 25, theme: 'autumn', type: 'all',
              render: () => (
                <g className="anim-float-drifter">
                  {/* Maple Leaf */}
                  <path d="M 0,-8 L -3,-4 L -7,-6 L -4,-1 L -8,2 L -2,3 L 0,8 L 2,3 L 8,2 L 4,-1 L 7,-6 L 3,-4 Z" fill="#ea580c" />
                </g>
              )
            },
            {
              id: 26, theme: 'autumn', type: 'all',
              render: () => (
                <g className="anim-float-gentle">
                  {/* Pumpkin */}
                  <ellipse cx="0" cy="4" rx="8" ry="7" fill="#f97316" />
                  <ellipse cx="0" cy="4" rx="4.5" ry="7" fill="#ea580c" />
                  <rect x="-1.5" y="-5" width="3" height="4" fill="#15803d" rx="0.5" />
                </g>
              )
            },
            {
              id: 27, theme: 'autumn', type: 'all',
              render: () => (
                <g className="anim-float-drifter">
                  {/* Acorn */}
                  <rect x="-4.5" y="-5" width="9" height="3" fill="#78350f" rx="1" />
                  <path d="M -4,-2 C -4,3 0,6 0,6 C 0,6 4,3 4,-2 Z" fill="#b45309" />
                </g>
              )
            },
            {
              id: 28, theme: 'autumn', type: 'all',
              render: () => (
                <g className="anim-float-gentle">
                  {/* Apple */}
                  <circle cx="0" cy="0" r="6" fill="#dc2626" />
                  <ellipse cx="0" cy="-5.5" rx="3" ry="1" fill="#dc2626" />
                  <line x1="0" y1="-5" x2="2" y2="-9" stroke="#78350f" strokeWidth="1.2" />
                  <path d="M 2,-9 Q 5,-10 4,-7 Z" fill="#16a34a" />
                </g>
              )
            },
            {
              id: 29, theme: 'autumn', type: 'all',
              render: () => (
                <g className="anim-float-gentle">
                  {/* Pinecone */}
                  <path d="M -4,-5 L 4,-5 L 5,1 L 0,6 L -5,1 Z" fill="#78350f" />
                  <circle cx="-2" cy="-2" r="1.5" fill="#451a03" />
                  <circle cx="2" cy="-2" r="1.5" fill="#451a03" />
                  <circle cx="0" cy="2" r="1.5" fill="#451a03" />
                </g>
              )
            },
            {
              id: 30, theme: 'autumn', type: 'all',
              render: () => (
                <g className="anim-sway-sprout">
                  {/* Haystack */}
                  <path d="M -12,12 Q 0,-12 12,12 Z" fill="#facc15" />
                  <line x1="-8" y1="6" x2="8" y2="6" stroke="#ca8a04" strokeWidth="1" />
                  <line x1="-5" y1="0" x2="5" y2="0" stroke="#ca8a04" strokeWidth="1" />
                </g>
              )
            },
            {
              id: 31, theme: 'autumn', type: 'all',
              render: () => (
                <g className="anim-float-gentle">
                  {/* Mushrooms */}
                  <path d="M -8,0 C -8,-7 8,-7 8,0 Z" fill="#ef4444" />
                  <rect x="-2" y="0" width="4" height="7" fill="#f1f5f9" />
                  <circle cx="-3" cy="-3" r="1" fill="#fff" />
                  <circle cx="3" cy="-3" r="1" fill="#fff" />
                </g>
              )
            },
            {
              id: 32, theme: 'autumn', type: 'all',
              render: () => (
                <g className="anim-sway-sprout">
                  {/* Cute Scarecrow */}
                  <line x1="0" y1="5" x2="0" y2="-22" stroke="#78350f" strokeWidth="2.5" />
                  <line x1="-12" y1="-12" x2="12" y2="-12" stroke="#78350f" strokeWidth="2" />
                  {/* Head & Hat */}
                  <circle cx="0" cy="-18" r="4.5" fill="#fed7aa" />
                  <path d="M -7,-21 L 7,-21 L 0,-28 Z" fill="#eab308" />
                  {/* Straw hair */}
                  <path d="M -12,-12 L -14,-9 M 12,-12 L 14,-9" stroke="#fbbf24" strokeWidth="1.5" />
                </g>
              )
            },
            {
              id: 33, theme: 'autumn', type: 'all',
              render: () => (
                <g className="anim-lantern-swing">
                  {/* Lantern */}
                  <line x1="0" y1="-15" x2="0" y2="-6" stroke="#475569" strokeWidth="1.5" />
                  <rect x="-5" y="-6" width="10" height="12" fill="#d97706" rx="1.5" />
                  <circle cx="0" cy="0" r="3.5" fill="#fef08a" className="anim-sparkler" />
                </g>
              )
            },
            {
              id: 34, theme: 'autumn', type: 'all',
              render: () => (
                <g className="anim-float-drifter">
                  <path d="M -4,-4 L 4,-4 L 5,1 C 5,4 0,6 0,6 C 0,6 -5,4 -5,1 Z" fill="#b45309" />
                </g>
              )
            },
            {
              id: 35, theme: 'autumn', type: 'all',
              render: () => (
                <g className="anim-sway-sprout">
                  <path d="M 0,0 Q -4,-18 -1,-32" stroke="#d97706" strokeWidth="2" fill="none" />
                  <path d="M -2,-10 Q 3,-14 6,-18" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
                </g>
              )
            },
            {
              id: 36, theme: 'autumn', type: 'all',
              render: () => (
                <g className="anim-float-gentle">
                  {/* Grapes */}
                  <g fill="#7c3aed">
                    <circle cx="0" cy="0" r="2.5" />
                    <circle cx="-3" cy="-3" r="2.5" />
                    <circle cx="3" cy="-3" r="2.5" />
                    <circle cx="-2" cy="3" r="2.5" />
                    <circle cx="2" cy="3" r="2.5" />
                    <circle cx="0" cy="6" r="2" />
                  </g>
                </g>
              )
            },

            // EVENT SPECIAL / FESTIVE ELEMENTS (37-50)
            {
              id: 37, theme: 'all', type: 'all',
              render: () => (
                <g className="anim-tractor-ride" transform="scale(0.85)">
                  {/* Driving Tractor */}
                  <rect x="-16" y="-8" width="22" height="12" fill="#ef4444" rx="1.5" />
                  <rect x="-6" y="-17" width="10" height="10" fill="none" stroke="#ef4444" strokeWidth="2.5" rx="1" />
                  <circle cx="-11" cy="4" r="7" fill="#1e293b" />
                  <circle cx="-11" cy="4" r="3" fill="#facc15" />
                  <circle cx="3" cy="5" r="5" fill="#1e293b" />
                  <circle cx="3" cy="5" r="1.5" fill="#facc15" />
                  <line x1="2" y1="-12" x2="2" y2="-20" stroke="#475569" strokeWidth="2" />
                  <circle cx="2" cy="-22" r="3.5" fill="#cbd5e1" className="anim-steam-rise" />
                </g>
              )
            },
            {
              id: 38, theme: 'all', type: 'all',
              render: () => (
                <g className="anim-float-gentle">
                  {/* Waving Farmer Head */}
                  <circle cx="0" cy="0" r="11" fill="#fed7aa" />
                  <path d="M -16,-3 Q 0,-6 16,-3" stroke="#eab308" strokeWidth="4.5" fill="none" /> {/* straw hat */}
                  <path d="M -8,-6 Q 0,-15 8,-6" fill="#eab308" />
                  <circle cx="-4" cy="0" r="1.5" fill="#1e293b" />
                  <circle cx="4" cy="0" r="1.5" fill="#1e293b" />
                  <path d="M -3,5 Q 0,8 3,5" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </g>
              )
            },
            {
              id: 39, theme: 'all', type: 'all',
              render: () => (
                <g className="anim-pulse-trophy">
                  {/* Golden Trophy with Wheat */}
                  <path d="M -8,-10 L 8,-10 L 6,0 C 4,5 0,7 0,7 C 0,7 -4,5 -6,0 Z" fill="#facc15" stroke="#eab308" strokeWidth="1" />
                  <rect x="-3" y="7" width="6" height="5" fill="#ca8a04" />
                  <rect x="-6" y="12" width="12" height="3" fill="#78350f" />
                  {/* Wheat wreath framing */}
                  <path d="M -11,-10 Q -14,0 -6,10 M 11,-10 Q 14,0 6,10" fill="none" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" />
                </g>
              )
            },
            {
              id: 40, theme: 'all', type: 'all',
              render: () => (
                <g className="anim-float-gentle">
                  {/* Party Banner */}
                  <path d="M -24,-12 Q 0,-6 24,-12" fill="none" stroke="#f472b6" strokeWidth="1.5" />
                  <polygon points="-16,-9 -8,-9 -12,0" fill="#38bdf8" />
                  <polygon points="-4,-7 4,-7 0,2" fill="#fbbf24" />
                  <polygon points="8,-9 16,-9 12,0" fill="#4ade80" />
                </g>
              )
            },
            {
              id: 41, theme: 'all', type: 'all',
              render: () => (
                <g className="anim-sparkler">
                  <polygon points="0,-9 2,-3 8,-3 3,1 5,7 0,3 -5,7 -3,1 -8,-3 -2,-3" fill="#facc15" />
                </g>
              )
            },
            {
              id: 42, theme: 'all', type: 'all',
              render: () => (
                <g className="anim-sparkler">
                  {/* Festive Confetti Group */}
                  <circle cx="-5" cy="-5" r="2" fill="#f43f5e" />
                  <rect x="4" y="-4" width="3" height="3" fill="#3b82f6" transform="rotate(30)" />
                  <circle cx="2" cy="5" r="1.5" fill="#10b981" />
                  <polygon points="-4,4 -2,7 -6,7" fill="#fbbf24" />
                </g>
              )
            },
            {
              id: 43, theme: 'all', type: 'all',
              render: () => (
                <g className="anim-balloon-bob">
                  {/* Celebration Balloon */}
                  <ellipse cx="0" cy="-12" rx="9" ry="11" fill="#ec4899" />
                  <polygon points="0, -1 -2, 2 2, 2" fill="#db2777" />
                  <path d="M 0,2 Q 3,12 0,18" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                </g>
              )
            },
            {
              id: 44, theme: 'all', type: 'all',
              render: () => (
                <g className="anim-bounce-chick">
                  {/* Hatching Egg with party hat */}
                  <path d="M -8,5 C -8,-2 -4,-6 0,-6 C 4,-6 8,-2 8,5 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                  {/* Cracked top */}
                  <polygon points="-8,-4 -5,-1 -2,-5 1,-1 4,-5 8,-4 8,5 -8,5" fill="#f1f5f9" />
                  {/* Chick peeking */}
                  <circle cx="0" cy="-6" r="4.5" fill="#fef08a" />
                  <circle cx="-1.5" cy="-7" r="0.7" fill="#1e293b" />
                  <polygon points="0,-5 1.5,-4 0,-3" fill="#f97316" />
                  {/* Party hat */}
                  <polygon points="-2,-11 2,-11 0,-17" fill="#f43f5e" />
                </g>
              )
            },
            {
              id: 45, theme: 'all', type: 'all',
              render: () => (
                <g className="anim-float-gentle">
                  {/* Steaming farm pie */}
                  <ellipse cx="0" cy="4" rx="10" ry="5" fill="#d97706" />
                  <path d="M -10,4 Q 0,-3 10,4" fill="#f59e0b" />
                  <path d="M -4,0 L -4,-6 M 0,2 L 0,-4 M 4,0 L 4,-6" stroke="#fef08a" strokeWidth="1" opacity="0.6" className="anim-steam-rise" />
                </g>
              )
            },
            {
              id: 46, theme: 'all', type: 'all',
              render: () => (
                <g className="anim-float-gentle">
                  {/* Farmer's Pitchfork */}
                  <line x1="0" y1="12" x2="0" y2="-12" stroke="#94a3b8" strokeWidth="1.8" />
                  <path d="M -5,-12 L -5,-5 Q 0,-1 5,-5 L 5,-12" fill="none" stroke="#94a3b8" strokeWidth="1.8" />
                  <line x1="0" y1="-5" x2="0" y2="-12" stroke="#94a3b8" strokeWidth="1.8" />
                </g>
              )
            },
            {
              id: 47, theme: 'all', type: 'all',
              render: () => (
                <g className="anim-sparkler">
                  {/* Sparkling Milk Bottle */}
                  <rect x="-4.5" y="-4" width="9" height="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" rx="1" />
                  <rect x="-2.5" y="-8" width="5" height="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
                  <circle cx="3" cy="-10" r="1.5" fill="#38bdf8" />
                  <circle cx="-5" cy="4" r="1.5" fill="#fbbf24" />
                </g>
              )
            },
            {
              id: 48, theme: 'all', type: 'all',
              render: () => (
                <g className="anim-float-gentle">
                  {/* Balloon Wagon Cart */}
                  <rect x="-14" y="-4" width="28" height="8" fill="#b45309" rx="1" />
                  <circle cx="-8" cy="7" r="4.5" fill="#1e293b" />
                  <circle cx="8" cy="7" r="4.5" fill="#1e293b" />
                  {/* Balloon peeking out */}
                  <circle cx="-4" cy="-8" r="6" fill="#f43f5e" />
                  <circle cx="4" cy="-10" r="5" fill="#38bdf8" />
                </g>
              )
            },
            {
              id: 49, theme: 'all', type: 'all',
              render: () => (
                <g className="anim-bounce-chick">
                  {/* Happy Farm Puppy */}
                  <ellipse cx="0" cy="0" rx="7" ry="5.5" fill="#fed7aa" />
                  <circle cx="-3" cy="-5" r="3" fill="#fed7aa" /> {/* left ear */}
                  <circle cx="3" cy="-5" r="3" fill="#fed7aa" /> {/* right ear */}
                  <circle cx="-2" cy="-1" r="1" fill="#1e293b" />
                  <circle cx="2" cy="-1" r="1" fill="#1e293b" />
                  <polygon points="-1,1 1,1 0,2.2" fill="#1e293b" />
                </g>
              )
            },
            {
              id: 50, theme: 'all', type: 'all',
              render: () => (
                <g className="anim-bounce-chick">
                  {/* Fluffy Sheep */}
                  <ellipse cx="0" cy="0" rx="9" ry="7" fill="#f1f5f9" />
                  <ellipse cx="-3" cy="-3" rx="3" ry="3" fill="#fff" />
                  <ellipse cx="3" cy="3" rx="3" ry="3" fill="#fff" />
                  <circle cx="-9" cy="-1" r="3" fill="#fed7aa" /> {/* face */}
                  <rect x="-5" y="6" width="1.8" height="4" fill="#1e293b" />
                  <rect x="3" y="6" width="1.8" height="4" fill="#1e293b" />
                </g>
              )
            }
          ];

          // Deterministically select 14 elements out of 50 to render, matching theme & event type filters
          const filteredPool = elementsPool.filter(el => {
            // Include if theme matches OR is 'all'
            const themeMatch = el.theme === theme || el.theme === 'all';
            // Include if type matches or is 'all'
            const typeMatch = el.type === eventType || el.type === 'all';
            return themeMatch && typeMatch;
          });

          // Fallback to general pool if filtered pool is small
          const finalPool = filteredPool.length >= 10 ? filteredPool : elementsPool;

          // Shuffle or select 12-16 elements deterministically using the seed rng
          const itemsToRender: typeof elementsPool = [];
          const indicesChosen = new Set<number>();
          
          let indexCounter = 0;
          while (itemsToRender.length < 14 && indexCounter < 100 && itemsToRender.length < finalPool.length) {
            const randVal = rng(indexCounter);
            const selectedIdx = Math.floor(randVal * finalPool.length);
            if (!indicesChosen.has(selectedIdx)) {
              indicesChosen.add(selectedIdx);
              itemsToRender.push(finalPool[selectedIdx]);
            }
            indexCounter++;
          }

          // Render each of the chosen elements with random positions
          return itemsToRender.map((el, i) => {
            // Determine random visual placement parameters based on the deterministic seed
            const posX = Math.floor(rng(i * 3 + 120) * 280) + 30; // X bounds: 30 to 310
            const posY = Math.floor(rng(i * 3 + 150) * 330) + 50; // Y bounds: 50 to 380 (keep off absolute bottom/top)
            const scale = (rng(i * 3 + 180) * 0.45) + 0.75; // Scale range: 0.75 to 1.2
            const delay = (rng(i * 3 + 210) * 4).toFixed(1); // Animation delay range: 0 to 4s

            return (
              <g
                key={`farm-el-${el.id}-${i}`}
                transform={`translate(${posX}, ${posY}) scale(${scale})`}
                style={{ animationDelay: `${delay}s` }}
              >
                {el.render()}
              </g>
            );
          });
        })()}

        {/* Extra decorative ground sprouts aligned at bottom for lushness */}
        <g stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" fill="none">
          {/* Wheat Sprout 1 */}
          <g transform="translate(30, 420)" className="anim-sway-sprout">
            <path d="M 0,0 Q -5,-15 -2,-30" />
            <path d="M -2,-30 Q 3,-38 10,-42" strokeWidth="1.5" />
            <circle cx="10" cy="-42" r="2" fill="#eab308" stroke="none" />
            <circle cx="6" cy="-35" r="1.5" fill="#eab308" stroke="none" />
          </g>

          {/* Wheat Sprout 2 */}
          <g transform="translate(150, 435)" className="anim-sway-sprout" style={{ animationDelay: '0.6s' }}>
            <path d="M 0,0 Q 5,-12 3,-25" />
            <path d="M 3,-25 Q -2,-32 -7,-36" strokeWidth="1.5" />
            <circle cx="-7" cy="-36" r="2" fill="#eab308" stroke="none" />
          </g>

          {/* Sunflower Sprout 3 */}
          <g transform="translate(290, 430)" className="anim-sway-sprout" style={{ animationDelay: '1.2s' }}>
            <path d="M 0,0 Q -3,-18 0,-32" />
            <circle cx="0" cy="-34" r="5" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
            <circle cx="0" cy="-34" r="2.5" fill="#78350f" stroke="none" />
          </g>
        </g>
      </svg>
    </div>
  );
};
