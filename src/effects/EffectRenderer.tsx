import React from 'react';
import { EffectType } from '../types';
import SparklesEffect from './SparklesEffect';
import FloatingEmojisEffect from './FloatingEmojisEffect';
import BalloonsEffect from './BalloonsEffect';

interface EffectRendererProps {
  activeEffects: EffectType[];
}

export const EffectRenderer: React.FC<EffectRendererProps> = ({ activeEffects }) => {
  if (!activeEffects || activeEffects.length === 0) return null;

  return (
    <>
      {activeEffects.includes('sparkles') && <SparklesEffect />}
      {activeEffects.includes('floatingEmojis') && <FloatingEmojisEffect />}
      {activeEffects.includes('balloons') && <BalloonsEffect />}
    </>
  );
};

export default EffectRenderer;
