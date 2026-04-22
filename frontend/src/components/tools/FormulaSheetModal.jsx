import React, { useMemo, useState } from 'react';
import {
  renderLatexToHtml,
  applySafeMathFix,
  sanitizeUnicode,
} from '../../utils/latexHelpers';

// ── Math Formula Bank (KaTeX-formatted) ───────────────────────────────
// Each entry has: name, formula (LaTeX), description, category, tags.
const MATH_FORMULAS = [
  // Algebra
  {
    name: 'Slope of a Line',
    formula: 'm = \\dfrac{y_2 - y_1}{x_2 - x_1}',
    description: 'Slope between two points (x₁, y₁) and (x₂, y₂).',
    category: 'Algebra',
  },
  {
    name: 'Slope-Intercept Form',
    formula: 'y = mx + b',
    description: 'Line with slope m and y-intercept b.',
    category: 'Algebra',
  },
  {
    name: 'Point-Slope Form',
    formula: 'y - y_1 = m(x - x_1)',
    description: 'Line through (x₁, y₁) with slope m.',
    category: 'Algebra',
  },
  {
    name: 'Standard Form',
    formula: 'Ax + By = C',
    description: 'A, B, C are integers with A ≥ 0.',
    category: 'Algebra',
  },
  {
    name: 'Quadratic Formula',
    formula: 'x = \\dfrac{-b \\pm \\sqrt{b^{2} - 4ac}}{2a}',
    description: 'Solutions to ax² + bx + c = 0.',
    category: 'Algebra',
  },
  {
    name: 'Distance Formula',
    formula: 'd = \\sqrt{(x_2 - x_1)^{2} + (y_2 - y_1)^{2}}',
    description: 'Distance between two points in the plane.',
    category: 'Algebra',
  },
  {
    name: 'Midpoint Formula',
    formula:
      '\\left(\\dfrac{x_1 + x_2}{2},\\ \\dfrac{y_1 + y_2}{2}\\right)',
    description: 'Midpoint between two points.',
    category: 'Algebra',
  },

  // Geometry — Perimeter & Area
  {
    name: 'Area of Rectangle',
    formula: 'A = lw',
    description: 'Length times width.',
    category: 'Geometry',
  },
  {
    name: 'Perimeter of Rectangle',
    formula: 'P = 2l + 2w',
    description: 'Sum of all four sides.',
    category: 'Geometry',
  },
  {
    name: 'Area of Triangle',
    formula: 'A = \\tfrac{1}{2}bh',
    description: 'One-half base times height.',
    category: 'Geometry',
  },
  {
    name: 'Area of Parallelogram',
    formula: 'A = bh',
    description: 'Base times perpendicular height.',
    category: 'Geometry',
  },
  {
    name: 'Area of Trapezoid',
    formula: 'A = \\tfrac{1}{2}(b_1 + b_2)h',
    description: 'Average of the two bases times height.',
    category: 'Geometry',
  },
  {
    name: 'Circumference of Circle',
    formula: 'C = 2\\pi r',
    description: 'Distance around the circle.',
    category: 'Geometry',
  },
  {
    name: 'Area of Circle',
    formula: 'A = \\pi r^{2}',
    description: 'Pi times radius squared.',
    category: 'Geometry',
  },
  {
    name: 'Pythagorean Theorem',
    formula: 'a^{2} + b^{2} = c^{2}',
    description: 'Right triangle: legs a and b, hypotenuse c.',
    category: 'Geometry',
  },

  // Geometry — Volume & Surface
  {
    name: 'Volume of Rectangular Prism',
    formula: 'V = lwh',
    description: 'Length × width × height.',
    category: 'Solids',
  },
  {
    name: 'Volume of Cylinder',
    formula: 'V = \\pi r^{2} h',
    description: 'Area of base times height.',
    category: 'Solids',
  },
  {
    name: 'Volume of Cone',
    formula: 'V = \\tfrac{1}{3}\\pi r^{2} h',
    description: 'One-third the volume of a cylinder of the same base.',
    category: 'Solids',
  },
  {
    name: 'Volume of Sphere',
    formula: 'V = \\tfrac{4}{3}\\pi r^{3}',
    description: 'Four-thirds pi r cubed.',
    category: 'Solids',
  },
  {
    name: 'Volume of Pyramid',
    formula: 'V = \\tfrac{1}{3}Bh',
    description: 'B is the base area, h is the height.',
    category: 'Solids',
  },
  {
    name: 'Surface Area of Sphere',
    formula: 'SA = 4\\pi r^{2}',
    description: 'Four pi r squared.',
    category: 'Solids',
  },

  // Statistics
  {
    name: 'Mean (Average)',
    formula: '\\bar{x} = \\dfrac{\\sum x}{n}',
    description: 'Sum of values divided by count.',
    category: 'Statistics',
  },
  {
    name: 'Range',
    formula: '\\text{Range} = \\max - \\min',
    description: 'Largest value minus smallest value.',
    category: 'Statistics',
  },
  {
    name: 'Probability',
    formula:
      'P(\\text{event}) = \\dfrac{\\text{favorable outcomes}}{\\text{total outcomes}}',
    description: 'Equally-likely outcomes.',
    category: 'Statistics',
  },

  // Money / Finance
  {
    name: 'Simple Interest',
    formula: 'I = Prt',
    description: 'Principal × rate × time (t in years).',
    category: 'Money',
  },
  {
    name: 'Total After Simple Interest',
    formula: 'A = P(1 + rt)',
    description: 'Principal plus simple interest accrued.',
    category: 'Money',
  },
  {
    name: 'Compound Interest',
    formula: 'A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt}',
    description: 'Compounded n times per year for t years.',
    category: 'Money',
  },
];

const CATEGORY_ORDER = [
  'All',
  'Algebra',
  'Geometry',
  'Solids',
  'Statistics',
  'Money',
];

function FormulaDisplay({ latex, className = '' }) {
  const html = useMemo(() => {
    if (typeof latex !== 'string') return '';
    let working = latex;
    try {
      working = applySafeMathFix(working);
    } catch {
      /* best-effort */
    }
    try {
      const out = renderLatexToHtml(working);
      return sanitizeUnicode(out);
    } catch {
      return (working || '').replace(
        /[&<>"']/g,
        (m) =>
          ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
          }[m])
      );
    }
  }, [latex]);

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

function MathFormulaPanel({ dark = false }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MATH_FORMULAS.filter((f) => {
      if (category !== 'All' && f.category !== category) return false;
      if (!q) return true;
      return (
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
      );
    });
  }, [search, category]);

  return (
    <div className="math-formula-panel">
      {/* Controls */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:items-center">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search formulas (e.g. slope, volume, interest)…"
          aria-label="Search formulas"
          className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
            dark
              ? 'bg-slate-900 border-slate-600 text-slate-100 placeholder-slate-500'
              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
          }`}
        />
        <div className="flex flex-wrap gap-1.5">
          {CATEGORY_ORDER.map((cat) => {
            const active = cat === category;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition focus:outline-none focus:ring-2 ${
                  active
                    ? 'bg-blue-600 text-white'
                    : dark
                      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                aria-pressed={active}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <p
          className={`text-sm py-8 text-center ${
            dark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          No formulas match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((item) => (
            <div
              key={item.name}
              className={`p-4 rounded-lg border ${
                dark
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3
                  className={`font-semibold ${
                    dark ? 'text-blue-300' : 'text-blue-700'
                  }`}
                >
                  {item.name}
                </h3>
                <span
                  className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded shrink-0 ${
                    dark
                      ? 'bg-slate-700 text-slate-300'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.category}
                </span>
              </div>
              <FormulaDisplay
                latex={item.formula}
                className={`my-2 px-2 py-2 rounded text-center text-base ${
                  dark ? 'bg-slate-900' : 'bg-slate-50'
                }`}
              />
              <p
                className={`text-xs leading-snug ${
                  dark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * FormulaSheetModal — Math formula reference.
 *
 * Renders inline by default (intended to be wrapped by <ToolShell>).
 * Pass `asModal` (or simply pass `onClose` with no other context) and the
 * legacy floating overlay is rendered for backward compatibility.
 */
export function FormulaSheetModal({ onClose, asModal = false, dark = false }) {
  // Heuristic for legacy callers: if explicitly asked for a modal, render it.
  if (asModal) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
        onClick={onClose}
        role="presentation"
      >
        <div
          className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Math formula sheet"
        >
          <div className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">📐 Math Formula Sheet</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-white text-2xl leading-none hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white/60 rounded"
              aria-label="Close formula sheet"
            >
              ×
            </button>
          </div>
          <div className="p-6 overflow-y-auto">
            <MathFormulaPanel dark={dark} />
          </div>
        </div>
      </div>
    );
  }

  // Inline mode — fits inside ToolShell.
  return <MathFormulaPanel dark={dark} />;
}

export default FormulaSheetModal;
