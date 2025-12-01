import React, { useState, useEffect, useRef } from 'react';

function EconomicsGraphTool({ onExit }) {
  const boardRef = useRef(null);
  const boardInstance = useRef(null);
  
  // State for shifting curves
  const [demandShift, setDemandShift] = useState(0); // -4 to 4
  const [supplyShift, setSupplyShift] = useState(0); // -4 to 4
  
  // Price/Quantity readout
  const [equilibrium, setEquilibrium] = useState({ p: 5, q: 5 });

  useEffect(() => {
    if (!boardRef.current || !window.JXG) return;

    // Initialize board
    const board = window.JXG.JSXGraph.initBoard(boardRef.current.id, { 
      boundingbox: [-1, 12, 12, -1], 
      axis: true, 
      showCopyright: false,
      showNavigation: false
    });
    
    // Create axes with labels
    board.create('axis', [[0, 0], [1, 0]], { 
      name: 'Quantity', 
      withLabel: true, 
      label: { position: 'rt', offset: [-10, 10] }
    });
    
    board.create('axis', [[0, 0], [0, 1]], { 
      name: 'Price', 
      withLabel: true, 
      label: { position: 'rt', offset: [-20, 0] }
    });

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
      const idsToRemove = [];
      board.objectsList.forEach(el => {
        if ((el.elType === 'line' || el.elType === 'point' || el.elType === 'text') &&
            el.name !== 'Quantity' && el.name !== 'Price') {
          idsToRemove.push(el);
        }
      });
      board.removeObject(idsToRemove);
    }

    // Draw Demand (Downward sloping)
    // P1: (0, d_intercept), P2: (10, d_intercept - 10)
    board.create('line', [[0, d_intercept], [10, d_intercept - 10]], { 
      strokeColor: '#2563eb', 
      strokeWidth: 3, 
      name: 'Demand', 
      withLabel: true, 
      label: { position: 'top', offset: [10, 10] }
    });

    // Draw Supply (Upward sloping)
    // P1: (0, s_intercept), P2: (10, 10 + s_intercept)
    board.create('line', [[0, s_intercept], [10, 10 + s_intercept]], { 
      strokeColor: '#dc2626', 
      strokeWidth: 3, 
      name: 'Supply', 
      withLabel: true,
      label: { position: 'top', offset: [10, -10] }
    });

    // Draw Equilibrium Point
    board.create('point', [eq_Q, eq_P], { 
      name: '', 
      face: 'o', 
      size: 5, 
      strokeColor: '#16a34a', 
      fillColor: '#16a34a', 
      fixed: true 
    });
    
    // Dashed lines to axes
    board.create('segment', [[eq_Q, 0], [eq_Q, eq_P]], { 
      strokeColor: '#666', 
      dash: 2, 
      strokeWidth: 1 
    });
    
    board.create('segment', [[0, eq_P], [eq_Q, eq_P]], { 
      strokeColor: '#666', 
      dash: 2, 
      strokeWidth: 1 
    });

    board.unsuspendUpdate();

  }, [demandShift, supplyShift]);

  return (
    <div className="fade-in min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6">
      <header className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4 mb-6">
        <button onClick={onExit} className="text-sm font-semibold text-sky-600 hover:text-sky-700">
          ← Back to Dashboard
        </button>
        <h2 className="text-2xl font-bold">Economics Simulator: Supply & Demand</h2>
        <div className="w-16"></div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Graph Container */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-[500px] relative">
          <div id="econ-board" ref={boardRef} className="w-full h-full" />
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 p-3 rounded-lg border border-slate-200 dark:border-slate-600 shadow text-sm">
            <div className="font-bold text-slate-500 uppercase text-xs">Equilibrium</div>
            <div className="text-emerald-600 font-mono text-lg">Price: ${equilibrium.p.toFixed(2)}</div>
            <div className="text-emerald-600 font-mono text-lg">Quantity: {equilibrium.q.toFixed(0)} units</div>
          </div>
        </div>

        {/* Controls */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Demand Controls */}
          <div className="p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl">
            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-1">Demand Factors</h3>
            <p className="text-xs text-blue-600 dark:text-blue-400 mb-4">
              Examples: Consumer income, trends, population.
            </p>
            
            <label className="block text-sm font-medium mb-2">Shift Demand Curve</label>
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
            <h3 className="font-bold text-red-800 dark:text-red-300 mb-1">Supply Factors</h3>
            <p className="text-xs text-red-600 dark:text-red-400 mb-4">
              Examples: Technology, cost of inputs, taxes.
            </p>
            
            <label className="block text-sm font-medium mb-2">Shift Supply Curve</label>
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
              <span>Increase Supply<br />(Lower Cost)</span>
              <span>Decrease Supply<br />(Higher Cost)</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm text-slate-600 dark:text-slate-300">
            <p className="mb-2"><strong>Try this:</strong></p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Increase <strong>Demand</strong> (right) to see Price and Quantity both go up.</li>
              <li>Increase <strong>Supply</strong> (left slider) to see Price go down while Quantity goes up.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EconomicsGraphTool;
