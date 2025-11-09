import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const IMAGE_DIR = path.resolve(__dirname, "../frontend/Images");
const METADATA_FILE = path.resolve(__dirname, "../backend/image_metadata_final.json");

const PROMPT = `You are labeling images for a GED learning platform.
You will receive one image at a time.
Return only valid JSON. No markdown, no backticks.
Your job is to make the image easy for other AIs to find and turn into questions.

Output exactly this JSON shape:
{
  "fileName": "",
  "subject": "",
  "category": "",
  "altText": "",
  "detailedDescription": "",
  "extractedText": "",
  "visualElements": [],
  "keywords": [],
  "questionSeeds": [],
  "usageDirectives": ""
}

Field rules:
- fileName: set to the actual image filename.
- subject: one of "Math", "Science", "Social Studies", "RLA", or "" if unknown.
- category: short folder-style label like "graphs", "tables", "biology-diagrams", "civics-documents", or "".
- altText: <= 125 characters, literal description of the image.
- detailedDescription: 2–4 sentences explaining the layout and purpose.
- extractedText: transcribe any visible text in order.
- visualElements: array naming important parts you see.
- keywords: 6–15 search terms mixing subject and visual terms.
- questionSeeds: 2–5 short instructions other AIs can turn into questions; make them depend on the image.
- usageDirectives: short note like "Use for data-interpretation questions at easy/medium level."

If something is missing in the image, leave "" or [].
Return only the JSON object.`;

async function fileToGenerativePart(filePath) {
  const data = await fs.readFile(filePath);
  return {
    inlineData: {
      data: data.toString("base64"),
      mimeType: "image/jpeg", // Assuming jpeg, adjust if other types are present
    },
  };
}

function stripMarkdown(text) {
  return text.replace(/```json/g, "").replace(/```/g, "");
}

async function generateMetadataForImage(imagePath) {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), 30000) // 30 second timeout
    );

    const imageParts = [await fileToGenerativePart(imagePath)];
    const generationPromise = model.generateContent([PROMPT, ...imageParts]);

    const result = await Promise.race([generationPromise, timeoutPromise]);

    const response = await result.response;
    const text = response.text();
    return JSON.parse(stripMarkdown(text));
  } catch (error) {
    console.error(`Failed to process ${path.basename(imagePath)}: ${error.message}`);
    return null;
  }
}

function normalizeMetadata(metadata, imagePath) {
    const fileName = path.basename(imagePath);
    const subjectMatch = imagePath.match(/[\\/](Math|Science|Social Studies)[\\/]/);
    const subject = subjectMatch ? subjectMatch[1] : "";

    const normalized = {
        fileName: fileName,
        subject: metadata.subject || subject,
        category: metadata.category || "",
        altText: metadata.altText || "",
        detailedDescription: metadata.detailedDescription || "",
        extractedText: metadata.extractedText || "",
        visualElements: metadata.visualElements || [],
        keywords: metadata.keywords || [],
        questionSeeds: metadata.questionSeeds || [],
        usageDirectives: metadata.usageDirectives || ""
    };

    return normalized;
}


async function main() {
  const refresh = process.argv.includes("--refresh");
  let metadata = {};

  try {
    const data = await fs.readFile(METADATA_FILE, "utf-8");
    const existingMetadata = JSON.parse(data);
    if (Array.isArray(existingMetadata)) {
        existingMetadata.forEach(item => {
            metadata[item.fileName] = item;
        });
    } else {
        metadata = existingMetadata;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
        console.error("Error reading metadata file:", error);
        return;
    }
    // File doesn't exist, will create a new one
  }

  const imageFiles = [];
  const subjectFolders = await fs.readdir(IMAGE_DIR);
  for (const subject of subjectFolders) {
      const subjectPath = path.join(IMAGE_DIR, subject);
      if((await fs.stat(subjectPath)).isDirectory()){
          const files = await fs.readdir(subjectPath);
          for (const file of files) {
              imageFiles.push(path.join(subjectPath, file));
          }
      }
  }

  let updatedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;
  const failedImages = [];

  for (const imagePath of imageFiles) {
    const fileName = path.basename(imagePath);
    if (metadata[fileName] && !refresh) {
      skippedCount++;
      continue;
    }

    console.log(`Processing ${fileName}...`);
    const generatedMetadata = await generateMetadataForImage(imagePath);

    if (generatedMetadata) {
      const normalized = normalizeMetadata(generatedMetadata, imagePath);
      metadata[fileName] = normalized;
      updatedCount++;
    } else {
      failedCount++;
      failedImages.push(fileName);
    }
  }

  const metadataArray = Object.values(metadata);
  await fs.writeFile(METADATA_FILE, JSON.stringify(metadataArray, null, 2));

  console.log("\n--- Metadata Generation Summary ---");
  console.log(`Total images found: ${imageFiles.length}`);
  console.log(`Successfully processed: ${updatedCount}`);
  console.log(`Skipped (existing): ${skippedCount}`);
  console.log(`Failed to process: ${failedCount}`);
  if (failedCount > 0) {
    console.log("Failed images:", failedImages);
  }
  console.log("-----------------------------------");
  console.log("\nNote: The root-level 'image_metadata_final.json' is a duplicate and is not used by the server. The canonical file is in the 'backend' directory.");

}

main();
