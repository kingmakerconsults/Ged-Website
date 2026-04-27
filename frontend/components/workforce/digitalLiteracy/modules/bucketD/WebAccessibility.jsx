/**
 * WebAccessibility — using assistive features + producing accessible content.
 */
import React, { useState } from 'react';
import Triage from '../../_engine/sims/Triage.jsx';
import Sortable from '../../_engine/sims/Sortable.jsx';

function ContrastSim({ onComplete }) {
  const [fg, setFg] = useState('#888888');
  const [bg, setBg] = useState('#ffffff');
  function lum(hex) {
    const c = hex.replace('#', '');
    const r = parseInt(c.slice(0, 2), 16) / 255;
    const g = parseInt(c.slice(2, 4), 16) / 255;
    const b = parseInt(c.slice(4, 6), 16) / 255;
    const f = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  }
  function ratio(a, b) {
    const la = lum(a);
    const lb = lum(b);
    const [hi, lo] = la > lb ? [la, lb] : [lb, la];
    return ((hi + 0.05) / (lo + 0.05)).toFixed(2);
  }
  const r = parseFloat(ratio(fg, bg));
  React.useEffect(() => {
    if (r >= 4.5) onComplete(100);
  }, [r, onComplete]);
  return (
    <div className="p-3 space-y-2 text-sm">
      <div className="font-semibold">
        Adjust colors until contrast ratio â‰¥ 4.5 (WCAG AA for body text)
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-xs">
          Text
          <input
            type="color"
            value={fg}
            onChange={(e) => setFg(e.target.value)}
            className="ml-1"
          />
        </label>
        <label className="text-xs">
          Background
          <input
            type="color"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            className="ml-1"
          />
        </label>
        <span
          className={`text-xs px-2 py-0.5 rounded ${r >= 4.5 ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}
        >
          Ratio: {r}
        </span>
      </div>
      <div
        className="p-3 rounded text-base"
        style={{ background: bg, color: fg }}
      >
        Sample text — can you read me clearly?
      </div>
    </div>
  );
}

function Sim({ onComplete }) {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [c, setC] = useState(null);
  React.useEffect(() => {
    if (a != null && b != null && c != null)
      onComplete(Math.round((a + b + c) / 3));
  }, [a, b, c, onComplete]);
  return (
    <div className="space-y-6">
      <ContrastSim onComplete={setA} />
      <Triage
        prompt="Pick the best alt text for each image."
        labels={[
          { key: 'good', name: 'Good alt' },
          { key: 'bad', name: 'Bad alt' },
        ]}
        items={[
          {
            id: '1',
            content: 'Image of a chart. alt=""',
            correct: 'bad',
            rationale: 'Decorative? Maybe — but a chart needs a description.',
          },
          {
            id: '2',
            content: 'Logo image. alt="image123.png"',
            correct: 'bad',
            rationale: 'Filename is meaningless.',
          },
          {
            id: '3',
            content:
              'Profile photo of nurse. alt="Nurse Maria Lopez, smiling, in scrubs"',
            correct: 'good',
            rationale: 'Brief, descriptive.',
          },
          {
            id: '4',
            content:
              'Bar chart of sales by month. alt="Bar chart: Jan 100, Feb 200, Mar 150"',
            correct: 'good',
            rationale: 'Conveys the data the chart shows.',
          },
        ]}
        onComplete={setB}
      />
      <Sortable
        prompt="Match accessibility need â†’ assistive feature."
        buckets={[
          { key: 'sr', name: 'Screen reader' },
          { key: 'capt', name: 'Captions / transcripts' },
          { key: 'kbd', name: 'Keyboard navigation' },
          { key: 'zoom', name: 'OS zoom / magnifier' },
        ]}
        items={[
          { id: 'a', label: 'User who is blind', correctBucket: 'sr' },
          {
            id: 'b',
            label: 'User who is deaf or hard-of-hearing',
            correctBucket: 'capt',
          },
          {
            id: 'c',
            label: 'User who cannot use a mouse',
            correctBucket: 'kbd',
          },
          { id: 'd', label: 'User with low vision', correctBucket: 'zoom' },
        ]}
        onComplete={setC}
      />
    </div>
  );
}

export const MODULE = {
  id: 'd4_web_accessibility',
  title: 'Web Accessibility',
  standardId: 'BEYOND-D4',
  standardLabel: 'Pro Track — Web Accessibility',
  bucket: 'D',
  intro:
    'Make and use the web for everyone: contrast, alt text, keyboard navigation, captions.',
  learningGoals: [
    'Use OS assistive features (zoom, captions, screen reader)',
    'Write good alt text',
    'Hit basic color-contrast targets',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'WCAG AA contrast for body text is at least:',
      choices: ['1:1', '3:1', '4.5:1', '21:1'],
      correct: 2,
    },
    {
      q: 'Alt text on a decorative image should be:',
      choices: [
        'A long description',
        'The filename',
        'Empty (alt="")',
        'Random',
      ],
      correct: 2,
    },
    {
      q: 'Captions help users who are:',
      choices: [
        'Blind',
        'Deaf or hard-of-hearing',
        'Color blind',
        'On dial-up',
      ],
      correct: 1,
    },
    {
      q: 'You should be able to use most web pages with only the:',
      choices: ['Mouse', 'Keyboard', 'Webcam', 'Microphone'],
      correct: 1,
    },
    {
      q: 'A screen reader is used by:',
      choices: [
        'Designers only',
        'Blind / low-vision users',
        'Children only',
        'Robots',
      ],
      correct: 1,
    },
  ],
};

export default function WebAccessibility() {
  return null;
}
