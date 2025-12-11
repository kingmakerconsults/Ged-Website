import React, { useState } from 'react';
import { getSubjectTheme } from '../theme/designSystem';
import GeometryFigure from './tools/GeometryFigure';
import GraphTool from './tools/GraphTool';
import StepByStepSolver from './tools/StepByStepSolver';
import StatisticsTool from './tools/StatisticsTool';
import FormulaSheetModal from './tools/FormulaSheetModal';
import ScienceFormulaSheet from './tools/ScienceFormulaSheet';
import ScienceFormulaPractice from './tools/ScienceFormulaPractice';
import ScienceConceptPractice from './tools/ScienceConceptPractice';
import ChemistryEquationPractice from './tools/ChemistryEquationPractice';
import Calculator from './tools/Calculator';

/**
 * SubjectToolsModal - Centralized tools panel for each subject
 * Houses all subject-specific tools in a clean modal interface
 */
export default function SubjectToolsModal({ subject, dark = false, onClose }) {
  const [selectedTool, setSelectedTool] = useState(null);
  const theme = getSubjectTheme(subject?.toLowerCase(), dark);

  // Define tools per subject
  const toolsConfig = {
    Math: [
      {
        id: 'calculator',
        name: 'TI-30XS Calculator',
        icon: '🖩',
        component: Calculator,
      },
      {
        id: 'geometry',
        name: 'Geometry Figures',
        icon: '📐',
        component: GeometryFigure,
      },
      { id: 'graph', name: 'Graphing Tool', icon: '📊', component: GraphTool },
      {
        id: 'solver',
        name: 'Step-by-Step Solver',
        icon: '🧮',
        component: StepByStepSolver,
      },
      {
        id: 'statistics',
        name: 'Statistics Calculator',
        icon: '📈',
        component: StatisticsTool,
      },
      {
        id: 'formulas',
        name: 'Formula Sheet',
        icon: '📋',
        component: FormulaSheetModal,
      },
    ],
    Science: [
      {
        id: 'formulas',
        name: 'Formula Sheet',
        icon: '🧪',
        component: ScienceFormulaSheet,
      },
      {
        id: 'formula-practice',
        name: 'Formula Practice',
        icon: '⚗️',
        component: ScienceFormulaPractice,
      },
      {
        id: 'concept-practice',
        name: 'Concept Practice',
        icon: '🔬',
        component: ScienceConceptPractice,
      },
      {
        id: 'chemistry-equations',
        name: 'Chemistry Equations',
        icon: '⚛️',
        component: ChemistryEquationPractice,
      },
    ],
    'Reasoning Through Language Arts (RLA)': [
      // Future: Reading comprehension tools, grammar checkers, etc.
    ],
    'Social Studies': [
      // Future: Map tools, timeline tools, etc.
    ],
  };

  const tools = toolsConfig[subject] || [];
  const ActiveToolComponent = tools.find(
    (t) => t.id === selectedTool
  )?.component;

  if (!subject) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{
          backgroundColor: dark ? '#1e293b' : '#ffffff',
          border: `2px solid ${theme?.accent || '#64748b'}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-6 flex items-center justify-between"
          style={{
            background:
              theme?.gradient ||
              'linear-gradient(135deg, #64748b 0%, #475569 100%)',
            color: '#ffffff',
          }}
        >
          <div>
            <h2 className="text-2xl font-bold">{subject} Tools</h2>
            <p className="text-sm opacity-90 mt-1">
              Select a tool below to access practice resources
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-3xl font-bold hover:opacity-80 transition-opacity w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/20"
            aria-label="Close tools panel"
          >
            ×
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedTool ? (
            // Tool Grid - Selection View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.length > 0 ? (
                tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className="p-6 rounded-xl border-2 text-left transition-all hover:scale-105 hover:shadow-lg"
                    style={{
                      backgroundColor: dark ? '#334155' : '#f8fafc',
                      borderColor: theme?.accent || '#64748b',
                      color: dark ? '#e2e8f0' : '#1e293b',
                    }}
                  >
                    <div className="text-5xl mb-3">{tool.icon}</div>
                    <h3 className="text-lg font-bold mb-2">{tool.name}</h3>
                    <p className="text-sm opacity-75">Click to open</p>
                  </button>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4">🚧</div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: dark ? '#e2e8f0' : '#1e293b' }}
                  >
                    Tools Coming Soon
                  </h3>
                  <p
                    className="text-sm opacity-75"
                    style={{ color: dark ? '#94a3b8' : '#64748b' }}
                  >
                    Subject-specific tools are being developed
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Tool Display - Active Tool View
            <div>
              <button
                onClick={() => setSelectedTool(null)}
                className="mb-4 px-4 py-2 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: dark ? '#475569' : '#e2e8f0',
                  color: dark ? '#e2e8f0' : '#1e293b',
                }}
              >
                ← Back to Tools
              </button>

              {ActiveToolComponent && (
                <ActiveToolComponent
                  onClose={() => setSelectedTool(null)}
                  dark={dark}
                />
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="p-4 border-t flex justify-between items-center"
          style={{
            backgroundColor: dark ? '#0f172a' : '#f8fafc',
            borderColor: dark ? '#334155' : '#e2e8f0',
            color: dark ? '#94a3b8' : '#64748b',
          }}
        >
          <span className="text-sm">
            {tools.length} tool{tools.length !== 1 ? 's' : ''} available
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: theme?.accent || '#64748b',
              color: '#ffffff',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
