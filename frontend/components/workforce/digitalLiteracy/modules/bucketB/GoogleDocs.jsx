/**
 * GoogleDocs â€” collaboration features (sharing, comments, version history).
 */
import React, { useState } from 'react';
import { WindowFrame } from '../../_engine/Frame.jsx';
import Triage from '../../_engine/sims/Triage.jsx';
import Sortable from '../../_engine/sims/Sortable.jsx';

function ShareDialog({ onComplete }) {
  const [email, setEmail] = useState('');
  const [perm, setPerm] = useState('view');
  const [shared, setShared] = useState(false);
  const [comment, setComment] = useState('');
  const [posted, setPosted] = useState(false);

  React.useEffect(() => {
    if (shared && posted) onComplete(100);
  }, [shared, posted, onComplete]);

  return (
    <div className="p-3 space-y-3 text-sm">
      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded">
        <div className="font-semibold mb-2">Share document</div>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="someone@example.com"
            className="flex-1 px-2 py-1 rounded border border-slate-300 dark:border-slate-600 text-sm"
          />
          <select
            value={perm}
            onChange={(e) => setPerm(e.target.value)}
            className="px-2 py-1 rounded border border-slate-300 dark:border-slate-600 text-sm"
          >
            <option value="view">Viewer</option>
            <option value="comment">Commenter</option>
            <option value="edit">Editor</option>
          </select>
          <button
            type="button"
            disabled={!email.includes('@') || shared}
            onClick={() => setShared(true)}
            className="px-3 py-1 rounded bg-teal-600 text-white disabled:opacity-50"
          >
            Share
          </button>
        </div>
        {shared ? (
          <div className="text-xs mt-2 text-green-600">
            âœ“ Shared with {email} as {perm}
          </div>
        ) : null}
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded">
        <div className="font-semibold mb-2">
          Add a comment to "this paragraph"
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Suggest a change..."
            className="flex-1 px-2 py-1 rounded border border-slate-300 dark:border-slate-600 text-sm"
          />
          <button
            type="button"
            disabled={comment.length < 4 || posted}
            onClick={() => setPosted(true)}
            className="px-3 py-1 rounded bg-teal-600 text-white disabled:opacity-50"
          >
            Post
          </button>
        </div>
        {posted ? (
          <div className="text-xs mt-2 text-green-600">
            âœ“ Comment posted: "{comment}"
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Sim({ onComplete }) {
  const [s1, setS1] = useState(null);
  const [s2, setS2] = useState(null);
  const [s3, setS3] = useState(null);
  React.useEffect(() => {
    if (s1 != null && s2 != null && s3 != null) {
      onComplete(Math.round((s1 + s2 + s3) / 3));
    }
  }, [s1, s2, s3, onComplete]);
  return (
    <div className="space-y-6">
      <WindowFrame title="My Resume - Google Docs">
        <ShareDialog onComplete={setS1} />
      </WindowFrame>
      <Triage
        prompt="Pick the right share permission for each person."
        labels={[
          { key: 'view', name: 'Viewer' },
          { key: 'comment', name: 'Commenter' },
          { key: 'edit', name: 'Editor' },
        ]}
        items={[
          {
            id: 'g1',
            content: 'A friend who only needs to read your resume.',
            correct: 'view',
            rationale: 'Viewers cannot change anything.',
          },
          {
            id: 'g2',
            content: 'Your tutor who should suggest edits without overwriting.',
            correct: 'comment',
            rationale: 'Commenters can comment and suggest, not edit.',
          },
          {
            id: 'g3',
            content: 'Your group partner co-writing the document.',
            correct: 'edit',
            rationale: 'Co-authors need Editor access.',
          },
        ]}
        onComplete={setS2}
      />
      <Sortable
        prompt="Where do these tasks live in Google Docs?"
        buckets={[
          { key: 'file', name: 'File menu' },
          { key: 'tools', name: 'Tools menu' },
          { key: 'share', name: 'Share button' },
        ]}
        items={[
          { id: 'a', label: 'Download as PDF', correctBucket: 'file' },
          { id: 'b', label: 'See version history', correctBucket: 'file' },
          {
            id: 'c',
            label: 'Run spelling and grammar check',
            correctBucket: 'tools',
          },
          { id: 'd', label: 'Get a shareable link', correctBucket: 'share' },
          { id: 'e', label: 'Word count', correctBucket: 'tools' },
        ]}
        onComplete={setS3}
      />
    </div>
  );
}

export const MODULE = {
  id: 'b4_google_docs',
  title: 'Google Docs',
  standardId: 'NDL-B4',
  standardLabel: 'Northstar â€” Google Docs',
  bucket: 'B',
  intro:
    'Google Docs is free, web-based, and built for collaboration. Practice sharing with the right permission and adding comments.',
  learningGoals: [
    'Share documents with the right permission',
    'Add and resolve comments',
    'Find common menu items (file/tools/share)',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'Google Docs autosaves to:',
      choices: [
        'Your downloads folder',
        'Google Drive',
        'Email',
        'A USB drive',
      ],
      correct: 1,
    },
    {
      q: 'A "Commenter" can:',
      choices: [
        'Edit the doc directly',
        'Only read',
        'Read and add comments/suggestions',
        'Delete the doc',
      ],
      correct: 2,
    },
    {
      q: 'Version history lets you:',
      choices: [
        'Print',
        'See and restore previous versions',
        'Add fonts',
        'Encrypt',
      ],
      correct: 1,
    },
    {
      q: 'To export as a Word file you use:',
      choices: [
        'Tools â†’ Spelling',
        'File â†’ Download â†’ .docx',
        'Help',
        'Insert menu',
      ],
      correct: 1,
    },
    {
      q: 'You can collaborate in real time becauseâ€¦',
      choices: [
        'The doc is in the cloud',
        'It uses email',
        'It is offline only',
        'It auto-prints',
      ],
      correct: 0,
    },
  ],
};

export default function GoogleDocs() {
  return null;
}
