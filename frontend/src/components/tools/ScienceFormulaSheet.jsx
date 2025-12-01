import React from 'react';
import {
  renderLatexToHtml,
  applySafeMathFix,
  sanitizeUnicode,
} from '../../utils/latexHelpers';

// Science Formulas Data
const SCIENCE_FORMULAS = [
  {
    name: 'Density',
    formula: 'd = \\frac{m}{V}',
    variables: 'd = density (mass per unit volume), m = mass, V = volume',
  },
  {
    name: 'Average Speed',
    formula: 'v = \\frac{d}{t}',
    variables: 'v = average speed, d = distance traveled, t = elapsed time',
  },
  {
    name: 'Force',
    formula: 'F = ma',
    variables: 'F = net force, m = mass, a = acceleration',
  },
  {
    name: 'Work',
    formula: 'W = F \\times d',
    variables:
      'W = work, F = applied force, d = displacement in the direction of the force',
  },
  {
    name: 'Mean (Average)',
    formula:
      '\\bar{x} = \\frac{\\text{Total of all data values}}{\\text{How many values there are}}',
    variables:
      '\\bar{x} = mean (average) of the data set: add all values together and divide by how many values there are',
  },
  {
    name: 'Range',
    formula: '\\text{Range} = \\text{Maximum value} - \\text{Minimum value}',
    variables:
      'Describes the spread between the largest and smallest values in a data set.',
  },
];

// FormulaDisplay Component
function FormulaDisplay({ latex, className = '' }) {
  const sanitizedFormula =
    typeof latex === 'string'
      ? (() => {
          let working = latex;
          working = applySafeMathFix(working);
          // Normalize LaTeX macros if function available
          if (typeof window.normalizeLatexMacrosInMath === 'function') {
            working = window.normalizeLatexMacrosInMath(working);
          }
          return working;
        })()
      : latex;

  let html = '';
  try {
    html = renderLatexToHtml(sanitizedFormula);
  } catch (err) {
    console.warn('KaTeX render fallback triggered:', err?.message || err);
    // Fallback: escape and display as plain text
    html = (sanitizedFormula || '').replace(
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

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizeUnicode(html) }}
    />
  );
}

// Main Science Formula Sheet Component
export default function ScienceFormulaSheet({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'var(--modal-overlay)' }}
      role="dialog"
      aria-labelledby="science-formula-title"
      aria-modal="true"
    >
      <div className="formula-sheet science-formula-sheet rounded-xl shadow-2xl max-w-lg w-11/12 p-6 relative bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
        <button
          className="formula-sheet-close absolute top-3 right-3 text-2xl font-bold hover:opacity-80 transition-opacity text-slate-600 dark:text-slate-300"
          onClick={onClose}
          type="button"
          aria-label="Close science formula sheet"
        >
          ×
        </button>

        <h2
          id="science-formula-title"
          className="formula-sheet-title text-xl font-bold mb-4 text-emerald-700 dark:text-emerald-400"
        >
          🧪 Science Formula Sheet
        </h2>

        <div className="formula-sheet-grid space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {SCIENCE_FORMULAS.map((item, idx) => (
            <div
              key={idx}
              className="formula-sheet-card rounded-lg p-3 space-y-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
            >
              <h3 className="formula-sheet-label font-semibold text-emerald-800 dark:text-emerald-300">
                {item.name}
              </h3>
              <FormulaDisplay
                latex={item.formula}
                className="formula-equation rounded text-center my-2 text-lg font-mono px-2 py-2 bg-white dark:bg-slate-800"
              />
              <p className="formula-sheet-description text-xs leading-snug text-slate-600 dark:text-slate-400">
                {item.variables}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
