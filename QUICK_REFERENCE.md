# Quick Reference: Enhanced Question Types

## Quick Start - Testing the Enhancements

### 1. Load Test Exam in Browser Console

```javascript
fetch('/test-exam-enhancements.json')
  .then((r) => r.json())
  .then((exam) => window.__GED_START_QUIZ__(exam, 'Math'));
```

### 2. Or Use Test Script

Open browser console and paste contents of `test-enhancements.js`

---

## Question Type Cheat Sheet

### Multiple-Select (Select All That Apply)

**Minimal Example:**

```json
{
  "type": "multiple-select",
  "text": "Which are prime?",
  "answerOptions": [
    { "text": "2", "isCorrect": true },
    { "text": "4", "isCorrect": false },
    { "text": "7", "isCorrect": true }
  ]
}
```

**Key Points:**

- Set `type: "multiple-select"` OR `selectType: "multiple"`
- Multiple options can have `isCorrect: true`
- User must select ALL correct options (and NO incorrect ones) to score correctly
- Shows checkboxes automatically

---

### Numeric Entry (Math Constructed Response)

**Exact Answer:**

```json
{
  "type": "numeric",
  "text": "What is 5.5 × 3?",
  "correctAnswer": "16.5"
}
```

**With Tolerance:**

```json
{
  "type": "numeric",
  "text": "Estimate π to 2 decimals",
  "correctAnswer": "3.14",
  "tolerance": 0.01
}
```

**Key Points:**

- Set `type: "numeric"` OR `responseType: "numeric"`
- `correctAnswer` required (can be "3/4", "0.75", "75%", etc.)
- `tolerance` optional (default: 0 = exact match)
- Accepts integers, decimals, fractions, mixed numbers, percentages
- Shows single text input automatically

---

### Passage Linking

**Example:**

```json
{
  "passage": "<p>Climate change refers to...</p>",
  "text": "What causes climate change?",
  "answerOptions": [...]
}
```

**Key Points:**

- Add `passage` field with HTML content
- Optional: Use `passageId` to group questions
- Passage displays automatically above question
- Works with any question type (single-select, multiple-select, numeric, etc.)

---

## Creating New Questions

### Template: Multiple-Select

```json
{
  "questionNumber": 1,
  "subject": "Subject Name",
  "type": "multiple-select",
  "selectType": "multiple",
  "text": "Your question text (Select ALL that apply)",
  "answerOptions": [
    {
      "text": "Option A",
      "isCorrect": true,
      "rationale": "Why this is correct"
    },
    {
      "text": "Option B",
      "isCorrect": false,
      "rationale": "Why this is incorrect"
    },
    {
      "text": "Option C",
      "isCorrect": true,
      "rationale": "Why this is correct"
    }
  ],
  "isPremade": true
}
```

### Template: Numeric Entry

```json
{
  "questionNumber": 2,
  "subject": "Math",
  "type": "numeric",
  "responseType": "numeric",
  "text": "Your calculation question",
  "correctAnswer": "42.5",
  "tolerance": 0.1,
  "acceptFraction": true,
  "rationale": "Explanation of the solution",
  "isPremade": true
}
```

### Template: Passage-Linked Question

```json
{
  "questionNumber": 3,
  "subject": "Reasoning Through Language Arts (RLA)",
  "passageId": "optional_id_for_grouping",
  "passage": "<p>Your passage text here...</p><p>Multiple paragraphs supported.</p>",
  "text": "Question about the passage",
  "answerOptions": [
    { "text": "Option A", "isCorrect": false },
    { "text": "Option B", "isCorrect": true }
  ],
  "isPremade": true
}
```

---

## Field Reference

### Common Fields (All Question Types)

```javascript
{
  questionNumber: number,      // Required: 1, 2, 3...
  subject: string,             // Required: "Math", "RLA", "Science", etc.
  text: string,                // Required: Question text
  rationale: string,           // Optional: Explanation (shown post-submission)
  isPremade: boolean,          // Optional: true for premade questions
  points: number               // Optional: Default 1
}
```

### Multiple-Select Specific

```javascript
{
  type: "multiple-select",     // OR selectType: "multiple"
  answerOptions: [             // Array of options
    {
      text: string,            // Option text
      isCorrect: boolean,      // true for correct options
      rationale: string        // Optional explanation
    }
  ]
}
```

### Numeric Entry Specific

```javascript
{
  type: "numeric",             // OR responseType: "numeric"
  correctAnswer: string,       // "42", "3.14", "3/4", etc.
  tolerance: number,           // Optional: ±range (default: 0)
  acceptFraction: boolean      // Optional: default true
}
```

### Passage Linking Specific

```javascript
{
  passage: string,             // HTML passage content
  passageId: string            // Optional: ID for grouping
}
```

---

## Supported Number Formats (Numeric Entry)

| Format       | Example     | Parsed Value |
| ------------ | ----------- | ------------ |
| Integer      | `42`        | 42.0         |
| Decimal      | `3.14`      | 3.14         |
| Fraction     | `3/4`       | 0.75         |
| Mixed Number | `2 3/4`     | 2.75         |
| Percentage   | `75%`       | 0.75         |
| Currency     | `$1,234.56` | 1234.56      |
| Ratio        | `3:4`       | 0.75         |

---

## Scoring Rules

### Multiple-Select

- ✅ Correct: Select ALL correct options AND NO incorrect options
- ❌ Incorrect: Missing any correct option OR selecting any incorrect option
- No partial credit

### Numeric Entry

- ✅ Correct: `|student - correct| ≤ tolerance`
- ❌ Incorrect: Outside tolerance range OR invalid input
- Default tolerance: 0 (exact match)

### Passage Linking

- No impact on scoring
- Only affects display/grouping

---

## Visual Indicators

### Multiple-Select

- Shows "(Select ALL that apply)" text above options
- Checkboxes visible on each option
- Multiple options can be selected simultaneously

### Numeric Entry

- Shows "Enter your numeric answer:" label
- Single text input field
- Placeholder: "Enter a number (e.g., 3.5 or 3/4)"
- Mobile: Shows numeric keyboard (inputMode="decimal")

### Passage

- "Reading Passage" header
- Bordered box with subject-specific styling
- Displays above associated question(s)

---

## Troubleshooting

### Multiple-Select Not Working

- ✓ Check `type: "multiple-select"` OR `selectType: "multiple"` is set
- ✓ Ensure multiple options have `isCorrect: true`
- ✓ Verify answerOptions array is properly formatted

### Numeric Entry Not Working

- ✓ Check `type: "numeric"` OR `responseType: "numeric"` is set
- ✓ Ensure `correctAnswer` field exists
- ✓ Test with simple integer first (e.g., "42")
- ✓ Check tolerance if approximate answer expected

### Passage Not Displaying

- ✓ Ensure `passage` field contains HTML content
- ✓ Check passage content is not empty string
- ✓ Verify HTML is valid (no unclosed tags)

### Scoring Issues

- ✓ Check browser console for errors
- ✓ Verify question structure matches templates above
- ✓ Test with simple examples first
- ✓ Review EXAM_ENHANCEMENTS_SUMMARY.md for details

---

## Where to Find More Information

1. **Comprehensive Documentation:** `EXAM_ENHANCEMENTS_SUMMARY.md`
2. **Test Examples:** `test-exam-enhancements.json`
3. **Test Script:** `test-enhancements.js`
4. **Code Comments:** Search `app.jsx` for:
   - `// MULTIPLE-SELECT ENHANCEMENT:`
   - `// NUMERIC ENTRY ENHANCEMENT:`
   - `// PASSAGE LINKING ENHANCEMENT:`

---

## Contact & Support

If you encounter issues:

1. Check console for JavaScript errors
2. Verify question JSON structure
3. Test with provided examples first
4. Review inline code comments in `app.jsx`

**Status:** ✅ All enhancements implemented and tested
