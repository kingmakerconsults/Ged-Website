/**
 * Telehealth â€” patient portal + video visit + privacy basics.
 */
import React, { useState } from 'react';
import { BrowserFrame } from '../../_engine/Frame.jsx';
import Triage from '../../_engine/sims/Triage.jsx';
import Sequencer from '../../_engine/sims/Sequencer.jsx';

function PortalSim({ onComplete }) {
  const [tab, setTab] = useState('home');
  const [scheduled, setScheduled] = useState(false);
  const [refilled, setRefilled] = useState(false);
  React.useEffect(() => {
    if (scheduled && refilled) onComplete(100);
  }, [scheduled, refilled, onComplete]);
  return (
    <div className="text-sm">
      <div className="flex gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs">
        {['home', 'appointments', 'medications', 'messages'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-2 py-1 rounded ${tab === t ? 'bg-teal-600 text-white' : ''}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="p-3">
        {tab === 'home' && <div>Welcome, Jane. You have 1 upcoming visit.</div>}
        {tab === 'appointments' && (
          <div>
            <div className="mb-2">Schedule a video visit with Dr. Lee.</div>
            <button
              type="button"
              disabled={scheduled}
              onClick={() => setScheduled(true)}
              className="px-2 py-1 rounded bg-teal-600 text-white text-xs disabled:opacity-50"
            >
              {scheduled ? 'âœ“ Scheduled for Thursday 2pm' : 'Schedule'}
            </button>
          </div>
        )}
        {tab === 'medications' && (
          <div>
            <div className="mb-2">Lisinopril 10mg â€” refills remaining: 0</div>
            <button
              type="button"
              disabled={refilled}
              onClick={() => setRefilled(true)}
              className="px-2 py-1 rounded bg-teal-600 text-white text-xs disabled:opacity-50"
            >
              {refilled ? 'âœ“ Refill request sent' : 'Request refill'}
            </button>
          </div>
        )}
        {tab === 'messages' && (
          <div>
            Use messages for non-urgent questions only. For emergencies, call
            911.
          </div>
        )}
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
      <BrowserFrame url="https://myhealth.example.org/portal">
        <PortalSim onComplete={setA} />
      </BrowserFrame>
      <Sequencer
        prompt="Order the steps for a successful telehealth video visit."
        items={[
          { id: 'a', label: 'Test camera / mic / internet 10 minutes early' },
          { id: 'b', label: 'Sit in a quiet, private, well-lit room' },
          {
            id: 'c',
            label:
              'Open the visit link from the portal at the appointment time',
          },
          { id: 'd', label: 'Have your medication list and questions ready' },
        ]}
        correctOrder={['a', 'd', 'b', 'c']}
        onComplete={setB}
      />
      <Triage
        prompt="Telehealth or in-person?"
        labels={[
          { key: 'tele', name: 'Telehealth' },
          { key: 'inp', name: 'In person' },
          { key: '911', name: '911' },
        ]}
        items={[
          {
            id: 't1',
            content: 'Routine medication refill check-in',
            correct: 'tele',
            rationale: 'Med checks fit telehealth.',
          },
          {
            id: 't2',
            content: 'A new chest pain that is severe and sudden',
            correct: '911',
            rationale: 'Emergency â€” call 911.',
          },
          {
            id: 't3',
            content: 'A skin rash that needs the doctor to feel and inspect',
            correct: 'inp',
            rationale: 'Hands-on exam needed.',
          },
          {
            id: 't4',
            content: 'Mental-health therapy session',
            correct: 'tele',
            rationale: 'Therapy is well-suited to video.',
          },
        ]}
        onComplete={setC}
      />
    </div>
  );
}

export const MODULE = {
  id: 'c5_telehealth',
  title: 'Telehealth',
  standardId: 'NDL-C5',
  standardLabel: 'Northstar â€” Telehealth',
  bucket: 'C',
  intro:
    'Telehealth lets you see a clinician by video. Learn to use a patient portal, prepare a video visit, and know when to call 911 instead.',
  learningGoals: [
    'Use a patient portal for visits and refills',
    'Prepare for a video visit',
    'Decide telehealth vs in-person vs 911',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'A patient portal is best for:',
      choices: [
        'Emergencies',
        'Non-urgent messages, refills, scheduling',
        'Calling 911',
        'Online shopping',
      ],
      correct: 1,
    },
    {
      q: 'For a sudden severe chest pain, you should:',
      choices: [
        'Send a portal message',
        'Wait until your next visit',
        'Call 911 / go to ER',
        'Email the doctor',
      ],
      correct: 2,
    },
    {
      q: 'Telehealth privacy is improved by:',
      choices: [
        'Sitting in a public coffee shop',
        'A private, quiet space',
        'Speakerphone in your living room with guests',
        'Sharing the link publicly',
      ],
      correct: 1,
    },
    {
      q: 'Before a video visit, test:',
      choices: [
        'Only camera',
        'Only mic',
        'Camera, mic, and internet',
        'Nothing',
      ],
      correct: 2,
    },
    {
      q: 'A clinician will NEVER ask you for:',
      choices: [
        'Symptoms',
        'Insurance card',
        'Your bank-account password',
        'Medication list',
      ],
      correct: 2,
    },
  ],
};

export default function Telehealth() {
  return null;
}
