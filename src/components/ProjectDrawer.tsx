import { ConfigProvider, Drawer, theme as antTheme } from "antd";
import {
  Award,
  Check,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Layers,
  Server,
  ShieldAlert,
  Terminal,
  X,
  ZoomIn,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Project } from "../types";

interface ProjectDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  theme: "light" | "dark";
  onOpenImage?: (
    imageUrl: string,
    title: string,
    caption?: string,
    tag?: string,
  ) => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({
  project,
  isOpen,
  onClose,
  theme,
  onOpenImage,
}) => {
  const [copiedCli, setCopiedCli] = useState(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  // Reset marquee pause when project or drawer changes
  useEffect(() => {
    setIsMarqueePaused(false);
  }, [project?.id, isOpen]);

  if (!project) return null;

  const handleCopyCli = () => {
    if (project.cliCommand) {
      navigator.clipboard.writeText(project.cliCommand);
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    }
  };

  // Screenshots collection for marquee
  const screenshots =
    project.galleryImages && project.galleryImages.length > 0
      ? project.galleryImages
      : project.imageUrl
        ? [
            {
              url: project.imageUrl,
              title: `${project.name} Interface`,
              caption: project.tagline,
            },
          ]
        : [];

  // Create two identical halves for smooth infinite 50% marquee looping
  const repeatedHalf =
    screenshots.length >= 3 ? screenshots : [...screenshots, ...screenshots];
  const marqueeList = [...repeatedHalf, ...repeatedHalf];

  const handleOpenScreenshot = (img: {
    url: string;
    title?: string;
    caption?: string;
  }) => {
    setIsMarqueePaused(true);
    if (onOpenImage) {
      onOpenImage(
        img.url,
        `${project.name} — ${img.title || "Screenshot"}`,
        img.caption,
        project.name,
      );
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark" ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: {
          colorPrimary: theme === "dark" ? "#ffffff" : "#000000",
          fontFamily:
            "'Raleway', -apple-system, BlinkMacSystemFont, sans-serif",
          fontFamilyCode: "'Raleway', sans-serif",
          colorBgElevated: theme === "dark" ? "#18181b" : "#FFFFFF",
          colorBorderSecondary: theme === "dark" ? "#27272a" : "#E5E7EB",
          colorText: theme === "dark" ? "#f4f4f5" : "#111827",
          colorTextSecondary: theme === "dark" ? "#a1a1aa" : "#4B5563",
          colorBgMask: "rgba(0, 0, 0, 0.65)",
        },
      }}
    >
      <Drawer
        open={isOpen}
        onClose={onClose}
        placement="right"
        zIndex={900}
        size={
          typeof window !== "undefined" && window.innerWidth < 768
            ? "100%"
            : 720
        }
        styles={{
          mask: {
            backdropFilter: "blur(4px)",
            background: "rgba(0, 0, 0, 0.5)",
          },
          section: {
            background: "var(--surface)",
            color: "var(--text-main)",
            borderLeft: "1px solid var(--border)",
          },
          header: {
            background: "var(--surface-alt)",
            borderBottom: "1px solid var(--border)",
            padding: "14px 20px",
          },
          body: {
            background: "var(--surface)",
            padding: 0,
          },
          footer: {
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
            padding: "12px 20px",
          },
        }}
        closable={false}
        title={
          <div className="flex items-center justify-between w-full font-sans">
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-main)] truncate font-sans">
              {project.name}
            </h3>
            <button
              onClick={onClose}
              className="p-1 -mr-1 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        }
        footer={
          <div className="flex items-center justify-end gap-2.5 w-full font-sans">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="border border-[var(--border)] !border-[var(--border)] bg-transparent !bg-transparent hover:bg-[var(--surface-alt)] hover:!bg-[var(--surface-alt)] text-[var(--text-main)] !text-[var(--text-main)] px-3 py-1.5 text-xs font-sans font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer !no-underline"
                title={`${project.name} GitHub`}
              >
                <Github className="h-3.5 w-3.5 text-[var(--text-main)] !text-[var(--text-main)]" />
                <span className="text-[var(--text-main)] !text-[var(--text-main)] font-sans">
                  GitHub
                </span>
              </a>
            )}

            {(project.links?.live || project.links?.npm) && (
              <a
                href={project.links.live || project.links?.npm}
                target="_blank"
                rel="noreferrer"
                className="border border-black dark:border-white !border-black dark:!border-white bg-black dark:bg-white !bg-black dark:!bg-white text-white dark:text-black !text-white dark:!text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:!bg-zinc-800 dark:hover:!bg-zinc-200 px-3 py-1.5 text-xs font-sans font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs !no-underline"
                title={`${project.name} Live Link`}
              >
                <span className="text-white dark:text-black !text-white dark:!text-black font-sans">
                  Live System
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-white dark:text-black !text-white dark:!text-black" />
              </a>
            )}
          </div>
        }
      >
        <div className="divide-y divide-[var(--border)] text-[var(--text-main)] font-sans">
          {/* 1. Overview & Core Context */}
          <div className="p-5 sm:p-6 bg-[var(--surface)] font-sans">
            <span className="font-sans text-xs font-bold  text-[var(--text-main)] uppercase block mb-1.5">
              Project Overview
            </span>
            <p className="text-sm text-[var(--text-faint)] leading-relaxed font-sans">
              {project.tagline}
            </p>

            <div className="mt-3.5 pt-3.5 border-t border-[var(--border)]">
              <span className="font-sans text-xs font-bold  text-[var(--text-main)] uppercase block mb-1">
                The System
              </span>
              <p className="text-sm text-[var(--text-faint)] leading-relaxed font-sans">
                {project.overview || project.solution}
              </p>
            </div>

            {/* Published CLI snippet with copy button */}
            {project.cliCommand && (
              <div className="mt-4 flex items-center justify-between gap-2 border border-[var(--border)] bg-[var(--surface-alt)]/40 p-2.5 sm:px-3.5 font-sans">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <Terminal className="h-3.5 w-3.5 text-[var(--text-main)] shrink-0" />
                  <span className="font-sans text-xs text-[var(--text-main)] font-bold shrink-0">
                    Terminal:
                  </span>
                  <code className="font-sans text-xs text-[var(--text-main)] select-all whitespace-nowrap bg-[var(--surface-alt)] px-1.5 py-0.5 rounded-none font-semibold">
                    {project.cliCommand}
                  </code>
                </div>
                <button
                  onClick={handleCopyCli}
                  className="font-sans text-xs inline-flex items-center gap-1.5 text-[var(--text-main)] hover:text-[var(--text-main)] border border-[var(--border)] px-2.5 py-0.5 bg-[var(--surface)] cursor-pointer shrink-0 font-bold"
                  title="Copy command to clipboard"
                >
                  {copiedCli ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* 2. Visual Interface Preview: Cover Image Only */}
          {project.imageUrl && (
            <div className="p-5 sm:p-6 bg-[var(--surface)] font-sans">
              {/* Cover Image Viewport */}
              <div
                className="group relative overflow-hidden border border-[var(--border)] bg-black/5 cursor-pointer"
                onClick={() =>
                  handleOpenScreenshot({
                    url: project.imageUrl,
                    title: `${project.name} Cover Interface`,
                    caption: project.tagline,
                  })
                }
              >
                <img
                  src={project.imageUrl}
                  alt={project.imageAlt || `${project.name} cover preview`}
                  className="w-full h-auto aspect-video object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-sans text-xs font-bold">
                  <ZoomIn className="h-4 w-4" />
                  <span>Click to Zoom Cover</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Screenshots Gliding Marquee Section */}
          {screenshots.length > 0 && (
            <div className="p-5 sm:p-6 bg-[var(--surface)] font-sans overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="font-sans text-xs font-bold  text-[var(--text-main)] uppercase block">
                  Screenshots &amp; Interface Gallery
                </span>
              </div>

              {/* Marquee Container */}
              <div
                className="relative overflow-hidden py-1"
                onMouseEnter={() => setIsMarqueePaused(true)}
                onMouseLeave={() => setIsMarqueePaused(false)}
              >
                <div
                  className={`animate-marquee-drawer flex items-stretch gap-3 ${
                    isMarqueePaused ? "is-paused" : ""
                  }`}
                  style={{
                    animationPlayState: isMarqueePaused ? "paused" : undefined,
                  }}
                >
                  {marqueeList.map((img, idx) => (
                    <div
                      key={idx}
                      className="w-64 sm:w-72 shrink-0 border border-[var(--border)] bg-[var(--surface)] overflow-hidden group/screenshot flex flex-col shadow-2xs hover:shadow-sm transition-shadow"
                    >
                      {/* Image Thumbnail */}
                      <div
                        className="relative aspect-video overflow-hidden bg-black/5 cursor-pointer"
                        onClick={() => handleOpenScreenshot(img)}
                      >
                        <img
                          src={img.url}
                          alt={img.title || `${project.name} screenshot`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover/screenshot:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/screenshot:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white font-sans text-xs font-bold">
                          <ZoomIn className="h-4 w-4" />
                          <span>Preview</span>
                        </div>
                      </div>

                      {/* Name Below and Option to Expand */}
                      <div className="p-3 border-t border-[var(--border)] bg-[var(--surface-alt)]/35 flex items-center justify-between gap-2 flex-1 font-sans">
                        <div className="min-w-0 flex-1">
                          <span className="font-sans text-xs font-bold text-[var(--text-main)] truncate block">
                            {img.title || `${project.name} View`}
                          </span>
                          {img.caption && (
                            <p className="text-[11px] text-[var(--text-faint)] truncate mt-0.5 font-sans">
                              {img.caption}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. The Problem & The Solution */}
          <div className="p-5 sm:p-6 bg-[var(--surface)] space-y-4 font-sans">
            <div>
              <span className="font-sans text-xs font-bold  text-[var(--text-main)] uppercase block mb-1.5">
                The Problem
              </span>
              <p className="text-xs sm:text-sm text-[var(--text-faint)] leading-relaxed font-sans">
                {project.problem}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border)]">
              <span className="font-sans text-xs font-bold  text-[var(--text-main)] uppercase block mb-1.5">
                The Solution
              </span>
              <p className="text-xs sm:text-sm text-[var(--text-faint)] leading-relaxed font-sans">
                {project.solution}
              </p>
            </div>
          </div>

          {/* 5. Role */}
          <div className="p-5 sm:p-6 bg-[var(--surface)] font-sans">
            <span className="font-sans text-xs font-bold  text-[var(--text-main)] uppercase block mb-1.5">
              Role
            </span>

            {project.role && (
              <p className="text-xs sm:text-sm text-[var(--text-faint)] mb-3 font-sans">
                {project.role}
              </p>
            )}

            {project.myContribution && project.myContribution.length > 0 && (
              <>
                <p className="text-xs font-bold text-[var(--text-main)] uppercase  mb-2.5 font-sans">
                  Core responsibilities &amp; deliverables shipped:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm font-sans">
                  {project.myContribution.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[var(--text-main)] shrink-0 mt-0.5 select-none font-bold">
                        ▪
                      </span>
                      <span className="leading-relaxed text-[var(--text-faint)] font-sans">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* 6. System Architecture */}
          <div className="p-5 sm:p-6 bg-[var(--surface)] font-sans">
            <span className="font-sans text-xs font-bold  text-[var(--text-main)] uppercase block mb-1.5">
              System Architecture
            </span>
            <p className="text-xs text-[var(--text-faint)] mb-3 font-sans">
              Infrastructure and service breakdown:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
              {/* Frontend */}
              <div className="p-3.5 border border-[var(--border)] bg-[var(--surface-alt)]/25">
                <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-[var(--text-main)] uppercase  mb-1">
                  <Layers className="h-3.5 w-3.5 text-[var(--text-main)]" />
                  <span>Frontend Architecture</span>
                </div>
                <p className="text-xs text-[var(--text-faint)] leading-relaxed font-sans">
                  {project.architecture?.frontend ||
                    `${project.techStack.filter((t) => ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Ant Design"].includes(t)).join(", ")} client application.`}
                </p>
              </div>

              {/* Backend */}
              <div className="p-3.5 border border-[var(--border)] bg-[var(--surface-alt)]/25">
                <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-[var(--text-main)] uppercase  mb-1">
                  <Server className="h-3.5 w-3.5 text-[var(--text-main)]" />
                  <span>Backend &amp; Services</span>
                </div>
                <p className="text-xs text-[var(--text-faint)] leading-relaxed font-sans">
                  {project.architecture?.backend ||
                    `${project.techStack.filter((t) => ["NestJS", "Node.js", "Express", "BullMQ", "Puppeteer"].includes(t)).join(", ")} modular service layer.`}
                </p>
              </div>

              {/* Database */}
              <div className="p-3.5 border border-[var(--border)] bg-[var(--surface-alt)]/25">
                <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-[var(--text-main)] uppercase  mb-1">
                  <Database className="h-3.5 w-3.5 text-[var(--text-main)]" />
                  <span>Database &amp; Storage</span>
                </div>
                <p className="text-xs text-[var(--text-faint)] leading-relaxed font-sans">
                  {project.architecture?.database ||
                    `${project.techStack.filter((t) => ["PostgreSQL", "Prisma", "MongoDB", "Redis"].includes(t)).join(", ")} data tier.`}
                </p>
              </div>

              {/* Cloud & Infrastructure */}
              <div className="p-3.5 border border-[var(--border)] bg-[var(--surface-alt)]/25">
                <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-[var(--text-main)] uppercase  mb-1">
                  <Cpu className="h-3.5 w-3.5 text-[var(--text-main)]" />
                  <span>Cloud &amp; Infrastructure</span>
                </div>
                <p className="text-xs text-[var(--text-faint)] leading-relaxed font-sans">
                  {project.architecture?.infrastructure ||
                    `${project.techStack.filter((t) => ["AWS", "Oracle Cloud", "Docker", "CI/CD", "Stripe", "OpenAI API"].includes(t)).join(", ")} runtime &amp; integrations.`}
                </p>
              </div>
            </div>
          </div>

          {/* 7. Engineering Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="p-5 sm:p-6 bg-[var(--surface)] font-sans">
              <span className="font-sans text-xs font-bold  text-[var(--text-main)] uppercase block mb-1.5">
                Engineering Challenges
              </span>
              <p className="text-xs text-[var(--text-faint)] mb-3 font-sans">
                Technical trade-offs and edge cases solved:
              </p>
              <div className="space-y-2.5 font-sans">
                {project.challenges.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-[var(--border)] bg-[var(--surface-alt)]/20 text-xs sm:text-sm text-[var(--text-faint)] leading-relaxed flex items-start gap-2.5 font-sans"
                  >
                    <ShieldAlert className="h-4 w-4 text-[var(--text-main)] shrink-0 mt-0.5" />
                    <span className="font-sans">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. Results & Business Impact */}
          <div className="p-5 sm:p-6 bg-[var(--surface)] font-sans">
            <span className="font-sans text-xs font-bold  text-[var(--text-main)] uppercase block mb-1.5">
              Results &amp; Impact
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans">
              {(
                project.results ||
                project.outcome ||
                project.architectureDetails
              ).map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2.5 font-sans">
                  <Award className="h-4 w-4 text-emerald-500 select-none shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-[var(--text-faint)] font-medium font-sans">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 9. Technologies Used (Clean Tag List) */}
          <div className="p-5 sm:p-6 bg-[var(--surface)] font-sans">
            <span className="font-sans text-xs font-bold  text-[var(--text-main)] uppercase block mb-2.5">
              Technologies Used
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 bg-[var(--surface-alt)] border border-[var(--border)] text-[var(--text-faint)] font-sans font-medium rounded-none"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </ConfigProvider>
  );
};
