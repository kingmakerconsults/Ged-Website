// frontend/data/math_extended_problems.js
// Programmatically generate large sets of additional Step Solver problems.
// These extend window.MATH_STEP_PROBLEMS defined in math_step_problems.js.
(function generateExtendedMathProblems() {
  if (typeof window === 'undefined') return;
  const extended = [];

  // Linear Equations pattern: ax + b = c (easy/medium) where a,b,c small integers.
  let linearId = 1000; // avoid collisions with existing ids
  for (let a = 2; a <= 9; a++) {
    for (let b = 1; b <= 9; b += 2) {
      // odd b for diversity
      const c = a * (b + 1) + b; // ensure solution not fractional:  a x + b = a(b+1)+b -> ax + b = ab + a + b => ax = ab + a -> x = b + 1
      const xVal = b + 1;
      const id = 'linear_ext_' + linearId++;
      extended.push({
        id,
        topic: 'Linear Equations',
        difficulty: xVal <= 5 ? 'easy' : 'medium',
        problemText: `Solve for x: ${a}x + ${b} = ${c}`,
        formattedProblem: `${a}x + ${b} = ${c}`,
        steps: [
          {
            explanation: `Subtract ${b} from both sides.`,
            expression: `${a}x = ${c - b}`,
          },
          {
            explanation: `Divide both sides by ${a}.`,
            expression: `x = ${xVal}`,
          },
        ],
        finalAnswerText: `x = ${xVal}`,
        numericAnswer: xVal,
      });
    }
  }

  // Fraction addition: a/b + c/d with denominators 2..9 distinct; provide LCD, convert, add, simplify.
  let fracId = 2000;
  function gcd(x, y) {
    while (y) {
      [x, y] = [y, x % y];
    }
    return x;
  }
  function lcm(x, y) {
    return (x * y) / gcd(x, y);
  }
  for (let b = 2; b <= 9; b++) {
    for (let d = 2; d <= 9; d++) {
      if (b === d) continue;
      const a = b - 1; // ensure proper fraction
      const c = d - 1;
      const lcd = lcm(b, d);
      const aScaled = a * (lcd / b);
      const cScaled = c * (lcd / d);
      const numSum = aScaled + cScaled;
      const g = gcd(numSum, lcd);
      const numSimplified = numSum / g;
      const denSimplified = lcd / g;
      const id = 'fractions_ext_' + fracId++;
      extended.push({
        id,
        topic: 'Fractions',
        difficulty: denSimplified <= 10 ? 'easy' : 'medium',
        problemText: `Compute: ${a}/${b} + ${c}/${d}`,
        formattedProblem: `\\frac{${a}}{${b}} + \\frac{${c}}{${d}}`,
        steps: [
          {
            explanation: `LCD of ${b} and ${d} is ${lcd}.`,
            expression: `LCD = ${lcd}`,
          },
          {
            explanation: `Convert: ${a}/${b} = ${aScaled}/${lcd}, ${c}/${d} = ${cScaled}/${lcd}.`,
            expression: `\\frac{${aScaled}}{${lcd}} + \\frac{${cScaled}}{${lcd}}`,
          },
          {
            explanation: `Add numerators: ${aScaled} + ${cScaled} = ${numSum}.`,
            expression: `\\frac{${numSum}}{${lcd}}`,
          },
          {
            explanation: `Simplify fraction by GCD ${g}.`,
            expression: `\\frac{${numSimplified}}{${denSimplified}}`,
          },
        ],
        finalAnswerText: `${numSimplified}/${denSimplified}`,
        numericAnswer: null,
      });
    }
  }

  // Percent increase/decrease word problems.
  let pctId = 3000;
  const basePrices = [40, 55, 80, 120, 200];
  const discounts = [10, 15, 20, 25];
  for (const base of basePrices) {
    for (const disc of discounts) {
      const id = 'percent_ext_' + pctId++;
      const discountAmount = +((base * disc) / 100).toFixed(2);
      const finalPrice = +(base - discountAmount).toFixed(2);
      extended.push({
        id,
        topic: 'Decimals & Percents',
        difficulty: disc <= 15 ? 'easy' : 'medium',
        problemText: `An item costs $${base} and is discounted ${disc}%. What is the sale price?`,
        formattedProblem: `${base} - ${disc}\\% \text{ of } ${base}`,
        steps: [
          {
            explanation: `Convert ${disc}% to decimal ${disc / 100}.`,
            expression: `${disc / 100}`,
          },
          {
            explanation: `Compute discount: ${
              disc / 100
            } * ${base} = ${discountAmount}.`,
            expression: `${discountAmount}`,
          },
          {
            explanation: `Subtract discount: ${base} - ${discountAmount} = ${finalPrice}.`,
            expression: `${finalPrice}`,
          },
        ],
        finalAnswerText: `$${finalPrice}`,
        numericAnswer: finalPrice,
      });
    }
  }

  // Exponents simplification: (a^m)(a^n) pattern.
  let expId = 4000;
  for (let a = 2; a <= 7; a++) {
    for (let m = 2; m <= 4; m++) {
      for (let n = 2; n <= 4; n++) {
        const id = 'exponents_ext_' + expId++;
        const total = m + n;
        const value = a ** total;
        extended.push({
          id,
          topic: 'Exponents & Roots',
          difficulty: total <= 6 ? 'easy' : 'medium',
          problemText: `Simplify: ${a}^${m} * ${a}^${n}`,
          formattedProblem: `${a}^${m} \\cdot ${a}^${n}`,
          steps: [
            {
              explanation: `Add exponents: ${m} + ${n} = ${total}.`,
              expression: `${a}^${total}`,
            },
            {
              explanation: `Compute value: ${a}^${total} = ${value}.`,
              expression: `${value}`,
            },
          ],
          finalAnswerText: `${value}`,
          numericAnswer: value,
        });
      }
    }
  }

  // Word problems - simple distance/time.
  let wordId = 5000;
  const speeds = [30, 45, 50, 60, 65];
  const times = [2, 3, 4, 5];
  for (const v of speeds) {
    for (const t of times) {
      const dist = v * t;
      const id = 'word_ext_' + wordId++;
      extended.push({
        id,
        topic: 'Word Problems',
        difficulty: v <= 50 ? 'easy' : 'medium',
        problemText: `A vehicle travels at ${v} mph for ${t} hours. How far does it go?`,
        formattedProblem: `${v} \\times ${t}`,
        steps: [
          {
            explanation: 'Use distance = rate × time.',
            expression: `${v} \\times ${t}`,
          },
          {
            explanation: `Multiply: ${v} * ${t} = ${dist}.`,
            expression: `${dist}`,
          },
        ],
        finalAnswerText: `${dist} miles`,
        numericAnswer: dist,
      });
    }
  }

  // Merge into global
  if (!Array.isArray(window.MATH_STEP_PROBLEMS)) window.MATH_STEP_PROBLEMS = [];
  window.MATH_STEP_PROBLEMS = window.MATH_STEP_PROBLEMS.concat(extended);
  console.info('[math] Extended problems added:', extended.length);
})();
