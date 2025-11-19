// Math Step-by-Step Solver Component
// Provides static step-by-step solutions for various math topics
// Uses KaTeX for math rendering (assumes global katex is available)

const MathStepPracticeTool = ({ theme }) => {
  const { useState, useMemo } = React;

  // Import data (will be loaded globally from data file)
  const MATH_STEP_PROBLEMS = window.MATH_STEP_PROBLEMS || [];

  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [currentProblem, setCurrentProblem] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [answerChecked, setAnswerChecked] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [allStepsShown, setAllStepsShown] = useState(false);

  const isDark = theme === 'dark';

  // Get unique topics
  const topics = useMemo(() => {
    const tops = [...new Set(MATH_STEP_PROBLEMS.map((p) => p.topic))];
    return tops.sort();
  }, []);

  // Get unique difficulties
  const difficulties = useMemo(() => {
    const diffs = [...new Set(MATH_STEP_PROBLEMS.map((p) => p.difficulty))];
    return ['all', ...diffs.sort()];
  }, []);

  // Select random problem
  const selectNewProblem = () => {
    if (!selectedTopic) {
      alert('Please select a topic first.');
      return;
    }

    let filteredProblems = MATH_STEP_PROBLEMS.filter(
      (p) => p.topic === selectedTopic
    );

    if (selectedDifficulty !== 'all') {
      filteredProblems = filteredProblems.filter(
        (p) => p.difficulty === selectedDifficulty
      );
    }

    if (filteredProblems.length === 0) {
      alert('No problems available for this selection.');
      return;
    }

    const randomProblem =
      filteredProblems[Math.floor(Math.random() * filteredProblems.length)];
    setCurrentProblem(randomProblem);
    setCurrentStepIndex(0);
    setAllStepsShown(false);
    setStudentAnswer('');
    setAnswerChecked(false);
    setAnswerCorrect(false);
  };

  // Show next step
  const showNextStep = () => {
    if (!currentProblem) return;
    if (currentStepIndex < currentProblem.steps.length) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  // Show all steps
  const showAllSteps = () => {
    if (!currentProblem) return;
    setCurrentStepIndex(currentProblem.steps.length);
    setAllStepsShown(true);
  };

  // Check student answer
  const checkAnswer = () => {
    if (!currentProblem) return;
    if (studentAnswer.trim() === '') {
      alert('Please enter an answer.');
      return;
    }

    // If there's a numeric answer, check it
    if (
      currentProblem.numericAnswer !== null &&
      currentProblem.numericAnswer !== undefined
    ) {
      const numericInput = parseFloat(studentAnswer);
      if (!isNaN(numericInput)) {
        const isCorrect =
          Math.abs(numericInput - currentProblem.numericAnswer) < 0.01;
        setAnswerCorrect(isCorrect);
        setAnswerChecked(true);
        return;
      }
    }

    // Otherwise just acknowledge the answer
    setAnswerChecked(true);
    alert(
      'Your answer has been recorded. Compare it with the final answer shown above.'
    );
  };

  // Render KaTeX expression
  const renderMath = (latex) => {
    if (typeof window.katex === 'undefined') {
      return <span>{latex}</span>;
    }
    try {
      const html = window.katex.renderToString(latex, {
        throwOnError: false,
        displayMode: false,
      });
      return <span dangerouslySetInnerHTML={{ __html: html }} />;
    } catch (e) {
      return <span>{latex}</span>;
    }
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
        Math Step-by-Step Solver
      </h2>

      {/* Topic selector */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Select Topic:</label>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedTopic === topic
                  ? 'bg-blue-600 text-white'
                  : isDark
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty selector */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Difficulty:</label>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                selectedDifficulty === diff
                  ? 'bg-purple-600 text-white'
                  : isDark
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* New Problem button */}
      <div className="mb-6">
        <button
          onClick={selectNewProblem}
          disabled={!selectedTopic}
          className={`px-6 py-3 rounded-lg font-bold text-white transition ${
            !selectedTopic
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
          <div className="mb-3">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                currentProblem.difficulty === 'easy'
                  ? 'bg-green-200 text-green-800'
                  : currentProblem.difficulty === 'medium'
                  ? 'bg-yellow-200 text-yellow-800'
                  : 'bg-red-200 text-red-800'
              }`}
            >
              {currentProblem.difficulty.toUpperCase()}
            </span>
          </div>

          {/* Problem Statement */}
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Problem:</h3>
            <p className="mb-2">{currentProblem.problemText}</p>
            <div className="text-xl p-3 bg-white dark:bg-gray-800 border-2 border-blue-500 rounded-lg inline-block">
              {renderMath(currentProblem.formattedProblem)}
            </div>
          </div>

          {/* Steps Display */}
          <div className="mb-4">
            <h4 className="font-bold mb-2">Solution Steps:</h4>
            {currentProblem.steps
              .slice(0, currentStepIndex)
              .map((step, idx) => (
                <div
                  key={idx}
                  className={`mb-3 p-3 rounded-lg border-l-4 border-blue-500 ${
                    isDark ? 'bg-gray-600' : 'bg-blue-50'
                  }`}
                >
                  <p className="text-sm mb-1">
                    <strong>Step {idx + 1}:</strong> {step.explanation}
                  </p>
                  <div className="text-base font-mono">
                    {renderMath(step.expression)}
                  </div>
                </div>
              ))}

            {/* Step control buttons */}
            {currentStepIndex < currentProblem.steps.length && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={showNextStep}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
                >
                  Show Next Step
                </button>
                <button
                  onClick={showAllSteps}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition"
                >
                  Show All Steps
                </button>
              </div>
            )}
          </div>

          {/* Final Answer Display */}
          {(allStepsShown ||
            currentStepIndex >= currentProblem.steps.length) && (
            <div
              className={`p-3 rounded-lg border-2 border-green-500 ${
                isDark ? 'bg-green-900/30' : 'bg-green-50'
              }`}
            >
              <p className="font-bold text-green-700 dark:text-green-300">
                Final Answer: {renderMath(currentProblem.finalAnswerText)}
              </p>
            </div>
          )}

          {/* Optional: Student answer input */}
          {currentProblem.numericAnswer !== null &&
            currentProblem.numericAnswer !== undefined && (
              <div className="mt-4">
                <label className="block font-semibold mb-2">
                  Try it yourself:
                </label>
                {window.MathInputWithPad ? (
                  <window.MathInputWithPad
                    value={studentAnswer}
                    onChange={setStudentAnswer}
                    placeholder="Enter your answer"
                    disabled={false}
                  />
                ) : (
                  <input
                    type="text"
                    value={studentAnswer}
                    onChange={(e) => setStudentAnswer(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg mb-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your answer"
                  />
                )}
                <button
                  onClick={checkAnswer}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition mt-2"
                >
                  Check My Answer
                </button>

                {answerChecked && currentProblem.numericAnswer !== null && (
                  <div
                    className={`mt-2 p-2 rounded ${
                      answerCorrect
                        ? 'bg-green-100 text-green-800 border-2 border-green-500'
                        : 'bg-red-100 text-red-800 border-2 border-red-500'
                    }`}
                  >
                    {answerCorrect
                      ? '✓ Correct!'
                      : '✗ Try again or review the steps above.'}
                  </div>
                )}
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
          <p>Select a topic and click "New Problem" to begin.</p>
        </div>
      )}
    </div>
  );
};

// Export for use in app.jsx
if (typeof window !== 'undefined') {
  window.MathStepPracticeTool = MathStepPracticeTool;
}
