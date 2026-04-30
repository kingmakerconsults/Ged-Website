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
    const isEssaySession = roomState.sessionType === 'essay';
    const event = isEssaySession ? 'essay:start' : 'instructor:start';

    // The newer backend ack-handles `essay:start`; older deploys still only
    // know about `instructor:start`. If the new event never acks (no
    // listener registered), fall back so the host isn't stuck in the lobby.
    let acked = false;
    const timer = setTimeout(() => {
      if (acked) return;
      if (isEssaySession) {
        console.warn(
          '[collab] essay:start did not ack — falling back to instructor:start'
        );
        emit('instructor:start', {}, (resp) => {
          if (resp && resp.error) {
            console.error('[collab] instructor:start fallback failed:', resp.error);
            alert(`Could not start session: ${resp.error}`);
          }
        });
      } else {
        console.warn(`[collab] ${event} did not ack within 3s`);
      }
    }, 3000);

    emit(event, {}, (resp) => {
      acked = true;
      clearTimeout(timer);
      if (resp && resp.error) {
        console.error(`[collab] ${event} failed:`, resp.error);
        alert(`Could not start session: ${resp.error}`);
      }
    });
  };

  const joinLocked = !!roomState.state?.joinLocked;
  const toggleJoinLock = () => {
    emit('instructor:set_join_lock', { locked: !joinLocked }, () => {});
  };

  // Essay session preview (mode + timer summary; jigsaw slot preview).
  const isEssay = roomState.sessionType === 'essay';
  const essayMode = roomState.state?.essayMode || 'free';
  const essayTimer = roomState.state?.essayTimer || {};
  const essayJigsawFormat = roomState.state?.essayJigsawFormat || '5-paragraph';
  const formatLabels = {
    intro: 'Introduction',
    body1: 'Body Paragraph 1',
    body2: 'Body Paragraph 2',
    body3: 'Body Paragraph 3',
    conclusion: 'Conclusion',
  };
  const previewSlots =
    isEssay && essayMode === 'jigsaw'
      ? ['intro', 'body1', 'body2', 'body3', 'conclusion'].map((key, i) => ({
          key,
          label: formatLabels[key],
          assignee:
            roomState.participants && roomState.participants[i]
              ? roomState.participants[i].displayName
              : null,
        }))
      : null;
  const fmtSecs = (s) => {
    if (!Number.isFinite(s) || s <= 0) return null;
    if (s < 60) return `${s}s`;
    const m = Math.round(s / 60);
    return `${m} min`;
  };
  const modeLabel =
    essayMode === 'jigsaw'
      ? `🧩 Jigsaw (${essayJigsawFormat})`
      : essayMode === 'round_robin'
        ? '🔁 Round Robin by Paragraph'
        : '✍️ Free / Pass-Turn';

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

        {isEssay && (
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mb-4 space-y-2">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Essay Setup
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold">Mode:</span> {modeLabel}
            </div>
            {(fmtSecs(essayTimer.perTurnSeconds) ||
              fmtSecs(essayTimer.totalSeconds)) && (
              <div className="text-xs text-slate-600 dark:text-slate-300">
                <span className="font-semibold">Timer:</span>{' '}
                {fmtSecs(essayTimer.perTurnSeconds)
                  ? `${fmtSecs(essayTimer.perTurnSeconds)} per turn`
                  : 'no per-turn'}{' '}
                •{' '}
                {fmtSecs(essayTimer.totalSeconds)
                  ? `${fmtSecs(essayTimer.totalSeconds)} total`
                  : 'no total cap'}
              </div>
            )}
            {previewSlots && (
              <div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mb-1">
                  <span className="font-semibold">Slot preview</span> (assigned
                  by join order at Start):
                </div>
                <ul className="text-xs space-y-0.5 pl-4 list-disc text-slate-700 dark:text-slate-200">
                  {previewSlots.map((s) => (
                    <li key={s.key}>
                      <span className="font-semibold">{s.label}:</span>{' '}
                      {s.assignee || (
                        <span className="text-slate-400 italic">
                          (no participant yet)
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          {isHost && (
            <button
              onClick={startSession}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
            >
              {isEssay ? 'Start Essay' : 'Start Session'}
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
