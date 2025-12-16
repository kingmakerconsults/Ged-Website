import fs from 'fs/promises';
import path from 'path';
import https from 'https';

/**
 * Fetches a public-domain US states SVG from Wikimedia Commons and saves to /public/maps/us-regions.svg
 * Then attempts to annotate per-state <path> elements with data-state and data-region using /data/usRegions.json
 */

const WIKI_SVG_URL =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Blank%20US%20map%20(states%20only).svg?download';

async function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          return resolve(download(res.headers.location));
        }
        if (res.statusCode !== 200) {
          return reject(new Error('HTTP ' + res.statusCode));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', reject);
  });
}

async function annotate(svgText, regions) {
  // Add data-state to paths that have id attributes like "CA", "TX" etc.
  // Many Wikimedia maps use ids; we conservatively add data-state if id is a 2-letter code.
  let out = svgText.replace(
    /<path([^>]*?)id="([A-Za-z]{2})"([^>]*)>/g,
    (m, pre, id, post) => {
      let region = '';
      for (const [rName, arr] of Object.entries(regions)) {
        if (arr.includes(id.toUpperCase())) {
          region = rName;
          break;
        }
      }
      const attrs = `${pre}id="${id}" data-state="${id.toUpperCase()}"${
        region ? ` data-region="${region}"` : ''
      }${post}`;
      return `<path${attrs}>`;
    }
  );
  return out;
}

async function main() {
  const repoRoot = process.cwd();
  const outDir = path.join(repoRoot, 'public', 'maps');
  const outPath = path.join(outDir, 'us-regions.svg');
  const regionsPath = path.join(repoRoot, 'data', 'usRegions.json');
  await fs.mkdir(outDir, { recursive: true });

  console.log('Fetching US states SVG from Wikimedia...');
  const svgBuf = await download(WIKI_SVG_URL);
  const svgText = svgBuf.toString('utf8');
  const regions = JSON.parse(await fs.readFile(regionsPath, 'utf8'));
  const annotated = await annotate(svgText, regions);
  await fs.writeFile(outPath, annotated, 'utf8');
  console.log('Saved annotated SVG to', outPath);
}

main().catch((err) => {
  console.error('Failed to fetch/annotate SVG:', err?.message || err);
  process.exit(1);
});
