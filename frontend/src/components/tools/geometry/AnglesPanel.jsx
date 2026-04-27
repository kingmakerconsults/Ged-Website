import React, { useState } from 'react';
import KaTeXSpan from './KaTeXSpan';

// Interactive angles panel for the geometry tool. Three sub-modes:
//   1. Parallel lines + transversal — adjust angle, see all 8 angles
//   2. Triangle angle sum — adjust two angles, third auto-fills
//   3. Complementary / supplementary / vertical angle quiz card

const MODES = [
  { id: 'parallel', label: 'Parallel lines & transversal' },
  { id: 'triangle', label: 'Triangle angle sum' },
  { id: 'pairs', label: 'Angle pair reference' },
];

export default function AnglesPanel({ dark = false }) {
  const [mode, setMode] = useState('parallel');

  const stroke = dark ? '#e2e8f0' : '#1e293b';
  const accent = dark ? '#60a5fa' : '#2563eb';
  const accent2 = dark ? '#fbbf24' : '#d97706';
  const labelFill = dark ? '#f8fafc' : '#0f172a';
  const muted = dark ? '#94a3b8' : '#64748b';

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="tablist">
        {MODES.map((m) => {
          const active = m.id === mode;
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setMode(m.id)}
              className={`px-3 py-1.5 rounded-md text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                active
                  ? 'bg-blue-600 text-white'
                  : dark
                    ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {mode === 'parallel' && (
        <ParallelLinesDemo
          stroke={stroke}
          accent={accent}
          accent2={accent2}
          labelFill={labelFill}
          muted={muted}
          dark={dark}
        />
      )}
      {mode === 'triangle' && (
        <TriangleSumDemo
          stroke={stroke}
          accent={accent}
          labelFill={labelFill}
          muted={muted}
          dark={dark}
        />
      )}
      {mode === 'pairs' && <AnglePairsReference dark={dark} />}
    </div>
  );
}

function ParallelLinesDemo({ stroke, accent, accent2, labelFill, muted, dark }) {
  const [angle, setAngle] = useState(60); // angle the transversal makes with the lines (acute angle)
  const supp = 180 - angle;

  // Geometry: two horizontal lines at y=80 and y=200; transversal passes
  // through (200, 80) at angle θ from horizontal, going down-right.
  const cx1 = 220;
  const cy1 = 80;
  const cx2 = cx1 + (200 - 80) / Math.tan((angle * Math.PI) / 180);
  const cy2 = 200;

  // Extended endpoints for the transversal so it crosses both lines
  const slope = (cy2 - cy1) / (cx2 - cx1);
  const tx1 = cx1 - 80;
  const ty1 = cy1 - slope * 80;
  const tx2 = cx2 + 80;
  const ty2 = cy2 + slope * 80;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div
        className={`rounded-lg p-3 ${
          dark ? 'bg-slate-800 border border-slate-700' : 'bg-slate-50 border border-slate-200'
        }`}
      >
        <svg viewBox="0 0 500 280" className="w-full max-h-[300px]">
          {/* Parallel lines */}
          <line x1="20" y1="80" x2="480" y2="80" stroke={stroke} strokeWidth="2" />
          <line x1="20" y1="200" x2="480" y2="200" stroke={stroke} strokeWidth="2" />
          {/* Arrow markers (parallel indicator) */}
          <text x="470" y="74" fontSize="14" fill={muted}>›</text>
          <text x="470" y="194" fontSize="14" fill={muted}>›</text>
          {/* Transversal */}
          <line
            x1={tx1}
            y1={ty1}
            x2={tx2}
            y2={ty2}
            stroke={accent}
            strokeWidth="2.5"
          />
          {/* Highlighted angle at intersection 1 (top) — between transversal and line, on the right side */}
          <path
            d={describeArc(cx1, cy1, 22, 0, -angle)}
            fill="none"
            stroke={accent2}
            strokeWidth="2"
          />
          <text
            x={cx1 + 30}
            y={cy1 - 8}
            fontSize="14"
            fontWeight="bold"
            fill={accent2}
          >
            {angle}°
          </text>
          {/* Corresponding angle at intersection 2 (bottom) — same orientation */}
          <path
            d={describeArc(cx2, cy2, 22, 0, -angle)}
            fill="none"
            stroke={accent2}
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <text
            x={cx2 + 30}
            y={cy2 - 8}
            fontSize="14"
            fontWeight="bold"
            fill={accent2}
          >
            {angle}°
          </text>
          {/* Co-interior angle (top, on the left of transversal, below line 1) — supplementary */}
          <path
            d={describeArc(cx1, cy1, 32, 180, 180 - angle)}
            fill="none"
            stroke={accent}
            strokeWidth="2"
          />
          <text
            x={cx1 - 60}
            y={cy1 + 24}
            fontSize="13"
            fill={accent}
          >
            {supp}°
          </text>
          {/* Intersection dots */}
          <circle cx={cx1} cy={cy1} r="3" fill={labelFill} />
          <circle cx={cx2} cy={cy2} r="3" fill={labelFill} />
        </svg>

        <div className="mt-3">
          <label className="block text-sm">
            <span className="font-semibold">Acute angle: {angle}°</span>
            <input
              type="range"
              min="20"
              max="80"
              step="1"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full mt-1"
            />
          </label>
        </div>
      </div>

      <div className={`text-sm space-y-2 ${dark ? 'text-slate-200' : 'text-slate-800'}`}>
        <h4 className="font-semibold text-base">Angle relationships</h4>
        <ul className="space-y-1.5 list-disc pl-5">
          <li>
            <strong>Corresponding angles</strong> (same position at each intersection) are equal:
            both are <span style={{ color: accent2 }}>{angle}°</span>.
          </li>
          <li>
            <strong>Alternate interior angles</strong> (between the parallel lines, opposite sides
            of the transversal) are equal: both are{' '}
            <span style={{ color: accent2 }}>{angle}°</span>.
          </li>
          <li>
            <strong>Alternate exterior angles</strong> (outside the parallel lines, opposite sides
            of the transversal) are equal.
          </li>
          <li>
            <strong>Co-interior (same-side interior)</strong> angles are <em>supplementary</em>:{' '}
            <KaTeXSpan tex={`${angle}^\\circ + ${supp}^\\circ = 180^\\circ`} />.
          </li>
          <li>
            <strong>Vertical angles</strong> (across the intersection) are equal.
          </li>
        </ul>
        <div
          className={`mt-3 p-3 rounded ${
            dark ? 'bg-slate-800 border border-slate-700' : 'bg-blue-50 border border-blue-200'
          }`}
        >
          <p className="text-xs leading-snug">
            <strong>GED tip:</strong> If you spot two parallel lines crossed by a transversal, the
            8 angles formed only have 2 distinct measures: the acute angle and its supplement.
          </p>
        </div>
      </div>
    </div>
  );
}

function TriangleSumDemo({ stroke, accent, labelFill, muted, dark }) {
  const [angA, setAngA] = useState(60);
  const [angB, setAngB] = useState(60);
  const angC = Math.max(0, 180 - angA - angB);
  const valid = angC > 0;

  // Lay out the triangle: place vertex A at (80, 220), draw side a→b along
  // baseline, then compute B & C from the angles.
  const ax = 80;
  const ay = 220;
  const baseLen = 280;
  const bx = ax + baseLen;
  const by = ay;
  // Vertex C is up and to the right; we use the law of sines.
  // Side opposite A has length proportional to sin(A); etc.
  const aRad = (angA * Math.PI) / 180;
  const bRad = (angB * Math.PI) / 180;
  const sideAC = (baseLen * Math.sin(bRad)) / Math.sin(((angC || 1) * Math.PI) / 180);
  const cx = ax + sideAC * Math.cos(aRad);
  const cy = ay - sideAC * Math.sin(aRad);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div
        className={`rounded-lg p-3 ${
          dark ? 'bg-slate-800 border border-slate-700' : 'bg-slate-50 border border-slate-200'
        }`}
      >
        <svg viewBox="0 0 440 260" className="w-full max-h-[280px]">
          {valid && (
            <polygon
              points={`${ax},${ay} ${bx},${by} ${cx},${cy}`}
              fill={dark ? 'rgba(96,165,250,0.18)' : 'rgba(59,130,246,0.15)'}
              stroke={stroke}
              strokeWidth="2"
            />
          )}
          {valid && (
            <>
              <text x={ax - 20} y={ay + 8} fontSize="13" fontWeight="bold" fill={accent}>
                A: {angA}°
              </text>
              <text x={bx + 6} y={by + 8} fontSize="13" fontWeight="bold" fill={accent}>
                B: {angB}°
              </text>
              <text x={cx - 14} y={cy - 8} fontSize="13" fontWeight="bold" fill={accent}>
                C: {Math.round(angC)}°
              </text>
            </>
          )}
          {!valid && (
            <text x="220" y="130" textAnchor="middle" fontSize="14" fill={muted}>
              Angles must sum to less than 180°.
            </text>
          )}
        </svg>

        <div className="mt-3 space-y-2">
          <label className="block text-sm">
            <span className="font-semibold">Angle A: {angA}°</span>
            <input
              type="range"
              min="10"
              max="160"
              value={angA}
              onChange={(e) => setAngA(Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="block text-sm">
            <span className="font-semibold">Angle B: {angB}°</span>
            <input
              type="range"
              min="10"
              max="160"
              value={angB}
              onChange={(e) => setAngB(Number(e.target.value))}
              className="w-full"
            />
          </label>
        </div>
      </div>

      <div className={`text-sm space-y-2 ${dark ? 'text-slate-200' : 'text-slate-800'}`}>
        <h4 className="font-semibold text-base">Triangle angle sum</h4>
        <p>
          The interior angles of every triangle add up to 180°:
        </p>
        <div className="text-center my-2">
          <KaTeXSpan tex="\angle A + \angle B + \angle C = 180^\circ" display />
        </div>
        <div className="text-center my-2">
          <KaTeXSpan tex={`${angA}^\\circ + ${angB}^\\circ + ${Math.round(angC)}^\\circ = ${angA + angB + Math.round(angC)}^\\circ`} display />
        </div>
        <ul className="space-y-1.5 list-disc pl-5">
          <li>If two angles are known, subtract their sum from 180° to find the third.</li>
          <li>An equilateral triangle has all three angles = 60°.</li>
          <li>A right triangle has one 90° angle, so the other two sum to 90°.</li>
        </ul>
      </div>
    </div>
  );
}

function AnglePairsReference({ dark }) {
  const cardCls = `p-4 rounded-lg ${
    dark ? 'bg-slate-800 border border-slate-700' : 'bg-slate-50 border border-slate-200'
  }`;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
      <div className={cardCls}>
        <h5 className="font-semibold mb-1">Complementary angles</h5>
        <p>Two angles whose measures add to 90°.</p>
        <div className="mt-1"><KaTeXSpan tex="\angle 1 + \angle 2 = 90^\circ" display /></div>
        <p className="text-xs opacity-70 mt-1">Example: 35° and 55° are complementary.</p>
      </div>
      <div className={cardCls}>
        <h5 className="font-semibold mb-1">Supplementary angles</h5>
        <p>Two angles whose measures add to 180°.</p>
        <div className="mt-1"><KaTeXSpan tex="\angle 1 + \angle 2 = 180^\circ" display /></div>
        <p className="text-xs opacity-70 mt-1">Example: 110° and 70° are supplementary.</p>
      </div>
      <div className={cardCls}>
        <h5 className="font-semibold mb-1">Vertical angles</h5>
        <p>When two straight lines cross, the angles directly opposite each other are equal.</p>
        <div className="mt-1"><KaTeXSpan tex="\angle A \cong \angle C" display /></div>
      </div>
      <div className={cardCls}>
        <h5 className="font-semibold mb-1">Linear pair</h5>
        <p>Two adjacent angles on a straight line. They are always supplementary.</p>
        <div className="mt-1"><KaTeXSpan tex="\angle A + \angle B = 180^\circ" display /></div>
      </div>
    </div>
  );
}

// ── SVG arc helper ──
function polarToCartesian(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx, cy, r, startDeg, endDeg) {
  const start = polarToCartesian(cx, cy, r, endDeg);
  const end = polarToCartesian(cx, cy, r, startDeg);
  const largeArc = Math.abs(endDeg - startDeg) <= 180 ? '0' : '1';
  const sweep = endDeg < startDeg ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${end.x} ${end.y}`;
}
