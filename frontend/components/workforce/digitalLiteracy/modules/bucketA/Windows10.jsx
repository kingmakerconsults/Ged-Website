/**
 * Win10 — File Explorer, Start menu, Recycle Bin recovery, snipping.
 */
import React, { useState } from 'react';
import { WindowFrame } from '../_engine/Frame.jsx';
import Sortable from '../_engine/sims/Sortable.jsx';
import Sequencer from '../_engine/sims/Sequencer.jsx';

function StartMenu({ onSnip }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-slate-100 dark:bg-slate-800 border-t border-slate-300 dark:border-slate-700 flex items-center px-2 py-1.5 relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="px-2 py-1 rounded bg-blue-700 text-white text-xs font-semibold"
        aria-expanded={open}
      >
        ⊞ Start
      </button>
      <div className="ml-2 text-xs opacity-70">Type here to search</div>
      {open ? (
        <div className="absolute bottom-full left-0 mb-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded shadow p-2 w-48">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onSnip();
            }}
            className="w-full text-left px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
          >
            ✂ Snipping Tool
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full text-left px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
          >
            ⚙ Settings
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full text-left px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
          >
            ⏻ Power → Shut down
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Sim({ onComplete }) {
  const [snipped, setSnipped] = useState(false);
  const [s2, setS2] = useState(null);
  const [s3, setS3] = useState(null);
  React.useEffect(() => {
    if (snipped && s2 != null && s3 != null) {
      onComplete(Math.round((100 + s2 + s3) / 3));
    }
  }, [snipped, s2, s3, onComplete]);
  return (
    <div className="space-y-6">
      <WindowFrame title="Windows 10 desktop" os="win10">
        <div
          className="relative bg-gradient-to-br from-blue-600 to-blue-900 text-white"
          style={{ height: 220 }}
        >
          <div className="absolute top-3 left-3 grid grid-cols-1 gap-3">
            <div className="flex flex-col items-center text-xs">
              <div className="w-8 h-8 bg-white/20 rounded mb-1" />
              <span>This PC</span>
            </div>
            <div className="flex flex-col items-center text-xs">
              <div className="w-8 h-8 bg-white/20 rounded mb-1" />
              <span>Recycle Bin</span>
            </div>
          </div>
          {snipped ? (
            <div className="absolute top-4 right-4 bg-white text-slate-900 rounded p-2 text-xs shadow">
              ✂ Snip captured ✓
            </div>
          ) : null}
        </div>
        <StartMenu onSnip={() => setSnipped(true)} />
      </WindowFrame>
      <div className="text-xs">
        <strong>Task 1:</strong> Open the Start menu and choose Snipping Tool.
        {snipped ? <span className="text-green-600 ml-2">✓ done</span> : null}
      </div>

      <Sequencer
        prompt="Task 2 — Order the steps to recover a deleted file in Windows."
        items={[
          { id: 'a', label: 'Find the file in the list' },
          { id: 'b', label: 'Open the Recycle Bin from the desktop' },
          { id: 'c', label: 'Right-click the file and choose Restore' },
          { id: 'd', label: 'Confirm the file is back in its original folder' },
        ]}
        correctOrder={['b', 'a', 'c', 'd']}
        onComplete={setS2}
      />
      <Sortable
        prompt="Task 3 — Match each task to the right Settings page."
        buckets={[
          { key: 'display', name: 'System → Display' },
          { key: 'network', name: 'Network & Internet' },
          { key: 'accounts', name: 'Accounts' },
          { key: 'update', name: 'Update & Security' },
        ]}
        items={[
          {
            id: 's1',
            label: 'Change screen resolution',
            correctBucket: 'display',
          },
          {
            id: 's2',
            label: 'Connect to a new Wi-Fi network',
            correctBucket: 'network',
          },
          {
            id: 's3',
            label: 'Change your account password',
            correctBucket: 'accounts',
          },
          {
            id: 's4',
            label: 'Install the latest Windows updates',
            correctBucket: 'update',
          },
        ]}
        onComplete={setS3}
      />
    </div>
  );
}

export const MODULE = {
  id: 'a5_windows_10',
  title: 'Windows 10',
  standardId: 'NDL-A5',
  standardLabel: 'Northstar — Windows 10',
  bucket: 'A',
  intro:
    'Navigate Windows 10: Start menu, taskbar, File Explorer, Recycle Bin, and core Settings.',
  learningGoals: [
    'Open the Start menu and search for an app',
    'Recover a deleted file from the Recycle Bin',
    'Find common Settings pages (display, network, accounts, updates)',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'Where do you click first to launch most apps in Windows 10?',
      choices: ['File Explorer', 'Start menu', 'Recycle Bin', 'Browser'],
      correct: 1,
    },
    {
      q: 'You deleted a file by accident. The fastest recovery is:',
      choices: [
        'Reinstall Windows',
        'Open Recycle Bin and Restore',
        'Pay for recovery software',
        'Reboot',
      ],
      correct: 1,
    },
    {
      q: 'The taskbar at the bottom of the screen is for:',
      choices: [
        'Decoration only',
        'Pinned apps and quick switching',
        'Closing windows',
        'Volume only',
      ],
      correct: 1,
    },
    {
      q: 'Press-and-hold which key + click to select multiple non-adjacent files?',
      choices: ['Shift', 'Ctrl', 'Alt', 'Tab'],
      correct: 1,
    },
    {
      q: 'A safe way to shut down Windows 10:',
      choices: [
        'Pull the plug',
        'Hold the power button',
        'Start → Power → Shut down',
        'Close the lid only',
      ],
      correct: 2,
    },
  ],
};

export default function Windows10() {
  return null;
}
