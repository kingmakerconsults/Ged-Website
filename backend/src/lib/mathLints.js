const re = {
    missingFracSlash: /(^|[^\\])frac\s*\{[^}]+\}\s*\{[^}]+\}/g,
    bareCaretNum: /([A-Za-z0-9)\]}])\^(\d+)(?![A-Za-z{])/g,
    bareCaretLetter: /([A-Za-z0-9)\]}])\^([A-Za-z])(?![A-Za-z{])/g,
    caretGroup: /(\S)\^\(([^)]+)\)/g,
    unwrappedLatex: /(?:\\frac\{[^}]+\}\{[^}]+\}|[A-Za-z0-9)\]}+\^\{[^}]+\})/,
    badWhitespace: /\s{2,}/g,
    unbalancedBraces: /[{}]/g
};

function isBalancedBraces(s) {
    let c = 0;
    for (const ch of s) {
        if (ch === '{') c += 1;
        else if (ch === '}') {
            c -= 1;
            if (c < 0) return false;
        }
    }
    return c === 0;
}

function autoFixMathText(input) {
    let s = input ?? '';
    const issues = [];

    s = s.replace(/(^|[^\\])rac\s*\{/g, (_m, pre) => {
        issues.push({ id: '', field: 'stem', message: 'Added missing backslash in \\frac', before: input });
        return `${pre}\\frac{`;
    });

    s = s.replace(re.bareCaretNum, (_m, base, exp) => `${base}^{${exp}}`);
    s = s.replace(re.bareCaretLetter, (_m, base, exp) => `${base}^{${exp}}`);
    s = s.replace(re.caretGroup, (_m, base, inner) => `${base}^{${inner}}`);

    s = s.replace(/[ \t]+/g, ' ');

    return { text: s, issues };
}

function needsGptCorrection(s) {
    const problems = [];
    if (!isBalancedBraces(s)) problems.push('unbalanced_braces');
    if (/(^|[^\\])frac\{/.test(s)) problems.push('missing_backslash_frac');
    if (/(?:\^)(?!\{)/.test(s)) problems.push('bare_caret');
    return problems;
}

module.exports = {
    re,
    autoFixMathText,
    needsGptCorrection,
    isBalancedBraces
};
