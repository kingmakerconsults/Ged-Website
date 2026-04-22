// frontend/components/collab/CollabEssaySession.jsx
// Solid-light styling (no dark: variants) so contrast is reliable when
// rendered outside the legacy app's theme provider.
import React, { useEffect, useRef, useState } from 'react';

export default function CollabEssaySession({ roomState, currentUserId, emit }) {
  const state = roomState.state || {};
  const isMyTurn = state.essayTurn === currentUserId;
  const [draft, setDraft] = useState(state.essayContent || '');
  const [showPassages, setShowPassages] = useState(true);
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

  // Embed the existing Essay Practice Tool with the topic preselected.
  // The legacy app reads ?essayTopic=<title> on mount and opens the tool,
  // so the iframe shows the actual passages, prompt, and reading helpers.
  const essayToolHref = topic
    ? `/?essayTopic=${encodeURIComponent(topic)}`
    : '/';

  return (
    <div className="max-w-7xl mx-auto px-2">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* LEFT: passages from the existing Essay Practice Tool, embedded */}
        {showPassages && (
          <div className="flex-1 min-w-0 rounded-lg border border-slate-200 bg-white shadow overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                📖 Reading Passages
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={essayToolHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-700 hover:text-indigo-900 underline"
                >
                  Open in new tab ↗
                </a>
                <button
                  type="button"
                  onClick={() => setShowPassages(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                  aria-label="Hide passages"
                >
                  ◀ Hide
                </button>
              </div>
            </div>
            <iframe
              src={essayToolHref}
              title="Essay Practice Tool — Passages"
              className="w-full"
              style={{ height: '720px', border: '0' }}
            />
          </div>
        )}

        {/* RIGHT: collaborative editor */}
        <div className={showPassages ? 'lg:w-[440px] flex-shrink-0' : 'flex-1'}>
          <div className="rounded-lg border border-slate-200 p-5 bg-white text-slate-900 shadow">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-wider text-slate-500">
                  Collaborative Essay
                </div>
                {!showPassages && (
                  <button
                    type="button"
                    onClick={() => setShowPassages(true)}
                    className="text-xs text-indigo-700 hover:text-indigo-900 underline"
                  >
                    Show passages ▶
                  </button>
                )}
              </div>
              {topic && (
                <div className="text-base font-bold text-slate-900 mt-1">
                  Topic: {topic}
                </div>
              )}
              <div className="text-sm text-slate-700 mt-2">{prompt}</div>
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
              rows={20}
              placeholder={
                isMyTurn ? 'Begin writing…' : 'Waiting for your turn…'
              }
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
      </div>
    </div>
  );
}
