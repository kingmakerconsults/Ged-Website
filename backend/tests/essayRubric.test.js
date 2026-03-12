/**
 * Tests for GED Essay Rubric module (essayRubric.js)
 *
 * Run: npm test  (or:  node --test tests/essayRubric.test.js)
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const {
  GED_TRAITS,
  ESSAY_CHALLENGE_TAGS,
  buildEssayScoringPrompt,
  normalizeEssayResponse,
  analyzeEssayHeuristics,
  applyHeuristicCaps,
  deriveChallengeTags,
  buildFallbackResponse,
  clampTraitScore,
} = require('../src/essayRubric');

// ---------------------------------------------------------------------------
// GED_TRAITS constants
// ---------------------------------------------------------------------------
describe('GED_TRAITS', () => {
  it('has exactly 3 traits', () => {
    assert.deepStrictEqual(Object.keys(GED_TRAITS), ['trait1', 'trait2', 'trait3']);
  });

  it('each trait has label, officialName, max=2, and descriptors for 0,1,2', () => {
    for (const [, trait] of Object.entries(GED_TRAITS)) {
      assert.ok(trait.label);
      assert.ok(trait.officialName);
      assert.strictEqual(trait.max, 2);
      assert.ok(trait.descriptors[0]);
      assert.ok(trait.descriptors[1]);
      assert.ok(trait.descriptors[2]);
    }
  });
});

// ---------------------------------------------------------------------------
// clampTraitScore
// ---------------------------------------------------------------------------
describe('clampTraitScore', () => {
  it('clamps values to 0-2 integers', () => {
    assert.strictEqual(clampTraitScore(0), 0);
    assert.strictEqual(clampTraitScore(1), 1);
    assert.strictEqual(clampTraitScore(2), 2);
    assert.strictEqual(clampTraitScore(-1), 0);
    assert.strictEqual(clampTraitScore(5), 2);
    assert.strictEqual(clampTraitScore(1.7), 2);
    assert.strictEqual(clampTraitScore(0.4), 0);
    assert.strictEqual(clampTraitScore(NaN), 0);
    assert.strictEqual(clampTraitScore(null), 0);
    assert.strictEqual(clampTraitScore(undefined), 0);
    assert.strictEqual(clampTraitScore('abc'), 0);
  });
});

// ---------------------------------------------------------------------------
// normalizeEssayResponse
// ---------------------------------------------------------------------------
describe('normalizeEssayResponse', () => {
  const makeRaw = (t1 = 2, t2 = 2, t3 = 2) => ({
    trait1: { score: t1, feedback: 'Good argument', strengths: ['clear claim'], nextSteps: ['add more quotes'] },
    trait2: { score: t2, feedback: 'Well organized', strengths: ['intro/body/conclusion'], nextSteps: [] },
    trait3: { score: t3, feedback: 'Mostly correct', strengths: ['sentence variety'], nextSteps: ['watch commas'] },
    overallScore: t1 + t2 + t3,
    overallFeedback: 'Great essay',
    challenge_tags: ['writing:evidence'],
  });

  it('normalizes a valid response', () => {
    const result = normalizeEssayResponse(makeRaw());
    assert.notStrictEqual(result, null);
    assert.strictEqual(result.trait1.score, 2);
    assert.strictEqual(result.trait1.label, 'Argument & Evidence');
    assert.ok(result.trait1.officialName.includes('evidence'));
    assert.strictEqual(result.overallScore, 6);
    assert.deepStrictEqual(result.challenge_tags, ['writing:evidence']);
  });

  it('recomputes overallScore from traits (ignoring AI overallScore)', () => {
    const raw = makeRaw(1, 1, 1);
    raw.overallScore = 99;
    const result = normalizeEssayResponse(raw);
    assert.strictEqual(result.overallScore, 3);
  });

  it('clamps out-of-range scores', () => {
    const raw = makeRaw(5, -1, 1.6);
    const result = normalizeEssayResponse(raw);
    assert.strictEqual(result.trait1.score, 2);
    assert.strictEqual(result.trait2.score, 0);
    assert.strictEqual(result.trait3.score, 2);
    assert.strictEqual(result.overallScore, 4);
  });

  it('filters invalid challenge tags', () => {
    const raw = makeRaw();
    raw.challenge_tags = ['writing:evidence', 'invalid:tag', 'writing:clarity', ''];
    const result = normalizeEssayResponse(raw);
    assert.deepStrictEqual(result.challenge_tags, ['writing:evidence', 'writing:clarity']);
  });

  it('returns null for null/undefined input', () => {
    assert.strictEqual(normalizeEssayResponse(null), null);
    assert.strictEqual(normalizeEssayResponse(undefined), null);
    assert.strictEqual(normalizeEssayResponse('string'), null);
  });

  it('returns null for missing traits', () => {
    assert.strictEqual(normalizeEssayResponse({ trait1: { score: 1 } }), null);
  });

  it('handles Gemini wrapper format', () => {
    const wrapped = {
      candidates: [{
        content: {
          parts: [{
            text: JSON.stringify({
              trait1: { score: 1, feedback: 'ok' },
              trait2: { score: 1, feedback: 'ok' },
              trait3: { score: 0, feedback: 'ok' },
              overallScore: 2,
              overallFeedback: 'ok',
            })
          }]
        }
      }]
    };
    const result = normalizeEssayResponse(wrapped);
    assert.notStrictEqual(result, null);
    assert.strictEqual(result.overallScore, 2);
  });

  it('provides empty arrays for missing strengths/nextSteps', () => {
    const raw = {
      trait1: { score: 1, feedback: 'ok' },
      trait2: { score: 1, feedback: 'ok' },
      trait3: { score: 1, feedback: 'ok' },
      overallScore: 3,
      overallFeedback: 'ok',
    };
    const result = normalizeEssayResponse(raw);
    assert.deepStrictEqual(result.trait1.strengths, []);
    assert.deepStrictEqual(result.trait1.nextSteps, []);
  });
});

// ---------------------------------------------------------------------------
// analyzeEssayHeuristics
// ---------------------------------------------------------------------------
describe('analyzeEssayHeuristics', () => {
  it('detects word count correctly', () => {
    const h = analyzeEssayHeuristics('word '.repeat(200));
    assert.strictEqual(h.wordCount, 200);
  });

  it('detects severely short essay', () => {
    const h = analyzeEssayHeuristics('Too short.');
    assert.strictEqual(h.isSeverelyShort, true);
  });

  it('detects mention of both passages', () => {
    const h = analyzeEssayHeuristics(
      'The first passage argues X. The second passage claims Y. ' +
      'After analyzing both, the first article is stronger because of evidence.'
    );
    assert.strictEqual(h.mentionsBothPassages, true);
  });

  it('detects single passage reference', () => {
    const h = analyzeEssayHeuristics(
      'The first passage argues X. This passage has great evidence. I agree with the author.'
    );
    assert.strictEqual(h.mentionsPassage1, true);
    assert.strictEqual(h.mentionsPassage2, false);
    assert.strictEqual(h.mentionsBothPassages, false);
  });

  it('detects evidence phrases', () => {
    const h = analyzeEssayHeuristics(
      'According to the author, the passage states that evidence is important. The text says this clearly.'
    );
    assert.ok(h.evidencePhraseCount >= 3);
  });

  it('detects personal opinion phrases', () => {
    const h = analyzeEssayHeuristics(
      'I think this is a great topic. I believe the author is right. In my opinion, we should all agree.'
    );
    assert.ok(h.personalPhraseCount >= 3);
  });

  it('detects transitions', () => {
    const h = analyzeEssayHeuristics(
      'First, the author claims X. However, the second author disagrees. In conclusion, the first is stronger.'
    );
    assert.ok(h.transitionCount >= 3);
  });

  it('counts paragraphs', () => {
    const h = analyzeEssayHeuristics(
      'First paragraph about the topic and evidence.\n\nSecond paragraph with more analysis of the passages.\n\nThird paragraph is the conclusion.'
    );
    assert.strictEqual(h.paragraphCount, 3);
  });
});

// ---------------------------------------------------------------------------
// applyHeuristicCaps
// ---------------------------------------------------------------------------
describe('applyHeuristicCaps', () => {
  const makeNormalized = (t1 = 2, t2 = 2, t3 = 2) => ({
    trait1: { score: t1, label: 'Argument & Evidence', feedback: '' },
    trait2: { score: t2, label: 'Organization', feedback: '' },
    trait3: { score: t3, label: 'Command of English', feedback: '' },
    overallScore: t1 + t2 + t3,
    overallFeedback: '',
    challenge_tags: [],
  });

  it('caps trait1 when only one passage referenced', () => {
    const n = makeNormalized(2, 2, 2);
    const h = { mentionsBothPassages: false, mentionsPassage1: true, mentionsPassage2: false, personalPhraseCount: 0, evidencePhraseCount: 5, isSeverelyShort: false, isVeryShort: false, wordCount: 300 };
    const warnings = applyHeuristicCaps(n, h);
    assert.strictEqual(n.trait1.score, 1);
    assert.strictEqual(n.overallScore, 5);
    assert.ok(warnings.length > 0);
  });

  it('caps trait1 for heavy personal opinion with little evidence', () => {
    const n = makeNormalized(2, 2, 2);
    const h = { mentionsBothPassages: true, personalPhraseCount: 4, evidencePhraseCount: 1, isSeverelyShort: false, isVeryShort: false, wordCount: 300 };
    const warnings = applyHeuristicCaps(n, h);
    assert.strictEqual(n.trait1.score, 1);
    assert.ok(warnings.length > 0);
  });

  it('caps all traits to 0 for severely short essay', () => {
    const n = makeNormalized(2, 2, 2);
    const h = { mentionsBothPassages: true, personalPhraseCount: 0, evidencePhraseCount: 0, isSeverelyShort: true, isVeryShort: true, wordCount: 20 };
    const warnings = applyHeuristicCaps(n, h);
    assert.strictEqual(n.trait1.score, 0);
    assert.strictEqual(n.trait2.score, 0);
    assert.strictEqual(n.trait3.score, 0);
    assert.strictEqual(n.overallScore, 0);
  });

  it('caps all traits to 1 for very short essay', () => {
    const n = makeNormalized(2, 2, 2);
    const h = { mentionsBothPassages: true, personalPhraseCount: 0, evidencePhraseCount: 0, isSeverelyShort: false, isVeryShort: true, wordCount: 80 };
    const warnings = applyHeuristicCaps(n, h);
    assert.strictEqual(n.trait1.score, 1);
    assert.strictEqual(n.trait2.score, 1);
    assert.strictEqual(n.trait3.score, 1);
    assert.strictEqual(n.overallScore, 3);
  });

  it('does not cap a strong essay with both passages and evidence', () => {
    const n = makeNormalized(2, 2, 2);
    const h = { mentionsBothPassages: true, personalPhraseCount: 0, evidencePhraseCount: 5, isSeverelyShort: false, isVeryShort: false, wordCount: 400 };
    const warnings = applyHeuristicCaps(n, h);
    assert.strictEqual(n.trait1.score, 2);
    assert.strictEqual(n.trait2.score, 2);
    assert.strictEqual(n.trait3.score, 2);
    assert.strictEqual(n.overallScore, 6);
    assert.strictEqual(warnings.length, 0);
  });
});

// ---------------------------------------------------------------------------
// deriveChallengeTags
// ---------------------------------------------------------------------------
describe('deriveChallengeTags', () => {
  it('adds writing:addressing-prompt when passages not referenced', () => {
    const n = { trait1: { score: 0 }, trait2: { score: 1 }, trait3: { score: 1 }, challenge_tags: [] };
    deriveChallengeTags(n, { mentionsBothPassages: false, evidencePhraseCount: 0, personalPhraseCount: 0, paragraphCount: 1, transitionCount: 0 });
    assert.ok(n.challenge_tags.includes('writing:addressing-prompt'));
  });

  it('adds writing:evidence for thin evidence', () => {
    const n = { trait1: { score: 1 }, trait2: { score: 2 }, trait3: { score: 2 }, challenge_tags: [] };
    deriveChallengeTags(n, { mentionsBothPassages: true, evidencePhraseCount: 0, personalPhraseCount: 0, paragraphCount: 5, transitionCount: 4 });
    assert.ok(n.challenge_tags.includes('writing:evidence'));
  });

  it('adds writing:organization for few paragraphs', () => {
    const n = { trait1: { score: 2 }, trait2: { score: 1 }, trait3: { score: 2 }, challenge_tags: [] };
    deriveChallengeTags(n, { mentionsBothPassages: true, evidencePhraseCount: 5, personalPhraseCount: 0, paragraphCount: 1, transitionCount: 0 });
    assert.ok(n.challenge_tags.includes('writing:organization'));
  });

  it('adds writing:grammar-mechanics for trait3=0', () => {
    const n = { trait1: { score: 2 }, trait2: { score: 2 }, trait3: { score: 0 }, challenge_tags: [] };
    deriveChallengeTags(n, { mentionsBothPassages: true, evidencePhraseCount: 5, personalPhraseCount: 0, paragraphCount: 5, transitionCount: 4 });
    assert.ok(n.challenge_tags.includes('writing:grammar-mechanics'));
  });

  it('deduplicates tags', () => {
    const n = { trait1: { score: 0 }, trait2: { score: 1 }, trait3: { score: 1 }, challenge_tags: ['writing:addressing-prompt'] };
    deriveChallengeTags(n, { mentionsBothPassages: false, evidencePhraseCount: 0, personalPhraseCount: 0, paragraphCount: 1, transitionCount: 0 });
    const addrCount = n.challenge_tags.filter(t => t === 'writing:addressing-prompt').length;
    assert.strictEqual(addrCount, 1);
  });
});

// ---------------------------------------------------------------------------
// buildFallbackResponse
// ---------------------------------------------------------------------------
describe('buildFallbackResponse', () => {
  it('returns GED-aligned structure with all required fields', () => {
    const fb = buildFallbackResponse();
    assert.strictEqual(fb.trait1.label, 'Argument & Evidence');
    assert.strictEqual(fb.trait2.label, 'Organization');
    assert.strictEqual(fb.trait3.label, 'Command of English');
    assert.ok(fb.trait1.officialName);
    assert.strictEqual(fb.overallScore, 0);
    assert.deepStrictEqual(fb.challenge_tags, []);
    assert.ok(Array.isArray(fb.trait1.strengths));
    assert.ok(Array.isArray(fb.trait1.nextSteps));
  });

  it('does not include model_response', () => {
    const fb = buildFallbackResponse();
    assert.strictEqual(fb.model_response, undefined);
  });
});

// ---------------------------------------------------------------------------
// buildEssayScoringPrompt
// ---------------------------------------------------------------------------
describe('buildEssayScoringPrompt', () => {
  it('includes essay text in prompt', () => {
    const prompt = buildEssayScoringPrompt('My essay here', '5/5');
    assert.ok(prompt.includes('My essay here'));
  });

  it('includes GED rubric descriptors', () => {
    const prompt = buildEssayScoringPrompt('test', '3/5');
    assert.ok(prompt.includes('Argument & Evidence'));
    assert.ok(prompt.includes('Organization'));
    assert.ok(prompt.includes('Command of English'));
  });

  it('includes scoring caps/rules', () => {
    const prompt = buildEssayScoringPrompt('test', '5/5');
    assert.ok(prompt.includes('CANNOT exceed 1'));
    assert.ok(prompt.includes('personal opinion'));
  });

  it('does NOT request model_response as a required field', () => {
    const prompt = buildEssayScoringPrompt('test', '5/5');
    // The prompt should tell the model NOT to include it, but should not ask for it as an output field
    assert.ok(!prompt.includes('include a "model_response" field'));
  });

  it('includes challenge tag list', () => {
    const prompt = buildEssayScoringPrompt('test', '5/5');
    assert.ok(prompt.includes('writing:addressing-prompt'));
    assert.ok(prompt.includes('writing:vocabulary'));
  });

  it('includes completion context', () => {
    const prompt = buildEssayScoringPrompt('test', '3/5');
    assert.ok(prompt.includes('3/5'));
  });
});

// ---------------------------------------------------------------------------
// Integration: scoring scenarios
// ---------------------------------------------------------------------------
describe('Integration scenarios', () => {
  it('strong essay with evidence from both passages scores 5-6', () => {
    const raw = {
      trait1: { score: 2, feedback: 'Clear argument with both passages', strengths: ['claim identified'], nextSteps: [] },
      trait2: { score: 2, feedback: 'Well organized', strengths: ['transitions'], nextSteps: [] },
      trait3: { score: 2, feedback: 'Good grammar', strengths: ['sentence variety'], nextSteps: [] },
      overallScore: 6,
      overallFeedback: 'Excellent',
      challenge_tags: [],
    };
    const normalized = normalizeEssayResponse(raw);
    const essayText =
      'In the first passage, the author argues that standardized testing is essential. According to the author, "tests provide an objective measure." The evidence in the first passage includes statistics and expert opinions that support the reliability of testing.\n\n' +
      'The second passage claims testing is unfair. The second author states that "socioeconomic factors skew results." However, the second author relies primarily on anecdotal evidence and emotional appeals.\n\n' +
      'When comparing both passages, the first passage is better supported because it provides statistical evidence and expert citations. The reasoning is logical and addresses counterarguments directly.\n\n' +
      'Furthermore, the first author acknowledges potential flaws in testing but argues they can be mitigated. This nuanced approach strengthens the overall argument.\n\n' +
      'In conclusion, the first author presents the more convincing case by effectively using data and logical reasoning, while the second author\'s reliance on anecdotes weakens the opposing position.';
    const heuristics = analyzeEssayHeuristics(essayText);
    applyHeuristicCaps(normalized, heuristics);
    assert.ok(normalized.overallScore >= 5, `Expected >= 5, got ${normalized.overallScore}`);
  });

  it('personal opinion essay gets trait1 capped', () => {
    const raw = {
      trait1: { score: 2, feedback: 'ok' },
      trait2: { score: 2, feedback: 'ok' },
      trait3: { score: 2, feedback: 'ok' },
      overallScore: 6,
      overallFeedback: 'ok',
    };
    const normalized = normalizeEssayResponse(raw);
    const heuristics = analyzeEssayHeuristics(
      'I think testing is bad. I believe students should not be tested. In my opinion, tests are unfair. I feel strongly about this. Personally, I agree testing is harmful.'
    );
    applyHeuristicCaps(normalized, heuristics);
    assert.ok(normalized.trait1.score <= 1);
  });

  it('one-passage-only essay gets trait1 capped', () => {
    const raw = {
      trait1: { score: 2, feedback: 'ok' },
      trait2: { score: 1, feedback: 'ok' },
      trait3: { score: 1, feedback: 'ok' },
      overallScore: 4,
      overallFeedback: 'ok',
    };
    const normalized = normalizeEssayResponse(raw);
    const heuristics = analyzeEssayHeuristics(
      'The first passage makes a strong argument. The first passage uses statistics and expert testimony. According to the passage, testing is helpful. The author states that data supports this view. This first passage is convincing.'
    );
    applyHeuristicCaps(normalized, heuristics);
    assert.ok(normalized.trait1.score <= 1);
  });

  it('extremely short essay gets low total', () => {
    const raw = {
      trait1: { score: 1, feedback: 'ok' },
      trait2: { score: 1, feedback: 'ok' },
      trait3: { score: 1, feedback: 'ok' },
      overallScore: 3,
      overallFeedback: 'ok',
    };
    const normalized = normalizeEssayResponse(raw);
    const heuristics = analyzeEssayHeuristics('Testing is good.');
    applyHeuristicCaps(normalized, heuristics);
    assert.strictEqual(normalized.overallScore, 0);
  });

  it('malformed model response returns null, fallback is GED-aligned', () => {
    const result = normalizeEssayResponse({ broken: 'data' });
    assert.strictEqual(result, null);
    const fallback = buildFallbackResponse();
    assert.strictEqual(fallback.trait1.score, 0);
    assert.strictEqual(fallback.overallScore, 0);
    assert.strictEqual(fallback.trait1.label, 'Argument & Evidence');
  });

  it('disorganized essay with decent ideas => weak trait2 preserved', () => {
    const raw = {
      trait1: { score: 2, feedback: 'ok' },
      trait2: { score: 1, feedback: 'ok' },
      trait3: { score: 2, feedback: 'ok' },
      overallScore: 5,
      overallFeedback: 'ok',
    };
    const normalized = normalizeEssayResponse(raw);
    assert.strictEqual(normalized.trait2.score, 1);
    assert.strictEqual(normalized.overallScore, 5);
  });

  it('grammar-heavy error essay => weak trait3 preserved', () => {
    const raw = {
      trait1: { score: 2, feedback: 'ok' },
      trait2: { score: 2, feedback: 'ok' },
      trait3: { score: 0, feedback: 'Severe grammar issues' },
      overallScore: 4,
      overallFeedback: 'ok',
    };
    const normalized = normalizeEssayResponse(raw);
    assert.strictEqual(normalized.trait3.score, 0);
    assert.strictEqual(normalized.overallScore, 4);
  });
});
