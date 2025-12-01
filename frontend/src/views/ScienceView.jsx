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
    <div
      className="science-view min-h-screen p-6"
      style={{
        backgroundColor: dark ? '#0f172a' : '#f8fafc',
        color: dark ? '#e2e8f0' : '#1e293b',
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
          🧪 Science
        </h1>
        <p className="text-lg opacity-90" style={{ color: theme.text }}>
          Practice with GED-aligned science formulas and concepts
        </p>
      </div>

      {/* Formula Sheet Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowFormulaSheet(true)}
          className="px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
          style={{
            backgroundColor: theme.primary,
            color: theme.text,
          }}
        >
          🧪 Open Science Formula Sheet
        </button>
      </div>

      {/* Content Area */}
      <div
        className="content-section p-6 rounded-lg"
        style={{
          backgroundColor: dark ? '#1e293b' : '#ffffff',
          border: `2px solid ${dark ? '#334155' : '#e2e8f0'}`,
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Science Practice Tools</h2>

        <div className="tools-grid grid md:grid-cols-2 gap-6">
          <div
            className="tool-card p-6 rounded-lg"
            style={{
              backgroundColor: dark ? '#334155' : '#f1f5f9',
              border: `2px solid ${theme.primary}`,
            }}
          >
            <div className="text-4xl mb-3">🧪</div>
            <h3 className="text-xl font-semibold mb-2">Formula Sheet</h3>
            <p
              className="text-sm mb-4"
              style={{ color: dark ? '#94a3b8' : '#64748b' }}
            >
              Access key science formulas including density, speed, force, work,
              and statistical measures.
            </p>
            <button
              onClick={() => setShowFormulaSheet(true)}
              className="px-4 py-2 rounded font-medium"
              style={{
                backgroundColor: theme.primary,
                color: theme.text,
              }}
            >
              Open
            </button>
          </div>

          <div
            className="tool-card p-6 rounded-lg"
            style={{
              backgroundColor: dark ? '#334155' : '#f1f5f9',
              border: `2px solid ${dark ? '#334155' : '#e2e8f0'}`,
            }}
          >
            <div className="text-4xl mb-3">🔬</div>
            <h3 className="text-xl font-semibold mb-2">Practice Questions</h3>
            <p
              className="text-sm mb-4"
              style={{ color: dark ? '#94a3b8' : '#64748b' }}
            >
              Coming soon: Interactive science questions covering life science,
              physical science, and earth/space science.
            </p>
            <button
              disabled
              className="px-4 py-2 rounded font-medium opacity-50 cursor-not-allowed"
              style={{
                backgroundColor: dark ? '#475569' : '#cbd5e1',
                color: dark ? '#94a3b8' : '#64748b',
              }}
            >
              Coming Soon
            </button>
          </div>

          <div
            className="tool-card p-6 rounded-lg"
            style={{
              backgroundColor: dark ? '#334155' : '#f1f5f9',
              border: `2px solid ${dark ? '#334155' : '#e2e8f0'}`,
            }}
          >
            <div className="text-4xl mb-3">🌍</div>
            <h3 className="text-xl font-semibold mb-2">Interactive Diagrams</h3>
            <p
              className="text-sm mb-4"
              style={{ color: dark ? '#94a3b8' : '#64748b' }}
            >
              Coming soon: Label diagrams, explore systems, and visualize
              scientific concepts.
            </p>
            <button
              disabled
              className="px-4 py-2 rounded font-medium opacity-50 cursor-not-allowed"
              style={{
                backgroundColor: dark ? '#475569' : '#cbd5e1',
                color: dark ? '#94a3b8' : '#64748b',
              }}
            >
              Coming Soon
            </button>
          </div>

          <div
            className="tool-card p-6 rounded-lg"
            style={{
              backgroundColor: dark ? '#334155' : '#f1f5f9',
              border: `2px solid ${dark ? '#334155' : '#e2e8f0'}`,
            }}
          >
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-xl font-semibold mb-2">Data Analysis</h3>
            <p
              className="text-sm mb-4"
              style={{ color: dark ? '#94a3b8' : '#64748b' }}
            >
              Coming soon: Analyze scientific data, interpret graphs, and draw
              evidence-based conclusions.
            </p>
            <button
              disabled
              className="px-4 py-2 rounded font-medium opacity-50 cursor-not-allowed"
              style={{
                backgroundColor: dark ? '#475569' : '#cbd5e1',
                color: dark ? '#94a3b8' : '#64748b',
              }}
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>

      {/* Formula Sheet Modal */}
      {showFormulaSheet && (
        <ScienceFormulaSheet onClose={() => setShowFormulaSheet(false)} />
      )}

      {/* Info Section */}
      <div
        className="info-section mt-8 p-6 rounded-lg"
        style={{
          backgroundColor: dark ? '#1e293b' : '#ffffff',
          border: `2px solid ${dark ? '#334155' : '#e2e8f0'}`,
        }}
      >
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
