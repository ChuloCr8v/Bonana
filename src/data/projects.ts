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
    tagline: 'AI-powered CV optimization platform that analyzes job descriptions, improves resume alignment, and generates application-ready documents.',
    featured: true,
    category: 'AI SaaS & Career Infrastructure',
    imageUrl: qikcvImg,
    imageAlt: 'QikCV AI resume builder interface and PDF generation engine',
    galleryImages: [
      {
        url: qikcvImg,
        title: 'Resume Editor & Real-Time PDF Engine',
        caption: 'Live interactive editor with ATS-optimized layout, instant compilation, and typography controls.'
      },
      {
        url: qikcvAtsImg,
        title: 'ATS Semantic Analysis & Keyword Gap Matrix',
        caption: 'Automated keyword density comparison and semantic alignment scoring against employer requirements.'
      }
    ],
    architectureTag: 'Primary Showcase · AI SaaS',
    overview:
      'QikCV is an AI-assisted document engineering platform designed to help technical candidates and professionals optimize their CVs against real employer job specifications, eliminating automated rejection loops while preserving verifiable credentials.',
    problem:
      'A significant share of technical applications are filtered through automated Applicant Tracking Systems (ATS) before reaching engineering managers. Candidates frequently fail screening due to mismatched semantic taxonomy, multi-column parsing errors, or missing key competencies already present in their work history.',
    solution:
      'Built a structured resume editor that performs deep semantic analysis between candidate experiences and target job descriptions. The platform computes keyword density scores, suggests contextual achievement phrasing, and compiles clean, single-column ATS-compliant PDF documents using a containerized headless browser pipeline.',
    role: 'Product architecture, frontend development, backend implementation, AI workflow design.',
    myContribution: [
      'Architected end-to-end full-stack system: React SPA frontend, NestJS backend API, and worker queue.',
      'Engineered an ATS-friendly headless PDF generation service using Puppeteer running inside Docker containers with strict layout constraints.',
      'Designed structured LLM prompt chains (OpenAI / Groq API) for semantic gap analysis and real-time keyword alignment suggestions.',
      'Implemented transactional pay-as-you-go credit billing and webhook reconciliation using Stripe.'
    ],
    architecture: {
      frontend: 'React 19, TypeScript, Tailwind CSS, RTK Query, Radix UI primitive accessible dialogs.',
      backend: 'NestJS REST API, Node.js runtime, BullMQ Redis worker queue for asynchronous PDF compilation.',
      database: 'PostgreSQL managed with Prisma ORM, indexed for user document revisions and credit ledgers.',
      infrastructure: 'Docker containers deployed on AWS ECS, S3 document storage, CloudFront CDN, Stripe Webhooks.'
    },
    architectureDetails: [
      'Semantic keyword matching engine compares CV tokens with employer job postings in under 800ms.',
      'Automated headless browser PDF engine generates pixel-precise, zero-artifact single-column PDFs.',
      'Transactional credit ledger with Stripe webhook idempotency prevents double-charging during generation.',
      'Strict client-side state caching with RTK Query guarantees zero work loss during network drops.'
    ],
    technicalHighlights: [
      'Custom Puppeteer cluster pool in Docker with memory recycling to prevent chromium memory leaks under concurrency.',
      'Structured JSON output validation enforcing hallucination guards on candidate skill matrices.',
      'Optimistic state updates for instant inline text editing with debounce synchronization to PostgreSQL.'
    ],
    challenges: [
      'Maintaining precise 1:1 visual fidelity between the browser interactive preview and the server-rendered PDF print layout across diverse font families.',
      'Preventing LLM hallucinations from fabricating experiences or false metrics when suggesting resume enhancements.'
    ],
    outcome: [
      'Built a deterministic single-column PDF export pipeline using Puppeteer in Docker.',
      'Implemented structured JSON validation to constrain AI-generated resume suggestions.',
      'Tested end-to-end document compilation through the resume editor, backend API, and worker queue.'
    ],
    results: [
      'Deterministic Puppeteer PDF generation pipeline',
      'Structured schema validation for AI output',
      'Containerized worker queue for asynchronous document compilation'
    ],
    techStack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Puppeteer', 'Stripe', 'OpenAI API'],
    links: {
      github: 'https://github.com/chulocr8v',
      live: 'https://qikcv.vercel.app',
      caseStudy: '/projects/qikcv'
    }
  },
  {
    id: 'botforge',
    name: 'BotForge (Qikbot)',
    tier: 'secondary',
    tagline: 'Multi-tenant broadcast automation and subscriber management platform for Telegram communities.',
    featured: true,
    category: 'Community Infrastructure & Automation',
    imageUrl: botforgeImg,
    imageAlt: 'BotForge community broadcast dashboard and subscriber tier management',
    galleryImages: [
      {
        url: botforgeImg,
        title: 'Broadcast Dispatch & Channel Console',
        caption: 'Centralized console for queuing announcements, scheduling broadcasts, and managing channel staff.'
      },
      {
        url: botforgeAnalyticsImg,
        title: 'Subscriber Lifecycle & VIP Tier Analytics',
        caption: 'Real-time subscriber churn tracking, Stripe webhook reconciliation, and automated private invite links.'
      }
    ],
    architectureTag: 'Secondary · Community Automation',
    overview:
      'BotForge is a multi-tenant SaaS that enables high-volume community operators and agencies to schedule broadcasts, automate subscription access tiers, and manage VIP channels without sharing master account credentials.',
    problem:
      'Community managers and marketing agencies spend 15+ hours weekly manually posting announcements, managing user lists, and checking subscription payments across multiple channels. Sharing administrator logins frequently leads to credential leaks and accidental channel deletion.',
    solution:
      'Constructed a centralized web dashboard coupled with an event-driven bot daemon. Operators define scheduled message workflows, configure recurring subscription tiers via Stripe, and delegate scoped team permissions without ever exposing Telegram API credentials.',
    role: 'Backend architecture, Telegram bot event loop design, database schema, frontend dashboard implementation.',
    myContribution: [
      'Built a distributed message dispatcher with BullMQ to handle Telegram API rate limits (30 msgs/sec per channel).',
      'Created multi-tenant RBAC allowing agencies to assign granular channel permissions to junior staff.',
      'Integrated Stripe billing webhooks to automatically grant and revoke private channel invite links upon payment status changes.',
      'Designed a resilient webhook handler that gracefully recovers from transient network drops.'
    ],
    architecture: {
      frontend: 'React, TypeScript, Redux Toolkit, Tailwind CSS, Ant Design data grids.',
      backend: 'NestJS modular architecture, Node.js, Telegram Bot API long-polling & webhooks.',
      database: 'PostgreSQL with Prisma ORM, Redis for message queues and rate-limit counters.',
      infrastructure: 'Oracle Cloud Infrastructure (OCI) Compute, Docker, Caddy reverse proxy, Stripe Webhooks.'
    },
    architectureDetails: [
      'Smart rate-limit throttling engine enforces Telegram API token bucket constraints across hundreds of channels.',
      'Automated membership lifecycle worker purges expired subscribers and generates single-use signed invite links.',
      'Role-based permission matrix prevents assistants from viewing private revenue data or deleting channels.',
      'Idempotent webhook pipeline guarantees zero duplicate broadcast posts even during upstream retries.'
    ],
    technicalHighlights: [
      'Implemented sliding-window rate limiters with Redis to honor Telegram API rate caps without dropping events.',
      'Single-use signed invite links that expire immediately after joining to stop link leaks on paid tiers.'
    ],
    challenges: [
      'Handling Telegram’s strict broadcast rate limits during massive flash sales without introducing high dispatch latency.',
      'Ensuring immediate channel kick actions when a user issues a credit card chargeback in Stripe.'
    ],
    outcome: [
      'Built and tested the BullMQ-backed Telegram dispatch workflow in development.',
      'Implemented scoped team permissions and Stripe webhook handling for subscription access logic.',
      'Verified invite-link grant and revocation flows against simulated payment status changes.'
    ],
    results: [
      'Redis-backed rate limiting for Telegram broadcast dispatch',
      'RBAC permission matrix for delegated channel operations',
      'Idempotent webhook handling for subscription lifecycle events'
    ],
    techStack: ['NestJS', 'PostgreSQL', 'Prisma', 'React', 'Redis', 'BullMQ', 'Stripe', 'Telegram Bot API'],
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
    tagline: 'Encrypted team environment vault and CLI tool with optimistic concurrency conflict resolution.',
    featured: true,
    category: 'Developer Tooling & Security',
    imageUrl: qikenvImg,
    imageAlt: 'Qikenv CLI terminal tool and encrypted team environment manager',
    galleryImages: [
      {
        url: qikenvImg,
        title: 'CLI Synchronization & Encryption Architecture',
        caption: 'Zero-dependency npm CLI with client-side AES-256-GCM encryption and optimistic concurrency.'
      },
      {
        url: qikenvDiffImg,
        title: 'Conflict Resolution Diff Visualizer',
        caption: 'Interactive in-browser OCC conflict resolution and side-by-side terminal environment diff.'
      }
    ],
    architectureTag: 'Secondary · Developer Tooling',
    overview:
      'Qikenv is a published open-source CLI developer tool and encrypted cloud vault designed to synchronize environment variables across development teams while preventing stale config overwrites.',
    problem:
      'Developers constantly break team builds due to outdated local `.env` files, or worse, paste sensitive production credentials into unencrypted Slack or WhatsApp threads. Traditional vault tools require heavy agents that slow down local developer workflows.',
    solution:
      'Created an ultra-lightweight Node.js CLI tool (`npx qikenv pull`) backed by a secure REST API. Variables are stored encrypted at rest, and concurrent team pushes are safeguarded using optimistic concurrency control (version tags and hash digests).',
    role: 'CLI engineering, cryptographic pipeline, backend API, npm package author and maintainer.',
    myContribution: [
      'Implemented client-side AES-256-GCM encryption before secret payloads leave the developer terminal.',
      'Engineered an Optimistic Concurrency Control (OCC) protocol preventing teammates from silently overwriting each other’s keys.',
      'Published and maintained the zero-dependency CLI package on the npm public registry.',
      'Built an interactive in-browser OCC conflict resolution simulator to demonstrate distributed state merging.'
    ],
    architecture: {
      frontend: 'Interactive documentation & browser OCC simulator built in React & TypeScript.',
      backend: 'NestJS REST API, Node.js CLI runtime, cryptographic signing engine.',
      database: 'PostgreSQL with Prisma, tracking project revision histories, SHA-256 digests, and team access logs.',
      infrastructure: 'Published to npm Registry, backend on AWS ECS with RDS PostgreSQL.'
    },
    architectureDetails: [
      'Zero-installation CLI (`npx qikenv`) runs cross-platform on macOS, Linux, and Windows terminals.',
      'Cryptographic SHA-256 version digests detect diverged team branches before writing to disk.',
      'Automated atomic `.env` file swapping ensures corrupt configs are never left in working directories.',
      'Audit logging tracks which team member modified or pulled environment configurations.'
    ],
    technicalHighlights: [
      'Atomic filesystem write swapping: writes to a `.tmp` file and performs atomic rename to prevent half-written files on SIGINT.',
      'Interactive terminal diff visualizer highlighting added, updated, and deprecated keys in colored ANSI format.'
    ],
    challenges: [
      'Designing an intuitive interactive terminal merge flow when two engineers add differing keys simultaneously.',
      'Minimizing CLI bundle size to guarantee sub-second cold starts when invoked via `npx`.'
    ],
    outcome: [
      'Built and tested encrypted environment synchronization with client-side AES-256-GCM handling.',
      'Verified optimistic concurrency conflict detection using version tags and SHA-256 digests.',
      'Implemented atomic `.env` file swapping to avoid partial local writes.'
      // VERIFY: confirm before publishing
      // Removed previous npm download count until the current npmjs.com/package/qikenv figure is checked.
      // VERIFY: confirm before publishing
      // Removed previous internal Zoracom adoption claim until Bona confirms it is accurate.
    ],
    results: [
      'Client-side encryption before environment payloads leave the terminal',
      'Optimistic concurrency conflict detection for team secret updates',
      'Cross-platform npm CLI flow for pulling project environment variables'
    ],
    techStack: ['TypeScript', 'Node.js CLI', 'NestJS', 'PostgreSQL', 'Prisma', 'Crypto (AES-256)', 'npm Registry'],
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
    tagline: 'AI meeting intelligence engine that extracts action items, assigns owners, and automates calendar bookings.',
    featured: true,
    category: 'AI Enterprise Productivity',
    imageUrl: quikagendaImg,
    imageAlt: 'QuikAgenda meeting summary and calendar automation dashboard',
    galleryImages: [
      {
        url: quikagendaImg,
        title: 'Meeting Intelligence & AI Action Items',
        caption: 'Speaker-attributed transcription with AI-extracted deliverables, owner assignments, and confidence tags.'
      },
      {
        url: quikagendaCalendarImg,
        title: 'Microsoft 365 Calendar Synchronization & Booking',
        caption: 'Automated calendar hold placement, conflict detection, and Outlook sync via Microsoft Graph.'
      }
    ],
    architectureTag: 'Secondary · Productivity SaaS',
    overview:
      'QuikAgenda is an automated meeting transcription and workflow orchestration platform that connects with Microsoft 365 to turn verbal team decisions into scheduled calendar checkpoints and trackable tasks.',
    problem:
      'Engineering and product teams spend hours in discovery and standup calls, yet next steps frequently get lost in memory. Project managers lose 45 minutes after every call writing summaries, following up on assignments, and scheduling subsequent calendar hold times.',
    solution:
      'Integrated a meeting bot that records call audio, runs speaker-attributed transcription via speech-to-text APIs, extracts actionable deliverables with assigned owners using LLMs, and invokes Microsoft Graph API to automatically schedule follow-up bookings on attendees’ calendars.',
    role: 'Full-stack development, Microsoft Graph OAuth integration, AI prompt orchestration, calendar sync engine.',
    myContribution: [
      'Implemented enterprise Microsoft Graph API OAuth 2.0 integration for calendar reading, conflict checking, and event creation.',
      'Engineered structured extraction prompts with OpenAI to classify agenda topics into decisions, tasks, and follow-ups.',
      'Built a reactive React dashboard displaying call transcripts, sentiment breakdowns, and pending calendar invites.',
      'Configured Recall.ai bot webhooks for automated recording ingestion and asynchronous transcription pipelines.'
    ],
    architecture: {
      frontend: 'React 19, TypeScript, Tailwind CSS, Ant Design timeline components.',
      backend: 'NestJS API, Node.js background processors, Recall.ai audio ingress webhook listeners.',
      database: 'PostgreSQL with Prisma, storing meeting transcripts, extracted action items, and calendar synchronization states.',
      infrastructure: 'AWS ECS container deployment, S3 encrypted audio storage, Microsoft Azure AD App Registration.'
    },
    architectureDetails: [
      'Two-way calendar synchronization with Microsoft Outlook calendars using Microsoft Graph delta queries.',
      'Speaker diarization pipeline maps transcript segments to recognized team members automatically.',
      'Strict tenant isolation ensures meeting transcripts and internal corporate memos remain private.',
      'Automated email dispatch sends recap digests to attendees immediately following call completion.'
    ],
    technicalHighlights: [
      'Structured schema generation with OpenAI function calling ensuring action items always have valid ISO dates and assigned emails.',
      'Handling meeting rescheduling events via Microsoft Graph webhooks with automatic task deadline adjustments.'
    ],
    challenges: [
      'Resolving calendar booking conflicts across multiple team members across different time zones seamlessly.',
      'Handling noisy audio and overlapping speakers while maintaining accurate speaker attribution in technical jargon.'
    ],
    outcome: [
      'Built and tested the meeting ingestion flow from recording webhook through transcript storage.',
      'Implemented structured action-item extraction with schema-constrained OpenAI function calling.',
      'Verified Microsoft Graph calendar conflict checks and event creation in development scenarios.'
    ],
    results: [
      'Recall.ai webhook ingestion wired to asynchronous processing',
      'Schema-constrained action item extraction for meetings',
      'Microsoft Graph calendar synchronization workflow'
    ],
    techStack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Microsoft Graph API', 'OpenAI API', 'Recall.ai'],
    links: {
      github: 'https://github.com/chulocr8v',
      live: 'https://quikagenda.com',
      caseStudy: '/projects/quikagenda'
    }
  },
  {
    id: 'nemsa',
    name: 'NEMSA Inspection System',
    tier: 'enterprise',
    tagline: 'National electricity management compliance and field inspection operations system for energy infrastructure.',
    featured: false,
    category: 'Enterprise Governance & Energy Infrastructure',
    overview:
      'NEMSA Inspection System is a Zoracom client platform in the energy compliance and field inspection domain. Bona contributed to the full-stack delivery of workflows for inspection operations, certificate handling, and administrative review.',
    techStack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Ant Design', 'Docker', 'Oracle Cloud']
  } as Project,
  {
    id: 'talentx',
    name: 'TalentX',
    tier: 'enterprise',
    tagline: 'Enterprise candidate assessment, interview scoring, and technical talent acquisition engine.',
    featured: false,
    category: 'Enterprise HR & Talent Architecture',
    overview:
      'TalentX is a Zoracom client platform in the recruiting operations and candidate evaluation domain. Bona contributed to full-stack delivery across hiring workflows, structured scorecards, and pipeline management interfaces.',
    techStack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'AWS S3', 'Docker']
  } as Project,
  {
    id: 'servicex',
    name: 'ServiceX',
    tier: 'enterprise',
    tagline: 'Multi-tenant IT service desk, incident escalation, and SLA tracking platform for telecom infrastructure.',
    featured: false,
    category: 'Enterprise Telecom & Service Operations',
    overview:
      'ServiceX is a Zoracom client platform in the telecom service operations and incident management domain. Bona contributed to full-stack delivery for ticket workflows, SLA tracking, and operational dashboards.',
    techStack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Redis', 'Ant Design', 'Docker']
  } as Project,
  {
    id: 'ossyard',
    name: 'OSSYard',
    tier: 'other',
    tagline: 'Curated developer directory evaluating open-source packages by maintenance health, security, and community adoption.',
    featured: false,
    category: 'Developer Ecosystem & Open Source',
    imageUrl: ossyardImg,
    imageAlt: 'OSSYard open-source package discovery directory and health scoring',
    galleryImages: [
      {
        url: ossyardImg,
        title: 'Open Source Maintenance Health Directory',
        caption: 'Curated package directory scoring commit velocity, CVE security history, and license compliance.'
      },
      {
        url: ossyardSecurityImg,
        title: 'Dependency Health & CVE Vulnerability Matrix',
        caption: 'Automated security scan breakdown, package maintenance scoring, and dependency graph analysis.'
      }
    ],
    problem:
      'Developers waste countless hours reinventing existing tools or installing abandoned libraries that break in production, cause build failures, or introduce supply-chain security vulnerabilities.',
    solution:
      'A curated discovery engine that indexes and scores open-source packages by active maintenance, issue resolution velocity, test coverage, and community trust so engineering teams make safe dependency decisions.',
    role: 'Creator & frontend engineer: GitHub API ingestion, scoring algorithms, and responsive directory interface.',
    myContribution: [
      'Built a fast static frontend querying GitHub REST API to compute repository health scores.',
      'Designed a clean, categorized directory layout enabling instant filtering by ecosystem and license.',
      'Implemented client-side fuzzy search across hundreds of indexed developer utilities.'
    ],
    architecture: {
      frontend: 'React, TypeScript, Tailwind CSS, Fuse.js client search.',
      backend: 'Serverless functions consuming GitHub GraphQL & REST APIs.',
      database: 'Static JSON dataset regenerated via automated CI/CD GitHub Actions.',
      infrastructure: 'Vercel edge deployment with global CDN caching.'
    },
    architectureDetails: [
      'Automated repository evaluation scoring commit activity, open PR response times, and CVE history.',
      'Sub-50ms instant client-side fuzzy search across hundreds of curated libraries.',
      'Zero-maintenance static architecture deployed at the edge with automated daily data sync.'
    ],
    technicalHighlights: [
      'Client-side search index pre-loaded and cached in IndexedDB for instant offline-capable exploration.'
    ],
    challenges: [
      'Formulating an objective repository health metric that balances raw popularity with active maintainer responsiveness.'
    ],
    outcome: [
      'Built a static package discovery interface backed by GitHub API ingestion.',
      'Implemented repository health scoring inputs for commit activity, issue response, and CVE history.'
    ],
    results: [
      // VERIFY: confirm before publishing
      // Removed previous package-count claim until the indexed dataset size is confirmed.
      'Client-side Fuse.js search across the generated package dataset',
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
    tagline: 'Digital community rotating savings and credit association (ROSCA) platform with transparent audit trails.',
    featured: false,
    category: 'Fintech & Community Banking',
    imageUrl: ajoImg,
    imageAlt: 'Ajo rotating savings and credit association ledger platform',
    galleryImages: [
      {
        url: ajoImg,
        title: 'Community Rotating Savings (ROSCA) Ledger',
        caption: 'Double-entry contribution ledger, transparent pool tracker, and automated rotation schedule.'
      },
      {
        url: ajoPayoutImg,
        title: 'Member Payout Rotation Timeline & Queue',
        caption: 'Automated turn-by-turn disbursement queue, member payout rotation schedule, and payment tracking.'
      }
    ],
    problem:
      'Millions of people participate in informal peer-to-peer rotating savings groups (Esusu / Ajo) to build capital, but manual ledger keeping frequently leads to missing funds, missed cycles, and painful social trust disputes.',
    solution:
      'A transparent digital platform that tracks group member contributions in real time, automates payment reminders, and schedules verifiable payout cycles so every participant receives their disbursement reliably.',
    role: 'Full-Stack Developer: Financial ledger design, payout scheduling algorithms, and member notification triggers.',
    myContribution: [
      'Designed double-entry transaction database schema ensuring every contribution maps to a scheduled group disbursement.',
      'Built automated notification engine triggering payment reminders via SMS and email prior to cycle deadlines.',
      'Implemented an intuitive mobile-first dashboard where members track group pool progress and upcoming payout turns.'
    ],
    architecture: {
      frontend: 'React, TypeScript, Tailwind CSS, responsive mobile-first UI.',
      backend: 'NestJS REST API, Node.js background scheduler for payout rotation dates.',
      database: 'PostgreSQL with Prisma ORM, strict constraints preventing payout schedule manipulation.',
      infrastructure: 'Docker containers on AWS, RDS PostgreSQL, automated daily database backups.'
    },
    architectureDetails: [
      'Double-entry transaction ledger guaranteeing mathematical balance across all group rounds.',
      'Automated payout rotation scheduler enforcing fair turn sequences agreed upon at group creation.',
      'Real-time transparency feed displaying validated contributions to all circle participants.'
    ],
    technicalHighlights: [
      'Atomic SQL transactions ensuring contributions are recorded and credited simultaneously without partial state corruption.'
    ],
    challenges: [
      'Designing flexible payout rotation rules that handle emergency cycle skips or member swaps without breaking group consensus.'
    ],
    outcome: [
      'Built and tested double-entry contribution ledger flows for rotating savings groups.',
      'Implemented payout rotation scheduling with database constraints for cycle integrity.',
      'Verified reminder trigger logic for upcoming contribution deadlines in development.'
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
  }
];

export const FEATURED_PROJECTS: Project[] = ALL_PROJECTS.filter((p) => p.featured);
export const CLIENT_PROJECTS: Project[] = ALL_PROJECTS.filter((p) =>
  ['nemsa', 'talentx', 'servicex'].includes(p.id)
);
export const OTHER_PROJECTS: Project[] = ALL_PROJECTS.filter(
  (p) => !p.featured && !CLIENT_PROJECTS.some((clientProject) => clientProject.id === p.id)
);
