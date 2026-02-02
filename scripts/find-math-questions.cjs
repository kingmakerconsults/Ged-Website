const fs = require('fs');
const path = require('path');
const { ALL_QUIZZES } = require('../backend/data/quizzes/index.js');

const IMAGE_PUBLIC_ROOT = path.join(process.cwd(), 'frontend', 'public');
const imageExistsCache = new Map();

function normalizeImageUrlToPublicPath(imgUrl) {
  if (!imgUrl || typeof imgUrl !== 'string') return null;
  const raw = imgUrl.trim();
  if (!raw) return null;
  if (/^https?:\/\//i.test(raw)) return null;
  const noQuery = raw.split('?')[0].split('#')[0];
  let rel = noQuery;
  if (rel.startsWith('/')) rel = rel.slice(1);
  try {
    rel = decodeURIComponent(rel);
  } catch (_) {
    // noop
  }
  return rel || null;
}

function imageExistsForUrl(imgUrl) {
  const rel = normalizeImageUrlToPublicPath(imgUrl);
  if (!rel) return true;
  if (imageExistsCache.has(rel)) return imageExistsCache.get(rel);
  const fullPath = path.join(IMAGE_PUBLIC_ROOT, rel);
  const exists = fs.existsSync(fullPath);
  imageExistsCache.set(rel, exists);
  return exists;
}

function extractImageUrlsFromText(text) {
  if (typeof text !== 'string' || !text) return [];
  const out = [];
  const regex = /src=["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    out.push(match[1]);
  }
  return out;
}

function collectQuestionImageUrls(q) {
  if (!q || typeof q !== 'object') return [];
  const content = q.content && typeof q.content === 'object' ? q.content : null;
  const urls = [];

  const direct = [
    q.imageUrl,
    q.imageURL,
    q.image,
    q.graphic,
    q.stimulusImage && q.stimulusImage.src,
    q.stimulusImage,
    content && (content.imageURL || content.imageUrl || content.image),
  ];
  direct.forEach((u) => {
    if (typeof u === 'string' && u.trim()) urls.push(u.trim());
  });

  const textFields = [
    q.passage,
    q.question,
    q.questionText,
    content && content.passage,
    content && (content.questionText || content.question),
    q.stimulus,
  ];
  textFields.forEach((t) => {
    extractImageUrlsFromText(t).forEach((u) => urls.push(u));
  });

  return urls;
}

function questionHasMissingLocalImage(q) {
  const urls = collectQuestionImageUrls(q);
  if (!urls.length) return false;
  return urls.some((u) => !imageExistsForUrl(u));
}

function isValidMC(question) {
  if (!question || typeof question !== 'object') return false;
  const opts = Array.isArray(question.answerOptions)
    ? question.answerOptions
    : [];
  if (opts.length < 2) return false;
  return opts.some((o) => o && o.isCorrect === true);
}

function cloneQuestion(q) {
  if (!q || typeof q !== 'object') return null;
  const cloned = { ...q };
  if (Array.isArray(q.answerOptions)) {
    cloned.answerOptions = q.answerOptions.map((opt) => ({ ...opt }));
  }
  return cloned;
}

function flattenSubjectQuestions(subjectKey) {
  const out = [];
  const subj = ALL_QUIZZES[subjectKey];
  if (!subj || !subj.categories) return out;
  Object.values(subj.categories).forEach((cat) => {
    const topics = Array.isArray(cat?.topics) ? cat.topics : [];
    topics.forEach((topic) => {
      const questions = Array.isArray(topic?.questions) ? topic.questions : [];
      questions.forEach((raw) => {
        const q = cloneQuestion(raw);
        if (!isValidMC(q)) return;
        if (questionHasMissingLocalImage(q)) return;
        if (!q.subject) q.subject = subjectKey;
        out.push(q);
      });
    });
  });
  return out;
}

const subject = 'Math';
const questions = flattenSubjectQuestions(subject);
const targets = [22, 25, 27];

targets.forEach((n) => {
  const q = questions[n - 1];
  if (!q) {
    console.log(`${n} NOT FOUND`);
    return;
  }
  const text =
    q.question ||
    q.questionText ||
    (q.content && (q.content.questionText || q.content.question)) ||
    '';
  const options = Array.isArray(q.answerOptions)
    ? q.answerOptions.map((o) => (typeof o === 'object' ? o.text : o))
    : [];

  console.log(`Q${n}: ${text}`);
  console.log('Answer options:', options);
  console.log('Rationale:', q.rationale || q.explanation || '');
  console.log('---');
});
