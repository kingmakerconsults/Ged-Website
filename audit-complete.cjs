#!/usr/bin/env node
/**
 * Comprehensive Image Audit Script
 * Handles nested quiz structure
 */

const fs = require('fs');
const path = require('path');

// Get available images
const imagesDir = path.join(__dirname, 'frontend/public/images');
const availableImages = {};

['Science', 'Math', 'RLA', 'Social Studies', 'Workforce Readiness'].forEach(subj => {
  const p = path.join(imagesDir, subj);
  if(fs.existsSync(p)) {
    availableImages[subj] = fs.readdirSync(p)
      .filter(f => fs.statSync(path.join(p, f)).isFile())
      .map(f => f.toLowerCase());
  }
});

console.log('=== AVAILABLE IMAGES ===\n');
Object.entries(availableImages).forEach(([subj, imgs]) => {
  console.log(`${subj}: ${imgs.length} images`);
});

const quizDir = path.join(__dirname, 'public/quizzes');
const quizFiles = fs.readdirSync(quizDir).filter(f => f.endsWith('.json'));

let totalQuestions = 0;
let questionsWithImages = 0;
let brokenReferences = [];

console.log(`\n=== AUDITING ${quizFiles.length} QUIZ FILES ===\n`);

quizFiles.forEach(file => {
  const quizPath = path.join(quizDir, file);
  let content = fs.readFileSync(quizPath, 'utf8').replace(/^\uFEFF/, '');
  let data;
  
  try {
    data = JSON.parse(content);
  } catch(e) {
    console.log(`✗ Error parsing ${file}`);
    return;
  }
  
  // Determine subject
  let subject = 'Social Studies';
  if(file.includes('math')) subject = 'Math';
  if(file.includes('science')) subject = 'Science';
  if(file.includes('rla')) subject = 'RLA';
  if(file.includes('workforce')) subject = 'Workforce Readiness';
  
  const images = availableImages[subject] || [];
  
  // Handle different structures
  if(data.categories) {
    // Nested structure: category > sets > quizzes > questions
    Object.values(data.categories).forEach(category => {
      Object.values(category.sets || {}).forEach(quizzes => {
        if(Array.isArray(quizzes)) {
          quizzes.forEach(quiz => {
            if(quiz.questions && Array.isArray(quiz.questions)) {
              quiz.questions.forEach(q => {
                totalQuestions++;
                const imgUrl = q.imageUrl || q.imageURL || (q.stimulusImage?.src);
                
                if(imgUrl && imgUrl.trim()) {
                  questionsWithImages++;
                  const filename = path.basename(imgUrl).toLowerCase();
                  const exists = images.some(img => img === filename);
                  
                  if(!exists) {
                    brokenReferences.push({
                      file,
                      subject,
                      quiz: quiz.title || 'Unknown',
                      questionNum: q.questionNumber || 'Unknown',
                      imageUrl: imgUrl,
                      question: (q.question || q.questionText || '').substring(0, 60)
                    });
                  }
                }
              });
            }
          });
        }
      });
    });
  } else if(Array.isArray(data)) {
    // Flat array structure
    data.forEach(quiz => {
      if(quiz.questions && Array.isArray(quiz.questions)) {
        quiz.questions.forEach(q => {
          totalQuestions++;
          const imgUrl = q.imageUrl || q.imageURL || (q.stimulusImage?.src);
          
          if(imgUrl && imgUrl.trim()) {
            questionsWithImages++;
            const filename = path.basename(imgUrl).toLowerCase();
            const exists = images.some(img => img === filename);
            
            if(!exists) {
              brokenReferences.push({
                file,
                subject,
                quiz: quiz.title || 'Unknown',
                questionNum: q.questionNumber || 'Unknown',
                imageUrl: imgUrl,
                question: (q.question || q.questionText || '').substring(0, 60)
              });
            }
          }
        });
      }
    });
  }
});

console.log(`Total questions: ${totalQuestions}`);
console.log(`With image refs: ${questionsWithImages}`);
console.log(`Broken refs: ${brokenReferences.length}\n`);

if(brokenReferences.length > 0) {
  console.log('=== BROKEN IMAGE REFERENCES ===\n');
  const bySubject = {};
  brokenReferences.forEach(ref => {
    if(!bySubject[ref.subject]) {
      bySubject[ref.subject] = [];
    }
    bySubject[ref.subject].push(ref);
  });
  
  Object.entries(bySubject).forEach(([subj, refs]) => {
    console.log(`${subj}: ${refs.length} broken references`);
    refs.slice(0, 5).forEach(ref => {
      console.log(`  [${ref.file}] Q${ref.questionNum}: ${ref.imageUrl}`);
    });
    if(refs.length > 5) {
      console.log(`  ... and ${refs.length - 5} more`);
    }
    console.log();
  });
}

// Save report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalQuestions,
    questionsWithImages,
    brokenReferences: brokenReferences.length
  },
  availableImages,
  brokenReferences: brokenReferences
};

fs.writeFileSync('image-audit-complete.json', JSON.stringify(report, null, 2));
console.log('✓ Report saved to: image-audit-complete.json');
