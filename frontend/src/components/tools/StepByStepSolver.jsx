import React, { useEffect, useRef, useState } from 'react';
import {
  solveLinearEquation,
  solveLinearInequality,
  solvePercent,
  solveProportion,
  evaluateExpression,
} from './solver/solverEngine';

// Tiny KaTeX-rendered math span. Falls back to plain text if KaTeX
// hasn't loaded.
function Math({ tex, display = false, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === 'undefined' || !window.katex) {
      el.textContent = tex;
      return;
    }
    try {
      window.katex.render(tex, el, { throwOnError: false, displayMode: display });
    } catch {
      el.textContent = tex;
    }
  }, [tex, display]);
  return <span ref={ref} className={className} />;
}

const PROBLEM_TYPES = [
  {
    id: 'linear',
    label: 'Linear equation',
    icon: '🟰',
    blurb: 'Solve equations like 3x + 5 = 14 or 7 − x = 2x + 1.',
    samples: ['2x + 5 = 13', '3x - 4 = x + 8', '4x = 20', 'x/2 + 3 = 7', '7 - x = 2x + 1'],
  },
  {
    id: 'inequality',
    label: 'Inequality',
    icon: '↔️',
    blurb: 'Solve inequalities. Remember: dividing by a negative FLIPS the sign.',
    samples: ['2x - 5 > 7', '4x <= 12', '-3x + 1 < 10', 'x + 4 >= 2x - 1'],
  },
  {
    id: 'percent',
    label: 'Percent',
    icon: '％',
    blurb: 'Three classic GED forms: P% of W, X is what % of Y, P% of WHAT is X.',
    samples: [],
  },
  {
    id: 'proportion',
    label: 'Proportion',
    icon: '⚖️',
    blurb: 'Cross-multiply to solve a proportion. Leave one field blank for the unknown.',
    samples: [],
  },
  {
    id: 'expression',
    label: 'Evaluate (PEMDAS)',
    icon: '🔢',
    blurb: 'Evaluate arithmetic with order of operations. Use ^ for exponents.',
    samples: ['3 + 4*5', '(2 + 3)^2', '12 / (1 + 2) + 5', '2^3 + 4*2 - 1'],
  },
];

const STORAGE_KEY = 'stepByStepSolver:lastType';

export default function StepByStepSolver({ dark = false, onSolutionFound = null }) {
  const [typeId, setTypeId] = useState(() => {
    if (typeof window === 'undefined') return 'linear';
    return window.sessionStorage?.getItem(STORAGE_KEY) || 'linear';
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage?.setItem(STORAGE_KEY, typeId);
    }
  }, [typeId]);

  const [eqInput, setEqInput] = useState('2x + 5 = 13');
  const [ineqInput, setIneqInput] = useState('2x - 5 > 7');
  const [exprInput, setExprInput] = useState('3 + 4*5');
  const [pctKind, setPctKind] = useState('percentOf');
  const [pctP, setPctP] = useState('25');
  const [pctW, setPctW] = useState('80');
  const [pctX, setPctX] = useState('15');
  const [propA, setPropA] = useState('3');
  const [propB, setPropB] = useState('4');
  const [propC, setPropC] = useState('');
  const [propD, setPropD] = useState('12');

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const activeType = PROBLEM_TYPES.find((t) => t.id === typeId);

  const dispatch = () => {
    setError('');
    let res;
    if (typeId === 'linear') res = solveLinearEquation(eqInput);
    else if (typeId === 'inequality') res = solveLinearInequality(ineqInput);
    else if (typeId === 'expression') res = evaluateExpression(exprInput);
    else if (typeId === 'percent')
      res = solvePercent({
        kind: pctKind,
        percent: pctP,
        part: pctX,
        whole: pctW,
      });
    else if (typeId === 'proportion')
      res = solveProportion({ a: propA, b: propB, c: propC, d: propD });
    else res = { ok: false, error: 'Unknown problem type.' };

    if (!res.ok) {
      setError(res.error);
      setResult(null);
      return;
    }
    setResult(res);
    if (onSolutionFound) onSolutionFound(res);
  };

  const loadSample = (s) => {
    if (typeId === 'linear') setEqInput(s);
    else if (typeId === 'inequality') setIneqInput(s);
    else if (typeId === 'expression') setExprInput(s);
    setError('');
    setResult(null);
  };

  const clearAll = () => {
    setResult(null);
    setError('');
  };

  useEffect(() => {
    setResult(null);
    setError('');
  }, [typeId]);

  const inputCls = `w-full px-3 py-2 rounded border text-base font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    dark ? 'bg-slate-900 border-slate-600 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
  }`;
  const numCls = `w-24 px-2 py-1 rounded border text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    dark ? 'bg-slate-900 border-slate-600 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
  }`;
  const cardCls = `rounded-lg p-4 ${
    dark ? 'bg-slate-800 border border-slate-700' : 'bg-slate-50 border border-slate-200'
  }`;

  return (
    <div
      className={`step-by-step-solver w-full rounded-lg p-5 shadow-lg ${
        dark ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900'
      }`}
    >
      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
        <span aria-hidden>🧮</span> Step-by-Step Solver
      </h3>

      {/* Type picker */}
      <div className="flex flex-wrap gap-2 mb-4" role="tablist">
        {PROBLEM_TYPES.map((t) => {
          const active = t.id === typeId;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTypeId(t.id)}
              className={`px-3 py-1.5 rounded-md text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                active
                  ? 'bg-blue-600 text-white'
                  : dark
                    ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="mr-1.5" aria-hidden>{t.icon}</span>
              {t.label}
            </button>
          );
        })}
      </div>

      <p className={`text-sm mb-4 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
        {activeType?.blurb}
      </p>

      {/* Per-type input UI */}
      <div className={`${cardCls} mb-4`}>
        {typeId === 'linear' && (
          <div>
            <label htmlFor="solver-eq" className="block text-sm font-semibold mb-2">
              Equation (use x for the variable)
            </label>
            <input
              id="solver-eq"
              value={eqInput}
              onChange={(e) => setEqInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && dispatch()}
              className={inputCls}
              placeholder="e.g. 2x + 5 = 13"
            />
          </div>
        )}
        {typeId === 'inequality' && (
          <div>
            <label htmlFor="solver-ineq" className="block text-sm font-semibold mb-2">
              Inequality (use &lt;, &gt;, &lt;=, &gt;=)
            </label>
            <input
              id="solver-ineq"
              value={ineqInput}
              onChange={(e) => setIneqInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && dispatch()}
              className={inputCls}
              placeholder="e.g. 2x - 5 > 7"
            />
          </div>
        )}
        {typeId === 'expression' && (
          <div>
            <label htmlFor="solver-expr" className="block text-sm font-semibold mb-2">
              Expression
            </label>
            <input
              id="solver-expr"
              value={exprInput}
              onChange={(e) => setExprInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && dispatch()}
              className={inputCls}
              placeholder="e.g. (2 + 3)^2"
            />
          </div>
        )}
        {typeId === 'percent' && (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'percentOf', label: 'P% of W' },
                { id: 'isWhatPct', label: 'X is what % of Y' },
                { id: 'pctIsX', label: 'P% of WHAT is X' },
              ].map((k) => {
                const active = k.id === pctKind;
                return (
                  <button
                    key={k.id}
                    type="button"
                    onClick={() => setPctKind(k.id)}
                    aria-pressed={active}
                    className={`px-2.5 py-1 rounded text-xs font-semibold ${
                      active
                        ? 'bg-blue-600 text-white'
                        : dark ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {k.label}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {pctKind === 'percentOf' && (
                <>
                  <input aria-label="percent" value={pctP} onChange={(e) => setPctP(e.target.value)} className={numCls} />
                  <span>% of</span>
                  <input aria-label="whole" value={pctW} onChange={(e) => setPctW(e.target.value)} className={numCls} />
                </>
              )}
              {pctKind === 'isWhatPct' && (
                <>
                  <input aria-label="part" value={pctX} onChange={(e) => setPctX(e.target.value)} className={numCls} />
                  <span>is what % of</span>
                  <input aria-label="whole" value={pctW} onChange={(e) => setPctW(e.target.value)} className={numCls} />
                </>
              )}
              {pctKind === 'pctIsX' && (
                <>
                  <input aria-label="percent" value={pctP} onChange={(e) => setPctP(e.target.value)} className={numCls} />
                  <span>% of WHAT is</span>
                  <input aria-label="part" value={pctX} onChange={(e) => setPctX(e.target.value)} className={numCls} />
                </>
              )}
            </div>
          </div>
        )}
        {typeId === 'proportion' && (
          <div className="space-y-2">
            <p className="text-xs opacity-75">Leave the unknown field <em>blank</em>.</p>
            <div className="flex items-center gap-2 text-base">
              <div className="flex flex-col items-center">
                <input aria-label="a" value={propA} onChange={(e) => setPropA(e.target.value)} className={numCls} />
                <div className="w-24 border-t-2 my-1" style={{ borderColor: dark ? '#475569' : '#94a3b8' }} />
                <input aria-label="b" value={propB} onChange={(e) => setPropB(e.target.value)} className={numCls} />
              </div>
              <span className="text-2xl mx-2">=</span>
              <div className="flex flex-col items-center">
                <input aria-label="c" value={propC} onChange={(e) => setPropC(e.target.value)} className={numCls} />
                <div className="w-24 border-t-2 my-1" style={{ borderColor: dark ? '#475569' : '#94a3b8' }} />
                <input aria-label="d" value={propD} onChange={(e) => setPropD(e.target.value)} className={numCls} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Samples */}
      {activeType?.samples?.length > 0 && (
        <div className="mb-4">
          <p className="text-xs uppercase font-semibold opacity-70 mb-2">Try a sample</p>
          <div className="flex flex-wrap gap-2">
            {activeType.samples.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => loadSample(s)}
                className={`px-2.5 py-1 rounded text-sm font-mono ${
                  dark ? 'bg-slate-700 hover:bg-slate-600 text-slate-100' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={dispatch}
          className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Solve
        </button>
        <button
          type="button"
          onClick={clearAll}
          className={`px-5 py-2 rounded-md font-semibold ${
            dark ? 'bg-slate-700 hover:bg-slate-600 text-slate-100' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
          }`}
        >
          Clear
        </button>
      </div>

      {error && (
        <p role="alert" className={`text-sm mb-4 ${dark ? 'text-red-300' : 'text-red-700'}`}>
          ⚠ {error}
        </p>
      )}

      {result && (
        <div className="space-y-3">
          <h4 className="font-semibold text-lg">Solution steps</h4>
          {result.steps.map((s, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg ${
                dark ? 'bg-slate-800 border border-slate-700' : 'bg-slate-50 border border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex-shrink-0"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium mb-1.5">{s.narration}</p>
                  <div className={`text-base ${dark ? 'text-slate-100' : 'text-slate-800'}`}>
                    <Math tex={s.latex} display />
                  </div>
                  {s.why && (
                    <details className={`mt-2 text-xs ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <summary className="cursor-pointer font-semibold">Why?</summary>
                      <p className="mt-1 leading-snug">{s.why}</p>
                    </details>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div
            className={`p-3 rounded-lg font-semibold ${
              dark
                ? 'bg-emerald-900/30 text-emerald-200 border border-emerald-700'
                : 'bg-emerald-50 text-emerald-900 border border-emerald-300'
            }`}
          >
            ✅ Final answer: {result.answer}
          </div>
        </div>
      )}

      {!result && !error && (
        <div className={`text-center py-6 text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          Pick a problem type, fill in the fields, and press Solve to see each step explained.
        </div>
      )}
    </div>
  );
}
