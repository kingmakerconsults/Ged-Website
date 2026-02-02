/**
 * DiagnosticReport - Specialized results view for the GED Diagnostic
 * Shows per-subject scores and identifies top challenge areas
 */

export function DiagnosticReport({ results, quiz, onHome, onViewProfile }) {
  if (!quiz || !results || !Array.isArray(quiz.questions)) {
    return (
      <div className="text-center fade-in results-screen">
        <h2>Results Unavailable</h2>
        <p>
          We saved your diagnostic score, but couldn't build the detailed
          breakdown.
        </p>
        <button onClick={onHome} className="btn-primary mt-4">
          Back to Home
        </button>
      </div>
    );
  }

  // Calculate per-subject performance
  const subjectStats = {
    Math: { correct: 0, total: 0 },
    Science: { correct: 0, total: 0 },
    'Social Studies': { correct: 0, total: 0 },
    'Language Arts': { correct: 0, total: 0 },
  };

  const challengeTagCounts = {}; // Track which challenge tags had the most misses

  const answers = Array.isArray(results.answers) ? results.answers : [];
  quiz.questions.forEach((q, idx) => {
    const subject = q.originalSubject || q.subject || 'Unknown';
    if (subject in subjectStats) {
      subjectStats[subject].total++;

      // Check if correct
      const userAnswer = answers[idx];
      const correctOptions = (q.answerOptions || []).filter(
        (opt) => opt.isCorrect
      );
      const isCorrect =
        correctOptions.length > 0 &&
        correctOptions.some((opt) => opt.text === userAnswer);

      if (isCorrect) {
        subjectStats[subject].correct++;
      } else {
        // Track challenge tags from wrong answers
        const tags = Array.isArray(q.challenge_tags) ? q.challenge_tags : [];
        tags.forEach((tag) => {
          challengeTagCounts[tag] = (challengeTagCounts[tag] || 0) + 1;
        });
      }
    }
  });

  // Get top 5 challenge areas (most frequently missed)
  const topChallenges = Object.entries(challengeTagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag, count]) => ({ tag, count }));

  // Map challenge tags to human-readable labels
  const challengeLabels = {
    'math:1': 'Fractions & Decimals',
    'math:2': 'Percents & Ratios',
    'math:3': 'Algebra & Functions',
    'math:4': 'Geometry',
    'math:5': 'Data Analysis',
    'science:1': 'Cell & Life Processes',
    'science:2': 'Genetics & Heredity',
    'science:3': 'Evolution',
    'science:4': 'Forces & Motion',
    'science:5': 'Energy',
    'science:6': 'Atoms & Chemistry',
    'science:7': 'Earth Systems',
    'science:8': 'Weather & Climate',
    'social:1': 'Government & Civics',
    'social:2': 'Voting & Democratic Process',
    'social:3': 'Economics',
    'social:4': 'U.S. History',
    'social:5': 'World History',
    'social:6': 'Geography',
    'rla:1': 'Reading Comprehension',
    'rla:2': 'Vocabulary',
    'rla:3': 'Grammar & Sentence Structure',
    'rla:4': 'Literature & Analysis',
    'rla:5': 'Nonfiction & Argument',
  };

  const subjectOrder = ['Math', 'Science', 'Social Studies', 'Language Arts'];
  const overallCorrect = Object.values(subjectStats).reduce(
    (sum, s) => sum + s.correct,
    0
  );
  const overallTotal = Object.values(subjectStats).reduce(
    (sum, s) => sum + s.total,
    0
  );
  const overallPercent =
    overallTotal > 0 ? Math.round((overallCorrect / overallTotal) * 100) : 0;

  return (
    <div className="text-center fade-in results-screen diagnostic-report">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Diagnostic Complete
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Your GED Baseline Assessment Results
        </p>
      </div>

      {/* Overall Score Card */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {overallPercent}%
          </div>
          <div className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Overall Performance
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {overallCorrect} out of {overallTotal} questions correct
          </div>
        </div>
      </div>

      {/* Per-Subject Breakdown */}
      <div className="mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 text-left">
          Score by Subject
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subjectOrder.map((subject) => {
            const stats = subjectStats[subject];
            const percent =
              stats.total > 0
                ? Math.round((stats.correct / stats.total) * 100)
                : 0;
            const subjectColors = {
              Math: {
                bg: 'bg-purple-50 dark:bg-purple-900/20',
                border: 'border-purple-200 dark:border-purple-800',
                text: 'text-purple-600 dark:text-purple-400',
              },
              Science: {
                bg: 'bg-green-50 dark:bg-green-900/20',
                border: 'border-green-200 dark:border-green-800',
                text: 'text-green-600 dark:text-green-400',
              },
              'Social Studies': {
                bg: 'bg-amber-50 dark:bg-amber-900/20',
                border: 'border-amber-200 dark:border-amber-800',
                text: 'text-amber-600 dark:text-amber-400',
              },
              'Language Arts': {
                bg: 'bg-rose-50 dark:bg-rose-900/20',
                border: 'border-rose-200 dark:border-rose-800',
                text: 'text-rose-600 dark:text-rose-400',
              },
            };
            const colors = subjectColors[subject] || {
              bg: 'bg-slate-50 dark:bg-slate-900/20',
              border: 'border-slate-200 dark:border-slate-800',
              text: 'text-slate-600 dark:text-slate-400',
            };

            return (
              <div
                key={subject}
                className={`p-4 rounded-lg ${colors.bg} border ${colors.border} text-left`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {subject}
                  </h3>
                  <span className={`text-2xl font-bold ${colors.text}`}>
                    {percent}%
                  </span>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {stats.correct} / {stats.total} correct
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className={colors.text.replace('text-', 'bg-')}
                    style={{
                      width: `${percent}%`,
                      height: '100%',
                      borderRadius: '9999px',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Challenge Areas */}
      {topChallenges.length > 0 && (
        <div className="mb-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 text-left">
            Top 5 Challenge Areas
          </h2>
          <div className="space-y-3">
            {topChallenges.map(({ tag, count }, idx) => {
              const label = challengeLabels[tag] || tag;
              return (
                <div
                  key={tag}
                  className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 text-left flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center font-semibold text-sm text-amber-900 dark:text-amber-200">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {label}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Missed {count} question{count !== 1 ? 's' : ''} in this
                      area
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommended Next Steps */}
      <div className="mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 text-left">
          Recommended Next Steps
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-left">
          <ul className="space-y-3">
            {topChallenges.length > 0 ? (
              <>
                <li className="flex gap-3">
                  <span className="text-2xl">📚</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Focus on your top challenge areas listed above. Start with
                    targeted practice quizzes.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-2xl">💪</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Your learning challenges have been automatically updated in
                    your profile.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-2xl">🎯</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Visit your profile to manage challenges and create a
                    personalized study plan.
                  </span>
                </li>
              </>
            ) : (
              <li className="text-slate-700 dark:text-slate-300 flex gap-3">
                <span className="text-2xl">🎉</span>
                <span>Great job! You're performing well across all areas.</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={onHome}
          className="btn-secondary px-6 py-3 min-w-[160px]"
        >
          Return Home
        </button>
        <button
          onClick={onViewProfile}
          className="btn-primary px-6 py-3 min-w-[160px]"
        >
          Manage Challenges
        </button>
      </div>

      {/* Note */}
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400 max-w-4xl mx-auto">
        <p>
          The diagnostic is a one-time baseline assessment. Your challenge
          profile has been updated based on your results.
        </p>
      </div>
    </div>
  );
}

export default DiagnosticReport;
