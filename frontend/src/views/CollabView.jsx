// frontend/src/views/CollabView.jsx
// "Work Together" hub: list active sessions, create, join by code, find partner.
// NOTE: This view is rendered OUTSIDE the legacy app's theme provider, so we
// avoid `dark:` Tailwind variants (the legacy app's `dark` class on <html>
// would otherwise turn inputs into black-on-black). We use a solid, high-
// contrast light styling that works in either theme.
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getApiBaseUrl } from '../utils/apiBase.js';
import { ESSAY_TOPICS, buildEssayPromptForTopic } from '../data/essayTopics.js';
import CollabSessionCard from '../../components/collab/CollabSessionCard.jsx';
import useCollabSocket from '../../components/collab/useCollabSocket.js';
import CollabHeader from '../../components/collab/CollabHeader.jsx';
import useCollabTheme from '../../components/collab/useCollabTheme.js';

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

// Layout-only classes; colors are driven by a scoped <style> block fed by
// useCollabTheme because the legacy app toggles `html.dark` independently of
// /collab's visible theme, which made `dark:` Tailwind variants leak into
// light mode.
const inputCls =
  'collab-input w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500';
const cardCls = 'collab-card rounded-lg border p-4 shadow-sm';
const labelCls = 'collab-label block text-sm font-medium mb-1';

export default function CollabView() {
  const navigate = useNavigate();
  const location = useLocation();
  const apiBase = useMemo(() => getApiBaseUrl(), []);
  const t = useCollabTheme();
  const themeStyleCss = `
    .collab-view-root .collab-card {
      background-color: ${t.cardBg};
      color: ${t.pageText};
      border-color: ${t.cardBorder};
    }
    .collab-view-root .collab-input,
    .collab-view-root .collab-input:focus {
      background-color: ${t.inputBg};
      color: ${t.inputText};
      border-color: ${t.inputBorder};
    }
    .collab-view-root .collab-input::placeholder {
      color: ${t.subtleText};
      opacity: 1;
    }
    .collab-view-root .collab-input option {
      background-color: ${t.cardBg};
      color: ${t.inputText};
    }
    .collab-view-root .collab-label { color: ${t.mutedText}; }
    .collab-view-root .collab-subtle { color: ${t.subtleText}; }
    /* Force-override leftover slate text colors so they follow the theme */
    .collab-view-root .text-slate-900,
    .collab-view-root .text-slate-800 { color: ${t.pageText} !important; }
    .collab-view-root .text-slate-700,
    .collab-view-root .text-slate-600,
    .collab-view-root .text-slate-300,
    .collab-view-root .text-slate-200 { color: ${t.mutedText} !important; }
    .collab-view-root .text-slate-500,
    .collab-view-root .text-slate-400 { color: ${t.subtleText} !important; }
    /* Source-toggle / outlined buttons */
    .collab-view-root .collab-toggle {
      background-color: ${t.cardBg};
      color: ${t.pageText};
      border-color: ${t.inputBorder};
    }
    .collab-view-root .collab-toggle:hover {
      background-color: ${t.isDark ? '#334155' : '#f1f5f9'};
    }
    .collab-view-root .collab-toggle.is-active {
      background-color: #7c3aed;
      color: #ffffff;
      border-color: #7c3aed;
    }
  `;
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState(null);

  const user = getCurrentUser();
  const userRole = user?.role || 'student';
  const canCreate = true;

  // Auth gate: /collab requires a logged-in user.
  const isLoggedIn = !!user && !!getToken();

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
          // The active-sessions endpoint may briefly 404 right after a
          // deploy. The page is still fully usable (Join with Code +
          // Find a Partner). Log silently instead of showing a red banner.
          console.warn(
            `[collab] /sessions/active returned 404 from ${url} — hiding banner`
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
      // Cascading premade picker: subject -> category -> topic -> quiz
      categoryName: '',
      topicTitle: '',
      quizId: prefillQuiz,
      title: '',
      essayTopic: ESSAY_TOPICS[0],
      // Generated-quiz options (mirrors Practice Session)
      genDuration: 20,
      genMode: 'single-subject',
      // Vocabulary review options
      vocabSubject: 'science',
      vocabCount: 12,
      vocabStyle: 'mixed',
    };
  });
  const [generating, setGenerating] = useState(false);

  // Fetch the full quiz catalog from the backend so we can offer an organized
  // Subject -> Category -> Topic -> Quiz picker that works even when the
  // legacy app hasn't hydrated window.PREMADE_QUIZ_CATALOG.
  const [catalog, setCatalog] = useState(null);
  const [catalogLoading, setCatalogLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${apiBase}/api/all-quizzes`);
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = await res.json();
        if (alive) setCatalog(data || {});
      } catch (_e) {
        if (alive) setCatalog({});
      } finally {
        if (alive) setCatalogLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [apiBase]);

  // Map UI subject keys to the backend subject names used by the catalog.
  const SUBJECT_LABELS = {
    math: 'Math',
    rla: 'Reasoning Through Language Arts (RLA)',
    science: 'Science',
    social: 'Social Studies',
    workforce: 'Workforce Readiness',
  };

  // Some topics in the catalog expose questions directly (legacy shape) and
  // have no `quizzes` array. Treat those topics as a single quiz so the
  // picker still surfaces them.
  const collectTopicQuizzes = (topic) => {
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
  };

  const categoryHasQuizzes = (cat) => {
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
  };

  // Available subjects (only those that actually have quizzes with questions)
  const subjectsWithQuizzes = useMemo(() => {
    if (!catalog) return [];
    const out = [];
    for (const [key, label] of Object.entries(SUBJECT_LABELS)) {
      const data = catalog[label];
      if (!data) continue;
      const cats = data.categories || {};
      if (Object.values(cats).some(categoryHasQuizzes)) {
        out.push({ key, label });
      }
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog]);

  const subjectData = useMemo(() => {
    if (!catalog || !form.subject) return null;
    const label = SUBJECT_LABELS[form.subject];
    return label ? catalog[label] || null : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog, form.subject]);

  const categoryOptions = useMemo(() => {
    const cats = subjectData?.categories || {};
    return Object.keys(cats).filter((name) => categoryHasQuizzes(cats[name]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectData]);

  const topicOptions = useMemo(() => {
    if (!subjectData || !form.categoryName) return [];
    const cat = subjectData.categories?.[form.categoryName];
    if (!cat) return [];
    return (cat.topics || [])
      .filter((t) => collectTopicQuizzes(t).length > 0)
      .map((t) => t.title || t.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectData, form.categoryName]);

  const quizOptions = useMemo(() => {
    if (!subjectData || !form.categoryName) return [];
    const cat = subjectData.categories?.[form.categoryName];
    if (!cat) return [];
    const topics = cat.topics || [];
    const matchTopic = (t) => (t.title || t.id) === form.topicTitle;
    const targetTopics = form.topicTitle ? topics.filter(matchTopic) : topics;
    const out = [];
    for (const t of targetTopics) {
      for (const q of collectTopicQuizzes(t)) {
        out.push({
          id: q.id,
          title: q.title,
          topic: t.title || t.id,
          count: q.count,
        });
      }
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectData, form.categoryName, form.topicTitle]);

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
        if (form.quizSource === 'vocabulary') {
          setGenerating(true);
          try {
            const subj = form.vocabSubject || 'science';
            const count = Number(form.vocabCount) || 12;
            const style = form.vocabStyle || 'mixed';
            const vRes = await fetch(
              `${apiBase}/api/vocabulary-quiz/${encodeURIComponent(
                subj
              )}?count=${count}&style=${encodeURIComponent(style)}`,
              { headers: { Authorization: `Bearer ${getToken()}` } }
            );
            if (!vRes.ok) {
              const t = await vRes.text();
              setError(
                `Could not load vocabulary (${vRes.status}). ${t.slice(0, 200)}`
              );
              return;
            }
            const vData = await vRes.json();
            const rawQs = Array.isArray(vData?.quiz?.questions)
              ? vData.quiz.questions
              : [];
            if (!rawQs.length) {
              setError(
                'No vocabulary questions could be built for that subject.'
              );
              return;
            }
            // Normalize to the shape collab quiz session expects
            // ({ question, type:'multipleChoice', answerOptions: [...] }).
            const normalized = rawQs.map((q, i) => ({
              questionNumber: i + 1,
              type: 'multipleChoice',
              question: q.questionText || q.question || q.prompt || '',
              answerOptions: Array.isArray(q.answerOptions)
                ? q.answerOptions
                : [],
            }));
            body.questions = normalized;
            body.subject = subj;
            body.title =
              form.title ||
              `${vData.subject || 'Vocabulary'} — Vocabulary Review (${normalized.length} q)`;
          } finally {
            setGenerating(false);
          }
        } else if (form.quizSource === 'generated') {
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

  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen w-full"
        style={{ backgroundColor: t.pageBg, color: t.pageText }}
      >
        <CollabHeader />
        <div className="max-w-xl mx-auto p-6 mt-10">
          <div
            className="rounded-lg border p-6 shadow-sm"
            style={{ backgroundColor: t.cardBg, borderColor: t.cardBorder }}
          >
            <h2 className="text-2xl font-bold mb-2">🤝 Work Together</h2>
            <p className="text-sm mb-4" style={{ color: t.mutedText }}>
              You need to be signed in to use Work Together — it lets you create
              or join live study rooms with classmates and instructors.
            </p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-semibold"
            >
              Sign in from the Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="collab-view-root min-h-screen w-full"
      style={{ backgroundColor: t.pageBg, color: t.pageText }}
    >
      <style>{themeStyleCss}</style>
      <CollabHeader />
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: t.pageText }}>
              🤝 Work Together
            </h2>
            <p className="text-sm mt-1" style={{ color: t.mutedText }}>
              Live collaboration: practice with a classmate, take a quiz with
              your instructor, or write an essay together.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-sm underline"
            style={{ color: t.mutedText }}
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
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
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
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Loading…
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-sm text-slate-500 dark:text-slate-400 italic">
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
            <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Join with Code
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Got a code from a host? You can jump in any time — even after the
              session has started.
            </p>
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
            <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Find a Partner
            </h3>
            {matchmakingState === 'searching' ? (
              <div className="space-y-3">
                <div className="text-sm text-slate-700 dark:text-slate-200 flex items-center">
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
          <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-100">
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
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setForm((f) => ({ ...f, quizSource: 'premade' }))
                      }
                      className={`collab-toggle flex-1 min-w-[140px] px-3 py-2 rounded border text-sm font-medium ${
                        form.quizSource === 'premade' ? 'is-active' : ''
                      }`}
                    >
                      📚 Pick a Premade Quiz
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((f) => ({ ...f, quizSource: 'generated' }))
                      }
                      className={`collab-toggle flex-1 min-w-[140px] px-3 py-2 rounded border text-sm font-medium ${
                        form.quizSource === 'generated' ? 'is-active' : ''
                      }`}
                    >
                      ⚡ Generate (Practice-style)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((f) => ({ ...f, quizSource: 'vocabulary' }))
                      }
                      className={`collab-toggle flex-1 min-w-[140px] px-3 py-2 rounded border text-sm font-medium ${
                        form.quizSource === 'vocabulary' ? 'is-active' : ''
                      }`}
                    >
                      🔤 Vocabulary Review
                    </button>
                  </div>
                </div>
                {form.quizSource === 'vocabulary' ? (
                  <>
                    <div>
                      <label className={labelCls}>Subject</label>
                      <select
                        value={form.vocabSubject}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            vocabSubject: e.target.value,
                          }))
                        }
                        className={inputCls}
                      >
                        <option value="science">Science</option>
                        <option value="math">Math</option>
                        <option value="rla">
                          Reasoning Through Language Arts (RLA)
                        </option>
                        <option value="social">Social Studies</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Number of words</label>
                        <select
                          value={form.vocabCount}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              vocabCount: Number(e.target.value),
                            }))
                          }
                          className={inputCls}
                        >
                          <option value={6}>6</option>
                          <option value={10}>10</option>
                          <option value={12}>12</option>
                          <option value={15}>15</option>
                          <option value={20}>20</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Question style</label>
                        <select
                          value={form.vocabStyle}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              vocabStyle: e.target.value,
                            }))
                          }
                          className={inputCls}
                        >
                          <option value="mixed">Mixed</option>
                          <option value="def-to-term">Definition → Term</option>
                          <option value="term-to-def">Term → Definition</option>
                        </select>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Builds a fresh multiple-choice vocabulary quiz from the
                      shared word list. Both partners get the exact same
                      questions.
                    </p>
                  </>
                ) : null}
                {form.quizSource !== 'vocabulary' && (
                  <div>
                    <label className={labelCls}>
                      {form.quizSource === 'generated' ? 'Subject' : 'Subject'}
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          subject: e.target.value,
                          categoryName: '',
                          topicTitle: '',
                          quizId: '',
                        }))
                      }
                      className={inputCls}
                    >
                      <option value="">
                        {form.quizSource === 'generated'
                          ? 'Balanced (all 4 subjects)'
                          : '— pick a subject —'}
                      </option>
                      {form.quizSource === 'generated' ? (
                        <>
                          <option value="math">Math</option>
                          <option value="rla">RLA</option>
                          <option value="science">Science</option>
                          <option value="social">Social Studies</option>
                        </>
                      ) : (
                        subjectsWithQuizzes.map((s) => (
                          <option key={s.key} value={s.key}>
                            {s.label}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                )}
                {form.quizSource === 'premade' ? (
                  <>
                    <div>
                      <label className={labelCls}>Topic Area</label>
                      <select
                        value={form.categoryName}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            categoryName: e.target.value,
                            topicTitle: '',
                            quizId: '',
                          }))
                        }
                        disabled={!form.subject || catalogLoading}
                        className={inputCls}
                      >
                        <option value="">
                          {catalogLoading
                            ? 'Loading…'
                            : form.subject
                              ? '— pick a topic area —'
                              : 'Pick a subject first'}
                        </option>
                        {categoryOptions.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    {topicOptions.length > 1 && (
                      <div>
                        <label className={labelCls}>Sub-topic (optional)</label>
                        <select
                          value={form.topicTitle}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              topicTitle: e.target.value,
                              quizId: '',
                            }))
                          }
                          className={inputCls}
                        >
                          <option value="">All sub-topics</option>
                          {topicOptions.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div>
                      <label className={labelCls}>Quiz</label>
                      <select
                        value={form.quizId}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, quizId: e.target.value }))
                        }
                        disabled={
                          !form.categoryName || quizOptions.length === 0
                        }
                        className={inputCls}
                      >
                        <option value="">
                          {!form.categoryName
                            ? 'Pick a topic area first'
                            : quizOptions.length === 0
                              ? 'No quizzes available'
                              : `— pick a quiz (${quizOptions.length} available) —`}
                        </option>
                        {quizOptions.map((q) => (
                          <option key={q.id} value={q.id}>
                            {q.title} ({q.count} q)
                            {!form.topicTitle ? ` — ${q.topic}` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : form.quizSource === 'generated' ? (
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
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Pulls a fresh mix of questions from the same pool used by
                      the Practice Session. Both partners get the exact same
                      questions.
                    </p>
                  </div>
                ) : null}
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
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
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
