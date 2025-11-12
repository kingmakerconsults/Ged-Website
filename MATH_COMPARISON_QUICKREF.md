# Math Answer Comparison - Quick Reference

## Usage in Quiz Components

### Basic Comparison

```javascript
// In any quiz component
const isCorrect = compareAnswers(correctAnswer, userAnswer, {
  subject: quiz.subject, // 'Math', 'Science', 'RLA', etc.
  questionType: question.type, // Optional
});
```

### Integration Points

All three answer-checking locations now use the unified comparison:

#### 1. StandardQuizRunner (handleComplete)

```javascript
if (correctOpts.length === 1) {
  // Single-answer multiple choice
  isCorrect = compareAnswers(correctOpts[0].text, userAns, {
    subject: quiz.subject,
    questionType: q.type,
  });
} else {
  // Fill-in question
  isCorrect = compareAnswers(q.correctAnswer, userAns, {
    subject: quiz.subject,
    questionType: q.type,
  });
}
```

#### 2. Results Display

```javascript
if (correctMC) {
  isCorrect = compareAnswers(correctMC.text, userAnswer, {
    subject: quiz.subject,
    questionType: question.type,
  });
}
```

#### 3. Practice Session

```javascript
const isCorrect = compareAnswers(
  currentProblem.correctAnswer.toString(),
  userAnswer,
  { subject: 'Math', questionType: 'numeric' }
);
```

## Test Cases Reference

### Will Match (Math Subject)

| Correct Answer  | User Answer | Reason                            |
| --------------- | ----------- | --------------------------------- |
| `314`           | `314 cm²`   | Units stripped                    |
| `25%`           | `25`        | Percent treated as value          |
| `3.45 × 10^6`   | `3.45x10^6` | Multiplication symbols normalized |
| `9<sup>2</sup>` | `9^2`       | HTML tags stripped                |
| `50 cm²`        | `50 cm^2`   | Unicode superscripts converted    |
| `3/4`           | `0.75`      | Fraction converted to decimal     |
| `$1,234.56`     | `1234.56`   | Currency symbols/commas removed   |

### Will NOT Match

| Correct Answer | User Answer | Reason                   |
| -------------- | ----------- | ------------------------ |
| `314`          | `315`       | Different numeric values |
| `25%`          | `0.25`      | 25 ≠ 0.25 numerically    |

### Non-Math Subjects

For RLA, Science, Social Studies questions:

- Uses **case-insensitive string comparison only**
- Units are NOT stripped
- HTML tags are NOT removed
- Example: `"George Washington"` matches `"george washington"`

## Helper Functions

### normalizeAnswer(text)

```javascript
// Strips HTML, units, spaces, lowercases
normalizeAnswer('314 cm²'); // "314"
```

### extractNumericValue(text)

```javascript
// Extracts numeric value, handles fractions/percents/sci-notation
extractNumericValue('25%'); // 25
extractNumericValue('3/4'); // 0.75
extractNumericValue('3.45e6'); // 3450000
```

### areNumericallySame(val1, val2, epsilon)

```javascript
// Compare two values with tolerance (default: 1e-4)
areNumericallySame('3.14159', '3.14160', 1e-3); // true
```

## Common Patterns

### Question Type Detection

```javascript
const isMathQuestion =
  question.type === 'math' ||
  question.type === 'numeric' ||
  quiz.subject === 'Math' ||
  quiz.subject === 'Mathematics';
```

### Custom Tolerance

```javascript
// For geometry/measurement questions needing looser tolerance
compareAnswers(expected, actual, {
  subject: 'Math',
  epsilon: 0.01, // ±0.01 tolerance
});
```

### Multi-Answer Handling

The existing multi-answer logic (comma-separated) is preserved:

```javascript
// "18,19" vs "19,18" will still match (order-insensitive)
```

## Debugging

### Browser Console

```javascript
// Check normalization
console.log(normalizeAnswer('314 cm²')); // "314"

// Check numeric extraction
console.log(extractNumericValue('25%')); // 25

// Test comparison
console.log(compareAnswers('314', '314 cm²', { subject: 'Math' })); // true
```

### Test Page

Open `test-math-comparison.html` in browser to see:

- Live comparison results
- Normalization steps
- Numeric extraction
- Pass/fail status

## Migration Notes

### Removed Code

The duplicate normalization helpers in Results Display have been removed:

- `normalizeRaw()` (local function)
- `numericValue()` (local function)
- `isNumericEqual()` (local function)
- `tokenize()` (local function)
- `setsEqual()` (local function)

These are now handled by the centralized `compareAnswers()` function.

### Preserved Functionality

All existing behavior is preserved:

- Fractions (3/4)
- Mixed numbers (2 3/5)
- Percents (50%)
- Currency ($1,050.25)
- Ratios (3:2)
- Multi-answer sets ("18,19")
- Numeric tolerance (1e-9 → 1e-4, more lenient)

### New Capabilities

- HTML tag stripping
- Superscript conversion (² → ^2)
- Unit removal (cm², cm, %, degrees, etc.)
- Scientific notation × → x
- Subject-based scoping

## Performance

- **Average operation**: <1ms
- **Regex operations**: ~6-8 per comparison
- **Numeric conversions**: parseFloat, simple arithmetic
- **No network calls**: Pure client-side
- **No external deps**: Vanilla JS

## Troubleshooting

### "Answer marked wrong despite looking correct"

1. Check console: `console.log(compareAnswers(correct, user, { subject: 'Math' }))`
2. Check normalization: `console.log(normalizeAnswer(correct), normalizeAnswer(user))`
3. Check numeric values: `console.log(extractNumericValue(correct), extractNumericValue(user))`
4. Verify subject: Must be `'Math'` for flexible comparison

### "Units preventing match"

- Units are stripped only if remaining text is numeric
- Example: "100 cm" → "100" (stripped)
- Example: "Area: 100 cm" → "area:100" (NOT stripped, contains text)

### "Different units matching incorrectly"

- By design: Units are stripped, so "100 cm" matches "100 m"
- If this is undesired, see MATH_GRADING_ENHANCEMENT.md "Future Enhancements"

---

**Quick Links**:

- Full documentation: [`MATH_GRADING_ENHANCEMENT.md`](./MATH_GRADING_ENHANCEMENT.md)
- Test file: [`frontend/lib/mathAnswerComparison.test.js`](./frontend/lib/mathAnswerComparison.test.js)
- Browser test: [`frontend/test-math-comparison.html`](./frontend/test-math-comparison.html)
- Implementation: [`frontend/lib/mathAnswerComparison-browser.js`](./frontend/lib/mathAnswerComparison-browser.js)
