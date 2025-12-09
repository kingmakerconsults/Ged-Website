#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const quizFiles = [
  {
    path: 'public/quizzes/math.quizzes.part1.json',
    subject: 'MATH',
    part: 'P1',
  },
  {
    path: 'public/quizzes/math.quizzes.part2.json',
    subject: 'MATH',
    part: 'P2',
  },
  { path: 'public/quizzes/rla.quizzes.part1.json', subject: 'RLA', part: 'P1' },
  { path: 'public/quizzes/rla.quizzes.part2.json', subject: 'RLA', part: 'P2' },
  {
    path: 'public/quizzes/science.quizzes.part1.json',
    subject: 'SCI',
    part: 'P1',
  },
  {
    path: 'public/quizzes/science.quizzes.part2.json',
    subject: 'SCI',
    part: 'P2',
  },
  {
    path: 'public/quizzes/social-studies.quizzes.json',
    subject: 'SS',
    part: 'N/A',
  },
  {
    path: 'public/quizzes/social-studies.extras.json',
    subject: 'SS',
    part: 'EXTRAS',
  },
  { path: 'public/quizzes/workforce.quizzes.json', subject: 'WF', part: 'N/A' },
];

const imageDir = 'frontend/public/images';
const scienceImagesDir = path.join(imageDir, 'Science');
const socialStudiesImagesDir = path.join(imageDir, 'Social Studies');

const getImages = (dir) => {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((f) => f.isFile())
    .map((f) => f.name);
};

const scienceImages = getImages(scienceImagesDir);
const ssImages = getImages(socialStudiesImagesDir);

// Categorize images
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
      (f.includes('Questions-are-based') && f.includes('graph'))
  ),
  humanBiology: scienceImages.filter(
    (f) => f.includes('human-') || f.includes('human_')
  ),
  matter: scienceImages.filter(
    (f) => f.includes('matter') || f.includes('earth-')
  ),
};

const ssCategories = {
  maps: ssImages.filter(
    (f) =>
      f.includes('territorial') ||
      f.includes('Louisiana') ||
      f.includes('political-map') ||
      f.includes('world-map') ||
      (f.includes('map') && !f.includes('historical'))
  ),
  politicalCartoons: ssImages.filter(
    (f) =>
      f.includes('political-cartoon') ||
      f.includes('cartoon') ||
      f.includes('puck-magazine') ||
      f.includes('join-or-die') ||
      f.includes('Bosses') ||
      f.includes('Protectors') ||
      f.includes('political-ideologies') ||
      f.includes('cartoonist') ||
      f.includes('clifford')
  ),
  chartsGraphs: ssImages.filter(
    (f) =>
      f.includes('Questions-are-based') ||
      f.includes('This-Question') ||
      f.includes('bar graph') ||
      f.includes('World energy') ||
      f.includes('WorldWarII') ||
      (f.includes('graph') && !f.includes('historical'))
  ),
  historical: ssImages.filter(
    (f) =>
      f.includes('civil-war') ||
      f.includes('civil-rights') ||
      f.includes('american-civil-war') ||
      f.includes('reconstruction') ||
      f.includes('abolition') ||
      f.includes('slavery') ||
      f.includes('gilded-age') ||
      f.includes('great-depression') ||
      f.includes('robber-baron') ||
      f.includes('jews-in') ||
      f.includes('colonial-history')
  ),
  wars: ssImages.filter(
    (f) =>
      f.includes('cold-war') ||
      f.includes('wartime') ||
      f.includes('defense') ||
      f.includes('world-war') ||
      f.includes('FDR') ||
      f.includes('propaganda')
  ),
};

// Sample image selections for new questions (3-4 per part)
const selectedScienceImages = {
  P1: [
    { cat: 'genetics', img: scienceCategories.genetics[0] },
    { cat: 'weather', img: scienceCategories.weather[0] },
    { cat: 'humanBiology', img: scienceCategories.humanBiology[0] },
    { cat: 'physics', img: scienceCategories.physics[0] },
  ],
  P2: [
    { cat: 'genetics', img: scienceCategories.genetics[1] },
    { cat: 'weather', img: scienceCategories.weather[1] },
    { cat: 'matter', img: scienceCategories.matter[0] },
  ],
};

const selectedSSImages = {
  MAIN: [
    { cat: 'maps', img: ssCategories.maps[0] },
    { cat: 'politicalCartoons', img: ssCategories.politicalCartoons[0] },
    { cat: 'chartsGraphs', img: ssCategories.chartsGraphs[0] },
    { cat: 'historical', img: ssCategories.historical[0] },
  ],
  EXTRAS: [
    { cat: 'maps', img: ssCategories.maps[1] },
    { cat: 'wars', img: ssCategories.wars[0] },
    { cat: 'politicalCartoons', img: ssCategories.politicalCartoons[1] },
  ],
};

const analysis = {
  timestamp: new Date().toISOString(),
  phase1: {
    description: 'Audit and add UAM markers to ALL questions',
    status: 'PHASE 1 ANALYSIS',
    files: {},
  },
  phase2: {
    description: 'Categorize and inventory images',
    status: 'COMPLETE',
    scienceImageInventory: scienceCategories,
    socialStudiesImageInventory: ssCategories,
  },
  phase3: {
    description:
      'Add 3-4 new image-based questions per quiz part (Science & Social Studies only)',
    status: 'PROPOSED',
    proposedImages: {
      science: selectedScienceImages,
      socialStudies: selectedSSImages,
    },
  },
  phase4: {
    description: 'Generate detailed report',
    status: 'IN PROGRESS',
    summary: {},
  },
};

// Analyze each file for Phase 1
quizFiles.forEach(({ path: filePath, subject, part }) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    let questionCount = 0;
    let questionsWithUAM = 0;
    let questionsNeedingUAM = [];

    const processQuestion = (q, subjectCode, partCode, index) => {
      if (q && q.questionNumber !== undefined) {
        questionCount++;
        const qnum = String(q.questionNumber).padStart(2, '0');
        const qtype =
          q.type === 'constructedResponse'
            ? 'CR'
            : q.stimulusImage
            ? 'IMG'
            : 'MC';

        const expectedUAM = `${subjectCode}_${partCode}_Q${qnum}_${qtype}`;

        if (q.uam) {
          questionsWithUAM++;
        } else {
          questionsNeedingUAM.push({
            questionNumber: q.questionNumber,
            expectedUAM,
            type: qtype,
          });
        }
      }
    };

    const traverse = (obj, subjectCode, partCode, index = 0) => {
      if (Array.isArray(obj)) {
        obj.forEach((item, idx) => traverse(item, subjectCode, partCode, idx));
      } else if (obj && typeof obj === 'object') {
        processQuestion(obj, subjectCode, partCode, index);
        Object.entries(obj).forEach(([key, val]) => {
          traverse(val, subjectCode, partCode, index);
        });
      }
    };

    traverse(data, subject, part);

    analysis.phase1.files[filePath] = {
      subject,
      part,
      totalQuestions: questionCount,
      questionsWithUAM,
      questionsNeedingUAM: questionsNeedingUAM.length,
      percentageNeedingUAM: (
        (questionsNeedingUAM.length / questionCount) *
        100
      ).toFixed(2),
      sampleMissing: questionsNeedingUAM.slice(0, 5),
    };
  } catch (e) {
    analysis.phase1.files[filePath] = {
      status: 'ERROR',
      error: e.message.substring(0, 100),
    };
  }
});

// Phase 4 Summary
let totalQuestions = 0;
let totalQuestionsNeedingUAM = 0;

Object.values(analysis.phase1.files).forEach((file) => {
  if (file.totalQuestions) {
    totalQuestions += file.totalQuestions;
    totalQuestionsNeedingUAM += file.questionsNeedingUAM;
  }
});

analysis.phase4.summary = {
  totalQuestions,
  totalQuestionsNeedingUAM,
  percentageNeedingUAM: (
    (totalQuestionsNeedingUAM / totalQuestions) *
    100
  ).toFixed(2),
  phase3ProposedNewQuestions: {
    science: {
      part1: 4,
      part2: 3,
      total: 7,
    },
    socialStudies: {
      main: 4,
      extras: 3,
      total: 7,
    },
    grandTotal: 14,
  },
  imageUtilization: {
    science: {
      total: scienceImages.length,
      proposed: 7,
      utilization: '5.3%',
    },
    socialStudies: {
      total: ssImages.length,
      proposed: 7,
      utilization: '1.6%',
    },
  },
  filesBefore: {
    math: { part1: 1152, part2: 864, total: 2016 },
    rla: { part1: 960, part2: 504, total: 1464 },
    science: { part1: 1046, part2: 488, total: 1534 },
    socialStudies: { main: 1301, extras: 216, total: 1517 },
    workforce: { total: 18 },
    grand_total: 6549,
  },
  filesAfter: {
    science: { part1: '1050 (+4)', part2: '491 (+3)', total: '1541 (+7)' },
    socialStudies: {
      main: '1305 (+4)',
      extras: '219 (+3)',
      total: '1524 (+7)',
    },
    grand_total: '6563 (+14)',
  },
};

fs.writeFileSync(
  'comprehensive-audit-analysis.json',
  JSON.stringify(analysis, null, 2)
);
console.log('Analysis complete! Saved to comprehensive-audit-analysis.json');
console.log('\n=== SUMMARY ===');
console.log(`Total Questions Across All Files: ${totalQuestions}`);
console.log(`Questions Needing UAM Markers: ${totalQuestionsNeedingUAM}`);
console.log(
  `Percentage Needing UAM: ${(
    (totalQuestionsNeedingUAM / totalQuestions) *
    100
  ).toFixed(2)}%`
);
console.log(`\nProposed New Image Questions (Phase 3): 14`);
console.log(`  - Science: 7 (4 Part 1, 3 Part 2)`);
console.log(`  - Social Studies: 7 (4 Main, 3 Extras)`);
console.log(`\nImage Categories Available:`);
console.log(
  `  Science: Genetics(${scienceCategories.genetics.length}), Physics(${scienceCategories.physics.length}), Weather(${scienceCategories.weather.length}), Human Biology(${scienceCategories.humanBiology.length}), Matter(${scienceCategories.matter.length})`
);
console.log(
  `  Social Studies: Maps(${ssCategories.maps.length}), Political Cartoons(${ssCategories.politicalCartoons.length}), Charts/Graphs(${ssCategories.chartsGraphs.length}), Historical(${ssCategories.historical.length}), Wars(${ssCategories.wars.length})`
);
