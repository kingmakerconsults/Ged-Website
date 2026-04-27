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
  const [newClassName, setNewClassName] = useState('');
  const [creatingClass, setCreatingClass] = useState(false);
  const [draftItem, setDraftItem] = useState({
    title: '',
    subject: '',
    quiz_id: '',
    planned_date: '',
  });

  const loadClasses = useCallback(async () => {
    try {
      const data = await apiFetch('/api/instructor/classes');
      const list = Array.isArray(data?.classes) ? data.classes : [];
      setClasses(list);
      if (!classId && list.length) setClassId(list[0].id);
    } catch (e) {
      console.warn('[curriculum] load classes failed', e);
    }
  }, [classId]);

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

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const createClass = async (e) => {
    e.preventDefault();
    const name = newClassName.trim();
    if (!name) return;
    setCreatingClass(true);
    try {
      const data = await apiFetch('/api/instructor/classes', {
        method: 'POST',
        body: JSON.stringify({ name }),
      });
      setNewClassName('');
      await loadClasses();
      if (data?.class?.id) setClassId(data.class.id);
    } catch (err) {
      console.warn('[curriculum] create class failed', err);
    } finally {
      setCreatingClass(false);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!classId || !draftItem.title.trim()) return;
    try {
      await apiFetch(`/api/instructor/classes/${classId}/curriculum`, {
        method: 'POST',
        body: JSON.stringify({
          title: draftItem.title.trim(),
          subject: draftItem.subject || null,
          quiz_id: draftItem.quiz_id || null,
          planned_date: draftItem.planned_date || null,
        }),
      });
      setDraftItem({ title: '', subject: '', quiz_id: '', planned_date: '' });
      await loadItems();
    } catch (err) {
      console.warn('[curriculum] add item failed', err);
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
        <form onSubmit={createClass} style={{ display: 'flex', gap: 4 }}>
          <input
            type="text"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            placeholder="New class name"
            style={{
              padding: '6px 10px',
              border: '1px solid #cbd5e1',
              borderRadius: 8,
              fontSize: 13,
            }}
          />
          <button
            type="submit"
            disabled={creatingClass || !newClassName.trim()}
            style={{
              padding: '6px 12px',
              border: 'none',
              borderRadius: 8,
              background: '#0ea5e9',
              color: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            + Class
          </button>
        </form>
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
                gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
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
                onChange={(e) =>
                  setDraftItem((d) => ({ ...d, subject: e.target.value }))
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
                value={draftItem.quiz_id}
                onChange={(e) =>
                  setDraftItem((d) => ({ ...d, quiz_id: e.target.value }))
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
                value={draftItem.planned_date}
                onChange={(e) =>
                  setDraftItem((d) => ({ ...d, planned_date: e.target.value }))
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
                  {item.planned_date
                    ? ` · planned ${new Date(item.planned_date).toLocaleDateString()}`
                    : ''}
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
