export interface Experience {
  id: string;
  company: string;
  icon: 'building' | 'rocket' | 'palette' | 'briefcase';
  title: string;
  duration: string;
  location: string;
  type: 'full-time' | 'contract' | 'freelance';
  duties: string[];
  achievements?: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'TechCorp Inc.',
    icon: 'building',
    title: 'Senior Full-Stack Developer',
    duration: 'Jan 2022 - Present',
    location: 'San Francisco, CA (Remote)',
    type: 'full-time',
    duties: [
      'Lead development of customer-facing web applications serving 500k+ users',
      'Architect and implement microservices infrastructure using Node.js and Go',
      'Mentor junior developers through code reviews and pair programming sessions',
      'Collaborate with product and design teams to define technical requirements'
    ],
    achievements: [
      'Reduced page load times by 60% through performance optimization',
      'Led migration from monolith to microservices architecture'
    ],
    technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker']
  },
  {
    id: 'exp-2',
    company: 'StartupXYZ',
    icon: 'rocket',
    title: 'Full-Stack Developer',
    duration: 'Mar 2020 - Dec 2021',
    location: 'Austin, TX',
    type: 'full-time',
    duties: [
      'Built and maintained core product features for a B2B SaaS platform',
      'Developed RESTful APIs and integrated third-party services',
      'Implemented CI/CD pipelines and automated testing infrastructure',
      'Participated in agile development processes and sprint planning'
    ],
    achievements: [
      'Shipped features that contributed to 40% revenue growth',
      'Achieved 90%+ test coverage across critical modules'
    ],
    technologies: ['JavaScript', 'Vue.js', 'Python', 'Django', 'MySQL', 'GCP']
  },
  {
    id: 'exp-3',
    company: 'Digital Agency Co.',
    icon: 'palette',
    title: 'Frontend Developer',
    duration: 'Jun 2018 - Feb 2020',
    location: 'New York, NY',
    type: 'full-time',
    duties: [
      'Developed responsive web applications for diverse client portfolio',
      'Created interactive UI components and animations',
      'Collaborated with designers to implement pixel-perfect interfaces',
      'Optimized web performance and accessibility compliance'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Sass', 'Figma']
  },
  {
    id: 'exp-4',
    company: 'Freelance',
    icon: 'briefcase',
    title: 'Web Developer',
    duration: 'Jan 2017 - May 2018',
    location: 'Remote',
    type: 'freelance',
    duties: [
      'Delivered custom websites and web applications for small businesses',
      'Managed client relationships and project timelines',
      'Handled full project lifecycle from requirements to deployment'
    ],
    technologies: ['WordPress', 'PHP', 'JavaScript', 'CSS', 'MySQL']
  }
];
