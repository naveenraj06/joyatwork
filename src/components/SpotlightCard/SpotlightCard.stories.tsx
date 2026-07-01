import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SpotlightCard } from './SpotlightCard';
import { CelebrationEvent } from '../../types';

type SpotlightCardStoryProps = React.ComponentProps<typeof SpotlightCard> & {
  theme?: string;
  locale?: string;
};

const meta: Meta<SpotlightCardStoryProps> = {
  title: 'Components/SpotlightCard',
  component: SpotlightCard,
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
type Story = StoryObj<SpotlightCardStoryProps>;

const baseEvent: CelebrationEvent = {
  id: 'spot-1',
  name: 'Marcus Vance',
  type: 'award',
  date: 'June 30',
  designation: 'Principal Architect',
  department: 'Systems Engineering',
  company: 'Antigravity Labs',
  achievement: 'Top Technical Contributor',
  customMessage: 'Marcus demonstrated unmatched execution by refactoring the core high-throughput web component pipeline, boosting real-time reaction performance by over 300%.',
};

export const AwardSpotlight: Story = {
  args: {
    event: {
      ...baseEvent,
      type: 'award',
    },
  },
};

export const AnniversarySpotlight: Story = {
  args: {
    event: {
      ...baseEvent,
      type: 'anniversary',
      years: 10,
    },
  },
};

export const PromotionSpotlight: Story = {
  args: {
    event: {
      ...baseEvent,
      type: 'promotion',
      designation: 'VP of Platform Engineering',
    },
  },
};

export const NewJoinerSpotlight: Story = {
  args: {
    event: {
      ...baseEvent,
      type: 'new_joiner',
      designation: 'Distinguished Fellow',
    },
  },
};
