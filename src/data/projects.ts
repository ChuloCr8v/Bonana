import { Project } from '../types';

import qikcvImg from '../assets/images/qikcv_app_preview_1789037151519.jpg';
import qikcvAtsImg from '../assets/images/qikcv_ats_analytics_1789165664116.jpg';
import botforgeImg from '../assets/images/botforge_app_preview_1789037165849.jpg';
import botforgeAnalyticsImg from '../assets/images/botforge_analytics_view_1789165678002.jpg';
import qikenvImg from '../assets/images/qikenv_app_preview_1789037179658.jpg';
import qikenvDiffImg from '../assets/images/qikenv_conflict_diff_1789166190252.jpg';
import quikagendaImg from '../assets/images/quikagenda_app_preview_1789037192173.jpg';
import quikagendaCalendarImg from '../assets/images/quikagenda_calendar_view_1789165688349.jpg';
import ossyardImg from '../assets/images/ossyard_directory_preview_1789165637502.jpg';
import ossyardSecurityImg from '../assets/images/ossyard_security_graph_1789166265321.jpg';
import ajoImg from '../assets/images/ajo_fintech_preview_1789165652719.jpg';
import ajoPayoutImg from '../assets/images/ajo_payout_queue_1789166253037.jpg';
import portfolioPreviewImg from '../assets/images/portfolio_ui_full_preview_1789037205991.jpg';

export { portfolioPreviewImg };

export const ALL_PROJECTS: Project[] = [
  {
    id: 'qikcv',
    name: 'QikCV',
    tier: 'primary',
    tagline: 'AI-assisted CV and job application workspace for tailoring resumes to specific roles.',
    featured: true,
    category: 'SaaS / Career Technology',
    imageUrl: qikcvImg,
    imageAlt: 'QikCV AI resume builder interface and PDF generation engine',
    galleryImages: [
      {
        url: qikcvImg,
        title: 'Resume Editor & PDF Workflow',
        caption: 'Interactive document editor with side-by-side parsing and target role matching.'
      },
      {
        url: qikcvAtsImg,
        title: 'Job Description Comparison & Analysis',
        caption: 'Automated skill gap identification and contextual phrase suggestions.'
      }
    ],
    architectureTag: 'Featured System · SaaS',
    overview:
      'QikCV helps users turn a job description and existing resume into a more targeted application. It combines document parsing, job-description analysis, CV generation, comparison, and application tracking in one workflow.',
    problem:
      'Job applications often require repeating the same work across different roles: reading job descriptions, identifying relevant experience, rewriting CV sections, formatting documents, and preparing follow-up communication.',
    solution:
      'Built a workflow that parses resumes and job descriptions, extracts relevant information, generates tailored CV content, provides a side-by-side difference view, and supports PDF and Markdown export.',
    role: 'Designed and built the product across frontend and backend, including the document workflow, generation pipeline, CV editing experience, exports, application tracking, and supporting APIs.',
    myContribution: [
      'Designed and built end-to-end full-stack architecture across frontend and NestJS backend API.',
      'Engineered PDF compilation service with single-column layout formatting and rendering constraints.',
      'Designed LLM prompt chains (Groq / OpenAI API) for resume parsing, job specification matching, and content generation.',
      'Implemented transactional credit billing and webhook reconciliation via Stripe.'
    ],
    architecture: {
      frontend: 'React, Vite, TypeScript, Tailwind CSS, Ant Design, Redux Toolkit.',
      backend: 'NestJS REST API, Node.js runtime, BullMQ Redis worker queue for document processing.',
      database: 'PostgreSQL managed with Prisma ORM for user documents, revisions, and billing ledgers.',
      infrastructure: 'Docker container deployments, S3 document storage, CloudFront CDN, Stripe Webhooks.'
    },
    architectureDetails: [
      'Keyword matching engine compares CV tokens with employer job specifications.',
      'Document processing engine generates single-column PDFs using layout rules.',
      'Transactional credit ledger with Stripe webhook idempotency prevents double billing.',
      'Client-side state caching guarantees zero work loss during network drops.'
    ],
    technicalHighlights: [
      'Custom headless browser execution cluster in Docker with automated memory management.',
      'Structured schema validation enforcing output guidelines on AI resume suggestions.',
      'Optimistic state updates for instant inline text editing synchronized to PostgreSQL.'
    ],
    challenges: [
      'Maintaining visual fidelity between the browser editor preview and exported PDF print output.',
      'Guarding AI suggestions to keep candidate achievements accurate and aligned with target roles.'
    ],
    outcome: [
      'Built an application tracking and resume tailoring platform.',
      'Implemented structured schema validation for AI-generated resume suggestions.',
      'Integrated end-to-end document compilation through the editor, API, and worker queue.'
    ],
    results: [
      'Document parsing, matching, and generation pipeline',
      'Structured schema validation for AI resume suggestions',
      'Containerized worker queue for asynchronous document export'
    ],
    techStack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Ant Design', 'Redux Toolkit', 'NestJS', 'Prisma', 'PostgreSQL', 'Groq API', 'OpenAI API', 'PDF.js', 'Mammoth', 'Puppeteer'],
    links: {
      github: 'https://github.com/chulocr8v',
      live: 'https://qikcv.vercel.app',
      caseStudy: '/projects/qikcv'
    }
  },
  {
    id: 'botforge',
    name: 'Qikbot',
    tier: 'secondary',
    tagline: 'Telegram automation platform for managing broadcast campaigns and messaging workflows.',
    featured: true,
    category: 'SaaS / Automation',
    imageUrl: botforgeImg,
    imageAlt: 'Qikbot community broadcast dashboard and subscriber tier management',
    galleryImages: [
      {
        url: botforgeImg,
        title: 'Broadcast Campaign Console',
        caption: 'Centralized console for managing message schedules, delivery jobs, and broadcast channels.'
      },
      {
        url: botforgeAnalyticsImg,
        title: 'Subscriber Tier Analytics',
        caption: 'Subscriber access control, membership reconciliation, and payment status tracking.'
      }
    ],
    architectureTag: 'Featured System · Automation',
    overview:
      'A multi-tenant platform for creating and managing Telegram messaging campaigns with background processing, account controls, and usage management.',
    problem:
      'Managing large messaging campaigns manually becomes difficult when campaigns, users, delivery jobs, and account limits all have to be coordinated.',
    solution:
      'Built a system around queued background jobs, tenant-aware workflows, usage controls, and Telegram integrations.',
    role: 'Designed and implemented the application architecture, backend workflows, queue processing, integrations, and supporting product interfaces.',
    myContribution: [
      'Built distributed message dispatching with BullMQ to handle queue scheduling and API limits.',
      'Created multi-tenant permissions allowing agencies to assign scoped team roles.',
      'Integrated Stripe webhooks to automate channel access based on subscription status.',
      'Designed a resilient webhook handler recovering gracefully from network drops.'
    ],
    architecture: {
      frontend: 'React, TypeScript, Redux Toolkit, Tailwind CSS, Ant Design data grids.',
      backend: 'NestJS modular architecture, Node.js, Telegram Bot API long-polling & webhooks.',
      database: 'PostgreSQL with Prisma ORM, Redis for message queues and rate-limit counters.',
      infrastructure: 'Oracle Cloud Infrastructure (OCI) Compute, Docker, Caddy reverse proxy, Stripe Webhooks.'
    },
    architectureDetails: [
      'Rate-limit throttling engine enforces API constraints across broadcast channels.',
      'Automated membership worker updates subscriber lists and manages private invite links.',
      'Role-based permission matrix prevents unauthorized access to billing or channel deletion.',
      'Idempotent webhook pipeline prevents duplicate posts during upstream retries.'
    ],
    technicalHighlights: [
      'Implemented rate-limiters with Redis to honor messaging caps without dropping queued tasks.',
      'Generated single-use invite links for subscription access management.'
    ],
    challenges: [
      'Coordinating delivery jobs across high volume broadcast channels without exceeding platform rate limits.',
      'Handling immediate channel access revocation when payment status changes in Stripe.'
    ],
    outcome: [
      'Built and deployed background delivery dispatch workflows.',
      'Implemented scoped team permissions and subscription access logic.',
      'Verified link management flows against payment status updates.'
    ],
    results: [
      'Queued background processing for campaign dispatches',
      'Role-based permissions for delegated team management',
      'Subscription access control tied to payment events'
    ],
    techStack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'Telegram API', 'Stripe'],
    links: {
      github: 'https://github.com/chulocr8v',
      live: 'https://botforge.app',
      caseStudy: '/projects/botforge'
    }
  },
  {
    id: 'qikenv',
    name: 'Qikenv',
    tier: 'secondary',
    tagline: 'Encrypted environment-variable management for development teams.',
    featured: true,
    category: 'Developer Tool',
    imageUrl: qikenvImg,
    imageAlt: 'Qikenv CLI terminal tool and encrypted team environment manager',
    galleryImages: [
      {
        url: qikenvImg,
        title: 'CLI Synchronization & Encryption',
        caption: 'Node.js CLI with client-side AES-256-GCM encryption and optimistic concurrency control.'
      },
      {
        url: qikenvDiffImg,
        title: 'Conflict Resolution Diff Visualizer',
        caption: 'In-browser conflict resolution and side-by-side terminal environment diff.'
      }
    ],
    architectureTag: 'Featured System · Developer Tool',
    overview:
      'Qikenv is a secure environment-variable vault and CLI workflow designed to make sharing and managing application configuration easier across development environments.',
    problem:
      'Environment variables are often shared through insecure channels or copied manually between machines and team members.',
    solution:
      'Built a centralized workflow for storing, retrieving, and managing environment configuration, with a CLI for developer workflows.',
    role: 'Built the product architecture, web interface, backend services, CLI workflow, encryption layer, and team configuration management.',
    myContribution: [
      'Implemented client-side AES-256-GCM encryption before secret payloads leave the terminal.',
      'Engineered an Optimistic Concurrency Control (OCC) protocol preventing silent overwrites of configuration keys.',
      'Published and maintained the CLI package on npm for developer teams.',
      'Built an interactive in-browser OCC conflict resolution simulator.'
    ],
    architecture: {
      frontend: 'Interactive documentation & browser OCC simulator built in React & TypeScript.',
      backend: 'NestJS REST API, Node.js CLI runtime, cryptographic signing engine.',
      database: 'PostgreSQL with Prisma, tracking project revision histories, SHA-256 digests, and access logs.',
      infrastructure: 'Published to npm Registry, backend on AWS ECS with RDS PostgreSQL.'
    },
    architectureDetails: [
      'Zero-installation CLI (`npx qikenv`) running cross-platform on macOS, Linux, and Windows.',
      'Cryptographic SHA-256 version digests detecting diverged team config branches.',
      'Atomic filesystem write swapping preventing corrupt configs on interruption.',
      'Audit logging tracking modifications to team configurations.'
    ],
    technicalHighlights: [
      'Atomic filesystem write swapping: writes to `.tmp` file and performs atomic rename.',
      'Interactive terminal diff visualizer highlighting added, updated, and deprecated keys.'
    ],
    challenges: [
      'Designing an intuitive merge flow when team members update configuration keys simultaneously.',
      'Keeping CLI execution fast and lightweight when invoked via `npx`.'
    ],
    outcome: [
      'Built encrypted environment synchronization with AES-256-GCM client encryption.',
      'Verified optimistic concurrency conflict detection using version tags and SHA-256 digests.',
      'Implemented atomic filesystem swapping to ensure config file safety.'
    ],
    results: [
      'Client-side encryption for environment configuration payloads',
      'Optimistic concurrency conflict detection for team secret updates',
      'Cross-platform npm CLI workflow for pulling project configuration'
    ],
    techStack: ['TypeScript', 'React', 'NestJS', 'PostgreSQL', 'Prisma', 'Node.js', 'CLI tooling', 'AES-256-GCM'],
    links: {
      github: 'https://github.com/chulocr8v',
      npm: 'https://www.npmjs.com/package/qikenv',
      live: 'https://www.npmjs.com/package/qikenv',
      caseStudy: '/projects/qikenv'
    },
    cliCommand: 'npx qikenv pull'
  },
  {
    id: 'quikagenda',
    name: 'QuikAgenda',
    tier: 'secondary',
    tagline: 'Meeting workflow tool connecting transcription, summaries, action items, and calendar workflows.',
    featured: true,
    category: 'SaaS / Productivity',
    imageUrl: quikagendaImg,
    imageAlt: 'QuikAgenda meeting summary and calendar automation dashboard',
    galleryImages: [
      {
        url: quikagendaImg,
        title: 'Meeting Intelligence & Action Items',
        caption: 'Transcription interface with AI-extracted deliverables, owner assignments, and action items.'
      },
      {
        url: quikagendaCalendarImg,
        title: 'Microsoft 365 Calendar Synchronization',
        caption: 'Calendar synchronization and meeting follow-up scheduling via Microsoft Graph API.'
      }
    ],
    architectureTag: 'Featured System · Productivity',
    overview:
      'QuikAgenda connects meeting data with follow-up actions so important decisions and tasks are easier to capture after meetings.',
    problem:
      'Meeting outcomes are often lost between transcripts, notes, calendars, and follow-up tasks.',
    solution:
      'Built workflows for processing meeting recordings, extracting useful information, and connecting outcomes with calendar and productivity workflows.',
    role: 'Built the application and supporting integrations across the frontend, backend, AI processing, and Microsoft calendar workflows.',
    myContribution: [
      'Implemented Microsoft Graph API OAuth 2.0 calendar integration for checking schedule availability and creating events.',
      'Engineered structured extraction prompts with OpenAI to classify meeting topics into decisions and follow-ups.',
      'Built a reactive React dashboard displaying call transcripts and pending calendar items.',
      'Configured Recall.ai bot webhooks for automated recording ingestion and transcript pipelines.'
    ],
    architecture: {
      frontend: 'React 19, TypeScript, Tailwind CSS, Ant Design timeline components.',
      backend: 'NestJS API, Node.js background processors, Recall.ai webhook listeners.',
      database: 'PostgreSQL with Prisma, storing meeting transcripts, extracted action items, and sync states.',
      infrastructure: 'AWS ECS container deployment, S3 encrypted audio storage, Microsoft Azure AD App Registration.'
    },
    architectureDetails: [
      'Two-way calendar synchronization with Outlook using Microsoft Graph delta queries.',
      'Speaker diarization pipeline mapping transcript segments to recognized team members.',
      'Tenant isolation ensuring internal corporate notes remain private.',
      'Automated email recap dispatch sending summary digests to attendees.'
    ],
    technicalHighlights: [
      'Structured schema generation with OpenAI function calling ensuring action items have valid dates and assigned owners.',
      'Handling meeting rescheduling events via Microsoft Graph webhooks.'
    ],
    challenges: [
      'Resolving calendar booking conflicts across team members in different time zones.',
      'Maintaining accurate speaker attribution across noisy meeting audio.'
    ],
    outcome: [
      'Built and tested the meeting ingestion flow from recording webhooks through transcript storage.',
      'Implemented structured action-item extraction with schema-constrained OpenAI function calling.',
      'Verified Microsoft Graph calendar conflict checks and event creation workflows.'
    ],
    results: [
      'Recall.ai webhook ingestion for meeting recordings',
      'Schema-constrained action item extraction for meetings',
      'Microsoft Graph calendar synchronization workflow'
    ],
    techStack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Microsoft Graph', 'Recall.ai', 'OpenAI API'],
    links: {
      github: 'https://github.com/chulocr8v',
      live: 'https://quikagenda.com',
      caseStudy: '/projects/quikagenda'
    }
  },
  {
    id: 'ossyard',
    name: 'OSSYard',
    tier: 'other',
    tagline: 'A developer-focused platform for discovering, organizing, and working with open-source projects.',
    featured: false,
    category: 'Developer Ecosystem & Open Source',
    imageUrl: ossyardImg,
    imageAlt: 'OSSYard open-source package discovery directory',
    galleryImages: [
      {
        url: ossyardImg,
        title: 'Open Source Package Directory',
        caption: 'Curated developer directory indexing repository commit activity and maintenance indicators.'
      },
      {
        url: ossyardSecurityImg,
        title: 'Dependency Health Matrix',
        caption: 'Package maintenance scoring and dependency graph analysis.'
      }
    ],
    problem:
      'Developers spend significant time evaluating unmaintained packages that may introduce build breakages or security vulnerabilities.',
    solution:
      'A discovery platform indexing open-source projects with maintenance metrics, PR response signals, and ecosystem categorization so teams select reliable dependencies.',
    role: 'Creator & frontend engineer: GitHub API ingestion, repository scoring, and responsive directory interface.',
    myContribution: [
      'Built a fast static frontend querying GitHub REST API for repository health metrics.',
      'Designed a clean, categorized directory layout enabling filtering by ecosystem.',
      'Implemented client-side fuzzy search across indexed developer utilities.'
    ],
    architecture: {
      frontend: 'React, TypeScript, Tailwind CSS, Fuse.js client search.',
      backend: 'Serverless functions consuming GitHub GraphQL & REST APIs.',
      database: 'Static JSON dataset regenerated via automated GitHub Actions.',
      infrastructure: 'Vercel edge deployment with global CDN caching.'
    },
    architectureDetails: [
      'Repository evaluation scoring commit activity, open PR response times, and license metrics.',
      'Instant client-side fuzzy search across curated libraries.',
      'Static architecture deployed at the edge with automated daily data sync.'
    ],
    technicalHighlights: [
      'Client-side search index cached in IndexedDB for fast exploration.'
    ],
    challenges: [
      'Formulating objective repository metrics balancing popularity with maintainer responsiveness.'
    ],
    outcome: [
      'Built a static package discovery interface backed by GitHub API ingestion.',
      'Implemented repository health evaluation indicators for commit activity and PR updates.'
    ],
    results: [
      'Client-side Fuse.js search across package dataset',
      'Static JSON regeneration flow via GitHub Actions',
      'Repository health scoring model for dependency evaluation'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'GitHub REST API', 'Vercel'],
    links: {
      github: 'https://github.com/chulocr8v',
      live: 'https://ossyard.dev',
      caseStudy: '/projects/ossyard'
    }
  },
  {
    id: 'ajo',
    name: 'Ajo',
    tier: 'other',
    tagline: 'A digital savings and contribution management product built around structured group financial workflows.',
    featured: false,
    category: 'Fintech & Community Banking',
    imageUrl: ajoImg,
    imageAlt: 'Ajo rotating savings and credit association ledger platform',
    galleryImages: [
      {
        url: ajoImg,
        title: 'Group Savings Contribution Ledger',
        caption: 'Double-entry contribution ledger, transparent pool tracker, and rotation schedule.'
      },
      {
        url: ajoPayoutImg,
        title: 'Member Disbursement Timeline',
        caption: 'Disbursement queue, member rotation timeline, and payout schedule tracking.'
      }
    ],
    problem:
      'Manual management of informal group savings circles often leads to missing funds, missed contribution cycles, and lack of audit visibility.',
    solution:
      'A digital platform tracking member contributions in real time, automating payment reminders, and scheduling transparent payout cycles.',
    role: 'Full-Stack Developer: Financial ledger design, payout scheduling algorithms, and member notification triggers.',
    myContribution: [
      'Designed double-entry transaction database schema mapping contributions to scheduled disbursements.',
      'Built automated notification engine triggering payment reminders prior to cycle deadlines.',
      'Implemented a mobile-first dashboard for members to track pool progress and payout turns.'
    ],
    architecture: {
      frontend: 'React, TypeScript, Tailwind CSS, responsive mobile-first UI.',
      backend: 'NestJS REST API, Node.js background scheduler for payout dates.',
      database: 'PostgreSQL with Prisma ORM enforcing constraints on payout schedules.',
      infrastructure: 'Docker containers on AWS, RDS PostgreSQL, automated daily backups.'
    },
    architectureDetails: [
      'Double-entry transaction ledger maintaining mathematical balance across group rounds.',
      'Automated payout rotation scheduler enforcing agreed-upon turn sequences.',
      'Real-time transparency feed displaying validated contributions to all members.'
    ],
    technicalHighlights: [
      'Atomic SQL transactions ensuring contributions are recorded and credited simultaneously.'
    ],
    challenges: [
      'Designing flexible rotation rules to handle emergency cycle adjustments while maintaining trust.'
    ],
    outcome: [
      'Built double-entry contribution ledger flows for savings groups.',
      'Implemented payout rotation scheduling with database constraints.',
      'Verified reminder trigger logic for upcoming contribution deadlines.'
    ],
    results: [
      'Double-entry transaction ledger for contribution tracking',
      'Automated payout rotation scheduler',
      'Notification trigger workflow for contribution reminders'
    ],
    techStack: ['NestJS', 'PostgreSQL', 'Prisma', 'React', 'TypeScript', 'Tailwind CSS', 'Docker'],
    links: {
      github: 'https://github.com/chulocr8v',
      live: 'https://ajo-savings.vercel.app',
      caseStudy: '/projects/ajo'
    }
  },
  {
    id: 'nemsa',
    name: 'NEMSA Inspection System',
    tier: 'enterprise',
    tagline: 'Digital inspection and certification platform supporting inspection requests, payments, document submissions, and certification workflows.',
    featured: false,
    category: 'Enterprise Governance & Energy Infrastructure',
    overview:
      'Digital inspection and certification platform supporting inspection requests, payments, document submissions, and certification workflows for energy infrastructure compliance.',
    problem:
      'Inspection requests and related administrative processes required structured digital workflows instead of fragmented manual handling.',
    solution:
      'Built and maintained workflows that allow applicants to submit inspection requests, upload required information, process payments, and manage certification-related activities.',
    role: 'Worked across both frontend and backend development, implementing features, API integrations, data workflows, and ongoing product improvements.',
    myContribution: [
      'Worked across frontend and backend development for inspection operation workflows.',
      'Built applicant submission portals, payment integrations, and certificate verification interfaces.',
      'Implemented a payment dispute workflow to handle cases where applicants missed payment items, helping recover otherwise missed payments.'
    ],
    architecture: {
      frontend: 'React, TypeScript, Ant Design UI components.',
      backend: 'NestJS REST API, Node.js backend services.',
      database: 'PostgreSQL with Prisma ORM.',
      infrastructure: 'Docker containers, Oracle Cloud Infrastructure.'
    },
    architectureDetails: [
      'Inspection status tracking pipeline for field officers and administrative reviews.',
      'Payment gateway integration with automated dispute recovery workflows.',
      'Document and digital certificate generation system.'
    ],
    technicalHighlights: [
      'Payment dispute resolution flow for recovering incomplete transaction submissions.'
    ],
    challenges: [
      'Designing robust data validation across multi-step government inspection applications.'
    ],
    outcome: [
      'The platform has contributed to more than ₦100 million in revenue generated for the Federal Government.',
      'Implemented payment dispute workflow for recovering missed payment items.',
      'Delivered full-stack inspection and certification administrative systems.'
    ],
    results: [
      'Contributed to more than ₦100 million in revenue generated for the Federal Government',
      'Added payment dispute recovery workflow to capture missed transactions',
      'Full-stack delivery of digital inspection requests and certification'
    ],
    techStack: ['React', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Ant Design', 'Docker', 'Oracle Cloud']
  } as Project,
  {
    id: 'talentx',
    name: 'TalentX',
    tier: 'enterprise',
    tagline: 'Digital employee management platform replacing paper-based HR processes with structured workflows and centralized employee data.',
    featured: false,
    category: 'Enterprise HR & Talent Architecture',
    overview:
      'TalentX is a digital employee management platform replacing paper-based HR processes with structured workflows and centralized employee data. Offered to organizations as a product/service.',
    problem:
      'Manual employee records and paper-based processes made HR operations slower and harder to manage.',
    solution:
      'Built digital workflows for employee information, HR processes, appraisal-related activities, and organizational data management.',
    role: 'Worked across frontend and backend development, implementing features, APIs, data workflows, and product improvements.',
    myContribution: [
      'Implemented full-stack modules for employee record management and HR requests.',
      'Built appraisal tracking workflows and organizational data management screens.',
      'Designed REST endpoints and Prisma database models for employee lifecycle events.'
    ],
    architecture: {
      frontend: 'React, TypeScript, Tailwind CSS.',
      backend: 'NestJS REST API, Node.js runtime.',
      database: 'PostgreSQL with Prisma ORM.',
      infrastructure: 'AWS S3, Docker containers.'
    },
    architectureDetails: [
      'Centralized employee records directory with role-based access control.',
      'Performance appraisal workflow tracking evaluation metrics.',
      'Multi-tenant data isolation enabling white-label deployment to client organizations.'
    ],
    technicalHighlights: [
      'Dynamic appraisal form builder with versioned evaluation templates.'
    ],
    challenges: [
      'Supporting flexible organizational structures across different corporate clients.'
    ],
    outcome: [
      'Delivered core employee management workflows replacing manual paper records.',
      'Supported deployment of the platform as a commercial enterprise service.'
    ],
    results: [
      'Digital HR workflow implementation',
      'Centralized employee data architecture',
      'Multi-organization service platform delivery'
    ],
    techStack: ['React', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'AWS S3', 'Docker']
  } as Project,
  {
    id: 'servicex',
    name: 'ServiceX',
    tier: 'enterprise',
    tagline: 'Service management platform supporting dashboards, licenses, field operations, ticketing, surveys, and operational analytics.',
    featured: false,
    category: 'Enterprise Telecom & Service Operations',
    overview:
      'ServiceX is a service management platform supporting dashboards, licenses, field operations, ticketing, surveys, and operational analytics for telecom infrastructure.',
    problem:
      'Service operations require visibility across requests, field activities, tickets, surveys, and performance indicators.',
    solution:
      'Built application workflows and dashboards that bring operational information into one platform.',
    role: 'Contributed to product development across frontend and backend features, dashboards, workflows, and integrations.',
    myContribution: [
      'Contributed to ticket management and SLA tracking module development.',
      'Built real-time operational analytics dashboards for service desk managers.',
      'Integrated backend API endpoints with PostgreSQL data models.'
    ],
    architecture: {
      frontend: 'React, TypeScript, Ant Design dashboards.',
      backend: 'NestJS REST API, Node.js services.',
      database: 'PostgreSQL with Prisma ORM, Redis caching.',
      infrastructure: 'Docker container deployments.'
    },
    architectureDetails: [
      'Incident ticket lifecycle workflow with automated SLA countdown timers.',
      'Field survey and operation monitoring dashboards.',
      'Redis cache layer for operational metric query optimization.'
    ],
    technicalHighlights: [
      'Real-time SLA status monitoring counters wired to ticket escalation queues.'
    ],
    challenges: [
      'Optimizing dashboard query latency over large historical incident log tables.'
    ],
    outcome: [
      'Shipped unified operational dashboards for field and service desk tracking.',
      'Implemented automated ticket lifecycle and survey workflows.'
    ],
    results: [
      'Operational analytics and service dashboards',
      'Ticketing and field operation management workflows',
      'SLA tracking and incident escalation integration'
    ],
    techStack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Redis', 'Ant Design', 'Docker']
  } as Project,
  {
    id: 'zoracom-field-app',
    name: 'Zoracom Field App',
    tier: 'enterprise',
    tagline: 'React Native mobile application for tracking network installation and maintenance activities across field engineering teams.',
    featured: false,
    category: 'Mobile / Field Operations',
    overview:
      'The application gives field engineers structured workflows for recording installation and maintenance activities on site.',
    problem:
      'Field engineering teams needed a structured mobile workflow for recording network installation and maintenance activities directly at field locations.',
    solution:
      'Built step-based installation workflows, progress tracking, photo capture, maintenance workflows, organization-defined forms/checklists, structured reporting, and automated PowerPoint/Excel report generation with captured images.',
    role: 'Contributed to the development of the mobile application and its operational workflows.',
    myContribution: [
      'Contributed to mobile application development using React Native and TypeScript.',
      'Implemented step-based installation workflows and organization-defined checklists.',
      'Built photo capture integration for site maintenance verification.',
      'Contributed to report generation services outputting Excel and PowerPoint files with captured images and site data.'
    ],
    architecture: {
      frontend: 'React Native, TypeScript, mobile client UI.',
      backend: 'REST API integrations, report generation service.',
      database: 'PostgreSQL backend data tier.',
      infrastructure: 'Mobile bundle builds, API services.'
    },
    architectureDetails: [
      'Step-based installation wizard guiding engineers through mandatory verification steps.',
      'Media capture module attaching site photos directly to field inspection records.',
      'Automated document builder compiling field data into PowerPoint presentations and Excel spreadsheets.'
    ],
    technicalHighlights: [
      'Automated PowerPoint presentation and Excel spreadsheet generator compiling site photos and structured inspection data.'
    ],
    challenges: [
      'Ensuring reliable offline photo capture and data caching during remote field operations.'
    ],
    outcome: [
      'Delivered mobile field engineering workflows for site installations and maintenance.',
      'Implemented automated Excel and PowerPoint report generation with embedded site photos.'
    ],
    results: [
      'Step-based installation and maintenance mobile workflows',
      'Organization-defined dynamic forms and photo capture',
      'PowerPoint and Excel report generation with field data and photos'
    ],
    techStack: ['React Native', 'TypeScript', 'API Integrations', 'Report Generation']
  } as Project
];

export const FEATURED_PROJECTS: Project[] = ALL_PROJECTS.filter((p) => p.featured);
export const CLIENT_PROJECTS: Project[] = ALL_PROJECTS.filter((p) =>
  ['nemsa', 'talentx', 'servicex', 'zoracom-field-app'].includes(p.id)
);
export const OTHER_PROJECTS: Project[] = ALL_PROJECTS.filter(
  (p) => !p.featured && !CLIENT_PROJECTS.some((clientProject) => clientProject.id === p.id)
);

