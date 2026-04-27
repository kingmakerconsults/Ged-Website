/**
 * sims/Sequencer.jsx — order the items correctly. Click ↑/↓ to move.
 *
 * props:
 *   prompt: string
 *   items: [{ id, label }]   (initial random order ok; correct order = order in array)
 *   correctOrder: [id, id, ...]  // canonical order
 *   onComplete(score 0..100)
 */
import React, { useMemo, useState } from 'react';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Sequencer({ prompt, items, correctOrder, onComplete }) {
  const [order, setOrder] = useState(() => shuffle(items));
  const [submitted, setSubmitted] = useState(false);

  function move(idx, delta) {
    if (submitted) return;
    const next = [...order];
    const newIdx = idx + delta;
    if (newIdx < 0 || newIdx >= next.length) return;
    [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
    setOrder(next);
  }

  const score = useMemo(() => {
    const correct = order.filter((it, i) => it.id === correctOrder[i]).length;
    return Math.round((correct / correctOrder.length) * 100);
  }, [order, correctOrder]);

  function submit() {
    setSubmitted(true);
    onComplete?.(score);
  }

  return (
    <div className="sequencer space-y-3">
      <p className="text-sm text-slate-700 dark:text-slate-200">{prompt}</p>
      <ol className="space-y-2">
        {order.map((it, i) => {
          const correctHere = submitted && it.id === correctOrder[i];
          return (
            <li
              key={it.id}
              className={`flex items-center justify-between rounded-md border px-3 py-2 ${
                submitted
                  ? correctHere
                    ? 'bg-green-50 border-green-300 dark:bg-green-900/30'
                    : 'bg-red-50 border-red-300 dark:bg-red-900/30'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="text-sm">
                <span className="font-mono text-xs mr-2 opacity-60">
                  {i + 1}.
                </span>
                {it.label}
              </div>
              {!submitted ? (
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="px-2 py-0.5 text-xs rounded border border-slate-300 disabled:opacity-30"
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === order.length - 1}
                    className="px-2 py-0.5 text-xs rounded border border-slate-300 disabled:opacity-30"
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
      {!submitted ? (
        <button
          type="button"
          onClick={submit}
          className="px-4 py-2 rounded-md bg-teal-600 text-white font-semibold"
        >
          Check order
        </button>
      ) : (
        <div className="text-sm font-semibold">Score: {score}%</div>
      )}
    </div>
  );
}
