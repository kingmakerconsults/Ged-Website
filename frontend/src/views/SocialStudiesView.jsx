import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubjectTheme } from '../theme/designSystem';

/**
 * SocialStudiesView - Social Studies subject view
 *
 * Displays social studies content and provides a practice environment
 * for GED Social Studies.
 */
export default function SocialStudiesView({ dark = false }) {
  const navigate = useNavigate();
  const theme = getSubjectTheme('social-studies', dark);

  const toolCards = [
    {
      icon: '🏛️',
      title: 'Civics Reasoning Lab',
      subtitle:
        'Decide which branch and level of government handles each scenario.',
      href: '/tools/civics-reasoning',
      status: 'active',
    },
    {
      icon: '🗺️',
      title: 'Map Explorer',
      subtitle: 'Practice geography and map-reading questions like the GED.',
      href: '/tools/map-explorer',
      status: 'active',
    },
    {
      icon: '📜',
      title: 'History Timeline Builder',
      subtitle: 'Put key historical events in order and see how they connect.',
      href: '/tools/history-timeline',
      status: 'active',
    },
    {
      icon: '🗳️',
      title: 'Electoral College Simulator',
      subtitle: 'Practice electoral vote math and winner-takes-all scenarios.',
      href: '/tools/electoral-college',
      status: 'active',
    },
    {
      icon: '📋',
      title: 'Constitution Explorer',
      subtitle: 'Interactive amendments + case study scenarios.',
      href: '/tools/constitution-explorer',
      status: 'active',
    },
    {
      icon: '💰',
      title: 'Economics Market Simulator',
      subtitle: 'Shift supply/demand and interpret price/quantity changes.',
      href: '/tools/economics-market-simulator',
      status: 'active',
    },
  ];

  return (
    <div className="social-studies-view min-h-screen p-6 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div
        className="header-section mb-8 p-6 rounded-2xl shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
        }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: theme.text }}>
          Social Studies
        </h1>
        <p className="text-lg opacity-90" style={{ color: theme.text }}>
          Explore civics, history, geography, and economics
        </p>
      </div>

      {/* Content Area */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Social Studies Practice Tools
        </h2>

        <div className="tools-grid grid md:grid-cols-2 gap-6">
          {toolCards.map((card) => (
            <button
              key={card.href}
              onClick={() => navigate(card.href)}
              className="glass-card card-lift rounded-xl p-6 text-left transition-all"
              style={{
                borderLeft:
                  card.status === 'active'
                    ? `4px solid ${theme.primary}`
                    : undefined,
              }}
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">
                {card.subtitle}
              </p>
              <span
                className={`px-4 py-2 rounded-xl font-medium inline-block ${
                  card.status === 'active'
                    ? 'text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}
                style={
                  card.status === 'active'
                    ? { backgroundColor: theme.primary }
                    : undefined
                }
              >
                {card.status === 'active' ? 'Start' : 'Coming Soon'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-3">
          GED Social Studies Topics
        </h3>
        <ul className="space-y-2 text-sm">
          <li>
            <strong>Civics & Government (50%):</strong> Constitution, rights,
            political systems
          </li>
          <li>
            <strong>U.S. History (20%):</strong> Key events and movements in
            American history
          </li>
          <li>
            <strong>Geography (15%):</strong> Maps, regions, and
            human-environment interaction
          </li>
          <li>
            <strong>Economics (15%):</strong> Market systems, supply and demand,
            financial literacy
          </li>
        </ul>

        <div
          className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-white/5"
          style={{ borderLeft: `4px solid ${theme.primary}` }}
        >
          <h4 className="font-semibold mb-2">Study Tip</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Focus on understanding cause-and-effect relationships in historical
            events and practice analyzing primary source documents like
            speeches, letters, and political cartoons.
          </p>
        </div>

        <div
          className="mt-4 p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20"
          style={{ borderLeft: `4px solid ${theme.primary}` }}
        >
          <h4 className="font-semibold mb-2">Test Focus</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            The GED Social Studies test emphasizes reading comprehension and
            analysis over memorization. Practice interpreting charts, graphs,
            maps, and political cartoons.
          </p>
        </div>
      </div>
    </div>
  );
}
