import React, { useMemo, useState } from 'react';
import KaTeXSpan from './KaTeXSpan';
import { GEOMETRY_PROBLEMS, GEOMETRY_TOPICS } from '../../../data/geometryProblems';

// Inline-SVG renderer for the small figure attached to image problems.
function ProblemFigure({ figure, dark }) {
  if (!figure) return null;
  const stroke = dark ? '#e2e8f0' : '#1e293b';
  const fill = dark ? 'rgba(96,165,250,0.18)' : 'rgba(59,130,246,0.15)';
  const labelFill = dark ? '#f8fafc' : '#0f172a';

  if (figure.shape === 'rectangle') {
    const { w, h } = figure.vals;
    const sw = Math.min(w * 12, 240);
    const sh = Math.min(h * 12, 160);
    return (
      <svg viewBox={`0 0 ${sw + 60} ${sh + 60}`} className="max-h-[180px]">
        <rect x="30" y="30" width={sw} height={sh} fill={fill} stroke={stroke} strokeWidth="2" />
        <text x={30 + sw / 2} y={30 + sh + 18} textAnchor="middle" fontSize="13" fill={labelFill}>{w}</text>
        <text x={30 + sw + 8} y={30 + sh / 2 + 4} fontSize="13" fill={labelFill}>{h}</text>
      </svg>
    );
  }
  if (figure.shape === 'right-triangle') {
    const { a, b } = figure.vals;
    const sa = Math.min(a * 18, 180);
    const sb = Math.min(b * 18, 240);
    return (
      <svg viewBox={`0 0 ${sb + 60} ${sa + 60}`} className="max-h-[200px]">
        <polygon
          points={`30,30 30,${30 + sa} ${30 + sb},${30 + sa}`}
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
        />
        <rect x="30" y={30 + sa - 10} width="10" height="10" fill="none" stroke={stroke} strokeWidth="1.5" />
        <text x="14" y={30 + sa / 2} fontSize="13" fill={labelFill}>{a}</text>
        <text x={30 + sb / 2} y={30 + sa + 18} textAnchor="middle" fontSize="13" fill={labelFill}>{b}</text>
      </svg>
    );
  }
  if (figure.shape === 'circle') {
    const { r } = figure.vals;
    const sr = Math.min(r * 14, 90);
    return (
      <svg viewBox={`0 0 ${sr * 2 + 60} ${sr * 2 + 60}`} className="max-h-[180px]">
        <circle cx={30 + sr} cy={30 + sr} r={sr} fill={fill} stroke={stroke} strokeWidth="2" />
        <line
          x1={30 + sr}
          y1={30 + sr}
          x2={30 + sr * 2}
          y2={30 + sr}
          stroke={stroke}
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <text x={30 + sr + sr / 2} y={30 + sr - 6} textAnchor="middle" fontSize="13" fill={labelFill}>r = {r}</text>
      </svg>
    );
  }
  if (figure.shape === 'trapezoid') {
    const { b1, b2, h } = figure.vals;
    const sb1 = Math.min(b1 * 18, 240);
    const sb2 = Math.min(b2 * 18, 240);
    const sh = Math.min(h * 18, 140);
    const offset = (sb1 - sb2) / 2;
    return (
      <svg viewBox={`0 0 ${sb1 + 60} ${sh + 60}`} className="max-h-[180px]">
        <polygon
          points={`${30 + offset},30 ${30 + offset + sb2},30 ${30 + sb1},${30 + sh} 30,${30 + sh}`}
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
        />
        <text x={30 + offset + sb2 / 2} y="22" textAnchor="middle" fontSize="13" fill={labelFill}>b₂ = {b2}</text>
        <text x={30 + sb1 / 2} y={30 + sh + 18} textAnchor="middle" fontSize="13" fill={labelFill}>b₁ = {b1}</text>
        <text x={30 + sb1 + 8} y={30 + sh / 2} fontSize="13" fill={labelFill}>h = {h}</text>
      </svg>
    );
  }
  if (figure.shape === 'rect-prism') {
    const { l, w, h } = figure.vals;
    const sl = Math.min(l * 18, 180);
    const sw = Math.min(w * 18, 130);
    const sh = Math.min(h * 18, 110);
    const dx = sw * 0.55;
    const dy = -sw * 0.35;
    return (
      <svg viewBox={`0 0 ${sl + dx + 60} ${sh - dy + 60}`} className="max-h-[200px]">
        <rect x="30" y={30 - dy} width={sl} height={sh} fill={fill} stroke={stroke} strokeWidth="2" />
        <polygon
          points={`30,${30 - dy} ${30 + dx},30 ${30 + dx + sl},30 ${30 + sl},${30 - dy}`}
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
        />
        <polygon
          points={`${30 + sl},${30 - dy} ${30 + dx + sl},30 ${30 + dx + sl},${30 + sh - dy} ${30 + sl},${30 + sh}`}
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
        />
        <text x={30 + sl / 2} y={30 + sh - dy + 18} textAnchor="middle" fontSize="13" fill={labelFill}>l = {l}</text>
        <text x={30 + sl + dx + 6} y={30 + sh / 2 - dy} fontSize="13" fill={labelFill}>h = {h}</text>
        <text x={30 + sl + dx / 2 + 6} y={26 - dy} fontSize="13" fill={labelFill}>w = {w}</text>
      </svg>
    );
  }
  if (figure.shape === 'cylinder') {
    const { r, h } = figure.vals;
    const sr = Math.min(r * 18, 70);
    const sh = Math.min(h * 14, 180);
    const ery = sr * 0.35;
    return (
      <svg viewBox={`0 0 ${sr * 2 + 60} ${sh + ery * 2 + 60}`} className="max-h-[220px]">
        <ellipse cx={30 + sr} cy={30 + ery} rx={sr} ry={ery} fill={fill} stroke={stroke} strokeWidth="2" />
        <line x1="30" y1={30 + ery} x2="30" y2={30 + sh + ery} stroke={stroke} strokeWidth="2" />
        <line x1={30 + sr * 2} y1={30 + ery} x2={30 + sr * 2} y2={30 + sh + ery} stroke={stroke} strokeWidth="2" />
        <ellipse cx={30 + sr} cy={30 + sh + ery} rx={sr} ry={ery} fill={fill} stroke={stroke} strokeWidth="2" />
        <text x={30 + sr} y={30 + ery + 4} textAnchor="middle" fontSize="12" fill={labelFill}>r = {r}</text>
        <text x={30 + sr * 2 + 6} y={30 + sh / 2 + ery} fontSize="13" fill={labelFill}>h = {h}</text>
      </svg>
    );
  }
  if (figure.shape === 'parallel-lines') {
    const { angle } = figure.vals;
    const cx1 = 220;
    const cy1 = 60;
    const cx2 = cx1 + (180 - 60) / Math.tan((angle * Math.PI) / 180);
    const cy2 = 180;
    return (
      <svg viewBox="0 0 460 240" className="max-h-[220px]">
        <line x1="20" y1="60" x2="440" y2="60" stroke={stroke} strokeWidth="2" />
        <line x1="20" y1="180" x2="440" y2="180" stroke={stroke} strokeWidth="2" />
        <line x1={cx1 - 80} y1={cy1 - 80 * (cy2 - cy1) / (cx2 - cx1)} x2={cx2 + 80} y2={cy2 + 80 * (cy2 - cy1) / (cx2 - cx1)} stroke={dark ? '#60a5fa' : '#2563eb'} strokeWidth="2" />
        <text x={cx1 + 30} y={cy1 - 8} fontSize="14" fontWeight="bold" fill={dark ? '#fbbf24' : '#d97706'}>{angle}°</text>
        <circle cx={cx1} cy={cy1} r="3" fill={labelFill} />
        <circle cx={cx2} cy={cy2} r="3" fill={labelFill} />
      </svg>
    );
  }
  return null;
}

const STORAGE_KEY = 'geometryPractice:topic';

export default function GeometryPracticePanel({ dark = false }) {
  const [topic, setTopic] = useState(() => {
    if (typeof window === 'undefined') return 'All';
    return window.sessionStorage?.getItem(STORAGE_KEY) || 'All';
  });
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState({ correct: 0, attempted: 0 });

  const filtered = useMemo(
    () => (topic === 'All' ? GEOMETRY_PROBLEMS : GEOMETRY_PROBLEMS.filter((p) => p.topic === topic)),
    [topic],
  );

  const safeIdx = filtered.length === 0 ? 0 : idx % filtered.length;
  const problem = filtered[safeIdx];

  const choose = (i) => {
    if (revealed) return;
    setPicked(i);
    setRevealed(true);
    setStats((s) => ({
      correct: s.correct + (i === problem.correct ? 1 : 0),
      attempted: s.attempted + 1,
    }));
  };

  const next = () => {
    setIdx((i) => (i + 1) % Math.max(filtered.length, 1));
    setPicked(null);
    setRevealed(false);
  };
  const prev = () => {
    setIdx((i) => (i - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
    setPicked(null);
    setRevealed(false);
  };

  const setTopicSafe = (t) => {
    setTopic(t);
    if (typeof window !== 'undefined') window.sessionStorage?.setItem(STORAGE_KEY, t);
    setIdx(0);
    setPicked(null);
    setRevealed(false);
  };

  if (!problem) {
    return (
      <p className={`p-4 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
        No problems found for this topic.
      </p>
    );
  }

  const cardCls = `rounded-lg p-4 ${
    dark ? 'bg-slate-800 border border-slate-700' : 'bg-slate-50 border border-slate-200'
  }`;
  const choiceBase = `w-full text-left px-3 py-2 rounded border transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    dark ? 'border-slate-600' : 'border-slate-300'
  }`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        {GEOMETRY_TOPICS.map((t) => {
          const active = t === topic;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTopicSafe(t)}
              aria-pressed={active}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                active
                  ? 'bg-blue-600 text-white'
                  : dark
                    ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          );
        })}
        <span className={`ml-auto text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          {stats.correct}/{stats.attempted} correct · Q {safeIdx + 1} of {filtered.length}
        </span>
      </div>

      <div className={cardCls}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span
              className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${
                dark ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {problem.topic}
            </span>
            <span className={`ml-2 text-[10px] uppercase ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              {problem.kind === 'image' ? 'figure question' : 'word problem'}
            </span>
          </div>
        </div>

        {problem.kind === 'image' && problem.figure && (
          <div className="mb-3 flex justify-center">
            <ProblemFigure figure={problem.figure} dark={dark} />
          </div>
        )}

        <p className={`text-base mb-3 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>
          {problem.prompt}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          {problem.choices.map((c, i) => {
            const isCorrect = i === problem.correct;
            const isPicked = i === picked;
            let cls = '';
            if (revealed) {
              if (isCorrect) cls = dark ? 'bg-emerald-900/40 border-emerald-500 text-emerald-100' : 'bg-emerald-100 border-emerald-500 text-emerald-900';
              else if (isPicked) cls = dark ? 'bg-red-900/40 border-red-500 text-red-100' : 'bg-red-100 border-red-500 text-red-900';
              else cls = dark ? 'bg-slate-900 text-slate-300' : 'bg-white text-slate-700';
            } else {
              cls = dark ? 'bg-slate-900 text-slate-100 hover:bg-slate-700' : 'bg-white text-slate-800 hover:bg-slate-100';
            }
            return (
              <button
                key={i}
                type="button"
                onClick={() => choose(i)}
                disabled={revealed}
                className={`${choiceBase} ${cls}`}
              >
                <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>
                {c}
                {revealed && isCorrect && <span className="ml-2">✓</span>}
                {revealed && isPicked && !isCorrect && <span className="ml-2">✗</span>}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div
            className={`p-3 rounded text-sm space-y-2 ${
              dark ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-slate-200'
            }`}
          >
            <p>
              <strong>Explanation:</strong> {problem.explanation}
            </p>
            {problem.formula && (
              <p>
                <strong>Formula:</strong> <KaTeXSpan tex={problem.formula} />
              </p>
            )}
          </div>
        )}

        <div className="flex gap-2 mt-3">
          <button
            type="button"
            onClick={prev}
            className={`px-3 py-1.5 rounded text-sm font-semibold ${
              dark ? 'bg-slate-700 hover:bg-slate-600 text-slate-100' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
            }`}
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={next}
            className="ml-auto px-4 py-1.5 rounded text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
