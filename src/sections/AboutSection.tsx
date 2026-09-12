import React from 'react';
import { WORK_HISTORY, TECHNICAL_STACK } from '../data/portfolioData';
import { motion } from 'motion/react';
import { HangingSectionHeader } from '../components/HangingSectionHeader';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full border-b border-[var(--border)] bg-[var(--surface)]">
      {/* Hanging Plaque: Professional Experience */}
      <HangingSectionHeader
        id="experience"
        title="Professional Experience"
        subtitle="My path from frontend engineer to full-stack architect and engineering team lead."
        as="h2"
      />

      {/* Progression Rows: Flush Box Grid (Divided by 1px borders) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="divide-y divide-[var(--border)] border-b border-[var(--border)] bg-[var(--surface)]"
      >
        {WORK_HISTORY.map((role) => (
          <div
            key={role.role}
            className="flex flex-col md:flex-row items-stretch"
          >
            {/* Left Box: Role, Organization, Date, and Subheading */}
            <div className="w-full md:w-5/12 lg:w-4/12 p-5 sm:p-6 bg-[var(--surface-alt)]/35 border-b md:border-b-0 md:border-r border-[var(--border)] flex flex-col justify-between">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-[var(--text-main)] leading-snug">
                  {role.role}
                </h4>

                {/* Organization and Date on same line */}
                <div className="flex flex-wrap items-center gap-2 mt-1.5 font-mono text-xs sm:text-sm text-[var(--text-muted)]">
                  <span className="font-semibold text-[var(--text-main)]">{role.company}</span>
                  <span className="text-[var(--text-faint)]">|</span>
                  <span>{role.period}</span>
                </div>

                {/* Subheading / Role Summary */}
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-3 leading-relaxed">
                  {role.summary}
                </p>
              </div>
            </div>

            {/* Right Box: Structured Work List */}
            <div className="w-full md:w-7/12 lg:w-8/12 p-5 sm:p-6 bg-[var(--surface)] flex flex-col justify-center">
              <div className="mb-2.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-faint)]">
                  Key Responsibilities &amp; Impact
                </span>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
                {role.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="font-mono text-[var(--accent)] text-[12px] select-none shrink-0 mt-0.5">
                      ▪
                    </span>
                    <span className="leading-relaxed text-[var(--text-main)]">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Hanging Plaque: Technical Stack & Infrastructure */}
      <HangingSectionHeader
        id="stack"
        title="Technical Stack & Infrastructure"
        as="h3"
      />

      {/* Technical Stack Matrix: Category in separate grid box and list in another, both flex */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="divide-y divide-[var(--border)] bg-[var(--surface)]"
      >
        {TECHNICAL_STACK.map((group) => (
          <div
            key={group.category}
            className="flex flex-col sm:flex-row items-stretch"
          >
            {/* Box 1: Category Box (Flex) */}
            <div className="w-full sm:w-1/3 lg:w-1/4 p-4 sm:p-5 bg-[var(--surface-alt)]/50 border-b sm:border-b-0 sm:border-r border-[var(--border)] flex items-center justify-between sm:justify-start">
              <span className="font-mono text-xs font-semibold tracking-wide text-[var(--text-main)]">
                {group.category}
              </span>
            </div>

            {/* Box 2: Properly Gapped Skill Pills with Straight Corners */}
            <div className="w-full sm:w-2/3 lg:w-3/4 p-4 sm:p-5 bg-[var(--surface)] flex flex-wrap items-center gap-2 sm:gap-2.5">
              {group.items.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs font-medium px-3 py-1.5 bg-[var(--surface-alt)] border border-[var(--border)] text-[var(--text-main)] rounded-none"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
