const fs = require('fs');
const path = require('path');

// Configuration
const METADATA_PATH = path.join(
  __dirname,
  '../backend/data/image_metadata_final.json'
);
const QUIZ_DATA_DIR = path.join(__dirname, '../backend/data/quizzes');
const SUPPLEMENTAL_PATH = path.join(QUIZ_DATA_DIR, 'supplemental.topics.json');

const NEW_CATEGORY_NAME = 'Image Based Practice';

// Helper functions
function loadJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}
function saveJSON(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

function generateOptions() {
  return [
    {
      text: 'Option A (Placeholder)',
      rationale: 'Correct answer placeholder.',
      isCorrect: true,
    },
    {
      text: 'Option B (Placeholder)',
      rationale: 'Incorrect answer placeholder.',
      isCorrect: false,
    },
    {
      text: 'Option C (Placeholder)',
      rationale: 'Incorrect answer placeholder.',
      isCorrect: false,
    },
    {
      text: 'Option D (Placeholder)',
      rationale: 'Incorrect answer placeholder.',
      isCorrect: false,
    },
  ];
}

function process() {
  console.log('Loading metadata...');
  const metadata = loadJSON(METADATA_PATH);
  console.log(`Loaded ${metadata.length} image entries.`);

  // 1. Filter and Select Images (Every 2nd image for ~50%)
  const selectedImages = metadata.filter((_, i) => i % 2 === 0);
  console.log(
    `Selected ${selectedImages.length} images for question generation.`
  );

  // 2. Group by Subject -> Category
  const organized = {};

  selectedImages.forEach((img) => {
    const subj = img.subject;
    let cat = img.category || 'General';
    if (cat === '') cat = 'General';

    if (!organized[subj]) organized[subj] = {};
    if (!organized[subj][cat]) organized[subj][cat] = [];

    organized[subj][cat].push(img);
  });

  let supplementalTopics = [];
  if (fs.existsSync(SUPPLEMENTAL_PATH)) {
    supplementalTopics = loadJSON(SUPPLEMENTAL_PATH);
  }

  // 3. Process each Subject
  // Mapping for subject folders in backend/data/quizzes/
  const SUBJECT_FOLDERS = {
    Math: 'math',
    Science: 'science',
    'Social Studies': 'social-studies',
    RLA: 'rla',
    'Reasoning Through Language Arts (RLA)': 'rla',
  };

  for (const [subject, categories] of Object.entries(organized)) {
    const folderName = SUBJECT_FOLDERS[subject];
    if (!folderName) {
      console.warn(`No folder mapping for subject: ${subject}, skipping.`);
      continue;
    }

    const subjectDir = path.join(QUIZ_DATA_DIR, folderName);
    if (!fs.existsSync(subjectDir)) {
      fs.mkdirSync(subjectDir, { recursive: true });
    }

    // We will create ONE main "Image Based Practice" file per subject,
    // OR one file per sub-category if we want granular topics.
    // Let's go with granular topics as that fits the existing model better.

    for (const [metaCat, images] of Object.entries(categories)) {
      const topicId = `${subject
        .toLowerCase()
        .replace(/\s+/g, '_')}_img_${metaCat
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')}`;
      const fileName = `${topicId}.js`;
      const filePath = path.join(subjectDir, fileName);

      // Generate Question Array for this topic
      const questions = images.map((img, idx) => {
        const seed =
          img.questionSeeds && img.questionSeeds.length > 0
            ? img.questionSeeds[0]
            : 'Analyze the image and answer the question.';

        return {
          questionNumber: idx + 1,
          question: seed,
          imageURL: img.filePath,
          answerOptions: generateOptions(),
        };
      });

      // Write Question File (CommonJS)
      const fileContent = `module.exports = ${JSON.stringify(
        questions,
        null,
        2
      )};`;
      fs.writeFileSync(filePath, fileContent, 'utf8');
      console.log(`Wrote ${questions.length} questions to ${filePath}`);

      // Update Supplemental Topics Registry
      // Check if topic exists to avoid dupes
      const existingIdx = supplementalTopics.findIndex(
        (t) => t.topic.id === topicId
      );
      const topicEntry = {
        subjectKey: subject,
        subjectFolder: folderName,
        categoryName: NEW_CATEGORY_NAME, // Group all under "Image Based Practice"
        topic: {
          id: topicId,
          title: `${metaCat} Visual Practice`,
          description: `Practice questions for ${metaCat} based on images.`,
          config: {
            calculator: subject === 'Math' || subject === 'Science',
            parts: [
              { name: 'Visual Practice', questionCount: questions.length },
            ],
          },
          // Relative path from backend/data/quizzes/index.js
          file: `backend/data/quizzes/${folderName}/${fileName}`,
          // Note: backend/data/quizzes/index.js uses require(path.join(__dirname, subjectFolder, topicId))
          // Actually, looking at index.js: loadQuestions helper takes (subjectFolder, topicId).
          // It constructs path: path.join(__dirname, subjectFolder, `${topicId}.js`)
          // So we don't strictly need "file" property in the JSON if index.js infers it,
          // BUT index.js doesn't seem to use "file" property from supplemental.json directly?
          // Wait, let's double check `buildAllQuizzes` in index.js.
          // It calls `loadQuestions(entry.subjectFolder || '', entry.topic.id)`.
          // So it relies on naming convention.
          // We just need to make sure the file exists at <dir>/<subjectFolder>/<topicId>.js
        },
      };

      if (existingIdx >= 0) {
        supplementalTopics[existingIdx] = topicEntry;
      } else {
        supplementalTopics.push(topicEntry);
      }
    }
  }

  console.log('Updating supplemental.topics.json...');
  saveJSON(SUPPLEMENTAL_PATH, supplementalTopics);
  console.log('Done.');
}

process();
