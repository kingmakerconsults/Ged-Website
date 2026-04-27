/**
 * Tiny spreadsheet formula engine for the MS Excel module.
 * Supports:
 *   - Numbers, strings, parentheses
 *   - + - * / and unary minus
 *   - Cell refs (A1, $A$1, A$1, $A1)
 *   - Ranges (A1:B3)
 *   - Functions: SUM, AVERAGE, MIN, MAX, COUNT, IF, ROUND
 *   - Comparison ops in IF: = <> > < >= <=
 * Out of scope (intentionally): VLOOKUP, INDIRECT, array formulas.
 *
 * Cells: { 'A1': '=SUM(B1:B3)', 'B1': 5, ... }
 * Returns evaluated value (number/string/boolean) or '#ERROR' / '#CIRC'.
 */

const COL_RE = /([A-Z]+)/i;

export function colToIndex(col) {
  let n = 0;
  const s = col.toUpperCase();
  for (let i = 0; i < s.length; i += 1) {
    n = n * 26 + (s.charCodeAt(i) - 64);
  }
  return n - 1;
}

export function indexToCol(idx) {
  let n = idx + 1;
  let s = '';
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function parseRef(ref) {
  // returns { col, row } 0-indexed; ignores $ for evaluation
  const m = /^\$?([A-Z]+)\$?(\d+)$/i.exec(ref.trim());
  if (!m) return null;
  return { col: colToIndex(m[1]), row: parseInt(m[2], 10) - 1 };
}

function refToKey({ col, row }) {
  return `${indexToCol(col)}${row + 1}`;
}

function expandRange(range) {
  const [a, b] = range.split(':').map((s) => s.trim());
  const ra = parseRef(a);
  const rb = parseRef(b);
  if (!ra || !rb) return [];
  const c1 = Math.min(ra.col, rb.col);
  const c2 = Math.max(ra.col, rb.col);
  const r1 = Math.min(ra.row, rb.row);
  const r2 = Math.max(ra.row, rb.row);
  const out = [];
  for (let c = c1; c <= c2; c += 1) {
    for (let r = r1; r <= r2; r += 1) {
      out.push(refToKey({ col: c, row: r }));
    }
  }
  return out;
}

// --------------------------------------------------------------------------
// Tokenizer

function tokenize(src) {
  const toks = [];
  let i = 0;
  const s = src.trim();
  while (i < s.length) {
    const ch = s[i];
    if (ch === ' ' || ch === '\t') {
      i += 1;
      continue;
    }
    if (ch === '"') {
      let j = i + 1;
      let str = '';
      while (j < s.length && s[j] !== '"') {
        str += s[j];
        j += 1;
      }
      toks.push({ type: 'str', val: str });
      i = j + 1;
      continue;
    }
    if (/\d/.test(ch) || (ch === '.' && /\d/.test(s[i + 1] || ''))) {
      let j = i;
      while (j < s.length && /[\d.]/.test(s[j])) j += 1;
      toks.push({ type: 'num', val: parseFloat(s.slice(i, j)) });
      i = j;
      continue;
    }
    if (/[A-Za-z_$]/.test(ch)) {
      let j = i;
      while (j < s.length && /[A-Za-z0-9_$:]/.test(s[j])) j += 1;
      const word = s.slice(i, j);
      // Function call?
      if (s[j] === '(') {
        toks.push({ type: 'func', val: word.toUpperCase() });
      } else if (/^\$?[A-Z]+\$?\d+(:\$?[A-Z]+\$?\d+)?$/i.test(word)) {
        if (word.includes(':')) {
          toks.push({ type: 'range', val: word });
        } else {
          toks.push({ type: 'ref', val: word });
        }
      } else if (/^(TRUE|FALSE)$/i.test(word)) {
        toks.push({ type: 'bool', val: word.toUpperCase() === 'TRUE' });
      } else {
        return [{ type: 'err' }];
      }
      i = j;
      continue;
    }
    if ('+-*/(),'.includes(ch)) {
      toks.push({ type: 'op', val: ch });
      i += 1;
      continue;
    }
    if (ch === '<' || ch === '>' || ch === '=') {
      let op = ch;
      if (s[i + 1] === '=' || (ch === '<' && s[i + 1] === '>')) {
        op += s[i + 1];
        i += 1;
      }
      toks.push({ type: 'cmp', val: op });
      i += 1;
      continue;
    }
    return [{ type: 'err' }];
  }
  return toks;
}

// --------------------------------------------------------------------------
// Pratt-ish parser → AST

function parse(toks) {
  let p = 0;
  function peek() {
    return toks[p];
  }
  function eat(type, val) {
    const t = toks[p];
    if (!t) throw new Error('end');
    if (t.type !== type) throw new Error('type');
    if (val != null && t.val !== val) throw new Error('val');
    p += 1;
    return t;
  }

  function parseAtom() {
    const t = peek();
    if (!t) throw new Error('end');
    if (t.type === 'num' || t.type === 'str' || t.type === 'bool') {
      p += 1;
      return { kind: t.type, val: t.val };
    }
    if (t.type === 'ref') {
      p += 1;
      return { kind: 'ref', val: t.val };
    }
    if (t.type === 'range') {
      p += 1;
      return { kind: 'range', val: t.val };
    }
    if (t.type === 'op' && t.val === '-') {
      p += 1;
      return { kind: 'neg', expr: parseAtom() };
    }
    if (t.type === 'op' && t.val === '+') {
      p += 1;
      return parseAtom();
    }
    if (t.type === 'op' && t.val === '(') {
      p += 1;
      const e = parseExpr();
      eat('op', ')');
      return e;
    }
    if (t.type === 'func') {
      p += 1;
      eat('op', '(');
      const args = [];
      if (!(peek() && peek().type === 'op' && peek().val === ')')) {
        args.push(parseExpr());
        while (peek() && peek().type === 'op' && peek().val === ',') {
          p += 1;
          args.push(parseExpr());
        }
      }
      eat('op', ')');
      return { kind: 'call', name: t.val, args };
    }
    throw new Error('atom');
  }

  function parseMul() {
    let left = parseAtom();
    while (
      peek() &&
      peek().type === 'op' &&
      (peek().val === '*' || peek().val === '/')
    ) {
      const op = peek().val;
      p += 1;
      const right = parseAtom();
      left = { kind: 'bin', op, left, right };
    }
    return left;
  }
  function parseAdd() {
    let left = parseMul();
    while (
      peek() &&
      peek().type === 'op' &&
      (peek().val === '+' || peek().val === '-')
    ) {
      const op = peek().val;
      p += 1;
      const right = parseMul();
      left = { kind: 'bin', op, left, right };
    }
    return left;
  }
  function parseExpr() {
    let left = parseAdd();
    while (peek() && peek().type === 'cmp') {
      const op = peek().val;
      p += 1;
      const right = parseAdd();
      left = { kind: 'cmp', op, left, right };
    }
    return left;
  }

  const out = parseExpr();
  if (p !== toks.length) throw new Error('extra');
  return out;
}

// --------------------------------------------------------------------------
// Evaluation

function num(v) {
  if (v === '' || v == null) return 0;
  if (typeof v === 'number') return v;
  if (typeof v === 'boolean') return v ? 1 : 0;
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : NaN;
}

function evalNode(node, ctx) {
  switch (node.kind) {
    case 'num':
    case 'str':
    case 'bool':
      return node.val;
    case 'neg':
      return -num(evalNode(node.expr, ctx));
    case 'ref':
      return ctx.get(node.val);
    case 'range':
      return expandRange(node.val).map((k) => ctx.get(k));
    case 'bin': {
      const a = num(evalNode(node.left, ctx));
      const b = num(evalNode(node.right, ctx));
      if (Number.isNaN(a) || Number.isNaN(b)) throw new Error('NaN');
      switch (node.op) {
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '*':
          return a * b;
        case '/':
          if (b === 0) throw new Error('div0');
          return a / b;
        default:
          throw new Error('op');
      }
    }
    case 'cmp': {
      const a = evalNode(node.left, ctx);
      const b = evalNode(node.right, ctx);
      const an = num(a);
      const bn = num(b);
      const both = !Number.isNaN(an) && !Number.isNaN(bn);
      switch (node.op) {
        case '=':
          return both ? an === bn : a === b;
        case '<>':
          return both ? an !== bn : a !== b;
        case '>':
          return an > bn;
        case '<':
          return an < bn;
        case '>=':
          return an >= bn;
        case '<=':
          return an <= bn;
        default:
          throw new Error('cmp');
      }
    }
    case 'call': {
      const fn = node.name;
      const flat = [];
      node.args.forEach((a) => {
        const v = evalNode(a, ctx);
        if (Array.isArray(v)) flat.push(...v);
        else flat.push(v);
      });
      switch (fn) {
        case 'SUM':
          return flat.reduce(
            (s, x) => s + (Number.isFinite(num(x)) ? num(x) : 0),
            0
          );
        case 'AVERAGE': {
          const nums = flat.map(num).filter((n) => Number.isFinite(n));
          if (!nums.length) throw new Error('div0');
          return nums.reduce((s, x) => s + x, 0) / nums.length;
        }
        case 'MIN':
          return Math.min(...flat.map(num).filter((n) => Number.isFinite(n)));
        case 'MAX':
          return Math.max(...flat.map(num).filter((n) => Number.isFinite(n)));
        case 'COUNT':
          return flat.map(num).filter((n) => Number.isFinite(n)).length;
        case 'IF': {
          const [cond, t, f] = node.args;
          const c = evalNode(cond, ctx);
          return c ? evalNode(t, ctx) : evalNode(f, ctx);
        }
        case 'ROUND': {
          const [v, d] = flat;
          const dd = Number.isFinite(num(d)) ? num(d) : 0;
          const m = 10 ** dd;
          return Math.round(num(v) * m) / m;
        }
        default:
          throw new Error('unknown fn');
      }
    }
    default:
      throw new Error('node');
  }
}

// --------------------------------------------------------------------------
// Public: evaluate one cell (with cycle detection)

export function evaluateCell(key, cells, stack = new Set()) {
  const raw = cells[key];
  if (raw == null || raw === '') return '';
  if (typeof raw === 'number') return raw;
  const s = String(raw);
  if (!s.startsWith('=')) {
    const n = parseFloat(s);
    return Number.isFinite(n) && String(n) === s.trim() ? n : s;
  }
  if (stack.has(key)) return '#CIRC';
  stack.add(key);
  try {
    const toks = tokenize(s.slice(1));
    if (toks.some((t) => t.type === 'err')) return '#ERROR';
    const ast = parse(toks);
    const ctx = {
      get: (ref) => {
        const r = parseRef(ref);
        if (!r) return 0;
        const k = refToKey(r);
        if (k === key) return '#CIRC';
        return num(evaluateCell(k, cells, stack));
      },
    };
    const v = evalNode(ast, ctx);
    return v;
  } catch (e) {
    return '#ERROR';
  } finally {
    stack.delete(key);
  }
}

export function evaluateAll(cells) {
  const out = {};
  Object.keys(cells).forEach((k) => {
    out[k] = evaluateCell(k, cells);
  });
  return out;
}
