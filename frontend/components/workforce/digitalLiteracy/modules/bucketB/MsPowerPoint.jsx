/**
 * MsPowerPoint — slide deck builder with theme + speaker notes.
 */
import React, { useState } from 'react';
import { WindowFrame } from '../../_engine/Frame.jsx';
import Sequencer from '../../_engine/sims/Sequencer.jsx';

const STARTER = [
  { title: 'Title Slide', body: 'My Career Plan' },
  { title: 'Goals', body: '' },
  { title: 'Skills I Have', body: '' },
];

function Builder({ onComplete }) {
  const [slides, setSlides] = useState(STARTER);
  const [active, setActive] = useState(0);
  const [theme, setTheme] = useState('light');
  const [done, setDone] = useState({
    added: false,
    themed: false,
    filled: false,
  });

  function setSlide(i, patch) {
    setSlides((s) =>
      s.map((sl, idx) => (idx === i ? { ...sl, ...patch } : sl))
    );
  }
  function addSlide() {
    setSlides((s) => [...s, { title: 'New slide', body: '' }]);
    setActive(slides.length);
    setDone((d) => ({ ...d, added: true }));
  }

  React.useEffect(() => {
    const filled = slides.every((s) => s.title && s.body && s.body.length > 5);
    setDone((d) => {
      const n = { ...d, themed: theme !== 'light' || d.themed, filled };
      return n;
    });
  }, [slides, theme]);

  React.useEffect(() => {
    if (done.added && done.themed && done.filled) onComplete(100);
  }, [done, onComplete]);

  return (
    <div className="grid grid-cols-[120px_1fr] gap-2 p-2">
      <aside className="space-y-1">
        {slides.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`w-full p-1 text-[10px] rounded border ${
              active === i
                ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                : 'border-slate-300'
            } ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white'}`}
          >
            <div className="font-semibold truncate">{s.title}</div>
            <div className="opacity-60 truncate">{s.body || '—'}</div>
          </button>
        ))}
        <button
          type="button"
          onClick={addSlide}
          className="w-full mt-1 p-1 text-[10px] rounded bg-teal-600 text-white"
        >
          + Add slide
        </button>
      </aside>
      <main>
        <div className="flex gap-1 mb-2 text-xs">
          <span>Theme:</span>
          {['light', 'dark', 'blue'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTheme(t);
                setDone((d) => ({ ...d, themed: true }));
              }}
              className={`px-2 py-0.5 rounded border ${theme === t ? 'bg-teal-600 text-white border-teal-700' : 'border-slate-300'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div
          className={`aspect-[16/9] p-4 border border-slate-300 ${
            theme === 'dark'
              ? 'bg-slate-900 text-white'
              : theme === 'blue'
                ? 'bg-blue-700 text-white'
                : 'bg-white text-slate-900'
          }`}
        >
          <input
            type="text"
            value={slides[active]?.title || ''}
            onChange={(e) => setSlide(active, { title: e.target.value })}
            className="w-full bg-transparent text-2xl font-bold outline-none border-b border-current/30"
          />
          <textarea
            value={slides[active]?.body || ''}
            onChange={(e) => setSlide(active, { body: e.target.value })}
            rows={5}
            className="w-full mt-3 bg-transparent text-sm outline-none resize-none"
            placeholder="Add slide content..."
          />
        </div>
        <div className="text-xs mt-2 space-y-1 p-2 rounded bg-slate-50 dark:bg-slate-800">
          <div className={done.added ? 'text-green-600' : ''}>
            {done.added ? 'âœ“' : 'â—‹'} Add at least one new slide
          </div>
          <div className={done.themed ? 'text-green-600' : ''}>
            {done.themed ? 'âœ“' : 'â—‹'} Pick a non-default theme
          </div>
          <div className={done.filled ? 'text-green-600' : ''}>
            {done.filled ? 'âœ“' : 'â—‹'} Give every slide a title AND body (&gt;5
            chars)
          </div>
        </div>
      </main>
    </div>
  );
}

function Sim({ onComplete }) {
  const [s1, setS1] = useState(null);
  const [s2, setS2] = useState(null);
  React.useEffect(() => {
    if (s1 != null && s2 != null) onComplete(Math.round((s1 + s2) / 2));
  }, [s1, s2, onComplete]);
  return (
    <div className="space-y-6">
      <WindowFrame title="MyPlan.pptx — PowerPoint">
        <Builder onComplete={setS1} />
      </WindowFrame>
      <Sequencer
        prompt="Order the steps to deliver a slide presentation."
        items={[
          { id: 'a', label: 'Open the file' },
          { id: 'b', label: 'Click Slide Show â†’ From Beginning' },
          { id: 'c', label: 'Use arrow keys to advance slides' },
          { id: 'd', label: 'Press Esc to end' },
        ]}
        correctOrder={['a', 'b', 'c', 'd']}
        onComplete={setS2}
      />
    </div>
  );
}

export const MODULE = {
  id: 'b3_ms_powerpoint',
  title: 'Microsoft PowerPoint',
  standardId: 'NDL-B3',
  standardLabel: 'Core Digital Skills — Microsoft PowerPoint',
  bucket: 'B',
  intro:
    'PowerPoint helps you present ideas with slides. Build a short deck, change a theme, and learn how to give the show.',
  learningGoals: ['Add and edit slides', 'Apply a theme', 'Run a presentation'],
  simComponent: Sim,
  quiz: [
    {
      q: 'A "deck" in PowerPoint refers to:',
      choices: [
        'A new file format',
        'The collection of all slides',
        'The title slide',
        'Speaker notes',
      ],
      correct: 1,
    },
    {
      q: 'Which key starts the slideshow from the current slide?',
      choices: ['F1', 'F5', 'Shift+F5', 'Esc'],
      correct: 2,
    },
    {
      q: 'Speaker notes are visible to:',
      choices: [
        'Everyone in the audience',
        'Only the presenter (in Presenter View)',
        'Nobody',
        'Only when printed',
      ],
      correct: 1,
    },
    {
      q: 'Which slide layout is best for a comparison?',
      choices: ['Title only', 'Two content', 'Blank', 'Title slide'],
      correct: 1,
    },
    {
      q: 'Best practice for slide text is:',
      choices: [
        'Paragraphs of dense prose',
        'Short bullets and visuals',
        'No words at all',
        'Only your name',
      ],
      correct: 1,
    },
  ],
};

export default function MsPowerPoint() {
  return null;
}
