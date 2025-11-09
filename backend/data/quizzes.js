// data/quizzes.js
// Minimal catalog so /api/all-quizzes can populate Smith-a-Quiz for every subject.

const ALL_QUIZZES = {
  "Math": {
    icon: "📐",
    categories: {
      "Number Sense & Operations": {
        description: "Whole numbers, fractions, decimals, percents.",
        topics: [
          { id: "math-fractions", title: "Fractions", subtopic: "Fractions", questions: [] },
          { id: "math-decimals", title: "Decimals", subtopic: "Decimals", questions: [] },
          { id: "math-percents", title: "Percents", subtopic: "Percents", questions: [] }
        ]
      },
      "Algebra & Functions": {
        description: "Expressions, equations, inequalities.",
        topics: [
          { id: "math-linear", title: "Linear Equations", subtopic: "Linear Equations", questions: [] },
          { id: "math-inequalities", title: "Inequalities", subtopic: "Inequalities", questions: [] }
        ]
      },
      "Geometry & Measurement": {
        description: "Perimeter, area, volume, angles.",
        topics: [
          { id: "math-geometry", title: "Plane Geometry", subtopic: "Geometry", questions: [] }
        ]
      }
    }
  },

  "Science": {
    icon: "🧪",
    categories: {
      "Life Science": {
        description: "Cells, human body systems, ecosystems.",
        topics: [
          { id: "sci-human-body", title: "Human Body Systems", subtopic: "Human Body Systems", questions: [] },
          { id: "sci-cells", title: "Cells & Organelles", subtopic: "Cells", questions: [] }
        ]
      },
      "Physical Science": {
        description: "Matter, energy, motion.",
        topics: [
          { id: "sci-energy", title: "Energy & Work", subtopic: "Energy", questions: [] },
          { id: "sci-motion", title: "Forces & Motion", subtopic: "Motion", questions: [] }
        ]
      },
      "Earth & Space Science": {
        description: "Earth systems, weather, space.",
        topics: [
          { id: "sci-earth-systems", title: "Earth Systems", subtopic: "Earth Systems", questions: [] },
          { id: "sci-space", title: "Solar System", subtopic: "Astronomy", questions: [] }
        ]
      }
    }
  },

  "Social Studies": {
    icon: "🌎",
    categories: {
      "Civics & Government": {
        description: "U.S. government, rights, responsibilities.",
        topics: [
          { id: "ss-govt", title: "U.S. Government", subtopic: "Civics", questions: [] }
        ]
      },
      "U.S. History": {
        description: "Key eras, founding documents.",
        topics: [
          { id: "ss-revolution", title: "American Revolution", subtopic: "U.S. History", questions: [] }
        ]
      },
      "Economics & Geography": {
        description: "Basic econ, maps, global issues.",
        topics: [
          { id: "ss-econ", title: "Economics Basics", subtopic: "Economics", questions: [] }
        ]
      }
    }
  },

  "RLA": {
    icon: "📘",
    categories: {
      "Reading": {
        description: "Comprehension of literary & informational texts.",
        topics: [
          { id: "rla-literary", title: "Literary Texts", subtopic: "Reading", questions: [] },
          { id: "rla-informational", title: "Informational Texts", subtopic: "Reading", questions: [] }
        ]
      },
      "Language": {
        description: "Grammar, usage, mechanics.",
        topics: [
          { id: "rla-grammar", title: "Grammar & Usage", subtopic: "Language", questions: [] }
        ]
      }
    }
  }
};

module.exports = { ALL_QUIZZES };
