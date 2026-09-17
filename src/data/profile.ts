import { ProfileInfo, WhatIDoItem, ColorToken } from '../types';

export const PERSONAL_INFO: ProfileInfo = {
  name: 'Nkematu Bonaventure',
  shortName: 'Bona',
  title: 'Engineering Team Lead | Full-Stack Developer',
  heroDescription: 'I build production web and mobile applications, backend systems, and developer tools from idea to deployment.',
  location: 'Lagos, Nigeria',
  status: 'Open to remote opportunities',
  timezone: 'WAT (UTC+1)',
  currentRole: 'Engineering Team Lead — Zoracom',
  teamScope: '11-person cross-functional engineering team',
  email: 'chulocr8v@gmail.com',
  github: 'https://github.com/chulocr8v',
  linkedin: 'https://linkedin.com/in/chulocr8v',
  aboutIntro:
    'I build reliable web and mobile products across the full engineering lifecycle, from architecture and database design to frontend, backend, deployment, and ongoing development.',
  buildingPhilosophy:
    'I currently lead an 11-person cross-functional engineering team at Zoracom, where I work across product delivery, technical decisions, code quality, mentorship, and engineering processes. Alongside professional work, I build and maintain independent SaaS products and developer tools, including QikCV, Qikbot, Qikenv, and QikAgenda.'
};

export const WHAT_I_DO_ITEMS: WhatIDoItem[] = [
  {
    id: 'product-engineering',
    title: 'Product Engineering',
    tagline: 'Build and ship production applications from product requirements through implementation and deployment.',
    description:
      'Build and ship production applications from product requirements through implementation and deployment.',
    points: [
      'Frontend architecture and reusable components',
      'Full-stack feature development',
      'API and data integration',
      'Product-focused UX implementation'
    ]
  },
  {
    id: 'backend-systems',
    title: 'Backend & Systems',
    tagline: 'Design backend services and data systems that support real-world business workflows.',
    description:
      'Design backend services and data systems that support real-world business workflows.',
    points: [
      'REST APIs and service architecture',
      'PostgreSQL and Prisma data modeling',
      'Background jobs and queues',
      'Authentication and third-party integrations'
    ]
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development',
    tagline: 'Build practical mobile applications for field operations and business workflows with React Native.',
    description:
      'Build practical mobile applications for field operations and business workflows with React Native.',
    points: [
      'Step-based workflows',
      'Dynamic forms and checklists',
      'Media and document capture',
      'Report generation and operational tracking'
    ]
  },
  {
    id: 'engineering-leadership',
    title: 'Engineering Leadership',
    tagline: 'Lead engineers through planning, implementation, review, mentoring, and delivery.',
    description:
      'Lead engineers through planning, implementation, review, mentoring, and delivery.',
    points: [
      'Technical planning and architecture decisions',
      'Code review and engineering standards',
      'Mentorship and structured 1:1s',
      'Cross-functional delivery coordination'
    ]
  }
];

export const COLOR_TOKENS: ColorToken[] = [
  { name: 'Canvas', hex: '#09090b', usage: 'Page background & canvas foundation' },
  { name: 'Surface', hex: '#18181b', usage: 'Structural panels & container cards' },
  { name: 'Border', hex: '#27272a', usage: '1px structural grid dividers & boundary rules' },
  { name: 'Text Primary', hex: '#f4f4f5', usage: 'High-contrast body & heading ink (WCAG AAA)' },
  { name: 'Text Muted', hex: '#a1a1aa', usage: 'Descriptive copy & secondary technical metadata' },
  { name: 'Text Faint', hex: '#71717a', usage: 'Auxiliary indicators & mono metadata' }
];

