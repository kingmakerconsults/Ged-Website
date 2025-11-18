import React from 'react';

const subjectColors = {
  Math: 'from-blue-500 to-blue-700',
  Science: 'from-red-500 to-red-700',
  RLA: 'from-purple-500 to-purple-700',
  'Reasoning Through Language Arts (RLA)': 'from-purple-500 to-purple-700',
  'Social Studies': 'from-green-500 to-green-700',
};

const subjectIcons = {
  Math: '📐',
  Science: '🔬',
  RLA: '📚',
  'Reasoning Through Language Arts (RLA)': '📚',
  'Social Studies': '🌍',
};

export default function LearningPlanCard({ nextTask, onStartTask }) {
  if (!nextTask) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 shadow-lg border border-green-200 dark:border-green-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
              🎉 All Tasks Complete!
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Great work! You've completed today's study plan.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const gradient =
    subjectColors[nextTask.subject] || 'from-indigo-500 to-indigo-700';
  const icon = subjectIcons[nextTask.subject] || '📖';

  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 shadow-xl text-white relative overflow-hidden`}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{icon}</span>
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">
                {nextTask.isForTomorrow
                  ? "Tomorrow's Preview"
                  : 'Your Next Task'}
              </p>
              <h3 className="text-2xl font-bold">{nextTask.title}</h3>
            </div>
          </div>
        </div>

        <p className="text-white/90 mb-4 leading-relaxed">
          {nextTask.description}
        </p>

        {!nextTask.isForTomorrow && nextTask.expectedMinutes && (
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="bg-white/20 rounded-lg px-3 py-2">
              <span className="font-semibold">
                {nextTask.completedMinutes || 0}
              </span>{' '}
              / {nextTask.expectedMinutes} minutes
            </div>
            <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    ((nextTask.completedMinutes || 0) /
                      nextTask.expectedMinutes) *
                      100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={() => onStartTask(nextTask)}
            disabled={nextTask.isForTomorrow}
            className="px-6 py-3 bg-white text-gray-900 font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {nextTask.isForTomorrow ? 'Coming Tomorrow' : 'Start This Task →'}
          </button>

          {!nextTask.isForTomorrow && (
            <div className="text-white/80 text-sm">
              <span className="font-medium">{nextTask.subject}</span>
            </div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute -left-8 -top-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
    </div>
  );
}
