import React from "react";
import { X, Download, FileText, ExternalLink } from "lucide-react";
import { CV_DATA } from "../data/cv";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/75 p-2 sm:p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex h-[88vh] sm:h-[92vh] w-full max-w-5xl flex-col bg-[var(--surface)] border border-[var(--border)] shadow-2xl text-[var(--text-main)] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-4 sm:px-6 py-3 bg-[var(--surface-alt)] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-sm text-[var(--text-main)]">
              <FileText className="h-4 w-4 text-[var(--accent)]" />
            </div>
            <div>
              <h2
                id="resume-modal-title"
                className="text-sm sm:text-base font-bold text-[var(--text-main)] leading-tight"
              >
                {CV_DATA.header.name} — Resume
              </h2>
              <p className="text-[11px]  text-[var(--text-muted)] hidden sm:block">
                Engineering Team Lead | Full-Stack Developer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Open in New Tab */}
            <a
              href={CV_DATA.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] text-[var(--text-main)] px-3 py-1.5 text-xs  font-medium transition-colors cursor-pointer"
              title="Open PDF in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5 text-[var(--text-muted)]" />
              <span>Open in Tab</span>
            </a>

            {/* Download PDF button */}
            <a
              href={CV_DATA.downloadUrl}
              download={CV_DATA.fileName}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black px-3.5 py-1.5 text-xs  font-semibold transition-opacity hover:opacity-90 shadow-2xs cursor-pointer"
              title="Download PDF"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </a>

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="border border-[var(--border)] bg-[var(--surface)] p-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer ml-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Embedded PDF Preview */}
        <div className="flex-1 w-full h-full relative overflow-hidden bg-neutral-900/10 dark:bg-neutral-950 flex flex-col">
          <object
            data={`${CV_DATA.downloadUrl}#toolbar=1&navpanes=0&view=FitH`}
            type="application/pdf"
            className="w-full h-full border-0 flex-1"
            title="Resume PDF Document"
          >
            {/* Fallback iframe inside object for maximum browser compatibility */}
            <iframe
              src={`${CV_DATA.downloadUrl}#toolbar=1&navpanes=0&view=FitH`}
              className="w-full h-full border-0 flex-1"
              title="Resume PDF Preview"
            >
              {/* Graceful fallback if neither is supported by client */}
              <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[var(--surface)] text-[var(--text-main)] space-y-4">
                <FileText className="h-12 w-12 text-[var(--text-muted)] mx-auto" />
                <div>
                  <h3 className="text-base font-bold text-[var(--text-main)]">
                    PDF Document Ready
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1 max-w-sm mx-auto">
                    Your browser does not support embedded PDF rendering. You
                    can preview or download the file directly:
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={CV_DATA.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 border border-[var(--border)] bg-[var(--surface-alt)] px-4 py-2 text-xs  font-medium hover:text-[var(--text-main)]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Open in New Tab</span>
                  </a>
                  <a
                    href={CV_DATA.downloadUrl}
                    download={CV_DATA.fileName}
                    className="inline-flex items-center gap-1.5 border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-xs  font-semibold"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </iframe>
          </object>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-[var(--border)] px-4 sm:px-6 py-2.5 bg-[var(--surface-alt)] text-[11px]  text-[var(--text-muted)] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <span className="truncate max-w-[280px] sm:max-w-none text-[var(--text-main)] font-medium">
              {CV_DATA.fileName}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[var(--text-faint)]">
            <span className="hidden sm:inline">
              Press{" "}
              <kbd className="px-1 py-0.5 bg-[var(--surface)] border border-[var(--border)] rounded text-[10px] text-[var(--text-main)]">
                Esc
              </kbd>{" "}
              to close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
