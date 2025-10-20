function gatherText(meta = {}) {
    const fields = [
        meta?.title,
        meta?.altText,
        meta?.caption,
        meta?.detailedDescription,
        meta?.usageDirectives,
        meta?.ocrText
    ];
    return fields
        .filter((value) => typeof value === 'string' && value.trim().length)
        .join(' ')
        .toLowerCase();
}

function uniqueKeywords(text) {
    const matches = text.match(/[a-z][a-z\-]+/g) || [];
    return Array.from(new Set(matches)).slice(0, 500);
}

function deriveVisualFeatures(meta = {}) {
    const text = gatherText(meta);
    const mapPrimary = /(map|compass|north|state|county|river|choropleth)/.test(text);
    const mapSecondary = /(legend|scale|miles|shaded)/.test(text);
    const hasMap = mapPrimary || (mapSecondary && /map/.test(text));
    const features = {
        hasTable: /(table|row|column|header|definition|example)/.test(text),
        hasMap,
        hasChart: /(chart|graph|axis|x-?axis|y-?axis|bar|line|pie|key|series|units|year|percentage|btu)/.test(text),
        hasTimeline: /(timeline|decade|era|date range)/.test(text),
        hasCartoon: /(cartoon|satire|symbol|allegory)/.test(text),
        keywords: uniqueKeywords(text),
        typesOfRegions: /types of regions|formal|functional|perceptual/.test(text),
        energyConsumption: /energy consumption|btu|nuclear|coal|natural gas|petroleum/.test(text),
        federalBranches: /executive|judicial|legislative|supreme court|house of representatives|senate/.test(text)
    };
    return features;
}

function buildFeatureSignature(features = {}) {
    const signature = [];
    if (features.hasTable) signature.push('table');
    if (features.hasChart) signature.push('chart');
    if (features.hasMap) signature.push('map');
    if (features.hasTimeline) signature.push('timeline');
    if (features.hasCartoon) signature.push('cartoon');
    if (features.typesOfRegions) signature.push('typesOfRegions');
    if (features.energyConsumption) signature.push('energyConsumption');
    if (features.federalBranches) signature.push('federalBranches');
    return signature;
}

module.exports = {
    deriveVisualFeatures,
    buildFeatureSignature
};
