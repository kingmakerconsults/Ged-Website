const fs = require('fs');
const path = require('path');
const { ALL_QUIZZES } = require('./backend/data/quizzes/index.js');

const IMAGE_ROOT = path.join(__dirname, 'frontend', 'public');

const report = {
  missing: [],
  existing: [],
  totalQuestions: 0,
  imageQuestions: 0,
};

function checkImage(imgUrl, context) {
  if (!imgUrl) return;

  // Normalize URL to file path
  // Expected format: /images/Subject/File.ext
  let relativePath = imgUrl;

  // Remove query params
  relativePath = relativePath.split('?')[0];

  // Remove leading slash
  if (relativePath.startsWith('/')) {
    relativePath = relativePath.substring(1);
  }

  // Decode URI components (e.g. %20 -> space)
  relativePath = decodeURIComponent(relativePath);

  const fullPath = path.join(IMAGE_ROOT, relativePath);

  if (fs.existsSync(fullPath)) {
    report.existing.push({ url: imgUrl, path: fullPath, context });
  } else {
    report.missing.push({ url: imgUrl, path: fullPath, context });
  }
}

function extractImagesFromText(text) {
  const images = [];
  const regex = /src=["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    images.push(match[1]);
  }
  return images;
}

function audit() {
  console.log('Available Subjects:', Object.keys(ALL_QUIZZES));
  const subjects = ['Social Studies', 'Science']; // Focus on these as requested

  for (const subjectId of subjects) {
    const subject = ALL_QUIZZES[subjectId];
    if (!subject) {
      console.log(`Subject ${subjectId} not found.`);
      continue;
    }

    console.log(`Auditing ${subjectId}...`);
    console.log('Subject keys:', Object.keys(subject));

    let subjectImageCount = 0;

    if (subject.categories) {
      Object.values(subject.categories).forEach((category) => {
        if (category.topics) {
          category.topics.forEach((topic) => {
            if (topic.questions) {
              topic.questions.forEach((q, index) => {
                report.totalQuestions++;
                let hasImage = false;

                // Check imageUrl property
                if (q.imageUrl) {
                  hasImage = true;
                  checkImage(
                    q.imageUrl,
                    `${subjectId} - ${category.title || 'Unknown Category'} - ${
                      topic.title
                    } - Q${index + 1} (imageUrl)`
                  );
                }

                // Check content.imageURL property (legacy structure)
                if (q.content && q.content.imageURL) {
                  hasImage = true;
                  checkImage(
                    q.content.imageURL,
                    `${subjectId} - ${category.title || 'Unknown Category'} - ${
                      topic.title
                    } - Q${index + 1} (content.imageURL)`
                  );
                }

                // Check images in question text
                const qImages = extractImagesFromText(q.question);
                if (qImages.length > 0) {
                  hasImage = true;
                  qImages.forEach((img) =>
                    checkImage(
                      img,
                      `${subjectId} - ${
                        category.title || 'Unknown Category'
                      } - ${topic.title} - Q${index + 1} (question text)`
                    )
                  );
                }

                // Check images in explanation text
                if (q.explanation) {
                  const eImages = extractImagesFromText(q.explanation);
                  if (eImages.length > 0) {
                    eImages.forEach((img) =>
                      checkImage(
                        img,
                        `${subjectId} - ${
                          category.title || 'Unknown Category'
                        } - ${topic.title} - Q${index + 1} (explanation text)`
                      )
                    );
                  }
                }

                // Check explanationImage property
                if (q.explanationImage) {
                  checkImage(
                    q.explanationImage,
                    `${subjectId} - ${category.title || 'Unknown Category'} - ${
                      topic.title
                    } - Q${index + 1} (explanationImage)`
                  );
                }

                if (hasImage) {
                  report.imageQuestions++;
                  subjectImageCount++;
                }
              });
            }
          });
        }
      });
    }
    console.log(
      `  > Found ${subjectImageCount} image questions in ${subjectId}`
    );
  }

  console.log('Audit Complete.');
  console.log(`Total Questions Scanned: ${report.totalQuestions}`);
  console.log(`Image Questions Found: ${report.imageQuestions}`);
  console.log(`Missing Images: ${report.missing.length}`);
  console.log(`Existing Images: ${report.existing.length}`);

  if (report.missing.length > 0) {
    console.log('\n--- MISSING IMAGES REPORT ---');
    const grouped = {};
    report.missing.forEach((item) => {
      if (!grouped[item.url]) grouped[item.url] = [];
      grouped[item.url].push(item.context);
    });

    for (const [url, contexts] of Object.entries(grouped)) {
      console.log(`\nImage: ${url}`);
      console.log(
        `Expected Path: ${path.join(
          IMAGE_ROOT,
          decodeURIComponent(url.startsWith('/') ? url.substring(1) : url)
        )}`
      );
      console.log('Used in:');
      contexts.slice(0, 5).forEach((c) => console.log(`  - ${c}`));
      if (contexts.length > 5)
        console.log(`  ... and ${contexts.length - 5} more`);
    }

    // Save detailed report
    fs.writeFileSync(
      'image-audit-detailed-report-v2.json',
      JSON.stringify(report.missing, null, 2)
    );
    console.log(
      '\nDetailed missing image report saved to image-audit-detailed-report-v2.json'
    );
  }
}

audit();
