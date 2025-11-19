// Math Central Tendency (Mean, Median, Mode, Range) Practice Tool
// Provides static practice problems for statistical measures
// Pure JavaScript, no AI

const MathCentralTendencyTool = ({ theme }) => {
  const { useState, useMemo } = React;

  // Import data (will be loaded globally from data file)
  const MATH_STATS_PROBLEMS = window.MATH_STATS_PROBLEMS || [];

  const [selectedType, setSelectedType] = useState('');
  const [currentProblem, setCurrentProblem] = useState(null);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showSteps, setShowSteps] = useState(false);

  const isDark = theme === 'dark';

  // Get unique types
  const types = useMemo(() => {
    const typesList = [...new Set(MATH_STATS_PROBLEMS.map((p) => p.type))];
    return typesList.sort();
  }, []);

  // Type labels for display
  const typeLabels = {
    mean: 'Mean (Average)',
    median: 'Median',
    mode: 'Mode',
    range: 'Range',
  };

  // Select random problem
  const selectNewProblem = () => {
    if (!selectedType) {
      alert('Please select a type first.');
      return;
    }

    const typeProblems = MATH_STATS_PROBLEMS.filter(
      (p) => p.type === selectedType
    );

    if (typeProblems.length === 0) {
      alert('No problems available for this type.');
      return;
    }

    const randomProblem =
      typeProblems[Math.floor(Math.random() * typeProblems.length)];
    setCurrentProblem(randomProblem);
    setStudentAnswer('');
    setFeedback(null);
    setShowSteps(false);
  };

  // Check student answer
  const checkAnswer = () => {
    if (!currentProblem) return;
    if (studentAnswer.trim() === '') {
      alert('Please enter an answer.');
      return;
    }

    const numericAnswer = parseFloat(studentAnswer);
    if (isNaN(numericAnswer)) {
      alert('Please enter a valid number.');
      return;
    }

    const tolerance = currentProblem.tolerance || 0.01;
    const isCorrect =
      Math.abs(numericAnswer - currentProblem.correctAnswer) <= tolerance;

    // Special handling for bimodal mode problems (like problem mode_4)
    // Accept either 10 or 15 for that specific problem
    let alternativeCorrect = false;
    if (
      currentProblem.id === 'mode_4' &&
      (numericAnswer === 10 || numericAnswer === 15)
    ) {
      alternativeCorrect = true;
    }

    setFeedback({
      isCorrect: isCorrect || alternativeCorrect,
      correctAnswer: currentProblem.correctAnswer,
      userAnswer: numericAnswer,
    });
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-lg ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h2
        className="text-2xl font-bold mb-4"
        style={{ color: 'var(--subject-math-accent)' }}
      >
        Mean, Median, Mode & Range Practice
      </h2>

      <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        Practice finding measures of central tendency and spread.
      </p>

      {/* Type selector */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Select Type:</label>
        <div className="grid grid-cols-2 gap-2 max-w-md">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedType === type
                  ? 'bg-blue-600 text-white'
                  : isDark
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {typeLabels[type] || type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* New Problem button */}
      <div className="mb-6">
        <button
          onClick={selectNewProblem}
          disabled={!selectedType}
          className={`px-6 py-3 rounded-lg font-bold text-white transition ${
            !selectedType
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          New Problem
        </button>
      </div>

      {/* Current Problem Display */}
      {currentProblem && (
        <div
          className={`p-4 rounded-lg mb-4 ${
            isDark ? 'bg-gray-700' : 'bg-gray-50'
          }`}
        >
          {/* Prompt */}
          <div className="mb-3">
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {currentProblem.prompt}
            </p>
          </div>

          {/* Data Set Display */}
          <div
            className={`mb-4 p-3 rounded-lg ${
              isDark ? 'bg-gray-600' : 'bg-white'
            } border-2 border-blue-500`}
          >
            <p className="font-semibold mb-2">Data:</p>
            <div className="flex flex-wrap gap-2">
              {currentProblem.dataSet.map((num, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-lg font-mono text-lg ${
                    isDark
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>

          {/* Question */}
          <div className="mb-4">
            <p className="text-base font-medium">
              {currentProblem.questionText}
            </p>
          </div>

          {/* Answer Input */}
          <div className="mb-3">
            <label className="block font-semibold mb-2">Your Answer:</label>
            {window.MathInputWithPad ? (
              <window.MathInputWithPad
                value={studentAnswer}
                onChange={setStudentAnswer}
                placeholder="Enter your answer"
                disabled={false}
                className="max-w-md"
              />
            ) : (
              <input
                type="text"
                value={studentAnswer}
                onChange={(e) => setStudentAnswer(e.target.value)}
                className={`w-full max-w-xs px-3 py-2 border rounded-lg ${
                  isDark
                    ? 'bg-gray-800 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Enter your answer"
              />
            )}
          </div>

          {/* Check Answer Button */}
          <button
            onClick={checkAnswer}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition mt-2"
          >
            Check Answer
          </button>

          {/* Feedback */}
          {feedback && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                feedback.isCorrect
                  ? 'bg-green-100 text-green-800 border-2 border-green-500'
                  : 'bg-red-100 text-red-800 border-2 border-red-500'
              }`}
            >
              {feedback.isCorrect ? (
                <p className="font-bold">
                  ✓ Correct! The{' '}
                  {typeLabels[currentProblem.type] || currentProblem.type} is{' '}
                  {feedback.correctAnswer}.
                </p>
              ) : (
                <div>
                  <p className="font-bold">✗ Not quite.</p>
                  <p>You answered: {feedback.userAnswer}</p>
                  <p>Correct answer: {feedback.correctAnswer}</p>
                </div>
              )}

              <button
                onClick={() => setShowSteps(!showSteps)}
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {showSteps ? 'Hide Steps' : 'Show Steps'}
              </button>
            </div>
          )}

          {/* Steps Display */}
          {showSteps && currentProblem.steps && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                isDark ? 'bg-gray-600' : 'bg-blue-50'
              }`}
            >
              <h4 className="font-bold mb-2">Solution Steps:</h4>
              <ol className="list-decimal ml-6 space-y-2">
                {currentProblem.steps.map((step, idx) => (
                  <li key={idx} className="text-base">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      {!currentProblem && (
        <div
          className={`p-4 text-center ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          <p>Select a type and click "New Problem" to begin.</p>
        </div>
      )}

      {/* Info Section */}
      <div
        className={`mt-6 p-4 rounded-lg ${
          isDark ? 'bg-gray-700' : 'bg-blue-50'
        }`}
      >
        <h3 className="font-bold mb-2">Quick Reference:</h3>
        <ul className="space-y-1 text-sm">
          <li>
            <strong>Mean:</strong> Add all numbers and divide by how many
            numbers there are.
          </li>
          <li>
            <strong>Median:</strong> The middle number when the data is arranged
            in order.
          </li>
          <li>
            <strong>Mode:</strong> The number that appears most often.
          </li>
          <li>
            <strong>Range:</strong> The difference between the largest and
            smallest numbers.
          </li>
        </ul>
      </div>
    </div>
  );
};

// Export for use in app.jsx
if (typeof window !== 'undefined') {
  window.MathCentralTendencyTool = MathCentralTendencyTool;
}
