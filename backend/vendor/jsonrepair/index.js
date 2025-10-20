'use strict';

function escapeNewlinesInsideStrings(text) {
    let result = '';
    let inString = false;
    let escaping = false;
    for (let i = 0; i < text.length; i += 1) {
        const ch = text[i];
        if (inString) {
            if (escaping) {
                result += ch;
                escaping = false;
                continue;
            }
            if (ch === '\\') {
                result += ch;
                escaping = true;
                continue;
            }
            if (ch === '"') {
                result += ch;
                inString = false;
                continue;
            }
            if (ch === '\n' || ch === '\r') {
                result += '\\n';
                continue;
            }
        } else if (ch === '"') {
            inString = true;
        }
        result += ch;
    }
    if (inString) {
        result += '"';
    }
    return result;
}

function stripTrailingCommas(text) {
    return text.replace(/,\s*(\}|\])/g, '$1');
}

function normalizeQuotes(text) {
    return text.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");
}

function balanceQuotes(text) {
    const quoteCount = (text.match(/"/g) || []).length;
    if (quoteCount % 2 === 0) {
        return text;
    }
    return `${text}"`;
}

function jsonrepair(input) {
    if (typeof input !== 'string') {
        return input;
    }
    let text = input;
    text = text.replace(/\u0000/g, '');
    text = normalizeQuotes(text);
    text = escapeNewlinesInsideStrings(text);
    text = stripTrailingCommas(text);
    text = balanceQuotes(text);
    return text;
}

module.exports = { jsonrepair };
