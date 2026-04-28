/**
 * sims/Triage.jsx — generic "label each item" sim.
 *
 * props:
 *   prompt: string
 *   items: [{ id, content (JSX or string), correct: <labelKey>, rationale }]
 *   labels: [{ key, name, color? }]
 *   onComplete(score 0..100)
 */
import React, { useMemo, useState } from 'react';

export default function Triage({ prompt, items, labels, onComplete }) {
  const [picks, setPicks] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!submitted) return null;
    const correct = items.filter((it) => picks[it.id] === it.correct).length;
    return Math.round((correct / items.length) * 100);
  }, [submitted, picks, items]);

  function pick(itemId, key) {
    if (submitted) return;
    setPicks((p) => ({ ...p, [itemId]: key }));
  }

  function submit() {
    setSubmitted(true);
    const correct = items.filter((it) => picks[it.id] === it.correct).length;
    onComplete?.(Math.round((correct / items.length) * 100));
  }

  const allLabeled = items.every((it) => picks[it.id]);

  return (
    <div className="triage space-y-3">
      <p className="text-sm text-slate-700 dark:text-slate-200">{prompt}</p>
      <ol className="space-y-3">
        {items.map((it) => {
          const userPick = picks[it.id];
          const correct = userPick === it.correct;
          return (
            <li
              key={it.id}
              className={`rounded-lg border p-3 ${
                submitted
                  ? correct
                    ? 'border-green-300 bg-green-50 dark:bg-green-900/20'
                    : 'border-red-300 bg-red-50 dark:bg-red-900/20'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30'
              }`}
            >
              <div className="text-sm text-slate-900 dark:text-slate-100">
                {it.content}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {labels.map((l) => (
                  <button
                    key={l.key}
                    type="button"
                    disabled={submitted}
                    onClick={() => pick(it.id, l.key)}
                    className={`px-2 py-1 text-xs rounded-full border transition ${
                      userPick === l.key
                        ? 'bg-teal-600 text-white border-teal-700'
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                    aria-pressed={userPick === l.key}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
              {submitted && it.rationale ? (
                <div className="mt-2 text-xs italic text-slate-600 dark:text-slate-300">
                  {correct ? '✓ ' : '✗ '} {it.rationale}
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
      {!submitted ? (
        <button
          type="button"
          disabled={!allLabeled}
          onClick={submit}
          className="px-4 py-2 rounded-md bg-teal-600 text-white font-semibold disabled:opacity-50"
        >
          Check answers
        </button>
      ) : (
        <div className="text-sm font-semibold">Score: {score}%</div>
      )}
    </div>
  );
}
