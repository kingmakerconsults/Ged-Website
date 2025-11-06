// scripts/upload-ged-passages.js
import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
  console.error("Missing GOOGLE_AI_API_KEY in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function main() {
  const filePath = path.resolve("data/ged_passages.json");
  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    process.exit(1);
  }
  const fileBuffer = fs.readFileSync(filePath);

  const uploaded = await genAI.files.upload({
    file: {
      data: fileBuffer,
      mimeType: "application/json",
      name: "GED Passages Collection"
    }
  });

  console.log("Uploaded file:");
  console.log(uploaded);
  console.log("Set this in .env as GEMINI_PASSAGES_FILE_ID =", uploaded.file.name);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
