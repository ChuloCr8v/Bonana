import React from 'react';
import { motion } from 'motion/react';

interface HangingSectionHeaderProps {
  title: string;
  subtitle?: string;
  as?: 'h2' | 'h3' | 'h4';
  id?: string;
}

export const HangingSectionHeader: React.FC<HangingSectionHeaderProps> = ({
  title,
  subtitle,
  as: HeadingTag = 'h2',
  id
}) => {
  return (
    <div
      id={id}
      className="w-full border-b border-[var(--border)] bg-[var(--surface-alt)]/35 pt-0 pb-5 flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Hanging Plaque Assembly with 2 Clean Support Strings on Either Side */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative inline-flex flex-col items-center max-w-[92vw] sm:max-w-2xl"
      >
        {/* Two clean vertical support strings directly from the top edge into either side of the box */}
        <div className="w-full flex justify-between px-6 sm:px-12 h-6 sm:h-7 pointer-events-none">
          <div className="w-[1px] h-full bg-[var(--border)]" />
          <div className="w-[1px] h-full bg-[var(--border)]" />
        </div>

        {/* Suspended Rectangular Signboard Box */}
        <div className="relative bg-[var(--surface)] border border-[var(--border)] shadow-xs px-6 py-2.5 sm:px-10 sm:py-3.5 text-center min-w-[260px] sm:min-w-[340px]">
          {/* Title in Rectangular Box */}
          <HeadingTag className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-[var(--text-main)]">
            {title}
          </HeadingTag>

          {subtitle && (
            <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed max-w-lg mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

