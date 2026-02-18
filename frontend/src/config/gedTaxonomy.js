/**
 * GED Test Taxonomy Configuration
 *
 * Defines the canonical domain structure for each GED subject area,
 * the 4-tier progression model, and mapping rules that assign every
 * quiz to a domain + tier.
 *
 * Used by:
 *   - QUIZ_GROUPING in LegacyRootApp.jsx  (UI clusters)
 *   - supplemental.topics.json migration   (backend categories)
 *   - build-quizzes.js deriveCategoryFor() (JSON part-file generation)
 */

// ---------------------------------------------------------------------------
// Tier definitions
// ---------------------------------------------------------------------------
export const TIERS = [
  {
    key: 'foundations',
    rank: 1,
    label: 'Foundations',
    shortLabel: 'Found.',
    color: '#4CAF50', // green
    description: 'Basic concepts, vocabulary, and single-step problems.',
  },
  {
    key: 'core',
    rank: 2,
    label: 'Core Skills',
    shortLabel: 'Core',
    color: '#2196F3', // blue
    description: 'Standard GED-level multi-step practice.',
  },
  {
    key: 'test-ready',
    rank: 3,
    label: 'Test Ready',
    shortLabel: 'Test',
    color: '#FF9800', // orange
    description: 'Full GED difficulty with time-pressure simulation.',
  },
  {
    key: 'challenge',
    rank: 4,
    label: 'Challenge',
    shortLabel: 'Chall.',
    color: '#9C27B0', // purple
    description:
      'Advanced problems for students aiming at college-credit scores.',
  },
];

export const TIER_KEYS = TIERS.map((t) => t.key);

export const LEARNER_FACING_TIERS = [
  {
    key: 'foundation',
    rank: 1,
    label: 'Foundation',
    sourceTiers: ['foundations', 'core'],
  },
  {
    key: 'test-ready',
    rank: 2,
    label: 'Test Ready',
    sourceTiers: ['test-ready'],
  },
  {
    key: 'challenge',
    rank: 3,
    label: 'Challenge',
    sourceTiers: ['challenge'],
  },
];

export function toLearnerFacingTier(tierKey) {
  const normalized = String(tierKey || '')
    .trim()
    .toLowerCase();

  if (normalized === 'test-ready') return 'test-ready';
  if (normalized === 'challenge') return 'challenge';
  if (
    normalized === 'foundations' ||
    normalized === 'core' ||
    normalized === 'foundation'
  ) {
    return 'foundation';
  }
  return null;
}

export function getLearnerTierLabel(tierKey) {
  const learnerTier = toLearnerFacingTier(tierKey);
  if (!learnerTier) return null;
  const match = LEARNER_FACING_TIERS.find((tier) => tier.key === learnerTier);
  return match ? match.label : null;
}

// ---------------------------------------------------------------------------
// Domain structures per subject  (mirrors GED content areas)
// ---------------------------------------------------------------------------

export const GED_DOMAINS = {
  Math: [
    {
      domain: 'Number Sense & Operations',
      icon: '🔢',
      gedPercent: 25,
      description:
        'Whole numbers, fractions, decimals, percents, ratios & proportions.',
    },
    {
      domain: 'Algebra & Functions',
      icon: '📐',
      gedPercent: 30,
      description:
        'Expressions, equations, inequalities, linear & quadratic functions.',
    },
    {
      domain: 'Geometry & Measurement',
      icon: '📏',
      gedPercent: 20,
      description:
        'Area, perimeter, volume, coordinate geometry, transformations.',
    },
    {
      domain: 'Data Analysis & Probability',
      icon: '📊',
      gedPercent: 25,
      description:
        'Statistics, charts, graphs, data interpretation, probability.',
    },
  ],

  Science: [
    {
      domain: 'Life Science',
      icon: '🧬',
      gedPercent: 40,
      description:
        'Cell biology, genetics, evolution, ecology, human body systems.',
    },
    {
      domain: 'Physical Science',
      icon: '⚛️',
      gedPercent: 40,
      description:
        'Chemistry, physics, forces, energy, matter, chemical reactions.',
    },
    {
      domain: 'Earth & Space Science',
      icon: '🌍',
      gedPercent: 20,
      description: 'Geology, weather, climate, astronomy, natural resources.',
    },
  ],

  'Social Studies': [
    {
      domain: 'Civics & Government',
      icon: '🏛️',
      gedPercent: 50,
      description:
        'Constitution, branches of government, rights, elections, federalism.',
    },
    {
      domain: 'U.S. History',
      icon: '📜',
      gedPercent: 20,
      description:
        'Colonial era through contemporary America, key events & movements.',
    },
    {
      domain: 'Economics',
      icon: '💰',
      gedPercent: 15,
      description:
        'Economic principles, supply & demand, markets, personal finance.',
    },
    {
      domain: 'Geography & the World',
      icon: '🗺️',
      gedPercent: 15,
      description:
        'Map skills, global interactions, regions, human-environment impact.',
    },
  ],

  'Reasoning Through Language Arts (RLA)': [
    {
      domain: 'Reading Comprehension',
      icon: '📖',
      gedPercent: 60,
      description:
        'Main idea, evidence, inference, structure, informational & literary texts.',
    },
    {
      domain: 'Language & Grammar',
      icon: '✏️',
      gedPercent: 25,
      description: 'Grammar conventions, usage, editing, sentence mechanics.',
    },
    {
      domain: 'Writing & Analysis',
      icon: '📝',
      gedPercent: 15,
      description:
        'Extended response, argument analysis, constructed-response writing.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Special (non-tiered) categories
// ---------------------------------------------------------------------------
export const SPECIAL_CATEGORIES = [
  'Image Based Practice',
  'Interactive Demos',
  'Diagnostic',
];

// ---------------------------------------------------------------------------
//  Category → GED Domain mapping
//
//  Maps every existing categoryName (from supplemental.topics.json,
//  quiz_data.js, and JSON part files) to the canonical GED domain.
// ---------------------------------------------------------------------------
export const CATEGORY_TO_DOMAIN = {
  // ── Math ──────────────────────────────────────────────────────────────
  'Number Sense & Operations': 'Number Sense & Operations',
  'Ratios & Proportions': 'Number Sense & Operations',
  'Ratios & Proportions / Percent Applications': 'Number Sense & Operations',
  'Quantitative Problem Solving': 'Number Sense & Operations',

  'Algebra & Linear Equations': 'Algebra & Functions',
  'Algebraic Reasoning': 'Algebra & Functions',
  'Algebraic Problem Solving': 'Algebra & Functions',
  'Algebraic Expressions & Linear Equations': 'Algebra & Functions',
  'Expressions & Equations': 'Algebra & Functions',
  'Expressions and Equations': 'Algebra & Functions',
  Algebra: 'Algebra & Functions',

  'Graphs & Functions': 'Algebra & Functions',

  'Geometry & Measurement': 'Geometry & Measurement',
  Geometry: 'Geometry & Measurement',
  'Measurement & Geometry': 'Geometry & Measurement',

  'Data, Statistics & Probability': 'Data Analysis & Probability',
  'Data Analysis & Probability': 'Data Analysis & Probability',

  'Interactive Demos': 'Interactive Demos',
  'Interactive Tool Demos': 'Interactive Demos',
  'Tool Demos': 'Interactive Demos',
  Demos: 'Interactive Demos',

  // ── Science ───────────────────────────────────────────────────────────
  'Life Science': 'Life Science',
  'Physical Science': 'Physical Science',
  'Earth & Space Science': 'Earth & Space Science',
  'Earth and Space Science': 'Earth & Space Science',
  'Scientific Practices / Data Reasoning': 'Scientific Practices',
  'Scientific Practices': 'Scientific Practices',
  'Scientific Numeracy': 'Scientific Practices',
  'Science Topics': null, // handled by ID-based rules

  // ── Social Studies ────────────────────────────────────────────────────
  'Civics & Government': 'Civics & Government',
  'Civil Rights movement and modern era': 'U.S. History',
  'Civil War & Reconstruction': 'U.S. History',
  'Colonial era and early United States': 'U.S. History',
  'Westward expansion / industrialization': 'U.S. History',
  'Social Studies Topics': null, // handled by ID-based rules
  'U.S. History': 'U.S. History',
  'Economics / Geography': 'Economics', // will split geo quizzes by ID
  Economics: 'Economics',
  'Geography and the World': 'Geography & the World',
  'Reading Primary / Secondary Sources': 'Civics & Government',

  // ── RLA ───────────────────────────────────────────────────────────────
  'Main Idea': 'Reading Comprehension',
  'Evidence Selection': 'Reading Comprehension',
  'Inference, Tone, and Purpose': 'Reading Comprehension',
  'Vocabulary in Context': 'Reading Comprehension',
  'Reading Comprehension': 'Reading Comprehension',
  'Reading Comprehension: Informational Texts': 'Reading Comprehension',
  'Reading Comprehension: Literary Texts': 'Reading Comprehension',
  'Reading Comprehension: Paired Passages': 'Reading Comprehension',

  'Grammar, Clarity, and Revision': 'Language & Grammar',
  'Language & Grammar': 'Language & Grammar',
  'Language & Editing': 'Language & Grammar',
  Language: 'Language & Grammar',
  Editing: 'Language & Grammar',
  'Editing & Revision': 'Language & Grammar',
  'Language & Writing': 'Language & Grammar',

  'Writing / Extended Response': 'Writing & Analysis',
  'Essay Writing': 'Writing & Analysis',
  'Constructed Response': 'Writing & Analysis',

  'RLA Topics': null, // handled by ID-based rules

  // ── Cross-subject ─────────────────────────────────────────────────────
  'Image Based Practice': 'Image Based Practice',
  'Diagnostic Composites': 'Diagnostic',

  // ── Catch-all for "Math Concepts" which contains mixed quiz types ─────
  'Math Concepts': null, // handled by ID-based rules
};

// ---------------------------------------------------------------------------
//  ID-pattern → Domain rules  (for quizzes whose category is null above
//  or whose category is missing)
// ---------------------------------------------------------------------------

/**
 * Given a quiz id and subject, derive the GED domain from ID patterns.
 * Called when CATEGORY_TO_DOMAIN[category] === null or is missing.
 */
export function domainFromQuizId(id, subject) {
  if (!id) return null;
  const lower = id.toLowerCase();

  // Image-based quizzes
  if (/_img_/.test(lower) || lower.startsWith('img_'))
    return 'Image Based Practice';

  // Diagnostics
  if (lower.startsWith('diag_')) return 'Diagnostic';

  // Tool demos
  if (/_tool_demo/.test(lower)) return 'Interactive Demos';

  // ── Math ──
  if (subject === 'Math') {
    if (
      /math_number_sense|math_quant_basics|math_quant_numbers|math_quant_percents|math_quant_ratios|math_quant_fractions|math_ratios/.test(
        lower
      )
    )
      return 'Number Sense & Operations';
    if (/math_alg|math_algebra|math_graphs/.test(lower))
      return 'Algebra & Functions';
    if (/math_geom|math_geometry/.test(lower)) return 'Geometry & Measurement';
    if (/math_data|math_quant_stats|math_quant_bar/.test(lower))
      return 'Data Analysis & Probability';
    return 'Number Sense & Operations'; // safe default
  }

  // ── Science ──
  if (subject === 'Science') {
    if (/sci_life|sci_ecosystem|sci_genetics|sci_biology/.test(lower))
      return 'Life Science';
    if (/sci_physical|sci_chem|sci_physics/.test(lower))
      return 'Physical Science';
    if (/sci_earth|sci_space|sci_astro/.test(lower))
      return 'Earth & Space Science';
    if (/sci_data|sci_scientific|sci_numeracy/.test(lower))
      return 'Scientific Practices';
    return 'Physical Science'; // safe default
  }

  // ── Social Studies ──
  if (subject === 'Social Studies') {
    if (
      /ss_civics|ss_constitution|ss_bill_of_rights|ss_gov|ss_judicial|ss_executive|ss_legislative|ss_separation|ss_federalism|ss_elections|ss_lawmaking|ss_supreme_court|ss_reading_sources/.test(
        lower
      )
    )
      return 'Civics & Government';
    if (/ss_econ/.test(lower)) return 'Economics';
    if (/ss_geo/.test(lower)) return 'Geography & the World';
    // all other ss_ and us_history → U.S. History
    return 'U.S. History';
  }

  // ── RLA ──
  if (
    subject === 'Reasoning Through Language Arts (RLA)' ||
    subject === 'RLA'
  ) {
    if (/rla_extended_response|rla_writing/.test(lower))
      return 'Writing & Analysis';
    if (/rla_grammar|rla_lang|rla_conventions|rla_usage/.test(lower))
      return 'Language & Grammar';
    return 'Reading Comprehension';
  }

  return null;
}

// ---------------------------------------------------------------------------
//  Tier assignment from quiz ID
// ---------------------------------------------------------------------------

/**
 * Determine the tier key for a quiz based on its ID.
 * Returns one of: 'foundations', 'core', 'test-ready', 'challenge'
 */
export function tierFromQuizId(id) {
  if (!id) return 'core';
  const lower = id.toLowerCase();

  // Diagnostics are always Test Ready tier
  if (lower.startsWith('diag_')) return 'test-ready';

  // Tool demos are Foundations
  if (/_tool_demo/.test(lower)) return 'foundations';

  // Image quizzes default to Core Skills
  if (/_img_/.test(lower) || lower.startsWith('img_')) return 'core';

  // Set-based (quiz_data.js style): _set1..4
  const setMatch = lower.match(/_set(\d+)$/);
  if (setMatch) {
    const n = parseInt(setMatch[1], 10);
    if (n === 1) return 'foundations';
    if (n === 2) return 'core';
    if (n === 3) return 'test-ready';
    return 'challenge'; // set4+
  }

  // Quiz-numbered: _quiz_1, _quiz_2, _quiz1, _quiz2
  const quizNumMatch = lower.match(/_quiz[_]?(\d+)$/);
  if (quizNumMatch) {
    const n = parseInt(quizNumMatch[1], 10);
    if (n <= 1) return 'foundations';
    if (n <= 2) return 'core';
    if (n <= 3) return 'test-ready';
    return 'challenge';
  }

  // Numbered series: trailing _01 .. _22 (common in backend quizzes)
  const numMatch = lower.match(/_(\d{1,2})$/);
  if (numMatch) {
    const n = parseInt(numMatch[1], 10);
    if (n <= 3) return 'foundations';
    if (n <= 6) return 'core';
    if (n <= 9) return 'test-ready';
    return 'challenge'; // 10+
  }

  // Named quizzes — keyword heuristics
  if (/basics|fundamentals|core|intro|foundation/.test(lower))
    return 'foundations';
  if (/advanced|composite|mastery/.test(lower)) return 'challenge';

  // Default
  return 'core';
}

// ---------------------------------------------------------------------------
//  Resolve domain for a quiz entry
// ---------------------------------------------------------------------------

/**
 * Resolve the GED domain for a quiz given its current category, id, and subject.
 * @param {string} category  - current categoryName from supplemental.topics.json
 * @param {string} quizId    - topic id or quiz id
 * @param {string} subject   - canonical subject name
 * @returns {string} GED domain name
 */
export function resolveDomain(category, quizId, subject) {
  // 1. Direct mapping from existing category name
  const mapped = CATEGORY_TO_DOMAIN[category];
  if (mapped) return mapped;

  // 2. If category maps to null → use ID-based rules
  if (mapped === null || !category) {
    const idDomain = domainFromQuizId(quizId, subject);
    if (idDomain) return idDomain;
  }

  // 3. Try ID-based as fallback even when category wasn't in the map
  const idFallback = domainFromQuizId(quizId, subject);
  if (idFallback) return idFallback;

  // 4. Ultimate fallback
  return category || 'General';
}

// ---------------------------------------------------------------------------
//  QUIZ_GROUPING replacement (used by LegacyRootApp.jsx)
// ---------------------------------------------------------------------------

export const GED_QUIZ_GROUPING = {
  Math: [
    {
      label: 'Interactive Demos (Beta)',
      categories: [
        'Interactive Demos',
        'Interactive Tool Demos',
        'Tool Demos',
        'Demos',
      ],
    },
    {
      label: 'Number Sense & Operations',
      tier: null, // contains all tiers
      categories: [
        'Number Sense & Operations',
        'Ratios & Proportions',
        'Ratios & Proportions / Percent Applications',
        'Quantitative Problem Solving',
      ],
    },
    {
      label: 'Algebra & Functions',
      categories: [
        'Algebra & Functions',
        'Algebra & Linear Equations',
        'Algebraic Reasoning',
        'Algebraic Problem Solving',
        'Algebraic Expressions & Linear Equations',
        'Expressions & Equations',
        'Expressions and Equations',
        'Algebra',
        'Graphs & Functions',
      ],
    },
    {
      label: 'Geometry & Measurement',
      categories: [
        'Geometry & Measurement',
        'Geometry',
        'Measurement & Geometry',
      ],
    },
    {
      label: 'Data Analysis & Probability',
      categories: [
        'Data Analysis & Probability',
        'Data, Statistics & Probability',
      ],
    },
  ],

  Science: [
    {
      label: 'Life Science',
      categories: ['Life Science'],
    },
    {
      label: 'Physical Science',
      categories: ['Physical Science'],
    },
    {
      label: 'Earth & Space Science',
      categories: ['Earth & Space Science', 'Earth and Space Science'],
    },
    {
      label: 'Scientific Practices',
      categories: [
        'Scientific Practices',
        'Scientific Practices / Data Reasoning',
        'Scientific Numeracy',
      ],
    },
  ],

  'Social Studies': [
    {
      label: 'Civics & Government',
      categories: [
        'Civics & Government',
        'Reading Primary / Secondary Sources',
      ],
    },
    {
      label: 'U.S. History',
      categories: [
        'U.S. History',
        'Civil Rights movement and modern era',
        'Civil War & Reconstruction',
        'Colonial era and early United States',
        'Westward expansion / industrialization',
      ],
    },
    {
      label: 'Economics',
      categories: ['Economics', 'Economics / Geography'],
    },
    {
      label: 'Geography & the World',
      categories: ['Geography & the World', 'Geography and the World'],
    },
  ],

  'Reasoning Through Language Arts (RLA)': [
    {
      label: 'Reading Comprehension',
      categories: [
        'Reading Comprehension',
        'Reading Comprehension: Informational Texts',
        'Reading Comprehension: Literary Texts',
        'Reading Comprehension: Paired Passages',
        'Main Idea',
        'Evidence Selection',
        'Inference, Tone, and Purpose',
        'Vocabulary in Context',
      ],
    },
    {
      label: 'Language & Grammar',
      categories: [
        'Language & Grammar',
        'Grammar, Clarity, and Revision',
        'Language & Editing',
        'Language & Writing',
        'Language',
        'Editing',
        'Editing & Revision',
      ],
    },
    {
      label: 'Writing & Analysis',
      categories: [
        'Writing & Analysis',
        'Writing / Extended Response',
        'Essay Writing',
        'Constructed Response',
      ],
    },
  ],
};
