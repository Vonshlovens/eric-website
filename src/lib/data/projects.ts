export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'devtools-cli',
    title: 'DevTools CLI',
    description: 'A powerful command-line toolkit for developers. Automates common workflows, manages environment configs, and integrates with popular services.',
    tags: ['TypeScript', 'Node.js', 'CLI'],
    github: 'https://github.com',
    demo: 'https://npmjs.com',
    featured: true
  },
  {
    id: 'realtime-dashboard',
    title: 'Realtime Dashboard',
    description: 'Live metrics dashboard with WebSocket connections. Displays system health, user analytics, and custom KPIs with sub-second updates.',
    tags: ['Svelte', 'WebSocket', 'D3.js'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true
  },
  {
    id: 'api-gateway',
    title: 'API Gateway',
    description: 'High-performance API gateway with rate limiting, caching, and authentication. Handles 10k+ requests/second with minimal latency.',
    tags: ['Go', 'Redis', 'Docker'],
    github: 'https://github.com',
    featured: true
  },
  {
    id: 'markdown-editor',
    title: 'Markdown Editor',
    description: 'A minimalist markdown editor with live preview, syntax highlighting, and export options. Built for distraction-free writing.',
    tags: ['React', 'CodeMirror', 'PWA'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: false
  },
  {
    id: 'task-scheduler',
    title: 'Task Scheduler',
    description: 'Distributed task scheduling system with cron-like syntax. Supports retries, dead-letter queues, and observability.',
    tags: ['Rust', 'PostgreSQL', 'gRPC'],
    github: 'https://github.com',
    featured: false
  },
  {
    id: 'component-library',
    title: 'Component Library',
    description: 'Accessible, themeable UI components for modern web apps. Follows WAI-ARIA patterns with full keyboard navigation.',
    tags: ['Svelte', 'CSS', 'A11y'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: false
  }
];
