#!/usr/bin/env node
/**
 * Image Question Audit and Fix Script
 * Audits all quiz questions for image references and ensures they point to valid images
 */

const fs = require('fs');
const path = require('path');

// Get all available images
const imagesDir = path.join(__dirname, 'frontend/public/images');
const subjects = fs
  .readdirSync(imagesDir)
  .filter((f) => fs.statSync(path.join(imagesDir, f)).isDirectory());
const imageMap = {};

subjects.forEach((subject) => {
  const subjectPath = path.join(imagesDir, subject);
  if (fs.existsSync(subjectPath)) {
    imageMap[subject] = fs
      .readdirSync(subjectPath)
      .filter((f) => !fs.statSync(path.join(subjectPath, f)).isDirectory())
      .map((f) => f.toLowerCase());
  }
});

console.log('=== IMAGE ASSET INVENTORY ===\n');
Object.entries(imageMap).forEach(([subject, images]) => {
  console.log(`${subject}: ${images.length} images`);
});

// Load quiz data
const quizDir = path.join(__dirname, 'public/quizzes');
const quizFiles = fs.readdirSync(quizDir).filter((f) => f.endsWith('.json'));

console.log(`\n=== AUDITING QUIZ QUESTIONS ===\n`);

let totalQuestions = 0;
let questionsWithImages = 0;
let brokenReferences = [];
let fixedReferences = [];

quizFiles.forEach((file) => {
  const quizPath = path.join(quizDir, file);
  let fileContent = fs.readFileSync(quizPath, 'utf8').replace(/^\uFEFF/, '');
  let data;
  try {
    data = JSON.parse(fileContent);
  } catch (e) {
    console.log(`Error parsing ${file}: ${e.message}`);
    return;
  }

  // Determine subject from filename
  let subject = 'Social Studies';
  if (file.includes('math')) subject = 'Math';
  if (file.includes('science')) subject = 'Science';
  if (file.includes('rla')) subject = 'RLA';
  if (file.includes('workforce')) subject = 'Workforce Readiness';

  const availableImages = imageMap[subject] || [];

  // Handle different data structures
  const quizzes = Array.isArray(data)
    ? data
    : data.quizzes
    ? Object.values(data.quizzes).flat()
    : [];

  quizzes.forEach((quiz, qi) => {
    if (!quiz.questions || !Array.isArray(quiz.questions)) return;

    quiz.questions.forEach((q, qidx) => {
      totalQuestions++;

      // Check for image in various fields
      const imageUrl = q.imageUrl || q.imageURL || q.stimulusImage?.src;

      if (imageUrl && imageUrl.trim()) {
        questionsWithImages++;

        // Normalize the path
        let normalizedUrl = imageUrl
          .replace(/^\/frontend\//i, '')
          .replace(/^\/Images\//i, 'Images/')
          .replace(/^Images\//i, '');

        const filename = path.basename(normalizedUrl).toLowerCase();

        // Check if image exists
        const exists = availableImages.some((img) => img === filename);

        if (!exists) {
          brokenReferences.push({
            file,
            quiz: quiz.title || 'Unknown',
            questionNum: q.questionNumber || 'Unknown',
            imageUrl: imageUrl,
            normalizedUrl,
            subject,
            type: q.type || 'unknown',
            question: (q.question || q.questionText || '').substring(0, 80),
          });
        } else {
          // Track valid images
          fixedReferences.push({
            file,
            image: filename,
            subject,
          });
        }
      }
    });
  });
});

console.log(`Total questions audited: ${totalQuestions}`);
console.log(`Questions with image references: ${questionsWithImages}`);
console.log(`Valid image references: ${fixedReferences.length}`);
console.log(`Broken/missing image references: ${brokenReferences.length}\n`);

if (brokenReferences.length > 0) {
  console.log('=== BROKEN REFERENCES (First 30) ===\n');
  brokenReferences.slice(0, 30).forEach((ref) => {
    console.log(`[${ref.subject}] ${ref.file}`);
    console.log(`  Quiz: ${ref.quiz}`);
    console.log(`  Q${ref.questionNum}: ${ref.imageUrl}`);
    console.log(`  Status: Image not found\n`);
  });

  if (brokenReferences.length > 30) {
    console.log(
      `... and ${brokenReferences.length - 30} more broken references\n`
    );
  }
}

// Summary by subject
console.log('=== SUMMARY BY SUBJECT ===\n');
const bySubject = {};
brokenReferences.forEach((ref) => {
  if (!bySubject[ref.subject]) {
    bySubject[ref.subject] = [];
  }
  bySubject[ref.subject].push(ref);
});

Object.entries(bySubject).forEach(([subject, refs]) => {
  console.log(`${subject}: ${refs.length} broken references`);
});

// Save detailed report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalQuestions,
    questionsWithImages,
    validReferences: fixedReferences.length,
    brokenReferences: brokenReferences.length,
  },
  availableImages: imageMap,
  brokenReferences: brokenReferences,
  recommendations: [
    '1. Images should be placed in: frontend/public/images/{Subject}/',
    '2. Quiz data should reference: imageUrl: "Images/filename.png"',
    '3. Frontend converts to: /images/{Subject}/filename.png',
    '4. Backend serves from: /images route',
  ],
};

fs.writeFileSync(
  'image-audit-detailed-report.json',
  JSON.stringify(report, null, 2)
);
console.log('\n✓ Detailed report saved to: image-audit-detailed-report.json');
