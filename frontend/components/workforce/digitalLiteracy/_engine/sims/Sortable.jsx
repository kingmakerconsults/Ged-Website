/**
 * sims/Sortable.jsx — assign each item to a bucket. Click-to-place
 * (also keyboard-accessible: focus item → Enter cycles bucket).
 *
 * props:
 *   prompt: string
 *   items: [{ id, label, correctBucket }]
 *   buckets: [{ key, name, hint? }]
 *   onComplete(score 0..100)
 */
import React, { useMemo, useState } from 'react';

export default function Sortable({ prompt, items, buckets, onComplete }) {
  const [placed, setPlaced] = useState({}); // itemId -> bucketKey
  const [submitted, setSubmitted] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const score = useMemo(() => {
    const correct = items.filter(
      (i) => placed[i.id] === i.correctBucket
    ).length;
    return Math.round((correct / items.length) * 100);
  }, [items, placed]);

  function placeIn(bucketKey) {
    if (!activeItem || submitted) return;
    setPlaced((p) => ({ ...p, [activeItem]: bucketKey }));
    setActiveItem(null);
  }

  function submit() {
    setSubmitted(true);
    onComplete?.(score);
  }

  const allPlaced = items.every((i) => placed[i.id]);
  const unplaced = items.filter((i) => !placed[i.id]);

  return (
    <div className="sortable space-y-3 text-slate-900 dark:text-slate-100">
      <p className="text-sm text-slate-700 dark:text-slate-200">{prompt}</p>

      {unplaced.length > 0 && !submitted && (
        <div className="rounded-lg p-3 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700">
          <div className="text-xs uppercase text-slate-600 dark:text-slate-300 mb-2">
            Items to place
          </div>
          <div className="flex flex-wrap gap-2">
            {unplaced.map((i) => (
              <button
                key={i.id}
                type="button"
                onClick={() => setActiveItem(i.id === activeItem ? null : i.id)}
                className={`px-3 py-1.5 text-sm rounded-md border ${
                  activeItem === i.id
                    ? 'bg-teal-600 text-white border-teal-700'
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600'
                }`}
                aria-pressed={activeItem === i.id}
              >
                {i.label}
              </button>
            ))}
          </div>
          {activeItem ? (
            <div className="text-xs mt-2 text-teal-700 dark:text-teal-300">
              Now click a bucket below to place it.
            </div>
          ) : (
            <div className="text-xs mt-2 text-slate-600 dark:text-slate-300">
              Pick an item, then click a bucket.
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {buckets.map((b) => {
          const inBucket = items.filter((i) => placed[i.id] === b.key);
          return (
            <button
              key={b.key}
              type="button"
              disabled={submitted}
              onClick={() => placeIn(b.key)}
              className="text-left rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-3 min-h-[110px] hover:bg-slate-50 dark:hover:bg-slate-800 disabled:cursor-default disabled:hover:bg-transparent"
            >
              <div className="font-semibold text-sm">{b.name}</div>
              {b.hint ? (
                <div className="text-xs opacity-60 mb-2">{b.hint}</div>
              ) : null}
              <ul className="space-y-1">
                {inBucket.map((i) => {
                  const correct = i.correctBucket === b.key;
                  return (
                    <li
                      key={i.id}
                      className={`text-xs px-2 py-1 rounded ${
                        submitted
                          ? correct
                            ? 'bg-green-200 dark:bg-green-900/40'
                            : 'bg-red-200 dark:bg-red-900/40'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    >
                      {i.label}
                      {submitted && !correct ? (
                        <span className="ml-1 opacity-70">
                          (→{' '}
                          {buckets.find((x) => x.key === i.correctBucket)?.name}
                          )
                        </span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          type="button"
          disabled={!allPlaced}
          onClick={submit}
          className="px-4 py-2 rounded-md bg-teal-600 text-white font-semibold disabled:opacity-50"
        >
          Check placements
        </button>
      ) : (
        <div className="text-sm font-semibold">Score: {score}%</div>
      )}
    </div>
  );
}
