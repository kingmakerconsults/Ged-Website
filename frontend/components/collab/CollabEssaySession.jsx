// frontend/components/collab/CollabEssaySession.jsx
// Solid-light styling (no dark: variants) so contrast is reliable when
// rendered outside the legacy app's theme provider.
import React, { useEffect, useRef, useState } from 'react';
import { getEssayPassagesForTopic } from '../../src/data/essayPassages.js';

// ---------- Countdown helpers ----------

function useCountdown(deadlineIso) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!deadlineIso) return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [deadlineIso]);
  if (!deadlineIso) return null;
  const remainingMs = new Date(deadlineIso).getTime() - now;
  return Math.max(0, Math.round(remainingMs / 1000));
}

function fmtRemaining(secs) {
  if (secs == null) return null;
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function CountdownPill({ label, deadline, danger = 10, warn = 30 }) {
  const remaining = useCountdown(deadline);
  if (remaining == null) return null;
  let cls = 'bg-slate-100 text-slate-700 border-slate-300';
  if (remaining <= danger) cls = 'bg-red-100 text-red-800 border-red-300';
  else if (remaining <= warn)
    cls = 'bg-amber-100 text-amber-800 border-amber-300';
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-mono font-semibold px-2 py-0.5 rounded border ${cls}`}
      title={`${label} timer`}
    >
      <span aria-hidden>⏱</span>
      <span className="font-sans font-semibold">{label}:</span>{' '}
      <span>{fmtRemaining(remaining)}</span>
    </span>
  );
}

export default function CollabEssaySession({ roomState, currentUserId, emit }) {
  const state = roomState.state || {};
  const mode = state.essayMode || 'free';
  const isMyTurn = state.essayTurn === currentUserId;
  // Free mode shares one buffer; round_robin uses currentParagraphDraft.
  const initialDraft =
    mode === 'round_robin'
      ? state.currentParagraphDraft || ''
      : state.essayContent || '';
  const [draft, setDraft] = useState(initialDraft);
  const [showPassages, setShowPassages] = useState(true);
  const [showFormat, setShowFormat] = useState(false);
  const debounceRef = useRef(null);

  // Close the Essay Format pop-out on Escape.
  useEffect(() => {
    if (!showFormat) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setShowFormat(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showFormat]);

  const topic = state.essayTopic || null;
  const prompt = state.essayPrompt || 'Write a collaborative essay.';

  // Sync local draft from server-pushed state when not actively editing.
  useEffect(() => {
    if (mode === 'jigsaw') return; // jigsaw uses its own per-slot drafts
    if (isMyTurn) return;
    setDraft(
      mode === 'round_robin'
        ? state.currentParagraphDraft || ''
        : state.essayContent || ''
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.essayContent, state.currentParagraphDraft, isMyTurn, mode]);

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

  const submitEssay = () => {
    let text;
    if (mode === 'jigsaw') {
      text = state.essayContent || '';
    } else if (mode === 'round_robin') {
      const committed = (state.essayParagraphs || [])
        .map((p) => p.content)
        .join('\n\n');
      text = [committed, isMyTurn ? draft : state.currentParagraphDraft || '']
        .filter(Boolean)
        .join('\n\n');
    } else {
      text = isMyTurn ? draft : state.essayContent || '';
    }
    const wc = text.trim() ? text.trim().split(/\s+/).length : 0;
    let warning = '';
    if (wc < 80) {
      warning = 'This essay is quite short (under 80 words). ';
    }
    const ok = window.confirm(
      `${warning}Submit the essay now? Once submitted, the session will end and an AI review will be generated for everyone.`
    );
    if (!ok) return;
    if (mode !== 'jigsaw' && isMyTurn && debounceRef.current) {
      clearTimeout(debounceRef.current);
      emit('essay:update', { content: draft });
    }
    emit('essay:submit', {}, () => {});
  };

  const wordCountFromText = (t) =>
    t && t.trim() ? t.trim().split(/\s+/).length : 0;
  const wordCount =
    mode === 'jigsaw'
      ? wordCountFromText(state.essayContent || '')
      : wordCountFromText(draft);

  const turnHolder = (roomState.participants || []).find(
    (p) => p.userId === state.essayTurn
  );

  // Inline reading passages for the current essay topic.
  const passages = getEssayPassagesForTopic(topic);
  const timer = state.essayTimer || {};

  return (
    <div className="max-w-7xl mx-auto px-2">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* LEFT: raw passages inline (no iframe). */}
        {showPassages && (
          <div className="flex-1 min-w-0 rounded-lg border border-slate-200 bg-white shadow overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                📖 Reading Passages
              </div>
              <div className="flex items-center gap-2">
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
            <div className="px-5 py-4 text-slate-900">
              {passages ? (
                <>
                  {topic && (
                    <div className="mb-4 pb-3 border-b border-slate-200">
                      <div className="text-[11px] uppercase tracking-wider text-slate-500">
                        Topic
                      </div>
                      <div className="text-base font-bold text-slate-900">
                        {topic}
                      </div>
                    </div>
                  )}
                  <article className="mb-6">
                    <h3 className="text-sm font-bold text-indigo-800 mb-1">
                      Passage A
                    </h3>
                    <div className="text-xs italic text-slate-600 mb-2">
                      {passages.passage1.title}
                    </div>
                    <div
                      className="collab-essay-passage text-[15px] leading-relaxed text-slate-800 space-y-3"
                      dangerouslySetInnerHTML={{
                        __html: passages.passage1.content,
                      }}
                    />
                  </article>
                  <article>
                    <h3 className="text-sm font-bold text-indigo-800 mb-1">
                      Passage B
                    </h3>
                    <div className="text-xs italic text-slate-600 mb-2">
                      {passages.passage2.title}
                    </div>
                    <div
                      className="collab-essay-passage text-[15px] leading-relaxed text-slate-800 space-y-3"
                      dangerouslySetInnerHTML={{
                        __html: passages.passage2.content,
                      }}
                    />
                  </article>
                  <style>{`
                    .collab-essay-passage p { margin: 0 0 0.85rem 0; }
                    .collab-essay-passage p:last-child { margin-bottom: 0; }
                    .collab-essay-passage .good-evidence {
                      background-color: #dcfce7;
                      border-bottom: 2px solid #16a34a;
                      padding: 0 2px;
                    }
                    .collab-essay-passage .bad-evidence {
                      background-color: #fee2e2;
                      border-bottom: 2px solid #dc2626;
                      padding: 0 2px;
                    }
                  `}</style>
                </>
              ) : (
                <div className="text-sm text-slate-600">
                  {topic
                    ? `No stored passages found for "${topic}". Use the prompt on the right to begin writing.`
                    : 'No topic selected yet.'}
                </div>
              )}
            </div>
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
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowFormat(true)}
                    className="text-xs text-indigo-700 hover:text-indigo-900 underline"
                    title="Open the GED essay format guide in a pop-out"
                  >
                    📐 Essay Format
                  </button>
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
              </div>
              {topic && (
                <div className="text-base font-bold text-slate-900 mt-1">
                  Topic: {topic}
                </div>
              )}
              <div className="text-sm text-slate-700 mt-2">{prompt}</div>
              {(timer.turnDeadline || timer.sessionDeadline) && (
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  {mode !== 'jigsaw' && timer.turnDeadline && (
                    <CountdownPill
                      label="Turn"
                      deadline={timer.turnDeadline}
                    />
                  )}
                  {timer.sessionDeadline && (
                    <CountdownPill
                      label="Session"
                      deadline={timer.sessionDeadline}
                      danger={30}
                      warn={120}
                    />
                  )}
                </div>
              )}
            </div>

            {mode === 'jigsaw' ? (
              <JigsawEditor
                state={state}
                roomState={roomState}
                currentUserId={currentUserId}
                emit={emit}
              />
            ) : mode === 'round_robin' ? (
              <RoundRobinEditor
                state={state}
                draft={draft}
                isMyTurn={isMyTurn}
                turnHolder={turnHolder}
                wordCount={wordCount}
                onChange={handleChange}
              />
            ) : (
              <FreeEditor
                draft={draft}
                isMyTurn={isMyTurn}
                turnHolder={turnHolder}
                wordCount={wordCount}
                onChange={handleChange}
              />
            )}

            <div className="flex items-center justify-end gap-2 mt-4 flex-wrap">
              {mode !== 'jigsaw' && isMyTurn && (
                <button
                  onClick={passTurn}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold"
                >
                  {mode === 'round_robin'
                    ? 'Finish paragraph & pass'
                    : 'Pass Turn'}
                </button>
              )}
              <button
                onClick={submitEssay}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold"
                title="Finalize the essay, end the session for everyone, and request an AI review"
              >
                Submit Essay
              </button>
            </div>

            {state.essayHistory?.length > 0 && (
              <div className="mt-4 text-xs text-slate-500">
                Turns passed: {state.essayHistory.length}
              </div>
            )}
          </div>
        </div>
      </div>

      {showFormat && <EssayFormatModal onClose={() => setShowFormat(false)} />}
    </div>
  );
}

// ---------- Mode sub-renderers ----------

function FreeEditor({ draft, isMyTurn, turnHolder, wordCount, onChange }) {
  return (
    <>
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
        onChange={onChange}
        disabled={!isMyTurn}
        rows={20}
        placeholder={isMyTurn ? 'Begin writing…' : 'Waiting for your turn…'}
        className={`w-full p-3 rounded-md border font-serif text-base leading-relaxed text-slate-900 ${
          isMyTurn
            ? 'border-green-400 bg-white'
            : 'border-slate-200 bg-slate-50 text-slate-700'
        }`}
      />
    </>
  );
}

function RoundRobinEditor({
  state,
  draft,
  isMyTurn,
  turnHolder,
  wordCount,
  onChange,
}) {
  const committed = Array.isArray(state.essayParagraphs)
    ? state.essayParagraphs
    : [];
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div
          className={`text-sm font-semibold ${
            isMyTurn ? 'text-green-700' : 'text-slate-600'
          }`}
        >
          {isMyTurn
            ? `✏️ Your turn — write paragraph #${committed.length + 1}`
            : `${turnHolder?.displayName || 'Partner'} is writing paragraph #${
                committed.length + 1
              }…`}
        </div>
        <div className="text-xs text-slate-500">{wordCount} words (draft)</div>
      </div>
      {committed.length > 0 && (
        <div className="mb-3 space-y-2">
          {committed.map((p, i) => (
            <div
              key={i}
              className="rounded-md border border-slate-200 bg-slate-50 p-3 text-[15px] font-serif leading-relaxed text-slate-800"
            >
              <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                Paragraph {i + 1}
              </div>
              <div className="whitespace-pre-wrap">{p.content}</div>
            </div>
          ))}
        </div>
      )}
      <textarea
        value={draft}
        onChange={onChange}
        disabled={!isMyTurn}
        rows={10}
        placeholder={
          isMyTurn
            ? `Write paragraph #${committed.length + 1}…`
            : 'Waiting for your turn…'
        }
        className={`w-full p-3 rounded-md border font-serif text-base leading-relaxed text-slate-900 ${
          isMyTurn
            ? 'border-green-400 bg-white'
            : 'border-slate-200 bg-slate-50 text-slate-700'
        }`}
      />
      <p className="mt-1 text-[11px] text-slate-500">
        Paragraphs become read-only once you pass the turn.
      </p>
    </>
  );
}

function JigsawEditor({ state, roomState, currentUserId, emit }) {
  const jig = state.essayJigsaw;
  const slots = jig && Array.isArray(jig.slots) ? jig.slots : [];
  const mySlot = slots.find((s) => s.assigneeUserId === currentUserId) || null;
  const [slotDraft, setSlotDraft] = useState(mySlot?.content || '');
  const debounceRef = useRef(null);

  // Keep local slot draft in sync with server when not actively editing.
  useEffect(() => {
    setSlotDraft(mySlot?.content || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySlot?.content]);

  const onSlotChange = (e) => {
    const value = e.target.value;
    setSlotDraft(value);
    if (!mySlot) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      emit('essay:update', { content: value, slotKey: mySlot.key });
    }, 400);
  };

  const wcOf = (t) => (t && t.trim() ? t.trim().split(/\s+/).length : 0);

  return (
    <div className="space-y-3">
      <div className="rounded-md border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-900">
        <div className="font-semibold mb-1">🧩 Jigsaw Mode</div>
        <div>
          Each participant writes their assigned section. The essay will be
          stitched together in order on submit.
        </div>
      </div>

      {/* Slot overview */}
      <div className="rounded-md border border-slate-200 bg-white">
        <div className="px-3 py-2 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
          Slots
        </div>
        <ul className="divide-y divide-slate-200">
          {slots
            .slice()
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((s) => {
              const assignee = (roomState.participants || []).find(
                (p) => p.userId === s.assigneeUserId
              );
              const mine = s.assigneeUserId === currentUserId;
              return (
                <li
                  key={s.key}
                  className={`px-3 py-2 text-sm flex items-center justify-between ${
                    mine ? 'bg-green-50' : ''
                  }`}
                >
                  <div>
                    <span className="font-semibold text-slate-800">
                      {s.label}
                    </span>{' '}
                    <span className="text-xs text-slate-500">
                      —{' '}
                      {assignee?.displayName || (
                        <span className="italic">unassigned</span>
                      )}
                      {mine ? ' (you)' : ''}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {wcOf(s.content)} words
                  </span>
                </li>
              );
            })}
        </ul>
      </div>

      {mySlot ? (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-semibold text-green-700">
              ✏️ You're writing: {mySlot.label}
            </div>
            <div className="text-xs text-slate-500">
              {wcOf(slotDraft)} words
            </div>
          </div>
          <textarea
            value={slotDraft}
            onChange={onSlotChange}
            rows={12}
            placeholder={`Write the ${mySlot.label.toLowerCase()}…`}
            className="w-full p-3 rounded-md border border-green-400 bg-white font-serif text-base leading-relaxed text-slate-900"
          />
        </div>
      ) : (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          You haven't been assigned a slot. You can still see everyone's
          progress above and submit when the group is ready.
        </div>
      )}
    </div>
  );
}

const FORMAT_SECTIONS = [
  {
    title: 'Introduction Paragraph',
    accent: 'blue',
    guidance:
      'State which author presents the stronger argument. Introduce both passages and preview your main points.',
    template:
      "The two passages present conflicting views on the topic of [topic of both articles]. In the first passage, [Author 1's Last Name] argues that [explain Author 1's main claim]. Conversely, in the second passage, [Author 2's Last Name] claims that [explain Author 2's main claim]. After analyzing both arguments, it is clear that [Author's Last Name] presents the more convincing case by effectively using [list key evidence types].",
  },
  {
    title: 'Body Paragraph #1 — Strong Evidence',
    accent: 'green',
    guidance:
      "Present the first piece of strong evidence from the more convincing author. Quote or paraphrase, then explain why it's persuasive.",
    template:
      'First, [Stronger Author\'s Last Name] effectively builds their argument by using [type of evidence]. The author states, ["quote or paraphrase"]. This evidence is highly convincing because [explain why].',
  },
  {
    title: 'Body Paragraph #2 — More Strong Evidence',
    accent: 'green',
    guidance:
      'Present a second piece of strong evidence from the more convincing author. Show how it further supports their argument.',
    template:
      'Furthermore, [Stronger Author\'s Last Name] strengthens their position with [another type of evidence]. For example, the author points out that ["quote or paraphrase"]. This is a logical and persuasive point because [explain why].',
  },
  {
    title: 'Body Paragraph #3 — The Weaker Argument',
    accent: 'amber',
    guidance:
      "Identify a weakness in the opposing author's argument. Explain why their evidence is less convincing or flawed.",
    template:
      'In contrast, the argument presented by [Weaker Author\'s Last Name] is not as well-supported. A key weakness is the author\'s reliance on [identify a weakness]. For instance, the author claims that ["quote or paraphrase"]. This argument is unconvincing because [explain why].',
  },
  {
    title: 'Conclusion Paragraph',
    accent: 'purple',
    guidance:
      "Restate your position and summarize why the stronger author's evidence is more persuasive. Close with a final thought.",
    template:
      "In conclusion, while both authors address the topic, [Stronger Author's Last Name] presents a more compelling argument. By skillfully using [restate evidence types], the author builds a case that is more persuasive than the weakly supported claims by [Weaker Author's Last Name].",
  },
];

const ACCENT_CLASSES = {
  blue: {
    chip: 'bg-blue-50 border-blue-200 text-blue-900',
    bar: 'border-blue-500',
    label: 'text-blue-700',
  },
  green: {
    chip: 'bg-green-50 border-green-200 text-green-900',
    bar: 'border-green-500',
    label: 'text-green-700',
  },
  amber: {
    chip: 'bg-amber-50 border-amber-200 text-amber-900',
    bar: 'border-amber-500',
    label: 'text-amber-700',
  },
  purple: {
    chip: 'bg-purple-50 border-purple-200 text-purple-900',
    bar: 'border-purple-500',
    label: 'text-purple-700',
  },
};

function EssayFormatModal({ onClose }) {
  // Floating, draggable, resizable window. We avoid a backdrop so the user
  // can keep writing while this is open. Position is anchored top-right on
  // first open, then becomes free-floating once dragged.
  const INITIAL_W = 480;
  const INITIAL_H = 560;
  const MIN_W = 320;
  const MIN_H = 240;
  const [size, setSize] = useState({ w: INITIAL_W, h: INITIAL_H });
  const [pos, setPos] = useState(() => {
    if (typeof window === 'undefined') return { x: 40, y: 80 };
    return {
      x: Math.max(16, window.innerWidth - INITIAL_W - 32),
      y: 80,
    };
  });
  const [minimized, setMinimized] = useState(false);
  const dragRef = useRef(null);
  const resizeRef = useRef(null);

  const onDragStart = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { ...pos };
    dragRef.current = { startX, startY, startPos };
    const onMove = (ev) => {
      const dx = ev.clientX - dragRef.current.startX;
      const dy = ev.clientY - dragRef.current.startY;
      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 40;
      setPos({
        x: Math.max(
          -((size.w || INITIAL_W) - 120),
          Math.min(maxX, startPos.x + dx)
        ),
        y: Math.max(0, Math.min(maxY, startPos.y + dy)),
      });
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const onResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startSize = { ...size };
    resizeRef.current = { startX, startY, startSize };
    const onMove = (ev) => {
      const dx = ev.clientX - resizeRef.current.startX;
      const dy = ev.clientY - resizeRef.current.startY;
      setSize({
        w: Math.max(MIN_W, Math.min(window.innerWidth - 40, startSize.w + dx)),
        h: Math.max(MIN_H, Math.min(window.innerHeight - 40, startSize.h + dy)),
      });
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const style = {
    position: 'fixed',
    left: pos.x,
    top: pos.y,
    width: size.w,
    height: minimized ? 'auto' : size.h,
    zIndex: 1000,
  };

  return (
    <div
      style={style}
      className="rounded-lg bg-white shadow-2xl border border-slate-300 flex flex-col overflow-hidden relative"
      role="dialog"
      aria-label="Essay Format Guide"
    >
      <div
        onMouseDown={onDragStart}
        className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-slate-100 cursor-move select-none"
        title="Drag to move"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-slate-400">⋮⋮</span>
          <h2 className="text-sm font-bold text-slate-900 truncate">
            📐 GED Essay Format
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMinimized((m) => !m)}
            className="text-slate-500 hover:text-slate-900 px-2 py-0.5 text-sm rounded hover:bg-slate-200"
            aria-label={minimized ? 'Expand' : 'Minimize'}
            title={minimized ? 'Expand' : 'Minimize'}
          >
            {minimized ? '▢' : '–'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-red-600 px-2 py-0.5 text-base leading-none rounded hover:bg-slate-200"
            aria-label="Close essay format"
            title="Close"
          >
            ×
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          <div className="overflow-y-auto px-4 py-3 space-y-4 flex-1">
            <p className="text-xs text-slate-600">
              Drag the title bar to move. Drag the bottom-right corner to
              resize. Click <span aria-hidden>–</span> to minimize.
            </p>
            {FORMAT_SECTIONS.map((s) => {
              const a = ACCENT_CLASSES[s.accent] || ACCENT_CLASSES.blue;
              return (
                <section key={s.title}>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    {s.title}
                  </h3>
                  <div className={`mb-2 p-2 rounded border text-xs ${a.chip}`}>
                    <strong>Essay Format:</strong> {s.guidance}
                  </div>
                  <div
                    className={`p-2 bg-gray-50 border-l-4 rounded text-xs text-gray-700 font-mono leading-relaxed ${a.bar}`}
                  >
                    <div className={`font-bold mb-1 ${a.label}`}>
                      Template Structure:
                    </div>
                    {s.template}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Resize handle */}
          <div
            onMouseDown={onResizeStart}
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
            style={{
              background:
                'linear-gradient(135deg, transparent 0 50%, #94a3b8 50% 60%, transparent 60% 70%, #94a3b8 70% 80%, transparent 80%)',
            }}
            title="Drag to resize"
            aria-label="Resize"
          />
        </>
      )}
    </div>
  );
}
