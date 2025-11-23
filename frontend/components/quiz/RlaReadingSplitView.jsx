const { useState, useMemo } = React;

function RlaReadingSplitView({
  questions,
  answers,
  setAnswers,
  onComplete,
  buttonText,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [marked, setMarked] = useState(Array(questions.length).fill(false));
  const [confidence, setConfidence] = useState(
    Array(questions.length).fill(null)
  );

  // Group questions by passage
  const passageGroups = useMemo(() => {
    const groups = [];
    let currentPassage = null;
    let currentGroup = { passage: '', questions: [] };

    questions.forEach((q, idx) => {
      const passageText = q.passage || '';
      if (passageText !== currentPassage) {
        if (currentGroup.questions.length > 0) {
          groups.push(currentGroup);
        }
        currentPassage = passageText;
        currentGroup = {
          passage: passageText,
          questions: [{ ...q, originalIndex: idx }],
        };
      } else {
        currentGroup.questions.push({ ...q, originalIndex: idx });
      }
    });
    if (currentGroup.questions.length > 0) {
      groups.push(currentGroup);
    }
    return groups;
  }, [questions]);

  const currentGroup = useMemo(() => {
    for (const group of passageGroups) {
      for (const q of group.questions) {
        if (q.originalIndex === currentQuestionIndex) {
          return group;
        }
      }
    }
    return passageGroups[0] || { passage: '', questions: [] };
  }, [currentQuestionIndex, passageGroups]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentQuestionInGroup = currentGroup.questions.findIndex(
    (q) => q.originalIndex === currentQuestionIndex
  );

  const handleSelect = (optionText) => {
    const isMultipleSelect =
      currentQuestion.itemType === 'multi_select' ||
      currentQuestion.selectType === 'multiple';
    const newAnswers = [...answers];

    if (isMultipleSelect) {
      const currentSelections = Array.isArray(newAnswers[currentQuestionIndex])
        ? newAnswers[currentQuestionIndex]
        : newAnswers[currentQuestionIndex]
        ? [newAnswers[currentQuestionIndex]]
        : [];
      const index = currentSelections.indexOf(optionText);
      if (index > -1) {
        currentSelections.splice(index, 1);
      } else {
        currentSelections.push(optionText);
      }
      newAnswers[currentQuestionIndex] =
        currentSelections.length > 0 ? currentSelections : null;
    } else {
      newAnswers[currentQuestionIndex] = optionText;
    }
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    onComplete({ answers, marked, confidence });
  };

  const isMultipleSelect =
    currentQuestion.itemType === 'multi_select' ||
    currentQuestion.selectType === 'multiple';
  const currentAnswer = answers[currentQuestionIndex];
  const selectedOptions = isMultipleSelect
    ? Array.isArray(currentAnswer)
      ? currentAnswer
      : currentAnswer
      ? [currentAnswer]
      : []
    : [currentAnswer];

  return (
    <div className="ged-split-view">
      {/* LEFT PANE: Passage */}
      <div className="ged-scroll-pane rla-passage-container">
        <h4
          className="rla-passage-title"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtmlContent(
              currentGroup.passage
                ?.split('<p>')[0]
                ?.replace('<strong>', '')
                .replace('</strong>', '') || 'Passage',
              { normalizeSpacing: true }
            ),
          }}
        />
        <div
          className="rla-passage-content"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtmlContent(currentGroup.passage || '', {
              normalizeSpacing: true,
            }),
          }}
        />
      </div>

      {/* RIGHT PANE: Questions */}
      <div className="ged-scroll-pane">
        <div className="space-y-4">
          {/* Question navigation for this passage */}
          <div className="flex flex-wrap gap-2 mb-4">
            {currentGroup.questions.map((q, i) => {
              const globalIdx = q.originalIndex;
              const isActive = globalIdx === currentQuestionIndex;
              const isAnswered = Boolean(answers[globalIdx]);
              return (
                <button
                  key={globalIdx}
                  onClick={() => setCurrentQuestionIndex(globalIdx)}
                  className={`h-8 w-8 rounded-full text-sm font-bold transition ${
                    isActive
                      ? 'bg-purple-600 text-white'
                      : isAnswered
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-200 text-slate-800'
                  }`}
                  style={
                    marked[globalIdx] ? { boxShadow: '0 0 0 2px gold' } : {}
                  }
                >
                  {globalIdx + 1}
                </button>
              );
            })}
          </div>

          {/* Current question */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="mb-4">
              <span className="text-xl font-bold text-purple-700 dark:text-purple-400">
                Question {currentQuestionIndex + 1}.
              </span>
              <div className="mt-2 text-lg">
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtmlContent(
                      currentQuestion.questionText ||
                        currentQuestion.question ||
                        '',
                      { normalizeSpacing: true }
                    ),
                  }}
                />
              </div>
            </div>

            {/* Multi-select instruction */}
            {isMultipleSelect && (
              <p className="mb-3 text-sm font-medium px-3 py-2 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                ℹ️ Select ALL correct answers. Multiple answers may be correct.
              </p>
            )}

            {/* Options */}
            <div className="space-y-3">
              {(currentQuestion.answerOptions || []).map((opt, i) => {
                const optText = typeof opt === 'string' ? opt : opt?.text || '';
                const isSelected = selectedOptions.includes(optText);
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(optText)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition ${
                      isSelected
                        ? 'bg-purple-50 border-purple-500 dark:bg-purple-900/30 dark:border-purple-400'
                        : 'bg-slate-50 border-slate-200 hover:border-purple-300 dark:bg-slate-700 dark:border-slate-600'
                    }`}
                  >
                    {isMultipleSelect && (
                      <span className="mr-2 text-lg">
                        {isSelected ? '☑' : '☐'}
                      </span>
                    )}
                    <span className="font-bold mr-2">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtmlContent(optText, {
                          normalizeSpacing: true,
                        }),
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Mark for review */}
            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id={`mark-${currentQuestionIndex}`}
                checked={marked[currentQuestionIndex]}
                onChange={(e) => {
                  const newMarked = [...marked];
                  newMarked[currentQuestionIndex] = e.target.checked;
                  setMarked(newMarked);
                }}
                className="h-4 w-4"
              />
              <label
                htmlFor={`mark-${currentQuestionIndex}`}
                className="text-sm text-slate-600 dark:text-slate-400"
              >
                Mark for review
              </label>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() =>
                setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))
              }
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300"
            >
              ← Previous
            </button>
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-700"
              >
                {buttonText || 'Continue'}
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentQuestionIndex(
                    Math.min(questions.length - 1, currentQuestionIndex + 1)
                  )
                }
                className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RlaReadingSplitView;

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.RlaReadingSplitView = RlaReadingSplitView;
}
