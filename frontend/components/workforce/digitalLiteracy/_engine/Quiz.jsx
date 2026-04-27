/**
 * Quiz.jsx — short multiple-choice check used at the end of each module.
 * Returns a score 0..100 to onComplete.
 */
import React, { useMemo, useState } from 'react';

export default function Quiz({ questions, onComplete, allowReview = true }) {
  const [idx, setIdx] = useState(0);
  const [picks, setPicks] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const total = questions.length;
  const current = questions[idx];

  const score = useMemo(() => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (picks[i] === q.correct) correct += 1;
    });
    return Math.round((correct / total) * 100);
  }, [picks, questions, total]);

  function pick(choice) {
    if (submitted) return;
    setPicks((p) => ({ ...p, [idx]: choice }));
  }

  function submit() {
    setSubmitted(true);
    onComplete?.(score);
  }

  if (submitted && allowReview) {
    return (
      <div className="quiz-review space-y-4">
        <div className="rounded-lg p-4 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700">
          <div className="font-bold text-lg">Score: {score}%</div>
          <div className="text-sm opacity-80">
            {score >= 85
              ? 'Mastered — certificate available.'
              : 'Below mastery (85%). Review and try again to earn the certificate.'}
          </div>
        </div>
        <ol className="space-y-3">
          {questions.map((q, i) => {
            const userPick = picks[i];
            const correct = userPick === q.correct;
            return (
              <li
                key={i}
                className={`rounded-lg border p-3 ${
                  correct
                    ? 'border-green-300 bg-green-50 dark:bg-green-900/20'
                    : 'border-red-300 bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <div className="font-medium mb-1">
                  {i + 1}. {q.q}
                </div>
                <div className="text-xs">
                  Your answer: {q.choices[userPick] || '(none)'} —{' '}
                  <strong>{correct ? 'Correct' : 'Incorrect'}</strong>
                </div>
                {!correct ? (
                  <div className="text-xs mt-1">
                    Correct: {q.choices[q.correct]}
                  </div>
                ) : null}
                {q.rationale ? (
                  <div className="text-xs mt-1 opacity-80">{q.rationale}</div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  return (
    <div className="quiz space-y-4" role="group" aria-label="Knowledge check">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Question {idx + 1} of {total}
        </span>
        <span>{Object.keys(picks).length} answered</span>
      </div>
      <h3 className="font-semibold text-lg">{current.q}</h3>
      <ul className="space-y-2">
        {current.choices.map((c, ci) => {
          const checked = picks[idx] === ci;
          return (
            <li key={ci}>
              <button
                type="button"
                onClick={() => pick(ci)}
                className={`w-full text-left rounded-lg border px-3 py-2 transition ${
                  checked
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30'
                    : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                aria-pressed={checked}
              >
                <span className="font-mono text-xs mr-2">
                  {String.fromCharCode(65 + ci)}.
                </span>
                {c}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-between">
        <button
          type="button"
          disabled={idx === 0}
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 disabled:opacity-50"
        >
          ← Prev
        </button>
        {idx < total - 1 ? (
          <button
            type="button"
            disabled={picks[idx] == null}
            onClick={() => setIdx((i) => i + 1)}
            className="px-3 py-1.5 rounded-md bg-teal-600 text-white disabled:opacity-50"
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            disabled={Object.keys(picks).length < total}
            onClick={submit}
            className="px-3 py-1.5 rounded-md bg-teal-600 text-white disabled:opacity-50"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
