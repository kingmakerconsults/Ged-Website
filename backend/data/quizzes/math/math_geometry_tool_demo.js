// backend/data/quizzes/math/math_geometry_tool_demo.js
module.exports = [
  {
    id: "geo_demo_1",
    questionType: "standalone",
    questionText: "Using the geometry tool, construct a right triangle with legs 3 and 4. What is its area?",
    answerOptions: [
      { text: "6 square units", isCorrect: true, rationale: "Area = 1/2 × 3 × 4 = 6." },
      { text: "12 square units", isCorrect: false },
      { text: "7.5 square units", isCorrect: false },
      { text: "9 square units", isCorrect: false }
    ],
    useGeometryTool: true,
  },
  {
    id: "geo_demo_2",
    questionType: "standalone",
    questionText: "Draw a circle with radius 5 units. What is its circumference?",
    answerOptions: [
      { text: "10π", isCorrect: true, rationale: "C = 2πr = 2 × π × 5." },
      { text: "25π", isCorrect: false },
      { text: "5π", isCorrect: false }
    ],
    useGeometryTool: true,
  },
  {
    id: "geo_demo_3",
    questionType: "standalone",
    questionText: "Construct a rectangle 6 units wide and 4 units tall. What is its perimeter?",
    answerOptions: [
      { text: "20 units", isCorrect: true, rationale: "P = 2(6 + 4) = 20." },
      { text: "24 units", isCorrect: false },
      { text: "12 units", isCorrect: false }
    ],
    useGeometryTool: true,
  },
  {
    id: "geo_demo_4",
    questionType: "standalone",
    questionText: "Measure the angle formed by the diagonals of a square. What is the measure of each angle?",
    answerOptions: [
      { text: "45°", isCorrect: true, rationale: "Each diagonal bisects the 90° corner." },
      { text: "60°", isCorrect: false },
      { text: "90°", isCorrect: false }
    ],
    useGeometryTool: true,
  },
];