import React, { useState } from 'react';

// Statistics Practice Problems
const STATS_PRACTICE_PROBLEMS = [
  {
    id: 'stats_1',
    question: 'Find the mean of: 5, 10, 15, 20, 15',
    data: [5, 10, 15, 20, 15],
    askFor: 'mean',
    answer: 13,
    explanation: 'Mean = (5 + 10 + 15 + 20 + 15) / 5 = 65 / 5 = 13',
  },
  {
    id: 'stats_2',
    question: 'Find the median of: 3, 7, 12, 18, 21',
    data: [3, 7, 12, 18, 21],
    askFor: 'median',
    answer: 12,
    explanation:
      'The median is the middle value when data is sorted. With 5 values, the 3rd value (12) is the median.',
  },
  {
    id: 'stats_3',
    question: 'Find the mode of: 2, 4, 4, 6, 8, 4, 10',
    data: [2, 4, 4, 6, 8, 4, 10],
    askFor: 'mode',
    answer: 4,
    explanation:
      'The mode is the most frequently occurring value. 4 appears 3 times, more than any other number.',
  },
  {
    id: 'stats_4',
    question: 'Find the range of: 15, 22, 8, 35, 12',
    data: [15, 22, 8, 35, 12],
    askFor: 'range',
    answer: 27,
    explanation: 'Range = Maximum - Minimum = 35 - 8 = 27',
  },
  {
    id: 'stats_5',
    question: 'Find the mean of: 100, 85, 92, 88, 95',
    data: [100, 85, 92, 88, 95],
    askFor: 'mean',
    answer: 92,
    explanation: 'Mean = (100 + 85 + 92 + 88 + 95) / 5 = 460 / 5 = 92',
  },
  {
    id: 'stats_6',
    question: 'Find the median of: 6, 2, 8, 4, 10, 12',
    data: [6, 2, 8, 4, 10, 12],
    askFor: 'median',
    answer: 7,
    explanation:
      'Sorted: 2, 4, 6, 8, 10, 12. With an even count, median = (6 + 8) / 2 = 7',
  },
  {
    id: 'stats_7',
    question: 'Find the range of: 45, 67, 23, 89, 34, 56',
    data: [45, 67, 23, 89, 34, 56],
    askFor: 'range',
    answer: 66,
    explanation: 'Range = 89 - 23 = 66',
  },
  {
    id: 'stats_8',
    question: 'Find the mean of: 12, 18, 24, 30',
    data: [12, 18, 24, 30],
    askFor: 'mean',
    answer: 21,
    explanation: 'Mean = (12 + 18 + 24 + 30) / 4 = 84 / 4 = 21',
  },
];

/**
 * StatisticsTool - Calculator for mean, median, mode, and range with practice questions
 */
export default function StatisticsTool({ onCalculate = null }) {
  const [mode, setMode] = useState('calculator'); // 'calculator' or 'practice'
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  // Practice mode state
  const [currentProblem, setCurrentProblem] = useState(null);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const parseNumbers = (text) => {
    const numbers = text
      .split(/[,\s]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n));
    return numbers;
  };

  const calculateMean = (numbers) => {
    if (numbers.length === 0) return null;
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    return sum / numbers.length;
  };

  const calculateMedian = (numbers) => {
    if (numbers.length === 0) return null;
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      return sorted[mid];
    }
  };

  const calculateMode = (numbers) => {
    if (numbers.length === 0) return null;
    const frequency = {};
    numbers.forEach((n) => {
      frequency[n] = (frequency[n] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency)
      .filter((key) => frequency[key] === maxFreq)
      .map((key) => parseFloat(key));
    if (maxFreq === 1) return null;
    return modes;
  };

  const calculateRange = (numbers) => {
    if (numbers.length === 0) return null;
    return Math.max(...numbers) - Math.min(...numbers);
  };

  const handleCalculate = () => {
    setError('');
    setResults(null);
    const numbers = parseNumbers(input);

    if (numbers.length === 0) {
      setError('Please enter at least one valid number');
      return;
    }

    const stats = {
      count: numbers.length,
      values: numbers,
      mean: calculateMean(numbers),
      median: calculateMedian(numbers),
      mode: calculateMode(numbers),
      range: calculateRange(numbers),
      min: Math.min(...numbers),
      max: Math.max(...numbers),
    };

    setResults(stats);
    if (onCalculate) onCalculate(stats);
  };

  const handleClear = () => {
    setInput('');
    setResults(null);
    setError('');
  };

  // Practice mode functions
  const selectNewProblem = () => {
    const randomProblem =
      STATS_PRACTICE_PROBLEMS[
        Math.floor(Math.random() * STATS_PRACTICE_PROBLEMS.length)
      ];
    setCurrentProblem(randomProblem);
    setStudentAnswer('');
    setFeedback(null);
  };

  const checkPracticeAnswer = () => {
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

    const isCorrect = Math.abs(numericAnswer - currentProblem.answer) < 0.01;
    setFeedback({
      isCorrect,
      correctAnswer: currentProblem.answer,
      explanation: currentProblem.explanation,
    });
  };

  const formatNumber = (num) => {
    if (num === null || num === undefined) return 'N/A';
    return typeof num === 'number' ? num.toFixed(2) : num.toString();
  };

  return (
    <div className="statistics-tool w-full bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400">
        📊 Statistics Tool
      </h3>

      {/* Mode Toggle */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setMode('calculator')}
          className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
            mode === 'calculator'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Calculator
        </button>
        <button
          onClick={() => setMode('practice')}
          className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
            mode === 'practice'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Practice Questions
        </button>
      </div>

      {/* Calculator Mode */}
      {mode === 'calculator' && (
        <>
          <div className="input-section mb-4">
            <label
              htmlFor="stats-input"
              className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
            >
              Enter numbers (comma or space-separated):
            </label>
            <input
              id="stats-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder="e.g., 5, 10, 15, 20, 15"
              className="w-full px-4 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          {error && (
            <div className="error-message mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
              {error}
            </div>
          )}

          <div className="button-group flex gap-2 mb-6">
            <button
              onClick={handleCalculate}
              disabled={!input.trim()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded font-medium transition-colors"
            >
              Calculate
            </button>
            <button
              onClick={handleClear}
              disabled={!input && !results}
              className="px-6 py-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500 text-slate-900 dark:text-slate-100 rounded font-medium transition-colors"
            >
              Clear
            </button>
          </div>

          {results && (
            <div className="results-section space-y-4">
              <h4 className="font-semibold text-lg text-slate-900 dark:text-slate-100 mb-3">
                Results:
              </h4>

              <div className="result-grid grid grid-cols-2 gap-4">
                <div className="result-card p-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                  <div className="result-label text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Count
                  </div>
                  <div className="result-value text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {results.count}
                  </div>
                </div>

                <div className="result-card p-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                  <div className="result-label text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Mean (Average)
                  </div>
                  <div className="result-value text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatNumber(results.mean)}
                  </div>
                </div>

                <div className="result-card p-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                  <div className="result-label text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Median
                  </div>
                  <div className="result-value text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatNumber(results.median)}
                  </div>
                </div>

                <div className="result-card p-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                  <div className="result-label text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Mode
                  </div>
                  <div className="result-value text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {results.mode === null
                      ? 'None'
                      : Array.isArray(results.mode)
                      ? results.mode.map(formatNumber).join(', ')
                      : formatNumber(results.mode)}
                  </div>
                </div>

                <div className="result-card p-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                  <div className="result-label text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Range
                  </div>
                  <div className="result-value text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {formatNumber(results.range)}
                  </div>
                </div>

                <div className="result-card p-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                  <div className="result-label text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Min / Max
                  </div>
                  <div className="result-value text-xl font-bold text-slate-900 dark:text-slate-100">
                    {formatNumber(results.min)} / {formatNumber(results.max)}
                  </div>
                </div>
              </div>

              <div className="values-display mt-4 p-3 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-600">
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Sorted Values:
                </div>
                <div className="text-slate-900 dark:text-slate-100 font-mono">
                  {[...results.values].sort((a, b) => a - b).join(', ')}
                </div>
              </div>
            </div>
          )}

          {!results && !error && (
            <div className="empty-state text-center py-8 text-slate-500 dark:text-slate-400">
              <p className="text-lg">
                Enter numbers above to calculate statistics
              </p>
              <p className="text-sm mt-2">
                Calculates mean, median, mode, and range
              </p>
            </div>
          )}
        </>
      )}

      {/* Practice Mode */}
      {mode === 'practice' && (
        <>
          <div className="mb-6">
            <button
              onClick={selectNewProblem}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
            >
              New Practice Problem
            </button>
          </div>

          {currentProblem ? (
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
              <h4 className="text-lg font-bold mb-3 text-slate-900 dark:text-slate-100">
                Practice Question:
              </h4>
              <p className="mb-4 text-slate-900 dark:text-slate-100">
                {currentProblem.question}
              </p>

              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 rounded">
                <strong className="text-slate-900 dark:text-slate-100">
                  Data:
                </strong>{' '}
                <span className="text-slate-900 dark:text-slate-100">
                  {currentProblem.data.join(', ')}
                </span>
              </div>

              <div className="mb-3">
                <label className="block font-semibold mb-2 text-slate-900 dark:text-slate-100">
                  Your Answer:
                </label>
                <input
                  type="text"
                  value={studentAnswer}
                  onChange={(e) => setStudentAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkPracticeAnswer()}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg"
                  placeholder="Enter your answer"
                />
              </div>

              <button
                onClick={checkPracticeAnswer}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
              >
                Check Answer
              </button>

              {feedback && (
                <div
                  className={`mt-4 p-3 rounded-lg ${
                    feedback.isCorrect
                      ? 'bg-green-100 text-green-800 border-2 border-green-500'
                      : 'bg-red-100 text-red-800 border-2 border-red-500'
                  }`}
                >
                  <p className="font-bold mb-2">
                    {feedback.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  {!feedback.isCorrect && (
                    <p className="mb-2">
                      Correct answer: {feedback.correctAnswer}
                    </p>
                  )}
                  <p className="text-sm">
                    <strong>Explanation:</strong> {feedback.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              <p className="text-lg">Click "New Practice Problem" to begin!</p>
              <p className="text-sm mt-2">
                {STATS_PRACTICE_PROBLEMS.length} practice problems available
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
