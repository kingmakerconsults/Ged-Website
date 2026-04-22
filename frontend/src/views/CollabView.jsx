// frontend/src/views/CollabView.jsx
// "Play Together" hub: list active sessions, create, join by code, find partner.
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getApiBaseUrl } from '../utils/apiBase.js';
import { PREMADE_QUIZ_CATALOG } from '../../utils/quizProgress.js';
import CollabSessionCard from '../../components/collab/CollabSessionCard.jsx';
import useCollabSocket from '../../components/collab/useCollabSocket.js';

const SESSION_TYPES = [
  { value: 'instructor_led', label: 'Instructor-Led (class/group)' },
  { value: 'peer', label: 'Peer Practice (2 students)' },
  { value: 'essay', label: 'Collaborative Essay' },
];

function getToken() {
  return (
    localStorage.getItem('token') || localStorage.getItem('appToken') || ''
  );
}

function getCurrentUser() {
  try {
    const raw = localStorage.getItem('appUser');
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function isInstructorRole(role) {
  return [
    'instructor',
    'teacher',
    'org_admin',
    'orgAdmin',
    'super_admin',
    'superAdmin',
    'admin',
  ].includes(String(role || '').toLowerCase());
}

export default function CollabView() {
  const navigate = useNavigate();
  const location = useLocation();
  const apiBase = useMemo(() => getApiBaseUrl(), []);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState(null);

  const user = getCurrentUser();
  const userRole = user?.role || 'student';
  const canCreate = true; // Allow students to create peer/essay; instructor-led requires role.

  // Socket only for matchmaking
  const collab = useCollabSocket({ autoJoin: false });
  const [matchmakingState, setMatchmakingState] = useState('idle'); // idle | searching | matched

  useEffect(() => {
    if (collab.lastEvent?.type === 'matchmaking:matched') {
      const code = collab.lastEvent.data?.roomCode;
      if (code) {
        setMatchmakingState('matched');
        navigate(`/collab/${code}`);
      }
    }
  }, [collab.lastEvent, navigate]);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/collab/sessions/active`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSessions(data.sessions || []);
      }
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 15000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Create form state
  const [form, setForm] = useState(() => {
    const prefillSubject = location.state?.prefillSubject || '';
    const prefillQuiz = location.state?.prefillQuiz || '';
    return {
      sessionType: 'instructor_led',
      subject: prefillSubject,
      quizId: prefillQuiz,
      title: '',
      essayPrompt:
        'Discuss whether the benefits of [topic] outweigh the risks. Use evidence to support your view.',
    };
  });

  const quizOptions = useMemo(() => {
    const out = [];
    const catalog = PREMADE_QUIZ_CATALOG || {};
    for (const subjectKey of Object.keys(catalog)) {
      const subj = catalog[subjectKey];
      if (!subj || typeof subj !== 'object') continue;
      for (const qid of Object.keys(subj)) {
        const q = subj[qid];
        if (!q || typeof q !== 'object') continue;
        if (
          form.subject &&
          !subjectKey.toLowerCase().includes(form.subject.toLowerCase())
        )
          continue;
        out.push({
          id: qid,
          subject: subjectKey,
          title: q.title || qid,
        });
      }
    }
    return out.slice(0, 200);
  }, [form.subject]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const body = {
        sessionType: form.sessionType,
        subject: form.subject || null,
        title: form.title || null,
      };
      if (form.sessionType !== 'essay') {
        if (!form.quizId) {
          setError('Please pick a quiz.');
          return;
        }
        body.quizId = form.quizId;
      } else {
        body.config = { essayPrompt: form.essayPrompt };
      }
      const res = await fetch(`${apiBase}/api/collab/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Create failed');
        return;
      }
      navigate(`/collab/${data.roomCode}`);
    } catch (err) {
      setError(err?.message || 'Network error');
    }
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (!joinCode.trim()) return;
    navigate(`/collab/${joinCode.trim().toUpperCase()}`);
  };

  const findPartner = () => {
    setMatchmakingState('searching');
    collab.emit(
      'matchmaking:queue',
      { subject: form.subject || null },
      (resp) => {
        if (resp?.error) {
          setError(resp.error);
          setMatchmakingState('idle');
        } else if (resp?.matched && resp.roomCode) {
          navigate(`/collab/${resp.roomCode}`);
        }
      }
    );
  };

  const cancelMatchmaking = () => {
    collab.emit('matchmaking:cancel', {}, () => {});
    setMatchmakingState('idle');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Play Together
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Live collaboration: practice with a classmate, take a quiz with your
          instructor, or write an essay together.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm">
          {error}
        </div>
      )}

      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Active Sessions
          </h3>
          <button
            onClick={fetchSessions}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Refresh
          </button>
        </div>
        {loading ? (
          <div className="text-sm text-slate-500">Loading…</div>
        ) : sessions.length === 0 ? (
          <div className="text-sm text-slate-500 italic">
            No active sessions. Start one below.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sessions.map((s) => (
              <CollabSessionCard key={s.sessionId} session={s} />
            ))}
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
          <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">
            Join with Code
          </h3>
          <form onSubmit={handleJoin} className="flex gap-2">
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="GEDXXX"
              maxLength={12}
              className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded font-mono uppercase bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Join
            </button>
          </form>
        </div>

        <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
          <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">
            Find a Partner
          </h3>
          {matchmakingState === 'searching' ? (
            <div className="space-y-3">
              <div className="text-sm text-slate-600 dark:text-slate-300 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                Searching for a partner in your organization…
              </div>
              <button
                onClick={cancelMatchmaking}
                className="text-sm text-red-600 hover:underline"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <select
                value={form.subject}
                onChange={(e) =>
                  setForm((f) => ({ ...f, subject: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                <option value="">Any Subject</option>
                <option value="math">Math</option>
                <option value="rla">RLA</option>
                <option value="science">Science</option>
                <option value="social">Social Studies</option>
              </select>
              <button
                onClick={findPartner}
                disabled={!collab.connected}
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:opacity-50"
              >
                {collab.connected ? 'Find Partner' : 'Connecting…'}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 dark:border-slate-700 p-5 bg-white dark:bg-slate-800">
        <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">
          Create a Session
        </h3>
        <form onSubmit={handleCreate} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
              Type
            </label>
            <select
              value={form.sessionType}
              onChange={(e) =>
                setForm((f) => ({ ...f, sessionType: e.target.value }))
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              {SESSION_TYPES.map((t) => (
                <option
                  key={t.value}
                  value={t.value}
                  disabled={
                    t.value === 'instructor_led' && !isInstructorRole(userRole)
                  }
                >
                  {t.label}
                  {t.value === 'instructor_led' && !isInstructorRole(userRole)
                    ? ' (instructor only)'
                    : ''}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
              Title (optional)
            </label>
            <input
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="Period 3 — Algebra Practice"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          {form.sessionType !== 'essay' ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                  Subject (filter)
                </label>
                <select
                  value={form.subject}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      subject: e.target.value,
                      quizId: '',
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value="">All</option>
                  <option value="math">Math</option>
                  <option value="rla">RLA</option>
                  <option value="science">Science</option>
                  <option value="social">Social Studies</option>
                  <option value="vocabulary">Vocabulary</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                  Quiz
                </label>
                <select
                  value={form.quizId}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, quizId: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value="">— pick a quiz —</option>
                  {quizOptions.map((q) => (
                    <option key={`${q.subject}/${q.id}`} value={q.id}>
                      [{q.subject}] {q.title}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                Essay Prompt
              </label>
              <textarea
                value={form.essayPrompt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, essayPrompt: e.target.value }))
                }
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={!canCreate}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold disabled:opacity-50"
          >
            Create Session
          </button>
        </form>
      </section>
    </div>
  );
}
