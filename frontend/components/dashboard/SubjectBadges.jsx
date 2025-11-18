import React from 'react';

const badges = {
  rla: {
    icon: '📚',
    label: 'RLA Master',
    color: 'from-purple-500 to-purple-700',
    description: 'Passed RLA section',
  },
  math: {
    icon: '📐',
    label: 'Math Expert',
    color: 'from-blue-500 to-blue-700',
    description: 'Passed Math section',
  },
  science: {
    icon: '🔬',
    label: 'Science Scholar',
    color: 'from-red-500 to-red-700',
    description: 'Passed Science section',
  },
  social: {
    icon: '🌍',
    label: 'Social Studies Pro',
    color: 'from-green-500 to-green-700',
    description: 'Passed Social Studies section',
  },
};

export default function SubjectBadges({ badgeData }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Subject Badges
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(badges).map(([key, badge]) => {
          const earned = badgeData[key]?.earned || false;
          const date = badgeData[key]?.date;
          const score = badgeData[key]?.score;

          return (
            <div
              key={key}
              className={`relative p-4 rounded-xl transition-all ${
                earned
                  ? `bg-gradient-to-br ${badge.color} text-white shadow-lg hover:shadow-xl hover:scale-105`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              }`}
            >
              {/* Badge Icon */}
              <div className="text-4xl mb-2 text-center">
                {earned ? badge.icon : '🔒'}
              </div>

              {/* Badge Label */}
              <p
                className={`text-sm font-bold text-center mb-1 ${
                  earned ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {badge.label}
              </p>

              {/* Badge Description */}
              <p
                className={`text-xs text-center ${
                  earned ? 'text-white/80' : 'text-gray-500 dark:text-gray-500'
                }`}
              >
                {earned ? badge.description : 'Not earned yet'}
              </p>

              {/* Date or Score */}
              {earned && (score || date) && (
                <p className="text-xs text-center mt-2 text-white/90 font-medium">
                  {score
                    ? `Score: ${score}`
                    : date
                    ? new Date(date).toLocaleDateString()
                    : ''}
                </p>
              )}

              {/* Shine effect for earned badges */}
              {earned && (
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-xl"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress message */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          {Object.values(badgeData).filter((b) => b.earned).length} / 4 subjects
          completed
        </p>
      </div>
    </div>
  );
}
