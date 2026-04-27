/**
 * SocialMedia — privacy settings + scam-DM triage.
 */
import React, { useState } from 'react';
import { WindowFrame } from '../../_engine/Frame.jsx';
import Triage from '../../_engine/sims/Triage.jsx';
import Sortable from '../../_engine/sims/Sortable.jsx';

function PrivacyPanel({ onComplete }) {
  const [s, setS] = useState({
    profile: 'public',
    posts: 'public',
    msgs: 'anyone',
    twoFA: false,
  });
  React.useEffect(() => {
    if (
      s.profile !== 'public' &&
      s.posts !== 'public' &&
      s.msgs === 'friends' &&
      s.twoFA
    ) {
      onComplete(100);
    }
  }, [s, onComplete]);
  return (
    <div className="p-3 space-y-2 text-sm">
      <div className="font-semibold mb-1">Account & privacy</div>
      <div className="space-y-2">
        <div>
          Profile visibility:
          <select
            value={s.profile}
            onChange={(e) => setS({ ...s, profile: e.target.value })}
            className="ml-2 px-2 py-0.5 border border-slate-300 rounded"
          >
            <option>public</option>
            <option value="friends">friends only</option>
            <option value="private">only me</option>
          </select>
        </div>
        <div>
          Who can see posts:
          <select
            value={s.posts}
            onChange={(e) => setS({ ...s, posts: e.target.value })}
            className="ml-2 px-2 py-0.5 border border-slate-300 rounded"
          >
            <option>public</option>
            <option value="friends">friends only</option>
          </select>
        </div>
        <div>
          Who can message me:
          <select
            value={s.msgs}
            onChange={(e) => setS({ ...s, msgs: e.target.value })}
            className="ml-2 px-2 py-0.5 border border-slate-300 rounded"
          >
            <option value="anyone">anyone</option>
            <option value="friends">friends only</option>
          </select>
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={s.twoFA}
            onChange={(e) => setS({ ...s, twoFA: e.target.checked })}
          />
          Enable two-factor authentication (2FA)
        </label>
      </div>
      <div className="text-xs opacity-70 mt-2">
        Goal: Lock down profile + posts, allow only friends to message you, and
        turn on 2FA.
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
      <WindowFrame title="Settings — your social account">
        <PrivacyPanel onComplete={setA} />
      </WindowFrame>
      <Triage
        prompt="A stranger sends you each message. Reply, ignore, or report?"
        labels={[
          { key: 'reply', name: 'Reply (safe)' },
          { key: 'ignore', name: 'Ignore' },
          { key: 'report', name: 'Report / block' },
        ]}
        items={[
          {
            id: 's1',
            content:
              '"Hey beautiful, you won a free iPhone! DM your address and SSN."',
            correct: 'report',
            rationale: 'Classic scam. Report and block.',
          },
          {
            id: 's2',
            content:
              '"Hi, are you open to remote work? Here is a link to register: bit.ly/job123"',
            correct: 'report',
            rationale: 'Unsolicited job + sketchy short link = scam.',
          },
          {
            id: 's3',
            content: '"Loved your photo of the lake!"',
            correct: 'ignore',
            rationale:
              'Probably harmless but no need to engage with strangers.',
          },
          {
            id: 's4',
            content:
              '"This is Alex from your soccer team — coach changed practice to 6pm."',
            correct: 'reply',
            rationale: 'Known person, school context, ok to confirm.',
          },
        ]}
        onComplete={setB}
      />
      <Sortable
        prompt="Match each before-you-post check to its reason."
        buckets={[
          { key: 'priv', name: 'Privacy concern' },
          { key: 'job', name: 'Future-employer concern' },
          { key: 'safe', name: 'Safety concern' },
        ]}
        items={[
          {
            id: 'p1',
            label: 'Posting your live location',
            correctBucket: 'safe',
          },
          {
            id: 'p2',
            label: 'Posting a photo of your full ID',
            correctBucket: 'priv',
          },
          {
            id: 'p3',
            label: 'Ranting with profanity about a coworker',
            correctBucket: 'job',
          },
          {
            id: 'p4',
            label: "Sharing a friend's phone number",
            correctBucket: 'priv',
          },
          {
            id: 'p5',
            label: 'Posting party photos that show illegal activity',
            correctBucket: 'job',
          },
        ]}
        onComplete={setC}
      />
    </div>
  );
}

export const MODULE = {
  id: 'c1_social_media',
  title: 'Social Media',
  standardId: 'NDL-C1',
  standardLabel: 'Core Digital Skills — Social Media',
  bucket: 'C',
  intro:
    'Use social media safely: tighten privacy settings, recognize scams in DMs, and think before you post.',
  learningGoals: [
    'Adjust core privacy settings',
    'Recognize scam DMs',
    'Think before you post (safety, privacy, employability)',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: '2FA stands for and protects against:',
      choices: [
        'Two-Factor Authentication; password-only attacks',
        'Two-Friend Approval',
        'Two-File Archive',
        'Two-Format Account',
      ],
      correct: 0,
    },
    {
      q: 'A DM offering "free money" usually is:',
      choices: ['Real', 'A scam', 'A bug', 'A drill'],
      correct: 1,
    },
    {
      q: 'Future employers often check:',
      choices: [
        'Your private texts',
        'Your public social-media presence',
        'Your ISP',
        'Your DMs',
      ],
      correct: 1,
    },
    {
      q: 'Best response to harassment in DMs:',
      choices: [
        'Argue back',
        'Block and report',
        'Ignore forever and never tell anyone',
        'Share screenshots publicly',
      ],
      correct: 1,
    },
    {
      q: 'Posting your home address in a public bio is:',
      choices: ['Smart', 'Required', 'A safety risk', 'Free advertising'],
      correct: 2,
    },
  ],
};

export default function SocialMedia() {
  return null;
}
