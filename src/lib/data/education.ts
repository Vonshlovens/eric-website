export interface Education {
  id: string;
  type: 'degree' | 'certification';
  name: string;
  institution: string;
  year: string;
  honors?: string;
  credentialUrl?: string;
}

export const education: Education[] = [
  {
    id: 'edu-1',
    type: 'degree',
    name: 'B.S. Computer Science',
    institution: 'University of Texas at Austin',
    year: '2017',
    honors: 'Magna Cum Laude'
  },
  {
    id: 'cert-1',
    type: 'certification',
    name: 'AWS Solutions Architect',
    institution: 'Amazon Web Services',
    year: '2023',
    credentialUrl: 'https://aws.amazon.com/certification/'
  },
  {
    id: 'cert-2',
    type: 'certification',
    name: 'Google Cloud Professional',
    institution: 'Google Cloud',
    year: '2022',
    credentialUrl: 'https://cloud.google.com/certification'
  }
];
