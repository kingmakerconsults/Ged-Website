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
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative rounded-2xl p-5 text-left shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition ${className}`.trim()}
      style={{
        background: theme.bg,
        border: `1px solid ${theme.bgSoft}`,
        color: theme.accent,
      }}
    >
      <div className="flex items-center gap-4">
        {icon && (
          <span
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-inner"
            style={{
              background: theme.gradient,
              color: '#fff',
              filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.25))',
            }}
          >
            {typeof icon === 'string' ? (
              <img src={icon} alt="" className="w-8 h-8" />
            ) : (
              icon
            )}
          </span>
        )}
        <div className="flex-1">
          <h3
            className="font-extrabold text-lg mb-1"
            style={{ color: theme.accent }}
          >
            {subject}
          </h3>
          <div className="text-sm leading-snug text-primary">{children}</div>
        </div>
      </div>
    </button>
  );
}

export default SubjectCard;
