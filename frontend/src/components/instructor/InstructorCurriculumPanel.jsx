import React, { useCallback, useEffect, useState } from 'react';
import {
  QuizCatalogPicker,
  SUBJECT_KEY_FROM_LABEL,
} from './InstructorAssignmentsPanel.jsx';

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

const EMPTY_DRAFT = {
  title: '',
  subject: '',
  picker: { ...EMPTY_PICKER },
  planned_start_date: '',
  planned_end_date: '',
};

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

const SUBJECTS = ['', 'Math', 'Science', 'Social Studies', 'RLA'];

function ClassPicker({ classes, value, onChange }) {
  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
      style={{
        padding: '6px 10px',
        border: '1px solid #cbd5e1',
        borderRadius: 8,
        fontSize: 13,
        background: '#ffffff',
      }}
    >
      <option value="">Select a class…</option>
      {classes.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name} ({c.member_count} student{c.member_count === 1 ? '' : 's'})
        </option>
      ))}
    </select>
  );
}

export default function InstructorCurriculumPanel() {
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addItemError, setAddItemError] = useState(null);
  const [draftItem, setDraftItem] = useState(() => ({ ...EMPTY_DRAFT }));

  // Stable: never depends on classId so creating a class can't trigger a
  // stale-closure refetch race.
  const loadClasses = useCallback(async () => {
    try {
      const data = await apiFetch('/api/instructor/classes');
      const list = Array.isArray(data?.classes) ? data.classes : [];
      setClasses(list);
      return list;
    } catch (e) {
      console.warn('[curriculum] load classes failed', e);
      return null;
    }
  }, []);

  const loadItems = useCallback(async () => {
    if (!classId) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const data = await apiFetch(
        `/api/instructor/classes/${classId}/curriculum`
      );
      setItems(Array.isArray(data?.items) ? data.items : []);
    } catch (e) {
      console.warn('[curriculum] load items failed', e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [classId]);

  useEffect(() => {
    loadClasses();
  }, [loadClasses]);

  // Auto-pick the first class only on initial load if nothing is selected.
  useEffect(() => {
    if (classId == null && classes.length > 0) {
      setClassId(classes[0].id);
    }
  }, [classId, classes]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const addItem = async (e) => {
    e.preventDefault();
    if (!classId || !draftItem.title.trim()) return;
    setAddItemError(null);
    try {
      const subjectLabel =
        draftItem.subject ||
        SUBJECT_LABEL_FROM_KEY[draftItem.picker.subjectKey] ||
        '';
      await apiFetch(`/api/instructor/classes/${classId}/curriculum`, {
        method: 'POST',
        body: JSON.stringify({
          title: draftItem.title.trim(),
          subject: subjectLabel || null,
          quiz_id: draftItem.picker.quizId || null,
          category_name: draftItem.picker.categoryName || null,
          topic_id: draftItem.picker.topicTitle || null,
          planned_date: draftItem.planned_start_date || null,
          planned_end_date:
            draftItem.planned_end_date || draftItem.planned_start_date || null,
        }),
      });
      setDraftItem({ ...EMPTY_DRAFT });
      await loadItems();
    } catch (err) {
      console.warn('[curriculum] add item failed', err);
      setAddItemError(err?.message || 'Failed to add item');
    }
  };

  const move = async (item, delta) => {
    const idx = items.findIndex((x) => x.id === item.id);
    if (idx < 0) return;
    const target = items[idx + delta];
    if (!target) return;
    try {
      await apiFetch(`/api/instructor/curriculum/${item.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ position: target.position }),
      });
      await apiFetch(`/api/instructor/curriculum/${target.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ position: item.position }),
      });
      await loadItems();
    } catch (e) {
      console.warn('[curriculum] reorder failed', e);
    }
  };

  const toggleCovered = async (item) => {
    try {
      await apiFetch(`/api/instructor/curriculum/${item.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          manually_marked_covered: !item.manually_marked_covered,
        }),
      });
      await loadItems();
    } catch (e) {
      console.warn('[curriculum] toggle failed', e);
    }
  };

  const removeItem = async (item) => {
    if (!window.confirm(`Remove "${item.title}" from the curriculum?`)) return;
    try {
      await apiFetch(`/api/instructor/curriculum/${item.id}`, {
        method: 'DELETE',
      });
      await loadItems();
    } catch (e) {
      console.warn('[curriculum] delete failed', e);
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          marginBottom: 12,
          flexWrap: 'wrap',
        }}
      >
        <ClassPicker classes={classes} value={classId} onChange={setClassId} />
        {classes.length === 0 && (
          <div style={{ fontSize: 13, color: '#64748b' }}>
            No classes yet. Create one in the <strong>Classes</strong> tab.
          </div>
        )}
      </div>

      {classId && (
        <>
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
                fontSize: 12,
                fontWeight: 700,
                color: '#475569',
                marginBottom: 8,
                textTransform: 'uppercase',
              }}
            >
              Add Curriculum Item
            </div>
            <form
              onSubmit={addItem}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto',
                gap: 6,
              }}
            >
              <input
                type="text"
                required
                placeholder="Title (e.g. Linear Equations Intro)"
                value={draftItem.title}
                onChange={(e) =>
                  setDraftItem((d) => ({ ...d, title: e.target.value }))
                }
                style={{
                  padding: '6px 10px',
                  border: '1px solid #cbd5e1',
                  borderRadius: 6,
                  fontSize: 13,
                }}
              />
              <select
                value={draftItem.subject}
                onChange={(e) => {
                  const label = e.target.value;
                  setDraftItem((d) => ({
                    ...d,
                    subject: label,
                    // Reset picker when subject changes so old categoryName/quizId
                    // don't leak across subjects.
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
                value={draftItem.picker.quizId}
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
              <input
                type="date"
                aria-label="Planned from"
                title="From (start of timeframe)"
                value={draftItem.planned_start_date}
                onChange={(e) =>
                  setDraftItem((d) => ({
                    ...d,
                    planned_start_date: e.target.value,
                  }))
                }
                style={{
                  padding: '6px 10px',
                  border: '1px solid #cbd5e1',
                  borderRadius: 6,
                  fontSize: 13,
                }}
              />
              <input
                type="date"
                aria-label="Planned to"
                title="To (end of timeframe — leave blank for a single day)"
                value={draftItem.planned_end_date}
                min={draftItem.planned_start_date || undefined}
                onChange={(e) =>
                  setDraftItem((d) => ({
                    ...d,
                    planned_end_date: e.target.value,
                  }))
                }
                style={{
                  padding: '6px 10px',
                  border: '1px solid #cbd5e1',
                  borderRadius: 6,
                  fontSize: 13,
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: 6,
                  background: '#0ea5e9',
                  color: '#ffffff',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                Add
              </button>
            </form>
            <div style={{ marginTop: 8 }}>
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
                  SUBJECT_KEY_FROM_LABEL[draftItem.subject] ||
                  draftItem.picker.subjectKey ||
                  ''
                }
                value={draftItem.picker}
                onChange={(next) =>
                  setDraftItem((d) => {
                    const picker = { ...d.picker, ...next };
                    // If picker exposes subjectKey (when no subject is locked),
                    // keep the form's subject label in sync.
                    let subject = d.subject;
                    if (
                      next.subjectKey !== undefined &&
                      SUBJECT_LABEL_FROM_KEY[next.subjectKey]
                    ) {
                      subject = SUBJECT_LABEL_FROM_KEY[next.subjectKey];
                    }
                    return { ...d, subject, picker };
                  })
                }
              />
              {addItemError && (
                <div
                  style={{
                    marginTop: 6,
                    padding: 6,
                    background: '#fef2f2',
                    color: '#b91c1c',
                    border: '1px solid #fecaca',
                    borderRadius: 6,
                    fontSize: 12,
                  }}
                >
                  {addItemError}
                </div>
              )}
            </div>
          </div>

          {loading && <div style={{ color: '#64748b' }}>Loading…</div>}
          {!loading && items.length === 0 && (
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
              No items yet. Add one above to start your class outline.
            </div>
          )}
          {items.map((item, idx) => (
            <div
              key={item.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                padding: 10,
                marginBottom: 6,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                opacity: item.manually_marked_covered ? 0.6 : 1,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <button
                  type="button"
                  onClick={() => move(item, -1)}
                  disabled={idx === 0}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: idx === 0 ? 'default' : 'pointer',
                    color: idx === 0 ? '#cbd5e1' : '#475569',
                    fontSize: 12,
                    padding: 0,
                  }}
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => move(item, 1)}
                  disabled={idx === items.length - 1}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: idx === items.length - 1 ? 'default' : 'pointer',
                    color: idx === items.length - 1 ? '#cbd5e1' : '#475569',
                    fontSize: 12,
                    padding: 0,
                  }}
                >
                  ▼
                </button>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: item.manually_marked_covered
                      ? 'line-through'
                      : 'none',
                  }}
                >
                  {item.title}
                </div>
                <div style={{ fontSize: 11, color: '#64748b' }}>
                  {item.subject || '—'}
                  {item.quiz_id ? ` · quiz ${item.quiz_id}` : ''}
                  {(() => {
                    const start = item.planned_date
                      ? new Date(item.planned_date).toLocaleDateString()
                      : null;
                    const end = item.planned_end_date
                      ? new Date(item.planned_end_date).toLocaleDateString()
                      : null;
                    if (start && end && start !== end) {
                      return ` · ${start} – ${end}`;
                    }
                    if (start) return ` · planned ${start}`;
                    return '';
                  })()}
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleCovered(item)}
                style={{
                  padding: '4px 10px',
                  border: '1px solid #cbd5e1',
                  borderRadius: 6,
                  background: item.manually_marked_covered
                    ? '#dcfce7'
                    : '#ffffff',
                  color: item.manually_marked_covered ? '#166534' : '#334155',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                {item.manually_marked_covered ? '✓ Covered' : 'Mark covered'}
              </button>
              <button
                type="button"
                onClick={() => removeItem(item)}
                style={{
                  padding: '4px 8px',
                  border: '1px solid #fecaca',
                  borderRadius: 6,
                  background: '#fef2f2',
                  color: '#b91c1c',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
