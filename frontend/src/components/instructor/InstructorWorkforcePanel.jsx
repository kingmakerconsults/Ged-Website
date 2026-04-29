import React, { useCallback, useEffect, useMemo, useState } from 'react';

function getApiBase() {
  if (
    typeof window !== 'undefined' &&
    typeof window.API_BASE_URL === 'string'
  ) {
    return window.API_BASE_URL || '';
  }
  return '';
}

function getAuthToken() {
  try {
    return (
      (typeof localStorage !== 'undefined' &&
        (localStorage.getItem('appToken') || localStorage.getItem('token'))) ||
      ''
    );
  } catch {
    return '';
  }
}

async function apiFetch(path, options = {}) {
  const token = getAuthToken();
  const res = await fetch(`${getApiBase()}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { text };
    }
  }
  if (!res.ok) {
    throw new Error(
      data?.error || data?.message || `${path} returned ${res.status}`
    );
  }
  return data;
}

function pct(part, total) {
  if (!total) return 0;
  return Math.round((Number(part) / Number(total)) * 100);
}

function formatDate(value) {
  if (!value) return 'No activity';
  try {
    return new Date(value).toLocaleDateString();
  } catch {
    return String(value);
  }
}

export default function InstructorWorkforcePanel({ students = [] }) {
  const [summary, setSummary] = useState([]);
  const [selected, setSelected] = useState({});
  const [planName, setPlanName] = useState('Workforce Readiness Plan');
  const [targetDate, setTargetDate] = useState('');
  const [description, setDescription] = useState(
    'Career exploration, documents, interview practice, and job-search milestones.'
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadSummary = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch('/api/instructor/workforce/summary');
      setSummary(Array.isArray(data?.students) ? data.students : []);
    } catch (err) {
      setError(err?.message || 'Unable to load workforce summary.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  const studentOptions = useMemo(() => {
    const byId = new Map();
    students.forEach((student) => {
      if (student?.id) byId.set(Number(student.id), student);
    });
    summary.forEach((student) => {
      if (student?.id && !byId.has(Number(student.id))) {
        byId.set(Number(student.id), student);
      }
    });
    return Array.from(byId.values()).sort((a, b) =>
      String(a.name || a.email || '').localeCompare(
        String(b.name || b.email || '')
      )
    );
  }, [students, summary]);

  const selectedIds = Object.entries(selected)
    .filter(([, isSelected]) => isSelected)
    .map(([id]) => Number(id))
    .filter(Number.isFinite);

  async function assignPlan() {
    if (!selectedIds.length) {
      setError('Select at least one student.');
      return;
    }
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const data = await apiFetch('/api/instructor/workforce/plans', {
        method: 'POST',
        body: JSON.stringify({
          target_user_ids: selectedIds,
          name: planName,
          description,
          targetDate: targetDate || null,
        }),
      });
      setMessage(`Assigned ${data?.plans?.length || 0} workforce plan(s).`);
      setSelected({});
      await loadSummary();
    } catch (err) {
      setError(err?.message || 'Unable to assign workforce plan.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h3 className="text-lg font-bold text-primary">
              Assign Workforce Plan
            </h3>
            <p className="mt-1 text-sm text-muted">
              Create a program-long plan for selected students. Students can
              still use every Workforce tool freely.
            </p>
          </div>
          <button
            type="button"
            onClick={loadSummary}
            disabled={loading || saving}
            className="rounded-full btn-ghost px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            Refresh
          </button>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_160px]">
          <label className="text-xs font-bold uppercase tracking-wide text-muted">
            Plan name
            <input
              value={planName}
              onChange={(event) => setPlanName(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal normal-case tracking-normal text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>
          <label className="text-xs font-bold uppercase tracking-wide text-muted">
            Target date
            <input
              type="date"
              value={targetDate}
              onChange={(event) => setTargetDate(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal normal-case tracking-normal text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>
        </div>
        <label className="mt-3 block text-xs font-bold uppercase tracking-wide text-muted">
          Description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal normal-case tracking-normal text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </label>

        <div className="mt-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold uppercase tracking-wide text-muted dark:border-slate-700 dark:bg-slate-800/70">
            Students
          </div>
          <div className="max-h-64 overflow-y-auto p-2">
            {studentOptions.length ? (
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {studentOptions.map((student) => {
                  const id = Number(student.id);
                  return (
                    <label
                      key={id}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 p-2 text-sm dark:border-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={!!selected[id]}
                        onChange={(event) =>
                          setSelected((current) => ({
                            ...current,
                            [id]: event.target.checked,
                          }))
                        }
                      />
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-primary">
                          {student.name || student.email || `Student ${id}`}
                        </span>
                        {student.email ? (
                          <span className="block truncate text-xs text-muted">
                            {student.email}
                          </span>
                        ) : null}
                      </span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <div className="p-3 text-sm text-muted">
                No students available.
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={assignPlan}
            disabled={saving || !selectedIds.length}
            className="rounded-full btn-primary px-4 py-2 text-sm font-semibold shadow disabled:opacity-50"
          >
            {saving ? 'Assigning...' : `Assign to ${selectedIds.length || 0}`}
          </button>
          {message ? (
            <span className="text-sm text-emerald-700">{message}</span>
          ) : null}
          {error ? <span className="text-sm text-red-600">{error}</span> : null}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
        <h3 className="text-lg font-bold text-primary">Workforce Progress</h3>
        {loading ? (
          <p className="mt-3 text-sm text-muted">
            Loading workforce progress...
          </p>
        ) : summary.length ? (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-subtle text-sm">
              <thead className="bg-surface-soft">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                    Plans
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                    Milestones
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                    Interviews
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                    Last Workforce Activity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle">
                {summary.map((row) => {
                  const progressPct = pct(
                    row.completed_milestones,
                    row.total_milestones
                  );
                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-surface-soft transition"
                    >
                      <td className="px-4 py-3">
                        <div className="font-semibold text-primary">
                          {row.name || row.email || `Student ${row.id}`}
                        </div>
                        {row.email ? (
                          <div className="text-xs text-muted">{row.email}</div>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 text-secondary">
                        {row.plan_count || 0}
                      </td>
                      <td className="px-4 py-3 text-secondary">
                        {row.completed_milestones || 0}/
                        {row.total_milestones || 0} ({progressPct}%)
                      </td>
                      <td className="px-4 py-3 text-secondary">
                        {row.interview_sessions || 0}
                      </td>
                      <td className="px-4 py-3 text-muted text-xs">
                        {formatDate(row.last_workforce_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted">No workforce activity yet.</p>
        )}
      </section>
    </div>
  );
}
