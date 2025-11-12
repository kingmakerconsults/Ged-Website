/**
 * Math Answer Normalization & Comparison Utilities
 *
 * Provides flexible answer checking for math questions that:
 * - Normalizes formatting differences (units, HTML tags, superscripts)
 * - Compares numeric values with tolerance
 * - Falls back to string matching for non-numeric answers
 *
 * Use for: Math quizzes, practice sessions, any numeric/formula responses
 * Scope: Applied only to questions with type="math" or responseType="numeric"|"math"
 */

// Numeric comparison tolerance
const EPSILON = 1e-4;

/**
 * Strip HTML tags, superscripts, and normalize unicode characters
 */
function stripHtmlAndSpecialChars(text) {
  if (!text) return '';

  return (
    String(text)
      // Remove HTML tags
      .replace(/<[^>]*>/g, '')
      // Convert unicode superscripts to ^notation
      .replace(/²/g, '^2')
      .replace(/³/g, '^3')
      .replace(/¹/g, '^1')
      .replace(/⁴/g, '^4')
      .replace(/⁵/g, '^5')
      .replace(/⁶/g, '^6')
      .replace(/⁷/g, '^7')
      .replace(/⁸/g, '^8')
      .replace(/⁹/g, '^9')
      .replace(/⁰/g, '^0')
      // Normalize multiply signs
      .replace(/×/g, 'x')
      .replace(/·/g, '*')
      // Non-breaking spaces
      .replace(/\u00A0/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

/**
 * Remove common units from the end of numeric answers
 * Only removes if what remains can be parsed as a number
 */
function stripUnits(text) {
  if (!text) return '';

  const str = String(text).trim();

  // Common units to strip (case-insensitive, at end of string)
  const unitPatterns = [
    // Area/volume
    /\s*(cm\^?2|cm²|m\^?2|m²|ft\^?2|ft²|in\^?2|in²|km\^?2|km²)$/i,
    /\s*(cm\^?3|cm³|m\^?3|m³|ft\^?3|ft³|in\^?3|in³|km\^?3|km³)$/i,
    // Linear
    /\s*(cm|m|ft|in|km|mm|yd|mi|inch|inches|feet|meters|centimeters|millimeters|kilometers|yards|miles)$/i,
    // Percent
    /\s*%$/,
    // Currency
    /^\$/,
    // Degrees
    /\s*(°|degrees?|deg)$/i,
    // Weight/mass
    /\s*(kg|g|mg|lb|lbs|oz|pounds?|ounces?|grams?|kilograms?|milligrams?)$/i,
    // Time
    /\s*(s|sec|seconds?|min|minutes?|hrs?|hours?|days?|weeks?|months?|years?)$/i,
    // Speed
    /\s*(mph|km\/h|m\/s|ft\/s)$/i,
  ];

  let stripped = str;

  // Try stripping each unit pattern
  for (const pattern of unitPatterns) {
    const candidate = stripped.replace(pattern, '').trim();
    // Only accept if what remains looks numeric
    if (candidate && /^[-+]?\d/.test(candidate)) {
      stripped = candidate;
    }
  }

  return stripped;
}

/**
 * Normalize answer text for comparison
 * - Strips HTML and special chars
 * - Removes units
 * - Removes spaces
 * - Lowercases
 */
export function normalizeAnswer(text) {
  if (text === null || text === undefined) return '';

  let normalized = stripHtmlAndSpecialChars(text);
  normalized = stripUnits(normalized);
  normalized = normalized.replace(/\s+/g, '').toLowerCase();

  return normalized;
}

/**
 * Parse scientific notation like "3.45 x 10^6" or "3.45x10^6"
 */
function parseScientificNotation(text) {
  if (!text) return null;

  const str = String(text).trim();

  // Match patterns like: 3.45 x 10^6, 3.45x10^6, 3.45*10^6, 3.45e6
  const sciPattern =
    /^([-+]?\d+(?:\.\d+)?)\s*[x\*×]?\s*10\s*\^?\s*([-+]?\d+)$/i;
  const expPattern = /^([-+]?\d+(?:\.\d+)?)[eE]([-+]?\d+)$/;

  let match = str.match(sciPattern);
  if (match) {
    const coefficient = parseFloat(match[1]);
    const exponent = parseInt(match[2], 10);
    if (Number.isFinite(coefficient) && Number.isFinite(exponent)) {
      return coefficient * Math.pow(10, exponent);
    }
  }

  match = str.match(expPattern);
  if (match) {
    const num = parseFloat(str);
    return Number.isFinite(num) ? num : null;
  }

  return null;
}

/**
 * Try to extract a numeric value from text
 * Handles: plain numbers, decimals, fractions, percents, scientific notation, currency
 */
export function extractNumericValue(text) {
  if (text === null || text === undefined) return null;

  const normalized = normalizeAnswer(text);
  if (!normalized) return null;

  // Try scientific notation first
  const sciValue = parseScientificNotation(normalized);
  if (sciValue !== null) return sciValue;

  // Handle percents (already stripped by normalizeAnswer, but check for % in original)
  if (String(text).includes('%')) {
    const numPart = normalized.replace(/%/g, '');
    const num = parseFloat(numPart);
    if (Number.isFinite(num)) {
      // Don't divide by 100 - treat 25% as value 25 for comparison
      // This matches the requirement "25%" vs "25" should match
      return num;
    }
  }

  // Handle fractions: a/b
  if (normalized.includes('/')) {
    const parts = normalized.split('/');
    if (parts.length === 2) {
      const num = parseFloat(parts[0]);
      const den = parseFloat(parts[1]);
      if (Number.isFinite(num) && Number.isFinite(den) && den !== 0) {
        return num / den;
      }
    }
  }

  // Remove remaining non-numeric chars (like currency symbols already stripped)
  const cleanNum = normalized.replace(/[^0-9.\-+eE]/g, '');
  const num = parseFloat(cleanNum);

  return Number.isFinite(num) ? num : null;
}

/**
 * Compare two numeric values with tolerance
 */
export function areNumericallySame(val1, val2, epsilon = EPSILON) {
  const num1 = extractNumericValue(val1);
  const num2 = extractNumericValue(val2);

  if (num1 === null || num2 === null) return false;

  return Math.abs(num1 - num2) <= epsilon;
}

/**
 * Main comparison function for math answers
 *
 * @param {string} correctAnswer - The correct answer from the quiz
 * @param {string} userAnswer - The student's submitted answer
 * @param {Object} options - Optional configuration
 * @param {string} options.questionType - Type of question (e.g., "math", "numeric")
 * @param {string} options.subject - Subject area (e.g., "Math", "Science")
 * @param {number} options.epsilon - Numeric tolerance (default: 1e-4)
 * @returns {boolean} True if answers are equivalent
 */
export function compareAnswers(correctAnswer, userAnswer, options = {}) {
  const { questionType, subject, epsilon = EPSILON } = options;

  // Only apply flexible math grading for math/numeric questions
  const isMathQuestion =
    questionType === 'math' ||
    questionType === 'numeric' ||
    subject === 'Math' ||
    subject === 'Mathematics';

  if (!isMathQuestion) {
    // For non-math questions, use strict string comparison (normalized)
    const norm1 = String(correctAnswer || '')
      .trim()
      .toLowerCase();
    const norm2 = String(userAnswer || '')
      .trim()
      .toLowerCase();
    return norm1 === norm2;
  }

  // Step 1: Try numeric comparison first
  if (areNumericallySame(correctAnswer, userAnswer, epsilon)) {
    return true;
  }

  // Step 2: Fall back to normalized string comparison
  const norm1 = normalizeAnswer(correctAnswer);
  const norm2 = normalizeAnswer(userAnswer);

  return norm1 === norm2;
}

/**
 * Test cases for validation
 */
export const TEST_CASES = [
  // Basic numeric equivalence
  { correct: '314', user: '314 cm^2', expected: true },
  { correct: '314', user: '314.0', expected: true },
  { correct: '314', user: '314cm²', expected: true },

  // Percent handling
  { correct: '25%', user: '25', expected: true },
  { correct: '25', user: '25%', expected: true },

  // Scientific notation
  { correct: '3.45 × 10^6', user: '3.45x10^6', expected: true },
  { correct: '3.45e6', user: '3450000', expected: true },
  { correct: '3.45 x 10^6', user: '3.45*10^6', expected: true },

  // Units with different notations
  { correct: '50 cm²', user: '50 cm^2', expected: true },
  { correct: '100m^3', user: '100 m³', expected: true },

  // HTML tags
  { correct: '9<sup>2</sup>', user: '9^2', expected: true },
  { correct: '<i>x</i> = 5', user: 'x=5', expected: true },

  // Should NOT match (different values)
  { correct: '314', user: '315', expected: false },
  { correct: '25%', user: '0.25', expected: false }, // 25 vs 0.25 numerically different
  { correct: '3.45e6', user: '3.45e7', expected: false },
];

/**
 * Run unit tests (for console validation)
 */
export function runTests() {
  console.log('🧪 Running Math Answer Comparison Tests...\n');

  let passed = 0;
  let failed = 0;

  TEST_CASES.forEach(({ correct, user, expected }, index) => {
    const result = compareAnswers(correct, user, { questionType: 'math' });
    const status = result === expected ? '✅' : '❌';

    if (result === expected) {
      passed++;
    } else {
      failed++;
      console.log(`${status} Test ${index + 1} FAILED`);
      console.log(`   Correct: "${correct}"`);
      console.log(`   User: "${user}"`);
      console.log(`   Expected: ${expected}, Got: ${result}`);
      console.log(
        `   Numeric values: ${extractNumericValue(
          correct
        )} vs ${extractNumericValue(user)}`
      );
      console.log('');
    }
  });

  console.log(
    `\n📊 Results: ${passed} passed, ${failed} failed out of ${TEST_CASES.length} tests`
  );

  return failed === 0;
}

// Default export for convenience
export default {
  normalizeAnswer,
  extractNumericValue,
  areNumericallySame,
  compareAnswers,
  runTests,
  TEST_CASES,
};
