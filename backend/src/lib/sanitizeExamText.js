const {
  normalizeMathToLatex,
  normalizeMathToHTML,
  upgradeToKatex,
  upgradeQuestionToKatex,
} = require('./mathSanitizer');
const { normalizeProse } = require('./normalizeProse');
const { sanitizeMathText } = require('./mathQuestionBankSanitizer');

function sanitizeField(s, mode = 'latex') {
  if (typeof s !== 'string') return s;
  if (mode === 'html') {
    return normalizeMathToHTML(normalizeProse(s));
  }
  // Latex mode: route through the same full catalog pipeline so exam-rendered
  // math gets sqrt/pi/fraction/inequality conversion + currency escape, and
  // both pipelines stay in lock-step. (sanitizeMathText already calls
  // normalizeProse internally.)
  return sanitizeMathText(s);
}

function sanitizeExamObject(obj, mode = 'latex') {
  if (obj == null) return obj;
  if (typeof obj === 'string') return sanitizeField(obj, mode);
  if (Array.isArray(obj))
    return obj.map((item) => sanitizeExamObject(item, mode));
  if (typeof obj === 'object') {
    const out = Array.isArray(obj) ? [] : {};
    for (const key of Object.keys(obj)) {
      out[key] = sanitizeExamObject(obj[key], mode);
    }
    return out;
  }
  return obj;
}

module.exports = {
  sanitizeField,
  sanitizeExamObject,
  normalizeProse,
  normalizeMathToLatex,
  normalizeMathToHTML,
  upgradeToKatex,
  upgradeQuestionToKatex,
};
