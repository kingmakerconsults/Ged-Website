function formatFractionComponent(component) {
    if (typeof component !== 'string') return component;
    const trimmed = component.trim();
    if (!trimmed.length) return trimmed;
    const alreadyWrapped = (trimmed.startsWith('(') && trimmed.endsWith(')')) || (trimmed.startsWith('[') && trimmed.endsWith(']'));
    const simpleToken = /^[-+]?\d+(?:\.\d+)?$/.test(trimmed) || /^[A-Za-z]$/.test(trimmed) || /^[A-Za-z][A-Za-z0-9]*$/.test(trimmed);
    const needsWrap = !alreadyWrapped && !simpleToken && /[\s+\-]/.test(trimmed);
    return needsWrap ? `(${trimmed})` : trimmed;
}

function convertFirstLatexFraction(source) {
    if (typeof source !== 'string') return { changed: false, value: source };
    const idx = source.indexOf('\\frac');
    if (idx === -1) {
        return { changed: false, value: source };
    }
    let cursor = idx + 5;
    while (cursor < source.length && /\s/.test(source[cursor])) {
        cursor += 1;
    }
    if (source[cursor] !== '{') {
        return { changed: false, value: source };
    }

    const parseGroup = (startIndex) => {
        if (source[startIndex] !== '{') return null;
        let depth = 0;
        let i = startIndex + 1;
        while (i < source.length) {
            const ch = source[i];
            if (ch === '{') {
                depth += 1;
            } else if (ch === '}') {
                if (depth === 0) {
                    return { content: source.slice(startIndex + 1, i), nextIndex: i + 1 };
                }
                depth -= 1;
            }
            i += 1;
        }
        return null;
    };

    const numeratorGroup = parseGroup(cursor);
    if (!numeratorGroup) {
        return { changed: false, value: source };
    }

    cursor = numeratorGroup.nextIndex;
    while (cursor < source.length && /\s/.test(source[cursor])) {
        cursor += 1;
    }
    if (source[cursor] !== '{') {
        return { changed: false, value: source };
    }
    const denominatorGroup = parseGroup(cursor);
    if (!denominatorGroup) {
        return { changed: false, value: source };
    }

    const numerator = formatFractionComponent(numeratorGroup.content);
    const denominator = formatFractionComponent(denominatorGroup.content);
    const replacement = `${numerator}/${denominator}`;
    const updated = source.slice(0, idx) + replacement + source.slice(denominatorGroup.nextIndex);
    return { changed: true, value: updated };
}

function replaceLatexFractionsWithSlash(value) {
    if (typeof value !== 'string') {
        return value;
    }

    if (!/\\[cdt]?frac/.test(value)) {
        return value;
    }

    let result = value.replace(/\\[cdt]?frac/g, '\\frac');
    let guard = 0;
    while (result.indexOf('\\frac') !== -1 && guard < 50) {
        const { changed, value: updated } = convertFirstLatexFraction(result);
        if (!changed) {
            break;
        }
        result = updated;
        guard += 1;
    }
    return result;
}

function applyFractionPlainTextModeToItem(item) {
    if (!item || typeof item !== 'object') {
        return item;
    }

    const convert = (val) => replaceLatexFractionsWithSlash(val);

    if (typeof item.questionText === 'string') {
        item.questionText = convert(item.questionText);
    }
    if (typeof item.passage === 'string') {
        item.passage = convert(item.passage);
    }
    if (typeof item.rationale === 'string') {
        item.rationale = convert(item.rationale);
    }
    if (typeof item.correctAnswer === 'string') {
        item.correctAnswer = convert(item.correctAnswer);
    }
    if (Array.isArray(item.answerOptions)) {
        item.answerOptions = item.answerOptions.map((opt) => {
            if (!opt || typeof opt !== 'object') {
                return opt;
            }
            const next = { ...opt };
            if (typeof next.text === 'string') {
                next.text = convert(next.text);
            }
            if (typeof next.rationale === 'string') {
                next.rationale = convert(next.rationale);
            }
            return next;
        });
    }
    return item;
}

module.exports = {
    applyFractionPlainTextModeToItem,
    replaceLatexFractionsWithSlash,
    convertFirstLatexFraction,
    formatFractionComponent
};
