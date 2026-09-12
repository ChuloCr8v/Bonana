import React from "react";
import { Project } from "../types";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  onOpenImage?: (
    imageUrl: string,
    title: string,
    caption?: string,
    tag?: string,
  ) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
}) => {
  const isPrimary = project.tier === "primary";

  return (
    <article
      id={`project-${project.id}`}
      tabIndex={0}
      role="button"
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      className={`
        group flex flex-col justify-between h-full transition-colors duration-150 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--accent)]
        ${isPrimary ? "bg-[var(--surface)] hover:bg-[var(--surface-alt)]/60 relative" : "bg-[var(--surface)] hover:bg-[var(--surface-alt)]/40"}
      `}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* 1. Product Image Display */}
          {project.imageUrl && (
            <div className="relative border-b border-[var(--border)] overflow-hidden bg-black/5">
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.imageAlt || `${project.name} interface`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* 2. Summary & Stack Content */}
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">
                {project.name}
              </h3>
            </div>

            <p className="mt-1.5 text-xs sm:text-sm font-medium text-[var(--text-muted)] leading-relaxed">
              {project.tagline}
            </p>

            {/* Quick stack preview */}
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className=" text-[10px] px-2 py-0.5 bg-[var(--surface-alt)] border border-[var(--border)] text-[var(--text-main)]"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className=" text-[10px] px-1.5 py-0.5 bg-[var(--surface-alt)] text-[var(--text-faint)]">
                  +{project.techStack.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 3. Card Footer Action Bar */}
        <div className="px-4 py-3 sm:px-5 border-t border-[var(--border)] bg-[var(--surface-alt)]/30 flex items-center justify-between gap-2">
          <span className=" text-[11px] text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1 font-medium">
            View Project Details &rarr;
          </span>
          <div className="flex items-center gap-2">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="border border-[var(--border)] bg-transparent hover:bg-[var(--surface-alt)] text-[var(--text-main)] px-2.5 py-1 text-[11px]  font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                title={`${project.name} GitHub`}
              >
                <Github className="h-3 w-3" />
                <span>GitHub</span>
              </a>
            )}
            {(project.links?.live || project.links?.npm) && (
              <a
                href={project.links?.live || project.links?.npm}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 px-2.5 py-1 text-[11px]  font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                title={`${project.name} Live URL`}
              >
                <span>Live URL</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
