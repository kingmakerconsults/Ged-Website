/**
 * Fix broken currency dollar signs in quiz data files.
 * 
 * Only fixes UNPAIRED \\( and \\) that represent currency, leaving valid
 * LaTeX expressions like \\(22.40\\) intact.
 */

const fs = require('fs');
const path = require('path');

const QUIZ_DIR = path.join(__dirname, 'backend', 'data', 'quizzes', 'math');
const files = fs.readdirSync(QUIZ_DIR).filter(f => f.endsWith('.js'));

let totalChanges = 0;
const changeLog = [];

/**
 * Check if content between \\( and \\) is valid LaTeX math (not plain English).
 */
function isValidMathContent(content) {
  const trimmed = content.trim();
  if (!trimmed) return false;
  
  // If it contains common English words, it's NOT math — it's broken currency
  const englishWords = /\b(the|is|of|and|for|with|what|was|are|has|have|from|that|this|than|then|will|would|should|each|per|plus|total|price|cost|sale|amount|discount|tax|original|percent|increase|decrease|value|salary|bill|tip|commission|profit|revenue|stock|car|shirt|book|ticket|item|store|restaurant|person|company|product|gallon|pound|pencil|apple|orange|after|before|first|second|add|subtract|multiply|divide|calculate|find|determine|which|where|how|many|much|your|their|you|they|if)\b/i;
  if (englishWords.test(trimmed)) return false;
  
  // If it contains sentence-ending punctuation followed by space + capital
  if (/\.\s+[A-Z]/.test(trimmed)) return false;
  
  // VALID: contains actual LaTeX commands, superscript/subscript, or braces
  if (/\\\\|[\\^_{}]/.test(trimmed)) return true;
  
  // VALID: pure number (for answer options like \\(22.40\\))
  if (/^\d[\d,]*(?:\.\d+)?$/.test(trimmed)) return true;
  
  // VALID: contains letter variables (like x, y, a, b — math expressions)
  if (/[a-zA-Z]/.test(trimmed) && !/\s{2,}/.test(trimmed)) return true;
  
  // NOT valid: ends with arithmetic operator (split currency expression)
  // e.g., "62.50 = " or "62.50 + " — these are broken splits
  if (/[=+\-*/]\s*$/.test(trimmed)) return false;
  
  // NOT valid: starts with number and only contains numbers + operators
  // (broken currency calculations like "62.50 = " or "45.50 + ")
  if (/^[\d.,\s=+\-*/]+$/.test(trimmed)) return false;
  
  return true;
}

for (const file of files) {
  const filePath = path.join(QUIZ_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let fileChanges = 0;
  
  const lines = content.split('\n');
  const fixedLines = [];
  
  for (const line of lines) {
    // Find all \\( and \\) positions in this line
    const lineDelims = [];
    const lineDelimRegex = /\\\\[()]/g;
    let lm;
    while ((lm = lineDelimRegex.exec(line)) !== null) {
      lineDelims.push({
        index: lm.index,
        type: lm[0] === '\\\\(' ? 'open' : 'close',
        raw: lm[0]
      });
    }
    
    // Match pairs: each \\( pairs with the next \\) if content is valid math
    const linePaired = new Set();
    const lineStack = [];
    for (const d of lineDelims) {
      if (d.type === 'open') {
        lineStack.push(d);
      } else if (d.type === 'close' && lineStack.length > 0) {
        const opener = lineStack.pop();
        const between = line.substring(opener.index + 4, d.index);
        if (isValidMathContent(between)) {
          linePaired.add(opener.index);
          linePaired.add(d.index);
        } else {
          // Not valid math pair, put opener back
          lineStack.push(opener);
        }
      }
    }
    
    // Replace unpaired \\(NUMBER and \\)NUMBER with $NUMBER
    const fixedLine = line.replace(
      /\\\\[()]\s*(\d[\d,]*(?:\.\d{0,2})?)/g,
      (match, number, offset) => {
        if (linePaired.has(offset)) {
          return match;
        }
        fileChanges++;
        return `$${number}`;
      }
    );
    
    fixedLines.push(fixedLine);
  }
  
  const newContent = fixedLines.join('\n');
  
  if (newContent !== original) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`  ${file}: ${fileChanges} unpaired currency patterns fixed`);
    changeLog.push({ file, fixes: fileChanges });
    totalChanges += fileChanges;
  }
}

console.log(`\nTotal: ${totalChanges} fixes across ${changeLog.length} files`);

// Spot-check key questions
console.log('\n--- Spot-check key questions ---');
const checks = [
  { file: 'math_algebra_03.js', start: 220, end: 226, label: 'Concert tickets Q' },
  { file: 'math_quant_ratios_percents.js', start: 161, end: 167, label: 'Computer price Q' },
  { file: 'math_ratios_10.js', start: 41, end: 48, label: '20% off shirt Q' },
  { file: 'math_number_sense_03.js', start: 50, end: 66, label: 'Bookstore 20% off Q' },
  { file: 'math_number_sense_08.js', start: 51, end: 80, label: 'TV sales tax Q' },
  { file: 'math_ratios_01.js', start: 182, end: 202, label: 'Restaurant bill Q' },
];
for (const c of checks) {
  const fp = path.join(QUIZ_DIR, c.file);
  const lines = fs.readFileSync(fp, 'utf8').split('\n');
  const nearby = lines.slice(c.start - 1, c.end).join('\n');
  console.log(`\n[${c.label}] ${c.file}:${c.start}-${c.end}`);
  console.log(nearby);
}
