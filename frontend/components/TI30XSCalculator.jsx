import React, { useState, useRef, useEffect } from 'react';

export function TI30XSCalculator({ onClose }) {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(null);
  const [isRadians, setIsRadians] = useState(false);
  const [opacity, setOpacity] = useState(1.0);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0 });
  const calcRef = useRef(null);

  const handlePress = (val) => {
    setDisplay((prev) => {
      if (prev === '0' || prev === 'Error') return val;
      return prev + val;
    });
  };

  const handleClear = () => {
    setDisplay('0');
  };

  const handleDelete = () => {
    setDisplay((prev) => {
      if (prev.length <= 1 || prev === 'Error') return '0';
      return prev.slice(0, -1);
    });
  };

  const handleEval = () => {
    try {
      // Basic evaluation - in a real app, use a math parser library
      // Replace visual symbols with JS operators
      let expr = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**');

      // eslint-disable-next-line no-eval
      const result = eval(expr);
      setDisplay(String(result).slice(0, 12)); // Limit length
    } catch (e) {
      setDisplay('Error');
    }
  };

  const handleSqrt = () => {
    setDisplay((prev) => {
      if (prev === '0') return '√(';
      return prev + '√(';
    });
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.calc-opacity-control, .calc-btn')) return;
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX - position.x,
      startY: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragRef.current.startX,
        y: e.clientY - dragRef.current.startY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="ti-30xs-shell fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-30 p-4">
      <div
        ref={calcRef}
        className={`calc-draggable relative w-72 rounded-xl shadow-2xl border-2 border-slate-600 bg-slate-800 p-4 font-sans ${
          isDragging ? 'dragging' : ''
        }`}
        style={{
          left: position.x,
          top: position.y,
          opacity: opacity,
          cursor: isDragging ? 'grabbing' : 'move',
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Header / Solar Panel */}
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs text-slate-400 font-bold tracking-widest">
            TI-30XS MultiView
          </div>
          <div
            className="w-16 h-4 bg-slate-700 rounded-sm border border-slate-600 opacity-80"
            title="Solar Panel"
          ></div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* Opacity Control */}
        <div className="calc-opacity-control mb-3">
          <label className="text-xs text-slate-300">Opacity:</label>
          <input
            type="range"
            min="0.5"
            max="1"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="calc-opacity-slider"
          />
        </div>

        {/* Screen */}
        <div className="calc-screen mb-4 p-2 rounded bg-[#c8dcc8] font-mono text-right text-2xl text-slate-900 shadow-inner h-16 flex items-end justify-end overflow-hidden border-4 border-slate-700">
          {display}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1: Special Functions */}
          <button
            className="calc-btn gray text-xs"
            onClick={() => setIsRadians(!isRadians)}
          >
            {isRadians ? 'RAD' : 'DEG'}
          </button>
          <button className="calc-btn gray text-xs" onClick={() => {}}>
            mode
          </button>
          <button className="calc-btn gray text-xs" onClick={handleDelete}>
            delete
          </button>
          <button
            className="calc-btn red text-xs font-bold"
            onClick={handleClear}
          >
            on/clear
          </button>

          {/* Row 2 */}
          <button className="calc-btn gray" onClick={() => handlePress('(')}>
            (
          </button>
          <button className="calc-btn gray" onClick={() => handlePress(')')}>
            )
          </button>
          <button className="calc-btn gray" onClick={handleSqrt}>
            √
          </button>
          <button className="calc-btn gray" onClick={() => handlePress('^')}>
            ^
          </button>

          {/* Row 3 */}
          <button className="calc-btn white" onClick={() => handlePress('7')}>
            7
          </button>
          <button className="calc-btn white" onClick={() => handlePress('8')}>
            8
          </button>
          <button className="calc-btn white" onClick={() => handlePress('9')}>
            9
          </button>
          <button className="calc-btn gray" onClick={() => handlePress('÷')}>
            ÷
          </button>

          {/* Row 4 */}
          <button className="calc-btn white" onClick={() => handlePress('4')}>
            4
          </button>
          <button className="calc-btn white" onClick={() => handlePress('5')}>
            5
          </button>
          <button className="calc-btn white" onClick={() => handlePress('6')}>
            6
          </button>
          <button className="calc-btn gray" onClick={() => handlePress('×')}>
            ×
          </button>

          {/* Row 5 */}
          <button className="calc-btn white" onClick={() => handlePress('1')}>
            1
          </button>
          <button className="calc-btn white" onClick={() => handlePress('2')}>
            2
          </button>
          <button className="calc-btn white" onClick={() => handlePress('3')}>
            3
          </button>
          <button className="calc-btn gray" onClick={() => handlePress('-')}>
            -
          </button>

          {/* Row 6 */}
          <button className="calc-btn white" onClick={() => handlePress('0')}>
            0
          </button>
          <button className="calc-btn white" onClick={() => handlePress('.')}>
            .
          </button>
          <button className="calc-btn white" onClick={() => handlePress('π')}>
            π
          </button>
          <button className="calc-btn gray" onClick={handleEval}>
            enter
          </button>
        </div>
      </div>
    </div>
  );
}

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.TI30XSCalculator = TI30XSCalculator;
}
