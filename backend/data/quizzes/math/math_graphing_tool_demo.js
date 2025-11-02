// backend/data/quizzes/math/math_graphing_tool_demo.js
module.exports = [
  {
    id: "graph_demo_1",
    questionType: "standalone",
    questionText: "Use the graphing tool to plot y = 2x + 3. What is the y-intercept?",
    answerOptions: [
      { text: "2", isCorrect: false, rationale: "That's the slope." },
      { text: "3", isCorrect: true, rationale: "Correct, b = 3 is the y-intercept." },
      { text: "-3", isCorrect: false, rationale: "Wrong sign." },
      { text: "0", isCorrect: false, rationale: "This line does not cross at the origin." }
    ],
    useGraphTool: true,
  },
  {
    id: "graph_demo_2",
    questionType: "standalone",
    questionText: "Graph y = x² and identify the vertex coordinates.",
    answerOptions: [
      { text: "(0, 0)", isCorrect: true, rationale: "Parabola with vertex at the origin." },
      { text: "(1, 1)", isCorrect: false },
      { text: "(0, 1)", isCorrect: false },
      { text: "(-1, 1)", isCorrect: false }
    ],
    useGraphTool: true,
  },
  {
    id: "graph_demo_3",
    questionType: "standalone",
    questionText: "Graph y = 3^x. Does this function represent exponential growth or decay?",
    answerOptions: [
      { text: "Growth", isCorrect: true, rationale: "Base > 1 → growth." },
      { text: "Decay", isCorrect: false },
      { text: "Neither", isCorrect: false }
    ],
    useGraphTool: true,
  },
  {
    id: "graph_demo_4",
    questionType: "standalone",
    questionText: "Graph y = -x + 4. What is the slope of the line?",
    answerOptions: [
      { text: "1", isCorrect: false },
      { text: "-1", isCorrect: true, rationale: "Coefficient of x is -1." },
      { text: "4", isCorrect: false },
      { text: "0", isCorrect: false }
    ],
    useGraphTool: true,
  },
];