// Lightweight quiz validator for Math items across different shapes
// Supports common schemas:
// 1) Object options: { question|prompt|stem|content.questionText, answerOptions: [{ text, isCorrect, rationale }, ...] }
// 2) String options: { question|prompt|stem|content.questionText, choices|answerOptions: ["A", ...], correctAnswer: "A", rationale }

function pickChoicesArray(q) {
  // Normalize property name
  if (Array.isArray(q?.choices)) return q.choices;
  if (Array.isArray(q?.answerOptions)) return q.answerOptions;
  return null;
}

function getQuestionText(q) {
  return (
    q?.question ??
    q?.prompt ??
    q?.stem ??
    q?.content?.questionText ??
    q?.content?.question ??
    null
  );
}

export function validateQuizArray(quizzes, { verbose = true } = {}) {
  const problems = [];

  quizzes.forEach((q, i) => {
    const idx = i;
    const choices = pickChoicesArray(q);
    const hasObjectStyle =
      Array.isArray(q?.answerOptions) &&
      typeof q?.answerOptions?.[0] === 'object';
    const qText = getQuestionText(q);
    const qType = String(q?.type || '').toLowerCase();
    const isMultipleChoice =
      qType.includes('multiple-choice') ||
      hasObjectStyle ||
      Array.isArray(q?.choices);

    // Presence checks
    if (!q || typeof q !== 'object') {
      problems.push({ index: idx, reason: 'invalid question object', q });
      return;
    }
    if (!qText || String(qText).trim() === '') {
      problems.push({ index: idx, reason: 'missing field: question', q });
      return;
    }
    if (isMultipleChoice && (!Array.isArray(choices) || choices.length === 0)) {
      problems.push({ index: idx, reason: 'missing field: choices', q });
      return;
    }

    // Ensure four choices when MC
    if (isMultipleChoice && choices.length < 4) {
      problems.push({
        index: idx,
        reason: `too few choices (${choices.length})`,
        q,
      });
    }

    // Rationale presence (object-style or top-level)
    if (hasObjectStyle) {
      const miss = q.answerOptions.some(
        (o) => !o || !o.rationale || String(o.rationale).trim() === ''
      );
      if (miss)
        problems.push({ index: idx, reason: 'missing option rationale', q });
    } else if (
      isMultipleChoice &&
      (!q.rationale || String(q.rationale).trim() === '')
    ) {
      problems.push({ index: idx, reason: 'missing field: rationale', q });
    }

    // Correct answer checks
    if (hasObjectStyle) {
      const correct = (q.answerOptions || []).filter(
        (o) => o && o.isCorrect === true
      );
      if (correct.length !== 1) {
        problems.push({
          index: idx,
          reason: `expected exactly 1 correct option, found ${correct.length}`,
        });
      }
    } else if (isMultipleChoice) {
      const ca = q.correctAnswer ?? q.answerKey;
      if (ca === undefined || ca === null || String(ca).trim() === '') {
        problems.push({
          index: idx,
          reason: 'missing field: correctAnswer',
          q,
        });
      } else {
        const inChoices = choices.some(
          (c) =>
            c === ca ||
            c?.value === ca ||
            String(c).trim() === String(ca).trim()
        );
        if (!inChoices)
          problems.push({
            index: idx,
            reason: 'correctAnswer not in choices',
            q,
          });
      }
    }

    // Duplicate choice texts (ignoring whitespace/case)
    if (isMultipleChoice) {
      const seen = new Set();
      const texts = choices.map((c) =>
        typeof c === 'string' ? c : c?.text ?? ''
      );
      for (const t of texts) {
        const key = String(t).replace(/\s+/g, ' ').trim().toLowerCase();
        if (seen.has(key)) {
          problems.push({
            index: idx,
            reason: 'duplicate choice',
            choice: t,
            q,
          });
          break;
        }
        seen.add(key);
      }
    }
  });

  if (verbose) {
    // Keep console noise minimal in CI
    console.log('Math quiz audit report:', problems);
  }
  return problems;
}

export default { validateQuizArray };
