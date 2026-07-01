import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CelebrationWall } from './CelebrationWall';
import { CelebrationEvent } from '../../types';

type CelebrationWallStoryProps = React.ComponentProps<typeof CelebrationWall> & {
  theme?: string;
  locale?: string;
};

const meta: Meta<CelebrationWallStoryProps> = {
  title: 'Components/CelebrationWall',
  component: CelebrationWall,
  argTypes: {
    theme: {
      control: 'select',
      options: ['corporate', 'celebration', 'glass', 'minimal', 'premium', 'festive'],
    },
    gridCols: {
      control: { type: 'number', min: 1, max: 4 },
      defaultValue: 3,
    },
  },
};

export default meta;
type Story = StoryObj<CelebrationWallStoryProps>;

const sampleWallEvents: CelebrationEvent[] = [
  { id: 'w-1', name: 'Sarah Jenkins', type: 'birthday', date: 'June 30', designation: 'Senior Creative Director', department: 'Design' },
  { id: 'w-2', name: 'Marcus Vance', type: 'anniversary', date: 'July 1', designation: 'Principal Architect', years: 5, department: 'Engineering' },
  { id: 'w-3', name: 'Deepak Rao', type: 'promotion', date: 'July 2', designation: 'VP of Engineering', department: 'Platform Core' },
  { id: 'w-4', name: 'Leila Chen', type: 'award', date: 'June 28', designation: 'Lead Security Analyst', achievement: 'Hero Award', department: 'Security' },
  { id: 'w-5', name: 'Alok Mishra', type: 'new_joiner', date: 'June 15', designation: 'Graduate Architect', department: 'UI Engineering' },
  { id: 'w-6', name: 'Diana Prince', type: 'festival', date: 'July 4', designation: 'Community Host', department: 'Public Relations' },
  { id: 'w-7', name: 'Bruce Wayne', type: 'anniversary', date: 'July 10', designation: 'Executive Director', years: 15, department: 'Board' },
  { id: 'w-8', name: 'Clark Kent', type: 'promotion', date: 'July 11', designation: 'Senior Reporter', department: 'Media Relations' },
  { id: 'w-9', name: 'Peter Parker', type: 'new_joiner', date: 'June 20', designation: 'Photojournalist Intern', department: 'Communications' },
  { id: 'w-10', name: 'Tony Stark', type: 'award', date: 'June 22', designation: 'Chief Futurist', achievement: 'Stark Tech Award', department: 'R&D' },
  { id: 'w-11', name: 'Steve Rogers', type: 'anniversary', date: 'July 4', designation: 'Strategic Operations Lead', years: 75, department: 'Defense' },
  { id: 'w-12', name: 'Natasha Romanoff', type: 'promotion', date: 'July 6', designation: 'Director of Global Intelligence', department: 'Intelligence' },
  { id: 'w-13', name: 'Thor Odinson', type: 'birthday', date: 'July 15', designation: 'Storm Management Specialist', department: 'Environment' },
  { id: 'w-14', name: 'Wanda Maximoff', type: 'award', date: 'June 29', designation: 'Reality Design Engineer', achievement: 'Nexus Award', department: 'Creative Labs' },
];

export const GridWall: Story = {
  args: {
    events: sampleWallEvents,
    gridCols: 3,
  },
};

export const CustomColumns: Story = {
  args: {
    events: sampleWallEvents,
    gridCols: 4,
  },
};
