import React, { useRef, useState, useEffect, useCallback } from "react";
import { FileText, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenScreenshot?: () => void;
}

const renderMosaicRow = (rowIndex: number, keyPrefix: string) => {
  switch (rowIndex) {
    case 0:
      return (
        <div
          key={`${keyPrefix}-0`}
          className="h-[44px] shrink-0 grid grid-cols-2 divide-x divide-[var(--border)] bg-[var(--surface)]"
        >
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
      );
    case 1:
      return (
        <div
          key={`${keyPrefix}-1`}
          className="h-[44px] shrink-0 grid grid-cols-3 divide-x divide-[var(--border)] bg-[var(--surface)]"
        >
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
      );
    case 2:
      return (
        <div
          key={`${keyPrefix}-2`}
          className="h-[44px] shrink-0 grid grid-cols-5 divide-x divide-[var(--border)] bg-[var(--surface)]"
        >
          <div className="col-span-3 p-2 px-2.5 flex items-center justify-between">
            <span className="text-xs font-bold font-mono tracking-tight text-[var(--text-main)]">
              POSTGRESQL
            </span>
            <span className="text-[9px] font-mono text-[var(--text-faint)]">
              ACID
            </span>
          </div>
          <div className="col-span-2 p-2 flex items-center justify-center bg-[var(--surface-alt)]/40">
            <span className="text-[11px] font-mono font-bold text-[var(--text-main)]">
              REDIS
            </span>
          </div>
        </div>
      );
    case 3:
      return (
        <div
          key={`${keyPrefix}-3`}
          className="h-[44px] shrink-0 p-2 px-3 bg-[var(--surface)] flex items-center justify-between"
        >
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--text-muted)]">
            DISTRIBUTED SYSTEMS
          </span>
          <span className="text-[9px] font-mono px-1 border border-[var(--border)] text-[var(--text-faint)]">
            RPC
          </span>
        </div>
      );
    case 4:
      return (
        <div
          key={`${keyPrefix}-4`}
          className="h-[44px] shrink-0 grid grid-cols-2 divide-x divide-[var(--border)] bg-[var(--surface)]"
        >
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
      );
    case 5:
      return (
        <div
          key={`${keyPrefix}-5`}
          className="h-[44px] shrink-0 grid grid-cols-3 divide-x divide-[var(--border)] bg-[var(--surface)]"
        >
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
      );
    case 6:
      return (
        <div
          key={`${keyPrefix}-6`}
          className="h-[44px] shrink-0 grid grid-cols-2 divide-x divide-[var(--border)] bg-[var(--surface)]"
        >
          <div className="p-2 text-center flex items-center justify-center">
            <span className="text-[11px] font-mono font-semibold text-[var(--text-main)]">
              MICROSERVICES
            </span>
          </div>
          <div className="p-2 text-center flex items-center justify-center bg-[var(--surface-alt)]/40">
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              REST &amp; GRAPHQL
            </span>
          </div>
        </div>
      );
    case 7:
      return (
        <div
          key={`${keyPrefix}-7`}
          className="h-[44px] shrink-0 grid grid-cols-3 divide-x divide-[var(--border)] bg-[var(--surface)]"
        >
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
      );
    case 8:
      return (
        <div
          key={`${keyPrefix}-8`}
          className="h-[44px] shrink-0 p-2.5 px-3 bg-[var(--surface-alt)]/70 flex items-center justify-between"
        >
          <span className="text-base xl:text-lg font-black tracking-tighter text-[var(--text-main)]">
            NEXT.JS 15
          </span>
          <span className="text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5">
            FULL-STACK
          </span>
        </div>
      );
    default:
      return null;
  }
};

const ROW_HEIGHT = 44;
const TOTAL_UNIQUE_ROWS = 9;

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = useState<number>(ROW_HEIGHT * 8);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Measure container height and clamp strictly to whole integer multiples of ROW_HEIGHT
  // to guarantee ZERO bleed of partial rows
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const updateHeight = () => {
      const h = el.clientHeight;
      if (h <= 0) return;
      const count = Math.max(1, Math.floor(h / ROW_HEIGHT));
      setViewportHeight(count * ROW_HEIGHT);
    };

    updateHeight();

    const ro = new ResizeObserver(updateHeight);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Step row by row every 2600ms
  const stepNext = useCallback(() => {
    setDisplayIndex((prev) => {
      if (prev >= TOTAL_UNIQUE_ROWS) {
        return 0;
      }
      return prev + 1;
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(stepNext, 2600);
    return () => clearInterval(interval);
  }, [isPaused, stepNext]);

  // When reaching TOTAL_UNIQUE_ROWS (9), let the 450ms smooth transition play so
  // Row 8 (Next.js 15) scrolls out and Row 0 (TypeScript) scrolls in.
  // Then silently snap back to index 0 with transition: none so it loops infinitely.
  useEffect(() => {
    if (displayIndex >= TOTAL_UNIQUE_ROWS) {
      const timer = setTimeout(() => {
        setIsJumping(true);
        setDisplayIndex(0);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsJumping(false);
          });
        });
      }, 460);
      return () => clearTimeout(timer);
    }
  }, [displayIndex]);

  return (
    <section
      id="home"
      className="w-full border-b border-[var(--border)] bg-[var(--surface)]"
    >
      {/* Main Bio Grid Row with Desktop Vertical Mosaic on the Right */}
      <div className="flex flex-col lg:flex-row items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex-1 py-12 sm:py-16 lg:py-0 px-6 sm:px-8 lg:px-10 flex flex-col justify-center"
        >
          <div className="max-w-xl space-y-2 sm:space-y-2.5">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--text-main)] leading-tight">
              Nkematu Bonaventure
            </h1>

            <p className="text-base sm:text-xl text-[var(--text-main)] font-medium max-w-xl">
              Full-Stack Developer &amp; Engineering Lead
            </p>

            <p className="text-sm sm:text-base text-[var(--text-muted)] font-normal max-w-xl">
              I build production web applications, backend systems, and
              developer tools from idea to deployment.
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

        {/* Desktop-Only Rectangular Mosaic of Top Skills & Systems Knowledge Scrolling Row by Row */}
        <div
          ref={wrapperRef}
          className="hidden lg:flex w-72 xl:w-80 border-l border-[var(--border)] bg-[var(--surface)] relative overflow-hidden flex-col justify-start select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Exact viewport with height clamped strictly to whole row increments (ZERO BLEED) */}
          <div
            className="w-full overflow-hidden relative"
            style={{
              height: `${viewportHeight}px`,
            }}
          >
            <div
              className="w-full flex flex-col divide-y divide-[var(--border)] will-change-transform"
              style={{
                transform: `translateY(-${displayIndex * ROW_HEIGHT}px)`,
                transition: isJumping
                  ? "none"
                  : "transform 450ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {[0, 1, 2].flatMap((setIdx) =>
                Array.from({ length: TOTAL_UNIQUE_ROWS }, (_, rowIdx) =>
                  renderMosaicRow(rowIdx, `s${setIdx}`),
                ),
              )}
            </div>
          </div>

          {/* Any remaining fraction of height is filled cleanly without bleeding rows */}
          {/* <div className="flex-1 w-full bg-[var(--surface)] border-t border-[var(--border)]" /> */}
        </div>
      </div>
    </section>
  );
};
