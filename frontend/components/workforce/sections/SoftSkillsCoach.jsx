import React, { useEffect, useMemo, useState } from 'react';
import WorkforceSectionFrame from '../WorkforceSectionFrame.jsx';
import { dailyPromptForDate, SOFT_SKILLS_PROMPTS } from './data/softSkillsPrompts.js';

function storageKey(userId) {
  return `workforce:softskills:${userId || 'anon'}:journal`;
}
function loadJournal(userId) {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(window.localStorage.getItem(storageKey(userId)) || '{}'); } catch { return {}; }
}
function saveJournal(userId, journal) {
  if (typeof window === 'undefined') return;
  try { window.localStorage.setItem(storageKey(userId), JSON.stringify(journal)); } catch {}
}

function isoDate(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function calcStreak(journal) {
  let streak = 0;
  const day = new Date();
  while (true) {
    const k = isoDate(day);
    if (journal[k] && journal[k].entry?.trim()) {
      streak += 1;
      day.setDate(day.getDate() - 1);
    } else if (streak === 0 && k === isoDate()) {
      // Allow today to be empty without breaking yesterday's streak
      day.setDate(day.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function localCoachFeedback(entry, prompt) {
  const wc = (entry || '').trim().split(/\s+/).filter(Boolean).length;
  const lines = [];
  if (wc < 30) lines.push('Try to push past 30 words. Specifics beat summaries.');
  if (!/I |my /i.test(entry || '')) lines.push('Use "I" statements to anchor the reflection in your experience.');
  if (!/(because|so|therefore|which|when)/i.test(entry || '')) lines.push('Add a "because" or "so that" - reasoning beats observation.');
  if (lines.length === 0) lines.push('Solid reflection. Bonus: identify one tiny experiment you\u2019ll try this week.');
  return ['Local coach review:', '', ...lines, '', `Prompt: ${prompt}`].join('\n');
}

export default function SoftSkillsCoach({ onBack, userId = 'anon', apiBase }) {
  const [journal, setJournal] = useState(() => loadJournal(userId));
  const [date, setDate] = useState(isoDate());
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => saveJournal(userId, journal), [userId, journal]);

  const promptObj = useMemo(() => dailyPromptForDate(new Date(`${date}T12:00:00`)), [date]);
  const todayEntry = journal[date]?.entry || '';

  function setEntry(text) {
    setJournal((j) => ({
      ...j,
      [date]: { entry: text, prompt: promptObj.text, savedAt: Date.now() },
    }));
  }

  async function getCoach() {
    setLoading(true); setError(null); setFeedback(null);
    try {
      const res = await fetch(`${apiBase || ''}/api/workforce/soft-skills-evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry: todayEntry, prompt: promptObj.text }),
      });
      if (!res.ok) throw new Error(`Server ${res.status}`);
      const data = await res.json();
      setFeedback(data.feedback || data.text || JSON.stringify(data));
    } catch (e) {
      setError(e.message || 'Coach service unavailable.');
      setFeedback(localCoachFeedback(todayEntry, promptObj.text));
    } finally {
      setLoading(false);
    }
  }

  const streak = calcStreak(journal);
  const totalEntries = Object.values(journal).filter((v) => v.entry?.trim()).length;
  const recentEntries = Object.entries(journal)
    .filter(([, v]) => v.entry?.trim())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .slice(0, 7);

  return (
    <WorkforceSectionFrame title="Soft Skills Coach" subtitle="Daily reflection prompts. Build the habit. Get coach feedback when you want it." onBack={onBack}>
      <div className="px-4 pb-6 grid md:grid-cols-3 gap-4">
        <main className="md:col-span-2 space-y-3">
          <div className="rounded-xl border border-teal-300 bg-teal-50 dark:bg-teal-900/20 p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs uppercase tracking-wide text-teal-700 dark:text-teal-300 font-bold">Daily prompt</div>
              <input type="date" value={date} max={isoDate()} onChange={(e) => setDate(e.target.value)} className="px-2 py-1 rounded border bg-white dark:bg-slate-900 text-sm" />
            </div>
            <div className="text-base font-semibold mt-1">{promptObj.text}</div>
          </div>
          <textarea
            value={todayEntry}
            onChange={(e) => setEntry(e.target.value)}
            rows={8}
            placeholder="Write your reflection..."
            className="w-full px-3 py-2 rounded border bg-white dark:bg-slate-900"
          />
          <div className="flex gap-2 items-center">
            <button type="button" onClick={getCoach} disabled={loading || !todayEntry.trim()} className="px-4 py-2 rounded bg-teal-600 text-white text-sm font-semibold disabled:opacity-50">
              {loading ? 'Reviewing...' : 'Get coach feedback'}
            </button>
            <span className="text-xs text-slate-500">Auto-saved on every keystroke.</span>
          </div>
          {error ? <div className="text-xs text-amber-600">Online coach unavailable; showing local review. ({error})</div> : null}
          {feedback ? (
            <div className="rounded-xl border bg-teal-50 dark:bg-teal-900/20 p-4 whitespace-pre-wrap text-sm">{feedback}</div>
          ) : null}
        </main>

        <aside className="md:col-span-1 space-y-3">
          <div className="rounded-xl border bg-white dark:bg-slate-900 p-4 text-center">
            <div className="text-xs uppercase tracking-wide text-slate-500">Current streak</div>
            <div className="text-4xl font-bold text-teal-600">{streak}</div>
            <div className="text-xs text-slate-500">days in a row</div>
          </div>
          <div className="rounded-xl border bg-white dark:bg-slate-900 p-4 text-center">
            <div className="text-xs uppercase tracking-wide text-slate-500">Total reflections</div>
            <div className="text-2xl font-bold">{totalEntries}</div>
            <div className="text-xs text-slate-500">of {SOFT_SKILLS_PROMPTS.length} prompts available</div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Recent entries</div>
            {recentEntries.length === 0 ? (
              <div className="text-xs italic text-slate-500">None yet.</div>
            ) : (
              <ul className="space-y-2">
                {recentEntries.map(([d, v]) => (
                  <li key={d} className="rounded border p-2 bg-white dark:bg-slate-900">
                    <button type="button" onClick={() => setDate(d)} className="text-left w-full">
                      <div className="text-xs font-bold">{d}</div>
                      <div className="text-xs italic text-slate-500 line-clamp-1">{v.prompt}</div>
                      <div className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 mt-0.5">{v.entry}</div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </WorkforceSectionFrame>
  );
}
