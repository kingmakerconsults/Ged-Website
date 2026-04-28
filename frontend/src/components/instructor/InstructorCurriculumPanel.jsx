import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Subjects available for curriculum planning. Workforce is curriculum-only
// and is intentionally not part of the assignment quiz catalog flow.
const SUBJECT_LABELS = [
  'Math',
  'Science',
  'Social Studies',
  'RLA',
  'Workforce',
];

// Maps the curriculum subject label to the catalog key used in /api/all-quizzes.
const CATALOG_KEY_FROM_LABEL = {
  Math: 'Math',
  Science: 'Science',
  'Social Studies': 'Social Studies',
  RLA: 'Reasoning Through Language Arts (RLA)',
  Workforce: 'Workforce Readiness',
};

const EMPTY_DRAFT = {
  title: '',
  subject: '',
  categories: [],
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
        const parts = [];
        if (j?.error) parts.push(j.error);
        if (j?.detail && j.detail !== j?.error) parts.push(j.detail);
        if (!parts.length && j?.message) parts.push(j.message);
        detail = parts.join(' — ') || text;
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

// Multi-select content-area picker. Renders a chip list of categories for the
// chosen subject; clicking a chip toggles its selection.
function CategoryChips({ subject, value, onChange, catalog }) {
  const categories = useMemo(() => {
    if (!subject) return [];
    const key = CATALOG_KEY_FROM_LABEL[subject];
    if (!key || !catalog) return [];
    const data = catalog[key];
    if (!data || !data.categories) return [];
    return Object.keys(data.categories);
  }, [subject, catalog]);

  if (!subject) {
    return (
      <div style={{ fontSize: 12, color: '#64748b' }}>
        Pick a subject above to see its content areas.
      </div>
    );
  }
  if (categories.length === 0) {
    return (
      <div style={{ fontSize: 12, color: '#64748b' }}>
        No content areas catalogued for {subject} yet — title-only items still
        work.
      </div>
    );
  }

  const set = new Set(value || []);
  const toggle = (name) => {
    const next = new Set(set);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    onChange(Array.from(next));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {categories.map((name) => {
        const active = set.has(name);
        return (
          <button
            key={name}
            type="button"
            onClick={() => toggle(name)}
            style={{
              padding: '4px 10px',
              border: '1px solid',
              borderColor: active ? '#0ea5e9' : '#cbd5e1',
              borderRadius: 999,
              background: active ? '#0ea5e9' : '#ffffff',
              color: active ? '#ffffff' : '#0f172a',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}

const inputStyle = {
  padding: '6px 10px',
  border: '1px solid #cbd5e1',
  borderRadius: 6,
  fontSize: 13,
};

function EditItemRow({ item, onSave, onCancel, catalog }) {
  const [draft, setDraft] = useState({
    title: item.title || '',
    subject: item.subject || '',
    category_name: item.category_name || '',
    planned_start_date: item.planned_date
      ? new Date(item.planned_date).toISOString().slice(0, 10)
      : '',
    planned_end_date: item.planned_end_date
      ? new Date(item.planned_end_date).toISOString().slice(0, 10)
      : '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const categoryOptions = useMemo(() => {
    if (!draft.subject || !catalog) return [];
    const key = CATALOG_KEY_FROM_LABEL[draft.subject];
    if (!key) return [];
    const data = catalog[key];
    if (!data || !data.categories) return [];
    return Object.keys(data.categories);
  }, [draft.subject, catalog]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSave({
        title: draft.title.trim(),
        subject: draft.subject || null,
        category_name: draft.category_name || null,
        planned_date: draft.planned_start_date || null,
        planned_end_date:
          draft.planned_end_date || draft.planned_start_date || null,
      });
    } catch (err) {
      setError(err?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      style={{
        background: '#f8fafc',
        border: '1px solid #cbd5e1',
        borderRadius: 8,
        padding: 10,
        marginBottom: 6,
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1.5fr 1fr 1fr auto auto',
        gap: 6,
        alignItems: 'center',
      }}
    >
      <input
        type="text"
        required
        value={draft.title}
        placeholder="Title"
        onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
        style={inputStyle}
      />
      <select
        value={draft.subject}
        onChange={(e) =>
          setDraft((d) => ({
            ...d,
            subject: e.target.value,
            category_name: '',
          }))
        }
        style={inputStyle}
      >
        <option value="">Subject…</option>
        {SUBJECT_LABELS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select
        value={draft.category_name}
        onChange={(e) =>
          setDraft((d) => ({ ...d, category_name: e.target.value }))
        }
        style={inputStyle}
        disabled={!draft.subject}
      >
        <option value="">Content area…</option>
        {categoryOptions.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={draft.planned_start_date}
        onChange={(e) =>
          setDraft((d) => ({ ...d, planned_start_date: e.target.value }))
        }
        style={inputStyle}
      />
      <input
        type="date"
        value={draft.planned_end_date}
        min={draft.planned_start_date || undefined}
        onChange={(e) =>
          setDraft((d) => ({ ...d, planned_end_date: e.target.value }))
        }
        style={inputStyle}
      />
      <button
        type="submit"
        disabled={saving}
        style={{
          padding: '6px 12px',
          border: 'none',
          borderRadius: 6,
          background: saving ? '#94a3b8' : '#0ea5e9',
          color: '#ffffff',
          fontWeight: 600,
          cursor: saving ? 'default' : 'pointer',
          fontSize: 13,
        }}
      >
        Save
      </button>
      <button
        type="button"
        onClick={onCancel}
        style={{
          padding: '6px 12px',
          border: '1px solid #cbd5e1',
          borderRadius: 6,
          background: '#ffffff',
          color: '#0f172a',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Cancel
      </button>
      {error && (
        <div
          style={{
            gridColumn: '1 / -1',
            padding: 6,
            background: '#fef2f2',
            color: '#b91c1c',
            border: '1px solid #fecaca',
            borderRadius: 6,
            fontSize: 12,
          }}
        >
          {error}
        </div>
      )}
    </form>
  );
}

export default function InstructorCurriculumPanel() {
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addItemError, setAddItemError] = useState(null);
  const [draftItem, setDraftItem] = useState(() => ({ ...EMPTY_DRAFT }));
  const [catalog, setCatalog] = useState(null);
  const [editingId, setEditingId] = useState(null);

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

  useEffect(() => {
    let alive = true;
    loadCatalogOnce()
      .then((d) => {
        if (alive) setCatalog(d || {});
      })
      .catch((e) => {
        console.warn('[curriculum] catalog load failed', e);
      });
    return () => {
      alive = false;
    };
  }, []);

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
      const baseTitle = draftItem.title.trim();
      const cats = draftItem.categories.length ? draftItem.categories : [null];
      // One item per selected category (or a single item with no category if
      // none was selected).
      for (const cat of cats) {
        const title =
          cats.length > 1 && cat ? `${baseTitle} — ${cat}` : baseTitle;
        await apiFetch(`/api/instructor/classes/${classId}/curriculum`, {
          method: 'POST',
          body: JSON.stringify({
            title,
            subject: draftItem.subject || null,
            category_name: cat || null,
            planned_date: draftItem.planned_start_date || null,
            planned_end_date:
              draftItem.planned_end_date ||
              draftItem.planned_start_date ||
              null,
          }),
        });
      }
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

  const saveEdit = async (item, payload) => {
    await apiFetch(`/api/instructor/curriculum/${item.id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setEditingId(null);
    await loadItems();
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
              Add Curriculum Item(s)
            </div>
            <form
              onSubmit={addItem}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                gap: 6,
                alignItems: 'center',
              }}
            >
              <input
                type="text"
                required
                placeholder="Title (e.g. Week 1)"
                value={draftItem.title}
                onChange={(e) =>
                  setDraftItem((d) => ({ ...d, title: e.target.value }))
                }
                style={inputStyle}
              />
              <select
                value={draftItem.subject}
                onChange={(e) =>
                  setDraftItem((d) => ({
                    ...d,
                    subject: e.target.value,
                    categories: [],
                  }))
                }
                style={inputStyle}
              >
                <option value="">Subject…</option>
                {SUBJECT_LABELS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
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
                style={inputStyle}
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
                style={inputStyle}
              />
              <button
                type="submit"
                disabled={!draftItem.title.trim()}
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: 6,
                  background: draftItem.title.trim() ? '#0ea5e9' : '#94a3b8',
                  color: '#ffffff',
                  fontWeight: 600,
                  cursor: draftItem.title.trim() ? 'pointer' : 'default',
                  fontSize: 13,
                }}
              >
                {draftItem.categories.length > 1
                  ? `Add ${draftItem.categories.length} items`
                  : 'Add'}
              </button>
            </form>
            <div style={{ marginTop: 10 }}>
              <div
                style={{
                  fontSize: 11,
                  color: '#475569',
                  fontWeight: 600,
                  marginBottom: 6,
                  textTransform: 'uppercase',
                }}
              >
                Content areas (pick one or many — one item is created per
                selection)
              </div>
              <CategoryChips
                subject={draftItem.subject}
                value={draftItem.categories}
                onChange={(next) =>
                  setDraftItem((d) => ({ ...d, categories: next }))
                }
                catalog={catalog}
              />
              {addItemError && (
                <div
                  style={{
                    marginTop: 8,
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
          {items.map((item, idx) => {
            if (editingId === item.id) {
              return (
                <EditItemRow
                  key={item.id}
                  item={item}
                  catalog={catalog}
                  onCancel={() => setEditingId(null)}
                  onSave={(payload) => saveEdit(item, payload)}
                />
              );
            }
            return (
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
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
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
                    {item.category_name ? ` · ${item.category_name}` : ''}
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
                      if (start) return ` · ${start}`;
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
                  onClick={() => setEditingId(item.id)}
                  style={{
                    padding: '4px 10px',
                    border: '1px solid #cbd5e1',
                    borderRadius: 6,
                    background: '#ffffff',
                    color: '#0f172a',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Edit
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
            );
          })}
        </>
      )}
    </div>
  );
}
