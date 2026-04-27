import React, { useMemo, useState } from 'react';

// Tilegrid coordinates (col, row) for each US state. Roughly approximates the
// geographic layout while keeping every state a uniform square — works well
// in dark/light mode and avoids loading a topojson dependency.
// Data: standard NPR-style cartogram layout.
const STATES = [
  { id: 'AK', name: 'Alaska', ev: 3, col: 0, row: 6 },
  { id: 'HI', name: 'Hawaii', ev: 4, col: 0, row: 7 },
  { id: 'WA', name: 'Washington', ev: 12, col: 1, row: 1 },
  { id: 'OR', name: 'Oregon', ev: 8, col: 1, row: 2 },
  { id: 'CA', name: 'California', ev: 54, col: 1, row: 3 },
  { id: 'NV', name: 'Nevada', ev: 6, col: 2, row: 3 },
  { id: 'ID', name: 'Idaho', ev: 4, col: 2, row: 2 },
  { id: 'MT', name: 'Montana', ev: 4, col: 3, row: 1 },
  { id: 'WY', name: 'Wyoming', ev: 3, col: 3, row: 2 },
  { id: 'UT', name: 'Utah', ev: 6, col: 3, row: 3 },
  { id: 'AZ', name: 'Arizona', ev: 11, col: 2, row: 4 },
  { id: 'NM', name: 'New Mexico', ev: 5, col: 3, row: 4 },
  { id: 'CO', name: 'Colorado', ev: 10, col: 4, row: 3 },
  { id: 'ND', name: 'North Dakota', ev: 3, col: 4, row: 1 },
  { id: 'SD', name: 'South Dakota', ev: 3, col: 4, row: 2 },
  { id: 'NE', name: 'Nebraska', ev: 5, col: 5, row: 2 },
  { id: 'KS', name: 'Kansas', ev: 6, col: 5, row: 3 },
  { id: 'OK', name: 'Oklahoma', ev: 7, col: 5, row: 4 },
  { id: 'TX', name: 'Texas', ev: 40, col: 4, row: 5 },
  { id: 'MN', name: 'Minnesota', ev: 10, col: 5, row: 1 },
  { id: 'IA', name: 'Iowa', ev: 6, col: 6, row: 2 },
  { id: 'MO', name: 'Missouri', ev: 10, col: 6, row: 3 },
  { id: 'AR', name: 'Arkansas', ev: 6, col: 6, row: 4 },
  { id: 'LA', name: 'Louisiana', ev: 8, col: 6, row: 5 },
  { id: 'WI', name: 'Wisconsin', ev: 10, col: 6, row: 1 },
  { id: 'IL', name: 'Illinois', ev: 19, col: 7, row: 2 },
  { id: 'MS', name: 'Mississippi', ev: 6, col: 7, row: 5 },
  { id: 'AL', name: 'Alabama', ev: 9, col: 8, row: 5 },
  { id: 'TN', name: 'Tennessee', ev: 11, col: 7, row: 4 },
  { id: 'KY', name: 'Kentucky', ev: 8, col: 7, row: 3 },
  { id: 'IN', name: 'Indiana', ev: 11, col: 8, row: 2 },
  { id: 'MI', name: 'Michigan', ev: 15, col: 8, row: 1 },
  { id: 'OH', name: 'Ohio', ev: 17, col: 9, row: 2 },
  { id: 'WV', name: 'West Virginia', ev: 4, col: 9, row: 3 },
  { id: 'GA', name: 'Georgia', ev: 16, col: 9, row: 5 },
  { id: 'FL', name: 'Florida', ev: 30, col: 10, row: 6 },
  { id: 'SC', name: 'South Carolina', ev: 9, col: 10, row: 5 },
  { id: 'NC', name: 'North Carolina', ev: 16, col: 10, row: 4 },
  { id: 'VA', name: 'Virginia', ev: 13, col: 10, row: 3 },
  { id: 'MD', name: 'Maryland', ev: 10, col: 11, row: 3 },
  { id: 'DE', name: 'Delaware', ev: 3, col: 11, row: 2 },
  { id: 'PA', name: 'Pennsylvania', ev: 19, col: 10, row: 2 },
  { id: 'NJ', name: 'New Jersey', ev: 14, col: 11, row: 1 },
  { id: 'NY', name: 'New York', ev: 28, col: 10, row: 1 },
  { id: 'CT', name: 'Connecticut', ev: 7, col: 11, row: 0 },
  { id: 'RI', name: 'Rhode Island', ev: 4, col: 12, row: 0 },
  { id: 'MA', name: 'Massachusetts', ev: 11, col: 11, row: -1 },
  { id: 'VT', name: 'Vermont', ev: 3, col: 10, row: 0 },
  { id: 'NH', name: 'New Hampshire', ev: 4, col: 12, row: -1 },
  { id: 'ME', name: 'Maine', ev: 4, col: 12, row: -2 },
  { id: 'DC', name: 'District of Col.', ev: 3, col: 12, row: 3 },
];

const TOTAL_EV = 538;
const WIN_THRESHOLD = 270;

const COLORS = {
  unassigned: {
    bg: '#e2e8f0',
    dark: '#475569',
    text: '#0f172a',
    textDark: '#f1f5f9',
  },
  D: { bg: '#3b82f6', dark: '#2563eb', text: '#ffffff', textDark: '#ffffff' },
  R: { bg: '#ef4444', dark: '#dc2626', text: '#ffffff', textDark: '#ffffff' },
};

/**
 * USElectoralMap — clickable tilegrid US map for electoral-college sandbox.
 * Click a state once → blue (D), again → red (R), again → unassigned.
 *
 * Props:
 *   - dark              boolean
 *   - initialAssignments { [stateId]: 'D' | 'R' }  preload an EV map
 *   - resetKey          any   bumping this resets to initialAssignments
 */
export default function USElectoralMap({
  dark = false,
  initialAssignments = null,
  resetKey = 0,
}) {
  const [assignments, setAssignments] = useState(() => ({
    ...(initialAssignments || {}),
  }));

  // When resetKey or initialAssignments change, re-seed.
  React.useEffect(() => {
    setAssignments({ ...(initialAssignments || {}) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  const tally = useMemo(() => {
    let d = 0;
    let r = 0;
    STATES.forEach((s) => {
      if (assignments[s.id] === 'D') d += s.ev;
      else if (assignments[s.id] === 'R') r += s.ev;
    });
    return { d, r, remaining: TOTAL_EV - d - r };
  }, [assignments]);

  const cycle = (id) => {
    setAssignments((prev) => {
      const cur = prev[id];
      const next = cur === 'D' ? 'R' : cur === 'R' ? undefined : 'D';
      const out = { ...prev };
      if (next) out[id] = next;
      else delete out[id];
      return out;
    });
  };

  const reset = () => setAssignments({});

  const fillSafeStates = (party) => {
    // Quick-start: assign known reliably-blue or reliably-red states
    const safe = {
      D: [
        'CA',
        'NY',
        'IL',
        'MA',
        'WA',
        'OR',
        'NJ',
        'MD',
        'CT',
        'RI',
        'VT',
        'HI',
        'DE',
        'DC',
      ],
      R: [
        'TX',
        'FL',
        'TN',
        'OK',
        'AR',
        'LA',
        'AL',
        'MS',
        'KY',
        'WV',
        'WY',
        'ID',
        'MT',
        'ND',
        'SD',
        'NE',
        'KS',
        'UT',
        'IN',
        'MO',
        'AK',
        'SC',
      ],
    };
    setAssignments((prev) => {
      const out = { ...prev };
      safe[party].forEach((id) => {
        out[id] = party;
      });
      return out;
    });
  };

  const minCol = Math.min(...STATES.map((s) => s.col));
  const maxCol = Math.max(...STATES.map((s) => s.col));
  const minRow = Math.min(...STATES.map((s) => s.row));
  const maxRow = Math.max(...STATES.map((s) => s.row));
  const cols = maxCol - minCol + 1;
  const rows = maxRow - minRow + 1;
  const cellSize = 44;
  const gap = 3;
  const width = cols * (cellSize + gap);
  const height = rows * (cellSize + gap);

  const dPct = (tally.d / TOTAL_EV) * 100;
  const rPct = (tally.r / TOTAL_EV) * 100;
  const winThresholdPct = (WIN_THRESHOLD / TOTAL_EV) * 100;

  const dWins = tally.d >= WIN_THRESHOLD;
  const rWins = tally.r >= WIN_THRESHOLD;

  return (
    <div
      className={`p-4 rounded-lg border ${
        dark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
      }`}
    >
      {/* Tally */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1 text-sm font-semibold">
          <span className="text-blue-600 dark:text-blue-300">
            D {tally.d}
            {dWins && ' 🏆'}
          </span>
          <span className="opacity-70 text-xs">
            270 to win · {tally.remaining} unassigned
          </span>
          <span className="text-red-600 dark:text-red-300">
            {rWins && '🏆 '}R {tally.r}
          </span>
        </div>
        <div
          className="relative h-3 rounded overflow-hidden"
          style={{ background: dark ? '#334155' : '#cbd5e1' }}
        >
          <div
            className="absolute left-0 top-0 h-full bg-blue-500 transition-all"
            style={{ width: `${dPct}%` }}
          />
          <div
            className="absolute right-0 top-0 h-full bg-red-500 transition-all"
            style={{ width: `${rPct}%` }}
          />
          {/* 270 threshold marker */}
          <div
            className="absolute top-0 h-full border-l-2 border-dashed border-slate-700 dark:border-slate-200"
            style={{ left: `${winThresholdPct}%` }}
          />
        </div>
      </div>

      {/* Map */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          style={{ maxHeight: 360 }}
          role="group"
          aria-label="US electoral college map"
        >
          {STATES.map((s) => {
            const x = (s.col - minCol) * (cellSize + gap);
            const y = (s.row - minRow) * (cellSize + gap);
            const party = assignments[s.id];
            const palette = party ? COLORS[party] : COLORS.unassigned;
            const fill = dark ? palette.dark : palette.bg;
            const text = dark ? palette.textDark : palette.text;
            return (
              <g
                key={s.id}
                transform={`translate(${x}, ${y})`}
                onClick={() => cycle(s.id)}
                style={{ cursor: 'pointer' }}
              >
                <title>
                  {s.name} — {s.ev} EV
                  {party ? ` (${party})` : ''}
                </title>
                <rect
                  width={cellSize}
                  height={cellSize}
                  rx={5}
                  fill={fill}
                  stroke={dark ? '#1e293b' : '#94a3b8'}
                  strokeWidth="1"
                />
                <text
                  x={cellSize / 2}
                  y={cellSize / 2 - 2}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={text}
                >
                  {s.id}
                </text>
                <text
                  x={cellSize / 2}
                  y={cellSize - 6}
                  textAnchor="middle"
                  fontSize="10"
                  fill={text}
                  opacity="0.85"
                >
                  {s.ev}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Controls */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          onClick={() => fillSafeStates('D')}
          className="px-2.5 py-1 rounded bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/40 dark:hover:bg-blue-900/60 text-blue-800 dark:text-blue-200 font-medium"
        >
          Fill safe D
        </button>
        <button
          type="button"
          onClick={() => fillSafeStates('R')}
          className="px-2.5 py-1 rounded bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60 text-red-800 dark:text-red-200 font-medium"
        >
          Fill safe R
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-medium"
        >
          Reset
        </button>
        <p
          className={`text-xs ml-auto ${
            dark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          Click a state to cycle: blue → red → unassigned.
        </p>
      </div>
    </div>
  );
}
