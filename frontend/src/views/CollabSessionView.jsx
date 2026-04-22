// frontend/src/views/CollabSessionView.jsx
import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCollabSocket from '../../components/collab/useCollabSocket.js';
import CollabLobby from '../../components/collab/CollabLobby.jsx';
import CollabQuizSession from '../../components/collab/CollabQuizSession.jsx';
import CollabEssaySession from '../../components/collab/CollabEssaySession.jsx';
import CollabHeader from '../../components/collab/CollabHeader.jsx';
import useCollabTheme from '../../components/collab/useCollabTheme.js';

function getCurrentUserId() {
  try {
    const raw = localStorage.getItem('appUser');
    if (raw) {
      const u = JSON.parse(raw);
      return Number(u.id || u.userId);
    }
  } catch (_) {}
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

function PageShell({ children, roomCode }) {
  const t = useCollabTheme();
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: t.pageBg, color: t.pageText, ...t.cssVars }}
    >
      <CollabHeader />
      {roomCode ? <RoomCodeBanner roomCode={roomCode} /> : null}
      <div className="max-w-5xl mx-auto p-6">{children}</div>
    </div>
  );
}

function RoomCodeBanner({ roomCode }) {
  const t = useCollabTheme();
  const [copied, setCopied] = useState(null);
  const shareUrl = `${window.location.origin}/collab/${roomCode}`;

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 1600);
    } catch (_) {
      // ignore
    }
  };

  const btnStyle = {
    backgroundColor: t.pillBg,
    color: t.pillText,
    borderColor: t.bannerBorder,
  };

  return (
    <div
      className="w-full border-b"
      style={{ backgroundColor: t.bannerBg, borderColor: t.bannerBorder }}
    >
      <div className="max-w-5xl mx-auto px-6 py-2 flex flex-wrap items-center gap-3 text-sm">
        <span
          className="font-semibold"
          style={{ color: t.bannerText }}
        >
          Room code:
        </span>
        <code
          className="px-2 py-1 rounded font-mono text-base font-bold tracking-widest"
          style={{ backgroundColor: t.pillBg, color: t.pillText }}
        >
          {roomCode}
        </code>
        <button
          type="button"
          onClick={() => copy(roomCode, 'code')}
          className="px-2 py-1 rounded text-xs font-semibold border"
          style={btnStyle}
        >
          {copied === 'code' ? '✓ Copied' : 'Copy code'}
        </button>
        <button
          type="button"
          onClick={() => copy(shareUrl, 'link')}
          className="px-2 py-1 rounded text-xs font-semibold border"
          style={btnStyle}
        >
          {copied === 'link' ? '✓ Copied' : 'Copy join link'}
        </button>
        <span
          className="text-xs ml-auto hidden sm:inline"
          style={{ color: t.subtleText }}
        >
          Anyone signed in can join with this code at any time.
        </span>
      </div>
    </div>
  );
}

export default function CollabSessionView() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const userId = useMemo(() => getCurrentUserId(), []);
  const hasToken = useMemo(() => {
    try {
      return !!(
        localStorage.getItem('token') || localStorage.getItem('appToken')
      );
    } catch (_) {
      return false;
    }
  }, []);
  const isLoggedIn = !!userId && hasToken;

  // Only attempt to join the room when the user is authenticated; otherwise
  // we'll render an auth prompt below.
  const { roomState, lastReveal, lastEvent, error, emit, leaveRoom } =
    useCollabSocket({ roomCode, autoJoin: isLoggedIn });

  if (!isLoggedIn) {
    return (
      <PageShell>
        <div
          className="rounded-lg border p-6 shadow-sm"
          style={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0' }}
        >
          <h2 className="text-2xl font-bold mb-2">🤝 Work Together</h2>
          <p className="text-sm text-slate-700 mb-4">
            You need to be signed in to join a Work Together session.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-semibold"
          >
            Sign in from the Dashboard
          </button>
        </div>
      </PageShell>
    );
  }

  const handleLeave = () => {
    leaveRoom();
    navigate('/collab');
  };

  if (error) {
    return (
      <PageShell roomCode={roomCode}>
        <div className="p-4 rounded bg-red-100 text-red-800 border border-red-200">
          {error === 'websocket error'
            ? 'Could not reach the collaboration server. The backend may still be deploying — please try again in a minute.'
            : error}
        </div>
        <button
          onClick={() => navigate('/collab')}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
        >
          ← Back to Work Together
        </button>
      </PageShell>
    );
  }

  if (!roomState) {
    return (
      <PageShell roomCode={roomCode}>
        <div className="text-center p-8 text-slate-500">
          Connecting to room…
        </div>
      </PageShell>
    );
  }

  if (roomState.status === 'complete') {
    // Quiz sessions render a full review screen inside CollabQuizSession.
    if (
      roomState.sessionType === 'instructor_led' ||
      roomState.sessionType === 'peer'
    ) {
      return (
        <PageShell roomCode={roomCode}>
          <CollabQuizSession
            roomState={roomState}
            currentUserId={userId}
            emit={emit}
            lastReveal={lastReveal}
            lastEvent={lastEvent}
          />
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/collab')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
            >
              ← Back to Work Together
            </button>
          </div>
        </PageShell>
      );
    }
    return (
      <PageShell roomCode={roomCode}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2 text-slate-900">
            Session Complete
          </h2>
          <p className="text-slate-600 mb-4">Thanks for working together!</p>
          <button
            onClick={() => navigate('/collab')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
          >
            ← Back to Work Together
          </button>
        </div>
      </PageShell>
    );
  }

  if (roomState.status === 'lobby') {
    return (
      <PageShell roomCode={roomCode}>
        <CollabLobby
          roomState={roomState}
          currentUserId={userId}
          emit={emit}
          onLeave={handleLeave}
        />
      </PageShell>
    );
  }

  if (roomState.sessionType === 'essay') {
    return (
      <PageShell roomCode={roomCode}>
        <CollabEssaySession
          roomState={roomState}
          currentUserId={userId}
          emit={emit}
        />
      </PageShell>
    );
  }
  return (
    <PageShell roomCode={roomCode}>
      <CollabQuizSession
        roomState={roomState}
        currentUserId={userId}
        emit={emit}
        lastReveal={lastReveal}
        lastEvent={lastEvent}
      />
    </PageShell>
  );
}
