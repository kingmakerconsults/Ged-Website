// Inline attempt drill-down (loads item-level data for one attempt)
function AttemptDetailInline({ attemptId, summary }) {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!attemptId) return;
    const token =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('token') || localStorage.getItem('appToken')
        : null;
    fetch(`/api/student/attempt/${attemptId}/items`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => (r.ok ? r.json() : Promise.reject('Failed')))
      .then((d) => setItems(d.items || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [attemptId]);

  if (loading)
    return (
      <p className="text-center py-8 text-slate-500">Loading details...</p>
    );
  if (!items.length)
    return (
      <p className="text-center py-8 text-slate-500">
        No item-level data available for this attempt.
      </p>
    );

  const totalCorrect = items.filter((i) => i.is_correct).length;
  const fmtMs = (ms) => {
    if (!ms) return '–';
    const sec = Math.round(ms / 1000);
    return sec >= 60 ? `${Math.floor(sec / 60)}m ${sec % 60}s` : `${sec}s`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">
        {summary?.quizTitle || 'Attempt Detail'}
      </h2>
      <p className="text-sm text-slate-500 mb-4">
        {totalCorrect}/{items.length} correct
        {summary?.scaledScore != null
          ? ` • Scaled: ${summary.scaledScore}/200`
          : ''}
      </p>
      <div className="space-y-2">
        {items.map((item, idx) => {
          const bg = item.is_correct
            ? 'bg-emerald-50 border-emerald-200'
            : 'bg-red-50 border-red-200';
          const icon = item.is_correct ? '✓' : '✗';
          const iconColor = item.is_correct
            ? 'text-emerald-600'
            : 'text-red-600';
          let confBadge = null;
          if (item.confidence === 'sure' && !item.is_correct)
            confBadge = (
              <span className="text-xs bg-red-100 text-red-700 rounded px-1 py-0.5">
                Misconception
              </span>
            );
          else if (item.confidence === 'guessing' && item.is_correct)
            confBadge = (
              <span className="text-xs bg-amber-100 text-amber-700 rounded px-1 py-0.5">
                Lucky guess
              </span>
            );
          else if (item.confidence)
            confBadge = (
              <span className="text-xs bg-slate-100 text-slate-600 rounded px-1 py-0.5">
                {item.confidence}
              </span>
            );

          return (
            <div key={idx} className={`rounded-lg border p-3 ${bg}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${iconColor}`}>
                    {icon}
                  </span>
                  <span className="text-sm font-medium">
                    Q{item.question_index + 1}
                  </span>
                  {item.domain && (
                    <span className="text-xs text-slate-500 capitalize">
                      {item.domain}
                    </span>
                  )}
                  {item.topic && (
                    <span className="text-xs text-slate-400 capitalize">
                      / {item.topic}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {confBadge}
                  <span className="text-xs text-slate-400">
                    {fmtMs(item.time_spent_ms)}
                  </span>
                </div>
              </div>
              {!item.is_correct && (
                <div className="mt-2 text-xs space-y-1 pl-7">
                  {item.user_answer && (
                    <p>
                      <span className="text-slate-500">Your answer:</span>{' '}
                      <span className="text-red-600 font-medium">
                        {item.user_answer}
                      </span>
                    </p>
                  )}
                  {item.correct_answer && (
                    <p>
                      <span className="text-slate-500">Correct:</span>{' '}
                      <span className="text-emerald-600 font-medium">
                        {item.correct_answer}
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DetailedProgressView({
  subject,
  progressData,
  onBack,
  rlaEssayAvgDisplay,
}) {
  const [selectedAttempt, setSelectedAttempt] = React.useState(null);
  const attempts = Array.isArray(progressData?.attempts)
    ? progressData.attempts
    : [];
  const lastAttempt =
    progressData?.lastAttempt || (attempts.length ? attempts[0] : null);
  const totalPremade =
    typeof progressData?.totalPremadeExams === 'number'
      ? progressData.totalPremadeExams
      : 0;
  const completedCount =
    typeof progressData?.completedCount === 'number'
      ? progressData.completedCount
      : 0;
  const completionPercentage =
    typeof progressData?.completionPercentage === 'number'
      ? progressData.completionPercentage
      : 0;
  const averageScaledScore =
    typeof progressData?.averageScaledScore === 'number'
      ? progressData.averageScaledScore
      : null;

  const formatDate = (value) => {
    if (!value) return '–';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '–';
    }
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const formatScore = (value) => (value == null ? 'N/A' : Math.round(value));
  const formatPassStatus = (passed) => {
    if (passed === true)
      return { label: 'Passed', className: 'text-emerald-600' };
    if (passed === false)
      return { label: 'Keep Practicing', className: 'text-amber-600' };
    return { label: '–', className: 'text-slate-500' };
  };

  const recentAttempts = attempts.slice(0, 10);

  return (
    <div className="fade-in" data-subject={subject}>
      <header className="flex items-center pb-4 mb-4 border-b">
        <button
          type="button"
          onClick={selectedAttempt ? () => setSelectedAttempt(null) : onBack}
          className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-800 font-semibold"
        >
          <ArrowLeftIcon />{' '}
          {selectedAttempt ? 'Back to Progress' : 'Back to Dashboard'}
        </button>
      </header>

      {selectedAttempt ? (
        <AttemptDetailInline
          attemptId={selectedAttempt.id}
          summary={selectedAttempt}
        />
      ) : (
        <>
          <h2 className="text-3xl font-extrabold subject-accent-heading mb-4">
            {subject} Progress Details
          </h2>
          <div className="space-y-6">
            <section className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-inner panel-surface">
              <h3 className="text-lg font-semibold subject-accent-heading">
                Premade Exam Progress
              </h3>
              <div className="mt-3 h-3 w-full rounded-full bg-white/70">
                <div
                  className="h-3 rounded-full bg-sky-500 transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.max(0, completionPercentage))}%`,
                  }}
                ></div>
              </div>
              <div className="mt-2 flex flex-wrap justify-between text-sm text-slate-600">
                <span>
                  {completedCount} of {totalPremade} exams passed
                </span>
                <span>{completionPercentage}% complete</span>
              </div>
              {averageScaledScore != null && (
                <p className="mt-2 text-sm text-slate-600">
                  Average scaled score:{' '}
                  <span className="font-semibold text-slate-800">
                    {averageScaledScore}
                  </span>
                </p>
              )}
              {subject === 'Reasoning Through Language Arts (RLA)' &&
                rlaEssayAvgDisplay && (
                  <p className="mt-1 text-sm text-slate-600">
                    Avg essay (0–6):{' '}
                    <span className="font-semibold text-slate-800">
                      {rlaEssayAvgDisplay}
                    </span>
                  </p>
                )}
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm panel-surface">
              <h3 className="text-lg font-semibold subject-accent-heading mb-2">
                Last Exam
              </h3>
              {lastAttempt ? (
                <div className="space-y-2">
                  <p className="text-xl font-bold text-slate-900">
                    {lastAttempt.quizTitle || 'Exam'}
                  </p>
                  <p className="text-sm text-slate-600 break-words">
                    Code:{' '}
                    <span className="font-mono text-slate-700">
                      {lastAttempt.quizCode || '–'}
                    </span>
                  </p>
                  <p className="text-lg font-semibold text-slate-800">
                    Scaled Score:{' '}
                    <span className="text-sky-700">
                      {formatScore(lastAttempt.scaledScore)}
                    </span>
                    <span
                      className={`ml-3 text-sm font-semibold ${
                        formatPassStatus(lastAttempt.passed).className
                      }`}
                    >
                      {formatPassStatus(lastAttempt.passed).label}
                    </span>
                  </p>
                  {typeof lastAttempt.score === 'number' &&
                    typeof lastAttempt.totalQuestions === 'number' && (
                      <p className="text-sm text-slate-600">
                        Correct: {lastAttempt.score} /{' '}
                        {lastAttempt.totalQuestions}
                      </p>
                    )}
                  <p className="text-sm text-slate-500">
                    Completed {formatDate(lastAttempt.attemptedAt)}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-600">
                  No completed exams recorded yet. Start a premade exam to see
                  your progress here.
                </p>
              )}
            </section>

            <section>
              <h3 className="text-lg font-semibold subject-accent-heading mb-3">
                Recent Attempts
              </h3>
              {recentAttempts.length ? (
                <ul className="space-y-3">
                  {recentAttempts.map((attempt, index) => {
                    const { label, className } = formatPassStatus(
                      attempt.passed
                    );
                    return (
                      <li
                        key={`${attempt.quizCode || 'attempt'}-${index}`}
                        className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm panel-surface"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-800">
                              {attempt.quizTitle ||
                                attempt.quizCode ||
                                `Exam ${index + 1}`}
                            </p>
                            <p className="text-xs text-slate-500">
                              Code: {attempt.quizCode || '–'}
                            </p>
                            {attempt.scaledScore != null && (
                              <p className="text-sm text-slate-600 mt-1">
                                Score:{' '}
                                <span className="font-semibold">
                                  {attempt.scaledScore}
                                </span>
                                /200
                                {attempt.passed ? ' ✅' : ''}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {attempt.attemptedAt && (
                              <span className="text-xs text-slate-400">
                                {formatDate(attempt.attemptedAt)}
                              </span>
                            )}
                            {attempt.id && (
                              <button
                                onClick={() => setSelectedAttempt(attempt)}
                                className="text-xs text-sky-600 hover:text-sky-800 font-medium hover:underline"
                              >
                                View Details →
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-slate-600">
                  No recent attempts recorded yet.
                </p>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
}

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.DetailedProgressView = DetailedProgressView;
}
