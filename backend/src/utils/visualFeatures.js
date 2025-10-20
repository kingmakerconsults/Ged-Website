function gatherText(meta) {
    const candidates = [
        meta?.title,
        meta?.altText,
        meta?.caption,
        meta?.detailedDescription,
        meta?.usageDirectives,
        meta?.ocrText
    ];

    return candidates
        .filter((value) => typeof value === 'string' && value.trim().length)
        .join(' ')
        .toLowerCase();
}

function uniqueKeywords(text) {
    const matches = text.match(/[a-z][a-z\-]+/g) || [];
    return Array.from(new Set(matches)).slice(0, 500);
}

function deriveIsScreenshot(fileName, meta = {}) {
    const fromFile = typeof fileName === 'string' && /^screenshot/i.test(fileName);
    const tags = Array.isArray(meta.tags) ? meta.tags.map((tag) => String(tag).toLowerCase()) : [];
    const fromTags = tags.includes('screenshot');
    const fromType = typeof meta.type === 'string' && meta.type.toLowerCase() === 'screenshot';
    return Boolean(fromFile || fromTags || fromType);
}

function deriveVisualFeatures(meta = {}) {
    const text = gatherText(meta);

    const features = {
        hasTable: /(table|row|column|type|definition|example|header)/.test(text),
        hasMap: /(map|scale|miles|compass|north|state|county|river|shaded|choropleth)/.test(text),
        hasChart: /(chart|graph|axis|x-?axis|y-?axis|bar|line|pie|key|series|units|year|percentage)/.test(text),
        hasTimeline: /(timeline|date range|era|decade)/.test(text),
        hasCartoon: /(cartoon|satire|symbol|allegory)/.test(text),
        keywords: uniqueKeywords(text)
    };

    features.typesOfRegions = /types of regions|formal|functional|perceptual/.test(text);
    features.energyConsumption = /energy consumption|btu|nuclear|coal|natural gas|petroleum/.test(text);
    features.federalBranches = /executive|judicial|legislative|supreme court|cabinet|house of representatives|senate/.test(text);

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
    deriveIsScreenshot,
    deriveVisualFeatures,
    buildFeatureSignature
};

