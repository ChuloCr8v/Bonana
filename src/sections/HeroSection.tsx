import React from 'react';
import { FileText, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenScreenshot?: () => void;
}

const MosaicBlock: React.FC<{ 'aria-hidden'?: boolean }> = ({ 'aria-hidden': ariaHidden }) => (
  <div className="flex flex-col divide-y divide-[var(--border)] border-y border-[var(--border)]" aria-hidden={ariaHidden}>
    {/* Mosaic Row 1: Dual Columns */}
    <div className="grid grid-cols-2 divide-x divide-[var(--border)] bg-[var(--surface)]">
      <div className="p-2 flex items-center justify-center bg-[var(--surface-alt)]/50">
        <span className="text-sm xl:text-base font-black tracking-tight text-[var(--text-main)] uppercase">
          TypeScript
        </span>
      </div>
      <div className="p-2 flex items-center justify-center">
        <span className="text-xs font-mono font-bold text-[var(--text-muted)] tracking-wider">
          NEST.JS
        </span>
      </div>
    </div>

    {/* Mosaic Row 2: Inverted Display with Side Tag */}
    <div className="grid grid-cols-3 divide-x divide-[var(--border)] bg-[var(--surface)]">
      <div className="col-span-2 p-2 bg-[var(--text-main)] text-[var(--surface)] flex items-center justify-between px-3">
        <span className="font-extrabold text-sm tracking-tight uppercase">
          REACT.JS
        </span>
        <span className="text-[10px] font-mono opacity-80">v19+</span>
      </div>
      <div className="p-2 flex items-center justify-center bg-[var(--surface-alt)]/30">
        <span className="text-xs font-serif italic text-[var(--text-muted)]">
          Next.js
        </span>
      </div>
    </div>

    {/* Mosaic Row 3: Systems Knowledge (Postgres & Redis) */}
    <div className="grid grid-cols-5 divide-x divide-[var(--border)] bg-[var(--surface)]">
      <div className="col-span-3 p-2 px-2.5 flex items-center justify-between">
        <span className="text-xs font-bold font-mono tracking-tight text-[var(--text-main)]">
          POSTGRESQL
        </span>
        <span className="text-[9px] font-mono text-[var(--text-faint)]">ACID</span>
      </div>
      <div className="col-span-2 p-2 flex items-center justify-center bg-[var(--surface-alt)]/40">
        <span className="text-[11px] font-mono font-bold text-[var(--text-main)]">
          REDIS
        </span>
      </div>
    </div>

    {/* Mosaic Row 4: Distributed Systems Banner */}
    <div className="p-2 px-3 bg-[var(--surface)] flex items-center justify-between">
      <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--text-muted)]">
        DISTRIBUTED SYSTEMS
      </span>
      <span className="text-[9px] font-mono px-1 border border-[var(--border)] text-[var(--text-faint)]">
        RPC
      </span>
    </div>

    {/* Mosaic Row 5: Docker & Cloud Infra */}
    <div className="grid grid-cols-2 divide-x divide-[var(--border)] bg-[var(--surface)]">
      <div className="p-2 flex items-center justify-center">
        <span className="text-xs font-mono font-semibold text-[var(--text-main)]">
          DOCKER
        </span>
      </div>
      <div className="p-2 flex items-center justify-center bg-[var(--surface-alt)]/60">
        <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
          AWS · OCI
        </span>
      </div>
    </div>

    {/* Mosaic Row 6: Concurrency & Queues */}
    <div className="grid grid-cols-3 divide-x divide-[var(--border)] bg-[var(--surface)]">
      <div className="p-2 flex items-center justify-center">
        <span className="text-[11px] font-mono text-[var(--text-muted)]">
          PRISMA
        </span>
      </div>
      <div className="col-span-2 p-2 px-3 flex items-center justify-between bg-[var(--surface-alt)]/20">
        <span className="text-xs font-bold tracking-tight text-[var(--text-main)]">
          BULLMQ QUEUES
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      </div>
    </div>

    {/* Mosaic Row 7: Architecture & Protocols */}
    <div className="grid grid-cols-2 divide-x divide-[var(--border)] bg-[var(--surface)]">
      <div className="p-2 text-center">
        <span className="text-[11px] font-mono font-semibold text-[var(--text-main)]">
          MICROSERVICES
        </span>
      </div>
      <div className="p-2 text-center bg-[var(--surface-alt)]/40">
        <span className="text-[11px] font-mono text-[var(--text-muted)]">
          REST &amp; GRAPHQL
        </span>
      </div>
    </div>

    {/* Mosaic Row 8: Tooling & Automation */}
    <div className="grid grid-cols-3 divide-x divide-[var(--border)] bg-[var(--surface)]">
      <div className="p-2 flex items-center justify-center">
        <span className="text-[10px] font-mono text-[var(--text-faint)] uppercase">
          STRIPE
        </span>
      </div>
      <div className="p-2 flex items-center justify-center bg-[var(--surface-alt)]/50">
        <span className="text-[10px] font-mono font-bold text-[var(--text-main)]">
          CI/CD
        </span>
      </div>
      <div className="p-2 flex items-center justify-center">
        <span className="text-[10px] font-mono text-[var(--text-muted)]">
          PUPPETEER
        </span>
      </div>
    </div>

    {/* Mosaic Row 9: Large Display Punch */}
    <div className="p-2.5 px-3 bg-[var(--surface-alt)]/70 flex items-center justify-between">
      <span className="text-lg xl:text-xl font-black tracking-tighter text-[var(--text-main)]">
        NEXT.JS 15
      </span>
      <span className="text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5">
        FULL-STACK
      </span>
    </div>
  </div>
);

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  return (
    <section id="home" className="w-full border-b border-[var(--border)] bg-[var(--surface)]">
      {/* Main Bio Grid Row with Desktop Vertical Mosaic on the Right */}
      <div className="flex flex-col lg:flex-row items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex-1 py-14 sm:py-20 lg:py-24 xl:py-28 px-6 sm:px-8 lg:px-10 flex flex-col justify-center"
        >
          <div className="max-w-xl space-y-2 sm:space-y-2.5">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--text-main)] leading-tight">
              Nkematu Bonaventure
            </h1>

            <p className="text-base sm:text-xl text-[var(--text-main)] font-medium max-w-xl">
              Engineering Team Lead &amp; Full-Stack Developer
            </p>

            <p className="text-sm sm:text-base text-[var(--text-muted)] font-normal max-w-xl">
              I build production web applications, backend systems, and developer tools from idea to deployment.
            </p>

            <p className="text-xs sm:text-sm font-mono text-[var(--text-muted)] max-w-xl pt-0.5">
              TypeScript &middot; React &middot; NestJS &middot; Next.js
            </p>

            {/* Action Row: 2 columns on mobile, flex row on sm+ */}
            <div className="pt-3 grid grid-cols-2 sm:flex sm:flex-row items-center gap-2.5 max-w-md sm:max-w-none">
              <a
                href="#projects"
                className="border border-[var(--text-main)] bg-[var(--text-main)] text-[var(--canvas)] px-4 py-2 text-xs font-mono font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 text-center"
              >
                <span>Projects</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={onOpenResume}
                className="flex items-center justify-center gap-1.5 border border-[var(--border)] bg-[var(--surface-alt)] px-4 py-2 text-xs font-mono font-medium text-[var(--text-main)] hover:bg-[var(--surface)] hover:border-[var(--text-main)] transition-colors cursor-pointer text-center"
              >
                <FileText className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>My Resume</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Desktop-Only Rectangular Mosaic of Top Skills & Systems Knowledge Scrolling Vertically Up */}
        <div className="hidden lg:flex w-72 xl:w-80 border-l border-[var(--border)] bg-[var(--surface)] relative overflow-hidden flex-col justify-start select-none">
          {/* Top and bottom subtle gradient masks */}
          <div className="pointer-events-none absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[var(--surface)] to-transparent z-10" />
          <div className="pointer-events-none absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[var(--surface)] to-transparent z-10" />

          {/* Upward scrolling mosaic column with tight borders */}
          <div className="animate-marquee-up flex flex-col">
            <MosaicBlock />
            <MosaicBlock aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
};

