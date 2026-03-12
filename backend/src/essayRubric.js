/**
 * GED Extended Response Essay Rubric — Single Source of Truth
 *
 * Official GED scoring: 3 traits, each 0–2, total 0–6.
 * Trait framing mirrors the official GED RLA Extended Response rubric.
 */

// ---------------------------------------------------------------------------
// Trait definitions
// ---------------------------------------------------------------------------

const GED_TRAITS = {
  trait1: {
    key: 'trait1',
    label: 'Argument & Evidence',
    officialName:
      'Developed an argument using evidence from the passages as support',
    max: 2,
    descriptors: {
      0: 'Off-task, mostly opinion, summary-only, or little/no valid evidence from the passages.',
      1: 'Partial argument; may identify a stronger side but analysis is thin, evidence is limited/vague, may rely too much on summary or personal opinion.',
      2: 'Clearly identifies which text is better supported, explains why, compares support/credibility, and uses multiple relevant pieces of evidence from the passages.',
    },
  },
  trait2: {
    key: 'trait2',
    label: 'Organization',
    officialName: 'Developed ideas in an organized way',
    max: 2,
    descriptors: {
      0: 'Little/no structure; ideas are disconnected, incomplete, or hard to follow.',
      1: 'Some structure but uneven development, weak transitions, or incomplete paragraphing.',
      2: 'Clear intro/body/conclusion or equivalent logical progression; ideas develop in a sensible order with transitions and focused paragraphs.',
    },
  },
  trait3: {
    key: 'trait3',
    label: 'Command of English',
    officialName: 'Followed the rules of the English language',
    max: 2,
    descriptors: {
      0: 'Frequent grammar/usage/mechanics issues that seriously interfere with clarity.',
      1: 'Meaning is generally understandable but there are noticeable errors or limited sentence variety.',
      2: 'Mostly clear and controlled language, appropriate tone, workable sentence variety, and generally correct grammar, usage, and punctuation.',
    },
  },
};

// ---------------------------------------------------------------------------
// Challenge tag taxonomy
// ---------------------------------------------------------------------------

const ESSAY_CHALLENGE_TAGS = [
  'writing:addressing-prompt',
  'writing:analysis',
  'writing:evidence',
  'writing:organization',
  'writing:thesis',
  'writing:grammar-mechanics',
  'writing:clarity',
  'writing:vocabulary',
];

// ---------------------------------------------------------------------------
// AI Scoring prompt builder
// ---------------------------------------------------------------------------

function buildEssayScoringPrompt(essayText, completion) {
  return `You are a strict GED RLA Extended Response evaluator. Score the student's essay using ONLY the official GED rubric below.

=== TASK THE STUDENT WAS GIVEN ===
The student read two passages presenting different positions on a topic. The student must:
1. Determine which position is better supported by evidence in the passages.
2. Explain WHY that position is better supported.
3. Defend assertions with multiple pieces of specific evidence from the passages.
4. Organize ideas clearly and follow English language conventions.

The student's reported completion level: ${completion ?? 'unknown'} sections.

=== OFFICIAL GED RUBRIC (3 traits, each 0-2, total 0-6) ===

TRAIT 1 — Argument & Evidence (0-2):
  0 = ${GED_TRAITS.trait1.descriptors[0]}
  1 = ${GED_TRAITS.trait1.descriptors[1]}
  2 = ${GED_TRAITS.trait1.descriptors[2]}

TRAIT 2 — Organization (0-2):
  0 = ${GED_TRAITS.trait2.descriptors[0]}
  1 = ${GED_TRAITS.trait2.descriptors[1]}
  2 = ${GED_TRAITS.trait2.descriptors[2]}

TRAIT 3 — Command of English (0-2):
  0 = ${GED_TRAITS.trait3.descriptors[0]}
  1 = ${GED_TRAITS.trait3.descriptors[1]}
  2 = ${GED_TRAITS.trait3.descriptors[2]}

=== SCORING RULES (follow strictly) ===
- Score each trait independently as an INTEGER: 0, 1, or 2.
- Judge whether the student analyzed argument strength from the PASSAGES, not generic essay quality.
- Penalize: personal agreement/disagreement instead of textual analysis; summary without evaluation; vague evidence like "passage 1 had better facts" with no specifics; one-sided evidence usage; severe incompleteness.
- If the student does NOT clearly choose which passage/author has the stronger case, Trait 1 CANNOT exceed 1.
- If the essay mainly gives personal opinion rather than analyzing passage support/evidence, Trait 1 CANNOT exceed 1.
- If the essay references only one passage or fails to meaningfully use evidence from both texts, Trait 1 CANNOT exceed 1.
- If the essay is extremely short or incomplete, cap total score appropriately (likely 0-2 total).
- If the essay is off-topic, all traits should be 0.
- If the essay is mostly copied prompt language or generic filler, reduce all scores.
- An incomplete essay (missing sections) cannot score 2 on Trait 2 or Trait 3.

=== WHAT TO LOOK FOR ===
- Explicit claim about which passage is better supported
- Comparison of evidence quality, credibility, and reasoning between passages
- Multiple specific references to and quotations from the passages
- Logical organization with transitions
- Grammar, punctuation, and sentence variety

=== CHALLENGE TAGS ===
From the list below, include every tag that applies as a weakness:
${ESSAY_CHALLENGE_TAGS.map((t) => `"${t}"`).join(', ')}

Tag mapping:
- Student fails to identify which passage is stronger → writing:addressing-prompt
- Student identifies a side but does not explain why → writing:analysis
- Evidence is vague or too thin → writing:evidence
- Paragraphs are weak/disconnected → writing:organization
- No clear controlling claim/thesis → writing:thesis
- Grammar/punctuation errors are substantial → writing:grammar-mechanics
- Wording is confusing or repetitive → writing:clarity
- Word choice is overly limited → writing:vocabulary

=== STUDENT ESSAY ===
${essayText}

=== OUTPUT FORMAT ===
Return ONLY a JSON object with this exact structure (no markdown, no commentary):
{
  "trait1": {
    "score": <0|1|2>,
    "feedback": "<specific feedback about argument & evidence>",
    "strengths": ["<strength1>", ...],
    "nextSteps": ["<actionable suggestion1>", ...]
  },
  "trait2": {
    "score": <0|1|2>,
    "feedback": "<specific feedback about organization>",
    "strengths": ["<strength1>", ...],
    "nextSteps": ["<actionable suggestion1>", ...]
  },
  "trait3": {
    "score": <0|1|2>,
    "feedback": "<specific feedback about language command>",
    "strengths": ["<strength1>", ...],
    "nextSteps": ["<actionable suggestion1>", ...]
  },
  "overallScore": <sum of trait scores>,
  "overallFeedback": "<2-3 sentence summary of overall performance>",
  "challenge_tags": [<applicable tags from the list above>]
}

Rules for output:
- Each trait score MUST be an integer 0, 1, or 2.
- overallScore MUST equal trait1.score + trait2.score + trait3.score.
- strengths and nextSteps should each have 1-3 SHORT items.
- feedback must be specific to THIS essay, not generic boilerplate.
- Do NOT include a model_response field.`;
}

// ---------------------------------------------------------------------------
// Response schema for Gemini structured output
// ---------------------------------------------------------------------------

const ESSAY_RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    trait1: {
      type: 'OBJECT',
      properties: {
        score: { type: 'NUMBER' },
        feedback: { type: 'STRING' },
        strengths: { type: 'ARRAY', items: { type: 'STRING' } },
        nextSteps: { type: 'ARRAY', items: { type: 'STRING' } },
      },
      required: ['score', 'feedback'],
    },
    trait2: {
      type: 'OBJECT',
      properties: {
        score: { type: 'NUMBER' },
        feedback: { type: 'STRING' },
        strengths: { type: 'ARRAY', items: { type: 'STRING' } },
        nextSteps: { type: 'ARRAY', items: { type: 'STRING' } },
      },
      required: ['score', 'feedback'],
    },
    trait3: {
      type: 'OBJECT',
      properties: {
        score: { type: 'NUMBER' },
        feedback: { type: 'STRING' },
        strengths: { type: 'ARRAY', items: { type: 'STRING' } },
        nextSteps: { type: 'ARRAY', items: { type: 'STRING' } },
      },
      required: ['score', 'feedback'],
    },
    overallScore: { type: 'NUMBER' },
    overallFeedback: { type: 'STRING' },
    challenge_tags: { type: 'ARRAY', items: { type: 'STRING' } },
  },
  required: [
    'trait1',
    'trait2',
    'trait3',
    'overallScore',
    'overallFeedback',
  ],
};

// ---------------------------------------------------------------------------
// Deterministic post-processing & validation
// ---------------------------------------------------------------------------

function clampTraitScore(val) {
  const n = Math.round(Number(val));
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(2, n));
}

/**
 * Normalize and validate the raw AI response into a clean, GED-aligned object.
 * Applies clamping, recomputes overallScore, enriches with labels, and
 * filters challenge tags.
 */
function normalizeEssayResponse(raw) {
  if (!raw || typeof raw !== 'object') return null;

  // Peel Google Gemini wrapper if present
  let data = raw;
  if (raw.candidates && raw.candidates[0]?.content?.parts?.[0]?.text) {
    try {
      data = JSON.parse(raw.candidates[0].content.parts[0].text);
    } catch {
      return null;
    }
  }

  if (!data.trait1 || !data.trait2 || !data.trait3) return null;

  const normTrait = (traitData, traitDef) => {
    const score = clampTraitScore(traitData?.score);
    return {
      label: traitDef.label,
      officialName: traitDef.officialName,
      score,
      feedback: String(traitData?.feedback || ''),
      strengths: Array.isArray(traitData?.strengths)
        ? traitData.strengths.map(String).slice(0, 5)
        : [],
      nextSteps: Array.isArray(traitData?.nextSteps)
        ? traitData.nextSteps.map(String).slice(0, 5)
        : [],
    };
  };

  const trait1 = normTrait(data.trait1, GED_TRAITS.trait1);
  const trait2 = normTrait(data.trait2, GED_TRAITS.trait2);
  const trait3 = normTrait(data.trait3, GED_TRAITS.trait3);

  // Always recompute from trait scores
  const overallScore = trait1.score + trait2.score + trait3.score;

  // Filter challenge_tags to only valid values
  const rawTags = Array.isArray(data.challenge_tags)
    ? data.challenge_tags
    : [];
  const challenge_tags = rawTags
    .map((t) => String(t).trim().toLowerCase())
    .filter((t) => ESSAY_CHALLENGE_TAGS.includes(t));

  return {
    trait1,
    trait2,
    trait3,
    overallScore,
    overallFeedback: String(data.overallFeedback || ''),
    challenge_tags,
  };
}

// ---------------------------------------------------------------------------
// Heuristic validation layer (non-AI)
// ---------------------------------------------------------------------------

const EVIDENCE_PHRASES = [
  'according to',
  'the author states',
  'the author argues',
  'the author claims',
  'the passage says',
  'the passage states',
  'the passage argues',
  'the text states',
  'the text says',
  'the writer states',
  'the writer argues',
  'as stated in',
  'as mentioned in',
  'the article says',
  'the article states',
  'evidence from',
  'evidence in',
  'as the author',
  'as the passage',
  'in the passage',
  'passage 1',
  'passage 2',
  'first passage',
  'second passage',
  'first article',
  'second article',
];

const TRANSITION_WORDS = [
  'however',
  'therefore',
  'furthermore',
  'moreover',
  'in addition',
  'on the other hand',
  'in contrast',
  'consequently',
  'as a result',
  'for example',
  'for instance',
  'in conclusion',
  'to begin with',
  'first',
  'second',
  'finally',
  'additionally',
  'nevertheless',
  'although',
  'while',
];

function analyzeEssayHeuristics(essayText) {
  const text = (essayText || '').trim();
  const lower = text.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Paragraph count (split on double-newline or multiple newlines)
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 10);
  const paragraphCount = paragraphs.length;

  // Evidence phrase detection
  const evidencePhraseCount = EVIDENCE_PHRASES.reduce(
    (count, phrase) => count + (lower.includes(phrase) ? 1 : 0),
    0
  );

  // Both passages referenced?
  const mentionsPassage1 =
    /passage\s*1|first\s+passage|first\s+article|first\s+author|first\s+text/i.test(
      text
    );
  const mentionsPassage2 =
    /passage\s*2|second\s+passage|second\s+article|second\s+author|second\s+text|other\s+passage|other\s+author/i.test(
      text
    );
  const mentionsBothPassages = mentionsPassage1 && mentionsPassage2;

  // Transition word count
  const transitionCount = TRANSITION_WORDS.reduce(
    (count, word) =>
      count +
      (new RegExp('\\b' + word.replace(/\s+/g, '\\s+') + '\\b', 'i').test(
        text
      )
        ? 1
        : 0),
    0
  );

  // Detect likely personal opinion dominance
  const personalPhrases = [
    'i think',
    'i believe',
    'i feel',
    'i agree',
    'i disagree',
    'in my opinion',
    'my opinion',
    'personally',
    'i personally',
  ];
  const personalPhraseCount = personalPhrases.reduce(
    (count, phrase) => count + (lower.includes(phrase) ? 1 : 0),
    0
  );

  const isSeverelyShort = wordCount < 50;
  const isShort = wordCount < 150;
  const isVeryShort = wordCount < 100;

  return {
    wordCount,
    paragraphCount,
    evidencePhraseCount,
    mentionsBothPassages,
    mentionsPassage1,
    mentionsPassage2,
    transitionCount,
    personalPhraseCount,
    isSeverelyShort,
    isShort,
    isVeryShort,
  };
}

/**
 * Apply heuristic-based scoring caps and adjustments.
 * Mutates the normalized response in-place and returns warning messages.
 */
function applyHeuristicCaps(normalized, heuristics) {
  const warnings = [];

  // Cap Trait 1 if essay doesn't reference both passages
  if (!heuristics.mentionsBothPassages && normalized.trait1.score > 1) {
    warnings.push(
      `Trait 1 capped to 1: essay does not appear to reference both passages (found passage1=${heuristics.mentionsPassage1}, passage2=${heuristics.mentionsPassage2})`
    );
    normalized.trait1.score = 1;
  }

  // Cap Trait 1 if heavy personal opinion and low evidence
  if (
    heuristics.personalPhraseCount >= 3 &&
    heuristics.evidencePhraseCount < 2 &&
    normalized.trait1.score > 1
  ) {
    warnings.push(
      `Trait 1 capped to 1: heavy personal opinion (${heuristics.personalPhraseCount} phrases) with minimal evidence references (${heuristics.evidencePhraseCount})`
    );
    normalized.trait1.score = 1;
  }

  // Cap total for severely short essays
  if (heuristics.isSeverelyShort) {
    for (const key of ['trait1', 'trait2', 'trait3']) {
      if (normalized[key].score > 0) {
        normalized[key].score = 0;
      }
    }
    warnings.push(
      `All traits capped to 0: severely short essay (${heuristics.wordCount} words)`
    );
  } else if (heuristics.isVeryShort) {
    for (const key of ['trait1', 'trait2', 'trait3']) {
      if (normalized[key].score > 1) {
        normalized[key].score = 1;
      }
    }
    warnings.push(
      `All traits capped to 1: very short essay (${heuristics.wordCount} words)`
    );
  }

  // Recompute overall after caps
  normalized.overallScore =
    normalized.trait1.score + normalized.trait2.score + normalized.trait3.score;

  return warnings;
}

/**
 * Derive challenge tags from heuristic analysis if the AI missed obvious ones.
 */
function deriveChallengeTags(normalized, heuristics) {
  const tags = new Set(normalized.challenge_tags || []);

  if (!heuristics.mentionsBothPassages || normalized.trait1.score === 0) {
    tags.add('writing:addressing-prompt');
  }
  if (normalized.trait1.score <= 1 && heuristics.evidencePhraseCount < 2) {
    tags.add('writing:evidence');
  }
  if (
    normalized.trait1.score <= 1 &&
    heuristics.personalPhraseCount >= 2 &&
    heuristics.evidencePhraseCount < 3
  ) {
    tags.add('writing:analysis');
  }
  if (normalized.trait2.score <= 1 && heuristics.paragraphCount < 3) {
    tags.add('writing:organization');
  }
  if (normalized.trait2.score <= 1 && heuristics.transitionCount < 2) {
    tags.add('writing:organization');
  }
  if (normalized.trait3.score === 0) {
    tags.add('writing:grammar-mechanics');
  }

  normalized.challenge_tags = Array.from(tags).filter((t) =>
    ESSAY_CHALLENGE_TAGS.includes(t)
  );
}

// ---------------------------------------------------------------------------
// GED-aligned fallback response (for error paths)
// ---------------------------------------------------------------------------

function buildFallbackResponse() {
  return {
    trait1: {
      label: GED_TRAITS.trait1.label,
      officialName: GED_TRAITS.trait1.officialName,
      score: 0,
      feedback:
        'We could not evaluate this draft right now. Try again shortly.',
      strengths: [],
      nextSteps: [],
    },
    trait2: {
      label: GED_TRAITS.trait2.label,
      officialName: GED_TRAITS.trait2.officialName,
      score: 0,
      feedback:
        'We could not evaluate this draft right now. Try again shortly.',
      strengths: [],
      nextSteps: [],
    },
    trait3: {
      label: GED_TRAITS.trait3.label,
      officialName: GED_TRAITS.trait3.officialName,
      score: 0,
      feedback:
        'We could not evaluate this draft right now. Try again shortly.',
      strengths: [],
      nextSteps: [],
    },
    overallScore: 0,
    overallFeedback:
      'Temporary scoring outage. Your draft was not saved for scoring; please rescore later.',
    challenge_tags: [],
  };
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

module.exports = {
  GED_TRAITS,
  ESSAY_CHALLENGE_TAGS,
  ESSAY_RESPONSE_SCHEMA,
  buildEssayScoringPrompt,
  normalizeEssayResponse,
  analyzeEssayHeuristics,
  applyHeuristicCaps,
  deriveChallengeTags,
  buildFallbackResponse,
  clampTraitScore,
};
