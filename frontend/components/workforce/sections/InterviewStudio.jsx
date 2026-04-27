import React, { useEffect, useMemo, useRef, useState } from 'react';
import WorkforceSectionFrame from '../WorkforceSectionFrame.jsx';
import { INTERVIEW_QUESTIONS, INTERVIEW_CATEGORIES } from './data/interviewQuestions.js';

const TABS = [
  { id: 'bank', label: 'Question Bank' },
  { id: 'star', label: 'STAR Builder' },
  { id: 'mock', label: 'AI Mock Interview' },
  { id: 'record', label: 'Self-Record' },
];

function storageKey(userId, suffix) {
  return `workforce:interview:${userId || 'anon'}:${suffix}`;
}
function loadJSON(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try { const raw = window.localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
}
function saveJSON(key, value) {
  if (typeof window === 'undefined') return;
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function QuestionBank({ userId }) {
  const key = storageKey(userId, 'practiced');
  const [practiced, setPracticed] = useState(() => loadJSON(key, {}));
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  useEffect(() => saveJSON(key, practiced), [key, practiced]);

  const filtered = useMemo(() => {
    return INTERVIEW_QUESTIONS.filter((q) => {
      if (filter !== 'All' && q.category !== filter) return false;
      if (search && !q.text.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filter, search]);

  const practicedCount = Object.values(practiced).filter(Boolean).length;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-2 py-1 rounded border bg-white dark:bg-slate-900">
          {INTERVIEW_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions..." className="flex-1 min-w-[180px] px-2 py-1 rounded border bg-white dark:bg-slate-900" />
        <span className="text-xs text-slate-500">Practiced: {practicedCount}/{INTERVIEW_QUESTIONS.length}</span>
      </div>
      <ul className="space-y-2">
        {filtered.map((q) => (
          <li key={q.id} className="flex items-start gap-3 p-3 rounded border bg-white dark:bg-slate-900">
            <input
              type="checkbox"
              checked={!!practiced[q.id]}
              onChange={(e) => setPracticed((p) => ({ ...p, [q.id]: e.target.checked }))}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wide text-slate-500">{q.category}</div>
              <div className="font-medium">{q.text}</div>
              {q.tip ? <div className="text-xs italic text-slate-600 dark:text-slate-400 mt-1">Tip: {q.tip}</div> : null}
            </div>
          </li>
        ))}
        {filtered.length === 0 ? <li className="text-sm italic text-slate-500">No questions match.</li> : null}
      </ul>
    </div>
  );
}

function localStarReview(star) {
  const lines = [];
  const wc = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;
  if (wc(star.situation) < 15) lines.push('- Situation: add concrete context (when, where, who).');
  if (wc(star.task) < 10) lines.push("- Task: clarify YOUR specific responsibility (not the team's).");
  if (wc(star.action) < 25) lines.push('- Action: this should be the longest part. Show the steps you personally took.');
  if (wc(star.result) < 10) lines.push('- Result: quantify if you can (% improvement, $, time saved, customers retained).');
  if (!/I |my /i.test(star.action)) lines.push('- Use "I" not "we" in Action - interviewers want YOUR contribution.');
  if (lines.length === 0) lines.push('Looks balanced. Practice saying it out loud - aim for 60-90 seconds.');
  return ['Local STAR review:', '', ...lines].join('\n');
}

function StarBuilder({ userId, apiBase }) {
  const key = storageKey(userId, 'star');
  const [star, setStar] = useState(() => loadJSON(key, { situation: '', task: '', action: '', result: '', question: '' }));
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => saveJSON(key, star), [key, star]);

  async function getReview() {
    setLoading(true); setError(null); setFeedback(null);
    try {
      const res = await fetch(`${apiBase || ''}/api/workforce/interview-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'star_review', star }),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setFeedback(data.feedback || data.text || JSON.stringify(data));
    } catch (e) {
      setError(e.message || 'Could not reach review service.');
      setFeedback(localStarReview(star));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3 max-w-3xl">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        STAR = Situation, Task, Action, Result. Build a 60-90 second story you can adapt to many behavioral questions.
      </p>
      <input value={star.question} onChange={(e) => setStar((s) => ({ ...s, question: e.target.value }))} placeholder="The question (e.g., Tell me about a time you handled conflict)" className="w-full px-2 py-1 rounded border bg-white dark:bg-slate-900" />
      {['situation', 'task', 'action', 'result'].map((field) => (
        <div key={field}>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">{field}</label>
          <textarea rows={3} value={star[field]} onChange={(e) => setStar((s) => ({ ...s, [field]: e.target.value }))} className="w-full px-2 py-1 rounded border bg-white dark:bg-slate-900" />
        </div>
      ))}
      <button type="button" onClick={getReview} disabled={loading} className="px-4 py-2 rounded bg-teal-600 text-white text-sm font-semibold disabled:opacity-50">
        {loading ? 'Reviewing...' : 'Get coach feedback'}
      </button>
      {error ? <div className="text-xs text-amber-600">Online coach unavailable; showing local review. ({error})</div> : null}
      {feedback ? (
        <div className="rounded-xl border bg-teal-50 dark:bg-teal-900/20 p-4 whitespace-pre-wrap text-sm">
          {feedback}
        </div>
      ) : null}
    </div>
  );
}

function localMockReply(history) {
  const userTurns = history.filter((m) => m.role === 'user').length;
  const fallbacks = [
    'Tell me about yourself in about 90 seconds.',
    'Tell me about a time you handled a difficult coworker. Use STAR.',
    "What's a weakness you're actively working on?",
    'Why this role specifically?',
    'Where do you see your career in 2 years?',
    'Thank you. Final question: what questions do you have for me?',
  ];
  return fallbacks[Math.min(userTurns, fallbacks.length - 1)];
}

function AIMock({ userId, apiBase }) {
  const key = storageKey(userId, 'mock');
  const [history, setHistory] = useState(() => loadJSON(key, []));
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => saveJSON(key, history), [key, history]);

  const turns = history.length;
  const done = turns >= 10;

  async function send() {
    if (!input.trim() || loading || done) return;
    const userTurn = { role: 'user', text: input.trim() };
    const newHistory = [...history, userTurn];
    setHistory(newHistory);
    setInput('');
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${apiBase || ''}/api/workforce/interview-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'mock', history: newHistory }),
      });
      if (!res.ok) throw new Error(`Server ${res.status}`);
      const data = await res.json();
      const reply = data.reply || data.text || '...';
      setHistory((h) => [...h, { role: 'interviewer', text: reply }]);
    } catch (e) {
      setError(e.message || 'Mock service unavailable.');
      setHistory((h) => [...h, { role: 'interviewer', text: localMockReply(newHistory) }]);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    if (history.length && !window.confirm('Reset this mock interview?')) return;
    setHistory([]);
  }

  return (
    <div className="space-y-3 max-w-3xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">5-question AI mock interview. Be specific - use STAR.</p>
        <button type="button" onClick={reset} className="text-xs text-red-600 hover:underline">Reset</button>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto p-3 rounded border bg-slate-50 dark:bg-slate-900">
        {history.length === 0 ? (
          <div className="text-sm italic text-slate-500">Type your introduction below to begin. The interviewer will ask 5 questions.</div>
        ) : history.map((m, i) => (
          <div key={i} className={`text-sm ${m.role === 'user' ? 'text-right' : ''}`}>
            <div className={`inline-block px-3 py-2 rounded-lg max-w-[85%] ${m.role === 'user' ? 'bg-teal-600 text-white' : 'bg-white dark:bg-slate-800 border'}`}>
              <div className="text-[10px] uppercase opacity-75">{m.role === 'user' ? 'You' : 'Interviewer'}</div>
              <div className="whitespace-pre-wrap">{m.text}</div>
            </div>
          </div>
        ))}
      </div>
      {!done ? (
        <div className="flex gap-2">
          <textarea
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your answer..."
            className="flex-1 px-2 py-1 rounded border bg-white dark:bg-slate-900"
            onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) send(); }}
          />
          <button type="button" onClick={send} disabled={loading || !input.trim()} className="px-4 py-2 rounded bg-teal-600 text-white text-sm font-semibold disabled:opacity-50 self-end">
            {loading ? '...' : 'Send'}
          </button>
        </div>
      ) : (
        <div className="rounded-xl border bg-emerald-50 dark:bg-emerald-900/20 p-4 text-sm">
          Mock interview complete. Review the transcript above. Reset to try again.
        </div>
      )}
      {error ? <div className="text-xs text-amber-600">Online coach unavailable; using local fallback. ({error})</div> : null}
    </div>
  );
}

function SelfRecord() {
  const [recording, setRecording] = useState(false);
  const [blobUrl, setBlobUrl] = useState(null);
  const [error, setError] = useState(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  async function start() {
    setError(null);
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setError('Your browser does not support recording. Try Chrome, Edge, or Firefox on desktop.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setBlobUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      setRecording(true);
    } catch (e) {
      setError(e.message || 'Could not access camera/microphone. Check permissions.');
    }
  }

  function stop() {
    recorderRef.current?.stop();
    setRecording(false);
  }

  return (
    <div className="space-y-3 max-w-2xl">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Record yourself answering one of the bank questions. Watch yourself back. Look for: filler words, eye contact, pace, energy.
      </p>
      {error ? <div className="text-sm rounded p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200">{error}</div> : null}
      <div className="flex gap-2">
        {!recording ? (
          <button type="button" onClick={start} className="px-4 py-2 rounded bg-red-600 text-white text-sm font-semibold">Start recording</button>
        ) : (
          <button type="button" onClick={stop} className="px-4 py-2 rounded bg-slate-700 text-white text-sm font-semibold">Stop</button>
        )}
      </div>
      {blobUrl ? (
        <div className="space-y-2">
          <video src={blobUrl} controls className="w-full rounded border" />
          <a href={blobUrl} download={`practice-${Date.now()}.webm`} className="inline-block text-sm text-teal-700 hover:underline">Download .webm</a>
        </div>
      ) : null}
      <p className="text-xs text-slate-500 italic">Recordings stay in your browser only. They are not uploaded.</p>
    </div>
  );
}

export default function InterviewStudio({ onBack, userId = 'anon', apiBase }) {
  const [tab, setTab] = useState('bank');
  return (
    <WorkforceSectionFrame title="Interview Studio" subtitle="Question bank, STAR builder, AI mock interview, and self-recording." onBack={onBack}>
      <div className="px-4 pb-4">
        <nav className="flex flex-wrap gap-2 mb-4">
          {TABS.map((t) => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)} className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${tab === t.id ? 'bg-teal-600 text-white border-teal-700' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
              {t.label}
            </button>
          ))}
        </nav>
        {tab === 'bank' && <QuestionBank userId={userId} />}
        {tab === 'star' && <StarBuilder userId={userId} apiBase={apiBase} />}
        {tab === 'mock' && <AIMock userId={userId} apiBase={apiBase} />}
        {tab === 'record' && <SelfRecord />}
      </div>
    </WorkforceSectionFrame>
  );
}
