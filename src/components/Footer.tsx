import React from "react";
import { PERSONAL_INFO } from "../data/portfolioData";
import BonaLogo from "./BonaLogo";

interface FooterProps {
  onOpenScreenshot?: () => void;
  theme: "dark" | "light";
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--surface-alt)] text-xs text-[var(--text-main)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] sm:text-xs text-[var(--text-muted)]">
        <a
          href="/"
          className="focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          aria-label="Home - bona"
        >
          <BonaLogo theme={theme} />
        </a>

        <div className="text-center sm:text-right">
          <p className="text-[var(--text-main)] font-semibold">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}
          </p>
          <p className="text-[var(--text-muted)] mt-0.5">
            Engineering Team Lead &amp; Full-Stack Architect
          </p>
        </div>
      </div>
    </footer>
  );
};
