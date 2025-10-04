// In backend/generate_metadata.js

const vision = require('@google-cloud/vision');
const fs = require('fs');
const path = require('path');

// Tell the client library where to find your credentials
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, 'gcloud-credentials.json');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Define the root directory for your images and the subjects you have folders for
const imagesDir = path.join(__dirname, '..', 'frontend', 'Images');
const subjects = ['Social Studies', 'Science']; // Add 'RLA', 'Math' here as you add photos

async function processImages() {
  const allMetadata = [];

  console.log('Starting image processing...');

  for (const subject of subjects) {
    const subjectDir = path.join(imagesDir, subject);
    if (!fs.existsSync(subjectDir)) {
      console.log(`Warning: Directory not found for subject "${subject}". Skipping.`);
      continue;
    }

    const imageFiles = fs.readdirSync(subjectDir).filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

    for (const fileName of imageFiles) {
      const filePath = path.join(subjectDir, fileName);
      console.log(`Processing: ${fileName}`);

      try {
        // Send image to Vision API and ask for multiple features
        const [result] = await client.webDetection(filePath);
        const webDetection = result.webDetection;
        
        // --- Extract Data from API Response ---
        let description = 'No description generated.';
        if (webDetection && webDetection.bestGuessLabels && webDetection.bestGuessLabels.length > 0) {
          description = `This is an image related to: ${webDetection.bestGuessLabels[0].label}.`;
        }

        const keywords = webDetection.webEntities
          .map(entity => entity.description)
          .filter(Boolean); // Filter out any empty or null descriptions

        // --- Format into your JSON Structure ---
        const metadataEntry = {
          fileName: fileName,
          filePath: `/frontend/Images/${subject}/${fileName}`, // The web-accessible path
          altText: description,
          detailedDescription: description, // Placeholder to be manually improved
          subject: subject,
          keywords: keywords.slice(0, 10), // Limit to top 10 keywords
          analysisPoints: [
            "Manual review needed to add specific analysis points."
          ],
          commonMisconceptions: [
            "Manual review needed to add common misconceptions."
          ],
          usageDirectives: [
              "Generate a question that asks the user to determine the main idea of the image.",
              "Create a question that requires interpreting the data or symbolism shown."
          ],
          difficulty: "Medium"
        };

        allMetadata.push(metadataEntry);

      } catch (error) {
        console.error(`Error processing ${fileName}:`, error.message);
      }
    }
  }

  // Save the complete metadata file
  const outputPath = path.join(__dirname, 'image_metadata_final.json');
  fs.writeFileSync(outputPath, JSON.stringify(allMetadata, null, 2));
  console.log(`\n✅ Done! Metadata for ${allMetadata.length} images saved to ${outputPath}`);
}

processImages();