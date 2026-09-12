import { PERSONAL_INFO } from './profile';
import { WORK_HISTORY } from './experience';
import { TECHNICAL_STACK } from './skills';
import { ALL_PROJECTS } from './projects';

export const CV_DATA = {
  fileName: 'Nkematu_Bonaventure_Full_Stack_Engineer_CV.pdf',
  downloadUrl: '/Nkematu_Bonaventure_Full_Stack_Engineer_CV.pdf',
  header: {
    name: 'Nkematu Bonaventure',
    title: 'Engineering Team Lead & Full-Stack Developer',
    location: 'Lagos, Nigeria (Open to Remote)',
    email: PERSONAL_INFO.email,
    github: 'github.com/chulocr8v',
    linkedin: 'linkedin.com/in/chulocr8v',
    portfolio: 'bona.dev'
  },
  summary:
    'Engineering Team Lead and Full-Stack Developer with 5+ years of experience building and shipping production web applications, backend systems, and SaaS products. Experienced in React, Next.js, TypeScript, NestJS, PostgreSQL, cloud infrastructure, and AI-powered applications. Proven experience leading engineering teams, designing scalable systems, and delivering products from concept through deployment.',
  technicalSkills: TECHNICAL_STACK,
  experience: WORK_HISTORY,
  selectedProjects: ALL_PROJECTS.filter((p) => p.tier === 'primary' || p.tier === 'secondary' || p.tier === 'enterprise').slice(0, 5),
  education: [
    {
      degree: 'Bachelor of Science (B.Sc.) in Computer Science',
      institution: 'University of Lagos',
      period: '2016 — 2020',
      details: 'Focus on Distributed Systems, Algorithms, Database Systems, and Software Engineering Principles.'
    }
  ]
};

export const ATS_PLAINTEXT_CV = `
${CV_DATA.header.name}
${CV_DATA.header.title}
Location: ${CV_DATA.header.location}
Email: ${CV_DATA.header.email}
GitHub: https://${CV_DATA.header.github}
LinkedIn: https://${CV_DATA.header.linkedin}

============================================================
PROFESSIONAL SUMMARY
============================================================
${CV_DATA.summary}

============================================================
TECHNICAL SKILLS
============================================================
${TECHNICAL_STACK.map((group) => `${group.category.toUpperCase()}: ${group.items.join(', ')}`).join('\n')}

============================================================
PROFESSIONAL EXPERIENCE
============================================================
${WORK_HISTORY.map(
  (role) => `
${role.role.toUpperCase()} — ${role.company}
${role.period}
${role.summary}
Key Deliverables & Achievements:
${(role.achievements || role.responsibilities).map((item) => `• ${item}`).join('\n')}
`
).join('\n')}

============================================================
SELECTED PRODUCTION PROJECTS
============================================================
${CV_DATA.selectedProjects.map(
  (project) => `
${project.name.toUpperCase()} — ${project.tagline}
Role: ${project.role || 'Lead Engineer'}
Technologies: ${project.techStack.join(', ')}
Problem & Solution: ${project.problem} ${project.solution}
Key Outcomes:
${(project.results || project.architectureDetails).map((r) => `• ${r}`).join('\n')}
`
).join('\n')}

============================================================
EDUCATION
============================================================
${CV_DATA.education.map(
  (edu) => `
${edu.degree}
${edu.institution} (${edu.period})
${edu.details}
`
).join('\n')}
`.trim();
