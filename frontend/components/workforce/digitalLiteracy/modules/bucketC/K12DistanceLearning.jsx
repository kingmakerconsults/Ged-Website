/**
 * K12DistanceLearning — LMS navigation, joining a video class, submitting work.
 */
import React, { useState } from 'react';
import { BrowserFrame } from '../../_engine/Frame.jsx';
import Sortable from '../../_engine/sims/Sortable.jsx';
import Sequencer from '../../_engine/sims/Sequencer.jsx';

function LmsSim({ onComplete }) {
  const [tab, setTab] = useState('Stream');
  const [opened, setOpened] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  React.useEffect(() => {
    if (opened && submitted) onComplete(100);
  }, [opened, submitted, onComplete]);
  return (
    <div className="text-sm">
      <div className="flex gap-1 border-b border-slate-300 dark:border-slate-700 px-2">
        {['Stream', 'Classwork', 'People'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-3 py-1 text-xs ${tab === t ? 'border-b-2 border-teal-600 font-semibold' : ''}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="p-3">
        {tab === 'Stream' ? (
          <ul className="space-y-2 text-xs">
            <li>
              📢 <strong>Mr. Park</strong>: Class today at 10am (Meet link in
              Classwork).
            </li>
            <li>📝 Reminder: Math worksheet due Friday.</li>
          </ul>
        ) : tab === 'Classwork' ? (
          <ul className="space-y-2">
            <li className="border border-slate-200 dark:border-slate-700 rounded p-2">
              <div className="font-semibold">📝 Math worksheet</div>
              <div className="text-xs opacity-70">Due Friday</div>
              <button
                type="button"
                onClick={() => {
                  setOpened(true);
                }}
                className="mt-1 text-xs underline text-teal-700 dark:text-teal-300"
              >
                Open assignment
              </button>
              {opened ? (
                <div className="mt-2 space-y-1">
                  <div className="text-xs">
                    Attach a file or type below, then click Submit.
                  </div>
                  <textarea
                    rows={2}
                    className="w-full text-xs px-2 py-1 border border-slate-300 rounded"
                    placeholder="My answers..."
                  />
                  <button
                    type="button"
                    disabled={submitted}
                    onClick={() => setSubmitted(true)}
                    className="text-xs px-2 py-1 rounded bg-teal-600 text-white disabled:opacity-50"
                  >
                    {submitted ? '✓ Submitted' : 'Submit'}
                  </button>
                </div>
              ) : null}
            </li>
            <li className="border border-slate-200 dark:border-slate-700 rounded p-2">
              <div className="font-semibold">🎥 Class Meet link</div>
              <div className="text-xs opacity-70">
                Use this every Tue/Thu at 10am
              </div>
            </li>
          </ul>
        ) : (
          <div className="text-xs">Teacher: Mr. Park · Classmates: 24</div>
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
      <BrowserFrame url="https://classroom.school.edu/c/math-101">
        <LmsSim onComplete={setA} />
      </BrowserFrame>
      <Sequencer
        prompt="Order the steps to join your live video class."
        items={[
          { id: 'a', label: 'Open Classwork (or the email/calendar invite)' },
          { id: 'b', label: 'Click the Meet/Zoom link' },
          { id: 'c', label: 'Allow camera & microphone access' },
          { id: 'd', label: 'Mute yourself unless speaking' },
        ]}
        correctOrder={['a', 'b', 'c', 'd']}
        onComplete={setB}
      />
      <Sortable
        prompt="Where do you do each task in a typical school LMS?"
        buckets={[
          { key: 'stream', name: 'Stream / Announcements' },
          { key: 'class', name: 'Classwork / Assignments' },
          { key: 'people', name: 'People / Roster' },
        ]}
        items={[
          {
            id: '1',
            label: 'Read a teacher reminder',
            correctBucket: 'stream',
          },
          { id: '2', label: 'Submit a worksheet', correctBucket: 'class' },
          {
            id: '3',
            label: "Find a classmate's name",
            correctBucket: 'people',
          },
          { id: '4', label: "Check what's due Friday", correctBucket: 'class' },
        ]}
        onComplete={setC}
      />
    </div>
  );
}

export const MODULE = {
  id: 'c4_k12_distance',
  title: 'K-12 Distance Learning',
  standardId: 'NDL-C4',
  standardLabel: 'Core Digital Skills — K-12 Distance Learning',
  bucket: 'C',
  intro:
    'Distance learning needs a few core moves: navigate the LMS, join the video class on time, and submit work the right way.',
  learningGoals: [
    'Find Stream / Classwork / People',
    'Join a video class with camera & mic ready',
    'Open and submit an assignment',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'Most school LMSs put assignments under:',
      choices: ['People', 'Classwork', 'Settings', 'Recycle Bin'],
      correct: 1,
    },
    {
      q: 'Joining a video class for the first time, you should:',
      choices: [
        'Skip the setup',
        'Test camera and mic ahead of time',
        'Use a noisy area',
        'Show up 30 min late',
      ],
      correct: 1,
    },
    {
      q: 'During a class video, default mic state should usually be:',
      choices: [
        'On',
        'Muted unless speaking',
        'Disconnected',
        'Hardware-locked',
      ],
      correct: 1,
    },
    {
      q: 'After uploading an assignment, you should:',
      choices: [
        'Skip the Submit button',
        'Click Submit/Turn In to confirm',
        'Email the teacher only',
        'Restart computer',
      ],
      correct: 1,
    },
    {
      q: 'A "rubric" tells you:',
      choices: [
        'Class times',
        'How your work will be graded',
        'Who is in the class',
        'The school address',
      ],
      correct: 1,
    },
  ],
};

export default function K12DistanceLearning() {
  return null;
}
