import { CelebrationCarousel } from './components/CelebrationCarousel';

export * from './types';
export * from './themes';
export * from './locales';
export * from './hooks/useReducedMotion';
export * from './hooks/useEventMessages';
export { EmployeeMomentsProvider, useEmployeeMoments } from './providers/EmployeeMomentsProvider';

// Core Components
export { default as CelebrationCarousel } from './components/CelebrationCarousel';
export { default as CelebrationCard } from './components/CelebrationCard';
export { default as SpotlightCard } from './components/SpotlightCard';
export { default as CelebrationWall } from './components/CelebrationWall';
export { default as ReactionBar } from './components/ReactionBar';

// V2.0 Backward Compatibility Wrapper for BirthdayCarousel migrations
export const BirthdayCarousel = CelebrationCarousel;
export default CelebrationCarousel;
