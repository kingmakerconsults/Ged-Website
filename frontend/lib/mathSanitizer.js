(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.MathSanitizerLib = factory();
    }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    function normalizeMathToLatex(input) {
        if (!input) return input;

        let s = input;

        s = s.replace(/([A-Za-z0-9)\]\}])\^(\d+)(?![A-Za-z{])/g,
            (_m, base, exp) => `${base}^{${exp}}`);

        s = s.replace(/([A-Za-z0-9)\]\}])\^([A-Za-z])(?![A-Za-z{])/g,
            (_m, base, exp) => `${base}^{${exp}}`);

        s = s.replace(/(\S)\^\(([^)]+)\)/g, (_m, base, inner) => `${base}^{${inner}}`);

        s = s.replace(
            /(?<!\\\(|\\\[)(\\frac\{[^}]+\}\{[^}]+\}|[A-Za-z0-9)\]\}]+\^\{[^}]+\})(?!\\\)|\\\])/g,
            (m) => `\\(${m}\\)`
        );

        return s;
    }

    function normalizeMathToHTML(input) {
        if (!input) return input;
        let s = input;

        s = s.replace(/(\([^)]+\)|\[[^\]]+\]|[A-Za-z0-9]+)\^(\d+|[A-Za-z])/g,
            (_m, base, exp) => `${base}<sup>${exp}</sup>`);

        s = s.replace(/(\S)\^\(([^)]+)\)/g, (_m, base, inner) => `${base}<sup>${inner}</sup>`);

        return s;
    }

    return {
        normalizeMathToLatex,
        normalizeMathToHTML
    };
}));
