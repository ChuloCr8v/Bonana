import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { CV_DATA } from '../data/cv';
import { FileText, Github, Sun, Moon, Menu, X, Download } from 'lucide-react';

interface HeaderProps {
  onOpenResume: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onNavigate?: (path: string) => void;
  currentPath?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenResume,
  theme,
  onToggleTheme,
  onNavigate,
  currentPath = '/',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (currentPath !== '/' && onNavigate) {
      e.preventDefault();
      onNavigate('/');
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Brand / Identity Cell */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center focus-visible:outline-2 focus-visible:outline-[var(--accent)] group"
            aria-label="Home - bona"
          >
            <div className="px-2.5 py-1 sm:px-3 sm:py-1 bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white rounded-none flex items-center gap-1.5 transition-colors shadow-xs">
              <span className="font-mono text-base sm:text-lg font-bold tracking-tight lowercase">
                bona
              </span>
              <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0 inline-block" aria-hidden="true" title="stop" />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center text-xs font-mono text-[var(--text-muted)]"
          >
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className="px-3 py-1.5 hover:text-[var(--text-main)] hover:bg-[var(--surface-alt)] border-l border-[var(--border)] transition-colors"
            >
              About
            </a>
            <a
              href="#what-i-do"
              onClick={(e) => handleNavClick(e, '#what-i-do')}
              className="px-3 py-1.5 hover:text-[var(--text-main)] hover:bg-[var(--surface-alt)] border-l border-[var(--border)] transition-colors"
            >
              Focus
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, '#projects')}
              className="px-3 py-1.5 hover:text-[var(--text-main)] hover:bg-[var(--surface-alt)] border-l border-[var(--border)] transition-colors"
            >
              Systems
            </a>
            <a
              href="#experience"
              onClick={(e) => handleNavClick(e, '#experience')}
              className="px-3 py-1.5 hover:text-[var(--text-main)] hover:bg-[var(--surface-alt)] border-l border-[var(--border)] transition-colors"
            >
              Experience
            </a>
            <a
              href="#stack"
              onClick={(e) => handleNavClick(e, '#stack')}
              className="px-3 py-1.5 hover:text-[var(--text-main)] hover:bg-[var(--surface-alt)] border-l border-[var(--border)] transition-colors"
            >
              Stack
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-3 py-1.5 hover:text-[var(--text-main)] hover:bg-[var(--surface-alt)] border-l border-r border-[var(--border)] transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Actions: Theme Toggle + CV Download + Resume + GitHub */}
          <div className="flex items-center gap-2">
            {/* Direct CV Download Link */}
            <a
              href={CV_DATA.downloadUrl}
              download={CV_DATA.fileName}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 border border-[var(--border)] bg-[var(--surface-alt)] hover:bg-[var(--surface)] text-[var(--text-main)] px-2.5 py-1.5 text-xs font-mono transition-colors"
              title="Download ATS-friendly PDF CV"
            >
              <Download className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>CV.pdf</span>
            </a>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="flex items-center justify-center h-8 w-8 sm:w-auto sm:px-2.5 sm:py-1.5 border border-[var(--border)] bg-[var(--surface-alt)] text-xs font-mono text-[var(--text-main)] hover:border-[var(--text-main)] transition-colors cursor-pointer"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-4 w-4 text-amber-400 sm:mr-1.5" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-zinc-700 sm:mr-1.5" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* Technical Resume Trigger */}
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 border border-[var(--text-main)] bg-[var(--text-main)] px-3 py-1.5 text-xs font-mono font-medium text-[var(--canvas)] hover:opacity-90 transition-opacity cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5" />
              <span className="font-semibold">Resume</span>
            </button>

            {/* GitHub Profile */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)] transition-colors"
              title="GitHub Profile"
            >
              <Github className="h-3.5 w-3.5 text-[var(--text-main)]" />
              <span className="sr-only sm:not-sr-only text-[var(--text-main)]">GitHub</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border)] bg-[var(--surface-alt)]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--surface)] text-xs font-mono divide-y divide-[var(--border)]">
          <a
            href="#about"
            onClick={(e) => {
              handleNavClick(e, '#about');
              setMobileMenuOpen(false);
            }}
            className="block px-4 py-3 hover:bg-[var(--surface-alt)]"
          >
            About &amp; Engineering Focus
          </a>
          <a
            href="#what-i-do"
            onClick={(e) => {
              handleNavClick(e, '#what-i-do');
              setMobileMenuOpen(false);
            }}
            className="block px-4 py-3 hover:bg-[var(--surface-alt)]"
          >
            What I Do
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              handleNavClick(e, '#projects');
              setMobileMenuOpen(false);
            }}
            className="block px-4 py-3 hover:bg-[var(--surface-alt)]"
          >
            Featured Systems &amp; Case Studies
          </a>
          <a
            href="#experience"
            onClick={(e) => {
              handleNavClick(e, '#experience');
              setMobileMenuOpen(false);
            }}
            className="block px-4 py-3 hover:bg-[var(--surface-alt)]"
          >
            Experience &amp; Leadership
          </a>
          <a
            href="#stack"
            onClick={(e) => {
              handleNavClick(e, '#stack');
              setMobileMenuOpen(false);
            }}
            className="block px-4 py-3 hover:bg-[var(--surface-alt)]"
          >
            Technical Stack &amp; Infrastructure
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              handleNavClick(e, '#contact');
              setMobileMenuOpen(false);
            }}
            className="block px-4 py-3 hover:bg-[var(--surface-alt)]"
          >
            Contact
          </a>

          <div className="p-3 bg-[var(--surface-alt)] flex items-center justify-between gap-2">
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 px-3 border border-[var(--text-main)] bg-[var(--text-main)] text-[var(--canvas)] text-center font-medium font-mono text-xs cursor-pointer"
            >
              Resume &amp; CV
            </button>
            <a
              href={CV_DATA.downloadUrl}
              download={CV_DATA.fileName}
              className="py-2 px-3 border border-[var(--border)] bg-[var(--surface)] text-center text-[var(--text-main)] inline-flex items-center gap-1 justify-center"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
