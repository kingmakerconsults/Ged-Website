// frontend/components/collab/CollabQuizSession.jsx
// Solid-light styling (no `dark:` variants) so contrast is reliable when
// rendered outside the legacy app's theme provider. Supports MC and
// fill-in/text-input questions, shows per-question reveal stats with each
// participant's answer, and renders a final review when the session ends.
import React, { useEffect, useMemo, useState } from 'react';

const PALETTE = {
  pageText: '#0f172a',
  pageMuted: '#475569',
  cardBg: '#ffffff',
  cardBorder: '#e2e8f0',
  passageBg: '#f8fafc',
  optionBg: '#ffffff',
  optionBorder: '#cbd5e1',
  myChoice: '#dbeafe',
  myChoiceBorder: '#3b82f6',
  correct: '#dcfce7',
  correctBorder: '#16a34a',
  wrong: '#fee2e2',
  wrongBorder: '#dc2626',
};

function getOptions(q) {
  if (!q) return [];
  // Project's primary schema: answerOptions = [{text, isCorrect, rationale}, ...]
  if (Array.isArray(q.answerOptions)) {
    return q.answerOptions.map((o) => {
      if (typeof o === 'string') return { value: o, label: o };
      const v = o.text ?? o.value ?? o.label ?? '';
      return {
        value: v,
        label: o.text ?? o.label ?? v,
        isCorrect: !!o.isCorrect,
      };
    });
  }
  if (Array.isArray(q.options)) {
    return q.options.map((o) =>
      typeof o === 'string'
        ? { value: o, label: o }
        : {
            value: o.value ?? o.text ?? o.label,
            label: o.label ?? o.text ?? o.value,
            isCorrect: !!o.isCorrect,
          }
    );
  }
  if (Array.isArray(q.choices)) {
    return q.choices.map((o) =>
      typeof o === 'string'
        ? { value: o, label: o }
        : {
            value: o.value ?? o.text ?? o.label,
            label: o.label ?? o.text ?? o.value,
            isCorrect: !!o.isCorrect,
          }
    );
  }
  if (q.A && q.B) {
    return [q.A, q.B, q.C, q.D]
      .filter(Boolean)
      .map((t) => ({ value: t, label: t }));
  }
  return [];
}

function getCorrectAnswer(q) {
  if (!q) return null;
  if (q.correctAnswer != null) return q.correctAnswer;
  if (q.answer != null) return q.answer;
  if (q.correct != null) return q.correct;
  if (Array.isArray(q.answerOptions)) {
    const c = q.answerOptions.find((o) => o && o.isCorrect);
    if (c) return c.text ?? c.value ?? c.label ?? null;
  }
  if (Array.isArray(q.options)) {
    const c = q.options.find((o) => o && typeof o === 'object' && o.isCorrect);
    if (c) return c.value ?? c.text ?? c.label ?? null;
  }
  return null;
}

function getRationale(q, correctValue) {
  if (!q) return null;
  if (q.explanation) return q.explanation;
  if (q.rationale) return q.rationale;
  if (Array.isArray(q.answerOptions) && correctValue != null) {
    const match = q.answerOptions.find(
      (o) => o && (o.text === correctValue || o.value === correctValue)
    );
    if (match && match.rationale) return match.rationale;
    const correctOpt = q.answerOptions.find((o) => o && o.isCorrect);
    if (correctOpt && correctOpt.rationale) return correctOpt.rationale;
  }
  return null;
}

function isCorrectAnswer(answer, correct) {
  if (answer == null || correct == null) return false;
  return (
    String(answer).trim().toLowerCase() === String(correct).trim().toLowerCase()
  );
}

// Render text that may contain inline LaTeX delimited by \( ... \) or $ ... $
// using the globally-loaded KaTeX (CDN, available across the legacy app).
function renderInlineLatex(latex) {
  try {
    if (typeof window === 'undefined' || !window.katex) return null;
    return window.katex.renderToString(latex, {
      throwOnError: false,
      strict: 'ignore',
    });
  } catch {
    return null;
  }
}

function MathText({ children }) {
  if (children == null) return null;
  const text = String(children);
  if (!text) return null;
  // Match \( ... \) or \[ ... \] or $...$ (single-$, non-greedy)
  const regex = /\\\(([\s\S]+?)\\\)|\\\[([\s\S]+?)\\\]|\$([^$\n]+?)\$/g;
  const parts = [];
  let lastIndex = 0;
  let m;
  let key = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > lastIndex) {
      parts.push(text.slice(lastIndex, m.index));
    }
    const latex = m[1] ?? m[2] ?? m[3] ?? '';
    const html = renderInlineLatex(latex);
    if (html) {
      parts.push(
        <span
          key={`m${key++}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } else {
      parts.push(m[0]);
    }
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

function QuestionBody({ q }) {
  if (!q) return null;
  return (
    <div>
      {q.passage && (
        <div
          className="mb-3 p-3 rounded text-sm"
          style={{
            backgroundColor: PALETTE.passageBg,
            color: PALETTE.pageText,
          }}
        >
          <MathText>{q.passage}</MathText>
        </div>
      )}
      <div
        className="text-base font-medium leading-relaxed"
        style={{ color: PALETTE.pageText }}
      >
        <MathText>{q.question || q.prompt || q.text}</MathText>
      </div>
    </div>
  );
}

function MyAnswerInput({ value, onSubmit, disabled }) {
  const [text, setText] = useState(value || '');
  const submit = (e) => {
    e.preventDefault();
    const v = text.trim();
    if (!v) return;
    onSubmit(v);
  };
  return (
    <form onSubmit={submit} className="space-y-2">
      <input
        type="text"
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your answer…"
        className="w-full px-3 py-2 rounded border focus:outline-none focus:ring-2"
        style={{
          color: PALETTE.pageText,
          backgroundColor: PALETTE.optionBg,
          borderColor: PALETTE.optionBorder,
        }}
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold disabled:opacity-50"
      >
        Submit Answer
      </button>
    </form>
  );
}

function ReviewScreen({ roomState, currentUserId }) {
  const questions = roomState.quiz?.questions || [];
  const participants = roomState.participants || [];
  const myCorrect = useMemo(() => {
    const me = participants.find((p) => p.userId === currentUserId);
    if (!me?.answers) return { correct: 0, total: questions.length };
    let c = 0;
    questions.forEach((q, i) => {
      const a = me.answers[String(i)];
      if (isCorrectAnswer(a, getCorrectAnswer(q))) c += 1;
    });
    return { correct: c, total: questions.length };
  }, [participants, questions, currentUserId]);

  return (
    <div className="max-w-4xl mx-auto" style={{ color: PALETTE.pageText }}>
      <div
        className="rounded-lg border p-6 shadow mb-4"
        style={{
          backgroundColor: PALETTE.cardBg,
          borderColor: PALETTE.cardBorder,
        }}
      >
        <h2 className="text-2xl font-bold mb-1">Session Review</h2>
        <div className="text-sm" style={{ color: PALETTE.pageMuted }}>
          You answered {myCorrect.correct} of {myCorrect.total} correctly.
        </div>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {participants.map((p) => {
            let c = 0;
            questions.forEach((q, i) => {
              const a = p.answers?.[String(i)];
              if (isCorrectAnswer(a, getCorrectAnswer(q))) c += 1;
            });
            return (
              <div
                key={p.userId}
                className="rounded p-2 text-sm"
                style={{
                  backgroundColor: PALETTE.passageBg,
                  border: `1px solid ${PALETTE.cardBorder}`,
                }}
              >
                <div className="font-semibold truncate">
                  {p.displayName}
                  {p.userId === currentUserId ? ' (you)' : ''}
                </div>
                <div className="text-xs" style={{ color: PALETTE.pageMuted }}>
                  {c} / {questions.length} correct
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => {
          const correct = getCorrectAnswer(q);
          const opts = getOptions(q);
          return (
            <div
              key={idx}
              className="rounded-lg border p-5 shadow-sm"
              style={{
                backgroundColor: PALETTE.cardBg,
                borderColor: PALETTE.cardBorder,
              }}
            >
              <div
                className="text-xs uppercase tracking-wider mb-1"
                style={{ color: PALETTE.pageMuted }}
              >
                Question {idx + 1}
              </div>
              <QuestionBody q={q} />

              {opts.length > 0 && (
                <div className="mt-3 space-y-1">
                  {opts.map((opt, oi) => {
                    const value = opt.value;
                    const label = opt.label ?? value;
                    const isCorrect = isCorrectAnswer(value, correct);
                    return (
                      <div
                        key={oi}
                        className="px-3 py-2 rounded border text-sm"
                        style={{
                          backgroundColor: isCorrect
                            ? PALETTE.correct
                            : PALETTE.optionBg,
                          borderColor: isCorrect
                            ? PALETTE.correctBorder
                            : PALETTE.optionBorder,
                          color: PALETTE.pageText,
                        }}
                      >
                        <span className="font-semibold mr-2">
                          {String.fromCharCode(65 + oi)}.
                        </span>
                        <MathText>{label}</MathText>
                        {isCorrect && (
                          <span
                            className="ml-2 text-xs font-semibold"
                            style={{ color: '#15803d' }}
                          >
                            ✓ Correct
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {opts.length === 0 && correct != null && (
                <div
                  className="mt-3 px-3 py-2 rounded border text-sm"
                  style={{
                    backgroundColor: PALETTE.correct,
                    borderColor: PALETTE.correctBorder,
                    color: PALETTE.pageText,
                  }}
                >
                  <span className="font-semibold">Correct answer:</span>{' '}
                  {String(correct)}
                </div>
              )}

              <div className="mt-3">
                <div
                  className="text-xs uppercase tracking-wider mb-1"
                  style={{ color: PALETTE.pageMuted }}
                >
                  Who answered what
                </div>
                <ul className="space-y-1">
                  {participants.map((p) => {
                    const a = p.answers?.[String(idx)];
                    const ok = isCorrectAnswer(a, correct);
                    return (
                      <li key={p.userId} className="text-sm">
                        <span className="font-medium">{p.displayName}:</span>{' '}
                        {a == null || a === '' ? (
                          <span style={{ color: PALETTE.pageMuted }}>
                            (no answer)
                          </span>
                        ) : (
                          <span
                            className="font-mono px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: ok
                                ? PALETTE.correct
                                : PALETTE.wrong,
                              color: PALETTE.pageText,
                              border: `1px solid ${ok ? PALETTE.correctBorder : PALETTE.wrongBorder}`,
                            }}
                          >
                            {String(a)} {ok ? '✓' : '✗'}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {(() => {
                const rat = getRationale(q, correct);
                return rat ? (
                  <div
                    className="mt-3 p-3 rounded text-sm"
                    style={{
                      backgroundColor: PALETTE.passageBg,
                      color: PALETTE.pageText,
                    }}
                  >
                    <span className="font-semibold">Rationale:</span>{' '}
                    <MathText>{rat}</MathText>
                  </div>
                ) : null;
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CollabQuizSession({
  roomState,
  currentUserId,
  emit,
  lastReveal,
}) {
  if (roomState.status === 'complete') {
    return <ReviewScreen roomState={roomState} currentUserId={currentUserId} />;
  }

  const isHost = currentUserId === roomState.hostId;
  const sessionType = roomState.sessionType;
  const paceMode = roomState.state?.paceMode || 'locked';
  const lockedToHost =
    sessionType === 'instructor_led' && paceMode === 'locked' && !isHost;

  const hostQuestionIndex = roomState.state?.currentQuestion || 0;
  const [studentIndex, setStudentIndex] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  useEffect(() => {
    if (lockedToHost) setStudentIndex(hostQuestionIndex);
  }, [lockedToHost, hostQuestionIndex]);

  const questions = roomState.quiz?.questions || [];
  const currentIndex = isHost
    ? hostQuestionIndex
    : sessionType === 'peer'
      ? hostQuestionIndex
      : studentIndex;
  const currentQ = questions[currentIndex];
  const options = getOptions(currentQ);
  const isMC = options.length > 0;
  const myAnswerKey = `${currentIndex}`;
  const myAnswer = submittedAnswers[myAnswerKey];
  const revealed = roomState.state?.revealedQuestions?.includes(currentIndex);

  const submitAnswer = (choice) => {
    setSubmittedAnswers((s) => ({ ...s, [myAnswerKey]: choice }));
    emit(
      'answer:submit',
      { questionIndex: currentIndex, answer: choice },
      () => {}
    );
  };

  const advance = (delta) => {
    const next = Math.max(
      0,
      Math.min(questions.length - 1, currentIndex + delta)
    );
    if (isHost || sessionType === 'peer') {
      emit('instructor:set_question', { index: next });
    } else {
      setStudentIndex(next);
    }
  };

  const toggleMode = () => {
    emit('instructor:toggle_mode', {
      mode: paceMode === 'locked' ? 'free' : 'locked',
    });
  };

  const revealAnswers = () => {
    emit('instructor:reveal_answers', { questionIndex: currentIndex });
  };

  const endSession = () => {
    if (window.confirm('End this session for everyone?')) {
      emit('instructor:end', {});
    }
  };

  const answeredCount = useMemo(() => {
    let n = 0;
    for (const p of roomState.participants || []) {
      if (p.answeredQuestions?.includes(currentIndex)) n += 1;
    }
    return n;
  }, [currentIndex, roomState.participants]);

  const distribution = useMemo(() => {
    if (!revealed || !lastReveal || lastReveal.questionIndex !== currentIndex)
      return null;
    const counts = new Map();
    (lastReveal.answers || []).forEach((a) => {
      const v = a.answer == null ? '(no answer)' : String(a.answer);
      counts.set(v, (counts.get(v) || 0) + 1);
    });
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [revealed, lastReveal, currentIndex]);

  const correctAnswerForReveal =
    (revealed && lastReveal && lastReveal.questionIndex === currentIndex
      ? lastReveal.correctAnswer
      : null) ?? getCorrectAnswer(currentQ);

  return (
    <div className="max-w-4xl mx-auto" style={{ color: PALETTE.pageText }}>
      <div
        className="rounded-lg border p-6 shadow"
        style={{
          backgroundColor: PALETTE.cardBg,
          borderColor: PALETTE.cardBorder,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div
              className="text-xs uppercase tracking-wider"
              style={{ color: PALETTE.pageMuted }}
            >
              {roomState.title}
            </div>
            <div className="text-sm mt-1">
              Question {currentIndex + 1} of {questions.length}
              {sessionType === 'instructor_led' && (
                <span
                  className="ml-2 px-2 py-0.5 text-xs rounded"
                  style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}
                >
                  {paceMode === 'locked' ? 'Locked Pace' : 'Free Pace'}
                </span>
              )}
            </div>
          </div>
          {isHost && (
            <div className="flex gap-2">
              <button
                onClick={toggleMode}
                className="px-3 py-1.5 text-sm rounded border hover:bg-slate-100"
                style={{
                  backgroundColor: '#ffffff',
                  borderColor: PALETTE.optionBorder,
                  color: PALETTE.pageText,
                }}
              >
                {paceMode === 'locked' ? 'Switch to Free' : 'Switch to Locked'}
              </button>
              <button
                onClick={endSession}
                className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded font-semibold"
              >
                End
              </button>
            </div>
          )}
        </div>

        {currentQ ? (
          <>
            <div className="mb-6">
              <QuestionBody q={currentQ} />
            </div>

            {isMC ? (
              <div className="space-y-2 mb-4">
                {options.map((opt, idx) => {
                  const value = opt.value;
                  const label = opt.label ?? value;
                  const isMine = myAnswer === value;
                  const isCorrect =
                    revealed && isCorrectAnswer(value, correctAnswerForReveal);
                  const isWrongMine = revealed && isMine && !isCorrect;

                  let bg = PALETTE.optionBg;
                  let border = PALETTE.optionBorder;
                  if (isCorrect) {
                    bg = PALETTE.correct;
                    border = PALETTE.correctBorder;
                  } else if (isWrongMine) {
                    bg = PALETTE.wrong;
                    border = PALETTE.wrongBorder;
                  } else if (isMine) {
                    bg = PALETTE.myChoice;
                    border = PALETTE.myChoiceBorder;
                  }

                  return (
                    <button
                      key={idx}
                      disabled={!!myAnswer || revealed}
                      onClick={() => submitAnswer(value)}
                      className="block w-full text-left px-4 py-3 rounded-md border transition"
                      style={{
                        backgroundColor: bg,
                        borderColor: border,
                        color: PALETTE.pageText,
                        cursor: myAnswer || revealed ? 'default' : 'pointer',
                      }}
                    >
                      <span className="font-semibold mr-2">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <MathText>{label}</MathText>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="mb-4">
                <MyAnswerInput
                  value={myAnswer}
                  onSubmit={submitAnswer}
                  disabled={!!myAnswer || revealed}
                />
                {myAnswer && (
                  <div
                    className="mt-2 text-sm"
                    style={{ color: PALETTE.pageMuted }}
                  >
                    Submitted: <span className="font-mono">{myAnswer}</span>
                  </div>
                )}
              </div>
            )}

            {!isHost && myAnswer && !revealed && sessionType === 'peer' && (
              <div
                className="text-sm italic"
                style={{ color: PALETTE.pageMuted }}
              >
                Waiting for partner to answer…
              </div>
            )}

            {revealed &&
              lastReveal &&
              lastReveal.questionIndex === currentIndex && (
                <div
                  className="mt-4 p-3 rounded text-sm"
                  style={{
                    backgroundColor: PALETTE.passageBg,
                    color: PALETTE.pageText,
                  }}
                >
                  <div className="font-semibold mb-2">
                    Answer breakdown ({lastReveal.answers?.length || 0}{' '}
                    responses)
                  </div>

                  {distribution && distribution.length > 0 && (
                    <div className="mb-3 space-y-1">
                      {distribution.map(([value, count]) => {
                        const ok = isCorrectAnswer(
                          value,
                          correctAnswerForReveal
                        );
                        const pct = Math.round(
                          (count / (lastReveal.answers?.length || 1)) * 100
                        );
                        return (
                          <div key={value} className="flex items-center gap-2">
                            <div
                              className="font-mono text-xs px-2 py-0.5 rounded"
                              style={{
                                backgroundColor: ok
                                  ? PALETTE.correct
                                  : '#f1f5f9',
                                border: `1px solid ${ok ? PALETTE.correctBorder : PALETTE.optionBorder}`,
                                minWidth: '60px',
                                textAlign: 'center',
                              }}
                            >
                              {value}
                            </div>
                            <div className="flex-1 h-2 rounded overflow-hidden bg-slate-200">
                              <div
                                className="h-full"
                                style={{
                                  width: `${pct}%`,
                                  backgroundColor: ok ? '#16a34a' : '#94a3b8',
                                }}
                              />
                            </div>
                            <div
                              className="text-xs"
                              style={{
                                color: PALETTE.pageMuted,
                                minWidth: '70px',
                              }}
                            >
                              {count} ({pct}%) {ok ? '✓' : ''}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div
                    className="font-semibold text-xs uppercase tracking-wider mb-1"
                    style={{ color: PALETTE.pageMuted }}
                  >
                    Who answered what
                  </div>
                  <ul className="space-y-0.5 mb-2">
                    {(lastReveal.answers || []).map((a) => {
                      const ok = isCorrectAnswer(
                        a.answer,
                        correctAnswerForReveal
                      );
                      return (
                        <li key={a.userId} className="text-sm">
                          <span className="font-medium">{a.displayName}:</span>{' '}
                          <span className="font-mono">
                            {a.answer == null ? '—' : String(a.answer)}
                          </span>{' '}
                          {a.answer != null && (
                            <span style={{ color: ok ? '#15803d' : '#b91c1c' }}>
                              {ok ? '✓' : '✗'}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  {correctAnswerForReveal != null && (
                    <div className="mt-2">
                      <span className="font-semibold">Correct:</span>{' '}
                      <span className="font-mono">
                        {String(correctAnswerForReveal)}
                      </span>
                    </div>
                  )}
                  {(() => {
                    const rat =
                      lastReveal.explanation ||
                      getRationale(currentQ, correctAnswerForReveal);
                    return rat ? (
                      <div className="mt-2">
                        <span className="font-semibold">Rationale:</span>{' '}
                        <MathText>{rat}</MathText>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}

            {isHost && sessionType === 'instructor_led' && (
              <div
                className="mt-4 text-xs"
                style={{ color: PALETTE.pageMuted }}
              >
                {answeredCount} / {roomState.participants?.length || 0} answered
              </div>
            )}

            <div
              className="flex items-center justify-between mt-6 pt-4 border-t"
              style={{ borderColor: PALETTE.cardBorder }}
            >
              <button
                onClick={() => advance(-1)}
                disabled={currentIndex === 0 || lockedToHost}
                className="px-4 py-2 rounded border disabled:opacity-50"
                style={{
                  backgroundColor: '#ffffff',
                  borderColor: PALETTE.optionBorder,
                  color: PALETTE.pageText,
                }}
              >
                Previous
              </button>
              {isHost && !revealed && (
                <button
                  onClick={revealAnswers}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded font-semibold"
                >
                  Reveal Answers
                </button>
              )}
              <button
                onClick={() => advance(1)}
                disabled={currentIndex >= questions.length - 1 || lockedToHost}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 font-semibold"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div style={{ color: PALETTE.pageMuted }}>No question loaded.</div>
        )}

        {isHost && sessionType === 'instructor_led' && paceMode === 'free' && (
          <div
            className="mt-6 pt-4 border-t"
            style={{ borderColor: PALETTE.cardBorder }}
          >
            <div className="text-sm font-semibold mb-2">Student Progress</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {(roomState.participants || [])
                .filter((p) => p.role !== 'host')
                .map((p) => (
                  <div
                    key={p.userId}
                    className="text-sm p-2 rounded border"
                    style={{
                      backgroundColor: PALETTE.passageBg,
                      borderColor: PALETTE.cardBorder,
                    }}
                  >
                    <div className="font-medium truncate">{p.displayName}</div>
                    <div
                      className="text-xs"
                      style={{ color: PALETTE.pageMuted }}
                    >
                      Answered: {p.answeredQuestions?.length || 0} /{' '}
                      {questions.length}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
