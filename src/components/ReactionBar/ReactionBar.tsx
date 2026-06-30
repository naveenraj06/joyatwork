import React from 'react';
import { useEmployeeMoments } from '../../providers/EmployeeMomentsProvider';
import { ReactionBarProps } from '../../types';

export const REACTION_EMOJIS = ['🎉', '❤️', '👏', '🎂', '🌟', '🙌'];

export const ReactionBar: React.FC<ReactionBarProps> = ({ eventId, onReaction }) => {
  const { allowReactions, onReaction: contextOnReaction, t } = useEmployeeMoments();

  if (!allowReactions) return null;

  const handleReact = (emoji: string) => {
    window.dispatchEvent(new CustomEvent('reaction-trigger', {
      detail: { emoji, eventId }
    }));
    if (onReaction) {
      onReaction(eventId, emoji);
    } else if (contextOnReaction) {
      contextOnReaction(eventId, emoji);
    }
  };

  return (
    <div
      id={`reaction-bar-${eventId}`}
      className="flex items-center gap-2 mt-4 p-2 bg-white/5 dark:bg-black/20 rounded-full border border-white/5 max-w-max mx-auto shadow-inner"
      role="group"
      aria-label="Reactions"
    >
      {REACTION_EMOJIS.map((emoji) => (
        <button
          key={emoji}
          id={`react-btn-${eventId}-${emoji}`}
          onClick={() => handleReact(emoji)}
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg hover:scale-125 hover:bg-white/10 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer"
          title={t('react_label', { emoji })}
          aria-label={t('react_label', { emoji })}
        >
          <span className="select-none" aria-hidden="true">
            {emoji}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ReactionBar;
