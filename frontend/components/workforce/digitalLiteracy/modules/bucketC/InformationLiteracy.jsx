/**
 * InformationLiteracy (FLAGSHIP) — source evaluation: SIFT-style
 *   Stop, Investigate, Find better, Trace claims.
 */
import React, { useState } from 'react';
import { BrowserFrame } from '../_engine/Frame.jsx';
import Triage from '../_engine/sims/Triage.jsx';

const SOURCES = [
  {
    id: 'src1',
    url: 'https://www.cdc.gov/flu/about/keyfacts.htm',
    headline: 'Flu vaccine reduces hospitalization by ~40%',
    snippet:
      'CDC reports yearly flu vaccination effectiveness data, citing peer-reviewed studies.',
    verdict: 'credible',
    why: 'Government health agency (.gov), cites peer-reviewed studies.',
  },
  {
    id: 'src2',
    url: 'https://truthnewsdaily.click/secret-cure-doctors-hate',
    headline: 'Secret home remedy doctors hate — cures everything',
    snippet: 'No author. Sells a $99 supplement at the bottom.',
    verdict: 'unreliable',
    why: 'Sensational headline, no author, sales motive.',
  },
  {
    id: 'src3',
    url: 'https://en.wikipedia.org/wiki/Photosynthesis',
    headline: 'Photosynthesis (Wikipedia)',
    snippet: 'Crowd-edited overview with linked citations to journals.',
    verdict: 'starting',
    why: 'Wikipedia is a starting point; check the sources it cites.',
  },
  {
    id: 'src4',
    url: 'https://x.com/randomuser/status/123',
    headline: '"Just heard from my cousin: gas prices crashing tomorrow"',
    snippet: 'Anonymous user, no source given, viral retweet.',
    verdict: 'unreliable',
    why: 'Anonymous social-media post with no evidence.',
  },
  {
    id: 'src5',
    url: 'https://www.nytimes.com/2024/05/12/business/economy.html',
    headline: 'Inflation eased to 2.9% in April, Labor Dept says',
    snippet:
      'Reported by named journalist, links to Bureau of Labor Statistics release.',
    verdict: 'credible',
    why: 'Reputable news org, named author, links to primary source.',
  },
];

function Sim({ onComplete }) {
  const [open, setOpen] = useState(SOURCES[0].id);
  const [s2, setS2] = useState(null);
  const cur = SOURCES.find((x) => x.id === open);
  React.useEffect(() => {
    if (s2 != null) onComplete(s2);
  }, [s2, onComplete]);

  return (
    <div className="space-y-6">
      <p className="text-sm">
        Browse each source by clicking the URLs in the address bar. Notice the
        domain, the author, and any sales pitch — then sort each one in the
        triage below.
      </p>
      <BrowserFrame url={cur.url}>
        <div className="text-sm space-y-2">
          <div className="flex flex-wrap gap-1 text-xs">
            {SOURCES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setOpen(s.id)}
                className={`px-2 py-1 rounded border ${open === s.id ? 'bg-teal-600 text-white border-teal-700' : 'border-slate-300'}`}
              >
                Source {SOURCES.indexOf(s) + 1}
              </button>
            ))}
          </div>
          <div className="font-bold">{cur.headline}</div>
          <div className="text-xs opacity-70">{cur.snippet}</div>
        </div>
      </BrowserFrame>
      <Triage
        prompt="Label each source. (Refer to the headlines + URLs you just browsed.)"
        labels={[
          { key: 'credible', name: 'Credible' },
          { key: 'starting', name: 'Starting point only' },
          { key: 'unreliable', name: 'Unreliable' },
        ]}
        items={SOURCES.map((s, i) => ({
          id: s.id,
          content: (
            <div>
              <div className="font-semibold">
                Source {i + 1}: {s.headline}
              </div>
              <div className="text-xs opacity-70">{s.url}</div>
            </div>
          ),
          correct: s.verdict,
          rationale: s.why,
        }))}
        onComplete={setS2}
      />
    </div>
  );
}

export const MODULE = {
  id: 'c2_information_literacy',
  title: 'Information Literacy',
  standardId: 'NDL-C2',
  standardLabel: 'Northstar — Information Literacy',
  bucket: 'C',
  intro:
    'Not everything online is true. Use SIFT — Stop, Investigate, Find better coverage, Trace claims to the source — to evaluate every link.',
  learningGoals: [
    'Notice domain, author, and motive',
    'Distinguish credible / starting-point / unreliable sources',
    'Trace a claim back to a primary source',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'A .gov domain usually means:',
      choices: [
        'Personal blog',
        'Government agency',
        'Generic site',
        'Online store',
      ],
      correct: 1,
    },
    {
      q: 'A page with no author and many ads is:',
      choices: ['More trustworthy', 'Less trustworthy', 'Equal', 'Always fake'],
      correct: 1,
    },
    {
      q: 'Wikipedia is best used as:',
      choices: [
        'A primary source',
        'A starting point — then read its citations',
        'Avoided entirely',
        'A peer-reviewed journal',
      ],
      correct: 1,
    },
    {
      q: 'A viral social media claim with no source is:',
      choices: [
        'Probably true',
        'Worth verifying before sharing',
        'Always false',
        'Always satire',
      ],
      correct: 1,
    },
    {
      q: '"Lateral reading" means:',
      choices: [
        'Reading the page top to bottom',
        'Opening other tabs to fact-check the source',
        'Reading sideways',
        'Skimming only',
      ],
      correct: 1,
    },
  ],
};

export default function InformationLiteracy() {
  return null;
}
