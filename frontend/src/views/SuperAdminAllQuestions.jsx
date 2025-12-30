import React, { useEffect, useState, useMemo } from 'react';
import { normalizeImageUrl } from '../../utils/normalizeImageUrl.js';

export default function SuperAdminAllQuestions() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filterType, setFilterType] = useState('all');
  const [error, setError] = useState('');

  const normalizeSubjectKey = (value) =>
    String(value || '')
      .toLowerCase()
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const stringLooksLikeHasImage = (value) => {
    if (typeof value !== 'string') return false;
    const s = value.toLowerCase();
    // Covers legacy passages that embed images directly via HTML
    if (s.includes('<img')) return true;
    // Covers common image paths and file extensions
    if (s.includes('/images/') || s.includes('images/')) return true;
    if (/(?:^|[^a-z])images\//i.test(value)) return true;
    if (/\.(png|jpe?g|gif|svg|webp)(\?|#|$)/i.test(value)) return true;
    return false;
  };

  const questionHasImage = (q) => {
    if (!q || typeof q !== 'object') return false;
    const content = q.content && typeof q.content === 'object' ? q.content : {};

    const direct =
      q.image ||
      q.imageUrl ||
      q.imageURL ||
      q.graphic ||
      (q.stimulusImage && q.stimulusImage.src) ||
      q.stimulusImage ||
      content.image ||
      content.imageURL ||
      content.imageUrl;

    if (typeof direct === 'string') {
      if (direct.trim()) return true;
    } else if (direct) {
      return true;
    }

    // Legacy datasets sometimes mark image questions by type
    if (String(q.type || '').toLowerCase() === 'image') return true;

    // Some datasets store stimulus as object or HTML string
    if (typeof q.stimulus === 'object' && q.stimulus) {
      const stim = q.stimulus;
      if (typeof stim.image === 'string' && stim.image.trim()) return true;
      if (typeof stim.src === 'string' && stim.src.trim()) return true;
    }
    if (stringLooksLikeHasImage(q.stimulus)) return true;

    // Embedded images inside passage/question/questionText HTML
    const maybeHtml = [
      q.passage,
      q.question,
      q.questionText,
      content.passage,
      content.question,
      content.questionText,
    ];
    return maybeHtml.some(stringLooksLikeHasImage);
  };

  // Build question list from the available catalog structure (flat arrays or nested categories)
  const rebuildFromCatalog = (catalog) => {
    if (!catalog || typeof catalog !== 'object') return [];

    let list = [];

    const addQuizQuestions = (subject, categoryLabel, quiz, quizIndex) => {
      const questionsSources = [];
      if (Array.isArray(quiz?.questions)) questionsSources.push(quiz.questions);
      if (Array.isArray(quiz?.items)) questionsSources.push(quiz.items);
      if (Array.isArray(quiz?.questionBank?.questions))
        questionsSources.push(quiz.questionBank.questions);

      const merged = questionsSources.flat();
      if (!Array.isArray(merged) || merged.length === 0) return;

      merged.forEach((q, questionIndex) => {
        const qObj = typeof q === 'object' ? q : { questionText: String(q) };
        list.push({
          id: `${subject}-${categoryLabel}-${quizIndex}-${questionIndex}`,
          subject,
          category: categoryLabel || quiz.category || 'General',
          quizTitle: quiz.title || `Quiz ${quizIndex + 1}`,
          source: 'premade',
          ...qObj,
        });
      });
    };

    Object.entries(catalog).forEach(([subject, subjData]) => {
      if (Array.isArray(subjData)) {
        subjData.forEach((quiz, quizIndex) => {
          addQuizQuestions(
            subject,
            quiz.category || 'General',
            quiz,
            quizIndex
          );
        });
        return;
      }

      // Also support root-level quizzes under the subject
      if (Array.isArray(subjData?.quizzes)) {
        subjData.quizzes.forEach((quiz, quizIndex) => {
          addQuizQuestions(
            subject,
            quiz.category || 'General',
            quiz,
            quizIndex
          );
        });
      }

      const categories = subjData?.categories || {};
      Object.entries(categories).forEach(([categoryName, catData]) => {
        catData?.quizzes?.forEach((quiz, quizIndex) => {
          addQuizQuestions(subject, categoryName, quiz, quizIndex);
        });

        catData?.topics?.forEach((topic, topicIndex) => {
          if (Array.isArray(topic?.quizzes)) {
            topic.quizzes.forEach((quiz, quizIndex) => {
              addQuizQuestions(
                subject,
                topic.title || categoryName,
                quiz,
                quizIndex
              );
            });
          }

          if (Array.isArray(topic?.questions)) {
            topic.questions.forEach((q, questionIndex) => {
              list.push({
                id: `${subject}-${categoryName}-topic-${topicIndex}-${questionIndex}`,
                subject,
                category: topic.title || categoryName,
                quizTitle: topic.title || `Topic ${topicIndex + 1}`,
                source: 'premade',
                ...q,
              });
            });
          }
        });
      });
    });

    return list;
  };

  useEffect(() => {
    const catalog =
      window.PREMADE_QUIZ_CATALOG ||
      window.AppData ||
      window.ExpandedQuizData ||
      {};

    console.log(
      '[SuperAdminAllQuestions] Initial catalog keys:',
      Object.keys(catalog)
    );

    let list = rebuildFromCatalog(catalog);
    console.log(
      '[SuperAdminAllQuestions] Initial rebuilt list length:',
      list.length
    );

    // Seed state immediately so later merges (API catalog + AI) won't get overwritten.
    setAllQuestions(list);

    // Prefer backend /api/all-quizzes when available (includes richer premade metadata like imageUrl).
    (async () => {
      try {
        const apiBase = window.API_BASE_URL || '';
        const res = await fetch(`${apiBase}/api/all-quizzes`, {
          cache: 'no-store',
        });
        if (!res.ok) return;
        const data = await res.json();
        const rebuilt = rebuildFromCatalog(data);
        if (!Array.isArray(rebuilt) || rebuilt.length === 0) return;

        console.log(
          `[SuperAdminAllQuestions] Rebuilt ${rebuilt.length} questions from /api/all-quizzes`
        );

        setAllQuestions((prev) => {
          const existingIds = new Set((prev || []).map((q) => q.id));
          const uniqueNew = rebuilt.filter((q) => !existingIds.has(q.id));
          return [...(prev || []), ...uniqueNew];
        });
      } catch (e) {
        console.warn('[SuperAdminAllQuestions] /api/all-quizzes fetch failed');
      }
    })();

    // If nothing yet, wait for quizDataLoaded event then rebuild once
    if (list.length === 0 && typeof window !== 'undefined') {
      const onQuizDataLoaded = (evt) => {
        console.log('[SuperAdminAllQuestions] quizDataLoaded event received');
        const nextCatalog =
          window.PREMADE_QUIZ_CATALOG || window.AppData || evt?.detail || {};
        console.log(
          '[SuperAdminAllQuestions] Event catalog keys:',
          Object.keys(nextCatalog)
        );
        const rebuilt = rebuildFromCatalog(nextCatalog);
        console.log(
          '[SuperAdminAllQuestions] Rebuilt list from event:',
          rebuilt.length
        );
        setAllQuestions((prev) => {
          if (prev.length > 0) return prev;
          return rebuilt;
        });
      };
      window.addEventListener('quizDataLoaded', onQuizDataLoaded, {
        once: true,
      });

      // Fallback: Explicitly fetch quiz files if global catalog is empty or missing questions
      // This handles cases where index.html loader failed or loaded only metadata
      (async () => {
        try {
          console.log(
            '[SuperAdminAllQuestions] Attempting direct fetch of quiz files...'
          );
          const apiBase = window.API_BASE_URL || '';
          const QUIZ_FILENAMES = [
            'math.quizzes.part1.json',
            'math.quizzes.part2.json',
            'rla.quizzes.part1.json',
            'rla.quizzes.part2.json',
            'science.quizzes.part1.json',
            'science.quizzes.part2.json',
            'social-studies.quizzes.json',
            'social-studies.extras.json',
            'workforce.quizzes.json',
          ];

          const fetches = QUIZ_FILENAMES.map((f) =>
            fetch(`${apiBase}/quizzes/${f}`)
              .then((r) => (r.ok ? r.json() : null))
              .catch((e) => null)
          );

          const results = await Promise.all(fetches);
          const validResults = results.filter(
            (r) => r && typeof r === 'object'
          );

          if (validResults.length > 0) {
            console.log(
              `[SuperAdminAllQuestions] Directly fetched ${validResults.length} quiz files`
            );

            // Build a temporary catalog from these files
            const tempCatalog = {};
            validResults.forEach((data) => {
              if (!data.subject) return;
              if (!tempCatalog[data.subject]) {
                tempCatalog[data.subject] = { categories: {} };
              }

              // Merge categories
              if (data.categories) {
                Object.entries(data.categories).forEach(
                  ([catName, catData]) => {
                    if (!tempCatalog[data.subject].categories[catName]) {
                      tempCatalog[data.subject].categories[catName] = {
                        quizzes: [],
                        topics: [],
                      };
                    }
                    const targetCat =
                      tempCatalog[data.subject].categories[catName];

                    // Add topics and their quizzes
                    if (Array.isArray(catData.topics)) {
                      catData.topics.forEach((topic) => {
                        targetCat.topics.push(topic);
                        if (Array.isArray(topic.quizzes)) {
                          targetCat.quizzes.push(...topic.quizzes);
                        }
                      });
                    }

                    // Add direct quizzes
                    if (Array.isArray(catData.quizzes)) {
                      targetCat.quizzes.push(...catData.quizzes);
                    }
                  }
                );
              }
            });

            const directList = rebuildFromCatalog(tempCatalog);
            console.log(
              `[SuperAdminAllQuestions] Rebuilt ${directList.length} questions from direct fetch`
            );

            if (directList.length > 0) {
              setAllQuestions((prev) => {
                // Merge with existing, avoiding duplicates by ID
                const existingIds = new Set(prev.map((q) => q.id));
                const uniqueNew = directList.filter(
                  (q) => !existingIds.has(q.id)
                );
                return [...prev, ...uniqueNew];
              });
            }
          }
        } catch (err) {
          console.error('[SuperAdminAllQuestions] Direct fetch failed:', err);
        }
      })();
    }

    // Fetch AI-generated questions
    const apiBase = window.API_BASE_URL || '';
    const token = localStorage.getItem('appToken');

    fetch(`${apiBase}/api/admin/all-questions`, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        : { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch AI questions: ${res.status}`);
        }
        return res.json();
      })
      .then((aiRows) => {
        const aiQuestions = Array.isArray(aiRows)
          ? aiRows.map((row, idx) => ({
              id: `ai-${row.id || idx}`,
              subject: row.subject || 'AI Generated',
              category: row.topic || 'AI Bank',
              quizTitle: 'AI Generated',
              source: 'ai',
              ...row.question_json,
            }))
          : [];

        setAllQuestions((prev) => {
          const base = Array.isArray(prev) && prev.length > 0 ? prev : list;
          const existingIds = new Set(base.map((q) => q.id));
          const uniqueAi = aiQuestions.filter((q) => !existingIds.has(q.id));
          return [...base, ...uniqueAi];
        });
      })
      .catch((err) => {
        console.error('Failed to fetch AI questions:', err);
        setError(err.message);
        setAllQuestions((prev) => {
          if (Array.isArray(prev) && prev.length > 0) return prev;
          return list;
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter questions by selected subject
  const subjectQuestions = useMemo(() => {
    if (!selectedSubject) return [];
    let filtered = allQuestions.filter((q) => {
      const s = normalizeSubjectKey(q.subject);
      const sel = normalizeSubjectKey(selectedSubject);
      if (sel === 'rla')
        return s.includes('rla') || s.includes('language arts');
      return s.includes(sel);
    });

    if (filterType === 'images') {
      filtered = filtered.filter(questionHasImage);
    } else if (filterType === 'missing-images') {
      filtered = filtered.filter((q) => {
        return (
          (q.content && q.content.imageURL === '') ||
          (q.content && q.content.image === '') ||
          q.image === '' ||
          q.imageUrl === ''
        );
      });
    } else if (filterType === 'no-images') {
      filtered = filtered.filter((q) => {
        return !questionHasImage(q);
      });
    } else if (filterType === 'passage') {
      filtered = filtered.filter((q) => !!q.passage);
    } else if (filterType === 'standalone') {
      filtered = filtered.filter((q) => !q.passage);
    }

    return filtered;
  }, [allQuestions, selectedSubject, filterType]);

  // Reset index when filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filterType]);

  const currentQuestion = subjectQuestions[selectedIndex];

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">
          Question Audit System
        </h1>
        <p className="text-gray-500 dark:text-gray-400">Loading questions...</p>
      </div>
    );
  }

  if (!selectedSubject) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">
          Question Audit System
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {['Math', 'RLA', 'Social Studies', 'Science'].map((subj) => (
            <button
              key={subj}
              onClick={() => {
                setSelectedSubject(subj);
                setSelectedIndex(0);
              }}
              className="p-10 text-2xl font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 shadow-sm hover:shadow-md transition-all text-slate-800 dark:text-white"
            >
              {subj}
            </button>
          ))}
        </div>
        <div className="mt-8 text-slate-500">
          Total Questions Loaded: {allQuestions.length}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        onClick={() => setSelectedSubject(null)}
        className="mb-6 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2 font-medium"
      >
        &larr; Back to Subject Selection
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold dark:text-white">
          {selectedSubject} Audit
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <label className="font-medium text-slate-700 dark:text-slate-300 pl-2 text-sm">
              Filter:
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border-none bg-transparent py-1 pl-2 pr-8 font-medium text-sm focus:ring-0 cursor-pointer dark:text-white"
            >
              <option value="all" className="dark:bg-slate-800">
                All Questions
              </option>
              <option value="images" className="dark:bg-slate-800">
                With Images
              </option>
              <option value="missing-images" className="dark:bg-slate-800">
                Missing Images (Empty Field)
              </option>
              <option value="no-images" className="dark:bg-slate-800">
                Text Only
              </option>
              <option value="passage" className="dark:bg-slate-800">
                Passage Based
              </option>
              <option value="standalone" className="dark:bg-slate-800">
                Standalone
              </option>
            </select>
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <button
              onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
              disabled={selectedIndex === 0}
              className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 dark:text-slate-400"
              title="Previous Question"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="flex items-center">
              <label className="font-medium text-slate-700 dark:text-slate-300 pl-2 hidden sm:inline">
                Question:
              </label>
              <select
                value={selectedIndex}
                onChange={(e) => setSelectedIndex(Number(e.target.value))}
                className="border-none bg-transparent py-1 pl-2 pr-8 font-bold text-lg focus:ring-0 cursor-pointer dark:text-white"
              >
                {subjectQuestions.map((_, idx) => (
                  <option key={idx} value={idx} className="dark:bg-slate-800">
                    {idx + 1} of {subjectQuestions.length}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() =>
                setSelectedIndex(
                  Math.min(subjectQuestions.length - 1, selectedIndex + 1)
                )
              }
              disabled={selectedIndex === subjectQuestions.length - 1}
              className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 dark:text-slate-400"
              title="Next Question"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {currentQuestion ? (
        <AuditQuestionDisplay
          question={currentQuestion}
          index={selectedIndex + 1}
        />
      ) : (
        <div className="p-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <p className="text-xl text-slate-500 mb-4">
            No questions found for {selectedSubject}.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mr-2"
          >
            Reload Page
          </button>
          <button
            onClick={async () => {
              console.log('Attempting debug fetch...');
              try {
                const urls = [
                  '/quizzes/math.quizzes.part1.json',
                  'http://localhost:3002/quizzes/math.quizzes.part1.json',
                  'http://localhost:3003/quizzes/math.quizzes.part1.json',
                ];
                for (const url of urls) {
                  try {
                    'social-studies.quizzes.part1.json',
                      'social-studies.quizzes.part2.json',
                      'social-studies.quizzes.json',
                      console.log(
                        `Fetch ${url}: ${res.status} ${res.statusText}`
                      );
                    if (res.ok) {
                      const data = await res.json();
                      console.log('Data sample:', data);
                      alert(`Success fetching ${url}`);
                    }
                  } catch (e) {
                    console.error(`Failed to fetch ${url}:`, e);
                  }
                }
              } catch (e) {
                console.error('Debug error:', e);
              }
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Debug Fetch
          </button>
          <div className="mt-4 text-xs text-slate-400 text-left max-w-md mx-auto overflow-auto max-h-40">
            <p>Debug Info:</p>
            <p>Total Questions: {allQuestions.length}</p>
            <p>
              Catalog Keys:{' '}
              {Object.keys(window.PREMADE_QUIZ_CATALOG || {}).join(', ')}
            </p>
            <p>AppData Keys: {Object.keys(window.AppData || {}).join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function AuditQuestionDisplay({ question, index }) {
  // Handle nested content object (found in some Social Studies quizzes)
  const content = question.content || {};

  const questionText =
    question.question ||
    question.questionText ||
    content.questionText ||
    content.question ||
    'No question text';

  const passage = question.passage || content.passage || '';

  const image =
    question.image ||
    question.imageUrl ||
    question.imageURL ||
    question.graphic ||
    question.stimulusImage?.src ||
    question.stimulusImage ||
    content.imageURL ||
    content.image ||
    (typeof question.stimulus === 'object'
      ? question.stimulus.image || question.stimulus.src
      : null) ||
    null;

  const answerOptions = question.answerOptions || [];
  const correctAnswer = question.correctAnswer;
  const rationale = question.rationale || question.explanation || '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Question Preview (Quiz Format) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide dark:bg-blue-900/30 dark:text-blue-300">
              Question Preview
            </span>
          </div>

          {passage && (
            <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-l-4 border-slate-300 dark:border-slate-600 italic text-slate-700 dark:text-slate-300 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: passage }} />
            </div>
          )}

          {image && (
            <div className="mb-8 flex justify-center bg-slate-50 dark:bg-black/20 p-4 rounded-lg">
              <img
                src={normalizeImageUrl(image)}
                alt="Question"
                className="max-w-full max-h-[400px] h-auto rounded shadow-sm"
              />
            </div>
          )}

          <div className="text-xl mb-8 font-medium text-slate-900 dark:text-white leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: questionText }} />
          </div>

          <div className="space-y-4">
            {answerOptions.map((opt, i) => {
              const optText = typeof opt === 'object' ? opt.text : opt;
              const isCorrect =
                (typeof opt === 'object' && opt.isCorrect) ||
                correctAnswer === optText ||
                correctAnswer === String.fromCharCode(65 + i); // Fallback check

              return (
                <div
                  key={i}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    isCorrect
                      ? 'bg-green-50 border-green-500 dark:bg-green-900/10 dark:border-green-500/50'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-sm border-2 ${
                        isCorrect
                          ? 'bg-green-500 text-white border-green-500'
                          : 'bg-slate-100 text-slate-500 border-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div className="pt-1 text-lg text-slate-800 dark:text-slate-200">
                      {optText}
                    </div>
                    {isCorrect && (
                      <span className="ml-auto text-xs font-bold text-green-700 dark:text-green-400 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded uppercase tracking-wider">
                        Correct Answer
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {rationale && (
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">
                Explanation / Rationale
              </h4>
              <div className="text-slate-700 dark:text-slate-300 leading-relaxed bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/20">
                <div dangerouslySetInnerHTML={{ __html: rationale }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Source Metadata */}
      <div className="lg:col-span-1">
        <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 sticky top-6">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
            Source Location
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-xs text-slate-500 mb-1">Subject</div>
              <div className="font-semibold text-slate-900 dark:text-white text-lg">
                {question.subject}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Category</div>
              <div className="font-medium text-slate-800 dark:text-slate-200">
                {question.category}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">
                Quiz / Topic Title
              </div>
              <div className="font-medium text-slate-800 dark:text-slate-200">
                {question.quizTitle}
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 mb-1">System ID</div>
              <div className="font-mono text-xs bg-slate-200 dark:bg-slate-800 p-1 rounded break-all">
                {question.id}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Source Type</div>
              <div className="inline-block px-2 py-1 rounded text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 capitalize">
                {question.source}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
