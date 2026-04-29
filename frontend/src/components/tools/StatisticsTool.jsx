import React, { useState } from 'react';

// Statistics Practice Problems
const STATS_PRACTICE_PROBLEMS = [
  // ─── Mean ───
  {
    id: 'stats_1',
    question: 'Find the mean of: 5, 10, 15, 20, 15',
    data: [5, 10, 15, 20, 15],
    askFor: 'mean',
    answer: 13,
    explanation: 'Mean = (5 + 10 + 15 + 20 + 15) / 5 = 65 / 5 = 13',
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
    id: 'stats_8',
    question: 'Find the mean of: 12, 18, 24, 30',
    data: [12, 18, 24, 30],
    askFor: 'mean',
    answer: 21,
    explanation: 'Mean = (12 + 18 + 24 + 30) / 4 = 84 / 4 = 21',
  },
  {
    id: 'stats_mean_01',
    question: 'Find the mean of: 7, 14, 21, 28',
    data: [7, 14, 21, 28],
    askFor: 'mean',
    answer: 17.5,
    explanation: 'Mean = (7 + 14 + 21 + 28) / 4 = 70 / 4 = 17.5',
  },
  {
    id: 'stats_mean_02',
    question: 'Find the mean of: 3, 3, 3, 3, 3',
    data: [3, 3, 3, 3, 3],
    askFor: 'mean',
    answer: 3,
    explanation:
      'Mean = (3 + 3 + 3 + 3 + 3) / 5 = 15 / 5 = 3. All values are the same, so the mean equals that value.',
  },
  {
    id: 'stats_mean_03',
    question:
      'A student scored 72, 86, 90, 68, and 84 on five tests. What is their mean score?',
    data: [72, 86, 90, 68, 84],
    askFor: 'mean',
    answer: 80,
    explanation: 'Mean = (72 + 86 + 90 + 68 + 84) / 5 = 400 / 5 = 80',
  },
  {
    id: 'stats_mean_04',
    question: 'Find the mean of: 200, 400, 600',
    data: [200, 400, 600],
    askFor: 'mean',
    answer: 400,
    explanation: 'Mean = (200 + 400 + 600) / 3 = 1200 / 3 = 400',
  },
  {
    id: 'stats_mean_05',
    question: 'Find the mean of: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10',
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    askFor: 'mean',
    answer: 5.5,
    explanation: 'Mean = (1+2+3+4+5+6+7+8+9+10) / 10 = 55 / 10 = 5.5',
  },
  {
    id: 'stats_mean_06',
    question:
      'Five friends earned $12, $15, $18, $9, and $21. What is the mean amount earned?',
    data: [12, 15, 18, 9, 21],
    askFor: 'mean',
    answer: 15,
    explanation: 'Mean = (12 + 15 + 18 + 9 + 21) / 5 = 75 / 5 = 15',
  },
  {
    id: 'stats_mean_07',
    question: 'Find the mean of: 50, 75, 25, 100',
    data: [50, 75, 25, 100],
    askFor: 'mean',
    answer: 62.5,
    explanation: 'Mean = (50 + 75 + 25 + 100) / 4 = 250 / 4 = 62.5',
  },
  {
    id: 'stats_mean_08',
    question:
      'A store sold 4, 7, 3, 9, and 2 items on five days. What is the mean number of items sold per day?',
    data: [4, 7, 3, 9, 2],
    askFor: 'mean',
    answer: 5,
    explanation: 'Mean = (4 + 7 + 3 + 9 + 2) / 5 = 25 / 5 = 5',
  },
  // ─── Median ───
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
    id: 'stats_6',
    question: 'Find the median of: 6, 2, 8, 4, 10, 12',
    data: [6, 2, 8, 4, 10, 12],
    askFor: 'median',
    answer: 7,
    explanation:
      'Sorted: 2, 4, 6, 8, 10, 12. With an even count, median = (6 + 8) / 2 = 7',
  },
  {
    id: 'stats_med_01',
    question: 'Find the median of: 10, 30, 20, 40, 50',
    data: [10, 30, 20, 40, 50],
    askFor: 'median',
    answer: 30,
    explanation: 'Sorted: 10, 20, 30, 40, 50. The middle (3rd) value is 30.',
  },
  {
    id: 'stats_med_02',
    question: 'Find the median of: 5, 1, 9, 3, 7',
    data: [5, 1, 9, 3, 7],
    askFor: 'median',
    answer: 5,
    explanation: 'Sorted: 1, 3, 5, 7, 9. The middle value is 5.',
  },
  {
    id: 'stats_med_03',
    question: 'Find the median of: 14, 22, 8, 16',
    data: [14, 22, 8, 16],
    askFor: 'median',
    answer: 15,
    explanation:
      'Sorted: 8, 14, 16, 22. Median = (14 + 16) / 2 = 15 (average of the two middle values).',
  },
  {
    id: 'stats_med_04',
    question:
      "Seven students' test scores: 55, 72, 88, 61, 79, 90, 68. What is the median?",
    data: [55, 72, 88, 61, 79, 90, 68],
    askFor: 'median',
    answer: 72,
    explanation:
      'Sorted: 55, 61, 68, 72, 79, 88, 90. The 4th value (middle of 7) is 72.',
  },
  {
    id: 'stats_med_05',
    question: 'Find the median of: 100, 200, 300, 400',
    data: [100, 200, 300, 400],
    askFor: 'median',
    answer: 250,
    explanation: 'Sorted: 100, 200, 300, 400. Median = (200 + 300) / 2 = 250.',
  },
  {
    id: 'stats_med_06',
    question: 'Find the median of: 13, 7, 21, 4, 17, 9',
    data: [13, 7, 21, 4, 17, 9],
    askFor: 'median',
    answer: 11,
    explanation: 'Sorted: 4, 7, 9, 13, 17, 21. Median = (9 + 13) / 2 = 11.',
  },
  // ─── Mode ───
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
    id: 'stats_mode_01',
    question: 'Find the mode of: 1, 2, 2, 3, 4, 5, 2',
    data: [1, 2, 2, 3, 4, 5, 2],
    askFor: 'mode',
    answer: 2,
    explanation: 'The value 2 appears 3 times — more than any other value.',
  },
  {
    id: 'stats_mode_02',
    question: 'Find the mode of: 9, 3, 7, 3, 5, 3, 9',
    data: [9, 3, 7, 3, 5, 3, 9],
    askFor: 'mode',
    answer: 3,
    explanation: '3 appears 3 times; 9 appears only 2 times. Mode = 3.',
  },
  {
    id: 'stats_mode_03',
    question:
      'A survey of shoe sizes: 8, 9, 10, 8, 11, 8, 9. What is the mode?',
    data: [8, 9, 10, 8, 11, 8, 9],
    askFor: 'mode',
    answer: 8,
    explanation: 'Size 8 appears 3 times — the most common size. Mode = 8.',
  },
  {
    id: 'stats_mode_04',
    question: 'Find the mode of: 15, 20, 15, 25, 30, 20, 15',
    data: [15, 20, 15, 25, 30, 20, 15],
    askFor: 'mode',
    answer: 15,
    explanation: '15 appears 3 times (20 appears 2 times). Mode = 15.',
  },
  // ─── Range ───
  {
    id: 'stats_4',
    question: 'Find the range of: 15, 22, 8, 35, 12',
    data: [15, 22, 8, 35, 12],
    askFor: 'range',
    answer: 27,
    explanation: 'Range = Maximum - Minimum = 35 - 8 = 27',
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
    id: 'stats_rng_01',
    question: 'Find the range of: 5, 10, 15, 20, 25',
    data: [5, 10, 15, 20, 25],
    askFor: 'range',
    answer: 20,
    explanation: 'Range = 25 - 5 = 20',
  },
  {
    id: 'stats_rng_02',
    question:
      'The high temperatures this week were 88, 91, 76, 83, 79, 85, 90. What is the range?',
    data: [88, 91, 76, 83, 79, 85, 90],
    askFor: 'range',
    answer: 15,
    explanation: 'Range = 91 - 76 = 15',
  },
  {
    id: 'stats_rng_03',
    question: 'Find the range of: 1000, 250, 750, 500',
    data: [1000, 250, 750, 500],
    askFor: 'range',
    answer: 750,
    explanation: 'Range = 1000 - 250 = 750',
  },
  {
    id: 'stats_rng_04',
    question: 'Find the range of: 0, 5, 10, 15, 20, 25, 30',
    data: [0, 5, 10, 15, 20, 25, 30],
    askFor: 'range',
    answer: 30,
    explanation: 'Range = 30 - 0 = 30',
  },
  {
    id: 'stats_rng_05',
    question:
      'A class recorded plant heights in cm: 12, 19, 7, 23, 15. What is the range?',
    data: [12, 19, 7, 23, 15],
    askFor: 'range',
    answer: 16,
    explanation: 'Range = 23 - 7 = 16',
  },
  // ─── Mixed / applied (real-world contexts) ───
  {
    id: 'stats_app_01',
    question:
      'A basketball player scored 18, 24, 30, 22, and 26 points in five games. What is the mean score per game?',
    data: [18, 24, 30, 22, 26],
    askFor: 'mean',
    answer: 24,
    explanation: 'Mean = (18 + 24 + 30 + 22 + 26) / 5 = 120 / 5 = 24',
  },
  {
    id: 'stats_app_02',
    question:
      'Monthly rainfall (inches): 2, 5, 4, 3, 6, 2, 1, 2, 3, 4, 5, 3. What is the range?',
    data: [2, 5, 4, 3, 6, 2, 1, 2, 3, 4, 5, 3],
    askFor: 'range',
    answer: 5,
    explanation: 'Range = 6 - 1 = 5 inches.',
  },
  {
    id: 'stats_app_03',
    question:
      "Workers' hourly wages: $9, $12, $9, $15, $9, $18, $12. What wage is the mode?",
    data: [9, 12, 9, 15, 9, 18, 12],
    askFor: 'mode',
    answer: 9,
    explanation:
      '$9 appears 3 times — more frequently than any other wage. Mode = $9.',
  },
  {
    id: 'stats_app_04',
    question:
      'Ages of 6 volunteers: 24, 31, 45, 29, 38, 33. What is the median age?',
    data: [24, 31, 45, 29, 38, 33],
    askFor: 'median',
    answer: 32,
    explanation: 'Sorted: 24, 29, 31, 33, 38, 45. Median = (31 + 33) / 2 = 32.',
  },
  {
    id: 'stats_app_05',
    question: 'Find the mean of: 0, 0, 0, 100',
    data: [0, 0, 0, 100],
    askFor: 'mean',
    answer: 25,
    explanation:
      'Mean = (0 + 0 + 0 + 100) / 4 = 100 / 4 = 25. This shows how outliers can pull the mean away from most values.',
  },
  {
    id: 'stats_app_06',
    question:
      'Test scores: 60, 70, 70, 80, 80, 80, 90, 90, 100. What is the mode?',
    data: [60, 70, 70, 80, 80, 80, 90, 90, 100],
    askFor: 'mode',
    answer: 80,
    explanation: '80 appears 3 times — the highest frequency. Mode = 80.',
  },
  {
    id: 'stats_app_07',
    question:
      'Prices at six stores: $2.50, $3.00, $2.75, $3.25, $2.50, $3.00. What is the median price?',
    data: [2.5, 3.0, 2.75, 3.25, 2.5, 3.0],
    askFor: 'median',
    answer: 2.875,
    explanation:
      'Sorted: 2.50, 2.50, 2.75, 3.00, 3.00, 3.25. Median = (2.75 + 3.00) / 2 = 2.875.',
  },
  {
    id: 'stats_app_08',
    question:
      'A car traveled 300, 450, and 375 miles over three trips. What was the mean distance per trip?',
    data: [300, 450, 375],
    askFor: 'mean',
    answer: 375,
    explanation: 'Mean = (300 + 450 + 375) / 3 = 1125 / 3 = 375 miles.',
  },
  {
    id: 'stats_app_09',
    question: 'Find the range of quiz scores: 62, 78, 55, 91, 84, 70',
    data: [62, 78, 55, 91, 84, 70],
    askFor: 'range',
    answer: 36,
    explanation: 'Range = 91 - 55 = 36',
  },
  {
    id: 'stats_app_10',
    question:
      'Daily steps walked: 8000, 10000, 7500, 9000, 9500. What is the median?',
    data: [8000, 10000, 7500, 9000, 9500],
    askFor: 'median',
    answer: 9000,
    explanation: 'Sorted: 7500, 8000, 9000, 9500, 10000. Middle value = 9000.',
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
  const [practiceError, setPracticeError] = useState('');

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
    setPracticeError('');
  };

  const checkPracticeAnswer = () => {
    if (!currentProblem) return;
    setPracticeError('');
    if (studentAnswer.trim() === '') {
      setPracticeError('Please enter an answer.');
      return;
    }

    const numericAnswer = parseFloat(studentAnswer);
    if (isNaN(numericAnswer)) {
      setPracticeError('Please enter a valid number.');
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
                  inputMode="decimal"
                  value={studentAnswer}
                  onChange={(e) => {
                    setStudentAnswer(e.target.value);
                    if (practiceError) setPracticeError('');
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && checkPracticeAnswer()}
                  aria-invalid={!!practiceError}
                  aria-describedby={
                    practiceError ? 'stats-practice-error' : undefined
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg"
                  placeholder="Enter your answer"
                />
                {practiceError && (
                  <p
                    id="stats-practice-error"
                    role="alert"
                    className="mt-2 text-sm text-red-700 dark:text-red-300"
                  >
                    {practiceError}
                  </p>
                )}
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
