// Programmatic quality audit of all premade quiz banks.
// Applies classifyCoreQuestionQualityIssues (same standard used to gate AI bank
// imports) across every question in every premade source. Writes a structured
// report to reports/premade-quiz-quality-YYYYMMDD-HHMMSS.{json,md}.

import fs from 'fs';
import path from 'path';
import vm from 'node:vm';
import { pathToFileURL, fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const requireCJS = createRequire(import.meta.url);

const { classifyCoreQuestionQualityIssues } = requireCJS(
  path.join(root, 'backend', 'src', 'lib', 'questionQualityCore.js')
);
const { loadExpandedQuizBundleData } = requireCJS(
  path.join(root, 'utils', 'expandedQuizBundleLoader.cjs')
);

function ts() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(
    d.getHours()
  )}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

async function loadFrontendQuizData() {
  const filePath = path.join(root, 'frontend', 'data', 'quiz_data.js');
  const mod = await import(pathToFileURL(filePath).href);
  return {
    filePath: 'frontend/data/quiz_data.js',
    data: mod.expandedQuizData || mod.default || null,
  };
}

function loadPremadeQuestions() {
  const filePath = path.join(root, 'backend', 'data', 'premade-questions.js');
  const mod = requireCJS(filePath);
  return {
    filePath: 'backend/data/premade-questions.js',
    data: mod.ALL_QUIZZES || mod.default || mod,
  };
}

function loadQuizzesTxt() {
  const filePath = path.join(root, 'quizzes.txt');
  const raw = fs.readFileSync(filePath, 'utf8');
  return { filePath: 'quizzes.txt', data: JSON.parse(raw) };
}

function loadExpandedBundle() {
  const filePath = path.join(
    root,
    'frontend',
    'Expanded',
    'expanded.quizzes.bundle.js'
  );
  return {
    filePath: 'frontend/Expanded/expanded.quizzes.bundle.js',
    data: loadExpandedQuizBundleData(filePath),
  };
}

function loadNewExams() {
  const dir = path.join(root, 'frontend', 'New Exams');
  const sources = [];
  if (!fs.existsSync(dir)) return sources;
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.js'))) {
    const abs = path.join(dir, f);
    try {
      const raw = fs.readFileSync(abs, 'utf8');
      const code = raw.replace(
        /\bconst\s+([A-Za-z0-9_]+)\s*=\s*\{/,
        'var $1 = {'
      );
      const sandbox = {};
      vm.createContext(sandbox);
      new vm.Script(
        code +
          '\n;globalThis.__EXPORTED__ = typeof newMathExams!=="undefined"?newMathExams:undefined;'
      ).runInContext(sandbox, { timeout: 4000 });
      if (sandbox.__EXPORTED__) {
        sources.push({
          filePath: `frontend/New Exams/${f}`,
          data: sandbox.__EXPORTED__,
        });
      }
    } catch (err) {
      console.warn(`[WARN] ${abs}: ${err.message}`);
    }
  }
  return sources;
}

// --- enumerator ---
function enumerate({ filePath, data }, fallbackSubject) {
  const out = [];
  if (!data) return out;

  if (Array.isArray(data)) {
    for (const quiz of data) {
      const qArr = Array.isArray(quiz.questions) ? quiz.questions : [];
      qArr.forEach((q, i) =>
        out.push({
          filePath,
          subject: q.subject || quiz.subject || fallbackSubject || null,
          quizId: quiz.id || quiz.quizId || quiz.title || 'unknown',
          quizTitle: quiz.title || quiz.id || 'unknown',
          index: i + 1,
          q,
        })
      );
    }
    return out;
  }

  for (const [subjectName, subject] of Object.entries(data)) {
    const categories = subject?.categories || {};
    for (const [catName, cat] of Object.entries(categories)) {
      for (const topic of cat?.topics || []) {
        const topicQuizzes = Array.isArray(topic.quizzes) ? topic.quizzes : [];
        for (const quiz of topicQuizzes) {
          const qArr = Array.isArray(quiz.questions) ? quiz.questions : [];
          qArr.forEach((q, i) =>
            out.push({
              filePath,
              subject: q.subject || quiz.subject || subjectName,
              category: catName,
              topic: topic.id || topic.title || null,
              quizId: quiz.quizId || quiz.id || quiz.title || 'unknown',
              quizTitle: quiz.title || quiz.id || 'unknown',
              index: i + 1,
              q,
            })
          );
        }
        if (Array.isArray(topic.questions)) {
          topic.questions.forEach((q, i) =>
            out.push({
              filePath,
              subject: q.subject || subjectName,
              category: catName,
              topic: topic.id || topic.title || null,
              quizId: topic.id || topic.title || 'unknown',
              quizTitle: topic.title || topic.id || 'unknown',
              index: i + 1,
              q,
            })
          );
        }
      }
    }
  }
  return out;
}

function snippet(s, n = 120) {
  if (!s) return '';
  const t = String(s).replace(/\s+/g, ' ').trim();
  return t.length > n ? t.slice(0, n - 1) + '…' : t;
}

async function main() {
  const sources = [];
  try {
    sources.push(await loadFrontendQuizData());
  } catch (e) {
    console.warn('[WARN] frontend quiz_data.js:', e.message);
  }
  try {
    sources.push(loadPremadeQuestions());
  } catch (e) {
    console.warn('[WARN] backend premade-questions.js:', e.message);
  }
  try {
    sources.push(loadQuizzesTxt());
  } catch (e) {
    console.warn('[WARN] quizzes.txt:', e.message);
  }
  try {
    sources.push(loadExpandedBundle());
  } catch (e) {
    console.warn('[WARN] expanded bundle:', e.message);
  }
  for (const s of loadNewExams()) sources.push(s);

  const results = {
    generatedAt: new Date().toISOString(),
    sources: [],
    totals: {
      questions: 0,
      withIssues: 0,
      issueCounts: {},
    },
    flagged: [], // (capped) sample of flagged questions
  };
  const FLAGGED_CAP = 500;

  const perQuiz = new Map(); // key = `${filePath}::${quizId}` -> {count, issues, title, subject}

  for (const src of sources) {
    const items = enumerate(src);
    const sourceSummary = {
      filePath: src.filePath,
      questions: items.length,
      withIssues: 0,
      issueCounts: {},
      quizzesAffected: 0,
      bySubject: {},
    };
    const affectedQuizzes = new Set();

    for (const it of items) {
      results.totals.questions += 1;
      const issues = classifyCoreQuestionQualityIssues({
        ...it.q,
        subject: it.subject,
      });
      const subjLabel = it.subject || 'unknown';
      sourceSummary.bySubject[subjLabel] ||= {
        questions: 0,
        withIssues: 0,
        issueCounts: {},
      };
      sourceSummary.bySubject[subjLabel].questions += 1;

      const quizKey = `${src.filePath}::${it.quizId}`;
      if (!perQuiz.has(quizKey)) {
        perQuiz.set(quizKey, {
          filePath: src.filePath,
          quizId: it.quizId,
          quizTitle: it.quizTitle,
          subject: subjLabel,
          count: 0,
          flagged: 0,
          issueCounts: {},
        });
      }
      const pq = perQuiz.get(quizKey);
      pq.count += 1;

      if (issues.length > 0) {
        results.totals.withIssues += 1;
        sourceSummary.withIssues += 1;
        sourceSummary.bySubject[subjLabel].withIssues += 1;
        pq.flagged += 1;
        affectedQuizzes.add(quizKey);
        for (const iss of new Set(issues)) {
          results.totals.issueCounts[iss] =
            (results.totals.issueCounts[iss] || 0) + 1;
          sourceSummary.issueCounts[iss] =
            (sourceSummary.issueCounts[iss] || 0) + 1;
          sourceSummary.bySubject[subjLabel].issueCounts[iss] =
            (sourceSummary.bySubject[subjLabel].issueCounts[iss] || 0) + 1;
          pq.issueCounts[iss] = (pq.issueCounts[iss] || 0) + 1;
        }
        if (results.flagged.length < FLAGGED_CAP) {
          results.flagged.push({
            filePath: src.filePath,
            subject: subjLabel,
            quizId: it.quizId,
            quizTitle: it.quizTitle,
            index: it.index,
            issues,
            stem: snippet(
              it.q.questionText || it.q.question || it.q.prompt,
              160
            ),
          });
        }
      }
    }
    sourceSummary.quizzesAffected = affectedQuizzes.size;
    results.sources.push(sourceSummary);
  }

  // Per-quiz: rank quizzes with worst pass rates (>5% failing)
  const quizArr = Array.from(perQuiz.values()).map((q) => ({
    ...q,
    failPct: q.count ? +((q.flagged / q.count) * 100).toFixed(1) : 0,
  }));
  const failedQuizzes = quizArr
    .filter((q) => q.flagged > 0)
    .sort((a, b) => b.failPct - a.failPct || b.flagged - a.flagged);
  results.quizQualityMatrix = {
    totalQuizzes: quizArr.length,
    quizzesWithAnyIssue: failedQuizzes.length,
    quizzesAbove5Percent: failedQuizzes.filter((q) => q.failPct > 5).length,
    failedQuizzes: failedQuizzes.slice(0, 200),
  };

  const stamp = ts();
  const reportsDir = path.join(root, 'reports');
  fs.mkdirSync(reportsDir, { recursive: true });
  const jsonPath = path.join(
    reportsDir,
    `premade-quiz-quality-${stamp}.json`
  );
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));

  // Markdown summary
  const mdLines = [];
  mdLines.push(`# Premade Quiz Quality Audit — ${results.generatedAt}`);
  mdLines.push('');
  mdLines.push(
    `**Total questions:** ${results.totals.questions}  ` +
      `**With ≥1 issue:** ${results.totals.withIssues} ` +
      `(${(
        (results.totals.withIssues / Math.max(1, results.totals.questions)) *
        100
      ).toFixed(2)}%)`
  );
  mdLines.push('');
  mdLines.push('## Issue counts (workspace-wide)');
  mdLines.push('| Issue | Count |');
  mdLines.push('|---|---:|');
  for (const [k, v] of Object.entries(results.totals.issueCounts).sort(
    (a, b) => b[1] - a[1]
  )) {
    mdLines.push(`| ${k} | ${v} |`);
  }
  mdLines.push('');
  mdLines.push('## Per source');
  for (const s of results.sources) {
    mdLines.push(
      `### \`${s.filePath}\` — ${s.questions} questions, ${s.withIssues} flagged (${(
        (s.withIssues / Math.max(1, s.questions)) *
        100
      ).toFixed(2)}%), ${s.quizzesAffected} quizzes affected`
    );
    if (Object.keys(s.issueCounts).length) {
      mdLines.push('| Issue | Count |');
      mdLines.push('|---|---:|');
      for (const [k, v] of Object.entries(s.issueCounts).sort(
        (a, b) => b[1] - a[1]
      )) {
        mdLines.push(`| ${k} | ${v} |`);
      }
    }
    if (Object.keys(s.bySubject || {}).length > 1) {
      mdLines.push('');
      mdLines.push('**By subject:**');
      mdLines.push('| Subject | Questions | Flagged |');
      mdLines.push('|---|---:|---:|');
      for (const [subj, st] of Object.entries(s.bySubject)) {
        mdLines.push(`| ${subj} | ${st.questions} | ${st.withIssues} |`);
      }
    }
    mdLines.push('');
  }
  mdLines.push('## Quizzes failing >5% of questions (top 50)');
  mdLines.push('| File | Quiz | Subject | Q# | Flagged | Fail % |');
  mdLines.push('|---|---|---|---:|---:|---:|');
  for (const q of failedQuizzes
    .filter((q) => q.failPct > 5)
    .slice(0, 50)) {
    mdLines.push(
      `| ${q.filePath} | ${q.quizTitle} (${q.quizId}) | ${q.subject} | ${q.count} | ${q.flagged} | ${q.failPct}% |`
    );
  }
  mdLines.push('');
  mdLines.push(
    `Full per-quiz matrix and a sample of up to ${FLAGGED_CAP} flagged questions are in the JSON report.`
  );
  const mdPath = path.join(
    reportsDir,
    `premade-quiz-quality-${stamp}.md`
  );
  fs.writeFileSync(mdPath, mdLines.join('\n') + '\n');

  console.log(
    JSON.stringify(
      {
        json: path.relative(root, jsonPath).replace(/\\/g, '/'),
        md: path.relative(root, mdPath).replace(/\\/g, '/'),
        totalQuestions: results.totals.questions,
        flaggedQuestions: results.totals.withIssues,
        quizzesWithAnyIssue: results.quizQualityMatrix.quizzesWithAnyIssue,
        quizzesAbove5Percent: results.quizQualityMatrix.quizzesAbove5Percent,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
