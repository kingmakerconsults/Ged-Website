// React hook aliases for UMD + Babel standalone environment
// This allows bare useState/useEffect/etc. calls when React is loaded via UMD scripts.
// In some browsers, React is only attached as window.React, so normalize that first.
const ReactGlobal =
  typeof window !== 'undefined' && window.React ? window.React : React;

const {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useContext,
  useReducer,
  createContext,
} = ReactGlobal;

// Shims for global-based modules (no ES imports in Babel Standalone)
const { useThemeController } = window.Hooks || {};
const { useInteractiveToolPanel } = window.Hooks || {};
const MathUtils = window.MathUtils || {};
const TextUtils = window.TextUtils || {};
// Quiz progress utilities are exposed directly on window
const SUBJECT_PROGRESS_KEYS = window.SUBJECT_PROGRESS_KEYS;
const GED_PASSING_SCORE = window.GED_PASSING_SCORE;
const PREMADE_QUIZ_CATALOG = window.PREMADE_QUIZ_CATALOG;
const getPremadeQuizTotal = window.getPremadeQuizTotal;
const createEmptyProgress = window.createEmptyProgress;
const buildProgressFromAttempts = window.buildProgressFromAttempts;
const ensureUserProfile = window.ensureUserProfile;
const SCIENCE_QUESTIONS = window.SCIENCE_QUESTIONS;
const MATH_QUESTIONS = window.MATH_QUESTIONS;
const SOCIAL_STUDIES_QUESTIONS = window.SOCIAL_STUDIES_QUESTIONS;
const RLA_QUESTIONS = window.RLA_QUESTIONS;
const { ScienceFormulas, SCI_NUMERACY_QUESTIONS } = window;

// Components exposed via window.Components
const Components = window.Components || {};
const {
  JoinOrganizationModal,
  NamePromptModal,
  PracticeSessionModal,
  FormulaDisplay,
  FormulaSheetModal,
  ScienceFormulaSheet,
  DashboardView,
  WorkforceView,
  ProfileViewWrapper,
  SettingsViewWrapper,
  HomeroomView,
  AdminView,
  QuizInterface,
  ProfileView,
  SettingsView,
  OrganizationSummaryView,
  DetailedProgressView,
  VocabularyOverview,
  RlaReadingSplitView,
  InterviewScoreReport,
  GeometryFigure,
  ChartDisplay,
  MathText,
  AuthScreen,
} = Components;

// Subject visuals and fallback vocabulary from window
const SubjectVisuals = window.SubjectVisuals || {};
const {
  SUBJECT_NAMES,
  SUBJECT_COLORS,
  SUBJECT_BG_GRADIENTS,
  SUBJECT_LIGHT_SURFACE_GRADIENTS,
  SUBJECT_LIGHT_TINTS,
  SUBJECT_SHORT_LABELS,
  VOCABULARY_SUBJECT_COLORS,
  MAX_TICKER_WORDS_PER_SUBJECT,
} = SubjectVisuals;
const FallbackVocabulary = window.FallbackVocabulary || {};
const { FALLBACK_VOCABULARY, normalizeVocabularyEntry, mergeVocabularyData } =
  FallbackVocabulary;

// Extract utility functions for global scope (for compatibility with existing code)
const {
  applySafeMathFix,
  normalizeLatex,
  normalizeLatexForKaTeX,
  normalizeFormulaLatex,
  renderLatexToHtml,
  escapeHtml,
  formatExponents,
  normalizeMathText,
  collapseSplitLatexCommands,
  smartWrapLatex,
  stripLeakedMathPlaceholders,
  KATEX_RENDER_OPTIONS,
  upgradePlainMathForDisplay,
  formatMathText,
  extractMathSegments,
  renderStem,
  renderStemWithKatex,
  renderQuestionTextForDisplay,
} = MathUtils;

const {
  normalizeLineBreaks,
  preprocessRawContent,
  sanitizeCodeSegment,
  normalizeImagePath,
  resolveAssetUrl,
  getOptionText,
  getOptionIsCorrect,
  findCorrectOption,
  isShortResponseQuestion,
  ALLOWED_HTML_TAGS,
  ALLOWED_HTML_ATTR,
  surroundOperatorWithSpaces,
  normalizePunctuationSpacing,
  escapeLatexControlCharacters,
  repairLatexCorruption,
  decodeHtmlEntities,
  neutralizeUnpairedDollarSigns,
  escapeCurrencyDollarsMathSafe,
  stripBackslashesOutsideMath,
  deglueCommonBigrams,
  addSpacesAroundInlineMath,
  repairSpacedTags,
  protectTables,
  formatFractions,
  cleanRepeatedText,
  normalizeInlineTablesFront,
  sanitizeHtmlContent,
} = TextUtils;

/* global React, ReactDOM */

// Core global constants imported from quizProgress.js:
// - SUBJECT_PROGRESS_KEYS
// - GED_PASSING_SCORE
// - PREMADE_QUIZ_CATALOG
// - getPremadeQuizTotal
// - createEmptyProgress
// - buildProgressFromAttempts
// - ensureUserProfile

// Subject name to ID mapping for badge/icon lookups
const SUBJECT_ID_MAP = {
  'Social Studies': 'social_studies',
  'Reasoning Through Language Arts (RLA)': 'rla',
  Science: 'science',
  Math: 'math',
};

// Ensure Admin Mode / legacy panels can always see this map
if (typeof window !== 'undefined') {
  window.SUBJECT_ID_MAP = SUBJECT_ID_MAP;
  // SUBJECT_PROGRESS_KEYS and GED_PASSING_SCORE attached to window in quizProgress.js
}

// Badge image paths by subject ID
const BADGE_IMG_PATHS = {
  social_studies: '/badges/social-studies.svg',
  rla: '/badges/rla.svg',
  science: '/badges/science.svg',
  math: '/badges/math.svg',
};

if (typeof window !== 'undefined') {
  window.BADGE_IMG_PATHS = BADGE_IMG_PATHS;
}

// PREMADE_QUIZ_CATALOG and getPremadeQuizTotal now imported from quizProgress.js

// createEmptyProgress now imported from quizProgress.js

// buildProgressFromAttempts now imported from quizProgress.js

// ensureUserProfile now imported from quizProgress.js

const DEFAULT_COLOR_SCHEME = {
  background: 'var(--nav-active-bg)',
  onBackgroundText: 'var(--nav-active-text)',
  accent: 'var(--accent)',
  accentText: 'var(--accent-text)',
  navAnsweredBg: 'var(--nav-answered-bg)',
  navAnsweredText: 'var(--nav-answered-text)',
  navDefaultBg: 'var(--nav-default-bg)',
  navDefaultText: 'var(--nav-default-text)',
  navMarkedRing: 'var(--nav-marked-ring)',
  optionSelectedBg: 'var(--accent-soft)',
  optionSelectedBorder: 'var(--accent-border)',
  optionHover: 'var(--option-hover-bg)',
  scoreBackground: 'var(--bg-overlay)',
  scoreText: 'var(--accent-text)',
  scoreBorder: 'var(--border-subtle)',
  surface: 'var(--bg-surface)',
  surfaceStrong: 'var(--bg-overlay)',
  surfaceBorder: 'var(--border-subtle)',
  divider: 'var(--border-subtle)',
  text: 'var(--text-primary)',
  mutedText: 'var(--text-secondary)',
  inputBorder: 'var(--border-subtle)',
  ring: 'var(--accent-ring)',
  timerLowBg: 'var(--timer-low-bg)',
  timerLowText: 'var(--timer-low-text)',
  timerDefaultBg: 'var(--timer-default-bg)',
  timerDefaultText: 'var(--timer-default-text)',
};

if (typeof window !== 'undefined') {
  window.DEFAULT_COLOR_SCHEME = DEFAULT_COLOR_SCHEME;
}

// Subject visual meta constants extracted to ./config/subjectVisuals.js
// Fallback vocabulary extracted to ./config/fallbackVocabulary.js

// Vocabulary normalization helpers extracted to ./config/fallbackVocabulary.js

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { err: null };
  }

  static getDerivedStateFromError(err) {
    return { err };
  }

  componentDidCatch(err, info) {
    console.error('Render error:', err, info);
  }

  render() {
    const { err } = this.state;

    if (err) {
      const message =
        (err && err.message) ||
        'An unexpected error occurred while loading this page.';

      return (
        <div
          style={{
            padding: '16px',
            background: '#fee2e2',
            color: '#991b1b',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <h2 style={{ fontWeight: 700, marginTop: 0, marginBottom: '8px' }}>
            Something went wrong.
          </h2>
          <p style={{ marginBottom: '8px', fontSize: '14px' }}>
            Please try refreshing the page. If this keeps happening, let your
            instructor or site admin know.
          </p>
          <details style={{ fontSize: '12px', opacity: 0.85 }}>
            <summary>Error details</summary>
            <pre style={{ whiteSpace: 'pre-wrap', marginTop: '4px' }}>
              {String(message)}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

const {
  tokenizeMathSegments,
  restoreMathSegments,
  normalizeCurrencyOutsideMath,
  normalizeLatexMacrosInMath,
  stripTextMacroInPlain,
  applyPhraseSpacingRepairs,
  addMissingBackslashesInMath,
  fixAllMathInText,
  collapseUnderscoredLatexMacros,
} = window.TextSanitizer || {};

// Use current port in development (when accessed via localhost or file://), production otherwise
const API_BASE_URL =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.protocol === 'file:')
    ? `http://${window.location.hostname}:${window.location.port || 3002}`
    : 'https://ged-website.onrender.com';

if (typeof window !== 'undefined') {
  window.API_BASE_URL = API_BASE_URL;
}

// Fallback alias for API_BASE for legacy code safety
const API_BASE =
  typeof window !== 'undefined' && window.__CLIENT_CONFIG__?.API_BASE_URL
    ? window.__CLIENT_CONFIG__.API_BASE_URL
    : API_BASE_URL;

if (typeof window !== 'undefined') {
  window.API_BASE = API_BASE;
}

const SCORE_FETCH_INTERVAL_MS = 45000;

async function generateTopicQuiz(subjectParam, topic, difficulty) {
  const response = await fetch(
    `${API_BASE_URL}/api/topic-based/${encodeURIComponent(subjectParam)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, difficulty }),
    }
  );

  let payload = null;
  try {
    payload = await response.json();
  } catch (err) {
    throw new Error('The quiz service returned invalid JSON.');
  }

  if (!response.ok) {
    const message =
      payload?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  if (!payload?.success || !Array.isArray(payload.items)) {
    throw new Error('The quiz service returned an unexpected payload.');
  }

  return payload.items.map((item, idx) => ({
    ...item,
    questionNumber: item.questionNumber ?? idx + 1,
  }));
}
const SUBJECT_PARAM_MAP = {
  Science: 'Science',
  'Social Studies': 'Social Studies',
  Math: 'Math',
  'Reasoning Through Language Arts (RLA)': 'RLA',
  RLA: 'RLA',
  Workforce: 'Workforce',
};

const resolveSubjectParam = (subject) => {
  if (!subject) {
    return '';
  }
  return SUBJECT_PARAM_MAP[subject] || subject;
};

// Math and text utilities imported from respective modules
const ENTITY_DECODER =
  typeof document !== 'undefined' ? document.createElement('textarea') : null;

// (Removed legacy inline MathText component; now using imported MathText.)

// formatMathText()
// Apply both plain-text fraction wrapping and inline exponent superscripting
// to already-sanitized HTML. This is intended for AI/dynamic (non-premade)
// content that uses a/b and a^b without LaTeX delimiters.
// upgrades very simple plain-text math to our display-friendly form before HTML formatting
// This is intentionally conservative and runs ONLY for generated Math items.
// (Removed duplicate upgradePlainMathForDisplay; centralized in mathUtils.)

// (Removed duplicate formatMathText; centralized in mathUtils.)

// (Removed duplicate renderQuestionTextForDisplay; centralized in mathUtils.)

// Text processing helpers are now imported from textUtils.js

// (Removed duplicate extractMathSegments; centralized in mathUtils.)

// (Removed duplicate sanitizeHtmlContent; centralized in textUtils.)

// Frontend safety: convert pipe-style tables to HTML so styles apply even if backend missed them
// (Removed duplicate normalizeInlineTablesFront; centralized in textUtils.)

// formatFractions()
// This finds plain-text math-style fractions and wraps them in <span class="frac">...</span>
// We ONLY match "number/number" or "(...)/number" or "(...)/(...)"
// (Removed duplicate formatFractions implementation; centralized in textUtils.)

// (Removed duplicate cleanRepeatedText implementation; centralized in textUtils.)

// ChartDisplay and parseHtmlTable extracted to components/charts/ChartDisplay.jsx

// Science formula sheet data & numeracy questions extracted to data/science modules

// AppData reconstructed from extracted question modules
const AppData = {
  ...SCIENCE_QUESTIONS,
  ...MATH_QUESTIONS,
  ...SOCIAL_STUDIES_QUESTIONS,
  ...RLA_QUESTIONS,
};

const getTopicById = (subjectName, topicId) => {
  if (!subjectName || !topicId) {
    return null;
  }
  const sourceApp =
    typeof window !== 'undefined' && window.AppData ? window.AppData : AppData;
  const subject = sourceApp?.[subjectName];
  if (!subject || !subject.categories) {
    return null;
  }
  for (const category of Object.values(subject.categories)) {
    const topics = Array.isArray(category?.topics) ? category.topics : [];
    const match = topics.find(
      (candidate) => candidate && candidate.id === topicId
    );
    if (match) {
      return match;
    }
  }
  return null;
};

const resolveQuizQuestions = (subjectName, topic, quiz) => {
  if (quiz && Array.isArray(quiz.questions) && quiz.questions.length) {
    return quiz.questions;
  }
  if (quiz?.questionSourceTopicId) {
    const sourceTopic = getTopicById(subjectName, quiz.questionSourceTopicId);
    if (
      sourceTopic &&
      Array.isArray(sourceTopic.questions) &&
      sourceTopic.questions.length
    ) {
      return sourceTopic.questions;
    }
  }
  if (topic && Array.isArray(topic.questions) && topic.questions.length) {
    return topic.questions;
  }
  return [];
};

const quizHasAvailableQuestions = (subjectName, topic, quiz) => {
  if (!quiz) {
    return false;
  }
  if (Array.isArray(quiz.questions) && quiz.questions.length) {
    return true;
  }
  if (quiz.questionSourceTopicId) {
    const sourceTopic = getTopicById(subjectName, quiz.questionSourceTopicId);
    if (
      sourceTopic &&
      Array.isArray(sourceTopic.questions) &&
      sourceTopic.questions.length
    ) {
      return true;
    }
  }
  return Array.isArray(topic?.questions) && topic.questions.length > 0;
};

const topicHasAvailableQuestions = (subjectName, topic) => {
  if (!topic || typeof topic !== 'object') {
    return false;
  }
  if (Array.isArray(topic.questions) && topic.questions.length > 0) {
    return true;
  }
  if (Array.isArray(topic.quizzes) && topic.quizzes.length > 0) {
    return topic.quizzes.some((quiz) =>
      quizHasAvailableQuestions(subjectName, topic, quiz)
    );
  }
  return false;
};

// --- Canonical topic grouping (collapse variants like "Quiz 2", "Set B", etc.) ---
// Heuristics only: if window.CURATED_SAQ_TOPICS[subject] exists, it will be used to order/filter.
function isVariantSuffix(text) {
  if (!text) return false;
  const t = String(text).trim().toLowerCase();
  // Matches: Quiz 2, Quiz B, Set 3, Version 4, Test A, Practice Set 2, Form C, Variant I, V2, etc.
  return (
    /\b(quiz|set|version|form|variant|practice\s*set|test)\b\s*([#:.-]?\s*[a-z0-9ivxlcm]+)?\s*$/.test(
      t
    ) || /\b(v\s*\d+)\s*$/.test(t)
  );
}

function splitOnDivider(title) {
  // Prefer colon or long dash as divider between base and variant
  const dividers = [':', '–', '-', '|'];
  for (const d of dividers) {
    const idx = title.indexOf(d);
    if (idx > -1) {
      return [title.slice(0, idx).trim(), title.slice(idx + 1).trim()];
    }
  }
  return [title.trim(), ''];
}

function deriveCanonicalTopicTitle(rawTitle) {
  if (!rawTitle) return '';
  let title = String(rawTitle).trim();
  // Prefer centralized resolver if present
  try {
    if (
      typeof window !== 'undefined' &&
      typeof window.resolveCanonicalTopic === 'function' &&
      subjectName
    ) {
      const resolved = window.resolveCanonicalTopic(subjectName, title);
      if (resolved) return resolved;
    }
  } catch {}
  // Remove trailing parenthetical variant markers e.g., (Set 2), (Quiz B)
  title = title
    .replace(/\((?:\s*(?:quiz|set|version|form|variant)[^)]*)\)\s*$/i, '')
    .trim();
  // If there is a divider, and the right side looks like a variant tag, keep the left side
  const [left, right] = splitOnDivider(title);
  if (right && isVariantSuffix(right)) {
    return left;
  }
  // Otherwise, strip trailing inline variant patterns like "... Quiz 3" or "... Set B"
  const stripped = title
    .replace(
      /\b(quiz|set|version|form|variant|practice\s*set)\b\s*[#:.-]?\s*[a-z0-9ivxlcm]+\s*$/i,
      ''
    )
    .trim();
  return stripped || left || title;
}

function buildCanonicalTopics(subjectName, categoryName, rawTopics) {
  const groups = new Map();
  const curated =
    typeof window !== 'undefined' &&
    window.CURATED_SAQ_TOPICS &&
    window.CURATED_SAQ_TOPICS[subjectName]
      ? window.CURATED_SAQ_TOPICS[subjectName]
      : null;

  const pushVariant = (group, topic, quizLike, indexWithinTopic) => {
    if (!quizLike || typeof quizLike !== 'object') return;
    // Ensure variant has minimally required shape; keep original for resolution
    const variant = { ...quizLike };
    // Defer question resolution to existing pipeline; ensure label exists for UI
    if (!variant.label) {
      const idx =
        typeof indexWithinTopic === 'number'
          ? indexWithinTopic
          : Array.isArray(group.quizzes)
          ? group.quizzes.length
          : 0;
      variant.label = `Quiz ${String.fromCharCode(65 + (idx % 26))}`;
    }
    group.quizzes.push(variant);
  };

  const ensureGroup = (canonicalTitle) => {
    const key = canonicalTitle.toLowerCase();
    if (!groups.has(key)) {
      const id = `canon__${sanitizeCodeSegment(
        canonicalTitle,
        canonicalTitle
      )}`;
      groups.set(key, {
        id,
        title: canonicalTitle,
        description: '',
        quizzes: [],
        imageUrl: null,
      });
    }
    return groups.get(key);
  };

  const topics = Array.isArray(rawTopics) ? rawTopics : [];
  topics.forEach((topic) => {
    if (!topic || typeof topic !== 'object') return;
    const srcTitle = topic.title || topic.id || '';
    // Try centralized resolver first
    let baseTitle = null;
    try {
      if (
        typeof window !== 'undefined' &&
        typeof window.resolveCanonicalTopic === 'function'
      ) {
        baseTitle = window.resolveCanonicalTopic(subjectName, srcTitle);
      }
    } catch {}
    if (!baseTitle) {
      baseTitle = deriveCanonicalTopicTitle(srcTitle, subjectName);
    }
    const group = ensureGroup(baseTitle);
    if (!group.description && topic.description)
      group.description = topic.description;
    if (!group.imageUrl && topic.imageUrl) group.imageUrl = topic.imageUrl;

    if (Array.isArray(topic.quizzes) && topic.quizzes.length) {
      topic.quizzes.forEach((quiz, qi) => pushVariant(group, topic, quiz, qi));
    }
    if (Array.isArray(topic.questions) && topic.questions.length) {
      // Treat topic-level questions as a single variant
      const pseudo = {
        title: topic.title,
        questions: topic.questions,
        quizId: topic.id,
        questionSourceTopicId: topic.id,
      };
      pushVariant(group, topic, pseudo, 0);
    }
  });

  // Filter out empty groups (no available questions at all)
  let aggregated = Array.from(groups.values())
    .map((g) => {
      const filtered = {
        ...g,
        quizzes: (g.quizzes || []).filter(
          (q) =>
            q &&
            quizHasAvailableQuestions(
              subjectName,
              { id: g.id, title: g.title },
              q
            )
        ),
      };
      return filtered;
    })
    .filter((g) => Array.isArray(g.quizzes) && g.quizzes.length > 0);

  // Optional: apply curated allowlist ordering if provided
  if (Array.isArray(curated) && curated.length) {
    const allow = new Set(
      curated.map((t) => String(t).toLowerCase().trim()).filter(Boolean)
    );
    aggregated = aggregated.filter((g) =>
      allow.has(String(g.title).toLowerCase().trim())
    );
    const order = new Map(
      curated.map((t, i) => [String(t).toLowerCase().trim(), i])
    );
    aggregated.sort(
      (a, b) =>
        (order.get(a.title.toLowerCase().trim()) ?? 1e9) -
        (order.get(b.title.toLowerCase().trim()) ?? 1e9)
    );
  }

  return aggregated;
}

// --- Display helpers for stacked variants and labels ---
function getVariantDisplayName(subjectName, canonicalTopicTitle, index) {
  const idx = Number(index) || 0;
  const subj = String(subjectName || '').toLowerCase();
  const title = String(canonicalTopicTitle || '').toLowerCase();
  // Special naming for RLA informational reading sets
  if (subj.includes('reasoning') || subj === 'rla') {
    if (
      title.includes('reading comprehension') &&
      title.includes('informational')
    ) {
      if (idx === 0) return 'Main Passage';
      if (idx === 1) return 'Details & Inference';
      if (idx === 2) return 'Paired Texts';
      return `High-Challenge #${idx - 2}`;
    }
  }
  // Generic naming scheme
  if (idx === 0) return 'Core Practice';
  if (idx === 1) return 'Skill Builder';
  if (idx === 2) return 'Mixed Review';
  return `Challenge Set #${idx - 2}`;
}

/**
 * CORE PRACTICE BUNDLE TITLES
 * Maps topic keys to array of descriptive titles for bundled quiz sets.
 * Each topic can have multiple sets, each with a specific, curated name.
 */
const CORE_PRACTICE_BUNDLE_TITLES = {
  // MATH - Quantitative Reasoning
  math_quant_basics: [
    'Whole Number Operations & Order of Operations',
    'Fractions, Mixed Numbers, and Decimals',
    'Percent Applications in Real-World Contexts',
  ],
  // MATH - Algebra & Equations
  math_alg_expressions: [
    'Simplifying Expressions & Like Terms',
    'One-Step and Two-Step Linear Equations',
    'Multi-Step Equations & Inequalities',
    'Word Problems with Linear Equations',
  ],
  // MATH - Geometry
  math_geom_basics: [
    'Perimeter and Area of 2-D Shapes',
    'Surface Area & Volume of Prisms and Cylinders',
    'Composite Shapes and Real-World Geometry',
  ],
  // RLA - Reading Comprehension: Informational
  rla_info_main_idea: [
    'Main Idea & Supporting Details',
    "Author's Purpose & Point of View",
    'Making Inferences from Context',
  ],
  rla_info_structure_purpose: [
    'Text Structure & Organization',
    'Argumentative Claims & Evidence',
    'Comparing Multiple Texts',
  ],
  // RLA - Literature
  rla_lit_plot_character: [
    'Plot Development & Story Elements',
    'Character Analysis & Motivation',
    'Conflict & Resolution',
  ],
  rla_lit_theme_figurative_language: [
    'Theme & Central Message',
    'Figurative Language & Literary Devices',
    'Symbolism & Deeper Meaning',
  ],
  // RLA - Language & Grammar
  rla_lang_conventions: [
    'Capitalization, Punctuation & Spelling',
    'Subject-Verb Agreement & Verb Tenses',
    'Sentence Structure & Fragments',
  ],
  rla_lang_usage: [
    'Pronoun Usage & Agreement',
    'Modifier Placement & Clarity',
    'Parallel Structure & Consistency',
  ],
  rla_extended_response: [
    'Essay Planning & Organization',
    'Evidence-Based Arguments',
    'Revising & Editing Strategies',
  ],
  // SCIENCE - Life Science
  science_life_basics: [
    'Cell Structure & Function',
    'Genetics & Heredity',
    'Ecosystems & Energy Flow',
  ],
  // SCIENCE - Physical Science
  science_physical_basics: [
    'Forces & Motion',
    'Energy Transformations',
    'Chemical Reactions & Properties',
  ],
  // SCIENCE - Chemistry (new detailed balancing & stoichiometry quizzes)
  sci_chem_equations_balancing: [
    'Balancing Basics & Conservation of Mass',
    'Combustion, Synthesis & Decomposition',
    'Replacement Reactions & Biological Equations',
  ],
  sci_chem_reaction_types_stoichiometry: [
    'Reaction Classification & Patterns',
    'Mole Ratios & Limiting Reactants',
    'Percent Yield, Energy & Catalysts',
  ],
  // SCIENCE - Chemistry (advanced topics)
  sci_chem_acids_bases: [
    'pH Scale & Hydrogen Ion Concentration',
    'Acid-Base Definitions & Properties',
    'Neutralization, Buffers & Titration',
    'Conjugate Pairs & Water Equilibrium',
  ],
  sci_chem_gas_laws: [
    "Boyle's, Charles's & Gay-Lussac's Laws",
    'Ideal Gas Law & STP Calculations',
    "Dalton's Law & Kinetic Molecular Theory",
    "Graham's Law & Real Gas Behavior",
  ],
  sci_chem_thermochemistry: [
    'Enthalpy Changes & Exothermic/Endothermic Reactions',
    'Calorimetry & Specific Heat',
    "Hess's Law & Standard Enthalpies",
    'Activation Energy & Catalysts',
  ],
  sci_chem_solutions_concentration: [
    'Molarity Calculations & Dilution',
    'Solubility & Saturated Solutions',
    'Colligative Properties',
    'Polar vs. Nonpolar Solutes',
  ],
  // SCIENCE - Earth & Space
  science_earth_basics: [
    "Earth's Systems & Processes",
    'Weather & Climate Patterns',
    'Solar System & Universe',
  ],
  // SOCIAL STUDIES - U.S. History
  ss_us_hist_foundations: [
    'Colonial Period & Revolutionary Era',
    'Constitution & Bill of Rights',
    'Civil War & Reconstruction',
  ],
  // SOCIAL STUDIES - Civics & Government
  ss_civics_basics: [
    'Three Branches of Government',
    'Rights & Responsibilities of Citizens',
    'Voting & Democratic Participation',
  ],
  // SOCIAL STUDIES - Economics
  ss_econ_basics: [
    'Supply & Demand Fundamentals',
    'Economic Systems & Markets',
    'Personal Finance & Budgeting',
  ],
};

/**
 * Get a curated bundle title for Core Practice sets.
 * @param {string} topicKey - The topic identifier (e.g., 'math_quant_basics')
 * @param {number} bundleIndex - Zero-based index of the bundle (0, 1, 2, ...)
 * @param {string} fallbackTitle - Fallback title if no mapping exists
 * @returns {string} - Human-friendly bundle title
 */
function getCorePracticeBundleTitle(topicKey, bundleIndex, fallbackTitle) {
  const list = CORE_PRACTICE_BUNDLE_TITLES[topicKey];
  if (Array.isArray(list) && list[bundleIndex]) {
    return list[bundleIndex];
  }
  // Return improved fallback (not generic "Set N")
  return fallbackTitle || `Core Practice Set ${bundleIndex + 1}`;
}

function sortVariantsStable(quizSets) {
  const toKey = (q, i) => {
    const code = (q && (q.quizCode || q.quizId || q.id || q.title || '')) + '';
    // Extract trailing number as a weak signal
    const m = code.match(/(\d+)(?!.*\d)/);
    const n = m ? parseInt(m[1], 10) : i;
    return { n, code: code.toLowerCase(), i };
  };
  return [...(quizSets || [])]
    .map((q, i) => ({ q, ...toKey(q, i) }))
    .sort((a, b) => a.n - b.n || a.code.localeCompare(b.code) || a.i - b.i)
    .map((x) => x.q);
}

const annotateQuestionsWithSubject = (questions, subjectKey) => {
  if (!Array.isArray(questions) || !subjectKey) {
    return Array.isArray(questions) ? questions : [];
  }

  return questions.map((question) => {
    if (!question || typeof question !== 'object') {
      return question;
    }

    if (!question.subject) {
      return { ...question, subject: subjectKey };
    }

    return question;
  });
};

const integrateExpandedQuizData = (baseData, expandedData) => {
  if (!expandedData || typeof expandedData !== 'object') {
    return baseData;
  }

  const annotateSubjectTree = (subjectNode, subjectKey) => {
    if (!subjectNode || typeof subjectNode !== 'object') {
      return;
    }

    Object.values(subjectNode.categories || {}).forEach((category) => {
      if (!category || typeof category !== 'object') {
        return;
      }

      (category.topics || []).forEach((topic) => {
        if (!topic || typeof topic !== 'object') {
          return;
        }

        if (Array.isArray(topic.quizzes)) {
          topic.quizzes = topic.quizzes.map((quiz) => {
            if (!quiz || typeof quiz !== 'object') {
              return quiz;
            }
            return {
              ...quiz,
              subject: quiz.subject || subjectKey,
              questions: annotateQuestionsWithSubject(
                quiz.questions,
                subjectKey
              ),
            };
          });
        }

        if (Array.isArray(topic.questions)) {
          topic.questions = annotateQuestionsWithSubject(
            topic.questions,
            subjectKey
          );
        }
      });
    });
  };

  Object.entries(expandedData).forEach(([subjectName, expandedSubject]) => {
    if (!expandedSubject || typeof expandedSubject !== 'object') {
      return;
    }

    if (!baseData[subjectName]) {
      baseData[subjectName] = JSON.parse(JSON.stringify(expandedSubject));
      annotateSubjectTree(baseData[subjectName], subjectName);
      return;
    }

    const baseSubject = baseData[subjectName];
    if (!baseSubject.categories) {
      baseSubject.categories = {};
    }
    if (expandedSubject.icon && !baseSubject.icon) {
      baseSubject.icon = expandedSubject.icon;
    }

    Object.entries(expandedSubject.categories || {}).forEach(
      ([categoryName, expandedCategory]) => {
        if (!expandedCategory || typeof expandedCategory !== 'object') {
          return;
        }

        if (!baseSubject.categories[categoryName]) {
          baseSubject.categories[categoryName] = JSON.parse(
            JSON.stringify(expandedCategory)
          );
          return;
        }

        const baseCategory = baseSubject.categories[categoryName];
        if (expandedCategory.description && !baseCategory.description) {
          baseCategory.description = expandedCategory.description;
        }

        if (!Array.isArray(baseCategory.topics)) {
          baseCategory.topics = [];
        }
        const topicList = baseCategory.topics;

        (expandedCategory.topics || []).forEach((expandedTopic) => {
          if (!expandedTopic || typeof expandedTopic !== 'object') {
            return;
          }

          let existingTopic = topicList.find(
            (topic) =>
              topic.id === expandedTopic.id ||
              topic.title === expandedTopic.title
          );
          if (!existingTopic) {
            existingTopic = JSON.parse(JSON.stringify(expandedTopic));
            topicList.push(existingTopic);
          } else {
            if (expandedTopic.description && !existingTopic.description) {
              existingTopic.description = expandedTopic.description;
            }
          }

          if (
            Array.isArray(expandedTopic.quizzes) &&
            expandedTopic.quizzes.length
          ) {
            existingTopic.quizzes = expandedTopic.quizzes.map((quiz) => {
              if (!quiz || typeof quiz !== 'object') {
                return quiz;
              }

              const questions = annotateQuestionsWithSubject(
                quiz.questions,
                subjectName
              );
              return {
                ...quiz,
                subject: quiz.subject || subjectName,
                questions,
              };
            });

            if (
              !Array.isArray(existingTopic.questions) ||
              !existingTopic.questions.length
            ) {
              const firstQuiz = existingTopic.quizzes[0];
              if (firstQuiz && Array.isArray(firstQuiz.questions)) {
                existingTopic.questions = annotateQuestionsWithSubject(
                  firstQuiz.questions,
                  subjectName
                );
              }
            }
          }

          if (
            Array.isArray(existingTopic.questions) &&
            existingTopic.questions.length
          ) {
            existingTopic.questions = annotateQuestionsWithSubject(
              existingTopic.questions,
              subjectName
            );
          }
        });
      }
    );

    annotateSubjectTree(baseSubject, subjectName);
  });

  return baseData;
};

const expandedQuizDataSource =
  typeof window !== 'undefined' && window.ExpandedQuizData
    ? window.ExpandedQuizData
    : typeof globalThis !== 'undefined'
    ? globalThis.ExpandedQuizData
    : null;
if (expandedQuizDataSource) {
  integrateExpandedQuizData(AppData, expandedQuizDataSource);
}

// Helper functions are now imported from textUtils.js and mathUtils.js

function cloneArticle(article) {
  if (!article || typeof article !== 'object') {
    return null;
  }
  try {
    return JSON.parse(JSON.stringify(article));
  } catch (error) {
    return Array.isArray(article) ? [...article] : { ...article };
  }
}

// Helper functions are now imported from textUtils.js and mathUtils.js

function normalizeQuestionAssets(question, subjectName) {
  if (!question || typeof question !== 'object') return question;
  // Image URL variants
  if (question.imageURL && !question.imageUrl)
    question.imageUrl = question.imageURL;
  if (question.imageUrl)
    question.imageUrl = normalizeImagePath(question.imageUrl);
  if (
    question.stimulusImage &&
    typeof question.stimulusImage === 'object' &&
    question.stimulusImage.src
  ) {
    question.stimulusImage = {
      ...question.stimulusImage,
      src: normalizeImagePath(question.stimulusImage.src),
    };
  }
  // Math normalization for Math subject only
  if (subjectName === 'Math') {
    if (typeof question.question === 'string')
      question.question = normalizeMathText(question.question);
    if (typeof question.rationale === 'string')
      question.rationale = normalizeMathText(question.rationale);
    if (Array.isArray(question.answerOptions)) {
      question.answerOptions = question.answerOptions.map((opt) =>
        opt && typeof opt === 'object' && typeof opt.text === 'string'
          ? { ...opt, text: normalizeMathText(opt.text) }
          : opt
      );
    }
  }
  // Preserve tool flags for Math interactive demos
  if (question.useGeometryTool) question.useGeometryTool = true;
  if (question.useGraphTool) question.useGraphTool = true;
  return question;
}

// Helper functions are now imported from textUtils.js

function generateSubjectQuestion(subject, baseIndex = 1, template = {}) {
  const qn = template.questionNumber || baseIndex;
  if (subject === 'Math') {
    return {
      type: 'multiple-choice',
      difficulty: template.difficulty || 'easy',
      questionNumber: qn,
      question: `What is ${qn} + ${qn}?`,
      answerOptions: [
        { id: 'A', text: `${qn}`, isCorrect: false },
        { id: 'B', text: `${qn * 2}`, isCorrect: true },
        { id: 'C', text: `${qn + 1}`, isCorrect: false },
        { id: 'D', text: `${qn - 1}`, isCorrect: false },
      ],
      correctAnswer: 'B',
      rationale: `Adding ${qn} + ${qn} = ${qn * 2}.`,
    };
  }
  if (subject === 'Science') {
    return {
      type: 'multiple-choice',
      difficulty: template.difficulty || 'easy',
      questionNumber: qn,
      question: 'Which statement best describes a scientific observation?',
      answerOptions: [
        {
          id: 'A',
          text: 'Something you measure or notice using your senses',
          isCorrect: true,
        },
        { id: 'B', text: 'A guess with no evidence', isCorrect: false },
        {
          id: 'C',
          text: 'Only something written in a textbook',
          isCorrect: false,
        },
        { id: 'D', text: 'Always a math calculation', isCorrect: false },
      ],
      correctAnswer: 'A',
      rationale: 'An observation is information gathered using the senses.',
    };
  }
  if (subject === 'Social Studies') {
    return {
      type: 'multiple-choice',
      difficulty: template.difficulty || 'easy',
      questionNumber: qn,
      question: 'Why do governments create laws?',
      answerOptions: [
        {
          id: 'A',
          text: 'To maintain order and protect rights',
          isCorrect: true,
        },
        { id: 'B', text: 'To make travel impossible', isCorrect: false },
        { id: 'C', text: 'To stop people from learning', isCorrect: false },
        { id: 'D', text: 'Only to collect art', isCorrect: false },
      ],
      correctAnswer: 'A',
      rationale: 'Laws help create order and protect citizens.',
    };
  }
  // RLA / default
  return {
    type: 'multiple-choice',
    difficulty: template.difficulty || 'easy',
    questionNumber: qn,
    question: 'What is the main idea of a passage?',
    answerOptions: [
      {
        id: 'A',
        text: 'The most important point the author is making',
        isCorrect: true,
      },
      { id: 'B', text: 'A random detail', isCorrect: false },
      { id: 'C', text: 'The title only', isCorrect: false },
      { id: 'D', text: 'Only the last sentence', isCorrect: false },
    ],
    correctAnswer: 'A',
    rationale: 'The main idea is the central point of the passage.',
  };
}

function flushShortQuizToTwelve(quiz, subject) {
  if (!quiz || !Array.isArray(quiz.questions)) quiz.questions = [];
  const current = quiz.questions.length;
  if (current >= 12) return quiz;
  let nextNum = current + 1;
  while (quiz.questions.length < 12) {
    const generated = generateSubjectQuestion(subject, nextNum, {
      difficulty: quiz.questions[0]?.difficulty || 'easy',
    });
    generated.questionNumber = nextNum;
    quiz.questions.push(generated);
    nextNum++;
  }
  return quiz;
}

function ensureMinQuestions(quiz, subject, min = 12) {
  if (!quiz) return quiz;
  if (!Array.isArray(quiz.questions)) quiz.questions = [];
  // Skip padding for interactive tool-type quizzes
  try {
    const qType =
      (quiz && (quiz.type || (quiz.config && quiz.config.type))) || '';
    if (qType === 'graphing_tool' || qType === 'geometry_tool') {
      return quiz;
    }
  } catch {}
  const current = quiz.questions.length;
  // 0–4 => flush with new unique questions
  if (current < 5) {
    return flushShortQuizToTwelve(quiz, subject);
  }
  // 5–11 => pad by cloning last
  if (current > 4 && current < min) {
    const last = quiz.questions[current - 1];
    while (quiz.questions.length < min) {
      const nextNum = quiz.questions.length + 1;
      quiz.questions.push({ ...last, questionNumber: nextNum });
    }
    return quiz;
  }
  return quiz; // already >= 12
}

function assignPremadeQuizCodes(data) {
  const catalog = {};
  if (!data || typeof data !== 'object') {
    return catalog;
  }

  Object.entries(data).forEach(([subjectName, subject]) => {
    if (!subject || typeof subject !== 'object') {
      return;
    }

    const subjectSlug = sanitizeCodeSegment(subjectName, 'subject');
    if (!catalog[subjectName]) {
      catalog[subjectName] = [];
    }

    // Normalize category keys to canonical names for stable downstream behavior
    const normalizedCats = (() => {
      try {
        if (
          typeof window !== 'undefined' &&
          typeof window.normalizeCategoriesObject === 'function'
        ) {
          const subjKey =
            typeof window.canonicalSubjectKey === 'function'
              ? window.canonicalSubjectKey(subjectName)
              : subjectName;
          return window.normalizeCategoriesObject(
            subjKey,
            subject.categories || {}
          );
        }
      } catch {}
      return subject.categories || {};
    })();

    // Helper to register a quiz entry and stamp quizCode on the source object
    Object.entries(normalizedCats).forEach(
      ([categoryName, category], categoryIndex) => {
        if (!category || typeof category !== 'object') {
          return;
        }

        const categorySlug = sanitizeCodeSegment(
          categoryName,
          `cat-${categoryIndex + 1}`
        );
        const topics = Array.isArray(category.topics) ? category.topics : [];

        topics.forEach((topic, topicIndex) => {
          if (!topic || typeof topic !== 'object') {
            return;
          }

          const topicSlugFromId = topic.id ? sanitizeCodeSegment(topic.id) : '';
          const topicSlug = sanitizeCodeSegment(
            topic.title,
            topicSlugFromId || `topic-${topicIndex + 1}`
          );
          const baseSegment = topicSlugFromId || `${categorySlug}-${topicSlug}`;

          const registerQuiz = (target, code, title) => {
            if (!code) {
              return;
            }
            if (!catalog[subjectName].some((entry) => entry.code === code)) {
              catalog[subjectName].push({ code, title });
            }
            if (target && typeof target === 'object') {
              target.quizCode = code;
            }
          };

          if (Array.isArray(topic.quizzes) && topic.quizzes.length) {
            topic.quizzes.forEach((quiz, quizIndex) => {
              if (!quiz || typeof quiz !== 'object') {
                return;
              }
              // Ensure questions array exists, normalize assets, pad to min
              const subjectKey = subjectName;
              if (!Array.isArray(quiz.questions)) {
                // Try to resolve from topic if missing; otherwise leave [] for generation
                const resolved = resolveQuizQuestions(subjectKey, topic, quiz);
                quiz.questions = Array.isArray(resolved)
                  ? resolved.slice()
                  : [];
              }
              // Normalize each question and enforce minimum length
              quiz.questions = quiz.questions.map((q) =>
                normalizeQuestionAssets(q, subjectKey)
              );
              ensureMinQuestions(quiz, subjectKey, 12);

              const quizIdSegment = sanitizeCodeSegment(quiz.quizId || '', '');
              const labelSegment = sanitizeCodeSegment(quiz.label || '', '');
              const setSegment =
                quizIdSegment || labelSegment || `set-${quizIndex + 1}`;
              const code = [subjectSlug, baseSegment || topicSlug, setSegment]
                .filter(Boolean)
                .join('__');
              // Title resolution: prefer provided; otherwise humanize or rebuild for Math
              let quizTitle = quiz.title;
              const looksAutoId = (s) => {
                if (!s) return true;
                const t = String(s);
                return /(^|\b)(math|rla)_/i.test(t) || t.includes('_');
              };
              const humanizeQuizId = (id) => {
                if (!id) return '';
                let t = String(id).replace(/^(math|rla)_/i, '');
                t = t.replace(/[_-]+/g, ' ').trim();
                t = t.replace(/\b(set|quiz)\s*(\d+|[A-Z])\b/gi, (m) =>
                  m.toUpperCase()
                );
                return t.replace(
                  /\w\S*/g,
                  (w) => w.charAt(0).toUpperCase() + w.slice(1)
                );
              };
              const deriveSetNumber = () => {
                if (quiz.label) {
                  const m = String(quiz.label).match(/([A-Z])$/);
                  if (m) return m[1].charCodeAt(0) - 64;
                  const n = String(quiz.label).match(/(\d+)/);
                  if (n) return parseInt(n[1], 10);
                }
                const n2 = String(quiz.quizId || '').match(/(\d+)/);
                if (n2) return parseInt(n2[1], 10);
                return quizIndex + 1;
              };
              const canonicalizeCategoryNameLocal = (subj, name) => {
                try {
                  return typeof window !== 'undefined' &&
                    typeof window.canonicalizeCategoryName === 'function'
                    ? window.canonicalizeCategoryName(subj, name)
                    : name;
                } catch {
                  return name;
                }
              };
              const deriveMathShortTopic = (topicTitle, canonCat) => {
                const raw = String(topicTitle || '').trim();
                if (!raw) return 'Practice';
                // Remove leading category and dividers
                let base = raw;
                if (
                  canonCat &&
                  base.toLowerCase().startsWith(canonCat.toLowerCase())
                ) {
                  base = base.slice(canonCat.length).trim();
                }
                if (
                  base.startsWith(':') ||
                  base.startsWith('–') ||
                  base.startsWith('-')
                )
                  base = base.slice(1).trim();
                // Drop trailing variant markers like "Quiz 2"
                base = base
                  .replace(
                    /\b(quiz|set|practice)\b\s*[#:.-]?\s*[a-z0-9ivxlcm]+\s*$/i,
                    ''
                  )
                  .trim();
                // If empty, fallback to topicTitle without quiz suffix
                if (!base) {
                  const noSuffix = raw
                    .replace(
                      /\b(quiz|set)\b\s*[#:.-]?\s*[a-z0-9ivxlcm]+\s*$/i,
                      ''
                    )
                    .trim();
                  return noSuffix || 'Practice';
                }
                return base;
              };
              if (!quizTitle || looksAutoId(quizTitle)) {
                if (String(subjectName).toLowerCase() === 'math') {
                  const canonCat = canonicalizeCategoryNameLocal(
                    subjectName,
                    categoryName
                  );
                  const shortTopic = deriveMathShortTopic(
                    topic.title,
                    canonCat
                  );
                  const setNum = deriveSetNumber();
                  quizTitle = `${canonCat}: ${shortTopic} (Set ${setNum})`;
                } else {
                  const fallback = quiz.quizId
                    ? humanizeQuizId(quiz.quizId)
                    : '';
                  const labelText =
                    quiz.label || `Quiz ${String.fromCharCode(65 + quizIndex)}`;
                  quizTitle = fallback
                    ? `${fallback}`
                    : `${topic.title || 'Quiz'} – ${labelText}`;
                }
              }
              registerQuiz(quiz, code, quizTitle);
            });
          } else if (Array.isArray(topic.questions) && topic.questions.length) {
            // Create a single-quiz topic; normalize and ensure 12
            const subjectKey = subjectName;
            topic.questions = topic.questions.map((q) =>
              normalizeQuestionAssets(q, subjectKey)
            );
            const pseudoQuiz = { questions: topic.questions };
            // If this topic represents a tool demo, skip padding to keep it at 4Q
            if (
              topic &&
              (topic.type === 'graphing_tool' || topic.type === 'geometry_tool')
            ) {
              // no-op: retain original question count
            } else {
              ensureMinQuestions(pseudoQuiz, subjectKey, 12);
            }
            topic.questions = pseudoQuiz.questions;
            const code = [
              subjectSlug,
              baseSegment || topicSlug || `topic-${topicIndex + 1}`,
            ]
              .filter(Boolean)
              .join('__');
            const quizTitle = topic.title || `Topic ${topicIndex + 1}`;
            registerQuiz(topic, code, quizTitle);
          }
        });

        // Some categories might have quizzes directly (without topics)
        if (Array.isArray(category.quizzes) && category.quizzes.length) {
          category.quizzes.forEach((quiz, quizIndex) => {
            if (!quiz || typeof quiz !== 'object') return;
            const subjectKey = subjectName;
            if (!Array.isArray(quiz.questions)) quiz.questions = [];
            quiz.questions = quiz.questions.map((q) =>
              normalizeQuestionAssets(q, subjectKey)
            );
            ensureMinQuestions(quiz, subjectKey, 12);
            const quizIdSegment = sanitizeCodeSegment(quiz.quizId || '', '');
            const labelSegment = sanitizeCodeSegment(
              quiz.label || quiz.title || '',
              ''
            );
            const setSegment =
              quizIdSegment || labelSegment || `set-${quizIndex + 1}`;
            const code = [subjectSlug, categorySlug, setSegment]
              .filter(Boolean)
              .join('__');
            const quizTitle =
              quiz.title ||
              `${categoryName} – ${
                quiz.label || `Quiz ${String.fromCharCode(65 + quizIndex)}`
              }`;
            // Stamp code for potential resolution later
            quiz.quizCode = code;
            if (!catalog[subjectName].some((e) => e.code === code)) {
              catalog[subjectName].push({ code, title: quizTitle });
            }
          });
        }
      }
    );

    // Subject-level quizzes (rare)
    if (Array.isArray(subject.quizzes) && subject.quizzes.length) {
      subject.quizzes.forEach((quiz, quizIndex) => {
        if (!quiz || typeof quiz !== 'object') return;
        const subjectKey = subjectName;
        if (!Array.isArray(quiz.questions)) quiz.questions = [];
        quiz.questions = quiz.questions.map((q) =>
          normalizeQuestionAssets(q, subjectKey)
        );
        ensureMinQuestions(quiz, subjectKey, 12);
        const quizIdSegment = sanitizeCodeSegment(quiz.quizId || '', '');
        const labelSegment = sanitizeCodeSegment(
          quiz.label || quiz.title || '',
          ''
        );
        const setSegment =
          quizIdSegment || labelSegment || `set-${quizIndex + 1}`;
        const code = [subjectSlug, setSegment].filter(Boolean).join('__');
        const quizTitle =
          quiz.title ||
          `${subjectName} – ${
            quiz.label || `Quiz ${String.fromCharCode(65 + quizIndex)}`
          }`;
        quiz.quizCode = code;
        if (!catalog[subjectName].some((e) => e.code === code)) {
          catalog[subjectName].push({ code, title: quizTitle });
        }
      });
    }
  });

  return catalog;
}

// Defer building premade catalog until expanded data is ready
function initPremades() {
  try {
    const collect = () => {
      const sources = [];
      if (typeof window === 'undefined') return null;
      if (window.MergedExpandedQuizData)
        sources.push(window.MergedExpandedQuizData);
      if (window.ExpandedQuizData) sources.push(window.ExpandedQuizData);
      if (window.__ESM_ExpandedQuizData)
        sources.push(window.__ESM_ExpandedQuizData);
      if (window.Data && window.Data.expandedQuizData)
        sources.push(window.Data.expandedQuizData);
      if (!sources.length) return null;
      // shallow subject-level merge is enough as assignPremadeQuizCodes walks all branches
      const merged = sources.reduce((acc, src) => {
        Object.entries(src || {}).forEach(([k, v]) => {
          if (!acc[k]) acc[k] = v;
        });
        return acc;
      }, {});
      return merged;
    };
    const source = collect();
    PREMADE_QUIZ_CATALOG = source ? assignPremadeQuizCodes(source) : {};
    if (typeof window !== 'undefined') {
      window.PREMADE_QUIZ_CATALOG = PREMADE_QUIZ_CATALOG;
    }
    if (typeof window !== 'undefined' && window.__DEBUG_QUIZZES) {
      const summary = Object.fromEntries(
        Object.entries(PREMADE_QUIZ_CATALOG).map(([s, arr]) => [
          s,
          Array.isArray(arr) ? arr.length : 0,
        ])
      );
      console.log('[premade] subjects:', Object.keys(PREMADE_QUIZ_CATALOG));
      console.log(
        '[premade] total quizzes:',
        Object.values(summary).reduce((a, b) => a + b, 0),
        summary
      );
      if (!source)
        console.log(
          '[premade] ExpandedQuizData not found – using empty catalog'
        );
    }
  } catch (err) {
    if (typeof window !== 'undefined' && window.__DEBUG_QUIZZES) {
      console.warn('Failed to build premade catalog:', err);
    }
  }
}
if (typeof window !== 'undefined') {
  window.initPremades = initPremades;
}
initPremades();

// --- QUIZ LIBRARY (clusters) ---
// Build a centralized cluster library from AppData categories to power a two-level browser.
// Structure:
//   QUIZ_LIBRARY = {
//     [subjectName]: {
//       clusters: [
//         { id, label, description, topicIds: [topicId, ...] }
//       ]
//     }
//   }
// Optional grouping configuration to merge multiple raw categories into cleaner clusters
// and/or rename clusters for a tidier quiz browser. Any categories not listed here
// will be included as their own clusters under their original names.
const QUIZ_GROUPING = {
  // Science: mild consolidation
  Science: [
    { label: 'Life Science', categories: ['Life Science'] },
    {
      label: 'Physical, Earth & Space',
      categories: ['Physical Science', 'Earth & Space Science'],
    },
    { label: 'Scientific Numeracy', categories: ['Scientific Numeracy'] },
  ],
  // Math: add a highlighted Demo category first, then canonical clusters
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
      label: 'Algebra',
      categories: [
        'Algebra',
        'Algebraic Problem Solving',
        'Algebraic Reasoning',
        'Algebra & Linear Equations',
        'Algebraic Expressions & Linear Equations',
        'Expressions & Equations',
        'Expressions and Equations',
      ],
    },
    {
      label: 'Functions & Relations',
      categories: ['Functions & Relations'],
    },
    {
      label: 'Quantitative & Data',
      categories: [
        'Quantitative & Data',
        'Quantitative Problem Solving',
        'Data, Statistics & Probability',
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
  ],
  // RLA: canonical clusters with variants
  'Reasoning Through Language Arts (RLA)': [
    {
      label: 'Reading Comprehension',
      categories: [
        'Reading Comprehension',
        'Reading Comprehension: Informational Texts',
        'Reading Comprehension: Literary Texts',
        'Reading Comprehension: Paired Passages',
        'Main Idea',
      ],
    },
    {
      label: 'Language & Editing',
      categories: [
        'Language & Editing',
        'Language & Grammar',
        'Language',
        'Editing',
        'Editing & Revision',
      ],
    },
    {
      label: 'Writing / Extended Response',
      categories: [
        'Writing / Extended Response',
        'Essay Writing',
        'Constructed Response',
      ],
    },
  ],
  // Social Studies: categories are already tidy; no grouping needed
};

function buildQuizLibraryFromAppData(data) {
  const result = {};
  if (!data || typeof data !== 'object') {
    return result;
  }
  Object.entries(data).forEach(([subjectName, subject]) => {
    if (!subject || typeof subject !== 'object' || !subject.categories) {
      return;
    }
    const clusters = [];

    // If a grouping is provided for this subject, build clusters from it; otherwise fall back to 1:1 category mapping
    const groupDefs = QUIZ_GROUPING[subjectName];
    const usedCategories = new Set();

    if (Array.isArray(groupDefs) && groupDefs.length) {
      groupDefs.forEach((group, gIdx) => {
        const groupLabel = group?.label || `Cluster ${gIdx + 1}`;
        const groupCats = Array.isArray(group?.categories)
          ? group.categories
          : [];
        const topicIds = [];
        const descParts = [];

        groupCats.forEach((catName) => {
          const cat = subject.categories[catName];
          if (!cat || typeof cat !== 'object') return;
          usedCategories.add(catName);
          if (Array.isArray(cat.topics)) {
            cat.topics.forEach((t, tIdx) => {
              topicIds.push(
                t?.id || `${sanitizeCodeSegment(catName)}__topic-${tIdx + 1}`
              );
            });
          }
          if (cat.description) descParts.push(`${catName}: ${cat.description}`);
        });

        if (topicIds.length) {
          clusters.push({
            id: sanitizeCodeSegment(groupLabel, `cluster-${gIdx + 1}`),
            label: groupLabel,
            description: descParts.join(' | '),
            topicIds,
          });
        }
      });

      // Any remaining categories not covered by grouping get their own clusters
      const remaining = Object.entries(subject.categories)
        .filter(([name]) => !usedCategories.has(name))
        .sort((a, b) => a[0].localeCompare(b[0])); // deterministic alphabetical order
      remaining.forEach(([categoryName, category], idx) => {
        if (!category || typeof category !== 'object') return;
        const id = sanitizeCodeSegment(
          categoryName,
          `cluster-extra-${idx + 1}`
        );
        const topicIds = Array.isArray(category.topics)
          ? category.topics.map(
              (t, tIdx) => t?.id || `${id}__topic-${tIdx + 1}`
            )
          : [];
        if (topicIds.length) {
          clusters.push({
            id,
            label: categoryName,
            description: category.description || '',
            topicIds,
          });
        }
      });
    } else {
      // Default behavior: one cluster per category
      Object.entries(subject.categories).forEach(
        ([categoryName, category], idx) => {
          if (!category || typeof category !== 'object') {
            return;
          }
          const id = sanitizeCodeSegment(categoryName, `cluster-${idx + 1}`);
          const topicIds = Array.isArray(category.topics)
            ? category.topics.map(
                (t, tIdx) => t?.id || `${id}__topic-${tIdx + 1}`
              )
            : [];
          clusters.push({
            id,
            label: categoryName,
            description: category.description || '',
            topicIds,
          });
        }
      );
    }

    // No extra featured insertion; Math demos are grouped under the 'Interactive Demos' category
    result[subjectName] = { clusters };
  });
  return result;
}

const QUIZ_LIBRARY = buildQuizLibraryFromAppData(AppData);
if (typeof window !== 'undefined') {
  window.QUIZ_LIBRARY = QUIZ_LIBRARY;
}

// --- ICON COMPONENTS ---
const BookOpenIcon = ({ className = '' } = {}) => (
  <BookClosedIcon className={className} />
);
const CalendarIcon = ({ className = '' } = {}) => (
  <i
    className={['far fa-calendar-alt', className].filter(Boolean).join(' ')}
    aria-hidden="true"
  ></i>
);
const GlobeIcon = ({ className = '' } = {}) => (
  <ParthenonIcon className={className} />
);
const BeakerIcon = ({ className = '' } = {}) => (
  <DoubleHelixIcon className={className} />
);
const BriefcaseIcon = ({ className = '' } = {}) => (
  <CustomBriefcaseIcon className={className} />
);
const CalculatorIcon = ({ className = '' } = {}) => (
  <MathIcon className={className} />
);
const ChartBarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

if (typeof window !== 'undefined') {
  window.ChartBarIcon = ChartBarIcon;
}

// Alias component for legacy Admin code expecting BarChartIcon name
const BarChartIcon = (props = {}) => <ChartBarIcon {...props} />;
if (typeof window !== 'undefined') {
  window.BarChartIcon = BarChartIcon;
}

// Admin dashboard icons
const UsersIcon = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

if (typeof window !== 'undefined') {
  window.UsersIcon = UsersIcon;
}

const ClockIcon = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

if (typeof window !== 'undefined') {
  window.ClockIcon = ClockIcon;
}

const TrophyIcon = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

if (typeof window !== 'undefined') {
  window.TrophyIcon = TrophyIcon;
}

const StarIcon = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

if (typeof window !== 'undefined') {
  window.StarIcon = StarIcon;
}

const CheckCircleIcon = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const BarChart2Icon = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const VariableIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.874 4.874l14.252 14.252m0-14.252L4.874 19.126M12 4.5v15"
    />
  </svg>
);
const ShapesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12l-9-9-9 9m18 0l-9 9-9-9"
    />
  </svg>
);

// --- CUSTOM SVG ICONS FROM icons/ FOLDER ---
const SunIcon = ({ className = '' } = {}) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 1024 1024"
    className={className || 'h-5 w-5'}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path
      d="M861 656.7l144.6-144.6L861 367.6V163.1H656.6L512 18.6 367.4 163.1H163v204.5L18.4 512.1 163 656.7v204.4h204.4L512 1005.7l144.6-144.6H861z"
      fill="#FCD170"
    />
    <path
      d="M512 1015.7c-2.6 0-5.1-1-7.1-2.9L363.3 871.1H163c-5.5 0-10-4.5-10-10V660.8L11.4 519.2c-1.9-1.9-2.9-4.4-2.9-7.1 0-2.7 1.1-5.2 2.9-7.1L153 363.4V163.1c0-5.5 4.5-10 10-10h200.3L504.9 11.5c1.9-1.9 4.4-2.9 7.1-2.9s5.2 1.1 7.1 2.9l141.6 141.6H861c5.5 0 10 4.5 10 10v200.3L1012.6 505c1.9 1.9 2.9 4.4 2.9 7.1 0 2.7-1.1 5.2-2.9 7.1L871 660.8v200.3c0 5.5-4.5 10-10 10H660.7l-141.6 141.6c-2 2-4.5 3-7.1 3zM173 851.1h194.4c2.7 0 5.2 1.1 7.1 2.9L512 991.6l137.5-137.5c1.9-1.9 4.4-2.9 7.1-2.9H851V656.7c0-2.7 1.1-5.2 2.9-7.1l137.5-137.5-137.5-137.5c-1.9-1.9-2.9-4.4-2.9-7.1V173.1H656.6c-2.7 0-5.2-1.1-7.1-2.9L512 32.7 374.5 170.2c-1.9 1.9-4.4 2.9-7.1 2.9H173v194.4c0 2.7-1.1 5.2-2.9 7.1L32.6 512.1l137.5 137.5c1.9 1.9 2.9 4.4 2.9 7.1v194.4z"
      fill="currentColor"
    />
    <path
      d="M512 512.1m-257.8 0a257.8 257.8 0 1 0 515.6 0 257.8 257.8 0 1 0-515.6 0Z"
      fill="#F7DDAD"
    />
    <path
      d="M512 779.9c-71.5 0-138.8-27.9-189.4-78.4-50.6-50.6-78.4-117.8-78.4-189.4s27.9-138.8 78.4-189.4c50.6-50.6 117.8-78.4 189.4-78.4 71.5 0 138.8 27.9 189.4 78.4 50.6 50.6 78.4 117.8 78.4 189.4S752 650.9 701.4 701.5 583.5 779.9 512 779.9z m0-515.6c-66.2 0-128.4 25.8-175.2 72.6-46.8 46.8-72.6 109-72.6 175.2s25.8 128.4 72.6 175.2c46.8 46.8 109 72.6 175.2 72.6 66.2 0 128.4-25.8 175.2-72.6 46.8-46.8 72.6-109 72.6-175.2S734 383.7 687.2 336.9c-46.8-46.8-109-72.6-175.2-72.6z"
      fill="currentColor"
    />
  </svg>
);

const SleepingMoonIcon = ({ className = '' } = {}) => (
  <svg
    width="1em"
    height="1em"
    viewBox="-9.5 0 256 256"
    className={className || 'h-5 w-5'}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path
      d="M73.033,78.600 C73.033,152.253 133.520,211.960 210.754,211.960 C221.001,211.960 222.928,222.357 215.609,227.570 C192.230,244.220 164.488,255.719 133.547,255.719 C59.791,255.719 -0.000,196.011 -0.000,122.359 C-0.000,67.939 32.747,21.654 79.444,0.693 C83.967,-1.337 97.271,0.365 89.310,15.041 C79.004,34.041 73.033,55.469 73.033,78.600 Z"
      fill="#fce202"
      fillRule="evenodd"
    />
    <path
      d="M177.941,164.969 C177.941,164.969 193.000,164.969 193.000,164.969 C195.209,164.969 197.000,166.760 197.000,168.969 C197.000,171.178 195.209,172.969 193.000,172.969 C193.000,172.969 167.437,172.969 167.437,172.969 C166.137,172.969 164.792,172.623 163.901,171.536 C162.500,169.828 162.748,167.308 164.456,165.906 C164.456,165.906 182.095,150.969 182.095,150.969 C182.095,150.969 167.000,150.969 167.000,150.969 C164.791,150.969 163.000,149.178 163.000,146.969 C163.000,144.760 164.791,142.969 167.000,142.969 C167.000,142.969 193.000,142.991 193.000,142.991 C194.156,142.992 195.303,143.473 196.094,144.436 C197.495,146.144 197.246,148.665 195.538,150.066 C195.538,150.066 177.941,164.969 177.941,164.969 Z"
      fill="#3a75c7"
      fillRule="evenodd"
    />
    <path
      d="M138.011,122.969 C138.011,122.969 168.000,122.969 168.000,122.969 C170.761,122.969 173.000,125.207 173.000,127.969 C173.000,130.730 170.761,132.969 168.000,132.969 C168.000,132.969 124.451,132.969 124.451,132.969 C122.838,133.121 121.183,132.492 120.089,131.138 C118.352,128.991 118.686,125.842 120.833,124.106 C120.833,124.106 153.988,96.969 153.988,96.969 C153.988,96.969 124.000,96.969 124.000,96.969 C121.238,96.969 119.000,94.730 119.000,91.969 C119.000,89.207 121.238,86.969 124.000,86.969 C124.000,86.969 168.000,86.979 168.000,86.979 C169.458,86.978 170.905,87.590 171.893,88.813 C173.630,90.960 173.296,94.108 171.149,95.844 C171.149,95.844 138.011,122.969 138.011,122.969 Z"
      fill="#01bef2"
      fillRule="evenodd"
    />
    <path
      d="M185.718,60.969 C185.718,60.969 229.000,60.969 229.000,60.969 C233.418,60.969 237.000,64.550 237.000,68.969 C237.000,73.387 233.418,76.969 229.000,76.969 C229.000,76.969 162.000,76.969 162.000,76.969 C162.000,76.969 159.371,77.290 156.713,73.884 C153.994,70.401 154.614,65.374 158.097,62.656 C158.097,62.656 206.269,23.906 206.269,23.906 C206.269,23.906 163.000,23.906 163.000,23.906 C158.582,23.906 155.000,20.324 155.000,15.906 C155.000,11.488 158.582,7.906 163.000,7.906 C163.000,7.906 228.583,7.906 228.583,7.906 C228.583,7.906 232.629,7.567 235.291,10.978 C238.010,14.461 237.390,19.488 233.907,22.207 C233.907,22.207 185.718,60.969 185.718,60.969 Z"
      fill="#1ae1ff"
      fillRule="evenodd"
    />
  </svg>
);

const DoubleHelixIcon = ({ className = '' } = {}) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 1024 1024"
    className={className || 'h-6 w-6'}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path
      d="M528 872c1.6-16 16-28.8 32-28.8 14.4 0 27.2 9.6 30.4 24l56-3.2c4.8 0 8 3.2 8 8s-3.2 8-8 8l-57.6 3.2c-3.2 14.4-16 24-30.4 24-12.8 0-25.6-8-30.4-20.8l-144 9.6c-4.8 0-8-3.2-8-8s3.2-8 8-8l144-8z m-94.4-320c3.2-14.4 16-24 30.4-24s27.2 9.6 30.4 24H640c4.8 0 8 3.2 8 8s-3.2 8-8 8h-145.6c-3.2 14.4-16 24-30.4 24s-27.2-9.6-30.4-24h-41.6c-4.8 0-8-3.2-8-8s3.2-8 8-8h41.6z m112-56c3.2-14.4 16-24 30.4-24 12.8 0 24 8 28.8 19.2l33.6-3.2c4.8 0 8 3.2 8 8s-3.2 8-8 8l-30.4 3.2c-1.6 16-14.4 28.8-32 28.8-14.4 0-27.2-9.6-30.4-24l-168 16c-4.8 0-8-3.2-8-8s3.2-8 8-8l168-16z m-96-361.6c3.2-12.8 16-22.4 30.4-22.4 16 0 30.4 12.8 32 28.8l128 11.2c4.8 0 8 4.8 8 8s-4.8 8-8 8l-129.6-11.2c-4.8 11.2-16 19.2-30.4 19.2-16 0-28.8-11.2-32-25.6L376 144c-4.8 0-8-4.8-8-8 0-4.8 4.8-8 8-8l73.6 6.4z m-14.4 305.6c-4.8 1.6-8 0-9.6-4.8-1.6-4.8 0-8 4.8-9.6l160-56c4.8-1.6 8 0 9.6 4.8 1.6 4.8 0 8-4.8 9.6l-160 56z m1.6-216c-4.8-1.6-6.4-6.4-4.8-11.2 1.6-4.8 6.4-6.4 11.2-4.8l152 64c4.8 1.6 6.4 6.4 4.8 11.2-1.6 4.8-6.4 6.4-11.2 4.8l-152-64z m-38.4-40c-4.8-1.6-6.4-4.8-6.4-9.6 1.6-4.8 4.8-6.4 9.6-6.4l224 48c4.8 1.6 6.4 4.8 6.4 9.6-1.6 4.8-4.8 6.4-9.6 6.4l-224-48z m-30.4-80c-4.8 0-8-3.2-8-8s3.2-8 8-8h288c4.8 0 8 3.2 8 8s-3.2 8-8 8H368z m235.2 656l-152 64c-4.8 1.6-8 0-11.2-4.8-1.6-4.8 0-8 4.8-11.2l152-64c4.8-1.6 8 0 11.2 4.8 1.6 4.8-1.6 9.6-4.8 11.2zM406.4 848l216-48c4.8-1.6 8 1.6 9.6 6.4 1.6 4.8-1.6 8-6.4 9.6l-216 48c-4.8 1.6-8-1.6-9.6-6.4 0-4.8 1.6-8 6.4-9.6zM368 936c-4.8 0-8-3.2-8-8s3.2-8 8-8h288c4.8 0 8 3.2 8 8s-3.2 8-8 8H368z m25.6-448c-4.8 1.6-8-1.6-9.6-6.4-1.6-4.8 1.6-8 6.4-9.6l232-48c4.8-1.6 8 1.6 9.6 6.4 1.6 4.8-1.6 8-6.4 9.6l-232 48z m20.8 120c-4.8 0-8-4.8-6.4-9.6s4.8-8 9.6-6.4l208 24c4.8 0 8 4.8 6.4 9.6 0 4.8-4.8 8-9.6 6.4l-208-24z m62.4 40c-4.8-1.6-6.4-6.4-4.8-9.6s6.4-6.4 9.6-4.8l112 40c4.8 1.6 6.4 6.4 4.8 9.6s-6.4 6.4-9.6 4.8l-112-40z"
      fill="#2F4BFF"
    />
    <path
      d="M553.6 305.6C611.2 240 640 171.2 640 80c0-9.6 6.4-16 16-16s16 6.4 16 16c0 100.8-33.6 177.6-97.6 249.6 62.4 70.4 89.6 126.4 89.6 198.4 0 68.8-25.6 123.2-80 185.6C641.6 776 672 848 672 944c0 9.6-6.4 16-16 16s-16-6.4-16-16c0-86.4-25.6-150.4-78.4-208-12.8 12.8-27.2 27.2-43.2 41.6-4.8 4.8-51.2 46.4-64 57.6-22.4 20.8-36.8 36.8-48 52.8-16 20.8-22.4 38.4-22.4 56 0 9.6-6.4 16-16 16s-16-6.4-16-16c0-25.6 9.6-49.6 28.8-75.2 12.8-17.6 28.8-35.2 52.8-56 12.8-11.2 59.2-54.4 64-57.6 16-14.4 28.8-27.2 41.6-40-11.2-11.2-24-20.8-36.8-32-12.8-9.6-89.6-64-107.2-80-28.8-24-43.2-48-43.2-75.2 0-19.2 8-38.4 22.4-56 12.8-16 28.8-32 56-54.4 6.4-6.4 32-25.6 35.2-28.8 14.4-11.2 25.6-20.8 36.8-30.4 11.2-9.6 20.8-19.2 30.4-28.8l-35.2-35.2c-1.6-1.6-33.6-33.6-43.2-41.6-16-16-28.8-28.8-40-41.6-41.6-48-62.4-88-62.4-131.2 0-9.6 6.4-16 16-16s16 6.4 16 16c0 33.6 17.6 67.2 54.4 108.8 11.2 12.8 22.4 24 38.4 40 9.6 9.6 40 40 43.2 41.6 11.2 12.8 22.4 24 33.6 35.2z m6.4 385.6c48-56 72-104 72-163.2 0-60.8-24-112-78.4-174.4-9.6 9.6-19.2 19.2-30.4 28.8 11.2-9.6-105.6 88-123.2 108.8-11.2 12.8-16 25.6-16 36.8 0 16 9.6 32 32 51.2 16 14.4 91.2 67.2 105.6 78.4 14.4 11.2 27.2 20.8 38.4 33.6z"
      fill="#050D42"
    />
  </svg>
);

const BookClosedIcon = ({ className = '' } = {}) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 64 64"
    className={className || 'h-6 w-6'}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path
      fill="#F9EBB2"
      d="M56,62H10c-2.209,0-4-1.791-4-4s1.791-4,4-4h46V62z"
    />
    <path
      fill="#45AAB8"
      d="M6,4v49.537C7.062,52.584,8.461,52,10,52h2V2H8C6.896,2,6,2.896,6,4z"
    />
    <path fill="#45AAB8" d="M56,2H14v50h42h2v-2V4C58,2.896,57.104,2,56,2z" />
    <path
      fill="currentColor"
      d="M60,52V4c0-2.211-1.789-4-4-4H8C5.789,0,4,1.789,4,4v54c0,3.313,2.687,6,6,6h49c0.553,0,1-0.447,1-1 s-0.447-1-1-1h-1v-8C59.104,54,60,53.104,60,52z M6,4c0-1.104,0.896-2,2-2h4v50h-2c-1.539,0-2.938,0.584-4,1.537V4z M56,62H10 c-2.209,0-4-1.791-4-4s1.791-4,4-4h46V62z M56,52H14V2h42c1.104,0,2,0.896,2,2v46v2H56z"
    />
    <path
      fill="currentColor"
      d="M43,26H23c-0.553,0-1,0.447-1,1s0.447,1,1,1h20c0.553,0,1-0.447,1-1S43.553,26,43,26z"
    />
    <path
      fill="currentColor"
      d="M49,20H23c-0.553,0-1,0.447-1,1s0.447,1,1,1h26c0.553,0,1-0.447,1-1S49.553,20,49,20z"
    />
    <path
      fill="currentColor"
      d="M23,16h12c0.553,0,1-0.447,1-1s-0.447-1-1-1H23c-0.553,0-1,0.447-1,1S22.447,16,23,16z"
    />
  </svg>
);

const ParthenonIcon = ({ className = '' } = {}) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 1024 1024"
    className={className || 'h-6 w-6'}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path d="M261.2 745.8h501.7V794H261.2z" fill="#E0E7EA" />
    <path
      d="M774.9 380.5c0-4.4 3.6-8 8-8s8 3.6 8 8V422c0 4.4-3.6 8-8 8H241.1c-4.4 0-8-3.6-8-8v-41.4c0-4.4 3.6-8 8-8s8 3.6 8 8V414h525.8v-33.5zM249.1 733.7v10.5c0 4.4-3.6 8-8 8s-8-3.6-8-8v-18.5c0-4.4 3.6-8 8-8h541.8c4.4 0 8 3.6 8 8v22.7c0 4.4-3.6 8-8 8s-8-3.6-8-8v-14.7H249.1zM722.2 777.8c-4.4 0-8-3.6-8-8s3.6-8 8-8H813c4.4 0 8 3.6 8 8v45.4c0 4.4-3.6 8-8 8H211c-4.4 0-8-3.6-8-8v-45.4c0-4.4 3.6-8 8-8h403.4c4.4 0 8 3.6 8 8s-3.6 8-8 8H219v29.4h586v-29.4h-82.8z m-66.6 0c-4.4 0-8-3.6-8-8s3.6-8 8-8h23.1c4.4 0 8 3.6 8 8s-3.6 8-8 8h-23.1z"
      fill="currentColor"
    />
    <path
      d="M349.3 304l162-88 296.3 160.9h-78L511.3 258.7 295.4 376.9H215l105.5-57.3"
      fill="#E0E7EA"
    />
    <path
      d="M511.3 225.1L353.1 311c-3.9 2.1-8.7 0.7-10.8-3.2-2.1-3.9-0.7-8.7 3.2-10.8l162-88c2.4-1.3 5.3-1.3 7.6 0l296.3 160.9c7.3 4 4.5 15-3.8 15H215c-8.3 0-11.1-11.1-3.8-15l105.5-57.3c3.9-2.1 8.7-0.7 10.8 3.2 2.1 3.9 0.7 8.7-3.2 10.8l-77.8 42.2h529.6L511.3 225.1z"
      fill="currentColor"
    />
    <path
      d="M512.2 321.7m-31.8 0a31.8 31.8 0 1 0 63.6 0 31.8 31.8 0 1 0-63.6 0Z"
      fill="#FFC200"
    />
    <path
      d="M357.5 484v222.5h-50.2V469.7h50.2M536.1 484v222.5h-50.2V469.7h50.2M716.7 484v222.5h-50.2V469.7h50.2"
      fill="#FF684C"
    />
    <path
      d="M728.8 523.1c0-4.4 3.6-8 8-8s8 3.6 8 8v202.5c0 4.4-3.6 8-8 8h-90.3c-4.4 0-8-3.6-8-8V456.8c0-4.4 3.6-8 8-8s8 3.6 8 8v260.8h74.3V523.1z m0-66.3c0-4.4 3.6-8 8-8s8 3.6 8 8v23.6c0 4.4-3.6 8-8 8s-8-3.6-8-8v-23.6z"
      fill="currentColor"
    />
  </svg>
);

const CustomBriefcaseIcon = ({ className = '' } = {}) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 -1.5 1027 1027"
    className={className || 'h-6 w-6'}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path
      d="M47.273865 685.070423h931.856025v302.071987c0 12.018779-9.615023 20.832551-20.83255 20.832551H68.907668c-12.018779 0-20.832551-9.615023-20.832551-20.832551l-0.801252-302.071987z"
      fill="#B08A77"
    />
    <path
      d="M958.29734 1024H68.106416c-20.832551 0-36.85759-16.826291-36.85759-36.85759V669.045383h963.906104v318.097027c0.801252 20.832551-16.025039 36.85759-36.85759 36.85759zM63.298905 701.095462v286.046948c0 3.205008 2.403756 4.807512 4.807511 4.807512h890.190924c3.205008 0 4.807512-2.403756 4.807511-4.807512V701.095462H63.298905z"
      fill="currentColor"
    />
    <path
      d="M38.460094 241.978091h949.483568c12.820031 0 22.435055 10.416275 22.435055 22.435055v398.222222c0 12.820031-10.416275 22.435055-22.435055 22.435055H38.460094c-12.820031 0-22.435055-10.416275-22.435055-22.435055V264.413146c0-12.820031 10.416275-22.435055 22.435055-22.435055z"
      fill="#B08A77"
    />
    <path
      d="M342.935837 16.025039h341.333334c12.018779 0 21.633803 9.615023 21.633802 21.633803v204.319249h-384.600939V37.658842c0-12.018779 9.615023-21.633803 21.633803-21.633803z"
      fill="#B08A77"
    />
    <path
      d="M384.600939 74.516432h258.00313v166.660407H384.600939z"
      fill="#FFE6A4"
    />
  </svg>
);

const HouseIcon = ({ className = '' } = {}) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    className={className || 'h-5 w-5'}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path
      d="M16 27C15.7348 27 15.4804 26.8946 15.2929 26.7071C15.1054 26.5196 15 26.2652 15 26V23C15 22.7348 15.1054 22.4804 15.2929 22.2929C15.4804 22.1054 15.7348 22 16 22C16.2652 22 16.5196 22.1054 16.7071 22.2929C16.8946 22.4804 17 22.7348 17 23V26C17 26.2652 16.8946 26.5196 16.7071 26.7071C16.5196 26.8946 16.2652 27 16 27Z"
      fill="#263238"
    />
    <path
      d="M27 13C27 15.9174 25.8411 18.7153 23.7782 20.7782C21.7153 22.8411 18.9174 24 16 24C15.0893 23.9998 14.1823 23.8856 13.3 23.66C12.5276 23.4641 11.7796 23.1824 11.07 22.82C9.24766 21.9063 7.71506 20.5043 6.64322 18.7703C5.57138 17.0363 5.00248 15.0385 5 13C5 12.87 5 12.73 5 12.6C5.03746 11.7183 5.18528 10.8449 5.44 9.99998C6.17929 7.4644 7.8062 5.27947 10.0235 3.84441C12.2407 2.40935 14.9003 1.81997 17.5163 2.18397C20.1322 2.54797 22.5299 3.84105 24.2712 5.82692C26.0124 7.8128 26.981 10.3589 27 13Z"
      fill="#0277BD"
    />
    <path
      d="M22.93 28.63L21.73 25.63C21.6559 25.4439 21.5276 25.2844 21.3618 25.1721C21.196 25.0598 21.0003 24.9998 20.8 25H11.2C10.9997 24.9998 10.804 25.0598 10.6382 25.1721C10.4724 25.2844 10.3441 25.4439 10.27 25.63L9.06999 28.63C9.00954 28.7818 8.9872 28.9461 9.00492 29.1085C9.02265 29.2709 9.07989 29.4265 9.17165 29.5616C9.26341 29.6968 9.38689 29.8075 9.53129 29.8839C9.67569 29.9603 9.83662 30.0002 9.99999 30H22C22.1634 30.0002 22.3243 29.9603 22.4687 29.8839C22.6131 29.8075 22.7366 29.6968 22.8283 29.5616C22.9201 29.4265 22.9773 29.2709 22.9951 29.1085C23.0128 28.9461 22.9904 28.7818 22.93 28.63Z"
      fill="#263238"
    />
    <path
      d="M12.84 21.55C12.7633 21.6621 12.6647 21.7574 12.55 21.83L11.07 22.83C9.24615 21.9156 7.71254 20.512 6.6406 18.7761C5.56865 17.0401 5.00062 15.0403 5 13C5 12.87 5 12.73 5 12.6C5.03746 11.7184 5.18528 10.8449 5.44 10C6.81089 9.18658 8.26187 8.51638 9.77 8.00004C10.222 7.81354 10.7101 7.73108 11.1982 7.75877C11.6864 7.78647 12.162 7.92361 12.59 8.16004C14.03 9.22004 13.91 11.86 12.84 13.51C12.496 14.036 12.0507 14.4881 11.53 14.84C12.4853 15.08 13.3185 15.6639 13.87 16.48C14.57 17.76 14.23 19.4 12.84 21.55Z"
      fill="#7CB342"
    />
    <path
      d="M27 13C26.9993 14.643 26.6338 16.2654 25.93 17.75L25 17.67L24.77 17.62C22.43 16.84 19.94 15 19.69 13C19.43 10.81 20.47 8.14002 24.16 7.18002C24.3338 7.13514 24.5162 7.13514 24.69 7.18002L25.47 7.41002C26.4705 9.10309 26.9989 11.0334 27 13Z"
      fill="#558B2F"
    />
  </svg>
);

const StudentIcon = ({ className = '' } = {}) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 64 64"
    className={className || 'h-5 w-5'}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <circle cx="32" cy="16" r="14" fill="#FFD93B" />
    <path
      d="M32 2C23.163 2 16 9.163 16 18c0 8.837 7.163 16 16 16s16-7.163 16-16C48 9.163 40.837 2 32 2zm0 30c-7.732 0-14-6.268-14-14S24.268 4 32 4s14 6.268 14 14-6.268 14-14 14z"
      fill="currentColor"
    />
    <path
      d="M56 62H8c-2.209 0-4-1.791-4-4V38c0-8.837 7.163-16 16-16h24c8.837 0 16 7.163 16 16v20c0 2.209-1.791 4-4 4z"
      fill="#6FAAFF"
    />
    <path
      d="M56 64H8c-3.314 0-6-2.686-6-6V38c0-9.925 8.075-18 18-18h24c9.925 0 18 8.075 18 18v20c0 3.314-2.686 6-6 6zM20 24c-7.72 0-14 6.28-14 14v20c0 1.104.896 2 2 2h48c1.104 0 2-.896 2-2V38c0-7.72-6.28-14-14-14H20z"
      fill="currentColor"
    />
  </svg>
);

const ChartPieIcon = ({ className = '' } = {}) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 64 64"
    className={className || 'h-5 w-5'}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path d="M32 2v30l20-10C46.8 11.2 40.2 4.6 32 2z" fill="#4CAF50" />
    <path
      d="M52 22L32 32l15 25.9C56.5 52.5 62 43.1 62 32c0-3.7-.6-7.2-1.7-10.5L52 22z"
      fill="#2196F3"
    />
    <path
      d="M47 57.9L32 32 2 32c0 16.5 13.5 30 30 30 5.6 0 10.8-1.5 15.3-4.1L47 57.9z"
      fill="#FF9800"
    />
    <circle
      cx="32"
      cy="32"
      r="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
    />
  </svg>
);

const MathIcon = ({ className = '' } = {}) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 -0.93 79.957 79.957"
    className={className || 'h-5 w-5'}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path
      d="M76.957 42.119a1.927 1.927 0 0 1-1.923 1.926H41.863a1.929 1.929 0 0 1-1.922-1.926v-30.64a1.933 1.933 0 0 1 1.922-1.927h33.171a1.93 1.93 0 0 1 1.923 1.927z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M65.633 30.66l-4.663-4.667 4.171-4.173a.482.482 0 0 0 0-.68l-1.3-1.3a.48.48 0 0 0-.68 0l-4.171 4.173-4.17-4.173a.494.494 0 0 0-.685 0l-1.3 1.3a.484.484 0 0 0 0 .678l4.171 4.175-4.664 4.665a.479.479 0 0 0 .005.675l1.3 1.3a.487.487 0 0 0 .681 0l4.664-4.664 4.667 4.664a.479.479 0 0 0 .68 0l1.3-1.3a.484.484 0 0 0-.006-.673z"
      fill="currentColor"
    />
    <path
      d="M34.014 42.119a1.929 1.929 0 0 1-1.923 1.926H-.079a1.926 1.926 0 0 1-1.922-1.926v-30.64a1.929 1.929 0 0 1 1.922-1.927h33.17a1.933 1.933 0 0 1 1.923 1.927z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M23.514 26.374a.484.484 0 0 1-.485.481h-15.3a.481.481 0 0 1-.476-.481v-1.844a.481.481 0 0 1 .476-.481h15.3a.484.484 0 0 1 .485.481z"
      fill="currentColor"
    />
    <path
      d="M23.034 66.374h-5.893v-5.9a.484.484 0 0 0-.481-.478h-1.845a.482.482 0 0 0-.481.478v5.9h-6.6a.481.481 0 0 0-.476.478v1.844a.479.479 0 0 0 .476.481h6.6v6.6a.48.48 0 0 0 .481.48h1.845a.482.482 0 0 0 .481-.48v-6.6h5.893a.482.482 0 0 0 .485-.481v-1.844a.484.484 0 0 0-.485-.478z"
      fill="currentColor"
    />
  </svg>
);

const CorrectIcon = ({ className = '' } = {}) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 117 117"
    className={className || 'h-5 w-5'}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path
      d="M34.5 55.1c-1.6-1.6-4.2-1.6-5.8 0s-1.6 4.2 0 5.8l18.9 18.9c.8.8 1.8 1.2 2.9 1.2h.2c1.1-.1 2.2-.6 3-1.5l47.3-56.7c1.4-1.7 1.2-4.3-.5-5.8s-4.3-1.2-5.8.5L50.2 70.8 34.5 55.1z"
      fill="#17AB13"
    />
    <path
      d="M89.1 9.3C66.1-5.1 36.6-1.7 17.4 17.5c-22.6 22.6-22.6 59.5 0 82.1 11.3 11.3 26.2 17 41 17s29.7-5.7 41-17c19.3-19.3 22.6-48.9 8.1-71.9-1.2-1.9-3.7-2.5-5.6-1.3s-2.5 3.7-1.3 5.6c12.5 19.8 9.6 45.2-7 61.8-19.4 19.4-51.1 19.4-70.5 0s-19.4-51.1 0-70.5C39.7 6.8 65 3.9 84.8 16.2c1.9 1.2 4.4.6 5.6-1.3s.6-4.4-1.3-5.6z"
      fill="currentColor"
    />
  </svg>
);

if (typeof window !== 'undefined') {
  window.CorrectIcon = CorrectIcon;
}

const WrongIcon = ({ className = '' } = {}) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 200 200"
    className={className || 'h-5 w-5'}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path d="M114 100l49-49a9.9 9.9 0 0 0-14-14L100 86 51 37A9.9 9.9 0 0 0 37 51l49 49-49 49a9.9 9.9 0 0 0 14 14l49-49 49 49a9.9 9.9 0 0 0 14-14z" />
  </svg>
);

if (typeof window !== 'undefined') {
  window.WrongIcon = WrongIcon;
}

const PencilIcon = ({ className = '' } = {}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className || 'h-5 w-5'}
  >
    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
  </svg>
);

if (typeof window !== 'undefined') {
  window.PencilIcon = PencilIcon;
}

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

if (typeof window !== 'undefined') {
  window.UserIcon = UserIcon;
}

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

if (typeof window !== 'undefined') {
  window.ArrowLeftIcon = ArrowLeftIcon;
}

// --- SubjectQuizBrowser (clustered UI) ---
function SubjectQuizBrowser({ subjectName, onSelectQuiz, theme = 'light' }) {
  const isDarkMode = theme === 'dark';
  // Ensure premade catalog exists even if initial build was early/empty
  try {
    const cat =
      typeof window !== 'undefined' && window.PREMADE_QUIZ_CATALOG
        ? window.PREMADE_QUIZ_CATALOG
        : {};
    if (!cat || (typeof cat === 'object' && Object.keys(cat).length === 0)) {
      if (
        typeof window !== 'undefined' &&
        typeof window.initPremades === 'function'
      ) {
        window.initPremades();
      }
    }
  } catch {}
  const library =
    (typeof window !== 'undefined' ? window.QUIZ_LIBRARY : QUIZ_LIBRARY) || {};
  const subjectColors = SUBJECT_COLORS[subjectName] || DEFAULT_COLOR_SCHEME;
  const clusters = library?.[subjectName]?.clusters || [];
  const [activeClusterId, setActiveClusterId] = React.useState(
    clusters.length ? clusters[0].id : null
  );
  // New: tabbed layers and filtering
  const [activeTab, setActiveTab] = React.useState('core'); // 'core' | 'levels' | 'special'
  const [filters, setFilters] = React.useState({
    status: 'All',
    sort: 'Newest',
  });
  const storageKey = `quizBrowserExpanded:${sanitizeCodeSegment(subjectName)}`;
  const [expandedGroups, setExpandedGroups] = React.useState(() => {
    try {
      const raw = window.localStorage?.getItem(storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const persistExpanded = (next) => {
    setExpandedGroups(next);
    try {
      window.localStorage?.setItem(storageKey, JSON.stringify(next));
    } catch {}
  };

  React.useEffect(() => {
    // Reset active cluster if subject changes
    setActiveClusterId(clusters.length ? clusters[0].id : null);
    setActiveTab('core');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectName]);

  // track quiz progress per subject
  const progressKey = `quizBrowserProgress:${sanitizeCodeSegment(subjectName)}`;
  const [progress, setProgress] = React.useState(() => {
    try {
      const raw = window.localStorage?.getItem(progressKey);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // global helper for the quiz runner to call when a quiz is finished
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.recordQuizResult = (quizId, scorePct) => {
        const passed = typeof scorePct === 'number' && scorePct >= 70;
        setProgress((prev) => {
          const next = {
            ...prev,
            [quizId]: {
              status: passed ? 'passed' : 'completed',
              score: scorePct ?? null,
              updatedAt: Date.now(),
            },
          };
          try {
            window.localStorage?.setItem(progressKey, JSON.stringify(next));
          } catch {}
          return next;
        });
      };
    }
  }, [progressKey]);

  // Derivers: topic access, tagging, filters, sorting
  const allTopics = React.useMemo(() => {
    const list = [];
    clusters.forEach((c) => {
      (c.topicIds || []).forEach((tid) => {
        const t = getTopicById(subjectName, tid);
        if (t) list.push({ topic: t, clusterId: c.id, clusterLabel: c.label });
      });
    });
    return list;
  }, [clusters, subjectName]);

  const deriveLevel = (t) => {
    const title = (t.title || '').toLowerCase();
    if (/basic|foundation|intro|beginners?/.test(title)) return 'Beginner';
    if (/advanced|challenge|honors/.test(title)) return 'Advanced';
    return 'Intermediate';
  };
  const hasImage = (t) =>
    Array.isArray(t.questions) && t.questions.some((q) => q?.type === 'image');
  const isTimed = (t) =>
    (t.config && typeof t.config.totalTime === 'number') || false;
  const hasPassage = (t) =>
    Array.isArray(t.questions) &&
    t.questions.some((q) => q?.type === 'text' && q?.passage);

  // minimal client-side attempt store (fallback)
  const getAttemptMeta = (topicOrQuizCode) => {
    try {
      const raw = window.localStorage?.getItem('attemptIndex');
      const idx = raw ? JSON.parse(raw) : {};
      const rec = idx[topicOrQuizCode];
      return (
        rec || {
          attempts: 0,
          best: null,
          lastAt: null,
          status: 'Not Attempted',
        }
      );
    } catch {
      return { attempts: 0, best: null, lastAt: null, status: 'Not Attempted' };
    }
  };

  // helpers: truncation and summaries
  const truncate = (text, max = 100) => {
    if (!text) return '';
    const clean = String(text).trim();
    if (clean.length <= max) return clean;
    return clean.slice(0, Math.max(0, max - 1)).trim() + '…';
  };
  const topicOneLiner = (topic) => {
    const fromTopic = topic?.description?.trim();
    const fromQuiz =
      Array.isArray(topic?.quizzes) &&
      topic.quizzes.find((q) => q && q.description)?.description;
    const line =
      fromTopic ||
      fromQuiz ||
      'A short practice set covering key concepts in this topic.';
    return truncate(line, 100);
  };
  const quizOneLiner = (quiz, topic) => {
    const line =
      (quiz && quiz.description) ||
      (topic && topic.description) ||
      'A short practice set covering key concepts in this topic.';
    return truncate(line, 100);
  };
  const levelScore = (lvl) =>
    lvl === 'Beginner' ? 1 : lvl === 'Advanced' ? 3 : 2;
  const summarizeDifficulty = (items) => {
    if (!Array.isArray(items) || items.length === 0) return 'Varied';
    const avg =
      items.reduce(
        (sum, it) => sum + levelScore(deriveLevel(it.topic || it)),
        0
      ) / items.length;
    if (avg < 1.5) return 'Mostly Beginner';
    if (avg < 2.5) return 'Mostly Intermediate';
    return 'Mostly Advanced';
  };
  const sectionSummaryForKey = (groupKey, title) => {
    if (groupKey.startsWith('levels-beginner'))
      return 'Start here to build solid foundations with approachable practice sets.';
    if (groupKey.startsWith('levels-intermediate'))
      return 'Strengthen your skills with mid-level problems and mixed question types.';
    if (groupKey.startsWith('levels-advanced'))
      return 'Challenge yourself with multi-step questions and deeper reasoning.';
    if (groupKey.startsWith('special-timed'))
      return 'Build test stamina with timed sets that simulate real exam pacing.';
    if (groupKey.startsWith('special-image'))
      return 'Practice interpreting diagrams, charts, and other visual information.';
    if (groupKey.startsWith('special-passage'))
      return 'Read passages closely and answer evidence-based questions effectively.';
    // Fallback for cluster/core sections
    return `Practice key concepts in ${title || 'this section'}.`;
  };

  const filterByControls = (items) => {
    const { status } = filters;
    let out = items;
    if (status !== 'All') {
      out = out.filter(({ topic }) => {
        const code = topic.quizCode || topic.id || topic.title;
        return getAttemptMeta(code).status === status;
      });
    }
    return out;
  };

  const sortItems = (items) => {
    switch (filters.sort) {
      case 'Highest Score':
        return [...items].sort(
          (a, b) =>
            (getAttemptMeta(b.topic.quizCode || b.topic.id || '').best ?? -1) -
            (getAttemptMeta(a.topic.quizCode || a.topic.id || '').best ?? -1)
        );
      case 'Most Attempted':
        return [...items].sort(
          (a, b) =>
            getAttemptMeta(b.topic.quizCode || b.topic.id || '').attempts -
            getAttemptMeta(a.topic.quizCode || a.topic.id || '').attempts
        );
      case 'Topic A–Z':
        return [...items].sort((a, b) =>
          (a.topic.title || '').localeCompare(b.topic.title || '')
        );
      case 'Newest':
      default:
        return items; // preserve author order
    }
  };

  if (!clusters.length) {
    return (
      <div
        className="rounded-lg border p-4 text-sm"
        style={{
          borderColor: subjectColors.border || 'rgba(148,163,184,0.35)',
        }}
      >
        No premade clusters yet for this subject.
      </div>
    );
  }

  const active = clusters.find((c) => c.id === activeClusterId) || clusters[0];

  const buttonStyle = {
    backgroundColor: subjectColors.accent || DEFAULT_COLOR_SCHEME.accent,
    color: subjectColors.accentText || '#ffffff',
    borderColor:
      subjectColors.border ||
      subjectColors.accent ||
      DEFAULT_COLOR_SCHEME.accent,
  };

  const lightCardBackground =
    SUBJECT_LIGHT_SURFACE_GRADIENTS[subjectName] ||
    'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(148,163,184,0.12))';
  const cardTextColor =
    subjectColors.text || subjectColors.heroText || '#0f172a';

  const renderTopicCard = (topic, idx) => {
    if (!topic) return null;
    const quizSets = Array.isArray(topic.quizzes)
      ? topic.quizzes.filter((quiz) =>
          quizHasAvailableQuestions(subjectName, topic, quiz)
        )
      : [];
    const supportsMultiple =
      quizSets.length > 0 &&
      !['essay', 'simulation', 'graphing_tool', 'geometry_tool'].includes(
        topic.type
      );

    const launchQuizSet = (quiz, index, displayNameOverride) => {
      if (typeof onSelectQuiz !== 'function' || !quiz) return;
      const quizLabel =
        displayNameOverride ||
        quiz.label ||
        `Quiz ${String.fromCharCode(65 + index)}`;
      const baseTitle = topic.title || 'Quiz';
      // Better title handling: humanize auto IDs and retitle Math sets using canonical category
      const looksAutoId = (s) => {
        if (!s) return true;
        const t = String(s);
        return /(^|\b)(math|rla)_/i.test(t) || t.includes('_');
      };
      const humanizeQuizId = (id) => {
        if (!id) return '';
        let t = String(id).replace(/^(math|rla)_/i, '');
        t = t.replace(/[_-]+/g, ' ').trim();
        t = t.replace(/\b(set|quiz)\s*(\d+|[A-Z])\b/gi, (m) => m.toUpperCase());
        return t.replace(
          /\w\S*/g,
          (w) => w.charAt(0).toUpperCase() + w.slice(1)
        );
      };
      const getCategoryOfTopic = (subj, topicId) => {
        try {
          const sourceApp =
            typeof window !== 'undefined' && window.AppData
              ? window.AppData
              : AppData;
          const subject = sourceApp?.[subj];
          if (!subject || !subject.categories) return null;
          for (const [catName, cat] of Object.entries(subject.categories)) {
            const topics = Array.isArray(cat?.topics) ? cat.topics : [];
            if (topics.some((t) => t && t.id === topicId)) return catName;
          }
        } catch {}
        return null;
      };
      const canonicalizeCategoryNameLocal = (subj, name) => {
        try {
          return typeof window !== 'undefined' &&
            typeof window.canonicalizeCategoryName === 'function'
            ? window.canonicalizeCategoryName(subj, name)
            : name;
        } catch {
          return name;
        }
      };
      const deriveMathShortTopic = (title, canonCat) => {
        const raw = String(title || '').trim();
        if (!raw) return 'Practice';
        let base = raw;
        if (canonCat && base.toLowerCase().startsWith(canonCat.toLowerCase())) {
          base = base.slice(canonCat.length).trim();
        }
        if (
          base.startsWith(':') ||
          base.startsWith('–') ||
          base.startsWith('-')
        )
          base = base.slice(1).trim();
        base = base
          .replace(
            /\b(quiz|set|practice)\b\s*[#:.-]?\s*[a-z0-9ivxlcm]+\s*$/i,
            ''
          )
          .trim();
        if (!base) return 'Practice';
        return base;
      };
      let derivedTitle = quiz.title || `${baseTitle} – ${quizLabel}`;
      if (looksAutoId(derivedTitle)) {
        if (String(subjectName).toLowerCase() === 'math') {
          const catRaw = getCategoryOfTopic(subjectName, topic.id);
          const canonCat = canonicalizeCategoryNameLocal(
            subjectName,
            catRaw || 'Math'
          );
          const shortTopic = deriveMathShortTopic(baseTitle, canonCat);
          const setNum = (() => {
            const m = String(quiz.label || '').match(/([A-Z])$/);
            if (m) return m[1].charCodeAt(0) - 64;
            const n = String(quiz.quizId || '').match(/(\d+)/);
            if (n) return parseInt(n[1], 10);
            return index + 1;
          })();
          derivedTitle = `${canonCat}: ${shortTopic} (Set ${setNum})`;
        } else {
          derivedTitle = humanizeQuizId(quiz.quizId || derivedTitle);
        }
      }
      const resolvedQuestions = resolveQuizQuestions(
        subjectName,
        topic,
        quiz
      ).map((q, qi) => {
        if (q && typeof q === 'object') {
          const nextNumber = q.questionNumber ?? qi + 1;
          return { ...q, questionNumber: nextNumber };
        }
        return q;
      });
      if (!resolvedQuestions.length) {
        alert(
          'This quiz does not have any questions yet. Please try another set.'
        );
        return;
      }
      const prepared = {
        ...quiz,
        id:
          quiz.quizId ||
          quiz.quizCode ||
          `${topic.id || 'topic'}__set_${index}`,
        quizCode:
          quiz.quizCode ||
          `${sanitizeCodeSegment(
            subjectName,
            'subject'
          )}__${sanitizeCodeSegment(topic.id || topic.title || 'topic')}__set-${
            index + 1
          }`,
        title: derivedTitle,
        topicId: topic.id,
        topicTitle: topic.title || baseTitle,
        canonicalTopicTitle: topic.title || baseTitle,
        description: quiz.description || topic.description,
        type: quiz.type || topic.type || 'quiz',
        questions: resolvedQuestions,
      };
      const sourceTopic = quiz.questionSourceTopicId
        ? getTopicById(subjectName, quiz.questionSourceTopicId)
        : null;
      const articleSource =
        quiz.article || topic.article || (sourceTopic && sourceTopic.article);
      const articleClone = cloneArticle(articleSource);
      if (articleClone) prepared.article = articleClone;
      const resolvedImageUrl =
        quiz.imageUrl ||
        topic.imageUrl ||
        (sourceTopic && sourceTopic.imageUrl) ||
        (articleClone && articleClone.imageUrl);
      if (!prepared.imageUrl && resolvedImageUrl)
        prepared.imageUrl = resolvedImageUrl;
      onSelectQuiz(prepared, subjectName);
    };

    return (
      <div
        key={topic.id || `topic_${idx}`}
        className="rounded-xl border bg-white/95 dark:bg-slate-900/80 dark:border-slate-700 p-4 flex flex-col justify-between shadow-md"
        style={
          isDarkMode
            ? {
                borderColor: subjectColors.border || 'rgba(148,163,184,0.35)',
                color: subjectColors.text || '#f8fafc',
              }
            : {
                borderColor: subjectColors.border || 'rgba(148,163,184,0.35)',
                backgroundColor: '#ffffff',
                backgroundImage: lightCardBackground,
                color: cardTextColor,
              }
        }
      >
        <div className="fade-in">
          <h3
            className="text-lg font-bold"
            style={
              isDarkMode
                ? { color: subjectColors.text || '#f8fafc' }
                : { color: cardTextColor }
            }
          >
            {topic.title}
          </h3>
          <p
            className="mt-2"
            title={topicOneLiner(topic)}
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.4,
              opacity: 0.85,
              fontWeight: 500,
              color: isDarkMode
                ? 'var(--text-tertiary, rgba(226,232,240,0.78))'
                : 'var(--subtext-color, rgba(15,23,42,0.66))',
            }}
          >
            {topicOneLiner(topic)}
          </p>
        </div>
        {supportsMultiple ? (
          (() => {
            const sorted = sortVariantsStable(quizSets);
            const list = sorted.map((q, i) => ({
              quiz: q,
              name: getVariantDisplayName(subjectName, topic.title, i),
            }));
            const expKey = `topic-variants:${sanitizeCodeSegment(
              subjectName
            )}:${topic.id || sanitizeCodeSegment(topic.title || 'topic')}`;
            const expanded = !!expandedGroups[expKey];
            const shown = expanded ? list : list.slice(0, 3);
            return (
              <div className="mt-3 grid gap-2">
                {shown.map(({ quiz, name }, idx) => (
                  <button
                    key={quiz.quizId || `${topic.id || 'topic'}_quiz_${idx}`}
                    onClick={() => launchQuizSet(quiz, idx, name)}
                    className="w-full px-3 py-2 rounded-lg font-semibold shadow-sm transition hover:opacity-95"
                    title={quizOneLiner(quiz, topic)}
                    style={buttonStyle}
                  >
                    Start {name}
                  </button>
                ))}
                {list.length > shown.length && (
                  <button
                    type="button"
                    className="text-sm underline justify-self-start"
                    aria-expanded={expanded}
                    onClick={() => {
                      const next = { ...expandedGroups, [expKey]: !expanded };
                      persistExpanded(next);
                    }}
                  >
                    {expanded ? 'Show fewer' : 'More in this topic…'}
                  </button>
                )}
              </div>
            );
          })()
        ) : (
          <button
            onClick={() => {
              if (typeof onSelectQuiz !== 'function') return;
              const articleClone = cloneArticle(topic.article);
              const prepared = {
                ...topic,
                id:
                  topic.quizCode ||
                  topic.id ||
                  sanitizeCodeSegment(topic.title || 'quiz'),
                quizCode:
                  topic.quizCode ||
                  `${sanitizeCodeSegment(
                    subjectName,
                    'subject'
                  )}__${sanitizeCodeSegment(
                    topic.id || topic.title || 'topic'
                  )}`,
              };
              if (articleClone) prepared.article = articleClone;
              if (Array.isArray(topic.questions)) {
                prepared.questions = topic.questions.map((q, qi) => {
                  if (q && typeof q === 'object') {
                    const nextNumber = q.questionNumber ?? qi + 1;
                    return { ...q, questionNumber: nextNumber };
                  }
                  return q;
                });
              }
              onSelectQuiz(prepared, subjectName);
            }}
            className="w-full mt-3 px-3 py-2 rounded-lg font-semibold shadow-sm transition hover:opacity-95"
            style={buttonStyle}
          >
            Start Quiz
          </button>
        )}
      </div>
    );
  };

  // Build grouped/chunked stacks of 3 from flat topic list for categories with numbered quizzes
  const buildStackedSetsFromTopics = (topics) => {
    const list = Array.isArray(topics) ? topics : [];
    const groups = new Map();
    let sawVariantPattern = false;

    const push = (baseTitle, topic, topicKey) => {
      const key = String(baseTitle || '').toLowerCase();
      if (!groups.has(key)) groups.set(key, { baseTitle, topicKey, items: [] });
      groups.get(key).items.push(topic);
    };

    list.forEach((t) => {
      if (!t || typeof t !== 'object') return;
      const raw = String(t.title || t.id || '').trim();
      const [left, right] = splitOnDivider(raw);
      const looksVariant =
        (!!right && isVariantSuffix(right)) ||
        /\b(quiz|set)\b\s*[#:.-]?\s*[a-z0-9ivxlcm]+\s*$/i.test(raw);
      const base = deriveCanonicalTopicTitle(raw);
      if (looksVariant || base !== raw) sawVariantPattern = true;
      push(base || left || raw, t, t.id); // Pass topic.id as topicKey
    });

    // Create chunks of up to 3 in original order per base group
    const stackedSets = [];
    groups.forEach(({ baseTitle, topicKey, items }) => {
      for (let i = 0; i < items.length; i += 3) {
        const chunk = items.slice(i, i + 3);
        stackedSets.push({
          baseTitle,
          topicKey, // Store topicKey for bundle title lookup
          setIndex: Math.floor(i / 3) + 1,
          quizzes: chunk,
        });
      }
    });

    // Decide whether to use stacking or fall back: only use if we detected variant patterns
    const shouldUse = sawVariantPattern && stackedSets.length > 0;
    return { stackedSets, shouldUse };
  };

  // open a specific quiz inside the stacked set (index 0,1,2)
  const launchStackedSetAt = (stackedSet, quizIndex = 0) => {
    if (
      !stackedSet ||
      !Array.isArray(stackedSet.quizzes) ||
      !stackedSet.quizzes.length
    )
      return;

    const topicLike = stackedSet.quizzes[quizIndex] || stackedSet.quizzes[0];

    // some topics have sub-quizzes
    let quizLike = null;
    if (Array.isArray(topicLike.quizzes) && topicLike.quizzes.length) {
      quizLike =
        topicLike.quizzes.find((q) =>
          quizHasAvailableQuestions(subjectName, topicLike, q)
        ) || topicLike.quizzes[0];
    }

    const questions = resolveQuizQuestions(
      subjectName,
      topicLike,
      quizLike || topicLike
    );

    if (!Array.isArray(questions) || !questions.length) {
      alert('This quiz does not have questions yet. Try another.');
      return;
    }

    const baseId = stackedSet.baseTitle.toLowerCase().replace(/\s+/g, '_');
    const id = `${baseId}_set_${stackedSet.setIndex}_quiz_${quizIndex + 1}`;

    const preparedQuiz = {
      id,
      quizCode: id,
      title: `${stackedSet.baseTitle}: Set ${stackedSet.setIndex} – Quiz ${
        quizIndex + 1
      }`,
      topicTitle: stackedSet.baseTitle,
      description: topicLike.description || 'Practice set from this topic.',
      type: 'quiz',
      questions: questions.map((q, i) => {
        if (q && typeof q === 'object') return { ...q, questionNumber: i + 1 };
        return q;
      }),
    };

    if (typeof onSelectQuiz === 'function') {
      onSelectQuiz(preparedQuiz, subjectName);
    }
  };

  // main button = quiz 1
  const launchStackedSet = (stackedSet) => launchStackedSetAt(stackedSet, 0);

  const topicsForActive = Array.isArray(active?.topicIds)
    ? active.topicIds
        .map((tid) => getTopicById(subjectName, tid))
        .filter(Boolean)
    : [];

  // UI helpers
  const renderFilterBar = () => (
    <div className="flex flex-wrap gap-2 items-center py-2">
      <div className="flex items-center gap-1">
        <label className="text-sm opacity-80">Status</label>
        <select
          aria-label="Filter by status"
          className="px-2 py-1 rounded-md border text-sm"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          {['All', 'Not Attempted', 'Completed', 'Passed'].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-1 ml-auto">
        <label className="text-sm opacity-80">Sort</label>
        <select
          aria-label="Sort topics"
          className="px-2 py-1 rounded-md border text-sm"
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          {['Newest', 'Most Attempted', 'Highest Score', 'Topic A–Z'].map(
            (opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            )
          )}
        </select>
      </div>
    </div>
  );

  const renderCoreTab = () => {
    const topicsForActive = Array.isArray(active?.topicIds)
      ? active.topicIds
          .map((tid) => getTopicById(subjectName, tid))
          .filter(Boolean)
      : [];
    const filtered = sortItems(
      filterByControls(topicsForActive.map((t) => ({ topic: t })))
    ).map((x) => x.topic);

    // New: group and chunk into stacks of 3 where topics are numbered variants
    const { stackedSets, shouldUse } = buildStackedSetsFromTopics(filtered);

    const renderStackedCard = (set, idx) => {
      // build ids for quiz 1/2/3 for this set
      const baseId = set.baseTitle.toLowerCase().replace(/\s+/g, '_');
      const quiz1Id = `${baseId}_set_${set.setIndex}_quiz_1`;
      const quiz2Id = `${baseId}_set_${set.setIndex}_quiz_2`;
      const quiz3Id = `${baseId}_set_${set.setIndex}_quiz_3`;

      const quizCount = Array.isArray(set.quizzes) ? set.quizzes.length : 0;

      // check stored status
      const statusList = [
        progress[quiz1Id]?.status,
        progress[quiz2Id]?.status,
        progress[quiz3Id]?.status,
      ];
      const isPassed = statusList.includes('passed');
      const isCompleted = !isPassed && statusList.includes('completed');

      // existing styles
      const cardBaseStyle = isDarkMode
        ? {
            borderColor: subjectColors.border || 'rgba(148,163,184,0.35)',
            color: subjectColors.text || '#f8fafc',
          }
        : {
            borderColor: subjectColors.border || 'rgba(148,163,184,0.35)',
            backgroundImage: lightCardBackground,
            color: cardTextColor,
          };

      // add a tint when passed/completed
      const passedStyle = isPassed
        ? { backgroundColor: 'rgba(22,163,74,0.12)', borderColor: '#16a34a' }
        : isCompleted
        ? { backgroundColor: 'rgba(59,130,246,0.09)' }
        : {};

      return (
        <div
          key={`stack_${set.baseTitle}_${set.setIndex}_${idx}`}
          className="rounded-xl border p-4 flex flex-col justify-between shadow-md"
          style={{
            ...cardBaseStyle,
            ...passedStyle,
            backgroundColor: isDarkMode
              ? undefined
              : passedStyle.backgroundColor || '#ffffff',
          }}
        >
          <div className="fade-in">
            <h3
              className="text-lg font-bold"
              style={
                isDarkMode
                  ? { color: subjectColors.text || '#f8fafc' }
                  : { color: cardTextColor }
              }
            >
              {getCorePracticeBundleTitle(
                set.topicKey,
                set.setIndex - 1,
                `${set.baseTitle}: Set ${set.setIndex}`
              )}
            </h3>
            <p
              className="mt-2"
              title={
                set.quizzes?.[0]?.description ||
                '3 quizzes bundled from this topic.'
              }
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.4,
                opacity: 0.85,
                fontWeight: 500,
                color: isDarkMode
                  ? 'var(--text-tertiary, rgba(226,232,240,0.78))'
                  : 'var(--subtext-color, rgba(15,23,42,0.66))',
              }}
            >
              {set.quizzes?.[0]?.description ||
                '3 quizzes bundled from this topic.'}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2">
            {/* main button opens quiz 1 */}
            <button
              onClick={() => launchStackedSetAt(set, 0)}
              className="flex-1 px-3 py-2 rounded-lg font-semibold shadow-sm transition hover:opacity-95"
              style={buttonStyle}
            >
              Start Core Practice
            </button>

            {/* small buttons for quiz 2 and 3 */}
            {quizCount > 1 && (
              <button
                onClick={() => launchStackedSetAt(set, 1)}
                className="px-2 py-1 rounded-md text-sm font-semibold border transition hover:opacity-95"
                style={{
                  background: '#fff',
                  borderColor: 'rgba(148,163,184,0.35)',
                }}
                title="Open quiz 2 in this set"
              >
                2
              </button>
            )}
            {quizCount > 2 && (
              <button
                onClick={() => launchStackedSetAt(set, 2)}
                className="px-2 py-1 rounded-md text-sm font-semibold border transition hover:opacity-95"
                style={{
                  background: '#fff',
                  borderColor: 'rgba(148,163,184,0.35)',
                }}
                title="Open quiz 3 in this set"
              >
                3
              </button>
            )}
          </div>
        </div>
      );
    };
    return (
      <>
        <div
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
          role="tablist"
          aria-label="Category clusters"
        >
          {clusters.map((cluster) => {
            const selected = cluster.id === activeClusterId;
            return (
              <button
                key={cluster.id}
                type="button"
                onClick={() => setActiveClusterId(cluster.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full border text-sm font-semibold transition ${
                  selected ? 'shadow' : ''
                }`}
                style={
                  selected
                    ? {
                        backgroundColor: subjectColors.accent || '#0ea5e9',
                        color: subjectColors.accentText || '#ffffff',
                        borderColor: subjectColors.accent || '#0ea5e9',
                      }
                    : {
                        backgroundColor: isDarkMode
                          ? 'rgba(148,163,184,0.12)'
                          : '#ffffff',
                        color: subjectColors.text || '#0f172a',
                        borderColor:
                          subjectColors.border || 'rgba(148,163,184,0.35)',
                      }
                }
                aria-pressed={selected}
              >
                {cluster.label}
              </button>
            );
          })}
        </div>
        {(active?.description || active?.label) &&
          (() => {
            const coreInfoKey = `info:core:${subjectName}:${
              active?.id || 'cluster'
            }`;
            const coreInfoOpen = !!expandedGroups[coreInfoKey];
            const clusterItems = (
              Array.isArray(active?.topicIds) ? active.topicIds : []
            )
              .map((tid) => getTopicById(subjectName, tid))
              .filter(Boolean)
              .map((t) => ({ topic: t }));
            const clusterOverview =
              active?.description ||
              sectionSummaryForKey('core-cluster', active?.label);
            const clusterDifficulty = summarizeDifficulty(clusterItems);
            const clusterQuizCount = clusterItems.reduce((acc, it) => {
              const t = it.topic;
              if (Array.isArray(t?.quizzes) && t.quizzes.length)
                return acc + t.quizzes.length;
              return acc + 1;
            }, 0);
            return (
              <div className="fade-in">
                <div className="flex items-center gap-2">
                  <p
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.4,
                      opacity: 0.85,
                      fontWeight: 500,
                      color: isDarkMode
                        ? 'var(--text-tertiary, rgba(226,232,240,0.78))'
                        : 'var(--subtext-color, rgba(15,23,42,0.66))',
                    }}
                    title={clusterOverview}
                  >
                    {clusterOverview}
                  </p>
                  <button
                    type="button"
                    className="text-sky-600 dark:text-sky-400 underline-offset-2 text-sm"
                    aria-label={`Learn more about ${
                      active?.label || 'this cluster'
                    }`}
                    aria-expanded={coreInfoOpen}
                    onClick={() => {
                      const next = {
                        ...expandedGroups,
                        [coreInfoKey]: !coreInfoOpen,
                      };
                      persistExpanded(next);
                    }}
                  >
                    ℹ️
                  </button>
                </div>
                {coreInfoOpen && (
                  <div
                    className="mt-2 rounded-lg border px-3 py-2 text-sm"
                    style={{
                      borderColor:
                        subjectColors.border || 'rgba(148,163,184,0.35)',
                      background: isDarkMode
                        ? 'rgba(15,23,42,0.35)'
                        : 'rgba(241,245,249,0.5)',
                    }}
                  >
                    <p className="mb-1">{clusterOverview}</p>
                    <p className="mb-1">
                      <strong>Difficulty:</strong> {clusterDifficulty}
                    </p>
                    <p>
                      <strong>Quizzes in this section:</strong>{' '}
                      {clusterQuizCount}
                    </p>
                  </div>
                )}
              </div>
            );
          })()}
        {renderFilterBar()}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 && (
            <div
              className="col-span-full text-center text-sm opacity-80 border border-dashed rounded-lg p-4"
              style={{
                borderColor: subjectColors.border || 'rgba(148,163,184,0.35)',
              }}
            >
              No topics available yet for this cluster.
            </div>
          )}
          {shouldUse
            ? stackedSets.map((set, idx) => renderStackedCard(set, idx))
            : filtered.map((topic, idx) => renderTopicCard(topic, idx))}
        </div>
      </>
    );
  };

  const renderGroupSection = (title, items, groupKey) => {
    const key = `${activeTab}:${groupKey}`;
    const expanded = !!expandedGroups[key];
    const filtered = sortItems(filterByControls(items));
    const shown = expanded ? filtered : filtered.slice(0, 4);
    const infoKey = `info:${key}`;
    const showInfo = !!expandedGroups[infoKey];
    const overview = sectionSummaryForKey(groupKey, title);
    const difficultyBlurb = summarizeDifficulty(filtered);
    const quizCount = filtered.reduce((acc, it) => {
      const t = it.topic;
      if (Array.isArray(t?.quizzes) && t.quizzes.length)
        return acc + t.quizzes.length;
      return acc + 1;
    }, 0);
    return (
      <section
        className="rounded-xl border p-3"
        style={{
          borderColor: subjectColors.border || 'rgba(148,163,184,0.35)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">
              {title}{' '}
              <span className="opacity-60 text-sm">({filtered.length})</span>
            </h4>
            <button
              type="button"
              className="text-sky-600 dark:text-sky-400 underline-offset-2"
              aria-label={`Learn more about ${title}`}
              aria-expanded={showInfo}
              onClick={() => {
                const next = { ...expandedGroups, [infoKey]: !showInfo };
                persistExpanded(next);
              }}
            >
              ℹ️
            </button>
          </div>
          <button
            className="text-sm underline"
            aria-expanded={expanded}
            onClick={() => {
              const next = { ...expandedGroups, [key]: !expanded };
              persistExpanded(next);
            }}
          >
            {expanded ? 'Show Less' : 'View More'}
          </button>
        </div>
        <p
          className="mt-1 fade-in"
          style={{
            fontSize: '0.9rem',
            lineHeight: 1.4,
            opacity: 0.85,
            fontWeight: 500,
            color: isDarkMode
              ? 'var(--text-tertiary, rgba(226,232,240,0.78))'
              : 'var(--subtext-color, rgba(15,23,42,0.66))',
          }}
          title={overview}
        >
          {overview}
        </p>
        {showInfo && (
          <div
            className="mt-2 rounded-lg border px-3 py-2 text-sm"
            style={{
              borderColor: subjectColors.border || 'rgba(148,163,184,0.35)',
              background: isDarkMode
                ? 'rgba(15,23,42,0.35)'
                : 'rgba(241,245,249,0.5)',
            }}
          >
            <p className="mb-1">{overview}</p>
            <p className="mb-1">
              <strong>Difficulty:</strong> {difficultyBlurb}
            </p>
            <p>
              <strong>Quizzes in this section:</strong> {quizCount}
            </p>
          </div>
        )}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shown.map(({ topic }, idx) => renderTopicCard(topic, idx))}
          {shown.length === 0 && (
            <div
              className="col-span-full text-center text-sm opacity-80 border border-dashed rounded-lg p-4"
              style={{
                borderColor: subjectColors.border || 'rgba(148,163,184,0.35)',
              }}
            >
              No topics match the current filters.
            </div>
          )}
        </div>
      </section>
    );
  };

  const renderLevelsTab = () => {
    const list = allTopics.map(({ topic }) => ({
      topic,
      level: deriveLevel(topic),
    }));
    return (
      <>
        {renderFilterBar()}
        <div className="space-y-4">
          {renderGroupSection(
            'Beginner',
            list
              .filter((x) => x.level === 'Beginner')
              .map((x) => ({ topic: x.topic })),
            'levels-beginner'
          )}
          {renderGroupSection(
            'Intermediate',
            list
              .filter((x) => x.level === 'Intermediate')
              .map((x) => ({ topic: x.topic })),
            'levels-intermediate'
          )}
          {renderGroupSection(
            'Advanced',
            list
              .filter((x) => x.level === 'Advanced')
              .map((x) => ({ topic: x.topic })),
            'levels-advanced'
          )}
        </div>
      </>
    );
  };

  const renderSpecialTab = () => {
    const list = allTopics.map(({ topic }) => ({
      topic,
      image: hasImage(topic),
      timed: isTimed(topic),
      passage: hasPassage(topic),
    }));
    return (
      <>
        {renderFilterBar()}
        <div className="space-y-4">
          {renderGroupSection(
            'Timed Practice',
            list.filter((x) => x.timed).map((x) => ({ topic: x.topic })),
            'special-timed'
          )}
          {renderGroupSection(
            'Image-Based',
            list.filter((x) => x.image).map((x) => ({ topic: x.topic })),
            'special-image'
          )}
          {renderGroupSection(
            'Reading Passage',
            list.filter((x) => x.passage).map((x) => ({ topic: x.topic })),
            'special-passage'
          )}
        </div>
      </>
    );
  };

  // Fallback: Launch any premade by quizCode from the merged dataset
  const resolveAndLaunchByCode = (quizCode) => {
    try {
      const data =
        typeof window !== 'undefined'
          ? window.MergedExpandedQuizData || window.ExpandedQuizData || {}
          : {};
      const subject = data?.[subjectName];
      if (!subject) throw new Error('Subject dataset not found');
      let found = null;
      // search helper
      const setIfMatch = (obj) => {
        if (found) return;
        if (!obj) return;
        if (obj.quizCode && obj.quizCode === quizCode) found = obj;
      };
      // subject-level quizzes
      if (Array.isArray(subject.quizzes)) subject.quizzes.forEach(setIfMatch);
      // categories
      const cats = subject.categories || {};
      for (const catName of Object.keys(cats)) {
        const cat = cats[catName];
        if (!cat) continue;
        if (Array.isArray(cat.quizzes)) cat.quizzes.forEach(setIfMatch);
        const topics = Array.isArray(cat.topics) ? cat.topics : [];
        for (const t of topics) {
          if (!t) continue;
          // topic as a direct quiz
          setIfMatch(t);
          // topic quiz sets
          if (Array.isArray(t.quizzes)) t.quizzes.forEach(setIfMatch);
        }
      }
      if (!found) {
        alert('Sorry, this premade could not be resolved. Try another.');
        return;
      }
      // Build a prepared quiz similar to topic/quizStart
      const originTopic = found.topicId
        ? getTopicById(subjectName, found.topicId)
        : null;
      const baseTitle = found.title || originTopic?.title || 'Premade Quiz';
      const prepared = {
        ...found,
        id: found.quizCode || found.quizId || sanitizeCodeSegment(baseTitle),
        title: baseTitle,
        quizCode:
          found.quizCode ||
          `${sanitizeCodeSegment(
            subjectName,
            'subject'
          )}__${sanitizeCodeSegment(baseTitle)}`,
        type: found.type || originTopic?.type || 'quiz',
      };
      // Resolve questions from topic/quizzes where needed
      let questions = [];
      if (Array.isArray(found.questions) && found.questions.length) {
        questions = found.questions;
      } else if (
        originTopic &&
        Array.isArray(originTopic.questions) &&
        originTopic.questions.length
      ) {
        questions = originTopic.questions;
      } else if (originTopic && Array.isArray(originTopic.quizzes)) {
        // pick first matching set if any
        const match =
          originTopic.quizzes.find(
            (q) => q.quizCode === found.quizCode || q.quizId === found.quizId
          ) || originTopic.quizzes[0];
        if (match && Array.isArray(match.questions))
          questions = match.questions;
      }
      const normalizedQuestions = (
        Array.isArray(questions) ? questions : []
      ).map((q, qi) => {
        const withNum =
          q && typeof q === 'object'
            ? { ...q, questionNumber: q.questionNumber ?? qi + 1 }
            : q;
        return normalizeQuestionAssets(withNum, subjectName);
      });
      prepared.questions = normalizedQuestions;
      ensureMinQuestions(prepared, subjectName, 12);
      prepared.isPremade = true;
      onSelectQuiz(prepared, subjectName);
    } catch (e) {
      console.warn('Failed to resolve premade by code', quizCode, e);
      alert('Could not start this premade quiz due to a data error.');
    }
  };

  // Catalog-backed flat listing (ensures full inventory is accessible even if clusters omit content)
  // Flat premade list removed after unification; all quizzes should appear under categories/topics

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div
        className="flex items-center gap-2"
        role="tablist"
        aria-label="Quiz organization tabs"
      >
        {[
          { id: 'core', label: 'Core Topics' },
          { id: 'levels', label: 'Skill Levels' },
          { id: 'special', label: 'Special Sets' },
        ].map((tab) => {
          const selected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-md border text-sm font-semibold ${
                selected ? 'shadow' : ''
              }`}
              style={
                selected
                  ? {
                      backgroundColor: subjectColors.accent || '#0ea5e9',
                      color: subjectColors.accentText || '#ffffff',
                      borderColor: subjectColors.accent || '#0ea5e9',
                    }
                  : {
                      backgroundColor: isDarkMode
                        ? 'rgba(148,163,184,0.12)'
                        : '#ffffff',
                      color: subjectColors.text || '#0f172a',
                      borderColor:
                        subjectColors.border || 'rgba(148,163,184,0.35)',
                    }
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {activeTab === 'core' && renderCoreTab()}
      {activeTab === 'levels' && renderLevelsTab()}
      {activeTab === 'special' && renderSpecialTab()}
    </div>
  );
}

// Icon components moved to top-level scope
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);
const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 15l-4 6h12l-4-6-1.293-1.293a1 1 0 010-1.414L15 5m0 0l2.293-2.293a1 1 0 011.414 0L21 5m-6 12v4m2-2h-4"
    />
  </svg>
);

// --- Helper Functions ---
const shuffleArray = (array) => {
  if (!Array.isArray(array)) {
    console.error('shuffleArray received a non-array value:', array);
    return [];
  }
  let newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const VALID_FONT_SIZES = new Set(['sm', 'md', 'lg', 'xl']);
const VALID_THEMES = new Set(['light', 'dark']);
const DEFAULT_PREFERENCES = Object.freeze({ fontSize: 'md', theme: 'light' });

const DEFAULT_CHALLENGE_OPTIONS = [
  // MATH (algebra, geometry, data)
  {
    id: 'math-1',
    subject: 'Math',
    subtopic: 'Number Sense & Fluency',
    label: 'Fractions, decimals, %',
    selected: false,
  },
  {
    id: 'math-2',
    subject: 'Math',
    subtopic: 'Algebra Foundations',
    label: 'Writing and solving 1-step equations',
    selected: false,
  },
  {
    id: 'math-3',
    subject: 'Math',
    subtopic: 'Algebra Foundations',
    label: '2-step equations & inequalities',
    selected: false,
  },
  {
    id: 'math-4',
    subject: 'Math',
    subtopic: 'Word Problems',
    label: 'Translating real situations to expressions',
    selected: false,
  },
  {
    id: 'math-5',
    subject: 'Math',
    subtopic: 'Geometry & Measurement',
    label: 'Perimeter, area, and volume',
    selected: false,
  },
  {
    id: 'math-6',
    subject: 'Math',
    subtopic: 'Data & Graphs',
    label: 'Reading tables, charts, and graphs',
    selected: false,
  },
  {
    id: 'math-7',
    subject: 'Math',
    subtopic: 'Scientific Calculator',
    label: 'Using the calculator efficiently',
    selected: false,
  },
  {
    id: 'math-8',
    subject: 'Math',
    subtopic: 'Test Skills',
    label: 'Multi-step GED-style math items',
    selected: false,
  },

  // RLA (reading, grammar, extended response)
  {
    id: 'rla-1',
    subject: 'RLA',
    subtopic: 'Reading Comprehension',
    label: 'Main idea and supporting details',
    selected: false,
  },
  {
    id: 'rla-2',
    subject: 'RLA',
    subtopic: 'Reading Comprehension',
    label: "Author's purpose & tone",
    selected: false,
  },
  {
    id: 'rla-3',
    subject: 'RLA',
    subtopic: 'Informational Text',
    label: 'Reading charts / text together',
    selected: false,
  },
  {
    id: 'rla-4',
    subject: 'RLA',
    subtopic: 'Language & Editing',
    label: 'Grammar, usage, and mechanics',
    selected: false,
  },
  {
    id: 'rla-5',
    subject: 'RLA',
    subtopic: 'Language & Editing',
    label: 'Punctuation and sentence boundaries',
    selected: false,
  },
  {
    id: 'rla-6',
    subject: 'RLA',
    subtopic: 'Writing',
    label: 'Organizing ideas for responses',
    selected: false,
  },
  {
    id: 'rla-7',
    subject: 'RLA',
    subtopic: 'Writing',
    label: 'Citing evidence from the passage',
    selected: false,
  },

  // SCIENCE (data, life, physical, reasoning)
  {
    id: 'science-1',
    subject: 'Science',
    subtopic: 'Data Interpretation',
    label: 'Reading charts and graphs',
    selected: false,
  },
  {
    id: 'science-2',
    subject: 'Science',
    subtopic: 'Physical Science',
    label: 'Forces, motion, and energy',
    selected: false,
  },
  {
    id: 'science-3',
    subject: 'Science',
    subtopic: 'Life Science',
    label: 'Cells and human body systems',
    selected: false,
  },
  {
    id: 'science-4',
    subject: 'Science',
    subtopic: 'Earth & Space',
    label: 'Weather, climate, earth systems',
    selected: false,
  },
  {
    id: 'science-5',
    subject: 'Science',
    subtopic: 'Scientific Practice',
    label: 'Experimental design & variables',
    selected: false,
  },
  {
    id: 'science-6',
    subject: 'Science',
    subtopic: 'Reasoning in Science',
    label: 'Cause-and-effect in passages',
    selected: false,
  },

  // SOCIAL STUDIES (civics, history, econ, reading graphs)
  {
    id: 'social-1',
    subject: 'Social Studies',
    subtopic: 'Civics',
    label: 'Government and civics concepts',
    selected: false,
  },
  {
    id: 'social-2',
    subject: 'Social Studies',
    subtopic: 'Geography',
    label: 'Interpreting maps and data',
    selected: false,
  },
  {
    id: 'social-3',
    subject: 'Social Studies',
    subtopic: 'History',
    label: 'Remembering historical events',
    selected: false,
  },
  {
    id: 'social-4',
    subject: 'Social Studies',
    subtopic: 'US History',
    label: 'Colonial – Civil War sequence',
    selected: false,
  },
  {
    id: 'social-5',
    subject: 'Social Studies',
    subtopic: 'Economics',
    label: 'Basic economics and graphs',
    selected: false,
  },
  {
    id: 'social-6',
    subject: 'Social Studies',
    subtopic: 'Document Literacy',
    label: 'Reading primary/secondary sources',
    selected: false,
  },
];

const DEFAULT_LOCAL_PROFILE = {
  profile: {
    id: 'local-user',
    name: '',
    timezone: 'America/New_York',
    reminderEnabled: true,
    fontSize: null,
    onboardingStatus: 'pending',
    onboardingComplete: false,
  },
  testPlan: [
    {
      subject: 'Math',
      testDate: '',
      testLocation: '',
      passed: false,
      notScheduled: false,
    },
    {
      subject: 'RLA',
      testDate: '',
      testLocation: '',
      passed: false,
      notScheduled: false,
    },
    {
      subject: 'Science',
      testDate: '',
      testLocation: '',
      passed: false,
      notScheduled: false,
    },
    {
      subject: 'Social Studies',
      testDate: '',
      testLocation: '',
      passed: false,
      notScheduled: false,
    },
  ],
  challengeOptions: DEFAULT_CHALLENGE_OPTIONS.map((opt) => ({ ...opt })),
  recentScoresDashboard: {},
  scores: {},
};

function cloneDefaultLocalProfile() {
  return {
    profile: { ...DEFAULT_LOCAL_PROFILE.profile },
    testPlan: DEFAULT_LOCAL_PROFILE.testPlan.map((row) => ({ ...row })),
    challengeOptions: DEFAULT_LOCAL_PROFILE.challengeOptions.map((opt) => ({
      ...opt,
    })),
    recentScoresDashboard: { ...DEFAULT_LOCAL_PROFILE.recentScoresDashboard },
    scores: { ...DEFAULT_LOCAL_PROFILE.scores },
  };
}

const normalizePreferences = (prefs = {}) => ({
  fontSize: VALID_FONT_SIZES.has(prefs.fontSize)
    ? prefs.fontSize
    : DEFAULT_PREFERENCES.fontSize,
  theme: VALID_THEMES.has(prefs.theme)
    ? prefs.theme
    : DEFAULT_PREFERENCES.theme,
});

if (typeof window !== 'undefined') {
  window.SUBJECT_NAMES = SUBJECT_NAMES;
}

function createEmptySubjectEdits() {
  return {
    Math: {
      testDate: '',
      testLocation: '',
      passed: false,
      notScheduled: false,
    },
    RLA: { testDate: '', testLocation: '', passed: false, notScheduled: false },
    Science: {
      testDate: '',
      testLocation: '',
      passed: false,
      notScheduled: false,
    },
    'Social Studies': {
      testDate: '',
      testLocation: '',
      passed: false,
      notScheduled: false,
    },
  };
}

function buildSubjectEditsFromPlan(plan) {
  const planFromServer = {};
  if (Array.isArray(plan)) {
    for (const row of plan) {
      if (!row || !row.subject) {
        continue;
      }
      planFromServer[row.subject] = {
        testDate: row.testDate || '',
        testLocation: row.testLocation || '',
        passed: !!row.passed,
        notScheduled: !!row.notScheduled,
      };
    }
  }
  const base = createEmptySubjectEdits();
  const merged = {
    ...base,
    Math: {
      ...base.Math,
      ...planFromServer.Math,
    },
    RLA: {
      ...base.RLA,
      ...planFromServer.RLA,
    },
    Science: {
      ...base.Science,
      ...planFromServer.Science,
    },
    'Social Studies': {
      ...base['Social Studies'],
      ...planFromServer['Social Studies'],
    },
  };

  for (const subject of Object.keys(planFromServer)) {
    if (!SUBJECT_NAMES.includes(subject)) {
      merged[subject] = {
        testDate: planFromServer[subject].testDate || '',
        testLocation: planFromServer[subject].testLocation || '',
        passed: !!planFromServer[subject].passed,
        notScheduled: !!planFromServer[subject].notScheduled,
      };
    }
  }

  return merged;
}

function canCompleteOnboarding(p) {
  const hasName = p?.profile?.name && p.profile.name.trim() !== '';

  const hasAnyTestProgress = Array.isArray(p?.testPlan)
    ? p.testPlan.some(
        (row) =>
          row &&
          (row.passed ||
            row.notScheduled ||
            (row.testDate && row.testDate.trim() !== ''))
      )
    : false;

  const hasChallenges = Array.isArray(p?.challengeOptions)
    ? p.challengeOptions.some((opt) => opt && opt.selected)
    : false;

  return !!(hasName && hasAnyTestProgress && hasChallenges);
}

async function fetchJSON(url, options = {}) {
  const { headers, ...rest } = options || {};
  const finalHeaders = headers ? { ...headers } : undefined;
  try {
    const isAbsolute = typeof url === 'string' && /^(https?:)?\/\//i.test(url);
    const BASE =
      (typeof API_BASE_URL === 'string' && API_BASE_URL) ||
      (typeof window !== 'undefined' &&
        window.__CLIENT_CONFIG__ &&
        window.__CLIENT_CONFIG__.API_BASE_URL) ||
      (typeof window !== 'undefined' ? window.location.origin : '');
    const targetUrl = isAbsolute
      ? url
      : typeof url === 'string' && url.startsWith('/')
      ? `${BASE}${url}`
      : url;
    const response = await fetch(targetUrl, {
      credentials: 'include',
      ...rest,
      headers: finalHeaders,
    });
    if (!response.ok) {
      // Graceful failure: return null so callers can decide fallback
      console.warn(
        '[fetchJSON] non-ok response',
        response.status,
        'for',
        targetUrl
      );
      return null;
    }
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return response.json();
    }
    return null;
  } catch (err) {
    console.warn('[fetchJSON] request failed', err?.message || err);
    return null; // never throw on startup critical fetches
  }
}

if (typeof window !== 'undefined') {
  window.fetchJSON = fetchJSON;
}

// --- App Structure Components ---
function AppHeader({
  currentUser,
  onLogout,
  onShowHome,
  onShowProfile,
  onShowSettings,
  onShowQuizzes,
  onShowProgress,
  activePanel,
  theme,
  onToggleTheme,
}) {
  const displayName = currentUser?.name || currentUser?.email || 'Learner';
  const initial = displayName
    ? displayName.trim().charAt(0).toUpperCase()
    : 'U';
  const organizationName =
    currentUser?.organization_name || currentUser?.organizationName || null;
  const isProfileActive = activePanel === 'profile';
  const isSettingsActive = activePanel === 'settings';
  const isDark = theme === 'dark';
  const toggleButtonStyle = isDark
    ? undefined
    : {
        background: '#ffffff',
        color: '#0f172a',
        borderColor: 'rgba(15,23,42,0.18)',
        boxShadow: '0 12px 20px -14px rgba(15,23,42,0.25)',
      };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center gap-4 justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onShowHome}
            className="text-left text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 rounded-lg px-2"
          >
            {organizationName
              ? `${organizationName} Learning Canvas`
              : 'Learning Canvas'}
          </button>
          <nav className="hidden md:flex items-center gap-4 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
            <button
              onClick={onShowHome}
              className="flex items-center gap-1.5 hover:text-sky-600 dark:hover:text-sky-400 transition"
              type="button"
            >
              <HouseIcon className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={onShowQuizzes}
              className="flex items-center gap-1.5 hover:text-sky-600 dark:hover:text-sky-400 transition"
              type="button"
              aria-controls="quizzes"
            >
              <BookOpenIcon className="h-4 w-4" />
              <span>Quizzes</span>
            </button>
            <button
              onClick={onShowProgress}
              className="flex items-center gap-1.5 hover:text-sky-600 dark:hover:text-sky-400 transition"
              type="button"
              aria-controls="progress"
            >
              <ChartPieIcon className="h-4 w-4" />
              <span>Progress</span>
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle color mode"
            aria-pressed={isDark}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700/80"
            style={toggleButtonStyle}
          >
            {isDark ? (
              <SleepingMoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5 drop-shadow" />
            )}
          </button>
          {currentUser && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {currentUser.picture ? (
                  <img
                    src={currentUser.picture}
                    alt="User avatar"
                    className="w-9 h-9 rounded-full object-cover shadow"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center shadow">
                    <StudentIcon className="w-7 h-7" />
                  </div>
                )}
                <div className="flex flex-col leading-tight">
                  <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Welcome
                  </span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[10rem]">
                    {currentUser.name || 'Learner'}
                  </span>
                  {organizationName && (
                    <span
                      className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate max-w-[10rem]"
                      title={organizationName}
                    >
                      {organizationName}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="btnProfile"
                  onClick={onShowProfile}
                  className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border transition ${
                    isProfileActive
                      ? 'bg-sky-500 text-white border-transparent'
                      : 'text-sky-700 dark:text-sky-300 border-sky-200/70 dark:border-slate-600 hover:bg-sky-50 dark:hover:bg-slate-800/70'
                  }`}
                  aria-controls="profileView"
                  aria-expanded={isProfileActive}
                >
                  Profile
                </button>
                <button
                  type="button"
                  id="btnSettings"
                  onClick={onShowSettings}
                  className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border transition ${
                    isSettingsActive
                      ? 'bg-sky-500 text-white border-transparent'
                      : 'text-sky-700 dark:text-sky-300 border-sky-200/70 dark:border-slate-600 hover:bg-sky-50 dark:hover:bg-slate-800/70'
                  }`}
                  aria-controls="settingsView"
                  aria-expanded={isSettingsActive}
                >
                  Settings
                </button>
                <button
                  type="button"
                  onClick={onLogout}
                  className="px-3 py-2 text-xs sm:text-sm font-semibold text-rose-600 hover:text-rose-500 dark:text-rose-300 dark:hover:text-rose-200 transition"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// --- StudentHomeRoom Component (Dashboard) ---
function StudentHomeRoom({ user, onNavigate }) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [dashboardData, setDashboardData] = React.useState({
    nextTask: null,
    mastery: { rla: [], math: [], science: [], social: [] },
    studyTime: { week: {}, month: {}, allTime: {}, bySubject: [] },
    badges: { rla: {}, math: {}, science: {}, social: {} },
    scoreHistory: { history: [], highestScores: {} },
    studyEstimate: null,
    careerRecommendations: { recommendations: [], interests: [] },
  });

  React.useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const [
        nextTaskRes,
        masteryRes,
        studyTimeRes,
        badgesRes,
        scoreHistoryRes,
        studyEstimateRes,
        careerRes,
      ] = await Promise.all([
        fetch('/api/student/next-task', { headers }),
        fetch('/api/student/mastery', { headers }),
        fetch('/api/student/study-time', { headers }),
        fetch('/api/student/badges', { headers }),
        fetch('/api/student/score-history', { headers }),
        fetch('/api/student/study-estimate', { headers }),
        fetch('/api/student/career-recommendations', { headers }),
      ]);

      const data = {
        nextTask: await nextTaskRes.json(),
        mastery: await masteryRes.json(),
        studyTime: await studyTimeRes.json(),
        badges: await badgesRes.json(),
        scoreHistory: await scoreHistoryRes.json(),
        studyEstimate: await studyEstimateRes.json(),
        careerRecommendations: await careerRes.json(),
      };

      setDashboardData(data);
    } catch (err) {
      console.error('[StudentHomeRoom] Load error:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
          <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const highestScore =
    Object.values(dashboardData.scoreHistory.highestScores || {})[0] || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.name || 'Student'}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Your learning dashboard
              </p>
            </div>
            <button
              onClick={loadDashboardData}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="Refresh dashboard"
            >
              🔄 Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Content - Coming Soon Placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Student Dashboard Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your personalized learning dashboard with AI-powered insights,
            mastery tracking, and career recommendations is under construction.
          </p>
          <button
            onClick={() => onNavigate('/', {})}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main App Component ---
function App({ externalTheme, onThemeChange }) {
  // ========================================
  // ROLE HIERARCHY HELPERS
  // ========================================
  const isSuperAdmin = (u) => u?.role === 'superAdmin';
  const isOrgAdmin = (u) => u?.role === 'orgAdmin';
  const isInstructor = (u) => u?.role === 'instructor' || u?.role === 'teacher';
  const isStudentUser = (u) =>
    !isSuperAdmin(u) && !isOrgAdmin(u) && !isInstructor(u);

  // ========================================
  // STATE MANAGEMENT
  // ========================================
  const SMITHING_PROMPTS = [
    'Heating the forge...',
    'The smith is at the anvil...',
    'Hammering out the questions...',
    'Shaping the perfect practice test...',
    'Quenching the final details...',
    'Smithing your exam now...',
  ];
  const [view, setView] = useState('start');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [activeGenerator, setActiveGenerator] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [revolvingPrompt, setRevolvingPrompt] = useState('');
  const [countdownSeconds, setCountdownSeconds] = useState(180); // 3 minutes = 180 seconds
  const [showOvertimeMessage, setShowOvertimeMessage] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  // Global navigation state for top-level views
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' | 'quizzes' | 'progress' | 'profile' | 'settings'
  // Lifted subject/category selection (was local to StartScreen) so navigation history can restore them
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // Simple stack of prior navigation states for Back behavior
  const [navHistory, setNavHistory] = useState([]);
  // Track how many browser history entries we've pushed (for correct Back behavior)
  const browserDepthRef = useRef(0);
  const [authToken, setAuthToken] = useState(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      return window.localStorage
        ? window.localStorage.getItem('appToken')
        : null;
    } catch (error) {
      console.warn('Unable to restore stored auth token:', error);
      return null;
    }
  });
  const currentUserRef = useRef(null);
  const [progress, setProgress] = useState(() => createEmptyProgress());
  const [quizAttempts, setQuizAttempts] = useState([]);
  const [showFormulaSheet, setShowFormulaSheet] = useState(false);
  // Dedicated practice tools visibility toggles for subject-specific tool sections
  const [showMathPracticeTools, setShowMathPracticeTools] = useState(false);
  const [showSciencePracticeTools, setShowSciencePracticeTools] =
    useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [showJoinOrgModal, setShowJoinOrgModal] = useState(false);
  const [showPracticeModal, setShowPracticeModal] = useState(false);
  const [mathToolsActiveTab, setMathToolsActiveTab] = useState('calculator');
  const [vocabulary, setVocabulary] = useState(FALLBACK_VOCABULARY);
  const [showWelcomeSplash, setShowWelcomeSplash] = useState(false);
  const [welcomeName, setWelcomeName] = useState('');
  const [welcomeFading, setWelcomeFading] = useState(false);
  const welcomeTimeoutRef = useRef(null);
  const welcomeFadeTimeoutRef = useRef(null);
  const presenceIntervalRef = useRef(null);
  const lastAttemptsFetchRef = useRef(0);
  const pendingAttemptsFetchRef = useRef(null);
  const [pendingScrollTarget, setPendingScrollTarget] = useState(null);
  // Browser history sync: ensure Back button returns to the previous app state (e.g., dashboard from quiz)
  const suppressPushRef = useRef(false); // when true, skip pushing a new state (used during popstate-driven restores)
  const didInitHistoryRef = useRef(false); // avoid pushing an entry on first render

  // Initialize history state on mount and handle browser back/forward
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !window.history ||
      typeof window.history.replaceState !== 'function'
    ) {
      return undefined;
    }
    const initialSnapshot = {
      appNav: true,
      activeView,
      view,
      selectedSubject,
      selectedCategory,
    };
    try {
      window.history.replaceState(initialSnapshot, '');
    } catch (e) {
      // noop
    }
    browserDepthRef.current = 0;

    const onPopState = (event) => {
      const s = event && event.state ? event.state : null;
      // Only handle states we created
      if (s && s.appNav) {
        suppressPushRef.current = true;
        setActiveView(s.activeView || 'dashboard');
        setView(s.view || 'start');
        setSelectedSubject(
          Object.prototype.hasOwnProperty.call(s, 'selectedSubject')
            ? s.selectedSubject
            : null
        );
        setSelectedCategory(
          Object.prototype.hasOwnProperty.call(s, 'selectedCategory')
            ? s.selectedCategory
            : null
        );
        // Clear quiz context when leaving quiz/results views
        if (s.view !== 'quiz' && s.view !== 'results') {
          setActiveQuiz(null);
          setQuizResults(null);
        }
      } else {
        // If there's no app state, default back to dashboard
        suppressPushRef.current = true;
        setActiveView('dashboard');
        setView('start');
        setSelectedSubject(null);
        setSelectedCategory(null);
        setActiveQuiz(null);
        setQuizResults(null);
        browserDepthRef.current = 0;
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Push a new browser history entry whenever our top-level navigation state changes (unless restoring)
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !window.history ||
      typeof window.history.pushState !== 'function'
    ) {
      return;
    }
    if (!didInitHistoryRef.current) {
      didInitHistoryRef.current = true;
      return;
    }
    if (suppressPushRef.current) {
      suppressPushRef.current = false;
      return;
    }
    const snapshot = {
      appNav: true,
      activeView,
      view,
      selectedSubject,
      selectedCategory,
    };
    try {
      // Keep URL stable; we only care about the state object for back/forward
      window.history.pushState(snapshot, '');
      browserDepthRef.current += 1;
    } catch (e) {
      // noop
    }
  }, [activeView, view, selectedSubject, selectedCategory]);

  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  const sendPresencePing = useCallback(async () => {
    try {
      await fetch(`${API_BASE_URL}/presence/ping`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.warn('presence ping failed:', err);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    if (!currentUser) {
      if (presenceIntervalRef.current) {
        clearInterval(presenceIntervalRef.current);
        presenceIntervalRef.current = null;
      }
      return undefined;
    }

    const handleBeforeUnload = () => {
      if (presenceIntervalRef.current) {
        clearInterval(presenceIntervalRef.current);
        presenceIntervalRef.current = null;
      }

      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        try {
          const blob = new Blob([], { type: 'application/json' });
          navigator.sendBeacon(`${API_BASE_URL}/presence/ping`, blob);
        } catch (err) {
          console.warn('presence beacon failed:', err);
        }
      } else {
        sendPresencePing();
      }
    };

    sendPresencePing();

    presenceIntervalRef.current = window.setInterval(sendPresencePing, 60000);

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (presenceIntervalRef.current) {
        clearInterval(presenceIntervalRef.current);
        presenceIntervalRef.current = null;
      }
    };
  }, [currentUser, sendPresencePing]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        // Fetch from the new '/api/vocabulary/all' endpoint
        const data = await fetchJSON(`${API_BASE_URL}/api/vocabulary/all`);

        if (!isMounted) return;

        if (data && typeof data === 'object') {
          // Merge the full API response with the fallback
          setVocabulary(mergeVocabularyData(FALLBACK_VOCABULARY, data));
        } else {
          // If the fetch fails, just log it and keep the fallback
          console.warn(
            'Unable to load vocabulary data from API; using fallback.'
          );
        }
      } catch (err) {
        console.warn('Unable to load vocabulary data:', err);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);
  const [mathToolsInitialized, setMathToolsInitialized] = useState(false);

  useEffect(() => {
    return () => {
      if (welcomeTimeoutRef.current) {
        clearTimeout(welcomeTimeoutRef.current);
      }
      if (welcomeFadeTimeoutRef.current) {
        clearTimeout(welcomeFadeTimeoutRef.current);
      }
    };
  }, []);

  const hasLocalPrefsRef = useRef(false);
  const pendingThemeSyncRef = useRef(null);
  const [preferences, setPreferences] = useState(() => {
    const resolveInitialTheme = (baseTheme) => {
      if (VALID_THEMES.has(externalTheme)) {
        return externalTheme;
      }
      return baseTheme;
    };
    if (typeof window === 'undefined') {
      return {
        ...DEFAULT_PREFERENCES,
        theme: resolveInitialTheme(DEFAULT_PREFERENCES.theme),
      };
    }
    try {
      const stored = window.localStorage.getItem('prefs');
      if (stored) {
        const parsed = JSON.parse(stored);
        hasLocalPrefsRef.current = true;
        const normalized = normalizePreferences(parsed);
        return { ...normalized, theme: resolveInitialTheme(normalized.theme) };
      }
    } catch (error) {
      console.warn('Failed to restore saved preferences:', error);
    }
    const prefersDark =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : false;
    if (prefersDark) {
      const normalized = normalizePreferences({
        ...DEFAULT_PREFERENCES,
        theme: 'dark',
      });
      return { ...normalized, theme: resolveInitialTheme(normalized.theme) };
    }
    return {
      ...DEFAULT_PREFERENCES,
      theme: resolveInitialTheme(DEFAULT_PREFERENCES.theme),
    };
  });
  const [localProfile, setLocalProfile] = useState(() => {
    if (typeof window === 'undefined') {
      return cloneDefaultLocalProfile();
    }
    try {
      const saved = window.localStorage.getItem('ged_local_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...cloneDefaultLocalProfile(),
          ...parsed,
          profile: {
            ...DEFAULT_LOCAL_PROFILE.profile,
            ...(parsed.profile || {}),
          },
          testPlan: Array.isArray(parsed.testPlan)
            ? parsed.testPlan.map((row) => ({
                subject: row?.subject || '',
                testDate: row?.testDate || '',
                testLocation: row?.testLocation || '',
                passed: !!row?.passed,
                notScheduled: !!row?.notScheduled,
              }))
            : DEFAULT_LOCAL_PROFILE.testPlan.map((row) => ({ ...row })),
          challengeOptions: Array.isArray(parsed.challengeOptions)
            ? parsed.challengeOptions.map((opt, index) => ({
                ...opt,
                id: opt?.id ?? `${opt?.subject || 'challenge'}-${index}`,
                selected: !!opt?.selected,
              }))
            : DEFAULT_LOCAL_PROFILE.challengeOptions.map((opt) => ({ ...opt })),
          recentScoresDashboard:
            parsed.recentScoresDashboard &&
            typeof parsed.recentScoresDashboard === 'object'
              ? parsed.recentScoresDashboard
              : {},
          scores:
            parsed.scores && typeof parsed.scores === 'object'
              ? parsed.scores
              : {},
        };
      }
    } catch (error) {
      console.warn('Failed to restore local profile:', error);
    }
    return cloneDefaultLocalProfile();
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [subjectEdits, setSubjectEdits] = useState(() =>
    buildSubjectEditsFromPlan(DEFAULT_LOCAL_PROFILE.testPlan)
  );
  const [nameDraft, setNameDraft] = useState('');
  const [nameStatus, setNameStatus] = useState('');
  const [nameSaving, setNameSaving] = useState(false);
  const [settingsStatus, setSettingsStatus] = useState('');
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(
    () => !!DEFAULT_LOCAL_PROFILE.profile.onboardingComplete
  );
  const [testSaving, setTestSaving] = useState(null);
  const [challengesSaving, setChallengesSaving] = useState(false);
  const [finishingOnboarding, setFinishingOnboarding] = useState(false);
  const [savingAll, setSavingAll] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.setItem(
        'ged_local_profile',
        JSON.stringify(localProfile)
      );
    } catch (error) {
      console.warn('Unable to persist local profile:', error);
    }
  }, [localProfile]);

  useEffect(() => {
    setSubjectEdits(buildSubjectEditsFromPlan(localProfile?.testPlan));
  }, [localProfile?.testPlan]);

  useEffect(() => {
    setNameDraft(localProfile?.profile?.name || '');
  }, [localProfile?.profile?.name]);

  useEffect(() => {
    const status = localProfile?.profile?.onboardingStatus;
    const legacyFlag = !!localProfile?.profile?.onboardingComplete;
    const flag = status === 'complete' || legacyFlag;
    setOnboardingComplete(flag);
    if (typeof window !== 'undefined') {
      window._onboardingComplete = flag;
    }
  }, [
    localProfile?.profile?.onboardingStatus,
    localProfile?.profile?.onboardingComplete,
  ]);

  const profileData = localProfile;
  // Normalize a single-profile test date if provided by backend/frontend
  const profileTestDate =
    profileData?.profile?.test_date ||
    profileData?.profile?.exam_date ||
    profileData?.profile?.testDate ||
    null;

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    const root = document.documentElement;
    const sizeClasses = ['fs-sm', 'fs-md', 'fs-lg', 'fs-xl'];
    sizeClasses.forEach((cls) => root.classList.remove(cls));
    root.classList.add(`fs-${preferences.fontSize}`);
    try {
      window.localStorage.setItem(
        'prefs',
        JSON.stringify({
          fontSize: preferences.fontSize,
          theme: preferences.theme,
        })
      );
    } catch (error) {
      console.warn('Unable to persist preferences locally:', error);
    }
  }, [preferences.fontSize, preferences.theme]);

  const openMathTools = useCallback(
    (tab = 'graphing') => {
      setMathToolsActiveTab(tab);
      setMathToolsInitialized(true);
      setView('mathTools');
    },
    [setView]
  );

  const handleSaveAllProfile = useCallback(async () => {
    const token =
      authToken ||
      (typeof window !== 'undefined' && window.localStorage
        ? window.localStorage.getItem('appToken')
        : null);
    if (!token) {
      alert('You must be signed in to save your profile.');
      return;
    }

    // Compose testPlan from subjectEdits, but only include rows with some data set
    const testPlanPayload = Object.entries(subjectEdits || {})
      .map(([subject, fields]) => ({ subject, ...(fields || {}) }))
      .filter(
        (row) =>
          row &&
          row.subject &&
          (row.passed ||
            row.notScheduled ||
            (row.testDate && row.testDate.trim() !== '') ||
            (row.testLocation && row.testLocation.trim() !== ''))
      )
      .map((row) => ({
        subject: row.subject,
        testDate: typeof row.testDate === 'string' ? row.testDate.trim() : '',
        testLocation:
          typeof row.testLocation === 'string' ? row.testLocation.trim() : '',
        passed: !!row.passed,
        notScheduled: !!row.notScheduled,
      }));

    const selectedIds = Array.isArray(localProfile?.challengeOptions)
      ? localProfile.challengeOptions
          .filter((c) => c && c.selected && c.id)
          .map((c) => c.id)
      : [];

    const payload = {
      // Only include name if non-empty
      ...(nameDraft && nameDraft.trim() ? { name: nameDraft.trim() } : {}),
      preferences: { fontSize: preferences.fontSize, theme: preferences.theme },
      ...(testPlanPayload.length ? { testPlan: testPlanPayload } : {}),
      challenges: { selectedIds },
    };

    setSavingAll(true);
    try {
      const bundle = await fetchJSON(`${API_BASE_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (bundle && typeof bundle === 'object') {
        // Merge bundle into local state
        const serverTestPlan = Array.isArray(bundle.testPlan)
          ? bundle.testPlan.map((row) => ({
              subject: row?.subject || '',
              testDate: row?.testDate || '',
              testLocation: row?.testLocation || '',
              passed: !!row?.passed,
              notScheduled: !!row?.notScheduled,
            }))
          : [];
        const serverChallenges = Array.isArray(bundle.challengeOptions)
          ? bundle.challengeOptions.map((opt, index) => ({
              id: opt?.id ?? `${opt?.subject || 'challenge'}-${index}`,
              subject: opt?.subject || '',
              subtopic: opt?.subtopic || '',
              label: opt?.label || '',
              selected: !!opt?.selected,
            }))
          : [];
        setLocalProfile((prev) => ({
          ...prev,
          profile: {
            ...prev.profile,
            name: bundle?.profile?.name ?? prev.profile.name,
            onboardingComplete: !!bundle?.profile?.onboardingComplete,
          },
          testPlan: serverTestPlan.length
            ? serverTestPlan
            : prev.testPlan || [],
          challengeOptions: serverChallenges.length
            ? serverChallenges
            : prev.challengeOptions || [],
          recentScoresDashboard:
            bundle?.recentScores && typeof bundle.recentScores === 'object'
              ? bundle.recentScores
              : prev.recentScoresDashboard || {},
        }));
        // Update UI name and prefs from saved
        if (bundle?.profile?.name) {
          setCurrentUser((prev) =>
            prev ? { ...prev, name: bundle.profile.name } : prev
          );
          setNameDraft(bundle.profile.name);
        }
        const srvFont = bundle?.profile?.fontSize;
        const srvTheme = bundle?.profile?.theme;
        const prefUpdates = {};
        if (srvFont && VALID_FONT_SIZES.has(srvFont))
          prefUpdates.fontSize = srvFont;
        if (srvTheme && VALID_THEMES.has(srvTheme))
          prefUpdates.theme =
            srvTheme === 'system' ? preferences.theme : srvTheme;
        if (Object.keys(prefUpdates).length) {
          setPreferences((prev) => ({ ...prev, ...prefUpdates }));
        }
        alert('Profile saved.');
      }
    } catch (err) {
      console.error('Failed to save full profile:', err);
      alert('Unable to save profile right now. Please try again.');
    } finally {
      setSavingAll(false);
    }
  }, [
    authToken,
    nameDraft,
    preferences.fontSize,
    preferences.theme,
    subjectEdits,
    localProfile?.challengeOptions,
  ]);

  // Unified navigation helper: push current state onto history then change view
  const navigateTo = useCallback(
    (nextActiveView, options = {}) => {
      setNavHistory((prev) => [
        ...prev,
        {
          activeView,
          view,
          selectedSubject,
          selectedCategory,
        },
      ]);
      if (options.scrollTarget) {
        setPendingScrollTarget(options.scrollTarget);
      }
      setActiveView(nextActiveView);
      setView('start');
    },
    [activeView, view, selectedSubject, selectedCategory]
  );

  // Hard jump: reset nav history and browser depth, replaceState, and go to top-level view
  const hardJump = useCallback((nextActiveView, options = {}) => {
    setNavHistory([]);
    setActiveView(nextActiveView);
    setView('start');
    setSelectedSubject(null);
    setSelectedCategory(null);
    setActiveQuiz(null);
    setQuizResults(null);
    if (
      typeof window !== 'undefined' &&
      window.history &&
      typeof window.history.replaceState === 'function'
    ) {
      const snapshot = {
        appNav: true,
        activeView: nextActiveView,
        view: 'start',
        selectedSubject: null,
        selectedCategory: null,
      };
      try {
        window.history.replaceState(snapshot, '');
      } catch (e) {}
    }
    browserDepthRef.current = 0;
    if (options.scrollTarget) {
      setPendingScrollTarget(options.scrollTarget);
    }
  }, []);

  // Back navigation: pop history and restore prior state; fallback to dashboard if empty
  const goBack = useCallback(() => {
    if (
      browserDepthRef.current > 0 &&
      typeof window !== 'undefined' &&
      window.history &&
      typeof window.history.back === 'function'
    ) {
      browserDepthRef.current -= 1;
      window.history.back();
      return;
    }
    setNavHistory((prev) => {
      if (!prev.length) {
        // Fallback: hard reset to dashboard
        setActiveView('dashboard');
        setView('start');
        setSelectedSubject(null);
        setSelectedCategory(null);
        setActiveQuiz(null);
        setQuizResults(null);
        return prev;
      }
      const last = prev[prev.length - 1];
      setActiveView(last.activeView || 'dashboard');
      setView(last.view || 'start');
      setSelectedSubject(
        Object.prototype.hasOwnProperty.call(last, 'selectedSubject')
          ? last.selectedSubject
          : null
      );
      setSelectedCategory(
        Object.prototype.hasOwnProperty.call(last, 'selectedCategory')
          ? last.selectedCategory
          : null
      );
      // Restore quiz context for quiz-like screens; otherwise clear it
      if (
        last.view === 'quiz' ||
        last.view === 'results' ||
        last.view === 'reading' ||
        last.view === 'essay' ||
        last.view === 'simulation'
      ) {
        setActiveQuiz(last.activeQuiz ?? null);
        setQuizResults(last.quizResults ?? null);
      } else {
        setActiveQuiz(null);
        setQuizResults(null);
      }
      return prev.slice(0, -1);
    });
  }, []);

  // Top-level navigation shortcuts using hardJump (reset history and browser depth)
  const goToDashboard = useCallback(
    () => hardJump('dashboard', { scrollTarget: '__top' }),
    [hardJump]
  );
  const goToQuizzes = useCallback(
    () => hardJump('quizzes', { scrollTarget: 'quizzes' }),
    [hardJump]
  );
  const goToProgress = useCallback(
    () => hardJump('progress', { scrollTarget: 'progress' }),
    [hardJump]
  );
  const goToProfile = useCallback(() => hardJump('profile'), [hardJump]);
  const goToSettings = useCallback(() => {
    navigateTo('settings');
    if (!profileData) {
      loadProfileOnce();
    }
  }, [navigateTo, loadProfileOnce, profileData]);

  // Subject/category selection wrappers (record history before changing selection)
  const selectSubject = useCallback(
    (subject) => {
      setNavHistory((prev) => [
        ...prev,
        {
          activeView,
          view,
          selectedSubject,
          selectedCategory,
        },
      ]);
      setSelectedSubject(subject);
      setSelectedCategory(null);
    },
    [activeView, view, selectedSubject, selectedCategory]
  );

  const selectCategory = useCallback(
    (category) => {
      setNavHistory((prev) => [
        ...prev,
        {
          activeView,
          view,
          selectedSubject,
          selectedCategory,
        },
      ]);
      setSelectedCategory(category);
    },
    [activeView, view, selectedSubject, selectedCategory]
  );

  // Navigate to a dashboard section (e.g., #quizzes or #progress) from anywhere
  const navigateToSection = useCallback(
    (targetId) => {
      const id = typeof targetId === 'string' ? targetId.replace(/^#/, '') : '';
      if (!id) return;
      if (view !== 'start') {
        setPendingScrollTarget(id);
        setView('start');
        return;
      }
      const el =
        typeof document !== 'undefined' ? document.getElementById(id) : null;
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (typeof window !== 'undefined') {
        window.location.hash = id;
      }
    },
    [view]
  );

  // After switching to the dashboard, perform the pending scroll once content is painted
  useEffect(() => {
    if (view !== 'start' || !pendingScrollTarget) return;
    const id = pendingScrollTarget;
    const rAF =
      typeof window !== 'undefined' && window.requestAnimationFrame
        ? window.requestAnimationFrame
        : (fn) => setTimeout(fn, 0);
    rAF(() => {
      if (id === '__top') {
        if (
          typeof window !== 'undefined' &&
          typeof window.scrollTo === 'function'
        ) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        const el =
          typeof document !== 'undefined' ? document.getElementById(id) : null;
        if (el && typeof el.scrollIntoView === 'function') {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (typeof window !== 'undefined') {
          window.location.hash = id;
        }
      }
      setPendingScrollTarget(null);
    });
  }, [view, pendingScrollTarget]);

  // Optional: handle direct hash navigation (e.g., external links to #quizzes or #progress)
  useEffect(() => {
    const handleHashNavigate = () => {
      if (typeof window === 'undefined') return;
      const raw = window.location.hash || '';
      const id = raw.replace(/^#/, '');
      if (id === 'quizzes' || id === 'progress') {
        if (view !== 'start') {
          setPendingScrollTarget(id);
          setView('start');
        } else {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', handleHashNavigate);
      handleHashNavigate();
      return () => window.removeEventListener('hashchange', handleHashNavigate);
    }
  }, [view]);

  const recalcProgress = useCallback((attemptList) => {
    setProgress(buildProgressFromAttempts(attemptList));
  }, []);

  const applyPreferenceUpdate = useCallback((partialPrefs, options = {}) => {
    setPreferences((prev) => {
      const merged = normalizePreferences({ ...prev, ...partialPrefs });
      if (
        options.markLocal &&
        partialPrefs &&
        Object.prototype.hasOwnProperty.call(partialPrefs, 'theme') &&
        merged.theme !== prev.theme
      ) {
        pendingThemeSyncRef.current = merged.theme;
      }
      return merged;
    });
    if (options.markLocal) {
      hasLocalPrefsRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!VALID_THEMES.has(externalTheme)) {
      return;
    }
    if (preferences.theme !== externalTheme) {
      applyPreferenceUpdate({ theme: externalTheme });
    }
  }, [externalTheme, preferences.theme, applyPreferenceUpdate]);

  useEffect(() => {
    if (preferences.theme === externalTheme) {
      pendingThemeSyncRef.current = null;
      return;
    }
    if (typeof onThemeChange !== 'function') {
      pendingThemeSyncRef.current = null;
      return;
    }
    if (!VALID_THEMES.has(preferences.theme)) {
      pendingThemeSyncRef.current = null;
      return;
    }
    if (pendingThemeSyncRef.current !== preferences.theme) {
      return;
    }
    onThemeChange(preferences.theme);
    pendingThemeSyncRef.current = null;
  }, [onThemeChange, preferences.theme, externalTheme]);

  const handleSettingsInstantChange = useCallback(
    (partialPrefs) => {
      setSettingsStatus('');
      applyPreferenceUpdate(partialPrefs, { markLocal: true });
    },
    [applyPreferenceUpdate]
  );

  const toggleThemePreference = useCallback(() => {
    const nextTheme = preferences.theme === 'dark' ? 'light' : 'dark';
    applyPreferenceUpdate({ theme: nextTheme }, { markLocal: true });
  }, [applyPreferenceUpdate, preferences.theme]);

  const handlePersistPreferences = useCallback(
    async ({ fontSize = preferences.fontSize, theme = preferences.theme }) => {
      const nextPrefs = normalizePreferences({ fontSize, theme });
      applyPreferenceUpdate(nextPrefs, { markLocal: true });
      setSettingsSaving(true);
      setSettingsStatus('');
      try {
        const token =
          authToken ||
          (typeof window !== 'undefined' && window.localStorage
            ? window.localStorage.getItem('appToken')
            : null);
        const response = await fetchJSON('/api/profile/preferences', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(nextPrefs),
        });
        if (response) {
          const updatedFontSize =
            typeof response === 'object' && response !== null
              ? response.fontSize
              : undefined;
          const updatedTheme =
            typeof response === 'object' && response !== null
              ? response.theme
              : undefined;
          const persistedUpdates = {};
          if (updatedFontSize && VALID_FONT_SIZES.has(updatedFontSize)) {
            persistedUpdates.fontSize = updatedFontSize;
          }
          if (updatedTheme && VALID_THEMES.has(updatedTheme)) {
            persistedUpdates.theme = updatedTheme;
          }
          if (Object.keys(persistedUpdates).length > 0) {
            applyPreferenceUpdate(persistedUpdates);
          }
        }
        setSettingsStatus('Settings saved.');
      } catch (error) {
        console.warn('Failed to persist preferences:', error);
        setSettingsStatus(
          'Settings saved locally. We will sync when the server is available.'
        );
      } finally {
        setSettingsSaving(false);
      }
    },
    [applyPreferenceUpdate, preferences.fontSize, preferences.theme, authToken]
  );
  const saveDisplayName = useCallback((fullName) => {
    const trimmed = String(fullName || '').trim();
    if (!trimmed) {
      return '';
    }

    let profileId = 'local-user';
    setLocalProfile((prev) => {
      profileId = prev?.profile?.id || profileId;
      return {
        ...prev,
        profile: {
          ...prev.profile,
          name: trimmed,
        },
      };
    });

    setCurrentUser((prev) => {
      if (!prev) {
        return prev;
      }
      const updated = { ...prev, name: trimmed };
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          // Use per-user key to prevent cross-account bleeding
          if (updated.id) {
            const perUserKey = `appUser:${updated.id}`;
            window.localStorage.setItem(perUserKey, JSON.stringify(updated));
          }
          window.localStorage.setItem('appUser', JSON.stringify(updated));
        }
      } catch (error) {
        console.warn('Unable to persist updated name locally:', error);
      }
      return updated;
    });

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(`customNameSet_${profileId}`, 'true');
      }
    } catch (error) {
      console.warn('Unable to mark custom name locally:', error);
    }

    alert('Name saved locally.');
    return trimmed;
  }, []);

  // Helper: normalize nextUpcomingTest from server
  const normalizeNextUpcoming = (raw) => {
    if (!raw || typeof raw !== 'object') return null;
    const subject = raw.subject || '';
    const testDate = raw.testDate || '';
    const daysUntil =
      typeof raw.daysUntil === 'number' && Number.isFinite(raw.daysUntil)
        ? raw.daysUntil
        : null;
    if (!subject || !testDate) return null;
    return { subject, testDate, daysUntil };
  };

  const loadProfileOnce = useCallback(async () => {
    setProfileLoading(true);
    setProfileError(null);
    const token =
      (typeof window !== 'undefined' && window.localStorage
        ? window.localStorage.getItem('appToken')
        : null) ||
      authToken ||
      null;
    if (!token) {
      setProfileLoading(false);
      return null;
    }
    try {
      const bundle = await fetchJSON(`${API_BASE_URL}/api/profile/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (bundle && typeof bundle === 'object') {
        // Apply server preferences to UI state (not stored inside localProfile)
        const srvFont = bundle?.profile?.fontSize;
        const srvTheme = bundle?.profile?.theme;
        const prefUpdates = {};
        if (srvFont && VALID_FONT_SIZES.has(srvFont))
          prefUpdates.fontSize = srvFont;
        if (srvTheme && VALID_THEMES.has(srvTheme) && srvTheme !== 'system') {
          prefUpdates.theme = srvTheme;
        }
        if (Object.keys(prefUpdates).length) {
          setPreferences((prev) => ({ ...prev, ...prefUpdates }));
        }

        // Normalize to localProfile shape
        const coerceIso = (str) => {
          if (!str || typeof str !== 'string') return '';
          const s = str.trim();
          // Accept YYYY-MM-DD
          if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
          // Accept MM/DD/YYYY
          const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
          if (m) {
            const mm = String(m[1]).padStart(2, '0');
            const dd = String(m[2]).padStart(2, '0');
            const yyyy = m[3];
            return `${yyyy}-${mm}-${dd}`;
          }
          return '';
        };
        const arrayFromPlan = (planArr) =>
          Array.isArray(planArr)
            ? planArr.map((row) => ({
                subject: row?.subject || '',
                testDate: coerceIso(row?.testDate || row?.date),
                testLocation: row?.testLocation || row?.location || '',
                passed: !!(row?.passed ?? row?.isPassed),
                notScheduled: !!(row?.notScheduled ?? row?.not_scheduled),
              }))
            : [];
        let serverTestPlan = arrayFromPlan(bundle.testPlan);
        // Fallback: server might return profile.tests keyed by subject codes
        if (
          (!serverTestPlan || serverTestPlan.length === 0) &&
          bundle?.profile &&
          bundle.profile.tests &&
          typeof bundle.profile.tests === 'object'
        ) {
          const tests = bundle.profile.tests;
          const labelMap = {
            math: 'Math',
            rla: 'Reasoning Through Language Arts (RLA)',
            science: 'Science',
            social_studies: 'Social Studies',
          };
          serverTestPlan = Object.entries(tests).map(([key, val]) => ({
            subject: labelMap[key] || key,
            testDate: coerceIso(val?.testDate || val?.date),
            testLocation: val?.testLocation || val?.location || '',
            passed: !!(val?.passed ?? val?.isPassed),
            notScheduled: !!(val?.notScheduled ?? val?.not_scheduled),
          }));
        }
        const serverChallenges = Array.isArray(bundle.challengeOptions)
          ? bundle.challengeOptions.map((opt, index) => ({
              id: opt?.id ?? `${opt?.subject || 'challenge'}-${index}`,
              subject: opt?.subject || '',
              subtopic: opt?.subtopic || '',
              label: opt?.label || '',
              selected: !!opt?.selected,
            }))
          : [];
        const serverProfileName = bundle?.profile?.name || '';
        setLocalProfile((prev) => ({
          ...prev,
          profile: {
            ...prev.profile,
            name: serverProfileName || prev.profile.name || '',
            timezone: bundle?.profile?.timezone || prev.profile.timezone,
            reminderEnabled:
              typeof bundle?.profile?.reminderEnabled === 'boolean'
                ? bundle.profile.reminderEnabled
                : prev.profile.reminderEnabled,
            onboardingComplete: !!bundle?.profile?.onboardingComplete,
          },
          testPlan: serverTestPlan,
          nextUpcomingTest: normalizeNextUpcoming(bundle?.nextUpcomingTest),
          challengeOptions: serverChallenges,
          recentScoresDashboard:
            bundle?.recentScores && typeof bundle.recentScores === 'object'
              ? bundle.recentScores
              : prev.recentScoresDashboard || {},
        }));

        // CRITICAL FIX: Sync the profile name from server into currentUser
        // This ensures navbar and profile page always show the same per-user name
        if (serverProfileName) {
          setCurrentUser((prev) => {
            if (!prev) return prev;
            const updated = { ...prev, name: serverProfileName };
            try {
              if (typeof window !== 'undefined' && window.localStorage) {
                // Use per-user key to prevent cross-account bleeding
                if (updated.id) {
                  const perUserKey = `appUser:${updated.id}`;
                  window.localStorage.setItem(
                    perUserKey,
                    JSON.stringify(updated)
                  );
                }
                window.localStorage.setItem('appUser', JSON.stringify(updated));
              }
            } catch (error) {
              console.warn(
                'Unable to persist updated name to localStorage:',
                error
              );
            }
            return updated;
          });
        }
      }
      setProfileLoading(false);
      return bundle;
    } catch (error) {
      console.warn(
        'Failed to load profile from server, using local profile:',
        error?.message || error
      );
      setProfileError(
        'Unable to load latest profile. Working from local data.'
      );
      setProfileLoading(false);
      return null;
    }
  }, []);

  useEffect(() => {
    if (currentUser?.name && !localProfile?.profile?.name) {
      setNameDraft(currentUser.name);
    }
  }, [currentUser?.name, localProfile?.profile?.name]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    // Allow normal access while onboarding is pending; only redirect if explicitly required
    const status = localProfile?.profile?.onboardingStatus;
    if (status === 'required') {
      setView('profile');
    }
  }, [currentUser, localProfile?.profile?.onboardingStatus]);

  const currentUserId = currentUser?.id ?? null;

  useEffect(() => {
    if (!currentUserId) {
      return;
    }
    loadProfileOnce();
  }, [currentUserId]);

  // Optional gentle polling every 60s to keep dashboard fresh without spamming
  useEffect(() => {
    let stopped = false;
    const id = setInterval(() => {
      if (!stopped) {
        loadProfileOnce();
      }
    }, 60000);
    return () => {
      stopped = true;
      clearInterval(id);
    };
  }, []);

  const handleNameDraftChange = useCallback((value) => {
    setNameDraft(value);
    setNameStatus('');
  }, []);

  const handleProfileNameSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const trimmed = nameDraft.trim();
      if (!trimmed) {
        setNameStatus('Please enter a display name.');
        return;
      }
      setNameSaving(true);
      setNameStatus('');
      const token =
        authToken ||
        (typeof window !== 'undefined' && window.localStorage
          ? window.localStorage.getItem('appToken')
          : null);
      if (token) {
        try {
          // Parse name into first/last for the new endpoint
          const nameParts = trimmed.split(/\s+/);
          const firstName = nameParts[0] || trimmed;
          const lastName =
            nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

          const resp = await fetchJSON(`${API_BASE_URL}/api/me/name`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              displayName: trimmed,
            }),
          });

          if (resp?.user) {
            const updatedProfile = ensureUserProfile(resp.user);
            setLocalProfile((prev) => ({
              ...prev,
              profile: { ...prev.profile, ...updatedProfile },
            }));
            setCurrentUser(updatedProfile);
            setNameDraft(updatedProfile.display_name || updatedProfile.name);

            // Update per-user localStorage
            if (updatedProfile.id) {
              const perUserKey = `appUser:${updatedProfile.id}`;
              localStorage.setItem(perUserKey, JSON.stringify(updatedProfile));
              localStorage.setItem('appUser', JSON.stringify(updatedProfile));
            }

            setNameStatus('Name saved.');
            setNameSaving(false);
            return;
          }
        } catch (err) {
          console.warn('Server name save failed; falling back to local:', err);
        }
      }
      const saved = saveDisplayName(trimmed);
      if (saved) {
        setNameStatus('Name saved locally.');
        setNameDraft(saved);
      } else {
        setNameStatus('Please enter a display name.');
      }
      setNameSaving(false);
    },
    [nameDraft, saveDisplayName, authToken]
  );

  const handleProfileRefresh = useCallback(async () => {
    await loadProfileOnce();
    setNameStatus('Profile refreshed.');
    setSubjectEdits(buildSubjectEditsFromPlan(localProfile?.testPlan));
  }, [loadProfileOnce, localProfile?.testPlan]);

  const handleSubjectFieldChange = useCallback((subject, field, value) => {
    if (!subject) {
      return;
    }
    setSubjectEdits((prev) => {
      const existing = prev?.[subject] || {
        testDate: '',
        testLocation: '',
        passed: false,
        notScheduled: false,
      };
      const next = { ...existing };

      if (field === 'passed') {
        const checked = !!value;
        next.passed = checked;
        if (checked) {
          next.notScheduled = false;
          next.testDate = '';
        }
      } else if (field === 'testDate') {
        const inputValue = typeof value === 'string' ? value : '';
        next.testDate = inputValue;
        if (inputValue) {
          next.notScheduled = false;
        }
      } else if (field === 'notScheduled') {
        const flagged = !!value;
        next.notScheduled = flagged;
        if (flagged) {
          next.testDate = '';
          next.passed = false;
        }
      } else {
        next[field] = value;
      }

      return {
        ...prev,
        [subject]: next,
      };
    });
  }, []);

  const handleSaveSubject = useCallback(
    async (subject) => {
      const trimmedSubject = subject ? String(subject).trim() : '';
      if (!trimmedSubject) {
        window.alert('Missing subject.');
        return;
      }

      const edits = subjectEdits[trimmedSubject] || {
        testDate: '',
        testLocation: '',
        passed: false,
        notScheduled: false,
      };
      const normalizedNotScheduled = !!edits.notScheduled;
      const normalizedDate = normalizedNotScheduled
        ? ''
        : typeof edits.testDate === 'string'
        ? edits.testDate.trim()
        : '';
      const normalizedLocation =
        typeof edits.testLocation === 'string' ? edits.testLocation.trim() : '';
      const normalizedPassed = normalizedNotScheduled ? false : !!edits.passed;

      setTestSaving(trimmedSubject);
      const token =
        authToken ||
        (typeof window !== 'undefined' && window.localStorage
          ? window.localStorage.getItem('appToken')
          : null);
      if (token) {
        try {
          const bundle = await fetchJSON(`${API_BASE_URL}/api/profile/test`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              subject: trimmedSubject,
              testDate: normalizedDate,
              testLocation: normalizedLocation,
              passed: normalizedPassed,
              notScheduled: normalizedNotScheduled,
            }),
          });
          if (bundle && typeof bundle === 'object') {
            // merge from server
            setLocalProfile((prev) => ({
              ...prev,
              profile: {
                ...prev.profile,
                name: bundle?.profile?.name ?? prev.profile.name,
                onboardingComplete: !!bundle?.profile?.onboardingComplete,
              },
              testPlan: Array.isArray(bundle.testPlan)
                ? bundle.testPlan.map((row) => ({
                    subject: row?.subject || '',
                    testDate: row?.testDate || '',
                    testLocation: row?.testLocation || '',
                    passed: !!row?.passed,
                    notScheduled: !!row?.notScheduled,
                  }))
                : prev.testPlan,
              nextUpcomingTest: normalizeNextUpcoming(bundle?.nextUpcomingTest),
              challengeOptions: Array.isArray(bundle.challengeOptions)
                ? bundle.challengeOptions.map((opt, index) => ({
                    id: opt?.id ?? `${opt?.subject || 'challenge'}-${index}`,
                    subject: opt?.subject || '',
                    subtopic: opt?.subtopic || '',
                    label: opt?.label || '',
                    selected: !!opt?.selected,
                  }))
                : prev.challengeOptions || [],
              recentScoresDashboard:
                bundle?.recentScores && typeof bundle.recentScores === 'object'
                  ? bundle.recentScores
                  : prev.recentScoresDashboard || {},
            }));
            setTestSaving(null);
            // Re-fetch to ensure freshest computed fields (e.g., nextUpcoming)
            try {
              await loadProfileOnce();
            } catch (_) {}
            window.alert('Saved.');
            return;
          }
        } catch (err) {
          console.warn(
            'Server test plan save failed; falling back to local:',
            err
          );
        }
      }
      // Fallback: save locally
      setLocalProfile((prev) => {
        const existingPlan = Array.isArray(prev.testPlan) ? prev.testPlan : [];
        let updated = false;
        const updatedPlan = existingPlan.map((row) => {
          if (row && row.subject === trimmedSubject) {
            updated = true;
            return {
              ...row,
              testDate: normalizedDate,
              testLocation: normalizedLocation,
              passed: normalizedPassed,
              notScheduled: normalizedNotScheduled,
            };
          }
          return row;
        });
        if (!updated) {
          updatedPlan.push({
            subject: trimmedSubject,
            testDate: normalizedDate,
            testLocation: normalizedLocation,
            passed: normalizedPassed,
            notScheduled: normalizedNotScheduled,
          });
        }
        return { ...prev, testPlan: updatedPlan };
      });
      setTestSaving(null);
      window.alert('Saved locally.');
    },
    [subjectEdits, authToken]
  );

  const handleSaveChallenges = useCallback(async () => {
    setChallengesSaving(true);
    const token =
      authToken ||
      (typeof window !== 'undefined' && window.localStorage
        ? window.localStorage.getItem('appToken')
        : null);
    const selectedIds = Array.isArray(localProfile?.challengeOptions)
      ? localProfile.challengeOptions
          .filter((c) => c && c.selected && c.id)
          .map((c) => c.id)
      : [];
    if (token) {
      try {
        const bundle = await fetchJSON(
          `${API_BASE_URL}/api/profile/challenges/tags`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ selectedIds }),
          }
        );
        if (bundle && typeof bundle === 'object') {
          setLocalProfile((prev) => ({
            ...prev,
            profile: {
              ...prev.profile,
              name: bundle?.profile?.name ?? prev.profile.name,
              onboardingComplete: !!bundle?.profile?.onboardingComplete,
            },
            testPlan: Array.isArray(bundle.testPlan)
              ? bundle.testPlan.map((row) => ({
                  subject: row?.subject || '',
                  testDate: row?.testDate || '',
                  testLocation: row?.testLocation || '',
                  passed: !!row?.passed,
                  notScheduled: !!row?.notScheduled,
                }))
              : prev.testPlan || [],
            nextUpcomingTest: normalizeNextUpcoming(bundle?.nextUpcomingTest),
            challengeOptions: Array.isArray(bundle.challengeOptions)
              ? bundle.challengeOptions.map((opt, index) => ({
                  id: opt?.id ?? `${opt?.subject || 'challenge'}-${index}`,
                  subject: opt?.subject || '',
                  subtopic: opt?.subtopic || '',
                  label: opt?.label || '',
                  selected: !!opt?.selected,
                }))
              : prev.challengeOptions || [],
            recentScoresDashboard:
              bundle?.recentScores && typeof bundle.recentScores === 'object'
                ? bundle.recentScores
                : prev.recentScoresDashboard || {},
          }));
          window.alert('Challenges saved.');
          setChallengesSaving(false);
          return;
        }
      } catch (err) {
        console.warn(
          'Server challenges save failed; falling back to local:',
          err
        );
      }
    }
    window.alert('Challenges saved locally.');
    setChallengesSaving(false);
  }, [authToken, localProfile?.challengeOptions]);

  const toggleChallengeSelection = useCallback((challengeId) => {
    if (!challengeId) {
      return;
    }
    setLocalProfile((prev) => ({
      ...prev,
      challengeOptions: Array.isArray(prev.challengeOptions)
        ? prev.challengeOptions.map((opt) =>
            opt && opt.id === challengeId
              ? { ...opt, selected: !opt.selected }
              : opt
          )
        : [],
    }));
  }, []);

  const handleFinishOnboarding = useCallback(async () => {
    setFinishingOnboarding(true);
    const okLocal = canCompleteOnboarding(localProfile);
    if (!okLocal) {
      window.alert(
        'Almost there! Please fill in your test info, choose challenges, and add your name.'
      );
      setFinishingOnboarding(false);
      return;
    }
    const token =
      authToken ||
      (typeof window !== 'undefined' && window.localStorage
        ? window.localStorage.getItem('appToken')
        : null);
    if (token) {
      try {
        const bundle = await fetchJSON(
          `${API_BASE_URL}/api/profile/complete-onboarding`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (bundle && typeof bundle === 'object') {
          setLocalProfile((prev) => ({
            ...prev,
            profile: {
              ...prev.profile,
              onboardingStatus: 'complete',
              onboardingComplete: true,
              name: bundle?.profile?.name ?? prev.profile.name,
            },
            testPlan: Array.isArray(bundle.testPlan)
              ? bundle.testPlan.map((row) => ({
                  subject: row?.subject || '',
                  testDate: row?.testDate || '',
                  testLocation: row?.testLocation || '',
                  passed: !!row?.passed,
                  notScheduled: !!row?.notScheduled,
                }))
              : prev.testPlan || [],
            nextUpcomingTest: normalizeNextUpcoming(bundle?.nextUpcomingTest),
            challengeOptions: Array.isArray(bundle.challengeOptions)
              ? bundle.challengeOptions.map((opt, index) => ({
                  id: opt?.id ?? `${opt?.subject || 'challenge'}-${index}`,
                  subject: opt?.subject || '',
                  subtopic: opt?.subtopic || '',
                  label: opt?.label || '',
                  selected: !!opt?.selected,
                }))
              : prev.challengeOptions || [],
            recentScoresDashboard:
              bundle?.recentScores && typeof bundle.recentScores === 'object'
                ? bundle.recentScores
                : prev.recentScoresDashboard || {},
          }));
          window.alert("Great! You're all set.");
          setFinishingOnboarding(false);
          setView('start');
          return;
        }
      } catch (err) {
        console.warn(
          'Server onboarding completion failed; falling back to local:',
          err
        );
      }
    }
    // Fallback local-only
    setLocalProfile((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        onboardingStatus: 'complete',
        onboardingComplete: true,
      },
    }));
    window.alert("Great! You're all set.");
    setFinishingOnboarding(false);
    setView('start');
  }, [setView, localProfile, authToken]);

  const handleCompleteOnboardingLater = useCallback(() => {
    // Mark status as pending and allow navigation
    setLocalProfile((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        onboardingStatus: 'pending',
        onboardingComplete: false,
      },
    }));
    setView('start');
  }, [setView]);

  const loadQuizAttempts = useCallback(
    async (token, options = {}) => {
      if (!token) {
        return;
      }

      const { force = false } = options;
      const now = Date.now();
      const timeSinceLastFetch = now - lastAttemptsFetchRef.current;

      if (!force) {
        if (pendingAttemptsFetchRef.current) {
          return pendingAttemptsFetchRef.current;
        }
        if (timeSinceLastFetch < SCORE_FETCH_INTERVAL_MS) {
          return;
        }
      }

      lastAttemptsFetchRef.current = now;

      const fetchPromise = (async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/quiz-attempts`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(
              `Failed to fetch quiz attempts: ${response.status}`
            );
          }

          const data = await response.json();
          const normalized = Array.isArray(data) ? data : [];
          setQuizAttempts(normalized);
          recalcProgress(normalized);
        } catch (error) {
          console.error('Failed to load quiz attempts:', error);
          setQuizAttempts([]);
          recalcProgress([]);
        } finally {
          pendingAttemptsFetchRef.current = null;
        }
      })();

      pendingAttemptsFetchRef.current = fetchPromise;
      return fetchPromise;
    },
    [recalcProgress]
  );

  const persistQuizAttempt = useCallback(
    async ({
      subject,
      quizCode,
      quizTitle,
      quizType = null,
      score,
      totalQuestions,
      scaledScore,
      passed,
    }) => {
      if (!currentUser) {
        return;
      }

      const token = authToken || localStorage.getItem('appToken');
      if (!token) {
        return;
      }

      const normalizedSubject =
        typeof subject === 'string' ? subject.trim() : '';
      const normalizedQuizCode =
        typeof quizCode === 'string' ? quizCode.trim() : '';
      const normalizedQuizTitle =
        typeof quizTitle === 'string' ? quizTitle.trim() : '';

      if (!normalizedSubject || !normalizedQuizCode || !normalizedQuizTitle) {
        return;
      }

      const toRoundedNumber = (value) => {
        const num = Number(value);
        return Number.isFinite(num) ? Math.round(num) : null;
      };

      const payload = {
        subject: normalizedSubject,
        quizCode: normalizedQuizCode,
        quizTitle: normalizedQuizTitle,
        quizType: quizType || null,
        score: toRoundedNumber(score),
        totalQuestions: toRoundedNumber(totalQuestions),
        scaledScore: toRoundedNumber(scaledScore),
        passed: typeof passed === 'boolean' ? passed : undefined,
      };

      if (payload.passed === undefined && payload.scaledScore != null) {
        payload.passed = payload.scaledScore >= GED_PASSING_SCORE;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/quiz-attempts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Failed to save quiz attempt: ${response.status}`);
        }

        const savedAttempt = await response.json();
        setQuizAttempts((prevAttempts) => {
          const nextAttempts = Array.isArray(prevAttempts)
            ? [savedAttempt, ...prevAttempts]
            : [savedAttempt];
          recalcProgress(nextAttempts);
          return nextAttempts;
        });
        // Persist passed subject locally to drive dashboard badges
        try {
          if (
            savedAttempt &&
            savedAttempt.passed &&
            typeof savedAttempt.subject === 'string'
          ) {
            const raw = localStorage.getItem('passedSubjects');
            const arr = raw ? JSON.parse(raw) : [];
            const set = new Set(Array.isArray(arr) ? arr : []);
            set.add(savedAttempt.subject);
            localStorage.setItem(
              'passedSubjects',
              JSON.stringify(Array.from(set))
            );
          }
        } catch (e) {
          console.warn('Unable to update passedSubjects in localStorage:', e);
        }
      } catch (error) {
        console.error('Failed to save quiz attempt:', error);
      }
    },
    [authToken, currentUser, recalcProgress]
  );

  useEffect(() => {
    const storedToken = localStorage.getItem('appToken');
    if (!storedToken) {
      return;
    }

    // Try to get user ID from token to load per-user cache
    let cachedUser = null;
    try {
      // First, try to get any stored user to extract ID
      const genericStoredUser = localStorage.getItem('appUser');
      if (genericStoredUser) {
        const parsedGeneric = JSON.parse(genericStoredUser);
        if (parsedGeneric && parsedGeneric.id) {
          // Now load from per-user key
          const perUserKey = `appUser:${parsedGeneric.id}`;
          const perUserData = localStorage.getItem(perUserKey);
          if (perUserData) {
            cachedUser = JSON.parse(perUserData);
          } else {
            // Migrate from generic to per-user key
            cachedUser = parsedGeneric;
            localStorage.setItem(perUserKey, JSON.stringify(cachedUser));
          }
        }
      }
    } catch (error) {
      console.error('Failed to load cached user:', error);
    }

    if (!cachedUser) {
      return;
    }

    try {
      const profile = ensureUserProfile(cachedUser);
      if (profile) {
        currentUserRef.current = profile;
        setCurrentUser(profile);
        setAuthToken(storedToken);
        const isStudent =
          profile.role !== 'superAdmin' &&
          profile.role !== 'orgAdmin' &&
          profile.role !== 'instructor';
        if (isStudent) {
          // Check if user needs to join an organization
          if (!profile.organization_id) {
            setShowJoinOrgModal(true);
          } else {
            setShowJoinOrgModal(false);
            const customNameSet = localStorage.getItem(
              `customNameSet_${profile.id}`
            );
            if (!customNameSet) {
              setShowNamePrompt(true);
            }
            loadQuizAttempts(storedToken);
          }
        } else {
          setShowNamePrompt(false);
          setShowJoinOrgModal(false);
        }
      }
    } catch (error) {
      console.error('Failed to restore stored user:', error);
      localStorage.removeItem('appUser');
      localStorage.removeItem('appToken');
      setAuthToken(null);
    }
  }, [loadQuizAttempts]);

  const handleLogin = (user, token) => {
    if (!token) {
      console.error('Login response did not include a token.');
      return;
    }

    const profile = ensureUserProfile(user);
    if (!profile) {
      console.error('Login response did not include a valid user profile.');
      return;
    }

    try {
      // Store in per-user key to prevent cross-account bleeding
      const perUserKey = profile.id
        ? `appUser:${profile.id}`
        : `appUser:${profile.email || 'anonymous'}`;
      localStorage.setItem(perUserKey, JSON.stringify(profile));
      // Keep generic key for backwards compatibility and easy ID lookup
      localStorage.setItem('appUser', JSON.stringify(profile));
      localStorage.setItem('appToken', token);
    } catch (error) {
      console.warn('Unable to persist login locally:', error);
    }

    setAuthToken(token);
    const isAdminUser =
      profile.role === 'superAdmin' ||
      profile.role === 'orgAdmin' ||
      profile.role === 'instructor';

    if (welcomeTimeoutRef.current) {
      clearTimeout(welcomeTimeoutRef.current);
    }
    if (welcomeFadeTimeoutRef.current) {
      clearTimeout(welcomeFadeTimeoutRef.current);
    }

    if (!isAdminUser) {
      const firstName = (() => {
        if (profile?.name) {
          const trimmed = profile.name.trim();
          if (trimmed) {
            return trimmed.split(/\s+/)[0];
          }
        }
        if (profile?.email) {
          const [emailName] = profile.email.split('@');
          return emailName || '';
        }
        return '';
      })();

      setWelcomeName(firstName);
      setWelcomeFading(false);
      setShowWelcomeSplash(true);

      if (typeof window !== 'undefined') {
        welcomeFadeTimeoutRef.current = window.setTimeout(() => {
          setWelcomeFading(true);
        }, 2200);
        welcomeTimeoutRef.current = window.setTimeout(() => {
          setShowWelcomeSplash(false);
          setWelcomeFading(false);
        }, 3000);
      }
    } else {
      setShowWelcomeSplash(false);
      setWelcomeFading(false);
      setWelcomeName('');
    }

    currentUserRef.current = profile;
    setCurrentUser(profile);
    setSubjectEdits(createEmptySubjectEdits());
    setProfileError(null);
    setQuizAttempts([]);
    recalcProgress([]);

    // CRITICAL FIX: Load fresh profile from server after login to ensure
    // the display name and other profile data is current from the database
    loadProfileOnce().catch((err) => {
      console.warn('Failed to load profile after login:', err);
    });

    if (!isAdminUser) {
      // Check if user needs to join an organization
      if (!profile.organization_id) {
        setShowJoinOrgModal(true);
        setShowNamePrompt(false);
      } else {
        setShowJoinOrgModal(false);
        const customNameSet = localStorage.getItem(
          `customNameSet_${profile.id}`
        );
        if (!customNameSet) {
          setShowNamePrompt(true);
        }
        loadQuizAttempts(token);
      }
    } else {
      setShowNamePrompt(false);
      setShowJoinOrgModal(false);
    }

    setView('start');
  };

  const handleSaveName = async (firstName, lastName) => {
    const newName = `${firstName} ${lastName}`.trim();
    if (!newName) {
      alert('Please enter both a first and last name.');
      return;
    }
    const token =
      authToken ||
      (typeof window !== 'undefined' && window.localStorage
        ? window.localStorage.getItem('appToken')
        : null);
    if (token) {
      try {
        // Use new /api/me/name endpoint that updates first_name, last_name, display_name
        const resp = await fetchJSON(`${API_BASE_URL}/api/me/name`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            displayName: newName,
          }),
        });

        if (resp?.user) {
          const updatedProfile = ensureUserProfile(resp.user);

          // Update local state
          setLocalProfile((prev) => ({
            ...prev,
            profile: { ...prev.profile, ...updatedProfile },
          }));
          setCurrentUser(updatedProfile);
          setNameDraft(updatedProfile.display_name || updatedProfile.name);

          // Update per-user localStorage
          if (updatedProfile.id) {
            const perUserKey = `appUser:${updatedProfile.id}`;
            localStorage.setItem(perUserKey, JSON.stringify(updatedProfile));
            localStorage.setItem('appUser', JSON.stringify(updatedProfile));
            localStorage.setItem(`customNameSet_${updatedProfile.id}`, 'true');
          }

          setShowNamePrompt(false);
          return;
        }
      } catch (err) {
        console.warn(
          'Server name save failed from modal; falling back to local:',
          err
        );
      }
    }
    const saved = saveDisplayName(newName);
    if (saved) {
      setNameDraft(saved);
    }
    setShowNamePrompt(false);
  };

  const handleDismissNamePrompt = () => {
    setShowNamePrompt(false);
  };

  const handleJoinOrganization = (updatedUser) => {
    // User successfully joined an organization
    const profile = ensureUserProfile(updatedUser);
    if (profile) {
      try {
        // Store in per-user key
        if (profile.id) {
          const perUserKey = `appUser:${profile.id}`;
          localStorage.setItem(perUserKey, JSON.stringify(profile));
        }
        localStorage.setItem('appUser', JSON.stringify(profile));
      } catch (error) {
        console.warn('Unable to persist updated user locally:', error);
      }

      currentUserRef.current = profile;
      setCurrentUser(profile);
      setShowJoinOrgModal(false);

      // Now check if we need to show name prompt
      const isStudent =
        profile.role !== 'superAdmin' &&
        profile.role !== 'orgAdmin' &&
        profile.role !== 'instructor';
      if (isStudent) {
        const customNameSet = localStorage.getItem(
          `customNameSet_${profile.id}`
        );
        if (!customNameSet) {
          setShowNamePrompt(true);
        }
        if (authToken) {
          loadQuizAttempts(authToken);
        }
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('appUser');
    localStorage.removeItem('appToken');
    setCurrentUser(null);
    setAuthToken(null);
    setQuizAttempts([]);
    recalcProgress([]);
    setShowNamePrompt(false);
    setShowJoinOrgModal(false);
    setSubjectEdits(createEmptySubjectEdits());
    setProfileError(null);
    setProfileLoading(false);
    setOnboardingComplete(true);
    setNameDraft('');
    setNameStatus('');
    setNameSaving(false);
    currentUserRef.current = null;
    if (welcomeTimeoutRef.current) {
      clearTimeout(welcomeTimeoutRef.current);
    }
    if (welcomeFadeTimeoutRef.current) {
      clearTimeout(welcomeFadeTimeoutRef.current);
    }
    setShowWelcomeSplash(false);
    setWelcomeFading(false);
    setWelcomeName('');
    setSettingsStatus('');
    setSettingsSaving(false);
    if (window.google && google.accounts.id) {
      google.accounts.id.disableAutoSelect();
    }
  };

  const handleGenerateComprehensiveExam = async (subject) => {
    setIsLoading(true);
    setLoadingMessage(`Generating your comprehensive ${subject} exam...`);
    setActiveQuiz(null);

    try {
      const response = await fetch(`${API_BASE_URL}/generate-quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: subject,
          topic: 'Comprehensive Exam',
          comprehensive: true,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(
          err.error || `Request failed with status ${response.status}`
        );
      }

      const examData = await response.json();
      startQuiz(examData, subject);
    } catch (err) {
      console.error('Failed to generate exam:', err);
      alert('Failed to generate exam: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let intervalId = null;
    let countdownId = null;

    if (isLoading) {
      // Reset countdown and overtime message
      setCountdownSeconds(180); // 3 minutes
      setShowOvertimeMessage(false);

      // Set up revolving prompts
      let currentIndex = 0;
      setRevolvingPrompt(SMITHING_PROMPTS[currentIndex]);

      intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % SMITHING_PROMPTS.length;
        setRevolvingPrompt(SMITHING_PROMPTS[currentIndex]);
      }, 2500);

      // Set up countdown timer (updates every second)
      countdownId = setInterval(() => {
        setCountdownSeconds((prev) => {
          if (prev <= 0) {
            setShowOvertimeMessage(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (countdownId) {
        clearInterval(countdownId);
      }
    };
  }, [isLoading]);

  useEffect(() => {
    window.test_setShowNamePrompt = setShowNamePrompt;
    return () => {
      if (window.test_setShowNamePrompt === setShowNamePrompt) {
        window.test_setShowNamePrompt = undefined;
      }
    };
  }, []);

  const normalizeQuestionList = React.useCallback((list) => {
    if (!Array.isArray(list)) {
      return [];
    }
    return list
      .filter((item) => item && typeof item === 'object')
      .map((item) => ({
        ...item,
        answerOptions: shuffleArray(
          Array.isArray(item.answerOptions) ? item.answerOptions : []
        ),
      }));
  }, []);

  const startQuiz = React.useCallback(
    (quizPayload, subject) => {
      console.log('Starting quiz with data:', quizPayload); // Debugging line

      if (!quizPayload || typeof quizPayload !== 'object') {
        console.error('Received invalid quiz payload:', quizPayload);
        alert('Sorry, the generated quiz data was invalid. Please try again.');
        return;
      }

      if (quizPayload.type === 'essay') {
        setActiveQuiz({ ...quizPayload, subject });
        setView('essay');
        return;
      }

      if (quizPayload.type === 'simulation') {
        setActiveQuiz({ ...quizPayload, subject });
        setView('simulation');
        return;
      }

      if (
        quizPayload.type === 'graphing_tool' ||
        quizPayload.type === 'geometry_practice_tool'
      ) {
        openMathTools(
          quizPayload.type === 'graphing_tool' ? 'graphing' : 'geometry'
        );
        setActiveQuiz(null);
        setView('start');
        return;
      }

      // Push current nav state so Back returns here (include quiz context)
      setNavHistory((prev) => [
        ...prev,
        {
          activeView,
          view,
          selectedSubject,
          selectedCategory,
          activeQuiz,
          quizResults,
        },
      ]);

      const preparedQuiz = { ...quizPayload, subject };
      preparedQuiz.quizCode =
        quizPayload.quizCode ||
        quizPayload.code ||
        quizPayload.id ||
        preparedQuiz.quizCode ||
        null;
      // Preserve incoming isPremade if explicitly provided; otherwise infer from presence of a quizCode
      if (typeof preparedQuiz.isPremade !== 'boolean') {
        preparedQuiz.isPremade = Boolean(preparedQuiz.quizCode);
      }
      let normalizedQuestions = normalizeQuestionList(quizPayload.questions);

      if (quizPayload.type === 'multi-part-math') {
        let part1 = normalizeQuestionList(quizPayload.part1_non_calculator);
        let part2 = normalizeQuestionList(quizPayload.part2_calculator);

        if (!part1.length && normalizedQuestions.length) {
          part1 = normalizedQuestions.slice(0, 5);
        }
        if (!part2.length && normalizedQuestions.length) {
          part2 = normalizedQuestions.slice(part1.length || 5);
        }

        if (!part1.length || !part2.length) {
          console.error(
            'Incomplete multi-part math payload received:',
            quizPayload
          );
          alert('The generated math exam was incomplete. Please try again.');
          return;
        }

        preparedQuiz.part1_non_calculator = part1.map((q) => ({
          ...q,
          isPremade: q.isPremade === true || preparedQuiz.isPremade,
        }));
        preparedQuiz.part2_calculator = part2.map((q) => ({
          ...q,
          isPremade: q.isPremade === true || preparedQuiz.isPremade,
        }));
        normalizedQuestions = [...part1, ...part2];
      } else if (quizPayload.type === 'multi-part-rla') {
        const part1 = normalizeQuestionList(quizPayload.part1_reading);
        const part3 = normalizeQuestionList(quizPayload.part3_language);
        const essay = quizPayload.part2_essay;

        const hasEssayContent =
          essay &&
          typeof essay === 'object' &&
          Array.isArray(essay.passages) &&
          essay.passages.length >= 2 &&
          typeof essay.prompt === 'string';

        if (!part1.length || !part3.length || !hasEssayContent) {
          console.error(
            'Incomplete multi-part RLA payload received:',
            quizPayload
          );
          alert('The generated RLA exam was incomplete. Please try again.');
          return;
        }

        preparedQuiz.part1_reading = part1.map((q) => ({
          ...q,
          isPremade: q.isPremade === true || preparedQuiz.isPremade,
        }));
        preparedQuiz.part3_language = part3.map((q) => ({
          ...q,
          isPremade: q.isPremade === true || preparedQuiz.isPremade,
        }));
        preparedQuiz.part2_essay = essay;
        normalizedQuestions = [...part1, ...part3];
      }

      if (!normalizedQuestions.length) {
        console.error(
          'Quiz payload did not include any valid questions:',
          quizPayload
        );
        alert(
          'The generated quiz did not include any questions. Please try again.'
        );
        return;
      }

      preparedQuiz.questions = normalizedQuestions.map((q) => ({
        ...q,
        isPremade: q.isPremade === true || preparedQuiz.isPremade,
      }));

      setActiveQuiz(preparedQuiz);
      // For any multi-part quiz, the view should be 'quiz' so the main QuizRunner can handle routing.
      const requiresStandardView =
        preparedQuiz.type === 'multi-part-rla' ||
        preparedQuiz.type === 'multi-part-math';

      // Treat premade-composite like a normal quiz view
      const normalizedType =
        preparedQuiz.type === 'reading' ||
        preparedQuiz.type === 'premade-composite'
          ? 'quiz'
          : preparedQuiz.type || 'quiz';

      const viewType = requiresStandardView ? 'quiz' : normalizedType;

      // Final safety: if somehow unknown, default to quiz so UI flips correctly
      const allowedViews = [
        'quiz',
        'reading',
        'essay',
        'simulation',
        'mathTools',
        'start',
        'results',
        'dashboard',
      ];
      setView(allowedViews.includes(viewType) ? viewType : 'quiz');
    },
    [
      normalizeQuestionList,
      openMathTools,
      setActiveQuiz,
      setView,
      setNavHistory,
      activeView,
      view,
      selectedSubject,
      selectedCategory,
      activeQuiz,
      quizResults,
    ]
  );

  // Expose quiz launcher so late coach helpers can always reach it
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__GED_START_QUIZ__ = startQuiz;
    }
  }, [startQuiz]);

  const onQuizComplete = async (results) => {
    // Build category breakdown before storing results
    let categoryBreakdown = [];
    try {
      const quizObj = results.quiz || activeQuiz || {};
      const questions = Array.isArray(quizObj?.questions)
        ? quizObj.questions
        : [];
      const answers = Array.isArray(results?.answers) ? results.answers : [];
      if (questions.length) {
        const normalizeAnswer = (val) => {
          if (val === null || val === undefined) return '';
          return String(val)
            .replace(/\u00A0/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        };
        const isNumericEqual = (a, b) => {
          const na = Number(a);
          const nb = Number(b);
          if (!Number.isFinite(na) || !Number.isFinite(nb)) return false;
          return Math.abs(na - nb) < 1e-9;
        };
        const tally = {};
        questions.forEach((q, i) => {
          const category =
            (q.category && String(q.category).trim()) ||
            (q.subtopic && String(q.subtopic).trim()) ||
            (q.topic && String(q.topic).trim()) ||
            (q.type && String(q.type).trim()) ||
            'Uncategorized';
          if (!tally[category]) tally[category] = { correct: 0, total: 0 };
          tally[category].total++;
          const userAns = answers[i];
          let isCorrect = false;
          if (Array.isArray(q.answerOptions) && q.answerOptions.length) {
            const correctOpt = q.answerOptions.find(
              (opt) => opt && opt.isCorrect
            );
            if (correctOpt) {
              isCorrect =
                normalizeAnswer(userAns) === normalizeAnswer(correctOpt.text);
            }
          } else {
            const user = normalizeAnswer(userAns);
            const key = normalizeAnswer(q.correctAnswer);
            isCorrect =
              !!user && !!key && (user === key || isNumericEqual(user, key));
          }
          if (isCorrect) tally[category].correct++;
        });
        categoryBreakdown = Object.entries(tally).map(([cat, data]) => ({
          category: cat,
          correct: data.correct,
          total: data.total,
          percent: data.total
            ? Math.round((data.correct / data.total) * 100)
            : 0,
        }));
      }
    } catch (e) {
      console.warn(
        '[quiz] failed to build category breakdown:',
        e?.message || e
      );
    }
    const augmentedResults = { ...results, categoryBreakdown };
    setQuizResults(augmentedResults);
    setView('results');

    if (results.quiz) {
      setActiveQuiz(results.quiz);
    }

    const { subject } = results;

    // Build per-question responses (correct + challenge_tags) when we have answers/questions
    let responses = [];
    try {
      const quizObj = results.quiz || activeQuiz || {};
      const questions = Array.isArray(quizObj?.questions)
        ? quizObj.questions
        : [];
      const answers = Array.isArray(results?.answers) ? results.answers : [];
      if (
        questions.length &&
        answers.length &&
        questions.length === answers.length
      ) {
        const normalizeAnswer = (val) => {
          if (val === null || val === undefined) return '';
          return String(val)
            .replace(/^\$+|\$+$/g, '')
            .replace(/\u00A0/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        };
        const isNumericEqual = (a, b) => {
          const na = Number(a);
          const nb = Number(b);
          if (!Number.isFinite(na) || !Number.isFinite(nb)) return false;
          return Math.abs(na - nb) < 1e-9;
        };
        responses = questions.map((q, i) => {
          const userAns = answers[i];
          let correct = false;
          if (!q.answerOptions || q.answerOptions.length === 0) {
            // fill-in or numeric
            const user = normalizeAnswer(userAns);
            const key = normalizeAnswer(q.correctAnswer);
            correct =
              !!user && !!key && (user === key || isNumericEqual(user, key));
          } else {
            const correctOpt = findCorrectOption(q.answerOptions);
            correct = !!correctOpt && userAns === correctOpt.text;
          }
          const tags = Array.isArray(q.challenge_tags) ? q.challenge_tags : [];
          return { correct, challenge_tags: tags };
        });
      }
    } catch (e) {
      console.warn(
        '[quiz] failed to build responses payload:',
        e?.message || e
      );
    }

    // For Practice Session/Pop Quiz, skip attempt history but still ingest challenge responses
    if (subject === 'Pop Quiz' || subject === 'Practice Session') {
      try {
        const token =
          (typeof localStorage !== 'undefined' &&
            localStorage.getItem('appToken')) ||
          null;
        if (token && responses.length) {
          await fetch(`${API_BASE_URL}/api/challenges/ingest-responses`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              responses,
              source: subject === 'Pop Quiz' ? 'pop_quiz' : 'practice',
            }),
          });
        }
      } catch (e) {
        console.warn('[practice] failed to ingest responses:', e?.message || e);
      }
      return;
    }

    const quizDetails = results.quiz || activeQuiz;
    if (!quizDetails) {
      return;
    }

    const quizCode =
      quizDetails.quizCode || quizDetails.code || quizDetails.id || null;
    if (!quizCode) {
      return;
    }

    // Persist to local progress history
    persistQuizAttempt({
      subject,
      quizCode,
      quizTitle:
        quizDetails.title || quizDetails.topicTitle || 'GED® Practice Exam',
      quizType: quizDetails.type,
      score: results.score,
      totalQuestions: results.totalQuestions,
      scaledScore: results.scaledScore,
      passed:
        typeof results.scaledScore === 'number'
          ? results.scaledScore >= GED_PASSING_SCORE
          : undefined,
    });

    // Also POST to backend for challenge-tag processing if authenticated
    try {
      const token =
        (typeof localStorage !== 'undefined' &&
          localStorage.getItem('appToken')) ||
        null;
      if (token) {
        const payload = {
          subject,
          quizCode,
          quizTitle:
            quizDetails.title || quizDetails.topicTitle || 'GED® Practice Exam',
          quizType: quizDetails.type,
          score: results.score,
          totalQuestions: results.totalQuestions,
          scaledScore: results.scaledScore,
          passed:
            typeof results.scaledScore === 'number'
              ? results.scaledScore >= GED_PASSING_SCORE
              : undefined,
          ...(responses.length ? { responses } : {}),
          ...(quizDetails && (quizDetails.assigned_by || quizDetails.assignedBy)
            ? { assigned_by: quizDetails.assigned_by || quizDetails.assignedBy }
            : {}),
        };
        await fetch(`${API_BASE_URL}/api/quiz-attempts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }
    } catch (e) {
      console.warn(
        '[quiz] failed to POST /api/quiz-attempts:',
        e?.message || e
      );
    }
  };

  const handleStartPopQuiz = () => {
    // Open the Practice Session modal (renamed feature)
    setShowPracticeModal(true);
  };

  const navigateHome = useCallback(() => {
    setActiveQuiz(null);
    setQuizResults(null);
    setActiveGenerator(null);
    goToDashboard();
  }, [goToDashboard]);

  const handleShowProfileView = useCallback(() => {
    goToProfile();
  }, [goToProfile]);

  const handleShowSettingsView = useCallback(() => {
    goToSettings();
  }, [goToSettings]);

  const handleReviewMarked = (markedQuestions, subject) => {
    const reviewQuiz = {
      id: 'review_quiz_' + new Date().getTime(),
      title: 'Review Marked Questions',
      questions: markedQuestions.map((q, index) => ({
        ...q,
        questionNumber: index + 1,
      })),
    };
    startQuiz(reviewQuiz, subject || 'Review');
  };

  const renderView = () => {
    if (!currentUser) {
      return <AuthScreen onLogin={handleLogin} />;
    }
    // Use Enhanced Admin Shell for all admin roles
    const adminRoles = ['superAdmin', 'orgAdmin', 'instructor', 'teacher'];
    if (adminRoles.includes(currentUser.role)) {
      return (
        <AdminView
          user={currentUser}
          token={authToken}
          onLogout={handleLogout}
        />
      );
    }

    switch (view) {
      case 'quiz':
        return (
          <QuizRunner
            quiz={activeQuiz}
            onComplete={onQuizComplete}
            onExit={goBack}
          />
        );
      case 'reading':
        return (
          <ReadingPractice
            quiz={activeQuiz}
            onComplete={onQuizComplete}
            onExit={goBack}
          />
        );
      case 'essay':
        return <EssayGuide onExit={goBack} />;
      case 'simulation':
        return activeQuiz &&
          (activeQuiz.id === 'sim_life' ||
            activeQuiz.title === 'The Game of Life') ? (
          <div className="fade-in" data-subject="Simulations">
            <div
              className="rounded-2xl overflow-hidden shadow-xl mb-4"
              style={{ background: 'var(--subject-simulations-gradient)' }}
            >
              <header className="flex flex-wrap items-center justify-between gap-3 p-4 text-white">
                <div className="flex-none min-w-[120px]">
                  <button
                    onClick={goBack}
                    className="inline-flex items-center gap-2 text-sm font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md"
                  >
                    <ArrowLeftIcon />
                    <span>Back</span>
                  </button>
                </div>
                <h2 className="text-2xl font-extrabold text-center flex-1">
                  The Game of Life
                </h2>
                <div
                  className="flex-none min-w-[120px]"
                  aria-hidden="true"
                ></div>
              </header>
            </div>
            <div
              className="panel-surface rounded-xl p-2 border"
              style={{
                borderColor: 'var(--subject-simulations-border)',
                backgroundColor: 'white',
              }}
            >
              <LifeChoicesSimulation srcPath="Game of Life/The Game of life.html" />
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600 text-white p-8 sm:p-10 text-center shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.25),_transparent_55%)] pointer-events-none"></div>
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-9 h-9"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l3.5 3.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-extrabold">
                  Interactive Simulation
                </h1>
                <p className="mt-3 text-lg text-orange-50/90 max-w-xl">
                  Choose a simulation from the dashboard to get started.
                </p>
              </div>
              <button
                onClick={goBack}
                className="px-6 py-2.5 rounded-full bg-white text-orange-600 font-semibold shadow-lg transition hover:shadow-xl hover:bg-orange-50"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
      case 'results':
        return (
          <ResultsScreen
            results={quizResults}
            quiz={activeQuiz}
            onRestart={() => startQuiz(activeQuiz, activeQuiz.subject)}
            onHome={navigateHome}
            onReviewMarked={handleReviewMarked}
          />
        );
      case 'generator':
        return (
          <AIQuizGenerator
            {...activeGenerator}
            onQuizGenerated={(quiz) => startQuiz(quiz, activeGenerator.subject)}
            onExit={navigateHome}
          />
        );
      case 'profile':
        // Deprecated path: use activeView under 'start'. Keep for backward safety but route to start/profile
        goToProfile();
        return null;
      case 'settings':
        // Deprecated path: use activeView under 'start'. Keep for backward safety but route to start/settings
        goToSettings();
        return null;
      case 'mathTools':
        return (
          <MathPracticeToolsPage
            onExit={navigateHome}
            activeTab={mathToolsActiveTab}
            onTabChange={setMathToolsActiveTab}
            graphingNode={mathToolsNodes ? mathToolsNodes.graphing : null}
            geometryNode={mathToolsNodes ? mathToolsNodes.geometry : null}
          />
        );
      case 'start':
      default: {
        // Route within the dashboard container based on activeView
        if (activeView === 'profile') {
          return (
            <ProfileViewWrapper
              loading={profileLoading}
              error={profileError}
              data={profileData}
              nameDraft={nameDraft}
              onNameDraftChange={handleNameDraftChange}
              onSubmitName={handleProfileNameSubmit}
              nameSaving={nameSaving}
              nameStatus={nameStatus}
              onRefresh={handleProfileRefresh}
              onBack={goToDashboard}
              onSaveAll={handleSaveAllProfile}
              savingAll={savingAll}
              subjectEdits={subjectEdits}
              onSubjectFieldChange={handleSubjectFieldChange}
              onSubjectSave={handleSaveSubject}
              testSaving={testSaving}
              onSaveChallenges={handleSaveChallenges}
              onToggleChallenge={toggleChallengeSelection}
              challengesSaving={challengesSaving}
              onFinishOnboarding={handleFinishOnboarding}
              onCompleteLater={handleCompleteOnboardingLater}
              finishingOnboarding={finishingOnboarding}
              onboardingComplete={onboardingComplete}
            />
          );
        }
        if (activeView === 'settings') {
          return (
            <SettingsViewWrapper
              preferences={preferences}
              onApply={handleSettingsInstantChange}
              onSave={handlePersistPreferences}
              saving={settingsSaving}
              status={settingsStatus}
              onBack={goToDashboard}
              loading={profileLoading}
            />
          );
        }
        if (activeView === 'homeroom') {
          return (
            <HomeroomView
              user={currentUser}
              onNavigate={(path, params) => {
                // Handle navigation from dashboard
                if (path.startsWith('/quiz/')) {
                  const quizId = path.split('/')[2];
                  // Find and start the quiz
                  // For now, navigate back to dashboard
                  goToDashboard();
                } else if (path.startsWith('/practice/')) {
                  const subject = path.split('/')[2];
                  selectSubject(subject);
                  goToDashboard();
                } else if (path === '/exam-history') {
                  navigateTo('progress');
                } else if (path === '/workforce') {
                  navigateTo('workforce');
                } else {
                  goToDashboard();
                }
              }}
            />
          );
        }
        if (activeView === 'workforce') {
          return <WorkforceView onBack={goToDashboard} />;
        }
        // Dashboard, Quizzes, Progress all use the StartScreen container; scrolling is handled by pendingScrollTarget
        return (
          <DashboardView
            currentUser={currentUser}
            onLogout={handleLogout}
            progress={progress}
            profileBundle={profileData}
            testDate={profileTestDate}
            onboardingComplete={onboardingComplete}
            onShowProfile={handleShowProfileView}
            onSelectQuiz={startQuiz}
            vocabulary={vocabulary}
            onRefreshProfile={loadProfileOnce}
            onStartPopQuiz={handleStartPopQuiz}
            onStartComprehensiveExam={handleGenerateComprehensiveExam}
            setIsLoading={setIsLoading}
            setLoadingMessage={setLoadingMessage}
            setShowFormulaSheet={setShowFormulaSheet}
            onOpenMathTools={openMathTools}
            theme={preferences.theme}
            selectedSubject={selectedSubject}
            selectedCategory={selectedCategory}
            onSelectSubject={selectSubject}
            onSelectCategory={selectCategory}
            onBack={goBack}
            onOpenWorkforce={() => navigateTo('workforce')}
            onSelectGenerator={async (
              subject,
              topic,
              setIsLoading,
              setLoadingMessage
            ) => {
              if (!topic) {
                alert('Please select a topic first.');
                return;
              }
              const subjectParam = resolveSubjectParam(subject);
              if (!subjectParam) {
                alert('Sorry, this subject is not supported yet.');
                return;
              }
              setLoadingMessage(
                'Please give us a moment to smith this for you...'
              );
              setIsLoading(true);

              try {
                const questions = await generateTopicQuiz(subjectParam, topic);

                if (!questions.length) {
                  throw new Error('The quiz service returned an empty quiz.');
                }

                const generatedQuiz = {
                  subject,
                  topic,
                  id: `ai_${Date.now()}`,
                  title: `${subject} Quiz: ${topic}`,
                  questions,
                  // Enable formula sheet for Math & Science topic quizzes
                  config: {
                    formulaSheet: subject === 'Math' || subject === 'Science',
                  },
                };

                startQuiz(generatedQuiz, subject);
              } catch (err) {
                console.error('Error generating quiz:', err);
                alert(`Sorry, something went wrong. ${err.message}`);
              } finally {
                setIsLoading(false);
              }
            }}
          />
        );
      }
    }
  };

  const mathToolsNodes = useMemo(() => {
    if (!mathToolsInitialized) {
      return null;
    }
    return {
      graphing: <GraphingTool key="math-tools-graphing" />,
      geometry: <GeometryPracticeTool key="math-tools-geometry" />,
    };
  }, [mathToolsInitialized]);

  return (
    <>
      {showWelcomeSplash && (
        <div
          className={`fixed inset-0 z-[60] flex flex-col items-center justify-center text-white transition-opacity duration-700 ${
            welcomeFading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundColor: 'var(--modal-overlay)' }}
        >
          <img
            src="Logo.svg"
            alt="Kingmakerconsults logo"
            className="w-4/5 max-w-4xl h-auto object-contain drop-shadow-2xl"
          />
          <p className="mt-8 text-3xl sm:text-4xl font-semibold tracking-wide">
            Welcome{welcomeName ? `, ${welcomeName}!` : '!'}
          </p>
        </div>
      )}
      <div
        className="min-h-screen flex flex-col transition-colors"
        style={{
          backgroundColor: 'var(--bg-page)',
          color: 'var(--text-primary)',
        }}
        aria-hidden={showJoinOrgModal}
      >
        <AppHeader
          currentUser={currentUser}
          onLogout={handleLogout}
          onShowHome={goToDashboard}
          onShowProfile={goToProfile}
          onShowSettings={goToSettings}
          onShowQuizzes={goToQuizzes}
          onShowProgress={goToProgress}
          activePanel={
            activeView === 'profile'
              ? 'profile'
              : activeView === 'settings'
              ? 'settings'
              : null
          }
          theme={preferences.theme}
          onToggleTheme={toggleThemePreference}
        />
        {isLoading && (
          <div
            className="fade-in fixed inset-0 w-full h-full flex flex-col items-center justify-center z-50 text-center px-4"
            style={{ backgroundColor: 'var(--modal-overlay)' }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Loading...</h2>
            <p className="text-xl text-sky-300 mb-2">{loadingMessage}</p>
            <p className="text-lg text-slate-300 italic h-8 transition-opacity duration-500">
              {revolvingPrompt}
            </p>
            {/* Countdown Timer */}
            <div className="mt-6 mb-2">
              {!showOvertimeMessage ? (
                <div className="text-2xl font-mono text-cyan-400">
                  {Math.floor(countdownSeconds / 60)}:
                  {String(countdownSeconds % 60).padStart(2, '0')}
                </div>
              ) : (
                <p className="text-lg text-yellow-300 italic animate-pulse">
                  The smith is taking care ensuring you the best possible
                  product, shouldn't be long
                </p>
              )}
            </div>
            {/* Optional: Add a spinner element here */}
          </div>
        )}
        {showFormulaSheet && (
          <FormulaSheetModal onClose={() => setShowFormulaSheet(false)} />
        )}
        {showJoinOrgModal && (
          <JoinOrganizationModal
            onJoin={handleJoinOrganization}
            authToken={authToken}
          />
        )}
        {showNamePrompt && (
          <NamePromptModal
            user={currentUser}
            onSave={handleSaveName}
            onDismiss={handleDismissNamePrompt}
          />
        )}
        {showPracticeModal && (
          <PracticeSessionModal
            defaultMode="balanced"
            defaultDuration={10}
            onDismiss={() => setShowPracticeModal(false)}
            onStart={async ({ mode, durationMinutes }) => {
              const payload = { mode, durationMinutes };
              const resp = await fetchJSON(
                `${API_BASE_URL}/api/practice-session`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                }
              );
              if (
                !resp ||
                !Array.isArray(resp.questions) ||
                resp.questions.length === 0
              ) {
                throw new Error('Practice session is not available right now.');
              }
              const practiceQuiz = {
                id: 'practice_' + Date.now(),
                title: 'Practice Session',
                // Mark practice session questions as premade so sanitized math renders with KaTeX
                isPremade: true,
                questions: resp.questions.map((q, i) => ({
                  ...q,
                  isPremade: true,
                  questionNumber: i + 1,
                })),
                timeLimit: Number(resp.durationMinutes || durationMinutes) * 60,
              };
              startQuiz(practiceQuiz, 'Practice Session');
              setShowPracticeModal(false);
            }}
          />
        )}
        <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 pt-[4.5rem] space-y-8 text-slate-900 dark:text-slate-100 transition-colors duration-300">
          <div className="content-card bg-white dark:bg-slate-900/90 border border-slate-200/70 dark:border-slate-700/70 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 transition-all duration-300 relative">
            {renderView()}
          </div>
        </main>
        <footer className="w-full flex flex-col items-center gap-3 text-xs sm:text-sm text-slate-500 pb-6">
          <img
            src="Logo.svg"
            alt="Kingmakerconsults logo"
            className="h-48 w-auto object-contain"
          />
          <p>Kingmakerconsults Copyright </p>
        </footer>
      </div>
    </>
  );
}

// Expose view components to window globals for view wrappers
if (typeof window !== 'undefined') {
  // Components will be exposed after they're defined below
}

// --- VIEWS & COMPONENTS ---

function RecentScoresPanel({
  summary,
  legacyScores,
  loading,
  title = 'Recent Scores',
}) {
  if (loading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        <p className="text-sm text-slate-600">Loading…</p>
      </section>
    );
  }

  const hasSummary = summary && Object.keys(summary).length > 0;
  const subjectScores = Array.isArray(summary?.subjects)
    ? summary.subjects
    : [];
  const cardScores = Array.isArray(summary?.cards) ? summary.cards : [];
  const highlightScores = Array.isArray(summary?.highlights)
    ? summary.highlights
    : [];
  const overallValue = summary?.overall ?? summary?.total ?? null;

  const formatScoreValue = (value) => {
    if (value == null) {
      return '–';
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
      return `${Math.round(value)}%`;
    }
    if (typeof value === 'object') {
      if (typeof value.score === 'number') {
        return `${Math.round(value.score)}%`;
      }
      if (typeof value.value === 'number') {
        return `${Math.round(value.value)}%`;
      }
      if (typeof value.display === 'string') {
        return value.display;
      }
    }
    return String(value);
  };

  const renderCard = (item, index, fallbackLabel) => {
    const label =
      item?.subject ||
      item?.name ||
      item?.label ||
      fallbackLabel ||
      `Item ${index + 1}`;
    const primary =
      item?.latest ??
      item?.score ??
      item?.value ??
      item?.percent ??
      item?.percentage ??
      item?.current ??
      null;
    const secondary =
      item?.average ?? item?.avg ?? item?.trend ?? item?.previous ?? null;
    const note = item?.description || item?.note;
    return (
      <div
        key={item?.id || `${label}-${index}`}
        className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        {primary != null && (
          <p className="mt-1 text-2xl font-bold text-slate-800">
            {formatScoreValue(primary)}
          </p>
        )}
        {secondary != null && (
          <p className="text-xs text-slate-500">
            Average: {formatScoreValue(secondary)}
          </p>
        )}
        {note && <p className="mt-1 text-xs text-slate-500">{note}</p>}
      </div>
    );
  };

  if (hasSummary) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        <div className="space-y-4">
          {overallValue != null && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Overall
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {formatScoreValue(overallValue)}
              </p>
            </div>
          )}
          {subjectScores.length ||
          cardScores.length ||
          highlightScores.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {subjectScores.map((item, index) =>
                renderCard(item, index, 'Subject')
              )}
              {cardScores.map((item, index) =>
                renderCard(item, index + subjectScores.length, 'Summary')
              )}
              {highlightScores.map((item, index) =>
                renderCard(
                  item,
                  index + subjectScores.length + cardScores.length,
                  'Highlight'
                )
              )}
            </div>
          ) : null}
          {summary?.lastUpdated && (
            <p className="text-xs text-slate-500">
              Last updated {summary.lastUpdated}
            </p>
          )}
          {overallValue == null &&
            !subjectScores.length &&
            !cardScores.length &&
            !highlightScores.length && (
              <pre className="whitespace-pre-wrap rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs text-slate-500">
                {JSON.stringify(summary, null, 2)}
              </pre>
            )}
        </div>
      </section>
    );
  }

  const subjectRows = Array.isArray(legacyScores?.bySubject)
    ? legacyScores.bySubject
    : [];
  const subtopicRows = Array.isArray(legacyScores?.bySubtopic)
    ? legacyScores.bySubtopic
    : [];

  if (!subjectRows.length && !subtopicRows.length) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        <p className="text-sm text-slate-600">No scores yet.</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      {subjectRows.length ? (
        <div>
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
            By Subject
          </h3>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left font-semibold">
                    Subject
                  </th>
                  <th scope="col" className="px-3 py-2 text-left font-semibold">
                    Latest
                  </th>
                  <th scope="col" className="px-3 py-2 text-left font-semibold">
                    Average
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                {subjectRows.map((row, index) => (
                  <tr key={`${row.subject}-${index}`}>
                    <td className="px-3 py-2 font-medium text-slate-700">
                      {row.subject}
                    </td>
                    <td className="px-3 py-2">
                      {row.latest != null ? `${row.latest}%` : '–'}
                    </td>
                    <td className="px-3 py-2">
                      {row.avg != null ? `${row.avg}%` : '–'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
      {subtopicRows.length ? (
        <div>
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
            By Subtopic
          </h3>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left font-semibold">
                    Subject
                  </th>
                  <th scope="col" className="px-3 py-2 text-left font-semibold">
                    Subtopic
                  </th>
                  <th scope="col" className="px-3 py-2 text-left font-semibold">
                    Latest
                  </th>
                  <th scope="col" className="px-3 py-2 text-left font-semibold">
                    Average
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                {subtopicRows.map((row, index) => (
                  <tr key={`${row.subject}-${row.subtopic}-${index}`}>
                    <td className="px-3 py-2 font-medium text-slate-700">
                      {row.subject}
                    </td>
                    <td className="px-3 py-2">{row.subtopic}</td>
                    <td className="px-3 py-2">
                      {row.latest != null ? `${row.latest}%` : '–'}
                    </td>
                    <td className="px-3 py-2">
                      {row.avg != null ? `${row.avg}%` : '–'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AdminRoleBadge({ role }) {
  const label =
    role === 'superAdmin'
      ? 'Super Admin'
      : role === 'orgAdmin'
      ? 'Organization Admin'
      : role === 'instructor'
      ? 'Instructor'
      : 'Student';
  const palette =
    role === 'superAdmin'
      ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-200'
      : role === 'orgAdmin'
      ? 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200'
      : role === 'instructor'
      ? 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-200'
      : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200';
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${palette}`}
    >
      {label}
    </span>
  );
}

function formatDateTime(value) {
  if (!value) {
    return '–';
  }
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '–';
    }
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch (error) {
    // COMPREHENSIVE ADMIN SUITE COMPONENTS
    // ========================================

    // Modern Admin Dashboard Component - Grid-based, responsive, dark mode ready
    function ModernAdminDashboard({ user, token, studentStats, subjectStats }) {
      const [isDark, setIsDark] = useState(false);

      useEffect(() => {
        // Detect dark mode from HTML data-theme attribute
        const checkTheme = () => {
          const theme = document.documentElement.getAttribute('data-theme');
          setIsDark(theme === 'dark');
        };
        checkTheme();

        // Watch for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['data-theme'],
        });

        return () => observer.disconnect();
      }, []);

      // Default stats if not provided
      const stats = studentStats || {
        activeCount: 0,
        studyTimeHours: 0,
        testReadyCount: 0,
        passedCount: 0,
        totalTests: 0,
      };

      const subjects = subjectStats || {
        Math: { ready: 0, almost: 0, needStudy: 0, avg: 0 },
        Science: { ready: 0, almost: 0, needStudy: 0, avg: 0 },
        RLA: { ready: 0, almost: 0, needStudy: 0, avg: 0 },
        'Social Studies': { ready: 0, almost: 0, needStudy: 0, avg: 0 },
      };

      // Render readiness bar
      const ReadinessBar = ({ label, value, total, color }) => {
        const percentage = total > 0 ? (value / total) * 100 : 0;
        return (
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                {label}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {value}
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: color,
                }}
              />
            </div>
          </div>
        );
      };

      return (
        <div
          className="min-h-screen p-6"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Admin Dashboard
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Welcome back, {user?.name || 'Admin'}
              </p>
            </div>

            {/* Metric Cards - Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Active Students Card */}
              <div
                className="rounded-xl p-6 transition-all duration-200 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  boxShadow: 'var(--shadow-hover)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)' }}
                  >
                    <UsersIcon
                      className="w-6 h-6"
                      style={{ color: '#14b8a6' }}
                    />
                  </div>
                  <span
                    className="text-3xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {stats.activeCount}
                  </span>
                </div>
                <h3
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Active Students
                </h3>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Last 30 days
                </p>
              </div>

              {/* Study Time Card */}
              <div
                className="rounded-xl p-6 transition-all duration-200 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  boxShadow: 'var(--shadow-hover)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  >
                    <ClockIcon
                      className="w-6 h-6"
                      style={{ color: '#3b82f6' }}
                    />
                  </div>
                  <span
                    className="text-3xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {stats.studyTimeHours}h
                  </span>
                </div>
                <h3
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Study Time
                </h3>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Last 30 days
                </p>
              </div>

              {/* Test Ready Card */}
              <div
                className="rounded-xl p-6 transition-all duration-200 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  boxShadow: 'var(--shadow-hover)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                  >
                    <CheckCircleIcon
                      className="w-6 h-6"
                      style={{ color: '#22c55e' }}
                    />
                  </div>
                  <span
                    className="text-3xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {stats.testReadyCount}
                  </span>
                </div>
                <h3
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Test Ready
                </h3>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  GED pass-ready
                </p>
              </div>

              {/* GED Tests Passed Card */}
              <div
                className="rounded-xl p-6 transition-all duration-200 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  boxShadow: 'var(--shadow-hover)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                  >
                    <StarIcon
                      className="w-6 h-6"
                      style={{ color: '#a855f7' }}
                    />
                  </div>
                  <span
                    className="text-3xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {stats.passedCount}/{stats.totalTests || 0}
                  </span>
                </div>
                <h3
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  GED Tests Passed
                </h3>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Last 3 months
                </p>
              </div>
            </div>

            {/* Subject Readiness Section */}
            <div className="mb-8">
              <h2
                className="text-xl font-bold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                GED Readiness by Subject
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(subjects).map(([subjectName, data]) => {
                  const total = data.ready + data.almost + data.needStudy;
                  return (
                    <div
                      key={subjectName}
                      className="rounded-xl p-5"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <h3
                        className="text-lg font-bold mb-4"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {subjectName}
                      </h3>
                      <ReadinessBar
                        label="Ready (≥145)"
                        value={data.ready}
                        total={total}
                        color="#22c55e"
                      />
                      <ReadinessBar
                        label="Almost Ready"
                        value={data.almost}
                        total={total}
                        color="#eab308"
                      />
                      <ReadinessBar
                        label="Need Study"
                        value={data.needStudy}
                        total={total}
                        color="#ef4444"
                      />
                      {data.avg > 0 && (
                        <div
                          className="mt-3 pt-3 border-t"
                          style={{ borderColor: 'var(--border-subtle)' }}
                        >
                          <p
                            className="text-xs"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            Average Score:{' '}
                            <span className="font-semibold">{data.avg}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Tools Section */}
            <div className="mb-8">
              <h2
                className="text-xl font-bold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                Management Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Manage Classes Card */}
                <button
                  className="rounded-xl p-6 text-left transition-all duration-150 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    boxShadow: 'var(--shadow-hover)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow =
                      '0 12px 24px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                  }}
                >
                  <div
                    className="p-3 rounded-lg mb-4 inline-block"
                    style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)' }}
                  >
                    <BookOpenIcon
                      className="w-8 h-8"
                      style={{ color: '#14b8a6' }}
                    />
                  </div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Manage Classes
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Create and organize classes, assign students, and track
                    progress
                  </p>
                </button>

                {/* Manage Students Card */}
                <button
                  className="rounded-xl p-6 text-left transition-all duration-150 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    boxShadow: 'var(--shadow-hover)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow =
                      '0 12px 24px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                  }}
                >
                  <div
                    className="p-3 rounded-lg mb-4 inline-block"
                    style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  >
                    <UsersIcon
                      className="w-8 h-8"
                      style={{ color: '#3b82f6' }}
                    />
                  </div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Manage Students
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Add, edit, and monitor student profiles and performance
                  </p>
                </button>

                {/* View Reports Card */}
                <button
                  className="rounded-xl p-6 text-left transition-all duration-150 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    boxShadow: 'var(--shadow-hover)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow =
                      '0 12px 24px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                  }}
                >
                  <div
                    className="p-3 rounded-lg mb-4 inline-block"
                    style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                  >
                    <BarChart2Icon
                      className="w-8 h-8"
                      style={{ color: '#a855f7' }}
                    />
                  </div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    View Reports
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Access detailed analytics and comprehensive reports
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Legacy Admin Dashboard with analytics overview
    function AdminDashboard({ user, token, onNavigate }) {
      const [readinessData, setReadinessData] = useState(null);
      const [activityData, setActivityData] = useState(null);
      const [gedResultsData, setGedResultsData] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        loadDashboardData();
      }, []);

      const loadDashboardData = async () => {
        try {
          setLoading(true);
          const authToken =
            token ||
            (typeof window !== 'undefined' && window.localStorage
              ? window.localStorage.getItem('appToken')
              : null);

          if (!authToken) {
            console.warn(
              '[AdminDashboard] No token available for admin reports'
            );
            setLoading(false);
            return;
          }

          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          };

          const [readiness, activity, gedResults] = await Promise.all([
            fetchJSON(`${API_BASE_URL}/api/admin/reports/readiness`, {
              headers,
            }),
            fetchJSON(`${API_BASE_URL}/api/admin/reports/activity`, {
              headers,
            }),
            fetchJSON(`${API_BASE_URL}/api/admin/reports/ged-results`, {
              headers,
            }),
          ]);

          setReadinessData(readiness);
          setActivityData(activity);
          setGedResultsData(gedResults);
        } catch (error) {
          console.error('Failed to load dashboard data:', error);
        } finally {
          setLoading(false);
        }
      };

      if (loading) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
              <p className="text-slate-600 dark:text-slate-400">
                Loading dashboard...
              </p>
            </div>
          </div>
        );
      }

      const subjectNames = {
        rla: 'Reading/Language Arts',
        math: 'Math',
        science: 'Science',
        social: 'Social Studies',
      };

      return (
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Welcome back, {user?.name}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-lg">
                  <UsersIcon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  {activityData?.last30Days?.activeStudents || 0}
                </span>
              </div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                Active Students
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                Last 30 days
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                  <ClockIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  {Math.round(
                    (activityData?.last30Days?.totalMinutes || 0) / 60
                  )}
                  h
                </span>
              </div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                Study Time
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                Last 30 days
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                  <TrophyIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  {readinessData?.overall?.ready || 0}
                </span>
              </div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                Test Ready
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                GED pass-ready scores
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                  <StarIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  {gedResultsData?.last3Months?.passed || 0}/
                  {gedResultsData?.last3Months?.total || 0}
                </span>
              </div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                GED Tests Passed
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                Last 3 months
              </p>
            </div>
          </div>

          {/* Readiness by Subject */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <BarChartIcon className="w-5 h-5 mr-2" />
                GED Readiness by Subject
              </h2>
              <button
                onClick={() => onNavigate('admin-reports')}
                className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium"
              >
                View Full Reports →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {readinessData &&
                Object.keys(readinessData.subjects || {}).map((key) => {
                  const subject = readinessData.subjects[key];
                  const total =
                    subject.ready + subject.almostReady + subject.needMoreStudy;

                  return (
                    <div
                      key={key}
                      className="border dark:border-slate-700 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {subjectNames[key]}
                        </h3>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Avg: {subject.meanScore}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">
                            Ready (145+)
                          </span>
                          <span className="font-medium text-green-600 dark:text-green-400">
                            {subject.ready}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{
                              width: `${
                                total > 0 ? (subject.ready / total) * 100 : 0
                              }%`,
                            }}
                          ></div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">
                            Almost Ready (135-144)
                          </span>
                          <span className="font-medium text-yellow-600 dark:text-yellow-400">
                            {subject.almostReady}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{
                              width: `${
                                total > 0
                                  ? (subject.almostReady / total) * 100
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">
                            Need Study (&lt;135)
                          </span>
                          <span className="font-medium text-red-600 dark:text-red-400">
                            {subject.needMoreStudy}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{
                              width: `${
                                total > 0
                                  ? (subject.needMoreStudy / total) * 100
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => onNavigate('admin-classes')}
              className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-left"
            >
              <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-lg w-fit mb-4">
                <BookOpenIcon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Manage Classes
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Create and edit classes, manage rosters
              </p>
            </button>

            <button
              onClick={() => onNavigate('admin-students')}
              className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-left"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg w-fit mb-4">
                <UsersIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Manage Students
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Search, create, and edit student profiles
              </p>
            </button>

            <button
              onClick={() => onNavigate('admin-reports')}
              className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-left"
            >
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg w-fit mb-4">
                <BarChartIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                View Reports
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Analytics, exports, and GED results
              </p>
            </button>
          </div>
        </div>
      );
    }

    // ========================================
    // ROLE-SPECIFIC ADMIN DASHBOARDS
    // ========================================

    // Super Admin Dashboard - Full platform visibility
    function SuperAdminDashboard({ user, token }) {
      const [loading, setLoading] = useState(true);
      const [orgLoading, setOrgLoading] = useState(true);
      const [usersLoading, setUsersLoading] = useState(true);
      const [activityLoading, setActivityLoading] = useState(true);
      const [organizations, setOrganizations] = useState([]); // enriched org list
      const [allUsers, setAllUsers] = useState([]);
      const [recentActivity, setRecentActivity] = useState([]);
      const [roleFilter, setRoleFilter] = useState('');
      const [orgFilter, setOrgFilter] = useState('');
      const [searchTerm, setSearchTerm] = useState('');

      useEffect(() => {
        loadOrganizations();
        loadAllUsers();
        loadRecentActivity();
      }, []);

      const authHeaders = () => {
        const authToken = token || window.localStorage?.getItem('appToken');
        if (!authToken) return null;
        return {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        };
      };

      const loadOrganizations = async () => {
        try {
          setOrgLoading(true);
          const headers = authHeaders();
          if (!headers) return;
          const resp = await fetchJSON(
            `${API_BASE_URL}/api/admin/organizations`,
            {
              headers,
            }
          );
          // Endpoint returns { organizations }
          setOrganizations(resp?.organizations || []);
        } catch (e) {
          console.error('Super admin org load failed:', e);
        } finally {
          setOrgLoading(false);
        }
      };

      const loadAllUsers = async () => {
        try {
          setUsersLoading(true);
          const headers = authHeaders();
          if (!headers) return;
          const resp = await fetchJSON(`${API_BASE_URL}/api/admin/users`, {
            headers,
          });
          setAllUsers(resp?.users || []);
        } catch (e) {
          console.error('Super admin user load failed:', e);
        } finally {
          setUsersLoading(false);
        }
      };

      const loadRecentActivity = async () => {
        try {
          setActivityLoading(true);
          const headers = authHeaders();
          if (!headers) return;
          const resp = await fetchJSON(
            `${API_BASE_URL}/api/admin/activity/recent?limit=50`,
            { headers }
          );
          setRecentActivity(resp?.activity || []);
        } catch (e) {
          console.error('Super admin recent activity failed:', e);
        } finally {
          setActivityLoading(false);
        }
      };

      const filteredUsers = allUsers.filter((u) => {
        if (roleFilter && u.role !== roleFilter) return false;
        if (orgFilter && String(u.organization_id || '') !== orgFilter)
          return false;
        if (searchTerm) {
          const s = searchTerm.toLowerCase();
          if (
            !(
              (u.name && u.name.toLowerCase().includes(s)) ||
              (u.email && u.email.toLowerCase().includes(s))
            )
          ) {
            return false;
          }
        }
        return true;
      });

      const roleCounts = allUsers.reduce(
        (acc, u) => {
          acc.total++;
          acc[u.role] = (acc[u.role] || 0) + 1;
          return acc;
        },
        { total: 0 }
      );

      return (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow">
              <p className="text-xs text-slate-500">Total Users</p>
              <p className="text-2xl font-semibold">{roleCounts.total}</p>
            </div>
            {['student', 'instructor', 'org_admin', 'super_admin'].map((r) => (
              <div
                key={r}
                className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow"
              >
                <p className="text-xs text-slate-500 capitalize">
                  {r.replace('_', ' ')}
                </p>
                <p className="text-xl font-medium">{roleCounts[r] || 0}</p>
              </div>
            ))}
            <div className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow col-span-full lg:col-span-2">
              <p className="text-xs text-slate-500 mb-1">Organizations</p>
              {orgLoading ? (
                <p className="text-sm text-slate-400">Loading organizations…</p>
              ) : (
                <p className="text-xl font-medium">{organizations.length}</p>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="block text-xs font-medium mb-1">Search</label>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 rounded border dark:bg-slate-700 dark:border-slate-600"
                placeholder="Name or email"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Role</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 rounded border dark:bg-slate-700 dark:border-slate-600"
              >
                <option value="">All</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="org_admin">Org Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">
                Organization
              </label>
              <select
                value={orgFilter}
                onChange={(e) => setOrgFilter(e.target.value)}
                className="px-3 py-2 rounded border dark:bg-slate-700 dark:border-slate-600"
              >
                <option value="">All</option>
                {organizations.map((o) => (
                  <option key={o.id} value={String(o.id)}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('');
                setOrgFilter('');
              }}
              className="px-3 py-2 rounded bg-slate-200 dark:bg-slate-700 text-sm"
            >
              Reset
            </button>
          </div>

          {/* Users Table */}
          <div className="rounded-lg bg-white dark:bg-slate-800 shadow overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Email</th>
                  <th className="py-2 px-3">Role</th>
                  <th className="py-2 px-3">Organization</th>
                  <th className="py-2 px-3">Attempts</th>
                  <th className="py-2 px-3">Avg Scaled</th>
                  <th className="py-2 px-3">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {usersLoading ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-500">
                      Loading users…
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-500">
                      No matching users
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/40"
                    >
                      <td className="py-2 px-3">{u.name}</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-300">
                        {u.email}
                      </td>
                      <td className="py-2 px-3">
                        <AdminRoleBadge role={u.role} />
                      </td>
                      <td className="py-2 px-3">
                        {u.organization_name || '—'}
                      </td>
                      <td className="py-2 px-3">{u.quiz_attempt_count}</td>
                      <td className="py-2 px-3">
                        {u.average_scaled_score != null
                          ? Math.round(u.average_scaled_score)
                          : '—'}
                      </td>
                      <td className="py-2 px-3 text-xs text-slate-500">
                        {u.last_quiz_attempt_at
                          ? new Date(u.last_quiz_attempt_at).toLocaleString()
                          : '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Organizations Overview */}
          <div className="rounded-lg bg-white dark:bg-slate-800 shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Organizations</h2>
            {orgLoading ? (
              <p className="text-sm text-slate-500">Loading…</p>
            ) : organizations.length === 0 ? (
              <p className="text-sm text-slate-500">No organizations</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {organizations.map((o) => (
                  <div
                    key={o.id}
                    className="rounded border border-slate-200 dark:border-slate-700 p-3 text-sm"
                  >
                    <p className="font-medium mb-1">{o.name}</p>
                    <p className="text-xs text-slate-500 mb-1">
                      Users: {o.userCount} | Students: {o.studentCount} |
                      Instructors: {o.instructorCount}
                    </p>
                    <p className="text-xs text-slate-500">
                      Last Activity:{' '}
                      {o.lastActivityAt
                        ? new Date(o.lastActivityAt).toLocaleDateString()
                        : '—'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="rounded-lg bg-white dark:bg-slate-800 shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
            {activityLoading ? (
              <p className="text-sm text-slate-500">Loading activity…</p>
            ) : recentActivity.length === 0 ? (
              <p className="text-sm text-slate-500">No recent attempts</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {recentActivity.map((a) => (
                  <li
                    key={a.id}
                    className="border border-slate-200 dark:border-slate-700 rounded p-2 flex flex-wrap gap-2"
                  >
                    <span className="font-medium">{a.user_name}</span>
                    <span className="text-xs text-slate-500">
                      {a.user_email}
                    </span>
                    <span className="text-xs">
                      {a.organization_name || '—'}
                    </span>
                    <span className="text-xs">{a.subject}</span>
                    <span className="text-xs italic">
                      {a.quiz_title || a.quiz_type || 'Attempt'}
                    </span>
                    <span className="text-xs">
                      Score: {a.score != null ? a.score : '—'} /{' '}
                      {a.scaled_score != null ? a.scaled_score : '—'}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(a.attempted_at).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
    }

    // Org Admin Dashboard - Organization-scoped visibility
    function OrgAdminDashboard({ user, token }) {
      const [loading, setLoading] = useState(true);
      const [adminData, setAdminData] = useState(null);

      useEffect(() => {
        loadOrgData();
      }, []);

      const loadOrgData = async () => {
        try {
          setLoading(true);
          const authToken = token || window.localStorage?.getItem('appToken');
          if (!authToken) return;

          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          };

          // Org admin is auto-scoped to their org on the backend
          const [readiness, activity, gedResults] = await Promise.all([
            fetchJSON(`${API_BASE_URL}/api/admin/reports/readiness`, {
              headers,
            }),
            fetchJSON(`${API_BASE_URL}/api/admin/reports/activity`, {
              headers,
            }),
            fetchJSON(`${API_BASE_URL}/api/admin/reports/ged-results`, {
              headers,
            }),
          ]);

          const studentStats = {
            activeCount: activity?.last30Days?.activeStudents || 0,
            studyTimeHours: Math.round(
              (activity?.last30Days?.totalMinutes || 0) / 60
            ),
            testReadyCount: readiness?.overall?.ready || 0,
            passedCount: gedResults?.last3Months?.passed || 0,
            totalTests: gedResults?.last3Months?.total || 0,
          };

          const subjectStats = {};
          const subjectNames = {
            rla: 'RLA',
            math: 'Math',
            science: 'Science',
            social: 'Social Studies',
          };

          if (readiness?.subjects) {
            Object.keys(readiness.subjects).forEach((key) => {
              const subject = readiness.subjects[key];
              const displayName = subjectNames[key] || key;
              subjectStats[displayName] = {
                ready: subject.ready || 0,
                almost: subject.almostReady || 0,
                needStudy: subject.needMoreStudy || 0,
                avg: Math.round(subject.averageScore || 0),
              };
            });
          }

          setAdminData({ studentStats, subjectStats });
        } catch (error) {
          console.error('Failed to load org data:', error);
        } finally {
          setLoading(false);
        }
      };

      if (loading) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        );
      }

      return (
        <ModernAdminDashboard
          user={user}
          token={token}
          studentStats={adminData?.studentStats}
          subjectStats={adminData?.subjectStats}
        />
      );
    }

    // Instructor Dashboard - Class-scoped visibility
    function InstructorDashboard({ user, token }) {
      const [loading, setLoading] = useState(true);
      const [adminData, setAdminData] = useState(null);
      const [selectedClass, setSelectedClass] = useState(null);
      const [classes, setClasses] = useState([]);

      useEffect(() => {
        loadInstructorClasses();
      }, []);

      useEffect(() => {
        if (selectedClass) {
          loadClassData();
        }
      }, [selectedClass]);

      const loadInstructorClasses = async () => {
        try {
          const authToken = token || window.localStorage?.getItem('appToken');
          if (!authToken) return;

          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          };

          // Fetch classes where this user is the instructor
          const classesData = await fetchJSON(
            `${API_BASE_URL}/api/admin/classes?instructor_id=${user.id}`,
            { headers }
          );
          setClasses(classesData || []);
          if (classesData && classesData.length > 0) {
            setSelectedClass(classesData[0].id);
          }
        } catch (error) {
          console.error('Failed to load instructor classes:', error);
        }
      };

      const loadClassData = async () => {
        try {
          setLoading(true);
          const authToken = token || window.localStorage?.getItem('appToken');
          if (!authToken) return;

          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          };

          const [readiness, activity, gedResults] = await Promise.all([
            fetchJSON(
              `${API_BASE_URL}/api/admin/reports/readiness?classId=${selectedClass}`,
              { headers }
            ),
            fetchJSON(
              `${API_BASE_URL}/api/admin/reports/activity?classId=${selectedClass}`,
              { headers }
            ),
            fetchJSON(
              `${API_BASE_URL}/api/admin/reports/ged-results?classId=${selectedClass}`,
              { headers }
            ),
          ]);

          const studentStats = {
            activeCount: activity?.last30Days?.activeStudents || 0,
            studyTimeHours: Math.round(
              (activity?.last30Days?.totalMinutes || 0) / 60
            ),
            testReadyCount: readiness?.overall?.ready || 0,
            passedCount: gedResults?.last3Months?.passed || 0,
            totalTests: gedResults?.last3Months?.total || 0,
          };

          const subjectStats = {};
          const subjectNames = {
            rla: 'RLA',
            math: 'Math',
            science: 'Science',
            social: 'Social Studies',
          };

          if (readiness?.subjects) {
            Object.keys(readiness.subjects).forEach((key) => {
              const subject = readiness.subjects[key];
              const displayName = subjectNames[key] || key;
              subjectStats[displayName] = {
                ready: subject.ready || 0,
                almost: subject.almostReady || 0,
                needStudy: subject.needMoreStudy || 0,
                avg: Math.round(subject.averageScore || 0),
              };
            });
          }

          setAdminData({ studentStats, subjectStats });
        } catch (error) {
          console.error('Failed to load class data:', error);
        } finally {
          setLoading(false);
        }
      };

      return (
        <div>
          <div className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Select Class
            </label>
            <select
              value={selectedClass || ''}
              onChange={(e) => setSelectedClass(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
          {loading ? (
            <div className="flex items-center justify-center min-h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
          ) : (
            <ModernAdminDashboard
              user={user}
              token={token}
              studentStats={adminData?.studentStats}
              subjectStats={adminData?.subjectStats}
            />
          )}
        </div>
      );
    }

    // Enhanced Admin Shell with full admin suite
    function EnhancedAdminShell({ user, token, onLogout }) {
      const [adminView, setAdminView] = useState('dashboard');
      const [adminData, setAdminData] = useState(null);
      const [loading, setLoading] = useState(true);
      // adminView can be: 'dashboard', 'classes', 'students', 'reports'

      // --- Role helpers ---
      const role = user?.role;
      const isSuperAdmin = role === 'superAdmin';
      const isOrgAdmin = role === 'orgAdmin';
      const isInstructor = role === 'instructor' || role === 'teacher';
      const isStudent = !isSuperAdmin && !isOrgAdmin && !isInstructor;

      const isAdmin = isSuperAdmin || isOrgAdmin || isInstructor;

      // Load admin dashboard data
      useEffect(() => {
        if (isAdmin && adminView === 'dashboard') {
          loadAdminData();
        }
      }, [isAdmin, adminView]);

      const loadAdminData = async () => {
        try {
          setLoading(true);
          const authToken =
            token ||
            (typeof window !== 'undefined' && window.localStorage
              ? window.localStorage.getItem('appToken')
              : null);

          if (!authToken) {
            console.warn(
              '[EnhancedAdminShell] No token available for admin data'
            );
            setLoading(false);
            return;
          }

          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          };

          const [readiness, activity, gedResults] = await Promise.all([
            fetchJSON(`${API_BASE_URL}/api/admin/reports/readiness`, {
              headers,
            }),
            fetchJSON(`${API_BASE_URL}/api/admin/reports/activity`, {
              headers,
            }),
            fetchJSON(`${API_BASE_URL}/api/admin/reports/ged-results`, {
              headers,
            }),
          ]);

          // Transform data into format expected by ModernAdminDashboard
          const studentStats = {
            activeCount: activity?.last30Days?.activeStudents || 0,
            studyTimeHours: Math.round(
              (activity?.last30Days?.totalMinutes || 0) / 60
            ),
            testReadyCount: readiness?.overall?.ready || 0,
            passedCount: gedResults?.last3Months?.passed || 0,
            totalTests: gedResults?.last3Months?.total || 0,
          };

          const subjectStats = {};
          const subjectNames = {
            rla: 'RLA',
            math: 'Math',
            science: 'Science',
            social: 'Social Studies',
          };

          if (readiness?.subjects) {
            Object.keys(readiness.subjects).forEach((key) => {
              const subject = readiness.subjects[key];
              const displayName = subjectNames[key] || key;
              subjectStats[displayName] = {
                ready: subject.ready || 0,
                almost: subject.almostReady || 0,
                needStudy: subject.needMoreStudy || 0,
                avg: Math.round(subject.averageScore || 0),
              };
            });
          }

          setAdminData({ studentStats, subjectStats });
        } catch (error) {
          console.error('Failed to load admin data:', error);
        } finally {
          setLoading(false);
        }
      };

      if (!isAdmin) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Access Denied
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                You don't have permission to access this area.
              </p>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Back to Login
              </button>
            </div>
          </div>
        );
      }

      const renderAdminContent = () => {
        if (adminView === 'dashboard') {
          // Route to role-specific dashboard based on privilege hierarchy
          if (isSuperAdmin) {
            return <SuperAdminDashboard user={user} token={token} />;
          }
          if (isOrgAdmin) {
            return <OrgAdminDashboard user={user} token={token} />;
          }
          if (isInstructor) {
            return <InstructorDashboard user={user} token={token} />;
          }

          // Fallback to legacy dashboard for unknown roles
          return (
            <AdminDashboard
              user={user}
              token={token}
              onNavigate={setAdminView}
            />
          );
        }

        // Placeholder for other views - these would need the full component implementations
        return (
          <div className="max-w-7xl mx-auto p-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {adminView === 'classes' && 'Classes Manager'}
                {adminView === 'students' && 'Students Manager'}
                {adminView === 'reports' && 'Reports & Analytics'}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                This view requires additional component implementations.
              </p>
              <button
                onClick={() => setAdminView('dashboard')}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
      };

      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
          {/* Admin Navigation Header */}
          <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                    {user?.organization_name || 'Admin Portal'}
                  </h1>
                  <nav className="flex items-center gap-1">
                    <button
                      onClick={() => setAdminView('dashboard')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        adminView === 'dashboard'
                          ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => setAdminView('classes')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        adminView === 'classes'
                          ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      Classes
                    </button>
                    <button
                      onClick={() => setAdminView('students')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        adminView === 'students'
                          ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      Students
                    </button>
                    <button
                      onClick={() => setAdminView('reports')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        adminView === 'reports'
                          ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      Reports
                    </button>
                  </nav>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      {user?.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                      {user?.role?.replace('_', ' ')}
                    </div>
                  </div>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Admin Content */}
          <main className="py-8">{renderAdminContent()}</main>
        </div>
      );
    }

    function DashboardProgressSummary({
      progress,
      profilePassedFromProps,
      recentSummary,
      onSubjectClick,
    }) {
      // Static base path for badges served by the backend
      const BADGE_BASE = '/badges';
      // Build passed set from profile only, plus optional localStorage overrides
      const passedSubjectsSet = React.useMemo(() => {
        const set = new Set();
        // Merge in profile-passed flags coming from the profile/test-plan (source of truth)
        try {
          const pm = profilePassedFromProps;
          if (pm && typeof pm === 'object') {
            Object.entries(pm).forEach(([id, isPassed]) => {
              if (!isPassed) return;
              const label =
                id === 'rla'
                  ? 'Reasoning Through Language Arts (RLA)'
                  : id === 'social_studies'
                  ? 'Social Studies'
                  : id === 'math'
                  ? 'Math'
                  : id === 'science'
                  ? 'Science'
                  : null;
              if (label) set.add(label);
            });
          }
        } catch {}
        // Optional: also respect any local manual flags present in localStorage
        try {
          const raw = localStorage.getItem('passedSubjects');
          if (raw) {
            const arr = JSON.parse(raw);
            if (Array.isArray(arr))
              arr.forEach((s) => {
                if (typeof s === 'string') set.add(s);
              });
          }
        } catch {}
        return set;
      }, [profilePassedFromProps]);
      const totalAttempts = Object.values(progress).reduce(
        (acc, subjectData) => acc + (subjectData?.attemptCount || 0),
        0
      );
      const subjects = SUBJECT_PROGRESS_KEYS;
      const getScoreTheme = (subject) => SUBJECT_COLORS[subject] || {};
      const getCardStyles = (subject) => {
        const theme = getScoreTheme(subject);
        const gradient = SUBJECT_BG_GRADIENTS[subject];
        const style = {
          borderColor: theme.scoreBorder || 'var(--border-subtle)',
          color: theme.scoreText || theme.text || '#ffffff',
          backgroundColor:
            theme.scoreBackground || theme.background || 'var(--bg-overlay)',
        };
        if (gradient) {
          style.backgroundImage = gradient;
        }
        return style;
      };
      const isDark = (() => {
        if (typeof document === 'undefined') return false;
        const root = document.documentElement;
        return (
          root.classList.contains('dark') ||
          root.getAttribute('data-theme') === 'dark' ||
          document.body.classList.contains('dark')
        );
      })();
      const totalCardStyle = isDark
        ? {
            borderColor:
              DEFAULT_COLOR_SCHEME.scoreBorder || 'var(--border-subtle)',
            backgroundColor: 'rgba(15,23,42,0.9)',
            color: '#f8fafc',
          }
        : {
            borderColor: 'rgba(148,163,184,0.35)',
            backgroundColor: '#ffffff',
            backgroundImage:
              'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
            color: '#0f172a',
          };

      const formatAverage = (value) =>
        value == null ? 'N/A' : Math.round(value);
      const rlaEssayAvgDisplay = (() => {
        try {
          const cards = Array.isArray(recentSummary?.cards)
            ? recentSummary.cards
            : [];
          const card = cards.find(
            (c) => c && (c.id === 'rla_essay_avg' || c.subject === 'RLA')
          );
          if (!card) return null;
          if (card.value && typeof card.value.display === 'string')
            return card.value.display;
          if (typeof card.value === 'number')
            return `${(Math.round(card.value * 10) / 10).toFixed(1)} / 6`;
          if (typeof card.latest === 'number')
            return `${(Math.round(card.latest * 10) / 10).toFixed(1)} / 6`;
          return null;
        } catch {
          return null;
        }
      })();

      return (
        <section className="dashboard-progress grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div
            className="progress-card total-attempts p-4 rounded-lg text-center shadow-inner border sm:col-span-3 lg:col-span-1"
            style={totalCardStyle}
          >
            <p
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: isDark ? 'rgba(248,250,252,0.75)' : '#334155' }}
            >
              Total Attempts
            </p>
            <p
              className="text-4xl font-bold"
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            >
              {totalAttempts}
            </p>
          </div>
          <div className="progress-subjects sm:col-span-3 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjects.map((subject) => {
              const data = progress[subject] || {};
              const cardStyle = getCardStyles(subject);
              const completionPercent = Math.min(
                100,
                Math.max(0, data.completionPercentage || 0)
              );
              const completedCount = data.completedCount || 0;
              const totalPremade = data.totalPremadeExams || 0;
              const averageScore = formatAverage(data.averageScaledScore);
              const lastTitle = data.lastAttempt?.quizTitle;
              const lastScore = data.lastAttempt?.scaledScore;
              const truncatedTitle =
                lastTitle && lastTitle.length > 52
                  ? `${lastTitle.slice(0, 49)}…`
                  : lastTitle;
              const SUBJECT_ID_MAP_SAFE =
                (typeof window !== 'undefined' && window.SUBJECT_ID_MAP) ||
                SUBJECT_ID_MAP;
              const subjectId = SUBJECT_ID_MAP_SAFE[subject] || null;
              const shortLabel =
                (SUBJECT_SHORT_LABELS && SUBJECT_SHORT_LABELS[subject]) ||
                (subjectId === 'rla' ? 'RLA' : subject);
              const hasGradient = Boolean(SUBJECT_BG_GRADIENTS[subject]);
              const titleColor = hasGradient
                ? 'rgba(255,255,255,0.85)'
                : '#0f172a';
              // Map subjectId to on-disk filename (social studies uses a hyphen)
              const badgeFile =
                subjectId === 'social_studies' ? 'social-studies' : subjectId;
              const badgeSrc = badgeFile
                ? `${BADGE_BASE}/${badgeFile}.svg`
                : null;
              const showBadge = passedSubjectsSet.has(subject);
              return (
                <button
                  key={subject}
                  id={subjectId ? `subject-card-${subjectId}` : undefined}
                  onClick={() => onSubjectClick(subject)}
                  className="subject-card relative p-4 rounded-lg text-left shadow-inner border transition-transform duration-200 hover:-translate-y-1"
                  style={cardStyle}
                >
                  {showBadge &&
                    (badgeSrc ? (
                      <div className="subject-badge-shell">
                        <img
                          src={badgeSrc}
                          alt={`${subject} GED badge`}
                          className="subject-badge-img"
                          onError={(e) => {
                            // Hide the shell if the image fails, then show pill fallback
                            const shell = e.currentTarget.parentElement;
                            if (shell) shell.style.display = 'none';
                            const pill = e.currentTarget
                              .closest('.subject-card')
                              ?.querySelector('.subject-badge-pill');
                            if (pill) pill.style.display = 'inline-flex';
                          }}
                        />
                      </div>
                    ) : (
                      <span className="subject-badge-pill">{shortLabel}</span>
                    ))}
                  <p
                    className="subject-card-title text-sm font-semibold uppercase tracking-wider"
                    style={{ color: titleColor }}
                  >
                    {subject}
                  </p>
                  <div
                    className="mt-3 h-2 w-full rounded-full"
                    style={{
                      backgroundColor: isDark
                        ? 'rgba(255,255,255,0.3)'
                        : '#e2e8f0',
                    }}
                  >
                    <div
                      className="h-2 rounded-full shadow-sm"
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(100, completionPercent)
                        )}%`,
                        opacity: 0.95,
                        backgroundColor:
                          SUBJECT_COLORS[subject]?.accent ||
                          (isDark ? '#ffffff' : '#0f172a'),
                      }}
                    ></div>
                  </div>
                  <p
                    className="mt-2 text-sm"
                    style={{ color: cardStyle.color }}
                  >
                    {Number.isFinite(totalPremade) && totalPremade > 0
                      ? `${completedCount} of ${totalPremade} exams passed`
                      : `0 of 0 (no quizzes loaded yet)`}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: 'rgba(255,255,255,0.85)' }}
                  >
                    Avg scaled score:{' '}
                    <span className="font-semibold">{averageScore}</span>
                  </p>
                  {truncatedTitle && (
                    <p
                      className="mt-2 text-xs"
                      style={{ color: 'rgba(255,255,255,0.8)' }}
                    >
                      Last exam:{' '}
                      <span className="font-semibold">{truncatedTitle}</span>
                      {lastScore != null && ` (${Math.round(lastScore)})`}
                    </p>
                  )}
                  {subjectId === 'rla' && rlaEssayAvgDisplay && (
                    <p
                      className="mt-1 text-xs"
                      style={{ color: 'rgba(255,255,255,0.9)' }}
                    >
                      Avg essay:{' '}
                      <span className="font-semibold">
                        {rlaEssayAvgDisplay}
                      </span>
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      );
    }

    // Shim component expected elsewhere in the app
    function ProgressDashboard({
      progress,
      onSubjectClick,
      profilePassedMap,
      recentSummary,
    }) {
      return (
        <DashboardProgressSummary
          progress={progress}
          profilePassedFromProps={profilePassedMap}
          recentSummary={recentSummary}
          onSubjectClick={onSubjectClick}
        />
      );
    }

    function VocabularyTicker({ vocabulary, onWordClick }) {
      const entries = useMemo(() => {
        if (!vocabulary) return [];
        return Object.entries(vocabulary).flatMap(([subject, words]) => {
          if (!Array.isArray(words) || !words.length) return [];
          return words
            .slice(0, MAX_TICKER_WORDS_PER_SUBJECT)
            .map((word) => ({ subject, term: word.term }))
            .filter((item) => item.term);
        });
      }, [vocabulary]);

      if (!entries.length) {
        return null;
      }

      const repeatedEntries = [...entries, ...entries];

      return (
        <div
          className="vocabulary-spotlight glass rounded-2xl overflow-hidden shadow-lg animate-floatIn"
          style={{
            borderColor: 'var(--border-strong)',
            backgroundColor: 'var(--bg-overlay)',
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              backgroundColor: 'var(--nav-active-bg)',
              color: 'var(--nav-active-text)',
            }}
          >
            <span className="text-sm font-semibold uppercase tracking-wide">
              Vocabulary Spotlight
            </span>
            <span
              className="hidden text-xs sm:inline"
              style={{ color: 'var(--text-secondary)', opacity: 0.75 }}
            >
              Click any word to view the full list.
            </span>
          </div>
          <div className="vocabulary-ticker">
            <div className="vocabulary-ticker-track">
              {repeatedEntries.map((item, index) => {
                const color =
                  VOCABULARY_SUBJECT_COLORS[item.subject] || '#0f172a';
                const shortLabel =
                  SUBJECT_SHORT_LABELS[item.subject] || item.subject;
                return (
                  <button
                    key={`${item.subject}-${item.term}-${index}`}
                    type="button"
                    onClick={() => onWordClick?.(item.subject)}
                    className="vocabulary-chip"
                    title={`View ${item.subject} vocabulary`}
                  >
                    <span
                      className="vocabulary-chip-dot"
                      style={{ backgroundColor: color }}
                    ></span>
                    <span style={{ color: 'var(--text-primary)' }}>
                      {item.term}
                    </span>
                    <span
                      className="vocabulary-chip-label"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    function SubjectVocabularySection({ subject, words, theme = 'light' }) {
      if (!Array.isArray(words) || !words.length) {
        return null;
      }

      const isDarkMode = theme === 'dark';
      const colorScheme = SUBJECT_COLORS[subject] || {};
      const accentColor = colorScheme.accent || colorScheme.text || '#0f172a';
      const textColor = colorScheme.text || '#0f172a';
      const lightTint =
        SUBJECT_LIGHT_TINTS[subject] || 'rgba(148,163,184,0.28)';
      const lightSurface = SUBJECT_LIGHT_SURFACE_GRADIENTS[subject];

      const containerClasses = `animate-floatIn rounded-2xl p-6 mb-6 border transition-colors duration-300 ${
        isDarkMode
          ? 'bg-slate-900/60 border-slate-700/60'
          : 'bg-white shadow-xl'
      }`;
      const containerStyle = isDarkMode
        ? undefined
        : {
            backgroundColor: '#ffffff',
            backgroundImage: lightSurface || undefined,
            borderColor: lightTint,
            boxShadow: '0 22px 45px -32px rgba(15,23,42,0.45)',
          };

      const headerTextStyle = isDarkMode ? undefined : { color: accentColor };
      const subtextStyle = isDarkMode
        ? undefined
        : { color: textColor, opacity: 0.75 };

      const cardClasses = `rounded-xl p-4 shadow-sm border transition-all ${
        isDarkMode ? 'bg-slate-900/60 border-slate-700/60' : 'bg-white'
      }`;
      const cardStyle = isDarkMode
        ? undefined
        : {
            backgroundColor: '#ffffff',
            borderColor: lightTint,
            borderLeft: `4px solid ${accentColor}`,
            boxShadow: '0 14px 32px -28px rgba(15,23,42,0.35)',
          };

      const termStyle = isDarkMode ? undefined : { color: textColor };
      const definitionStyle = isDarkMode
        ? undefined
        : { color: textColor, opacity: 0.95 };
      const exampleStyle = isDarkMode
        ? undefined
        : { color: accentColor, opacity: 0.95 };

      return (
        <div
          id="subject-vocabulary-section"
          className={containerClasses}
          style={containerStyle}
        >
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <div>
              <h3
                className="text-xl font-bold text-slate-900 dark:text-slate-100"
                style={headerTextStyle}
              >
                Subject Vocabulary
              </h3>
              <p
                className="text-sm text-slate-600 dark:text-slate-300"
                style={subtextStyle}
              >
                Scroll through the complete list of key terms for {subject}.
              </p>
            </div>
          </div>
          <div className="mt-4 max-h-96 overflow-y-auto pr-1 space-y-3">
            {words.map((word) => (
              <div key={word.term} className={cardClasses} style={cardStyle}>
                <p
                  className="text-lg font-semibold text-slate-900 dark:text-slate-100"
                  style={termStyle}
                >
                  {word.term}
                </p>
                {word.definition && (
                  <p
                    className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed"
                    style={definitionStyle}
                  >
                    {word.definition}
                  </p>
                )}
                {word.example && (
                  <p
                    className="text-xs text-slate-500 dark:text-slate-400 italic mt-2"
                    style={exampleStyle}
                  >
                    Example: {word.example}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    function VocabularyBySubject({ vocabulary, onStartQuiz, theme = 'light' }) {
      const [expandedSubjects, setExpandedSubjects] = React.useState({});
      const isDarkMode = theme === 'dark';

      const subjects = Object.entries(vocabulary || {}).filter(
        ([, words]) => Array.isArray(words) && words.length > 0
      );

      if (!subjects.length) {
        return null;
      }

      const toggleSubject = (subjectName) => {
        setExpandedSubjects((prev) => ({
          ...prev,
          [subjectName]: !prev[subjectName],
        }));
      };

      return (
        <div className="space-y-4">
          {subjects.map(([subjectName, words]) => {
            const colorScheme = SUBJECT_COLORS[subjectName] || {};
            const accentColor =
              colorScheme.accent || colorScheme.text || '#0f172a';
            const textColor = colorScheme.text || '#0f172a';
            const lightTint =
              SUBJECT_LIGHT_TINTS[subjectName] || 'rgba(148,163,184,0.28)';
            const lightSurface = SUBJECT_LIGHT_SURFACE_GRADIENTS[subjectName];
            const gradientBg = SUBJECT_BG_GRADIENTS[subjectName];
            const isExpanded = expandedSubjects[subjectName];

            const containerClasses = `animate-floatIn rounded-2xl border transition-all duration-300 ${
              isDarkMode
                ? 'bg-slate-900/60 border-slate-700/60'
                : 'bg-white shadow-lg'
            }`;
            const containerStyle = isDarkMode
              ? undefined
              : {
                  backgroundColor: '#ffffff',
                  backgroundImage: lightSurface || undefined,
                  borderColor: lightTint,
                  boxShadow: '0 18px 38px -24px rgba(15,23,42,0.4)',
                };

            const headerClasses = `flex items-center justify-between p-4 cursor-pointer rounded-t-2xl transition-all ${
              isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
            }`;
            const headerStyle = isDarkMode
              ? { backgroundImage: gradientBg }
              : {
                  backgroundColor: '#f8fafc',
                  borderBottom: `2px solid ${lightTint}`,
                };

            const titleStyle = isDarkMode ? undefined : { color: accentColor };
            const countStyle = isDarkMode
              ? undefined
              : { color: textColor, opacity: 0.7 };

            const buttonClasses = `px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm ${
              isDarkMode
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'text-white hover:scale-105'
            }`;
            const buttonStyle = isDarkMode
              ? undefined
              : {
                  backgroundColor: accentColor,
                  boxShadow: `0 4px 14px -6px ${accentColor}`,
                };

            const cardClasses = `rounded-lg p-3 border transition-all ${
              isDarkMode ? 'bg-slate-900/60 border-slate-700/60' : 'bg-white'
            }`;
            const cardStyle = isDarkMode
              ? undefined
              : {
                  backgroundColor: '#ffffff',
                  borderColor: lightTint,
                  borderLeft: `3px solid ${accentColor}`,
                  boxShadow: '0 10px 24px -20px rgba(15,23,42,0.3)',
                };

            const termStyle = isDarkMode ? undefined : { color: textColor };
            const definitionStyle = isDarkMode
              ? undefined
              : { color: textColor, opacity: 0.85 };

            return (
              <div
                key={subjectName}
                className={containerClasses}
                style={containerStyle}
              >
                <div
                  className={headerClasses}
                  style={headerStyle}
                  onClick={() => toggleSubject(subjectName)}
                >
                  <div className="flex items-center gap-3">
                    <h3
                      className="text-lg font-bold text-slate-900 dark:text-slate-100"
                      style={titleStyle}
                    >
                      {subjectName}
                    </h3>
                    <span
                      className="text-sm text-slate-600 dark:text-slate-300"
                      style={countStyle}
                    >
                      ({words.length} terms)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartQuiz?.(subjectName);
                      }}
                      className={buttonClasses}
                      style={buttonStyle}
                    >
                      Vocabulary Quiz
                    </button>
                    <span className="text-slate-600 dark:text-slate-300 text-xl">
                      {isExpanded ? '' : ''}
                    </span>
                  </div>
                </div>
                {isExpanded && (
                  <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                    {words.map((word) => (
                      <div
                        key={word.term}
                        className={cardClasses}
                        style={cardStyle}
                      >
                        <p
                          className="text-base font-semibold text-slate-900 dark:text-slate-100"
                          style={termStyle}
                        >
                          {word.term}
                        </p>
                        {word.definition && (
                          <p
                            className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed"
                            style={definitionStyle}
                          >
                            {word.definition}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    const ICONS = {
      GlobeIcon,
      BookOpenIcon,
      BeakerIcon,
      BriefcaseIcon,
      CalculatorIcon,
      ChartBarIcon,
      VariableIcon,
      ShapesIcon,
      // Custom SVG icons from icons/ folder
      SunIcon,
      SleepingMoonIcon,
      DoubleHelixIcon,
      BookClosedIcon,
      ParthenonIcon,
      CustomBriefcaseIcon,
      HouseIcon,
      StudentIcon,
      ChartPieIcon,
      PencilIcon,
    };

    function FormulaDisplay({ latex, className = '' }) {
      const safeLatex = normalizeFormulaLatex(latex);
      let html = '';

      try {
        html = renderLatexToHtml(safeLatex);
      } catch (error) {
        console.warn('Formula render failed:', error?.message || error);
        html = escapeHtml(typeof safeLatex === 'string' ? safeLatex : '');
      }

      return (
        <span
          className={className}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    function ScienceFormulaSheet({ onClose }) {
      return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'var(--modal-overlay)' }}
        >
          <div className="formula-sheet science-formula-sheet rounded-xl shadow-2xl max-w-lg w-11/12 p-6 relative">
            <button
              className="formula-sheet-close absolute top-3 right-3 font-bold hover:opacity-80 transition-opacity"
              onClick={onClose}
              type="button"
              aria-label="Close science formula sheet"
              style={{ color: 'inherit' }}
            >
              ✕
            </button>

            <h2 className="formula-sheet-title text-xl font-bold mb-4">
              Science Formula Sheet
            </h2>

            <div className="formula-sheet-grid space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {(Array.isArray(ScienceFormulas) ? ScienceFormulas : []).map(
                (item, idx) => (
                  <div
                    key={idx}
                    className="formula-sheet-card rounded-lg p-3 space-y-2"
                  >
                    <h3 className="formula-sheet-label font-semibold">
                      {item.name}
                    </h3>
                    <FormulaDisplay
                      latex={item.formula}
                      className="formula-equation rounded text-center my-2 text-lg font-mono px-2 py-2"
                    />
                    <p className="formula-sheet-description text-xs leading-snug">
                      {item.variables}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      );
    }

    function FormulaSheetModal({ onClose }) {
      const Formula = ({ title, formula, description }) => {
        const sanitizedFormula =
          typeof formula === 'string'
            ? (() => {
                let working = formula;
                working = applySafeMathFix(working);
                if (typeof normalizeLatexMacrosInMath === 'function') {
                  working = normalizeLatexMacrosInMath(working);
                }
                return working;
              })()
            : formula;
        let html = '';
        try {
          html = renderLatexToHtml(sanitizedFormula);
        } catch (err) {
          console.warn('KaTeX render fallback triggered:', err?.message || err);
          html = escapeHtml(
            typeof sanitizedFormula === 'string' ? sanitizedFormula : ''
          );
        }

        return (
          <div className="formula-sheet-card rounded-lg p-3 space-y-2 mb-4">
            <h4 className="formula-sheet-label font-bold text-md">{title}</h4>
            <div className="formula-equation rounded text-center text-lg font-mono px-2 py-2">
              <span dangerouslySetInnerHTML={{ __html: html }}></span>
            </div>
            {description && (
              <p className="formula-sheet-description text-sm">{description}</p>
            )}
          </div>
        );
      };

      return (
        <div
          className="fixed inset-0 w-full h-full flex items-center justify-center z-50"
          style={{ backgroundColor: 'var(--modal-overlay)' }}
        >
          <div className="formula-sheet rounded-lg shadow-2xl w-11/12 max-w-2xl max-h-[90vh]">
            <div
              className="formula-sheet-header p-4 border-b flex justify-between items-center sticky top-0"
              style={{ borderColor: 'rgba(148,163,184,0.35)' }}
            >
              <h2 className="formula-sheet-title text-xl font-bold">
                GED® Mathematical Reasoning Formula Sheet
              </h2>
              <button
                onClick={onClose}
                className="formula-sheet-close text-3xl hover:opacity-80 transition-opacity"
                style={{ color: 'inherit' }}
              >
                &times;
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-65px)] grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <div>
                <h3 className="formula-sheet-section text-lg font-bold border-b mb-2">
                  Area
                </h3>
                <Formula title="Square" formula="A = s^2" />
                <Formula title="Rectangle" formula="A = lw" />
                <Formula title="Parallelogram" formula="A = bh" />
                <Formula title="Triangle" formula="A = \\\\frac{1}{2}bh" />
                <Formula
                  title="Trapezoid"
                  formula="A = \\\\frac{1}{2}h(b_1 + b_2)"
                />
                <Formula title="Circle" formula="A = \\pi r^2" />

                <h3 className="formula-sheet-section text-lg font-bold border-b mt-4 mb-2">
                  Perimeter / Circumference
                </h3>
                <Formula title="Square" formula="P = 4s" />
                <Formula title="Rectangle" formula="P = 2l + 2w" />
                <Formula title="Triangle" formula="P = s_1 + s_2 + s_3" />
                <Formula
                  title="Circle (Circumference)"
                  formula="C = 2\\\\pi r \\\\text{ or } C = \\\\pi d"
                />
              </div>
              <div>
                <h3 className="formula-sheet-section text-lg font-bold border-b mb-2">
                  Volume
                </h3>
                <Formula title="Cube" formula="V = s^3" />
                <Formula title="Rectangular Prism" formula="V = lwh" />
                <Formula title="Cylinder" formula="V = \\pi r^2 h" />
                <Formula
                  title="Pyramid"
                  formula="V = \\\\frac{1}{3}Bh"
                  description="B = area of base"
                />
                <Formula
                  title="Cone"
                  formula="V = \\\\frac{1}{3}\\\\pi r^2 h"
                />
                <Formula
                  title="Sphere"
                  formula="V = \\\\frac{4}{3}\\\\pi r^3"
                />

                <h3 className="formula-sheet-section text-lg font-bold border-b mt-4 mb-2">
                  Data
                </h3>
                <Formula
                  title="Mean"
                  formula="mean = \\\\frac{\\\\text{sum of values}}{\\\\text{number of values}}"
                />
                <Formula
                  title="Median"
                  formula="median = \\\\text{middle value of an ordered data set}"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    function StartScreen({
      currentUser,
      onLogout,
      progress,
      profileBundle: profileData,
      testDate,
      onboardingComplete,
      onShowProfile,
      onSelectQuiz,
      vocabulary,
      onSelectGenerator,
      onStartPopQuiz,
      onStartComprehensiveExam,
      setIsLoading,
      setLoadingMessage,
      setShowFormulaSheet,
      onOpenMathTools,
      theme = 'light',
      onRefreshProfile,
      selectedSubject,
      selectedCategory,
      onSelectSubject,
      onSelectCategory,
      onBack,
      onOpenWorkforce,
    }) {
      const [aiQuizTopic, setAiQuizTopic] = useState('');
      const [detailedViewSubject, setDetailedViewSubject] = useState(null);
      // weekly coach
      const [weeklyCoachPlan, setWeeklyCoachPlan] = useState(null);
      const [coachLoading, setCoachLoading] = useState(false);
      const [coachError, setCoachError] = useState('');

      // daily coach progress snapshot
      const [dailyLoading, setDailyLoading] = useState(false);
      const [dailyError, setDailyError] = useState('');
      const [coachDailySubjects, setCoachDailySubjects] = useState([]);
      // weekly coach summary for dashboard
      const [weeklyCoachSummary, setWeeklyCoachSummary] = useState([]);
      const [generatingAll, setGeneratingAll] = useState(false);
      // Vocabulary collapsible
      const [vocabOpen, setVocabOpen] = useState(true);

      // Ask Coach (advice)
      const [adviceLoading, setAdviceLoading] = useState(false);
      const [adviceText, setAdviceText] = useState('');
      const [adviceError, setAdviceError] = useState('');

      // Collapsible practice tool internal panels (default collapsed)
      const [practiceToolPanels, setPracticeToolPanels] = useState({
        stepSolver: false,
        centralTendency: false,
        graphing: false,
        geometry: false,
      });

      // Weekly coach helpers (top-level)
      const canonicalSubjectId = (value) => {
        const str = (value || '').toString().toLowerCase();
        if (!str) return '';
        if (str.startsWith('math')) return 'math';
        if (str.startsWith('science')) return 'science';
        if (str === 'rla' || str.includes('language')) return 'rla';
        if (str.includes('social')) return 'social_studies';
        if (str.includes('workforce')) return 'workforce';
        return str.replace(/[^a-z0-9]+/g, '_');
      };

      const displaySubjectName = (value) => {
        const id = canonicalSubjectId(value);
        if (id === 'rla') return 'Reasoning Through Language Arts (RLA)';
        if (id === 'social_studies') return 'Social Studies';
        if (id === 'math') return 'Math';
        if (id === 'science') return 'Science';
        if (id === 'workforce') return 'Workforce';
        return value || 'Subject';
      };

      const practiceSubjectParam = (value) => {
        const id = canonicalSubjectId(value);
        if (!id) return '';
        if (id === 'math') return 'math';
        if (id === 'science') return 'science';
        if (id === 'rla') return 'rla';
        if (id === 'workforce') return 'workforce';
        return 'social-studies';
      };

      const addDaysToDate = (iso, offset = 0) => {
        if (!iso) return null;
        try {
          const base = new Date(`${iso}T00:00:00`);
          const shifted = new Date(
            base.getTime() + offset * 24 * 60 * 60 * 1000
          );
          return shifted.toISOString().slice(0, 10);
        } catch {
          return null;
        }
      };

      const normalizeCoachTask = (
        task = {},
        dayFallback = {},
        dayIndex = 0,
        taskIndex = 0
      ) => {
        const rawSubject =
          task.subject || dayFallback.subject || dayFallback.subjectLabel || '';
        const subjectId = canonicalSubjectId(rawSubject);
        const subjectLabel =
          task.subjectLabel ||
          dayFallback.subjectLabel ||
          displaySubjectName(rawSubject || subjectId);
        const focus = Array.isArray(task.focus)
          ? task.focus
          : task.focus
          ? [task.focus]
          : [];
        const minutesFromTask = Number(task.minutes);
        const minutesFallback = Number(dayFallback.minutes);
        return {
          id: task.id || `${subjectId || 'task'}-${dayIndex}-${taskIndex}`,
          subject: subjectId,
          subjectLabel,
          title:
            task.title ||
            task.label ||
            dayFallback.label ||
            dayFallback.task ||
            task.type ||
            'Practice',
          type: task.type || dayFallback.type || 'practice',
          minutes: Number.isFinite(minutesFromTask)
            ? minutesFromTask
            : Number.isFinite(minutesFallback)
            ? minutesFallback
            : 20,
          quizId: task.quizId || task.quizCode || null,
          quizPath: task.quizPath || null,
          focus,
          message: task.message || dayFallback.message || null,
        };
      };

      const adaptWeeklyCoachResponse = (raw) => {
        if (!raw) return { weekStart: null, weekEnd: null, days: [] };
        const plan = raw.plan || raw;
        const weekStart = plan.weekStart || raw.weekStart || null;
        const weekEnd = plan.weekEnd || raw.weekEnd || null;
        const daysInput = Array.isArray(plan.days) ? plan.days : [];
        const normalizedDays = daysInput.map((day, idx) => {
          const dayNumber = Number(day.day);
          const resolvedIndex =
            Number.isFinite(dayNumber) && dayNumber >= 1 ? dayNumber - 1 : idx;
          const label = day.label || `Day ${resolvedIndex + 1}`;
          const date = day.date || addDaysToDate(weekStart, resolvedIndex);
          const tasks = Array.isArray(day.tasks)
            ? day.tasks.map((task, taskIndex) =>
                normalizeCoachTask(task, day, resolvedIndex, taskIndex)
              )
            : [];
          return {
            day: resolvedIndex + 1,
            label,
            date,
            tasks,
          };
        });
        return {
          weekStart,
          weekEnd,
          generatedAt: plan.generatedAt || null,
          subjects: plan.subjects || {},
          days: normalizedDays,
        };
      };

      const getTodayIndex = (weekStartISO) => {
        if (!weekStartISO) return -1;
        try {
          const today = new Date();
          const localToday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          );
          const start = new Date(weekStartISO + 'T00:00:00');
          const diff = Math.floor((localToday - start) / (24 * 60 * 60 * 1000));
          if (diff < 0 || diff > 6) return -1;
          return diff;
        } catch {
          return -1;
        }
      };

      const fetchWeeklyCoachPlan = async () => {
        // Coach feature disabled guard
        if (!window.__COACH_ENABLED__) return;
        try {
          setCoachLoading(true);
          setCoachError('');
          const token =
            (typeof localStorage !== 'undefined' &&
              localStorage.getItem('appToken')) ||
            null;
          if (!token) {
            setWeeklyCoachPlan(null);
            setWeeklyCoachSummary([]);
            return;
          }
          const res = await fetch(
            `${API_BASE_URL}/api/coach/weekly?t=${Date.now()}`,
            {
              method: 'GET',
              headers: { Authorization: `Bearer ${token}` },
              cache: 'no-store',
            }
          );
          if (!res.ok) {
            setWeeklyCoachPlan(
              (prev) => prev || { weekStart: null, weekEnd: null, days: [] }
            );
            if (res.status !== 404)
              setCoachError('Unable to load weekly coach plan.');
            return;
          }
          const data = await res.json();
          // Debug: log weekly payload to verify structure coming from backend
          try {
            console.log('Weekly coach data:', data);
          } catch (_) {}
          const normalized = adaptWeeklyCoachResponse(data);
          setWeeklyCoachPlan(normalized);
          setWeeklyCoachSummary(
            Array.isArray(data?.subjects) ? data.subjects : []
          );
        } catch (e) {
          setCoachError('Unable to load weekly coach plan.');
          setWeeklyCoachPlan(
            (prev) => prev || { weekStart: null, weekEnd: null, days: [] }
          );
        } finally {
          setCoachLoading(false);
        }
      };

      const fetchCoachDailyProgress = async () => {
        // Coach feature disabled guard
        if (!window.__COACH_ENABLED__) return;
        try {
          setDailyLoading(true);
          setDailyError('');
          const token =
            (typeof localStorage !== 'undefined' &&
              localStorage.getItem('appToken')) ||
            null;
          if (!token) {
            setCoachDailySubjects([]);
            return;
          }
          const res = await fetch(
            `${API_BASE_URL}/api/coach/daily?t=${Date.now()}`,
            {
              method: 'GET',
              headers: { Authorization: `Bearer ${token}` },
              cache: 'no-store',
            }
          );
          if (res.ok) {
            const data = await res.json();
            try {
              console.log('Daily coach data:', data);
            } catch (_) {}
            if (data && data.ok) {
              setCoachDailySubjects(
                Array.isArray(data.subjects) ? data.subjects : []
              );
            } else {
              setCoachDailySubjects([]);
            }
          } else {
            setDailyError("Unable to load today's coach goals.");
          }
        } catch (e) {
          setDailyError("Unable to load today's coach goals.");
        } finally {
          setDailyLoading(false);
        }
      };

      const refreshCoachPanels = async () => {
        await Promise.all([fetchWeeklyCoachPlan(), fetchCoachDailyProgress()]);
      };
      const generateCoachPlan = async () => {
        if (!window.__COACH_ENABLED__) return;
        const token =
          (typeof localStorage !== 'undefined' &&
            localStorage.getItem('appToken')) ||
          null;
        const subjectParam = practiceSubjectParam(selectedSubject);

        // do the cheap checks BEFORE we ever set loading
        if (!token) {
          alert('Please sign in to generate a weekly plan.');
          return;
        }
        if (!subjectParam) {
          alert('Pick a subject first.');
          return;
        }

        setCoachLoading(true);
        setCoachError('');

        // map what the API expects
        const apiSubject =
          subjectParam === 'social-studies'
            ? 'Social Studies'
            : subjectParam === 'rla'
            ? 'RLA'
            : subjectParam === 'math'
            ? 'Math'
            : subjectParam === 'workforce'
            ? 'Workforce'
            : 'Science';

        try {
          const res = await fetch(
            `${API_BASE_URL}/api/coach/${encodeURIComponent(
              apiSubject
            )}/generate-week`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({}),
            }
          );

          if (!res.ok) {
            setCoachError('Unable to generate weekly coach plan.');
            return;
          }

          // reload weekly + today's goals so the panel gets the day's quiz links
          await refreshCoachPanels();
        } catch (e) {
          setCoachError('Unable to generate weekly coach plan.');
        } finally {
          setCoachLoading(false);
        }
      };

      // Generate weekly plans for all subjects, then refresh weekly summary
      const generateAllWeeklyPlans = async () => {
        if (!window.__COACH_ENABLED__) return;
        // Early token check before toggling loading
        const token =
          (typeof localStorage !== 'undefined' &&
            localStorage.getItem('appToken')) ||
          null;
        if (!token) {
          alert('Please sign in to generate weekly plans.');
          return;
        }

        setGeneratingAll(true);
        setCoachError('');
        const subjects = [
          'Math',
          'RLA',
          'Science',
          'Social Studies',
          'Workforce',
        ];
        const results = [];

        try {
          for (const subj of subjects) {
            try {
              const res = await fetch(
                `${API_BASE_URL}/api/coach/${encodeURIComponent(
                  subj
                )}/generate-week`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({}),
                }
              );
              if (res.status === 429) {
                results.push(`${subj}: already generated`);
                continue;
              }
              if (!res.ok) {
                results.push(`${subj}: error (${res.status})`);
                continue;
              }
              results.push(`${subj}: ok`);
            } catch (e) {
              results.push(`${subj}: error`);
            }
          }
          // Refresh both daily and weekly so panels reflect new plans immediately
          await refreshCoachPanels();
          if (results.length) alert(results.join('\n'));
        } catch (e) {
          setCoachError('Unable to generate all weekly coach plans.');
        } finally {
          setGeneratingAll(false);
        }
      };
      // (removed subject-specific plan loader; we rely on consolidated weekly plan + daily progress)

      // Load consolidated weekly plan and daily progress on mount
      useEffect(() => {
        if (!window.__COACH_ENABLED__) return; // Coach feature disabled: skip loading
        (async () => {
          await fetchWeeklyCoachPlan();
          await fetchCoachDailyProgress();
        })();
      }, []);

      // (helpers moved above; refreshCoachPanels now fetches both weekly plan and daily progress)
      // Resolve and launch a premade by quizCode for a subject (global helper)
      const launchPremadeByCodeGlobal = (subject, quizCode) => {
        try {
          const data =
            typeof window !== 'undefined'
              ? window.MergedExpandedQuizData || window.ExpandedQuizData || {}
              : {};
          const subjectData =
            data?.[displaySubjectName(subject)] || data?.[subject] || null;
          if (!subjectData) throw new Error('Subject dataset not found');
          let found = null;
          const setIfMatch = (obj) => {
            if (found) return;
            if (!obj) return;
            if (obj.quizCode && obj.quizCode === quizCode) found = obj;
          };
          if (Array.isArray(subjectData.quizzes))
            subjectData.quizzes.forEach(setIfMatch);
          const cats = subjectData.categories || {};
          for (const catName of Object.keys(cats)) {
            const cat = cats[catName];
            if (!cat) continue;
            if (Array.isArray(cat.quizzes)) cat.quizzes.forEach(setIfMatch);
            const topics = Array.isArray(cat.topics) ? cat.topics : [];
            for (const t of topics) {
              setIfMatch(t);
              if (Array.isArray(t?.quizzes)) t.quizzes.forEach(setIfMatch);
            }
          }
          if (!found) throw new Error('not_found');
          const baseTitle = found.title || 'Premade Quiz';
          let questions = [];
          if (Array.isArray(found.questions) && found.questions.length) {
            questions = found.questions;
          } else {
            // try origin topic
            const locateTopicById = (id) => {
              if (!id) return null;
              for (const cat of Object.values(cats)) {
                const topics = Array.isArray(cat?.topics) ? cat.topics : [];
                for (const t of topics)
                  if (t && (t.id === id || t.quizCode === id)) return t;
              }
              return null;
            };
            const originTopic = locateTopicById(found.topicId) || null;
            if (
              originTopic &&
              Array.isArray(originTopic.questions) &&
              originTopic.questions.length
            ) {
              questions = originTopic.questions;
            } else if (originTopic && Array.isArray(originTopic.quizzes)) {
              const match =
                originTopic.quizzes.find(
                  (q) =>
                    q.quizCode === found.quizCode || q.quizId === found.quizId
                ) || originTopic.quizzes[0];
              if (match && Array.isArray(match.questions))
                questions = match.questions;
            }
          }
          const normalized = (questions || []).map((q, i) =>
            normalizeQuestionAssets(
              q && typeof q === 'object'
                ? { ...q, questionNumber: q.questionNumber ?? i + 1 }
                : q,
              displaySubjectName(subject)
            )
          );
          const payload = {
            ...found,
            id: found.quizCode || found.quizId || baseTitle,
            quizCode: found.quizCode || found.quizId || baseTitle,
            title: baseTitle,
            type: found.type || 'quiz',
            questions: normalized,
            isPremade: true,
            assigned_by: 'coach-smith',
          };
          startQuiz(payload, displaySubjectName(subject));
          return true;
        } catch (e) {
          console.warn(
            'launchPremadeByCodeGlobal failed',
            subject,
            quizCode,
            e
          );
          return false;
        }
      };

      // Open a coach-assigned premade quiz by code (search across subjects)
      const openQuizFromCoach = (quizCode) => {
        if (!quizCode) return;
        const SUBJECTS = [
          'Math',
          'Science',
          'RLA',
          'Social Studies',
          'Workforce',
        ];
        for (const subj of SUBJECTS) {
          if (launchPremadeByCodeGlobal(subj, quizCode)) return; // stop on first successful launch
        }
        alert("Unable to open today's quiz right now.");
      };

      const todaysTasks = React.useMemo(() => {
        if (
          !weeklyCoachPlan ||
          !Array.isArray(weeklyCoachPlan?.days) ||
          weeklyCoachPlan.days.length === 0
        )
          return [];
        let idx = getTodayIndex(weeklyCoachPlan.weekStart);
        if (idx < 0 || idx >= weeklyCoachPlan.days.length) idx = 0;
        const day = weeklyCoachPlan.days[idx];
        return Array.isArray(day.tasks) ? day.tasks : [];
      }, [weeklyCoachPlan]);

      const todaysTaskGroups = React.useMemo(() => {
        const groups = new Map();
        todaysTasks.forEach((task) => {
          if (!task) return;
          const subjectId = canonicalSubjectId(
            task.subject || task.subjectLabel || ''
          );
          const subjectLabel = displaySubjectName(
            task.subjectLabel || task.subject
          );
          if (!groups.has(subjectId)) {
            groups.set(subjectId, { subjectId, subjectLabel, tasks: [] });
          }
          groups.get(subjectId).tasks.push(task);
        });
        return Array.from(groups.values());
      }, [todaysTasks]);

      const dailyProgressMap = React.useMemo(() => {
        const map = new Map();
        (Array.isArray(coachDailySubjects) ? coachDailySubjects : []).forEach(
          (entry) => {
            if (!entry) return;
            const id = canonicalSubjectId(entry.subject);
            map.set(id, entry);
          }
        );
        return map;
      }, [coachDailySubjects]);

      const openCoachTask = (task) => {
        if (!task) return;
        const subjectLabel = displaySubjectName(
          task.subjectLabel || task.subject
        );
        const subjectId = canonicalSubjectId(
          task.subject || task.subjectLabel || ''
        );
        if (task.type === 'coach-quiz') {
          // Launch the PREMADE composite quiz using the weekly plan's focusTag
          const focusTag =
            Array.isArray(task.focus) && task.focus.length > 0
              ? task.focus[0]
              : null;
          startPremadeCompositeForSubject(subjectLabel, focusTag);
          return;
        }
        if (task.quizId) {
          const launched = launchPremadeByCodeGlobal(subjectLabel, task.quizId);
          if (!launched) {
            if (task.quizPath) {
              window.location.href = task.quizPath;
            } else {
              alert('Unable to open this quiz right now.');
            }
          }
          return;
        }
        if (task.quizPath) {
          window.location.href = task.quizPath;
          return;
        }
        if (task.message) {
          alert(task.message);
        }
      };

      // Weekly Coach: 20Q premade composite quiz via premade-composite endpoint
      const startPremadeCompositeForSubject = async (
        subject,
        focusTag = null
      ) => {
        if (!window.__COACH_ENABLED__) return;
        try {
          const token =
            (typeof localStorage !== 'undefined' &&
              localStorage.getItem('appToken')) ||
            null;
          if (!token) {
            alert('Please sign in to start your practice quiz.');
            return;
          }
          setIsLoading(true);
          setLoadingMessage(`Loading your practice quiz for ${subject}…`);

          // normalize subject to what the backend expects
          const subjectSlug = practiceSubjectParam
            ? practiceSubjectParam(subject)
            : String(subject).toLowerCase().replace(/\s+/g, '-');

          const res = await fetch(
            `${API_BASE_URL}/api/coach/${encodeURIComponent(
              subjectSlug
            )}/premade-composite`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ focusTag }),
            }
          );

          if (!res.ok) {
            throw new Error(`premade-composite HTTP ${res.status}`);
          }

          const data = await res.json();
          const quiz = data?.quiz;

          console.log('[coach] premade-composite response:', {
            status: res.status,
            ok: data?.ok,
            hasQuiz: !!quiz,
            questions: Array.isArray(quiz?.questions)
              ? quiz.questions.length
              : 0,
          });

          if (
            !quiz ||
            !Array.isArray(quiz.questions) ||
            quiz.questions.length === 0
          ) {
            throw new Error('no quiz in premade-composite response');
          }

          // ✅ robust quiz launcher
          const displaySubject = displaySubjectName
            ? displaySubjectName(subject)
            : subject;

          const launchQuiz =
            (typeof window !== 'undefined' && window.__GED_START_QUIZ__) ||
            (typeof startQuiz === 'function' ? startQuiz : null);

          if (launchQuiz) {
            launchQuiz({ ...quiz, assigned_by: 'coach-smith' }, displaySubject);
          } else {
            console.warn(
              '[coach] quiz was built but no launcher was available. quiz id:',
              quiz.id
            );
          }
        } catch (err) {
          console.error('[coach] startPremadeCompositeForSubject failed:', err);
          alert('Unable to start Coach Smith quiz right now.');
        } finally {
          setIsLoading(false);
          // ✅ do not let coach-panel refresh kill a successful quiz
          try {
            await refreshCoachPanels();
          } catch (e) {
            console.warn(
              '[coach] non-fatal: failed to refresh coach panels after quiz start',
              e
            );
          }
        }
      };

      const startCoachQuizForSubject = async (subject, focusTag) => {
        if (!window.__COACH_ENABLED__) return;
        try {
          const token =
            (typeof localStorage !== 'undefined' &&
              localStorage.getItem('appToken')) ||
            null;
          if (!token) {
            alert("Please sign in to take today's coach quiz.");
            return;
          }
          setIsLoading(true);
          setLoadingMessage(`Loading your practice quiz for ${subject}…`);

          const displaySubject = displaySubjectName(subject);

          // Call the correct function that builds a PREMADE composite quiz
          await startPremadeCompositeForSubject(displaySubject, focusTag);
        } catch (e) {
          alert('Unable to start Coach Smith quiz right now.');
        } finally {
          setIsLoading(false);
        }
      };

      // Ask Coach (subject) temporarily disabled; keep stub so callers won't break
      const startDailyCompositeForSubject = async (subject, focusTag) => {
        console.log(
          'startDailyCompositeForSubject skipped: Ask Coach disabled.'
        );
        return; // early no-op
      };

      const handleAskCoach = async (subjectHint) => {
        if (!window.__ASK_COACH_ENABLED__) return;
        try {
          setAdviceLoading(true);
          setAdviceError('');
          setAdviceText('');
          const subj = subjectHint || selectedSubject;
          if (!subj) {
            alert('Pick a subject first.');
            return;
          }
          await startDailyCompositeForSubject(subj);
        } catch (e) {
          setAdviceError(e?.message || 'Unable to start coach quiz right now.');
        } finally {
          setAdviceLoading(false);
        }
      };
      const [viewScienceFormulas, setViewScienceFormulas] = useState(false);
      const [onboardingBannerHidden, setOnboardingBannerHidden] = useState(
        () => {
          try {
            return (
              typeof sessionStorage !== 'undefined' &&
              sessionStorage.getItem('hide_onboarding_banner') === 'true'
            );
          } catch (_) {
            return false;
          }
        }
      );
      const isDarkMode = theme === 'dark';
      const homePanelStyle = isDarkMode
        ? undefined
        : {
            backgroundColor: '#ffffff',
            color: '#0f172a',
            borderColor: 'rgba(148,163,184,0.32)',
          };
      const homePanelPrimaryTextClass = isDarkMode
        ? 'text-slate-300'
        : 'text-slate-900';
      const vocabularyData =
        vocabulary && typeof vocabulary === 'object' ? vocabulary : {};
      const profile = profileData?.profile || {};
      const challengeOptions = Array.isArray(profileData?.challengeOptions)
        ? profileData.challengeOptions
        : [];
      const selectedChallenges = challengeOptions.filter((opt) => opt.selected);
      const displayedChallenges = selectedChallenges.slice(0, 4);
      const hiddenChallengeCount = Math.max(
        0,
        selectedChallenges.length - displayedChallenges.length
      );
      const recentDashboardSummary = profileData?.recentScoresDashboard || {};
      const testPlan = Array.isArray(profileData?.testPlan)
        ? profileData.testPlan
        : [];
      const nextUpcomingTest = profileData?.nextUpcomingTest || null;
      const hasSavedTest = testPlan.some(
        (entry) => entry && (entry.passed || entry.testDate)
      );
      const allSubjectsPassed =
        testPlan.length > 0 && testPlan.every((entry) => entry.passed);
      const formatDayCount = (value) => {
        if (typeof value !== 'number' || !Number.isFinite(value)) {
          return null;
        }
        const rounded = Math.max(0, Math.floor(value));
        return `${rounded} day${rounded === 1 ? '' : 's'}`;
      };
      const upcomingMatch = nextUpcomingTest
        ? testPlan.find(
            (entry) =>
              entry.subject === nextUpcomingTest.subject &&
              entry.testDate === nextUpcomingTest.testDate
          )
        : null;
      const nextUpcomingSummary =
        nextUpcomingTest && nextUpcomingTest.testDate
          ? {
              subject: nextUpcomingTest.subject,
              testDate: nextUpcomingTest.testDate,
              daysUntilText: formatDayCount(nextUpcomingTest.daysUntil),
              location: upcomingMatch?.testLocation || null,
            }
          : null;
      const userDisplayName =
        currentUser?.name || currentUser?.email || 'Learner';
      const userInitial = userDisplayName
        ? userDisplayName.trim().charAt(0).toUpperCase()
        : 'U';
      const hasVocabulary = Object.values(vocabularyData).some(
        (words) => Array.isArray(words) && words.length > 0
      );
      const goToProfile = () => {
        onShowProfile?.();
      };
      const hideOnboardingBanner = () => {
        setOnboardingBannerHidden(true);
        try {
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('hide_onboarding_banner', 'true');
          }
        } catch (_) {
          // ignore
        }
      };

      // --- Upcoming GED Test (profile-level) helpers ---
      const parseYMD = (str) => {
        if (!str || typeof str !== 'string') return null;
        const m = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (!m) return null;
        const y = Number(m[1]);
        const mo = Number(m[2]);
        const d = Number(m[3]);
        if (!y || !mo || !d) return null;
        return new Date(y, mo - 1, d);
      };
      const toLocalMidnight = (dt) =>
        dt ? new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()) : null;
      const formatMMDDYYYY = (dt) => {
        if (!(dt instanceof Date) || isNaN(dt)) return 'Invalid date';
        const mm = String(dt.getMonth() + 1).padStart(2, '0');
        const dd = String(dt.getDate()).padStart(2, '0');
        const yyyy = dt.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
      };
      const diffDaysFromToday = (dateStr) => {
        const examLocal = toLocalMidnight(parseYMD(dateStr));
        if (!examLocal) return null;
        const today = new Date();
        const todayLocal = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
        const msPerDay = 1000 * 60 * 60 * 24;
        return Math.ceil((examLocal - todayLocal) / msPerDay);
      };

      // Refresh test plan on dashboard mount to reduce staleness
      useEffect(() => {
        onRefreshProfile?.();
      }, []);

      // Build upcoming list from testPlan with filtering and sorting
      const parseAnyDate = (s) => {
        if (!s || typeof s !== 'string') return null;
        if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return parseYMD(s);
        const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (m) {
          const mm = Number(m[1]);
          const dd = Number(m[2]);
          const yyyy = Number(m[3]);
          return new Date(yyyy, mm - 1, dd);
        }
        return null;
      };
      const toISO = (dt) =>
        dt
          ? `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(
              2,
              '0'
            )}-${String(dt.getDate()).padStart(2, '0')}`
          : '';
      const todayLocal = new Date();
      const todayStart = new Date(
        todayLocal.getFullYear(),
        todayLocal.getMonth(),
        todayLocal.getDate()
      );
      const upcomingList = useMemo(() => {
        const rows = [];
        for (const entry of testPlan) {
          if (!entry) continue;
          const passed = !!entry.passed;
          const notScheduled = !!entry.notScheduled;
          const rawDate = entry.testDate || '';
          if (passed || notScheduled || !rawDate) continue;
          const dt = parseAnyDate(rawDate);
          if (!dt || isNaN(dt)) continue;
          const d0 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
          if (d0 < todayStart) continue; // past
          rows.push({
            subject: entry.subject || '',
            dateISO: toISO(d0),
            formattedDate: formatMMDDYYYY(d0),
            location: entry.testLocation || null,
            daysUntil: Math.ceil((d0 - todayStart) / (1000 * 60 * 60 * 24)),
          });
        }
        rows.sort((a, b) =>
          a.dateISO < b.dateISO ? -1 : a.dateISO > b.dateISO ? 1 : 0
        );
        return rows.slice(0, 4);
      }, [testPlan]);
      const countdownLabel = (days) => {
        if (typeof days !== 'number' || !Number.isFinite(days)) return null;
        if (days <= 0) return 'Today';
        if (days === 1) return '1 day left';
        return `${days} days left`;
      };

      const normalizedProfileTestDate = testDate || null;
      const testDateDiffDays = normalizedProfileTestDate
        ? diffDaysFromToday(normalizedProfileTestDate)
        : null;
      const testDateDisplay = normalizedProfileTestDate
        ? formatMMDDYYYY(parseYMD(normalizedProfileTestDate))
        : null;

      // Decide which upcoming panel to show (avoid duplicates)
      const showPlanCard = Boolean(
        nextUpcomingSummary || hasSavedTest || allSubjectsPassed
      );
      const showProfileCard = !showPlanCard;

      const [showTestReminder, setShowTestReminder] = useState(null);
      useEffect(() => {
        const todayKey = new Date().toISOString().slice(0, 10);
        const storageKey = `seenTestReminder:${todayKey}`;

        // Profile-level single test date: remind for upcoming/today (>= 0 days)
        if (normalizedProfileTestDate) {
          const days = diffDaysFromToday(normalizedProfileTestDate);
          if (days != null && days >= 0) {
            try {
              const hasSeen =
                typeof localStorage !== 'undefined' &&
                localStorage.getItem(storageKey);
              if (!hasSeen) {
                const exam = parseYMD(normalizedProfileTestDate);
                setShowTestReminder({
                  days,
                  date: exam
                    ? exam.toISOString().slice(0, 10)
                    : normalizedProfileTestDate,
                });
                localStorage.setItem(storageKey, '1');
                return; // show only one reminder per day
              }
            } catch (_) {}
          }
        }

        // NEW: Test-plan nextUpcomingTest – also show when the next scheduled test is today
        if (nextUpcomingTest && nextUpcomingTest.testDate) {
          const daysFromPlan =
            typeof nextUpcomingTest.daysUntil === 'number'
              ? Math.floor(nextUpcomingTest.daysUntil)
              : diffDaysFromToday(nextUpcomingTest.testDate);
          if (daysFromPlan === 0) {
            try {
              const hasSeen =
                typeof localStorage !== 'undefined' &&
                localStorage.getItem(storageKey);
              if (!hasSeen) {
                const exam = parseYMD(nextUpcomingTest.testDate);
                setShowTestReminder({
                  days: 0,
                  date: exam
                    ? exam.toISOString().slice(0, 10)
                    : nextUpcomingTest.testDate,
                });
                localStorage.setItem(storageKey, '1');
              }
            } catch (_) {}
          }
        }
      }, [
        normalizedProfileTestDate,
        nextUpcomingTest?.testDate,
        nextUpcomingTest?.daysUntil,
      ]);

      const handleSelectSubject = (subject) => {
        if (typeof onSelectSubject === 'function') {
          onSelectSubject(subject);
        }
        setAiQuizTopic('');
        setViewScienceFormulas(false);
      };

      const handleSelectCategory = (category) => {
        if (typeof onSelectCategory === 'function') {
          onSelectCategory(category);
        }
      };

      const handleViewVocabulary = (subject) => {
        if (!subject) return;
        const words = vocabularyData[subject];
        if (Array.isArray(words) && words.length > 0) {
          if (typeof onSelectSubject === 'function') {
            onSelectSubject(subject);
          }
          setAiQuizTopic('');
          setTimeout(() => {
            const section = document.getElementById(
              'subject-vocabulary-section'
            );
            if (section) {
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 200);
        }
      };

      const handleStartVocabularyQuiz = async (subject) => {
        if (!subject) return;
        try {
          const normalizedSubject = subject
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[()]/g, '');

          const res = await fetch(
            `${API_BASE_URL}/api/vocabulary-quiz/${normalizedSubject}`
          );

          if (!res.ok) {
            throw new Error(
              `Failed to fetch vocabulary quiz: ${res.statusText}`
            );
          }

          const data = await res.json();

          // backend returns { subject, count, quiz: [...] }
          if (data && data.quiz) {
            if (typeof onSelectQuiz === 'function') {
              onSelectQuiz(data.quiz, subject);
            }
          } else {
            throw new Error('Invalid quiz data received from server');
          }
        } catch (err) {
          console.error('Error loading vocabulary quiz:', err);
          alert('Failed to load vocabulary quiz. Please try again.');
        }
      };

      const handleBack = () => {
        if (typeof onBack === 'function') {
          onBack();
          return;
        }
        // Fallback behavior if onBack isn't provided
        if (selectedCategory && typeof onSelectCategory === 'function') {
          onSelectCategory(null);
          setAiQuizTopic('');
          return;
        }
        if (selectedSubject && typeof onSelectSubject === 'function') {
          onSelectSubject(null);
          setAiQuizTopic('');
          setShowFormulaSheet?.(false);
          setViewScienceFormulas(false);
        }
      };

      // --- Earned badges (passed subjects) --- (uses global SUBJECT_ID_MAP / BADGE_IMG_PATHS)
      const profilePassedMap = useMemo(() => {
        const map = {};
        const plan = Array.isArray(profileData?.testPlan)
          ? profileData.testPlan
          : [];
        const SUBJECT_ID_MAP_SAFE =
          (typeof window !== 'undefined' && window.SUBJECT_ID_MAP) ||
          SUBJECT_ID_MAP;
        plan.forEach((row) => {
          if (!row || !row.subject) return;
          const id = SUBJECT_ID_MAP_SAFE[row.subject] || null;
          if (!id) return;
          if (row.passed === true) map[id] = true;
        });
        // Also check profile.tests if present
        const pt = profileData?.profile?.tests;
        if (pt && typeof pt === 'object') {
          Object.entries(pt).forEach(([key, val]) => {
            if (!val) return;
            const id = key;
            if (val.passed === true || val.isPassed === true) map[id] = true;
          });
        }
        return map;
      }, [profileData?.testPlan, profileData?.profile?.tests]);
      const progressPassedMap = useMemo(() => {
        const map = {};
        const SUBJECT_ID_MAP_SAFE =
          (typeof window !== 'undefined' && window.SUBJECT_ID_MAP) ||
          SUBJECT_ID_MAP;
        const subjectNames = Object.keys(SUBJECT_ID_MAP_SAFE);
        subjectNames.forEach((label) => {
          const id = SUBJECT_ID_MAP_SAFE[label];
          const p = progress?.[label] || {};
          const passedCount = Array.isArray(p?.passedExamCodes)
            ? p.passedExamCodes.length
            : typeof p?.completedCount === 'number'
            ? p.completedCount
            : 0;
          if (passedCount > 0) map[id] = true;
        });
        return map;
      }, [progress]);
      // Self-declared "already passed" check: require all four subjects to be marked passed in profile/test plan
      const allSubjectsSelfDeclaredPassed = useMemo(() => {
        try {
          const required = ['math', 'rla', 'science', 'social_studies'];
          if (!profilePassedMap || typeof profilePassedMap !== 'object')
            return false;
          let count = 0;
          for (const id of required) {
            if (profilePassedMap[id] === true) count += 1;
          }
          return count === required.length;
        } catch {
          return false;
        }
      }, [profilePassedMap]);
      const earnedBadges = useMemo(() => {
        const ids = new Set();
        Object.entries(profilePassedMap).forEach(([id, val]) => {
          if (val) ids.add(id);
        });
        Object.entries(progressPassedMap).forEach(([id, val]) => {
          if (val) ids.add(id);
        });
        const order = ['math', 'rla', 'science', 'social_studies'];
        return order
          .filter((id) => ids.has(id))
          .map((id) => ({
            id,
            label:
              id === 'rla'
                ? 'Reasoning Through Language Arts (RLA)'
                : id === 'social_studies'
                ? 'Social Studies'
                : id.charAt(0).toUpperCase() + id.slice(1).replace('_', ' '),
            img: BADGE_IMG_PATHS[id],
          }));
      }, [profilePassedMap, progressPassedMap]);

      // Restore: clicking a subject opens its premade list view (do not auto-start a quiz)
      const openSubjectPremades = (subjectLabel) => {
        const subjectKey = subjectLabel; // labels already match keys in AppData
        handleSelectSubject(subjectKey);
      };

      // Compute RLA essay avg display for details view
      const rlaEssayAvgDisplayForDetails = useMemo(() => {
        if (detailedViewSubject !== 'Reasoning Through Language Arts (RLA)')
          return null;
        const cards = Array.isArray(recentDashboardSummary?.cards)
          ? recentDashboardSummary.cards
          : [];
        const card = cards.find(
          (c) => c && (c.id === 'rla_essay_avg' || c.subject === 'RLA')
        );
        if (!card) return null;
        if (card.value && typeof card.value.display === 'string')
          return card.value.display;
        if (typeof card.value === 'number')
          return `${(Math.round(card.value * 10) / 10).toFixed(1)} / 6`;
        return null;
      }, [detailedViewSubject, recentDashboardSummary]);

      // --- NEW: If detailed view is active, render it instead of the main dashboard ---
      if (detailedViewSubject) {
        return (
          <DetailedProgressView
            subject={detailedViewSubject}
            progressData={progress[detailedViewSubject]}
            onBack={() => setDetailedViewSubject(null)}
            rlaEssayAvgDisplay={rlaEssayAvgDisplayForDetails}
          />
        );
      }

      // --- NEW: Logic to get topics for the dropdown (moved from AIQuizGenerator) ---
      // Build strictly from the canonical list; do NOT derive from filenames or AppData quiz sets.
      const dropVariantish = (name) => {
        if (!name) return false;
        const t = String(name).toLowerCase();
        return /quiz\b|\bset\b|version\b|form\s*[a-z]\b|practice\b/.test(t)
          ? false
          : true;
      };
      const dedupeCI = (arr) => {
        const seen = new Set();
        const out = [];
        arr.forEach((s) => {
          const key = String(s || '')
            .trim()
            .toLowerCase();
          if (!key || seen.has(key)) return;
          seen.add(key);
          out.push(s);
        });
        return out;
      };
      const availableTopics = (() => {
        if (!selectedSubject) return [];
        try {
          if (
            typeof window !== 'undefined' &&
            typeof window.getSmithAQuizTopics === 'function'
          ) {
            const list = window.getSmithAQuizTopics(selectedSubject) || [];
            return dedupeCI(list.filter(dropVariantish));
          }
        } catch {}
        // No fallback: when canonical list is unavailable, return empty to avoid reintroducing filename-derived topics
        return [];
      })();

      const Breadcrumb = ({ variant = 'default', color, accentColor } = {}) => {
        const isOnColor = variant === 'onColor';
        const resolvedColor = color || (isOnColor ? '#ffffff' : '#475569');
        const resolvedAccent = accentColor || resolvedColor;
        const backLabel = selectedCategory
          ? `Back to ${selectedSubject}`
          : 'Back to Main Menu';

        return (
          <div
            className={`mb-4 text-lg font-semibold flex items-center gap-2 ${
              isOnColor ? '' : 'text-slate-600'
            }`}
            style={isOnColor ? { color: resolvedColor } : undefined}
          >
            <button
              type="button"
              onClick={handleBack}
              className={`flex items-center gap-2 ${
                isOnColor ? 'transition-colors' : 'text-sky-600 hover:underline'
              }`}
              style={isOnColor ? { color: resolvedAccent } : undefined}
              aria-label={backLabel}
            >
              <ArrowLeftIcon />
              <span>{backLabel}</span>
            </button>
            <span>/</span>
            <span style={isOnColor ? { color: resolvedColor } : undefined}>
              {selectedSubject}
            </span>
            {selectedCategory && (
              <>
                <span>/</span>
                <span
                  className={isOnColor ? '' : 'text-slate-800'}
                  style={isOnColor ? { color: resolvedAccent } : undefined}
                >
                  {selectedCategory}
                </span>
              </>
            )}
          </div>
        );
      };

      // View 3: Topic Selection (with Category Sets)
      if (selectedSubject && selectedCategory) {
        const [variantExpanded, setVariantExpanded] = React.useState({});
        const rawTopics =
          AppData[selectedSubject].categories[selectedCategory].topics || [];
        // Collapse variants under canonical topic headings for a cleaner selector
        const topics = buildCanonicalTopics(
          selectedSubject,
          selectedCategory,
          rawTopics
        );
        const subjectColors =
          SUBJECT_COLORS[selectedSubject] || DEFAULT_COLOR_SCHEME;
        const lightTint =
          SUBJECT_LIGHT_TINTS[selectedSubject] || 'rgba(148,163,184,0.28)';
        const lightCardBackground =
          SUBJECT_LIGHT_SURFACE_GRADIENTS[selectedSubject] ||
          'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(148,163,184,0.12))';
        const cardTextColor =
          subjectColors.text || subjectColors.heroText || '#0f172a';
        const badgeTextColor =
          subjectColors.text || subjectColors.accent || '#0f172a';
        const gradientBackground = isDarkMode
          ? SUBJECT_BG_GRADIENTS[selectedSubject]
          : SUBJECT_LIGHT_SURFACE_GRADIENTS[selectedSubject] ||
            SUBJECT_BG_GRADIENTS[selectedSubject];
        const heroStyles = isDarkMode
          ? gradientBackground
            ? { backgroundImage: gradientBackground }
            : subjectColors.background
            ? { backgroundColor: subjectColors.background }
            : { backgroundColor: DEFAULT_COLOR_SCHEME.background }
          : {
              backgroundColor: '#ffffff',
              backgroundImage:
                gradientBackground ||
                'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(148,163,184,0.12))',
              border: `1px solid ${
                SUBJECT_LIGHT_TINTS[selectedSubject] || 'rgba(148,163,184,0.35)'
              }`,
            };
        const heroTextColor = isDarkMode
          ? subjectColors.heroText ||
            subjectColors.onBackgroundText ||
            '#ffffff'
          : subjectColors.text || subjectColors.accent || '#0f172a';
        const heroAccentColor =
          subjectColors.accent || subjectColors.text || '#0f172a';
        const primaryBtnColor =
          subjectColors.accent || subjectColors.background || '#2563eb';
        const primaryBtnText = '#ffffff';
        const backButtonStyle = isDarkMode
          ? {
              backgroundColor: 'rgba(255,255,255,0.18)',
              color: heroTextColor,
              border: `1px solid ${
                subjectColors.border || 'rgba(255,255,255,0.25)'
              }`,
            }
          : {
              backgroundColor: '#ffffff',
              color: heroAccentColor,
              border: `1px solid ${
                SUBJECT_LIGHT_TINTS[selectedSubject] || 'rgba(148,163,184,0.35)'
              }`,
            };
        // Read category-level sets (grouped in 3s) if present
        const categoryObj =
          AppData[selectedSubject].categories[selectedCategory] || {};
        // Support both legacy "sets" map and backend-provided quizSets array
        const categorySetsMap = (() => {
          if (categoryObj && categoryObj.sets) return categoryObj.sets;
          if (Array.isArray(categoryObj?.quizSets)) {
            return categoryObj.quizSets.reduce((acc, s) => {
              const key =
                s && s.title
                  ? String(s.title)
                  : `Set ${Object.keys(acc).length + 1}`;
              const quizzes = Array.isArray(s?.quizzes) ? s.quizzes : [];
              acc[key] = quizzes;
              return acc;
            }, {});
          }
          return {};
        })();
        const orderedSetNames = Object.keys(categorySetsMap).sort((a, b) => {
          const na = parseInt(String(a).replace(/\D+/g, ''), 10) || 0;
          const nb = parseInt(String(b).replace(/\D+/g, ''), 10) || 0;
          return na - nb;
        });

        const launchCategorySet = (setName) => {
          if (typeof onSelectQuiz !== 'function') return;
          const quizzes = Array.isArray(categorySetsMap[setName])
            ? categorySetsMap[setName]
            : [];
          if (!quizzes.length) return;

          const subjectName = selectedSubject;
          // Combine questions from each quiz in the set, normalizing assets and renumbering
          const combinedQuestions = [];
          quizzes.forEach((quiz) => {
            if (!quiz || typeof quiz !== 'object') return;
            const sourceTopic = quiz.questionSourceTopicId
              ? getTopicById(subjectName, quiz.questionSourceTopicId)
              : null;
            const resolved =
              Array.isArray(quiz.questions) && quiz.questions.length
                ? quiz.questions
                : resolveQuizQuestions(subjectName, sourceTopic, quiz);
            (resolved || []).forEach((q) => {
              const withNum = q && typeof q === 'object' ? { ...q } : q;
              combinedQuestions.push(
                normalizeQuestionAssets(withNum, subjectName)
              );
            });
          });
          // Ensure sequential numbering and a reasonable minimum length
          const prepared = {
            questions: combinedQuestions.map((q, i) =>
              q && typeof q === 'object'
                ? { ...q, questionNumber: q.questionNumber ?? i + 1 }
                : q
            ),
          };
          ensureMinQuestions(prepared, subjectName, 12);

          const setIndex = orderedSetNames.findIndex((n) => n === setName);
          const setNumber = setIndex >= 0 ? setIndex + 1 : 1;
          const title = `${selectedSubject} – ${selectedCategory} Set ${setNumber}`;
          const subjectSlug = sanitizeCodeSegment(selectedSubject, 'subject');
          const categorySlug = sanitizeCodeSegment(
            selectedCategory,
            'category'
          );
          const quizCode = [subjectSlug, categorySlug, `set-${setNumber}`].join(
            '__'
          );

          const preparedQuiz = {
            id: quizCode,
            quizCode,
            title,
            topicId: null,
            topicTitle: selectedCategory,
            canonicalTopicTitle: selectedCategory,
            description: `${selectedCategory} practice – combined set of 3 quizzes`,
            type: 'quiz',
            questions: prepared.questions,
          };

          if (!preparedQuiz.questions || !preparedQuiz.questions.length) {
            alert(
              'This set does not have any questions yet. Please try another set.'
            );
            return;
          }
          onSelectQuiz(preparedQuiz, subjectName);
        };

        return (
          <>
            <div
              className="hero-section animate-floatIn rounded-2xl -m-4 sm:-m-6 md:-m-8 p-4 sm:p-6 md:p-8 shadow-2xl"
              style={{
                ...heroStyles,
                '--hero-text-color': heroTextColor,
                '--hero-accent-color': heroAccentColor,
              }}
            >
              <Breadcrumb
                variant="onColor"
                color={heroTextColor}
                accentColor={heroAccentColor}
              />
              <h2 className="hero-title text-3xl font-extrabold mb-4">
                {selectedCategory}
              </h2>
              {orderedSetNames.length > 0 && (
                <div className="mb-6 rounded-xl border bg-white/95 dark:bg-slate-900/80 dark:border-slate-700 p-5 shadow-lg">
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={
                      isDarkMode
                        ? { color: heroTextColor }
                        : { color: heroAccentColor }
                    }
                  >
                    Practice Sets
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {orderedSetNames.map((setName, idx) => (
                      <button
                        key={setName}
                        onClick={() => launchCategorySet(setName)}
                        className="w-full px-4 py-2 rounded-lg font-semibold shadow-sm transition hover:opacity-95"
                        style={{
                          backgroundColor:
                            subjectColors.accent || DEFAULT_COLOR_SCHEME.accent,
                          color: subjectColors.accentText || '#ffffff',
                          borderColor:
                            subjectColors.border ||
                            subjectColors.accent ||
                            DEFAULT_COLOR_SCHEME.accent,
                        }}
                      >
                        Start{' '}
                        {`${selectedSubject} – ${selectedCategory} Set ${
                          idx + 1
                        }`}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topics.length === 0 && (
                  <div className="col-span-full text-center text-sm text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-800/60 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6">
                    Premade quizzes for this category are coming soon.
                  </div>
                )}
                {topics.map((topic, topicIndex) => {
                  const quizSets = Array.isArray(topic.quizzes)
                    ? topic.quizzes.filter((quiz) =>
                        quizHasAvailableQuestions(selectedSubject, topic, quiz)
                      )
                    : [];
                  const supportsMultipleQuizzes =
                    quizSets.length > 0 &&
                    ![
                      'essay',
                      'simulation',
                      'graphing_tool',
                      'geometry_tool',
                    ].includes(topic.type);
                  const buttonStyle = {
                    backgroundColor:
                      subjectColors.accent || DEFAULT_COLOR_SCHEME.accent,
                    color: subjectColors.accentText || '#ffffff',
                    borderColor:
                      subjectColors.border ||
                      subjectColors.accent ||
                      DEFAULT_COLOR_SCHEME.accent,
                    boxShadow: !isDarkMode
                      ? '0 12px 24px -18px rgba(15,23,42,0.45)'
                      : undefined,
                  };
                  const defaultButtonLabel =
                    topic.type === 'essay' ||
                    topic.type === 'simulation' ||
                    topic.type === 'graphing_tool' ||
                    topic.type === 'geometry_tool'
                      ? 'Open'
                      : 'Start Quiz';

                  const launchQuizSet = (quiz, index) => {
                    if (typeof onSelectQuiz !== 'function' || !quiz) {
                      return;
                    }
                    const quizLabel =
                      quiz.label || `Quiz ${String.fromCharCode(65 + index)}`;
                    const baseTitle = topic.title || 'Quiz';
                    const derivedTitle =
                      quiz.title || `${baseTitle} – ${quizLabel}`;
                    const quizIdBase = topic.id || `topic_${topicIndex}`;
                    const resolvedQuestions = resolveQuizQuestions(
                      selectedSubject,
                      topic,
                      quiz
                    ).map((question, questionIndex) => {
                      if (question && typeof question === 'object') {
                        const nextNumber =
                          question.questionNumber ?? questionIndex + 1;
                        return { ...question, questionNumber: nextNumber };
                      }
                      return question;
                    });

                    if (!resolvedQuestions.length) {
                      alert(
                        'This quiz does not have any questions yet. Please try another set.'
                      );
                      return;
                    }

                    const quizCode =
                      quiz.quizCode || `${quizIdBase}_set_${index}`;
                    const sourceTopic = quiz.questionSourceTopicId
                      ? getTopicById(
                          selectedSubject,
                          quiz.questionSourceTopicId
                        )
                      : null;
                    const articleSource =
                      quiz.article ||
                      topic.article ||
                      (sourceTopic && sourceTopic.article);
                    const articleClone = cloneArticle(articleSource);
                    const resolvedImageUrl =
                      quiz.imageUrl ||
                      topic.imageUrl ||
                      (sourceTopic && sourceTopic.imageUrl) ||
                      (articleClone && articleClone.imageUrl) ||
                      (articleSource && articleSource.imageUrl);

                    const preparedQuiz = {
                      ...quiz,
                      id: quiz.quizId || quizCode,
                      quizCode,
                      title: derivedTitle,
                      topicId: topic.id,
                      topicTitle: topic.title || baseTitle,
                      canonicalTopicTitle: topic.title || baseTitle,
                      description: quiz.description || topic.description,
                      type:
                        quiz.type ||
                        topic.type ||
                        (sourceTopic ? sourceTopic.type : 'quiz') ||
                        'quiz',
                      questions: resolvedQuestions,
                    };

                    if (articleClone) {
                      preparedQuiz.article = articleClone;
                    }
                    if (!preparedQuiz.imageUrl && resolvedImageUrl) {
                      preparedQuiz.imageUrl = resolvedImageUrl;
                    }

                    onSelectQuiz(preparedQuiz, selectedSubject);
                  };

                  return (
                    <div
                      key={topic.id || `topic_${topicIndex}`}
                      className="rounded-xl border bg-white/95 dark:bg-slate-900/80 dark:border-slate-700 p-5 flex flex-col justify-between shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-2xl"
                      style={
                        isDarkMode
                          ? {
                              borderColor:
                                subjectColors.border ||
                                'rgba(148,163,184,0.35)',
                              color: subjectColors.text || '#f8fafc',
                            }
                          : {
                              borderColor: lightTint,
                              backgroundColor: '#ffffff',
                              backgroundImage: lightCardBackground,
                              color: cardTextColor,
                              boxShadow:
                                '0 22px 45px -34px rgba(15,23,42,0.45)',
                            }
                      }
                    >
                      <div>
                        <h3
                          className="text-xl font-bold"
                          style={
                            isDarkMode
                              ? { color: subjectColors.text || '#f8fafc' }
                              : { color: cardTextColor }
                          }
                        >
                          {topic.title}
                        </h3>
                        <p
                          className="text-sm my-3 flex-grow"
                          style={
                            isDarkMode
                              ? { color: 'rgba(226,232,240,0.82)' }
                              : { color: 'rgba(15,23,42,0.78)' }
                          }
                        >
                          {topic.description}
                        </p>
                      </div>
                      {supportsMultipleQuizzes
                        ? (() => {
                            const sorted = sortVariantsStable(quizSets);
                            const list = sorted.map((q, i) => ({
                              quiz: q,
                              name: getVariantDisplayName(
                                selectedSubject,
                                topic.title,
                                i
                              ),
                            }));
                            const expKey = `topic-variants:${sanitizeCodeSegment(
                              selectedSubject
                            )}:${topic.id || `topic_${topicIndex}`}`;
                            const expanded = !!variantExpanded[expKey];
                            const setExpanded = (val) =>
                              setVariantExpanded((prev) => ({
                                ...prev,
                                [expKey]: val,
                              }));
                            const shown = expanded ? list : list.slice(0, 3);
                            return (
                              <div className="mt-2 space-y-3 w-full">
                                <div className="grid gap-2">
                                  {shown.map(({ quiz, name }, index) => (
                                    <button
                                      key={
                                        quiz.quizId ||
                                        `${
                                          topic.id || `topic_${topicIndex}`
                                        }_quiz_${index}`
                                      }
                                      onClick={() =>
                                        launchQuizSet(quiz, index, name)
                                      }
                                      className="w-full mt-2 px-4 py-2 rounded-lg font-semibold shadow-sm transition hover:opacity-95"
                                      style={buttonStyle}
                                    >
                                      Start {name}
                                    </button>
                                  ))}
                                </div>
                                {list.length > shown.length && (
                                  <button
                                    type="button"
                                    className="text-sm underline"
                                    aria-expanded={expanded}
                                    onClick={() => setExpanded(!expanded)}
                                  >
                                    {expanded
                                      ? 'Show fewer'
                                      : 'More in this topic…'}
                                  </button>
                                )}
                              </div>
                            );
                          })()
                        : (() => {
                            const fallbackTopicSlug = sanitizeCodeSegment(
                              topic.title || `topic-${topicIndex + 1}`,
                              `topic-${topicIndex + 1}`
                            );
                            const subjectSlug = sanitizeCodeSegment(
                              selectedSubject,
                              'subject'
                            );
                            const topicQuizCode =
                              topic.quizCode ||
                              topic.id ||
                              `${subjectSlug}__${fallbackTopicSlug}`;
                            // If exactly one quiz variant exists, start that variant directly
                            if (
                              Array.isArray(quizSets) &&
                              quizSets.length === 1
                            ) {
                              const single = quizSets[0];
                              return (
                                <button
                                  onClick={() => launchQuizSet(single, 0)}
                                  className="w-full mt-2 px-4 py-2 rounded-lg font-semibold shadow-sm transition hover:opacity-95"
                                  style={buttonStyle}
                                >
                                  {defaultButtonLabel}
                                </button>
                              );
                            }
                            // Otherwise, fall back to topic-level questions (if present)
                            return (
                              <button
                                onClick={() => {
                                  if (typeof onSelectQuiz !== 'function') {
                                    return;
                                  }
                                  const articleClone = cloneArticle(
                                    topic.article
                                  );
                                  const preparedQuiz = {
                                    ...topic,
                                    id: topic.quizCode || topicQuizCode,
                                    quizCode: topicQuizCode,
                                    canonicalTopicTitle:
                                      topic.title ||
                                      selectedCategory + ' Topic',
                                  };
                                  if (articleClone) {
                                    preparedQuiz.article = articleClone;
                                  }
                                  const fallbackImageUrl =
                                    topic.imageUrl ||
                                    (articleClone && articleClone.imageUrl) ||
                                    (topic.article && topic.article.imageUrl);
                                  if (
                                    !preparedQuiz.imageUrl &&
                                    fallbackImageUrl
                                  ) {
                                    preparedQuiz.imageUrl = fallbackImageUrl;
                                  }
                                  if (Array.isArray(topic.questions)) {
                                    preparedQuiz.questions =
                                      topic.questions.map(
                                        (question, questionIndex) => {
                                          if (
                                            question &&
                                            typeof question === 'object'
                                          ) {
                                            const nextNumber =
                                              question.questionNumber ??
                                              questionIndex + 1;
                                            return {
                                              ...question,
                                              questionNumber: nextNumber,
                                            };
                                          }
                                          return question;
                                        }
                                      );
                                  }
                                  onSelectQuiz(preparedQuiz, selectedSubject);
                                }}
                                className="w-full mt-2 px-4 py-2 rounded-lg font-semibold shadow-sm transition hover:opacity-95"
                                style={buttonStyle}
                              >
                                {defaultButtonLabel}
                              </button>
                            );
                          })()}
                    </div>
                  );
                })}
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition"
                  style={backButtonStyle}
                >
                  <ArrowLeftIcon />
                  <span>Back to {selectedSubject}</span>
                </button>
              </div>
            </div>
          </>
        );
      }

      // View 2: Category Selection (with updated "Smith a Quiz" box)
      if (selectedSubject) {
        const subject = AppData[selectedSubject];
        const subjectColors = SUBJECT_COLORS[selectedSubject] || {};
        const gradientBackground = isDarkMode
          ? SUBJECT_BG_GRADIENTS[selectedSubject]
          : SUBJECT_LIGHT_SURFACE_GRADIENTS[selectedSubject] ||
            SUBJECT_BG_GRADIENTS[selectedSubject];
        const heroStyles = isDarkMode
          ? gradientBackground
            ? { backgroundImage: gradientBackground }
            : subjectColors.background
            ? { backgroundColor: subjectColors.background }
            : { backgroundColor: DEFAULT_COLOR_SCHEME.background }
          : {
              backgroundColor: '#ffffff',
              backgroundImage:
                gradientBackground ||
                'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(148,163,184,0.12))',
              border: `1px solid ${
                SUBJECT_LIGHT_TINTS[selectedSubject] || 'rgba(148,163,184,0.35)'
              }`,
            };
        const heroTextColor = isDarkMode
          ? subjectColors.heroText ||
            subjectColors.onBackgroundText ||
            '#ffffff'
          : subjectColors.text || subjectColors.accent || '#0f172a';
        const heroAccentColor =
          subjectColors.accent || subjectColors.text || '#0f172a';
        const primaryBtnColor =
          subjectColors.accent || subjectColors.background || '#2563eb';
        const primaryBtnText = '#ffffff';
        const heroMutedTextStyle = isDarkMode
          ? { color: 'rgba(255,255,255,0.85)' }
          : { color: heroTextColor, opacity: 0.75 };
        const panelBorderColor = isDarkMode
          ? subjectColors.border || 'rgba(255,255,255,0.55)'
          : SUBJECT_LIGHT_TINTS[selectedSubject] || 'rgba(148,163,184,0.35)';
        const panelBaseStyle = {
          borderColor: panelBorderColor,
          backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#ffffff',
          color: heroTextColor,
        };

        const panelBackground =
          !isDarkMode && SUBJECT_LIGHT_SURFACE_GRADIENTS[selectedSubject];
        if (panelBackground) {
          panelBaseStyle.backgroundImage = panelBackground;
          panelBaseStyle.boxShadow = '0 22px 45px -34px rgba(15,23,42,0.35)';
        }
        const selectStyle = isDarkMode
          ? {
              border: `1px solid ${
                subjectColors.border || 'rgba(255,255,255,0.35)'
              }`,
              backgroundColor: 'rgba(15,23,42,0.85)',
              color: '#f8fafc',
            }
          : {
              border: `1px solid ${panelBorderColor}`,
              backgroundColor: '#ffffff',
              color: '#0f172a',
            };
        const backButtonStyle = isDarkMode
          ? {
              backgroundColor: 'rgba(255,255,255,0.18)',
              color: heroTextColor,
              border: `1px solid ${
                subjectColors.border || 'rgba(255,255,255,0.25)'
              }`,
            }
          : {
              backgroundColor: '#ffffff',
              color: heroAccentColor,
              border: `1px solid ${
                SUBJECT_LIGHT_TINTS[selectedSubject] || 'rgba(148,163,184,0.35)'
              }`,
            };
        const subjectVocabulary = Array.isArray(vocabularyData[selectedSubject])
          ? vocabularyData[selectedSubject]
          : [];
        const subjectPremadeTotal = getPremadeQuizTotal(selectedSubject);
        const expandedReady =
          typeof window !== 'undefined' &&
          window.ExpandedQuizData &&
          Object.keys(window.ExpandedQuizData).length > 0;
        const subjectPremadeLabel =
          subjectPremadeTotal === 1
            ? '1 premade quiz ready'
            : `${subjectPremadeTotal} premade quizzes ready`;
        return (
          <>
            {viewScienceFormulas && (
              <ScienceFormulaSheet
                onClose={() => setViewScienceFormulas(false)}
              />
            )}
            <div
              className="hero-section animate-floatIn rounded-2xl -m-4 sm:-m-6 md:-m-8 p-4 sm:p-6 md:p-8 shadow-2xl"
              style={{
                ...heroStyles,
                '--hero-text-color': heroTextColor,
                '--hero-accent-color': heroAccentColor,
              }}
            >
              <Breadcrumb
                variant="onColor"
                color={heroTextColor}
                accentColor={heroAccentColor}
              />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex flex-col gap-1">
                  <h2 className="hero-title text-3xl font-extrabold">
                    {selectedSubject}
                  </h2>
                  <p
                    className="text-sm font-semibold"
                    style={heroMutedTextStyle}
                  >
                    {subjectPremadeLabel}
                  </p>
                </div>
                {(selectedSubject === 'Math' ||
                  selectedSubject === 'Science') && (
                  <div className="flex flex-wrap gap-2">
                    {selectedSubject === 'Math' && (
                      <>
                        <button
                          onClick={() => setShowMathPracticeTools((v) => !v)}
                          className="px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg shadow-sm hover:bg-sky-600 transition"
                        >
                          {showMathPracticeTools
                            ? 'Hide Practice Tools'
                            : 'Math Practice Tools'}
                        </button>
                        <button
                          onClick={() => setShowFormulaSheet(true)}
                          className="px-4 py-2 bg-white/90 text-sky-700 font-semibold rounded-lg hover:bg-white transition"
                        >
                          Formula Sheet
                        </button>
                      </>
                    )}
                    {selectedSubject === 'Science' && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setViewScienceFormulas(true)}
                          className="px-4 py-2 font-semibold rounded-lg border-2 transition hover:opacity-90"
                          style={{
                            borderColor: isDarkMode
                              ? subjectColors.border || 'rgba(255,255,255,0.5)'
                              : panelBorderColor,
                            color: heroAccentColor,
                            backgroundColor: isDarkMode
                              ? 'transparent'
                              : '#ffffff',
                          }}
                        >
                          View Formula Sheet
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowSciencePracticeTools((v) => !v)}
                          className="px-4 py-2 font-semibold rounded-lg border-2 transition hover:opacity-90"
                          style={{
                            borderColor: isDarkMode
                              ? subjectColors.border || 'rgba(255,255,255,0.5)'
                              : panelBorderColor,
                            color: heroAccentColor,
                            backgroundColor: isDarkMode
                              ? 'transparent'
                              : '#ffffff',
                          }}
                        >
                          {showSciencePracticeTools
                            ? 'Hide Practice Tools'
                            : 'Science Practice Tools'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {subjectVocabulary.length > 0 && (
                <SubjectVocabularySection
                  subject={selectedSubject}
                  words={subjectVocabulary}
                  theme={theme}
                />
              )}
              {/* Science Practice Tools Section */}
              {selectedSubject === 'Science' && showSciencePracticeTools && (
                <div
                  className="mt-4 space-y-4 p-4 rounded-lg border"
                  style={{
                    borderColor: isDarkMode
                      ? 'rgba(255,255,255,0.25)'
                      : 'rgba(148,163,184,0.35)',
                    background: isDarkMode ? 'rgba(30,41,59,0.4)' : '#ffffff',
                  }}
                >
                  <h3 className="font-bold text-lg mb-4">
                    Science Practice Tools
                  </h3>
                  <ScienceToolsTabs theme={theme} />
                </div>
              )}
              {/* Math Practice Tools Section */}
              {selectedSubject === 'Math' && showMathPracticeTools && (
                <MathPracticeCollapsibleSuite theme={theme} />
              )}
              {/* Daily Coach goals (across subjects) - COACH FEATURE DISABLED */}
              {window.__COACH_ENABLED__ && (
                <div
                  className={`coach-panel rounded-lg p-4 mt-4 shadow-md ${
                    isDarkMode ? '' : 'coach-gold-light'
                  }`}
                >
                  <div
                    className="flex items-center justify-center gap-2"
                    style={{ color: heroAccentColor }}
                  >
                    <CalendarIcon className="h-8 w-8" />
                    <h3
                      className="text-xl font-bold"
                      style={{ color: heroTextColor }}
                    >
                      Today&apos;s Coach Goals
                    </h3>
                  </div>
                  {dailyLoading ? (
                    <p
                      className="text-center text-sm mt-2"
                      style={heroMutedTextStyle}
                    >
                      Loading…
                    </p>
                  ) : dailyError ? (
                    <p className="text-center text-sm mt-2 text-red-600">
                      {dailyError}
                    </p>
                  ) : todaysTaskGroups.length ? (
                    <div className="mt-3 space-y-3">
                      {todaysTaskGroups
                        .filter((group) => {
                          // Only show the group for the currently selected subject
                          const groupSubjectId = canonicalSubjectId(
                            group.subjectId || group.subjectLabel
                          );
                          const selectedSubjectId =
                            canonicalSubjectId(selectedSubject);
                          return groupSubjectId === selectedSubjectId;
                        })
                        .map((group) => {
                          const progress =
                            dailyProgressMap.get(group.subjectId) || {};
                          return (
                            <div
                              key={group.subjectId || group.subjectLabel}
                              className="border rounded-md p-3"
                              style={{ borderColor: panelBorderColor }}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <div
                                    className="font-semibold"
                                    style={{ color: heroTextColor }}
                                  >
                                    {group.subjectLabel}
                                  </div>
                                  <div
                                    className="text-sm"
                                    style={heroMutedTextStyle}
                                  >
                                    {Math.max(
                                      0,
                                      progress.completed_minutes || 0
                                    )}{' '}
                                    / {progress.expected_minutes || 45} minutes
                                  </div>
                                </div>
                                {progress.coach_quiz_id &&
                                  (progress.coach_quiz_completed ? (
                                    <span
                                      className="text-sm px-3 py-1 rounded-full"
                                      style={{
                                        backgroundColor: isDarkMode
                                          ? 'rgba(34,197,94,0.2)'
                                          : '#dcfce7',
                                        color: '#166534',
                                      }}
                                    >
                                      Coach Quiz Done
                                    </span>
                                  ) : null)}
                              </div>
                              <div className="mt-3 space-y-2">
                                {group.tasks.map((task) => {
                                  const focusText =
                                    Array.isArray(task.focus) &&
                                    task.focus.length
                                      ? `Focus: ${task.focus.join(', ')}`
                                      : '';
                                  const buttonLabel =
                                    task.type === 'coach-quiz'
                                      ? `Start Coach Quiz`
                                      : task.quizId || task.quizPath
                                      ? `Start ${
                                          group.subjectLabel.split(' ')[0]
                                        } Practice`
                                      : '';
                                  return (
                                    <div
                                      key={task.id}
                                      className="rounded-md border px-3 py-2"
                                      style={{ borderColor: panelBorderColor }}
                                    >
                                      <div className="flex items-start justify-between gap-3">
                                        <div>
                                          <div
                                            className="font-medium"
                                            style={{ color: heroTextColor }}
                                          >
                                            {task.title}
                                          </div>
                                          {focusText ? (
                                            <div
                                              className="text-xs"
                                              style={heroMutedTextStyle}
                                            >
                                              {focusText}
                                            </div>
                                          ) : null}
                                          {task.message ? (
                                            <p
                                              className="text-sm mt-1"
                                              style={heroMutedTextStyle}
                                            >
                                              {task.message}
                                            </p>
                                          ) : null}
                                        </div>
                                        <span
                                          className="text-xs font-semibold"
                                          style={heroMutedTextStyle}
                                        >
                                          {task.minutes} min
                                        </span>
                                      </div>
                                      {buttonLabel && (
                                        <button
                                          onClick={() => openCoachTask(task)}
                                          className="mt-2 px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-purple-700 transition"
                                        >
                                          {buttonLabel}
                                        </button>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="mt-3 space-y-2">
                      {Array.isArray(coachDailySubjects) &&
                      coachDailySubjects.some(
                        (s) =>
                          s &&
                          s.coach_quiz_id &&
                          !s.coach_quiz_completed &&
                          s.coach_quiz_source_id
                      ) ? (
                        (coachDailySubjects || []).map((entry) => {
                          if (
                            !entry ||
                            !entry.coach_quiz_id ||
                            entry.coach_quiz_completed ||
                            !entry.coach_quiz_source_id
                          )
                            return null;
                          const subjLabel = displaySubjectName(entry.subject);
                          return (
                            <div
                              key={`daily-fallback-${entry.subject}`}
                              className="rounded-md border px-3 py-2 flex items-center justify-between"
                              style={{ borderColor: panelBorderColor }}
                            >
                              <div>
                                <div
                                  className="font-medium"
                                  style={{ color: heroTextColor }}
                                >
                                  {subjLabel}
                                </div>
                                <div
                                  className="text-xs"
                                  style={heroMutedTextStyle}
                                >
                                  Today's Coach Quiz is ready
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  startCoachQuizForSubject(
                                    subjLabel,
                                    entry.coach_quiz_source_id
                                  )
                                }
                                className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-md hover:bg-purple-700 transition"
                              >
                                Open today's quiz
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <p
                          className="text-center text-sm"
                          style={heroMutedTextStyle}
                        >
                          No goals for today yet.
                        </p>
                      )}
                    </div>
                  )}
                  {/* Ask Coach */}
                  {window.__ASK_COACH_ENABLED__ && (
                    <div
                      className="mt-4 border rounded-md p-3"
                      style={{
                        borderColor: panelBorderColor,
                        backgroundColor: isDarkMode
                          ? 'rgba(15,23,42,0.5)'
                          : 'rgba(255,255,255,0.7)',
                      }}
                    >
                      <div
                        className="flex items-center gap-2 mb-2"
                        style={{ color: heroTextColor }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M12 2a9 9 0 00-9 9c0 4.418 3.134 8.09 7.25 8.848V22l3.5-2H14a9 9 0 000-18z" />
                        </svg>
                        <span className="text-sm font-medium">
                          Ask Coach for a{' '}
                          {selectedSubject ? selectedSubject : 'subject'} tip
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            selectedSubject &&
                            startDailyCompositeForSubject(selectedSubject)
                          }
                          disabled={
                            !selectedSubject ||
                            adviceLoading ||
                            !window.__ASK_COACH_ENABLED__
                          }
                          className="px-3 py-2 text-sm font-semibold rounded-md transition hover:opacity-90"
                          style={{
                            backgroundColor: '#ffffff',
                            color: '#0f172a',
                            opacity: adviceLoading ? 0.6 : 1,
                          }}
                        >
                          {adviceLoading ? 'Asking…' : 'Ask Coach'}
                        </button>
                        {!window.__ASK_COACH_ENABLED__ && (
                          <span className="text-xs" style={heroMutedTextStyle}>
                            Ask Coach is currently disabled.
                          </span>
                        )}
                        {adviceError && (
                          <span className="text-xs text-red-600">
                            {adviceError}
                          </span>
                        )}
                      </div>
                      {adviceText && (
                        <div
                          className="mt-2 text-sm whitespace-pre-wrap"
                          style={{ color: heroTextColor }}
                        >
                          {adviceText}
                        </div>
                      )}
                      <p className="mt-2 text-xs" style={heroMutedTextStyle}>
                        2 tips per week per student. Tester account is
                        unlimited.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* New clustered quiz browser */}
              <SubjectQuizBrowser
                subjectName={selectedSubject}
                onSelectQuiz={onSelectQuiz}
                theme={theme}
              />
              {/* Keep generator and comprehensive exam below the cluster UI */}
              {(selectedSubject === 'Social Studies' ||
                selectedSubject === 'Reasoning Through Language Arts (RLA)' ||
                selectedSubject === 'Science' ||
                selectedSubject === 'Math') && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {(() => {
                    const subj = selectedSubject;
                    const subjectId = canonicalSubjectId(subj);
                    const subjectKey =
                      subjectId === 'science'
                        ? 'science'
                        : subjectId === 'math'
                        ? 'math'
                        : subjectId === 'rla'
                        ? 'rla'
                        : 'social';
                    // Define button colors in this scope
                    const subjectColors =
                      SUBJECT_COLORS[selectedSubject] || DEFAULT_COLOR_SCHEME;
                    const primaryBtnColor =
                      subjectColors.accent ||
                      subjectColors.background ||
                      '#2563eb';
                    const primaryBtnText = '#ffffff';
                    const match = Array.isArray(weeklyCoachSummary)
                      ? weeklyCoachSummary.find(
                          (ws) =>
                            canonicalSubjectId(ws.subject) === subjectId ||
                            (subjectId === 'rla' &&
                              canonicalSubjectId(ws.subject) === 'rla')
                        )
                      : null;
                    const completed = Math.max(
                      0,
                      match?.completed_minutes_week || 0
                    );
                    const subjectPlanDays = Array.isArray(weeklyCoachPlan?.days)
                      ? weeklyCoachPlan.days
                          .map((day) => ({
                            ...day,
                            tasks: Array.isArray(day.tasks)
                              ? day.tasks.filter(
                                  (task) =>
                                    canonicalSubjectId(
                                      task.subject || task.subjectLabel || ''
                                    ) === subjectId
                                )
                              : [],
                          }))
                          .filter((day) => day.tasks.length > 0)
                      : [];
                    const fallbackTarget =
                      subjectPlanDays.reduce(
                        (acc, day) =>
                          acc +
                          day.tasks.reduce(
                            (sum, task) => sum + (Number(task.minutes) || 0),
                            0
                          ),
                        0
                      ) || 140;
                    const target =
                      match?.expected_minutes_week || fallbackTarget;
                    const hasPlan = subjectPlanDays.length > 0;
                    return (
                      window.__COACH_ENABLED__ && (
                        <div
                          className={`coach-panel ${
                            theme === 'dark' ? '' : 'coach-gold-light'
                          } coach-subject-card subject-${subjectKey} rounded-lg p-4 flex flex-col justify-between shadow-md hover:shadow-lg transition-all`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <p
                                className="subject-pill text-xs font-semibold uppercase tracking-wide"
                                style={{
                                  borderRadius: '9999px',
                                  padding: '2px 10px',
                                }}
                              >
                                {subj?.startsWith('Reasoning') ? 'RLA' : subj}
                              </p>
                              <span className="minutes-pill text-[0.70rem]">
                                {completed} / {target} min
                              </span>
                            </div>
                            <div
                              className="flex items-center justify-center gap-2"
                              style={{ color: heroAccentColor }}
                            >
                              <CalendarIcon className="h-8 w-8" />
                              <h3
                                className="text-xl font-bold"
                                style={{ color: heroTextColor }}
                              >
                                Weekly Coach
                              </h3>
                            </div>
                            <p
                              className="text-sm my-2 text-center"
                              style={heroMutedTextStyle}
                            >
                              A 7-day plan tailored to your recent progress.
                            </p>
                            {coachLoading ? (
                              <p
                                className="text-center text-sm"
                                style={heroMutedTextStyle}
                              >
                                Loading…
                              </p>
                            ) : hasPlan ? (
                              <div className="mt-2 max-h-48 overflow-y-auto space-y-1">
                                {subjectPlanDays.slice(0, 7).map((d, idx) => {
                                  const focusList = d.tasks.flatMap((task) =>
                                    Array.isArray(task.focus) ? task.focus : []
                                  );
                                  const focus = focusList.length
                                    ? Array.from(new Set(focusList)).join(', ')
                                    : '';
                                  const minutes =
                                    d.tasks.reduce(
                                      (sum, task) =>
                                        sum + (Number(task.minutes) || 0),
                                      0
                                    ) || 0;
                                  const titles = d.tasks
                                    .map((task) => task.title)
                                    .join('  ');
                                  return (
                                    <div
                                      key={`${d.day}-${idx}`}
                                      className="text-sm flex flex-col"
                                    >
                                      <span className="font-semibold">
                                        Day {d.day}:
                                      </span>
                                      <span>
                                        {focus ? `${focus} – ` : ''}
                                        {titles || 'Practice'} ({minutes}m)
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <p
                                className="text-center text-sm"
                                style={heroMutedTextStyle}
                              >
                                Plan generated. Refreshing...
                              </p>
                            )}
                            {coachError && (
                              <p className="text-center text-xs text-red-600 mt-2">
                                {coachError}
                              </p>
                            )}
                          </div>
                          <div className="mt-3">
                            <button
                              onClick={generateCoachPlan}
                              disabled={coachLoading}
                              className="w-full mt-2 px-4 py-2 font-semibold rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
                              style={{
                                background: primaryBtnColor,
                                color: primaryBtnText,
                                border: `1px solid ${primaryBtnColor}`,
                              }}
                            >
                              {hasPlan
                                ? 'Generate / Refresh Plan'
                                : 'Generate Plan'}
                            </button>
                          </div>
                        </div>
                      )
                    );
                  })()}
                  {selectedSubject ===
                    'Reasoning Through Language Arts (RLA)' && (
                    <div
                      className="border-2 border-dashed rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-all"
                      style={{ ...panelBaseStyle, borderStyle: 'dashed' }}
                    >
                      <div>
                        <div
                          className="flex items-center justify-center gap-2"
                          style={{ color: heroAccentColor }}
                        >
                          <BookOpenIcon className="h-8 w-8" />
                          <h3
                            className="text-xl font-bold"
                            style={{ color: heroTextColor }}
                          >
                            Essay Practice Tool
                          </h3>
                        </div>
                        <p
                          className="text-sm my-2 text-center"
                          style={heroMutedTextStyle}
                        >
                          Build your extended response with guided support.
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          onSelectQuiz(
                            {
                              id: 'essay_practice_tool',
                              type: 'essay',
                              title: 'GED® Essay Practice Toolkit',
                            },
                            selectedSubject
                          )
                        }
                        className="w-full mt-2 px-4 py-2 font-semibold rounded-md transition"
                        style={{
                          background: primaryBtnColor,
                          color: primaryBtnText,
                          border: `1px solid ${primaryBtnColor}`,
                        }}
                      >
                        Launch Essay Practice
                      </button>
                    </div>
                  )}
                  <div
                    className="border-2 border-dashed rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-all"
                    style={{ ...panelBaseStyle, borderStyle: 'dashed' }}
                  >
                    <div>
                      <div
                        className="flex items-center justify-center gap-2"
                        style={{ color: heroAccentColor }}
                      >
                        <SparklesIcon className="h-8 w-8" />
                        <h3
                          className="text-xl font-bold"
                          style={{ color: heroTextColor }}
                        >
                          Smith a Quiz
                        </h3>
                      </div>
                      <p
                        className="text-sm my-2 text-center"
                        style={heroMutedTextStyle}
                      >
                        Generate a new quiz for any topic in {selectedSubject}.
                      </p>
                      <div className="mt-2">
                        <label
                          className="block font-semibold mb-1"
                          htmlFor="ai-quiz-topic"
                          style={{ color: heroTextColor }}
                        >
                          Choose a topic
                        </label>
                        <select
                          id="ai-quiz-topic"
                          value={aiQuizTopic}
                          onChange={(e) => setAiQuizTopic(e.target.value)}
                          className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0"
                          style={selectStyle}
                        >
                          <option value="">Select a topic</option>
                          {availableTopics.map(
                            (topic, idx) =>
                              topic && (
                                <option key={`${topic}-${idx}`} value={topic}>
                                  {topic}
                                </option>
                              )
                          )}
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        onSelectGenerator(
                          selectedSubject,
                          aiQuizTopic,
                          setIsLoading,
                          setLoadingMessage
                        )
                      }
                      disabled={!aiQuizTopic}
                      className="w-full mt-2 px-4 py-2 font-semibold rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: primaryBtnColor,
                        color: primaryBtnText,
                        border: `1px solid ${primaryBtnColor}`,
                      }}
                    >
                      Generate Quiz
                    </button>
                  </div>
                  <div
                    className="border-2 border-dashed rounded-lg p-4 flex flex-col justify-center items-center hover:shadow-lg transition-all md:col-span-2 lg:col-span-1"
                    style={{ ...panelBaseStyle, borderStyle: 'dashed' }}
                  >
                    <SparklesIcon
                      className="h-8 w-8"
                      style={{ color: heroAccentColor }}
                    />
                    <h3
                      className="text-xl font-bold mt-2"
                      style={{ color: heroTextColor }}
                    >
                      Comprehensive Exam
                    </h3>
                    <p
                      className="text-sm my-2 text-center"
                      style={heroMutedTextStyle}
                    >
                      Take a full-length practice exam for {selectedSubject}.
                    </p>
                    <button
                      onClick={async () =>
                        await onStartComprehensiveExam(selectedSubject)
                      }
                      className="w-full mt-2 px-4 py-2 font-semibold rounded-md transition"
                      style={{
                        background: primaryBtnColor,
                        color: primaryBtnText,
                        border: `1px solid ${primaryBtnColor}`,
                      }}
                    >
                      Start Comprehensive Exam
                    </button>
                  </div>
                </div>
              )}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition"
                  style={backButtonStyle}
                >
                  <ArrowLeftIcon />
                  <span>Back to Main Menu</span>
                </button>
              </div>
            </div>
          </>
        );
      }

      // View 1: Subject Selection (Default)
      return (
        <>
          <div className="fade-in">
            <header className="text-center pb-4 mb-4">
              {currentUser ? (
                <div className="flex flex-col items-center gap-2">
                  {currentUser.picture ? (
                    <img
                      src={currentUser.picture}
                      alt="User"
                      className="w-16 h-16 rounded-full shadow-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-sky-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                      {userInitial}
                    </div>
                  )}
                  <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100">
                    Welcome, {userDisplayName}!
                  </h1>
                  <p className="text-slate-500 dark:text-slate-300">
                    Please select a subject to begin.
                  </p>
                  <button
                    onClick={onLogout}
                    className="text-sm font-semibold text-sky-600 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200"
                  >
                    [ Log Out ]
                  </button>
                </div>
              ) : (
                <>
                  <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100">
                    Mr. Smith's Learning Canvas
                  </h1>
                  <p className="text-slate-500 dark:text-slate-300 mt-2">
                    An interactive learning experience.
                  </p>
                </>
              )}
            </header>
            {!onboardingComplete && !onboardingBannerHidden && (
              <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="space-y-1">
                  <p className="font-semibold">
                    Finish setting up your learning plan
                  </p>
                  <p className="text-sm opacity-90">
                    Add your name, pick a few challenge areas, and set test
                    dates to personalize your dashboard.
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={goToProfile}
                    className="inline-flex items-center justify-center rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                  >
                    Continue Onboarding
                  </button>
                  <button
                    type="button"
                    onClick={hideOnboardingBanner}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-slate-100 text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:bg-slate-700 dark:text-slate-100"
                    aria-label="Hide onboarding reminder for now"
                  >
                    Hide for now
                  </button>
                </div>
              </div>
            )}
            <div className="dashboard-sections">
              {currentUser && (
                <div
                  className={`grid gap-4 ${
                    showProfileCard && showPlanCard
                      ? 'md:grid-cols-2'
                      : 'md:grid-cols-1'
                  } mb-6 dashboard-row`}
                >
                  {/* Upcoming GED Test (Profile-level) - only when no plan data yet */}
                  {showProfileCard && (
                    <article
                      className="glass rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-5 shadow-lg space-y-2 dark:bg-slate-800/70 block-profile-test panel card"
                      style={homePanelStyle}
                    >
                      <div className="flex items-center justify-between">
                        <h2
                          className="text-lg font-semibold text-slate-900 dark:text-slate-100"
                          style={isDarkMode ? undefined : { color: '#000000' }}
                        >
                          Upcoming GED Test
                        </h2>
                        <button
                          type="button"
                          onClick={goToProfile}
                          className="text-sm font-semibold text-sky-600 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200"
                        >
                          Edit
                        </button>
                      </div>
                      {normalizedProfileTestDate ? (
                        (() => {
                          if (testDateDiffDays == null) {
                            return (
                              <p
                                className={`text-sm ${homePanelPrimaryTextClass}`}
                              >
                                Test date unavailable. Please update in profile.
                              </p>
                            );
                          }
                          if (testDateDiffDays > 1) {
                            return (
                              <div
                                className={`text-sm ${homePanelPrimaryTextClass}`}
                              >
                                <p>
                                  Your test is in{' '}
                                  <strong>{testDateDiffDays}</strong> days (
                                  {testDateDisplay}).
                                </p>
                                <span className="countdown-chip mt-2 inline-block">
                                  {testDateDiffDays} days left
                                </span>
                              </div>
                            );
                          }
                          if (testDateDiffDays === 1) {
                            return (
                              <div
                                className={`text-sm ${homePanelPrimaryTextClass}`}
                              >
                                <p>
                                  Your test is <strong>tomorrow</strong> (
                                  {testDateDisplay}).
                                </p>
                                <span className="countdown-chip mt-2 inline-block">
                                  1 day left
                                </span>
                              </div>
                            );
                          }
                          if (testDateDiffDays === 0) {
                            return (
                              <p
                                className={`text-sm ${homePanelPrimaryTextClass}`}
                              >
                                <strong>Your test is today.</strong> Good luck!
                              </p>
                            );
                          }
                          // Past date
                          return (
                            <p
                              className={`text-sm ${homePanelPrimaryTextClass}`}
                            >
                              Your previous test date was {testDateDisplay}. Set
                              a new one.
                            </p>
                          );
                        })()
                      ) : (
                        <p className={`text-sm ${homePanelPrimaryTextClass}`}>
                          No test date on file. Set one in your profile.
                        </p>
                      )}
                      <p
                        className={`text-xs ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        This uses the single profile test date.
                      </p>
                    </article>
                  )}
                  {showPlanCard && (
                    <article
                      className="glass rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-5 shadow-lg space-y-2 dark:bg-slate-800/70 block-test-date panel card"
                      style={homePanelStyle}
                    >
                      <div className="flex items-center justify-between">
                        <h2
                          className="text-lg font-semibold text-slate-900 dark:text-slate-100"
                          style={isDarkMode ? undefined : { color: '#000000' }}
                        >
                          Upcoming Tests
                        </h2>
                        <button
                          type="button"
                          onClick={goToProfile}
                          className="text-sm font-semibold text-sky-600 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200"
                        >
                          Edit
                        </button>
                      </div>
                      <p className={`text-sm ${homePanelPrimaryTextClass}`}>
                        Keep adding your remaining test dates to stay organized.
                      </p>
                      {allSubjectsSelfDeclaredPassed ? (
                        <p className="text-sm text-emerald-600">
                          You marked every GED subject as passed. Amazing work!
                        </p>
                      ) : upcomingList && upcomingList.length > 0 ? (
                        <div className="mt-2 space-y-2">
                          {upcomingList.map((item, idx) => (
                            <div
                              key={`${item.subject}-${item.dateISO}-${idx}`}
                              className="flex items-center justify-between py-1"
                            >
                              <div>
                                <p
                                  className={`font-semibold ${homePanelPrimaryTextClass}`}
                                  style={
                                    isDarkMode
                                      ? undefined
                                      : { color: '#000000' }
                                  }
                                >
                                  {item.subject}
                                </p>
                                <p
                                  className={`text-sm ${homePanelPrimaryTextClass}`}
                                >
                                  {item.formattedDate}
                                  {item.location ? (
                                    <span> {item.location}</span>
                                  ) : null}
                                </p>
                              </div>
                              <span className="countdown-chip inline-flex">
                                <span className="dot"></span>
                                <span className="label">
                                  {countdownLabel(item.daysUntil)}
                                </span>
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : hasSavedTest ? (
                        <p className={`text-sm ${homePanelPrimaryTextClass}`}>
                          No test scheduled yet.
                        </p>
                      ) : (
                        <p className={`text-sm ${homePanelPrimaryTextClass}`}>
                          Set your test dates to start the countdown.
                        </p>
                      )}
                      <p
                        className={`text-xs ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        Need changes? Update them from your profile.
                      </p>
                    </article>
                  )}
                  <article
                    className="glass rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-5 shadow-lg space-y-2 dark:bg-slate-800/70 block-challenges panel card"
                    style={homePanelStyle}
                  >
                    <div className="flex items-center justify-between">
                      <h2
                        className="text-lg font-semibold text-slate-900 dark:text-slate-100"
                        style={isDarkMode ? undefined : { color: '#000000' }}
                      >
                        Learning Challenges
                      </h2>
                      <button
                        type="button"
                        onClick={goToProfile}
                        className="text-sm font-semibold text-sky-600 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200"
                      >
                        Update
                      </button>
                    </div>
                    {selectedChallenges.length ? (
                      <ul
                        className={`space-y-1 text-sm ${homePanelPrimaryTextClass}`}
                      >
                        {displayedChallenges.map((challenge) => (
                          <li key={challenge.id}>
                            {challenge.label ||
                              `${challenge.subject} – ${challenge.subtopic}`}
                          </li>
                        ))}
                        {hiddenChallengeCount > 0 && (
                          <li
                            className={`text-xs ${
                              isDarkMode ? 'text-slate-400' : 'text-slate-800'
                            }`}
                          >
                            and {hiddenChallengeCount} more…
                          </li>
                        )}
                      </ul>
                    ) : (
                      <p className={`text-sm ${homePanelPrimaryTextClass}`}>
                        Tell us what topics to focus on to unlock a tailored
                        plan.
                      </p>
                    )}
                    {!onboardingComplete && (
                      <p className="text-xs text-rose-500">
                        Finish selecting challenges to complete onboarding.
                      </p>
                    )}
                  </article>
                </div>
              )}
              {currentUser && (
                <div
                  id="progress"
                  className="animate-floatIn block-profile panel"
                >
                  <ProgressDashboard
                    progress={progress}
                    onSubjectClick={setDetailedViewSubject}
                    profilePassedMap={profilePassedMap}
                    recentSummary={recentDashboardSummary}
                  />
                </div>
              )}
              {/* Coach Smith 📚 This Week (4 subject cards) */}
              {window.__COACH_ENABLED__ && currentUser && (
                <div
                  className={`mb-6 block-profile panel coach-smith-shell coach-panel rounded-xl p-4 shadow-md ${
                    theme === 'dark' ? '' : 'coach-gold-light'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h2
                      className={`text-lg font-semibold ${homePanelPrimaryTextClass}`}
                    >
                      Coach Smith 📚 This Week
                    </h2>
                    <button
                      onClick={generateAllWeeklyPlans}
                      disabled={generatingAll}
                      className="text-sm font-semibold px-3 py-1 rounded-md bg-white text-slate-900 hover:bg-white/90 disabled:opacity-60 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                      title="Generate weekly plans for Math, RLA, Science, and Social Studies"
                    >
                      {generatingAll ? 'Generating…' : 'Generate all'}
                    </button>
                  </div>

                  {dailyLoading ? (
                    <p className={`text-sm ${homePanelPrimaryTextClass}`}>
                      Loading...
                    </p>
                  ) : dailyError ? (
                    <p className="text-sm text-red-600">{dailyError}</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'Math',
                        'Reasoning Through Language Arts (RLA)',
                        'Science',
                        'Social Studies',
                      ].map((label) => {
                        const match = Array.isArray(weeklyCoachSummary)
                          ? weeklyCoachSummary.find((ws) => {
                              if (
                                label ===
                                'Reasoning Through Language Arts (RLA)'
                              ) {
                                return (
                                  ws.subject === 'RLA' || ws.subject === label
                                );
                              }
                              return ws.subject === label;
                            })
                          : null;

                        const completed = Math.max(
                          0,
                          match?.completed_minutes_week || 0
                        );
                        const target = match?.expected_minutes_week || 140;
                        const summary = match?.summary;

                        // subject key for styling hooks
                        const subjectKey =
                          label === 'Math'
                            ? 'math'
                            : label.startsWith('Reasoning')
                            ? 'rla'
                            : label === 'Science'
                            ? 'science'
                            : 'social';

                        return (
                          <div
                            key={label}
                            className={`coach-subject-card coach-gold-card rounded-lg border p-3 backdrop-blur-sm subject-${subjectKey}`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <p
                                className="subject-pill text-xs font-semibold uppercase tracking-wide"
                                style={{
                                  borderRadius: '9999px',
                                  padding: '2px 10px',
                                }}
                              >
                                {label ===
                                'Reasoning Through Language Arts (RLA)'
                                  ? 'RLA'
                                  : label}
                              </p>
                              <span className="minutes-pill text-[0.65rem] text-slate-700 dark:text-slate-200">
                                {completed} / {target} min
                              </span>
                            </div>
                            {summary ? (
                              <p className="text-xs text-slate-800 dark:text-slate-100 leading-snug">
                                {summary}
                              </p>
                            ) : (
                              <p className="text-xs text-slate-700 dark:text-slate-200 leading-snug">
                                No weekly plan yet. Use Weekly Coach in this
                                subject.
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
              {hasVocabulary && (
                <div className="mb-6 block-vocab panel vocab-shell">
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className={`text-base font-semibold ${homePanelPrimaryTextClass}`}
                    >
                      Vocabulary Spotlight
                    </h3>
                    <button
                      onClick={() => setVocabOpen((v) => !v)}
                      className="text-sm font-semibold px-3 py-1 rounded-md bg-white text-slate-900 hover:bg-white/90 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                    >
                      {vocabOpen ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {vocabOpen && (
                    <div className="space-y-6">
                      <VocabularyTicker
                        vocabulary={vocabularyData}
                        onWordClick={handleViewVocabulary}
                      />
                      <VocabularyOverview
                        vocabulary={vocabularyData}
                        onWordClick={handleViewVocabulary}
                      />
                      <VocabularyBySubject
                        vocabulary={vocabularyData}
                        onStartQuiz={handleStartVocabularyQuiz}
                        theme={theme}
                      />
                    </div>
                  )}
                </div>
              )}
              <section className="block-start-quiz">
                <div className="my-6 text-center panel card">
                  <button
                    onClick={onStartPopQuiz}
                    className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105 quiz-start-btn"
                  >
                    Start a Practice Session 🎯
                  </button>
                </div>
                <div
                  id="quizzes"
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 subject-bar"
                >
                  {Object.entries(AppData).map(([subjectName, subject]) => {
                    // Robust icon resolution: fall back by subject name if subject.icon missing
                    const fallbackIconMap = {
                      Math: 'CalculatorIcon',
                      Science: 'BeakerIcon',
                      'Social Studies': 'GlobeIcon',
                      'Reasoning Through Language Arts (RLA)': 'BookOpenIcon',
                      RLA: 'BookOpenIcon',
                      Workforce: 'BriefcaseIcon',
                    };
                    const iconKey =
                      subject?.icon ||
                      fallbackIconMap[subjectName] ||
                      'ChartBarIcon';
                    const IconComponent = ICONS[iconKey] || (() => null);
                    const colorScheme = SUBJECT_COLORS[subjectName] || {};
                    const gradientBackground =
                      SUBJECT_BG_GRADIENTS[subjectName];
                    const iconWrapperStyle = gradientBackground
                      ? { backgroundImage: gradientBackground }
                      : colorScheme.background
                      ? { backgroundColor: colorScheme.background }
                      : { backgroundColor: DEFAULT_COLOR_SCHEME.background };
                    const subjectTextColor = colorScheme.text || '#ffffff';
                    const premadeTotal = getPremadeQuizTotal(subjectName);
                    const expandedReady =
                      typeof window !== 'undefined' &&
                      window.ExpandedQuizData &&
                      Object.keys(window.ExpandedQuizData).length > 0;
                    const premadeLabel =
                      premadeTotal === 1
                        ? '1 premade quiz ready'
                        : `${premadeTotal} premade quizzes ready`;
                    const subjectDataKey =
                      SUBJECT_SHORT_LABELS[subjectName] || subjectName;
                    // Find today's daily entry for this subject (if any) from consolidated daily progress map
                    const subjectIdForDaily = subjectName.includes(
                      'Language Arts'
                    )
                      ? 'rla'
                      : subjectName === 'Science'
                      ? 'science'
                      : subjectName === 'Math'
                      ? 'math'
                      : 'social_studies';
                    const dailyForSubject =
                      dailyProgressMap.get(subjectIdForDaily) || null;
                    const firstFocusTag = (() => {
                      if (
                        !dailyForSubject ||
                        !Array.isArray(dailyForSubject.tasks)
                      )
                        return null;
                      const coachTask = dailyForSubject.tasks.find(
                        (t) => t && t.type === 'coach-quiz'
                      );
                      return coachTask?.focusTag || null;
                    })();
                    const subjectKey =
                      subjectName === 'Math'
                        ? 'math'
                        : subjectName.includes('Language Arts')
                        ? 'rla'
                        : subjectName === 'Science'
                        ? 'science'
                        : 'social';

                    return (
                      <button
                        key={subjectName}
                        onClick={() => {
                          // Open Workforce Hub (frontend-only tools)
                          if (subjectName === 'Workforce') {
                            if (typeof onOpenWorkforce === 'function') {
                              onOpenWorkforce();
                              return;
                            }
                          }
                          openSubjectPremades(subjectName);
                        }}
                        className="subject-card group flex flex-col items-center justify-between gap-4 p-6 rounded-2xl border shadow-lg transition-all duration-300 subject-choice"
                        data-testid={`subject-button-${subjectName
                          .toLowerCase()
                          .replace(/[\s()]+/g, '-')
                          .replace(/-$/, '')}`}
                        style={
                          !isDarkMode
                            ? {
                                backgroundImage: gradientBackground,
                                borderColor:
                                  colorScheme.border || 'transparent',
                              }
                            : {
                                borderColor: 'var(--border-slate-700-70)',
                              }
                        }
                      >
                        <div
                          className="w-full rounded-xl py-6 flex items-center justify-center shadow-inner"
                          style={
                            !isDarkMode
                              ? {
                                  background: 'rgba(255, 255, 255, 0.3)',
                                  color: subjectTextColor,
                                }
                              : {
                                  ...iconWrapperStyle,
                                  color: subjectTextColor,
                                }
                          }
                        >
                          <IconComponent className="h-12 w-12 text-white drop-shadow" />
                        </div>
                        <h2
                          className="text-xl font-semibold text-slate-800 dark:text-slate-100"
                          style={{
                            color: !isDarkMode
                              ? '#ffffff'
                              : colorScheme.text || undefined,
                          }}
                        >
                          {subjectName}
                        </h2>
                        <span
                          className="quiz-count-text text-sm text-center"
                          data-subject={subjectDataKey}
                          style={{
                            color: !isDarkMode
                              ? 'rgba(255, 255, 255, 0.9)'
                              : subjectTextColor,
                          }}
                        >
                          {premadeLabel}
                        </span>
                        {window.__COACH_ENABLED__ && dailyForSubject && (
                          <div
                            className={`w-full mt-3 coach-subject-card subject-${subjectKey} rounded-md border p-2 text-left`}
                            onClick={(e) => e.stopPropagation()}
                            style={
                              !isDarkMode
                                ? {
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    borderColor: 'rgba(255, 255, 255, 0.4)',
                                    backdropFilter: 'blur(4px)',
                                  }
                                : {
                                    background: 'var(--bg-muted)',
                                    borderColor: 'var(--border-subtle)',
                                  }
                            }
                          >
                            <div className="flex items-center justify-between">
                              <p
                                className="subject-pill text-xs font-semibold uppercase tracking-wide"
                                style={
                                  !isDarkMode
                                    ? {
                                        borderRadius: '9999px',
                                        padding: '2px 10px',
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        color: '#0f172a',
                                      }
                                    : {
                                        borderRadius: '9999px',
                                        padding: '2px 10px',
                                      }
                                }
                              >
                                {subjectName.includes('Language Arts')
                                  ? 'RLA'
                                  : subjectName}
                              </p>
                              <span
                                className="minutes-pill text-[0.65rem]"
                                style={
                                  !isDarkMode
                                    ? {
                                        color: '#1e293b',
                                      }
                                    : {
                                        color: 'var(--text-slate-200)',
                                      }
                                }
                              >
                                {Math.max(
                                  0,
                                  dailyForSubject.completed_minutes || 0
                                )}{' '}
                                / {dailyForSubject.expected_minutes || 45} min
                              </span>
                            </div>
                            <div className="flex items-center justify-end gap-2 mt-2">
                              {dailyForSubject.coach_quiz_id &&
                                !dailyForSubject.coach_quiz_completed && (
                                  <button
                                    className="text-xs font-semibold px-2 py-1 rounded bg-white text-slate-900 hover:bg-white/90 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      startCoachQuizForSubject(
                                        subjectName,
                                        dailyForSubject.coach_quiz_source_id
                                      );
                                    }}
                                  >
                                    Start
                                  </button>
                                )}
                              {/* Ask Coach button parked/hidden */}
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
          {/* Test reminder modal/toast (scoped to StartScreen) */}
          {showTestReminder && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              style={{ backgroundColor: 'var(--modal-overlay)' }}
            >
              <div
                className="rounded-lg shadow-2xl w-full max-w-md p-6"
                style={{
                  backgroundColor: 'var(--modal-surface)',
                  color: 'var(--modal-text)',
                  border: '1px solid var(--modal-border)',
                }}
              >
                <h2 className="text-xl font-bold mb-2">Upcoming GED test</h2>
                <p className="mb-4">
                  Your test is in <strong>{showTestReminder.days}</strong>{' '}
                  day(s): {showTestReminder.date}
                </p>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowTestReminder(null)}
                    className="px-4 py-2 rounded-md font-semibold border"
                    style={{
                      background: 'transparent',
                      color: 'var(--text-primary)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    Got it
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }

    function Stem({ item }) {
      const passageContent =
        typeof item.passage === 'string' ? item.passage.trim() : '';
      const questionContent =
        typeof (item.questionText || item.question) === 'string'
          ? (item.questionText || item.question).trim()
          : '';

      const displaySource =
        (item?.asset && item.asset.displaySource) ||
        item.displaySource ||
        item.source ||
        '';

      return (
        <div className="stem space-y-4">
          {item.stimulusImage?.src &&
            (() => {
              const resolved = resolveAssetUrl(item.stimulusImage.src);
              return resolved ? (
                <div className="mb-3">
                  <img
                    src={resolved}
                    alt={item.stimulusImage.alt || 'stimulus'}
                    className="max-w-full rounded-md shadow"
                    loading="lazy"
                    style={{ border: '1px solid var(--border-subtle)' }}
                  />
                </div>
              ) : null;
            })()}

          {passageContent && (
            <div
              className="question-stem block"
              dangerouslySetInnerHTML={renderQuestionTextForDisplay(
                passageContent,
                item.isPremade === true,
                { subject: item.subject, isPremade: item.isPremade }
              )}
            />
          )}

          {questionContent && (
            <div className="mt-2">
              <div
                className="question-stem block font-bold text-slate-900"
                dangerouslySetInnerHTML={renderQuestionTextForDisplay(
                  questionContent,
                  item.isPremade === true,
                  { subject: item.subject, isPremade: item.isPremade }
                )}
              />
            </div>
          )}

          {displaySource && (
            <div className="mt-2 text-xs opacity-70">
              Source: {displaySource}
            </div>
          )}
        </div>
      );
    }

    // InlineDropdownPassage Component for RLA Part 3 Language/Grammar Cloze Questions
    function InlineDropdownPassage({
      passageText,
      questions,
      answers,
      onAnswerChange,
    }) {
      // Split the passage by placeholders like [[1]], [[2]], etc.
      const parts = passageText.split(/(\[\[\d+\]\])/g);

      return (
        <div className="leading-loose text-lg prose max-w-none">
          {parts.map((part, index) => {
            const match = part.match(/\[\[(\d+)\]\]/);
            if (match) {
              const qNum = parseInt(match[1], 10);
              // Find the question for this placeholder
              const question =
                questions.find((q) => q.questionNumber === qNum) ||
                questions[qNum - 1];

              if (!question) {
                return (
                  <span key={index} className="text-red-600 font-bold">
                    [Error: Question {qNum} not found]
                  </span>
                );
              }

              const answerOptions = question.answerOptions || [];
              const currentAnswer = answers[qNum - 1] || '';

              return (
                <select
                  key={index}
                  className="mx-1 border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 cursor-pointer font-semibold text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={currentAnswer}
                  onChange={(e) => onAnswerChange(qNum - 1, e.target.value)}
                  aria-label={`Question ${qNum}`}
                >
                  <option value="">Select...</option>
                  {answerOptions.map((opt, i) => {
                    const optionText =
                      typeof opt === 'string' ? opt : opt.text || '';
                    return (
                      <option key={i} value={optionText}>
                        {optionText}
                      </option>
                    );
                  })}
                </select>
              );
            }
            // Regular text part - render with HTML support
            return (
              <span
                key={index}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtmlContent(part, { normalizeSpacing: true }),
                }}
              />
            );
          })}
        </div>
      );
    }

    // RLA Reading Part 1 - Split Screen View
    function QuizRunner({ quiz, onComplete, onExit }) {
      console.log('QuizRunner received quiz:', quiz); // Debugging line
      if (!quiz) return <div className="text-center p-8">Loading quiz...</div>;

      switch (quiz.type) {
        case 'multi-part-math':
          return (
            <MultiPartMathRunner
              quiz={quiz}
              onComplete={onComplete}
              onExit={onExit}
            />
          );
        case 'multi-part-rla':
          // The existing MultiPartRlaRunner can be used as is for now
          return (
            <MultiPartRlaRunner
              quiz={quiz}
              onComplete={onComplete}
              onExit={onExit}
            />
          );
        default:
          return (
            <StandardQuizRunner
              quiz={quiz}
              onComplete={onComplete}
              onExit={onExit}
            />
          );
      }
    }

    function MultiPartRlaRunner({ quiz, onComplete, onExit }) {
      const [currentPart, setCurrentPart] = useState(1);
      const [isPaused, setIsPaused] = useState(false);
      const [timeLeft, setTimeLeft] = useState(0);
      const [pausesRemaining, setPausesRemaining] = useState(2);
      const [showBreak, setShowBreak] = useState(false);

      const PART_TIMES = { 1: 35 * 60, 2: 45 * 60, 3: 70 * 60 };

      const [part1Answers, setPart1Answers] = useState(
        Array(quiz.part1_reading.length).fill(null)
      );
      const [part3Answers, setPart3Answers] = useState(
        Array(quiz.part3_language.length).fill(null)
      );
      const [essayText, setEssayText] = useState('');
      const [isScoring, setIsScoring] = useState(false);
      const [essayScore, setEssayScore] = useState(null);
      const [part1Result, setPart1Result] = useState(null);

      useEffect(() => {
        setTimeLeft(PART_TIMES[currentPart]);
        setIsPaused(false);
        setPausesRemaining(2);
      }, [currentPart]);

      useEffect(() => {
        if (isPaused || timeLeft <= 0) return;
        const timerId = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearInterval(timerId);
      }, [isPaused, timeLeft]);

      const handlePauseToggle = () => {
        if (isPaused) {
          setIsPaused(false);
          return;
        }
        if (pausesRemaining > 0) {
          setIsPaused(true);
          setPausesRemaining((prev) => prev - 1);
        }
      };

      const formatTime = (seconds) =>
        `${Math.floor(Math.max(0, seconds) / 60)}:${(Math.max(0, seconds) % 60)
          .toString()
          .padStart(2, '0')}`;

      const handlePart1Complete = (result) => {
        setPart1Result(result);
        setShowBreak(true);
      };

      const handlePart2Complete = async () => {
        if (isScoring) return;
        const result = await handleScoreEssay();
        if (!result) return;
        setShowBreak(true);
      };

      const handleContinueFromBreak = () => {
        setShowBreak(false);
        setCurrentPart((prev) => prev + 1);
      };

      const handleFinalSubmit = (part3Result) => {
        const part1Questions = quiz.part1_reading || [];
        const part3Questions = quiz.part3_language || [];

        const part1Data = part1Result || {
          answers: part1Answers,
          marked: Array(part1Questions.length).fill(false),
          confidence: Array(part1Questions.length).fill(null),
        };

        const part3Data = part3Result || {
          answers: part3Answers,
          marked: Array(part3Questions.length).fill(false),
          confidence: Array(part3Questions.length).fill(null),
        };

        const combinedAnswers = [
          ...(part1Data.answers || part1Answers),
          ...(part3Data.answers || part3Answers),
        ];

        const combinedMarked = [
          ...(part1Data.marked || Array(part1Questions.length).fill(false)),
          ...(part3Data.marked || Array(part3Questions.length).fill(false)),
        ];

        const combinedConfidence = [
          ...(part1Data.confidence || Array(part1Questions.length).fill(null)),
          ...(part3Data.confidence || Array(part3Questions.length).fill(null)),
        ];

        const part1Correct = part1Questions.reduce((count, question, index) => {
          const correctOpt = findCorrectOption(question.answerOptions);
          return (
            count +
            (correctOpt &&
            correctOpt.text === (part1Data.answers?.[index] ?? null)
              ? 1
              : 0)
          );
        }, 0);

        const part3Correct = part3Questions.reduce((count, question, index) => {
          const correctOpt = findCorrectOption(question.answerOptions);
          return (
            count +
            (correctOpt &&
            correctOpt.text === (part3Data.answers?.[index] ?? null)
              ? 1
              : 0)
          );
        }, 0);

        const score = part1Correct + part3Correct;
        const totalQuestions = part1Questions.length + part3Questions.length;
        const multipleChoicePercentage =
          totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

        // Updated essay scoring: support 0-6 scale (2 points per trait * 3 traits)
        const essayOverallScore =
          typeof essayScore?.overallScore === 'number'
            ? essayScore.overallScore
            : null;
        const essayPercentage =
          essayOverallScore !== null ? (essayOverallScore / 6) * 100 : 0;

        // RLA Comprehensive Scoring Weights:
        // Part 1 (Reading MC): 42%
        // Part 3 (Language MC): 38%
        // Part 2 (Essay): 20%
        const part1Weight = 0.42;
        const part3Weight = 0.38;
        const essayWeight = 0.2;

        const part1Percentage =
          part1Questions.length > 0
            ? (part1Correct / part1Questions.length) * 100
            : 0;
        const part3Percentage =
          part3Questions.length > 0
            ? (part3Correct / part3Questions.length) * 100
            : 0;

        const finalPercentage =
          part1Percentage * part1Weight +
          part3Percentage * part3Weight +
          essayPercentage * essayWeight;

        const scaledScore = Math.round(
          finalPercentage < 65
            ? 100 + (finalPercentage / 65) * 44
            : 145 + ((finalPercentage - 65) / 35) * 55
        );

        const combinedQuestions = [...part1Questions, ...part3Questions];
        const normalizedQuiz = { ...quiz, questions: combinedQuestions };

        onComplete({
          score,
          totalQuestions,
          scaledScore,
          subject: quiz.subject,
          answers: combinedAnswers,
          marked: combinedMarked,
          confidence: combinedConfidence,
          essayScore,
          multipleChoicePercentage,
          essayPercentage,
          finalPercentage,
          quiz: normalizedQuiz,
        });
      };

      const handleScoreEssay = async () => {
        if (!essayText.trim()) {
          alert('Please write an essay before continuing.');
          return null;
        }

        if (isScoring) {
          return essayScore;
        }

        setIsScoring(true);
        try {
          const token =
            (typeof localStorage !== 'undefined' &&
              localStorage.getItem('appToken')) ||
            null;
          const response = await fetch(`${API_BASE_URL}/api/essay/score`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ essayText, completion: '5/5' }),
          });
          if (!response.ok) throw new Error('Failed to score essay.');
          const result = await response.json();
          // Accept both normalized and raw Google response formats
          let parsedScore = null;
          if (
            result &&
            result.trait1 &&
            result.trait2 &&
            result.trait3 &&
            typeof result.overallScore === 'number'
          ) {
            parsedScore = result;
          } else if (
            result &&
            result.candidates &&
            result.candidates[0]?.content?.parts?.[0]?.text
          ) {
            let jsonText = result.candidates[0].content.parts[0].text
              .replace(/```json/g, '')
              .replace(/```/g, '')
              .trim();
            parsedScore = JSON.parse(jsonText);
          } else {
            throw new Error('Unexpected essay score format');
          }
          setEssayScore(parsedScore);
          // Fetch challenge suggestions to show to the student
          try {
            const sugRes = await fetch(
              `${API_BASE_URL}/api/challenges/suggestions`,
              {
                headers: {
                  ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
              }
            );
            if (sugRes.ok) {
              const data = await sugRes.json();
              console.log('[Essay] Suggestions:', data);
            }
          } catch (_) {}
          return parsedScore;
        } catch (error) {
          console.error('Error scoring essay:', error);
          const errorResult = { error: 'Sorry, could not score your essay.' };
          setEssayScore(errorResult);
          alert(
            "We couldn't score your essay automatically, but you can continue to the final section."
          );
          return errorResult;
        } finally {
          setIsScoring(false);
        }
      };

      const renderCurrentPart = () => {
        switch (currentPart) {
          case 1:
            return (
              <div>
                <h3 className="text-2xl font-bold mb-4 subject-accent-heading">
                  Part 1: Reading Comprehension
                </h3>
                <RlaReadingSplitView
                  questions={quiz.part1_reading}
                  answers={part1Answers}
                  setAnswers={setPart1Answers}
                  onComplete={handlePart1Complete}
                  buttonText="Continue to Essay"
                />
              </div>
            );
          case 2:
            return (
              <div className="essay-wrapper">
                <h3 className="text-2xl font-bold mb-4 subject-accent-heading">
                  Part 2: Extended Response (Essay)
                </h3>
                <div className="flex flex-col lg:flex-row gap-4 essay-section">
                  {/* LEFT: passages */}
                  <div className="lg:w-1/2 space-y-4 max-h-[32rem] overflow-y-auto essay-passage-panel">
                    {(Array.isArray(quiz.part2_essay.passages)
                      ? quiz.part2_essay.passages
                      : []
                    )
                      .slice(0, 2)
                      .map((p, idx) => (
                        <div
                          key={idx}
                          className="prose passage-section max-w-none bg-slate-50 p-4 rounded-lg passage-card"
                        >
                          <h4 className="question-stem">
                            {p?.title || `Passage ${idx + 1}`}
                          </h4>
                          {p?.author ? (
                            <p className="text-xs text-slate-500 mb-2 essay-author">
                              by {p.author}
                            </p>
                          ) : null}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHtmlContent(p?.content || '', {
                                normalizeSpacing: true,
                              }),
                            }}
                          />
                        </div>
                      ))}
                  </div>
                  {/* RIGHT: writing area */}
                  <div className="lg:w-1/2 flex flex-col essay-right-panel">
                    <h4 className="font-bold mb-2 essay-prompt-title">
                      Essay Prompt:
                    </h4>
                    <p className="mb-2">{quiz.part2_essay.prompt}</p>
                    <textarea
                      className="w-full min-h-[24rem] p-2 border rounded flex-1 essay-response-box"
                      value={essayText}
                      onChange={(e) => setEssayText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Tab') {
                          e.preventDefault();
                          const target = e.target;
                          const start = target.selectionStart;
                          const end = target.selectionEnd;
                          const value = target.value;
                          const insert = '    ';
                          const next =
                            value.slice(0, start) + insert + value.slice(end);
                          setEssayText(next);
                          setTimeout(() => {
                            try {
                              target.selectionStart = target.selectionEnd =
                                start + insert.length;
                            } catch {}
                          }, 0);
                        }
                      }}
                      placeholder="Type your essay response here..."
                    />
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={handlePart2Complete}
                        disabled={isScoring}
                        className="px-6 py-2 bg-sky-600 text-white font-bold rounded-lg disabled:bg-slate-400 disabled:cursor-not-allowed"
                      >
                        {isScoring
                          ? 'Scoring Essay...'
                          : 'Continue to Final Section'}
                      </button>
                    </div>
                    {isScoring && (
                      <p className="mt-2 text-sm text-slate-500">
                        Scoring your essay with AI feedback. Please hold
                        tight...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          case 3:
            return (
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Part 3: Language &amp; Grammar
                </h3>
                <QuizInterface
                  questions={quiz.part3_language}
                  answers={part3Answers}
                  setAnswers={setPart3Answers}
                  onComplete={handleFinalSubmit}
                  quizTitle="Part 3: Language & Grammar"
                  buttonText="Finish Exam"
                  subject={quiz.subject}
                  showTimer={false}
                  quizConfig={quiz.config}
                />
              </div>
            );
          default:
            return null;
        }
      };

      return (
        <div className="fade-in">
          {showBreak ? (
            <div className="max-w-2xl mx-auto mt-12 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl text-center">
              <h2 className="text-3xl font-bold mb-4 text-purple-700 dark:text-purple-400">
                Break Between Sections
              </h2>
              <p className="text-xl mb-6 text-slate-700 dark:text-slate-300">
                You are about to begin Part {currentPart + 1} of the RLA test.
              </p>
              <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <p className="text-lg font-semibold mb-2">
                  {currentPart === 1
                    ? 'Next: Extended Response (Essay)'
                    : 'Next: Language & Grammar'}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {currentPart === 1
                    ? 'You will analyze two passages and write an essay.'
                    : 'You will answer language and grammar questions.'}
                </p>
              </div>
              <button
                onClick={handleContinueFromBreak}
                className="px-8 py-3 bg-purple-600 text-white font-bold text-lg rounded-lg hover:bg-purple-700 transition"
              >
                Continue to Part {currentPart + 1}
              </button>
            </div>
          ) : (
            <>
              <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 mb-4 border-b">
                <button
                  onClick={onExit}
                  className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600 font-semibold"
                >
                  <ArrowLeftIcon /> Back
                </button>
                <h2 className="text-xl font-bold text-center text-slate-800 flex-1 exam-title">
                  {quiz.title}
                </h2>
                <div className="flex flex-col sm:items-end gap-2">
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full font-mono text-lg font-semibold ${
                      timeLeft <= 60
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span role="img" aria-label="timer">
                      ⏱️
                    </span>
                    <span>{formatTime(timeLeft)}</span>
                    {isPaused && (
                      <span className="text-xs uppercase tracking-wide">
                        Paused
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePauseToggle}
                      disabled={!isPaused && pausesRemaining === 0}
                      className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${
                        isPaused
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-sky-600 text-white hover:bg-sky-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed'
                      }`}
                    >
                      {isPaused ? 'Resume Timer' : 'Pause Timer'}
                    </button>
                    <span className="text-xs text-slate-500">
                      {pausesRemaining} pause{pausesRemaining === 1 ? '' : 's'}{' '}
                      left
                    </span>
                  </div>
                </div>
              </header>
              {isPaused ? (
                <div className="text-center p-12 bg-slate-100 rounded-lg">
                  <h2 className="text-3xl font-bold">Exam Paused</h2>
                  <button
                    onClick={() => setIsPaused(false)}
                    className="mt-4 px-8 py-3 bg-sky-600 text-white font-bold rounded-lg"
                  >
                    Resume
                  </button>
                </div>
              ) : (
                renderCurrentPart()
              )}
            </>
          )}
        </div>
      );
    }

    function ResultsScreen({
      results,
      quiz,
      onRestart,
      onHome,
      onReviewMarked,
    }) {
      // Hard guard so we don't crash
      if (!quiz || !results || !Array.isArray(quiz.questions)) {
        return (
          <div className="results-screen error">
            <h2>Results Unavailable</h2>
            <p>
              We saved your score, but couldn't build the detailed breakdown.
            </p>
            <button onClick={onHome}>Back to Menu</button>
          </div>
        );
      }

      const safeMarked = Array.isArray(results.marked) ? results.marked : [];
      const safeAnswers = Array.isArray(results.answers) ? results.answers : [];
      const manualShortIndexes = Array.isArray(
        results.manualShortResponseIndexes
      )
        ? results.manualShortResponseIndexes
        : (quiz.questions || []).reduce((acc, question, idx) => {
            if (isShortResponseQuestion(question)) acc.push(idx);
            return acc;
          }, []);
      const manualShortSet = new Set(manualShortIndexes);

      const [suggestions, setSuggestions] = useState([]);
      const [loadingSuggestions, setLoadingSuggestions] = useState(false);

      useEffect(() => {
        let isActive = true;
        const load = async () => {
          try {
            setLoadingSuggestions(true);
            const token =
              (typeof localStorage !== 'undefined' &&
                localStorage.getItem('appToken')) ||
              null;
            if (!token) {
              setSuggestions([]);
              return;
            }
            const res = await fetch(
              `${API_BASE_URL}/api/challenges/suggestions`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            if (res.ok) {
              const data = await res.json();
              if (isActive)
                setSuggestions(Array.isArray(data?.items) ? data.items : []);
            }
          } catch (_e) {
            // ignore
          } finally {
            if (isActive) setLoadingSuggestions(false);
          }
        };
        load();
        return () => {
          isActive = false;
        };
      }, []);

      const prettyLabel = (tag, label) => {
        if (label && typeof label === 'string') return label;
        if (!tag) return 'Unknown';
        const t = String(tag).replace(/[:_\-]/g, ' ');
        return t.replace(/\b\w/g, (m) => m.toUpperCase());
      };

      const resolveSuggestion = async (id, action) => {
        try {
          const token =
            (typeof localStorage !== 'undefined' &&
              localStorage.getItem('appToken')) ||
            null;
          if (!token) return;
          const res = await fetch(`${API_BASE_URL}/api/challenges/resolve`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ suggestion_id: id, action }),
          });
          if (res.ok) {
            setSuggestions((prev) => prev.filter((s) => s.id !== id));
          }
        } catch (_e) {}
      };
      const getPerf = (score) => {
        if (score >= 175)
          return {
            level: 'GED® College Ready + Credit',
            color: 'text-purple-600',
          };
        if (score >= 165)
          return { level: 'GED® College Ready', color: 'text-blue-600' };
        if (score >= 145)
          return { level: 'GED® Passing Score', color: 'text-green-600' };
        return { level: 'Keep studying!', color: 'text-amber-600' };
      };

      const scaledScore =
        typeof results?.scaledScore === 'number' ? results.scaledScore : 0;
      const performance = getPerf(scaledScore);
      const markedQuestions = quiz.questions.filter(
        (_, index) => !!safeMarked[index]
      );

      // Prefer backend/augmented category breakdown if available
      const categoryBreakdown = Array.isArray(results?.categoryBreakdown)
        ? results.categoryBreakdown
        : [];
      // Fallback to legacy type-based grouping if breakdown missing
      let fallbackBreakdown = [];
      if (!categoryBreakdown.length) {
        const perf = quiz.questions.reduce((acc, question, index) => {
          if (isShortResponseQuestion(question)) {
            return acc;
          }
          const type = question.type || 'knowledge';
          if (!acc[type]) acc[type] = { correct: 0, total: 0 };
          acc[type].total++;
          const correctAnswer = question.answerOptions?.find(
            (opt) => opt.isCorrect
          )?.text;
          if (safeAnswers[index] === correctAnswer) acc[type].correct++;
          return acc;
        }, {});
        fallbackBreakdown = Object.entries(perf).map(([cat, data]) => ({
          category: cat,
          correct: data.correct,
          total: data.total,
          percent: data.total
            ? Math.round((data.correct / data.total) * 100)
            : 0,
        }));
      }
      const finalBreakdown = categoryBreakdown.length
        ? categoryBreakdown
        : fallbackBreakdown;

      // Normalize breakdown for UI rendering
      const performanceByCategory = (
        Array.isArray(finalBreakdown) ? finalBreakdown : []
      ).reduce((acc, item) => {
        const key = item?.category || 'Unknown';
        acc[key] = {
          correct: Number(item?.correct || 0),
          total: Number(item?.total || 0),
        };
        return acc;
      }, {});

      const categoryNames = {
        text: 'Text Analysis',
        image: 'Image/Map Interpretation',
        knowledge: 'Knowledge-Based',
        quote: 'Quote Analysis',
        'cause-effect': 'Cause & Effect',
        'multi-source': 'Multi-Source Analysis',
        analysis: 'Paired Passage Analysis',
        chart: 'Chart/Data Analysis',
        math: 'Mathematical Reasoning',
        science: 'Science Reasoning',
        social: 'Social Studies',
        reading: 'Reading Comprehension',
        writing: 'Writing & Language',
      };

      return (
        <div
          className="text-center fade-in results-screen"
          data-subject={quiz?.subject || ''}
        >
          <h2 className="text-3xl font-bold subject-accent-heading">
            Results: {quiz?.title || 'Completed Quiz'}
          </h2>
          <div className="my-6">
            <p className="text-lg text-slate-600">
              Your estimated GED® Score is:
            </p>
            <p className={`text-6xl font-bold my-2 ${performance.color}`}>
              {scaledScore}
            </p>
            <p className={`text-2xl font-semibold mb-2 ${performance.color}`}>
              {performance.level}
            </p>
            <p className="text-lg text-slate-500">
              {results?.score ?? 0} /{' '}
              {results?.totalQuestions ?? (quiz?.questions?.length || 0)}{' '}
              Correct
            </p>
            {manualShortIndexes.length > 0 && (
              <p className="mt-2 text-sm text-slate-500">
                {manualShortIndexes.length} short-response item
                {manualShortIndexes.length === 1 ? '' : 's'} require manual
                review and were not auto-scored.
              </p>
            )}
          </div>

          {(loadingSuggestions || (suggestions && suggestions.length)) && (
            <div className="mt-6 pt-4 border-t max-w-2xl mx-auto text-left">
              <h3 className="text-xl font-bold subject-accent-heading mb-3">
                Suggested Focus Areas
              </h3>
              {loadingSuggestions && !suggestions.length ? (
                <p className="text-sm text-slate-500">Loading suggestions…</p>
              ) : suggestions.length ? (
                <ul className="space-y-2">
                  {suggestions.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between gap-3 bg-slate-50 panel-surface p-3 rounded-lg border"
                    >
                      <div>
                        <p className="font-semibold text-slate-800">
                          {prettyLabel(s.challenge_tag, s.label)}
                        </p>
                        <p className="text-xs text-slate-500">
                          {s.suggestion_type === 'add'
                            ? 'Consider adding this challenge to your practice plan.'
                            : 'We think you may be ready to remove this challenge.'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => resolveSuggestion(s.id, 'reject')}
                          className="px-3 py-1 text-sm rounded-md bg-slate-200 hover:bg-slate-300"
                        >
                          Dismiss
                        </button>
                        <button
                          onClick={() => resolveSuggestion(s.id, 'accept')}
                          className="px-3 py-1 text-sm rounded-md bg-sky-600 text-white hover:bg-sky-700"
                        >
                          Accept
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">
                  No suggestions right now.
                </p>
              )}
            </div>
          )}

          <div className="mt-8 pt-6 border-t max-w-lg mx-auto">
            <h3 className="text-xl font-bold subject-accent-heading mb-4">
              Performance by Category
            </h3>
            <div className="space-y-3 text-left">
              {Object.entries(performanceByCategory).map(([type, data]) => (
                <div
                  key={type}
                  className="bg-slate-100 dark:bg-slate-800/60 p-3 rounded-lg panel-surface border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {categoryNames[type] || type}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {data.correct} / {data.total}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-sky-500 h-2.5 rounded-full"
                      style={{
                        width: `${
                          data.total ? (data.correct / data.total) * 100 : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={onHome}
              className="btn-reset px-6 py-2 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700"
            >
              Go Home
            </button>
            {markedQuestions.length > 0 && (
              <button
                onClick={() => onReviewMarked(markedQuestions, quiz?.subject)}
                className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600"
              >
                Review {markedQuestions.length} Marked
              </button>
            )}
            <button
              onClick={onRestart}
              className="btn-reset px-6 py-2 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700"
            >
              Try Again
            </button>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold subject-accent-heading mb-4">
              Detailed Question Review
            </h3>
            <div className="space-y-4 text-left">
              {(quiz.questions || []).map((question, index) => {
                const rawAnswers = Array.isArray(results.answers)
                  ? results.answers
                  : [];
                const userAnswer =
                  rawAnswers[index] !== undefined ? rawAnswers[index] : null;
                const correctOpt = findCorrectOption(question.answerOptions);
                // Use unified comparison logic for results display
                const isManual =
                  manualShortSet.has(index) ||
                  isShortResponseQuestion(question);
                let isCorrect;
                if (isManual) {
                  isCorrect = null;
                } else if (correctOpt) {
                  // Multiple choice - use compareAnswers with subject context
                  isCorrect = compareAnswers(correctOpt.text, userAnswer, {
                    subject: quiz.subject,
                    questionType: question.type,
                  });
                } else if (
                  question.type === 'fill-in-the-blank' ||
                  !(question.answerOptions || []).length
                ) {
                  // Fill-in question - use compareAnswers
                  isCorrect = compareAnswers(
                    question.correctAnswer,
                    userAnswer,
                    {
                      subject: quiz.subject,
                      questionType: question.type,
                    }
                  );
                } else {
                  isCorrect = false;
                }
                const confidenceLevel = results.confidence
                  ? results.confidence[index]
                  : null;

                const getConfidenceColor = (level) => {
                  if (level === 'Confident')
                    return 'bg-green-100 text-green-800';
                  if (level === 'Unsure')
                    return 'bg-yellow-100 text-yellow-800';
                  if (level === 'Guessing') return 'bg-red-100 text-red-800';
                  return 'bg-slate-100 text-slate-800';
                };

                const borderClass =
                  isCorrect === true
                    ? 'border-green-200'
                    : isCorrect === false
                    ? 'border-red-200'
                    : 'border-slate-200';

                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg panel-surface ${borderClass} text-slate-900 dark:text-slate-100`}
                  >
                    <div className="mb-2 flex items-start gap-3">
                      <span className="font-semibold question-stem leading-relaxed">
                        {question.questionNumber}.
                      </span>
                      <Stem item={question} />
                    </div>
                    {(() => {
                      const rawImg =
                        !question.stimulusImage?.src && question.imageUrl
                          ? question.imageUrl
                          : null;
                      const imgSrc = resolveAssetUrl(rawImg);
                      return imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={`Visual for question ${question.questionNumber}`}
                          className="my-2 rounded-md border max-w-xs h-auto"
                          onError={(e) => {
                            if (e.target.dataset.fallbackApplied) {
                              e.target.style.display = 'none';
                              return;
                            }
                            e.target.dataset.fallbackApplied = '1';
                            const src = e.target.getAttribute('src') || '';
                            const origin =
                              (typeof window !== 'undefined' &&
                                window.location &&
                                window.location.origin) ||
                              '';
                            const idx = src.indexOf('/Images/');
                            if (idx !== -1) {
                              const rel = src
                                .substring(idx)
                                .replace('/Images/', '/frontend/Images/');
                              e.target.src = origin + rel;
                            } else {
                              e.target.style.display = 'none';
                            }
                          }}
                        />
                      ) : null;
                    })()}
                    {GEOMETRY_FIGURES_ENABLED && question.geometrySpec && (
                      <div className="my-3 max-w-md">
                        <GeometryFigure
                          spec={question.geometrySpec}
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                    <p
                      className={`mt-2 ${
                        isCorrect === true
                          ? 'text-green-700'
                          : isCorrect === false
                          ? 'text-red-700'
                          : 'text-slate-600'
                      }`}
                    >
                      {(() => {
                        const display = (() => {
                          if (userAnswer === null || userAnswer === undefined)
                            return 'No answer';
                          const s = String(userAnswer)
                            .replace(/\u00A0/g, ' ')
                            .trim();
                          return s.length ? s : 'No answer';
                        })();
                        return <>Your answer: {display} </>;
                      })()}
                      {isCorrect === true ? (
                        <CorrectIcon className="inline-block w-5 h-5 ml-1 text-green-600" />
                      ) : isCorrect === false ? (
                        <WrongIcon className="inline-block w-5 h-5 ml-1 text-red-600" />
                      ) : (
                        <span className="ml-2 inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-800">
                          Manual review
                        </span>
                      )}
                    </p>
                    {isCorrect === false &&
                      ((correctOpt && correctOpt.text) ||
                        question.correctAnswer) && (
                        <p className="text-green-700 question-stem">
                          Correct answer:{' '}
                          <span
                            className="question-stem"
                            dangerouslySetInnerHTML={renderQuestionTextForDisplay(
                              (correctOpt && correctOpt.text) ||
                                question.correctAnswer,
                              question.isPremade === true,
                              question
                            )}
                          />
                        </p>
                      )}
                    {isManual &&
                      (() => {
                        const rubricHints = Array.isArray(
                          question.expectedFeatures
                        )
                          ? question.expectedFeatures
                          : Array.isArray(question.rubricHints)
                          ? question.rubricHints
                          : [];
                        const sampleAnswer =
                          typeof question.sampleAnswer === 'string'
                            ? question.sampleAnswer.trim()
                            : '';
                        if (!rubricHints.length && !sampleAnswer) return null;
                        return (
                          <div className="mt-3 text-sm text-slate-600">
                            {rubricHints.length > 0 && (
                              <div>
                                <p className="font-semibold text-slate-700">
                                  Self-check rubric
                                </p>
                                <ul className="mt-1 list-disc pl-5 space-y-1">
                                  {rubricHints.map((hint, idx) => (
                                    <li key={idx}>{hint}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {sampleAnswer && (
                              <div className="mt-2">
                                <p className="font-semibold text-slate-700">
                                  Sample answer
                                </p>
                                <p className="mt-1 leading-relaxed">
                                  {sampleAnswer}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    {correctOpt &&
                      correctOpt.raw &&
                      correctOpt.raw.rationale && (
                        <div className="explanation">
                          <span className="font-semibold">Rationale:</span>{' '}
                          <span
                            className="question-stem"
                            dangerouslySetInnerHTML={renderQuestionTextForDisplay(
                              correctOpt.raw.rationale,
                              question.isPremade === true,
                              question
                            )}
                          />
                        </div>
                      )}
                    {confidenceLevel && (
                      <div className="mt-2">
                        <span className="font-semibold text-sm text-slate-600">
                          Your confidence:{' '}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-xs font-bold rounded-full ${getConfidenceColor(
                            confidenceLevel
                          )}`}
                        >
                          {confidenceLevel}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    function ReadingPractice({ quiz, onComplete, onExit }) {
      const [answers, setAnswers] = useState({});
      const [isSubmitted, setIsSubmitted] = useState(false);

      const handleAnswer = (qIndex, answer) => {
        if (isSubmitted) return;
        setAnswers((prev) => ({ ...prev, [qIndex]: answer }));
      };

      const handleSubmit = () => {
        if (Object.keys(answers).length !== quiz.questions.length) {
          if (
            !confirm(
              'You have unanswered questions. Are you sure you want to submit?'
            )
          ) {
            return;
          }
        }
        setIsSubmitted(true);
        let score = 0;
        quiz.questions.forEach((q, i) => {
          const correctOpt = findCorrectOption(q.answerOptions);
          if (correctOpt && answers[i] === correctOpt.text) {
            score++;
          }
        });
        const percentage = (score / quiz.questions.length) * 100;
        const scaledScore = Math.round(
          percentage < 65
            ? 100 + (percentage / 65) * 44
            : 145 + ((percentage - 65) / 35) * 55
        );
        onComplete({
          score,
          totalQuestions: quiz.questions.length,
          scaledScore,
          subject: quiz.subject,
          quiz,
        });
      };

      return (
        <div className="fade-in" data-subject={quiz.subject}>
          <header className="flex justify-between items-center pb-4 mb-4 border-b">
            <button
              onClick={onExit}
              className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600 font-semibold"
            >
              <ArrowLeftIcon /> Back
            </button>
            <h2 className="text-xl font-bold text-center subject-accent-heading">
              {quiz.title}
            </h2>
            <div></div>
          </header>
          <article className="prose passage-section max-w-none">
            <h3
              className="text-2xl font-bold question-stem"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtmlContent(quiz.article.title, {
                  normalizeSpacing: true,
                }),
              }}
            ></h3>
            <p className="text-sm italic text-slate-500">
              {quiz.article.genre}
            </p>
            {(() => {
              const imgSrc = resolveAssetUrl(quiz.imageUrl);
              return imgSrc ? (
                <img
                  src={imgSrc}
                  alt="Article supplemental image"
                  className="my-4 mx-auto rounded-md border"
                />
              ) : null;
            })()}
            {quiz.article.text.map((p, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtmlContent(p, { normalizeSpacing: true }),
                }}
              ></p>
            ))}
          </article>
          <section className="mt-8 pt-6 border-t">
            <h3 className="text-2xl font-bold mb-4 subject-accent-heading">
              Questions
            </h3>
            <div className="space-y-6">
              {quiz.questions.map((q, i) => {
                const correctOpt = findCorrectOption(q.answerOptions);
                return (
                  <div
                    key={i}
                    className={`question-container p-4 rounded-lg transition-colors ${
                      isSubmitted
                        ? answers[i] === correctOpt?.text
                          ? 'bg-green-50'
                          : 'bg-red-50'
                        : 'bg-slate-50'
                    }`}
                  >
                    {(() => {
                      const rawImg =
                        !(q.stimulusImage && q.stimulusImage.src) && q.imageUrl
                          ? q.imageUrl
                          : null;
                      const imgSrc = resolveAssetUrl(rawImg);
                      return imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={`Visual for question ${i + 1}`}
                          className="my-2 rounded-md border max-w-xs h-auto"
                          onError={(e) => {
                            if (e.target.dataset.fallbackApplied) {
                              e.target.style.display = 'none';
                              return;
                            }
                            e.target.dataset.fallbackApplied = '1';
                            const src = e.target.getAttribute('src') || '';
                            // if we failed on Netlify, try current origin with the original normalized path
                            const origin =
                              (typeof window !== 'undefined' &&
                                window.location &&
                                window.location.origin) ||
                              '';
                            // rebuild a /frontend/Images/... from the current src
                            const idx = src.indexOf('/Images/');
                            if (idx !== -1) {
                              const rel = src
                                .substring(idx)
                                .replace('/Images/', '/frontend/Images/');
                              e.target.src = origin + rel;
                            } else {
                              e.target.style.display = 'none';
                            }
                          }}
                        />
                      ) : null;
                    })()}
                    {GEOMETRY_FIGURES_ENABLED && q.geometrySpec && (
                      <div className="my-3 max-w-md">
                        <GeometryFigure
                          spec={q.geometrySpec}
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                    <div className="mb-2 flex items-start gap-3">
                      <span className="font-semibold question-stem leading-relaxed">
                        {i + 1}.
                      </span>
                      <Stem
                        item={{
                          ...q,
                          questionNumber: q.questionNumber ?? i + 1,
                        }}
                      />
                    </div>
                    <div className="mt-2 space-y-1">
                      {(q.answerOptions || []).map((opt, j) => {
                        // Handle both string and object formats for answerOptions
                        const optText =
                          typeof opt === 'string' ? opt : opt?.text || '';
                        const optIsCorrect =
                          typeof opt === 'string'
                            ? false
                            : opt?.isCorrect || false;
                        const isSelectedOption = answers[i] === optText;
                        const optionClasses = [
                          'answer-option flex items-center p-2 rounded cursor-pointer',
                          isSelectedOption
                            ? 'bg-slate-200'
                            : 'hover:bg-slate-100',
                          isSubmitted && optIsCorrect ? 'correct' : '',
                          isSubmitted && isSelectedOption && !optIsCorrect
                            ? 'incorrect'
                            : '',
                        ]
                          .filter(Boolean)
                          .join(' ');
                        return (
                          <label key={j} className={optionClasses}>
                            <input
                              type="radio"
                              name={`q${i}`}
                              value={optText}
                              onChange={() => handleAnswer(i, optText)}
                              disabled={isSubmitted}
                              className="mr-2"
                            />
                            <span
                              className={`${
                                isSubmitted && optIsCorrect
                                  ? 'font-bold text-green-700'
                                  : ''
                              } ${
                                isSubmitted && isSelectedOption && !optIsCorrect
                                  ? 'line-through text-red-700'
                                  : ''
                              } question-stem`}
                            >
                              <span
                                className="question-stem"
                                dangerouslySetInnerHTML={renderQuestionTextForDisplay(
                                  optText,
                                  q.isPremade === true,
                                  q
                                )}
                              />
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            {!isSubmitted && (
              <button
                onClick={handleSubmit}
                className="mt-6 w-full px-6 py-3 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700"
              >
                Submit Answers
              </button>
            )}
          </section>
        </div>
      );
    }

    function EssayGuide({ onExit }) {
      const [activeTab, setActiveTab] = useState('passages');
      const [selectedTopic, setSelectedTopic] = useState(0);
      const [timer, setTimer] = useState(45 * 60);
      const [timerActive, setTimerActive] = useState(false);
      const [overtimeNotified, setOvertimeNotified] = useState(false);
      const [essayMode, setEssayMode] = useState('guided'); // 'guided' | 'freeform'
      const [essayText, setEssayText] = useState({
        intro: '',
        body1: '',
        body2: '',
        body3: '',
        conclusion: '',
      });
      const [showModal, setShowModal] = useState(false);
      const [isScoring, setIsScoring] = useState(false);
      const [scoreResult, setScoreResult] = useState(null);
      const [showPromptOverlay, setShowPromptOverlay] = useState(false);
      const [overlayView, setOverlayView] = useState('prompt');

      const intervalRef = useRef(null);

      // Helper: strip HTML to plain text, preserve basic paragraph breaks
      const stripHtmlToPlain = (html) => {
        if (typeof html !== 'string') return '';
        // Replace paragraph tags with double newlines before stripping other tags
        let text = html
          .replace(/<\s*br\s*\/?>/gi, '\n')
          .replace(/<\s*\/?p[^>]*>/gi, '\n\n')
          .replace(/<\s*\/?li[^>]*>/gi, (m) =>
            m.startsWith('</') ? '\n' : '  '
          )
          .replace(
            /<\s*\/?(strong|em|b|i|u|span|div|h\d|section|article|blockquote)[^>]*>/gi,
            ''
          )
          .replace(/<[^>]+>/g, '');
        // Decode a few common entities
        text = text
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");
        // Normalize whitespace
        return text
          .replace(/[\t\r ]+/g, ' ')
          .replace(/\s*\n\s*\n\s*/g, '\n\n')
          .trim();
      };

      const wordCount = (text) => {
        if (!text) return 0;
        return String(text).trim().split(/\s+/).filter(Boolean).length;
      };

      const genericExpansion = {
        stronger:
          'Proponents argue that the most persuasive way to evaluate this issue is to look at measurable outcomes and well-documented mechanisms. ' +
          'When a policy or practice produces consistent benefits across different settings, it suggests the core claim is not just theoretically appealing but operationally sound. ' +
          'For instance, researchers often highlight trends that persist after controlling for confounding factors, which strengthens causal interpretations. ' +
          'In everyday terms, the effects show up in places that are not cherry-picked: large districts as well as small ones, urban areas as well as rural communities, and across diverse populations. ' +
          'This breadth matters because it demonstrates that the argument is not reliant on a single exceptional case.\n\n' +
          'Equally important is the internal logic of the claim. ' +
          'A clear explanation of how inputs become outcomes—backed by credible studies or official records—builds reader confidence. ' +
          'When authors acknowledge limitations, address counterarguments directly, and explain why competing explanations fall short, they further enhance credibility. ' +
          'The tone remains measured and analytic rather than speculative, and the supporting evidence goes beyond anecdotes to include trends, comparative data, or longitudinal results.\n\n' +
          'Finally, strong arguments connect evidence to implications. ' +
          'They clarify not only that an approach works, but why it is better than realistic alternatives in terms of access, cost, fairness, or long-term sustainability. ' +
          'This emphasis on mechanisms and trade-offs gives readers a trustworthy basis for judgment, which is precisely what the GED essay task asks evaluators to reward.',
        weaker:
          'Skeptics raise concerns that deserve attention, though their claims often rely on broad generalizations, isolated examples, or predictions that are not fully supported by data. ' +
          'These reservations can be useful for surfacing potential risks or unintended consequences, but they are most convincing when paired with specific evidence and a clear explanation of scope. ' +
          'Without those anchors, caution can drift into conjecture, making it hard to weigh against concrete results reported elsewhere.\n\n' +
          'In addition, weaker arguments sometimes mistake correlation for causation or rely on assumptions about human behavior that are plausible but untested. ' +
          'They may emphasize exceptional cases—outliers—while downplaying broader trends that move in the opposite direction. ' +
          'A careful reader should ask whether the same claim holds across settings and whether competing explanations have been seriously considered. ' +
          'When key terms are left undefined or evidence is largely anecdotal, the overall force of the case diminishes.\n\n' +
          'That said, raising practical constraints and ethical considerations is valuable. ' +
          'Well-framed questions about cost, feasibility, or equity can guide better policy design. ' +
          'But to match the rigor expected on the GED, these concerns need to be grounded in verifiable facts and organized into a clear line of reasoning rather than relying primarily on intuition or personal experience.',
      };

      const expandIfShort = (topic, title, baseText) => {
        const MIN = 450;
        const MAX = 650;
        let text = stripHtmlToPlain(baseText);
        let wc = wordCount(text);
        if (wc >= MIN && wc <= MAX) return text;
        const stance = /stronger/i.test(title)
          ? 'stronger'
          : /weaker/i.test(title)
          ? 'weaker'
          : 'stronger';
        // Append one or more generic expansions until within range
        const add = genericExpansion[stance];
        while (wc < MIN) {
          text += '\n\n' + add;
          wc = wordCount(text);
          if (wc > MAX) break;
        }
        // If we overshoot significantly, we can trim last sentence
        if (wc > MAX) {
          const sentences = text.split(/(?<=[.!?])\s+/);
          while (wordCount(sentences.join(' ')) > MAX && sentences.length > 3) {
            sentences.pop();
          }
          text = sentences.join(' ');
        }
        return text;
      };

      const passagesData = [
        // --- All 10 Topics Updated with Highlighted & Imbalanced Evidence ---
        {
          topic: 'Should the Voting Age Be Lowered to 16?',
          passage1: {
            title: 'Dr. Alisa Klein, Sociologist (Stronger Argument)',
            content: stripHtmlToPlain(
              "<p>Lowering the voting age to 16 is a crucial step for a healthier democracy. At 16, many young people are employed, pay taxes on their earnings, and are subject to the laws of the land. It is a fundamental principle of democracy'no taxation without representation'—'that they should have a voice in shaping policies that directly affect them, from education funding to climate change.</p><p><span class='good-evidence'>Furthermore, research shows that voting is a habit; a 2020 study from Tufts University found that cities that allow 16-year-olds to vote in local elections see significantly higher youth turnout in subsequent national elections.</span> Enabling citizens to vote at an age when they are still living in a stable home and learning about civics in school increases the likelihood they will become lifelong voters.</p><p><span class='good-evidence'>As political scientist Dr. Mark Franklin notes, 'The earlier a citizen casts their first ballot, the more likely they are to become a consistent participant in our democracy.'</span> It is a vital step toward strengthening civic engagement for generations to come.</p>"
            ),
          },
          passage2: {
            title: 'Marcus heavyweight, Political Analyst (Weaker Argument)',
            content: stripHtmlToPlain(
              "<p>While the idealism behind lowering the voting age is appealing, the practical realities suggest it would be a mistake. The adolescent brain is still undergoing significant development, particularly in areas related to long-term decision-making and impulse control. The political landscape is complex, requiring a level of experience and cognitive maturity that most 16-year-olds have not yet developed.</p><p>We risk trivializing the profound responsibility of voting by extending it to a demographic that is, by and large, not yet equipped to handle it. <span class='bad-evidence'>I remember being 16, and my friends and I were far more concerned with prom dates and getting a driver's license than with monetary policy.</span> Their priorities are simply not aligned with the serious nature of national governance.</p><p>The current age of 18 strikes a reasonable balance, marking a clear transition into legal adulthood and the full spectrum of responsibilities that come with it. To change this is to experiment with the foundation of our republic for no clear gain.</p>"
            ),
          },
        },
        {
          topic:
            'Is Universal Basic Income (UBI) a Viable Solution to Poverty?',
          passage1: {
            title: 'Anna Coote, Economist (Stronger Argument)',
            content:
              "<p>A Universal Basic Income, while well-intentioned, is an inefficient and expensive tool for poverty reduction. It fails to target the individuals who need support the most, instead distributing funds to everyone, which ultimately dilutes its impact. <span class='good-evidence'>According to a 2018 analysis by the Center on Budget and Policy Priorities, replacing existing targeted aid programs with a modest UBI would actually increase the poverty rate.</span></p><p>Existing programs like SNAP (food stamps) and Medicaid are designed to address the specific, varied hardships of poverty. UBI risks dismantling this targeted support system. Furthermore, there is a significant danger of UBI entrenching low pay and precarious work, as it could effectively subsidize employers who pay poverty wages, normalizing economic instability rather than solving its root causes.</p><p><span class='good-evidence'>This is a logical consequence, as a guaranteed income floor reduces the pressure on companies to offer competitive wages and benefits to attract workers for undesirable jobs.</span> The focus should be on strengthening our existing, targeted safety nets and promoting policies that lead to higher wages and better job quality.</p>",
          },
          passage2: {
            title: 'Robert Doar, Poverty Studies Fellow (Weaker Argument)',
            content:
              "<p>The concept of a guaranteed income has merit as a powerful tool to provide stability in an unstable world. A regular, predictable income floor would act as a safety net, allowing individuals to invest in new skills or find more suitable jobs without the constant threat of destitution. It provides the foundation upon which individuals can build more productive and independent lives.</p><p><span class='bad-evidence'>Everyone knows that if you're not worried about next month's rent, you can make better long-term decisions.</span> It just makes sense that this freedom would lead to a boom in entrepreneurship and creativity, unleashing human potential that is currently suppressed by economic anxiety.</p><p>The goal is not to give up on work, but to provide a cushion that allows for smarter work. Opponents worry that people will stop working, but this is a cynical view of human nature. Most people want to contribute and improve their lives; UBI simply gives them the security to do so more effectively.</p>",
          },
        },
        {
          topic: 'Should Governments Aggressively Subsidize Renewable Energy?',
          passage1: {
            title: 'Energy Policy Journal (Stronger Argument)',
            content:
              "<p>Government subsidies are essential for accelerating the transition to renewable energy sources like solar and wind. The primary benefit is environmental; renewables produce little to no greenhouse gases, combating climate change and improving public health. <span class='good-evidence'>A report from the National Renewable Energy Laboratory (NREL) concluded that achieving 80% renewable electricity by 2050 could reduce economy-wide carbon emissions by 81%.</span></p><p>While the initial costs can be high, subsidies make them accessible and competitive with established fossil fuels, which have themselves been subsidized for decades. This investment creates jobs in a growing clean energy sector and fosters energy independence. <span class='good-evidence'>According to the U.S. Bureau of Labor Statistics, solar panel installer and wind turbine technician are two of the fastest-growing jobs in the country.</span></p><p>In the long run, supporting renewables is not just an environmental decision, but a strategic economic one. It leads to stable, predictable energy costs free from the price volatility of the global oil market. It is a necessary investment in a cleaner and more economically secure future.</p>",
          },
          passage2: {
            title: 'Institute for Energy Research (Weaker Argument)',
            content:
              "<p>While renewable energy is a worthy goal, aggressive government subsidies create significant problems. The high upfront cost of technologies like solar panels and wind turbines are passed on to taxpayers, creating a massive financial burden. These systems also have geographic limitations'they are only effective in specific locations with consistent sun or wind.</p><p>Furthermore, energy production is often intermittent, requiring expensive battery storage solutions that are not yet advanced enough. <span class='bad-evidence'>Think of the poor families who will have their lights go out on a calm, cloudy day.</span> It's simply not reliable enough to power a modern economy without fossil fuel backup, which defeats the entire purpose.</p><p>A market-driven approach, rather than government intervention, would allow the most efficient and affordable technologies to emerge naturally. We shouldn't let the government pick winners and losers with taxpayer money; we should let innovation and competition determine the best path forward.</p>",
          },
        },
        {
          topic:
            'Does Social Media Do More Harm Than Good for Teen Mental Health?',
          passage1: {
            title: "U.S. Surgeon General's Advisory (Stronger Argument)",
            content:
              "<p>There is a profound risk of harm to the mental health and well-being of children and adolescents from social media. <span class='good-evidence'>A 2022 study published in the Journal of the American Medical Association (JAMA) showed that teens who spend more than three hours a day on social media face double the risk of experiencing depression and anxiety symptoms.</span> These platforms are often designed to maximize user engagement, which can disrupt sleep and expose young users to harmful content.</p><p>The adolescent brain is highly susceptible to social comparison and peer pressure. Social media platforms can create a distorted reality, where teens are constantly comparing their own lives to the curated, idealized posts of others. <span class='good-evidence'>This has been directly linked to lower self-esteem and poor body image, particularly among adolescent girls, as noted by the American Psychological Association.</span></p><p><span class='bad-evidence'>It feels like every teenager I meet is more anxious than the last, and they are all glued to their phones.</span> The connection is obvious. We need better safeguards, and parents need to be more aware of the very real dangers these platforms pose to their children's developing minds.</p>",
          },
          passage2: {
            title: 'Youth Mental Health Council (Weaker Argument)',
            content:
              "<p>While risks exist, social media often provides essential benefits for teens. Many report that it helps them feel more accepted and connected to their friends. These online connections are especially crucial for marginalized youth, such as LGBTQ teens, who may find a supportive community online that is unavailable to them in their immediate environment.</p><p><span class='bad-evidence'>My own daughter was struggling to make friends, but she found a wonderful group of people online who share her passion for art. It completely turned her life around.</span> This just goes to show how vital these connections can be for a young person's happiness.</p><p>Social media platforms can foster a sense of belonging and provide a place for creative self-expression. They also help teens access information and resources about mental health, which can promote help-seeking behaviors. To focus only on the negatives is to ignore the powerful role social media can play in supporting youth well-being.</p>",
          },
        },
        {
          topic:
            'Is a Four-Year College Degree the Best Path to a Successful Career?',
          passage1: {
            title:
              'Dr. Anya Sharma, Education Policy Analyst (Weaker Argument)',
            content:
              "<p>A four-year college degree remains the most reliable pathway to long-term career success and economic mobility. While vocational training has its place, a bachelor's degree provides something far more valuable: a foundation in critical thinking, complex problem-solving, and communication. These are not just job skills; they are life skills that allow graduates to adapt to a rapidly changing economy.</p><p>Statistically, the evidence is overwhelming. College graduates consistently earn significantly more over their lifetimes than those without a degree. <span class='bad-evidence'>Everyone knows someone who got a degree and became successful.</span> This 'degree premium' is not just about the first job out of college, but about the upward trajectory that a broad-based education enables.</p><p>Furthermore, the college experience itself fosters personal growth and exposure to diverse perspectives. To suggest that a narrow, job-specific training program is equivalent is to ignore the fundamental purpose of higher education: to create not just workers, but informed and adaptable citizens.</p>",
          },
          passage2: {
            title: 'Marco Diaz, Skilled Trades Advocate (Stronger Argument)',
            content:
              "<p>For too long, we have pushed a 'college-for-all' mentality that has left millions of young people with crippling student loan debt. It is time we recognize that vocational training offers a more direct and affordable path to a stable career. <span class='good-evidence'>According to the Bureau of Labor Statistics, many skilled trades, such as electricians and plumbers, have median salaries comparable to or exceeding those of many bachelor's degree holders, without the upfront cost.</span></p><p>Vocational programs provide hands-on skills that are immediately applicable. Students often enter paid apprenticeship programs where they earn while they learn. This model avoids the massive debt associated with a four-year degree and allows young adults to begin building financial independence years earlier. <span class='good-evidence'>A 2021 report from the National Center for Education Statistics highlights that the average student loan debt for a bachelor's degree is over $30,000.</span></p><p>We must stop stigmatizing skilled labor. By promoting vocational education as a respectable and intelligent alternative, we can build a stronger, more practical workforce and offer a debt-free path to the middle class for millions of Americans.</p>",
          },
        },
        {
          topic: 'Should Schools Ban the Use of Smartphones in the Classroom?',
          passage1: {
            title: 'Principal Thompson, Educator (Stronger Argument)',
            content:
              "<p>Smartphones have become the single greatest source of distraction in the modern classroom, and it is time for a clear and consistent ban. These devices fragment student attention and disrupt the learning environment. The primary purpose of a classroom is education, and anything that fundamentally undermines that purpose must be removed.</p><p><span class='good-evidence'>A comprehensive study by the London School of Economics analyzed schools in four English cities and found that after phones were banned, student test scores improved by an average of 6.4%.</span> This effect was even more pronounced for lower-achieving students, suggesting a ban can help close the achievement gap. This data provides clear, empirical evidence that removing phones leads to better academic outcomes.</p><p>A firm ban sends an unambiguous message about our academic priorities and helps students develop the crucial skill of focused, sustained attention, a skill that is eroding in the digital age.</p>",
          },
          passage2: {
            title: 'Dr. Helen Tran, Digital Learning Expert (Weaker Argument)',
            content:
              "<p>Banning smartphones in schools is a Luddite response to a modern reality. Instead of banning these powerful tools, we should be teaching students how to use them responsibly. Smartphones provide instant access to a world of information, acting as research tools and collaborative devices. To deny students access is to cripple them with an outdated model of education.</p><p><span class='bad-evidence'>The people who want to ban phones are just old-fashioned and afraid of technology.</span> This argument ignores the fact that the modern workplace requires digital literacy. Schools have a responsibility to prepare students for the world they will actually live and work in, and that world is saturated with technology.</p><p>The challenge is not the device, but the pedagogy. We need to train teachers to leverage these tools for learning, not run from them. <span class='bad-evidence'>It's just common sense that you can't prepare kids for the future by taking away future tools.</span></p>",
          },
        },
        {
          topic:
            'Should Fast-Food Restaurants Be Required to Display Calorie Counts?',
          passage1: {
            title: 'Center for Public Health (Stronger Argument)',
            content:
              "<p>In the fight against the obesity epidemic, information is one of our most powerful weapons. Requiring fast-food chains to prominently display calorie counts on their menus is a common-sense policy that empowers consumers to make healthier choices. It is a simple matter of transparency; people have a right to know what is in the food they are purchasing.</p><p><span class='good-evidence'>A study published in the American Journal of Public Health found that after New York City implemented menu labeling, consumers at fast-food chains purchased, on average, 25 fewer calories per transaction.</span> While this may seem small, these small changes, compounded over time, can lead to significant positive health outcomes for the population.</p><p>This isn't about banning choices; it's about enabling informed ones. Just as the FDA requires nutrition labels on packaged foods, providing clear, accessible information at the point of purchase is a minimal and effective step to help people take better control of their own health.</p>",
          },
          passage2: {
            title: 'Restaurant Industry Association (Weaker Argument)',
            content:
              "<p>Mandatory calorie labeling for fast-food restaurants is a costly and ineffective government overreach. The financial burden of analyzing every menu item and reprinting menu boards is significant, especially for smaller franchise owners. This is a classic case of the government imposing a one-size-fits-all solution that hurts small businesses.</p><p><span class='bad-evidence'>I know plenty of people who see a high calorie count and just order the item anyway, so it clearly doesn't work.</span> People go to fast-food restaurants for convenience and taste, not for a health experience. Consumer behavior is driven by many factors, and a single number on a menu board is unlikely to be the deciding one.</p><p>Ultimately, this policy is based on the flawed assumption that a lack of information is the cause of poor dietary choices. <span class='bad-evidence'>Everyone already knows that a burger and fries isn't a health food.</span> The focus should be on personal responsibility, not on more government regulations.</p>",
          },
        },
        {
          topic:
            'Should National Parks Implement a Lottery System to Manage Overcrowding?',
          passage1: {
            title: 'Dr. David Chen, Conservation Biologist (Stronger Argument)',
            content:
              "<p>Our most beloved national parks are being loved to death. The surge in visitor numbers has led to traffic gridlock, trail erosion, and damage to fragile ecosystems. To protect these natural treasures for future generations, we must implement more restrictive access systems, and a lottery is the fairest way to do so.</p><p><span class='good-evidence'>The National Park Service's own data shows that in parks like Zion and Arches, unmanaged visitor numbers have led to significant soil compaction and vegetation loss along popular trails.</span> A lottery system would directly mitigate this environmental damage by controlling the number of people on the trails each day. This is a necessary management tool to fulfill the Park Service's core mission of preservation.</p><p><span class='good-evidence'>Furthermore, a 2021 study on visitor experiences in Yosemite concluded that overcrowding significantly diminishes the quality of the visitor experience, leading to lower satisfaction.</span> A reservation system provides certainty and allows visitors to plan their trips effectively, ensuring a better experience for those who do attend.</p>",
          },
          passage2: {
            title: 'Brenda Walsh, Public Lands Advocate (Weaker Argument)',
            content:
              "<p>National parks were created to be accessible to all Americans, not just the lucky few who win a lottery. Implementing a reservation system fundamentally changes the nature of these public lands from a shared national birthright into an exclusive commodity. It creates a barrier that will disproportionately affect families who cannot plan their vacations months in advance.</p><p><span class='bad-evidence'>My family has always taken spontaneous trips to the parks, and a lottery system would destroy that tradition.</span> This would harm the local gateway communities whose economies depend on a steady flow of tourists, not just a pre-determined, limited number.</p><p><span class='bad-evidence'>Turning our parks into an exclusive club is a betrayal of the very idea of 'America's Best Idea.'</span> We must focus on smart solutions like more shuttle buses, rather than simply locking people out.</p>",
          },
        },
        {
          topic:
            'Should Standardized Test Scores Be a Primary Factor in College Admissions?',
          passage1: {
            title:
              'Dr. Richard Evans, Admissions Counselor (Stronger Argument)',
            content:
              "<p>Relying heavily on standardized test scores like the SAT and ACT in college admissions is an outdated and inequitable practice. These tests are not a pure measure of merit; they are strongly correlated with a student's family income and access to resources. Students from affluent families can afford expensive test prep courses, giving them an unfair advantage.</p><p><span class='good-evidence'>A landmark study of over 123,000 students at 33 test-optional colleges found that there was virtually no difference in college GPA or graduation rates between students who submitted scores and those who did not.</span> This proves that high school grades are a far better predictor of college success. A student's performance over four years is a much more holistic and accurate measure of their ability and work ethic.</p><p>By moving to a test-optional system, colleges can assess applicants more equitably, considering their academic record, essays, and activities. This allows them to build a more diverse and capable student body, rewarding long-term diligence over the ability to perform well on a single, high-stakes exam.</p>",
          },
          passage2: {
            title:
              'Dr. Susan Gerson, Education Measurement Specialist (Weaker Argument)',
            content:
              "<p>While standardized tests are not perfect, they are the most objective and reliable tool we have for comparing students from tens of thousands of different high schools. Grade inflation is rampant, and an 'A' in one school is not equivalent to an 'A' in another. The SAT and ACT provide a common yardstick to measure core academic skills.</p><p><span class='bad-evidence'>Without tests, admissions would just become a subjective guessing game about who wrote the prettiest essay.</span> It would be chaos. These tests can help identify promising students from less well-known high schools whose grades might otherwise be overlooked. To ignore test scores is to ignore a valuable piece of data.</p><p>Rather than eliminating these tests, we should focus on ensuring all students have access to free, high-quality test preparation resources. Fixing the access problem is a better solution than throwing away our only objective measurement tool.</p>",
          },
        },
        {
          topic:
            'Is a Remote Work Model More Beneficial Than a Traditional In-Office Model?',
          passage1: {
            title: 'Jennifer Lee, Chief Financial Officer (Stronger Argument)',
            content:
              "<p>The shift to remote work has proven to be a resounding success, offering significant financial and operational benefits. By reducing the need for large, expensive office spaces, companies can drastically cut overhead costs related to rent and utilities. These savings can be reinvested into growth and innovation.</p><p>From a human resources perspective, the benefits are even more compelling. Offering remote work allows a company to recruit from a global talent pool, not just a single city. <span class='good-evidence'>A 2021 survey by Stanford University of 16,000 workers over 9 months found that remote work not only increased employee satisfaction but also boosted productivity by 13%.</span> Happier, more autonomous employees are more productive employees.</p><p>Furthermore, remote work improves employee retention and well-being. <span class='good-evidence'>According to a Gallup poll, a majority of remote-capable employees who are forced to return to the office full-time are actively seeking new employment.</span> A flexible, remote-first model is not just a trend; it is the future of a more efficient and humane way of doing business.</p>",
          },
          passage2: {
            title: 'Robert Chen, Management Consultant (Weaker Argument)',
            content:
              "<p>The alleged benefits of remote work are largely illusory and ignore the long-term damage it does to a company's culture. The office is a hub for spontaneous collaboration and mentorship that simply cannot be replicated over scheduled Zoom calls. The informal 'water cooler' conversations that spark new ideas are lost forever.</p><p><span class='bad-evidence'>It's just common sense that people are going to be less productive at home with all the distractions of laundry and television.</span> While some companies may see short-term gains in routine tasks, the long-term cost in terms of lost innovation and team cohesion will be immense.</p><p>Junior employees, in particular, suffer from a lack of mentorship and observational learning that is critical for their career development. A vibrant, in-person workplace remains the most powerful engine for collaborative success, and we are losing that in favor of a lonely, disconnected workforce.</p>",
          },
        },
        // --- New 10 Topics Added ---
        {
          topic:
            'Should Homework in High School Be Limited to One Hour per Night?',
          passage1: {
            title: 'National Education Association Brief (Stronger Argument)',
            content:
              "<p>Limiting homework to one hour per night in high school supports learning without sacrificing student well-being. Excessive homework contributes to sleep deprivation, stress, and disengagement, which undermines academic performance. <span class='good-evidence'>A 2013 Stanford study found that students in high-achieving communities who spend more than two hours on homework experience higher stress, physical health problems, and lack of balance in their lives.</span></p><p>Quality matters more than quantity. Structured practice aligned to clear objectives within a one-hour cap encourages focus and allows time for reading, extracurriculars, and family responsibilities. <span class='good-evidence'>Sleep researchers consistently tie adequate sleep to improved memory consolidation and problem-solving, critical for learning.</span> A sensible cap promotes equitable access for students who work part-time or care for siblings after school.</p>",
          },
          passage2: {
            title: 'Traditionalist Teachers Coalition (Weaker Argument)',
            content:
              "<p>Hard work builds character, and limiting homework to one hour risks coddling students. Advanced courses require more time; students should simply manage their schedules better. <span class='bad-evidence'>When I was in school, we had loads of homework and we turned out fine.</span> Limiting homework sends the wrong message about academic rigor.</p><p>Real life doesn't come with time caps. Students must learn to push through fatigue to meet expectations. A universal limit is unnecessary and undermines teacher autonomy.</p>",
          },
        },
        {
          topic: 'Should Public Transit Be Free in Major Cities?',
          passage1: {
            title: 'Urban Institute Transportation Report (Stronger Argument)',
            content:
              "<p>Fare-free transit increases ridership, reduces traffic congestion, and improves air quality while expanding access to jobs and education. <span class='good-evidence'>Kansas City, Missouri, saw ridership increases and improved job access after adopting zero-fare buses, according to city reports.</span> Eliminating fares speeds boarding and simplifies operations.</p><p>Funding can be rebalanced through congestion fees and dedicated sales taxes. <span class='good-evidence'>A 2022 APTA analysis estimates that every dollar invested in transit yields multiple dollars in local economic returns.</span> Free transit is a public good that benefits the entire urban ecosystem.</p>",
          },
          passage2: {
            title: 'Taxpayers for Efficient Spending (Weaker Argument)',
            content:
              "<p>Making transit free sounds nice but invites waste. People will ride for fun, not necessity, crowding buses and trains. <span class='bad-evidence'>If you don't charge, people will just circle the city all day.</span> Fares create accountability, and removing them burdens taxpayers.</p><p>Rather than free rides, cities should focus on enforcing fares and cutting costs. Those who need help can already get discounted passes.</p>",
          },
        },
        {
          topic: 'Should Schools Adopt Year-Round Academic Calendars?',
          passage1: {
            title: 'Education Policy Consortium (Stronger Argument)',
            content:
              "<p>Year-round calendars with shorter, more frequent breaks reduce summer learning loss and allow targeted intersession support. <span class='good-evidence'>Meta-analyses show that low-income students lose significant math and reading skills over long summers; staggered breaks mitigate this regression.</span> Distributed rest periods also lower burnout for students and staff.</p><p>Facilities are used more efficiently, easing overcrowding with multi-track options. Families gain predictable schedules for remediation and enrichment.</p>",
          },
          passage2: {
            title: 'Community Traditions Alliance (Weaker Argument)',
            content:
              "<p>Summer is a cherished American tradition for camps, vacations, and teen jobs. <span class='bad-evidence'>Kids need a long summer to be kids.</span> Year-round school disrupts tourism and family routines and complicates childcare for siblings on different tracks.</p><p>There's no need to change what has worked for decades; schools should improve teaching during the year instead.</p>",
          },
        },
        {
          topic: 'Should Cities Ban Single-Use Plastic Bags?',
          passage1: {
            title: 'Environmental Protection Network (Stronger Argument)',
            content:
              "<p>Plastic bag bans reduce litter, protect waterways and wildlife, and cut municipal cleanup costs. <span class='good-evidence'>California's statewide policy led to substantial declines in plastic bag litter along coastlines, according to the Coastal Commission.</span> Reusable and paper alternatives are viable for most purchases.</p><p>Pairing bans with education and exemptions for sanitation-sensitive items addresses edge cases while shifting consumer behavior toward sustainable habits.</p>",
          },
          passage2: {
            title: 'Retail Freedom Association (Weaker Argument)',
            content:
              "<p>Bans inconvenience shoppers and unfairly penalize small stores. <span class='bad-evidence'>People will just forget their bags and get angry at clerks.</span> Paper bags have environmental costs too, so bans are pointless. Let the market decide; customers who care can bring their own bags.</p>",
          },
        },
        {
          topic: 'Should Public Colleges Be Tuition-Free?',
          passage1: {
            title: 'Center for Higher Education Access (Stronger Argument)',
            content:
              "<p>Tuition-free public college expands opportunity and strengthens the economy by developing human capital. <span class='good-evidence'>Countries with low or no tuition maintain strong completion rates when funding is paired with student support services.</span> Removing tuition reduces debt burdens, allowing graduates to start businesses and buy homes sooner.</p><p>Targeted taxes and income-driven contributions from high earners can sustainably finance the system while preserving quality.</p>",
          },
          passage2: {
            title: 'Fiscal Prudence Council (Weaker Argument)',
            content:
              "<p>Nothing is truly free—'taxpayers foot the bill. <span class='bad-evidence'>If college is free, everyone will enroll and campuses will be chaotic.</span> Subsidizing degrees people may not use wastes money. Aid should remain merit-based and limited, not universal.</p>",
          },
        },
        {
          topic: 'Should Voting Be Compulsory in National Elections?',
          passage1: {
            title: 'Democratic Participation Lab (Stronger Argument)',
            content:
              "<p>Compulsory voting increases turnout, reduces polarization, and ensures elected officials reflect the whole populace. <span class='good-evidence'>Australia's compulsory system yields turnout consistently above 90% and broad partisan moderation.</span> Modest fines or easy opt-outs protect civil liberties while establishing civic duty.</p>",
          },
          passage2: {
            title: 'Liberty First Foundation (Weaker Argument)',
            content:
              "<p>Forcing people to vote violates freedom. <span class='bad-evidence'>Making apathetic people vote just adds random noise.</span> Low-information ballots degrade democracy. Voluntary participation is a cornerstone of liberty, not something to be coerced.</p>",
          },
        },
        {
          topic: 'Should School Cafeterias Adopt Plant-Forward Menus?',
          passage1: {
            title: 'Public Health Nutrition Society (Stronger Argument)',
            content:
              "<p>Plant-forward menus improve student health and reduce the carbon footprint of school meals. <span class='good-evidence'>Dietary guidelines and numerous cohort studies link higher plant intake to reduced chronic disease risk.</span> Properly planned menus meet protein needs and expose students to diverse foods.</p><p>Districts can phase in options and provide culinary training so meals remain appealing and culturally responsive.</p>",
          },
          passage2: {
            title: 'Parents for Traditional Lunches (Weaker Argument)',
            content:
              "<p>Kids won't eat vegetables, so plant-forward menus will just lead to waste. <span class='bad-evidence'>My son only eats chicken nuggets and would starve otherwise.</span> Meat is necessary at every meal; changing menus meddles with family preferences.</p>",
          },
        },
        {
          topic:
            'Should Cities Implement Congestion Pricing for Downtown Driving?',
          passage1: {
            title: 'Urban Mobility Council (Stronger Argument)',
            content:
              "<p>Congestion pricing reduces traffic, speeds up buses, and improves air quality while funding transit improvements. <span class='good-evidence'>London and Stockholm saw sustained traffic reductions and travel-time reliability after implementation.</span> Equity issues can be addressed with exemptions and rebates for low-income drivers.</p>",
          },
          passage2: {
            title: "Drivers' Rights Alliance (Weaker Argument)",
            content:
              "<p>Congestion fees are just another tax on working people. <span class='bad-evidence'>It's a money grab by city hall.</span> Drivers already pay registration and gas taxes; pricing zones punish commuters who have no choice but to drive.</p>",
          },
        },
        {
          topic: 'Should Public Schools Enforce Strict Student Dress Codes?',
          passage1: {
            title: 'School Climate Research Network (Stronger Argument)',
            content:
              "<p>Strict dress codes can disproportionately target girls and marginalized students and distract from learning. <span class='good-evidence'>Studies on school climate link punitive dress enforcement to increased suspensions without academic gains.</span> Clear, gender-neutral guidelines focused on safety are preferable to subjective rules.</p>",
          },
          passage2: {
            title: 'Order and Discipline Association (Weaker Argument)',
            content:
              "<p>Uniformity promotes respect. <span class='bad-evidence'>If students look sharp, they'll act right.</span> Strict rules eliminate distractions and teach professionalism, so detailed dress codes should be enforced.</p>",
          },
        },
        {
          topic:
            'Should High Schools Require a Financial Literacy Course for Graduation?',
          passage1: {
            title: 'Council on Economic Education (Stronger Argument)',
            content:
              "<p>Requiring a stand-alone financial literacy course equips students with essential life skills in budgeting, credit, and investing. <span class='good-evidence'>States that implemented requirements report improved credit outcomes among young adults and reduced delinquency.</span> A dedicated course prevents the topic from being sidelined in other classes.</p>",
          },
          passage2: {
            title: 'Curriculum Streamlining Committee (Weaker Argument)',
            content:
              "<p>The schedule is already crowded. <span class='bad-evidence'>Students can just learn money skills from their parents.</span> Requiring another course adds bureaucracy; optional workshops are sufficient.</p>",
          },
        },
      ];

      useEffect(() => {
        if (timerActive) {
          intervalRef.current = setInterval(() => {
            setTimer((prev) => {
              const next = prev - 1;
              if (next <= 0 && !overtimeNotified) {
                // One-time notification when time runs out
                setOvertimeNotified(true);
              }
              return next;
            });
          }, 1000);
        }
        return () => clearInterval(intervalRef.current);
      }, [timerActive, overtimeNotified]);

      useEffect(() => {
        if (activeTab !== 'structure') {
          setShowPromptOverlay(false);
        }
      }, [activeTab]);

      useEffect(() => {
        setOverlayView('prompt');
      }, [selectedTopic]);

      const [lockedTopic, setLockedTopic] = useState(null);

      const startPractice = () => {
        if (lockedTopic === null) {
          setLockedTopic(selectedTopic);
        }
        setTimerActive(true);
      };

      const resetPractice = () => {
        setTimerActive(false);
        clearInterval(intervalRef.current);
        setTimer(45 * 60);
        setEssayText({
          intro: '',
          body1: '',
          body2: '',
          body3: '',
          conclusion: '',
        });
        setScoreResult(null);
        setOvertimeNotified(false);
      };

      const finishPractice = () => {
        setTimerActive(false);
        clearInterval(intervalRef.current);
        setShowModal(true);
      };

      const handleTextChange = (e) => {
        const { name, value } = e.target;
        setEssayText((prev) => ({ ...prev, [name]: value }));
      };

      const handleGetScore = async () => {
        setIsScoring(true);
        setScoreResult(null);
        const fullEssay =
          essayMode === 'freeform'
            ? (essayText.freeform || '').trim()
            : Object.values({
                intro: essayText.intro,
                body1: essayText.body1,
                body2: essayText.body2,
                body3: essayText.body3,
                conclusion: essayText.conclusion,
              })
                .join('\n\n')
                .trim();
        const completionCount =
          essayMode === 'freeform'
            ? (essayText.freeform || '').trim()
              ? 5
              : 0
            : Object.values({
                intro: essayText.intro,
                body1: essayText.body1,
                body2: essayText.body2,
                body3: essayText.body3,
                conclusion: essayText.conclusion,
              }).filter((text) => String(text).trim() !== '').length;

        try {
          const token =
            (typeof localStorage !== 'undefined' &&
              localStorage.getItem('appToken')) ||
            null;
          const response = await fetch(`${API_BASE_URL}/api/essay/score`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({
              essayText: fullEssay,
              completion: `${completionCount}/5`,
            }),
          });
          if (!response.ok)
            throw new Error('Failed to get score from the server.');

          const result = await response.json();
          let parsedScore = null;
          if (
            result &&
            result.trait1 &&
            result.trait2 &&
            result.trait3 &&
            typeof result.overallScore === 'number'
          ) {
            parsedScore = result;
          } else if (
            result &&
            result.candidates &&
            result.candidates[0]?.content?.parts?.[0]?.text
          ) {
            let jsonText = result.candidates[0].content.parts[0].text;
            jsonText = jsonText
              .replace(/```json/g, '')
              .replace(/```/g, '')
              .trim();
            parsedScore = JSON.parse(jsonText);
          } else {
            throw new Error('Unexpected essay score format');
          }
          setScoreResult(parsedScore);
          // Fetch challenge suggestions after essay scoring
          try {
            const sugRes = await fetch(
              `${API_BASE_URL}/api/challenges/suggestions`,
              {
                headers: {
                  ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
              }
            );
            if (sugRes.ok) {
              const data = await sugRes.json();
              console.log('[Essay Builder] Suggestions:', data);
            }
          } catch (_) {}
        } catch (error) {
          console.error('Error scoring essay:', error);
          setScoreResult({
            error: "Sorry, we couldn't score your essay at this time.",
          });
        } finally {
          setIsScoring(false);
        }
      };

      const formatTime = (seconds) => {
        // Show +MM:SS for overtime (seconds < 0), MM:SS otherwise
        const sign = seconds < 0 ? '+' : '';
        const abs = Math.abs(seconds);
        const mm = Math.floor(abs / 60);
        const ss = (abs % 60).toString().padStart(2, '0');
        return `${sign}${mm}:${ss}`;
      };
      const selectedPassage = passagesData[selectedTopic];
      const promptSummary = selectedPassage
        ? `After reading both passages about "${selectedPassage.topic}", write an essay in which you explain which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.`
        : '';
      const overlayButtons = [
        { id: 'prompt', label: 'Essay Prompt', title: 'GED® RLA Essay Prompt' },
        {
          id: 'passage1',
          label: 'Passage A',
          title: selectedPassage?.passage1?.title || 'Passage A',
        },
        {
          id: 'passage2',
          label: 'Passage B',
          title: selectedPassage?.passage2?.title || 'Passage B',
        },
      ];

      const renderOverlayBody = () => {
        if (!selectedPassage) return null;
        switch (overlayView) {
          case 'passage1': {
            const text = expandIfShort(
              selectedPassage.topic,
              selectedPassage.passage1.title,
              selectedPassage.passage1.content
            );
            return (
              <div
                className="prose passage-section max-w-none text-sm text-slate-700"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {text}
              </div>
            );
          }
          case 'passage2': {
            const text = expandIfShort(
              selectedPassage.topic,
              selectedPassage.passage2.title,
              selectedPassage.passage2.content
            );
            return (
              <div
                className="prose passage-section max-w-none text-sm text-slate-700"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {text}
              </div>
            );
          }
          default:
            return (
              <div className="space-y-3 text-sm leading-relaxed text-slate-700">
                <p>{promptSummary}</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Clearly state which author presents the stronger argument on
                    the topic.
                  </li>
                  <li>
                    Use at least two specific pieces of evidence from the
                    passages to support your evaluation.
                  </li>
                  <li>
                    Explain why the evidence you cite strengthens one argument
                    or weakens the other.
                  </li>
                  <li>
                    Organize your ideas with an introduction, body paragraphs,
                    and a conclusion.
                  </li>
                </ul>
              </div>
            );
        }
      };

      const renderTabs = () => (
        <nav className="flex flex-wrap justify-center border-b-2 border-gray-300 mb-8">
          {['passages', 'structure', 'strengths', 'weaknesses'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-button text-lg font-semibold py-4 px-6 text-gray-600 capitalize ${
                activeTab === tab ? 'active' : ''
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </nav>
      );

      const renderContent = () => {
        switch (activeTab) {
          case 'passages':
            return (
              <div>
                <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
                  <label
                    htmlFor="topic-selector"
                    className="block text-lg font-semibold text-gray-800 mb-2"
                  >
                    Select an Article Topic:
                  </label>
                  <select
                    id="topic-selector"
                    className="w-full p-2 border border-gray-300 rounded-md text-lg"
                    value={selectedTopic}
                    disabled={lockedTopic !== null}
                    onChange={(e) => {
                      const nextIdx = Number(e.target.value);
                      if (lockedTopic !== null && nextIdx !== lockedTopic) {
                        const ok = window.confirm(
                          'Switch topics? This will unlock and reset your current selection.'
                        );
                        if (!ok) return;
                        setLockedTopic(nextIdx);
                      }
                      setSelectedTopic(nextIdx);
                    }}
                  >
                    {passagesData.map((p, i) => (
                      <option key={i} value={i}>
                        {p.topic}
                      </option>
                    ))}
                  </select>
                  {lockedTopic === null ? (
                    <button
                      type="button"
                      onClick={() => {
                        setLockedTopic(selectedTopic);
                        setActiveTab('structure');
                        setTimerActive(true);
                      }}
                      className="mt-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-white font-semibold hover:bg-blue-700"
                    >
                      Start/Lock this topic
                    </button>
                  ) : (
                    <p className="mt-3 text-sm text-green-700">
                      Topic locked. You can start typing and open the prompt
                      overlay.
                    </p>
                  )}
                </div>
                <div className="relative">
                  {lockedTopic === null && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-lg">
                      <div className="text-center p-6 bg-white border rounded-lg shadow">
                        <p className="mb-3 font-semibold">
                          Press "Start/Lock this topic" to reveal passages and
                          begin.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setLockedTopic(selectedTopic);
                            setActiveTab('structure');
                            setTimerActive(true);
                          }}
                          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-white font-semibold hover:bg-blue-700"
                        >
                          Start/Lock this topic
                        </button>
                      </div>
                    </div>
                  )}
                  <div
                    className="grid lg:grid-cols-2 gap-8"
                    style={{
                      filter: lockedTopic === null ? 'blur(4px)' : 'none',
                    }}
                  >
                    <article className="bg-white p-6 rounded-lg shadow-md essay-argument-column">
                      <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2 question-stem">
                        {selectedPassage.passage1.title}
                      </h2>
                      <div style={{ whiteSpace: 'pre-wrap' }}>
                        {expandIfShort(
                          selectedPassage.topic,
                          selectedPassage.passage1.title,
                          selectedPassage.passage1.content
                        )}
                      </div>
                    </article>
                    <article className="bg-white p-6 rounded-lg shadow-md essay-argument-column">
                      <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2 question-stem">
                        {selectedPassage.passage2.title}
                      </h2>
                      <div style={{ whiteSpace: 'pre-wrap' }}>
                        {expandIfShort(
                          selectedPassage.topic,
                          selectedPassage.passage2.title,
                          selectedPassage.passage2.content
                        )}
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            );
          case 'structure':
            return (
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-inner mb-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-bold text-gray-800">
                      Typing Practice Mode
                    </h3>
                    <p className="text-sm text-gray-600">
                      Click Start to begin a 45-minute timed session.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <button
                      onClick={startPractice}
                      disabled={timerActive}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
                    >
                      Start
                    </button>
                    <div
                      className={`text-3xl font-mono font-bold ${
                        timer <= 0
                          ? 'text-red-600'
                          : timer < 300
                          ? 'text-red-500'
                          : 'text-gray-800'
                      }`}
                    >
                      {formatTime(timer)}
                    </div>
                    <button
                      onClick={finishPractice}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                      Finish & Review
                    </button>
                    <button
                      onClick={resetPractice}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                  {overtimeNotified && (
                    <div className="mt-3 w-full sm:w-auto bg-amber-50 border border-amber-200 text-amber-800 text-sm px-3 py-2 rounded">
                      Time is up, but you can still finish your work. The timer
                      now shows overtime.
                    </div>
                  )}
                </div>

                <div className="bg-white p-3 rounded-lg shadow-sm border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-sm text-slate-700 font-semibold">
                    Editor Mode
                  </div>
                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                    aria-label="Editor mode toggle"
                  >
                    <button
                      type="button"
                      onClick={() => setEssayMode('guided')}
                      className={`px-4 py-2 text-sm font-medium border ${
                        essayMode === 'guided'
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      Guided
                    </button>
                    <button
                      type="button"
                      onClick={() => setEssayMode('freeform')}
                      className={`px-4 py-2 text-sm font-medium border -ml-px ${
                        essayMode === 'freeform'
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      Freeform
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900">
                      Need the prompt while you type?
                    </h4>
                    <p className="text-sm text-blue-800">
                      Open the overlay to view the essay prompt or either
                      passage without leaving the practice screen.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPromptOverlay((prev) => !prev)}
                    className="self-start md:self-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition-colors"
                  >
                    {showPromptOverlay
                      ? 'Hide Prompt Overlay'
                      : 'Show Prompt Overlay'}
                  </button>
                </div>

                {/* Editor sections: guided vs freeform */}
                {essayMode === 'guided' ? (
                  <>
                    <div className="practice-section bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">
                        Introduction Paragraph
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        The two passages present conflicting views on the topic
                        of{' '}
                        <span className="text-blue-600 font-semibold">
                          [topic of both articles]
                        </span>
                        . In the first passage,{' '}
                        <span className="text-blue-600 font-semibold">
                          [Author 1's Last Name]
                        </span>{' '}
                        argues that{' '}
                        <span className="text-blue-600 font-semibold">
                          [explain Author 1's main claim]
                        </span>
                        . Conversely, in the second passage,{' '}
                        <span className="text-blue-600 font-semibold">
                          [Author 2's Last Name]
                        </span>{' '}
                        claims that{' '}
                        <span className="text-blue-600 font-semibold">
                          [explain Author 2's main claim]
                        </span>
                        . After analyzing both arguments, it is clear that{' '}
                        <span className="text-blue-600 font-semibold">
                          [Author's Last Name]
                        </span>{' '}
                        presents the more convincing case by effectively using{' '}
                        <span className="text-blue-600 font-semibold">
                          [list key evidence types]
                        </span>
                        .
                      </p>
                      <textarea
                        name="intro"
                        onPaste={(e) => e.preventDefault()}
                        value={essayText.intro}
                        onChange={handleTextChange}
                        disabled={!timerActive}
                        className="practice-textarea w-full h-48 p-3 border-gray-300 rounded-md"
                        placeholder="Type your introduction here..."
                        onKeyDown={(e) => {
                          if (e.key === 'Tab') {
                            e.preventDefault();
                            const t = e.target;
                            const s = t.selectionStart;
                            const epos = t.selectionEnd;
                            const v = t.value;
                            const ins = '    ';
                            const next = v.slice(0, s) + ins + v.slice(epos);
                            handleTextChange({
                              target: { name: 'intro', value: next },
                            });
                            setTimeout(() => {
                              try {
                                t.selectionStart = t.selectionEnd =
                                  s + ins.length;
                              } catch {}
                            }, 0);
                          }
                        }}
                      ></textarea>
                    </div>
                    <div className="practice-section bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">
                        Body Paragraph #1: Analyze Strong Evidence
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        First,{' '}
                        <span className="text-blue-600 font-semibold">
                          [Stronger Author's Last Name]
                        </span>{' '}
                        effectively builds their argument by using{' '}
                        <span className="text-blue-600 font-semibold">
                          [type of evidence]
                        </span>
                        . The author states,{' '}
                        <span className="text-blue-600 font-semibold">
                          ["quote or paraphrase"]
                        </span>
                        . This evidence is highly convincing because{' '}
                        <span className="text-blue-600 font-semibold">
                          [explain why]
                        </span>
                        .
                      </p>
                      <textarea
                        name="body1"
                        onPaste={(e) => e.preventDefault()}
                        value={essayText.body1}
                        onChange={handleTextChange}
                        disabled={!timerActive}
                        className="practice-textarea w-full h-32 p-3 border-gray-300 rounded-md"
                        placeholder="Analyze the stronger argument's first piece of evidence..."
                        onKeyDown={(e) => {
                          if (e.key === 'Tab') {
                            e.preventDefault();
                            const t = e.target;
                            const s = t.selectionStart;
                            const epos = t.selectionEnd;
                            const v = t.value;
                            const ins = '    ';
                            const next = v.slice(0, s) + ins + v.slice(epos);
                            handleTextChange({
                              target: { name: 'body1', value: next },
                            });
                            setTimeout(() => {
                              try {
                                t.selectionStart = t.selectionEnd =
                                  s + ins.length;
                              } catch {}
                            }, 0);
                          }
                        }}
                      ></textarea>
                    </div>
                    <div className="practice-section bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">
                        Body Paragraph #2: Analyze More Strong Evidence
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Furthermore,{' '}
                        <span className="text-blue-600 font-semibold">
                          [Stronger Author's Last Name]
                        </span>{' '}
                        strengthens their position with{' '}
                        <span className="text-blue-600 font-semibold">
                          [another type of evidence]
                        </span>
                        . For example, the author points out that{' '}
                        <span className="text-blue-600 font-semibold">
                          ["quote or paraphrase"]
                        </span>
                        . This is a logical and persuasive point because{' '}
                        <span className="text-blue-600 font-semibold">
                          [explain why]
                        </span>
                        .
                      </p>
                      <textarea
                        name="body2"
                        onPaste={(e) => e.preventDefault()}
                        value={essayText.body2}
                        onChange={handleTextChange}
                        disabled={!timerActive}
                        className="practice-textarea w-full h-32 p-3 border-gray-300 rounded-md"
                        placeholder="Analyze the stronger argument's second piece of evidence..."
                        onKeyDown={(e) => {
                          if (e.key === 'Tab') {
                            e.preventDefault();
                            const t = e.target;
                            const s = t.selectionStart;
                            const epos = t.selectionEnd;
                            const v = t.value;
                            const ins = '    ';
                            const next = v.slice(0, s) + ins + v.slice(epos);
                            handleTextChange({
                              target: { name: 'body2', value: next },
                            });
                            setTimeout(() => {
                              try {
                                t.selectionStart = t.selectionEnd =
                                  s + ins.length;
                              } catch {}
                            }, 0);
                          }
                        }}
                      ></textarea>
                    </div>
                    <div className="practice-section bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">
                        Body Paragraph #3: Analyze the Weaker Argument
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        In contrast, the argument presented by{' '}
                        <span className="text-blue-600 font-semibold">
                          [Weaker Author's Last Name]
                        </span>{' '}
                        is not as well-supported. A key weakness is the author's
                        reliance on{' '}
                        <span className="text-blue-600 font-semibold">
                          [identify a weakness]
                        </span>
                        . For instance, the author claims that{' '}
                        <span className="text-blue-600 font-semibold">
                          ["quote or paraphrase"]
                        </span>
                        . This argument is unconvincing because{' '}
                        <span className="text-blue-600 font-semibold">
                          [explain why]
                        </span>
                        .
                      </p>
                      <textarea
                        name="body3"
                        onPaste={(e) => e.preventDefault()}
                        value={essayText.body3}
                        onChange={handleTextChange}
                        disabled={!timerActive}
                        className="practice-textarea w-full h-32 p-3 border-gray-300 rounded-md"
                        placeholder="Analyze a weakness in the opposing argument..."
                        onKeyDown={(e) => {
                          if (e.key === 'Tab') {
                            e.preventDefault();
                            const t = e.target;
                            const s = t.selectionStart;
                            const epos = t.selectionEnd;
                            const v = t.value;
                            const ins = '    ';
                            const next = v.slice(0, s) + ins + v.slice(epos);
                            handleTextChange({
                              target: { name: 'body3', value: next },
                            });
                            setTimeout(() => {
                              try {
                                t.selectionStart = t.selectionEnd =
                                  s + ins.length;
                              } catch {}
                            }, 0);
                          }
                        }}
                      ></textarea>
                    </div>
                    <div className="practice-section bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">
                        Conclusion Paragraph
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        In conclusion, while both authors address the topic,{' '}
                        <span className="text-blue-600 font-semibold">
                          [Stronger Author's Last Name]
                        </span>{' '}
                        presents a more compelling argument. By skillfully using{' '}
                        <span className="text-blue-600 font-semibold">
                          [restate evidence types]
                        </span>
                        , the author builds a case that is more persuasive than
                        the weakly supported claims by{' '}
                        <span className="text-blue-600 font-semibold">
                          [Weaker Author's Last Name]
                        </span>
                        .
                      </p>
                      <textarea
                        name="conclusion"
                        onPaste={(e) => e.preventDefault()}
                        value={essayText.conclusion}
                        onChange={handleTextChange}
                        disabled={!timerActive}
                        className="practice-textarea w-full h-40 p-3 border-gray-300 rounded-md"
                        placeholder="Write your conclusion..."
                        onKeyDown={(e) => {
                          if (e.key === 'Tab') {
                            e.preventDefault();
                            const t = e.target;
                            const s = t.selectionStart;
                            const epos = t.selectionEnd;
                            const v = t.value;
                            const ins = '    ';
                            const next = v.slice(0, s) + ins + v.slice(epos);
                            handleTextChange({
                              target: { name: 'conclusion', value: next },
                            });
                            setTimeout(() => {
                              try {
                                t.selectionStart = t.selectionEnd =
                                  s + ins.length;
                              } catch {}
                            }, 0);
                          }
                        }}
                      ></textarea>
                    </div>
                  </>
                ) : (
                  <div className="practice-section bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">
                      Freeform Essay
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Write your essay in one place. You can still open the
                      prompt overlay to reference the passages.
                    </p>
                    <textarea
                      name="freeform"
                      onPaste={(e) => e.preventDefault()}
                      value={essayText.freeform || ''}
                      onChange={handleTextChange}
                      disabled={!timerActive}
                      className="practice-textarea w-full h-[32rem] p-3 border-gray-300 rounded-md"
                      placeholder="Type your essay here..."
                      onKeyDown={(e) => {
                        if (e.key === 'Tab') {
                          e.preventDefault();
                          const t = e.target;
                          const s = t.selectionStart;
                          const epos = t.selectionEnd;
                          const v = t.value;
                          const ins = '    ';
                          const next = v.slice(0, s) + ins + v.slice(epos);
                          handleTextChange({
                            target: { name: 'freeform', value: next },
                          });
                          setTimeout(() => {
                            try {
                              t.selectionStart = t.selectionEnd =
                                s + ins.length;
                            } catch {}
                          }, 0);
                        }
                      }}
                    ></textarea>
                  </div>
                )}
              </div>
            );
          case 'strengths':
            return (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="text-xl font-bold mb-2 text-green-800">
                    Statistical Data
                  </h4>
                  <p className="text-gray-700">
                    Using numbers, percentages, or data from credible sources
                    (e.g., studies, reports). This provides objective proof for
                    a claim.
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="text-xl font-bold mb-2 text-green-800">
                    Expert Testimony
                  </h4>
                  <p className="text-gray-700">
                    Quoting a recognized expert or authority in a relevant
                    field. This adds credibility to the argument.
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="text-xl font-bold mb-2 text-green-800">
                    Logical Reasoning
                  </h4>
                  <p className="text-gray-700">
                    Connecting ideas in a clear, cause-and-effect manner that
                    shows the author has thought through their position.
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="text-xl font-bold mb-2 text-green-800">
                    Historical Precedent
                  </h4>
                  <p className="text-gray-700">
                    Using a past event to support a claim about a present or
                    future situation. This shows a pattern of results.
                  </p>
                </div>
              </div>
            );
          case 'weaknesses':
            return (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg bg-red-50 border border-red-200">
                  <h4 className="text-xl font-bold mb-2 text-red-800">
                    Unsupported Claims
                  </h4>
                  <p className="text-gray-700">
                    Making a statement of fact without providing any evidence to
                    back it up. It's an opinion disguised as a fact.
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-red-50 border border-red-200">
                  <h4 className="text-xl font-bold mb-2 text-red-800">
                    Overgeneralization
                  </h4>
                  <p className="text-gray-700">
                    Drawing a broad conclusion from a very small or
                    unrepresentative sample of evidence.
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-red-50 border border-red-200">
                  <h4 className="text-xl font-bold mb-2 text-red-800">
                    Anecdotal Evidence
                  </h4>
                  <p className="text-gray-700">
                    Using a personal story or a single, isolated example as
                    proof for a major claim, instead of broader data.
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-red-50 border border-red-200">
                  <h4 className="text-xl font-bold mb-2 text-red-800">
                    Emotional Appeal
                  </h4>
                  <p className="text-gray-700">
                    Trying to persuade the reader by appealing to their feelings
                    (fear, pity, anger) instead of using logic and facts.
                  </p>
                </div>
              </div>
            );
          default:
            return null;
        }
      };

      const renderModalContent = () => {
        const fullEssay =
          essayMode === 'freeform'
            ? (essayText.freeform || '').trim()
            : Object.values({
                intro: essayText.intro,
                body1: essayText.body1,
                body2: essayText.body2,
                body3: essayText.body3,
                conclusion: essayText.conclusion,
              })
                .join('\n\n')
                .trim();
        return (
          <>
            <div className="p-8 prose max-w-none">
              {fullEssay ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtmlContent(
                      fullEssay.replace(/\n/g, '<br/>'),
                      {
                        normalizeSpacing: true,
                      }
                    ),
                  }}
                />
              ) : (
                <p>
                  <em>You did not write anything in the practice area.</em>
                </p>
              )}
            </div>
            <div className="p-6 border-t bg-gray-50 space-y-4">
              <button
                onClick={handleGetScore}
                disabled={isScoring || !fullEssay}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScoring ? 'Scoring...' : 'Get AI Score & Feedback'}
              </button>
              {scoreResult && (
                <div className="mt-4 p-4 bg-indigo-50 rounded-lg text-left">
                  {scoreResult.error ? (
                    <p className="text-red-600">{scoreResult.error}</p>
                  ) : (
                    <div>
                      <h4 className="text-xl font-bold text-indigo-800">
                        AI Feedback
                      </h4>
                      <p className="mt-2">
                        <strong>Overall Score:</strong>{' '}
                        {scoreResult.overallScore}/6
                      </p>
                      <p className="mt-1">
                        <strong>Feedback:</strong> {scoreResult.overallFeedback}
                      </p>
                      <details className="mt-2">
                        <summary className="font-semibold cursor-pointer">
                          View Trait-by-Trait Breakdown
                        </summary>
                        <div className="mt-2 pl-4 border-l-2 border-indigo-200 space-y-2">
                          <p
                            className={`${
                              scoreResult.trait1.score === 2
                                ? 'text-green-700 font-medium'
                                : scoreResult.trait1.score === 1
                                ? 'text-yellow-700 font-medium'
                                : 'text-red-700 font-medium'
                            }`}
                          >
                            <strong>Trait 1 (Analysis):</strong> Score{' '}
                            {scoreResult.trait1.score}/2.{' '}
                            {scoreResult.trait1.feedback}
                          </p>
                          <p
                            className={`${
                              scoreResult.trait2.score === 2
                                ? 'text-green-700 font-medium'
                                : scoreResult.trait2.score === 1
                                ? 'text-yellow-700 font-medium'
                                : 'text-red-700 font-medium'
                            }`}
                          >
                            <strong>Trait 2 (Evidence):</strong> Score{' '}
                            {scoreResult.trait2.score}/2.{' '}
                            {scoreResult.trait2.feedback}
                          </p>
                          <p
                            className={`${
                              scoreResult.trait3.score === 2
                                ? 'text-green-700 font-medium'
                                : scoreResult.trait3.score === 1
                                ? 'text-yellow-700 font-medium'
                                : 'text-red-700 font-medium'
                            }`}
                          >
                            <strong>Trait 3 (Clarity):</strong> Score{' '}
                            {scoreResult.trait3.score}/2.{' '}
                            {scoreResult.trait3.feedback}
                          </p>
                        </div>
                      </details>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        );
      };

      return (
        <div
          className="fade-in essay-practice-shell"
          data-subject="Reasoning Through Language Arts (RLA)"
        >
          <header className="flex justify-between items-center pb-4 mb-4 border-b">
            <button
              onClick={onExit}
              className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600 font-semibold"
            >
              <ArrowLeftIcon /> Back
            </button>
            <h2 className="text-xl font-bold text-center subject-accent-heading flex items-center gap-2">
              <PencilIcon className="h-5 w-5" />
              Interactive Essay Guide
            </h2>
            <div></div>
          </header>

          {renderTabs()}
          <main>{renderContent()}</main>

          {activeTab === 'structure' && showPromptOverlay && (
            <div className="fixed bottom-4 right-4 w-full max-w-xl sm:w-[28rem] md:w-[32rem] bg-white border border-slate-200 rounded-xl shadow-2xl z-40">
              <div className="flex items-start justify-between gap-3 px-4 py-3 border-b">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Prompt Reference Overlay
                  </h3>
                  <p className="text-xs text-slate-500">
                    Switch views to revisit the essay prompt or source passages
                    while you write.
                  </p>
                </div>
                <button
                  onClick={() => setShowPromptOverlay(false)}
                  className="text-slate-500 hover:text-slate-800"
                  aria-label="Close prompt overlay"
                >
                  &times;
                </button>
              </div>
              <div className="px-4 py-3 border-b bg-slate-50">
                <div className="flex flex-wrap gap-2">
                  {overlayButtons.map(({ id, label, title }) => (
                    <button
                      key={id}
                      onClick={() => setOverlayView(id)}
                      title={title}
                      className={`px-3 py-1.5 text-sm font-semibold rounded-full border transition-colors ${
                        overlayView === id
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="px-4 py-4 max-h-[60vh] overflow-y-auto">
                {renderOverlayBody()}
              </div>
            </div>
          )}

          {showModal && (
            <div
              className="fixed inset-0 w-full h-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--modal-overlay)' }}
            >
              <div className="bg-white rounded-lg shadow-2xl w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
                  <h2 className="text-2xl font-bold">Your Completed Essay</h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setScoreResult(null);
                    }}
                    className="text-gray-500 hover:text-gray-800 text-3xl"
                  >
                    &times;
                  </button>
                </div>
                {renderModalContent()}
              </div>
            </div>
          )}
        </div>
      );
    }

    function AIQuizGenerator({
      subject,
      onQuizGenerated,
      onExit,
      setIsLoading,
      setLoadingMessage,
    }) {
      const [selectedTopic, setSelectedTopic] = useState('');
      const [error, setError] = useState(null);

      // Canonical-only list for Smith-a-Quiz dropdown
      const availableTopics = React.useMemo(() => {
        const dropVariantish = (name) => {
          if (!name) return false;
          const t = String(name).toLowerCase();
          return /quiz\b|\bset\b|version\b|form\s*[a-z]\b|practice\b/.test(t)
            ? false
            : true;
        };
        const dedupeCI = (arr) => {
          const seen = new Set();
          const out = [];
          arr.forEach((s) => {
            const key = String(s || '')
              .trim()
              .toLowerCase();
            if (!key || seen.has(key)) return;
            seen.add(key);
            out.push(s);
          });
          return out;
        };
        try {
          if (
            typeof window !== 'undefined' &&
            typeof window.getSmithAQuizTopics === 'function'
          ) {
            const list = window.getSmithAQuizTopics(subject) || [];
            return dedupeCI(list.filter(dropVariantish));
          }
        } catch {}
        return [];
      }, [subject]);

      const handleGenerate = async () => {
        if (!selectedTopic) {
          setError('Please select a topic first.');
          return;
        }
        const subjectParam = resolveSubjectParam(subject);
        if (!subjectParam) {
          setError('Sorry, this subject is not supported yet.');
          return;
        }
        setLoadingMessage('Please give us a moment to smith this for you');
        setIsLoading(true);
        setError(null);

        try {
          const questions = await generateTopicQuiz(
            subjectParam,
            selectedTopic
          );

          if (!questions.length) {
            throw new Error('The quiz service returned an empty quiz.');
          }

          const generatedQuiz = {
            subject,
            topic: selectedTopic,
            id: `ai_${Date.now()}`,
            title: `${subject} Quiz: ${selectedTopic}`,
            questions,
          };

          onQuizGenerated(generatedQuiz);
        } catch (err) {
          console.error('Error generating quiz:', err);
          setError(`Sorry, something went wrong. ${err.message}`);
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <div className="fade-in text-center">
          <header className="flex justify-between items-center pb-4 mb-4 border-b">
            <button
              onClick={onExit}
              className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600 font-semibold"
            >
              <ArrowLeftIcon /> Back
            </button>
            <h2 className="text-xl font-bold text-center text-slate-800">
              Smith a Quiz
            </h2>
            <div></div>
          </header>
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-slate-800">
              Create a New Quiz
            </h3>
            <p className="text-slate-500 mt-2 mb-6">
              Select a topic from {subject} to generate a unique 15-question
              practice exam.
            </p>

            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-3 border border-sky-300 rounded-md mb-4 text-lg"
            >
              <option value="">-- Select a Topic --</option>
              {availableTopics.map((topic, idx) => (
                <option key={`${topic}-${idx}`} value={topic}>
                  {topic}
                </option>
              ))}
            </select>

            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full px-8 py-4 bg-sky-600 text-white font-bold rounded-lg shadow-md hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Generating...' : 'Generate Quiz'}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      );
    }

    function GeometryPracticeTool({ onExit }) {
      const roundToTwo = (value) => Math.round(value * 100) / 100;
      const formatNumber = (value) => {
        const rounded = roundToTwo(value);
        return Number.isInteger(rounded) ? rounded : rounded.toFixed(2);
      };

      const SHAPE_LIBRARY = {
        rectangle: {
          questions: [
            {
              type: 'area',
              getPrompt: (shapeLabel) =>
                `What is the area of the ${shapeLabel}?`,
              getAnswer: (dims) => dims.w * dims.h,
            },
            {
              type: 'perimeter',
              getPrompt: (shapeLabel) =>
                `What is the perimeter of the ${shapeLabel}?`,
              getAnswer: (dims) => 2 * (dims.w + dims.h),
            },
            {
              type: 'missing_height',
              getPrompt: (shapeLabel, dims) =>
                `The ${shapeLabel} has an area of ${formatNumber(
                  dims.w * dims.h
                )} and a width of ${formatNumber(
                  dims.w
                )}. What is the missing height?`,
              getAnswer: (dims) => dims.h,
              getContext: () => ({ hiddenLabels: ['h'] }),
            },
          ],
          generateDims: () => ({
            w: Math.floor(Math.random() * 20) + 5,
            h: Math.floor(Math.random() * 20) + 5,
          }),
          render: ({ w, h }, context = {}) => {
            const hidden = context.hiddenLabels || [];
            return (
              <g>
                <rect
                  x="50"
                  y="75"
                  width={w * 8}
                  height={h * 8}
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                />
                <text
                  x={50 + (w * 8) / 2}
                  y="65"
                  textAnchor="middle"
                  fill="currentColor"
                >
                  {hidden.includes('w') ? '?' : w}
                </text>
                <text
                  x={40}
                  y={75 + (h * 8) / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fill="currentColor"
                >
                  {hidden.includes('h') ? '?' : h}
                </text>
              </g>
            );
          },
        },
        triangle: {
          questions: [
            {
              type: 'area',
              getPrompt: (shapeLabel) =>
                `What is the area of the ${shapeLabel}?`,
              getAnswer: (dims) => 0.5 * dims.b * dims.h,
            },
            {
              type: 'missing_height',
              getPrompt: (shapeLabel, dims) =>
                `The ${shapeLabel} has an area of ${formatNumber(
                  0.5 * dims.b * dims.h
                )} and a base of ${formatNumber(
                  dims.b
                )}. What is the missing height?`,
              getAnswer: (dims) => dims.h,
              getContext: () => ({ hiddenLabels: ['h'] }),
            },
          ],
          generateDims: () => ({
            b: Math.floor(Math.random() * 20) + 8,
            h: Math.floor(Math.random() * 15) + 6,
          }),
          render: ({ b, h }, context = {}) => {
            const hidden = context.hiddenLabels || [];
            return (
              <g>
                <polygon
                  points={`50,${50 + h * 8} ${50 + b * 8},${50 + h * 8} ${
                    50 + b * 8
                  },50`}
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                />
                <text
                  x={50 + (b * 8) / 2}
                  y={65 + h * 8}
                  textAnchor="middle"
                  fill="currentColor"
                >
                  {hidden.includes('b') ? '?' : b}
                </text>
                <text
                  x={60 + b * 8}
                  y={50 + (h * 8) / 2}
                  dominantBaseline="middle"
                  fill="currentColor"
                >
                  {hidden.includes('h') ? '?' : h}
                </text>
              </g>
            );
          },
        },
        circle: {
          questions: [
            {
              type: 'area',
              getPrompt: (shapeLabel) =>
                `What is the area of the ${shapeLabel}?`,
              getAnswer: (dims) => Math.PI * dims.r * dims.r,
            },
            {
              type: 'circumference',
              getPrompt: (shapeLabel) =>
                `What is the circumference of the ${shapeLabel}?`,
              getAnswer: (dims) => 2 * Math.PI * dims.r,
            },
            {
              type: 'missing_radius',
              getPrompt: (shapeLabel, dims) =>
                `The ${shapeLabel} has an area of ${formatNumber(
                  Math.PI * dims.r * dims.r
                )}. What is the radius?`,
              getAnswer: (dims) => dims.r,
              getContext: () => ({ hiddenLabels: ['r'] }),
            },
          ],
          generateDims: () => ({ r: Math.floor(Math.random() * 10) + 5 }),
          render: ({ r }, context = {}) => {
            const hidden = context.hiddenLabels || [];
            return (
              <g>
                <circle
                  cx="150"
                  cy="150"
                  r={r * 8}
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                />
                <line
                  x1="150"
                  y1="150"
                  x2={150 + r * 8}
                  y2="150"
                  stroke="currentColor"
                  strokeDasharray="4"
                />
                <text x={150 + (r * 8) / 2} y="140" fill="currentColor">
                  {hidden.includes('r') ? '?' : r}
                </text>
              </g>
            );
          },
        },
        rectangular_prism: {
          questions: [
            {
              type: 'volume',
              getPrompt: (shapeLabel) =>
                `What is the volume of the ${shapeLabel}?`,
              getAnswer: (dims) => dims.l * dims.w * dims.h,
            },
            {
              type: 'missing_height',
              getPrompt: (shapeLabel, dims) =>
                `The ${shapeLabel} has a volume of ${formatNumber(
                  dims.l * dims.w * dims.h
                )}, a length of ${formatNumber(
                  dims.l
                )}, and a width of ${formatNumber(
                  dims.w
                )}. What is the missing height?`,
              getAnswer: (dims) => dims.h,
              getContext: () => ({ hiddenLabels: ['h'] }),
            },
          ],
          generateDims: () => ({
            l: Math.floor(Math.random() * 15) + 8,
            w: Math.floor(Math.random() * 10) + 5,
            h: Math.floor(Math.random() * 10) + 5,
          }),
          render: ({ l, w, h }, context = {}) => {
            const hidden = context.hiddenLabels || [];
            return (
              <g stroke="currentColor" fill="none" strokeWidth="2">
                <rect x={50} y={50} width={l * 8} height={h * 8} />
                <path d={`M ${50},${50} l ${w * 3},-${w * 3}`} />
                <path d={`M ${50 + l * 8},${50} l ${w * 3},-${w * 3}`} />
                <path
                  d={`M ${50 + l * 8},${50 + h * 8} l ${w * 3},-${w * 3}`}
                />
                <path
                  d={`M ${50 + w * 3},${50 - w * 3} H ${50 + w * 3 + l * 8}`}
                />
                <path
                  d={`M ${50 + w * 3 + l * 8},${50 - w * 3} V ${
                    50 - w * 3 + h * 8
                  }`}
                />
                <text
                  x={50 + (l * 8) / 2}
                  y={60 + h * 8}
                  textAnchor="middle"
                  fill="currentColor"
                >
                  {hidden.includes('l') ? '?' : l}
                </text>
                <text
                  x={55 + l * 8 + (w * 3) / 2}
                  y={40 - w * 3}
                  textAnchor="middle"
                  fill="currentColor"
                >
                  {hidden.includes('w') ? '?' : w}
                </text>
                <text
                  x={40}
                  y={50 + (h * 8) / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fill="currentColor"
                >
                  {hidden.includes('h') ? '?' : h}
                </text>
              </g>
            );
          },
        },
        cylinder: {
          questions: [
            {
              type: 'volume',
              getPrompt: (shapeLabel) =>
                `What is the volume of the ${shapeLabel}?`,
              getAnswer: (dims) => Math.PI * dims.r * dims.r * dims.h,
            },
            {
              type: 'surface_area',
              getPrompt: (shapeLabel) =>
                `What is the surface area of the ${shapeLabel}?`,
              getAnswer: (dims) => 2 * Math.PI * dims.r * (dims.r + dims.h),
            },
            {
              type: 'missing_height',
              getPrompt: (shapeLabel, dims) =>
                `The ${shapeLabel} has a volume of ${formatNumber(
                  Math.PI * dims.r * dims.r * dims.h
                )} and a radius of ${formatNumber(
                  dims.r
                )}. What is the missing height?`,
              getAnswer: (dims) => dims.h,
              getContext: () => ({ hiddenLabels: ['h'] }),
            },
          ],
          generateDims: () => ({
            r: Math.floor(Math.random() * 8) + 3,
            h: Math.floor(Math.random() * 15) + 5,
          }),
          render: ({ r, h }, context = {}) => {
            const hidden = context.hiddenLabels || [];
            return (
              <g stroke="currentColor" fill="none" strokeWidth="2">
                <ellipse cx="150" cy="50" rx={r * 5} ry={r * 2} />
                <path
                  d={`M ${150 - r * 5},50 L ${150 - r * 5},${50 + h * 5}`}
                />
                <path
                  d={`M ${150 + r * 5},50 L ${150 + r * 5},${50 + h * 5}`}
                />
                <ellipse cx="150" cy={50 + h * 5} rx={r * 5} ry={r * 2} />
                <text
                  x="140"
                  y={50 + (h * 5) / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fill="currentColor"
                >
                  {hidden.includes('h') ? '?' : h}
                </text>
                <text
                  x={150}
                  y={65 + h * 5}
                  textAnchor="middle"
                  fill="currentColor"
                >
                  {hidden.includes('r') ? '?' : r}
                </text>
              </g>
            );
          },
        },
        cone: {
          questions: [
            {
              type: 'volume',
              getPrompt: (shapeLabel) =>
                `What is the volume of the ${shapeLabel}?`,
              getAnswer: (dims) => (Math.PI * dims.r * dims.r * dims.h) / 3,
            },
            {
              type: 'surface_area',
              getPrompt: (shapeLabel) =>
                `What is the surface area of the ${shapeLabel}?`,
              getAnswer: (dims) =>
                Math.PI *
                dims.r *
                (dims.r + Math.sqrt(dims.h * dims.h + dims.r * dims.r)),
            },
            {
              type: 'missing_height',
              getPrompt: (shapeLabel, dims) =>
                `The ${shapeLabel} has a volume of ${formatNumber(
                  (Math.PI * dims.r * dims.r * dims.h) / 3
                )} and a radius of ${formatNumber(
                  dims.r
                )}. What is the missing height?`,
              getAnswer: (dims) => dims.h,
              getContext: () => ({ hiddenLabels: ['h'] }),
            },
          ],
          generateDims: () => ({
            r: Math.floor(Math.random() * 6) + 3,
            h: Math.floor(Math.random() * 12) + 5,
          }),
          render: ({ r, h }, context = {}) => {
            const hidden = context.hiddenLabels || [];
            const baseRadius = r * 6;
            const height = h * 6;
            const centerX = 150;
            const baseY = 200;
            return (
              <g stroke="currentColor" fill="none" strokeWidth="2">
                <ellipse
                  cx={centerX}
                  cy={baseY}
                  rx={baseRadius}
                  ry={baseRadius / 3}
                />
                <line
                  x1={centerX - baseRadius}
                  y1={baseY}
                  x2={centerX}
                  y2={baseY - height}
                />
                <line
                  x1={centerX + baseRadius}
                  y1={baseY}
                  x2={centerX}
                  y2={baseY - height}
                />
                <text
                  x={centerX - baseRadius - 10}
                  y={baseY - height / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fill="currentColor"
                >
                  {hidden.includes('h') ? '?' : h}
                </text>
                <text
                  x={centerX + baseRadius / 2}
                  y={baseY + 20}
                  textAnchor="middle"
                  fill="currentColor"
                >
                  {hidden.includes('r') ? '?' : r}
                </text>
              </g>
            );
          },
        },
        sphere: {
          questions: [
            {
              type: 'volume',
              getPrompt: (shapeLabel) =>
                `What is the volume of the ${shapeLabel}?`,
              getAnswer: (dims) => (4 / 3) * Math.PI * Math.pow(dims.r, 3),
            },
            {
              type: 'surface_area',
              getPrompt: (shapeLabel) =>
                `What is the surface area of the ${shapeLabel}?`,
              getAnswer: (dims) => 4 * Math.PI * dims.r * dims.r,
            },
            {
              type: 'missing_radius',
              getPrompt: (shapeLabel, dims) =>
                `The ${shapeLabel} has a volume of ${formatNumber(
                  (4 / 3) * Math.PI * Math.pow(dims.r, 3)
                )}. What is the radius?`,
              getAnswer: (dims) => dims.r,
              getContext: () => ({ hiddenLabels: ['r'] }),
            },
          ],
          generateDims: () => ({ r: Math.floor(Math.random() * 8) + 3 }),
          render: ({ r }, context = {}) => {
            const hidden = context.hiddenLabels || [];
            return (
              <g stroke="currentColor" fill="none" strokeWidth="2">
                <circle cx="150" cy="130" r={r * 8} />
                <ellipse
                  cx="150"
                  cy="130"
                  rx={r * 8}
                  ry={r * 3}
                  strokeDasharray="6"
                />
                <line
                  x1="150"
                  y1="130"
                  x2={150 + r * 8}
                  y2="130"
                  strokeDasharray="4"
                />
                <text x={150 + (r * 8) / 2} y="115" fill="currentColor">
                  {hidden.includes('r') ? '?' : r}
                </text>
              </g>
            );
          },
        },
        right_triangle: {
          questions: [
            {
              type: 'hypotenuse',
              getPrompt: (shapeLabel, dims) =>
                `The ${shapeLabel} has legs a = ${formatNumber(
                  dims.a
                )} and b = ${formatNumber(
                  dims.b
                )}. What is the length of the hypotenuse?`,
              getAnswer: (dims) => Math.sqrt(dims.a * dims.a + dims.b * dims.b),
            },
          ],
          generateDims: () => ({
            a: Math.floor(Math.random() * 10) + 4,
            b: Math.floor(Math.random() * 10) + 4,
          }),
          render: ({ a, b }, context = {}) => {
            const hidden = context.hiddenLabels || [];
            const scale = 10;
            const startX = 60;
            const startY = 200;
            const pointB = [startX + a * scale, startY];
            const pointC = [startX, startY - b * scale];
            return (
              <g stroke="currentColor" fill="none" strokeWidth="2">
                <polygon
                  points={`${startX},${startY} ${pointB[0]},${pointB[1]} ${pointC[0]},${pointC[1]}`}
                />
                <path
                  d={`M ${startX + 20},${startY} L ${startX + 20},${
                    startY - 20
                  } L ${startX},${startY - 20}`}
                  strokeWidth="2"
                />
                <text
                  x={startX + (a * scale) / 2}
                  y={startY + 20}
                  textAnchor="middle"
                  fill="currentColor"
                >
                  {hidden.includes('a') ? '?' : `a = ${a}`}
                </text>
                <text
                  x={startX - 20}
                  y={startY - (b * scale) / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fill="currentColor"
                >
                  {hidden.includes('b') ? '?' : `b = ${b}`}
                </text>
                <text
                  x={(startX + pointB[0]) / 2 + 10}
                  y={(startY + pointC[1]) / 2}
                  textAnchor="middle"
                  fill="currentColor"
                >
                  c
                </text>
              </g>
            );
          },
        },
      };

      const [currentProblem, setCurrentProblem] = useState(null);
      const [userAnswer, setUserAnswer] = useState('');
      const [feedback, setFeedback] = useState('');

      const generateProblem = (shape) => {
        const shapeData = SHAPE_LIBRARY[shape];
        if (!shapeData) return;

        const questionConfig =
          shapeData.questions[
            Math.floor(Math.random() * shapeData.questions.length)
          ];
        const dims = shapeData.generateDims();
        const shapeLabel = shape.replace('_', ' ');
        const context = questionConfig.getContext
          ? questionConfig.getContext(dims)
          : {};
        const correctAnswer = roundToTwo(questionConfig.getAnswer(dims));
        const prompt = questionConfig.getPrompt(shapeLabel, dims, context);

        setCurrentProblem({
          shape,
          dims,
          questionType: questionConfig.type,
          correctAnswer,
          renderer: shapeData.render,
          prompt,
          context,
        });
        setFeedback('');
        setUserAnswer('');
      };

      const checkAnswer = () => {
        const answer = parseFloat(userAnswer);
        if (isNaN(answer)) {
          setFeedback('Please enter a valid number.');
          return;
        }

        // Use compareAnswers for consistent unit stripping and tolerance handling
        const isCorrect = compareAnswers(
          currentProblem.correctAnswer.toString(),
          userAnswer,
          { subject: 'Math', questionType: 'numeric' }
        );

        if (isCorrect) {
          setFeedback('Correct! Great job!');
        } else {
          setFeedback(
            `Not quite. The correct answer is ${currentProblem.correctAnswer}.`
          );
        }
      };

      useEffect(() => {
        // Generate a problem when the component mounts
        generateProblem('rectangle');
      }, []);

      const getCurrentTheme = useCallback(() => {
        if (typeof document === 'undefined') {
          return 'light';
        }
        const root = document.documentElement;
        if (!root) {
          return 'light';
        }
        const explicit = root.getAttribute('data-theme');
        if (explicit === 'dark') return 'dark';
        if (explicit === 'light') return 'light';
        return root.classList.contains('dark') ? 'dark' : 'light';
      }, []);

      const [activeTheme, setActiveTheme] = useState(getCurrentTheme);

      useEffect(() => {
        if (
          typeof document === 'undefined' ||
          typeof MutationObserver === 'undefined'
        ) {
          return;
        }
        const root = document.documentElement;
        if (!root) {
          return;
        }
        const observer = new MutationObserver(() => {
          setActiveTheme(getCurrentTheme());
        });
        observer.observe(root, {
          attributes: true,
          attributeFilter: ['data-theme', 'class'],
        });
        return () => observer.disconnect();
      }, [getCurrentTheme]);

      const isDarkMode = activeTheme === 'dark';
      const surfaceColor = isDarkMode ? '#020617' : '#ffffff';
      const geometryPalette = isDarkMode
        ? { text: '#e2fdff' }
        : { text: '#0f172a' };

      const showExitButton = typeof onExit === 'function';

      return (
        <div
          className="fade-in space-y-6 bg-white text-black dark:bg-slate-900 dark:text-slate-100"
          style={{ backgroundColor: surfaceColor }}
        >
          <header className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-2 border-b border-slate-200 dark:border-slate-700">
            <div className="flex-none min-w-[140px]">
              {showExitButton && (
                <button
                  onClick={onExit}
                  className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                    isDarkMode
                      ? 'text-slate-200 hover:text-sky-300'
                      : 'text-slate-900 hover:text-sky-700'
                  }`}
                >
                  <ArrowLeftIcon /> Back
                </button>
              )}
            </div>
            <h2 className="text-2xl font-bold text-center flex-1">
              Geometry Practice Tool
            </h2>
            <div className="flex-none min-w-[140px]" aria-hidden="true"></div>
          </header>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
            <div
              className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[420px]"
              style={{ backgroundColor: surfaceColor }}
            >
              {currentProblem ? (
                <>
                  <svg
                    className="w-full max-w-2xl h-[360px] text-slate-900 dark:text-white bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-700"
                    style={{ backgroundColor: surfaceColor }}
                    viewBox="0 0 400 320"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {currentProblem.renderer(
                      currentProblem.dims,
                      currentProblem.context
                    )}
                  </svg>
                  <p
                    className="text-lg font-semibold mt-6 text-center max-w-2xl"
                    style={{ color: geometryPalette.text }}
                  >
                    {currentProblem.prompt}
                  </p>
                </>
              ) : (
                <p className="text-base">Select a shape to begin.</p>
              )}
            </div>
            <div
              className="space-y-5 bg-white text-black dark:bg-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm"
              style={{ backgroundColor: surfaceColor }}
            >
              <div>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: geometryPalette.text }}
                >
                  Shapes
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(SHAPE_LIBRARY).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => generateProblem(shape)}
                      className={`p-2 font-semibold rounded-md transition capitalize border ${
                        currentProblem?.shape === shape
                          ? 'bg-sky-600 text-white shadow border-transparent'
                          : isDarkMode
                          ? 'bg-slate-800 text-slate-100 hover:bg-slate-700 border-slate-600'
                          : 'bg-slate-700 text-white hover:bg-slate-600 border-slate-500'
                      }`}
                    >
                      {shape.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              {currentProblem && (
                <div className="space-y-3">
                  <label
                    htmlFor="answer"
                    className="font-semibold"
                    style={{ color: geometryPalette.text }}
                  >
                    Your Answer:
                  </label>
                  <input
                    type="number"
                    id="answer"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-950 text-black dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <button
                    onClick={checkAnswer}
                    className="w-full p-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
                  >
                    Check Answer
                  </button>
                  {feedback && (
                    <p
                      className={`mt-2 p-2 rounded-md text-center font-semibold ${
                        feedback.includes('Correct')
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-200'
                      }`}
                    >
                      {feedback}
                    </p>
                  )}
                  <button
                    onClick={() => generateProblem(currentProblem.shape)}
                    className="w-full p-2 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition"
                  >
                    Next Problem
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // (Removed) SmithGameOfLife React component in favor of embedding the authored HTML simulation

    function GraphingTool({ onExit }) {
      const boardRef = React.useRef(null);
      const boardInstance = React.useRef(null);
      const plottedFunctions = React.useRef([]);
      const intersectionPoints = React.useRef([]);
      const plottedPoints = React.useRef([]);
      const toolModeRef = React.useRef('plotLine');
      const [equationInputs, setEquationInputs] = React.useState(['2x + 1']);
      const [tableData, setTableData] = React.useState([]);
      const [error, setError] = React.useState('');
      const [toolMode, setToolMode] = React.useState('plotLine'); // 'plotLine' or 'plotPoint'

      React.useEffect(() => {
        if (!boardInstance.current) {
          boardInstance.current = JXG.JSXGraph.initBoard(boardRef.current.id, {
            boundingbox: [-10, 10, 10, -10],
            axis: true,
            grid: true,
            showCopyright: false,
          });

          boardInstance.current.on('up', function (e) {
            if (toolModeRef.current === 'plotPoint') {
              const coords = boardInstance.current.getUsrCoordsOfMouse(e);
              const x = Math.round(coords[0]);
              const y = Math.round(coords[1]);
              const point = boardInstance.current.create('point', [x, y], {
                name: `(${x}, ${y})`,
                size: 4,
              });
              plottedPoints.current.push(point);
            }
          });
        }
      }, []);

      React.useEffect(() => {
        toolModeRef.current = toolMode;
      }, [toolMode]);

      const palette = [
        '#2563eb',
        '#16a34a',
        '#f97316',
        '#9333ea',
        '#ef4444',
        '#0ea5e9',
        '#facc15',
        '#a855f7',
      ];

      const clearPlottedObjects = React.useCallback(() => {
        const board = boardInstance.current;
        if (!board) return;
        board.suspendUpdate();
        const removeIfExists = (obj) => {
          if (obj && obj.id && board.objects[obj.id]) {
            board.removeObject(obj);
          }
        };
        plottedFunctions.current.forEach(removeIfExists);
        intersectionPoints.current.forEach(removeIfExists);
        plottedPoints.current.forEach(removeIfExists);
        plottedFunctions.current = [];
        intersectionPoints.current = [];
        plottedPoints.current = [];
        board.unsuspendUpdate();
      }, []);

      const handlePlot = () => {
        setError('');
        if (toolMode !== 'plotLine') return;

        try {
          const board = boardInstance.current;
          if (!board) return;

          const parsedEquations = equationInputs.map((input) => {
            const trimmed = (input || '').trim();
            if (!trimmed) {
              throw new Error('Please enter an equation for each input field.');
            }
            const preparedInput = trimmed.toLowerCase().replace(/\s/g, '');
            const parts = preparedInput.match(
              /^(-?\d*\.?\d*)x([+-]\d+\.?\d*)?$/
            );
            if (!parts) {
              throw new Error("Use 'mx+b' format, e.g., '3x-4'.");
            }

            const m =
              parts[1] === '-'
                ? -1
                : parts[1] === ''
                ? 1
                : parseFloat(parts[1]);
            const b = parts[2] ? parseFloat(parts[2]) : 0;
            if (isNaN(m) || isNaN(b)) {
              throw new Error('Invalid number format.');
            }

            return {
              input: trimmed,
              func: (x) => m * x + b,
            };
          });

          clearPlottedObjects();

          board.suspendUpdate();

          const newTableData = [];

          parsedEquations.forEach(({ input, func }, index) => {
            const color = palette[index % palette.length];
            const graph = board.create('functiongraph', [func], {
              strokeColor: color,
              strokeWidth: 3,
            });
            plottedFunctions.current.push(graph);

            const values = Array.from({ length: 11 }, (_, idx) => {
              const x = idx - 5;
              return { x, y: func(x) };
            });

            newTableData.push({ equation: input, color, values });
          });

          if (plottedFunctions.current.length > 1) {
            for (let i = 0; i < plottedFunctions.current.length - 1; i++) {
              for (let j = i + 1; j < plottedFunctions.current.length; j++) {
                const intersection = board.create(
                  'intersection',
                  [plottedFunctions.current[i], plottedFunctions.current[j]],
                  {
                    name: '',
                    size: 3,
                    strokeColor: '#f97316',
                    fillColor: '#f97316',
                  }
                );
                if (intersection.label) {
                  intersection.label.setText(
                    () =>
                      `(${intersection.X().toFixed(2)}, ${intersection
                        .Y()
                        .toFixed(2)})`
                  );
                  intersection.label.setAttribute({
                    offset: [10, -10],
                    strokeColor: '#0f172a',
                  });
                }
                intersectionPoints.current.push(intersection);
              }
            }
          }

          board.unsuspendUpdate();
          setTableData(newTableData);
        } catch (e) {
          setError(e.message || 'Could not plot equation.');
        }
      };

      const handleClear = () => {
        clearPlottedObjects();
        setError('');
        setTableData([]);
        setEquationInputs(['2x + 1']);
      };

      const handleEquationChange = (index, value) => {
        setEquationInputs((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });
      };

      const addEquationInput = () => {
        setEquationInputs((prev) => [...prev, '']);
      };

      const removeEquationInput = (index) => {
        setEquationInputs((prev) => {
          if (prev.length === 1) return prev;
          const updated = prev.filter((_, idx) => idx !== index);
          return updated.length > 0 ? updated : ['2x + 1'];
        });
      };

      const showExitButton = typeof onExit === 'function';

      return (
        <div className="fade-in">
          <header className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b">
            <div className="flex-none min-w-[120px]">
              {showExitButton && (
                <button
                  onClick={onExit}
                  className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600 font-semibold"
                >
                  <ArrowLeftIcon /> Back
                </button>
              )}
            </div>
            <h2 className="text-xl font-bold text-center text-white flex-1">
              Interactive Graphing Tool
            </h2>
            <div className="flex-none min-w-[120px]" aria-hidden="true"></div>
          </header>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-grow">
              <div
                id="graphing-tool-board"
                ref={boardRef}
                className="jxgbox"
                style={{ width: '100%', height: '400px' }}
              ></div>
            </div>
            <div className="md:w-72 flex-shrink-0 text-black dark:text-white">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                Tools
              </h3>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setToolMode('plotLine')}
                  className={`flex-1 p-2 font-semibold rounded-md transition ${
                    toolMode === 'plotLine'
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                >
                  Plot Line
                </button>
                <button
                  onClick={() => setToolMode('plotPoint')}
                  className={`flex-1 p-2 font-semibold rounded-md transition ${
                    toolMode === 'plotPoint'
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                >
                  Plot Point
                </button>
              </div>

              {toolMode === 'plotLine' ? (
                <div>
                  <p className="font-semibold text-black dark:text-slate-200 mb-2 equations-label">
                    Equations (y = )
                  </p>
                  <div className="space-y-3">
                    {equationInputs.map((value, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            handleEquationChange(index, e.target.value)
                          }
                          placeholder="e.g., 2x - 3"
                          className="flex-1 p-2 border border-slate-300 rounded-md"
                        />
                        <button
                          onClick={() => removeEquationInput(index)}
                          className="p-2 text-sm bg-slate-200 text-black rounded-md hover:bg-slate-300"
                          title="Remove equation"
                          disabled={equationInputs.length === 1}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={addEquationInput}
                      className="flex-1 p-2 bg-slate-200 text-black font-semibold rounded-md hover:bg-slate-300 transition"
                    >
                      Add Equation
                    </button>
                    <button
                      onClick={handlePlot}
                      className="flex-1 p-2 bg-sky-600 text-white font-bold rounded-md hover:bg-sky-700 transition"
                    >
                      Plot All
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="p-2 bg-sky-50 text-sky-800 rounded-md text-center">
                    Click anywhere on the graph to plot a point.
                  </p>
                </div>
              )}
              <button
                onClick={handleClear}
                className="w-full p-2 mt-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
              >
                Clear All
              </button>
              {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            </div>
          </div>
          <div className="mt-6 bg-white shadow-sm rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-700 mb-3">
              Table of Values
            </h3>
            {tableData.length === 0 ? (
              <p className="text-slate-500 text-sm">
                Plot at least one equation to see table values from x = -5 to x
                = 5.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {tableData.map(({ equation, color, values }, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-md overflow-hidden"
                  >
                    <div className="flex items-center justify-between bg-slate-100 px-3 py-2">
                      <span className="text-sm font-semibold text-slate-700">
                        y = {equation}
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs text-slate-500">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        ></span>
                        Graph Color
                      </span>
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600">
                          <th className="px-3 py-2 text-left">x</th>
                          <th className="px-3 py-2 text-left">y</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.map(({ x, y }) => (
                          <tr
                            key={x}
                            className="odd:bg-white even:bg-slate-50 text-slate-700"
                          >
                            <td className="px-3 py-1">{x}</td>
                            <td className="px-3 py-1">
                              {Number.isFinite(y) ? y.toFixed(2) : 'N/A'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    // ---------------- Workforce Hub (frontend-only) ----------------
    const WORKFORCE_RESUME_STORAGE_KEY = 'ged_workforce_resume_v1';
    const WORKFORCE_INTERVIEW_STORAGE_KEY =
      'ged_workforce_interview_practice_v1';
    const WORKFORCE_APPS_STORAGE_KEY = 'ged_workforce_applications_v1';
    const WORKFORCE_COVER_LETTER_STORAGE_KEY = 'ged_workforce_cover_letter_v1';

    // Load NYC career pathways
    let NYC_CAREER_PATHWAYS = [];
    try {
      const loadCareers = async () => {
        const res = await fetch('/data/careerPathsNYC.json');
        const data = await res.json();
        NYC_CAREER_PATHWAYS = data.careers || [];
        if (typeof window !== 'undefined')
          window.NYC_CAREER_PATHWAYS = NYC_CAREER_PATHWAYS;
      };
      if (typeof window !== 'undefined' && !window.NYC_CAREER_PATHWAYS) {
        loadCareers().catch(() => {});
      } else if (typeof window !== 'undefined') {
        NYC_CAREER_PATHWAYS = window.NYC_CAREER_PATHWAYS;
      }
    } catch {}

    const WORKFORCE_CAREER_STORAGE_KEY = 'ged_workforce_career_interests_v1';

    const WORKFORCE_INTERVIEW_QUESTIONS = [
      {
        q: 'Tell me about yourself.',
        hint: 'Keep it professional and focused on strengths.',
      },
      {
        q: 'Why are you interested in this role?',
        hint: 'Connect your skills to the job.',
      },
      {
        q: 'Describe a time you solved a problem.',
        hint: 'Use STAR: Situation, Task, Action, Result.',
      },
      {
        q: 'What are your strengths?',
        hint: 'Pick 2-3 relevant strengths with examples.',
      },
      {
        q: 'What is a weakness you are improving?',
        hint: 'Be honest and show growth.',
      },
    ];

    const WORKFORCE_SOFT_SKILLS_SCENARIOS = [
      {
        id: 'attendance',
        prompt:
          'You will be 10 minutes late to work due to a train delay. What should you do?',
        choices: [
          {
            a: 'Do nothing; 10 minutes is minor.',
            score: 0,
            tip: 'Proactive communication matters.',
          },
          {
            a: 'Text or call your supervisor immediately and apologize.',
            score: 2,
            tip: 'Great choice—communicate early with a plan.',
          },
          {
            a: 'Arrive late and explain later if asked.',
            score: 1,
            tip: 'Better than silence, but still reactive.',
          },
        ],
      },
      {
        id: 'teamwork',
        prompt:
          'A coworker is struggling to finish a shared task before a deadline. You finished yours early.',
        choices: [
          {
            a: 'Offer help and coordinate next steps.',
            score: 2,
            tip: 'Shows initiative and teamwork.',
          },
          {
            a: 'Ignore it—it is not your task.',
            score: 0,
            tip: 'Teams succeed together; offer support.',
          },
          {
            a: 'Tell your manager your coworker is behind.',
            score: 1,
            tip: 'Escalate only after offering help.',
          },
        ],
      },
    ];

    const WORKFORCE_DIGITAL_LITERACY_QUESTIONS = [
      {
        q: 'Which is a professional email address?',
        options: [
          'coolguy123@gmail.com',
          'j.smith.work@gmail.com',
          'bosskiller@x.com',
        ],
        answer: 1,
        tip: 'Use your name; avoid slang or jokes.',
      },
      {
        q: 'A link looks suspicious. What should you do?',
        options: [
          'Click it quickly',
          'Hover to preview or report it',
          'Forward to friends',
        ],
        answer: 1,
        tip: 'Hover or verify the sender; do not click.',
      },
      {
        q: 'Where should you store your resume for easy sharing?',
        options: [
          'Random desktop folder',
          'Cloud drive with share link',
          'Only on a USB stick',
        ],
        answer: 1,
        tip: 'Cloud storage makes sharing and versioning easy.',
      },
    ];

    const DEFAULT_BUDGET_CATEGORIES = [
      { key: 'housing', label: 'Housing', amountDefault: 900 },
      { key: 'utilities', label: 'Utilities', amountDefault: 200 },
      { key: 'food', label: 'Food', amountDefault: 350 },
      { key: 'transportation', label: 'Transportation', amountDefault: 200 },
      { key: 'healthcare', label: 'Healthcare', amountDefault: 120 },
      { key: 'phone', label: 'Phone/Internet', amountDefault: 100 },
      { key: 'other', label: 'Other', amountDefault: 150 },
    ];

    function WorkforceHub({ onBack }) {
      const [tool, setTool] = React.useState(null);
      const isLight = (() => {
        if (typeof document === 'undefined') return true;
        const root = document.documentElement;
        const attr = root.getAttribute('data-theme');
        return attr !== 'dark' && !root.classList.contains('dark');
      })();

      // --- Workforce Progress Strip ---
      // Storage keys
      const WORKFORCE_RESUME_STORAGE_KEY = 'WORKFORCE_RESUME_STORAGE_KEY';
      const WORKFORCE_RESUME_VERSIONS_KEY = 'WORKFORCE_RESUME_VERSIONS_KEY';
      const WORKFORCE_COVER_STORAGE_KEY = 'WORKFORCE_COVER_STORAGE_KEY';
      const WORKFORCE_INTERVIEW_HISTORY_KEY = 'WORKFORCE_INTERVIEW_HISTORY_KEY';
      const WORKFORCE_CAREER_STORAGE_KEY = 'WORKFORCE_CAREER_STORAGE_KEY';
      const WORKFORCE_SOFT_SKILLS_PROGRESS_KEY =
        'WORKFORCE_SOFT_SKILLS_PROGRESS_KEY';
      const WORKFORCE_DIGLIT_PROGRESS_KEY = 'WORKFORCE_DIGLIT_PROGRESS_KEY';
      const WORKFORCE_BUDGET_STORAGE_KEY = 'WORKFORCE_BUDGET_STORAGE_KEY';
      const WORKFORCE_APPS_STORAGE_KEY = 'WORKFORCE_APPS_STORAGE_KEY';

      // Helper functions to get status from localStorage
      function getResumeStatus() {
        try {
          const versions = JSON.parse(
            localStorage.getItem(WORKFORCE_RESUME_VERSIONS_KEY) || '[]'
          );
          if (versions.length > 0) return 'Draft saved';
          const draft = localStorage.getItem(WORKFORCE_RESUME_STORAGE_KEY);
          if (draft) return 'Draft saved';
          return 'Not started';
        } catch {
          return 'Not started';
        }
      }
      function getCoverLetterStatus() {
        try {
          const draft = localStorage.getItem(WORKFORCE_COVER_STORAGE_KEY);
          if (draft) return 'Draft saved';
          return 'Not started';
        } catch {
          return 'Not started';
        }
      }
      function getInterviewStatus() {
        try {
          const hist = JSON.parse(
            localStorage.getItem(WORKFORCE_INTERVIEW_HISTORY_KEY) || '[]'
          );
          if (hist.length > 0) return 'Session completed';
          return 'Not started';
        } catch {
          return 'Not started';
        }
      }
      function getCareerStatus() {
        try {
          const favs = JSON.parse(
            localStorage.getItem(WORKFORCE_CAREER_STORAGE_KEY) || '[]'
          );
          return favs.length > 0
            ? `${favs.length} careers saved`
            : '0 careers saved';
        } catch {
          return '0 careers saved';
        }
      }
      function getSoftSkillsStatus() {
        try {
          const prog = JSON.parse(
            localStorage.getItem(WORKFORCE_SOFT_SKILLS_PROGRESS_KEY) || '{}'
          );
          const done = Array.isArray(prog.completedIds)
            ? prog.completedIds.length
            : 0;
          return done > 0 ? `${done} scenarios done` : '0 scenarios done';
        } catch {
          return '0 scenarios done';
        }
      }
      function getDigitalLitStatus() {
        try {
          const prog = JSON.parse(
            localStorage.getItem(WORKFORCE_DIGLIT_PROGRESS_KEY) || '{}'
          );
          const done = prog.completedCount || 0;
          return done > 0 ? `${done} quizzes done` : '0 quizzes done';
        } catch {
          return '0 quizzes done';
        }
      }
      function getBudgetStatus() {
        try {
          const budget = localStorage.getItem(WORKFORCE_BUDGET_STORAGE_KEY);
          if (budget) return 'Budget saved';
          return 'No budget';
        } catch {
          return 'No budget';
        }
      }
      function getAppTrackerStatus() {
        try {
          const apps = JSON.parse(
            localStorage.getItem(WORKFORCE_APPS_STORAGE_KEY) || '[]'
          );
          return apps.length > 0
            ? `${apps.length} applications tracked`
            : '0 applications';
        } catch {
          return '0 applications';
        }
      }

      // Progress chips config
      const progressChips = [
        { id: 'resume', label: 'Resume', status: getResumeStatus() },
        { id: 'cover', label: 'Cover Letter', status: getCoverLetterStatus() },
        { id: 'interview', label: 'Interview', status: getInterviewStatus() },
        { id: 'career', label: 'Career', status: getCareerStatus() },
        {
          id: 'softskills',
          label: 'Soft Skills',
          status: getSoftSkillsStatus(),
        },
        {
          id: 'digitallit',
          label: 'Digital Literacy',
          status: getDigitalLitStatus(),
        },
        { id: 'budget', label: 'Budget', status: getBudgetStatus() },
        {
          id: 'tracker',
          label: 'Application Tracker',
          status: getAppTrackerStatus(),
        },
      ];

      // Chip component
      const ProgressChip = ({ id, label, status }) => (
        <button
          onClick={() => setTool(id)}
          className="flex flex-col items-center px-3 py-1 mx-1 my-1 rounded-full border text-xs font-semibold bg-white/80 dark:bg-slate-800/70 hover:bg-blue-50 dark:hover:bg-slate-700 transition"
          style={{
            borderColor: 'var(--subject-workforce-border)',
            color: 'var(--subject-workforce-text)',
            minWidth: 80,
          }}
          title={label}
          type="button"
        >
          <span className="font-bold">{label}</span>
          <span className="opacity-80 text-[11px] whitespace-nowrap">
            {status}
          </span>
        </button>
      );

      const ToolCard = ({ id, title, desc }) => (
        <button
          onClick={() => setTool(id)}
          className="workforce-tool-card p-4 rounded-2xl border text-left bg-white/90 dark:bg-slate-800/70 hover:shadow transition"
          style={{ borderColor: 'var(--subject-workforce-border)' }}
        >
          <div className="text-base font-bold text-slate-900 dark:text-slate-100">
            {title}
          </div>
          {desc ? (
            <div className="text-sm text-slate-700 dark:text-slate-300 mt-1">
              {desc}
            </div>
          ) : null}
        </button>
      );

      return (
        <div className="fade-in workforce-hub">
          <div
            className="rounded-2xl overflow-hidden shadow-xl mb-4"
            style={{ background: 'var(--subject-workforce-gradient)' }}
          >
            <header className="flex flex-wrap items-center justify-between gap-3 p-4 text-[var(--subject-workforce-text)]">
              <div className="flex-none min-w-[140px]">
                <button
                  onClick={onBack}
                  className="inline-flex items-center gap-2 text-sm font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md"
                >
                  <ArrowLeftIcon />
                  <span>Back</span>
                </button>
              </div>
              <h2 className="text-2xl font-extrabold text-center flex-1">
                Workforce Hub
              </h2>
              <div className="flex-none min-w-[140px]" aria-hidden="true"></div>
            </header>
          </div>

          {/* Workforce Progress Strip */}
          <div className="flex flex-wrap items-center justify-center gap-1 mb-4 px-2">
            {progressChips.map((chip) => (
              <ProgressChip key={chip.id} {...chip} />
            ))}
          </div>

          <div
            className="rounded-2xl border p-6 mb-4 text-center"
            style={{
              background: 'var(--subject-workforce-gradient)',
              color: 'var(--subject-workforce-text)',
              borderColor: 'var(--subject-workforce-border)',
            }}
          >
            <h1 className="text-2xl font-extrabold">Workforce Readiness</h1>
            <p className="opacity-90 mt-1 text-slate-100">
              Tools and simulations to prepare you for careers
            </p>
          </div>

          <div className="workforce-tool-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            <ToolCard
              id="resume"
              title="Resume Builder"
              desc="Build and save a professional resume"
            />
            <ToolCard
              id="cover"
              title="Cover Letter Builder"
              desc="Guided prompts and phrasing"
            />
            <ToolCard
              id="interview"
              title="Interview Practice"
              desc="Practice common interview questions"
            />
            <ToolCard
              id="career"
              title="Career Explorer"
              desc="Explore in-demand pathways"
            />
            <ToolCard
              id="softskills"
              title="Soft Skills Trainer"
              desc="Micro-scenarios with feedback"
            />
            <ToolCard
              id="digitallit"
              title="Digital Literacy"
              desc="Email, files, safety, spreadsheets"
            />
            <ToolCard
              id="networking"
              title="Networking Tips"
              desc="AI coach and practice scenarios"
            />
            <ToolCard
              id="budget"
              title="Budget & Salary"
              desc="Compare salary vs. monthly costs"
            />
            <ToolCard
              id="tracker"
              title="Application Tracker"
              desc="Track job applications and status"
            />
            <ToolCard
              id="simulation"
              title="Career Life Simulation"
              desc="Make life and career choices"
            />
          </div>

          <section
            className="bg-white dark:bg-slate-900/70 border rounded-2xl shadow p-4"
            style={{ borderColor: 'var(--subject-workforce-border)' }}
          >
            {!tool && (
              <div className="text-slate-500 text-sm">
                Pick a tool above to get started.
              </div>
            )}
            {tool === 'career' && <WorkforceCareerPathFinder />}
            {tool === 'resume' && <WorkforceResumeBuilder />}
            {tool === 'cover' && <WorkforceCoverLetterBuilder />}
            {tool === 'interview' && <WorkforceInterviewPractice />}
            {tool === 'softskills' && <WorkforceSoftSkillsTrainer />}
            {tool === 'digitallit' && <WorkforceDigitalLiteracyTrainer />}
            {tool === 'networking' && <WorkforceNetworkingTips />}
            {tool === 'budget' && <WorkforceBudgetCalculator />}
            {tool === 'tracker' && <WorkforceApplicationTracker />}
            {tool === 'simulation' && (
              <div
                className="panel-surface rounded-xl p-2 border"
                style={{
                  borderColor: 'var(--subject-workforce-border)',
                  backgroundColor: 'white',
                }}
              >
                <LifeChoicesSimulation srcPath="Game of Life/The Game of life.html" />
              </div>
            )}
          </section>
        </div>
      );
    }

    function WorkforceCareerPathFinder() {
      const [careers, setCareers] = React.useState([]);
      const [loading, setLoading] = React.useState(true);
      const [selectedCareer, setSelectedCareer] = React.useState(null);
      const [favorites, setFavorites] = React.useState([]);
      const [useLocalStorage, setUseLocalStorage] = React.useState(false);

      // Filters
      const [cluster, setCluster] = React.useState('All');
      const [query, setQuery] = React.useState('');
      const [gedStatus, setGedStatus] = React.useState('Any');
      const [trainingLength, setTrainingLength] = React.useState('Any');
      const [physicalDemand, setPhysicalDemand] = React.useState('Any');
      const [goodWhileStudying, setGoodWhileStudying] = React.useState(false);
      const [demandLevel, setDemandLevel] = React.useState('Any');

      // Load careers and favorites
      React.useEffect(() => {
        const load = async () => {
          try {
            // Load career data
            const res = await fetch('/data/careerPathsNYC.json');
            const data = await res.json();
            setCareers(data.careers || []);

            // Try to load favorites from API
            const token = localStorage.getItem('appToken');
            if (token) {
              try {
                const favRes = await fetch(
                  `${API_BASE_URL}/api/user/career-interests`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                if (favRes.ok) {
                  const favData = await favRes.json();
                  setFavorites(Array.isArray(favData) ? favData : []);
                } else {
                  // Fallback to localStorage
                  setUseLocalStorage(true);
                  const raw = localStorage.getItem(
                    WORKFORCE_CAREER_STORAGE_KEY
                  );
                  setFavorites(raw ? JSON.parse(raw) : []);
                }
              } catch {
                setUseLocalStorage(true);
                const raw = localStorage.getItem(WORKFORCE_CAREER_STORAGE_KEY);
                setFavorites(raw ? JSON.parse(raw) : []);
              }
            } else {
              // No token, use localStorage
              setUseLocalStorage(true);
              const raw = localStorage.getItem(WORKFORCE_CAREER_STORAGE_KEY);
              setFavorites(raw ? JSON.parse(raw) : []);
            }
          } catch {
            setCareers([]);
          } finally {
            setLoading(false);
          }
        };
        load();
      }, []);

      const clusters = React.useMemo(() => {
        const unique = Array.from(
          new Set(careers.map((c) => c.cluster).filter(Boolean))
        );
        return ['All', ...unique];
      }, [careers]);

      const filtered = React.useMemo(() => {
        return careers.filter((c) => {
          if (cluster !== 'All' && c.cluster !== cluster) return false;
          if (gedStatus === 'Working on GED' && !c.goodWhileStudyingGED)
            return false;
          if (gedStatus === 'GED Completed' && c.goodWhileStudyingGED)
            return false;
          if (trainingLength !== 'Any' && c.trainingLength !== trainingLength)
            return false;
          if (
            physicalDemand !== 'Any' &&
            c.physicalDemandLevel !== physicalDemand
          )
            return false;
          if (goodWhileStudying && !c.goodWhileStudyingGED) return false;
          if (demandLevel !== 'Any' && c.nycDemandLevel !== demandLevel)
            return false;

          const q = query.trim().toLowerCase();
          if (q) {
            const keyTasks = Array.isArray(c.keyTasks) ? c.keyTasks : [];
            const requiredSkills = Array.isArray(c.requiredSkills)
              ? c.requiredSkills
              : [];
            const tags = Array.isArray(c.tags) ? c.tags : [];

            const match =
              String(c.title || '')
                .toLowerCase()
                .includes(q) ||
              String(c.description || '')
                .toLowerCase()
                .includes(q) ||
              String(c.cluster || '')
                .toLowerCase()
                .includes(q) ||
              keyTasks.some((t) => String(t).toLowerCase().includes(q)) ||
              requiredSkills.some((s) => String(s).toLowerCase().includes(q)) ||
              tags.some((t) => String(t).toLowerCase().includes(q));

            if (!match) return false;
          }
          return true;
        });
      }, [
        careers,
        cluster,
        query,
        gedStatus,
        trainingLength,
        physicalDemand,
        goodWhileStudying,
        demandLevel,
      ]);

      const toggleFavorite = async (id) => {
        const isAdding = !favorites.includes(id);
        const next = isAdding
          ? [...favorites, id]
          : favorites.filter((f) => f !== id);

        setFavorites(next);

        if (useLocalStorage) {
          // Use localStorage for unauthenticated users
          try {
            localStorage.setItem(
              WORKFORCE_CAREER_STORAGE_KEY,
              JSON.stringify(next)
            );
          } catch {}
        } else {
          // Use API for authenticated users
          const token = localStorage.getItem('appToken');
          if (token) {
            try {
              if (isAdding) {
                await fetch(`${API_BASE_URL}/api/user/career-interests`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ career_id: id }),
                });
              } else {
                await fetch(`${API_BASE_URL}/api/user/career-interests/${id}`, {
                  method: 'DELETE',
                  headers: { Authorization: `Bearer ${token}` },
                });
              }
            } catch (err) {
              console.error('Failed to sync career interest:', err);
              // Fallback to localStorage on error
              localStorage.setItem(
                WORKFORCE_CAREER_STORAGE_KEY,
                JSON.stringify(next)
              );
            }
          }
        }
      };

      if (loading)
        return (
          <div className="text-center py-8 text-slate-500">
            Loading NYC careers...
          </div>
        );

      return (
        <div>
          {/* Cluster tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {clusters.map((c) => (
              <button
                key={c}
                onClick={() => setCluster(c)}
                className={`px-3 py-1.5 rounded-md font-semibold text-sm transition ${
                  cluster === c
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search + Filters */}
          <div className="grid md:grid-cols-4 gap-3 mb-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search careers..."
              className="px-3 py-2 border rounded-md md:col-span-4"
            />
            <select
              value={gedStatus}
              onChange={(e) => setGedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="Any">I am currently: Any</option>
              <option value="Working on GED">Working on GED</option>
              <option value="GED Completed">GED Completed</option>
            </select>
            <select
              value={trainingLength}
              onChange={(e) => setTrainingLength(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="Any">Training: Any</option>
              <option value="0-3 months">0-3 months</option>
              <option value="3-6 months">3-6 months</option>
              <option value="6-12 months">6-12 months</option>
              <option value="12+ months">12+ months</option>
            </select>
            <select
              value={physicalDemand}
              onChange={(e) => setPhysicalDemand(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="Any">Physical: Any</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              value={demandLevel}
              onChange={(e) => setDemandLevel(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="Any">Demand: Any</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="emerging">Emerging</option>
            </select>
          </div>
          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={goodWhileStudying}
              onChange={(e) => setGoodWhileStudying(e.target.checked)}
            />
            <span className="text-sm">Good while studying for GED only</span>
          </label>

          {/* Career cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((c) => (
              <div
                key={c.id}
                className="workforce-tool-card p-4 rounded-xl border bg-white dark:bg-slate-800/70 relative"
              >
                <button
                  onClick={() => toggleFavorite(c.id)}
                  className="absolute top-3 right-3 text-xl"
                  title={
                    favorites.includes(c.id)
                      ? 'Remove from favorites'
                      : 'Add to favorites'
                  }
                >
                  {favorites.includes(c.id) ? '❤️' : '🤍'}
                </button>
                <h3 className="text-lg font-bold mb-1 pr-8">{c.title}</h3>
                <div className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-1">
                  {c.cluster}
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {c.nycDemandLevel === 'high' && (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                      High Demand
                    </span>
                  )}
                  {c.goodWhileStudyingGED && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Good while studying
                    </span>
                  )}
                </div>
                <p className="text-sm mb-2">{c.description}</p>
                <div className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                  💰 {c.startingWageRange} • ⏱️ {c.trainingLength}
                </div>
                <button
                  onClick={() => setSelectedCareer(c)}
                  className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
          {!filtered.length && (
            <div className="text-center py-8 text-slate-500">
              No careers match your filters.
            </div>
          )}

          {/* Career detail modal */}
          {selectedCareer && (
            <div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCareer(null)}
            >
              <div
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-teal-600 text-white p-4 flex items-center justify-between rounded-t-2xl">
                  <h2 className="text-2xl font-bold">{selectedCareer.title}</h2>
                  <button
                    onClick={() => setSelectedCareer(null)}
                    className="text-2xl hover:bg-white/20 px-2 rounded"
                  >
                    ×
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold">
                      {selectedCareer.cluster}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm">
                      {selectedCareer.nycDemandLevel} demand
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm">
                      {selectedCareer.trainingLength}
                    </span>
                  </div>
                  <div>
                    <strong>Starting Wage:</strong>{' '}
                    {selectedCareer.startingWageRange}
                  </div>
                  <div>
                    <strong>Education Required:</strong>{' '}
                    {selectedCareer.educationRequired}
                  </div>
                  <div>
                    <strong>Description:</strong> {selectedCareer.description}
                  </div>
                  <div>
                    <strong>A Day in the Life:</strong>{' '}
                    {selectedCareer.dayInTheLife}
                  </div>
                  <div>
                    <strong>Key Tasks:</strong>
                    <ul className="list-disc ml-5">
                      {selectedCareer.keyTasks.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Required Skills:</strong>{' '}
                    {selectedCareer.requiredSkills.join(', ')}
                  </div>
                  <div>
                    <strong>Related GED Skills:</strong>{' '}
                    {selectedCareer.relatedGEDSkills.join(', ')}
                  </div>
                  <div>
                    <strong>Advancement Path:</strong>{' '}
                    {selectedCareer.advancementPath.join(' → ')}
                  </div>
                  <div>
                    <strong>NYC Training Programs:</strong>
                    <ul className="space-y-2 mt-2">
                      {selectedCareer.programsNYC.map((p, i) => (
                        <li key={i} className="border-l-4 border-teal-500 pl-3">
                          <div className="font-semibold">{p.name}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-300">
                            {p.provider}
                            {p.borough ? ` • ${p.borough}` : ''}
                          </div>
                          {p.notes && (
                            <div className="text-xs text-slate-500">
                              {p.notes}
                            </div>
                          )}
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-teal-600 hover:underline"
                          >
                            Visit →
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2 pt-4 border-t">
                    <button
                      onClick={() => toggleFavorite(selectedCareer.id)}
                      className="px-4 py-2 bg-teal-600 text-white rounded-md font-semibold hover:bg-teal-700"
                    >
                      {favorites.includes(selectedCareer.id)
                        ? '❤️ Saved'
                        : '🤍 Add to My Interests'}
                    </button>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="font-semibold mb-2">
                      Prepare for this career with Workforce Tools:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCareer(null)}
                        className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-md text-sm font-semibold hover:bg-blue-200"
                      >
                        📋 Build a Resume
                      </button>
                      <button
                        onClick={() => setSelectedCareer(null)}
                        className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-md text-sm font-semibold hover:bg-blue-200"
                      >
                        ✏️ Write a Cover Letter
                      </button>
                      <button
                        onClick={() => setSelectedCareer(null)}
                        className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-md text-sm font-semibold hover:bg-blue-200"
                      >
                        🎤 Practice Interview Questions
                      </button>
                      <button
                        onClick={() => setSelectedCareer(null)}
                        className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-md text-sm font-semibold hover:bg-blue-200"
                      >
                        🤝 Take a Soft Skills Test
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    function WorkforceResumeBuilder() {
      // Resume templates
      const RESUME_TEMPLATES = [
        { id: 'retail', label: 'Retail / Customer Service' },
        { id: 'office', label: 'Office / Admin' },
        { id: 'childcare', label: 'Childcare / Youth Programs' },
        { id: 'healthcare', label: 'Home Health / CNA' },
        { id: 'hospitality', label: 'Hospitality' },
        { id: 'tech', label: 'Entry-Level Tech' },
      ];

      // Template-specific bullet bank
      const RESUME_BULLET_BANK = {
        retail: [
          'Assisted an average of 50+ customers per shift with purchases and returns.',
          'Handled cash and card transactions with 100% accuracy.',
          'Restocked shelves and maintained clean displays.',
          'Resolved customer complaints with professionalism.',
        ],
        office: [
          'Managed incoming calls and scheduled appointments using calendar software.',
          'Maintained accurate digital and paper filing systems.',
          'Prepared reports and presentations for team meetings.',
          'Coordinated office supply orders and inventory.',
        ],
        childcare: [
          'Supervised groups of 10+ children in daily activities.',
          'Planned and led educational games and crafts.',
          'Communicated with parents about child progress.',
          'Ensured a safe and nurturing environment.',
        ],
        healthcare: [
          'Assisted patients with daily living activities.',
          'Recorded vital signs and reported changes to nurses.',
          'Maintained clean and organized patient rooms.',
          'Provided compassionate support to patients and families.',
        ],
        hospitality: [
          'Greeted guests and ensured a welcoming atmosphere.',
          'Managed reservations and handled guest inquiries.',
          'Assisted with event setup and service.',
          'Maintained cleanliness in dining and lobby areas.',
        ],
        tech: [
          'Provided basic technical support for users.',
          'Assisted with software installation and troubleshooting.',
          'Documented issues and solutions in helpdesk system.',
          'Collaborated with team to test new features.',
        ],
      };

      // Multiple resume versions
      const [form, setForm] = React.useState(() => {
        try {
          const raw = localStorage.getItem(WORKFORCE_RESUME_STORAGE_KEY);
          return raw
            ? JSON.parse(raw)
            : {
                name: '',
                email: '',
                phone: '',
                summary: '',
                experiences: [],
                skills: '',
              };
        } catch {
          return {
            name: '',
            email: '',
            phone: '',
            summary: '',
            experiences: [],
            skills: '',
          };
        }
      });
      const [resumeVersions, setResumeVersions] = React.useState(() => {
        try {
          return JSON.parse(
            localStorage.getItem('WORKFORCE_RESUME_VERSIONS_KEY') || '[]'
          );
        } catch {
          return [];
        }
      });
      const [versionName, setVersionName] = React.useState('');
      const [showVersionList, setShowVersionList] = React.useState(false);
      const [selectedTemplate, setSelectedTemplate] = React.useState(
        RESUME_TEMPLATES[0].id
      );
      const [score, setScore] = React.useState(null);
      const [scoreFeedback, setScoreFeedback] = React.useState([]);
      const [scoreKeywords, setScoreKeywords] = React.useState([]);
      const [scoring, setScoring] = React.useState(false);

      const save = () => {
        try {
          localStorage.setItem(
            WORKFORCE_RESUME_STORAGE_KEY,
            JSON.stringify(form)
          );
          alert('Resume saved locally.');
        } catch {}
      };
      // Save as named version
      const saveVersion = () => {
        if (!versionName.trim()) return alert('Enter a version name.');
        const newVersion = {
          name: versionName.trim(),
          data: form,
          updatedAt: new Date().toISOString(),
        };
        const updated = resumeVersions
          .filter((v) => v.name !== newVersion.name)
          .concat(newVersion);
        setResumeVersions(updated);
        localStorage.setItem(
          'WORKFORCE_RESUME_VERSIONS_KEY',
          JSON.stringify(updated)
        );
        alert('Resume version saved.');
        setVersionName('');
      };
      // Load version
      const loadVersion = (name) => {
        const v = resumeVersions.find((v) => v.name === name);
        if (v) setForm(v.data);
        setShowVersionList(false);
      };
      // Delete version
      const deleteVersion = (name) => {
        const updated = resumeVersions.filter((v) => v.name !== name);
        setResumeVersions(updated);
        localStorage.setItem(
          'WORKFORCE_RESUME_VERSIONS_KEY',
          JSON.stringify(updated)
        );
      };
      // Export: Copy to Clipboard
      const copyToClipboard = () => {
        const text = renderResumeText(form);
        navigator.clipboard.writeText(text).then(() => {
          alert('Copied to clipboard!');
        });
      };
      // Export: Print/Save as PDF
      const printResume = () => {
        window.print();
      };
      // Print-friendly text
      function renderResumeText(f) {
        return [
          f.name,
          [f.email, f.phone].filter(Boolean).join(' | '),
          '',
          f.summary ? 'SUMMARY:\n' + f.summary : '',
          f.skills ? 'SKILLS:\n' + f.skills : '',
          f.experiences.length > 0
            ? 'EXPERIENCE:\n' +
              f.experiences
                .map(
                  (e) =>
                    `${e.role || 'Role'} at ${e.company || 'Company'} (${[
                      e.start,
                      e.end,
                    ]
                      .filter(Boolean)
                      .join(' - ')})\n${e.details || ''}`
                )
                .join('\n\n')
            : '',
        ]
          .filter(Boolean)
          .join('\n\n');
      }

      // Application Tracker integration
      const useInAppTracker = () => {
        try {
          localStorage.setItem(
            'WORKFORCE_LAST_RESUME_VERSION',
            JSON.stringify({
              versionName: versionName || 'Current',
              updatedAt: new Date().toISOString(),
            })
          );
          alert('Resume reference saved for Application Tracker.');
        } catch {}
      };
      const clear = () => {
        setForm({
          name: '',
          email: '',
          phone: '',
          summary: '',
          experiences: [],
          skills: '',
        });
        try {
          localStorage.removeItem(WORKFORCE_RESUME_STORAGE_KEY);
        } catch {}
      };

      const addExp = () =>
        setForm((f) => ({
          ...f,
          experiences: [
            ...f.experiences,
            { company: '', role: '', start: '', end: '', details: '' },
          ],
        }));
      const updExp = (i, field, value) =>
        setForm((f) => ({
          ...f,
          experiences: f.experiences.map((e, idx) =>
            idx === i ? { ...e, [field]: value } : e
          ),
        }));
      const delExp = (i) =>
        setForm((f) => ({
          ...f,
          experiences: f.experiences.filter((_, idx) => idx !== i),
        }));

      // Score resume via backend
      async function scoreResume() {
        setScoring(true);
        setScore(null);
        setScoreFeedback([]);
        setScoreKeywords([]);
        try {
          // Construct plain text resume
          const resumeText = `
${form.name || 'Name not provided'}
${[form.email, form.phone].filter(Boolean).join(' | ')}

${form.summary ? 'SUMMARY:\n' + form.summary : ''}

${form.skills ? 'SKILLS:\n' + form.skills : ''}

${
  form.experiences.length > 0
    ? 'EXPERIENCE:\n' +
      form.experiences
        .map(
          (e) =>
            `${e.role || 'Role'} at ${e.company || 'Company'} (${[
              e.start,
              e.end,
            ]
              .filter(Boolean)
              .join(' - ')})\n${e.details || ''}`
        )
        .join('\n\n')
    : ''
}
      `.trim();

          const res = await fetch('/api/workforce/resume-score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              resumeText,
              template: selectedTemplate,
              targetRole: form.experiences[0]?.role || 'entry-level position',
            }),
          });
          const data = await res.json();
          setScore(data.score ?? null);
          setScoreFeedback(data.feedback ?? []);
          setScoreKeywords(data.keywords ?? []);
        } catch (err) {
          setScore(null);
          setScoreFeedback(['Could not score resume. Try again later.']);
          setScoreKeywords([]);
        } finally {
          setScoring(false);
        }
      }

      return (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            {/* Resume Versions UI */}
            <div className="mb-2 flex flex-wrap gap-2 items-center">
              <button
                className="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-xs font-semibold"
                onClick={() => setShowVersionList((v) => !v)}
              >
                {showVersionList ? 'Hide' : 'Show'} Saved Versions
              </button>
              <input
                className="px-2 py-1 border rounded text-xs"
                placeholder="Version name"
                value={versionName}
                onChange={(e) => setVersionName(e.target.value)}
                style={{ minWidth: 120 }}
              />
              <button
                className="px-2 py-1 rounded bg-teal-600 text-white text-xs font-semibold"
                onClick={saveVersion}
              >
                Save as Version
              </button>
              <button
                className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold"
                onClick={useInAppTracker}
              >
                Use in Application Tracker
              </button>
            </div>
            {showVersionList && (
              <div className="mb-2 border rounded p-2 bg-slate-50 dark:bg-slate-800/40">
                <div className="font-semibold text-xs mb-1">
                  Saved Versions:
                </div>
                {resumeVersions.length === 0 && (
                  <div className="text-xs text-slate-500">
                    No versions saved.
                  </div>
                )}
                {resumeVersions.map((v) => (
                  <div key={v.name} className="flex items-center gap-2 mb-1">
                    <button
                      className="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-xs font-semibold"
                      onClick={() => loadVersion(v.name)}
                    >
                      Load: {v.name}
                    </button>
                    <span className="text-xs text-slate-500">
                      {new Date(v.updatedAt).toLocaleString()}
                    </span>
                    <button
                      className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold"
                      onClick={() => deleteVersion(v.name)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="mb-2">
              <label className="block text-sm font-semibold mb-1">
                Resume Template
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full border p-2 rounded-lg bg-white dark:bg-slate-800"
              >
                {RESUME_TEMPLATES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                className="px-3 py-2 border rounded-md"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="px-3 py-2 border rounded-md"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                className="px-3 py-2 border rounded-md"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                className="px-3 py-2 border rounded-md sm:col-span-2"
                placeholder="Skills (comma-separated)"
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
              />
            </div>
            <textarea
              className="mt-2 w-full px-3 py-2 border rounded-md"
              rows={4}
              placeholder="Professional Summary"
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
            />
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={addExp}
                className="px-3 py-2 rounded-md bg-slate-200 hover:bg-slate-300 font-semibold"
              >
                Add Experience
              </button>
              <button
                onClick={save}
                className="px-3 py-2 rounded-md bg-teal-600 text-white font-semibold"
              >
                Save
              </button>
              <button
                onClick={clear}
                className="px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200 font-semibold"
              >
                Clear
              </button>
              <button
                onClick={scoreResume}
                className="px-3 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700"
                disabled={scoring}
              >
                {scoring ? 'Scoring...' : 'Score Resume'}
              </button>
            </div>
            <div className="mt-3 space-y-3">
              {form.experiences.map((exp, i) => (
                <div key={i} className="p-3 border rounded-md">
                  <div className="grid sm:grid-cols-2 gap-2">
                    <input
                      className="px-3 py-2 border rounded-md"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => updExp(i, 'company', e.target.value)}
                    />
                    <input
                      className="px-3 py-2 border rounded-md"
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) => updExp(i, 'role', e.target.value)}
                    />
                    <input
                      className="px-3 py-2 border rounded-md"
                      placeholder="Start (e.g., 2023)"
                      value={exp.start}
                      onChange={(e) => updExp(i, 'start', e.target.value)}
                    />
                    <input
                      className="px-3 py-2 border rounded-md"
                      placeholder="End (e.g., Present)"
                      value={exp.end}
                      onChange={(e) => updExp(i, 'end', e.target.value)}
                    />
                    <textarea
                      className="sm:col-span-2 px-3 py-2 border rounded-md"
                      rows={3}
                      placeholder="Key accomplishments / responsibilities"
                      value={exp.details}
                      onChange={(e) => updExp(i, 'details', e.target.value)}
                    />
                  </div>
                  {/* Bullet bank for this template */}
                  <div className="mt-2">
                    <div className="font-semibold text-xs mb-1">
                      Suggested bullets for this template:
                    </div>
                    <ul className="list-disc ml-5 space-y-1">
                      {(RESUME_BULLET_BANK[selectedTemplate] || []).map(
                        (b, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-xs"
                          >
                            <span>{b}</span>
                            <button
                              className="ml-2 px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-semibold hover:bg-blue-200"
                              onClick={() => {
                                const newDetails = exp.details
                                  ? exp.details + '\n' + b
                                  : b;
                                updExp(i, 'details', newDetails);
                              }}
                              type="button"
                            >
                              Insert
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="mt-2 text-right">
                    <button
                      onClick={() => delExp(i)}
                      className="px-3 py-1.5 rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Resume Score UI */}
            {(score !== null || scoreFeedback.length > 0) && (
              <div className="mt-4 p-4 border rounded-xl bg-blue-50 dark:bg-blue-900/30">
                <div className="font-bold text-blue-800 dark:text-blue-200 text-lg mb-2">
                  Resume Score: {score !== null ? `${score}/100` : '--'}
                </div>
                {scoreFeedback.length > 0 && (
                  <div className="mb-2">
                    <span className="font-semibold">Feedback:</span>
                    <ul className="list-disc ml-5">
                      {scoreFeedback.map((f, i) => (
                        <li
                          key={i}
                          className="text-slate-700 dark:text-slate-300"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {scoreKeywords.length > 0 && (
                  <div>
                    <span className="font-semibold">Keywords:</span>
                    <span className="ml-2 text-slate-700 dark:text-slate-300">
                      {scoreKeywords.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            {/* Export/Print controls */}
            <div className="mb-2 flex gap-2">
              <button
                className="px-2 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                onClick={copyToClipboard}
              >
                Copy to Clipboard
              </button>
              <button
                className="px-2 py-1 rounded bg-slate-700 text-white text-xs font-semibold hover:bg-slate-900"
                onClick={printResume}
              >
                Print / Save as PDF
              </button>
            </div>
            <div className="workforce-resume-preview p-4 border rounded-xl bg-white dark:bg-slate-800/70 print:bg-white print:text-black print:border-none print:shadow-none">
              <div className="text-xl font-bold">
                {form.name || 'Your Name'}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                {[form.email, form.phone].filter(Boolean).join(' • ')}
              </div>
              {form.summary && (
                <p className="mt-3 whitespace-pre-wrap">{form.summary}</p>
              )}
              {form.skills && (
                <div className="mt-3">
                  <span className="font-semibold">Skills:</span> {form.skills}
                </div>
              )}
              {form.experiences.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="font-semibold">Experience</div>
                  {form.experiences.map((e, i) => (
                    <div key={i}>
                      <div className="font-semibold">
                        {e.role || 'Role'} — {e.company || 'Company'}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300">
                        {[e.start, e.end].filter(Boolean).join(' – ')}
                      </div>
                      {e.details && (
                        <div className="text-sm whitespace-pre-wrap">
                          {e.details}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    function WorkforceInterviewPractice() {
      // Interview modes
      const INTERVIEW_MODES = [
        { id: 'retail', label: 'Retail / Customer Service' },
        { id: 'office', label: 'Office / Admin' },
        { id: 'healthcare', label: 'Healthcare Support' },
        { id: 'childcare', label: 'Childcare / Youth Worker' },
        { id: 'hospitality', label: 'Hospitality' },
        { id: 'general', label: 'General Practice' },
      ];

      const [role, setRole] = React.useState('');
      const [experienceLevel, setExperienceLevel] = React.useState('entry');
      const [interviewStyle, setInterviewStyle] = React.useState('general');
      const [sessionMode, setSessionMode] = React.useState('quick');
      const [targetQuestions, setTargetQuestions] = React.useState(5);
      const [selectedMode, setSelectedMode] = React.useState('general');

      const [messages, setMessages] = React.useState([]);
      const [isLoading, setIsLoading] = React.useState(false);
      const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
      const [summary, setSummary] = React.useState(null);
      const [scoreReport, setScoreReport] = React.useState(null);
      const [sessionStarted, setSessionStarted] = React.useState(false);

      const [speechSupported, setSpeechSupported] = React.useState(false);
      const [isListening, setIsListening] = React.useState(false);
      const recognitionRef = React.useRef(null);
      const [pendingText, setPendingText] = React.useState('');

      // Load career roles
      const [roles, setRoles] = React.useState([]);
      const [rolesLoading, setRolesLoading] = React.useState(true);

      React.useEffect(() => {
        setRolesLoading(true);
        fetch('/data/careerPathsNYC.json')
          .then((res) => {
            if (!res.ok) throw new Error('Failed to load career paths');
            return res.json();
          })
          .then((data) => {
            console.log('Loaded career paths:', data);
            const careers = Array.isArray(data?.careers) ? data.careers : [];
            setRoles(careers);
            setRolesLoading(false);
          })
          .catch((err) => {
            console.error('Error loading career paths:', err);
            // Fallback to common NYC roles
            setRoles([
              { id: 'cna', title: 'Certified Nursing Assistant (CNA)' },
              { id: 'warehouse', title: 'Warehouse Associate' },
              { id: 'retail', title: 'Retail Sales Associate' },
              { id: 'security', title: 'Security Guard' },
              { id: 'admin', title: 'Administrative Assistant' },
              { id: 'customer', title: 'Customer Service Representative' },
              { id: 'food', title: 'Food Service Worker' },
              { id: 'janitor', title: 'Custodian/Janitor' },
              { id: 'home-health', title: 'Home Health Aide' },
              { id: 'delivery', title: 'Delivery Driver' },
            ]);
            setRolesLoading(false);
          });
      }, []);

      // Initialize speech recognition
      React.useEffect(() => {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SR) {
          recognitionRef.current = new SR();
          recognitionRef.current.lang = 'en-US';
          recognitionRef.current.interimResults = true;
          recognitionRef.current.continuous = false;

          recognitionRef.current.onstart = () => setIsListening(true);
          recognitionRef.current.onend = () => setIsListening(false);
          recognitionRef.current.onresult = (e) => {
            let finalTranscript = '';
            for (let i = 0; i < e.results.length; i++) {
              finalTranscript += e.results[i][0].transcript;
            }
            setPendingText(finalTranscript);
          };

          setSpeechSupported(true);
        }
      }, []);

      // TTS helper
      function speak(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.95;
        utter.lang = 'en-US';
        window.speechSynthesis.speak(utter);
      }

      async function startSession() {
        if (!role) {
          alert('Please select a role first');
          return;
        }
        setSessionStarted(true);
        setMessages([]);
        setSummary(null);
        setScoreReport(null);
        setCurrentQuestionIndex(0);
        // Send initial request to get first question
        await sendAnswer('START_SESSION');
      }

      async function sendAnswer(text) {
        if (!text.trim() && text !== 'START_SESSION') return;

        const userMsg =
          text === 'START_SESSION'
            ? null
            : {
                id: crypto.randomUUID(),
                from: 'user',
                text,
                timestamp: Date.now(),
              };

        if (userMsg) {
          setMessages((prev) => [...prev, userMsg]);
        }
        setPendingText('');

        setIsLoading(true);
        try {
          const history = userMsg
            ? [...messages, userMsg].map((m) => ({
                from: m.from,
                text: m.text,
              }))
            : [];

          const res = await fetch(
            `${API_BASE_URL}/api/workforce/interview-session`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                role,
                experienceLevel,
                interviewStyle,
                sessionMode,
                targetQuestions,
                history,
                currentQuestionIndex,
                mode: selectedMode,
                progress: { currentQuestionIndex, targetQuestions },
              }),
            }
          );

          const data = await res.json();
          console.log('[Interview] raw response from backend:', data);

          // Score report UI
          if (data && data.scoreReport) {
            setScoreReport(data.scoreReport);
          } else if (data && data.feedback && data.feedback.summaryPayload) {
            // fallback for legacy shape
            setScoreReport({
              score: data.feedback.summaryPayload.overallScore ?? null,
              strengths: data.feedback.summaryPayload.strengths ?? [],
              weaknesses: data.feedback.summaryPayload.areasForGrowth ?? [],
              suggestions:
                data.feedback.summaryPayload.recommendedPracticeTopics ?? [],
            });
          } else {
            setScoreReport(null);
          }

          const hasQuestion =
            data &&
            data.message &&
            typeof data.message.questionText === 'string' &&
            data.message.questionText.trim().length > 0;

          if (hasQuestion) {
            const aiMsg = {
              id: crypto.randomUUID(),
              from: 'ai',
              text: data.message.questionText,
              meta: { type: data.message?.type },
              timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, aiMsg]);
            speak(data.message.questionText);

            if (data?.progress?.currentQuestionIndex != null) {
              setCurrentQuestionIndex(data.progress.currentQuestionIndex);
            }

            if (
              data?.message?.type === 'wrap_up' &&
              data?.feedback?.summaryPayload
            ) {
              setSummary(data.feedback.summaryPayload);
            }
          } else {
            const errorMsg = {
              id: crypto.randomUUID(),
              from: 'ai',
              text: 'Sorry, the interview service is unavailable right now. Please try again later.',
              timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, errorMsg]);
          }
        } catch (err) {
          console.error('[Interview] fetch/parse error:', err);
          const errorMsg = {
            id: crypto.randomUUID(),
            from: 'ai',
            text: 'An error occurred. Please try again.',
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, errorMsg]);
        } finally {
          setIsLoading(false);
        }
      }

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">AI Interview Practice</h2>
            {sessionStarted && (
              <button
                onClick={() => {
                  setSessionStarted(false);
                  setMessages([]);
                  setSummary(null);
                  setScoreReport(null);
                  setPendingText('');
                }}
                className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600"
              >
                New Session
              </button>
            )}
          </div>

          {/* Interview Mode Dropdown */}
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">
              Interview Mode
            </label>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full border p-2 rounded-lg bg-white dark:bg-slate-800 max-w-xs"
              style={{ maxWidth: 320 }}
            >
              {INTERVIEW_MODES.map((mode) => (
                <option key={mode.id} value={mode.id}>
                  {mode.label}
                </option>
              ))}
            </select>
          </div>

          {/* Score Report UI */}
          {scoreReport && <InterviewScoreReport {...scoreReport} />}

          {!sessionStarted ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Select Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border p-2 rounded-lg bg-white dark:bg-slate-800"
                    disabled={rolesLoading}
                  >
                    <option value="">
                      {rolesLoading ? 'Loading roles...' : 'Choose a role...'}
                    </option>
                    {Array.isArray(roles) &&
                      roles.map((r) => (
                        <option key={r.id} value={r.title}>
                          {r.title}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Experience Level
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full border p-2 rounded-lg bg-white dark:bg-slate-800"
                  >
                    <option value="entry">Entry Level</option>
                    <option value="some">Some Experience</option>
                    <option value="experienced">Experienced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Interview Style
                  </label>
                  <select
                    value={interviewStyle}
                    onChange={(e) => setInterviewStyle(e.target.value)}
                    className="w-full border p-2 rounded-lg bg-white dark:bg-slate-800"
                  >
                    <option value="general">General</option>
                    <option value="behavioral">Behavioral</option>
                    <option value="customer_service">Customer Service</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Session Mode
                  </label>
                  <select
                    value={sessionMode}
                    onChange={(e) => {
                      const mode = e.target.value;
                      setSessionMode(mode);
                      setTargetQuestions(mode === 'quick' ? 5 : 10);
                    }}
                    className="w-full border p-2 rounded-lg bg-white dark:bg-slate-800"
                  >
                    <option value="quick">Quick (5 questions)</option>
                    <option value="full">Full (10 questions)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={startSession}
                disabled={!role || rolesLoading}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Interview Practice
              </button>
            </div>
          ) : (
            <>
              {/* Chat Panel */}
              <div className="border rounded-xl p-4 h-[400px] overflow-y-auto bg-white dark:bg-slate-900/60 space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-3 rounded-lg ${
                      m.from === 'user'
                        ? 'bg-blue-500 text-white ml-auto max-w-[80%]'
                        : 'bg-slate-200 dark:bg-slate-700 max-w-[80%]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">{m.text}</div>
                      {m.from === 'ai' && (
                        <button
                          className="flex-none text-lg opacity-70 hover:opacity-100"
                          onClick={() => speak(m.text)}
                          title="Read aloud"
                        >
                          🔊
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="text-center text-slate-500 dark:text-slate-400">
                    Coach is thinking...
                  </div>
                )}
              </div>

              {/* Progress */}
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex} of {targetQuestions}
              </div>

              {/* Input Area */}
              {!summary && (
                <div className="flex gap-2">
                  <input
                    value={pendingText}
                    onChange={(e) => setPendingText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendAnswer(pendingText);
                      }
                    }}
                    className="flex-grow border p-3 rounded-lg bg-white dark:bg-slate-800"
                    placeholder="Type your answer..."
                    disabled={isLoading}
                  />

                  <button
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                    onClick={() => sendAnswer(pendingText)}
                    disabled={isLoading || !pendingText.trim()}
                  >
                    Send
                  </button>

                  {speechSupported && (
                    <button
                      className={`px-4 py-3 rounded-lg font-semibold ${
                        isListening
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                      onClick={() => {
                        if (!isListening) recognitionRef.current.start();
                        else recognitionRef.current.stop();
                      }}
                      disabled={isLoading}
                      title={
                        isListening ? 'Stop recording' : 'Start voice input'
                      }
                    >
                      🎙️
                    </button>
                  )}
                </div>
              )}

              {/* Summary */}
              {summary && (
                <div className="p-6 border rounded-xl bg-green-50 dark:bg-green-900/30 space-y-4">
                  <h2 className="font-bold text-2xl text-green-800 dark:text-green-200">
                    Session Complete! 🎉
                  </h2>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-green-700 dark:text-green-300">
                        {summary.overallScore}/10
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Overall Score
                      </span>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-green-800 dark:text-green-200">
                        💪 Your Strengths:
                      </h3>
                      <ul className="list-disc ml-5 space-y-1">
                        {summary.strengths?.map((s, i) => (
                          <li
                            key={i}
                            className="text-green-700 dark:text-green-300 font-medium"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-red-800 dark:text-red-200">
                        📈 Areas for Growth:
                      </h3>
                      <ul className="list-disc ml-5 space-y-1">
                        {summary.areasForGrowth?.map((a, i) => (
                          <li
                            key={i}
                            className="text-red-700 dark:text-red-300 font-medium"
                          >
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {summary.recommendedPracticeTopics?.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-blue-800 dark:text-blue-200">
                          📚 Recommended Practice:
                        </h3>
                        <ul className="list-disc ml-5 space-y-1">
                          {summary.recommendedPracticeTopics.map((t, i) => (
                            <li
                              key={i}
                              className="text-slate-700 dark:text-slate-300"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      );
    }

    function WorkforceCoverLetterBuilder() {
      // Cover letter templates
      const COVER_LETTER_TEMPLATES = [
        { id: 'retail', label: 'Retail / Customer Service' },
        { id: 'office', label: 'Office / Administrative' },
        { id: 'healthcare', label: 'Healthcare Support / CNA' },
        { id: 'hospitality', label: 'Hospitality / Food Service' },
        { id: 'childcare', label: 'Childcare / Youth Programs' },
        { id: 'general', label: 'General Entry-Level' },
      ];

      const [data, setData] = React.useState(() => {
        try {
          const raw = localStorage.getItem(WORKFORCE_COVER_LETTER_STORAGE_KEY);
          return raw
            ? JSON.parse(raw)
            : {
                name: '',
                company: '',
                role: '',
                source: '',
                jobDescription: '',
                intro: '',
                body: '',
                closing: '',
                tone: 'Professional',
              };
        } catch {
          return {
            name: '',
            company: '',
            role: '',
            source: '',
            jobDescription: '',
            intro: '',
            body: '',
            closing: '',
            tone: 'Professional',
          };
        }
      });

      const [selectedTemplate, setSelectedTemplate] = React.useState('general');
      const [coverVersionName, setCoverVersionName] = React.useState('');
      const [score, setScore] = React.useState(null);
      const [feedback, setFeedback] = React.useState([]);
      const [strengths, setStrengths] = React.useState([]);
      const [improvements, setImprovements] = React.useState([]);
      const [reviewing, setReviewing] = React.useState(false);

      // Tone presets
      const TONE_PRESETS = [
        {
          id: 'Professional',
          hint: 'Clear, direct, and formal. Focus on skills and fit.',
          phrases: [
            'I am confident my experience aligns with your needs.',
            'I look forward to contributing to your team.',
            'My background demonstrates strong attention to detail.',
          ],
        },
        {
          id: 'Warm',
          hint: 'Friendly, approachable, and positive.',
          phrases: [
            'I am genuinely excited about this opportunity.',
            'I value collaboration and a supportive work environment.',
            'I enjoy helping others and learning new things.',
          ],
        },
        {
          id: 'Confident',
          hint: 'Assertive, self-assured, and proactive.',
          phrases: [
            'I am eager to take on new challenges.',
            'I am confident in my ability to learn quickly.',
            'I am ready to contribute from day one.',
          ],
        },
      ];

      const selectedTone =
        TONE_PRESETS.find((t) => t.id === data.tone) || TONE_PRESETS[0];

      const save = () => {
        try {
          localStorage.setItem(
            WORKFORCE_COVER_LETTER_STORAGE_KEY,
            JSON.stringify(data)
          );
        } catch {}
      };

      const clear = () => {
        setData({
          name: '',
          company: '',
          role: '',
          source: '',
          jobDescription: '',
          intro: '',
          body: '',
          closing: '',
          tone: 'Professional',
        });
        setScore(null);
        setFeedback([]);
        setStrengths([]);
        setImprovements([]);
      };

      const loadTemplate = (templateId) => {
        const templates = {
          retail: {
            intro:
              'I am writing to express my interest in the position at your store. With my customer service experience and positive attitude, I am confident I can contribute to your team.',
            body: 'I have experience working with customers, handling transactions, and maintaining a clean, organized workspace. I am reliable, punctual, and eager to learn.',
            closing:
              'Thank you for considering my application. I look forward to the opportunity to discuss how I can support your team.',
          },
          office: {
            intro:
              'I am applying for the administrative position at your company. My organizational skills and attention to detail make me a strong candidate for this role.',
            body: 'I have experience with data entry, scheduling, and office communication. I am proficient with Microsoft Office and comfortable learning new software.',
            closing:
              'I appreciate your time and consideration. I am excited about the possibility of contributing to your office.',
          },
          healthcare: {
            intro:
              'I am interested in the healthcare support position at your facility. My compassion and dedication to helping others drive my interest in this field.',
            body: 'I have completed CNA training and understand the importance of patient care, hygiene, and safety protocols. I am committed to making a positive difference.',
            closing:
              'Thank you for reviewing my application. I would welcome the chance to discuss my qualifications further.',
          },
          hospitality: {
            intro:
              'I am applying for the position in your hospitality team. My friendly demeanor and work ethic make me well-suited for this role.',
            body: 'I have experience in food service, including taking orders, serving customers, and maintaining cleanliness. I work well in fast-paced environments.',
            closing:
              'I appreciate your consideration and hope to bring my skills to your team.',
          },
          childcare: {
            intro:
              'I am writing to apply for the childcare position. My patience and genuine care for children motivate me to pursue this opportunity.',
            body: 'I have experience supervising children, planning activities, and ensuring their safety. I am CPR certified and committed to creating a nurturing environment.',
            closing:
              'Thank you for considering my application. I look forward to contributing to your program.',
          },
          general: {
            intro:
              'I am excited to apply for this position. I believe my skills and enthusiasm make me a great fit for your team.',
            body: 'I am a quick learner, reliable, and ready to take on new responsibilities. I am committed to doing quality work and contributing positively.',
            closing:
              'Thank you for your time. I hope to discuss this opportunity with you soon.',
          },
        };

        const template = templates[templateId] || templates.general;
        setData({ ...data, ...template });
      };

      const reviewLetter = async () => {
        if (!data.intro.trim() || !data.body.trim()) return;
        setReviewing(true);
        setScore(null);
        setFeedback([]);
        setStrengths([]);
        setImprovements([]);

        try {
          const res = await fetch('/api/workforce/cover-letter-review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: data.name,
              company: data.company,
              role: data.role,
              intro: data.intro,
              body: data.body,
              closing: data.closing,
              tone: data.tone,
            }),
          });
          const result = await res.json();
          setScore(result.score || null);
          setFeedback(result.feedback || []);
          setStrengths(result.strengths || []);
          setImprovements(result.improvements || []);
        } catch (err) {
          setFeedback([
            'Could not review your cover letter. Please try again later.',
          ]);
        } finally {
          setReviewing(false);
        }
      };

      const useInAppTracker = () => {
        if (!data.company.trim() || !data.role.trim()) {
          alert('Please fill in company and role fields first.');
          return;
        }

        const versionLabel = coverVersionName.trim() || 'Cover Letter';
        const trackerData = {
          company: data.company,
          role: data.role,
          status: 'Planned',
          priority: 'Medium',
          dateApplied: '',
          contact: '',
          notes: `${versionLabel} created. Tone: ${data.tone}`,
          followUpDate: '',
        };

        try {
          const existingApps = JSON.parse(
            localStorage.getItem(WORKFORCE_APPS_STORAGE_KEY) || '[]'
          );
          const newApp = {
            id: Date.now(),
            ...trackerData,
            dateAdded: new Date().toISOString().split('T')[0],
          };
          existingApps.unshift(newApp);
          localStorage.setItem(
            WORKFORCE_APPS_STORAGE_KEY,
            JSON.stringify(existingApps)
          );
          alert(`Added to Application Tracker: ${data.company} - ${data.role}`);
        } catch (err) {
          alert('Could not add to Application Tracker. Please try again.');
        }
      };

      // Place the return block for the component here, not inside the array/object
      return (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="mb-3 flex gap-4">
              <div className="hidden md:block w-40 flex-shrink-0">
                <div className="border rounded-lg p-2 bg-slate-50 dark:bg-slate-800/40">
                  <div className="font-semibold text-xs mb-1">Structure</div>
                  <ul className="space-y-1 text-xs">
                    <li>
                      <span className="mr-1">
                        {data.intro?.trim() ? '✅' : '⬜'}
                      </span>{' '}
                      Intro
                    </li>
                    <li>
                      <span className="mr-1">
                        {data.body?.trim() ? '✅' : '⬜'}
                      </span>{' '}
                      Skills/Experience
                    </li>
                    <li>
                      <span className="mr-1">
                        {data.closing?.trim() ? '✅' : '⬜'}
                      </span>{' '}
                      Closing
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-3">
                  <label className="block text-sm font-semibold mb-1">
                    Cover Letter Template
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      className="flex-1 border p-2 rounded-lg bg-white dark:bg-slate-800"
                    >
                      {COVER_LETTER_TEMPLATES.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => loadTemplate(selectedTemplate)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                    >
                      Load Template
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    className="px-3 py-2 border rounded-md"
                    placeholder="Your Name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                  <input
                    className="px-3 py-2 border rounded-md"
                    placeholder="Target Company"
                    value={data.company}
                    onChange={(e) =>
                      setData({ ...data, company: e.target.value })
                    }
                  />
                  <input
                    className="px-3 py-2 border rounded-md"
                    placeholder="Role / Position"
                    value={data.role}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                  />
                  <input
                    className="px-3 py-2 border rounded-md"
                    placeholder="Source (e.g. Indeed, Flyer)"
                    value={data.source || ''}
                    onChange={(e) =>
                      setData({ ...data, source: e.target.value })
                    }
                  />
                </div>
                <textarea
                  className="mt-2 w-full px-3 py-2 border rounded-md"
                  rows={2}
                  placeholder="Paste job description here (optional)"
                  value={data.jobDescription || ''}
                  onChange={(e) =>
                    setData({ ...data, jobDescription: e.target.value })
                  }
                />
                <div className="flex gap-2 mt-2 items-center">
                  <label className="text-xs font-semibold">Tone:</label>
                  <select
                    className="border rounded px-2 py-1 text-xs"
                    value={data.tone || 'Professional'}
                    onChange={(e) => setData({ ...data, tone: e.target.value })}
                  >
                    {TONE_PRESETS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.id}
                      </option>
                    ))}
                  </select>
                  <span className="text-xs text-slate-500">
                    {selectedTone.hint}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedTone.phrases.map((p, idx) => (
                    <button
                      key={idx}
                      className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold hover:bg-blue-200"
                      type="button"
                      onClick={() =>
                        setData({
                          ...data,
                          body: (data.body ? data.body + '\n' : '') + p,
                        })
                      }
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <textarea
                  className="mt-2 w-full px-3 py-2 border rounded-md"
                  rows={3}
                  placeholder="Intro: Why you're writing and how you fit"
                  value={data.intro}
                  onChange={(e) => setData({ ...data, intro: e.target.value })}
                />
                <textarea
                  className="mt-2 w-full px-3 py-2 border rounded-md"
                  rows={6}
                  placeholder="Body: Relevant achievements and examples"
                  value={data.body}
                  onChange={(e) => setData({ ...data, body: e.target.value })}
                />
                <textarea
                  className="mt-2 w-full px-3 py-2 border rounded-md"
                  rows={3}
                  placeholder="Closing: Thanks and availability"
                  value={data.closing}
                  onChange={(e) =>
                    setData({ ...data, closing: e.target.value })
                  }
                />
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <button
                    onClick={save}
                    className="px-3 py-2 rounded-md bg-teal-600 text-white font-semibold hover:bg-teal-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={clear}
                    className="px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200 font-semibold dark:bg-slate-700 dark:hover:bg-slate-600"
                  >
                    Clear
                  </button>
                  <button
                    onClick={reviewLetter}
                    className="px-3 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700"
                    disabled={
                      reviewing || !data.intro.trim() || !data.body.trim()
                    }
                  >
                    {reviewing ? 'Reviewing...' : 'AI Review'}
                  </button>
                  <input
                    className="px-2 py-1 border rounded text-xs ml-2"
                    placeholder="Version name (for App Tracker)"
                    value={coverVersionName}
                    onChange={(e) => setCoverVersionName(e.target.value)}
                    style={{ minWidth: 120 }}
                  />
                  <button
                    className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold"
                    onClick={useInAppTracker}
                  >
                    Use in Application Tracker
                  </button>
                </div>
                {(score !== null || feedback.length > 0) && (
                  <div className="mt-4 p-4 border rounded-xl bg-purple-50 dark:bg-purple-900/30">
                    <div className="font-bold text-purple-800 dark:text-purple-200 text-lg mb-2">
                      Cover Letter Score:{' '}
                      {score !== null ? `${score}/100` : '--'}
                    </div>
                    {feedback.length > 0 && (
                      <div className="mb-2">
                        <span className="font-semibold text-purple-900 dark:text-purple-100">
                          Overall Feedback:
                        </span>
                        <ul className="list-disc ml-5 mt-1">
                          {feedback.map((f, i) => (
                            <li
                              key={i}
                              className="text-slate-700 dark:text-slate-300"
                            >
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {strengths.length > 0 && (
                      <div className="mb-2">
                        <span className="font-semibold text-green-700 dark:text-green-300">
                          Strengths:
                        </span>
                        <ul className="list-disc ml-5 mt-1">
                          {strengths.map((s, i) => (
                            <li
                              key={i}
                              className="text-slate-700 dark:text-slate-300"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {improvements.length > 0 && (
                      <div>
                        <span className="font-semibold text-orange-700 dark:text-orange-300">
                          Suggested Improvements:
                        </span>
                        <ul className="list-disc ml-5 mt-1">
                          {improvements.map((imp, i) => (
                            <li
                              key={i}
                              className="text-slate-700 dark:text-slate-300"
                            >
                              {imp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <div className="p-4 border rounded-xl bg-white dark:bg-slate-800/70">
              <div className="whitespace-pre-wrap text-sm">
                <div>{data.name || 'Your Name'}</div>
                <div className="mt-3">
                  Dear Hiring Manager at {data.company || 'Company'},
                </div>
                <div className="mt-2">
                  I am applying for the {data.role || 'Role'} position.
                </div>
                {data.source && (
                  <div className="mt-2 text-xs text-slate-500">
                    Source: {data.source}
                  </div>
                )}
                {data.jobDescription && (
                  <div className="mt-2 text-xs text-slate-500">
                    Job Description: {data.jobDescription}
                  </div>
                )}
                {data.intro && <div className="mt-2">{data.intro}</div>}
                {data.body && <div className="mt-2">{data.body}</div>}
                {data.closing && <div className="mt-2">{data.closing}</div>}
                <div className="mt-3">Sincerely,</div>
                <div>{data.name || 'Your Name'}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    function WorkforceSoftSkillsTrainer() {
      const STORAGE_KEY = 'ged_workforce_softskills_v1';
      const [score, setScore] = React.useState(0);
      const [answered, setAnswered] = React.useState(() => {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          return raw ? JSON.parse(raw) : {};
        } catch {
          return {};
        }
      });
      const [customMode, setCustomMode] = React.useState(false);
      const [customPrompt, setCustomPrompt] = React.useState('');
      const [customResponse, setCustomResponse] = React.useState('');
      const [aiEvaluation, setAiEvaluation] = React.useState(null);
      const [evaluating, setEvaluating] = React.useState(false);

      const answer = (id, choice) => {
        if (answered[id]) return; // lock in first choice
        const scenario = WORKFORCE_SOFT_SKILLS_SCENARIOS.find(
          (s) => s.id === id
        );
        const picked = scenario?.choices[choice];
        const nextAnswered = { ...answered, [id]: choice };
        setAnswered(nextAnswered);
        if (picked) setScore((s) => s + picked.score);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAnswered));
        } catch {}
      };
      const reset = () => {
        setAnswered({});
        setScore(0);
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
      };

      const evaluateCustomResponse = async () => {
        if (!customPrompt.trim() || !customResponse.trim()) return;
        setEvaluating(true);
        setAiEvaluation(null);
        try {
          const res = await fetch('/api/workforce/soft-skills-evaluate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              scenario: customPrompt,
              response: customResponse,
            }),
          });
          const data = await res.json();
          setAiEvaluation(data);
        } catch (err) {
          setAiEvaluation({
            score: null,
            feedback: [
              'Could not evaluate your response. Please try again later.',
            ],
            strengths: [],
            improvements: [],
          });
        } finally {
          setEvaluating(false);
        }
      };

      return (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Multiple Choice Score: {score}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCustomMode(!customMode)}
                className={`px-3 py-1.5 rounded-md text-sm font-semibold ${
                  customMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600'
                }`}
              >
                {customMode ? 'Multiple Choice' : 'AI Evaluation Mode'}
              </button>
              {!customMode && (
                <button
                  onClick={reset}
                  className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-sm font-semibold"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {!customMode ? (
            <div className="space-y-3">
              {WORKFORCE_SOFT_SKILLS_SCENARIOS.map((s) => (
                <div
                  key={s.id}
                  className="p-3 border rounded-xl bg-white dark:bg-slate-800/70"
                >
                  <div className="font-semibold mb-2">{s.prompt}</div>
                  <div className="grid sm:grid-cols-3 gap-2">
                    {s.choices.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => answer(s.id, idx)}
                        className={`px-3 py-2 rounded-md border text-left ${
                          answered[s.id] === idx
                            ? 'bg-teal-50 border-teal-300 dark:bg-teal-900/30 dark:border-teal-500'
                            : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        <div className="text-sm font-semibold">{c.a}</div>
                        {answered[s.id] === idx && (
                          <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {c.tip}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 border rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="font-bold text-lg mb-2">
                AI-Powered Soft Skills Evaluation
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Describe a workplace scenario and how you would handle it. Get
                AI feedback on your soft skills.
              </div>
              <div className="mb-3">
                <label className="block font-semibold text-sm mb-1">
                  Scenario or Question:
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-800"
                  rows={3}
                  placeholder="Example: Your coworker consistently misses deadlines affecting your work. How do you address this?"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="block font-semibold text-sm mb-1">
                  Your Response:
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-800"
                  rows={5}
                  placeholder="Describe how you would handle this situation..."
                  value={customResponse}
                  onChange={(e) => setCustomResponse(e.target.value)}
                />
              </div>
              <button
                onClick={evaluateCustomResponse}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
                disabled={
                  evaluating || !customPrompt.trim() || !customResponse.trim()
                }
              >
                {evaluating ? 'Evaluating...' : 'Get AI Evaluation'}
              </button>

              {aiEvaluation && (
                <div className="mt-4 p-4 border rounded-xl bg-purple-50 dark:bg-purple-900/30">
                  <div className="font-bold text-purple-800 dark:text-purple-200 text-lg mb-2">
                    {aiEvaluation.score !== null
                      ? `Soft Skills Score: ${aiEvaluation.score}/100`
                      : 'Evaluation'}
                  </div>
                  {aiEvaluation.feedback &&
                    aiEvaluation.feedback.length > 0 && (
                      <div className="mb-2">
                        <span className="font-semibold text-purple-900 dark:text-purple-100">
                          Overall Feedback:
                        </span>
                        <ul className="list-disc ml-5 mt-1">
                          {aiEvaluation.feedback.map((f, i) => (
                            <li
                              key={i}
                              className="text-slate-700 dark:text-slate-300 text-sm"
                            >
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  {aiEvaluation.strengths &&
                    aiEvaluation.strengths.length > 0 && (
                      <div className="mb-2">
                        <span className="font-semibold text-green-700 dark:text-green-300">
                          Strengths:
                        </span>
                        <ul className="list-disc ml-5 mt-1">
                          {aiEvaluation.strengths.map((s, i) => (
                            <li
                              key={i}
                              className="text-slate-700 dark:text-slate-300 text-sm"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  {aiEvaluation.improvements &&
                    aiEvaluation.improvements.length > 0 && (
                      <div>
                        <span className="font-semibold text-orange-700 dark:text-orange-300">
                          Areas to Improve:
                        </span>
                        <ul className="list-disc ml-5 mt-1">
                          {aiEvaluation.improvements.map((imp, i) => (
                            <li
                              key={i}
                              className="text-slate-700 dark:text-slate-300 text-sm"
                            >
                              {imp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    function WorkforceDigitalLiteracyTrainer() {
      const STORAGE_KEY = 'ged_workforce_digitallit_v1';
      const [answers, setAnswers] = React.useState(() => {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          return raw ? JSON.parse(raw) : {};
        } catch {
          return {};
        }
      });
      const select = (i, optIdx) => {
        const next = { ...answers, [i]: optIdx };
        setAnswers(next);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
      };
      const score = WORKFORCE_DIGITAL_LITERACY_QUESTIONS.reduce((s, q, i) => {
        return s + (answers[i] === q.answer ? 1 : 0);
      }, 0);
      return (
        <div>
          <div className="text-sm text-slate-600 dark:text-slate-300 mb-2">
            Score: {score} / {WORKFORCE_DIGITAL_LITERACY_QUESTIONS.length}
          </div>
          <div className="space-y-3">
            {WORKFORCE_DIGITAL_LITERACY_QUESTIONS.map((q, i) => (
              <div
                key={i}
                className="p-3 border rounded-xl bg-white dark:bg-slate-800/70"
              >
                <div className="font-semibold mb-2">{q.q}</div>
                <div className="grid sm:grid-cols-3 gap-2">
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => select(i, idx)}
                      className={`px-3 py-2 rounded-md border text-left ${
                        answers[i] === idx
                          ? 'bg-teal-50 border-teal-300'
                          : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-sm">{opt}</div>
                      {answers[i] === idx && (
                        <div className="text-xs text-slate-600 mt-1">
                          {q.tip}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    function WorkforceNetworkingTips() {
      const NETWORKING_SCENARIOS = [
        {
          id: 1,
          title: 'Professional Introduction',
          situation:
            "You're at a job fair and want to introduce yourself to a recruiter from a company you're interested in.",
          challenge: 'How do you make a strong first impression in 30 seconds?',
        },
        {
          id: 2,
          title: 'LinkedIn Connection Request',
          situation:
            'You met someone briefly at an event and want to connect with them on LinkedIn.',
          challenge: 'What message do you send with your connection request?',
        },
        {
          id: 3,
          title: 'Informational Interview',
          situation:
            'You want to learn more about a career path from someone working in that field.',
          challenge:
            'How do you request an informational interview without seeming pushy?',
        },
        {
          id: 4,
          title: 'Follow-Up After Meeting',
          situation:
            'You had a great conversation with a professional contact at a networking event.',
          challenge:
            'How do you follow up within 24-48 hours to stay on their radar?',
        },
        {
          id: 5,
          title: 'Asking for a Referral',
          situation:
            "You're applying for a job at a company where your contact works.",
          challenge:
            'How do you ask them to refer you without putting them on the spot?',
        },
      ];

      const [selectedScenario, setSelectedScenario] = React.useState(null);
      const [userResponse, setUserResponse] = React.useState('');
      const [aiReview, setAiReview] = React.useState(null);
      const [reviewing, setReviewing] = React.useState(false);
      const [showTips, setShowTips] = React.useState(true);

      const reviewResponse = async () => {
        if (!userResponse.trim() || !selectedScenario) return;
        setReviewing(true);
        setAiReview(null);
        try {
          const res = await fetch('/api/workforce/networking-review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              scenario: selectedScenario.title,
              situation: selectedScenario.situation,
              challenge: selectedScenario.challenge,
              userResponse,
            }),
          });
          const data = await res.json();
          setAiReview(data);
        } catch (err) {
          setAiReview({
            score: null,
            feedback: [
              'Could not review your response. Please try again later.',
            ],
            strengths: [],
            improvements: [],
          });
        } finally {
          setReviewing(false);
        }
      };

      return (
        <div>
          {/* Scenario Selection */}
          <div>
            <div className="font-semibold mb-2">
              Choose a Networking Scenario to Practice:
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {NETWORKING_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => {
                    setSelectedScenario(scenario);
                    setUserResponse('');
                    setAiReview(null);
                  }}
                  className={`p-3 border rounded-xl text-left transition ${
                    selectedScenario?.id === scenario.id
                      ? 'bg-blue-100 border-blue-600 dark:bg-blue-900/30 dark:border-blue-400'
                      : 'bg-white dark:bg-slate-800/70 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm">{scenario.title}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {scenario.challenge}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Scenario Practice */}
          {selectedScenario && (
            <div className="p-4 border rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="font-bold text-lg mb-2">
                {selectedScenario.title}
              </div>
              <div className="mb-3">
                <div className="font-semibold text-sm">Situation:</div>
                <div className="text-sm text-slate-700 dark:text-slate-300">
                  {selectedScenario.situation}
                </div>
              </div>
              <div className="mb-3">
                <div className="font-semibold text-sm">Your Challenge:</div>
                <div className="text-sm text-slate-700 dark:text-slate-300">
                  {selectedScenario.challenge}
                </div>
              </div>
              <div className="mb-3">
                <label className="block font-semibold text-sm mb-1">
                  Your Response:
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-800"
                  rows={5}
                  placeholder="Type your response here..."
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                />
              </div>
              <button
                onClick={reviewResponse}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
                disabled={reviewing || !userResponse.trim()}
              >
                {reviewing ? 'Reviewing...' : 'Get AI Feedback'}
              </button>

              {/* AI Review Results */}
              {aiReview && (
                <div className="mt-4 p-4 border rounded-xl bg-purple-50 dark:bg-purple-900/30">
                  <div className="font-bold text-purple-800 dark:text-purple-200 text-lg mb-2">
                    {aiReview.score !== null
                      ? `Score: ${aiReview.score}/100`
                      : 'Feedback'}
                  </div>
                  {aiReview.feedback && aiReview.feedback.length > 0 && (
                    <div className="mb-2">
                      <span className="font-semibold text-purple-900 dark:text-purple-100">
                        Overall:
                      </span>
                      <ul className="list-disc ml-5 mt-1">
                        {aiReview.feedback.map((f, i) => (
                          <li
                            key={i}
                            className="text-slate-700 dark:text-slate-300 text-sm"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {aiReview.strengths && aiReview.strengths.length > 0 && (
                    <div className="mb-2">
                      <span className="font-semibold text-green-700 dark:text-green-300">
                        Strengths:
                      </span>
                      <ul className="list-disc ml-5 mt-1">
                        {aiReview.strengths.map((s, i) => (
                          <li
                            key={i}
                            className="text-slate-700 dark:text-slate-300 text-sm"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {aiReview.improvements &&
                    aiReview.improvements.length > 0 && (
                      <div>
                        <span className="font-semibold text-orange-700 dark:text-orange-300">
                          Improvements:
                        </span>
                        <ul className="list-disc ml-5 mt-1">
                          {aiReview.improvements.map((imp, i) => (
                            <li
                              key={i}
                              className="text-slate-700 dark:text-slate-300 text-sm"
                            >
                              {imp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    function WorkforceBudgetCalculator() {
      const [income, setIncome] = React.useState(2500);
      const [items, setItems] = React.useState(() =>
        DEFAULT_BUDGET_CATEGORIES.map((c) => ({
          ...c,
          amount: c.amountDefault,
        }))
      );
      const total = items.reduce((s, i) => s + (Number(i.amount) || 0), 0);
      const savings = (Number(income) || 0) - total;
      const setAmt = (key, val) =>
        setItems((arr) =>
          arr.map((i) => (i.key === key ? { ...i, amount: val } : i))
        );
      return (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1">
                Monthly Income
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-md"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              {items.map((i) => (
                <div key={i.key} className="flex items-center gap-2">
                  <label className="w-40 text-sm">{i.label}</label>
                  <input
                    type="number"
                    className="flex-1 px-3 py-2 border rounded-md"
                    value={i.amount}
                    onChange={(e) => setAmt(i.key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="workforce-budget-summary p-4 border rounded-xl bg-white dark:bg-slate-800/70">
              <div className="text-lg font-bold mb-2">Summary</div>
              <div className="text-sm">Expenses: ${total.toLocaleString()}</div>
              <div
                className={`text-sm ${
                  savings >= 0
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : 'text-red-700 dark:text-red-300'
                }`}
              >
                Savings: ${savings.toLocaleString()}
              </div>
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                Tip: Aim to keep housing at or below ~30% of income.
              </div>
            </div>
          </div>
        </div>
      );
    }

    function WorkforceApplicationTracker() {
      const STATUS_OPTIONS = [
        'Researching',
        'Planned',
        'Applied',
        'Interview',
        'Offer',
        'Rejected',
        'Accepted',
      ];

      const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];

      const [apps, setApps] = React.useState(() => {
        try {
          const raw = localStorage.getItem(WORKFORCE_APPS_STORAGE_KEY);
          return raw ? JSON.parse(raw) : [];
        } catch {
          return [];
        }
      });

      const [draft, setDraft] = React.useState({
        company: '',
        role: '',
        status: 'Planned',
        priority: 'Medium',
        dateApplied: '',
        contact: '',
        notes: '',
        followUpDate: '',
      });

      const [expandedId, setExpandedId] = React.useState(null);
      const [viewMode, setViewMode] = React.useState('kanban');

      const saveAll = (list) => {
        setApps(list);
        try {
          localStorage.setItem(
            WORKFORCE_APPS_STORAGE_KEY,
            JSON.stringify(list)
          );
        } catch {}
      };

      const add = () => {
        const c = draft.company.trim();
        const r = draft.role.trim();
        if (!c || !r) return;
        const now = new Date().toISOString().split('T')[0];
        const newApp = {
          id: Date.now(),
          ...draft,
          dateAdded: now,
          dateApplied:
            draft.dateApplied || (draft.status === 'Applied' ? now : ''),
        };
        const next = [newApp, ...apps];
        saveAll(next);
        setDraft({
          company: '',
          role: '',
          status: 'Planned',
          priority: 'Medium',
          dateApplied: '',
          contact: '',
          notes: '',
          followUpDate: '',
        });
      };

      const update = (id, field, value) => {
        const next = apps.map((a) =>
          a.id === id ? { ...a, [field]: value } : a
        );
        saveAll(next);
      };

      const remove = (id) => {
        const next = apps.filter((a) => a.id !== id);
        saveAll(next);
      };

      return (
        <div>
          {/* View Toggle */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">Application Tracker</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1 rounded-md text-sm font-semibold ${
                  viewMode === 'kanban'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
              >
                Kanban View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-sm font-semibold ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
              >
                List View
              </button>
            </div>
          </div>

          {/* Add New Application Form */}
          <div className="p-4 border rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-4">
            <div className="font-semibold mb-2">Add New Application</div>
            <div className="grid sm:grid-cols-2 gap-2 mb-2">
              <input
                className="px-3 py-2 border rounded-md bg-white dark:bg-slate-800"
                placeholder="Company *"
                value={draft.company}
                onChange={(e) =>
                  setDraft({ ...draft, company: e.target.value })
                }
              />
              <input
                className="px-3 py-2 border rounded-md bg-white dark:bg-slate-800"
                placeholder="Role / Position *"
                value={draft.role}
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
              />
            </div>
            <div className="grid sm:grid-cols-4 gap-2 mb-2">
              <select
                className="px-3 py-2 border rounded-md bg-white dark:bg-slate-800"
                value={draft.status}
                onChange={(e) => setDraft({ ...draft, status: e.target.value })}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <select
                className="px-3 py-2 border rounded-md bg-white dark:bg-slate-800"
                value={draft.priority}
                onChange={(e) =>
                  setDraft({ ...draft, priority: e.target.value })
                }
              >
                {PRIORITY_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p} Priority
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="px-3 py-2 border rounded-md bg-white dark:bg-slate-800"
                placeholder="Date Applied"
                value={draft.dateApplied}
                onChange={(e) =>
                  setDraft({ ...draft, dateApplied: e.target.value })
                }
              />
              <input
                type="date"
                className="px-3 py-2 border rounded-md bg-white dark:bg-slate-800"
                placeholder="Follow-up Date"
                value={draft.followUpDate}
                onChange={(e) =>
                  setDraft({ ...draft, followUpDate: e.target.value })
                }
              />
            </div>
            <div className="grid sm:grid-cols-1 gap-2 mb-2">
              <input
                className="px-3 py-2 border rounded-md bg-white dark:bg-slate-800"
                placeholder="Contact (email or phone)"
                value={draft.contact}
                onChange={(e) =>
                  setDraft({ ...draft, contact: e.target.value })
                }
              />
              <textarea
                className="px-3 py-2 border rounded-md bg-white dark:bg-slate-800"
                rows={2}
                placeholder="Notes (optional)"
                value={draft.notes}
                onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
              />
            </div>
            <button
              onClick={add}
              className="px-4 py-2 rounded-md bg-teal-600 text-white font-semibold hover:bg-teal-700"
              disabled={!draft.company.trim() || !draft.role.trim()}
            >
              Add Application
            </button>
          </div>

          {/* Kanban View */}
          {viewMode === 'kanban' && (
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3 workforce-kanban">
              {STATUS_OPTIONS.map((col) => (
                <div
                  key={col}
                  className="p-3 border rounded-xl bg-white dark:bg-slate-800/70"
                >
                  <div className="font-bold mb-2 text-sm">
                    {col} ({apps.filter((a) => a.status === col).length})
                  </div>
                  <div className="space-y-2">
                    {apps
                      .filter((a) => a.status === col)
                      .map((a) => {
                        const priorityColor =
                          a.priority === 'High'
                            ? 'border-l-red-500'
                            : a.priority === 'Medium'
                            ? 'border-l-yellow-500'
                            : 'border-l-green-500';
                        return (
                          <div
                            key={a.id}
                            className={`p-2 border-l-4 border rounded-md bg-slate-50 dark:bg-slate-900/50 ${priorityColor}`}
                          >
                            <div className="text-sm font-semibold">
                              {a.role}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-300 mb-1">
                              {a.company}
                            </div>
                            {a.dateApplied && (
                              <div className="text-xs text-slate-500">
                                Applied: {a.dateApplied}
                              </div>
                            )}
                            {a.followUpDate && (
                              <div className="text-xs text-orange-600 dark:text-orange-400">
                                Follow-up: {a.followUpDate}
                              </div>
                            )}
                            <div className="flex items-center gap-1 mt-2">
                              <button
                                onClick={() =>
                                  setExpandedId(
                                    expandedId === a.id ? null : a.id
                                  )
                                }
                                className="px-2 py-1 rounded-md bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-xs"
                              >
                                {expandedId === a.id ? 'Hide' : 'Details'}
                              </button>
                              <button
                                onClick={() => remove(a.id)}
                                className="px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-xs"
                              >
                                Remove
                              </button>
                            </div>
                            {expandedId === a.id && (
                              <div className="mt-2 pt-2 border-t space-y-1">
                                <select
                                  className="w-full px-2 py-1 border rounded-md text-xs bg-white dark:bg-slate-800"
                                  value={a.status}
                                  onChange={(e) =>
                                    update(a.id, 'status', e.target.value)
                                  }
                                >
                                  {STATUS_OPTIONS.map((s) => (
                                    <option key={s} value={s}>
                                      {s}
                                    </option>
                                  ))}
                                </select>
                                {a.contact && (
                                  <div className="text-xs text-slate-600 dark:text-slate-400">
                                    Contact: {a.contact}
                                  </div>
                                )}
                                {a.notes && (
                                  <div className="text-xs text-slate-600 dark:text-slate-400 italic">
                                    Notes: {a.notes}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    {apps.filter((a) => a.status === col).length === 0 && (
                      <div className="text-xs text-slate-500">No items</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-2">
              {apps.length === 0 ? (
                <div className="text-center text-slate-500 py-8">
                  No applications yet. Add one above!
                </div>
              ) : (
                apps.map((a) => {
                  const priorityBadge =
                    a.priority === 'High'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : a.priority === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
                  return (
                    <div
                      key={a.id}
                      className="p-3 border rounded-xl bg-white dark:bg-slate-800/70"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="font-bold">{a.role}</div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${priorityBadge}`}
                            >
                              {a.priority}
                            </span>
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-300">
                            {a.company}
                          </div>
                          <div className="flex gap-4 mt-2 text-xs text-slate-500">
                            {a.dateApplied && (
                              <span>Applied: {a.dateApplied}</span>
                            )}
                            {a.followUpDate && (
                              <span className="text-orange-600 dark:text-orange-400">
                                Follow-up: {a.followUpDate}
                              </span>
                            )}
                            {a.contact && <span>Contact: {a.contact}</span>}
                          </div>
                          {a.notes && (
                            <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 italic">
                              {a.notes}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            className="px-2 py-1 border rounded-md text-sm bg-white dark:bg-slate-800"
                            value={a.status}
                            onChange={(e) =>
                              update(a.id, 'status', e.target.value)
                            }
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => remove(a.id)}
                            className="px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-sm font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      );
    }

    // ---------------- End Workforce Hub ----------------

    // Collapsible Math Practice Tools Suite (StartScreen embedded version)
    function MathPracticeCollapsibleSuite({ theme }) {
      const { useState, useEffect, useRef } = React;
      const isDarkMode = document.documentElement.classList.contains('dark');
      const [panels, setPanels] = useState({
        stepSolver: false,
        centralTendency: false,
        graphing: false,
        geometry: false,
      });
      const graphRef = useRef(null);
      const geometryRef = useRef(null);
      const graphInstanceRef = useRef(null);
      const geometryInstanceRef = useRef(null);

      const toggle = (key) => setPanels((p) => ({ ...p, [key]: !p[key] }));

      useEffect(() => {
        if (!panels.graphing || !graphRef.current) return;
        if (graphInstanceRef.current) return;
        let cancelled = false;
        (async () => {
          try {
            const mod = await import('/graphing/GraphCanvas.js');
            if (cancelled) return;
            const GraphCanvas = mod && (mod.default || mod.GraphCanvas);
            if (typeof GraphCanvas === 'function') {
              graphInstanceRef.current = new GraphCanvas(graphRef.current, {
                theme: isDarkMode ? 'dark' : 'light',
              });
            }
          } catch (e) {
            console.warn('Graphing tool failed to load:', e);
          }
        })();
        return () => {
          cancelled = true;
        };
      }, [panels.graphing, isDarkMode]);

      useEffect(() => {
        if (!panels.geometry || !geometryRef.current) return;
        if (geometryInstanceRef.current) return;
        let cancelled = false;
        (async () => {
          try {
            const mod = await import('/geometry/GeometryCanvas.js');
            if (cancelled) return;
            const GeometryCanvas = mod && (mod.default || mod.GeometryCanvas);
            if (typeof GeometryCanvas === 'function') {
              geometryInstanceRef.current = new GeometryCanvas(
                geometryRef.current,
                {
                  theme: isDarkMode ? 'dark' : 'light',
                }
              );
            }
          } catch (e) {
            console.warn('Geometry tool failed to load:', e);
          }
        })();
        return () => {
          cancelled = true;
        };
      }, [panels.geometry, isDarkMode]);

      const sectionStyle = {
        borderColor: isDarkMode
          ? 'rgba(255,255,255,0.25)'
          : 'rgba(148,163,184,0.35)',
        background: isDarkMode ? 'rgba(30,41,59,0.4)' : '#ffffff',
      };

      const headerBtn = (label, key) => (
        <button
          type="button"
          onClick={() => toggle(key)}
          className="flex w-full items-center justify-between px-4 py-3 font-semibold rounded-lg border transition hover:bg-sky-50 dark:hover:bg-slate-700"
          style={{
            borderColor: isDarkMode
              ? 'rgba(255,255,255,0.25)'
              : 'rgba(148,163,184,0.35)',
            background: isDarkMode ? 'rgba(30,41,59,0.3)' : '#f8fafc',
          }}
          aria-expanded={panels[key]}
        >
          <span>{label}</span>
          <span className="text-xs opacity-70">
            {panels[key] ? 'Hide' : 'Show'}
          </span>
        </button>
      );

      return (
        <div
          className="mt-4 space-y-4 p-4 rounded-lg border"
          style={sectionStyle}
        >
          <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-100">
            Math Practice Tools
          </h3>
          <div className="space-y-2">
            {headerBtn('TI-30XS Calculator Practice', 'calculator')}
            {panels.calculator && (
              <div className="pt-2">
                <Ti30xsPracticeTool />
              </div>
            )}
          </div>
          <div className="space-y-2">
            {headerBtn('Step-by-Step Solver', 'stepSolver')}
            {panels.stepSolver && window.MathStepPracticeTool && (
              <div className="pt-2">
                <window.MathStepPracticeTool theme={theme} />
              </div>
            )}
          </div>
          <div className="space-y-2">
            {headerBtn(
              'Mean / Median / Mode / Range Practice',
              'centralTendency'
            )}
            {panels.centralTendency && window.MathCentralTendencyTool && (
              <div className="pt-2">
                <window.MathCentralTendencyTool theme={theme} />
              </div>
            )}
          </div>
          <div className="space-y-2">
            {headerBtn('Graphing Workspace', 'graphing')}
            {panels.graphing && (
              <div className="pt-2 rounded-lg border p-3" style={sectionStyle}>
                <div ref={graphRef} style={{ minHeight: 320 }} />
              </div>
            )}
          </div>
          <div className="space-y-2">
            {headerBtn('Geometry Playground', 'geometry')}
            {panels.geometry && (
              <div className="pt-2 rounded-lg border p-3" style={sectionStyle}>
                <div ref={geometryRef} style={{ minHeight: 320 }} />
              </div>
            )}
          </div>
        </div>
      );
    }

    // ==================== TI-30XS CALCULATOR PRACTICE TOOL ====================

    // Static missions for guided practice
    const TI30XS_MISSIONS = [
      {
        id: 'basic_arithmetic',
        title: 'Basic Arithmetic',
        goalDescription: 'Calculate 25 + 17',
        targetExpression: '25+17',
        targetResult: 42,
        stepsHint: [
          'Press 2, then 5',
          'Press the + key',
          'Press 1, then 7',
          'Press = to see the result',
        ],
        tolerance: 0.001,
      },
      {
        id: 'frac_add_1',
        title: 'Add Two Fractions',
        goalDescription: 'Use the fraction key to compute 3/4 + 1/2',
        targetExpression: '3/4+1/2',
        targetResult: 1.25,
        stepsHint: [
          'Press 3, then n/d, then 4',
          'Press +',
          'Press 1, then n/d, then 2',
          'Press = to see the result',
          'The result will show as 5/4 or 1.25',
        ],
        tolerance: 0.001,
      },
      {
        id: 'square_root_1',
        title: 'Square Root',
        goalDescription: 'Find the square root of 144',
        targetExpression: '√(144)',
        targetResult: 12,
        stepsHint: ['Press √', 'Enter 144', 'Press = to compute'],
        tolerance: 0.001,
      },
      {
        id: 'power_1',
        title: 'Using the Power Key',
        goalDescription: 'Compute 2^5 using the ^ key',
        targetExpression: '2^5',
        targetResult: 32,
        stepsHint: ['Press 2', 'Press ^', 'Press 5', 'Press = to compute'],
        tolerance: 0.001,
      },
      {
        id: 'square_key',
        title: 'Using x² Key',
        goalDescription: 'Calculate 9 squared',
        targetExpression: '9²',
        targetResult: 81,
        stepsHint: ['Press 9', 'Press x² key', 'Press = to see the result'],
        tolerance: 0.001,
      },
      {
        id: 'percent_1',
        title: 'Percentage Calculation',
        goalDescription: 'Convert 25% to decimal',
        targetExpression: '25%',
        targetResult: 0.25,
        stepsHint: ['Press 2, then 5', 'Press % key', 'The result shows 0.25'],
        tolerance: 0.001,
      },
      {
        id: 'parentheses_1',
        title: 'Using Parentheses',
        goalDescription: 'Calculate (3 + 5) × 2',
        targetExpression: '(3+5)*2',
        targetResult: 16,
        stepsHint: [
          'Press (',
          'Press 3, then +, then 5',
          'Press )',
          'Press ×, then 2',
          'Press = to compute',
        ],
        tolerance: 0.001,
      },
      {
        id: 'negative_num',
        title: 'Negative Numbers',
        goalDescription: 'Calculate -15 + 20',
        targetExpression: '-15+20',
        targetResult: 5,
        stepsHint: [
          'Press (−) key for negative',
          'Press 1, then 5',
          'Press +',
          'Press 2, then 0',
          'Press = to compute',
        ],
        tolerance: 0.001,
      },
      {
        id: 'mixed_operations',
        title: 'Order of Operations',
        goalDescription: 'Calculate 10 + 2 × 5',
        targetExpression: '10+2*5',
        targetResult: 20,
        stepsHint: [
          'Press 1, then 0',
          'Press +',
          'Press 2, then ×, then 5',
          'Press = (calculator follows order of operations)',
          'Result should be 20, not 60',
        ],
        tolerance: 0.001,
      },
    ];

    // ---- Lightweight Expression Tree + Renderer for TI-30XS ----
    function uid() {
      return Math.random().toString(36).slice(2, 9);
    }

    function clone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }

    function makeNumberNode(value = '0') {
      return { id: uid(), type: 'number', value: String(value) };
    }

    function makeSequence(children = []) {
      return { id: uid(), type: 'seq', children };
    }

    function makeOp(op) {
      return { id: uid(), type: 'op', value: op };
    }

    function makeFraction() {
      return {
        id: uid(),
        type: 'fraction',
        numerator: makeSequence([]),
        denominator: makeSequence([]),
      };
    }

    function makePower() {
      return {
        id: uid(),
        type: 'power',
        base: makeSequence([]),
        exponent: makeSequence([]),
      };
    }

    function makeRoot() {
      return {
        id: uid(),
        type: 'root',
        index: null,
        radicand: makeSequence([]),
      };
    }

    function makeFunc(name) {
      return {
        id: uid(),
        type: 'function',
        value: name,
        argument: makeSequence([]),
      };
    }

    function makeVariable(name = 'x') {
      return { id: uid(), type: 'variable', value: name };
    }

    function seqInsertAt(seqNode, index, node) {
      seqNode.children.splice(index, 0, node);
    }

    class ExpressionTree {
      constructor(existing) {
        if (existing) {
          this.root = existing.root;
          this.cursor = existing.cursor;
        } else {
          this.root = makeSequence([]);
          this.cursor = { nodePath: [], position: 'seq', index: 0 };
        }
      }

      clone() {
        const c = new ExpressionTree();
        c.root = clone(this.root);
        c.cursor = clone(this.cursor);
        return c;
      }

      // Resolve a path of indexes to get a node reference
      getNodeByPath(path) {
        let node = this.root;
        for (const step of path) {
          if (!node) break;
          if (node.type === 'seq') node = node.children[step];
          else if (node.type === 'fraction')
            node = step === 'n' ? node.numerator : node.denominator;
          else if (node.type === 'power')
            node = step === 'b' ? node.base : node.exponent;
          else if (node.type === 'root') node = node.radicand;
          else if (node.type === 'function') node = node.argument;
        }
        return node;
      }

      // Insert helpers
      insertDigit(d) {
        const cur = this.cursor;
        const parent = this.getNodeByPath(cur.nodePath);
        if (parent.type !== 'seq') return;
        const left = parent.children[cur.index - 1];
        if (left && left.type === 'number') {
          left.value += String(d);
        } else {
          seqInsertAt(parent, cur.index, makeNumberNode(String(d)));
          cur.index += 1;
        }
      }

      insertDot() {
        const cur = this.cursor;
        const parent = this.getNodeByPath(cur.nodePath);
        if (parent.type !== 'seq') return;
        const left = parent.children[cur.index - 1];
        if (left && left.type === 'number' && !left.value.includes('.')) {
          left.value += '.';
        } else {
          seqInsertAt(parent, cur.index, makeNumberNode('0.'));
          cur.index += 1;
        }
      }

      insertOperator(op) {
        const cur = this.cursor;
        const parent = this.getNodeByPath(cur.nodePath);
        if (parent.type !== 'seq') return;
        seqInsertAt(parent, cur.index, makeOp(op));
        cur.index += 1;
      }

      insertComma() {
        this.insertOperator(',');
      }

      insertTemplateFraction() {
        const cur = this.cursor;
        const parent = this.getNodeByPath(cur.nodePath);
        if (parent.type !== 'seq') return;
        const frac = makeFraction();
        seqInsertAt(parent, cur.index, frac);
        // move cursor into numerator
        cur.nodePath = [...cur.nodePath, cur.index, 'n'];
        cur.index = 0;
      }

      insertTemplatePower(expVal = null) {
        const cur = this.cursor;
        const parent = this.getNodeByPath(cur.nodePath);
        if (parent.type !== 'seq') return;
        const pow = makePower();
        seqInsertAt(parent, cur.index, pow);
        // If last element is a number, move it into base
        const left = parent.children[cur.index - 1];
        if (left && left.type !== 'op') {
          // pull left into base
          parent.children.splice(cur.index - 1, 1);
          pow.base.children.push(left);
          cur.index -= 1;
        }
        if (expVal != null) {
          pow.exponent.children.push(makeNumberNode(String(expVal)));
          // place cursor after power
          cur.index += 1;
        } else {
          // move cursor into exponent
          cur.nodePath = [...cur.nodePath, cur.index, 'e'];
          cur.index = 0;
        }
      }

      insertTemplateRoot() {
        const cur = this.cursor;
        const parent = this.getNodeByPath(cur.nodePath);
        if (parent.type !== 'seq') return;
        const r = makeRoot();
        seqInsertAt(parent, cur.index, r);
        cur.nodePath = [...cur.nodePath, cur.index];
        cur.index = 0;
      }

      insertParenLeft() {
        this.insertOperator('(');
      }
      insertParenRight() {
        this.insertOperator(')');
      }

      insertFunction(name) {
        const cur = this.cursor;
        const parent = this.getNodeByPath(cur.nodePath);
        if (parent.type !== 'seq') return;
        const f = makeFunc(name);
        seqInsertAt(parent, cur.index, f);
        cur.nodePath = [...cur.nodePath, cur.index];
        cur.index = 0;
      }

      insertVariable(name = 'x') {
        const cur = this.cursor;
        const parent = this.getNodeByPath(cur.nodePath);
        if (parent.type !== 'seq') return;
        seqInsertAt(parent, cur.index, makeVariable(name));
        cur.index += 1;
      }

      moveCursorLeft() {
        const cur = this.cursor;
        const parent = this.getNodeByPath(cur.nodePath);
        if (parent.type !== 'seq') return;
        cur.index = Math.max(0, cur.index - 1);
      }
      moveCursorRight() {
        const cur = this.cursor;
        const parent = this.getNodeByPath(cur.nodePath);
        if (parent.type !== 'seq') return;
        cur.index = Math.min(parent.children.length, cur.index + 1);
      }
      moveCursorUp() {
        // If inside fraction denominator, go to numerator; if exponent, go to base end
        const p = this.cursor.nodePath;
        if (p.length >= 2 && p[p.length - 1] === 'd') {
          p[p.length - 1] = 'n';
          this.cursor.index = this.getNodeByPath(p).children.length;
        }
      }
      moveCursorDown() {
        const p = this.cursor.nodePath;
        if (p.length >= 2 && p[p.length - 1] === 'n') {
          p[p.length - 1] = 'd';
          this.cursor.index = this.getNodeByPath(p).children.length;
        }
      }

      deleteBackward() {
        const cur = this.cursor;
        const parent = this.getNodeByPath(cur.nodePath);
        if (parent.type !== 'seq') return;
        if (cur.index > 0) {
          const left = parent.children[cur.index - 1];
          if (left.type === 'number' && left.value.length > 1) {
            left.value = left.value.slice(0, -1);
          } else {
            parent.children.splice(cur.index - 1, 1);
            cur.index -= 1;
          }
        }
      }

      clear() {
        this.root = makeSequence([]);
        this.cursor = { nodePath: [], position: 'seq', index: 0 };
      }

      // Convert to JS eval string
      toEvalString(angle = 'DEG') {
        function splitArgs(seqNode) {
          const args = [];
          let cur = [];
          for (const ch of seqNode.children || []) {
            if (ch.type === 'op' && ch.value === ',') {
              args.push(cur);
              cur = [];
            } else {
              cur.push(ch);
            }
          }
          args.push(cur);
          return args;
        }
        function walk(node) {
          if (!node) return '';
          switch (node.type) {
            case 'number':
              return node.value;
            case 'variable':
              return node.value;
            case 'op':
              if (node.value === '×') return '*';
              if (node.value === '÷') return '/';
              if (node.value === '%') return '/100';
              return node.value;
            case 'seq':
              return node.children.map(walk).join('');
            case 'fraction':
              return `(${walk(node.numerator)})/(${walk(node.denominator)})`;
            case 'power':
              return `(${walk(node.base)})**(${walk(node.exponent)})`;
            case 'root':
              return `Math.sqrt(${walk(node.radicand)})`;
            case 'function': {
              const arg = walk(node.argument);
              if (
                node.value === 'sin' ||
                node.value === 'cos' ||
                node.value === 'tan'
              ) {
                const x =
                  angle === 'DEG' ? `((${arg})*Math.PI/180)` : `(${arg})`;
                return `Math.${node.value}(${x})`;
              }
              if (node.value === 'ln') return `Math.log(${arg})`;
              if (node.value === 'log') return `(Math.log(${arg})/Math.LN10)`;
              if (node.value === 'exp') return `Math.exp(${arg})`;
              if (node.value === 'fact') {
                return `(()=>{const n=${arg}|0;let r=1;for(let i=2;i<=n;i++)r*=i;return r;})()`;
              }
              if (node.value === 'nCr' || node.value === 'nPr') {
                const parts = splitArgs(node.argument).map((seq) =>
                  walk({ type: 'seq', children: seq })
                );
                const a = parts[0] || '0';
                const b = parts[1] || '0';
                const fact = `(n=>{n=n|0;let r=1;for(let i=2;i<=n;i++)r*=i;return r;})`;
                if (node.value === 'nCr') {
                  return `(${fact})(${a})/(((${fact})(${b}))*(${fact})((${a})-(${b})))`;
                } else {
                  return `(${fact})(${a})/((${fact})((${a})-(${b})))`;
                }
              }
              return `${node.value}(${arg})`;
            }
            default:
              return '';
          }
        }
        return walk(this.root);
      }

      toPlainText() {
        function walk(node) {
          if (!node) return '';
          switch (node.type) {
            case 'number':
            case 'variable':
              return node.value;
            case 'op':
              return node.value;
            case 'seq':
              return node.children.map(walk).join('');
            case 'fraction':
              return `(${walk(node.numerator)})/(${walk(node.denominator)})`;
            case 'power':
              return `${walk(node.base)}^${walk(node.exponent)}`;
            case 'root':
              return `√(${walk(node.radicand)})`;
            case 'function':
              return `${node.value}(${walk(node.argument)})`;
            default:
              return '';
          }
        }
        return walk(this.root);
      }
    }

    function GCD(a, b) {
      a = Math.abs(a);
      b = Math.abs(b);
      while (b) {
        const t = b;
        b = a % b;
        a = t;
      }
      return a || 1;
    }

    function decimalToFraction(x, tol = 1e-10) {
      if (!isFinite(x)) return null;
      let sign = x < 0 ? -1 : 1;
      x = Math.abs(x);
      let numerator = 1,
        denominator = 1,
        best = x,
        bestN = 1,
        bestD = 1;
      for (let d = 1; d <= 10000; d++) {
        const n = Math.round(x * d);
        const val = Math.abs(n / d - x);
        if (val < best) {
          best = val;
          bestN = n;
          bestD = d;
        }
        if (best < tol) break;
      }
      const g = GCD(bestN, bestD);
      return { n: sign * (bestN / g), d: bestD / g };
    }

    function renderExprNode(node, cursor) {
      if (!node) return null;
      const isCursorHere = false; // simplified visual, cursor handled by caret elements below
      switch (node.type) {
        case 'number':
        case 'op':
        case 'variable':
          return <span className="mx-0.5">{node.value}</span>;
        case 'seq': {
          return (
            <span>
              {node.children.map((ch, i) => (
                <span key={ch.id} className="inline-flex items-center">
                  {renderExprNode(ch, cursor)}
                </span>
              ))}
              {/* caret at end of sequence */}
            </span>
          );
        }
        case 'fraction':
          return (
            <span className="inline-flex flex-col items-center mx-0.5 align-middle">
              <span className="border-b border-slate-900 px-0.5">
                {renderExprNode(node.numerator, cursor)}
              </span>
              <span className="px-0.5">
                {renderExprNode(node.denominator, cursor)}
              </span>
            </span>
          );
        case 'power':
          return (
            <span className="inline-flex items-start">
              {renderExprNode(node.base, cursor)}
              <sup className="align-super text-[0.6em] ml-0.5">
                {renderExprNode(node.exponent, cursor)}
              </sup>
            </span>
          );
        case 'root':
          return (
            <span className="inline-flex items-center">
              <span className="mr-0.5">√</span>
              <span className="border-b border-transparent">
                {renderExprNode(node.radicand, cursor)}
              </span>
            </span>
          );
        case 'function':
          return (
            <span>
              <span className="mr-0.5">{node.value}</span>
              <span>(</span>
              {renderExprNode(node.argument, cursor)}
              <span>)</span>
            </span>
          );
        default:
          return null;
      }
    }

    // Core TI-30XS Calculator Component
    function Ti30xsCalculator({
      onExpressionChange,
      onResultChange,
      onKeyPress,
    }) {
      const [display, setDisplay] = useState('0');
      const [currentEntry, setCurrentEntry] = useState('');
      const [lastResult, setLastResult] = useState(null);
      const [mode, setMode] = useState('DEG'); // DEG or RAD
      const [showSecondFunctions, setShowSecondFunctions] = useState(false);
      const [error, setError] = useState(false);
      const [expr, setExpr] = useState(() => new ExpressionTree());
      const [history, setHistory] = useState([]);
      const [resultText, setResultText] = useState('');
      const [resultAsFraction, setResultAsFraction] = useState(false);
      const [activePanel, setActivePanel] = useState(null); // 'DATA' | 'STAT' | 'TABLE'
      const [lists, setLists] = useState({ L1: [], L2: [], L3: [] });
      // --- New token-based model (initial scaffolding) ---
      const [tokens, setTokens] = useState([]); // top-level tokens
      const [cursor, setCursor] = useState({
        scope: 'top',
        index: 0,
        part: null,
      }); // scope: 'top' | 'fraction'; part for fractions
      const [cursorIndex, setCursorIndex] = useState(0); // legacy linear cursor (will phase out)

      // Simple tokenizer helpers (numbers & ops only for now)
      const isDigit = (ch) => /[0-9]/.test(ch);
      const isOpChar = (ch) => /[+\-×÷^%(),]/.test(ch);

      const flattenTokensToEntry = (toks) => {
        return toks
          .map((t) => {
            if (t.type === 'number') return t.value;
            if (t.type === 'op') return t.value;
            if (t.type === 'symbol') return t.value;
            if (t.type === 'ans')
              return '(' + (lastResult != null ? lastResult : 0) + ')';
            if (t.type === 'func')
              return t.name + '(' + (t.argString || '') + ')';
            if (t.type === 'fraction') {
              const num = flattenTokensToEntry(t.numerator || []);
              const den = flattenTokensToEntry(t.denominator || []);
              if (t.isMixed) {
                const whole = t.whole || '0';
                return (
                  '(' +
                  whole +
                  '+(' +
                  (num || '0') +
                  ')/(' +
                  (den || '1') +
                  '))'
                );
              }
              return '(' + (num || '0') + ')/(' + (den || '1') + ')';
            }
            return '';
          })
          .join('');
      };

      const rebuildCurrentEntryFromTokens = (nextTokens) => {
        const flat = flattenTokensToEntry(nextTokens);
        setCurrentEntry(flat);
        setDisplay(flat || '0');
        if (onExpressionChange) onExpressionChange(flat);
      };

      const insertTokenAtCursor = (newToken) => {
        if (cursor.scope === 'top') {
          const before = tokens.slice(0, cursor.index);
          const after = tokens.slice(cursor.index);
          const next = [...before, newToken, ...after];
          setTokens(next);
          setCursor({ scope: 'top', index: cursor.index + 1, part: null });
          rebuildCurrentEntryFromTokens(next);
          return;
        }
        if (cursor.scope === 'fraction') {
          const fracTok = tokens[cursor.fractionIndex];
          if (!fracTok || fracTok.type !== 'fraction') return;
          const targetArr =
            cursor.part === 'numerator'
              ? fracTok.numerator
              : fracTok.denominator;
          const before = targetArr.slice(0, cursor.innerIndex);
          const after = targetArr.slice(cursor.innerIndex);
          const updatedArr = [...before, newToken, ...after];
          const updatedFrac = { ...fracTok, [cursor.part]: updatedArr };
          const nextTokens = tokens.slice();
          nextTokens[cursor.fractionIndex] = updatedFrac;
          setTokens(nextTokens);
          setCursor({ ...cursor, innerIndex: cursor.innerIndex + 1 });
          rebuildCurrentEntryFromTokens(nextTokens);
        }
      };

      const tryMergeNumberToken = (ch) => {
        if (!isDigit(ch) && ch !== '.') return false;
        const idx = cursor.index - 1;
        if (idx >= 0 && tokens[idx] && tokens[idx].type === 'number') {
          const nextTokens = tokens.slice();
          nextTokens[idx] = {
            ...nextTokens[idx],
            value: nextTokens[idx].value + ch,
          };
          setTokens(nextTokens);
          rebuildCurrentEntryFromTokens(nextTokens);
          return true;
        }
        return false;
      };

      // Legacy linear insertion; also mirror into tokens scaffolding
      const insertAtCursor = (text) => {
        // Linear model
        const before = currentEntry.slice(0, cursorIndex);
        const after = currentEntry.slice(cursorIndex);
        const nextEntry = before + text + after;
        const nextCursor = cursorIndex + text.length;
        setCurrentEntry(nextEntry);
        setCursorIndex(nextCursor);
        setDisplay(nextEntry || '0');
        if (onExpressionChange) onExpressionChange(nextEntry);
        // Token mirror (character by character)
        for (const ch of text) {
          if (tryMergeNumberToken(ch) && cursor.scope === 'top') {
            continue;
          }
          if ((isDigit(ch) || ch === '.') && cursor.scope === 'top') {
            insertTokenAtCursor({ type: 'number', value: ch });
          } else if (isOpChar(ch)) {
            insertTokenAtCursor({ type: 'op', value: ch });
          } else if (ch === 'π') {
            insertTokenAtCursor({ type: 'symbol', value: 'π' });
          } else if (ch === '√') {
            insertTokenAtCursor({ type: 'func', name: 'sqrt', argString: '' });
          } else {
            insertTokenAtCursor({ type: 'symbol', value: ch });
          }
        }
      };

      const renderDisplayWithCursor = () => {
        // If tokens exist, render token-based view (simplified – flat with caret between tokens)
        if (tokens.length) {
          const parts = [];
          tokens.forEach((t, i) => {
            if (cursor.scope === 'top' && cursor.index === i) {
              parts.push(
                <span
                  key={'cursor-' + i}
                  className="inline-block w-[2px] h-[1.1em] bg-slate-900 dark:bg-emerald-50 animate-pulse"
                />
              );
            }
            if (t.type === 'fraction') {
              parts.push(
                <span
                  key={'frac-' + i}
                  className="inline-flex flex-col items-center mx-1"
                >
                  {t.isMixed && (
                    <span className="mb-0.5">{t.whole ? t.whole : '□'}</span>
                  )}
                  <span
                    className={
                      cursor.scope === 'fraction' &&
                      cursor.fractionIndex === i &&
                      cursor.part === 'numerator'
                        ? 'relative'
                        : ''
                    }
                  >
                    {(t.numerator || []).map((nt, ni) => (
                      <span key={'num' + i + '-' + ni}>
                        {nt.value || nt.name || nt.type}
                      </span>
                    ))}
                    {cursor.scope === 'fraction' &&
                      cursor.fractionIndex === i &&
                      cursor.part === 'numerator' &&
                      cursor.innerIndex === (t.numerator || []).length && (
                        <span className="inline-block w-[2px] h-[1.1em] bg-slate-900 dark:bg-emerald-50 animate-pulse" />
                      )}
                  </span>
                  <span className="w-full border-t border-slate-900 dark:border-emerald-50 my-0.5" />
                  <span
                    className={
                      cursor.scope === 'fraction' &&
                      cursor.fractionIndex === i &&
                      cursor.part === 'denominator'
                        ? 'relative'
                        : ''
                    }
                  >
                    {(t.denominator || []).map((dt, di) => (
                      <span key={'den' + i + '-' + di}>
                        {dt.value || dt.name || dt.type}
                      </span>
                    ))}
                    {cursor.scope === 'fraction' &&
                      cursor.fractionIndex === i &&
                      cursor.part === 'denominator' &&
                      cursor.innerIndex === (t.denominator || []).length && (
                        <span className="inline-block w-[2px] h-[1.1em] bg-slate-900 dark:bg-emerald-50 animate-pulse" />
                      )}
                  </span>
                </span>
              );
            } else {
              parts.push(
                <span key={'tok-' + i} className="mx-0.5">
                  {t.type === 'func'
                    ? t.name + '(' + (t.argString || '') + ')'
                    : t.value}
                </span>
              );
            }
          });
          if (cursor.scope === 'top' && cursor.index === tokens.length) {
            parts.push(
              <span
                key={'cursor-end'}
                className="inline-block w-[2px] h-[1.1em] bg-slate-900 dark:bg-emerald-50 animate-pulse"
              />
            );
          }
          return <span className="whitespace-pre-wrap break-all">{parts}</span>;
        }
        // Fallback to linear string model
        const entry = currentEntry || '';
        const before = entry.slice(0, cursorIndex);
        const after = entry.slice(cursorIndex);
        return (
          <span className="whitespace-pre-wrap break-all">
            {before}
            <span className="inline-block w-[2px] h-[1.1em] bg-slate-900 dark:bg-emerald-50 animate-pulse"></span>
            {after}
          </span>
        );
      };

      // Helper to safely evaluate expressions
      const evaluateExpression = (exprStr) => {
        try {
          const result = Function('"use strict"; return (' + exprStr + ')')();

          if (isNaN(result) || !isFinite(result)) {
            throw new Error('Invalid result');
          }

          return result;
        } catch (e) {
          return NaN;
        }
      };
      const handleKeyClick = (keyId) => {
        setError(false);
        onKeyPress && onKeyPress(keyId);
        // Full reset
        if (keyId === 'ON' || keyId === 'AC') {
          setTokens([]);
          setCursor({ scope: 'top', index: 0, part: null });
          setCurrentEntry('');
          setCursorIndex(0);
          setDisplay('0');
          setLastResult(null);
          setShowSecondFunctions(false);
          setResultText('');
          setActivePanel(null);
          onExpressionChange && onExpressionChange('');
          return;
        }
        // Clear line only
        if (keyId === 'CLEAR_LINE') {
          setTokens([]);
          setCursor({ scope: 'top', index: 0, part: null });
          setCurrentEntry('');
          setCursorIndex(0);
          setDisplay('0');
          onExpressionChange && onExpressionChange('');
          return;
        }
        // Second function toggle
        if (keyId === 'SECOND' || keyId === '2ND') {
          setShowSecondFunctions(!showSecondFunctions);
          return;
        }
        // Mode toggle
        if (keyId === 'MODE') {
          setMode(mode === 'DEG' ? 'RAD' : 'DEG');
          return;
        }
        // Panel toggles
        if (['DATA', 'STAT', 'ANGLE', 'PRB'].includes(keyId)) {
          const panel = keyId;
          setActivePanel(activePanel === panel ? null : panel);
          return;
        }

        // Arrow navigation
        if (keyId === 'ARROW_LEFT') {
          if (cursor.scope === 'top') {
            if (
              cursor.index > 0 &&
              tokens[cursor.index - 1]?.type === 'fraction'
            ) {
              const f = tokens[cursor.index - 1];
              setCursor({
                scope: 'fraction',
                fractionIndex: cursor.index - 1,
                part: 'denominator',
                innerIndex: (f.denominator || []).length,
              });
            } else {
              setCursor({
                scope: 'top',
                index: Math.max(0, cursor.index - 1),
                part: null,
              });
            }
          } else if (cursor.scope === 'fraction') {
            if (cursor.innerIndex > 0) {
              setCursor({ ...cursor, innerIndex: cursor.innerIndex - 1 });
            } else if (cursor.part === 'denominator') {
              const f = tokens[cursor.fractionIndex];
              setCursor({
                scope: 'fraction',
                fractionIndex: cursor.fractionIndex,
                part: 'numerator',
                innerIndex: (f.numerator || []).length,
              });
            } else {
              setCursor({
                scope: 'top',
                index: cursor.fractionIndex,
                part: null,
              });
            }
          }
          return;
        }
        if (keyId === 'ARROW_RIGHT') {
          if (cursor.scope === 'top') {
            if (
              cursor.index < tokens.length &&
              tokens[cursor.index]?.type === 'fraction'
            ) {
              setCursor({
                scope: 'fraction',
                fractionIndex: cursor.index,
                part: 'numerator',
                innerIndex: 0,
              });
            } else {
              setCursor({
                scope: 'top',
                index: Math.min(tokens.length, cursor.index + 1),
                part: null,
              });
            }
          } else if (cursor.scope === 'fraction') {
            const f = tokens[cursor.fractionIndex];
            const arr =
              cursor.part === 'numerator'
                ? f.numerator || []
                : f.denominator || [];
            if (cursor.innerIndex < arr.length) {
              setCursor({ ...cursor, innerIndex: cursor.innerIndex + 1 });
            } else if (cursor.part === 'numerator') {
              setCursor({
                scope: 'fraction',
                fractionIndex: cursor.fractionIndex,
                part: 'denominator',
                innerIndex: 0,
              });
            } else {
              setCursor({
                scope: 'top',
                index: cursor.fractionIndex + 1,
                part: null,
              });
            }
          }
          return;
        }
        if (keyId === 'ARROW_UP' || keyId === 'ARROW_DOWN') {
          if (cursor.scope === 'fraction') {
            const targetPart =
              keyId === 'ARROW_UP' ? 'numerator' : 'denominator';
            const f = tokens[cursor.fractionIndex];
            const targetArr =
              targetPart === 'numerator'
                ? f.numerator || []
                : f.denominator || [];
            const desired = Math.min(cursor.innerIndex, targetArr.length);
            setCursor({
              scope: 'fraction',
              fractionIndex: cursor.fractionIndex,
              part: targetPart,
              innerIndex: desired,
            });
          }
          return;
        }

        // Token deletion
        if (keyId === 'DEL') {
          if (cursor.scope === 'top') {
            if (cursor.index > 0) {
              const next = tokens.slice();
              next.splice(cursor.index - 1, 1);
              setTokens(next);
              setCursor({ scope: 'top', index: cursor.index - 1, part: null });
              rebuildCurrentEntryFromTokens(next);
            }
          } else if (cursor.scope === 'fraction') {
            const f = tokens[cursor.fractionIndex];
            if (!f) return;
            const arr =
              cursor.part === 'numerator'
                ? f.numerator || []
                : f.denominator || [];
            if (cursor.innerIndex > 0) {
              const updated = arr.slice();
              updated.splice(cursor.innerIndex - 1, 1);
              const newFrac = { ...f, [cursor.part]: updated };
              const next = tokens.slice();
              next[cursor.fractionIndex] = newFrac;
              setTokens(next);
              setCursor({ ...cursor, innerIndex: cursor.innerIndex - 1 });
              rebuildCurrentEntryFromTokens(next);
            } else if (cursor.part === 'denominator') {
              setCursor({
                scope: 'fraction',
                fractionIndex: cursor.fractionIndex,
                part: 'numerator',
                innerIndex: 0,
              });
            } else {
              // numerator start
              if (
                (f.numerator || []).length === 0 &&
                (f.denominator || []).length === 0
              ) {
                const next = tokens.slice();
                next.splice(cursor.fractionIndex, 1);
                setTokens(next);
                setCursor({
                  scope: 'top',
                  index: cursor.fractionIndex,
                  part: null,
                });
                rebuildCurrentEntryFromTokens(next);
              } else {
                setCursor({
                  scope: 'top',
                  index: cursor.fractionIndex,
                  part: null,
                });
              }
            }
          }
          return;
        }

        // Fraction insertion
        if (keyId === 'FRAC') {
          let numerator = [];
          let denominator = [];
          if (cursor.scope === 'top' && cursor.index > 0) {
            const prev = tokens[cursor.index - 1];
            if (prev && prev.type === 'number') {
              numerator = [prev];
              const next = tokens.slice();
              next.splice(cursor.index - 1, 1, {
                type: 'fraction',
                numerator,
                denominator,
              });
              setTokens(next);
              setCursor({
                scope: 'fraction',
                fractionIndex: cursor.index - 1,
                part: 'denominator',
                innerIndex: 0,
              });
              rebuildCurrentEntryFromTokens(next);
              return;
            }
          }
          const fracTok = { type: 'fraction', numerator, denominator };
          insertTokenAtCursor(fracTok);
          setCursor({
            scope: 'fraction',
            fractionIndex: cursor.index - 1,
            part: 'numerator',
            innerIndex: 0,
          });
          return;
        }

        // Mixed fraction placeholder
        if (keyId === 'FRAC_TEMPLATE') {
          // Mixed fraction: use previous number as whole if available
          let whole = '';
          if (cursor.scope === 'top' && cursor.index > 0) {
            const prev = tokens[cursor.index - 1];
            if (prev && prev.type === 'number') {
              whole = prev.value;
              const next = tokens.slice();
              next.splice(cursor.index - 1, 1, {
                type: 'fraction',
                isMixed: true,
                whole,
                numerator: [],
                denominator: [],
              });
              setTokens(next);
              setCursor({
                scope: 'fraction',
                fractionIndex: cursor.index - 1,
                part: 'numerator',
                innerIndex: 0,
              });
              rebuildCurrentEntryFromTokens(next);
              return;
            }
          }
          const fracTok = {
            type: 'fraction',
            isMixed: true,
            whole,
            numerator: [],
            denominator: [],
          };
          insertTokenAtCursor(fracTok);
          setCursor({
            scope: 'fraction',
            fractionIndex: cursor.index - 1,
            part: 'numerator',
            innerIndex: 0,
          });
          return;
        }

        // Simple character insertions (digits & ops)
        if (/^DIGIT_\d$/.test(keyId) || /^[0-9]$/.test(keyId)) {
          const d = keyId.replace('DIGIT_', '');
          insertAtCursor(d);
          return;
        }
        if (keyId === 'DOT') {
          insertAtCursor('.');
          return;
        }
        if (keyId === 'ADD') {
          insertAtCursor('+');
          return;
        }
        if (keyId === 'SUBTRACT') {
          insertAtCursor('-');
          return;
        }
        if (keyId === 'MULTIPLY') {
          insertAtCursor('×');
          return;
        }
        if (keyId === 'DIVIDE') {
          insertAtCursor('÷');
          return;
        }
        if (keyId === 'LPAREN') {
          insertAtCursor('(');
          return;
        }
        if (keyId === 'RPAREN') {
          insertAtCursor(')');
          return;
        }
        if (keyId === 'PI') {
          insertAtCursor('π');
          return;
        }
        if (keyId === 'NEGATIVE') {
          insertAtCursor('-');
          return;
        }
        if (keyId === 'PERCENT') {
          insertAtCursor('%');
          return;
        }
        if (keyId === 'COMMA') {
          insertAtCursor(',');
          return;
        }
        if (keyId === 'SQUARE') {
          insertAtCursor('^2');
          return;
        }
        if (keyId === 'POWER') {
          insertAtCursor('^');
          return;
        }
        if (keyId === 'SQRT') {
          insertAtCursor('√(');
          return;
        }
        if (keyId === 'FRAC_DEC_TOGGLE') {
          // Toggle result display fraction/decimal if lastResult exists
          if (lastResult != null) {
            const next = !resultAsFraction;
            setResultAsFraction(next);
            if (next) {
              const frac = decimalToFraction(lastResult);
              setResultText(frac ? `${frac.n}/${frac.d}` : String(lastResult));
            } else {
              setResultText(String(lastResult));
            }
          }
          return;
        }

        // Functions
        if (['SIN', 'COS', 'TAN', 'LOG', 'LN', 'EXP'].includes(keyId)) {
          const fnMap = {
            SIN: 'sin',
            COS: 'cos',
            TAN: 'tan',
            LOG: 'log',
            LN: 'ln',
            EXP: 'exp',
          };
          insertAtCursor(fnMap[keyId] + '(');
          return;
        }

        // Ans
        if (keyId === 'ANS') {
          if (lastResult !== null) {
            insertTokenAtCursor({ type: 'ans' });
            // rebuild handled in insertTokenAtCursor
          }
          return;
        }

        // Evaluate
        if (keyId === 'EQUALS' || keyId === 'ENTER') {
          try {
            let jsExpr = flattenTokensToEntry(tokens)
              .trim()
              .replace(/×/g, '*')
              .replace(/÷/g, '/')
              .replace(/π/g, String(Math.PI))
              .replace(/√\(/g, 'Math.sqrt(')
              .replace(/\^/g, '**')
              .replace(/(\d+\.?\d*)%/g, '($1/100)')
              .replace(/sin\(/g, 'SIN_(')
              .replace(/cos\(/g, 'COS_(')
              .replace(/tan\(/g, 'TAN_(')
              .replace(/log\(/g, 'LOG_(')
              .replace(/ln\(/g, 'LN_(')
              .replace(/exp\(/g, 'EXP_(');
            const opens = (jsExpr.match(/\(/g) || []).length;
            const closes = (jsExpr.match(/\)/g) || []).length;
            if (opens > closes) jsExpr += ')'.repeat(opens - closes);
            const result = Function(
              '"use strict";' +
                'const SIN_=(x)=>Math.sin(' +
                (mode === 'DEG' ? '(x*Math.PI/180)' : 'x') +
                ');' +
                'const COS_=(x)=>Math.cos(' +
                (mode === 'DEG' ? '(x*Math.PI/180)' : 'x') +
                ');' +
                'const TAN_=(x)=>Math.tan(' +
                (mode === 'DEG' ? '(x*Math.PI/180)' : 'x') +
                ');' +
                'const LOG_=(x)=> (Math.log10?Math.log10(x):Math.log(x)/Math.log(10));' +
                'const LN_=(x)=>Math.log(x);' +
                'const EXP_=(x)=>Math.exp(x);' +
                'return (' +
                jsExpr +
                ');'
            )();
            const raw = String(result);
            setDisplay(raw);
            setLastResult(result);
            if (resultAsFraction) {
              const frac = decimalToFraction(result);
              setResultText(frac ? `${frac.n}/${frac.d}` : raw);
            } else {
              setResultText(raw);
            }
            setHistory(
              [{ expr: currentEntry, result: raw }, ...history].slice(0, 10)
            );
            onResultChange && onResultChange(result);
            // Replace tokens with single result token
            setTokens([{ type: 'number', value: raw }]);
            setCursor({ scope: 'top', index: 1, part: null });
            setCurrentEntry(raw);
            setCursorIndex(raw.length);
          } catch (e) {
            setDisplay('Error');
            setError(true);
          }
          return;
        }

        console.log('Key not yet implemented:', keyId);
      };

      return (
        <div className="ti30xs-calculator bg-gradient-to-br from-slate-700 to-slate-900 p-6 rounded-2xl shadow-2xl max-w-md mx-auto border-4 border-slate-800">
          {/* Display */}
          <div className="ti30xs-display bg-emerald-100 dark:bg-emerald-900 text-slate-900 dark:text-emerald-50 border-4 border-slate-600 rounded-lg p-3 mb-4 shadow-inner min-h-[110px] font-mono">
            <div className="flex justify-between text-[10px] mb-1">
              <span>{mode}</span>
              <span>
                {showSecondFunctions ? '2nd' : ''}
                {activePanel ? ' • ' + activePanel : ''}
              </span>
            </div>
            <div className="text-[11px] truncate min-h-[1rem]">
              {history[0]?.expr || ''}
            </div>
            <div className="text-base min-h-[1.2rem] break-all">
              {renderDisplayWithCursor()}
            </div>
            <div className="text-base min-h-[1.2rem] text-right">
              {resultText}
            </div>
          </div>
          {/* Keypad - Refactored TI-30XS MultiView Layout */}
          <div className="space-y-2">
            {/* Row A */}
            <div className="grid grid-cols-6 gap-1.5">
              <CalcButton
                label="10ˣ"
                secondary="log"
                onClick={() => handleKeyClick('TEN_POW_X')}
              />
              <CalcButton
                label="log"
                secondary="10ˣ"
                onClick={() => handleKeyClick('LOG')}
              />
              <CalcButton
                label="∠"
                secondary="DMS"
                onClick={() => handleKeyClick('ANGLE')}
              />
              <CalcButton
                label="prb"
                secondary="!"
                onClick={() => handleKeyClick('PRB')}
              />
              <CalcButton
                label="stat"
                secondary="list"
                onClick={() => handleKeyClick('STAT')}
              />
              <CalcButton
                label="data"
                secondary="clr"
                onClick={() => handleKeyClick('DATA')}
              />
            </div>
            {/* Row B */}
            <div className="grid grid-cols-6 gap-1.5">
              <CalcButton
                label="eˣ"
                secondary="ln"
                onClick={() => handleKeyClick('EXP')}
              />
              <CalcButton
                label="ln"
                secondary="eˣ"
                onClick={() => handleKeyClick('LN')}
              />
              <CalcButton
                label="x10ⁿ"
                secondary="ENG"
                onClick={() => handleKeyClick('SCI_NOTATION')}
              />
              <CalcButton
                label="sin"
                secondary="sin⁻¹"
                onClick={() => handleKeyClick('SIN')}
              />
              <CalcButton
                label="cos"
                secondary="cos⁻¹"
                onClick={() => handleKeyClick('COS')}
              />
              <CalcButton
                label="tan"
                secondary="tan⁻¹"
                onClick={() => handleKeyClick('TAN')}
              />
            </div>
            {/* Row C */}
            <div className="grid grid-cols-5 gap-1.5">
              <CalcButton
                label="x²"
                secondary="√x"
                onClick={() => handleKeyClick('SQUARE')}
              />
              <CalcButton
                label="xʸ"
                secondary="ʸ√x"
                onClick={() => handleKeyClick('POWER')}
              />
              <CalcButton
                label="√"
                secondary="∛"
                onClick={() => handleKeyClick('SQRT')}
              />
              <CalcButton
                label="n/d"
                secondary="U n/d"
                onClick={() => handleKeyClick('FRAC')}
              />
              <CalcButton
                label="f↔d"
                secondary="table"
                onClick={() => handleKeyClick('FRAC_DEC_TOGGLE')}
              />
            </div>
            {/* Row D */}
            <div className="grid grid-cols-5 gap-1.5">
              <CalcButton label="x⁻¹" onClick={() => handleKeyClick('INV')} />
              <CalcButton label="%" onClick={() => handleKeyClick('PERCENT')} />
              <CalcButton label="π" onClick={() => handleKeyClick('PI')} />
              <CalcButton
                label="(-)"
                onClick={() => handleKeyClick('NEGATIVE')}
              />
              <CalcButton label="Ans" onClick={() => handleKeyClick('ANS')} />
            </div>
            {/* Row E */}
            <div className="grid grid-cols-5 gap-1.5">
              <CalcButton
                label="2nd"
                onClick={() => handleKeyClick('SECOND')}
                color="yellow"
                active={showSecondFunctions}
              />
              <CalcButton label="quit" onClick={() => handleKeyClick('QUIT')} />
              <CalcButton label="mode" onClick={() => handleKeyClick('MODE')} />
              <CalcButton
                label="delete"
                onClick={() => handleKeyClick('DEL')}
              />
              <CalcButton
                label="clear"
                onClick={() => handleKeyClick('CLEAR_LINE')}
              />
            </div>
            {/* Arrow pad */}
            <div className="grid grid-cols-3 grid-rows-3 gap-0.5 w-24 mx-auto">
              <div />
              <CalcButton
                label="▲"
                onClick={() => handleKeyClick('ARROW_UP')}
                small
              />
              <div />
              <CalcButton
                label="◄"
                onClick={() => handleKeyClick('ARROW_LEFT')}
                small
              />
              <div />
              <CalcButton
                label="►"
                onClick={() => handleKeyClick('ARROW_RIGHT')}
                small
              />
              <div />
              <CalcButton
                label="▼"
                onClick={() => handleKeyClick('ARROW_DOWN')}
                small
              />
              <div />
            </div>
            {/* Numeric rows */}
            <div className="grid grid-cols-4 gap-1.5">
              <CalcButton
                label="7"
                onClick={() => handleKeyClick('7')}
                color="dark"
              />
              <CalcButton
                label="8"
                onClick={() => handleKeyClick('8')}
                color="dark"
              />
              <CalcButton
                label="9"
                onClick={() => handleKeyClick('9')}
                color="dark"
              />
              <CalcButton
                label="÷"
                onClick={() => handleKeyClick('DIVIDE')}
                color="blue"
              />
              <CalcButton
                label="4"
                onClick={() => handleKeyClick('4')}
                color="dark"
              />
              <CalcButton
                label="5"
                onClick={() => handleKeyClick('5')}
                color="dark"
              />
              <CalcButton
                label="6"
                onClick={() => handleKeyClick('6')}
                color="dark"
              />
              <CalcButton
                label="×"
                onClick={() => handleKeyClick('MULTIPLY')}
                color="blue"
              />
              <CalcButton
                label="1"
                onClick={() => handleKeyClick('1')}
                color="dark"
              />
              <CalcButton
                label="2"
                onClick={() => handleKeyClick('2')}
                color="dark"
              />
              <CalcButton
                label="3"
                onClick={() => handleKeyClick('3')}
                color="dark"
              />
              <CalcButton
                label="−"
                onClick={() => handleKeyClick('SUBTRACT')}
                color="blue"
              />
              <CalcButton
                label="0"
                onClick={() => handleKeyClick('0')}
                color="dark"
              />
              <CalcButton
                label="."
                onClick={() => handleKeyClick('DOT')}
                color="dark"
              />
              <CalcButton
                label="+"
                onClick={() => handleKeyClick('ADD')}
                color="blue"
              />
              <CalcButton
                label="enter"
                onClick={() => handleKeyClick('EQUALS')}
                color="green"
              />
            </div>
            {/* Bottom row */}
            <div className="grid grid-cols-2 gap-1.5">
              <CalcButton
                label="on"
                onClick={() => handleKeyClick('ON')}
                color="red"
              />
              <CalcButton
                label="reset"
                secondary="(AC)"
                onClick={() => handleKeyClick('AC')}
              />
            </div>
          </div>

          {activePanel === 'STAT' && (
            <div className="mt-3 bg-white/70 dark:bg-slate-800/60 rounded-lg p-3 border border-slate-300 dark:border-slate-600 space-y-2">
              <div className="font-semibold">STAT Menu</div>
              <div className="flex gap-2 flex-wrap">
                <button
                  className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700"
                  onClick={() => {
                    // 1-Var stats on L1
                    const arr = (lists.L1 || []).filter(
                      (v) => v !== '' && !isNaN(v)
                    );
                    const n = arr.length;
                    const sum = arr.reduce((a, b) => a + Number(b), 0);
                    const mean = n ? sum / n : 0;
                    const variance = n
                      ? arr.reduce(
                          (a, b) => a + Math.pow(Number(b) - mean, 2),
                          0
                        ) / n
                      : 0;
                    const stdev = Math.sqrt(variance);
                    setResultText(
                      `n=${n}  mean=${mean.toFixed(4)}  σ=${stdev.toFixed(4)}`
                    );
                  }}
                >
                  1-Var Stats (L1)
                </button>
                <button
                  className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700"
                  onClick={() => {
                    const X = (lists.L1 || []).map(Number);
                    const Y = (lists.L2 || []).map(Number);
                    const n = Math.min(X.length, Y.length);
                    const xs = X.slice(0, n),
                      ys = Y.slice(0, n);
                    const mean = (a) =>
                      a.reduce((s, v) => s + v, 0) / Math.max(1, a.length);
                    const mx = mean(xs),
                      my = mean(ys);
                    let num = 0,
                      denx = 0,
                      deny = 0;
                    for (let i = 0; i < n; i++) {
                      const dx = xs[i] - mx,
                        dy = ys[i] - my;
                      num += dx * dy;
                      denx += dx * dx;
                      deny += dy * dy;
                    }
                    const r = n ? num / Math.sqrt(denx * deny) : 0;
                    setResultText(`n=${n}  r=${(r || 0).toFixed(4)}`);
                  }}
                >
                  2-Var Stats (L1,L2)
                </button>
                <button
                  className="px-3 py-1 rounded bg-rose-500 text-white"
                  onClick={() => setLists({ L1: [], L2: [], L3: [] })}
                >
                  Clear Lists
                </button>
                <button
                  className="px-3 py-1 rounded bg-sky-500 text-white"
                  onClick={() => setActivePanel('TABLE')}
                >
                  Table Setup
                </button>
              </div>
            </div>
          )}

          {activePanel === 'ANGLE' && (
            <div className="mt-3 bg-white/70 dark:bg-slate-800/60 rounded-lg p-3 border border-slate-300 dark:border-slate-600 space-x-2">
              <span className="font-semibold mr-2">ANGLE</span>
              <button
                className={`px-3 py-1 rounded ${
                  mode === 'DEG'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
                onClick={() => setMode('DEG')}
              >
                DEG
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  mode === 'RAD'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
                onClick={() => setMode('RAD')}
              >
                RAD
              </button>
            </div>
          )}

          {activePanel === 'PRB' && (
            <div className="mt-3 bg-white/70 dark:bg-slate-800/60 rounded-lg p-3 border border-slate-300 dark:border-slate-600 space-x-2">
              <span className="font-semibold mr-2">PRB</span>
              <button
                className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700"
                onClick={() => {
                  const e = expr.clone();
                  e.insertFunction('fact');
                  setExpr(e);
                  setCurrentEntry(e.toPlainText());
                }}
              >
                {'n!'}
              </button>
              <button
                className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700"
                onClick={() => {
                  const e = expr.clone();
                  e.insertFunction('nCr');
                  setExpr(e);
                  setCurrentEntry(e.toPlainText());
                }}
              >
                nCr
              </button>
              <button
                className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700"
                onClick={() => {
                  const e = expr.clone();
                  e.insertFunction('nPr');
                  setExpr(e);
                  setCurrentEntry(e.toPlainText());
                }}
              >
                nPr
              </button>
            </div>
          )}

          {activePanel === 'TABLE' && (
            <TablePanel
              expr={expr}
              mode={mode}
              onClose={() => setActivePanel(null)}
            />
          )}
        </div>
      );
    }

    // Individual calculator button component
    function CalcButton({
      label,
      secondary,
      onClick,
      color = 'default',
      small = false,
      wide = false,
      fullWidth = false,
      active = false,
    }) {
      const getColorClasses = () => {
        if (active) {
          return 'bg-yellow-400 text-black border-yellow-600';
        }
        switch (color) {
          case 'red':
            return 'bg-red-600 text-white border-red-800 hover:bg-red-500';
          case 'yellow':
            return 'bg-yellow-400 text-black border-yellow-600 hover:bg-yellow-300';
          case 'gray':
            return 'bg-slate-500 text-white border-slate-700 hover:bg-slate-400';
          case 'dark':
            return 'bg-slate-800 text-white border-slate-900 hover:bg-slate-700';
          case 'blue':
            return 'bg-sky-600 text-white border-sky-800 hover:bg-sky-500';
          case 'green':
            return 'bg-green-600 text-white border-green-800 hover:bg-green-500';
          default:
            return 'bg-slate-600 text-white border-slate-800 hover:bg-slate-500';
        }
      };

      const sizeClasses = small ? 'text-xs py-1' : 'text-base py-3';
      const widthClasses = fullWidth ? 'col-span-4' : wide ? 'col-span-2' : '';

      return (
        <button
          onClick={onClick}
          className={`${getColorClasses()} ${sizeClasses} ${widthClasses} px-2 rounded-lg border-2 shadow-md font-bold transition-all active:scale-95 relative min-h-[2.5rem] flex items-center justify-center`}
        >
          <div className="flex flex-col items-center justify-center gap-0.5">
            {secondary && (
              <div className="text-[8px] leading-none text-lime-300 font-normal">
                {secondary}
              </div>
            )}
            <div className="leading-none">
              <span className={small ? 'text-[10px]' : 'text-sm'}>{label}</span>
            </div>
          </div>
        </button>
      );
    }

    // Simple Table Panel for f(x)
    function TablePanel({ expr, mode, onClose }) {
      const [fnText, setFnText] = React.useState('x^2');
      const [start, setStart] = React.useState(0);
      const [step, setStep] = React.useState(1);
      const [rows, setRows] = React.useState(10);

      const compute = () => {
        const safe = (s) =>
          s.replace(/\^/g, '**').replace(/×/g, '*').replace(/÷/g, '/');
        const angle = mode;
        const res = [];
        for (let i = 0; i < rows; i++) {
          const x = Number(start) + i * Number(step);
          const body = safe(fnText).replace(/\bx\b/g, `(${x})`);
          try {
            const y = Function('"use strict";return (' + body + ')')();
            res.push({ x, y });
          } catch {
            res.push({ x, y: NaN });
          }
        }
        return res;
      };

      const table = compute();

      return (
        <div className="mt-3 bg-white/70 dark:bg-slate-800/60 rounded-lg p-3 border border-slate-300 dark:border-slate-600">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">TABLE f(x)</span>
            <button
              className="ml-auto px-2 py-1 rounded bg-slate-200 dark:bg-slate-700"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <label className="text-sm">
              f(x):{' '}
              <input
                className="ml-2 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700"
                value={fnText}
                onChange={(e) => setFnText(e.target.value)}
              />
            </label>
            <label className="text-sm">
              start x:{' '}
              <input
                type="number"
                className="ml-2 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </label>
            <label className="text-sm">
              step:{' '}
              <input
                type="number"
                className="ml-2 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700"
                value={step}
                onChange={(e) => setStep(e.target.value)}
              />
            </label>
            <label className="text-sm">
              rows:{' '}
              <input
                type="number"
                className="ml-2 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700"
                value={rows}
                onChange={(e) => setRows(e.target.value)}
              />
            </label>
          </div>
          <div className="overflow-auto max-h-48">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="pr-4">x</th>
                  <th>f(x)</th>
                </tr>
              </thead>
              <tbody>
                {table.map((r, i) => (
                  <tr key={i}>
                    <td className="pr-4">{r.x}</td>
                    <td>{String(r.y)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Main TI-30XS Practice Tool Component
    function Ti30xsPracticeTool() {
      const [mode, setMode] = useState('free'); // 'free' or 'guided'
      const [selectedMission, setSelectedMission] = useState(null);
      const [currentExpression, setCurrentExpression] = useState('');
      const [lastResult, setLastResult] = useState(null);
      const [missionComplete, setMissionComplete] = useState(false);
      const [showHint, setShowHint] = useState(false);
      const [keySequence, setKeySequence] = useState([]);

      const handleExpressionChange = (expr) => {
        setCurrentExpression(expr);
        setMissionComplete(false);
      };

      const handleResultChange = (result) => {
        setLastResult(result);

        // Check if mission is complete
        if (selectedMission && mode === 'guided') {
          const diff = Math.abs(result - selectedMission.targetResult);
          if (diff <= selectedMission.tolerance) {
            setMissionComplete(true);
          }
        }
      };

      const handleKeyPress = (keyId) => {
        setKeySequence([...keySequence, keyId].slice(-20)); // Keep last 20 keys
      };

      const handleSelectMission = (mission) => {
        setSelectedMission(mission);
        setMissionComplete(false);
        setShowHint(false);
        setKeySequence([]);
        setCurrentExpression('');
        setLastResult(null);
      };

      const handleResetMission = () => {
        setMissionComplete(false);
        setShowHint(false);
        setKeySequence([]);
        setCurrentExpression('');
        setLastResult(null);
      };

      return (
        <div className="space-y-6">
          {/* Mode Toggle */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setMode('free')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                mode === 'free'
                  ? 'bg-sky-600 text-white shadow-lg'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200'
              }`}
            >
              Free Calculator Mode
            </button>
            <button
              onClick={() => setMode('guided')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                mode === 'guided'
                  ? 'bg-sky-600 text-white shadow-lg'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200'
              }`}
            >
              Guided Practice Mode
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Calculator */}
            <div>
              <Ti30xsCalculator
                onExpressionChange={handleExpressionChange}
                onResultChange={handleResultChange}
                onKeyPress={handleKeyPress}
              />
            </div>

            {/* Practice Panel */}
            <div className="space-y-4">
              {mode === 'free' ? (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                    Free Calculator Mode
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                    Practice using the TI-30XS calculator. Try out different
                    functions and operations to familiarize yourself with the
                    key layout and behavior.
                  </p>
                  <div className="bg-sky-50 dark:bg-sky-900/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-sky-800 dark:text-sky-200 mb-2">
                      Tips:
                    </h4>
                    <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
                      <li>Use n/d for fractions (e.g., 3 n/d 4 for 3/4)</li>
                      <li>x² squares the last number entered</li>
                      <li>√ calculates square roots</li>
                      <li>Use parentheses for order of operations</li>
                      <li>AC clears everything, DEL removes last character</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 space-y-4">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    Guided Practice Missions
                  </h3>

                  {!selectedMission ? (
                    <div className="space-y-2">
                      <p className="text-slate-600 dark:text-slate-300 mb-3">
                        Select a mission to practice specific calculator skills:
                      </p>
                      {TI30XS_MISSIONS.map((mission) => (
                        <button
                          key={mission.id}
                          onClick={() => handleSelectMission(mission)}
                          className="w-full text-left px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-sky-100 dark:hover:bg-sky-900/50 rounded-lg transition border border-slate-200 dark:border-slate-600"
                        >
                          <div className="font-semibold text-slate-800 dark:text-slate-100">
                            {mission.title}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {mission.goalDescription}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-sky-50 dark:bg-sky-900/30 p-4 rounded-lg">
                        <h4 className="font-bold text-sky-800 dark:text-sky-200 mb-2">
                          {selectedMission.title}
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300">
                          {selectedMission.goalDescription}
                        </p>
                        <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                          Target result: {selectedMission.targetResult}
                        </div>
                      </div>

                      {missionComplete && (
                        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border-2 border-green-500">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">✓</span>
                            <div>
                              <div className="font-bold text-green-800 dark:text-green-200">
                                Mission Complete!
                              </div>
                              <div className="text-sm text-green-700 dark:text-green-300">
                                Great job! Your answer of {lastResult} is
                                correct.
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowHint(!showHint)}
                          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition font-semibold"
                        >
                          {showHint ? 'Hide' : 'Show'} Hint
                        </button>
                        <button
                          onClick={handleResetMission}
                          className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition font-semibold"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => setSelectedMission(null)}
                          className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition font-semibold ml-auto"
                        >
                          Choose Different Mission
                        </button>
                      </div>

                      {showHint && (
                        <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg border border-amber-300 dark:border-amber-700">
                          <h5 className="font-bold text-amber-800 dark:text-amber-200 mb-2">
                            Step-by-Step Hint:
                          </h5>
                          <ol className="list-decimal list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300">
                            {selectedMission.stepsHint.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {currentExpression && (
                        <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
                          <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                            Current Expression:
                          </div>
                          <div className="font-mono text-slate-800 dark:text-slate-200">
                            {currentExpression}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // ==================== END TI-30XS CALCULATOR ====================

    function MathPracticeToolsPage({
      onExit,
      activeTab,
      onTabChange,
      graphingNode,
      geometryNode,
    }) {
      const tabs = [
        { id: 'calculator', label: 'TI-30XS' },
        { id: 'graphing', label: 'Graphing' },
        { id: 'geometry', label: 'Geometry' },
        { id: 'stepSolver', label: 'Step Solver' },
        { id: 'centralTendency', label: 'Central Tendency' },
      ];
      const isLightMode = (() => {
        if (typeof document === 'undefined') return true;
        const root = document.documentElement;
        const themeAttr = root.getAttribute('data-theme');
        const hasDarkClass =
          root.classList.contains('dark') ||
          document.body.classList.contains('dark');
        if (themeAttr === 'dark' || hasDarkClass) return false;
        return true;
      })();

      const renderContent = () => {
        if (activeTab === 'calculator') {
          return <Ti30xsPracticeTool />;
        }

        if (activeTab === 'graphing') {
          return (
            graphingNode || (
              <div className="py-16 text-center text-slate-500 dark:text-slate-300">
                Preparing the graphing workspace...
              </div>
            )
          );
        }

        if (activeTab === 'geometry') {
          return (
            geometryNode || (
              <div className="py-16 text-center text-slate-500 dark:text-slate-300">
                Preparing the geometry playground...
              </div>
            )
          );
        }

        if (activeTab === 'stepSolver') {
          if (window.MathStepPracticeTool) {
            return (
              <window.MathStepPracticeTool
                theme={isLightMode ? 'light' : 'dark'}
              />
            );
          }
          return (
            <div className="py-12 text-center text-slate-500 dark:text-slate-300">
              Loading Step Solver...
            </div>
          );
        }

        if (activeTab === 'centralTendency') {
          if (window.MathCentralTendencyTool) {
            return (
              <window.MathCentralTendencyTool
                theme={isLightMode ? 'light' : 'dark'}
              />
            );
          }
          return (
            <div className="py-12 text-center text-slate-500 dark:text-slate-300">
              Loading Central Tendency Practice...
            </div>
          );
        }

        return null;
      };

      return (
        <div className="fade-in space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 dark:border-slate-700/70 pb-4 math-practice-header">
            <button
              onClick={onExit}
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-200"
            >
              <ArrowLeftIcon />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 text-center flex-1">
              Math Practice Tools
            </h1>
            <span className="hidden sm:block sm:w-40"></span>
          </div>
          <div className="flex flex-wrap gap-3 math-tools-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange?.(tab.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  activeTab === tab.id
                    ? isLightMode
                      ? 'bg-sky-600 text-black shadow'
                      : 'bg-sky-600 text-white shadow'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <section className="bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-700/70 rounded-2xl shadow-lg p-4 sm:p-6">
            {renderContent()}
          </section>
        </div>
      );
    }

    // Lightweight tab system for Science tools (currently only Formula Practice, easy to extend)
    function ScienceToolsTabs({ theme }) {
      const { useState } = React;
      const [active, setActive] = useState('formula');
      const tabs = [
        { id: 'formula', label: 'Formula Practice' },
        { id: 'concept', label: 'Concept Practice' },
      ];
      const isDarkMode = theme === 'dark';
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  active === t.id
                    ? isDarkMode
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-emerald-600 text-black shadow'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="border rounded-xl p-4 bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-700">
            {active === 'formula' && window.ScienceFormulaPracticeTool && (
              <window.ScienceFormulaPracticeTool theme={theme} />
            )}
            {active === 'concept' && window.ScienceConceptPracticeTool && (
              <window.ScienceConceptPracticeTool theme={theme} />
            )}
            {((active === 'formula' && !window.ScienceFormulaPracticeTool) ||
              (active === 'concept' && !window.ScienceConceptPracticeTool)) && (
              <div className="text-center text-slate-500 dark:text-slate-300 py-8">
                Loading tool...
              </div>
            )}
          </div>
        </div>
      );
    }

    const MATH_PIPELINE_TEST_CASES = [
      {
        description: 'Trailing currency symbol',
        input: 'The price is 7$ today.',
      },
      {
        description: 'Leading currency symbol',
        input: 'Please pay $30 before Friday.',
      },
      {
        description: 'Escaped currency should persist',
        input: 'Escaped currency \\$18 should stay as dollars.',
      },
      {
        description: 'Inline math remains intact',
        input: 'Solve the equation $x + 3 = 9$ now.',
      },
      {
        description: 'Display math remains intact',
        input: 'Compute $$\\frac{3}{4}$$ of the recipe.',
      },
      {
        description: 'Broken LaTeX treated as text',
        input: 'Broken latex \\frac{2}{5} should remain plain text.',
      },
      {
        description: 'Table with currency values',
        input:
          '<table><tr><th>Item</th><th>Cost ($)</th></tr><tr><td>Book</td><td>$5</td></tr></table>',
      },
      {
        description: 'Spaced table markup with dollars',
        input: '< table >< tr >< td >$10< /td ></tr></table>',
      },
      {
        description: 'Stray dollar sign in sentence',
        input: 'Sentence with stray $ sign in the middle.',
      },
      {
        description: 'HTML entity currency stays escaped',
        input: 'HTML entity shows 5&#36; plus tax.',
      },
      {
        description: 'Angles with math delimiters',
        input: 'Angles like $m\\angle ABC = 45^\\circ$ are fine.',
      },
      {
        description: 'Table header currency',
        input:
          '<table><thead><tr><th>Revenue $ (USD)</th></tr></thead></table>',
      },
    ];

    function runMathPipelineDiagnostics() {
      const failures = [];

      MATH_PIPELINE_TEST_CASES.forEach((test, index) => {
        const processed = preprocessRawContent(test.input, {
          normalizeSpacing: true,
        });
        const segments = extractMathSegments(processed);
        const textSegments = segments.filter(
          (segment) => segment.type === 'text'
        );

        const issues = [];

        if (textSegments.some((seg) => /(^|[^\\])\$(?!\$)/.test(seg.value))) {
          issues.push('loneDollarSign');
        }

        if (textSegments.some((seg) => /<\s*(?:tr|th|td)/i.test(seg.value))) {
          issues.push('rawTableMarkup');
        }

        const displayDelimiterMatches = processed.match(/\$\$/g) || [];
        if (displayDelimiterMatches.length % 2 !== 0) {
          issues.push('unbalancedDisplayMath');
        }

        const inlineScope = processed.replace(/\$\$[\s\S]+?\$\$/g, '');
        const inlineDelimiterMatches = inlineScope.match(/\$/g) || [];
        if (inlineDelimiterMatches.length % 2 !== 0) {
          issues.push('unbalancedInlineMath');
        }

        if (issues.length > 0) {
          failures.push({
            index,
            description: test.description,
            issues,
            processed,
            segments,
          });
        }
      });

      if (failures.length > 0) {
        console.warn('[MathPipelineDiagnostics] Failures detected:', failures);
      } else {
        console.info('[MathPipelineDiagnostics] All test cases passed.');
      }
    }

    if (
      typeof window !== 'undefined' &&
      window.location &&
      window.location.search.includes('mathdiag=1')
    ) {
      setTimeout(runMathPipelineDiagnostics, 0);
    }

    function LifeChoicesSimulation({ srcPath }) {
      const [srcDoc, setSrcDoc] = React.useState(null);
      const iframeRef = React.useRef(null);

      React.useEffect(() => {
        let cancelled = false;
        async function load() {
          try {
            const res = await fetch(srcPath, { cache: 'no-store' });
            if (!res.ok)
              throw new Error(`Failed to load ${srcPath}: ${res.status}`);
            const html = await res.text();
            if (!cancelled) setSrcDoc(html);
          } catch (e) {
            console.warn(
              'Falling back to src attribute for simulation:',
              e?.message || e
            );
            if (!cancelled) setSrcDoc(null);
          }
        }
        load();
        return () => {
          cancelled = true;
        };
      }, [srcPath]);

      return (
        <iframe
          ref={iframeRef}
          title="The Game of Life"
          className="w-full h-[80vh] rounded-lg"
          style={{
            border: '1px solid var(--subject-simulations-border)',
            background: 'white',
          }}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          src={srcDoc ? undefined : srcPath}
          srcDoc={srcDoc || undefined}
        />
      );
    }

    // Theme hook extracted to frontend/hooks/useThemeController.js

    // Expose components to window globals for view wrappers to use
    if (typeof window !== 'undefined') {
      window.ProfileView = ProfileView;
      window.SettingsView = SettingsView;
      window.WorkforceHub = WorkforceHub;
      window.StartScreen = StartScreen;
      window.StudentHomeRoom = StudentHomeRoom;
      window.EnhancedAdminShell = EnhancedAdminShell;
    }

    function RootApp() {
      const { theme, applyTheme } = useThemeController();

      const handleThemeChange = useCallback(
        (nextTheme) => {
          applyTheme(nextTheme);
        },
        [applyTheme]
      );

      return (
        <>
          <ErrorBoundary>
            <App externalTheme={theme} onThemeChange={handleThemeChange} />
          </ErrorBoundary>
        </>
      );
    }

    // Provide global topic resolver BEFORE rendering so components can access it
    // --- GED TOPIC CONSTANTS ---
    // Official GED-aligned topics for each subject
    // This is the single source of truth for Smith-A-Quiz topic selection
    const GED_TOPICS = {
      Math: [
        'Number Sense & Operations',
        'Fractions, Decimals, & Percents',
        'Ratios, Proportions, & Rates',
        'Algebraic Expressions & Equations',
        'Inequalities & Linear Relationships',
        'Graphs & Data Interpretation',
        'Graphs & Functions',
        'Functions & Relations',
        'Geometry & Measurement',
        'Pythagorean Theorem & Distance',
        'Surface Area & Volume',
        'Statistics & Probability',
        'Word Problems & Quantitative Reasoning',
        'Scientific & Real-World Applications of Math',
      ],
      'Reasoning Through Language Arts (RLA)': [
        'Reading Comprehension (Informational Texts)',
        'Reading Comprehension (Literary Texts)',
        'Main Idea, Inference, and Supporting Details',
        "Author's Purpose & Point of View",
        'Vocabulary in Context & Word Meaning',
        'Grammar & Sentence Structure',
        'Punctuation & Mechanics',
        'Organization & Cohesion in Writing',
        'Argumentative Writing (Claims, Evidence, Counterclaims)',
        'Narrative & Informational Writing',
        'Editing & Revising Practice',
        'Extended Response (Essay Practice)',
      ],
      Science: [
        'Scientific Investigation & Method',
        'Data Analysis, Tables, & Graphs',
        'Life Science: Cells & Genetics',
        'Life Science: Ecology & Evolution',
        'Physical Science: Matter & Energy',
        'Physical Science: Motion & Forces',
        'Earth Science: Weather, Climate, & the Environment',
        'Earth Science: Geology & Natural Resources',
        'Space Science: Solar System & Universe',
        'Scientific Numeracy (Formulas, Units, Conversions)',
        'Reading & Interpreting Experiments',
        'Scientific Reasoning & Application',
      ],
      'Social Studies': [
        'U.S. Civics & Government (Constitution, Branches, Rights)',
        'U.S. History: Colonial Period to Civil War',
        'U.S. History: Reconstruction to Modern Era',
        'World History Overview',
        'Geography & Map Skills',
        'Economics & Personal Finance',
        'Supply, Demand, & Market Systems',
        'Civics: Voting, Citizenship, and Participation',
        'Historical Documents & Primary Sources',
        'Interpreting Charts, Graphs, & Political Cartoons',
        'Global Issues & Contemporary Affairs',
        'Cause & Effect in History',
      ],
    };

    // Expose globally for dashboard and quiz components
    if (typeof window !== 'undefined') {
      window.GED_TOPICS = GED_TOPICS;
    }

    // Helper function to get topics for a subject with defensive fallback
    const getTopicsForSubject = (subject) => {
      if (!subject) return [];

      // Direct match
      if (GED_TOPICS[subject]) {
        return GED_TOPICS[subject];
      }

      // Normalize common variations
      const normalized = String(subject).trim();
      const lower = normalized.toLowerCase();

      if (lower === 'math' || lower === 'mathematics') {
        return GED_TOPICS.Math;
      }
      if (lower === 'science') {
        return GED_TOPICS.Science;
      }
      if (
        lower === 'social studies' ||
        lower === 'social-studies' ||
        lower === 'socialstudies'
      ) {
        return GED_TOPICS['Social Studies'];
      }
      if (lower.includes('language arts') || lower === 'rla') {
        return GED_TOPICS['Reasoning Through Language Arts (RLA)'];
      }

      return [];
    };

    // Expose helper globally
    if (typeof window !== 'undefined') {
      window.getTopicsForSubject = getTopicsForSubject;
    }

    // Replace legacy getSmithAQuizTopics with hardcoded GED topics
    if (
      typeof window !== 'undefined' &&
      typeof window.getSmithAQuizTopics !== 'function'
    ) {
      window.getSmithAQuizTopics = function (subject) {
        // Use the hardcoded GED topics instead of dynamic AppData
        return getTopicsForSubject(subject);
      };
    }

    // --- RENDER APP ---
    const container = document.getElementById('root');
    const root = ReactDOM.createRoot(container);
    root.render(<RootApp />);
  }
}
