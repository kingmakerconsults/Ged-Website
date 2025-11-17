#!/usr/bin/env node
/**
 * Fix quiz image paths to include subject folder prefix
 * Converts: "Images/foo.png" -> "Images/Math/foo.png" (for math quizzes)
 */

const fs = require('fs');
const path = require('path');

const quizDir = path.join(__dirname, '..', 'backend', 'data', 'quizzes');

const subjects = {
  'math': 'Math',
  'science': 'Science',
  'social-studies': 'Social Studies'
};

let totalFixed = 0;
let fileCount = 0;

console.log('Starting image path fix...\n');

for (const [dir, prefix] of Object.entries(subjects)) {
  const fullDir = path.join(quizDir, dir);
  
  if (!fs.existsSync(fullDir)) {
    console.log(`Skipping ${dir} - directory not found`);
    continue;
  }

  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.js'));
  console.log(`\nChecking ${files.length} files in ${dir}/...`);

  for (const file of files) {
    const filePath = path.join(fullDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const before = content;

    // Pattern: "imageUrl": "Images/filename.ext"
    // Replace with: "imageUrl": "Images/Subject/filename.ext"
    content = content.replace(
      /"imageUrl":\s*"Images\/([^"]+)"/g,
      `"imageUrl": "Images/${prefix}/$1"`
    );

    if (content !== before) {
      fs.writeFileSync(filePath, content, 'utf8');
      fileCount++;
      const changes = (content.match(/"imageUrl":/g) || []).length;
      console.log(`  ✓ Fixed: ${file} (${changes} images)`);
      totalFixed += changes;
    }
  }
}

console.log(`\n✅ Complete! Fixed ${totalFixed} image paths in ${fileCount} files.`);
