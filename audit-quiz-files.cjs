#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const quizFiles = fs
  .readdirSync('public/quizzes')
  .filter((f) => f.endsWith('.json'))
  .map((f) => `public/quizzes/${f}`)
  .sort();

const imageDir = 'frontend/public/images';
const scienceImagesDir = path.join(imageDir, 'Science');
const socialStudiesImagesDir = path.join(imageDir, 'Social Studies');

// Get all images
const getImages = (dir) => {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((f) => f.isFile())
    .map((f) => f.name);
};

const scienceImages = getImages(scienceImagesDir);
const ssImages = getImages(socialStudiesImagesDir);

console.log('Science Images:', scienceImages.length);
console.log('Social Studies Images:', ssImages.length);

const subjectMap = {
  math: 'MATH',
  rla: 'RLA',
  science: 'SCI',
  'social-studies': 'SS',
  workforce: 'WF',
};

const fileData = {};

quizFiles.forEach((filePath) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let questionCount = 0;
    let hasUAM = false;
    let hasImageQuestions = false;

    const traverse = (obj) => {
      if (Array.isArray(obj)) {
        obj.forEach(traverse);
      } else if (obj && typeof obj === 'object') {
        if (obj.questionNumber !== undefined) {
          questionCount++;
          if (obj.uam) hasUAM = true;
          if (obj.stimulusImage || obj.imageURL || obj.imageUrl)
            hasImageQuestions = true;
        }
        Object.values(obj).forEach(traverse);
      }
    };

    traverse(data);

    // Extract subject and part from filename
    const match = filePath.match(
      /\/([^/]+)\.(quizzes\.(part[12])|quizzes|extras)/
    );
    const subject = match ? match[1] : 'unknown';
    const part = filePath.includes('part1')
      ? 'P1'
      : filePath.includes('part2')
      ? 'P2'
      : 'N/A';

    fileData[filePath] = {
      subject,
      part,
      questionCount,
      hasUAM,
      hasImageQuestions,
      path: filePath,
    };

    console.log(
      `${filePath}: ${questionCount} questions, UAM: ${hasUAM}, Images: ${hasImageQuestions}`
    );
  } catch (e) {
    console.log(`${filePath}: ERROR - ${e.message}`);
  }
});

// Categorize science images
const scienceCategories = {
  genetics: scienceImages.filter(
    (f) =>
      f.includes('punnett') ||
      f.includes('genetics') ||
      f.includes('genotype') ||
      f.includes('phenotype') ||
      f.includes('mendelian') ||
      f.includes('reginald')
  ),
  physics: scienceImages.filter((f) => f.includes('ged-scince-fig')),
  weather: scienceImages.filter(
    (f) =>
      f.includes('hurricane') ||
      f.includes('nasa') ||
      f.includes('weather') ||
      f.includes('Questions-are-based') // Graph questions
  ),
  humanBiology: scienceImages.filter(
    (f) => f.includes('human-') || f.includes('human_')
  ),
  general: scienceImages.filter(
    (f) =>
      !f.includes('punnett') &&
      !f.includes('genetics') &&
      !f.includes('genotype') &&
      !f.includes('phenotype') &&
      !f.includes('mendelian') &&
      !f.includes('reginald') &&
      !f.includes('ged-scince-fig') &&
      !f.includes('hurricane') &&
      !f.includes('nasa') &&
      !f.includes('human-') &&
      !f.includes('human_') &&
      !f.includes('Questions-are-based') &&
      !f.includes('Screenshot') &&
      !f.includes('licensed-image') &&
      !f.includes('ged-SCIENCE') &&
      !f.includes('ged-sci-1')
  ),
};

// Categorize social studies images
const ssCategories = {
  maps: ssImages.filter(
    (f) =>
      f.includes('territorial') ||
      f.includes('map') ||
      f.includes('Louisiana') ||
      f.includes('World') ||
      f.includes('world')
  ),
  politicalCartoons: ssImages.filter(
    (f) =>
      f.includes('Bosses') ||
      f.includes('political-cartoon') ||
      f.includes('cartoon') ||
      f.includes('puck-magazine') ||
      f.includes('political-ideologies') ||
      f.includes('join-or-die') ||
      f.includes('cartoonist') ||
      f.includes('clifford') ||
      f.includes('king-andrew') ||
      f.includes('Protectors')
  ),
  chartsGraphs: ssImages.filter(
    (f) =>
      f.includes('Questions-are-based') ||
      f.includes('This-Question') ||
      f.includes('bar graph') ||
      f.includes('graph') ||
      f.includes('statistics') ||
      f.includes('WorldWarII')
  ),
  historical: ssImages.filter(
    (f) =>
      f.includes('civil-war') ||
      f.includes('civil-rights') ||
      f.includes('american-civil-war') ||
      f.includes('reconstruction') ||
      f.includes('slavery') ||
      f.includes('abolition') ||
      f.includes('gilded-age') ||
      f.includes('great-depression') ||
      f.includes('robber-baron') ||
      f.includes('industrial') ||
      f.includes('propagand') ||
      f.includes('jews-in')
  ),
  wars: ssImages.filter(
    (f) =>
      f.includes('cold-war') ||
      f.includes('world-war') ||
      f.includes('wartime') ||
      f.includes('defense') ||
      f.includes('war-death')
  ),
  general: ssImages.filter(
    (f) =>
      !f.includes('territorial') &&
      !f.includes('map') &&
      !f.includes('Louisiana') &&
      !f.includes('World') &&
      !f.includes('world') &&
      !f.includes('Bosses') &&
      !f.includes('political-cartoon') &&
      !f.includes('cartoon') &&
      !f.includes('puck-magazine') &&
      !f.includes('political-ideologies') &&
      !f.includes('join-or-die') &&
      !f.includes('cartoonist') &&
      !f.includes('clifford') &&
      !f.includes('king-andrew') &&
      !f.includes('Protectors') &&
      !f.includes('Questions-are-based') &&
      !f.includes('This-Question') &&
      !f.includes('bar graph') &&
      !f.includes('graph') &&
      !f.includes('statistics') &&
      !f.includes('WorldWarII') &&
      !f.includes('civil-war') &&
      !f.includes('civil-rights') &&
      !f.includes('american-civil-war') &&
      !f.includes('reconstruction') &&
      !f.includes('slavery') &&
      !f.includes('abolition') &&
      !f.includes('gilded-age') &&
      !f.includes('great-depression') &&
      !f.includes('robber-baron') &&
      !f.includes('industrial') &&
      !f.includes('propagand') &&
      !f.includes('jews-in') &&
      !f.includes('cold-war') &&
      !f.includes('world-war') &&
      !f.includes('wartime') &&
      !f.includes('defense') &&
      !f.includes('war-death') &&
      !f.includes('Screenshot') &&
      !f.includes('licensed-image') &&
      !f.includes('ged-') &&
      !f.includes('FDR') &&
      !f.includes('035fa172')
  ),
};

console.log('\n=== SCIENCE IMAGES ===');
console.log('Genetics:', scienceCategories.genetics.length);
console.log('Physics:', scienceCategories.physics.length);
console.log('Weather:', scienceCategories.weather.length);
console.log('Human Biology:', scienceCategories.humanBiology.length);
console.log('General:', scienceCategories.general.length);

console.log('\n=== SOCIAL STUDIES IMAGES ===');
console.log('Maps:', ssCategories.maps.length);
console.log('Political Cartoons:', ssCategories.politicalCartoons.length);
console.log('Charts/Graphs:', ssCategories.chartsGraphs.length);
console.log('Historical:', ssCategories.historical.length);
console.log('Wars:', ssCategories.wars.length);
console.log('General:', ssCategories.general.length);

const report = {
  timestamp: new Date().toISOString(),
  quizFiles: fileData,
  images: {
    science: {
      total: scienceImages.length,
      categories: {
        genetics: scienceCategories.genetics,
        physics: scienceCategories.physics,
        weather: scienceCategories.weather,
        humanBiology: scienceCategories.humanBiology,
        general: scienceCategories.general,
      },
    },
    socialStudies: {
      total: ssImages.length,
      categories: {
        maps: ssCategories.maps,
        politicalCartoons: ssCategories.politicalCartoons,
        chartsGraphs: ssCategories.chartsGraphs,
        historical: ssCategories.historical,
        wars: ssCategories.wars,
        general: ssCategories.general,
      },
    },
  },
};

fs.writeFileSync('audit-quiz-report.json', JSON.stringify(report, null, 2));
console.log('\nReport saved to audit-quiz-report.json');
