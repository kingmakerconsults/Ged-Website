/**
 * DigitalFootprint — what you leave behind.
 */
import React, { useState } from 'react';
import Triage from '../../_engine/sims/Triage.jsx';
import Sortable from '../../_engine/sims/Sortable.jsx';

function FootprintMap({ onComplete }) {
  const [marked, setMarked] = useState({});
  const sources = [
    { id: 'sm', label: 'Public social posts' },
    { id: 'rev', label: 'Online reviews you wrote' },
    { id: 'pub', label: 'School / news mentions' },
    { id: 'cookie', label: 'Tracking cookies & ad profiles' },
    { id: 'leak', label: 'Old data breaches with your email' },
    { id: 'meta', label: 'Photo metadata (EXIF location)' },
  ];
  React.useEffect(() => {
    if (Object.keys(marked).length === sources.length) onComplete(100);
  }, [marked, sources.length, onComplete]);
  return (
    <div className="space-y-2 text-sm">
      <div className="font-semibold">
        Your digital footprint = sum of these traces. Click each one to
        acknowledge it.
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {sources.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setMarked((m) => ({ ...m, [s.id]: true }))}
            className={`p-2 rounded border text-xs ${marked[s.id] ? 'bg-teal-100 border-teal-400 text-teal-900' : 'border-slate-300'}`}
          >
            {marked[s.id] ? 'âœ“ ' : ''}
            {s.label}
          </button>
        ))}
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
      <FootprintMap onComplete={setA} />
      <Triage
        prompt="Active vs passive footprint?"
        labels={[
          { key: 'active', name: 'Active (you chose to share)' },
          { key: 'passive', name: 'Passive (collected without you noticing)' },
        ]}
        items={[
          {
            id: '1',
            content: 'You wrote a Yelp review',
            correct: 'active',
            rationale: 'You typed and submitted it.',
          },
          {
            id: '2',
            content: 'A site dropped tracking cookies as you browsed',
            correct: 'passive',
            rationale: 'Background tracking.',
          },
          {
            id: '3',
            content: 'You posted a photo to Instagram',
            correct: 'active',
            rationale: 'Your post.',
          },
          {
            id: '4',
            content: 'Your phone reported your location to an ad network',
            correct: 'passive',
            rationale: 'Background telemetry.',
          },
        ]}
        onComplete={setB}
      />
      <Sortable
        prompt="What action shrinks each footprint risk the most?"
        buckets={[
          { key: 'audit', name: 'Audit/clean old posts' },
          { key: 'priv', name: 'Tighten privacy settings' },
          { key: 'pwd', name: 'Use a password manager + 2FA' },
        ]}
        items={[
          {
            id: 'a',
            label: 'A breach exposed your email + password',
            correctBucket: 'pwd',
          },
          {
            id: 'b',
            label: 'Public profile shows party photos from years ago',
            correctBucket: 'audit',
          },
          {
            id: 'c',
            label: 'Strangers can DM you on every app',
            correctBucket: 'priv',
          },
          {
            id: 'd',
            label: 'You reuse one password across sites',
            correctBucket: 'pwd',
          },
        ]}
        onComplete={setC}
      />
    </div>
  );
}

export const MODULE = {
  id: 'c6_digital_footprint',
  title: 'Your Digital Footprint',
  standardId: 'NDL-C6',
  standardLabel: 'Core Digital Skills — Your Digital Footprint',
  bucket: 'C',
  intro:
    'Everything you do online leaves traces — some you choose to leave, some are collected silently. Learn to see and shrink your footprint.',
  learningGoals: [
    'Distinguish active vs passive footprint',
    'Audit and tighten public profiles',
    'Use 2FA + password manager to limit breach impact',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'A digital footprint is:',
      choices: [
        'Only photos',
        'All the trails you leave online',
        'Just emails',
        'Just downloads',
      ],
      correct: 1,
    },
    {
      q: '"Right to be forgotten" laws (in some places) let you:',
      choices: [
        'Delete the internet',
        'Request removal of certain personal data',
        'Hide your IP',
        'Block ads',
      ],
      correct: 1,
    },
    {
      q: 'A password manager helps because:',
      choices: [
        'Lets you reuse passwords',
        'Generates and stores unique strong passwords',
        'Sends them by SMS',
        'Shares them publicly',
      ],
      correct: 1,
    },
    {
      q: 'Photos can leak your location through:',
      choices: [
        'EXIF metadata (often GPS)',
        'Color',
        'Resolution',
        'Aspect ratio',
      ],
      correct: 0,
    },
    {
      q: '"Have I Been Pwned" is a service to:',
      choices: [
        'Buy passwords',
        'Check if your email appears in known data breaches',
        'Track ads',
        'Hide your IP',
      ],
      correct: 1,
    },
  ],
};

export default function DigitalFootprint() {
  return null;
}
