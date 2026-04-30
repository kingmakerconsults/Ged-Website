// Centralized tool registry — single source of truth for the SubjectToolsModal
// hub and any subject views. Each entry can opt out of the shared <ToolShell>
// chrome via `useShell: false` (for tools that already render their own header,
// such as the Social Studies tools that ship with built-in "← Back" UI).

import GeometryFigure from './GeometryFigure';
import GraphTool from './GraphTool';
import StepByStepSolver from './StepByStepSolver';
import StatisticsTool from './StatisticsTool';
import FormulaSheetModal from './FormulaSheetModal';
import ScienceFormulaSheet from './ScienceFormulaSheet';
import ScienceFormulaPractice from './ScienceFormulaPractice';
import ScienceConceptPractice from './ScienceConceptPractice';
import ChemistryEquationPractice from './ChemistryEquationPractice';
import PunnettSquarePractice from './PunnettSquarePractice';
import Calculator from './Calculator';

import MapExplorer from '../../../tools/MapExplorer';
import CivicsReasoningLab from '../../../tools/CivicsReasoningLab';
import HistoryTimelineBuilder from '../../../tools/HistoryTimelineBuilder';
import ElectoralCollegeSimulator from '../../../tools/ElectoralCollegeSimulator';
import ConstitutionExplorer from '../../../tools/ConstitutionExplorer';
import EconomicsGraphTool from '../../../tools/EconomicsGraphTool';

import TypingPractice from './rla/TypingPractice';
import GrammarDrill from './rla/GrammarDrill';
import VocabInContext from './rla/VocabInContext';
import TransitionPicker from './rla/TransitionPicker';
import EvidenceHighlighter from './rla/EvidenceHighlighter';
import SentenceCombiner from './rla/SentenceCombiner';
import EssayOutlineBuilder from './rla/EssayOutlineBuilder';
import ReadingSpeedTrainer from './rla/ReadingSpeedTrainer';
import PunctuationFix from './rla/PunctuationFix';

/**
 * @typedef {Object} ToolEntry
 * @property {string} id           Stable ID used for routing/persistence.
 * @property {string} name         Display label.
 * @property {string} icon         Emoji or short glyph.
 * @property {string} [description] Short description for the card grid.
 * @property {React.ComponentType<any>} component
 * @property {boolean} [useShell=true] Whether to wrap in <ToolShell>.
 * @property {boolean} [comingSoon=false] Render disabled placeholder card.
 */

const MATH_TOOLS = [
  {
    id: 'calculator',
    name: 'TI-30XS Calculator',
    icon: '🖩',
    description: 'On-screen scientific calculator used on the GED.',
    component: Calculator,
  },
  {
    id: 'formulas',
    name: 'Formula Sheet',
    icon: '📋',
    description: 'Quick-reference for the formulas provided on test day.',
    component: FormulaSheetModal,
  },
  {
    id: 'statistics',
    name: 'Statistics Calculator',
    icon: '📈',
    description: 'Compute mean, median, mode, range and practice problems.',
    component: StatisticsTool,
  },
  {
    id: 'geometry',
    name: 'Geometry Figures',
    icon: '📐',
    description: 'Visualize basic shapes (renderer; behind feature flag).',
    component: GeometryFigure,
  },
  {
    id: 'graph',
    name: 'Graphing Tool',
    icon: '📊',
    description: 'Interactive coordinate plane (JSXGraph).',
    component: GraphTool,
  },
  {
    id: 'solver',
    name: 'Step-by-Step Solver',
    icon: '🧮',
    description:
      'Walk through algebra, percent, proportion, and PEMDAS problems step by step.',
    component: StepByStepSolver,
  },
];

const SCIENCE_TOOLS = [
  {
    id: 'formulas',
    name: 'Formula Sheet',
    icon: '🧪',
    description: 'Density, speed, force, work and statistical formulas.',
    component: ScienceFormulaSheet,
  },
  {
    id: 'formula-practice',
    name: 'Formula Practice',
    icon: '⚗️',
    description: 'Solve real numeric problems using science formulas.',
    component: ScienceFormulaPractice,
  },
  {
    id: 'concept-practice',
    name: 'Concept Practice',
    icon: '🔬',
    description: 'Multiple-choice questions across the science domains.',
    component: ScienceConceptPractice,
  },
  {
    id: 'punnett-square',
    name: 'Punnett Square Practice',
    icon: '🧬',
    description: 'Genetics crosses with allele input and ratios.',
    component: PunnettSquarePractice,
  },
  {
    id: 'chemistry-equations',
    name: 'Chemistry Equations',
    icon: '⚛️',
    description: 'Balance chemical equations with hints and feedback.',
    component: ChemistryEquationPractice,
  },
];

// Social Studies tools render their own header/back UI, so we skip the shell.
const SOCIAL_TOOLS = [
  {
    id: 'map-explorer',
    name: 'Map Explorer',
    icon: '🗺️',
    description: 'US regions and world maps with interactive labels.',
    component: MapExplorer,
    useShell: false,
  },
  {
    id: 'civics-reasoning',
    name: 'Civics Reasoning Lab',
    icon: '🏛️',
    description: 'Branches, levels, and powers of government.',
    component: CivicsReasoningLab,
    useShell: false,
  },
  {
    id: 'history-timeline',
    name: 'History Timeline Builder',
    icon: '📜',
    description: 'Reorder historical events to test chronology.',
    component: HistoryTimelineBuilder,
    useShell: false,
  },
  {
    id: 'constitution-explorer',
    name: 'Constitution Explorer',
    icon: '📋',
    description: 'Browse amendments and match scenarios to rights.',
    component: ConstitutionExplorer,
    useShell: false,
  },
  {
    id: 'electoral-college',
    name: 'Electoral College Simulator',
    icon: '🗳️',
    description: 'Practice electoral math and swing-state scenarios.',
    component: ElectoralCollegeSimulator,
    useShell: false,
  },
  {
    id: 'economics-market',
    name: 'Economics Market Simulator',
    icon: '💰',
    description: 'Supply and demand sliders with shift scenarios.',
    component: EconomicsGraphTool,
    useShell: false,
  },
];

const RLA_TOOLS = [
  {
    id: 'typing-practice',
    name: 'Typing Practice',
    icon: '⌨️',
    description: 'Build typing speed and accuracy with GED-flavored sentences.',
    component: TypingPractice,
  },
  {
    id: 'grammar-drill',
    name: 'Grammar Drill',
    icon: '✏️',
    description:
      'Quick MCQs on subject-verb agreement, punctuation, and modifiers.',
    component: GrammarDrill,
  },
  {
    id: 'vocab-in-context',
    name: 'Vocabulary in Context',
    icon: '📚',
    description: 'Determine word meaning from how it is used in a sentence.',
    component: VocabInContext,
  },
  {
    id: 'transition-picker',
    name: 'Transition Word Picker',
    icon: '🔗',
    description: 'Choose the best connector to link two related sentences.',
    component: TransitionPicker,
  },
  {
    id: 'evidence-highlighter',
    name: 'Evidence Highlighter',
    icon: '🔍',
    description: 'Click the sentence that best supports a claim.',
    component: EvidenceHighlighter,
  },
  {
    id: 'sentence-combiner',
    name: 'Sentence Combiner',
    icon: '🧩',
    description: 'Merge choppy sentences into one polished sentence.',
    component: SentenceCombiner,
  },
  {
    id: 'essay-outline',
    name: 'Essay Outline Builder',
    icon: '🗒️',
    description: 'Scaffold a thesis, evidence, and counterclaim outline.',
    component: EssayOutlineBuilder,
  },
  {
    id: 'reading-speed',
    name: 'Reading Speed Trainer',
    icon: '⏱️',
    description: 'Time a passage, then check comprehension with a quick MCQ.',
    component: ReadingSpeedTrainer,
  },
  {
    id: 'punctuation-fix',
    name: 'Punctuation Fix',
    icon: '❗',
    description:
      'Repair commas, semicolons, and apostrophes in real sentences.',
    component: PunctuationFix,
  },
];

export const TOOL_REGISTRY = {
  Math: MATH_TOOLS,
  Science: SCIENCE_TOOLS,
  'Reasoning Through Language Arts (RLA)': RLA_TOOLS,
  'Social Studies': SOCIAL_TOOLS,
};

/** Get the tool list for a subject (case/whitespace tolerant). */
export function getToolsForSubject(subject) {
  if (!subject) return [];
  if (TOOL_REGISTRY[subject]) return TOOL_REGISTRY[subject];
  // Loose match: try to find by lowercased start
  const key = Object.keys(TOOL_REGISTRY).find(
    (k) => k.toLowerCase() === String(subject).toLowerCase()
  );
  return key ? TOOL_REGISTRY[key] : [];
}

/** Find one entry by subject + tool id. */
export function getTool(subject, id) {
  return getToolsForSubject(subject).find((t) => t.id === id) || null;
}
