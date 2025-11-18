import React from 'react';

const getLevelConfig = (score) => {
  if (score >= 200) {
    return {
      label: 'Advanced',
      color: 'bg-blue-500',
      textColor: 'text-blue-700 dark:text-blue-300',
      barColor: 'bg-gradient-to-r from-blue-400 to-blue-600',
    };
  } else if (score >= 170) {
    return {
      label: 'GED Ready',
      color: 'bg-green-500',
      textColor: 'text-green-700 dark:text-green-300',
      barColor: 'bg-gradient-to-r from-green-400 to-green-600',
    };
  } else if (score >= 145) {
    return {
      label: 'Almost Ready',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-700 dark:text-yellow-300',
      barColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
    };
  } else if (score >= 135) {
    return {
      label: 'Needs Work',
      color: 'bg-orange-500',
      textColor: 'text-orange-700 dark:text-orange-300',
      barColor: 'bg-gradient-to-r from-orange-400 to-orange-600',
    };
  } else {
    return {
      label: 'Getting Started',
      color: 'bg-red-500',
      textColor: 'text-red-700 dark:text-red-300',
      barColor: 'bg-gradient-to-r from-red-400 to-red-600',
    };
  }
};

export default function StudyLevelBar({ highestScore, onViewHistory }) {
  const score = highestScore || 100;
  const levelConfig = getLevelConfig(score);

  // Calculate percentage for progress bar (100-200 scale)
  const percentage = Math.min(100, Math.max(0, ((score - 100) / 100) * 100));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Study Level Progress
      </h3>

      {/* Score Display */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Highest Score
          </p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            {score}
          </p>
        </div>
        <div
          className={`px-4 py-2 rounded-full ${levelConfig.color} text-white font-bold shadow-lg`}
        >
          {levelConfig.label}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className={`${levelConfig.barColor} h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2`}
            style={{ width: `${percentage}%` }}
          >
            {percentage > 10 && (
              <span className="text-xs font-bold text-white">{score}</span>
            )}
          </div>
        </div>

        {/* Scale markers */}
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>100</span>
          <span className="font-semibold">135</span>
          <span className="font-semibold">145</span>
          <span className="font-semibold">170</span>
          <span>200</span>
        </div>
      </div>

      {/* Readiness Message */}
      <div
        className={`p-4 rounded-lg mb-4 ${levelConfig.color
          .replace('bg-', 'bg-')
          .replace('500', '50')} dark:bg-opacity-20`}
      >
        <p className={`text-sm font-medium ${levelConfig.textColor}`}>
          {score >= 145
            ? "✅ You're ready to pass the GED! Keep practicing to maintain your skills."
            : score >= 135
            ? "💪 You're close! Just a few more points to reach passing level."
            : '📚 Keep studying! Focus on your weak areas to improve quickly.'}
        </p>
      </div>

      {/* View History Button */}
      <button
        onClick={onViewHistory}
        className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        View Practice Exam History →
      </button>
    </div>
  );
}
