/**
 * CareerSearchSkills — using job boards & resume-search basics.
 */
import React, { useState } from 'react';
import { BrowserFrame } from '../../_engine/Frame.jsx';
import Triage from '../../_engine/sims/Triage.jsx';
import Sortable from '../../_engine/sims/Sortable.jsx';

function JobBoardSim({ onComplete }) {
  const [q, setQ] = useState('');
  const [loc, setLoc] = useState('');
  const [filter, setFilter] = useState('any');
  const [searched, setSearched] = useState(false);
  const [saved, setSaved] = useState(false);
  React.useEffect(() => {
    if (searched && saved) onComplete(100);
  }, [searched, saved, onComplete]);

  const results = [
    { id: 'r1', title: 'Cashier', co: 'Local Foods', remote: false },
    { id: 'r2', title: 'Customer Service Rep', co: 'TeleCo', remote: true },
    { id: 'r3', title: 'Warehouse Associate', co: 'BigBox', remote: false },
  ].filter((r) => filter === 'any' || (filter === 'remote' && r.remote));

  return (
    <div className="p-3 text-sm space-y-2">
      <div className="flex flex-wrap gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="job title"
          className="px-2 py-1 border border-slate-300 rounded"
        />
        <input
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          placeholder="city or zip"
          className="px-2 py-1 border border-slate-300 rounded"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-2 py-1 border border-slate-300 rounded"
        >
          <option value="any">Any work setting</option>
          <option value="remote">Remote only</option>
        </select>
        <button
          type="button"
          disabled={!q || !loc}
          onClick={() => setSearched(true)}
          className="px-3 py-1 rounded bg-teal-600 text-white disabled:opacity-50"
        >
          Search
        </button>
      </div>
      {searched ? (
        <ul className="border border-slate-200 dark:border-slate-700 rounded">
          {results.map((r) => (
            <li
              key={r.id}
              className="flex items-center justify-between p-2 border-b last:border-b-0 border-slate-200 dark:border-slate-700"
            >
              <div>
                <div className="font-semibold">{r.title}</div>
                <div className="text-xs opacity-70">
                  {r.co} {r.remote ? 'Â· Remote' : 'Â· On-site'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSaved(true)}
                className="text-xs px-2 py-1 rounded border border-slate-300"
              >
                â˜… Save
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="text-xs opacity-70">
        Goal: search with title + location AND save at least one result.
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
      <BrowserFrame url="https://www.indeed.com/jobs">
        <JobBoardSim onComplete={setA} />
      </BrowserFrame>
      <Triage
        prompt="Pick the best keyword strategy for each searcher."
        labels={[
          { key: 'broad', name: 'Broad query' },
          { key: 'spec', name: 'Specific query' },
          { key: 'titles', name: 'Multiple title variants' },
        ]}
        items={[
          {
            id: 'k1',
            content: 'Just lost their job, no idea what they want',
            correct: 'broad',
            rationale: 'Broad = explore.',
          },
          {
            id: 'k2',
            content: 'Wants night-shift forklift roles within 20 miles',
            correct: 'spec',
            rationale: 'Specific filters narrow noise.',
          },
          {
            id: 'k3',
            content:
              'Customer service can be called "rep", "associate", "agent"',
            correct: 'titles',
            rationale: 'Search several title variants to catch all listings.',
          },
        ]}
        onComplete={setB}
      />
      <Sortable
        prompt="What does each piece of a job posting tell you?"
        buckets={[
          { key: 'fit', name: 'Will I qualify?' },
          { key: 'pay', name: 'What does it pay?' },
          { key: 'apply', name: 'How do I apply?' },
        ]}
        items={[
          {
            id: 'a',
            label: 'Required: 1 year of cashier experience',
            correctBucket: 'fit',
          },
          { id: 'b', label: '$16/hr + benefits', correctBucket: 'pay' },
          {
            id: 'c',
            label: 'Submit resume via the company portal',
            correctBucket: 'apply',
          },
          { id: 'd', label: 'Must lift 30 lbs', correctBucket: 'fit' },
          { id: 'e', label: 'Closes May 30', correctBucket: 'apply' },
        ]}
        onComplete={setC}
      />
    </div>
  );
}

export const MODULE = {
  id: 'c3_career_search_skills',
  title: 'Career Search Skills',
  standardId: 'NDL-C3',
  standardLabel: 'Core Digital Skills — Career Search Skills',
  bucket: 'C',
  intro:
    'Use job boards effectively: search smart, filter, save listings, and read postings carefully.',
  learningGoals: [
    'Search a job board with title + location',
    'Use filters and save listings',
    'Read a posting for fit, pay, and how to apply',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'A "remote" job means:',
      choices: [
        'Far from a city',
        'Worked from home/anywhere',
        'Outdoors',
        'Night shift',
      ],
      correct: 1,
    },
    {
      q: 'If a posting requires 5 years and you have 1, you:',
      choices: [
        'Should never apply',
        'Can still apply if you meet most other needs',
        'Must lie',
        'Should call HR daily',
      ],
      correct: 1,
    },
    {
      q: 'Best place to find the official application:',
      choices: [
        'A random forum',
        "The company's own careers page or the listed job-board link",
        'Texting recruiters',
        'Print ads',
      ],
      correct: 1,
    },
    {
      q: 'Saving a listing helps because:',
      choices: [
        'It pays more',
        'You can return to it before it expires',
        'It guarantees the job',
        'It hides it',
      ],
      correct: 1,
    },
    {
      q: 'A posting that asks for your bank info up front is:',
      choices: ['Normal', 'A scam', 'Standard', 'Required'],
      correct: 1,
    },
  ],
};

export default function CareerSearchSkills() {
  return null;
}
