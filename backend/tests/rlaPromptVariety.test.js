const test = require('node:test');
const assert = require('node:assert/strict');

const {
  nextRlaReadingBlueprintSet,
  nextRlaEssayBlueprint,
  nextRlaLanguageBlueprintSet,
  resetRlaPromptVarietyState,
} = require('../src/exams/rlaPromptVariety');

test('RLA reading blueprint rotation returns 2 informational, 1 paired, and 1 literary brief', () => {
  resetRlaPromptVarietyState();

  const plan = nextRlaReadingBlueprintSet();

  assert.equal(plan.informational.length, 2);
  assert.ok(plan.paired);
  assert.ok(plan.literary);
  assert.equal(new Set(plan.informational.map((entry) => entry.id)).size, 2);
});

test('RLA essay blueprint rotation avoids immediate repeats', () => {
  resetRlaPromptVarietyState();

  const first = nextRlaEssayBlueprint();
  const second = nextRlaEssayBlueprint();
  const third = nextRlaEssayBlueprint();

  assert.ok(first);
  assert.ok(second);
  assert.ok(third);
  assert.notEqual(first.id, second.id);
  assert.notEqual(second.id, third.id);
});

test('RLA language blueprint rotation returns 7 distinct document scenarios', () => {
  resetRlaPromptVarietyState();

  const docs = nextRlaLanguageBlueprintSet();

  assert.equal(docs.length, 7);
  assert.equal(new Set(docs.map((entry) => entry.id)).size, 7);
  assert.ok(docs.every((entry) => typeof entry.documentType === 'string'));
});
