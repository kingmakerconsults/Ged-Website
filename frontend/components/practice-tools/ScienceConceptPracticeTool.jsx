// Science Concept Practice Tool Component
// Multiple-choice conceptual questions across Physics, Biology, Chemistry, Earth Science.

const ScienceConceptPracticeTool = ({ theme }) => {
  const { useState, useMemo } = React;
  const QUESTIONS = window.SCIENCE_CONCEPT_QUESTIONS || [];

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const isDark = theme === 'dark';

  const categories = useMemo(() => {
    const unique = [...new Set(QUESTIONS.map((q) => q.category))];
    return unique.sort();
  }, [QUESTIONS]);

  const difficulties = useMemo(() => {
    const unique = [...new Set(QUESTIONS.map((q) => q.difficulty))];
    return ['all', ...unique.sort()];
  }, [QUESTIONS]);

  function selectNewQuestion() {
    if (!selectedCategory) {
      alert('Select a category first.');
      return;
    }
    let pool = QUESTIONS.filter((q) => q.category === selectedCategory);
    if (selectedDifficulty !== 'all')
      pool = pool.filter((q) => q.difficulty === selectedDifficulty);
    if (pool.length === 0) {
      alert('No questions for this selection.');
      return;
    }
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setCurrentQuestion(picked);
    setSelectedChoice(null);
    setRevealed(false);
  }

  function grade() {
    if (!currentQuestion) return;
    if (selectedChoice === null) {
      alert('Pick an answer first.');
      return;
    }
    setRevealed(true);
  }

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
        Science Concept Practice
      </h2>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Category:</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white'
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
      <div className="mb-6">
        <button
          onClick={selectNewQuestion}
          disabled={!selectedCategory}
          className={`px-6 py-3 rounded-lg font-bold text-white transition ${
            !selectedCategory
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          New Question
        </button>
      </div>
      {currentQuestion ? (
        <div
          className={`p-4 rounded-lg mb-4 ${
            isDark ? 'bg-gray-700' : 'bg-gray-50'
          }`}
        >
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                currentQuestion.difficulty === 'easy'
                  ? 'bg-green-200 text-green-800'
                  : currentQuestion.difficulty === 'medium'
                  ? 'bg-yellow-200 text-yellow-800'
                  : 'bg-red-200 text-red-800'
              }`}
            >
              {currentQuestion.difficulty.toUpperCase()}
            </span>
            <span className="text-xs opacity-70">
              {currentQuestion.category}
            </span>
          </div>
          <h3 className="text-lg font-bold mb-3">Question:</h3>
          <p className="mb-4">{currentQuestion.question}</p>
          <div className="space-y-2 mb-4">
            {currentQuestion.choices.map((ch, idx) => {
              const chosen = selectedChoice === idx;
              const correct = ch.correct;
              let btnStyle = chosen ? 'ring-2 ring-blue-500' : '';
              if (revealed) {
                if (correct) btnStyle += ' bg-green-600 text-white';
                else if (chosen && !correct)
                  btnStyle += ' bg-red-600 text-white';
                else btnStyle += ' bg-slate-200 dark:bg-slate-600';
              } else {
                btnStyle += chosen
                  ? ' bg-blue-600 text-white'
                  : ' bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100';
              }
              return (
                <button
                  key={idx}
                  disabled={revealed}
                  onClick={() => setSelectedChoice(idx)}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${btnStyle}`}
                >
                  {ch.text}
                </button>
              );
            })}
          </div>
          {!revealed && (
            <button
              onClick={grade}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
            >
              Check Answer
            </button>
          )}
          {revealed && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                currentQuestion.choices[selectedChoice].correct
                  ? 'bg-green-100 text-green-800 border-2 border-green-500'
                  : 'bg-red-100 text-red-800 border-2 border-red-500'
              }`}
            >
              <p className="font-bold mb-2">
                {currentQuestion.choices[selectedChoice].correct
                  ? '✓ Correct!'
                  : '✗ Incorrect'}
              </p>
              <p className="text-sm">
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`p-4 text-center ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Select a category and click "New Question" to begin.
        </div>
      )}
    </div>
  );
};

if (typeof window !== 'undefined') {
  window.ScienceConceptPracticeTool = ScienceConceptPracticeTool;
}
