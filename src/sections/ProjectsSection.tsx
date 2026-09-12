import { ExternalLink, Github } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import { HangingSectionHeader } from "../components/HangingSectionHeader";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectDrawer } from "../components/ProjectDrawer";
import {
  CLIENT_PROJECTS,
  FEATURED_PROJECTS,
  OTHER_PROJECTS,
} from "../data/portfolioData";
import { Project } from "../types";

interface ProjectsSectionProps {
  theme?: "light" | "dark";
  onOpenImage?: (
    imageUrl: string,
    title: string,
    caption?: string,
    tag?: string,
  ) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  theme = "light",
  onOpenImage,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="w-full border-b border-[var(--border)] bg-[var(--surface)]"
    >
      {/* Hanging Plaque Section Header */}
      <HangingSectionHeader title="Featured Systems & SaaS Products" as="h2" />

      {/* Featured Projects: 1-Column on Mobile, 2-Column on Desktop with solid border-b */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 divide-[var(--border)] border-b border-[var(--border)] bg-[var(--surface)]"
      >
        {FEATURED_PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className={`
              ${index % 2 === 0 ? "md:border-r border-[var(--border)]" : ""}
              ${index >= 2 ? "md:border-t border-[var(--border)]" : ""}
            `}
          >
            <ProjectCard
              project={project}
              onSelect={(p) => setSelectedProject(p)}
              onOpenImage={onOpenImage}
            />
          </div>
        ))}
      </motion.div>

      {/* Hanging Plaque for Additional Systems with improved title */}
      <HangingSectionHeader
        title="More Products & Open Source"
        subtitle="Curated open-source software directories and community group finance tools."
        as="h3"
      />

      {/* Additional Systems: Divided Grid System matching the rest of the application */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 divide-y divide-[var(--border)] md:divide-y-0 bg-[var(--surface)]"
      >
        {OTHER_PROJECTS.map((project, index) => {
          const isLeftCol = index % 2 === 0;
          const isTopRow = index < 2;

          return (
            <article
              key={project.id}
              tabIndex={0}
              role="button"
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              className={`group flex flex-col justify-between bg-[var(--surface)] hover:bg-[var(--surface-alt)]/40 transition-colors duration-150 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                isLeftCol ? "md:border-r border-[var(--border)]" : ""
              } ${!isTopRow ? "md:border-t border-[var(--border)]" : ""}`}
            >
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 ">
                  <h4 className="text-base font-semibold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">
                    {project.name}
                  </h4>

                  {/* Consistent GitHub and Live URL action buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="border border-[var(--border)] bg-transparent hover:bg-[var(--surface-alt)] text-[var(--text-main)] px-2.5 py-1 text-[11px] font-mono font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        title={`${project.name} GitHub`}
                      >
                        <Github className="h-3 w-3" />
                        <span className="hidden lg:flex">GitHub</span>
                      </a>
                    )}

                    {project.links?.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 px-2.5 py-1 text-[11px] font-mono font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        title={`${project.name} Live URL`}
                      >
                        <span className="hidden lg:flex">Live URL</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="mt-6 text-xs font-medium text-[var(--text-muted)] leading-relaxed">
                  {project.tagline}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.techStack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-0.5 bg-[var(--surface-alt)] border border-[var(--border)] text-[var(--text-main)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden lg:flex mt-4 py-3 px-5 border-t last:border-b border-[var(--border)] bg-[var(--surface-alt)]/35 flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-main)]">
                  {project.category}
                </span>
                <span className="group-hover:text-[var(--text-main)] group-hover:translate-x-0.5 transition-all text-[11px] font-medium inline-flex items-center gap-1">
                  <span>Architecture &amp; Specs</span>
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </article>
          );
        })}
      </motion.div>
      <HangingSectionHeader
        title="Professional / Client Work"
        subtitle="Selected Zoracom delivery work across public-sector compliance, recruiting operations, and service management."
        as="h3"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 divide-[var(--border)] border-b border-[var(--border)] bg-[var(--surface)]"
      >
        {CLIENT_PROJECTS.map((project, index) => (
          <article
            key={project.id}
            className={`flex flex-col justify-between bg-[var(--surface)] ${
              index < CLIENT_PROJECTS.length - 1
                ? "md:border-r border-[var(--border)]"
                : ""
            }`}
          >
            <div className="p-5">
              <h4 className="text-base font-semibold text-[var(--text-main)]">
                {project.name}
              </h4>

              <p className="mt-6 text-xs font-medium text-[var(--text-muted)] leading-relaxed">
                {project.tagline}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-0.5 bg-[var(--surface-alt)] border border-[var(--border)] text-[var(--text-main)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* <div className="py-3 px-5 border-t border-[var(--border)] bg-[var(--surface-alt)]/35 text-[11px] font-mono font-medium text-[var(--text-muted)]">
              Built at Zoracom � confidential client project.
            </div> */}
          </article>
        ))}
      </motion.div>

      {/* Ant Design Drawer for Full System Architecture & Product Details */}
      <ProjectDrawer
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        theme={theme}
        onOpenImage={onOpenImage}
      />
    </section>
  );
};
