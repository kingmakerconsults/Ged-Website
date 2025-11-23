// Centralized component exports for easier imports
// Components are gradually being converted to ES modules

export { AuthScreen } from './auth/AuthScreen.jsx';
export {
  JoinOrganizationModal,
  NamePromptModal,
  PracticeSessionModal,
} from './modals/index.jsx';

// TODO: Add more component exports as they're converted:
// export { QuizInterface } from './quiz/QuizInterface.jsx';
// export { DashboardView } from './views/DashboardView.jsx';
// export { ProfileView } from './profile/ProfileView.jsx';
// etc.
export {
  FormulaSheetModal,
  ScienceFormulaSheet,
  FormulaDisplay,
} from './formula/FormulaSheets.jsx';
export { MathText } from './math/MathText.jsx';
export { GeometryFigure } from './geometry/GeometryFigure.jsx';
export { ChartDisplay } from './charts/ChartDisplay.jsx';
