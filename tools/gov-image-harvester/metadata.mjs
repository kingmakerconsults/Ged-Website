import fs from 'node:fs/promises';

export async function loadMetadata(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

export function buildIndexes(entries) {
  const bySha = new Map();
  const byPath = new Map();
  for (const entry of entries) {
    if (entry.sha1) {
      bySha.set(entry.sha1, entry);
    }
    if (entry.filePath) {
      byPath.set(entry.filePath, entry);
    }
  }
  return { bySha, byPath };
}

function mergeEntries(existing, incoming) {
  const merged = { ...existing };
  for (const [key, value] of Object.entries(incoming)) {
    if (value === undefined || value === null || value === '') continue;
    if (Array.isArray(value) && value.length === 0) continue;
    if (!merged[key] || merged[key] === '' || (Array.isArray(merged[key]) && merged[key].length === 0)) {
      merged[key] = value;
    } else if (Array.isArray(value)) {
      const existingSet = new Set(merged[key]);
      for (const item of value) {
        if (!existingSet.has(item)) {
          merged[key].push(item);
          existingSet.add(item);
        }
      }
    } else {
      merged[key] = value;
    }
  }
  return merged;
}

export function upsertEntry(entries, indexes, entry) {
  if (!entry.sha1) {
    throw new Error('Metadata entry must include sha1');
  }
  if (!entry.filePath) {
    throw new Error('Metadata entry must include filePath');
  }
  const existingBySha = indexes.bySha.get(entry.sha1);
  if (existingBySha) {
    const merged = mergeEntries(existingBySha, entry);
    Object.assign(existingBySha, merged);
    indexes.byPath.set(existingBySha.filePath, existingBySha);
    return { updated: true, entry: existingBySha };
  }
  const existingByPath = indexes.byPath.get(entry.filePath);
  if (existingByPath) {
    const merged = mergeEntries(existingByPath, entry);
    Object.assign(existingByPath, merged);
    indexes.bySha.set(existingByPath.sha1, existingByPath);
    return { updated: true, entry: existingByPath };
  }
  entries.push(entry);
  indexes.bySha.set(entry.sha1, entry);
  indexes.byPath.set(entry.filePath, entry);
  return { updated: false, entry };
}

export async function saveMetadata(filePath, entries) {
  const sorted = [...entries].sort((a, b) => {
    if (a.subject !== b.subject) {
      return a.subject.localeCompare(b.subject);
    }
    return a.fileName.localeCompare(b.fileName);
  });
  const json = JSON.stringify(sorted, null, 2);
  await fs.writeFile(filePath, `${json}\n`, 'utf8');
}
