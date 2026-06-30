import React, { useMemo } from 'react';
import { SpotlightCardProps, EventType } from '../../types';
import { useEmployeeMoments } from '../../providers/EmployeeMomentsProvider';
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

const EVENT_COLORS: Record<EventType, { bg: string; text: string; border: string; glow: string }> = {
  birthday: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30', glow: 'shadow-pink-500/20' },
  anniversary: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
  promotion: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
  award: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
  new_joiner: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30', glow: 'shadow-indigo-500/20' },
  festival: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', glow: 'shadow-red-500/20' },
};

export const SpotlightCard: React.FC<SpotlightCardProps> = ({ event }) => {
  const { theme, branding, t, effects, reducedMotion } = useEmployeeMoments();

  const containerStyle = useMemo(() => {
    const style: React.CSSProperties = {
      background: 'linear-gradient(135deg, #09090b 0%, #111115 100%)', // Default deep dark cinematic canvas for TV Spotlight
      color: '#f4f4f5',
      borderColor: 'rgba(255, 255, 255, 0.08)',
    };

    // If branding custom colors are defined, use subtle gradients
    if (branding?.primaryColor) {
      style.borderColor = branding.primaryColor + '40'; // 25% opacity
    }

    return style;
  }, [branding]);

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
            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-8 border-zinc-900 shadow-2xl z-10"
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
          className={`absolute -inset-2.5 rounded-full opacity-70 blur-2xl animate-pulse bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500`}
          style={branding?.primaryColor ? {
            backgroundImage: `radial-gradient(circle, ${branding.primaryColor} 0%, ${branding.secondaryColor || '#a855f7'} 100%)`
          } : {}}
        />
        <div
          id={`spotlight-avatar-placeholder-${event.id}`}
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center text-6xl font-black border-8 border-zinc-900 shadow-2xl z-10 bg-zinc-800 text-indigo-400 select-none"
          style={branding?.primaryColor ? { color: branding.primaryColor } : {}}
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
      <div className="absolute right-[-4%] bottom-[-8%] opacity-5 text-white pointer-events-none z-0">
        <IconComponent className="w-96 h-96" />
      </div>

      {/* Left Column: Huge Avatar with Floating Event Badge */}
      <div className="relative flex-none z-10">
        {renderBigAvatar()}

        {/* Floating large icon of the event */}
        <div
          className={`absolute bottom-2 right-2 md:bottom-4 md:right-4 p-4 rounded-full border-4 border-zinc-900 shadow-2xl z-20 ${colors.bg} ${colors.text} ${colors.border}`}
        >
          <IconComponent className="w-8 h-8 md:w-10 md:h-10 animate-bounce" />
        </div>
      </div>

      {/* Right Column: Hero Event Callout */}
      <div className="flex-1 z-10 space-y-6 text-center md:text-left">
        {/* Top line with Company / Date */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs md:text-sm font-semibold tracking-wider text-zinc-400 uppercase">
          {branding?.companyName || event.company ? (
            <span className="flex items-center gap-1.5 bg-zinc-800/60 px-3.5 py-1.5 rounded-full border border-white/5">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span>{branding?.companyName || event.company}</span>
            </span>
          ) : null}
          {event.date && (
            <span className="flex items-center gap-1.5 bg-zinc-800/60 px-3.5 py-1.5 rounded-full border border-white/5">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>{event.date}</span>
            </span>
          )}
        </div>

        {/* Dynamic Big Heading */}
        <div className="space-y-3">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
            style={branding?.primaryColor ? {
              backgroundImage: `linear-gradient(to right, #ffffff, ${branding.primaryColor})`
            } : {}}
          >
            {title}
          </h1>

          {event.designation && (
            <h2 className="text-lg md:text-2xl font-bold tracking-wide text-zinc-300 uppercase">
              {event.designation}
              {event.department && <span className="text-zinc-500 font-medium"> • {event.department}</span>}
            </h2>
          )}
        </div>

        {/* Dynamic Subtitle/Custom message (very large text) */}
        <p className="text-lg md:text-xl lg:text-2xl text-zinc-400 leading-relaxed font-light max-w-2xl">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default SpotlightCard;
