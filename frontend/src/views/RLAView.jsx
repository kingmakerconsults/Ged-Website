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
    <div className="rla-view min-h-screen p-6 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div
        className="header-section mb-8 p-6 rounded-2xl shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
        }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: theme.text }}>
          Reasoning Through Language Arts
        </h1>
        <p className="text-lg opacity-90" style={{ color: theme.text }}>
          Practice reading comprehension, writing, and language skills
        </p>
      </div>

      {/* Content Area */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">RLA Practice Tools</h2>

        <div className="tools-grid grid md:grid-cols-2 gap-6">
          <div
            className="glass-card card-lift rounded-xl p-6"
            style={{ borderLeft: `4px solid ${theme.primary}` }}
          >
            <h3 className="text-xl font-semibold mb-2">Reading Passages</h3>
            <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">
              Practice with fiction, nonfiction, and informational texts.
              Analyze themes, main ideas, and supporting details.
            </p>
            <span className="px-4 py-2 rounded-xl font-medium inline-block bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed">
              Coming Soon
            </span>
          </div>

          <div className="glass-card rounded-xl p-6 opacity-60">
            <h3 className="text-xl font-semibold mb-2">Writing Practice</h3>
            <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">
              Coming soon: Practice extended response essays with guided prompts
              and scoring rubrics.
            </p>
            <span className="px-4 py-2 rounded-xl font-medium inline-block bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed">
              Coming Soon
            </span>
          </div>

          <div className="glass-card rounded-xl p-6 opacity-60">
            <h3 className="text-xl font-semibold mb-2">Grammar & Mechanics</h3>
            <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">
              Coming soon: Master grammar rules, punctuation, capitalization,
              and sentence structure.
            </p>
            <span className="px-4 py-2 rounded-xl font-medium inline-block bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed">
              Coming Soon
            </span>
          </div>

          <div className="glass-card rounded-xl p-6 opacity-60">
            <h3 className="text-xl font-semibold mb-2">Critical Analysis</h3>
            <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">
              Coming soon: Analyze arguments, evaluate evidence, and make
              inferences from complex texts.
            </p>
            <span className="px-4 py-2 rounded-xl font-medium inline-block bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed">
              Coming Soon
            </span>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-3">GED RLA Topics</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <strong>Reading Comprehension:</strong> Fiction, nonfiction,
            informational texts
          </li>
          <li>
            <strong>Extended Response:</strong> Essay writing with
            evidence-based arguments
          </li>
          <li>
            <strong>Language Conventions:</strong> Grammar, usage, and mechanics
          </li>
          <li>
            <strong>Critical Thinking:</strong> Analysis, inference, and
            evaluation
          </li>
        </ul>

        <div
          className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-white/5"
          style={{ borderLeft: `4px solid ${theme.primary}` }}
        >
          <h4 className="font-semibold mb-2">Study Tip</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Focus on active reading strategies: annotate passages, identify main
            ideas, and practice summarizing information in your own words.
          </p>
        </div>
      </div>
    </div>
  );
}
