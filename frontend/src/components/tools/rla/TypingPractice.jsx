import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { TYPING_DRILLS } from './content/typingDrills';

function pickRandom(list, exclude = -1) {
  if (list.length <= 1) return 0;
  let i = Math.floor(Math.random() * list.length);
  while (i === exclude) i = Math.floor(Math.random() * list.length);
  return i;
}

/**
 * TypingPractice — pure typing drill with live WPM and character accuracy.
 * Logic ported from frontend/src/legacy/LegacyRootApp.jsx (~line 42830).
 */
export default function TypingPractice({ dark = false }) {
  const [drillIndex, setDrillIndex] = useState(() => pickRandom(TYPING_DRILLS));
  const [userText, setUserText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const inputRef = useRef(null);

  const target = TYPING_DRILLS[drillIndex];

  useEffect(() => {
    inputRef.current?.focus();
  }, [drillIndex]);

  const finished = endTime !== null;

  const stats = useMemo(() => {
    let correct = 0;
    const len = Math.min(userText.length, target.length);
    for (let i = 0; i < len; i++) {
      if (userText[i] === target[i]) correct++;
    }
    const totalTyped = userText.length;
    const accuracy =
      totalTyped === 0 ? 100 : Math.round((correct / totalTyped) * 100);
    const errors = totalTyped - correct;

    let wpm = 0;
    if (startTime) {
      const elapsedMin = ((endTime || Date.now()) - startTime) / 60000;
      // Standard WPM = characters / 5 / minutes
      if (elapsedMin > 0) wpm = Math.round(correct / 5 / elapsedMin);
    }
    return { accuracy, errors, wpm, correct, totalTyped };
  }, [userText, target, startTime, endTime]);

  // Update stats every second while typing so WPM ticks live.
  const [, force] = useState(0);
  useEffect(() => {
    if (!startTime || finished) return undefined;
    const id = setInterval(() => force((n) => n + 1), 500);
    return () => clearInterval(id);
  }, [startTime, finished]);

  const handleChange = useCallback(
    (e) => {
      if (finished) return;
      const value = e.target.value;
      if (!startTime && value.length > 0) setStartTime(Date.now());
      // Cap input at target length and detect completion.
      if (value.length >= target.length) {
        setUserText(value.slice(0, target.length));
        setEndTime(Date.now());
      } else {
        setUserText(value);
      }
    },
    [finished, startTime, target.length]
  );

  const reset = useCallback(() => {
    setUserText('');
    setStartTime(null);
    setEndTime(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const next = useCallback(() => {
    setDrillIndex((prev) => pickRandom(TYPING_DRILLS, prev));
    setUserText('');
    setStartTime(null);
    setEndTime(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const renderTarget = () => {
    return target.split('').map((ch, i) => {
      let cls = '';
      if (i < userText.length) {
        cls =
          userText[i] === ch
            ? dark
              ? 'text-emerald-300'
              : 'text-emerald-700'
            : dark
              ? 'bg-rose-700 text-white'
              : 'bg-rose-200 text-rose-900';
      } else if (i === userText.length) {
        cls = dark
          ? 'border-b-2 border-amber-300'
          : 'border-b-2 border-amber-500';
      } else {
        cls = dark ? 'text-slate-400' : 'text-slate-500';
      }
      return (
        <span key={i} className={cls}>
          {ch}
        </span>
      );
    });
  };

  const card = dark ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-900';
  const subtle = dark ? 'bg-slate-700' : 'bg-slate-50';

  return (
    <div className={`p-4 rounded-xl ${card}`}>
      <p className="text-sm opacity-80 mb-3">
        Type the sentence below as quickly and accurately as you can. WPM and
        accuracy update as you type.
      </p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <Stat label="WPM" value={stats.wpm} dark={dark} />
        <Stat label="Accuracy" value={`${stats.accuracy}%`} dark={dark} />
        <Stat label="Errors" value={stats.errors} dark={dark} />
      </div>

      <div
        className={`p-4 rounded-lg font-mono text-lg leading-relaxed mb-3 ${subtle}`}
        aria-label="Target text"
      >
        {renderTarget()}
      </div>

      <textarea
        ref={inputRef}
        value={userText}
        onChange={handleChange}
        rows={3}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        className={`w-full p-3 rounded-lg font-mono text-base outline-none focus:ring-2 focus:ring-amber-400 ${
          dark
            ? 'bg-slate-900 text-slate-100 border border-slate-700'
            : 'bg-white text-slate-900 border border-slate-300'
        }`}
        placeholder="Start typing here…"
        aria-label="Typing input"
        disabled={finished}
      />

      <div className="flex gap-2 mt-4 flex-wrap">
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 rounded-lg font-semibold bg-slate-500 hover:bg-slate-600 text-white transition"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={next}
          className="px-4 py-2 rounded-lg font-semibold bg-amber-500 hover:bg-amber-600 text-white transition"
        >
          New Sentence
        </button>
        {finished && (
          <span
            className={`self-center px-3 py-2 rounded-lg text-sm font-semibold ${
              dark
                ? 'bg-emerald-800 text-emerald-100'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            Finished — {stats.wpm} WPM at {stats.accuracy}% accuracy
          </span>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, dark }) {
  return (
    <div
      className={`p-3 rounded-lg text-center ${
        dark ? 'bg-slate-700' : 'bg-amber-50'
      }`}
    >
      <div className="text-xs uppercase tracking-wide opacity-70">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
