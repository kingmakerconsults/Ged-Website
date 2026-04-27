/**
 * CivicGovServices — using gov sites safely (vote, taxes, ID, benefits).
 */
import React, { useState } from 'react';
import { BrowserFrame } from '../_engine/Frame.jsx';
import Triage from '../_engine/sims/Triage.jsx';
import Sortable from '../_engine/sims/Sortable.jsx';

function GovBrowser({ onComplete }) {
  const [url, setUrl] = useState('https://www.usa.gov');
  const [done, setDone] = useState({ login: false, doc: false });
  React.useEffect(() => {
    if (done.login && done.doc) onComplete(100);
  }, [done, onComplete]);
  const safe = /\.gov(\/|$)/i.test(url);
  return (
    <div className="p-3 text-sm space-y-2">
      <div className="text-xs">Try a few URLs:</div>
      <div className="flex flex-wrap gap-1 text-xs">
        {[
          'https://www.usa.gov',
          'https://www.irs.gov',
          'https://www.ssa.gov',
          'https://us-gov-grants.click',
          'https://benefits.gov',
        ].map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => setUrl(u)}
            className={`px-2 py-0.5 rounded border ${url === u ? 'bg-teal-600 text-white border-teal-700' : 'border-slate-300'}`}
          >
            {u}
          </button>
        ))}
      </div>
      <div
        className={`p-3 rounded text-xs ${safe ? 'bg-green-50 text-green-900 border border-green-300' : 'bg-red-50 text-red-900 border border-red-300'}`}
      >
        {safe
          ? '✅ This domain ends in .gov — official US government site.'
          : '⚠️ This is NOT a .gov domain. Likely a scam impersonating government services.'}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={!safe || done.login}
          onClick={() => setDone((d) => ({ ...d, login: true }))}
          className="px-2 py-1 rounded bg-teal-600 text-white text-xs disabled:opacity-50"
        >
          Sign in with Login.gov
        </button>
        <button
          type="button"
          disabled={!safe || done.doc}
          onClick={() => setDone((d) => ({ ...d, doc: true }))}
          className="px-2 py-1 rounded bg-teal-600 text-white text-xs disabled:opacity-50"
        >
          Download official PDF
        </button>
      </div>
      <div className="text-xs opacity-70">
        Tasks: while on a real .gov page, sign in via Login.gov AND download the
        official PDF.
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
      <BrowserFrame url="https://www.usa.gov">
        <GovBrowser onComplete={setA} />
      </BrowserFrame>
      <Triage
        prompt="Real .gov service or scam impersonator?"
        labels={[
          { key: 'real', name: 'Real .gov' },
          { key: 'scam', name: 'Scam' },
        ]}
        items={[
          {
            id: '1',
            content: 'irs.gov asks for a Login.gov sign-in',
            correct: 'real',
            rationale: 'IRS uses Login.gov.',
          },
          {
            id: '2',
            content:
              'us-grants-2024.click promises $5000 free money via Western Union',
            correct: 'scam',
            rationale: 'Wrong TLD, money-up-front = scam.',
          },
          {
            id: '3',
            content: 'ssa.gov to check your Social Security statement',
            correct: 'real',
            rationale: 'Official SSA portal.',
          },
          {
            id: '4',
            content:
              'usa-gov-help.com calls you and demands gift cards for back taxes',
            correct: 'scam',
            rationale: 'Government never demands gift cards.',
          },
        ]}
        onComplete={setB}
      />
      <Sortable
        prompt="Where do you go for each civic task?"
        buckets={[
          { key: 'irs', name: 'irs.gov' },
          { key: 'ssa', name: 'ssa.gov' },
          { key: 'vote', name: 'vote.gov / your state SOS' },
          { key: 'benefits', name: 'benefits.gov' },
        ]}
        items={[
          { id: 'a', label: 'File your federal taxes', correctBucket: 'irs' },
          {
            id: 'b',
            label: 'Check Social Security statement',
            correctBucket: 'ssa',
          },
          { id: 'c', label: 'Register to vote', correctBucket: 'vote' },
          {
            id: 'd',
            label: 'Find food / housing assistance programs',
            correctBucket: 'benefits',
          },
        ]}
        onComplete={setC}
      />
    </div>
  );
}

export const MODULE = {
  id: 'd5_civic_gov_services',
  title: 'Civic & Gov Services Online',
  standardId: 'BEYOND-D5',
  standardLabel: 'Beyond Northstar — Civic & Gov Services',
  bucket: 'D',
  intro:
    'Use government services safely online: filing taxes, voting, claiming benefits — all without falling for scams.',
  learningGoals: [
    'Recognize legitimate .gov domains',
    'Use Login.gov for federal services',
    'Avoid common government-impersonation scams',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'Federal US government sites end in:',
      choices: ['.com', '.gov', '.org', '.click'],
      correct: 1,
    },
    {
      q: 'The IRS / SSA will NEVER:',
      choices: [
        'Send official letters',
        'Demand gift cards or wire transfers',
        'Maintain websites',
        'Use Login.gov',
      ],
      correct: 1,
    },
    {
      q: 'Login.gov is:',
      choices: [
        'A scam site',
        'A shared sign-in for many federal agencies',
        'Required for every website',
        'Only for vets',
      ],
      correct: 1,
    },
    {
      q: 'To register to vote, the safest start is:',
      choices: [
        'Random ad',
        'vote.gov or your state SOS',
        'A door-to-door cash collector',
        'Social media DM',
      ],
      correct: 1,
    },
    {
      q: 'A "scam impersonating gov" usually:',
      choices: [
        'Has a clean .gov URL',
        'Pressures you with urgency and asks for unusual payment',
        'Links to .gov pages only',
        'Has no buttons',
      ],
      correct: 1,
    },
  ],
};

export default function CivicGovServices() {
  return null;
}
