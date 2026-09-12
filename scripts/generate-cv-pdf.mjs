import fs from 'fs';
import path from 'path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

async function generateCV() {
  const doc = await PDFDocument.create();
  
  // Embed standard fonts (ATS standard)
  const helvetica = await doc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  const pageMargin = 40;
  const pageWidth = 595.28; // Standard A4
  const pageHeight = 841.89;
  const contentWidth = pageWidth - pageMargin * 2;

  let page = doc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - pageMargin;

  function checkPageSpace(requiredSpace) {
    if (y - requiredSpace < pageMargin) {
      page = doc.addPage([pageWidth, pageHeight]);
      y = pageHeight - pageMargin;
    }
  }

  function drawText(text, size, font, color = rgb(0.1, 0.1, 0.1), indent = 0) {
    page.drawText(text, {
      x: pageMargin + indent,
      y: y - size,
      size,
      font,
      color,
    });
    y -= size + 4;
  }

  function drawWrappedText(text, size, font, color = rgb(0.2, 0.2, 0.2), indent = 0, lineHeight = 1.35) {
    const words = text.split(' ');
    let line = '';
    const maxW = contentWidth - indent;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + (line ? ' ' : '') + words[i];
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth > maxW && line !== '') {
        checkPageSpace(size * lineHeight + 2);
        page.drawText(line, {
          x: pageMargin + indent,
          y: y - size,
          size,
          font,
          color,
        });
        y -= size * lineHeight;
        line = words[i];
      } else {
        line = testLine;
      }
    }
    if (line) {
      checkPageSpace(size * lineHeight + 2);
      page.drawText(line, {
        x: pageMargin + indent,
        y: y - size,
        size,
        font,
        color,
      });
      y -= size * lineHeight;
    }
    y -= 2;
  }

  function drawSectionDivider(title) {
    checkPageSpace(30);
    y -= 8;
    drawText(title.toUpperCase(), 10.5, helveticaBold, rgb(0.05, 0.05, 0.05));
    // Thin ATS horizontal rule
    page.drawLine({
      start: { x: pageMargin, y: y + 2 },
      end: { x: pageWidth - pageMargin, y: y + 2 },
      thickness: 0.75,
      color: rgb(0.75, 0.75, 0.75),
    });
    y -= 8;
  }

  // 1. Header (Name, Title, Contact Info)
  drawText('NKEMATU BONAVENTURE', 18, helveticaBold, rgb(0.05, 0.05, 0.05));
  drawText('Engineering Team Lead & Full-Stack Developer', 11, helveticaBold, rgb(0.2, 0.2, 0.2));
  y -= 2;
  drawText(
    'Lagos, Nigeria (Open to Remote) | chulocr8v@gmail.com | github.com/chulocr8v | linkedin.com/in/chulocr8v',
    8.5,
    helvetica,
    rgb(0.35, 0.35, 0.35)
  );

  // 2. Professional Summary
  drawSectionDivider('Professional Summary');
  drawWrappedText(
    'Engineering Team Lead and Full-Stack Developer with 5+ years of experience building and shipping production web applications, backend systems, and SaaS products. Experienced in React, Next.js, TypeScript, NestJS, PostgreSQL, cloud infrastructure, and AI-powered applications. Proven experience leading engineering teams, designing scalable systems, and delivering products from concept through deployment.',
    9,
    helvetica,
    rgb(0.2, 0.2, 0.2)
  );

  // 3. Technical Skills
  drawSectionDivider('Technical Skills');
  const skills = [
    { label: 'Frontend', text: 'React, Next.js, TypeScript, Redux Toolkit, Tailwind CSS, Ant Design' },
    { label: 'Backend', text: 'NestJS, Node.js, Express, REST APIs, Microservices' },
    { label: 'Data & Databases', text: 'PostgreSQL, Prisma ORM, MongoDB, Redis, Schema Design' },
    { label: 'Cloud & DevOps', text: 'AWS (ECS, S3, RDS), Oracle Cloud (OCI), Docker, CI/CD Pipelines' },
    { label: 'AI & Integrations', text: 'OpenAI API, Groq API, Microsoft Graph API, Telegram Bot API, Stripe' },
  ];
  for (const s of skills) {
    checkPageSpace(14);
    page.drawText(`${s.label}: `, {
      x: pageMargin,
      y: y - 8.5,
      size: 8.5,
      font: helveticaBold,
      color: rgb(0.1, 0.1, 0.1),
    });
    const labelW = helveticaBold.widthOfTextAtSize(`${s.label}: `, 8.5);
    page.drawText(s.text, {
      x: pageMargin + labelW,
      y: y - 8.5,
      size: 8.5,
      font: helvetica,
      color: rgb(0.25, 0.25, 0.25),
    });
    y -= 13;
  }

  // 4. Professional Experience
  drawSectionDivider('Professional Experience');

  const experience = [
    {
      title: 'Engineering Team Lead',
      company: 'Zoracom',
      period: '2025 — Present',
      summary:
        'Lead engineering delivery across frontend, backend, and cloud infrastructure while guiding developers, improving engineering practices, and shipping production systems.',
      bullets: [
        'Led an 11-person engineering team across developers and designers.',
        'Built and maintained full-stack applications using React, Next.js, NestJS, PostgreSQL, and Prisma.',
        'Improved engineering workflows through reviews, architecture discussions, and deployment practices.',
        'Supported developers through mentorship and technical guidance.',
      ],
    },
    {
      title: 'Full-Stack Developer',
      company: 'Zoracom',
      period: '2023 — 2025',
      summary:
        'Engineered mission-critical features and backend services across web interfaces and cloud infrastructure.',
      bullets: [
        'Developed production web applications using React, TypeScript, NestJS, Node.js, PostgreSQL, and Prisma.',
        'Designed APIs, database structures, authentication flows, and business workflows.',
        'Integrated cloud deployments using AWS and Oracle Cloud.',
        'Built AI-powered workflows using LLM APIs.',
      ],
    },
    {
      title: 'Frontend Developer',
      company: 'Zoracom',
      period: '2021 — 2023',
      summary:
        'Specialized in building responsive, accessible, and performant web dashboards and reusable component libraries.',
      bullets: [
        'Built responsive dashboards and applications using React, TypeScript, Ant Design, and Tailwind CSS.',
        'Created reusable frontend components and translated designs into production interfaces.',
        'Improved frontend performance and maintainability.',
      ],
    },
  ];

  for (const exp of experience) {
    checkPageSpace(50);
    // Role line
    page.drawText(exp.title, {
      x: pageMargin,
      y: y - 9.5,
      size: 9.5,
      font: helveticaBold,
      color: rgb(0.05, 0.05, 0.05),
    });
    const periodW = helvetica.widthOfTextAtSize(`${exp.company} | ${exp.period}`, 8.5);
    page.drawText(`${exp.company} | ${exp.period}`, {
      x: pageWidth - pageMargin - periodW,
      y: y - 9.5,
      size: 8.5,
      font: helveticaOblique,
      color: rgb(0.3, 0.3, 0.3),
    });
    y -= 14;

    drawWrappedText(exp.summary, 8.5, helveticaOblique, rgb(0.3, 0.3, 0.3), 0, 1.25);
    y -= 1;

    for (const b of exp.bullets) {
      checkPageSpace(14);
      page.drawText('•', {
        x: pageMargin + 4,
        y: y - 8.5,
        size: 8.5,
        font: helveticaBold,
        color: rgb(0.2, 0.2, 0.2),
      });
      drawWrappedText(b, 8.5, helvetica, rgb(0.2, 0.2, 0.2), 14, 1.25);
    }
    y -= 4;
  }

  // 5. Selected Projects
  drawSectionDivider('Selected Production Projects');
  const projects = [
    {
      name: 'QikCV (Primary Showcase)',
      role: 'Product Architecture & Full-Stack Development',
      tech: 'React, TypeScript, NestJS, PostgreSQL, Prisma, Puppeteer, Stripe',
      desc: 'AI-powered CV optimization platform that analyzes job descriptions, improves resume alignment, and generates application-ready documents. Engineered headless Puppeteer PDF pipeline inside Docker containers and Stripe credit billing.',
    },
    {
      name: 'BotForge',
      role: 'Backend Systems & Telegram Bot Architecture',
      tech: 'NestJS, PostgreSQL, Prisma, React, Redis, BullMQ, Stripe, Telegram API',
      desc: 'Multi-tenant broadcast automation and subscriber management platform for Telegram communities. Dispatched broadcasts under strict rate limits and automated invite link generation upon subscription.',
    },
    {
      name: 'Qikenv (Open-Source CLI Tool)',
      role: 'CLI Creator & Maintainer',
      tech: 'TypeScript, Node.js CLI, NestJS, PostgreSQL, Prisma, AES-256 Crypto, npm Registry',
      desc: 'Encrypted team secrets vault with Optimistic Concurrency Control (OCC). Published on npm (1,800+ downloads) to prevent developer configuration overwrites and secure production credentials.',
    },
    {
      name: 'NEMSA Inspection System',
      role: 'Lead Full-Stack Engineer (Zoracom)',
      tech: 'React, TypeScript, NestJS, PostgreSQL, Prisma, Docker, Oracle Cloud',
      desc: 'National electricity compliance and field inspection operations system. Digitized 15,000+ safety audits with cryptographic QR certificates, reducing processing cycle from 6 weeks to 4 days.',
    },
  ];

  for (const p of projects) {
    checkPageSpace(35);
    page.drawText(p.name, {
      x: pageMargin,
      y: y - 9,
      size: 9,
      font: helveticaBold,
      color: rgb(0.05, 0.05, 0.05),
    });
    const roleW = helveticaOblique.widthOfTextAtSize(p.role, 8);
    page.drawText(p.role, {
      x: pageWidth - pageMargin - roleW,
      y: y - 9,
      size: 8,
      font: helveticaOblique,
      color: rgb(0.3, 0.3, 0.3),
    });
    y -= 13;

    drawWrappedText(`Tech Stack: ${p.tech}`, 8, helveticaBold, rgb(0.3, 0.3, 0.3), 0, 1.2);
    drawWrappedText(p.desc, 8.5, helvetica, rgb(0.2, 0.2, 0.2), 0, 1.25);
    y -= 3;
  }

  // 6. Education
  drawSectionDivider('Education');
  checkPageSpace(25);
  page.drawText('Bachelor of Science (B.Sc.) in Computer Science', {
    x: pageMargin,
    y: y - 9,
    size: 9,
    font: helveticaBold,
    color: rgb(0.05, 0.05, 0.05),
  });
  const eduPeriodW = helvetica.widthOfTextAtSize('2016 — 2020', 8.5);
  page.drawText('2016 — 2020', {
    x: pageWidth - pageMargin - eduPeriodW,
    y: y - 9,
    size: 8.5,
    font: helvetica,
    color: rgb(0.3, 0.3, 0.3),
  });
  y -= 13;
  drawWrappedText(
    'University of Lagos | Focus on Distributed Systems, Algorithms, Database Systems, and Software Engineering.',
    8.5,
    helvetica,
    rgb(0.25, 0.25, 0.25)
  );

  const pdfBytes = await doc.save();
  const outputPath = path.resolve('public', 'Nkematu_Bonaventure_Full_Stack_Engineer_CV.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('CV PDF successfully generated at:', outputPath, 'Size:', pdfBytes.length, 'bytes');
}

generateCV().catch((err) => {
  console.error('Error generating CV PDF:', err);
  process.exit(1);
});
