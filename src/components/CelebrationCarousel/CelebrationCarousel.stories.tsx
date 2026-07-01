import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CelebrationCarousel } from './CelebrationCarousel';
import { CelebrationEvent } from '../../types';

type CelebrationCarouselStoryProps = React.ComponentProps<typeof CelebrationCarousel> & {
  theme?: string;
  locale?: string;
};

const meta: Meta<CelebrationCarouselStoryProps> = {
  title: 'Components/CelebrationCarousel',
  component: CelebrationCarousel,
  argTypes: {
    theme: {
      control: 'select',
      options: ['corporate', 'celebration', 'glass', 'minimal', 'premium', 'festive'],
    },
    locale: {
      control: 'select',
      options: ['en', 'hi', 'ta'],
    },
    autoPlay: {
      control: 'boolean',
    },
    autoPlayDelay: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<CelebrationCarouselStoryProps>;

const sampleEvents: CelebrationEvent[] = [
  {
    id: 'carousel-1',
    name: 'Sarah Jenkins',
    type: 'birthday',
    date: 'June 30',
    designation: 'Senior Creative Director',
    department: 'Design',
  },
  {
    id: 'carousel-2',
    name: 'Marcus Vance',
    type: 'anniversary',
    date: 'July 1',
    designation: 'Principal Architect',
    years: 5,
  },
  {
    id: 'carousel-3',
    name: 'Deepak Rao',
    type: 'promotion',
    date: 'July 2',
    designation: 'VP of Engineering',
    department: 'Platform Core',
  },
  {
    id: 'carousel-4',
    name: 'Leila Chen',
    type: 'award',
    date: 'June 28',
    designation: 'Lead Security Analyst',
    achievement: 'Outstanding Hero Award',
    customMessage: 'Leila secured our entire client portal single-handedly during a critical maintenance window.',
  }
];

export const StandardCarousel: Story = {
  args: {
    events: sampleEvents,
    autoPlay: true,
    autoPlayDelay: 5000,
  },
};

export const WithoutReactions: Story = {
  args: {
    events: sampleEvents,
    allowReactions: false,
  },
};

export const LegacyPeopleSupport: Story = {
  args: {
    people: [
      {
        name: 'John Doe (Legacy)',
        designation: 'Software Engineer',
        birthday: 'June 30',
        message: 'Happy Birthday John!'
      },
      {
        name: 'Jane Smith (Legacy)',
        designation: 'Product Manager',
        message: 'Congratulations on 3 years!'
      }
    ]
  },
};
