import React, { useMemo } from 'react';
import { CelebrationCardProps, EventType } from '../../types';
import { useEmployeeMoments } from '../../providers/EmployeeMomentsProvider';
import { ReactionBar } from '../ReactionBar';
import { EffectsController } from '../../effects/EffectsController';
import {
  Cake,
  Award,
  TrendingUp,
  Trophy,
  UserPlus,
  Sparkles,
  Building2,
  Calendar,
} from 'lucide-react';

const EVENT_ICONS: Record<EventType, React.ComponentType<{ className?: string }>> = {
  birthday: Cake,
  anniversary: Award,
  promotion: TrendingUp,
  award: Trophy,
  new_joiner: UserPlus,
  festival: Sparkles,
};

const EVENT_COLORS: Record<EventType, { bg: string; text: string; border: string }> = {
  birthday: { bg: 'bg-pink-500/10 dark:bg-pink-500/20', text: 'text-pink-600 dark:text-pink-400', border: 'border-pink-500/25' },
  anniversary: { bg: 'bg-blue-500/10 dark:bg-blue-500/20', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/25' },
  promotion: { bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/25' },
  award: { bg: 'bg-amber-500/10 dark:bg-amber-500/20', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/25' },
  new_joiner: { bg: 'bg-indigo-500/10 dark:bg-indigo-500/20', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-500/25' },
  festival: { bg: 'bg-red-500/10 dark:bg-red-500/20', text: 'text-red-600 dark:text-red-400', border: 'border-red-500/25' },
};

export const CelebrationCard: React.FC<CelebrationCardProps> = React.memo(({
  event,
  isActive = false,
  isFocused = false,
}) => {
  const { theme, branding, t, effects, reducedMotion } = useEmployeeMoments();

  // Branding configuration override
  const cardStyle = useMemo(() => {
    const style: React.CSSProperties = {};

    // Base theme styles
    if (theme.cardBackground.startsWith('linear-gradient')) {
      style.background = theme.cardBackground;
    } else {
      style.backgroundColor = theme.cardBackground;
    }

    style.color = theme.textPrimary;

    // Apply branding color overrides
    if (branding?.primaryColor) {
      style.borderColor = branding.primaryColor + '20'; // light transparency for border
    } else {
      style.borderColor = theme.textSecondary + '1a'; // 10% opacity border
    }

    return style;
  }, [theme, branding]);

  const accentColorStyle = useMemo(() => {
    return {
      color: branding?.primaryColor || theme.accent,
    };
  }, [theme.accent, branding]);

  const secondaryColorStyle = useMemo(() => {
    return {
      color: theme.textSecondary,
    };
  }, [theme.textSecondary]);

  // Dynamic translated title and subtitle
  const { title, subtitle } = useMemo(() => {
    const type = event.type;
    const name = event.name;
    const years = event.years ?? 0;
    const designation = event.designation ?? '';
    const department = event.department ?? '';
    const achievement = event.achievement ?? '';

    const titleText = t(type, { name, years, designation, department, achievement });
    const subText = t(`${type}_sub`, { name, years, designation, department, achievement });

    return {
      title: titleText,
      subtitle: event.customMessage || subText,
    };
  }, [event, t]);

  const IconComponent = EVENT_ICONS[event.type] || Sparkles;
  const colors = EVENT_COLORS[event.type] || EVENT_COLORS.festival;

  // Render employee image or professional initial placeholder
  const renderAvatar = () => {
    if (event.image) {
      return (
        <div className="relative group">
          <div
            className="absolute -inset-1 rounded-full opacity-60 blur-md transition-all group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${branding?.primaryColor || theme.accent}, ${branding?.secondaryColor || theme.textSecondary})`,
            }}
          />
          <img
            id={`avatar-img-${event.id}`}
            src={event.image}
            alt={event.name}
            className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 shadow-xl z-10 transition-transform duration-300 group-hover:scale-105"
            style={{ borderColor: theme.cardBackground }}
            loading="lazy"
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
          className="absolute -inset-1 rounded-full opacity-60 blur-md transition-all group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${branding?.primaryColor || theme.accent}, ${branding?.secondaryColor || theme.textSecondary})`,
          }}
        />
        <div
          id={`avatar-placeholder-${event.id}`}
          className="relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center text-3xl font-bold border-4 shadow-xl z-10 select-none"
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
      id={`celebration-card-${event.id}`}
      style={{ ...cardStyle, borderRadius: 'var(--em-radius, 1rem)' }}
      className={`relative border p-6 md:p-8 flex flex-col items-center text-center shadow-lg transition-all duration-300 overflow-hidden w-full max-w-lg mx-auto ${
        isActive ? 'scale-[1.01] shadow-2xl' : 'opacity-90 grayscale-[10%]'
      } ${isFocused ? 'ring-2 ring-indigo-500' : ''}`}
      role="region"
      aria-roledescription="slide"
      aria-label={`${event.name}'s ${event.type}`}
    >
      {/* Dynamic background effect renderer */}
      {isActive && effects.map((eff) => (
        <EffectsController
          key={eff}
          effect={eff}
          isActive={isActive}
          reducedMotion={reducedMotion}
        />
      ))}

      {/* Top badges & Info */}
      <div className="w-full flex items-center justify-between mb-4 z-10">
        <div className="flex items-center gap-1.5 text-xs font-medium" style={secondaryColorStyle}>
          {event.company || branding?.companyName ? (
            <>
              <Building2 className="w-3.5 h-3.5" />
              <span>{event.company || branding?.companyName}</span>
            </>
          ) : null}
        </div>
        {event.date && (
          <div className="flex items-center gap-1.5 text-xs font-medium" style={secondaryColorStyle}>
            <Calendar className="w-3.5 h-3.5" />
            <span>{event.date}</span>
          </div>
        )}
      </div>

      {/* Main Avatar Section */}
      <div className="mb-6 z-10 flex flex-col items-center">
        {renderAvatar()}
        
        {/* Floating icon indicating the event type */}
        <div
          className={`absolute translate-x-11 translate-y-20 p-2.5 rounded-full border shadow-md z-20 ${colors.bg} ${colors.text} ${colors.border}`}
        >
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* Employee & Event Details */}
      <div className="z-10 space-y-2 flex-1 w-full">
        <h4 className="text-2xl font-bold tracking-tight" style={accentColorStyle}>
          {title}
        </h4>
        
        {event.designation && (
          <p className="text-sm font-semibold tracking-wide uppercase" style={secondaryColorStyle}>
            {event.designation}
            {event.department && <span className="opacity-60 font-normal"> • {event.department}</span>}
          </p>
        )}

        <p className="text-sm md:text-base leading-relaxed px-4 max-w-sm mx-auto" style={secondaryColorStyle}>
          {subtitle}
        </p>
      </div>

      {/* Interactive Reactions */}
      <div className="w-full z-20 mt-4">
        <ReactionBar eventId={event.id} />
      </div>
    </div>
  );
});

CelebrationCard.displayName = 'CelebrationCard';
export default CelebrationCard;
