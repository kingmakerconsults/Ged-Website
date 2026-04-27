import React, { useState, useEffect, useRef } from 'react';
import { SCENARIOS } from '../data/economics/econ_scenarios.js';
import { ECON_CHART_QUESTIONS } from '../data/economics/econ_chart_questions.js';

const TAB_KEY = 'economicsTool:tab';

export default function EconomicsGraphTool({ onExit, dark = false }) {
  const [tab, setTab] = useState(() => {
    if (typeof window === 'undefined') return 'sandbox';
    return window.sessionStorage?.getItem(TAB_KEY) || 'sandbox';
  });
  const setTabSafe = (t) => {
    setTab(t);
    if (typeof window !== 'undefined') window.sessionStorage?.setItem(TAB_KEY, t);
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
            ? 'bg-emerald-600 text-white'
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
    <div className={`fade-in p-6 ${dark ? 'bg-slate-700 text-slate-100' : 'bg-white text-slate-900'}`}>
      <header className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
        <button
          onClick={onExit}
          className="text-sm font-semibold text-sky-600 hover:text-sky-700"
        >
          ← Back to Social Studies
        </button>
        <h2 className="text-2xl font-bold">
          Market Simulator — Supply &amp; Demand Trainer
        </h2>
        <div className="w-16"></div>
      </header>

      <div className="flex flex-wrap gap-2 mb-4" role="tablist">
        {tabBtn('sandbox', '🎛️ Interactive Sandbox')}
        {tabBtn('scenarios', '📜 Scenario Trainer')}
        {tabBtn('chart', '📊 Chart Practice')}
      </div>

      {tab === 'sandbox' && <SandboxTab dark={dark} />}
      {tab === 'scenarios' && <ScenarioTab dark={dark} />}
      {tab === 'chart' && <ChartPracticeTab dark={dark} />}
    </div>
  );
}

function SandboxTab({ dark }) {
  const boardRef = useRef(null);
  const boardInstance = useRef(null);
  const initialized = useRef(false);

  const [trainingMode, setTrainingMode] = useState(false);
  const [stepAffect, setStepAffect] = useState(null); // 'supply' | 'demand'
  const [stepDirection, setStepDirection] = useState(null); // 'increase' | 'decrease'

  const [demandShift, setDemandShift] = useState(0); // -4 to 4
  const [supplyShift, setSupplyShift] = useState(0); // -4 to 4
  const [equilibrium, setEquilibrium] = useState({ p: 5, q: 5 });

  useEffect(() => {
    if (!window.JXG || !boardRef.current) return;
    if (initialized.current) return; // avoid duplicate init

    initialized.current = true;
    const board = window.JXG.JSXGraph.initBoard(boardRef.current.id, {
      boundingbox: [-1, 12, 12, -1],
      axis: false,
      showCopyright: false,
      showNavigation: false,
      keepAspectRatio: true,
      pan: { enabled: false },
      zoom: { enabled: false },
    });

    board.on('down', () => false);
    board.on('move', () => false);
    board.on('up', () => false);

    board.create(
      'axis',
      [
        [0, 0],
        [1, 0],
      ],
      {
        name: 'Quantity',
        withLabel: true,
        label: { position: 'rt', offset: [-10, 10] },
        fixed: true,
        highlight: false,
        strokeColor: '#64748b',
      }
    );
    board.create(
      'axis',
      [
        [0, 0],
        [0, 1],
      ],
      {
        name: 'Price',
        withLabel: true,
        label: { position: 'rt', offset: [-20, 0] },
        fixed: true,
        highlight: false,
        strokeColor: '#64748b',
      }
    );

    boardInstance.current = board;
  }, []);

  useEffect(() => {
    const board = boardInstance.current;
    if (!board) return;
    board.suspendUpdate();

    const d_intercept = 10 + demandShift;
    const s_intercept = 0 + supplyShift;

    const eq_Q = (d_intercept - s_intercept) / 2;
    const eq_P = eq_Q + s_intercept;
    setEquilibrium({ p: eq_P, q: eq_Q });

    // Remove prior dynamic elements
    if (board.objectsList) {
      board.objectsList.forEach((el) => {
        if (
          (el.elType === 'line' ||
            el.elType === 'point' ||
            el.elType === 'text' ||
            el.elType === 'segment') &&
          el.name !== 'Quantity' &&
          el.name !== 'Price'
        ) {
          board.removeObject(el);
        }
      });
    }

    // Demand line
    board.create(
      'line',
      [
        [0, d_intercept],
        [10, d_intercept - 10],
      ],
      {
        strokeColor: '#3b82f6',
        strokeWidth: 3,
        name: 'Demand',
        withLabel: true,
        label: { position: 'top', offset: [10, 10] },
        fixed: true,
        highlight: false,
      }
    );
    // Supply line
    board.create(
      'line',
      [
        [0, s_intercept],
        [10, 10 + s_intercept],
      ],
      {
        strokeColor: '#ef4444',
        strokeWidth: 3,
        name: 'Supply',
        withLabel: true,
        label: { position: 'top', offset: [10, -10] },
        fixed: true,
        highlight: false,
      }
    );

    // Equilibrium point
    board.create('point', [eq_Q, eq_P], {
      name: '',
      face: 'o',
      size: 5,
      strokeColor: '#22c55e',
      fillColor: '#22c55e',
      fixed: true,
      highlight: false,
    });
    // Guides
    board.create(
      'segment',
      [
        [eq_Q, 0],
        [eq_Q, eq_P],
      ],
      {
        strokeColor: '#94a3b8',
        dash: 2,
        strokeWidth: 1,
        fixed: true,
        highlight: false,
      }
    );
    board.create(
      'segment',
      [
        [0, eq_P],
        [eq_Q, eq_P],
      ],
      {
        strokeColor: '#94a3b8',
        dash: 2,
        strokeWidth: 1,
        fixed: true,
        highlight: false,
      }
    );

    board.unsuspendUpdate();
  }, [demandShift, supplyShift]);

  useEffect(
    () => () => {
      if (boardInstance.current) {
        try {
          window.JXG?.JSXGraph?.freeBoard(boardInstance.current);
        } catch {}
        boardInstance.current = null;
        initialized.current = false;
      }
    },
    []
  );

  const applyTrainingSelection = () => {
    if (!trainingMode) return;
    if (stepAffect === 'demand') {
      setDemandShift(stepDirection === 'increase' ? 2 : -2);
    } else if (stepAffect === 'supply') {
      setSupplyShift(stepDirection === 'increase' ? 2 : -2);
    }
  };

  return (
    <div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white/95 dark:bg-slate-600/95 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden h-[500px] relative">
          <div
            id="econ-board"
            ref={boardRef}
            className="jxgbox w-full h-full"
            style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
            aria-hidden="true"
          />
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-600/90 p-3 rounded-lg border border-slate-200 dark:border-slate-600 shadow text-sm">
            <div className="font-bold text-slate-500 uppercase text-xs">
              Equilibrium
            </div>
            <div className="text-emerald-600 font-mono text-lg">
              Price: ${equilibrium.p.toFixed(2)}
            </div>
            <div className="text-emerald-600 font-mono text-lg">
              Quantity: {equilibrium.q.toFixed(0)} units
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          {/* Training Mode */}
          <div className="p-5 bg-slate-50 dark:bg-slate-600/50 border border-slate-200 dark:border-slate-700 rounded-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Training Mode</h3>
              <button
                onClick={() => {
                  const next = !trainingMode;
                  setTrainingMode(next);
                  setStepAffect(null);
                  setStepDirection(null);
                }}
                className={`px-3 py-1 rounded text-sm ${
                  trainingMode
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
              >
                {trainingMode ? 'ON' : 'OFF'}
              </button>
            </div>
            {trainingMode && (
              <div className="mt-4 space-y-3">
                <div>
                  <div className="font-medium mb-2">
                    Step 1: Does this affect Supply or Demand?
                  </div>
                  <div className="flex gap-2">
                    <button
                      className={`px-3 py-1 rounded ${
                        stepAffect === 'supply'
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                      onClick={() => setStepAffect('supply')}
                    >
                      Supply
                    </button>
                    <button
                      className={`px-3 py-1 rounded ${
                        stepAffect === 'demand'
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                      onClick={() => setStepAffect('demand')}
                    >
                      Demand
                    </button>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2">
                    Step 2: Increase or Decrease?
                  </div>
                  <div className="flex gap-2">
                    <button
                      className={`px-3 py-1 rounded ${
                        stepDirection === 'increase'
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                      onClick={() => setStepDirection('increase')}
                    >
                      Increase
                    </button>
                    <button
                      className={`px-3 py-1 rounded ${
                        stepDirection === 'decrease'
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                      onClick={() => setStepDirection('decrease')}
                    >
                      Decrease
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    onClick={applyTrainingSelection}
                    className="px-3 py-1 rounded bg-emerald-600 text-white"
                  >
                    Apply Selection
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Demand Controls */}
          <div className="p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl">
            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-1">
              Demand Factors
            </h3>
            <p className="text-xs text-blue-600 dark:text-blue-400 mb-4">
              Examples: Consumer income, trends, population.
            </p>
            <label className="block text-sm font-medium mb-2">
              Shift Demand Curve
            </label>
            <input
              type="range"
              min="-4"
              max="4"
              step="1"
              value={demandShift}
              onChange={(e) => setDemandShift(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Decrease</span>
              <span>Increase</span>
            </div>
          </div>

          {/* Supply Controls */}
          <div className="p-5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl">
            <h3 className="font-bold text-red-800 dark:text-red-300 mb-1">
              Supply Factors
            </h3>
            <p className="text-xs text-red-600 dark:text-red-400 mb-4">
              Examples: Technology, cost of inputs, taxes.
            </p>
            <label className="block text-sm font-medium mb-2">
              Shift Supply Curve
            </label>
            <input
              type="range"
              min="-4"
              max="4"
              step="1"
              value={supplyShift}
              onChange={(e) => setSupplyShift(Number(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>
                Increase Supply
                <br />
                (Lower Cost)
              </span>
              <span>
                Decrease Supply
                <br />
                (Higher Cost)
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Scenario Trainer tab ────────────────────────────────────────────────────
function ScenarioTab({ dark }) {
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(1); // 1 = choose curve, 2 = direction, 3 = price/qty effect, 4 = done
  const [pickCurve, setPickCurve] = useState(null);
  const [pickDir, setPickDir] = useState(null);
  const [pickPrice, setPickPrice] = useState(null);
  const [pickQty, setPickQty] = useState(null);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const filtered = SCENARIOS.filter(
    (s) => filter === 'all' || s.difficulty === filter,
  );
  const safeIdx = filtered.length === 0 ? 0 : idx % filtered.length;
  const sc = filtered[safeIdx];

  const reset = () => {
    setStep(1);
    setPickCurve(null);
    setPickDir(null);
    setPickPrice(null);
    setPickQty(null);
  };
  const next = () => {
    setIdx((i) => (i + 1) % Math.max(filtered.length, 1));
    reset();
  };
  const prev = () => {
    setIdx((i) => (i - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
    reset();
  };

  if (!sc) return <p className="p-4">No scenarios match this filter.</p>;

  const submitFinal = (priceChoice, qtyChoice) => {
    setPickPrice(priceChoice);
    setPickQty(qtyChoice);
    const allCorrect =
      pickCurve === sc.curve &&
      pickDir === sc.direction &&
      priceChoice === sc.eqPriceChange &&
      qtyChoice === sc.eqQtyChange;
    setStats((s) => ({ correct: s.correct + (allCorrect ? 1 : 0), total: s.total + 1 }));
    setStep(4);
  };

  const cardCls = dark
    ? 'bg-slate-800 border border-slate-700'
    : 'bg-slate-50 border border-slate-200';

  const Btn = ({ active, onClick, children, color = 'sky' }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded text-sm font-semibold transition ${
        active
          ? `bg-${color}-600 text-white`
          : dark
            ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
            : 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-200'
      }`}
    >
      {children}
    </button>
  );

  const allCorrect =
    step === 4 &&
    pickCurve === sc.curve &&
    pickDir === sc.direction &&
    pickPrice === sc.eqPriceChange &&
    pickQty === sc.eqQtyChange;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        {['all', 'easy', 'medium', 'hard'].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => { setFilter(d); setIdx(0); reset(); }}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
              filter === d
                ? 'bg-emerald-600 text-white'
                : dark
                  ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {d === 'all' ? 'All difficulties' : d}
          </button>
        ))}
        <span className={`ml-auto text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          {stats.correct}/{stats.total} correct · #{safeIdx + 1} of {filtered.length}
        </span>
      </div>

      <div className={`rounded-lg p-5 ${cardCls}`}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className={`text-xs uppercase font-bold tracking-wide ${dark ? 'text-emerald-300' : 'text-emerald-700'}`}>
            {sc.determinant} · {sc.difficulty}
          </span>
        </div>
        <p className={`text-base mb-4 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>
          {sc.prompt}
        </p>

        {/* Step 1: which curve? */}
        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">Step 1: Which curve shifts?</p>
          <div className="flex gap-2">
            {['supply', 'demand'].map((c) => (
              <Btn
                key={c}
                active={pickCurve === c}
                onClick={() => { if (step >= 1 && step < 4) { setPickCurve(c); setStep(2); } }}
                color="sky"
              >
                {c === 'supply' ? 'Supply' : 'Demand'}
              </Btn>
            ))}
          </div>
        </div>

        {/* Step 2: direction? */}
        {step >= 2 && (
          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">Step 2: Which direction?</p>
            <div className="flex gap-2">
              {['increase', 'decrease'].map((d) => (
                <Btn
                  key={d}
                  active={pickDir === d}
                  onClick={() => { if (step < 4) { setPickDir(d); setStep(3); } }}
                  color="sky"
                >
                  {d === 'increase' ? 'Increase (shift right)' : 'Decrease (shift left)'}
                </Btn>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: equilibrium effect? */}
        {step >= 3 && (
          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">Step 3: What happens to equilibrium price &amp; quantity?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { p: 'up', q: 'up', label: 'Price ↑   Quantity ↑' },
                { p: 'down', q: 'down', label: 'Price ↓   Quantity ↓' },
                { p: 'down', q: 'up', label: 'Price ↓   Quantity ↑' },
                { p: 'up', q: 'down', label: 'Price ↑   Quantity ↓' },
              ].map((opt, i) => {
                const picked = pickPrice === opt.p && pickQty === opt.q;
                let cls = '';
                if (step === 4) {
                  const isRight = opt.p === sc.eqPriceChange && opt.q === sc.eqQtyChange;
                  if (isRight) cls = dark ? 'bg-emerald-900/40 border-emerald-500' : 'bg-emerald-100 border-emerald-500';
                  else if (picked) cls = dark ? 'bg-red-900/40 border-red-500' : 'bg-red-100 border-red-500';
                  else cls = dark ? 'bg-slate-900' : 'bg-white';
                } else {
                  cls = dark ? 'bg-slate-900 hover:bg-slate-700' : 'bg-white hover:bg-slate-100';
                }
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={step === 4}
                    onClick={() => submitFinal(opt.p, opt.q)}
                    className={`px-3 py-2 rounded border text-left text-sm transition ${cls} ${
                      dark ? 'border-slate-600 text-slate-100' : 'border-slate-300 text-slate-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className={`p-3 rounded text-sm ${dark ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-slate-200'}`}>
            <p className={`font-semibold mb-1 ${allCorrect ? 'text-emerald-600' : 'text-amber-600'}`}>
              {allCorrect ? '✓ All steps correct!' : 'Some steps were off — review below.'}
            </p>
            <ul className="space-y-1">
              <li>Curve: <strong>{sc.curve}</strong> {pickCurve === sc.curve ? '✓' : `(you picked ${pickCurve})`}</li>
              <li>Direction: <strong>{sc.direction}</strong> {pickDir === sc.direction ? '✓' : `(you picked ${pickDir})`}</li>
              <li>Effect: <strong>price {sc.eqPriceChange}, quantity {sc.eqQtyChange}</strong></li>
            </ul>
            <p className="mt-2 text-xs"><strong>Why:</strong> {sc.explanation}</p>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={prev}
            className={`px-3 py-1.5 rounded text-sm font-semibold ${
              dark ? 'bg-slate-700 hover:bg-slate-600 text-slate-100' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
            }`}
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={reset}
            className={`px-3 py-1.5 rounded text-sm font-semibold ${
              dark ? 'bg-slate-700 hover:bg-slate-600 text-slate-100' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
            }`}
          >
            Reset
          </button>
          <button
            type="button"
            onClick={next}
            className="ml-auto px-4 py-1.5 rounded text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Chart Practice tab ──────────────────────────────────────────────────────
function ChartPracticeTab({ dark }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState({ correct: 0, attempted: 0 });

  const q = ECON_CHART_QUESTIONS[idx % ECON_CHART_QUESTIONS.length];

  const choose = (i) => {
    if (revealed) return;
    setPicked(i);
    setRevealed(true);
    setStats((s) => ({
      correct: s.correct + (i === q.correct ? 1 : 0),
      attempted: s.attempted + 1,
    }));
  };
  const next = () => {
    setIdx((i) => (i + 1) % ECON_CHART_QUESTIONS.length);
    setPicked(null);
    setRevealed(false);
  };
  const prev = () => {
    setIdx((i) => (i - 1 + ECON_CHART_QUESTIONS.length) % ECON_CHART_QUESTIONS.length);
    setPicked(null);
    setRevealed(false);
  };

  const cardCls = dark ? 'bg-slate-800 border border-slate-700' : 'bg-slate-50 border border-slate-200';

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <span className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          Use these to practice reading supply &amp; demand graphs.
        </span>
        <span className={`ml-auto text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          {stats.correct}/{stats.attempted} correct · #{(idx % ECON_CHART_QUESTIONS.length) + 1} of {ECON_CHART_QUESTIONS.length}
        </span>
      </div>
      <div className={`rounded-lg p-5 ${cardCls}`}>
        <p className={`text-base mb-3 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>
          {q.prompt}
        </p>
        <div className="flex justify-center mb-4">
          <SDChart spec={q.chart} dark={dark} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          {q.choices.map((c, i) => {
            const isCorrect = i === q.correct;
            const isPicked = i === picked;
            let cls = '';
            if (revealed) {
              if (isCorrect) cls = dark ? 'bg-emerald-900/40 border-emerald-500 text-emerald-100' : 'bg-emerald-100 border-emerald-500 text-emerald-900';
              else if (isPicked) cls = dark ? 'bg-red-900/40 border-red-500 text-red-100' : 'bg-red-100 border-red-500 text-red-900';
              else cls = dark ? 'bg-slate-900 text-slate-300' : 'bg-white text-slate-700';
            } else {
              cls = dark ? 'bg-slate-900 text-slate-100 hover:bg-slate-700' : 'bg-white text-slate-800 hover:bg-slate-100';
            }
            return (
              <button
                key={i}
                type="button"
                onClick={() => choose(i)}
                disabled={revealed}
                className={`text-left px-3 py-2 rounded border ${cls} ${dark ? 'border-slate-600' : 'border-slate-300'}`}
              >
                <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>{c}
                {revealed && isCorrect && ' ✓'}
                {revealed && isPicked && !isCorrect && ' ✗'}
              </button>
            );
          })}
        </div>
        {revealed && (
          <div className={`p-3 rounded text-sm ${dark ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-slate-200'}`}>
            <strong>Explanation:</strong> {q.explanation}
          </div>
        )}
        <div className="flex gap-2 mt-3">
          <button
            type="button"
            onClick={prev}
            className={`px-3 py-1.5 rounded text-sm font-semibold ${
              dark ? 'bg-slate-700 hover:bg-slate-600 text-slate-100' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
            }`}
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={next}
            className="ml-auto px-4 py-1.5 rounded text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

// Inline SVG chart renderer for the Chart Practice tab.
// Coordinates: Q on x-axis (0..10), P on y-axis (0..10).
function SDChart({ spec, dark }) {
  const W = 360;
  const H = 280;
  const PAD_L = 40;
  const PAD_B = 32;
  const PAD_R = 12;
  const PAD_T = 12;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const scaleX = (q) => PAD_L + (q / 10) * innerW;
  const scaleY = (p) => PAD_T + innerH - (p / 10) * innerH;

  const axis = dark ? '#94a3b8' : '#475569';
  const text = dark ? '#e2e8f0' : '#1e293b';
  const dColor = '#3b82f6';
  const sColor = '#ef4444';
  const dColor2 = '#60a5fa';
  const sColor2 = '#fb7185';

  // Demand line: P = dIntercept - Q  →  goes from (0, dIntercept) to (dIntercept, 0)
  // Supply line: P = sIntercept + Q  →  goes from (0, sIntercept) to (10, sIntercept + 10)
  const dInt = spec.dIntercept ?? 10;
  const sInt = spec.sIntercept ?? 0;

  const eqQ = (dInt - sInt) / 2;
  const eqP = eqQ + sInt;

  const lines = [];
  lines.push(
    <line
      key="d"
      x1={scaleX(0)}
      y1={scaleY(dInt)}
      x2={scaleX(Math.min(dInt, 10))}
      y2={scaleY(Math.max(dInt - 10, 0))}
      stroke={dColor}
      strokeWidth="2.5"
    />,
  );
  lines.push(
    <line
      key="s"
      x1={scaleX(0)}
      y1={scaleY(sInt)}
      x2={scaleX(10)}
      y2={scaleY(Math.min(sInt + 10, 10))}
      stroke={sColor}
      strokeWidth="2.5"
    />,
  );

  if (spec.type === 'sd-shift') {
    if (spec.curve === 'demand') {
      const newD = dInt + (spec.shift || 0);
      lines.push(
        <line
          key="d2"
          x1={scaleX(0)}
          y1={scaleY(newD)}
          x2={scaleX(Math.min(newD, 10))}
          y2={scaleY(Math.max(newD - 10, 0))}
          stroke={dColor2}
          strokeWidth="2.5"
          strokeDasharray="6 4"
        />,
      );
    } else {
      const newS = sInt + (spec.shift || 0);
      lines.push(
        <line
          key="s2"
          x1={scaleX(0)}
          y1={scaleY(newS)}
          x2={scaleX(10)}
          y2={scaleY(Math.min(newS + 10, 10))}
          stroke={sColor2}
          strokeWidth="2.5"
          strokeDasharray="6 4"
        />,
      );
    }
  }

  if (spec.type === 'price-change') {
    lines.push(
      <line
        key="ph"
        x1={scaleX(0)}
        y1={scaleY(spec.pricedAt)}
        x2={scaleX(10)}
        y2={scaleY(spec.pricedAt)}
        stroke={dark ? '#fbbf24' : '#d97706'}
        strokeWidth="2"
        strokeDasharray="4 3"
      />,
    );
  }

  // Equilibrium dot for baseline / reading
  lines.push(<circle key="eq" cx={scaleX(eqQ)} cy={scaleY(eqP)} r="4" fill="#22c55e" />);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md">
      {/* axes */}
      <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} stroke={axis} strokeWidth="1.5" />
      <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke={axis} strokeWidth="1.5" />
      {/* gridlines */}
      {[2, 4, 6, 8, 10].map((g) => (
        <g key={g}>
          <line x1={scaleX(g)} y1={PAD_T} x2={scaleX(g)} y2={H - PAD_B} stroke={axis} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" />
          <line x1={PAD_L} y1={scaleY(g)} x2={W - PAD_R} y2={scaleY(g)} stroke={axis} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" />
          <text x={scaleX(g)} y={H - PAD_B + 14} fontSize="10" fill={text} textAnchor="middle">{g}</text>
          <text x={PAD_L - 6} y={scaleY(g) + 3} fontSize="10" fill={text} textAnchor="end">{g}</text>
        </g>
      ))}
      <text x={W / 2} y={H - 4} fontSize="11" fill={text} textAnchor="middle">Quantity</text>
      <text x={10} y={PAD_T + 8} fontSize="11" fill={text}>Price ($)</text>
      {lines}
      {/* legend */}
      <g transform={`translate(${W - 90}, ${PAD_T + 6})`}>
        <line x1="0" y1="6" x2="14" y2="6" stroke={dColor} strokeWidth="2.5" />
        <text x="18" y="10" fontSize="10" fill={text}>Demand</text>
        <line x1="0" y1="22" x2="14" y2="22" stroke={sColor} strokeWidth="2.5" />
        <text x="18" y="26" fontSize="10" fill={text}>Supply</text>
        {spec.type === 'sd-shift' && (
          <>
            <line x1="0" y1="38" x2="14" y2="38" stroke={spec.curve === 'demand' ? dColor2 : sColor2} strokeWidth="2.5" strokeDasharray="6 4" />
            <text x="18" y="42" fontSize="10" fill={text}>{spec.curve === 'demand' ? "Demand'" : "Supply'"}</text>
          </>
        )}
      </g>
    </svg>
  );
}

