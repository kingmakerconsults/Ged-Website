import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getApiBaseUrl } from '../../utils/apiBase.js';

const API_BASE_URL = getApiBaseUrl();

function getAuthToken() {
  try {
    return (
      (typeof localStorage !== 'undefined' &&
        localStorage.getItem('appToken')) ||
      ''
    );
  } catch {
    return '';
  }
}

async function fetchJson(path) {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    let suffix = '';
    try {
      const text = await res.text();
      try {
        const j = JSON.parse(text);
        if (j?.error) suffix = `: ${j.error}`;
        else if (text) suffix = `: ${text}`;
      } catch {
        if (text) suffix = `: ${text}`;
      }
    } catch {
      /* ignore */
    }
    throw new Error(`${path} → ${res.status}${suffix}`);
  }
  return res.json();
}

function fmtDateTime(iso) {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    if (!Number.isFinite(d.getTime())) return '—';
    return d.toLocaleString();
  } catch {
    return '—';
  }
}

function fmtDate(iso) {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    if (!Number.isFinite(d.getTime())) return '—';
    return d.toLocaleDateString();
  } catch {
    return '—';
  }
}

function pct(num, denom) {
  if (!denom) return 0;
  return Math.round((Number(num) / Number(denom)) * 100);
}

// ---------- Per-student read-only detail ----------
function SupportStudentDetail({ student, onBack }) {
  const studentId = student?.id;
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    if (!studentId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson(
        `/api/instructor/students/${studentId}/stats`
      );
      setStats(data);
    } catch (e) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    reload();
  }, [reload]);

  const mastery = Array.isArray(stats?.mastery) ? stats.mastery : [];
  const recent = Array.isArray(stats?.recent_attempts)
    ? stats.recent_attempts
    : [];
  const weakAreas = Array.isArray(stats?.weak_areas) ? stats.weak_areas : [];
  const achievements = Array.isArray(stats?.achievements)
    ? stats.achievements
    : [];

  return (
    <section className="rounded-3xl border-subtle panel-surface p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="btn-ghost mb-2 rounded-full px-3 py-1 text-xs font-semibold"
          >
            ← Back to roster
          </button>
          <h2 className="text-xl font-semibold text-primary">
            {student?.name || 'Student'}
          </h2>
          <div className="text-sm text-secondary">{student?.email}</div>
          <div className="mt-1 text-xs text-muted">
            Last activity: {fmtDateTime(student?.last_attempt_at)}
          </div>
        </div>
        <button
          type="button"
          onClick={reload}
          className="btn-ghost rounded-full px-3 py-1 text-xs font-semibold"
        >
          Refresh
        </button>
      </div>

      {loading && (
        <div className="text-sm text-muted">Loading student data…</div>
      )}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Mastery */}
          <div className="rounded-2xl border-subtle panel-surface p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Subject Mastery
            </div>
            {mastery.length === 0 ? (
              <div className="text-sm text-muted">No quiz attempts yet.</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-xs text-muted">
                  <tr>
                    <th className="py-1 text-left">Subject</th>
                    <th className="py-1 text-left">Attempts</th>
                    <th className="py-1 text-left">Avg %</th>
                    <th className="py-1 text-left">Last attempt</th>
                  </tr>
                </thead>
                <tbody>
                  {mastery.map((row) => (
                    <tr
                      key={row.subject || row.id}
                      className="border-t border-subtle"
                    >
                      <td className="py-1.5 font-medium text-primary">
                        {row.subject}
                      </td>
                      <td className="py-1.5 text-secondary">
                        {row.attempts ?? row.attempt_count ?? 0}
                      </td>
                      <td className="py-1.5 text-secondary">
                        {row.avg_pct != null
                          ? `${Math.round(row.avg_pct)}%`
                          : pct(row.correct, row.total) + '%'}
                      </td>
                      <td className="py-1.5 text-xs text-muted">
                        {fmtDateTime(row.last_attempt_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Weak areas */}
          <div className="rounded-2xl border-subtle panel-surface p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Weak Areas
            </div>
            {weakAreas.length === 0 ? (
              <div className="text-sm text-muted">
                No weak areas identified yet.
              </div>
            ) : (
              <ul className="space-y-1.5 text-sm">
                {weakAreas.slice(0, 8).map((w, i) => (
                  <li
                    key={`${w.topic || w.subject}-${i}`}
                    className="flex justify-between gap-2"
                  >
                    <span className="text-primary">
                      {w.topic || w.subject || 'Topic'}
                    </span>
                    <span className="text-xs text-muted">
                      {w.accuracy != null
                        ? `${Math.round(w.accuracy * 100)}%`
                        : ''}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recent attempts */}
          <div className="rounded-2xl border-subtle panel-surface p-4 lg:col-span-2">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Recent Attempts
            </div>
            {recent.length === 0 ? (
              <div className="text-sm text-muted">No recent attempts.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-xs text-muted">
                    <tr>
                      <th className="py-1 text-left">Subject</th>
                      <th className="py-1 text-left">Quiz</th>
                      <th className="py-1 text-left">Score</th>
                      <th className="py-1 text-left">Passed</th>
                      <th className="py-1 text-left">When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.slice(0, 25).map((r) => (
                      <tr key={r.id} className="border-t border-subtle">
                        <td className="py-1.5 text-primary">{r.subject}</td>
                        <td className="py-1.5 text-secondary">
                          {r.quiz_title || r.quiz_type || '—'}
                        </td>
                        <td className="py-1.5 text-secondary">
                          {r.scaled_score != null
                            ? Math.round(r.scaled_score)
                            : r.score != null
                              ? `${Math.round(r.score)}%`
                              : '—'}
                        </td>
                        <td className="py-1.5 text-secondary">
                          {r.passed === true
                            ? 'Yes'
                            : r.passed === false
                              ? 'No'
                              : '—'}
                        </td>
                        <td className="py-1.5 text-xs text-muted">
                          {fmtDateTime(r.attempted_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="rounded-2xl border-subtle panel-surface p-4 lg:col-span-2">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                Achievements
              </div>
              <div className="flex flex-wrap gap-2">
                {achievements.map((a, i) => (
                  <span
                    key={`${a.code || a.name}-${i}`}
                    className="rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-primary"
                    title={a.description || ''}
                  >
                    {a.name || a.code}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Test dates */}
          {(stats?.test_dates || student?.test_dates) && (
            <div className="rounded-2xl border-subtle panel-surface p-4 lg:col-span-2">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                Test Dates
              </div>
              <ul className="space-y-1 text-sm text-secondary">
                {(stats?.test_dates || student?.test_dates || []).map(
                  (t, i) => (
                    <li key={i}>
                      {t.subject ? `${t.subject}: ` : ''}
                      {fmtDate(t.date || t.scheduled_for || t.test_date)}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

// ---------- Main dashboard ----------
export default function SupportDashboard({
  user,
  token: _token,
  onLogout,
  NotificationBell,
  AdminRoleBadge,
}) {
  const [students, setStudents] = useState([]);
  const [activity, setActivity] = useState([]);
  const [classes, setClasses] = useState([]);
  const [workforce, setWorkforce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('students');
  const [detailStudent, setDetailStudent] = useState(null);
  const [search, setSearch] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [s, a, c, w] = await Promise.allSettled([
        fetchJson('/api/instructor/students'),
        fetchJson('/api/instructor/activity/recent?limit=25'),
        fetchJson('/api/instructor/classes'),
        fetchJson('/api/instructor/workforce/summary'),
      ]);
      if (s.status === 'fulfilled') {
        setStudents(Array.isArray(s.value?.students) ? s.value.students : []);
      }
      if (a.status === 'fulfilled') {
        setActivity(Array.isArray(a.value?.activity) ? a.value.activity : []);
      }
      if (c.status === 'fulfilled') {
        setClasses(Array.isArray(c.value?.classes) ? c.value.classes : []);
      }
      if (w.status === 'fulfilled') {
        setWorkforce(w.value || null);
      }
      const firstErr = [s, a, c, w].find((r) => r.status === 'rejected');
      if (firstErr) {
        setError(firstErr.reason?.message || 'Some data failed to load');
      }
    } catch (err) {
      setError(err?.message || 'Unable to load support data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) => {
      return (
        (s.name || '').toLowerCase().includes(q) ||
        (s.email || '').toLowerCase().includes(q)
      );
    });
  }, [students, search]);

  const orgName = user?.organization_name || 'Your organization';

  // ---- detail view takes over when a student is selected ----
  if (detailStudent) {
    return (
      <div className="min-h-screen bg-page py-10 text-primary">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4">
          <header className="flex flex-col gap-4 rounded-3xl border-subtle panel-surface p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                Support · Student Detail
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-secondary">
                {AdminRoleBadge ? <AdminRoleBadge role={user?.role} /> : null}
                <span>{orgName}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {NotificationBell ? <NotificationBell /> : null}
              <button
                type="button"
                onClick={onLogout}
                className="rounded-full btn-primary px-4 py-2 text-sm font-semibold shadow"
              >
                Sign out
              </button>
            </div>
          </header>
          <SupportStudentDetail
            student={detailStudent}
            onBack={() => setDetailStudent(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page py-10 text-primary">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4">
        <header className="flex flex-col gap-4 rounded-3xl border-subtle panel-surface p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Welcome, {user?.name || user?.email || 'Support'}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-secondary">
              {AdminRoleBadge ? <AdminRoleBadge role={user?.role} /> : null}
              <span>{orgName}</span>
              <span
                className="rounded-full bg-surface-soft px-2 py-0.5 text-xs font-semibold text-secondary"
                title="Support is a read-only role"
              >
                Read-only
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {NotificationBell ? <NotificationBell /> : null}
            <button
              type="button"
              onClick={loadData}
              className="rounded-full btn-ghost px-4 py-2 text-sm font-semibold transition"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full btn-primary px-4 py-2 text-sm font-semibold shadow"
            >
              Sign out
            </button>
          </div>
        </header>

        <nav
          className="flex flex-wrap gap-2 rounded-3xl border-subtle panel-surface p-3 shadow-sm"
          aria-label="Support sections"
        >
          {[
            { id: 'students', label: 'Students' },
            { id: 'activity', label: 'Recent Activity' },
            { id: 'classes', label: 'Classes' },
            { id: 'workforce', label: 'Workforce Progress' },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={
                  active
                    ? 'btn-primary px-4 py-1.5 text-sm font-semibold rounded-full shadow-sm'
                    : 'btn-ghost px-4 py-1.5 text-sm font-semibold rounded-full'
                }
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {loading ? (
          <div className="rounded-3xl border-subtle panel-surface p-6 shadow-sm">
            <p className="text-sm text-muted">Loading support dashboard…</p>
          </div>
        ) : (
          <>
            {error && (
              <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
                {error}
              </div>
            )}

            {activeTab === 'students' && (
              <section className="rounded-3xl border-subtle panel-surface p-6 shadow-sm">
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <StatCard
                    label="Total Students"
                    value={students.length}
                    gradient="from-green-500 to-green-600"
                  />
                  <StatCard
                    label="Active (30d)"
                    value={(() => {
                      const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
                      return students.filter((s) => {
                        if (s.last_attempt_at) {
                          const t = new Date(s.last_attempt_at).getTime();
                          return Number.isFinite(t) && t >= cutoff;
                        }
                        return false;
                      }).length;
                    })()}
                    gradient="from-blue-500 to-blue-600"
                  />
                  <StatCard
                    label="Recent Activity"
                    value={activity.length}
                    gradient="from-purple-500 to-purple-600"
                  />
                </div>

                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-primary">
                    Student Roster
                  </h2>
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search name or email…"
                    className="w-full rounded-full border border-subtle bg-surface-soft px-4 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-400 sm:w-72"
                  />
                </div>

                {filteredStudents.length === 0 ? (
                  <p className="text-sm text-muted">No students found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-subtle text-sm">
                      <thead className="bg-surface-soft">
                        <tr>
                          <Th>Student</Th>
                          <Th>Email</Th>
                          <Th>Subjects</Th>
                          <Th>Last Activity</Th>
                          <Th>View</Th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-subtle panel-surface">
                        {filteredStudents.map((student) => (
                          <tr
                            key={student.id}
                            className="transition hover:bg-surface-soft"
                          >
                            <td className="px-4 py-3 font-medium text-primary">
                              {student.name || 'Student'}
                            </td>
                            <td className="px-4 py-3 text-secondary">
                              {student.email}
                            </td>
                            <td className="px-4 py-3 text-secondary">
                              {Array.isArray(student.subjects)
                                ? student.subjects.length
                                : 0}
                            </td>
                            <td className="px-4 py-3 text-xs text-muted">
                              {fmtDateTime(student.last_attempt_at)}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                type="button"
                                onClick={() => setDetailStudent(student)}
                                className="btn-primary rounded-full px-3 py-1 text-xs font-semibold shadow-sm"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            )}

            {activeTab === 'activity' && (
              <section className="rounded-3xl border-subtle panel-surface p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-primary">
                  Recent Student Activity
                </h2>
                {activity.length === 0 ? (
                  <p className="text-sm text-muted">No recent activity.</p>
                ) : (
                  <div className="space-y-3">
                    {activity.map((act) => (
                      <div
                        key={act.id}
                        className="flex flex-col gap-2 rounded-lg bg-surface-soft p-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-primary">
                            {act.user_name || act.user_email}
                          </div>
                          <div className="text-sm text-secondary">
                            {act.subject} ·{' '}
                            {act.quiz_title || act.quiz_type || 'Activity'}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-secondary">
                            Score:{' '}
                            <span className="font-semibold">
                              {act.scaled_score != null
                                ? Math.round(act.scaled_score)
                                : 'N/A'}
                            </span>
                          </span>
                          <span className="text-xs text-muted">
                            {fmtDateTime(act.attempted_at)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === 'classes' && (
              <section className="rounded-3xl border-subtle panel-surface p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-primary">
                  Classes
                </h2>
                {classes.length === 0 ? (
                  <p className="text-sm text-muted">No classes found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-subtle text-sm">
                      <thead className="bg-surface-soft">
                        <tr>
                          <Th>Class</Th>
                          <Th>Instructor</Th>
                          <Th>Students</Th>
                          <Th>Created</Th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-subtle panel-surface">
                        {classes.map((cls) => (
                          <tr key={cls.id}>
                            <td className="px-4 py-3 font-medium text-primary">
                              {cls.name || cls.title || `Class #${cls.id}`}
                            </td>
                            <td className="px-4 py-3 text-secondary">
                              {cls.instructor_name ||
                                cls.instructor_email ||
                                '—'}
                            </td>
                            <td className="px-4 py-3 text-secondary">
                              {cls.student_count ??
                                (Array.isArray(cls.roster)
                                  ? cls.roster.length
                                  : '—')}
                            </td>
                            <td className="px-4 py-3 text-xs text-muted">
                              {fmtDate(cls.created_at)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            )}

            {activeTab === 'workforce' && (
              <section className="rounded-3xl border-subtle panel-surface p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-primary">
                  Workforce Progress
                </h2>
                {!workforce ? (
                  <p className="text-sm text-muted">
                    No workforce summary available.
                  </p>
                ) : (
                  <pre className="overflow-x-auto rounded-lg bg-surface-soft p-4 text-xs text-secondary">
                    {JSON.stringify(workforce, null, 2)}
                  </pre>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
      {children}
    </th>
  );
}

function StatCard({ label, value, gradient }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} p-6 text-white shadow-lg`}
    >
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10"></div>
      <div className="relative">
        <div className="mb-2 text-sm font-medium opacity-90">{label}</div>
        <div className="text-4xl font-bold">{value}</div>
      </div>
    </div>
  );
}
