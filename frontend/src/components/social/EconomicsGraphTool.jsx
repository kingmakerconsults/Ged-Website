import React, { useState, useEffect, useRef } from 'react';

function EconomicsGraphTool({ onExit }) {
  const boardRef = useRef(null);
  const boardInstance = useRef(null);

  // State for shifting curves
  const [demandShift, setDemandShift] = useState(0); // -4 to 4
  const [supplyShift, setSupplyShift] = useState(0); // -4 to 4

  // Price/Quantity readout
  const [equilibrium, setEquilibrium] = useState({ p: 5, q: 5 });

  // Premade practice question that leverages the live tool state
  const premadeQuestion = {
    stem: 'A new technology lowers production costs across the industry. Using the tool, determine the likely effect on equilibrium price and quantity.',
    choices: [
      'Price decreases; Quantity increases',
      'Price increases; Quantity decreases',
      'Price increases; Quantity increases',
      'Price decreases; Quantity decreases',
    ],
    rationale:
      'Lower production costs shift the supply curve right (increase supply). This typically lowers price and increases quantity.',
  };
  const [premadeFeedback, setPremadeFeedback] = useState('');
  const checkPremadeAnswer = (idx) => {
    // Correct choice index 0 corresponds to supply shifting right
    const correct = idx === 0;
    setPremadeFeedback(
      correct
        ? 'Correct! Increased supply lowers price and raises quantity.'
        : 'Not quite. Try moving the supply slider right and observe how the equilibrium changes.'
    );
  };

  useEffect(() => {
    if (!boardRef.current || !window.JXG) return;

    // Initialize board
    const board = window.JXG.JSXGraph.initBoard(boardRef.current.id, {
      boundingbox: [-1, 12, 12, -1],
      axis: false,
      showCopyright: false,
      showNavigation: false,
      keepAspectRatio: true,
      pan: { enabled: false },
      zoom: { enabled: false },
    });

    // Disable dragging/panning by intercepting mouse events
    board.on('down', () => false);
    board.on('move', () => false);
    board.on('up', () => false);

    // Create axes with labels (fixed, non-interactive)
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
      }
    );

    boardInstance.current = board;

    return () => {
      if (boardInstance.current) {
        window.JXG.JSXGraph.freeBoard(boardInstance.current);
      }
    };
  }, []);

  // Update graph when sliders change
  useEffect(() => {
    const board = boardInstance.current;
    if (!board) return;

    board.suspendUpdate();

    // Define curves based on shifts
    // Demand: P = -Q + 10 + demandShift
    // Supply: P = Q + supplyShift

    const d_intercept = 10 + demandShift;
    const s_intercept = 0 + supplyShift;

    // Calculate Intersection (Equilibrium)
    // -Q + d_int = Q + s_int  =>  2Q = d_int - s_int => Q = (d - s)/2
    const eq_Q = (d_intercept - s_intercept) / 2;
    const eq_P = eq_Q + s_intercept;

    setEquilibrium({ p: eq_P, q: eq_Q });

    // Remove old curves and points (keep axes)
    if (board.objectsList) {
      board.objectsList.forEach((el) => {
        if (
          (el.elType === 'line' ||
            el.elType === 'point' ||
            el.elType === 'text') &&
          el.name !== 'Quantity' &&
          el.name !== 'Price'
        ) {
          board.removeObject(el);
        }
      });
    }

    // Draw Demand (Downward sloping, fixed)
    // P1: (0, d_intercept), P2: (10, d_intercept - 10)
    board.create(
      'line',
      [
        [0, d_intercept],
        [10, d_intercept - 10],
      ],
      {
        strokeColor: '#2563eb',
        strokeWidth: 3,
        name: 'Demand',
        withLabel: true,
        label: { position: 'top', offset: [10, 10] },
        fixed: true,
        highlight: false,
      }
    );

    // Draw Supply (Upward sloping, fixed)
    // P1: (0, s_intercept), P2: (10, 10 + s_intercept)
    board.create(
      'line',
      [
        [0, s_intercept],
        [10, 10 + s_intercept],
      ],
      {
        strokeColor: '#dc2626',
        strokeWidth: 3,
        name: 'Supply',
        withLabel: true,
        label: { position: 'top', offset: [10, -10] },
        fixed: true,
        highlight: false,
      }
    );

    // Draw Equilibrium Point
    board.create('point', [eq_Q, eq_P], {
      name: '',
      face: 'o',
      size: 5,
      strokeColor: '#16a34a',
      fillColor: '#16a34a',
      fixed: true,
      highlight: false,
    });

    // Dashed lines to axes
    board.create(
      'segment',
      [
        [eq_Q, 0],
        [eq_Q, eq_P],
      ],
      {
        strokeColor: '#666',
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
        strokeColor: '#666',
        dash: 2,
        strokeWidth: 1,
        fixed: true,
        highlight: false,
      }
    );

    board.unsuspendUpdate();
  }, [demandShift, supplyShift]);

  return (
    <div className="fade-in min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6">
      <header className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4 mb-6">
        <button
          onClick={onExit}
          className="text-sm font-semibold text-sky-600 hover:text-sky-700"
        >
          ← Back to Dashboard
        </button>
        <h2 className="text-2xl font-bold">
          Economics Simulator: Supply & Demand
        </h2>
        <div className="w-16"></div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Graph Container */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-[500px] relative">
          <div
            id="econ-board"
            ref={boardRef}
            className="jxgbox w-full h-full"
            style={{ width: '100%', height: '100%' }}
          />
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 p-3 rounded-lg border border-slate-200 dark:border-slate-600 shadow text-sm">
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

        {/* Controls */}
        <div className="w-full lg:w-80 space-y-6">
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

          {/* Practice Questions tied to current equilibrium */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm text-slate-600 dark:text-slate-300">
            <p className="mb-2 font-semibold">Practice</p>
            <div className="space-y-3">
              <div>
                <p className="mb-1">
                  If demand increases (shift right), what happens to equilibrium
                  price and quantity?
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    'Price up, Quantity up',
                    'Price down, Quantity down',
                    'Price up, Quantity down',
                  ].map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        alert(
                          idx === 0
                            ? 'Correct!'
                            : 'Not quite. Demand right typically raises price and quantity.'
                        )
                      }
                      className={`rounded-md px-3 py-2 text-left transition ${
                        idx === 0
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40'
                          : 'bg-slate-100 dark:bg-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1">
                  Move the sliders so Quantity equals{' '}
                  {Math.round(equilibrium.q)} and Price equals $
                  {equilibrium.p.toFixed(2)}. What shift achieves this?
                </p>
                <p className="text-xs">
                  Hint: Demand slider changes the intercept of the demand curve;
                  Supply slider changes the intercept of the supply curve.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <p className="mb-2 font-semibold">Premade Question</p>
                <p className="mb-2">{premadeQuestion.stem}</p>
                <div className="grid grid-cols-1 gap-2">
                  {premadeQuestion.choices.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => checkPremadeAnswer(idx)}
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
                <p className="mt-2 text-xs text-muted">
                  Explanation: {premadeQuestion.rationale}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EconomicsGraphTool;
