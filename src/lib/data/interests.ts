import { site } from '$lib/config/site';

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
      'Maintain a handful of CLI tools and Deno modules. Most recent: a terminal-UI library with 200+ GitHub stars. Building in public since 2019.',
    icon: 'lock_open',
    links: [{ label: 'GitHub Profile', url: site.github.url }]
  },
  {
    id: 'interest-2',
    title: 'Running',
    description:
      'Half-marathon PR: 1:38. Currently training for a full marathon on mountain trails. Morning runs are where most debugging happens.',
    icon: 'directions_run'
  },
  {
    id: 'interest-3',
    title: 'Coffee',
    description:
      'Home pour-over setup: Hario V60 + Baratza Encore. Current rotation: Ethiopian Yirgacheffe and Colombian Huila. 18g in, 300g out.',
    icon: 'coffee'
  }
];
