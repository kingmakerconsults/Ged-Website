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
    description: 'Walk through algebra, percent, proportion, and PEMDAS problems step by step.',
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

export const TOOL_REGISTRY = {
  Math: MATH_TOOLS,
  Science: SCIENCE_TOOLS,
  'Reasoning Through Language Arts (RLA)': [],
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
