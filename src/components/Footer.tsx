import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenScreenshot?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--surface-alt)] text-xs text-[var(--text-main)]">
      <div className="p-4 sm:p-6 flex items-center justify-center text-center font-mono text-[11px] sm:text-xs text-[var(--text-muted)] bg-[var(--surface-alt)]">
        <span>
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. Senior Full-Stack Engineer &amp; Team Lead at Zoracom.
        </span>
      </div>
    </footer>
  );
};

