import React, { useState, useMemo, useCallback } from 'react';

/**
 * McqDeck — shared single-question-at-a-time MCQ runner used by several
 * RLA practice tools (Grammar, Vocab, Transition, Sentence Combiner,
 * Punctuation Fix).
 *
 * Each item: { id, prompt (string|node), options: [{text, correct, rationale?}], explanation? }
 *
 * Props:
 *   items     — array of question objects
 *   dark      — boolean
 *   accent    — Tailwind color class for the "Submit" button (e.g. 'bg-indigo-600')
 *   intro     — optional small string shown above the question card
 *   renderPrompt(item) — optional custom renderer for the prompt area
 */
export default function McqDeck({
  items,
  dark = false,
  accent = 'bg-indigo-600 hover:bg-indigo-700',
  intro = null,
  renderPrompt = null,
}) {
  const order = useMemo(() => shuffle(items.map((_, i) => i)), [items]);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const idx = order[step];
  const item = items[idx];

  const submit = useCallback(() => {
    if (picked === null || submitted) return;
    const correct = item.options[picked]?.correct === true;
    setScore((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      total: s.total + 1,
    }));
    setSubmitted(true);
  }, [picked, submitted, item]);

  const next = useCallback(() => {
    setStep((s) => (s + 1) % order.length);
    setPicked(null);
    setSubmitted(false);
  }, [order.length]);

  const card = dark ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-900';
  const subtle = dark ? 'bg-slate-700' : 'bg-slate-50';

  const renderedPrompt = renderPrompt ? (
    renderPrompt(item)
  ) : (
    <p className="text-base font-medium leading-relaxed">{item.prompt}</p>
  );

  return (
    <div className={`p-4 rounded-xl ${card}`}>
      {intro && <p className="text-sm opacity-80 mb-3">{intro}</p>}

      <div className="flex items-center justify-between mb-3 text-sm">
        <span className="opacity-70">
          Question {step + 1} of {order.length}
        </span>
        <span className="font-semibold">
          Score: {score.correct} / {score.total}
        </span>
      </div>

      <div className={`p-4 rounded-lg mb-4 ${subtle}`}>{renderedPrompt}</div>

      <div className="space-y-2 mb-4">
        {item.options.map((opt, i) => {
          let style = dark
            ? 'bg-slate-700 hover:bg-slate-600'
            : 'bg-slate-100 hover:bg-slate-200';
          if (submitted) {
            if (opt.correct) {
              style = dark
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-200 text-emerald-900';
            } else if (i === picked) {
              style = dark
                ? 'bg-rose-700 text-white'
                : 'bg-rose-200 text-rose-900';
            } else {
              style = dark
                ? 'bg-slate-700 opacity-70'
                : 'bg-slate-100 opacity-70';
            }
          } else if (i === picked) {
            style = dark
              ? 'bg-indigo-700 text-white'
              : 'bg-indigo-200 text-indigo-900';
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => !submitted && setPicked(i)}
              disabled={submitted}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${style}`}
            >
              {String.fromCharCode(65 + i)}. {opt.text}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div
          className={`p-3 rounded-lg mb-4 text-sm ${
            item.options[picked]?.correct
              ? dark
                ? 'bg-emerald-800 text-emerald-100'
                : 'bg-emerald-50 text-emerald-900'
              : dark
                ? 'bg-rose-800 text-rose-100'
                : 'bg-rose-50 text-rose-900'
          }`}
        >
          <div className="font-bold mb-1">
            {item.options[picked]?.correct ? 'Correct!' : 'Not quite.'}
          </div>
          <div>
            {item.options[picked]?.rationale ||
              item.explanation ||
              (item.options[picked]?.correct
                ? 'Nice work.'
                : 'Review the highlighted choice and try the next one.')}
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {!submitted ? (
          <button
            type="button"
            onClick={submit}
            disabled={picked === null}
            className={`px-4 py-2 rounded-lg font-semibold text-white transition ${accent} disabled:opacity-50`}
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

function shuffle(arr) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
