import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.cwd();
const IMG_SOURCES = [
  { dir: path.join(ROOT, "backend/public/img"), tags: [] },
  { dir: path.join(ROOT, "public/img"), tags: [] },
  { dir: path.join(ROOT, "assets/social"), tags: ["social-studies"] },
  { dir: path.join(ROOT, "frontend/Images/Social Studies"), tags: ["social-studies"] },
  { dir: path.join(ROOT, "frontend/Images/Science"), tags: ["science"] },
  { dir: path.join(ROOT, "frontend/Images/Math"), tags: ["math"] },
  { dir: path.join(ROOT, "frontend/Images/RLA"), tags: ["rla"] }
];

const MAX_OCR = 500;
const TARGET_PATH = path.join(ROOT, "backend/data/image_metadata_final.json");
const MIRROR_PATH = path.join(ROOT, "image_metadata_final.json");

function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex").slice(0, 16);
}

function cleanSentence(text) {
  return text.replace(/\s+/g, " ").trim();
}

function prettyTitle(file) {
  const base = file.replace(/\.[^.]+$/, "");
  const normalized = base.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  if (!normalized) return "Image";
  const sanitized = normalized.replace(/\bscreenshot\b/gi, "image");
  return sanitized.replace(/\b\w/g, (m) => m.toUpperCase());
}

function readPossibleSidecar(p) {
  try {
    const txt = fs.readFileSync(p + ".json", "utf8");
    return JSON.parse(txt);
  } catch {
    return null;
  }
}

function toSafeString(value, fallback = "") {
  if (typeof value !== "string") return fallback;
  return cleanSentence(value).slice(0, 160);
}

function deriveTags(sidecarTags, extraTags = []) {
  if (!Array.isArray(sidecarTags)) {
    return [...extraTags];
  }
  const seen = new Set();
  const merged = [];
  for (const tag of [...sidecarTags, ...extraTags]) {
    if (typeof tag !== "string") continue;
    const trimmed = tag.trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    merged.push(trimmed);
  }
  return merged;
}

function guessType(file) {
  const n = file.toLowerCase();
  if (n.includes("map")) return "map";
  if (n.includes("chart") || n.includes("graph")) return "chart";
  if (n.includes("table")) return "table";
  if (n.includes("cartoon")) return "cartoon";
  if (n.includes("document") || n.includes("declaration") || n.includes("act")) return "document";
  return "photo";
}

function collect(source) {
  const { dir, tags: extraTags = [] } = source;
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g|gif|webp|svg)$/i.test(f));
  const out = [];
  for (const file of files) {
    const full = path.join(dir, file);
    const buf = fs.readFileSync(full);
    const id = sha256(buf);
    const sidecar = readPossibleSidecar(full) || {};

    const credit = toSafeString(sidecar.credit || sidecar.source || "Public domain / educational use") || "Public domain / educational use";
    const type = toSafeString(sidecar.type, guessType(file)) || guessType(file);
    const baseTitle = sidecar.title || prettyTitle(file);
    const title = toSafeString(baseTitle, prettyTitle(file)) || prettyTitle(file);
    const alt = toSafeString(sidecar.alt || sidecar.altText || title || "Image", "Image");
    const caption = toSafeString(sidecar.caption || sidecar.description || "");
    const sourceUrl = typeof sidecar.sourceUrl === "string" ? sidecar.sourceUrl.trim() : "";
    const year = Number.isInteger(sidecar.year) ? sidecar.year : null;

    let ocrText = typeof sidecar.ocrText === "string" ? cleanSentence(sidecar.ocrText) : "";
    if (ocrText.length > MAX_OCR) {
      ocrText = `${ocrText.slice(0, MAX_OCR)}…`;
    }

    const tags = deriveTags(sidecar.tags, extraTags);

    out.push({
      id,
      file,
      type,
      title,
      alt,
      caption,
      credit,
      sourceUrl,
      tags,
      year,
      ocrText
    });
  }
  return out;
}

const all = IMG_SOURCES.flatMap(collect);
const uniq = Object.values(
  Object.fromEntries(all.map((entry) => [entry.file, entry]))
);
uniq.sort((a, b) => a.file.localeCompare(b.file));

const json = JSON.stringify(uniq, null, 2);
fs.mkdirSync(path.dirname(TARGET_PATH), { recursive: true });
fs.writeFileSync(TARGET_PATH, json);
if (MIRROR_PATH !== TARGET_PATH) {
  fs.writeFileSync(MIRROR_PATH, json);
}
console.log(`Wrote ${uniq.length} image records to ${TARGET_PATH}`);
if (MIRROR_PATH !== TARGET_PATH) {
  console.log(`Mirrored ${uniq.length} image records to ${MIRROR_PATH}`);
}
