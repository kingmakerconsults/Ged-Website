import React, { useCallback, useEffect, useState } from 'react';
import AppIcon from '../icons/AppIcon.jsx';

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

export default function InstructorClassesPanel({ students = [] }) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [newClassName, setNewClassName] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  // Per-class member management state
  const [expandedClassId, setExpandedClassId] = useState(null);
  const [members, setMembers] = useState({}); // { [classId]: studentId[] }
  const [membersLoading, setMembersLoading] = useState(false);
  const [memberError, setMemberError] = useState(null);
  const [addStudentId, setAddStudentId] = useState('');

  // Per-class notes state
  const [notesOpenClassId, setNotesOpenClassId] = useState(null);

  const loadClasses = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await apiFetch('/api/instructor/classes');
      const list = Array.isArray(data?.classes) ? data.classes : [];
      setClasses(list);
    } catch (e) {
      console.warn('[classes] load failed', e);
      setLoadError(e?.message || 'Failed to load classes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadClasses();
  }, [loadClasses]);

  const loadMembers = useCallback(async (classId) => {
    setMembersLoading(true);
    setMemberError(null);
    try {
      const data = await apiFetch(`/api/instructor/classes/${classId}/roster`);
      const list = Array.isArray(data?.members) ? data.members : [];
      setMembers((prev) => ({ ...prev, [classId]: list }));
    } catch (e) {
      console.warn('[classes] load members failed', e);
      setMemberError(e?.message || 'Failed to load members');
    } finally {
      setMembersLoading(false);
    }
  }, []);

  const expandClass = (classId) => {
    if (expandedClassId === classId) {
      setExpandedClassId(null);
      return;
    }
    setExpandedClassId(classId);
    setAddStudentId('');
    setMemberError(null);
    if (!members[classId]) {
      loadMembers(classId);
    }
  };

  const createClass = async (e) => {
    e.preventDefault();
    const name = newClassName.trim();
    if (!name) return;
    setCreating(true);
    setCreateError(null);
    try {
      await apiFetch('/api/instructor/classes', {
        method: 'POST',
        body: JSON.stringify({ name }),
      });
      setNewClassName('');
      await loadClasses();
    } catch (err) {
      console.warn('[classes] create failed', err);
      setCreateError(err?.message || 'Failed to create class');
    } finally {
      setCreating(false);
    }
  };

  const addMember = async (classId) => {
    const sid = Number(addStudentId);
    if (!sid) return;
    setMemberError(null);
    try {
      await apiFetch(`/api/instructor/classes/${classId}/roster`, {
        method: 'POST',
        body: JSON.stringify({ userIds: [sid] }),
      });
      setAddStudentId('');
      await Promise.all([loadMembers(classId), loadClasses()]);
    } catch (e) {
      console.warn('[classes] add member failed', e);
      setMemberError(e?.message || 'Failed to add student');
    }
  };

  const removeMember = async (classId, studentId, studentName) => {
    if (
      !window.confirm(`Remove ${studentName || 'this student'} from the class?`)
    ) {
      return;
    }
    setMemberError(null);
    try {
      await apiFetch(`/api/instructor/classes/${classId}/roster/${studentId}`, {
        method: 'DELETE',
      });
      await Promise.all([loadMembers(classId), loadClasses()]);
    } catch (e) {
      console.warn('[classes] remove member failed', e);
      setMemberError(e?.message || 'Failed to remove student');
    }
  };

  const deleteClass = async (cls) => {
    if (
      !window.confirm(
        `Delete class "${cls.name}"? This removes all enrollments and curriculum items for this class. This cannot be undone.`
      )
    ) {
      return;
    }
    setLoadError(null);
    try {
      await apiFetch(`/api/instructor/classes/${cls.id}`, {
        method: 'DELETE',
      });
      if (expandedClassId === cls.id) setExpandedClassId(null);
      setMembers((prev) => {
        const next = { ...prev };
        delete next[cls.id];
        return next;
      });
      await loadClasses();
    } catch (e) {
      console.warn('[classes] delete class failed', e);
      setLoadError(e?.message || 'Failed to delete class');
    }
  };

  const studentOptions = (classId) => {
    const current = new Set((members[classId] || []).map((m) => m.id));
    return students.filter((s) => !current.has(s.id));
  };

  return (
    <div>
      <form
        onSubmit={createClass}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <input
          type="text"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          placeholder="New class name (e.g. Period 3 Algebra)"
          style={{
            flex: '1 1 260px',
            padding: '8px 12px',
            border: '1px solid #cbd5e1',
            borderRadius: 8,
            fontSize: 14,
          }}
        />
        <button
          type="submit"
          disabled={creating || !newClassName.trim()}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: 8,
            background:
              creating || !newClassName.trim() ? '#94a3b8' : '#0ea5e9',
            color: '#ffffff',
            fontWeight: 600,
            cursor: creating || !newClassName.trim() ? 'default' : 'pointer',
            fontSize: 14,
          }}
        >
          {creating ? 'Creating...' : '+ Create class'}
        </button>
        {createError && (
          <div
            style={{
              width: '100%',
              padding: 8,
              background: '#fef2f2',
              color: '#b91c1c',
              border: '1px solid #fecaca',
              borderRadius: 6,
              fontSize: 13,
            }}
          >
            {createError}
          </div>
        )}
      </form>

      {loadError && (
        <div
          style={{
            padding: 10,
            background: '#fef2f2',
            color: '#b91c1c',
            border: '1px solid #fecaca',
            borderRadius: 8,
            fontSize: 13,
            marginBottom: 12,
          }}
        >
          {loadError}
        </div>
      )}

      {loading && classes.length === 0 ? (
        <div style={{ color: '#64748b', fontSize: 14 }}>Loading classes...</div>
      ) : classes.length === 0 ? (
        <div
          style={{
            background: '#ffffff',
            border: '1px dashed #cbd5e1',
            borderRadius: 12,
            padding: 32,
            textAlign: 'center',
            color: '#64748b',
            fontSize: 14,
          }}
        >
          No classes yet. Create one above to get started.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {classes.map((c) => {
            const isOpen = expandedClassId === c.id;
            const classMembers = members[c.id] || [];
            const available = studentOptions(c.id);
            return (
              <div
                key={c.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  padding: 12,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>
                      {c.name}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>
                      {c.member_count} student
                      {c.member_count === 1 ? '' : 's'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      type="button"
                      onClick={() => expandClass(c.id)}
                      style={{
                        padding: '6px 12px',
                        border: '1px solid #cbd5e1',
                        borderRadius: 8,
                        background: '#f8fafc',
                        color: '#0f172a',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {isOpen ? 'Close' : 'Manage students'}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNotesOpenClassId((cur) =>
                          cur === c.id ? null : c.id
                        )
                      }
                      style={{
                        padding: '6px 12px',
                        border: '1px solid #cbd5e1',
                        borderRadius: 8,
                        background:
                          notesOpenClassId === c.id ? '#e0f2fe' : '#f8fafc',
                        color: '#0f172a',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      💬 {notesOpenClassId === c.id ? 'Hide notes' : 'Notes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteClass(c)}
                      style={{
                        padding: '6px 12px',
                        border: '1px solid #fecaca',
                        borderRadius: 8,
                        background: '#fff1f2',
                        color: '#b91c1c',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Delete class
                    </button>
                  </div>
                </div>
                {isOpen && (
                  <div style={{ marginTop: 12 }}>
                    {memberError && (
                      <div
                        style={{
                          padding: 8,
                          background: '#fef2f2',
                          color: '#b91c1c',
                          border: '1px solid #fecaca',
                          borderRadius: 6,
                          fontSize: 12,
                          marginBottom: 8,
                        }}
                      >
                        {memberError}
                      </div>
                    )}
                    {membersLoading && !classMembers.length ? (
                      <div style={{ fontSize: 13, color: '#64748b' }}>
                        Loading students...
                      </div>
                    ) : (
                      <>
                        {classMembers.length === 0 ? (
                          <div
                            style={{
                              fontSize: 13,
                              color: '#64748b',
                              marginBottom: 8,
                            }}
                          >
                            No students enrolled in this class yet.
                          </div>
                        ) : (
                          <ul
                            style={{
                              listStyle: 'none',
                              margin: 0,
                              padding: 0,
                              marginBottom: 8,
                            }}
                          >
                            {classMembers.map((m) => (
                              <li
                                key={m.id}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '6px 8px',
                                  borderBottom: '1px solid #f1f5f9',
                                  fontSize: 13,
                                }}
                              >
                                <span>
                                  {m.name || m.email || `Student #${m.id}`}
                                  {m.email && m.name ? (
                                    <span
                                      style={{
                                        marginLeft: 8,
                                        color: '#64748b',
                                      }}
                                    >
                                      {m.email}
                                    </span>
                                  ) : null}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeMember(c.id, m.id, m.name || m.email)
                                  }
                                  style={{
                                    padding: '4px 10px',
                                    border: '1px solid #fecaca',
                                    borderRadius: 6,
                                    background: '#fff1f2',
                                    color: '#b91c1c',
                                    fontSize: 12,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                  }}
                                >
                                  Remove
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                        <div
                          style={{
                            display: 'flex',
                            gap: 6,
                            alignItems: 'center',
                            flexWrap: 'wrap',
                          }}
                        >
                          <select
                            value={addStudentId}
                            onChange={(e) => setAddStudentId(e.target.value)}
                            style={{
                              padding: '6px 10px',
                              border: '1px solid #cbd5e1',
                              borderRadius: 6,
                              fontSize: 13,
                              minWidth: 220,
                            }}
                          >
                            <option value="">Select student to add...</option>
                            {available.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name || s.email || `Student #${s.id}`}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => addMember(c.id)}
                            disabled={!addStudentId}
                            style={{
                              padding: '6px 12px',
                              border: 'none',
                              borderRadius: 6,
                              background: addStudentId ? '#0ea5e9' : '#94a3b8',
                              color: '#ffffff',
                              fontWeight: 600,
                              cursor: addStudentId ? 'pointer' : 'default',
                              fontSize: 13,
                            }}
                          >
                            Add student
                          </button>
                        </div>
                        {available.length === 0 && students.length > 0 && (
                          <div
                            style={{
                              marginTop: 6,
                              fontSize: 12,
                              color: '#64748b',
                            }}
                          >
                            All available students are already enrolled.
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
                {notesOpenClassId === c.id && (
                  <ClassNotesSection classId={c.id} members={classMembers} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ClassNotesSection({ classId, members }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [noteDate, setNoteDate] = useState('');
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch(`/api/instructor/classes/${classId}/notes`);
      setNotes(Array.isArray(data?.notes) ? data.notes : []);
    } catch (e) {
      setError(e?.message || 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, [classId]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    setPosting(true);
    setError(null);
    try {
      await apiFetch(`/api/instructor/classes/${classId}/notes`, {
        method: 'POST',
        body: JSON.stringify({
          body: body.trim(),
          recipient_user_id: recipientId ? Number(recipientId) : null,
          note_date: noteDate || null,
        }),
      });
      setBody('');
      setNoteDate('');
      setRecipientId('');
      await load();
    } catch (err) {
      setError(err?.message || 'Failed to post note');
    } finally {
      setPosting(false);
    }
  };

  const remove = async (noteId) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await apiFetch(`/api/instructor/classes/${classId}/notes/${noteId}`, {
        method: 'DELETE',
      });
      await load();
    } catch (err) {
      setError(err?.message || 'Failed to delete note');
    }
  };

  return (
    <div
      style={{
        marginTop: 12,
        background: '#f8fafc',
        border: '1px solid #cbd5e1',
        borderRadius: 8,
        padding: 12,
      }}
    >
      <form onSubmit={submit} style={{ marginBottom: 12 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#475569',
            textTransform: 'uppercase',
            marginBottom: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <AppIcon name="writing" tone="slate" size={14} />
          Post a class note or DM a student
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Announcement, reply, reminder…"
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
          <select
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            style={{
              padding: '4px 8px',
              border: '1px solid #cbd5e1',
              borderRadius: 6,
              fontSize: 12,
            }}
          >
            <option value="">📢 Whole class</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                ✉️ {m.name || m.email || `Student #${m.id}`}
              </option>
            ))}
          </select>
          <label style={{ fontSize: 12, color: '#475569' }}>
            Pin to date:{' '}
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

      {loading && (
        <div style={{ fontSize: 12, color: '#64748b' }}>Loading notes…</div>
      )}
      {!loading && notes.length === 0 && (
        <div style={{ fontSize: 12, color: '#64748b' }}>
          No notes yet for this class.
        </div>
      )}
      {notes.map((n) => {
        const when = n.created_at
          ? new Date(n.created_at).toLocaleString()
          : '';
        const noteDay = n.note_date
          ? new Date(n.note_date).toLocaleDateString()
          : null;
        return (
          <div
            key={n.id}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: 8,
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
              <strong>{n.author_name || n.author_role}</strong>
              {n.recipient_user_id === null ? (
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
              ) : (
                <span
                  style={{
                    background: '#fef3c7',
                    color: '#854d0e',
                    padding: '0 6px',
                    borderRadius: 4,
                    fontWeight: 600,
                  }}
                >
                  ✉️ to {n.recipient_name || `#${n.recipient_user_id}`}
                </span>
              )}
              {noteDay && (
                <span
                  style={{
                    background: '#fef9c3',
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
              <button
                type="button"
                onClick={() => remove(n.id)}
                title="Delete this note"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#dc2626',
                  cursor: 'pointer',
                  fontSize: 11,
                  padding: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                <AppIcon name="delete" tone="rose" size={12} alt="Delete" />
              </button>
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
