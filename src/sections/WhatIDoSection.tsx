import React from 'react';
import { motion } from 'motion/react';
import { HangingSectionHeader } from '../components/HangingSectionHeader';
import { WHAT_I_DO_ITEMS } from '../data/profile';
import { Layers, Server, Users, Wrench } from 'lucide-react';

const ICONS = [Layers, Server, Users, Wrench];

export const WhatIDoSection: React.FC = () => {
  return (
    <section id="what-i-do" className="w-full border-b border-[var(--border)] bg-[var(--surface)]">
      <HangingSectionHeader
        id="disciplines"
        title="What I Do"
        subtitle="Core engineering focus areas across product architecture, distributed backend, and team leadership."
        as="h2"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 divide-[var(--border)] bg-[var(--surface)]"
      >
        {WHAT_I_DO_ITEMS.map((item, index) => {
          const Icon = ICONS[index % ICONS.length];
          const isLeftCol = index % 2 === 0;
          const isTopRow = index < 2;

          // Alternate card backgrounds (on mobile alternate 0,1,0,1; on desktop checkerboard 0,1,1,0)
          const isAltMobile = index % 2 === 1;
          const isAltDesktop = (Math.floor(index / 2) + (index % 2)) % 2 === 1;

          return (
            <div
              key={item.id}
              className={`
                p-6 sm:p-8 flex flex-col justify-between transition-colors
                ${isAltMobile ? 'bg-[var(--surface-alt)]/40 dark:bg-zinc-900/30' : 'bg-[var(--surface)]'}
                ${isAltDesktop ? 'md:bg-[var(--surface-alt)]/40 md:dark:bg-zinc-900/30' : 'md:bg-[var(--surface)]'}
                ${isLeftCol ? 'md:border-r border-[var(--border)]' : ''}
                ${!isTopRow ? 'md:border-t border-[var(--border)]' : ''}
              `}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-[var(--text-main)] leading-snug">
                      {item.tagline}
                    </p>
                  </div>
                  <div className="p-2.5 border border-[var(--border)] bg-[var(--surface-alt)] text-[var(--text-main)] shrink-0 flex items-center justify-center">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>

                <p className="mt-2.5 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Inner bordered list box with fainter background matching card state */}
              <div
                className={`
                  mt-5 p-3.5 sm:p-4 border border-[var(--border)]
                  ${isAltMobile ? 'bg-[var(--surface)]/70 dark:bg-black/20' : 'bg-[var(--surface-alt)]/35 dark:bg-white/[0.02]'}
                  ${isAltDesktop ? 'md:bg-[var(--surface)]/70 md:dark:bg-black/20' : 'md:bg-[var(--surface-alt)]/35 md:dark:bg-white/[0.02]'}
                `}
              >
                <ul className="space-y-2 text-xs text-[var(--text-muted)]">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="font-mono text-[var(--text-muted)] text-[11px] shrink-0 mt-0.5 select-none">
                        ▪
                      </span>
                      <span className="leading-relaxed text-[var(--text-main)]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
};
