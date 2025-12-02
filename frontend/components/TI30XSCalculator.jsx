import React, { useState, useRef, useEffect } from 'react';

export function TI30XSCalculator({ onClose }) {
  // --- State ---
  const [history, setHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
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
        {/* Calculator Shell: tall and narrow per spec */}
        <div
          className="relative bg-[#3b4c5f] shadow-2xl rounded-[30px] p-5"
          style={{ width: '340px', height: '680px' }}
        >
        y: e.clientY - dragStart.current.y,
      });
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
        if (
          e.target.tagName === 'BUTTON' ||
          e.target.closest('.calc-opacity-control')
        )
          return;
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
          let expr = currentInput
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/\^/g, '**')
            .replace(/π/g, 'Math.PI')
            .replace(/√/g, 'Math.sqrt');

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

          // eslint-disable-next-line no-eval
          const evalResult = eval(expr);
          const formattedResult =
            typeof evalResult === 'number'
              ? Math.abs(evalResult) < 0.0001 && evalResult !== 0
                ? evalResult.toExponential(4)
                : evalResult.toString().slice(0, 12)
              : String(evalResult);

          setHistory((prev) => [
            ...prev.slice(-2),
            { exp: currentInput, ans: formattedResult },
          ]);
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
          'h-11 text-sm font-semibold rounded-lg shadow-md active:scale-95 active:shadow-sm transition-all flex flex-col items-center justify-center calc-btn leading-tight py-1';
        const colorStyles = {
          green:
            'bg-gradient-to-b from-[#4a8b73] to-[#3a7563] text-white border-b-[3px] border-[#2f594a] hover:from-[#5a9b83] hover:to-[#4a8b73]',
          black:
            'bg-gradient-to-b from-slate-800 to-slate-900 text-white border-b-[3px] border-black hover:from-slate-700 hover:to-slate-800',
          white:
            'bg-gradient-to-b from-white to-slate-100 text-slate-900 border-b-[3px] border-slate-300 hover:from-slate-50 hover:to-slate-200 font-bold',
          red: 'bg-gradient-to-b from-red-700 to-red-800 text-white border-b-[3px] border-red-950 hover:from-red-600 hover:to-red-700',
          gray: 'bg-gradient-to-b from-slate-600 to-slate-700 text-white border-b-[3px] border-slate-800 hover:from-slate-500 hover:to-slate-600',
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

      // --- JSX ---
      return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-30" style={{ pointerEvents: 'none' }}>
          <div
            className="relative"
            style={{ left: position.x, top: position.y, position: 'fixed', opacity: opacity, pointerEvents: 'auto', cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
          >
            <div
              className="relative bg-[#3b4c5f] shadow-2xl rounded-[30px] p-5"
              style={{ width: '340px', height: '680px', transform: 'scale(2)', transformOrigin: 'top left' }}
            >
              {/* Branding */}
              <div className="mb-3">
                <div className="text-center mb-2">
                  <div className="text-white text-2xl font-bold tracking-wider">TI-30XS</div>
                  <div className="text-slate-300 text-xs tracking-widest">MultiView</div>
                </div>
                <div className="w-full h-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-sm border border-slate-700 shadow-inner mb-2"></div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="text-red-600 text-lg font-bold">★</div>
                  <div className="text-white text-[10px] font-bold tracking-widest">TEXAS INSTRUMENTS</div>
                </div>
              </div>

              {/* Screen */}
              <div className="bg-[#e3e9d9] h-44 rounded-xl mb-4 border-4 border-slate-600 p-4 font-mono text-slate-900 flex flex-col relative shadow-inner">
                <div className="absolute top-2 right-3 text-[8px] flex gap-2 opacity-60">
                  <span className={isDegrees ? 'font-bold' : ''}>{isDegrees ? 'DEG' : 'RAD'}</span>
                  <span>FLO</span>
                </div>
                <div className="flex-1 flex flex-col justify-end overflow-hidden">
                  {history.map((item, i) => (
                    <div key={i} className="text-[11px] opacity-50 leading-tight mb-1">
                      <div className="text-left">{item.exp}</div>
                      <div className="text-right font-bold mb-1">={item.ans}</div>
                    </div>
                  ))}
                </div>
                <div className="text-left text-2xl font-bold mt-2 min-h-[36px] border-t border-slate-400/30 pt-2">
                  {result !== '' ? (
                    <div className="text-right">{result}</div>
                  ) : (
                    <div className="flex items-center">
                      {currentInput || '0'}
                      <span className="inline-block w-1 h-6 bg-slate-900 animate-pulse ml-1">|</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Opacity + Close */}
              <div className="calc-opacity-control mb-3 flex items-center gap-2 px-1">
                <span className="text-slate-400 text-xs">Opacity:</span>
                <input type="range" min="0.3" max="1" step="0.1" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} className="flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                <button onClick={onClose} className="ml-2 px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-xs font-bold rounded shadow">✕</button>
              </div>

              {/* Keypad Grid */}
              <div className="grid grid-cols-4 gap-3">
                {/* Top row */}
                <button className={`h-8 text-xs font-semibold rounded-md shadow-md active:scale-95 transition-all flex items-center justify-center bg-[#4a8b73] text-white ${isSecond ? 'ring-2 ring-yellow-300' : ''}`} onClick={() => setIsSecond(!isSecond)}>2nd</button>
                <button className="h-8 text-xs font-semibold rounded-md shadow-md active:scale-95 transition-all flex items-center justify-center bg-slate-700 text-white" onClick={toggleMode}>mode</button>
                <button className="h-8 text-xs font-semibold rounded-md shadow-md active:scale-95 transition-all flex items-center justify-center bg-slate-700 text-white" onClick={handleDelete}>del</button>
                <button className="h-8 text-xs font-semibold rounded-md shadow-md active:scale-95 transition-all flex items-center justify-center bg-slate-900 text-white" onClick={handleClear}>clear</button>

                {/* Row 2 */}
                <CalcBtn label={<><span className="text-green-400 text-[8px]">e^x</span><br/>log</>} color="gray" className="text-[10px]" />
                <CalcBtn label={<><span className="text-green-400 text-[8px]">LRN</span><br/>prb</>} color="gray" className="text-[9px]" />
                <CalcBtn label={<><span className="text-green-400 text-[8px]">stat</span><br/>data</>} color="gray" className="text-[9px]" />
                <div className="col-span-2">
                  <div className="relative w-full h-16 bg-slate-700 rounded-full border-2 border-slate-800 shadow-md">
                    <button aria-label="up" className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 w-1/3 bg-transparent" onClick={() => {}} />
                    <button aria-label="down" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1/2 w-1/3 bg-transparent" onClick={() => {}} />
                    <button aria-label="left" className="absolute top-1/2 -translate-y-1/2 left-0 h-1/3 w-1/2 bg-transparent" onClick={() => {}} />
                    <button aria-label="right" className="absolute top-1/2 -translate-y-1/2 right-0 h-1/3 w-1/2 bg-transparent" onClick={() => {}} />
                  </div>
                </div>

                {/* Row 3 */}
                <CalcBtn label={<><span className="text-green-400 text-[8px]">10^x</span><br/>ln</>} color="gray" className="text-[10px]" />
                <CalcBtn label={<><span className="text-green-400 text-[8px]">n/d</span><br/><span className="text-sm">□</span><sub className="text-[8px]">d</sub></>} color="gray" className="text-[10px]" />
                <CalcBtn label={<><span className="text-green-400 text-[8px]">÷10^n</span><br/>×10<sup className="text-[8px]">n</sup></>} color="gray" className="text-[9px]" />
                <CalcBtn label="×" color="black" onClick={() => handlePress('×')} className="text-lg font-bold" />

                {/* Row 4 */}
                <CalcBtn label={<><span>π</span><br/><span className="text-green-400 text-[7px]">x<sup className="text-[7px]">π</sup></span></>} color="gray" onClick={() => handlePress('π')} className="text-base" />
                <CalcBtn label={<><span>sin</span><br/><span className="text-green-400 text-[7px]">sin⁻¹</span></>} color="gray" onClick={() => handleFunction('sin')} className="text-[11px]" />
                <CalcBtn label={<><span>cos</span><br/><span className="text-green-400 text-[7px]">cos⁻¹</span></>} color="gray" onClick={() => handleFunction('cos')} className="text-[11px]" />
                <CalcBtn label={<><span>tan</span><br/><span className="text-green-400 text-[7px]">tan⁻¹</span></>} color="gray" onClick={() => handleFunction('tan')} className="text-[11px]" />

                {/* Row 5 */}
                <CalcBtn label={<><span className="text-green-400 text-[8px]">√</span><br/>^</>} color="gray" onClick={() => handlePress('^')} className="text-base" />
                <CalcBtn label={<><span>x<sup className="text-[8px]">-1</sup></span><br/><span className="text-green-400 text-[7px]">nCr/nPr</span></>} color="gray" className="text-[11px]" />
                <CalcBtn label="(" color="gray" onClick={() => handlePress('(')} className="text-xl" />
                <CalcBtn label=")" color="gray" onClick={() => handlePress(')')} className="text-xl" />

                {/* Row 6 */}
                <CalcBtn label={<><span>x<sup className="text-[8px]">2</sup></span><br/><span className="text-green-400 text-[7px]">√</span></>} color="gray" onClick={() => handlePress('^2')} className="text-base" />
                <CalcBtn label="7" color="white" className="text-xl font-bold" />
                <CalcBtn label="8" color="white" className="text-xl font-bold" />
                <CalcBtn label="9" color="white" className="text-xl font-bold" />

                {/* Row 7 */}
                <CalcBtn label={<><span className="text-[8px]">clear var</span><br/><span className="text-lg">x ÷ abc</span></>} color="gray" className="text-[9px]" />
                <CalcBtn label="4" color="white" className="text-xl font-bold" />
                <CalcBtn label="5" color="white" className="text-xl font-bold" />
                <CalcBtn label="6" color="white" className="text-xl font-bold" />

                {/* Row 8 */}
                <CalcBtn label={<><span className="text-[8px]">recall</span><br/>sto▸</>} color="gray" className="text-[10px]" />
                <CalcBtn label="1" color="white" className="text-xl font-bold" />
                <CalcBtn label="2" color="white" className="text-xl font-bold" />
                <CalcBtn label="3" color="white" className="text-xl font-bold" />

                {/* Bottom Row */}
                <CalcBtn label={<><span>on</span><br/><span className="text-[8px]">reset</span></>} color="gray" className="text-[10px]" />
                <div className="col-span-2"><CalcBtn label="0" color="white" className="text-xl font-bold" /></div>
                <CalcBtn label="." color="white" className="text-2xl font-bold pb-2" />
                <div className="row-span-2"><CalcBtn label="enter" color="black" onClick={handleEnter} className="h-full text-sm font-bold" /></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (typeof window !== 'undefined') {
      window.Components = window.Components || {};
      window.Components.TI30XSCalculator = TI30XSCalculator;
    }
              label="−"
              color="black"
              onClick={() => handlePress('-')}
              className="text-xl"
            />

            {/* Row 5: Powers and roots with D-Pad */}
            <CalcBtn
              label={
                <>
                  <span className="text-green-400 text-[8px]">√</span>
                  <br />^
                </>
              }
              color="gray"
              onClick={() => handlePress('^')}
              className="text-base"
            />
            <CalcBtn
              label={
                <>
                  x<sup className="text-[8px]">-1</sup>
                  <br />
                  <span className="text-green-400 text-[7px]">nCr/nPr</span>
                </>
              }
              color="gray"
              className="text-[11px]"
            />
            <CalcBtn
              label="("
              color="gray"
              onClick={() => handlePress('(')}
              className="text-xl"
            />
            <CalcBtn
              label=")"
              color="gray"
              onClick={() => handlePress(')')}
              className="text-xl"
            />
            <CalcBtn
              label="+"
              color="black"
              onClick={() => handlePress('+')}
              className="text-xl"
            />

            {/* Row 6: x² and numbers 7-9 */}
            <CalcBtn
              label={
                <>
                  x<sup className="text-[8px]">2</sup>
                  <br />
                  <span className="text-green-400 text-[7px]">√</span>
                </>
              }
              color="gray"
              onClick={() => handlePress('^2')}
              className="text-base"
            />
            <CalcBtn label="7" color="white" className="text-xl font-bold" />
            <CalcBtn label="8" color="white" className="text-xl font-bold" />
            <CalcBtn label="9" color="white" className="text-xl font-bold" />
            <div className="row-span-2">
              <CalcBtn
                label="enter"
                color="black"
                onClick={handleEnter}
                className="h-[84px] text-sm font-bold"
              />
            </div>

            {/* Row 7: Clear Var and numbers 4-6 */}
            <CalcBtn
              label={
                <>
                  <span className="text-[8px]">clear var</span>
                  <br />
                  <span className="text-lg">x ÷ abc</span>
                </>
              }
              color="gray"
              className="text-[9px]"
            />
            <CalcBtn label="4" color="white" className="text-xl font-bold" />
            <CalcBtn label="5" color="white" className="text-xl font-bold" />
            <CalcBtn label="6" color="white" className="text-xl font-bold" />

            {/* Row 8: Recall and numbers 1-3 */}
            <CalcBtn
              label={
                <>
                  <span className="text-[8px]">recall</span>
                  <br />
                  sto▸
                </>
              }
              color="gray"
              className="text-[10px]"
            />
            <CalcBtn label="1" color="white" className="text-xl font-bold" />
            <CalcBtn label="2" color="white" className="text-xl font-bold" />
            <CalcBtn label="3" color="white" className="text-xl font-bold" />
            <CalcBtn
              label={
                <>
                  <span className="text-green-400 text-[8px]">ans</span>
                  <br />
                  (−)
                </>
              }
              color="gray"
              onClick={() => handlePress('(-')}
              className="text-base"
            />

            {/* Row 9: On and bottom row */}
            <CalcBtn
              label={
                <>
                  on
                  <br />
                  <span className="text-[8px]">reset</span>
                </>
              }
              color="gray"
              className="text-[10px]"
            />
            <div className="col-span-2">
              <CalcBtn label="0" color="white" className="text-xl font-bold" />
            </div>
            <CalcBtn
              label="."
              color="white"
              className="text-2xl font-bold pb-2"
            />
            <CalcBtn
              label="="
              color="white"
              className="text-xl font-bold"
              onClick={handleEnter}
            />
          </div>
        </div>

        {/* D-Pad Navigation (Overlay in center-right area) */}
        <div
          className="absolute"
          style={{
            top: '405px',
            right: '50px',
            width: '70px',
            height: '70px',
            pointerEvents: 'none',
          }}
        >
          <div className="relative w-full h-full bg-slate-700 rounded-full border-2 border-slate-800 shadow-lg flex items-center justify-center">
            <div className="w-10 h-10 bg-slate-600 rounded-full shadow-inner"></div>
            <div className="absolute top-0 text-[10px] text-slate-300 font-bold">
              ▲
            </div>
            <div className="absolute bottom-0 text-[10px] text-slate-300 font-bold">
              ▼
            </div>
            <div className="absolute left-1 text-[10px] text-slate-300 font-bold">
              ◀
            </div>
            <div className="absolute right-1 text-[10px] text-slate-300 font-bold">
              ▶
            </div>
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
