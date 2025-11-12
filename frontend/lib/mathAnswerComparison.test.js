/**
 * Unit Tests for Math Answer Comparison
 *
 * Run with: node mathAnswerComparison.test.js
 * Or import into your test framework
 */

import {
  compareAnswers,
  normalizeAnswer,
  extractNumericValue,
  TEST_CASES,
  runTests,
} from './mathAnswerComparison.js';

console.log('🧪 Math Answer Comparison - Unit Tests\n');
console.log('='.repeat(60));

// Run built-in test cases
const allTestsPassed = runTests();

// Additional edge case tests
console.log('\n' + '='.repeat(60));
console.log('🔬 Edge Case Tests\n');

const edgeCases = [
  // HTML tag stripping
  {
    name: 'HTML sup tag',
    correct: '9<sup>2</sup>',
    user: '9^2',
    expected: true,
  },
  {
    name: 'HTML italic tag',
    correct: '<i>x</i> = 5',
    user: 'x=5',
    expected: true,
  },
  {
    name: 'Multiple HTML tags with text',
    correct: '<b>Area</b>: <sup>100</sup> cm<sup>2</sup>',
    user: '100 cm^2',
    expected: false, // Text "Area:" prevents numeric match
  },

  // Unit variations
  {
    name: 'Square cm - caret vs unicode',
    correct: '50 cm^2',
    user: '50 cm²',
    expected: true,
  },
  {
    name: 'Cubic meters',
    correct: '100 m³',
    user: '100 m^3',
    expected: true,
  },
  {
    name: 'Linear units',
    correct: '25 cm',
    user: '25',
    expected: true,
  },
  {
    name: 'Degrees',
    correct: '90 degrees',
    user: '90',
    expected: true,
  },
  {
    name: 'Degrees with symbol',
    correct: '180°',
    user: '180',
    expected: true,
  },

  // Percent edge cases
  {
    name: 'Percent as value',
    correct: '75%',
    user: '75',
    expected: true,
  },
  {
    name: 'Percent with space',
    correct: '50 %',
    user: '50',
    expected: true,
  },

  // Scientific notation variations
  {
    name: 'Sci notation - times symbol',
    correct: '6.02 × 10^23',
    user: '6.02x10^23',
    expected: true,
  },
  {
    name: 'Sci notation - asterisk',
    correct: '1.5 * 10^8',
    user: '1.5x10^8',
    expected: true,
  },
  {
    name: 'Sci notation - e notation',
    correct: '2.5e6',
    user: '2500000',
    expected: true,
  },
  {
    name: 'Sci notation - negative exponent',
    correct: '3.2 x 10^-3',
    user: '0.0032',
    expected: true,
  },

  // Whitespace handling
  {
    name: 'Extra whitespace',
    correct: '  314  ',
    user: '314',
    expected: true,
  },
  {
    name: 'No spaces in units',
    correct: '100cm^2',
    user: '100',
    expected: true,
  },

  // Different units (units are stripped, so these WILL match numerically)
  {
    name: 'Different linear units - units ignored',
    correct: '100 cm',
    user: '100 m',
    expected: true, // Both become 100
    note: 'Units are stripped for comparison - if this is undesired, add unit preservation logic',
  },
  {
    name: 'Different area units - units ignored',
    correct: '50 cm^2',
    user: '50 m^2',
    expected: true, // Both become 50
    note: 'Units are stripped for comparison - if this is undesired, add unit preservation logic',
  },

  // Fractions (existing functionality)
  {
    name: 'Fraction vs decimal',
    correct: '3/4',
    user: '0.75',
    expected: true,
  },
  {
    name: 'Fraction with spaces',
    correct: '1 / 2',
    user: '0.5',
    expected: true,
  },

  // Currency (existing functionality)
  {
    name: 'Currency with commas',
    correct: '$1,234.56',
    user: '1234.56',
    expected: true,
  },

  // Non-math questions (should use strict comparison)
  {
    name: 'RLA - case insensitive',
    correct: 'George Washington',
    user: 'george washington',
    expected: true,
    subject: 'RLA',
  },
  {
    name: 'RLA - units not stripped',
    correct: '100 words',
    user: '100',
    expected: false,
    subject: 'RLA',
  },
];

let edgePassed = 0;
let edgeFailed = 0;

edgeCases.forEach(({ name, correct, user, expected, subject = 'Math' }) => {
  const result = compareAnswers(correct, user, { subject });
  const status = result === expected ? '✅' : '❌';

  if (result === expected) {
    edgePassed++;
  } else {
    edgeFailed++;
    console.log(`${status} ${name} FAILED`);
    console.log(`   Correct: "${correct}"`);
    console.log(`   User: "${user}"`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Expected: ${expected}, Got: ${result}`);
    console.log(
      `   Normalized: "${normalizeAnswer(correct)}" vs "${normalizeAnswer(
        user
      )}"`
    );
    console.log(
      `   Numeric: ${extractNumericValue(correct)} vs ${extractNumericValue(
        user
      )}`
    );
    console.log('');
  }
});

console.log(
  `\n📊 Edge Case Results: ${edgePassed} passed, ${edgeFailed} failed out of ${edgeCases.length} tests`
);

// Final summary
const totalTests = TEST_CASES.length + edgeCases.length;
const totalPassed = (allTestsPassed ? TEST_CASES.length : 0) + edgePassed;
const totalFailed = totalTests - totalPassed;

console.log('\n' + '='.repeat(60));
console.log('📈 FINAL RESULTS');
console.log('='.repeat(60));
console.log(`Total Tests: ${totalTests}`);
console.log(`✅ Passed: ${totalPassed}`);
console.log(`❌ Failed: ${totalFailed}`);
console.log(`Success Rate: ${((totalPassed / totalTests) * 100).toFixed(1)}%`);

if (totalFailed === 0) {
  console.log(
    '\n🎉 All tests passed! Math answer comparison is working correctly.'
  );
} else {
  console.log('\n⚠️  Some tests failed. Review the output above for details.');
  process.exit(1);
}
