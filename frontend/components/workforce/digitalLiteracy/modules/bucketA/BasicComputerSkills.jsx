import React from 'react';
import Hotspot from '../../_engine/sims/Hotspot.jsx';
import Sortable from '../../_engine/sims/Sortable.jsx';

function DesktopDiagram() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full">
      <rect x="0" y="0" width="320" height="180" fill="#f1f5f9" />
      {/* monitor */}
      <rect x="60" y="20" width="180" height="100" rx="6" fill="#0f172a" />
      <rect x="68" y="28" width="164" height="84" fill="#1e293b" />
      <rect x="140" y="120" width="20" height="14" fill="#475569" />
      <rect x="110" y="134" width="80" height="6" rx="2" fill="#475569" />
      {/* tower */}
      <rect x="250" y="50" width="40" height="100" rx="4" fill="#334155" />
      <circle cx="270" cy="65" r="3" fill="#22c55e" />
      <rect x="256" y="80" width="28" height="6" fill="#1e293b" />
      {/* keyboard */}
      <rect x="80" y="148" width="130" height="22" rx="3" fill="#cbd5e1" />
      {/* mouse */}
      <ellipse cx="225" cy="160" rx="10" ry="14" fill="#cbd5e1" />
      <line
        x1="225"
        y1="148"
        x2="232"
        y2="135"
        stroke="#94a3b8"
        strokeWidth="1"
      />
    </svg>
  );
}

function Sim({ onComplete }) {
  const [score1, setScore1] = React.useState(null);
  const [score2, setScore2] = React.useState(null);
  React.useEffect(() => {
    if (score1 != null && score2 != null) {
      onComplete(Math.round((score1 + score2) / 2));
    }
  }, [score1, score2, onComplete]);
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-2">Part 1 â€” Identify the parts</h4>
        <Hotspot
          prompt="Click the monitor, keyboard, and mouse."
          diagram={<DesktopDiagram />}
          requiredCount={3}
          regions={[
            {
              id: 'monitor',
              label: 'Monitor',
              correct: true,
              x: 18,
              y: 11,
              w: 56,
              h: 67,
            },
            {
              id: 'tower',
              label: 'Computer tower',
              correct: false,
              x: 78,
              y: 28,
              w: 13,
              h: 56,
            },
            {
              id: 'keyboard',
              label: 'Keyboard',
              correct: true,
              x: 25,
              y: 82,
              w: 41,
              h: 12,
            },
            {
              id: 'mouse',
              label: 'Mouse',
              correct: true,
              x: 67,
              y: 81,
              w: 7,
              h: 16,
            },
          ]}
          onComplete={setScore1}
        />
      </div>
      <div>
        <h4 className="font-semibold mb-2">
          Part 2 â€” Match each action to the right input
        </h4>
        <Sortable
          prompt="Drag each task to the input device that does it."
          buckets={[
            { key: 'mouse', name: 'ðŸ–±ï¸ Mouse' },
            { key: 'kb', name: 'âŒ¨ï¸ Keyboard' },
            { key: 'both', name: 'ðŸ–±ï¸âŒ¨ï¸ Either / both' },
          ]}
          items={[
            { id: 'i1', label: 'Type your name', correctBucket: 'kb' },
            { id: 'i2', label: 'Click a link', correctBucket: 'mouse' },
            { id: 'i3', label: 'Open a folder', correctBucket: 'both' },
            {
              id: 'i4',
              label: 'Right-click for options',
              correctBucket: 'mouse',
            },
            { id: 'i5', label: 'Press Enter to submit', correctBucket: 'kb' },
          ]}
          onComplete={setScore2}
        />
      </div>
    </div>
  );
}

export const MODULE = {
  id: 'a2_basic_computer',
  title: 'Basic Computer Skills',
  standardId: 'NDL-A2',
  standardLabel: 'Northstar â€” Basic Computer Skills',
  bucket: 'A',
  intro:
    'Identify the main parts of a computer, use mouse and keyboard, and understand basic startup/shutdown.',
  learningGoals: [
    'Name the main parts of a desktop computer',
    'Choose the right input device (mouse vs keyboard) for common actions',
    'Understand single-click, double-click, and right-click',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'What does a double-click usually do on a desktop icon?',
      choices: ['Selects it', 'Opens it', 'Deletes it', 'Renames it'],
      correct: 1,
      rationale: 'Double-click opens; single-click selects.',
    },
    {
      q: 'Right-click is most useful for:',
      choices: [
        'Opening apps',
        'Showing a context menu of options',
        'Closing windows',
        'Restarting the computer',
      ],
      correct: 1,
      rationale: 'Right-click opens a context (options) menu.',
    },
    {
      q: 'Which is the correct way to turn off a computer?',
      choices: [
        'Hold the power button until it dies',
        'Use the Shut Down option in the operating system',
        'Unplug it from the wall',
        'Close the lid only',
      ],
      correct: 1,
      rationale: 'Use Shut Down so files save and the OS exits cleanly.',
    },
    {
      q: 'What is the cursor?',
      choices: [
        'The keyboardâ€™s power switch',
        'The on-screen pointer you move with the mouse',
        'A folder for downloads',
        'The label on a button',
      ],
      correct: 1,
      rationale: 'The cursor is the on-screen pointer.',
    },
    {
      q: 'A USB port is used to:',
      choices: [
        'Connect to Wi-Fi only',
        'Plug in devices like flash drives, keyboards, mice',
        'Charge phones â€” and nothing else',
        'Display video output only',
      ],
      correct: 1,
      rationale: 'USB is a general-purpose connector for many peripherals.',
    },
  ],
};

export default function BasicComputerSkills() {
  return null;
}
