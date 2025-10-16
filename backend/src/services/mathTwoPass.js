const { autoFixMathText, needsGptCorrection } = require('../lib/mathLints');
const { sanitizeExamObject } = require('../lib/sanitizeExamText');

const MAX_FIELD_LENGTH = 800;

async function generateMathExamTwoPass(genFn, callGPT) {
    const raw = await genFn();

    if (!raw || !/math/i.test(raw.subject || '')) {
        return sanitizeExamObject(raw, 'latex');
    }

    const toReview = [];

    for (const q of raw.questions || []) {
        const fields = [
            ['stem', q.stem ?? ''],
            ...((q.choices || []).map((c) => [`choice:${c.id}`, c.text ?? ''])),
            ...(q.explanation != null ? [['explanation', q.explanation]] : [])
        ];

        fields.forEach(([field, val]) => {
            const originalText = typeof val === 'string' ? val : '';
            const truncated = originalText.length > MAX_FIELD_LENGTH
                ? originalText.slice(0, MAX_FIELD_LENGTH)
                : originalText;
            const fx = autoFixMathText(truncated);

            if (field === 'stem') {
                q.stem = fx.text;
            } else if (field.startsWith('choice:')) {
                const id = field.split(':')[1];
                const target = (q.choices || []).find((c) => String(c.id) === String(id));
                if (target) target.text = fx.text;
            } else if (field === 'explanation') {
                q.explanation = fx.text;
            }

            const problems = needsGptCorrection(fx.text);
            if (problems.length) {
                toReview.push({ qid: q.id, field, text: fx.text });
            }
        });
    }

    if (toReview.length && typeof callGPT === 'function') {
        const payload = buildValidatorPayload(raw, toReview);
        const corrections = await callGPT(payload);
        applyCorrections(raw, corrections);
    }

    return sanitizeExamObject(raw, 'latex');
}

function buildValidatorPayload(_exam, items) {
    const itemsJson = JSON.stringify(items, null, 2);
    const user = `${VALIDATOR_USER_PROMPT}\n\nITEMS:\n${itemsJson}`;
    return {
        system: VALIDATOR_SYSTEM_PROMPT,
        user
    };
}

function applyCorrections(exam, corrections) {
    if (!Array.isArray(corrections)) return;
    for (const c of corrections) {
        if (!c || typeof c !== 'object') continue;
        const q = (exam.questions || []).find((question) => String(question.id) === String(c.qid));
        if (!q) continue;

        if (c.field === 'stem') {
            const before = q.stem;
            q.stem = c.corrected;
            logCorrection(q.id, c.field, before, c.corrected, c.notes);
        } else if (typeof c.field === 'string' && c.field.startsWith('choice:')) {
            const id = c.field.split(':')[1];
            const target = (q.choices || []).find((choice) => String(choice.id) === String(id));
            if (target) {
                const before = target.text;
                target.text = c.corrected;
                logCorrection(q.id, c.field, before, c.corrected, c.notes);
            }
        } else if (c.field === 'explanation') {
            const before = q.explanation;
            q.explanation = c.corrected;
            logCorrection(q.id, c.field, before, c.corrected, c.notes);
        }
    }
}

function logCorrection(qid, field, before, after, notes) {
    if (before === after) return;
    console.debug('mathTwoPass correction applied', { qid, field, before, after, notes });
}

const VALIDATOR_SYSTEM_PROMPT = 'You are a strict math text formatter. Output JSON ONLY. No prose. Aggressively remove dollar signs from around single variables (e.g., convert "What is the value of $x$?" to "What is the value of x?").';

const VALIDATOR_USER_PROMPT = `You will receive a list of items, each with {qid, field, text}.
For each item:
- Fix math formatting ONLY:
  • Insert missing backslash in \\frac (e.g., "rac{1}{6}" -> "\\\\frac{1}{6}").
  • Convert carets to superscripts: a^2 -> a^{2}; x^(n+1) -> x^{n+1}.
  • Keep existing LaTeX commands as-is when valid.
  • Wrap inline math with \\( ... \\) when math appears outside delimiters.
  • Do NOT change semantics or numbers.
- Preserve non-math wording and punctuation exactly.
- Ensure braces are balanced.
- Idempotent: if already correct, return unchanged.

Return a JSON array of:
{ "qid": string, "field": "stem"|"explanation"|"choice:ID", "corrected": string, "notes": string }`;

module.exports = {
    generateMathExamTwoPass,
    buildValidatorPayload,
    applyCorrections,
    VALIDATOR_USER_PROMPT,
    VALIDATOR_SYSTEM_PROMPT
};
