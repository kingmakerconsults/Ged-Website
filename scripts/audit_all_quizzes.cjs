#!/usr/bin/env node
// Audit all quizzes: detect placeholders and missing question text across all sources
// Outputs a JSON and Markdown report under reports/

const fs = require('fs');
const path = require('path');
const vm = require('node:vm');
const { pathToFileURL } = require('url');
const { createRequire } = require('module');

const root = path.resolve(__dirname, '..');
const requireCJS = createRequire(__filename);

// Placeholder patterns with word boundaries to avoid false positives like 'democracy'
const PLACEHOLDER_PATTERNS = [
  /\bplaceholder\b/i,
  /\blorem\b/i,
  /\bipsum\b/i,
  /\btbd\b/i,
  /\bto\s*be\s*determined\b/i,
  /\bcoming\s*soon\b/i,
  /\bwrite\s+question\b/i,
  /\binsert\s+question\b/i,
  /\bsample\s+question\b/i,
  /\bdemo\b(?!cracy)/i,
  /\bfill\s+in\s+later\b/i,
  /\bautogen(erated)?\b/i,
  /\btemplate\b/i,
];

function looksPlaceholder(s) {
  if (!s || typeof s !== 'string') return false;
  const trimmed = s.trim();
  if (!trimmed) return true; // treat empty as placeholder-like for our audit
  return PLACEHOLDER_PATTERNS.some((re) => re.test(trimmed));
}

function safeRead(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return null; }
}

async function loadFrontendQuizData() {
  const filePath = path.join(root, 'frontend', 'data', 'quiz_data.js');
  try {
    const mod = await import(pathToFileURL(filePath).href);
    const data = mod.expandedQuizData || mod.default || null;
    return data ? [{ filePath: 'frontend/data/quiz_data.js', kind: 'esm', data }] : [];
  } catch (err) {
    return [];
  }
}

function loadPremadeQuestions() {
  const filePath = path.join(root, 'backend', 'data', 'premade-questions.js');
  try {
    const mod = requireCJS(filePath);
    return [{ filePath: 'backend/data/premade-questions.js', kind: 'cjs', data: mod.ALL_QUIZZES }];
  } catch (err) {
    return [];
  }
}

function loadQuizzesTxt() {
  const filePath = path.join(root, 'quizzes.txt');
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    return [{ filePath: 'quizzes.txt', kind: 'json', data }];
  } catch (err) {
    return [];
  }
}

function loadExpandedBundle() {
  const filePath = path.join(root, 'frontend', 'Expanded', 'expanded.quizzes.bundle.js');
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const marker = 'window.ExpandedQuizData = ';
    const idx = raw.indexOf(marker);
    if (idx === -1) throw new Error('marker not found');
    const jsonStart = raw.indexOf('{', idx);
    const jsonEnd = raw.lastIndexOf('}');
    const jsonStr = raw.slice(jsonStart, jsonEnd + 1);
    const data = JSON.parse(jsonStr);
    return [{ filePath: 'frontend/Expanded/expanded.quizzes.bundle.js', kind: 'bundle', data }];
  } catch (err) {
    return [];
  }
}

function loadNewExams() {
  const dir = path.join(root, 'frontend', 'New Exams');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
  const results = [];
  for (const f of files) {
    const abs = path.join(dir, f);
    try {
      const raw = fs.readFileSync(abs, 'utf8');
      const code = raw.replace(/\bconst\s+([A-Za-z0-9_]+)\s*=\s*\{/, 'var $1 = {');
      const sandbox = {};
      vm.createContext(sandbox);
      new vm.Script(code + '\n;globalThis.__EXPORTED__ = typeof newMathExams!=="undefined"?newMathExams:undefined;').runInContext(sandbox, { timeout: 2000 });
      const obj = sandbox.__EXPORTED__;
      if (obj && typeof obj === 'object') {
        results.push({ filePath: `frontend/New Exams/${f}`, kind: 'jsobj', data: obj });
      }
    } catch {}
  }
  return results;
}

function enumerateQuestionsFromDataTag({ filePath, data }) {
  const items = [];
  if (Array.isArray(data)) {
    for (const quiz of data) {
      const qArr = Array.isArray(quiz.questions) ? quiz.questions : [];
      qArr.forEach((q, i) => items.push({ filePath, quizId: quiz.id || quiz.title || 'unknown', question: q, index: i + 1 }));
    }
    return items;
  }
  const subjects = Object.entries(data || {});
  for (const [subjectName, subject] of subjects) {
    const categories = subject?.categories || {};
    for (const [catName, cat] of Object.entries(categories)) {
      const topics = cat?.topics || [];
      for (const topic of topics) {
        if (Array.isArray(topic.quizzes)) {
          for (const quiz of topic.quizzes) {
            const qArr = Array.isArray(quiz.questions) ? quiz.questions : [];
            qArr.forEach((q, i) => items.push({ filePath, quizId: quiz.quizId || quiz.id || `${topic.id || topic.title || 'topic'}`, question: q, index: i + 1 }));
          }
        }
        if (Array.isArray(topic.questions)) {
          const quizId = topic.id || topic.title || `${subjectName}:${catName}`;
          topic.questions.forEach((q, i) => items.push({ filePath, quizId, question: q, index: i + 1 }));
        }
      }
    }
  }
  return items;
}

function enumerateQuestionsFromNewExams({ filePath, data }) {
  const items = [];
  for (const [subjectName, subject] of Object.entries(data || {})) {
    const categories = subject?.categories || {};
    for (const [catName, cat] of Object.entries(categories)) {
      for (const topic of cat.topics || []) {
        for (const quiz of topic.quizzes || []) {
          for (let i = 0; i < (quiz.questions || []).length; i++) {
            items.push({ filePath, quizId: quiz.id || quiz.title || `${topic.id || topic.title}`, question: quiz.questions[i], index: i + 1 });
          }
        }
      }
    }
  }
  return items;
}

function getQuestionText(q) {
  if (!q || typeof q !== 'object') return '';
  const direct = (
    typeof q.questionText === 'string' ? q.questionText :
    typeof q.text === 'string' ? q.text :
    typeof q.question === 'string' ? q.question :
    ''
  );
  if (direct && direct.trim()) return direct;
  // common nested structure used in premade questions
  const content = q.content && typeof q.content === 'object' ? q.content : null;
  if (content) {
    const nested = (
      typeof content.questionText === 'string' ? content.questionText :
      typeof content.text === 'string' ? content.text :
      typeof content.question === 'string' ? content.question :
      ''
    );
    if (nested && nested.trim()) return nested;
  }
  return '';
}

function auditQuestion(q, ctx, issues) {
  const qText = getQuestionText(q);
  const hasOptions = Array.isArray(q?.answerOptions) && q.answerOptions.length > 0;

  // Goal 1: No placeholders in question text
  if (looksPlaceholder(qText)) {
    issues.push(`${ctx} Placeholder or empty questionText`);
  }

  // Goal 2: Ensure there is an actual question
  if (!qText || !qText.trim()) {
    issues.push(`${ctx} Missing question text`);
  } else if (/\?$/.test(qText.trim()) === false) {
    // Not strictly required to end with '?', but flag suspicious statements with no interrogative cues
    const hasCue = /\b(what|which|who|whom|whose|when|where|why|how|choose|select|identify|determine|calculate|find|infer|conclude|most|least|solve|simplify|evaluate|express|graph|factor|expand|approximate|round|classify|compare|convert|true or false)\b/i.test(qText);
    if (!hasCue) {
      issues.push(`${ctx} Question text may not be an actual question (no '?' and no interrogative cue)`);
    }
  }

  // Also detect obvious placeholder options
  if (hasOptions) {
    for (let i = 0; i < q.answerOptions.length; i++) {
      const opt = q.answerOptions[i];
      const t = typeof opt?.text === 'string' ? opt.text : '';
      if (looksPlaceholder(t)) {
        issues.push(`${ctx} Option ${i + 1} looks like placeholder text`);
      }
    }
  }
}

async function main() {
  const datasets = [
    ...(await loadFrontendQuizData()),
    ...loadPremadeQuestions(),
    ...loadQuizzesTxt(),
    ...loadExpandedBundle(),
    ...loadNewExams(),
  ];

  const issues = [];
  let totalQuestions = 0;
  let filesSummary = [];

  for (const tag of datasets) {
    let questions = [];
    if (tag.kind === 'jsobj' && tag.filePath.startsWith('frontend/New Exams')) {
      questions = enumerateQuestionsFromNewExams(tag);
    } else {
      questions = enumerateQuestionsFromDataTag(tag);
    }

    totalQuestions += questions.length;
    let fileIssues = 0;

    for (const it of questions) {
      const ctx = `[${it.filePath}][${it.quizId} Q#${it.index}]`;
      auditQuestion(it.question, ctx, issues);
    }

    fileIssues = issues.filter((s) => s.includes(`[${tag.filePath}]`)).length;
    filesSummary.push({ file: tag.filePath, questions: questions.length, issues: fileIssues });
  }

  const reportDir = path.join(root, 'reports');
  try { fs.mkdirSync(reportDir, { recursive: true }); } catch {}
  const stamp = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 19);
  const jsonPath = path.join(reportDir, `all_quizzes_audit_${stamp}.json`);
  const mdPath = path.join(reportDir, `all_quizzes_audit_${stamp}.md`);

  const report = { when: new Date().toISOString(), totalQuestions, totalIssues: issues.length, filesSummary, issues };
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), 'utf8');

  const md = [
    `# All Quizzes Audit Report`,
    `- Timestamp: ${new Date().toISOString()}`,
    `- Total questions scanned: ${totalQuestions}`,
    `- Total issues: ${issues.length}`,
    ``,
    `## File Summary`,
    ...filesSummary.map(f => `- ${f.file}: questions=${f.questions}, issues=${f.issues}`),
    ``,
    issues.length ? '## Issues' : '## Issues\nNone found',
    ...issues.map(s => `- ${s}`)
  ].join('\n');
  fs.writeFileSync(mdPath, md, 'utf8');

  if (issues.length) {
    console.log(`[AUDIT] Issues found: ${issues.length}. See ${jsonPath} and ${mdPath}`);
    process.exitCode = 1;
  } else {
    console.log(`[AUDIT] No issues found. See ${jsonPath} and ${mdPath}`);
    process.exitCode = 0;
  }
}

main().catch((e) => {
  console.error('Audit failed:', e?.message || e);
  process.exit(1);
});
