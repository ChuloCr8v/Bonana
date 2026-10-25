import React, { useState, useEffect, useCallback } from "react";
import { X, Download, ChevronLeft, ChevronRight, FileText } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: "light" | "dark";
}

const CV_PAGES = [
  {
    page: 1,
    webp: "/cv-page-1.webp",
    png: "/cv-page-1.png",
    alt: "Nkematu Bonaventure Resume — Page 1",
  },
  {
    page: 2,
    webp: "/cv-page-2.webp",
    png: "/cv-page-2.png",
    alt: "Nkematu Bonaventure Resume — Page 2",
  },
];

const PDF_URL = "/Nkematu_Bonaventure_Full_Stack_Engineer_CV.pdf";
const PDF_FILENAME = "Nkematu_Bonaventure_Full_Stack_Engineer_CV.pdf";

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset to page 1 whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1);
    }
  }, [isOpen]);

  const handleTogglePage = useCallback(() => {
    setCurrentPage((prev) => (prev === 1 ? 2 : 1));
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(2);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevPage();
      } else if (e.key === "ArrowRight") {
        handleNextPage();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handlePrevPage, handleNextPage, onClose]);

  if (!isOpen) return null;

  const activePage = CV_PAGES[currentPage - 1];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/85 p-2 sm:p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex h-[92vh] sm:h-[95vh] w-full max-w-4xl flex-col bg-[var(--surface)] border border-[var(--border)] shadow-2xl text-[var(--text-main)] overflow-hidden">
        {/* Header: Title ("Nkematu Bonaventure resume") and Close button ONLY */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 sm:px-6 py-3.5 bg-[var(--surface-alt)] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-[var(--surface)] border border-[var(--border)] text-[var(--text-main)]">
              <FileText className="h-4 w-4 text-[var(--accent)]" />
            </div>
            <h2
              id="resume-modal-title"
              className="text-base sm:text-lg font-bold text-[var(--text-main)] tracking-tight leading-tight"
            >
              Nkematu Bonaventure resume
            </h2>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="border border-[var(--border)] bg-[var(--surface)] p-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body: Clean Centered Screenshot */}
        <div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden bg-neutral-900/90 dark:bg-black p-3 sm:p-6 flex items-center justify-center">
          <div className="relative max-h-full flex items-center justify-center shadow-2xl">
            <picture>
              <source srcSet={activePage.webp} type="image/webp" />
              <img
                src={activePage.png}
                alt={activePage.alt}
                className="max-h-[74vh] sm:max-h-[78vh] w-auto max-w-full object-contain bg-white shadow-2xl border border-neutral-300 select-none"
                loading="eager"
              />
            </picture>
          </div>
        </div>

        {/* Footer: Arrow Button at Bottom Left & Download Button at Bottom Right ONLY */}
        <div className="flex items-center justify-between border-t border-[var(--border)] px-4 sm:px-6 py-3 bg-[var(--surface-alt)] shrink-0">
          {/* Bottom Left: Direction Arrow Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTogglePage}
              aria-label={currentPage === 1 ? "View Page 2" : "View Page 1"}
              className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] text-[var(--text-main)] hover:border-[var(--text-main)] px-3.5 py-1.5 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              title={currentPage === 1 ? "Click to view Page 2" : "Click to view Page 1"}
            >
              {currentPage === 1 ? (
                <>
                  <span>View Page 2</span>
                  <ChevronRight className="h-4 w-4 text-[var(--text-main)]" />
                </>
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4 text-[var(--text-main)]" />
                  <span>Back to Page 1</span>
                </>
              )}
            </button>
            <span className="text-xs font-mono font-medium text-[var(--text-muted)] hidden sm:inline">
              (Page {currentPage} of {CV_PAGES.length})
            </span>
          </div>

          {/* Bottom Right: Download Button */}
          <a
            href={PDF_URL}
            download={PDF_FILENAME}
            className="inline-flex items-center gap-2 border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 text-xs font-semibold hover:opacity-90 shadow-2xs transition-opacity cursor-pointer"
            title="Download PDF"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
};
