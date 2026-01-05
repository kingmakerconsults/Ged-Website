const fs = require('fs');
const path = require('path');
const { ALL_QUIZZES } = require('./backend/data/quizzes/index.js');

const IMAGE_ROOT = path.join(__dirname, 'frontend', 'public');

const report = {
  all: [],
  missing: [],
  existing: [],
  totalQuestions: 0,
  imageQuestions: 0,
};

function checkImage(imgUrl, context) {
  if (!imgUrl) return;

  // Normalize common malformed local URLs
  if (typeof imgUrl === 'string') {
    imgUrl = imgUrl.trim();
    // Protocol-relative local reference like "//images/..." -> "/images/..."
    if (/^\/\/images\//i.test(imgUrl)) {
      imgUrl = '/' + imgUrl.replace(/^\/+/g, '');
    }
  }

  // Ignore external URLs (we only validate local assets under frontend/public)
  if (typeof imgUrl === 'string' && /^https?:\/\//i.test(imgUrl)) return;

  // Normalize URL to file path
  // Expected format: /images/Subject/File.ext
  let relativePath = imgUrl;

  // Remove query params
  relativePath = relativePath.split('?')[0];

  // Remove leading slash
  if (relativePath.startsWith('/')) {
    relativePath = relativePath.substring(1);
  }

  // Decode URI components (e.g. %20 -> space)
  relativePath = decodeURIComponent(relativePath);

  const fullPath = path.join(IMAGE_ROOT, relativePath);

  if (fs.existsSync(fullPath)) {
    report.all.push({ url: imgUrl, path: fullPath, context, exists: true });
    report.existing.push({ url: imgUrl, path: fullPath, context });
  } else {
    report.all.push({ url: imgUrl, path: fullPath, context, exists: false });
    report.missing.push({ url: imgUrl, path: fullPath, context });
  }
}

function extractImagesFromText(text) {
  const images = [];
  const regex = /src=["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    images.push(match[1]);
  }
  return images;
}

function getQuestionImageUrls(q) {
  if (!q || typeof q !== 'object') return [];
  const urls = [];
  const content = q.content && typeof q.content === 'object' ? q.content : null;

  const direct = [
    q.imageUrl,
    q.imageURL,
    q.image,
    q.graphic,
    q.stimulusImage && q.stimulusImage.src,
    q.stimulusImage,
    q.explanationImage,
    content && (content.imageUrl || content.imageURL || content.image),
  ];
  direct.forEach((u) => {
    if (typeof u === 'string' && u.trim()) urls.push(u.trim());
  });

  const textFields = [
    q.question,
    q.questionText,
    q.passage,
    q.stimulus,
    q.explanation,
    content && (content.questionText || content.question),
    content && content.passage,
  ];
  textFields.forEach((t) => {
    extractImagesFromText(t).forEach((u) => urls.push(u));
  });

  return urls;
}

function audit() {
  console.log('Available Subjects:', Object.keys(ALL_QUIZZES));
  const subjects = Object.keys(ALL_QUIZZES || {});

  for (const subjectId of subjects) {
    const subject = ALL_QUIZZES[subjectId];
    if (!subject) continue;

    let subjectImageCount = 0;
    const categories = Array.isArray(subject.categories)
      ? subject.categories
      : Object.values(subject.categories || {});

    for (const category of categories) {
      const topics = Array.isArray(category.topics)
        ? category.topics
        : Object.values(category.topics || {});

      for (const topic of topics) {
        const scanQuestion = (q, index, label) => {
          report.totalQuestions++;
          const urls = getQuestionImageUrls(q);
          const hasImage = urls.length > 0;

          if (hasImage) {
            urls.forEach((img) => {
              checkImage(
                img,
                `${subjectId} - ${
                  category.title || category.name || 'Unknown Category'
                } - ${
                  topic.title || topic.name || topic.id || 'Unknown Topic'
                } - ${label}Q${index + 1}`
              );
            });
            report.imageQuestions++;
            subjectImageCount++;
          }
        };

        if (Array.isArray(topic.questions)) {
          topic.questions.forEach((q, index) => scanQuestion(q, index, ''));
        }

        if (Array.isArray(topic.quizzes)) {
          topic.quizzes.forEach((quiz, quizIndex) => {
            const qs = Array.isArray(quiz?.questions) ? quiz.questions : [];
            qs.forEach((q, index) =>
              scanQuestion(q, index, `Quiz${quizIndex + 1}-`)
            );
          });
        }
      }
    }

    console.log(
      `  > Found ${subjectImageCount} image questions in ${subjectId}`
    );
  }

  console.log('Audit Complete.');
  console.log(`Total Questions Scanned: ${report.totalQuestions}`);
  console.log(`Image Questions Found: ${report.imageQuestions}`);
  console.log(`Missing Images: ${report.missing.length}`);
  console.log(`Existing Images: ${report.existing.length}`);

  // Always save a complete reference list for downstream tooling (rename, rewrite, etc.)
  fs.writeFileSync(
    'image-audit-all-refs-v2.json',
    JSON.stringify(report.all, null, 2)
  );
  console.log('All image references saved to image-audit-all-refs-v2.json');

  if (report.missing.length > 0) {
    console.log('\n--- MISSING IMAGES REPORT ---');
    const grouped = {};
    report.missing.forEach((item) => {
      if (!grouped[item.url]) grouped[item.url] = [];
      grouped[item.url].push(item.context);
    });

    for (const [url, contexts] of Object.entries(grouped)) {
      console.log(`\nImage: ${url}`);
      console.log(
        `Expected Path: ${path.join(
          IMAGE_ROOT,
          decodeURIComponent(url.startsWith('/') ? url.substring(1) : url)
        )}`
      );
      console.log('Used in:');
      contexts.slice(0, 5).forEach((c) => console.log(`  - ${c}`));
      if (contexts.length > 5)
        console.log(`  ... and ${contexts.length - 5} more`);
    }

    // Save detailed missing report
    fs.writeFileSync(
      'image-audit-detailed-report-v2.json',
      JSON.stringify(report.missing, null, 2)
    );
    console.log(
      '\nDetailed missing image report saved to image-audit-detailed-report-v2.json'
    );
  }

  // Always overwrite missing report too (even when empty)
  if (report.missing.length === 0) {
    fs.writeFileSync(
      'image-audit-detailed-report-v2.json',
      JSON.stringify([], null, 2)
    );
  }
}

audit();
