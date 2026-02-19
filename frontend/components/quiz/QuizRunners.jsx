/**
 * QuizRunners.jsx
 * Quiz execution components for different quiz types
 */

// Re-export QuizRunner as the main entry point
function QuizRunner({ quiz, onComplete, onExit }) {
  console.log('QuizRunner received quiz:', quiz);
  if (!quiz) return <div className="text-center p-8">Loading quiz...</div>;

  switch (quiz.type) {
    case 'multi-part-math':
      return (
        <MultiPartMathRunner
          quiz={quiz}
          onComplete={onComplete}
          onExit={onExit}
        />
      );
    case 'multi-part-rla':
      return (
        <MultiPartRlaRunner
          quiz={quiz}
          onComplete={onComplete}
          onExit={onExit}
        />
      );
    default:
      return (
        <StandardQuizRunner
          quiz={quiz}
          onComplete={onComplete}
          onExit={onExit}
        />
      );
  }
}

// Standard quiz runner for single-part quizzes
function StandardQuizRunner({ quiz, onComplete, onExit }) {
  const questions = quiz.questions || [];
  const [answers, setAnswers] = React.useState(
    Array(questions.length).fill(null)
  );

  // Math Answer Normalization & Equivalence Helpers
  const MATH_EQUIV = {
    EPS: 1e-9,
    PERCENT_RE: /^[-+]?\d+(?:\.\d+)?%$/,
    CURRENCY_RE: /^\$\s*[-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?$/,
    FRACTION_RE: /^[-+]?\d+\s*\/\s*\d+$/,
    MIXED_RE: /^[-+]?\d+\s+\d+\s*\/\s*\d+$/,
    RATIO_RE: /^[-+]?\d+\s*:\s*[-+]?\d+$/,
    MULTI_SPLIT_RE: /\s*,\s*/,
  };

  const normalizeRaw = (val) => {
    if (val === null || val === undefined) return '';
    return String(val)
      .replace(/\u00A0/g, ' ')
      .replace(/\s+/g, ' ')
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
    return whole >= 0 ? whole + frac : whole - frac;
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
    const plain = s.replace(/,/g, '');
    const num = Number(plain);
    return Number.isFinite(num) ? num : null;
  };

  const canonicalTokens = (raw) => {
    const s = normalizeRaw(raw);
    if (!s) return [];
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
    if (e === u) return true;
    if (isNumericEqual(e, u)) return true;
    if (e.includes(',') || u.includes(',')) {
      return areTokenSetsEqual(canonicalTokens(e), canonicalTokens(u));
    }
    return false;
  };

  const checkNumericQuestionCorrect = (q, userAns) => {
    if (!q.correctAnswer || !userAns) return false;
    const correctVal = numericValue(q.correctAnswer);
    const userVal = numericValue(userAns);
    if (correctVal === null || userVal === null) return false;
    const tolerance =
      typeof q.tolerance === 'number' && q.tolerance >= 0 ? q.tolerance : 0;
    return Math.abs(userVal - correctVal) <= tolerance;
  };

  /**
   * Grade a graphPlot question. Compares student-plotted points/lines
   * against expectedAnswer using configurable tolerance.
   * Returns a fractional score (0..1) to support partial credit.
   */
  const gradeGraphPlotQuestion = (q, userAns) => {
    if (!userAns || typeof userAns !== 'object') return 0;
    const expected = q.expectedAnswer;
    if (!expected) return 0;

    let matched = 0;
    let total = 0;

    // Grade expected points
    const pointTolerance = typeof q.tolerance === 'number' ? q.tolerance : 0.5;
    if (Array.isArray(expected.points)) {
      total += expected.points.length;
      const userPoints = Array.isArray(userAns.points)
        ? [...userAns.points]
        : [];
      for (const ep of expected.points) {
        const matchIdx = userPoints.findIndex(
          (up) =>
            Math.abs(up.x - ep.x) <= pointTolerance &&
            Math.abs(up.y - ep.y) <= pointTolerance
        );
        if (matchIdx !== -1) {
          matched++;
          userPoints.splice(matchIdx, 1); // consume so it can't double-match
        }
      }
    }

    // Grade expected lines (slope/intercept tolerance)
    const slopeTolerance =
      typeof q.slopeTolerance === 'number' ? q.slopeTolerance : 0.15;
    const interceptTolerance =
      typeof q.interceptTolerance === 'number' ? q.interceptTolerance : 0.5;
    if (Array.isArray(expected.lines)) {
      total += expected.lines.length;
      const userLines = Array.isArray(userAns.lines) ? [...userAns.lines] : [];
      for (const el of expected.lines) {
        const matchIdx = userLines.findIndex((ul) => {
          // Handle vertical lines
          if (el.verticalX != null) {
            return (
              ul.verticalX != null &&
              Math.abs(ul.verticalX - el.verticalX) <= interceptTolerance
            );
          }
          return (
            Math.abs((ul.slope ?? 0) - (el.slope ?? 0)) <= slopeTolerance &&
            Math.abs((ul.intercept ?? 0) - (el.intercept ?? 0)) <=
              interceptTolerance
          );
        });
        if (matchIdx !== -1) {
          matched++;
          userLines.splice(matchIdx, 1);
        }
      }
    }

    return total > 0 ? matched / total : 0;
  };

  const handleComplete = (result) => {
    const normalizeText = (val) => (val ?? '').toString().trim().toLowerCase();

    let earnedPoints = 0;
    let possiblePoints = 0;
    const manualShortResponseIndexes = [];

    (quiz.questions || []).forEach((q, idx) => {
      if (window.isShortResponseQuestion(q)) {
        manualShortResponseIndexes.push(idx);
        return;
      }
      const pts = typeof q.points === 'number' && q.points > 0 ? q.points : 1;
      possiblePoints += pts;
      const userAns = result.answers[idx];
      let isCorrect = false;

      // Graph Plot answer type — compare plotted objects to expected
      if (q.answerType === 'graphPlot') {
        const graphScore = gradeGraphPlotQuestion(q, userAns);
        // Full credit requires matching all expected objects
        isCorrect = graphScore >= 1.0;
        if (isCorrect) earnedPoints += pts;
        return;
      }

      if (q.type === 'numeric' || q.responseType === 'numeric') {
        isCorrect = checkNumericQuestionCorrect(q, userAns);
      } else if (Array.isArray(q.answerOptions) && q.answerOptions.length > 0) {
        const correctOpts = q.answerOptions.filter((o) => o && o.isCorrect);
        if (correctOpts.length === 1) {
          const correctText = correctOpts[0].text;
          isCorrect = window.compareAnswers(correctText, userAns, {
            subject: quiz.subject,
            questionType: q.type,
          });
        } else if (correctOpts.length > 1) {
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
        isCorrect = window.compareAnswers(q.correctAnswer, userAns, {
          subject: quiz.subject,
          questionType: q.type,
        });
      }

      if (isCorrect) earnedPoints += pts;
    });

    const percentage =
      possiblePoints > 0 ? (earnedPoints / possiblePoints) * 100 : 0;

    let scaledScore;
    if (percentage <= 40) {
      scaledScore = 100 + (percentage / 40) * 35;
    } else if (percentage <= 65) {
      scaledScore = 135 + ((percentage - 40) / 25) * 10;
    } else {
      scaledScore = 145 + ((percentage - 65) / 35) * 55;
    }
    scaledScore = Math.round(scaledScore);
    const passed = scaledScore >= 145;

    onComplete({
      score: earnedPoints,
      totalQuestions: possiblePoints,
      percentage,
      scaledScore,
      passed,
      subject: quiz.subject,
      answers: result.answers,
      marked: result.marked,
      confidence: result.confidence,
      manualShortResponseIndexes,
      quiz,
    });
  };

  return (
    <window.QuizInterface
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

// Multi-part math quiz runner (non-calculator + calculator sections)
function MultiPartMathRunner({ quiz, onComplete, onExit }) {
  const [part, setPart] = React.useState(1);
  const [part1Result, setPart1Result] = React.useState(null);

  const part1Questions = quiz.questions.slice(0, 5);
  const part2Questions = quiz.questions.slice(5);

  const [part1Answers, setPart1Answers] = React.useState(
    Array(part1Questions.length).fill(null)
  );
  const [part2Answers, setPart2Answers] = React.useState(
    Array(part2Questions.length).fill(null)
  );

  const handlePart1Complete = (result) => {
    setPart1Result(result);
    setPart('interstitial');
  };

  const handlePart2Complete = (result) => {
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

    // Scoring logic
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

    const normalizeText = (val) => (val ?? '').toString().trim().toLowerCase();
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
        const correctOpts = q.answerOptions.filter((o) => o && o.isCorrect);
        if (correctOpts.length === 1) {
          const correctText = normalizeText(correctOpts[0].text);
          const userText = normalizeText(userAns);
          isCorrect = userText === correctText;
        } else if (correctOpts.length > 1) {
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
        const user = normalizeRaw(userAns);
        const correct = normalizeRaw(q.correctAnswer);
        if (user && correct) {
          isCorrect =
            user === correct ||
            isNumericEqual(user, correct) ||
            setsEqual(tokenize(user), tokenize(correct));
        }
      }

      if (isCorrect) earnedPoints += pts;
    });

    const percentage =
      possiblePoints > 0 ? (earnedPoints / possiblePoints) * 100 : 0;

    let scaledScore;
    if (percentage <= 40) {
      scaledScore = 100 + (percentage / 40) * 35;
    } else if (percentage <= 65) {
      scaledScore = 135 + ((percentage - 40) / 25) * 10;
    } else {
      scaledScore = 145 + ((percentage - 65) / 35) * 55;
    }
    scaledScore = Math.round(scaledScore);
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
      <window.QuizInterface
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
      <window.QuizInterface
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

// Multi-part RLA quiz runner (Reading + Essay + Language sections)
function MultiPartRlaRunner({ quiz, onComplete, onExit }) {
  // --- Guided Essay Mode: Template and Shadow Logic ---
  // Example template (should match your real template source)
  const essayTemplates = {
    introduction:
      "The two passages present conflicting views on the topic of [topic of both articles]. In the first passage, [Author 1's Last Name] argues that [explain Author 1's main claim]. Conversely, in the second passage, [Author 2's Last Name] claims that [explain Author 2's main claim]. After analyzing both arguments, it is clear that [Author's Last Name] presents the more convincing case by effectively using [list key evidence types].",
    body1:
      "[Author 1's Last Name] supports their position by providing [describe evidence type 1] and [describe evidence type 2]. For example, [summarize key evidence]. This strengthens the argument by [explain why evidence is strong].",
    body2:
      "[Author 2's Last Name] attempts to counter with [describe evidence type or claim], but this is less convincing because [explain weakness]. For instance, [summarize opposing evidence].",
    conclusion:
      "In conclusion, [Author 1's Last Name] makes a more persuasive case by using [restate evidence types], while [Author 2's Last Name] relies on weaker support. This demonstrates that [Author 1's Last Name]'s position is better supported.",
  };

  // Helper: Fill template placeholders with prompt/article data
  function fillEssayTemplate(template, data) {
    if (!template || !data) return '';
    return template.replace(/\[(.+?)\]/g, (_, key) => {
      // Map keys to data fields
      const map = {
        'topic of both articles': data.topic,
        "Author 1's Last Name": data.author1Last,
        "Author 2's Last Name": data.author2Last,
        "explain Author 1's main claim": data.author1Claim,
        "explain Author 2's main claim": data.author2Claim,
        'list key evidence types': data.evidenceTypes,
        'describe evidence type 1': data.author1Evidence1,
        'describe evidence type 2': data.author1Evidence2,
        'summarize key evidence': data.author1EvidenceSummary,
        'explain why evidence is strong': data.author1EvidenceStrength,
        'describe evidence type or claim': data.author2EvidenceType,
        'explain weakness': data.author2Weakness,
        'summarize opposing evidence': data.author2EvidenceSummary,
        'restate evidence types': data.evidenceTypes,
      };
      return map[key] || `[${key}]`;
    });
  }

  // Extract prompt/article data for template filling
  function getEssayTemplateData() {
    const passages = Array.isArray(quiz.part2_essay.passages)
      ? quiz.part2_essay.passages
      : [];
    const p1 = passages[0] || {};
    const p2 = passages[1] || {};
    // Fallbacks for missing fields
    return {
      topic: quiz.part2_essay.topic || quiz.part2_essay.prompt || '',
      author1Last: (p1.author || '').split(' ').slice(-1)[0] || '',
      author2Last: (p2.author || '').split(' ').slice(-1)[0] || '',
      author1Claim: p1.claim || '',
      author2Claim: p2.claim || '',
      evidenceTypes: quiz.part2_essay.evidenceTypes || '',
      author1Evidence1: p1.evidence1 || '',
      author1Evidence2: p1.evidence2 || '',
      author1EvidenceSummary: p1.evidenceSummary || '',
      author1EvidenceStrength: p1.evidenceStrength || '',
      author2EvidenceType: p2.evidenceType || '',
      author2Weakness: p2.weakness || '',
      author2EvidenceSummary: p2.evidenceSummary || '',
    };
  }

  // Build shadow essay paragraphs
  const shadowEssayData = getEssayTemplateData();
  const shadowEssay = {
    introduction: fillEssayTemplate(
      essayTemplates.introduction,
      shadowEssayData
    ),
    body1: fillEssayTemplate(essayTemplates.body1, shadowEssayData),
    body2: fillEssayTemplate(essayTemplates.body2, shadowEssayData),
    conclusion: fillEssayTemplate(essayTemplates.conclusion, shadowEssayData),
  };

  // Shadow overlay style
  const getShadowStyle = () => {
    const isDark =
      document.documentElement.classList.contains('dark') ||
      document.body.classList.contains('dark');
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
      fontSize: '1rem',
      lineHeight: '1.5',
      padding: '0.5rem',
      whiteSpace: 'pre-wrap',
      zIndex: 1,
      userSelect: 'none',
    };
  };
  const [currentPart, setCurrentPart] = React.useState(1);
  // Guided Essay Mode state
  const [essayMode, setEssayMode] = React.useState('standard'); // 'standard' | 'guided'
  const [isPaused, setIsPaused] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [pausesRemaining, setPausesRemaining] = React.useState(2);
  const [showBreak, setShowBreak] = React.useState(false);

  const PART_TIMES = { 1: 35 * 60, 2: 45 * 60, 3: 70 * 60 };

  const [part1Answers, setPart1Answers] = React.useState(
    Array(quiz.part1_reading.length).fill(null)
  );
  const [part3Answers, setPart3Answers] = React.useState(
    Array(quiz.part3_language.length).fill(null)
  );
  const [essayText, setEssayText] = React.useState('');
  const [isScoring, setIsScoring] = React.useState(false);
  const [essayScore, setEssayScore] = React.useState(null);
  const [part1Result, setPart1Result] = React.useState(null);

  React.useEffect(() => {
    setTimeLeft(PART_TIMES[currentPart]);
    setIsPaused(false);
    setPausesRemaining(2);
  }, [currentPart]);

  React.useEffect(() => {
    if (isPaused || timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timerId);
  }, [isPaused, timeLeft]);

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

  const formatTime = (seconds) =>
    `${Math.floor(Math.max(0, seconds) / 60)}:${(Math.max(0, seconds) % 60)
      .toString()
      .padStart(2, '0')}`;

  const handlePart1Complete = (result) => {
    setPart1Result(result);
    setShowBreak(true);
  };

  const handlePart2Complete = async () => {
    if (isScoring) return;
    const result = await handleScoreEssay();
    if (!result) return;
    setShowBreak(true);
  };

  const handleContinueFromBreak = () => {
    setShowBreak(false);
    setCurrentPart((prev) => prev + 1);
  };

  const handleFinalSubmit = (part3Result) => {
    const part1Questions = quiz.part1_reading || [];
    const part3Questions = quiz.part3_language || [];

    const part1Data = part1Result || {
      answers: part1Answers,
      marked: Array(part1Questions.length).fill(false),
      confidence: Array(part1Questions.length).fill(null),
    };

    const part3Data = part3Result || {
      answers: part3Answers,
      marked: Array(part3Questions.length).fill(false),
      confidence: Array(part3Questions.length).fill(null),
    };

    const combinedAnswers = [
      ...(part1Data.answers || part1Answers),
      ...(part3Data.answers || part3Answers),
    ];
    const combinedMarked = [
      ...(part1Data.marked || Array(part1Questions.length).fill(false)),
      ...(part3Data.marked || Array(part3Questions.length).fill(false)),
    ];
    const combinedConfidence = [
      ...(part1Data.confidence || Array(part1Questions.length).fill(null)),
      ...(part3Data.confidence || Array(part3Questions.length).fill(null)),
    ];

    const part1Correct = part1Questions.reduce((count, question, index) => {
      const correctOpt = window.findCorrectOption(question.answerOptions);
      return (
        count +
        (correctOpt && correctOpt.text === (part1Data.answers?.[index] ?? null)
          ? 1
          : 0)
      );
    }, 0);

    const part3Correct = part3Questions.reduce((count, question, index) => {
      const correctOpt = window.findCorrectOption(question.answerOptions);
      return (
        count +
        (correctOpt && correctOpt.text === (part3Data.answers?.[index] ?? null)
          ? 1
          : 0)
      );
    }, 0);

    const score = part1Correct + part3Correct;
    const totalQuestions = part1Questions.length + part3Questions.length;

    const essayOverallScore =
      typeof essayScore?.overallScore === 'number'
        ? essayScore.overallScore
        : null;
    const essayPercentage =
      essayOverallScore !== null ? (essayOverallScore / 6) * 100 : 0;

    const part1Weight = 0.42;
    const part3Weight = 0.38;
    const essayWeight = 0.2;

    const part1Percentage =
      part1Questions.length > 0
        ? (part1Correct / part1Questions.length) * 100
        : 0;
    const part3Percentage =
      part3Questions.length > 0
        ? (part3Correct / part3Questions.length) * 100
        : 0;

    const finalPercentage =
      part1Percentage * part1Weight +
      part3Percentage * part3Weight +
      essayPercentage * essayWeight;

    const scaledScore = Math.round(
      finalPercentage < 65
        ? 100 + (finalPercentage / 65) * 44
        : 145 + ((finalPercentage - 65) / 35) * 55
    );

    const combinedQuestions = [...part1Questions, ...part3Questions];
    const normalizedQuiz = { ...quiz, questions: combinedQuestions };

    onComplete({
      score,
      totalQuestions,
      scaledScore,
      subject: quiz.subject,
      answers: combinedAnswers,
      marked: combinedMarked,
      confidence: combinedConfidence,
      essayScore,
      multipleChoicePercentage:
        totalQuestions > 0 ? (score / totalQuestions) * 100 : 0,
      essayPercentage,
      finalPercentage,
      quiz: normalizedQuiz,
    });
  };

  const handleScoreEssay = async () => {
    if (!essayText.trim()) {
      alert('Please write an essay before continuing.');
      return null;
    }
    if (isScoring) return essayScore;

    setIsScoring(true);
    try {
      const token =
        (typeof localStorage !== 'undefined' &&
          localStorage.getItem('appToken')) ||
        null;
      const primaryUrl = `${window.API_BASE_URL}/api/essay/score`;
      const fallbackUrl = `${window.API_BASE_URL}/score-essay`;
      const response = await fetch(primaryUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ essayText, completion: '5/5' }),
      });
      let result = null;
      if (response.ok) {
        result = await response.json();
      } else if (response.status === 401 || response.status === 403) {
        const fallbackResponse = await fetch(fallbackUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ essayText, completion: '5/5' }),
        });
        if (!fallbackResponse.ok) {
          throw new Error('Failed to score essay.');
        }
        result = await fallbackResponse.json();
      } else {
        throw new Error('Failed to score essay.');
      }

      let parsedScore = null;
      if (
        result &&
        result.trait1 &&
        result.trait2 &&
        result.trait3 &&
        typeof result.overallScore === 'number'
      ) {
        parsedScore = result;
      } else if (
        result &&
        result.candidates &&
        result.candidates[0]?.content?.parts?.[0]?.text
      ) {
        let jsonText = result.candidates[0].content.parts[0].text
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();
        parsedScore = JSON.parse(jsonText);
      } else {
        throw new Error('Unexpected essay score format');
      }

      setEssayScore(parsedScore);
      return parsedScore;
    } catch (error) {
      console.error('Error scoring essay:', error);
      const errorResult = { error: 'Sorry, could not score your essay.' };
      setEssayScore(errorResult);
      alert(
        "We couldn't score your essay automatically, but you can continue to the final section."
      );
      return errorResult;
    } finally {
      setIsScoring(false);
    }
  };

  const renderCurrentPart = () => {
    switch (currentPart) {
      case 1:
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 subject-accent-heading">
              Part 1: Reading Comprehension
            </h3>
            <window.RlaReadingSplitView
              questions={quiz.part1_reading}
              answers={part1Answers}
              setAnswers={setPart1Answers}
              onComplete={handlePart1Complete}
              buttonText="Continue to Essay"
            />
          </div>
        );
      case 2:
        // Show mode selector before passages/prompts
        if (!essayMode) {
          return (
            <div className="essay-mode-selector-wrapper">
              <h3 className="text-2xl font-bold mb-6 subject-accent-heading">
                Select Essay Practice Mode
              </h3>
              <div className="mb-8 flex gap-4 justify-center">
                <button
                  type="button"
                  className={`px-6 py-3 rounded font-semibold text-lg transition-colors ${
                    essayMode === 'standard'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setEssayMode('standard')}
                >
                  Standard Essay Mode
                </button>
                <button
                  type="button"
                  className={`px-6 py-3 rounded font-semibold text-lg transition-colors ${
                    essayMode === 'guided'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setEssayMode('guided')}
                >
                  Guided Essay Mode
                </button>
              </div>
              <p className="text-center text-slate-600 dark:text-slate-300">
                Please select a mode to begin essay practice. Passages and
                prompts will appear after you choose.
              </p>
            </div>
          );
        }
        // ...existing code...
        return (
          <div className="essay-wrapper">
            <h3 className="text-2xl font-bold mb-4 subject-accent-heading">
              Part 2: Extended Response (Essay)
            </h3>
            <div className="flex flex-col lg:flex-row gap-4 essay-section">
              <div className="lg:w-1/2 space-y-4 max-h-[32rem] overflow-y-auto essay-passage-panel">
                {(Array.isArray(quiz.part2_essay.passages)
                  ? quiz.part2_essay.passages
                  : []
                )
                  .slice(0, 2)
                  .map((p, idx) => (
                    <div
                      key={idx}
                      className="prose passage-section max-w-none bg-slate-50 p-4 rounded-lg passage-card"
                    >
                      <h4 className="question-stem">
                        {p?.title || `Passage ${idx + 1}`}
                      </h4>
                      {p?.author ? (
                        <p className="text-xs text-slate-500 mb-2 essay-author">
                          by {p.author}
                        </p>
                      ) : null}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: window.sanitizeHtmlContent(p?.content || '', {
                            normalizeSpacing: true,
                          }),
                        }}
                      />
                    </div>
                  ))}
              </div>
              <div className="lg:w-1/2 flex flex-col essay-right-panel">
                <h4 className="font-bold mb-2 essay-prompt-title">
                  Essay Prompt:
                </h4>
                <p className="mb-2">{quiz.part2_essay.prompt}</p>
                {/* Guided Mode logic will go here next */}
                {/* Guided Mode: render shadow overlays per section */}
                {essayMode === 'guided' ? (
                  <div className="space-y-6">
                    {/* Introduction */}
                    <div style={{ position: 'relative' }}>
                      <textarea
                        className="w-full min-h-[6rem] p-2 border rounded essay-response-box"
                        value={essayText.introduction || ''}
                        onChange={(e) =>
                          setEssayText({
                            ...essayText,
                            introduction: e.target.value,
                          })
                        }
                        spellCheck="false"
                        placeholder="Write your introduction..."
                        style={{
                          position: 'relative',
                          background: 'transparent',
                          zIndex: 2,
                        }}
                      />
                      {/* Shadow essay overlay */}
                      <div style={getShadowStyle()} aria-hidden="true">
                        {!essayText.introduction ||
                        essayText.introduction.length < 2
                          ? shadowEssay.introduction
                          : ''}
                      </div>
                    </div>
                    {/* Body Paragraph 1 */}
                    <div style={{ position: 'relative' }}>
                      <textarea
                        className="w-full min-h-[6rem] p-2 border rounded essay-response-box"
                        value={essayText.body1 || ''}
                        onChange={(e) =>
                          setEssayText({ ...essayText, body1: e.target.value })
                        }
                        spellCheck="false"
                        placeholder="Body Paragraph 1..."
                        style={{
                          position: 'relative',
                          background: 'transparent',
                          zIndex: 2,
                        }}
                      />
                      <div style={getShadowStyle()} aria-hidden="true">
                        {!essayText.body1 || essayText.body1.length < 2
                          ? shadowEssay.body1
                          : ''}
                      </div>
                    </div>
                    {/* Body Paragraph 2 */}
                    <div style={{ position: 'relative' }}>
                      <textarea
                        className="w-full min-h-[6rem] p-2 border rounded essay-response-box"
                        value={essayText.body2 || ''}
                        onChange={(e) =>
                          setEssayText({ ...essayText, body2: e.target.value })
                        }
                        spellCheck="false"
                        placeholder="Body Paragraph 2..."
                        style={{
                          position: 'relative',
                          background: 'transparent',
                          zIndex: 2,
                        }}
                      />
                      <div style={getShadowStyle()} aria-hidden="true">
                        {!essayText.body2 || essayText.body2.length < 2
                          ? shadowEssay.body2
                          : ''}
                      </div>
                    </div>
                    {/* Conclusion */}
                    <div style={{ position: 'relative' }}>
                      <textarea
                        className="w-full min-h-[6rem] p-2 border rounded essay-response-box"
                        value={essayText.conclusion || ''}
                        onChange={(e) =>
                          setEssayText({
                            ...essayText,
                            conclusion: e.target.value,
                          })
                        }
                        spellCheck="false"
                        placeholder="Conclusion..."
                        style={{
                          position: 'relative',
                          background: 'transparent',
                          zIndex: 2,
                        }}
                      />
                      <div style={getShadowStyle()} aria-hidden="true">
                        {!essayText.conclusion ||
                        essayText.conclusion.length < 2
                          ? shadowEssay.conclusion
                          : ''}
                      </div>
                    </div>
                  </div>
                ) : (
                  <textarea
                    className="w-full min-h-[24rem] p-2 border rounded flex-1 essay-response-box"
                    value={essayText}
                    onChange={(e) => setEssayText(e.target.value)}
                    spellCheck="false"
                    onKeyDown={(e) => {
                      if (e.key === 'Tab') {
                        e.preventDefault();
                        const target = e.target;
                        const start = target.selectionStart;
                        const end = target.selectionEnd;
                        const value = target.value;
                        const insert = '    ';
                        const next =
                          value.slice(0, start) + insert + value.slice(end);
                        setEssayText(next);
                        setTimeout(() => {
                          try {
                            target.selectionStart = target.selectionEnd =
                              start + insert.length;
                          } catch {}
                        }, 0);
                      }
                    }}
                    placeholder="Type your essay response here..."
                  />
                )}
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handlePart2Complete}
                    disabled={isScoring}
                    className="px-6 py-2 bg-sky-600 text-white font-bold rounded-lg disabled:bg-slate-400 disabled:cursor-not-allowed"
                  >
                    {isScoring
                      ? 'Scoring Essay...'
                      : 'Continue to Final Section'}
                  </button>
                </div>
                {isScoring && (
                  <p className="mt-2 text-sm text-slate-500">
                    Scoring your essay with AI feedback. Please hold tight...
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Part 3: Language &amp; Grammar
            </h3>
            <window.QuizInterface
              questions={quiz.part3_language}
              answers={part3Answers}
              setAnswers={setPart3Answers}
              onComplete={handleFinalSubmit}
              quizTitle="Part 3: Language & Grammar"
              buttonText="Finish Exam"
              subject={quiz.subject}
              showTimer={false}
              quizConfig={quiz.config}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fade-in">
      {showBreak ? (
        <div className="max-w-2xl mx-auto mt-12 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-purple-700 dark:text-purple-400">
            Break Between Sections
          </h2>
          <p className="text-xl mb-6 text-slate-700 dark:text-slate-300">
            You are about to begin Part {currentPart + 1} of the RLA test.
          </p>
          <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <p className="text-lg font-semibold mb-2">
              {currentPart === 1
                ? 'Next: Extended Response (Essay)'
                : 'Next: Language & Grammar'}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {currentPart === 1
                ? 'You will analyze two passages and write an essay.'
                : 'You will answer language and grammar questions.'}
            </p>
          </div>
          <button
            onClick={handleContinueFromBreak}
            className="px-8 py-3 bg-purple-600 text-white font-bold text-lg rounded-lg hover:bg-purple-700 transition"
          >
            Continue to Part {currentPart + 1}
          </button>
        </div>
      ) : (
        <>
          <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 mb-4 border-b">
            <button
              onClick={onExit}
              className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600 font-semibold"
            >
              <window.ArrowLeftIcon /> Back
            </button>
            <h2 className="text-xl font-bold text-center text-slate-800 flex-1 exam-title">
              {quiz.title}
            </h2>
            <div className="flex flex-col sm:items-end gap-2">
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full font-mono text-lg font-semibold ${
                  timeLeft <= 60
                    ? 'bg-red-100 text-red-700'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <span role="img" aria-label="timer">
                  ⏱️
                </span>
                <span>{formatTime(timeLeft)}</span>
                {isPaused && (
                  <span className="text-xs uppercase tracking-wide">
                    Paused
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePauseToggle}
                  disabled={!isPaused && pausesRemaining === 0}
                  className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${
                    isPaused
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-sky-600 text-white hover:bg-sky-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed'
                  }`}
                >
                  {isPaused ? 'Resume Timer' : 'Pause Timer'}
                </button>
                <span className="text-xs text-slate-500">
                  {pausesRemaining} pause{pausesRemaining === 1 ? '' : 's'} left
                </span>
              </div>
            </div>
          </header>
          {isPaused ? (
            <div className="text-center p-12 bg-slate-100 rounded-lg">
              <h2 className="text-3xl font-bold">Exam Paused</h2>
              <button
                onClick={() => setIsPaused(false)}
                className="mt-4 px-8 py-3 bg-sky-600 text-white font-bold rounded-lg"
              >
                Resume
              </button>
            </div>
          ) : (
            renderCurrentPart()
          )}
        </>
      )}
    </div>
  );
}

// Export all runners
if (typeof window !== 'undefined') {
  window.QuizRunner = QuizRunner;
  window.StandardQuizRunner = StandardQuizRunner;
  window.MultiPartMathRunner = MultiPartMathRunner;
  window.MultiPartRlaRunner = MultiPartRlaRunner;
}

// Placeholder runners for subjects that use standard runner
function MultiPartScienceRunner(props) {
  return StandardQuizRunner(props);
}

function MultiPartSocialStudiesRunner(props) {
  return StandardQuizRunner(props);
}

function WorkforceInterviewRunner(props) {
  return StandardQuizRunner(props);
}

// Attach QuizRunner and internal runners to window for global access
if (typeof window !== 'undefined') {
  window.QuizRunners = window.QuizRunners || {};
  Object.assign(window.QuizRunners, {
    QuizRunner,
    MultiPartMathRunner,
    MultiPartRlaRunner,
    MultiPartScienceRunner,
    MultiPartSocialStudiesRunner,
    WorkforceInterviewRunner,
  });
}
