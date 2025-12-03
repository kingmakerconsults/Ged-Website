import React from 'react';
import { getSubjectTheme } from '../../theme/designSystem.js';

/**
 * SubjectCard: unified styling for subject selection hubs.
 */
export function SubjectCard({
  subject,
  dark = false,
  icon = null,
  onClick,
  children,
  className = '',
}) {
  const theme = getSubjectTheme(subject, dark);
  const isRLA =
    subject.toLowerCase().includes('reasoning') ||
    subject.toLowerCase().includes('rla');

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative rounded-2xl p-6 md:p-7 text-left shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 transition ${className}`.trim()}
      style={{
        background: theme.bg,
        border: `1px solid ${theme.bgSoft}`,
        color: theme.accent,
        minHeight: '128px',
        '--tw-ring-color': isRLA ? theme.accent : '#0ea5e9',
      }}
    >
      <div className="flex items-center gap-4">
        {icon && (
          <span
            className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center shadow-inner"
            style={{
              background: theme.gradient,
              color: '#fff',
              filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.25))',
            }}
          >
            {typeof icon === 'string' ? (
              <img src={icon} alt="" className="w-9 h-9 md:w-10 md:h-10" />
            ) : (
              icon
            )}
          </span>
        )}
        <div className="flex-1">
          <h3
            className="font-extrabold text-xl md:text-2xl mb-1"
            style={{ color: theme.accent }}
          >
            {subject}
          </h3>
          <div
            className="text-sm md:text-base leading-snug"
            style={{ color: theme.accent, opacity: 0.8 }}
          >
            {children}
          </div>
        </div>
      </div>
    </button>
  );
}

export default SubjectCard;
