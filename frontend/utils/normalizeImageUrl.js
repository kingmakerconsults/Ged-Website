/**
 * NETLIFY-LOCKED IMAGE URL NORMALIZER
 * Ensures ALL images load from the canonical Netlify CDN path
 * Strips any legacy domains (quiz.ez-ged.com, render.com, localhost, etc.)
 */

export function normalizeImageUrl(url) {
  if (!url) return "";

  let cleaned = String(url).trim();

  // Remove any domain (quiz.ez-ged, render, localhost, netlify preview, etc.)
  cleaned = cleaned.replace(/^https?:\/\/[^/]+/i, "");

  // Remove leading slashes and /frontend/Images/ prefix if present
  cleaned = cleaned.replace(/^\/+/, "");
  cleaned = cleaned.replace(/^frontend\/Images\//i, "");
  cleaned = cleaned.replace(/^Images\//i, "");

  // Extract just the filename (last segment of path)
  const parts = cleaned.split("/");
  const filename = parts[parts.length - 1];

  if (!filename) return "";

  // Try to preserve subject folder if it's in the path
  let subject = "";
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (
      /math|science|social|rla|workforce/i.test(part) ||
      part.includes("Studies")
    ) {
      // Normalize subject name
      if (/social/i.test(part) || part.includes("Studies")) {
        subject = "Social_Studies";
      } else if (/math/i.test(part)) {
        subject = "Math";
      } else if (/science/i.test(part)) {
        subject = "Science";
      } else if (/rla/i.test(part)) {
        subject = "RLA";
      } else if (/workforce/i.test(part)) {
        subject = "Workforce_Readiness";
      }
      break;
    }
  }

  // If no subject found, try to infer from filename or default to Social_Studies
  if (!subject) {
    subject = "Social_Studies"; // default fallback
  }

  // Always return the Netlify-locked canonical path
  return `https://ezged.netlify.app/frontend/Images/${subject}/${filename}`;
}
