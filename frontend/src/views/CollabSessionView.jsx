// frontend/src/views/CollabSessionView.jsx
import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCollabSocket from '../../components/collab/useCollabSocket.js';
import CollabLobby from '../../components/collab/CollabLobby.jsx';
import CollabQuizSession from '../../components/collab/CollabQuizSession.jsx';
import CollabEssaySession from '../../components/collab/CollabEssaySession.jsx';
import PlatformHeader from '../../components/layout/PlatformHeader.jsx';
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
      <PlatformHeader />
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
        <span className="font-semibold" style={{ color: t.bannerText }}>
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
        <div className="max-w-3xl mx-auto">
          <div className="rounded-lg border border-slate-200 bg-white shadow p-6">
            <h2 className="text-2xl font-bold mb-1 text-slate-900">
              Essay Submitted
            </h2>
            <div className="text-sm text-slate-600 mb-4">
              Thanks for working together! Here is the final draft.
            </div>
            {roomState.state?.essayTopic && (
              <div className="mb-3 text-sm">
                <span className="font-semibold text-slate-800">Topic:</span>{' '}
                <span className="text-slate-700">
                  {roomState.state.essayTopic}
                </span>
              </div>
            )}
            <div className="rounded-md border border-slate-200 bg-slate-50 p-4 whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-slate-900">
              {roomState.state?.essayContent ||
                '(No essay content was written.)'}
            </div>
            {(() => {
              const t = roomState.state?.essayContent || '';
              const wc = t.trim() ? t.trim().split(/\s+/).length : 0;
              return (
                <div className="mt-2 text-xs text-slate-500">
                  {wc} words • {(roomState.state?.essayHistory || []).length}{' '}
                  turns passed
                </div>
              );
            })()}
            <EssayAIReviewPanel
              aiReview={roomState.state?.aiReview}
              jigsaw={
                roomState.state?.essayMode === 'jigsaw'
                  ? roomState.state?.essayJigsaw
                  : null
              }
              participants={roomState.participants}
            />
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/collab')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
            >
              ← Back to Work Together
            </button>
          </div>
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

// ---------- AI Review Panel (collab essay review screen) ----------

function TraitCard({ index, label, trait }) {
  if (!trait) return null;
  const score = Number(trait.score);
  const max = 2;
  return (
    <div className="rounded-md border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Trait {index}
        </div>
        <div className="text-sm font-bold text-indigo-700">
          {Number.isFinite(score) ? `${score} / ${max}` : '—'}
        </div>
      </div>
      <div className="text-sm font-semibold text-slate-800 mb-1">{label}</div>
      {trait.feedback && (
        <p className="text-sm text-slate-700 mb-2 whitespace-pre-wrap">
          {trait.feedback}
        </p>
      )}
      {Array.isArray(trait.strengths) && trait.strengths.length > 0 && (
        <div className="mb-1">
          <div className="text-[11px] uppercase tracking-wider text-emerald-700 font-semibold">
            Strengths
          </div>
          <ul className="list-disc pl-4 text-xs text-slate-700">
            {trait.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
      {Array.isArray(trait.nextSteps) && trait.nextSteps.length > 0 && (
        <div>
          <div className="text-[11px] uppercase tracking-wider text-amber-700 font-semibold">
            Next steps
          </div>
          <ul className="list-disc pl-4 text-xs text-slate-700">
            {trait.nextSteps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function EssayAIReviewPanel({ aiReview, jigsaw, participants }) {
  const status = aiReview?.status || (aiReview ? 'ready' : 'pending');

  return (
    <div className="mt-6 border-t border-slate-200 pt-5">
      <h3 className="text-lg font-bold text-slate-900 mb-2">🤖 AI Review</h3>
      {status === 'pending' && (
        <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <span className="inline-block animate-pulse">
            Generating AI review… this usually takes 5–15 seconds.
          </span>
        </div>
      )}
      {status === 'error' && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          AI review unavailable right now.
          {aiReview?.error ? (
            <div className="text-xs text-red-700 mt-1">({aiReview.error})</div>
          ) : null}
        </div>
      )}
      {status === 'ready' && aiReview && (
        <div className="space-y-3">
          <div className="rounded-md border border-indigo-200 bg-indigo-50 p-3 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-indigo-700 font-semibold">
                Overall Score
              </div>
              <div className="text-2xl font-bold text-indigo-900">
                {Number.isFinite(Number(aiReview.overallScore))
                  ? `${aiReview.overallScore} / 6`
                  : '—'}
              </div>
            </div>
            {aiReview.overallFeedback && (
              <div className="text-sm text-indigo-900 max-w-xl ml-4">
                {aiReview.overallFeedback}
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <TraitCard
              index={1}
              label="Analysis of arguments / use of evidence"
              trait={aiReview.trait1}
            />
            <TraitCard
              index={2}
              label="Development of ideas / organizational structure"
              trait={aiReview.trait2}
            />
            <TraitCard
              index={3}
              label="Clarity and command of standard English"
              trait={aiReview.trait3}
            />
          </div>
          <p className="text-[11px] text-slate-500">
            Generated by AI for the whole group. This review is not saved to
            individual writing stats.
          </p>
        </div>
      )}

      {/* Optional: jigsaw slot breakdown */}
      {jigsaw && Array.isArray(jigsaw.slots) && jigsaw.slots.length > 0 && (
        <div className="mt-5">
          <h4 className="text-sm font-bold text-slate-800 mb-2">
            Slot breakdown
          </h4>
          <ul className="space-y-2">
            {jigsaw.slots
              .slice()
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((s) => {
                const author = (participants || []).find(
                  (p) => p.userId === s.assigneeUserId
                );
                const wc =
                  s.content && s.content.trim()
                    ? s.content.trim().split(/\s+/).length
                    : 0;
                return (
                  <li
                    key={s.key}
                    className="rounded-md border border-slate-200 bg-white p-3"
                  >
                    <div className="text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-slate-700">
                        {s.label}
                      </span>{' '}
                      — {author?.displayName || 'unassigned'} • {wc} words
                    </div>
                    <div className="text-sm font-serif whitespace-pre-wrap text-slate-800">
                      {s.content || (
                        <span className="italic text-slate-400">(empty)</span>
                      )}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}
