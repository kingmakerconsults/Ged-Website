// InstructorClassView: per-class management UI for instructors.
// Two tabs: Roster (add/remove org students) and Curriculum (CRUD ordered
// items + one-click "Launch class session").
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getApiBaseUrl } from '../utils/apiBase.js';
import QuizPicker from '../../components/collab/QuizPicker.jsx';

function getToken() {
  return (
    localStorage.getItem('token') || localStorage.getItem('appToken') || ''
  );
}

function authHeaders() {
  return { Authorization: `Bearer ${getToken()}` };
}

function jsonHeaders() {
  return { 'Content-Type': 'application/json', ...authHeaders() };
}

export default function InstructorClassView() {
  const { id } = useParams();
  const apiBase = useMemo(() => getApiBaseUrl(), []);
  const navigate = useNavigate();
  const [tab, setTab] = useState('curriculum');
  const [classInfo, setClassInfo] = useState(null);
  const [members, setMembers] = useState([]);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [memRes, curRes] = await Promise.all([
        fetch(`${apiBase}/api/classes/${id}/members`, {
          headers: authHeaders(),
        }),
        fetch(`${apiBase}/api/classes/${id}/curriculum`, {
          headers: authHeaders(),
        }),
      ]);
      const mem = memRes.ok ? await memRes.json() : { members: [] };
      const cur = curRes.ok ? await curRes.json() : { items: [] };
      setMembers(mem.members || []);
      setItems(cur.items || []);
      setClassInfo({
        id: cur.classId,
        name: cur.className,
        joinCode: cur.joinCode,
      });
      setError(null);
    } catch (e) {
      setError('Failed to load class data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-2">
        <Link to="/instructor" className="text-sm text-purple-700 underline">
          ← Back to classes
        </Link>
      </div>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-bold">
          {classInfo?.name || `Class #${id}`}
        </h2>
        {classInfo?.joinCode && (
          <div className="text-sm text-gray-600">
            Join code:{' '}
            <span className="font-mono font-semibold">
              {classInfo.joinCode}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-1 border-b mb-4">
        {['curriculum', 'roster'].map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
              tab === k
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            {k === 'curriculum' ? 'Curriculum' : 'Roster'}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-3 p-2 border border-red-300 bg-red-50 text-red-800 rounded text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div>Loading…</div>
      ) : tab === 'curriculum' ? (
        <CurriculumTab
          classId={id}
          items={items}
          onChange={loadAll}
          navigate={navigate}
          apiBase={apiBase}
        />
      ) : (
        <RosterTab
          classId={id}
          members={members}
          onChange={loadAll}
          apiBase={apiBase}
        />
      )}
    </div>
  );
}

function CurriculumTab({ classId, items, onChange, navigate, apiBase }) {
  const [showAdd, setShowAdd] = useState(false);
  const [pick, setPick] = useState({});
  const [plannedDate, setPlannedDate] = useState('');
  const [busyId, setBusyId] = useState(null);

  const canAdd = pick?.subject && pick?.quizId;

  const addItem = async () => {
    if (!canAdd) return;
    const title = pick.quizTitle || 'Untitled';
    const res = await fetch(`${apiBase}/api/classes/${classId}/curriculum`, {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({
        subject: pick.subject,
        categoryName: pick.categoryName,
        topicId: pick.topicTitle,
        quizId: pick.quizId,
        title,
        plannedDate: plannedDate || null,
      }),
    });
    if (res.ok) {
      setPick({});
      setPlannedDate('');
      setShowAdd(false);
      onChange();
    }
  };

  const move = async (itemId, dir) => {
    const idx = items.findIndex((it) => it.id === itemId);
    if (idx < 0) return;
    const swap = idx + dir;
    if (swap < 0 || swap >= items.length) return;
    const orderedIds = items.map((it) => it.id);
    [orderedIds[idx], orderedIds[swap]] = [orderedIds[swap], orderedIds[idx]];
    setBusyId(itemId);
    await fetch(`${apiBase}/api/classes/${classId}/curriculum/reorder`, {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ orderedIds }),
    });
    setBusyId(null);
    onChange();
  };

  const remove = async (itemId) => {
    if (!window.confirm('Remove this item from the curriculum?')) return;
    await fetch(`${apiBase}/api/classes/${classId}/curriculum/${itemId}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    onChange();
  };

  const toggleCovered = async (itemId, covered) => {
    await fetch(
      `${apiBase}/api/classes/${classId}/curriculum/${itemId}/cover`,
      {
        method: 'POST',
        headers: jsonHeaders(),
        body: JSON.stringify({ covered }),
      }
    );
    onChange();
  };

  const launch = async (item) => {
    setBusyId(item.id);
    try {
      const res = await fetch(`${apiBase}/api/collab/sessions`, {
        method: 'POST',
        headers: jsonHeaders(),
        body: JSON.stringify({
          sessionType: 'instructor_led',
          classId: Number(classId),
          curriculumItemId: item.id,
        }),
      });
      const data = await res.json();
      if (res.ok && data?.roomCode) {
        navigate(`/collab/${data.roomCode}`);
      } else {
        alert(data?.error || 'Failed to launch session');
      }
    } finally {
      setBusyId(null);
    }
  };

  const coveredCount = items.filter(
    (it) => it.coverage || it.manuallyMarkedCovered
  ).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-700">
          {items.length === 0
            ? 'Empty curriculum'
            : `${coveredCount} of ${items.length} covered`}
        </div>
        <button
          onClick={() => setShowAdd((v) => !v)}
          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded"
        >
          {showAdd ? 'Cancel' : '+ Add item'}
        </button>
      </div>

      {showAdd && (
        <div className="mb-4 p-4 border rounded bg-white shadow-sm space-y-3">
          <QuizPicker value={pick} onChange={setPick} />
          <div>
            <label className="block text-sm font-medium mb-1">
              Planned date (optional)
            </label>
            <input
              type="date"
              value={plannedDate}
              onChange={(e) => setPlannedDate(e.target.value)}
              className="px-3 py-2 border rounded"
            />
          </div>
          <button
            onClick={addItem}
            disabled={!canAdd}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded font-semibold"
          >
            Add to curriculum
          </button>
        </div>
      )}

      <ol className="space-y-2">
        {items.map((it, idx) => {
          const covered = !!(it.coverage || it.manuallyMarkedCovered);
          const live = !!it.liveRoomCode;
          return (
            <li
              key={it.id}
              className="p-3 border rounded bg-white flex items-start gap-3"
            >
              <div className="flex flex-col items-center pt-1">
                <button
                  onClick={() => move(it.id, -1)}
                  disabled={idx === 0 || busyId === it.id}
                  className="text-gray-500 hover:text-gray-800 disabled:opacity-30 text-xs"
                  title="Move up"
                >
                  ▲
                </button>
                <span className="text-xs text-gray-400">{idx + 1}</span>
                <button
                  onClick={() => move(it.id, 1)}
                  disabled={idx === items.length - 1 || busyId === it.id}
                  className="text-gray-500 hover:text-gray-800 disabled:opacity-30 text-xs"
                  title="Move down"
                >
                  ▼
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {it.subject && (
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {it.subject}
                    </span>
                  )}
                  {it.categoryName && (
                    <span className="text-xs text-gray-600">
                      {it.categoryName}
                    </span>
                  )}
                  {covered && (
                    <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800">
                      ✓ Covered
                      {it.coverage?.source === 'manual' ? ' (manual)' : ''}
                    </span>
                  )}
                  {live && (
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 animate-pulse">
                      ● Live now
                    </span>
                  )}
                  {it.plannedDate && (
                    <span className="text-xs text-gray-500">
                      {new Date(it.plannedDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className="font-semibold mt-0.5">{it.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Quiz: {it.quizId || '—'}
                </div>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <button
                  onClick={() => launch(it)}
                  disabled={busyId === it.id || !it.quizId}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-semibold rounded"
                >
                  Launch class session
                </button>
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleCovered(it.id, !covered)}
                    className="px-2 py-1 border rounded text-xs hover:bg-gray-50"
                    title="Toggle covered"
                  >
                    {covered ? 'Mark not covered' : 'Mark covered'}
                  </button>
                  <button
                    onClick={() => remove(it.id)}
                    className="px-2 py-1 border border-red-300 text-red-700 rounded text-xs hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function RosterTab({ classId, members, onChange, apiBase }) {
  const [showAdd, setShowAdd] = useState(false);
  const [eligible, setEligible] = useState([]);
  const [loadingEligible, setLoadingEligible] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch] = useState('');

  const loadEligible = async () => {
    setLoadingEligible(true);
    try {
      const res = await fetch(
        `${apiBase}/api/classes/${classId}/eligible-students`,
        { headers: authHeaders() }
      );
      const data = res.ok ? await res.json() : { students: [] };
      setEligible(data.students || []);
    } finally {
      setLoadingEligible(false);
    }
  };

  useEffect(() => {
    if (showAdd) {
      loadEligible();
      setSelected(new Set());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAdd]);

  const toggle = (uid) => {
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(uid)) n.delete(uid);
      else n.add(uid);
      return n;
    });
  };

  const addSelected = async () => {
    if (selected.size === 0) return;
    await fetch(`${apiBase}/api/classes/${classId}/members`, {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ userIds: Array.from(selected) }),
    });
    setShowAdd(false);
    onChange();
  };

  const remove = async (uid) => {
    if (!window.confirm('Remove this student from the class?')) return;
    await fetch(`${apiBase}/api/classes/${classId}/members/${uid}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    onChange();
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return eligible;
    return eligible.filter(
      (s) =>
        (s.name || '').toLowerCase().includes(q) ||
        (s.email || '').toLowerCase().includes(q)
    );
  }, [eligible, search]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-700">
          {members.length} student{members.length === 1 ? '' : 's'}
        </div>
        <button
          onClick={() => setShowAdd((v) => !v)}
          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded"
        >
          {showAdd ? 'Close' : '+ Add students from organization'}
        </button>
      </div>

      {showAdd && (
        <div className="mb-4 p-4 border rounded bg-white shadow-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full px-3 py-2 border rounded mb-3"
          />
          {loadingEligible ? (
            <div>Loading students…</div>
          ) : filtered.length === 0 ? (
            <div className="text-sm text-gray-600">
              No eligible students found.
            </div>
          ) : (
            <ul className="max-h-72 overflow-y-auto divide-y border rounded">
              {filtered.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggle(s.id)}
                >
                  <input
                    type="checkbox"
                    checked={selected.has(s.id)}
                    onChange={() => toggle(s.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {s.name || s.email}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {s.email}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => setShowAdd(false)}
              className="px-3 py-1.5 border rounded text-sm"
            >
              Cancel
            </button>
            <button
              onClick={addSelected}
              disabled={selected.size === 0}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm font-semibold rounded"
            >
              Add {selected.size > 0 ? `(${selected.size})` : ''}
            </button>
          </div>
        </div>
      )}

      <ul className="space-y-1">
        {members.map((m) => (
          <li
            key={m.id}
            className="flex items-center justify-between p-2 border rounded bg-white"
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">
                {m.name || m.email}
              </div>
              <div className="text-xs text-gray-500 truncate">{m.email}</div>
            </div>
            <button
              onClick={() => remove(m.id)}
              className="px-2 py-1 border border-red-300 text-red-700 rounded text-xs hover:bg-red-50"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
