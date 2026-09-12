import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HangingSectionHeader } from '../components/HangingSectionHeader';
import { PERSONAL_INFO } from '../data/portfolioData';

const ABOUT_SKILLS = [
  'TypeScript',
  'React',
  'Next.js',
  'NestJS',
  'Node.js',
  'PostgreSQL',
  'Docker',
  'AWS',
  'Redis',
  'Prisma',
  'GraphQL',
  'REST APIs',
  'BullMQ',
  'Tailwind CSS',
  'Redux Toolkit',
  'Puppeteer',
  'Microservices',
  'Oracle Cloud',
  'CI/CD',
  'Stripe',
  'Linux',
  'Git',
];

export const AboutIntroSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicated list for seamless infinite looping
  const skillsList = [...ABOUT_SKILLS, ...ABOUT_SKILLS];

  const scrollOneTile = useCallback((direction: 'next' | 'prev') => {
    const track = trackRef.current;
    if (!track) return;
    const tile = track.firstElementChild as HTMLElement | null;
    const tileWidth = tile ? tile.getBoundingClientRect().width : 160;
    const halfWidth = track.scrollWidth / 2;

    if (direction === 'next') {
      if (track.scrollLeft >= halfWidth - tileWidth) {
        track.scrollLeft -= halfWidth;
      }
      track.scrollBy({ left: tileWidth, behavior: 'smooth' });
    } else {
      if (track.scrollLeft <= tileWidth) {
        track.scrollLeft += halfWidth;
      }
      track.scrollBy({ left: -tileWidth, behavior: 'smooth' });
    }
  }, []);

  // Automatic step: scrolls strictly one tile at a time
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      scrollOneTile('next');
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused, scrollOneTile]);

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

        {/* Scrolling Skill Pills System: Same design maintained, scrolls one tile at a time even on mobile */}
        <div
          className="relative w-full p-0 m-0 border-t border-[var(--border)] bg-[var(--surface)] flex items-stretch select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Step Previous Button */}
          <button
            type="button"
            onClick={() => scrollOneTile('prev')}
            aria-label="Previous skill"
            className="w-7 sm:w-8 bg-[var(--surface)] hover:bg-[var(--surface-alt)] border-r border-[var(--border)] text-[var(--text-main)] shrink-0 flex items-center justify-center cursor-pointer transition-colors z-10"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Horizontal Track: Snaps and scrolls strictly one tile at a time */}
          <div
            ref={trackRef}
            className="flex-1 overflow-x-auto snap-x snap-mandatory flex items-stretch scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {skillsList.map((item, idx) => (
              <div
                key={`${item}-${idx}`}
                className={`w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-[12.5%] shrink-0 snap-start snap-always py-3 sm:py-3.5 px-2.5 text-center flex items-center justify-center border-r border-[var(--border)] font-mono text-xs sm:text-sm font-semibold tracking-tight bg-transparent ${
                  idx % 2 === 0
                    ? 'sm:bg-[var(--surface)] text-[var(--text-main)]'
                    : 'sm:bg-[var(--surface-alt)] text-[var(--text-main)]'
                }`}
              >
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>

          {/* Step Next Button */}
          <button
            type="button"
            onClick={() => scrollOneTile('next')}
            aria-label="Next skill"
            className="w-7 sm:w-8 bg-[var(--surface)] hover:bg-[var(--surface-alt)] border-l border-[var(--border)] text-[var(--text-main)] shrink-0 flex items-center justify-center cursor-pointer transition-colors z-10"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};
