/**
 * Cybersecurity (FLAGSHIP) â€” phishing inbox + URL inspector + MFA.
 */
import React, { useState } from 'react';
import { WindowFrame, BrowserFrame } from '../../_engine/Frame.jsx';
import Triage from '../../_engine/sims/Triage.jsx';

function PasswordChecker({ onPass }) {
  const [pw, setPw] = useState('');
  const score =
    (pw.length >= 12 ? 1 : 0) +
    (/[a-z]/.test(pw) && /[A-Z]/.test(pw) ? 1 : 0) +
    (/[0-9]/.test(pw) ? 1 : 0) +
    (/[^a-zA-Z0-9]/.test(pw) ? 1 : 0);
  const labels = ['Very weak', 'Weak', 'OK', 'Strong', 'Excellent'];
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-600',
  ];
  React.useEffect(() => {
    if (score >= 4) onPass();
  }, [score, onPass]);
  return (
    <div className="p-3 space-y-2 text-sm">
      <div className="font-semibold">
        Create a strong password (target = Excellent)
      </div>
      <input
        type="text"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-600 font-mono"
      />
      <div className="h-2 rounded bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <div
          className={`h-full ${colors[score]}`}
          style={{ width: `${(score / 4) * 100}%` }}
        />
      </div>
      <div className="text-xs">
        {labels[score]} â€” Goal: 12+ chars, mixed case, number, and a symbol.
      </div>
    </div>
  );
}

function MfaSim({ onPass }) {
  const [pw, setPw] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(0);
  function next() {
    if (step === 0 && pw === 'cohort-2025!') setStep(1);
    else if (step === 1 && code === '472913') {
      setStep(2);
      onPass();
    }
  }
  return (
    <div className="p-3 space-y-2 text-sm">
      <div className="font-semibold">Sign in with MFA</div>
      {step === 0 ? (
        <div>
          <label className="text-xs">
            Password (use{' '}
            <code className="bg-slate-200 dark:bg-slate-700 px-1">
              cohort-2025!
            </code>{' '}
            for the demo):
          </label>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full px-2 py-1 border border-slate-300 rounded"
          />
          <button
            type="button"
            onClick={next}
            className="mt-1 px-2 py-1 text-xs rounded bg-teal-600 text-white"
          >
            Continue
          </button>
        </div>
      ) : step === 1 ? (
        <div>
          <div className="text-xs">
            A 6-digit code was sent to your phone (use{' '}
            <code className="bg-slate-200 dark:bg-slate-700 px-1">472913</code>
            ):
          </div>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-2 py-1 border border-slate-300 rounded font-mono"
            maxLength={6}
          />
          <button
            type="button"
            onClick={next}
            className="mt-1 px-2 py-1 text-xs rounded bg-teal-600 text-white"
          >
            Verify
          </button>
        </div>
      ) : (
        <div className="text-green-600 text-xs">
          âœ“ Signed in with MFA. Even if someone steals your password, they still
          need your phone.
        </div>
      )}
    </div>
  );
}

function Sim({ onComplete }) {
  const [pwOk, setPwOk] = useState(false);
  const [mfaOk, setMfaOk] = useState(false);
  const [phishScore, setPhishScore] = useState(null);
  React.useEffect(() => {
    if (pwOk && mfaOk && phishScore != null) {
      const part1 = pwOk ? 100 : 0;
      const part2 = mfaOk ? 100 : 0;
      onComplete(Math.round((part1 + part2 + phishScore) / 3));
    }
  }, [pwOk, mfaOk, phishScore, onComplete]);

  return (
    <div className="space-y-6">
      <WindowFrame title="Account security">
        <PasswordChecker onPass={() => setPwOk(true)} />
      </WindowFrame>
      <WindowFrame title="Sign in">
        <MfaSim onPass={() => setMfaOk(true)} />
      </WindowFrame>
      <Triage
        prompt="Phishing inbox triage â€” for each email, decide whether the link is Safe to click, Suspicious, or Definitely a scam."
        labels={[
          { key: 'safe', name: 'Safe' },
          { key: 'suss', name: 'Suspicious' },
          { key: 'scam', name: 'Scam (do NOT click)' },
        ]}
        items={[
          {
            id: 'p1',
            content: (
              <div>
                <div className="text-xs opacity-60">From: amazon.com</div>
                <div>Link: https://www.amazon.com/orders</div>
              </div>
            ),
            correct: 'safe',
            rationale: 'Domain matches sender, real subdomain.',
          },
          {
            id: 'p2',
            content: (
              <div>
                <div className="text-xs opacity-60">
                  From: amÐ°zon-billing.com (Cyrillic Ð°)
                </div>
                <div>Link: http://amazon-billing.tk/verify</div>
              </div>
            ),
            correct: 'scam',
            rationale: 'Lookalike domain + .tk free TLD = scam.',
          },
          {
            id: 'p3',
            content: (
              <div>
                <div className="text-xs opacity-60">
                  From: HR &lt;hr@company.com&gt;
                </div>
                <div>Link: https://intranet.company.com/benefits</div>
              </div>
            ),
            correct: 'safe',
            rationale: 'Internal domain, expected message.',
          },
          {
            id: 'p4',
            content: (
              <div>
                <div className="text-xs opacity-60">
                  From: Microsoft Support
                </div>
                <div>Link: bit.ly/m1cr0soft-help</div>
              </div>
            ),
            correct: 'suss',
            rationale: 'Shortened URL hides the real destination.',
          },
          {
            id: 'p5',
            content: (
              <div>
                <div className="text-xs opacity-60">
                  From: bank-of-america-secure.help
                </div>
                <div>Link: http://bofa-secure.help/login.html</div>
              </div>
            ),
            correct: 'scam',
            rationale: 'Fake banking domain â€” never log in from email links.',
          },
        ]}
        onComplete={setPhishScore}
      />
    </div>
  );
}

export const MODULE = {
  id: 'c7_cybersecurity',
  title: 'Cybersecurity Basics',
  standardId: 'NDL-C7',
  standardLabel: 'Northstar â€” Cybersecurity Basics',
  bucket: 'C',
  intro:
    'Build the habits that stop most attacks: strong unique passwords, multi-factor authentication, and a sharp eye for phishing.',
  learningGoals: [
    'Create strong passwords',
    'Use MFA so a stolen password isnâ€™t enough',
    'Spot phishing in email and on the web',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'MFA stands for:',
      choices: [
        'Multi-Factor Authentication',
        'Most Famous Apps',
        'Major File Archive',
        'Mail Filter Action',
      ],
      correct: 0,
    },
    {
      q: 'Best password style:',
      choices: [
        '"password123"',
        'Same one everywhere',
        '12+ chars, mixed types, unique per site',
        'Your birthday',
      ],
      correct: 2,
    },
    {
      q: 'You get an email "from your bank" asking you to log in via a link. You should:',
      choices: [
        'Click and log in',
        'Ignore the link and go to the bank site directly',
        'Forward to friends',
        'Reply with your password',
      ],
      correct: 1,
    },
    {
      q: 'Public Wi-Fi is safest when you also use:',
      choices: [
        'Bluetooth',
        'A VPN + HTTPS sites only',
        'Hotspot mode',
        'Airplane mode',
      ],
      correct: 1,
    },
    {
      q: 'Suspicious sender domain pattern:',
      choices: ['amazon.com', 'paypal.com', 'apple-secure-help.tk', 'usa.gov'],
      correct: 2,
    },
  ],
};

export default function Cybersecurity() {
  return null;
}
