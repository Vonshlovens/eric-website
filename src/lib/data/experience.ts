export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  duration: string;
  location: string;
  duties: string[];
  technologies: string[];
}

export const experiences: WorkExperience[] = [
  {
    id: 'exp-1',
    title: 'Senior Full-Stack Developer',
    company: 'TechCorp Inc.',
    duration: 'Jan 2022 – Present',
    location: 'San Francisco, CA (Remote)',
    duties: [
      'Lead development of customer-facing web applications serving 500k+ users',
      'Architect and implement microservices infrastructure using Node.js and Go',
      'Reduced page load times by 60% through performance optimization',
      'Mentor junior developers through code reviews and pair programming sessions'
    ],
    technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker']
  },
  {
    id: 'exp-2',
    title: 'Full-Stack Developer',
    company: 'StartupXYZ',
    duration: 'Mar 2020 – Dec 2021',
    location: 'Austin, TX',
    duties: [
      'Built and maintained core product features for a B2B SaaS platform',
      'Developed RESTful APIs and integrated third-party services',
      'Shipped features that contributed to 40% revenue growth',
      'Implemented CI/CD pipelines and automated testing infrastructure'
    ],
    technologies: ['JavaScript', 'Vue.js', 'Python', 'Django', 'MySQL', 'GCP']
  },
  {
    id: 'exp-3',
    title: 'Frontend Developer',
    company: 'Digital Agency Co.',
    duration: 'Jun 2018 – Feb 2020',
    location: 'New York, NY',
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
    title: 'Web Developer',
    company: 'Freelance',
    duration: 'Jan 2017 – May 2018',
    location: 'Remote',
    duties: [
      'Delivered custom websites and web applications for small businesses',
      'Managed client relationships and project timelines',
      'Handled full project lifecycle from requirements to deployment'
    ],
    technologies: ['WordPress', 'PHP', 'JavaScript', 'CSS', 'MySQL']
  }
];
