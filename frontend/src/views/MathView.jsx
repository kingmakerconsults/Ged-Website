import React, { useState } from 'react';
import { getSubjectTheme } from '../theme/designSystem';
import GeometryFigure from '../components/tools/GeometryFigure';
import GraphTool from '../components/tools/GraphTool';
import StepByStepSolver from '../components/tools/StepByStepSolver';
import StatisticsTool from '../components/tools/StatisticsTool';
import FormulaSheetModal from '../components/tools/FormulaSheetModal';

/**
 * MathView - Mathematical Reasoning subject view
 * 
 * Displays all math-specific tools and provides a practice environment
 * for GED Mathematical Reasoning content.
 */
export default function MathView({ dark = false }) {
  const [showFormulaSheet, setShowFormulaSheet] = useState(false);
  const [selectedTool, setSelectedTool] = useState('geometry');
  
  const theme = getSubjectTheme('math', dark);

  const tools = [
    { id: 'geometry', name: '📐 Geometry Figures', component: GeometryFigure },
    { id: 'graph', name: '📊 Graphing Tool', component: GraphTool },
    { id: 'solver', name: '🧮 Step-by-Step Solver', component: StepByStepSolver },
    { id: 'statistics', name: '📈 Statistics Calculator', component: StatisticsTool },
  ];

  const ActiveToolComponent = tools.find(t => t.id === selectedTool)?.component;

  return (
    <div 
      className="math-view min-h-screen p-6"
      style={{ 
        backgroundColor: dark ? '#0f172a' : '#f8fafc',
        color: dark ? '#e2e8f0' : '#1e293b'
      }}
    >
      {/* Header */}
      <div 
        className="header-section mb-8 p-6 rounded-xl shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
        }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: theme.text }}>
          🔢 Mathematical Reasoning
        </h1>
        <p className="text-lg opacity-90" style={{ color: theme.text }}>
          Practice with GED-aligned math tools and formulas
        </p>
      </div>

      {/* Formula Sheet Button */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setShowFormulaSheet(true)}
          className="px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
          style={{
            backgroundColor: theme.primary,
            color: theme.text,
          }}
        >
          📋 Open Formula Sheet
        </button>
      </div>

      {/* Tool Selector */}
      <div className="tool-selector mb-6">
        <h2 className="text-xl font-semibold mb-3">Select a Tool:</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`p-4 rounded-lg font-medium transition-all ${
                selectedTool === tool.id
                  ? 'ring-4 shadow-lg'
                  : 'shadow hover:shadow-md'
              }`}
              style={{
                backgroundColor: selectedTool === tool.id 
                  ? (dark ? '#1e3a8a' : '#dbeafe')
                  : (dark ? '#334155' : '#ffffff'),
                color: selectedTool === tool.id
                  ? (dark ? '#93c5fd' : '#1e40af')
                  : (dark ? '#e2e8f0' : '#1e293b'),
                borderColor: selectedTool === tool.id ? theme.primary : 'transparent',
              }}
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
        <FormulaSheetModal onClose={() => setShowFormulaSheet(false)} />
      )}

      {/* Info Section */}
      <div 
        className="info-section mt-8 p-6 rounded-lg"
        style={{
          backgroundColor: dark ? '#1e293b' : '#ffffff',
          border: `2px solid ${dark ? '#334155' : '#e2e8f0'}`,
        }}
      >
        <h3 className="text-lg font-semibold mb-3">About Math Tools</h3>
        <ul className="space-y-2 text-sm">
          <li>📐 <strong>Geometry Figures:</strong> Visualize shapes and measurements</li>
          <li>📊 <strong>Graphing Tool:</strong> Plot points and analyze functions</li>
          <li>🧮 <strong>Step-by-Step Solver:</strong> Solve equations with explanations</li>
          <li>📈 <strong>Statistics Calculator:</strong> Calculate mean, median, mode, range</li>
        </ul>
      </div>
    </div>
  );
}
