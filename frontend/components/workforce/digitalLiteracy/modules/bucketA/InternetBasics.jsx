import React, { useState } from 'react';
import { BrowserFrame } from '../../_engine/Frame.jsx';
import Triage from '../../_engine/sims/Triage.jsx';

function UrlAnatomy({ onComplete }) {
  const URL = 'https://www.example.com/jobs/apply?role=cashier';
  const PARTS = [
    { id: 'protocol', label: 'Protocol (https)', match: 'https' },
    { id: 'domain', label: 'Domain (example.com)', match: 'example.com' },
    { id: 'path', label: 'Path (/jobs/apply)', match: '/jobs/apply' },
    { id: 'query', label: 'Query (?role=cashier)', match: '?role=cashier' },
  ];
  const [hover, setHover] = useState(null);
  const [done, setDone] = useState({});
  function mark(id) {
    setDone((d) => {
      const n = { ...d, [id]: true };
      if (Object.keys(n).length === PARTS.length) {
        onComplete(100);
      }
      return n;
    });
  }
  function highlight(part) {
    if (!hover) return URL;
    const p = PARTS.find((x) => x.id === hover);
    if (!p) return URL;
    return URL.split(p.match).map((s, i, arr) => (
      <React.Fragment key={i}>
        {s}
        {i < arr.length - 1 ? (
          <span className="bg-yellow-300 dark:bg-yellow-700 px-0.5 rounded">
            {p.match}
          </span>
        ) : null}
      </React.Fragment>
    ));
  }
  return (
    <div className="space-y-2">
      <div className="font-mono text-sm bg-slate-100 dark:bg-slate-800 p-2 rounded">
        {highlight()}
      </div>
      <div className="text-xs opacity-70">
        Hover or focus a part to highlight it. Click "I see it" when found.
      </div>
      <ul className="space-y-1">
        {PARTS.map((p) => (
          <li key={p.id} className="flex items-center gap-2">
            <button
              type="button"
              onMouseEnter={() => setHover(p.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(p.id)}
              onBlur={() => setHover(null)}
              className="text-left flex-1 px-2 py-1 rounded border border-slate-300 dark:border-slate-600 text-xs hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              {p.label}
            </button>
            <button
              type="button"
              onClick={() => mark(p.id)}
              disabled={done[p.id]}
              className="px-2 py-1 text-xs rounded bg-teal-600 text-white disabled:opacity-50"
            >
              {done[p.id] ? 'âœ“' : 'I see it'}
            </button>
          </li>
        ))}
      </ul>
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
      <BrowserFrame url="https://www.example.com/jobs/apply?role=cashier">
        <UrlAnatomy onComplete={setS1} />
      </BrowserFrame>
      <Triage
        prompt="Pick the best browser action for each goal."
        labels={[
          { key: 'addr', name: 'Type in address bar' },
          { key: 'search', name: 'Type in search bar' },
          { key: 'back', name: 'Click Back' },
          { key: 'tab', name: 'Open new tab' },
          { key: 'bm', name: 'Bookmark this page' },
        ]}
        items={[
          {
            id: 't1',
            content: 'I know the exact website (a friend gave it to me).',
            correct: 'addr',
            rationale: 'Use the address bar when you have the URL.',
          },
          {
            id: 't2',
            content: 'I want to look up a topic I have no link for.',
            correct: 'search',
            rationale:
              'A search bar (or search engine in the address bar) finds info from a topic.',
          },
          {
            id: 't3',
            content: 'I clicked the wrong link and want the previous page.',
            correct: 'back',
            rationale: 'Back returns to the previous page in this tab.',
          },
          {
            id: 't4',
            content: 'I want to keep this page open while I check another.',
            correct: 'tab',
            rationale: 'A new tab keeps the current page intact.',
          },
          {
            id: 't5',
            content: 'I will use this page often and want quick access.',
            correct: 'bm',
            rationale: 'Bookmarks save sites for later.',
          },
        ]}
        onComplete={setS2}
      />
    </div>
  );
}

export const MODULE = {
  id: 'a3_internet_basics',
  title: 'Internet Basics',
  standardId: 'NDL-A3',
  standardLabel: 'Northstar â€” Internet Basics',
  bucket: 'A',
  intro:
    'Use a web browser confidently: read a URL, navigate with tabs and bookmarks, and tell the address bar from the search bar.',
  learningGoals: [
    'Identify the parts of a URL (protocol, domain, path, query)',
    'Use tabs, back/forward, refresh, and bookmarks',
    'Choose between the address bar and a search bar',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'Which part of https://www.usa.gov/jobs is the domain?',
      choices: ['https', 'www.usa.gov', '/jobs', '?role=apply'],
      correct: 1,
      rationale: 'usa.gov is the domain (with the www subdomain).',
    },
    {
      q: 'A page wonâ€™t load. What should you try first?',
      choices: [
        'Restart the computer',
        'Click Refresh / Reload',
        'Re-install the browser',
        'Buy a new modem',
      ],
      correct: 1,
      rationale:
        'Refresh re-requests the page; usually fixes a one-off failure.',
    },
    {
      q: 'You want to keep your current page and read a new article. Best move?',
      choices: [
        'Type the new URL in this tab',
        'Open a new tab',
        'Close the browser',
        'Print the page',
      ],
      correct: 1,
      rationale: 'A new tab keeps the original page available.',
    },
    {
      q: 'Bookmarks areâ€¦',
      choices: [
        'Files you download',
        'Saved shortcuts to web pages',
        'Privacy settings',
        'Tabs that auto-close',
      ],
      correct: 1,
      rationale: 'A bookmark is a saved link.',
    },
    {
      q: 'Clicking a hyperlink usually:',
      choices: [
        'Deletes the page',
        'Sends an email',
        'Goes to another page or location',
        'Prints the page',
      ],
      correct: 2,
      rationale: 'Hyperlinks navigate you to another resource.',
    },
  ],
};

export default function InternetBasics() {
  return null;
}
