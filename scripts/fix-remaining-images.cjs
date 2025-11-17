#!/usr/bin/env node
/**
 * Fix all remaining image paths across the workspace
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

console.log('Scanning for remaining image path issues...\n');

// Files to check
const files = [
  path.join(rootDir, 'app.jsx'),
  path.join(rootDir, 'frontend', 'data', 'quiz_data.js'),
].filter((f) => fs.existsSync(f));

let totalChanges = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  const before = content;
  let changes = 0;

  // Science images
  content = content.replace(
    /imageUrl:\s*["']Images\/((?:ged-scince|sci-)[^"']+)["']/g,
    (match, filename) => {
      changes++;
      return `imageUrl: "Images/Science/${filename}"`;
    }
  );

  // Math images
  content = content.replace(
    /imageUrl:\s*["']Images\/(math_[^"']+)["']/g,
    (match, filename) => {
      changes++;
      return `imageUrl: "Images/Math/${filename}"`;
    }
  );

  // Social Studies images - common patterns
  const ssPatterns = [
    'join_or_die',
    'Louisiana_Purchase',
    'territorial-gains',
    'licensed-image',
    'Bosses-of-the-Senate',
    'Protectors-of-Our',
    'Questions-are-based',
    'Question-is-based',
    'political-map',
    'Iron_Curtain',
    'WorldWarII',
    'ged-grsph',
  ];

  for (const pattern of ssPatterns) {
    const regex = new RegExp(
      `imageUrl:\\s*["']Images\\/([^"']*${pattern}[^"']*)["']`,
      'gi'
    );
    content = content.replace(regex, (match, filename) => {
      changes++;
      return `imageUrl: "Images/Social Studies/${filename}"`;
    });
  }

  if (content !== before) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalChanges += changes;
    console.log(`✓ Fixed ${changes} paths in ${path.basename(filePath)}`);
  }
}

console.log(`\n✅ Total: ${totalChanges} image paths fixed`);
