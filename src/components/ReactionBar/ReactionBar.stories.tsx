import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ReactionBar } from './ReactionBar';

const meta: Meta<typeof ReactionBar> = {
  title: 'Components/ReactionBar',
  component: ReactionBar,
  argTypes: {
    eventId: {
      control: 'text',
      defaultValue: 'story-event-id',
    },
    onReaction: { action: 'reacted' },
  },
};

export default meta;
type Story = StoryObj<typeof ReactionBar>;

export const Interactive: Story = {
  args: {
    eventId: 'story-event-id',
  },
};
