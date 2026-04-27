import React, { useEffect, useMemo, useState } from 'react';
import WorkforceSectionFrame from '../WorkforceSectionFrame.jsx';
import {
  JOB_SEARCH_PROMPTS,
  promptForToday,
  COMPANY_RESEARCH_CHECKLIST,
  SALARY_ROLES,
} from './data/jobSearchPrompts.js';

const STATUSES = [
  'Applied',
  'Phone Screen',
  'Onsite/Interview',
  'Offer',
  'Closed',
];

function storageKey(userId, suffix) {
  return `workforce:jobsearch:${userId || 'anon'}:${suffix}`;
}

function loadJSON(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
}

function saveJSON(key, value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (_) {}
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function ApplicationTracker({ userId }) {
  const key = storageKey(userId, 'tracker');
  const [rows, setRows] = useState(() => loadJSON(key, []));
  useEffect(() => saveJSON(key, rows), [key, rows]);

  function addRow() {
    setRows((r) => [
      ...r,
      {
        id: `app_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        company: '',
        role: '',
        date: todayISO(),
        source: '',
        status: 'Applied',
        notes: '',
      },
    ]);
  }
  function updateRow(id, patch) {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }
  function deleteRow(id) {
    if (!window.confirm('Delete this application?')) return;
    setRows((r) => r.filter((x) => x.id !== id));
  }
  function exportCSV() {
    const header = ['Company', 'Role', 'Date', 'Source', 'Status', 'Notes'];
    const lines = [header.join(',')];
    rows.forEach((r) => {
      const cell = (s) => `"${String(s || '').replace(/"/g, '""')}"`;
      lines.push(
        [r.company, r.role, r.date, r.source, r.status, r.notes]
          .map(cell)
          .join(',')
      );
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `applications-${todayISO()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-bold text-lg">Application Tracker</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addRow}
            className="px-3 py-1.5 rounded bg-teal-600 text-white text-sm font-semibold"
          >
            + Add application
          </button>
          <button
            type="button"
            onClick={exportCSV}
            disabled={rows.length === 0}
            className="px-3 py-1.5 rounded bg-slate-200 dark:bg-slate-700 text-sm font-semibold disabled:opacity-50"
          >
            Export CSV
          </button>
        </div>
      </div>
      {rows.length === 0 ? (
        <div className="text-sm text-slate-600 dark:text-slate-400 italic p-4 border border-dashed rounded">
          No applications yet. Add your first one to start tracking.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-2">Company</th>
                <th className="py-2 px-2">Role</th>
                <th className="py-2 px-2">Date</th>
                <th className="py-2 px-2">Source</th>
                <th className="py-2 px-2">Status</th>
                <th className="py-2 px-2">Notes</th>
                <th className="py-2 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-slate-100 dark:border-slate-800 align-top"
                >
                  <td className="px-2 py-1">
                    <input
                      value={r.company}
                      onChange={(e) =>
                        updateRow(r.id, { company: e.target.value })
                      }
                      className="w-full px-2 py-1 rounded border bg-white dark:bg-slate- text-slate-900 dark:text-slate-100"
                    />
                  </td>
                  <td className="px-2 py-1">
                    <input
                      value={r.role}
                      onChange={(e) =>
                        updateRow(r.id, { role: e.target.value })
                      }
                      className="w-full px-2 py-1 rounded border bg-white dark:bg-slate- text-slate-900 dark:text-slate-100"
                    />
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="date"
                      value={r.date}
                      onChange={(e) =>
                        updateRow(r.id, { date: e.target.value })
                      }
                      className="px-2 py-1 rounded border bg-white dark:bg-slate- text-slate-900 dark:text-slate-100"
                    />
                  </td>
                  <td className="px-2 py-1">
                    <input
                      value={r.source}
                      placeholder="Indeed, referral…"
                      onChange={(e) =>
                        updateRow(r.id, { source: e.target.value })
                      }
                      className="w-full px-2 py-1 rounded border bg-white dark:bg-slate- text-slate-900 dark:text-slate-100"
                    />
                  </td>
                  <td className="px-2 py-1">
                    <select
                      value={r.status}
                      onChange={(e) =>
                        updateRow(r.id, { status: e.target.value })
                      }
                      className="px-2 py-1 rounded border bg-white dark:bg-slate- text-slate-900 dark:text-slate-100"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1">
                    <textarea
                      value={r.notes}
                      onChange={(e) =>
                        updateRow(r.id, { notes: e.target.value })
                      }
                      rows={2}
                      className="w-full px-2 py-1 rounded border bg-white dark:bg-slate- text-slate-900 dark:text-slate-100"
                    />
                  </td>
                  <td className="px-2 py-1 text-right">
                    <button
                      type="button"
                      onClick={() => deleteRow(r.id)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function EmployerResearch({ userId }) {
  const key = storageKey(userId, 'research');
  const [companies, setCompanies] = useState(() => loadJSON(key, []));
  const [activeId, setActiveId] = useState(null);
  useEffect(() => saveJSON(key, companies), [key, companies]);

  function addCompany() {
    const name = window.prompt('Company name:');
    if (!name) return;
    const id = `co_${Date.now()}`;
    setCompanies((c) => [...c, { id, name, answers: {} }]);
    setActiveId(id);
  }
  function updateAnswer(id, fieldKey, value) {
    setCompanies((c) =>
      c.map((co) =>
        co.id === id
          ? { ...co, answers: { ...co.answers, [fieldKey]: value } }
          : co
      )
    );
  }
  function deleteCompany(id) {
    if (!window.confirm('Delete this company?')) return;
    setCompanies((c) => c.filter((x) => x.id !== id));
    if (activeId === id) setActiveId(null);
  }

  const active = companies.find((c) => c.id === activeId);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <aside className="md:col-span-1 space-y-2">
        <button
          type="button"
          onClick={addCompany}
          className="w-full px-3 py-2 rounded bg-teal-600 text-white text-sm font-semibold"
        >
          + Add company
        </button>
        {companies.length === 0 ? (
          <div className="text-xs italic text-slate-500">No companies yet.</div>
        ) : (
          <ul className="space-y-1">
            {companies.map((c) => {
              const answered = Object.values(c.answers || {}).filter((v) =>
                (v || '').trim()
              ).length;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(c.id)}
                    className={`w-full text-left px-3 py-2 rounded border ${activeId === c.id ? 'bg-teal-50 border-teal-300 dark:bg-teal-900/30' : 'bg-white dark:bg-slate- text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700'}`}
                  >
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-slate-500">
                      {answered}/{COMPANY_RESEARCH_CHECKLIST.length} answered
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </aside>
      <section className="md:col-span-2">
        {!active ? (
          <div className="text-sm text-slate-600 italic p-4 border border-dashed rounded">
            Pick a company on the left or add a new one.
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">{active.name}</h3>
              <button
                type="button"
                onClick={() => deleteCompany(active.id)}
                className="text-xs text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
            <ol className="space-y-3">
              {COMPANY_RESEARCH_CHECKLIST.map((q, i) => (
                <li key={q.key}>
                  <label className="block text-sm font-semibold mb-1">
                    {i + 1}. {q.label}
                  </label>
                  <textarea
                    rows={2}
                    value={active.answers[q.key] || ''}
                    onChange={(e) =>
                      updateAnswer(active.id, q.key, e.target.value)
                    }
                    className="w-full px-2 py-1 rounded border bg-white dark:bg-slate- text-slate-900 dark:text-slate-100"
                  />
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>
    </div>
  );
}

function SalaryExplainer() {
  const [roleIdx, setRoleIdx] = useState(0);
  const r = SALARY_ROLES[roleIdx];
  const fmt = (n) =>
    n.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  return (
    <div className="space-y-3">
      <h3 className="font-bold text-lg">Salary Explainer</h3>
      <select
        value={roleIdx}
        onChange={(e) => setRoleIdx(Number(e.target.value))}
        className="px-2 py-1 rounded border bg-white dark:bg-slate- text-slate-900 dark:text-slate-100"
      >
        {SALARY_ROLES.map((row, i) => (
          <option key={row.role} value={i}>
            {row.role}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border p-3 text-center">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            25th %ile
          </div>
          <div className="text-xl font-bold">{fmt(r.p25)}</div>
        </div>
        <div className="rounded-lg border p-3 text-center bg-teal-50 dark:bg-teal-900/20">
          <div className="text-xs uppercase tracking-wide text-teal-700 dark:text-teal-300">
            Median
          </div>
          <div className="text-xl font-bold">{fmt(r.median)}</div>
        </div>
        <div className="rounded-lg border p-3 text-center">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            75th %ile
          </div>
          <div className="text-xl font-bold">{fmt(r.p75)}</div>
        </div>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400 italic">
        Anchors: illustrative US 2024 figures. Real wages vary by metro area,
        experience, and employer. Use as a negotiation floor, not a ceiling.
      </p>
      <ul className="text-xs text-slate-600 dark:text-slate-400 list-disc pl-5 space-y-1">
        <li>
          Cost of living matters: $45k in a small town can outpace $60k in a
          high-COL metro.
        </li>
        <li>
          Total comp = wages + benefits (health, PTO, retirement). Don't compare
          cash only.
        </li>
        <li>
          If offered the 25th %ile, asking for the median is a reasonable
          counter.
        </li>
      </ul>
    </div>
  );
}

function SearchPrompts() {
  const [seed, setSeed] = useState(0);
  const today = useMemo(() => promptForToday(new Date()), []);
  const random = JOB_SEARCH_PROMPTS[(seed * 7 + 3) % JOB_SEARCH_PROMPTS.length];
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-teal-300 bg-teal-50 dark:bg-teal-900/20 p-4">
        <div className="text-xs uppercase tracking-wide text-teal-700 dark:text-teal-300 font-bold">
          Today's prompt
        </div>
        <div className="text-base font-semibold mt-1">{today}</div>
      </div>
      <div className="rounded-xl border p-4">
        <div className="text-xs uppercase tracking-wide font-bold">
          Need a different prompt?
        </div>
        <div className="text-base mt-1">{random}</div>
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="mt-2 px-3 py-1.5 rounded bg-slate-200 dark:bg-slate-700 text-sm font-semibold"
        >
          Shuffle
        </button>
      </div>
      <details className="text-sm">
        <summary className="cursor-pointer font-semibold">
          All prompts ({JOB_SEARCH_PROMPTS.length})
        </summary>
        <ol className="mt-2 list-decimal pl-6 space-y-1 text-slate-700 dark:text-slate-300">
          {JOB_SEARCH_PROMPTS.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ol>
      </details>
    </div>
  );
}

const TABS = [
  { id: 'tracker', label: 'Application Tracker' },
  { id: 'research', label: 'Employer Research' },
  { id: 'salary', label: 'Salary Explainer' },
  { id: 'prompts', label: 'Search Prompts' },
];

export default function JobSearchToolkit({ onBack, userId = 'anon' }) {
  const [tab, setTab] = useState('tracker');
  return (
    <WorkforceSectionFrame
      title="Job Search Toolkit"
      subtitle="Track applications, research employers, decode salaries, stay consistent."
      onBack={onBack}
    >
      <div className="px-4 pb-4">
        <nav className="flex flex-wrap gap-2 mb-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${tab === t.id ? 'bg-teal-600 text-white border-teal-700' : 'bg-white dark:bg-slate- text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700'}`}
            >
              {t.label}
            </button>
          ))}
        </nav>
        {tab === 'tracker' && <ApplicationTracker userId={userId} />}
        {tab === 'research' && <EmployerResearch userId={userId} />}
        {tab === 'salary' && <SalaryExplainer />}
        {tab === 'prompts' && <SearchPrompts />}
      </div>
    </WorkforceSectionFrame>
  );
}
