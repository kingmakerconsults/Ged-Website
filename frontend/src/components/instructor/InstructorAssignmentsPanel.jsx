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
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const SUBJECTS = ['', 'Math', 'Science', 'Social Studies', 'RLA'];

export default function InstructorAssignmentsPanel({ students = [] }) {
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    subject: '',
    quiz_id: '',
    class_id: '',
    due_at: '',
    notes: '',
    target_user_ids: [],
  });
  const [showArchived, setShowArchived] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [c, a] = await Promise.all([
        apiFetch('/api/instructor/classes'),
        apiFetch('/api/instructor/assignments'),
      ]);
      setClasses(Array.isArray(c?.classes) ? c.classes : []);
      setAssignments(Array.isArray(a?.assignments) ? a.assignments : []);
    } catch (e) {
      console.warn('[assignments] load failed', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const visibleAssignments = useMemo(
    () => assignments.filter((a) => (showArchived ? true : !a.archived_at)),
    [assignments, showArchived]
  );

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    try {
      await apiFetch('/api/instructor/assignments', {
        method: 'POST',
        body: JSON.stringify({
          title: form.title.trim(),
          subject: form.subject || null,
          quiz_id: form.quiz_id || null,
          class_id: form.class_id ? Number(form.class_id) : null,
          due_at: form.due_at || null,
          notes: form.notes || null,
          target_user_ids: form.target_user_ids,
        }),
      });
      setForm({
        title: '',
        subject: '',
        quiz_id: '',
        class_id: '',
        due_at: '',
        notes: '',
        target_user_ids: [],
      });
      await load();
    } catch (err) {
      console.warn('[assignments] create failed', err);
    } finally {
      setSubmitting(false);
    }
  };

  const archive = async (a, archived) => {
    try {
      await apiFetch(`/api/instructor/assignments/${a.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ archived }),
      });
      await load();
    } catch (e) {
      console.warn('[assignments] archive failed', e);
    }
  };

  const toggleStudent = (id) => {
    setForm((f) => {
      const has = f.target_user_ids.includes(id);
      return {
        ...f,
        target_user_ids: has
          ? f.target_user_ids.filter((x) => x !== id)
          : [...f.target_user_ids, id],
      };
    });
  };

  return (
    <div>
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#475569',
            marginBottom: 10,
            textTransform: 'uppercase',
          }}
        >
          New Assignment
        </div>
        <form onSubmit={submit}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
              gap: 8,
              marginBottom: 8,
            }}
          >
            <input
              type="text"
              required
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              style={{
                padding: '6px 10px',
                border: '1px solid #cbd5e1',
                borderRadius: 6,
                fontSize: 13,
              }}
            />
            <select
              value={form.subject}
              onChange={(e) =>
                setForm((f) => ({ ...f, subject: e.target.value }))
              }
              style={{
                padding: '6px 10px',
                border: '1px solid #cbd5e1',
                borderRadius: 6,
                fontSize: 13,
              }}
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s || 'Subject…'}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Quiz ID (optional)"
              value={form.quiz_id}
              onChange={(e) =>
                setForm((f) => ({ ...f, quiz_id: e.target.value }))
              }
              style={{
                padding: '6px 10px',
                border: '1px solid #cbd5e1',
                borderRadius: 6,
                fontSize: 13,
              }}
            />
            <select
              value={form.class_id}
              onChange={(e) =>
                setForm((f) => ({ ...f, class_id: e.target.value }))
              }
              style={{
                padding: '6px 10px',
                border: '1px solid #cbd5e1',
                borderRadius: 6,
                fontSize: 13,
              }}
            >
              <option value="">No class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              type="datetime-local"
              value={form.due_at}
              onChange={(e) =>
                setForm((f) => ({ ...f, due_at: e.target.value }))
              }
              style={{
                padding: '6px 10px',
                border: '1px solid #cbd5e1',
                borderRadius: 6,
                fontSize: 13,
              }}
            />
          </div>
          <textarea
            placeholder="Notes for students (optional)"
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            rows={2}
            style={{
              width: '100%',
              padding: '6px 10px',
              border: '1px solid #cbd5e1',
              borderRadius: 6,
              fontSize: 13,
              fontFamily: 'inherit',
              marginBottom: 8,
            }}
          />
          {students.length > 0 && (
            <details style={{ marginBottom: 8 }}>
              <summary
                style={{
                  cursor: 'pointer',
                  fontSize: 12,
                  color: '#475569',
                  fontWeight: 600,
                }}
              >
                Target specific students ({form.target_user_ids.length}{' '}
                selected)
              </summary>
              <div
                style={{
                  maxHeight: 180,
                  overflowY: 'auto',
                  marginTop: 6,
                  border: '1px solid #e2e8f0',
                  borderRadius: 6,
                  padding: 6,
                  background: '#f8fafc',
                }}
              >
                {students.map((s) => (
                  <label
                    key={s.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 12,
                      padding: '2px 0',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.target_user_ids.includes(s.id)}
                      onChange={() => toggleStudent(s.id)}
                    />
                    {s.name || s.email || `#${s.id}`}
                  </label>
                ))}
              </div>
            </details>
          )}
          <button
            type="submit"
            disabled={submitting || !form.title.trim()}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: 8,
              background: '#0ea5e9',
              color: '#ffffff',
              fontWeight: 600,
              cursor: submitting ? 'wait' : 'pointer',
              fontSize: 13,
            }}
          >
            {submitting ? 'Creating…' : 'Create assignment'}
          </button>
        </form>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 8,
        }}
      >
        <strong style={{ fontSize: 14 }}>Assignments</strong>
        <label style={{ fontSize: 12, color: '#475569', marginLeft: 'auto' }}>
          <input
            type="checkbox"
            checked={showArchived}
            onChange={(e) => setShowArchived(e.target.checked)}
          />{' '}
          Show archived
        </label>
      </div>

      {loading && <div style={{ color: '#64748b' }}>Loading…</div>}
      {!loading && visibleAssignments.length === 0 && (
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
          No assignments yet.
        </div>
      )}
      {visibleAssignments.map((a) => (
        <div
          key={a.id}
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            padding: 12,
            marginBottom: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            opacity: a.archived_at ? 0.55 : 1,
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{a.title}</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>
              {a.subject || '—'}
              {a.class_name ? ` · class ${a.class_name}` : ''}
              {a.target_count
                ? ` · ${a.target_count} targeted student${a.target_count === 1 ? '' : 's'}`
                : ''}
              {a.due_at
                ? ` · due ${new Date(a.due_at).toLocaleString()}`
                : ' · no due date'}
            </div>
          </div>
          <button
            type="button"
            onClick={() => archive(a, !a.archived_at)}
            style={{
              padding: '4px 10px',
              border: '1px solid #cbd5e1',
              borderRadius: 6,
              background: '#ffffff',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {a.archived_at ? 'Unarchive' : 'Archive'}
          </button>
        </div>
      ))}
    </div>
  );
}
