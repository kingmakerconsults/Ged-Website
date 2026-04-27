/**
 * Win11 â€” centered taskbar, Snap layouts, Widgets, Files via shortcut.
 */
import React, { useState } from 'react';
import { WindowFrame } from '../../_engine/Frame.jsx';
import Sortable from '../../_engine/sims/Sortable.jsx';
import Triage from '../../_engine/sims/Triage.jsx';

function Sim({ onComplete }) {
  const [opened, setOpened] = useState(false);
  const [s2, setS2] = useState(null);
  const [s3, setS3] = useState(null);
  React.useEffect(() => {
    if (opened && s2 != null && s3 != null) {
      onComplete(Math.round((100 + s2 + s3) / 3));
    }
  }, [opened, s2, s3, onComplete]);

  return (
    <div className="space-y-6">
      <WindowFrame title="Windows 11 desktop" os="win11">
        <div
          className="relative bg-gradient-to-br from-sky-500 to-indigo-700 text-white"
          style={{ height: 220 }}
        >
          {opened ? (
            <div className="absolute top-4 left-4 bg-white text-slate-900 rounded p-3 text-xs shadow w-48">
              <div className="font-semibold mb-1">File Explorer</div>
              <ul className="text-[11px] space-y-0.5">
                <li>ðŸ“ Documents</li>
                <li>ðŸ“ Downloads</li>
                <li>ðŸ“ Pictures</li>
              </ul>
            </div>
          ) : null}
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border-t border-slate-300 dark:border-slate-700 flex items-center justify-center gap-3 py-1.5">
          {['ðŸ”', 'âŠž', 'ðŸ“', 'ðŸŒ', 'ðŸ›ï¸', 'ðŸ’¬'].map((ico, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (ico === 'ðŸ“') setOpened(true);
              }}
              className={`w-8 h-8 rounded ${
                ico === 'ðŸ“' ? 'bg-blue-100 hover:bg-blue-200' : 'bg-white/40'
              }`}
              aria-label={ico}
            >
              {ico}
            </button>
          ))}
        </div>
      </WindowFrame>
      <div className="text-xs">
        <strong>Task 1:</strong> Open File Explorer from the centered taskbar.
        {opened ? <span className="text-green-600 ml-2">âœ“ done</span> : null}
      </div>

      <Triage
        prompt="Win11 Snap layouts: which is the right reason to use each?"
        labels={[
          { key: 'half', name: 'Half + half' },
          { key: 'quad', name: 'Four quadrants' },
          { key: 'main', name: 'Big main + side stack' },
        ]}
        items={[
          {
            id: 'q1',
            content: 'Compare two web pages side by side.',
            correct: 'half',
            rationale: 'Half/half is good for direct comparisons.',
          },
          {
            id: 'q2',
            content: 'Watch a video while reading email and chatting at once.',
            correct: 'quad',
            rationale: 'Quad fits four windows.',
          },
          {
            id: 'q3',
            content: 'Write a doc while keeping notes and chat visible.',
            correct: 'main',
            rationale: 'Main + side stack keeps focus on writing.',
          },
        ]}
        onComplete={setS2}
      />
      <Sortable
        prompt="Match each task to the new Win11 location."
        buckets={[
          { key: 'start', name: 'Start (centered)' },
          { key: 'set', name: 'Settings' },
          { key: 'wid', name: 'Widgets pane' },
        ]}
        items={[
          { id: 'a', label: 'Quick weather glance', correctBucket: 'wid' },
          {
            id: 'b',
            label: 'Find an app you installed',
            correctBucket: 'start',
          },
          { id: 'c', label: 'Change Bluetooth devices', correctBucket: 'set' },
          {
            id: 'd',
            label: 'Pin an app to the taskbar',
            correctBucket: 'start',
          },
        ]}
        onComplete={setS3}
      />
    </div>
  );
}

export const MODULE = {
  id: 'a6_windows_11',
  title: 'Windows 11',
  standardId: 'NDL-A6',
  standardLabel: 'Northstar â€” Windows 11',
  bucket: 'A',
  intro:
    'Windows 11 keeps the same File Explorer + Settings ideas as Win10 but moves the taskbar to the center and adds Snap layouts and Widgets.',
  learningGoals: [
    'Use the centered taskbar to launch apps',
    'Choose a Snap layout for multitasking',
    'Find Settings, Widgets, and Start in Windows 11',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'Where is the Start button in Windows 11 by default?',
      choices: ['Top-left', 'Bottom-left', 'Bottom-center', 'Top-right'],
      correct: 2,
    },
    {
      q: 'Snap layouts let you:',
      choices: [
        'Print PDFs',
        'Quickly arrange windows in preset grids',
        'Disable Wi-Fi',
        'Restart the PC',
      ],
      correct: 1,
    },
    {
      q: 'Widgets in Windows 11 are best for:',
      choices: [
        'Editing photos',
        'Quick info like weather, news, calendar',
        'Anti-virus',
        'Backups',
      ],
      correct: 1,
    },
    {
      q: 'You want to install a new printer. Where should you go?',
      choices: [
        'Recycle Bin',
        'Settings â†’ Bluetooth & devices',
        'Edge',
        'Notepad',
      ],
      correct: 1,
    },
    {
      q: 'Press Windows + which key to take a screenshot of the whole screen on Win11?',
      choices: ['F1', 'PrtSc', 'Esc', 'Tab'],
      correct: 1,
    },
  ],
};

export default function Windows11() {
  return null;
}
