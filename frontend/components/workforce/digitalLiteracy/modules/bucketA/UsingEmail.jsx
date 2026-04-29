/**
 * UsingEmail.jsx — Core Digital Skills A4 flagship sim.
 * Simulated email client with Inbox, Compose, Reply, attachments, and
 * spam/legit triage.
 */
import React, { useMemo, useState } from 'react';
import { WindowFrame } from '../../_engine/Frame.jsx';
import Triage from '../../_engine/sims/Triage.jsx';

const SEED_INBOX = [
  {
    id: 'm1',
    from: 'Maria Lopez <maria.lopez@statecollege.edu>',
    subject: 'Tutor session moved to Thursday',
    preview: 'Hi! Just confirming our tutoring session is now Thursday at 4pm…',
    body: 'Hi! Just confirming our tutoring session is now Thursday at 4pm in Room 204. Bring your math notebook. — Maria',
  },
  {
    id: 'm2',
    from: 'Costco <noreply@costco.com>',
    subject: 'Your weekly coupons',
    preview: 'New offers this week including pantry savings…',
    body: 'Browse this week’s coupons at our official site.',
  },
  {
    id: 'm3',
    from: 'PayPal Support <support@paypal-secure-help.tk>',
    subject: 'URGENT: account locked — verify now',
    preview: 'We have detected unusual activity. Click the link to restore…',
    body: 'Your account is locked. Click http://paypal-secure-help.tk/verify within 24 hours or it will be deleted.',
  },
];

function ComposeForm({ onSent, prefill = {} }) {
  const [to, setTo] = useState(prefill.to || '');
  const [subject, setSubject] = useState(prefill.subject || '');
  const [body, setBody] = useState(prefill.body || '');
  const [attached, setAttached] = useState(false);
  const ok =
    to.includes('@') && to.includes('.') && subject && body.length > 10;
  return (
    <div className="space-y-2">
      <label className="block text-xs uppercase opacity-60">To</label>
      <input
        type="email"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-600 text-sm"
        placeholder="someone@example.com"
      />
      <label className="block text-xs uppercase opacity-60">Subject</label>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-600 text-sm"
      />
      <label className="block text-xs uppercase opacity-60">Body</label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={5}
        className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-600 text-sm font-sans"
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setAttached((a) => !a)}
          className={`px-2 py-1 text-xs rounded border ${
            attached
              ? 'bg-amber-100 border-amber-300 text-amber-900'
              : 'border-slate-300 dark:border-slate-600'
          }`}
        >
          📎 {attached ? 'resume.pdf attached' : 'Attach a file'}
        </button>
        <div className="flex-1" />
        <button
          type="button"
          disabled={!ok}
          onClick={() => onSent({ to, subject, body, attached })}
          className="px-3 py-1.5 rounded bg-teal-600 text-white text-sm font-semibold disabled:opacity-50"
        >
          Send →
        </button>
      </div>
      {!ok ? (
        <div className="text-xs text-amber-700">
          A real email needs a valid recipient (must contain @ and .), a
          subject, and a meaningful body.
        </div>
      ) : null}
    </div>
  );
}

function MailClient({ onMilestone, milestones }) {
  const [folder, setFolder] = useState('Inbox');
  const [openId, setOpenId] = useState(null);
  const [composing, setComposing] = useState(false);
  const [replying, setReplying] = useState(null);
  const open = SEED_INBOX.find((m) => m.id === openId);

  function send(msg) {
    setComposing(false);
    setReplying(null);
    if (msg.subject.toLowerCase().includes('thank')) {
      onMilestone('thanksReply');
    } else if (msg.attached) {
      onMilestone('attachedSend');
    } else {
      onMilestone('plainSend');
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-0 min-h-[360px]">
      <aside className="bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-2 text-sm">
        <button
          type="button"
          onClick={() => {
            setComposing(true);
            setOpenId(null);
          }}
          className="w-full mb-2 px-2 py-1.5 rounded bg-teal-600 text-white text-sm font-semibold"
        >
          ✏️ Compose
        </button>
        {['Inbox', 'Sent', 'Spam', 'Trash'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              setFolder(f);
              setOpenId(null);
              setComposing(false);
            }}
            className={`w-full text-left px-2 py-1 rounded ${
              folder === f
                ? 'bg-teal-100 dark:bg-teal-900/30 font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {f}
          </button>
        ))}
      </aside>
      <main className="p-2">
        {composing ? (
          <ComposeForm onSent={send} />
        ) : replying ? (
          <ComposeForm
            prefill={{
              to: replying.from.match(/<([^>]+)>/)?.[1] || replying.from,
              subject: `Re: ${replying.subject}`,
              body: `\n\n--- Original ---\n${replying.body}`,
            }}
            onSent={send}
          />
        ) : open ? (
          <div className="space-y-2 text-sm">
            <div className="text-xs opacity-60">From: {open.from}</div>
            <div className="font-semibold">{open.subject}</div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-2 whitespace-pre-wrap">
              {open.body}
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setReplying(open)}
                className="px-3 py-1 rounded bg-teal-600 text-white text-sm"
              >
                ↩ Reply
              </button>
              <button
                type="button"
                onClick={() => onMilestone('flaggedSpam')}
                className="px-3 py-1 rounded border border-slate-300 dark:border-slate-600 text-sm"
              >
                🚫 Flag as spam
              </button>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-700 text-sm">
            {SEED_INBOX.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(m.id)}
                  className="w-full text-left p-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <div className="font-semibold">{m.subject}</div>
                  <div className="text-xs opacity-70 truncate">{m.from}</div>
                  <div className="text-xs opacity-70 truncate">{m.preview}</div>
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3 p-2 rounded bg-slate-50 dark:bg-slate-800 text-xs">
          <div className="font-semibold mb-1">Milestones</div>
          <ul className="space-y-0.5">
            {[
              ['plainSend', 'Compose and send a normal email'],
              ['attachedSend', 'Send a message with an attachment'],
              ['thanksReply', 'Reply to a message with a “thank you”'],
              ['flaggedSpam', 'Flag a suspicious message as spam'],
            ].map(([k, label]) => (
              <li
                key={k}
                className={milestones[k] ? 'text-green-600' : 'opacity-60'}
              >
                {milestones[k] ? '✓' : '○'} {label}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

function Sim({ onComplete }) {
  const [milestones, setMilestones] = useState({});
  const [phase2, setPhase2] = useState(false);
  const [score2, setScore2] = useState(null);

  function bump(key) {
    setMilestones((m) => ({ ...m, [key]: true }));
  }

  const allDone = [
    'plainSend',
    'attachedSend',
    'thanksReply',
    'flaggedSpam',
  ].every((k) => milestones[k]);

  React.useEffect(() => {
    if (phase2 && score2 != null) {
      const part1 = allDone
        ? 100
        : Math.round((Object.keys(milestones).length / 4) * 100);
      onComplete(Math.round((part1 + score2) / 2));
    }
  }, [phase2, score2, milestones, allDone, onComplete]);

  if (!phase2) {
    return (
      <div className="space-y-3">
        <p className="text-sm">
          Use the simulated email client below to complete all four milestones,
          then continue to the spam-triage drill.
        </p>
        <WindowFrame title="Mail · Inbox">
          <MailClient onMilestone={bump} milestones={milestones} />
        </WindowFrame>
        <button
          type="button"
          disabled={!allDone}
          onClick={() => setPhase2(true)}
          className="px-4 py-2 rounded bg-teal-600 text-white font-semibold disabled:opacity-50"
        >
          Continue to spam triage →
        </button>
      </div>
    );
  }

  return (
    <Triage
      prompt="For each message, decide whether it is Safe, Spam (junk but harmless), or Phishing (a scam trying to steal info)."
      labels={[
        { key: 'safe', name: 'Safe' },
        { key: 'spam', name: 'Spam' },
        { key: 'phish', name: 'Phishing' },
      ]}
      items={[
        {
          id: 'sp1',
          content: (
            <div>
              <div className="text-xs opacity-60">
                From: Maria Lopez &lt;maria.lopez@statecollege.edu&gt;
              </div>
              <div className="font-semibold">
                Tutor session moved to Thursday
              </div>
            </div>
          ),
          correct: 'safe',
          rationale:
            'Real personal message from a known contact at a credible domain.',
        },
        {
          id: 'sp2',
          content: (
            <div>
              <div className="text-xs opacity-60">
                From: PayPal Support &lt;support@paypal-secure-help.tk&gt;
              </div>
              <div className="font-semibold">
                URGENT: account locked — verify now
              </div>
            </div>
          ),
          correct: 'phish',
          rationale:
            'Sender domain is not paypal.com (the .tk fake domain), and uses urgency tactics. Phishing.',
        },
        {
          id: 'sp3',
          content: (
            <div>
              <div className="text-xs opacity-60">
                From: GroupOn Deals &lt;deals@groupon.com&gt;
              </div>
              <div className="font-semibold">50% off pizza near you</div>
            </div>
          ),
          correct: 'spam',
          rationale:
            'Promotional bulk email. Not a scam, just unsolicited — flag as spam.',
        },
        {
          id: 'sp4',
          content: (
            <div>
              <div className="text-xs opacity-60">
                From: HR &lt;hr@yourcompany.com&gt;
              </div>
              <div className="font-semibold">Open enrollment opens Monday</div>
            </div>
          ),
          correct: 'safe',
          rationale: 'Internal HR domain, expected business communication.',
        },
        {
          id: 'sp5',
          content: (
            <div>
              <div className="text-xs opacity-60">
                From: IT &lt;helpdesk@yourcompany-support.co&gt;
              </div>
              <div className="font-semibold">
                Re-confirm your password to keep your access
              </div>
            </div>
          ),
          correct: 'phish',
          rationale:
            'IT will not ask you to email a password; the domain is also slightly off (.co not .com).',
        },
      ]}
      onComplete={setScore2}
    />
  );
}

export const MODULE = {
  id: 'a4_using_email',
  title: 'Using Email',
  standardId: 'NDL-A4',
  standardLabel: 'Core Digital Skills — Using Email',
  bucket: 'A',
  intro:
    'Email is essential for school, work, and applying for jobs. Practice composing, replying, attaching files, and spotting spam vs phishing.',
  learningGoals: [
    'Compose and send an email with a clear subject and body',
    'Reply to a message and attach a file',
    'Recognize spam vs phishing and act safely',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'Reply vs. Reply All — when should you Reply All?',
      choices: [
        'Always — to keep everyone informed',
        'Only when every other recipient genuinely needs to see your reply',
        'Never — it is rude',
        'Only on internal company email',
      ],
      correct: 1,
      rationale:
        'Reply All can spam dozens of people. Use it only when everyone needs the response.',
    },
    {
      q: 'BCC is best used to…',
      choices: [
        'Hide your boss',
        'Send a copy to someone without revealing their address to the others',
        'Spam more people without limit',
        'Save the message as a draft',
      ],
      correct: 1,
      rationale: 'BCC keeps recipients private from each other.',
    },
    {
      q: 'A “phishing” email tries to:',
      choices: [
        'Sell you fishing gear',
        'Make you laugh',
        'Trick you into giving up passwords or personal info',
        'Tell you the weather',
      ],
      correct: 2,
      rationale:
        'Phishing impersonates a trusted source to steal credentials or money.',
    },
    {
      q: 'Which sender address is most suspicious?',
      choices: [
        'support@apple.com',
        'support@apple-secure-help.com',
        'no-reply@apple.com',
        'helpdesk@us.gov',
      ],
      correct: 1,
      rationale:
        'Lookalike domains (apple-secure-help.com) are a classic phishing signal.',
    },
    {
      q: 'Best subject line for a job application email:',
      choices: [
        'Hi',
        'job',
        'Application — Cashier role (Job ID 4271) — Jane Doe',
        '!!!URGENT!!!',
      ],
      correct: 2,
      rationale:
        'Specific subjects help recruiters route and find your message.',
    },
  ],
};

export default function UsingEmail() {
  return null;
}
