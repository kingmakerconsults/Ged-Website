/**
 * VideoConferencing — Zoom/Meet/Teams etiquette and controls.
 */
import React, { useState } from 'react';
import { WindowFrame } from '../_engine/Frame.jsx';
import Triage from '../_engine/sims/Triage.jsx';
import Sequencer from '../_engine/sims/Sequencer.jsx';

function VideoChrome({ onComplete }) {
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [bg, setBg] = useState('none');
  const [reaction, setReaction] = useState(null);
  const [share, setShare] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [chatSent, setChatSent] = useState(false);
  React.useEffect(() => {
    if (!mic && cam && bg !== 'none' && reaction && share && chatSent)
      onComplete(100);
  }, [mic, cam, bg, reaction, share, chatSent, onComplete]);
  return (
    <div className="p-3 space-y-2 text-sm">
      <div className="aspect-video bg-slate-900 text-white rounded relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-xs opacity-60">
          {cam ? '🎥 Your camera (live)' : '📷 Camera off'}
        </div>
        {bg !== 'none' ? (
          <div className="absolute top-1 left-1 text-[10px] bg-black/40 px-1 rounded">
            BG: {bg}
          </div>
        ) : null}
        {reaction ? (
          <div className="absolute top-2 right-2 text-2xl">{reaction}</div>
        ) : null}
        {share ? (
          <div className="absolute bottom-1 left-1 text-[10px] bg-teal-700 px-1 rounded">
            Sharing: Slide deck
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        <button
          type="button"
          onClick={() => setMic((m) => !m)}
          className={`px-2 py-1 rounded border ${mic ? 'border-slate-300' : 'bg-red-100 border-red-400 text-red-900'}`}
        >
          {mic ? '🎙 Mic on' : '🔇 Mic off'}
        </button>
        <button
          type="button"
          onClick={() => setCam((c) => !c)}
          className={`px-2 py-1 rounded border ${cam ? 'bg-teal-50 border-teal-400 text-teal-900' : 'border-slate-300'}`}
        >
          {cam ? '🎥 Cam on' : '📷 Cam off'}
        </button>
        <select
          value={bg}
          onChange={(e) => setBg(e.target.value)}
          className="px-2 py-1 rounded border border-slate-300 text-xs"
        >
          <option value="none">No background</option>
          <option value="blur">Blur</option>
          <option value="office">Office</option>
        </select>
        {['👍', '👏', '✋'].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setReaction(r)}
            className={`px-2 py-1 rounded border ${reaction === r ? 'bg-teal-600 text-white border-teal-700' : 'border-slate-300'}`}
          >
            {r}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setShare(true)}
          className={`px-2 py-1 rounded border ${share ? 'bg-teal-600 text-white border-teal-700' : 'border-slate-300'}`}
        >
          {share ? '🖥 Sharing' : '🖥 Share screen'}
        </button>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          value={chatMsg}
          onChange={(e) => setChatMsg(e.target.value)}
          placeholder="Type a chat message..."
          className="flex-1 px-2 py-1 border border-slate-300 rounded text-xs"
        />
        <button
          type="button"
          disabled={chatMsg.length < 3 || chatSent}
          onClick={() => setChatSent(true)}
          className="px-2 py-1 text-xs rounded bg-teal-600 text-white disabled:opacity-50"
        >
          {chatSent ? 'Sent ✓' : 'Send to chat'}
        </button>
      </div>
      <div className="text-xs opacity-70">
        Goal: mute mic, keep cam on, set a background, send a reaction, share
        screen, and post a chat message.
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
      <WindowFrame title="Team standup — Meet">
        <VideoChrome onComplete={setA} />
      </WindowFrame>
      <Sequencer
        prompt="Order pre-meeting prep."
        items={[
          { id: 'a', label: 'Test camera + mic in the app settings' },
          { id: 'b', label: 'Plug in or charge the laptop' },
          { id: 'c', label: 'Open the meeting link 2 minutes early' },
          { id: 'd', label: 'Mute notifications and close unrelated tabs' },
        ]}
        correctOrder={['b', 'a', 'd', 'c']}
        onComplete={setB}
      />
      <Triage
        prompt="Polite or impolite?"
        labels={[
          { key: 'polite', name: 'Polite' },
          { key: 'imp', name: 'Impolite' },
        ]}
        items={[
          {
            id: '1',
            content: 'Eating lunch loudly while unmuted',
            correct: 'imp',
            rationale: 'Mute when not speaking.',
          },
          {
            id: '2',
            content: 'Using the chat to share a link instead of interrupting',
            correct: 'polite',
            rationale: 'Chat is great for parallel info.',
          },
          {
            id: '3',
            content: 'Showing up late and not greeting anyone',
            correct: 'imp',
            rationale: 'Acknowledge the room.',
          },
          {
            id: '4',
            content: 'Raising your hand before speaking in a big meeting',
            correct: 'polite',
            rationale: 'Keeps the conversation orderly.',
          },
        ]}
        onComplete={setC}
      />
    </div>
  );
}

export const MODULE = {
  id: 'd3_video_conferencing',
  title: 'Video Conferencing',
  standardId: 'BEYOND-D3',
  standardLabel: 'Beyond Northstar — Video Conferencing',
  bucket: 'D',
  intro:
    'Run your meetings well: control mic/cam, share screen, use chat and reactions, and follow simple etiquette.',
  learningGoals: [
    'Control mic, camera, background',
    'Use chat, reactions, and screen share',
    'Follow basic etiquette',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'Default mic state when you join most meetings should be:',
      choices: ['On', 'Muted', 'Disconnected', 'Random'],
      correct: 1,
    },
    {
      q: 'A "virtual background" can:',
      choices: [
        'Add a fake background image',
        'Improve audio',
        'Speed up internet',
        'Print slides',
      ],
      correct: 0,
    },
    {
      q: 'Sharing your screen — choose:',
      choices: [
        'Whole screen always',
        'A specific window/tab when possible',
        'Random',
        'Webcam',
      ],
      correct: 1,
    },
    {
      q: 'Chat in a meeting is best for:',
      choices: [
        'Everything',
        'Quick links and questions without interrupting',
        'Personal gossip',
        'Spam',
      ],
      correct: 1,
    },
    {
      q: 'A camera-off meeting is appropriate when:',
      choices: [
        'Always',
        'Internet is too slow or in a private setting where ok',
        'Boss told you to stay on',
        'Never',
      ],
      correct: 1,
    },
  ],
};

export default function VideoConferencing() {
  return null;
}
