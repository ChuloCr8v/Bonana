import { WorkRole } from '../types';

export const WORK_HISTORY: WorkRole[] = [
  {
    role: 'Engineering Team Lead',
    company: 'Zoracom',
    period: '2025 — Present',
    current: true,
    summary:
      'Lead engineering delivery across frontend, backend, and cloud infrastructure while guiding developers, improving engineering practices, and shipping production systems.',
    responsibilities: [
      'Led an 11-person engineering team across developers and designers, aligning sprints with product timelines.',
      'Built and maintained full-stack applications using React, Next.js, NestJS, PostgreSQL, and Prisma.',
      'Improved engineering workflows through rigorous code reviews, architecture RFCs, and standardized deployment practices.',
      'Supported developers through structured 1:1 mentorship, technical guidance, and onboarding best practices.'
    ],
    achievements: [
      'Led an 11-person engineering team across developers and designers.',
      'Built and maintained full-stack applications using React, Next.js, NestJS, PostgreSQL, and Prisma.',
      'Improved engineering workflows through reviews, architecture discussions, and deployment practices.',
      'Supported developers through mentorship and technical guidance.'
    ]
  },
  {
    role: 'Full-Stack Developer',
    company: 'Zoracom',
    period: '2023 — 2025',
    current: false,
    summary:
      'Engineered mission-critical enterprise platforms and cloud-backed microservices across both user interfaces and server infrastructure.',
    responsibilities: [
      'Developed production web applications using React, TypeScript, NestJS, Node.js, PostgreSQL, and Prisma.',
      'Built and maintained backend services for MTN DCEX, an enterprise client platform, using Express and Node.js.',
      'Designed APIs, database structures, authentication flows, and automated business workflows.',
      'Integrated resilient cloud deployments using AWS (ECS, S3, RDS) and Oracle Cloud Infrastructure (OCI).',
    ],
    achievements: [
      'Developed production web applications using React, TypeScript, NestJS, Node.js, PostgreSQL, and Prisma.',
      'Designed APIs, database structures, authentication flows, and business workflows.',
      'Integrated cloud deployments using AWS and Oracle Cloud.',
      'Built AI-powered workflows using LLM APIs.'
    ]
  },
  {
    role: 'Frontend Developer',
    company: 'Zoracom',
    period: '2021 — 2023',
    current: false,
    summary:
      'Built accessible, responsive dashboards and standardized UI component systems for enterprise clients.',
    responsibilities: [
      'Built responsive dashboards and web applications using React, TypeScript, Ant Design, and Tailwind CSS.',
      'Created reusable frontend components and translated design systems into production interfaces.',
      'Improved frontend performance, bundle sizing, and cross-browser maintainability across client applications.'
    ],
    achievements: [
      'Built responsive dashboards and applications using React, TypeScript, Ant Design, and Tailwind CSS.',
      'Created reusable frontend components and translated designs into production interfaces.',
      'Improved frontend performance and maintainability.'
    ]
  }
];
