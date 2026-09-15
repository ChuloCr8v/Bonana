import React, { useState, useEffect } from "react";
import { motion, useScroll } from "motion/react";
import { Header } from "./components/Header";
import { HeroSection } from "./sections/HeroSection";
import { AboutIntroSection } from "./sections/AboutIntroSection";
import { WhatIDoSection } from "./sections/WhatIDoSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { Footer } from "./components/Footer";
import { ResumeModal } from "./components/ResumeModal";
import { ImageModal } from "./components/ImageModal";

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<{
    url: string;
    title: string;
    caption?: string;
    tag?: string;
  } | null>(null);

  const [currentPath, setCurrentPath] = useState<string>(() => {
    return typeof window !== "undefined" ? window.location.pathname : "/";
  });

  const { scrollYProgress } = useScroll();

  // Handle popstate for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  // Dark Theme Management with LocalStorage default to 'dark'
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("bona_theme");
    if (saved === "dark" || saved === "light") return saved;
    return "dark"; // Dark theme default mode
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("bona_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Open Image Modal helper
  const handleOpenImage = (
    imageUrl: string,
    title: string,
    caption?: string,
    tag?: string,
  ) => {
    setActiveImage({ url: imageUrl, title, caption, tag });
  };

  // Keyboard shortcut: Press 'r' to toggle resume, 't' for theme, Escape to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if ((e.key === "r" || e.key === "R") && !e.metaKey && !e.ctrlKey) {
        setIsResumeOpen((prev) => !prev);
      } else if ((e.key === "t" || e.key === "T") && !e.metaKey && !e.ctrlKey) {
        toggleTheme();
      } else if (e.key === "Escape") {
        setIsResumeOpen(false);
        setActiveImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[var(--text-main)] antialiased transition-colors duration-200">
      {/* Top Fixed Scroll-Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[var(--accent)] z-50 origin-left pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Top Application Bar */}
      <Header
        onOpenResume={() => setIsResumeOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={navigateTo}
        currentPath={currentPath}
      />

      {/* Monolithic Box Grid Container (Preserving original borders and layout) */}
      <div className="flex-1 w-full max-w-6xl mx-auto px-0 sm:px-4 lg:px-6 py-0 sm:py-6">
        <main className="w-full border-y sm:border border-[var(--border)] bg-[var(--surface)] shadow-xs">
          {/* 1. Hero Section */}
          <HeroSection onOpenResume={() => setIsResumeOpen(true)} />

          {/* 2. Projects Section (Featured Priority with QikCV primary & Drawer) */}
          <ProjectsSection theme={theme} onOpenImage={handleOpenImage} />

          {/* 3. Short About Section (Professional Intro & Remote Availability) */}
          <AboutIntroSection />

          {/* 4. What I Do Section (Product Engineering, Backend & Systems, Leadership, Tooling) */}
          <WhatIDoSection />

          {/* 5. Professional Experience & Technical Stack Matrix */}
          <AboutSection />

          {/* 6. Contact Section */}
          <ContactSection onOpenResume={() => setIsResumeOpen(true)} />

          {/* Unified Footer */}
          <Footer theme={theme} />
        </main>
      </div>

      {/* Accessible Resume & CV Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Dynamic Project Image Lightbox */}
      {activeImage && (
        <ImageModal
          isOpen={!!activeImage}
          onClose={() => setActiveImage(null)}
          imageUrl={activeImage.url}
          title={activeImage.title}
          caption={activeImage.caption}
          tag={activeImage.tag}
        />
      )}
    </div>
  );
}
