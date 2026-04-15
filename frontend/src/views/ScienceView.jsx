import React, { useState } from 'react';
import { getSubjectTheme } from '../theme/designSystem';
import ScienceFormulaSheet from '../components/tools/ScienceFormulaSheet';

/**
 * ScienceView - Science subject view
 *
 * Displays science-specific tools and provides a practice environment
 * for GED Science content.
 */
export default function ScienceView({ dark = false }) {
  const [showFormulaSheet, setShowFormulaSheet] = useState(false);

  const theme = getSubjectTheme('science', dark);

  return (
    <div className="science-view min-h-screen p-6 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div
        className="header-section mb-8 p-6 rounded-2xl shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
        }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: theme.text }}>
          Science
        </h1>
        <p className="text-lg opacity-90" style={{ color: theme.text }}>
          Practice with GED-aligned science formulas and concepts
        </p>
      </div>

      {/* Formula Sheet Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowFormulaSheet(true)}
          className="px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all text-white"
          style={{ backgroundColor: theme.primary }}
        >
          Open Science Formula Sheet
        </button>
      </div>

      {/* Content Area */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Science Practice Tools</h2>

        <div className="tools-grid grid md:grid-cols-2 gap-6">
          <div
            className="glass-card card-lift rounded-xl p-6"
            style={{ borderLeft: `4px solid ${theme.primary}` }}
          >
            <h3 className="text-xl font-semibold mb-2">Formula Sheet</h3>
            <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">
              Access key science formulas including density, speed, force, work,
              and statistical measures.
            </p>
            <button
              onClick={() => setShowFormulaSheet(true)}
              className="px-4 py-2 rounded-xl font-medium text-white"
              style={{ backgroundColor: theme.primary }}
            >
              Open
            </button>
          </div>

          <div className="glass-card rounded-xl p-6 opacity-60">
            <h3 className="text-xl font-semibold mb-2">Practice Questions</h3>
            <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">
              Coming soon: Interactive science questions covering life science,
              physical science, and earth/space science.
            </p>
            <span className="px-4 py-2 rounded-xl font-medium inline-block bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed">
              Coming Soon
            </span>
          </div>

          <div className="glass-card rounded-xl p-6 opacity-60">
            <h3 className="text-xl font-semibold mb-2">Interactive Diagrams</h3>
            <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">
              Coming soon: Label diagrams, explore systems, and visualize
              scientific concepts.
            </p>
            <span className="px-4 py-2 rounded-xl font-medium inline-block bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed">
              Coming Soon
            </span>
          </div>

          <div className="glass-card rounded-xl p-6 opacity-60">
            <h3 className="text-xl font-semibold mb-2">Data Analysis</h3>
            <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">
              Coming soon: Analyze scientific data, interpret graphs, and draw
              evidence-based conclusions.
            </p>
            <span className="px-4 py-2 rounded-xl font-medium inline-block bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed">
              Coming Soon
            </span>
          </div>
        </div>
      </div>

      {/* Formula Sheet Modal */}
      {showFormulaSheet && (
        <ScienceFormulaSheet onClose={() => setShowFormulaSheet(false)} />
      )}

      {/* Info Section */}
      <div className="info-section mt-8 glass-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-3">GED Science Topics</h3>
        <ul className="space-y-2 text-sm">
          <li>
            🧬 <strong>Life Science:</strong> Cells, genetics, evolution,
            ecology
          </li>
          <li>
            ⚛️ <strong>Physical Science:</strong> Physics, chemistry, energy,
            matter
          </li>
          <li>
            🌎 <strong>Earth & Space Science:</strong> Geology, weather,
            astronomy
          </li>
          <li>
            🔬 <strong>Scientific Practices:</strong> Data analysis,
            experimental design
          </li>
        </ul>
      </div>
    </div>
  );
}
