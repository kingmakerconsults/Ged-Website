// frontend/src/views/CollabView.jsx
// "Work Together" hub: list active sessions, create, join by code, find partner.
// NOTE: This view is rendered OUTSIDE the legacy app's theme provider, so we
// avoid `dark:` Tailwind variants (the legacy app's `dark` class on <html>
// would otherwise turn inputs into black-on-black). We use a solid, high-
// contrast light styling that works in either theme.
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getApiBaseUrl } from '../utils/apiBase.js';
import { PREMADE_QUIZ_CATALOG } from '../../utils/quizProgress.js';
import { ESSAY_TOPICS, buildEssayPromptForTopic } from '../data/essayTopics.js';
import CollabSessionCard from '../../components/collab/CollabSessionCard.jsx';
import useCollabSocket from '../../components/collab/useCollabSocket.js';
import CollabHeader from '../../components/collab/CollabHeader.jsx';

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

const inputCls =
  'w-full px-3 py-2 border border-slate-300 rounded bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500';
const cardCls =
  'rounded-lg border border-slate-200 p-4 bg-white text-slate-900 shadow-sm';
const labelCls = 'block text-sm font-medium mb-1 text-slate-700';

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
  const canCreate = true;

  const collab = useCollabSocket({ autoJoin: false });
  const [matchmakingState, setMatchmakingState] = useState('idle');

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
    const url = `${apiBase}/api/collab/sessions/active`;
    try {
      const token = getToken();
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        if (res.status === 404) {
          setError(
            `Collaboration server is not yet available (404 from ${url}). The backend may still be deploying — please try again in a minute.`
          );
        } else if (res.status === 401 || res.status === 403) {
          if (!token) {
            setError(
              'You need to be logged in to use Work Together. Please sign in from the dashboard, then come back. (No auth token found in this browser.)'
            );
          } else {
            setError(
              'Your login session has expired. Please sign in again from the dashboard.'
            );
          }
        } else {
          setError(`Server error (${res.status}). Please try again later.`);
        }
        setSessions([]);
        return;
      }
      const data = await res.json();
      setSessions(data.sessions || []);
      setError(null);
    } catch (e) {
      setError('Network error contacting collaboration server.');
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

  const [form, setForm] = useState(() => {
    const prefillSubject = location.state?.prefillSubject || '';
    const prefillQuiz = location.state?.prefillQuiz || '';
    return {
      sessionType: 'instructor_led',
      quizSource: prefillQuiz ? 'premade' : 'premade',
      subject: prefillSubject,
      quizId: prefillQuiz,
      title: '',
      essayTopic: ESSAY_TOPICS[0],
      // Generated-quiz options (mirrors Practice Session)
      genDuration: 20,
      genMode: 'single-subject',
    };
  });
  const [generating, setGenerating] = useState(false);

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
        out.push({ id: qid, subject: subjectKey, title: q.title || qid });
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
        if (form.quizSource === 'generated') {
          // Build a fresh quiz via the same endpoint the Practice Session uses
          setGenerating(true);
          try {
            const subj = form.subject || '';
            const mode = subj ? 'single-subject' : 'balanced';
            const psRes = await fetch(`${apiBase}/api/practice-session`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`,
              },
              body: JSON.stringify({
                durationMinutes: Number(form.genDuration) || 20,
                mode,
                subject: subj || undefined,
              }),
            });
            if (!psRes.ok) {
              const t = await psRes.text();
              setError(
                `Could not generate quiz (${psRes.status}). ${t.slice(0, 200)}`
              );
              return;
            }
            const psData = await psRes.json();
            const qs = Array.isArray(psData.questions) ? psData.questions : [];
            if (!qs.length) {
              setError(
                'Generated quiz had no questions. Try a different subject.'
              );
              return;
            }
            body.questions = qs;
            body.title =
              form.title ||
              `${psData.title || 'Practice Quiz'} (${qs.length} questions)`;
          } finally {
            setGenerating(false);
          }
        } else {
          if (!form.quizId) {
            setError('Please pick a quiz.');
            return;
          }
          body.quizId = form.quizId;
        }
      } else {
        body.subject = 'rla';
        const topic = form.essayTopic || ESSAY_TOPICS[0];
        body.config = {
          essayPrompt: buildEssayPromptForTopic(topic),
          essayTopic: topic,
        };
      }
      const res = await fetch(`${apiBase}/api/collab/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text();
        let msg = `Create failed (${res.status})`;
        try {
          const j = JSON.parse(text);
          if (j.error) msg = j.error;
        } catch (_) {
          if (res.status === 404) {
            msg =
              'Collaboration server is not yet available. Backend may still be deploying.';
          }
        }
        setError(msg);
        return;
      }
      const data = await res.json();
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
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}
    >
      <CollabHeader />
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              🤝 Work Together
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Live collaboration: practice with a classmate, take a quiz with
              your instructor, or write an essay together.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-slate-600 hover:text-slate-900 underline"
          >
            ← Back to Dashboard
          </button>
        </div>

        {error && (
          <div className="p-3 rounded bg-red-100 text-red-800 text-sm border border-red-200">
            {error}
          </div>
        )}

        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-slate-800">
              Active Sessions
            </h3>
            <button
              onClick={fetchSessions}
              className="text-sm text-blue-600 hover:underline"
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
          <div className={cardCls}>
            <h3 className="font-semibold mb-3 text-slate-800">
              Join with Code
            </h3>
            <form onSubmit={handleJoin} className="flex gap-2">
              <input
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="GEDXXX"
                maxLength={12}
                className={`${inputCls} flex-1 font-mono uppercase`}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
              >
                Join
              </button>
            </form>
          </div>

          <div className={cardCls}>
            <h3 className="font-semibold mb-3 text-slate-800">
              Find a Partner
            </h3>
            {matchmakingState === 'searching' ? (
              <div className="space-y-3">
                <div className="text-sm text-slate-700 flex items-center">
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
                  className={inputCls}
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
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:opacity-50 font-semibold"
                >
                  {collab.connected ? 'Find Partner' : 'Connecting…'}
                </button>
              </div>
            )}
          </div>
        </section>

        <section className={`${cardCls} p-5`}>
          <h3 className="font-semibold mb-3 text-slate-800">
            Create a Session
          </h3>
          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className={labelCls}>Type</label>
              <select
                value={form.sessionType}
                onChange={(e) =>
                  setForm((f) => ({ ...f, sessionType: e.target.value }))
                }
                className={inputCls}
              >
                {SESSION_TYPES.map((t) => (
                  <option
                    key={t.value}
                    value={t.value}
                    disabled={
                      t.value === 'instructor_led' &&
                      !isInstructorRole(userRole)
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
              <label className={labelCls}>Title (optional)</label>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Period 3 — Algebra Practice"
                className={inputCls}
              />
            </div>

            {form.sessionType !== 'essay' ? (
              <>
                <div>
                  <label className={labelCls}>Quiz Source</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setForm((f) => ({ ...f, quizSource: 'premade' }))
                      }
                      className={`flex-1 px-3 py-2 rounded border text-sm font-medium ${
                        form.quizSource === 'premade'
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      📚 Pick a Premade Quiz
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((f) => ({ ...f, quizSource: 'generated' }))
                      }
                      className={`flex-1 px-3 py-2 rounded border text-sm font-medium ${
                        form.quizSource === 'generated'
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      ⚡ Generate (Practice-style)
                    </button>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>
                    {form.quizSource === 'generated'
                      ? 'Subject'
                      : 'Subject (filter)'}
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
                    className={inputCls}
                  >
                    <option value="">
                      {form.quizSource === 'generated'
                        ? 'Balanced (all 4 subjects)'
                        : 'All'}
                    </option>
                    <option value="math">Math</option>
                    <option value="rla">RLA</option>
                    <option value="science">Science</option>
                    <option value="social">Social Studies</option>
                    {form.quizSource === 'premade' && (
                      <option value="vocabulary">Vocabulary</option>
                    )}
                  </select>
                </div>
                {form.quizSource === 'premade' ? (
                  <div>
                    <label className={labelCls}>Quiz</label>
                    <select
                      value={form.quizId}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, quizId: e.target.value }))
                      }
                      className={inputCls}
                    >
                      <option value="">— pick a quiz —</option>
                      {quizOptions.map((q) => (
                        <option key={`${q.subject}/${q.id}`} value={q.id}>
                          [{q.subject}] {q.title}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className={labelCls}>Length</label>
                    <select
                      value={form.genDuration}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          genDuration: Number(e.target.value),
                        }))
                      }
                      className={inputCls}
                    >
                      <option value={10}>10 min (~5 questions)</option>
                      <option value={20}>20 min (~10 questions)</option>
                      <option value={30}>30 min (~15 questions)</option>
                      <option value={40}>40 min (~20 questions)</option>
                      <option value={50}>50 min (~25 questions)</option>
                      <option value={60}>60 min (~30 questions)</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-1">
                      Pulls a fresh mix of questions from the same pool used by
                      the Practice Session. Both partners get the exact same
                      questions.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div>
                <label className={labelCls}>Essay Topic</label>
                <select
                  value={form.essayTopic}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, essayTopic: e.target.value }))
                  }
                  className={inputCls}
                >
                  {ESSAY_TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1">
                  Both partners will see this topic and can open the full Essay
                  Practice Tool (with passages) once the session starts.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={!canCreate || generating}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold disabled:opacity-50"
            >
              {generating ? 'Generating quiz…' : 'Create Session'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
