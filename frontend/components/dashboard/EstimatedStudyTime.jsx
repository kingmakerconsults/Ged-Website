import React from 'react';

export default function EstimatedStudyTime({ estimate }) {
  if (!estimate) {
    return null;
  }

  const hours = estimate.hoursRemaining || 0;
  const currentScore = estimate.basedOn?.currentScore || 100;

  // Create segments for visual display
  const segments = [
    { max: 25, label: '< 25h', color: 'bg-green-500' },
    { max: 50, label: '25-50h', color: 'bg-yellow-500' },
    { max: 100, label: '50-100h', color: 'bg-orange-500' },
    { max: 999, label: '100h+', color: 'bg-red-500' },
  ];

  const activeSegment = segments.findIndex((s) => hours <= s.max);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Estimated Study Time
      </h3>

      {/* Hours Display */}
      <div className="text-center mb-6">
        <p className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
          {hours}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          hours to reach passing (145+)
        </p>
      </div>

      {/* Segmented Bar */}
      <div className="flex gap-1 mb-4">
        {segments.map((seg, idx) => (
          <div
            key={idx}
            className={`flex-1 h-8 rounded transition-all ${
              idx === activeSegment
                ? `${seg.color} shadow-lg scale-105`
                : idx < activeSegment
                ? `${seg.color} opacity-50`
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
        {segments.map((seg, idx) => (
          <span key={idx} className="text-center flex-1">
            {seg.label}
          </span>
        ))}
      </div>

      {/* Details */}
      {estimate.basedOn && (
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Current Score:
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentScore}
            </span>
          </div>
          {estimate.basedOn.rate > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Improvement Rate:
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                +{estimate.basedOn.rate} pts/attempt
              </span>
            </div>
          )}
          {estimate.basedOn.lastScores &&
            estimate.basedOn.lastScores.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Recent Scores:
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {estimate.basedOn.lastScores.join(', ')}
                </span>
              </div>
            )}
        </div>
      )}

      {/* Motivation Message */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          {hours <= 25
            ? "🎯 You're almost there! Keep up the great work!"
            : hours <= 50
            ? "💪 You're making progress! Stay consistent!"
            : "📚 Take it one step at a time. You've got this!"}
        </p>
      </div>
    </div>
  );
}
