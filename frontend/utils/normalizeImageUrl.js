/**
 * NETLIFY-LOCKED IMAGE URL NORMALIZER
 * Ensures ALL images load from the canonical Netlify CDN path
 * Strips any legacy domains (quiz.ez-ged.com, render.com, localhost, etc.)
 */

export function normalizeImageUrl(url) {
  if (!url) return '';

  let cleaned = String(url).trim();

  // Remove any domain completely
  cleaned = cleaned.replace(/^https?:\/\/[^/]+/i, '');

  // Remove leading slashes
  cleaned = cleaned.replace(/^\/+/, '');

  // Split the path into segments
  const segments = cleaned.split('/').filter((s) => s);

  if (segments.length === 0) return '';

  // Extract filename (last segment)
  const filename = segments[segments.length - 1];

  if (!filename) return '';

  // Determine subject from path
  let subject = 'Social_Studies'; // default

  // Check all segments for subject indicators
  for (const segment of segments) {
    const lower = segment.toLowerCase().replace(/[_\s-]+/g, '');

    if (lower.includes('math')) {
      subject = 'Math';
      break;
    } else if (lower.includes('science')) {
      subject = 'Science';
      break;
    } else if (lower.includes('social') || lower.includes('studies')) {
      subject = 'Social_Studies';
      break;
    } else if (lower.includes('rla') || lower.includes('language')) {
      subject = 'RLA';
      break;
    } else if (lower.includes('workforce')) {
      subject = 'Workforce_Readiness';
      break;
    }
  }

  // Always return Netlify-locked canonical URL
  return `https://ezged.netlify.app/frontend/Images/${subject}/${filename}`;
}
