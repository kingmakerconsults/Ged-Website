import React, { useState } from 'react';

const domainDefinitions = {
  rla: [
    { label: 'Reading Comprehension', skill: 'reading' },
    { label: 'Argument Evaluation', skill: 'argument' },
    { label: 'Grammar & Language', skill: 'grammar' },
    { label: 'Extended Response', skill: 'writing' },
  ],
  math: [
    { label: 'Algebra', skill: 'algebra' },
    { label: 'Quantitative Reasoning', skill: 'quantitative' },
    { label: 'Geometry', skill: 'geometry' },
    { label: 'Statistics & Probability', skill: 'statistics' },
  ],
  science: [
    { label: 'Life Science', skill: 'life' },
    { label: 'Physical Science', skill: 'physical' },
    { label: 'Earth & Space', skill: 'earth' },
    { label: 'Data Interpretation', skill: 'numeracy' },
  ],
  social: [
    { label: 'Civics & Government', skill: 'civics' },
    { label: 'Economics', skill: 'economics' },
    { label: 'U.S. History', skill: 'history' },
    { label: 'Geography & World', skill: 'geography' },
  ],
};

const masteryLevels = [
  {
    level: 0,
    label: 'Not Started',
    color: 'bg-gray-300 dark:bg-gray-700',
    textColor: 'text-gray-600 dark:text-gray-400',
  },
  {
    level: 1,
    label: 'Needs Study',
    color: 'bg-red-400',
    textColor: 'text-red-700 dark:text-red-300',
  },
  {
    level: 2,
    label: 'Passing',
    color: 'bg-yellow-400',
    textColor: 'text-yellow-700 dark:text-yellow-300',
  },
  {
    level: 3,
    label: 'Advanced',
    color: 'bg-green-400',
    textColor: 'text-green-700 dark:text-green-300',
  },
  {
    level: 4,
    label: 'Honors',
    color: 'bg-blue-500',
    textColor: 'text-blue-700 dark:text-blue-300',
  },
];

const tabs = [
  { key: 'rla', label: 'RLA', icon: '📚', color: 'purple' },
  { key: 'math', label: 'Math', icon: '📐', color: 'blue' },
  { key: 'science', label: 'Science', icon: '🔬', color: 'red' },
  { key: 'social', label: 'Social Studies', icon: '🌍', color: 'green' },
];

export default function MasteryPanel({ mastery, onImprove }) {
  const [activeTab, setActiveTab] = useState('rla');

  const getMasteryForSkill = (tabKey, skillDef) => {
    const data = mastery[tabKey] || [];
    // Try to match by skill substring
    const match = data.find(
      (m) =>
        m.skill.toLowerCase().includes(skillDef.skill.toLowerCase()) ||
        skillDef.label.toLowerCase().includes(m.skill.toLowerCase())
    );
    return match || { skill: skillDef.label, mastery: 0, score: null };
  };

  const renderMasteryDots = (level) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => {
          const config = masteryLevels[Math.min(i, level)] || masteryLevels[0];
          return (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i <= level ? config.color : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          );
        })}
      </div>
    );
  };

  const activeTabData = tabs.find((t) => t.key === activeTab);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Mastery by Domain
      </h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === tab.key
                ? `bg-${tab.color}-500 text-white shadow-md`
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Domain Skills */}
      <div className="space-y-3">
        {domainDefinitions[activeTab].map((skillDef, idx) => {
          const masteryData = getMasteryForSkill(activeTab, skillDef);
          const levelConfig =
            masteryLevels[masteryData.mastery] || masteryLevels[0];

          return (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {skillDef.label}
                  </span>
                  {renderMasteryDots(masteryData.mastery)}
                  <span
                    className={`text-sm font-medium ${levelConfig.textColor}`}
                  >
                    {levelConfig.label}
                  </span>
                </div>
                {masteryData.score && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Last Score:{' '}
                    <span className="font-semibold">{masteryData.score}</span>
                  </p>
                )}
              </div>

              <button
                onClick={() => onImprove(activeTab, skillDef.label)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  masteryData.mastery >= 4
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 cursor-default'
                    : `bg-${activeTabData.color}-500 text-white hover:bg-${activeTabData.color}-600 hover:shadow-md`
                }`}
                disabled={masteryData.mastery >= 4}
              >
                {masteryData.mastery >= 4 ? '⭐ Mastered' : 'Improve'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
