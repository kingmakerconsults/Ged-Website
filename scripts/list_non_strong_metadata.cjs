#!/usr/bin/env node
/*
 * Bucket image metadata into strong / adequate / thin tiers (mirroring the
 * floors enforced by tools/generateImageMetadata.js --strong) and emit a
 * priorityQueue-shaped JSON file that the generator's --from-audit flag can
 * consume directly.
 *
 * Usage:
 *   node scripts/list_non_strong_metadata.cjs                # writes report
 *   node scripts/list_non_strong_metadata.cjs --tier=thin    # only thin
 *   node scripts/list_non_strong_metadata.cjs --tier=non-strong  # default
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const META_PATH = path.join(
  ROOT,
  'backend',
  'data',
  'image_metadata_final.json'
);
const OUT_DIR = path.join(ROOT, 'reports');

const args = process.argv.slice(2);
function flag(name, def) {
  const m = args.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!m) return def;
  if (m.includes('=')) return m.split('=').slice(1).join('=');
  return true;
}

const tier = String(flag('tier', 'non-strong')).toLowerCase();

function score(entry) {
  const desc = String(entry.detailedDescription || '').trim();
  const alt = String(entry.altText || '').trim();
  const ve = Array.isArray(entry.visualElements) ? entry.visualElements : [];
  const kw = Array.isArray(entry.keywords) ? entry.keywords : [];
  const qs = Array.isArray(entry.questionSeeds) ? entry.questionSeeds : [];
  const ud = String(entry.usageDirectives || '').trim();

  const reasons = [];
  if (alt.length < 25) reasons.push(`altText<25 (${alt.length})`);
  if (desc.length < 140) reasons.push(`desc<140 (${desc.length})`);
  if (ve.length < 4) reasons.push(`visualElements<4 (${ve.length})`);
  if (kw.length < 5) reasons.push(`keywords<5 (${kw.length})`);
  if (qs.length < 3) reasons.push(`questionSeeds<3 (${qs.length})`);
  if (!ud) reasons.push('usageDirectives missing');
  if (reasons.length) return { tier: 'thin', reasons };

  const strongReasons = [];
  if (alt.length < 40) strongReasons.push(`altText<40 (${alt.length})`);
  if (desc.length < 280) strongReasons.push(`desc<280 (${desc.length})`);
  if (ve.length < 8) strongReasons.push(`visualElements<8 (${ve.length})`);
  if (kw.length < 10) strongReasons.push(`keywords<10 (${kw.length})`);
  if (qs.length < 5) strongReasons.push(`questionSeeds<5 (${qs.length})`);
  const aa = Array.isArray(entry.allowedActions) ? entry.allowedActions : [];
  if (aa.length < 2) strongReasons.push(`allowedActions<2 (${aa.length})`);
  const hasAnchor =
    /\d/.test(desc) ||
    /[A-Z][a-z]+(?:\s+[A-Z][a-z]+)/.test(desc) ||
    /"[^"]+"|'[^']+'/.test(desc);
  if (!hasAnchor)
    strongReasons.push('desc lacks date/named-entity/quoted-label');
  const vagueSeeds = qs.filter((s) => String(s).trim().split(/\s+/).length < 6);
  if (vagueSeeds.length > 0)
    strongReasons.push(`${vagueSeeds.length} vague seed(s)`);

  if (strongReasons.length === 0) return { tier: 'strong', reasons: [] };
  return { tier: 'adequate', reasons: strongReasons };
}

function priorityScore(reasons) {
  // More gaps + bigger gaps = higher priority for refresh.
  return Math.min(100, 30 + reasons.length * 10);
}

function main() {
  const raw = fs.readFileSync(META_PATH, 'utf8');
  const data = JSON.parse(raw);
  const entries = Array.isArray(data) ? data : Object.values(data);

  const buckets = { strong: [], adequate: [], thin: [] };
  for (const e of entries) {
    const r = score(e);
    buckets[r.tier].push({ entry: e, reasons: r.reasons });
  }

  const include =
    tier === 'thin'
      ? ['thin']
      : tier === 'adequate'
        ? ['adequate']
        : tier === 'strong'
          ? ['strong']
          : ['adequate', 'thin']; // default: non-strong

  const queue = [];
  for (const t of include) {
    for (const item of buckets[t]) {
      queue.push({
        subject: item.entry.subject || '',
        fileName: item.entry.fileName || '',
        filePath: item.entry.filePath || '',
        currentTier: t,
        reasons: item.reasons,
        priorityScore: priorityScore(item.reasons),
      });
    }
  }

  queue.sort((a, b) => b.priorityScore - a.priorityScore);

  const summary = {
    totalEntries: entries.length,
    strong: buckets.strong.length,
    adequate: buckets.adequate.length,
    thin: buckets.thin.length,
    selectedTiers: include,
    selectedCount: queue.length,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, 'image_metadata_non_strong.json');
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      { generatedAt: new Date().toISOString(), summary, priorityQueue: queue },
      null,
      2
    )
  );
  console.log(JSON.stringify(summary, null, 2));
  console.log('Wrote', path.relative(ROOT, outPath).replace(/\\/g, '/'));
}

main();
