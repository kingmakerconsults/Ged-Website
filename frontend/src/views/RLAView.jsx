import React from 'react';
import { getSubjectTheme } from '../theme/designSystem';

/**
 * RLAView - Reasoning Through Language Arts subject view
 *
 * Displays RLA-specific content and provides a practice environment
 * for GED Reasoning Through Language Arts.
 */
export default function RLAView({ dark = false }) {
  const theme = getSubjectTheme('rla', dark);

  return (
    <div
      className="rla-view min-h-screen p-6"
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
          📚 Reasoning Through Language Arts
        </h1>
        <p className="text-lg opacity-90" style={{ color: theme.text }}>
          Practice reading comprehension, writing, and language skills
        </p>
      </div>

      {/* Content Area */}
      <div
        className="content-section p-6 rounded-lg mb-6"
        style={{
          backgroundColor: dark ? '#1e293b' : '#ffffff',
          border: `2px solid ${dark ? '#334155' : '#e2e8f0'}`,
        }}
      >
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: dark ? '#ffffff' : undefined }}
        >
          RLA Practice Tools
        </h2>

        <div className="tools-grid grid md:grid-cols-2 gap-6">
          <div
            className="tool-card p-6 rounded-lg"
            style={{
              backgroundColor: dark ? '#5b21b6' : theme.bgSoft,
              border: `2px solid ${theme.primary}`,
            }}
          >
            <div className="text-4xl mb-3">📖</div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: dark ? '#ddd6fe' : theme.primary }}
            >
              Reading Passages
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: dark ? '#e2e8f0' : '#64748b' }}
            >
              Practice with fiction, nonfiction, and informational texts.
              Analyze themes, main ideas, and supporting details.
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
            <div className="text-4xl mb-3">✍️</div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: dark ? '#ffffff' : undefined }}
            >
              Writing Practice
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: dark ? '#e2e8f0' : '#64748b' }}
            >
              Coming soon: Practice extended response essays with guided prompts
              and scoring rubrics.
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
            <div className="text-4xl mb-3">📝</div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: dark ? '#ffffff' : undefined }}
            >
              Grammar & Mechanics
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: dark ? '#e2e8f0' : '#64748b' }}
            >
              Coming soon: Master grammar rules, punctuation, capitalization,
              and sentence structure.
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
            <div className="text-4xl mb-3">🔍</div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: dark ? '#ffffff' : undefined }}
            >
              Critical Analysis
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: dark ? '#e2e8f0' : '#64748b' }}
            >
              Coming soon: Analyze arguments, evaluate evidence, and make
              inferences from complex texts.
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

      {/* Info Section */}
      <div
        className="info-section p-6 rounded-lg"
        style={{
          backgroundColor: dark ? '#1e293b' : '#ffffff',
          border: `2px solid ${dark ? '#334155' : '#e2e8f0'}`,
        }}
      >
        <h3
          className="text-lg font-semibold mb-3"
          style={{ color: dark ? '#ffffff' : undefined }}
        >
          GED RLA Topics
        </h3>
        <ul className="space-y-2 text-sm">
          <li>
            📖 <strong>Reading Comprehension:</strong> Fiction, nonfiction,
            informational texts
          </li>
          <li>
            ✍️ <strong>Extended Response:</strong> Essay writing with
            evidence-based arguments
          </li>
          <li>
            📝 <strong>Language Conventions:</strong> Grammar, usage, and
            mechanics
          </li>
          <li>
            🔍 <strong>Critical Thinking:</strong> Analysis, inference, and
            evaluation
          </li>
        </ul>

        <div
          className="mt-6 p-4 rounded-lg"
          style={{
            backgroundColor: dark ? '#334155' : '#f1f5f9',
            borderLeft: `4px solid ${theme.primary}`,
          }}
        >
          <h4
            className="font-semibold mb-2"
            style={{ color: dark ? '#ffffff' : undefined }}
          >
            💡 Study Tip
          </h4>
          <p
            className="text-sm"
            style={{ color: dark ? '#e2e8f0' : undefined }}
          >
            Focus on active reading strategies: annotate passages, identify main
            ideas, and practice summarizing information in your own words.
          </p>
        </div>
      </div>
    </div>
  );
}
