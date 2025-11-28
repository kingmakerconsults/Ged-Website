import React, { useState } from 'react';

/**
 * StatisticsTool - Calculator for mean, median, mode, and range
 * 
 * This component provides a UI for calculating common statistical measures
 * from a set of numeric values.
 * 
 * @param {Object} props
 * @param {Function} props.onCalculate - Callback when statistics are calculated
 */
export default function StatisticsTool({ onCalculate = null }) {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const parseNumbers = (text) => {
    // Parse numbers from comma or space-separated input
    const numbers = text
      .split(/[,\s]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => parseFloat(s))
      .filter(n => !isNaN(n));
    
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
    numbers.forEach(n => {
      frequency[n] = (frequency[n] || 0) + 1;
    });
    
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency)
      .filter(key => frequency[key] === maxFreq)
      .map(key => parseFloat(key));
    
    // Return null if all values appear once (no mode)
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

    if (onCalculate) {
      onCalculate(stats);
    }
  };

  const handleClear = () => {
    setInput('');
    setResults(null);
    setError('');
  };

  const formatNumber = (num) => {
    if (num === null || num === undefined) return 'N/A';
    return typeof num === 'number' ? num.toFixed(2) : num.toString();
  };

  return (
    <div className="statistics-tool w-full bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400">
        📊 Statistics Calculator
      </h3>

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
          aria-label="Number input for statistics"
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
                    : formatNumber(results.mode)
                }
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
          <p className="text-lg">Enter numbers above to calculate statistics</p>
          <p className="text-sm mt-2">Calculates mean, median, mode, and range</p>
        </div>
      )}
    </div>
  );
}
