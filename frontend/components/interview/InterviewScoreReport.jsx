/**
 * Interview Score Report Component
 * Displays interview practice score with strengths, weaknesses, and suggestions
 */

const { default: React } = window.React || {};

function InterviewScoreReport({ score, strengths, weaknesses, suggestions }) {
  return (
    <div className="p-4 border rounded-xl bg-blue-50 dark:bg-blue-900/30 mb-4 max-w-xl">
      <div className="flex items-center gap-4 mb-2">
        <span className="text-2xl font-bold text-blue-800 dark:text-blue-200">
          Score: {score ?? '--'} / 100
        </span>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-green-700 dark:text-green-300">
          Strengths:
        </span>
        <ul className="list-disc ml-5">
          {(strengths || []).length > 0 ? (
            strengths.map((s, i) => (
              <li key={i} className="text-slate-700 dark:text-slate-300">
                {s}
              </li>
            ))
          ) : (
            <li className="text-slate-500">None listed</li>
          )}
        </ul>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-orange-700 dark:text-orange-300">
          Weaknesses:
        </span>
        <ul className="list-disc ml-5">
          {(weaknesses || []).length > 0 ? (
            weaknesses.map((w, i) => (
              <li key={i} className="text-slate-700 dark:text-slate-300">
                {w}
              </li>
            ))
          ) : (
            <li className="text-slate-500">None listed</li>
          )}
        </ul>
      </div>
      <div>
        <span className="font-semibold text-blue-700 dark:text-blue-300">
          Suggestions:
        </span>
        <ul className="list-disc ml-5">
          {(suggestions || []).length > 0 ? (
            suggestions.map((s, i) => (
              <li key={i} className="text-slate-700 dark:text-slate-300">
                {s}
              </li>
            ))
          ) : (
            <li className="text-slate-500">None listed</li>
          )}
        </ul>
      </div>
    </div>
  );
}

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.InterviewScoreReport = InterviewScoreReport;
}
