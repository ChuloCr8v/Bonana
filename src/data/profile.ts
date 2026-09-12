import { ProfileInfo, WhatIDoItem, ColorToken } from '../types';

export const PERSONAL_INFO: ProfileInfo = {
  name: 'Bona (Nkematu Bonaventure)',
  shortName: 'Bona',
  title: 'Engineering Team Lead & Full-Stack Developer',
  heroDescription: 'I build production web applications, backend systems, and developer tools from idea to deployment.',
  location: 'Lagos, Nigeria',
  status: 'Open to remote opportunities',
  timezone: 'WAT (UTC+1)',
  currentRole: 'Engineering Team Lead at Zoracom',
  teamScope: '11-person cross-functional engineering team',
  email: 'chulocr8v@gmail.com',
  github: 'https://github.com/chulocr8v',
  linkedin: 'https://linkedin.com/in/chulocr8v',
  aboutIntro:
    "I'm a full-stack engineer and engineering lead focused on building reliable web products, backend systems, and internal tools. I enjoy working across the stack — from product architecture and database design to frontend implementation and deployment.",
  buildingPhilosophy:
    'I design, build, and maintain production software end to end: scalable PostgreSQL schema migrations, optimistic concurrency controls, Stripe billing lifecycle handling, headless PDF rendering pipelines in Docker, and published npm CLI developer tools.'
};

export const WHAT_I_DO_ITEMS: WhatIDoItem[] = [
  {
    id: 'product-engineering',
    title: 'Product Engineering',
    tagline: 'Building production-ready applications from idea to launch.',
    description:
      'Translating user needs and product requirements into reliable, responsive web applications with polished UX, resilient client caching, and robust state machines.',
    points: [
      'Full-stack architecture from day zero through user onboarding and production scaling',
      'High-performance React and Next.js SPAs with optimistic updates and accessible UI',
      'Production-tested payment processing, subscription management, and webhook pipelines'
    ]
  },
  {
    id: 'backend-systems',
    title: 'Backend & Systems',
    tagline: 'Designing APIs, databases, workflows, integrations, and backend services.',
    description:
      'Designing clean API contracts, relational database schemas, queue-based background workers, and secure third-party service orchestrations.',
    points: [
      'Scalable NestJS and Node.js REST and microservice architectures with validation',
      'PostgreSQL data modeling, indexes, ACID transactions, and Prisma ORM migrations',
      'Distributed worker queues (BullMQ, Redis), rate limiting, and idempotency guarantees'
    ]
  },
  {
    id: 'engineering-leadership',
    title: 'Engineering Leadership',
    tagline: 'Supporting teams through architecture decisions, code reviews, and technical direction.',
    description:
      'Fostering engineering excellence by aligning cross-functional teams, reducing ambiguity, and mentoring developers in production reliability.',
    points: [
      'Guiding an 11-person cross-functional team of frontend, backend, and product engineers',
      'Standardizing code review criteria, CI/CD automated gates, and deployment runbooks',
      'De-risking complex technical initiatives through RFCs and architecture spikes'
    ]
  },
  {
    id: 'developer-tooling',
    title: 'Developer Tooling',
    tagline: 'Building tools that improve engineering workflows and productivity.',
    description:
      'Creating CLI utilities, configuration managers, and automation scripts that eliminate team friction and protect sensitive secrets.',
    points: [
      'Published npm CLI utilities with cross-platform terminal compatibility',
      'Zero-leak team secret synchronization tools with conflict resolution protocols',
      'Automated local dev environment bootstrapping and mock testing harnesses'
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
