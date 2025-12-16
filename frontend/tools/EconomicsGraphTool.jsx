import React, { useState, useEffect, useRef } from 'react';
import { SCENARIOS } from '../data/economics/econ_scenarios.js';

export default function EconomicsGraphTool({ onExit }) {
  const boardRef = useRef(null);
  const boardInstance = useRef(null);
  const initialized = useRef(false);

  const [trainingMode, setTrainingMode] = useState(false);
  const [stepAffect, setStepAffect] = useState(null); // 'supply' | 'demand'
  const [stepDirection, setStepDirection] = useState(null); // 'increase' | 'decrease'

  const [demandShift, setDemandShift] = useState(0); // -4 to 4
  const [supplyShift, setSupplyShift] = useState(0); // -4 to 4
  const [equilibrium, setEquilibrium] = useState({ p: 5, q: 5 });

  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const scenario = SCENARIOS[activeScenarioIdx];
  const [premadeFeedback, setPremadeFeedback] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  const checkPremadeAnswer = (idx) => {
    const opts = [
      'Price decreases; Quantity increases',
      'Price increases; Quantity decreases',
      'Price increases; Quantity increases',
      'Price decreases; Quantity decreases',
    ];
    const correct =
      scenario.affect === 'supply' && scenario.direction === 'increase'
        ? idx === 0
        : null;
    if (correct === null) {
      // generic: demand increase => price up, quantity up; demand decrease => price down, quantity down
      // supply increase => price down, quantity up; supply decrease => price up, quantity down
      const mapping = {
        demand_increase: 2,
        demand_decrease: 3,
        supply_increase: 0,
        supply_decrease: 1,
      };
      const key = `${scenario.affect}_${scenario.direction}`;
      const correctIdx = mapping[key];
      setPremadeFeedback(
        idx === correctIdx
          ? 'Correct!'
          : 'Not quite. Try adjusting the curve to match the concept.'
      );
    } else {
      setPremadeFeedback(
        correct
          ? 'Correct!'
          : 'Not quite. Try moving the supply slider right and observe equilibrium.'
      );
    }
  };

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
    <div className="fade-in min-h-screen bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 p-6">
      <header className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4 mb-6">
        <button
          onClick={onExit}
          className="text-sm font-semibold text-sky-600 hover:text-sky-700"
        >
          ← Back to Social Studies
        </button>
        <h2 className="text-2xl font-bold">
          Market Simulator — Supply & Demand Trainer
        </h2>
        <div className="w-16"></div>
      </header>

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

          {/* Scenario Trainer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-600 rounded-xl text-sm text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold">Scenario Trainer</p>
              <select
                className="text-sm bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded px-2 py-1"
                value={activeScenarioIdx}
                onChange={(e) => setActiveScenarioIdx(Number(e.target.value))}
              >
                {SCENARIOS.map((s, i) => (
                  <option key={s.id} value={i}>
                    {s.id} — {s.difficulty}
                  </option>
                ))}
              </select>
            </div>
            <p className="mb-2">{scenario.prompt}</p>
            <div className="grid grid-cols-1 gap-2">
              {[
                'Price decreases; Quantity increases',
                'Price increases; Quantity decreases',
                'Price increases; Quantity increases',
                'Price decreases; Quantity decreases',
              ].map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setShowExplanation(false);
                    checkPremadeAnswer(idx);
                  }}
                  className="rounded-md px-3 py-2 text-left transition bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  {String.fromCharCode(65 + idx)}. {opt}
                </button>
              ))}
            </div>
            {premadeFeedback && (
              <div className="mt-2 p-2 rounded-md bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-200">
                {premadeFeedback}
              </div>
            )}
            <div className="mt-2 flex items-center gap-2">
              <button
                className="text-xs px-2 py-1 rounded bg-slate-200 dark:bg-slate-700"
                onClick={() => setShowExplanation((v) => !v)}
              >
                Show Explanation
              </button>
            </div>
            {showExplanation && (
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                Explanation: {scenario.explanation}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
