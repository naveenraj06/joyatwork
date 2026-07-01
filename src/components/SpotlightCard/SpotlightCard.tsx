import React, { useMemo } from 'react';
import { SpotlightCardProps, EventType } from '../../types';
import { useEmployeeMoments } from '../../providers/EmployeeMomentsProvider';
import { useEventMessages } from '../../hooks/useEventMessages';
import { EffectsController } from '../../effects/EffectsController';
import { Building2, Calendar, Sparkles } from 'lucide-react';
import { EVENT_ICONS, EVENT_COLORS } from '../../utils/eventHelpers';

export const SpotlightCard: React.FC<SpotlightCardProps> = ({ event }) => {
  const { theme, branding, t, effects, reducedMotion } = useEmployeeMoments();

  const containerStyle = useMemo(() => {
    const style: React.CSSProperties = {};

    if (theme.cardBackground.startsWith('linear-gradient')) {
      style.background = theme.cardBackground;
    } else {
      style.backgroundColor = theme.cardBackground;
    }

    style.color = theme.textPrimary;

    // If branding custom colors are defined, use subtle gradients
    if (branding?.primaryColor) {
      style.borderColor = branding.primaryColor + '40'; // 25% opacity
    } else {
      style.borderColor = theme.textSecondary + '20';
    }

    return style;
  }, [theme, branding]);

  // Dynamic translated title and subtitle
  const { title, subtitle } = useEventMessages(event);

  const IconComponent = EVENT_ICONS[event.type] || Sparkles;
  const colors = EVENT_COLORS[event.type] || EVENT_COLORS.festival;

  // Render initials if image is missing
  const renderBigAvatar = () => {
    if (event.image) {
      return (
        <div className="relative group">
          <div
            className={`absolute -inset-2.5 rounded-full opacity-70 blur-2xl animate-pulse bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500`}
            style={branding?.primaryColor ? {
              backgroundImage: `radial-gradient(circle, ${branding.primaryColor} 0%, ${branding.secondaryColor || '#a855f7'} 100%)`
            } : {}}
          />
          <img
            id={`spotlight-avatar-img-${event.id}`}
            src={event.image}
            alt={event.name}
            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-8 shadow-2xl z-10"
            style={{ borderColor: theme.cardBackground }}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }

    const initials = event.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    return (
      <div className="relative group">
        <div
          className={`absolute -inset-2.5 rounded-full opacity-70 blur-2xl animate-pulse bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500`}
          style={branding?.primaryColor ? {
            backgroundImage: `radial-gradient(circle, ${branding.primaryColor} 0%, ${branding.secondaryColor || '#a855f7'} 100%)`
          } : {}}
        />
        <div
          id={`spotlight-avatar-placeholder-${event.id}`}
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center text-6xl font-black border-8 shadow-2xl z-10 select-none"
          style={{
            backgroundColor: theme.background.startsWith('linear-gradient') ? '#1e293b' : theme.background,
            borderColor: theme.cardBackground,
            color: branding?.primaryColor || theme.accent,
          }}
        >
          {initials}
        </div>
      </div>
    );
  };

  return (
    <div
      id={`spotlight-card-${event.id}`}
      style={{ ...containerStyle, borderRadius: 'var(--em-radius, 1.5rem)' }}
      className="relative border p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 shadow-2xl overflow-hidden w-full h-full max-w-6xl mx-auto min-h-[480px]"
      role="region"
      aria-label={`Spotlight on ${event.name}'s ${event.type}`}
    >
      {/* Immersive effects overlay */}
      {effects.map((eff) => (
        <EffectsController
          key={eff}
          effect={eff}
          isActive={true}
          reducedMotion={reducedMotion}
        />
      ))}

      {/* Decorative large faint background icon */}
      <div className="absolute right-[-4%] bottom-[-8%] pointer-events-none z-0" style={{ color: theme.textPrimary, opacity: 0.05 }}>
        <IconComponent className="w-96 h-96" />
      </div>

      {/* Left Column: Huge Avatar with Floating Event Badge */}
      <div className="relative flex-none z-10">
        {renderBigAvatar()}

        {/* Floating large icon of the event */}
        <div
          className={`absolute bottom-2 right-2 md:bottom-4 md:right-4 p-4 rounded-full border-4 shadow-2xl z-20 ${colors.bg} ${colors.text} ${colors.border}`}
          style={{ borderColor: theme.cardBackground }}
        >
          <IconComponent className="w-8 h-8 md:w-10 md:h-10 animate-bounce" />
        </div>
      </div>

      {/* Right Column: Hero Event Callout */}
      <div className="flex-1 z-10 space-y-6 text-center md:text-left">
        {/* Top line with Company / Date */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs md:text-sm font-semibold tracking-wider uppercase">
          {branding?.companyName || event.company ? (
            <span 
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border"
              style={{
                backgroundColor: theme.textSecondary + '15',
                borderColor: theme.textSecondary + '20',
                color: theme.textSecondary,
              }}
            >
              <Building2 className="w-4 h-4" style={{ color: branding?.primaryColor || theme.accent }} />
              <span>{branding?.companyName || event.company}</span>
            </span>
          ) : null}
          {event.date && (
            <span 
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border"
              style={{
                backgroundColor: theme.textSecondary + '15',
                borderColor: theme.textSecondary + '20',
                color: theme.textSecondary,
              }}
            >
              <Calendar className="w-4 h-4" style={{ color: branding?.secondaryColor || theme.accent }} />
              <span>{event.date}</span>
            </span>
          )}
        </div>

        {/* Dynamic Big Heading */}
        <div className="space-y-3">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none"
            style={{ color: branding?.primaryColor || theme.accent }}
          >
            {title}
          </h1>

          {event.designation && (
            <h2 className="text-lg md:text-2xl font-bold tracking-wide uppercase" style={{ color: theme.textPrimary }}>
              {event.designation}
              {event.department && <span className="font-medium opacity-60" style={{ color: theme.textSecondary }}> • {event.department}</span>}
            </h2>
          )}
        </div>

        {/* Dynamic Subtitle/Custom message (very large text) */}
        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light max-w-2xl" style={{ color: theme.textSecondary }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default SpotlightCard;
