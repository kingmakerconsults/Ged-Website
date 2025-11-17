#!/usr/bin/env node
/**
 * Validate all image paths have subject folders
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// Find all JS/JSX files with image references
const checkPaths = [
  path.join(rootDir, 'backend', 'data', 'quizzes'),
  path.join(rootDir, 'frontend'),
  path.join(rootDir, 'app.jsx'),
];

let issues = [];
let totalChecked = 0;

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory() && !entry.name.includes('node_modules')) {
      scanDirectory(fullPath);
    } else if (
      entry.isFile() &&
      (entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))
    ) {
      checkFile(fullPath);
    }
  }
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  totalChecked++;

  // Look for imageUrl: "Images/something" without a subject folder
  // Valid: Images/Math/, Images/Science/, Images/Social Studies/
  // Invalid: Images/filename.png (no subject folder)

  const invalidPattern =
    /imageUrl:\s*["']Images\/(?!Math\/|Science\/|Social Studies\/)([^"']+)["']/g;
  let match;

  while ((match = invalidPattern.exec(content)) !== null) {
    issues.push({
      file: path.relative(rootDir, filePath),
      path: `Images/${match[1]}`,
      line: content.substring(0, match.index).split('\n').length,
    });
  }
}

console.log('🔍 Validating image paths...\n');

for (const checkPath of checkPaths) {
  if (fs.existsSync(checkPath)) {
    const stat = fs.statSync(checkPath);
    if (stat.isDirectory()) {
      scanDirectory(checkPath);
    } else {
      checkFile(checkPath);
    }
  }
}

console.log(`Checked ${totalChecked} files\n`);

if (issues.length === 0) {
  console.log('✅ All image paths have subject folders!');
  console.log('\nValid patterns found:');
  console.log('  - Images/Math/...');
  console.log('  - Images/Science/...');
  console.log('  - Images/Social Studies/...');
} else {
  console.log(
    `⚠️  Found ${issues.length} image paths without subject folders:\n`
  );
  issues.forEach((issue) => {
    console.log(`  ${issue.file}:${issue.line}`);
    console.log(`    └─ ${issue.path}\n`);
  });
  process.exit(1);
}
