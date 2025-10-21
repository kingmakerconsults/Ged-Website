import fs from "node:fs";

const raw = fs.readFileSync("image_metadata_final.json", "utf8");
let arr;
try {
  arr = JSON.parse(raw);
} catch (e) {
  console.error("INVALID_JSON", e.message);
  process.exit(1);
}
if (!Array.isArray(arr)) {
  console.error("NOT_ARRAY");
  process.exit(1);
}

let bad = 0;
const fileRx = /\.(png|jpe?g|gif|webp|svg)$/i;

for (const [i, m] of arr.entries()) {
  if (!m.file || !fileRx.test(m.file)) {
    console.error("MISSING_OR_BAD_FILE", i, m.file);
    bad++;
  }
  if (m.caption && fileRx.test(m.caption)) {
    console.error("FILENAME_IN_CAPTION", i, m.caption);
    bad++;
  }
  if (m.alt && fileRx.test(m.alt)) {
    console.error("FILENAME_IN_ALT", i, m.alt);
    bad++;
  }
}
if (bad) {
  console.error(`INDEX_ERRORS:${bad}`);
  process.exit(2);
}
console.log(`OK:${arr.length} records`);
