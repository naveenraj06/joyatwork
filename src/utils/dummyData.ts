import { CelebrationEvent } from '../types';

export const SAMPLE_EVENTS: CelebrationEvent[] = [
  {
    id: 'evt-1',
    type: 'birthday',
    name: 'Sarah Jenkins',
    designation: 'Senior Product Designer',
    department: 'UX Research & Design',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    company: 'Nexus Corp',
    date: 'June 29',
    customMessage: 'Wishing Sarah an absolutely fabulous birthday! Thanks for bringing magic to our designs! 🎨✨',
  },
  {
    id: 'evt-2',
    type: 'anniversary',
    name: 'Marcus Chen',
    designation: 'Principal Engineer',
    department: 'Core Infrastructure',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    company: 'Nexus Corp',
    date: 'June 28',
    years: 5,
  },
  {
    id: 'evt-3',
    type: 'promotion',
    name: 'Elena Rostova',
    designation: 'VP of Engineering',
    department: 'Technology Leadership',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    company: 'Nexus Corp',
    date: 'July 1',
  },
  {
    id: 'evt-4',
    type: 'award',
    name: 'David Kim',
    designation: 'Staff Security Engineer',
    department: 'Cybersecurity & Trust',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    company: 'Nexus Corp',
    date: 'June 25',
    achievement: 'Outstanding Security Guard',
    customMessage: 'Awarded for securing 100% of our production cloud infrastructure from complex zero-day threats! 🛡️',
  },
  {
    id: 'evt-5',
    type: 'new_joiner',
    name: 'Aisha Patel',
    designation: 'Full Stack Engineer',
    department: 'Customer Growth Team',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    company: 'Nexus Corp',
    date: 'July 5',
  },
  {
    id: 'evt-6',
    type: 'festival',
    name: 'The Nexus Family',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=150',
    company: 'Nexus Corp',
    date: 'June 30',
    customMessage: 'Happy Festival of Lights to everyone celebrating! May this season bring endless prosperity, warm memories, and sweet treats! 🕯️🍬',
  },
  {
    id: 'evt-7',
    type: 'birthday',
    name: 'Brandon Smith',
    designation: 'DevOps Lead',
    department: 'Platform Engineering',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    company: 'Nexus Corp',
    date: 'June 30',
  },
  {
    id: 'evt-8',
    type: 'anniversary',
    name: 'Chloe Fontaine',
    designation: 'Senior HR Specialist',
    department: 'People Operations',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    company: 'Nexus Corp',
    date: 'June 29',
    years: 3,
  }
];

// Generate 500+ events to satisfy the "Support 500+ events" performance benchmark
export function generateLargeEventsList(): CelebrationEvent[] {
  const list: CelebrationEvent[] = [...SAMPLE_EVENTS];
  const departments = ['Engineering', 'Marketing', 'Sales', 'Product Management', 'HR', 'Finance', 'Security', 'Legal', 'Support'];
  const companies = ['Nexus Corp', 'Acme Corp', 'Spectre Inc', 'Globex LLC'];
  const firstNames = ['James', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Oliver', 'Isabella', 'William', 'Sophia', 'Elijah', 'Mia', 'Benjamin', 'Charlotte', 'Lucas', 'Amelia', 'Mason', 'Harper', 'Logan', 'Evelyn'];
  const lastNames = ['Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez'];
  const eventTypes: ('birthday' | 'anniversary' | 'promotion' | 'award' | 'new_joiner')[] = ['birthday', 'anniversary', 'promotion', 'award', 'new_joiner'];

  for (let i = 9; i <= 520; i++) {
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    const designation = `${['Lead', 'Senior', 'Staff', 'Junior', 'Associate'][Math.floor(Math.random() * 5)]} ${['Developer', 'Architect', 'Analyst', 'Consultant', 'Designer', 'Manager'][Math.floor(Math.random() * 6)]}`;
    const department = departments[Math.floor(Math.random() * departments.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const date = `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Math.floor(Math.random() * 12)]} ${Math.floor(Math.random() * 28) + 1}`;

    const item: CelebrationEvent = {
      id: `evt-large-${i}`,
      type,
      name,
      designation,
      department,
      company,
      date,
    };

    if (type === 'anniversary') {
      item.years = Math.floor(Math.random() * 10) + 1;
    } else if (type === 'award') {
      item.achievement = ['Innovator of the Month', 'Customer Champion', 'Values Pioneer', 'Rookie of the Year'][Math.floor(Math.random() * 4)];
    }

    list.push(item);
  }

  return list;
}
