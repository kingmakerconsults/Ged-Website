// frontend/components/collab/CollabEssaySession.jsx
// Solid-light styling (no dark: variants) so contrast is reliable when
// rendered outside the legacy app's theme provider.
import React, { useEffect, useRef, useState } from 'react';

export default function CollabEssaySession({ roomState, currentUserId, emit }) {
  const state = roomState.state || {};
  const isMyTurn = state.essayTurn === currentUserId;
  const [draft, setDraft] = useState(state.essayContent || '');
  const debounceRef = useRef(null);

  const topic = state.essayTopic || null;
  const prompt = state.essayPrompt || 'Write a collaborative essay.';

  useEffect(() => {
    if (!isMyTurn) {
      setDraft(state.essayContent || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.essayContent, isMyTurn]);

  const handleChange = (e) => {
    const value = e.target.value;
    setDraft(value);
    if (!isMyTurn) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      emit('essay:update', { content: value });
    }, 400);
  };

  const passTurn = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      emit('essay:update', { content: draft });
    }
    emit('essay:pass_turn', {}, () => {});
  };

  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;

  const turnHolder = (roomState.participants || []).find(
    (p) => p.userId === state.essayTurn
  );

  // Build a deep-link to the Essay Practice Tool with topic preselected.
  // Legacy app reads ?essayTopic=<title> on mount and opens the tool.
  const essayToolHref = topic
    ? `/?essayTopic=${encodeURIComponent(topic)}`
    : '/';

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-lg border border-slate-200 p-6 bg-white text-slate-900 shadow">
        <div className="mb-4">
          <div className="text-xs uppercase tracking-wider text-slate-500">
            Collaborative Essay
          </div>
          {topic && (
            <div className="text-lg font-bold text-slate-900 mt-1">
              Topic: {topic}
            </div>
          )}
          <div className="text-sm text-slate-700 mt-2">{prompt}</div>
          <a
            href={essayToolHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded no-underline"
            style={{ textDecoration: 'none' }}
          >
            📖 Open Essay Practice Tool (with passages) ↗
          </a>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <div
            className={`text-sm font-semibold ${
              isMyTurn ? 'text-green-700' : 'text-slate-600'
            }`}
          >
            {isMyTurn
              ? '✏️ Your turn to write'
              : `${turnHolder?.displayName || 'Partner'} is writing…`}
          </div>
          <div className="text-xs text-slate-500">{wordCount} words</div>
        </div>

        <textarea
          value={draft}
          onChange={handleChange}
          disabled={!isMyTurn}
          rows={14}
          placeholder={isMyTurn ? 'Begin writing…' : 'Waiting for your turn…'}
          className={`w-full p-3 rounded-md border font-serif text-base leading-relaxed text-slate-900 ${
            isMyTurn
              ? 'border-green-400 bg-white'
              : 'border-slate-200 bg-slate-50 text-slate-700'
          }`}
        />

        <div className="flex items-center justify-end gap-2 mt-4">
          {isMyTurn && (
            <button
              onClick={passTurn}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold"
            >
              Pass Turn
            </button>
          )}
        </div>

        {state.essayHistory?.length > 0 && (
          <div className="mt-4 text-xs text-slate-500">
            Turns passed: {state.essayHistory.length}
          </div>
        )}
      </div>
    </div>
  );
}
