#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get all available images
const imagesDir = path.join(__dirname, 'frontend/public/images');
const subjects = fs.readdirSync(imagesDir).filter(f => fs.statSync(path.join(imagesDir, f)).isDirectory());
const imageMap = {};

subjects.forEach(subject => {
  const subjectPath = path.join(imagesDir, subject);
  if (fs.existsSync(subjectPath)) {
    imageMap[subject] = fs.readdirSync(subjectPath)
      .filter(f => !fs.statSync(path.join(subjectPath, f)).isDirectory())
      .map(f => f.toLowerCase());
  }
});

console.log('=== AVAILABLE IMAGES BY SUBJECT ===\n');
Object.entries(imageMap).forEach(([subject, images]) => {
  console.log(`${subject}: ${images.length} images`);
});

// Load quiz data
const quizDir = path.join(__dirname, 'public/quizzes');
const quizFiles = fs.readdirSync(quizDir).filter(f => f.endsWith('.json'));

console.log(`\n=== AUDITING ${quizFiles.length} QUIZ FILES ===\n`);

let totalQuestions = 0;
let questionsWithImages = 0;
let missingImages = [];
let brokenReferences = {};

quizFiles.forEach(file => {
  const quizPath = path.join(quizDir, file);
  let fileContent = fs.readFileSync(quizPath, 'utf8');
  // Remove BOM if present
  fileContent = fileContent.replace(/^\uFEFF/, '');
  const data = JSON.parse(fileContent);
  
  // Determine subject from filename
  let subject = 'Social Studies';
  if (file.includes('math')) subject = 'Math';
  if (file.includes('science')) subject = 'Science';
  if (file.includes('rla')) subject = 'RLA';
  if (file.includes('workforce')) subject = 'Workforce Readiness';
  
  // Process quizzes
  if (Array.isArray(data)) {
    data.forEach((quiz, qi) => {
      if (quiz.questions && Array.isArray(quiz.questions)) {
        quiz.questions.forEach((q, qidx) => {
          totalQuestions++;
          const imageUrl = q.imageUrl || q.imageURL || (q.stimulusImage?.src);
          if (imageUrl) {
            questionsWithImages++;
            const filename = path.basename(imageUrl).toLowerCase();
            const availableImages = imageMap[subject] || [];
            
            // Check if image exists
            const exists = availableImages.some(img => 
              img === filename || 
              img.includes(filename.replace(/\.(png|jpg|jpeg|gif)$/, ''))
            );
            
            if (!exists) {
              if (!brokenReferences[subject]) {
                brokenReferences[subject] = [];
              }
              missingImages.push({
                quiz: quiz.title || 'Unknown',
                questionNum: q.questionNumber || 'Unknown',
                imageUrl,
                subject,
                file,
                question: (q.question || q.questionText || '').substring(0, 100)
              });
              brokenReferences[subject].push({
                questionNum: q.questionNumber || 'Unknown',
                imageUrl,
                file
              });
            }
          }
        });
      }
    });
  }
});

console.log(`Total questions: ${totalQuestions}`);
console.log(`Questions with images: ${questionsWithImages}`);
console.log(`Missing/broken image references: ${missingImages.length}\n`);

console.log('=== BROKEN IMAGE REFERENCES BY SUBJECT ===\n');
Object.entries(brokenReferences).forEach(([subject, refs]) => {
  console.log(`${subject}: ${refs.length} broken references`);
  refs.slice(0, 5).forEach(r => {
    console.log(`  Q${r.questionNum}: ${r.imageUrl}`);
  });
  if (refs.length > 5) {
    console.log(`  ... and ${refs.length - 5} more`);
  }
  console.log();
});

// Save full report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalQuestions,
    questionsWithImages,
    missingImageReferences: missingImages.length
  },
  availableImages: imageMap,
  brokenReferences: missingImages
};

fs.writeFileSync('image-audit-report.json', JSON.stringify(report, null, 2));
console.log('Full report saved to image-audit-report.json');
