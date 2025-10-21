const templates = {
    table_typesOfRegions(meta) {
        return {
            stem: "According to the table, which region type is organized around a central focus (a nodal or network region)?",
            choices: ["Formal", "Functional", "Perceptual", "Political"],
            correctIndex: 1,
            rationale: "The 'Functional' row defines regions organized around a central focus or network."
        };
    },
    chart_energy(meta) {
        return {
            stem: "According to the line graph and its legend, which energy source declines the most from 2000 to 2020?",
            choices: ["Coal", "Natural Gas", "Petroleum", "Nuclear"],
            correctIndex: 0,
            rationale: "The red coal line drops steeply across the x-axis years."
        };
    },
    table_branches(meta) {
        return {
            stem: "According to the 'Branches of Government' table, which branch is listed with the power to evaluate laws?",
            choices: ["Executive", "Judicial", "Legislative", "Cabinet"],
            correctIndex: 1,
            rationale: "The 'Powers' column states the Judicial branch evaluates laws according to the Constitution."
        };
    }
};

module.exports = {
    templates
};
