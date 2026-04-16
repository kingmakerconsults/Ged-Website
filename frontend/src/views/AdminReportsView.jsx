import React, { useState, useEffect, useMemo } from 'react';
import { getApiBaseUrl } from '../utils/apiBase.js';

const SUBJECT_KEYS = ['math', 'science', 'rla', 'social'];
const SUBJECT_LABELS = {
  math: 'Math',
  science: 'Science',
  rla: 'RLA',
  social: 'Social Studies',
};
const READINESS_COLORS = {
  ready: {
    bg: 'bg-green-500',
    label: 'Ready (≥145)',
    text: 'text-green-700 dark:text-green-300',
  },
  almostReady: {
    bg: 'bg-yellow-500',
    label: 'Almost Ready (135–144)',
    text: 'text-yellow-700 dark:text-yellow-300',
  },
  needMoreStudy: {
    bg: 'bg-red-500',
    label: 'Needs More Study (<135)',
    text: 'text-red-700 dark:text-red-300',
  },
};

function ReadinessBar({ label, data }) {
  const total =
    (data?.ready || 0) + (data?.almostReady || 0) + (data?.needMoreStudy || 0);
  if (total === 0) {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold">{label}</span>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            No data
          </span>
        </div>
        <div className="h-6 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden" />
      </div>
    );
  }

  const pctReady = Math.round((data.ready / total) * 100);
  const pctAlmost = Math.round((data.almostReady / total) * 100);
  const pctNeed = 100 - pctReady - pctAlmost;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold">{label}</span>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          Mean Score: <strong>{data.meanScore || '—'}</strong> · {total} student
          {total !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="h-6 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden flex">
        {pctReady > 0 && (
          <div
            className="bg-green-500 h-full flex items-center justify-center text-xs text-white font-semibold"
            style={{ width: `${pctReady}%` }}
            title={`Ready: ${data.ready}`}
          >
            {pctReady > 10 ? `${data.ready}` : ''}
          </div>
        )}
        {pctAlmost > 0 && (
          <div
            className="bg-yellow-500 h-full flex items-center justify-center text-xs text-white font-semibold"
            style={{ width: `${pctAlmost}%` }}
            title={`Almost Ready: ${data.almostReady}`}
          >
            {pctAlmost > 10 ? `${data.almostReady}` : ''}
          </div>
        )}
        {pctNeed > 0 && (
          <div
            className="bg-red-500 h-full flex items-center justify-center text-xs text-white font-semibold"
            style={{ width: `${pctNeed}%` }}
            title={`Needs Study: ${data.needMoreStudy}`}
          >
            {pctNeed > 10 ? `${data.needMoreStudy}` : ''}
          </div>
        )}
      </div>
      <div className="flex gap-4 mt-1 text-xs">
        <span className="text-green-700 dark:text-green-300">
          Ready: {data.ready}
        </span>
        <span className="text-yellow-700 dark:text-yellow-300">
          Almost: {data.almostReady}
        </span>
        <span className="text-red-700 dark:text-red-300">
          Needs Study: {data.needMoreStudy}
        </span>
      </div>
    </div>
  );
}

export default function AdminReportsView() {
  const apiBase = useMemo(() => getApiBaseUrl(), []);
  const token =
    typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;

  const [readiness, setReadiness] = useState(null);
  const [domainWeaknesses, setDomainWeaknesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classFilter, setClassFilter] = useState('');
  const [classes, setClasses] = useState([]);

  // Fetch classes
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${apiBase}/api/admin/classes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setClasses(Array.isArray(data) ? data : data.classes || []);
        }
      } catch (_) {}
    })();
  }, [apiBase, token]);

  // Fetch readiness
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (classFilter) params.set('classId', classFilter);

        const res = await fetch(
          `${apiBase}/api/admin/reports/readiness?${params}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setReadiness(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [apiBase, token, classFilter]);

  // Fetch domain weaknesses
  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams();
        if (classFilter) params.set('classId', classFilter);
        const res = await fetch(
          `${apiBase}/api/admin/reports/domain-weaknesses?${params}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.ok) {
          const data = await res.json();
          setDomainWeaknesses(data.domains || []);
        }
      } catch (_) {}
    })();
  }, [apiBase, token, classFilter]);

  const overall = readiness?.overall;
  const totalStudents = overall
    ? overall.ready + overall.almostReady + overall.needMoreStudy
    : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold">GED Readiness Reports</h1>
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="border rounded-xl px-3 py-2 text-sm bg-white/80 dark:bg-white/5 dark:border-white/10 text-slate-900 dark:text-slate-100 backdrop-blur"
        >
          <option value="">All Classes</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          Failed to load report: {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          Loading readiness data...
        </div>
      ) : readiness ? (
        <>
          {/* Overall summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="glass-card card-lift rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                {overall?.ready || 0}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                GED Ready (≥145)
              </div>
            </div>
            <div className="glass-card card-lift rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">
                {overall?.almostReady || 0}
              </div>
              <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                Almost Ready (135–144)
              </div>
            </div>
            <div className="glass-card card-lift rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-red-700 dark:text-red-300">
                {overall?.needMoreStudy || 0}
              </div>
              <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                Needs More Study (&lt;135)
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 sm:gap-6 mb-4 text-xs">
            {Object.entries(READINESS_COLORS).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${cfg.bg}`} />
                <span className="text-slate-600 dark:text-slate-400">
                  {cfg.label}
                </span>
              </div>
            ))}
          </div>

          {/* Per-subject bars */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Readiness by Subject</h2>
            {SUBJECT_KEYS.map((key) => (
              <ReadinessBar
                key={key}
                label={SUBJECT_LABELS[key]}
                data={readiness.subjects?.[key]}
              />
            ))}
          </div>

          {/* Domain Weaknesses */}
          {domainWeaknesses.length > 0 && (
            <div className="glass-card rounded-2xl p-6 mt-6">
              <h2 className="text-lg font-semibold mb-1">Domain Weaknesses</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Lowest accuracy domains across all students (min 3 questions)
              </p>
              <div className="space-y-3">
                {domainWeaknesses.map((d) => {
                  const pct =
                    d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
                  const barColor =
                    pct >= 70
                      ? 'bg-green-500'
                      : pct >= 45
                        ? 'bg-yellow-500'
                        : 'bg-red-500';
                  return (
                    <div key={d.domain}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{d.domain}</span>
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          {pct}% · {d.correct}/{d.total} · {d.student_count}{' '}
                          student{d.student_count !== 1 ? 's' : ''}
                          {d.misconception_count > 0 && (
                            <span className="ml-1 text-orange-600 dark:text-orange-400">
                              ({d.misconception_count} misconceptions)
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="h-3 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`${barColor} h-3 rounded-full transition-all`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
