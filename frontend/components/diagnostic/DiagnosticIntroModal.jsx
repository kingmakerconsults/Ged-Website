/**
 * DiagnosticIntroModal - Shows before starting the diagnostic
 * Explains the test format, timing, and importance
 */

export function DiagnosticIntroModal({ onStart, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-8 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            GED Baseline Diagnostic
          </h1>
          <p className="text-blue-100 text-lg">
            Identify your strengths and areas for growth
          </p>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-8 space-y-8">
          {/* Key Facts */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              What to Expect
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  40
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-semibold">
                  Questions
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  10 per subject area
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  90
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-semibold">
                  Minutes
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Recommended time
                </div>
              </div>

              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  4
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-semibold">
                  Subject Areas
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Math, Science, RLA, Social Studies
                </div>
              </div>
            </div>
          </section>

          {/* Why It Matters */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Why This Matters
            </h2>
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-4 space-y-3">
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">🎯</span>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    Baseline Assessment
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    Establishes your starting point to measure progress over
                    time
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">💪</span>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    Personalized Learning
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    Identifies your top challenge areas so you can focus your
                    study
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">📊</span>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    Goal Setting
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    Helps set realistic targets and track improvement in each
                    subject
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Test Format */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Test Format
            </h2>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <p className="flex gap-2">
                <span className="font-semibold">✓</span>
                <span>
                  <strong>Calculator:</strong> Permitted for most questions
                </span>
              </p>
              <p className="flex gap-2">
                <span className="font-semibold">✓</span>
                <span>
                  <strong>Formula Sheet:</strong> Available for Math & Science
                </span>
              </p>
              <p className="flex gap-2">
                <span className="font-semibold">✓</span>
                <span>
                  <strong>Question Types:</strong> Multiple choice,
                  fill-in-the-blank, and more
                </span>
              </p>
              <p className="flex gap-2">
                <span className="font-semibold">✓</span>
                <span>
                  <strong>No Retakes:</strong> This diagnostic is one-time per
                  student
                </span>
              </p>
            </div>
          </section>

          {/* Important Note */}
          <section>
            <div className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-600 dark:border-blue-400 p-4 rounded">
              <div className="flex gap-3">
                <span className="text-2xl">ℹ️</span>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    One-Time Baseline
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    Each student takes the diagnostic once. Your results will be
                    saved and your learning challenges automatically updated.
                    You can always take practice quizzes to improve specific
                    areas.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Buttons */}
        <div className="border-t border-slate-200 dark:border-slate-700 px-6 sm:px-8 py-6 flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={onStart}
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Start Diagnostic
          </button>
        </div>
      </div>
    </div>
  );
}

export default DiagnosticIntroModal;
