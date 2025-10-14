(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        const math = require('./mathSanitizer');
        const prose = require('./normalizeProse');
        module.exports = factory(math, prose);
    } else {
        root.SanitizeExamText = factory(root.MathSanitizerLib || {}, root.NormalizeProseLib || {});
    }
}(typeof globalThis !== 'undefined' ? globalThis : this, function (mathLib, proseLib) {
    const normalizeMathToLatex = mathLib.normalizeMathToLatex || ((s) => s);
    const normalizeMathToHTML = mathLib.normalizeMathToHTML || ((s) => s);
    const normalizeProse = proseLib.normalizeProse || ((s) => (typeof s === 'string' ? s : ''));

    function sanitizeField(s, mode = 'latex') {
        if (typeof s !== 'string') return s;
        const prose = normalizeProse(s);
        return mode === 'html' ? normalizeMathToHTML(prose) : normalizeMathToLatex(prose);
    }

    function sanitizeExamObject(obj, mode = 'latex') {
        if (obj == null) return obj;
        if (typeof obj === 'string') return sanitizeField(obj, mode);
        if (Array.isArray(obj)) return obj.map((item) => sanitizeExamObject(item, mode));
        if (typeof obj === 'object') {
            const out = {};
            for (const key of Object.keys(obj)) {
                out[key] = sanitizeExamObject(obj[key], mode);
            }
            return out;
        }
        return obj;
    }

    return {
        sanitizeField,
        sanitizeExamObject,
        normalizeProse,
        normalizeMathToLatex,
        normalizeMathToHTML
    };
}));
