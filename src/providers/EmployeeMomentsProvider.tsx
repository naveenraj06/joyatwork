import React, { createContext, useContext, useMemo } from 'react';
import { EmployeeMomentsContextType, EmployeeMomentsProviderProps, ThemeName } from '../types';
import { themes } from '../themes';
import { getTranslation } from '../locales';
import { useReducedMotion } from '../hooks/useReducedMotion';

const EmployeeMomentsContext = createContext<EmployeeMomentsContextType | undefined>(undefined);

export const EmployeeMomentsProvider: React.FC<EmployeeMomentsProviderProps> = ({
  children,
  theme: propThemeName = 'corporate',
  branding,
  locale = 'en',
  effects = ['confetti'],
  allowReactions = true,
  onReaction,
}) => {
  const isReducedMotion = useReducedMotion();

  const themeObj = useMemo(() => {
    return themes[propThemeName] || themes.corporate;
  }, [propThemeName]);

  const t = useMemo(() => {
    return (key: string, variables?: Record<string, string | number>) => {
      return getTranslation(locale, key, variables);
    };
  }, [locale]);

  const value = useMemo<EmployeeMomentsContextType>(() => ({
    themeName: propThemeName,
    theme: themeObj,
    branding,
    locale,
    t,
    effects,
    allowReactions,
    onReaction,
    reducedMotion: isReducedMotion,
  }), [propThemeName, themeObj, branding, locale, t, effects, allowReactions, onReaction, isReducedMotion]);

  return (
    <EmployeeMomentsContext.Provider value={value}>
      {children}
    </EmployeeMomentsContext.Provider>
  );
};

export function useEmployeeMoments(): EmployeeMomentsContextType {
  const context = useContext(EmployeeMomentsContext);

  if (!context) {
    const isReducedMotionStatic = typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false;

    // Return safe fallbacks if the component is used outside the provider
    return {
      themeName: 'corporate' as ThemeName,
      theme: themes.corporate,
      locale: 'en',
      t: (key: string, variables?: Record<string, string | number>) => getTranslation('en', key, variables),
      effects: ['confetti'],
      allowReactions: true,
      reducedMotion: isReducedMotionStatic,
    };
  }
  return context;
}
export default EmployeeMomentsProvider;
