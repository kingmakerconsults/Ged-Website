import React from 'react';

/**
 * Central registry for every SVG asset under frontend/Icons/.
 * Use semantic names — the registry maps them to the file paths.
 *
 * Goals:
 *   - Single source of truth so we can swap art without grepping the codebase.
 *   - Make sure every icon in the catalog has a documented role.
 *   - Tone the icons to match the surrounding text via CSS filter presets.
 */

// Semantic name -> frontend/Icons asset URL
export const ICON_PATHS = Object.freeze({
  // Subjects / categories
  math: new URL('../../../Icons/math-svgrepo-com.svg', import.meta.url).href,
  rla: new URL('../../../Icons/book-closed-svgrepo-com.svg', import.meta.url)
    .href,
  read: new URL('../../../Icons/read-svgrepo-com.svg', import.meta.url).href,
  socialStudies: new URL(
    '../../../Icons/globe-svgrepo-com.svg',
    import.meta.url
  ).href,
  world: new URL('../../../Icons/world-svgrepo-com.svg', import.meta.url).href,
  parthenon: new URL(
    '../../../Icons/parthenon-svgrepo-com.svg',
    import.meta.url
  ).href,
  sphinx: new URL('../../../Icons/sphinx-svgrepo-com.svg', import.meta.url)
    .href,
  statueOfLiberty: new URL(
    '../../../Icons/statue-of-liberty-svgrepo-com.svg',
    import.meta.url
  ).href,
  science: new URL(
    '../../../Icons/double-helix-svgrepo-com.svg',
    import.meta.url
  ).href,
  cell: new URL('../../../Icons/cell-svgrepo-com.svg', import.meta.url).href,
  molecular: new URL(
    '../../../Icons/molecular-svgrepo-com.svg',
    import.meta.url
  ).href,
  organism: new URL(
    '../../../Icons/organic-organism-svgrepo-com.svg',
    import.meta.url
  ).href,
  geneSequencing: new URL(
    '../../../Icons/gene-sequencing-svgrepo-com.svg',
    import.meta.url
  ).href,
  geneStructure: new URL(
    '../../../Icons/gene-structure-svgrepo-com.svg',
    import.meta.url
  ).href,
  geneticAlgorithm: new URL(
    '../../../Icons/genetic-algorithm-svgrepo-com.svg',
    import.meta.url
  ).href,
  geneticData: new URL(
    '../../../Icons/genetic-data-svgrepo-com.svg',
    import.meta.url
  ).href,
  geneticResearch: new URL(
    '../../../Icons/genetic-research-svgrepo-com.svg',
    import.meta.url
  ).href,
  supercoil: new URL(
    '../../../Icons/supercoil-svgrepo-com.svg',
    import.meta.url
  ).href,
  workforce: new URL(
    '../../../Icons/briefcase-svgrepo-com.svg',
    import.meta.url
  ).href,
  bank: new URL('../../../Icons/bank-svgrepo-com.svg', import.meta.url).href,
  fireProtection: new URL(
    '../../../Icons/fire-protection-svgrepo-com.svg',
    import.meta.url
  ).href,

  // Navigation / dashboard
  dashboard: new URL(
    '../../../Icons/chart-pie-svgrepo-com.svg',
    import.meta.url
  ).href,
  dataTrends: new URL(
    '../../../Icons/data-trends-svgrepo-com.svg',
    import.meta.url
  ).href,
  home: new URL('../../../Icons/house-svgrepo-com.svg', import.meta.url).href,
  knowledge: new URL(
    '../../../Icons/knowledge-svgrepo-com.svg',
    import.meta.url
  ).href,
  school: new URL('../../../Icons/school-svgrepo-com.svg', import.meta.url)
    .href,
  student: new URL('../../../Icons/student-svgrepo-com.svg', import.meta.url)
    .href,

  // Theme
  sun: new URL('../../../Icons/sun-svgrepo-com.svg', import.meta.url).href,
  moon: new URL('../../../Icons/sleeping-svgrepo-com.svg', import.meta.url)
    .href,
  sleeping: new URL('../../../Icons/sleeping-svgrepo-com.svg', import.meta.url)
    .href,

  // Actions
  pencil: new URL('../../../Icons/pencil-svgrepo-com.svg', import.meta.url)
    .href,
  writing: new URL('../../../Icons/writing-svgrepo-com.svg', import.meta.url)
    .href,
  eye: new URL('../../../Icons/eye-svgrepo-com.svg', import.meta.url).href,
  headphones: new URL(
    '../../../Icons/headphones-svgrepo-com.svg',
    import.meta.url
  ).href,
  correct: new URL(
    '../../../Icons/correct-success-tick-svgrepo-com.svg',
    import.meta.url
  ).href,
  remove: new URL(
    '../../../Icons/wrong-delete-remove-trash-minus-cancel-close-2-svgrepo-com (1).svg',
    import.meta.url
  ).href,
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
  progress: 'dataTrends',
  myClass: 'school',
  workTogether: 'world',
  quiz: 'pencil',
  test: 'pencil',
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
