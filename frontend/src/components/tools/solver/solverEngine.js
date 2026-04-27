// Pure-JS step-by-step solvers for GED-relevant problem classes.
// Each solver returns:
//   { ok: true, steps: [{narration, latex, why?}], answer: string }
// or { ok: false, error: string }
// Exported for both the React UI and the Node-only test harness.

const VAR = 'x';

export function fmt(n) {
  if (!Number.isFinite(n)) return String(n);
  if (Number.isInteger(n)) return String(n);
  return Number(n.toFixed(4)).toString();
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

export function asLatexFraction(num, den) {
  if (den === 0) return '\\text{undefined}';
  if (Number.isInteger(num) && Number.isInteger(den)) {
    if (num % den === 0) return fmt(num / den);
    const g = gcd(num, den);
    let n = num / g;
    let d = den / g;
    if (d < 0) {
      n = -n;
      d = -d;
    }
    return `\\dfrac{${fmt(n)}}{${fmt(d)}}`;
  }
  return fmt(num / den);
}

function parseFractionOrNumber(s) {
  if (/^-?\d+\/\d+$/.test(s)) {
    const [n, d] = s.split('/').map(Number);
    if (d === 0) return null;
    return n / d;
  }
  if (/^-?\d+(\.\d+)?$/.test(s)) {
    return Number(s);
  }
  return null;
}

// Parse "3x - 4 + x/2" → { a, b } such that a*x + b
export function parseLinearSide(side) {
  let s = String(side).replace(/\s+/g, '');
  if (!s) throw new Error('Empty side of equation.');
  if (s[0] !== '+' && s[0] !== '-') s = '+' + s;
  const termRe = /([+-])([^+\-]+)/g;
  let a = 0;
  let b = 0;
  let m;
  while ((m = termRe.exec(s)) !== null) {
    const sign = m[1] === '-' ? -1 : 1;
    const term = m[2];
    if (term.includes(VAR)) {
      let coef = term.replace(VAR, '');
      if (coef === '' || coef === '+') coef = '1';
      else if (coef === '-') coef = '-1';
      // Handle "x/2" → coefficient "1/2", "-x/2" → "1/2" (sign already split off)
      else if (coef.startsWith('/')) coef = '1' + coef;
      const num = parseFractionOrNumber(coef);
      if (num === null) {
        throw new Error(`Could not read coefficient in term "${term}".`);
      }
      a += sign * num;
    } else {
      const num = parseFractionOrNumber(term);
      if (num === null) {
        throw new Error(`Could not read constant "${term}".`);
      }
      b += sign * num;
    }
  }
  return { a, b };
}

function renderLinearSide(side) {
  const parts = [];
  if (side.a !== 0) {
    if (side.a === 1) parts.push('x');
    else if (side.a === -1) parts.push('-x');
    else parts.push(`${fmt(side.a)}x`);
  }
  if (side.b !== 0) {
    if (parts.length === 0) parts.push(fmt(side.b));
    else if (side.b > 0) parts.push(' + ' + fmt(side.b));
    else parts.push(' - ' + fmt(-side.b));
  }
  if (parts.length === 0) parts.push('0');
  return parts.join('');
}

// ── Linear equation ──────────────────────────────────────────────────
export function solveLinearEquation(input) {
  if (typeof input !== 'string' || !input.includes('=')) {
    return { ok: false, error: 'Equation must contain an "=" sign.' };
  }
  const [lhsRaw, rhsRaw] = input.split('=');
  let lhs;
  let rhs;
  try {
    lhs = parseLinearSide(lhsRaw);
    rhs = parseLinearSide(rhsRaw);
  } catch (e) {
    return { ok: false, error: e.message };
  }
  const steps = [
    {
      narration: 'Start with the equation as written.',
      latex: `${renderLinearSide(lhs)} = ${renderLinearSide(rhs)}`,
    },
  ];
  if (rhs.a !== 0) {
    const moved = rhs.a;
    lhs.a -= moved;
    rhs.a = 0;
    steps.push({
      narration:
        moved >= 0
          ? `Subtract ${fmt(moved)}x from both sides to gather x on the left.`
          : `Add ${fmt(-moved)}x to both sides to gather x on the left.`,
      latex: `${renderLinearSide(lhs)} = ${renderLinearSide(rhs)}`,
      why: 'Whatever you do to one side of an equation, you must do to the other so the equality stays balanced.',
    });
  }
  if (lhs.b !== 0) {
    const moved = lhs.b;
    lhs.b = 0;
    rhs.b -= moved;
    steps.push({
      narration:
        moved >= 0
          ? `Subtract ${fmt(moved)} from both sides to isolate the x-term.`
          : `Add ${fmt(-moved)} to both sides to isolate the x-term.`,
      latex: `${renderLinearSide(lhs)} = ${renderLinearSide(rhs)}`,
    });
  }
  if (lhs.a === 0) {
    if (rhs.b === 0) {
      return {
        ok: true,
        answer: 'Infinitely many solutions',
        steps: [
          ...steps,
          {
            narration: 'Both sides reduce to the same thing — every x works.',
            latex: '\\text{Infinitely many solutions}',
          },
        ],
      };
    }
    return {
      ok: true,
      answer: 'No solution',
      steps: [
        ...steps,
        {
          narration: 'No value of x can make the equation true.',
          latex: '\\text{No solution}',
        },
      ],
    };
  }
  const coef = lhs.a;
  const final = rhs.b / coef;
  steps.push({
    narration: `Divide both sides by ${fmt(coef)} to solve for x.`,
    latex: `x = ${asLatexFraction(rhs.b, coef)}`,
    why: 'The coefficient and 1/coefficient cancel, leaving x by itself.',
  });
  if (!Number.isInteger(final)) {
    steps.push({
      narration: 'Convert to a decimal to double-check.',
      latex: `x \\approx ${fmt(final)}`,
    });
  }
  return { ok: true, steps, answer: `x = ${fmt(final)}` };
}

// ── Linear inequality ────────────────────────────────────────────────
const INEQ_OPS = ['<=', '>=', '<', '>'];
function findInequalityOp(s) {
  for (const op of INEQ_OPS) {
    const i = s.indexOf(op);
    if (i !== -1) return { op, index: i };
  }
  return null;
}
function flipOp(op) {
  return { '<': '>', '>': '<', '<=': '>=', '>=': '<=' }[op];
}
function opLatex(op) {
  return { '<': '<', '>': '>', '<=': '\\leq', '>=': '\\geq' }[op];
}

export function solveLinearInequality(input) {
  if (typeof input !== 'string') {
    return { ok: false, error: 'Inequality must be a string.' };
  }
  const found = findInequalityOp(input);
  if (!found) {
    return { ok: false, error: 'Inequality must contain <, >, <= or >=.' };
  }
  const lhsRaw = input.slice(0, found.index);
  const rhsRaw = input.slice(found.index + found.op.length);
  let lhs;
  let rhs;
  try {
    lhs = parseLinearSide(lhsRaw);
    rhs = parseLinearSide(rhsRaw);
  } catch (e) {
    return { ok: false, error: e.message };
  }
  let op = found.op;
  const steps = [
    {
      narration: 'Start with the inequality as written.',
      latex: `${renderLinearSide(lhs)} ${opLatex(op)} ${renderLinearSide(rhs)}`,
    },
  ];
  if (rhs.a !== 0) {
    const moved = rhs.a;
    lhs.a -= moved;
    rhs.a = 0;
    steps.push({
      narration:
        moved >= 0
          ? `Subtract ${fmt(moved)}x from both sides.`
          : `Add ${fmt(-moved)}x to both sides.`,
      latex: `${renderLinearSide(lhs)} ${opLatex(op)} ${renderLinearSide(rhs)}`,
    });
  }
  if (lhs.b !== 0) {
    const moved = lhs.b;
    lhs.b = 0;
    rhs.b -= moved;
    steps.push({
      narration:
        moved >= 0
          ? `Subtract ${fmt(moved)} from both sides.`
          : `Add ${fmt(-moved)} to both sides.`,
      latex: `${renderLinearSide(lhs)} ${opLatex(op)} ${renderLinearSide(rhs)}`,
    });
  }
  if (lhs.a === 0) {
    const trueAlways =
      (op === '<' && 0 < rhs.b) ||
      (op === '<=' && 0 <= rhs.b) ||
      (op === '>' && 0 > rhs.b) ||
      (op === '>=' && 0 >= rhs.b);
    return {
      ok: true,
      answer: trueAlways ? 'All real numbers' : 'No solution',
      steps: [
        ...steps,
        {
          narration: trueAlways
            ? 'The inequality is true for every real number.'
            : 'No value of x makes the inequality true.',
          latex: trueAlways
            ? '\\text{All real numbers}'
            : '\\text{No solution}',
        },
      ],
    };
  }
  const coef = lhs.a;
  if (coef < 0) {
    op = flipOp(op);
    steps.push({
      narration: `Divide both sides by ${fmt(coef)}. Because the divisor is negative, FLIP the inequality sign.`,
      latex: `x ${opLatex(op)} ${asLatexFraction(rhs.b, coef)}`,
      why: 'Multiplying or dividing both sides of an inequality by a negative number reverses the direction.',
    });
  } else {
    steps.push({
      narration: `Divide both sides by ${fmt(coef)} to solve for x.`,
      latex: `x ${opLatex(op)} ${asLatexFraction(rhs.b, coef)}`,
    });
  }
  const final = rhs.b / coef;
  return { ok: true, steps, answer: `x ${op} ${fmt(final)}` };
}

// ── Percent ──────────────────────────────────────────────────────────
export function solvePercent({ kind, percent, part, whole }) {
  if (kind === 'percentOf') {
    const p = Number(percent);
    const w = Number(whole);
    if (!Number.isFinite(p) || !Number.isFinite(w)) {
      return { ok: false, error: 'Both fields must be numbers.' };
    }
    const answer = (p / 100) * w;
    return {
      ok: true,
      answer: fmt(answer),
      steps: [
        {
          narration: `Translate "${fmt(p)}% of ${fmt(w)}" into a math expression.`,
          latex: `\\dfrac{${fmt(p)}}{100} \\times ${fmt(w)}`,
        },
        {
          narration: 'Convert the percent to a decimal by dividing by 100.',
          latex: `${fmt(p / 100)} \\times ${fmt(w)}`,
          why: 'A percent means "out of 100". Dividing by 100 gives the equivalent decimal.',
        },
        { narration: 'Multiply.', latex: `= ${fmt(answer)}` },
      ],
    };
  }
  if (kind === 'isWhatPct') {
    const x = Number(part);
    const y = Number(whole);
    if (!Number.isFinite(x) || !Number.isFinite(y) || y === 0) {
      return {
        ok: false,
        error: 'Both fields must be numbers and the whole cannot be 0.',
      };
    }
    const answer = (x / y) * 100;
    return {
      ok: true,
      answer: `${fmt(answer)}%`,
      steps: [
        {
          narration: `Set up "${fmt(x)} is what percent of ${fmt(y)}?" as part-over-whole.`,
          latex: `\\dfrac{${fmt(x)}}{${fmt(y)}} \\times 100`,
        },
        { narration: 'Divide first.', latex: `${fmt(x / y)} \\times 100` },
        {
          narration: 'Multiply by 100 to convert the decimal to a percent.',
          latex: `= ${fmt(answer)}\\%`,
          why: 'Multiplying by 100 shifts the decimal two places right.',
        },
      ],
    };
  }
  if (kind === 'pctIsX') {
    const p = Number(percent);
    const x = Number(part);
    if (!Number.isFinite(p) || !Number.isFinite(x) || p === 0) {
      return {
        ok: false,
        error: 'Both fields must be numbers and the percent cannot be 0.',
      };
    }
    const answer = x / (p / 100);
    return {
      ok: true,
      answer: fmt(answer),
      steps: [
        {
          narration: `Translate "${fmt(p)}% of WHAT is ${fmt(x)}?" into an equation.`,
          latex: `\\dfrac{${fmt(p)}}{100} \\times W = ${fmt(x)}`,
        },
        {
          narration: `Divide both sides by ${fmt(p / 100)} to isolate W.`,
          latex: `W = \\dfrac{${fmt(x)}}{${fmt(p / 100)}}`,
        },
        { narration: 'Compute.', latex: `W = ${fmt(answer)}` },
      ],
    };
  }
  return { ok: false, error: `Unknown percent kind: ${kind}` };
}

// ── Proportion ───────────────────────────────────────────────────────
export function solveProportion({ a, b, c, d }) {
  const fields = { a, b, c, d };
  const knowns = {};
  let unknownKey = null;
  for (const k of ['a', 'b', 'c', 'd']) {
    const v = fields[k];
    if (v === '' || v === null || v === undefined) {
      if (unknownKey) {
        return { ok: false, error: 'Leave exactly one field blank.' };
      }
      unknownKey = k;
    } else {
      const n = Number(v);
      if (!Number.isFinite(n)) {
        return { ok: false, error: `Field ${k} must be a number.` };
      }
      knowns[k] = n;
    }
  }
  if (!unknownKey) {
    return { ok: false, error: 'Leave one field blank for the unknown.' };
  }
  const fmtField = (k) => (k === unknownKey ? 'x' : fmt(knowns[k]));
  const steps = [
    {
      narration: 'Start with the proportion.',
      latex: `\\dfrac{${fmtField('a')}}{${fmtField('b')}} = \\dfrac{${fmtField('c')}}{${fmtField('d')}}`,
    },
    {
      narration: 'Cross-multiply: the product of opposite corners is equal.',
      latex: `${fmtField('a')} \\cdot ${fmtField('d')} = ${fmtField('b')} \\cdot ${fmtField('c')}`,
      why: 'Two fractions are equal exactly when their cross-products are equal.',
    },
  ];
  let answer;
  let divisor;
  let numerLatex;
  if (unknownKey === 'a') {
    divisor = knowns.d;
    answer = (knowns.b * knowns.c) / divisor;
    numerLatex = `${fmt(knowns.b)} \\cdot ${fmt(knowns.c)}`;
  } else if (unknownKey === 'b') {
    divisor = knowns.c;
    answer = (knowns.a * knowns.d) / divisor;
    numerLatex = `${fmt(knowns.a)} \\cdot ${fmt(knowns.d)}`;
  } else if (unknownKey === 'c') {
    divisor = knowns.b;
    answer = (knowns.a * knowns.d) / divisor;
    numerLatex = `${fmt(knowns.a)} \\cdot ${fmt(knowns.d)}`;
  } else {
    divisor = knowns.a;
    answer = (knowns.b * knowns.c) / divisor;
    numerLatex = `${fmt(knowns.b)} \\cdot ${fmt(knowns.c)}`;
  }
  steps.push({
    narration: `Divide both sides by ${fmt(divisor)} to isolate x.`,
    latex: `x = \\dfrac{${numerLatex}}{${fmt(divisor)}} = ${fmt(answer)}`,
  });
  return { ok: true, steps, answer: `x = ${fmt(answer)}` };
}

// ── Evaluate expression (PEMDAS) ─────────────────────────────────────
export function evaluateExpression(input) {
  if (typeof input !== 'string') {
    return { ok: false, error: 'Expression must be a string.' };
  }
  const cleaned = input.replace(/\s+/g, '');
  if (!/^[\d+\-*/().^]+$/.test(cleaned)) {
    return {
      ok: false,
      error: 'Only digits, decimals, + - * / ^ ( ) are allowed.',
    };
  }
  const jsExpr = cleaned.replace(/\^/g, '**');
  let answer;
  try {
    // eslint-disable-next-line no-new-func
    answer = new Function(`return (${jsExpr});`)();
  } catch (e) {
    return { ok: false, error: `Could not evaluate: ${e.message}` };
  }
  if (typeof answer !== 'number' || !Number.isFinite(answer)) {
    return { ok: false, error: 'Expression did not produce a finite number.' };
  }
  const display = cleaned.replace(/\*/g, ' \\cdot ');
  return {
    ok: true,
    answer: fmt(answer),
    steps: [
      { narration: 'Start with the expression as written.', latex: display },
      {
        narration:
          'Apply order of operations (PEMDAS): parentheses, exponents, multiplication/division, addition/subtraction.',
        latex: `= ${fmt(answer)}`,
        why: 'Evaluate parentheses first, then exponents, then multiplication and division left-to-right, and finally addition and subtraction left-to-right.',
      },
    ],
  };
}
