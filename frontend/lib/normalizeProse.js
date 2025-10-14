(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.NormalizeProseLib = factory();
    }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    function normalizeProse(input) {
        if (!input) return input;
        let s = input.normalize('NFC');
        s = s.replace(/\r\n?/g, '\n');
        s = s.replace(/[^\S\n]+/g, ' ');
        s = s.replace(/ ?\n ?/g, '\n');
        return s.trim();
    }

    return {
        normalizeProse
    };
}));
