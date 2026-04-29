const a = await import('./frontend/data/social/constitution_amendments.js');
const cs = await import('./frontend/data/social/constitution_scenarios.js');
const civ = await import('./frontend/data/social/civics_scenarios.js');
const hist = await import('./frontend/data/social/history_timeline_sets.js');
const chart = await import('./frontend/data/economics/econ_chart_questions.js');
console.log('Amendments:', a.AMENDMENTS_DB?.length, '| Packs:', a.PACKS?.length);
console.log('Constitution scenarios:', cs.PRACTICE_SCENARIOS?.length);
console.log('Civics scenarios:', civ.CIVICS_SCENARIOS?.length);
console.log('Timeline sets:', hist.HISTORY_TIMELINE_SETS?.length);
console.log('Chart questions:', chart.ECON_CHART_QUESTIONS?.length);

// Validate civics structure
const badCiv = civ.CIVICS_SCENARIOS.filter(s => !s.id || !s.text || !s.correctBranch || !s.correctLevel || !s.correctPowerType || !s.explanation);
console.log('Civics missing fields:', badCiv.length);

// Validate timeline structure
const badT = hist.HISTORY_TIMELINE_SETS.filter(s => !s.id || !s.title || !Array.isArray(s.events) || s.events.length < 3);
console.log('Timeline malformed:', badT.length);

// Validate amendment scenarios reference existing amendments
const amendIds = new Set(a.AMENDMENTS_DB.map(x => x.id));
const orphan = cs.PRACTICE_SCENARIOS.filter(s => s.correctAmendmentId && !amendIds.has(s.correctAmendmentId));
console.log('Const scenarios with missing amendment ref:', orphan.length, orphan.map(o => o.id));

// Validate chart questions
const badChart = chart.ECON_CHART_QUESTIONS.filter(q => !q.id || !q.prompt || !Array.isArray(q.choices) || typeof q.correct !== 'number' || q.correct < 0 || q.correct >= q.choices.length);
console.log('Chart questions malformed:', badChart.length);
