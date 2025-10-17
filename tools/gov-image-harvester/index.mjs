#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';
import { fetchHtml, extractPageInfo } from './crawler.mjs';
import { downloadAndNormalize, createSha1, decideFileName, writeImage } from './image-pipeline.mjs';
import { loadMetadata, buildIndexes, upsertEntry, saveMetadata } from './metadata.mjs';
import crypto from 'node:crypto';

const SUBJECT_CONFIG = {
  Science: {
    folder: 'Science',
    allowedDomains: new Set(['nasa.gov', 'climate.nasa.gov', 'noaa.gov', 'nhc.noaa.gov', 'usgs.gov', 'epa.gov', 'nih.gov', 'ncbi.nlm.nih.gov']),
    sitemaps: [
      'https://www.nasa.gov/sitemap.xml',
      'https://climate.nasa.gov/sitemap.xml',
      'https://www.noaa.gov/sitemap.xml',
      'https://www.usgs.gov/sitemap.xml',
      'https://www.epa.gov/sitemap.xml',
      'https://www.nih.gov/sitemap.xml'
    ]
  },
  'Social Studies': {
    folder: 'Social Studies',
    allowedDomains: new Set([
      'loc.gov',
      'libraryofcongress.gov',
      'archives.gov',
      'census.gov',
      'bls.gov',
      'nps.gov',
      'data.gov',
      'carto.com',
      'nationalgeographic.com',
      'education.nationalgeographic.org',
      'pewresearch.org',
      'statista.com',
      'ourworldindata.org',
      'worldbank.org',
      'imf.org',
      'cia.gov',
      'un.org',
      'who.int',
      'data.oecd.org',
      'oecd.org',
      'britannica.com',
      'reuters.com',
      'graphics.reuters.com',
      'pbs.org',
      'smithsonianmag.com',
      'teachinghistory.org',
      'ed.gov',
      'opendata.arcgis.com'
    ]),
    sitemaps: [
      'https://www.loc.gov/sitemap.xml',
      'https://www.archives.gov/sitemap.xml',
      'https://www.census.gov/sitemap.xml',
      'https://www.bls.gov/sitemap.xml',
      'https://www.nps.gov/sitemap.xml',
      'https://www.data.gov/sitemap.xml'
    ]
  }
};

const METADATA_PATH = path.resolve('image_metadata_final.json');
const STATE_PATH = path.resolve('tools/gov-image-harvester/.crawl-state.json');
const MAX_SEED_PER_SITEMAP = 80;
const MAX_PAGES = 300;
const MAX_IMAGES_PER_SEED = 3;

const xmlParser = new XMLParser({ ignoreAttributes: false, trimValues: true });

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      if (['subject', 'topics', 'limit'].includes(key)) {
        args[key] = argv[i + 1];
        i += 1;
      } else if (key === 'dry') {
        args.dry = true;
      }
    }
  }
  return args;
}

function canonicalizeUrl(urlLike) {
  const url = new URL(urlLike);
  url.hash = '';
  if (url.searchParams) {
    url.searchParams.sort();
  }
  return url.toString();
}

async function loadState() {
  try {
    const raw = await fs.readFile(STATE_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return { subjects: {}, sha1: {}, sources: {} };
    }
    throw err;
  }
}

async function saveState(state, dryRun) {
  if (dryRun) return;
  await fs.mkdir(path.dirname(STATE_PATH), { recursive: true });
  await fs.writeFile(STATE_PATH, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
}

function ensureSubjectState(state, subject) {
  if (!state.subjects[subject]) {
    state.subjects[subject] = { visitedPages: {}, sourceUrls: {} };
  }
  return state.subjects[subject];
}

async function fetchSitemap(url) {
  const { html } = await fetchHtml(url);
  return html;
}

function filterByTopics(urls, topics) {
  if (!topics || topics.length === 0) {
    return urls;
  }
  const lowerTopics = topics.map((t) => t.toLowerCase());
  return urls.filter((item) => {
    const target = item.loc.toLowerCase();
    return lowerTopics.some((topic) => target.includes(topic));
  });
}

async function collectSeedUrls(subject, topics, limit) {
  const config = SUBJECT_CONFIG[subject];
  const seeds = new Set();
  for (const sitemapUrl of config.sitemaps) {
    if (seeds.size > MAX_PAGES) break;
    try {
      const xml = await fetchSitemap(sitemapUrl);
      const parsed = xmlParser.parse(xml);
      let urls = [];
      if (parsed.urlset?.url) {
        urls = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
      } else if (parsed.sitemapindex?.sitemap) {
        const nested = Array.isArray(parsed.sitemapindex.sitemap)
          ? parsed.sitemapindex.sitemap
          : [parsed.sitemapindex.sitemap];
        const limitedNested = nested.slice(0, 5);
        for (const child of limitedNested) {
          const childLoc = child.loc;
          if (!childLoc) continue;
          try {
            const childXml = await fetchSitemap(childLoc);
            const childParsed = xmlParser.parse(childXml);
            const childUrls = childParsed.urlset?.url || [];
            const normalized = Array.isArray(childUrls) ? childUrls : [childUrls];
            for (const entry of normalized) {
              if (entry?.loc) {
                urls.push(entry);
              }
            }
          } catch (error) {
            // ignore nested errors but continue
          }
        }
      }
      const filtered = filterByTopics(
        urls
          .map((entry) => ({
            loc: entry?.loc,
            lastmod: entry?.lastmod || ''
          }))
          .filter((entry) => entry.loc && shouldAcceptHost(subject, new URL(entry.loc).hostname)),
        topics
      ).slice(0, MAX_SEED_PER_SITEMAP);
      for (const entry of filtered) {
        if (seeds.size >= MAX_PAGES) break;
        seeds.add(entry.loc);
      }
    } catch (error) {
      console.warn(`[WARN] Skipping failed sitemap: ${sitemapUrl}`);
      if (error?.message) {
        console.warn(`  Reason: ${error.message}`);
      }
      continue;
    }
  }
  if (topics && topics.length > 0) {
    return Array.from(seeds).slice(0, limit * 4);
  }
  return Array.from(seeds).slice(0, limit * 3);
}

function generateAltText(image, pageInfo, dominantType) {
  const baseText = image.caption || image.alt || pageInfo.title;
  const prefix = dominantType ? dominantType.charAt(0).toUpperCase() + dominantType.slice(1) : 'Image';
  let candidate = baseText ? baseText : `${prefix} from ${new URL(image.srcAbs).hostname}`;
  candidate = candidate.replace(/\s+/g, ' ').trim();
  if (!candidate.toLowerCase().startsWith(prefix.toLowerCase())) {
    candidate = `${prefix}: ${candidate}`;
  }
  const words = candidate.split(/\s+/);
  if (words.length > 22) {
    candidate = words.slice(0, 22).join(' ');
  }
  return candidate;
}

function summarizeContext(context, sentencesNeeded = 2) {
  if (!context) return [];
  const sentences = context
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return sentences.slice(0, sentencesNeeded);
}

function generateDetailedDescription(image, pageInfo, dominantType) {
  const sentences = [];
  const prefix = dominantType ? dominantType : 'image';
  if (image.caption) {
    sentences.push(image.caption.trim());
  }
  if (image.alt && (!image.caption || sentences.length < 2)) {
    sentences.push(image.alt.trim());
  }
  const contextSentences = summarizeContext(image.context, 2 - sentences.length);
  sentences.push(...contextSentences);
  if (sentences.length < 2) {
    const fallback = `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} related to ${pageInfo.title || 'the topic'} with explanatory details.`;
    sentences.push(fallback);
  }
  while (sentences.length < 2) {
    sentences.push('The description provides context for quiz creation.');
  }
  return sentences.slice(0, 4).join(' ');
}

const REQUIRED_KEYWORDS = ['education', 'historical', 'economic', 'timeline'];

function buildMetaText(image, pageInfo) {
  return [image.caption, image.alt, image.context, pageInfo.title]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function inferDominantType(image, pageInfo) {
  const metaText = buildMetaText(image, pageInfo);
  let type = 'photo';
  if (/cartoon|caricature/.test(metaText)) type = 'cartoon';
  else if (/map|atlas|projection/.test(metaText)) type = 'map';
  else if (/chart|graph|plot|trend|line|bar|pie/.test(metaText)) type = 'chart';
  else if (/timeline|sequence/.test(metaText)) type = 'timeline';
  return { dominantType: type, metaText };
}

function generateKeywords(image, pageInfo, dominantType, metaText) {
  const tokens = metaText
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
  const keywordOrder = [];
  const seen = new Set();
  if (dominantType && dominantType !== 'photo') {
    keywordOrder.push(dominantType);
  }
  keywordOrder.push(...REQUIRED_KEYWORDS);
  for (const token of tokens) {
    keywordOrder.push(token);
  }
  const keywords = [];
  for (const token of keywordOrder) {
    if (!token) continue;
    if (seen.has(token)) continue;
    seen.add(token);
    keywords.push(token);
    if (keywords.length >= 12) break;
  }
  if (keywords.length === 0) {
    keywords.push('education');
  }
  return keywords;
}

function ensureLicense(pageInfo, hostname, subject) {
  const lowerHost = hostname.toLowerCase();
  let license = 'Public Domain or CC-BY';
  if (lowerHost.endsWith('.gov')) {
    license = 'Public Domain (US Federal)';
  } else if (lowerHost.endsWith('.edu')) {
    license = 'Educational use permitted';
  }
  if (subject !== 'Social Studies' && license === 'Public Domain or CC-BY') {
    license = 'Public Domain (US Federal)';
  }
  let licenseNote = pageInfo.licenseNote || '';
  if (lowerHost.includes('statista.com')) {
    licenseNote = licenseNote ? `${licenseNote}; Verify Statista licensing before use.` : 'Verify Statista licensing before use.';
  }
  if (lowerHost.includes('reuters.com')) {
    licenseNote = licenseNote ? `${licenseNote}; Credit Reuters Graphics when used.` : 'Credit Reuters Graphics when used.';
  }
  return {
    license,
    licenseNote
  };
}

function shouldAcceptHost(subject, host) {
  const config = SUBJECT_CONFIG[subject];
  if (!config) return false;
  const lower = host.toLowerCase();
  for (const allowed of config.allowedDomains) {
    if (lower === allowed || lower.endsWith(`.${allowed}`)) {
      return true;
    }
  }
  return false;
}

async function main() {
  const argv = parseArgs(process.argv.slice(2));
  const subject = argv.subject;
  if (!subject || !SUBJECT_CONFIG[subject]) {
    console.error('Usage: node tools/gov-image-harvester/index.mjs --subject <Science|"Social Studies"> [--topics "..." --limit N --dry]');
    process.exitCode = 1;
    return;
  }
  const topics = argv.topics ? argv.topics.split(',').map((t) => t.trim()).filter(Boolean) : [];
  const limit = argv.limit ? Math.max(1, parseInt(argv.limit, 10)) : 40;
  const dryRun = Boolean(argv.dry);

  const metadataEntries = await loadMetadata(METADATA_PATH);
  const metadataIndexes = buildIndexes(metadataEntries);
  const state = await loadState();
  state.sha1 = state.sha1 || {};
  state.subjects = state.subjects || {};
  const subjectState = ensureSubjectState(state, subject);

  const seeds = await collectSeedUrls(subject, topics, limit);

  let saved = 0;
  let duplicates = 0;
  let errors = 0;

  const acceptedPerPage = new Map(); // canonicalSource -> { count, entries: [], groupId }

  for (const pageUrl of seeds) {
    if (saved >= limit) break;
    const host = new URL(pageUrl).hostname;
    if (!shouldAcceptHost(subject, host)) continue;
    if (subjectState.visitedPages[pageUrl] && !topics.length) {
      continue;
    }
    try {
      const { html, finalUrl } = await fetchHtml(pageUrl);
      const pageInfo = extractPageInfo(html, finalUrl);
      const canonicalSource = canonicalizeUrl(finalUrl);
      if (subjectState.visitedPages[canonicalSource] && !topics.length) {
        subjectState.visitedPages[pageUrl] = Date.now();
        subjectState.visitedPages[canonicalSource] = Date.now();
        continue;
      }
      const candidateImages = pageInfo.images.filter((img) => {
        const imgHost = new URL(img.srcAbs).hostname;
        return shouldAcceptHost(subject, imgHost);
      });
      if (candidateImages.length === 0) {
        subjectState.visitedPages[pageUrl] = Date.now();
        subjectState.visitedPages[canonicalSource] = Date.now();
        continue;
      }
      let perSeedCount = 0;
      for (const image of candidateImages) {
        if (saved >= limit) break;
        if (perSeedCount >= MAX_IMAGES_PER_SEED) break;
        try {
          const imageCanonical = canonicalizeUrl(image.srcAbs);
          if (subjectState.sourceUrls[imageCanonical]) {
            duplicates += 1;
            continue;
          }
          const { dominantType, metaText } = inferDominantType(image, pageInfo);
          const { buffer, width, height } = await downloadAndNormalize(image.srcAbs);
          const sha1 = createSha1(buffer);
          if (metadataIndexes.bySha.has(sha1) || state.sha1[sha1]) {
            duplicates += 1;
            continue;
          }
          const imageHost = new URL(image.srcAbs).hostname.toLowerCase();
          const targetDir = path.resolve('frontend', 'Images', SUBJECT_CONFIG[subject].folder);
          const fileName = await decideFileName(
            {
              sourceTitle: pageInfo.title,
              alt: image.alt,
              pageTitle: pageInfo.title,
              sha1
            },
            targetDir
          );
          const filePathFs = path.join(targetDir, fileName);
          const filePathMeta = path.posix.join('/frontend/Images', SUBJECT_CONFIG[subject].folder, fileName);
          const altText = generateAltText(image, pageInfo, dominantType);
          const detailedDescription = generateDetailedDescription(image, pageInfo, dominantType);
          const keywords = generateKeywords(image, pageInfo, dominantType, metaText);
          const { license, licenseNote } = ensureLicense(pageInfo, imageHost, subject);

          let record = acceptedPerPage.get(canonicalSource);
          if (!record) {
            record = { count: 0, entries: [], groupId: null };
            acceptedPerPage.set(canonicalSource, record);
          }
          const previousCount = record.count;
          record.count += 1;

          const metadataEntry = {
            id: crypto.randomUUID(),
            subject,
            fileName,
            filePath: filePathMeta,
            width,
            height,
            dominantType,
            altText,
            detailedDescription,
            keywords,
            sourceUrl: canonicalSource,
            sourceDomain: imageHost,
            sourceTitle: pageInfo.title || '',
            sourcePublished: pageInfo.published || '',
            license,
            licenseNote,
            educationalUse: 'instructional',
            sha1,
            collectedAt: new Date().toISOString()
          };

          record.entries.push(metadataEntry);

          if (record.count > 1) {
            if (!record.groupId) {
              record.groupId = `${new URL(canonicalSource).hostname}:${new URL(canonicalSource).pathname}`;
            }
            metadataEntry.groupId = record.groupId;
            if (previousCount === 1 && record.entries.length >= 2) {
              record.entries[0].groupId = record.groupId;
            }
          }

          if (!dryRun) {
            await writeImage(buffer, filePathFs, dryRun);
            if (!record.groupId) {
              delete metadataEntry.groupId;
            }
            upsertEntry(metadataEntries, metadataIndexes, metadataEntry);
            if (record.groupId && previousCount === 1 && record.entries.length >= 2) {
              upsertEntry(metadataEntries, metadataIndexes, record.entries[0]);
            }
            state.sha1[sha1] = true;
            subjectState.sourceUrls[imageCanonical] = true;
          }

          console.log(`[+] ${subject} ${filePathMeta} (${width}x${height}) ${host} sha1=${sha1.slice(0, 10)}`);
          saved += 1;
          perSeedCount += 1;
        } catch (imageErr) {
          errors += 1;
          console.error(`  [!] Image error for ${image.srcAbs}: ${imageErr.message}`);
        }
      }
      subjectState.visitedPages[pageUrl] = Date.now();
      subjectState.visitedPages[canonicalSource] = Date.now();
    } catch (err) {
      errors += 1;
      console.error(`Failed to process ${pageUrl}: ${err.message}`);
    }
  }

  if (!dryRun) {
    await saveMetadata(METADATA_PATH, metadataEntries);
    await saveState(state, dryRun);
  }

  console.log(`Saved ${saved} new images, skipped ${duplicates} duplicates, ${errors} errors.`);

}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
