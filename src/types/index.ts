import React from 'react';

export type EventType = 'birthday' | 'anniversary' | 'promotion' | 'award' | 'new_joiner' | 'festival';

export interface CelebrationEvent {
  id: string;
  type: EventType;
  name: string;
  designation?: string;
  department?: string;
  image?: string;
  company?: string;
  date?: string;
  years?: number;
  achievement?: string;
  customMessage?: string;
}

export type ThemeName = 'corporate' | 'celebration' | 'glass' | 'minimal' | 'premium' | 'festive';

export interface Theme {
  background: string;
  cardBackground: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
}

export interface BrandingConfig {
  companyName?: string;
  companyLogo?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export type EffectType = 'confetti' | 'sparkles' | 'floatingEmojis' | 'balloons';

export interface EmployeeMomentsContextType {
  themeName: ThemeName;
  theme: Theme;
  branding?: BrandingConfig;
  locale: string;
  t: (key: string, variables?: Record<string, string | number>) => string;
  effects: EffectType[];
  allowReactions: boolean;
  onReaction?: (eventId: string, emoji: string) => void;
  reducedMotion: boolean;
}

export interface EmployeeMomentsProviderProps {
  children: React.ReactNode;
  theme?: ThemeName;
  branding?: BrandingConfig;
  locale?: string;
  effects?: EffectType[];
  allowReactions?: boolean;
  onReaction?: (eventId: string, emoji: string) => void;
}

export interface LegacyPerson {
  id?: string;
  name: string;
  designation?: string;
  department?: string;
  image?: string;
  company?: string;
  date?: string;
  birthday?: string;
  customMessage?: string;
  message?: string;
}

export interface CelebrationCarouselProps {
  events?: CelebrationEvent[];
  people?: LegacyPerson[];
  theme?: ThemeName;
  branding?: BrandingConfig;
  effects?: EffectType[];
  allowReactions?: boolean;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  locale?: string;
  activeIndex?: number;
  onReaction?: (eventId: string, emoji: string) => void;
  onActiveIndexChange?: (index: number) => void;
}

export interface CelebrationCardProps {
  event: CelebrationEvent;
  isActive?: boolean;
  isFocused?: boolean;
}

export interface SpotlightCardProps {
  event: CelebrationEvent;
}

export interface CelebrationWallProps {
  events: CelebrationEvent[];
  gridCols?: number; // optional columns, defaults to responsive grid
}

export interface ReactionBarProps {
  eventId: string;
  onReaction?: (eventId: string, emoji: string) => void;
}
