import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AppIcon, { subjectIconName } from '../icons/AppIcon.jsx';

// Student-facing class hub: read-only curriculum, a Google-Calendar-style
// month grid that overlays curriculum items + instructor/student notes onto
// each day, a notes thread, and a printable syllabus view.

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

// ---- Date helpers ----------------------------------------------------------
const ymd = (d) => {
  const yr = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  return `${yr}-${mo}-${da}`;
};

const parseYmd = (raw) => {
  if (!raw) return null;
  // Accept full ISO strings or YYYY-MM-DD; build a local Date so the day grid
  // doesn't shift due to UTC.
  const s = String(raw).slice(0, 10);
  const [y, m, d] = s.split('-').map((n) => parseInt(n, 10));
  if (!y || !m || !d) return null;
  const out = new Date(y, m - 1, d);
  return Number.isFinite(out.getTime()) ? out : null;
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ---- Calendar grid ---------------------------------------------------------
function CalendarGrid({ year, month, eventsByDay, selectedDay, onSelectDay }) {
  // Build a 6-row grid starting at the first Sunday on/before day 1.
  const first = new Date(year, month, 1);
  const startOffset = first.getDay();
  const start = new Date(year, month, 1 - startOffset);
  const cells = [];
  for (let i = 0; i < 42; i += 1) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    cells.push(d);
  }
  const todayKey = ymd(new Date());

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        padding: 12,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 4,
          marginBottom: 6,
        }}
      >
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#475569',
              textAlign: 'center',
              textTransform: 'uppercase',
              padding: 4,
            }}
          >
            {w}
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 4,
        }}
      >
        {cells.map((d) => {
          const k = ymd(d);
          const inMonth = d.getMonth() === month;
          const events = eventsByDay[k] || [];
          const isToday = k === todayKey;
          const isSelected = selectedDay === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => onSelectDay(k)}
              style={{
                minHeight: 76,
                padding: 4,
                border: '1px solid',
                borderColor: isSelected
                  ? '#0ea5e9'
                  : isToday
                    ? '#fbbf24'
                    : '#e2e8f0',
                borderRadius: 6,
                background: isSelected
                  ? '#e0f2fe'
                  : inMonth
                    ? '#ffffff'
                    : '#f8fafc',
                color: inMonth ? '#0f172a' : '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                textAlign: 'left',
                fontSize: 11,
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{d.getDate()}</span>
                {isToday && (
                  <span
                    style={{
                      fontSize: 9,
                      background: '#fbbf24',
                      color: '#78350f',
                      padding: '0 4px',
                      borderRadius: 4,
                      fontWeight: 700,
                    }}
                  >
                    TODAY
                  </span>
                )}
              </div>
              {events.slice(0, 3).map((ev, i) => (
                <div
                  key={`${ev.kind}-${ev.id}-${i}`}
                  title={ev.label}
                  style={{
                    background: ev.kind === 'note' ? '#fef3c7' : '#dbeafe',
                    color: ev.kind === 'note' ? '#854d0e' : '#1e3a8a',
                    fontSize: 10,
                    padding: '1px 4px',
                    borderRadius: 3,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {ev.kind === 'note' ? '📝 ' : '📚 '}
                  {ev.label}
                </div>
              ))}
              {events.length > 3 && (
                <div style={{ fontSize: 9, color: '#64748b' }}>
                  +{events.length - 3} more
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---- Tabs ------------------------------------------------------------------
function Tabs({ active, onChange }) {
  const tabs = [
    { id: 'curriculum', label: 'Curriculum', icon: 'curriculum' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar' },
    { id: 'notes', label: 'Notes', icon: 'notes' },
    { id: 'syllabus', label: 'Syllabus', icon: 'syllabus' },
  ];
  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
        marginBottom: 12,
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          style={{
            padding: '6px 12px',
            border: '1px solid',
            borderColor: active === t.id ? '#0ea5e9' : '#cbd5e1',
            borderRadius: 999,
            background: active === t.id ? '#0ea5e9' : '#ffffff',
            color: active === t.id ? '#ffffff' : '#0f172a',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <AppIcon
            name={t.icon}
            tone={active === t.id ? 'white' : 'slate'}
            size={14}
          />
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ---- Curriculum item card --------------------------------------------------
function ItemCard({ item }) {
  const start = parseYmd(item.planned_date);
  const end = parseYmd(item.planned_end_date);
  let dateLabel = '';
  if (start && end && ymd(start) !== ymd(end)) {
    dateLabel = `${start.toLocaleDateString()} – ${end.toLocaleDateString()}`;
  } else if (start) {
    dateLabel = start.toLocaleDateString();
  }
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        padding: 10,
        marginBottom: 6,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        opacity: item.manually_marked_covered ? 0.6 : 1,
      }}
    >
      <div
        style={{
          fontSize: 18,
          width: 28,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {item.manually_marked_covered ? (
          <AppIcon name="correct" tone="emerald" size={18} alt="Covered" />
        ) : (
          <AppIcon
            name={subjectIconName(item.subject)}
            tone="sky"
            size={18}
            alt={item.subject || 'Item'}
          />
        )}
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
          {item.subject || 'General'}
          {item.category_name ? ` · ${item.category_name}` : ''}
          {dateLabel ? ` · ${dateLabel}` : ''}
        </div>
      </div>
      {item.manually_marked_covered && (
        <span
          style={{
            background: '#dcfce7',
            color: '#166534',
            fontSize: 11,
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: 999,
          }}
        >
          Covered
        </span>
      )}
    </div>
  );
}

// ---- Notes thread ----------------------------------------------------------
function NotesThread({ notes, currentUserId, onPost, posting }) {
  const [body, setBody] = useState('');
  const [noteDate, setNoteDate] = useState('');
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    setError(null);
    try {
      await onPost({ body: body.trim(), note_date: noteDate || null });
      setBody('');
      setNoteDate('');
    } catch (err) {
      setError(err?.message || 'Failed to post');
    }
  };

  return (
    <div>
      <form
        onSubmit={submit}
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          padding: 12,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#475569',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}
        >
          Send your instructor a note
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Question for your teacher, request for help, etc."
          rows={3}
          maxLength={4000}
          style={{
            width: '100%',
            padding: 8,
            border: '1px solid #cbd5e1',
            borderRadius: 6,
            fontSize: 13,
            fontFamily: 'inherit',
            resize: 'vertical',
          }}
        />
        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            marginTop: 6,
            flexWrap: 'wrap',
          }}
        >
          <label style={{ fontSize: 12, color: '#475569' }}>
            Pin to date (optional):{' '}
            <input
              type="date"
              value={noteDate}
              onChange={(e) => setNoteDate(e.target.value)}
              style={{
                padding: '4px 6px',
                border: '1px solid #cbd5e1',
                borderRadius: 6,
                fontSize: 12,
              }}
            />
          </label>
          <button
            type="submit"
            disabled={!body.trim() || posting}
            style={{
              padding: '6px 14px',
              border: 'none',
              borderRadius: 6,
              background: !body.trim() || posting ? '#94a3b8' : '#0ea5e9',
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 600,
              cursor: !body.trim() || posting ? 'default' : 'pointer',
            }}
          >
            {posting ? 'Sending…' : 'Send'}
          </button>
        </div>
        {error && (
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
            {error}
          </div>
        )}
      </form>

      {notes.length === 0 && (
        <div
          style={{
            background: '#ffffff',
            border: '1px dashed #cbd5e1',
            borderRadius: 12,
            padding: 24,
            textAlign: 'center',
            color: '#64748b',
            fontSize: 13,
          }}
        >
          No messages yet. Use the form above to ask your instructor a question.
        </div>
      )}
      {notes.map((n) => {
        const mine = n.author_id === currentUserId;
        const when = n.created_at
          ? new Date(n.created_at).toLocaleString()
          : '';
        const noteDay = n.note_date
          ? parseYmd(n.note_date)?.toLocaleDateString()
          : null;
        return (
          <div
            key={n.id}
            style={{
              background: mine ? '#e0f2fe' : '#ffffff',
              border: '1px solid',
              borderColor: mine ? '#7dd3fc' : '#e2e8f0',
              borderRadius: 10,
              padding: 10,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: '#475569',
                marginBottom: 4,
                display: 'flex',
                gap: 6,
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <strong>{mine ? 'You' : n.author_name || 'Instructor'}</strong>
              {n.recipient_user_id === null && (
                <span
                  style={{
                    background: '#dbeafe',
                    color: '#1e3a8a',
                    padding: '0 6px',
                    borderRadius: 4,
                    fontWeight: 600,
                  }}
                >
                  Class-wide
                </span>
              )}
              {noteDay && (
                <span
                  style={{
                    background: '#fef3c7',
                    color: '#854d0e',
                    padding: '0 6px',
                    borderRadius: 4,
                    fontWeight: 600,
                  }}
                >
                  📅 {noteDay}
                </span>
              )}
              <span style={{ marginLeft: 'auto', color: '#94a3b8' }}>
                {when}
              </span>
            </div>
            <div
              style={{
                fontSize: 13,
                color: '#0f172a',
                whiteSpace: 'pre-wrap',
              }}
            >
              {n.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---- Syllabus view ---------------------------------------------------------
function SyllabusView({ klass, items }) {
  // Group by subject; preserve order.
  const groups = useMemo(() => {
    const map = new Map();
    items.forEach((it) => {
      const k = it.subject || 'General';
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(it);
    });
    return Array.from(map.entries());
  }, [items]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 8,
        }}
        className="no-print"
      >
        <button
          type="button"
          onClick={handlePrint}
          style={{
            padding: '6px 12px',
            border: '1px solid #0ea5e9',
            borderRadius: 6,
            background: '#0ea5e9',
            color: '#ffffff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          🖨 Print / Save as PDF
        </button>
      </div>
      <div
        id="syllabus-print-area"
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          padding: 24,
          color: '#0f172a',
        }}
      >
        <div
          style={{
            marginBottom: 16,
            borderBottom: '2px solid #0f172a',
            paddingBottom: 12,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: '#64748b',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            Course Syllabus
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>
            {klass?.name || 'Class'}
          </div>
          {klass?.teacher_name && (
            <div style={{ fontSize: 13, color: '#475569', marginTop: 2 }}>
              Instructor: {klass.teacher_name}
              {klass.teacher_email ? ` (${klass.teacher_email})` : ''}
            </div>
          )}
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
            Generated {new Date().toLocaleDateString()}
          </div>
        </div>

        {groups.length === 0 && (
          <div style={{ color: '#64748b', fontSize: 13 }}>
            No curriculum has been published yet.
          </div>
        )}

        {groups.map(([subject, list]) => (
          <div key={subject} style={{ marginBottom: 18 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#0ea5e9',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: 4,
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <AppIcon
                name={subjectIconName(subject)}
                tone="sky"
                size={18}
              />
              {subject}
            </div>
            <ol style={{ margin: 0, paddingLeft: 20 }}>
              {list.map((it) => {
                const start = parseYmd(it.planned_date);
                const end = parseYmd(it.planned_end_date);
                let dateLabel = '';
                if (start && end && ymd(start) !== ymd(end)) {
                  dateLabel = `${start.toLocaleDateString()} – ${end.toLocaleDateString()}`;
                } else if (start) {
                  dateLabel = start.toLocaleDateString();
                }
                return (
                  <li key={it.id} style={{ marginBottom: 6, fontSize: 13 }}>
                    <strong>{it.title}</strong>
                    {it.category_name && (
                      <span style={{ color: '#475569' }}>
                        {' '}
                        — {it.category_name}
                      </span>
                    )}
                    {dateLabel && (
                      <span style={{ color: '#64748b' }}> ({dateLabel})</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #syllabus-print-area, #syllabus-print-area * { visibility: visible !important; }
          #syllabus-print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            border: none !important;
            box-shadow: none !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// ---- Main component --------------------------------------------------------
export default function StudentMyClassPanel({ currentUser }) {
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(null);
  const [tab, setTab] = useState('curriculum');
  const [items, setItems] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(ymd(today));

  const currentClass = useMemo(
    () => classes.find((c) => c.id === classId) || null,
    [classes, classId]
  );

  const userId = currentUser?.id || currentUser?.userId || null;

  const loadClasses = useCallback(async () => {
    setError(null);
    try {
      const data = await apiFetch('/api/student/classes');
      const list = Array.isArray(data?.classes) ? data.classes : [];
      setClasses(list);
      if (list.length > 0 && classId == null) setClassId(list[0].id);
    } catch (e) {
      console.warn('[my-class] load classes failed', e);
      setError(e?.message || 'Failed to load classes');
    }
  }, [classId]);

  const loadCurriculum = useCallback(async () => {
    if (!classId) return;
    setLoading(true);
    try {
      const data = await apiFetch(`/api/student/classes/${classId}/curriculum`);
      setItems(Array.isArray(data?.items) ? data.items : []);
    } catch (e) {
      console.warn('[my-class] load curriculum failed', e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [classId]);

  const loadNotes = useCallback(async () => {
    if (!classId) return;
    try {
      const data = await apiFetch(`/api/student/classes/${classId}/notes`);
      setNotes(Array.isArray(data?.notes) ? data.notes : []);
    } catch (e) {
      console.warn('[my-class] load notes failed', e);
      setNotes([]);
    }
  }, [classId]);

  useEffect(() => {
    loadClasses();
  }, [loadClasses]);

  useEffect(() => {
    loadCurriculum();
    loadNotes();
  }, [loadCurriculum, loadNotes]);

  const postNote = async ({ body, note_date }) => {
    if (!classId) return;
    setPosting(true);
    try {
      await apiFetch(`/api/student/classes/${classId}/notes`, {
        method: 'POST',
        body: JSON.stringify({ body, note_date }),
      });
      await loadNotes();
    } finally {
      setPosting(false);
    }
  };

  // Build calendar event index keyed by 'YYYY-MM-DD'.
  const eventsByDay = useMemo(() => {
    const map = {};
    const push = (key, ev) => {
      if (!key) return;
      if (!map[key]) map[key] = [];
      map[key].push(ev);
    };
    items.forEach((it) => {
      const start = parseYmd(it.planned_date);
      const end = parseYmd(it.planned_end_date) || start;
      if (!start) return;
      const cur = new Date(start);
      const last = end || start;
      while (cur <= last) {
        push(ymd(cur), {
          id: it.id,
          kind: 'item',
          label: it.title,
        });
        cur.setDate(cur.getDate() + 1);
      }
    });
    notes.forEach((n) => {
      if (!n.note_date) return;
      const k = String(n.note_date).slice(0, 10);
      push(k, {
        id: n.id,
        kind: 'note',
        label: n.body.slice(0, 40),
      });
    });
    return map;
  }, [items, notes]);

  const dayDetails = useMemo(() => {
    if (!selectedDay) return { items: [], notes: [] };
    const dayItems = items.filter((it) => {
      const start = parseYmd(it.planned_date);
      const end = parseYmd(it.planned_end_date) || start;
      if (!start) return false;
      const sk = ymd(start);
      const ek = ymd(end);
      return selectedDay >= sk && selectedDay <= ek;
    });
    const dayNotes = notes.filter(
      (n) => n.note_date && String(n.note_date).slice(0, 10) === selectedDay
    );
    return { items: dayItems, notes: dayNotes };
  }, [selectedDay, items, notes]);

  const goPrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };
  const goNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  if (classes.length === 0) {
    return (
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
        <div style={{ fontSize: 32, marginBottom: 8 }}>🎓</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>
          You're not enrolled in any class yet.
        </div>
        <div style={{ fontSize: 12, marginTop: 4 }}>
          Ask your instructor for a class join code, or wait for them to enroll
          you.
        </div>
        {error && (
          <div
            style={{
              marginTop: 12,
              padding: 8,
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
      </div>
    );
  }

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
        <select
          value={classId || ''}
          onChange={(e) => setClassId(Number(e.target.value))}
          style={{
            padding: '6px 10px',
            border: '1px solid #cbd5e1',
            borderRadius: 8,
            fontSize: 13,
            background: '#ffffff',
          }}
        >
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
              {c.teacher_name ? ` · ${c.teacher_name}` : ''}
            </option>
          ))}
        </select>
      </div>

      <Tabs active={tab} onChange={setTab} />

      {tab === 'curriculum' && (
        <div>
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
              No curriculum has been published yet.
            </div>
          )}
          {items.map((it) => (
            <ItemCard key={it.id} item={it} />
          ))}
        </div>
      )}

      {tab === 'calendar' && (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <button
              type="button"
              onClick={goPrevMonth}
              style={{
                padding: '4px 10px',
                border: '1px solid #cbd5e1',
                borderRadius: 6,
                background: '#ffffff',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              ◀
            </button>
            <div style={{ fontSize: 16, fontWeight: 700 }}>
              {MONTHS[month]} {year}
            </div>
            <button
              type="button"
              onClick={goNextMonth}
              style={{
                padding: '4px 10px',
                border: '1px solid #cbd5e1',
                borderRadius: 6,
                background: '#ffffff',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              ▶
            </button>
          </div>
          <CalendarGrid
            year={year}
            month={month}
            eventsByDay={eventsByDay}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
          <div
            style={{
              marginTop: 12,
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: 12,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#475569',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              {selectedDay
                ? `Details for ${parseYmd(selectedDay)?.toLocaleDateString()}`
                : 'Pick a day'}
            </div>
            {dayDetails.items.length === 0 && dayDetails.notes.length === 0 && (
              <div style={{ fontSize: 12, color: '#64748b' }}>
                Nothing scheduled or noted on this day.
              </div>
            )}
            {dayDetails.items.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: '#64748b',
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  📚 Curriculum
                </div>
                {dayDetails.items.map((it) => (
                  <ItemCard key={it.id} item={it} />
                ))}
              </div>
            )}
            {dayDetails.notes.length > 0 && (
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#64748b',
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  📝 Notes
                </div>
                {dayDetails.notes.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      background: '#fef3c7',
                      border: '1px solid #fde68a',
                      borderRadius: 8,
                      padding: 8,
                      marginBottom: 4,
                      fontSize: 12,
                    }}
                  >
                    <div style={{ fontWeight: 600, color: '#854d0e' }}>
                      {n.author_name ||
                        (n.author_role === 'instructor'
                          ? 'Instructor'
                          : 'Student')}
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap', color: '#0f172a' }}>
                      {n.body}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'notes' && (
        <NotesThread
          notes={notes}
          currentUserId={userId}
          onPost={postNote}
          posting={posting}
        />
      )}

      {tab === 'syllabus' && (
        <SyllabusView klass={currentClass} items={items} />
      )}
    </div>
  );
}
