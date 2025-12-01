import React, { useState, useRef, useEffect } from 'react';

export function TI30XSCalculator({ onClose }) {
  const [display, setDisplay] = useState('0');
  const [cursor, setCursor] = useState(0);
  const [inFraction, setInFraction] = useState(false);
  const [fractionPart, setFractionPart] = useState('numerator'); // 'numerator' | 'denominator'
  const [memory, setMemory] = useState(null);
  const [isRadians, setIsRadians] = useState(false);
  const [opacity, setOpacity] = useState(1.0);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0 });
  const calcRef = useRef(null);

  // Handle cursor movement
  const moveCursor = (direction) => {
    if (direction === 'left') {
      setCursor((prev) => Math.max(0, prev - 1));
    } else if (direction === 'right') {
      setCursor((prev) => Math.min(display.length, prev + 1));
    }
  };

  // Insert at cursor position
  const insertAtCursor = (val) => {
    setDisplay((prev) => {
      if (prev === '0' || prev === 'Error') {
        setCursor(val.length);
        return val;
      }
      const before = prev.slice(0, cursor);
      const after = prev.slice(cursor);
      setCursor(cursor + val.length);
      return before + val + after;
    });
  };

  const handlePress = (val) => {
    insertAtCursor(val);
  };

  const handleClearAll = () => {
    setDisplay('0');
    setCursor(0);
    setInFraction(false);
    setFractionPart('numerator');
  };

  const handleDelete = () => {
    if (cursor === 0) return;

    setDisplay((prev) => {
      if (prev.length <= 1 || prev === 'Error') {
        setCursor(0);
        return '0';
      }
      const before = prev.slice(0, cursor - 1);
      const after = prev.slice(cursor);
      setCursor(cursor - 1);
      return before + after;
    });
  };

  const handleFraction = () => {
    if (inFraction) {
      // Exit fraction mode
      insertAtCursor(')');
      setInFraction(false);
      setFractionPart('numerator');
    } else {
      // Enter fraction mode
      insertAtCursor('(');
      setInFraction(true);
      setFractionPart('numerator');
    }
  };

  const handleFractionBar = () => {
    if (inFraction && fractionPart === 'numerator') {
      insertAtCursor('/');
      setFractionPart('denominator');
    }
  };

  const handleEval = () => {
    try {
      // Replace visual symbols with JS operators
      let expr = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**');

      // eslint-disable-next-line no-eval
      const result = eval(expr);
      const resultStr = String(result).slice(0, 12);
      setDisplay(resultStr);
      setCursor(resultStr.length);
      setInFraction(false);
      setFractionPart('numerator');
    } catch (e) {
      setDisplay('Error');
      setCursor(5);
    }
  };

  const handleSqrt = () => {
    insertAtCursor('√(');
  };

  const handleMemoryAdd = () => {
    try {
      let expr = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/\^/g, '**');
      // eslint-disable-next-line no-eval
      const val = eval(expr);
      setMemory((prev) => (prev || 0) + val);
    } catch (e) {
      // Silent fail
    }
  };

  const handleMemoryRecall = () => {
    if (memory !== null) {
      const memStr = String(memory);
      insertAtCursor(memStr);
    }
  };

  const handleMemoryClear = () => {
    setMemory(null);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveCursor('left');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveCursor('right');
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleEval();
      } else if (e.key === 'Delete') {
        e.preventDefault();
        handleDelete();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        handlePress(e.key);
      } else if (['+', '-', '*', '/', '(', ')', '.'].includes(e.key)) {
        e.preventDefault();
        if (e.key === '*') handlePress('×');
        else if (e.key === '/') handlePress('÷');
        else handlePress(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cursor, display, inFraction]);

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

  // Render display with cursor
  const renderDisplay = () => {
    if (display === '0' || display === 'Error') {
      return display;
    }

    const before = display.slice(0, cursor);
    const after = display.slice(cursor);

    return (
      <>
        {before}
        <span className="inline-block w-0.5 h-6 bg-slate-900 animate-pulse">
          |
        </span>
        {after}
      </>
    );
  };

  return (
    <div className="ti-30xs-shell fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-30 p-4">
      <div
        ref={calcRef}
        className={`calc-draggable relative w-80 rounded-xl shadow-2xl border-2 border-slate-600 bg-slate-800 p-4 font-sans ${
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
            TI-30XS MultiView™
          </div>
          <div
            className="w-16 h-4 bg-slate-700 rounded-sm border border-slate-600 opacity-80"
            title="Solar Panel"
          ></div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold"
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Opacity Control */}
        <div className="calc-opacity-control mb-3 flex items-center gap-2">
          <label className="text-xs text-slate-300">Opacity:</label>
          <input
            type="range"
            min="0.5"
            max="1"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="calc-opacity-slider flex-1"
          />
        </div>

        {/* Memory Indicator */}
        {memory !== null && (
          <div className="text-xs text-slate-300 mb-1">
            Memory: {memory.toFixed(4)}
          </div>
        )}

        {/* Screen */}
        <div className="calc-screen mb-4 p-2 rounded bg-[#c8dcc8] font-mono text-right text-xl text-slate-900 shadow-inner h-20 flex items-end justify-end overflow-x-auto overflow-y-hidden border-4 border-slate-700">
          {renderDisplay()}
        </div>

        {/* Mode Indicators */}
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>{isRadians ? 'RAD' : 'DEG'}</span>
          {inFraction && (
            <span className="text-blue-400">
              FRAC: {fractionPart === 'numerator' ? 'NUM' : 'DEN'}
            </span>
          )}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-5 gap-1.5">
          {/* Row 1: Top Functions */}
          <button
            className="calc-btn gray text-xs"
            onClick={() => setIsRadians(!isRadians)}
            title="Toggle Radians/Degrees"
          >
            {isRadians ? 'RAD' : 'DEG'}
          </button>
          <button
            className="calc-btn gray text-xs"
            onClick={handleFraction}
            title="Fraction Mode"
          >
            n/d
          </button>
          <button
            className="calc-btn gray text-xs"
            onClick={() => moveCursor('left')}
            title="Move Cursor Left"
          >
            ←
          </button>
          <button
            className="calc-btn gray text-xs"
            onClick={() => moveCursor('right')}
            title="Move Cursor Right"
          >
            →
          </button>
          <button
            className="calc-btn red text-xs font-bold"
            onClick={handleClearAll}
            title="Clear All"
          >
            clear
          </button>

          {/* Row 2: Memory & Special */}
          <button
            className="calc-btn gray text-xs"
            onClick={handleMemoryAdd}
            title="Memory Add (M+)"
          >
            M+
          </button>
          <button
            className="calc-btn gray text-xs"
            onClick={handleMemoryRecall}
            title="Memory Recall (MR)"
          >
            MR
          </button>
          <button
            className="calc-btn gray text-xs"
            onClick={handleMemoryClear}
            title="Memory Clear (MC)"
          >
            MC
          </button>
          <button
            className="calc-btn gray text-xs"
            onClick={handleDelete}
            title="Delete (Backspace)"
          >
            DEL
          </button>
          <button
            className="calc-btn gray"
            onClick={() => handlePress('^')}
            title="Exponent"
          >
            x^y
          </button>

          {/* Row 3: Functions */}
          <button className="calc-btn gray" onClick={() => handlePress('(')}>
            (
          </button>
          <button className="calc-btn gray" onClick={() => handlePress(')')}>
            )
          </button>
          <button className="calc-btn gray" onClick={handleSqrt}>
            √
          </button>
          <button
            className="calc-btn gray"
            onClick={handleFractionBar}
            title="Fraction Bar"
          >
            ─
          </button>
          <button className="calc-btn gray" onClick={() => handlePress('π')}>
            π
          </button>

          {/* Row 4-6: Number Pad */}
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
          <button className="calc-btn gray row-span-2" onClick={handleEval}>
            enter
          </button>

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
            −
          </button>
          <button
            className="calc-btn gray row-span-2"
            onClick={() => handlePress('+')}
          >
            +
          </button>

          <button
            className="calc-btn white col-span-2"
            onClick={() => handlePress('0')}
          >
            0
          </button>
          <button className="calc-btn white" onClick={() => handlePress('.')}>
            .
          </button>
          <button className="calc-btn gray" onClick={() => handlePress('(-)')}>
            (−)
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-3 text-xs text-slate-400 text-center">
          Use arrow keys ←→ to move cursor • Esc to close
        </div>
      </div>
    </div>
  );
}

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.TI30XSCalculator = TI30XSCalculator;
}
