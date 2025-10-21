function countOverlap(stem = '', choices = [], keywords = []) {
    const bag = new Set((stem + ' ' + choices.join(' ')).toLowerCase().match(/[a-z][a-z\-]+/g) || []);
    return keywords.filter((k) => bag.has(k)).length;
}

function validateSS(item = {}, meta = {}, features = {}, isScreenshot = false) {
    const mustStart = /^according to the (image|map|chart|table|photo)/i;
    const strategy = /\bstrategy\b|\bfirst step\b|\bhow should\b|\bon-screen directions\b|\bpractice set\b/i;

    const stem = item.stem || '';
    const choices = Array.isArray(item.choices) ? item.choices : [];

    const starts = mustStart.test(stem);
    const noMeta = !strategy.test(stem);
    const fourChoices = Array.isArray(choices) && choices.length === 4;
    const idxOK = Number.isInteger(item.correctIndex) && item.correctIndex >= 0 && item.correctIndex < 4;

    const anchors = (() => {
        const lowerStem = stem.toLowerCase();
        const required = [];
        if (features.hasTable) required.push(/table|row|column|header|definition|example/);
        if (features.hasChart) required.push(/axis|x-?axis|y-?axis|legend|series|units|year/);
        if (features.hasMap) required.push(/legend|scale|compass|shaded|state|region|river/);
        const matches = required.filter((rx) => rx.test(lowerStem)).length;
        const needed = required.length || 2;
        return matches >= Math.min(2, needed);
    })();

    const overlapOK = countOverlap(stem, choices, features.keywords || []) >= 2;

    const captionSource = item?.imageRef?.imageMeta?.caption || item?.imageRef?.caption || '';
    const captionOK = !isScreenshot || (captionSource.trim().length > 0 && !/\.(?:png|jpe?g|gif|webp|svg)\b/i.test(captionSource) && !/\b[Ss]creenshot(s)?\b/.test(captionSource));

    const passageText = item?.passage?.text || '';
    const passageOK = !passageText || passageText.trim().split(/\s+/).length <= 200;

    return starts && noMeta && fourChoices && idxOK && anchors && overlapOK && captionOK && passageOK;
}

module.exports = {
    countOverlap,
    validateSS
};
