/**
 * AiLiteracy (FLAGSHIP) — hallucination, privacy, citation, bias.
 */
import React, { useState } from 'react';
import { WindowFrame } from '../_engine/Frame.jsx';
import Triage from '../_engine/sims/Triage.jsx';
import Sortable from '../_engine/sims/Sortable.jsx';

function ChatSim({ onComplete }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! What would you like help with today?' },
  ]);
  const [draft, setDraft] = useState('');
  const [milestones, setMilestones] = useState({
    specific: false,
    verify: false,
    noPrivate: false,
  });

  function send() {
    if (!draft.trim()) return;
    const userMsg = { role: 'user', text: draft };
    let aiMsg;
    const ms = { ...milestones };
    const lower = draft.toLowerCase();
    if (
      lower.includes('ssn') ||
      lower.includes('social security') ||
      lower.includes('credit card') ||
      lower.includes('password')
    ) {
      aiMsg = {
        role: 'ai',
        text: '⚠️ You asked me about private info. Reminder: never paste real SSNs, card numbers, or passwords into any chatbot.',
      };
    } else if (
      lower.length > 30 &&
      (lower.includes('explain') ||
        lower.includes('how do i') ||
        lower.includes('what is'))
    ) {
      aiMsg = {
        role: 'ai',
        text: 'Here is a possible answer based on training data. Note: I can be wrong — please verify against a primary source before acting.',
      };
      ms.specific = true;
      ms.verify = true;
    } else if (lower.length < 10) {
      aiMsg = {
        role: 'ai',
        text: 'Your prompt is very short. The more specific you are, the better my answer.',
      };
    } else {
      aiMsg = {
        role: 'ai',
        text: '(Response.) Always check facts independently — I sometimes hallucinate.',
      };
      ms.specific = true;
    }
    if (
      !lower.includes('ssn') &&
      !lower.includes('credit card') &&
      !lower.includes('password')
    ) {
      ms.noPrivate = true;
    }
    setMessages((m) => [...m, userMsg, aiMsg]);
    setMilestones(ms);
    setDraft('');
  }
  React.useEffect(() => {
    if (milestones.specific && milestones.verify && milestones.noPrivate)
      onComplete(100);
  }, [milestones, onComplete]);

  return (
    <div className="p-3 space-y-2 text-sm">
      <div className="border border-slate-200 dark:border-slate-700 rounded p-2 max-h-[220px] overflow-auto space-y-2 bg-slate-50 dark:bg-slate-900">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-xs ${m.role === 'ai' ? 'text-teal-700 dark:text-teal-300' : 'text-slate-700 dark:text-slate-200'}`}
          >
            <strong>{m.role === 'ai' ? 'AI:' : 'You:'}</strong> {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask a clear, specific question (don't paste private info)..."
          className="flex-1 px-2 py-1 rounded border border-slate-300 dark:border-slate-600 text-xs"
        />
        <button
          type="button"
          onClick={send}
          className="px-3 py-1 rounded bg-teal-600 text-white text-xs"
        >
          Send
        </button>
      </div>
      <div className="text-xs space-y-1">
        <div className={milestones.specific ? 'text-green-600' : ''}>
          {milestones.specific ? '✓' : '○'} Send a clear, specific prompt (≥30
          chars, includes a question)
        </div>
        <div className={milestones.verify ? 'text-green-600' : ''}>
          {milestones.verify ? '✓' : '○'} Get the AI to remind you to verify
          (use "explain"/"how do I"/"what is")
        </div>
        <div className={milestones.noPrivate ? 'text-green-600' : ''}>
          {milestones.noPrivate ? '✓' : '○'} Don\'t paste private info (SSN,
          card, password)
        </div>
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
      <WindowFrame title="AI Chat Assistant">
        <ChatSim onComplete={setA} />
      </WindowFrame>
      <Triage
        prompt="The AI gives you a confident answer. Use the result, double-check it, or reject it?"
        labels={[
          { key: 'use', name: 'Use as-is' },
          { key: 'check', name: 'Double-check then use' },
          { key: 'reject', name: 'Reject — wrong domain for AI' },
        ]}
        items={[
          {
            id: '1',
            content: 'AI summarizes a paragraph you just pasted in.',
            correct: 'use',
            rationale: 'Self-contained summarization is a strength.',
          },
          {
            id: '2',
            content:
              'AI quotes a 2024 court case — you need to cite it in a paper.',
            correct: 'check',
            rationale: 'Models hallucinate cases; verify in a real database.',
          },
          {
            id: '3',
            content: 'AI gives medical dosing advice for your child.',
            correct: 'reject',
            rationale: 'Medical decisions need a real clinician.',
          },
          {
            id: '4',
            content: 'AI suggests grammar fixes to your cover letter.',
            correct: 'use',
            rationale: 'Style/grammar is a low-stakes strength.',
          },
          {
            id: '5',
            content: 'AI answers a math homework problem.',
            correct: 'check',
            rationale: 'AI can make arithmetic errors; verify the steps.',
          },
        ]}
        onComplete={setB}
      />
      <Sortable
        prompt="Match each AI risk to its mitigation."
        buckets={[
          { key: 'check', name: 'Verify with another source' },
          { key: 'noshare', name: 'Do not paste private info' },
          { key: 'cite', name: 'Cite the AI / your sources' },
        ]}
        items={[
          {
            id: 'a',
            label: 'Hallucination (made-up facts)',
            correctBucket: 'check',
          },
          { id: 'b', label: 'Privacy leakage', correctBucket: 'noshare' },
          {
            id: 'c',
            label: 'Plagiarism / academic-integrity',
            correctBucket: 'cite',
          },
          { id: 'd', label: 'Outdated training data', correctBucket: 'check' },
          {
            id: 'e',
            label: 'Pasting your password to "test" something',
            correctBucket: 'noshare',
          },
        ]}
        onComplete={setC}
      />
    </div>
  );
}

export const MODULE = {
  id: 'd1_ai_literacy',
  title: 'AI Literacy',
  standardId: 'BEYOND-D1',
  standardLabel: 'Beyond Northstar — AI Literacy',
  bucket: 'D',
  intro:
    'Generative AI is powerful but unreliable. Learn to prompt clearly, recognize hallucination, protect your privacy, and cite responsibly.',
  learningGoals: [
    'Write specific prompts',
    'Verify AI claims against primary sources',
    'Avoid pasting private/sensitive data into AI tools',
    'Cite AI use honestly',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: '"Hallucination" in AI means:',
      choices: [
        'The AI sees images',
        'It produces confident but false content',
        'It is broken',
        'It runs out of memory',
      ],
      correct: 1,
    },
    {
      q: 'You should NEVER paste into a chatbot:',
      choices: [
        'A summary',
        'Your full Social Security Number',
        'A grammar question',
        'A recipe',
      ],
      correct: 1,
    },
    {
      q: 'Most-reliable use of AI is:',
      choices: [
        'Final medical diagnosis',
        'Legal filings without review',
        'Drafting / brainstorming / explaining',
        'Picking stocks',
      ],
      correct: 2,
    },
    {
      q: 'A "prompt" is:',
      choices: [
        'The model output',
        'The instruction you give the AI',
        'The model name',
        'The model size',
      ],
      correct: 1,
    },
    {
      q: 'Best practice when AI cites a source:',
      choices: [
        'Trust it — it cited!',
        'Verify the source actually exists and says what AI claims',
        'Delete it',
        'Memorize it',
      ],
      correct: 1,
    },
  ],
};

export default function AiLiteracy() {
  return null;
}
