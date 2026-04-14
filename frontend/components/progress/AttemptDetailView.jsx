import React, { useState, useEffect } from 'react';

/**
 * AttemptDetailView – drill-down view showing per-question results for a
 * specific quiz attempt.  Called from DetailedProgressView or Recent Attempts
 * when a student clicks "View Details".
 */
export default function AttemptDetailView({
  attemptId,
  attemptSummary,
  onBack,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!attemptId) return;
    const token =
      localStorage.getItem('token') || localStorage.getItem('appToken');
    fetch(`/api/student/attempt/${attemptId}/items`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject('Failed')))
      .then((data) => setItems(data.items || []))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [attemptId]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto mb-2" />
        Loading attempt details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-3">Could not load attempt details.</p>
        <button
          onClick={onBack}
          className="text-sky-600 hover:underline text-sm"
        >
          Go back
        </button>
      </div>
    );
  }

  const totalCorrect = items.filter((i) => i.is_correct).length;
  const totalMs = items.reduce((s, i) => s + (i.time_spent_ms || 0), 0);

  const formatMs = (ms) => {
    if (!ms) return '–';
    if (ms < 1000) return `${ms}ms`;
    const sec = Math.round(ms / 1000);
    return sec >= 60 ? `${Math.floor(sec / 60)}m ${sec % 60}s` : `${sec}s`;
  };

  return (
    <div className="fade-in max-w-4xl mx-auto">
      {/* Header */}
      <header className="flex items-center pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onBack}
          className="text-sm text-sky-600 hover:text-sky-800 font-semibold"
        >
          ← Back
        </button>
      </header>

      {attemptSummary && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {attemptSummary.quiz_title ||
              attemptSummary.quizTitle ||
              'Quiz Attempt'}
          </h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span>{attemptSummary.subject}</span>
            <span>
              Scaled:{' '}
              {attemptSummary.scaled_score || attemptSummary.scaledScore || '–'}
              /200
            </span>
            <span>
              {attemptSummary.passed ? '✅ Passed' : '⚠️ Not yet passing'}
            </span>
            {attemptSummary.attempted_at && (
              <span>
                {new Date(attemptSummary.attempted_at).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {totalCorrect}/{items.length}
          </div>
          <div className="text-xs text-gray-500">Correct</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {items.length > 0
              ? Math.round((totalCorrect / items.length) * 100)
              : 0}
            %
          </div>
          <div className="text-xs text-gray-500">Accuracy</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatMs(totalMs)}
          </div>
          <div className="text-xs text-gray-500">Total Time</div>
        </div>
      </div>

      {/* Question list */}
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No item-level data available for this attempt.
        </p>
      ) : (
        <div className="space-y-2">
          {items.map((item, idx) => {
            const bg = item.is_correct
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
            const icon = item.is_correct ? '✓' : '✗';
            const iconColor = item.is_correct
              ? 'text-green-600'
              : 'text-red-600';

            // Confidence badge
            let confBadge = null;
            if (item.confidence === 'sure' && !item.is_correct) {
              confBadge = (
                <span className="text-xs bg-red-100 text-red-700 rounded px-1.5 py-0.5">
                  Misconception
                </span>
              );
            } else if (item.confidence === 'guessing' && item.is_correct) {
              confBadge = (
                <span className="text-xs bg-amber-100 text-amber-700 rounded px-1.5 py-0.5">
                  Lucky guess
                </span>
              );
            } else if (item.confidence) {
              confBadge = (
                <span className="text-xs bg-gray-100 text-gray-600 rounded px-1.5 py-0.5">
                  {item.confidence}
                </span>
              );
            }

            return (
              <div key={idx} className={`rounded-lg border p-3 ${bg}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${iconColor}`}>
                      {icon}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Q{item.question_index + 1}
                    </span>
                    {item.domain && (
                      <span className="text-xs text-gray-500 capitalize">
                        {item.domain}
                      </span>
                    )}
                    {item.topic && (
                      <span className="text-xs text-gray-400 capitalize">
                        / {item.topic}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {confBadge}
                    <span className="text-xs text-gray-400">
                      {formatMs(item.time_spent_ms)}
                    </span>
                  </div>
                </div>
                {/* Show answers for wrong questions */}
                {!item.is_correct && (
                  <div className="mt-2 text-xs space-y-1 pl-7">
                    {item.user_answer && (
                      <p>
                        <span className="text-gray-500">Your answer:</span>{' '}
                        <span className="text-red-600 font-medium">
                          {item.user_answer}
                        </span>
                      </p>
                    )}
                    {item.correct_answer && (
                      <p>
                        <span className="text-gray-500">Correct:</span>{' '}
                        <span className="text-green-600 font-medium">
                          {item.correct_answer}
                        </span>
                      </p>
                    )}
                  </div>
                )}
                {/* Challenge tags */}
                {item.challenge_tags && item.challenge_tags.length > 0 && (
                  <div className="mt-1 pl-7 flex flex-wrap gap-1">
                    {item.challenge_tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="text-xs bg-indigo-50 text-indigo-600 rounded px-1.5 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.AttemptDetailView = AttemptDetailView;
}
