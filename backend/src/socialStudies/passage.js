function clampPassage(text) {
    if (!text) return '';
    const words = text.trim().split(/\s+/);
    return words.length <= 200 ? text.trim() : `${words.slice(0, 200).join(' ')}…`;
}

module.exports = {
    clampPassage
};
