import assert from 'node:assert/strict';
import {
  applyReciprocal,
  backspaceToken,
  decimalToFractionTemplate,
  evaluateExpression,
  exprToLatex,
  insertDecimal,
  insertOperator,
  insertRightParen,
  insertText,
  toDisplay,
  toggleNegative,
} from '../frontend/components/ti30xsEngine.js';

function approxEqual(a, b, tol = 1e-6) {
  return Math.abs(a - b) <= tol;
}

function run(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (e) {
    console.error(`FAIL ${name}`);
    console.error(e);
    process.exitCode = 1;
  }
}

// 1) × inserts "*" exactly once; never "x"; never repeats.
run('multiply inserts * once', () => {
  let expr = '';
  let cursor = 0;
  ({ expr, cursor } = insertText(expr, cursor, '2'));
  ({ expr, cursor } = insertOperator(expr, cursor, '*'));
  assert.equal(expr, '2*');
  assert.ok(!expr.includes('x'));
});

// 2) ÷ inserts "/" and displays "÷".
run('divide inserts / and display shows ÷', () => {
  let expr = '';
  let cursor = 0;
  ({ expr, cursor } = insertText(expr, cursor, '8'));
  ({ expr, cursor } = insertOperator(expr, cursor, '/'));
  ({ expr, cursor } = insertText(expr, cursor, '2'));
  assert.equal(expr, '8/2');
  assert.equal(toDisplay(expr), '8÷2');
});

// 3) (-) then 4 => "-4"; toggles back to "4".
run('negative toggles sign correctly', () => {
  let expr = '';
  let cursor = 0;
  ({ expr, cursor } = toggleNegative(expr, cursor));
  ({ expr, cursor } = insertText(expr, cursor, '4'));
  assert.equal(expr, '-4');
  ({ expr, cursor } = toggleNegative(expr, cursor));
  assert.equal(expr, '4');
});

// 4) decimal rules
run('decimal insertion avoids double decimals', () => {
  let expr = '';
  let cursor = 0;
  ({ expr, cursor } = insertDecimal(expr, cursor));
  ({ expr, cursor } = insertText(expr, cursor, '4'));
  assert.equal(expr, '0.4');

  expr = '1.';
  cursor = expr.length;
  ({ expr, cursor } = insertDecimal(expr, cursor));
  assert.equal(expr, '1.');
});

// 5) parentheses: (2+3)*4 => 20
run('parentheses evaluate', () => {
  const v = evaluateExpression('(2+3)*4', { angleMode: 'DEG' });
  assert.equal(v, 20);
});

// 6) exponent: 2^3 => 8
run('exponent evaluate', () => {
  const v = evaluateExpression('2^3', { angleMode: 'DEG' });
  assert.equal(v, 8);
});

run('sqrt function works', () => {
  const v = evaluateExpression('sqrt(9)', { angleMode: 'DEG' });
  assert.equal(v, 3);
});

run('sqrt auto-closes paren', () => {
  const v = evaluateExpression('sqrt(100', { angleMode: 'DEG' });
  assert.equal(v, 10);
});

run('percent postfix works', () => {
  assert.ok(
    approxEqual(evaluateExpression('50%', { angleMode: 'DEG' }), 0.5, 1e-12)
  );
  assert.ok(
    approxEqual(evaluateExpression('200*10%', { angleMode: 'DEG' }), 20, 1e-12)
  );
});

run('root() alias works', () => {
  assert.equal(evaluateExpression('root(9)', { angleMode: 'DEG' }), 3);
});

// 6b) fraction/mixed templates evaluate
run('frac(num)(den) evaluates', () => {
  assert.ok(
    approxEqual(evaluateExpression('frac(1)(2)', { angleMode: 'DEG' }), 0.5)
  );
});

run('mixed(whole)(num)(den) evaluates', () => {
  assert.ok(
    approxEqual(evaluateExpression('mixed(3)(1)(2)', { angleMode: 'DEG' }), 3.5)
  );
});

run('root(x)(y) template evaluates as nth-root', () => {
  // sqrt[2]{9} = 3
  assert.ok(
    approxEqual(
      evaluateExpression('root(9)(2)', { angleMode: 'DEG' }),
      3,
      1e-12
    )
  );
});

// 6c) LaTeX conversion sanity
run('LaTeX: exponent renders as braces', () => {
  assert.ok(exprToLatex('5^6').includes('5^{6}'));
});

run('LaTeX: fraction renders as \\frac', () => {
  const latex = exprToLatex('frac(1)(2)');
  assert.ok(latex.includes('\\frac{1}{2}'));
});

run('LaTeX: mixed renders as whole + \\frac', () => {
  const latex = exprToLatex('mixed(3)(1)(2)');
  assert.ok(latex.includes('3\\,\\frac{1}{2}'));
});

run('LaTeX: pi and multiply render', () => {
  const latex = exprToLatex('pi*2');
  assert.ok(latex.includes('\\pi'));
  assert.ok(latex.includes('\\times'));
});

run('decimalToFractionTemplate converts decimals to frac()', () => {
  assert.equal(decimalToFractionTemplate('0.5'), 'frac(1)(2)');
  assert.equal(decimalToFractionTemplate('-0.25'), 'frac(-1)(4)');
});

run('decimalToFractionTemplate supports mixed numbers', () => {
  assert.equal(
    decimalToFractionTemplate('3.5', { mixed: true }),
    'mixed(3)(1)(2)'
  );
  assert.equal(
    decimalToFractionTemplate('-2.25', { mixed: true }),
    'mixed(-2)(1)(4)'
  );
});

// 7) trig DEG: sin(30) ≈ 0.5
run('trig DEG sin(30)', () => {
  const v = evaluateExpression('sin(30)', { angleMode: 'DEG' });
  assert.ok(approxEqual(v, 0.5, 1e-4));
});

// 8) pi: pi*2 ≈ 6.283...
run('pi constant', () => {
  const v = evaluateExpression('pi*2', { angleMode: 'DEG' });
  assert.ok(approxEqual(v, 2 * Math.PI, 1e-6));
  assert.equal(toDisplay('pi*2'), 'π×2');
});

// 9) deletion/cursor: "123" left twice, backspace removes correct digit.
run('backspace respects cursor', () => {
  let expr = '123';
  let cursor = 3;
  cursor -= 2; // move left twice => cursor at 1 (between 1 and 2)
  ({ expr, cursor } = backspaceToken(expr, cursor));
  assert.equal(expr, '23');
  assert.equal(cursor, 0);
});

// 10) clear resets expression but keeps mode (engine doesn’t own mode; just sanity check eval independent)
run('engine evaluate independent of mode storage', () => {
  assert.equal(evaluateExpression('1+2', { angleMode: 'DEG' }), 3);
  assert.equal(evaluateExpression('1+2', { angleMode: 'RAD' }), 3);
});

// 11) 2nd then sin => asin( is handled by evaluator
run('asin works', () => {
  const v = evaluateExpression('asin(0.5)', { angleMode: 'DEG' });
  assert.ok(approxEqual(v, 30, 1e-4));
});

// 12) reciprocal transforms prior operand
run('reciprocal wraps prior operand', () => {
  const { expr } = applyReciprocal('4', 1);
  assert.equal(expr, '1/(4)');
});

// Optional: right paren validity
run('right paren blocked if no open', () => {
  const r = insertRightParen('1+2', 3);
  assert.equal(r.expr, '1+2');
});
