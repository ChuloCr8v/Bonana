import React from 'react';
import { motion } from 'motion/react';
import { HangingSectionHeader } from '../components/HangingSectionHeader';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutIntroSection: React.FC = () => {
  return (
    <section id="about-intro" className="w-full border-b border-[var(--border)] bg-[var(--surface)]">
      <HangingSectionHeader
        id="about"
        title="About & Engineering Focus"
        subtitle="Full-stack product engineer and technical lead delivering systems from concept to production."
        as="h2"
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-[var(--surface)]"
      >
        <div className="p-6 sm:p-8 lg:p-10 space-y-3.5 max-w-4xl">
          <p className="text-sm sm:text-base text-[var(--text-main)] font-normal leading-relaxed">
            {PERSONAL_INFO.aboutIntro}
          </p>

          <p className="text-sm sm:text-base text-[var(--text-muted)] font-normal leading-relaxed">
            {PERSONAL_INFO.buildingPhilosophy}
          </p>
        </div>

        {/* Skill Pills System: No background on mobile, desktop alternating backgrounds, split 2-in-1 skills */}
        <div className="w-full p-0 m-0 border-t border-[var(--border)] grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-0">
          {[
            'TypeScript',
            'React',
            'Next.js',
            'NestJS',
            'Node.js',
            'PostgreSQL',
            'Docker',
            'AWS',
          ].map((item, idx) => (
            <div
              key={item}
              className={`py-3 sm:py-3.5 px-2.5 text-center flex items-center justify-center border-b lg:border-b-0 border-r border-[var(--border)] font-mono text-xs sm:text-sm font-semibold tracking-tight transition-colors bg-transparent ${
                idx % 2 === 0
                  ? 'sm:bg-[var(--surface)] text-[var(--text-main)] sm:hover:bg-[var(--surface-alt)]/60'
                  : 'sm:bg-[var(--surface-alt)] text-[var(--text-main)] sm:hover:bg-[var(--surface)]'
              }`}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
