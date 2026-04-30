import React, { useState, useCallback } from 'react';
import { EVIDENCE_ITEMS } from './content/evidenceItems';

export default function EvidenceHighlighter({ dark = false }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const item = EVIDENCE_ITEMS[step % EVIDENCE_ITEMS.length];

  const submit = useCallback(() => {
    if (picked === null || submitted) return;
    const correct = picked === item.correctIndex;
    setScore((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      total: s.total + 1,
    }));
    setSubmitted(true);
  }, [picked, submitted, item]);

  const next = useCallback(() => {
    setStep((s) => s + 1);
    setPicked(null);
    setSubmitted(false);
  }, []);

  const card = dark ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-900';
  const subtle = dark ? 'bg-slate-700' : 'bg-slate-50';

  return (
    <div className={`p-4 rounded-xl ${card}`}>
      <p className="text-sm opacity-80 mb-3">
        Read the claim, then click the sentence in the passage that best
        supports it.
      </p>

      <div className="flex items-center justify-between mb-3 text-sm">
        <span className="opacity-70">
          Passage {(step % EVIDENCE_ITEMS.length) + 1} of{' '}
          {EVIDENCE_ITEMS.length}
        </span>
        <span className="font-semibold">
          Score: {score.correct} / {score.total}
        </span>
      </div>

      <div
        className={`p-3 rounded-lg mb-4 border-l-4 ${dark ? 'bg-slate-700 border-amber-400' : 'bg-amber-50 border-amber-500'}`}
      >
        <span className="text-xs uppercase tracking-wide font-bold opacity-70">
          Claim
        </span>
        <p className="font-medium mt-1">{item.claim}</p>
      </div>

      <div className={`p-4 rounded-lg mb-4 ${subtle}`}>
        <p className="leading-relaxed">
          {item.sentences.map((s, i) => {
            let style = dark
              ? 'cursor-pointer hover:bg-slate-600 px-1 rounded'
              : 'cursor-pointer hover:bg-slate-200 px-1 rounded';
            if (submitted) {
              if (i === item.correctIndex) {
                style = dark
                  ? 'px-1 rounded bg-emerald-700 text-white'
                  : 'px-1 rounded bg-emerald-200 text-emerald-900';
              } else if (i === picked) {
                style = dark
                  ? 'px-1 rounded bg-rose-700 text-white'
                  : 'px-1 rounded bg-rose-200 text-rose-900';
              } else {
                style = 'px-1 rounded opacity-60';
              }
            } else if (i === picked) {
              style = dark
                ? 'px-1 rounded bg-indigo-700 text-white cursor-pointer'
                : 'px-1 rounded bg-indigo-200 text-indigo-900 cursor-pointer';
            }
            return (
              <span
                key={i}
                role="button"
                tabIndex={0}
                onClick={() => !submitted && setPicked(i)}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !submitted) {
                    e.preventDefault();
                    setPicked(i);
                  }
                }}
                className={style}
              >
                {s}{' '}
              </span>
            );
          })}
        </p>
      </div>

      {submitted && (
        <div
          className={`p-3 rounded-lg mb-4 text-sm ${
            picked === item.correctIndex
              ? dark
                ? 'bg-emerald-800 text-emerald-100'
                : 'bg-emerald-50 text-emerald-900'
              : dark
                ? 'bg-rose-800 text-rose-100'
                : 'bg-rose-50 text-rose-900'
          }`}
        >
          <div className="font-bold mb-1">
            {picked === item.correctIndex
              ? 'Correct!'
              : 'The strongest sentence is highlighted in green.'}
          </div>
          <div>{item.explanation}</div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {!submitted ? (
          <button
            type="button"
            onClick={submit}
            disabled={picked === null}
            className="px-4 py-2 rounded-lg font-semibold text-white bg-amber-600 hover:bg-amber-700 transition disabled:opacity-50"
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="px-4 py-2 rounded-lg font-semibold bg-slate-600 hover:bg-slate-700 text-white transition"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
