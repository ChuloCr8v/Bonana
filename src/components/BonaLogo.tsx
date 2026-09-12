import React, { useState } from 'react';
import { motion } from 'motion/react';

interface BonaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withAnimation?: boolean;
}

/**
 * Egyptian Uniliteral Hieroglyphic Alphabet representation of B-O-N-A:
 * - B: Gardiner D58 (Foot / Leg) 𓃀
 * - O: Gardiner Z7 (Coiled Rope / Spiral loop) 𓏲 [vocalic O/W/U]
 * - N: Gardiner N35 (Water Ripple) 𓈖
 * - A: Gardiner M17 (Flowering Reed Leaf) 𓇋 [vocalic A/I]
 */

const HieroglyphFoot: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-label="Egyptian Hieroglyph Foot (B)"
  >
    {/* Gardiner D58: Foot and lower leg */}
    <path d="M7 2h4.5v10.5c0 1.2.6 2.2 1.6 2.8l4.8 1.4c1.3.4 2.1 1.6 2.1 2.9 0 1.3-1.1 2.4-2.4 2.4H6.5C5.1 22 4 20.9 4 19.5v-3c0-1.8.8-3.5 2.2-4.6l.8-.6V2z" />
  </svg>
);

const HieroglyphCoil: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label="Egyptian Hieroglyph Coiled Rope (O/W)"
  >
    {/* Gardiner Z7: Coiled rope spiral */}
    <path d="M19 17.5c-1.8 2.2-4.5 3.5-7.5 3.5-5 0-9-3.8-9-8.5S6.8 4 12 4c4 0 7.2 2.7 7.2 6.2 0 2.8-2.2 4.8-4.8 4.8-2 0-3.4-1.3-3.4-3 0-1.4 1-2.4 2.2-2.4 1 0 1.8.7 1.8 1.6" />
  </svg>
);

const HieroglyphWater: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={className}
    aria-label="Egyptian Hieroglyph Water Ripple (N)"
  >
    {/* Gardiner N35: Ripples of water */}
    <path d="M2 12l2.5-4 3 8 3-8 3 8 3-8 3 8 2.5-4" />
  </svg>
);

const HieroglyphReed: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-label="Egyptian Hieroglyph Flowering Reed (A)"
  >
    {/* Gardiner M17: Flowering reed leaf */}
    <path d="M11 2c-.3 0-.6.2-.8.5-1.5 2.5-3.2 6.5-3.2 10.5 0 2.5.8 4.8 2.2 6.5v2.5h3.6V19.5c1.4-1.7 2.2-4 2.2-6.5 0-4-1.7-8-3.2-10.5-.2-.3-.5-.5-.8-.5zm-.2 2.8c.8 2 1.8 5.2 1.8 8.2h-3.6c0-3 1-6.2 1.8-8.2z" />
  </svg>
);

const GLYPHS = [
  { Component: HieroglyphFoot, letter: 'B', name: 'Foot (b)', unicode: '𓃀' },
  { Component: HieroglyphCoil, letter: 'O', name: 'Coil (w/o)', unicode: '𓏲' },
  { Component: HieroglyphWater, letter: 'N', name: 'Water (n)', unicode: '𓈖' },
  { Component: HieroglyphReed, letter: 'A', name: 'Reed (a)', unicode: '𓇋' },
];

export const BonaLogo: React.FC<BonaLogoProps> = ({
  size = 'md',
  className = '',
  withAnimation = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: {
      container: 'px-2 py-0.5 gap-1.5 text-xs',
      glyph: 'h-2.5 w-2.5',
      text: 'text-xs',
      dot: 'h-1.5 w-1.5',
    },
    md: {
      container: 'px-2.5 py-1 sm:px-3 sm:py-1 gap-2 text-sm sm:text-base',
      glyph: 'h-3 w-3 sm:h-3.5 sm:w-3.5',
      text: 'text-sm sm:text-base',
      dot: 'h-2 w-2',
    },
    lg: {
      container: 'px-4 py-1.5 gap-2.5 text-base sm:text-lg',
      glyph: 'h-4 w-4 sm:h-4.5 sm:w-4.5',
      text: 'text-base sm:text-lg',
      dot: 'h-2.5 w-2.5',
    },
  }[size];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative inline-flex items-center select-none rounded-none
        bg-black text-white dark:bg-white dark:text-black
        border border-black dark:border-white shadow-xs
        transition-colors duration-200
        ${sizeClasses.container}
        ${className}
      `}
      title="Bona — Egyptian Hieroglyphic Inscription: [ 𓃀 𓏲 𓈖 𓇋 ]"
    >
      {/* Ancient Egyptian Cartouche Section: Stylized Hieroglyphic Phonetic spelling for B-O-N-A */}
      <div className="flex items-center gap-1 sm:gap-1.5 border-r border-current/25 pr-1.5 sm:pr-2">
        {GLYPHS.map((glyph, idx) => {
          const GlyphComponent = glyph.Component;
          return (
            <motion.div
              key={glyph.letter}
              animate={
                withAnimation && isHovered
                  ? {
                      y: [0, -2.5, 0],
                      scale: [1, 1.12, 1],
                      opacity: [0.85, 1, 0.95],
                    }
                  : { y: 0, scale: 1, opacity: 0.9 }
              }
              transition={{
                duration: 0.4,
                delay: idx * 0.08,
                ease: 'easeOut',
              }}
              className="flex items-center justify-center shrink-0"
              title={`${glyph.letter}: ${glyph.name} ${glyph.unicode}`}
            >
              <GlyphComponent className={sizeClasses.glyph} />
            </motion.div>
          );
        })}
      </div>

      {/* Monospace Name Text */}
      <span className={`font-mono font-bold tracking-tight lowercase ${sizeClasses.text}`}>
        bona
      </span>

      {/* Stop Indicator Circle: Pink, with subtle alive pulse on hover */}
      <span className={`relative inline-flex shrink-0 ${sizeClasses.dot}`} aria-hidden="true">
        {withAnimation && (
          <motion.span
            animate={
              isHovered
                ? { scale: [1, 1.8, 1], opacity: [0.75, 0, 0.75] }
                : { scale: 1, opacity: 0 }
            }
            transition={{ duration: 1, repeat: Infinity }}
            className={`absolute inline-flex h-full w-full rounded-full bg-pink-500`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-full w-full bg-pink-500 shrink-0`}
          title="stop"
        />
      </span>
    </div>
  );
};
