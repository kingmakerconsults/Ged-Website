#!/usr/bin/env node
/**
 * Canonicalize all image paths to /images/... format
 * Migrates from legacy /frontend/Images/... to new /images/... public paths
 */

import { readFile, writeFile, readdir } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function findAllJsonFiles(dir, results = []) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      // Skip node_modules, .git, dist, etc.
      if (entry.isDirectory() && !['node_modules', '.git', 'dist', 'build', '.vite'].includes(entry.name)) {
        await findAllJsonFiles(fullPath, results);
      } else if (entry.isFile() && extname(entry.name).toLowerCase() === '.json') {
        results.push(fullPath);
      }
    }
  } catch (err) {
    // Skip inaccessible directories
  }
  
  return results;
}

async function canonicalizeImagePaths(filePath) {
  const content = await readFile(filePath, 'utf8');
  let updated = content;
  let replacements = 0;
  
  // Pattern 1: /frontend/Images/... → /images/...
  const pattern1 = /\/frontend\/Images\//g;
  const matches1 = (content.match(pattern1) || []).length;
  if (matches1 > 0) {
    updated = updated.replace(pattern1, '/images/');
    replacements += matches1;
  }
  
  // Pattern 2: frontend/Images/... → /images/...
  const pattern2 = /([^\/])frontend\/Images\//g;
  const matches2 = (content.match(pattern2) || []).length;
  if (matches2 > 0) {
    updated = updated.replace(pattern2, '$1/images/');
    replacements += matches2;
  }
  
  // Pattern 3: "Images/... → "/images/...
  const pattern3 = /"Images\//g;
  const matches3 = (content.match(pattern3) || []).length;
  if (matches3 > 0) {
    updated = updated.replace(pattern3, '"/images/');
    replacements += matches3;
  }
  
  return { updated, replacements, hasChanges: updated !== content };
}

async function main() {
  const rootDir = join(__dirname, '..');
  
  console.log('🔍 Scanning for JSON files with image paths...\n');
  
  const jsonFiles = await findAllJsonFiles(rootDir);
  
  console.log(`Found ${jsonFiles.length} JSON files\n`);
  console.log('🔧 Canonicalizing image paths to /images/...\n');
  
  let totalReplacements = 0;
  const updatedFiles = [];
  
  for (const filePath of jsonFiles) {
    try {
      const { updated, replacements, hasChanges } = await canonicalizeImagePaths(filePath);
      
      if (hasChanges) {
        await writeFile(filePath, updated, 'utf8');
        const relativePath = filePath.replace(rootDir, '').replace(/^[\\/]/, '');
        console.log(`✓ ${relativePath}: ${replacements} path(s) canonicalized`);
        updatedFiles.push({ path: relativePath, count: replacements });
        totalReplacements += replacements;
      }
    } catch (err) {
      const relativePath = filePath.replace(rootDir, '').replace(/^[\\/]/, '');
      console.error(`✗ Error processing ${relativePath}:`, err.message);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 CANONICALIZATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Files updated: ${updatedFiles.length}`);
  console.log(`Total paths canonicalized: ${totalReplacements}`);
  console.log('='.repeat(60));
  
  if (updatedFiles.length > 0) {
    console.log('\nUpdated files:');
    updatedFiles.forEach(f => {
      console.log(`  - ${f.path} (${f.count})`);
    });
  }
  
  console.log('\n✓ All image paths canonicalized to /images/ format!');
  console.log('\nNext steps:');
  console.log('1. Update frontend code to use /images/ instead of /frontend/Images/');
  console.log('2. Update backend server routes to serve /images/ from frontend/public/images/');
  console.log('3. Test all image-based quizzes and tools');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
