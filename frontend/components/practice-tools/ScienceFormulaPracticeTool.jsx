// Science Formula Practice Tool Component
// Provides static formula-based practice problems for Science students
// Uses KaTeX for math rendering (assumes global katex is available)

const ScienceFormulaPracticeTool = ({ theme }) => {
  const { useState, useMemo } = React;

  // Import data (will be loaded globally from data file)
  const SCIENCE_FORMULA_PRACTICE = window.SCIENCE_FORMULA_PRACTICE || [];

  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentProblem, setCurrentProblem] = useState(null);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showSteps, setShowSteps] = useState(false);

  const isDark = theme === 'dark';

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(SCIENCE_FORMULA_PRACTICE.map((p) => p.category))];
    return cats.sort();
  }, []);

  // Select random problem from category
  const selectNewProblem = () => {
    if (!selectedCategory) {
      alert('Please select a category first.');
      return;
    }

    const categoryProblems = SCIENCE_FORMULA_PRACTICE.filter(
      (p) => p.category === selectedCategory
    );

    if (categoryProblems.length === 0) {
      alert('No problems available for this category.');
      return;
    }

    const randomProblem =
      categoryProblems[Math.floor(Math.random() * categoryProblems.length)];
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
      Math.abs(numericAnswer - currentProblem.answer) <= tolerance;

    setFeedback({
      isCorrect,
      correctAnswer: currentProblem.answer,
      units: currentProblem.answerUnits,
    });
  };

  // Render KaTeX formula
  const renderFormula = (latex) => {
    if (typeof window.katex === 'undefined') {
      return <span>{latex}</span>;
    }
    try {
      const html = window.katex.renderToString(latex, { throwOnError: false });
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
        style={{ color: 'var(--subject-science-accent)' }}
      >
        Science Formula Practice
      </h2>

      {/* Category selector */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Select Category:</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-green-600 text-white'
                  : isDark
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* New Problem button */}
      <div className="mb-6">
        <button
          onClick={selectNewProblem}
          disabled={!selectedCategory}
          className={`px-6 py-3 rounded-lg font-bold text-white transition ${
            !selectedCategory
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
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
          <h3 className="text-xl font-bold mb-2">
            {currentProblem.formulaName}
          </h3>

          {/* Formula Display */}
          <div className="mb-3 text-lg">
            <strong>Formula: </strong>
            {renderFormula(currentProblem.formulaDisplay)}
          </div>

          {/* Variable Legend */}
          <div className="mb-3">
            <strong>Where:</strong>
            <ul className="ml-4 mt-1">
              {currentProblem.variableLegend.map((v, idx) => (
                <li key={idx}>
                  <strong>{v.symbol}</strong> = {v.meaning} ({v.units})
                </li>
              ))}
            </ul>
          </div>

          {/* Problem Text */}
          <div className="mb-3 p-3 border-l-4 border-blue-500">
            <p className="text-base">{currentProblem.problemText}</p>
          </div>

          {/* Given Values */}
          {currentProblem.given && (
            <div className="mb-3">
              <strong>Given:</strong>
              <div className="ml-4 mt-1">
                {Object.entries(currentProblem.given).map(([key, value]) => (
                  <div key={key}>
                    {key} = {value}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Answer Input */}
          <div className="mb-3">
            <label className="block font-semibold mb-2">
              Your Answer ({currentProblem.answerUnits}):
            </label>
            <input
              type="text"
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${
                isDark
                  ? 'bg-gray-800 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Enter numeric answer"
            />
          </div>

          {/* Check Answer Button */}
          <button
            onClick={checkAnswer}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
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
                <p className="font-bold">✓ Correct!</p>
              ) : (
                <div>
                  <p className="font-bold">✗ Incorrect</p>
                  <p>
                    Correct answer: {feedback.correctAnswer} {feedback.units}
                  </p>
                </div>
              )}

              <button
                onClick={() => setShowSteps(!showSteps)}
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {showSteps ? 'Hide Steps' : 'View Steps'}
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
              <ol className="list-decimal ml-6">
                {currentProblem.steps.map((step, idx) => (
                  <li key={idx} className="mb-2">
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
          <p>Select a category and click "New Problem" to begin.</p>
        </div>
      )}
    </div>
  );
};

// Export for use in app.jsx
if (typeof window !== 'undefined') {
  window.ScienceFormulaPracticeTool = ScienceFormulaPracticeTool;
}
