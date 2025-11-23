import React, { useEffect, useState } from 'react';
import {
  normalizeFormulaLatex,
  renderLatexToHtml,
  escapeHtml,
  applySafeMathFix,
} from '../../utils/mathUtils.js';

export function FormulaDisplay({ latex, className = '' }) {
  const safeLatex = normalizeFormulaLatex(latex);
  let html = '';

  try {
    html = renderLatexToHtml(safeLatex);
  } catch (error) {
    console.warn('Formula render failed:', error?.message || error);
    html = escapeHtml(typeof safeLatex === 'string' ? safeLatex : '');
  }

  return (
    <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export function ScienceFormulaSheet({ onClose }) {
  const [formulas, setFormulas] = useState([]);
  useEffect(() => {
    let mounted = true;
    import('../../data/science/ScienceFormulas.js')
      .then((m) => {
        if (!mounted) return;
        const list = Array.isArray(m.ScienceFormulas) ? m.ScienceFormulas : [];
        setFormulas(list);
        if (typeof window !== 'undefined') window.ScienceFormulas = list;
      })
      .catch(() => setFormulas([]));
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'var(--modal-overlay)' }}
    >
      <div className="formula-sheet science-formula-sheet rounded-xl shadow-2xl max-w-lg w-11/12 p-6 relative">
        <button
          className="formula-sheet-close absolute top-3 right-3 font-bold hover:opacity-80 transition-opacity"
          onClick={onClose}
          type="button"
          aria-label="Close science formula sheet"
          style={{ color: 'inherit' }}
        >
          ✕
        </button>

        <h2 className="formula-sheet-title text-xl font-bold mb-4">
          Science Formula Sheet
        </h2>

        <div className="formula-sheet-grid space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {formulas.map((item, idx) => (
            <div
              key={idx}
              className="formula-sheet-card rounded-lg p-3 space-y-2"
            >
              <h3 className="formula-sheet-label font-semibold">{item.name}</h3>
              <FormulaDisplay
                latex={item.formula}
                className="formula-equation rounded text-center my-2 text-lg font-mono px-2 py-2"
              />
              <p className="formula-sheet-description text-xs leading-snug">
                {item.variables}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FormulaSheetModal({ onClose }) {
  const Formula = ({ title, formula, description }) => {
    const sanitizedFormula =
      typeof formula === 'string'
        ? (() => {
            let working = formula;
            working = applySafeMathFix(working);
            if (typeof normalizeLatexMacrosInMath === 'function') {
              working = normalizeLatexMacrosInMath(working);
            }
            return working;
          })()
        : formula;
    let html = '';
    try {
      html = renderLatexToHtml(sanitizedFormula);
    } catch (err) {
      console.warn('KaTeX render fallback triggered:', err?.message || err);
      html = escapeHtml(
        typeof sanitizedFormula === 'string' ? sanitizedFormula : ''
      );
    }

    return (
      <div className="formula-sheet-card rounded-lg p-3 space-y-2 mb-4">
        <h4 className="formula-sheet-label font-bold text-md">{title}</h4>
        <div className="formula-equation rounded text-center text-lg font-mono px-2 py-2">
          <span dangerouslySetInnerHTML={{ __html: html }}></span>
        </div>
        {description && (
          <p className="formula-sheet-description text-sm">{description}</p>
        )}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 w-full h-full flex items-center justify-center z-50"
      style={{ backgroundColor: 'var(--modal-overlay)' }}
    >
      <div className="formula-sheet rounded-lg shadow-2xl w-11/12 max-w-2xl max-h-[90vh]">
        <div
          className="formula-sheet-header p-4 border-b flex justify-between items-center sticky top-0"
          style={{ borderColor: 'rgba(148,163,184,0.35)' }}
        >
          <h2 className="formula-sheet-title text-xl font-bold">
            GED® Mathematical Reasoning Formula Sheet
          </h2>
          <button
            onClick={onClose}
            className="formula-sheet-close text-3xl hover:opacity-80 transition-opacity"
            style={{ color: 'inherit' }}
          >
            &times;
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-65px)] grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <div>
            <h3 className="formula-sheet-section text-lg font-bold border-b mb-2">
              Area
            </h3>
            <Formula title="Square" formula="A = s^2" />
            <Formula title="Rectangle" formula="A = lw" />
            <Formula title="Parallelogram" formula="A = bh" />
            <Formula title="Triangle" formula="A = \\frac{1}{2}bh" />
            <Formula title="Trapezoid" formula="A = \\frac{1}{2}h(b_1 + b_2)" />
            <Formula title="Circle" formula="A = \\pi r^2" />

            <h3 className="formula-sheet-section text-lg font-bold border-b mt-4 mb-2">
              Perimeter / Circumference
            </h3>
            <Formula title="Square" formula="P = 4s" />
            <Formula title="Rectangle" formula="P = 2l + 2w" />
            <Formula title="Triangle" formula="P = s_1 + s_2 + s_3" />
            <Formula
              title="Circle (Circumference)"
              formula="C = 2\\pi r \\text{ or } C = \\pi d"
            />
          </div>
          <div>
            <h3 className="formula-sheet-section text-lg font-bold border-b mb-2">
              Volume
            </h3>
            <Formula title="Cube" formula="V = s^3" />
            <Formula title="Rectangular Prism" formula="V = lwh" />
            <Formula title="Cylinder" formula="V = \\pi r^2 h" />
            <Formula
              title="Pyramid"
              formula="V = \\frac{1}{3}Bh"
              description="B = area of base"
            />
            <Formula title="Cone" formula="V = \\frac{1}{3}\\pi r^2 h" />
            <Formula title="Sphere" formula="V = \\frac{4}{3}\\pi r^3" />

            <h3 className="formula-sheet-section text-lg font-bold border-b mt-4 mb-2">
              Data
            </h3>
            <Formula
              title="Mean"
              formula="mean = \\frac{\\text{sum of values}}{\\text{number of values}}"
            />
            <Formula
              title="Median"
              formula="median = \\text{middle value of an ordered data set}"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Attach components to window.Components
if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  Object.assign(window.Components, {
    FormulaDisplay,
    FormulaSheetModal,
    ScienceFormulaSheet,
  });
}
