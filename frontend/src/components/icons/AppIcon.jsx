import React from 'react';

/**
 * Central registry for every SVG asset under /public/icons/.
 * Use semantic names — the registry maps them to the file paths.
 *
 * Goals:
 *   - Single source of truth so we can swap art without grepping the codebase.
 *   - Make sure every icon in the catalog has a documented role.
 *   - Tone the icons to match the surrounding text via CSS filter presets.
 */

// Semantic name -> public path
export const ICON_PATHS = Object.freeze({
  // Subjects / categories
  math: '/icons/math-svgrepo-com.svg',
  rla: '/icons/book-closed-svgrepo-com.svg',
  read: '/icons/read-svgrepo-com.svg',
  socialStudies: '/icons/globe-svgrepo-com.svg',
  world: '/icons/world-svgrepo-com.svg',
  parthenon: '/icons/parthenon-svgrepo-com.svg',
  sphinx: '/icons/sphinx-svgrepo-com.svg',
  statueOfLiberty: '/icons/statue-of-liberty-svgrepo-com.svg',
  science: '/icons/double-helix-svgrepo-com.svg',
  cell: '/icons/cell-svgrepo-com.svg',
  molecular: '/icons/molecular-svgrepo-com.svg',
  organism: '/icons/organic-organism-svgrepo-com.svg',
  geneSequencing: '/icons/gene-sequencing-svgrepo-com.svg',
  geneStructure: '/icons/gene-structure-svgrepo-com.svg',
  geneticAlgorithm: '/icons/genetic-algorithm-svgrepo-com.svg',
  geneticData: '/icons/genetic-data-svgrepo-com.svg',
  geneticResearch: '/icons/genetic-research-svgrepo-com.svg',
  supercoil: '/icons/supercoil-svgrepo-com.svg',
  workforce: '/icons/briefcase-svgrepo-com.svg',
  bank: '/icons/bank-svgrepo-com.svg',
  fireProtection: '/icons/fire-protection-svgrepo-com.svg',

  // Navigation / dashboard
  dashboard: '/icons/chart-pie-svgrepo-com.svg',
  home: '/icons/house-svgrepo-com.svg',
  knowledge: '/icons/knowledge-svgrepo-com.svg',
  student: '/icons/student-svgrepo-com.svg',

  // Theme
  sun: '/icons/sun-svgrepo-com.svg',
  moon: '/icons/moon-svgrepo-com.svg',
  sleeping: '/icons/sleeping-svgrepo-com.svg',

  // Actions
  pencil: '/icons/pencil-svgrepo-com.svg',
  writing: '/icons/writing-svgrepo-com.svg',
  eye: '/icons/eye-svgrepo-com.svg',
  headphones: '/icons/headphones-svgrepo-com.svg',
  correct: '/icons/correct-success-tick-svgrepo-com.svg',
  remove:
    '/icons/wrong-delete-remove-trash-minus-cancel-close-2-svgrepo-com (1).svg',
});

// Quick semantic aliases for common UI verbs
export const ICON_ALIASES = Object.freeze({
  edit: 'pencil',
  delete: 'remove',
  trash: 'remove',
  view: 'eye',
  audio: 'headphones',
  notes: 'writing',
  curriculum: 'rla',
  syllabus: 'read',
  calendar: 'knowledge',
  progress: 'dashboard',
  myClass: 'student',
  workTogether: 'student',
  logout: 'home',
  finance: 'bank',
  safety: 'fireProtection',
});

// CSS filter presets that retint a black SVG to a brand color.
// Generated with the standard "color → filter" trick from CodePen.
export const ICON_TONES = Object.freeze({
  current: 'none', // leave the original art alone
  white: 'brightness(0) saturate(100%) invert(100%)',
  black: 'brightness(0) saturate(100%)',
  slate:
    'brightness(0) saturate(100%) invert(45%) sepia(6%) saturate(545%) hue-rotate(177deg) brightness(92%) contrast(89%)',
  sky: 'brightness(0) saturate(100%) invert(48%) sepia(99%) saturate(1565%) hue-rotate(175deg) brightness(99%) contrast(94%)',
  emerald:
    'brightness(0) saturate(100%) invert(56%) sepia(76%) saturate(384%) hue-rotate(115deg) brightness(92%) contrast(89%)',
  amber:
    'brightness(0) saturate(100%) invert(70%) sepia(85%) saturate(1135%) hue-rotate(2deg) brightness(102%) contrast(101%)',
  rose: 'brightness(0) saturate(100%) invert(31%) sepia(84%) saturate(2787%) hue-rotate(336deg) brightness(94%) contrast(95%)',
  purple:
    'brightness(0) saturate(100%) invert(35%) sepia(45%) saturate(1500%) hue-rotate(245deg) brightness(95%) contrast(95%)',
});

function resolvePath(name) {
  if (!name) return null;
  const aliasTarget = ICON_ALIASES[name];
  const key = aliasTarget || name;
  return ICON_PATHS[key] || null;
}

/**
 * <AppIcon name="pencil" tone="slate" size={16} />
 *
 * - `name`     semantic key from ICON_PATHS or ICON_ALIASES
 * - `tone`     color preset key from ICON_TONES (default 'current' = original art)
 * - `size`     px (sets both width and height)
 * - `alt`      a11y; pass '' for purely decorative
 * - `title`    optional tooltip
 * - `style`    extra style overrides
 * - any other  forwarded to <img>
 */
export default function AppIcon({
  name,
  tone = 'current',
  size = 18,
  alt = '',
  title,
  className,
  style,
  ...rest
}) {
  const src = resolvePath(name);
  if (!src) return null;
  const filter = ICON_TONES[tone] || ICON_TONES.current;
  const finalStyle = {
    width: size,
    height: size,
    objectFit: 'contain',
    display: 'inline-block',
    verticalAlign: 'middle',
    flexShrink: 0,
    ...(filter && filter !== 'none' ? { filter } : null),
    ...(style || null),
  };
  return (
    <img
      src={src}
      alt={alt}
      title={title}
      className={className}
      style={finalStyle}
      {...rest}
    />
  );
}

/**
 * Pick the best subject icon name for a given subject label.
 * Falls back to 'knowledge'.
 */
export function subjectIconName(subject) {
  if (!subject) return 'knowledge';
  const s = String(subject).toLowerCase();
  if (s.includes('math')) return 'math';
  if (s.includes('reading') || s.includes('rla') || s.includes('language'))
    return 'rla';
  if (s.includes('social')) return 'socialStudies';
  if (s.includes('science')) return 'science';
  if (s.includes('workforce') || s.includes('career')) return 'workforce';
  return 'knowledge';
}

/**
 * Pick a flavor icon for a Social Studies category label.
 * Used to add visual variety to category badges.
 */
export function socialStudiesCategoryIcon(category) {
  const c = String(category || '').toLowerCase();
  if (c.includes('civics') || c.includes('government'))
    return 'statueOfLiberty';
  if (c.includes('us history') || c.includes('u.s. history'))
    return 'statueOfLiberty';
  if (c.includes('world history')) return 'parthenon';
  if (c.includes('ancient')) return 'sphinx';
  if (c.includes('geography') || c.includes('economic')) return 'world';
  return 'socialStudies';
}

/**
 * Pick a flavor icon for a Science category label.
 */
export function scienceCategoryIcon(category) {
  const c = String(category || '').toLowerCase();
  if (c.includes('life')) return 'cell';
  if (c.includes('earth') || c.includes('space')) return 'world';
  if (c.includes('physical')) return 'molecular';
  if (c.includes('genet') || c.includes('hered')) return 'geneStructure';
  if (c.includes('ecolog')) return 'organism';
  return 'science';
}
