import { Theme, ThemeName } from '../types';

export const themes: Record<ThemeName, Theme> = {
  corporate: {
    background: '#f8fafc', // slate-50
    cardBackground: '#ffffff', // white
    accent: '#2563eb', // blue-600
    textPrimary: '#0f172a', // slate-900
    textSecondary: '#64748b', // slate-500
  },
  celebration: {
    background: '#fffbeb', // amber-50
    cardBackground: '#ffffff', // white
    accent: '#d97706', // amber-600
    textPrimary: '#1e293b', // slate-800
    textSecondary: '#475569', // slate-600
  },
  glass: {
    background: 'linear-gradient(135deg, #f5f3ff 0%, #fae8ff 50%, #fdf2f8 100%)', // soft pastels
    cardBackground: 'rgba(255, 255, 255, 0.45)', // translucent glass
    accent: '#8b5cf6', // purple-600
    textPrimary: '#1e293b', // slate-800
    textSecondary: '#475569', // slate-600
  },
  minimal: {
    background: '#fafafa', // zinc-50
    cardBackground: '#ffffff', // white
    accent: '#09090b', // zinc-950
    textPrimary: '#18181b', // zinc-900
    textSecondary: '#71717a', // zinc-500
  },
  premium: {
    background: '#080F19', // solid deep dark blue-black
    cardBackground: '#161C29', // solid card background
    accent: '#6366F1', // primary indigo
    textPrimary: '#F8FAFC', // high contrast slate-50
    textSecondary: '#94A3B8', // medium slate-400
  },
  festive: {
    background: '#fef2f2', // red-50
    cardBackground: '#ffffff', // white
    accent: '#dc2626', // red-600
    textPrimary: '#1e293b', // slate-800
    textSecondary: '#475569', // slate-600
  },
};
