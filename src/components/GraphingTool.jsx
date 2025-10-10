import React, { useEffect, useRef, useState } from 'react';
import JXG from 'jsxgraph';

export default function GraphingTool({ onExit = () => {} }) {
    const boardRef = useRef(null);
    const boardInstance = useRef(null);
    const [toolMode, setToolMode] = useState('plotLine');
    const [equationInput, setEquationInput] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!boardInstance.current && boardRef.current) {
            boardInstance.current = JXG.JSXGraph.initBoard(boardRef.current.id || 'graphing-tool-board', {
                boundingbox: [-10, 10, 10, -10],
                axis: true,
                grid: true,
                showCopyright: false
            });

            boardInstance.current.on('up', function(e) {
                if (toolMode === 'plotPoint') {
                    const coords = boardInstance.current.getUsrCoordsOfMouse(e);
                    const x = Math.round(coords[0]);
                    const y = Math.round(coords[1]);
                    boardInstance.current.create('point', [x, y], { name: `(${x}, ${y})`, size: 4 });
                }
            });
        }
    }, [toolMode]);

    const handlePlot = () => {
        setError('');
        if (toolMode !== 'plotLine') return;

        try {
            const preparedInput = equationInput.toLowerCase().replace(/\s/g, '');
            const parts = preparedInput.match(/^(-?\d*\.?\d*)x([+-]\d+\.?\d*)?$/);
            if (!parts) throw new Error("Use 'mx+b' format, e.g., '3x-4'.");

            const m = parts[1] === '-' ? -1 : (parts[1] === '' ? 1 : parseFloat(parts[1]));
            const b = parts[2] ? parseFloat(parts[2]) : 0;
            if(isNaN(m) || isNaN(b)) throw new Error("Invalid number format.");

            const func = (x) => m * x + b;
            boardInstance.current.create('functiongraph', [func], { strokeColor: '#3b82f6', strokeWidth: 3 });
        } catch (e) {
            setError(e.message || "Could not plot equation.");
        }
    };

    const handleClear = () => {
        const board = boardInstance.current;
        if (!board) return;
        board.suspendUpdate();
        const allObjects = Object.values(board.objects || {});
        for(let i = allObjects.length - 1; i >= 0; i--) {
            if (allObjects[i].elType === 'functiongraph' || allObjects[i].elType === 'point') {
                board.removeObject(allObjects[i]);
            }
        }
        board.unsuspendUpdate();
        setError('');
    };

    return (
        <div className="fade-in">
             <header className="flex justify-between items-center pb-4 mb-4 border-b">
                 <button onClick={onExit} className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600 font-semibold">Back</button>
                 <h2 className="text-xl font-bold text-center text-slate-800">Interactive Graphing Tool</h2>
                 <div></div>
            </header>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-grow">
                     <div id="graphing-tool-board" ref={boardRef} className="jxgbox" style={{ width: '100%', height: '400px' }}></div>
                </div>
                <div className="md:w-64 flex-shrink-0">
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">Tools</h3>
                    <div className="flex gap-2 mb-4">
                        <button onClick={() => setToolMode('plotLine')} className={`flex-1 p-2 font-semibold rounded-md transition ${toolMode === 'plotLine' ? 'bg-sky-600 text-white' : 'bg-slate-200 hover:bg-slate-300'}`}>Plot Line</button>
                        <button onClick={() => setToolMode('plotPoint')} className={`flex-1 p-2 font-semibold rounded-md transition ${toolMode === 'plotPoint' ? 'bg-sky-600 text-white' : 'bg-slate-200 hover:bg-slate-300'}`}>Plot Point</button>
                    </div>

                    {toolMode === 'plotLine' ? (
                        <div>
                            <input value={equationInput} onChange={(e) => setEquationInput(e.target.value)} className="w-full p-2 border rounded mb-2" />
                            <button onClick={handlePlot} className="w-full p-2 bg-sky-600 text-white rounded mb-2">Plot</button>
                        </div>
                    ) : (
                        <div>
                            <p className="text-sm text-slate-500">Click on the board to plot points.</p>
                        </div>
                    )}
                    <button onClick={handleClear} className="w-full p-2 mt-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition">Clear All</button>
                    {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
                </div>
            </div>
        </div>
    );
}
