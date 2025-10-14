function normalizeProse(input) {
    if (!input) return input;
    let s = input.normalize('NFC');
    s = s.replace(/\r\n?/g, '\n');
    s = s.replace(/[^\S\n]+/g, ' ');
    s = s.replace(/ ?\n ?/g, '\n');
    return s.trim();
}

module.exports = {
    normalizeProse
};
