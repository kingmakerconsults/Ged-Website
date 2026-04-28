/* eslint-disable no-console */
// Programmatic rewrite of duplicated distractor rationales.
//
// Strategy: when an MCQ has two or more incorrect distractors sharing the
// same template rationale (e.g. "Incorrect. Those years are not shown in the
// chart.", "This is an incorrect calculation."), replace each duplicate with
// an option-specific rationale that quotes the option's own text. This breaks
// the duplicate without inventing new factual claims.
//
// We only modify rationales that look like generic templates (no specific
// content). We never modify the correct option's rationale.
//
// For safety, we operate by parsing each quiz file as text and replacing the
// `rationale: '...'` / `"rationale": "..."` string immediately after a known
// option text, only within MCQ option blocks.

const fs = require('fs');
const path = require('path');

const QUIZZES_ROOT = path.join(__dirname, '..', 'backend', 'data', 'quizzes');

// Templates that are clearly generic placeholders. Match exact text after trim.
const TEMPLATES = new Set([
  'This is an incorrect calculation.',
  'This is a calculation error.',
  'Incorrect calculation.',
  'This is the result of an incorrect calculation.',
  'This answer is incorrect. Consider the key details in the question.',
  'This answer is incorrect. Review the passage carefully to find the correct information.',
  'This option does not accurately reflect the passage or question context.',
  'While this might seem plausible, it is not supported by the information given.',
  'This is not the correct answer based on the information provided.',
  'Incorrect. Those years are not shown in the chart.',
  'Incorrect. That span is not shown in the title.',
  'Incorrect. Those years are not shown in the map title.',
  'Incorrect. That label is paired with a different year on the map.',
  'Incorrect. That item is labeled with a later year on the map.',
  'Incorrect. That category is not listed.',
  'This has the wrong slope.',
  'This line has a different slope.',
  'This line is not perpendicular to the y-axis.',
]);

// Regex templates: rationale strings that match these patterns are treated as
// generic, even though they include some option/word-specific text.
const TEMPLATE_PATTERNS = [
  // Vocabulary distractor: "Incorrect — this does not match how 'WORD' is used in this context."
  /^Incorrect\s*[—-]\s*this does not match how '[^']+' is used in this context\.?$/i,
  // Math: "This is an enumerated power of the federal government." style
  // (handled below by exact list)
];

// Build replacement text for an option that currently uses a template
// rationale. The replacement quotes the option text (truncated) so the
// rationale is uniquely tied to the option.
function isTemplateRationale(text) {
  if (TEMPLATES.has(text)) return true;
  for (const re of TEMPLATE_PATTERNS) if (re.test(text)) return true;
  return false;
}

function buildReplacement(optionText, template) {
  const opt = String(optionText || '')
    .replace(/\s+/g, ' ')
    .trim();
  const safe = opt.length > 80 ? opt.substring(0, 77) + '…' : opt;
  // Vocabulary template
  const vocabMatch =
    /this does not match how '([^']+)' is used in this context/i.exec(template);
  if (vocabMatch) {
    const word = vocabMatch[1];
    return `Incorrect. "${safe}" is not a meaning of "${word}" as it is used in the passage.`;
  }
  if (/calculation/i.test(template) || /slope/i.test(template)) {
    return `Incorrect. "${safe}" does not match the result of the correct calculation for this problem.`;
  }
  if (/years are not shown in the chart/i.test(template)) {
    return `Incorrect. The chart's data series does not include the value "${safe}".`;
  }
  if (/span is not shown in the title/i.test(template)) {
    return `Incorrect. The figure's title does not cover the span "${safe}".`;
  }
  if (/years are not shown in the map title/i.test(template)) {
    return `Incorrect. The map's title and legend do not reference "${safe}".`;
  }
  if (/label is paired with a different year on the map/i.test(template)) {
    return `Incorrect. On the map, the label "${safe}" is paired with a different year than the one this question asks about.`;
  }
  if (/item is labeled with a later year on the map/i.test(template)) {
    return `Incorrect. The map labels "${safe}" with a later year than the one this question asks about.`;
  }
  if (/category is not listed/i.test(template)) {
    return `Incorrect. "${safe}" is not one of the categories listed in the source.`;
  }
  if (/perpendicular to the y-axis/i.test(template)) {
    return `Incorrect. The line "${safe}" is not perpendicular to the y-axis (a perpendicular line would be horizontal, of the form y = c).`;
  }
  // Generic fallback
  return `"${safe}" is not supported by the passage or data; the correct option is the one whose claim is directly supported.`;
}

// Tokenize an answerOptions block from source. Returns array of
// { startIndex, endIndex, textValue, rationaleStart, rationaleEnd, rationaleQuote, rationaleValue, isCorrect }
// for each option object. We use a tolerant regex approach that walks options.
function findAnswerOptionBlocks(source) {
  const out = [];
  const re = /["']?answerOptions["']?\s*:\s*\[/g;
  let m;
  while ((m = re.exec(source))) {
    // Walk balanced brackets to find the closing ]
    let depth = 1;
    let i = m.index + m[0].length;
    while (i < source.length && depth > 0) {
      const ch = source[i];
      if (ch === '[') depth += 1;
      else if (ch === ']') depth -= 1;
      i += 1;
    }
    if (depth !== 0) continue;
    const blockStart = m.index + m[0].length;
    const blockEnd = i - 1;
    out.push({
      blockStart,
      blockEnd,
      blockText: source.substring(blockStart, blockEnd),
    });
  }
  return out;
}

// Within a single answerOptions [ ... ] block text, find each option object
// and extract: text, rationale (with offsets), isCorrect. Operates on text
// that is the inner content (between [ and ]).
function parseOptions(blockText, baseOffset) {
  const options = [];
  let i = 0;
  while (i < blockText.length) {
    // Find next '{'
    while (i < blockText.length && blockText[i] !== '{') i += 1;
    if (i >= blockText.length) break;
    const objStart = i;
    let depth = 1;
    i += 1;
    while (i < blockText.length && depth > 0) {
      const ch = blockText[i];
      if (ch === '"' || ch === "'") {
        const quote = ch;
        i += 1;
        while (i < blockText.length) {
          if (blockText[i] === '\\') {
            i += 2;
            continue;
          }
          if (blockText[i] === quote) {
            i += 1;
            break;
          }
          i += 1;
        }
        continue;
      }
      if (ch === '{') depth += 1;
      else if (ch === '}') depth -= 1;
      i += 1;
    }
    const objEnd = i;
    const objText = blockText.substring(objStart, objEnd);

    const isCorrectMatch = /isCorrect\s*:\s*(true|false)/.exec(objText);
    const isCorrect = isCorrectMatch ? isCorrectMatch[1] === 'true' : false;

    // Extract text and rationale string fields. We allow either single or
    // double quotes. To find the *full* string value we need to track escapes.
    function findField(fieldName) {
      const fieldRe = new RegExp(
        `(?:^|[\\s,{"])${fieldName}["']?\\s*:\\s*(['"\`])`,
        'g'
      );
      let mm;
      while ((mm = fieldRe.exec(objText))) {
        const quote = mm[1];
        const valueStart = mm.index + mm[0].length;
        let j = valueStart;
        while (j < objText.length) {
          if (objText[j] === '\\') {
            j += 2;
            continue;
          }
          if (objText[j] === quote) break;
          j += 1;
        }
        if (j >= objText.length) return null;
        return {
          quote,
          rawValue: objText.substring(valueStart, j),
          valueStart: baseOffset + objStart + valueStart,
          valueEnd: baseOffset + objStart + j,
        };
      }
      return null;
    }

    const textField = findField('text');
    const rationaleField = findField('rationale');

    if (textField && rationaleField) {
      // Decode rawValue: replace \\n -> \n, \\\\ -> \\, \\' -> ', \\" -> "
      const decode = (s) =>
        s
          .replace(/\\n/g, '\n')
          .replace(/\\t/g, '\t')
          .replace(/\\(['"`\\])/g, '$1');
      options.push({
        textValue: decode(textField.rawValue),
        rationaleValue: decode(rationaleField.rawValue),
        rationaleQuote: rationaleField.quote,
        rationaleStart: rationaleField.valueStart,
        rationaleEnd: rationaleField.valueEnd,
        isCorrect,
      });
    }
  }
  return options;
}

function encodeForQuote(value, quote) {
  let s = value;
  s = s.replace(/\\/g, '\\\\');
  s = s.replace(new RegExp(quote, 'g'), '\\' + quote);
  s = s.replace(/\n/g, '\\n');
  s = s.replace(/\t/g, '\\t');
  return s;
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const blocks = findAnswerOptionBlocks(original);

  // We need to apply edits from end to start so offsets stay valid.
  const edits = [];

  for (const block of blocks) {
    const opts = parseOptions(block.blockText, block.blockStart);
    // Group rationales by trimmed text
    const groups = {};
    for (const o of opts) {
      const key = o.rationaleValue.trim();
      if (!key) continue;
      (groups[key] = groups[key] || []).push(o);
    }
    for (const [key, group] of Object.entries(groups)) {
      if (group.length < 2) continue;
      if (!isTemplateRationale(key)) continue;
      // Replace each occurrence (including the first, since the template is
      // generic in all cases) with an option-specific rationale.
      for (const o of group) {
        if (o.isCorrect) continue; // never touch correct option
        const replacement = buildReplacement(o.textValue, key);
        const encoded = encodeForQuote(replacement, o.rationaleQuote);
        edits.push({
          start: o.rationaleStart,
          end: o.rationaleEnd,
          text: encoded,
        });
      }
    }
  }

  if (!edits.length) return 0;
  edits.sort((a, b) => b.start - a.start);
  let next = original;
  for (const e of edits) {
    next = next.substring(0, e.start) + e.text + next.substring(e.end);
  }
  fs.writeFileSync(filePath, next, 'utf8');
  return edits.length;
}

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.js')) out.push(p);
  }
  return out;
}

const files = walk(QUIZZES_ROOT);
let total = 0;
let touched = 0;
for (const f of files) {
  const n = processFile(f);
  if (n > 0) {
    touched += 1;
    total += n;
    console.log(`  ${path.relative(QUIZZES_ROOT, f)}: ${n}`);
  }
}
console.log(`\nFiles touched: ${touched}, rationales replaced: ${total}`);
