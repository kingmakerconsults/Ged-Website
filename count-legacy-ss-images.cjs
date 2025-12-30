const fs = require('fs');

const text = fs.readFileSync('frontend/src/legacy/LegacyRootApp.jsx', 'utf8');

const imageUrlSocialStudies =
  (text.match(/imageUrl:\s*['"]\/images\/Social Studies\//g) || []).length +
  (text.match(/imageUrl:\s*['"]Images\/Social Studies\//g) || []).length;

const imgTagsSocialStudies =
  (text.match(/<img[^>]+src=['\"]\/images\/Social Studies\//gi) || []).length +
  (text.match(/<img[^>]+src=['\"]Images\/Social Studies\//gi) || []).length;

console.log(
  JSON.stringify(
    {
      imageUrlSocialStudies,
      imgTagsSocialStudies,
    },
    null,
    2
  )
);
