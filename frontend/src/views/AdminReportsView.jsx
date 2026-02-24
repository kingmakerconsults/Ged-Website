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
          <span className="text-sm text-gray-500">No data</span>
        </div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" />
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
        <span className="text-sm text-gray-500">
          Mean Score: <strong>{data.meanScore || '—'}</strong> · {total} student
          {total !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
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
          className="border rounded px-3 py-2 text-sm bg-white dark:bg-gray-800 dark:border-gray-600"
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
        <div className="text-center py-12 text-gray-400">
          Loading readiness data...
        </div>
      ) : readiness ? (
        <>
          {/* Overall summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                {overall?.ready || 0}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                GED Ready (≥145)
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">
                {overall?.almostReady || 0}
              </div>
              <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                Almost Ready (135–144)
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
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
                <span className="text-gray-600 dark:text-gray-400">
                  {cfg.label}
                </span>
              </div>
            ))}
          </div>

          {/* Per-subject bars */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Readiness by Subject</h2>
            {SUBJECT_KEYS.map((key) => (
              <ReadinessBar
                key={key}
                label={SUBJECT_LABELS[key]}
                data={readiness.subjects?.[key]}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
