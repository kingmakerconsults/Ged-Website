// Engine utilities for TI-30XS calculator.
// Strict separation:
// - internal expression stores only: + - * / ^ ( ) . digits, identifiers (pi, e, sin, cos, tan, asin, acos, atan, log, ln, sqrt)
// - display maps internal to glyphs: × ÷ π − √

const OPS = new Set(['+', '-', '*', '/', '^']);

function gcdInt(a, b) {
  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x === 0 ? 1 : x;
}

function approxRational(x, maxDen = 1000) {
  if (!Number.isFinite(x)) return null;
  if (maxDen < 1) maxDen = 1;

  const sign = x < 0 ? -1 : 1;
  let v = Math.abs(x);
  if (Number.isInteger(v)) return { num: sign * v, den: 1 };

  // Continued fraction approximation
  let a = Math.floor(v);
  let h1 = 1;
  let k1 = 0;
  let h = a;
  let k = 1;

  let frac = v - a;
  let iter = 0;
  while (k <= maxDen && frac !== 0 && iter < 32) {
    iter++;
    frac = 1 / frac;
    a = Math.floor(frac);

    const h2 = h1;
    const k2 = k1;
    h1 = h;
    k1 = k;
    h = a * h1 + h2;
    k = a * k1 + k2;

    frac = frac - a;
    if (k > maxDen) {
      // rollback to last valid
      h = h1;
      k = k1;
      break;
    }
  }

  if (!k) return null;
  const g = gcdInt(h, k);
  return { num: sign * (h / g), den: k / g };
}

export function decimalToFractionTemplate(
  value,
  { mixed = false, maxDen = 1000 } = {}
) {
  const n = typeof value === 'number' ? value : Number(String(value));
  if (!Number.isFinite(n)) return null;

  // Integers don't need fraction conversion.
  if (Number.isInteger(n)) return String(n);

  const r = approxRational(n, maxDen);
  if (!r) return null;

  const num = Math.trunc(r.num);
  const den = Math.trunc(r.den);
  if (!den) return null;

  if (mixed && Math.abs(n) >= 1) {
    const whole = Math.trunc(num / den);
    const rem = Math.abs(num % den);
    if (rem === 0) return String(whole);
    return `mixed(${whole})(${rem})(${den})`;
  }

  return `frac(${num})(${den})`;
}

function isAlpha(ch) {
  return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
}

function parseBalancedGroup(src, startIndex, strict = true) {
  // Parses a single parenthesized group starting at startIndex (must be '(')
  // Returns { content, endIndex } where endIndex is the index after the closing ')'.
  if (src[startIndex] !== '(') {
    throw new Error('Expected (');
  }
  let depth = 0;
  let i = startIndex;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (ch === '(') depth++;
    else if (ch === ')') {
      depth--;
      if (depth === 0) {
        const content = src.slice(startIndex + 1, i);
        return { content, endIndex: i + 1 };
      }
    }
  }
  if (strict) throw new Error('Mismatched parentheses');
  // Non-strict: treat end of string as closing paren
  const content = src.slice(startIndex + 1);
  return { content, endIndex: src.length };
}

function normalizeTemplatePart(s) {
  const t = String(s ?? '').trim();
  return t.length ? t : '0';
}

export function expandTemplates(expr) {
  // Expands template-style constructs into pure arithmetic so evaluation can proceed.
  // Supported:
  // - frac(NUM)(DEN)  => ((NUM)/(DEN))
  // - mixed(W)(N)(D)  => ((W)+((N)/(D)))
  // - root(X)(Y)      => ((X)^(1/(Y)))   (with empty Y -> 2)
  if (typeof expr !== 'string' || expr.length === 0) return expr;

  let out = '';
  let i = 0;

  while (i < expr.length) {
    if (expr.startsWith('frac', i) && expr[i + 4] === '(') {
      const g1 = parseBalancedGroup(expr, i + 4);
      const after1 = g1.endIndex;
      if (expr[after1] !== '(') {
        // Not the template form; leave as-is.
        out += 'frac';
        i += 4;
        continue;
      }
      const g2 = parseBalancedGroup(expr, after1);
      const num = normalizeTemplatePart(expandTemplates(g1.content));
      const den = normalizeTemplatePart(expandTemplates(g2.content));
      out += `((${num})/(${den}))`;
      i = g2.endIndex;
      continue;
    }

    if (expr.startsWith('mixed', i) && expr[i + 5] === '(') {
      const gW = parseBalancedGroup(expr, i + 5);
      const afterW = gW.endIndex;
      if (expr[afterW] !== '(') {
        out += 'mixed';
        i += 5;
        continue;
      }
      const gN = parseBalancedGroup(expr, afterW);
      const afterN = gN.endIndex;
      if (expr[afterN] !== '(') {
        out += 'mixed';
        i += 5;
        continue;
      }
      const gD = parseBalancedGroup(expr, afterN);

      const whole = normalizeTemplatePart(expandTemplates(gW.content));
      const num = normalizeTemplatePart(expandTemplates(gN.content));
      const den = normalizeTemplatePart(expandTemplates(gD.content));
      out += `((${whole})+((${num})/(${den})))`;
      i = gD.endIndex;
      continue;
    }

    if (expr.startsWith('root', i) && expr[i + 4] === '(') {
      const gX = parseBalancedGroup(expr, i + 4);
      const afterX = gX.endIndex;
      if (expr[afterX] !== '(') {
        // root(x) legacy call; do not rewrite.
        out += 'root';
        i += 4;
        continue;
      }
      const gY = parseBalancedGroup(expr, afterX);
      const x = normalizeTemplatePart(expandTemplates(gX.content));
      const yRaw = String(gY.content ?? '').trim();
      const y = yRaw.length
        ? normalizeTemplatePart(expandTemplates(yRaw))
        : '2';
      out += `((${x})^(1/(${y})))`;
      i = gY.endIndex;
      continue;
    }

    out += expr[i];
    i++;
  }

  return out;
}

function escapeLatexText(ch) {
  // Minimal escape for KaTeX text context.
  switch (ch) {
    case '#':
    case '$':
    case '%':
    case '&':
    case '_':
    case '{':
    case '}':
      return `\\${ch}`;
    case '\\':
      return `\\textbackslash{}`;
    default:
      return ch;
  }
}

function atomToLatex(src, startIndex, caretIndex) {
  // Parses a single "atom" starting at startIndex.
  // Returns { latex, endIndex }.
  const ch = src[startIndex];

  if (ch === '|') {
    return { latex: '\\color{#6B7280}{\\vert}', endIndex: startIndex + 1 };
  }

  if (isDigit(ch) || ch === '.') {
    let j = startIndex;
    while (j < src.length && (isDigit(src[j]) || src[j] === '.')) j++;
    return { latex: src.slice(startIndex, j), endIndex: j };
  }

  if (ch === '(') {
    const g = parseBalancedGroup(src, startIndex, false);
    return {
      latex: `(${segmentToLatex(g.content, caretIndex - (startIndex + 1))})`,
      endIndex: g.endIndex,
    };
  }

  if (isAlpha(ch)) {
    let j = startIndex;
    while (
      j < src.length &&
      (isAlpha(src[j]) || src[j] === '⁻' || src[j] === '¹')
    )
      j++;
    const ident = src.slice(startIndex, j);

    // template forms
    if (ident === 'frac' && src[j] === '(') {
      const g1 = parseBalancedGroup(src, j, false);
      const g2 =
        src[g1.endIndex] === '('
          ? parseBalancedGroup(src, g1.endIndex, false)
          : null;
      if (!g2) {
        return { latex: 'frac', endIndex: j };
      }
      const numLatex = segmentToLatex(g1.content, caretIndex - (j + 1));
      const denLatex = segmentToLatex(
        g2.content,
        caretIndex - (g1.endIndex + 1)
      );
      return {
        latex: `\\frac{${numLatex || '0'}}{${denLatex || '0'}}`,
        endIndex: g2.endIndex,
      };
    }

    if (ident === 'mixed' && src[j] === '(') {
      const gW = parseBalancedGroup(src, j, false);
      const gN =
        src[gW.endIndex] === '('
          ? parseBalancedGroup(src, gW.endIndex, false)
          : null;
      const gD =
        gN && src[gN.endIndex] === '('
          ? parseBalancedGroup(src, gN.endIndex, false)
          : null;
      if (!gN || !gD) {
        return { latex: 'mixed', endIndex: j };
      }
      const wLatex = segmentToLatex(gW.content, caretIndex - (j + 1));
      const nLatex = segmentToLatex(gN.content, caretIndex - (gW.endIndex + 1));
      const dLatex = segmentToLatex(gD.content, caretIndex - (gN.endIndex + 1));
      return {
        latex: `${wLatex || '0'}\\,\\frac{${nLatex || '0'}}{${dLatex || '0'}}`,
        endIndex: gD.endIndex,
      };
    }

    if (ident === 'root' && src[j] === '(') {
      const gX = parseBalancedGroup(src, j, false);
      const gY =
        src[gX.endIndex] === '('
          ? parseBalancedGroup(src, gX.endIndex, false)
          : null;
      if (!gY) {
        // legacy root(x)
        const xLatex = segmentToLatex(gX.content, caretIndex - (j + 1));
        return { latex: `\\sqrt{${xLatex || '0'}}`, endIndex: gX.endIndex };
      }
      const xLatex = segmentToLatex(gX.content, caretIndex - (j + 1));
      const yLatex = segmentToLatex(gY.content, caretIndex - (gX.endIndex + 1));
      return {
        latex: `\\sqrt[${yLatex || '2'}]{${xLatex || '0'}}`,
        endIndex: gY.endIndex,
      };
    }

    if (ident === 'pi') return { latex: '\\pi', endIndex: j };
    if (ident === 'ans' || ident === 'Ans')
      return { latex: '\\mathrm{Ans}', endIndex: j };

    // function calls (sqrt, sin, ...)
    if (src[j] === '(') {
      const g = parseBalancedGroup(src, j, false);
      const argLatex = segmentToLatex(g.content, caretIndex - (j + 1));
      if (ident === 'sqrt') {
        return { latex: `\\sqrt{${argLatex || '0'}}`, endIndex: g.endIndex };
      }
      const fn =
        ident === 'asin'
          ? '\\sin^{-1}'
          : ident === 'acos'
          ? '\\cos^{-1}'
          : ident === 'atan'
          ? '\\tan^{-1}'
          : ident;
      return {
        latex: `\\${fn}(${argLatex})`,
        endIndex: g.endIndex,
      };
    }

    // plain identifier
    return { latex: `\\mathrm{${ident}}`, endIndex: j };
  }

  // operators / misc single chars
  switch (ch) {
    case '*':
      return { latex: '\\times', endIndex: startIndex + 1 };
    case '/':
      return { latex: '/', endIndex: startIndex + 1 };
    case '^':
      return { latex: '^', endIndex: startIndex + 1 };
    default:
      return { latex: escapeLatexText(ch), endIndex: startIndex + 1 };
  }
}

function segmentToLatex(segment, caretIndexInSegment) {
  const src = segment;
  let i = 0;
  let latex = '';

  while (i < src.length) {
    const { latex: atom, endIndex } = atomToLatex(src, i, caretIndexInSegment);
    latex += atom;
    i = endIndex;

    // Handle exponent binding: convert "base^atom" into "base^{atom}".
    // This is a light pass: when we see '^' in output stream, rewrite using the next atom.
    if (i < src.length && src[i] === '^') {
      // emit caret marker inside exponent if it lands there
      i += 1;
      const next = atomToLatex(src, i, caretIndexInSegment);
      latex += `^{${next.latex}}`;
      i = next.endIndex;
    }
  }

  // If caret is exactly at end, show caret at end.
  if (caretIndexInSegment === src.length) {
    latex += '\\color{#6B7280}{\\vert}';
  }

  return latex;
}

export function exprToLatex(expr, cursorIndex = null) {
  if (typeof expr !== 'string') return '';
  const cursor =
    typeof cursorIndex === 'number' ? clampCursor(expr, cursorIndex) : null;
  const src =
    cursor == null ? expr : expr.slice(0, cursor) + '|' + expr.slice(cursor);
  return segmentToLatex(src, cursor == null ? -1 : cursor);
}

export function isDigit(ch) {
  return ch >= '0' && ch <= '9';
}

export function isNumberChar(ch) {
  return isDigit(ch) || ch === '.';
}

export function clampCursor(expr, cursor) {
  return Math.max(0, Math.min(cursor, expr.length));
}

export function backspaceToken(expr, cursor) {
  cursor = clampCursor(expr, cursor);
  if (cursor === 0) return { expr, cursor };

  // Treat "pi" as a single token for deletion.
  if (cursor >= 2 && expr.slice(cursor - 2, cursor) === 'pi') {
    return {
      expr: expr.slice(0, cursor - 2) + expr.slice(cursor),
      cursor: cursor - 2,
    };
  }

  return {
    expr: expr.slice(0, cursor - 1) + expr.slice(cursor),
    cursor: cursor - 1,
  };
}

export function deleteForwardToken(expr, cursor) {
  cursor = clampCursor(expr, cursor);
  if (cursor >= expr.length) return { expr, cursor };

  if (expr.slice(cursor, cursor + 2) === 'pi') {
    return { expr: expr.slice(0, cursor) + expr.slice(cursor + 2), cursor };
  }

  return { expr: expr.slice(0, cursor) + expr.slice(cursor + 1), cursor };
}

export function insertText(expr, cursor, text) {
  cursor = clampCursor(expr, cursor);
  const nextExpr = expr.slice(0, cursor) + text + expr.slice(cursor);
  return { expr: nextExpr, cursor: cursor + text.length };
}

function findNumberSegment(expr, cursor) {
  // Returns [start,end] of number segment that cursor is inside or adjacent to.
  cursor = clampCursor(expr, cursor);

  let left = cursor;
  while (left > 0 && isNumberChar(expr[left - 1])) left--;

  let right = cursor;
  while (right < expr.length && isNumberChar(expr[right])) right++;

  return { start: left, end: right };
}

export function insertDecimal(expr, cursor) {
  const { start, end } = findNumberSegment(expr, cursor);
  const seg = expr.slice(start, end);
  if (seg.includes('.')) return { expr, cursor };

  // If segment is empty, insert leading 0.
  if (seg.length === 0) {
    return insertText(expr, cursor, '0.');
  }

  return insertText(expr, cursor, '.');
}

export function insertRightParen(expr, cursor) {
  cursor = clampCursor(expr, cursor);
  const before = expr.slice(0, cursor);
  const open = (before.match(/\(/g) || []).length;
  const close = (before.match(/\)/g) || []).length;
  if (open <= close) return { expr, cursor };

  const prev = cursor > 0 ? expr[cursor - 1] : '';
  if (prev === '(' || OPS.has(prev)) return { expr, cursor };

  return insertText(expr, cursor, ')');
}

export function insertOperator(expr, cursor, op, ansValue = '') {
  cursor = clampCursor(expr, cursor);

  const prev = cursor > 0 ? expr[cursor - 1] : '';
  const needsAns = expr.length === 0 && ansValue && op !== '-';
  if (needsAns) {
    return insertText(expr, cursor, `${ansValue}${op}`);
  }

  // If inserting '-', allow unary minus at start/after operator/(
  if (op === '-') {
    if (cursor === 0) return insertText(expr, cursor, '-');
    if (prev === '(' || OPS.has(prev)) return insertText(expr, cursor, '-');
    return insertText(expr, cursor, '-');
  }

  // For other operators, avoid duplicates like "++"; replace if previous is operator.
  if (cursor > 0 && OPS.has(prev)) {
    const nextExpr = expr.slice(0, cursor - 1) + op + expr.slice(cursor);
    return { expr: nextExpr, cursor };
  }

  return insertText(expr, cursor, op);
}

function isUnaryContext(expr, index) {
  // index is position of '-' in string.
  if (index === 0) return true;
  const prev = expr[index - 1];
  return prev === '(' || OPS.has(prev);
}

export function toggleNegative(expr, cursor) {
  cursor = clampCursor(expr, cursor);

  // If inside/adjacent to a number, toggle sign of that number segment.
  const { start, end } = findNumberSegment(expr, cursor);
  if (end > start) {
    // Determine if there is a unary '-' directly before the segment.
    if (
      start > 0 &&
      expr[start - 1] === '-' &&
      isUnaryContext(expr, start - 1)
    ) {
      // Remove the unary '-'
      const nextExpr = expr.slice(0, start - 1) + expr.slice(start);
      const nextCursor = cursor > start - 1 ? cursor - 1 : cursor;
      return { expr: nextExpr, cursor: clampCursor(nextExpr, nextCursor) };
    }

    // Insert unary '-' before the segment
    const nextExpr = expr.slice(0, start) + '-' + expr.slice(start);
    const nextCursor = cursor >= start ? cursor + 1 : cursor;
    return { expr: nextExpr, cursor: clampCursor(nextExpr, nextCursor) };
  }

  // Otherwise toggle a unary '-' at the cursor position.
  if (
    cursor < expr.length &&
    expr[cursor] === '-' &&
    isUnaryContext(expr, cursor)
  ) {
    return { expr: expr.slice(0, cursor) + expr.slice(cursor + 1), cursor };
  }
  if (
    cursor > 0 &&
    expr[cursor - 1] === '-' &&
    isUnaryContext(expr, cursor - 1)
  ) {
    return {
      expr: expr.slice(0, cursor - 1) + expr.slice(cursor),
      cursor: cursor - 1,
    };
  }

  return insertText(expr, cursor, '-');
}

function findPrevOperandRange(expr, cursor) {
  cursor = clampCursor(expr, cursor);
  if (cursor === 0) return null;

  let end = cursor;

  // If immediately after a right paren, grab the whole group.
  if (expr[end - 1] === ')') {
    let depth = 0;
    for (let i = end - 1; i >= 0; i--) {
      if (expr[i] === ')') depth++;
      else if (expr[i] === '(') {
        depth--;
        if (depth === 0) return { start: i, end };
      }
    }
    return null;
  }

  // "pi" token
  if (end >= 2 && expr.slice(end - 2, end) === 'pi') {
    return { start: end - 2, end };
  }

  // number segment
  let start = end;
  while (start > 0 && isNumberChar(expr[start - 1])) start--;
  if (start !== end) {
    // include unary '-'
    if (
      start > 0 &&
      expr[start - 1] === '-' &&
      isUnaryContext(expr, start - 1)
    ) {
      start--;
    }
    return { start, end };
  }

  // single-letter identifiers (x, y, z, e)
  const ch = expr[end - 1];
  if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
    return { start: end - 1, end };
  }

  return null;
}

export function applySquare(expr, cursor) {
  const range = findPrevOperandRange(expr, cursor);
  if (!range) return { expr, cursor };
  const before = expr.slice(0, range.end);
  const after = expr.slice(range.end);
  const nextExpr = before + '^2' + after;
  return { expr: nextExpr, cursor: cursor + 2 };
}

export function applyReciprocal(expr, cursor) {
  const range = findPrevOperandRange(expr, cursor);
  if (!range) return { expr, cursor };

  const operand = expr.slice(range.start, range.end);
  const wrapped = `1/(${operand})`;
  const nextExpr = expr.slice(0, range.start) + wrapped + expr.slice(range.end);
  const delta = wrapped.length - operand.length;
  return { expr: nextExpr, cursor: clampCursor(nextExpr, cursor + delta) };
}

export function toDisplay(expr) {
  // Map internal to display glyphs.
  // Keep function names as-is; only swap operator glyphs and constants.
  return expr
    .replace(/sqrt\(/g, '√(')
    .replace(/pi/g, 'π')
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
    .replace(/-/g, '−');
}

export function autoCloseParens(expr) {
  const open = (expr.match(/\(/g) || []).length;
  const close = (expr.match(/\)/g) || []).length;
  if (open <= close) return expr;
  return expr + ')'.repeat(open - close);
}

export function evaluateExpression(
  expr,
  { angleMode = 'DEG', ans = 0, variables = {} } = {}
) {
  const expanded = expandTemplates(expr);
  const normalized = autoCloseParens(expanded);
  const tokens = tokenize(normalized);
  const rpn = toRpn(tokens);
  return evalRpn(rpn, { angleMode, ans, variables });
}

function tokenize(expr) {
  const tokens = [];
  let i = 0;

  const pushOp = (op) => tokens.push({ type: 'op', value: op });

  while (i < expr.length) {
    const ch = expr[i];

    if (ch === ' ') {
      i++;
      continue;
    }

    if (isDigit(ch) || ch === '.') {
      let j = i;
      while (j < expr.length && (isDigit(expr[j]) || expr[j] === '.')) j++;
      const raw = expr.slice(i, j);
      if (raw === '.') throw new Error('Invalid number');
      tokens.push({ type: 'num', value: Number(raw) });
      i = j;
      continue;
    }

    if (ch === '(' || ch === ')') {
      tokens.push({ type: 'paren', value: ch });
      i++;
      continue;
    }

    if (ch === '%') {
      tokens.push({ type: 'op', value: 'pct' });
      i++;
      continue;
    }

    if (OPS.has(ch)) {
      // unary minus
      if (ch === '-') {
        const prevTok = tokens[tokens.length - 1];
        const isUnary =
          !prevTok ||
          prevTok.type === 'op' ||
          (prevTok.type === 'paren' && prevTok.value === '(');
        pushOp(isUnary ? 'u-' : '-');
      } else {
        pushOp(ch);
      }
      i++;
      continue;
    }

    if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
      let j = i;
      while (
        j < expr.length &&
        ((expr[j] >= 'a' && expr[j] <= 'z') ||
          (expr[j] >= 'A' && expr[j] <= 'Z') ||
          expr[j] === '⁻')
      )
        j++;

      // Handle special inverse trig spelling from UI: "sin⁻¹" etc.
      let ident = expr.slice(i, j);
      ident = ident
        .replace('sin⁻¹', 'asin')
        .replace('cos⁻¹', 'acos')
        .replace('tan⁻¹', 'atan');

      // If followed by '(' it is a function.
      if (expr[j] === '(') {
        tokens.push({ type: 'fn', value: ident });
        i = j;
        continue;
      }

      tokens.push({ type: 'id', value: ident });
      i = j;
      continue;
    }

    throw new Error(`Unexpected character: ${ch}`);
  }

  return tokens;
}

function precedence(op) {
  switch (op) {
    case 'pct':
      return 6;
    case 'u-':
      return 5;
    case '^':
      return 4;
    case '*':
    case '/':
      return 3;
    case '+':
    case '-':
      return 2;
    default:
      return 0;
  }
}

function isRightAssociative(op) {
  return op === '^' || op === 'u-';
}

function toRpn(tokens) {
  const out = [];
  const stack = [];

  for (let idx = 0; idx < tokens.length; idx++) {
    const t = tokens[idx];

    if (t.type === 'num' || t.type === 'id') {
      out.push(t);
      continue;
    }

    if (t.type === 'fn') {
      stack.push(t);
      continue;
    }

    if (t.type === 'op') {
      while (stack.length) {
        const top = stack[stack.length - 1];
        if (top.type === 'op') {
          const pTop = precedence(top.value);
          const pCur = precedence(t.value);
          if (
            (isRightAssociative(t.value) && pCur < pTop) ||
            (!isRightAssociative(t.value) && pCur <= pTop)
          ) {
            out.push(stack.pop());
            continue;
          }
        }
        if (top.type === 'fn') {
          out.push(stack.pop());
          continue;
        }
        break;
      }
      stack.push(t);
      continue;
    }

    if (t.type === 'paren' && t.value === '(') {
      stack.push(t);
      continue;
    }

    if (t.type === 'paren' && t.value === ')') {
      while (
        stack.length &&
        !(
          stack[stack.length - 1].type === 'paren' &&
          stack[stack.length - 1].value === '('
        )
      ) {
        out.push(stack.pop());
      }
      if (!stack.length) throw new Error('Mismatched parentheses');
      stack.pop(); // pop '('
      if (stack.length && stack[stack.length - 1].type === 'fn') {
        out.push(stack.pop());
      }
      continue;
    }

    throw new Error('Invalid token');
  }

  while (stack.length) {
    const t = stack.pop();
    if (t.type === 'paren') throw new Error('Mismatched parentheses');
    out.push(t);
  }

  return out;
}

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

function evalFn(name, x, ctx) {
  switch (name) {
    case 'sin':
      return Math.sin(ctx.angleMode === 'DEG' ? degToRad(x) : x);
    case 'cos':
      return Math.cos(ctx.angleMode === 'DEG' ? degToRad(x) : x);
    case 'tan':
      return Math.tan(ctx.angleMode === 'DEG' ? degToRad(x) : x);
    case 'asin': {
      const v = Math.asin(x);
      return ctx.angleMode === 'DEG' ? radToDeg(v) : v;
    }
    case 'acos': {
      const v = Math.acos(x);
      return ctx.angleMode === 'DEG' ? radToDeg(v) : v;
    }
    case 'atan': {
      const v = Math.atan(x);
      return ctx.angleMode === 'DEG' ? radToDeg(v) : v;
    }
    case 'log':
      return Math.log10(x);
    case 'ln':
      return Math.log(x);
    case 'sqrt':
      return Math.sqrt(x);
    case 'root':
      // Minimal acceptable: root(x) behaves like sqrt(x)
      return Math.sqrt(x);
    default:
      throw new Error(`Unknown function: ${name}`);
  }
}

function evalRpn(rpn, { angleMode, ans, variables }) {
  const stack = [];
  const ctx = { angleMode };

  for (const t of rpn) {
    if (t.type === 'num') {
      stack.push(t.value);
      continue;
    }

    if (t.type === 'id') {
      const id = t.value;
      if (id === 'pi') {
        stack.push(Math.PI);
        continue;
      }
      if (id === 'e') {
        stack.push(Math.E);
        continue;
      }
      if (id === 'ans' || id === 'Ans') {
        stack.push(Number(ans));
        continue;
      }
      if (id in variables) {
        stack.push(Number(variables[id]));
        continue;
      }
      // Unknown identifiers are treated as 0 to avoid crashing placeholders.
      stack.push(0);
      continue;
    }

    if (t.type === 'fn') {
      if (stack.length < 1) throw new Error('Missing function arg');
      const x = stack.pop();
      stack.push(evalFn(t.value, x, ctx));
      continue;
    }

    if (t.type === 'op') {
      if (t.value === 'u-') {
        if (stack.length < 1) throw new Error('Missing unary arg');
        stack.push(-stack.pop());
        continue;
      }
      if (t.value === 'pct') {
        if (stack.length < 1) throw new Error('Missing percent arg');
        stack.push(stack.pop() / 100);
        continue;
      }
      if (stack.length < 2) throw new Error('Missing operands');
      const b = stack.pop();
      const a = stack.pop();
      switch (t.value) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          stack.push(a / b);
          break;
        case '^':
          stack.push(a ** b);
          break;
        default:
          throw new Error(`Unknown op: ${t.value}`);
      }
      continue;
    }

    throw new Error('Invalid RPN token');
  }

  if (stack.length !== 1) throw new Error('Invalid expression');
  return stack[0];
}
