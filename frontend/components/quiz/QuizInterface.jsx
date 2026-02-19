import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInteractiveToolPanel } from '../../hooks/useInteractiveToolPanel.js';
import { SUBJECT_COLORS } from '../../config/subjectVisuals.js';
import {
  FormulaSheetModal,
  ScienceFormulaSheet,
} from '../formula/FormulaSheets.jsx';
import { MathText } from '../math/MathText.jsx';
import { GeometryFigure } from '../geometry/GeometryFigure.jsx';
import { ChartDisplay } from '../charts/ChartDisplay.jsx';
import USRegionsMap from '../maps/USRegionsMap.jsx';
import { renderQuestionTextForDisplay } from '../../utils/mathUtils.js';
import {
  getOptionText,
  getOptionIsCorrect,
  isShortResponseQuestion,
  sanitizeHtmlContent,
  resolveAssetUrl,
} from '../../utils/textUtils.js';
import MathInputWithPad from '../MathInputWithPad.jsx';
import { TI30XSCalculator } from '../TI30XSCalculator.jsx';

const DEFAULT_COLOR_SCHEME = {
  background: 'var(--nav-active-bg)',
  text: 'var(--text-primary)',
  mutedText: 'var(--text-muted)',
  accent: 'var(--accent-blue)',
  accentText: '#ffffff',
  surface: 'var(--surface-primary)',
  surfaceBorder: 'var(--border-primary)',
  divider: 'var(--border-muted)',
  timerDefaultBg: 'var(--surface-secondary)',
  timerDefaultText: 'var(--text-primary)',
  timerLowBg: '#fee2e2',
  timerLowText: '#991b1b',
};

export function QuizInterface({
  questions,
  answers,
  setAnswers,
  onComplete,
  buttonText,
  quizTitle,
  onExit,
  timeLimit,
  subject,
  showTimer = true,
  quizConfig,
  article = null,
  articleImage = null,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [marked, setMarked] = useState(Array(questions.length).fill(false));
  const [confidence, setConfidence] = useState(
    Array(questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(timeLimit || questions.length * 90);
  const [isPaused, setIsPaused] = useState(false);
  const [pausesRemaining, setPausesRemaining] = useState(2);
  const handleSubmitRef = useRef(() => {});
  const [showMathFormulas, setShowMathFormulas] = useState(false);
  const [showScienceFormulas, setShowScienceFormulas] = useState(false);
  const [showArticle, setShowArticle] = useState(Boolean(article));
  const toolPanelRef = useRef(null);
  const toolInstanceRef = useRef(null);
  const toolTypeRef = useRef(null); // 'graph' | 'geometry' | null
  const [showCalculator, setShowCalculator] = useState(false);
  const [zenMode, setZenMode] = useState(false);

  useEffect(() => {
    setTimeLeft(timeLimit || questions.length * 90);
    setIsPaused(false);
    setPausesRemaining(2);
  }, [questions, timeLimit]);

  useEffect(() => {
    setShowArticle(Boolean(article));
  }, [article]);

  useEffect(() => {
    if (!onComplete || isPaused) return; // Don't run timer if there's no completion action (e.g., in a part of a larger quiz)
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onComplete, isPaused]);

  // MULTIPLE-SELECT ENHANCEMENT: Support both single-select and multiple-select questions
  const detectMultiSelect = (q) => {
    if (q.itemType === 'multi_select' || q.selectType === 'multiple' || q.type === 'multiple-select') return true;
    const qText = (q.questionText || q.question || '').toLowerCase();
    if (/select\s+(the\s+)?(two|2|all|both)|choose\s+(the\s+)?(two|2|all|both)/.test(qText)) return true;
    return false;
  };

  const handleSelect = (optionText) => {
    const currentQ = questions[currentIndex];
    const isMultipleSelect = detectMultiSelect(currentQ);

    const newAnswers = [...answers];

    if (isMultipleSelect) {
      // Toggle selection for multiple-select questions
      const currentSelections = Array.isArray(newAnswers[currentIndex])
        ? newAnswers[currentIndex]
        : newAnswers[currentIndex]
        ? [newAnswers[currentIndex]]
        : [];

      const index = currentSelections.indexOf(optionText);
      if (index > -1) {
        // Deselect: remove from array
        currentSelections.splice(index, 1);
      } else {
        // Select: add to array
        currentSelections.push(optionText);
      }
      newAnswers[currentIndex] =
        currentSelections.length > 0 ? currentSelections : null;
    } else {
      // Single-select: replace with new selection
      newAnswers[currentIndex] = optionText;
    }

    setAnswers(newAnswers);
  };

  const handleInputChange = (e) => {
    const newAnswers = [...answers];
    const value = e.target.value;

    // For Science and Math: enforce numeric-only for fill-in questions without answer options
    const isScienceOrMath = /science|math/i.test(
      subject || quiz?.subject || ''
    );
    const isNumericQuestion =
      currentQ.type === 'numeric' || currentQ.responseType === 'numeric';
    const isFillInNoOptions =
      (!Array.isArray(currentQ.answerOptions) ||
        currentQ.answerOptions.length === 0) &&
      !isShortResponseQuestion(currentQ);

    if (isScienceOrMath && (isNumericQuestion || isFillInNoOptions)) {
      // Allow only numeric characters, decimal points, negative signs, fractions, percents
      const numericPattern = /^[\d\.\-\/%\s\(\)]*$/;
      if (!numericPattern.test(value)) {
        // Show validation message briefly
        console.log(
          '[UI] Numeric answers only for Science/Math fill-in questions'
        );
        return; // Don't update answer if non-numeric input
      }
    }

    newAnswers[currentIndex] = value;
    setAnswers(newAnswers);
  };

  const handleConfidenceSelect = (level) => {
    const newConfidence = [...confidence];
    newConfidence[currentIndex] = level;
    setConfidence(newConfidence);
  };

  const handleSubmit = useCallback(() => {
    onComplete({ answers, marked, confidence });
  }, [answers, marked, onComplete, confidence]);

  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }, [handleSubmit]);

  const handlePauseToggle = () => {
    if (isPaused) {
      setIsPaused(false);
      return;
    }
    if (pausesRemaining > 0) {
      setIsPaused(true);
      setPausesRemaining((prev) => prev - 1);
    }
  };

  const formatTime = (seconds) => {
    const safeSeconds = Math.max(0, seconds);
    return `${Math.floor(safeSeconds / 60)}:${(safeSeconds % 60)
      .toString()
      .padStart(2, '0')}`;
  };
  const currentQ = questions[currentIndex];
  if (!currentQ) return <div>Loading question...</div>;
  // Detect interactive US regions map usage
  const hasUSRegionsMap = Boolean(
    currentQ?.interactive?.type === 'us-regions' || currentQ?.widget === 'us-regions' || /\[\[US_REGIONS_MAP\]\]/.test(String(currentQ?.question || ''))
  );

  const regionAnswer = typeof answers[currentIndex] === 'string' ? answers[currentIndex] : null;


  const baseFillIn =
    currentQ.type === 'fill-in-the-blank' ||
    !Array.isArray(currentQ.answerOptions) ||
    currentQ.answerOptions.length === 0;

  // NUMERIC ENTRY ENHANCEMENT: Detect numeric entry questions for Math
  const isNumericEntry =
    currentQ.type === 'numeric' || currentQ.responseType === 'numeric';

  const isShortResponse = isShortResponseQuestion(currentQ);
  const isFillInTheBlank = baseFillIn && !isNumericEntry && !isShortResponse;

  // MULTIPLE-SELECT ENHANCEMENT: Determine if current question is multiple-select
  const isMultipleSelect = detectMultiSelect(currentQ);
  const currentAnswer = answers[currentIndex];
  const selectedOptions = isMultipleSelect
    ? Array.isArray(currentAnswer)
      ? currentAnswer
      : currentAnswer
      ? [currentAnswer]
      : []
    : [currentAnswer];

  const subjectForRender = currentQ.subject || subject || 'Default';
  const quizSubject = subject || 'Default';

  const isMathOrScienceQuiz = /^(math|science)$/i.test(String(quizSubject)) ||
    /^(math|science)$/i.test(String(subjectForRender)) ||
    /^(math|science)$/i.test(String(currentQ?.subject || ''));

  // Enable interactive tool panel only for Math questions (was hard-disabled)
  const TOOL_PANEL_ENABLED = /math/i.test(subjectForRender || subject || '');

  // Precompute if the question would need a tool (ignored when flag is false)
  const hasGraphDataForRender = Boolean(
    currentQ &&
      (currentQ.graphSpec || currentQ.graphData || currentQ.coordinatePlane)
  );
  const hasGeometryDataForRender = Boolean(currentQ && currentQ.geometrySpec);

  const formulaSheetEnabled = Boolean(quizConfig?.formulaSheet);
  const canShowMathFormulas = formulaSheetEnabled && quizSubject === 'Math';
  const canShowScienceFormulas =
    formulaSheetEnabled && quizSubject === 'Science';

  // Calculator default-on for Math/Science quizzes unless explicitly disabled.
  const calculatorAllowed =
    isMathOrScienceQuiz &&
    quizConfig?.calculator !== false &&
    currentQ?.calculator !== false;
  const subjectColors = SUBJECT_COLORS[subjectForRender] || {};
  const scheme = { ...DEFAULT_COLOR_SCHEME, ...subjectColors };
  const timerStyle =
    timeLeft <= 60
      ? { backgroundColor: scheme.timerLowBg, color: scheme.timerLowText }
      : {
          backgroundColor: scheme.timerDefaultBg,
          color: scheme.timerDefaultText,
        };

  // PASSAGE LINKING ENHANCEMENT: Check if current question has an associated passage
  const hasPassage = Boolean(currentQ.passage || currentQ.passageId);
  const passageContent = currentQ.passage || '';

  // Interactive tool mounting lifecycle (extracted to useInteractiveToolPanel hook)
  const { needsToolPanel } = useInteractiveToolPanel({
    enabled: TOOL_PANEL_ENABLED,
    currentQuestion: currentQ,
    toolPanelRef,
    hasGraphData: hasGraphDataForRender,
    hasGeometryData: hasGeometryDataForRender,
  });

  return (
    <div className="fade-in">
      {canShowMathFormulas && showMathFormulas && (
        <FormulaSheetModal onClose={() => setShowMathFormulas(false)} />
      )}
      {canShowScienceFormulas && showScienceFormulas && (
        <ScienceFormulaSheet onClose={() => setShowScienceFormulas(false)} />
      )}
      {showCalculator && (
        <TI30XSCalculator onClose={() => setShowCalculator(false)} />
      )}
      <div
        className="quiz-panel rounded-2xl p-4 sm:p-6 shadow-lg"
        data-subject={quizSubject}
        style={{
          backgroundColor: scheme.surface,
          border: `1px solid ${scheme.surfaceBorder}`,
        }}
      >
        {showTimer && (
          <header
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 mb-4"
            style={{
              borderBottom: `1px solid ${scheme.divider}`,
              opacity: zenMode ? 0.2 : 1,
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) =>
              zenMode && (e.currentTarget.style.opacity = '1')
            }
            onMouseLeave={(e) =>
              zenMode && (e.currentTarget.style.opacity = '0.2')
            }
          >
            {onExit && (
              <button
                onClick={onExit}
                className="flex items-center gap-1 text-sm font-semibold hover:underline"
                style={{ color: scheme.mutedText }}
              >
                <ArrowLeftIcon /> ← Back
              </button>
            )}
            <h2
              className="flex-1 text-center text-xl font-bold exam-title"
              style={{ color: scheme.text }}
            >
              {quizTitle}
            </h2>
            <div className="flex flex-col sm:items-end gap-2">
              <div
                className="flex items-center gap-2 rounded-full px-3 py-1 font-mono text-lg font-semibold"
                style={timerStyle}
              >
                <span role="img" aria-label="timer">
                  ⏱️
                </span>
                <span>{formatTime(timeLeft)}</span>
                {isPaused && (
                  <span
                    className="text-xs uppercase tracking-wide"
                    style={{ color: scheme.mutedText }}
                  >
                    Paused
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePauseToggle}
                  disabled={!isPaused && pausesRemaining === 0}
                  className="rounded-md px-3 py-1 text-sm font-semibold transition-colors"
                  style={
                    isPaused
                      ? {
                          backgroundColor: 'var(--success-bg)',
                          color: 'var(--success-text)',
                          border: '1px solid var(--success-border)',
                        }
                      : {
                          backgroundColor: scheme.accent,
                          color: scheme.accentText,
                          border: `1px solid ${scheme.accent}`,
                        }
                  }
                >
                  {isPaused ? '▶️ Resume Timer' : '⏸️ Pause Timer'}
                </button>
                <span className="text-xs" style={{ color: scheme.mutedText }}>
                  ⏯️ {pausesRemaining} pause{pausesRemaining === 1 ? '' : 's'}{' '}
                  left
                </span>
              </div>
              {(formulaSheetEnabled || calculatorAllowed) && (
                <div className="flex flex-wrap justify-end gap-2">
                  {formulaSheetEnabled && canShowMathFormulas && (
                    <button
                      type="button"
                      onClick={() => setShowMathFormulas(true)}
                      className="rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition"
                      data-role="secondary"
                      style={{
                        color: scheme.accentText,
                        borderColor: scheme.accent,
                      }}
                    >
                      📐 Formula Sheet
                    </button>
                  )}
                  {formulaSheetEnabled && canShowScienceFormulas && (
                    <button
                      type="button"
                      onClick={() => setShowScienceFormulas(true)}
                      className="rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition"
                      data-role="secondary"
                      style={{
                        color: 'var(--danger-text)',
                        borderColor: 'var(--danger-border)',
                      }}
                    >
                      🧪 Science Formulas
                    </button>
                  )}
                  {calculatorAllowed && (
                    <button
                      type="button"
                      onClick={() => setShowCalculator(true)}
                      className="rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition"
                      data-role="secondary"
                      style={{
                        color: scheme.accentText,
                        borderColor: scheme.accent,
                      }}
                    >
                      🧮 Calculator
                    </button>
                  )}
                  {formulaSheetEnabled && (
                    <button
                      type="button"
                      onClick={() => setZenMode((prev) => !prev)}
                      className="rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition"
                      data-role="secondary"
                      style={{
                        color: zenMode ? scheme.accent : scheme.text,
                        borderColor: scheme.accent,
                        backgroundColor: zenMode
                          ? `${scheme.accent}22`
                          : 'transparent',
                      }}
                      title={
                        zenMode ? 'Exit Zen Mode' : 'Zen Mode: Hide distractions'
                      }
                    >
                      {zenMode ? '👁️ Exit Zen' : '🧘 Zen Mode'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </header>
        )}

        <div
          className={article || hasPassage ? 'ged-split-view' : ''}
          style={{
            backgroundColor: zenMode ? '#1a1a1a' : 'transparent',
            borderRadius: zenMode ? '1rem' : '0',
            padding: zenMode ? '2rem' : '0',
            transition: 'all 0.3s ease',
          }}
        >
          {(article || hasPassage) && (
            <div
              className="passage-pane mb-6 lg:mb-0"
              style={{
                backgroundColor: scheme.surfaceStrong,
                border: `1px solid ${scheme.surfaceBorder}`,
                borderRadius: '0.75rem',
                padding: '1rem',
              }}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between lg:hidden">
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: scheme.text }}
                  >
                    {article ? 'Reading Passage' : 'Passage'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowArticle((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm font-semibold transition-colors"
                  style={{
                    color: scheme.accentText,
                    backgroundColor: scheme.accent,
                    border: `1px solid ${scheme.accent}`,
                  }}
                >
                  {showArticle ? 'Hide Passage' : 'Show Passage'}
                </button>
              </div>

              {/* Always show on desktop (split view), toggle on mobile */}
              <div className={showArticle ? 'block' : 'hidden lg:block'}>
                <div className="mt-3 space-y-3 text-sm leading-relaxed">
                  {article ? (
                    <>
                      {article.title && (
                        <h4
                          className="text-base font-bold"
                          style={{ color: scheme.text }}
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtmlContent(article.title, {
                              normalizeSpacing: true,
                            }),
                          }}
                        />
                      )}
                      {(article.imageUrl || articleImage) &&
                        (() => {
                          const rawImg = article.imageUrl || articleImage;
                          const imgSrc = resolveAssetUrl(rawImg);
                          return imgSrc ? (
                            <img
                              src={imgSrc}
                              alt={
                                article.imageAlt ||
                                article.title ||
                                'Reading passage illustration'
                              }
                              className="max-h-40 w-full rounded-lg object-cover"
                              style={{
                                border: '1px solid var(--border-subtle)',
                              }}
                            />
                          ) : null;
                        })()}
                      {(article.text || []).map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-sm"
                          style={{ color: scheme.text }}
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtmlContent(paragraph, {
                              normalizeSpacing: true,
                            }),
                          }}
                        />
                      ))}
                    </>
                  ) : hasPassage ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtmlContent(passageContent, {
                          normalizeSpacing: true,
                        }),
                      }}
                      style={{ color: scheme.text }}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          )}

          <div className="question-pane">
            <div className="mb-4 flex flex-wrap gap-2 quiz-nav">
              {questions.map((_, i) => {
                const isActive = i === currentIndex;
                const isAnswered = Boolean(answers[i]);
                const navStyle = isActive
                  ? {
                      backgroundColor: scheme.background,
                      color: scheme.onBackgroundText,
                    }
                  : isAnswered
                  ? {
                      backgroundColor: scheme.navAnsweredBg,
                      color: scheme.navAnsweredText,
                    }
                  : {
                      backgroundColor: scheme.navDefaultBg,
                      color: scheme.navDefaultText,
                    };
                if (marked[i]) {
                  navStyle.boxShadow = `0 0 0 2px ${scheme.navMarkedRing}`;
                }
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className="h-8 w-8 rounded-full text-sm font-bold transition"
                    style={navStyle}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            <div
              className="question-container rounded-xl p-4 sm:p-6 shadow-inner"
              data-subject={quizSubject}
              style={{
                border: `1px solid ${scheme.surfaceBorder}`,
                backgroundColor: scheme.surfaceStrong || scheme.surface,
              }}
            >
              {currentQ.clusterLabel && (
                <div
                  className="mb-3 rounded-md border px-3 py-2 text-sm"
                  style={{
                    borderColor: scheme.surfaceBorder,
                    backgroundColor: scheme.surface,
                    color: scheme.mutedText,
                  }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: scheme.text }}
                  >
                    Scenario:
                  </span>{' '}
                  {currentQ.clusterLabel}
                </div>
              )}
              <div className="mb-4">
                <div className="flex items-start gap-3">
                  <span
                    className="text-xl font-semibold leading-relaxed"
                    style={{ color: scheme.text }}
                  >
                    {currentIndex + 1}.
                  </span>
                  <Stem item={currentQ} />
                </div>
              </div>
              {(() => {
                const rawImgSrc =
                  !currentQ.stimulusImage?.src && currentQ.imageUrl
                    ? currentQ.imageUrl
                    : null;
                const imgSrc = resolveAssetUrl(rawImgSrc);
                return imgSrc && !hasUSRegionsMap ? (
                  <img
                    src={imgSrc}
                    alt={`Visual for question ${currentQ.questionNumber}`}
                    className="my-4 h-auto max-w-full rounded-md"
                    style={{ border: `1px solid ${scheme.surfaceBorder}` }}
                    onError={(e) => {
                      if (e.target.dataset.fallbackApplied) {
                        e.target.style.display = 'none';
                        return;
                      }
                      e.target.dataset.fallbackApplied = '1';
                      const src = e.target.getAttribute('src') || '';
                      const origin =
                        (typeof window !== 'undefined' &&
                          window.location &&
                          window.location.origin) ||
                        '';
                      const idx = src.indexOf('/Images/');
                      if (idx !== -1) {
                        // Convert legacy /Images/ to canonical /images/
                        const rel = src
                          .substring(idx)
                          .replace('/Images/', '/images/');
                        e.target.src = origin + rel;
                      } else {
                        e.target.style.display = 'none';
                      }
                    }}
                  />
                ) : null;
              })()}

              {hasUSRegionsMap && (
                <div className="my-4">
                  <USRegionsMap
                    selectedRegion={regionAnswer || null}
                    onRegionSelect={(r) => {
                      const newAnswers = [...answers];
                      newAnswers[currentIndex] = r;
                      setAnswers(newAnswers);
                    }}
                    disabled={false}
                    showLabels={false}
                  />
                  <p className="mt-2 text-xs" style={{ color: scheme.mutedText }}>
                    Click a region (Midwest, Northeast, South, West). Your selection will sync below.
                  </p>
                </div>
              )}
              {GEOMETRY_FIGURES_ENABLED && currentQ.geometrySpec && (
                <div
                  className="my-4 mx-auto max-w-md rounded-md p-4 shadow-sm bg-white text-black dark:bg-slate-900 dark:text-slate-100"
                  style={{ border: `1px solid ${scheme.surfaceBorder}` }}
                >
                  <GeometryFigure
                    spec={currentQ.geometrySpec}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Interactive tool panel (conditionally rendered; disabled via flag) */}
              {TOOL_PANEL_ENABLED && needsToolPanel && (
                <div
                  id="interactive-tool-panel"
                  ref={toolPanelRef}
                  className="quiz-tool-panel my-4 rounded-lg"
                  role="region"
                  aria-label="Interactive math tool"
                  style={{
                    backgroundColor: scheme.surface,
                    border: `1px dashed ${scheme.surfaceBorder}`,
                    padding: '0.75rem',
                  }}
                />
              )}

              {isShortResponse ? (
                <div>
                  <label
                    htmlFor="short-response-answer"
                    className="mb-1 block text-sm font-medium"
                    style={{ color: scheme.mutedText }}
                  >
                    Enter a short constructed response (2–4 sentences):
                  </label>
                  <textarea
                    id="short-response-answer"
                    value={answers[currentIndex] || ''}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full rounded-lg p-3 text-base leading-relaxed focus:outline-none"
                    style={{
                      border: `1px solid ${scheme.inputBorder}`,
                      color: scheme.text,
                      backgroundColor: scheme.surface,
                      resize: 'vertical',
                    }}
                    placeholder="Type your response and reference the passage or data when possible."
                  />
                  <p
                    className="mt-2 text-xs"
                    style={{ color: scheme.mutedText }}
                  >
                    These items are scored manually. Focus on evidence and clear
                    reasoning.
                  </p>
                  {(() => {
                    const rubricHints = Array.isArray(currentQ.expectedFeatures)
                      ? currentQ.expectedFeatures
                      : Array.isArray(currentQ.rubricHints)
                      ? currentQ.rubricHints
                      : [];
                    const sampleAnswer =
                      typeof currentQ.sampleAnswer === 'string'
                        ? currentQ.sampleAnswer.trim()
                        : '';
                    if (!rubricHints.length && !sampleAnswer) return null;
                    return (
                      <div
                        className="mt-4 rounded-lg border p-3 text-sm"
                        style={{
                          borderColor: scheme.surfaceBorder,
                          backgroundColor: scheme.surface,
                        }}
                      >
                        {rubricHints.length > 0 && (
                          <div>
                            <p
                              className="font-semibold"
                              style={{ color: scheme.text }}
                            >
                              Rubric checklist
                            </p>
                            <ul className="mt-2 list-disc pl-5 space-y-1">
                              {rubricHints.map((hint, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs"
                                  style={{ color: scheme.mutedText }}
                                >
                                  {hint}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {sampleAnswer && (
                          <details
                            className="mt-3 text-xs"
                            style={{ color: scheme.mutedText }}
                          >
                            <summary className="cursor-pointer font-semibold">
                              View sample answer
                            </summary>
                            <p
                              className="mt-2 leading-relaxed"
                              style={{ color: scheme.text }}
                            >
                              {sampleAnswer}
                            </p>
                          </details>
                        )}
                      </div>
                    );
                  })()}
                </div>
              ) : isFillInTheBlank || isNumericEntry ? (
                <div>
                  <label
                    htmlFor="fill-in-blank-answer"
                    className="mb-1 block text-sm font-medium"
                    style={{ color: scheme.mutedText }}
                  >
                    {isNumericEntry
                      ? 'Enter your numeric answer:'
                      : 'Enter your answer:'}
                  </label>
                  {(isNumericEntry ||
                    (/science|math/i.test(subject || quiz?.subject || '') &&
                      !Array.isArray(currentQ.answerOptions) &&
                      !currentQ.answerOptions?.length)) && (
                    <p
                      className="mb-2 text-xs"
                      style={{
                        color: 'var(--warning-text)',
                        backgroundColor: 'var(--warning-bg)',
                        padding: '0.5rem',
                        borderRadius: '0.375rem',
                        border: '1px solid var(--warning-border)',
                      }}
                    >
                      ⚠️ Numeric answers only. Enter numbers, decimals, or
                      fractions (e.g., 42, 3.14, 1/2, 25%).
                    </p>
                  )}
                  {/* Use MathInputWithPad for Math subjects */}
                  {/math/i.test(subject || quiz?.subject || '') ? (
                    <MathInputWithPad
                      value={answers[currentIndex] || ''}
                      onChange={(newValue) => {
                        const newAnswers = [...answers];
                        newAnswers[currentIndex] = newValue;
                        setAnswers(newAnswers);
                      }}
                      placeholder={
                        isNumericEntry
                          ? 'Enter a number (e.g., 3.5 or 3/4)'
                          : 'Type your answer here'
                      }
                      disabled={false}
                    />
                  ) : (
                    <input
                      id="fill-in-blank-answer"
                      type={isNumericEntry ? 'text' : 'text'}
                      inputMode={isNumericEntry ? 'decimal' : 'text'}
                      value={answers[currentIndex] || ''}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (currentIndex === questions.length - 1) {
                            handleSubmit();
                          } else {
                            setCurrentIndex((p) =>
                              Math.min(questions.length - 1, p + 1)
                            );
                          }
                        }
                      }}
                      placeholder={
                        isNumericEntry
                          ? 'Enter a number (e.g., 3.5 or 3/4)'
                          : 'Type your answer here'
                      }
                      className="w-full max-w-sm rounded-lg p-3 focus:outline-none"
                      style={{
                        border: `1px solid ${scheme.inputBorder}`,
                        color: scheme.text,
                      }}
                    />
                  )}
                </div>
              ) : currentQ.itemType === 'inline_dropdown' &&
                currentQ.passageWithPlaceholders ? (
                // RLA Part 3: Inline Dropdown (Cloze) passage
                <div>
                  <p
                    className="mb-4 text-sm font-medium"
                    style={{ color: scheme.mutedText }}
                  >
                    Select the best option for each dropdown to complete the
                    passage correctly.
                  </p>
                  <InlineDropdownPassage
                    passageText={currentQ.passageWithPlaceholders}
                    questions={questions.filter(
                      (q) =>
                        q.itemType === 'inline_dropdown' &&
                        q.passage === currentQ.passage
                    )}
                    answers={answers}
                    onAnswerChange={(index, value) => {
                      const newAnswers = [...answers];
                      newAnswers[index] = value;
                      setAnswers(newAnswers);
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Multi-select instruction */}
                  {isMultipleSelect && (
                    <p
                      className="mb-3 text-sm font-medium px-3 py-2 rounded-lg"
                      style={{
                        color: scheme.accentText,
                        backgroundColor: scheme.accentSoft,
                        border: `1px solid ${scheme.accentBorder}`,
                      }}
                    >
                      ℹ️ Select ALL correct answers. Multiple answers may be
                      correct.
                    </p>
                  )}
                  {(currentQ.answerOptions || []).map((opt, i) => {
                    // Handle both string and object formats for answerOptions
                    const optText =
                      typeof opt === 'string' ? opt : opt?.text || '';
                    const cleanedOptionText =
                      typeof optText === 'string'
                        ? optText.trim().replace(/^\$\$/, '$')
                        : '';
                    // MULTIPLE-SELECT ENHANCEMENT: Check if option is selected (works for both modes)
                    const isSelected = selectedOptions.includes(optText);
                    const optionStyles = {};
                    if (isSelected) {
                      optionStyles.backgroundColor = scheme.optionSelectedBg;
                      optionStyles.borderColor = scheme.optionSelectedBorder;
                      optionStyles.color = scheme.accentText;
                    }
                    // MULTIPLE-SELECT ENHANCEMENT: Add class for multiple-select mode
                    const optionClassNames = [
                      'option',
                      'answer-option',
                      'w-full',
                      'text-left',
                      'transition',
                      isMultipleSelect ? 'multiple-select' : '',
                    ];
                    if (isSelected) {
                      optionClassNames.push('selected');
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(optText)}
                        className={optionClassNames.join(' ')}
                        style={optionStyles}
                      >
                        {/* MULTIPLE-SELECT: Show checkbox icon for multi-select questions */}
                        {isMultipleSelect && (
                          <span
                            className="mr-2 text-lg"
                            style={{
                              color: isSelected
                                ? scheme.accent
                                : scheme.mutedText,
                            }}
                          >
                            {isSelected ? '☑' : '☐'}
                          </span>
                        )}
                        <span
                          className="flex-grow text-left"
                          style={{ color: scheme.text }}
                        >
                          <span className="mr-2 font-bold">
                            {String.fromCharCode(65 + i)}.
                          </span>
                          <span
                            className="question-stem"
                            dangerouslySetInnerHTML={renderQuestionTextForDisplay(
                              cleanedOptionText,
                              currentQ.isPremade === true,
                              currentQ
                            )}
                          />
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CONFIDENCE TRACKING */}
            <div className="confidence-toggle mt-4">
              <button
                onClick={() => handleConfidenceSelect('sure')}
                className={`confidence-btn sure ${
                  confidence[currentIndex] === 'sure' ? 'active' : ''
                }`}
              >
                ✓ I'm Sure
              </button>
              <button
                onClick={() => handleConfidenceSelect('guessing')}
                className={`confidence-btn guessing ${
                  confidence[currentIndex] === 'guessing' ? 'active' : ''
                }`}
              >
                ? I'm Guessing
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
                disabled={currentIndex === 0}
                className="rounded-md px-4 py-2 font-semibold transition"
                data-role="secondary"
                style={{
                  borderColor: scheme.surfaceBorder,
                  color: scheme.mutedText,
                  opacity: currentIndex === 0 ? 0.6 : 1,
                }}
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setMarked((m) => {
                    const newM = [...m];
                    newM[currentIndex] = !newM[currentIndex];
                    return newM;
                  })
                }
                className="rounded-md px-4 py-2 font-semibold transition"
                style={
                  marked[currentIndex]
                    ? {
                        backgroundColor: scheme.navMarkedRing,
                        color: scheme.onBackgroundText,
                        border: `1px solid ${scheme.navMarkedRing}`,
                      }
                    : {
                        backgroundColor: scheme.navDefaultBg,
                        color: scheme.navDefaultText,
                        border: `1px solid ${scheme.navDefaultBg}`,
                      }
                }
              >
                {marked[currentIndex] ? 'Unmark' : 'Mark'} for Review
              </button>
              {currentIndex === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="rounded-md px-4 py-2 font-semibold"
                  data-role="primary"
                  style={{
                    backgroundColor: scheme.accent,
                    color: scheme.accentText,
                    borderColor: scheme.accent,
                  }}
                >
                  {buttonText || 'Finish'}
                </button>
              ) : (
                <button
                  onClick={() =>
                    setCurrentIndex((p) =>
                      Math.min(questions.length - 1, p + 1)
                    )
                  }
                  className="rounded-md px-4 py-2 font-semibold"
                  data-role="primary"
                  style={{
                    backgroundColor: scheme.accent,
                    color: scheme.accentText,
                    borderColor: scheme.accent,
                  }}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StandardQuizRunner({ quiz, onComplete, onExit }) {
  const questions = quiz.questions || [];
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  // --- Math Answer Normalization & Equivalence Helpers (Fill-in-the-Blank) ---
  // Lightweight parser supporting: fractions (a/b), mixed numbers (a b/c), ratios (a:b), percents (50%), currency ($1,050.25),
  // comma-separated multi answers ("18,19"), decimals, integers, tolerating whitespace & leading zeros.
  const MATH_EQUIV = {
    // Configurable numeric tolerance for float comparisons
    EPS: 1e-9,
    // Percent – decimal conversion regex
    PERCENT_RE: /^[-+]?\d+(?:\.\d+)?%$/,
    // Currency detection
    CURRENCY_RE: /^\$\s*[-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?$/,
    // Fraction (simple) a/b
    FRACTION_RE: /^[-+]?\d+\s*\/\s*\d+$/,
    // Mixed number: a b/c (allow sign on first part)
    MIXED_RE: /^[-+]?\d+\s+\d+\s*\/\s*\d+$/,
    // Ratio a:b (integers only)
    RATIO_RE: /^[-+]?\d+\s*:\s*[-+]?\d+$/,
    // Multi-answer list separated by comma
    MULTI_SPLIT_RE: /\s*,\s*/,
  };

  const normalizeRaw = (val) => {
    if (val === null || val === undefined) return '';
    return String(val)
      .replace(/\u00A0/g, ' ') // non-breaking space
      .replace(/\s+/g, ' ') // collapse internal whitespace
      .trim();
  };

  const stripCurrency = (s) => s.replace(/^\$/, '').replace(/,/g, '');
  const parseFraction = (s) => {
    const [a, b] = s.split('/').map((t) => t.trim());
    const num = Number(a),
      den = Number(b);
    if (!Number.isFinite(num) || !Number.isFinite(den) || den === 0)
      return null;
    return num / den;
  };
  const parseMixed = (s) => {
    const parts = s.split(/\s+/);
    if (parts.length < 2) return null;
    const whole = Number(parts[0]);
    const frac = parseFraction(parts.slice(1).join(' '));
    if (frac === null || !Number.isFinite(whole)) return null;
    return whole >= 0 ? whole + frac : whole - frac; // sign on whole applies
  };
  const parsePercent = (s) => {
    const num = Number(s.replace('%', ''));
    return Number.isFinite(num) ? num / 100 : null;
  };
  const parseCurrency = (s) => {
    const num = Number(stripCurrency(s));
    return Number.isFinite(num) ? num : null;
  };
  const parseRatio = (s) => {
    const [a, b] = s.split(':').map((t) => t.trim());
    const na = Number(a),
      nb = Number(b);
    if (!Number.isFinite(na) || !Number.isFinite(nb) || nb === 0) return null;
    return na / nb;
  };

  const numericValue = (raw) => {
    const s = normalizeRaw(raw);
    if (!s) return null;
    if (MATH_EQUIV.PERCENT_RE.test(s)) return parsePercent(s);
    if (MATH_EQUIV.CURRENCY_RE.test(s)) return parseCurrency(s);
    if (MATH_EQUIV.MIXED_RE.test(s)) return parseMixed(s);
    if (MATH_EQUIV.FRACTION_RE.test(s)) return parseFraction(s);
    if (MATH_EQUIV.RATIO_RE.test(s)) return parseRatio(s);
    // plain number (allow commas)
    const plain = s.replace(/,/g, '');
    const num = Number(plain);
    return Number.isFinite(num) ? num : null;
  };

  // Produce canonical string tokens for multi-answer sets (order-insensitive) or single answer.
  const canonicalTokens = (raw) => {
    const s = normalizeRaw(raw);
    if (!s) return [];
    // Multi-answer if comma present
    if (s.includes(',')) {
      return s
        .split(MATH_EQUIV.MULTI_SPLIT_RE)
        .filter(Boolean)
        .map((t) => normalizeRaw(t));
    }
    return [s];
  };

  const areTokenSetsEqual = (expTokens, userTokens) => {
    if (expTokens.length !== userTokens.length) return false;
    const a = [...expTokens].sort();
    const b = [...userTokens].sort();
    return a.every((v, i) => v === b[i]);
  };

  const isNumericEqual = (a, b) => {
    const na = numericValue(a);
    const nb = numericValue(b);
    if (na === null || nb === null) return false;
    return Math.abs(na - nb) < MATH_EQUIV.EPS;
  };

  const isEquivalentAnswer = (expected, user) => {
    const e = normalizeRaw(expected);
    const u = normalizeRaw(user);
    if (!e || !u) return false;
    if (e === u) return true; // exact match quick path
    // Numeric equivalence (covers fraction/decimal/percent/ratio/currency)
    if (isNumericEqual(e, u)) return true;
    // Multi-answer comparison (e.g. "18,19" vs "19,18")
    if (e.includes(',') || u.includes(',')) {
      return areTokenSetsEqual(canonicalTokens(e), canonicalTokens(u));
    }
    // Ratio vs fraction equivalence: treat ratio numeric already handled by numericValue
    return false;
  };

  // Helper: check if a fill-in question is correct
  const checkFillInQuestionCorrect = (q, userAns) => {
    return isEquivalentAnswer(q.correctAnswer, userAns);
  };

  // NUMERIC ENTRY ENHANCEMENT: Check numeric questions with optional tolerance
  const checkNumericQuestionCorrect = (q, userAns) => {
    if (!q.correctAnswer || !userAns) return false;

    const correctVal = numericValue(q.correctAnswer);
    const userVal = numericValue(userAns);

    if (correctVal === null || userVal === null) return false;

    // Check if tolerance is specified
    const tolerance =
      typeof q.tolerance === 'number' && q.tolerance >= 0 ? q.tolerance : 0;

    return Math.abs(userVal - correctVal) <= tolerance;
  };

  const handleComplete = (result) => {
    // 1) helper: normalize text
    const normalizeText = (val) => (val ?? '').toString().trim().toLowerCase();

    // 2) compute earned/possible with weights, all-or-nothing
    let earnedPoints = 0;
    let possiblePoints = 0;
    const manualShortResponseIndexes = [];

    (quiz.questions || []).forEach((q, idx) => {
      if (isShortResponseQuestion(q)) {
        manualShortResponseIndexes.push(idx);
        return;
      }
      const pts = typeof q.points === 'number' && q.points > 0 ? q.points : 1;
      possiblePoints += pts;

      const userAns = result.answers[idx];

      let isCorrect = false;

      // NUMERIC ENTRY ENHANCEMENT: Check numeric entry questions first
      if (q.type === 'numeric' || q.responseType === 'numeric') {
        isCorrect = checkNumericQuestionCorrect(q, userAns);
      } else if (Array.isArray(q.answerOptions) && q.answerOptions.length > 0) {
        // multiple-choice / multi-select
        const correctOpts = q.answerOptions.filter((o) => o && o.isCorrect);
        if (correctOpts.length === 1) {
          // single correct - use enhanced comparison for math questions
          const correctText = correctOpts[0].text;
          isCorrect = compareAnswers(correctText, userAns, {
            subject: quiz.subject,
            questionType: q.type,
          });
        } else if (correctOpts.length > 1) {
          // multi-correct, all-or-nothing
          const correctSet = correctOpts
            .map((o) => normalizeText(o.text))
            .sort();
          const userSet = (Array.isArray(userAns) ? userAns : [userAns])
            .map((v) => normalizeText(v))
            .filter(Boolean)
            .sort();
          if (userSet.length === correctSet.length) {
            isCorrect = userSet.every((val, i) => val === correctSet[i]);
          } else {
            isCorrect = false;
          }
        }
      } else {
        // fill-in questions - use enhanced comparison
        isCorrect = compareAnswers(q.correctAnswer, userAns, {
          subject: quiz.subject,
          questionType: q.type,
        });
      }

      if (isCorrect) {
        earnedPoints += pts;
      }
    });

    // 3) percentage from points
    const percentage =
      possiblePoints > 0 ? (earnedPoints / possiblePoints) * 100 : 0;

    // 4) GED-ish scaling: 3 segments
    let scaledScore;
    if (percentage <= 40) {
      // 0–40% => 100–135
      scaledScore = 100 + (percentage / 40) * 35;
    } else if (percentage <= 65) {
      // 40–65% => 135–145
      scaledScore = 135 + ((percentage - 40) / 25) * 10;
    } else {
      // 65–100% => 145–200
      scaledScore = 145 + ((percentage - 65) / 35) * 55;
    }
    scaledScore = Math.round(scaledScore);

    // 5) pass is still 145
    const passed = scaledScore >= 145;

    onComplete({
      score: earnedPoints,
      totalQuestions: possiblePoints, // we're using points here
      percentage,
      scaledScore,
      passed,
      subject: quiz.subject,
      answers: result.answers, // include user answers for results screen
      marked: result.marked,
      confidence: result.confidence,
      manualShortResponseIndexes,
      quiz,
    });
  };

  return (
    <QuizInterface
      questions={questions}
      answers={answers}
      setAnswers={setAnswers}
      onComplete={handleComplete}
      quizTitle={quiz.title}
      onExit={onExit}
      timeLimit={quiz.timeLimit}
      subject={quiz.subject}
      quizConfig={quiz.config}
      article={quiz.article}
      articleImage={quiz.imageUrl}
    />
  );
}

function MultiPartMathRunner({ quiz, onComplete, onExit }) {
  const [part, setPart] = useState(1);
  const [part1Result, setPart1Result] = useState(null);

  const part1Questions = quiz.questions.slice(0, 5);
  const part2Questions = quiz.questions.slice(5);

  const [part1Answers, setPart1Answers] = useState(
    Array(part1Questions.length).fill(null)
  );
  const [part2Answers, setPart2Answers] = useState(
    Array(part2Questions.length).fill(null)
  );

  const handlePart1Complete = (result) => {
    setPart1Result(result);
    setPart('interstitial'); // Go to interstitial screen
  };

  const handlePart2Complete = (result) => {
    // Defensive merging in case part1Result is null/partial
    const p1 = part1Result || {
      answers: Array(part1Questions.length).fill(null),
      marked: Array(part1Questions.length).fill(false),
      confidence: Array(part1Questions.length).fill(null),
    };

    const finalAnswers = [...(p1.answers || []), ...(result.answers || [])];
    const finalMarked = [...(p1.marked || []), ...(result.marked || [])];
    const finalConfidence = [
      ...(p1.confidence || []),
      ...(result.confidence || []),
    ];

    // Robust equivalence (match StandardQuizRunner helpers)
    const normalizeRaw = (val) => {
      if (val === null || val === undefined) return '';
      return String(val)
        .replace(/\u00A0/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    };
    const numericValue = (raw) => {
      const s = normalizeRaw(raw);
      if (!s) return null;
      if (/^[-+]?\d+(?:\.\d+)?%$/.test(s)) {
        const n = Number(s.replace('%', ''));
        return Number.isFinite(n) ? n / 100 : null;
      }
      if (/^\$\s*[-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?$/.test(s)) {
        const n = Number(s.replace(/^\$/, '').replace(/,/g, ''));
        return Number.isFinite(n) ? n : null;
      }
      if (/^[-+]?\d+\s+\d+\s*\/\s*\d+$/.test(s)) {
        const parts = s.split(/\s+/);
        const whole = Number(parts[0]);
        const fracParts = parts.slice(1).join(' ').split('/');
        const num = Number(fracParts[0]);
        const den = Number(fracParts[1]);
        if (
          !Number.isFinite(whole) ||
          !Number.isFinite(num) ||
          !Number.isFinite(den) ||
          den === 0
        )
          return null;
        const frac = num / den;
        return whole >= 0 ? whole + frac : whole - frac;
      }
      if (/^[-+]?\d+\s*\/\s*\d+$/.test(s)) {
        const [a, b] = s.split('/').map((t) => t.trim());
        const num = Number(a),
          den = Number(b);
        if (!Number.isFinite(num) || !Number.isFinite(den) || den === 0)
          return null;
        return num / den;
      }
      if (/^[-+]?\d+\s*:\s*[-+]?\d+$/.test(s)) {
        const [a, b] = s.split(':').map((t) => t.trim());
        const na = Number(a),
          nb = Number(b);
        if (!Number.isFinite(na) || !Number.isFinite(nb) || nb === 0)
          return null;
        return na / nb;
      }
      const plain = s.replace(/,/g, '');
      const num = Number(plain);
      return Number.isFinite(num) ? num : null;
    };
    const isNumericEqual = (a, b) => {
      const na = numericValue(a),
        nb = numericValue(b);
      return na !== null && nb !== null && Math.abs(na - nb) < 1e-9;
    };
    const tokenize = (raw) => {
      const s = normalizeRaw(raw);
      if (!s) return [];
      if (s.includes(','))
        return s
          .split(/\s*,\s*/)
          .filter(Boolean)
          .map(normalizeRaw);
      return [s];
    };
    const setsEqual = (a, b) => {
      if (a.length !== b.length) return false;
      const sa = [...a].sort();
      const sb = [...b].sort();
      return sa.every((v, i) => v === sb[i]);
    };

    let score = 0;
    const missing = [];
    quiz.questions.forEach((q, i) => {
      const isFillIn =
        !q.answerOptions ||
        q.answerOptions.length === 0 ||
        q.type === 'fill-in-the-blank';
      if (!isFillIn) {
        const correctOpt = findCorrectOption(q.answerOptions);
        if (correctOpt && finalAnswers[i] === correctOpt.text) {
          score++;
        }
      } else {
        const user = normalizeRaw(finalAnswers[i]);
        const correct = normalizeRaw(q.correctAnswer);
        if (!user || !correct) {
          if (!correct) missing.push(i + 1);
          return;
        }
        if (
          user === correct ||
          isNumericEqual(user, correct) ||
          setsEqual(tokenize(user), tokenize(correct))
        ) {
          score++;
        }
      }
    });

    if (missing.length) {
      // Non-spammy single warning per submission with question numbers lacking correctAnswer
      console.warn(
        `[grader] ${
          missing.length
        } fill-in question(s) missing correctAnswer: #${missing.join(', ')}`
      );
    }

    // New 3-segment scoring system
    // 1) helper: normalize text for MC questions
    const normalizeText = (val) => (val ?? '').toString().trim().toLowerCase();

    // 2) compute earned/possible with weights, all-or-nothing
    let earnedPoints = 0;
    let possiblePoints = 0;

    quiz.questions.forEach((q, idx) => {
      const pts = typeof q.points === 'number' && q.points > 0 ? q.points : 1;
      possiblePoints += pts;

      const userAns = finalAnswers[idx];
      let isCorrect = false;

      const isFillIn =
        !q.answerOptions ||
        q.answerOptions.length === 0 ||
        q.type === 'fill-in-the-blank';

      if (!isFillIn) {
        // multiple-choice
        const correctOpts = q.answerOptions.filter((o) => o && o.isCorrect);
        if (correctOpts.length === 1) {
          const correctText = normalizeText(correctOpts[0].text);
          const userText = normalizeText(userAns);
          isCorrect = userText === correctText;
        } else if (correctOpts.length > 1) {
          // multi-correct, all-or-nothing
          const correctSet = correctOpts
            .map((o) => normalizeText(o.text))
            .sort();
          const userSet = (Array.isArray(userAns) ? userAns : [userAns])
            .map((v) => normalizeText(v))
            .filter(Boolean)
            .sort();
          if (userSet.length === correctSet.length) {
            isCorrect = userSet.every((val, i) => val === correctSet[i]);
          }
        }
      } else {
        // fill-in: use existing equivalence logic
        const user = normalizeRaw(userAns);
        const correct = normalizeRaw(q.correctAnswer);
        if (user && correct) {
          isCorrect =
            user === correct ||
            isNumericEqual(user, correct) ||
            setsEqual(tokenize(user), tokenize(correct));
        }
      }

      if (isCorrect) {
        earnedPoints += pts;
      }
    });

    // 3) percentage from points
    const percentage =
      possiblePoints > 0 ? (earnedPoints / possiblePoints) * 100 : 0;

    // 4) GED-ish scaling: 3 segments
    let scaledScore;
    if (percentage <= 40) {
      // 0–40% => 100–135
      scaledScore = 100 + (percentage / 40) * 35;
    } else if (percentage <= 65) {
      // 40–65% => 135–145
      scaledScore = 135 + ((percentage - 40) / 25) * 10;
    } else {
      // 65–100% => 145–200
      scaledScore = 145 + ((percentage - 65) / 35) * 55;
    }
    scaledScore = Math.round(scaledScore);

    // 5) pass is still 145
    const passed = scaledScore >= 145;

    onComplete({
      score: earnedPoints,
      totalQuestions: possiblePoints,
      percentage,
      scaledScore,
      passed,
      answers: finalAnswers,
      subject: quiz.subject,
      marked: finalMarked,
      confidence: finalConfidence,
      quiz,
    });
  };

  if (part === 1) {
    return (
      <QuizInterface
        questions={part1Questions}
        answers={part1Answers}
        setAnswers={setPart1Answers}
        onComplete={handlePart1Complete}
        quizTitle="Part 1: Non-Calculator Section"
        buttonText="Continue to Part 2"
        onExit={onExit}
        subject={quiz.subject}
        quizConfig={quiz.config}
      />
    );
  }

  if (part === 'interstitial') {
    return (
      <div className="text-center p-8 fade-in">
        <h2 className="text-2xl font-bold mb-4">
          You have completed the non-calculator section.
        </h2>
        <p className="text-lg mb-6">
          You may now use a calculator for the remainder of the test.
        </p>
        <button
          onClick={() => setPart(2)}
          className="px-8 py-3 bg-sky-600 text-white font-bold rounded-lg"
        >
          Start Part 2
        </button>
      </div>
    );
  }

  if (part === 2) {
    return (
      <QuizInterface
        questions={part2Questions}
        answers={part2Answers}
        setAnswers={setPart2Answers}
        onComplete={handlePart2Complete}
        quizTitle="Part 2: Calculator-Permitted Section"
        buttonText="Finish Exam"
        onExit={onExit}
        subject={quiz.subject}
        quizConfig={quiz.config}
      />
    );
  }

  return null;
}

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.QuizInterface = QuizInterface;
}
