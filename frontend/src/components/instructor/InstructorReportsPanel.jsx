import React, { useCallback, useEffect, useState } from 'react';

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
        localStorage.getItem('appToken')) ||
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
  if (!res.ok) throw new Error(`${path} → ${res.status}`);
  return res.json();
}

const STATUS_COLOR = {
  open: { bg: '#fef3c7', fg: '#92400e' },
  triaged: { bg: '#dbeafe', fg: '#1e40af' },
  resolved: { bg: '#dcfce7', fg: '#166534' },
  dismissed: { bg: '#f1f5f9', fg: '#475569' },
};

function StatusPill({ status }) {
  const colors = STATUS_COLOR[status] || STATUS_COLOR.open;
  return (
    <span
      style={{
        background: colors.bg,
        color: colors.fg,
        padding: '2px 8px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}
    >
      {status}
    </span>
  );
}

function ReportRow({ report, onUpdate }) {
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState(report.resolution_note || '');
  const [editingNote, setEditingNote] = useState(false);

  const setStatus = async (newStatus) => {
    setBusy(true);
    try {
      const updated = await apiFetch(
        `/api/instructor/question-reports/${report.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ status: newStatus }),
        }
      );
      onUpdate?.({ ...report, ...updated });
    } catch (e) {
      console.warn('[reports] status update failed', e);
    } finally {
      setBusy(false);
    }
  };

  const saveNote = async () => {
    setBusy(true);
    try {
      const updated = await apiFetch(
        `/api/instructor/question-reports/${report.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ resolutionNote: note }),
        }
      );
      onUpdate?.({ ...report, ...updated });
      setEditingNote(false);
    } catch (e) {
      console.warn('[reports] note save failed', e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 8,
          marginBottom: 8,
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>
            {report.reason?.replace(/_/g, ' ') || 'unknown'}{' '}
            <span style={{ color: '#64748b', fontWeight: 400 }}>
              · {report.subject || 'no subject'}
            </span>
          </div>
          <div style={{ fontSize: 12, color: '#64748b' }}>
            {report.reporter_name ||
              report.reporter_email ||
              `user #${report.user_id}`}{' '}
            · {new Date(report.created_at).toLocaleString()}
          </div>
        </div>
        <StatusPill status={report.status} />
      </div>

      {report.quiz_title && (
        <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>
          <strong>Quiz:</strong> {report.quiz_title}
          {report.quiz_code ? ` (${report.quiz_code})` : ''}
        </div>
      )}
      {report.question_text && (
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            padding: 8,
            fontSize: 12,
            color: '#334155',
            marginBottom: 6,
            whiteSpace: 'pre-wrap',
            maxHeight: 200,
            overflowY: 'auto',
          }}
        >
          {report.question_text}
        </div>
      )}
      {report.details && (
        <div
          style={{
            fontSize: 12,
            color: '#0f172a',
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: 8,
            padding: 8,
            marginBottom: 8,
          }}
        >
          <strong>Reporter said:</strong> {report.details}
        </div>
      )}

      <div style={{ marginBottom: 8 }}>
        {editingNote ? (
          <div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 1500))}
              rows={2}
              placeholder="Add a triage note for the team…"
              style={{
                width: '100%',
                border: '1px solid #cbd5e1',
                borderRadius: 6,
                padding: 6,
                fontSize: 12,
                fontFamily: 'inherit',
              }}
            />
            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              <button
                type="button"
                onClick={saveNote}
                disabled={busy}
                style={{
                  fontSize: 12,
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: 'none',
                  background: '#0ea5e9',
                  color: '#ffffff',
                  cursor: busy ? 'wait' : 'pointer',
                }}
              >
                Save note
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingNote(false);
                  setNote(report.resolution_note || '');
                }}
                style={{
                  fontSize: 12,
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{ fontSize: 12, color: '#475569' }}
            onClick={() => setEditingNote(true)}
            role="button"
            tabIndex={0}
          >
            <strong>Note:</strong>{' '}
            {report.resolution_note || (
              <em style={{ color: '#94a3b8' }}>add a note…</em>
            )}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['open', 'triaged', 'resolved', 'dismissed'].map((s) => {
          const active = report.status === s;
          return (
            <button
              key={s}
              type="button"
              disabled={busy || active}
              onClick={() => setStatus(s)}
              style={{
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 999,
                border: active ? '2px solid #0ea5e9' : '1px solid #cbd5e1',
                background: active ? '#e0f2fe' : '#ffffff',
                color: active ? '#0c4a6e' : '#334155',
                cursor: active || busy ? 'default' : 'pointer',
                fontWeight: active ? 700 : 500,
                textTransform: 'capitalize',
              }}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function InstructorReportsPanel() {
  const [reports, setReports] = useState([]);
  const [summary, setSummary] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('open');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = filter === 'all' ? '' : `?status=${filter}`;
      const data = await apiFetch(`/api/instructor/question-reports${qs}`);
      setReports(Array.isArray(data?.reports) ? data.reports : []);
      setSummary(data?.summary || { total: 0 });
    } catch (e) {
      console.warn('[reports] load failed', e);
      setReports([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const onUpdate = (updated) => {
    setReports((prev) =>
      prev.map((r) => (r.id === updated.id ? { ...r, ...updated } : r))
    );
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 12,
          flexWrap: 'wrap',
        }}
      >
        {['open', 'triaged', 'resolved', 'dismissed', 'all'].map((s) => {
          const active = filter === s;
          const count = s === 'all' ? summary.total : summary[s];
          return (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              style={{
                fontSize: 12,
                padding: '4px 12px',
                borderRadius: 999,
                border: active ? '2px solid #0ea5e9' : '1px solid #cbd5e1',
                background: active ? '#e0f2fe' : '#ffffff',
                color: active ? '#0c4a6e' : '#334155',
                cursor: 'pointer',
                fontWeight: active ? 700 : 500,
                textTransform: 'capitalize',
              }}
            >
              {s}{' '}
              {count != null && <span style={{ opacity: 0.7 }}>({count})</span>}
            </button>
          );
        })}
        <button
          type="button"
          onClick={load}
          style={{
            fontSize: 12,
            padding: '4px 12px',
            borderRadius: 999,
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            cursor: 'pointer',
            marginLeft: 'auto',
          }}
        >
          ↻ Refresh
        </button>
      </div>
      {loading && (
        <div style={{ color: '#64748b', fontSize: 13 }}>Loading reports…</div>
      )}
      {!loading && reports.length === 0 && (
        <div
          style={{
            background: '#ffffff',
            border: '1px dashed #cbd5e1',
            borderRadius: 12,
            padding: 32,
            textAlign: 'center',
            color: '#64748b',
          }}
        >
          No {filter === 'all' ? '' : filter} reports.
        </div>
      )}
      {reports.map((r) => (
        <ReportRow key={r.id} report={r} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
