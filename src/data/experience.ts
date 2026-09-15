import { WorkRole } from '../types';

export const WORK_HISTORY: WorkRole[] = [
  {
    role: 'Engineering Team Lead',
    company: 'Zoracom',
    period: '2025 — Present',
    current: true,
    summary:
      'Lead an 11-person cross-functional engineering team delivering web, mobile, backend, and enterprise systems.',
    responsibilities: [
      'Coordinate engineering delivery across multiple products and client projects.',
      'Review technical approaches and contribute to architecture decisions.',
      'Establish clearer development, review, and delivery practices.',
      'Mentor engineers through structured 1:1s, code reviews, and technical guidance.',
      'Work with product and design stakeholders to turn requirements into implementable work.',
      'Support deployment, production troubleshooting, and ongoing system improvements.'
    ],
    achievements: [
      'Coordinated engineering delivery across web, mobile, backend, and client projects.',
      'Established standardized code reviews, technical practices, and delivery workflows.',
      'Guided team developers through 1:1 mentorship and architecture reviews.'
    ]
  },
  {
    role: 'Full-Stack Developer',
    company: 'Zoracom',
    period: '2023 — 2025',
    current: false,
    summary:
      'Built and maintained production web applications and backend services across enterprise and product environments.',
    responsibilities: [
      'Developed frontend features with React and TypeScript.',
      'Built backend APIs and business workflows with Node.js and NestJS.',
      'Designed and maintained PostgreSQL data models with Prisma.',
      'Integrated external services and APIs into production workflows.',
      'Worked on cloud deployments and production systems across AWS and Oracle Cloud.',
      'Contributed to AI-powered application workflows using LLM APIs.'
    ],
    achievements: [
      'Engineered core enterprise backend services and REST APIs for MTN client platforms.',
      'Designed database schemas, migration pipelines, and external API integrations.',
      'Deployed resilient cloud microservices on AWS and Oracle Cloud Infrastructure.'
    ]
  },
  {
    role: 'Frontend Developer',
    company: 'Zoracom',
    period: '2021 — 2023',
    current: false,
    summary:
      'Built responsive web interfaces and reusable frontend systems for production applications.',
    responsibilities: [
      'Developed React and TypeScript applications.',
      'Built reusable UI components and frontend patterns.',
      'Worked with Ant Design and Tailwind CSS.',
      'Improved frontend performance and maintainability.',
      'Collaborated with backend engineers and designers to deliver product features.'
    ],
    achievements: [
      'Built responsive client dashboards and standardized component libraries.',
      'Enhanced web page performance, accessibility, and cross-browser consistency.'
    ]
  }
];

