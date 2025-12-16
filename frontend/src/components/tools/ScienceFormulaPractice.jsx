import React, { useState, useMemo } from 'react';

// Science Formula Practice Questions
const SCIENCE_FORMULA_PRACTICE = [
  // DENSITY PROBLEMS
  {
    id: 'density_1',
    category: 'Density',
    formulaName: 'Density',
    formulaDisplay: 'd = m / V',
    problemText:
      'A metal block has a mass of 120 g and a volume of 15 cm³. What is its density?',
    given: { m: '120 g', V: '15 cm³' },
    answer: 8,
    answerUnits: 'g/cm³',
    tolerance: 0.01,
    steps: [
      'Identify the formula: d = m / V',
      'Substitute: d = 120 g / 15 cm³',
      'Compute: d = 8 g/cm³',
    ],
  },
  {
    id: 'density_2',
    category: 'Density',
    formulaName: 'Density',
    formulaDisplay: 'd = m / V',
    problemText:
      'A piece of wood has a mass of 45 g and a volume of 60 cm³. Calculate its density.',
    given: { m: '45 g', V: '60 cm³' },
    answer: 0.75,
    answerUnits: 'g/cm³',
    tolerance: 0.01,
    steps: [
      'Use the formula: d = m / V',
      'Substitute: d = 45 g / 60 cm³',
      'Compute: d = 0.75 g/cm³',
    ],
  },
  {
    id: 'density_3',
    category: 'Density',
    formulaName: 'Density',
    formulaDisplay: 'd = m / V',
    problemText:
      'A liquid sample has a volume of 50 mL and a mass of 65 g. Find its density.',
    given: { m: '65 g', V: '50 mL' },
    answer: 1.3,
    answerUnits: 'g/mL',
    tolerance: 0.01,
    steps: [
      'Apply: d = m / V',
      'Substitute: d = 65 g / 50 mL',
      'Compute: d = 1.3 g/mL',
    ],
  },
  // SPEED PROBLEMS
  {
    id: 'speed_1',
    category: 'Speed',
    formulaName: 'Average Speed',
    formulaDisplay: 'v = d / t',
    problemText:
      'A car travels 300 miles in 5 hours. What is its average speed?',
    given: { d: '300 miles', t: '5 hours' },
    answer: 60,
    answerUnits: 'mph',
    tolerance: 0.1,
    steps: [
      'Formula: v = d / t',
      'Substitute: v = 300 miles / 5 hours',
      'Compute: v = 60 mph',
    ],
  },
  {
    id: 'speed_2',
    category: 'Speed',
    formulaName: 'Average Speed',
    formulaDisplay: 'v = d / t',
    problemText:
      'A runner completes 100 meters in 12.5 seconds. Calculate the average speed.',
    given: { d: '100 m', t: '12.5 s' },
    answer: 8,
    answerUnits: 'm/s',
    tolerance: 0.1,
    steps: [
      'Use: v = d / t',
      'Substitute: v = 100 m / 12.5 s',
      'Compute: v = 8 m/s',
    ],
  },
  // FORCE PROBLEMS
  {
    id: 'force_1',
    category: 'Force',
    formulaName: "Force (Newton's 2nd Law)",
    formulaDisplay: 'F = m × a',
    problemText: 'A 10 kg object accelerates at 3 m/s². What force is applied?',
    given: { m: '10 kg', a: '3 m/s²' },
    answer: 30,
    answerUnits: 'N',
    tolerance: 0.1,
    steps: [
      'Formula: F = m × a',
      'Substitute: F = 10 kg × 3 m/s²',
      'Compute: F = 30 N',
    ],
  },
  {
    id: 'force_2',
    category: 'Force',
    formulaName: 'Force',
    formulaDisplay: 'F = m × a',
    problemText:
      'A force of 50 N accelerates a 5 kg box. What is the acceleration?',
    given: { F: '50 N', m: '5 kg' },
    answer: 10,
    answerUnits: 'm/s²',
    tolerance: 0.1,
    steps: [
      'Rearrange: a = F / m',
      'Substitute: a = 50 N / 5 kg',
      'Compute: a = 10 m/s²',
    ],
  },
  // WORK PROBLEMS
  {
    id: 'work_1',
    category: 'Work',
    formulaName: 'Work',
    formulaDisplay: 'W = F × d',
    problemText:
      'A force of 20 N moves an object 5 meters. How much work is done?',
    given: { F: '20 N', d: '5 m' },
    answer: 100,
    answerUnits: 'J',
    tolerance: 0.1,
    steps: [
      'Formula: W = F × d',
      'Substitute: W = 20 N × 5 m',
      'Compute: W = 100 J',
    ],
  },
  {
    id: 'work_2',
    category: 'Work',
    formulaName: 'Work',
    formulaDisplay: 'W = F × d',
    problemText: 'Lifting a 50 N box 2 meters high requires how much work?',
    given: { F: '50 N', d: '2 m' },
    answer: 100,
    answerUnits: 'J',
    tolerance: 0.1,
    steps: [
      'Use: W = F × d',
      'Substitute: W = 50 N × 2 m',
      'Compute: W = 100 J',
    ],
  },
];

/**
 * ScienceFormulaPractice - Formula-based practice problems
 */
export default function ScienceFormulaPractice({ onClose, dark = false }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentProblem, setCurrentProblem] = useState(null);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showSteps, setShowSteps] = useState(false);

  const categories = useMemo(() => {
    const cats = [...new Set(SCIENCE_FORMULA_PRACTICE.map((p) => p.category))];
    return cats.sort();
  }, []);

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

  return (
    <div
      className={`p-6 rounded-xl ${
        dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">
        ⚗️ Science Formula Practice
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
                  : dark
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
            dark ? 'bg-gray-700' : 'bg-gray-50'
          }`}
        >
          <h3 className="text-xl font-bold mb-2">
            {currentProblem.formulaName}
          </h3>

          {/* Formula Display */}
          <div
            className={`mb-3 p-3 rounded text-center ${
              dark ? 'bg-blue-900' : 'bg-white'
            }`}
          >
            <strong className={dark ? 'text-slate-100' : 'text-slate-900'}>
              Formula:{' '}
            </strong>
            <span
              className={`font-mono text-lg ${
                dark ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              {currentProblem.formulaDisplay}
            </span>
          </div>

          {/* Problem Text */}
          <div
            className={`mb-3 p-3 border-l-4 border-blue-500 ${
              dark ? 'bg-slate-800' : 'bg-white'
            }`}
          >
            <p
              className={`text-base ${
                dark ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              {currentProblem.problemText}
            </p>
          </div>

          {/* Given Values */}
          {currentProblem.given && (
            <div className="mb-3 text-slate-900 dark:text-slate-100">
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
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              className={`w-full px-3 py-2 border rounded-lg ${
                dark
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
                dark ? 'bg-gray-600' : 'bg-blue-50'
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
            dark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          <p>Select a category and click "New Problem" to begin.</p>
          <p className="text-sm mt-2">
            Practice with {SCIENCE_FORMULA_PRACTICE.length} formula problems!
          </p>
        </div>
      )}
    </div>
  );
}
