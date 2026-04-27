/**
 * MacOS â€” Finder, Dock, Spotlight, screenshots, force-quit.
 */
import React, { useState } from 'react';
import { WindowFrame } from '../../_engine/Frame.jsx';
import Sortable from '../../_engine/sims/Sortable.jsx';
import Triage from '../../_engine/sims/Triage.jsx';

function Sim({ onComplete }) {
  const [spot, setSpot] = useState('');
  const [spotOpened, setSpotOpened] = useState(false);
  const [s2, setS2] = useState(null);
  const [s3, setS3] = useState(null);
  React.useEffect(() => {
    if (spotOpened && s2 != null && s3 != null) {
      onComplete(Math.round((100 + s2 + s3) / 3));
    }
  }, [spotOpened, s2, s3, onComplete]);

  return (
    <div className="space-y-6">
      <WindowFrame title="macOS desktop" os="mac">
        <div
          className="relative bg-gradient-to-br from-slate-900 to-purple-900 text-white"
          style={{ height: 240 }}
        >
          <div className="absolute top-0 left-0 right-0 h-6 bg-black/40 flex items-center px-2 text-[11px]">
            <span className="font-semibold mr-3"></span>
            <span className="mr-2">Finder</span>
            <span className="mr-2">File</span>
            <span className="mr-2">Edit</span>
            <span className="mr-2">View</span>
            <div className="flex-1" />
            <button
              type="button"
              onClick={() => setSpotOpened(true)}
              className="text-xs"
              aria-label="Spotlight"
            >
              ðŸ”
            </button>
          </div>
          {spotOpened ? (
            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 rounded-lg p-3 shadow-xl w-64">
              <input
                type="text"
                autoFocus
                value={spot}
                onChange={(e) => setSpot(e.target.value)}
                placeholder="Spotlight search..."
                className="w-full px-2 py-1 text-sm border border-slate-300 rounded"
              />
              <div className="text-xs mt-2 opacity-70">
                Type any app name and press Enter (in real macOS it launches).
              </div>
            </div>
          ) : null}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 bg-white/15 px-3 py-2 rounded-2xl">
            {['ðŸ§­', 'ðŸ“§', 'ðŸ—‚ï¸', 'ðŸŽµ', 'âš™ï¸'].map((i) => (
              <span
                key={i}
                className="w-9 h-9 bg-white/30 rounded-lg flex items-center justify-center"
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      </WindowFrame>
      <div className="text-xs">
        <strong>Task 1:</strong> Open Spotlight (top-right magnifier).
        {spotOpened ? (
          <span className="text-green-600 ml-2">âœ“ done</span>
        ) : null}
      </div>
      <Triage
        prompt="What does each macOS shortcut do?"
        labels={[
          { key: 'screen', name: 'Screenshot whole screen' },
          { key: 'region', name: 'Screenshot region' },
          { key: 'fq', name: 'Force-quit menu' },
          { key: 'spot', name: 'Open Spotlight' },
        ]}
        items={[
          {
            id: 'm1',
            content: 'Cmd + Shift + 3',
            correct: 'screen',
            rationale: 'Captures full screen.',
          },
          {
            id: 'm2',
            content: 'Cmd + Shift + 4',
            correct: 'region',
            rationale: 'Crosshair to drag a region.',
          },
          {
            id: 'm3',
            content: 'Cmd + Option + Esc',
            correct: 'fq',
            rationale: 'Opens Force Quit Applications.',
          },
          {
            id: 'm4',
            content: 'Cmd + Space',
            correct: 'spot',
            rationale: 'Opens Spotlight search.',
          },
        ]}
        onComplete={setS2}
      />
      <Sortable
        prompt="Match each task to where you do it on macOS."
        buckets={[
          { key: 'finder', name: 'Finder' },
          { key: 'dock', name: 'Dock' },
          { key: 'sys', name: 'System Settings' },
        ]}
        items={[
          {
            id: 'a',
            label: 'Browse Documents folder',
            correctBucket: 'finder',
          },
          { id: 'b', label: 'Switch to Mail quickly', correctBucket: 'dock' },
          { id: 'c', label: 'Change display scaling', correctBucket: 'sys' },
          { id: 'd', label: 'Eject a USB drive', correctBucket: 'finder' },
        ]}
        onComplete={setS3}
      />
    </div>
  );
}

export const MODULE = {
  id: 'a7_mac_os',
  title: 'Mac OS',
  standardId: 'NDL-A7',
  standardLabel: 'Northstar â€” Mac OS',
  bucket: 'A',
  intro:
    'Mac users have Finder (file browsing), the Dock (quick app launch), Spotlight (search), and System Settings.',
  learningGoals: [
    'Open and search with Spotlight',
    'Take screenshots and force-quit apps',
    'Find Finder, Dock, and System Settings tasks',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'Spotlight is opened with:',
      choices: ['Cmd + Q', 'Cmd + Space', 'Cmd + Tab', 'Cmd + N'],
      correct: 1,
    },
    {
      q: 'The Dock at the bottom of the screen is for:',
      choices: [
        'Wallpapers',
        'Quick app launch and switching',
        'Notifications',
        'Time machine only',
      ],
      correct: 1,
    },
    {
      q: 'You want to capture only part of the screen on Mac. Use:',
      choices: ['Cmd+Shift+3', 'Cmd+Shift+4', 'Cmd+Q', 'Cmd+W'],
      correct: 1,
    },
    {
      q: 'An app froze. Best step?',
      choices: [
        'Pull the plug',
        'Cmd+Option+Esc â†’ Force Quit',
        'Reinstall macOS',
        'Wait days',
      ],
      correct: 1,
    },
    {
      q: 'Where do you change Wi-Fi or Bluetooth on Mac?',
      choices: [
        'Recycle Bin',
        'System Settings (or menu bar icon)',
        'Safari',
        'Notes app',
      ],
      correct: 1,
    },
  ],
};

export default function MacOS() {
  return null;
}
