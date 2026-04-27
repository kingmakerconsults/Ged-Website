/**
 * sims/Hotspot.jsx — click the correct regions of a labeled diagram.
 *
 * props:
 *   prompt: string
 *   diagram: JSX (the visual)
 *   regions: [{ id, label, correct: bool, x, y, w, h }]   // % units relative to box
 *   onComplete(score 0..100)
 *
 * Score = (correct picks - wrong picks) / total correct, clamped 0..100.
 */
import React, { useMemo, useState } from 'react';

export default function Hotspot({
  prompt,
  diagram,
  regions,
  onComplete,
  requiredCount,
}) {
  const [picked, setPicked] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);

  const correctIds = regions.filter((r) => r.correct).map((r) => r.id);

  function toggle(id) {
    if (submitted) return;
    setPicked((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  const score = useMemo(() => {
    const goodPicked = correctIds.filter((id) => picked.has(id)).length;
    const badPicked = [...picked].filter(
      (id) => !correctIds.includes(id)
    ).length;
    const denom = requiredCount || correctIds.length;
    const raw = ((goodPicked - badPicked) / denom) * 100;
    return Math.max(0, Math.min(100, Math.round(raw)));
  }, [picked, correctIds, requiredCount]);

  function submit() {
    setSubmitted(true);
    onComplete?.(score);
  }

  return (
    <div className="hotspot space-y-3">
      <p className="text-sm text-slate-700 dark:text-slate-200">{prompt}</p>
      <div
        className="relative inline-block w-full max-w-2xl rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden"
        style={{ aspectRatio: '16 / 9' }}
      >
        <div className="absolute inset-0">{diagram}</div>
        {regions.map((r) => {
          const isPicked = picked.has(r.id);
          const correct = r.correct;
          let cls =
            'absolute rounded outline outline-2 cursor-pointer transition focus:outline-teal-500';
          if (submitted) {
            if (isPicked && correct)
              cls += ' outline-green-500 bg-green-400/30';
            else if (isPicked && !correct)
              cls += ' outline-red-500 bg-red-400/30';
            else if (!isPicked && correct)
              cls += ' outline-amber-500 bg-amber-300/20';
            else cls += ' outline-transparent';
          } else {
            cls += isPicked
              ? ' outline-teal-500 bg-teal-400/20'
              : ' outline-slate-400/40 hover:outline-teal-400 hover:bg-teal-400/10';
          }
          return (
            <button
              key={r.id}
              type="button"
              aria-label={r.label}
              onClick={() => toggle(r.id)}
              className={cls}
              style={{
                left: `${r.x}%`,
                top: `${r.y}%`,
                width: `${r.w}%`,
                height: `${r.h}%`,
              }}
            />
          );
        })}
      </div>
      <div className="text-xs opacity-70">
        Selected: {picked.size}
        {submitted ? ` · Score: ${score}%` : ''}
      </div>
      {!submitted ? (
        <button
          type="button"
          disabled={picked.size === 0}
          onClick={submit}
          className="px-4 py-2 rounded-md bg-teal-600 text-white font-semibold disabled:opacity-50"
        >
          Check selections
        </button>
      ) : null}
      {submitted ? (
        <ul className="text-xs space-y-1">
          {regions.map((r) => {
            const isPicked = picked.has(r.id);
            return (
              <li
                key={r.id}
                className={
                  r.correct
                    ? isPicked
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-amber-700 dark:text-amber-300'
                    : isPicked
                      ? 'text-red-700 dark:text-red-300'
                      : 'opacity-60'
                }
              >
                {r.correct ? (isPicked ? '✓' : '○') : isPicked ? '✗' : '·'}{' '}
                {r.label}
                {r.correct && !isPicked ? ' (you missed this)' : ''}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
