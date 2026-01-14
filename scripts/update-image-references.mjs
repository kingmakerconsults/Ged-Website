#!/usr/bin/env node
/**
 * Update image references from .png to .jpg in JSON files
 * For the 19 optimized Social Studies images
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OPTIMIZED_IMAGES = [
  'american_civil_war_0004',
  'american_civil_war_0006',
  'amphitheatrum_johnsonianum_0001',
  'cartoonist_0001',
  'civil_rights_movement_0005',
  'civil_rights_movement_0007',
  'civil_rights_movement_0008',
  'gilded_age_0001',
  'gilded_age_0003',
  'history_of_propaganda_0001',
  'monroe_doctrine_0002',
  'monroe_doctrine_0005',
  'political_cartoon_0001',
  'political_cartoon_0003',
  'political_cartoon_0004',
  'political_ideologies_in_the_united_states_0002',
  'puck_magazine_0007',
  'puck_magazine_0010',
  'robber_baron_industrialist_0001',
];

async function findJsonFiles(dir, results = []) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (
      entry.isDirectory() &&
      !entry.name.startsWith('.') &&
      entry.name !== 'node_modules'
    ) {
      await findJsonFiles(fullPath, results);
    } else if (
      entry.isFile() &&
      extname(entry.name).toLowerCase() === '.json'
    ) {
      results.push(fullPath);
    }
  }

  return results;
}

async function updateImageReferences(filePath) {
  const content = await readFile(filePath, 'utf8');
  let updated = content;
  let replacements = 0;

  // Update each optimized image reference
  for (const imageName of OPTIMIZED_IMAGES) {
    // Handle both encoded and non-encoded paths
    const patterns = [
      new RegExp(`/images/Social Studies/${imageName}\\.png`, 'g'),
      new RegExp(`/images/Social%20Studies/${imageName}\\.png`, 'g'),
      new RegExp(`\\\\images\\\\Social Studies\\\\${imageName}\\.png`, 'g'),
      new RegExp(`"fileName": "${imageName}\\.png"`, 'g'),
    ];

    const replacements_map = [
      `/images/Social Studies/${imageName}.jpg`,
      `/images/Social%20Studies/${imageName}.jpg`,
      `\\images\\Social Studies\\${imageName}.jpg`,
      `"fileName": "${imageName}.jpg"`,
    ];

    patterns.forEach((pattern, idx) => {
      const matches = (updated.match(pattern) || []).length;
      if (matches > 0) {
        updated = updated.replace(pattern, replacements_map[idx]);
        replacements += matches;
      }
    });
  }

  return { updated, replacements };
}

async function main() {
  const rootDir = join(__dirname, '..');

  console.log('🔍 Scanning for JSON files...\n');

  const jsonFiles = await findJsonFiles(rootDir);

  console.log(`Found ${jsonFiles.length} JSON files\n`);
  console.log('🔧 Updating image references from .png to .jpg...\n');

  let totalReplacements = 0;
  const updatedFiles = [];

  for (const filePath of jsonFiles) {
    try {
      const { updated, replacements } = await updateImageReferences(filePath);

      if (replacements > 0) {
        await writeFile(filePath, updated, 'utf8');
        const relativePath = filePath
          .replace(rootDir, '')
          .replace(/^[\\/]/, '');
        console.log(`✓ ${relativePath}: ${replacements} reference(s) updated`);
        updatedFiles.push({ path: relativePath, count: replacements });
        totalReplacements += replacements;
      }
    } catch (err) {
      console.error(`✗ Error processing ${filePath}:`, err.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 UPDATE SUMMARY');
  console.log('='.repeat(60));
  console.log(`Files updated: ${updatedFiles.length}`);
  console.log(`Total replacements: ${totalReplacements}`);
  console.log('='.repeat(60));

  if (updatedFiles.length > 0) {
    console.log('\nUpdated files:');
    updatedFiles.forEach((f) => {
      console.log(`  - ${f.path} (${f.count})`);
    });
  }

  console.log('\n✓ Image references updated successfully!');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
