/**
 * IMAGE URL NORMALIZER
 * Always returns a deployment-friendly internal path: /images/<Subject>/<filename>
 */

export function normalizeImageUrl(url) {
  if (!url) return '';

  let cleaned = String(url).trim();

  // Strip any domain
  cleaned = cleaned.replace(/^https?:\/\/[^/]+/i, '');

  // Normalize slashes
  cleaned = cleaned.replace(/\\+/g, '/').replace(/\/+/, '/');

  // Drop leading slashes for easier parsing
  cleaned = cleaned.replace(/^\/+/, '');

  // Convert legacy prefixes
  cleaned = cleaned.replace(/^frontend\/(?:Images|images)\//i, 'images/');
  cleaned = cleaned.replace(/^frontend\/(?:Images|images)/i, 'images');
  cleaned = cleaned.replace(/^(?:Images|images)\//i, 'images/');

  const segments = cleaned.split('/').filter(Boolean);
  if (segments.length === 0) return '';

  const filename = segments[segments.length - 1];
  if (!filename) return '';

  // If already under images/<Subject>/..., preserve subject
  let subjectFolder =
    segments.length >= 3 && segments[0].toLowerCase() === 'images'
      ? segments[1]
      : null;

  // Otherwise infer subject from any segment
  if (!subjectFolder) {
    subjectFolder = 'Social Studies';
    for (const segment of segments) {
      const lower = segment.toLowerCase().replace(/[_\s-]+/g, '');
      if (lower.includes('math')) {
        subjectFolder = 'Math';
        break;
      }
      if (lower.includes('science') || lower === 'scince') {
        subjectFolder = 'Science';
        break;
      }
      if (lower.includes('social') || lower.includes('studies')) {
        subjectFolder = 'Social Studies';
        break;
      }
    }
  }

  // Normalize common variants
  if (subjectFolder === 'Social_Studies') subjectFolder = 'Social Studies';

  return `/images/${subjectFolder}/${filename}`;
}
