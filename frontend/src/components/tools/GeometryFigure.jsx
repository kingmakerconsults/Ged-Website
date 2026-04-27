import React, { useState, useMemo } from 'react';
import AnglesPanel from './geometry/AnglesPanel';
import GeometryPracticePanel from './geometry/GeometryPracticePanel';
import KaTeXSpan from './geometry/KaTeXSpan';

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
  { id: 'square', label: 'Square', icon: '◻' },
  { id: 'parallelogram', label: 'Parallelogram', icon: '▰' },
  { id: 'triangle', label: 'Right Triangle', icon: '◣' },
  { id: 'equilateral', label: 'Equilateral Triangle', icon: '△' },
  { id: 'trapezoid', label: 'Trapezoid', icon: '⬡' },
  { id: 'circle', label: 'Circle', icon: '◯' },
  { id: 'semicircle', label: 'Semicircle', icon: '◐' },
  { id: 'hexagon', label: 'Reg. Hexagon', icon: '⬡' },
  { id: 'rect-prism', label: 'Rect. Prism', icon: '▥' },
  { id: 'cylinder', label: 'Cylinder', icon: '⌭' },
  { id: 'sphere', label: 'Sphere', icon: '●' },
];

// Per-shape formulas + variable legend (rendered in KaTeX in the FormulaCard)
const SHAPE_FORMULAS = {
  rectangle: {
    title: 'Rectangle',
    formulas: [
      { label: 'Perimeter', tex: 'P = 2(w + h)' },
      { label: 'Area', tex: 'A = w \\times h' },
    ],
    legend: 'w = width, h = height',
  },
  square: {
    title: 'Square',
    formulas: [
      { label: 'Perimeter', tex: 'P = 4s' },
      { label: 'Area', tex: 'A = s^2' },
    ],
    legend: 's = side length',
  },
  parallelogram: {
    title: 'Parallelogram',
    formulas: [
      { label: 'Perimeter', tex: 'P = 2(b + s)' },
      { label: 'Area', tex: 'A = b \\times h' },
    ],
    legend: 'b = base, h = height (perpendicular), s = slant side',
  },
  triangle: {
    title: 'Right Triangle',
    formulas: [
      { label: 'Hypotenuse', tex: 'c = \\sqrt{a^2 + b^2}' },
      { label: 'Area', tex: 'A = \\tfrac{1}{2} a b' },
      { label: 'Perimeter', tex: 'P = a + b + c' },
    ],
    legend: 'a, b = legs (the two sides at the right angle), c = hypotenuse',
  },
  equilateral: {
    title: 'Equilateral Triangle',
    formulas: [
      { label: 'Perimeter', tex: 'P = 3s' },
      { label: 'Area', tex: 'A = \\dfrac{\\sqrt{3}}{4} s^2' },
      { label: 'Each angle', tex: '60^\\circ' },
    ],
    legend: 's = side length (all three sides equal)',
  },
  trapezoid: {
    title: 'Trapezoid',
    formulas: [
      { label: 'Area', tex: 'A = \\tfrac{1}{2}(b_1 + b_2) h' },
    ],
    legend: 'b₁, b₂ = the two parallel bases, h = height between them',
  },
  circle: {
    title: 'Circle',
    formulas: [
      { label: 'Circumference', tex: 'C = 2\\pi r' },
      { label: 'Area', tex: 'A = \\pi r^2' },
      { label: 'Diameter', tex: 'd = 2r' },
    ],
    legend: 'r = radius, d = diameter',
  },
  semicircle: {
    title: 'Semicircle (half-circle)',
    formulas: [
      { label: 'Curved length', tex: '\\pi r' },
      { label: 'Perimeter', tex: 'P = \\pi r + 2r' },
      { label: 'Area', tex: 'A = \\tfrac{1}{2}\\pi r^2' },
    ],
    legend: 'r = radius',
  },
  hexagon: {
    title: 'Regular Hexagon',
    formulas: [
      { label: 'Perimeter', tex: 'P = 6s' },
      { label: 'Area', tex: 'A = \\tfrac{3\\sqrt{3}}{2} s^2' },
      { label: 'Each interior angle', tex: '120^\\circ' },
    ],
    legend: 's = side length',
  },
  'rect-prism': {
    title: 'Rectangular Prism (box)',
    formulas: [
      { label: 'Volume', tex: 'V = l \\times w \\times h' },
      { label: 'Surface area', tex: 'SA = 2(lw + lh + wh)' },
    ],
    legend: 'l = length, w = width, h = height',
  },
  cylinder: {
    title: 'Cylinder',
    formulas: [
      { label: 'Volume', tex: 'V = \\pi r^2 h' },
      { label: 'Surface area', tex: 'SA = 2\\pi r^2 + 2\\pi r h' },
    ],
    legend: 'r = radius of the circular base, h = height',
  },
  sphere: {
    title: 'Sphere',
    formulas: [
      { label: 'Volume', tex: 'V = \\tfrac{4}{3} \\pi r^3' },
      { label: 'Surface area', tex: 'SA = 4\\pi r^2' },
    ],
    legend: 'r = radius',
  },
};

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
 * GeometryPlayground — interactive shape explorer with Sandbox / Angles /
 * Practice tabs. Pick a shape, tweak parameters, and view computed
 * perimeter / area / volume + the formula card.
 */
export default function GeometryPlayground({ dark = false }) {
  const [tab, setTab] = useState(() => {
    if (typeof window === 'undefined') return 'sandbox';
    return window.sessionStorage?.getItem('geometryTool:tab') || 'sandbox';
  });
  const setTabSafe = (t) => {
    setTab(t);
    if (typeof window !== 'undefined') window.sessionStorage?.setItem('geometryTool:tab', t);
  };

  const tabBtn = (id, label) => {
    const active = tab === id;
    return (
      <button
        key={id}
        type="button"
        role="tab"
        aria-selected={active}
        onClick={() => setTabSafe(id)}
        className={`px-4 py-1.5 rounded-md text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          active
            ? 'bg-blue-600 text-white'
            : dark
              ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="geometry-playground space-y-4">
      <div className="flex flex-wrap gap-2 mb-2" role="tablist">
        {tabBtn('sandbox', '🛠 Shape Sandbox')}
        {tabBtn('angles', '📐 Angles')}
        {tabBtn('practice', '📝 Practice')}
      </div>
      {tab === 'sandbox' && <SandboxTab dark={dark} />}
      {tab === 'angles' && <AnglesPanel dark={dark} />}
      {tab === 'practice' && <GeometryPracticePanel dark={dark} />}
    </div>
  );
}

function FormulaCard({ shape, dark }) {
  const data = SHAPE_FORMULAS[shape];
  if (!data) return null;
  return (
    <div
      className={`rounded-lg p-3 ${
        dark ? 'bg-slate-800 border border-slate-700' : 'bg-blue-50 border border-blue-200'
      }`}
    >
      <h5 className={`font-semibold mb-2 ${dark ? 'text-blue-200' : 'text-blue-900'}`}>
        📘 {data.title} — formulas
      </h5>
      <div className="space-y-1.5">
        {data.formulas.map((f) => (
          <div key={f.label} className="flex items-baseline gap-2 text-sm">
            <span className={`font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
              {f.label}:
            </span>
            <span className={dark ? 'text-slate-100' : 'text-slate-900'}>
              <KaTeXSpan tex={f.tex} />
            </span>
          </div>
        ))}
      </div>
      <p className={`mt-2 text-xs ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
        {data.legend}
      </p>
    </div>
  );
}

function SandboxTab({ dark }) {
  const [shape, setShape] = useState('rectangle');
  const [w, setW] = useState(80);
  const [h, setH] = useState(50);
  const [base, setBase] = useState(80);
  const [base2, setBase2] = useState(50);
  const [legA, setLegA] = useState(60);
  const [legB, setLegB] = useState(80);
  const [r, setR] = useState(40);
  const [s, setS] = useState(60); // generic side
  const [showLabels, setShowLabels] = useState(true);

  const stroke = dark ? '#e2e8f0' : '#1e293b';
  const fill = dark ? 'rgba(96,165,250,0.18)' : 'rgba(59,130,246,0.15)';
  const labelFill = dark ? '#e2e8f0' : '#0f172a';

  const computed = useMemo(() => {
    switch (shape) {
      case 'rectangle':
        return { perimeter: 2 * (w + h), area: w * h };
      case 'square':
        return { perimeter: 4 * s, area: s * s };
      case 'parallelogram':
        return { perimeter: 2 * (base + h), area: base * h };
      case 'triangle': {
        const hyp = Math.sqrt(legA * legA + legB * legB);
        return { perimeter: legA + legB + hyp, area: (legA * legB) / 2, hypotenuse: hyp };
      }
      case 'equilateral':
        return { perimeter: 3 * s, area: (Math.sqrt(3) / 4) * s * s };
      case 'trapezoid': {
        const slant = Math.sqrt(((base - base2) / 2) ** 2 + h * h);
        return { perimeter: base + base2 + 2 * slant, area: ((base + base2) / 2) * h };
      }
      case 'circle':
        return { perimeter: 2 * Math.PI * r, area: Math.PI * r * r };
      case 'semicircle':
        return { perimeter: Math.PI * r + 2 * r, area: 0.5 * Math.PI * r * r };
      case 'hexagon':
        return { perimeter: 6 * s, area: ((3 * Math.sqrt(3)) / 2) * s * s };
      case 'rect-prism':
        return {
          volume: w * h * legA,
          surfaceArea: 2 * (w * h + w * legA + h * legA),
        };
      case 'cylinder':
        return {
          volume: Math.PI * r * r * h,
          surfaceArea: 2 * Math.PI * r * r + 2 * Math.PI * r * h,
        };
      case 'sphere':
        return {
          volume: (4 / 3) * Math.PI * r ** 3,
          surfaceArea: 4 * Math.PI * r * r,
        };
      default:
        return { perimeter: 0, area: 0 };
    }
  }, [shape, w, h, base, base2, legA, legB, r, s]);

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
    if (shape === 'square') {
      const vb = `0 0 ${s + pad * 2} ${s + pad * 2}`;
      return (
        <svg viewBox={vb} className="w-full max-h-[260px]">
          <rect x={pad} y={pad} width={s} height={s} fill={fill} stroke={stroke} strokeWidth="2" />
          {showLabels && (
            <text x={pad + s / 2} y={pad + s + 18} textAnchor="middle" fontSize="13" fill={labelFill}>
              s = {s}
            </text>
          )}
        </svg>
      );
    }
    if (shape === 'equilateral') {
      const tH = (Math.sqrt(3) / 2) * s;
      const vb = `0 0 ${s + pad * 2} ${tH + pad * 2}`;
      const pts = `${pad + s / 2},${pad} ${pad + s},${pad + tH} ${pad},${pad + tH}`;
      return (
        <svg viewBox={vb} className="w-full max-h-[260px]">
          <polygon points={pts} fill={fill} stroke={stroke} strokeWidth="2" />
          {showLabels && (
            <text x={pad + s / 2} y={pad + tH + 18} textAnchor="middle" fontSize="13" fill={labelFill}>
              s = {s}
            </text>
          )}
        </svg>
      );
    }
    if (shape === 'semicircle') {
      const vb = `0 0 ${r * 2 + pad * 2} ${r + pad * 2}`;
      return (
        <svg viewBox={vb} className="w-full max-h-[260px]">
          <path
            d={`M ${pad} ${pad + r} A ${r} ${r} 0 0 1 ${pad + r * 2} ${pad + r} Z`}
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
          {showLabels && (
            <text x={pad + r} y={pad + r + 18} textAnchor="middle" fontSize="13" fill={labelFill}>
              r = {r}
            </text>
          )}
        </svg>
      );
    }
    if (shape === 'hexagon') {
      const cx = pad + s;
      const cy = pad + s;
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i + Math.PI / 6;
        return `${cx + s * Math.cos(a)},${cy + s * Math.sin(a)}`;
      }).join(' ');
      const vb = `0 0 ${s * 2 + pad * 2} ${s * 2 + pad * 2}`;
      return (
        <svg viewBox={vb} className="w-full max-h-[260px]">
          <polygon points={pts} fill={fill} stroke={stroke} strokeWidth="2" />
          {showLabels && (
            <text x={cx} y={cy + s + 18} textAnchor="middle" fontSize="13" fill={labelFill}>
              s = {s}
            </text>
          )}
        </svg>
      );
    }
    if (shape === 'rect-prism') {
      const dx = h * 0.5;
      const dy = -h * 0.35;
      const vb = `0 0 ${w + dx + pad * 2} ${legA - dy + pad * 2}`;
      return (
        <svg viewBox={vb} className="w-full max-h-[280px]">
          <rect x={pad} y={pad - dy} width={w} height={legA} fill={fill} stroke={stroke} strokeWidth="2" />
          <polygon
            points={`${pad},${pad - dy} ${pad + dx},${pad} ${pad + dx + w},${pad} ${pad + w},${pad - dy}`}
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
          <polygon
            points={`${pad + w},${pad - dy} ${pad + dx + w},${pad} ${pad + dx + w},${pad + legA - dy} ${pad + w},${pad + legA}`}
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
          {showLabels && (
            <>
              <text x={pad + w / 2} y={pad + legA - dy + 18} textAnchor="middle" fontSize="13" fill={labelFill}>
                l = {w}
              </text>
              <text x={pad + w + dx + 6} y={pad + legA / 2 - dy} fontSize="13" fill={labelFill}>
                h = {legA}
              </text>
              <text x={pad + w + dx / 2 + 6} y={pad - dy - 4} fontSize="13" fill={labelFill}>
                w = {h}
              </text>
            </>
          )}
        </svg>
      );
    }
    if (shape === 'cylinder') {
      const ery = r * 0.35;
      const vb = `0 0 ${r * 2 + pad * 2} ${h + ery * 2 + pad * 2}`;
      return (
        <svg viewBox={vb} className="w-full max-h-[280px]">
          <ellipse cx={pad + r} cy={pad + ery} rx={r} ry={ery} fill={fill} stroke={stroke} strokeWidth="2" />
          <line x1={pad} y1={pad + ery} x2={pad} y2={pad + h + ery} stroke={stroke} strokeWidth="2" />
          <line x1={pad + r * 2} y1={pad + ery} x2={pad + r * 2} y2={pad + h + ery} stroke={stroke} strokeWidth="2" />
          <ellipse cx={pad + r} cy={pad + h + ery} rx={r} ry={ery} fill={fill} stroke={stroke} strokeWidth="2" />
          {showLabels && (
            <>
              <text x={pad + r} y={pad + ery + 4} textAnchor="middle" fontSize="12" fill={labelFill}>r = {r}</text>
              <text x={pad + r * 2 + 6} y={pad + h / 2 + ery} fontSize="13" fill={labelFill}>h = {h}</text>
            </>
          )}
        </svg>
      );
    }
    if (shape === 'sphere') {
      const vb = `0 0 ${r * 2 + pad * 2} ${r * 2 + pad * 2}`;
      return (
        <svg viewBox={vb} className="w-full max-h-[260px]">
          <circle cx={pad + r} cy={pad + r} r={r} fill={fill} stroke={stroke} strokeWidth="2" />
          <ellipse cx={pad + r} cy={pad + r} rx={r} ry={r * 0.3} fill="none" stroke={stroke} strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1={pad + r} y1={pad + r} x2={pad + r * 2} y2={pad + r} stroke={stroke} strokeWidth="1.5" strokeDasharray="4 3" />
          {showLabels && (
            <text x={pad + r + r / 2} y={pad + r - 6} textAnchor="middle" fontSize="13" fill={labelFill}>r = {r}</text>
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
            {shape === 'square' && (
              <NumberControl label="Side s" value={s} onChange={setS} />
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
            {shape === 'equilateral' && (
              <NumberControl label="Side s" value={s} onChange={setS} />
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
            {shape === 'semicircle' && (
              <NumberControl label="Radius" value={r} onChange={setR} />
            )}
            {shape === 'hexagon' && (
              <NumberControl label="Side s" value={s} onChange={setS} />
            )}
            {shape === 'rect-prism' && (
              <>
                <NumberControl label="Length l" value={w} onChange={setW} />
                <NumberControl label="Width w" value={h} onChange={setH} />
                <NumberControl label="Height h" value={legA} onChange={setLegA} />
              </>
            )}
            {shape === 'cylinder' && (
              <>
                <NumberControl label="Radius r" value={r} onChange={setR} />
                <NumberControl label="Height h" value={h} onChange={setH} />
              </>
            )}
            {shape === 'sphere' && (
              <NumberControl label="Radius r" value={r} onChange={setR} />
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
            {computed.perimeter !== undefined && (
              <Stat
                label={shape === 'circle' ? 'Circumference' : shape === 'semicircle' ? 'Perimeter' : 'Perimeter'}
                value={round(computed.perimeter)}
                accent={dark ? '#60a5fa' : '#2563eb'}
              />
            )}
            {computed.area !== undefined && (
              <Stat
                label="Area"
                value={round(computed.area)}
                accent={dark ? '#34d399' : '#059669'}
              />
            )}
            {computed.volume !== undefined && (
              <Stat
                label="Volume"
                value={round(computed.volume)}
                accent={dark ? '#a78bfa' : '#7c3aed'}
              />
            )}
            {computed.surfaceArea !== undefined && (
              <Stat
                label="Surface Area"
                value={round(computed.surfaceArea)}
                accent={dark ? '#34d399' : '#059669'}
              />
            )}
            {computed.hypotenuse !== undefined && (
              <Stat
                label="Hypotenuse"
                value={round(computed.hypotenuse)}
                accent={dark ? '#fbbf24' : '#d97706'}
              />
            )}
          </div>

          <FormulaCard shape={shape} dark={dark} />

          <p
            className={`text-xs leading-snug ${
              dark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Tip: change the parameters to see how perimeter, area, and volume
            respond. For circles & spheres, area / volume scale with powers of
            the radius.
          </p>
        </div>
      </div>
    </div>
  );
}
