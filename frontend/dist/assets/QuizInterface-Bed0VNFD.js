import { j as jsxRuntimeExports, i as isShortResponseQuestion, F as FormulaSheetModal, S as ScienceFormulaSheet, T as TI30XSCalculator, G as GeometryFigure, r as renderQuestionTextForDisplay } from "./main-BXzOBaW-.js";
import { r as reactExports } from "./vendor-react-COE-dCYF.js";
import { _ as __vitePreload } from "./index-CamYW9Ap.js";
function useInteractiveToolPanel({
  enabled,
  currentQuestion,
  toolPanelRef,
  hasGraphData,
  hasGeometryData
}) {
  const toolInstanceRef = reactExports.useRef(null);
  const toolTypeRef = reactExports.useRef(null);
  const currentIndex = (currentQuestion == null ? void 0 : currentQuestion.index) ?? -1;
  const needsToolPanel = enabled && (hasGraphData || hasGeometryData);
  reactExports.useEffect(() => {
    if (!enabled || !(toolPanelRef == null ? void 0 : toolPanelRef.current)) return;
    const panel = toolPanelRef.current;
    const currentQ = currentQuestion;
    const nextType = hasGraphData ? "graph" : hasGeometryData ? "geometry" : null;
    const destroyTool = () => {
      if (toolInstanceRef.current) {
        try {
          if (typeof toolInstanceRef.current.destroy === "function") {
            toolInstanceRef.current.destroy();
          } else if (typeof toolInstanceRef.current.unmount === "function") {
            toolInstanceRef.current.unmount();
          }
        } catch (err) {
          console.warn("[tool-panel] destroy error:", (err == null ? void 0 : err.message) || err);
        }
        toolInstanceRef.current = null;
      }
      toolTypeRef.current = null;
    };
    if (toolTypeRef.current === nextType && nextType) {
      return;
    }
    destroyTool();
    if (!nextType) {
      try {
        panel.style.display = "none";
        panel.setAttribute("aria-hidden", "true");
      } catch {
      }
      return;
    }
    try {
      panel.style.display = "";
      panel.removeAttribute("aria-hidden");
    } catch {
    }
    panel.style.minHeight = "320px";
    (async () => {
      try {
        if (!enabled) return;
        if (nextType === "graph") {
          const mod = await __vitePreload(() => import("./GraphCanvas-BkYFk9Ia.js"), true ? [] : void 0);
          const mount = mod && mod.mount;
          const unmount = mod && mod.unmount;
          const GraphCanvas = mod && (mod.default || mod.GraphCanvas);
          const payload = {
            graphSpec: currentQ && (currentQ.graphSpec || currentQ.graphData || currentQ.coordinatePlane) || null
          };
          if (typeof mount === "function") {
            mount(panel, payload);
            toolInstanceRef.current = {
              destroy: () => {
                try {
                  unmount && unmount(panel);
                } catch {
                }
              }
            };
            toolTypeRef.current = "graph";
          } else if (typeof GraphCanvas === "function") {
            toolInstanceRef.current = new GraphCanvas(panel, {
              spec: payload.graphSpec
            });
            toolTypeRef.current = "graph";
          }
        } else if (nextType === "geometry") {
          const mod = await __vitePreload(() => import("./GeometryCanvas-BwX2FERW.js"), true ? [] : void 0);
          const mount = mod && mod.mount;
          const unmount = mod && mod.unmount;
          const GeometryCanvas = mod && (mod.default || mod.GeometryCanvas);
          const payload = {
            geometrySpec: currentQ && currentQ.geometrySpec || null
          };
          if (typeof mount === "function") {
            mount(panel, payload);
            toolInstanceRef.current = {
              destroy: () => {
                try {
                  unmount && unmount(panel);
                } catch {
                }
              }
            };
            toolTypeRef.current = "geometry";
          } else if (typeof GeometryCanvas === "function") {
            toolInstanceRef.current = new GeometryCanvas(panel, {
              spec: payload.geometrySpec
            });
            toolTypeRef.current = "geometry";
          }
        }
      } catch (e) {
        console.warn(
          "[tool-panel] failed to mount tool:",
          nextType,
          (e == null ? void 0 : e.message) || e
        );
      }
    })();
    return () => {
      destroyTool();
    };
  }, [
    enabled,
    currentIndex,
    currentQuestion == null ? void 0 : currentQuestion.useGraphTool,
    currentQuestion == null ? void 0 : currentQuestion.useGeometryTool,
    hasGraphData,
    hasGeometryData
  ]);
  return { needsToolPanel };
}
if (typeof window !== "undefined") {
  window.Hooks = Object.assign(window.Hooks || {}, { useInteractiveToolPanel });
}
const SUBJECT_NAMES = ["Math", "RLA", "Science", "Social Studies"];
const SUBJECT_COLORS = {
  Science: {
    background: "var(--subject-science-accent)",
    text: "var(--subject-science-surface-text)",
    heroText: "var(--subject-science-text)",
    border: "var(--subject-science-border)",
    scoreBackground: "var(--bg-overlay)",
    scoreText: "var(--subject-science-text)",
    scoreBorder: "var(--subject-science-border)",
    accent: "var(--subject-science-accent)",
    accentText: "var(--subject-science-accent-text)"
  },
  "Social Studies": {
    background: "var(--subject-social-accent)",
    text: "var(--subject-social-surface-text)",
    heroText: "var(--subject-social-text)",
    border: "var(--subject-social-border)",
    scoreBackground: "var(--bg-overlay)",
    scoreText: "var(--subject-social-text)",
    scoreBorder: "var(--subject-social-border)",
    accent: "var(--subject-social-accent)",
    accentText: "var(--subject-social-accent-text)"
  },
  "Reasoning Through Language Arts (RLA)": {
    background: "var(--subject-rla-accent)",
    text: "var(--subject-rla-surface-text)",
    heroText: "var(--subject-rla-text)",
    border: "var(--subject-rla-border)",
    scoreBackground: "var(--bg-overlay)",
    scoreText: "var(--subject-rla-text)",
    scoreBorder: "var(--subject-rla-border)",
    accent: "var(--subject-rla-accent)",
    accentText: "var(--subject-rla-accent-text)"
  },
  Math: {
    background: "var(--subject-math-accent)",
    text: "var(--math-text)",
    heroText: "var(--subject-math-text)",
    border: "var(--math-surface-border)",
    scoreBackground: "var(--bg-overlay)",
    scoreText: "var(--math-text)",
    scoreBorder: "var(--math-surface-border)",
    accent: "var(--subject-math-accent)",
    accentText: "var(--subject-math-accent-text)",
    surface: "var(--math-surface)",
    surfaceStrong: "var(--math-surface)",
    surfaceBorder: "var(--math-surface-border)",
    divider: "var(--math-divider)",
    mutedText: "var(--math-muted-text)",
    onBackgroundText: "var(--math-text)"
  },
  Workforce: {
    background: "var(--subject-workforce-accent)",
    text: "var(--subject-workforce-surface-text)",
    heroText: "var(--subject-workforce-text)",
    border: "var(--subject-workforce-border)",
    scoreBackground: "var(--bg-overlay)",
    scoreText: "var(--subject-workforce-text)",
    scoreBorder: "var(--subject-workforce-border)",
    accent: "var(--subject-workforce-accent)",
    accentText: "var(--subject-workforce-accent-text)"
  }
};
const SUBJECT_BG_GRADIENTS = {
  Math: "var(--subject-math-gradient)",
  Science: "var(--subject-science-gradient)",
  "Social Studies": "var(--subject-social-gradient)",
  "Reasoning Through Language Arts (RLA)": "var(--subject-rla-gradient)",
  Workforce: "var(--subject-workforce-gradient)"
};
const SUBJECT_LIGHT_SURFACE_GRADIENTS = {
  Math: "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(2,132,199,0.12))",
  Science: "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(220,38,38,0.12))",
  "Social Studies": "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(22,163,74,0.12))",
  "Reasoning Through Language Arts (RLA)": "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(124,58,237,0.12))",
  Workforce: "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(20,184,166,0.12))"
};
const SUBJECT_LIGHT_TINTS = {
  Math: "rgba(2,132,199,0.2)",
  Science: "rgba(220,38,38,0.2)",
  "Social Studies": "rgba(22,163,74,0.2)",
  "Reasoning Through Language Arts (RLA)": "rgba(124,58,237,0.2)",
  Workforce: "rgba(20,184,166,0.2)"
};
const SUBJECT_SHORT_LABELS = {
  Science: "Science",
  Math: "Math",
  "Social Studies": "Social Studies",
  "Reasoning Through Language Arts (RLA)": "RLA",
  Workforce: "Workforce"
};
const VOCABULARY_SUBJECT_COLORS = {
  Science: "#dc2626",
  Math: "#0284c7",
  "Social Studies": "#16a34a",
  "Reasoning Through Language Arts (RLA)": "#7c3aed"
};
const MAX_TICKER_WORDS_PER_SUBJECT = 10;
if (typeof window !== "undefined") {
  window.SubjectVisuals = Object.assign(window.SubjectVisuals || {}, {
    SUBJECT_NAMES,
    SUBJECT_COLORS,
    SUBJECT_BG_GRADIENTS,
    SUBJECT_LIGHT_SURFACE_GRADIENTS,
    SUBJECT_LIGHT_TINTS,
    SUBJECT_SHORT_LABELS,
    VOCABULARY_SUBJECT_COLORS,
    MAX_TICKER_WORDS_PER_SUBJECT
  });
}
if (typeof window !== "undefined") {
  window.SubjectVisuals = { SUBJECT_NAMES, SUBJECT_COLORS, SUBJECT_BG_GRADIENTS, SUBJECT_LIGHT_SURFACE_GRADIENTS, SUBJECT_LIGHT_TINTS, SUBJECT_SHORT_LABELS, VOCABULARY_SUBJECT_COLORS, MAX_TICKER_WORDS_PER_SUBJECT };
}
const MathInputWithPad = ({
  value = "",
  onChange,
  placeholder = "Type your answer",
  disabled = false,
  className = ""
}) => {
  const { useRef, useCallback } = React;
  const inputRef = useRef(null);
  const insertAtCursor = useCallback(
    (textToInsert) => {
      if (!inputRef.current || disabled) return;
      const input = inputRef.current;
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const currentValue = value || "";
      const newValue = currentValue.substring(0, start) + textToInsert + currentValue.substring(end);
      onChange(newValue);
      setTimeout(() => {
        if (input) {
          const newPos = start + textToInsert.length;
          input.selectionStart = newPos;
          input.selectionEnd = newPos;
          input.focus();
        }
      }, 0);
    },
    [value, onChange, disabled]
  );
  const handleBackspace = useCallback(() => {
    if (!inputRef.current || disabled) return;
    const input = inputRef.current;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const currentValue = value || "";
    let newValue;
    let newCursorPos;
    if (start !== end) {
      newValue = currentValue.substring(0, start) + currentValue.substring(end);
      newCursorPos = start;
    } else if (start > 0) {
      newValue = currentValue.substring(0, start - 1) + currentValue.substring(start);
      newCursorPos = start - 1;
    } else {
      return;
    }
    onChange(newValue);
    setTimeout(() => {
      if (input) {
        input.selectionStart = newCursorPos;
        input.selectionEnd = newCursorPos;
        input.focus();
      }
    }, 0);
  }, [value, onChange, disabled]);
  const toggleNegative = useCallback(() => {
    if (disabled) return;
    const currentValue = value || "";
    let newValue;
    if (currentValue.startsWith("-")) {
      newValue = currentValue.substring(1);
    } else {
      newValue = "-" + currentValue;
    }
    onChange(newValue);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  }, [value, onChange, disabled]);
  const handleClear = useCallback(() => {
    if (disabled) return;
    onChange("");
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  }, [onChange, disabled]);
  const PadButton = ({ label, insertText, onClick, ariaLabel, span = 1 }) => {
    const buttonClass = `
      px-3 py-2 rounded-lg font-semibold transition
      ${disabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"}
      ${span === 2 ? "col-span-2" : ""}
    `;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => {
          if (onClick) onClick();
          else if (insertText) insertAtCursor(insertText);
        },
        disabled,
        "aria-label": ariaLabel || `Insert ${label}`,
        className: buttonClass,
        children: label
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `math-input-with-pad ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        type: "text",
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        disabled,
        className: `
          w-full px-4 py-3 mb-3 text-lg border-2 rounded-lg
          ${disabled ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed" : "bg-white border-blue-400 text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"}
          dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:border-blue-500
        `,
        "aria-label": "Math answer input"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `
        math-keypad p-3 rounded-lg border-2
        ${disabled ? "bg-gray-100 border-gray-300" : "bg-blue-50 border-blue-300"}
        dark:bg-gray-700 dark:border-gray-600
      `,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-5 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "7", insertText: "7", ariaLabel: "Insert 7" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "8", insertText: "8", ariaLabel: "Insert 8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "9", insertText: "9", ariaLabel: "Insert 9" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "+", insertText: "+", ariaLabel: "Insert plus" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "−", insertText: "-", ariaLabel: "Insert minus" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "4", insertText: "4", ariaLabel: "Insert 4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "5", insertText: "5", ariaLabel: "Insert 5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "6", insertText: "6", ariaLabel: "Insert 6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "×", insertText: "*", ariaLabel: "Insert multiply" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "÷", insertText: "/", ariaLabel: "Insert divide" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "1", insertText: "1", ariaLabel: "Insert 1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "2", insertText: "2", ariaLabel: "Insert 2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "3", insertText: "3", ariaLabel: "Insert 3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PadButton,
              {
                label: "(",
                insertText: "(",
                ariaLabel: "Insert left parenthesis"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PadButton,
              {
                label: ")",
                insertText: ")",
                ariaLabel: "Insert right parenthesis"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "0", insertText: "0", ariaLabel: "Insert 0", span: 2 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PadButton,
              {
                label: ".",
                insertText: ".",
                ariaLabel: "Insert decimal point"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "^", insertText: "^", ariaLabel: "Insert exponent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PadButton,
              {
                label: "/",
                insertText: "/",
                ariaLabel: "Insert fraction slash"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "x", insertText: "x", ariaLabel: "Insert variable x" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "y", insertText: "y", ariaLabel: "Insert variable y" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PadButton, { label: "π", insertText: "π", ariaLabel: "Insert pi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PadButton,
              {
                label: "±",
                onClick: toggleNegative,
                ariaLabel: "Toggle negative sign"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PadButton,
              {
                label: "←",
                onClick: handleBackspace,
                ariaLabel: "Backspace"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleClear,
              disabled,
              className: `
              w-full px-3 py-2 rounded-lg font-semibold transition
              ${disabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"}
            `,
              "aria-label": "Clear all",
              children: "Clear"
            }
          ) })
        ]
      }
    )
  ] });
};
if (typeof window !== "undefined") {
  window.MathInputWithPad = MathInputWithPad;
}
const DEFAULT_COLOR_SCHEME = {
  background: "var(--nav-active-bg)",
  text: "var(--text-primary)",
  mutedText: "var(--text-muted)",
  accent: "var(--accent-blue)",
  accentText: "#ffffff",
  surface: "var(--surface-primary)",
  surfaceBorder: "var(--border-primary)",
  divider: "var(--border-muted)",
  timerDefaultBg: "var(--surface-secondary)",
  timerDefaultText: "var(--text-primary)",
  timerLowBg: "#fee2e2",
  timerLowText: "#991b1b"
};
function QuizInterface({
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
  articleImage = null
}) {
  var _a;
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [marked, setMarked] = reactExports.useState(Array(questions.length).fill(false));
  const [confidence, setConfidence] = reactExports.useState(
    Array(questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = reactExports.useState(timeLimit || questions.length * 90);
  const [isPaused, setIsPaused] = reactExports.useState(false);
  const [pausesRemaining, setPausesRemaining] = reactExports.useState(2);
  const handleSubmitRef = reactExports.useRef(() => {
  });
  const [showMathFormulas, setShowMathFormulas] = reactExports.useState(false);
  const [showScienceFormulas, setShowScienceFormulas] = reactExports.useState(false);
  const [showArticle, setShowArticle] = reactExports.useState(Boolean(article));
  const toolPanelRef = reactExports.useRef(null);
  reactExports.useRef(null);
  reactExports.useRef(null);
  const [showCalculator, setShowCalculator] = reactExports.useState(false);
  const [zenMode, setZenMode] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setTimeLeft(timeLimit || questions.length * 90);
    setIsPaused(false);
    setPausesRemaining(2);
  }, [questions, timeLimit]);
  reactExports.useEffect(() => {
    setShowArticle(Boolean(article));
  }, [article]);
  reactExports.useEffect(() => {
    if (!onComplete || isPaused) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        var _a2;
        if (prev <= 1) {
          clearInterval(timer);
          (_a2 = handleSubmitRef.current) == null ? void 0 : _a2.call(handleSubmitRef);
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => clearInterval(timer);
  }, [onComplete, isPaused]);
  const handleSelect = (optionText) => {
    const currentQ2 = questions[currentIndex];
    const isMultipleSelect2 = currentQ2.selectType === "multiple" || currentQ2.type === "multiple-select";
    const newAnswers = [...answers];
    if (isMultipleSelect2) {
      const currentSelections = Array.isArray(newAnswers[currentIndex]) ? newAnswers[currentIndex] : newAnswers[currentIndex] ? [newAnswers[currentIndex]] : [];
      const index = currentSelections.indexOf(optionText);
      if (index > -1) {
        currentSelections.splice(index, 1);
      } else {
        currentSelections.push(optionText);
      }
      newAnswers[currentIndex] = currentSelections.length > 0 ? currentSelections : null;
    } else {
      newAnswers[currentIndex] = optionText;
    }
    setAnswers(newAnswers);
  };
  const handleInputChange = (e) => {
    const newAnswers = [...answers];
    const value = e.target.value;
    const isScienceOrMath = /science|math/i.test(
      subject || (quiz == null ? void 0 : quiz.subject) || ""
    );
    const isNumericQuestion = currentQ.type === "numeric" || currentQ.responseType === "numeric";
    const isFillInNoOptions = (!Array.isArray(currentQ.answerOptions) || currentQ.answerOptions.length === 0) && !isShortResponseQuestion(currentQ);
    if (isScienceOrMath && (isNumericQuestion || isFillInNoOptions)) {
      const numericPattern = /^[\d\.\-\/%\s\(\)]*$/;
      if (!numericPattern.test(value)) {
        console.log(
          "[UI] Numeric answers only for Science/Math fill-in questions"
        );
        return;
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
  const handleSubmit = reactExports.useCallback(() => {
    onComplete({ answers, marked, confidence });
  }, [answers, marked, onComplete, confidence]);
  reactExports.useEffect(() => {
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
    return `${Math.floor(safeSeconds / 60)}:${(safeSeconds % 60).toString().padStart(2, "0")}`;
  };
  const currentQ = questions[currentIndex];
  if (!currentQ) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading question..." });
  const baseFillIn = currentQ.type === "fill-in-the-blank" || !Array.isArray(currentQ.answerOptions) || currentQ.answerOptions.length === 0;
  const isNumericEntry = currentQ.type === "numeric" || currentQ.responseType === "numeric";
  const isShortResponse = isShortResponseQuestion(currentQ);
  const isFillInTheBlank = baseFillIn && !isNumericEntry && !isShortResponse;
  const isMultipleSelect = currentQ.selectType === "multiple" || currentQ.type === "multiple-select";
  const currentAnswer = answers[currentIndex];
  const selectedOptions = isMultipleSelect ? Array.isArray(currentAnswer) ? currentAnswer : currentAnswer ? [currentAnswer] : [] : [currentAnswer];
  const TOOL_PANEL_ENABLED = /math/i.test(subjectForRender);
  const hasGraphDataForRender = Boolean(
    currentQ && (currentQ.graphSpec || currentQ.graphData || currentQ.coordinatePlane)
  );
  const hasGeometryDataForRender = Boolean(currentQ && currentQ.geometrySpec);
  const subjectForRender = currentQ.subject || subject || "Default";
  const quizSubject = subject || "Default";
  const formulaSheetEnabled = Boolean(quizConfig == null ? void 0 : quizConfig.formulaSheet);
  const canShowMathFormulas = formulaSheetEnabled && quizSubject === "Math";
  const canShowScienceFormulas = formulaSheetEnabled && quizSubject === "Science";
  const subjectColors = SUBJECT_COLORS[subjectForRender] || {};
  const scheme = { ...DEFAULT_COLOR_SCHEME, ...subjectColors };
  const timerStyle = timeLeft <= 60 ? { backgroundColor: scheme.timerLowBg, color: scheme.timerLowText } : {
    backgroundColor: scheme.timerDefaultBg,
    color: scheme.timerDefaultText
  };
  const hasPassage = Boolean(currentQ.passage || currentQ.passageId);
  const passageContent = currentQ.passage || "";
  const { needsToolPanel } = useInteractiveToolPanel({
    enabled: TOOL_PANEL_ENABLED,
    currentQuestion: currentQ,
    toolPanelRef,
    hasGraphData: hasGraphDataForRender,
    hasGeometryData: hasGeometryDataForRender
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fade-in", children: [
    canShowMathFormulas && showMathFormulas && /* @__PURE__ */ jsxRuntimeExports.jsx(FormulaSheetModal, { onClose: () => setShowMathFormulas(false) }),
    canShowScienceFormulas && showScienceFormulas && /* @__PURE__ */ jsxRuntimeExports.jsx(ScienceFormulaSheet, { onClose: () => setShowScienceFormulas(false) }),
    showCalculator && /* @__PURE__ */ jsxRuntimeExports.jsx(TI30XSCalculator, { onClose: () => setShowCalculator(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "quiz-panel rounded-2xl p-4 sm:p-6 shadow-lg",
        "data-subject": quizSubject,
        style: {
          backgroundColor: scheme.surface,
          border: `1px solid ${scheme.surfaceBorder}`
        },
        children: [
          showTimer && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "header",
            {
              className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 mb-4",
              style: {
                borderBottom: `1px solid ${scheme.divider}`,
                opacity: zenMode ? 0.2 : 1,
                transition: "opacity 0.3s ease"
              },
              onMouseEnter: (e) => zenMode && (e.currentTarget.style.opacity = "1"),
              onMouseLeave: (e) => zenMode && (e.currentTarget.style.opacity = "0.2"),
              children: [
                onExit && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: onExit,
                    className: "flex items-center gap-1 text-sm font-semibold hover:underline",
                    style: { color: scheme.mutedText },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftIcon, {}),
                      " ← Back"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "flex-1 text-center text-xl font-bold exam-title",
                    style: { color: scheme.text },
                    children: quizTitle
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:items-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2 rounded-full px-3 py-1 font-mono text-lg font-semibold",
                      style: timerStyle,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "img", "aria-label": "timer", children: "⏱️" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTime(timeLeft) }),
                        isPaused && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-xs uppercase tracking-wide",
                            style: { color: scheme.mutedText },
                            children: "Paused"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handlePauseToggle,
                        disabled: !isPaused && pausesRemaining === 0,
                        className: "rounded-md px-3 py-1 text-sm font-semibold transition-colors",
                        style: isPaused ? {
                          backgroundColor: "var(--success-bg)",
                          color: "var(--success-text)",
                          border: "1px solid var(--success-border)"
                        } : {
                          backgroundColor: scheme.accent,
                          color: scheme.accentText,
                          border: `1px solid ${scheme.accent}`
                        },
                        children: isPaused ? "▶️ Resume Timer" : "⏸️ Pause Timer"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs", style: { color: scheme.mutedText }, children: [
                      "⏯️ ",
                      pausesRemaining,
                      " pause",
                      pausesRemaining === 1 ? "" : "s",
                      " ",
                      "left"
                    ] })
                  ] }),
                  formulaSheetEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-end gap-2", children: [
                    canShowMathFormulas && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowMathFormulas(true),
                        className: "rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition",
                        "data-role": "secondary",
                        style: {
                          color: scheme.accentText,
                          borderColor: scheme.accent
                        },
                        children: "📐 Formula Sheet"
                      }
                    ),
                    canShowScienceFormulas && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowScienceFormulas(true),
                        className: "rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition",
                        "data-role": "secondary",
                        style: {
                          color: "var(--danger-text)",
                          borderColor: "var(--danger-border)"
                        },
                        children: "🧪 Science Formulas"
                      }
                    ),
                    (quizConfig == null ? void 0 : quizConfig.calculator) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowCalculator(true),
                        className: "rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition",
                        "data-role": "secondary",
                        style: {
                          color: scheme.accentText,
                          borderColor: scheme.accent
                        },
                        children: "🧮 Calculator"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setZenMode((prev) => !prev),
                        className: "rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition",
                        "data-role": "secondary",
                        style: {
                          color: zenMode ? scheme.accent : scheme.text,
                          borderColor: scheme.accent,
                          backgroundColor: zenMode ? `${scheme.accent}22` : "transparent"
                        },
                        title: zenMode ? "Exit Zen Mode" : "Zen Mode: Hide distractions",
                        children: zenMode ? "👁️ Exit Zen" : "🧘 Zen Mode"
                      }
                    )
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: article || hasPassage ? "ged-split-view" : "",
              style: {
                backgroundColor: zenMode ? "#1a1a1a" : "transparent",
                borderRadius: zenMode ? "1rem" : "0",
                padding: zenMode ? "2rem" : "0",
                transition: "all 0.3s ease"
              },
              children: [
                (article || hasPassage) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "passage-pane mb-6 lg:mb-0",
                    style: {
                      backgroundColor: scheme.surfaceStrong,
                      border: `1px solid ${scheme.surfaceBorder}`,
                      borderRadius: "0.75rem",
                      padding: "1rem"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between lg:hidden", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "h3",
                          {
                            className: "text-lg font-semibold",
                            style: { color: scheme.text },
                            children: article ? "Reading Passage" : "Passage"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setShowArticle((prev) => !prev),
                            className: "inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm font-semibold transition-colors",
                            style: {
                              color: scheme.accentText,
                              backgroundColor: scheme.accent,
                              border: `1px solid ${scheme.accent}`
                            },
                            children: showArticle ? "Hide Passage" : "Show Passage"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: showArticle ? "block" : "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-3 text-sm leading-relaxed", children: article ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        article.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "h4",
                          {
                            className: "text-base font-bold",
                            style: { color: scheme.text },
                            dangerouslySetInnerHTML: {
                              __html: sanitizeHtmlContent(article.title, {
                                normalizeSpacing: true
                              })
                            }
                          }
                        ),
                        (article.imageUrl || articleImage) && (() => {
                          const rawImg = article.imageUrl || articleImage;
                          const imgSrc = resolveAssetUrl(rawImg);
                          return imgSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: imgSrc,
                              alt: article.imageAlt || article.title || "Reading passage illustration",
                              className: "max-h-40 w-full rounded-lg object-cover",
                              style: {
                                border: "1px solid var(--border-subtle)"
                              }
                            }
                          ) : null;
                        })(),
                        (article.text || []).map((paragraph, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-sm",
                            style: { color: scheme.text },
                            dangerouslySetInnerHTML: {
                              __html: sanitizeHtmlContent(paragraph, {
                                normalizeSpacing: true
                              })
                            }
                          },
                          index
                        ))
                      ] }) : hasPassage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          dangerouslySetInnerHTML: {
                            __html: sanitizeHtmlContent(passageContent, {
                              normalizeSpacing: true
                            })
                          },
                          style: { color: scheme.text }
                        }
                      ) : null }) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "question-pane", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex flex-wrap gap-2 quiz-nav", children: questions.map((_, i) => {
                    const isActive = i === currentIndex;
                    const isAnswered = Boolean(answers[i]);
                    const navStyle = isActive ? {
                      backgroundColor: scheme.background,
                      color: scheme.onBackgroundText
                    } : isAnswered ? {
                      backgroundColor: scheme.navAnsweredBg,
                      color: scheme.navAnsweredText
                    } : {
                      backgroundColor: scheme.navDefaultBg,
                      color: scheme.navDefaultText
                    };
                    if (marked[i]) {
                      navStyle.boxShadow = `0 0 0 2px ${scheme.navMarkedRing}`;
                    }
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => setCurrentIndex(i),
                        className: "h-8 w-8 rounded-full text-sm font-bold transition",
                        style: navStyle,
                        children: i + 1
                      },
                      i
                    );
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "question-container rounded-xl p-4 sm:p-6 shadow-inner",
                      "data-subject": quizSubject,
                      style: {
                        border: `1px solid ${scheme.surfaceBorder}`,
                        backgroundColor: scheme.surfaceStrong || scheme.surface
                      },
                      children: [
                        currentQ.clusterLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "mb-3 rounded-md border px-3 py-2 text-sm",
                            style: {
                              borderColor: scheme.surfaceBorder,
                              backgroundColor: scheme.surface,
                              color: scheme.mutedText
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "font-semibold",
                                  style: { color: scheme.text },
                                  children: "Scenario:"
                                }
                              ),
                              " ",
                              currentQ.clusterLabel
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: "text-xl font-semibold leading-relaxed",
                              style: { color: scheme.text },
                              children: [
                                currentIndex + 1,
                                "."
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Stem, { item: currentQ })
                        ] }) }),
                        (() => {
                          var _a2;
                          const rawImgSrc = !((_a2 = currentQ.stimulusImage) == null ? void 0 : _a2.src) && currentQ.imageUrl ? currentQ.imageUrl : null;
                          const imgSrc = resolveAssetUrl(rawImgSrc);
                          return imgSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: imgSrc,
                              alt: `Visual for question ${currentQ.questionNumber}`,
                              className: "my-4 h-auto max-w-full rounded-md",
                              style: { border: `1px solid ${scheme.surfaceBorder}` },
                              onError: (e) => {
                                if (e.target.dataset.fallbackApplied) {
                                  e.target.style.display = "none";
                                  return;
                                }
                                e.target.dataset.fallbackApplied = "1";
                                const src = e.target.getAttribute("src") || "";
                                const origin = typeof window !== "undefined" && window.location && window.location.origin || "";
                                const idx = src.indexOf("/Images/");
                                if (idx !== -1) {
                                  const rel = src.substring(idx).replace("/Images/", "/frontend/Images/");
                                  e.target.src = origin + rel;
                                } else {
                                  e.target.style.display = "none";
                                }
                              }
                            }
                          ) : null;
                        })(),
                        GEOMETRY_FIGURES_ENABLED && currentQ.geometrySpec && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "my-4 mx-auto max-w-md rounded-md p-4 shadow-sm bg-white text-black dark:bg-slate-900 dark:text-slate-100",
                            style: { border: `1px solid ${scheme.surfaceBorder}` },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              GeometryFigure,
                              {
                                spec: currentQ.geometrySpec,
                                className: "w-full h-auto"
                              }
                            )
                          }
                        ),
                        TOOL_PANEL_ENABLED && needsToolPanel && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            id: "interactive-tool-panel",
                            ref: toolPanelRef,
                            className: "quiz-tool-panel my-4 rounded-lg",
                            role: "region",
                            "aria-label": "Interactive math tool",
                            style: {
                              backgroundColor: scheme.surface,
                              border: `1px dashed ${scheme.surfaceBorder}`,
                              padding: "0.75rem"
                            }
                          }
                        ),
                        isShortResponse ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "short-response-answer",
                              className: "mb-1 block text-sm font-medium",
                              style: { color: scheme.mutedText },
                              children: "Enter a short constructed response (2–4 sentences):"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "textarea",
                            {
                              id: "short-response-answer",
                              value: answers[currentIndex] || "",
                              onChange: handleInputChange,
                              rows: 5,
                              className: "w-full rounded-lg p-3 text-base leading-relaxed focus:outline-none",
                              style: {
                                border: `1px solid ${scheme.inputBorder}`,
                                color: scheme.text,
                                backgroundColor: scheme.surface,
                                resize: "vertical"
                              },
                              placeholder: "Type your response and reference the passage or data when possible."
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "mt-2 text-xs",
                              style: { color: scheme.mutedText },
                              children: "These items are scored manually. Focus on evidence and clear reasoning."
                            }
                          ),
                          (() => {
                            const rubricHints = Array.isArray(currentQ.expectedFeatures) ? currentQ.expectedFeatures : Array.isArray(currentQ.rubricHints) ? currentQ.rubricHints : [];
                            const sampleAnswer = typeof currentQ.sampleAnswer === "string" ? currentQ.sampleAnswer.trim() : "";
                            if (!rubricHints.length && !sampleAnswer) return null;
                            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "mt-4 rounded-lg border p-3 text-sm",
                                style: {
                                  borderColor: scheme.surfaceBorder,
                                  backgroundColor: scheme.surface
                                },
                                children: [
                                  rubricHints.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "p",
                                      {
                                        className: "font-semibold",
                                        style: { color: scheme.text },
                                        children: "Rubric checklist"
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 list-disc pl-5 space-y-1", children: rubricHints.map((hint, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "li",
                                      {
                                        className: "text-xs",
                                        style: { color: scheme.mutedText },
                                        children: hint
                                      },
                                      idx
                                    )) })
                                  ] }),
                                  sampleAnswer && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "details",
                                    {
                                      className: "mt-3 text-xs",
                                      style: { color: scheme.mutedText },
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer font-semibold", children: "View sample answer" }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "p",
                                          {
                                            className: "mt-2 leading-relaxed",
                                            style: { color: scheme.text },
                                            children: sampleAnswer
                                          }
                                        )
                                      ]
                                    }
                                  )
                                ]
                              }
                            );
                          })()
                        ] }) : isFillInTheBlank || isNumericEntry ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "fill-in-blank-answer",
                              className: "mb-1 block text-sm font-medium",
                              style: { color: scheme.mutedText },
                              children: isNumericEntry ? "Enter your numeric answer:" : "Enter your answer:"
                            }
                          ),
                          (isNumericEntry || /science|math/i.test(subject || (quiz == null ? void 0 : quiz.subject) || "") && !Array.isArray(currentQ.answerOptions) && !((_a = currentQ.answerOptions) == null ? void 0 : _a.length)) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "mb-2 text-xs",
                              style: {
                                color: "var(--warning-text)",
                                backgroundColor: "var(--warning-bg)",
                                padding: "0.5rem",
                                borderRadius: "0.375rem",
                                border: "1px solid var(--warning-border)"
                              },
                              children: "⚠️ Numeric answers only. Enter numbers, decimals, or fractions (e.g., 42, 3.14, 1/2, 25%)."
                            }
                          ),
                          /math/i.test(subject || (quiz == null ? void 0 : quiz.subject) || "") ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            MathInputWithPad,
                            {
                              value: answers[currentIndex] || "",
                              onChange: (newValue) => {
                                const newAnswers = [...answers];
                                newAnswers[currentIndex] = newValue;
                                setAnswers(newAnswers);
                              },
                              placeholder: isNumericEntry ? "Enter a number (e.g., 3.5 or 3/4)" : "Type your answer here",
                              disabled: false
                            }
                          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "fill-in-blank-answer",
                              type: isNumericEntry ? "text" : "text",
                              inputMode: isNumericEntry ? "decimal" : "text",
                              value: answers[currentIndex] || "",
                              onChange: handleInputChange,
                              onKeyDown: (e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  if (currentIndex === questions.length - 1) {
                                    handleSubmit();
                                  } else {
                                    setCurrentIndex(
                                      (p) => Math.min(questions.length - 1, p + 1)
                                    );
                                  }
                                }
                              },
                              placeholder: isNumericEntry ? "Enter a number (e.g., 3.5 or 3/4)" : "Type your answer here",
                              className: "w-full max-w-sm rounded-lg p-3 focus:outline-none",
                              style: {
                                border: `1px solid ${scheme.inputBorder}`,
                                color: scheme.text
                              }
                            }
                          )
                        ] }) : currentQ.itemType === "inline_dropdown" && currentQ.passageWithPlaceholders ? (
                          // RLA Part 3: Inline Dropdown (Cloze) passage
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "mb-4 text-sm font-medium",
                                style: { color: scheme.mutedText },
                                children: "Select the best option for each dropdown to complete the passage correctly."
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              InlineDropdownPassage,
                              {
                                passageText: currentQ.passageWithPlaceholders,
                                questions: questions.filter(
                                  (q) => q.itemType === "inline_dropdown" && q.passage === currentQ.passage
                                ),
                                answers,
                                onAnswerChange: (index, value) => {
                                  const newAnswers = [...answers];
                                  newAnswers[index] = value;
                                  setAnswers(newAnswers);
                                }
                              }
                            )
                          ] })
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                          isMultipleSelect && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "mb-3 text-sm font-medium px-3 py-2 rounded-lg",
                              style: {
                                color: scheme.accentText,
                                backgroundColor: scheme.accentSoft,
                                border: `1px solid ${scheme.accentBorder}`
                              },
                              children: "ℹ️ Select ALL correct answers. Multiple answers may be correct."
                            }
                          ),
                          (currentQ.answerOptions || []).map((opt, i) => {
                            const optText = typeof opt === "string" ? opt : (opt == null ? void 0 : opt.text) || "";
                            const cleanedOptionText = typeof optText === "string" ? optText.trim().replace(/^\$\$/, "$") : "";
                            const isSelected = selectedOptions.includes(optText);
                            const optionStyles = {};
                            if (isSelected) {
                              optionStyles.backgroundColor = scheme.optionSelectedBg;
                              optionStyles.borderColor = scheme.optionSelectedBorder;
                              optionStyles.color = scheme.accentText;
                            }
                            const optionClassNames = [
                              "option",
                              "answer-option",
                              "w-full",
                              "text-left",
                              "transition",
                              isMultipleSelect ? "multiple-select" : ""
                            ];
                            if (isSelected) {
                              optionClassNames.push("selected");
                            }
                            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "button",
                              {
                                onClick: () => handleSelect(optText),
                                className: optionClassNames.join(" "),
                                style: optionStyles,
                                children: [
                                  isMultipleSelect && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: "mr-2 text-lg",
                                      style: {
                                        color: isSelected ? scheme.accent : scheme.mutedText
                                      },
                                      children: isSelected ? "☑" : "☐"
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "span",
                                    {
                                      className: "flex-grow text-left",
                                      style: { color: scheme.text },
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mr-2 font-bold", children: [
                                          String.fromCharCode(65 + i),
                                          "."
                                        ] }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "span",
                                          {
                                            className: "question-stem",
                                            dangerouslySetInnerHTML: renderQuestionTextForDisplay(
                                              cleanedOptionText,
                                              currentQ.isPremade === true,
                                              currentQ
                                            )
                                          }
                                        )
                                      ]
                                    }
                                  )
                                ]
                              },
                              i
                            );
                          })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "confidence-toggle mt-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => handleConfidenceSelect("sure"),
                        className: `confidence-btn sure ${confidence[currentIndex] === "sure" ? "active" : ""}`,
                        children: "✓ I'm Sure"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => handleConfidenceSelect("guessing"),
                        className: `confidence-btn guessing ${confidence[currentIndex] === "guessing" ? "active" : ""}`,
                        children: "? I'm Guessing"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => setCurrentIndex((p) => Math.max(0, p - 1)),
                        disabled: currentIndex === 0,
                        className: "rounded-md px-4 py-2 font-semibold transition",
                        "data-role": "secondary",
                        style: {
                          borderColor: scheme.surfaceBorder,
                          color: scheme.mutedText,
                          opacity: currentIndex === 0 ? 0.6 : 1
                        },
                        children: "Previous"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        onClick: () => setMarked((m) => {
                          const newM = [...m];
                          newM[currentIndex] = !newM[currentIndex];
                          return newM;
                        }),
                        className: "rounded-md px-4 py-2 font-semibold transition",
                        style: marked[currentIndex] ? {
                          backgroundColor: scheme.navMarkedRing,
                          color: scheme.onBackgroundText,
                          border: `1px solid ${scheme.navMarkedRing}`
                        } : {
                          backgroundColor: scheme.navDefaultBg,
                          color: scheme.navDefaultText,
                          border: `1px solid ${scheme.navDefaultBg}`
                        },
                        children: [
                          marked[currentIndex] ? "Unmark" : "Mark",
                          " for Review"
                        ]
                      }
                    ),
                    currentIndex === questions.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: handleSubmit,
                        className: "rounded-md px-4 py-2 font-semibold",
                        "data-role": "primary",
                        style: {
                          backgroundColor: scheme.accent,
                          color: scheme.accentText,
                          borderColor: scheme.accent
                        },
                        children: buttonText || "Finish"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => setCurrentIndex(
                          (p) => Math.min(questions.length - 1, p + 1)
                        ),
                        className: "rounded-md px-4 py-2 font-semibold",
                        "data-role": "primary",
                        style: {
                          backgroundColor: scheme.accent,
                          color: scheme.accentText,
                          borderColor: scheme.accent
                        },
                        children: "Next"
                      }
                    )
                  ] })
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
if (typeof window !== "undefined") {
  window.Components = window.Components || {};
  window.Components.QuizInterface = QuizInterface;
}
export {
  QuizInterface
};
//# sourceMappingURL=QuizInterface-Bed0VNFD.js.map
