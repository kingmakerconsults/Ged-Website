import React, { useState, useRef, useEffect } from 'react';

export function TI30XSCalculator({ onClose }) {
  // --- State ---
  const [history, setHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [result, setResult] = useState('');
  const [isSecond, setIsSecond] = useState(false);
  const [isDegrees, setIsDegrees] = useState(true);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [opacity, setOpacity] = useState(1.0);
  const dragStart = useRef({ x: 0, y: 0 });

  // --- Drag Logic ---
  const handleMouseDown = (e) => {
    // Only drag if clicking the shell, not buttons or controls
    if (e.target.tagName === 'BUTTON' || e.target.closest('.calc-opacity-control')) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // --- Calculator Logic ---
  const handlePress = (val) => {
    if (result !== '') {
      // If we have a result and press an operator, continue with result
      if (['+', '-', '×', '÷', '^'].includes(val)) {
        setCurrentInput(result + val);
      } else {
        setCurrentInput(val);
      }
      setResult('');
    } else {
      setCurrentInput((prev) => prev + val);
    }
  };

  const handleClear = () => {
    setCurrentInput('');
    setResult('');
    if (currentInput === '' && result === '') {
      setHistory([]);
    }
  };

  const handleDelete = () => {
    setCurrentInput((prev) => prev.slice(0, -1));
  };

  const handleEnter = () => {
    if (!currentInput) return;

    try {
      // Replace visual symbols with JS operators
      let expr = currentInput
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/√/g, 'Math.sqrt');

      // Handle trig functions
      if (isDegrees) {
        expr = expr
          .replace(/sin\(/g, 'Math.sin(Math.PI/180*')
          .replace(/cos\(/g, 'Math.cos(Math.PI/180*')
          .replace(/tan\(/g, 'Math.tan(Math.PI/180*');
      } else {
        expr = expr
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(');
      }

      // Safe eval for demo purposes
      // eslint-disable-next-line no-eval
      const evalResult = eval(expr);
      const formattedResult =
        typeof evalResult === 'number'
          ? Math.abs(evalResult) < 0.0001 && evalResult !== 0
            ? evalResult.toExponential(4)
            : evalResult.toString().slice(0, 12)
          : String(evalResult);

      // Add to MultiView History (Max 3 lines)
      setHistory((prev) => [...prev.slice(-2), { exp: currentInput, ans: formattedResult }]);
      setResult(formattedResult);
      setCurrentInput('');
    } catch (e) {
      setResult('SYNTAX ERROR');
      setTimeout(() => setResult(''), 2000);
    }
  };

  const handleFunction = (fn) => {
    setCurrentInput((prev) => prev + fn + '(');
  };

  const toggleMode = () => {
    setIsDegrees((prev) => !prev);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleEnter();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      } else if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        handlePress(e.key);
      } else if (['+', '-', '(', ')', '.'].includes(e.key)) {
        e.preventDefault();
        handlePress(e.key);
      } else if (e.key === '*') {
        e.preventDefault();
        handlePress('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handlePress('÷');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentInput, result]);

  // --- Button Component ---
  const CalcBtn = ({ label, color = 'black', onClick, className = '', span = 1 }) => {
    const baseStyle =
      'h-10 text-sm font-bold rounded shadow-md active:scale-95 transition-transform flex items-center justify-center calc-btn';
    const colorStyles = {
      green: 'bg-[#4a8b73] text-white border-b-4 border-[#2f594a] hover:bg-[#5a9b83]',
      black: 'bg-slate-900 text-white border-b-4 border-black hover:bg-slate-800',
      white: 'bg-white text-slate-900 border-b-4 border-slate-300 hover:bg-slate-50',
      red: 'bg-red-800 text-white border-b-4 border-red-950 hover:bg-red-700',
      gray: 'bg-slate-700 text-white border-b-4 border-slate-900 hover:bg-slate-600',
    };

    const colSpan = span > 1 ? `col-span-${span}` : '';

    return (
      <button
        className={`${baseStyle} ${colorStyles[color]} ${className} ${colSpan}`}
        onClick={onClick || (() => handlePress(label))}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-30"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="relative"
        style={{
          left: position.x,
          top: position.y,
          position: 'fixed',
          opacity: opacity,
          pointerEvents: 'auto',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
      >
        {/* CALCULATOR SHELL */}
        <div className="w-[340px] bg-[#2c3e50] rounded-[32px] p-6 pb-8 shadow-2xl border-4 border-[#1a252f]">
          {/* BRANDING & SOLAR PANEL */}
          <div className="flex justify-between items-start mb-4 px-1">
            <div className="text-slate-300 text-[10px] font-bold tracking-widest leading-tight">
              <div>TEXAS INSTRUMENTS</div>
              <div className="text-slate-400 text-[9px] mt-0.5">TI-30XS MultiView™</div>
            </div>
            {/* Solar Panel */}
            <div className="w-20 h-5 bg-[#1a1410] rounded border border-slate-700 shadow-inner"></div>
          </div>

          {/* SCREEN (MultiView Display) */}
          <div className="bg-[#c8dcc8] h-44 rounded-lg mb-5 border-4 border-slate-700 p-3 font-mono text-slate-900 flex flex-col relative shadow-inner">
            {/* Status Indicators */}
            <div className="text-[9px] flex gap-3 opacity-70 border-b border-slate-400/40 pb-1 mb-2">
              <span className={isDegrees ? 'font-bold' : ''}>{isDegrees ? 'DEG' : 'RAD'}</span>
              <span>NORM</span>
              <span>FLOAT</span>
            </div>

            {/* History Lines (shows last 3 calculations) */}
            <div className="flex-1 flex flex-col justify-end overflow-hidden">
              {history.map((item, i) => (
                <div key={i} className="text-xs opacity-60 leading-tight mb-1">
                  <div className="text-right">{item.exp}</div>
                  <div className="text-right font-bold">= {item.ans}</div>
                </div>
              ))}
            </div>

            {/* Current Input/Result Line */}
            <div className="text-right text-2xl font-bold mt-2 truncate min-h-[32px]">
              {result !== '' ? (
                <span>{result}</span>
              ) : (
                <>
                  {currentInput || '0'}
                  <span className="inline-block w-0.5 h-6 bg-slate-900 animate-pulse ml-0.5">|</span>
                </>
              )}
            </div>
          </div>

          {/* Opacity Control */}
          <div className="calc-opacity-control mb-3 flex items-center gap-2 px-1">
            <span className="text-slate-400 text-xs">Opacity:</span>
            <input
              type="range"
              min="0.3"
              max="1"
              step="0.1"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <button
              onClick={onClose}
              className="ml-2 px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-xs font-bold rounded shadow"
            >
              ✕
            </button>
          </div>

          {/* KEYPAD GRID */}
          <div className="grid grid-cols-5 gap-2">
            {/* Row 1 */}
            <CalcBtn
              label="2nd"
              color="green"
              onClick={() => setIsSecond(!isSecond)}
              className={isSecond ? 'ring-2 ring-yellow-400' : ''}
            />
            <CalcBtn label="mode" color="black" onClick={toggleMode} />
            <CalcBtn label="del" color="black" onClick={handleDelete} />
            <CalcBtn label="on" color="black" onClick={handleClear} span={2} />

            {/* Row 2 */}
            <CalcBtn label="π" color="gray" onClick={() => handlePress('π')} />
            <CalcBtn label="sin" color="gray" onClick={() => handleFunction('sin')} />
            <CalcBtn label="cos" color="gray" onClick={() => handleFunction('cos')} />
            <CalcBtn label="tan" color="gray" onClick={() => handleFunction('tan')} />
            <CalcBtn label="÷" color="black" onClick={() => handlePress('÷')} />

            {/* Row 3 */}
            <CalcBtn label="n/d" color="gray" onClick={() => handlePress('/')} />
            <CalcBtn label="√" color="gray" onClick={() => handlePress('√(')} />
            <CalcBtn label="x²" color="gray" onClick={() => handlePress('^2')} />
            <CalcBtn label="^" color="gray" onClick={() => handlePress('^')} />
            <CalcBtn label="×" color="black" onClick={() => handlePress('×')} />

            {/* Row 4 with D-Pad */}
            <CalcBtn label="(" color="gray" onClick={() => handlePress('(')} />
            <CalcBtn label=")" color="gray" onClick={() => handlePress(')')} />
            {/* D-Pad - Decorative */}
            <div className="col-span-2 row-span-2 flex items-center justify-center relative h-full bg-slate-800 rounded-full border-2 border-slate-900 shadow-inner">
              <div className="w-8 h-8 bg-slate-700 rounded-full shadow-md"></div>
              <div className="absolute top-1 text-[10px] text-slate-400 font-bold">▲</div>
              <div className="absolute bottom-1 text-[10px] text-slate-400 font-bold">▼</div>
              <div className="absolute left-2 text-[10px] text-slate-400 font-bold">◀</div>
              <div className="absolute right-2 text-[10px] text-slate-400 font-bold">▶</div>
            </div>
            <CalcBtn label="-" color="black" onClick={() => handlePress('-')} />

            {/* Row 5 */}
            <CalcBtn label="log" color="gray" />
            <CalcBtn label="7" color="white" />
            <CalcBtn label="8" color="white" />
            <CalcBtn label="9" color="white" />

            {/* Row 6 */}
            <CalcBtn label="ln" color="gray" />
            <CalcBtn label="4" color="white" />
            <CalcBtn label="5" color="white" />
            <CalcBtn label="6" color="white" />
            <CalcBtn label="+" color="black" onClick={() => handlePress('+')} />

            {/* Row 7 */}
            <CalcBtn label="sto>" color="gray" />
            <CalcBtn label="1" color="white" />
            <CalcBtn label="2" color="white" />
            <CalcBtn label="3" color="white" />
            <CalcBtn label="enter" color="black" onClick={handleEnter} className="row-span-2 !h-[84px]" />

            {/* Row 8 */}
            <CalcBtn label="rcl" color="gray" />
            <CalcBtn label="0" color="white" span={2} />
            <CalcBtn label="." color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Make it available globally if needed
if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.TI30XSCalculator = TI30XSCalculator;
}
