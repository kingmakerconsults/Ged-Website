const fs = require('fs');

function stripBOM(s) { return s.charCodeAt(0) === 0xFEFF ? s.slice(1) : s; }

// Turn arbitrary content into ONE valid JSON array
function coerceToArray(raw) {
  const s = stripBOM(String(raw)).trim();

  // Already valid JSON? return as is
  try { JSON.parse(s); return s; } catch (e) {}

  // Many objects glued together: {}{}{}  -> [{},{},{}]
  if (s.startsWith('{')) {
    const fixed = '[' + s.replace(/}\\s*{/g, '},{') + ']';
    JSON.parse(fixed);
    return fixed;
  }

  // Starts with [, but trailing junk after final ] -> trim to last ]
  if (s.startsWith('[')) {
    const last = s.lastIndexOf(']');
    if (last > -1) {
      const fixed = s.slice(0, last + 1);
      JSON.parse(fixed);
      return fixed;
    }
  }

  // Last resort: bracket whole thing
  const bracketed = '[' + s + ']';
  JSON.parse(bracketed);
  return bracketed;
}

function repairFile(p) {
  if (!fs.existsSync(p)) { console.error('❌ Not found: ' + p); process.exit(1); }
  const raw = fs.readFileSync(p, 'utf8');
  let out;
  try { out = coerceToArray(raw); }
  catch (e) {
    console.error('❌ Could not repair ' + p + '\nMake it a JSON array like: [ { ... }, { ... } ]');
    console.error(String(e && e.message || e));
    process.exit(1);
  }
  const pretty = JSON.stringify(JSON.parse(out), null, 2);
  fs.writeFileSync(p, pretty, 'utf8');
  console.log('✅ Repaired & saved ' + p + ' (bytes: ' + pretty.length + ')');
}

const targets = process.argv.slice(2);
if (!targets.length) {
  console.error('Usage: node tools/repair_meta.js backend/data/image_metadata_final.json [backend/data/image_metadata.json]');
  process.exit(1);
}
targets.forEach(repairFile);
