#!/usr/bin/env node
import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const META_PATH = path.join(ROOT, "image_metadata_final.json");

function loadMeta() {
  if (!fs.existsSync(META_PATH)) {
    console.error("image_metadata_final.json not found at repo root.");
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(META_PATH, "utf8"));
}

function stats() {
  const data = loadMeta();
  const byS = {};
  for (const x of data) {
    const s = x.subject || "Unknown";
    const t = (x.dominantType || "unknown").toLowerCase();
    byS[s] ??= { total: 0, types: {} };
    byS[s].total++;
    byS[s].types[t] = (byS[s].types[t] || 0) + 1;
  }
  console.log(JSON.stringify(byS, null, 2));
}

function keywords(subject = "") {
  const data = loadMeta();
  const want = subject.toLowerCase();
  const count = {};
  for (const x of data) {
    if (want && (x.subject || "").toLowerCase() !== want) continue;
    for (const k of (x.keywords || [])) {
      const kk = String(k).toLowerCase();
      count[kk] = (count[kk] || 0) + 1;
    }
  }
  const top = Object.entries(count).sort((a,b)=>b[1]-a[1]).slice(0,50);
  console.table(top.map(([k,v])=>({keyword:k, count:v})));
}

function missing(typesCSV = "map,chart,diagram,photo,table") {
  const target = new Set(typesCSV.split(",").map(s=>s.trim().toLowerCase()).filter(Boolean));
  const data = loadMeta();
  const have = new Set(data.map(x => (x.dominantType || "").toLowerCase()));
  const miss = [...target].filter(t => !have.has(t));
  console.log("Missing types:", miss);
}

function verifyPaths() {
  const data = loadMeta();
  let bad = 0;
  for (const x of data) {
    const p = path.join(ROOT, x.filePath);
    if (!fs.existsSync(p)) {
      bad++; console.log("Missing:", x.filePath);
    }
  }
  console.log("Missing total:", bad);
}

const args = process.argv.slice(2);
if (args.includes("--stats")) stats();
else if (args.includes("--keywords")) keywords(args[args.indexOf("--keywords")+1] || "");
else if (args.includes("--missing")) missing(args[args.indexOf("--missing")+1] || "");
else if (args.includes("--verify-paths")) verifyPaths();
else {
  console.log(`Usage:
  node tools/gov-image-harvester/inspect.mjs --stats
  node tools/gov-image-harvester/inspect.mjs --keywords [Science|Social Studies]
  node tools/gov-image-harvester/inspect.mjs --missing "map,chart,diagram,photo,table"
  node tools/gov-image-harvester/inspect.mjs --verify-paths`);
  process.exit(1);
}
