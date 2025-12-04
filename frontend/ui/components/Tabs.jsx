// Canonical Tabs component
import React, { useState } from 'react';
import { colors, radii, typography } from '../theme';

export default function Tabs({ tabs, initial = 0, onChange }) {
  const [active, setActive] = useState(initial);
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        borderBottom: `2px solid ${colors.border}`,
      }}
    >
      {tabs.map((tab, idx) => (
        <button
          key={tab.label}
          onClick={() => {
            setActive(idx);
            onChange && onChange(idx);
          }}
          style={{
            background: 'none',
            border: 'none',
            borderBottom:
              active === idx ? `3px solid ${colors.primary}` : 'none',
            color: active === idx ? colors.primary : colors.muted,
            fontFamily: typography.fontFamily,
            fontWeight: typography.fontWeightBold,
            fontSize: typography.fontSizeBase,
            padding: '0.75rem 1.5rem',
            borderRadius: radii.sm,
            cursor: 'pointer',
            transition: 'color 0.2s',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
