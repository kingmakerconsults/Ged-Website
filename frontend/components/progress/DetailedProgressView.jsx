function DetailedProgressView({
  subject,
  progressData,
  onBack,
  rlaEssayAvgDisplay,
}) {
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
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-800 font-semibold"
        >
          <ArrowLeftIcon /> Back to Dashboard
        </button>
      </header>
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
                    Correct: {lastAttempt.score} / {lastAttempt.totalQuestions}
                  </p>
                )}
              <p className="text-sm text-slate-500">
                Completed {formatDate(lastAttempt.attemptedAt)}
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-600">
              No completed exams recorded yet. Start a premade exam to see your
              progress here.
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
                const { label, className } = formatPassStatus(attempt.passed);
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
                      </div>
                      <div className="space-y-3">
                        {/* Recent attempt details go here (removed accidental option renderer) */}
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
    </div>
  );
}

export default DetailedProgressView;
