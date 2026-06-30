import { CelebrationEvent, EventType, EffectType } from '../types';

export interface EventMetadata {
  icon: string;
  color: string; // Tailwind tint
  accentColor: string; // Hex color for fallback CSS variable override
  defaultMessageKey: string;
  defaultSubMessageKey: string;
  defaultEffects: EffectType[];
}

export const eventMetadataMap: Record<EventType, EventMetadata> = {
  birthday: {
    icon: '🎂',
    color: 'from-pink-500 to-rose-500',
    accentColor: '#ec4899',
    defaultMessageKey: 'birthday',
    defaultSubMessageKey: 'birthday_sub',
    defaultEffects: ['confetti', 'balloons'],
  },
  anniversary: {
    icon: '🎖️',
    color: 'from-blue-500 to-indigo-500',
    accentColor: '#3b82f6',
    defaultMessageKey: 'anniversary',
    defaultSubMessageKey: 'anniversary_sub',
    defaultEffects: ['confetti', 'sparkles'],
  },
  promotion: {
    icon: '🚀',
    color: 'from-emerald-500 to-teal-500',
    accentColor: '#10b981',
    defaultMessageKey: 'promotion',
    defaultSubMessageKey: 'promotion_sub',
    defaultEffects: ['confetti', 'sparkles'],
  },
  award: {
    icon: '🏆',
    color: 'from-amber-500 to-yellow-500',
    accentColor: '#f59e0b',
    defaultMessageKey: 'award',
    defaultSubMessageKey: 'award_sub',
    defaultEffects: ['sparkles'],
  },
  new_joiner: {
    icon: '👋',
    color: 'from-cyan-500 to-sky-500',
    accentColor: '#06b6d4',
    defaultMessageKey: 'new_joiner',
    defaultSubMessageKey: 'new_joiner_sub',
    defaultEffects: ['floatingEmojis'],
  },
  festival: {
    icon: '✨',
    color: 'from-red-500 to-orange-500',
    accentColor: '#ef4444',
    defaultMessageKey: 'festival',
    defaultSubMessageKey: 'festival_sub',
    defaultEffects: ['balloons', 'sparkles'],
  },
};

export function getEventMetadata(type: EventType): EventMetadata {
  return eventMetadataMap[type] || eventMetadataMap.birthday;
}

export function getEventMessages(
  event: CelebrationEvent,
  t: (key: string, variables?: Record<string, string | number>) => string
): { title: string; subtitle: string } {
  const meta = getEventMetadata(event.type);

  // Variables for substitution
  const vars = {
    name: event.name,
    years: event.years ?? 1,
    designation: event.designation ?? '',
    department: event.department ?? '',
    achievement: event.achievement ?? '',
    company: event.company ?? '',
  };

  const title = event.customMessage 
    ? event.customMessage 
    : t(meta.defaultMessageKey, vars);

  const subtitle = t(meta.defaultSubMessageKey, vars);

  return { title, subtitle };
}
