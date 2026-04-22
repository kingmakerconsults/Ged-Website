import React, { useState, useMemo } from 'react';

// ── Spec renderer (legacy, gated) ─────────────────────────────────────
const GEOMETRY_FIGURES_ENABLED = (() => {
  try {
    return (
      typeof window !== 'undefined' &&
      window.__APP_CONFIG__ &&
      window.__APP_CONFIG__.geometryFiguresEnabled === true
    );
  } catch {
    return false;
  }
})();

const DEFAULT_FIGURE_STYLE = {
  stroke: '#1e293b',
  strokeWidth: 2,
  fill: 'none',
};

const geometryRenderers = {
  circle: (params, style) => {
    const cx = params.cx ?? 50;
    const cy = params.cy ?? 50;
    const r = params.r ?? 30;
    return {
      elements: <circle cx={cx} cy={cy} r={r} {...style} />,
      pointsForBounds: [
        { x: cx - r, y: cy - r },
        { x: cx + r, y: cy + r },
      ],
    };
  },
  rectangle: (params, style) => {
    const x = params.x ?? 20;
    const y = params.y ?? 20;
    const width = params.width ?? 60;
    const height = params.height ?? 40;
    return {
      elements: <rect x={x} y={y} width={width} height={height} {...style} />,
      pointsForBounds: [
        { x, y },
        { x: x + width, y: y + height },
      ],
    };
  },
  line: (params, style) => {
    const x1 = params.x1 ?? 10;
    const y1 = params.y1 ?? 10;
    const x2 = params.x2 ?? 90;
    const y2 = params.y2 ?? 90;
    return {
      elements: <line x1={x1} y1={y1} x2={x2} y2={y2} {...style} />,
      pointsForBounds: [
        { x: x1, y: y1 },
        { x: x2, y: y2 },
      ],
    };
  },
  triangle: (params, style) => {
    const points = params.points || '50,10 90,90 10,90';
    const coords = points.split(' ').map((p) => {
      const [x, y] = p.split(',').map(Number);
      return { x, y };
    });
    return {
      elements: <polygon points={points} {...style} />,
      pointsForBounds: coords,
    };
  },
};

/** Spec-driven renderer used by quiz content. Returns null when disabled. */
export function GeometryFigure({ spec, className }) {
  if (!GEOMETRY_FIGURES_ENABLED || !spec || typeof spec !== 'object') {
    return null;
  }

  const style = { ...DEFAULT_FIGURE_STYLE, ...(spec.style || {}) };
  const renderer = geometryRenderers[spec.shape];
  if (!renderer) return null;

  const renderResult = renderer(spec.params || {}, style);
  if (!renderResult) return null;

  const points =
    renderResult.pointsForBounds && renderResult.pointsForBounds.length > 0
      ? renderResult.pointsForBounds
      : [
          { x: 0, y: 0 },
          { x: 100, y: 100 },
        ];

  let minX = Math.min(...points.map((p) => p.x));
  let maxX = Math.max(...points.map((p) => p.x));
  let minY = Math.min(...points.map((p) => p.y));
  let maxY = Math.max(...points.map((p) => p.y));

  if (spec.view) {
    const { xMin, xMax, yMin, yMax } = spec.view;
    if (typeof xMin === 'number') minX = Math.min(minX, xMin);
    if (typeof xMax === 'number') maxX = Math.max(maxX, xMax);
    if (typeof yMin === 'number') minY = Math.min(minY, yMin);
    if (typeof yMax === 'number') maxY = Math.max(maxY, yMax);
  }

  const padding =
    spec.view && typeof spec.view.padding === 'number' ? spec.view.padding : 8;
  const width = Math.max(maxX - minX, 20);
  const height = Math.max(maxY - minY, 20);

  const viewBox = `${minX - padding} ${minY - padding} ${width + padding * 2} ${
    height + padding * 2
  }`;

  return (
    <svg
      className={className}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Geometry figure"
      preserveAspectRatio="xMidYMid meet"
    >
      {renderResult.elements}
    </svg>
  );
}

// ── Playground (default export) ───────────────────────────────────────

const SHAPES = [
  { id: 'rectangle', label: 'Rectangle', icon: '▭' },
  { id: 'triangle', label: 'Right Triangle', icon: '◣' },
  { id: 'circle', label: 'Circle', icon: '◯' },
  { id: 'parallelogram', label: 'Parallelogram', icon: '▰' },
  { id: 'trapezoid', label: 'Trapezoid', icon: '⬡' },
];

const round = (n, p = 2) => {
  if (!Number.isFinite(n)) return n;
  const f = 10 ** p;
  return Math.round(n * f) / f;
};

function NumberControl({ label, value, onChange, min = 1, max = 200, step = 1, unit }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold mb-1 opacity-80">
        {label}
        {unit ? <span className="opacity-60"> ({unit})</span> : null}
      </span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (Number.isFinite(n)) onChange(n);
        }}
        className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm"
      />
    </label>
  );
}

function Stat({ label, value, accent = '#0f172a' }) {
  return (
    <div className="px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
      <div className="text-[11px] uppercase tracking-wide opacity-70">
        {label}
      </div>
      <div className="text-base font-semibold" style={{ color: accent }}>
        {value}
      </div>
    </div>
  );
}

/**
 * GeometryPlayground — interactive shape explorer.
 * Pick a shape, tweak parameters, and view computed perimeter / area.
 */
export default function GeometryPlayground({ dark = false }) {
  const [shape, setShape] = useState('rectangle');
  const [w, setW] = useState(80);
  const [h, setH] = useState(50);
  const [base, setBase] = useState(80);
  const [base2, setBase2] = useState(50);
  const [legA, setLegA] = useState(60);
  const [legB, setLegB] = useState(80);
  const [r, setR] = useState(40);
  const [showLabels, setShowLabels] = useState(true);

  const stroke = dark ? '#e2e8f0' : '#1e293b';
  const fill = dark ? 'rgba(96,165,250,0.18)' : 'rgba(59,130,246,0.15)';
  const labelFill = dark ? '#e2e8f0' : '#0f172a';

  const computed = useMemo(() => {
    switch (shape) {
      case 'rectangle':
        return {
          perimeter: 2 * (w + h),
          area: w * h,
          unit: '',
        };
      case 'parallelogram':
        return {
          perimeter: 2 * (base + h),
          area: base * h,
          unit: '',
        };
      case 'triangle': {
        const hyp = Math.sqrt(legA * legA + legB * legB);
        return {
          perimeter: legA + legB + hyp,
          area: (legA * legB) / 2,
          unit: '',
          hypotenuse: hyp,
        };
      }
      case 'trapezoid': {
        // assume isoceles for the slant
        const slant = Math.sqrt(((base - base2) / 2) ** 2 + h * h);
        return {
          perimeter: base + base2 + 2 * slant,
          area: ((base + base2) / 2) * h,
          unit: '',
        };
      }
      case 'circle':
        return {
          perimeter: 2 * Math.PI * r,
          area: Math.PI * r * r,
          unit: '',
        };
      default:
        return { perimeter: 0, area: 0, unit: '' };
    }
  }, [shape, w, h, base, base2, legA, legB, r]);

  const renderShape = () => {
    const pad = 30;
    if (shape === 'rectangle') {
      const vb = `0 0 ${w + pad * 2} ${h + pad * 2}`;
      return (
        <svg viewBox={vb} className="w-full max-h-[260px]">
          <rect
            x={pad}
            y={pad}
            width={w}
            height={h}
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
          {showLabels && (
            <>
              <text x={pad + w / 2} y={pad + h + 18} textAnchor="middle" fontSize="13" fill={labelFill}>
                w = {w}
              </text>
              <text x={pad + w + 8} y={pad + h / 2} fontSize="13" fill={labelFill}>
                h = {h}
              </text>
            </>
          )}
        </svg>
      );
    }
    if (shape === 'parallelogram') {
      const skew = h * 0.4;
      const vb = `0 0 ${base + skew + pad * 2} ${h + pad * 2}`;
      const pts = [
        [pad + skew, pad],
        [pad + skew + base, pad],
        [pad + base, pad + h],
        [pad, pad + h],
      ]
        .map((p) => p.join(','))
        .join(' ');
      return (
        <svg viewBox={vb} className="w-full max-h-[260px]">
          <polygon points={pts} fill={fill} stroke={stroke} strokeWidth="2" />
          {showLabels && (
            <>
              <text x={pad + base / 2} y={pad + h + 18} textAnchor="middle" fontSize="13" fill={labelFill}>
                b = {base}
              </text>
              <text x={pad - 24} y={pad + h / 2} fontSize="13" fill={labelFill}>
                h = {h}
              </text>
            </>
          )}
        </svg>
      );
    }
    if (shape === 'triangle') {
      const vb = `0 0 ${legB + pad * 2} ${legA + pad * 2}`;
      const pts = [
        [pad, pad],
        [pad, pad + legA],
        [pad + legB, pad + legA],
      ]
        .map((p) => p.join(','))
        .join(' ');
      return (
        <svg viewBox={vb} className="w-full max-h-[260px]">
          <polygon points={pts} fill={fill} stroke={stroke} strokeWidth="2" />
          {/* Right angle indicator */}
          <rect
            x={pad}
            y={pad + legA - 10}
            width="10"
            height="10"
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
          />
          {showLabels && (
            <>
              <text x={pad - 22} y={pad + legA / 2} fontSize="13" fill={labelFill}>
                a = {legA}
              </text>
              <text x={pad + legB / 2} y={pad + legA + 18} textAnchor="middle" fontSize="13" fill={labelFill}>
                b = {legB}
              </text>
              <text
                x={pad + legB / 2 + 6}
                y={pad + legA / 2 - 6}
                fontSize="13"
                fill={labelFill}
              >
                c = {round(computed.hypotenuse)}
              </text>
            </>
          )}
        </svg>
      );
    }
    if (shape === 'trapezoid') {
      const offset = Math.max((base - base2) / 2, 0);
      const vb = `0 0 ${base + pad * 2} ${h + pad * 2}`;
      const pts = [
        [pad + offset, pad],
        [pad + offset + base2, pad],
        [pad + base, pad + h],
        [pad, pad + h],
      ]
        .map((p) => p.join(','))
        .join(' ');
      return (
        <svg viewBox={vb} className="w-full max-h-[260px]">
          <polygon points={pts} fill={fill} stroke={stroke} strokeWidth="2" />
          {showLabels && (
            <>
              <text x={pad + offset + base2 / 2} y={pad - 8} textAnchor="middle" fontSize="13" fill={labelFill}>
                b₂ = {base2}
              </text>
              <text x={pad + base / 2} y={pad + h + 18} textAnchor="middle" fontSize="13" fill={labelFill}>
                b₁ = {base}
              </text>
              <text x={pad + base + 8} y={pad + h / 2} fontSize="13" fill={labelFill}>
                h = {h}
              </text>
            </>
          )}
        </svg>
      );
    }
    if (shape === 'circle') {
      const vb = `0 0 ${r * 2 + pad * 2} ${r * 2 + pad * 2}`;
      return (
        <svg viewBox={vb} className="w-full max-h-[260px]">
          <circle
            cx={pad + r}
            cy={pad + r}
            r={r}
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
          <line
            x1={pad + r}
            y1={pad + r}
            x2={pad + r * 2}
            y2={pad + r}
            stroke={stroke}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {showLabels && (
            <text
              x={pad + r + r / 2}
              y={pad + r - 6}
              textAnchor="middle"
              fontSize="13"
              fill={labelFill}
            >
              r = {r}
            </text>
          )}
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="geometry-playground space-y-4">
      {/* Shape picker */}
      <div className="flex flex-wrap gap-2">
        {SHAPES.map((s) => {
          const active = s.id === shape;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setShape(s.id)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition focus:outline-none focus:ring-2 ${
                active
                  ? 'bg-blue-600 text-white'
                  : dark
                    ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              aria-pressed={active}
            >
              <span className="mr-1.5" aria-hidden>
                {s.icon}
              </span>
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Drawing */}
        <div
          className={`rounded-lg p-4 flex items-center justify-center ${
            dark ? 'bg-slate-800 border border-slate-700' : 'bg-slate-50 border border-slate-200'
          }`}
        >
          {renderShape()}
        </div>

        {/* Controls + stats */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {shape === 'rectangle' && (
              <>
                <NumberControl label="Width" value={w} onChange={setW} />
                <NumberControl label="Height" value={h} onChange={setH} />
              </>
            )}
            {shape === 'parallelogram' && (
              <>
                <NumberControl label="Base" value={base} onChange={setBase} />
                <NumberControl label="Height" value={h} onChange={setH} />
              </>
            )}
            {shape === 'triangle' && (
              <>
                <NumberControl label="Leg a" value={legA} onChange={setLegA} />
                <NumberControl label="Leg b" value={legB} onChange={setLegB} />
              </>
            )}
            {shape === 'trapezoid' && (
              <>
                <NumberControl label="Base 1" value={base} onChange={setBase} />
                <NumberControl label="Base 2" value={base2} onChange={setBase2} />
                <NumberControl label="Height" value={h} onChange={setH} />
              </>
            )}
            {shape === 'circle' && (
              <NumberControl label="Radius" value={r} onChange={setR} />
            )}
          </div>

          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
            />
            Show labels
          </label>

          <div className="grid grid-cols-2 gap-2">
            <Stat
              label={shape === 'circle' ? 'Circumference' : 'Perimeter'}
              value={round(computed.perimeter)}
              accent={dark ? '#60a5fa' : '#2563eb'}
            />
            <Stat
              label="Area"
              value={round(computed.area)}
              accent={dark ? '#34d399' : '#059669'}
            />
            {shape === 'triangle' && (
              <Stat
                label="Hypotenuse"
                value={round(computed.hypotenuse)}
                accent={dark ? '#fbbf24' : '#d97706'}
              />
            )}
          </div>

          <p
            className={`text-xs leading-snug ${
              dark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Tip: change the parameters to see how the perimeter and area
            respond. For circles, area scales with the square of the radius.
          </p>
        </div>
      </div>
    </div>
  );
}
