// Backend API smoke test.
// 1. Logs in as each role via /api/dev-login-as
// 2. Hits a curated set of GET routes per role
// 3. Records status, role-gating mismatches, and timing
// 4. Writes reports/api-smoke-test-YYYYMMDD-HHMMSS.{json,md}

const fs = require('fs');
const path = require('path');

const BASE = process.env.BASE_URL || 'http://localhost:3002';
const ROLES = ['student', 'instructor', 'support', 'orgAdmin', 'superAdmin'];

// expectedMin..expectedMax = pass band; outside = flag.
// Note 401/403 is the *correct* answer for protected routes when caller lacks role.
const ROUTES = [
  // Public
  { path: '/api/all-quizzes', auth: 'public', expected: [200] },
  { path: '/api/programs', auth: 'public', expected: [200] },
  { path: '/api/organizations', auth: 'public', expected: [200] },
  { path: '/api/vocabulary/all', auth: 'public', expected: [200] },
  { path: '/api/vocabulary/Math', auth: 'public', expected: [200, 404] },
  { path: '/api/vocabulary-quiz/Math', auth: 'public', expected: [200, 404] },
  { path: '/api/science/chemistry/random-equation', auth: 'public', expected: [200] },
  { path: '/api/workforce/career-paths', auth: 'public', expected: [200] },

  // Auth required (any logged-in user)
  { path: '/api/scores', auth: 'user', expected: [200] },
  { path: '/api/quiz-attempts', auth: 'user', expected: [200] },
  { path: '/api/onboarding/state', auth: 'user', expected: [200] },
  { path: '/api/me/streak', auth: 'user', expected: [200] },
  { path: '/api/me/quota', auth: 'user', expected: [200] },
  { path: '/api/me/recommendations', auth: 'user', expected: [200] },
  { path: '/api/me/membership-request', auth: 'user', expected: [200, 404] },
  { path: '/api/student/classes', auth: 'user', expected: [200] },
  { path: '/api/student/next-task', auth: 'user', expected: [200] },
  { path: '/api/student/mastery', auth: 'user', expected: [200] },
  { path: '/api/student/badges', auth: 'user', expected: [200] },
  { path: '/api/notifications', auth: 'user', expected: [200] },
  { path: '/api/user/career-interests', auth: 'user', expected: [200] },
  { path: '/api/workforce/overview', auth: 'user', expected: [200] },
  { path: '/api/workforce/plans', auth: 'user', expected: [200] },
  { path: '/api/workforce/artifacts', auth: 'user', expected: [200] },
  { path: '/api/workforce/interview-sessions', auth: 'user', expected: [200] },

  // Admin/org-admin/super-admin gated
  { path: '/api/admin/organizations', auth: 'admin', expected: [200] },
  { path: '/api/admin/users', auth: 'admin', expected: [200] },
  { path: '/api/admin/activity/recent', auth: 'admin', expected: [200] },
  { path: '/api/admin/org-summary', auth: 'admin', expected: [200] },
  { path: '/api/admin/classes', auth: 'admin', expected: [200] },
  { path: '/api/admin/students/search', auth: 'admin', expected: [200] },
  { path: '/api/admin/students/export', auth: 'admin', expected: [200] },
  { path: '/api/admin/question-reports', auth: 'admin', expected: [200] },
  { path: '/api/admin/reports/readiness', auth: 'admin', expected: [200] },
  { path: '/api/admin/reports/activity', auth: 'admin', expected: [200] },
  { path: '/api/admin/reports/ged-results', auth: 'admin', expected: [200] },
  { path: '/api/admin/reports/domain-weaknesses', auth: 'admin', expected: [200] },
];

const ADMIN_ROLES = new Set(['orgAdmin', 'superAdmin']);

function ts() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(
    d.getHours()
  )}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

async function devLogin(role) {
  const res = await fetch(`${BASE}/api/dev-login-as`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });
  if (!res.ok) throw new Error(`dev-login ${role}: HTTP ${res.status}`);
  const json = await res.json();
  return json.token;
}

async function callRoute(route, token) {
  const headers = { Accept: 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const t0 = Date.now();
  let status = 0;
  let bodySnippet = '';
  let ok = false;
  try {
    const res = await fetch(`${BASE}${route.path}`, { headers });
    status = res.status;
    ok = res.ok;
    const text = await res.text();
    bodySnippet = text.length > 200 ? text.slice(0, 200) + '…' : text;
  } catch (err) {
    status = -1;
    bodySnippet = `FETCH ERROR: ${err.message}`;
  }
  return { status, ms: Date.now() - t0, ok, bodySnippet };
}

function expectedFor(route, role) {
  if (route.auth === 'public') return route.expected;
  if (route.auth === 'user') return route.expected;
  if (route.auth === 'admin') {
    return ADMIN_ROLES.has(role) ? route.expected : [401, 403];
  }
  return route.expected;
}

async function main() {
  const tokens = {};
  for (const role of ROLES) {
    try {
      tokens[role] = await devLogin(role);
      console.log(`[login] ${role} OK`);
    } catch (err) {
      console.warn(`[login] ${role} FAILED: ${err.message}`);
      tokens[role] = null;
    }
  }

  const results = {
    generatedAt: new Date().toISOString(),
    base: BASE,
    rolesTested: ROLES,
    routes: [],
    summary: {
      totalCalls: 0,
      pass: 0,
      fail: 0,
      perRole: {},
    },
    failures: [],
  };
  for (const r of ROLES) results.summary.perRole[r] = { calls: 0, pass: 0, fail: 0 };

  // Public routes called once (no token)
  for (const route of ROUTES.filter((r) => r.auth === 'public')) {
    const out = await callRoute(route, null);
    const expected = route.expected;
    const pass = expected.includes(out.status);
    results.totalCalls = (results.totalCalls || 0) + 1;
    results.summary.totalCalls += 1;
    if (pass) results.summary.pass += 1;
    else {
      results.summary.fail += 1;
      results.failures.push({
        role: 'public',
        path: route.path,
        status: out.status,
        expected,
        bodySnippet: out.bodySnippet,
      });
    }
    results.routes.push({
      path: route.path,
      auth: 'public',
      role: 'public',
      status: out.status,
      ms: out.ms,
      expected,
      pass,
    });
  }

  // Auth routes per role
  for (const role of ROLES) {
    const token = tokens[role];
    if (!token) continue;
    for (const route of ROUTES.filter((r) => r.auth !== 'public')) {
      const expected = expectedFor(route, role);
      const out = await callRoute(route, token);
      const pass = expected.includes(out.status);
      results.summary.totalCalls += 1;
      results.summary.perRole[role].calls += 1;
      if (pass) {
        results.summary.pass += 1;
        results.summary.perRole[role].pass += 1;
      } else {
        results.summary.fail += 1;
        results.summary.perRole[role].fail += 1;
        results.failures.push({
          role,
          path: route.path,
          auth: route.auth,
          status: out.status,
          expected,
          bodySnippet: out.bodySnippet,
        });
      }
      results.routes.push({
        path: route.path,
        auth: route.auth,
        role,
        status: out.status,
        ms: out.ms,
        expected,
        pass,
      });
    }
  }

  // Persist
  const stamp = ts();
  const reportsDir = path.join(__dirname, '..', 'reports');
  fs.mkdirSync(reportsDir, { recursive: true });
  const jsonPath = path.join(reportsDir, `api-smoke-test-${stamp}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));

  const md = [];
  md.push(`# Backend API Smoke Test — ${results.generatedAt}`);
  md.push('');
  md.push(`Base: \`${BASE}\``);
  md.push('');
  md.push(
    `**Total calls:** ${results.summary.totalCalls}  ` +
      `**Pass:** ${results.summary.pass}  ` +
      `**Fail:** ${results.summary.fail}`
  );
  md.push('');
  md.push('## Per role');
  md.push('| Role | Calls | Pass | Fail |');
  md.push('|---|---:|---:|---:|');
  for (const [r, s] of Object.entries(results.summary.perRole)) {
    md.push(`| ${r} | ${s.calls} | ${s.pass} | ${s.fail} |`);
  }
  md.push('');
  md.push('## Failures');
  if (results.failures.length === 0) {
    md.push('_None._');
  } else {
    md.push('| Role | Route | Status | Expected | Body |');
    md.push('|---|---|---:|---|---|');
    for (const f of results.failures) {
      md.push(
        `| ${f.role} | \`${f.path}\` | ${f.status} | ${f.expected.join(',')} | ${String(
          f.bodySnippet || ''
        )
          .replace(/\|/g, '\\|')
          .replace(/\n/g, ' ')} |`
      );
    }
  }
  const mdPath = path.join(reportsDir, `api-smoke-test-${stamp}.md`);
  fs.writeFileSync(mdPath, md.join('\n') + '\n');

  console.log(
    JSON.stringify(
      {
        json: path.relative(path.join(__dirname, '..'), jsonPath).replace(/\\/g, '/'),
        md: path.relative(path.join(__dirname, '..'), mdPath).replace(/\\/g, '/'),
        total: results.summary.totalCalls,
        pass: results.summary.pass,
        fail: results.summary.fail,
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
