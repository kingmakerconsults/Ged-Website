// frontend/components/collab/CollabQuizSession.jsx
import React, { useEffect, useMemo, useState } from 'react';

function renderQuestion(q) {
  if (!q) return null;
  return (
    <div className="prose dark:prose-invert max-w-none">
      {q.passage && (
        <div className="mb-3 p-3 bg-slate-50 dark:bg-slate-900 rounded text-sm">
          {q.passage}
        </div>
      )}
      <div className="text-base font-medium text-slate-900 dark:text-slate-100">
        {q.question || q.prompt || q.text}
      </div>
    </div>
  );
}

function getOptions(q) {
  if (!q) return [];
  if (Array.isArray(q.options)) return q.options;
  if (Array.isArray(q.choices)) return q.choices;
  if (q.A && q.B) return [q.A, q.B, q.C, q.D].filter(Boolean);
  return [];
}

export default function CollabQuizSession({
  roomState,
  currentUserId,
  emit,
  lastReveal,
  lastEvent,
}) {
  const isHost = currentUserId === roomState.hostId;
  const sessionType = roomState.sessionType;
  const paceMode = roomState.state?.paceMode || 'locked';
  const lockedToHost =
    sessionType === 'instructor_led' && paceMode === 'locked' && !isHost;

  const hostQuestionIndex = roomState.state?.currentQuestion || 0;
  const [studentIndex, setStudentIndex] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  // Sync student index with host in locked mode
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
  const myAnswerKey = `${currentIndex}`;
  const myAnswer = submittedAnswers[myAnswerKey];
  const revealed = roomState.state?.revealedQuestions?.includes(currentIndex);

  // Sync peer current question (handled via host index since peer mode has both able to advance)
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
    if (isHost) {
      emit('instructor:set_question', { index: next });
    } else if (sessionType === 'peer') {
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

  // Aggregate answer distribution for host (instructor_led)
  const distribution = useMemo(() => {
    if (!isHost || sessionType !== 'instructor_led') return null;
    const counts = {};
    let answered = 0;
    for (const p of roomState.participants || []) {
      const a = p.answeredQuestions?.includes(currentIndex);
      if (a) answered += 1;
    }
    return { answered, total: roomState.participants.length };
    // We don't have per-participant raw answers in client state for privacy; counts shown via reveal.
  }, [isHost, sessionType, currentIndex, roomState.participants]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-800 shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {roomState.title}
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-300">
              Question {currentIndex + 1} of {questions.length}
              {sessionType === 'instructor_led' && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                  {paceMode === 'locked' ? 'Locked Pace' : 'Free Pace'}
                </span>
              )}
            </div>
          </div>
          {isHost && (
            <div className="flex gap-2">
              <button
                onClick={toggleMode}
                className="px-3 py-1.5 text-sm bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600"
              >
                {paceMode === 'locked' ? 'Switch to Free' : 'Switch to Locked'}
              </button>
              <button
                onClick={endSession}
                className="px-3 py-1.5 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800"
              >
                End
              </button>
            </div>
          )}
        </div>

        {currentQ ? (
          <>
            <div className="mb-6">{renderQuestion(currentQ)}</div>

            <div className="space-y-2 mb-4">
              {options.map((opt, idx) => {
                const choice =
                  typeof opt === 'string'
                    ? opt
                    : opt.label || opt.text || String(idx);
                const value =
                  typeof opt === 'string'
                    ? opt
                    : opt.value || opt.label || choice;
                const isMine = myAnswer === value;
                const isCorrect =
                  revealed &&
                  (currentQ.correctAnswer === value ||
                    currentQ.answer === value);
                return (
                  <button
                    key={idx}
                    disabled={!!myAnswer || revealed}
                    onClick={() => submitAnswer(value)}
                    className={`block w-full text-left px-4 py-3 rounded-md border transition ${
                      isCorrect
                        ? 'bg-green-100 dark:bg-green-900 border-green-400 text-green-900 dark:text-green-100'
                        : isMine
                          ? 'bg-blue-100 dark:bg-blue-900 border-blue-400 text-blue-900 dark:text-blue-100'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    } ${myAnswer || revealed ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <span className="font-semibold mr-2">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {choice}
                  </button>
                );
              })}
            </div>

            {!isHost && myAnswer && !revealed && sessionType === 'peer' && (
              <div className="text-sm text-slate-500 dark:text-slate-400 italic">
                Waiting for partner to answer…
              </div>
            )}

            {revealed &&
              lastReveal &&
              lastReveal.questionIndex === currentIndex && (
                <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900 rounded text-sm">
                  <div className="font-semibold mb-1">Answers</div>
                  <ul className="space-y-1">
                    {(lastReveal.answers || []).map((a) => (
                      <li key={a.userId}>
                        <span className="font-medium">{a.displayName}:</span>{' '}
                        <span className="font-mono">
                          {String(a.answer ?? '—')}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {lastReveal.explanation && (
                    <div className="mt-2 text-slate-700 dark:text-slate-300">
                      <span className="font-semibold">Explanation:</span>{' '}
                      {lastReveal.explanation}
                    </div>
                  )}
                </div>
              )}

            {isHost && sessionType === 'instructor_led' && distribution && (
              <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                {distribution.answered} / {distribution.total} answered
              </div>
            )}

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => advance(-1)}
                disabled={currentIndex === 0 || lockedToHost}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded disabled:opacity-50"
              >
                Previous
              </button>
              {isHost && !revealed && (
                <button
                  onClick={revealAnswers}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded"
                >
                  Reveal Answers
                </button>
              )}
              <button
                onClick={() => advance(1)}
                disabled={currentIndex >= questions.length - 1 || lockedToHost}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-slate-500">No question loaded.</div>
        )}

        {isHost && sessionType === 'instructor_led' && paceMode === 'free' && (
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Student Progress
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {(roomState.participants || [])
                .filter((p) => p.role !== 'host')
                .map((p) => (
                  <div
                    key={p.userId}
                    className="text-sm p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="font-medium truncate">{p.displayName}</div>
                    <div className="text-xs text-slate-500">
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
