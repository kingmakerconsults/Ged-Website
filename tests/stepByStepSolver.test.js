// Node-only smoke tests for the step-by-step solver engine.
// Run with: node tests/stepByStepSolver.test.js
import {
  solveLinearEquation,
  solveLinearInequality,
  solvePercent,
  solveProportion,
  evaluateExpression,
} from '../frontend/src/components/tools/solver/solverEngine.js';

let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) {
    passed += 1;
  } else {
    failed += 1;
    console.error('  ✗', msg);
  }
}

function group(name, fn) {
  console.log(`\n— ${name}`);
  fn();
}

group('solveLinearEquation', () => {
  let r = solveLinearEquation('2x + 5 = 13');
  assert(r.ok && r.answer === 'x = 4', `2x+5=13 → got ${JSON.stringify(r)}`);

  r = solveLinearEquation('3x - 4 = x + 8');
  assert(r.ok && r.answer === 'x = 6', `3x-4=x+8 → got ${JSON.stringify(r)}`);

  r = solveLinearEquation('4x = 20');
  assert(r.ok && r.answer === 'x = 5', `4x=20 → got ${JSON.stringify(r)}`);

  r = solveLinearEquation('x/2 + 3 = 7');
  assert(r.ok && r.answer === 'x = 8', `x/2+3=7 → got ${JSON.stringify(r)}`);

  r = solveLinearEquation('x = x + 1');
  assert(r.ok && r.answer === 'No solution', `x=x+1 → got ${JSON.stringify(r)}`);

  r = solveLinearEquation('2x + 3 = 2x + 3');
  assert(
    r.ok && r.answer === 'Infinitely many solutions',
    `identity → got ${JSON.stringify(r)}`,
  );

  r = solveLinearEquation('not an equation');
  assert(!r.ok, 'malformed input should error');

  r = solveLinearEquation('2x + 5 = 14');
  assert(r.ok && r.answer === 'x = 4.5', `non-integer → got ${JSON.stringify(r)}`);
  assert(
    r.steps.some((s) => /\\dfrac/.test(s.latex) || /\\approx/.test(s.latex)),
    'should show fractional or decimal step',
  );
});

group('solveLinearInequality', () => {
  let r = solveLinearInequality('2x - 5 > 7');
  assert(r.ok && r.answer === 'x > 6', `2x-5>7 → got ${JSON.stringify(r)}`);

  r = solveLinearInequality('-3x + 1 < 10');
  assert(r.ok && r.answer === 'x > -3', `negative coef should flip: got ${JSON.stringify(r)}`);

  r = solveLinearInequality('4x <= 12');
  assert(r.ok && r.answer === 'x <= 3', `4x<=12 → got ${JSON.stringify(r)}`);

  r = solveLinearInequality('x + 4 >= 2x - 1');
  assert(r.ok && r.answer === 'x <= 5', `x+4>=2x-1 → got ${JSON.stringify(r)}`);
});

group('solvePercent', () => {
  let r = solvePercent({ kind: 'percentOf', percent: 25, whole: 80 });
  assert(r.ok && r.answer === '20', `25% of 80 → got ${JSON.stringify(r)}`);

  r = solvePercent({ kind: 'isWhatPct', part: 15, whole: 60 });
  assert(r.ok && r.answer === '25%', `15 of 60 → got ${JSON.stringify(r)}`);

  r = solvePercent({ kind: 'pctIsX', percent: 20, part: 30 });
  assert(r.ok && r.answer === '150', `20% of W = 30 → got ${JSON.stringify(r)}`);

  r = solvePercent({ kind: 'isWhatPct', part: 5, whole: 0 });
  assert(!r.ok, 'divide by zero whole should error');
});

group('solveProportion', () => {
  let r = solveProportion({ a: 3, b: 4, c: '', d: 12 });
  assert(r.ok && r.answer === 'x = 9', `3/4 = x/12 → got ${JSON.stringify(r)}`);

  r = solveProportion({ a: '', b: 5, c: 6, d: 10 });
  assert(r.ok && r.answer === 'x = 3', `x/5 = 6/10 → got ${JSON.stringify(r)}`);

  r = solveProportion({ a: 1, b: '', c: 2, d: 8 });
  assert(r.ok && r.answer === 'x = 4', `1/x = 2/8 → got ${JSON.stringify(r)}`);

  r = solveProportion({ a: 1, b: 2, c: 3, d: 4 });
  assert(!r.ok, 'no blank should error');

  r = solveProportion({ a: '', b: '', c: 3, d: 4 });
  assert(!r.ok, 'two blanks should error');
});

group('evaluateExpression', () => {
  let r = evaluateExpression('3 + 4*5');
  assert(r.ok && r.answer === '23', `3+4*5 → got ${JSON.stringify(r)}`);

  r = evaluateExpression('(2 + 3)^2');
  assert(r.ok && r.answer === '25', `(2+3)^2 → got ${JSON.stringify(r)}`);

  r = evaluateExpression('12 / (1 + 2) + 5');
  assert(r.ok && r.answer === '9', `pemdas → got ${JSON.stringify(r)}`);

  r = evaluateExpression('alert(1)');
  assert(!r.ok, 'unsafe expr should error');
});

console.log(`\n${passed} passed, ${failed} failed.`);
process.exit(failed === 0 ? 0 : 1);
