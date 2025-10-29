// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "Solve for k: $\\frac{k}{4} = 6$.",
    "correctAnswer": "24",
    "rationale": "To solve for k, multiply both sides of the equation by 4. k = 6 * 4 = 24."
  },
  {
    "questionNumber": 2,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Which of the following is an expression, not an equation?",
    "answerOptions": [
      {
        "text": "$5x - 2 = 8$",
        "isCorrect": false,
        "rationale": "The equals sign makes this an equation."
      },
      {
        "text": "$7y + 4$",
        "isCorrect": true,
        "rationale": "An expression is a combination of numbers, variables, and operations without an equals sign."
      },
      {
        "text": "$a + b = c$",
        "isCorrect": false,
        "rationale": "The equals sign makes this an equation."
      },
      {
        "text": "$10 = 2 \\times 5$",
        "isCorrect": false,
        "rationale": "The equals sign makes this an equation."
      }
    ],
    "rationale": "An expression is a mathematical phrase that can contain numbers, variables, and operators, but does not have an equals sign. An equation sets two expressions equal to each other."
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Solve for x: $3(x - 4) = 15$.",
    "answerOptions": [
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This is 15/3."
      },
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "9",
        "isCorrect": true,
        "rationale": "Divide by 3 to get x-4=5. Then add 4 to get x=9."
      },
      {
        "text": "19",
        "isCorrect": false,
        "rationale": "This is 15+4."
      }
    ],
    "rationale": "First, divide both sides by 3: x - 4 = 5. Then, add 4 to both sides: x = 9."
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "Find the slope of a line that passes through (1, 6) and (3, 2).",
    "correctAnswer": "-2",
    "rationale": "Slope = (change in y) / (change in x) = (2 - 6) / (3 - 1) = -4 / 2 = -2."
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the y-intercept of the line $y = 7x$?",
    "answerOptions": [
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "This is the slope."
      },
      {
        "text": "0",
        "isCorrect": true,
        "rationale": "The equation can be written as y = 7x + 0. The y-intercept is 0, meaning the line passes through the origin."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "Cannot be determined",
        "isCorrect": false,
        "rationale": "The y-intercept is determined."
      }
    ],
    "rationale": "The slope-intercept form is y = mx + b. In this equation, b (the y-intercept) is 0. This means the line passes through the origin (0,0)."
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "The sum of three consecutive even integers is 72. What is the smallest of the three integers?",
    "answerOptions": [
      {
        "text": "20",
        "isCorrect": false,
        "rationale": "20+22+24 = 66."
      },
      {
        "text": "22",
        "isCorrect": true,
        "rationale": "Let the integers be n, n+2, n+4. 3n+6=72. 3n=66. n=22."
      },
      {
        "text": "24",
        "isCorrect": false,
        "rationale": "This is the middle integer."
      },
      {
        "text": "26",
        "isCorrect": false,
        "rationale": "This is the largest integer."
      }
    ],
    "rationale": "Let the three consecutive even integers be n, n+2, and n+4. Their sum is n + (n+2) + (n+4) = 72. Combine like terms: 3n + 6 = 72. Subtract 6: 3n = 66. Divide by 3: n = 22. The integers are 22, 24, and 26."
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "If $f(x) = x^2 - 10$, find $f(3)$.",
    "correctAnswer": "-1",
    "rationale": "Substitute 3 for x: f(3) = (3)² - 10 = 9 - 10 = -1."
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "Which expression is equivalent to $(x+3)^2$?",
    "answerOptions": [
      {
        "text": "$x^2 + 9$",
        "isCorrect": false,
        "rationale": "This misses the middle term 2ab."
      },
      {
        "text": "$x^2 + 6x + 9$",
        "isCorrect": true,
        "rationale": "(x+3)(x+3) = $x^2$ + 3x + 3x + 9 = $x^2$ + 6x + 9."
      },
      {
        "text": "$x^2 + 3x + 9$",
        "isCorrect": false,
        "rationale": "This misses one of the 3x terms."
      },
      {
        "text": "$2x + 6$",
        "isCorrect": false,
        "rationale": "This is 2(x+3)."
      }
    ],
    "rationale": "To square a binomial, you can use the formula $(a+b)^2 = a^2 + 2ab + b^2$. Here, a=x and b=3, so the result is $x^2 + 2(x)(3) + 3^2 = $x^2$ + 6x + 9$."
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "Solve for x: $x/2 - 5 = 3$.",
    "correctAnswer": "16",
    "rationale": "Add 5 to both sides: x/2 = 8. Multiply both sides by 2: x = 16."
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A movie theater sells adult tickets for $12 and child tickets for $8. If a family buys 2 adult tickets and 4 child tickets, what is the total cost?",
    "answerOptions": [
      {
        "text": "$24",
        "isCorrect": false,
        "rationale": "This is the cost of the adult tickets."
      },
      {
        "text": "$32",
        "isCorrect": false,
        "rationale": "This is the cost of the child tickets."
      },
      {
        "text": "$56",
        "isCorrect": true,
        "rationale": "Adults: 2 * $12 = $24. Children: 4 * $8 = $32. Total: $24 + $32 = $56."
      },
      {
        "text": "$72",
        "isCorrect": false,
        "rationale": "This is 6*12."
      }
    ],
    "rationale": "Calculate the cost for each type of ticket and add them together. Adult cost = 2 * $12 = $24. Child cost = 4 * $8 = $32. Total cost = $24 + $32 = $56."
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "Which of the following lines is perpendicular to the x-axis?",
    "answerOptions": [
      {
        "text": "y = 3",
        "isCorrect": false,
        "rationale": "This is a horizontal line, parallel to the x-axis."
      },
      {
        "text": "x = -2",
        "isCorrect": true,
        "rationale": "A vertical line, such as x = -2, is perpendicular to the horizontal x-axis."
      },
      {
        "text": "y = x",
        "isCorrect": false,
        "rationale": "This line has a slope of 1."
      },
      {
        "text": "y = -x",
        "isCorrect": false,
        "rationale": "This line has a slope of -1."
      }
    ],
    "rationale": "The x-axis is a horizontal line. A line that is perpendicular to a horizontal line must be a vertical line. The equation of a vertical line is always in the form x = c, where c is a constant."
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Which inequality represents 'a number is no more than 20'?",
    "answerOptions": [
      {
        "text": "$n < 20$",
        "isCorrect": false,
        "rationale": "This means 'less than 20'."
      },
      {
        "text": "$n > 20$",
        "isCorrect": false,
        "rationale": "This means 'more than 20'."
      },
      {
        "text": "$n \\leq 20$",
        "isCorrect": true,
        "rationale": "'No more than' means less than or equal to."
      },
      {
        "text": "$n \\geq 20$",
        "isCorrect": false,
        "rationale": "This means 'at least 20'."
      }
    ],
    "rationale": "The phrase 'no more than 20' means the number can be 20 or any value less than 20. This is represented by the inequality $n \\leq 20$."
  }
];
