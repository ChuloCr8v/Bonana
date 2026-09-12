import React, { useEffect } from 'react';
import { X, ZoomIn, Download, ExternalLink } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  caption?: string;
  tag?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  caption,
  tag
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/80 p-2 sm:p-6 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex flex-col w-full max-w-5xl max-h-[92vh] bg-[var(--surface)] border border-[var(--border)] shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 sm:px-6 py-3 bg-[var(--surface-alt)]">
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
            {tag && (
              <span className="shrink-0 font-mono text-[10px] sm:text-xs px-2 py-0.5 border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] font-medium">
                {tag}
              </span>
            )}
            <h3 className="text-xs sm:text-sm font-semibold text-[var(--text-main)] truncate">
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={imageUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              title="Open full image in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={onClose}
              aria-label="Close image preview"
              className="p-1.5 border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Image Content Container */}
        <div className="flex-1 overflow-auto p-2 sm:p-4 bg-black/10 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[70vh] w-auto max-w-full object-contain border border-[var(--border)] shadow-sm"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Caption Bar */}
        {caption && (
          <div className="border-t border-[var(--border)] px-4 sm:px-6 py-2.5 bg-[var(--surface)] text-xs text-[var(--text-muted)] font-mono flex items-center justify-between">
            <span>{caption}</span>
            <span className="text-[10px] text-[var(--text-faint)] hidden sm:inline">ESC to close</span>
          </div>
        )}
      </div>
    </div>
  );
};
