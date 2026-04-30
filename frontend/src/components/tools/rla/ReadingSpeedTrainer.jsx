import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { SPEED_PASSAGES } from './content/speedPassages';

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function ReadingSpeedTrainer({ dark = false }) {
  const [step, setStep] = useState(0);
  const passage = SPEED_PASSAGES[step % SPEED_PASSAGES.length];
  const words = useMemo(() => wordCount(passage.text), [passage]);

  const [phase, setPhase] = useState('ready'); // ready | reading | quiz | done
  const [startTime, setStartTime] = useState(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [picked, setPicked] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const tickRef = useRef(null);

  const question = passage.questions[0];

  useEffect(() => {
    if (phase !== 'reading') return undefined;
    tickRef.current = setInterval(() => {
      setElapsedMs(Date.now() - startTime);
    }, 200);
    return () => clearInterval(tickRef.current);
  }, [phase, startTime]);

  const start = useCallback(() => {
    setStartTime(Date.now());
    setElapsedMs(0);
    setPhase('reading');
    setPicked(null);
    setSubmitted(false);
  }, []);

  const finishReading = useCallback(() => {
    setElapsedMs(Date.now() - startTime);
    setPhase('quiz');
  }, [startTime]);

  const submitAnswer = useCallback(() => {
    if (picked === null) return;
    const correct = question.options[picked]?.correct === true;
    if (correct) setCorrectCount((c) => c + 1);
    setSubmitted(true);
    setPhase('done');
  }, [picked, question]);

  const nextPassage = useCallback(() => {
    setStep((s) => s + 1);
    setPhase('ready');
    setStartTime(null);
    setElapsedMs(0);
    setPicked(null);
    setSubmitted(false);
  }, []);

  const minutes = elapsedMs / 60000;
  const wpm = minutes > 0 ? Math.round(words / minutes) : 0;
  const seconds = Math.floor(elapsedMs / 1000);

  const card = dark ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-900';
  const subtle = dark ? 'bg-slate-700' : 'bg-slate-50';

  return (
    <div className={`p-4 rounded-xl ${card}`}>
      <div className="flex items-center justify-between mb-3 text-sm">
        <span className="opacity-70">
          Passage {(step % SPEED_PASSAGES.length) + 1} of{' '}
          {SPEED_PASSAGES.length}
          {' \u00b7 '}
          {words} words
        </span>
        <span className="font-semibold">
          Comprehension score: {correctCount}
        </span>
      </div>

      <h3 className="text-lg font-bold mb-2">{passage.title}</h3>

      {phase === 'ready' && (
        <div className={`p-4 rounded-lg mb-4 ${subtle}`}>
          <p className="mb-3">
            Click <strong>Start</strong> to reveal the passage and start the
            timer. When you finish reading, click <strong>Done reading</strong>{' '}
            to answer a quick comprehension question.
          </p>
          <button
            type="button"
            onClick={start}
            className="px-4 py-2 rounded-lg font-semibold bg-amber-600 hover:bg-amber-700 text-white"
          >
            Start
          </button>
        </div>
      )}

      {phase === 'reading' && (
        <>
          <div
            className={`p-4 rounded-lg mb-3 whitespace-pre-line leading-relaxed ${subtle}`}
          >
            {passage.text}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-80">Timer: {seconds}s</span>
            <button
              type="button"
              onClick={finishReading}
              className="px-4 py-2 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Done reading
            </button>
          </div>
        </>
      )}

      {(phase === 'quiz' || phase === 'done') && (
        <>
          <div className={`p-3 rounded-lg mb-3 ${subtle}`}>
            <p className="text-sm">
              Your reading time: <strong>{seconds}s</strong> ({wpm} words per
              minute).
            </p>
          </div>

          <div className={`p-4 rounded-lg mb-3 ${subtle}`}>
            <p className="font-semibold mb-3">{question.prompt}</p>
            <div className="space-y-2">
              {question.options.map((opt, i) => {
                let style = dark
                  ? 'bg-slate-600 hover:bg-slate-500'
                  : 'bg-white hover:bg-slate-100 border border-slate-300';
                if (submitted) {
                  if (opt.correct) {
                    style = dark
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-200 text-emerald-900';
                  } else if (i === picked) {
                    style = dark
                      ? 'bg-rose-700 text-white'
                      : 'bg-rose-200 text-rose-900';
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
                    className={`w-full text-left px-3 py-2 rounded-md transition ${style}`}
                  >
                    {String.fromCharCode(65 + i)}. {opt.text}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="text-sm mt-3 opacity-90">
                {question.options[picked]?.rationale}
              </p>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {!submitted ? (
              <button
                type="button"
                onClick={submitAnswer}
                disabled={picked === null}
                className="px-4 py-2 rounded-lg font-semibold bg-amber-600 hover:bg-amber-700 text-white transition disabled:opacity-50"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={nextPassage}
                className="px-4 py-2 rounded-lg font-semibold bg-slate-600 hover:bg-slate-700 text-white transition"
              >
                Next passage →
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
