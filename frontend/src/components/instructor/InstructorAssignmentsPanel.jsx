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
  if (!res.ok) {
    let detail = '';
    try {
      const text = await res.text();
      try {
        const j = JSON.parse(text);
        detail = j?.error || j?.message || text;
      } catch {
        detail = text;
      }
    } catch {
      /* ignore */
    }
    const err = new Error(
      `${path} → ${res.status}${detail ? `: ${detail}` : ''}`
    );
    err.status = res.status;
    err.detail = detail;
    throw err;
  }
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// ---- Quiz catalog picker (named export, also imported by Curriculum panel) ----

const QUIZ_SUBJECT_LABELS = {
  math: 'Math',
  rla: 'Reasoning Through Language Arts (RLA)',
  science: 'Science',
  social: 'Social Studies',
  workforce: 'Workforce Readiness',
};

export const SUBJECT_KEY_FROM_LABEL = {
  Math: 'math',
  Science: 'science',
  RLA: 'rla',
  'Social Studies': 'social',
  Workforce: 'workforce',
};

function collectTopicQuizzes(topic) {
  const out = [];
  if (Array.isArray(topic?.quizzes)) {
    for (const q of topic.quizzes) {
      if (q && Array.isArray(q.questions) && q.questions.length > 0) {
        out.push({
          id: q.quizId || q.id,
          title: q.title || q.quizId || 'Untitled Quiz',
          count: q.questions.length,
        });
      }
    }
  }
  if (
    out.length === 0 &&
    Array.isArray(topic?.questions) &&
    topic.questions.length > 0
  ) {
    out.push({
      id: topic.id || topic.title,
      title: topic.title || topic.id || 'Untitled Quiz',
      count: topic.questions.length,
    });
  }
  return out;
}

function categoryHasQuizzes(cat) {
  if (!cat) return false;
  for (const t of cat.topics || []) {
    if (collectTopicQuizzes(t).length > 0) return true;
  }
  if (Array.isArray(cat.quizzes)) {
    for (const q of cat.quizzes) {
      if (q && Array.isArray(q.questions) && q.questions.length > 0)
        return true;
    }
  }
  return false;
}

const pickerInputStyle = {
  padding: '6px 10px',
  border: '1px solid #cbd5e1',
  borderRadius: 6,
  fontSize: 13,
  background: '#ffffff',
};

let _catalogPromise = null;
function loadCatalogOnce() {
  if (_catalogPromise) return _catalogPromise;
  _catalogPromise = fetch(`${getApiBase()}/api/all-quizzes`)
    .then((r) =>
      r.ok ? r.json() : Promise.reject(new Error(`status ${r.status}`))
    )
    .catch((e) => {
      _catalogPromise = null;
      throw e;
    });
  return _catalogPromise;
}

export function QuizCatalogPicker({ value, onChange, subjectKey }) {
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    loadCatalogOnce()
      .then((data) => {
        if (alive) setCatalog(data || {});
      })
      .catch((e) => {
        if (alive) setError(e.message);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const v = value || {};
  const lockedSubject = subjectKey || v.subjectKey || '';

  const subjectsWithQuizzes = useMemo(() => {
    if (!catalog) return [];
    const out = [];
    for (const [key, label] of Object.entries(QUIZ_SUBJECT_LABELS)) {
      const data = catalog[label];
      if (!data) continue;
      const cats = data.categories || {};
      if (Object.values(cats).some(categoryHasQuizzes)) {
        out.push({ key, label });
      }
    }
    return out;
  }, [catalog]);

  const subjectData = useMemo(() => {
    if (!catalog || !lockedSubject) return null;
    const label = QUIZ_SUBJECT_LABELS[lockedSubject];
    return label ? catalog[label] || null : null;
  }, [catalog, lockedSubject]);

  const categoryOptions = useMemo(() => {
    const cats = subjectData?.categories || {};
    return Object.keys(cats).filter((name) => categoryHasQuizzes(cats[name]));
  }, [subjectData]);

  const topicOptions = useMemo(() => {
    if (!subjectData || !v.categoryName) return [];
    const cat = subjectData.categories?.[v.categoryName];
    if (!cat) return [];
    return (cat.topics || [])
      .filter((t) => collectTopicQuizzes(t).length > 0)
      .map((t) => ({ id: t.id, title: t.title || t.id }));
  }, [subjectData, v.categoryName]);

  const quizOptions = useMemo(() => {
    if (!subjectData || !v.categoryName) return [];
    const cat = subjectData.categories?.[v.categoryName];
    if (!cat) return [];
    if (v.topicTitle) {
      const topic = (cat.topics || []).find(
        (t) => t.title === v.topicTitle || t.id === v.topicTitle
      );
      if (topic) return collectTopicQuizzes(topic);
    }
    if (Array.isArray(cat.quizzes)) {
      return cat.quizzes
        .filter(
          (q) => q && Array.isArray(q.questions) && q.questions.length > 0
        )
        .map((q) => ({
          id: q.quizId || q.id,
          title: q.title || q.quizId,
          count: q.questions.length,
        }));
    }
    return [];
  }, [subjectData, v.categoryName, v.topicTitle]);

  const set = (patch) => onChange?.({ ...v, ...patch });

  if (loading)
    return (
      <div style={{ fontSize: 12, color: '#64748b' }}>
        Loading quiz catalog…
      </div>
    );
  if (error)
    return (
      <div style={{ fontSize: 12, color: '#b91c1c' }}>
        Catalog unavailable: {error}
      </div>
    );

  const cols = subjectKey ? '1fr 1fr 1fr' : '1fr 1fr 1fr 1fr';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 6 }}>
      {!subjectKey && (
        <select
          value={v.subjectKey || ''}
          onChange={(e) =>
            set({
              subjectKey: e.target.value,
              categoryName: '',
              topicTitle: '',
              quizId: '',
            })
          }
          style={pickerInputStyle}
        >
          <option value="">Subject…</option>
          {subjectsWithQuizzes.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
      )}
      <select
        value={v.categoryName || ''}
        disabled={!lockedSubject}
        onChange={(e) =>
          set({
            categoryName: e.target.value,
            topicTitle: '',
            quizId: '',
          })
        }
        style={pickerInputStyle}
      >
        <option value="">Category…</option>
        {categoryOptions.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <select
        value={v.topicTitle || ''}
        disabled={!v.categoryName}
        onChange={(e) => set({ topicTitle: e.target.value, quizId: '' })}
        style={pickerInputStyle}
      >
        <option value="">Topic…</option>
        {topicOptions.map((t) => (
          <option key={t.id || t.title} value={t.title}>
            {t.title}
          </option>
        ))}
      </select>
      <select
        value={v.quizId || ''}
        disabled={quizOptions.length === 0}
        onChange={(e) => set({ quizId: e.target.value })}
        style={pickerInputStyle}
      >
        <option value="">Quiz…</option>
        {quizOptions.map((q) => (
          <option key={q.id} value={q.id}>
            {q.title} ({q.count} q)
          </option>
        ))}
      </select>
    </div>
  );
}

const SUBJECTS = ['', 'Math', 'Science', 'Social Studies', 'RLA'];

const SUBJECT_LABEL_FROM_KEY = Object.entries(SUBJECT_KEY_FROM_LABEL).reduce(
  (acc, [label, key]) => {
    acc[key] = label;
    return acc;
  },
  {}
);

const EMPTY_PICKER = {
  subjectKey: '',
  categoryName: '',
  topicTitle: '',
  quizId: '',
};

const EMPTY_FORM = {
  title: '',
  subject: '',
  picker: { ...EMPTY_PICKER },
  class_id: '',
  due_at: '',
  notes: '',
  target_user_ids: [],
};

export default function InstructorAssignmentsPanel({ students = [] }) {
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [form, setForm] = useState(() => ({ ...EMPTY_FORM }));
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
    setSubmitError(null);
    try {
      const subjectLabel =
        form.subject || SUBJECT_LABEL_FROM_KEY[form.picker.subjectKey] || '';
      await apiFetch('/api/instructor/assignments', {
        method: 'POST',
        body: JSON.stringify({
          title: form.title.trim(),
          subject: subjectLabel || null,
          quiz_id: form.picker.quizId || null,
          class_id: form.class_id ? Number(form.class_id) : null,
          due_at: form.due_at || null,
          notes: form.notes || null,
          target_user_ids: form.target_user_ids,
        }),
      });
      setForm({ ...EMPTY_FORM });
      await load();
    } catch (err) {
      console.warn('[assignments] create failed', err);
      setSubmitError(err?.message || 'Failed to create assignment');
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
              onChange={(e) => {
                const label = e.target.value;
                setForm((f) => ({
                  ...f,
                  subject: label,
                  picker: {
                    ...EMPTY_PICKER,
                    subjectKey: SUBJECT_KEY_FROM_LABEL[label] || '',
                  },
                }));
              }}
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
              placeholder="Quiz ID (auto)"
              value={form.picker.quizId}
              readOnly
              style={{
                padding: '6px 10px',
                border: '1px solid #cbd5e1',
                borderRadius: 6,
                fontSize: 13,
                background: '#f1f5f9',
                color: '#475569',
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
          <div style={{ marginBottom: 8 }}>
            <div
              style={{
                fontSize: 11,
                color: '#475569',
                fontWeight: 600,
                marginBottom: 4,
                textTransform: 'uppercase',
              }}
            >
              Pick quiz from catalog
            </div>
            <QuizCatalogPicker
              subjectKey={
                SUBJECT_KEY_FROM_LABEL[form.subject] ||
                form.picker.subjectKey ||
                ''
              }
              value={form.picker}
              onChange={(next) =>
                setForm((f) => {
                  const picker = { ...f.picker, ...next };
                  let subject = f.subject;
                  if (
                    next.subjectKey !== undefined &&
                    SUBJECT_LABEL_FROM_KEY[next.subjectKey]
                  ) {
                    subject = SUBJECT_LABEL_FROM_KEY[next.subjectKey];
                  }
                  return { ...f, subject, picker };
                })
              }
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
          {submitError && (
            <div
              style={{
                marginTop: 8,
                padding: 8,
                background: '#fef2f2',
                color: '#b91c1c',
                border: '1px solid #fecaca',
                borderRadius: 6,
                fontSize: 12,
              }}
            >
              {submitError}
            </div>
          )}
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
