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
  ];

  return (
    <div
      className="social-studies-view min-h-screen p-6"
      style={{
        backgroundColor: dark ? '#0f172a' : '#f8fafc',
        color: dark ? '#e2e8f0' : '#1e293b',
      }}
    >
      {/* Header */}
      <div
        className="header-section mb-8 p-6 rounded-xl shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
        }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: theme.text }}>
          🌍 Social Studies
        </h1>
        <p className="text-lg opacity-90" style={{ color: theme.text }}>
          Explore civics, history, geography, and economics
        </p>
      </div>

      {/* Content Area */}
      <div
        className="content-section p-6 rounded-lg mb-6"
        style={{
          backgroundColor: dark ? '#1e293b' : '#ffffff',
          border: `2px solid ${dark ? '#334155' : '#e2e8f0'}`,
        }}
      >
        <h2 className="text-2xl font-bold mb-4">
          Social Studies Practice Tools
        </h2>

        <div className="tools-grid grid md:grid-cols-2 gap-6">
          {toolCards.map((card) => (
            <button
              key={card.href}
              onClick={() => navigate(card.href)}
              className="tool-card p-6 rounded-lg text-left transition-all hover:shadow-lg"
              style={{
                backgroundColor: dark ? '#334155' : '#f1f5f9',
                border: `2px solid ${
                  card.status === 'active'
                    ? theme.primary
                    : dark
                    ? '#334155'
                    : '#e2e8f0'
                }`,
                cursor: 'pointer',
              }}
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p
                className="text-sm mb-4"
                style={{ color: dark ? '#94a3b8' : '#64748b' }}
              >
                {card.subtitle}
              </p>
              <span
                className="px-4 py-2 rounded font-medium inline-block"
                style={{
                  backgroundColor:
                    card.status === 'active'
                      ? theme.primary
                      : dark
                      ? '#475569'
                      : '#cbd5e1',
                  color:
                    card.status === 'active'
                      ? theme.text || '#ffffff'
                      : dark
                      ? '#94a3b8'
                      : '#64748b',
                }}
              >
                {card.status === 'active' ? 'Start' : 'Coming Soon'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div
        className="info-section p-6 rounded-lg"
        style={{
          backgroundColor: dark ? '#1e293b' : '#ffffff',
          border: `2px solid ${dark ? '#334155' : '#e2e8f0'}`,
        }}
      >
        <h3 className="text-lg font-semibold mb-3">
          GED Social Studies Topics
        </h3>
        <ul className="space-y-2 text-sm">
          <li>
            🏛️ <strong>Civics & Government (50%):</strong> Constitution, rights,
            political systems
          </li>
          <li>
            📜 <strong>U.S. History (20%):</strong> Key events and movements in
            American history
          </li>
          <li>
            🗺️ <strong>Geography (15%):</strong> Maps, regions, and
            human-environment interaction
          </li>
          <li>
            💰 <strong>Economics (15%):</strong> Market systems, supply and
            demand, financial literacy
          </li>
        </ul>

        <div
          className="mt-6 p-4 rounded-lg"
          style={{
            backgroundColor: dark ? '#334155' : '#f1f5f9',
            borderLeft: `4px solid ${theme.primary}`,
          }}
        >
          <h4 className="font-semibold mb-2">💡 Study Tip</h4>
          <p className="text-sm">
            Focus on understanding cause-and-effect relationships in historical
            events and practice analyzing primary source documents like
            speeches, letters, and political cartoons.
          </p>
        </div>

        <div
          className="mt-4 p-4 rounded-lg"
          style={{
            backgroundColor: dark ? '#1e3a5f' : '#dbeafe',
            borderLeft: `4px solid ${theme.primary}`,
          }}
        >
          <h4 className="font-semibold mb-2">📊 Test Focus</h4>
          <p className="text-sm">
            The GED Social Studies test emphasizes reading comprehension and
            analysis over memorization. Practice interpreting charts, graphs,
            maps, and political cartoons.
          </p>
        </div>
      </div>
    </div>
  );
}
