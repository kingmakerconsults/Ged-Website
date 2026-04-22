// NowTeachingBanner: top-of-app banner that appears when one of the user's
// instructors has launched a class-led session. One-click "Join" calls the
// /api/classes/:id/join-current-session endpoint and navigates the user
// straight into the room — no code typing required.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiBaseUrl } from '../../src/utils/apiBase.js';

function getToken() {
  return (
    localStorage.getItem('token') || localStorage.getItem('appToken') || ''
  );
}

export default function NowTeachingBanner({ activeSessions, onDismiss }) {
  const navigate = useNavigate();
  const entries = Object.entries(activeSessions || {});
  if (entries.length === 0) return null;

  const join = async (classId, fallbackRoomCode) => {
    const apiBase = getApiBaseUrl();
    try {
      const res = await fetch(
        `${apiBase}/api/classes/${classId}/join-current-session`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      if (res.ok) {
        const data = await res.json();
        navigate(`/collab/${data.roomCode}`);
        return;
      }
    } catch (_) {}
    if (fallbackRoomCode) navigate(`/collab/${fallbackRoomCode}`);
  };

  return (
    <div className="space-y-2 mb-3">
      {entries.map(([classId, info]) => (
        <div
          key={classId}
          className="flex items-center justify-between gap-3 px-4 py-2 rounded-lg border-2 border-purple-500 bg-purple-50 text-purple-900 shadow"
        >
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">
              📡 {info.instructorName || 'Your instructor'} is teaching now
            </div>
            <div className="text-xs truncate">
              {info.title}
              {info.subject ? ` · ${info.subject}` : ''}
            </div>
          </div>
          <button
            onClick={() => join(classId, info.roomCode)}
            className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded"
          >
            Join
          </button>
          <button
            onClick={() => onDismiss?.(classId)}
            className="px-2 py-1 text-purple-700 hover:text-purple-900 text-lg leading-none"
            aria-label="Dismiss"
            title="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
