const { normalizeMathToLatex, normalizeMathToHTML } = require('./mathSanitizer');
const { normalizeProse } = require('./normalizeProse');

function sanitizeField(s, mode = 'latex') {
    if (typeof s !== 'string') return s;
    const prose = normalizeProse(s);
    if (mode === 'html') {
        return normalizeMathToHTML(prose);
    }
    return normalizeMathToLatex(prose);
}

function sanitizeExamObject(obj, mode = 'latex') {
    if (obj == null) return obj;
    if (typeof obj === 'string') return sanitizeField(obj, mode);
    if (Array.isArray(obj)) return obj.map((item) => sanitizeExamObject(item, mode));
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
    normalizeMathToHTML
};
