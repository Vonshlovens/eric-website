export interface Interest {
  id: string;
  title: string;
  description: string;
  icon: string; // Material Symbols icon name
  links?: Array<{ label: string; url: string }>;
}

export const interests: Interest[] = [
  {
    id: 'interest-1',
    title: 'Open Source',
    description:
      'Contributing to developer tools and libraries. Believer in building in public and giving back to the community.',
    icon: 'lock_open',
    links: [{ label: 'GitHub Profile', url: 'https://github.com/Vonshlovens' }]
  },
  {
    id: 'interest-2',
    title: 'Running',
    description:
      "Training for marathons and trail runs. There's something about pushing limits that translates directly to problem-solving.",
    icon: 'directions_run'
  },
  {
    id: 'interest-3',
    title: 'Photography',
    description:
      'Street photography and landscapes. Learning to see patterns and composition everywhere.',
    icon: 'photo_camera'
  },
  {
    id: 'interest-4',
    title: 'Coffee',
    description:
      'Home barista exploring single-origin beans and brewing methods. Currently obsessed with pour-over.',
    icon: 'coffee'
  }
];
