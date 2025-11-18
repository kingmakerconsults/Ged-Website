import React from 'react';

export default function CareerMiniPanel({ recommendations, onExploreMore }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Career Paths
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Complete some quizzes to get personalized career recommendations!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <span>💼</span>
          <span>Recommended Careers</span>
        </h3>
        <p className="text-white/80 text-sm mb-4">Based on your strengths</p>

        <div className="space-y-3 mb-4">
          {recommendations.slice(0, 2).map((career, idx) => (
            <div
              key={idx}
              className="bg-white/20 backdrop-blur-sm rounded-lg p-3 hover:bg-white/30 transition-colors"
            >
              <p className="font-bold text-white mb-1">{career.title}</p>
              <p className="text-sm text-white/80 mb-1">{career.reason}</p>
              <p className="text-xs text-white/70 font-semibold">
                {career.avgSalary}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onExploreMore}
          className="w-full px-4 py-2 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
        >
          Open Workforce Explorer →
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute -left-8 -top-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
    </div>
  );
}
