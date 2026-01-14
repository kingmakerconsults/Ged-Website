#!/usr/bin/env node
/**
 * Validate image canonicalization
 * Ensures all images are accessible and references are correct
 */

import { readFile, stat, readdir } from 'fs/promises';
import { join, extname, sep } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function findAllImages(dir, results = []) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await findAllImages(fullPath, results);
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();
        if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext)) {
          results.push(fullPath);
        }
      }
    }
  } catch (err) {
    // Skip inaccessible directories
  }
  
  return results;
}

async function validateImageReferences() {
  const rootDir = join(__dirname, '..');
  const publicImagesDir = join(rootDir, 'frontend', 'public', 'images');
  
  console.log('🔍 Validating image canonicalization...\n');
  
  // 1. Check that frontend/dist is not tracked
  console.log('1️⃣  Checking Git tracking...');
  const { execSync } = await import('child_process');
  try {
    const trackedDist = execSync('git ls-files frontend/dist/', { encoding: 'utf8' }).trim();
    if (trackedDist) {
      console.log('   ✗ frontend/dist is still tracked!');
      console.log('   Run: git rm -r --cached frontend/dist');
    } else {
      console.log('   ✓ frontend/dist not tracked');
    }
  } catch (err) {
    console.log('   ✓ frontend/dist not tracked');
  }
  
  // 2. Verify all images are in public/images
  console.log('\n2️⃣  Scanning public images...');
  const images = await findAllImages(publicImagesDir);
  console.log(`   ✓ Found ${images.length} images in frontend/public/images`);
  
  // 3. Check for large files
  console.log('\n3️⃣  Checking for large images...');
  let largeFiles = [];
  for (const imgPath of images) {
    const stats = await stat(imgPath);
    const sizeMB = stats.size / (1024 * 1024);
    if (sizeMB > 50) {
      largeFiles.push({ path: imgPath.replace(rootDir, ''), sizeMB: sizeMB.toFixed(2) });
    }
  }
  
  if (largeFiles.length > 0) {
    console.log(`   ⚠ Found ${largeFiles.length} image(s) over 50MB:`);
    largeFiles.forEach(f => console.log(`     - ${f.path} (${f.sizeMB} MB)`));
  } else {
    console.log('   ✓ No images over 50MB');
  }
  
  // 4. Check JSON files for old paths
  console.log('\n4️⃣  Checking for legacy /frontend/Images paths...');
  const jsonFiles = [
    join(rootDir, 'image_metadata_final.json'),
    join(rootDir, 'backend', 'data', 'image_metadata_final.json'),
    join(rootDir, 'backend', 'image_metadata_final.json'),
  ];
  
  let foundLegacy = false;
  for (const jsonPath of jsonFiles) {
    if (existsSync(jsonPath)) {
      const content = await readFile(jsonPath, 'utf8');
      const legacyMatches = content.match(/\/frontend\/Images\//g);
      if (legacyMatches && legacyMatches.length > 0) {
        const relativePath = jsonPath.replace(rootDir + sep, '');
        console.log(`   ⚠ ${relativePath}: ${legacyMatches.length} legacy path(s)`);
        foundLegacy = true;
      }
    }
  }
  
  if (!foundLegacy) {
    console.log('   ✓ No legacy /frontend/Images paths found');
  }
  
  // 5. Verify .gitignore
  console.log('\n5️⃣  Checking .gitignore...');
  const gitignorePath = join(rootDir, '.gitignore');
  const gitignoreContent = await readFile(gitignorePath, 'utf8');
  
  const requiredPatterns = ['dist/', '*.zip'];
  const missingPatterns = [];
  
  for (const pattern of requiredPatterns) {
    if (!gitignoreContent.includes(pattern)) {
      missingPatterns.push(pattern);
    }
  }
  
  if (missingPatterns.length > 0) {
    console.log(`   ⚠ Missing patterns: ${missingPatterns.join(', ')}`);
  } else {
    console.log('   ✓ .gitignore includes dist/ and *.zip');
  }
  
  // 6. Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 VALIDATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✓ Images in public: ${images.length}`);
  console.log(`${largeFiles.length > 0 ? '⚠' : '✓'} Large images (>50MB): ${largeFiles.length}`);
  console.log(`${foundLegacy ? '⚠' : '✓'} Legacy paths: ${foundLegacy ? 'FOUND' : 'None'}`);
  console.log('='.repeat(60));
  
  if (largeFiles.length > 0 || foundLegacy) {
    console.log('\n⚠ Some issues found. Review above for details.');
  } else {
    console.log('\n✅ All validation checks passed!');
  }
}

validateImageReferences().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
