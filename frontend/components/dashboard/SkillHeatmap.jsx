import React, { useState, useEffect } from 'react';

export default function SkillHeatmap() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/student/skill-heatmap', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSkills(data.skills || []);
    } catch (err) {
      console.error('[SkillHeatmap] Load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      mastered: {
        icon: '✓',
        text: 'Mastered',
        tip: 'High accuracy with confidence!',
      },
      lucky: {
        icon: '?',
        text: 'Lucky Guesses',
        tip: 'You are guessing correctly often. Review fundamentals.',
      },
      misconception: {
        icon: '!',
        text: 'Misconception',
        tip: 'You are confident but incorrect. Relearn this concept.',
      },
      learning: {
        icon: '→',
        text: 'Learning',
        tip: 'Keep practicing to improve.',
      },
    };
    return labels[status] || labels.learning;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🎯 Skill Galaxy
        </h3>
        <div className="animate-pulse space-y-3">
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🎯 Skill Galaxy
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Complete some quizzes to see your skill breakdown here!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        🎯 Skill Galaxy
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Your performance on specific challenge areas, with confidence insights:
      </p>
      <div className="skill-heatmap">
        {skills.map((skill, index) => {
          const label = getStatusLabel(skill.status);
          return (
            <div key={index} className={`skill-tile ${skill.status}`}>
              <div className="skill-tile-header">
                {label.icon} {skill.tag.replace(/-/g, ' ').toUpperCase()}
              </div>
              <div className="text-center my-2">
                <div className="text-2xl font-bold">{skill.accuracy}%</div>
                <div className="text-xs opacity-80">{label.text}</div>
              </div>
              <div className="skill-tile-stats">
                <span>✓ {skill.correct}</span>
                <span>✗ {skill.wrong}</span>
              </div>
              {(skill.luckyGuesses > 0 || skill.misconceptions > 0) && (
                <div className="text-xs mt-2 pt-2 border-t border-current opacity-70">
                  {skill.luckyGuesses > 0 && (
                    <div>🎲 Lucky: {skill.luckyGuesses}</div>
                  )}
                  {skill.misconceptions > 0 && (
                    <div>⚠️ Misconceptions: {skill.misconceptions}</div>
                  )}
                </div>
              )}
              <div className="skill-tooltip">{label.tip}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
