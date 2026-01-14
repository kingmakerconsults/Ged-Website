#!/usr/bin/env node
/**
 * Optimize large PNG images in frontend/public/images/
 * Converts oversized PNGs to optimized JPEGs with quality control
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TARGET_MAX_SIZE_MB = 2; // Target max file size in MB
const TARGET_MAX_WIDTH = 2000; // Max width in pixels
const JPEG_QUALITY = 85; // JPEG quality (0-100)
const SIZE_THRESHOLD_MB = 10; // Only process files larger than this

async function getFileSizeMB(filePath) {
  const stats = await stat(filePath);
  return stats.size / (1024 * 1024);
}

async function findLargeImages(dir, results = []) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      await findLargeImages(fullPath, results);
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === '.png') {
      const sizeMB = await getFileSizeMB(fullPath);
      if (sizeMB > SIZE_THRESHOLD_MB) {
        results.push({ path: fullPath, sizeMB });
      }
    }
  }

  return results;
}

async function optimizeImage(imagePath) {
  const originalSize = await getFileSizeMB(imagePath);
  console.log(`\n📸 Processing: ${imagePath}`);
  console.log(`   Original size: ${originalSize.toFixed(2)} MB`);

  // Load image and get metadata
  const image = sharp(imagePath);
  const metadata = await image.metadata();

  console.log(`   Dimensions: ${metadata.width}x${metadata.height}`);

  // Calculate resize dimensions if needed
  let resizeWidth = metadata.width;
  if (metadata.width > TARGET_MAX_WIDTH) {
    resizeWidth = TARGET_MAX_WIDTH;
    console.log(`   Resizing to max width: ${TARGET_MAX_WIDTH}px`);
  }

  // Convert to JPEG with optimization
  const outputPath = imagePath.replace('.png', '.jpg');

  await image
    .resize(resizeWidth, null, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({
      quality: JPEG_QUALITY,
      progressive: true,
      mozjpeg: true,
    })
    .toFile(outputPath);

  const newSize = await getFileSizeMB(outputPath);
  const reduction = (((originalSize - newSize) / originalSize) * 100).toFixed(
    1
  );

  console.log(`   ✓ Created: ${outputPath}`);
  console.log(
    `   New size: ${newSize.toFixed(2)} MB (${reduction}% reduction)`
  );

  if (newSize < TARGET_MAX_SIZE_MB) {
    console.log(`   ✓ Under ${TARGET_MAX_SIZE_MB}MB target`);
  } else {
    console.log(`   ⚠ Still over ${TARGET_MAX_SIZE_MB}MB target`);
  }

  return {
    originalPath: imagePath,
    outputPath,
    originalSize,
    newSize,
    reduction,
  };
}

async function main() {
  const imagesDir = join(__dirname, '..', 'frontend', 'public', 'images');

  console.log('🔍 Scanning for large PNG files...');
  console.log(`Directory: ${imagesDir}\n`);

  const largeImages = await findLargeImages(imagesDir);

  if (largeImages.length === 0) {
    console.log('✓ No large PNG files found (all under 10MB)');
    return;
  }

  console.log(`Found ${largeImages.length} large PNG file(s):\n`);
  largeImages.forEach((img) => {
    console.log(`  - ${img.path} (${img.sizeMB.toFixed(2)} MB)`);
  });

  console.log('\n🔧 Starting optimization...');

  const results = [];
  for (const img of largeImages) {
    try {
      const result = await optimizeImage(img.path);
      results.push(result);
    } catch (err) {
      console.error(`   ✗ Error processing ${img.path}:`, err.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(60));

  let totalOriginal = 0;
  let totalNew = 0;

  results.forEach((r) => {
    totalOriginal += r.originalSize;
    totalNew += r.newSize;
    console.log(`\n${r.originalPath.split('\\').pop()}`);
    console.log(
      `  ${r.originalSize.toFixed(2)} MB → ${r.newSize.toFixed(2)} MB (${
        r.reduction
      }% reduction)`
    );
  });

  const totalReduction = (
    ((totalOriginal - totalNew) / totalOriginal) *
    100
  ).toFixed(1);

  console.log('\n' + '='.repeat(60));
  console.log(`Total original: ${totalOriginal.toFixed(2)} MB`);
  console.log(`Total optimized: ${totalNew.toFixed(2)} MB`);
  console.log(`Total reduction: ${totalReduction}%`);
  console.log('='.repeat(60));

  console.log('\n📝 Next steps:');
  console.log('1. Review the generated .jpg files');
  console.log(
    '2. Update image references in JSON/code to use .jpg instead of .png'
  );
  console.log('3. Delete the original .png files once confirmed');
  console.log('4. Commit the optimized .jpg files');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
