export function mathSanitizerV2_plain(text) {
  // 0. Guard
  if (typeof text !== 'string' || !text) return text;

  // 1) Preserve tables verbatim
  // (We deliberately do NOT change table markup.)

  // 2) Neutralize math delimiters and macros (future step when we switch to 'math-lite')
  // For now: no-op.

  // 3) Normalize currency consistently (no $)
  return text
    .replace(/\\?\$\s*([0-9][\d.,]*)/g, (_, amt) => `${amt} dollars`)
    .replace(/USD\s*\$/gi, 'USD ');
}

// A wrapper that only runs for subject==='Math'
export function sanitizeQuestionMathOnlyV2(q, subject) {
  if (!q || subject !== 'Math') return q;
  const out = JSON.parse(JSON.stringify(q));
  if (out.questionText) out.questionText = mathSanitizerV2_plain(out.questionText);
  if (Array.isArray(out.answerOptions)) {
    out.answerOptions.forEach(o => { if (o.text) o.text = mathSanitizerV2_plain(o.text); });
  }
  if (out.explanation) out.explanation = mathSanitizerV2_plain(out.explanation);
  return out;
}
