/**
 * SmartphonePrivacy — app permissions, location services, ad ID.
 */
import React, { useState } from 'react';
import { PhoneFrame } from '../../_engine/Frame.jsx';
import Triage from '../../_engine/sims/Triage.jsx';

function PermsSim({ onComplete }) {
  const [perms, setPerms] = useState({
    flashlight_loc: 'allow',
    flashlight_contacts: 'allow',
    weather_loc: 'allow',
    bank_loc: 'allow',
    photoedit_contacts: 'allow',
  });
  function set(k, v) {
    setPerms((p) => ({ ...p, [k]: v }));
  }
  React.useEffect(() => {
    const ok =
      perms.flashlight_loc === 'deny' &&
      perms.flashlight_contacts === 'deny' &&
      perms.weather_loc === 'while' &&
      perms.bank_loc === 'while' &&
      perms.photoedit_contacts === 'deny';
    if (ok) onComplete(100);
  }, [perms, onComplete]);
  function row(label, key) {
    return (
      <li className="flex items-center justify-between gap-2 py-1 text-xs">
        <span>{label}</span>
        <select
          value={perms[key]}
          onChange={(e) => set(key, e.target.value)}
          className="px-1 py-0.5 border border-slate-300 rounded text-xs"
        >
          <option value="allow">Always allow</option>
          <option value="while">While using app</option>
          <option value="deny">Deny</option>
        </select>
      </li>
    );
  }
  return (
    <div className="p-2 text-sm">
      <div className="font-semibold mb-1">App permissions</div>
      <div className="text-xs opacity-70 mb-2">
        Pick the right permission for each request. (Goal: tighten unneeded
        access.)
      </div>
      <ul className="divide-y divide-slate-200 dark:divide-slate-700">
        {row('Flashlight app — Location', 'flashlight_loc')}
        {row('Flashlight app — Contacts', 'flashlight_contacts')}
        {row('Weather app — Location', 'weather_loc')}
        {row('Bank app — Location (for fraud detection)', 'bank_loc')}
        {row('Photo editor — Contacts', 'photoedit_contacts')}
      </ul>
    </div>
  );
}

function Sim({ onComplete }) {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  React.useEffect(() => {
    if (a != null && b != null) onComplete(Math.round((a + b) / 2));
  }, [a, b, onComplete]);
  return (
    <div className="space-y-6">
      <PhoneFrame>
        <PermsSim onComplete={setA} />
      </PhoneFrame>
      <Triage
        prompt="Tighten or relax each setting?"
        labels={[
          { key: 'tight', name: 'Tighten (more privacy)' },
          { key: 'keep', name: 'Keep as-is' },
        ]}
        items={[
          {
            id: '1',
            content: 'Personalized ads using your advertising ID',
            correct: 'tight',
            rationale: 'Reset/limit ad ID for less tracking.',
          },
          {
            id: '2',
            content: 'Find My Phone (so you can recover a lost device)',
            correct: 'keep',
            rationale: 'Useful safety feature.',
          },
          {
            id: '3',
            content: 'Background location for a flashlight app',
            correct: 'tight',
            rationale: 'No legitimate need.',
          },
          {
            id: '4',
            content: 'Microphone access for a voice-memo app',
            correct: 'keep',
            rationale: 'Required for the app to function.',
          },
          {
            id: '5',
            content: "Auto-upload of every photo to a free cloud you don't use",
            correct: 'tight',
            rationale: 'Disable to reduce data exposure.',
          },
        ]}
        onComplete={setB}
      />
    </div>
  );
}

export const MODULE = {
  id: 'd2_smartphone_privacy',
  title: 'Smartphone Privacy',
  standardId: 'BEYOND-D2',
  standardLabel: 'Pro Track — Smartphone Privacy',
  bucket: 'D',
  intro:
    'Phones leak data through over-eager apps. Audit permissions, location, and tracking IDs to take back control.',
  learningGoals: [
    'Set per-app permissions thoughtfully',
    'Limit background location and tracking',
    'Reset/limit advertising IDs',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'A flashlight app probably does NOT need:',
      choices: [
        'Camera/torch toggle',
        'Your contacts',
        'Your buttons',
        'Battery info',
      ],
      correct: 1,
    },
    {
      q: '"While using the app" is a location setting that:',
      choices: [
        'Always shares location',
        'Shares location only when the app is in the foreground',
        'Disables GPS',
        'Hides apps',
      ],
      correct: 1,
    },
    {
      q: 'Resetting your advertising ID:',
      choices: [
        'Speeds up your phone',
        'Reduces cross-app ad tracking',
        'Removes the SIM',
        'Bricks the device',
      ],
      correct: 1,
    },
    {
      q: 'Find My Phone is best:',
      choices: [
        'Always off',
        'On — it helps recover a lost phone',
        'Removed entirely',
        'Only on Wi-Fi',
      ],
      correct: 1,
    },
    {
      q: 'Granting "Always allow" location to a non-essential app means:',
      choices: [
        'Better battery',
        'It can pull your location even when closed',
        'Faster Wi-Fi',
        'No effect',
      ],
      correct: 1,
    },
  ],
};

export default function SmartphonePrivacy() {
  return null;
}
