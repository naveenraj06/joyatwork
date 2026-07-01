import React from 'react';
import { CelebrationEvent, EventType, EffectType } from '../types';
import { Cake, Award, TrendingUp, Trophy, UserPlus, Sparkles } from 'lucide-react';

export const EVENT_ICONS: Record<EventType, React.ComponentType<{ className?: string }>> = {
  birthday: Cake,
  anniversary: Award,
  promotion: TrendingUp,
  award: Trophy,
  new_joiner: UserPlus,
  festival: Sparkles,
};

export const EVENT_COLORS: Record<EventType, { bg: string; text: string; border: string; glow: string }> = {
  birthday: { bg: 'bg-pink-500/10 dark:bg-pink-500/20', text: 'text-pink-600 dark:text-pink-400', border: 'border-pink-500/25', glow: 'shadow-pink-500/20' },
  anniversary: { bg: 'bg-blue-500/10 dark:bg-blue-500/20', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/25', glow: 'shadow-blue-500/20' },
  promotion: { bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/25', glow: 'shadow-emerald-500/20' },
  award: { bg: 'bg-amber-500/10 dark:bg-amber-500/20', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/25', glow: 'shadow-amber-500/20' },
  new_joiner: { bg: 'bg-indigo-500/10 dark:bg-indigo-500/20', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-500/25', glow: 'shadow-indigo-500/20' },
  festival: { bg: 'bg-red-500/10 dark:bg-red-500/20', text: 'text-red-600 dark:text-red-400', border: 'border-red-500/25', glow: 'shadow-red-500/20' },
};

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
