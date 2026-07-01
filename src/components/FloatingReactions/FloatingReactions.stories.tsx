import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FloatingReactions } from './FloatingReactions';
import { REACTION_EMOJIS } from '../ReactionBar/ReactionBar';

const meta: Meta<typeof FloatingReactions> = {
  title: 'Components/FloatingReactions',
  component: FloatingReactions,
  argTypes: {
    eventId: {
      control: 'text',
      defaultValue: 'float-test-id',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingReactions>;

export const LiveCascade: Story = {
  render: (args) => {
    const handleTrigger = (emoji: string) => {
      window.dispatchEvent(new CustomEvent('reaction-trigger', {
        detail: { emoji, eventId: args.eventId }
      }));
    };

    return (
      <div className="relative w-full max-w-md h-96 border border-slate-700/50 rounded-2xl bg-slate-900/40 p-6 flex flex-col justify-between overflow-hidden">
        <div className="text-center text-sm text-slate-400">
          Click any button below to trigger high-fidelity emoji cascades!
        </div>

        {/* Floating Reactions overlay */}
        <FloatingReactions eventId={args.eventId} />

        <div className="flex justify-center gap-2 z-10 bg-slate-850 p-2 rounded-full border border-slate-800">
          {REACTION_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleTrigger(emoji)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-slate-800/80 hover:bg-slate-700 hover:scale-125 active:scale-95 transition-all cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    );
  },
  args: {
    eventId: 'float-test-id',
  },
};
