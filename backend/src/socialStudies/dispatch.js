const { templates } = require('./templates');

function pickTemplate(meta, f) {
    if (f.typesOfRegions && f.hasTable) return templates.table_typesOfRegions(meta);
    if (f.energyConsumption && f.hasChart) return templates.chart_energy(meta);
    if (f.federalBranches && f.hasTable) return templates.table_branches(meta);
    if (f.hasMap) {
        return {
            stem: "According to the screenshot’s map legend and shading, which region matches the darkest category?",
            choices: ["Option A", "Option B", "Option C", "Option D"],
            correctIndex: 0,
            rationale: "Darkest shade corresponds to category A."
        };
    }
    if (f.hasChart) {
        return {
            stem: "According to the screenshot’s chart (x-axis years, y-axis units), which series shows the greatest increase?",
            choices: ["Series A", "Series B", "Series C", "Series D"],
            correctIndex: 1,
            rationale: "Series B has the largest positive slope."
        };
    }
    if (f.hasTable) {
        return {
            stem: "Using the screenshot’s table (Type–Definition–Example), which choice matches the definition shown?",
            choices: ["A", "B", "C", "D"],
            correctIndex: 2,
            rationale: "Row indicates choice C."
        };
    }
    throw new Error('NO_MATCHING_TEMPLATE');
}

module.exports = {
    pickTemplate
};
