import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CelebrationCard } from './CelebrationCard';
import { CelebrationEvent } from '../../types';

// Extend component props with decorator properties for Storybook type safety
type CelebrationCardStoryProps = React.ComponentProps<typeof CelebrationCard> & {
  theme?: string;
  locale?: string;
};

const meta: Meta<CelebrationCardStoryProps> = {
  title: 'Components/CelebrationCard',
  component: CelebrationCard,
  argTypes: {
    theme: {
      control: 'select',
      options: ['corporate', 'celebration', 'glass', 'minimal', 'premium', 'festive'],
      description: 'Theme configured via the EmployeeMomentsProvider context',
    },
    locale: {
      control: 'select',
      options: ['en', 'hi', 'ta'],
      description: 'Language configured via the EmployeeMomentsProvider context',
    },
  },
};

export default meta;
type Story = StoryObj<CelebrationCardStoryProps>;

const baseEvent: CelebrationEvent = {
  id: 'event-1',
  name: 'Sarah Jenkins',
  type: 'birthday',
  date: 'June 30',
  designation: 'Senior Creative Director',
  department: 'Design & User Experience',
  company: 'Antigravity Labs',
};

export const Birthday: Story = {
  args: {
    event: {
      ...baseEvent,
      type: 'birthday',
    },
  },
};

export const Anniversary: Story = {
  args: {
    event: {
      ...baseEvent,
      type: 'anniversary',
      years: 5,
    },
  },
};

export const Promotion: Story = {
  args: {
    event: {
      ...baseEvent,
      type: 'promotion',
      designation: 'VP of Product Engineering',
    },
  },
};

export const Award: Story = {
  args: {
    event: {
      ...baseEvent,
      type: 'award',
      achievement: 'President\'s Innovation Award',
      customMessage: 'Sarah has spearheaded the design modernization program, establishing a premium industry benchmark for visual and interactive storytelling.',
    },
  },
};

export const NewJoiner: Story = {
  args: {
    event: {
      ...baseEvent,
      type: 'new_joiner',
      designation: 'Lead AI Interaction Specialist',
    },
  },
};

export const Festival: Story = {
  args: {
    event: {
      ...baseEvent,
      type: 'festival',
      name: 'Diwali Celebrations',
      designation: 'Company-Wide Event',
    },
  },
};
