import React from "react";

/**
 * DevBackgroundGrid
 * Soft, low-opacity architectural background grid featuring pure development
 * and engineering icons without labels, providing an ambient blueprint texture.
 */
export const DevBackgroundGrid: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="dev-blueprint-grid"
            width="480"
            height="480"
            patternUnits="userSpaceOnUse"
          >
            {/* Primary Grid Lines (Every 120px) */}
            <path
              d="
                M 120 0 V 480 
                M 240 0 V 480 
                M 360 0 V 480 
                M 480 0 V 480
                M 0 120 H 480 
                M 0 240 H 480 
                M 0 360 H 480 
                M 0 480 H 480
              "
              className="dev-grid-line"
              strokeWidth="1"
            />

            {/* Intersecting Crosshair (+) Markers */}
            <path
              d="
                M -3 0 H 3 M 0 -3 V 3
                M 117 120 H 123 M 120 117 V 123
                M 237 120 H 243 M 240 117 V 123
                M 357 120 H 363 M 360 117 V 123
                M 117 240 H 123 M 120 237 V 243
                M 237 240 H 243 M 240 237 V 243
                M 357 240 H 363 M 360 237 V 243
                M 117 360 H 123 M 120 357 V 363
                M 237 360 H 243 M 240 357 V 363
                M 357 360 H 363 M 360 357 V 363
              "
              className="dev-grid-crosshair"
              strokeWidth="1"
            />

            {/* ------------------------------------------------------------- */}
            {/* ROW 1: (y: 60) Terminal | Database | Git Branch | Server      */}
            {/* ------------------------------------------------------------- */}
            {/* 1. Terminal / CLI */}
            <g transform="translate(48, 48)" className="dev-grid-icon">
              <polyline points="4 17 10 11 4 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="19" x2="20" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* 2. Database / PostgreSQL */}
            <g transform="translate(168, 48)" className="dev-grid-icon">
              <ellipse cx="12" cy="5" rx="9" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </g>

            {/* 3. Git Branch / CI/CD */}
            <g transform="translate(288, 48)" className="dev-grid-icon">
              <line x1="6" y1="3" x2="6" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="18" cy="6" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M18 9a9 9 0 0 1-9 9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* 4. Server / Microservices */}
            <g transform="translate(408, 48)" className="dev-grid-icon">
              <rect x="2" y="2" width="20" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <rect x="2" y="14" width="20" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="6" y1="6" x2="6.01" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="6" y1="18" x2="6.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* ------------------------------------------------------------- */}
            {/* ROW 2: (y: 180) Code / TypeScript | CPU | Security | Docker   */}
            {/* ------------------------------------------------------------- */}
            {/* 5. Code2 / TypeScript & React */}
            <g transform="translate(48, 168)" className="dev-grid-icon">
              <path d="m18 16 4-4-4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="m6 8-4 4 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="m14.5 4-5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* 6. CPU / Cloud Infrastructure */}
            <g transform="translate(168, 168)" className="dev-grid-icon">
              <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <rect x="9" y="9" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M15 2v2 M15 20v2 M2 15h2 M2 9h2 M20 15h2 M20 9h2 M9 2v2 M9 20v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* 7. Shield / Security & OCC */}
            <g transform="translate(288, 168)" className="dev-grid-icon">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="m9 12 2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* 8. Docker / Boxes Containers */}
            <g transform="translate(408, 168)" className="dev-grid-icon">
              <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="m7 16.5 5-3 M7 16.5v5.17" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="m17 16.5-5-3 M17 16.5v5.17" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 8v5.5" stroke="currentColor" strokeWidth="1.5" />
            </g>

            {/* ------------------------------------------------------------- */}
            {/* ROW 3: (y: 300) Mobile | Network API | AI Bot | Layers        */}
            {/* ------------------------------------------------------------- */}
            {/* 9. Smartphone / React Native */}
            <g transform="translate(48, 288)" className="dev-grid-icon">
              <rect x="5" y="2" width="14" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* 10. Network / Distributed APIs */}
            <g transform="translate(168, 288)" className="dev-grid-icon">
              <rect x="16" y="16" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <rect x="2" y="16" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <rect x="9" y="2" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3 M12 12V8" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </g>

            {/* 11. Bot / AI Workflows */}
            <g transform="translate(288, 288)" className="dev-grid-icon">
              <path d="M12 8V4H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="4" y="8" width="16" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="2" y1="14" x2="4" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="20" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="9" y1="13" x2="9" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="15" y1="13" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* 12. Layers / Full-Stack Architecture */}
            <g transform="translate(408, 288)" className="dev-grid-icon">
              <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* ------------------------------------------------------------- */}
            {/* ROW 4: (y: 420) BullMQ Queues | Binary | Leadership | Zap     */}
            {/* ------------------------------------------------------------- */}
            {/* 13. Workflow / BullMQ */}
            <g transform="translate(48, 408)" className="dev-grid-icon">
              <rect x="3" y="3" width="8" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7 11v4a2 2 0 0 0 2 2h4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="13" y="13" width="8" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </g>

            {/* 14. Binary / Code Syntax */}
            <g transform="translate(168, 408)" className="dev-grid-icon">
              <path d="M10 10v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="14" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="17" y1="10" x2="17" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* 15. Users / Engineering Team Lead */}
            <g transform="translate(288, 408)" className="dev-grid-icon">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* 16. Zap / High Performance */}
            <g transform="translate(408, 408)" className="dev-grid-icon">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#dev-blueprint-grid)" />
      </svg>
    </div>
  );
};
