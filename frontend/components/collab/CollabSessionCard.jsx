// frontend/components/collab/CollabSessionCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SESSION_LABELS = {
  instructor_led: 'Instructor-Led',
  peer: 'Peer Practice',
  essay: 'Collab Essay',
};

const STATUS_COLORS = {
  lobby:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  complete: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
};

export default function CollabSessionCard({ session }) {
  if (!session) return null;
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="font-semibold text-slate-900 dark:text-white">
            {session.title || 'Untitled Session'}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {SESSION_LABELS[session.sessionType] || session.sessionType}
            {session.subject ? ` • ${session.subject}` : ''}
          </div>
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[session.status] || STATUS_COLORS.lobby}`}
        >
          {session.status}
        </span>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="text-sm text-slate-600 dark:text-slate-300">
          <span className="font-mono font-bold">{session.roomCode}</span>
          <span className="mx-2 text-slate-400">·</span>
          {session.participantCount || 0} / {session.maxParticipants || 30}
        </div>
        <Link
          to={`/collab/${session.roomCode}`}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md"
        >
          Join
        </Link>
      </div>
    </div>
  );
}
