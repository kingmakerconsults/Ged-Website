import React, { useState } from 'react';
import { PhoneFrame } from '../../_engine/Frame.jsx';
import Sortable from '../../_engine/sims/Sortable.jsx';

function TypingDrill({ onPass }) {
  const TARGET = 'Hello, this is my new phone!';
  const [val, setVal] = useState('');
  const matches = val === TARGET;
  return (
    <div className="space-y-2">
      <div className="text-xs uppercase opacity-60">Type exactly:</div>
      <code className="block p-2 bg-slate-100 dark:bg-slate-700 rounded text-sm">
        {TARGET}
      </code>
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600 text-sm"
        placeholder="Tap to type..."
        aria-label="Typing target"
      />
      <button
        type="button"
        disabled={!matches}
        onClick={onPass}
        className="px-3 py-1.5 rounded bg-teal-600 text-white text-sm disabled:opacity-50"
      >
        {matches ? 'Done — continue âœ“' : 'Match the target text exactly'}
      </button>
    </div>
  );
}

function PinUnlock({ onPass }) {
  const PIN = '4827';
  const [pin, setPin] = useState('');
  return (
    <div className="space-y-2">
      <div className="text-xs uppercase opacity-60">Unlock with PIN 4827</div>
      <div className="flex gap-1.5 justify-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'â†', 0, 'OK'].map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => {
              if (k === 'â†') setPin((p) => p.slice(0, -1));
              else if (k === 'OK') {
                if (pin === PIN) onPass();
                else setPin('');
              } else setPin((p) => (p.length < 4 ? p + k : p));
            }}
            className="w-12 h-12 rounded-full bg-slate-700 text-white text-lg font-semibold"
          >
            {k}
          </button>
        ))}
      </div>
      <div className="text-center text-2xl font-mono tracking-widest">
        {pin.padEnd(4, '•')}
      </div>
    </div>
  );
}

function Sim({ onComplete }) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState([]);
  const steps = ['Typing drill', 'Lock screen unlock', 'App identification'];

  function pushScore(s) {
    const next = [...scores, s];
    setScores(next);
    if (next.length === steps.length) {
      const avg = Math.round(next.reduce((a, b) => a + b, 0) / next.length);
      onComplete(avg);
    } else {
      setStep((i) => i + 1);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 items-start">
      <div>
        <PhoneFrame label="Practice phone">
          <div className="p-3 text-xs font-semibold border-b">
            {steps[step]}
          </div>
          <div className="p-3">
            {step === 0 && <TypingDrill onPass={() => pushScore(100)} />}
            {step === 1 && <PinUnlock onPass={() => pushScore(100)} />}
            {step === 2 && (
              <Sortable
                prompt="Which app would you tap to do each task?"
                buckets={[
                  { key: 'phone', name: 'ðŸ“ž Phone' },
                  { key: 'mail', name: 'âœ‰ï¸ Email' },
                  { key: 'maps', name: 'ðŸ—ºï¸ Maps' },
                  { key: 'camera', name: 'ðŸ“· Camera' },
                ]}
                items={[
                  {
                    id: 't1',
                    label: 'Call your doctor',
                    correctBucket: 'phone',
                  },
                  {
                    id: 't2',
                    label: 'Get directions home',
                    correctBucket: 'maps',
                  },
                  {
                    id: 't3',
                    label: 'Take a picture of an ID',
                    correctBucket: 'camera',
                  },
                  {
                    id: 't4',
                    label: 'Send a written message to a teacher',
                    correctBucket: 'mail',
                  },
                ]}
                onComplete={pushScore}
              />
            )}
          </div>
        </PhoneFrame>
      </div>
      <div className="text-sm space-y-2">
        <div className="font-semibold">
          Step {step + 1} of {steps.length}
        </div>
        <ul className="text-xs space-y-1 opacity-80">
          {steps.map((s, i) => (
            <li
              key={s}
              className={
                i < step
                  ? 'text-green-600'
                  : i === step
                    ? 'font-semibold'
                    : 'opacity-50'
              }
            >
              {i < step ? 'âœ“ ' : i === step ? 'â†’ ' : 'Â· '}
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const MODULE = {
  id: 'a1_phone_login',
  title: 'Phone Keyboard & Logging In',
  standardId: 'NDL-A1',
  standardLabel: 'Core Digital Skills — Phone Keyboard Basics & Logging In',
  bucket: 'A',
  intro:
    'Smartphones are most learners’ first computer. Practice tapping accurately, unlocking with a PIN, and recognizing which app to tap for each task.',
  learningGoals: [
    'Type a sentence accurately on a touchscreen keyboard',
    'Unlock a device with a PIN',
    'Match real-life tasks to the right phone app',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'Which is the safest way to set a phone PIN?',
      choices: [
        '0000 — easy to remember',
        'Your birthday',
        'A 4–6 digit number unrelated to public info',
        'The same PIN as your bank card',
      ],
      correct: 2,
      rationale:
        'PINs based on public info (birthdays) or shared with other accounts are easier to guess.',
    },
    {
      q: 'You want to send a written message to a teacher. Which app do you open?',
      choices: ['Phone', 'Email or Messages', 'Camera', 'Maps'],
      correct: 1,
      rationale: 'Email or a messaging app sends written messages.',
    },
    {
      q: 'On a touchscreen keyboard, holding a key down usually shows…',
      choices: [
        'Nothing — release to type',
        'Accented characters or symbol options',
        'Emoji shortcuts only',
        'A reset button',
      ],
      correct: 1,
      rationale: 'Press-and-hold reveals related characters (Ã , Ã¡, etc.).',
    },
    {
      q: 'A site asks for your username and password. What is a username?',
      choices: [
        'Your real name',
        'A name you pick to identify your account',
        'Your phone number, always',
        'Same as your password',
      ],
      correct: 1,
      rationale:
        'Usernames identify the account; they may or may not be your real name.',
    },
    {
      q: 'You forgot your password. The safest first step is to:',
      choices: [
        'Email another user to ask',
        'Use the “Forgot password?” link on the login page',
        'Try common passwords',
        'Make a new account using the same email',
      ],
      correct: 1,
      rationale:
        'The official Forgot Password flow sends a reset to your verified email.',
    },
  ],
};

export default function PhoneKeyboardLogin() {
  return null;
}
