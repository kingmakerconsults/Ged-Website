import React, { useState, useRef, useEffect } from 'react';
import {
  applyReciprocal,
  applySquare,
  backspaceToken,
  decimalToFractionTemplate,
  deleteForwardToken,
  exprToLatex,
  evaluateExpression,
  insertDecimal,
  insertOperator,
  insertRightParen,
  insertText,
  toDisplay,
  toggleNegative,
} from './ti30xsEngine.js';

import {
  isKatexAvailable,
  renderLatexToHtml,
} from '../src/utils/latexHelpers.js';

// Checklist (only requested changes):
// 1) Increased base sizing + key internal label layout to prevent green label overlap.
// 2) Implemented working U n/d (MIX) by inserting `frac()()` / `mixed()()()`, evaluated via engine template expansion.
// 3) LCD now renders expression/result via KaTeX (LaTeX conversion via `exprToLatex()`), with plain-text fallback.

// ============================================================================
// KEY LAYOUT SOURCE OF TRUTH
// ============================================================================

const KEY_LAYOUT = {
  // Main grid: 5 columns x 9 rows (strict physical layout)
  gridRows: [
    // ROW 1: Top system row
    [
      {
        id: 'k_2nd',
        primary: '2nd',
        secondary: null,
        type: 'accent pill',
        action: 'toggleShift2nd',
      },
      {
        id: 'k_mode',
        primary: 'mode',
        secondary: 'quit',
        type: 'sys pill',
        action: 'openModeMenu',
      },
      {
        id: 'k_del',
        primary: 'delete',
        secondary: 'insert',
        type: 'sys pill',
        action: 'backspace',
      },
      null,
      null,
    ],
    // ROW 2
    [
      {
        id: 'k_log',
        primary: 'log',
        secondary: '10^x',
        type: 'fn',
        action: 'log',
      },
      {
        id: 'k_prb',
        primary: 'prb',
        secondary: 'angle',
        type: 'fn',
        action: 'noop',
      },
      {
        id: 'k_data',
        primary: 'data',
        secondary: 'stat',
        type: 'fn',
        action: 'noop',
      },
      null,
      null,
    ],
    // ROW 3
    [
      { id: 'k_ln', primary: 'ln', secondary: 'e^x', type: 'fn', action: 'ln' },
      {
        id: 'k_frac',
        primary: 'n/d',
        secondary: 'U n/d',
        type: 'fn',
        action: 'fraction',
      },
      {
        id: 'k_x10n',
        primary: 'x10^n',
        secondary: 'n/d ↔ U n/d',
        type: 'fn',
        action: 'sci',
      },
      {
        id: 'k_table',
        primary: 'table',
        secondary: 'f↔d',
        type: 'fn',
        action: 'noop',
      },
      {
        id: 'k_clear',
        primary: 'clear',
        secondary: null,
        type: 'sys pill',
        action: 'clearAll',
      },
    ],
    // ROW 4
    [
      {
        id: 'k_pi',
        primary: 'π',
        secondary: 'hyp',
        type: 'fn',
        action: 'pi',
      },
      {
        id: 'k_sin',
        primary: 'sin',
        secondary: 'sin⁻¹',
        type: 'fn',
        action: 'sin',
      },
      {
        id: 'k_cos',
        primary: 'cos',
        secondary: 'cos⁻¹',
        type: 'fn',
        action: 'cos',
      },
      {
        id: 'k_tan',
        primary: 'tan',
        secondary: 'tan⁻¹',
        type: 'fn',
        action: 'tan',
      },
      {
        id: 'op_div',
        primary: '÷',
        secondary: 'K',
        row: 4,
        type: 'op pill',
        action: 'divide',
      },
    ],
    // ROW 5
    [
      {
        id: 'k_pow',
        primary: '^',
        secondary: 'x√y',
        type: 'fn',
        action: 'power',
      },
      {
        id: 'k_inv',
        primary: 'x⁻¹',
        secondary: '√',
        type: 'fn',
        action: 'reciprocal',
      },
      {
        id: 'k_lpar',
        primary: '(',
        secondary: '%',
        type: 'fn',
        action: 'leftParen',
      },
      {
        id: 'k_rpar',
        primary: ')',
        secondary: '▶%',
        type: 'fn',
        action: 'rightParen',
      },
      {
        id: 'op_mul',
        primary: '×',
        row: 5,
        type: 'op pill',
        action: 'multiply',
      },
    ],
    // ROW 6
    [
      {
        id: 'k_sq',
        primary: 'x²',
        secondary: '√',
        type: 'fn',
        action: 'square',
      },
      {
        id: 'k_7',
        primary: '7',
        secondary: null,
        type: 'num',
        action: 'digit',
      },
      {
        id: 'k_8',
        primary: '8',
        secondary: null,
        type: 'num',
        action: 'digit',
      },
      {
        id: 'k_9',
        primary: '9',
        secondary: null,
        type: 'num',
        action: 'digit',
      },
      {
        id: 'op_sub',
        primary: '−',
        secondary: '◄0',
        row: 6,
        type: 'op pill',
        action: 'subtract',
      },
    ],
    // ROW 7
    [
      {
        id: 'k_var',
        primary: 'x y z',
        secondary: 'clear var',
        type: 'fn',
        action: 'variable',
      },
      {
        id: 'k_4',
        primary: '4',
        secondary: null,
        type: 'num',
        action: 'digit',
      },
      {
        id: 'k_5',
        primary: '5',
        secondary: null,
        type: 'num',
        action: 'digit',
      },
      {
        id: 'k_6',
        primary: '6',
        secondary: null,
        type: 'num',
        action: 'digit',
      },
      {
        id: 'op_add',
        primary: '+',
        secondary: '▶0',
        row: 7,
        type: 'op pill',
        action: 'add',
      },
    ],
    // ROW 8
    [
      {
        id: 'k_sto',
        primary: 'sto→',
        secondary: 'recall',
        type: 'fn',
        action: 'store',
      },
      {
        id: 'k_1',
        primary: '1',
        secondary: null,
        type: 'num',
        action: 'digit',
      },
      {
        id: 'k_2',
        primary: '2',
        secondary: null,
        type: 'num',
        action: 'digit',
      },
      {
        id: 'k_3',
        primary: '3',
        secondary: null,
        type: 'num',
        action: 'digit',
      },
      {
        id: 'k_lr',
        primary: '◄►',
        secondary: null,
        type: 'fn pill',
        action: 'cursorJump',
      },
    ],
    // ROW 9: Bottom row
    [
      {
        id: 'k_on',
        primary: 'on',
        secondary: 'off',
        type: 'sys pill',
        action: 'noop',
      },
      {
        id: 'k_0',
        primary: '0',
        secondary: 'reset',
        type: 'num wide',
        action: 'digit',
      },
      {
        id: 'k_dot',
        primary: '.',
        secondary: ',',
        type: 'num',
        action: 'dot',
      },
      {
        id: 'k_neg',
        primary: '(-)',
        secondary: 'ans',
        type: 'num',
        action: 'negative',
      },
      {
        id: 'k_enter',
        primary: 'enter',
        secondary: null,
        type: 'sys wide pill',
        action: 'evaluate',
      },
    ],
  ],
};

// Single source of truth for 2nd mapping. Keys without `secondaryAction` will
// no-op in 2nd mode (and 2nd still clears).
const KEY_CONFIG = {
  k_mode: { secondaryAction: 'quitMenu' },
  k_del: { secondaryAction: 'toggleInsertMode' },

  k_log: { secondaryAction: 'insert10Pow' },
  k_ln: { secondaryAction: 'insertEPow' },
  k_frac: { secondaryAction: 'toggleMixedNumberMode' },
  k_x10n: { secondaryAction: 'convertFracMixedNoop' },
  k_table: { secondaryAction: 'toggleFracDec' },

  k_pi: { secondaryAction: 'toggleHypMode' },
  op_div: { secondaryAction: 'toggleConstMode' },

  k_pow: { secondaryAction: 'insertRoot' },
  k_inv: { secondaryAction: 'insertSqrt' },
  k_lpar: { secondaryAction: 'insertPercent' },
  k_rpar: { secondaryAction: 'percentHelperNoop' },

  k_sq: { secondaryAction: 'insertSqrt' },
  op_sub: { secondaryAction: 'cursorLeft' },
  op_add: { secondaryAction: 'cursorRight' },

  k_var: { secondaryAction: 'clearVarsNoop' },
  k_sto: { secondaryAction: 'recallArm' },

  k_on: { secondaryAction: 'powerOff' },
  k_0: { secondaryAction: 'resetAll' },
  k_dot: { secondaryAction: 'commaNoop' },
  k_neg: { secondaryAction: 'insertAns' },
};

for (const row of KEY_LAYOUT.gridRows) {
  for (const keyData of row) {
    if (!keyData) continue;
    const cfg = KEY_CONFIG[keyData.id];
    if (!cfg) continue;
    keyData.secondaryAction = cfg.secondaryAction;
  }
}

// Explicit 9x5 keypad matrix (row-by-row / col-by-col). Nulls render as
// `visibility:hidden` placeholders to preserve alignment.
const KEYPAD_MATRIX_IDS = [
  ['k_2nd', 'k_mode', 'k_del', null, null],
  ['k_log', 'k_prb', 'k_data', null, null],
  ['k_ln', 'k_frac', 'k_x10n', 'k_table', 'k_clear'],
  ['k_pi', 'k_sin', 'k_cos', 'k_tan', 'op_div'],
  ['k_pow', 'k_inv', 'k_lpar', 'k_rpar', 'op_mul'],
  ['k_sq', 'k_7', 'k_8', 'k_9', 'op_sub'],
  ['k_var', 'k_4', 'k_5', 'k_6', 'op_add'],
  ['k_sto', 'k_1', 'k_2', 'k_3', 'k_lr'],
  ['k_on', 'k_0', 'k_dot', 'k_neg', 'k_enter'],
];

const KEY_BY_ID = (() => {
  const map = new Map();
  for (const row of KEY_LAYOUT.gridRows) {
    for (const keyData of row) {
      if (!keyData) continue;
      map.set(keyData.id, keyData);
    }
  }
  return map;
})();

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function TI30XSCalculator({ onClose }) {
  // --- State ---
  const [currentInput, setCurrentInput] = useState(''); // INTERNAL expression string
  const [cursorIndex, setCursorIndex] = useState(0); // INTERNAL cursor index
  const [result, setResult] = useState('');
  const [lastAnswer, setLastAnswer] = useState('0');
  const [shift2nd, setShift2nd] = useState(false);
  const [angleMode, setAngleMode] = useState('DEG'); // 'DEG' or 'RAD'
  const [showModeMenu, setShowModeMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [memory, setMemory] = useState({});
  const [storeArmed, setStoreArmed] = useState(false);
  const [recallArmed, setRecallArmed] = useState(false);
  const [insertMode, setInsertMode] = useState(true);
  const [mixedNumberMode, setMixedNumberMode] = useState(false);
  const [hypMode, setHypMode] = useState(false);
  const [constMode, setConstMode] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [opacity, setOpacity] = useState(1.0);
  const [uiScale, setUiScale] = useState(1.0);
  const dragStart = useRef({ x: 0, y: 0 });
  const lcdRef = useRef(null);
  const calcRootRef = useRef(null);
  const [kbdActive, setKbdActive] = useState(false);
  const kbdActiveRef = useRef(false);

  const memoryHasAnyValue = Object.keys(memory).length > 0;

  useEffect(() => {
    kbdActiveRef.current = kbdActive;
  }, [kbdActive]);

  // When user clicks anywhere on the calculator, keep keyboard input on the LCD.
  useEffect(() => {
    const onDocMouseDown = (e) => {
      const root = calcRootRef.current;
      const inside = root && root.contains(e.target);
      setKbdActive(Boolean(inside));
      if (inside) {
        // Focus after the click so Backspace/arrows target the LCD.
        requestAnimationFrame(() => {
          lcdRef.current?.focus();
        });
      }
    };
    document.addEventListener('mousedown', onDocMouseDown, true);
    return () =>
      document.removeEventListener('mousedown', onDocMouseDown, true);
  }, []);

  // Ensure position/size stay within viewport
  useEffect(() => {
    const handleResize = () => {
      setPosition((prevPos) => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const calcWidth = 560;
        const calcHeight = Math.min(560 * 1.4, window.innerHeight - 40);
        const nx = Math.max(
          10,
          Math.min(prevPos.x, windowWidth - calcWidth - 10)
        );
        const ny = Math.max(
          10,
          Math.min(prevPos.y, windowHeight - calcHeight - 10)
        );
        return { x: nx, y: ny };
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Drag logic
  const handleMouseDown = (e) => {
    if (
      e.target.tagName === 'BUTTON' ||
      e.target.closest('.settings-panel') ||
      e.target.closest('[data-ti30xs-nodrag]')
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // ============================================================================
  // ACTION HANDLERS
  // ============================================================================

  const clearShift = () => setShift2nd(false);

  // Helper: apply an edit based on the latest state.
  const applyEdit = (editFn) => {
    setCurrentInput((prevExpr) => {
      const prevCursor = Math.max(0, Math.min(cursorIndex, prevExpr.length));
      const next = editFn({ expr: prevExpr, cursor: prevCursor });
      setCursorIndex(next.cursor);
      return next.expr;
    });
  };

  const displayInput = toDisplay(currentInput);

  // KaTeX rendering (expression/result)
  const katexOn = isKatexAvailable();
  const latexInput = exprToLatex(currentInput, cursorIndex);
  const latexResult = result ? exprToLatex(String(result)) : '';

  // Minimal template navigation for n/d key
  const parseGroup = (src, openIndex) => {
    if (src[openIndex] !== '(') return null;
    let depth = 0;
    for (let i = openIndex; i < src.length; i++) {
      const ch = src[i];
      if (ch === '(') depth++;
      else if (ch === ')') {
        depth--;
        if (depth === 0) {
          return {
            openIndex,
            closeIndex: i,
            innerStart: openIndex + 1,
            innerEnd: i,
            endIndex: i + 1,
          };
        }
      }
    }
    return null;
  };

  const findTemplateAtCursor = (expr, cursor) => {
    const contexts = [];
    let i = 0;
    while (i < expr.length) {
      if (expr.startsWith('frac', i) && expr[i + 4] === '(') {
        const g1 = parseGroup(expr, i + 4);
        const g2 =
          g1 && expr[g1.endIndex] === '('
            ? parseGroup(expr, g1.endIndex)
            : null;
        if (g1 && g2) {
          contexts.push({
            kind: 'frac',
            start: i,
            end: g2.endIndex,
            segments: [
              { name: 'num', start: g1.innerStart, end: g1.innerEnd },
              { name: 'den', start: g2.innerStart, end: g2.innerEnd },
            ],
          });
          i = g2.endIndex;
          continue;
        }
      }
      if (expr.startsWith('mixed', i) && expr[i + 5] === '(') {
        const gW = parseGroup(expr, i + 5);
        const gN =
          gW && expr[gW.endIndex] === '('
            ? parseGroup(expr, gW.endIndex)
            : null;
        const gD =
          gN && expr[gN.endIndex] === '('
            ? parseGroup(expr, gN.endIndex)
            : null;
        if (gW && gN && gD) {
          contexts.push({
            kind: 'mixed',
            start: i,
            end: gD.endIndex,
            segments: [
              { name: 'whole', start: gW.innerStart, end: gW.innerEnd },
              { name: 'num', start: gN.innerStart, end: gN.innerEnd },
              { name: 'den', start: gD.innerStart, end: gD.innerEnd },
            ],
          });
          i = gD.endIndex;
          continue;
        }
      }
      i++;
    }

    const containing = contexts
      .filter((c) => cursor >= c.start && cursor <= c.end)
      .sort((a, b) => a.end - a.start - (b.end - b.start));
    const ctx = containing[0];
    if (!ctx) return null;

    const seg = ctx.segments.find((s) => cursor >= s.start && cursor <= s.end);
    return { ...ctx, segment: seg?.name ?? null };
  };

  const jumpTemplateSegment = (direction) => {
    // direction: 'next' | 'prev' | 'up' | 'down'
    const ctx = findTemplateAtCursor(currentInput, cursorIndex);
    if (!ctx) return false;

    if (ctx.kind === 'frac') {
      const num = ctx.segments[0];
      const den = ctx.segments[1];

      if (direction === 'up') {
        setCursorIndex(num.start);
        return true;
      }
      if (direction === 'down') {
        setCursorIndex(den.start);
        return true;
      }
      if (direction === 'next') {
        if (ctx.segment === 'num') {
          setCursorIndex(den.start);
          return true;
        }
        if (ctx.segment === 'den') {
          setCursorIndex(ctx.end);
          return true;
        }
      }
      if (direction === 'prev') {
        if (ctx.segment === 'den') {
          setCursorIndex(num.start);
          return true;
        }
        if (ctx.segment === 'num') {
          // Go to before the template
          setCursorIndex(ctx.start);
          return true;
        }
      }
      return false;
    }

    if (ctx.kind === 'mixed') {
      const whole = ctx.segments[0];
      const num = ctx.segments[1];
      const den = ctx.segments[2];

      if (direction === 'up') {
        // Prefer moving toward whole/num depending on where you are.
        if (ctx.segment === 'den') {
          setCursorIndex(num.start);
          return true;
        }
        if (ctx.segment === 'num') {
          setCursorIndex(whole.start);
          return true;
        }
        setCursorIndex(whole.start);
        return true;
      }
      if (direction === 'down') {
        // Prefer moving toward den.
        if (ctx.segment === 'whole') {
          setCursorIndex(num.start);
          return true;
        }
        if (ctx.segment === 'num') {
          setCursorIndex(den.start);
          return true;
        }
        setCursorIndex(den.start);
        return true;
      }

      if (direction === 'next') {
        if (ctx.segment === 'whole') {
          setCursorIndex(num.start);
          return true;
        }
        if (ctx.segment === 'num') {
          setCursorIndex(den.start);
          return true;
        }
        if (ctx.segment === 'den') {
          setCursorIndex(ctx.end);
          return true;
        }
      }
      if (direction === 'prev') {
        if (ctx.segment === 'den') {
          setCursorIndex(num.start);
          return true;
        }
        if (ctx.segment === 'num') {
          setCursorIndex(whole.start);
          return true;
        }
        if (ctx.segment === 'whole') {
          setCursorIndex(ctx.start);
          return true;
        }
      }
      return false;
    }

    return false;
  };

  const handleLcdKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      if (jumpTemplateSegment('prev')) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      setCursorIndex(Math.max(0, cursorIndex - 1));
    } else if (e.key === 'ArrowRight') {
      if (jumpTemplateSegment('next')) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      setCursorIndex(Math.min(currentInput.length, cursorIndex + 1));
    } else if (e.key === 'ArrowUp') {
      if (jumpTemplateSegment('up')) {
        e.preventDefault();
      }
    } else if (e.key === 'ArrowDown') {
      if (jumpTemplateSegment('down')) {
        e.preventDefault();
      }
    } else if (e.key === 'Tab') {
      if (jumpTemplateSegment(e.shiftKey ? 'prev' : 'next')) {
        e.preventDefault();
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      setCursorIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setCursorIndex(currentInput.length);
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      applyEdit(({ expr, cursor }) => backspaceToken(expr, cursor));
    } else if (e.key === 'Delete') {
      e.preventDefault();
      applyEdit(({ expr, cursor }) => deleteForwardToken(expr, cursor));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleEvaluate();
    } else if (e.key === 'Escape') {
      lcdRef.current?.blur();
      setKbdActive(false);
    }
  };

  // Capture navigation keys even if focus accidentally lands on a button.
  useEffect(() => {
    const onWindowKeyDown = (e) => {
      if (!kbdActiveRef.current) return;
      const key = e.key;
      const handled =
        key === 'Backspace' ||
        key === 'Delete' ||
        key === 'ArrowLeft' ||
        key === 'ArrowRight' ||
        key === 'ArrowUp' ||
        key === 'ArrowDown' ||
        key === 'Tab' ||
        key === 'Home' ||
        key === 'End' ||
        key === 'Enter' ||
        key === 'Escape';
      if (!handled) return;

      // Prevent browser back-navigation/scroll/focus traversal.
      e.preventDefault();
      e.stopPropagation();
      lcdRef.current?.focus();
      handleLcdKeyDown(e);
    };

    window.addEventListener('keydown', onWindowKeyDown, true);
    return () => window.removeEventListener('keydown', onWindowKeyDown, true);
  }, [
    currentInput,
    cursorIndex,
    angleMode,
    lastAnswer,
    memory,
    mixedNumberMode,
    insertMode,
    hypMode,
    constMode,
    shift2nd,
    showModeMenu,
    showSettings,
  ]);

  const findNumberSegmentAtCursor = (expr, cursor) => {
    const isNumChar = (ch) => (ch >= '0' && ch <= '9') || ch === '.';
    let start = cursor;
    while (start > 0 && isNumChar(expr[start - 1])) start--;
    let end = cursor;
    while (end < expr.length && isNumChar(expr[end])) end++;
    // include unary '-' if present and looks unary
    if (start > 0 && expr[start - 1] === '-') {
      const prev = start - 2 >= 0 ? expr[start - 2] : '';
      const unary =
        start - 1 === 0 ||
        prev === '(' ||
        ['+', '-', '*', '/', '^'].includes(prev);
      if (unary) start--;
    }
    if (end <= start) return null;
    return { start, end, text: expr.slice(start, end) };
  };

  const displayCursorIndex = (() => {
    // Map internal cursor to display cursor.
    // This only compresses a few tokens; for now handle pi and sqrt( mapping.
    let i = 0;
    let d = 0;
    while (i < currentInput.length && i < cursorIndex) {
      if (currentInput.startsWith('sqrt(', i)) {
        // "sqrt(" -> "√("
        i += 5;
        d += 2;
        continue;
      }
      if (currentInput.startsWith('pi', i)) {
        i += 2;
        d += 1;
        continue;
      }
      // single char mapping
      i += 1;
      d += 1;
    }
    return d;
  })();

  const handleAction = (action, keyData) => {
    const primary = keyData.primary;

    switch (action) {
      case 'toggleShift2nd':
        setShift2nd((prev) => !prev);
        break;

      case 'quitMenu':
        setShowModeMenu(false);
        setShowSettings(false);
        break;

      case 'toggleInsertMode':
        setInsertMode((prev) => !prev);
        break;

      case 'openModeMenu':
        setShowModeMenu(true);
        break;

      case 'backspace':
        applyEdit(({ expr, cursor }) => backspaceToken(expr, cursor));
        clearShift();
        break;

      case 'clearAll':
        setCurrentInput('');
        setCursorIndex(0);
        setResult('');
        break;

      case 'log':
        applyEdit(({ expr, cursor }) => insertText(expr, cursor, 'log('));
        break;

      case 'insert10Pow':
        applyEdit(({ expr, cursor }) => insertText(expr, cursor, '10^('));
        break;

      case 'ln':
        applyEdit(({ expr, cursor }) => insertText(expr, cursor, 'ln('));
        break;

      case 'insertEPow':
        applyEdit(({ expr, cursor }) => insertText(expr, cursor, 'e^('));
        break;

      case 'fraction':
        // If cursor is currently inside a template, advance through its parts.
        {
          const ctx = findTemplateAtCursor(currentInput, cursorIndex);
          if (ctx?.kind === 'frac') {
            if (ctx.segment === 'num') {
              setCursorIndex(ctx.segments[1].start);
              break;
            }
            if (ctx.segment === 'den') {
              setCursorIndex(ctx.end);
              break;
            }
          }
          if (ctx?.kind === 'mixed') {
            if (ctx.segment === 'whole') {
              setCursorIndex(ctx.segments[1].start);
              break;
            }
            if (ctx.segment === 'num') {
              setCursorIndex(ctx.segments[2].start);
              break;
            }
            if (ctx.segment === 'den') {
              setCursorIndex(ctx.end);
              break;
            }
          }
        }
        // Standard fraction vs mixed-number template.
        if (mixedNumberMode) {
          applyEdit(({ expr, cursor }) => {
            const inserted = insertText(expr, cursor, 'mixed()()()');
            // Place cursor inside the whole-part group.
            return {
              expr: inserted.expr,
              cursor: inserted.cursor - '()()()'.length + 1,
            };
          });
        } else {
          applyEdit(({ expr, cursor }) => {
            const inserted = insertText(expr, cursor, 'frac()()');
            // Place cursor inside numerator group.
            return {
              expr: inserted.expr,
              cursor: inserted.cursor - '()()'.length + 1,
            };
          });
        }
        break;

      case 'toggleMixedNumberMode':
        // U n/d: turn MIX on/off, and when turning ON, create a blank mixed-number input area.
        if (!mixedNumberMode) {
          setMixedNumberMode(true);
          applyEdit(({ expr, cursor }) => {
            const inserted = insertText(expr, cursor, 'mixed()()()');
            return {
              expr: inserted.expr,
              cursor: inserted.cursor - '()()()'.length + 1,
            };
          });
        } else {
          setMixedNumberMode(false);
        }
        break;

      case 'convertFracMixedNoop':
        // Safe no-op placeholder
        break;

      case 'toggleFracDec':
        // f↔d behavior (minimal useful):
        // - If cursor is inside frac/mixed template, convert that template to a decimal value.
        // - Else if cursor is on/near a decimal number, convert that number into frac/mixed template.
        applyEdit(({ expr, cursor }) => {
          const ctx = findTemplateAtCursor(expr, cursor);
          if (ctx) {
            try {
              const templateExpr = expr.slice(ctx.start, ctx.end);
              const v = evaluateExpression(templateExpr, {
                angleMode,
                ans: lastAnswer,
                variables: memory,
              });
              const s = String(v);
              const nextExpr =
                expr.slice(0, ctx.start) + s + expr.slice(ctx.end);
              return { expr: nextExpr, cursor: ctx.start + s.length };
            } catch {
              return { expr, cursor };
            }
          }

          const seg = findNumberSegmentAtCursor(expr, cursor);
          if (!seg) return { expr, cursor };

          const templ = decimalToFractionTemplate(seg.text, {
            mixed: mixedNumberMode,
            maxDen: 1000,
          });
          if (!templ || templ === seg.text) return { expr, cursor };

          const nextExpr =
            expr.slice(0, seg.start) + templ + expr.slice(seg.end);
          return { expr: nextExpr, cursor: seg.start + templ.length };
        });
        break;

      case 'pi':
        applyEdit(({ expr, cursor }) => insertText(expr, cursor, 'pi'));
        break;

      case 'toggleHypMode':
        setHypMode((prev) => !prev);
        break;

      case 'sin':
      case 'cos':
      case 'tan':
        applyEdit(({ expr, cursor }) => insertText(expr, cursor, `${action}(`));
        break;

      case 'asin':
      case 'acos':
      case 'atan':
        applyEdit(({ expr, cursor }) => insertText(expr, cursor, `${action}(`));
        break;

      case 'power':
        applyEdit(({ expr, cursor }) => insertText(expr, cursor, '^'));
        break;

      case 'insertRoot':
        // Insert x√y template as root(x)(y) so we can render/evaluate cleanly.
        applyEdit(({ expr, cursor }) => {
          const inserted = insertText(expr, cursor, 'root()()');
          // Place cursor inside radicand (first) group.
          return {
            expr: inserted.expr,
            cursor: inserted.cursor - '()()'.length + 1,
          };
        });
        break;

      case 'reciprocal':
        applyEdit(({ expr, cursor }) => applyReciprocal(expr, cursor));
        break;

      case 'insertSqrt':
        applyEdit(({ expr, cursor }) => insertText(expr, cursor, 'sqrt('));
        break;

      case 'leftParen':
        applyEdit(({ expr, cursor }) => insertText(expr, cursor, '('));
        break;

      case 'insertPercent':
        applyEdit(({ expr, cursor }) => insertText(expr, cursor, '%'));
        break;

      case 'rightParen':
        applyEdit(({ expr, cursor }) => insertRightParen(expr, cursor));
        break;

      case 'percentHelperNoop':
        // Safe no-op for now
        break;

      case 'square':
        applyEdit(({ expr, cursor }) => applySquare(expr, cursor));
        break;

      case 'digit':
        applyEdit(({ expr, cursor }) => insertText(expr, cursor, primary));
        break;

      case 'dot':
        applyEdit(({ expr, cursor }) => insertDecimal(expr, cursor));
        break;

      case 'negative':
        applyEdit(({ expr, cursor }) => toggleNegative(expr, cursor));
        break;

      case 'insertAns':
        applyEdit(({ expr, cursor }) =>
          insertText(expr, cursor, lastAnswer ? String(lastAnswer) : '0')
        );
        break;

      case 'sci':
        // x10^n key: internal uses '*' and never literal 'x'
        applyEdit(({ expr, cursor }) => insertText(expr, cursor, '*10^('));
        break;

      case 'variable':
        // Minimal viable: variable x, plus store/recall support.
        if (storeArmed) {
          setMemory((prev) => ({ ...prev, x: lastAnswer }));
          setStoreArmed(false);
          break;
        }
        if (recallArmed) {
          const v = memory?.x;
          applyEdit(({ expr, cursor }) =>
            insertText(expr, cursor, v != null ? String(v) : '0')
          );
          setRecallArmed(false);
          break;
        }
        applyEdit(({ expr, cursor }) => insertText(expr, cursor, 'x'));
        break;

      case 'clearVarsNoop':
        // Minimal acceptable: safe no-op if not implementing variable storage.
        // (We do have a memory map; leave it unchanged for now.)
        break;

      case 'store':
        setStoreArmed(true);
        setRecallArmed(false);
        break;

      case 'recallArm':
        setRecallArmed(true);
        setStoreArmed(false);
        break;

      case 'cursorJump':
        // TODO: Implement cursor navigation
        break;

      case 'cursorLeft':
        setCursorIndex((prev) => Math.max(0, prev - 1));
        break;

      case 'cursorRight':
        setCursorIndex((prev) => Math.min(currentInput.length, prev + 1));
        break;

      case 'evaluate':
        handleEvaluate();
        break;

      case 'divide':
        applyEdit(({ expr, cursor }) =>
          insertOperator(expr, cursor, '/', lastAnswer)
        );
        break;

      case 'toggleConstMode':
        setConstMode((prev) => !prev);
        break;

      case 'multiply':
        applyEdit(({ expr, cursor }) =>
          insertOperator(expr, cursor, '*', lastAnswer)
        );
        break;

      case 'subtract':
        applyEdit(({ expr, cursor }) =>
          insertOperator(expr, cursor, '-', lastAnswer)
        );
        break;

      case 'add':
        applyEdit(({ expr, cursor }) =>
          insertOperator(expr, cursor, '+', lastAnswer)
        );
        break;

      case 'powerOff':
        onClose();
        break;

      case 'resetAll':
        setCurrentInput('');
        setCursorIndex(0);
        setResult('');
        setLastAnswer('0');
        setMemory({});
        setStoreArmed(false);
        setRecallArmed(false);
        setAngleMode('DEG');
        setShowModeMenu(false);
        setShowSettings(false);
        setInsertMode(true);
        setMixedNumberMode(false);
        setHypMode(false);
        setConstMode(false);
        break;

      case 'navUp':
      case 'navDown':
      case 'navLeft':
      case 'navRight':
      case 'navOk':
        // TODO: Implement D-pad navigation
        clearShift();
        break;

      case 'noop':
      default:
        break;
    }
  };

  const handleKeyPress = (keyData) => {
    if (!keyData) return;
    if (keyData.id === 'k_2nd') {
      handleAction('toggleShift2nd', keyData);
      return;
    }

    const actionToRun =
      shift2nd && keyData.secondaryAction
        ? keyData.secondaryAction
        : keyData.action;

    // Special-case trig inverse mapping in 2nd mode.
    if (shift2nd && !keyData.secondaryAction) {
      if (keyData.id === 'k_sin') {
        handleAction('asin', keyData);
        setShift2nd(false);
        return;
      }
      if (keyData.id === 'k_cos') {
        handleAction('acos', keyData);
        setShift2nd(false);
        return;
      }
      if (keyData.id === 'k_tan') {
        handleAction('atan', keyData);
        setShift2nd(false);
        return;
      }
    }

    handleAction(actionToRun, keyData);
    // Global 2nd rule: one-shot.
    setShift2nd(false);
  };

  const handleEvaluate = () => {
    if (!currentInput) return;

    try {
      const computed = evaluateExpression(currentInput, {
        angleMode,
        ans: lastAnswer,
        variables: memory,
      });
      const resultStr = String(computed);
      setResult(resultStr);
      setLastAnswer(resultStr);
      setCurrentInput('');
      setCursorIndex(0);
    } catch (error) {
      setResult('ERR');
    }
  };

  // ============================================================================
  // RENDERING HELPERS
  // ============================================================================

  const renderKey = (keyData) => {
    if (!keyData) {
      // Render invisible placeholder that fills grid cell
      return <div style={{ visibility: 'hidden' }} />;
    }

    const isAccent = keyData.type.includes('accent');
    const isSys = keyData.type.includes('sys');
    const isFn = keyData.type.includes('fn');
    const isNum = keyData.type.includes('num');
    const isOp = keyData.type.includes('op');
    const isNav = keyData.type.includes('nav');

    let bgClass = 'bg-gray-800 hover:bg-gray-700 active:bg-gray-600';
    let textClass = 'text-white';

    if (isAccent) {
      bgClass = 'bg-gray-700 hover:bg-gray-600 active:bg-gray-500';
    } else if (isSys) {
      bgClass = 'bg-gray-600 hover:bg-gray-500 active:bg-gray-400';
    } else if (isFn) {
      bgClass = 'bg-gray-800 hover:bg-gray-700 active:bg-gray-600';
    } else if (isNum) {
      bgClass = 'bg-gray-900 hover:bg-gray-800 active:bg-gray-700';
      textClass = 'text-white font-bold';
    } else if (isOp) {
      bgClass = 'bg-blue-600 hover:bg-blue-500 active:bg-blue-400';
      textClass = 'text-white font-bold';
    } else if (isNav) {
      bgClass = 'bg-gray-700 hover:bg-gray-600 active:bg-gray-500';
    }

    if (isOp) {
      return renderOperatorKey(keyData);
    }

    return (
      <button
        key={keyData.id}
        className={`key ${
          keyData.id === 'k_enter' ? 'key--enter' : ''
        } relative ${bgClass} ${textClass} w-full h-full flex flex-col items-stretch font-medium shadow-sm transition-colors duration-150`}
        style={{
          width: 'var(--u)',
          height: 'var(--rowH)',
          borderRadius: 'calc(var(--rowH) * 0.28)',
          fontSize: isNum ? 'calc(var(--u) * 0.42)' : 'calc(var(--u) * 0.28)',
          paddingTop: keyData.secondary
            ? 'calc(var(--rowH) * 0.10)'
            : 'calc(var(--rowH) * 0.06)',
          paddingBottom: 'calc(var(--rowH) * 0.08)',
        }}
        onMouseDown={(e) => {
          // Keep focus on LCD so keyboard controls the screen.
          e.preventDefault();
          setKbdActive(true);
          lcdRef.current?.focus();
        }}
        onClick={() => handleKeyPress(keyData)}
      >
        {keyData.secondary ? (
          <span
            className="text-green-400 font-normal text-left leading-tight"
            style={{
              fontSize: 'calc(var(--u) * 0.145)',
              minHeight: 'calc(var(--rowH) * 0.28)',
              paddingLeft: 'calc(var(--u) * 0.12)',
              paddingRight: 'calc(var(--u) * 0.08)',
              overflowWrap: 'anywhere',
            }}
          >
            {keyData.secondary}
          </span>
        ) : (
          <span style={{ minHeight: 'calc(var(--rowH) * 0.18)' }} />
        )}
        <span
          className="flex-1 flex items-center justify-center leading-none"
          style={{ lineHeight: 1.05 }}
        >
          {keyData.primary}
        </span>
      </button>
    );
  };

  const renderOperatorKey = (keyData) => {
    return (
      <button
        key={keyData.id}
        className="opKey relative text-white font-bold flex flex-col items-stretch shadow-sm transition-colors duration-150"
        style={{
          fontSize: 'calc(var(--u) * 0.38)',
          paddingTop: keyData.secondary
            ? 'calc(var(--rowH) * 0.10)'
            : 'calc(var(--rowH) * 0.06)',
          paddingBottom: 'calc(var(--rowH) * 0.08)',
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          setKbdActive(true);
          lcdRef.current?.focus();
        }}
        onClick={() => handleKeyPress(keyData)}
      >
        {keyData.secondary ? (
          <span
            className="text-green-400 font-normal text-left leading-tight"
            style={{
              fontSize: 'calc(var(--u) * 0.135)',
              minHeight: 'calc(var(--rowH) * 0.26)',
              paddingLeft: 'calc(var(--u) * 0.12)',
              paddingRight: 'calc(var(--u) * 0.08)',
              overflowWrap: 'anywhere',
            }}
          >
            {keyData.secondary}
          </span>
        ) : (
          <span style={{ minHeight: 'calc(var(--rowH) * 0.18)' }} />
        )}
        <span className="flex-1 flex items-center justify-center leading-none">
          {keyData.primary}
        </span>
      </button>
    );
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  // Build strict 9x5 grid from explicit matrix
  const gridMatrix = KEYPAD_MATRIX_IDS.map((row) =>
    row.map((id) => (id ? KEY_BY_ID.get(id) ?? null : null))
  );

  // Fixed unit-based sizing (NO responsive math)
  const calculatorStyle = {
    '--u': `calc(58px * ${uiScale})`, // Base unit: EVERYTHING derives from this (scaled up to avoid label overlap)
    '--rowH': 'calc(var(--u) * 0.92)', // Key row height
    '--gap': 'calc(var(--u) * 0.22)', // Gap between keys
    '--pad': 'calc(var(--u) * 0.4)', // Interior padding
  };

  // Fixed calculator dimensions
  const shellStyle = {
    width: 'calc(var(--u) * 8.6)', // ~446px (8.6 × 52px)
    // Ensure LCD + full 9x5 keypad fit without flexbox squeezing the LCD
    height: 'calc(var(--u) * 13.4)',
    padding: 'calc(var(--u) * 0.4)',
    borderRadius: 'calc(var(--u) * 0.6)',
  };

  const lcdStyle = {
    height: 'calc(var(--u) * 2)', // Exactly 2 rows tall
    marginBottom: 'calc(var(--u) * 0.4)',
  };

  return (
    <div
      className="fixed z-[9999] select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity,
      }}
      onMouseDown={handleMouseDown}
      ref={calcRootRef}
    >
      <style>{`
        /* TI-30XS Polish CSS */
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .ti30xs-calc .row1 .key {
          width: calc(var(--u) * 0.92);
          /* Reduce effective gap for row 1 by shrinking margins into the grid gap */
          margin-left: calc(var(--gap) * -0.125);
          margin-right: calc(var(--gap) * -0.125);
        }
        /* Fallback targeting first row items even without row class */
        .ti30xs-calc .keypadArea > :nth-child(-n+5) .key {
          width: calc(var(--u) * 0.92);
          margin-left: calc(var(--gap) * -0.125);
          margin-right: calc(var(--gap) * -0.125);
        }
        .ti30xs-calc .row2 .key {
          width: var(--u);
          height: var(--rowH);
        }
        .ti30xs-calc .opKey {
          width: calc(var(--u) * 0.78);
          height: calc(var(--rowH) * 0.92);
          border-radius: calc(var(--rowH) * 0.55);
          background: rgba(60, 70, 85, 0.9);
        }
        .ti30xs-calc .opKey:hover {
          background: rgba(80, 90, 105, 0.95);
        }
        .ti30xs-calc .opKey:active {
          background: rgba(50, 60, 75, 0.85);
        }
        .ti30xs-calc .key--enter {
          width: calc(var(--u) * 1.25);
          justify-self: start;
          border-radius: calc(var(--rowH) * 0.6);
        }
      `}</style>
      {/* Calculator Shell */}
      <div
        className="ti30xs-calc bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl flex flex-col relative"
        style={{
          ...shellStyle,
          ...calculatorStyle,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold z-10"
          aria-label="Close Calculator"
        >
          ×
        </button>

        {/* Settings Toggle */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="absolute top-2 left-2 w-6 h-6 rounded-full bg-gray-600 hover:bg-gray-500 text-white text-xs font-bold z-10"
          aria-label="Settings"
        >
          ⚙
        </button>

        {/* Settings Panel */}
        {showSettings && (
          <div
            className="settings-panel absolute top-12 left-2 bg-gray-700 rounded-lg p-3 shadow-lg z-20"
            data-ti30xs-nodrag
            style={{ width: 'clamp(200px, 30vw, 280px)' }}
          >
            <div className="space-y-2">
              <div>
                <label className="text-white text-xs">Opacity</label>
                <input
                  type="range"
                  min="0.3"
                  max="1"
                  step="0.1"
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-white text-xs">UI Scale</label>
                <input
                  type="range"
                  min="0.8"
                  max="1.8"
                  step="0.1"
                  value={uiScale}
                  onChange={(e) => setUiScale(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Branding */}
        <div
          className="text-center text-gray-400"
          style={{
            fontSize: 'calc(var(--u) * 0.35)',
            fontWeight: 'bold',
            marginBottom: 'calc(var(--u) * 0.3)',
          }}
        >
          TI-30XS
        </div>

        {/* LCD Display */}
        <div
          ref={lcdRef}
          tabIndex={0}
          aria-label="Calculator input"
          data-ti30xs-nodrag
          className="bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={lcdStyle}
          onClick={(e) => {
            lcdRef.current?.focus();
            setKbdActive(true);
            const rect = lcdRef.current?.getBoundingClientRect();
            const clickX = e.clientX - (rect?.left || 0);
            // Approximate cursor position by character width; simplified approach
            const charWidth = 8; // estimate
            const approxIndex = Math.floor(clickX / charWidth);
            // Map display index back to internal index (best-effort)
            let internal = 0;
            let display = 0;
            while (internal < currentInput.length && display < approxIndex) {
              if (currentInput.startsWith('sqrt(', internal)) {
                internal += 5;
                display += 2;
                continue;
              }
              if (currentInput.startsWith('pi', internal)) {
                internal += 2;
                display += 1;
                continue;
              }
              internal += 1;
              display += 1;
            }
            setCursorIndex(
              Math.max(0, Math.min(internal, currentInput.length))
            );
          }}
          onKeyDown={handleLcdKeyDown}
        >
          {/* Dark status bar */}
          <div
            className="bg-black flex items-center justify-between px-2 text-gray-400"
            style={{ height: '18%', fontSize: 'calc(var(--u) * 0.16)' }}
          >
            <span>{angleMode}</span>
            <span className="flex items-center gap-2">
              {shift2nd && <span className="text-green-400">2nd</span>}
              {insertMode && <span>INS</span>}
              {hypMode && <span>HYP</span>}
              {mixedNumberMode && <span>MIX</span>}
              {constMode && <span>K</span>}
              {memoryHasAnyValue && <span>M</span>}
            </span>
          </div>

          {/* LCD content */}
          <div className="bg-green-50 text-gray-900 flex-1 p-2 flex flex-col justify-end relative">
            <div
              style={{
                fontSize: 'calc(var(--u) * 0.24)',
                marginBottom: '2px',
                position: 'relative',
                minHeight: '1.2em',
              }}
            >
              {katexOn ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: renderLatexToHtml(latexInput || '\\;'),
                  }}
                />
              ) : (
                <span>{displayInput || '\u00A0'}</span>
              )}
            </div>
            <div
              style={{
                fontSize: 'calc(var(--u) * 0.36)',
                fontWeight: 'bold',
                textAlign: 'right',
              }}
            >
              {katexOn ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: renderLatexToHtml(latexResult || '\\;'),
                  }}
                />
              ) : (
                <span>{result || '\u00A0'}</span>
              )}
            </div>
          </div>
        </div>

        {/* Mode Menu */}
        {showModeMenu && (
          <div
            className="absolute top-32 left-8 bg-gray-800 rounded-lg p-3 shadow-xl z-30 border border-gray-600"
            data-ti30xs-nodrag
          >
            <div className="text-white text-xs font-bold mb-2">
              Mode Settings
            </div>
            <button
              className={`block w-full text-left px-3 py-1 rounded ${
                angleMode === 'DEG' ? 'bg-blue-600' : 'bg-gray-700'
              } text-white text-xs mb-1`}
              onClick={() => {
                setAngleMode('DEG');
                setShowModeMenu(false);
              }}
            >
              Degrees
            </button>
            <button
              className={`block w-full text-left px-3 py-1 rounded ${
                angleMode === 'RAD' ? 'bg-blue-600' : 'bg-gray-700'
              } text-white text-xs`}
              onClick={() => {
                setAngleMode('RAD');
                setShowModeMenu(false);
              }}
            >
              Radians
            </button>
            <button
              className="block w-full text-center px-3 py-1 rounded bg-gray-600 hover:bg-gray-500 text-white text-xs mt-2"
              onClick={() => {
                setShowModeMenu(false);
              }}
            >
              Close
            </button>
          </div>
        )}

        {/* Keypad Area: single strict 5x9 grid */}
        <div
          className="keypadArea"
          data-ti30xs-nodrag
          style={{
            display: 'grid',
            width: 'fit-content',
            marginLeft: 'auto',
            marginRight: 'auto',
            gridTemplateColumns: 'repeat(5, var(--u))',
            gridTemplateRows: 'repeat(9, var(--rowH))',
            gap: 'var(--gap)',
          }}
        >
          {gridMatrix.map((row, rowIdx) => {
            return row.map((keyData, colIdx) => {
              return (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className={rowIdx === 0 ? 'row1' : rowIdx === 1 ? 'row2' : ''}
                >
                  {renderKey(keyData)}
                </div>
              );
            });
          })}
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
