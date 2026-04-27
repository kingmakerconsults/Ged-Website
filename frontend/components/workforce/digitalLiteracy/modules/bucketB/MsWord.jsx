/**
 * MsWord — formatting toolbar + scripted document checks.
 */
import React, { useState } from 'react';
import { WindowFrame } from '../../_engine/Frame.jsx';
import Triage from '../../_engine/sims/Triage.jsx';

const SAMPLE = `Dear Hiring Manager,

I am applying for the Cashier role posted on your website. I have two years of customer-service experience and am available immediately.

Sincerely,
Jane Doe`;

function Editor({ onComplete }) {
  const [text, setText] = useState(SAMPLE);
  const [bold, setBold] = useState({ start: -1, end: -1 });
  const [boldOn, setBoldOn] = useState(false);
  const [bullets, setBullets] = useState(false);
  const [align, setAlign] = useState('left');
  const [tasks, setTasks] = useState({
    bold: false,
    bullets: false,
    center: false,
  });

  function bumpBold() {
    setBoldOn(true);
    setTasks((t) => ({ ...t, bold: true }));
  }
  function bumpBullets() {
    setBullets(true);
    setTasks((t) => ({ ...t, bullets: true }));
  }
  function bumpCenter() {
    setAlign('center');
    setTasks((t) => ({ ...t, center: true }));
  }

  React.useEffect(() => {
    if (tasks.bold && tasks.bullets && tasks.center) {
      onComplete(100);
    }
  }, [tasks, onComplete]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">
        <button
          type="button"
          onClick={bumpBold}
          className={`px-2 py-1 rounded font-bold ${boldOn ? 'bg-teal-600 text-white' : 'border border-slate-300'}`}
        >
          B
        </button>
        <button
          type="button"
          className="px-2 py-1 rounded italic border border-slate-300"
        >
          I
        </button>
        <button
          type="button"
          className="px-2 py-1 rounded underline border border-slate-300"
        >
          U
        </button>
        <span className="border-l border-slate-300 mx-1" />
        <button
          type="button"
          onClick={() => setAlign('left')}
          className={`px-2 py-1 rounded ${align === 'left' ? 'bg-teal-600 text-white' : 'border border-slate-300'}`}
        >
          â‰¡L
        </button>
        <button
          type="button"
          onClick={bumpCenter}
          className={`px-2 py-1 rounded ${align === 'center' ? 'bg-teal-600 text-white' : 'border border-slate-300'}`}
        >
          â‰¡C
        </button>
        <button
          type="button"
          onClick={() => setAlign('right')}
          className={`px-2 py-1 rounded ${align === 'right' ? 'bg-teal-600 text-white' : 'border border-slate-300'}`}
        >
          â‰¡R
        </button>
        <span className="border-l border-slate-300 mx-1" />
        <button
          type="button"
          onClick={bumpBullets}
          className={`px-2 py-1 rounded ${bullets ? 'bg-teal-600 text-white' : 'border border-slate-300'}`}
        >
          • List
        </button>
      </div>
      <div
        className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 min-h-[200px] text-sm"
        style={{ textAlign: align, fontWeight: boldOn ? '600' : 'normal' }}
      >
        {bullets ? (
          <ul className="list-disc ml-6 whitespace-pre-line">
            {text
              .split('\n')
              .filter(Boolean)
              .map((l, i) => (
                <li key={i}>{l}</li>
              ))}
          </ul>
        ) : (
          <pre className="whitespace-pre-wrap font-sans">{text}</pre>
        )}
      </div>
      <div className="text-xs space-y-1 p-2 rounded bg-slate-50 dark:bg-slate-800">
        <div className="font-semibold mb-1">Tasks</div>
        <div className={tasks.bold ? 'text-green-600' : ''}>
          {tasks.bold ? 'âœ“' : 'â—‹'} Apply <strong>Bold</strong>.
        </div>
        <div className={tasks.center ? 'text-green-600' : ''}>
          {tasks.center ? 'âœ“' : 'â—‹'} Center the document.
        </div>
        <div className={tasks.bullets ? 'text-green-600' : ''}>
          {tasks.bullets ? 'âœ“' : 'â—‹'} Convert text to a bulleted list.
        </div>
      </div>
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
      <WindowFrame title="Cover Letter.docx — Word">
        <Editor onComplete={setS1} />
      </WindowFrame>
      <Triage
        prompt="Pick the right Word feature for each goal."
        labels={[
          { key: 'spell', name: 'Spell-check' },
          { key: 'pdf', name: 'Save as PDF' },
          { key: 'header', name: 'Insert header/footer' },
          { key: 'track', name: 'Track changes' },
        ]}
        items={[
          {
            id: 'w1',
            content: 'Add page numbers to every page',
            correct: 'header',
            rationale: 'Headers/footers repeat on every page.',
          },
          {
            id: 'w2',
            content: 'Send a non-editable resume to a hiring manager',
            correct: 'pdf',
            rationale: 'PDFs preserve layout and resist editing.',
          },
          {
            id: 'w3',
            content: 'Catch a typo before submitting',
            correct: 'spell',
            rationale: 'Spell-check flags misspellings.',
          },
          {
            id: 'w4',
            content: 'Let your tutor mark up edits without losing your version',
            correct: 'track',
            rationale: 'Track changes records edits.',
          },
        ]}
        onComplete={setS2}
      />
    </div>
  );
}

export const MODULE = {
  id: 'b1_ms_word',
  title: 'Microsoft Word',
  standardId: 'NDL-B1',
  standardLabel: 'Core Digital Skills — Microsoft Word',
  bucket: 'B',
  intro:
    'Word is the standard tool for letters, resumes, and reports. Practice formatting (bold, alignment, lists) and document features (PDF export, spell-check, headers).',
  learningGoals: [
    'Format text and paragraphs',
    'Use lists and alignment',
    'Save / export to PDF and use spell-check',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'To make text **bold**, you can press:',
      choices: ['Ctrl+B (Cmd+B)', 'Ctrl+L', 'Ctrl+P', 'Ctrl+S'],
      correct: 0,
    },
    {
      q: 'To save a Word doc as a non-editable file for emailing, choose:',
      choices: [
        'Save as .docx',
        'Save as .txt',
        'Save as PDF',
        'Print preview',
      ],
      correct: 2,
    },
    {
      q: 'Which list style is best for steps that must be done in order?',
      choices: ['Bulleted', 'Numbered', 'Definition', 'No list'],
      correct: 1,
    },
    {
      q: 'Spell-check usually shows:',
      choices: [
        'Bold text',
        'Red squiggly underlines',
        'Page numbers',
        'Margins',
      ],
      correct: 1,
    },
    {
      q: 'Track Changes is useful when:',
      choices: [
        'Printing',
        'Sharing a draft so reviewers can suggest edits',
        'Saving as PDF',
        'Inserting images',
      ],
      correct: 1,
    },
  ],
};

export default function MsWord() {
  return null;
}
