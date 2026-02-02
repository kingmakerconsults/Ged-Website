/**
 * DIAGNOSTIC CATALOG v1 - Static 40-Question Diagnostic Test
 *
 * This module defines a curated, static diagnostic quiz with exactly 40 questions:
 * - 10 Math (spanning number sense, algebra, geometry, data analysis)
 * - 10 Science (spanning life, physical, earth science)
 * - 10 Social Studies (spanning civics, economics, history)
 * - 10 RLA (spanning reading comprehension, grammar, vocabulary)
 *
 * Each question includes:
 * - stable diagnostic ID (diag_v1_<subject>_<number>)
 * - challenge_tags in colon format (e.g., "math:1", "rla:2")
 * - full question object with answerOptions, rationales, and explanations
 * - originalSubject for display (e.g., "Math", "Science", "Social Studies", "Language Arts")
 *
 * USAGE:
 * 1. Load this module in server.js to build the diagnostic quiz
 * 2. Build the quiz by calling buildDiagnosticQuizV1()
 * 3. Return the quiz to the client with quizType:'diagnostic', type:'diagnostic'
 *
 * CURATION NOTES:
 * - Mix of easy/medium/hard to identify skill gaps across a range
 * - Balanced blueprint coverage per subject
 * - All questions have explanations and clear rationales
 * - Challenge tags derived from the specific skill area of each question
 *
 * TO UPDATE for v2:
 * - Replace question references in the DIAGNOSTIC_QUESTIONS array
 * - Ensure new questions follow the same schema (questionNumber, type, content, answerOptions, challenge_tags)
 * - Update challenge_tags to map to skills you want to track
 */

// Import the canonical ALL_QUIZZES to extract existing questions
const { ALL_QUIZZES } = require('../quizzes/index.js');

/**
 * Helper: Extract a specific question from ALL_QUIZZES by path
 * @param {string} subjectKey - "Math", "Science", "Social Studies", "Language Arts"
 * @param {string} categoryName - Category name in the subject
 * @param {number} topicIndex - Index of the topic in that category
 * @param {number} questionIndex - Index of the question in that topic
 * @returns {object} The question object or null if not found
 */
function extractQuestionFromCatalog(
  subjectKey,
  categoryName,
  topicIndex,
  questionIndex
) {
  try {
    const subject = ALL_QUIZZES[subjectKey];
    if (!subject || !subject.categories) return null;

    const category = subject.categories[categoryName];
    if (!category || !category.topics) return null;

    const topic = category.topics[topicIndex];
    if (!topic || !topic.questions) return null;

    return topic.questions[questionIndex] || null;
  } catch (e) {
    console.warn(
      `Failed to extract question: ${subjectKey}/${categoryName}/${topicIndex}/${questionIndex}`,
      e.message
    );
    return null;
  }
}

/**
 * Helper: Deep clone and normalize a question for the diagnostic
 * Ensures challenge_tags are present in the expected colon format
 */
function normalizeQuestionForDiagnostic(
  rawQuestion,
  diagId,
  originalSubject,
  challengeTags
) {
  if (!rawQuestion) return null;

  const normalized = {
    diagnosticId: diagId,
    originalSubject,
    questionNumber: rawQuestion.questionNumber || 1,
    type: rawQuestion.type || 'multiple-choice-text',
    content: rawQuestion.content || { questionText: '', passage: '' },
    answerOptions: Array.isArray(rawQuestion.answerOptions)
      ? rawQuestion.answerOptions
      : [],
    challenge_tags: Array.isArray(challengeTags) ? challengeTags : [],
    // Keep optional fields
    ...(rawQuestion.correctAnswer && {
      correctAnswer: rawQuestion.correctAnswer,
    }),
    ...(rawQuestion.correctAnswers && {
      correctAnswers: rawQuestion.correctAnswers,
    }),
    ...(rawQuestion.imageURL && { imageURL: rawQuestion.imageURL }),
    ...(rawQuestion.image && { image: rawQuestion.image }),
  };

  return normalized;
}

/**
 * Build the complete diagnostic quiz from curated questions
 * Returns a quiz object ready to send to the client
 */
function buildDiagnosticQuizV1() {
  // Map of diagnostic questions to their source locations and metadata
  // Format: { subjectKey, categoryName, topicIndex, questionIndex, challengeTags, displayLabel }
  const questionSources = {
    // MATH - 10 questions covering diverse topics
    diag_v1_math_01: {
      subjectKey: 'Math',
      categoryName: 'Number Sense & Operations',
      topicIndex: 0,
      questionIndex: 0,
      challengeTags: ['math:1'],
      label: 'Math: Fractions & Decimals',
    },
    diag_v1_math_02: {
      subjectKey: 'Math',
      categoryName: 'Number Sense & Operations',
      topicIndex: 0,
      questionIndex: 1,
      challengeTags: ['math:1'],
      label: 'Math: Fractions & Decimals',
    },
    diag_v1_math_03: {
      subjectKey: 'Math',
      categoryName: 'Number Sense & Operations',
      topicIndex: 1,
      questionIndex: 0,
      challengeTags: ['math:2'],
      label: 'Math: Percents & Ratios',
    },
    diag_v1_math_04: {
      subjectKey: 'Math',
      categoryName: 'Algebra & Functions',
      topicIndex: 0,
      questionIndex: 0,
      challengeTags: ['math:3'],
      label: 'Math: Linear Equations',
    },
    diag_v1_math_05: {
      subjectKey: 'Math',
      categoryName: 'Algebra & Functions',
      topicIndex: 1,
      questionIndex: 0,
      challengeTags: ['math:3'],
      label: 'Math: Graphing & Functions',
    },
    diag_v1_math_06: {
      subjectKey: 'Math',
      categoryName: 'Geometry & Measurement',
      topicIndex: 0,
      questionIndex: 0,
      challengeTags: ['math:4'],
      label: 'Math: Geometry',
    },
    diag_v1_math_07: {
      subjectKey: 'Math',
      categoryName: 'Geometry & Measurement',
      topicIndex: 1,
      questionIndex: 0,
      challengeTags: ['math:4'],
      label: 'Math: Area & Volume',
    },
    diag_v1_math_08: {
      subjectKey: 'Math',
      categoryName: 'Data Analysis & Probability',
      topicIndex: 0,
      questionIndex: 0,
      challengeTags: ['math:5'],
      label: 'Math: Statistics',
    },
    diag_v1_math_09: {
      subjectKey: 'Math',
      categoryName: 'Data Analysis & Probability',
      topicIndex: 1,
      questionIndex: 0,
      challengeTags: ['math:5'],
      label: 'Math: Probability',
    },
    diag_v1_math_10: {
      subjectKey: 'Math',
      categoryName: 'Algebra & Functions',
      topicIndex: 2,
      questionIndex: 0,
      challengeTags: ['math:3'],
      label: 'Math: Exponents & Radicals',
    },

    // SCIENCE - 10 questions covering life, physical, earth science
    diag_v1_science_01: {
      subjectKey: 'Science',
      categoryName: 'Life Science',
      topicIndex: 0,
      questionIndex: 0,
      challengeTags: ['science:1'],
      label: 'Science: Cell Structure',
    },
    diag_v1_science_02: {
      subjectKey: 'Science',
      categoryName: 'Life Science',
      topicIndex: 0,
      questionIndex: 2,
      challengeTags: ['science:1'],
      label: 'Science: Photosynthesis',
    },
    diag_v1_science_03: {
      subjectKey: 'Science',
      categoryName: 'Life Science',
      topicIndex: 0,
      questionIndex: 4,
      challengeTags: ['science:2'],
      label: 'Science: Genetics',
    },
    diag_v1_science_04: {
      subjectKey: 'Science',
      categoryName: 'Life Science',
      topicIndex: 0,
      questionIndex: 6,
      challengeTags: ['science:1'],
      label: 'Science: Organelles',
    },
    diag_v1_science_05: {
      subjectKey: 'Science',
      categoryName: 'Life Science',
      topicIndex: 1,
      questionIndex: 0,
      challengeTags: ['science:3'],
      label: 'Science: Evolution',
    },
    diag_v1_science_06: {
      subjectKey: 'Science',
      categoryName: 'Physical Science',
      topicIndex: 0,
      questionIndex: 0,
      challengeTags: ['science:4'],
      label: 'Science: Forces & Motion',
    },
    diag_v1_science_07: {
      subjectKey: 'Science',
      categoryName: 'Physical Science',
      topicIndex: 1,
      questionIndex: 0,
      challengeTags: ['science:5'],
      label: 'Science: Energy',
    },
    diag_v1_science_08: {
      subjectKey: 'Science',
      categoryName: 'Physical Science',
      topicIndex: 2,
      questionIndex: 0,
      challengeTags: ['science:6'],
      label: 'Science: Atoms & Bonding',
    },
    diag_v1_science_09: {
      subjectKey: 'Science',
      categoryName: 'Earth & Space Science',
      topicIndex: 0,
      questionIndex: 0,
      challengeTags: ['science:7'],
      label: 'Science: Earth Systems',
    },
    diag_v1_science_10: {
      subjectKey: 'Science',
      categoryName: 'Earth & Space Science',
      topicIndex: 1,
      questionIndex: 0,
      challengeTags: ['science:8'],
      label: 'Science: Weather & Climate',
    },

    // SOCIAL STUDIES - 10 questions covering civics, economics, history
    diag_v1_social_01: {
      subjectKey: 'Social Studies',
      categoryName: 'Civics & Government',
      topicIndex: 0,
      questionIndex: 0,
      challengeTags: ['social:1'],
      label: 'Social Studies: Government Structure',
    },
    diag_v1_social_02: {
      subjectKey: 'Social Studies',
      categoryName: 'Civics & Government',
      topicIndex: 1,
      questionIndex: 0,
      challengeTags: ['social:1'],
      label: 'Social Studies: Constitutional Rights',
    },
    diag_v1_social_03: {
      subjectKey: 'Social Studies',
      categoryName: 'Civics & Government',
      topicIndex: 2,
      questionIndex: 0,
      challengeTags: ['social:2'],
      label: 'Social Studies: Voting & Elections',
    },
    diag_v1_social_04: {
      subjectKey: 'Social Studies',
      categoryName: 'Economics',
      topicIndex: 0,
      questionIndex: 0,
      challengeTags: ['social:3'],
      label: 'Social Studies: Supply & Demand',
    },
    diag_v1_social_05: {
      subjectKey: 'Social Studies',
      categoryName: 'Economics',
      topicIndex: 1,
      questionIndex: 0,
      challengeTags: ['social:3'],
      label: 'Social Studies: Economic Systems',
    },
    diag_v1_social_06: {
      subjectKey: 'Social Studies',
      categoryName: 'U.S. History',
      topicIndex: 0,
      questionIndex: 0,
      challengeTags: ['social:4'],
      label: 'Social Studies: Colonial America',
    },
    diag_v1_social_07: {
      subjectKey: 'Social Studies',
      categoryName: 'U.S. History',
      topicIndex: 1,
      questionIndex: 0,
      challengeTags: ['social:4'],
      label: 'Social Studies: Industrial America',
    },
    diag_v1_social_08: {
      subjectKey: 'Social Studies',
      categoryName: 'U.S. History',
      topicIndex: 2,
      questionIndex: 0,
      challengeTags: ['social:4'],
      label: 'Social Studies: Modern America',
    },
    diag_v1_social_09: {
      subjectKey: 'Social Studies',
      categoryName: 'World History',
      topicIndex: 0,
      questionIndex: 0,
      challengeTags: ['social:5'],
      label: 'Social Studies: World History',
    },
    diag_v1_social_10: {
      subjectKey: 'Social Studies',
      categoryName: 'Geography',
      topicIndex: 0,
      questionIndex: 0,
      challengeTags: ['social:6'],
      label: 'Social Studies: Geography',
    },

    // RLA (Language Arts) - 10 questions covering reading, grammar, vocabulary
    diag_v1_rla_01: {
      subjectKey: 'Language Arts',
      categoryName: 'Reading Comprehension',
      topicIndex: 0,
      questionIndex: 0,
      challengeTags: ['rla:1'],
      label: 'RLA: Reading Comprehension',
    },
    diag_v1_rla_02: {
      subjectKey: 'Language Arts',
      categoryName: 'Reading Comprehension',
      topicIndex: 1,
      questionIndex: 0,
      challengeTags: ['rla:1'],
      label: 'RLA: Inference & Analysis',
    },
    diag_v1_rla_03: {
      subjectKey: 'Language Arts',
      categoryName: 'Reading Comprehension',
      topicIndex: 2,
      questionIndex: 0,
      challengeTags: ['rla:2'],
      label: 'RLA: Vocabulary & Context',
    },
    diag_v1_rla_04: {
      subjectKey: 'Language Arts',
      categoryName: 'Writing & Grammar',
      topicIndex: 0,
      questionIndex: 0,
      challengeTags: ['rla:3'],
      label: 'RLA: Grammar & Sentence Structure',
    },
    diag_v1_rla_05: {
      subjectKey: 'Language Arts',
      categoryName: 'Writing & Grammar',
      topicIndex: 1,
      questionIndex: 0,
      challengeTags: ['rla:3'],
      label: 'RLA: Punctuation & Capitalization',
    },
    diag_v1_rla_06: {
      subjectKey: 'Language Arts',
      categoryName: 'Writing & Grammar',
      topicIndex: 2,
      questionIndex: 0,
      challengeTags: ['rla:3'],
      label: 'RLA: Word Usage & Clarity',
    },
    diag_v1_rla_07: {
      subjectKey: 'Language Arts',
      categoryName: 'Literature',
      topicIndex: 0,
      questionIndex: 0,
      challengeTags: ['rla:4'],
      label: 'RLA: Literary Devices',
    },
    diag_v1_rla_08: {
      subjectKey: 'Language Arts',
      categoryName: 'Literature',
      topicIndex: 1,
      questionIndex: 0,
      challengeTags: ['rla:4'],
      label: 'RLA: Character & Theme',
    },
    diag_v1_rla_09: {
      subjectKey: 'Language Arts',
      categoryName: 'Nonfiction & Rhetoric',
      topicIndex: 0,
      questionIndex: 0,
      challengeTags: ['rla:5'],
      label: 'RLA: Nonfiction Analysis',
    },
    diag_v1_rla_10: {
      subjectKey: 'Language Arts',
      categoryName: 'Nonfiction & Rhetoric',
      topicIndex: 1,
      questionIndex: 0,
      challengeTags: ['rla:5'],
      label: 'RLA: Argument & Evidence',
    },
  };

  // Build the complete question array
  const allQuestions = [];
  const subjects = ['Math', 'Science', 'Social Studies', 'Language Arts'];

  for (const diagId of Object.keys(questionSources).sort()) {
    const source = questionSources[diagId];
    const rawQuestion = extractQuestionFromCatalog(
      source.subjectKey,
      source.categoryName,
      source.topicIndex,
      source.questionIndex
    );

    if (!rawQuestion) {
      console.warn(
        `[DiagnosticCatalog] Skipping ${diagId}: question not found in ALL_QUIZZES`
      );
      continue;
    }

    const normalized = normalizeQuestionForDiagnostic(
      rawQuestion,
      diagId,
      source.subjectKey,
      source.challengeTags
    );

    if (normalized) {
      allQuestions.push(normalized);
    }
  }

  // Group questions by subject for UI section headers
  const sections = {};
  for (const subject of subjects) {
    sections[subject] = allQuestions.filter(
      (q) => q.originalSubject === subject
    );
  }

  // Build the complete quiz object
  const diagnosticQuiz = {
    id: 'diagnostic_v1',
    quizCode: 'diagnostic_v1',
    title: 'GED Baseline Diagnostic',
    subject: 'Diagnostic',
    type: 'diagnostic',
    quizType: 'diagnostic',
    isDiagnostic: true,
    description:
      '40 questions • ~60–90 minutes • identifies your top skill gaps. This is a one-time baseline assessment.',
    timeLimit: 90 * 60, // 90 minutes in seconds
    config: {
      calculator: true,
      formulaSheet: true,
    },
    sections: sections,
    questions: allQuestions,
    totalQuestions: allQuestions.length,
  };

  return diagnosticQuiz;
}

module.exports = {
  buildDiagnosticQuizV1,
  extractQuestionFromCatalog,
  normalizeQuestionForDiagnostic,
};
