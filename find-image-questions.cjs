const fs = require('fs');
const path = require('path');

// Read the audit report
const auditPath = path.join(__dirname, 'image-audit-complete.json');
const audit = JSON.parse(fs.readFileSync(auditPath, 'utf8'));

console.log('\n=== QUESTIONS WITH IMAGES ===\n');
if (audit.questionsWithImages && audit.questionsWithImages.length > 0) {
  audit.questionsWithImages.forEach((q, i) => {
    console.log(`Question ${i + 1}:`);
    console.log(`  Category: ${q.category}`);
    console.log(`  Set: ${q.set}`);
    console.log(`  Quiz: ${q.quiz}`);
    console.log(`  Question Index: ${q.questionIndex}`);
    console.log(`  Image URL: ${q.imageUrl}`);
    console.log(`  Status: ${q.exists ? '✓ EXISTS' : '✗ MISSING'}`);
    console.log('');
  });
} else {
  console.log('No questions with images found in audit data.');
  console.log('Available keys in audit:', Object.keys(audit));
}
