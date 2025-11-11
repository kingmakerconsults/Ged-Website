/* global React, ReactDOM */

// pull hooks from the global React (because we're using CDN React, not imports)
const {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useContext,
  useReducer,
  createContext,
} = React;

// optional but helpful
const { createRoot } = ReactDOM;

console.log(
  'React is',
  typeof React,
  'ReactDOM is',
  typeof ReactDOM,
  'useState is',
  typeof useState
);

const SUBJECT_PROGRESS_KEYS = [
  'Social Studies',
  'Reasoning Through Language Arts (RLA)',
  'Science',
  'Math',
];

const GED_PASSING_SCORE = 145;

// global subject ids + badge paths so every component can share them
const SUBJECT_ID_MAP = {
  Math: 'math',
  Science: 'science',
  'Social Studies': 'social_studies',
  'Reasoning Through Language Arts (RLA)': 'rla',
  RLA: 'rla',
};

const BADGE_IMG_PATHS = {
  math: '/badges/math.svg',
  science: '/badges/science.svg',
  social_studies: '/badges/social-studies.svg',
  rla: '/badges/rla.svg',
};

// Global premade catalog; ensure it's on window to be shareable across late loaders
let PREMADE_QUIZ_CATALOG =
  typeof window !== 'undefined' && window.PREMADE_QUIZ_CATALOG
    ? window.PREMADE_QUIZ_CATALOG
    : {};
if (typeof window !== 'undefined') {
  window.PREMADE_QUIZ_CATALOG = PREMADE_QUIZ_CATALOG;
}

// Build PREMADE_QUIZ_CATALOG from window.ExpandedQuizData so totals render even if backend fails
function hydratePremadeCatalogFromWindow() {
  try {
    const src =
      typeof window !== 'undefined'
        ? window.MergedExpandedQuizData ||
          window.ExpandedQuizData ||
          (window.Data && window.Data.expandedQuizData) ||
          null
        : null;
    if (!src || typeof src !== 'object') return;
    const out = {};
    SUBJECT_PROGRESS_KEYS.forEach((subject) => {
      const node = src[subject];
      if (!node || !node.categories) {
        out[subject] = [];
        return;
      }
      const quizzes = [];
      Object.values(node.categories).forEach((cat) => {
        if (!cat) return;
        const qlist = Array.isArray(cat.quizzes) ? cat.quizzes : [];
        qlist.forEach((q) => quizzes.push(q));
      });
      out[subject] = quizzes;
    });
    PREMADE_QUIZ_CATALOG = out;
    if (typeof window !== 'undefined') {
      window.PREMADE_QUIZ_CATALOG = PREMADE_QUIZ_CATALOG;
    }
  } catch (e) {
    // ignore but keep empty catalog
  }
}

// Hydrate early so createEmptyProgress can pick up totals
hydratePremadeCatalogFromWindow();
// Regression guard: warn if catalog is empty
try {
  if (
    !Array.isArray(PREMADE_QUIZ_CATALOG?.['Math']) ||
    PREMADE_QUIZ_CATALOG['Math'].length === 0
  ) {
    console.warn(
      '[progress] Math premade catalog is empty �� progress bars will show 0/0'
    );
  }
} catch {}

const getPremadeQuizTotal = (subject) => {
  try {
    // Prefer hydrated catalog derived from ExpandedQuizData
    const list = PREMADE_QUIZ_CATALOG?.[subject];
    if (Array.isArray(list)) return list.length;
    // Fallback: derive from AppData if available
    const src =
      typeof window !== 'undefined' && window.UnifiedQuizCatalog
        ? window.UnifiedQuizCatalog
        : typeof window !== 'undefined'
        ? window.AppData
        : AppData;
    const subjectData = src?.[subject];
    if (!subjectData) return 0;
    let total = 0;
    if (Array.isArray(subjectData.quizzes)) total += subjectData.quizzes.length;
    const cats = subjectData.categories || {};
    for (const catName of Object.keys(cats)) {
      const topics = Array.isArray(cats[catName]?.topics)
        ? cats[catName].topics
        : [];
      topics.forEach((t) => {
        if (Array.isArray(t?.quizzes)) total += t.quizzes.length;
        else if (Array.isArray(t?.questions)) total += 1;
      });
    }
    return total;
  } catch {
    return 0;
  }
};

const createEmptyProgress = () =>
  SUBJECT_PROGRESS_KEYS.reduce((acc, subject) => {
    acc[subject] = {
      attempts: [],
      attemptCount: 0,
      averageScaledScore: null,
      completedCount: 0,
      completionPercentage: 0,
      passedExamCodes: [],
      totalPremadeExams: getPremadeQuizTotal(subject),
      lastAttempt: null,
    };
    return acc;
  }, {});

const buildProgressFromAttempts = (attempts = []) => {
  const progress = createEmptyProgress();
  const subjectStats = SUBJECT_PROGRESS_KEYS.reduce((acc, subject) => {
    acc[subject] = { scoreSum: 0, count: 0, passed: new Set() };
    return acc;
  }, {});

  const normalizedAttempts = Array.isArray(attempts) ? attempts : [];

  normalizedAttempts.forEach((entry) => {
    const subjectKey = entry?.subject;
    if (!subjectKey || !progress[subjectKey]) {
      return;
    }

    const normalized = {
      id: entry?.id ?? null,
      quizCode:
        entry?.quizCode ||
        entry?.quiz_code ||
        entry?.quizId ||
        entry?.quiz_id ||
        null,
      quizTitle:
        entry?.quizTitle || entry?.quiz_title || entry?.quizName || null,
      quizType: entry?.quizType || entry?.quiz_type || null,
      score:
        typeof entry?.score === 'number'
          ? entry.score
          : Number.isFinite(Number(entry?.score))
          ? Math.round(Number(entry.score))
          : null,
      totalQuestions:
        typeof entry?.totalQuestions === 'number'
          ? entry.totalQuestions
          : Number.isFinite(Number(entry?.total_questions))
          ? Math.round(Number(entry.total_questions))
          : Number.isFinite(Number(entry?.totalQuestions))
          ? Math.round(Number(entry.totalQuestions))
          : null,
      scaledScore:
        typeof entry?.scaledScore === 'number'
          ? Math.round(entry.scaledScore)
          : Number.isFinite(Number(entry?.scaled_score))
          ? Math.round(Number(entry.scaled_score))
          : null,
      attemptedAt:
        entry?.attemptedAt || entry?.attempted_at || entry?.takenAt || null,
    };

    const derivedPassed = (() => {
      if (typeof entry?.passed === 'boolean') {
        return entry.passed;
      }
      if (typeof entry?.passed === 'string') {
        const lowered = entry.passed.trim().toLowerCase();
        if (lowered === 'true' || lowered === '1') return true;
        if (lowered === 'false' || lowered === '0') return false;
      }
      if (normalized.scaledScore != null) {
        return normalized.scaledScore >= GED_PASSING_SCORE;
      }
      return null;
    })();

    normalized.passed = derivedPassed;

    progress[subjectKey].attempts.push(normalized);

    if (normalized.scaledScore != null) {
      subjectStats[subjectKey].scoreSum += normalized.scaledScore;
      subjectStats[subjectKey].count += 1;
    }

    if (normalized.passed && normalized.quizCode) {
      subjectStats[subjectKey].passed.add(normalized.quizCode);
    }
  });

  SUBJECT_PROGRESS_KEYS.forEach((subject) => {
    const stats = subjectStats[subject];
    const subjectProgress = progress[subject];
    const totalPremade = getPremadeQuizTotal(subject);

    subjectProgress.attempts.sort((a, b) => {
      const aDate = a.attemptedAt ? new Date(a.attemptedAt).getTime() : 0;
      const bDate = b.attemptedAt ? new Date(b.attemptedAt).getTime() : 0;
      if (bDate === aDate) {
        return (b.id ?? 0) - (a.id ?? 0);
      }
      return bDate - aDate;
    });

    subjectProgress.attemptCount = subjectProgress.attempts.length;
    subjectProgress.averageScaledScore = stats.count
      ? Math.round(stats.scoreSum / stats.count)
      : null;
    subjectProgress.completedCount = stats.passed.size;
    subjectProgress.passedExamCodes = Array.from(stats.passed);
    subjectProgress.totalPremadeExams = totalPremade;
    subjectProgress.completionPercentage =
      totalPremade > 0
        ? Math.min(100, Math.round((stats.passed.size / totalPremade) * 100))
        : 0;
    subjectProgress.lastAttempt = subjectProgress.attempts[0] || null;
  });

  return progress;
};

const ensureUserProfile = (user) => {
  if (!user || typeof user !== 'object') {
    return null;
  }
  const email = typeof user.email === 'string' ? user.email : '';
  const baseName =
    user.name && typeof user.name === 'string' && user.name.trim()
      ? user.name.trim()
      : email.includes('@')
      ? email.split('@')[0]
      : email || 'Learner';
  const picture =
    user.picture && typeof user.picture === 'string' && user.picture.trim()
      ? user.picture.trim()
      : `https://ui-avatars.com/api/?background=0ea5e9&color=fff&name=${encodeURIComponent(
          baseName
        )}`;
  const role = typeof user.role === 'string' ? user.role : 'student';
  const organizationId = user.organization_id ?? null;
  const organizationName = user.organization_name ?? null;

  return {
    ...user,
    name: baseName,
    picture,
    role,
    organization_id: organizationId,
    organization_name: organizationName,
  };
};

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

const SUBJECT_COLORS = {
  Science: {
    background: 'var(--subject-science-accent)',
    text: 'var(--subject-science-surface-text)',
    heroText: 'var(--subject-science-text)',
    border: 'var(--subject-science-border)',
    scoreBackground: 'var(--bg-overlay)',
    scoreText: 'var(--subject-science-text)',
    scoreBorder: 'var(--subject-science-border)',
    accent: 'var(--subject-science-accent)',
    accentText: 'var(--subject-science-accent-text)',
  },
  'Social Studies': {
    background: 'var(--subject-social-accent)',
    text: 'var(--subject-social-surface-text)',
    heroText: 'var(--subject-social-text)',
    border: 'var(--subject-social-border)',
    scoreBackground: 'var(--bg-overlay)',
    scoreText: 'var(--subject-social-text)',
    scoreBorder: 'var(--subject-social-border)',
    accent: 'var(--subject-social-accent)',
    accentText: 'var(--subject-social-accent-text)',
  },
  'Reasoning Through Language Arts (RLA)': {
    background: 'var(--subject-rla-accent)',
    text: 'var(--subject-rla-surface-text)',
    heroText: 'var(--subject-rla-text)',
    border: 'var(--subject-rla-border)',
    scoreBackground: 'var(--bg-overlay)',
    scoreText: 'var(--subject-rla-text)',
    scoreBorder: 'var(--subject-rla-border)',
    accent: 'var(--subject-rla-accent)',
    accentText: 'var(--subject-rla-accent-text)',
  },
  Math: {
    background: 'var(--subject-math-accent)',
    text: 'var(--math-text)',
    heroText: 'var(--subject-math-text)',
    border: 'var(--math-surface-border)',
    scoreBackground: 'var(--bg-overlay)',
    scoreText: 'var(--math-text)',
    scoreBorder: 'var(--math-surface-border)',
    accent: 'var(--subject-math-accent)',
    accentText: 'var(--subject-math-accent-text)',
    surface: 'var(--math-surface)',
    surfaceStrong: 'var(--math-surface)',
    surfaceBorder: 'var(--math-surface-border)',
    divider: 'var(--math-divider)',
    mutedText: 'var(--math-muted-text)',
    onBackgroundText: 'var(--math-text)',
  },
  Simulations: {
    background: 'var(--subject-simulations-accent)',
    text: 'var(--subject-simulations-surface-text)',
    heroText: 'var(--subject-simulations-text)',
    border: 'var(--subject-simulations-border)',
    scoreBackground: 'var(--bg-overlay)',
    scoreText: 'var(--subject-simulations-text)',
    scoreBorder: 'var(--subject-simulations-border)',
    accent: 'var(--subject-simulations-accent)',
    accentText: 'var(--subject-simulations-accent-text)',
  },
};

const SUBJECT_BG_GRADIENTS = {
  Math: 'var(--subject-math-gradient)',
  Science: 'var(--subject-science-gradient)',
  'Social Studies': 'var(--subject-social-gradient)',
  'Reasoning Through Language Arts (RLA)': 'var(--subject-rla-gradient)',
  Simulations: 'var(--subject-simulations-gradient)',
};

const SUBJECT_LIGHT_SURFACE_GRADIENTS = {
  Math: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(2,132,199,0.12))',
  Science:
    'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(220,38,38,0.12))',
  'Social Studies':
    'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(22,163,74,0.12))',
  'Reasoning Through Language Arts (RLA)':
    'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(124,58,237,0.12))',
  Simulations:
    'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(249,115,22,0.12))',
};

const SUBJECT_LIGHT_TINTS = {
  Math: 'rgba(2,132,199,0.2)',
  Science: 'rgba(220,38,38,0.2)',
  'Social Studies': 'rgba(22,163,74,0.2)',
  'Reasoning Through Language Arts (RLA)': 'rgba(124,58,237,0.2)',
  Simulations: 'rgba(249,115,22,0.2)',
};

const SUBJECT_SHORT_LABELS = {
  Science: 'Science',
  Math: 'Math',
  'Social Studies': 'Social Studies',
  'Reasoning Through Language Arts (RLA)': 'RLA',
};

const VOCABULARY_SUBJECT_COLORS = {
  Science: '#dc2626',
  Math: '#0284c7',
  'Social Studies': '#16a34a',
  'Reasoning Through Language Arts (RLA)': '#7c3aed',
};

const MAX_TICKER_WORDS_PER_SUBJECT = 10;

const FALLBACK_VOCABULARY = {
  Science: [
    {
      term: 'Hypothesis',
      definition:
        'A testable explanation for an observation that can be supported or refuted through experimentation.',
    },
    {
      term: 'Variable',
      definition: 'A factor in an experiment that can change or be controlled.',
    },
    {
      term: 'Control Group',
      definition:
        'The group in an experiment that does not receive the independent variable and is used for comparison.',
    },
    {
      term: 'Ecosystem',
      definition:
        'A community of living organisms interacting with each other and with their physical environment.',
    },
    {
      term: 'Photosynthesis',
      definition:
        'The process by which plants use light energy to convert carbon dioxide and water into glucose and oxygen.',
    },
    {
      term: 'Cellular Respiration',
      definition:
        'The process in which cells break down glucose and oxygen to release energy, carbon dioxide, and water.',
    },
    {
      term: 'Mitosis',
      definition:
        'A type of cell division that results in two identical daughter cells.',
    },
    {
      term: 'DNA',
      definition:
        'The molecule that carries genetic information in living organisms.',
    },
    {
      term: 'Atom',
      definition:
        'The smallest unit of an element that retains the properties of that element.',
    },
    {
      term: 'Molecule',
      definition: 'Two or more atoms that are chemically bonded together.',
    },
    {
      term: 'Gravity',
      definition: 'The force of attraction between objects with mass.',
    },
    {
      term: 'Qualitative Observation',
      definition:
        'An observation that describes qualities or characteristics without using numbers.',
    },
    {
      term: 'Quantitative Observation',
      definition:
        'An observation that uses numbers or measurements to describe what is observed.',
    },
    {
      term: 'Homeostasis',
      definition:
        'The process by which organisms maintain stable internal conditions despite external changes.',
    },
    {
      term: 'Independent Variable',
      definition:
        'The factor that is purposely changed in an experiment to test its effect.',
    },
    {
      term: 'Dependent Variable',
      definition:
        'The factor that is measured in an experiment and changes in response to the independent variable.',
    },
    {
      term: 'Scientific Method',
      definition:
        'A systematic process of asking questions, forming hypotheses, conducting experiments, and drawing conclusions.',
    },
    {
      term: 'Plate Tectonics',
      definition:
        "The theory explaining the movement of Earth's lithospheric plates and the activity at their boundaries.",
    },
    {
      term: 'Fossil',
      definition:
        'The preserved remains, impression, or trace of an organism from the past.',
    },
    {
      term: 'Energy Transfer',
      definition:
        'The movement of energy from one object or system to another.',
    },
  ],
  Math: [
    {
      term: 'Integer',
      definition: 'A whole number that can be positive, negative, or zero.',
    },
    {
      term: 'Fraction',
      definition:
        'A number that represents a part of a whole or a part of a set.',
    },
    {
      term: 'Decimal',
      definition:
        'A number that uses a decimal point to show a value smaller than one.',
    },
    {
      term: 'Percent',
      definition: 'A ratio that compares a number to 100.',
    },
    {
      term: 'Ratio',
      definition: 'A comparison of two quantities by division.',
    },
    {
      term: 'Proportion',
      definition: 'An equation stating that two ratios are equivalent.',
    },
    {
      term: 'Equation',
      definition:
        'A mathematical statement that shows two expressions are equal.',
    },
    {
      term: 'Variable',
      definition:
        'A symbol, usually a letter, that represents an unknown value.',
    },
    {
      term: 'Coefficient',
      definition:
        'The number that is multiplied by a variable in an algebraic expression.',
    },
    {
      term: 'Expression',
      definition:
        'A mathematical phrase that can contain numbers, variables, and operations.',
    },
    {
      term: 'Inequality',
      definition:
        'A mathematical statement that compares two expressions using greater than, less than, or equal to symbols.',
    },
    {
      term: 'Slope',
      definition:
        'A measure of the steepness of a line, found by the ratio of rise over run.',
    },
    {
      term: 'Quadratic Equation',
      definition:
        'An equation in the form ax� + bx + c = 0, where a, b, and c are constants and a �� 0.',
    },
    {
      term: 'Linear Function',
      definition: 'A function whose graph is a straight line.',
    },
    {
      term: 'Pythagorean Theorem',
      definition:
        'A formula that relates the side lengths of a right triangle: a� + b� = c�.',
    },
    {
      term: 'Mean',
      definition:
        'The average of a set of numbers, found by adding the numbers and dividing by how many there are.',
    },
    {
      term: 'Median',
      definition: 'The middle value in an ordered set of numbers.',
    },
    {
      term: 'Mode',
      definition: 'The number that appears most often in a set of data.',
    },
    {
      term: 'Range',
      definition:
        'The difference between the highest and lowest values in a data set.',
    },
    {
      term: 'Probability',
      definition:
        'The likelihood that an event will occur, expressed as a ratio, fraction, or percent.',
    },
    {
      term: 'Factor',
      definition: 'A number that divides another number evenly.',
    },
    {
      term: 'Multiple',
      definition: 'The product of a number and any whole number.',
    },
    {
      term: 'Prime Number',
      definition:
        'A whole number greater than 1 that has exactly two factors: 1 and itself.',
    },
    {
      term: 'Composite Number',
      definition:
        'A whole number greater than 1 that has more than two factors.',
    },
    {
      term: 'Perimeter',
      definition: 'The total distance around the outside of a shape.',
    },
    {
      term: 'Area',
      definition: 'The amount of surface covered by a shape.',
    },
    {
      term: 'Volume',
      definition: 'The amount of space a three-dimensional object occupies.',
    },
    {
      term: 'Circumference',
      definition: 'The distance around a circle.',
    },
    {
      term: 'Exponent',
      definition:
        'A small number written above and to the right of a base number that shows how many times the base is multiplied by itself.',
    },
    {
      term: 'Order of Operations',
      definition:
        'The rules that tell you the correct sequence to evaluate a mathematical expression (PEMDAS).',
    },
  ],
  'Reasoning Through Language Arts (RLA)': [
    {
      term: 'Main Idea',
      definition:
        'The central point or most important concept that an author wants the reader to understand.',
    },
    {
      term: 'Supporting Detail',
      definition:
        'Information that explains, proves, or enhances the main idea.',
    },
    {
      term: 'Inference',
      definition:
        'A conclusion reached by using evidence from the text and your own reasoning.',
    },
    {
      term: 'Tone',
      definition: "The author's attitude toward the subject or audience.",
    },
    {
      term: 'Theme',
      definition:
        'The underlying message or lesson the author wants to convey.',
    },
    {
      term: 'Thesis Statement',
      definition:
        'A sentence that states the main point or argument of an essay.',
    },
    {
      term: 'Topic Sentence',
      definition: 'The sentence that expresses the main idea of a paragraph.',
    },
    {
      term: 'Transition',
      definition:
        'A word or phrase that connects ideas and helps writing flow smoothly.',
    },
    {
      term: 'Evidence',
      definition: 'Facts, examples, or details used to support a claim.',
    },
    {
      term: 'Claim',
      definition: 'A statement or position that requires support.',
    },
    {
      term: 'Counterclaim',
      definition: "An opposing viewpoint that challenges the writer's claim.",
    },
    {
      term: 'Audience',
      definition:
        'The specific group of readers or listeners a text is written for.',
    },
    {
      term: 'Purpose',
      definition:
        'The reason why an author writes a text: to inform, persuade, entertain, or explain.',
    },
    {
      term: 'Figurative Language',
      definition:
        'Words or expressions that go beyond literal meaning, such as metaphors and similes.',
    },
    {
      term: 'Metaphor',
      definition:
        'A comparison between two unlike things without using like or as.',
    },
    {
      term: 'Simile',
      definition:
        'A comparison between two unlike things using the words like or as.',
    },
    {
      term: 'Connotation',
      definition: 'The emotional or cultural meaning attached to a word.',
    },
    {
      term: 'Denotation',
      definition: 'The literal, dictionary definition of a word.',
    },
    {
      term: 'Context Clues',
      definition:
        'Hints within a sentence or paragraph that help the reader determine the meaning of an unfamiliar word.',
    },
    {
      term: 'Revising',
      definition:
        'Improving a draft by adding, removing, or rearranging ideas for clarity and effectiveness.',
    },
    {
      term: 'Editing',
      definition:
        'Correcting grammar, spelling, and punctuation errors in a draft.',
    },
    {
      term: 'Proofreading',
      definition:
        'Reviewing a final draft carefully to catch small errors before publishing.',
    },
    {
      term: 'Persuasive Writing',
      definition:
        'Writing that aims to convince the reader to accept a viewpoint or take a specific action.',
    },
    {
      term: 'Narrative Writing',
      definition:
        'Writing that tells a story with characters, setting, and plot.',
    },
    {
      term: 'Informational Text',
      definition: 'Nonfiction writing that provides facts about a topic.',
    },
    {
      term: 'Point of View',
      definition: 'The perspective from which a story is told.',
    },
    {
      term: 'First-Person Point of View',
      definition:
        'A storytelling perspective in which the narrator is a character in the story and uses words like I and we.',
    },
    {
      term: 'Third-Person Point of View',
      definition:
        'A storytelling perspective where the narrator is outside the story and uses words like he, she, or they.',
    },
    {
      term: 'Chronological Order',
      definition:
        'A text structure that presents events in the order they happened.',
    },
    {
      term: 'Cause and Effect',
      definition:
        'A text structure that explains why something happens and the result of it.',
    },
  ],
  'Social Studies': [
    {
      term: 'Democracy',
      definition:
        'A system of government in which citizens hold the power to make decisions through voting.',
    },
    {
      term: 'Republic',
      definition:
        'A form of government in which citizens elect representatives to make decisions on their behalf.',
    },
    {
      term: 'Constitution',
      definition:
        'A written plan that outlines the structure, powers, and limits of a government.',
    },
    {
      term: 'Amendment',
      definition:
        'A change or addition to a legal or governmental document, such as the U.S. Constitution.',
    },
    {
      term: 'Federalism',
      definition:
        'A system of government in which power is divided between a national government and state governments.',
    },
    {
      term: 'Separation of Powers',
      definition:
        'The division of government responsibilities into distinct branches to prevent any one branch from becoming too powerful.',
    },
    {
      term: 'Checks and Balances',
      definition:
        'A system that allows each branch of government to limit the powers of the other branches.',
    },
    {
      term: 'Suffrage',
      definition: 'The right to vote in political elections.',
    },
    {
      term: 'Civil Rights',
      definition:
        'The rights of citizens to political and social freedom and equality.',
    },
    {
      term: 'Industrialization',
      definition:
        'The development of industries in a country or region on a wide scale.',
    },
    {
      term: 'Urbanization',
      definition:
        'The growth of cities and the movement of people from rural areas to urban centers.',
    },
    {
      term: 'Immigration',
      definition: 'The movement of people into a country from another country.',
    },
    {
      term: 'Cultural Diffusion',
      definition:
        'The spread of cultural beliefs and practices from one group to another.',
    },
    {
      term: 'Economy',
      definition:
        'The system by which goods and services are produced, distributed, and consumed.',
    },
    {
      term: 'Inflation',
      definition:
        'A general increase in prices and a decrease in the purchasing value of money.',
    },
    {
      term: 'Gross Domestic Product',
      definition:
        'The total value of all goods and services produced in a country during a specific time period.',
    },
    {
      term: 'Supply and Demand',
      definition:
        'The relationship between the amount of a product available and the desire of buyers for it, which affects price.',
    },
    {
      term: 'Primary Source',
      definition:
        'An original document or firsthand account created at the time of an event.',
    },
    {
      term: 'Secondary Source',
      definition:
        'A document or account that interprets or analyzes primary sources.',
    },
    {
      term: 'Manifest Destiny',
      definition:
        'The 19th-century belief that the United States was destined to expand across the North American continent.',
    },
    {
      term: 'Reconstruction',
      definition:
        'The period after the U.S. Civil War when southern states were reorganized and reintegrated into the Union.',
    },
    {
      term: 'Great Depression',
      definition:
        'A severe worldwide economic downturn that took place during the 1930s.',
    },
    {
      term: 'Cold War',
      definition:
        'The period of political tension and military rivalry between the United States and the Soviet Union after World War II.',
    },
    {
      term: 'Bill of Rights',
      definition:
        'The first ten amendments to the U.S. Constitution that protect individual liberties.',
    },
    {
      term: 'Legislature',
      definition: 'The branch of government responsible for making laws.',
    },
    {
      term: 'Executive Branch',
      definition: 'The branch of government responsible for enforcing laws.',
    },
    {
      term: 'Judicial Branch',
      definition:
        'The branch of government responsible for interpreting laws and administering justice.',
    },
    {
      term: 'Monarchy',
      definition:
        'A form of government in which a single person, such as a king or queen, rules for life.',
    },
    {
      term: 'Tariff',
      definition: 'A tax imposed on imported goods.',
    },
    {
      term: 'Treaty',
      definition: 'A formal agreement between two or more countries.',
    },
  ],
};

function normalizeVocabularyEntry(entry) {
  if (!entry) return null;
  if (typeof entry === 'string') {
    const trimmed = entry.trim();
    return trimmed ? { term: trimmed, definition: '' } : null;
  }
  if (typeof entry !== 'object') return null;
  const term = typeof entry.term === 'string' ? entry.term.trim() : '';
  if (!term) return null;
  const definition =
    typeof entry.definition === 'string' ? entry.definition.trim() : '';
  const example = typeof entry.example === 'string' ? entry.example.trim() : '';
  const normalized = { term, definition };
  if (example) {
    normalized.example = example;
  }
  return normalized;
}

function mergeVocabularyData(base, override) {
  const result = { ...base };
  if (!override || typeof override !== 'object') {
    return result;
  }
  Object.entries(override).forEach(([subject, entries]) => {
    if (!Array.isArray(entries)) {
      return;
    }
    const normalizedEntries = entries
      .map(normalizeVocabularyEntry)
      .filter(Boolean);
    if (normalizedEntries.length) {
      result[subject] = normalizedEntries;
    }
  });
  return result;
}

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
    if (this.state.err) {
      return (
        <div
          style={{
            padding: '16px',
            background: '#fee2e2',
            color: '#991b1b',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <h2 style={{ marginTop: 0 }}>Something went wrong.</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.err)}</pre>
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

// Fallback alias for API_BASE for legacy code safety
const API_BASE =
  typeof window !== 'undefined' && window.__CLIENT_CONFIG__?.API_BASE_URL
    ? window.__CLIENT_CONFIG__.API_BASE_URL
    : API_BASE_URL;
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
};

const resolveSubjectParam = (subject) => {
  if (!subject) {
    return '';
  }
  return SUBJECT_PARAM_MAP[subject] || subject;
};

function applySafeMathFix(text) {
  if (typeof text !== 'string') {
    return text;
  }
  if (typeof fixAllMathInText === 'function') {
    return fixAllMathInText(text);
  }
  let working = text;
  if (typeof collapseUnderscoredLatexMacros === 'function') {
    working = collapseUnderscoredLatexMacros(working);
  }
  if (typeof addMissingBackslashesInMath === 'function') {
    return addMissingBackslashesInMath(working);
  }
  const legacy =
    typeof window !== 'undefined' &&
    window.TextSanitizer &&
    window.TextSanitizer.addMissingBackslashesInMath;
  if (typeof legacy === 'function') {
    return legacy(working);
  }
  return working;
}

const ALLOWED_HTML_TAGS = [
  'a',
  'b',
  'strong',
  'i',
  'em',
  'u',
  's',
  'span',
  'p',
  'br',
  'ul',
  'ol',
  'li',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'caption',
  'colgroup',
  'col',
  'code',
  'pre',
  'sup',
  'sub',
  'div',
  'img',
];
const ALLOWED_HTML_ATTR = [
  'href',
  'title',
  'target',
  'rel',
  'colspan',
  'rowspan',
  'align',
  'scope',
  'src',
  'alt',
  'class',
];
const ENTITY_DECODER =
  typeof document !== 'undefined' ? document.createElement('textarea') : null;

function collapseSplitLatexCommands(source) {
  if (typeof source !== 'string' || source.length === 0) {
    return source;
  }

  let normalized = source.replace(/\\{2}(?=[A-Za-z_])/g, '\\');

  let previous;
  do {
    previous = normalized;
    normalized = normalized.replace(/([A-Za-z])\\_/g, '$1');
  } while (normalized !== previous);

  return normalized.replace(
    /\\([A-Za-z])(?:\\([A-Za-z]))+/g,
    (match) => `\\${match.replace(/\\/g, '')}`
  );
}

function normalizeLatex(text) {
  if (typeof text !== 'string' || text.length === 0) {
    return text;
  }

  let normalized = text;

  normalized = normalized.replace(
    /(?<!\\)\$([0-9]+(?:\.[0-9]{1,2})?)/g,
    (_match, amount) => `\\$${amount}`
  );

  normalized = normalized
    .replace(/\$\$([\s\S]*?)\$\$/g, '$1')
    .replace(/(?<!\\)\$([^$]*?)(?<!\\)\$/g, '$1')
    .replace(/\\\(([^]*?)\\\)/g, '$1')
    .replace(/\\\[([^]*?)\\\]/g, '$1');

  // unwrap accidentally math-wrapped currency, e.g. "$12.50$" -> "$12.50"
  normalized = normalized.replace(
    /\$(\s*\d+(?:[.,]\d{1,2}))\$/g,
    (_m, amount) => `$${amount.trim()}`
  );
  // close-up whitespace after literal $, e.g. "$   12" -> "$12"
  normalized = normalized.replace(/\$\s+(\d)/g, '$$1');

  normalized = normalized.replace(/\\dfrac/g, '\\frac');

  normalized = normalized
    // repair /frac, ^rac, ��rac, stray spaces before 'rac'
    .replace(/(?:\\|\/|[\u2191\^])\s*rac\s*\{/g, '\\frac{')
    .replace(/\\frac\s+([^\s{}]+)\s+([^\s{}]+)/g, '\\frac{$1}{$2}')
    .replace(
      /\\frac\s*\{\s*([^{}]+?)\s*\}\s*\{\s*([^{}]+?)\s*\}/g,
      (_match, a, b) => `\\frac{${a.trim()}}{${b.trim()}}`
    );

  normalized = collapseSplitLatexCommands(normalized);

  if (typeof collapseUnderscoredLatexMacros === 'function') {
    normalized = collapseUnderscoredLatexMacros(normalized);
  }

  normalized = normalized.replace(/(?<![A-Za-z])rac\s*\{/g, '\\frac{');

  normalized = normalized.replace(
    /<\/?(?:table|thead|tbody|tfoot|tr|th|td|caption|colgroup|col)[^>]*>/gi,
    ' '
  );
  normalized = normalized.replace(/<[^>]+>/g, ' ');

  normalized = normalized.replace(/(?<!\\)\*/g, '\\*');

  normalized = normalized.replace(/(?<!\\)_/g, (match, offset, source) => {
    const prev = offset > 0 ? source[offset - 1] : '';
    if (/^[A-Za-z0-9)]$/.test(prev)) {
      return match;
    }
    return '\\_';
  });

  return normalized.replace(/\s{2,}/g, ' ').trim();
}

function normalizeLatexForKaTeX(latex) {
  if (typeof latex !== 'string') return latex;
  return latex
    .replace(/\\\\([A-Za-z]+)/g, '\\$1')
    .replace(/\\left\s*/g, '')
    .replace(/\\right\s*/g, '');
}

const KATEX_RENDER_OPTIONS = { throwOnError: false, strict: 'ignore' };

function renderLatexToHtml(latexInput) {
  if (typeof latexInput !== 'string') {
    return '';
  }
  if (typeof katex === 'undefined') {
    throw new Error('KaTeX not available');
  }
  const latex = normalizeLatexForKaTeX(latexInput);
  if (
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function' &&
    typeof katex.render === 'function'
  ) {
    const container = document.createElement('span');
    katex.render(latex, container, KATEX_RENDER_OPTIONS);
    return container.innerHTML;
  }
  if (typeof katex.renderToString === 'function') {
    return katex.renderToString(latex, KATEX_RENDER_OPTIONS);
  }
  throw new Error('KaTeX render helpers missing');
}

function normalizeFormulaLatex(latex) {
  if (typeof latex !== 'string') {
    return '';
  }

  let working = latex;

  try {
    working = applySafeMathFix(working);
  } catch (error) {
    console.warn('Failed to sanitize formula latex:', error?.message || error);
  }

  try {
    working = normalizeLatex(working);
  } catch (error) {
    console.warn('Failed to normalize formula latex:', error?.message || error);
  }

  return working;
}

function smartWrapLatex(input) {
  if (typeof input !== 'string' || input.length === 0) {
    return input;
  }

  const slots = [];
  const masked = input.replace(/\\\([^\)]*\\\)|\$[^$]+\$/g, (match) => {
    slots.push(match);
    return `@@M${slots.length - 1}@@`;
  });

  const MACRO_PATTERN =
    /\\(?:frac|sqrt|text|pi|times|cdot|le|ge|lt|gt|neq|approx|sin|cos|tan|log|ln|pm|mp|theta|alpha|beta|gamma)\b/y;

  const grabBraces = (source, start) => {
    if (source[start] !== '{') {
      return 0;
    }
    let depth = 0;
    let index = start;
    while (index < source.length) {
      const ch = source[index++];
      if (ch === '{') {
        depth += 1;
      } else if (ch === '}') {
        depth -= 1;
        if (depth === 0) {
          return index - start;
        }
      }
    }
    return 0;
  };

  let result = '';
  let cursor = 0;

  while (cursor < masked.length) {
    const char = masked[cursor];
    if (char === '\\') {
      MACRO_PATTERN.lastIndex = cursor;
      const match = MACRO_PATTERN.exec(masked);
      if (match) {
        let end = MACRO_PATTERN.lastIndex;
        if (match[0] === '\\frac') {
          const first = grabBraces(masked, end);
          if (first) {
            end += first;
            const second = grabBraces(masked, end);
            if (second) {
              end += second;
            }
          }
        } else {
          const groupLen = grabBraces(masked, end);
          if (groupLen) {
            end += groupLen;
          }
        }
        const segment = masked.slice(cursor, end);
        result += `\\(${segment}\\)`;
        cursor = end;
        continue;
      }
    }
    result += char;
    cursor += 1;
  }

  // Sanity cases:
  // equation \frac{x}{4} = \frac{15}{20}?
  // 1\frac{1}{2} cups
  // no more than \text{P500}, spent \text{P120}
  // /frac{3}{4}, ^rac{2}{3}, ��rac{1}{2}

  return result.replace(/@@M(\d+)@@/g, (_match, index) => slots[Number(index)]);
}

function escapeHtml(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return '';
  }
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function stripLeakedMathPlaceholders(text) {
  if (typeof text !== 'string' || text.length === 0) {
    return text;
  }
  return text
    .replace(/(?:\f|\\f)\\?_?MATH_SEGMENT_[A-Z0-9]+/gi, '')
    .replace(/MATH_SEGMENT_[A-Z0-9]+/gi, '');
}

function formatExponents(input) {
  if (typeof input !== 'string') return input;

  const safe = input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return safe.replace(
    /([A-Za-z0-9\)])\^(\d+)/g,
    (_, base, exp) => `${base}<sup>${exp}</sup>`
  );
}

function renderStem(text) {
  if (typeof text !== 'string') {
    return '';
  }

  const cleanedText = preprocessRawContent(text, { normalizeSpacing: true });
  const segments = extractMathSegments(cleanedText);
  const renderedParts = [];

  for (const segment of segments) {
    if (segment.type === 'math') {
      const pretty = formatExponents(segment.value);
      renderedParts.push(`<span class="math-inline">${pretty}</span>`);
    } else {
      renderedParts.push(segment.value);
    }
  }

  const combinedHtml = renderedParts.join('');
  const sanitizer =
    window.DOMPurify && window.DOMPurify.sanitize
      ? window.DOMPurify.sanitize
      : (v) => v;
  return sanitizer(combinedHtml, {
    ALLOWED_TAGS: [...ALLOWED_HTML_TAGS, 'span', 'sup', 'path', 'svg'],
    ALLOWED_ATTR: [...ALLOWED_HTML_ATTR, 'style', 'd', 'viewBox', 'xmlns'],
  });
}

// Render KaTeX for premade/static quizzes only; leaves AI/dynamic to renderStem
function renderStemWithKatex(text) {
  if (typeof text !== 'string') return '';

  // Work on RAW text: do not preprocess away math delimiters for premade content
  const segments = extractMathSegments(text);
  const parts = [];

  const moneyRegex = /^\$\d+(?:\.\d{1,2})?$/; // "$16" or "$12.50"
  const pureNumber = /^\d+(?:\.\d{1,2})?$/; // 16 or 12.50

  for (const seg of segments.length
    ? segments
    : [{ type: 'text', value: text }]) {
    if (seg.type !== 'math') {
      // Sanitize non-math text directly; keep allowed tags minimal
      const sanitizer =
        window.DOMPurify && window.DOMPurify.sanitize
          ? window.DOMPurify.sanitize
          : null;
      const cleaned = sanitizer
        ? sanitizer(seg.value, {
            ALLOWED_TAGS: ALLOWED_HTML_TAGS,
            ALLOWED_ATTR: ALLOWED_HTML_ATTR,
          })
        : escapeHtml(seg.value);
      parts.push(cleaned);
      continue;
    }

    const raw = seg.raw || '';
    const body = (seg.value || '').trim();

    // Money guard: If raw has single-dollar delimiters and body is a plain number, treat as currency text
    const isSingleDollarWrapped =
      /^\$[^$][\s\S]*\$$/.test(raw) && !/^\$\$[\s\S]*\$\$/.test(raw);
    const isPlainMoney = isSingleDollarWrapped && pureNumber.test(body);

    if (isPlainMoney) {
      const escaped = `\\$${body}`;
      parts.push(`<span class="math-inline">${escaped}</span>`);
      continue;
    }

    // Also handle the rare case where the content itself starts with $digits ... within other delimiters
    if (moneyRegex.test(body)) {
      const escaped = body.replace(/^\$/, '\\$');
      parts.push(`<span class="math-inline">${escaped}</span>`);
      continue;
    }

    try {
      const html = katex.renderToString(body, {
        throwOnError: false,
        displayMode: Boolean(seg.displayMode),
      });
      parts.push(html);
    } catch (e) {
      // Fallback to plain sanitized text for this segment (guard DOMPurify)
      const _san =
        window.DOMPurify && window.DOMPurify.sanitize
          ? window.DOMPurify.sanitize
          : null;
      const safe = _san
        ? _san(body, {
            ALLOWED_TAGS: ALLOWED_HTML_TAGS,
            ALLOWED_ATTR: ALLOWED_HTML_ATTR,
          })
        : escapeHtml(body);
      parts.push(`<span class="math-inline">${safe}</span>`);
    }
  }

  const combined = parts.join('');
  // Final pass sanitize (guard DOMPurify)
  const finalSan =
    window.DOMPurify && window.DOMPurify.sanitize
      ? window.DOMPurify.sanitize
      : null;
  return finalSan
    ? finalSan(combined, {
        ALLOWED_TAGS: [...ALLOWED_HTML_TAGS, 'span', 'sup', 'svg', 'path'],
        ALLOWED_ATTR: [...ALLOWED_HTML_ATTR, 'style', 'd', 'viewBox', 'xmlns'],
      })
    : combined;
}

const GEOMETRY_FIGURES_ENABLED = Boolean(
  typeof window !== 'undefined' &&
    window.__APP_CONFIG__ &&
    window.__APP_CONFIG__.geometryFiguresEnabled
);

const DEFAULT_FIGURE_STYLE = {
  stroke: '#000000',
  fill: 'rgba(96, 165, 250, 0.12)',
  labelColor: '#000000',
  pointFill: '#ffffff',
};

const normalizeNumber = (value) => {
  if (typeof value === 'number') return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const normalizePoint = (point = {}) => {
  const x = normalizeNumber(point.x);
  const y = normalizeNumber(point.y);
  if (typeof x !== 'number' || typeof y !== 'number') {
    return undefined;
  }
  return {
    x,
    y,
    label: typeof point.label === 'string' ? point.label : undefined,
  };
};

const mapPoints = (list) => {
  if (!Array.isArray(list)) return [];
  return list.map(normalizePoint).filter(Boolean);
};

const midpoint = (a, b) => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

const findPointByLabel = (points, label) => {
  if (!label) return undefined;
  return points.find((pt) => pt.label === label);
};

const renderPointMarkers = (points, style) => {
  return points.map((pt, index) => (
    <g key={`pt-${index}`}>
      <circle
        cx={pt.x}
        cy={pt.y}
        r={1.8}
        fill={style.pointFill}
        stroke={style.stroke}
        strokeWidth={0.6}
      />
      {pt.label && (
        <text
          x={pt.x + 2.8}
          y={pt.y - 2.2}
          fontSize={6}
          fill={style.labelColor}
        >
          {pt.label}
        </text>
      )}
    </g>
  ));
};

const renderSideLabels = (points, sideLabels = [], style) => {
  if (!Array.isArray(sideLabels)) return [];
  return sideLabels
    .map((entry, index) => {
      if (
        !entry ||
        !Array.isArray(entry.between) ||
        entry.between.length !== 2 ||
        typeof entry.text !== 'string'
      ) {
        return null;
      }
      const a = findPointByLabel(points, entry.between[0]);
      const b = findPointByLabel(points, entry.between[1]);
      if (!a || !b) return null;
      const mid = midpoint(a, b);
      return (
        <text
          key={`side-label-${index}`}
          x={mid.x}
          y={mid.y - 1.5}
          fontSize={6}
          textAnchor="middle"
          fill={style.labelColor}
        >
          {entry.text}
        </text>
      );
    })
    .filter(Boolean);
};

const renderAdditionalLabels = (labels = [], style) => {
  if (!Array.isArray(labels)) return [];
  return labels
    .map((label, index) => {
      const normalized = normalizePoint(label);
      if (!normalized || typeof label.text !== 'string') {
        return null;
      }
      const dx = normalizeNumber(label.dx) || 0;
      const dy = normalizeNumber(label.dy) || 0;
      return (
        <text
          key={`label-${index}`}
          x={normalized.x + dx}
          y={normalized.y + dy}
          fontSize={6}
          textAnchor={label.textAnchor || 'middle'}
          fill={style.labelColor}
        >
          {label.text}
        </text>
      );
    })
    .filter(Boolean);
};

const renderSegments = (segments = [], style) => {
  if (!Array.isArray(segments)) return [];
  return segments
    .map((segment, index) => {
      if (
        !segment ||
        !Array.isArray(segment.from) ||
        !Array.isArray(segment.to)
      ) {
        return null;
      }
      const from = segment.from.map(normalizeNumber);
      const to = segment.to.map(normalizeNumber);
      if (
        from.length !== 2 ||
        to.length !== 2 ||
        from.some((v) => typeof v !== 'number') ||
        to.some((v) => typeof v !== 'number')
      ) {
        return null;
      }
      const dashArray = segment.dashed ? '4,3' : undefined;
      const labelText =
        typeof segment.label === 'string' ? segment.label : null;
      const labelOffset = Array.isArray(segment.labelOffset)
        ? segment.labelOffset.map(normalizeNumber)
        : [];
      const mid = { x: (from[0] + to[0]) / 2, y: (from[1] + to[1]) / 2 };

      return (
        <g key={`segment-${index}`}>
          <line
            x1={from[0]}
            y1={from[1]}
            x2={to[0]}
            y2={to[1]}
            stroke={style.stroke}
            strokeWidth={1}
            strokeDasharray={dashArray}
          />
          {labelText && (
            <text
              x={mid.x + (labelOffset[0] || 0)}
              y={mid.y + (labelOffset[1] || -2)}
              fontSize={6}
              textAnchor="middle"
              fill={style.labelColor}
            >
              {labelText}
            </text>
          )}
        </g>
      );
    })
    .filter(Boolean);
};

const polygonRenderer = (params = {}, style, { includeRightAngle } = {}) => {
  const points = mapPoints(params.points);
  if (points.length < 3) return null;

  const polygonPoints = points.map((pt) => `${pt.x},${pt.y}`).join(' ');
  const elements = [
    <polygon
      key="polygon"
      points={polygonPoints}
      fill={style.fill}
      stroke={style.stroke}
      strokeWidth={1.5}
    />,
    ...renderPointMarkers(points, style),
    ...renderSideLabels(points, params.sideLabels, style),
    ...renderAdditionalLabels(params.labels, style),
    ...renderSegments(params.segments, style),
  ];

  if (includeRightAngle && params.rightAngle) {
    const vertexLabel = params.rightAngle.vertex;
    const size = normalizeNumber(params.rightAngle.size) || 8;
    const vertex = findPointByLabel(points, vertexLabel) || points[0];
    const vertexIndex = points.findIndex((pt) => pt === vertex);
    const prev = points[(vertexIndex - 1 + points.length) % points.length];
    const next = points[(vertexIndex + 1) % points.length];
    if (prev && next) {
      const v1 = { x: prev.x - vertex.x, y: prev.y - vertex.y };
      const v2 = { x: next.x - vertex.x, y: next.y - vertex.y };
      const len1 = Math.hypot(v1.x, v1.y) || 1;
      const len2 = Math.hypot(v2.x, v2.y) || 1;
      const u1 = { x: (v1.x / len1) * size, y: (v1.y / len1) * size };
      const u2 = { x: (v2.x / len2) * size, y: (v2.y / len2) * size };
      const p1 = { x: vertex.x + u1.x, y: vertex.y + u1.y };
      const p2 = { x: p1.x + u2.x, y: p1.y + u2.y };
      const p3 = { x: vertex.x + u2.x, y: vertex.y + u2.y };
      elements.push(
        <polygon
          key="right-angle"
          points={`${vertex.x},${vertex.y} ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
          fill="rgba(30, 64, 175, 0.12)"
          stroke={style.stroke}
          strokeWidth={0.8}
        />
      );
    }
  }

  return {
    elements,
    pointsForBounds: points,
  };
};

const rectangleRenderer = (params = {}, style) => {
  const origin = normalizePoint(params.origin) || { x: 15, y: 15 };
  const width = normalizeNumber(params.width);
  const height = normalizeNumber(params.height);
  if (typeof width !== 'number' || typeof height !== 'number') return null;
  const points = [
    origin,
    { x: origin.x + width, y: origin.y },
    { x: origin.x + width, y: origin.y + height },
    { x: origin.x, y: origin.y + height },
  ];

  const base = polygonRenderer(
    {
      points,
      labels: params.labels,
      sideLabels: params.sideLabels,
      segments: params.segments,
    },
    style
  );
  if (!base) return null;
  return base;
};

const circleRenderer = (params = {}, style) => {
  const center = normalizePoint(params.center) || { x: 50, y: 50 };
  const radius = normalizeNumber(params.radius);
  if (typeof radius !== 'number') return null;
  const points = mapPoints(params.points);
  const elements = [
    <circle
      key="circle"
      cx={center.x}
      cy={center.y}
      r={radius}
      fill={style.fill}
      stroke={style.stroke}
      strokeWidth={1.5}
    />,
    ...renderPointMarkers(points, style),
    ...renderAdditionalLabels(params.labels, style),
    ...renderSegments(params.segments, style),
  ];

  if (params.radiusLabel) {
    elements.push(
      <text
        key="radius-label"
        x={center.x + radius / 2}
        y={center.y - 2}
        fontSize={6}
        textAnchor="middle"
        fill={style.labelColor}
      >
        {params.radiusLabel}
      </text>
    );
  }

  if (params.showRadius !== false) {
    elements.push(
      <line
        key="radius-line"
        x1={center.x}
        y1={center.y}
        x2={center.x + radius}
        y2={center.y}
        stroke={style.stroke}
        strokeWidth={1}
        strokeDasharray="4,3"
      />
    );
  }

  return {
    elements,
    pointsForBounds: [
      ...points,
      { x: center.x + radius, y: center.y },
      { x: center.x - radius, y: center.y },
      { x: center.x, y: center.y + radius },
      { x: center.x, y: center.y - radius },
    ],
  };
};

const regularPolygonRenderer = (params = {}, style) => {
  const center = normalizePoint(params.center) || { x: 50, y: 50 };
  const radius = normalizeNumber(params.radius);
  const sides = Math.max(3, Math.floor(normalizeNumber(params.sides) || 0));
  if (typeof radius !== 'number' || !Number.isFinite(sides) || sides < 3)
    return null;
  const startAngle =
    (normalizeNumber(params.startAngle) || -90) * (Math.PI / 180);
  const points = Array.from({ length: sides }).map((_, index) => {
    const angle = startAngle + (index * 2 * Math.PI) / sides;
    return {
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
      label:
        params.pointLabels && params.pointLabels[index]
          ? params.pointLabels[index]
          : undefined,
    };
  });

  return polygonRenderer(
    {
      points,
      labels: params.labels,
      sideLabels: params.sideLabels,
      segments: params.segments,
    },
    style
  );
};

const angleRenderer = (params = {}, style) => {
  const vertex = normalizePoint(params.vertex);
  const ray1 = normalizePoint(params.ray1);
  const ray2 = normalizePoint(params.ray2);
  if (!vertex || !ray1 || !ray2) return null;

  const pointsForBounds = [vertex, ray1, ray2];
  const elements = [
    <line
      key="ray1"
      x1={vertex.x}
      y1={vertex.y}
      x2={ray1.x}
      y2={ray1.y}
      stroke={style.stroke}
      strokeWidth={1.2}
    />,
    <line
      key="ray2"
      x1={vertex.x}
      y1={vertex.y}
      x2={ray2.x}
      y2={ray2.y}
      stroke={style.stroke}
      strokeWidth={1.2}
    />,
    ...renderPointMarkers([vertex, ray1, ray2], style),
    ...renderAdditionalLabels(params.labels, style),
    ...renderSegments(params.segments, style),
  ];

  const angleLabel =
    typeof params.angleLabel === 'string' ? params.angleLabel : null;
  const radius = normalizeNumber(params.arcRadius) || 12;

  const drawAngleArc = () => {
    const startVec = { x: ray1.x - vertex.x, y: ray1.y - vertex.y };
    const endVec = { x: ray2.x - vertex.x, y: ray2.y - vertex.y };
    const startAngle = Math.atan2(startVec.y, startVec.x);
    let endAngle = Math.atan2(endVec.y, endVec.x);
    while (endAngle < startAngle) {
      endAngle += Math.PI * 2;
    }
    const arcSweep = endAngle - startAngle;
    const largeArcFlag = arcSweep > Math.PI ? 1 : 0;
    const arcEnd = {
      x: vertex.x + radius * Math.cos(endAngle),
      y: vertex.y + radius * Math.sin(endAngle),
    };
    const arcStart = {
      x: vertex.x + radius * Math.cos(startAngle),
      y: vertex.y + radius * Math.sin(startAngle),
    };

    elements.push(
      <path
        key="angle-arc"
        d={`M ${arcStart.x} ${arcStart.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${arcEnd.x} ${arcEnd.y}`}
        fill="none"
        stroke={style.stroke}
        strokeWidth={1}
      />
    );

    if (angleLabel) {
      const labelAngle = startAngle + arcSweep / 2;
      const labelPoint = {
        x: vertex.x + (radius + 6) * Math.cos(labelAngle),
        y: vertex.y + (radius + 6) * Math.sin(labelAngle),
      };
      elements.push(
        <text
          key="angle-label"
          x={labelPoint.x}
          y={labelPoint.y}
          fontSize={6}
          textAnchor="middle"
          fill={style.labelColor}
        >
          {angleLabel}
        </text>
      );
    }
  };

  drawAngleArc();

  return { elements, pointsForBounds };
};

const cylinderNetRenderer = (params = {}, style) => {
  const radius = Math.abs(normalizeNumber(params.radius));
  const height = Math.abs(normalizeNumber(params.height));
  if (!Number.isFinite(radius) || !Number.isFinite(height)) return null;
  const circumference = 2 * Math.PI * radius;
  const rectWidth = Math.max(circumference, radius * 4);
  const rectHeight = height;
  const padding = 10;
  const topCenter = { x: padding + rectWidth / 2, y: padding + radius }; // radius used as circle radius on diagram scale
  const bottomCenter = {
    x: padding + rectWidth / 2,
    y: padding + rectHeight + radius * 3,
  };

  const elements = [
    <rect
      key="lateral"
      x={padding}
      y={padding + radius * 2}
      width={rectWidth}
      height={rectHeight}
      fill={style.fill}
      stroke={style.stroke}
      strokeWidth={1.2}
    />,
    <circle
      key="top-circle"
      cx={topCenter.x}
      cy={topCenter.y}
      r={radius * 1.5}
      fill={style.fill}
      stroke={style.stroke}
      strokeWidth={1.2}
    />, // scaled for clarity
    <circle
      key="bottom-circle"
      cx={bottomCenter.x}
      cy={bottomCenter.y}
      r={radius * 1.5}
      fill={style.fill}
      stroke={style.stroke}
      strokeWidth={1.2}
    />,
    <text
      key="height-label"
      x={padding + rectWidth + 6}
      y={padding + radius * 2 + rectHeight / 2}
      fontSize={6}
      fill={style.labelColor}
    >
      h = {height}
    </text>,
    <text
      key="circumference-label"
      x={padding + rectWidth / 2}
      y={padding + radius * 2 + rectHeight + 8}
      fontSize={6}
      textAnchor="middle"
      fill={style.labelColor}
    >
      circumference = {circumference.toFixed(2)}
    </text>,
    <text
      key="radius-label-top"
      x={topCenter.x + radius * 1.5 + 6}
      y={topCenter.y}
      fontSize={6}
      fill={style.labelColor}
    >
      r = {radius}
    </text>,
    ...renderAdditionalLabels(params.labels, style),
  ];

  return {
    elements,
    pointsForBounds: [
      { x: padding, y: padding },
      { x: padding + rectWidth, y: padding + radius * 2 + rectHeight },
      { x: bottomCenter.x + radius * 1.5, y: bottomCenter.y + radius * 1.5 },
    ],
  };
};

const rectPrismNetRenderer = (params = {}, style) => {
  const length = Math.abs(normalizeNumber(params.length));
  const width = Math.abs(normalizeNumber(params.width));
  const height = Math.abs(normalizeNumber(params.height));
  if (
    !Number.isFinite(length) ||
    !Number.isFinite(width) ||
    !Number.isFinite(height)
  )
    return null;

  const padding = 10;
  const scale = 1;
  const L = length * scale;
  const W = width * scale;
  const H = height * scale;

  const elements = [];
  const pointsForBounds = [];

  const drawRect = (x, y, w, h, key, label) => {
    elements.push(
      <rect
        key={key}
        x={x}
        y={y}
        width={w}
        height={h}
        fill={style.fill}
        stroke={style.stroke}
        strokeWidth={1.2}
      />
    );
    if (label) {
      elements.push(
        <text
          key={`${key}-label`}
          x={x + w / 2}
          y={y + h / 2}
          fontSize={6}
          textAnchor="middle"
          fill={style.labelColor}
        >
          {label}
        </text>
      );
    }
    pointsForBounds.push({ x, y }, { x: x + w, y: y + h });
  };

  const startX = padding + W;
  const startY = padding + H;

  drawRect(startX, startY, L, H, 'front', `h = ${height}`);
  drawRect(startX + L, startY, W, H, 'right', `w = ${width}`);
  drawRect(startX - W, startY, W, H, 'left', `w = ${width}`);
  drawRect(startX + L + W, startY, W, H, 'extra', '');
  drawRect(startX, startY - H, L, H, 'top', `l = ${length}`);
  drawRect(startX, startY + H, L, H, 'bottom', `l = ${length}`);

  elements.push(...renderAdditionalLabels(params.labels, style));

  return { elements, pointsForBounds };
};

const geometryRenderers = {
  triangle: (params, style) =>
    polygonRenderer(params, style || DEFAULT_FIGURE_STYLE, {}),
  right_triangle: (params, style) =>
    polygonRenderer(params, style || DEFAULT_FIGURE_STYLE, {
      includeRightAngle: true,
    }),
  rectangle: (params, style) =>
    rectangleRenderer(params, style || DEFAULT_FIGURE_STYLE),
  circle: (params, style) =>
    circleRenderer(params, style || DEFAULT_FIGURE_STYLE),
  polygon: (params, style) =>
    polygonRenderer(params, style || DEFAULT_FIGURE_STYLE, {}),
  regular_polygon: (params, style) =>
    regularPolygonRenderer(params, style || DEFAULT_FIGURE_STYLE),
  line_angle: (params, style) =>
    angleRenderer(params, style || DEFAULT_FIGURE_STYLE),
  cylinder_net: (params, style) =>
    cylinderNetRenderer(params, style || DEFAULT_FIGURE_STYLE),
  rect_prism_net: (params, style) =>
    rectPrismNetRenderer(params, style || DEFAULT_FIGURE_STYLE),
};

function GeometryFigure({ spec, className }) {
  if (!GEOMETRY_FIGURES_ENABLED || !spec || typeof spec !== 'object') {
    return null;
  }

  const style = {
    ...DEFAULT_FIGURE_STYLE,
    ...(spec.style || {}),
  };

  const renderer = geometryRenderers[spec.shape];
  if (!renderer) {
    console.warn('Unsupported geometry shape:', spec.shape);
    return null;
  }

  const renderResult = renderer(spec.params || {}, style);
  if (!renderResult) {
    return null;
  }

  const points =
    renderResult.pointsForBounds && renderResult.pointsForBounds.length > 0
      ? renderResult.pointsForBounds
      : [
          { x: 0, y: 0 },
          { x: 100, y: 100 },
        ];

  let minX = Math.min(...points.map((pt) => pt.x));
  let maxX = Math.max(...points.map((pt) => pt.x));
  let minY = Math.min(...points.map((pt) => pt.y));
  let maxY = Math.max(...points.map((pt) => pt.y));

  if (spec.view) {
    const { xMin, xMax, yMin, yMax } = spec.view;
    if (typeof xMin === 'number') minX = Math.min(minX, xMin);
    if (typeof xMax === 'number') maxX = Math.max(maxX, xMax);
    if (typeof yMin === 'number') minY = Math.min(minY, yMin);
    if (typeof yMax === 'number') maxY = Math.max(maxY, yMax);
  }

  const padding =
    spec.view && typeof spec.view.padding === 'number' ? spec.view.padding : 8;
  const width = Math.max(maxX - minX, 20);
  const height = Math.max(maxY - minY, 20);

  const viewBox = `${minX - padding} ${minY - padding} ${width + padding * 2} ${
    height + padding * 2
  }`;

  return (
    <svg
      className={className}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Geometry figure"
      preserveAspectRatio="xMidYMid meet"
    >
      {renderResult.elements}
    </svg>
  );
}

function postRenderGuardrails(container, { itemIndex } = {}) {
  if (
    !container ||
    typeof document === 'undefined' ||
    typeof NodeFilter === 'undefined' ||
    !container.innerHTML
  ) {
    return;
  }

  const issues = new Set();
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null
  );
  const tableTextNodes = [];
  while (walker.nextNode()) {
    const currentNode = walker.currentNode;
    if (!currentNode || !currentNode.nodeValue) continue;
    const value = currentNode.nodeValue;
    if (/<\s*(?:tr|th|td)/i.test(value)) {
      tableTextNodes.push(currentNode);
    }
  }

  tableTextNodes.forEach((node) => {
    if (!node.parentNode) return;
    const codeEl = document.createElement('code');
    codeEl.className = 'raw-html-fragment';
    codeEl.textContent = node.nodeValue;
    node.parentNode.replaceChild(codeEl, node);
    issues.add('tableMarkup');
  });

  if (issues.size > 0) {
    const context =
      typeof itemIndex !== 'undefined' ? ` for item ${itemIndex}` : '';
    console.warn(
      `[MathText] Post-render guardrails triggered${context}: ${Array.from(
        issues
      ).join(', ')}`
    );
  }
}

function MathText({ text, className, subject }) {
  if (typeof text !== 'string' || text.trim() === '') {
    return <span className={className}></span>;
  }

  let renderedHtml;

  // ONLY run the complex math/currency renderer for the Math subject.
  if (subject === 'Math') {
    renderedHtml = renderStem(text);
  } else {
    // For all other subjects, just sanitize the HTML and display it (guard if DOMPurify missing).
    const san =
      window.DOMPurify && window.DOMPurify.sanitize
        ? window.DOMPurify.sanitize
        : (v) => v;
    renderedHtml = san(text);
  }

  const formattedHtml = formatFractions(renderedHtml);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={safeHtml(formattedHtml)}
    />
  );
}

// formatMathText()
// Apply both plain-text fraction wrapping and inline exponent superscripting
// to already-sanitized HTML. This is intended for AI/dynamic (non-premade)
// content that uses a/b and a^b without LaTeX delimiters.
function formatMathText(html) {
  if (typeof html !== 'string' || html.length === 0) return html;

  // First, wrap a/b style fractions
  let out = formatFractions(html);

  // Then, convert a^b to a<sup>b</sup> for simple bases and integer exponents
  // We avoid touching inside attributes; caret rarely appears there and the
  // input has already been sanitized.
  out = out.replace(
    /([A-Za-z0-9\)])\^(\d+)/g,
    (_m, base, exp) => `${base}<sup>${exp}</sup>`
  );

  return out;
}

function renderQuestionTextForDisplay(text, isPremade) {
  // Only allow KaTeX rendering for premade items; AI/dynamic stay plain text (fractions a/b, exponents a^b)
  const useKatex = Boolean(
    window.__APP_CONFIG__ &&
      window.__APP_CONFIG__.premadeUsesKatex === true &&
      isPremade === true
  );
  // Premade path: keep original raw math delimiters and render with KaTeX
  if (useKatex) {
    return { __html: renderStemWithKatex(text) };
  }
  // Non-premade path: basic math formatting only (plain text fractions & exponents)
  const html = renderStem(text);
  const finalHtml = formatMathText(html);
  return { __html: finalHtml };
}

function normalizeLineBreaks(value) {
  if (typeof value !== 'string') return value;
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/([^\n])\n(?!\n)/g, '$1 ')
    .replace(/\n{3,}/g, '\n\n');
}

function surroundOperatorWithSpaces(source, match, offset) {
  const before = offset > 0 ? source[offset - 1] : '';
  const after =
    offset + match.length < source.length ? source[offset + match.length] : '';
  const isAlphaBefore = before && /[A-Za-z]/.test(before);
  const isAlphaAfter = after && /[A-Za-z]/.test(after);
  if (isAlphaBefore || isAlphaAfter) {
    return match;
  }
  const trimmed = match.replace(/\s+/g, ' ').trim();
  const leading = before && !/[\s\n]/.test(before) ? ' ' : '';
  const trailing = after && !/[\s\n]/.test(after) ? ' ' : '';
  return `${leading}${trimmed}${trailing}`;
}

function normalizePunctuationSpacing(value) {
  if (typeof value !== 'string') return value;
  let result = value.replace(
    /([.,;:!?])(?=\S)/g,
    (match, punct, offset, string) => {
      const nextChar = string[offset + match.length];
      if (!nextChar) return match;
      if (/\s/.test(nextChar)) return match;
      if (
        (punct === ':' || punct === ',' || punct === '.') &&
        /[0-9]/.test(nextChar)
      ) {
        return match;
      }
      if ((punct === ':' || punct === '.') && nextChar === '/') {
        return match;
      }
      return `${punct} `;
    }
  );
  const wordOperators = ['plus', 'minus', 'times'];
  wordOperators.forEach((op) => {
    const regex = new RegExp(op, 'gi');
    result = result.replace(regex, (match, offset, string) =>
      surroundOperatorWithSpaces(string, match, offset)
    );
  });
  const dividedRegex = /divided\s+by/gi;
  result = result.replace(dividedRegex, (match, offset, string) =>
    surroundOperatorWithSpaces(string, match, offset)
  );
  result = result.replace(/[^\S\r\n]+([.,;:!?])/g, '$1');
  result = result.replace(/[^\S\r\n]{2,}/g, ' ');
  return result;
}

const LATEX_CONTROL_CHAR_ESCAPE = {
  '\f': 'f',
  '\n': 'n',
  '\t': 't',
  '\r': 'r',
  '\b': 'b',
  '\v': 'v',
};

function escapeLatexControlCharacters(input) {
  return input.replace(/[\f\n\t\r\b\v]/g, (char) => {
    const replacement = LATEX_CONTROL_CHAR_ESCAPE[char];
    return replacement ? `\\${replacement}` : char;
  });
}

function repairLatexCorruption(value) {
  if (typeof value !== 'string') return value;
  let working = value.replace(/(?:\^|\f)rac\{/gi, '\\frac{');
  working = working.replace(
    /\$\$([\s\S]+?)\$\$/g,
    (_, inner) => `$$${escapeLatexControlCharacters(inner)}$$`
  );
  working = working.replace(
    /\$([\s\S]+?)\$/g,
    (_, inner) => `$${escapeLatexControlCharacters(inner)}$`
  );
  working = working.replace(
    /\\\(([\s\S]+?)\\\)/g,
    (_, inner) => `\\(${escapeLatexControlCharacters(inner)}\\)`
  );
  return working;
}

function decodeHtmlEntities(value) {
  if (typeof value !== 'string') return '';
  if (!ENTITY_DECODER) return value;
  ENTITY_DECODER.innerHTML = value;
  return ENTITY_DECODER.value;
}

function neutralizeUnpairedDollarSigns(text) {
  if (typeof text !== 'string' || text.indexOf('$') === -1) {
    return text;
  }

  if (!(tokenizeMathSegments && restoreMathSegments)) {
    return text.replace(/(^|[^\\])\$(?!\d)/g, (_, prefix) => `${prefix}&#36;`);
  }

  const { masked, segments } = tokenizeMathSegments(text);
  const working = masked.replace(
    /(^|[^\\])\$(?!\d)/g,
    (_, prefix) => `${prefix}&#36;`
  );
  return restoreMathSegments(working, segments);
}

function escapeCurrencyDollarsMathSafe(input) {
  if (typeof input !== 'string') return input;

  if (!(tokenizeMathSegments && restoreMathSegments)) {
    let fallback = input.replace(/\\$(\s*\d[\d.,]*)/g, '&#36;$1');
    fallback = fallback.replace(/(\d[\d.,]*)(\s*)\$(?!\d)/g, '&#36;$1');
    return fallback.replace(
      /(^|[^&])\$(?!\d)/g,
      (_, prefix) => `${prefix}&#36;`
    );
  }

  const { masked, segments } = tokenizeMathSegments(input);
  let working = masked.replace(/\\$(\s*\d[\d.,]*)/g, '&#36;$1');
  working = working.replace(/(\d[\d.,]*)(\s*)\$(?!\d)/g, '&#36;$1');
  working = working.replace(
    /(^|[^&])\$(?!\d)/g,
    (_, prefix) => `${prefix}&#36;`
  );
  return restoreMathSegments(working, segments);
}

function stripBackslashesOutsideMath(input) {
  if (typeof input !== 'string') return input;

  if (!(tokenizeMathSegments && restoreMathSegments)) {
    return input.replace(/\\(?=\d|\$)/g, '');
  }

  const { masked, segments } = tokenizeMathSegments(input);
  const cleaned = masked.replace(/\\(?=\d|\$)/g, '');
  return restoreMathSegments(cleaned, segments);
}

function deglueCommonBigrams(s) {
  if (typeof s !== 'string') return s;
  const replacements = {
    inthe: 'in the',
    ofthe: 'of the',
    forthe: 'for the',
    tothe: 'to the',
    theof: 'the of',
  };

  return s.replace(/\b(inthe|ofthe|forthe|tothe|theof)\b/gi, (match) => {
    const replacement = replacements[match.toLowerCase()];
    if (!replacement) {
      return match;
    }
    if (match === match.toUpperCase()) {
      return replacement.toUpperCase();
    }
    if (match[0] === match[0].toUpperCase()) {
      return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }
    return replacement;
  });
}

function addSpacesAroundInlineMath(s) {
  if (typeof s !== 'string') return s;
  return s
    .replace(/([A-Za-z])\$(?!\$)/g, '$1 $')
    .replace(/\$(?!\$)([A-Za-z])/g, ' $1');
}

function repairSpacedTags(s) {
  if (typeof s !== 'string') return s;
  return s
    .replace(/<\s*\/\s*([a-z]+)\s*>/gi, '</$1>')
    .replace(/<\s*([a-z]+)(\s[^>]*)?>/gi, (_, tagName, attrs = '') => {
      const normalizedAttrs = attrs ? attrs.replace(/\s+$/, '') : '';
      return `<${tagName}${normalizedAttrs}>`;
    });
}

function protectTables(text) {
  if (typeof text !== 'string' || text.toLowerCase().indexOf('<table') === -1) {
    return text;
  }

  return text.replace(/<table[\s\S]*?<\/table>/gi, (tableContent) =>
    tableContent.replace(/\$/g, '&#36;')
  );
}

function preprocessRawContent(value, { normalizeSpacing = false } = {}) {
  if (typeof value !== 'string') return '';
  let working = normalizeLineBreaks(value);
  if (normalizeSpacing) {
    working = normalizePunctuationSpacing(working);
  }
  working = repairLatexCorruption(working);
  working = decodeHtmlEntities(working);

  if (tokenizeMathSegments && restoreMathSegments) {
    const { masked, segments } = tokenizeMathSegments(working);
    let plain = masked;
    if (stripTextMacroInPlain) {
      plain = stripTextMacroInPlain(plain);
    }
    if (applyPhraseSpacingRepairs) {
      plain = applyPhraseSpacingRepairs(plain);
    }
    if (normalizeCurrencyOutsideMath) {
      plain = normalizeCurrencyOutsideMath(plain);
    }
    working = restoreMathSegments(plain, segments);
  } else {
    if (stripTextMacroInPlain) {
      working = stripTextMacroInPlain(working);
    }
    if (applyPhraseSpacingRepairs) {
      working = applyPhraseSpacingRepairs(working);
    }
    if (normalizeCurrencyOutsideMath) {
      working = normalizeCurrencyOutsideMath(working);
    }
  }

  working = stripBackslashesOutsideMath(working);
  working = neutralizeUnpairedDollarSigns(working);
  working = escapeCurrencyDollarsMathSafe(working);
  working = working.replace(/(\d[\d.,]*)(\s*)&\#36;/g, '&#36;$1');
  working = addSpacesAroundInlineMath(working);
  working = repairSpacedTags(working);
  working = protectTables(working);
  working = deglueCommonBigrams(working);
  working = working.replace(/\$\s*([A-Za-z])\s*\$/g, '$1');
  return working;
}

function extractMathSegments(input) {
  const segments = [];
  if (typeof input !== 'string' || !input.length) {
    return segments;
  }
  const mathRegex =
    /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\$([\s\S]+?)\$|\\\(([\s\S]+?)\\\)/g;
  let lastIndex = 0;
  let match;
  while ((match = mathRegex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        value: input.slice(lastIndex, match.index),
      });
    }
    if (typeof match[1] !== 'undefined') {
      segments.push({
        type: 'math',
        value: match[1],
        displayMode: true,
        raw: match[0],
      });
    } else if (typeof match[2] !== 'undefined') {
      segments.push({
        type: 'math',
        value: match[2],
        displayMode: true,
        raw: match[0],
      });
    } else if (typeof match[3] !== 'undefined') {
      segments.push({
        type: 'math',
        value: match[3],
        displayMode: false,
        raw: match[0],
      });
    } else {
      segments.push({
        type: 'math',
        value: match[4],
        displayMode: false,
        raw: match[0],
      });
    }
    lastIndex = mathRegex.lastIndex;
  }
  if (lastIndex < input.length) {
    segments.push({ type: 'text', value: input.slice(lastIndex) });
  }
  return segments;
}

function sanitizeHtmlContent(
  content,
  { normalizeSpacing = false, skipPreprocess = false } = {}
) {
  if (typeof content !== 'string') return '';
  let working = content;
  if (!skipPreprocess) {
    working = preprocessRawContent(working, { normalizeSpacing });
  }

  // Convert any inline pipe tables (including compressed single-line with "||") into HTML tables
  working = normalizeInlineTablesFront(working);

  const sanitizer =
    window.DOMPurify && window.DOMPurify.sanitize
      ? window.DOMPurify.sanitize
      : null;
  if (sanitizer) {
    return formatFractions(
      sanitizer(working, {
        ALLOWED_TAGS: ALLOWED_HTML_TAGS,
        ALLOWED_ATTR: ALLOWED_HTML_ATTR,
      })
    );
  }

  return formatFractions(
    working.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  );
}

// Frontend safety: convert pipe-style tables to HTML so styles apply even if backend missed them
function normalizeInlineTablesFront(html) {
  if (typeof html !== 'string' || !html.trim()) return html;
  if (/<table/i.test(html)) return html; // already fine
  if (!html.includes('|')) return html;

  let rows;
  if (html.includes('||')) {
    rows = html
      .split('||')
      .map((r) => r.trim())
      .filter(Boolean);
  } else {
    rows = html
      .split(/\r?\n/)
      .filter((l) => l.includes('|'))
      .map((r) => r.trim())
      .filter(Boolean);
  }

  if (!rows.length) return html;

  const trs = [];
  for (const r of rows) {
    if (/^\|?\s*-{3,}/.test(r)) continue; // skip separator rows
    const cells = r
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim());
    const tds = cells.map((c) => `<td>${c}</td>`).join('');
    trs.push(`<tr>${tds}</tr>`);
  }

  if (!trs.length) return html;
  return `<table class="data-table"><tbody>${trs.join('')}</tbody></table>`;
}

// formatFractions()
// This finds plain-text math-style fractions and wraps them in <span class="frac">...</span>
// We ONLY match "number/number" or "(...)/number" or "(...)/(...)"
function formatFractions(text) {
  if (!text || typeof text !== 'string') return text;

  // 1. (2x + 1)/3  or  (a+b)/(c+d)
  const complexPattern = /\(([^\)]+)\)\s*\/\s*\(([^\)]+)\)/g;

  // 2. (2x + 1)/3  (paren over number)
  const parenOverNumberPattern = /\(([^\)]+)\)\s*\/\s*([0-9]+(\.[0-9]+)?)/g;

  // 3. 3/4 or 12/5 etc. Standalone numeric fractions
  const simpleNumericPattern =
    /\b([0-9]+(\.[0-9]+)?)\s*\/\s*([0-9]+(\.[0-9]+)?)\b/g;

  let out = text;

  // Order matters: handle the more complex forms first so we don't double-wrap
  out = out.replace(
    complexPattern,
    (match) => `<span class="frac">${match}</span>`
  );
  out = out.replace(
    parenOverNumberPattern,
    (match) => `<span class="frac">${match}</span>`
  );
  out = out.replace(
    simpleNumericPattern,
    (match) => `<span class="frac">${match}</span>`
  );

  return out;
}

function cleanRepeatedText(text) {
  if (!text || typeof text !== 'string') return text;
  const half = Math.floor(text.length / 2);
  if (text.length % 2 === 0) {
    const firstHalf = text.substring(0, half);
    const secondHalf = text.substring(half);
    if (firstHalf === secondHalf) {
      return firstHalf;
    }
  }
  return text;
}

function parseHtmlTable(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const table = doc.querySelector('table');
  if (!table) return null;
  const headers = [...table.querySelectorAll('th')].map((th) => th.innerText);
  const rows = [...table.querySelectorAll('tbody tr')];
  const labels = rows.map((row) => row.querySelector('td')?.innerText || '');
  const datasets = [];
  for (let i = 1; i < headers.length; i++) {
    datasets.push({
      label: headers[i],
      data: rows.map(
        (row) =>
          parseFloat(
            row.querySelectorAll('td')[i]?.innerText.replace(/[^0-9.-]+/g, '')
          ) || 0
      ),
      backgroundColor: `rgba(59, 130, 246, 0.6)`,
    });
  }
  return { labels, datasets };
}

function ChartDisplay({ chartData }) {
  const chartRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  React.useEffect(() => {
    if (!chartRef.current || !chartData) return;

    // Destroy any existing instance before creating a new one
    if (chartInstanceRef.current) {
      try {
        chartInstanceRef.current.destroy();
      } catch (e) {}
      chartInstanceRef.current = null;
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: 'bar',
      data: { labels: chartData.labels, datasets: chartData.datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 300 },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        try {
          chartInstanceRef.current.destroy();
        } catch (e) {}
        chartInstanceRef.current = null;
      }
    };
  }, [chartData]);

  return <canvas ref={chartRef} />;
}

// Science formula sheet data
const ScienceFormulas = [
  {
    name: 'Density',
    formula: 'd = \\frac{m}{V}',
    variables: 'd = density (mass per unit volume), m = mass, V = volume',
  },
  {
    name: 'Average Speed',
    formula: 'v = \\frac{d}{t}',
    variables: 'v = average speed, d = distance traveled, t = elapsed time',
  },
  {
    name: 'Force',
    formula: 'F = ma',
    variables: 'F = net force, m = mass, a = acceleration',
  },
  {
    name: 'Work',
    formula: 'W = F \\times d',
    variables:
      'W = work, F = applied force, d = displacement in the direction of the force',
  },
  {
    name: 'Mean (Average)',
    formula:
      '\\bar{x} = \\frac{\\text{Total of all data values}}{\\text{How many values there are}}',
    variables:
      '\\bar{x} = mean (average) of the data set: add all values together and divide by how many values there are',
  },
  {
    name: 'Range',
    formula: '\\text{Range} = \\text{Maximum value} - \\text{Minimum value}',
    variables:
      'Describes the spread between the largest and smallest values in a data set.',
  },
];

const SCI_NUMERACY_QUESTIONS = [
  {
    questionNumber: 1,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>A botanist measures the height (in cm) of five plants: 15, 18, 15, 22, and 20.</p>',
    question:
      'What is the <strong>mean (average)</strong> height of the plants?',
    answerOptions: [
      {
        text: '15 cm',
        rationale: '15 is the mode (most common), not the mean.',
        isCorrect: false,
      },
      {
        text: '18 cm',
        rationale: 'Correct. (15+18+15+22+20)=90; 90÷5=18.',
        isCorrect: true,
      },
      {
        text: '18.5 cm',
        rationale: 'Close, but not the exact average.',
        isCorrect: false,
      },
      {
        text: '22 cm',
        rationale: '22 is just the tallest plant.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 2,
    challenge_tags: ['math-1'],
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>In pea plants, purple flowers (P) are dominant over white flowers (p). Two heterozygous plants (Pp × Pp) are crossed.</p>',
    question:
      'What percent of offspring are expected to have <strong>white</strong> flowers?',
    answerOptions: [
      {
        text: '0%',
        rationale: 'Incorrect. White can appear if the plant gets pp.',
        isCorrect: false,
      },
      {
        text: '25%',
        rationale:
          'Correct. The Punnett square gives PP, Pp, Pp, pp �� 1 of 4 is pp (white).',
        isCorrect: true,
      },
      {
        text: '50%',
        rationale: '50% would be too high; only 1 of 4 is pp.',
        isCorrect: false,
      },
      {
        text: '75%',
        rationale: '75% would be purple, not white.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 3,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage: '<p>A rock has a mass of 60 g and displaces 20 cm� of water.</p>',
    question: 'What is the rock�s density?',
    answerOptions: [
      {
        text: '1 g/cm�',
        rationale: 'That would be 20 g ÷ 20 cm�.',
        isCorrect: false,
      },
      {
        text: '3 g/cm�',
        rationale: 'Correct. Density = mass ÷ volume = 60 ÷ 20 = 3 g/cm�.',
        isCorrect: true,
      },
      {
        text: '20 g/cm�',
        rationale: 'That�s just the volume, not density.',
        isCorrect: false,
      },
      {
        text: '40 g/cm�',
        rationale: 'Not based on 60 ÷ 20.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 4,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage: '<p>A car travels 150 km in 3 hours at a constant speed.</p>',
    question: 'What is the car�s average speed?',
    answerOptions: [
      {
        text: '50 km/h',
        rationale: 'Correct. 150 km ÷ 3 h = 50 km/h.',
        isCorrect: true,
      },
      {
        text: '30 km/h',
        rationale: 'Too low. That would be 90 km over 3 h.',
        isCorrect: false,
      },
      {
        text: '100 km/h',
        rationale: 'Too high. That would be 300 km in 3 h.',
        isCorrect: false,
      },
      {
        text: '450 km/h',
        rationale: 'Impossible for the data given.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 5,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>A student pushes a box with a force of 50 N across the floor for 4 m.</p>',
    question: 'How much work was done on the box?',
    answerOptions: [
      {
        text: '12.5 J',
        rationale: 'This divides instead of multiplying.',
        isCorrect: false,
      },
      {
        text: '46 N',
        rationale: 'Newtons measure force, not work (energy).',
        isCorrect: false,
      },
      {
        text: '200 J',
        rationale: 'Correct. Work W = F × d = 50 N × 4 m = 200 J.',
        isCorrect: true,
      },
      {
        text: '200 N',
        rationale: 'Units are wrong �� work is in joules.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 6,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage: '<p>A 2 kg cart accelerates at 3 m/s�.</p>',
    question: 'What net force is acting on the cart?',
    answerOptions: [
      {
        text: '0.67 N',
        rationale: 'That divides instead of multiplies.',
        isCorrect: false,
      },
      {
        text: '1.5 N',
        rationale: 'Still dividing, not multiplying.',
        isCorrect: false,
      },
      {
        text: '5 N',
        rationale: 'Close, but 2 × 3 is 6, not 5.',
        isCorrect: false,
      },
      {
        text: '6 N',
        rationale: 'Correct. F = m × a = 2 kg × 3 m/s� = 6 N.',
        isCorrect: true,
      },
    ],
  },
  {
    questionNumber: 7,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage: `<p>A student heats four samples of the same liquid:</p>
          <table class="min-w-full text-sm text-left">
            <thead><tr><th>Trial</th><th>Start Temp (�C)</th><th>End Temp (�C)</th></tr></thead>
            <tbody>
              <tr><td>A</td><td>22</td><td>30</td></tr>
              <tr><td>B</td><td>22</td><td>29</td></tr>
              <tr><td>C</td><td>22</td><td>35</td></tr>
              <tr><td>D</td><td>22</td><td>28</td></tr>
            </tbody>
          </table>`,
    question: 'Which trial had the greatest temperature increase?',
    answerOptions: [
      {
        text: 'Trial A',
        rationale: 'Increase was 30��22 = 8�C.',
        isCorrect: false,
      },
      { text: 'Trial B', rationale: 'Increase was 7�C.', isCorrect: false },
      {
        text: 'Trial C',
        rationale: 'Correct. Increase was 35��22 = 13�C, the largest.',
        isCorrect: true,
      },
      { text: 'Trial D', rationale: 'Increase was 6�C.', isCorrect: false },
    ],
  },
  {
    questionNumber: 8,
    challenge_tags: ['math-6', 'science-1'],
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>Colony counts of bacteria on 5 plates were 12, 15, 15, 18, and 30 (in thousands).</p>',
    question: 'What is the <strong>range</strong> of the data?',
    answerOptions: [
      {
        text: '12',
        rationale: '12 is just the smallest value.',
        isCorrect: false,
      },
      { text: '18', rationale: '18 is not max �� min.', isCorrect: false },
      {
        text: '30',
        rationale: '30 is just the largest value.',
        isCorrect: false,
      },
      {
        text: '18 (thousand)',
        rationale: 'Correct. Range = 30 �� 12 = 18.',
        isCorrect: true,
      },
    ],
  },
  {
    questionNumber: 9,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>In the first 20 minutes of a run, a runner goes 10 km. After 10 minutes the runner had 5 km. Assume constant speed.</p>',
    question: 'What is the runner�s speed during this period (in km/min)?',
    answerOptions: [
      {
        text: '0.25 km/min',
        rationale: 'Too low (that would be 5 km in 20 min).',
        isCorrect: false,
      },
      {
        text: '0.5 km/min',
        rationale: 'Correct. 10 km ÷ 20 min = 0.5 km/min.',
        isCorrect: true,
      },
      {
        text: '2 km/min',
        rationale: 'Too high. That would be 40 km in 20 min.',
        isCorrect: false,
      },
      {
        text: '20 km/min',
        rationale: 'Way too high for a human runner.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 10,
    challenge_tags: ['science-2', 'math-6', 'science-1'],
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>A sealed container (nothing can enter or escape) has a total mass of 120 g before a chemical reaction and 120 g after.</p>',
    question: 'Which statement is best supported by this data?',
    answerOptions: [
      {
        text: 'Mass is created during the reaction.',
        rationale: "No; mass didn't increase.",
        isCorrect: false,
      },
      {
        text: 'Mass is destroyed during the reaction.',
        rationale: "No; mass didn't decrease.",
        isCorrect: false,
      },
      {
        text: 'Mass is conserved during the reaction.',
        rationale: 'Correct. The total stayed 120 g.',
        isCorrect: true,
      },
      {
        text: 'The container leaked gas.',
        rationale: 'If it leaked, mass would drop.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 11,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>A pump moves 12 liters of water in 4 minutes at a constant rate.</p>',
    question: 'How many liters will it move in 10 minutes?',
    answerOptions: [
      {
        text: '20 L',
        rationale: 'That assumes 2 L/min. Actual rate is 3 L/min.',
        isCorrect: false,
      },
      {
        text: '24 L',
        rationale: 'That�s 12 L in 4 min scaled to 8 min, not 10.',
        isCorrect: false,
      },
      {
        text: '30 L',
        rationale: 'Correct. 12 ÷ 4 = 3 L/min. 3 × 10 = 30 L.',
        isCorrect: true,
      },
      {
        text: '120 L',
        rationale: 'Way too high for this rate.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 12,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>A household budget is $3,000 per month. Housing is 35% of the budget.</p>',
    question: 'How much money goes to housing each month?',
    answerOptions: [
      {
        text: '$700',
        rationale: 'That�s 700 / 3000 � 23%. Too low.',
        isCorrect: false,
      },
      { text: '$900', rationale: 'That�s 30% of $3,000.', isCorrect: false },
      {
        text: '$1,050',
        rationale: 'Correct. 35% of $3,000 = 0.35 × 3000 = $1,050.',
        isCorrect: true,
      },
      {
        text: '$1,500',
        rationale: 'That would be 50%, not 35%.',
        isCorrect: false,
      },
    ],
  },
];

const AppData = {
  Science: {
    icon: 'BeakerIcon',
    categories: {
      'Life Science': {
        description:
          'Explore the fundamental principles of living organisms, from the cellular level to entire ecosystems.',
        topics: [
          {
            id: 'sci_life_science_basics',
            title: 'Life Science Basics',
            description:
              'Cell structure, function, photosynthesis, and cellular respiration.',
            questions: [
              {
                questionNumber: 1,
                type: 'text',
                challenge_tags: ['science-3'], // Cells and human body systems
                passage:
                  "All living organisms are composed of cells, the basic units of life. The cell theory states that all living things are made of cells, cells are the basic unit of structure and function, and all cells come from pre-existing cells. Within a cell, organelles perform specific functions. The nucleus contains the cell's genetic material (DNA), and mitochondria are responsible for generating energy through cellular respiration.",
                question:
                  'According to the passage, what is the primary function of mitochondria?',
                answerOptions: [
                  {
                    text: "Storing the cell's genetic material.",
                    rationale: 'This is the function of the nucleus.',
                    isCorrect: false,
                  },
                  {
                    text: 'Controlling all cell activities.',
                    rationale: 'This is a broader function of the nucleus.',
                    isCorrect: false,
                  },
                  {
                    text: 'Generating energy for the cell.',
                    rationale:
                      'Correct. The passage states mitochondria generate energy.',
                    isCorrect: true,
                  },
                  {
                    text: 'Creating new cells.',
                    rationale:
                      'New cells come from pre-existing cells, a process of the entire cell.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                type: 'knowledge',
                challenge_tags: ['science-3'], // Cells and human body systems
                question:
                  'Which of the following is the correct order of organization in living things, from simplest to most complex?',
                answerOptions: [
                  {
                    text: 'Organism, Organ System, Organ, Tissue, Cell',
                    rationale: 'This order is reversed.',
                    isCorrect: false,
                  },
                  {
                    text: 'Cell, Tissue, Organ, Organ System, Organism',
                    rationale:
                      'Correct. Cells form tissues, tissues form organs, organs form organ systems, and organ systems make up an organism.',
                    isCorrect: true,
                  },
                  {
                    text: 'Tissue, Cell, Organ, Organism, Organ System',
                    rationale: 'This order is incorrect.',
                    isCorrect: false,
                  },
                  {
                    text: 'Cell, Organ, Tissue, Organism, Organ System',
                    rationale: 'This order is incorrect.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['rla-6'],
                type: 'text',
                passage:
                  'Photosynthesis is the process used by plants, algae, and some bacteria to convert light energy into chemical energy. The process uses sunlight, water, and carbon dioxide to create glucose (sugar for energy) and oxygen. This is why plants are called producers; they create their own food.',
                question:
                  'What are the three essential inputs for photosynthesis?',
                answerOptions: [
                  {
                    text: 'Sunlight, oxygen, and water.',
                    rationale: 'Oxygen is an output, not an input.',
                    isCorrect: false,
                  },
                  {
                    text: 'Sunlight, carbon dioxide, and glucose.',
                    rationale: 'Glucose is an output.',
                    isCorrect: false,
                  },
                  {
                    text: 'Sunlight, water, and carbon dioxide.',
                    rationale:
                      'Correct. The passage lists these three as the necessary ingredients.',
                    isCorrect: true,
                  },
                  {
                    text: 'Water, oxygen, and glucose.',
                    rationale: 'Oxygen and glucose are outputs.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                challenge_tags: ['science-3'],
                type: 'knowledge',
                question:
                  'Which human body system is responsible for transporting oxygen, nutrients, and hormones to cells and removing waste products?',
                answerOptions: [
                  {
                    text: 'Respiratory System',
                    rationale:
                      'The respiratory system is responsible for gas exchange (breathing).',
                    isCorrect: false,
                  },
                  {
                    text: 'Nervous System',
                    rationale:
                      "The nervous system is the body's command center, using electrical signals.",
                    isCorrect: false,
                  },
                  {
                    text: 'Digestive System',
                    rationale: 'The digestive system breaks down food.',
                    isCorrect: false,
                  },
                  {
                    text: 'Circulatory System',
                    rationale:
                      "Correct. The circulatory system, including the heart, blood, and blood vessels, is the body's transport network.",
                    isCorrect: true,
                  },
                ],
              },
              {
                questionNumber: 5,
                challenge_tags: ['science-3'],
                type: 'text',
                passage:
                  'DNA (Deoxyribonucleic acid) is a molecule that carries the genetic instructions for the development, functioning, growth, and reproduction of all known organisms. A gene is a specific sequence of DNA that codes for a functional product, either RNA or a protein.',
                question: 'What is the relationship between DNA and genes?',
                answerOptions: [
                  {
                    text: 'A gene is a segment of DNA that codes for a specific product.',
                    rationale:
                      'Correct. The passage defines a gene as a specific sequence of DNA.',
                    isCorrect: true,
                  },
                  {
                    text: 'DNA is a type of gene.',
                    rationale:
                      'This is reversed. A gene is a type of DNA sequence.',
                    isCorrect: false,
                  },
                  {
                    text: 'DNA and genes are completely unrelated.',
                    rationale: 'They are directly related.',
                    isCorrect: false,
                  },
                  {
                    text: 'A gene is larger than a DNA molecule.',
                    rationale: 'A gene is a part of a larger DNA molecule.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                type: 'knowledge',
                question: 'In genetics, what does a Punnett square predict?',
                answerOptions: [
                  {
                    text: 'The exact genetic makeup of an offspring.',
                    rationale:
                      'It predicts probability, not the exact outcome.',
                    isCorrect: false,
                  },
                  {
                    text: 'The probability of an offspring inheriting a particular trait.',
                    rationale:
                      'Correct. A Punnett square is a tool used to predict the possible genetic outcomes and their probabilities.',
                    isCorrect: true,
                  },
                  {
                    text: 'The number of chromosomes in a cell.',
                    rationale:
                      'This is determined by a karyotype, not a Punnett square.',
                    isCorrect: false,
                  },
                  {
                    text: 'The rate of cellular respiration.',
                    rationale: 'This is unrelated to Punnett squares.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 7,
                challenge_tags: ['rla-6'],
                type: 'knowledge',
                question:
                  'Which part of the plant cell is primarily responsible for photosynthesis?',
                answerOptions: [
                  {
                    text: 'Nucleus',
                    rationale:
                      "The nucleus contains the cell's genetic material.",
                    isCorrect: false,
                  },
                  {
                    text: 'Mitochondrion',
                    rationale:
                      'Mitochondria are responsible for cellular respiration.',
                    isCorrect: false,
                  },
                  {
                    text: 'Chloroplast',
                    rationale:
                      'Correct. Chloroplasts contain chlorophyll, the pigment that captures light energy.',
                    isCorrect: true,
                  },
                  {
                    text: 'Cell Wall',
                    rationale: 'The cell wall provides structural support.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                challenge_tags: ['science-3'],
                type: 'text',
                passage:
                  'Homeostasis is the state of steady internal, physical, and chemical conditions maintained by living systems. This is the condition of optimal functioning for the organism and includes many variables, such as body temperature and fluid balance, being kept within certain pre-set limits.',
                question:
                  'Shivering when you are cold is an example of the body trying to maintain homeostasis by:',
                answerOptions: [
                  {
                    text: 'generating heat through muscle contractions.',
                    rationale:
                      'Correct. Shivering is an involuntary muscle contraction that generates heat to raise body temperature.',
                    isCorrect: true,
                  },
                  {
                    text: "reducing the body's core temperature.",
                    rationale:
                      'It is an attempt to increase, not reduce, temperature.',
                    isCorrect: false,
                  },
                  {
                    text: 'saving energy.',
                    rationale: 'Shivering consumes energy.',
                    isCorrect: false,
                  },
                  {
                    text: 'increasing fluid balance.',
                    rationale:
                      'This is unrelated to the primary purpose of shivering.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                type: 'knowledge',
                question:
                  'In the human respiratory system, what is the primary function of the alveoli?',
                answerOptions: [
                  {
                    text: 'To filter dust and particles from the air.',
                    rationale:
                      'This is mainly done by hairs and mucus in the nasal passages and trachea.',
                    isCorrect: false,
                  },
                  {
                    text: 'To produce sound for speech.',
                    rationale:
                      'This is the function of the larynx (voice box).',
                    isCorrect: false,
                  },
                  {
                    text: 'To exchange oxygen and carbon dioxide with the blood.',
                    rationale:
                      'Correct. The alveoli are tiny air sacs where gas exchange occurs.',
                    isCorrect: true,
                  },
                  {
                    text: 'To pump air into and out of the lungs.',
                    rationale: 'This is the function of the diaphragm muscle.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 10,
                challenge_tags: ['science-3'],
                type: 'knowledge',
                question:
                  'An allele is a variant form of a gene. If an individual has two identical alleles for a particular gene, they are:',
                answerOptions: [
                  {
                    text: 'Heterozygous for that gene.',
                    rationale:
                      'Heterozygous means having two different alleles.',
                    isCorrect: false,
                  },
                  {
                    text: 'Homozygous for that gene.',
                    rationale: "Correct. 'Homo-' means same.",
                    isCorrect: true,
                  },
                  {
                    text: 'Recessive for that gene.',
                    rationale:
                      'Recessive describes an allele that is masked by a dominant one.',
                    isCorrect: false,
                  },
                  {
                    text: 'Dominant for that gene.',
                    rationale:
                      'Dominant describes an allele that masks a recessive one.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                challenge_tags: ['science-3'],
                type: 'text',
                passage:
                  'The nervous system is composed of two main parts: the Central Nervous System (CNS), which consists of the brain and spinal cord, and the Peripheral Nervous System (PNS), which consists of the nerves that branch out from the CNS to the rest of the body.',
                question:
                  'A nerve in your arm that sends a signal to your brain is part of which system?',
                answerOptions: [
                  {
                    text: 'The Central Nervous System (CNS)',
                    rationale: 'The CNS is the brain and spinal cord.',
                    isCorrect: false,
                  },
                  {
                    text: 'The Peripheral Nervous System (PNS)',
                    rationale:
                      'Correct. Nerves outside the brain and spinal cord are part of the PNS.',
                    isCorrect: true,
                  },
                  {
                    text: 'Both the CNS and PNS',
                    rationale: 'It is part of the PNS.',
                    isCorrect: false,
                  },
                  {
                    text: 'The Circulatory System',
                    rationale: 'This is a different body system.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 12,
                type: 'knowledge',
                question:
                  'What is the primary function of the digestive system?',
                answerOptions: [
                  {
                    text: 'To break down food and absorb nutrients.',
                    rationale:
                      'Correct. The digestive system processes food for energy and nutrients.',
                    isCorrect: true,
                  },
                  {
                    text: 'To eliminate waste from the blood.',
                    rationale:
                      'This is primarily the function of the urinary system.',
                    isCorrect: false,
                  },
                  {
                    text: 'To send signals throughout the body.',
                    rationale: 'This is the function of the nervous system.',
                    isCorrect: false,
                  },
                  {
                    text: 'To produce hormones.',
                    rationale: 'This is the function of the endocrine system.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 13,
                challenge_tags: ['science-3'],
                type: 'text',
                passage:
                  "Cellular respiration is a set of metabolic reactions and processes that take place in the cells of organisms to convert chemical energy from nutrients into adenosine triphosphate (ATP), and then release waste products. It is the process of 'burning' glucose for energy.",
                question: 'Cellular respiration occurs in which organelle?',
                answerOptions: [
                  {
                    text: 'Chloroplast',
                    rationale: 'Chloroplasts are for photosynthesis.',
                    isCorrect: false,
                  },
                  {
                    text: 'Nucleus',
                    rationale: 'The nucleus contains genetic material.',
                    isCorrect: false,
                  },
                  {
                    text: 'Mitochondria',
                    rationale:
                      "Correct. Mitochondria are known as the 'powerhouses' of the cell because this is where cellular respiration happens.",
                    isCorrect: true,
                  },
                  {
                    text: 'Ribosome',
                    rationale:
                      'Ribosomes are responsible for protein synthesis.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 14,
                type: 'knowledge',
                question:
                  'Which of the following is an example of an inherited trait in humans?',
                answerOptions: [
                  {
                    text: 'Eye color',
                    rationale:
                      'Correct. Eye color is determined by genes passed from parents to offspring.',
                    isCorrect: true,
                  },
                  {
                    text: 'A scar from an injury',
                    rationale:
                      'This is an acquired characteristic, not inherited.',
                    isCorrect: false,
                  },
                  {
                    text: 'The ability to speak English',
                    rationale: 'This is a learned behavior.',
                    isCorrect: false,
                  },
                  {
                    text: 'A tattoo',
                    rationale: 'This is an acquired body modification.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 15,
                challenge_tags: ['science-3'],
                type: 'knowledge',
                question:
                  'What is the difference between a dominant and a recessive allele?',
                answerOptions: [
                  {
                    text: 'A dominant allele is always better than a recessive allele.',
                    rationale: 'Dominance does not imply superiority.',
                    isCorrect: false,
                  },
                  {
                    text: 'A dominant allele will mask the expression of a recessive allele.',
                    rationale:
                      'Correct. If a dominant allele is present, its trait will be expressed.',
                    isCorrect: true,
                  },
                  {
                    text: 'Recessive alleles are more common in the population.',
                    rationale:
                      'Dominance is not related to how common an allele is.',
                    isCorrect: false,
                  },
                  {
                    text: 'Dominant alleles are only found in homozygous individuals.',
                    rationale:
                      'Dominant alleles are expressed in both homozygous and heterozygous individuals.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'sci_ecosystems_environment',
            title: 'Ecosystems & Environment',
            description:
              'Ecology, food webs, and human impact on the environment.',
            questions: [
              {
                questionNumber: 1,
                type: 'text',
                passage:
                  'An ecosystem consists of all the living organisms (biotic factors) in a particular area, along with all the non-living (abiotic) components of the environment, such as sunlight, soil, water, and temperature. These components are linked together through nutrient cycles and energy flows.',
                question:
                  'Which of the following is an example of an abiotic factor in an ecosystem?',
                answerOptions: [
                  {
                    text: 'A tree',
                    rationale: 'A tree is a living organism (biotic).',
                    isCorrect: false,
                  },
                  {
                    text: 'A fungus',
                    rationale: 'A fungus is a living organism (biotic).',
                    isCorrect: false,
                  },
                  {
                    text: 'The amount of annual rainfall',
                    rationale:
                      'Correct. Rainfall is a non-living component of the environment.',
                    isCorrect: true,
                  },
                  {
                    text: 'An insect',
                    rationale: 'An insect is a living organism (biotic).',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['rla-6'],
                type: 'knowledge',
                question:
                  'In a food web, an organism that produces its own food, usually through photosynthesis, is called a:',
                answerOptions: [
                  {
                    text: 'Consumer',
                    rationale: 'Consumers eat other organisms.',
                    isCorrect: false,
                  },
                  {
                    text: 'Producer',
                    rationale:
                      'Correct. Producers, like plants, form the base of the food web.',
                    isCorrect: true,
                  },
                  {
                    text: 'Decomposer',
                    rationale: 'Decomposers break down dead organic matter.',
                    isCorrect: false,
                  },
                  {
                    text: 'Scavenger',
                    rationale: 'Scavengers are a type of consumer.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['science-3', 'science-2'],
                type: 'image',
                imageUrl: 'Images/ged-scince-fig-12.png',
                question:
                  'In this food web, which organism is a primary consumer?',
                answerOptions: [
                  {
                    text: 'The grass',
                    rationale: 'The grass is a producer.',
                    isCorrect: false,
                  },
                  {
                    text: 'The rabbit',
                    rationale:
                      'Correct. The rabbit eats the producer (grass), making it a primary consumer.',
                    isCorrect: true,
                  },
                  {
                    text: 'The hawk',
                    rationale:
                      'The hawk eats other consumers, making it a secondary or tertiary consumer.',
                    isCorrect: false,
                  },
                  {
                    text: 'The fungi',
                    rationale: 'The fungi are decomposers.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                challenge_tags: ['science-2', 'science-3'],
                type: 'text',
                passage:
                  'The energy pyramid illustrates the flow of energy from one trophic (feeding) level to the next in an ecosystem. A large amount of energy is lost at each level, usually as heat. Typically, only about 10% of the energy from one level is transferred to the level above it.',
                question:
                  'If the producers in an ecosystem contain 10,000 units of energy, approximately how much energy would be available to the secondary consumers?',
                answerOptions: [
                  {
                    text: '10,000 units',
                    rationale: 'This is the energy at the producer level.',
                    isCorrect: false,
                  },
                  {
                    text: '1,000 units',
                    rationale:
                      'This is the energy available to the primary consumers (10% of 10,000).',
                    isCorrect: false,
                  },
                  {
                    text: '100 units',
                    rationale:
                      'Correct. Secondary consumers are two levels up. 10% of 10,000 is 1,000 (primary consumers), and 10% of 1,000 is 100.',
                    isCorrect: true,
                  },
                  {
                    text: '10 units',
                    rationale:
                      'This would be the energy available to tertiary consumers.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 5,
                type: 'knowledge',
                question:
                  'The process by which water evaporates from oceans, condenses into clouds, falls as precipitation, and returns to the ocean is known as:',
                answerOptions: [
                  {
                    text: 'The carbon cycle',
                    rationale:
                      'The carbon cycle describes the movement of carbon.',
                    isCorrect: false,
                  },
                  {
                    text: 'The nitrogen cycle',
                    rationale:
                      'The nitrogen cycle describes the movement of nitrogen.',
                    isCorrect: false,
                  },
                  {
                    text: 'The water cycle',
                    rationale:
                      'Correct. This describes the continuous movement of water on, above, and below the surface of the Earth.',
                    isCorrect: true,
                  },
                  {
                    text: 'Photosynthesis',
                    rationale:
                      'Photosynthesis is a process used by plants to create energy.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                challenge_tags: ['rla-7', 'science-4'],
                type: 'text',
                passage:
                  'Human activities, such as the burning of fossil fuels (coal, oil, and natural gas), release large amounts of carbon dioxide into the atmosphere. Carbon dioxide is a greenhouse gas, which traps heat and contributes to the warming of the planet, a phenomenon known as global warming or climate change.',
                question:
                  'According to the passage, what is the primary cause of the recent increase in atmospheric carbon dioxide?',
                answerOptions: [
                  {
                    text: 'Volcanic eruptions',
                    rationale:
                      'While volcanoes release CO2, human activities are the primary cause of the recent increase.',
                    isCorrect: false,
                  },
                  {
                    text: 'Deforestation',
                    rationale:
                      'Deforestation contributes, but the burning of fossil fuels is the primary cause mentioned.',
                    isCorrect: false,
                  },
                  {
                    text: 'The burning of fossil fuels',
                    rationale:
                      'Correct. The passage explicitly states this as the main source.',
                    isCorrect: true,
                  },
                  {
                    text: 'The process of photosynthesis',
                    rationale:
                      'Photosynthesis removes carbon dioxide from the atmosphere.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 7,
                challenge_tags: ['science-3'],
                type: 'knowledge',
                question:
                  'A symbiotic relationship where one organism benefits and the other is neither harmed nor helped is called:',
                answerOptions: [
                  {
                    text: 'Mutualism',
                    rationale: 'In mutualism, both organisms benefit.',
                    isCorrect: false,
                  },
                  {
                    text: 'Parasitism',
                    rationale:
                      'In parasitism, one organism benefits and the other is harmed.',
                    isCorrect: false,
                  },
                  {
                    text: 'Commensalism',
                    rationale:
                      'Correct. A classic example is a barnacle on a whale.',
                    isCorrect: true,
                  },
                  {
                    text: 'Competition',
                    rationale:
                      'Competition is a relationship where two or more organisms vie for the same limited resources.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                challenge_tags: ['science-3'],
                type: 'text',
                passage:
                  'Biodiversity refers to the variety of life in a particular habitat or ecosystem. High biodiversity is often a sign of a healthy ecosystem. It increases ecosystem productivity and resilience, meaning the ecosystem is better able to withstand and recover from disasters.',
                question:
                  'What is the primary benefit of high biodiversity in an ecosystem?',
                answerOptions: [
                  {
                    text: 'It ensures that all organisms are the same size.',
                    rationale: 'Biodiversity means variety, not uniformity.',
                    isCorrect: false,
                  },
                  {
                    text: "It increases the ecosystem's stability and resilience.",
                    rationale:
                      'Correct. The passage states that high biodiversity makes an ecosystem more resilient.',
                    isCorrect: true,
                  },
                  {
                    text: 'It decreases the total number of organisms.',
                    rationale:
                      'High biodiversity usually correlates with a high number of organisms.',
                    isCorrect: false,
                  },
                  {
                    text: 'It simplifies the food web.',
                    rationale:
                      'High biodiversity leads to more complex food webs.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                challenge_tags: ['science-3'],
                type: 'knowledge',
                question:
                  'What is the main role of decomposers, such as bacteria and fungi, in an ecosystem?',
                answerOptions: [
                  {
                    text: 'To produce energy from sunlight.',
                    rationale: 'This is the role of producers.',
                    isCorrect: false,
                  },
                  {
                    text: 'To consume other organisms for energy.',
                    rationale: 'This is the role of consumers.',
                    isCorrect: false,
                  },
                  {
                    text: 'To break down dead organic matter and return nutrients to the soil.',
                    rationale:
                      'Correct. Decomposers are essential for recycling nutrients.',
                    isCorrect: true,
                  },
                  {
                    text: 'To control the population of primary consumers.',
                    rationale:
                      'This is a role of secondary consumers (predators).',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 10,
                challenge_tags: ['science-3'],
                type: 'text',
                passage:
                  'Natural selection is the process through which populations of living organisms adapt and change. Individuals in a population are naturally variable, meaning that they are all different in some ways. This variation means that some individuals have traits better suited to the environment than others. Individuals with adaptive traits are more likely to survive and reproduce, passing those traits on to their offspring.',
                question:
                  'Which of the following is a key requirement for natural selection to occur?',
                answerOptions: [
                  {
                    text: 'All individuals in a population must be identical.',
                    rationale:
                      'Variation is necessary for natural selection to act upon.',
                    isCorrect: false,
                  },
                  {
                    text: 'The environment must remain constant over time.',
                    rationale:
                      'Environmental changes are often the driving force of natural selection.',
                    isCorrect: false,
                  },
                  {
                    text: 'There must be variation in heritable traits within a population.',
                    rationale:
                      "Correct. Without variation, some individuals would not be better suited than others, and there would be nothing to 'select'.",
                    isCorrect: true,
                  },
                  {
                    text: 'Organisms must consciously choose to adapt.',
                    rationale:
                      'Adaptation through natural selection is a passive process, not a conscious choice.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                challenge_tags: ['science-3', 'social-5'],
                type: 'knowledge',
                question:
                  'An invasive species is an organism that is not native to a specific location and has a tendency to spread to a degree believed to cause damage to the environment, economy, or human health. Why are invasive species often so successful in new ecosystems?',
                answerOptions: [
                  {
                    text: 'Because they are usually larger than native species.',
                    rationale: 'Size is not the determining factor.',
                    isCorrect: false,
                  },
                  {
                    text: 'Because they often lack natural predators in the new environment.',
                    rationale:
                      'Correct. Without predators to control their population, they can multiply rapidly and outcompete native species.',
                    isCorrect: true,
                  },
                  {
                    text: 'Because they only eat food that native species do not.',
                    rationale:
                      'They often compete directly with native species for food.',
                    isCorrect: false,
                  },
                  {
                    text: 'Because they reproduce more slowly than native species.',
                    rationale: 'They often reproduce more quickly.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 12,
                type: 'knowledge',
                question:
                  'The gradual process by which ecosystems change and develop over time is called:',
                answerOptions: [
                  {
                    text: 'Evolution',
                    rationale:
                      'Evolution refers to the change in heritable traits of populations over generations.',
                    isCorrect: false,
                  },
                  {
                    text: 'Succession',
                    rationale:
                      'Correct. Ecological succession is the process of change in the species structure of an ecological community over time.',
                    isCorrect: true,
                  },
                  {
                    text: 'Homeostasis',
                    rationale:
                      'Homeostasis is the maintenance of a stable internal environment.',
                    isCorrect: false,
                  },
                  {
                    text: 'Photosynthesis',
                    rationale:
                      'This is the process of creating energy from sunlight.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 13,
                challenge_tags: ['science-4', 'science-6'],
                type: 'text',
                passage:
                  'Acid rain is caused by emissions of sulfur dioxide and nitrogen oxide, which react with the water molecules in the atmosphere to produce acids. These emissions primarily come from the burning of fossil fuels in power plants and vehicles. Acid rain can have harmful effects on soil, forests, and aquatic ecosystems.',
                question: 'What is the primary cause of acid rain?',
                answerOptions: [
                  {
                    text: 'An increase in the pH of rainwater.',
                    rationale:
                      'Acid rain involves a decrease in pH (making it more acidic).',
                    isCorrect: false,
                  },
                  {
                    text: 'Pollutants from burning fossil fuels reacting with water in the atmosphere.',
                    rationale:
                      'Correct. The passage identifies sulfur dioxide and nitrogen oxide from fossil fuels as the primary cause.',
                    isCorrect: true,
                  },
                  {
                    text: 'The natural carbonation of rainwater.',
                    rationale:
                      'Natural rainwater is slightly acidic, but acid rain is much more so due to pollution.',
                    isCorrect: false,
                  },
                  {
                    text: 'Runoff from agricultural fertilizers.',
                    rationale:
                      'Fertilizer runoff causes other problems, like eutrophication, but not acid rain.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 14,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'A food chain shows a single pathway of energy transfer. Which of the following is a correct and logical food chain?',
                answerOptions: [
                  {
                    text: 'Hawk -> Snake -> Mouse -> Grass',
                    rationale: 'This food chain is backwards.',
                    isCorrect: false,
                  },
                  {
                    text: 'Grass -> Mouse -> Snake -> Hawk',
                    rationale:
                      'Correct. This shows the correct flow of energy from producer to primary consumer to secondary consumer to tertiary consumer.',
                    isCorrect: true,
                  },
                  {
                    text: 'Mouse -> Grass -> Hawk -> Snake',
                    rationale: 'This order is illogical.',
                    isCorrect: false,
                  },
                  {
                    text: 'Sun -> Grass -> Hawk -> Mouse',
                    rationale: 'This order is illogical.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 15,
                type: 'knowledge',
                question: "The concept of a 'carbon footprint' refers to:",
                answerOptions: [
                  {
                    text: 'The total amount of carbon stored in the soil.',
                    rationale:
                      'This is part of the carbon cycle, but not a carbon footprint.',
                    isCorrect: false,
                  },
                  {
                    text: 'The total amount of greenhouse gases generated by our actions.',
                    rationale:
                      "Correct. It is a measure of an individual's or organization's impact on the climate.",
                    isCorrect: true,
                  },
                  {
                    text: 'The physical mark left by carbon-based life forms.',
                    rationale:
                      'This is a literal interpretation, not the correct meaning.',
                    isCorrect: false,
                  },
                  {
                    text: 'The number of trees planted to offset carbon emissions.',
                    rationale:
                      'This is a way to reduce a carbon footprint, not the footprint itself.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      'Physical Science': {
        description:
          'Investigate the principles of chemistry and physics that govern the world around us.',
        topics: [
          {
            id: 'sci_chem_fundamentals',
            title: 'Chemistry Fundamentals',
            description:
              'Properties of matter, atoms, elements, and the periodic table.',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  'All matter is made up of atoms, which are the smallest units of an element that maintain the properties of that element. Atoms are composed of three main subatomic particles: protons, neutrons, and electrons. Protons have a positive charge, neutrons have no charge, and electrons have a negative charge.',
                question: 'Which subatomic particle has a positive charge?',
                answerOptions: [
                  {
                    text: 'Proton',
                    rationale:
                      'Correct. The passage states that protons have a positive charge.',
                    isCorrect: true,
                  },
                  {
                    text: 'Neutron',
                    rationale: 'Neutrons have no charge.',
                    isCorrect: false,
                  },
                  {
                    text: 'Electron',
                    rationale: 'Electrons have a negative charge.',
                    isCorrect: false,
                  },
                  {
                    text: 'Atom',
                    rationale:
                      'An atom is the whole unit, not a subatomic particle.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'In an atom, which two subatomic particles are found in the nucleus?',
                answerOptions: [
                  {
                    text: 'Protons and electrons',
                    rationale: 'Electrons orbit the nucleus.',
                    isCorrect: false,
                  },
                  {
                    text: 'Protons and neutrons',
                    rationale:
                      'Correct. The nucleus at the center of the atom contains the protons and neutrons.',
                    isCorrect: true,
                  },
                  {
                    text: 'Neutrons and electrons',
                    rationale: 'Electrons orbit the nucleus.',
                    isCorrect: false,
                  },
                  {
                    text: 'Only protons',
                    rationale:
                      'The nucleus also contains neutrons (except for the most common isotope of hydrogen).',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  'The periodic table of elements arranges all known elements in order of increasing atomic number. The atomic number of an element is equal to the number of protons in the nucleus of an atom of that element. This number is unique to each element.',
                question:
                  'The identity of an element is determined by its number of:',
                answerOptions: [
                  {
                    text: 'Neutrons',
                    rationale:
                      'The number of neutrons can vary, creating isotopes.',
                    isCorrect: false,
                  },
                  {
                    text: 'Electrons',
                    rationale:
                      'The number of electrons can change when an atom forms an ion.',
                    isCorrect: false,
                  },
                  {
                    text: 'Protons',
                    rationale:
                      'Correct. The passage states that the atomic number, which is the number of protons, is unique to each element.',
                    isCorrect: true,
                  },
                  {
                    text: 'Energy levels',
                    rationale: 'The number of energy levels can change.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                type: 'image',
                imageUrl: 'Images/licensed-image (5).jpg',
                question:
                  'This image shows a typical entry on the periodic table for the element Carbon (C). What is the atomic number of Carbon?',
                answerOptions: [
                  {
                    text: '12.011',
                    rationale: 'This is the atomic mass.',
                    isCorrect: false,
                  },
                  {
                    text: '6',
                    rationale:
                      'Correct. The number at the top is the atomic number.',
                    isCorrect: true,
                  },
                  {
                    text: 'C',
                    rationale: 'This is the element symbol.',
                    isCorrect: false,
                  },
                  {
                    text: 'Carbon',
                    rationale: 'This is the element name.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 5,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'What is the difference between an element and a compound?',
                answerOptions: [
                  {
                    text: 'An element is a liquid, while a compound is a solid.',
                    rationale:
                      'Elements and compounds can exist in any state of matter.',
                    isCorrect: false,
                  },
                  {
                    text: 'An element consists of only one type of atom, while a compound consists of two or more different types of atoms chemically bonded together.',
                    rationale:
                      'Correct. For example, oxygen (O) is an element, while water (H��O) is a compound.',
                    isCorrect: true,
                  },
                  {
                    text: 'Elements are found in nature, while compounds are man-made.',
                    rationale:
                      'Many compounds, like water and carbon dioxide, are found in nature.',
                    isCorrect: false,
                  },
                  {
                    text: 'There is no difference.',
                    rationale: 'There is a fundamental chemical difference.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  'A chemical reaction is a process that leads to the chemical transformation of one set of chemical substances to another. The substances initially involved in a chemical reaction are called reactants, and the substances produced are called products. The law of conservation of mass states that mass is neither created nor destroyed in a chemical reaction.',
                question:
                  'If 10 grams of reactant A are combined with 5 grams of reactant B in a sealed container and react completely, what will be the total mass of the products?',
                answerOptions: [
                  {
                    text: '5 grams',
                    rationale:
                      'This would violate the law of conservation of mass.',
                    isCorrect: false,
                  },
                  {
                    text: '10 grams',
                    rationale:
                      'This would violate the law of conservation of mass.',
                    isCorrect: false,
                  },
                  {
                    text: '15 grams',
                    rationale:
                      'Correct. According to the law of conservation of mass, the total mass of the reactants must equal the total mass of the products.',
                    isCorrect: true,
                  },
                  {
                    text: 'It is impossible to tell.',
                    rationale:
                      'The law of conservation of mass allows us to determine the mass.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 7,
                type: 'knowledge',
                question:
                  'Which of the following represents a physical change, not a chemical change?',
                answerOptions: [
                  {
                    text: 'Burning wood',
                    rationale:
                      'Burning is a chemical change (combustion) that creates new substances like ash and smoke.',
                    isCorrect: false,
                  },
                  {
                    text: 'Rusting iron',
                    rationale:
                      'Rusting is a chemical change (oxidation) that creates a new substance, iron oxide.',
                    isCorrect: false,
                  },
                  {
                    text: 'Boiling water',
                    rationale:
                      'Correct. Boiling water changes its state from liquid to gas (steam), but it is still chemically H��O. This is a physical change.',
                    isCorrect: true,
                  },
                  {
                    text: 'Baking a cake',
                    rationale:
                      'Baking involves chemical reactions that change the ingredients into a new substance.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                type: 'text',
                passage:
                  'The pH scale measures how acidic or basic a substance is. The scale ranges from 0 to 14. A pH of 7 is neutral. A pH less than 7 indicates acidity, while a pH greater than 7 indicates a base (alkalinity).',
                question: 'A substance with a pH of 3 is considered:',
                answerOptions: [
                  {
                    text: 'Acidic',
                    rationale: 'Correct. A pH less than 7 is acidic.',
                    isCorrect: true,
                  },
                  {
                    text: 'Basic (alkaline)',
                    rationale: 'A pH greater than 7 is basic.',
                    isCorrect: false,
                  },
                  {
                    text: 'Neutral',
                    rationale: 'A pH of 7 is neutral.',
                    isCorrect: false,
                  },
                  {
                    text: 'A solid',
                    rationale: 'pH measures acidity, not state of matter.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                type: 'knowledge',
                question:
                  'What is a substance that is dissolved in another substance to form a solution called?',
                answerOptions: [
                  {
                    text: 'Solvent',
                    rationale:
                      'The solvent is the substance that does the dissolving (e.g., water).',
                    isCorrect: false,
                  },
                  {
                    text: 'Solute',
                    rationale:
                      'Correct. The solute is the substance that is dissolved (e.g., salt in saltwater).',
                    isCorrect: true,
                  },
                  {
                    text: 'Mixture',
                    rationale:
                      'A mixture is the combination of two or more substances that are not chemically bonded.',
                    isCorrect: false,
                  },
                  {
                    text: 'Element',
                    rationale:
                      'An element is a pure substance consisting of only one type of atom.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 10,
                type: 'knowledge',
                question:
                  "In the chemical formula for water, H��O, what does the subscript '2' indicate?",
                answerOptions: [
                  {
                    text: 'There are two water molecules.',
                    rationale:
                      'A coefficient in front of the formula would indicate the number of molecules.',
                    isCorrect: false,
                  },
                  {
                    text: 'There are two oxygen atoms.',
                    rationale: "The '2' is next to the 'H', not the 'O'.",
                    isCorrect: false,
                  },
                  {
                    text: 'There are two hydrogen atoms.',
                    rationale:
                      'Correct. The subscript indicates the number of atoms of the element immediately preceding it.',
                    isCorrect: true,
                  },
                  {
                    text: 'The molecule has a charge of +2.',
                    rationale: 'A superscript would indicate the charge.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  "The columns of the periodic table are called 'groups' or 'families.' Elements in the same group have similar:",
                answerOptions: [
                  {
                    text: 'Atomic masses',
                    rationale: 'Atomic masses increase as you go down a group.',
                    isCorrect: false,
                  },
                  {
                    text: 'Chemical properties',
                    rationale:
                      'Correct. Elements in the same group have the same number of valence electrons, which gives them similar chemical behaviors.',
                    isCorrect: true,
                  },
                  {
                    text: 'Numbers of protons',
                    rationale: 'The number of protons increases down a group.',
                    isCorrect: false,
                  },
                  {
                    text: 'Numbers of energy shells',
                    rationale:
                      'The number of energy shells increases as you go down a group.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 12,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  'A covalent bond is a chemical bond that involves the sharing of electron pairs between atoms. An ionic bond is formed when one atom transfers one or more electrons to another atom, creating ions��charged atoms that are then attracted to each other.',
                question:
                  'What is the key difference between a covalent bond and an ionic bond?',
                answerOptions: [
                  {
                    text: 'Covalent bonds involve sharing electrons, while ionic bonds involve transferring electrons.',
                    rationale:
                      'Correct. The passage defines this as the fundamental difference.',
                    isCorrect: true,
                  },
                  {
                    text: 'Covalent bonds are stronger than ionic bonds.',
                    rationale:
                      'The relative strength can vary depending on the specific atoms involved.',
                    isCorrect: false,
                  },
                  {
                    text: 'Covalent bonds form between metals, and ionic bonds form between nonmetals.',
                    rationale:
                      'Ionic bonds typically form between a metal and a nonmetal, while covalent bonds form between nonmetals.',
                    isCorrect: false,
                  },
                  {
                    text: 'Covalent bonds create ions, while ionic bonds do not.',
                    rationale:
                      'This is the opposite of what the passage states.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 13,
                type: 'knowledge',
                question: 'Which of the following is a property of a solid?',
                answerOptions: [
                  {
                    text: 'It takes the shape of its container.',
                    rationale: 'This is a property of liquids and gases.',
                    isCorrect: false,
                  },
                  {
                    text: 'It has a definite shape and a definite volume.',
                    rationale:
                      'Correct. The particles in a solid are tightly packed and vibrate in fixed positions.',
                    isCorrect: true,
                  },
                  {
                    text: 'It is easily compressible.',
                    rationale: 'This is a property of gases.',
                    isCorrect: false,
                  },
                  {
                    text: 'It has no definite shape or volume.',
                    rationale: 'This is a property of gases.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 14,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'A substance that speeds up a chemical reaction without being consumed in the reaction is called a(n):',
                answerOptions: [
                  {
                    text: 'Reactant',
                    rationale: 'A reactant is consumed in the reaction.',
                    isCorrect: false,
                  },
                  {
                    text: 'Product',
                    rationale: 'A product is formed by the reaction.',
                    isCorrect: false,
                  },
                  {
                    text: 'Catalyst',
                    rationale:
                      'Correct. Catalysts lower the activation energy of a reaction, making it happen faster.',
                    isCorrect: true,
                  },
                  {
                    text: 'Inhibitor',
                    rationale: 'An inhibitor slows down a chemical reaction.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 15,
                type: 'text',
                passage:
                  'Isotopes are variants of a particular chemical element which differ in neutron number, and consequently in mass number. All isotopes of a given element have the same number of protons in each atom.',
                question:
                  'Carbon-12 and Carbon-14 are isotopes of carbon. What is different between an atom of Carbon-12 and an atom of Carbon-14?',
                answerOptions: [
                  {
                    text: 'The number of protons.',
                    rationale:
                      'They are both carbon, so they must have the same number of protons (6).',
                    isCorrect: false,
                  },
                  {
                    text: 'The number of electrons.',
                    rationale:
                      'In a neutral atom, the number of electrons equals the number of protons.',
                    isCorrect: false,
                  },
                  {
                    text: 'The number of neutrons.',
                    rationale:
                      'Correct. Carbon-14 has two more neutrons than Carbon-12, which accounts for the difference in their mass numbers.',
                    isCorrect: true,
                  },
                  {
                    text: 'Their chemical symbol.',
                    rationale: 'They both have the chemical symbol C.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'sci_physics_motion',
            title: 'Physics in Motion',
            description:
              "Newton's laws of motion, energy transformations, and waves.",
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  "Newton's First Law of Motion, often called the law of inertia, states that an object at rest will stay at rest, and an object in motion will stay in motion with the same speed and in the same direction unless acted upon by an unbalanced force.",
                question:
                  "A book is sitting on a table. According to Newton's First Law, it will not move unless:",
                answerOptions: [
                  {
                    text: 'it runs out of energy.',
                    rationale:
                      'An object at rest has no kinetic energy to run out of.',
                    isCorrect: false,
                  },
                  {
                    text: 'an unbalanced force acts on it.',
                    rationale:
                      'Correct. A force, like a push or a pull, is required to change its state of rest.',
                    isCorrect: true,
                  },
                  {
                    text: 'gravity stops acting on it.',
                    rationale:
                      'Gravity is a force constantly acting on the book.',
                    isCorrect: false,
                  },
                  {
                    text: 'its inertia is used up.',
                    rationale:
                      'Inertia is a property of mass, not something that can be used up.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  "Newton's Second Law of Motion states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This is often written as the formula F = ma (Force = mass × acceleration).",
                question:
                  'If you push two objects with the same amount of force, which one will accelerate more?',
                answerOptions: [
                  {
                    text: 'The object with the larger mass.',
                    rationale:
                      'According to F=ma, if F is constant, a larger mass (m) results in smaller acceleration (a).',
                    isCorrect: false,
                  },
                  {
                    text: 'The object with the smaller mass.',
                    rationale:
                      'Correct. If F is constant, a smaller mass (m) will experience a larger acceleration (a).',
                    isCorrect: true,
                  },
                  {
                    text: 'They will both accelerate at the same rate.',
                    rationale: 'Acceleration depends on mass.',
                    isCorrect: false,
                  },
                  {
                    text: 'Neither will accelerate.',
                    rationale:
                      'If a net force is applied, they will accelerate.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                type: 'knowledge',
                question:
                  "Newton's Third Law of Motion states that for every action, there is an equal and opposite reaction. Which of the following is the best example of this law?",
                answerOptions: [
                  {
                    text: 'A rocket moving upwards by pushing exhaust gases downwards.',
                    rationale:
                      'Correct. The action is the rocket pushing the gas down; the reaction is the gas pushing the rocket up.',
                    isCorrect: true,
                  },
                  {
                    text: 'A car slowing down when the brakes are applied.',
                    rationale:
                      'This is an example of the First and Second Laws (a force causing deceleration).',
                    isCorrect: false,
                  },
                  {
                    text: 'A ball rolling to a stop due to friction.',
                    rationale:
                      "This is an example of the First Law (an unbalanced force, friction, changing the object's motion).",
                    isCorrect: false,
                  },
                  {
                    text: 'A person sitting on a chair.',
                    rationale:
                      'While action-reaction forces are present (person pushes on chair, chair pushes on person), the rocket is a more dynamic example of the law in action.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  "Energy can be classified into two main types: potential and kinetic. Potential energy is stored energy, often due to an object's position or state. Kinetic energy is the energy of motion.",
                question:
                  'A roller coaster car poised at the very top of a tall hill has its maximum:',
                answerOptions: [
                  {
                    text: 'Kinetic energy',
                    rationale:
                      'Kinetic energy is the energy of motion. At the top of the hill, the car is momentarily at rest, so its kinetic energy is at a minimum.',
                    isCorrect: false,
                  },
                  {
                    text: 'Potential energy',
                    rationale:
                      'Correct. Its height gives it the maximum amount of stored gravitational potential energy, which will be converted to kinetic energy as it rolls down.',
                    isCorrect: true,
                  },
                  {
                    text: 'Frictional energy',
                    rationale:
                      'Friction is a force that converts kinetic energy into heat, not a primary energy type in this context.',
                    isCorrect: false,
                  },
                  {
                    text: 'Both kinetic and potential energy are at a minimum.',
                    rationale: 'Potential energy is at its maximum.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 5,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question: 'The law of conservation of energy states that:',
                answerOptions: [
                  {
                    text: 'Energy can be created but not destroyed.',
                    rationale: 'Energy cannot be created.',
                    isCorrect: false,
                  },
                  {
                    text: 'Energy cannot be created or destroyed, only transformed from one form to another.',
                    rationale:
                      'Correct. This is the fundamental principle of energy conservation.',
                    isCorrect: true,
                  },
                  {
                    text: 'Kinetic energy is always greater than potential energy.',
                    rationale:
                      'The balance between kinetic and potential energy can vary.',
                    isCorrect: false,
                  },
                  {
                    text: 'Energy is lost as heat in every transformation.',
                    rationale:
                      'While some energy is often lost as heat, the total amount of energy is conserved.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  'A wave is a disturbance that transfers energy from one place to another. In a transverse wave, the particles of the medium move perpendicular to the direction of energy transfer. In a longitudinal wave, the particles move parallel to the direction of energy transfer.',
                question:
                  'A sound wave, which consists of compressions and rarefactions of air particles, is an example of a:',
                answerOptions: [
                  {
                    text: 'Transverse wave',
                    rationale: 'Light is an example of a transverse wave.',
                    isCorrect: false,
                  },
                  {
                    text: 'Longitudinal wave',
                    rationale:
                      'Correct. In a sound wave, the air particles vibrate back and forth in the same direction that the sound is traveling.',
                    isCorrect: true,
                  },
                  {
                    text: 'Stationary wave',
                    rationale:
                      'A stationary wave does not transfer energy from one place to another.',
                    isCorrect: false,
                  },
                  {
                    text: 'Surface wave',
                    rationale:
                      'A surface wave occurs at the interface between two media.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 7,
                type: 'knowledge',
                question:
                  'What is the term for the number of complete wave cycles that pass a point in a given amount of time?',
                answerOptions: [
                  {
                    text: 'Wavelength',
                    rationale:
                      'Wavelength is the distance between two corresponding parts of a wave.',
                    isCorrect: false,
                  },
                  {
                    text: 'Amplitude',
                    rationale:
                      'Amplitude is the maximum displacement or distance moved by a point on a vibrating body or wave measured from its equilibrium position.',
                    isCorrect: false,
                  },
                  {
                    text: 'Frequency',
                    rationale:
                      'Correct. Frequency is typically measured in Hertz (Hz), which is cycles per second.',
                    isCorrect: true,
                  },
                  {
                    text: 'Speed',
                    rationale:
                      'Speed is the distance the wave travels per unit of time.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                type: 'knowledge',
                question:
                  'In an electrical circuit, what is the property that opposes the flow of electric current?',
                answerOptions: [
                  {
                    text: 'Voltage',
                    rationale:
                      'Voltage is the electrical potential difference that drives the current.',
                    isCorrect: false,
                  },
                  {
                    text: 'Current',
                    rationale: 'Current is the flow of electric charge.',
                    isCorrect: false,
                  },
                  {
                    text: 'Resistance',
                    rationale:
                      'Correct. Resistance, measured in ohms, is the opposition to the passage of an electric current.',
                    isCorrect: true,
                  },
                  {
                    text: 'Power',
                    rationale:
                      'Power is the rate at which electrical energy is transferred.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                type: 'text',
                passage:
                  "Ohm's Law describes the relationship between voltage (V), current (I), and resistance (R) in an electrical circuit. The formula is V = IR. This means that for a given resistance, the current is directly proportional to the voltage.",
                question:
                  'If the voltage in a circuit is increased while the resistance stays the same, what will happen to the current?',
                answerOptions: [
                  {
                    text: 'It will decrease.',
                    rationale:
                      'According to V=IR, if V increases and R is constant, I must also increase.',
                    isCorrect: false,
                  },
                  {
                    text: 'It will increase.',
                    rationale:
                      'Correct. The law states a direct proportionality between voltage and current.',
                    isCorrect: true,
                  },
                  {
                    text: 'It will stay the same.',
                    rationale:
                      'The current will change if the voltage changes.',
                    isCorrect: false,
                  },
                  {
                    text: 'It will reverse direction.',
                    rationale:
                      'The direction of the current is determined by the polarity of the voltage source.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 10,
                type: 'knowledge',
                question:
                  'Which of the following is the best example of a conductor of electricity?',
                answerOptions: [
                  {
                    text: 'Rubber',
                    rationale: 'Rubber is an insulator.',
                    isCorrect: false,
                  },
                  {
                    text: 'Glass',
                    rationale: 'Glass is an insulator.',
                    isCorrect: false,
                  },
                  {
                    text: 'Copper',
                    rationale:
                      'Correct. Metals like copper have free electrons that allow electric current to flow easily.',
                    isCorrect: true,
                  },
                  {
                    text: 'Wood',
                    rationale: 'Wood is an insulator.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'The force of gravity between two objects depends on two factors:',
                answerOptions: [
                  {
                    text: 'Their masses and the distance between them.',
                    rationale:
                      "Correct. Newton's law of universal gravitation states that the force is proportional to the product of their masses and inversely proportional to the square of the distance between them.",
                    isCorrect: true,
                  },
                  {
                    text: 'Their speed and their temperature.',
                    rationale:
                      'These factors do not directly determine the force of gravity.',
                    isCorrect: false,
                  },
                  {
                    text: 'Their chemical composition and their electrical charge.',
                    rationale:
                      'These factors are not part of the law of gravitation.',
                    isCorrect: false,
                  },
                  {
                    text: 'Their volume and their shape.',
                    rationale:
                      'While related to mass and distance, it is mass itself, not volume or shape, that is the key factor.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 12,
                type: 'text',
                passage:
                  "Speed is a scalar quantity that refers to 'how fast an object is moving.' Velocity is a vector quantity that refers to 'the rate at which an object changes its position.' The key difference is that velocity includes direction.",
                question:
                  'A car is traveling at a constant 60 miles per hour as it goes around a circular track. Which of the following is true?',
                answerOptions: [
                  {
                    text: "The car's speed and velocity are both constant.",
                    rationale:
                      'The speed is constant, but the velocity is not.',
                    isCorrect: false,
                  },
                  {
                    text: "The car's speed is constant, but its velocity is changing.",
                    rationale:
                      "Correct. Even though the speed is constant, the car's direction is constantly changing, which means its velocity is also changing.",
                    isCorrect: true,
                  },
                  {
                    text: "The car's speed is changing, but its velocity is constant.",
                    rationale: 'The speed is stated as constant.',
                    isCorrect: false,
                  },
                  {
                    text: "The car's speed and velocity are both changing.",
                    rationale: 'The speed is constant.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 13,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'What type of energy is stored in the bonds of chemical compounds, such as in food or batteries?',
                answerOptions: [
                  {
                    text: 'Kinetic energy',
                    rationale: 'Kinetic energy is the energy of motion.',
                    isCorrect: false,
                  },
                  {
                    text: 'Thermal energy',
                    rationale:
                      'Thermal energy is related to the temperature of an object.',
                    isCorrect: false,
                  },
                  {
                    text: 'Chemical potential energy',
                    rationale:
                      'Correct. This is the energy stored in the chemical bonds of a substance.',
                    isCorrect: true,
                  },
                  {
                    text: 'Gravitational potential energy',
                    rationale:
                      "This is energy stored due to an object's height.",
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 14,
                type: 'text',
                passage:
                  'Magnetism is a force produced by moving electric charges. All magnets have two poles, a north pole and a south pole. Like poles repel each other, while opposite poles attract each other.',
                question:
                  'If you bring the north pole of one magnet close to the north pole of another magnet, what will happen?',
                answerOptions: [
                  {
                    text: 'The magnets will attract each other.',
                    rationale: 'Opposite poles attract.',
                    isCorrect: false,
                  },
                  {
                    text: 'The magnets will repel each other.',
                    rationale:
                      'Correct. The passage states that like poles repel.',
                    isCorrect: true,
                  },
                  {
                    text: 'Nothing will happen.',
                    rationale: 'A magnetic force will be exerted.',
                    isCorrect: false,
                  },
                  {
                    text: 'The magnets will lose their magnetism.',
                    rationale:
                      'This will not cause them to lose their magnetism.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 15,
                type: 'knowledge',
                question: 'Which of the following is a unit of force?',
                answerOptions: [
                  {
                    text: 'Meter',
                    rationale: 'A meter is a unit of distance.',
                    isCorrect: false,
                  },
                  {
                    text: 'Kilogram',
                    rationale: 'A kilogram is a unit of mass.',
                    isCorrect: false,
                  },
                  {
                    text: 'Second',
                    rationale: 'A second is a unit of time.',
                    isCorrect: false,
                  },
                  {
                    text: 'Newton',
                    rationale:
                      'Correct. The Newton (N) is the standard unit of force in the International System of Units (SI).',
                    isCorrect: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      'Scientific Numeracy': {
        description:
          'Practice applying mathematical skills to interpret scientific data, charts, and formulas.',
        image: './images/scientific_numeracy_icon.png',
        topics: [
          {
            id: 'sci_scientific_numeracy_core',
            title: 'Scientific Numeracy',
            description: 'Core Skills Practice Set',
            config: {
              calculator: true,
              formulaSheet: true,
              totalTime: 20 * 60,
            },
            questions: SCI_NUMERACY_QUESTIONS,
          },
        ],
      },
      'Earth & Space Science': {
        description:
          'Study the systems of planet Earth and its place in the universe.',
        topics: [
          {
            id: 'sci_earth_space',
            title: 'Earth & Space Systems',
            description:
              'Plate tectonics, the rock cycle, and the solar system.',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['science-4'],
                type: 'text',
                passage:
                  "The Earth's lithosphere is divided into several large and small tectonic plates that float on the semi-fluid asthenosphere beneath. The movement of these plates is responsible for major geological events such as earthquakes, volcanic eruptions, and the formation of mountain ranges.",
                question: 'The theory of plate tectonics helps to explain:',
                answerOptions: [
                  {
                    text: 'The changing of the seasons.',
                    rationale:
                      "The seasons are caused by the tilt of the Earth's axis.",
                    isCorrect: false,
                  },
                  {
                    text: 'The occurrence of earthquakes and the formation of mountains.',
                    rationale:
                      'Correct. The passage directly links plate movement to these geological events.',
                    isCorrect: true,
                  },
                  {
                    text: 'The phases of the moon.',
                    rationale:
                      "The moon's phases are caused by its orbit around the Earth.",
                    isCorrect: false,
                  },
                  {
                    text: 'The water cycle.',
                    rationale: 'The water cycle is driven by solar energy.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                type: 'knowledge',
                question:
                  'What type of plate boundary is formed when two tectonic plates collide with each other?',
                answerOptions: [
                  {
                    text: 'Divergent boundary',
                    rationale: 'At a divergent boundary, plates move apart.',
                    isCorrect: false,
                  },
                  {
                    text: 'Convergent boundary',
                    rationale: "Correct. 'Converge' means to come together.",
                    isCorrect: true,
                  },
                  {
                    text: 'Transform boundary',
                    rationale:
                      'At a transform boundary, plates slide past each other.',
                    isCorrect: false,
                  },
                  {
                    text: 'Static boundary',
                    rationale: 'There is no such term in plate tectonics.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['rla-7', 'science-4'],
                type: 'text',
                passage:
                  'The rock cycle is a model that describes the formation, breakdown, and reformation of a rock as a result of sedimentary, igneous, and metamorphic processes. For example, when magma or lava cools and solidifies, it forms igneous rock. When this rock is weathered and eroded, the sediments can be compacted to form sedimentary rock.',
                question:
                  'According to the passage, how is igneous rock formed?',
                answerOptions: [
                  {
                    text: 'From the cooling and solidification of magma or lava.',
                    rationale:
                      'Correct. The passage explicitly states this is how igneous rock is formed.',
                    isCorrect: true,
                  },
                  {
                    text: 'From the compaction and cementation of sediments.',
                    rationale:
                      'This describes the formation of sedimentary rock.',
                    isCorrect: false,
                  },
                  {
                    text: 'From the application of heat and pressure to existing rock.',
                    rationale:
                      'This describes the formation of metamorphic rock.',
                    isCorrect: false,
                  },
                  {
                    text: 'From the weathering of metamorphic rock.',
                    rationale:
                      'Weathering breaks down rock; it does not form it.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                type: 'knowledge',
                question:
                  'Which type of rock is formed from the shells, skeletons, and other remains of living organisms?',
                answerOptions: [
                  {
                    text: 'Igneous rock',
                    rationale: 'Igneous rock is formed from cooled magma.',
                    isCorrect: false,
                  },
                  {
                    text: 'Metamorphic rock',
                    rationale:
                      'Metamorphic rock is formed by heat and pressure.',
                    isCorrect: false,
                  },
                  {
                    text: 'Organic sedimentary rock',
                    rationale:
                      'Correct. Rocks like limestone and coal are formed from the accumulation of organic debris.',
                    isCorrect: true,
                  },
                  {
                    text: 'Chemical sedimentary rock',
                    rationale:
                      'Chemical sedimentary rocks form when minerals precipitate from a solution.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 5,
                challenge_tags: ['science-4'],
                type: 'text',
                passage:
                  "Weathering is the process that breaks down rocks, soils, and minerals as well as wood and artificial materials through contact with the Earth's atmosphere, water, and biological organisms. Erosion is the process by which soil and rock particles are worn away and moved elsewhere by gravity, or by a moving transport agent such as water, wind, or ice.",
                question:
                  'What is the key difference between weathering and erosion?',
                answerOptions: [
                  {
                    text: 'Weathering breaks down rocks, while erosion moves the broken pieces.',
                    rationale:
                      'Correct. Weathering is the breaking, and erosion is the taking.',
                    isCorrect: true,
                  },
                  {
                    text: 'Weathering only happens to soil, while erosion only happens to rock.',
                    rationale:
                      'Both processes can happen to both soil and rock.',
                    isCorrect: false,
                  },
                  {
                    text: 'Weathering is a chemical process, while erosion is a physical process.',
                    rationale:
                      'Both processes can be either physical or chemical.',
                    isCorrect: false,
                  },
                  {
                    text: 'There is no difference; they are the same process.',
                    rationale: 'They are two distinct but related processes.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                challenge_tags: ['science-4'],
                type: 'knowledge',
                question:
                  'Which of the following is the best example of chemical weathering?',
                answerOptions: [
                  {
                    text: 'A rock breaking apart due to ice freezing and expanding in its cracks.',
                    rationale:
                      'This is an example of physical weathering (ice wedging).',
                    isCorrect: false,
                  },
                  {
                    text: 'The smoothing of a rock by a river.',
                    rationale:
                      'This is an example of physical weathering and erosion.',
                    isCorrect: false,
                  },
                  {
                    text: 'The dissolving of limestone by acid rain.',
                    rationale:
                      'Correct. This is a chemical reaction that breaks down the rock.',
                    isCorrect: true,
                  },
                  {
                    text: 'The roots of a tree growing into and splitting a rock.',
                    rationale:
                      'This is an example of physical weathering (biological).',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 7,
                type: 'knowledge',
                question:
                  'What is the correct order of the planets in our solar system, starting from the one closest to the Sun?',
                answerOptions: [
                  {
                    text: 'Earth, Mars, Jupiter, Saturn, Venus, Mercury, Uranus, Neptune',
                    rationale: 'This order is incorrect.',
                    isCorrect: false,
                  },
                  {
                    text: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune',
                    rationale:
                      'Correct. This is the order of the eight planets.',
                    isCorrect: true,
                  },
                  {
                    text: 'Mercury, Venus, Mars, Earth, Jupiter, Saturn, Uranus, Neptune',
                    rationale: 'Earth and Mars are in the wrong order.',
                    isCorrect: false,
                  },
                  {
                    text: 'Jupiter, Saturn, Uranus, Neptune, Mercury, Venus, Earth, Mars',
                    rationale:
                      'This separates the gas giants and terrestrial planets but is not the correct order from the sun.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  'A star is a luminous ball of gas, mostly hydrogen and helium, held together by its own gravity. Nuclear fusion reactions in its core support the star against gravity and produce photons and heat, as well as small amounts of heavier elements. The Sun is the closest star to Earth.',
                question:
                  'What is the primary process that generates energy in a star like our Sun?',
                answerOptions: [
                  {
                    text: 'Nuclear fusion',
                    rationale:
                      "Correct. The passage states that nuclear fusion reactions in the core produce the star's energy.",
                    isCorrect: true,
                  },
                  {
                    text: 'Chemical combustion (burning)',
                    rationale:
                      "Stars are not 'burning' in the traditional sense; it is a nuclear process.",
                    isCorrect: false,
                  },
                  {
                    text: 'Gravitational collapse',
                    rationale:
                      'Gravity holds the star together, but fusion is what generates the outward energy.',
                    isCorrect: false,
                  },
                  {
                    text: 'Radioactive decay',
                    rationale:
                      "This process occurs but is not the primary source of a star's energy.",
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                challenge_tags: ['science-4'],
                type: 'knowledge',
                question: 'Why do we experience seasons on Earth?',
                answerOptions: [
                  {
                    text: "Because the Earth's distance from the Sun changes throughout the year.",
                    rationale:
                      'While the distance does change slightly, this is not the primary cause of the seasons.',
                    isCorrect: false,
                  },
                  {
                    text: "Because of the tilt of the Earth's axis relative to its orbit around the Sun.",
                    rationale:
                      'Correct. The tilt causes different parts of the Earth to receive more direct sunlight at different times of the year.',
                    isCorrect: true,
                  },
                  {
                    text: "Because the Sun's energy output changes throughout the year.",
                    rationale:
                      "The Sun's energy output is relatively constant.",
                    isCorrect: false,
                  },
                  {
                    text: 'Because of the changing phases of the Moon.',
                    rationale: "The Moon's phases do not affect the seasons.",
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 10,
                type: 'knowledge',
                question:
                  'What causes the phases of the Moon (e.g., new moon, full moon, quarter moon)?',
                answerOptions: [
                  {
                    text: "The Earth's shadow falling on the Moon.",
                    rationale:
                      'This describes a lunar eclipse, not the regular phases.',
                    isCorrect: false,
                  },
                  {
                    text: 'The changing amount of the sunlit side of the Moon that we can see from Earth as it orbits us.',
                    rationale:
                      "Correct. The phases are a result of our viewing angle of the Moon's illuminated surface.",
                    isCorrect: true,
                  },
                  {
                    text: 'Clouds blocking our view of the Moon.',
                    rationale:
                      'Clouds can obscure the moon, but they do not cause its phases.',
                    isCorrect: false,
                  },
                  {
                    text: 'The Moon physically changing its shape.',
                    rationale:
                      'The Moon is always a sphere; only our view of it changes.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                challenge_tags: ['science-4'],
                type: 'text',
                passage:
                  'Meteorology is the science dealing with the atmosphere and its phenomena, including weather and climate. Weather refers to the short-term conditions of the atmosphere at a particular time and place, including temperature, humidity, precipitation, and wind. Climate, on the other hand, is the long-term average of weather patterns in a region.',
                question:
                  'Which of the following is a description of climate, not weather?',
                answerOptions: [
                  {
                    text: 'It is currently raining in Chicago.',
                    rationale: 'This is a short-term condition (weather).',
                    isCorrect: false,
                  },
                  {
                    text: 'The Sahara Desert receives very little rainfall on average throughout the year.',
                    rationale:
                      'Correct. This describes a long-term average pattern, which is climate.',
                    isCorrect: true,
                  },
                  {
                    text: "Tomorrow's forecast is for a high of 75 degrees.",
                    rationale: 'This is a short-term prediction (weather).',
                    isCorrect: false,
                  },
                  {
                    text: 'The wind is blowing from the west today.',
                    rationale: 'This is a short-term condition (weather).',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 12,
                challenge_tags: ['science-4'],
                type: 'knowledge',
                question:
                  'What is the layer of gases surrounding the Earth called?',
                answerOptions: [
                  {
                    text: 'The lithosphere',
                    rationale:
                      'The lithosphere is the rigid outer part of the earth, consisting of the crust and upper mantle.',
                    isCorrect: false,
                  },
                  {
                    text: 'The hydrosphere',
                    rationale:
                      "The hydrosphere is all the waters on the earth's surface, such as lakes and seas.",
                    isCorrect: false,
                  },
                  {
                    text: 'The atmosphere',
                    rationale:
                      'Correct. The atmosphere is the envelope of gases surrounding the earth.',
                    isCorrect: true,
                  },
                  {
                    text: 'The asthenosphere',
                    rationale:
                      "The asthenosphere is the upper layer of the earth's mantle, below the lithosphere.",
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 13,
                type: 'knowledge',
                question: 'A solar eclipse occurs when:',
                answerOptions: [
                  {
                    text: 'The Earth passes between the Sun and the Moon.',
                    rationale: 'This describes a lunar eclipse.',
                    isCorrect: false,
                  },
                  {
                    text: "The Moon passes between the Sun and the Earth, blocking the Sun's light.",
                    rationale:
                      'Correct. This alignment casts a shadow on the Earth.',
                    isCorrect: true,
                  },
                  {
                    text: 'The Sun passes between the Earth and the Moon.',
                    rationale: 'This is not a possible alignment.',
                    isCorrect: false,
                  },
                  {
                    text: 'Another planet passes between the Earth and the Sun.',
                    rationale: 'This is called a transit, not a solar eclipse.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 14,
                type: 'image',
                imageUrl: 'Images/ged-scince-fig-7.png',
                question:
                  'This diagram illustrates the rock cycle. What process is required to turn a sedimentary rock into a metamorphic rock?',
                answerOptions: [
                  {
                    text: 'Weathering and erosion',
                    rationale: 'This would break the rock down into sediments.',
                    isCorrect: false,
                  },
                  {
                    text: 'Melting and cooling',
                    rationale: 'This would turn it into igneous rock.',
                    isCorrect: false,
                  },
                  {
                    text: 'Heat and pressure',
                    rationale:
                      'Correct. The diagram shows that heat and pressure transform existing rocks into metamorphic rocks.',
                    isCorrect: true,
                  },
                  {
                    text: 'Compaction and cementation',
                    rationale:
                      'This is the process that forms sedimentary rocks from sediment.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 15,
                type: 'knowledge',
                question:
                  "Which planet is known as the 'Red Planet' due to its reddish, iron-rich soil?",
                answerOptions: [
                  {
                    text: 'Jupiter',
                    rationale:
                      "Jupiter is a gas giant known for its Great Red Spot, but it is not the 'Red Planet.'",
                    isCorrect: false,
                  },
                  {
                    text: 'Venus',
                    rationale: 'Venus has a thick, yellowish atmosphere.',
                    isCorrect: false,
                  },
                  {
                    text: 'Mars',
                    rationale:
                      'Correct. Mars gets its distinctive red color from iron oxide (rust) on its surface.',
                    isCorrect: true,
                  },
                  {
                    text: 'Saturn',
                    rationale: 'Saturn is a gas giant known for its rings.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
  Math: {
    icon: 'CalculatorIcon',
    categories: {
      'Quantitative Problem Solving': {
        description: 'Solve problems using numbers, data, and statistics.',
        icon: 'ChartBarIcon', // New Icon
        topics: [
          {
            id: 'math_quant_basics',
            title: 'Whole Numbers, Fractions & Decimals',
            description: 'Operations with integers, fractions, and decimals.',
            type: 'quiz',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['math-1'],
                calculator: false,
                question:
                  'A construction project requires $\\frac{5}{8}$ inch bolts. If a worker has a bolt that is $\\frac{3}{4}$ inch, is it too large or too small, and by how much?',
                answerOptions: [
                  {
                    text: 'The bolt is $\\frac{1}{8}$ inch too large.',
                    isCorrect: true,
                    rationale:
                      'To compare $\\frac{3}{4}$ and $\\frac{5}{8}$, find a common denominator, which is 8. $\\frac{3}{4}$ is equal to $\\frac{6}{8}$, so it exceeds $\\frac{5}{8}$ by $\\frac{1}{8}$.',
                  },
                  {
                    text: 'The bolt is $\\frac{1}{8}$ inch too small.',
                    isCorrect: false,
                    rationale:
                      '$\\frac{3}{4}$ is equal to $\\frac{6}{8}$, which is larger than $\\frac{5}{8}$, not smaller.',
                  },
                  {
                    text: 'The bolt is $\\frac{1}{4}$ inch too large.',
                    isCorrect: false,
                    rationale:
                      'The difference between $\\frac{3}{4}$ and $\\frac{5}{8}$ is $\\frac{1}{8}$ inch, not $\\frac{1}{4}$ inch.',
                  },
                  {
                    text: 'The bolt matches the required size exactly.',
                    isCorrect: false,
                    rationale: 'The sizes differ by $\\frac{1}{8}$ inch.',
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['math-1'],
                calculator: false,
                question:
                  'A recipe calls for $2 \\frac{1}{2}$ cups of flour. If you want to make half the recipe, how much flour do you need?',
                answerOptions: [
                  {
                    text: '$\\frac{5}{4}$ cups',
                    isCorrect: true,
                    rationale:
                      'Half of $2 \\frac{1}{2}$ is $\\left(\\frac{5}{2}\\right) \\div 2 = \\frac{5}{4}$ cups.',
                  },
                  {
                    text: '$\\frac{3}{2}$ cups',
                    isCorrect: false,
                    rationale:
                      'This would be more than half of the original amount.',
                  },
                  {
                    text: '$1$ cup',
                    isCorrect: false,
                    rationale:
                      'This is less than half of $2 \\frac{1}{2}$ cups.',
                  },
                  {
                    text: '$\\frac{7}{4}$ cups',
                    isCorrect: false,
                    rationale: 'This is greater than the correct amount.',
                  },
                ],
              },
              {
                questionNumber: 3,
                calculator: false,
                question:
                  "A stock's price dropped by \\$1.25 on Monday and then rose by \\$2.50 on Tuesday. What was the net change in the stock's price over the two days?",
                answerOptions: [
                  {
                    text: 'A gain of \\$1.25',
                    isCorrect: true,
                    rationale:
                      'The net change is $-1.25 + 2.50 = 1.25$, so the stock gained \\$1.25.',
                  },
                  {
                    text: 'A loss of \\$1.25',
                    isCorrect: false,
                    rationale:
                      'Because the net change is positive, the stock did not lose value.',
                  },
                  {
                    text: 'A gain of \\$3.75',
                    isCorrect: false,
                    rationale:
                      'Adding the magnitudes $1.25$ and $2.50$ assumes both days were gains.',
                  },
                  {
                    text: 'A loss of \\$3.75',
                    isCorrect: false,
                    rationale:
                      'Both days were not losses, so the total change cannot be negative \\$3.75.',
                  },
                ],
              },
              {
                questionNumber: 4,
                calculator: false,
                question:
                  'If a pizza is cut into 8 slices and you eat 3 of them, what fraction of the pizza is left?',
                answerOptions: [
                  {
                    text: '$\\frac{3}{8}$',
                    isCorrect: false,
                    rationale: 'This is the fraction eaten.',
                  },
                  {
                    text: '$\\frac{5}{8}$',
                    isCorrect: true,
                    rationale:
                      'If 3 out of 8 slices are eaten, $8 - 3 = 5$ slices are left.',
                  },
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: false,
                    rationale: '$\\frac{1}{2}$ would be 4 slices.',
                  },
                  {
                    text: '$\\frac{3}{5}$',
                    isCorrect: false,
                    rationale:
                      'This incorrectly uses the eaten slices as the denominator.',
                  },
                ],
              },
              {
                questionNumber: 5,
                calculator: false,
                question:
                  "A customer's total bill is \\$34.56. If they pay with a \\$50 bill, how much change should they receive?",
                answerOptions: [
                  {
                    text: '\\$15.44',
                    isCorrect: true,
                    rationale: '\\$50.00 - \\$34.56 = \\$15.44.',
                  },
                  {
                    text: '\\$16.44',
                    isCorrect: false,
                    rationale:
                      'This result comes from subtracting incorrectly.',
                  },
                  {
                    text: '\\$15.54',
                    isCorrect: false,
                    rationale: 'The cents are miscalculated.',
                  },
                  {
                    text: '\\$25.44',
                    isCorrect: false,
                    rationale:
                      'This would be the change if the bill were \\$24.56.',
                  },
                ],
              },
              {
                questionNumber: 6,
                calculator: true,
                question:
                  'A piece of wood is 8 feet long. If you cut it into 4 equal pieces, how long will each piece be in feet?',
                answerOptions: [
                  {
                    text: '2 feet',
                    isCorrect: true,
                    rationale: '$8 \\text{ feet} / 4 = 2 \\text{ feet}$.',
                  },
                  {
                    text: '4 feet',
                    isCorrect: false,
                    rationale: 'This would be cutting it in half.',
                  },
                  {
                    text: '1 foot',
                    isCorrect: false,
                    rationale: 'This would be cutting it into 8 pieces.',
                  },
                  {
                    text: '32 feet',
                    isCorrect: false,
                    rationale: 'This is multiplication, not division.',
                  },
                ],
              },
              {
                questionNumber: 7,
                calculator: true,
                question:
                  'What is $0.75$ expressed as a fraction in simplest form?',
                answerOptions: [
                  {
                    text: '$\\frac{75}{100}$',
                    isCorrect: false,
                    rationale: 'This is correct but not in simplest form.',
                  },
                  {
                    text: '$\\frac{3}{4}$',
                    isCorrect: true,
                    rationale:
                      '$0.75$ is $\\frac{75}{100}$, which simplifies to $\\frac{3}{4}$ by dividing both numerator and denominator by 25.',
                  },
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: false,
                    rationale: '$\\frac{1}{2}$ is $0.50$.',
                  },
                  {
                    text: '$\\frac{4}{3}$',
                    isCorrect: false,
                    rationale: 'This is the reciprocal of the correct answer.',
                  },
                ],
              },
              {
                questionNumber: 8,
                calculator: true,
                question:
                  'The temperature was $-5�F$ in the morning and rose to $12�F$ in the afternoon. How many degrees did the temperature increase?',
                answerOptions: [
                  {
                    text: '7 degrees',
                    isCorrect: false,
                    rationale:
                      'This is the difference between 12 and 5, not 12 and -5.',
                  },
                  {
                    text: '17 degrees',
                    isCorrect: true,
                    rationale:
                      'The increase is $12 - (-5) = 12 + 5 = 17$ degrees.',
                  },
                  {
                    text: '-17 degrees',
                    isCorrect: false,
                    rationale:
                      'The temperature increased, so the change is positive.',
                  },
                  {
                    text: '12 degrees',
                    isCorrect: false,
                    rationale:
                      'This ignores the starting negative temperature.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: true,
                question:
                  'A carpenter has a board that is $10 \\frac{1}{2}$ feet long. He needs to cut a piece that is $3 \\frac{3}{4}$ feet long. How much of the board is left?',
                answerOptions: [
                  {
                    text: '$\\frac{27}{4}$ feet',
                    isCorrect: true,
                    rationale:
                      '$10 \\frac{1}{2} - 3 \\frac{3}{4} = \\frac{21}{2} - \\frac{15}{4} = \\frac{42}{4} - \\frac{15}{4} = \\frac{27}{4}$ feet.',
                  },
                  {
                    text: '$\\frac{29}{4}$ feet',
                    isCorrect: false,
                    rationale:
                      'This would come from subtracting $3 \\frac{1}{4}$ instead of $3 \\frac{3}{4}$.',
                  },
                  {
                    text: '$\\frac{13}{2}$ feet',
                    isCorrect: false,
                    rationale:
                      'This corresponds to $6 \\frac{1}{2}$ feet, which is too small.',
                  },
                  {
                    text: '7 feet',
                    isCorrect: false,
                    rationale:
                      'This ignores the fractional part of the remaining length.',
                  },
                ],
              },
              {
                questionNumber: 10,
                challenge_tags: ['math-4'],
                calculator: true,
                question:
                  'If you drive 4.5 miles to the store, then 2.3 miles to the post office, and finally 6.1 miles home, how many miles did you drive in total?',
                answerOptions: [
                  {
                    text: '12.9 miles',
                    isCorrect: true,
                    rationale: '$4.5 + 2.3 + 6.1 = 12.9$ miles.',
                  },
                  {
                    text: '11.9 miles',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '13.0 miles',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '10.9 miles',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                ],
              },
              {
                questionNumber: 11,
                calculator: true,
                question:
                  'Which of the following numbers is the largest: $0.6, 0.65, 0.065, 0.605$?',
                answerOptions: [
                  {
                    text: '0.6',
                    isCorrect: false,
                    rationale: '$0.6$ is equal to $0.600$.',
                  },
                  {
                    text: '0.65',
                    isCorrect: true,
                    rationale:
                      'Comparing the decimal places, $0.650$ is the largest value.',
                  },
                  {
                    text: '0.065',
                    isCorrect: false,
                    rationale: 'This is the smallest value.',
                  },
                  {
                    text: '0.605',
                    isCorrect: false,
                    rationale: '$0.605$ is smaller than $0.650$.',
                  },
                ],
              },
              {
                questionNumber: 12,
                calculator: true,
                question:
                  "A company's profit was \\$5,670 in one month. The next month, it was -\\$830 (a loss). What is the difference between the two months' profits?",
                answerOptions: [
                  {
                    text: '\\$4,840',
                    isCorrect: false,
                    rationale:
                      'This is the sum if both months were profitable.',
                  },
                  {
                    text: '\\$6,500',
                    isCorrect: true,
                    rationale:
                      'The difference is \\$5,670 - (-\\$830) = \\$5,670 + \\$830 = \\$6,500.',
                  },
                  {
                    text: '\\$5,500',
                    isCorrect: false,
                    rationale:
                      'This miscalculates the change between the months.',
                  },
                  {
                    text: '-\\$830',
                    isCorrect: false,
                    rationale:
                      'This is the profit for the second month, not the difference.',
                  },
                ],
              },
              {
                questionNumber: 13,
                calculator: true,
                question:
                  'If a baker has 12 cups of sugar and each cake requires $1 \\frac{1}{2}$ cups of sugar, how many cakes can the baker make?',
                answerOptions: [
                  {
                    text: '6 cakes',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '8 cakes',
                    isCorrect: true,
                    rationale:
                      '$12 / (1 \\frac{1}{2}) = 12 / (\\frac{3}{2}) = 12 * (\\frac{2}{3}) = 24 / 3 = 8$ cakes.',
                  },
                  {
                    text: '9 cakes',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '18 cakes',
                    isCorrect: false,
                    rationale: 'This is multiplication, not division.',
                  },
                ],
              },
              {
                questionNumber: 14,
                challenge_tags: ['math-1'],
                calculator: true,
                question:
                  'Order the following fractions from smallest to largest: $\\frac{1}{2}, \\frac{3}{5}, \\frac{2}{3}$.',
                answerOptions: [
                  {
                    text: '$\\frac{3}{5}, \\frac{1}{2}, \\frac{2}{3}$',
                    isCorrect: false,
                    rationale:
                      'Find a common denominator (30): $\\frac{1}{2}=\\frac{15}{30}, \\frac{3}{5}=\\frac{18}{30}, \\frac{2}{3}=\\frac{20}{30}$.',
                  },
                  {
                    text: '$\\frac{1}{2}, \\frac{3}{5}, \\frac{2}{3}$',
                    isCorrect: true,
                    rationale:
                      'In decimal form: $\\frac{1}{2}=0.5, \\frac{3}{5}=0.6, \\frac{2}{3} \\approx 0.66...$ The correct order is $\\frac{1}{2}, \\frac{3}{5}, \\frac{2}{3}$.',
                  },
                  {
                    text: '$\\frac{2}{3}, \\frac{3}{5}, \\frac{1}{2}$',
                    isCorrect: false,
                    rationale: 'This is largest to smallest.',
                  },
                  {
                    text: '$\\frac{1}{2}, \\frac{2}{3}, \\frac{3}{5}$',
                    isCorrect: false,
                    rationale: 'This order is incorrect.',
                  },
                ],
              },
              {
                questionNumber: 15,
                calculator: true,
                question:
                  'A submarine is at a depth of -350 feet. It then rises 120 feet. What is its new depth?',
                answerOptions: [
                  {
                    text: '-470 feet',
                    isCorrect: false,
                    rationale:
                      'This would be the depth if it descended further.',
                  },
                  {
                    text: '-230 feet',
                    isCorrect: true,
                    rationale: '$-350 + 120 = -230$ feet.',
                  },
                  {
                    text: '230 feet',
                    isCorrect: false,
                    rationale: 'The submarine is still below sea level.',
                  },
                  {
                    text: '-120 feet',
                    isCorrect: false,
                    rationale: 'This is the amount it rose, not its new depth.',
                  },
                ],
              },
              {
                questionNumber: 16,
                calculator: true,
                question:
                  'A baker uses $\\frac{1}{4}$ of a bag of flour for a batch of cookies. If the bag originally contained 20 cups of flour, how many cups are left?',
                answerOptions: [
                  {
                    text: '5 cups',
                    isCorrect: false,
                    rationale:
                      'This is the amount of flour used, not the amount left.',
                  },
                  {
                    text: '15 cups',
                    isCorrect: true,
                    rationale:
                      'The baker used $\\frac{1}{4} \\times 20 = 5$ cups. The amount left is $20 - 5 = 15$ cups.',
                  },
                  {
                    text: '10 cups',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '16 cups',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                ],
              },
              {
                questionNumber: 17,
                calculator: true,
                question:
                  "Sarah's temperature was 102.5�F. After taking some medicine, her temperature dropped by 3.8�F. What is her new temperature?",
                answerOptions: [
                  {
                    text: '98.7�F',
                    isCorrect: true,
                    rationale: '$102.5 - 3.8 = 98.7$�F.',
                  },
                  {
                    text: '99.7�F',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '106.3�F',
                    isCorrect: false,
                    rationale:
                      'This is the result of adding the numbers, not subtracting.',
                  },
                  {
                    text: '98.2�F',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                ],
              },
              {
                questionNumber: 18,
                calculator: true,
                question:
                  "A car travels 350 miles on a full tank of gas. If the tank holds 14 gallons, what is the car's fuel efficiency in miles per gallon (MPG)?",
                answerOptions: [
                  {
                    text: '20 MPG',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '25 MPG',
                    isCorrect: true,
                    rationale:
                      'Fuel efficiency is total miles divided by gallons used: $350 / 14 = 25$ MPG.',
                  },
                  {
                    text: '30 MPG',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '35 MPG',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                ],
              },
              {
                questionNumber: 19,
                calculator: true,
                question:
                  'A recipe requires $\\frac{3}{4}$ cup of sugar. If you want to make a triple batch, how much sugar do you need?',
                answerOptions: [
                  {
                    text: '$\\frac{9}{4}$ cups',
                    isCorrect: true,
                    rationale:
                      'Triple batch means multiplying by 3: $3 \\times \\frac{3}{4} = \\frac{9}{4}$ cups.',
                  },
                  {
                    text: '$\\frac{3}{2}$ cups',
                    isCorrect: false,
                    rationale: 'This represents only doubling the recipe.',
                  },
                  {
                    text: '$\\frac{15}{4}$ cups',
                    isCorrect: false,
                    rationale:
                      'This would correspond to five times the original amount.',
                  },
                  {
                    text: '3 cups',
                    isCorrect: false,
                    rationale:
                      'This replaces the fraction with a whole number incorrectly.',
                  },
                ],
              },
              {
                questionNumber: 20,
                calculator: false,
                question:
                  'The temperature was -8�C in the morning and rose by 15�C. What is the new temperature?',
                answerOptions: [
                  {
                    text: '-23�C',
                    isCorrect: false,
                    rationale:
                      'This would be the temperature if it dropped by 15 degrees.',
                  },
                  {
                    text: '7�C',
                    isCorrect: true,
                    rationale: '-8 + 15 = 7�C.',
                  },
                  {
                    text: '23�C',
                    isCorrect: false,
                    rationale: 'Incorrect calculation.',
                  },
                  {
                    text: '-7�C',
                    isCorrect: false,
                    rationale: 'Incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 21,
                calculator: true,
                question:
                  "A runner completed a race in 45.67 seconds. The second-place runner finished 1.89 seconds slower. What was the second-place runner's time?",
                answerOptions: [
                  {
                    text: '43.78 seconds',
                    isCorrect: false,
                    rationale: 'This would be 1.89 seconds faster.',
                  },
                  {
                    text: '47.56 seconds',
                    isCorrect: true,
                    rationale:
                      'Slower means adding the time. 45.67 + 1.89 = 47.56 seconds.',
                  },
                  {
                    text: '46.56 seconds',
                    isCorrect: false,
                    rationale: 'Incorrect calculation.',
                  },
                  {
                    text: '47.46 seconds',
                    isCorrect: false,
                    rationale: 'Incorrect calculation.',
                  },
                ],
              },
            ],
          },
          {
            id: 'math_quant_ratios_percents',
            title: 'Ratios, Proportions & Percents',
            description:
              'Solving real-world problems with ratios and percentages.',
            type: 'quiz',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['math-1'],
                calculator: false,
                question:
                  'A shirt that originally costs $40 is on sale for $25\\%$ off. What is the sale price of the shirt?',
                answerOptions: [
                  {
                    text: '$10',
                    isCorrect: false,
                    rationale:
                      'This is the discount amount, not the final price.',
                  },
                  {
                    text: '$30',
                    isCorrect: true,
                    rationale:
                      'The discount is $25\\%$ of $\\$40$, which is $0.25 \\times 40 = \\$10$. The sale price is $\\$40 - \\$10 = \\$30$.',
                  },
                  {
                    text: '$50',
                    isCorrect: false,
                    rationale: 'This is the price after a 25% increase.',
                  },
                  {
                    text: '$35',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['math-1'],
                calculator: false,
                question:
                  'A map has a scale where 1 inch represents 50 miles. If two cities are 3.5 inches apart on the map, what is the actual distance between them?',
                answerOptions: [
                  {
                    text: '150 miles',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '175 miles',
                    isCorrect: true,
                    rationale:
                      'Set up a proportion: $\\frac{1 \\text{ in}}{50 \\text{ mi}} = \\frac{3.5 \\text{ in}}{x \\text{ mi}}$. Solving for x gives $3.5 \\times 50 = 175$ miles.',
                  },
                  {
                    text: '200 miles',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '14.3 miles',
                    isCorrect: false,
                    rationale: 'This is division, not multiplication.',
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['math-1'],
                calculator: false,
                question:
                  'In a bag of marbles, the ratio of blue marbles to red marbles is $3:5$. If there are 15 red marbles, how many blue marbles are there?',
                answerOptions: [
                  {
                    text: '9',
                    isCorrect: true,
                    rationale:
                      'Set up a proportion: $\\frac{3 \\text{ blue}}{5 \\text{ red}} = \\frac{x \\text{ blue}}{15 \\text{ red}}$. To get from 5 to 15, you multiply by 3. So, multiply 3 by 3 to get 9.',
                  },
                  {
                    text: '25',
                    isCorrect: false,
                    rationale:
                      'This would be the result if the ratio were 5:3.',
                  },
                  {
                    text: '15',
                    isCorrect: false,
                    rationale: 'This is the number of red marbles.',
                  },
                  {
                    text: '3',
                    isCorrect: false,
                    rationale:
                      'This is part of the ratio, not the final number.',
                  },
                ],
              },
              {
                questionNumber: 4,
                calculator: false,
                question:
                  'A restaurant bill is $80. If you want to leave a $20\\%$ tip, how much should the tip be?',
                answerOptions: [
                  {
                    text: '$8',
                    isCorrect: false,
                    rationale: 'This would be a 10% tip.',
                  },
                  {
                    text: '$16',
                    isCorrect: true,
                    rationale:
                      '$20\\%$ of $\\$80$ is $0.20 \\times 80 = \\$16$.',
                  },
                  {
                    text: '$20',
                    isCorrect: false,
                    rationale: 'This would be a 25% tip.',
                  },
                  {
                    text: '$96',
                    isCorrect: false,
                    rationale: 'This is the total bill plus the tip.',
                  },
                ],
              },
              {
                questionNumber: 5,
                challenge_tags: ['math-1'],
                calculator: false,
                question:
                  'You scored 45 out of 50 on a test. What is your score as a percentage?',
                answerOptions: [
                  {
                    text: '$85\\%$',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '$90\\%$',
                    isCorrect: true,
                    rationale:
                      '$(\\frac{45}{50}) \\times 100 = 0.9 \\times 100 = 90\\%$.',
                  },
                  {
                    text: '$95\\%$',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '$45\\%$',
                    isCorrect: false,
                    rationale: 'This is the raw score, not the percentage.',
                  },
                ],
              },
              {
                questionNumber: 6,
                challenge_tags: ['math-1'],
                calculator: true,
                question:
                  'The price of a computer increased from $500 to $600. What was the percent increase?',
                answerOptions: [
                  {
                    text: '$10\\%$',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '$20\\%$',
                    isCorrect: true,
                    rationale:
                      'The increase is $\\$100$. The percent increase is (increase / original price) * 100 = (100 / 500) * 100 = $0.2 \\times 100 = 20\\%$.',
                  },
                  {
                    text: '$25\\%$',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '$100\\%$',
                    isCorrect: false,
                    rationale: 'This would mean the price doubled.',
                  },
                ],
              },
              {
                questionNumber: 7,
                calculator: true,
                question:
                  'A car can travel 300 miles on 12 gallons of gasoline. How many gallons are needed to travel 450 miles?',
                answerOptions: [
                  {
                    text: '15 gallons',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '18 gallons',
                    isCorrect: true,
                    rationale:
                      'The car gets $\\frac{300}{12} = 25$ miles per gallon. To travel 450 miles, you need $\\frac{450}{25} = 18$ gallons.',
                  },
                  {
                    text: '20 gallons',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '24 gallons',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 8,
                calculator: true,
                question:
                  'A survey of 200 people found that 120 of them prefer coffee to tea. What is the ratio of people who prefer coffee to the total number of people surveyed, in simplest form?',
                answerOptions: [
                  {
                    text: '$120:200$',
                    isCorrect: false,
                    rationale:
                      'This is the correct ratio but not in simplest form.',
                  },
                  {
                    text: '$3:5$',
                    isCorrect: true,
                    rationale:
                      'The ratio is $\\frac{120}{200}$. Divide both sides by the greatest common divisor, 40, to get $\\frac{3}{5}$.',
                  },
                  {
                    text: '$2:3$',
                    isCorrect: false,
                    rationale:
                      'This is the ratio of tea drinkers to coffee drinkers.',
                  },
                  {
                    text: '$3:2$',
                    isCorrect: false,
                    rationale:
                      'This is the ratio of coffee drinkers to tea drinkers.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: true,
                question:
                  'If sales tax is $7\\%$, how much tax would you pay on a $150 purchase?',
                answerOptions: [
                  {
                    text: '$7.00',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '$10.50',
                    isCorrect: true,
                    rationale:
                      '$7\\%$ of $\\$150$ is $0.07 \\times 150 = \\$10.50$.',
                  },
                  {
                    text: '$15.00',
                    isCorrect: false,
                    rationale: 'This would be a 10% tax.',
                  },
                  {
                    text: '$1.05',
                    isCorrect: false,
                    rationale: 'This is a decimal placement error.',
                  },
                ],
              },
              {
                questionNumber: 10,
                calculator: true,
                question:
                  'A recipe calls for 2 cups of sugar for every 5 cups of flour. If you use 15 cups of flour, how much sugar do you need?',
                answerOptions: [
                  {
                    text: '4 cups',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '5 cups',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '6 cups',
                    isCorrect: true,
                    rationale:
                      'The ratio is $\\frac{2}{5}$. Set up the proportion $\\frac{2}{5} = \\frac{x}{15}$. To get from 5 to 15, you multiply by 3. So, $2 \\times 3 = 6$ cups.',
                  },
                  {
                    text: '7.5 cups',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 11,
                calculator: true,
                question:
                  'A store buys a TV for $200 and marks it up by $60\\%$ to sell. What is the selling price?',
                answerOptions: [
                  {
                    text: '$260',
                    isCorrect: false,
                    rationale: 'This would be a 30% markup.',
                  },
                  {
                    text: '$320',
                    isCorrect: true,
                    rationale:
                      'The markup is $60\\%$ of $\\$200$, which is $0.60 \\times 200 = \\$120$. The selling price is $\\$200 + \\$120 = \\$320$.',
                  },
                  {
                    text: '$280',
                    isCorrect: false,
                    rationale: 'This would be a 40% markup.',
                  },
                  {
                    text: '$120',
                    isCorrect: false,
                    rationale:
                      'This is the markup amount, not the final price.',
                  },
                ],
              },
              {
                questionNumber: 12,
                calculator: true,
                question:
                  "If a city's population grew by $5\\%$ last year and the original population was 80,000, what is the new population?",
                answerOptions: [
                  {
                    text: '80,400',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '84,000',
                    isCorrect: true,
                    rationale:
                      'The growth is $5\\%$ of 80,000, which is $0.05 \\times 80,000 = 4,000$. The new population is $80,000 + 4,000 = 84,000$.',
                  },
                  {
                    text: '85,000',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '120,000',
                    isCorrect: false,
                    rationale: 'This would be a 50% growth.',
                  },
                ],
              },
              {
                questionNumber: 13,
                calculator: true,
                question:
                  'Two numbers are in the ratio of $7:4$. If the smaller number is 28, what is the larger number?',
                answerOptions: [
                  {
                    text: '49',
                    isCorrect: true,
                    rationale:
                      'The ratio is $\\frac{7}{4}$. Set up the proportion $\\frac{7}{4} = \\frac{x}{28}$. To get from 4 to 28, you multiply by 7. So, $7 \\times 7 = 49$.',
                  },
                  {
                    text: '16',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '56',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '28',
                    isCorrect: false,
                    rationale: 'This is the smaller number.',
                  },
                ],
              },
              {
                questionNumber: 14,
                calculator: true,
                question:
                  'A company has 500 employees. If $15\\%$ of the employees have been with the company for more than 10 years, how many employees is that?',
                answerOptions: [
                  {
                    text: '50',
                    isCorrect: false,
                    rationale: 'This would be 10%.',
                  },
                  {
                    text: '75',
                    isCorrect: true,
                    rationale:
                      '$15\\%$ of 500 is $0.15 \\times 500 = 75$ employees.',
                  },
                  {
                    text: '100',
                    isCorrect: false,
                    rationale: 'This would be 20%.',
                  },
                  {
                    text: '150',
                    isCorrect: false,
                    rationale: 'This would be 30%.',
                  },
                ],
              },
              {
                questionNumber: 15,
                calculator: true,
                question:
                  'If you need to mix cement and sand in a ratio of $1:3$, how much sand would you need if you use 5 bags of cement?',
                answerOptions: [
                  {
                    text: '3 bags',
                    isCorrect: false,
                    rationale: 'This is the ratio value, not the total amount.',
                  },
                  {
                    text: '5 bags',
                    isCorrect: false,
                    rationale: 'This is the amount of cement.',
                  },
                  {
                    text: '15 bags',
                    isCorrect: true,
                    rationale:
                      'The ratio is 1 part cement to 3 parts sand. If you have 5 bags of cement, you need $5 \\times 3 = 15$ bags of sand.',
                  },
                  {
                    text: '20 bags',
                    isCorrect: false,
                    rationale: 'This is the total number of bags.',
                  },
                ],
              },
              {
                questionNumber: 16,
                calculator: true,
                question:
                  'A runner completes 8 laps around a track in 12 minutes. At this rate, how many laps can the runner complete in 30 minutes?',
                answerOptions: [
                  {
                    text: '15 laps',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '20 laps',
                    isCorrect: true,
                    rationale:
                      "The runner's rate is $\\frac{12 \\text{ min}}{8 \\text{ laps}} = 1.5$ minutes per lap. In 30 minutes, the runner can complete $\\frac{30}{1.5} = 20$ laps. Alternatively, set up a proportion: $\\frac{8}{12} = \\frac{x}{30}$, which gives $12x = 240$, so $x=20$.",
                  },
                  {
                    text: '24 laps',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '18 laps',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 17,
                calculator: true,
                question:
                  'The ratio of boys to girls in a school is 5:6. If there are 240 girls, what is the total number of students in the school?',
                answerOptions: [
                  {
                    text: '200',
                    isCorrect: false,
                    rationale:
                      'This is the number of boys, not the total number of students.',
                  },
                  {
                    text: '440',
                    isCorrect: true,
                    rationale:
                      'Set up the proportion $\\frac{5 \\text{ boys}}{6 \\text{ girls}} = \\frac{x \\text{ boys}}{240 \\text{ girls}}$. This gives $6x = 1200$, so $x = 200$ boys. The total number of students is 200 boys + 240 girls = 440.',
                  },
                  {
                    text: '480',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '540',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 18,
                calculator: true,
                question:
                  'A pair of jeans originally priced at $75 is on sale for 40% off. What is the sale price?',
                answerOptions: [
                  {
                    text: '$30',
                    isCorrect: false,
                    rationale:
                      'This is the discount amount, not the final sale price.',
                  },
                  {
                    text: '$45',
                    isCorrect: true,
                    rationale:
                      'The discount is $40\\%$ of $\\$75$, which is $0.40 \\times 75 = \\$30$. The sale price is the original price minus the discount: $\\$75 - \\$30 = \\$45$.',
                  },
                  {
                    text: '$105',
                    isCorrect: false,
                    rationale:
                      'This is the original price plus the discount amount.',
                  },
                  {
                    text: '$55',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
            ],
          },
          {
            id: 'math_quant_stats_probability',
            title: 'Statistics & Probability',
            description: 'Mean, median, mode, range, and basic probability.',
            type: 'quiz',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['math-6'],
                calculator: false,
                type: 'chart',
                passage:
                  "<div class='passage-text'><b>Test Scores: 85, 92, 78, 88, 92</b></div>",
                question: 'What is the mode of the test scores listed?',
                answerOptions: [
                  {
                    text: '87',
                    isCorrect: false,
                    rationale: '87 is the mean, not the mode.',
                  },
                  {
                    text: '88',
                    isCorrect: false,
                    rationale: '88 is the median, not the mode.',
                  },
                  {
                    text: '92',
                    isCorrect: true,
                    rationale:
                      'The mode is the number that appears most frequently. 92 appears twice.',
                  },
                  {
                    text: '14',
                    isCorrect: false,
                    rationale: '14 is the range, not the mode.',
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['math-6'],
                calculator: false,
                type: 'chart',
                passage:
                  "<div class='passage-text'><b>Test Scores: 85, 92, 78, 88, 92</b></div>",
                question:
                  'What is the mean (average) of the test scores listed?',
                answerOptions: [
                  {
                    text: '87',
                    isCorrect: true,
                    rationale:
                      'The sum of the scores ($85+92+78+88+92$) is 435. The mean is $435 / 5 = 87$.',
                  },
                  {
                    text: '88',
                    isCorrect: false,
                    rationale: '88 is the median.',
                  },
                  {
                    text: '92',
                    isCorrect: false,
                    rationale: '92 is the mode.',
                  },
                  {
                    text: '78',
                    isCorrect: false,
                    rationale: '78 is the lowest score.',
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['math-6'],
                calculator: false,
                type: 'chart',
                passage:
                  "<div class='passage-text'><b>Test Scores: 85, 92, 78, 88, 92</b></div>",
                question: 'What is the median of the test scores listed?',
                answerOptions: [
                  {
                    text: '85',
                    isCorrect: false,
                    rationale: 'This is one of the scores, but not the median.',
                  },
                  {
                    text: '88',
                    isCorrect: true,
                    rationale:
                      'First, order the scores: 78, 85, 88, 92, 92. The median is the middle value, which is 88.',
                  },
                  {
                    text: '92',
                    isCorrect: false,
                    rationale: '92 is the mode.',
                  },
                  {
                    text: '87',
                    isCorrect: false,
                    rationale: '87 is the mean.',
                  },
                ],
              },
              {
                questionNumber: 4,
                calculator: false,
                question:
                  'A bag contains 4 red, 5 blue, and 6 green marbles. What is the probability of randomly drawing a blue marble?',
                answerOptions: [
                  {
                    text: '$\\frac{1}{3}$',
                    isCorrect: true,
                    rationale:
                      'There are 5 blue marbles and a total of $4+5+6=15$ marbles. The probability is $\\frac{5}{15}$, which simplifies to $\\frac{1}{3}$.',
                  },
                  {
                    text: '$\\frac{1}{5}$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$\\frac{5}{10}$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$\\frac{1}{15}$',
                    isCorrect: false,
                    rationale:
                      'This would be the probability of drawing one specific marble.',
                  },
                ],
              },
              {
                questionNumber: 5,
                calculator: false,
                type: 'chart',
                passage:
                  "<div class='passage-text'><b>Daily High Temperatures (�F): 65, 68, 72, 72, 75, 78, 81</b></div>",
                question: 'What is the range of the daily high temperatures?',
                answerOptions: [
                  {
                    text: '72',
                    isCorrect: false,
                    rationale: '72 is the mode and median.',
                  },
                  {
                    text: '16',
                    isCorrect: true,
                    rationale:
                      'The range is the difference between the highest and lowest value: $81 - 65 = 16$.',
                  },
                  {
                    text: '73',
                    isCorrect: false,
                    rationale: '73 is the mean.',
                  },
                  {
                    text: '81',
                    isCorrect: false,
                    rationale: '81 is the highest temperature.',
                  },
                ],
              },
              {
                questionNumber: 6,
                calculator: true,
                question:
                  'If you roll a standard six-sided die, what is the probability of rolling an even number?',
                answerOptions: [
                  {
                    text: '$\\frac{1}{6}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of rolling one specific number.',
                  },
                  {
                    text: '$\\frac{1}{3}$',
                    isCorrect: false,
                    rationale:
                      'There are 3 even numbers (2, 4, 6) out of 6 total possibilities.',
                  },
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: true,
                    rationale:
                      'There are 3 even numbers (2, 4, 6) out of 6 total possibilities. The probability is $\\frac{3}{6}$, which simplifies to $\\frac{1}{2}$.',
                  },
                  {
                    text: '$\\frac{2}{3}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of rolling a number greater than 2.',
                  },
                ],
              },
              {
                questionNumber: 7,
                calculator: true,
                type: 'chart',
                passage:
                  "<div class='passage-text'><b>Ages of employees: 22, 25, 28, 34, 46</b></div>",
                question: 'What is the median age of the employees?',
                answerOptions: [
                  {
                    text: '22',
                    isCorrect: false,
                    rationale: 'This is the minimum age.',
                  },
                  {
                    text: '28',
                    isCorrect: true,
                    rationale:
                      'The ages are already in order. The median is the middle value, which is 28.',
                  },
                  {
                    text: '31',
                    isCorrect: false,
                    rationale: '31 is the mean.',
                  },
                  {
                    text: '46',
                    isCorrect: false,
                    rationale: 'This is the maximum age.',
                  },
                ],
              },
              {
                questionNumber: 8,
                calculator: true,
                question:
                  'A spinner is divided into 8 equal sections, numbered 1 through 8. What is the probability of spinning a number greater than 5?',
                answerOptions: [
                  {
                    text: '$\\frac{1}{8}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of spinning one specific number.',
                  },
                  {
                    text: '$\\frac{3}{8}$',
                    isCorrect: true,
                    rationale:
                      "The numbers greater than 5 are 6, 7, and 8. That's 3 favorable outcomes out of 8 total possibilities.",
                  },
                  {
                    text: '$\\frac{5}{8}$',
                    isCorrect: false,
                    rationale: 'This is the probability of spinning 5 or less.',
                  },
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: false,
                    rationale: '$\\frac{1}{2}$ would be 4 sections.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: true,
                type: 'chart',
                passage:
                  "<div class='passage-text'><b>Number of books read per month: 2, 3, 3, 5, 7, 10</b></div>",
                question: 'What is the mean number of books read?',
                answerOptions: [
                  { text: '3', isCorrect: false, rationale: '3 is the mode.' },
                  {
                    text: '4',
                    isCorrect: false,
                    rationale: '4 is the median.',
                  },
                  {
                    text: '5',
                    isCorrect: true,
                    rationale:
                      'The sum is $2+3+3+5+7+10 = 30$. The mean is $30 / 6 = 5$.',
                  },
                  { text: '8', isCorrect: false, rationale: '8 is the range.' },
                ],
              },
              {
                questionNumber: 10,
                calculator: true,
                question:
                  'From a standard deck of 52 cards, what is the probability of drawing a king?',
                answerOptions: [
                  {
                    text: '$\\frac{1}{52}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of drawing a specific king, not any king.',
                  },
                  {
                    text: '$\\frac{1}{13}$',
                    isCorrect: true,
                    rationale:
                      'There are 4 kings in a 52-card deck. The probability is $\\frac{4}{52}$, which simplifies to $\\frac{1}{13}$.',
                  },
                  {
                    text: '$\\frac{1}{4}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of drawing a specific suit.',
                  },
                  {
                    text: '$\\frac{4}{13}$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 11,
                calculator: true,
                type: 'chart',
                passage:
                  "<div class='passage-text'><b>Points scored in 5 games: 10, 15, 12, 10, 18</b></div>",
                question: 'What is the mode of the points scored?',
                answerOptions: [
                  {
                    text: '10',
                    isCorrect: true,
                    rationale:
                      'The mode is the value that appears most frequently. 10 appears twice.',
                  },
                  {
                    text: '12',
                    isCorrect: false,
                    rationale: '12 is the median.',
                  },
                  {
                    text: '13',
                    isCorrect: false,
                    rationale: '13 is the mean.',
                  },
                  { text: '8', isCorrect: false, rationale: '8 is the range.' },
                ],
              },
              {
                questionNumber: 12,
                calculator: true,
                question:
                  'If you flip a coin twice, what is the probability of getting heads both times?',
                answerOptions: [
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of getting heads on a single flip.',
                  },
                  {
                    text: '$\\frac{1}{3}$',
                    isCorrect: false,
                    rationale:
                      'There are 4 possible outcomes (HH, HT, TH, TT).',
                  },
                  {
                    text: '$\\frac{1}{4}$',
                    isCorrect: true,
                    rationale:
                      'The probability of the first heads is $\\frac{1}{2}$. The probability of the second is $\\frac{1}{2}$. The combined probability is $\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}$.',
                  },
                  {
                    text: '1',
                    isCorrect: false,
                    rationale: 'This would mean it is a certain outcome.',
                  },
                ],
              },
              {
                questionNumber: 13,
                calculator: true,
                type: 'chart',
                passage:
                  "<div class='passage-text'><b>A student's grades are 80, 85, and 90. What grade do they need on the fourth test to have an average of 85?</b></div>",
                question:
                  'What grade is needed on the fourth test for an average of 85?',
                answerOptions: [
                  {
                    text: '80',
                    isCorrect: false,
                    rationale: 'This would result in an average of 83.75.',
                  },
                  {
                    text: '85',
                    isCorrect: true,
                    rationale:
                      'To have an average of 85 over 4 tests, the total score must be $85 \\times 4 = 340$. The current sum is $80+85+90 = 255$. The needed score is $340 - 255 = 85$.',
                  },
                  {
                    text: '90',
                    isCorrect: false,
                    rationale: 'This would result in an average of 86.25.',
                  },
                  {
                    text: '95',
                    isCorrect: false,
                    rationale: 'This would result in an average of 87.5.',
                  },
                ],
              },
              {
                questionNumber: 14,
                calculator: true,
                question:
                  'A company has 100 employees. 60 are full-time and 40 are part-time. If an employee is selected at random, what is the probability they are part-time?',
                answerOptions: [
                  {
                    text: '$\\frac{3}{5}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of selecting a full-time employee.',
                  },
                  {
                    text: '$\\frac{2}{5}$',
                    isCorrect: true,
                    rationale:
                      'The probability is $\\frac{40}{100}$, which simplifies to $\\frac{2}{5}$.',
                  },
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: false,
                    rationale: 'This would be true if there were 50 of each.',
                  },
                  {
                    text: '$\\frac{1}{40}$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 15,
                calculator: true,
                type: 'chart',
                passage:
                  "<div class='passage-text'><b>Number of daily customers: 102, 115, 98, 120, 115, 130</b></div>",
                question: 'What is the median number of customers?',
                answerOptions: [
                  {
                    text: '115',
                    isCorrect: true,
                    rationale:
                      'Order the numbers: 98, 102, 115, 115, 120, 130. The median is the average of the two middle numbers (115 and 115), which is 115.',
                  },
                  {
                    text: '113.3',
                    isCorrect: false,
                    rationale: 'This is the mean.',
                  },
                  {
                    text: '98',
                    isCorrect: false,
                    rationale: 'This is the minimum.',
                  },
                  {
                    text: '32',
                    isCorrect: false,
                    rationale: 'This is the range.',
                  },
                ],
              },
              {
                questionNumber: 16,
                calculator: true,
                type: 'chart',
                passage:
                  "<div class='passage-text'><b>Final Exam Scores: 75, 80, 80, 85, 90, 95, 100</b></div>",
                question: 'What is the mode of the final exam scores?',
                answerOptions: [
                  {
                    text: '80',
                    isCorrect: true,
                    rationale:
                      'The mode is the number that appears most frequently in a data set. The score 80 appears twice.',
                  },
                  {
                    text: '85',
                    isCorrect: false,
                    rationale: '85 is the median of the scores.',
                  },
                  {
                    text: '86.4',
                    isCorrect: false,
                    rationale: 'This is the approximate mean of the scores.',
                  },
                  {
                    text: '25',
                    isCorrect: false,
                    rationale: '25 is the range of the scores (100 - 75).',
                  },
                ],
              },
              {
                questionNumber: 17,
                calculator: true,
                question:
                  'A bag contains 3 red marbles, 7 blue marbles, and 5 green marbles. What is the probability of NOT drawing a blue marble?',
                answerOptions: [
                  {
                    text: '$\\frac{7}{15}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of drawing a blue marble.',
                  },
                  {
                    text: '$\\frac{8}{15}$',
                    isCorrect: true,
                    rationale:
                      'There are 15 total marbles (3+7+5). The number of non-blue marbles is 3 (red) + 5 (green) = 8. So the probability is 8/15.',
                  },
                  {
                    text: '$\\frac{1}{3}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of drawing a green marble (5/15).',
                  },
                  {
                    text: '$\\frac{1}{5}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of drawing a red marble (3/15).',
                  },
                ],
              },
              {
                questionNumber: 15,
                calculator: true,
                type: 'graph',
                passage:
                  "<div class='passage-text'>A line passes through the points (0, 2) and (3, 8).</div>",
                question: 'What is the slope of the line?',
                answerOptions: [
                  {
                    text: '2',
                    isCorrect: true,
                    rationale:
                      'The slope is the change in y divided by the change in x: $(8 - 2) / (3 - 0) = 6 / 3 = 2$.',
                  },
                  {
                    text: '3',
                    isCorrect: false,
                    rationale: 'This is the change in x.',
                  },
                  {
                    text: '6',
                    isCorrect: false,
                    rationale: 'This is the change in y.',
                  },
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: false,
                    rationale: 'This is the reciprocal of the correct slope.',
                  },
                ],
              },
              {
                questionNumber: 16,
                calculator: true,
                question:
                  'What is the y-intercept of the equation $y = 3x - 4$?',
                answerOptions: [
                  {
                    text: '3',
                    isCorrect: false,
                    rationale: '3 is the slope of the line.',
                  },
                  {
                    text: '-4',
                    isCorrect: true,
                    rationale:
                      "In the slope-intercept form $y = mx + b$, 'b' is the y-intercept. In this case, it's -4.",
                  },
                  {
                    text: '4',
                    isCorrect: false,
                    rationale: 'The y-intercept is negative.',
                  },
                  {
                    text: '$\\frac{4}{3}$',
                    isCorrect: false,
                    rationale: 'This is the x-intercept.',
                  },
                ],
              },
              {
                questionNumber: 17,
                calculator: false,
                question:
                  'If $f(x) = 2x^2 + 5x - 3$, what is the value of $f(-2)$?',
                answerOptions: [
                  {
                    text: '-5',
                    isCorrect: true,
                    rationale:
                      'Substitute -2 for x: $f(-2) = 2(-2)^2 + 5(-2) - 3 = 2(4) - 10 - 3 = 8 - 10 - 3 = -5$.',
                  },
                  {
                    text: '1',
                    isCorrect: false,
                    rationale: 'Incorrect calculation. $2(4) - 10 - 3 = -5$.',
                  },
                  {
                    text: '21',
                    isCorrect: false,
                    rationale:
                      'Incorrectly handled the negative signs. $5(-2)$ is -10.',
                  },
                  {
                    text: '-15',
                    isCorrect: false,
                    rationale:
                      'Incorrect calculation of the exponent. $(-2)^2$ is 4, not -4.',
                  },
                ],
              },
              {
                questionNumber: 15,
                challenge_tags: ['math-5'],
                calculator: true,
                question:
                  'A rectangle is 8 inches long and 5 inches wide. What is its area?',
                answerOptions: [
                  {
                    text: '40 sq in',
                    isCorrect: true,
                    rationale:
                      'The area of a rectangle is length times width. $8 \\times 5 = 40$.',
                  },
                  {
                    text: '26 in',
                    isCorrect: false,
                    rationale: 'This is the perimeter of the rectangle.',
                  },
                  {
                    text: '13 in',
                    isCorrect: false,
                    rationale: 'This is the sum of the length and width.',
                  },
                  {
                    text: '64 sq in',
                    isCorrect: false,
                    rationale:
                      'This would be the area if it were a square with side 8.',
                  },
                ],
              },
              {
                questionNumber: 16,
                calculator: true,
                question:
                  'What is the circumference of a circle with a radius of 5 cm? (Use $\\pi \\approx 3.14$)',
                answerOptions: [
                  {
                    text: '15.7 cm',
                    isCorrect: false,
                    rationale: 'This is the semi-circumference ($\\pi r$).',
                  },
                  {
                    text: '31.4 cm',
                    isCorrect: true,
                    rationale:
                      'The formula for circumference is $C = 2\\pi r$. So, $C = 2 \\times 3.14 \\times 5 = 31.4$ cm.',
                  },
                  {
                    text: '78.5 sq cm',
                    isCorrect: false,
                    rationale: 'This is the area of the circle ($\\pi r^2$).',
                  },
                  {
                    text: '10 cm',
                    isCorrect: false,
                    rationale: 'This is the diameter of the circle.',
                  },
                ],
              },
              {
                questionNumber: 17,
                calculator: false,
                question:
                  'Two angles in a triangle measure 40 degrees and 60 degrees. What is the measure of the third angle?',
                answerOptions: [
                  {
                    text: '80 degrees',
                    isCorrect: true,
                    rationale:
                      'The sum of angles in a triangle is always 180 degrees. $180 - (40 + 60) = 180 - 100 = 80$ degrees.',
                  },
                  {
                    text: '100 degrees',
                    isCorrect: false,
                    rationale: 'This is the sum of the two given angles.',
                  },
                  {
                    text: '90 degrees',
                    isCorrect: false,
                    rationale:
                      'This would only be true for a right-angled triangle where the other two angles sum to 90.',
                  },
                  {
                    text: 'Cannot be determined',
                    isCorrect: false,
                    rationale:
                      'The third angle can be determined with the given information.',
                  },
                ],
              },
              {
                questionNumber: 18,
                calculator: true,
                question:
                  'What is the volume of a cube with a side length of 4 inches?',
                answerOptions: [
                  {
                    text: '12 cubic in',
                    isCorrect: false,
                    rationale: 'This is the sum of the side lengths (4+4+4).',
                  },
                  {
                    text: '16 sq in',
                    isCorrect: false,
                    rationale: 'This is the area of one face of the cube.',
                  },
                  {
                    text: '64 cubic in',
                    isCorrect: true,
                    rationale:
                      'The volume of a cube is the side length cubed. $V = s^3 = 4^3 = 64$ cubic inches.',
                  },
                  {
                    text: '96 sq in',
                    isCorrect: false,
                    rationale:
                      'This is the surface area of the cube ($6 \\times s^2$).',
                  },
                ],
              },
            ],
          },
        ],
      },
      'Algebraic Problem Solving': {
        description: 'Master expressions, equations, graphing, and functions.',
        icon: 'VariableIcon', // New Icon
        topics: [
          {
            id: 'math_alg_expressions',
            title: 'Expressions & Polynomials',
            description: 'Working with variables, exponents, and polynomials.',
            type: 'quiz',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['math-4'],
                calculator: false,
                question: 'Simplify the expression: $3x + 2y - x + 5y$',
                answerOptions: [
                  {
                    text: '$2x + 7y$',
                    isCorrect: true,
                    rationale:
                      'Combine like terms: $(3x - x) + (2y + 5y) = 2x + 7y$.',
                  },
                  {
                    text: '$4x + 7y$',
                    isCorrect: false,
                    rationale: 'Incorrectly added $3x$ and $x$.',
                  },
                  {
                    text: '$2x + 3y$',
                    isCorrect: false,
                    rationale: 'Incorrectly subtracted $2y$ from $5y$.',
                  },
                  {
                    text: '$9xy$',
                    isCorrect: false,
                    rationale: 'You cannot combine $x$ and $y$ terms.',
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['math-4'],
                calculator: false,
                question:
                  'If $x = 4$, what is the value of the expression $5x - 3$?',
                answerOptions: [
                  {
                    text: '17',
                    isCorrect: true,
                    rationale:
                      'Substitute $x$ with 4: $5(4) - 3 = 20 - 3 = 17$.',
                  },
                  {
                    text: '23',
                    isCorrect: false,
                    rationale: 'This would be the result if you added 3.',
                  },
                  {
                    text: '2',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '12',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['math-4'],
                calculator: false,
                question: 'What is the result of $(2x + 3) + (x - 1)$?',
                answerOptions: [
                  {
                    text: '$3x + 2$',
                    isCorrect: true,
                    rationale:
                      'Combine like terms: $(2x + x) + (3 - 1) = 3x + 2$.',
                  },
                  {
                    text: '$2x + 2$',
                    isCorrect: false,
                    rationale: 'Forgot to add the $x$ terms correctly.',
                  },
                  {
                    text: '$3x + 4$',
                    isCorrect: false,
                    rationale: 'Incorrectly added 3 and 1.',
                  },
                  {
                    text: '$2x^2 - 2$',
                    isCorrect: false,
                    rationale:
                      'This is incorrect; this is addition, not multiplication.',
                  },
                ],
              },
              {
                questionNumber: 4,
                calculator: false,
                question: 'Which of the following is equivalent to $3(x + 5)$?',
                answerOptions: [
                  {
                    text: '$3x + 5$',
                    isCorrect: false,
                    rationale:
                      'You must distribute the 3 to both terms inside the parentheses.',
                  },
                  {
                    text: '$3x + 15$',
                    isCorrect: true,
                    rationale:
                      'Using the distributive property, $3 \\times x + 3 \\times 5 = 3x + 15$.',
                  },
                  {
                    text: '$x + 15$',
                    isCorrect: false,
                    rationale: 'Forgot to multiply the $x$ by 3.',
                  },
                  {
                    text: '$8x$',
                    isCorrect: false,
                    rationale: 'This is an incorrect simplification.',
                  },
                ],
              },
              {
                questionNumber: 5,
                calculator: false,
                question: 'Simplify: $(x^2 + 4x + 5) - (x^2 - 2x - 1)$',
                answerOptions: [
                  {
                    text: '$2x^2 + 2x + 4$',
                    isCorrect: false,
                    rationale: 'Incorrectly added the $x^2$ terms.',
                  },
                  {
                    text: '$6x + 6$',
                    isCorrect: true,
                    rationale:
                      'Distribute the negative: $x^2 + 4x + 5 - x^2 + 2x + 1$. Combine like terms: $(x^2-x^2) + (4x+2x) + (5+1) = 6x + 6$.',
                  },
                  {
                    text: '$2x + 4$',
                    isCorrect: false,
                    rationale: 'Incorrectly subtracted $2x$ from $4x$.',
                  },
                  {
                    text: '$6x + 4$',
                    isCorrect: false,
                    rationale: 'Incorrectly subtracted 1 from 5.',
                  },
                ],
              },
              {
                questionNumber: 6,
                calculator: true,
                question:
                  'Evaluate the expression $2a + 3b$ if $a = 5$ and $b = -2$.',
                answerOptions: [
                  {
                    text: '16',
                    isCorrect: false,
                    rationale: 'This would be the result if $b$ were 2.',
                  },
                  {
                    text: '4',
                    isCorrect: true,
                    rationale: '$2(5) + 3(-2) = 10 - 6 = 4$.',
                  },
                  {
                    text: '10',
                    isCorrect: false,
                    rationale: 'This is just the first part of the expression.',
                  },
                  {
                    text: '1',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 7,
                calculator: true,
                question: 'What is the product of $(x + 2)(x + 3)$?',
                answerOptions: [
                  {
                    text: '$x^2 + 5x + 6$',
                    isCorrect: true,
                    rationale:
                      'Use the FOIL method: $(x \\cdot x) + (x \\cdot 3) + (2 \\cdot x) + (2 \\cdot 3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6$.',
                  },
                  {
                    text: '$x^2 + 6$',
                    isCorrect: false,
                    rationale: "Forgot the middle term (the 'OI' in FOIL).",
                  },
                  {
                    text: '$x^2 + 6x + 5$',
                    isCorrect: false,
                    rationale: 'Incorrectly added the constants.',
                  },
                  {
                    text: '$2x + 5$',
                    isCorrect: false,
                    rationale: 'This is addition, not multiplication.',
                  },
                ],
              },
              {
                questionNumber: 8,
                calculator: true,
                question: 'The expression $x^2 - 9$ is an example of:',
                answerOptions: [
                  {
                    text: 'A perfect square trinomial',
                    isCorrect: false,
                    rationale: 'A trinomial has three terms.',
                  },
                  {
                    text: 'The difference of squares',
                    isCorrect: true,
                    rationale:
                      'This is in the form $a^2 - b^2$, where $a=x$ and $b=3$. It factors to $(x-3)(x+3)$.',
                  },
                  {
                    text: 'A monomial',
                    isCorrect: false,
                    rationale: 'A monomial has one term.',
                  },
                  {
                    text: 'A cubic expression',
                    isCorrect: false,
                    rationale: 'A cubic expression has a degree of 3.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: true,
                question: 'Factor the expression: $x^2 + 7x + 12$',
                answerOptions: [
                  {
                    text: '$(x + 6)(x + 2)$',
                    isCorrect: false,
                    rationale: '$6 \\times 2 = 12$, but $6 + 2 = 8$, not 7.',
                  },
                  {
                    text: '$(x + 3)(x + 4)$',
                    isCorrect: true,
                    rationale:
                      'You need two numbers that multiply to 12 and add to 7. These numbers are 3 and 4.',
                  },
                  {
                    text: '$(x + 12)(x + 1)$',
                    isCorrect: false,
                    rationale: '$12 \\times 1 = 12$, but $12 + 1 = 13$, not 7.',
                  },
                  {
                    text: '$(x - 3)(x - 4)$',
                    isCorrect: false,
                    rationale: 'This would result in $-7x$, not $+7x$.',
                  },
                ],
              },
              {
                questionNumber: 10,
                calculator: true,
                question: 'Simplify: $5(x - 2y) - 3(x + y)$',
                answerOptions: [
                  {
                    text: '$2x - 13y$',
                    isCorrect: true,
                    rationale:
                      'Distribute: $5x - 10y - 3x - 3y$. Combine like terms: $(5x - 3x) + (-10y - 3y) = 2x - 13y$.',
                  },
                  {
                    text: '$2x - 7y$',
                    isCorrect: false,
                    rationale: 'Incorrectly added $-10y$ and $3y$.',
                  },
                  {
                    text: '$8x - 13y$',
                    isCorrect: false,
                    rationale: 'Incorrectly added $5x$ and $3x$.',
                  },
                  {
                    text: '$2x + 13y$',
                    isCorrect: false,
                    rationale: 'Incorrectly handled the signs.',
                  },
                ],
              },
              {
                questionNumber: 11,
                calculator: true,
                question:
                  'What is the degree of the polynomial $4x^3 - 2x^5 + 7x - 1$?',
                answerOptions: [
                  {
                    text: '3',
                    isCorrect: false,
                    rationale: 'This is the degree of the first term.',
                  },
                  {
                    text: '5',
                    isCorrect: true,
                    rationale:
                      'The degree of a polynomial is the highest exponent of its terms, which is 5.',
                  },
                  {
                    text: '4',
                    isCorrect: false,
                    rationale: 'This is the number of terms.',
                  },
                  {
                    text: '1',
                    isCorrect: false,
                    rationale: 'This is the degree of the third term.',
                  },
                ],
              },
              {
                questionNumber: 12,
                calculator: true,
                question: 'If $y = -3$, what is the value of $y^2 + 2y - 1$?',
                answerOptions: [
                  {
                    text: '-16',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '2',
                    isCorrect: true,
                    rationale: '$(-3)^2 + 2(-3) - 1 = 9 - 6 - 1 = 2$.',
                  },
                  {
                    text: '4',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '-4',
                    isCorrect: false,
                    rationale: 'Incorrectly calculated $(-3)^2$ as -9.',
                  },
                ],
              },
              {
                questionNumber: 13,
                calculator: true,
                question:
                  "Which expression represents '5 less than twice a number n'?",
                answerOptions: [
                  {
                    text: '$5 - 2n$',
                    isCorrect: false,
                    rationale: "This is '5 minus twice a number'.",
                  },
                  {
                    text: '$2n - 5$',
                    isCorrect: true,
                    rationale:
                      "'Twice a number n' is $2n$, and '5 less than' means you subtract 5 from that.",
                  },
                  {
                    text: '$2(n - 5)$',
                    isCorrect: false,
                    rationale:
                      "This is 'twice the difference of a number and 5'.",
                  },
                  {
                    text: '$n - 5$',
                    isCorrect: false,
                    rationale: "This is '5 less than a number'.",
                  },
                ],
              },
              {
                questionNumber: 14,
                calculator: true,
                question: 'Expand the expression: $(2x - 1)^2$',
                answerOptions: [
                  {
                    text: '$4x^2 - 1$',
                    isCorrect: false,
                    rationale:
                      'Incorrectly squared each term. You must use FOIL: $(2x-1)(2x-1)$.',
                  },
                  {
                    text: '$4x^2 + 1$',
                    isCorrect: false,
                    rationale: 'Incorrectly squared each term.',
                  },
                  {
                    text: '$4x^2 - 4x + 1$',
                    isCorrect: true,
                    rationale:
                      '$(2x - 1)(2x - 1) = 4x^2 - 2x - 2x + 1 = 4x^2 - 4x + 1$.',
                  },
                  {
                    text: '$2x^2 - 4x + 1$',
                    isCorrect: false,
                    rationale: 'Incorrectly squared $2x$.',
                  },
                ],
              },
              {
                questionNumber: 15,
                calculator: true,
                question: 'Simplify the expression: $(8x^6) / (2x^3)$',
                answerOptions: [
                  {
                    text: '$4x^2$',
                    isCorrect: false,
                    rationale:
                      'When dividing powers with the same base, you subtract the exponents.',
                  },
                  {
                    text: '$6x^3$',
                    isCorrect: false,
                    rationale: 'Incorrectly subtracted the coefficients.',
                  },
                  {
                    text: '$4x^3$',
                    isCorrect: true,
                    rationale:
                      'Divide the coefficients ($8/2 = 4$) and subtract the exponents ($6-3 = 3$).',
                  },
                  {
                    text: '$4x^9$',
                    isCorrect: false,
                    rationale: 'Incorrectly added the exponents.',
                  },
                ],
              },
            ],
          },
          {
            id: 'math_alg_equations_inequalities',
            title: 'Equations & Inequalities',
            description:
              'Solving linear and quadratic equations and inequalities.',
            type: 'quiz',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['math-2', 'math-3'],
                calculator: false,
                question: 'Solve for x: $3x + 7 = 19$',
                answerOptions: [
                  {
                    text: '$x = 4$',
                    isCorrect: true,
                    rationale:
                      'Subtract 7 from both sides: $3x = 12$. Divide by 3: $x = 4$.',
                  },
                  {
                    text: '$x = 8.7$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x = 3$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x = 12$',
                    isCorrect: false,
                    rationale: 'This is the value of $3x$, not $x$.',
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['math-2', 'math-3'],
                calculator: false,
                question:
                  'What is the solution to the inequality $2x - 5 > 11$?',
                answerOptions: [
                  {
                    text: '$x < 8$',
                    isCorrect: false,
                    rationale: 'The inequality sign should not be reversed.',
                  },
                  {
                    text: '$x > 8$',
                    isCorrect: true,
                    rationale:
                      'Add 5 to both sides: $2x > 16$. Divide by 2: $x > 8$.',
                  },
                  {
                    text: '$x > 3$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x < 3$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['math-2', 'math-3'],
                calculator: false,
                question: 'Solve for y: $5y - 8 = 2y + 7$',
                answerOptions: [
                  {
                    text: '$y = 3$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$y = 5$',
                    isCorrect: true,
                    rationale:
                      'Subtract $2y$ from both sides: $3y - 8 = 7$. Add 8 to both sides: $3y = 15$. Divide by 3: $y = 5$.',
                  },
                  {
                    text: '$y = -1/3$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$y = 15$',
                    isCorrect: false,
                    rationale: 'This is the value of $3y$, not $y$.',
                  },
                ],
              },
              {
                questionNumber: 4,
                calculator: false,
                question:
                  'Which of the following is a solution to the equation $x^2 - 5x + 6 = 0$?',
                answerOptions: [
                  {
                    text: '$x = 1$',
                    isCorrect: false,
                    rationale: '$1^2 - 5(1) + 6 = 1 - 5 + 6 = 2$, not 0.',
                  },
                  {
                    text: '$x = 2$',
                    isCorrect: true,
                    rationale:
                      'The equation factors to $(x-2)(x-3) = 0$. The solutions are $x=2$ and $x=3$.',
                  },
                  {
                    text: '$x = 5$',
                    isCorrect: false,
                    rationale: '$5^2 - 5(5) + 6 = 25 - 25 + 6 = 6$, not 0.',
                  },
                  {
                    text: '$x = 6$',
                    isCorrect: false,
                    rationale: '$6^2 - 5(6) + 6 = 36 - 30 + 6 = 12$, not 0.',
                  },
                ],
              },
              {
                questionNumber: 5,
                calculator: false,
                question: 'Solve for x: $x/4 + 2 = 5$',
                answerOptions: [
                  {
                    text: '$x = 12$',
                    isCorrect: true,
                    rationale:
                      'Subtract 2 from both sides: $x/4 = 3$. Multiply by 4: $x = 12$.',
                  },
                  {
                    text: '$x = 28$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x = 3$',
                    isCorrect: false,
                    rationale: 'This is the value of $x/4$, not $x$.',
                  },
                  {
                    text: '$x = 7$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 6,
                calculator: true,
                question: 'Solve the inequality: $-3x + 4 \\le 16$',
                answerOptions: [
                  {
                    text: '$x \\le -4$',
                    isCorrect: false,
                    rationale:
                      'When dividing by a negative number, you must flip the inequality sign.',
                  },
                  {
                    text: '$x \\ge -4$',
                    isCorrect: true,
                    rationale:
                      'Subtract 4: $-3x \\le 12$. Divide by -3 and flip the sign: $x \\ge -4$.',
                  },
                  {
                    text: '$x \\ge 4$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x \\le 4$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 7,
                calculator: true,
                question:
                  'The sum of two consecutive integers is 35. What are the integers?',
                answerOptions: [
                  {
                    text: '15 and 20',
                    isCorrect: false,
                    rationale: 'These are not consecutive.',
                  },
                  {
                    text: '17 and 18',
                    isCorrect: true,
                    rationale:
                      'Let the integers be $x$ and $x+1$. So, $x + (x+1) = 35$. $2x + 1 = 35$. $2x = 34$. $x = 17$. The integers are 17 and 18.',
                  },
                  {
                    text: '16 and 19',
                    isCorrect: false,
                    rationale: 'These are not consecutive.',
                  },
                  {
                    text: '10 and 25',
                    isCorrect: false,
                    rationale: 'These are not consecutive.',
                  },
                ],
              },
              {
                questionNumber: 8,
                challenge_tags: ['math-5'],
                calculator: true,
                question:
                  'Solve for b: $A = \\frac{1}{2}bh$ (the formula for the area of a triangle)',
                answerOptions: [
                  {
                    text: '$b = \\frac{2A}{h}$',
                    isCorrect: true,
                    rationale:
                      'Multiply both sides by 2: $2A = bh$. Divide both sides by h: $b = \\frac{2A}{h}$.',
                  },
                  {
                    text: '$b = \\frac{A}{2h}$',
                    isCorrect: false,
                    rationale: 'Forgot to multiply by 2.',
                  },
                  {
                    text: '$b = \\frac{Ah}{2}$',
                    isCorrect: false,
                    rationale: 'Incorrectly rearranged the formula.',
                  },
                  {
                    text: '$b = \\frac{2h}{A}$',
                    isCorrect: false,
                    rationale: 'Incorrectly rearranged the formula.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: true,
                question:
                  'What are the solutions to the quadratic equation $x^2 - 16 = 0$?',
                answerOptions: [
                  {
                    text: '$x = 4$',
                    isCorrect: false,
                    rationale: 'This is only one of the solutions.',
                  },
                  {
                    text: '$x = 4$ and $x = -4$',
                    isCorrect: true,
                    rationale:
                      'Add 16 to both sides: $x^2 = 16$. Take the square root of both sides: $x = \\pm 4$.',
                  },
                  {
                    text: '$x = 8$ and $x = -8$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x = 16$',
                    isCorrect: false,
                    rationale: 'This is the value of $x^2$.',
                  },
                ],
              },
              {
                questionNumber: 10,
                calculator: true,
                question: 'Solve for x: $2(x + 3) = 14$',
                answerOptions: [
                  {
                    text: '$x = 4$',
                    isCorrect: true,
                    rationale:
                      'Distribute the 2: $2x + 6 = 14$. Subtract 6: $2x = 8$. Divide by 2: $x = 4$.',
                  },
                  {
                    text: '$x = 5.5$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x = 11$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x = 8$',
                    isCorrect: false,
                    rationale: 'This is the value of $2x$.',
                  },
                ],
              },
              {
                questionNumber: 11,
                calculator: true,
                question:
                  'A number is doubled and then 5 is subtracted from it. The result is 15. What is the number?',
                answerOptions: [
                  {
                    text: '5',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '10',
                    isCorrect: true,
                    rationale:
                      'Let the number be $x$. The equation is $2x - 5 = 15$. Add 5 to both sides: $2x = 20$. Divide by 2: $x = 10$.',
                  },
                  {
                    text: '12.5',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '20',
                    isCorrect: false,
                    rationale: 'This is the value of $2x$.',
                  },
                ],
              },
              {
                questionNumber: 12,
                calculator: true,
                question:
                  "Which inequality represents the statement 'x is at least 18'?",
                answerOptions: [
                  {
                    text: '$x < 18$',
                    isCorrect: false,
                    rationale: "This means 'x is less than 18'.",
                  },
                  {
                    text: '$x > 18$',
                    isCorrect: false,
                    rationale: "This means 'x is greater than 18'.",
                  },
                  {
                    text: '$x \\le 18$',
                    isCorrect: false,
                    rationale: "This means 'x is at most 18'.",
                  },
                  {
                    text: '$x \\ge 18$',
                    isCorrect: true,
                    rationale:
                      "'At least 18' means 18 or more, which is represented by the greater than or equal to symbol.",
                  },
                ],
              },
              {
                questionNumber: 13,
                challenge_tags: ['math-2'],
                calculator: true,
                question:
                  'Solve the system of equations: $x + y = 10$ and $x - y = 4$',
                answerOptions: [
                  {
                    text: '$x = 7, y = 3$',
                    isCorrect: true,
                    rationale:
                      'Add the two equations together: $(x+y) + (x-y) = 10+4$, which simplifies to $2x = 14$, so $x=7$. Substitute $x=7$ into the first equation: $7 + y = 10$, so $y=3$.',
                  },
                  {
                    text: '$x = 6, y = 4$',
                    isCorrect: false,
                    rationale: 'This does not satisfy the second equation.',
                  },
                  {
                    text: '$x = 8, y = 2$',
                    isCorrect: false,
                    rationale: 'This does not satisfy the second equation.',
                  },
                  {
                    text: '$x = 5, y = 5$',
                    isCorrect: false,
                    rationale: 'This does not satisfy the second equation.',
                  },
                ],
              },
              {
                questionNumber: 14,
                calculator: true,
                question: 'Solve for x: $3(x - 4) = 2(x + 1)$',
                answerOptions: [
                  {
                    text: '$x = 10$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x = 14$',
                    isCorrect: true,
                    rationale:
                      'Distribute: $3x - 12 = 2x + 2$. Subtract $2x$ from both sides: $x - 12 = 2$. Add 12 to both sides: $x = 14$.',
                  },
                  {
                    text: '$x = -13$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x = 5$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 15,
                challenge_tags: ['math-5'],
                calculator: true,
                question:
                  'The length of a rectangle is 5 more than its width. If the perimeter is 50, what is the width?',
                answerOptions: [
                  {
                    text: '10',
                    isCorrect: true,
                    rationale:
                      'Let $w$ be the width and $l$ be the length. $l = w + 5$. Perimeter $P = 2l + 2w$. Substitute: $50 = 2(w+5) + 2w$. $50 = 2w + 10 + 2w$. $50 = 4w + 10$. $40 = 4w$. $w = 10$.',
                  },
                  {
                    text: '15',
                    isCorrect: false,
                    rationale: '15 is the length, not the width.',
                  },
                  {
                    text: '20',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '25',
                    isCorrect: false,
                    rationale: 'This is half the perimeter.',
                  },
                ],
              },
            ],
          },
          {
            id: 'math_alg_graphing_functions',
            title: 'Graphing & Functions',
            description:
              'Understanding slope, graphing lines, and function notation.',
            type: 'quiz',
            questions: [
              {
                questionNumber: 1,
                calculator: false,
                type: 'image',
                imageUrl: 'Images/math_graph_1.png',
                question: 'What is the slope of the line shown in the graph?',
                answerOptions: [
                  {
                    text: '2',
                    isCorrect: true,
                    rationale:
                      'The line passes through $(0,-1)$ and $(2,3)$. The slope is $(y_2 - y_1) / (x_2 - x_1) = (3 - (-1)) / (2 - 0) = 4 / 2 = 2$.',
                  },
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: false,
                    rationale: 'This is run/rise, not rise/run.',
                  },
                  {
                    text: '-2',
                    isCorrect: false,
                    rationale: 'The line is rising, so the slope is positive.',
                  },
                  {
                    text: '1',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 2,
                calculator: false,
                type: 'image',
                imageUrl: 'Images/math_graph_1.png',
                question:
                  'What is the y-intercept of the line shown in the graph?',
                answerOptions: [
                  {
                    text: '$(2, 0)$',
                    isCorrect: false,
                    rationale: 'This is the x-intercept.',
                  },
                  {
                    text: '$(0, -1)$',
                    isCorrect: true,
                    rationale:
                      'The y-intercept is the point where the line crosses the y-axis, which is at $(0, -1)$.',
                  },
                  {
                    text: '$(0, 2)$',
                    isCorrect: false,
                    rationale: 'This is an incorrect point.',
                  },
                  {
                    text: '$(-1, 0)$',
                    isCorrect: false,
                    rationale: 'This is an incorrect point.',
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['math-2'],
                calculator: false,
                question:
                  'Which of the following equations is written in slope-intercept form ($y = mx + b$)?',
                answerOptions: [
                  {
                    text: '$y = 3x - 2$',
                    isCorrect: true,
                    rationale:
                      'This equation is in the form $y = mx + b$, where $m$ is the slope and $b$ is the y-intercept.',
                  },
                  {
                    text: '$2x + 3y = 6$',
                    isCorrect: false,
                    rationale:
                      'This is the standard form of a linear equation.',
                  },
                  {
                    text: '$y - 4 = 2(x - 1)$',
                    isCorrect: false,
                    rationale: 'This is the point-slope form.',
                  },
                  {
                    text: '$x = 5$',
                    isCorrect: false,
                    rationale: 'This is the equation of a vertical line.',
                  },
                ],
              },
              {
                questionNumber: 4,
                calculator: false,
                question: 'If $f(x) = 3x + 5$, what is $f(4)$?',
                answerOptions: [
                  {
                    text: '12',
                    isCorrect: false,
                    rationale: 'This is just $3 \\times 4$.',
                  },
                  {
                    text: '17',
                    isCorrect: true,
                    rationale:
                      'Substitute $x$ with 4: $f(4) = 3(4) + 5 = 12 + 5 = 17$.',
                  },
                  {
                    text: '23',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '8',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 5,
                calculator: false,
                question:
                  'What is the slope of the line with the equation $y = -2x + 7$?',
                answerOptions: [
                  {
                    text: '7',
                    isCorrect: false,
                    rationale: '7 is the y-intercept.',
                  },
                  {
                    text: '-2',
                    isCorrect: true,
                    rationale:
                      'In the form $y = mx + b$, $m$ represents the slope. Here, $m = -2$.',
                  },
                  {
                    text: '2',
                    isCorrect: false,
                    rationale: 'The slope is negative.',
                  },
                  {
                    text: '-7',
                    isCorrect: false,
                    rationale: 'This is an incorrect value.',
                  },
                ],
              },
              {
                questionNumber: 6,
                calculator: true,
                question:
                  'Find the slope of the line that passes through the points $(2, 3)$ and $(5, 9)$.',
                answerOptions: [
                  {
                    text: '2',
                    isCorrect: true,
                    rationale:
                      'The slope formula is $(y_2 - y_1) / (x_2 - x_1)$. $(9 - 3) / (5 - 2) = 6 / 3 = 2$.',
                  },
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: false,
                    rationale: 'This is the reciprocal of the correct slope.',
                  },
                  {
                    text: '3',
                    isCorrect: false,
                    rationale: 'This is the change in x.',
                  },
                  {
                    text: '6',
                    isCorrect: false,
                    rationale: 'This is the change in y.',
                  },
                ],
              },
              {
                questionNumber: 7,
                calculator: true,
                type: 'image',
                imageUrl: 'Images/math_graph_2.png',
                question: 'Which point is located in Quadrant IV?',
                answerOptions: [
                  {
                    text: 'Point A',
                    isCorrect: false,
                    rationale:
                      'Point A is in Quadrant II (x is negative, y is positive).',
                  },
                  {
                    text: 'Point B',
                    isCorrect: true,
                    rationale:
                      'Point B is in Quadrant IV (x is positive, y is negative).',
                  },
                  {
                    text: 'Point C',
                    isCorrect: false,
                    rationale:
                      'Point C is in Quadrant III (x is negative, y is negative).',
                  },
                  {
                    text: 'Point D',
                    isCorrect: false,
                    rationale:
                      'Point D is in Quadrant I (x is positive, y is positive).',
                  },
                ],
              },
              {
                questionNumber: 8,
                calculator: true,
                question:
                  'If a line has a slope of 3 and passes through the point $(1, 2)$, what is its equation in point-slope form?',
                answerOptions: [
                  {
                    text: '$y - 2 = 3(x - 1)$',
                    isCorrect: true,
                    rationale:
                      'Point-slope form is $y - y_1 = m(x - x_1)$. Substituting the values gives $y - 2 = 3(x - 1)$.',
                  },
                  {
                    text: '$y - 1 = 3(x - 2)$',
                    isCorrect: false,
                    rationale: 'The x and y coordinates are swapped.',
                  },
                  {
                    text: '$y = 3x - 1$',
                    isCorrect: false,
                    rationale:
                      'This is the slope-intercept form, which would be $y-2=3x-3 -> y=3x-1$.',
                  },
                  {
                    text: '$y + 2 = 3(x + 1)$',
                    isCorrect: false,
                    rationale: 'The signs are incorrect.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: true,
                question:
                  'What is the y-intercept of the line with the equation $4x + 2y = 10$?',
                answerOptions: [
                  {
                    text: '10',
                    isCorrect: false,
                    rationale: 'You must first solve for y.',
                  },
                  {
                    text: '5',
                    isCorrect: true,
                    rationale:
                      'First, convert to slope-intercept form. $2y = -4x + 10$. $y = -2x + 5$. The y-intercept (b) is 5.',
                  },
                  {
                    text: '-2',
                    isCorrect: false,
                    rationale: '-2 is the slope.',
                  },
                  {
                    text: '2.5',
                    isCorrect: false,
                    rationale: 'This is the x-intercept.',
                  },
                ],
              },
              {
                questionNumber: 10,
                calculator: true,
                question: 'If $g(x) = x^2 - 10$, what is $g(3)$?',
                answerOptions: [
                  {
                    text: '-1',
                    isCorrect: true,
                    rationale: '$g(3) = (3)^2 - 10 = 9 - 10 = -1$.',
                  },
                  {
                    text: '-4',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '19',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '8',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 11,
                challenge_tags: ['science-1'],
                calculator: true,
                type: 'image',
                imageUrl: 'Images/math_graph_3.png',
                question:
                  'The graph shows the cost of renting a car based on the number of miles driven. What does the y-intercept of the graph represent?',
                answerOptions: [
                  {
                    text: 'The cost per mile.',
                    isCorrect: false,
                    rationale: 'The cost per mile is the slope of the line.',
                  },
                  {
                    text: 'The flat fee or initial cost of the rental.',
                    isCorrect: true,
                    rationale:
                      'The y-intercept represents the cost when the miles driven (x) is zero, which is the base rental fee.',
                  },
                  {
                    text: 'The total cost of the rental.',
                    isCorrect: false,
                    rationale: 'The total cost depends on the miles driven.',
                  },
                  {
                    text: 'The maximum number of miles you can drive.',
                    isCorrect: false,
                    rationale: 'The graph does not show a maximum.',
                  },
                ],
              },
              {
                questionNumber: 12,
                calculator: true,
                question:
                  'Which of the following lines is parallel to the line $y = 4x - 1$?',
                answerOptions: [
                  {
                    text: '$y = -4x + 2$',
                    isCorrect: false,
                    rationale: 'This line has a different slope.',
                  },
                  {
                    text: '$y = 4x + 5$',
                    isCorrect: true,
                    rationale:
                      'Parallel lines have the same slope. Both lines have a slope of 4.',
                  },
                  {
                    text: '$y = (1/4)x + 3$',
                    isCorrect: false,
                    rationale: 'This slope is the reciprocal, not the same.',
                  },
                  {
                    text: '$y = - (1/4)x - 1$',
                    isCorrect: false,
                    rationale: 'This is the slope of a perpendicular line.',
                  },
                ],
              },
              {
                questionNumber: 13,
                calculator: true,
                question:
                  "The function $C(t) = 20t + 50$ represents the cost of a plumber's visit, where $t$ is the number of hours. What is the cost of a 3-hour visit?",
                answerOptions: [
                  {
                    text: '$70',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$110',
                    isCorrect: true,
                    rationale: '$C(3) = 20(3) + 50 = 60 + 50 = \\$110$.',
                  },
                  {
                    text: '$60',
                    isCorrect: false,
                    rationale: 'This is just the hourly charge for 3 hours.',
                  },
                  {
                    text: '$50',
                    isCorrect: false,
                    rationale: 'This is the flat fee.',
                  },
                ],
              },
              {
                questionNumber: 14,
                calculator: true,
                question: 'What is the x-intercept of the line $3x + 6y = 18$?',
                answerOptions: [
                  {
                    text: '3',
                    isCorrect: false,
                    rationale: '3 is the y-intercept.',
                  },
                  {
                    text: '6',
                    isCorrect: true,
                    rationale:
                      'To find the x-intercept, set $y = 0$. $3x + 6(0) = 18$. $3x = 18$. $x = 6$. The point is $(6,0)$.',
                  },
                  {
                    text: '2',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '18',
                    isCorrect: false,
                    rationale: 'This is the constant in the equation.',
                  },
                ],
              },
              {
                questionNumber: 15,
                calculator: true,
                type: 'image',
                imageUrl: 'Images/math_graph_4.png',
                question:
                  'The graph shows a parabola. What are the coordinates of the vertex?',
                answerOptions: [
                  {
                    text: '$(0, 4)$',
                    isCorrect: false,
                    rationale: 'This is the y-intercept.',
                  },
                  {
                    text: '$(2, 0)$',
                    isCorrect: false,
                    rationale: 'This is one of the x-intercepts.',
                  },
                  {
                    text: '$(3, -2)$',
                    isCorrect: true,
                    rationale:
                      'The vertex is the lowest point of the parabola, which is at $(3, -2)$.',
                  },
                  {
                    text: '$(-2, 3)$',
                    isCorrect: false,
                    rationale: 'This point is not on the graph.',
                  },
                ],
              },
            ],
          },
        ],
      },
      Geometry: {
        description:
          'Calculate area, perimeter, volume, and apply geometric theorems.',
        icon: 'ShapesIcon', // New Icon
        topics: [
          {
            id: 'math_geom_basics',
            title: 'Geometry Basics',
            description:
              'Calculating area, perimeter, volume, and surface area.',
            type: 'quiz',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['math-5'],
                calculator: false,
                type: 'image',
                imageUrl: 'Images/math_geo_1.png',
                question: 'What is the area of the rectangle shown?',
                answerOptions: [
                  {
                    text: '15 sq units',
                    isCorrect: false,
                    rationale: 'This is the perimeter.',
                  },
                  {
                    text: '50 sq units',
                    isCorrect: true,
                    rationale:
                      'Area of a rectangle is length times width. $A = 10 \\times 5 = 50$.',
                  },
                  {
                    text: '25 sq units',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '30 sq units',
                    isCorrect: false,
                    rationale: 'This is the perimeter.',
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['math-5'],
                calculator: false,
                type: 'image',
                imageUrl: 'Images/math_geo_2.png',
                question: 'What is the area of the triangle shown?',
                answerOptions: [
                  {
                    text: '24 sq units',
                    isCorrect: true,
                    rationale:
                      'Area of a triangle is $\\frac{1}{2} \\times base \\times height$. $A = 0.5 \\times 8 \\times 6 = 24$.',
                  },
                  {
                    text: '48 sq units',
                    isCorrect: false,
                    rationale:
                      'This is base times height, without multiplying by $\\frac{1}{2}$.',
                  },
                  {
                    text: '14 sq units',
                    isCorrect: false,
                    rationale: 'This is the sum of the base and height.',
                  },
                  {
                    text: '30 sq units',
                    isCorrect: false,
                    rationale: 'This is the perimeter of a 6-8-10 triangle.',
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['math-5'],
                calculator: false,
                type: 'image',
                imageUrl: 'Images/math_geo_3.png',
                question:
                  'What is the circumference of the circle shown? (Use $\\pi \\approx 3.14$)',
                answerOptions: [
                  {
                    text: '15.7',
                    isCorrect: false,
                    rationale:
                      'This is the circumference if 5 were the diameter.',
                  },
                  {
                    text: '31.4',
                    isCorrect: true,
                    rationale:
                      'Circumference is $2 \\pi r$. $C = 2 \\times 3.14 \\times 5 = 31.4$.',
                  },
                  {
                    text: '78.5',
                    isCorrect: false,
                    rationale: 'This is the area of the circle.',
                  },
                  {
                    text: '25',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 4,
                challenge_tags: ['math-5'],
                calculator: false,
                question:
                  'A box has a length of 6 inches, a width of 4 inches, and a height of 3 inches. What is its volume?',
                answerOptions: [
                  {
                    text: '13 cubic inches',
                    isCorrect: false,
                    rationale: 'This is the sum of the dimensions.',
                  },
                  {
                    text: '72 cubic inches',
                    isCorrect: true,
                    rationale:
                      'Volume of a rectangular prism is length $\\times$ width $\\times$ height. $V = 6 \\times 4 \\times 3 = 72$.',
                  },
                  {
                    text: '24 cubic inches',
                    isCorrect: false,
                    rationale: 'This is just length times width.',
                  },
                  {
                    text: '54 cubic inches',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 5,
                challenge_tags: ['math-5'],
                calculator: false,
                question:
                  'What is the perimeter of a square with a side length of 7 cm?',
                answerOptions: [
                  {
                    text: '14 cm',
                    isCorrect: false,
                    rationale: 'This is twice the side length.',
                  },
                  {
                    text: '28 cm',
                    isCorrect: true,
                    rationale:
                      'Perimeter of a square is $4s$. $P = 4 \\times 7 = 28$.',
                  },
                  {
                    text: '49 cm',
                    isCorrect: false,
                    rationale: 'This is the area of the square ($s^2$).',
                  },
                  {
                    text: '21 cm',
                    isCorrect: false,
                    rationale: 'This is three times the side length.',
                  },
                ],
              },
              {
                questionNumber: 6,
                calculator: true,
                question:
                  'A cylinder has a radius of 3 meters and a height of 10 meters. What is its volume? (Use $\\pi \\approx 3.14$)',
                answerOptions: [
                  {
                    text: '94.2 cubic meters',
                    isCorrect: false,
                    rationale: 'This is the lateral surface area.',
                  },
                  {
                    text: '282.6 cubic meters',
                    isCorrect: true,
                    rationale:
                      'Volume of a cylinder is $\\pi r^2 h$. $V = 3.14 \\times (3^2) \\times 10 = 3.14 \\times 9 \\times 10 = 282.6$.',
                  },
                  {
                    text: '90 cubic meters',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '314 cubic meters',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 7,
                challenge_tags: ['math-5'],
                calculator: true,
                question:
                  'The perimeter of a rectangle is 30 feet. If the width is 5 feet, what is the length?',
                answerOptions: [
                  {
                    text: '10 feet',
                    isCorrect: true,
                    rationale:
                      'Perimeter $P = 2l + 2w$. $30 = 2l + 2(5)$. $30 = 2l + 10$. $20 = 2l$. $l = 10$.',
                  },
                  {
                    text: '12.5 feet',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '15 feet',
                    isCorrect: false,
                    rationale: 'This is half the perimeter.',
                  },
                  {
                    text: '20 feet',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 8,
                challenge_tags: ['math-5'],
                calculator: true,
                question:
                  'What is the area of a circle with a diameter of 10 inches? (Use $\\pi \\approx 3.14$)',
                answerOptions: [
                  {
                    text: '31.4 sq inches',
                    isCorrect: false,
                    rationale: 'This is the circumference.',
                  },
                  {
                    text: '78.5 sq inches',
                    isCorrect: true,
                    rationale:
                      'The diameter is 10, so the radius is 5. Area is $\\pi r^2$. $A = 3.14 \\times 5^2 = 3.14 \\times 25 = 78.5$.',
                  },
                  {
                    text: '100 sq inches',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '314 sq inches',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: true,
                question:
                  'Find the volume of a sphere with a radius of 3 cm. (Use $\\pi \\approx 3.14$ and formula $V = \\frac{4}{3}\\pi r^3$)',
                answerOptions: [
                  {
                    text: '37.68 cubic cm',
                    isCorrect: false,
                    rationale: 'This is the surface area.',
                  },
                  {
                    text: '113.04 cubic cm',
                    isCorrect: true,
                    rationale:
                      '$V = \\frac{4}{3} \\times 3.14 \\times (3^3) = \\frac{4}{3} \\times 3.14 \\times 27 = 4 \\times 3.14 \\times 9 = 113.04$.',
                  },
                  {
                    text: '84.78 cubic cm',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '28.26 cubic cm',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 10,
                calculator: true,
                question:
                  'A right triangle has legs of length 5 and 12. What is the length of the hypotenuse?',
                answerOptions: [
                  {
                    text: '13',
                    isCorrect: true,
                    rationale:
                      'Using the Pythagorean theorem, $a^2 + b^2 = c^2$. $5^2 + 12^2 = 25 + 144 = 169$. The square root of 169 is 13.',
                  },
                  {
                    text: '17',
                    isCorrect: false,
                    rationale: 'This is the sum of the lengths.',
                  },
                  {
                    text: '7',
                    isCorrect: false,
                    rationale: 'This is the difference of the lengths.',
                  },
                  {
                    text: '60',
                    isCorrect: false,
                    rationale: 'This is the product of the lengths.',
                  },
                ],
              },
              {
                questionNumber: 11,
                challenge_tags: ['math-5'],
                calculator: true,
                question:
                  'What is the surface area of a cube with a side length of 4 inches?',
                answerOptions: [
                  {
                    text: '64 sq inches',
                    isCorrect: false,
                    rationale: 'This is the volume of the cube.',
                  },
                  {
                    text: '96 sq inches',
                    isCorrect: true,
                    rationale:
                      'A cube has 6 faces. The area of one face is $4 \\times 4 = 16$. The total surface area is $6 \\times 16 = 96$.',
                  },
                  {
                    text: '16 sq inches',
                    isCorrect: false,
                    rationale: 'This is the area of one face.',
                  },
                  {
                    text: '32 sq inches',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 12,
                challenge_tags: ['math-5'],
                calculator: true,
                question:
                  'A triangle has an area of 30 square meters. If its base is 10 meters, what is its height?',
                answerOptions: [
                  {
                    text: '3 meters',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '6 meters',
                    isCorrect: true,
                    rationale:
                      'Area = $\\frac{1}{2}bh$. $30 = \\frac{1}{2}(10)h$. $30 = 5h$. $h = 6$.',
                  },
                  {
                    text: '15 meters',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '300 meters',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 13,
                calculator: true,
                question:
                  'The circumference of a circle is 18.84 cm. What is its radius? (Use $\\pi \\approx 3.14$)',
                answerOptions: [
                  {
                    text: '3 cm',
                    isCorrect: true,
                    rationale:
                      '$C = 2 \\pi r$. $18.84 = 2 \\times 3.14 \\times r$. $18.84 = 6.28r$. $r = 18.84 / 6.28 = 3$.',
                  },
                  {
                    text: '6 cm',
                    isCorrect: false,
                    rationale: '6 is the diameter.',
                  },
                  {
                    text: '9.42 cm',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '12 cm',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 14,
                challenge_tags: ['math-5'],
                calculator: true,
                question:
                  'A parallelogram has a base of 12 inches and a height of 5 inches. What is its area?',
                answerOptions: [
                  {
                    text: '17 sq inches',
                    isCorrect: false,
                    rationale: 'This is the sum of the base and height.',
                  },
                  {
                    text: '60 sq inches',
                    isCorrect: true,
                    rationale:
                      'Area of a parallelogram is base $\\times$ height. $A = 12 \\times 5 = 60$.',
                  },
                  {
                    text: '30 sq inches',
                    isCorrect: false,
                    rationale: 'This would be the area if it were a triangle.',
                  },
                  {
                    text: '34 sq inches',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 15,
                calculator: true,
                question:
                  'A trapezoid has bases of length 8 and 12, and a height of 6. What is its area?',
                answerOptions: [
                  {
                    text: '60',
                    isCorrect: true,
                    rationale:
                      'Area of a trapezoid is $\\frac{1}{2}h(b_1 + b_2)$. $A = 0.5 \\times 6 \\times (8 + 12) = 3 \\times 20 = 60$.',
                  },
                  {
                    text: '120',
                    isCorrect: false,
                    rationale: 'Forgot to multiply by $\\frac{1}{2}$.',
                  },
                  {
                    text: '26',
                    isCorrect: false,
                    rationale: 'This is the sum of the dimensions.',
                  },
                  {
                    text: '576',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
  'Social Studies': {
    icon: 'GlobeIcon',
    categories: {
      'U.S. History': {
        description:
          'Explore the events, figures, and ideas that shaped the United States, from its origins to the present day.',
        topics: [
          {
            id: 'ss_us_hist_foundations',
            title: 'Foundations (Colonial America)',
            description:
              'Exploration, Colonial Regions, Mercantilism, and the French & Indian War.',
            quizzes: [
              {
                id: 'ss_us_hist_foundations_quiz1',
                title: 'Foundations: Quiz 1',
                questions: [
                  {
                    questionNumber: 1,
                    challenge_tags: ['social-4'],
                    type: 'text',
                    passage:
                      "The period from the early 15th century to the early 17th century is known as the Age of Exploration, driven by the 'Three Gs': God, Gold, and Glory. 'Gold' represented the desire for wealth, such as finding new trade routes for valuable spices and extracting resources like silver and gold from new lands.",
                    question:
                      "Which of the following best exemplifies the motivation of 'Gold' during the Age of Exploration?",
                    answerOptions: [
                      {
                        text: 'Building missions to convert indigenous populations.',
                        isCorrect: false,
                        rationale:
                          "This is an example of the 'God' motivation.",
                      },
                      {
                        text: 'Establishing a direct sea route to India to trade for spices.',
                        isCorrect: true,
                        rationale:
                          "Establishing new trade routes for valuable goods was a primary economic motivation ('Gold').",
                      },
                      {
                        text: "Conquering new lands to expand an empire's prestige.",
                        isCorrect: false,
                        rationale:
                          "This is an example of the 'Glory' motivation.",
                      },
                      {
                        text: 'Creating detailed maps of newly discovered coastlines.',
                        isCorrect: false,
                        rationale:
                          'This was a result of exploration, not the primary motivation.',
                      },
                    ],
                  },
                  {
                    questionNumber: 2,
                    challenge_tags: ['social-4'],
                    type: 'text',
                    passage:
                      "Mercantilism was the dominant economic theory during this period. It held that a nation's wealth and power were best served by increasing exports and collecting precious metals. Colonies were crucial to this system, existing to provide raw materials to the mother country and to serve as a market for its manufactured goods.",
                    question:
                      'Under the theory of mercantilism, what was the primary purpose of colonies?',
                    answerOptions: [
                      {
                        text: 'To become independent, self-sufficient nations.',
                        isCorrect: false,
                        rationale:
                          'This is the opposite of mercantilism, which required colonies to be dependent.',
                      },
                      {
                        text: 'To enrich the mother country by providing resources and buying its goods.',
                        isCorrect: true,
                        rationale:
                          'Colonies existed to serve the economic interests of the mother country.',
                      },
                      {
                        text: 'To establish free trade agreements with indigenous populations.',
                        isCorrect: false,
                        rationale:
                          'Mercantilism is a system of controlled, not free, trade.',
                      },
                      {
                        text: 'To serve as military outposts against rival empires.',
                        isCorrect: false,
                        rationale:
                          'While they could serve this function, their primary purpose was economic.',
                      },
                    ],
                  },
                  {
                    questionNumber: 3,
                    challenge_tags: ['science-4', 'social-5'],
                    type: 'knowledge',
                    question:
                      'Which colonial region was known for its economy based on shipbuilding, fishing, and trade, with small farms due to rocky soil?',
                    answerOptions: [
                      {
                        text: 'The Southern Colonies',
                        isCorrect: false,
                        rationale:
                          "The Southern Colonies' economy was based on large-scale plantation agriculture.",
                      },
                      {
                        text: 'The Middle Colonies',
                        isCorrect: false,
                        rationale:
                          "The Middle Colonies were known as the 'breadbasket' for their grain production.",
                      },
                      {
                        text: 'The New England Colonies',
                        isCorrect: true,
                        rationale:
                          "New England's geography led to an economy centered on maritime activities.",
                      },
                      {
                        text: 'The Western Frontier',
                        isCorrect: false,
                        rationale:
                          'The Western Frontier was largely undeveloped during this period.',
                      },
                    ],
                  },
                  {
                    questionNumber: 4,
                    challenge_tags: ['social-5'],
                    type: 'text',
                    passage:
                      "The Middle Colonies, including New York and Pennsylvania, were characterized by greater religious and ethnic diversity. Fertile soil supported a thriving agricultural economy based on grains like wheat, earning the region the nickname 'the breadbasket colonies.'",
                    question:
                      "The Middle Colonies were known as the 'breadbasket colonies' because of their:",
                    answerOptions: [
                      {
                        text: 'high level of ethnic diversity.',
                        isCorrect: false,
                        rationale:
                          'While diverse, the nickname refers to their agricultural output.',
                      },
                      {
                        text: 'successful production of grain crops.',
                        isCorrect: true,
                        rationale:
                          "The passage directly links the nickname to the region's grain-based economy.",
                      },
                      {
                        text: 'central role in colonial trade.',
                        isCorrect: false,
                        rationale:
                          'While they had important ports, their primary identity was agricultural.',
                      },
                      {
                        text: 'practice of religious toleration.',
                        isCorrect: false,
                        rationale:
                          'This was a social characteristic, not the reason for the nickname.',
                      },
                    ],
                  },
                  {
                    questionNumber: 5,
                    challenge_tags: ['social-5'],
                    type: 'knowledge',
                    question:
                      'The economy of the Southern Colonies, such as Virginia, was heavily dependent on:',
                    answerOptions: [
                      {
                        text: 'large-scale manufacturing.',
                        isCorrect: false,
                        rationale:
                          'Manufacturing was not a significant part of the Southern economy.',
                      },
                      {
                        text: 'cash crop agriculture on large plantations.',
                        isCorrect: true,
                        rationale:
                          'The Southern economy was defined by plantations growing crops like tobacco and rice.',
                      },
                      {
                        text: 'fur trading with Native American tribes.',
                        isCorrect: false,
                        rationale:
                          'Fur trading was more prominent in the northern colonies.',
                      },
                      {
                        text: 'shipbuilding and international trade.',
                        isCorrect: false,
                        rationale:
                          'This was the economic focus of New England.',
                      },
                    ],
                  },
                ],
              },
              {
                id: 'ss_us_hist_foundations_quiz2',
                title: 'Foundations: Quiz 2',
                questions: [
                  {
                    questionNumber: 1,
                    type: 'text',
                    passage:
                      'The French and Indian War (1754-1763) was a conflict between Great Britain and France over territory in North America. The British victory was decisive, and the Treaty of Paris (1763) forced France to cede all of its North American territories east of the Mississippi River to Britain.',
                    question:
                      'What was a major consequence of the French and Indian War?',
                    answerOptions: [
                      {
                        text: 'France expanded its colonial holdings in North America.',
                        isCorrect: false,
                        rationale:
                          'France lost nearly all of its North American territory.',
                      },
                      {
                        text: 'Great Britain gained control of vast new territories in North America.',
                        isCorrect: true,
                        rationale:
                          'France ceded its territories east of the Mississippi to Britain.',
                      },
                      {
                        text: 'The American colonies declared independence from Britain.',
                        isCorrect: false,
                        rationale:
                          "The war's aftermath led to tensions that caused the revolution, but independence was not an immediate consequence.",
                      },
                      {
                        text: 'Spain became the dominant power in North America.',
                        isCorrect: false,
                        rationale:
                          'The war established Great Britain as the dominant power.',
                      },
                    ],
                  },
                  {
                    questionNumber: 2,
                    challenge_tags: ['social-3'],
                    type: 'knowledge',
                    question:
                      'The Virginia House of Burgesses, established in 1619, holds what significance in American history?',
                    answerOptions: [
                      {
                        text: 'It was the first permanent English settlement in North America.',
                        isCorrect: false,
                        rationale:
                          'The first settlement was Jamestown; the House of Burgesses was its assembly.',
                      },
                      {
                        text: 'It was the first representative legislative assembly in the American colonies.',
                        isCorrect: true,
                        rationale:
                          'It was the first elected body, setting a precedent for self-government.',
                      },
                      {
                        text: 'It was a trade agreement between colonists and Native Americans.',
                        isCorrect: false,
                        rationale:
                          'It was a legislative body, not a trade agreement.',
                      },
                      {
                        text: 'It was a military alliance formed to fight against the French.',
                        isCorrect: false,
                        rationale:
                          'It was a political institution, not a military alliance.',
                      },
                    ],
                  },
                  {
                    questionNumber: 3,
                    type: 'text',
                    passage:
                      'The Columbian Exchange refers to the transfer of plants, animals, diseases, and people between the Old World (Europe, Asia, Africa) and the New World (the Americas). From the New World, Europe gained crops like potatoes and maize (corn). From the Old World, the Americas received animals like horses but also devastating diseases like smallpox.',
                    question:
                      'Which of the following was a direct consequence of the Columbian Exchange?',
                    answerOptions: [
                      {
                        text: 'The introduction of horses to the Americas.',
                        isCorrect: true,
                        rationale:
                          'Horses came from the Old World to the Americas.',
                      },
                      {
                        text: 'A decrease in the population of Europe.',
                        isCorrect: false,
                        rationale:
                          'New crops from the Americas led to a population boom in Europe.',
                      },
                      {
                        text: 'The spread of maize from Europe to the Americas.',
                        isCorrect: false,
                        rationale:
                          'The opposite is true; maize went from the Americas to Europe.',
                      },
                      {
                        text: 'An improvement in the health of indigenous populations.',
                        isCorrect: false,
                        rationale:
                          'Old World diseases devastated indigenous populations.',
                      },
                    ],
                  },
                  {
                    questionNumber: 4,
                    challenge_tags: ['science-6'],
                    type: 'knowledge',
                    question:
                      'The Mayflower Compact (1620) is significant because it was:',
                    answerOptions: [
                      {
                        text: 'a declaration of war against England.',
                        isCorrect: false,
                        rationale:
                          'It was an agreement to form a government, not a declaration of war.',
                      },
                      {
                        text: 'an early example of a social contract, where people agreed to form a government and obey its laws.',
                        isCorrect: true,
                        rationale:
                          "The signers agreed to create a 'civil body politic' and abide by its rules.",
                      },
                      {
                        text: 'the first constitution of the United States.',
                        isCorrect: false,
                        rationale:
                          'The U.S. Constitution was written much later, in 1787.',
                      },
                      {
                        text: 'a document granting religious freedom to all colonists.',
                        isCorrect: false,
                        rationale:
                          'It was about forming a government, not granting universal religious freedom.',
                      },
                    ],
                  },
                  {
                    questionNumber: 5,
                    challenge_tags: ['social-3'],
                    type: 'text',
                    passage:
                      'The system of indentured servitude was a common way for poor Europeans to migrate to the American colonies. In exchange for passage, they would work for a landowner for a fixed period, typically four to seven years. This system provided a crucial labor force before the large-scale adoption of slavery.',
                    question:
                      'What was the primary purpose of indentured servitude?',
                    answerOptions: [
                      {
                        text: 'To establish a system of permanent, inherited slavery.',
                        isCorrect: false,
                        rationale:
                          'Indentured servitude was a temporary labor contract.',
                      },
                      {
                        text: 'To provide a labor force for the colonies.',
                        isCorrect: true,
                        rationale:
                          'The system provided a crucial labor force for the growing colonies.',
                      },
                      {
                        text: 'To promote religious diversity in the colonies.',
                        isCorrect: false,
                        rationale:
                          "The system's primary purpose was economic (labor).",
                      },
                      {
                        text: 'To train colonists for military service.',
                        isCorrect: false,
                        rationale:
                          'Indentured servitude was a labor system, not a military one.',
                      },
                    ],
                  },
                ],
              },
              {
                id: 'ss_us_hist_foundations_quiz3',
                title: 'Foundations: Quiz 3',
                questions: [
                  {
                    questionNumber: 1,
                    challenge_tags: ['social-2'],
                    type: 'image',
                    imageUrl:
                      'Images/This-Question-is-based-on-the-following-graph.png',
                    question:
                      'This map shows the New England colonies. Which economic activity would be most characteristic of this region during the colonial era?',
                    answerOptions: [
                      {
                        text: 'Growing tobacco on large plantations.',
                        isCorrect: false,
                        rationale:
                          'This was characteristic of the Southern colonies.',
                      },
                      {
                        text: 'Building ships and engaging in maritime trade.',
                        isCorrect: true,
                        rationale:
                          "The region's long coastline and forests made shipbuilding and trade central to its economy.",
                      },
                      {
                        text: 'Cultivating wheat on large farms for export.',
                        isCorrect: false,
                        rationale:
                          'This was the specialty of the Middle Colonies.',
                      },
                      {
                        text: 'Mining for gold and silver.',
                        isCorrect: false,
                        rationale:
                          'There were no significant gold or silver mines in New England.',
                      },
                    ],
                  },
                  {
                    questionNumber: 2,
                    type: 'image',
                    imageUrl:
                      'Images/A map of the Triangular Trade routes..jpg',
                    question:
                      'This map shows the Triangular Trade. The route that transported enslaved Africans from Africa to the Americas was known as the:',
                    answerOptions: [
                      {
                        text: 'The Columbian Exchange',
                        isCorrect: false,
                        rationale:
                          'The Columbian Exchange refers to the transfer of goods and diseases, not the specific slave route.',
                      },
                      {
                        text: 'The Middle Passage',
                        isCorrect: true,
                        rationale:
                          'This is the specific term for the sea journey endured by enslaved Africans across the Atlantic.',
                      },
                      {
                        text: 'The Silk Road',
                        isCorrect: false,
                        rationale:
                          'The Silk Road was an ancient trade route connecting the East and West over land.',
                      },
                      {
                        text: 'The Spice Route',
                        isCorrect: false,
                        rationale:
                          'This refers to the sea routes from Europe to the East Indies.',
                      },
                    ],
                  },
                  {
                    questionNumber: 3,
                    type: 'text',
                    passage:
                      'The Great Awakening was a religious revival in the 1730s and 1740s that emphasized personal religious experience. It challenged the authority of established church ministers and led to the growth of new Protestant denominations.',
                    question:
                      'What was a significant effect of the Great Awakening?',
                    answerOptions: [
                      {
                        text: 'It strengthened the authority of the established churches.',
                        isCorrect: false,
                        rationale:
                          'It challenged traditional religious authority.',
                      },
                      {
                        text: 'It encouraged colonists to question traditional authority.',
                        isCorrect: true,
                        rationale:
                          'By emphasizing personal experience, it fostered a spirit of individualism and a willingness to challenge authority.',
                      },
                      {
                        text: 'It led to a decline in religious belief throughout the colonies.',
                        isCorrect: false,
                        rationale:
                          "It was a religious 'revival,' increasing religious fervor.",
                      },
                      {
                        text: 'It unified all colonial churches under one denomination.',
                        isCorrect: false,
                        rationale:
                          'It led to the growth of new denominations, increasing diversity.',
                      },
                    ],
                  },
                  {
                    questionNumber: 4,
                    challenge_tags: ['social-1'],
                    type: 'image',
                    imageUrl:
                      'Images/American_School_-_Join_or_Die_drawing_considers_the_first_political_cartoon_published_in_the_Penns_-_(MeisterDrucke-971488).jpg',
                    question:
                      'This political cartoon by Benjamin Franklin, created in 1754, was used to promote the Albany Plan of Union. What was the primary goal of this plan?',
                    answerOptions: [
                      {
                        text: 'To declare independence from Great Britain.',
                        isCorrect: false,
                        rationale:
                          'The plan was proposed before the revolutionary period and did not call for independence.',
                      },
                      {
                        text: 'To create a unified colonial government for defense against the French.',
                        isCorrect: true,
                        rationale:
                          'The plan aimed to unite the colonies for common defense at the start of the French and Indian War.',
                      },
                      {
                        text: 'To abolish slavery in all thirteen colonies.',
                        isCorrect: false,
                        rationale:
                          'Abolition was not a goal of the Albany Plan.',
                      },
                      {
                        text: 'To establish a single currency for all the colonies.',
                        isCorrect: false,
                        rationale:
                          'The primary goal was defense, not currency.',
                      },
                    ],
                  },
                  {
                    questionNumber: 5,
                    type: 'knowledge',
                    question:
                      'Which colony was founded by William Penn as a haven for Quakers and was known for its policy of religious toleration?',
                    answerOptions: [
                      {
                        text: 'Massachusetts',
                        isCorrect: false,
                        rationale:
                          'Massachusetts was founded by Puritans and was not initially tolerant of other religions.',
                      },
                      {
                        text: 'Virginia',
                        isCorrect: false,
                        rationale:
                          'Virginia was founded primarily for economic reasons and had an established Anglican church.',
                      },
                      {
                        text: 'Pennsylvania',
                        isCorrect: true,
                        rationale:
                          'Pennsylvania was established by William Penn with the specific goal of providing a place for Quakers and others to practice their religion freely.',
                      },
                      {
                        text: 'Georgia',
                        isCorrect: false,
                        rationale:
                          'Georgia was founded as a buffer colony and a place for debtors.',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'ss_us_hist_revolution',
            title: 'The American Revolution (1763-1783)',
            description:
              'Causes (Stamp Act, Intolerable Acts), Declaration of Independence, Key Battles (Saratoga, Yorktown), Treaty of Paris.',
            quizzes: [
              {
                id: 'ss_us_hist_revolution_quiz1',
                title: 'The American Revolution: Quiz 1',
                questions: [
                  {
                    questionNumber: 1,
                    challenge_tags: ['science-3', 'social-4'],
                    type: 'text',
                    passage:
                      "After the French and Indian War (1754-1763), Great Britain was left with a significant war debt. To manage this debt, the British Parliament began imposing new taxes on the American colonies. Acts like the Stamp Act (1765) and the Townshend Acts (1767) taxed goods such as paper, glass, and tea. Colonists strongly protested these taxes, arguing that they were a form of 'taxation without representation,' since the colonies had no elected representatives in the British Parliament to voice their interests.",
                    question:
                      'What was the primary argument used by American colonists to protest the taxes imposed by the British Parliament after 1763?',
                    answerOptions: [
                      {
                        text: 'The taxes were economically ruinous and would destroy colonial businesses.',
                        rationale:
                          'While the economic burden was a concern, the core *political* argument was about the lack of representation, not just the economic impact.',
                        isCorrect: false,
                      },
                      {
                        text: 'The taxes violated their rights as British citizens because they were not represented in Parliament.',
                        rationale:
                          "Correct. The slogan 'taxation without representation' captures the central grievance: that Parliament had no authority to tax them without their consent, which could only be given through their own elected representatives.",
                        isCorrect: true,
                      },
                      {
                        text: 'The taxes were intended to punish the colonies for their role in the French and Indian War.',
                        rationale:
                          'The passage states the taxes were to manage war debt, not as a punishment for the war itself.',
                        isCorrect: false,
                      },
                      {
                        text: 'The taxes unfairly benefited French merchants over American merchants.',
                        rationale:
                          'The issue was with British taxation, not benefits for the French. The conflict was between the colonies and Great Britain.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 2,
                    challenge_tags: ['science-3', 'social-4'],
                    type: 'quote',
                    passage:
                      "'We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.--That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed.' - Declaration of Independence, 1776",
                    question:
                      'The ideas expressed in this excerpt are most directly influenced by which intellectual movement?',
                    answerOptions: [
                      {
                        text: 'The Renaissance',
                        rationale:
                          'The Renaissance focused on art, humanism, and the revival of classical learning, but the direct political philosophy in the quote comes from a later period.',
                        isCorrect: false,
                      },
                      {
                        text: 'The Protestant Reformation',
                        rationale:
                          'The Reformation challenged religious authority, but the specific concepts of natural rights and consent of the governed are from the Enlightenment.',
                        isCorrect: false,
                      },
                      {
                        text: 'The Enlightenment',
                        rationale:
                          'Correct. Philosophers like John Locke articulated the core ideas of natural (unalienable) rights and the principle that governments derive their legitimacy from the consent of the people they govern. This quote is a direct reflection of Enlightenment political theory.',
                        isCorrect: true,
                      },
                      {
                        text: 'The Scientific Revolution',
                        rationale:
                          'The Scientific Revolution emphasized reason and empirical observation, which influenced the Enlightenment, but the political ideas themselves are hallmarks of the Enlightenment.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 3,
                    challenge_tags: ['social-3', 'social-4'],
                    type: 'text',
                    passage:
                      'The American victory at the Battle of Saratoga in 1777 is widely considered the turning point of the Revolutionary War. The defeat of a major British army convinced France that the American colonists could potentially win the war. As a result, France formally recognized American independence and entered the war as an ally of the United States, providing crucial military and financial support that was instrumental in the final victory at Yorktown.',
                    question:
                      'What was the most important strategic outcome of the American victory at Saratoga?',
                    answerOptions: [
                      {
                        text: 'It was the final battle that ended the Revolutionary War.',
                        rationale:
                          'The passage states that the final victory was at Yorktown. Saratoga was a turning point, not the end.',
                        isCorrect: false,
                      },
                      {
                        text: 'It secured a crucial foreign alliance with France.',
                        rationale:
                          "Correct. The passage explicitly states that the victory at Saratoga convinced France to become an ally, which provided the 'crucial military and financial support' needed to win the war.",
                        isCorrect: true,
                      },
                      {
                        text: 'It resulted in the capture of the British capital in North America.',
                        rationale:
                          'Saratoga was a field victory in upstate New York; it did not involve the capture of a major capital city like New York or Philadelphia at that time.',
                        isCorrect: false,
                      },
                      {
                        text: 'It was the first time the colonial militia defeated British regular troops.',
                        rationale:
                          'While a major victory, it was not the first time colonists had successfully engaged British troops (e.g., Lexington and Concord, Bunker Hill). Its strategic importance was in securing the French alliance.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 4,
                    challenge_tags: ['science-6', 'social-3'],
                    type: 'cause-effect',
                    question:
                      'Which statement best describes the cause-and-effect relationship between the French and Indian War and the American Revolution?',
                    answerOptions: [
                      {
                        text: 'The American victory in the French and Indian War gave the colonies the confidence to declare independence.',
                        rationale:
                          'The war was a victory for the British, with colonists fighting alongside them. The confidence came later from protesting British policies.',
                        isCorrect: false,
                      },
                      {
                        text: 'The French and Indian War created a permanent alliance between the British and Native American tribes, angering the colonists.',
                        rationale:
                          'The war fractured relationships between the British and many tribes. The Proclamation of 1763, which restricted colonial settlement, was a greater source of anger.',
                        isCorrect: false,
                      },
                      {
                        text: 'The debt Great Britain incurred from the French and Indian War led to taxation policies that angered the colonists.',
                        rationale:
                          'Correct. The war was very expensive for Britain. The subsequent attempt to pay down that debt by taxing the colonies directly, without their political representation, was a primary cause of the Revolution.',
                        isCorrect: true,
                      },
                      {
                        text: 'The French, after losing the war, encouraged the American colonies to rebel against their British rulers.',
                        rationale:
                          'French support came much later, after the Revolution had already begun and the colonists proved they could win at Saratoga.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 5,
                    type: 'text',
                    passage:
                      'In response to the Boston Tea Party in 1773, where colonists destroyed a shipment of British tea, the British Parliament passed a series of punitive measures in 1774 known in the colonies as the Intolerable Acts (or Coercive Acts). These acts closed the port of Boston until the tea was paid for, restricted town meetings in Massachusetts, and allowed British officials accused of crimes to be tried in Britain. These measures were intended to punish Massachusetts and isolate it from the other colonies.',
                    question:
                      'What was the most significant, unintended consequence of the Intolerable Acts?',
                    answerOptions: [
                      {
                        text: 'They successfully forced Massachusetts colonists to pay for the destroyed tea.',
                        rationale:
                          'The acts did not lead to the colonists paying for the tea; instead, they escalated tensions.',
                        isCorrect: false,
                      },
                      {
                        text: 'They caused other colonies to sever ties with Massachusetts for fear of similar punishment.',
                        rationale:
                          'The acts had the opposite effect. Instead of isolating Massachusetts, they unified the colonies against what they saw as British tyranny.',
                        isCorrect: false,
                      },
                      {
                        text: 'They were repealed after colonial leaders sent a petition to the King.',
                        rationale:
                          'The acts were not repealed and were a direct cause of further revolutionary action.',
                        isCorrect: false,
                      },
                      {
                        text: 'They unified the colonies in their opposition to British rule, leading to the First Continental Congress.',
                        rationale:
                          'Correct. Rather than isolating Massachusetts, the harshness of the acts convinced other colonies that their own rights were in jeopardy, prompting them to convene the First Continental Congress to coordinate a response.',
                        isCorrect: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'ss_us_hist_revolution_quiz2',
                title: 'The American Revolution: Quiz 2',
                questions: [
                  {
                    questionNumber: 1,
                    challenge_tags: ['social-4'],
                    type: 'knowledge',
                    question:
                      'During the American Revolution, colonists who supported independence were known as Patriots. What was the term for colonists who remained loyal to Great Britain?',
                    answerOptions: [
                      {
                        text: 'Separatists',
                        rationale:
                          'This term is more commonly associated with the Pilgrims who wanted to separate from the Church of England.',
                        isCorrect: false,
                      },
                      {
                        text: 'Federalists',
                        rationale:
                          'This term refers to those who supported the ratification of the U.S. Constitution after the Revolution.',
                        isCorrect: false,
                      },
                      {
                        text: 'Tories',
                        rationale:
                          'Correct. Colonists who remained loyal to the British Crown were often called Loyalists or, using the name of the British political party that supported the monarchy, Tories.',
                        isCorrect: true,
                      },
                      {
                        text: 'Abolitionists',
                        rationale:
                          'This term refers to people who advocated for the abolition of slavery, a movement that gained prominence later.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 2,
                    challenge_tags: ['science-3', 'social-4'],
                    type: 'quote',
                    passage:
                      "'Every thing that is right or reasonable pleads for separation. The blood of the slain, the weeping voice of nature cries, 'TIS TIME TO PART.' - Thomas Paine, Common Sense, 1776",
                    question:
                      "What was the primary purpose of Thomas Paine's pamphlet, Common Sense?",
                    answerOptions: [
                      {
                        text: 'To negotiate a peaceful settlement with King George III.',
                        rationale:
                          "The quote 'TIS TIME TO PART' shows that the purpose was the opposite of seeking a peaceful settlement; it was a call for a definitive break.",
                        isCorrect: false,
                      },
                      {
                        text: 'To persuade undecided American colonists to support independence from Britain.',
                        rationale:
                          'Correct. Common Sense was written in plain, powerful language to make a compelling, emotional, and logical case for independence, and it was incredibly effective in swaying public opinion.',
                        isCorrect: true,
                      },
                      {
                        text: 'To outline a new system of government for the United States.',
                        rationale:
                          "While Paine argued for a republic, the pamphlet's main goal was to argue for independence itself, not to draft a detailed constitution.",
                        isCorrect: false,
                      },
                      {
                        text: 'To recruit soldiers for the Continental Army.',
                        rationale:
                          'While it likely inspired people to fight, its primary purpose was political persuasion, not direct military recruitment.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 3,
                    challenge_tags: ['rla-5'],
                    type: 'knowledge',
                    question:
                      'Who was appointed Commander-in-Chief of the Continental Army during the American Revolution?',
                    answerOptions: [
                      {
                        text: 'Thomas Jefferson',
                        rationale:
                          'Thomas Jefferson was the primary author of the Declaration of Independence and served as a diplomat, but he was not a military commander.',
                        isCorrect: false,
                      },
                      {
                        text: 'Benjamin Franklin',
                        rationale:
                          'Benjamin Franklin was a key diplomat who helped secure the alliance with France, but he did not lead the army.',
                        isCorrect: false,
                      },
                      {
                        text: 'John Adams',
                        rationale:
                          'John Adams was a leading voice for independence in the Continental Congress and a diplomat, but not the military leader.',
                        isCorrect: false,
                      },
                      {
                        text: 'George Washington',
                        rationale:
                          'Correct. The Second Continental Congress appointed George Washington as the Commander-in-Chief of the Continental Army in 1775, and he led the army throughout the war.',
                        isCorrect: true,
                      },
                    ],
                  },
                  {
                    questionNumber: 4,
                    challenge_tags: ['social-3', 'social-4'],
                    type: 'text',
                    passage:
                      "The Treaty of Paris, signed in 1783, formally ended the American Revolutionary War. The key terms of the treaty included Great Britain's formal recognition of the United States as an independent nation. It also established the boundaries of the new nation, granting the U.S. territory that stretched west to the Mississippi River, north to the Great Lakes, and south to Florida.",
                    question:
                      'Besides the recognition of American independence, what was another significant outcome of the Treaty of Paris?',
                    answerOptions: [
                      {
                        text: 'The United States was required to pay war reparations to Great Britain.',
                        rationale:
                          'The treaty did not require the U.S. to pay reparations to Britain.',
                        isCorrect: false,
                      },
                      {
                        text: "France received all of Britain's former territories in North America.",
                        rationale:
                          'The treaty granted territory to the United States, not France.',
                        isCorrect: false,
                      },
                      {
                        text: 'The United States gained a vast amount of new territory, significantly expanding its borders.',
                        rationale:
                          'Correct. The treaty granted the U.S. control of the territory west to the Mississippi River, which was a massive expansion of its land.',
                        isCorrect: true,
                      },
                      {
                        text: 'Great Britain agreed to help the United States establish its new government.',
                        rationale:
                          'The treaty ended the war but did not include provisions for Britain to assist in the formation of the U.S. government.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 5,
                    type: 'knowledge',
                    question:
                      'The final, decisive battle of the American Revolution, where Lord Cornwallis surrendered to George Washington, took place at:',
                    answerOptions: [
                      {
                        text: 'Saratoga',
                        rationale:
                          'Saratoga was a crucial turning point, but not the final battle.',
                        isCorrect: false,
                      },
                      {
                        text: 'Bunker Hill',
                        rationale:
                          "Bunker Hill was an early battle that showed the colonists' resolve, but it was not the final victory.",
                        isCorrect: false,
                      },
                      {
                        text: 'Yorktown',
                        rationale:
                          'Correct. The siege of Yorktown in 1781, with combined American and French forces, led to the surrender of the main British army and effectively ended the war.',
                        isCorrect: true,
                      },
                      {
                        text: 'Lexington and Concord',
                        rationale:
                          'These were the first shots of the war, not the end.',
                        isCorrect: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'ss_us_hist_revolution_quiz3',
                title: 'The American Revolution: Quiz 3',
                questions: [
                  {
                    questionNumber: 1,
                    challenge_tags: ['social-3', 'social-4'],
                    type: 'image',
                    imageUrl: 'Images/join_or_die_cartoon.jpg',
                    question:
                      'This 1754 political cartoon by Benjamin Franklin was originally created to encourage colonial unity during the French and Indian War. How was its message re-purposed during the American Revolution?',
                    answerOptions: [
                      {
                        text: 'It was used by Loyalists to argue that the colonies were too weak to survive without Britain.',
                        rationale:
                          'Patriots, not Loyalists, used this cartoon to argue for unity against Britain.',
                        isCorrect: false,
                      },
                      {
                        text: 'It became a symbol of colonial unity and resistance against British rule.',
                        rationale:
                          "Correct. The powerful message of 'Join, or Die' was easily adapted to represent the need for the colonies to unite against British tyranny or be defeated individually.",
                        isCorrect: true,
                      },
                      {
                        text: 'It was changed to depict a snake attacking a British lion.',
                        rationale:
                          'The original image was powerful enough and did not need to be changed.',
                        isCorrect: false,
                      },
                      {
                        text: 'It lost its relevance and was not used during the Revolution.',
                        rationale:
                          'The cartoon was widely used and became an important symbol of the revolutionary cause.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 2,
                    challenge_tags: ['science-3', 'social-4'],
                    type: 'chart',
                    passage: `<div class="passage-text"><b>Comparing Forces in the American Revolution</b><table class="w-full text-left mt-2"><thead><tr class="border-b"><th class="p-2">Factor</th><th class="p-2">Great Britain</th><th class="p-2">American Colonies</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-semibold">Population</td><td class="p-2">~ 8 million</td><td class="p-2">~ 2.5 million</td></tr><tr class="border-b"><td class="p-2 font-semibold">Military</td><td class="p-2">Large, well-trained army; powerful navy</td><td class="p-2">Small, inexperienced militia; no navy</td></tr><tr class="border-b"><td class="p-2 font-semibold">Leadership</td><td class="p-2">Experienced officers</td><td class="p-2">Committed, capable leaders (e.g., Washington)</td></tr><tr class="border-b"><td class="p-2 font-semibold">Geography</td><td class="p-2">Long supply lines (3,000 miles)</td><td class="p-2">Fighting on home ground; vast territory</td></tr><tr class="border-b"><td class="p-2 font-semibold">Motivation</td><td class="p-2">Hired mercenaries; varied support at home</td><td class="p-2">Fighting for liberty and independence</td></tr></tbody></table></div>`,
                    question:
                      'Based on the chart, which factor provided the most significant advantage for the American colonies in their war against Great Britain?',
                    answerOptions: [
                      {
                        text: 'Superior military training and equipment.',
                        rationale:
                          'The chart clearly indicates that Great Britain, not the colonies, had the superior military.',
                        isCorrect: false,
                      },
                      {
                        text: 'A larger and more supportive population base.',
                        rationale:
                          'The chart shows Great Britain had a much larger population.',
                        isCorrect: false,
                      },
                      {
                        text: 'Geographical factors and a stronger motivation for fighting.',
                        rationale:
                          'Correct. The chart shows that fighting on their own vast territory (a geographical advantage) and fighting for a cause like independence (a motivational advantage) were key strengths for the Americans, offsetting British military superiority.',
                        isCorrect: true,
                      },
                      {
                        text: 'Support from a powerful and established navy.',
                        rationale:
                          "The chart states the colonies had 'no navy' at the outset.",
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 3,
                    challenge_tags: ['rla-5'],
                    type: 'text',
                    passage:
                      'The winter of 1777-1778 at Valley Forge was a time of immense hardship for the Continental Army. Soldiers suffered from a lack of food, clothing, and shelter, and many died from disease. However, the army did not disintegrate. Under the command of George Washington and the training of the Prussian officer Baron von Steuben, the soldiers who remained were forged into a more disciplined and professional fighting force.',
                    question:
                      "What was the significance of the Continental Army's winter at Valley Forge?",
                    answerOptions: [
                      {
                        text: 'It was a major military victory against the British.',
                        rationale:
                          'Valley Forge was a winter encampment, not a battle.',
                        isCorrect: false,
                      },
                      {
                        text: 'It marked the end of the Revolutionary War.',
                        rationale:
                          'The war continued for several more years after Valley Forge.',
                        isCorrect: false,
                      },
                      {
                        text: 'Despite extreme hardship, the army emerged as a more professional and disciplined force.',
                        rationale:
                          'Correct. The passage highlights that the training and perseverance during the harsh winter transformed the army.',
                        isCorrect: true,
                      },
                      {
                        text: 'It led to George Washington being replaced as commander.',
                        rationale:
                          "Washington's leadership was crucial in holding the army together during this difficult time.",
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 4,
                    type: 'knowledge',
                    question:
                      'What was the main purpose of the Declaration of Independence?',
                    answerOptions: [
                      {
                        text: 'To create a detailed plan for the new American government.',
                        rationale:
                          'The plan for government came later with the Articles of Confederation and the Constitution.',
                        isCorrect: false,
                      },
                      {
                        text: "To formally state the colonies' reasons for separating from Great Britain and to articulate their political philosophy.",
                        rationale:
                          'Correct. The Declaration listed grievances against the King and asserted the philosophical principles (like natural rights) that justified the separation.',
                        isCorrect: true,
                      },
                      {
                        text: 'To request financial aid from France and Spain.',
                        rationale:
                          'While the colonists sought foreign aid, that was not the purpose of this specific document.',
                        isCorrect: false,
                      },
                      {
                        text: 'To offer a final peace proposal to King George III.',
                        rationale:
                          'It was a declaration of separation, not a peace proposal.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 5,
                    type: 'analysis',
                    passage: `<p class="passage-text mb-4"><b>Historian A:</b> The American Revolution was fundamentally an economic conflict. The British Empire's mercantilist policies, such as the Navigation Acts and various taxes, restricted colonial trade and manufacturing. The core of the dispute was the colonists' desire for economic freedom��the ability to trade with whomever they pleased and to develop their own industries without British interference.</p><p class="passage-text"><b>Historian B:</b> The Revolution was primarily a political and ideological struggle. Colonists saw themselves as freeborn Britons entitled to certain rights, most notably the right to be taxed only by their own elected representatives. When Parliament violated this principle, it was seen as an act of tyranny. The conflict was not about the amount of the tax, but the principle of self-government.</p>`,
                    question:
                      'What is the central point of disagreement between Historian A and Historian B?',
                    answerOptions: [
                      {
                        text: 'Whether the colonists were justified in rebelling.',
                        rationale:
                          'Both historians are explaining the causes of the rebellion, not debating its justification.',
                        isCorrect: false,
                      },
                      {
                        text: "The primary motivation behind the colonists' drive for independence.",
                        rationale:
                          'Correct. Historian A argues the main driver was economic freedom (the desire to make more money), while Historian B argues it was political principle (the right of self-government).',
                        isCorrect: true,
                      },
                      {
                        text: 'The date when the American Revolution truly began.',
                        rationale:
                          'Neither historian is concerned with dating the start of the Revolution.',
                        isCorrect: false,
                      },
                      {
                        text: 'Whether the British policies were fair to the colonists.',
                        rationale:
                          "Both passages imply the policies led to conflict, but their focus is on the colonists' motivation, not the fairness of British actions from a neutral perspective.",
                        isCorrect: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'ss_us_hist_new_nation',
            title: 'Westward Expansion',
            description:
              'Articles of Confederation, Constitutional Convention, Westward Expansion (Louisiana Purchase, Lewis & Clark).',
            quizzes: [
              {
                id: 'ss_us_hist_westward_expansion_quiz1',
                title: 'Westward Expansion: Quiz 1',
                questions: [
                  {
                    questionNumber: 1,
                    challenge_tags: ['social-3'],
                    type: 'text',
                    passage:
                      "Manifest Destiny was a widely held cultural belief in the 19th-century United States that American settlers were destined to expand across North America. This idea was used to justify westward expansion, the removal of Native American tribes, and the war with Mexico. Proponents argued that it was not only the nation's destiny but its duty to spread democracy and Protestant Christianity across the continent.",
                    question: 'What was the core idea of Manifest Destiny?',
                    answerOptions: [
                      {
                        text: 'That the United States should limit its territory to the original thirteen colonies.',
                        isCorrect: false,
                      },
                      {
                        text: 'That American settlers were destined to expand across the continent, spreading their institutions with them.',
                        isCorrect: true,
                      },
                      {
                        text: 'That the United States should form a military alliance with Mexico.',
                        isCorrect: false,
                      },
                      {
                        text: 'That Native American tribes should be given full citizenship.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 2,
                    challenge_tags: ['social-3'],
                    type: 'knowledge',
                    question:
                      'Which of the following events, completed in 1869, was a major catalyst for westward expansion by making travel and trade across the continent significantly faster and cheaper?',
                    answerOptions: [
                      {
                        text: 'The Lewis and Clark Expedition',
                        isCorrect: false,
                      },
                      {
                        text: 'The construction of the Transcontinental Railroad',
                        isCorrect: true,
                      },
                      { text: 'The California Gold Rush', isCorrect: false },
                      {
                        text: 'The passage of the Homestead Act',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 3,
                    challenge_tags: ['social-1'],
                    type: 'text',
                    passage:
                      "The Homestead Act of 1862 was a pivotal piece of legislation that encouraged westward migration. It allowed any adult citizen, or intended citizen, who had never borne arms against the U.S. government to claim 160 acres of surveyed government land. Claimants were required to 'improve' the plot by building a dwelling and cultivating the land for five years before receiving full ownership.",
                    question:
                      'What was the main purpose of the Homestead Act of 1862?',
                    answerOptions: [
                      {
                        text: 'To create national parks and preserve wilderness.',
                        isCorrect: false,
                      },
                      {
                        text: 'To sell government land to railroad companies.',
                        isCorrect: false,
                      },
                      {
                        text: 'To encourage the settlement of the American West by individual farmers.',
                        isCorrect: true,
                      },
                      {
                        text: 'To establish large, government-owned farms.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 4,
                    type: 'knowledge',
                    question:
                      'The forced removal of the Cherokee Nation from their ancestral lands in the southeastern United States to territory in present-day Oklahoma is known as the:',
                    answerOptions: [
                      { text: 'The Oregon Trail', isCorrect: false },
                      { text: 'The Trail of Tears', isCorrect: true },
                      { text: 'The Great Migration', isCorrect: false },
                      { text: 'The Santa Fe Trail', isCorrect: false },
                    ],
                  },
                  {
                    questionNumber: 5,
                    type: 'text',
                    passage:
                      "The California Gold Rush began in 1848 after gold was discovered at Sutter's Mill. The news of gold brought some 300,000 people to California from the rest of the United States and abroad. This massive influx of 'forty-niners' dramatically increased California's population, leading to its rapid statehood in 1850 and fueling economic growth and westward expansion.",
                    question:
                      'What was a major consequence of the California Gold Rush?',
                    answerOptions: [
                      {
                        text: "A rapid increase in California's population and its admission to the Union as a state.",
                        isCorrect: true,
                      },
                      {
                        text: 'A war between the United States and Mexico.',
                        isCorrect: false,
                      },
                      {
                        text: 'The discovery of a water route to the Pacific Ocean.',
                        isCorrect: false,
                      },
                      {
                        text: 'A decline in the value of gold.',
                        isCorrect: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'ss_us_hist_westward_expansion_quiz2',
                title: 'Westward Expansion: Quiz 2',
                questions: [
                  {
                    questionNumber: 1,
                    challenge_tags: ['social-3'],
                    type: 'knowledge',
                    question:
                      'The Oregon Trail was a major overland route for westward migration in the 19th century. What was the primary motivation for most pioneers who traveled the Oregon Trail?',
                    answerOptions: [
                      {
                        text: 'To find gold and become rich.',
                        isCorrect: false,
                      },
                      {
                        text: 'To establish new trade routes with Asia.',
                        isCorrect: false,
                      },
                      {
                        text: 'To acquire fertile farmland and start new lives in the West.',
                        isCorrect: true,
                      },
                      {
                        text: 'To escape religious persecution in the East.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 2,
                    challenge_tags: ['social-3'],
                    type: 'text',
                    passage:
                      'The Mexican-American War (1846-1848) was a conflict between the United States and Mexico, primarily over the U.S. annexation of Texas. The war ended with the Treaty of Guadalupe Hidalgo, in which Mexico ceded a vast territory, known as the Mexican Cession, to the United States. This territory included present-day California, Nevada, Utah, and parts of several other states.',
                    question:
                      'What was a major outcome of the Mexican-American War?',
                    answerOptions: [
                      {
                        text: 'The United States lost territory to Mexico.',
                        isCorrect: false,
                      },
                      {
                        text: 'The United States acquired a vast amount of territory, significantly expanding its borders.',
                        isCorrect: true,
                      },
                      {
                        text: 'Mexico and the United States formed a permanent military alliance.',
                        isCorrect: false,
                      },
                      {
                        text: 'The issue of slavery in the new territories was permanently resolved.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 3,
                    challenge_tags: ['social-1', 'social-3'],
                    type: 'knowledge',
                    question:
                      "The Battle of the Little Bighorn in 1876, often referred to as 'Custer's Last Stand,' was a significant event in the Great Sioux War. What was the outcome of this battle?",
                    answerOptions: [
                      {
                        text: 'A decisive victory for the U.S. Army, leading to the immediate surrender of the Sioux.',
                        isCorrect: false,
                      },
                      {
                        text: 'A major victory for the Lakota, Cheyenne, and Arapaho tribes against the U.S. Army.',
                        isCorrect: true,
                      },
                      {
                        text: 'A peace treaty that granted the Sioux permanent control of the Black Hills.',
                        isCorrect: false,
                      },
                      {
                        text: 'A stalemate that resulted in a temporary truce.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 4,
                    challenge_tags: ['social-1'],
                    type: 'text',
                    passage:
                      'The near-extermination of the American bison (buffalo) in the late 19th century had a devastating impact on the Plains Indians. For these tribes, the bison was a primary source of food, clothing, shelter, and spiritual inspiration. The destruction of the bison herds, driven by commercial hunting and U.S. government policy, was a key factor in forcing the Plains tribes onto reservations.',
                    question:
                      'What was the primary consequence of the destruction of the bison herds for the Plains Indians?',
                    answerOptions: [
                      {
                        text: 'It had little impact, as they primarily relied on farming.',
                        isCorrect: false,
                      },
                      {
                        text: 'It forced them to migrate to Canada.',
                        isCorrect: false,
                      },
                      {
                        text: 'It destroyed their traditional way of life and forced them onto reservations.',
                        isCorrect: true,
                      },
                      {
                        text: 'It led to a shift from hunting to fishing.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 5,
                    type: 'knowledge',
                    question:
                      "The concept of 'popular sovereignty' was a controversial idea during the westward expansion. What did it propose?",
                    answerOptions: [
                      {
                        text: 'That the President should have the power to decide the status of slavery in new territories.',
                        isCorrect: false,
                      },
                      {
                        text: 'That the settlers in a new territory should vote to decide whether to allow slavery.',
                        isCorrect: true,
                      },
                      {
                        text: 'That Congress should ban slavery in all new territories.',
                        isCorrect: false,
                      },
                      {
                        text: 'That Native American tribes should have the final say on the status of slavery.',
                        isCorrect: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'ss_us_hist_westward_expansion_quiz3',
                title: 'Westward Expansion: Quiz 3',
                questions: [
                  {
                    questionNumber: 1,
                    challenge_tags: ['social-3'],
                    type: 'knowledge',
                    question:
                      'Which invention, perfected in the 1870s, played a crucial role in ending the era of the open range and the long cattle drives by allowing ranchers to fence off their lands?',
                    answerOptions: [
                      { text: 'The steel plow', isCorrect: false },
                      { text: 'The windmill', isCorrect: false },
                      { text: 'Barbed wire', isCorrect: true },
                      { text: 'The railroad', isCorrect: false },
                    ],
                  },
                  {
                    questionNumber: 2,
                    type: 'text',
                    passage:
                      'The Dawes Act of 1887 was a U.S. law that aimed to assimilate Native Americans into mainstream American society. It broke up reservation lands, which were held communally by tribes, and distributed them to individual Native American families. The policy was a failure, leading to the loss of millions of acres of tribal land and a breakdown of traditional Native American cultures.',
                    question:
                      'What was the primary goal of the Dawes Act of 1887?',
                    answerOptions: [
                      {
                        text: 'To strengthen tribal governments and preserve Native American culture.',
                        isCorrect: false,
                      },
                      {
                        text: 'To encourage Native Americans to assimilate by turning them into individual farmers.',
                        isCorrect: true,
                      },
                      {
                        text: 'To create new, larger reservations for Native American tribes.',
                        isCorrect: false,
                      },
                      {
                        text: 'To grant immediate U.S. citizenship to all Native Americans.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 3,
                    type: 'knowledge',
                    question:
                      'The Wounded Knee Massacre in 1890 is considered the final major conflict of the American Indian Wars. What happened at Wounded Knee?',
                    answerOptions: [
                      {
                        text: 'A successful peace treaty was signed between the U.S. government and the Lakota.',
                        isCorrect: false,
                      },
                      {
                        text: 'A battle in which Native American warriors defeated a U.S. Army regiment.',
                        isCorrect: false,
                      },
                      {
                        text: 'The U.S. Army killed approximately 300 Lakota men, women, and children.',
                        isCorrect: true,
                      },
                      {
                        text: 'A Ghost Dance ceremony that led to a spiritual revival.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 4,
                    challenge_tags: ['rla-7'],
                    type: 'text',
                    passage:
                      "Frederick Jackson Turner's 'Frontier Thesis,' presented in 1893, was an influential idea in American history. Turner argued that the existence of a frontier��a line between 'civilization' and 'wilderness'��had been a defining characteristic of American culture, fostering individualism, democracy, and innovation. He declared that the frontier had closed, raising questions about the future of American identity.",
                    question:
                      "According to Frederick Jackson Turner's 'Frontier Thesis,' what role did the frontier play in American history?",
                    answerOptions: [
                      {
                        text: 'It was a source of conflict that weakened the nation.',
                        isCorrect: false,
                      },
                      {
                        text: 'It was a defining force that shaped American character and institutions.',
                        isCorrect: true,
                      },
                      {
                        text: 'It was a barrier to economic growth and progress.',
                        isCorrect: false,
                      },
                      {
                        text: 'It had little to no impact on American culture.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 5,
                    type: 'knowledge',
                    question:
                      'The Gadsden Purchase in 1854 was a land deal between the United States and Mexico. What was the primary purpose of this purchase?',
                    answerOptions: [
                      {
                        text: 'To acquire land for a southern transcontinental railroad route.',
                        isCorrect: true,
                      },
                      {
                        text: 'To gain access to new gold mines.',
                        isCorrect: false,
                      },
                      {
                        text: 'To create a buffer zone between the two countries.',
                        isCorrect: false,
                      },
                      {
                        text: 'To settle a border dispute over the state of Texas.',
                        isCorrect: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'ss_us_hist_new_nation_quiz1',
                title: 'A New Nation: Quiz 1',
                questions: [
                  {
                    questionNumber: 1,
                    challenge_tags: ['social-3', 'science-5'],
                    type: 'text',
                    passage:
                      "Following the Revolutionary War, the newly independent states adopted the Articles of Confederation as their first national government. The Articles created a weak central government, reflecting the states' fear of a strong, centralized authority like the British monarchy. Under the Articles, the national Congress had no power to tax, raise a national army, or regulate interstate commerce. These weaknesses quickly became apparent, leading to events like Shays' Rebellion.",
                    question:
                      'The primary weakness of the government formed by the Articles of Confederation was that it...',
                    answerOptions: [
                      {
                        text: 'gave too much power to the executive branch.',
                        rationale:
                          'There was no strong executive branch under the Articles; power was concentrated in a weak Congress.',
                        isCorrect: false,
                      },
                      {
                        text: 'lacked the authority to effectively govern and manage the nation.',
                        rationale:
                          "Correct. The inability to tax, raise an army, or regulate trade meant the central government was too weak to manage the nation's finances, defense, or economy, leading to instability.",
                        isCorrect: true,
                      },
                      {
                        text: 'favored the larger states over the smaller states.',
                        rationale:
                          "This was a key debate during the Constitutional Convention. Under the Articles, each state had one vote, which was a point of contention but not the primary weakness of the government's overall power.",
                        isCorrect: false,
                      },
                      {
                        text: 'created a judicial system that frequently overruled state laws.',
                        rationale:
                          'There was no national judicial system under the Articles of Confederation.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 2,
                    challenge_tags: ['social-3'],
                    type: 'knowledge',
                    question:
                      'What event highlighted the weaknesses of the Articles of Confederation and convinced many national leaders that a stronger central government was needed?',
                    answerOptions: [
                      {
                        text: 'The Boston Tea Party',
                        rationale:
                          'The Boston Tea Party occurred before the Articles were written and was a protest against British rule.',
                        isCorrect: false,
                      },
                      {
                        text: "Shays' Rebellion",
                        rationale:
                          "Correct. Shays' Rebellion, an uprising of debt-ridden farmers in Massachusetts, could not be effectively put down by the weak national government, alarming leaders and demonstrating the need for a stronger federal authority.",
                        isCorrect: true,
                      },
                      {
                        text: 'The Whiskey Rebellion',
                        rationale:
                          'The Whiskey Rebellion occurred after the Constitution was ratified and was suppressed by the new, stronger federal government.',
                        isCorrect: false,
                      },
                      {
                        text: 'The Battle of Yorktown',
                        rationale:
                          'This was the final major battle of the Revolution, which occurred before the full weaknesses of the Articles became apparent.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 3,
                    challenge_tags: ['social-1'],
                    type: 'text',
                    passage:
                      'The Constitutional Convention of 1787 was called to address the problems of the Articles of Confederation. A major point of contention was representation in Congress. The Virginia Plan, favored by large states, proposed representation based on population. The New Jersey Plan, favored by small states, proposed equal representation for all states. The dispute was resolved by the Great Compromise (or Connecticut Compromise), which created a bicameral (two-house) legislature.',
                    question:
                      'How did the Great Compromise resolve the debate over representation?',
                    answerOptions: [
                      {
                        text: 'It created a single legislative house with representation based on population.',
                        rationale:
                          'This describes the Virginia Plan, which was not adopted in its entirety.',
                        isCorrect: false,
                      },
                      {
                        text: 'It established a system where all states had equal representation in a single house.',
                        rationale:
                          'This describes the New Jersey Plan, which was also not adopted in its entirety.',
                        isCorrect: false,
                      },
                      {
                        text: 'It created a two-house Congress, with one house based on population (House of Representatives) and the other with equal representation (Senate).',
                        rationale:
                          'Correct. This accurately describes the bicameral solution of the Great Compromise, which balanced the interests of both large and small states.',
                        isCorrect: true,
                      },
                      {
                        text: 'It allowed states to choose whether their representation would be equal or based on population.',
                        rationale:
                          'The compromise established a uniform system for all states, not a choice.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 4,
                    type: 'knowledge',
                    question:
                      'The Three-Fifths Compromise, reached during the Constitutional Convention, concerned which of the following issues?',
                    answerOptions: [
                      {
                        text: 'The number of votes required to pass a law.',
                        rationale:
                          'This was determined by the rules of Congress, not the Three-Fifths Compromise.',
                        isCorrect: false,
                      },
                      {
                        text: 'How to count enslaved people for the purposes of representation and taxation.',
                        rationale:
                          "Correct. The compromise determined that three-fifths of the enslaved population would be counted when determining a state's population for representation in the House and for levying federal taxes.",
                        isCorrect: true,
                      },
                      {
                        text: 'The process for admitting new states to the Union.',
                        rationale:
                          'This process was outlined in the Constitution but was not part of the Three-Fifths Compromise.',
                        isCorrect: false,
                      },
                      {
                        text: 'The balance of power between the federal government and the states.',
                        rationale:
                          'This was a broader theme of the convention, addressed by federalism, not this specific compromise.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 5,
                    challenge_tags: ['social-1'],
                    type: 'text',
                    passage:
                      'To prevent any one branch of the new government from becoming too powerful, the framers of the Constitution created a system of checks and balances. For example, the President (Executive Branch) can veto laws passed by Congress (Legislative Branch). Congress can impeach and remove the President. The Supreme Court (Judicial Branch) can declare laws unconstitutional, a power known as judicial review.',
                    question:
                      'Which of the following is an example of the system of checks and balances?',
                    answerOptions: [
                      {
                        text: 'The President issuing an executive order.',
                        rationale:
                          'This is a power of the executive branch, but not in itself an example of checking another branch.',
                        isCorrect: false,
                      },
                      {
                        text: 'The Senate confirming a presidential appointment to the Supreme Court.',
                        rationale:
                          'Correct. This is an example of the Legislative Branch (Senate) checking the power of the Executive Branch (President) to appoint judges.',
                        isCorrect: true,
                      },
                      {
                        text: 'A state government passing a law about local schools.',
                        rationale:
                          'This is an example of federalism, the division of power between state and national governments, not checks and balances between federal branches.',
                        isCorrect: false,
                      },
                      {
                        text: 'A citizen voting in a presidential election.',
                        rationale:
                          'This is an example of popular sovereignty, not the system of checks and balances between the branches of government.',
                        isCorrect: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'ss_us_hist_new_nation_quiz2',
                title: 'A New Nation: Quiz 2',
                questions: [
                  {
                    questionNumber: 1,
                    challenge_tags: ['social-1'],
                    type: 'text',
                    passage:
                      'The U.S. Constitution was amended shortly after ratification to protect individual liberties. Examples include: Amendment I (freedoms of speech, press, religion), Amendment II (right to bear arms), Amendment IV (protection from unreasonable searches), and Amendment X (powers reserved to the states or people).',
                    question:
                      'The first ten amendments to the U.S. Constitution, which guarantee specific individual rights and liberties, are collectively known as:',
                    answerOptions: [
                      {
                        text: 'The Articles of Confederation',
                        rationale:
                          'The Articles were the first form of national government, replaced by the Constitution.',
                        isCorrect: false,
                      },
                      {
                        text: 'The Federalist Papers',
                        rationale:
                          'The Federalist Papers were essays written to persuade people to ratify the Constitution.',
                        isCorrect: false,
                      },
                      {
                        text: 'The Declaration of Independence',
                        rationale:
                          'This document declared separation from Britain but is not part of the Constitution.',
                        isCorrect: false,
                      },
                      {
                        text: 'The Bill of Rights',
                        rationale:
                          'Correct. The first ten amendments are known as the Bill of Rights and were added to protect individual freedoms from government intrusion.',
                        isCorrect: true,
                      },
                    ],
                  },
                  {
                    questionNumber: 2,
                    challenge_tags: ['social-1'],
                    type: 'text',
                    passage:
                      'During the debate over the ratification of the Constitution, two opposing groups emerged. The Federalists, led by figures like Alexander Hamilton and James Madison, supported the Constitution and a strong national government. The Anti-Federalists, led by figures like Patrick Henry and George Mason, opposed the Constitution, fearing it would create a government that was too powerful and would threaten individual liberties. The addition of the Bill of Rights was a key compromise to secure ratification.',
                    question:
                      'Why did the Anti-Federalists push for the inclusion of a Bill of Rights in the Constitution?',
                    answerOptions: [
                      {
                        text: 'To strengthen the power of the national government.',
                        rationale:
                          "They wanted to limit the national government's power, not strengthen it.",
                        isCorrect: false,
                      },
                      {
                        text: 'To protect individual liberties from potential government overreach.',
                        rationale:
                          "Correct. The Anti-Federalists' primary concern was that the new national government would be too powerful and would infringe on the rights of the people, so they demanded a written guarantee of those rights.",
                        isCorrect: true,
                      },
                      {
                        text: 'To ensure the federal government had the power to tax.',
                        rationale:
                          'The power to tax was a key feature of the Constitution that the Anti-Federalists were generally wary of.',
                        isCorrect: false,
                      },
                      {
                        text: 'To create a national bank.',
                        rationale:
                          'The national bank was a later proposal by Hamilton and was not a concern related to the Bill of Rights.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 3,
                    type: 'image',
                    imageUrl: 'Images/Louisiana_Purchase.png',
                    question:
                      'This map illustrates the impact of the Louisiana Purchase in 1803. What was the most significant effect of this event?',
                    answerOptions: [
                      {
                        text: 'It led to an immediate war with France.',
                        rationale:
                          'The purchase was a peaceful transaction with France, not a cause for war.',
                        isCorrect: false,
                      },
                      {
                        text: 'It significantly reduced the size of the United States.',
                        rationale:
                          'The map clearly shows a massive increase in U.S. territory.',
                        isCorrect: false,
                      },
                      {
                        text: 'It nearly doubled the size of the United States and gave it control of the Mississippi River.',
                        rationale:
                          "Correct. The Louisiana Purchase was a massive land acquisition that dramatically increased the nation's size and secured control over the vital Mississippi River trade route.",
                        isCorrect: true,
                      },
                      {
                        text: 'It ended the practice of slavery in all U.S. territories.',
                        rationale:
                          'The purchase intensified the debate over the expansion of slavery into new territories; it did not end it.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 4,
                    type: 'text',
                    passage:
                      'In 1803, President Thomas Jefferson arranged the Louisiana Purchase, doubling the size of the United States. He soon sent the Corps of Discovery to map the new lands, establish relations with Native nations, and seek a practical route to the Pacific.',
                    question:
                      'Who were the two explorers President Jefferson commissioned to lead this expedition?',
                    answerOptions: [
                      {
                        text: 'Alexander Hamilton and Aaron Burr',
                        rationale:
                          'These were political rivals, not explorers of the West.',
                        isCorrect: false,
                      },
                      {
                        text: 'John Adams and John Quincy Adams',
                        rationale:
                          'These were the second and sixth U.S. Presidents.',
                        isCorrect: false,
                      },
                      {
                        text: 'Meriwether Lewis and William Clark',
                        rationale:
                          'Correct. The Lewis and Clark Expedition (1804-1806) was tasked with exploring and mapping the Louisiana Purchase.',
                        isCorrect: true,
                      },
                      {
                        text: 'Daniel Boone and Davy Crockett',
                        rationale:
                          'These were famous frontiersmen but were not the leaders of this official government expedition.',
                        isCorrect: false,
                      },
                    ],
                  },
                  {
                    questionNumber: 5,
                    type: 'text',
                    passage:
                      'The expedition led by Lewis and Clark, also known as the Corps of Discovery, had multiple objectives. They were to map the new territory, establish friendly relations with Native American tribes, document new plant and animal species, and find a practical overland route to the Pacific Ocean. Their journey, which took over two years, provided invaluable information about the American