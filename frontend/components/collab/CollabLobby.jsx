// frontend/components/collab/CollabLobby.jsx
import React, { useState } from 'react';

export default function CollabLobby({
  roomState,
  currentUserId,
  emit,
  onLeave,
}) {
  const [copied, setCopied] = useState(false);
  if (!roomState) return null;
  const isHost = currentUserId === roomState.hostId;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(roomState.roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_) {}
  };

  const startSession = () => {
    emit('instructor:start', {}, () => {});
  };

  const joinLocked = !!roomState.state?.joinLocked;
  const toggleJoinLock = () => {
    emit('instructor:set_join_lock', { locked: !joinLocked }, () => {});
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-800 shadow">
        <div className="text-center mb-6">
          <div className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Room Code
          </div>
          <div
            onClick={copyCode}
            className="text-5xl font-mono font-bold text-blue-600 dark:text-blue-400 my-2 cursor-pointer"
            title="Click to copy"
          >
            {roomState.roomCode}
          </div>
          <div className="text-xs text-slate-500">
            {copied ? '✓ Copied!' : 'Tap to copy and share with others'}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">
            {roomState.title}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {roomState.sessionType}{' '}
            {roomState.subject ? `• ${roomState.subject}` : ''}
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Participants ({roomState.participants.length})
            </div>
            {isHost && (
              <button
                type="button"
                onClick={toggleJoinLock}
                className={`text-xs px-2 py-1 rounded border font-medium ${
                  joinLocked
                    ? 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                }`}
                title={
                  joinLocked
                    ? 'Click to allow new joiners'
                    : 'Click to prevent new joiners (already-joined students can still rejoin)'
                }
              >
                {joinLocked ? '🔒 Joining locked' : '🔓 Joining open'}
              </button>
            )}
            {!isHost && joinLocked && (
              <span className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-800">
                🔒 Locked
              </span>
            )}
          </div>
          <ul className="space-y-1.5">
            {roomState.participants.map((p) => (
              <li key={p.userId} className="flex items-center text-sm">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    p.connected ? 'bg-green-500' : 'bg-slate-400'
                  }`}
                />
                <span className="text-slate-800 dark:text-slate-200">
                  {p.displayName}
                </span>
                {p.role === 'host' && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded">
                    Host
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2">
          {isHost && (
            <button
              onClick={startSession}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
            >
              Start Session
            </button>
          )}
          {!isHost && (
            <div className="flex-1 text-center text-sm text-slate-500 dark:text-slate-400 py-2">
              Waiting for host to start…
            </div>
          )}
          <button
            onClick={onLeave}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-md"
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
}
