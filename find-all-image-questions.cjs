#!/usr/bin/env node
/**
 * Enhanced Image Audit - Find All Questions With Images
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

const quizDir = path.join(__dirname, 'public/quizzes');
const quizFiles = fs.readdirSync(quizDir).filter(f => f.endsWith('.json'));

let allQuestionsWithImages = [];

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
    Object.entries(data.categories).forEach(([categoryName, category]) => {
      Object.entries(category.sets || {}).forEach(([setName, quizzes]) => {
        if(Array.isArray(quizzes)) {
          quizzes.forEach(quiz => {
            if(quiz.questions && Array.isArray(quiz.questions)) {
              quiz.questions.forEach((q, qIdx) => {
                const imgUrl = q.imageUrl || q.imageURL || (q.stimulusImage?.src);
                
                if(imgUrl && imgUrl.trim()) {
                  const filename = path.basename(imgUrl).toLowerCase();
                  const exists = images.some(img => img === filename);
                  
                  allQuestionsWithImages.push({
                    file,
                    subject,
                    category: categoryName,
                    set: setName,
                    quiz: quiz.title || 'Unknown',
                    questionIndex: qIdx,
                    questionNumber: q.questionNumber || 'Unknown',
                    imageUrl: imgUrl,
                    imageName: path.basename(imgUrl),
                    exists: exists,
                    questionText: (q.question || q.questionText || '').substring(0, 100)
                  });
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
        quiz.questions.forEach((q, qIdx) => {
          const imgUrl = q.imageUrl || q.imageURL || (q.stimulusImage?.src);
          
          if(imgUrl && imgUrl.trim()) {
            const filename = path.basename(imgUrl).toLowerCase();
            const exists = images.some(img => img === filename);
            
            allQuestionsWithImages.push({
              file,
              subject,
              quiz: quiz.title || 'Unknown',
              questionIndex: qIdx,
              questionNumber: q.questionNumber || 'Unknown',
              imageUrl: imgUrl,
              imageName: path.basename(imgUrl),
              exists: exists,
              questionText: (q.question || q.questionText || '').substring(0, 100)
            });
          }
        });
      }
    });
  }
});

console.log('\n=== ALL QUESTIONS WITH IMAGES ===\n');
console.log(`Total found: ${allQuestionsWithImages.length}\n`);

allQuestionsWithImages.forEach((q, i) => {
  console.log(`\n${i + 1}. ${q.quiz} - Question #${q.questionNumber}`);
  console.log(`   Subject: ${q.subject}`);
  console.log(`   Image: ${q.imageName}`);
  console.log(`   Status: ${q.exists ? '✓ EXISTS' : '✗ MISSING'}`);
  console.log(`   File: ${q.file}`);
  if(q.category) console.log(`   Category: ${q.category}`);
  if(q.set) console.log(`   Set: ${q.set}`);
});

// Save detailed report
fs.writeFileSync('image-questions-detailed.json', JSON.stringify(allQuestionsWithImages, null, 2));
console.log('\n✓ Detailed report saved to: image-questions-detailed.json');
