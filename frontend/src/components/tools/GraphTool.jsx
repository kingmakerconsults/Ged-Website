import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * GraphTool — interactive coordinate plane with controls to add points,
 * lines (slope-intercept), and functions f(x). Wraps JSXGraph if available;
 * otherwise renders a friendly empty state with retry.
 */
export default function GraphTool({ dark = false, boardId = 'jxgbox' }) {
  const containerRef = useRef(null);
  const boardRef = useRef(null);
  const objectsRef = useRef([]); // track created objects to remove on Clear
  const [ready, setReady] = useState(typeof window !== 'undefined' && !!window.JXG);
  const [error, setError] = useState('');

  const [pointX, setPointX] = useState('1');
  const [pointY, setPointY] = useState('2');
  const [slope, setSlope] = useState('1');
  const [intercept, setIntercept] = useState('0');
  const [funcExpr, setFuncExpr] = useState('x*x');

  const initBoard = useCallback(() => {
    if (!window.JXG || !containerRef.current) return;
    if (boardRef.current) return; // already initialized
    try {
      const board = window.JXG.JSXGraph.initBoard(boardId, {
        boundingbox: [-10, 10, 10, -10],
        axis: true,
        showNavigation: true,
        showCopyright: false,
        keepAspectRatio: true,
        defaultAxes: {
          x: { strokeColor: dark ? '#cbd5e1' : '#334155' },
          y: { strokeColor: dark ? '#cbd5e1' : '#334155' },
        },
      });
      boardRef.current = board;
    } catch (e) {
      setError(`Failed to initialize graph: ${e?.message || e}`);
    }
  }, [boardId, dark]);

  useEffect(() => {
    if (ready) {
      initBoard();
    }
    return () => {
      if (boardRef.current && window.JXG) {
        try {
          window.JXG.JSXGraph.freeBoard(boardRef.current);
        } catch {
          /* ignore */
        }
        boardRef.current = null;
      }
      objectsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const handleRetry = () => {
    if (typeof window !== 'undefined' && window.JXG) {
      setError('');
      setReady(true);
    } else {
      setError('JSXGraph is still not loaded. Refresh the page after it loads.');
    }
  };

  const ensureNumber = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  const addPoint = () => {
    if (!boardRef.current) return;
    setError('');
    const x = ensureNumber(pointX);
    const y = ensureNumber(pointY);
    if (x === null || y === null) {
      setError('Point coordinates must be numbers.');
      return;
    }
    const p = boardRef.current.create('point', [x, y], {
      name: `(${x}, ${y})`,
      size: 3,
      fillColor: '#2563eb',
      strokeColor: '#1d4ed8',
      label: { offset: [6, 6] },
    });
    objectsRef.current.push(p);
  };

  const addLine = () => {
    if (!boardRef.current) return;
    setError('');
    const m = ensureNumber(slope);
    const b = ensureNumber(intercept);
    if (m === null || b === null) {
      setError('Slope and intercept must be numbers.');
      return;
    }
    // y = mx + b  →  -m·x + 1·y - b = 0  →  [c, a, b] form is [-b, -m, 1]
    const line = boardRef.current.create(
      'line',
      [
        [0, b],
        [1, m + b],
      ],
      {
        strokeColor: '#059669',
        strokeWidth: 2,
        name: `y = ${m}x + ${b}`,
        withLabel: true,
      }
    );
    objectsRef.current.push(line);
  };

  const addFunction = () => {
    if (!boardRef.current) return;
    setError('');
    // very small sandbox: only allow these characters
    if (!/^[\d\sxX+\-*/().,^A-Za-z]+$/.test(funcExpr)) {
      setError('Function may only contain x, numbers, and the operators + - * / ^ ( ) .');
      return;
    }
    let fn;
    try {
      // Convert ^ to ** for JS exponentiation
      const jsExpr = funcExpr.replace(/\^/g, '**');
      // eslint-disable-next-line no-new-func
      fn = new Function(
        'x',
        `with (Math) { return (${jsExpr}); }`
      );
      // Sanity-test the function on a sample value
      const test = fn(1);
      if (typeof test !== 'number' || Number.isNaN(test)) {
        throw new Error('Expression did not produce a number for x = 1.');
      }
    } catch (e) {
      setError(`Invalid expression: ${e?.message || e}`);
      return;
    }
    const fg = boardRef.current.create('functiongraph', [fn, -10, 10], {
      strokeColor: '#dc2626',
      strokeWidth: 2,
    });
    objectsRef.current.push(fg);
  };

  const clearAll = () => {
    if (!boardRef.current) return;
    setError('');
    objectsRef.current.forEach((obj) => {
      try {
        boardRef.current.removeObject(obj);
      } catch {
        /* ignore */
      }
    });
    objectsRef.current = [];
  };

  const inputCls = `w-20 px-2 py-1 rounded border text-sm ${
    dark
      ? 'bg-slate-900 border-slate-600 text-slate-100'
      : 'bg-white border-slate-300 text-slate-900'
  }`;
  const btnCls = (color) =>
    `px-3 py-1.5 rounded-md text-sm font-semibold text-white transition focus:outline-none focus:ring-2 ${color}`;

  return (
    <div className="graph-tool space-y-4">
      {/* Status / error */}
      {!ready && (
        <div
          className={`p-3 rounded-lg text-sm ${
            dark
              ? 'bg-amber-900/30 text-amber-200 border border-amber-700'
              : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}
        >
          <p className="font-semibold mb-1">JSXGraph isn't loaded yet.</p>
          <p className="mb-2">
            The graphing library powers this tool. It usually loads with the
            page; if you see this for more than a few seconds, click retry.
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {error && (
        <p
          role="alert"
          className={`text-sm ${
            dark ? 'text-red-300' : 'text-red-700'
          }`}
        >
          {error}
        </p>
      )}

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div
          className={`p-3 rounded-lg border ${
            dark
              ? 'bg-slate-800 border-slate-700'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="text-xs font-semibold uppercase tracking-wide mb-2 opacity-80">
            Add Point
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">(</span>
            <input
              type="text"
              inputMode="decimal"
              value={pointX}
              onChange={(e) => setPointX(e.target.value)}
              aria-label="x coordinate"
              className={inputCls}
            />
            <span>,</span>
            <input
              type="text"
              inputMode="decimal"
              value={pointY}
              onChange={(e) => setPointY(e.target.value)}
              aria-label="y coordinate"
              className={inputCls}
            />
            <span className="text-sm">)</span>
          </div>
          <button
            type="button"
            onClick={addPoint}
            disabled={!boardRef.current}
            className={`mt-3 ${btnCls('bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400')}`}
          >
            Plot point
          </button>
        </div>

        <div
          className={`p-3 rounded-lg border ${
            dark
              ? 'bg-slate-800 border-slate-700'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="text-xs font-semibold uppercase tracking-wide mb-2 opacity-80">
            Add Line (y = m·x + b)
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm">y =</span>
            <input
              type="text"
              inputMode="decimal"
              value={slope}
              onChange={(e) => setSlope(e.target.value)}
              aria-label="slope m"
              className={inputCls}
            />
            <span className="text-sm">x +</span>
            <input
              type="text"
              inputMode="decimal"
              value={intercept}
              onChange={(e) => setIntercept(e.target.value)}
              aria-label="y-intercept b"
              className={inputCls}
            />
          </div>
          <button
            type="button"
            onClick={addLine}
            disabled={!boardRef.current}
            className={`mt-3 ${btnCls('bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400')}`}
          >
            Plot line
          </button>
        </div>

        <div
          className={`p-3 rounded-lg border ${
            dark
              ? 'bg-slate-800 border-slate-700'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="text-xs font-semibold uppercase tracking-wide mb-2 opacity-80">
            Add Function f(x) =
          </div>
          <input
            type="text"
            value={funcExpr}
            onChange={(e) => setFuncExpr(e.target.value)}
            placeholder="x*x  or  sin(x)  or  2*x+1"
            aria-label="function expression"
            className={`w-full px-2 py-1 rounded border text-sm font-mono ${
              dark
                ? 'bg-slate-900 border-slate-600 text-slate-100'
                : 'bg-white border-slate-300 text-slate-900'
            }`}
          />
          <button
            type="button"
            onClick={addFunction}
            disabled={!boardRef.current}
            className={`mt-3 ${btnCls('bg-rose-600 hover:bg-rose-700 disabled:bg-slate-400')}`}
          >
            Plot function
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={clearAll}
          disabled={!boardRef.current || objectsRef.current.length === 0}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            dark
              ? 'bg-slate-700 hover:bg-slate-600 text-slate-100 disabled:opacity-50'
              : 'bg-slate-200 hover:bg-slate-300 text-slate-800 disabled:opacity-50'
          }`}
        >
          Clear board
        </button>
      </div>

      {/* Board */}
      <div
        id={boardId}
        ref={containerRef}
        className={`jxgbox w-full min-h-[400px] rounded border ${
          dark
            ? 'bg-slate-900 border-slate-700'
            : 'bg-white border-slate-300'
        }`}
        role="img"
        aria-label="Interactive coordinate plane"
      />
    </div>
  );
}
