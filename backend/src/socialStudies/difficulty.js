const MIX = {
    easy: 0.3,
    medium: 0.5,
    hard: 0.2
};

function normalizeTotal(total) {
    const parsed = Number(total);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        throw new Error('total must be a positive number');
    }
    return Math.floor(parsed);
}

function distribute(total, ratios) {
    const base = {};
    const remainders = [];
    let allocated = 0;
    Object.entries(ratios).forEach(([level, ratio]) => {
        const raw = total * ratio;
        const count = Math.floor(raw);
        base[level] = count;
        allocated += count;
        remainders.push({ level, remainder: raw - count });
    });

    let remaining = total - allocated;
    remainders
        .sort((a, b) => b.remainder - a.remainder)
        .forEach(({ level }) => {
            if (remaining <= 0) return;
            base[level] += 1;
            remaining -= 1;
        });

    if (remaining > 0) {
        const levels = Object.keys(ratios);
        let idx = 0;
        while (remaining > 0) {
            const level = levels[idx % levels.length];
            base[level] += 1;
            remaining -= 1;
            idx += 1;
        }
    }

    return base;
}

function planDifficulty(total, domain) {
    const normalizedTotal = normalizeTotal(total);
    if (domain && domain !== 'social_studies') {
        throw new Error('Unsupported domain for difficulty planner');
    }
    return distribute(normalizedTotal, MIX);
}

function expandDifficultyCounts(counts = {}) {
    const entries = [];
    Object.entries(counts).forEach(([level, count]) => {
        for (let i = 0; i < count; i += 1) {
            entries.push(level);
        }
    });
    return entries;
}

module.exports = {
    planDifficulty,
    expandDifficultyCounts,
    MIX
};
