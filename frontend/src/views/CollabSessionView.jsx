// frontend/src/views/CollabSessionView.jsx
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCollabSocket from '../../components/collab/useCollabSocket.js';
import CollabLobby from '../../components/collab/CollabLobby.jsx';
import CollabQuizSession from '../../components/collab/CollabQuizSession.jsx';
import CollabEssaySession from '../../components/collab/CollabEssaySession.jsx';

function getCurrentUserId() {
  try {
    const raw = localStorage.getItem('appUser');
    if (raw) {
      const u = JSON.parse(raw);
      return Number(u.id || u.userId);
    }
  } catch (_) {}
  // Decode JWT payload as fallback
  try {
    const token =
      localStorage.getItem('token') || localStorage.getItem('appToken');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1] || ''));
    return Number(payload.sub ?? payload.userId ?? payload.user_id);
  } catch (_) {
    return null;
  }
}

export default function CollabSessionView() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const userId = useMemo(() => getCurrentUserId(), []);
  const {
    roomState,
    participants,
    lastReveal,
    lastEvent,
    error,
    emit,
    leaveRoom,
  } = useCollabSocket({ roomCode, autoJoin: true });

  const handleLeave = () => {
    leaveRoom();
    navigate('/collab');
  };

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <div className="p-4 rounded bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
          {error}
        </div>
        <button
          onClick={() => navigate('/collab')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Play Together
        </button>
      </div>
    );
  }

  if (!roomState) {
    return (
      <div className="text-center p-8 text-slate-500">Connecting to room…</div>
    );
  }

  // End screen
  if (roomState.status === 'complete') {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Session Complete</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Thanks for playing together!
        </p>
        <button
          onClick={() => navigate('/collab')}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Play Together
        </button>
      </div>
    );
  }

  // Lobby
  if (roomState.status === 'lobby') {
    return (
      <CollabLobby
        roomState={roomState}
        currentUserId={userId}
        emit={emit}
        onLeave={handleLeave}
      />
    );
  }

  // Active
  if (roomState.sessionType === 'essay') {
    return (
      <CollabEssaySession
        roomState={roomState}
        currentUserId={userId}
        emit={emit}
      />
    );
  }
  return (
    <CollabQuizSession
      roomState={roomState}
      currentUserId={userId}
      emit={emit}
      lastReveal={lastReveal}
      lastEvent={lastEvent}
    />
  );
}
