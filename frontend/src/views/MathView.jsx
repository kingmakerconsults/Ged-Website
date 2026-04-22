import React, { useState } from 'react';
import { getSubjectTheme } from '../theme/designSystem';
import FormulaSheetModal from '../components/tools/FormulaSheetModal';
import { getToolsForSubject } from '../components/tools/registry';

/**
 * MathView - Mathematical Reasoning subject view
 *
 * Displays all math-specific tools and provides a practice environment
 * for GED Mathematical Reasoning content.
 */
export default function MathView({ dark = false }) {
  const [showFormulaSheet, setShowFormulaSheet] = useState(false);

  const theme = getSubjectTheme('math', dark);

  // Pull tools from the central registry, but skip the formula sheet (we expose
  // it via the dedicated button) and the calculator (handled elsewhere).
  const registryTools = getToolsForSubject('Math').filter(
    (t) => t.id !== 'formulas' && t.id !== 'calculator'
  );
  const tools = registryTools.map((t) => ({
    id: t.id,
    name: `${t.icon} ${t.name}`,
    component: t.component,
    comingSoon: !!t.comingSoon,
  }));

  const initialTool = tools.find((t) => !t.comingSoon)?.id || tools[0]?.id;
  const [selectedTool, setSelectedTool] = useState(initialTool);

  const ActiveToolComponent = tools.find(
    (t) => t.id === selectedTool
  )?.component;

  return (
    <div className="math-view min-h-screen p-6 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div
        className="header-section mb-8 p-6 rounded-2xl shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
        }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: theme.text }}>
          Mathematical Reasoning
        </h1>
        <p className="text-lg opacity-90" style={{ color: theme.text }}>
          Practice with GED-aligned math tools and formulas
        </p>
      </div>

      {/* Formula Sheet Button */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setShowFormulaSheet(true)}
          className="px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all text-white"
          style={{ backgroundColor: theme.primary }}
        >
          Open Formula Sheet
        </button>
      </div>

      {/* Tool Selector */}
      <div className="tool-selector mb-6">
        <h2 className="text-xl font-semibold mb-3">Select a Tool:</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`p-4 rounded-xl font-medium transition-all ${
                selectedTool === tool.id
                  ? 'ring-2 ring-sky-500 shadow-lg bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300'
                  : 'glass-card card-lift text-slate-700 dark:text-slate-300'
              }`}
            >
              {tool.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tool Display */}
      <div className="tool-display-area">
        {ActiveToolComponent ? (
          <ActiveToolComponent />
        ) : (
          <div className="text-center py-12 text-slate-500">
            Select a tool above to get started
          </div>
        )}
      </div>

      {/* Formula Sheet Modal */}
      {showFormulaSheet && (
        <FormulaSheetModal
          asModal
          dark={dark}
          onClose={() => setShowFormulaSheet(false)}
        />
      )}

      {/* Info Section */}
      <div className="info-section mt-8 glass-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-3">About Math Tools</h3>
        <ul className="space-y-2 text-sm">
          <li>
            📐 <strong>Geometry Figures:</strong> Visualize shapes and
            measurements
          </li>
          <li>
            📊 <strong>Graphing Tool:</strong> Plot points and analyze functions
          </li>
          <li>
            🧮 <strong>Step-by-Step Solver:</strong> Solve equations with
            explanations
          </li>
          <li>
            📈 <strong>Statistics Calculator:</strong> Calculate mean, median,
            mode, range
          </li>
        </ul>
      </div>
    </div>
  );
}
