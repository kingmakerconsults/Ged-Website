// frontend/components/collab/CollabEssaySession.jsx
import React, { useEffect, useRef, useState } from 'react';

export default function CollabEssaySession({ roomState, currentUserId, emit }) {
  const state = roomState.state || {};
  const isMyTurn = state.essayTurn === currentUserId;
  const [draft, setDraft] = useState(state.essayContent || '');
  const debounceRef = useRef(null);

  // Sync incoming content when not editing
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

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-800 shadow">
        <div className="mb-4">
          <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Collaborative Essay
          </div>
          <div className="text-base font-medium text-slate-900 dark:text-slate-100 mt-1">
            {state.essayPrompt || 'Write a collaborative essay.'}
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <div
            className={`text-sm font-semibold ${
              isMyTurn
                ? 'text-green-700 dark:text-green-300'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {isMyTurn
              ? '✏️ Your turn to write'
              : `${turnHolder?.displayName || 'Partner'} is writing…`}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {wordCount} words
          </div>
        </div>

        <textarea
          value={draft}
          onChange={handleChange}
          disabled={!isMyTurn}
          rows={14}
          placeholder={isMyTurn ? 'Begin writing…' : 'Waiting for your turn…'}
          className={`w-full p-3 rounded-md border font-serif text-base leading-relaxed ${
            isMyTurn
              ? 'border-green-400 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100'
              : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
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
          <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Turns passed: {state.essayHistory.length}
          </div>
        )}
      </div>
    </div>
  );
}
