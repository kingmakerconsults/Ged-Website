export const quizzes = [];
quizzes.push({
  subject: "Math",
  topic: "Algebra & Linear Equations",
  id: "math_algebra_02",
  title: "Algebra & Linear Equations: Quiz 2",
  questions: [
    {
      questionNumber: 1,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Solve for b: $b - 9 = 2$.",
      correctAnswer: "11",
      rationale: "To solve for b, add 9 to both sides of the equation: 2 + 9 = 11."
    },
    {
      questionNumber: 2,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which expression is equivalent to $5x + 3x - x$?",
      answerOptions: [
        { text: "$8x$", isCorrect: false, rationale: "This is the result of 5x + 3x, but does not subtract x." },
        { text: "$7x$", isCorrect: true, rationale: "Combine the like terms: 5 + 3 - 1 = 7. So, 7x." },
        { text: "$9x$", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$x^7$", isCorrect: false, rationale: "This is an incorrect application of exponent rules." }
      ],
      rationale: "Combine the coefficients of the like terms: 5 + 3 - 1 = 7. The simplified expression is 7x."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Solve for z: $\\frac{z}{5} + 3 = 7$.",
      answerOptions: [
        { text: "4", isCorrect: false, rationale: "This is the result before multiplying by 5." },
        { text: "10", isCorrect: false, rationale: "This is the result if you subtract 3 from 7 and then add 5." },
        { text: "20", isCorrect: true, rationale: "Subtract 3 from both sides to get z/5 = 4, then multiply by 5 to get z = 20." },
        { text: "50", isCorrect: false, rationale: "This is the result if you add 3 to 7." }
      ],
      rationale: "First, subtract 3 from both sides: z/5 = 7 - 3, so z/5 = 4. Then, multiply by 5: z = 4 * 5 = 20."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Expand the expression: $(x - 4)(x + 4)$.",
      correctAnswer: "$x^2$ - 16",
      rationale: "This is a difference of squares. Using the FOIL method: First (x*x = $x^2$), Outer (x*4 = 4x), Inner (-4*x = -4x), Last (-4*4 = -16). The middle terms cancel out: $x^2$ + 4x - 4x - 16 = $x^2$ - 16."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the slope of a horizontal line?",
      answerOptions: [
        { text: "1", isCorrect: false, rationale: "A slope of 1 means the line rises one unit for every one unit it runs." },
        { text: "0", isCorrect: true, rationale: "A horizontal line has zero \'rise\' for any \'run\', so the slope is 0." },
        { text: "Undefined", isCorrect: false, rationale: "A vertical line has an undefined slope." },
        { text: "-1", isCorrect: false, rationale: "A line with a slope of -1 falls one unit for every one unit it runs." }
      ],
      rationale: "A horizontal line has no change in its y-value (rise = 0). Therefore, the slope (rise/run) is 0."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "Solve the equation for x: $5(x - 2) = 2(x + 4)$.",
      answerOptions: [
        { text: "2", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "3", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "6", isCorrect: true, rationale: "Distribute on both sides: 5x - 10 = 2x + 8. Subtract 2x from both sides: 3x - 10 = 8. Add 10 to both sides: 3x = 18. Divide by 3: x = 6." },
        { text: "9", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "First, distribute the numbers on both sides: 5x - 10 = 2x + 8. Next, get the x terms on one side: 3x - 10 = 8. Then, isolate the x term: 3x = 18. Finally, divide by 3: x = 6."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "If $f(x) = -4x + 7$, what is $f(-3)$?",
      correctAnswer: "19",
      rationale: "Substitute -3 for x: f(-3) = -4(-3) + 7 = 12 + 7 = 19."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Solve the inequality: $-3x + 4 \leq 16$.",
      answerOptions: [
        { text: "x \leq -4", isCorrect: false, rationale: "The inequality sign should be reversed when dividing by a negative number." },
        { text: "x \geq -4", isCorrect: true, rationale: "Subtract 4: -3x <= 12. Divide by -3 and reverse the inequality sign: x >= -4." },
        { text: "x \leq 4", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "x \geq 4", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "First, subtract 4 from both sides: -3x \leq 12. Then, divide by -3. Remember to reverse the inequality sign when dividing by a negative number: x \geq -4."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the y-intercept of the line $3x - 2y = 6$?",
      correctAnswer: "-3",
      rationale: "To find the y-intercept, set x = 0. The equation becomes 3(0) - 2y = 6, so -2y = 6. Solve for y to get y = -3."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "The sum of two consecutive integers is 37. What are the integers?",
      answerOptions: [
        { text: "17 and 18", isCorrect: false, rationale: "17+18 = 35." },
        { text: "18 and 19", isCorrect: true, rationale: "Let the integers be n and n+1. n + (n+1) = 37. 2n + 1 = 37. 2n = 36. n = 18. The integers are 18 and 19." },
        { text: "19 and 20", isCorrect: false, rationale: "19+20 = 39." },
        { text: "15 and 16", isCorrect: false, rationale: "15+16 = 31." }
      ],
      rationale: "Let the first integer be n. The next consecutive integer is n+1. Their sum is n + (n+1) = 37. Combine like terms: 2n + 1 = 37. Subtract 1: 2n = 36. Divide by 2: n = 18. The integers are 18 and 19."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "What is the slope of a line perpendicular to $2x + 3y = 6$?",
      answerOptions: [
        { text: "-2/3", isCorrect: false, rationale: "This is the slope of the original line." },
        { text: "2/3", isCorrect: false, rationale: "This is the negative of the slope." },
        { text: "-3/2", isCorrect: false, rationale: "This is the reciprocal, but not the negative reciprocal." },
        { text: "3/2", isCorrect: true, rationale: "First, find the slope of the line by rewriting in y=mx+b form: y = (-2/3)x + 2. The slope is -2/3. The perpendicular slope is the negative reciprocal, which is 3/2." }
      ],
      rationale: "First, convert the equation to slope-intercept form (y = mx + b). 3y = -2x + 6, so y = (-2/3)x + 2. The slope of this line is -2/3. The slope of a perpendicular line is the negative reciprocal, which is 3/2."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Translate the following sentence into an equation: \'A number increased by 10 is 25.\'",
      answerOptions: [
        { text: "n - 10 = 25", isCorrect: false, rationale: "This represents \'a number decreased by 10\'." },
        { text: "10n = 25", isCorrect: false, rationale: "This represents \'10 times a number\'." },
        { text: "n + 10 = 25", isCorrect: true, rationale: "\'Increased by\' means addition." },
        { text: "n/10 = 25", isCorrect: false, rationale: "This represents \'a number divided by 10\'." }
      ],
      rationale: "Let \'n\' be the number. \'Increased by 10\' means adding 10, so the equation is n + 10 = 25."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Algebra & Linear Equations",
  id: "math_algebra_03",
  title: "Algebra & Linear Equations: Quiz 3",
  questions: [
    {
      questionNumber: 1,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Evaluate the expression $x/3 + 2$ for $x = 12$.",
      correctAnswer: "6",
      rationale: "Substitute 12 for x: 12/3 + 2 = 4 + 2 = 6."
    },
    {
      questionNumber: 2,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Solve for x: $7x = 42$.",
      answerOptions: [
        { text: "6", isCorrect: true, rationale: "Divide both sides by 7: 42 / 7 = 6." },
        { text: "7", isCorrect: false, rationale: "This is the coefficient of x." },
        { text: "49", isCorrect: false, rationale: "This is the result of adding 7." },
        { text: "294", isCorrect: false, rationale: "This is the result of multiplying by 7." }
      ],
      rationale: "To solve for x, divide both sides of the equation by 7. x = 42 / 7 = 6."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Simplify the expression: $4(x - 3) + 2(x + 1)$.",
      answerOptions: [
        { text: "6x - 11", isCorrect: false, rationale: "Check the constant term: -12 + 2 = -10." },
        { text: "6x - 10", isCorrect: true, rationale: "Distribute: 4x - 12 + 2x + 2. Combine like terms: 6x - 10." },
        { text: "2x - 11", isCorrect: false, rationale: "This subtracts 2x from 4x." },
        { text: "6x - 14", isCorrect: false, rationale: "This subtracts 2 from -12." }
      ],
      rationale: "First, distribute the numbers: (4x - 12) + (2x + 2). Then, combine like terms: (4x + 2x) + (-12 + 2) = 6x - 10."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the slope of the line passing through (2, 5) and (4, 1)?",
      correctAnswer: "-2",
      rationale: "Slope = (change in y) / (change in x) = (1 - 5) / (4 - 2) = -4 / 2 = -2."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of the following ordered pairs is a solution to the equation $y = 3x - 2$?",
      answerOptions: [
        { text: "(1, 1)", isCorrect: true, rationale: "If x=1, y = 3(1) - 2 = 1. So (1, 1) is a solution." },
        { text: "(2, 5)", isCorrect: false, rationale: "If x=2, y = 3(2) - 2 = 4." },
        { text: "(0, 2)", isCorrect: false, rationale: "If x=0, y = 3(0) - 2 = -2." },
        { text: "(-1, -4)", isCorrect: false, rationale: "If x=-1, y = 3(-1) - 2 = -5." }
      ],
      rationale: "Substitute the x-value from each ordered pair into the equation and check if it produces the corresponding y-value. For (1,1): y = 3(1) - 2 = 3 - 2 = 1. This matches."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "Solve for x: $3x + 8 = 5x - 6$.",
      answerOptions: [
        { text: "1", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "2", isCorrect: false, rationale: "This is the result if you add 6 and 8 on the same side." },
        { text: "7", isCorrect: true, rationale: "Subtract 3x from both sides: 8 = 2x - 6. Add 6 to both sides: 14 = 2x. Divide by 2: x = 7." },
        { text: "14", isCorrect: false, rationale: "This is 2x, not x." }
      ],
      rationale: "To solve for x, first get the x terms on one side: 8 = 2x - 6. Then isolate the x term by adding 6 to both sides: 14 = 2x. Finally, divide by 2: x = 7."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Factor the expression: $x^2 - 49$.",
      correctAnswer: "(x - 7)(x + 7)",
      rationale: "This is a difference of squares, which factors into (a - b)(a + b). Here, a=x and b=7."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "The equation of a line is $y = \\frac{1}{2}x + 3$. What is the equation of a line that is parallel to it and passes through the origin (0,0)?",
      answerOptions: [
        { text: "$y = -2x$", isCorrect: false, rationale: "This is a perpendicular line." },
        { text: "$y = \\frac{1}{2}x$", isCorrect: true, rationale: "A parallel line has the same slope (1/2). A line passing through the origin has a y-intercept of 0." },
        { text: "$y = 2x$", isCorrect: false, rationale: "This is an incorrect slope." },
        { text: "$y = \\frac{1}{2}x - 3$", isCorrect: false, rationale: "This does not pass through the origin." }
      ],
      rationale: "A parallel line must have the same slope, which is 1/2. A line that passes through the origin has a y-intercept of 0. So the equation is y = (1/2)x + 0, or y = (1/2)x."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "If $f(x) = 2x^2 - 3x + 1$, find $f(4)$.",
      correctAnswer: "21",
      rationale: "Substitute 4 for x: f(4) = 2(4)$^2$ - 3(4) + 1 = 2(16) - 12 + 1 = 32 - 12 + 1 = 21."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Tickets to a concert cost $15 for adults and $10 for children. If a group of 4 adults and 3 children buy tickets, what is the total cost?",
      answerOptions: [
        { text: "$75", isCorrect: false, rationale: "This is the cost for 5 adults." },
        { text: "$80", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$90", isCorrect: true, rationale: "Cost for adults: 4 * $15 = $60. Cost for children: 3 * $10 = $30. Total cost: $60 + $30 = $90." },
        { text: "$105", isCorrect: false, rationale: "This is the cost for 7 adults." }
      ],
      rationale: "Calculate the cost for each group and then add them together. Adult cost = 4 * $15 = $60. Child cost = 3 * $10 = $30. Total = $60 + $30 = $90."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Factor the trinomial: $x^2 + 8x + 15$.",
      answerOptions: [
        { text: "$(x + 8)(x + 15)$", isCorrect: false, rationale: "The constants would multiply to 120." },
        { text: "$(x + 3)(x + 5)$", isCorrect: true, rationale: "We need two numbers that multiply to 15 and add to 8. These numbers are 3 and 5." },
        { text: "$(x - 3)(x - 5)$", isCorrect: false, rationale: "This would result in a middle term of -8x." },
        { text: "$(x + 1)(x + 15)$", isCorrect: false, rationale: "The middle term would be 16x." }
      ],
      rationale: "To factor the trinomial, we look for two numbers that multiply to 15 and add up to 8. These two numbers are 3 and 5. So, the factored form is (x + 3)(x + 5)."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which of the following inequalities corresponds to the statement \'x is at least 12\'?",
      answerOptions: [
        { text: "$x < 12$", isCorrect: false, rationale: "This means x is less than 12." },
        { text: "$x > 12$", isCorrect: false, rationale: "This means x is strictly greater than 12." },
        { text: "$x \\leq 12$", isCorrect: false, rationale: "This means x is at most 12." },
        { text: "$x \\geq 12$", isCorrect: true, rationale: "\'At least\' means greater than or equal to." }
      ],
      rationale: "The phrase \'at least 12\' means that x can be 12 or any number greater than 12. This is represented by the inequality $x \\geq 12$."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Algebra & Linear Equations",
  id: "math_algebra_04",
  title: "Algebra & Linear Equations: Quiz 4",
  questions: [
    {
      questionNumber: 1,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Solve for y: $y + 12 = 20$.",
      correctAnswer: "8",
      rationale: "Subtract 12 from both sides of the equation: 20 - 12 = 8."
    },
    {
      questionNumber: 2,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Evaluate $15 - 2b$ for $b = 6$.",
      answerOptions: [
        { text: "3", isCorrect: true, rationale: "Substitute 6 for \'b\': 15 - 2(6) = 15 - 12 = 3." },
        { text: "9", isCorrect: false, rationale: "This is 15-6." },
        { text: "13", isCorrect: false, rationale: "This is 15-2." },
        { text: "78", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Substitute 6 for b in the expression: 15 - 2(6) = 15 - 12 = 3."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Solve for x: $-5x - 4 = 11$.",
      answerOptions: [
        { text: "-3", isCorrect: true, rationale: "Add 4 to both sides: -5x = 15. Divide by -5: x = -3." },
        { text: "3", isCorrect: false, rationale: "This ignores the negative sign on the 5." },
        { text: "-1.4", isCorrect: false, rationale: "This is the result if you subtract 4." },
        { text: "-15", isCorrect: false, rationale: "This is -5x." }
      ],
      rationale: "First, add 4 to both sides: -5x = 11 + 4, so -5x = 15. Then, divide by -5: x = 15 / -5 = -3."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Simplify: $x(x + 5) - 3x$.",
      correctAnswer: "$x^2$ + 2x",
      rationale: "First, distribute x: $x^2$ + 5x - 3x. Then, combine like terms: $x^2$ + 2x."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of the following equations has a slope of 2 and a y-intercept of -3?",
      answerOptions: [
        { text: "$y = -3x + 2$", isCorrect: false, rationale: "This has a slope of -3 and a y-intercept of 2." },
        { text: "$y = 2x - 3$", isCorrect: true, rationale: "This matches the slope-intercept form y = mx + b with m=2 and b=-3." },
        { text: "$y = 2x + 3$", isCorrect: false, rationale: "This has a y-intercept of 3." },
        { text: "$y = 3x - 2$", isCorrect: false, rationale: "This has a slope of 3 and a y-intercept of -2." }
      ],
      rationale: "The slope-intercept form of a linear equation is y = mx + b, where \'m\' is the slope and \'b\' is the y-intercept. The equation with m=2 and b=-3 is y = 2x - 3."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "Find the x-intercept of the line $5x - 3y = 15$.",
      answerOptions: [
        { text: "3", isCorrect: true, rationale: "Set y=0: 5x = 15. So x=3." },
        { text: "-5", isCorrect: false, rationale: "This is the y-intercept." },
        { text: "5", isCorrect: false, rationale: "This is the coefficient of x." },
        { text: "-3", isCorrect: false, rationale: "This is the coefficient of y." }
      ],
      rationale: "To find the x-intercept, set y = 0. The equation becomes 5x - 3(0) = 15, so 5x = 15. Divide by 5 to get x = 3."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Solve the inequality: $4x - 5 < 11$.",
      correctAnswer: "x < 4",
      rationale: "Add 5 to both sides: 4x < 16. Divide by 4: x < 4."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "If $f(x) = |2x - 8|$, what is $f(3)$?",
      answerOptions: [
        { text: "-2", isCorrect: false, rationale: "The result of absolute value is always non-negative." },
        { text: "2", isCorrect: true, rationale: "f(3) = |2(3) - 8| = |6 - 8| = |-2| = 2." },
        { text: "14", isCorrect: false, rationale: "This is |2(3)+8|." },
        { text: "-14", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Substitute 3 for x: f(3) = |2(3) - 8| = |6 - 8| = |-2|. The absolute value of -2 is 2."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the slope of the line that is perpendicular to the line passing through (2, 2) and (5, 8)?",
      correctAnswer: "-1/2",
      rationale: "First, find the slope of the line: m = (8-2)/(5-2) = 6/3 = 2. The slope of a perpendicular line is the negative reciprocal, which is -1/2."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A taxi charges a $3 flat fee plus $2 per mile. Which equation represents the total cost C for a trip of \'m\' miles?",
      answerOptions: [
        { text: "C = 3m + 2", isCorrect: false, rationale: "This reverses the flat fee and the per-mile charge." },
        { text: "C = 2m + 3", isCorrect: true, rationale: "The total cost is the variable charge (2m) plus the fixed fee (3)." },
        { text: "C = 5m", isCorrect: false, rationale: "This combines the charges incorrectly." },
        { text: "C = 3(m+2)", isCorrect: false, rationale: "This is an incorrect representation." }
      ],
      rationale: "The total cost is the sum of the flat fee ($3) and the variable charge, which is $2 per mile times the number of miles (m). So, C = 2m + 3."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "What is the solution set for the equation $x^2 - 6x + 5 = 0$?",
      answerOptions: [
        { text: "{1, 5}", isCorrect: true, rationale: "Factor the quadratic to (x-1)(x-5)=0. The solutions are x=1 and x=5." },
        { text: "{-1, -5}", isCorrect: false, rationale: "This gives a middle term of +6x." },
        { text: "{1, -5}", isCorrect: false, rationale: "This gives a constant term of -5." },
        { text: "{-1, 5}", isCorrect: false, rationale: "This gives a constant term of -5." }
      ],
      rationale: "To solve the quadratic equation, factor the trinomial. We need two numbers that multiply to 5 and add to -6. These are -1 and -5. So, (x - 1)(x - 5) = 0. The solutions are x = 1 and x = 5."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Simplify: $\\frac{x^8}{x^2}$",
      answerOptions: [
        { text: "$x^4$", isCorrect: false, rationale: "This is the result of dividing the exponents." },
        { text: "$x^6$", isCorrect: true, rationale: "When dividing powers with the same base, subtract the exponents: 8 - 2 = 6." },
        { text: "$x^{10}$", isCorrect: false, rationale: "This is the result of adding the exponents." },
        { text: "$x^{16}$", isCorrect: false, rationale: "This is the result of multiplying the exponents." }
      ],
      rationale: "When dividing exponential expressions with the same base, you subtract the exponents. So, $\\frac{x^8}{x^2} = x^{8-2} = x^6$."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Algebra & Linear Equations",
  id: "math_algebra_05",
  title: "Algebra & Linear Equations: Quiz 5",
  questions: [
    {
      questionNumber: 1,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Solve for n: $5n = 45$.",
      correctAnswer: "9",
      rationale: "To solve for n, divide both sides of the equation by 5. n = 45 / 5 = 9."
    },
    {
      questionNumber: 2,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Simplify the expression $10y - 4y + y$.",
      answerOptions: [
        { text: "$6y$", isCorrect: false, rationale: "This is 10y - 4y, but does not add the final y." },
        { text: "$7y$", isCorrect: true, rationale: "Combine the coefficients: 10 - 4 + 1 = 7. The result is 7y." },
        { text: "$5y$", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$15y$", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Combine the like terms by adding and subtracting their coefficients: 10 - 4 + 1 = 7. So, the simplified expression is 7y."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Solve for a: $2(a + 5) = 16$.",
      answerOptions: [
        { text: "3", isCorrect: true, rationale: "Divide both sides by 2 to get a + 5 = 8. Then subtract 5 to get a = 3." },
        { text: "5.5", isCorrect: false, rationale: "This is the result of an incorrect calculation." },
        { text: "8", isCorrect: false, rationale: "This is a+5." },
        { text: "11", isCorrect: false, rationale: "This is the result if you subtract 5 before dividing." }
      ],
      rationale: "First, divide both sides by 2: a + 5 = 8. Then, subtract 5 from both sides: a = 3."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the slope of the line that passes through (0, 4) and (2, 0)?",
      correctAnswer: "-2",
      rationale: "The slope is the change in y divided by the change in x. m = (0 - 4) / (2 - 0) = -4 / 2 = -2."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Translate \'the product of a number and 6, increased by 3\' into an algebraic expression.",
      answerOptions: [
        { text: "$6(n + 3)$", isCorrect: false, rationale: "This is \'6 times the sum of a number and 3\'." },
        { text: "$6n + 3$", isCorrect: true, rationale: "The product of a number and 6 is 6n. \'Increased by 3\' means to add 3." },
        { text: "$n + 6 + 3$", isCorrect: false, rationale: "This is a sum, not a product." },
        { text: "$3n + 6$", isCorrect: false, rationale: "This reverses the numbers." }
      ],
      rationale: "Let \'n\' be the number. \'The product of a number and 6\' is 6n. \'Increased by 3\' means to add 3 to this term. So, the expression is 6n + 3."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "Solve the inequality: $7 - 2x < 1$.",
      answerOptions: [
        { text: "$x < 3$", isCorrect: false, rationale: "The inequality sign should be reversed." },
        { text: "$x > 3$", isCorrect: true, rationale: "Subtract 7: -2x < -6. Divide by -2 and reverse the inequality: x > 3." },
        { text: "$x < -3$", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$x > -3$", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "First, subtract 7 from both sides: -2x < -6. Then, divide by -2. Remember to reverse the inequality sign when dividing by a negative number: x > 3."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "If $g(x) = 5 - x^2$, what is $g(3)$?",
      correctAnswer: "-4",
      rationale: "Substitute 3 for x: g(3) = 5 - (3)$^2$ = 5 - 9 = -4."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "What is the greatest common factor (GCF) of $12x^2$ and $18x$?",
      answerOptions: [
        { text: "$6$", isCorrect: false, rationale: "This is the GCF of the coefficients, but ignores the variable." },
        { text: "$6x$", isCorrect: true, rationale: "The GCF of 12 and 18 is 6. The GCF of x² and x is x. So, the GCF is 6x." },
        { text: "$3x$", isCorrect: false, rationale: "This is a common factor, but not the greatest." },
        { text: "$36x^2$", isCorrect: false, rationale: "This is the least common multiple (LCM)." }
      ],
      rationale: "Find the GCF of the coefficients (12 and 18), which is 6. Find the GCF of the variables (x² and x), which is x. Combine them to get 6x."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the equation of a line with a slope of -4 and a y-intercept of 5?",
      correctAnswer: "y = -4x + 5",
      rationale: "Using the slope-intercept form y = mx + b, substitute m = -4 and b = 5."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "The perimeter of a rectangle is 40 inches. If the width is 8 inches, what is the length?",
      answerOptions: [
        { text: "12 inches", isCorrect: true, rationale: "P = 2(L+W). 40 = 2(L+8). 20 = L+8. L = 12." },
        { text: "16 inches", isCorrect: false, rationale: "This would give a perimeter of 48." },
        { text: "24 inches", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "32 inches", isCorrect: false, rationale: "This is 40-8." }
      ],
      rationale: "The formula for the perimeter is P = 2L + 2W. 40 = 2L + 2(8). 40 = 2L + 16. 24 = 2L. L = 12 inches."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Solve the system of equations: $x + y = 10$ and $x - y = 4$.",
      answerOptions: [
        { text: "$x=7, y=3$", isCorrect: true, rationale: "Add the two equations to get 2x = 14, so x=7. Substitute x=7 into the first equation: 7+y=10, so y=3." },
        { text: "$x=3, y=7$", isCorrect: false, rationale: "The values are reversed." },
        { text: "$x=6, y=4$", isCorrect: false, rationale: "This satisfies the second equation but not the first." },
        { text: "$x=10, y=-6$", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "You can solve this system by elimination. Add the two equations together: (x + y) + (x - y) = 10 + 4. This simplifies to 2x = 14, so x = 7. Substitute x=7 into the first equation: 7 + y = 10. Solve for y: y = 3. The solution is (7, 3)."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the value of $(5^2)^3$?",
      answerOptions: [
        { text: "$5^5$", isCorrect: false, rationale: "This is the result of adding the exponents." },
        { text: "$5^6$", isCorrect: true, rationale: "When raising a power to a power, you multiply the exponents: 2 * 3 = 6." },
        { text: "$10^3$", isCorrect: false, rationale: "The base does not change." },
        { text: "$25^3$", isCorrect: false, rationale: "This is an intermediate step, not the final simplified form." }
      ],
      rationale: "The rule for raising a power to another power is to multiply the exponents. So, $(5^2)^3 = 5^{2 \\times 3} = 5^6$."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Algebra & Linear Equations",
  id: "math_algebra_06",
  title: "Algebra & Linear Equations: Quiz 6",
  questions: [
    {
      questionNumber: 1,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Solve for x: $x - 7 = 11$.",
      correctAnswer: "18",
      rationale: "Add 7 to both sides of the equation: 11 + 7 = 18."
    },
    {
      questionNumber: 2,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Evaluate $5c + 4$ for $c = 3$.",
      answerOptions: [
        { text: "12", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "19", isCorrect: true, rationale: "Substitute 3 for c: 5(3) + 4 = 15 + 4 = 19." },
        { text: "27", isCorrect: false, rationale: "This is 5*(3+4)." },
        { text: "35", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Substitute 3 for c in the expression: 5(3) + 4 = 15 + 4 = 19."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Solve for p: $6p + 5 = 41$.",
      answerOptions: [
        { text: "6", isCorrect: true, rationale: "Subtract 5 from both sides: 6p = 36. Divide by 6: p = 6." },
        { text: "7.67", isCorrect: false, rationale: "This is 46/6." },
        { text: "9", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "36", isCorrect: false, rationale: "This is 6p." }
      ],
      rationale: "First, subtract 5 from both sides: 6p = 41 - 5, so 6p = 36. Then, divide by 6: p = 36 / 6 = 6."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Simplify the expression: $8(y - 2) - 3y$.",
      correctAnswer: "5y - 16",
      rationale: "First, distribute the 8: 8y - 16 - 3y. Then, combine like terms: (8y - 3y) - 16 = 5y - 16."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of the following is the equation of a line parallel to $y = -2x + 1$?",
      answerOptions: [
        { text: "$y = 2x + 3$", isCorrect: false, rationale: "This line has a different slope." },
        { text: "$y = -2x - 5$", isCorrect: true, rationale: "Parallel lines have the same slope. This line also has a slope of -2." },
        { text: "$y = (1/2)x + 1$", isCorrect: false, rationale: "This is a perpendicular line." },
        { text: "$y = x - 2$", isCorrect: false, rationale: "This line has a different slope." }
      ],
      rationale: "Parallel lines have the same slope. The given line has a slope of -2, and this option is the only other line with a slope of -2."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "Factor the expression: $2x^2 + 7x + 3$.",
      answerOptions: [
        { text: "$(2x + 1)(x + 3)$", isCorrect: true, rationale: "Using FOIL, (2x)(x) = 2$x^2$, (2x)(3) = 6x, (1)(x) = x, (1)(3) = 3. 2$x^2$ + 6x + x + 3 = 2$x^2$ + 7x + 3." },
        { text: "$(2x + 3)(x + 1)$", isCorrect: false, rationale: "This gives a middle term of 5x." },
        { text: "$(2x - 1)(x - 3)$", isCorrect: false, rationale: "This gives a middle term of -7x." },
        { text: "$(x + 1)(x + 3)$", isCorrect: false, rationale: "This would be for $x^2$." }
      ],
      rationale: "To factor this trinomial, we look for two binomials that multiply to give the original expression. By trial and error (or other factoring methods), we find that (2x + 1)(x + 3) expands to 2$x^2$ + 7x + 3."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the slope of a line passing through (5, 2) and (5, 8)?",
      correctAnswer: "Undefined",
      rationale: "The x-coordinates are the same, which means this is a vertical line. The slope of a vertical line is undefined."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Solve for x: $|x - 4| = 9$.",
      answerOptions: [
        { text: "x = 13", isCorrect: false, rationale: "This is only one of the solutions." },
        { text: "x = -5", isCorrect: false, rationale: "This is only one of the solutions." },
        { text: "x = 13 and x = -5", isCorrect: true, rationale: "Set x - 4 = 9 and x - 4 = -9. The solutions are x = 13 and x = -5." },
        { text: "x = 5 and x = -13", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "An absolute value equation has two cases. Case 1: x - 4 = 9, which gives x = 13. Case 2: x - 4 = -9, which gives x = -5."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "Given $f(x) = (x+2)^2$, find $f(4)$.",
      correctAnswer: "36",
      rationale: "Substitute 4 for x: f(4) = (4 + 2)² = (6)² = 36."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Three times a number, decreased by 5, is 16. What is the number?",
      answerOptions: [
        { text: "7", isCorrect: true, rationale: "Let n be the number. 3n - 5 = 16. 3n = 21. n = 7." },
        { text: "5", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "12", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "21", isCorrect: false, rationale: "This is 3n." }
      ],
      rationale: "Translate the sentence into an equation: 3n - 5 = 16. Add 5 to both sides: 3n = 21. Divide by 3: n = 7."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "What is the vertex of the parabola $y = 2(x + 1)^2 - 4$?",
      answerOptions: [
        { text: "(1, -4)", isCorrect: false, rationale: "The x-coordinate of the vertex is -1." },
        { text: "(-1, -4)", isCorrect: true, rationale: "The equation is in vertex form y = a(x - h)² + k, so the vertex is (h, k). Here h=-1 and k=-4." },
        { text: "(-1, 4)", isCorrect: false, rationale: "The y-coordinate of the vertex is -4." },
        { text: "(2, -4)", isCorrect: false, rationale: "The \'a\' value does not affect the vertex\'s location." }
      ],
      rationale: "The vertex form of a parabola is y = a(x - h)² + k, where (h, k) is the vertex. In this equation, h = -1 and k = -4."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which of the following expressions is equivalent to $4(3x)$?",
      answerOptions: [
        { text: "$7x$", isCorrect: false, rationale: "This is the sum, not the product." },
        { text: "$12x$", isCorrect: true, rationale: "This is the product of 4 and 3x." },
        { text: "$43x$", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$12x^2$", isCorrect: false, rationale: "There is only one x." }
      ],
      rationale: "This is a simple multiplication problem. 4 * 3x = 12x."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Algebra & Linear Equations",
  id: "math_algebra_07",
  title: "Algebra & Linear Equations: Quiz 7",
  questions: [
    {
      questionNumber: 1,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Solve for k: $\\frac{k}{4} = 6$.",
      correctAnswer: "24",
      rationale: "To solve for k, multiply both sides of the equation by 4. k = 6 * 4 = 24."
    },
    {
      questionNumber: 2,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which of the following is an expression, not an equation?",
      answerOptions: [
        { text: "$5x - 2 = 8$", isCorrect: false, rationale: "The equals sign makes this an equation." },
        { text: "$7y + 4$", isCorrect: true, rationale: "An expression is a combination of numbers, variables, and operations without an equals sign." },
        { text: "$a + b = c$", isCorrect: false, rationale: "The equals sign makes this an equation." },
        { text: "$10 = 2 \\times 5$", isCorrect: false, rationale: "The equals sign makes this an equation." }
      ],
      rationale: "An expression is a mathematical phrase that can contain numbers, variables, and operators, but does not have an equals sign. An equation sets two expressions equal to each other."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Solve for x: $3(x - 4) = 15$.",
      answerOptions: [
        { text: "5", isCorrect: false, rationale: "This is 15/3." },
        { text: "7", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "9", isCorrect: true, rationale: "Divide by 3 to get x-4=5. Then add 4 to get x=9." },
        { text: "19", isCorrect: false, rationale: "This is 15+4." }
      ],
      rationale: "First, divide both sides by 3: x - 4 = 5. Then, add 4 to both sides: x = 9."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Find the slope of a line that passes through (1, 6) and (3, 2).",
      correctAnswer: "-2",
      rationale: "Slope = (change in y) / (change in x) = (2 - 6) / (3 - 1) = -4 / 2 = -2."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the y-intercept of the line $y = 7x$?",
      answerOptions: [
        { text: "7", isCorrect: false, rationale: "This is the slope." },
        { text: "0", isCorrect: true, rationale: "The equation can be written as y = 7x + 0. The y-intercept is 0, meaning the line passes through the origin." },
        { text: "1", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "Cannot be determined", isCorrect: false, rationale: "The y-intercept is determined." }
      ],
      rationale: "The slope-intercept form is y = mx + b. In this equation, b (the y-intercept) is 0. This means the line passes through the origin (0,0)."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "The sum of three consecutive even integers is 72. What is the smallest of the three integers?",
      answerOptions: [
        { text: "20", isCorrect: false, rationale: "20+22+24 = 66." },
        { text: "22", isCorrect: true, rationale: "Let the integers be n, n+2, n+4. 3n+6=72. 3n=66. n=22." },
        { text: "24", isCorrect: false, rationale: "This is the middle integer." },
        { text: "26", isCorrect: false, rationale: "This is the largest integer." }
      ],
      rationale: "Let the three consecutive even integers be n, n+2, and n+4. Their sum is n + (n+2) + (n+4) = 72. Combine like terms: 3n + 6 = 72. Subtract 6: 3n = 66. Divide by 3: n = 22. The integers are 22, 24, and 26."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "If $f(x) = x^2 - 10$, find $f(3)$.",
      correctAnswer: "-1",
      rationale: "Substitute 3 for x: f(3) = (3)² - 10 = 9 - 10 = -1."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Which expression is equivalent to $(x+3)^2$?",
      answerOptions: [
        { text: "$x^2 + 9$", isCorrect: false, rationale: "This misses the middle term 2ab." },
        { text: "$x^2 + 6x + 9$", isCorrect: true, rationale: "(x+3)(x+3) = $x^2$ + 3x + 3x + 9 = $x^2$ + 6x + 9." },
        { text: "$x^2 + 3x + 9$", isCorrect: false, rationale: "This misses one of the 3x terms." },
        { text: "$2x + 6$", isCorrect: false, rationale: "This is 2(x+3)." }
      ],
      rationale: "To square a binomial, you can use the formula $(a+b)^2 = a^2 + 2ab + b^2$. Here, a=x and b=3, so the result is $x^2 + 2(x)(3) + 3^2 = $x^2$ + 6x + 9$."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "Solve for x: $x/2 - 5 = 3$.",
      correctAnswer: "16",
      rationale: "Add 5 to both sides: x/2 = 8. Multiply both sides by 2: x = 16."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A movie theater sells adult tickets for $12 and child tickets for $8. If a family buys 2 adult tickets and 4 child tickets, what is the total cost?",
      answerOptions: [
        { text: "$24", isCorrect: false, rationale: "This is the cost of the adult tickets." },
        { text: "$32", isCorrect: false, rationale: "This is the cost of the child tickets." },
        { text: "$56", isCorrect: true, rationale: "Adults: 2 * $12 = $24. Children: 4 * $8 = $32. Total: $24 + $32 = $56." },
        { text: "$72", isCorrect: false, rationale: "This is 6*12." }
      ],
      rationale: "Calculate the cost for each type of ticket and add them together. Adult cost = 2 * $12 = $24. Child cost = 4 * $8 = $32. Total cost = $24 + $32 = $56."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Which of the following lines is perpendicular to the x-axis?",
      answerOptions: [
        { text: "y = 3", isCorrect: false, rationale: "This is a horizontal line, parallel to the x-axis." },
        { text: "x = -2", isCorrect: true, rationale: "A vertical line, such as x = -2, is perpendicular to the horizontal x-axis." },
        { text: "y = x", isCorrect: false, rationale: "This line has a slope of 1." },
        { text: "y = -x", isCorrect: false, rationale: "This line has a slope of -1." }
      ],
      rationale: "The x-axis is a horizontal line. A line that is perpendicular to a horizontal line must be a vertical line. The equation of a vertical line is always in the form x = c, where c is a constant."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which inequality represents \'a number is no more than 20\'?",
      answerOptions: [
        { text: "$n < 20$", isCorrect: false, rationale: "This means \'less than 20\'." },
        { text: "$n > 20$", isCorrect: false, rationale: "This means \'more than 20\'." },
        { text: "$n \\leq 20$", isCorrect: true, rationale: "\'No more than\' means less than or equal to." },
        { text: "$n \\geq 20$", isCorrect: false, rationale: "This means \'at least 20\'." }
      ],
      rationale: "The phrase \'no more than 20\' means the number can be 20 or any value less than 20. This is represented by the inequality $n \\leq 20$."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Algebra & Linear Equations",
  id: "math_algebra_08",
  title: "Algebra & Linear Equations: Quiz 8",
  questions: [
    {
      questionNumber: 1,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Solve for m: $m + 11 = 30$.",
      correctAnswer: "19",
      rationale: "Subtract 11 from both sides of the equation: 30 - 11 = 19."
    },
    {
      questionNumber: 2,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Evaluate $10 - 3x$ for $x = 2$.",
      answerOptions: [
        { text: "1", isCorrect: false, rationale: "This is 10-9." },
        { text: "4", isCorrect: true, rationale: "Substitute 2 for x: 10 - 3(2) = 10 - 6 = 4." },
        { text: "7", isCorrect: false, rationale: "This is 10-3." },
        { text: "14", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Substitute 2 for x in the expression: 10 - 3(2) = 10 - 6 = 4."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Solve for y: $\\frac{y}{3} - 2 = 5$.",
      answerOptions: [
        { text: "9", isCorrect: false, rationale: "This is 3*3." },
        { text: "17", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "21", isCorrect: true, rationale: "Add 2 to both sides: y/3 = 7. Multiply by 3: y = 21." },
        { text: "1", isCorrect: false, rationale: "This is 3/3." }
      ],
      rationale: "First, add 2 to both sides: y/3 = 5 + 2, so y/3 = 7. Then, multiply by 3: y = 7 * 3 = 21."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Simplify the expression: $5a + 2b - 3a + 4b$.",
      correctAnswer: "2a + 6b",
      rationale: "Combine the \'a\' terms: 5a - 3a = 2a. Combine the \'b\' terms: 2b + 4b = 6b. The result is 2a + 6b."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the slope of a line perpendicular to $y = 3x - 1$?",
      answerOptions: [
        { text: "3", isCorrect: false, rationale: "This is the slope of a parallel line." },
        { text: "-3", isCorrect: false, rationale: "This is the negative of the slope." },
        { text: "1/3", isCorrect: false, rationale: "This is the reciprocal, but not negative." },
        { text: "-1/3", isCorrect: true, rationale: "The perpendicular slope is the negative reciprocal of the original slope." }
      ],
      rationale: "The slope of the given line is 3. The slope of a perpendicular line is the negative reciprocal, which is -1/3."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "Solve for x: $4(x + 1) = 2(x + 6)$.",
      answerOptions: [
        { text: "1", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "2", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "4", isCorrect: true, rationale: "Distribute: 4x + 4 = 2x + 12. 2x = 8. x = 4." },
        { text: "5", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "First, distribute on both sides: 4x + 4 = 2x + 12. Subtract 2x from both sides: 2x + 4 = 12. Subtract 4 from both sides: 2x = 8. Divide by 2: x = 4."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Factor the expression $x^2 - 100$.",
      correctAnswer: "(x - 10)(x + 10)",
      rationale: "This is a difference of squares, $a^2 - b^2$, which factors to $(a-b)(a+b)$. Here, a=x and b=10."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Solve the inequality: $10 - x \geq 15$.",
      answerOptions: [
        { text: "$x \geq 5$", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$x \leq 5$", isCorrect: false, rationale: "The sign on 5 should be negative." },
        { text: "$x \geq -5$", isCorrect: false, rationale: "The inequality should be reversed." },
        { text: "$x \leq -5$", isCorrect: true, rationale: "Subtract 10: -x >= 5. Multiply by -1 and reverse the inequality: x <= -5." }
      ],
      rationale: "First, subtract 10 from both sides: -x \geq 5. Then, multiply by -1 to solve for x, and remember to reverse the inequality sign: x \leq -5."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "If $f(x) = 2x - 7$, what is the value of x when $f(x) = 11$?",
      correctAnswer: "9",
      rationale: "Set the function equal to 11: 2x - 7 = 11. Add 7 to both sides: 2x = 18. Divide by 2: x = 9."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A number is doubled and then increased by 8. The result is 26. What is the number?",
      answerOptions: [
        { text: "9", isCorrect: true, rationale: "Let n be the number. 2n + 8 = 26. 2n = 18. n = 9." },
        { text: "17", isCorrect: false, rationale: "This is 26-9." },
        { text: "18", isCorrect: false, rationale: "This is 2n." },
        { text: "34", isCorrect: false, rationale: "This is 26+8." }
      ],
      rationale: "Let the number be n. \'A number is doubled\' is 2n. \'Increased by 8\' is 2n + 8. Set this equal to 26: 2n + 8 = 26. Subtract 8: 2n = 18. Divide by 2: n = 9."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Factor the trinomial: $x^2 - 3x - 10$.",
      answerOptions: [
        { text: "$(x - 5)(x + 2)$", isCorrect: true, rationale: "We need two numbers that multiply to -10 and add to -3. These are -5 and 2." },
        { text: "$(x + 5)(x - 2)$", isCorrect: false, rationale: "This gives a middle term of +3x." },
        { text: "$(x - 10)(x + 1)$", isCorrect: false, rationale: "This gives a middle term of -9x." },
        { text: "$(x - 2)(x - 5)$", isCorrect: false, rationale: "This gives a constant term of +10." }
      ],
      rationale: "To factor the trinomial, we look for two numbers that multiply to -10 and add to -3. These numbers are -5 and +2. So, the factored form is (x - 5)(x + 2)."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which point is the origin on the coordinate plane?",
      answerOptions: [
        { text: "(1, 1)", isCorrect: false, rationale: "This point is in Quadrant I." },
        { text: "(0, 0)", isCorrect: true, rationale: "The origin is the point where the x-axis and y-axis intersect." },
        { text: "(-1, 0)", isCorrect: false, rationale: "This point is on the x-axis." },
        { text: "(0, 1)", isCorrect: false, rationale: "This point is on the y-axis." }
      ],
      rationale: "The origin is the point of intersection of the x-axis and the y-axis, and its coordinates are (0, 0)."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Algebra & Linear Equations",
  id: "math_algebra_09",
  title: "Algebra & Linear Equations: Quiz 9",
  questions: [
    {
      questionNumber: 1,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Solve for x: $x + 9 = 17$.",
      correctAnswer: "8",
      rationale: "Subtract 9 from both sides of the equation: 17 - 9 = 8."
    },
    {
      questionNumber: 2,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Evaluate $4w - 3$ for $w = 5$.",
      answerOptions: [
        { text: "1", isCorrect: false, rationale: "This is 4-3." },
        { text: "17", isCorrect: true, rationale: "Substitute 5 for w: 4(5) - 3 = 20 - 3 = 17." },
        { text: "20", isCorrect: false, rationale: "This is 4*5." },
        { text: "8", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Substitute 5 for w in the expression: 4(5) - 3 = 20 - 3 = 17."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Solve for z: $2z + 11 = 3$.",
      answerOptions: [
        { text: "7", isCorrect: false, rationale: "This is (3+11)/2" },
        { text: "-4", isCorrect: true, rationale: "Subtract 11: 2z = -8. Divide by 2: z = -4." },
        { text: "-7", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "4", isCorrect: false, rationale: "This ignores the negative sign." }
      ],
      rationale: "First, subtract 11 from both sides: 2z = 3 - 11, so 2z = -8. Then, divide by 2: z = -8 / 2 = -4."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Simplify the expression: $9x - (2x - 4)$.",
      correctAnswer: "7x + 4",
      rationale: "Distribute the negative sign: 9x - 2x + 4. Then, combine like terms: 7x + 4."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the slope of the line $y = -5x + 10$?",
      answerOptions: [
        { text: "10", isCorrect: false, rationale: "This is the y-intercept." },
        { text: "-5", isCorrect: true, rationale: "In y=mx+b form, m is the slope." },
        { text: "5", isCorrect: false, rationale: "This is the negative of the slope." },
        { text: "2", isCorrect: false, rationale: "This is the x-intercept." }
      ],
      rationale: "The equation is in slope-intercept form (y = mx + b), where \'m\' is the slope. The slope is -5."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "Solve for a: $a/4 + a/2 = 6$.",
      answerOptions: [
        { text: "3", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "6", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "8", isCorrect: true, rationale: "Combine fractions: a/4 + 2a/4 = 3a/4. So, 3a/4 = 6. 3a = 24. a = 8." },
        { text: "12", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "To combine the fractions, find a common denominator (4): a/4 + 2a/4 = 3a/4. Now solve the equation 3a/4 = 6. Multiply both sides by 4: 3a = 24. Divide by 3: a = 8."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "If $f(x) = x^2 + x$, find $f(-5)$.",
      correctAnswer: "20",
      rationale: "Substitute -5 for x: f(-5) = (-5)² + (-5) = 25 - 5 = 20."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "The graph of the line $y=3$ is a:",
      answerOptions: [
        { text: "Horizontal line", isCorrect: true, rationale: "An equation of the form y=c is always a horizontal line." },
        { text: "Vertical line", isCorrect: false, rationale: "A vertical line has the form x=c." },
        { text: "Line with a positive slope", isCorrect: false, rationale: "It has a slope of 0." },
        { text: "Line with a negative slope", isCorrect: false, rationale: "It has a slope of 0." }
      ],
      rationale: "An equation of the form y = c, where c is a constant, represents a horizontal line. The slope of this line is 0."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the y-intercept of a line that has a slope of 2 and passes through the point (3, 10)?",
      correctAnswer: "4",
      rationale: "Using y=mx+b: 10 = 2(3) + b. 10 = 6 + b. b = 4."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Four less than five times a number is 31. What is the number?",
      answerOptions: [
        { text: "7", isCorrect: true, rationale: "Let n be the number. 5n - 4 = 31. 5n = 35. n = 7." },
        { text: "5.4", isCorrect: false, rationale: "This is 27/5." },
        { text: "35", isCorrect: false, rationale: "This is 5n." },
        { text: "40", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Translate the sentence into an equation: 5n - 4 = 31. Add 4 to both sides: 5n = 35. Divide by 5: n = 7."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Find the solutions to $x^2 + 2x - 8 = 0$.",
      answerOptions: [
        { text: "{2, -4}", isCorrect: true, rationale: "Factor to (x+4)(x-2)=0. The solutions are x=-4 and x=2." },
        { text: "{-2, 4}", isCorrect: false, rationale: "This gives a middle term of -2x." },
        { text: "{2, 4}", isCorrect: false, rationale: "This gives a constant term of +8." },
        { text: "{-2, -4}", isCorrect: false, rationale: "This gives a middle term of +6x." }
      ],
      rationale: "To solve the quadratic equation, factor the trinomial. We need two numbers that multiply to -8 and add to 2. These are +4 and -2. So, (x + 4)(x - 2) = 0. The solutions are x = -4 and x = 2."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Simplify the expression $(2x)^3$.",
      answerOptions: [
        { text: "$6x$", isCorrect: false, rationale: "This is 2*3*x." },
        { text: "$2x^3$", isCorrect: false, rationale: "The coefficient 2 should also be cubed." },
        { text: "$8x^3$", isCorrect: true, rationale: "Both the 2 and the x are cubed: 2³ * x³ = 8x³." },
        { text: "$6x^3$", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "When a product is raised to a power, each factor is raised to that power. So, $(2x)^3 = 2^3 \\times x^3 = 8x^3$."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Algebra & Linear Equations",
  id: "math_algebra_10",
  title: "Algebra & Linear Equations: Quiz 10",
  questions: [
    {
      questionNumber: 1,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Solve for y: $y - 15 = 2$.",
      correctAnswer: "17",
      rationale: "Add 15 to both sides of the equation: 2 + 15 = 17."
    },
    {
      questionNumber: 2,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Evaluate $a/4 + 1$ for $a = 16$.",
      answerOptions: [
        { text: "4", isCorrect: false, rationale: "This is 16/4." },
        { text: "5", isCorrect: true, rationale: "Substitute 16 for a: 16/4 + 1 = 4 + 1 = 5." },
        { text: "17", isCorrect: false, rationale: "This is 16+1." },
        { text: "4.25", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Substitute 16 for a in the expression: 16/4 + 1 = 4 + 1 = 5."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Solve for x: $10 - 2x = 4$.",
      answerOptions: [
        { text: "-3", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "3", isCorrect: true, rationale: "Subtract 10: -2x = -6. Divide by -2: x = 3." },
        { text: "5", isCorrect: false, rationale: "This is 10/2." },
        { text: "7", isCorrect: false, rationale: "This is (14)/2." }
      ],
      rationale: "First, subtract 10 from both sides: -2x = 4 - 10, so -2x = -6. Then, divide by -2: x = -6 / -2 = 3."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the slope of a line passing through (-1, 5) and (3, 5)?",
      correctAnswer: "0",
      rationale: "The y-coordinates are the same, so this is a horizontal line. The slope of a horizontal line is 0."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which expression represents \'10 less than the quotient of a number and 2\'?",
      answerOptions: [
        { text: "$10 - n/2$", isCorrect: false, rationale: "This is \'10 minus the quotient\'." },
        { text: "$n/2 - 10$", isCorrect: true, rationale: "The quotient is n/2, and \'10 less than\' means subtract 10." },
        { text: "$(n-10)/2$", isCorrect: false, rationale: "This is \'the quotient of 10 less than a number and 2\'." },
        { text: "$2n - 10$", isCorrect: false, rationale: "This is \'10 less than twice a number\'." }
      ],
      rationale: "Let \'n\' be the number. \'The quotient of a number and 2\' is n/2. \'10 less than\' this expression means you subtract 10 from it, resulting in n/2 - 10."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "Solve for x: $2(3x - 1) = 4(x + 3)$.",
      answerOptions: [
        { text: "5", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "6", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "7", isCorrect: true, rationale: "Distribute: 6x - 2 = 4x + 12. 2x = 14. x = 7." },
        { text: "14", isCorrect: false, rationale: "This is 2x." }
      ],
      rationale: "First, distribute on both sides: 6x - 2 = 4x + 12. Subtract 4x from both sides: 2x - 2 = 12. Add 2 to both sides: 2x = 14. Divide by 2: x = 7."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Factor: $4x^2 - 25$.",
      correctAnswer: "(2x - 5)(2x + 5)",
      rationale: "This is a difference of squares, $a^2 - b^2$, which factors to $(a-b)(a+b)$. Here, a=2x and b=5."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Which of the following values of x is a solution to the inequality $5 - 3x > 11$?",
      answerOptions: [
        { text: "-1", isCorrect: false, rationale: "5-3(-1)=8, which is not > 11." },
        { text: "-2", isCorrect: false, rationale: "5-3(-2)=11, which is not > 11." },
        { text: "-3", isCorrect: true, rationale: "5-3(-3)=14, which is > 11. Solving gives x < -2." },
        { text: "-4", isCorrect: false, rationale: "This is another solution, but -3 is the first listed option that works." }
      ],
      rationale: "First, solve the inequality. Subtract 5: -3x > 6. Divide by -3 and reverse the inequality sign: x < -2. Of the choices given, only -3 is less than -2."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "If $f(x) = (x-4)^2 + 3$, find $f(1)$.",
      correctAnswer: "12",
      rationale: "f(1) = (1-4)² + 3 = (-3)² + 3 = 9 + 3 = 12."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "The length of a rectangle is 3 more than twice its width. If the perimeter is 30, what is the width?",
      answerOptions: [
        { text: "3", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "4", isCorrect: true, rationale: "Let W be width, L=2W+3. P=2(L+W)=2(2W+3+W)=2(3W+3)=6W+6. 30=6W+6 -> 24=6W -> W=4." },
        { text: "5", isCorrect: false, rationale: "This would give a perimeter of 38." },
        { text: "11", isCorrect: false, rationale: "This is the length." }
      ],
      rationale: "Let W be the width and L be the length. L = 2W + 3. The perimeter is P = 2(L + W). 30 = 2((2W + 3) + W). 30 = 2(3W + 3). 30 = 6W + 6. 24 = 6W. W = 4."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "What are the solutions to $x^2 + 5x = 0$?",
      answerOptions: [
        { text: "{0, -5}", isCorrect: true, rationale: "Factor out x: x(x+5)=0. The solutions are x=0 and x=-5." },
        { text: "{0, 5}", isCorrect: false, rationale: "The second solution is -5." },
        { text: "{5, -5}", isCorrect: false, rationale: "0 is a solution." },
        { text: "{0}", isCorrect: false, rationale: "There are two solutions." }
      ],
      rationale: "To solve, factor out the common term x: x(x + 5) = 0. For the product to be zero, one of the factors must be zero. So, either x = 0 or x + 5 = 0, which means x = -5."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which of the following is equivalent to $y \cdot y \cdot y \cdot y$?",
      answerOptions: [
        { text: "$4y$", isCorrect: false, rationale: "This is y+y+y+y." },
        { text: "$y^4$", isCorrect: true, rationale: "Exponents represent repeated multiplication." },
        { text: "$y+4$", isCorrect: false, rationale: "This is addition." },
        { text: "$4^y$", isCorrect: false, rationale: "This reverses the base and exponent." }
      ],
      rationale: "Exponents are used to denote repeated multiplication. Since \'y\' is multiplied by itself 4 times, it can be written as y⁴."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Algebra & Linear Equations",
  id: "math_algebra_11",
  title: "Algebra & Linear Equations: Quiz 11",
  questions: [
    {
      questionNumber: 1,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Solve for x: $3x = 33$.",
      correctAnswer: "11",
      rationale: "Divide both sides by 3: x = 33 / 3 = 11."
    },
    {
      questionNumber: 2,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Evaluate $12 + 5x$ for $x = -2$.",
      answerOptions: [
        { text: "2", isCorrect: true, rationale: "12 + 5(-2) = 12 - 10 = 2." },
        { text: "17", isCorrect: false, rationale: "This is 12+5." },
        { text: "22", isCorrect: false, rationale: "This is 12+10." },
        { text: "10", isCorrect: false, rationale: "This is 5*2." }
      ],
      rationale: "Substitute -2 for x in the expression: 12 + 5(-2) = 12 - 10 = 2."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Solve for y: $5y - 8 = 12$.",
      answerOptions: [
        { text: "0.8", isCorrect: false, rationale: "This is 4/5." },
        { text: "4", isCorrect: true, rationale: "Add 8 to both sides: 5y = 20. Divide by 5: y = 4." },
        { text: "20", isCorrect: false, rationale: "This is 5y." },
        { text: "10", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "First, add 8 to both sides: 5y = 12 + 8, so 5y = 20. Then, divide by 5: y = 20 / 5 = 4."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Simplify the expression: $3(2x + 1) - 4x$.",
      correctAnswer: "2x + 3",
      rationale: "Distribute the 3: 6x + 3 - 4x. Combine like terms: 2x + 3."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the slope of the line passing through (2, 3) and (2, 8)?",
      answerOptions: [
        { text: "0", isCorrect: false, rationale: "A horizontal line has a slope of 0." },
        { text: "5", isCorrect: false, rationale: "This is the change in y." },
        { text: "Undefined", isCorrect: true, rationale: "The x-coordinates are the same, so it\'s a vertical line with an undefined slope." },
        { text: "1", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Since the x-coordinates are the same, this is a vertical line. The slope of a vertical line is undefined."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A number is tripled, and then 7 is subtracted. The result is 20. What is the number?",
      answerOptions: [
        { text: "9", isCorrect: true, rationale: "Let n be the number. 3n - 7 = 20. 3n = 27. n = 9." },
        { text: "13", isCorrect: false, rationale: "This is 20-7." },
        { text: "27", isCorrect: false, rationale: "This is 3n." },
        { text: "4.33", isCorrect: false, rationale: "This is 13/3." }
      ],
      rationale: "Let the number be n. \'A number is tripled\' is 3n. \'7 is subtracted\' is 3n - 7. Set this equal to 20: 3n - 7 = 20. Add 7: 3n = 27. Divide by 3: n = 9."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "If $f(x) = 10 - x^2$, what is $f(4)$?",
      correctAnswer: "-6",
      rationale: "Substitute 4 for x: f(4) = 10 - (4)² = 10 - 16 = -6."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Which expression is the result of factoring $9x^2 - 16$?",
      answerOptions: [
        { text: "$(3x - 4)^2$", isCorrect: false, rationale: "This would give a middle term of -24x." },
        { text: "$(3x - 4)(3x + 4)$", isCorrect: true, rationale: "This is a difference of squares: (3x)$^2$ - 4$^2$." },
        { text: "$(9x - 4)(x + 4)$", isCorrect: false, rationale: "This gives a middle term of +32x." },
        { text: "$(3x + 4)^2$", isCorrect: false, rationale: "This would give a middle term of +24x." }
      ],
      rationale: "This is a difference of squares, $a^2 - b^2$, which factors to $(a-b)(a+b)$. Here, a=3x and b=4."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "Solve the inequality: $2x + 8 > 20$.",
      correctAnswer: "x > 6",
      rationale: "Subtract 8 from both sides: 2x > 12. Divide by 2: x > 6."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the equation of a line with a slope of 1/2 and a y-intercept of 4?",
      answerOptions: [
        { text: "$y = 4x + 1/2$", isCorrect: false, rationale: "This reverses the slope and y-intercept." },
        { text: "$y = 1/2x + 4$", isCorrect: true, rationale: "This fits the y=mx+b form with the given values." },
        { text: "$y = 1/2x - 4$", isCorrect: false, rationale: "This has the wrong y-intercept." },
        { text: "$x = 1/2y + 4$", isCorrect: false, rationale: "This reverses x and y." }
      ],
      rationale: "Using the slope-intercept form y = mx + b, substitute m = 1/2 and b = 4 to get y = (1/2)x + 4."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Solve the system of equations: $y = x + 3$ and $2x + y = 9$.",
      answerOptions: [
        { text: "$x=2, y=5$", isCorrect: true, rationale: "Substitute y=x+3 into the second equation: 2x + (x+3) = 9. 3x+3=9. 3x=6. x=2. Then y=2+3=5." },
        { text: "$x=3, y=6$", isCorrect: false, rationale: "This satisfies the first equation but not the second." },
        { text: "$x=1, y=4$", isCorrect: false, rationale: "This satisfies the first equation but not the second." },
        { text: "$x=4, y=1$", isCorrect: false, rationale: "This satisfies the second equation but not the first." }
      ],
      rationale: "Use substitution. Substitute the first equation into the second: 2x + (x + 3) = 9. Combine like terms: 3x + 3 = 9. Subtract 3: 3x = 6. Divide by 3: x = 2. Now find y using the first equation: y = 2 + 3 = 5. The solution is (2, 5)."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the degree of the polynomial $5x^3 - 2x^2 + 7$?",
      answerOptions: [
        { text: "1", isCorrect: false, rationale: "This is the degree of a linear term." },
        { text: "2", isCorrect: false, rationale: "2 is an exponent, but not the highest." },
        { text: "3", isCorrect: true, rationale: "The degree of a polynomial is the highest exponent of the variable. Here it is 3." },
        { text: "5", isCorrect: false, rationale: "This is a coefficient." }
      ],
      rationale: "The degree of a polynomial is the highest exponent of its variable. In this case, the highest exponent is 3."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Algebra & Linear Equations",
  id: "math_algebra_12",
  title: "Algebra & Linear Equations: Quiz 12",
  questions: [
    {
      questionNumber: 1,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Solve for b: $b - 6 = 14$.",
      correctAnswer: "20",
      rationale: "Add 6 to both sides of the equation: 14 + 6 = 20."
    },
    {
      questionNumber: 2,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Simplify: $8x - x + 3x$.",
      answerOptions: [
        { text: "$10x$", isCorrect: true, rationale: "8 - 1 + 3 = 10. So, 10x." },
        { text: "$11x$", isCorrect: false, rationale: "This is 8+3." },
        { text: "$12x$", isCorrect: false, rationale: "This is 8+x+3x." },
        { text: "$9x$", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Combine the coefficients of the like terms: 8 - 1 + 3 = 10. The simplified expression is 10x."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Solve for n: $4n + 7 = 35$.",
      answerOptions: [
        { text: "7", isCorrect: true, rationale: "Subtract 7: 4n = 28. Divide by 4: n = 7." },
        { text: "10.5", isCorrect: false, rationale: "This is 42/4." },
        { text: "28", isCorrect: false, rationale: "This is 4n." },
        { text: "24", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "First, subtract 7 from both sides: 4n = 35 - 7, so 4n = 28. Then, divide by 4: n = 28 / 4 = 7."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Find the slope of a line with the equation $2x + y = 5$.",
      correctAnswer: "-2",
      rationale: "Rewrite the equation in slope-intercept form (y = mx + b). y = -2x + 5. The slope is -2."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the equation for \'a number squared is 25\'?",
      answerOptions: [
        { text: "$2n = 25$", isCorrect: false, rationale: "This is \'twice a number\'." },
        { text: "$n^2 = 25$", isCorrect: true, rationale: "\'A number squared\' is $n^2$." },
        { text: "$n + 2 = 25$", isCorrect: false, rationale: "This is \'a number plus 2\'." },
        { text: "$\\sqrt{n} = 25$", isCorrect: false, rationale: "This is \'the square root of a number\'." }
      ],
      rationale: "Let \'n\' be the number. \'A number squared\' is written as $n^2$. The equation is $n^2$ = 25."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "Solve for x: $5x - 3 = 2x + 9$.",
      answerOptions: [
        { text: "2", isCorrect: false, rationale: "This is 6/3." },
        { text: "3", isCorrect: false, rationale: "This is 12/4." },
        { text: "4", isCorrect: true, rationale: "Subtract 2x: 3x - 3 = 9. Add 3: 3x = 12. Divide by 3: x = 4." },
        { text: "12", isCorrect: false, rationale: "This is 3x." }
      ],
      rationale: "First, get the x terms on one side by subtracting 2x from both sides: 3x - 3 = 9. Then, isolate the x term by adding 3 to both sides: 3x = 12. Finally, divide by 3: x = 4."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "If $f(x) = 2x - 10$, what is $f(x)$ when $x=5$?",
      correctAnswer: "0",
      rationale: "Substitute 5 for x: f(5) = 2(5) - 10 = 10 - 10 = 0. This is the x-intercept."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Which of the following is a solution to the inequality $3x - 5 \\geq 10$?",
      answerOptions: [
        { text: "4", isCorrect: false, rationale: "3(4)-5 = 7, which is not >= 10." },
        { text: "5", isCorrect: true, rationale: "3(5)-5 = 10, which is >= 10. The solution is x >= 5." },
        { text: "0", isCorrect: false, rationale: "3(0)-5 = -5, which is not >= 10." },
        { text: "-5", isCorrect: false, rationale: "3(-5)-5 = -20, which is not >= 10." }
      ],
      rationale: "First, solve the inequality. Add 5 to both sides: 3x \geq 15. Divide by 3: x \geq 5. Of the choices given, only 5 is greater than or equal to 5."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A line passes through (1, 2) and (5, 10). What is its slope?",
      correctAnswer: "2",
      rationale: "Slope = (10-2)/(5-1) = 8/4 = 2."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A garden is rectangular. Its length is 5 feet longer than its width. If the perimeter is 50 feet, what is the width?",
      answerOptions: [
        { text: "10 feet", isCorrect: true, rationale: "Let W be width, L=W+5. P=2(W+5+W)=2(2W+5)=4W+10. 50=4W+10 -> 40=4W -> W=10." },
        { text: "15 feet", isCorrect: false, rationale: "This is the length." },
        { text: "20 feet", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "25 feet", isCorrect: false, rationale: "This is half the perimeter." }
      ],
      rationale: "Let W be the width and L be the length. L = W + 5. The perimeter is P = 2(L + W). 50 = 2((W + 5) + W). 50 = 2(2W + 5). 50 = 4W + 10. 40 = 4W. W = 10 feet."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Find the solutions to $x^2 = 81$.",
      answerOptions: [
        { text: "{9}", isCorrect: false, rationale: "This is only the positive solution." },
        { text: "{-9}", isCorrect: false, rationale: "This is only the negative solution." },
        { text: "{9, -9}", isCorrect: true, rationale: "Taking the square root of both sides gives x = ±9." },
        { text: "{81, -81}", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "To solve for x, take the square root of both sides. Remember to include both the positive and negative roots. $x = \\pm\\sqrt{81}$, so x = 9 and x = -9."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which term describes the \'3\' in the expression $3x^2$?",
      answerOptions: [
        { text: "Variable", isCorrect: false, rationale: "x is the variable." },
        { text: "Exponent", isCorrect: false, rationale: "2 is the exponent." },
        { text: "Coefficient", isCorrect: true, rationale: "The coefficient is the numerical factor of a term." },
        { text: "Constant", isCorrect: false, rationale: "A constant is a term without a variable." }
      ],
      rationale: "A coefficient is a numerical or constant quantity placed before and multiplying the variable in an algebraic expression."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Data, Statistics & Probability",
  id: "math_data_01",
  title: "Data, Statistics & Probability: Quiz 1",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: true,
      difficulty: "easy",
      question: "What is the mean (average) of the following set of numbers: 2, 5, 8, 9, 11?",
      answerOptions: [
        { text: "8", isCorrect: false, rationale: "This is the median of the set." },
        { text: "7.5", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "7", isCorrect: true, rationale: "The sum is 35. 35 divided by 5 (the number of values) is 7." },
        { text: "9", isCorrect: false, rationale: "This is the mode of a different set." }
      ],
      rationale: "To find the mean, add all the numbers together (2+5+8+9+11 = 35) and divide by the count of the numbers (5). 35 / 5 = 7."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is the median of the data set: 3, 7, 1, 9, 4?",
      correctAnswer: "4",
      rationale: "First, order the data set from least to greatest: 1, 3, 4, 7, 9. The median is the middle number, which is 4."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the mode of the following data set: 6, 8, 9, 8, 6, 8, 7?",
      answerOptions: [
        { text: "6", isCorrect: false, rationale: "6 appears twice, but 8 appears more often." },
        { text: "7", isCorrect: false, rationale: "7 only appears once." },
        { text: "8", isCorrect: true, rationale: "The number 8 appears most frequently in the set (3 times)." },
        { text: "9", isCorrect: false, rationale: "9 only appears once." }
      ],
      rationale: "The mode is the number that appears most often in a data set. In this set, 8 appears three times, more than any other number."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the range of the data set: 15, 2, 12, 25, 8?",
      correctAnswer: "23",
      rationale: "The range is the difference between the highest and lowest values. The highest is 25 and the lowest is 2. Range = 25 - 2 = 23."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "If you roll a standard six-sided die, what is the probability of rolling an even number?",
      answerOptions: [
        { text: "1/6", isCorrect: false, rationale: "This is the probability of rolling one specific number." },
        { text: "1/3", isCorrect: false, rationale: "This is the probability of rolling a 2 or a 4, but not 6." },
        { text: "1/2", isCorrect: true, rationale: "There are three even numbers (2, 4, 6) out of six possible outcomes. So the probability is 3/6, which simplifies to 1/2." },
        { text: "2/3", isCorrect: false, rationale: "This is the probability of rolling a number greater than 2." }
      ],
      rationale: "A standard six-sided die has three even numbers (2, 4, 6) and a total of six possible outcomes. The probability is the number of favorable outcomes divided by the total number of outcomes: 3/6 = 1/2."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A bag contains 4 red marbles, 5 blue marbles, and 6 green marbles. What is the probability of drawing a blue marble at random?",
      answerOptions: [
        { text: "1/3", isCorrect: true, rationale: "There are 5 blue marbles and a total of 15 marbles (4+5+6). The probability is 5/15, which simplifies to 1/3." },
        { text: "1/5", isCorrect: false, rationale: "This incorrectly uses the number of blue marbles as the denominator." },
        { text: "4/15", isCorrect: false, rationale: "This is the probability of drawing a red marble." },
        { text: "2/5", isCorrect: false, rationale: "This is the probability of drawing a green marble." }
      ],
      rationale: "There are a total of 4 + 5 + 6 = 15 marbles. The number of blue marbles is 5. The probability is 5/15, which simplifies to 1/3."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "The scores on a test were 75, 80, 80, 85, 90, 95. What is the median score?",
      correctAnswer: "82.5",
      rationale: "For an even number of data points, the median is the average of the two middle numbers. First, order the data: 75, 80, 80, 85, 90, 95. The two middle numbers are 80 and 85. Their average is (80 + 85) / 2 = 82.5."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A spinner is divided into 8 equal sections, numbered 1 through 8. What is the probability of spinning a number greater than 5?",
      answerOptions: [
        { text: "1/8", isCorrect: false, rationale: "This is the probability of spinning one specific number." },
        { text: "1/4", isCorrect: false, rationale: "This is the probability of spinning a 7 or 8." },
        { text: "3/8", isCorrect: true, rationale: "The numbers greater than 5 are 6, 7, and 8. There are 3 favorable outcomes out of 8 total." },
        { text: "1/2", isCorrect: false, rationale: "This is the probability of spinning an even number." }
      ],
      rationale: "The numbers greater than 5 are 6, 7, and 8. This is 3 favorable outcomes out of 8 possible outcomes. So the probability is 3/8."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A student\'s grades are 88, 92, 85, and 95. What grade must the student get on the fifth test to have an average of 90?",
      correctAnswer: "90",
      rationale: "To have an average of 90 over 5 tests, the total score must be 90 * 5 = 450. The sum of the first four grades is 88 + 92 + 85 + 95 = 360. So, the fifth grade must be 450 - 360 = 90."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which of the following is NOT a measure of central tendency?",
      answerOptions: [
        { text: "Mean", isCorrect: false, rationale: "The mean is a measure of central tendency." },
        { text: "Median", isCorrect: false, rationale: "The median is a measure of central tendency." },
        { text: "Mode", isCorrect: false, rationale: "The mode is a measure of central tendency." },
        { text: "Range", isCorrect: true, rationale: "The range is a measure of spread or dispersion, not central tendency." }
      ],
      rationale: "Measures of central tendency describe the center of a data set. The range describes how spread out the data is."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "If the probability of rain is 40%, what is the probability that it will NOT rain?",
      answerOptions: [
        { text: "40%", isCorrect: false, rationale: "This is the probability that it will rain." },
        { text: "60%", isCorrect: true, rationale: "The total probability is 100%. If there\'s a 40% chance of rain, there\'s a 100% - 40% = 60% chance of no rain." },
        { text: "100%", isCorrect: false, rationale: "This represents certainty." },
        { text: "Cannot be determined", isCorrect: false, rationale: "The probability can be determined." }
      ],
      rationale: "The sum of the probabilities of an event happening and not happening is 1 (or 100%). So, the probability of it not raining is 100% - 40% = 60%."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A coin is flipped twice. What is the probability of getting heads on both flips?",
      answerOptions: [
        { text: "1/4", isCorrect: true, rationale: "The probability of heads on the first flip is 1/2. The probability of heads on the second is 1/2. The combined probability is (1/2) * (1/2) = 1/4." },
        { text: "1/2", isCorrect: false, rationale: "This is the probability of getting heads on a single flip." },
        { text: "1", isCorrect: false, rationale: "This would mean it\'s a certain outcome." },
        { text: "0", isCorrect: false, rationale: "This would mean it\'s an impossible outcome." }
      ],
      rationale: "The probability of getting heads on one flip is 1/2. For two independent events, you multiply their probabilities. So, P(Heads and Heads) = (1/2) * (1/2) = 1/4."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Data, Statistics & Probability",
  id: "math_data_02",
  title: "Data, Statistics & Probability: Quiz 2",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: true,
      difficulty: "easy",
      question: "Find the mean of the numbers: 10, 15, 20, 25, 30.",
      answerOptions: [
        { text: "15", isCorrect: false, rationale: "This is the second number in the set." },
        { text: "20", isCorrect: true, rationale: "The sum is 100. 100 / 5 = 20. Since the numbers are evenly spaced, the mean is the middle number." },
        { text: "25", isCorrect: false, rationale: "This is the fourth number." },
        { text: "30", isCorrect: false, rationale: "This is the highest number." }
      ],
      rationale: "To find the mean, sum the numbers (10+15+20+25+30 = 100) and divide by the count of the numbers (5). 100 / 5 = 20."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A bag has 3 red marbles and 2 blue marbles. What is the probability of picking a red marble?",
      correctAnswer: "3/5",
      rationale: "There are 3 red marbles and a total of 5 marbles. The probability is the number of red marbles divided by the total number of marbles, which is 3/5."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the median of the following test scores: 88, 92, 75, 88, 95?",
      answerOptions: [
        { text: "75", isCorrect: false, rationale: "This is the lowest score." },
        { text: "88", isCorrect: true, rationale: "First, order the scores: 75, 88, 88, 92, 95. The median is the middle value, which is 88." },
        { text: "87.6", isCorrect: false, rationale: "This is the mean of the scores." },
        { text: "95", isCorrect: false, rationale: "This is the highest score." }
      ],
      rationale: "First, arrange the scores in ascending order: 75, 88, 88, 92, 95. The median is the middle number in the ordered set, which is 88."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A set of data has a maximum value of 50 and a minimum value of 12. What is the range?",
      correctAnswer: "38",
      rationale: "The range is the difference between the maximum and minimum values in a data set. Range = 50 - 12 = 38."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A survey asks for a person\'s favorite color. Which measure of central tendency is most appropriate to use for this data?",
      answerOptions: [
        { text: "Mean", isCorrect: false, rationale: "The mean can only be calculated for numerical data." },
        { text: "Median", isCorrect: false, rationale: "The median requires the data to be ordered, which is not possible with categorical data like color." },
        { text: "Mode", isCorrect: true, rationale: "The mode, which is the most frequent response, is suitable for categorical data." },
        { text: "Range", isCorrect: false, rationale: "The range is a measure of spread, not central tendency, and requires numerical data." }
      ],
      rationale: "Since the data (favorite color) is categorical (non-numerical), the only appropriate measure of central tendency is the mode, which identifies the most frequently chosen color."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A restaurant offers a lunch special with a choice of 3 sandwiches, 2 side dishes, and 4 drinks. How many different lunch combinations are possible?",
      answerOptions: [
        { text: "9", isCorrect: false, rationale: "This is the sum of the choices, not the product." },
        { text: "12", isCorrect: false, rationale: "This is 3*4, ignoring the side dishes." },
        { text: "24", isCorrect: true, rationale: "To find the total number of combinations, multiply the number of choices for each category: 3 * 2 * 4 = 24." },
        { text: "30", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "This is a counting principle problem. The total number of combinations is the product of the number of choices for each option: 3 sandwiches * 2 sides * 4 drinks = 24 combinations."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "The average of four numbers is 15. If three of the numbers are 10, 12, and 18, what is the fourth number?",
      correctAnswer: "20",
      rationale: "If the average of four numbers is 15, their sum must be 15 * 4 = 60. The sum of the three given numbers is 10 + 12 + 18 = 40. So, the fourth number is 60 - 40 = 20."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the probability of drawing a king from a standard deck of 52 playing cards?",
      answerOptions: [
        { text: "1/52", isCorrect: false, rationale: "This is the probability of drawing a specific king (e.g., the King of Hearts)." },
        { text: "1/13", isCorrect: true, rationale: "There are 4 kings in a deck of 52 cards. The probability is 4/52, which simplifies to 1/13." },
        { text: "1/4", isCorrect: false, rationale: "This is the probability of drawing a card of a specific suit." },
        { text: "1/26", isCorrect: false, rationale: "This is the probability of drawing a specific red card." }
      ],
      rationale: "A standard deck of cards has 4 kings and 52 total cards. The probability is the number of favorable outcomes (4) divided by the total number of outcomes (52). 4/52 simplifies to 1/13."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A class of 25 students has an average test score of 80. A new student joins the class and scores 93. What is the new class average?",
      correctAnswer: "80.5",
      rationale: "The original total score is 25 * 80 = 2000. The new total score is 2000 + 93 = 2093. The new number of students is 26. The new average is 2093 / 26 = 80.5."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "A weather forecast states there is a 70% chance of sunshine. What is the probability that it will be cloudy?",
      answerOptions: [
        { text: "30%", isCorrect: true, rationale: "The total probability is 100%. If there\'s a 70% chance of sunshine, the chance of it not being sunny (cloudy) is 100% - 70% = 30%." },
        { text: "50%", isCorrect: false, rationale: "This would imply an equal chance." },
        { text: "70%", isCorrect: false, rationale: "This is the probability of sunshine." },
        { text: "100%", isCorrect: false, rationale: "This represents certainty." }
      ],
      rationale: "If the chance of sunshine is 70%, the chance of the opposite outcome (cloudy) is 100% - 70% = 30%."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A password must be 3 characters long, using the digits 0-9. How many different passwords can be created if digits can be repeated?",
      answerOptions: [
        { text: "30", isCorrect: false, rationale: "This is 10*3." },
        { text: "100", isCorrect: false, rationale: "This is $10^2$." },
        { text: "729", isCorrect: false, rationale: "This is $9^3$." },
        { text: "1000", isCorrect: true, rationale: "There are 10 choices for the first character, 10 for the second, and 10 for the third. So, 10 * 10 * 10 = 1000." }
      ],
      rationale: "For each of the three characters, there are 10 possible digits (0-9). Since repetition is allowed, the total number of combinations is 10 * 10 * 10 = 1000."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A spinner is equally likely to land on red, blue, green, or yellow. What is the probability it does NOT land on green?",
      answerOptions: [
        { text: "1/4", isCorrect: false, rationale: "This is the probability it will land on green." },
        { text: "1/2", isCorrect: false, rationale: "This would be the case if there were only two colors." },
        { text: "3/4", isCorrect: true, rationale: "There are 3 outcomes that are not green (red, blue, yellow) out of 4 total outcomes." },
        { text: "1", isCorrect: false, rationale: "This would mean it\'s certain not to land on green." }
      ],
      rationale: "There are 4 possible outcomes. The probability of landing on green is 1/4. The probability of not landing on green is 1 - 1/4 = 3/4."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Data, Statistics & Probability",
  id: "math_data_03",
  title: "Data, Statistics & Probability: Quiz 3",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: true,
      difficulty: "easy",
      question: "Find the median of the following list of numbers: 10, 8, 14, 8, 12.",
      answerOptions: [
        { text: "8", isCorrect: false, rationale: "This is the mode." },
        { text: "10", isCorrect: true, rationale: "First, order the numbers: 8, 8, 10, 12, 14. The median is the middle number, 10." },
        { text: "10.4", isCorrect: false, rationale: "This is the mean." },
        { text: "12", isCorrect: false, rationale: "This is the third number in the original list." }
      ],
      rationale: "To find the median, first put the numbers in order: 8, 8, 10, 12, 14. The median is the middle value, which is 10."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A standard die is rolled once. What is the probability of rolling a 5?",
      correctAnswer: "1/6",
      rationale: "There is one \'5\' on a standard six-sided die, so there is 1 favorable outcome out of 6 total possible outcomes."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the mean (average) of these test scores: 70, 80, 80, 90, 100?",
      answerOptions: [
        { text: "80", isCorrect: false, rationale: "This is the median and the mode." },
        { text: "84", isCorrect: true, rationale: "The sum of the scores is 70+80+80+90+100 = 420. Divide by 5 scores: 420/5 = 84." },
        { text: "85", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "90", isCorrect: false, rationale: "This is one of the scores." }
      ],
      rationale: "To find the mean, add the scores (70 + 80 + 80 + 90 + 100 = 420) and divide by the number of scores (5). The mean is 420 / 5 = 84."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A basketball player scores 15, 20, 22, and 18 points in four games. How many points must they score in the fifth game to have an average of 20 points per game?",
      correctAnswer: "25",
      rationale: "To average 20 points over 5 games, the total score must be 5 * 20 = 100. The sum of the first four games is 15+20+22+18 = 75. So, the player needs 100 - 75 = 25 points."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Find the range of the temperatures: 5°C, -2°C, 8°C, 0°C, -5°C.",
      answerOptions: [
        { text: "3°C", isCorrect: false, rationale: "This is the difference between 8 and 5." },
        { text: "8°C", isCorrect: false, rationale: "This is the maximum temperature." },
        { text: "13°C", isCorrect: true, rationale: "The range is the difference between the highest (8°C) and the lowest (-5°C). 8 - (-5) = 13." },
        { text: "-5°C", isCorrect: false, rationale: "This is the minimum temperature." }
      ],
      rationale: "The range is the difference between the maximum and minimum values. The maximum is 8°C and the minimum is -5°C. The range is 8 - (-5) = 13°C."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A classroom has 12 girls and 18 boys. If a student is chosen at random, what is the probability that the student is a girl?",
      answerOptions: [
        { text: "2/5", isCorrect: true, rationale: "There are 12 girls and a total of 30 students. The probability is 12/30, which simplifies to 2/5." },
        { text: "3/5", isCorrect: false, rationale: "This is the probability of choosing a boy." },
        { text: "2/3", isCorrect: false, rationale: "This is the ratio of girls to boys." },
        { text: "1/2", isCorrect: false, rationale: "This would be true if there were equal numbers of boys and girls." }
      ],
      rationale: "There are a total of 12 + 18 = 30 students. The number of girls is 12. The probability of choosing a girl is 12/30, which simplifies to 2/5."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Find the mode of the following set of data: red, blue, green, blue, red, blue.",
      correctAnswer: "blue",
      rationale: "The mode is the value that appears most frequently. In this set, \'blue\' appears 3 times, more than any other color."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A coin is tossed, and a die is rolled. What is the probability of getting a tail and a 4?",
      answerOptions: [
        { text: "1/12", isCorrect: true, rationale: "The probability of a tail is 1/2. The probability of a 4 is 1/6. The combined probability is (1/2) * (1/6) = 1/12." },
        { text: "1/8", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "2/3", isCorrect: false, rationale: "This is 1/2 + 1/6." },
        { text: "1/6", isCorrect: false, rationale: "This is only the probability of rolling a 4." }
      ],
      rationale: "These are independent events, so their probabilities are multiplied. The probability of a tail is 1/2, and the probability of rolling a 4 is 1/6. So, P(tail and 4) = 1/2 * 1/6 = 1/12."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A survey of 50 people shows that 35 like pop music, 25 like rock music, and 15 like both. How many people like neither?",
      correctAnswer: "5",
      rationale: "The number of people who like at least one is 35 (pop) + 25 (rock) - 15 (both) = 45. So, the number of people who like neither is 50 - 45 = 5."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "The \'median\' of a dataset is the:",
      answerOptions: [
        { text: "Average value", isCorrect: false, rationale: "This is the mean." },
        { text: "Most frequent value", isCorrect: false, rationale: "This is the mode." },
        { text: "Middle value", isCorrect: true, rationale: "The median is the middle value when the data is ordered." },
        { text: "Difference between the highest and lowest values", isCorrect: false, rationale: "This is the range." }
      ],
      rationale: "The median is the value that separates the higher half from the lower half of a data sample. When the data is ordered, it is the middle number."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "From a group of 5 people, a committee of 2 is to be chosen. How many different committees can be formed?",
      answerOptions: [
        { text: "10", isCorrect: true, rationale: "This is a combination problem. The formula is n! / (k!(n-k)!). 5! / (2!(3!)) = 120 / (2*6) = 10." },
        { text: "20", isCorrect: false, rationale: "This is a permutation (5P2)." },
        { text: "25", isCorrect: false, rationale: "This is $5^2$." },
        { text: "7", isCorrect: false, rationale: "This is 5+2." }
      ],
      rationale: "This is a combination problem because the order of selection does not matter. The formula is C(n, k) = n! / (k!(n-k)!). C(5, 2) = 5! / (2!3!) = (5*4)/(2*1) = 10."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A spinner has 5 equal sections: red, blue, green, yellow, purple. What is the probability of landing on a primary color (red, yellow, or blue)?",
      answerOptions: [
        { text: "1/5", isCorrect: false, rationale: "This is the probability of landing on one specific color." },
        { text: "2/5", isCorrect: false, rationale: "This is the probability of landing on a secondary color." },
        { text: "3/5", isCorrect: true, rationale: "There are 3 primary colors out of 5 total colors." },
        { text: "4/5", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "There are 3 favorable outcomes (red, yellow, blue) out of 5 possible outcomes. The probability is 3/5."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Data, Statistics & Probability",
  id: "math_data_04",
  title: "Data, Statistics & Probability: Quiz 4",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: true,
      difficulty: "easy",
      question: "What is the mode of the data set: 5, 6, 7, 7, 8, 9, 7?",
      answerOptions: [
        { text: "5", isCorrect: false, rationale: "5 appears only once." },
        { text: "6", isCorrect: false, rationale: "6 appears only once." },
        { text: "7", isCorrect: true, rationale: "7 is the number that appears most frequently." },
        { text: "8", isCorrect: false, rationale: "8 appears only once." }
      ],
      rationale: "The mode is the value that appears most often in a data set. The number 7 appears three times, which is more than any other number."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is the range of the following temperatures: 22, 15, 28, 12, 30?",
      correctAnswer: "18",
      rationale: "The range is the difference between the highest and lowest values. Max = 30, Min = 12. Range = 30 - 12 = 18."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the mean of the data set: 100, 110, 120, 130, 140.",
      answerOptions: [
        { text: "110", isCorrect: false, rationale: "This is the second number." },
        { text: "120", isCorrect: true, rationale: "The sum is 600. 600/5 = 120. As the numbers are evenly spaced, the mean is the middle number." },
        { text: "130", isCorrect: false, rationale: "This is the fourth number." },
        { text: "140", isCorrect: false, rationale: "This is the highest number." }
      ],
      rationale: "To find the mean, sum the numbers (100+110+120+130+140 = 600) and divide by the number of values (5). 600 / 5 = 120."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "A drawer contains 6 black socks, 4 white socks, and 2 brown socks. What is the probability of randomly selecting a white sock?",
      correctAnswer: "1/3",
      rationale: "There are 4 white socks and a total of 12 socks (6+4+2). The probability is 4/12, which simplifies to 1/3."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Find the median of the data set: 25, 15, 20, 10, 30, 15.",
      answerOptions: [
        { text: "15", isCorrect: false, rationale: "This is the mode." },
        { text: "17.5", isCorrect: true, rationale: "Order the data: 10, 15, 15, 20, 25, 30. The median is the average of the two middle numbers: (15+20)/2 = 17.5." },
        { text: "20", isCorrect: false, rationale: "This is one of the middle numbers, but not the average." },
        { text: "19.17", isCorrect: false, rationale: "This is the mean." }
      ],
      rationale: "First, order the numbers: 10, 15, 15, 20, 25, 30. Since there is an even number of values, the median is the average of the two middle numbers (15 and 20). (15 + 20) / 2 = 17.5."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "An ice cream shop offers 5 flavors of ice cream and 3 different toppings. How many different single-scoop, single-topping combinations can be made?",
      answerOptions: [
        { text: "8", isCorrect: false, rationale: "This is the sum of the choices." },
        { text: "15", isCorrect: true, rationale: "Multiply the number of flavor choices by the number of topping choices: 5 * 3 = 15." },
        { text: "2", isCorrect: false, rationale: "This is the difference." },
        { text: "25", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "This is a fundamental counting principle problem. To find the total number of combinations, multiply the number of options for each choice: 5 flavors * 3 toppings = 15 combinations."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "The average score of 5 students on a test is 82. If a sixth student scores a 94, what is the new average?",
      correctAnswer: "84",
      rationale: "The total score of the first 5 students is 5 * 82 = 410. The new total score is 410 + 94 = 504. The new average for 6 students is 504 / 6 = 84."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A spinner is divided into 4 equal sections: Red, Green, Blue, Yellow. What is the probability of the spinner NOT landing on Red?",
      answerOptions: [
        { text: "1/4", isCorrect: false, rationale: "This is the probability of landing on Red." },
        { text: "1/2", isCorrect: false, rationale: "This would be the case for a 2-section spinner." },
        { text: "3/4", isCorrect: true, rationale: "There are 3 outcomes that are not Red (Green, Blue, Yellow) out of 4 total outcomes." },
        { text: "1", isCorrect: false, rationale: "This would mean it\'s certain not to land on Red." }
      ],
      rationale: "There are 4 possible outcomes. The probability of landing on Red is 1/4. The probability of NOT landing on Red is 1 - P(Red) = 1 - 1/4 = 3/4."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the mode of the following numbers? 1, 2, 2, 3, 3, 3, 4, 4, 5",
      correctAnswer: "3",
      rationale: "The mode is the number that appears most frequently. The number 3 appears three times, which is more than any other number."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "In a survey of 300 people, 120 said they prefer cats. What percentage of people prefer cats?",
      answerOptions: [
        { text: "30%", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "40%", isCorrect: true, rationale: "(120 / 300) * 100 = 0.4 * 100 = 40%." },
        { text: "50%", isCorrect: false, rationale: "This would be 150 people." },
        { text: "60%", isCorrect: false, rationale: "This is the percentage of people who do not prefer cats." }
      ],
      rationale: "To find the percentage, divide the number of people who prefer cats by the total number of people surveyed and multiply by 100: (120 / 300) * 100 = 0.4 * 100 = 40%."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "You have a bag with 5 red balls and 5 blue balls. What is the probability of drawing two red balls in a row without replacement?",
      answerOptions: [
        { text: "1/4", isCorrect: false, rationale: "This is 25/100." },
        { text: "2/9", isCorrect: true, rationale: "P(1st is red) = 5/10. P(2nd is red) = 4/9. P(both red) = (5/10) * (4/9) = 20/90 = 2/9." },
        { text: "1/2", isCorrect: false, rationale: "This is the probability of drawing one red ball." },
        { text: "5/9", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "The probability of the first ball being red is 5/10. After drawing one red ball, there are 4 red balls left and a total of 9 balls. So, the probability of the second ball being red is 4/9. The total probability is (5/10) * (4/9) = 20/90 = 2/9."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A dataset has a mean of 50. If you add 5 to every number in the dataset, what is the new mean?",
      answerOptions: [
        { text: "50", isCorrect: false, rationale: "The mean will change." },
        { text: "55", isCorrect: true, rationale: "If a constant is added to every value in a set, the mean increases by that constant." },
        { text: "250", isCorrect: false, rationale: "This is 50*5." },
        { text: "Cannot be determined", isCorrect: false, rationale: "This can be determined." }
      ],
      rationale: "When a constant value is added to every number in a dataset, the mean of the new dataset will be the original mean plus that constant. So, the new mean is 50 + 5 = 55."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Data, Statistics & Probability",
  id: "math_data_05",
  title: "Data, Statistics & Probability: Quiz 5",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: true,
      difficulty: "easy",
      question: "Find the range of the data set: 4, 12, 8, 20, 15, 8.",
      answerOptions: [
        { text: "8", isCorrect: false, rationale: "This is the mode and median." },
        { text: "11.17", isCorrect: false, rationale: "This is the mean." },
        { text: "16", isCorrect: true, rationale: "The range is the difference between the maximum (20) and minimum (4) values." },
        { text: "20", isCorrect: false, rationale: "This is the maximum value." }
      ],
      rationale: "The range is the difference between the highest and lowest values in the dataset. The highest value is 20 and the lowest is 4. Range = 20 - 4 = 16."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A coin is flipped. What is the probability of it landing on heads?",
      correctAnswer: "1/2",
      rationale: "A fair coin has two sides, heads and tails. There is 1 favorable outcome (heads) out of 2 possible outcomes."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the median of the scores: 85, 90, 70, 80, 95, 85?",
      answerOptions: [
        { text: "85", isCorrect: true, rationale: "Order the scores: 70, 80, 85, 85, 90, 95. The median is the average of the two middle scores (85 and 85), which is 85." },
        { text: "84.17", isCorrect: false, rationale: "This is the mean." },
        { text: "82.5", isCorrect: false, rationale: "This is the average of 80 and 85." },
        { text: "70", isCorrect: false, rationale: "This is the minimum score." }
      ],
      rationale: "First, order the scores from least to greatest: 70, 80, 85, 85, 90, 95. Since there is an even number of scores, the median is the average of the two middle numbers, 85 and 85. (85+85)/2 = 85."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "Find the mean of the numbers: 2.5, 3.5, 4.0, 5.0.",
      correctAnswer: "3.75",
      rationale: "The sum of the numbers is 2.5 + 3.5 + 4.0 + 5.0 = 15.0. Divide by the count of the numbers (4): 15.0 / 4 = 3.75."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A deck of 52 cards is shuffled. What is the probability of drawing a heart?",
      answerOptions: [
        { text: "1/52", isCorrect: false, rationale: "This is the probability of drawing a specific card." },
        { text: "1/13", isCorrect: false, rationale: "This is the probability of drawing a card of a specific rank." },
        { text: "1/4", isCorrect: true, rationale: "There are 13 hearts in a deck of 52 cards. The probability is 13/52, which simplifies to 1/4." },
        { text: "1/2", isCorrect: false, rationale: "This is the probability of drawing a red card." }
      ],
      rationale: "A standard deck of 52 cards has 4 suits, one of which is hearts. There are 13 heart cards. So the probability is 13/52, which simplifies to 1/4."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A company finds that 1 out of every 500 products is defective. If they produce 2,000 products, how many are likely to be defective?",
      answerOptions: [
        { text: "2", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "4", isCorrect: true, rationale: "The rate of defects is 1/500. For 2,000 products, the number of defects is (1/500) * 2000 = 4." },
        { text: "5", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "40", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Set up a proportion: $\\frac{1 \\text{ defective}}{500 \\text{ total}} = \\frac{x \\text{ defective}}{2000 \\text{ total}}$. Solve for x: $500x = 2000$, so $x = 4$."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the mode of the data set: Apple, Banana, Orange, Apple, Grape, Apple?",
      correctAnswer: "Apple",
      rationale: "The mode is the value that appears most frequently. \'Apple\' appears 3 times, which is more than any other fruit."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A number cube (die) is rolled twice. What is the probability of rolling a 6 on the first roll and an odd number on the second roll?",
      answerOptions: [
        { text: "1/12", isCorrect: true, rationale: "P(rolling a 6) = 1/6. P(rolling an odd) = 3/6 = 1/2. P(both) = (1/6) * (1/2) = 1/12." },
        { text: "1/6", isCorrect: false, rationale: "This is just the probability of rolling a 6." },
        { text: "1/4", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "2/3", isCorrect: false, rationale: "This is 1/6 + 1/2." }
      ],
      rationale: "These are independent events. The probability of rolling a 6 is 1/6. The probability of rolling an odd number (1, 3, or 5) is 3/6 = 1/2. The probability of both events occurring is (1/6) * (1/2) = 1/12."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "The average of 5 numbers is 30. The average of 3 of those numbers is 20. What is the average of the other two numbers?",
      correctAnswer: "45",
      rationale: "The sum of the 5 numbers is 5 * 30 = 150. The sum of the 3 numbers is 3 * 20 = 60. The sum of the other two numbers is 150 - 60 = 90. Their average is 90 / 2 = 45."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which of the following describes the \'range\' of a dataset?",
      answerOptions: [
        { text: "The average value", isCorrect: false, rationale: "This is the mean." },
        { text: "The middle value", isCorrect: false, rationale: "This is the median." },
        { text: "The most frequent value", isCorrect: false, rationale: "This is the mode." },
        { text: "The difference between the highest and lowest values", isCorrect: true, rationale: "The range is a measure of the spread of the data." }
      ],
      rationale: "The range is a measure of statistical dispersion, which is the difference between the maximum and minimum values in a set of data."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "There are 10 contestants in a race. In how many different ways can the first, second, and third places be awarded?",
      answerOptions: [
        { text: "30", isCorrect: false, rationale: "This is 10*3." },
        { text: "120", isCorrect: false, rationale: "This is a combination C(10,3)." },
        { text: "720", isCorrect: true, rationale: "This is a permutation problem. 10 choices for 1st, 9 for 2nd, 8 for 3rd. 10 * 9 * 8 = 720." },
        { text: "1000", isCorrect: false, rationale: "This is 10³." }
      ],
      rationale: "This is a permutation problem because the order matters. For first place, there are 10 choices. For second, 9 remain. For third, 8 remain. Total ways = 10 * 9 * 8 = 720."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "If an event is certain to happen, what is its probability?",
      answerOptions: [
        { text: "0", isCorrect: false, rationale: "0 means the event is impossible." },
        { text: "0.5", isCorrect: false, rationale: "0.5 means there is an equal chance of the event happening or not happening." },
        { text: "1", isCorrect: true, rationale: "A probability of 1 (or 100%) means the event is certain to occur." },
        { text: "100", isCorrect: false, rationale: "Probability is expressed as a number between 0 and 1, or as a percentage up to 100%." }
      ],
      rationale: "In probability theory, an event that is certain to happen has a probability of 1. An impossible event has a probability of 0."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Data, Statistics & Probability",
  id: "math_data_06",
  title: "Data, Statistics & Probability: Quiz 6",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: true,
      difficulty: "easy",
      question: "Find the median of the data set: 20, 25, 15, 30, 20.",
      answerOptions: [
        { text: "15", isCorrect: false, rationale: "This is the minimum value." },
        { text: "20", isCorrect: true, rationale: "First, order the data: 15, 20, 20, 25, 30. The median is the middle value, 20." },
        { text: "22", isCorrect: false, rationale: "This is the mean." },
        { text: "30", isCorrect: false, rationale: "This is the maximum value." }
      ],
      rationale: "To find the median, first order the numbers from least to greatest: 15, 20, 20, 25, 30. The median is the middle number, which is 20."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is the mode of the data set: apple, pear, banana, apple, orange, pear, apple?",
      correctAnswer: "apple",
      rationale: "The mode is the item that appears most frequently. \'Apple\' appears 3 times, more than any other fruit."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A test has 20 questions. If a student gets 80% correct, how many questions did they get wrong?",
      answerOptions: [
        { text: "4", isCorrect: true, rationale: "If 80% is correct, 20% is wrong. 20% of 20 is 0.20 * 20 = 4." },
        { text: "5", isCorrect: false, rationale: "This would be 75% correct." },
        { text: "16", isCorrect: false, rationale: "This is the number of questions answered correctly." },
        { text: "20", isCorrect: false, rationale: "This is the total number of questions." }
      ],
      rationale: "If the student got 80% correct, they got 100% - 80% = 20% wrong. The number of questions they got wrong is 20% of 20, which is 0.20 * 20 = 4 questions."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "Find the mean of the following numbers: 12, 15, 18, 21, 24.",
      correctAnswer: "18",
      rationale: "The sum of the numbers is 12+15+18+21+24 = 90. Divide by 5: 90/5 = 18. Since the numbers are evenly spaced, the mean is the middle number."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A bag contains 10 red, 8 blue, and 2 green marbles. What is the probability of NOT drawing a blue marble?",
      answerOptions: [
        { text: "2/5", isCorrect: false, rationale: "This is the probability of drawing a blue marble." },
        { text: "3/5", isCorrect: true, rationale: "There are 12 non-blue marbles (10 red + 2 green) and 20 total marbles. The probability is 12/20, which is 3/5." },
        { text: "1/10", isCorrect: false, rationale: "This is the probability of drawing a green marble." },
        { text: "1/2", isCorrect: false, rationale: "This is the probability of drawing a red marble." }
      ],
      rationale: "There are a total of 10 + 8 + 2 = 20 marbles. The number of non-blue marbles is 10 (red) + 2 (green) = 12. The probability is 12/20, which simplifies to 3/5."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A restaurant menu has 4 appetizers, 6 main courses, and 3 desserts. How many different three-course meals can be ordered?",
      answerOptions: [
        { text: "13", isCorrect: false, rationale: "This is the sum of the choices." },
        { text: "24", isCorrect: false, rationale: "This is 4*6." },
        { text: "72", isCorrect: true, rationale: "Multiply the number of choices for each course: 4 * 6 * 3 = 72." },
        { text: "144", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "To find the total number of different meals, multiply the number of options for each course: 4 appetizers * 6 main courses * 3 desserts = 72 different meals."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A student\'s scores are 80, 85, 90, 95. What score is needed on the fifth test to achieve an average of 90?",
      correctAnswer: "100",
      rationale: "To have an average of 90 on 5 tests, the total score must be 5 * 90 = 450. The sum of the first four scores is 80+85+90+95 = 350. The fifth score must be 450 - 350 = 100."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the range of the data set: -8, -2, 0, 5, 10?",
      answerOptions: [
        { text: "2", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "8", isCorrect: false, rationale: "This is 10-2." },
        { text: "12", isCorrect: false, rationale: "This is 10- (-2)." },
        { text: "18", isCorrect: true, rationale: "The range is the difference between the maximum (10) and minimum (-8). 10 - (-8) = 18." }
      ],
      rationale: "The range is the difference between the highest and lowest values. Max = 10, Min = -8. Range = 10 - (-8) = 18."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "A fair die is rolled. What is the probability of rolling a number less than 3?",
      correctAnswer: "1/3",
      rationale: "The numbers less than 3 are 1 and 2. There are 2 favorable outcomes out of 6 possible outcomes. The probability is 2/6, which simplifies to 1/3."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "The median of a set of 7 numbers is 15. If six of the numbers are 8, 10, 12, 18, 20, 22, what is the seventh number?",
      answerOptions: [
        { text: "15", isCorrect: true, rationale: "For the median to be 15, it must be the middle number when ordered. The numbers are 8, 10, 12, __, 18, 20, 22. 15 fits in the middle." },
        { text: "16", isCorrect: false, rationale: "This would also be in the middle, but the question implies a unique answer." },
        { text: "14", isCorrect: false, rationale: "This would also be in the middle, but the question implies a unique answer." },
        { text: "Cannot be determined", isCorrect: false, rationale: "It can be determined." }
      ],
      rationale: "The median is the middle value of an ordered dataset. With 7 numbers, the median is the 4th number. Ordering the known numbers gives: 8, 10, 12, __, 18, 20, 22. For 15 to be the median, it must be the 4th number. Any number between 12 and 18 would also work, but 15 is the most direct answer."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Two dice are rolled. What is the probability that the sum of the numbers is 7?",
      answerOptions: [
        { text: "1/36", isCorrect: false, rationale: "This is the probability of rolling a specific combination, like (1,6)." },
        { text: "1/12", isCorrect: false, rationale: "This is 3/36." },
        { text: "1/6", isCorrect: true, rationale: "There are 6 ways to get a sum of 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). There are 36 total outcomes. P(sum=7) = 6/36 = 1/6." },
        { text: "7/36", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "There are 36 possible outcomes when rolling two dice. The combinations that sum to 7 are (1,6), (2,5), (3,4), (4,3), (5,2), and (6,1). There are 6 favorable outcomes. The probability is 6/36, which simplifies to 1/6."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Which of the following is a true statement?",
      answerOptions: [
        { text: "The mean is always one of the numbers in the data set.", isCorrect: false, rationale: "The mean is often not one of the numbers." },
        { text: "The mode is always one of the numbers in the data set.", isCorrect: true, rationale: "The mode is the most frequent number in the data set, so it must be in the set." },
        { text: "The range is always one of the numbers in the data set.", isCorrect: false, rationale: "The range is a difference, not necessarily a value in the set." },
        { text: "The median is never one of the numbers in the data set.", isCorrect: false, rationale: "The median is often one of the numbers." }
      ],
      rationale: "The mode is defined as the value that appears most frequently in a data set. Therefore, it must be one of the values present in the set."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Data, Statistics & Probability",
  id: "math_data_07",
  title: "Data, Statistics & Probability: Quiz 7",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: true,
      difficulty: "easy",
      question: "What is the mean of the numbers 5, 10, 15, 20?",
      answerOptions: [
        { text: "10", isCorrect: false, rationale: "This is one of the numbers." },
        { text: "12.5", isCorrect: true, rationale: "The sum is 50. 50/4 = 12.5." },
        { text: "15", isCorrect: false, rationale: "This is the median." },
        { text: "20", isCorrect: false, rationale: "This is the maximum value." }
      ],
      rationale: "To find the mean, add the numbers together (5 + 10 + 15 + 20 = 50) and divide by the number of values (4). 50 / 4 = 12.5."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A spinner has 8 equal sections, 3 of which are blue. What is the probability of landing on blue?",
      correctAnswer: "3/8",
      rationale: "The probability is the number of favorable outcomes (3 blue sections) divided by the total number of outcomes (8 sections)."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the median of the following numbers: 19, 12, 16, 19, 24.",
      answerOptions: [
        { text: "16", isCorrect: false, rationale: "This is one of the numbers." },
        { text: "18", isCorrect: false, rationale: "This is the mean." },
        { text: "19", isCorrect: true, rationale: "First, order the numbers: 12, 16, 19, 19, 24. The median is the middle number, 19." },
        { text: "24", isCorrect: false, rationale: "This is the maximum value." }
      ],
      rationale: "First, order the numbers from least to greatest: 12, 16, 19, 19, 24. The median is the middle value in the ordered set, which is 19."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the mode of the data set: 10, 20, 10, 30, 20, 10?",
      correctAnswer: "10",
      rationale: "The mode is the value that appears most frequently. The number 10 appears 3 times, which is more than any other number."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Find the range of the temperatures: 34, 45, 29, 38, 31.",
      answerOptions: [
        { text: "5", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "11", isCorrect: false, rationale: "This is the difference between 45 and 34." },
        { text: "16", isCorrect: true, rationale: "The range is the difference between the highest (45) and the lowest (29) values." },
        { text: "35.4", isCorrect: false, rationale: "This is the mean." }
      ],
      rationale: "The range is the difference between the maximum and minimum values. Max = 45, Min = 29. Range = 45 - 29 = 16."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A library has 2000 books. 40% are fiction, 30% are non-fiction, and the rest are reference. How many books are reference books?",
      answerOptions: [
        { text: "30", isCorrect: false, rationale: "This is the percentage." },
        { text: "600", isCorrect: true, rationale: "The percentage of reference books is 100% - 40% - 30% = 30%. 30% of 2000 is 0.30 * 2000 = 600." },
        { text: "700", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "800", isCorrect: false, rationale: "This is the number of fiction books." }
      ],
      rationale: "First, find the percentage of reference books: 100% - 40% - 30% = 30%. Then, calculate the number of reference books: 0.30 * 2000 = 600."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A car is chosen at random from a lot containing 15 red cars, 20 blue cars, and 10 green cars. What is the probability that the car is NOT red?",
      correctAnswer: "2/3",
      rationale: "There are 30 non-red cars (20 blue + 10 green) and a total of 45 cars. The probability is 30/45, which simplifies to 2/3."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "If you roll a die, which of the following is an impossible event?",
      answerOptions: [
        { text: "Rolling a 7", isCorrect: true, rationale: "A standard die is numbered 1 through 6." },
        { text: "Rolling an even number", isCorrect: false, rationale: "2, 4, 6 are even." },
        { text: "Rolling a prime number", isCorrect: false, rationale: "2, 3, 5 are prime." },
        { text: "Rolling a number greater than 1", isCorrect: false, rationale: "2, 3, 4, 5, 6 are all greater than 1." }
      ],
      rationale: "A standard die has faces numbered 1, 2, 3, 4, 5, and 6. It is impossible to roll a 7."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "Find the median of the data set: 10, 8, 12, 10, 14, 16.",
      correctAnswer: "11",
      rationale: "Order the data: 8, 10, 10, 12, 14, 16. The median is the average of the two middle numbers: (10 + 12) / 2 = 11."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A student\'s average score on 4 tests is 88. What must they score on the 5th test to have an average of 90?",
      answerOptions: [
        { text: "90", isCorrect: false, rationale: "This would not raise the average." },
        { text: "92", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "98", isCorrect: true, rationale: "Total for 4 tests: 4*88=352. Desired total for 5 tests: 5*90=450. Score needed: 450-352=98." },
        { text: "100", isCorrect: false, rationale: "This would raise the average to 90.4" }
      ],
      rationale: "The total points for the first 4 tests are 4 * 88 = 352. To have an average of 90 on 5 tests, the total points needed are 5 * 90 = 450. The score needed on the fifth test is 450 - 352 = 98."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "You have 3 shirts and 4 pairs of pants. How many different outfits can you make?",
      answerOptions: [
        { text: "7", isCorrect: false, rationale: "This is the sum of the choices." },
        { text: "12", isCorrect: true, rationale: "Multiply the number of shirts by the number of pants: 3 * 4 = 12." },
        { text: "1", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "24", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "This is a counting principle problem. The total number of outfits is the product of the number of choices for each item of clothing: 3 shirts * 4 pants = 12 outfits."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A survey found that 2 out of 3 people prefer dogs. If 30 people were surveyed, how many prefer dogs?",
      answerOptions: [
        { text: "10", isCorrect: false, rationale: "This is the number of people who do not prefer dogs." },
        { text: "15", isCorrect: false, rationale: "This would be if 1 out of 2 people preferred dogs." },
        { text: "20", isCorrect: true, rationale: "2/3 of 30 is (2/3) * 30 = 60/3 = 20." },
        { text: "30", isCorrect: false, rationale: "This is the total number of people surveyed." }
      ],
      rationale: "To find the number of people who prefer dogs, multiply the fraction by the total number of people: $\\frac{2}{3} \\times 30 = 20$ people."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Data, Statistics & Probability",
  id: "math_data_08",
  title: "Data, Statistics & Probability: Quiz 8",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: true,
      difficulty: "easy",
      question: "Find the mode of the data set: 1, 3, 5, 3, 1, 3, 4.",
      answerOptions: [
        { text: "1", isCorrect: false, rationale: "1 appears twice, but 3 appears more often." },
        { text: "3", isCorrect: true, rationale: "The number 3 appears most frequently (3 times)." },
        { text: "5", isCorrect: false, rationale: "5 appears only once." },
        { text: "2.86", isCorrect: false, rationale: "This is the mean." }
      ],
      rationale: "The mode is the value that appears most often in a data set. In this set, 3 appears three times, which is more than any other number."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A card is drawn from a standard 52-card deck. What is the probability that the card is a spade?",
      correctAnswer: "1/4",
      rationale: "There are 13 spades in a 52-card deck. The probability is 13/52, which simplifies to 1/4."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the mean of the numbers: 20, 30, 40, 50, 60.",
      answerOptions: [
        { text: "30", isCorrect: false, rationale: "This is one of the numbers." },
        { text: "40", isCorrect: true, rationale: "The sum is 200. 200/5 = 40. Since the numbers are evenly spaced, the mean is the middle number." },
        { text: "50", isCorrect: false, rationale: "This is one of the numbers." },
        { text: "200", isCorrect: false, rationale: "This is the sum." }
      ],
      rationale: "To find the mean, add the numbers (20+30+40+50+60 = 200) and divide by the count of the numbers (5). 200 / 5 = 40."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the median of the data set: 5, 2, 8, 4, 9, 2?",
      correctAnswer: "4.5",
      rationale: "Order the data: 2, 2, 4, 5, 8, 9. The median is the average of the two middle numbers: (4 + 5) / 2 = 4.5."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A bag has 4 green marbles, 3 red marbles, and 5 blue marbles. What is the probability of drawing a red OR a green marble?",
      answerOptions: [
        { text: "1/4", isCorrect: false, rationale: "This is the probability of red." },
        { text: "1/3", isCorrect: false, rationale: "This is the probability of green." },
        { text: "7/12", isCorrect: true, rationale: "There are 7 red or green marbles out of a total of 12. The probability is 7/12." },
        { text: "5/12", isCorrect: false, rationale: "This is the probability of blue." }
      ],
      rationale: "There are a total of 4 + 3 + 5 = 12 marbles. The number of red or green marbles is 4 + 3 = 7. So, the probability is 7/12."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A license plate consists of 3 letters followed by 3 numbers. How many different license plates are possible if repetition is allowed?",
      answerOptions: [
        { text: "17,576,000", isCorrect: true, rationale: "26 choices for each of the 3 letters (26³) and 10 choices for each of the 3 numbers (10³). Total = 26³ * 10³ = 17,576,000." },
        { text: "1,757,600", isCorrect: false, rationale: "This is off by a factor of 10." },
        { text: "11,232,000", isCorrect: false, rationale: "This is for no repetition." },
        { text: "36", isCorrect: false, rationale: "This is 26+10." }
      ],
      rationale: "There are 26 choices for each of the 3 letter positions and 10 choices for each of the 3 number positions. The total number of combinations is 26 * 26 * 26 * 10 * 10 * 10 = 17,576,000."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "The mean of a set of 5 numbers is 70. If a 6th number is added and the new mean is 75, what is the 6th number?",
      correctAnswer: "100",
      rationale: "The sum of the first 5 numbers is 5 * 70 = 350. The sum of the 6 numbers must be 6 * 75 = 450. The 6th number is 450 - 350 = 100."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the range of the data set: 10, 10, 10, 10, 10?",
      answerOptions: [
        { text: "0", isCorrect: true, rationale: "The range is the difference between the max and min values. Here, they are the same, so the range is 0." },
        { text: "1", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "10", isCorrect: false, rationale: "This is the value of all the numbers." },
        { text: "50", isCorrect: false, rationale: "This is the sum." }
      ],
      rationale: "The range is the difference between the maximum and minimum values. Since all the numbers are 10, the range is 10 - 10 = 0."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "A coin is flipped 3 times. What is the probability of getting tails all 3 times?",
      correctAnswer: "1/8",
      rationale: "The probability of tails on one flip is 1/2. For 3 flips, the probability is (1/2) * (1/2) * (1/2) = 1/8."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A student has scores of 70, 75, and 80. What is the lowest score they can get on the 4th test to have at least an average of 80?",
      answerOptions: [
        { text: "80", isCorrect: false, rationale: "This would give an average of 78.75" },
        { text: "90", isCorrect: false, rationale: "This would give an average of 78.75" },
        { text: "95", isCorrect: true, rationale: "To average 80 on 4 tests, the total must be 320. The current sum is 225. 320-225=95." },
        { text: "100", isCorrect: false, rationale: "This would give an average of 81.25" }
      ],
      rationale: "To have an average of at least 80 on 4 tests, the total score must be at least 4 * 80 = 320. The sum of the first three scores is 70 + 75 + 80 = 225. The fourth score must be at least 320 - 225 = 95."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "A committee of 3 is to be selected from a group of 10 people. This is an example of a:",
      answerOptions: [
        { text: "Permutation", isCorrect: false, rationale: "A permutation is an arrangement where order matters." },
        { text: "Combination", isCorrect: true, rationale: "A combination is a selection where order does not matter." },
        { text: "Probability", isCorrect: false, rationale: "Probability is the chance of an event occurring." },
        { text: "Statistic", isCorrect: false, rationale: "A statistic is a piece of data from a study." }
      ],
      rationale: "Since the order in which the people are selected for the committee does not matter, this is a combination problem."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "If there is a 20% chance of rain, what are the odds against rain?",
      answerOptions: [
        { text: "1 to 4", isCorrect: false, rationale: "These are the odds in favor of rain." },
        { text: "4 to 1", isCorrect: true, rationale: "The probability of no rain is 80%. The odds are P(no rain) to P(rain), which is 80:20 or 4:1." },
        { text: "1 to 5", isCorrect: false, rationale: "This relates probability to total outcomes." },
        { text: "5 to 1", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "A 20% chance of rain means the probability is 0.20 or 1/5. The probability of no rain is 80% or 4/5. The odds against rain are the ratio of the probability of no rain to the probability of rain, which is (4/5) to (1/5), or 4 to 1."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Data, Statistics & Probability",
  id: "math_data_09",
  title: "Data, Statistics & Probability: Quiz 9",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: true,
      difficulty: "easy",
      question: "Find the range of the data set: 100, 200, 150, 300, 250.",
      answerOptions: [
        { text: "100", isCorrect: false, rationale: "This is the minimum value." },
        { text: "200", isCorrect: true, rationale: "The range is the difference between the max (300) and min (100) values." },
        { text: "300", isCorrect: false, rationale: "This is the maximum value." },
        { text: "150", isCorrect: false, rationale: "This is one of the values." }
      ],
      rationale: "The range is the difference between the highest and lowest values in the dataset. The highest value is 300 and the lowest is 100. Range = 300 - 100 = 200."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is the probability of rolling an odd number on a standard six-sided die?",
      correctAnswer: "1/2",
      rationale: "There are three odd numbers (1, 3, 5) out of six possible outcomes. The probability is 3/6, which simplifies to 1/2."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the mean of the numbers: 7, 8, 8, 9, 13.",
      answerOptions: [
        { text: "8", isCorrect: false, rationale: "This is the median and mode." },
        { text: "9", isCorrect: true, rationale: "The sum is 45. 45/5 = 9." },
        { text: "13", isCorrect: false, rationale: "This is the maximum value." },
        { text: "6", isCorrect: false, rationale: "This is the range." }
      ],
      rationale: "To find the mean, add the numbers together (7 + 8 + 8 + 9 + 13 = 45) and divide by the number of values (5). 45 / 5 = 9."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the median of the data set: 3, 9, 1, 4, 3, 8?",
      correctAnswer: "3.5",
      rationale: "Order the data: 1, 3, 3, 4, 8, 9. The median is the average of the two middle numbers: (3 + 4) / 2 = 3.5."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A bag contains 20 marbles. If the probability of drawing a red marble is 1/4, how many red marbles are in the bag?",
      answerOptions: [
        { text: "4", isCorrect: false, rationale: "This would be a probability of 1/5." },
        { text: "5", isCorrect: true, rationale: "1/4 of 20 is (1/4) * 20 = 5." },
        { text: "10", isCorrect: false, rationale: "This would be a probability of 1/2." },
        { text: "15", isCorrect: false, rationale: "This is the number of non-red marbles." }
      ],
      rationale: "To find the number of red marbles, multiply the total number of marbles by the probability of drawing a red one: 20 * (1/4) = 5 red marbles."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A test has a mean score of 80 and a standard deviation of 5. A student scores a 90. This score is how many standard deviations above the mean?",
      answerOptions: [
        { text: "1", isCorrect: false, rationale: "1 standard deviation would be a score of 85." },
        { text: "2", isCorrect: true, rationale: "The score is 10 points above the mean. Since the standard deviation is 5, this is 10/5 = 2 standard deviations." },
        { text: "3", isCorrect: false, rationale: "3 standard deviations would be a score of 95." },
        { text: "10", isCorrect: false, rationale: "This is the difference in score." }
      ],
      rationale: "The difference between the student\'s score and the mean is 90 - 80 = 10. To find how many standard deviations this is, divide the difference by the standard deviation: 10 / 5 = 2."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the mode of the data: A, B, C, A, B, A, D?",
      correctAnswer: "A",
      rationale: "The mode is the value that appears most frequently. \'A\' appears 3 times, which is more than any other letter."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the probability of drawing a face card (Jack, Queen, or King) from a standard 52-card deck?",
      answerOptions: [
        { text: "3/52", isCorrect: false, rationale: "This is the probability of drawing a Jack of a specific suit." },
        { text: "1/13", isCorrect: false, rationale: "This is the probability of drawing a card of a specific rank." },
        { text: "3/13", isCorrect: true, rationale: "There are 12 face cards (3 in each of 4 suits) in a deck of 52 cards. 12/52 simplifies to 3/13." },
        { text: "1/4", isCorrect: false, rationale: "This is the probability of drawing a card of a specific suit." }
      ],
      rationale: "There are 3 face cards (Jack, Queen, King) in each of the 4 suits, so there are a total of 12 face cards. The probability is 12/52, which simplifies to 3/13."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A student needs an average of at least 85 on three exams. Their scores on the first two exams are 80 and 82. What is the minimum score they need on the third exam?",
      correctAnswer: "93",
      rationale: "To average 85 on 3 exams, the total score must be 3 * 85 = 255. The sum of the first two scores is 80 + 82 = 162. The third score must be at least 255 - 162 = 93."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which of these is a measure of the spread of data?",
      answerOptions: [
        { text: "Mean", isCorrect: false, rationale: "The mean is a measure of central tendency." },
        { text: "Median", isCorrect: false, rationale: "The median is a measure of central tendency." },
        { text: "Mode", isCorrect: false, rationale: "The mode is a measure of central tendency." },
        { text: "Range", isCorrect: true, rationale: "The range measures how spread out the data is." }
      ],
      rationale: "The range is a measure of statistical dispersion, which describes the spread of data points."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A code is formed using two different digits from 1 to 5. How many different codes are possible?",
      answerOptions: [
        { text: "10", isCorrect: false, rationale: "This is C(5,2)." },
        { text: "20", isCorrect: true, rationale: "This is a permutation. 5 choices for the first digit, 4 for the second. 5 * 4 = 20." },
        { text: "25", isCorrect: false, rationale: "This is if repetition is allowed." },
        { text: "120", isCorrect: false, rationale: "This is 5!." }
      ],
      rationale: "This is a permutation problem because the order of the digits matters. There are 5 choices for the first digit. Since the digits must be different, there are 4 choices remaining for the second digit. The total number of codes is 5 * 4 = 20."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "If an event has a probability of 0, it is:",
      answerOptions: [
        { text: "Certain", isCorrect: false, rationale: "A certain event has a probability of 1." },
        { text: "Likely", isCorrect: false, rationale: "A likely event has a probability greater than 0.5." },
        { text: "Unlikely", isCorrect: false, rationale: "An unlikely event has a probability less than 0.5." },
        { text: "Impossible", isCorrect: true, rationale: "A probability of 0 means the event cannot happen." }
      ],
      rationale: "In probability, an event with a probability of 0 is considered impossible."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Data, Statistics & Probability",
  id: "math_data_10",
  title: "Data, Statistics & Probability: Quiz 10",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: true,
      difficulty: "easy",
      question: "Find the mean of the numbers: 2, 4, 6, 8, 10.",
      answerOptions: [
        { text: "4", isCorrect: false, rationale: "This is one of the numbers." },
        { text: "6", isCorrect: true, rationale: "The sum is 30. 30/5 = 6. Since the numbers are evenly spaced, the mean is the middle number." },
        { text: "8", isCorrect: false, rationale: "This is one of the numbers." },
        { text: "10", isCorrect: false, rationale: "This is the maximum value." }
      ],
      rationale: "To find the mean, add the numbers together (2+4+6+8+10 = 30) and divide by the number of values (5). 30 / 5 = 6."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is the mode of the data set: cat, dog, dog, fish, cat, dog?",
      correctAnswer: "dog",
      rationale: "The mode is the value that appears most frequently. \'Dog\' appears 3 times, more than any other animal."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the median of the data set: 11, 22, 11, 33, 44, 11?",
      answerOptions: [
        { text: "11", isCorrect: false, rationale: "This is the mode." },
        { text: "16.5", isCorrect: true, rationale: "Order the data: 11, 11, 11, 22, 33, 44. The median is the average of the two middle numbers: (11+22)/2 = 16.5." },
        { text: "22", isCorrect: false, rationale: "This is one of the middle numbers." },
        { text: "22.83", isCorrect: false, rationale: "This is the mean." }
      ],
      rationale: "First, order the numbers: 11, 11, 11, 22, 33, 44. Since there is an even number of values, the median is the average of the two middle numbers (11 and 22). (11 + 22) / 2 = 16.5."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "A spinner has 10 equal sections, numbered 1 to 10. What is the probability of spinning a prime number?",
      correctAnswer: "2/5",
      rationale: "The prime numbers between 1 and 10 are 2, 3, 5, and 7. There are 4 prime numbers out of 10 total. The probability is 4/10, which simplifies to 2/5."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Find the range of the data set: 50, 40, 60, 30, 70.",
      answerOptions: [
        { text: "20", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "30", isCorrect: false, rationale: "This is the minimum value." },
        { text: "40", isCorrect: true, rationale: "The range is the difference between the max (70) and min (30) values." },
        { text: "50", isCorrect: false, rationale: "This is the mean and median." }
      ],
      rationale: "The range is the difference between the highest and lowest values in the dataset. The highest value is 70 and the lowest is 30. Range = 70 - 30 = 40."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A student\'s scores are 85, 90, and 95. What do they need to score on their fourth test to have a mean score of 90?",
      answerOptions: [
        { text: "85", isCorrect: false, rationale: "This would result in a mean of 88.75." },
        { text: "90", isCorrect: true, rationale: "To average 90 on 4 tests, the total must be 360. The current sum is 270. 360-270=90." },
        { text: "95", isCorrect: false, rationale: "This would result in a mean of 91.25." },
        { text: "100", isCorrect: false, rationale: "This would result in a mean of 92.5." }
      ],
      rationale: "To have an average of 90 on 4 tests, the total score must be 4 * 90 = 360. The sum of the first three scores is 85 + 90 + 95 = 270. The fourth score must be 360 - 270 = 90."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "A restaurant offers 5 main courses and 4 desserts. How many different two-course meals (main + dessert) are possible?",
      correctAnswer: "20",
      rationale: "To find the total number of combinations, multiply the number of choices for each course: 5 main courses * 4 desserts = 20."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A die is rolled. What is the probability of rolling a number that is a multiple of 3?",
      answerOptions: [
        { text: "1/6", isCorrect: false, rationale: "This is the probability of rolling a 3." },
        { text: "1/3", isCorrect: true, rationale: "The multiples of 3 are 3 and 6. There are 2 favorable outcomes out of 6 total. 2/6 = 1/3." },
        { text: "1/2", isCorrect: false, rationale: "This is the probability of rolling an even number." },
        { text: "2/3", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "On a standard six-sided die, the multiples of 3 are 3 and 6. This means there are 2 favorable outcomes out of 6 possible outcomes. The probability is 2/6, which simplifies to 1/3."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "The probability of winning a game is 0.4. If you play the game 50 times, how many times would you expect to win?",
      correctAnswer: "20",
      rationale: "The expected number of wins is the probability of winning multiplied by the number of times you play: 0.4 * 50 = 20."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "In a pie chart, what does a sector representing 25% of the data look like?",
      answerOptions: [
        { text: "A straight line", isCorrect: false, rationale: "This is not a feature of a pie chart." },
        { text: "A quarter of the circle", isCorrect: true, rationale: "25% is one quarter of 100%, so the sector would be a quarter of the circle." },
        { text: "Half of the circle", isCorrect: false, rationale: "This would represent 50%." },
        { text: "The whole circle", isCorrect: false, rationale: "This would represent 100%." }
      ],
      rationale: "A pie chart represents a whole (100%). A sector representing 25% of the data would take up 25% of the circle\'s area, which is a quarter of the circle."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "From a group of 7 people, how many ways can a president and vice-president be selected?",
      answerOptions: [
        { text: "14", isCorrect: false, rationale: "This is 7*2." },
        { text: "21", isCorrect: false, rationale: "This is C(7,2)." },
        { text: "42", isCorrect: true, rationale: "This is a permutation. 7 choices for president, 6 for vice-president. 7 * 6 = 42." },
        { text: "49", isCorrect: false, rationale: "This is $7^2$." }
      ],
      rationale: "This is a permutation because the order of selection matters (president is different from vice-president). There are 7 choices for president. Once the president is chosen, there are 6 people left to be vice-president. The total number of ways is 7 * 6 = 42."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "If the probability of an event is 3/8, what is the probability that the event will NOT happen?",
      answerOptions: [
        { text: "3/8", isCorrect: false, rationale: "This is the probability of the event happening." },
        { text: "5/8", isCorrect: true, rationale: "The total probability is 1. 1 - 3/8 = 8/8 - 3/8 = 5/8." },
        { text: "8/3", isCorrect: false, rationale: "This is the reciprocal." },
        { text: "1", isCorrect: false, rationale: "This represents certainty." }
      ],
      rationale: "The sum of the probability of an event happening and the probability of it not happening is 1. So, the probability of the event not happening is 1 - 3/8 = 5/8."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Data, Statistics & Probability",
  id: "math_data_11",
  title: "Data, Statistics & Probability: Quiz 11",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: true,
      difficulty: "easy",
      question: "What is the mode of the data set: 10, 20, 30, 20, 10, 20?",
      answerOptions: [
        { text: "10", isCorrect: false, rationale: "10 appears twice, but 20 appears more." },
        { text: "15", isCorrect: false, rationale: "This is the median." },
        { text: "18.33", isCorrect: false, rationale: "This is the mean." },
        { text: "20", isCorrect: true, rationale: "The number 20 appears most frequently (3 times)." }
      ],
      rationale: "The mode is the value that appears most often in a data set. In this set, 20 appears three times, which is more than any other number."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A bag has 5 red, 3 blue, and 2 green marbles. What is the probability of picking a blue marble?",
      correctAnswer: "3/10",
      rationale: "There are 3 blue marbles and a total of 10 marbles (5+3+2). The probability is 3/10."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the mean of the data set: 1, 1, 2, 3, 5, 8.",
      answerOptions: [
        { text: "2.5", isCorrect: false, rationale: "This is the median." },
        { text: "3.33", isCorrect: true, rationale: "The sum is 20. 20/6 ≈ 3.33." },
        { text: "1", isCorrect: false, rationale: "This is the mode." },
        { text: "7", isCorrect: false, rationale: "This is the range." }
      ],
      rationale: "To find the mean, add the numbers together (1+1+2+3+5+8 = 20) and divide by the number of values (6). 20 / 6 ≈ 3.33."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the range of the data set: 1.5, 2.3, 0.8, 3.1, 1.9?",
      correctAnswer: "2.3",
      rationale: "The range is the difference between the maximum (3.1) and minimum (0.8) values. 3.1 - 0.8 = 2.3."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the median of the data set: 100, 200, 50, 300, 250?",
      answerOptions: [
        { text: "50", isCorrect: false, rationale: "This is the minimum value." },
        { text: "180", isCorrect: false, rationale: "This is the mean." },
        { text: "200", isCorrect: true, rationale: "Order the data: 50, 100, 200, 250, 300. The median is the middle value." },
        { text: "250", isCorrect: false, rationale: "This is the range." }
      ],
      rationale: "First, order the numbers from least to greatest: 50, 100, 200, 250, 300. The median is the middle value in the ordered set, which is 200."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A test has 5 true/false questions. How many different ways can the test be answered?",
      answerOptions: [
        { text: "10", isCorrect: false, rationale: "This is 5*2." },
        { text: "25", isCorrect: false, rationale: "This is $5^2$." },
        { text: "32", isCorrect: true, rationale: "There are 2 choices for each of the 5 questions. 2*2*2*2*2 = $2^5$ = 32." },
        { text: "120", isCorrect: false, rationale: "This is 5!." }
      ],
      rationale: "Each question has 2 possible answers (true or false). Since there are 5 questions, the total number of different ways to answer is 2 * 2 * 2 * 2 * 2 = $2^5$ = 32."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "The mean of five numbers is 12. Four of the numbers are 10, 12, 14, and 16. What is the fifth number?",
      correctAnswer: "8",
      rationale: "The sum of the five numbers must be 5 * 12 = 60. The sum of the four known numbers is 10+12+14+16 = 52. The fifth number is 60 - 52 = 8."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the probability of drawing an Ace from a standard 52-card deck?",
      answerOptions: [
        { text: "1/52", isCorrect: false, rationale: "This is for a specific Ace." },
        { text: "1/13", isCorrect: true, rationale: "There are 4 Aces in a 52-card deck. 4/52 simplifies to 1/13." },
        { text: "1/4", isCorrect: false, rationale: "This is the probability of drawing a specific suit." },
        { text: "4/13", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "A standard deck of 52 cards has 4 Aces. The probability is the number of Aces divided by the total number of cards: 4/52, which simplifies to 1/13."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "A jar has 15 red marbles and 5 green marbles. What are the odds in favor of drawing a red marble?",
      correctAnswer: "3:1",
      rationale: "The odds in favor are the ratio of favorable outcomes to unfavorable outcomes. There are 15 red (favorable) and 5 green (unfavorable). The ratio is 15:5, which simplifies to 3:1."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Out of 800 students, 240 are in the band. What percentage of students are in the band?",
      answerOptions: [
        { text: "24%", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "30%", isCorrect: true, rationale: "(240 / 800) * 100 = 0.3 * 100 = 30%." },
        { text: "33.3%", isCorrect: false, rationale: "This is 1/3." },
        { text: "40%", isCorrect: false, rationale: "This would be 320 students." }
      ],
      rationale: "To find the percentage, divide the number of students in the band by the total number of students and multiply by 100: (240 / 800) * 100 = 0.3 * 100 = 30%."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Two events are independent if:",
      answerOptions: [
        { text: "They have the same probability.", isCorrect: false, rationale: "Probabilities do not determine independence." },
        { text: "The outcome of one event does not affect the outcome of the other.", isCorrect: true, rationale: "This is the definition of independent events." },
        { text: "They cannot happen at the same time.", isCorrect: false, rationale: "These are mutually exclusive events." },
        { text: "The outcome of one event is dependent on the outcome of the other.", isCorrect: false, rationale: "This is the definition of dependent events." }
      ],
      rationale: "In probability, two events are independent if the occurrence of one does not affect the probability of the occurrence of the other."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "If the probability that it will snow is 35%, what is the probability that it will not snow?",
      answerOptions: [
        { text: "35%", isCorrect: false, rationale: "This is the probability it will snow." },
        { text: "55%", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "65%", isCorrect: true, rationale: "100% - 35% = 65%." },
        { text: "70%", isCorrect: false, rationale: "This is double the probability." }
      ],
      rationale: "The total probability of all possible outcomes is 100%. If the probability of snow is 35%, the probability of no snow is 100% - 35% = 65%."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Data, Statistics & Probability",
  id: "math_data_12",
  title: "Data, Statistics & Probability: Quiz 12",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: true,
      difficulty: "easy",
      question: "Find the mean of the data set: 5, 10, 5, 15, 5.",
      answerOptions: [
        { text: "5", isCorrect: false, rationale: "This is the mode and median." },
        { text: "8", isCorrect: true, rationale: "The sum is 40. 40/5 = 8." },
        { text: "10", isCorrect: false, rationale: "This is the range." },
        { text: "40", isCorrect: false, rationale: "This is the sum." }
      ],
      rationale: "To find the mean, add the numbers together (5+10+5+15+5 = 40) and divide by the number of values (5). 40 / 5 = 8."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A drawer has 8 blue socks and 4 black socks. What is the probability of picking a black sock?",
      correctAnswer: "1/3",
      rationale: "There are 4 black socks and a total of 12 socks. The probability is 4/12, which simplifies to 1/3."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the median of the data set: 4, 8, 2, 9, 8, 5?",
      answerOptions: [
        { text: "6.5", isCorrect: true, rationale: "Order the data: 2, 4, 5, 8, 8, 9. The median is the average of 5 and 8: (5+8)/2 = 6.5." },
        { text: "8", isCorrect: false, rationale: "This is the mode." },
        { text: "6", isCorrect: false, rationale: "This is the mean." },
        { text: "7", isCorrect: false, rationale: "This is the range." }
      ],
      rationale: "First, order the numbers: 2, 4, 5, 8, 8, 9. Since there is an even number of values, the median is the average of the two middle numbers (5 and 8). (5 + 8) / 2 = 6.5."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "The range of a set of numbers is 20. If the highest number is 35, what is the lowest number?",
      correctAnswer: "15",
      rationale: "The range is the difference between the highest and lowest numbers. Range = Max - Min. 20 = 35 - Min. Min = 15."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A coin is flipped and a die is rolled. What is the total number of possible outcomes?",
      answerOptions: [
        { text: "6", isCorrect: false, rationale: "This is the number of outcomes for the die." },
        { text: "8", isCorrect: false, rationale: "This is 2+6." },
        { text: "12", isCorrect: true, rationale: "There are 2 outcomes for the coin and 6 for the die. Total outcomes = 2 * 6 = 12." },
        { text: "36", isCorrect: false, rationale: "This is 6*6." }
      ],
      rationale: "The coin has 2 possible outcomes (heads or tails), and the die has 6 possible outcomes. To find the total number of outcomes, multiply the outcomes for each event: 2 * 6 = 12."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "The average of 6 numbers is 10. What is the sum of the numbers?",
      answerOptions: [
        { text: "1.67", isCorrect: false, rationale: "This is 10/6." },
        { text: "16", isCorrect: false, rationale: "This is 10+6." },
        { text: "60", isCorrect: true, rationale: "The sum is the average multiplied by the number of values. 10 * 6 = 60." },
        { text: "100", isCorrect: false, rationale: "This is 10*10." }
      ],
      rationale: "The mean is the sum of the values divided by the number of values. Therefore, the sum of the values is the mean multiplied by the number of values. Sum = 10 * 6 = 60."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the mode of the data: 5, 1, 4, 1, 5, 1, 4?",
      correctAnswer: "1",
      rationale: "The number 1 appears 3 times, which is more than any other number in the set."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the probability of drawing a red Queen from a standard 52-card deck?",
      answerOptions: [
        { text: "1/52", isCorrect: false, rationale: "This is for a specific red queen." },
        { text: "1/26", isCorrect: true, rationale: "There are 2 red Queens (Hearts and Diamonds) out of 52 cards. 2/52 = 1/26." },
        { text: "1/13", isCorrect: false, rationale: "This is the probability of drawing any Queen." },
        { text: "1/4", isCorrect: false, rationale: "This is the probability of drawing a card from a specific suit." }
      ],
      rationale: "There are two red Queens in a deck of 52 cards (the Queen of Hearts and the Queen of Diamonds). The probability is 2/52, which simplifies to 1/26."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A survey of 120 people found that 45% prefer watching movies at home. How many people is that?",
      correctAnswer: "54",
      rationale: "45% of 120 is 0.45 * 120 = 54."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "If an event is equally likely to happen as not to happen, what is its probability?",
      answerOptions: [
        { text: "0", isCorrect: false, rationale: "This means it\'s impossible." },
        { text: "1", isCorrect: false, rationale: "This means it\'s certain." },
        { text: "0.5", isCorrect: true, rationale: "0.5 or 1/2 represents a 50% chance, which is equally likely." },
        { text: "0.25", isCorrect: false, rationale: "This is a 1 in 4 chance." }
      ],
      rationale: "An event that is equally likely to happen as not to happen has a 50% chance of occurring, which is a probability of 0.5 or 1/2."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A bag contains 5 red balls and 3 blue balls. You draw one ball, do not replace it, and then draw a second ball. What is the probability that both balls are red?",
      answerOptions: [
        { text: "25/64", isCorrect: false, rationale: "This is if you replace the ball." },
        { text: "5/14", isCorrect: true, rationale: "P(1st is red) = 5/8. P(2nd is red) = 4/7. P(both) = (5/8)*(4/7) = 20/56 = 5/14." },
        { text: "15/56", isCorrect: false, rationale: "This is P(red then blue)." },
        { text: "9/64", isCorrect: false, rationale: "This is P(blue then blue with replacement)." }
      ],
      rationale: "The probability of the first ball being red is 5/8. After drawing one red ball, there are 4 red balls left and a total of 7 balls. The probability of the second ball being red is 4/7. The total probability is (5/8) * (4/7) = 20/56, which simplifies to 5/14."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "The median score on a test was 80. What does this mean?",
      answerOptions: [
        { text: "Most people scored an 80.", isCorrect: false, rationale: "This describes the mode." },
        { text: "The average score was 80.", isCorrect: false, rationale: "This describes the mean." },
        { text: "Half the students scored 80 or above, and half scored 80 or below.", isCorrect: true, rationale: "This is the definition of the median." },
        { text: "The difference between the highest and lowest score was 80.", isCorrect: false, rationale: "This describes the range." }
      ],
      rationale: "The median is the value that separates the higher half from the lower half of a data sample. It is the middle value."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Geometry & Measurement",
  id: "math_geometry_01",
  title: "Geometry & Measurement: Quiz 1",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the area of a rectangle with a length of 10 cm and a width of 5 cm?",
      answerOptions: [
        { text: "15 $cm^2$", isCorrect: false, rationale: "This is the sum of the length and width, not the area." },
        { text: "30 $cm^2$", isCorrect: false, rationale: "This is the perimeter of the rectangle." },
        { text: "50 $cm^2$", isCorrect: true, rationale: "Area of a rectangle is length times width: 10 * 5 = 50." },
        { text: "100 $cm^2$", isCorrect: false, rationale: "This is the result of squaring the length." }
      ],
      rationale: "The area of a rectangle is calculated by multiplying its length by its width. Area = 10 cm * 5 cm = 50 $cm^2$."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A square has a perimeter of 24 inches. What is the length of one side?",
      correctAnswer: "6 inches",
      rationale: "A square has four equal sides. To find the length of one side, divide the perimeter by 4: 24 inches / 4 = 6 inches."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the area of a triangle with a base of 8 inches and a height of 6 inches?",
      answerOptions: [
        { text: "14 $in^2$", isCorrect: false, rationale: "This is the sum of the base and height." },
        { text: "24 $in^2$", isCorrect: true, rationale: "The area is (1/2) * base * height = (1/2) * 8 * 6 = 24." },
        { text: "28 $in^2$", isCorrect: false, rationale: "This is the perimeter of a different triangle." },
        { text: "48 $in^2$", isCorrect: false, rationale: "This is the result of multiplying base by height, without multiplying by 1/2." }
      ],
      rationale: "The formula for the area of a triangle is A = 1/2 * b * h. So, A = 1/2 * 8 inches * 6 inches = 24 $in^2$."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A circle has a radius of 5 meters. What is its circumference? Use 3.14 for $\\pi$.",
      correctAnswer: "31.4 meters",
      rationale: "The formula for circumference is C = 2 * pi * r. C = 2 * 3.14 * 5 = 31.4 meters."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "In a right triangle, the two legs have lengths of 9 cm and 12 cm. What is the length of the hypotenuse?",
      answerOptions: [
        { text: "15 cm", isCorrect: true, rationale: "Using the Pythagorean theorem, $a^2 + b^2 = c^2$. So, $9^2 + 12^2$ = 81 + 144 = 225. The square root of 225 is 15." },
        { text: "21 cm", isCorrect: false, rationale: "This is the sum of the two legs." },
        { text: "108 cm", isCorrect: false, rationale: "This is the product of the two legs." },
        { text: "42 cm", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "According to the Pythagorean theorem, $a^2 + b^2 = c^2$. So, $9^2 + 12^2 = c^2$, which is $81 + 144 = 225$. Thus, c = $\\sqrt{225}$ = 15 cm."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the volume of a rectangular prism with a length of 7 feet, a width of 3 feet, and a height of 4 feet?",
      answerOptions: [
        { text: "14 $ft^3$", isCorrect: false, rationale: "This is the sum of the dimensions." },
        { text: "49 $ft^3$", isCorrect: false, rationale: "This is the result of an incorrect calculation." },
        { text: "84 $ft^3$", isCorrect: true, rationale: "Volume is length * width * height = 7 * 3 * 4 = 84." },
        { text: "100 $ft^3$", isCorrect: false, rationale: "This is the result of an incorrect calculation." }
      ],
      rationale: "The volume of a rectangular prism is V = l * w * h. So, V = 7 ft * 3 ft * 4 ft = 84 $ft^3$."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Two angles in a triangle measure 40° and 60°. What is the measure of the third angle?",
      correctAnswer: "80°",
      rationale: "The sum of the angles in a triangle is always 180°. So, the third angle is 180° - 40° - 60° = 80°."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "What is the area of a circle with a diameter of 10 inches? Use 3.14 for $\\pi$.",
      answerOptions: [
        { text: "31.4 $in^2$", isCorrect: false, rationale: "This is the circumference of the circle." },
        { text: "78.5 $in^2$", isCorrect: true, rationale: "The radius is half the diameter (5 in). Area = pi * $r^2$ = 3.14 * $5^2$ = 78.5." },
        { text: "100 $in^2$", isCorrect: false, rationale: "This is the result of squaring the diameter." },
        { text: "314 $in^2$", isCorrect: false, rationale: "This is the result of using the diameter in the area formula." }
      ],
      rationale: "First, find the radius, which is half the diameter: 10 inches / 2 = 5 inches. The area formula is A = pi * $r^2$. So, A = 3.14 * (5 inches)$^2$ = 3.14 * 25 = 78.5 $in^2$."
    },
    {
        questionNumber: 9,
        type: "fillIn",
        calculator: false,
        difficulty: "easy",
        question: "How many feet are in 3 yards?",
        correctAnswer: "9 feet",
        rationale: "There are 3 feet in 1 yard. So, in 3 yards, there are 3 * 3 = 9 feet."
      },
      {
        questionNumber: 10,
        type: "multipleChoice",
        calculator: true,
        difficulty: "medium",
        question: "A cylindrical can has a radius of 2 inches and a height of 6 inches. What is its volume? Use 3.14 for $\\pi$.",
        answerOptions: [
          { text: "37.68 $in^3$", isCorrect: false, rationale: "This is the lateral surface area of the cylinder." },
          { text: "75.36 $in^3$", isCorrect: true, rationale: "Volume = pi * $r^2$ * h = 3.14 * $2^2$ * 6 = 75.36." },
          { text: "113.04 $in^3$", isCorrect: false, rationale: "This is the result of an incorrect calculation." },
          { text: "226.08 $in^3$", isCorrect: false, rationale: "This is double the correct volume." }
        ],
        rationale: "The formula for the volume of a cylinder is V = pi * $r^2$ * h. So, V = 3.14 * (2 inches)$^2$ * 6 inches = 3.14 * 4 * 6 = 75.36 $in^3$."
      },
      {
        questionNumber: 11,
        type: "multipleChoice",
        calculator: false,
        difficulty: "hard",
        question: "An angle that measures 95° is classified as what type of angle?",
        answerOptions: [
          { text: "Acute", isCorrect: false, rationale: "An acute angle is less than 90°." },
          { text: "Obtuse", isCorrect: true, rationale: "An obtuse angle is greater than 90° but less than 180°." },
          { text: "Right", isCorrect: false, rationale: "A right angle is exactly 90°." },
          { text: "Straight", isCorrect: false, rationale: "A straight angle is exactly 180°." }
        ],
        rationale: "Angles are classified based on their measure. An angle greater than 90° and less than 180° is an obtuse angle."
      },
      {
        questionNumber: 12,
        type: "multipleChoice",
        calculator: false,
        difficulty: "medium",
        question: "What is the perimeter of a regular hexagon with a side length of 8 cm?",
        answerOptions: [
          { text: "40 cm", isCorrect: false, rationale: "This is the perimeter of a regular pentagon with this side length." },
          { text: "48 cm", isCorrect: true, rationale: "A regular hexagon has 6 equal sides. Perimeter = 6 * 8 = 48." },
          { text: "56 cm", isCorrect: false, rationale: "This is the perimeter of a regular heptagon." },
          { text: "64 cm", isCorrect: false, rationale: "This is the perimeter of a regular octagon." }
        ],
        rationale: "A regular hexagon has 6 equal sides. The perimeter is the sum of the lengths of all sides, so P = 6 * side length = 6 * 8 cm = 48 cm."
      }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Geometry & Measurement",
  id: "math_geometry_02",
  title: "Geometry & Measurement: Quiz 2",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the perimeter of a square with a side length of 7 meters?",
      answerOptions: [
        { text: "14 m", isCorrect: false, rationale: "This is the sum of only two sides." },
        { text: "21 m", isCorrect: false, rationale: "This is the sum of only three sides." },
        { text: "28 m", isCorrect: true, rationale: "A square has 4 equal sides, so the perimeter is 4 * 7 = 28 m." },
        { text: "49 m", isCorrect: false, rationale: "This is the area of the square." }
      ],
      rationale: "The perimeter of a square is 4 times the side length. P = 4 * 7 m = 28 m."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A circle has a circumference of 50.24 cm. What is its radius? Use 3.14 for $\\pi$.",
      correctAnswer: "8 cm",
      rationale: "Circumference C = 2 * pi * r. So, 50.24 = 2 * 3.14 * r. 50.24 = 6.28 * r. Divide by 6.28 to find r = 8 cm."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the volume of a sphere with a radius of 3 inches? Use 3.14 for $\\pi$ and the formula V = $\\frac{4}{3}\\pi r^3$.",
      answerOptions: [
        { text: "37.68 in³", isCorrect: false, rationale: "This is the surface area of the sphere." },
        { text: "113.04 in³", isCorrect: true, rationale: "V = (4/3) * 3.14 * 3³ = (4/3) * 3.14 * 27 = 113.04." },
        { text: "254.34 in³", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "904.32 in³", isCorrect: false, rationale: "This is the volume of a sphere with a much larger radius." }
      ],
      rationale: "Using the formula, V = (4/3) * 3.14 * (3 inches)³ = (4/3) * 3.14 * 27 = 113.04 in³."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "An angle measuring 45° is what type of angle?",
      correctAnswer: "Acute",
      rationale: "An acute angle is an angle that measures less than 90°."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Two lines that intersect to form a right angle are called:",
      answerOptions: [
        { text: "Parallel lines", isCorrect: false, rationale: "Parallel lines never intersect." },
        { text: "Perpendicular lines", isCorrect: true, rationale: "Perpendicular lines intersect at a 90° angle." },
        { text: "Skew lines", isCorrect: false, rationale: "Skew lines are in different planes and do not intersect." },
        { text: "Collinear lines", isCorrect: false, rationale: "This is not a standard term for intersecting lines." }
      ],
      rationale: "The definition of perpendicular lines is that they intersect at a right (90°) angle."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A right triangle has a hypotenuse of length 17 and one leg of length 8. What is the length of the other leg?",
      answerOptions: [
        { text: "9", isCorrect: false, rationale: "This is the difference between 17 and 8." },
        { text: "15", isCorrect: true, rationale: "Using the Pythagorean theorem, $a^2 + 8^2 = 17^2$. $a^2 + 64 = 289$. $a^2 = 225$. a = 15." },
        { text: "25", isCorrect: false, rationale: "This is the sum of 17 and 8." },
        { text: "225", isCorrect: false, rationale: "This is $a^2$ not a." }
      ],
      rationale: "Using the Pythagorean theorem, $a^2 + b^2 = c^2$. We have $a^2 + 8^2 = 17^2$, so $a^2 + 64 = 289$. Subtract 64 from both sides: $a^2 = 225$. The square root of 225 is 15."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the sum of the interior angles of a quadrilateral?",
      correctAnswer: "360°",
      rationale: "A quadrilateral can be divided into two triangles, and the sum of angles in each triangle is 180°. So, the total is 180° * 2 = 360°."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A rectangular garden is 20 feet long and has a perimeter of 70 feet. What is its width?",
      answerOptions: [
        { text: "15 feet", isCorrect: true, rationale: "The perimeter is 2(L+W). 70 = 2(20+W). 35 = 20+W. W = 15." },
        { text: "25 feet", isCorrect: false, rationale: "This is half the perimeter minus half the length." },
        { text: "35 feet", isCorrect: false, rationale: "This is half the perimeter." },
        { text: "50 feet", isCorrect: false, rationale: "This is the perimeter minus the length." }
      ],
      rationale: "The formula for the perimeter of a rectangle is P = 2L + 2W. We have 70 = 2(20) + 2W, so 70 = 40 + 2W. Subtract 40: 30 = 2W. Divide by 2: W = 15 feet."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "How many inches are in 2.5 feet?",
      correctAnswer: "30 inches",
      rationale: "There are 12 inches in 1 foot. So, in 2.5 feet, there are 2.5 * 12 = 30 inches."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the area of a trapezoid with bases of 10 cm and 14 cm and a height of 5 cm.",
      answerOptions: [
        { text: "60 cm²", isCorrect: true, rationale: "Area = (1/2) * (base1 + base2) * height = (1/2) * (10 + 14) * 5 = 60." },
        { text: "120 cm²", isCorrect: false, rationale: "This omits the (1/2) from the formula." },
        { text: "29 cm²", isCorrect: false, rationale: "This is the sum of the bases and the height." },
        { text: "70 cm²", isCorrect: false, rationale: "This is the result of multiplying the larger base by the height." }
      ],
      rationale: "The formula for the area of a trapezoid is A = $\\frac{1}{2}(b_1 + b_2)h$. So, A = $\\frac{1}{2}(10 + 14) \\times 5 = \\frac{1}{2}(24) \\times 5 = 12 \\times 5 = 60$ cm²."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A triangle has side lengths of 5, 5, and 7. What type of triangle is it?",
      answerOptions: [
        { text: "Equilateral", isCorrect: false, rationale: "An equilateral triangle has all sides equal." },
        { text: "Isosceles", isCorrect: true, rationale: "An isosceles triangle has at least two equal sides." },
        { text: "Scalene", isCorrect: false, rationale: "A scalene triangle has no equal sides." },
        { text: "Right", isCorrect: false, rationale: "The side lengths do not satisfy the Pythagorean theorem (5²+5² != 7²)." }
      ],
      rationale: "An isosceles triangle is defined as a triangle with at least two sides of equal length. This triangle has two sides of length 5."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "If two angles are supplementary and one angle is 110°, what is the measure of the other angle?",
      answerOptions: [
        { text: "-20°", isCorrect: false, rationale: "Angle measures cannot be negative." },
        { text: "20°", isCorrect: false, rationale: "This is the complement of 70." },
        { text: "70°", isCorrect: true, rationale: "Supplementary angles add up to 180°. So, 180° - 110° = 70°." },
        { text: "250°", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Supplementary angles are two angles whose measures add up to 180°. The other angle is 180° - 110° = 70°."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Geometry & Measurement",
  id: "math_geometry_03",
  title: "Geometry & Measurement: Quiz 3",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "The area of a square is 64 square inches. What is the length of one of its sides?",
      answerOptions: [
        { text: "4 in", isCorrect: false, rationale: "4*4 = 16." },
        { text: "8 in", isCorrect: true, rationale: "The side length is the square root of the area. The square root of 64 is 8." },
        { text: "16 in", isCorrect: false, rationale: "This is 64/4." },
        { text: "32 in", isCorrect: false, rationale: "This is the perimeter of the square." }
      ],
      rationale: "The area of a square is side * side. To find the side length, take the square root of the area: sqrt(64) = 8 inches."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the area of a circle with a radius of 10 cm? Use 3.14 for $\\pi$.",
      correctAnswer: "314 $cm^2$",
      rationale: "Area of a circle is A = pi * $r^2$. So, A = 3.14 * (10 cm)$^2$ = 3.14 * 100 = 314 $cm^2$."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A rectangular swimming pool is 50 meters long, 25 meters wide, and 2 meters deep. What is its volume?",
      answerOptions: [
        { text: "77 $m^3$", isCorrect: false, rationale: "This is the sum of the dimensions." },
        { text: "150 $m^3$", isCorrect: false, rationale: "This is the perimeter." },
        { text: "1250 $m^3$", isCorrect: false, rationale: "This is the surface area of the water." },
        { text: "2500 $m^3$", isCorrect: true, rationale: "Volume = length * width * depth = 50 * 25 * 2 = 2500 $m^3$." }
      ],
      rationale: "The volume of a rectangular prism is length x width x height (or depth). V = 50 m * 25 m * 2 m = 2500 $m^3$."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is the measure of a straight angle?",
      correctAnswer: "180°",
      rationale: "A straight angle is an angle that forms a straight line, and its measure is 180°."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "If two angles of a triangle are 30° and 70°, what kind of triangle is it?",
      answerOptions: [
        { text: "Acute", isCorrect: false, rationale: "An acute triangle has all angles less than 90°. The third angle is 80°, so this is correct, but \'Isosceles\' is a better description." },
        { text: "Obtuse", isCorrect: false, rationale: "An obtuse triangle has one angle greater than 90°." },
        { text: "Right", isCorrect: false, rationale: "A right triangle has one 90° angle." },
        { text: "Isosceles", isCorrect: false, rationale: "An isosceles triangle has two equal angles. The angles are 30, 70, and 80." },
        { text: "Scalene", isCorrect: true, rationale: "The third angle is 180-30-70 = 80. Since all angles are different, all sides are different, making it a scalene triangle." }
      ],
      rationale: "The sum of angles in a triangle is 180°. The third angle is 180° - 30° - 70° = 80°. Since all three angles (30°, 70°, 80°) are different, the triangle is scalene. Since all angles are less than 90°, it is also an acute triangle, but scalene is a more specific classification based on the side lengths implied by the angles."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A cylindrical container has a volume of 314 cubic inches and a height of 4 inches. What is its radius? Use 3.14 for $\\pi$.",
      answerOptions: [
        { text: "5 inches", isCorrect: true, rationale: "Volume = pi * $r^2$ * h. 314 = 3.14 * $r^2$ * 4. 100 = 4$r^2$. 25 = $r^2$. r = 5." },
        { text: "10 inches", isCorrect: false, rationale: "This is the diameter." },
        { text: "25 inches", isCorrect: false, rationale: "This is $r^2$." },
        { text: "78.5 inches", isCorrect: false, rationale: "This is the area of the base." }
      ],
      rationale: "The formula for the volume of a cylinder is V = pi * $r^2$ * h. We have 314 = 3.14 * $r^2$ * 4. Divide by 3.14: 100 = 4$r^2$. Divide by 4: 25 = $r^2$. Take the square root: r = 5 inches."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the perimeter of an equilateral triangle with a side length of 9 cm?",
      correctAnswer: "27 cm",
      rationale: "An equilateral triangle has three equal sides. The perimeter is the sum of the side lengths: 9 cm + 9 cm + 9 cm = 27 cm."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the surface area of a cube with a side length of 5 inches.",
      answerOptions: [
        { text: "25 $in^2$", isCorrect: false, rationale: "This is the area of one face." },
        { text: "100 $in^2$", isCorrect: false, rationale: "This is the area of four faces." },
        { text: "125 $in^3$", isCorrect: false, rationale: "This is the volume of the cube." },
        { text: "150 $in^2$", isCorrect: true, rationale: "A cube has 6 faces. The area of each face is 5*5=25 $in^2$. Total surface area is 6 * 25 = 150 $in^2$." }
      ],
      rationale: "A cube has 6 identical square faces. The area of one face is 5 inches * 5 inches = 25 $in^2$. The total surface area is 6 * 25 $in^2$ = 150 $in^2$."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A ladder leaning against a wall forms a right triangle. If the ladder is 10 feet long and the base is 6 feet from the wall, how high up the wall does the ladder reach?",
      correctAnswer: "8 feet",
      rationale: "Using the Pythagorean theorem, $a^2 + b^2 = c^2$. $a^2 + 6^2 = 10^2$. $a^2 + 36 = 100$. $a^2 = 64$. a = 8 feet."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the name of a polygon with 5 sides?",
      answerOptions: [
        { text: "Hexagon", isCorrect: false, rationale: "A hexagon has 6 sides." },
        { text: "Pentagon", isCorrect: true, rationale: "A pentagon is a 5-sided polygon." },
        { text: "Octagon", isCorrect: false, rationale: "An octagon has 8 sides." },
        { text: "Quadrilateral", isCorrect: false, rationale: "A quadrilateral has 4 sides." }
      ],
      rationale: "A polygon with 5 sides is called a pentagon."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Complementary angles are two angles that add up to:",
      answerOptions: [
        { text: "45°", isCorrect: false, rationale: "This is half of a right angle." },
        { text: "90°", isCorrect: true, rationale: "Complementary angles sum to 90°." },
        { text: "180°", isCorrect: false, rationale: "Supplementary angles sum to 180°." },
        { text: "360°", isCorrect: false, rationale: "This is the sum of angles in a circle." }
      ],
      rationale: "By definition, two angles are complementary if their measures add up to 90 degrees."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A circular pizza has a diameter of 14 inches. What is its area? Use 3.14 for $\\pi$.",
      answerOptions: [
        { text: "43.96 $in^2$", isCorrect: false, rationale: "This is the circumference of the pizza." },
        { text: "153.86 $in^2$", isCorrect: true, rationale: "The radius is 7 inches. Area = pi * $r^2$ = 3.14 * $7^2$ = 153.86." },
        { text: "615.44 $in^2$", isCorrect: false, rationale: "This is the area if the radius was 14 inches." },
        { text: "196 $in^2$", isCorrect: false, rationale: "This is the result of squaring the diameter." }
      ],
      rationale: "The radius is half the diameter, so r = 14 / 2 = 7 inches. The area is A = pi * $r^2$ = 3.14 * (7 inches)$^2$ = 3.14 * 49 = 153.86 $in^2$."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Geometry & Measurement",
  id: "math_geometry_04",
  title: "Geometry & Measurement: Quiz 4",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the perimeter of a rectangle with length 12 ft and width 8 ft?",
      answerOptions: [
        { text: "20 ft", isCorrect: false, rationale: "This is the sum of the length and width." },
        { text: "40 ft", isCorrect: true, rationale: "Perimeter = 2 * (length + width) = 2 * (12 + 8) = 40 ft." },
        { text: "96 ft", isCorrect: false, rationale: "This is the area of the rectangle." },
        { text: "48 ft", isCorrect: false, rationale: "This is 2*12 + 8." }
      ],
      rationale: "The perimeter of a rectangle is calculated as P = 2(l + w). So, P = 2(12 ft + 8 ft) = 2(20 ft) = 40 ft."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "Find the area of a triangle with a base of 15 cm and a height of 10 cm.",
      correctAnswer: "75 cm²",
      rationale: "The area of a triangle is A = 1/2 * b * h. So, A = 1/2 * 15 cm * 10 cm = 75 cm²."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A circle has a diameter of 20 inches. What is its circumference? Use 3.14 for $\\pi$.",
      answerOptions: [
        { text: "31.4 inches", isCorrect: false, rationale: "This would be the circumference for a diameter of 10 inches." },
        { text: "62.8 inches", isCorrect: true, rationale: "Circumference = pi * diameter = 3.14 * 20 = 62.8." },
        { text: "314 inches", isCorrect: false, rationale: "This is the area of the circle." },
        { text: "125.6 inches", isCorrect: false, rationale: "This is double the circumference." }
      ],
      rationale: "The formula for the circumference of a circle is C = pi * d. So, C = 3.14 * 20 inches = 62.8 inches."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "An angle measuring 150° is what type of angle?",
      correctAnswer: "Obtuse",
      rationale: "An obtuse angle is an angle that measures more than 90° but less than 180°."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A right triangle has legs of 5 cm and 12 cm. What is the length of the hypotenuse?",
      answerOptions: [
        { text: "13 cm", isCorrect: true, rationale: "Using the Pythagorean theorem, 5² + 12² = 25 + 144 = 169. The square root of 169 is 13." },
        { text: "17 cm", isCorrect: false, rationale: "This is the sum of the legs." },
        { text: "60 cm", isCorrect: false, rationale: "This is the product of the legs." },
        { text: "119 cm", isCorrect: false, rationale: "This is 12²-5²." }
      ],
      rationale: "According to the Pythagorean theorem, $a^2 + b^2 = c^2$. So, $5^2 + 12^2 = c^2$, which is $25 + 144 = 169$. Thus, c = $\\sqrt{169}$ = 13 cm."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A circular garden has a radius of 12 feet. If you want to put a fence around it, how many feet of fencing will you need? Use 3.14 for $\\pi$.",
      answerOptions: [
        { text: "37.68 feet", isCorrect: false, rationale: "This would be the circumference for a radius of 6 feet." },
        { text: "75.36 feet", isCorrect: true, rationale: "The length of the fencing is the circumference of the circle. C = 2 * pi * r = 2 * 3.14 * 12 = 75.36." },
        { text: "452.16 feet", isCorrect: false, rationale: "This is the area of the garden." },
        { text: "113.04 feet", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "The amount of fencing needed is the circumference of the circle. C = 2 * pi * r = 2 * 3.14 * 12 feet = 75.36 feet."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "How many degrees are in a right angle?",
      correctAnswer: "90°",
      rationale: "A right angle is an angle that measures exactly 90°."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the volume of a cube with a side length of 4 cm?",
      answerOptions: [
        { text: "12 cm³", isCorrect: false, rationale: "This is the sum of three side lengths." },
        { text: "16 cm³", isCorrect: false, rationale: "This is the area of one face." },
        { text: "48 cm²", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "64 cm³", isCorrect: true, rationale: "Volume of a cube is side³. 4³ = 4 * 4 * 4 = 64." }
      ],
      rationale: "The volume of a cube is calculated as V = s³. So, V = (4 cm)³ = 64 cm³."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A room is 12 feet long and 15 feet wide. How many square yards of carpet are needed to cover the floor?",
      correctAnswer: "20 square yards",
      rationale: "First, find the area in square feet: 12 ft * 15 ft = 180 sq ft. There are 9 square feet in 1 square yard. So, 180 sq ft / 9 sq ft/sq yd = 20 square yards."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the name of a triangle with no equal sides?",
      answerOptions: [
        { text: "Equilateral", isCorrect: false, rationale: "An equilateral triangle has all sides equal." },
        { text: "Isosceles", isCorrect: false, rationale: "An isosceles triangle has at least two equal sides." },
        { text: "Scalene", isCorrect: true, rationale: "A scalene triangle has no sides of equal length." },
        { text: "Right", isCorrect: false, rationale: "A right triangle has a right angle." }
      ],
      rationale: "A scalene triangle is a triangle in which all three sides have different lengths."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "If two parallel lines are cut by a transversal, the alternate interior angles are:",
      answerOptions: [
        { text: "Complementary", isCorrect: false, rationale: "They are not necessarily complementary." },
        { text: "Supplementary", isCorrect: false, rationale: "Consecutive interior angles are supplementary." },
        { text: "Congruent", isCorrect: true, rationale: "Alternate interior angles are equal in measure." },
        { text: "Unequal", isCorrect: false, rationale: "They are equal." }
      ],
      rationale: "A key theorem in geometry states that when two parallel lines are intersected by a transversal, the alternate interior angles are congruent (equal)."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "Find the surface area of a rectangular prism with length 6m, width 4m, and height 2m.",
      answerOptions: [
        { text: "48 m²", isCorrect: false, rationale: "This is the volume of the prism." },
        { text: "24 m²", isCorrect: false, rationale: "This is the area of the largest face." },
        { text: "88 m²", isCorrect: true, rationale: "SA = 2(lw + lh + wh) = 2(6*4 + 6*2 + 4*2) = 2(24 + 12 + 8) = 2(44) = 88." },
        { text: "44 m²", isCorrect: false, rationale: "This is half the surface area." }
      ],
      rationale: "The formula for the surface area of a rectangular prism is SA = 2(lw + lh + wh). SA = 2((6)(4) + (6)(2) + (4)(2)) = 2(24 + 12 + 8) = 2(44) = 88 m²."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Geometry & Measurement",
  id: "math_geometry_05",
  title: "Geometry & Measurement: Quiz 5",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the area of a square with a perimeter of 32 cm?",
      answerOptions: [
        { text: "8 $cm^2$", isCorrect: false, rationale: "This is the side length." },
        { text: "32 $cm^2$", isCorrect: false, rationale: "This is the perimeter." },
        { text: "64 $cm^2$", isCorrect: true, rationale: "The side length is 32/4 = 8 cm. The area is 8*8 = 64 $cm^2$." },
        { text: "256 $cm^2$", isCorrect: false, rationale: "This is 32 * 8." }
      ],
      rationale: "First, find the length of one side by dividing the perimeter by 4: 32 cm / 4 = 8 cm. Then, find the area by squaring the side length: 8 cm * 8 cm = 64 $cm^2$."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "Find the circumference of a circle with a radius of 4.5 inches. Use 3.14 for $\\pi$.",
      correctAnswer: "28.26 inches",
      rationale: "Circumference C = 2 * pi * r. So, C = 2 * 3.14 * 4.5 inches = 28.26 inches."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A right triangle has a leg of 10m and a hypotenuse of 26m. What is the length of the other leg?",
      answerOptions: [
        { text: "16 m", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "24 m", isCorrect: true, rationale: "Using Pythagorean theorem, $a^2 + 10^2 = 26^2$. $a^2 + 100 = 676$. $a^2 = 576$. a = 24." },
        { text: "36 m", isCorrect: false, rationale: "This is the sum of the sides." },
        { text: "576 m", isCorrect: false, rationale: "This is $a^2$, not a." }
      ],
      rationale: "Using the Pythagorean theorem, $a^2 + b^2 = c^2$. We have $a^2 + 10^2 = 26^2$, so $a^2 + 100 = 676$. Subtract 100 from both sides: $a^2 = 576$. The square root of 576 is 24."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "How many sides does a hexagon have?",
      correctAnswer: "6",
      rationale: "A hexagon is a polygon with six sides."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "The sum of the interior angles of any triangle is:",
      answerOptions: [
        { text: "90°", isCorrect: false, rationale: "This is the measure of a right angle." },
        { text: "180°", isCorrect: true, rationale: "The sum of the three interior angles of any triangle is always 180°." },
        { text: "270°", isCorrect: false, rationale: "This is three right angles." },
        { text: "360°", isCorrect: false, rationale: "This is the sum of angles in a quadrilateral or circle." }
      ],
      rationale: "A fundamental theorem of geometry states that the sum of the measures of the interior angles of a triangle is always 180 degrees."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "What is the volume of a cylinder with a diameter of 10 ft and a height of 8 ft? Use 3.14 for $\\pi$.",
      answerOptions: [
        { text: "251.2 $ft^3$", isCorrect: false, rationale: "This is the volume if the radius was 10." },
        { text: "628 $ft^3$", isCorrect: true, rationale: "The radius is 5 ft. Volume = pi * $r^2$ * h = 3.14 * $5^2$ * 8 = 628." },
        { text: "1256 $ft^3$", isCorrect: false, rationale: "This is double the volume." },
        { text: "2512 $ft^3$", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "First, find the radius from the diameter: r = 10 ft / 2 = 5 ft. The formula for the volume of a cylinder is V = pi * $r^2$ * h. So, V = 3.14 * (5 ft)$^2$ * 8 ft = 3.14 * 25 * 8 = 628 $ft^3$."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "How many milliliters are in 3.5 liters?",
      correctAnswer: "3500 ml",
      rationale: "There are 1000 milliliters in 1 liter. So, 3.5 liters * 1000 ml/liter = 3500 ml."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "An isosceles triangle has two angles that measure 50° each. What is the measure of the third angle?",
      answerOptions: [
        { text: "50°", isCorrect: false, rationale: "This would make it an equilateral triangle." },
        { text: "80°", isCorrect: true, rationale: "The sum of angles is 180°. 180 - 50 - 50 = 80°." },
        { text: "100°", isCorrect: false, rationale: "This is the sum of the two given angles." },
        { text: "130°", isCorrect: false, rationale: "This is 180-50." }
      ],
      rationale: "The sum of the angles in a triangle is 180°. The two given angles sum to 50° + 50° = 100°. The third angle is 180° - 100° = 80°."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A circular pool has an area of 200.96 square feet. What is its diameter? Use 3.14 for $\\pi$.",
      correctAnswer: "16 feet",
      rationale: "Area = pi * $r^2$. 200.96 = 3.14 * $r^2$. $r^2$ = 200.96 / 3.14 = 64. r = 8. The diameter is 2 * r = 16 feet."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the most specific name for a quadrilateral with four right angles and four equal sides?",
      answerOptions: [
        { text: "Rectangle", isCorrect: false, rationale: "A rectangle has four right angles but not necessarily equal sides." },
        { text: "Rhombus", isCorrect: false, rationale: "A rhombus has four equal sides but not necessarily right angles." },
        { text: "Square", isCorrect: true, rationale: "A square has both four right angles and four equal sides." },
        { text: "Parallelogram", isCorrect: false, rationale: "A parallelogram has opposite sides parallel." }
      ],
      rationale: "A square is a quadrilateral that is both a rectangle (four right angles) and a rhombus (four equal sides)."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "If two angles are vertical angles, they are always:",
      answerOptions: [
        { text: "Supplementary", isCorrect: false, rationale: "Adjacent angles on a straight line are supplementary." },
        { text: "Complementary", isCorrect: false, rationale: "Two angles that sum to 90° are complementary." },
        { text: "Congruent", isCorrect: true, rationale: "Vertical angles, formed by intersecting lines, are always equal in measure." },
        { text: "Adjacent", isCorrect: false, rationale: "Vertical angles are opposite, not adjacent." }
      ],
      rationale: "Vertical angles are the angles opposite each other when two lines cross. They are always congruent (equal)."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A box in the shape of a rectangular prism has a length of 20cm, a width of 10cm, and a height of 5cm. What is its surface area?",
      answerOptions: [
        { text: "1000 $cm^2$", isCorrect: false, rationale: "This is the volume of the box." },
        { text: "700 $cm^2$", isCorrect: true, rationale: "SA = 2(20*10 + 20*5 + 10*5) = 2(200 + 100 + 50) = 2(350) = 700." },
        { text: "350 $cm^2$", isCorrect: false, rationale: "This is half of the surface area." },
        { text: "250 $cm^2$", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "The surface area of a rectangular prism is given by the formula SA = 2(lw + lh + wh). SA = 2((20)(10) + (20)(5) + (10)(5)) = 2(200 + 100 + 50) = 2(350) = 700 $cm^2$."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Geometry & Measurement",
  id: "math_geometry_06",
  title: "Geometry & Measurement: Quiz 6",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the perimeter of a regular pentagon with a side length of 10 inches?",
      answerOptions: [
        { text: "30 in", isCorrect: false, rationale: "This would be for a triangle." },
        { text: "40 in", isCorrect: false, rationale: "This would be for a square." },
        { text: "50 in", isCorrect: true, rationale: "A regular pentagon has 5 equal sides. The perimeter is 5 * 10 = 50 inches." },
        { text: "60 in", isCorrect: false, rationale: "This would be for a hexagon." }
      ],
      rationale: "A regular pentagon has 5 equal sides. The perimeter is the side length multiplied by the number of sides: 10 inches * 5 = 50 inches."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A circle has a radius of 9 cm. What is its area? Use 3.14 for $\\pi$.",
      correctAnswer: "254.34 $cm^2$",
      rationale: "Area = pi * $r^2$. A = 3.14 * (9 cm)$^2$ = 3.14 * 81 = 254.34 $cm^2$."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A rectangular box is 8 inches long, 5 inches wide, and 3 inches high. What is its volume?",
      answerOptions: [
        { text: "16 $in^3$", isCorrect: false, rationale: "This is the sum of the dimensions." },
        { text: "120 $in^3$", isCorrect: true, rationale: "Volume = length * width * height = 8 * 5 * 3 = 120." },
        { text: "158 $in^2$", isCorrect: false, rationale: "This is the surface area." },
        { text: "40 $in^3$", isCorrect: false, rationale: "This is just length * width." }
      ],
      rationale: "The volume of a rectangular prism (box) is found by multiplying its length, width, and height. V = 8 in * 5 in * 3 in = 120 $in^3$."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "An angle measuring exactly 90° is called what?",
      correctAnswer: "Right angle",
      rationale: "A right angle is an angle that measures exactly 90°."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A triangle has side lengths of 8, 15, and 17. Is it a right triangle?",
      answerOptions: [
        { text: "Yes, because 8 + 15 > 17.", isCorrect: false, rationale: "The triangle inequality theorem confirms it\'s a triangle, but not if it\'s a right triangle." },
        { text: "Yes, because $8^2 + 15^2 = 17^2$.", isCorrect: true, rationale: "The sides satisfy the Pythagorean theorem: 64 + 225 = 289." },
        { text: "No, because the sides are all different lengths.", isCorrect: false, rationale: "This makes it scalene, but doesn\'t rule out a right triangle." },
        { text: "No, because 8 + 15 is not equal to 17.", isCorrect: false, rationale: "This is an incorrect application of the Pythagorean theorem." }
      ],
      rationale: "To determine if a triangle is a right triangle, we check if its side lengths satisfy the Pythagorean theorem ($a^2 + b^2 = c^2$). $8^2 + 15^2 = 64 + 225 = 289$. And $17^2 = 289$. Since they are equal, it is a right triangle."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A globe has a diameter of 16 inches. What is its surface area? Use 3.14 for $\\pi$ and the formula SA = $4\\pi r^2$.",
      answerOptions: [
        { text: "200.96 $in^2$", isCorrect: false, rationale: "This would be the surface area for a radius of 4 inches." },
        { text: "803.84 $in^2$", isCorrect: true, rationale: "The radius is 8 inches. SA = 4 * 3.14 * $8^2$ = 803.84." },
        { text: "2143.57 $in^3$", isCorrect: false, rationale: "This is the volume of the globe." },
        { text: "3215.36 $in^2$", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "The radius is half the diameter, so r = 16 / 2 = 8 inches. The surface area of a sphere is SA = 4 * pi * $r^2$. SA = 4 * 3.14 * (8 inches)$^2$ = 4 * 3.14 * 64 = 803.84 $in^2$."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "If two angles in a triangle are 45° and 90°, what is the third angle?",
      correctAnswer: "45°",
      rationale: "The sum of the angles in a triangle is 180°. So, the third angle is 180° - 90° - 45° = 45°."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the area of a trapezoid with bases 12 and 8, and height 6?",
      answerOptions: [
        { text: "26", isCorrect: false, rationale: "This is the sum of the dimensions." },
        { text: "60", isCorrect: true, rationale: "Area = (1/2) * (12 + 8) * 6 = (1/2) * 20 * 6 = 60." },
        { text: "120", isCorrect: false, rationale: "This omits the 1/2 from the formula." },
        { text: "576", isCorrect: false, rationale: "This is 12*8*6." }
      ],
      rationale: "The formula for the area of a trapezoid is A = $\\frac{1}{2}(b_1 + b_2)h$. A = $\\frac{1}{2}(12 + 8) \\times 6 = \\frac{1}{2}(20) \\times 6 = 10 \\times 6 = 60$."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A rectangular field is 100 yards long and 50 yards wide. What is the length of the diagonal in yards?",
      correctAnswer: "111.8 yards",
      rationale: "The diagonal forms the hypotenuse of a right triangle. Using the Pythagorean theorem: d² = 100² + 50² = 10000 + 2500 = 12500. d = sqrt(12500) ≈ 111.8 yards."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the sum of the interior angles of a hexagon?",
      answerOptions: [
        { text: "360°", isCorrect: false, rationale: "This is for a quadrilateral." },
        { text: "540°", isCorrect: false, rationale: "This is for a pentagon." },
        { text: "720°", isCorrect: true, rationale: "The formula is (n-2) * 180°. For a hexagon, n=6. (6-2)*180 = 4*180 = 720°." },
        { text: "1080°", isCorrect: false, rationale: "This is for an octagon." }
      ],
      rationale: "The sum of the interior angles of a polygon is given by the formula (n-2) * 180°, where n is the number of sides. For a hexagon, n=6, so the sum is (6-2) * 180° = 720°."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A straight line is drawn through the center of a circle. This line is called the:",
      answerOptions: [
        { text: "Radius", isCorrect: false, rationale: "The radius is the distance from the center to the edge." },
        { text: "Diameter", isCorrect: true, rationale: "The diameter is a chord that passes through the center of a circle." },
        { text: "Chord", isCorrect: false, rationale: "A chord is a line segment connecting two points on a circle. The diameter is a special type of chord." },
        { text: "Tangent", isCorrect: false, rationale: "A tangent is a line that touches the circle at only one point." }
      ],
      rationale: "The diameter of a circle is any straight line segment that passes through the center of the circle and whose endpoints lie on the circle."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A cone has a radius of 6 cm and a height of 10 cm. What is its volume? Use 3.14 for $\\pi$ and the formula V = $\\frac{1}{3}\\pi r^2 h$.",
      answerOptions: [
        { text: "188.4 $cm^3$", isCorrect: false, rationale: "This is the lateral surface area." },
        { text: "376.8 $cm^3$", isCorrect: true, rationale: "V = (1/3) * 3.14 * $6^2$ * 10 = (1/3) * 3.14 * 36 * 10 = 376.8." },
        { text: "1130.4 $cm^3$", isCorrect: false, rationale: "This is the volume of a cylinder with the same dimensions." },
        { text: "1884 $cm^3$", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Using the formula for the volume of a cone, V = (1/3) * pi * $r^2$ * h. V = (1/3) * 3.14 * (6 cm)$^2$ * 10 cm = (1/3) * 3.14 * 36 * 10 = 376.8 $cm^3$."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Geometry & Measurement",
  id: "math_geometry_07",
  title: "Geometry & Measurement: Quiz 7",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the area of a triangle with a base of 6 and a height of 8?",
      answerOptions: [
        { text: "14", isCorrect: false, rationale: "This is the sum of the base and height." },
        { text: "24", isCorrect: true, rationale: "Area = (1/2) * base * height = (1/2) * 6 * 8 = 24." },
        { text: "28", isCorrect: false, rationale: "This is the perimeter." },
        { text: "48", isCorrect: false, rationale: "This is base * height, without multiplying by 1/2." }
      ],
      rationale: "The area of a triangle is given by the formula A = 1/2 * b * h. So, A = 1/2 * 6 * 8 = 24."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the circumference of a circle with a diameter of 15 cm? Use 3.14 for $\\pi$.",
      correctAnswer: "47.1 cm",
      rationale: "Circumference = pi * diameter. C = 3.14 * 15 cm = 47.1 cm."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the volume of a rectangular prism with dimensions 2, 5, and 12.",
      answerOptions: [
        { text: "19", isCorrect: false, rationale: "This is the sum of the dimensions." },
        { text: "120", isCorrect: true, rationale: "Volume = 2 * 5 * 12 = 120." },
        { text: "158", isCorrect: false, rationale: "This is the surface area." },
        { text: "60", isCorrect: false, rationale: "This is 5*12." }
      ],
      rationale: "The volume of a rectangular prism is found by multiplying its three dimensions: length, width, and height. V = 2 * 5 * 12 = 120."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "How many inches are in one foot?",
      correctAnswer: "12",
      rationale: "There are 12 inches in a standard foot."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A square has an area of 49 square units. What is its perimeter?",
      answerOptions: [
        { text: "7 units", isCorrect: false, rationale: "This is the side length." },
        { text: "28 units", isCorrect: true, rationale: "The side length is sqrt(49) = 7. The perimeter is 4 * 7 = 28." },
        { text: "49 units", isCorrect: false, rationale: "This is the area." },
        { text: "196 units", isCorrect: false, rationale: "This is 49*4." }
      ],
      rationale: "First, find the side length of the square by taking the square root of the area: sqrt(49) = 7 units. Then, calculate the perimeter by multiplying the side length by 4: 7 units * 4 = 28 units."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A right circular cone has a height of 12 cm and a radius of 5 cm. What is its volume? Use 3.14 for $\\pi$ and V = $\\frac{1}{3}\\pi r^2 h$.",
      answerOptions: [
        { text: "314 cm³", isCorrect: true, rationale: "V = (1/3) * 3.14 * 5² * 12 = 314." },
        { text: "942 cm³", isCorrect: false, rationale: "This is the volume of a cylinder with the same dimensions." },
        { text: "188.4 cm³", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "1570 cm³", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Using the formula for the volume of a cone, V = (1/3) * pi * r² * h. V = (1/3) * 3.14 * (5 cm)² * 12 cm = (1/3) * 3.14 * 25 * 12 = 314 cm³."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the measure of each angle in an equilateral triangle?",
      correctAnswer: "60°",
      rationale: "An equilateral triangle has three equal angles. The sum of the angles is 180°, so each angle is 180° / 3 = 60°."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the hypotenuse of a right triangle with legs of length 7 and 24.",
      answerOptions: [
        { text: "25", isCorrect: true, rationale: "7² + 24² = 49 + 576 = 625. sqrt(625) = 25." },
        { text: "31", isCorrect: false, rationale: "This is the sum of the legs." },
        { text: "17", isCorrect: false, rationale: "This is 24-7." },
        { text: "168", isCorrect: false, rationale: "This is 7*24." }
      ],
      rationale: "Using the Pythagorean theorem ($a^2 + b^2 = c^2$), we have $7^2 + 24^2 = c^2$. This becomes $49 + 576 = 625$. So, $c = \\sqrt{625} = 25$."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A rectangular room is 5 yards long and 4 yards wide. What is its area in square feet?",
      correctAnswer: "180 square feet",
      rationale: "First convert yards to feet. 5 yards = 15 feet, 4 yards = 12 feet. The area is 15 ft * 12 ft = 180 sq ft."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the name for a quadrilateral that has exactly one pair of parallel sides?",
      answerOptions: [
        { text: "Parallelogram", isCorrect: false, rationale: "A parallelogram has two pairs of parallel sides." },
        { text: "Trapezoid", isCorrect: true, rationale: "A trapezoid is defined as a quadrilateral with at least one pair of parallel sides." },
        { text: "Rhombus", isCorrect: false, rationale: "A rhombus has two pairs of parallel sides." },
        { text: "Kite", isCorrect: false, rationale: "A kite does not necessarily have parallel sides." }
      ],
      rationale: "A trapezoid is a quadrilateral with exactly one pair of parallel sides. (Note: some definitions allow for \'at least\' one pair)."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "If an angle is 30°, what is its complementary angle?",
      answerOptions: [
        { text: "60°", isCorrect: true, rationale: "Complementary angles add to 90°. 90 - 30 = 60." },
        { text: "150°", isCorrect: false, rationale: "This is the supplementary angle." },
        { text: "30°", isCorrect: false, rationale: "This is the original angle." },
        { text: "90°", isCorrect: false, rationale: "This is the sum of the two angles." }
      ],
      rationale: "Complementary angles are two angles that sum to 90°. The complement of a 30° angle is 90° - 30° = 60°."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A circular track has a circumference of 400 meters. What is its radius, to the nearest meter? Use 3.14 for $\\pi$.",
      answerOptions: [
        { text: "64 meters", isCorrect: true, rationale: "C = 2 * pi * r. 400 = 2 * 3.14 * r. 400 = 6.28 * r. r = 400/6.28 ≈ 63.69, which is 64 to the nearest meter." },
        { text: "127 meters", isCorrect: false, rationale: "This is the diameter." },
        { text: "200 meters", isCorrect: false, rationale: "This is 400/2." },
        { text: "12739 meters", isCorrect: false, rationale: "This is the area." }
      ],
      rationale: "The formula for circumference is C = 2 * pi * r. We have 400 = 2 * 3.14 * r. First, divide by (2 * 3.14): r = 400 / 6.28 ≈ 63.69 meters. To the nearest meter, this is 64 meters."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Geometry & Measurement",
  id: "math_geometry_08",
  title: "Geometry & Measurement: Quiz 8",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the perimeter of a square if one side is 10cm?",
      answerOptions: [
        { text: "10 cm", isCorrect: false, rationale: "This is the length of one side." },
        { text: "20 cm", isCorrect: false, rationale: "This is the sum of two sides." },
        { text: "40 cm", isCorrect: true, rationale: "Perimeter = 4 * side = 4 * 10 = 40." },
        { text: "100 cm", isCorrect: false, rationale: "This is the area." }
      ],
      rationale: "A square has four equal sides, so its perimeter is 4 times the length of one side. P = 4 * 10 cm = 40 cm."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "Find the area of a circle with a diameter of 12 inches. Use 3.14 for $\\pi$.",
      correctAnswer: "113.04 $in^2$",
      rationale: "The radius is half the diameter, so r = 6 inches. Area = pi * $r^2$ = 3.14 * $6^2$ = 113.04 $in^2$."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the volume of a sphere with a radius of 5 cm? Use 3.14 for $\\pi$ and the formula V = $\\frac{4}{3}\\pi r^3$.",
      answerOptions: [
        { text: "314 $cm^2$", isCorrect: false, rationale: "This is the surface area." },
        { text: "523.33 $cm^3$", isCorrect: true, rationale: "V = (4/3) * 3.14 * $5^3$ = 523.33." },
        { text: "1256 $cm^3$", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "1570 $cm^3$", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Using the formula, V = (4/3) * pi * $r^3$. V = (4/3) * 3.14 * (5 cm)$^3$ = (4/3) * 3.14 * 125 ≈ 523.33 $cm^3$."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "How many grams are in a kilogram?",
      correctAnswer: "1000",
      rationale: "The prefix \'kilo-\' means 1000. There are 1000 grams in a kilogram."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "If a right angle is divided into two smaller angles and one of them is 35°, what is the measure of the other angle?",
      answerOptions: [
        { text: "35°", isCorrect: false, rationale: "This is the measure of the given angle." },
        { text: "55°", isCorrect: true, rationale: "The two angles are complementary (add up to 90°). 90 - 35 = 55." },
        { text: "145°", isCorrect: false, rationale: "This would be the supplementary angle." },
        { text: "90°", isCorrect: false, rationale: "This is the measure of the original right angle." }
      ],
      rationale: "A right angle measures 90°. If it\'s divided into two angles, those angles are complementary. The other angle is 90° - 35° = 55°."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A rectangular garden measures 25 feet by 40 feet. What is the length of the diagonal path that cuts across it?",
      answerOptions: [
        { text: "47.17 feet", isCorrect: true, rationale: "Using the Pythagorean theorem, $d^2 = 25^2 + 40^2$ = 625 + 1600 = 2225. d = sqrt(2225) ≈ 47.17." },
        { text: "65 feet", isCorrect: false, rationale: "This is the sum of the sides." },
        { text: "130 feet", isCorrect: false, rationale: "This is the perimeter." },
        { text: "1000 feet", isCorrect: false, rationale: "This is the area." }
      ],
      rationale: "The diagonal of a rectangle forms the hypotenuse of a right triangle with the length and width as its legs. Using the Pythagorean theorem: $d^2 = 25^2 + 40^2$ = 625 + 1600 = 2225. d = $\\sqrt{2225}$ ≈ 47.17 feet."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the name for a polygon with eight sides?",
      correctAnswer: "Octagon",
      rationale: "An octagon is a polygon with eight sides."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the perimeter of a shape with sides of length 5, 7, 8, and 10.",
      answerOptions: [
        { text: "20", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "30", isCorrect: true, rationale: "The perimeter is the sum of the lengths of all sides: 5 + 7 + 8 + 10 = 30." },
        { text: "2800", isCorrect: false, rationale: "This is the product of the side lengths." },
        { text: "Cannot be determined", isCorrect: false, rationale: "The perimeter can be determined." }
      ],
      rationale: "The perimeter is the total distance around the shape, which is found by adding the lengths of all its sides. Perimeter = 5 + 7 + 8 + 10 = 30."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A car\'s wheel has a diameter of 24 inches. How many feet does the car travel in one full rotation of the wheel? Use 3.14 for $\\pi$.",
      correctAnswer: "6.28 feet",
      rationale: "The distance of one rotation is the circumference. C = pi * d = 3.14 * 24 = 75.36 inches. To convert to feet, divide by 12: 75.36 / 12 = 6.28 feet."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of the following describes parallel lines?",
      answerOptions: [
        { text: "Lines that intersect at a 90° angle.", isCorrect: false, rationale: "These are perpendicular lines." },
        { text: "Lines that never intersect and are in the same plane.", isCorrect: true, rationale: "This is the definition of parallel lines." },
        { text: "Lines that intersect at any angle.", isCorrect: false, rationale: "These are simply intersecting lines." },
        { text: "Lines that are in different planes.", isCorrect: false, rationale: "These are skew lines." }
      ],
      rationale: "Parallel lines are two or more lines in the same plane that are always the same distance apart and never intersect."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "An angle is 110°. What is its supplementary angle?",
      answerOptions: [
        { text: "-20°", isCorrect: false, rationale: "Angles cannot be negative." },
        { text: "20°", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "70°", isCorrect: true, rationale: "Supplementary angles add up to 180°. 180 - 110 = 70." },
        { text: "250°", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Supplementary angles are two angles that sum to 180°. The supplement of a 110° angle is 180° - 110° = 70°."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A triangular prism has a base that is a right triangle with legs of 6 and 8. The height of the prism is 10. What is the volume?",
      answerOptions: [
        { text: "120", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "240", isCorrect: true, rationale: "Area of the triangular base = (1/2)*6*8 = 24. Volume of the prism = base area * height = 24 * 10 = 240." },
        { text: "480", isCorrect: false, rationale: "This is the volume if the base was a rectangle." },
        { text: "280", isCorrect: false, rationale: "This is the surface area of the two bases plus the area of one rectangular face." }
      ],
      rationale: "First, find the area of the triangular base: A = 1/2 * base * height = 1/2 * 6 * 8 = 24. Then, multiply the base area by the height of the prism to find the volume: V = 24 * 10 = 240."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Geometry & Measurement",
  id: "math_geometry_09",
  title: "Geometry & Measurement: Quiz 9",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the area of a rectangle with a width of 6 inches and a length of 9 inches?",
      answerOptions: [
        { text: "15 in²", isCorrect: false, rationale: "This is the sum of the sides." },
        { text: "30 in²", isCorrect: false, rationale: "This is the perimeter." },
        { text: "54 in²", isCorrect: true, rationale: "Area = 6 * 9 = 54." },
        { text: "81 in²", isCorrect: false, rationale: "This is 9*9." }
      ],
      rationale: "The area of a rectangle is calculated by multiplying its length and width. Area = 9 inches * 6 inches = 54 in²."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A circle has a radius of 20 meters. What is its circumference? Use 3.14 for $\\pi$.",
      correctAnswer: "125.6 meters",
      rationale: "Circumference = 2 * pi * r. C = 2 * 3.14 * 20 meters = 125.6 meters."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the volume of a cylinder with radius 4 and height 10. Use 3.14 for $\\pi$.",
      answerOptions: [
        { text: "125.6", isCorrect: false, rationale: "This is the volume if r=2, h=10." },
        { text: "502.4", isCorrect: true, rationale: "Volume = pi * $r^2$ * h = 3.14 * $4^2$ * 10 = 502.4." },
        { text: "1256", isCorrect: false, rationale: "This is the volume if r=10, h=4." },
        { text: "400", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "The formula for the volume of a cylinder is V = pi * $r^2$ * h. V = 3.14 * (4)$^2$ * 10 = 3.14 * 16 * 10 = 502.4."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "How many centimeters are in a meter?",
      correctAnswer: "100",
      rationale: "The prefix \'centi-\' means one-hundredth. There are 100 centimeters in a meter."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A triangle has angles measuring 100°, 40°, and 40°. What type of triangle is it?",
      answerOptions: [
        { text: "Acute", isCorrect: false, rationale: "An acute triangle must have all angles less than 90°." },
        { text: "Obtuse Isosceles", isCorrect: true, rationale: "It has one obtuse angle (100°) and two equal angles/sides." },
        { text: "Right", isCorrect: false, rationale: "It does not have a 90° angle." },
        { text: "Equilateral", isCorrect: false, rationale: "An equilateral triangle has all angles equal to 60°." }
      ],
      rationale: "The triangle has one angle greater than 90° (100°), making it obtuse. It also has two equal angles (40°), which means the sides opposite those angles are equal, making it isosceles."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A cube has a surface area of 24 square feet. What is its volume?",
      answerOptions: [
        { text: "4 $ft^3$", isCorrect: false, rationale: "This is the area of one face." },
        { text: "8 $ft^3$", isCorrect: true, rationale: "Surface area is 6$s^2$. 24=6$s^2$, so $s^2$=4 and s=2. Volume = $s^3$ = $2^3$ = 8." },
        { text: "16 $ft^3$", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "64 $ft^3$", isCorrect: false, rationale: "This is the volume if s=4." }
      ],
      rationale: "The surface area of a cube is 6$s^2$, where s is the side length. 24 = 6$s^2$, so $s^2$ = 4, and s = 2 feet. The volume is $s^3$, so V = $2^3$ = 8 cubic feet."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the perimeter of a rectangle if its length is 15 and its width is 10?",
      correctAnswer: "50",
      rationale: "Perimeter = 2 * (length + width) = 2 * (15 + 10) = 2 * 25 = 50."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the length of a leg of a right triangle if the other leg is 9 and the hypotenuse is 41.",
      answerOptions: [
        { text: "32", isCorrect: false, rationale: "This is 41-9." },
        { text: "40", isCorrect: true, rationale: "$a^2 + 9^2 = 41^2$. $a^2 + 81 = 1681$. $a^2 = 1600$. a = 40." },
        { text: "50", isCorrect: false, rationale: "This is 41+9." },
        { text: "1600", isCorrect: false, rationale: "This is $a^2$." }
      ],
      rationale: "Using the Pythagorean theorem ($a^2 + b^2 = c^2$), we have $a^2 + 9^2 = 41^2$. $a^2 + 81 = 1681$. $a^2 = 1681 - 81 = 1600$. So, $a = \\sqrt{1600} = 40$."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A wheel has a radius of 1.5 feet. How many full rotations does it make in 1 mile (5280 feet)? Use 3.14 for $\\pi$.",
      correctAnswer: "560 rotations",
      rationale: "The circumference of the wheel is C = 2 * 3.14 * 1.5 = 9.42 feet. The number of rotations is the total distance divided by the circumference: 5280 / 9.42 ≈ 560.5. The number of full rotations is 560."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the sum of the interior angles of a pentagon?",
      answerOptions: [
        { text: "360°", isCorrect: false, rationale: "This is for a quadrilateral." },
        { text: "540°", isCorrect: true, rationale: "The formula is (n-2) * 180°. For a pentagon, n=5. (5-2)*180 = 3*180 = 540°." },
        { text: "720°", isCorrect: false, rationale: "This is for a hexagon." },
        { text: "900°", isCorrect: false, rationale: "This is for a heptagon." }
      ],
      rationale: "The sum of the interior angles of a polygon is given by the formula (n-2) * 180°, where n is the number of sides. For a pentagon, n=5, so the sum is (5-2) * 180° = 540°."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A line segment from the center of a circle to its perimeter is called a:",
      answerOptions: [
        { text: "Radius", isCorrect: true, rationale: "This is the definition of a radius." },
        { text: "Diameter", isCorrect: false, rationale: "A diameter passes through the center and touches two points on the perimeter." },
        { text: "Chord", isCorrect: false, rationale: "A chord connects two points on the perimeter." },
        { text: "Arc", isCorrect: false, rationale: "An arc is a portion of the perimeter." }
      ],
      rationale: "The radius of a circle is any of the line segments from its center to its perimeter."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "What is the area of a regular hexagon with a side length of 6? Use the formula A = $\\frac{3\\sqrt{3}}{2}s^2$.",
      answerOptions: [
        { text: "54", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "93.53", isCorrect: true, rationale: "A = (3 * sqrt(3) / 2) * $6^2$ ≈ 93.53." },
        { text: "108", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "127.28", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Using the formula, A = $\\frac{3\\sqrt{3}}{2}s^2$. A = $\\frac{3\\sqrt{3}}{2}(6)$^2$ = \\frac{3\\sqrt{3}}{2}(36) = 54\\sqrt{3} \\approx 93.53$."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Geometry & Measurement",
  id: "math_geometry_10",
  title: "Geometry & Measurement: Quiz 10",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the area of a square with a side length of 9 meters?",
      answerOptions: [
        { text: "18 $m^2$", isCorrect: false, rationale: "This is the sum of two sides." },
        { text: "36 $m^2$", isCorrect: false, rationale: "This is the perimeter." },
        { text: "81 $m^2$", isCorrect: true, rationale: "Area = 9 * 9 = 81." },
        { text: "90 $m^2$", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "The area of a square is the side length multiplied by itself. Area = 9 m * 9 m = 81 $m^2$."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A circle has a circumference of 31.4 inches. What is its radius? Use 3.14 for $\\pi$.",
      correctAnswer: "5 inches",
      rationale: "C = 2 * pi * r. 31.4 = 2 * 3.14 * r. 31.4 = 6.28 * r. r = 31.4 / 6.28 = 5."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A rectangular prism has a volume of 300 cubic feet. If its length is 10 feet and its width is 5 feet, what is its height?",
      answerOptions: [
        { text: "6 feet", isCorrect: true, rationale: "Volume = L*W*H. 300 = 10 * 5 * H. 300 = 50 * H. H = 6." },
        { text: "10 feet", isCorrect: false, rationale: "This is the length." },
        { text: "15 feet", isCorrect: false, rationale: "This is L+W." },
        { text: "30 feet", isCorrect: false, rationale: "This is 300/10." }
      ],
      rationale: "The volume of a rectangular prism is V = L * W * H. We have 300 = 10 * 5 * H. 300 = 50H. Divide by 50 to find H = 6 feet."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A triangle has angles of 20° and 80°. What is the third angle?",
      correctAnswer: "80°",
      rationale: "The sum of the angles in a triangle is 180°. 180 - 20 - 80 = 80°."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the specific name of a triangle with two equal sides?",
      answerOptions: [
        { text: "Equilateral", isCorrect: false, rationale: "An equilateral triangle has three equal sides." },
        { text: "Isosceles", isCorrect: true, rationale: "An isosceles triangle has at least two equal sides." },
        { text: "Scalene", isCorrect: false, rationale: "A scalene triangle has no equal sides." },
        { text: "Right", isCorrect: false, rationale: "A right triangle has a right angle." }
      ],
      rationale: "An isosceles triangle is defined as a triangle with at least two sides of equal length."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A wheel has a radius of 1 foot. How many feet does it travel in 10 rotations? Use 3.14 for $\\pi$.",
      answerOptions: [
        { text: "31.4 feet", isCorrect: false, rationale: "This is the distance for 5 rotations." },
        { text: "62.8 feet", isCorrect: true, rationale: "The circumference is 2 * 3.14 * 1 = 6.28 feet. For 10 rotations, the distance is 6.28 * 10 = 62.8 feet." },
        { text: "10 feet", isCorrect: false, rationale: "This is the number of rotations." },
        { text: "20 feet", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "First, find the distance of one rotation, which is the circumference: C = 2 * pi * r = 2 * 3.14 * 1 foot = 6.28 feet. Then, multiply by the number of rotations: 6.28 feet/rotation * 10 rotations = 62.8 feet."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Find the perimeter of a regular octagon with a side length of 5 cm.",
      correctAnswer: "40 cm",
      rationale: "A regular octagon has 8 equal sides. The perimeter is 8 * 5 cm = 40 cm."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A right triangle has legs of 12 and 16. What is the length of the hypotenuse?",
      answerOptions: [
        { text: "20", isCorrect: true, rationale: "12² + 16² = 144 + 256 = 400. sqrt(400) = 20." },
        { text: "28", isCorrect: false, rationale: "This is the sum of the legs." },
        { text: "4", isCorrect: false, rationale: "This is the difference of the legs." },
        { text: "192", isCorrect: false, rationale: "This is the product of the legs." }
      ],
      rationale: "Using the Pythagorean theorem ($a^2 + b^2 = c^2$), we have $12^2 + 16^2 = c^2$. This becomes $144 + 256 = 400$. So, $c = \\sqrt{400} = 20$."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A cylindrical tank is 10 feet tall and has a radius of 3 feet. What is its volume? Use 3.14 for $\\pi$.",
      correctAnswer: "282.6 cubic feet",
      rationale: "Volume = pi * r² * h = 3.14 * 3² * 10 = 282.6."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A quadrilateral with all four sides equal in length is a:",
      answerOptions: [
        { text: "Rectangle", isCorrect: false, rationale: "A rectangle must have four right angles, but not necessarily equal sides." },
        { text: "Rhombus", isCorrect: true, rationale: "A rhombus is defined as a quadrilateral with all four sides of equal length." },
        { text: "Trapezoid", isCorrect: false, rationale: "A trapezoid has only one pair of parallel sides." },
        { text: "Parallelogram", isCorrect: false, rationale: "A parallelogram has opposite sides equal, but not necessarily all four." }
      ],
      rationale: "A rhombus is a quadrilateral where all four sides are of equal length. A square is a special type of rhombus."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "If two parallel lines are cut by a transversal, then the corresponding angles are:",
      answerOptions: [
        { text: "Congruent", isCorrect: true, rationale: "Corresponding angles are in the same position at each intersection and are equal." },
        { text: "Supplementary", isCorrect: false, rationale: "Consecutive interior angles are supplementary." },
        { text: "Complementary", isCorrect: false, rationale: "They do not necessarily add to 90°." },
        { text: "Unequal", isCorrect: false, rationale: "They are equal." }
      ],
      rationale: "A theorem in geometry states that when a transversal intersects two parallel lines, the corresponding angles are congruent (equal)."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "The area of a trapezoid is 100 sq. units. Its height is 10 units and one of its bases is 8 units. What is the length of the other base?",
      answerOptions: [
        { text: "10 units", isCorrect: false, rationale: "This is the height." },
        { text: "12 units", isCorrect: true, rationale: "100 = (1/2)(8+b2)*10. 100 = 5(8+b2). 20 = 8+b2. b2 = 12." },
        { text: "20 units", isCorrect: false, rationale: "This is 100/5." },
        { text: "28 units", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Using the area formula for a trapezoid, A = $\\frac{1}{2}(b_1 + b_2)h$. We have 100 = $\\frac{1}{2}(8 + b_2) \\times 10$. 100 = $5(8 + b_2)$. 20 = $8 + b_2$. So, $b_2 = 12$ units."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Geometry & Measurement",
  id: "math_geometry_11",
  title: "Geometry & Measurement: Quiz 11",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the perimeter of a triangle with side lengths of 3, 4, and 5?",
      answerOptions: [
        { text: "7", isCorrect: false, rationale: "This is 3+4." },
        { text: "9", isCorrect: false, rationale: "This is 4+5." },
        { text: "12", isCorrect: true, rationale: "The perimeter is the sum of the side lengths: 3 + 4 + 5 = 12." },
        { text: "60", isCorrect: false, rationale: "This is the product of the side lengths." }
      ],
      rationale: "The perimeter of a polygon is the sum of the lengths of its sides. For this triangle, the perimeter is 3 + 4 + 5 = 12."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A circle has a diameter of 8. What is its area? Use 3.14 for $\\pi$.",
      correctAnswer: "50.24",
      rationale: "The radius is half the diameter, so r=4. Area = pi * $r^2$ = 3.14 * $4^2$ = 50.24."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the volume of a cube with a side length of 6?",
      answerOptions: [
        { text: "18", isCorrect: false, rationale: "This is 6*3." },
        { text: "36", isCorrect: false, rationale: "This is the area of one face." },
        { text: "216", isCorrect: true, rationale: "Volume = $6^3$ = 216." },
        { text: "1296", isCorrect: false, rationale: "This is $6^4$." }
      ],
      rationale: "The volume of a cube is the side length cubed. V = $6^3$ = 6 * 6 * 6 = 216."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "How many sides does a quadrilateral have?",
      correctAnswer: "4",
      rationale: "A quadrilateral is a polygon with four sides."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of the following is NOT a type of angle?",
      answerOptions: [
        { text: "Acute", isCorrect: false, rationale: "An acute angle is less than 90°." },
        { text: "Obtuse", isCorrect: false, rationale: "An obtuse angle is greater than 90°." },
        { text: "Parallel", isCorrect: true, rationale: "Parallel refers to lines, not angles." },
        { text: "Right", isCorrect: false, rationale: "A right angle is 90°." }
      ],
      rationale: "\'Parallel\' is a term used to describe lines that never intersect. Acute, obtuse, and right are all types of angles."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A rectangular room is 12 feet wide and 16 feet long. What is the distance from one corner to the opposite corner?",
      answerOptions: [
        { text: "20 feet", isCorrect: true, rationale: "d² = 12² + 16² = 144 + 256 = 400. d = sqrt(400) = 20." },
        { text: "28 feet", isCorrect: false, rationale: "This is the sum of the sides." },
        { text: "56 feet", isCorrect: false, rationale: "This is the perimeter." },
        { text: "192 feet", isCorrect: false, rationale: "This is the area." }
      ],
      rationale: "The diagonal of a rectangle forms the hypotenuse of a right triangle with the length and width as legs. Using the Pythagorean theorem: d² = 12² + 16² = 144 + 256 = 400. d = $\\sqrt{400}$ = 20 feet."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "If an angle is 70°, what is its supplementary angle?",
      correctAnswer: "110°",
      rationale: "Supplementary angles add up to 180°. 180 - 70 = 110."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the area of a circle with a circumference of 18.84? Use 3.14 for $\\pi$.",
      answerOptions: [
        { text: "28.26", isCorrect: true, rationale: "C = 2*pi*r -> 18.84 = 2*3.14*r -> r=3. Area = pi*r² = 3.14*3² = 28.26." },
        { text: "56.52", isCorrect: false, rationale: "This is the circumference if the radius was 9." },
        { text: "9", isCorrect: false, rationale: "This is r²." },
        { text: "3", isCorrect: false, rationale: "This is the radius." }
      ],
      rationale: "First, find the radius from the circumference: C = 2 * pi * r. 18.84 = 2 * 3.14 * r. r = 18.84 / 6.28 = 3. Now, find the area: A = pi * r² = 3.14 * 3² = 28.26."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A cube has a volume of 125 cubic inches. What is its surface area?",
      correctAnswer: "150 square inches",
      rationale: "The side length is the cube root of the volume: ³√125 = 5 inches. The area of one face is 5² = 25. The surface area is 6 * 25 = 150."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A triangle with all three sides of different lengths is called:",
      answerOptions: [
        { text: "Equilateral", isCorrect: false, rationale: "All sides are equal." },
        { text: "Isosceles", isCorrect: false, rationale: "Two sides are equal." },
        { text: "Scalene", isCorrect: true, rationale: "No sides are equal." },
        { text: "Right", isCorrect: false, rationale: "Has a right angle." }
      ],
      rationale: "A scalene triangle is a triangle in which all three sides have different lengths."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "How many faces does a rectangular prism have?",
      answerOptions: [
        { text: "4", isCorrect: false, rationale: "A pyramid has 4 faces." },
        { text: "6", isCorrect: true, rationale: "A rectangular prism (like a box) has 6 faces." },
        { text: "8", isCorrect: false, rationale: "A prism has 8 vertices." },
        { text: "12", isCorrect: false, rationale: "A prism has 12 edges." }
      ],
      rationale: "A rectangular prism is a three-dimensional shape with six rectangular faces."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "The area of a parallelogram is 60 sq ft. If its base is 12 ft, what is its height?",
      answerOptions: [
        { text: "5 ft", isCorrect: true, rationale: "Area = base * height. 60 = 12 * h. h = 5." },
        { text: "10 ft", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "24 ft", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "720 ft", isCorrect: false, rationale: "This is the product." }
      ],
      rationale: "The formula for the area of a parallelogram is A = b * h. We have 60 = 12 * h. To find the height, divide the area by the base: h = 60 / 12 = 5 feet."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Geometry & Measurement",
  id: "math_geometry_12",
  title: "Geometry & Measurement: Quiz 12",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the area of a triangle with a base of 10 and height of 5?",
      answerOptions: [
        { text: "15", isCorrect: false, rationale: "This is the sum." },
        { text: "25", isCorrect: true, rationale: "Area = (1/2)*10*5 = 25." },
        { text: "30", isCorrect: false, rationale: "This is the perimeter of a different triangle." },
        { text: "50", isCorrect: false, rationale: "This is base*height." }
      ],
      rationale: "The area of a triangle is A = 1/2 * b * h. A = 1/2 * 10 * 5 = 25."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A circle\'s area is 314 sq. units. What is its radius? Use 3.14 for $\\pi$.",
      correctAnswer: "10",
      rationale: "Area = pi*$r^2$. 314 = 3.14 * $r^2$. $r^2$ = 100. r = 10."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the volume of a cylinder with r=3 and h=10? Use 3.14 for $\\pi$.",
      answerOptions: [
        { text: "94.2", isCorrect: false, rationale: "This is the surface area of the side." },
        { text: "282.6", isCorrect: true, rationale: "V = pi * $3^2$ * 10 = 282.6." },
        { text: "314", isCorrect: false, rationale: "This is if r=10, h=1." },
        { text: "942", isCorrect: false, rationale: "This is if r=10, h=3." }
      ],
      rationale: "The volume of a cylinder is V = pi * $r^2$ * h. V = 3.14 * ($3)^2$ * 10 = 282.6."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "An angle of 180° is a ___ angle.",
      correctAnswer: "straight",
      rationale: "A straight angle is an angle of 180°."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A rectangle has a perimeter of 30 and a width of 5. What is its length?",
      answerOptions: [
        { text: "5", isCorrect: false, rationale: "This is the width." },
        { text: "10", isCorrect: true, rationale: "P=2(L+W). 30=2(L+5). 15=L+5. L=10." },
        { text: "15", isCorrect: false, rationale: "This is half the perimeter." },
        { text: "20", isCorrect: false, rationale: "This is 30-10." }
      ],
      rationale: "Perimeter P = 2(L + W). 30 = 2(L + 5). 15 = L + 5. L = 10."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "Find the surface area of a sphere with a diameter of 10. Use 3.14 for $\\pi$ and SA=$4\\pi r^2$.",
      answerOptions: [
        { text: "31.4", isCorrect: false, rationale: "This is the circumference." },
        { text: "78.5", isCorrect: false, rationale: "This is the area of a circle with this diameter." },
        { text: "314", isCorrect: true, rationale: "The radius is 5. SA = 4*3.14*5² = 314." },
        { text: "523.33", isCorrect: false, rationale: "This is the volume." }
      ],
      rationale: "The radius is half the diameter, so r=5. The surface area is SA = 4 * pi * $r^2$ = 4 * 3.14 * $5^2$ = 314."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the area of a square with perimeter 48?",
      correctAnswer: "144",
      rationale: "The side length is 48/4 = 12. The area is $12^2$ = 144."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A right triangle has legs of 1.5 and 2. What is the hypotenuse?",
      answerOptions: [
        { text: "2.5", isCorrect: true, rationale: "$1.5^2$ + $2^2$ = 2.25 + 4 = 6.25. sqrt(6.25) = 2.5." },
        { text: "3.5", isCorrect: false, rationale: "This is the sum." },
        { text: "6.25", isCorrect: false, rationale: "This is the hypotenuse squared." },
        { text: "3", isCorrect: false, rationale: "This is 1.5*2." }
      ],
      rationale: "Using the Pythagorean theorem, $a^2 + b^2 = c^2$. $1.5^2 + 2^2 = 2.25 + 4 = 6.25$. c = $\\sqrt{6.25}$ = 2.5."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "How many feet are in half a mile? (1 mile = 5280 feet)",
      correctAnswer: "2640 feet",
      rationale: "Half a mile is 5280 / 2 = 2640 feet."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which shape does not have any parallel sides?",
      answerOptions: [
        { text: "Square", isCorrect: false, rationale: "A square has two pairs of parallel sides." },
        { text: "Trapezoid", isCorrect: false, rationale: "A trapezoid has one pair of parallel sides." },
        { text: "Kite", isCorrect: true, rationale: "A kite has no parallel sides (unless it\'s a rhombus)." },
        { text: "Hexagon", isCorrect: false, rationale: "A regular hexagon has three pairs of parallel sides." }
      ],
      rationale: "A kite is a quadrilateral with two pairs of equal-length sides that are adjacent to each other. It typically has no parallel sides."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "If an angle is 120°, what is its supplementary angle?",
      answerOptions: [
        { text: "30°", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "60°", isCorrect: true, rationale: "180 - 120 = 60." },
        { text: "90°", isCorrect: false, rationale: "This is a right angle." },
        { text: "240°", isCorrect: false, rationale: "This is 120*2." }
      ],
      rationale: "Supplementary angles add up to 180°. The supplement of 120° is 180° - 120° = 60°."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "The volume of a cone is 100. If a cylinder has the same base and height, what is its volume?",
      answerOptions: [
        { text: "100", isCorrect: false, rationale: "The volume of a cone is 1/3 that of a cylinder with the same base and height." },
        { text: "200", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "300", isCorrect: true, rationale: "The volume of a cylinder is 3 times the volume of a cone with the same base and height. 3 * 100 = 300." },
        { text: "Cannot be determined", isCorrect: false, rationale: "It can be determined." }
      ],
      rationale: "The volume of a cone is given by V = (1/3) * pi * r² * h, while the volume of a cylinder is V = pi * r² * h. Therefore, a cylinder\'s volume is 3 times that of a cone with the same base and height. 3 * 100 = 300."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Graphs & Functions",
  id: "math_graphs_01",
  title: "Graphs & Functions: Quiz 1",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "In the function $f(x) = 2x - 3$, what is the value of $f(4)$?",
      answerOptions: [
        { text: "1", isCorrect: false, rationale: "This is the result of 4-3." },
        { text: "5", isCorrect: true, rationale: "Substitute 4 for x: f(4) = 2(4) - 3 = 8 - 3 = 5." },
        { text: "8", isCorrect: false, rationale: "This is just 2*4, without subtracting 3." },
        { text: "11", isCorrect: false, rationale: "This is the result if you add 3 instead of subtracting." }
      ],
      rationale: "To evaluate f(4), substitute 4 for x in the function: f(4) = 2(4) - 3 = 8 - 3 = 5."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is the slope of the line given by the equation $y = 5x + 2$?",
      correctAnswer: "5",
      rationale: "The equation is in slope-intercept form (y = mx + b), where \'m\' is the slope. In this case, the slope is 5."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the y-intercept of the line that passes through the point (2, 7) and has a slope of 3?",
      answerOptions: [
        { text: "1", isCorrect: true, rationale: "Using y = mx + b, we have 7 = 3(2) + b. So, 7 = 6 + b, which means b = 1." },
        { text: "2", isCorrect: false, rationale: "This is the x-coordinate of the given point." },
        { text: "3", isCorrect: false, rationale: "This is the slope." },
        { text: "7", isCorrect: false, rationale: "This is the y-coordinate of the given point." }
      ],
      rationale: "Use the slope-intercept form y = mx + b. Plug in the known values: 7 = 3(2) + b. Solve for b: 7 = 6 + b, so b = 1."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "Find the slope of the line passing through the points (1, 2) and (3, 10).",
      correctAnswer: "4",
      rationale: "The slope (m) is the change in y divided by the change in x. m = (10 - 2) / (3 - 1) = 8 / 2 = 4."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of the following points lies on the line $y = -2x + 6$?",
      answerOptions: [
        { text: "(1, 4)", isCorrect: true, rationale: "If x=1, y = -2(1) + 6 = 4. So (1, 4) is on the line." },
        { text: "(2, 3)", isCorrect: false, rationale: "If x=2, y = -2(2) + 6 = 2. So (2, 3) is not on the line." },
        { text: "(3, 1)", isCorrect: false, rationale: "If x=3, y = -2(3) + 6 = 0. So (3, 1) is not on the line." },
        { text: "(4, -1)", isCorrect: false, rationale: "If x=4, y = -2(4) + 6 = -2. So (4, -1) is not on the line." }
      ],
      rationale: "Substitute the x-coordinate of each point into the equation and see if it produces the correct y-coordinate. For (1, 4): y = -2(1) + 6 = -2 + 6 = 4. This matches."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "What is the equation of a line that is parallel to $y = 3x - 1$ and passes through the point (2, 5)?",
      answerOptions: [
        { text: "y = 3x + 1", isCorrect: false, rationale: "This line has the correct slope, but does not pass through (2,5)." },
        { text: "y = -1/3x + 5", isCorrect: false, rationale: "This line has the slope of a perpendicular line." },
        { text: "y = 3x + 5", isCorrect: false, rationale: "This line has the correct slope, but does not pass through (2,5)." },
        { text: "y = 3x - 1", isCorrect: true, rationale: "A parallel line has the same slope (3). Use y=mx+b: 5 = 3(2)+b -> 5=6+b -> b=-1. So y=3x-1." }
      ],
      rationale: "Parallel lines have the same slope, so the new line\'s slope is 3. Use the point-slope form y - y1 = m(x - x1): y - 5 = 3(x - 2). This simplifies to y - 5 = 3x - 6, so y = 3x - 1."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Given $f(x) = x^2 + 3$, find $f(-2)$.",
      correctAnswer: "7",
      rationale: "Substitute -2 for x: f(-2) = $(-2)^2 + 3 = 4 + 3 = 7$."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "The graph of a vertical line has a slope that is:",
      answerOptions: [
        { text: "0", isCorrect: false, rationale: "A horizontal line has a slope of 0." },
        { text: "1", isCorrect: false, rationale: "A line with a slope of 1 rises one unit for every one unit it runs." },
        { text: "undefined", isCorrect: true, rationale: "A vertical line has an infinite change in y over zero change in x, which is undefined." },
        { text: "negative", isCorrect: false, rationale: "A line that falls from left to right has a negative slope." }
      ],
      rationale: "The slope is \'rise over run\'. A vertical line has an infinite rise but zero run. Division by zero is undefined, so the slope is undefined."
    },
    {
        questionNumber: 9,
        type: "fillIn",
        calculator: false,
        difficulty: "medium",
        question: "What is the x-intercept of the line $2x + 4y = 8$?",
        correctAnswer: "(4, 0)",
        rationale: "To find the x-intercept, set y = 0. The equation becomes 2x + 4(0) = 8, so 2x = 8. Solve for x to get x = 4. The x-intercept is the point (4, 0)."
      },
      {
        questionNumber: 10,
        type: "multipleChoice",
        calculator: true,
        difficulty: "medium",
        question: "A linear function is represented by the table of values: (x=0, y=3), (x=1, y=5), (x=2, y=7). What is the slope of this function?",
        answerOptions: [
          { text: "1", isCorrect: false, rationale: "The y-value increases by 2 for each 1-unit increase in x." },
          { text: "2", isCorrect: true, rationale: "For every 1-unit increase in x, the y-value increases by 2. The slope is 2." },
          { text: "3", isCorrect: false, rationale: "This is the y-intercept, not the slope." },
          { text: "5", isCorrect: false, rationale: "This is the y-value when x=1." }
        ],
        rationale: "The slope is the change in y divided by the change in x. Using the first two points: (5 - 3) / (1 - 0) = 2 / 1 = 2."
      },
      {
        questionNumber: 11,
        type: "multipleChoice",
        calculator: false,
        difficulty: "hard",
        question: "What is the slope of a line that is perpendicular to the line $y = -\\frac{1}{4}x + 2$?",
        answerOptions: [
          { text: "-1/4", isCorrect: false, rationale: "This is the slope of a parallel line." },
          { text: "1/4", isCorrect: false, rationale: "This is the reciprocal, but not the negative reciprocal." },
          { text: "-4", isCorrect: false, rationale: "This is the negative, but not the reciprocal." },
          { text: "4", isCorrect: true, rationale: "The slope of a perpendicular line is the negative reciprocal of the original slope. The negative reciprocal of -1/4 is 4." }
        ],
        rationale: "Perpendicular lines have slopes that are negative reciprocals of each other. The slope of the given line is -1/4. The negative reciprocal is $-(\\frac{1}{-1/4}) = 4$."
      },
      {
        questionNumber: 12,
        type: "multipleChoice",
        calculator: true,
        difficulty: "medium",
        question: "If a function is defined as $g(x) = 3x + 1$, for which value of x does $g(x) = 10$?",
        answerOptions: [
          { text: "1", isCorrect: false, rationale: "g(1) = 3(1)+1 = 4." },
          { text: "2", isCorrect: false, rationale: "g(2) = 3(2)+1 = 7." },
          { text: "3", isCorrect: true, rationale: "Set 3x + 1 = 10. Subtract 1 to get 3x = 9, then divide by 3 to get x = 3." },
          { text: "4", isCorrect: false, rationale: "g(4) = 3(4)+1 = 13." }
        ],
        rationale: "Set the function equal to 10: 3x + 1 = 10. Solve for x by subtracting 1 from both sides (3x = 9) and then dividing by 3 (x = 3)."
      }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Graphs & Functions",
  id: "math_graphs_02",
  title: "Graphs & Functions: Quiz 2",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the y-intercept of the function $f(x) = 4x - 8$?",
      answerOptions: [
        { text: "4", isCorrect: false, rationale: "This is the slope of the line." },
        { text: "-8", isCorrect: true, rationale: "The y-intercept is the value of the function when x=0. f(0) = -8." },
        { text: "2", isCorrect: false, rationale: "This is the x-intercept." },
        { text: "8", isCorrect: false, rationale: "This is the negative of the y-intercept." }
      ],
      rationale: "The y-intercept occurs where x=0. In the form y = mx + b, the y-intercept is b. Here, it is -8."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "If $f(x) = 10 - 3x$, what is the value of $f(2)$?",
      correctAnswer: "4",
      rationale: "Substitute 2 for x in the function: f(2) = 10 - 3(2) = 10 - 6 = 4."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the slope of the line that passes through the points (-1, 3) and (2, 9).",
      answerOptions: [
        { text: "1/2", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "2", isCorrect: true, rationale: "Slope = (change in y) / (change in x) = (9 - 3) / (2 - (-1)) = 6 / 3 = 2." },
        { text: "3", isCorrect: false, rationale: "This is the change in x." },
        { text: "6", isCorrect: false, rationale: "This is the change in y." }
      ],
      rationale: "The formula for the slope is $m = \\frac{y_2 - y_1}{x_2 - x_1}$. So, $m = \\frac{9 - 3}{2 - (-1)} = \\frac{6}{3} = 2$."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the x-intercept of the function $f(x) = 5x - 15$?",
      correctAnswer: "3",
      rationale: "The x-intercept is the point where f(x) = 0. So, 0 = 5x - 15. Add 15 to both sides: 15 = 5x. Divide by 5: x = 3."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of these equations represents a line with a negative slope?",
      answerOptions: [
        { text: "y = x + 5", isCorrect: false, rationale: "The slope is 1 (positive)." },
        { text: "y = -2x + 3", isCorrect: true, rationale: "The slope is -2, which is negative." },
        { text: "y = 5", isCorrect: false, rationale: "This is a horizontal line with a slope of 0." },
        { text: "x = -2", isCorrect: false, rationale: "This is a vertical line with an undefined slope." }
      ],
      rationale: "In the slope-intercept form y = mx + b, \'m\' is the slope. A negative value for \'m\' indicates a negative slope."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "The cost of renting a car is a flat fee of $50 plus $0.25 per mile. Which function represents the total cost, C(m), for driving \'m\' miles?",
      answerOptions: [
        { text: "C(m) = 50.25m", isCorrect: false, rationale: "This implies the entire cost is variable." },
        { text: "C(m) = 50m + 0.25", isCorrect: false, rationale: "This incorrectly assigns the variable to the flat fee." },
        { text: "C(m) = 50 + 0.25m", isCorrect: true, rationale: "The total cost is the fixed fee plus the variable cost per mile." },
        { text: "C(m) = (50 + 0.25)m", isCorrect: false, rationale: "This incorrectly combines the costs." }
      ],
      rationale: "The total cost is the sum of the fixed fee ($50) and the variable cost, which is $0.25 times the number of miles (m). So, C(m) = 50 + 0.25m."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "If a line has a slope of -2 and passes through the point (1, 5), what is its y-intercept?",
      correctAnswer: "7",
      rationale: "Using y = mx + b, plug in the values: 5 = -2(1) + b. So, 5 = -2 + b. Add 2 to both sides to find b = 7."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "What is the domain of the function $f(x) = \\sqrt{x-2}$?",
      answerOptions: [
        { text: "x > 2", isCorrect: false, rationale: "The value under the square root can be zero, so x can be equal to 2." },
        { text: "x \geq 2", isCorrect: true, rationale: "The expression under a square root must be non-negative. So, x - 2 >= 0, which means x >= 2." },
        { text: "All real numbers", isCorrect: false, rationale: "If x < 2, the value under the square root would be negative." },
        { text: "x \leq 2", isCorrect: false, rationale: "This would result in a negative value under the square root for x < 2." }
      ],
      rationale: "For the function to have a real value, the expression inside the square root must be greater than or equal to zero. So, $x-2 \geq 0$, which simplifies to $x \geq 2$."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Find the value of $f(g(2))$ when $f(x) = 3x$ and $g(x) = x + 5$.",
      correctAnswer: "21",
      rationale: "First, find g(2): g(2) = 2 + 5 = 7. Then, find f(7): f(7) = 3 * 7 = 21."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A line is graphed on a coordinate plane. It passes through (0, 4) and (2, 0). What is the equation of the line?",
      answerOptions: [
        { text: "y = 2x + 4", isCorrect: false, rationale: "This line has a positive slope." },
        { text: "y = -2x + 4", isCorrect: true, rationale: "The y-intercept is 4. The slope is (0-4)/(2-0) = -2. So, y = -2x + 4." },
        { text: "y = -2x + 2", isCorrect: false, rationale: "This line has the correct slope but wrong y-intercept." },
        { text: "y = 4x + 2", isCorrect: false, rationale: "This line has an incorrect slope and y-intercept." }
      ],
      rationale: "First, find the slope: $m = \\frac{0 - 4}{2 - 0} = -2$. The y-intercept is the point where x=0, which is (0, 4). So, b = 4. The equation is y = -2x + 4."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Which of the following describes the graph of $y = x^2 - 1$?",
      answerOptions: [
        { text: "A line that passes through the origin.", isCorrect: false, rationale: "This is a parabola, not a line." },
        { text: "A parabola that opens upward with its vertex at (0, -1).", isCorrect: true, rationale: "The $x^2$ term means it\'s a parabola opening upward. The -1 shifts the vertex down one unit from the origin." },
        { text: "A parabola that opens downward with its vertex at (0, 1).", isCorrect: false, rationale: "The coefficient of $x^2$ is positive, so it opens upward." },
        { text: "A circle with a radius of 1.", isCorrect: false, rationale: "The equation for a circle is different." }
      ],
      rationale: "The $x^2$ term indicates a parabola. Since the coefficient of $x^2$ is positive, it opens upward. The \'-1\' term shifts the vertex of the parabola down by one unit from the origin to (0, -1)."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If a graph of a function is a straight line, the function is:",
      answerOptions: [
        { text: "Linear", isCorrect: true, rationale: "A linear function\'s graph is a straight line." },
        { text: "Quadratic", isCorrect: false, rationale: "A quadratic function\'s graph is a parabola." },
        { text: "Exponential", isCorrect: false, rationale: "An exponential function\'s graph is a curve." },
        { text: "Absolute Value", isCorrect: false, rationale: "An absolute value function\'s graph is V-shaped." }
      ],
      rationale: "By definition, a linear function is a function whose graph is a straight line."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Graphs & Functions",
  id: "math_graphs_03",
  title: "Graphs & Functions: Quiz 3",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which point is located on the y-axis?",
      answerOptions: [
        { text: "(3, 0)", isCorrect: false, rationale: "This point is on the x-axis." },
        { text: "(0, -2)", isCorrect: true, rationale: "A point on the y-axis has an x-coordinate of 0." },
        { text: "(3, -2)", isCorrect: false, rationale: "This point is in the fourth quadrant." },
        { text: "(-2, 3)", isCorrect: false, rationale: "This point is in the second quadrant." }
      ],
      rationale: "Points on the y-axis have an x-coordinate of 0."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is the slope of the equation $y = -x + 4$?",
      correctAnswer: "-1",
      rationale: "The equation is in slope-intercept form (y = mx + b), where \'m\' is the slope. The coefficient of x is -1."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If $f(x) = x^2 - 2x$, what is the value of $f(5)$?",
      answerOptions: [
        { text: "15", isCorrect: true, rationale: "f(5) = $5^2$ - 2(5) = 25 - 10 = 15." },
        { text: "20", isCorrect: false, rationale: "This is $5^2$ - 5." },
        { text: "35", isCorrect: false, rationale: "This is $5^2$ + 2(5)." },
        { text: "5", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Substitute 5 for x in the function: f(5) = $(5)^2$ - 2(5) = 25 - 10 = 15."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A line passes through (0, 1) and (3, 7). What is its y-intercept?",
      correctAnswer: "1",
      rationale: "The y-intercept is the y-value where the line crosses the y-axis, which occurs at x=0. The point (0, 1) is the y-intercept."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of the following functions is a quadratic function?",
      answerOptions: [
        { text: "$y = 2x + 1$", isCorrect: false, rationale: "This is a linear function." },
        { text: "$y = 3x^2 - 4x + 2$", isCorrect: true, rationale: "A quadratic function has a term with x² as its highest power." },
        { text: "$y = |x-3|$", isCorrect: false, rationale: "This is an absolute value function." },
        { text: "$y = 2^x$", isCorrect: false, rationale: "This is an exponential function." }
      ],
      rationale: "A quadratic function is a polynomial function of degree 2, meaning its highest exponent is 2."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "What is the vertex of the parabola given by the equation $y = (x - 3)^2 + 5$?",
      answerOptions: [
        { text: "(-3, 5)", isCorrect: false, rationale: "The x-coordinate of the vertex is h, not -h." },
        { text: "(3, 5)", isCorrect: true, rationale: "The equation is in vertex form y = $(x - h)^2$ + k, where (h, k) is the vertex." },
        { text: "(3, -5)", isCorrect: false, rationale: "The y-coordinate of the vertex is k, not -k." },
        { text: "(5, 3)", isCorrect: false, rationale: "The coordinates are reversed." }
      ],
      rationale: "The vertex form of a parabola is y = a$(x - h)^2$ + k, where the vertex is at the point (h, k). In this equation, h=3 and k=5."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the slope of the line given by the equation $4x + 2y = 10$?",
      correctAnswer: "-2",
      rationale: "Convert the equation to slope-intercept form (y = mx + b). 2y = -4x + 10. y = -2x + 5. The slope is -2."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "If the graph of $f(x) = x^2$ is shifted 4 units to the right, what is the new function?",
      answerOptions: [
        { text: "$g(x) = x^2 + 4$", isCorrect: false, rationale: "This is a shift of 4 units up." },
        { text: "$g(x) = x^2 - 4$", isCorrect: false, rationale: "This is a shift of 4 units down." },
        { text: "$g(x) = (x + 4)^2$", isCorrect: false, rationale: "This is a shift of 4 units to the left." },
        { text: "$g(x) = (x - 4)^2$", isCorrect: true, rationale: "A horizontal shift to the right by h units is represented by f(x-h)." }
      ],
      rationale: "A horizontal shift of a function f(x) by h units to the right is represented by the new function g(x) = f(x - h). So, the new function is g(x) = $(x - 4)^2$."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "For the function $h(t) = -16t^2 + 64t$, find the value of $h(2)$.",
      correctAnswer: "64",
      rationale: "Substitute 2 for t: h(2) = -16$(2)^2$ + 64(2) = -16(4) + 128 = -64 + 128 = 64."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Which equation represents a line that is perpendicular to $y = 5x - 2$?",
      answerOptions: [
        { text: "$y = 5x + 3$", isCorrect: false, rationale: "This line is parallel." },
        { text: "$y = -5x - 2$", isCorrect: false, rationale: "This line has a negative slope, but not the negative reciprocal." },
        { text: "$y = \\frac{1}{5}x + 1$", isCorrect: false, rationale: "This is the reciprocal slope, but not the negative reciprocal." },
        { text: "$y = -\\frac{1}{5}x + 4$", isCorrect: true, rationale: "The slope of a perpendicular line is the negative reciprocal of the original slope. The negative reciprocal of 5 is -1/5." }
      ],
      rationale: "The slope of the given line is 5. The slope of a perpendicular line is the negative reciprocal, which is -1/5. This equation has a slope of -1/5."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "What is the range of the function $f(x) = -x^2 + 3$?",
      answerOptions: [
        { text: "$y \\leq 3$", isCorrect: true, rationale: "This is a downward-opening parabola with a vertex at (0, 3). The maximum y-value is 3." },
        { text: "$y \\geq 3$", isCorrect: false, rationale: "The parabola opens downward, so y cannot be greater than 3." },
        { text: "$y \\leq 0$", isCorrect: false, rationale: "The vertex is at y=3." },
        { text: "All real numbers", isCorrect: false, rationale: "The function has a maximum value." }
      ],
      rationale: "This is a parabola that opens downward (because of the negative coefficient of $x^2$) and is shifted up by 3 units. Its vertex is at (0, 3), which is the maximum point. Therefore, the range is all real numbers less than or equal to 3."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "The value of a car, V, after t years is given by the function $V(t) = 25000 - 1500t$. What does the number 1500 represent?",
      answerOptions: [
        { text: "The initial value of the car", isCorrect: false, rationale: "The initial value is $25,000." },
        { text: "The value of the car after one year", isCorrect: false, rationale: "The value after one year would be $23,500." },
        { text: "The yearly decrease in the car\'s value", isCorrect: true, rationale: "The slope of the linear function represents the rate of change, which is a decrease of $1500 per year." },
        { text: "The number of years until the car has no value", isCorrect: false, rationale: "This would be 25000/1500." }
      ],
      rationale: "In this linear function, the slope (-1500) represents the rate of change of the car\'s value per year. Since it\'s negative, it represents a decrease."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Graphs & Functions",
  id: "math_graphs_04",
  title: "Graphs & Functions: Quiz 4",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "For the function $f(x) = 7x + 2$, what is $f(3)$?",
      answerOptions: [
        { text: "12", isCorrect: false, rationale: "This is 7+3+2." },
        { text: "21", isCorrect: false, rationale: "This is 7*3." },
        { text: "23", isCorrect: true, rationale: "f(3) = 7(3) + 2 = 21 + 2 = 23." },
        { text: "30", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Substitute 3 for x in the function: f(3) = 7(3) + 2 = 21 + 2 = 23."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is the y-intercept of the line $y = \\frac{1}{2}x - 6$?",
      correctAnswer: "-6",
      rationale: "In the slope-intercept form y = mx + b, \'b\' represents the y-intercept. In this case, b = -6."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the slope of the line passing through the points (3, -1) and (5, 3)?",
      answerOptions: [
        { text: "-2", isCorrect: false, rationale: "This is an incorrect calculation of the slope." },
        { text: "1/2", isCorrect: false, rationale: "This is the reciprocal of the slope." },
        { text: "2", isCorrect: true, rationale: "Slope = (3 - (-1)) / (5 - 3) = 4 / 2 = 2." },
        { text: "4", isCorrect: false, rationale: "This is the change in y, not the slope." }
      ],
      rationale: "The slope is calculated as the change in y divided by the change in x: $m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{3 - (-1)}{5 - 3} = \\frac{4}{2} = 2$."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "Given the function $f(x) = 10$, what is the value of $f(7)$?",
      correctAnswer: "10",
      rationale: "This is a constant function, which means the output is always 10, regardless of the input value for x."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of the following points is on the line $y = 4x - 5$?",
      answerOptions: [
        { text: "(1, -1)", isCorrect: true, rationale: "If x=1, y = 4(1) - 5 = -1." },
        { text: "(2, 2)", isCorrect: false, rationale: "If x=2, y = 4(2) - 5 = 3." },
        { text: "(3, 6)", isCorrect: false, rationale: "If x=3, y = 4(3) - 5 = 7." },
        { text: "(0, 5)", isCorrect: false, rationale: "If x=0, y = 4(0) - 5 = -5." }
      ],
      rationale: "Plug the x-coordinate of each point into the equation to see if it produces the correct y-coordinate. For (1, -1): y = 4(1) - 5 = 4 - 5 = -1. It matches."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A personal trainer charges a one-time consultation fee of $60 and $35 per session. What function C(s) represents the total cost for \'s\' sessions?",
      answerOptions: [
        { text: "C(s) = 60s + 35", isCorrect: false, rationale: "This reverses the fee and session cost." },
        { text: "C(s) = 35s + 60", isCorrect: true, rationale: "The total cost is the variable cost per session plus the fixed consultation fee." },
        { text: "C(s) = 95s", isCorrect: false, rationale: "This incorrectly combines the costs." },
        { text: "C(s) = 60(s + 35)", isCorrect: false, rationale: "This is an incorrect representation." }
      ],
      rationale: "The total cost C(s) is the sum of the one-time fee ($60) and the cost per session ($35) multiplied by the number of sessions (s). So, C(s) = 35s + 60."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the x-intercept of the line $y = -3x + 9$?",
      correctAnswer: "3",
      rationale: "To find the x-intercept, set y = 0. 0 = -3x + 9. Add 3x to both sides: 3x = 9. Divide by 3: x = 3."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "The graph of a quadratic function is a:",
      answerOptions: [
        { text: "Straight line", isCorrect: false, rationale: "This is the graph of a linear function." },
        { text: "V-shape", isCorrect: false, rationale: "This is the graph of an absolute value function." },
        { text: "Parabola", isCorrect: true, rationale: "A quadratic function (e.g., y=$x^2$) creates a U-shaped curve called a parabola." },
        { text: "Circle", isCorrect: false, rationale: "A circle is not a function." }
      ],
      rationale: "The graph of a quadratic equation of the form $y = ax^2 + bx + c$ is a parabola."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A line has a slope of 4 and a y-intercept of -2. What is the equation of the line?",
      correctAnswer: "y = 4x - 2",
      rationale: "Using the slope-intercept form y = mx + b, substitute the given slope for m and the y-intercept for b."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the slope of the line represented by the equation $6x - 2y = 8$?",
      answerOptions: [
        { text: "-3", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "3", isCorrect: true, rationale: "Rewrite the equation as -2y = -6x + 8. Divide by -2 to get y = 3x - 4. The slope is 3." },
        { text: "6", isCorrect: false, rationale: "This is the coefficient of x." },
        { text: "-4", isCorrect: false, rationale: "This is the y-intercept." }
      ],
      rationale: "To find the slope, convert the equation into slope-intercept form (y = mx + b). -2y = -6x + 8. Divide all terms by -2 to get y = 3x - 4. The slope (m) is 3."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Given $g(x) = x+3$, what is the new function if the graph is shifted down by 5 units?",
      answerOptions: [
        { text: "$h(x) = x + 8$", isCorrect: false, rationale: "This is a shift up by 5 units." },
        { text: "$h(x) = x - 2$", isCorrect: true, rationale: "To shift down by 5, subtract 5 from the function: (x+3) - 5 = x - 2." },
        { text: "$h(x) = x - 5$", isCorrect: false, rationale: "This would be a shift down of x, not x+3." },
        { text: "$h(x) = -5x + 3$", isCorrect: false, rationale: "This changes the slope." }
      ],
      rationale: "A vertical shift down by k units is represented by h(x) = g(x) - k. So, h(x) = (x + 3) - 5 = x - 2."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If a line passes through (2, 6) and has a slope of 0, what is the equation of the line?",
      answerOptions: [
        { text: "x = 2", isCorrect: false, rationale: "This is a vertical line with an undefined slope." },
        { text: "y = 2", isCorrect: false, rationale: "This line does not pass through (2, 6)." },
        { text: "y = 6", isCorrect: true, rationale: "A line with a slope of 0 is a horizontal line. Since it passes through (2, 6), the y-value is constant at 6." },
        { text: "y = 6x", isCorrect: false, rationale: "This line has a slope of 6." }
      ],
      rationale: "A slope of 0 indicates a horizontal line. The equation of a horizontal line is y = c, where \'c\' is the constant y-value. Since the line passes through (2, 6), the y-value must be 6. The equation is y = 6."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Graphs & Functions",
  id: "math_graphs_05",
  title: "Graphs & Functions: Quiz 5",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "In which quadrant is the point (-3, 5) located?",
      answerOptions: [
        { text: "Quadrant I", isCorrect: false, rationale: "Quadrant I has positive x and positive y values." },
        { text: "Quadrant II", isCorrect: true, rationale: "Quadrant II has negative x and positive y values." },
        { text: "Quadrant III", isCorrect: false, rationale: "Quadrant III has negative x and negative y values." },
        { text: "Quadrant IV", isCorrect: false, rationale: "Quadrant IV has positive x and negative y values." }
      ],
      rationale: "The coordinate plane is divided into four quadrants. Quadrant II is where the x-coordinates are negative and the y-coordinates are positive."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is the slope of a vertical line?",
      correctAnswer: "Undefined",
      rationale: "A vertical line has a \'run\' of 0. Since slope is rise/run, dividing by zero makes the slope undefined."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the equation of a line with slope 1/3 that passes through the point (3, 2)?",
      answerOptions: [
        { text: "y = (1/3)x + 1", isCorrect: true, rationale: "Using y=mx+b: 2 = (1/3)(3) + b -> 2 = 1 + b -> b=1." },
        { text: "y = 3x - 7", isCorrect: false, rationale: "This uses the reciprocal of the slope." },
        { text: "y = (1/3)x + 3", isCorrect: false, rationale: "This does not pass through the given point." },
        { text: "y = (1/3)x - 1", isCorrect: false, rationale: "This has the wrong y-intercept." }
      ],
      rationale: "Use the point-slope form y - y1 = m(x - x1): y - 2 = (1/3)(x - 3). This simplifies to y - 2 = (1/3)x - 1, so y = (1/3)x + 1."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "If f(x) = 2x - 5, for what value of x is f(x) = 15?",
      correctAnswer: "10",
      rationale: "Set the function equal to 15: 2x - 5 = 15. Add 5 to both sides: 2x = 20. Divide by 2: x = 10."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What does the \'m\' represent in the linear equation y = mx + b?",
      answerOptions: [
        { text: "The y-intercept", isCorrect: false, rationale: "The \'b\' represents the y-intercept." },
        { text: "The x-intercept", isCorrect: false, rationale: "The x-intercept is not directly represented in this form." },
        { text: "The slope", isCorrect: true, rationale: "The coefficient of x, \'m\', represents the slope of the line." },
        { text: "A point on the line", isCorrect: false, rationale: "(x, y) represents a point on the line." }
      ],
      rationale: "In the slope-intercept form of a linear equation, \'m\' is the variable used to represent the slope of the line."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "Which of the following lines is perpendicular to the line 3x + y = 5?",
      answerOptions: [
        { text: "y = -3x + 2", isCorrect: false, rationale: "This line is parallel." },
        { text: "y = (1/3)x - 1", isCorrect: true, rationale: "The original line has a slope of -3. The perpendicular slope is the negative reciprocal, 1/3." },
        { text: "y = 3x + 5", isCorrect: false, rationale: "This has an incorrect slope." },
        { text: "y = (-1/3)x + 4", isCorrect: false, rationale: "This is the reciprocal, but not the negative reciprocal." }
      ],
      rationale: "First, find the slope of the given line by rewriting it in slope-intercept form: y = -3x + 5. The slope is -3. The slope of a perpendicular line is the negative reciprocal, which is 1/3."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Given $f(x) = x^3 - 1$, find $f(2)$.",
      correctAnswer: "7",
      rationale: "Substitute 2 for x: f(2) = $(2)^3$ - 1 = 8 - 1 = 7."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "What is the axis of symmetry for the parabola $y = x^2 - 6x + 8$?",
      answerOptions: [
        { text: "x = -6", isCorrect: false, rationale: "This uses -b." },
        { text: "x = 3", isCorrect: true, rationale: "The axis of symmetry is x = -b/(2a). Here, x = -(-6)/(2*1) = 6/2 = 3." },
        { text: "x = 6", isCorrect: false, rationale: "This is -b." },
        { text: "x = -3", isCorrect: false, rationale: "This is b/(2a)." }
      ],
      rationale: "The formula for the axis of symmetry of a parabola in the form $y = ax^2 + bx + c$ is $x = \\frac{-b}{2a}$. For this equation, a=1 and b=-6. So, $x = \\frac{-(-6)}{2(1)} = \\frac{6}{2} = 3$."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A company\'s profit P(t) in thousands of dollars, t years after 2010, is modeled by P(t) = 50t + 200. What was the profit in 2015?",
      correctAnswer: "450 thousand dollars",
      rationale: "The year 2015 is 5 years after 2010, so t=5. P(5) = 50(5) + 200 = 250 + 200 = 450. The profit is $450,000."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the distance between the points (1, 2) and (4, 6)?",
      answerOptions: [
        { text: "3", isCorrect: false, rationale: "This is the change in x." },
        { text: "4", isCorrect: false, rationale: "This is the change in y." },
        { text: "5", isCorrect: true, rationale: "Using the distance formula, sqrt($(4-1)^2 + (6-2)^2$) = sqrt($3^2 + 4^2$) = sqrt(9 + 16) = sqrt(25) = 5." },
        { text: "7", isCorrect: false, rationale: "This is the sum of the changes in x and y." }
      ],
      rationale: "Use the distance formula: $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$. $d = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Which of the following represents the graph of an exponential function?",
      answerOptions: [
        { text: "A straight line", isCorrect: false, rationale: "This is a linear function." },
        { text: "A parabola", isCorrect: false, rationale: "This is a quadratic function." },
        { text: "A curve that steadily increases or decreases at a changing rate", isCorrect: true, rationale: "Exponential functions show growth or decay that is proportional to the current value." },
        { text: "A V-shape", isCorrect: false, rationale: "This is an absolute value function." }
      ],
      rationale: "The graph of an exponential function, like $y = 2^x$, is a curve that shows rapid increase (growth) or decrease (decay)."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A line has a y-intercept of 4 and an x-intercept of -2. What is the slope of the line?",
      answerOptions: [
        { text: "-2", isCorrect: false, rationale: "This is the x-intercept." },
        { text: "2", isCorrect: true, rationale: "The points are (0, 4) and (-2, 0). Slope = (0 - 4) / (-2 - 0) = -4 / -2 = 2." },
        { text: "1/2", isCorrect: false, rationale: "This is the reciprocal of the slope." },
        { text: "-1/2", isCorrect: false, rationale: "This is the negative reciprocal of the slope." }
      ],
      rationale: "The y-intercept is the point (0, 4) and the x-intercept is the point (-2, 0). The slope is the change in y over the change in x: $m = \\frac{4 - 0}{0 - (-2)} = \\frac{4}{2} = 2$."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Graphs & Functions",
  id: "math_graphs_06",
  title: "Graphs & Functions: Quiz 6",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the slope of a line that is horizontal?",
      answerOptions: [
        { text: "1", isCorrect: false, rationale: "A slope of 1 means the line rises at a 45-degree angle." },
        { text: "0", isCorrect: true, rationale: "A horizontal line has zero rise, so its slope is 0." },
        { text: "Undefined", isCorrect: false, rationale: "A vertical line has an undefined slope." },
        { text: "-1", isCorrect: false, rationale: "A slope of -1 means the line falls at a 45-degree angle." }
      ],
      rationale: "A horizontal line has no \'rise\' for its \'run\'. The change in y is 0, so the slope (change in y / change in x) is always 0."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "If f(x) = x - 8, what is f(10)?",
      correctAnswer: "2",
      rationale: "Substitute 10 for x: f(10) = 10 - 8 = 2."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the y-intercept of the line that passes through the points (2, 8) and (4, 2).",
      answerOptions: [
        { text: "14", isCorrect: true, rationale: "The slope is (2-8)/(4-2) = -3. Using y=mx+b with (2,8): 8 = -3(2) + b -> 8 = -6 + b -> b=14." },
        { text: "10", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "-3", isCorrect: false, rationale: "This is the slope." },
        { text: "5", isCorrect: false, rationale: "This is the average of the y-values." }
      ],
      rationale: "First, find the slope: m = (2 - 8) / (4 - 2) = -6 / 2 = -3. Then, use the slope-intercept form y = mx + b with one of the points, for example (2, 8): 8 = -3(2) + b. 8 = -6 + b. So, b = 14."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the x-intercept of the line 4x + 3y = 12?",
      correctAnswer: "3",
      rationale: "To find the x-intercept, set y = 0. The equation becomes 4x + 3(0) = 12, so 4x = 12. Divide by 4 to get x = 3."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "The graph of which function would be a V-shape?",
      answerOptions: [
        { text: "$y = 2x$", isCorrect: false, rationale: "This is a straight line." },
        { text: "$y = x^2$", isCorrect: false, rationale: "This is a U-shaped parabola." },
        { text: "$y = |x|$", isCorrect: true, rationale: "The absolute value function creates a V-shaped graph." },
        { text: "$y = 2^x$", isCorrect: false, rationale: "This is an exponential curve." }
      ],
      rationale: "The graph of the absolute value function, y = |x|, is a V-shape with its vertex at the origin."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A line passes through (1, -1) and is perpendicular to the line $y = (1/2)x + 5$. What is its equation?",
      answerOptions: [
        { text: "$y = -2x + 1$", isCorrect: true, rationale: "The perpendicular slope is -2. Using y=mx+b: -1 = -2(1) + b -> -1 = -2 + b -> b=1." },
        { text: "$y = (1/2)x - 1.5$", isCorrect: false, rationale: "This line is parallel." },
        { text: "$y = 2x - 3$", isCorrect: false, rationale: "This slope is not the negative reciprocal." },
        { text: "$y = -2x - 3$", isCorrect: false, rationale: "This has the correct slope but wrong y-intercept." }
      ],
      rationale: "The slope of the given line is 1/2. The slope of a perpendicular line is the negative reciprocal, which is -2. Use the point-slope form y - y1 = m(x - x1): y - (-1) = -2(x - 1). y + 1 = -2x + 2. So, y = -2x + 1."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the range of the function $f(x) = x^2 + 5$?",
      correctAnswer: "y >= 5",
      rationale: "The parabola opens upward and its vertex is at (0, 5). Therefore, the minimum y-value is 5, and the range is all real numbers greater than or equal to 5."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "If the graph of $f(x) = x^3$ is shifted 2 units to the left and 3 units down, what is the new function?",
      answerOptions: [
        { text: "$g(x) = (x - 2)^3 - 3$", isCorrect: false, rationale: "This is a shift right and down." },
        { text: "$g(x) = (x + 2)^3 - 3$", isCorrect: true, rationale: "A shift left by 2 is f(x+2), and a shift down by 3 is f(x)-3." },
        { text: "$g(x) = (x + 2)^3 + 3$", isCorrect: false, rationale: "This is a shift left and up." },
        { text: "$g(x) = (x - 3)^3 - 2$", isCorrect: false, rationale: "This reverses the shifts." }
      ],
      rationale: "A horizontal shift to the left by 2 units is represented by replacing x with (x+2). A vertical shift down by 3 units is represented by subtracting 3 from the function. So, the new function is g(x) = $(x + 2)^3$ - 3."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "For the function $f(x) = 100(2)^x$, find the value of $f(3)$.",
      correctAnswer: "800",
      rationale: "Substitute 3 for x: f(3) = 100 * $(2)^3$ = 100 * 8 = 800."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Which point is the vertex of the parabola $y = (x-5)^2 + 1$?",
      answerOptions: [
        { text: "(-5, 1)", isCorrect: false, rationale: "The x-coordinate is h, not -h." },
        { text: "(5, 1)", isCorrect: true, rationale: "The vertex form is y = (x-h)² + k, so the vertex is (h,k)." },
        { text: "(1, 5)", isCorrect: false, rationale: "The coordinates are reversed." },
        { text: "(5, -1)", isCorrect: false, rationale: "The y-coordinate is k, not -k." }
      ],
      rationale: "The equation is in vertex form, y = a$(x - h)^2$ + k, where the vertex is (h, k). In this case, h=5 and k=1."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Which of these functions has a graph that opens downward?",
      answerOptions: [
        { text: "$y = x^2 - 3$", isCorrect: false, rationale: "The coefficient of $x^2$ is positive, so it opens upward." },
        { text: "$y = -x^2 + 4$", isCorrect: true, rationale: "A negative coefficient for the $x^2$ term means the parabola opens downward." },
        { text: "$y = (x-2)^2$", isCorrect: false, rationale: "The coefficient of $x^2$ is positive." },
        { text: "$y = 2x^2$", isCorrect: false, rationale: "The coefficient of $x^2$ is positive." }
      ],
      rationale: "The direction of a parabola is determined by the sign of the coefficient of the $x^2$ term. A negative coefficient means the parabola opens downward."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "The table shows a linear relationship between x and y. What is the slope? (x=2, y=5), (x=4, y=9)",
      answerOptions: [
        { text: "1", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "2", isCorrect: true, rationale: "Slope = (9-5)/(4-2) = 4/2 = 2." },
        { text: "4", isCorrect: false, rationale: "This is the change in y." },
        { text: "7", isCorrect: false, rationale: "This is the average of x and y." }
      ],
      rationale: "The slope is the change in y divided by the change in x. Using the two points: $m = \\frac{9 - 5}{4 - 2} = \\frac{4}{2} = 2$."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Graphs & Functions",
  id: "math_graphs_07",
  title: "Graphs & Functions: Quiz 7",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which ordered pair is a solution to the equation $y = x + 5$?",
      answerOptions: [
        { text: "(2, 7)", isCorrect: true, rationale: "If x=2, y = 2 + 5 = 7." },
        { text: "(7, 2)", isCorrect: false, rationale: "This reverses x and y." },
        { text: "(5, 0)", isCorrect: false, rationale: "If x=5, y=10." },
        { text: "(0, -5)", isCorrect: false, rationale: "If x=0, y=5." }
      ],
      rationale: "Substitute the x-coordinate from the ordered pair into the equation and check if it yields the correct y-coordinate. For (2, 7): y = 2 + 5 = 7. This matches."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is the slope of the line that passes through (1, 3) and (4, 9)?",
      correctAnswer: "2",
      rationale: "Slope = (change in y) / (change in x) = (9 - 3) / (4 - 1) = 6 / 3 = 2."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Given the function $f(x) = 3x^2 - 5$, what is the value of $f(-2)$?",
      answerOptions: [
        { text: "-11", isCorrect: false, rationale: "This is 3(-2)-5." },
        { text: "1", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "7", isCorrect: true, rationale: "f(-2) = 3$(-2)^2$ - 5 = 3(4) - 5 = 12 - 5 = 7." },
        { text: "31", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Substitute -2 for x in the function: f(-2) = 3$(-2)^2$ - 5 = 3(4) - 5 = 12 - 5 = 7."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the y-intercept of the line $2x - 3y = 12$?",
      correctAnswer: "-4",
      rationale: "To find the y-intercept, set x = 0. The equation becomes -3y = 12. Divide by -3 to get y = -4."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of the following lines is parallel to the line $y = 4x - 1$?",
      answerOptions: [
        { text: "$y = -4x + 2$", isCorrect: false, rationale: "This line has a different slope." },
        { text: "$y = 4x + 5$", isCorrect: true, rationale: "Parallel lines have the same slope. This line also has a slope of 4." },
        { text: "$y = (1/4)x - 1$", isCorrect: false, rationale: "This is a perpendicular line." },
        { text: "$y = x + 4$", isCorrect: false, rationale: "This line has a different slope." }
      ],
      rationale: "Parallel lines have the same slope. The given line has a slope of 4. This option is the only other line with a slope of 4."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "What is the equation of the line that passes through the origin and has a slope of -3?",
      answerOptions: [
        { text: "$y = -3x$", isCorrect: true, rationale: "A line passing through the origin has a y-intercept of 0. So, y = -3x + 0." },
        { text: "$y = -3x + 1$", isCorrect: false, rationale: "This line does not pass through the origin." },
        { text: "$y = x - 3$", isCorrect: false, rationale: "This has the wrong slope." },
        { text: "$y = 3x$", isCorrect: false, rationale: "This has the wrong slope." }
      ],
      rationale: "A line that passes through the origin (0,0) has a y-intercept of 0. Using the slope-intercept form y = mx + b, the equation is y = -3x + 0, which simplifies to y = -3x."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "If $f(x) = 2x$ and $g(x) = x - 1$, find $f(g(4))$.",
      correctAnswer: "6",
      rationale: "First, find g(4): g(4) = 4 - 1 = 3. Then, find f(3): f(3) = 2 * 3 = 6."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "The vertex of a parabola is at (2, -5). What is the axis of symmetry?",
      answerOptions: [
        { text: "x = 2", isCorrect: true, rationale: "The axis of symmetry for a parabola is a vertical line that passes through the vertex. Its equation is x = h, where h is the x-coordinate of the vertex." },
        { text: "y = -5", isCorrect: false, rationale: "This is a horizontal line through the vertex." },
        { text: "x = -5", isCorrect: false, rationale: "This uses the y-coordinate." },
        { text: "y = 2", isCorrect: false, rationale: "This uses the x-coordinate for a horizontal line." }
      ],
      rationale: "The axis of symmetry of a parabola is the vertical line that passes through its vertex. The equation of this line is x = h, where h is the x-coordinate of the vertex. So, the axis of symmetry is x = 2."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A bank account balance B(t) after t years is modeled by $B(t) = 500(1.03)^t$. What is the balance after 2 years?",
      correctAnswer: "$530.45",
      rationale: "Substitute 2 for t: B(2) = 500 * $(1.03)^2$ = 500 * 1.0609 = 530.45."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the midpoint of the line segment with endpoints (-2, 4) and (6, 8)?",
      answerOptions: [
        { text: "(2, 6)", isCorrect: true, rationale: "Midpoint = ((-2+6)/2, (4+8)/2) = (4/2, 12/2) = (2, 6)." },
        { text: "(4, 12)", isCorrect: false, rationale: "This is the sum of the coordinates." },
        { text: "(8, 4)", isCorrect: false, rationale: "This is the difference of the coordinates." },
        { text: "(4, 2)", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "The midpoint formula is $(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2})$. So, the midpoint is $(\\frac{-2+6}{2}, \\frac{4+8}{2}) = (\\frac{4}{2}, \\frac{12}{2}) = (2, 6)$."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Which of the following functions has a y-intercept of -2?",
      answerOptions: [
        { text: "$y = -2x$", isCorrect: false, rationale: "The y-intercept is 0." },
        { text: "$y = x - 2$", isCorrect: true, rationale: "In y=mx+b form, b=-2." },
        { text: "$y = 2x + 1$", isCorrect: false, rationale: "The y-intercept is 1." },
        { text: "$2x + 3y = 6$", isCorrect: false, rationale: "The y-intercept is 2." }
      ],
      rationale: "The y-intercept is the value of y when x=0. For y = x - 2, if x=0, y = -2."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A linear function passes through (0, 5) and has a slope of -1/2. What is its value at x=4?",
      answerOptions: [
        { text: "1", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "3", isCorrect: true, rationale: "The equation is y = (-1/2)x + 5. At x=4, y = (-1/2)(4) + 5 = -2 + 5 = 3." },
        { text: "4", isCorrect: false, rationale: "This is the input value." },
        { text: "5", isCorrect: false, rationale: "This is the y-intercept." }
      ],
      rationale: "The equation of the line is y = mx + b. We are given m = -1/2 and the y-intercept b = 5. So, y = (-1/2)x + 5. To find the value at x=4, substitute it into the equation: y = (-1/2)(4) + 5 = -2 + 5 = 3."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Graphs & Functions",
  id: "math_graphs_08",
  title: "Graphs & Functions: Quiz 8",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the y-intercept of the line $y = -4x + 8$?",
      answerOptions: [
        { text: "-4", isCorrect: false, rationale: "This is the slope." },
        { text: "2", isCorrect: false, rationale: "This is the x-intercept." },
        { text: "8", isCorrect: true, rationale: "In y=mx+b form, b is the y-intercept." },
        { text: "4", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "The equation is in slope-intercept form (y = mx + b), where \'b\' is the y-intercept. In this case, b=8."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Given $f(x) = 20 - 3x$, find $f(5)$.",
      correctAnswer: "5",
      rationale: "Substitute 5 for x: f(5) = 20 - 3(5) = 20 - 15 = 5."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the slope of a line passing through (-2, -1) and (4, 3)?",
      answerOptions: [
        { text: "2/3", isCorrect: true, rationale: "Slope = (3 - (-1)) / (4 - (-2)) = 4 / 6 = 2/3." },
        { text: "3/2", isCorrect: false, rationale: "This is the reciprocal of the slope." },
        { text: "-2/3", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "1", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "The slope is the change in y divided by the change in x. $m = \\frac{3 - (-1)}{4 - (-2)} = \\frac{4}{6} = \\frac{2}{3}$."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "Find the x-intercept of the line $y = 2x - 10$.",
      correctAnswer: "5",
      rationale: "Set y=0: 0 = 2x - 10. 10 = 2x. x = 5."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of the following functions is linear?",
      answerOptions: [
        { text: "$y = x^2 + 1$", isCorrect: false, rationale: "This is a quadratic function." },
        { text: "$y = 3x - 4$", isCorrect: true, rationale: "A linear function has a constant rate of change (slope)." },
        { text: "$y = 1/x$", isCorrect: false, rationale: "This is a rational function." },
        { text: "$y = |x|$", isCorrect: false, rationale: "This is an absolute value function." }
      ],
      rationale: "A linear function can be written in the form y = mx + b, where m and b are constants. This equation fits that form."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A line is perpendicular to $y = -4x + 1$ and passes through (8, 2). What is its equation?",
      answerOptions: [
        { text: "$y = 4x - 30$", isCorrect: false, rationale: "This has an incorrect slope." },
        { text: "$y = (-1/4)x + 4$", isCorrect: false, rationale: "This is a parallel line." },
        { text: "$y = (1/4)x$", isCorrect: true, rationale: "The perpendicular slope is 1/4. Using y=mx+b: 2 = (1/4)(8) + b -> 2 = 2 + b -> b=0." },
        { text: "$y = (1/4)x + 2$", isCorrect: false, rationale: "This does not pass through the given point." }
      ],
      rationale: "The slope of the given line is -4. The slope of a perpendicular line is the negative reciprocal, which is 1/4. Use the point-slope form y - y1 = m(x - x1): y - 2 = (1/4)(x - 8). y - 2 = (1/4)x - 2. So, y = (1/4)x."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Find the value of $f(x) = x^2 - 3x$ when $x=-4$.",
      correctAnswer: "28",
      rationale: "f(-4) = $(-4)^2$ - 3(-4) = 16 + 12 = 28."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Which of these points is in the solution set of the inequality $y < 2x - 1$?",
      answerOptions: [
        { text: "(3, 5)", isCorrect: false, rationale: "5 is not less than 2(3)-1=5." },
        { text: "(2, 3)", isCorrect: false, rationale: "3 is not less than 2(2)-1=3." },
        { text: "(4, 6)", isCorrect: true, rationale: "6 is less than 2(4)-1=7." },
        { text: "(1, 1)", isCorrect: false, rationale: "1 is not less than 2(1)-1=1." }
      ],
      rationale: "Plug each point into the inequality. For (4, 6): 6 < 2(4) - 1. 6 < 8 - 1. 6 < 7. This is a true statement."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A phone\'s value V(t) after t years is given by $V(t) = 800 - 150t$. What is the phone\'s value after 3 years?",
      correctAnswer: "$350",
      rationale: "V(3) = 800 - 150(3) = 800 - 450 = 350."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the distance between the points (-3, 2) and (3, 10).",
      answerOptions: [
        { text: "8", isCorrect: false, rationale: "This is the change in y." },
        { text: "10", isCorrect: true, rationale: "d = sqrt($(3 - (-3))^2 + (10 - 2)^2$) = sqrt($6^2 + 8^2$) = sqrt(36+64) = sqrt(100) = 10." },
        { text: "14", isCorrect: false, rationale: "This is 6+8." },
        { text: "100", isCorrect: false, rationale: "This is the distance squared." }
      ],
      rationale: "Use the distance formula: $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$. $d = \\sqrt{(3 - (-3))^2 + (10 - 2)^2} = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "What is the domain of the function $f(x) = \\frac{1}{x-5}$?",
      answerOptions: [
        { text: "All real numbers", isCorrect: false, rationale: "The function is undefined at x=5." },
        { text: "All real numbers except 5", isCorrect: true, rationale: "The denominator cannot be zero, so x cannot be 5." },
        { text: "All real numbers except 0", isCorrect: false, rationale: "The function is defined at x=0." },
        { text: "x > 5", isCorrect: false, rationale: "The function is also defined for x < 5." }
      ],
      rationale: "The domain of a rational function is all real numbers except for the values that make the denominator zero. In this case, x - 5 cannot equal 0, so x cannot equal 5."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If a function has a constant slope, it is a:",
      answerOptions: [
        { text: "Quadratic function", isCorrect: false, rationale: "A quadratic function has a changing slope." },
        { text: "Linear function", isCorrect: true, rationale: "A linear function is defined by its constant slope." },
        { text: "Exponential function", isCorrect: false, rationale: "An exponential function has a changing slope." },
        { text: "Absolute value function", isCorrect: false, rationale: "An absolute value function has two different slopes." }
      ],
      rationale: "A key characteristic of a linear function is that its rate of change, or slope, is constant."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Graphs & Functions",
  id: "math_graphs_09",
  title: "Graphs & Functions: Quiz 9",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the slope of the line with equation $y = 8 - x$?",
      answerOptions: [
        { text: "8", isCorrect: false, rationale: "This is the y-intercept." },
        { text: "1", isCorrect: false, rationale: "This is the coefficient of x if it were positive." },
        { text: "-1", isCorrect: true, rationale: "The equation can be rewritten as y = -1x + 8. The slope is -1." },
        { text: "-8", isCorrect: false, rationale: "This is the x-intercept." }
      ],
      rationale: "The slope-intercept form is y = mx + b. Rearranging the equation gives y = -x + 8, so the slope (m) is -1."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "If $f(x) = 5x + 1$, what is $f(-1)$?",
      correctAnswer: "-4",
      rationale: "Substitute -1 for x: f(-1) = 5(-1) + 1 = -5 + 1 = -4."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A line passes through (4, 7) and (6, 1). What is its slope?",
      answerOptions: [
        { text: "-3", isCorrect: true, rationale: "Slope = (1 - 7) / (6 - 4) = -6 / 2 = -3." },
        { text: "-1/3", isCorrect: false, rationale: "This is the negative reciprocal." },
        { text: "3", isCorrect: false, rationale: "This has the wrong sign." },
        { text: "1/3", isCorrect: false, rationale: "This is the reciprocal." }
      ],
      rationale: "The slope is the change in y divided by the change in x: $m = \\frac{1 - 7}{6 - 4} = \\frac{-6}{2} = -3$."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the y-intercept of a line with slope 3 that passes through (2, 5)?",
      correctAnswer: "-1",
      rationale: "Using y = mx + b: 5 = 3(2) + b. 5 = 6 + b. b = -1."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of these functions will have a U-shaped graph?",
      answerOptions: [
        { text: "$y = 3x$", isCorrect: false, rationale: "This is a line." },
        { text: "$y = x^3$", isCorrect: false, rationale: "This is a cubic curve." },
        { text: "$y = x^2$", isCorrect: true, rationale: "A quadratic function (with $x^2$) has a U-shaped graph (a parabola)." },
        { text: "$y = 3^x$", isCorrect: false, rationale: "This is an exponential curve." }
      ],
      rationale: "A function with a term raised to the second power (a quadratic function) produces a U-shaped graph called a parabola."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A line is parallel to $y = (2/3)x + 1$ and passes through (6, 2). What is its equation?",
      answerOptions: [
        { text: "$y = (2/3)x - 2$", isCorrect: true, rationale: "The slope is 2/3. Using y=mx+b: 2 = (2/3)(6) + b -> 2 = 4 + b -> b=-2." },
        { text: "$y = (-3/2)x + 11$", isCorrect: false, rationale: "This is a perpendicular line." },
        { text: "$y = (2/3)x + 2$", isCorrect: false, rationale: "This does not pass through the given point." },
        { text: "$y = (2/3)x + 6$", isCorrect: false, rationale: "This does not pass through the given point." }
      ],
      rationale: "A parallel line has the same slope, 2/3. Use the point-slope form y - y1 = m(x - x1): y - 2 = (2/3)(x - 6). y - 2 = (2/3)x - 4. So, y = (2/3)x - 2."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Find the x-intercept of the line $y = -4x + 12$.",
      correctAnswer: "3",
      rationale: "Set y=0: 0 = -4x + 12. 4x = 12. x = 3."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "What is the domain of the function $f(x) = \\sqrt{x+4}$?",
      answerOptions: [
        { text: "$x \\geq -4$", isCorrect: true, rationale: "The expression under the square root must be non-negative. x+4 >= 0 -> x >= -4." },
        { text: "$x > -4$", isCorrect: false, rationale: "x can be equal to -4." },
        { text: "All real numbers", isCorrect: false, rationale: "If x < -4, the value under the square root is negative." },
        { text: "$x \\leq -4$", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "For the function to be defined in the real numbers, the expression inside the square root must be greater than or equal to zero. $x+4 \\geq 0$, which means $x \\geq -4$."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A company\'s cost function is C(x) = 10x + 500, where x is the number of units produced. What is the cost of producing 50 units?",
      correctAnswer: "$1000",
      rationale: "C(50) = 10(50) + 500 = 500 + 500 = 1000."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the vertex of the parabola $y = x^2 + 4x + 3$.",
      answerOptions: [
        { text: "(-2, -1)", isCorrect: true, rationale: "The x-coordinate of the vertex is -b/(2a) = -4/2 = -2. y = (-2)² + 4(-2) + 3 = 4 - 8 + 3 = -1." },
        { text: "(2, 15)", isCorrect: false, rationale: "This uses x=2." },
        { text: "(-4, 3)", isCorrect: false, rationale: "This uses b and c." },
        { text: "(4, 35)", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "The x-coordinate of the vertex is given by the formula $x = \\frac{-b}{2a}$. Here, a=1 and b=4, so $x = \\frac{-4}{2(1)} = -2$. To find the y-coordinate, substitute x=-2 into the equation: y = $(-2)^2$ + 4(-2) + 3 = 4 - 8 + 3 = -1. The vertex is (-2, -1)."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Which function represents exponential decay?",
      answerOptions: [
        { text: "$y = 2x$", isCorrect: false, rationale: "This is linear growth." },
        { text: "$y = (1.5)^x$", isCorrect: false, rationale: "The base is greater than 1, so this is exponential growth." },
        { text: "$y = (0.5)^x$", isCorrect: true, rationale: "The base is between 0 and 1, which represents exponential decay." },
        { text: "$y = x^2$", isCorrect: false, rationale: "This is a quadratic function." }
      ],
      rationale: "An exponential function of the form $y = b^x$ represents decay when the base \'b\' is between 0 and 1."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A function is defined by the set of points {(-1, 2), (0, 1), (1, 2), (2, 5)}. What is the value of f(1)?",
      answerOptions: [
        { text: "5", isCorrect: false, rationale: "This is f(2)." },
        { text: "1", isCorrect: false, rationale: "This is f(0)." },
        { text: "2", isCorrect: true, rationale: "The point (1, 2) indicates that when the input (x) is 1, the output (y or f(x)) is 2." },
        { text: "-1", isCorrect: false, rationale: "This is an input value." }
      ],
      rationale: "The notation f(1) asks for the output of the function when the input is 1. The point (1, 2) shows that the output is 2 when the input is 1."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Graphs & Functions",
  id: "math_graphs_10",
  title: "Graphs & Functions: Quiz 10",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the y-intercept of the line $y = x$? ",
      answerOptions: [
        { text: "1", isCorrect: false, rationale: "The slope is 1." },
        { text: "0", isCorrect: true, rationale: "The equation is y = 1x + 0. The y-intercept is 0." },
        { text: "-1", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "Cannot be determined", isCorrect: false, rationale: "The y-intercept is determined." }
      ],
      rationale: "The line y=x passes through the origin (0,0), so its y-intercept is 0."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "If $f(x) = 100 / x$, what is $f(20)$?",
      correctAnswer: "5",
      rationale: "Substitute 20 for x: f(20) = 100 / 20 = 5."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the slope of a line passing through the points (3, 7) and (5, 7).",
      answerOptions: [
        { text: "0", isCorrect: true, rationale: "The y-coordinates are the same, so this is a horizontal line with a slope of 0." },
        { text: "1", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "Undefined", isCorrect: false, rationale: "This would be a vertical line." },
        { text: "7", isCorrect: false, rationale: "This is the y-coordinate." }
      ],
      rationale: "The slope is the change in y divided by the change in x. $m = \\frac{7 - 7}{5 - 3} = \\frac{0}{2} = 0$. This indicates a horizontal line."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the equation of a line with a slope of 5 and a y-intercept of -1?",
      correctAnswer: "y = 5x - 1",
      rationale: "Using the slope-intercept form y = mx + b, substitute m=5 and b=-1."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of these points is NOT on the graph of the function $y = x^2 + 1$?",
      answerOptions: [
        { text: "(0, 1)", isCorrect: false, rationale: "If x=0, y = $0^2$+1=1. This point is on the graph." },
        { text: "(2, 5)", isCorrect: false, rationale: "If x=2, y = $2^2$+1=5. This point is on the graph." },
        { text: "(-1, 2)", isCorrect: false, rationale: "If x=-1, y = $(-1)^2$+1=2. This point is on the graph." },
        { text: "(1, 3)", isCorrect: true, rationale: "If x=1, y = $1^2$+1=2. So (1, 3) is not on the graph." }
      ],
      rationale: "Plug the x-coordinate of each point into the equation to see if it produces the correct y-coordinate. For (1, 3): y = $(1)^2$ + 1 = 2. Since 2 is not equal to 3, this point is not on the graph."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "The cost to produce \'x\' items is given by the function $C(x) = 20x + 1000$. What is the cost of producing 200 items?",
      answerOptions: [
        { text: "$1020", isCorrect: false, rationale: "This is C(1)." },
        { text: "$3000", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$5000", isCorrect: true, rationale: "C(200) = 20(200) + 1000 = 4000 + 1000 = 5000." },
        { text: "$21000", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Substitute 200 for x in the cost function: C(200) = 20(200) + 1000 = 4000 + 1000 = $5,000."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Find the x-intercept for the line $5x + 2y = 20$.",
      correctAnswer: "4",
      rationale: "To find the x-intercept, set y = 0. 5x + 2(0) = 20. 5x = 20. x = 4."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "A function is defined by $f(x) = 2^x$. What type of function is this?",
      answerOptions: [
        { text: "Linear", isCorrect: false, rationale: "A linear function has the form y = mx + b." },
        { text: "Quadratic", isCorrect: false, rationale: "A quadratic function has the form y = a$x^2$ + bx + c." },
        { text: "Exponential", isCorrect: true, rationale: "A function with the variable in the exponent is an exponential function." },
        { text: "Absolute Value", isCorrect: false, rationale: "An absolute value function involves |x|." }
      ],
      rationale: "A function where the independent variable (x) appears in the exponent is called an exponential function. This function shows exponential growth."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A line with a slope of -1 passes through the point (5, 5). What is its y-intercept?",
      correctAnswer: "10",
      rationale: "Using y = mx + b: 5 = -1(5) + b. 5 = -5 + b. b = 10."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the vertex of the parabola $y = -(x+2)^2$?",
      answerOptions: [
        { text: "(2, 0)", isCorrect: false, rationale: "The x-coordinate is -2." },
        { text: "(-2, 0)", isCorrect: true, rationale: "In vertex form y=a$(x-h)^2$+k, the vertex is (h,k). Here, h=-2 and k=0." },
        { text: "(0, -4)", isCorrect: false, rationale: "This is the y-intercept." },
        { text: "(0, 4)", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "The vertex form of a parabola is y = a$(x - h)^2$ + k, where the vertex is (h, k). In this equation, h = -2 and k = 0."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Which of the following lines is perpendicular to the y-axis?",
      answerOptions: [
        { text: "x = 5", isCorrect: false, rationale: "This line is parallel to the y-axis." },
        { text: "y = 3", isCorrect: true, rationale: "A horizontal line (y=c) is perpendicular to the vertical y-axis." },
        { text: "y = x", isCorrect: false, rationale: "This line is not perpendicular to the y-axis." },
        { text: "y = -x", isCorrect: false, rationale: "This line is not perpendicular to the y-axis." }
      ],
      rationale: "The y-axis is a vertical line. A line that is perpendicular to a vertical line must be a horizontal line. The equation of a horizontal line is y = c."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If f(x) has a slope of 3 and f(2) = 8, what is f(5)?",
      answerOptions: [
        { text: "11", isCorrect: false, rationale: "This is 8+3." },
        { text: "17", isCorrect: true, rationale: "For a linear function, the change in y is slope * change in x. Change in x is 3. Change in y is 3*3=9. New y is 8+9=17." },
        { text: "15", isCorrect: false, rationale: "This is 3*5." },
        { text: "23", isCorrect: false, rationale: "This is 3*5+8." }
      ],
      rationale: "For a linear function, the change in the output is the slope times the change in the input. The change in x is 5 - 2 = 3. The change in y is slope * 3 = 3 * 3 = 9. So, f(5) = f(2) + 9 = 8 + 9 = 17."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Graphs & Functions",
  id: "math_graphs_11",
  title: "Graphs & Functions: Quiz 11",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the slope of a line that goes down 2 units for every 3 units it moves to the right?",
      answerOptions: [
        { text: "2/3", isCorrect: false, rationale: "This is a positive slope." },
        { text: "-2/3", isCorrect: true, rationale: "Slope is rise over run. Down 2 is a rise of -2, and right 3 is a run of 3." },
        { text: "3/2", isCorrect: false, rationale: "This is the reciprocal." },
        { text: "-3/2", isCorrect: false, rationale: "This is the negative reciprocal." }
      ],
      rationale: "Slope is defined as \'rise over run\'. A downward movement is a negative rise. So, the slope is -2/3."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "If $f(x) = 3x$, what is $f(10)$?",
      correctAnswer: "30",
      rationale: "Substitute 10 for x: f(10) = 3 * 10 = 30."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the equation of a line that passes through the points (1, 1) and (3, 5)?",
      answerOptions: [
        { text: "y = 2x - 1", isCorrect: true, rationale: "The slope is (5-1)/(3-1) = 2. Using y=mx+b with (1,1): 1=2(1)+b -> b=-1." },
        { text: "y = 2x + 1", isCorrect: false, rationale: "This does not pass through (1,1)." },
        { text: "y = x", isCorrect: false, rationale: "This does not have the correct slope." },
        { text: "y = 1/2x + 0.5", isCorrect: false, rationale: "This has the wrong slope." }
      ],
      rationale: "First, find the slope: m = (5 - 1) / (3 - 1) = 4 / 2 = 2. Then use the point-slope form with (1,1): y - 1 = 2(x - 1). y - 1 = 2x - 2. y = 2x - 1."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the y-intercept of the line $4x - 2y = 8$?",
      correctAnswer: "-4",
      rationale: "To find the y-intercept, set x = 0. -2y = 8. y = -4."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of these graphs would be a vertical line?",
      answerOptions: [
        { text: "y = 3", isCorrect: false, rationale: "This is a horizontal line." },
        { text: "x = 3", isCorrect: true, rationale: "An equation of the form x=c is always a vertical line." },
        { text: "y = x", isCorrect: false, rationale: "This is a diagonal line." },
        { text: "y = 3x", isCorrect: false, rationale: "This is a diagonal line." }
      ],
      rationale: "An equation of the form x = c, where c is a constant, represents a vertical line. All points on this line have an x-coordinate of 3."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "If a function is defined by $f(x) = x^2 - 4x + 3$, what is its y-intercept?",
      answerOptions: [
        { text: "(0, 3)", isCorrect: true, rationale: "The y-intercept is the value when x=0. f(0) = 3." },
        { text: "(3, 0)", isCorrect: false, rationale: "This is one of the x-intercepts." },
        { text: "(1, 0)", isCorrect: false, rationale: "This is one of the x-intercepts." },
        { text: "(2, -1)", isCorrect: false, rationale: "This is the vertex." }
      ],
      rationale: "The y-intercept of a function is the point where its graph crosses the y-axis, which occurs when x=0. For this function, f(0) = 0² - 4(0) + 3 = 3."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the slope of a line perpendicular to $y = -1/5x + 2$?",
      correctAnswer: "5",
      rationale: "The slope of the given line is -1/5. The slope of a perpendicular line is the negative reciprocal, which is 5."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "Which of the following points is a solution to the system of inequalities: $y > x$ and $x > 2$?",
      answerOptions: [
        { text: "(1, 3)", isCorrect: false, rationale: "x is not > 2." },
        { text: "(3, 1)", isCorrect: false, rationale: "y is not > x." },
        { text: "(3, 4)", isCorrect: true, rationale: "Both inequalities are satisfied: 4 > 3 and 3 > 2." },
        { text: "(2, 2)", isCorrect: false, rationale: "Neither inequality is strictly satisfied." }
      ],
      rationale: "Check each point against both inequalities. For (3, 4): Is 4 > 3? Yes. Is 3 > 2? Yes. Since both are true, this point is a solution."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A function models the height of a ball, h(t) = -16t² + 32t, where t is time in seconds. What is the height of the ball at t=1 second?",
      correctAnswer: "16",
      rationale: "h(1) = -16(1)² + 32(1) = -16 + 32 = 16."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the x-intercept of the function $f(x) = 2x - 6$?",
      answerOptions: [
        { text: "-6", isCorrect: false, rationale: "This is the y-intercept." },
        { text: "-3", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "3", isCorrect: true, rationale: "Set f(x)=0: 0=2x-6 -> 6=2x -> x=3." },
        { text: "6", isCorrect: false, rationale: "This is -y-intercept." }
      ],
      rationale: "The x-intercept is the point where the graph crosses the x-axis, which occurs when f(x) = 0. So, 0 = 2x - 6. Add 6 to both sides: 6 = 2x. Divide by 2: x = 3."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "The graph of $y = x^2$ is shifted 3 units down. What is the new equation?",
      answerOptions: [
        { text: "$y = x^2 - 3$", isCorrect: true, rationale: "A vertical shift down by k units is f(x)-k." },
        { text: "$y = x^2 + 3$", isCorrect: false, rationale: "This is a shift up." },
        { text: "$y = (x-3)^2$", isCorrect: false, rationale: "This is a shift right." },
        { text: "$y = (x+3)^2$", isCorrect: false, rationale: "This is a shift left." }
      ],
      rationale: "A vertical shift of a function f(x) down by k units is represented by the new function g(x) = f(x) - k. So, the new equation is y = x² - 3."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If a function is represented by the points {(1,2), (2,4), (3,6)}, what is the slope of the function?",
      answerOptions: [
        { text: "1", isCorrect: false, rationale: "This is the change in x." },
        { text: "2", isCorrect: true, rationale: "For every 1-unit increase in x, y increases by 2." },
        { text: "3", isCorrect: false, rationale: "This is an input value." },
        { text: "4", isCorrect: false, rationale: "This is an output value." }
      ],
      rationale: "The slope is the change in y divided by the change in x. Using the first two points: m = (4 - 2) / (2 - 1) = 2 / 1 = 2."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Graphs & Functions",
  id: "math_graphs_12",
  title: "Graphs & Functions: Quiz 12",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the slope of a line that is parallel to $y = 5x - 3$?",
      answerOptions: [
        { text: "5", isCorrect: true, rationale: "Parallel lines have the same slope." },
        { text: "-3", isCorrect: false, rationale: "This is the y-intercept." },
        { text: "-1/5", isCorrect: false, rationale: "This is the slope of a perpendicular line." },
        { text: "3", isCorrect: false, rationale: "This is an incorrect value." }
      ],
      rationale: "Parallel lines have identical slopes. The slope of the given line is 5, so a parallel line will also have a slope of 5."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "If $f(x) = 15 - x$, what is $f(15)$?",
      correctAnswer: "0",
      rationale: "Substitute 15 for x: f(15) = 15 - 15 = 0."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Which point lies on the line $y = 3x + 1$?",
      answerOptions: [
        { text: "(1, 4)", isCorrect: true, rationale: "If x=1, y=3(1)+1=4." },
        { text: "(2, 5)", isCorrect: false, rationale: "If x=2, y=3(2)+1=7." },
        { text: "(0, 0)", isCorrect: false, rationale: "If x=0, y=1." },
        { text: "(-1, -1)", isCorrect: false, rationale: "If x=-1, y=3(-1)+1=-2." }
      ],
      rationale: "Plug in the x-coordinate from each point and see if it produces the correct y-coordinate. For (1, 4): y = 3(1) + 1 = 4. This matches."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "What is the slope of a line passing through (4, 2) and (6, 10)?",
      correctAnswer: "4",
      rationale: "Slope = (10-2)/(6-4) = 8/2 = 4."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the y-intercept of the function $f(x) = x^2 - 9$?",
      answerOptions: [
        { text: "3", isCorrect: false, rationale: "This is an x-intercept." },
        { text: "-3", isCorrect: false, rationale: "This is an x-intercept." },
        { text: "9", isCorrect: false, rationale: "This is an incorrect value." },
        { text: "-9", isCorrect: true, rationale: "The y-intercept is the value when x=0. f(0) = -9." }
      ],
      rationale: "To find the y-intercept, set x=0. f(0) = 0² - 9 = -9."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A function is defined by $f(x) = 2x - 3$. If $f(x) = 7$, what is the value of x?",
      answerOptions: [
        { text: "2", isCorrect: false, rationale: "f(2) = 1." },
        { text: "5", isCorrect: true, rationale: "2x - 3 = 7 -> 2x = 10 -> x=5." },
        { text: "11", isCorrect: false, rationale: "f(11) = 19." },
        { text: "17", isCorrect: false, rationale: "f(17) = 31." }
      ],
      rationale: "Set the function equal to 7: 2x - 3 = 7. Add 3 to both sides: 2x = 10. Divide by 2: x = 5."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the x-intercept of the line $y = 5x + 15$?",
      correctAnswer: "-3",
      rationale: "Set y=0: 0 = 5x + 15 -> -15 = 5x -> x=-3."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "The graph of $y = (x+1)^2 - 2$ is a parabola. What is its vertex?",
      answerOptions: [
        { text: "(1, -2)", isCorrect: false, rationale: "The x-coordinate is -1." },
        { text: "(-1, -2)", isCorrect: true, rationale: "The vertex form y=(x-h)²+k gives the vertex (h,k)." },
        { text: "(1, 2)", isCorrect: false, rationale: "Incorrect signs." },
        { text: "(-1, 2)", isCorrect: false, rationale: "The y-coordinate is -2." }
      ],
      rationale: "The vertex form of a parabola is y = a(x - h)² + k, where the vertex is (h, k). In this equation, h = -1 and k = -2."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A gym membership costs $25 per month. Write a function C(m) for the total cost of \'m\' months.",
      correctAnswer: "C(m) = 25m",
      rationale: "The total cost is the monthly cost multiplied by the number of months."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Find the equation of a line with slope -2 that passes through (1, 3).",
      answerOptions: [
        { text: "y = -2x + 1", isCorrect: false, rationale: "This does not pass through (1,3)." },
        { text: "y = -2x + 5", isCorrect: true, rationale: "Using y=mx+b: 3 = -2(1)+b -> b=5." },
        { text: "y = x + 2", isCorrect: false, rationale: "This has the wrong slope." },
        { text: "y = 3x - 2", isCorrect: false, rationale: "This has the wrong slope." }
      ],
      rationale: "Use the point-slope form y - y1 = m(x - x1): y - 3 = -2(x - 1). y - 3 = -2x + 2. y = -2x + 5."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "The range of a function is:",
      answerOptions: [
        { text: "All possible x-values.", isCorrect: false, rationale: "This is the domain." },
        { text: "All possible y-values.", isCorrect: true, rationale: "The range is the set of all possible output values (y-values)." },
        { text: "The x-intercepts.", isCorrect: false, rationale: "These are specific points." },
        { text: "The y-intercepts.", isCorrect: false, rationale: "This is a specific point." }
      ],
      rationale: "The range of a function is the set of all possible output values (y-values) that the function can produce."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is the slope of the line $3x - y = 2$?",
      answerOptions: [
        { text: "3", isCorrect: true, rationale: "Rewrite as y = 3x - 2. The slope is 3." },
        { text: "-1", isCorrect: false, rationale: "This is the coefficient of y." },
        { text: "-2", isCorrect: false, rationale: "This is the y-intercept." },
        { text: "2/3", isCorrect: false, rationale: "This is the x-intercept." }
      ],
      rationale: "To find the slope, rewrite the equation in slope-intercept form (y = mx + b). -y = -3x + 2. y = 3x - 2. The slope (m) is 3."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Number Sense & Operations",
  id: "math_number_sense_01",
  title: "Number Sense & Operations: Quiz 1",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the absolute value of -15?",
      answerOptions: [
        { text: "15", isCorrect: true, rationale: "The absolute value of a number is its distance from zero, which is always positive." },
        { text: "-15", isCorrect: false, rationale: "The absolute value is always a non-negative number." },
        { text: "0", isCorrect: false, rationale: "Only the absolute value of 0 is 0." },
        { text: "1.5", isCorrect: false, rationale: "This is a decimal representation, not the absolute value." }
      ],
      rationale: "The absolute value of -15, written as |-15|, is its distance from 0 on the number line, which is 15."
    },
    {
      questionNumber: 2,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which of the following is equivalent to $3 \\frac{1}{4}$?",
      answerOptions: [
        { text: "3.14", isCorrect: false, rationale: "This is an approximation of pi, not the decimal for 1/4." },
        { text: "3.25", isCorrect: true, rationale: "The fraction 1/4 is equal to 0.25, so 3 1/4 is 3.25." },
        { text: "3.50", isCorrect: false, rationale: "3.50 is equivalent to 3 1/2." },
        { text: "3.75", isCorrect: false, rationale: "3.75 is equivalent to 3 3/4." }
      ],
      rationale: "To convert the fraction 1/4 to a decimal, divide 1 by 4, which equals 0.25. Add this to the whole number 3 to get 3.25."
    },
    {
      questionNumber: 3,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Evaluate the expression: $12 + (5 - 2) \\times 3^2$.",
      correctAnswer: "39",
      rationale: "Following the order of operations (PEMDAS): Parentheses (5-2=3), Exponents ($3^2$=9), Multiplication (3*9=27), Addition (12+27=39)."
    },
    {
      questionNumber: 4,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A jacket that originally costs $80 is on sale for 25% off. What is the sale price?",
      answerOptions: [
        { text: "$20", isCorrect: false, rationale: "This is the discount amount, not the final price." },
        { text: "$55", isCorrect: false, rationale: "This is a 31.25% discount, not 25%." },
        { text: "$60", isCorrect: true, rationale: "The discount is 0.25 * $80 = $20. The sale price is $80 - $20 = $60." },
        { text: "$100", isCorrect: false, rationale: "This is the price after a 25% markup, not a discount." }
      ],
      rationale: "Calculate the discount: 25% of $80 is $20. Subtract the discount from the original price: $80 - $20 = $60."
    },
    {
      questionNumber: 5,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is $\\frac{3}{5}$ as a percentage?",
      correctAnswer: "60%",
      rationale: "To convert a fraction to a percentage, divide the numerator by the denominator and multiply by 100. (3 / 5) * 100 = 0.6 * 100 = 60%."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "The price of a stock increased from $50 to $58. What was the percent increase?",
      answerOptions: [
        { text: "8%", isCorrect: false, rationale: "This is the difference in price, not the percent increase." },
        { text: "13.8%", isCorrect: false, rationale: "This results from dividing the old price by the new price." },
        { text: "16%", isCorrect: true, rationale: "The increase is $8. The percent increase is (8 / 50) * 100 = 16%." },
        { text: "84%", isCorrect: false, rationale: "This incorrectly calculates the percent change." }
      ],
      rationale: "The formula for percent increase is [(New Price - Original Price) / Original Price] * 100. So, [($58 - $50) / $50] * 100 = ($8 / $50) * 100 = 0.16 * 100 = 16%."
    },
    {
      questionNumber: 7,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Simplify the expression: $5 \\times (4 + 2) - 10 \\div 2$.",
      answerOptions: [
        { text: "10", isCorrect: false, rationale: "This result comes from subtracting before dividing." },
        { text: "20", isCorrect: false, rationale: "This result ignores the order of operations." },
        { text: "25", isCorrect: true, rationale: "Parentheses first: 5 * 6 - 10 / 2. Then multiplication/division: 30 - 5. Finally, subtraction: 25." },
        { text: "30", isCorrect: false, rationale: "This result ignores the division operation." }
      ],
      rationale: "Using PEMDAS: Parentheses (4+2=6), then Multiplication/Division from left to right (5*6=30, 10/2=5), then Addition/Subtraction (30-5=25)."
    },
    {
      questionNumber: 8,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A recipe calls for $2 \\frac{1}{2}$ cups of flour, but you only want to make half the recipe. How many cups of flour do you need?",
      correctAnswer: "1.25 cups",
      rationale: "First, convert $2 \\frac{1}{2}$ to a decimal, which is 2.5. Then, divide by 2 to make half the recipe: 2.5 / 2 = 1.25 cups."
    },
    {
      questionNumber: 9,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which of the following numbers is an integer?",
      answerOptions: [
        { text: "-3.5", isCorrect: false, rationale: "This is a decimal, not an integer." },
        { text: "$\\frac{1}{2}$", isCorrect: false, rationale: "This is a fraction, not an integer." },
        { text: "-8", isCorrect: true, rationale: "Integers are whole numbers, including negatives." },
        { text: "$\\sqrt{2}$", isCorrect: false, rationale: "This is an irrational number." }
      ],
      rationale: "Integers are the set of whole numbers and their opposites (...-3, -2, -1, 0, 1, 2, 3...). -8 is an integer."
    },
    {
      questionNumber: 10,
      type: "fillIn",
      calculator: false,
      difficulty: "hard",
      question: "A car travels 150 miles on 5 gallons of gas. What is the car\'s fuel efficiency in miles per gallon (MPG)?",
      correctAnswer: "30 MPG",
      rationale: "To find the miles per gallon, divide the total miles traveled by the number of gallons used: 150 miles / 5 gallons = 30 MPG."
    },
    {
        questionNumber: 11,
        type: "multipleChoice",
        calculator: true,
        difficulty: "hard",
        question: "A survey of 200 people found that 65% prefer coffee to tea. How many people prefer tea?",
        answerOptions: [
          { text: "35", isCorrect: false, rationale: "This is the percentage of people who prefer tea, not the number of people." },
          { text: "65", isCorrect: false, rationale: "This is the percentage of people who prefer coffee." },
          { text: "70", isCorrect: true, rationale: "If 65% prefer coffee, then 100% - 65% = 35% prefer tea. 35% of 200 is 0.35 * 200 = 70." },
          { text: "130", isCorrect: false, rationale: "This is the number of people who prefer coffee." }
        ],
        rationale: "First, find the percentage of people who prefer tea: 100% - 65% = 35%. Then, calculate 35% of 200: 0.35 * 200 = 70 people."
      },
      {
        questionNumber: 12,
        type: "multipleChoice",
        calculator: false,
        difficulty: "medium",
        question: "Estimate the result of $48.7 \\times 10.2$.",
        answerOptions: [
          { text: "50", isCorrect: false, rationale: "This is too low. It\'s closer to 50 * 1." },
          { text: "500", isCorrect: true, rationale: "Rounding 48.7 to 50 and 10.2 to 10 gives an estimate of 50 * 10 = 500." },
          { text: "5000", isCorrect: false, rationale: "This is too high. It\'s closer to 50 * 100." },
          { text: "487", isCorrect: false, rationale: "This is simply multiplying by 10, ignoring the .2" }
        ],
        rationale: "To estimate, round 48.7 to 50 and 10.2 to 10. The estimated product is 50 * 10 = 500. The actual answer is 496.74."
      }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Number Sense & Operations",
  id: "math_number_sense_02",
  title: "Number Sense & Operations: Quiz 2",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which fraction is the largest?",
      answerOptions: [
        { text: "$\\frac{1}{2}$", isCorrect: false, rationale: "1/2 is equal to 4/8." },
        { text: "$\\frac{3}{8}$", isCorrect: false, rationale: "3/8 is smaller than 5/8." },
        { text: "$\\frac{5}{8}$", isCorrect: true, rationale: "With a common denominator, the fraction with the largest numerator is the largest. 5/8 is greater than 4/8 (1/2) and 3/8." },
        { text: "$\\frac{1}{4}$", isCorrect: false, rationale: "1/4 is equal to 2/8." }
      ],
      rationale: "To compare the fractions, find a common denominator, which is 8. The fractions become 4/8, 3/8, 5/8, and 2/8. The largest is 5/8."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is 75% of 40?",
      correctAnswer: "30",
      rationale: "To find 75% of 40, convert the percentage to a decimal (0.75) and multiply by the number: 0.75 * 40 = 30."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Evaluate: $5 - (-3) + 2$.",
      answerOptions: [
        { text: "0", isCorrect: false, rationale: "This is the result if you subtract 3 and 2." },
        { text: "4", isCorrect: false, rationale: "This is the result if you subtract 3 from 5." },
        { text: "10", isCorrect: true, rationale: "Subtracting a negative is the same as adding: 5 + 3 + 2 = 10." },
        { text: "6", isCorrect: false, rationale: "This is the result of 5-3+2+2." }
      ],
      rationale: "Subtracting a negative number is equivalent to addition. So, the expression becomes 5 + 3 + 2, which equals 10."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A lunch bill is $24.50. If you add a 15% tip, what is the total cost?",
      correctAnswer: "$28.18",
      rationale: "First, calculate the tip: 15% of $24.50 is 0.15 * 24.50 = $3.675. Round to $3.68. Then add the tip to the bill: $24.50 + $3.68 = $28.18."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the result of $\\frac{2}{3} \\div \\frac{1}{4}$?",
      answerOptions: [
        { text: "$\\frac{1}{6}$", isCorrect: false, rationale: "This is the result of multiplication, not division." },
        { text: "$\\frac{3}{8}$", isCorrect: false, rationale: "This is the result of inverting the first fraction." },
        { text: "$\\frac{8}{3}$", isCorrect: true, rationale: "To divide by a fraction, multiply by its reciprocal: 2/3 * 4/1 = 8/3." },
        { text: "$\\frac{2}{12}$", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "To divide fractions, multiply the first fraction by the reciprocal of the second. So, $\\frac{2}{3} \\times \\frac{4}{1} = \\frac{8}{3}$."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "If a car\'s value depreciates by 10% each year, what is the value of a $20,000 car after 2 years?",
      answerOptions: [
        { text: "$16,000", isCorrect: false, rationale: "This is a 20% total depreciation, but it doesn\'t account for compounding." },
        { text: "$16,200", isCorrect: true, rationale: "Year 1: $20,000 * 0.9 = $18,000. Year 2: $18,000 * 0.9 = $16,200." },
        { text: "$18,000", isCorrect: false, rationale: "This is the value after only one year." },
        { text: "$19,800", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "After the first year, the value is 90% of the original: $20,000 * 0.90 = $18,000. After the second year, the value is 90% of the new value: $18,000 * 0.90 = $16,200."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Order the following from least to greatest: 0.5, $\\frac{2}{5}$, 45%, 0.42.",
      correctAnswer: "2/5, 0.42, 45%, 0.5",
      rationale: "Convert all to decimals: 2/5 = 0.4, 45% = 0.45. The order is 0.4, 0.42, 0.45, 0.5. This corresponds to 2/5, 0.42, 45%, 0.5."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which number is a prime number?",
      answerOptions: [
        { text: "9", isCorrect: false, rationale: "9 is divisible by 3." },
        { text: "15", isCorrect: false, rationale: "15 is divisible by 3 and 5." },
        { text: "17", isCorrect: true, rationale: "17 is only divisible by 1 and itself." },
        { text: "21", isCorrect: false, rationale: "21 is divisible by 3 and 7." }
      ],
      rationale: "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. 17 fits this definition."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: false,
      difficulty: "hard",
      question: "What is the least common multiple (LCM) of 12 and 18?",
      correctAnswer: "36",
      rationale: "The multiples of 12 are 12, 24, 36, 48... The multiples of 18 are 18, 36, 54... The least common multiple is 36."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A computer is priced at $500. If the sales tax is 8%, what is the total cost?",
      answerOptions: [
        { text: "$40", isCorrect: false, rationale: "This is the sales tax amount, not the total cost." },
        { text: "$508", isCorrect: false, rationale: "This is the result of an incorrect calculation." },
        { text: "$540", isCorrect: true, rationale: "The sales tax is 0.08 * $500 = $40. The total cost is $500 + $40 = $540." },
        { text: "$900", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Calculate the sales tax: 8% of $500 is $40. Add the tax to the price: $500 + $40 = $540."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Simplify: $\\sqrt{64} + \\sqrt{36}$.",
      answerOptions: [
        { text: "10", isCorrect: false, rationale: "This is the square root of 100." },
        { text: "14", isCorrect: true, rationale: "The square root of 64 is 8, and the square root of 36 is 6. 8 + 6 = 14." },
        { text: "24", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "100", isCorrect: false, rationale: "This is the sum of 64 and 36." }
      ],
      rationale: "First, find the square roots: sqrt(64) = 8 and sqrt(36) = 6. Then add the results: 8 + 6 = 14."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "What is $2^3 \\times 2^4$?",
      answerOptions: [
        { text: "$2^7$", isCorrect: true, rationale: "When multiplying powers with the same base, you add the exponents. 3 + 4 = 7." },
        { text: "$2^{12}$", isCorrect: false, rationale: "This is the result of multiplying the exponents." },
        { text: "$4^7$", isCorrect: false, rationale: "The base should not change." },
        { text: "$4^{12}$", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "According to the laws of exponents, when you multiply two powers with the same base, you add the exponents. So, $2^3 \\times 2^4 = 2^{3+4} = 2^7$."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Number Sense & Operations",
  id: "math_number_sense_03",
  title: "Number Sense & Operations: Quiz 3",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the value of the digit 7 in the number 4,725.3?",
      answerOptions: [
        { text: "70", isCorrect: false, rationale: "The digit is in the hundreds place, not the tens place." },
        { text: "700", isCorrect: true, rationale: "The 7 is in the hundreds place, so its value is 700." },
        { text: "7", isCorrect: false, rationale: "This would be the value if it were in the ones place." },
        { text: "0.7", isCorrect: false, rationale: "This would be the value if it were in the tenths place." }
      ],
      rationale: "The digit 7 is in the hundreds place, which means its value is 7 x 100 = 700."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is the product of 15 and 4?",
      correctAnswer: "60",
      rationale: "The product is the result of multiplication. 15 * 4 = 60."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A bookstore has a 20% off sale. If a book\'s original price is $28.00, what is the sale price?",
      answerOptions: [
        { text: "$5.60", isCorrect: false, rationale: "This is the discount amount, not the final price." },
        { text: "$22.40", isCorrect: true, rationale: "The discount is 0.20 * $28 = $5.60. The sale price is $28 - $5.60 = $22.40." },
        { text: "$27.80", isCorrect: false, rationale: "This is the result of subtracting only 20 cents." },
        { text: "$33.60", isCorrect: false, rationale: "This is the price after a 20% markup." }
      ],
      rationale: "Calculate the discount: 20% of $28.00 is $5.60. Subtract the discount from the original price: $28.00 - $5.60 = $22.40."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Evaluate: $3^3 - 2 \\times 5$.",
      correctAnswer: "17",
      rationale: "Order of operations (PEMDAS): Exponents first ($3^3$ = 27), then multiplication (2*5 = 10), then subtraction (27 - 10 = 17)."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of the following is equivalent to 0.65?",
      answerOptions: [
        { text: "$\\frac{6}{5}$", isCorrect: false, rationale: "6/5 is equal to 1.2." },
        { text: "$\\frac{13}{20}$", isCorrect: true, rationale: "0.65 can be written as 65/100, which simplifies to 13/20." },
        { text: "$\\frac{2}{3}$", isCorrect: false, rationale: "2/3 is approximately 0.67." },
        { text: "$\\frac{65}{10}$", isCorrect: false, rationale: "65/10 is equal to 6.5." }
      ],
      rationale: "The decimal 0.65 means 65 hundredths, or 65/100. This fraction can be simplified by dividing both the numerator and denominator by 5, which results in 13/20."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A computer\'s price was reduced from $800 to $680. What was the percent decrease?",
      answerOptions: [
        { text: "12%", isCorrect: false, rationale: "This is the price difference in hundreds of dollars." },
        { text: "15%", isCorrect: true, rationale: "The price decreased by $120. The percent decrease is (120/800) * 100 = 15%." },
        { text: "20%", isCorrect: false, rationale: "This would be a decrease of $160." },
        { text: "85%", isCorrect: false, rationale: "This is the new price as a percentage of the old." }
      ],
      rationale: "The amount of decrease is $800 - $680 = $120. The percent decrease is (decrease / original price) * 100 = ($120 / $800) * 100 = 0.15 * 100 = 15%."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the greatest common factor (GCF) of 24 and 30?",
      correctAnswer: "6",
      rationale: "The factors of 24 are 1, 2, 3, 4, 6, 8, 12, 24. The factors of 30 are 1, 2, 3, 5, 6, 10, 15, 30. The greatest common factor is 6."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Round 3.856 to the nearest tenth.",
      answerOptions: [
        { text: "3.8", isCorrect: false, rationale: "This truncates the number instead of rounding." },
        { text: "3.86", isCorrect: false, rationale: "This rounds to the nearest hundredth." },
        { text: "3.9", isCorrect: true, rationale: "The digit in the hundredths place (5) is 5 or greater, so round up the tenths digit." },
        { text: "4", isCorrect: false, rationale: "This rounds to the nearest whole number." }
      ],
      rationale: "To round to the nearest tenth, look at the digit in the hundredths place. Since 5 is 5 or greater, we round up the tenths digit (8) to 9, resulting in 3.9."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A company has 120 employees. If 45% are in the sales department, how many employees are NOT in the sales department?",
      correctAnswer: "66",
      rationale: "If 45% are in sales, then 100% - 45% = 55% are not. 55% of 120 is 0.55 * 120 = 66."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the result of $1.2 \\times 10^3$?",
      answerOptions: [
        { text: "12", isCorrect: false, rationale: "This is 1.2 * 10." },
        { text: "120", isCorrect: false, rationale: "This is 1.2 * 100." },
        { text: "1200", isCorrect: true, rationale: "Multiplying by 10³ moves the decimal point 3 places to the right." },
        { text: "0.012", isCorrect: false, rationale: "This is the result of dividing by 100." }
      ],
      rationale: "Multiplying a decimal by 10³ means moving the decimal point three places to the right. So, 1.2 becomes 1200."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A car rental costs $40 per day plus a one-time fee of $25. What is the total cost to rent the car for 5 days?",
      answerOptions: [
        { text: "$200", isCorrect: false, rationale: "This is the cost for the days, without the one-time fee." },
        { text: "$225", isCorrect: true, rationale: "The daily cost is 5 * $40 = $200. Add the one-time fee: $200 + $25 = $225." },
        { text: "$325", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$65", isCorrect: false, rationale: "This is the cost for one day." }
      ],
      rationale: "The total cost is calculated as (cost per day * number of days) + one-time fee. So, ($40 * 5) + $25 = $200 + $25 = $225."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Simplify the expression: $|-8| + |3 - 5|$.",
      answerOptions: [
        { text: "6", isCorrect: false, rationale: "This is the result if you subtract |-2|." },
        { text: "10", isCorrect: true, rationale: "|-8| is 8. |3 - 5| is |-2|, which is 2. So, 8 + 2 = 10." },
        { text: "16", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "-10", isCorrect: false, rationale: "The result of absolute value is always non-negative." }
      ],
      rationale: "First, evaluate the absolute values. The absolute value of -8 is 8. The expression inside the second absolute value is 3 - 5 = -2, and its absolute value is 2. Finally, add the results: 8 + 2 = 10."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Number Sense & Operations",
  id: "math_number_sense_04",
  title: "Number Sense & Operations: Quiz 4",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is 50% of 90?",
      answerOptions: [
        { text: "40", isCorrect: false, rationale: "This is 50% of 80." },
        { text: "45", isCorrect: true, rationale: "50% is half of a number. Half of 90 is 45." },
        { text: "50", isCorrect: false, rationale: "This is 50% of 100." },
        { text: "90", isCorrect: false, rationale: "This is 100% of 90." }
      ],
      rationale: "50% is equivalent to one-half. To find 50% of 90, you can divide 90 by 2, which is 45."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Calculate: $100 - 35$.",
      correctAnswer: "65",
      rationale: "This is a basic subtraction problem. 100 - 35 = 65."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A pair of shoes costs $75. If the sales tax is 6%, what is the total cost?",
      answerOptions: [
        { text: "$4.50", isCorrect: false, rationale: "This is the amount of the sales tax, not the total cost." },
        { text: "$79.50", isCorrect: true, rationale: "The tax is 0.06 * $75 = $4.50. The total cost is $75 + $4.50 = $79.50." },
        { text: "$81.00", isCorrect: false, rationale: "This would be an 8% sales tax." },
        { text: "$75.06", isCorrect: false, rationale: "This is an incorrect calculation of the tax." }
      ],
      rationale: "First, calculate the sales tax amount: 6% of $75 is 0.06 * 75 = $4.50. Then, add this to the original price: $75 + $4.50 = $79.50."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Evaluate the expression: $5 + 3 \\times (8 - 2)$.",
      correctAnswer: "23",
      rationale: "According to the order of operations (PEMDAS), first solve the parentheses: 8 - 2 = 6. Then, do the multiplication: 3 * 6 = 18. Finally, the addition: 5 + 18 = 23."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the decimal equivalent of $\\frac{7}{20}$?",
      answerOptions: [
        { text: "0.35", isCorrect: true, rationale: "To convert a fraction to a decimal, divide the numerator by the denominator: 7 / 20 = 0.35." },
        { text: "0.7", isCorrect: false, rationale: "This would be 7/10." },
        { text: "0.20", isCorrect: false, rationale: "This is the denominator as a decimal." },
        { text: "3.5", isCorrect: false, rationale: "This is 7/2." }
      ],
      rationale: "To convert a fraction to a decimal, divide the numerator by the denominator. 7 ÷ 20 = 0.35."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A population of 5,000 increases by 15%. What is the new population?",
      answerOptions: [
        { text: "750", isCorrect: false, rationale: "This is the amount of the increase, not the new total population." },
        { text: "5,150", isCorrect: false, rationale: "This would be a 3% increase." },
        { text: "5,750", isCorrect: true, rationale: "The increase is 0.15 * 5000 = 750. The new population is 5000 + 750 = 5,750." },
        { text: "8,250", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "First, calculate the increase: 15% of 5,000 is 0.15 * 5000 = 750. Then, add this increase to the original population: 5,000 + 750 = 5,750."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the product of $-6$ and $9$?",
      correctAnswer: "-54",
      rationale: "The product of a negative number and a positive number is negative. 6 * 9 = 54, so the answer is -54."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which number is the smallest?",
      answerOptions: [
        { text: "-10", isCorrect: true, rationale: "On a number line, -10 is further to the left than the other numbers, making it the smallest." },
        { text: "-5", isCorrect: false, rationale: "-5 is greater than -10." },
        { text: "0", isCorrect: false, rationale: "0 is greater than both -5 and -10." },
        { text: "3", isCorrect: false, rationale: "3 is a positive number and the largest in this set." }
      ],
      rationale: "When comparing negative numbers, the number with the larger absolute value is smaller. -10 is the smallest."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A recipe requires 3/4 cup of sugar. If you are making 2.5 times the recipe, how many cups of sugar do you need?",
      correctAnswer: "1.875 cups",
      rationale: "Convert the fraction to a decimal: 3/4 = 0.75. Then multiply by 2.5: 0.75 * 2.5 = 1.875 cups."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is $4^3$?",
      answerOptions: [
        { text: "12", isCorrect: false, rationale: "This is 4 * 3." },
        { text: "16", isCorrect: false, rationale: "This is $4^2$." },
        { text: "64", isCorrect: true, rationale: "$4^3$ means 4 * 4 * 4 = 64." },
        { text: "256", isCorrect: false, rationale: "This is $4^4$." }
      ],
      rationale: "The expression $4^3$ means 4 multiplied by itself 3 times: 4 x 4 x 4 = 64."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A bank account has $2,000 and earns 3% simple interest annually. What is the balance after 5 years?",
      answerOptions: [
        { text: "$2,060", isCorrect: false, rationale: "This is the balance after one year." },
        { text: "$2,300", isCorrect: true, rationale: "The total interest is $2000 * 0.03 * 5 = $300. The new balance is $2000 + $300 = $2,300." },
        { text: "$300", isCorrect: false, rationale: "This is the total interest earned, not the final balance." },
        { text: "$2,150", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "First, calculate the total simple interest earned: I = P * r * t = $2,000 * 0.03 * 5 = $300. Then, add the interest to the initial principal: $2,000 + $300 = $2,300."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Subtract: $\\frac{5}{6} - \\frac{1}{3}$.",
      answerOptions: [
        { text: "$\\frac{4}{3}$", isCorrect: false, rationale: "This is the result of adding the fractions." },
        { text: "$\\frac{1}{2}$", isCorrect: true, rationale: "Find a common denominator (6). The problem becomes 5/6 - 2/6 = 3/6, which simplifies to 1/2." },
        { text: "$\\frac{2}{3}$", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$\\frac{4}{6}$", isCorrect: false, rationale: "This simplifies to 2/3." }
      ],
      rationale: "To subtract the fractions, find a common denominator, which is 6. Convert 1/3 to 2/6. The problem becomes $\\frac{5}{6} - \\frac{2}{6} = \\frac{3}{6}$, which simplifies to $\\frac{1}{2}$."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Number Sense & Operations",
  id: "math_number_sense_05",
  title: "Number Sense & Operations: Quiz 5",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the result of $25 \\times 100$?",
      answerOptions: [
        { text: "250", isCorrect: false, rationale: "This is 25 * 10." },
        { text: "2500", isCorrect: true, rationale: "Multiplying by 100 adds two zeros to the end of the number." },
        { text: "25000", isCorrect: false, rationale: "This is 25 * 1000." },
        { text: "2.5", isCorrect: false, rationale: "This is 25 / 10." }
      ],
      rationale: "To multiply a whole number by 100, you can simply add two zeros to the end. So, 25 * 100 = 2500."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is the next prime number after 19?",
      correctAnswer: "23",
      rationale: "A prime number is only divisible by 1 and itself. 20 is divisible by 2, 21 by 3, and 22 by 2. 23 is the next prime number."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "You buy items costing $3.50, $8.25, and $12.00. If you pay with a $30 bill, how much change should you receive?",
      answerOptions: [
        { text: "$6.25", isCorrect: true, rationale: "The total cost is $3.50 + $8.25 + $12.00 = $23.75. The change is $30.00 - $23.75 = $6.25." },
        { text: "$7.75", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$23.75", isCorrect: false, rationale: "This is the total cost of the items." },
        { text: "$53.75", isCorrect: false, rationale: "This is the result of adding the bill to the total." }
      ],
      rationale: "First, find the total cost of the items: $3.50 + $8.25 + $12.00 = $23.75. Then, subtract the total cost from the amount paid: $30.00 - $23.75 = $6.25."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Convert the improper fraction $\\frac{11}{4}$ to a mixed number.",
      correctAnswer: "2 3/4",
      rationale: "Divide 11 by 4. It goes in 2 times (2 * 4 = 8) with a remainder of 3. So the mixed number is 2 3/4."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of the following is the correct order from smallest to largest?",
      answerOptions: [
        { text: "-5, -2, 0, 3", isCorrect: true, rationale: "On a number line, numbers increase from left to right. -5 is the smallest, followed by -2, 0, and then 3." },
        { text: "0, -2, -5, 3", isCorrect: false, rationale: "The negative numbers are in the wrong order." },
        { text: "-2, -5, 0, 3", isCorrect: false, rationale: "-5 is smaller than -2." },
        { text: "3, 0, -2, -5", isCorrect: false, rationale: "This is in order from largest to smallest." }
      ],
      rationale: "When ordering numbers, visualize a number line. Negative numbers with a larger absolute value are smaller. So, -5 < -2 < 0 < 3."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A company\'s stock was valued at $75 per share. It dropped by 12% on Monday and then increased by 5% on Tuesday. What was the price after Tuesday\'s increase?",
      answerOptions: [
        { text: "$69.30", isCorrect: true, rationale: "Monday: $75 * (1 - 0.12) = $66. Tuesday: $66 * (1 + 0.05) = $69.30." },
        { text: "$70.88", isCorrect: false, rationale: "This is a 7% decrease from the original price." },
        { text: "$75.00", isCorrect: false, rationale: "The price would not return to the original value." },
        { text: "$66.00", isCorrect: false, rationale: "This is the price after Monday\'s drop only." }
      ],
      rationale: "First, calculate the price after the drop: $75 * (1 - 0.12) = $75 * 0.88 = $66. Then, calculate the price after the increase: $66 * (1 + 0.05) = $66 * 1.05 = $69.30."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the sum of all prime numbers between 10 and 20?",
      correctAnswer: "60",
      rationale: "The prime numbers between 10 and 20 are 11, 13, 17, and 19. Their sum is 11 + 13 + 17 + 19 = 60."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is $20 \\div 4 + 6$?",
      answerOptions: [
        { text: "2", isCorrect: false, rationale: "This is the result if you do addition before division." },
        { text: "11", isCorrect: true, rationale: "Following order of operations, division comes first: 20/4 = 5. Then addition: 5 + 6 = 11." },
        { text: "10", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "30", isCorrect: false, rationale: "This is 20+10." }
      ],
      rationale: "According to the order of operations (PEMDAS), division is performed before addition. So, 20 ÷ 4 = 5, and then 5 + 6 = 11."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A piece of wood is 8 feet long. If you cut off a piece that is 2.25 feet long, how many inches is the remaining piece?",
      correctAnswer: "69 inches",
      rationale: "The remaining piece is 8 - 2.25 = 5.75 feet long. To convert feet to inches, multiply by 12: 5.75 * 12 = 69 inches."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the scientific notation for 3,450,000?",
      answerOptions: [
        { text: "$3.45 \\times 10^4$", isCorrect: false, rationale: "The exponent should be 6." },
        { text: "$3.45 \\times 10^5$", isCorrect: false, rationale: "The exponent should be 6." },
        { text: "$3.45 \\times 10^6$", isCorrect: true, rationale: "The decimal point is moved 6 places to the left." },
        { text: "$34.5 \\times 10^5$", isCorrect: false, rationale: "The number before the \'x\' must be between 1 and 10." }
      ],
      rationale: "To write a number in scientific notation, move the decimal point until there is one non-zero digit to its left. The number of places you moved the decimal is the exponent. Here, the decimal is moved 6 places, so the exponent is 6."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "If you work 40 hours per week at $15 per hour, what is your gross monthly income (assuming 4 weeks in a month)?",
      answerOptions: [
        { text: "$600", isCorrect: false, rationale: "This is your weekly income." },
        { text: "$1200", isCorrect: false, rationale: "This is your bi-weekly income." },
        { text: "$2400", isCorrect: true, rationale: "Weekly income is 40 * $15 = $600. Monthly income is $600 * 4 = $2400." },
        { text: "$3000", isCorrect: false, rationale: "This is the income for 5 weeks." }
      ],
      rationale: "First, calculate the weekly income: 40 hours/week * $15/hour = $600/week. Then, calculate the monthly income: $600/week * 4 weeks/month = $2400/month."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Find the sum of $\\frac{1}{4}$ and $\\frac{2}{3}$.",
      answerOptions: [
        { text: "$\\frac{3}{7}$", isCorrect: false, rationale: "This is the result of adding numerators and denominators." },
        { text: "$\\frac{11}{12}$", isCorrect: true, rationale: "The common denominator is 12. The sum is 3/12 + 8/12 = 11/12." },
        { text: "$\\frac{1}{2}$", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "1", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "To add these fractions, find a common denominator, which is 12. Convert the fractions: $\\frac{1}{4} = \\frac{3}{12}$ and $\\frac{2}{3} = \\frac{8}{12}$. Now add them: $\\frac{3}{12} + \\frac{8}{12} = \\frac{11}{12}$."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Number Sense & Operations",
  id: "math_number_sense_06",
  title: "Number Sense & Operations: Quiz 6",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the result of 805 - 102?",
      answerOptions: [
        { text: "703", isCorrect: true, rationale: "805 - 102 = 703." },
        { text: "705", isCorrect: false, rationale: "This is 805 - 100." },
        { text: "693", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "907", isCorrect: false, rationale: "This is the sum." }
      ],
      rationale: "This is a straightforward subtraction problem. 805 - 102 = 703."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Convert 0.45 to a fraction in simplest form.",
      correctAnswer: "9/20",
      rationale: "0.45 is 45/100. Both numbers are divisible by 5. 45/5 = 9 and 100/5 = 20. So, the fraction is 9/20."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "The temperature was -5°F in the morning and rose to 12°F in the afternoon. What was the change in temperature?",
      answerOptions: [
        { text: "7°F", isCorrect: false, rationale: "This is 12-5." },
        { text: "17°F", isCorrect: true, rationale: "The change is the difference between the final and initial temperatures: 12 - (-5) = 17." },
        { text: "-17°F", isCorrect: false, rationale: "The temperature rose, so the change is positive." },
        { text: "-7°F", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "To find the change in temperature, subtract the initial temperature from the final temperature: 12°F - (-5°F) = 12°F + 5°F = 17°F."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Find the least common multiple (LCM) of 8 and 10.",
      correctAnswer: "40",
      rationale: "Multiples of 8 are 8, 16, 24, 32, 40... Multiples of 10 are 10, 20, 30, 40... The smallest number they have in common is 40."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the value of $|-10| - |5|$?",
      answerOptions: [
        { text: "-15", isCorrect: false, rationale: "This is -10-5." },
        { text: "-5", isCorrect: false, rationale: "This is 5-10." },
        { text: "5", isCorrect: true, rationale: "|-10| = 10 and |5| = 5. So, 10 - 5 = 5." },
        { text: "15", isCorrect: false, rationale: "This is the sum of the absolute values." }
      ],
      rationale: "First, evaluate the absolute values: |-10| = 10 and |5| = 5. Then, perform the subtraction: 10 - 5 = 5."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A store has a 30% discount on all items. You also have a coupon for an additional 10% off the discounted price. What is the total percent discount?",
      answerOptions: [
        { text: "40%", isCorrect: false, rationale: "Discounts are applied sequentially, not added." },
        { text: "37%", isCorrect: true, rationale: "After a 30% discount, the price is 70% of the original. An additional 10% off this price is 0.10 * 0.70 = 0.07, or 7%. Total discount is 30% + 7% = 37%." },
        { text: "35%", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "33%", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Let the original price be P. The first discount makes the price 0.70P. The second discount is 10% off this price, so you pay 90% of it: 0.90 * (0.70P) = 0.63P. This means the total discount is 1 - 0.63 = 0.37, or 37%."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A car travels 220 miles on 8 gallons of gas. What is its fuel efficiency in miles per gallon?",
      correctAnswer: "27.5 MPG",
      rationale: "Divide the total miles by the number of gallons: 220 miles / 8 gallons = 27.5 miles per gallon."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which number is an irrational number?",
      answerOptions: [
        { text: "$\\sqrt{25}$", isCorrect: false, rationale: "The square root of 25 is 5, which is a rational number." },
        { text: "$\\pi$", isCorrect: true, rationale: "Pi is a non-terminating, non-repeating decimal, which is the definition of an irrational number." },
        { text: "0.333...", isCorrect: false, rationale: "This is a repeating decimal, which is a rational number (1/3)." },
        { text: "$\\frac{7}{2}$", isCorrect: false, rationale: "This is a fraction, which is a rational number." }
      ],
      rationale: "An irrational number cannot be expressed as a simple fraction. Pi is a famous example of an irrational number."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: false,
      difficulty: "hard",
      question: "Evaluate: $(2^3 + 2)^2$.",
      correctAnswer: "100",
      rationale: "Follow the order of operations. Inside the parentheses: $2^3$ = 8, so 8+2 = 10. Then square the result: $10^2$ = 100."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "What is 150% of 60?",
      answerOptions: [
        { text: "40", isCorrect: false, rationale: "This is 60/1.5" },
        { text: "90", isCorrect: true, rationale: "150% is 1.5. So, 1.5 * 60 = 90." },
        { text: "100", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "210", isCorrect: false, rationale: "This is 150+60." }
      ],
      rationale: "To find 150% of 60, convert the percentage to a decimal (1.5) and multiply: 1.5 * 60 = 90."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which expression is not equivalent to the others?",
      answerOptions: [
        { text: "0.75", isCorrect: false, rationale: "This is equivalent to 3/4." },
        { text: "75%", isCorrect: false, rationale: "This is equivalent to 3/4." },
        { text: "$\\frac{3}{4}$", isCorrect: false, rationale: "This is the base fraction." },
        { text: "$\\frac{4}{3}$", isCorrect: true, rationale: "4/3 is greater than 1, while the others are all equal to 0.75." }
      ],
      rationale: "The values 0.75, 75%, and 3/4 are all equivalent. The fraction 4/3 is equal to 1.333..., which is different."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "You have $1000 in a savings account. It grows by 2% each year. How much will be in the account after 2 years?",
      answerOptions: [
        { text: "$1020.00", isCorrect: false, rationale: "This is the amount after one year." },
        { text: "$1040.00", isCorrect: false, rationale: "This is simple interest, not compound." },
        { text: "$1040.40", isCorrect: true, rationale: "Year 1: $1000 * 1.02 = $1020. Year 2: $1020 * 1.02 = $1040.40." },
        { text: "$1020.20", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "This is a compound interest problem. After the first year, the balance is $1000 * 1.02 = $1020. After the second year, the new balance is $1020 * 1.02 = $1040.40."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Number Sense & Operations",
  id: "math_number_sense_07",
  title: "Number Sense & Operations: Quiz 7",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which of the following is equal to $5^3$?",
      answerOptions: [
        { text: "15", isCorrect: false, rationale: "This is 5 * 3." },
        { text: "25", isCorrect: false, rationale: "This is $5^2$." },
        { text: "125", isCorrect: true, rationale: "$5^3$ = 5 * 5 * 5 = 125." },
        { text: "625", isCorrect: false, rationale: "This is $5^4$." }
      ],
      rationale: "The expression $5^3$ means 5 multiplied by itself three times: 5 x 5 x 5 = 125."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Find the product of 12 and 0.5.",
      correctAnswer: "6",
      rationale: "Multiplying by 0.5 is the same as dividing by 2. 12 * 0.5 = 6."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A sweater is on sale for 40% off the original price of $50. What is the sale price?",
      answerOptions: [
        { text: "$10", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$20", isCorrect: false, rationale: "This is the discount amount, not the sale price." },
        { text: "$30", isCorrect: true, rationale: "The discount is 0.40 * $50 = $20. The sale price is $50 - $20 = $30." },
        { text: "$70", isCorrect: false, rationale: "This is the result of adding the discount." }
      ],
      rationale: "First, calculate the discount amount: 40% of $50 is 0.40 * 50 = $20. Then, subtract the discount from the original price: $50 - $20 = $30."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Evaluate: $5 \times (6 - 2) + 3^2$.",
      correctAnswer: "29",
      rationale: "Order of operations (PEMDAS): Parentheses (6-2=4), Exponents ($3^2$=9), Multiplication (5*4=20), Addition (20+9=29)."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the improper fraction equivalent of $3\\frac{2}{5}$?",
      answerOptions: [
        { text: "$\\frac{10}{5}$", isCorrect: false, rationale: "This is equal to 2." },
        { text: "$\\frac{17}{5}$", isCorrect: true, rationale: "(3 * 5 + 2) / 5 = 17/5." },
        { text: "$\\frac{6}{5}$", isCorrect: false, rationale: "This is 3*2/5." },
        { text: "$\\frac{32}{5}$", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "To convert a mixed number to an improper fraction, multiply the whole number by the denominator, add the numerator, and keep the same denominator: (3 * 5 + 2) / 5 = 17/5."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A car depreciates in value by 15% in its first year. If the car was bought for $22,000, what is its value after one year?",
      answerOptions: [
        { text: "$3300", isCorrect: false, rationale: "This is the amount of depreciation, not the final value." },
        { text: "$18700", isCorrect: true, rationale: "The depreciation is 0.15 * $22,000 = $3,300. The new value is $22,000 - $3,300 = $18,700." },
        { text: "$20500", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$25300", isCorrect: false, rationale: "This is the value after a 15% increase." }
      ],
      rationale: "First, calculate the depreciation amount: 15% of $22,000 is 0.15 * 22000 = $3,300. Then, subtract this from the original price: $22,000 - $3,300 = $18,700."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the least common denominator for the fractions $\\frac{1}{6}$ and $\\frac{3}{8}$?",
      correctAnswer: "24",
      rationale: "The least common denominator is the least common multiple (LCM) of the denominators 6 and 8. The LCM of 6 and 8 is 24."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the result of $-4 + 10$?",
      answerOptions: [
        { text: "-14", isCorrect: false, rationale: "This is -4 - 10." },
        { text: "-6", isCorrect: false, rationale: "This is 4-10." },
        { text: "6", isCorrect: true, rationale: "Starting at -4 on a number line and moving 10 units to the right brings you to 6." },
        { text: "14", isCorrect: false, rationale: "This is 4+10." }
      ],
      rationale: "Adding a positive number to a negative number is like moving to the right on a number line. -4 + 10 = 6."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "An electronics store marks up the price of a game console by 30%. If the store bought the console for $250, what is the selling price?",
      correctAnswer: "$325",
      rationale: "The markup amount is 30% of $250, which is 0.30 * 250 = $75. The selling price is the original cost plus the markup: $250 + $75 = $325."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is $\\sqrt{144}$?",
      answerOptions: [
        { text: "10", isCorrect: false, rationale: "10*10 = 100." },
        { text: "12", isCorrect: true, rationale: "12 * 12 = 144." },
        { text: "14", isCorrect: false, rationale: "14*14 = 196." },
        { text: "72", isCorrect: false, rationale: "This is 144/2." }
      ],
      rationale: "The square root of 144 is the number that, when multiplied by itself, equals 144. That number is 12."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "You have 3/4 of a pizza left. If you eat 1/3 of the leftover pizza, what fraction of the original pizza did you eat?",
      answerOptions: [
        { text: "1/4", isCorrect: true, rationale: "You ate 1/3 of 3/4, which is (1/3) * (3/4) = 3/12 = 1/4." },
        { text: "1/3", isCorrect: false, rationale: "This is the fraction of the leftover pizza you ate." },
        { text: "5/12", isCorrect: false, rationale: "This is the result of 3/4 - 1/3." },
        { text: "1/2", isCorrect: false, rationale: "This is what\'s left after you ate." }
      ],
      rationale: "To find the fraction of the original pizza you ate, you need to calculate 1/3 of 3/4. This is a multiplication problem: $\\frac{1}{3} \\times \\frac{3}{4} = \\frac{3}{12}$, which simplifies to $\\frac{1}{4}$."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of these numbers is divisible by 3?",
      answerOptions: [
        { text: "134", isCorrect: false, rationale: "The sum of the digits is 1+3+4=8, which is not divisible by 3." },
        { text: "205", isCorrect: false, rationale: "The sum of the digits is 2+0+5=7, which is not divisible by 3." },
        { text: "312", isCorrect: true, rationale: "The sum of the digits is 3+1+2=6, which is divisible by 3." },
        { text: "401", isCorrect: false, rationale: "The sum of the digits is 4+0+1=5, which is not divisible by 3." }
      ],
      rationale: "A number is divisible by 3 if the sum of its digits is divisible by 3. For 312, the sum of the digits is 3 + 1 + 2 = 6. Since 6 is divisible by 3, 312 is also divisible by 3."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Number Sense & Operations",
  id: "math_number_sense_08",
  title: "Number Sense & Operations: Quiz 8",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the result of adding -15 and 8?",
      answerOptions: [
        { text: "-23", isCorrect: false, rationale: "This is the result of subtraction." },
        { text: "-7", isCorrect: true, rationale: "-15 + 8 = -7." },
        { text: "7", isCorrect: false, rationale: "This is 15-8." },
        { text: "23", isCorrect: false, rationale: "This is 15+8." }
      ],
      rationale: "Starting at -15 on the number line and moving 8 units to the right brings you to -7."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Convert 2.5 to a fraction.",
      correctAnswer: "5/2",
      rationale: "2.5 is two and a half, which can be written as the mixed number 2 1/2. As an improper fraction, this is (2*2+1)/2 = 5/2."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A television costs $650. If there is a 7% sales tax, what is the total cost?",
      answerOptions: [
        { text: "$45.50", isCorrect: false, rationale: "This is the tax amount." },
        { text: "$695.50", isCorrect: true, rationale: "Tax = 0.07 * 650 = $45.50. Total = 650 + 45.50 = $695.50." },
        { text: "$657.00", isCorrect: false, rationale: "This is a 1% tax." },
        { text: "$700.00", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "First, calculate the sales tax: 7% of $650 is 0.07 * 650 = $45.50. Then, add the tax to the original price: $650 + $45.50 = $695.50."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Evaluate: $100 \\div 5^2$.",
      correctAnswer: "4",
      rationale: "Order of operations: Exponents first ($5^2$ = 25), then division (100 / 25 = 4)."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which number is a factor of 42?",
      answerOptions: [
        { text: "4", isCorrect: false, rationale: "42 is not divisible by 4." },
        { text: "5", isCorrect: false, rationale: "42 is not divisible by 5." },
        { text: "6", isCorrect: true, rationale: "42 is divisible by 6 (42 = 6 * 7)." },
        { text: "8", isCorrect: false, rationale: "42 is not divisible by 8." }
      ],
      rationale: "A factor of a number is a number that divides it evenly. 42 divided by 6 is 7, so 6 is a factor of 42."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A city\'s population decreased from 25,000 to 24,000. What was the percent decrease?",
      answerOptions: [
        { text: "1%", isCorrect: false, rationale: "This would be a decrease of 250." },
        { text: "4%", isCorrect: true, rationale: "The decrease was 1,000. (1,000 / 25,000) * 100 = 4%." },
        { text: "5%", isCorrect: false, rationale: "This would be a decrease of 1250." },
        { text: "10%", isCorrect: false, rationale: "This would be a decrease of 2500." }
      ],
      rationale: "The amount of decrease is 25,000 - 24,000 = 1,000. The percent decrease is (decrease / original amount) * 100 = (1,000 / 25,000) * 100 = 0.04 * 100 = 4%."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the next number in the sequence: 3, 6, 12, 24, ...?",
      correctAnswer: "48",
      rationale: "This is a geometric sequence where each term is multiplied by 2 to get the next term. 24 * 2 = 48."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is $1/2$ of 50?",
      answerOptions: [
        { text: "20", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "25", isCorrect: true, rationale: "Half of 50 is 25." },
        { text: "50", isCorrect: false, rationale: "This is the original number." },
        { text: "100", isCorrect: false, rationale: "This is double the number." }
      ],
      rationale: "Taking 1/2 of a number is the same as dividing it by 2. 50 / 2 = 25."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A plane flies 1,200 miles in 3 hours. What is its average speed in miles per hour?",
      correctAnswer: "400 mph",
      rationale: "Speed = Distance / Time. Speed = 1200 miles / 3 hours = 400 miles per hour."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of the following is the largest?",
      answerOptions: [
        { text: "0.8", isCorrect: true, rationale: "0.8 is the largest decimal value among the choices." },
        { text: "75%", isCorrect: false, rationale: "75% is 0.75." },
        { text: "3/5", isCorrect: false, rationale: "3/5 is 0.6." },
        { text: "1/2", isCorrect: false, rationale: "1/2 is 0.5." }
      ],
      rationale: "To compare, convert all values to decimals: 75% = 0.75, 3/5 = 0.6, 1/2 = 0.5. The largest value is 0.8."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A person\'s salary is $50,000 per year. If they get a 4% raise, what is their new salary?",
      answerOptions: [
        { text: "$50,400", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$52,000", isCorrect: true, rationale: "The raise is 0.04 * 50000 = $2000. New salary is 50000 + 2000 = $52,000." },
        { text: "$54,000", isCorrect: false, rationale: "This would be an 8% raise." },
        { text: "$70,000", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "First, calculate the raise amount: 4% of $50,000 is 0.04 * 50000 = $2,000. Then, add the raise to the original salary: $50,000 + $2,000 = $52,000."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Evaluate: $\\sqrt{81} \\times 2$.",
      answerOptions: [
        { text: "9", isCorrect: false, rationale: "This is just sqrt(81)." },
        { text: "18", isCorrect: true, rationale: "sqrt(81) = 9. 9 * 2 = 18." },
        { text: "81", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "162", isCorrect: false, rationale: "This is 81*2." }
      ],
      rationale: "First, find the square root of 81, which is 9. Then, multiply by 2: 9 * 2 = 18."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Number Sense & Operations",
  id: "math_number_sense_09",
  title: "Number Sense & Operations: Quiz 9",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is 400 divided by 20?",
      answerOptions: [
        { text: "20", isCorrect: true, rationale: "400 / 20 = 40 / 2 = 20." },
        { text: "2", isCorrect: false, rationale: "This is 40/20." },
        { text: "200", isCorrect: false, rationale: "This is 400/2." },
        { text: "8000", isCorrect: false, rationale: "This is 400*20." }
      ],
      rationale: "To divide 400 by 20, you can simplify the problem by removing a zero from both numbers, which is equivalent to dividing both by 10. This leaves 40 / 2, which equals 20."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is the result of $1.5 \\times 4$?",
      correctAnswer: "6",
      rationale: "1.5 multiplied by 4 is the same as adding 1.5 four times: 1.5 + 1.5 + 1.5 + 1.5 = 6."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A concert ticket costs $80. A processing fee of 5% is added to the price. What is the total cost?",
      answerOptions: [
        { text: "$84", isCorrect: true, rationale: "The fee is 0.05 * $80 = $4. Total cost = $80 + $4 = $84." },
        { text: "$85", isCorrect: false, rationale: "This would be a 6.25% fee." },
        { text: "$4", isCorrect: false, rationale: "This is the fee amount, not the total cost." },
        { text: "$76", isCorrect: false, rationale: "This is the result of subtracting the fee." }
      ],
      rationale: "First, calculate the processing fee: 5% of $80 is 0.05 * 80 = $4. Then, add this fee to the ticket price: $80 + $4 = $84."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Evaluate: $50 - (10 - 4)^2$.",
      correctAnswer: "14",
      rationale: "Order of operations (PEMDAS): Parentheses first (10-4=6), then Exponents ($6^2$=36), then subtraction (50 - 36 = 14)."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the greatest common factor (GCF) of 36 and 54?",
      answerOptions: [
        { text: "6", isCorrect: false, rationale: "6 is a common factor, but not the greatest." },
        { text: "9", isCorrect: false, rationale: "9 is a common factor, but not the greatest." },
        { text: "18", isCorrect: true, rationale: "Factors of 36: 1,2,3,4,6,9,12,18,36. Factors of 54: 1,2,3,6,9,18,27,54. The GCF is 18." },
        { text: "108", isCorrect: false, rationale: "This is the least common multiple (LCM)." }
      ],
      rationale: "List the factors of each number to find the greatest one they have in common. Factors of 36: {1, 2, 3, 4, 6, 9, 12, 18, 36}. Factors of 54: {1, 2, 3, 6, 9, 18, 27, 54}. The GCF is 18."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A phone\'s battery life is 8 hours. With a new software update, the battery life improves by 25%. What is the new battery life?",
      answerOptions: [
        { text: "2 hours", isCorrect: false, rationale: "This is the amount of improvement." },
        { text: "6 hours", isCorrect: false, rationale: "This is the result of a 25% decrease." },
        { text: "10 hours", isCorrect: true, rationale: "The improvement is 0.25 * 8 = 2 hours. New battery life is 8 + 2 = 10 hours." },
        { text: "12 hours", isCorrect: false, rationale: "This would be a 50% increase." }
      ],
      rationale: "First, calculate the improvement: 25% of 8 hours is 0.25 * 8 = 2 hours. Then, add this to the original battery life: 8 + 2 = 10 hours."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the result of multiplying -7 by -5?",
      correctAnswer: "35",
      rationale: "The product of two negative numbers is a positive number. 7 * 5 = 35."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Estimate the product of 19.8 and 5.1.",
      answerOptions: [
        { text: "25", isCorrect: false, rationale: "This is 20+5." },
        { text: "100", isCorrect: true, rationale: "Round 19.8 to 20 and 5.1 to 5. The estimated product is 20 * 5 = 100." },
        { text: "80", isCorrect: false, rationale: "This is 20*4." },
        { text: "120", isCorrect: false, rationale: "This is 20*6." }
      ],
      rationale: "To estimate, round 19.8 to the nearest whole number (20) and 5.1 to the nearest whole number (5). The estimated product is 20 x 5 = 100."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A recipe for 12 cupcakes requires 1.5 cups of flour. How much flour is needed for 30 cupcakes?",
      correctAnswer: "3.75 cups",
      rationale: "First find the amount of flour per cupcake: 1.5 / 12 = 0.125 cups. Then multiply by 30: 0.125 * 30 = 3.75 cups."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the value of $10^4$?",
      answerOptions: [
        { text: "40", isCorrect: false, rationale: "This is 10 * 4." },
        { text: "1000", isCorrect: false, rationale: "This is $10^3$." },
        { text: "10000", isCorrect: true, rationale: "$10^4$ is 1 followed by 4 zeros." },
        { text: "100000", isCorrect: false, rationale: "This is $10^5$." }
      ],
      rationale: "The exponent indicates how many times the base (10) is multiplied by itself. $10^4 = 10 \\times 10 \\times 10 \\times 10 = 10,000$."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A person\'s weight drops from 150 lbs to 135 lbs. What is the percentage decrease in weight?",
      answerOptions: [
        { text: "10%", isCorrect: true, rationale: "The decrease is 15 lbs. (15/150)*100 = 10%." },
        { text: "15%", isCorrect: false, rationale: "This is the amount of weight lost." },
        { text: "11.1%", isCorrect: false, rationale: "This is 15/135." },
        { text: "90%", isCorrect: false, rationale: "This is 135/150." }
      ],
      rationale: "The amount of decrease is 150 - 135 = 15 lbs. The percent decrease is (decrease / original amount) * 100 = (15 / 150) * 100 = 0.10 * 100 = 10%."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the sum of the first five positive integers?",
      answerOptions: [
        { text: "10", isCorrect: false, rationale: "This is the sum of the first four." },
        { text: "15", isCorrect: true, rationale: "1 + 2 + 3 + 4 + 5 = 15." },
        { text: "20", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "21", isCorrect: false, rationale: "This is the sum of the first six." }
      ],
      rationale: "The first five positive integers are 1, 2, 3, 4, and 5. Their sum is 1 + 2 + 3 + 4 + 5 = 15."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Number Sense & Operations",
  id: "math_number_sense_10",
  title: "Number Sense & Operations: Quiz 10",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the result of 502 - 49?",
      answerOptions: [
        { text: "453", isCorrect: true, rationale: "502 - 49 = 453." },
        { text: "451", isCorrect: false, rationale: "This is 500-49." },
        { text: "551", isCorrect: false, rationale: "This is the sum." },
        { text: "463", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "This is a basic subtraction problem. 502 - 49 = 453."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is $\\frac{2}{5}$ of 40?",
      correctAnswer: "16",
      rationale: "To find the fraction of a number, multiply the number by the fraction. (2/5) * 40 = 80/5 = 16."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "The price of a concert ticket is $110. A 10% service fee is added. What is the total cost?",
      answerOptions: [
        { text: "$11", isCorrect: false, rationale: "This is the fee amount." },
        { text: "$121", isCorrect: true, rationale: "The fee is 0.10 * $110 = $11. Total cost = $110 + $11 = $121." },
        { text: "$120", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$99", isCorrect: false, rationale: "This is a 10% discount." }
      ],
      rationale: "First, calculate the service fee: 10% of $110 is 0.10 * 110 = $11. Then, add this to the ticket price: $110 + $11 = $121."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Evaluate: $2 \times (3+4)^2$.",
      correctAnswer: "98",
      rationale: "Order of operations: Parentheses (3+4=7), Exponents ($7^2$=49), Multiplication (2*49=98)."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of the following is a prime number?",
      answerOptions: [
        { text: "27", isCorrect: false, rationale: "27 is divisible by 3 and 9." },
        { text: "33", isCorrect: false, rationale: "33 is divisible by 3 and 11." },
        { text: "39", isCorrect: false, rationale: "39 is divisible by 3 and 13." },
        { text: "29", isCorrect: true, rationale: "29 is only divisible by 1 and itself." }
      ],
      rationale: "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. 29 fits this definition."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A company\'s profits increased from $300,000 to $360,000. What was the percent increase?",
      answerOptions: [
        { text: "15%", isCorrect: false, rationale: "This would be an increase of $45,000." },
        { text: "20%", isCorrect: true, rationale: "The increase was $60,000. (60,000 / 300,000) * 100 = 20%." },
        { text: "25%", isCorrect: false, rationale: "This would be an increase of $75,000." },
        { text: "60%", isCorrect: false, rationale: "This is the increase in thousands of dollars." }
      ],
      rationale: "The amount of increase is $360,000 - $300,000 = $60,000. The percent increase is (increase / original amount) * 100 = (60,000 / 300,000) * 100 = 0.20 * 100 = 20%."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Find the least common multiple (LCM) of 9 and 15.",
      correctAnswer: "45",
      rationale: "Multiples of 9: 9, 18, 27, 36, 45... Multiples of 15: 15, 30, 45... The LCM is 45."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the result of multiplying 2.5 by 10?",
      answerOptions: [
        { text: "0.25", isCorrect: false, rationale: "This is division by 10." },
        { text: "2.5", isCorrect: false, rationale: "This is the original number." },
        { text: "25", isCorrect: true, rationale: "Multiplying by 10 moves the decimal point one place to the right." },
        { text: "250", isCorrect: false, rationale: "This is multiplication by 100." }
      ],
      rationale: "When multiplying a decimal by 10, you move the decimal point one place to the right. So, 2.5 becomes 25."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A runner completes a 10-kilometer race in 50 minutes. How many minutes does it take her to run one kilometer?",
      correctAnswer: "5 minutes",
      rationale: "To find the time per kilometer, divide the total time by the distance: 50 minutes / 10 kilometers = 5 minutes per kilometer."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the result of $\\frac{3}{4} + \\frac{1}{8}$?",
      answerOptions: [
        { text: "$\\frac{1}{2}$", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$\\frac{5}{8}$", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$\\frac{7}{8}$", isCorrect: true, rationale: "The common denominator is 8. 3/4 = 6/8. 6/8 + 1/8 = 7/8." },
        { text: "1", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "To add the fractions, find a common denominator, which is 8. Convert 3/4 to 6/8. Then add: $\\frac{6}{8} + \\frac{1}{8} = \\frac{7}{8}$."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "An account with $4000 earns 5% compound interest annually. What will be the balance after 2 years?",
      answerOptions: [
        { text: "$4200", isCorrect: false, rationale: "This is the balance after one year." },
        { text: "$4400", isCorrect: false, rationale: "This is simple interest for two years." },
        { text: "$4410", isCorrect: true, rationale: "Year 1: 4000*1.05=4200. Year 2: 4200*1.05=4410." },
        { text: "$4500", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "This is a compound interest problem. After year 1, the balance is $4000 * 1.05 = $4200. After year 2, the balance is $4200 * 1.05 = $4410."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Evaluate: $|-3| \times |4 - 9|$.",
      answerOptions: [
        { text: "-15", isCorrect: false, rationale: "The result of absolute values must be positive." },
        { text: "15", isCorrect: true, rationale: "|-3| = 3. |4-9| = |-5| = 5. 3 * 5 = 15." },
        { text: "9", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "21", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "First, evaluate the absolute values: |-3| = 3 and |4 - 9| = |-5| = 5. Then, multiply the results: 3 * 5 = 15."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Number Sense & Operations",
  id: "math_number_sense_11",
  title: "Number Sense & Operations: Quiz 11",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the result of 1,000 - 99?",
      answerOptions: [
        { text: "901", isCorrect: true, rationale: "1000 - 99 = 901." },
        { text: "911", isCorrect: false, rationale: "This is 1000-89." },
        { text: "891", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "991", isCorrect: false, rationale: "This is 1000-9." }
      ],
      rationale: "This is a basic subtraction problem. 1000 - 99 = 901."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is 25% of 200?",
      correctAnswer: "50",
      rationale: "25% is the same as 1/4. 1/4 of 200 is 200 / 4 = 50."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A jacket is marked down by 15% from its original price of $60. What is the sale price?",
      answerOptions: [
        { text: "$9", isCorrect: false, rationale: "This is the discount amount." },
        { text: "$45", isCorrect: false, rationale: "This is a 25% discount." },
        { text: "$51", isCorrect: true, rationale: "The discount is 0.15 * $60 = $9. The sale price is $60 - $9 = $51." },
        { text: "$69", isCorrect: false, rationale: "This is the price after a 15% markup." }
      ],
      rationale: "First, calculate the discount: 15% of $60 is 0.15 * 60 = $9. Then, subtract the discount from the original price: $60 - $9 = $51."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Evaluate: $10 + 4 \\times 2^3$.",
      correctAnswer: "42",
      rationale: "Order of operations (PEMDAS): Exponents ($2^3$=8), Multiplication (4*8=32), Addition (10+32=42)."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which fraction is equivalent to 80%?",
      answerOptions: [
        { text: "$\\frac{3}{4}$", isCorrect: false, rationale: "3/4 is 75%." },
        { text: "$\\frac{4}{5}$", isCorrect: true, rationale: "80% is 80/100, which simplifies to 4/5." },
        { text: "$\\frac{5}{6}$", isCorrect: false, rationale: "5/6 is approx 83.3%." },
        { text: "$\\frac{7}{8}$", isCorrect: false, rationale: "7/8 is 87.5%." }
      ],
      rationale: "80% means 80 out of 100, or 80/100. This fraction can be simplified by dividing both the numerator and denominator by 20, which results in 4/5."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A company with 80 employees finds that 5% of them are late to work each day. How many employees are on time?",
      answerOptions: [
        { text: "4", isCorrect: false, rationale: "This is the number of employees who are late." },
        { text: "75", isCorrect: false, rationale: "This is the percentage of employees on time." },
        { text: "76", isCorrect: true, rationale: "If 5% are late, 95% are on time. 95% of 80 is 0.95 * 80 = 76." },
        { text: "84", isCorrect: false, rationale: "This is 80+4." }
      ],
      rationale: "First, find the percentage of employees who are on time: 100% - 5% = 95%. Then, calculate this number: 0.95 * 80 = 76 employees."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the result of $1/2 - 1/3$?",
      correctAnswer: "1/6",
      rationale: "The common denominator is 6. 1/2 = 3/6 and 1/3 = 2/6. 3/6 - 2/6 = 1/6."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which of the following numbers is the largest?",
      answerOptions: [
        { text: "-100", isCorrect: false, rationale: "This is the smallest number." },
        { text: "-10", isCorrect: false, rationale: "-10 is larger than -100." },
        { text: "-1", isCorrect: true, rationale: "-1 is the largest negative integer." },
        { text: "-1000", isCorrect: false, rationale: "This is smaller than -100." }
      ],
      rationale: "When comparing negative numbers, the one with the smallest absolute value is the largest. -1 is closest to 0."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A car is traveling at 60 miles per hour. How many miles does it travel in 45 minutes?",
      correctAnswer: "45 miles",
      rationale: "45 minutes is 3/4 of an hour (0.75 hours). Distance = Speed * Time = 60 mph * 0.75 hours = 45 miles."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the scientific notation for 0.00058?",
      answerOptions: [
        { text: "$5.8 \\times 10^4$", isCorrect: false, rationale: "The exponent should be negative." },
        { text: "$5.8 \\times 10^{-3}$", isCorrect: false, rationale: "The decimal moved 4 places." },
        { text: "$5.8 \\times 10^{-4}$", isCorrect: true, rationale: "The decimal point is moved 4 places to the right, so the exponent is -4." },
        { text: "$58 \\times 10^{-5}$", isCorrect: false, rationale: "The number must be between 1 and 10." }
      ],
      rationale: "To write a number in scientific notation, move the decimal point until there is one non-zero digit to its left. The decimal is moved 4 places to the right, so the exponent is -4."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "You have a loan of $5000 with a simple interest rate of 6% per year. How much interest will you pay in total over 4 years?",
      answerOptions: [
        { text: "$300", isCorrect: false, rationale: "This is the interest for one year." },
        { text: "$1200", isCorrect: true, rationale: "Interest = Principal * Rate * Time = 5000 * 0.06 * 4 = $1200." },
        { text: "$6200", isCorrect: false, rationale: "This is the total amount to be repaid." },
        { text: "$120", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Simple interest is calculated using the formula I = P * r * t. So, I = $5000 * 0.06 * 4 = $1200."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the next number in the pattern: 1, 4, 9, 16, 25, ...?",
      answerOptions: [
        { text: "30", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "36", isCorrect: true, rationale: "The pattern is the sequence of square numbers ($1^2, 2^2, 3^2, 4^2, 5^2$). The next is $6^2$, which is 36." },
        { text: "49", isCorrect: false, rationale: "This is $7^2$." },
        { text: "64", isCorrect: false, rationale: "This is $8^2$." }
      ],
      rationale: "This sequence consists of the squares of the positive integers. $1^2$=1, $2^2$=4, $3^2$=9, $4^2$=16, $5^2$=25. The next term is $6^2$, which is 36."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Number Sense & Operations",
  id: "math_number_sense_12",
  title: "Number Sense & Operations: Quiz 12",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the result of 305 + 198?",
      answerOptions: [
        { text: "403", isCorrect: false, rationale: "This is 305+98." },
        { text: "503", isCorrect: true, rationale: "305 + 198 = 503." },
        { text: "493", isCorrect: false, rationale: "This is 305+188." },
        { text: "107", isCorrect: false, rationale: "This is the difference." }
      ],
      rationale: "This is a basic addition problem. 305 + 198 = 503."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "What is 10% of 350?",
      correctAnswer: "35",
      rationale: "To find 10% of a number, you can move the decimal point one place to the left. 10% of 350 is 35."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A lunch bill is $42.00. How much is a 20% tip?",
      answerOptions: [
        { text: "$4.20", isCorrect: false, rationale: "This would be a 10% tip." },
        { text: "$8.40", isCorrect: true, rationale: "A 20% tip is 0.20 * $42.00 = $8.40." },
        { text: "$6.30", isCorrect: false, rationale: "This would be a 15% tip." },
        { text: "$50.40", isCorrect: false, rationale: "This is the total bill with the tip." }
      ],
      rationale: "To calculate the tip, convert the percentage to a decimal and multiply by the bill amount: 0.20 * $42.00 = $8.40."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Evaluate: $60 \\div (5 \times 3) + 2$.",
      correctAnswer: "6",
      rationale: "Order of operations (PEMDAS): Parentheses (5*3=15), Division (60/15=4), Addition (4+2=6)."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of the following numbers is the smallest?",
      answerOptions: [
        { text: "0.5", isCorrect: false, rationale: "This is the largest." },
        { text: "1/3", isCorrect: true, rationale: "1/3 is approx 0.333, which is the smallest." },
        { text: "40%", isCorrect: false, rationale: "40% is 0.4." },
        { text: "0.45", isCorrect: false, rationale: "This is 0.45." }
      ],
      rationale: "To compare, convert all values to decimals: 1/3 ≈ 0.333, 40% = 0.4. The smallest value is 0.333..., which is 1/3."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A population of a town was 10,000. It increased by 10% one year, and then decreased by 10% the next year. What is the population after the two years?",
      answerOptions: [
        { text: "10,000", isCorrect: false, rationale: "The decrease is calculated on the larger population, so it won\'t return to the original." },
        { text: "9,900", isCorrect: true, rationale: "Year 1: 10000*1.1=11000. Year 2: 11000*0.9=9900." },
        { text: "9,000", isCorrect: false, rationale: "This is a 10% decrease from the original." },
        { text: "11,000", isCorrect: false, rationale: "This is the population after the first year." }
      ],
      rationale: "After the first year, the population is 10,000 * 1.10 = 11,000. For the second year, the 10% decrease is calculated on the new population: 11,000 * (1 - 0.10) = 11,000 * 0.90 = 9,900."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "What is the result of multiplying 1/2 by 3/4?",
      correctAnswer: "3/8",
      rationale: "To multiply fractions, multiply the numerators together and the denominators together: (1*3) / (2*4) = 3/8."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "What is the number for \'five thousand two hundred six\'?",
      answerOptions: [
        { text: "5260", isCorrect: false, rationale: "This is five thousand two hundred sixty." },
        { text: "5206", isCorrect: true, rationale: "This correctly places the digits in the thousands, hundreds, and ones places." },
        { text: "5026", isCorrect: false, rationale: "This is five thousand twenty-six." },
        { text: "5200.6", isCorrect: false, rationale: "This is an incorrect representation." }
      ],
      rationale: "The number is composed of 5 thousands, 2 hundreds, and 6 ones, which is written as 5,206."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A company\'s total expenses are $30,000. If salaries account for 65% of the expenses, how much is spent on salaries?",
      correctAnswer: "$19,500",
      rationale: "To find the amount spent on salaries, multiply the total expenses by the percentage: $30,000 * 0.65 = $19,500."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is $\\sqrt{49} + 3^2$?",
      answerOptions: [
        { text: "13", isCorrect: false, rationale: "This is 7+6." },
        { text: "16", isCorrect: true, rationale: "sqrt(49) = 7 and $3^2$ = 9. So, 7 + 9 = 16." },
        { text: "25", isCorrect: false, rationale: "This is $(7+3)^2$." },
        { text: "58", isCorrect: false, rationale: "This is 49+9." }
      ],
      rationale: "First, evaluate the square root and the exponent: sqrt(49) = 7 and $3^2$ = 9. Then, add the results: 7 + 9 = 16."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A recipe for a batch of 24 cookies needs 1.5 cups of sugar. If you only have 1 cup of sugar, how many cookies can you make?",
      answerOptions: [
        { text: "12", isCorrect: false, rationale: "This is half the recipe." },
        { text: "16", isCorrect: true, rationale: "The ratio is 24 cookies / 1.5 cups. With 1 cup, you can make (1/1.5)*24 = 16 cookies." },
        { text: "18", isCorrect: false, rationale: "This is 3/4 of the recipe." },
        { text: "20", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "The ratio of cookies to sugar is 24 cookies / 1.5 cups = 16 cookies per cup. With 1 cup of sugar, you can make 16 cookies."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "What is the absolute value of the difference between 10 and 20?",
      answerOptions: [
        { text: "-10", isCorrect: false, rationale: "Absolute value cannot be negative." },
        { text: "10", isCorrect: true, rationale: "The difference is 10-20 = -10. The absolute value of -10 is 10." },
        { text: "20", isCorrect: false, rationale: "This is one of the numbers." },
        { text: "30", isCorrect: false, rationale: "This is the sum." }
      ],
      rationale: "The difference between 10 and 20 is 10 - 20 = -10. The absolute value of -10, written as |-10|, is 10."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Ratios & Proportions",
  id: "math_ratios_01",
  title: "Ratios & Proportions: Quiz 1",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "A class has 15 boys and 10 girls. What is the ratio of girls to boys?",
      answerOptions: [
        { text: "15:10", isCorrect: false, rationale: "This is the ratio of boys to girls." },
        { text: "10:15", isCorrect: false, rationale: "This is the correct ratio but it is not simplified." },
        { text: "2:3", isCorrect: true, rationale: "The ratio is 10:15, which simplifies to 2:3 by dividing both by 5." },
        { text: "3:2", isCorrect: false, rationale: "This is the simplified ratio of boys to girls." }
      ],
      rationale: "The ratio of girls to boys is 10 to 15, or 10:15. Simplified by dividing both numbers by 5, the ratio is 2:3."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "If a car travels 180 miles in 3 hours, what is its average speed in miles per hour?",
      correctAnswer: "60 mph",
      rationale: "To find the unit rate (speed), divide the distance by the time: 180 miles / 3 hours = 60 miles per hour."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A recipe for 4 people requires 2 cups of flour. How much flour is needed for 10 people?",
      answerOptions: [
        { text: "4 cups", isCorrect: false, rationale: "This is the amount for 8 people, not 10." },
        { text: "5 cups", isCorrect: true, rationale: "The ratio is 2 cups / 4 people = 0.5 cups per person. For 10 people, 10 * 0.5 = 5 cups." },
        { text: "6 cups", isCorrect: false, rationale: "This overestimates the amount of flour needed." },
        { text: "8 cups", isCorrect: false, rationale: "This is the amount for 16 people." }
      ],
      rationale: "Set up a proportion: (2 cups / 4 people) = (x cups / 10 people). Cross-multiply to solve for x: 4x = 20, so x = 5 cups."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A map has a scale of 1 inch : 50 miles. If two cities are 3.5 inches apart on the map, how far apart are they in reality?",
      correctAnswer: "175 miles",
      rationale: "Multiply the map distance by the scale factor: 3.5 inches * 50 miles/inch = 175 miles."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A store owner buys a shirt for $15 and marks it up by 60%. What is the selling price?",
      answerOptions: [
        { text: "$9", isCorrect: false, rationale: "This is the markup amount, not the final price." },
        { text: "$21", isCorrect: false, rationale: "This is a 40% markup, not 60%." },
        { text: "$24", isCorrect: true, rationale: "The markup is 0.60 * $15 = $9. The selling price is $15 + $9 = $24." },
        { text: "$30", isCorrect: false, rationale: "This is a 100% markup." }
      ],
      rationale: "Calculate the markup amount: 60% of $15 is 0.60 * 15 = $9. Add the markup to the original cost: $15 + $9 = $24."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If 3 pounds of apples cost $4.50, what is the cost of 5 pounds of apples?",
      answerOptions: [
        { text: "$1.50", isCorrect: false, rationale: "This is the price per pound." },
        { text: "$6.00", isCorrect: false, rationale: "This is the cost for 4 pounds." },
        { text: "$7.50", isCorrect: true, rationale: "The price per pound is $4.50 / 3 = $1.50. So, 5 pounds cost 5 * $1.50 = $7.50." },
        { text: "$9.00", isCorrect: false, rationale: "This is the cost for 6 pounds." }
      ],
      rationale: "First, find the unit price: $4.50 / 3 pounds = $1.50 per pound. Then multiply by the desired quantity: $1.50 * 5 = $7.50."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A team won 12 games and lost 8. What is the ratio of wins to total games played, in simplest form?",
      correctAnswer: "3:5",
      rationale: "The total games played is 12 + 8 = 20. The ratio of wins to total games is 12:20. Dividing both by 4 simplifies the ratio to 3:5."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A restaurant bill is $62.50. If you want to leave a 20% tip, what is the total amount you will pay?",
      answerOptions: [
        { text: "$12.50", isCorrect: false, rationale: "This is the amount of the tip, not the total bill." },
        { text: "$70.00", isCorrect: false, rationale: "This is the result of a calculation error." },
        { text: "$75.00", isCorrect: true, rationale: "The tip is 0.20 * $62.50 = $12.50. The total amount is $62.50 + $12.50 = $75.00." },
        { text: "$82.50", isCorrect: false, rationale: "This is the result of a 32% tip." }
      ],
      rationale: "Calculate the tip amount: 20% of $62.50 is $12.50. Add the tip to the bill: $62.50 + $12.50 = $75.00."
    },
    {
        questionNumber: 9,
        type: "fillIn",
        calculator: true,
        difficulty: "medium",
        question: "Solve the proportion: $\\frac{x}{9} = \\frac{10}{15}$",
        correctAnswer: "6",
        rationale: "To solve for x, you can cross-multiply: 15 * x = 9 * 10, which gives 15x = 90. Divide by 15 to get x = 6. Alternatively, simplify 10/15 to 2/3 and solve x/9 = 2/3."
      },
      {
        questionNumber: 10,
        type: "multipleChoice",
        calculator: false,
        difficulty: "easy",
        question: "Which of the following ratios is equivalent to 4:7?",
        answerOptions: [
          { text: "7:4", isCorrect: false, rationale: "This ratio is the inverse." },
          { text: "8:12", isCorrect: false, rationale: "8:12 simplifies to 2:3." },
          { text: "12:21", isCorrect: true, rationale: "If you multiply both parts of the ratio 4:7 by 3, you get 12:21." },
          { text: "16:24", isCorrect: false, rationale: "16:24 simplifies to 2:3." }
        ],
        rationale: "To find an equivalent ratio, multiply both parts of the original ratio by the same number. 4 * 3 = 12 and 7 * 3 = 21, so 12:21 is equivalent."
      },
      {
        questionNumber: 11,
        type: "multipleChoice",
        calculator: true,
        difficulty: "hard",
        question: "A company produces 5 defective light bulbs for every 1000 produced. What is the ratio of defective bulbs to total bulbs, expressed as a percentage?",
        answerOptions: [
          { text: "0.05%", isCorrect: false, rationale: "This is 10 times too small." },
          { text: "0.5%", isCorrect: true, rationale: "The ratio is 5/1000 = 0.005. To convert to a percentage, multiply by 100, which gives 0.5%." },
          { text: "5%", isCorrect: false, rationale: "This would be 50 defective bulbs per 1000." },
          { text: "20%", isCorrect: false, rationale: "This is an incorrect calculation." }
        ],
        rationale: "The ratio of defective to total is 5/1000. As a decimal, this is 0.005. To express this as a percentage, multiply by 100: 0.005 * 100 = 0.5%."
      },
      {
        questionNumber: 12,
        type: "multipleChoice",
        calculator: false,
        difficulty: "medium",
        question: "Out of 30 students, 18 are wearing sneakers. What is the ratio of students NOT wearing sneakers to the total number of students?",
        answerOptions: [
          { text: "12:30", isCorrect: false, rationale: "This is the correct ratio, but it is not in simplest form." },
          { text: "18:30", isCorrect: false, rationale: "This is the ratio of students wearing sneakers to the total." },
          { text: "2:5", isCorrect: true, rationale: "12 students are not wearing sneakers (30-18). The ratio is 12:30, which simplifies to 2:5." },
          { text: "3:5", isCorrect: false, rationale: "This is the simplified ratio of students wearing sneakers to the total." }
        ],
        rationale: "First, find the number of students not wearing sneakers: 30 - 18 = 12. The ratio is 12 to 30. Divide both numbers by the greatest common divisor, 6, to simplify the ratio to 2:5."
      }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Ratios & Proportions / Percent Applications",
  id: "math_ratios_02",
  title: "Ratios & Proportions: Quiz 2",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "A mixture contains 8 parts water and 3 parts syrup. What is the ratio of syrup to the total mixture?",
      answerOptions: [
        { text: "3:8", isCorrect: false, rationale: "This is the ratio of syrup to water." },
        { text: "8:3", isCorrect: false, rationale: "This is the ratio of water to syrup." },
        { text: "3:11", isCorrect: true, rationale: "The total mixture has 8 + 3 = 11 parts. The ratio of syrup to total is 3:11." },
        { text: "8:11", isCorrect: false, rationale: "This is the ratio of water to the total mixture." }
      ],
      rationale: "The total number of parts in the mixture is 8 (water) + 3 (syrup) = 11 parts. The ratio of syrup to the total mixture is 3:11."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A phone is discounted by 30%. If the original price was $600, what is the discount amount?",
      correctAnswer: "$180",
      rationale: "To find the discount amount, multiply the original price by the discount percentage: $600 * 0.30 = $180."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If 5 US dollars can be exchanged for 4 Euros, how many Euros can be exchanged for 35 US dollars?",
      answerOptions: [
        { text: "28 Euros", isCorrect: true, rationale: "Set up a proportion: 5/4 = 35/x. Cross-multiply to get 5x = 140. Solve for x to get x = 28." },
        { text: "34 Euros", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "43.75 Euros", isCorrect: false, rationale: "This is the result of dividing 35 by 4/5." },
        { text: "30 Euros", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Set up a proportion: $\\frac{5 \\text{ dollars}}{4 \\text{ Euros}} = \\frac{35 \\text{ dollars}}{x \\text{ Euros}}$. Cross-multiply: $5x = 4 \\times 35$, so $5x = 140$. Divide by 5: $x = 28$ Euros."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "The number of students in a school increased from 500 to 540. What was the percent increase?",
      correctAnswer: "8%",
      rationale: "The increase in students is 540 - 500 = 40. The percent increase is (increase / original amount) * 100 = (40 / 500) * 100 = 0.08 * 100 = 8%."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "A baker uses 3 cups of sugar for every 5 cups of flour. If she uses 15 cups of flour, how much sugar does she need?",
      answerOptions: [
        { text: "5 cups", isCorrect: false, rationale: "This is the original amount of flour." },
        { text: "9 cups", isCorrect: true, rationale: "The ratio is 3:5. Since she is using 3 times the flour (15/5=3), she needs 3 times the sugar (3*3=9)." },
        { text: "12 cups", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "25 cups", isCorrect: false, rationale: "This is the result if the ratio was 5:3." }
      ],
      rationale: "The ratio of sugar to flour is 3:5. Since the amount of flour is multiplied by 3 (from 5 to 15), the amount of sugar should also be multiplied by 3. So, 3 * 3 = 9 cups of sugar."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A survey showed that 3 out of 5 people prefer Brand A coffee. If 250 people were surveyed, how many people prefer Brand A?",
      answerOptions: [
        { text: "100", isCorrect: false, rationale: "This is the number of people who do not prefer Brand A." },
        { text: "125", isCorrect: false, rationale: "This would be half the people." },
        { text: "150", isCorrect: true, rationale: "3/5 of 250 is (3/5) * 250 = 750 / 5 = 150." },
        { text: "200", isCorrect: false, rationale: "This is 4/5 of the people." }
      ],
      rationale: "The fraction of people who prefer Brand A is 3/5. To find the number of people, multiply this fraction by the total number surveyed: $\\frac{3}{5} \\times 250 = 150$ people."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "Sales tax is 7.5%. If you purchase an item for $80, what is the total cost including tax?",
      correctAnswer: "$86.00",
      rationale: "First, calculate the tax amount: 7.5% of $80 is 0.075 * 80 = $6. Then, add the tax to the original price: $80 + $6 = $86."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "On a map, 1 centimeter represents 20 kilometers. How many centimeters on the map represent 150 kilometers?",
      answerOptions: [
        { text: "5 cm", isCorrect: false, rationale: "This would represent 100 km." },
        { text: "7.5 cm", isCorrect: true, rationale: "To find the map distance, divide the actual distance by the scale factor: 150 km / 20 km/cm = 7.5 cm." },
        { text: "10 cm", isCorrect: false, rationale: "This would represent 200 km." },
        { text: "15 cm", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Set up a proportion: $\\frac{1 \\text{ cm}}{20 \\text{ km}} = \\frac{x \\text{ cm}}{150 \\text{ km}}$. Solve for x: $x = \\frac{150}{20} = 7.5$ cm."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Simplify the ratio 24:36.",
      correctAnswer: "2:3",
      rationale: "The greatest common divisor of 24 and 36 is 12. Divide both parts of the ratio by 12: 24/12 = 2 and 36/12 = 3. The simplified ratio is 2:3."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A runner completes an 8-mile race in 60 minutes. What is her average time per mile?",
      answerOptions: [
        { text: "7 minutes", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "7.5 minutes", isCorrect: true, rationale: "Divide the total time by the number of miles: 60 minutes / 8 miles = 7.5 minutes per mile." },
        { text: "8 minutes", isCorrect: false, rationale: "This is the number of miles." },
        { text: "10 minutes", isCorrect: false, rationale: "This would be the pace for a 6-mile race." }
      ],
      rationale: "To find the time per mile, divide the total time by the distance: 60 minutes / 8 miles = 7.5 minutes/mile."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A company\'s profit went from $120,000 to $90,000. What is the percent decrease?",
      answerOptions: [
        { text: "25%", isCorrect: true, rationale: "The decrease is $30,000. The percent decrease is (30,000 / 120,000) * 100 = 0.25 * 100 = 25%." },
        { text: "30%", isCorrect: false, rationale: "This is the decrease in thousands of dollars, not the percentage." },
        { text: "33.3%", isCorrect: false, rationale: "This is the result if you divide the decrease by the new amount." },
        { text: "75%", isCorrect: false, rationale: "This is the new profit as a percentage of the old." }
      ],
      rationale: "The decrease in profit is $120,000 - $90,000 = $30,000. The percent decrease is (decrease / original amount) * 100 = ($30,000 / $120,000) * 100 = 0.25 * 100 = 25%."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A blueprint has a scale of 1 inch = 4 feet. A room on the blueprint is 3 inches by 5 inches. What is the actual area of the room?",
      answerOptions: [
        { text: "15 sq ft", isCorrect: false, rationale: "This is the area on the blueprint." },
        { text: "60 sq ft", isCorrect: false, rationale: "This is the result of multiplying the blueprint area by the scale factor." },
        { text: "120 sq ft", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "240 sq ft", isCorrect: true, rationale: "The actual dimensions are 3*4=12 feet and 5*4=20 feet. The area is 12 * 20 = 240 sq ft." }
      ],
      rationale: "First, convert the blueprint dimensions to actual dimensions. Length = 3 inches * 4 ft/inch = 12 feet. Width = 5 inches * 4 ft/inch = 20 feet. The actual area is 12 feet * 20 feet = 240 square feet."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Ratios & Proportions / Percent Applications",
  id: "math_ratios_03",
  title: "Ratios & Proportions: Quiz 3",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "In a survey, 4 out of 5 dentists recommend a certain toothpaste. Which of the following is an equivalent ratio?",
      answerOptions: [
        { text: "5:4", isCorrect: false, rationale: "This is the inverse ratio." },
        { text: "8:12", isCorrect: false, rationale: "This simplifies to 2:3." },
        { text: "12:15", isCorrect: true, rationale: "Multiplying both parts of the ratio 4:5 by 3 gives 12:15." },
        { text: "16:25", isCorrect: false, rationale: "The second part is not a multiple of 5." }
      ],
      rationale: "An equivalent ratio is found by multiplying both parts of the ratio by the same number. 4 * 3 = 12 and 5 * 3 = 15, so 12:15 is equivalent to 4:5."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A jacket is on sale for $72 after a 20% discount. What was the original price?",
      correctAnswer: "$90",
      rationale: "If the jacket is 20% off, the sale price is 80% of the original price. Let P be the original price. 0.80 * P = $72. P = $72 / 0.80 = $90."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A machine can produce 150 widgets in 30 minutes. What is the production rate in widgets per hour?",
      answerOptions: [
        { text: "5", isCorrect: false, rationale: "This is the rate in widgets per minute." },
        { text: "180", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "300", isCorrect: true, rationale: "If it produces 150 in 30 minutes, it will produce twice as many in 60 minutes (1 hour). 150 * 2 = 300." },
        { text: "4500", isCorrect: false, rationale: "This is the result of multiplying 150 by 30." }
      ],
      rationale: "There are 60 minutes in an hour. Since the machine produces 150 widgets in 30 minutes, it will produce 150 * 2 = 300 widgets in 60 minutes."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A recipe calls for 1 cup of sugar to make 12 cookies. How much sugar is needed for 36 cookies?",
      correctAnswer: "3 cups",
      rationale: "36 cookies is 3 times the original recipe of 12 cookies. So, you need 3 times the amount of sugar: 1 cup * 3 = 3 cups."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A investment of $500 earns 4% simple interest per year. How much interest is earned after 3 years?",
      answerOptions: [
        { text: "$20", isCorrect: false, rationale: "This is the interest earned in only one year." },
        { text: "$40", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$60", isCorrect: true, rationale: "Interest per year is 0.04 * $500 = $20. Over 3 years, the total interest is $20 * 3 = $60." },
        { text: "$560", isCorrect: false, rationale: "This is the total amount after 3 years, not just the interest." }
      ],
      rationale: "Simple interest is calculated as I = P * r * t. So, I = $500 * 0.04 * 3 = $60."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "In a class of 40 students, 25 are girls. What percentage of the class is boys?",
      answerOptions: [
        { text: "15%", isCorrect: false, rationale: "This is the number of boys, not the percentage." },
        { text: "37.5%", isCorrect: true, rationale: "There are 40 - 25 = 15 boys. The percentage is (15 / 40) * 100 = 37.5%." },
        { text: "60%", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "62.5%", isCorrect: false, rationale: "This is the percentage of girls in the class." }
      ],
      rationale: "First, find the number of boys: 40 - 25 = 15. Then, calculate the percentage: (15 boys / 40 total students) * 100 = 0.375 * 100 = 37.5%."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A car is traveling at a constant speed of 65 miles per hour. How many miles will it travel in 2.5 hours?",
      correctAnswer: "162.5 miles",
      rationale: "Distance = Speed * Time. So, Distance = 65 mph * 2.5 hours = 162.5 miles."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "A garden has 18 rose bushes and 6 lily plants. What is the ratio of rose bushes to lily plants in simplest form?",
      answerOptions: [
        { text: "18:6", isCorrect: false, rationale: "This ratio is not simplified." },
        { text: "3:1", isCorrect: true, rationale: "Divide both sides of the ratio 18:6 by their greatest common divisor, 6." },
        { text: "1:3", isCorrect: false, rationale: "This is the ratio of lilies to roses." },
        { text: "3:4", isCorrect: false, rationale: "This is the ratio of roses to total plants." }
      ],
      rationale: "The ratio is 18 rose bushes to 6 lily plants. To simplify, divide both numbers by 6. 18/6 = 3, and 6/6 = 1. The simplified ratio is 3:1."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "An item costs $120. With sales tax, the total cost is $127.20. What is the sales tax rate?",
      correctAnswer: "6%",
      rationale: "The tax amount is $127.20 - $120 = $7.20. The tax rate is (tax amount / original price) * 100 = ($7.20 / $120) * 100 = 0.06 * 100 = 6%."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If a person burns 120 calories by walking 1 mile, how many miles must they walk to burn 300 calories?",
      answerOptions: [
        { text: "2 miles", isCorrect: false, rationale: "This would burn 240 calories." },
        { text: "2.5 miles", isCorrect: true, rationale: "Set up a proportion: 120/1 = 300/x. 120x = 300. x = 300/120 = 2.5." },
        { text: "3 miles", isCorrect: false, rationale: "This would burn 360 calories." },
        { text: "4 miles", isCorrect: false, rationale: "This would burn 480 calories." }
      ],
      rationale: "To find the number of miles, divide the total calories to be burned by the calories burned per mile: 300 calories / 120 calories/mile = 2.5 miles."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "Which of the following deals is the best value?",
      answerOptions: [
        { text: "3 apples for $1.50", isCorrect: false, rationale: "This is $0.50 per apple." },
        { text: "4 apples for $1.80", isCorrect: true, rationale: "This is $0.45 per apple, which is the lowest price." },
        { text: "5 apples for $2.50", isCorrect: false, rationale: "This is $0.50 per apple." },
        { text: "2 apples for $1.00", isCorrect: false, rationale: "This is $0.50 per apple." }
      ],
      rationale: "To find the best value, calculate the unit price for each option: A) $1.50/3 = $0.50/apple, B) $1.80/4 = $0.45/apple, C) $2.50/5 = $0.50/apple, D) $1.00/2 = $0.50/apple. The lowest price per apple is $0.45."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A population of bacteria doubles every hour. If there are 100 bacteria initially, how many will there be after 4 hours?",
      answerOptions: [
        { text: "400", isCorrect: false, rationale: "This is 100*4." },
        { text: "800", isCorrect: false, rationale: "This is 100*2*4." },
        { text: "1600", isCorrect: true, rationale: "Initial: 100. Hour 1: 200. Hour 2: 400. Hour 3: 800. Hour 4: 1600." },
        { text: "100000000", isCorrect: false, rationale: "This is 100^4." }
      ],
      rationale: "This is an example of exponential growth. The population is multiplied by 2 each hour. After 4 hours, the population will be $100 \\times 2^4 = 100 \\times 16 = 1600$."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Ratios & Proportions / Percent Applications",
  id: "math_ratios_04",
  title: "Ratios & Proportions: Quiz 4",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "A basketball team has a win-loss ratio of 5:3. If they played 24 games, how many games did they win?",
      answerOptions: [
        { text: "8", isCorrect: false, rationale: "This is the number of losses multiplied by a factor of 1." },
        { text: "9", isCorrect: false, rationale: "This is the number of losses." },
        { text: "15", isCorrect: true, rationale: "The ratio parts are 5+3=8. The factor is 24/8=3. So, wins are 5*3=15." },
        { text: "21", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "The ratio of wins to losses is 5:3, which means for every 8 games played (5+3), 5 are wins. Since they played 24 games (which is 8 * 3), they won 5 * 3 = 15 games."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A shirt that costs $40 is on sale for 15% off. What is the sale price?",
      correctAnswer: "$34",
      rationale: "First, calculate the discount: 15% of $40 is 0.15 * 40 = $6. Then, subtract the discount from the original price: $40 - $6 = $34."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "The price of a gallon of gas increased from $3.00 to $3.60. What was the percent increase?",
      answerOptions: [
        { text: "15%", isCorrect: false, rationale: "This would be a $0.45 increase." },
        { text: "20%", isCorrect: true, rationale: "The increase was $0.60. The percent increase is (0.60 / 3.00) * 100 = 20%." },
        { text: "25%", isCorrect: false, rationale: "This would be a $0.75 increase." },
        { text: "60%", isCorrect: false, rationale: "This is the increase in cents." }
      ],
      rationale: "The increase in price is $3.60 - $3.00 = $0.60. The percent increase is (increase / original price) * 100 = ($0.60 / $3.00) * 100 = 0.20 * 100 = 20%."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A map scale is 1 inch : 25 miles. If the distance on the map is 4 inches, what is the actual distance?",
      correctAnswer: "100 miles",
      rationale: "Multiply the map distance by the scale factor: 4 inches * 25 miles/inch = 100 miles."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A car is traveling at 50 miles per hour. How many minutes does it take to travel 30 miles?",
      answerOptions: [
        { text: "30 minutes", isCorrect: false, rationale: "This would be the time for a 25-mile trip." },
        { text: "36 minutes", isCorrect: true, rationale: "Time = Distance / Speed = 30 miles / 50 mph = 0.6 hours. To convert to minutes, 0.6 * 60 = 36 minutes." },
        { text: "40 minutes", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "1.67 minutes", isCorrect: false, rationale: "This is the result of dividing speed by distance." }
      ],
      rationale: "Time = Distance / Speed. Time = 30 miles / 50 mph = 0.6 hours. To convert hours to minutes, multiply by 60: 0.6 * 60 = 36 minutes."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If 8 out of 20 students in a class have brown eyes, what percentage of students have brown eyes?",
      answerOptions: [
        { text: "20%", isCorrect: false, rationale: "This is the number of students." },
        { text: "30%", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "40%", isCorrect: true, rationale: "The fraction is 8/20, which is equal to 4/10 or 0.4. As a percentage, this is 40%." },
        { text: "50%", isCorrect: false, rationale: "This would be 10 out of 20 students." }
      ],
      rationale: "To find the percentage, divide the number of students with brown eyes by the total number of students and multiply by 100: (8 / 20) * 100 = 0.4 * 100 = 40%."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A meal costs $50. You leave a tip of $8. What percentage tip did you leave?",
      correctAnswer: "16%",
      rationale: "To find the percentage, divide the tip amount by the cost of the meal and multiply by 100: ($8 / $50) * 100 = 0.16 * 100 = 16%."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "There are 10 pens and 15 pencils in a jar. What is the ratio of pencils to total items?",
      answerOptions: [
        { text: "10:15", isCorrect: false, rationale: "This is the ratio of pens to pencils." },
        { text: "15:25", isCorrect: false, rationale: "This is the correct ratio but it\'s not simplified." },
        { text: "2:3", isCorrect: false, rationale: "This is the simplified ratio of pens to pencils." },
        { text: "3:5", isCorrect: true, rationale: "There are 15 pencils and 25 total items (10+15). The ratio is 15:25, which simplifies to 3:5." }
      ],
      rationale: "The total number of items is 10 + 15 = 25. The ratio of pencils to total items is 15:25. Divide both numbers by 5 to simplify to 3:5."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Solve the proportion: $\\frac{6}{x} = \\frac{18}{24}$",
      correctAnswer: "8",
      rationale: "Simplify the fraction 18/24 to 3/4. So, 6/x = 3/4. Cross-multiply: 3x = 24. Solve for x: x = 8."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A recipe for 12 muffins requires 2 cups of flour. How many cups of flour are needed for 18 muffins?",
      answerOptions: [
        { text: "2.5 cups", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "3 cups", isCorrect: true, rationale: "18 muffins is 1.5 times the original recipe. So, you need 1.5 * 2 = 3 cups of flour." },
        { text: "4 cups", isCorrect: false, rationale: "This would be for 24 muffins." },
        { text: "6 cups", isCorrect: false, rationale: "This would be for 36 muffins." }
      ],
      rationale: "Set up a proportion: $\\frac{12 \\text{ muffins}}{2 \\text{ cups}} = \\frac{18 \\text{ muffins}}{x \\text{ cups}}$. Cross-multiply: $12x = 36$. Divide by 12: $x = 3$ cups."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "If a company has 200 employees and 45% are male, how many female employees are there?",
      answerOptions: [
        { text: "55", isCorrect: false, rationale: "This is the percentage of female employees." },
        { text: "90", isCorrect: false, rationale: "This is the number of male employees." },
        { text: "110", isCorrect: true, rationale: "If 45% are male, 55% are female. 55% of 200 is 0.55 * 200 = 110." },
        { text: "155", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "First, find the percentage of female employees: 100% - 45% = 55%. Then, calculate the number of female employees: 0.55 * 200 = 110."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A model car is built with a scale of 1:18. If the model is 10 inches long, how long is the actual car in inches?",
      answerOptions: [
        { text: "1.8 inches", isCorrect: false, rationale: "This is the result of dividing by 10." },
        { text: "28 inches", isCorrect: false, rationale: "This is 10+18." },
        { text: "180 inches", isCorrect: true, rationale: "The actual car is 18 times longer than the model. 10 inches * 18 = 180 inches." },
        { text: "1800 inches", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "The scale 1:18 means the actual car is 18 times larger than the model. So, the actual length is 10 inches * 18 = 180 inches."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Ratios & Proportions / Percent Applications",
  id: "math_ratios_05",
  title: "Ratios & Proportions: Quiz 5",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "A recipe calls for 2 eggs for every 3 cups of flour. What is the ratio of eggs to flour?",
      answerOptions: [
        { text: "3:2", isCorrect: false, rationale: "This is the ratio of flour to eggs." },
        { text: "2:3", isCorrect: true, rationale: "The ratio is 2 eggs to 3 cups of flour." },
        { text: "2:5", isCorrect: false, rationale: "This is the ratio of eggs to total ingredients listed." },
        { text: "3:5", isCorrect: false, rationale: "This is the ratio of flour to total ingredients listed." }
      ],
      rationale: "The ratio is stated directly in the problem: 2 eggs for every 3 cups of flour, which is a ratio of 2:3."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A TV is priced at $450. A 10% sales tax is added. What is the total cost?",
      correctAnswer: "$495",
      rationale: "Calculate the sales tax: 10% of $450 is 0.10 * 450 = $45. Add the tax to the original price: $450 + $45 = $495."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A runner travels 12 miles in 1.5 hours. What is her average speed in miles per hour?",
      answerOptions: [
        { text: "6 mph", isCorrect: false, rationale: "This would be for a 9-mile run." },
        { text: "8 mph", isCorrect: true, rationale: "Speed = Distance / Time = 12 miles / 1.5 hours = 8 mph." },
        { text: "10 mph", isCorrect: false, rationale: "This would be for a 15-mile run." },
        { text: "18 mph", isCorrect: false, rationale: "This is the product of distance and time." }
      ],
      rationale: "To find the speed, divide the distance traveled by the time it took: 12 miles / 1.5 hours = 8 miles per hour."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "If a box of 12 pencils costs $3, what is the cost per pencil in cents?",
      correctAnswer: "25 cents",
      rationale: "$3 is equal to 300 cents. The cost per pencil is 300 cents / 12 pencils = 25 cents."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A store increases the price of a $20 item by 20%, and then offers a 20% discount on the new price. What is the final price?",
      answerOptions: [
        { text: "$19.20", isCorrect: true, rationale: "New price: $20 * 1.20 = $24. Discounted price: $24 * 0.80 = $19.20." },
        { text: "$20.00", isCorrect: false, rationale: "The discount is taken on the higher price, so the final price is lower." },
        { text: "$20.80", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$24.00", isCorrect: false, rationale: "This is the price after the markup, before the discount." }
      ],
      rationale: "First, the price is increased by 20%: $20 * 1.20 = $24. Then, this new price is discounted by 20%: $24 * (1 - 0.20) = $24 * 0.80 = $19.20."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Out of 500 students, 70% have a pet. How many students do NOT have a pet?",
      answerOptions: [
        { text: "30", isCorrect: false, rationale: "This is the percentage of students who do not have a pet." },
        { text: "150", isCorrect: true, rationale: "If 70% have a pet, 30% do not. 30% of 500 is 0.30 * 500 = 150." },
        { text: "350", isCorrect: false, rationale: "This is the number of students who have a pet." },
        { text: "430", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "First, find the percentage of students who do not have a pet: 100% - 70% = 30%. Then, calculate this number: 0.30 * 500 = 150 students."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A car\'s value decreased from $15,000 to $12,000. What was the percent decrease?",
      correctAnswer: "20%",
      rationale: "The decrease in value is $15,000 - $12,000 = $3,000. The percent decrease is (decrease / original value) * 100 = ($3,000 / $15,000) * 100 = 0.20 * 100 = 20%."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Which ratio is equivalent to 3:4?",
      answerOptions: [
        { text: "4:3", isCorrect: false, rationale: "This is the inverse ratio." },
        { text: "6:9", isCorrect: false, rationale: "This simplifies to 2:3." },
        { text: "9:12", isCorrect: true, rationale: "Multiply both parts of 3:4 by 3 to get 9:12." },
        { text: "12:15", isCorrect: false, rationale: "This simplifies to 4:5." }
      ],
      rationale: "To find an equivalent ratio, multiply both parts by the same number. 3 * 3 = 9 and 4 * 3 = 12, so 9:12 is equivalent."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "A factory produces 2 defective items for every 500 produced. What is the ratio of defective to non-defective items, in simplest form?",
      correctAnswer: "1:249",
      rationale: "If 2 are defective out of 500, then 498 are non-defective. The ratio is 2:498, which simplifies to 1:249 by dividing both by 2."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If a 6-foot person casts a 4-foot shadow, how long is the shadow of a 9-foot tall signpost at the same time?",
      answerOptions: [
        { text: "4 feet", isCorrect: false, rationale: "This is the shadow length of the person." },
        { text: "6 feet", isCorrect: true, rationale: "The ratio of height to shadow is 6:4 or 3:2. So, for a 9-foot signpost, the shadow is (2/3)*9 = 6 feet." },
        { text: "9 feet", isCorrect: false, rationale: "This is the height of the signpost." },
        { text: "13.5 feet", isCorrect: false, rationale: "This is the height of an object that would cast a 9-foot shadow." }
      ],
      rationale: "Set up a proportion of height to shadow length: $\\frac{6}{4} = \\frac{9}{x}$. Cross-multiply: $6x = 36$. Divide by 6: $x = 6$ feet."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "You get a 15% commission on all sales. If you want to earn $600 in commission, how much must you sell?",
      answerOptions: [
        { text: "$90", isCorrect: false, rationale: "This is 15% of $600." },
        { text: "$4000", isCorrect: true, rationale: "Let S be the total sales. 0.15 * S = $600. S = $600 / 0.15 = $4000." },
        { text: "$6000", isCorrect: false, rationale: "This would be a 10% commission rate." },
        { text: "$9000", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Let S be the total sales. The commission is 15% of S, so 0.15 * S = $600. To find S, divide $600 by 0.15: S = 4000."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: false,
      difficulty: "medium",
      question: "A company has 80 employees. 20 of them are managers. What is the ratio of managers to non-managers?",
      answerOptions: [
        { text: "1:4", isCorrect: false, rationale: "This is the ratio of managers to total employees." },
        { text: "1:3", isCorrect: true, rationale: "There are 20 managers and 60 non-managers. The ratio is 20:60, which simplifies to 1:3." },
        { text: "3:4", isCorrect: false, rationale: "This is the ratio of non-managers to total employees." },
        { text: "3:1", isCorrect: false, rationale: "This is the ratio of non-managers to managers." }
      ],
      rationale: "If there are 80 employees and 20 are managers, then 80 - 20 = 60 are non-managers. The ratio of managers to non-managers is 20:60. This simplifies to 1:3 by dividing both by 20."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Ratios & Proportions / Percent Applications",
  id: "math_ratios_06",
  title: "Ratios & Proportions: Quiz 6",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "In a box of 24 donuts, 8 are glazed. What is the ratio of glazed donuts to the total number of donuts, in simplest form?",
      answerOptions: [
        { text: "8:24", isCorrect: false, rationale: "This is the correct ratio but not simplified." },
        { text: "1:3", isCorrect: true, rationale: "Divide both parts of the ratio 8:24 by their greatest common divisor, 8." },
        { text: "1:2", isCorrect: false, rationale: "This is the ratio of glazed to non-glazed donuts." },
        { text: "3:1", isCorrect: false, rationale: "This is the inverse of the simplified ratio." }
      ],
      rationale: "The ratio of glazed donuts to total is 8:24. Both numbers are divisible by 8. 8/8 = 1 and 24/8 = 3. The simplified ratio is 1:3."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A computer that was originally $1200 is now on sale for $900. What is the percent decrease in price?",
      correctAnswer: "25%",
      rationale: "The price decreased by $1200 - $900 = $300. The percent decrease is (decrease / original price) * 100 = ($300 / $1200) * 100 = 0.25 * 100 = 25%."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A cyclist travels at 15 miles per hour. How far will she travel in 2.5 hours?",
      answerOptions: [
        { text: "30 miles", isCorrect: false, rationale: "This is the distance for 2 hours." },
        { text: "37.5 miles", isCorrect: true, rationale: "Distance = Speed * Time = 15 mph * 2.5 hours = 37.5 miles." },
        { text: "45 miles", isCorrect: false, rationale: "This is the distance for 3 hours." },
        { text: "6 miles", isCorrect: false, rationale: "This is the speed divided by time." }
      ],
      rationale: "Use the formula Distance = Speed x Time. Distance = 15 mph * 2.5 hours = 37.5 miles."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "If 3 oranges cost $1.50, what is the cost of one orange?",
      correctAnswer: "$0.50",
      rationale: "To find the cost of one orange, divide the total cost by the number of oranges: $1.50 / 3 = $0.50."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A city\'s population grew by 5% this year. If the population last year was 80,000, what is the population now?",
      answerOptions: [
        { text: "4000", isCorrect: false, rationale: "This is the amount of the increase, not the new population." },
        { text: "76,000", isCorrect: false, rationale: "This is the population after a 5% decrease." },
        { text: "84,000", isCorrect: true, rationale: "The increase is 5% of 80,000, which is 4,000. The new population is 80,000 + 4,000 = 84,000." },
        { text: "85,000", isCorrect: false, rationale: "This would be a 6.25% increase." }
      ],
      rationale: "First, calculate the population increase: 5% of 80,000 is 0.05 * 80,000 = 4,000. Then, add this to the original population: 80,000 + 4,000 = 84,000."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A survey of 150 people found that 90 preferred comedies. What percentage of people preferred comedies?",
      answerOptions: [
        { text: "30%", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "60%", isCorrect: true, rationale: "(90 / 150) * 100 = 0.6 * 100 = 60%." },
        { text: "75%", isCorrect: false, rationale: "This would be 112.5 people." },
        { text: "90%", isCorrect: false, rationale: "This is the number of people, not the percentage." }
      ],
      rationale: "To find the percentage, divide the number of people who preferred comedies by the total number of people surveyed, and multiply by 100: (90 / 150) * 100 = 0.6 * 100 = 60%."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A recipe requires flour and sugar in a ratio of 5:2. If you use 8 cups of flour, how much sugar do you need?",
      correctAnswer: "3.2 cups",
      rationale: "Set up a proportion: 5/2 = 8/x. Cross-multiply: 5x = 16. Solve for x: x = 16/5 = 3.2 cups."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Solve the proportion: $\\frac{2}{3} = \\frac{x}{12}$",
      answerOptions: [
        { text: "4", isCorrect: false, rationale: "This is 12/3." },
        { text: "6", isCorrect: false, rationale: "This is 12/2." },
        { text: "8", isCorrect: true, rationale: "To get from 3 to 12, you multiply by 4. So, multiply 2 by 4 to get x = 8." },
        { text: "18", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "To solve for x, you can see that the denominator is multiplied by 4 (3 * 4 = 12). So, the numerator must also be multiplied by 4: 2 * 4 = 8."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "You pay $12 for a movie ticket that was 25% off. What was the original price?",
      correctAnswer: "$16",
      rationale: "If the ticket was 25% off, you paid 75% of the original price. Let P be the original price. 0.75 * P = $12. P = $12 / 0.75 = $16."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "On a school trip, there is 1 teacher for every 15 students. If there are 120 students, how many teachers are there?",
      answerOptions: [
        { text: "6", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "8", isCorrect: true, rationale: "Divide the number of students by the student-to-teacher ratio: 120 / 15 = 8." },
        { text: "10", isCorrect: false, rationale: "This would be for 150 students." },
        { text: "15", isCorrect: false, rationale: "This is the number of students per teacher." }
      ],
      rationale: "To find the number of teachers, divide the total number of students by the number of students per teacher: 120 students / 15 students/teacher = 8 teachers."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "The ratio of boys to girls in a school is 4:5. If there are 360 students in total, how many are boys?",
      answerOptions: [
        { text: "160", isCorrect: true, rationale: "The ratio parts are 4+5=9. 360/9 = 40. Boys = 4 * 40 = 160." },
        { text: "180", isCorrect: false, rationale: "This would be if the ratio was 1:1." },
        { text: "200", isCorrect: false, rationale: "This is the number of girls." },
        { text: "288", isCorrect: false, rationale: "This is 4/5 of 360." }
      ],
      rationale: "The total number of parts in the ratio is 4 + 5 = 9. Divide the total number of students by the total number of parts to find the value of one part: 360 / 9 = 40. The number of boys is 4 parts, so 4 * 40 = 160."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A map has a scale where 2 inches represents 75 miles. How many miles does 5 inches represent?",
      answerOptions: [
        { text: "150 miles", isCorrect: false, rationale: "This is for 4 inches." },
        { text: "187.5 miles", isCorrect: true, rationale: "The rate is 75/2 = 37.5 miles per inch. 5 inches * 37.5 miles/inch = 187.5 miles." },
        { text: "225 miles", isCorrect: false, rationale: "This would be for 6 inches." },
        { text: "375 miles", isCorrect: false, rationale: "This is 75*5." }
      ],
      rationale: "First, find the unit rate: 75 miles / 2 inches = 37.5 miles per inch. Then, multiply by the new distance: 37.5 miles/inch * 5 inches = 187.5 miles."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Ratios & Proportions / Percent Applications",
  id: "math_ratios_07",
  title: "Ratios & Proportions: Quiz 7",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "A classroom has 14 girls and 16 boys. What is the ratio of boys to girls in simplest form?",
      answerOptions: [
        { text: "14:16", isCorrect: false, rationale: "This is the ratio of girls to boys, not simplified." },
        { text: "7:8", isCorrect: false, rationale: "This is the simplified ratio of girls to boys." },
        { text: "8:7", isCorrect: true, rationale: "The ratio is 16:14, which simplifies to 8:7 by dividing both by 2." },
        { text: "16:30", isCorrect: false, rationale: "This is the ratio of boys to total students." }
      ],
      rationale: "The ratio of boys to girls is 16 to 14. To simplify, find the greatest common divisor, which is 2. Divide both parts of the ratio by 2: 16/2 = 8 and 14/2 = 7. The simplified ratio is 8:7."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A dinner bill is $85. You want to leave an 18% tip. How much is the tip?",
      correctAnswer: "$15.30",
      rationale: "To find the tip amount, convert the percentage to a decimal and multiply by the bill: 0.18 * $85 = $15.30."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A model airplane has a scale of 1:72. If the model is 10 inches long, how long is the actual airplane in feet?",
      answerOptions: [
        { text: "60 feet", isCorrect: true, rationale: "The actual length is 10 * 72 = 720 inches. To convert to feet, divide by 12: 720 / 12 = 60 feet." },
        { text: "72 feet", isCorrect: false, rationale: "This would be for a 1-foot model." },
        { text: "720 feet", isCorrect: false, rationale: "This is the length in inches." },
        { text: "86.4 feet", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "First, find the actual length in inches: 10 inches * 72 = 720 inches. Then, convert inches to feet by dividing by 12: 720 inches / 12 inches/foot = 60 feet."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "Solve for y: $\\frac{5}{2} = \\frac{y}{10}$.",
      correctAnswer: "25",
      rationale: "To get from 2 to 10 in the denominator, you multiply by 5. So, multiply the numerator by 5 as well: 5 * 5 = 25."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "The number of members in a club increased by 150%, from 20 to what new number?",
      answerOptions: [
        { text: "30", isCorrect: false, rationale: "This is a 50% increase." },
        { text: "35", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "50", isCorrect: true, rationale: "A 150% increase means the new number is 250% of the original. 2.50 * 20 = 50. Or, the increase is 1.50*20=30, so the new number is 20+30=50." },
        { text: "200", isCorrect: false, rationale: "This is a 900% increase." }
      ],
      rationale: "A 150% increase means the amount of increase is 1.50 times the original number. Increase = 1.50 * 20 = 30. The new number is the original number plus the increase: 20 + 30 = 50."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If a construction crew can pave 2 miles of road in 5 hours, how many hours will it take them to pave 7 miles?",
      answerOptions: [
        { text: "14 hours", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "15 hours", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "17.5 hours", isCorrect: true, rationale: "The rate is 5 hours / 2 miles = 2.5 hours per mile. For 7 miles, it will take 7 * 2.5 = 17.5 hours." },
        { text: "20 hours", isCorrect: false, rationale: "This would be for 8 miles." }
      ],
      rationale: "First, find the unit rate of paving: 5 hours / 2 miles = 2.5 hours per mile. Then, multiply this rate by the desired distance: 2.5 hours/mile * 7 miles = 17.5 hours."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A product is marked up 25% from its wholesale price of $80. What is the retail price?",
      correctAnswer: "$100",
      rationale: "The markup is 25% of $80, which is 0.25 * 80 = $20. The retail price is the wholesale price plus the markup: $80 + $20 = $100."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "A poll shows that 6 out of 10 people prefer summer over winter. What is this ratio in simplest form?",
      answerOptions: [
        { text: "6:10", isCorrect: false, rationale: "This ratio is not simplified." },
        { text: "3:5", isCorrect: true, rationale: "Divide both parts of the ratio 6:10 by 2." },
        { text: "5:3", isCorrect: false, rationale: "This is the inverse ratio." },
        { text: "2:5", isCorrect: false, rationale: "This is the ratio of people who prefer winter to the total." }
      ],
      rationale: "The ratio is 6 to 10. Both numbers are divisible by 2. 6/2 = 3 and 10/2 = 5. The simplified ratio is 3:5."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A car rental company charges $50 per day. If a customer paid $250, how many days did they rent the car for?",
      correctAnswer: "5 days",
      rationale: "Divide the total cost by the daily rate: $250 / $50/day = 5 days."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If a 12-ounce bottle of shampoo costs $3.60, what is the price per ounce?",
      answerOptions: [
        { text: "$0.25", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$0.30", isCorrect: true, rationale: "Divide the total cost by the number of ounces: $3.60 / 12 oz = $0.30/oz." },
        { text: "$0.36", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$3.00", isCorrect: false, rationale: "This would be the price for 10 ounces." }
      ],
      rationale: "To find the price per ounce, divide the total cost by the number of ounces: $3.60 / 12 ounces = $0.30 per ounce."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "The ratio of an object\'s weight on Mars to its weight on Earth is approximately 2:5. If a person weighs 180 pounds on Earth, what would they weigh on Mars?",
      answerOptions: [
        { text: "36 pounds", isCorrect: false, rationale: "This would be a 1:5 ratio." },
        { text: "72 pounds", isCorrect: true, rationale: "Set up the proportion 2/5 = x/180. 5x = 360. x = 72." },
        { text: "90 pounds", isCorrect: false, rationale: "This would be a 1:2 ratio." },
        { text: "450 pounds", isCorrect: false, rationale: "This is 180 * 5 / 2." }
      ],
      rationale: "Set up a proportion: $\\frac{2 \\text{ (Mars)}}{5 \\text{ (Earth)}} = \\frac{x \\text{ pounds (Mars)}}{180 \\text{ pounds (Earth)}}$. Cross-multiply: $5x = 2 \\times 180$, so $5x = 360$. Divide by 5: $x = 72$ pounds."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A company with 300 employees finds that 24 of them are left-handed. What percentage of employees are left-handed?",
      answerOptions: [
        { text: "8%", isCorrect: true, rationale: "(24 / 300) * 100 = 0.08 * 100 = 8%." },
        { text: "12.5%", isCorrect: false, rationale: "This is 24/192." },
        { text: "24%", isCorrect: false, rationale: "This is the number of left-handed employees." },
        { text: "92%", isCorrect: false, rationale: "This is the percentage of right-handed employees." }
      ],
      rationale: "To find the percentage, divide the number of left-handed employees by the total number of employees and multiply by 100: (24 / 300) * 100 = 0.08 * 100 = 8%."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Ratios & Proportions / Percent Applications",
  id: "math_ratios_08",
  title: "Ratios & Proportions: Quiz 8",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "A recipe uses 1 cup of sugar for every 2 cups of flour. If you use 6 cups of flour, how much sugar do you need?",
      answerOptions: [
        { text: "2 cups", isCorrect: false, rationale: "This is the original amount of flour." },
        { text: "3 cups", isCorrect: true, rationale: "The amount of flour is 3 times the original, so you need 3 times the sugar: 1*3=3." },
        { text: "4 cups", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "6 cups", isCorrect: false, rationale: "This is the amount of flour." }
      ],
      rationale: "The ratio of sugar to flour is 1:2. Since you are using 6 cups of flour, which is 3 times the amount in the ratio, you need 3 times the amount of sugar. 1 cup * 3 = 3 cups."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A laptop is on sale for $450, which is 25% off the original price. What was the original price?",
      correctAnswer: "$600",
      rationale: "If the price is 25% off, it is 75% of the original price. Let P be the original price. 0.75 * P = $450. P = $450 / 0.75 = $600."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A train travels 350 miles in 5 hours. What is its average speed in miles per hour?",
      answerOptions: [
        { text: "60 mph", isCorrect: false, rationale: "This would be for a 300-mile trip." },
        { text: "70 mph", isCorrect: true, rationale: "Speed = 350 miles / 5 hours = 70 mph." },
        { text: "75 mph", isCorrect: false, rationale: "This would be for a 375-mile trip." },
        { text: "1750 mph", isCorrect: false, rationale: "This is the product of distance and time." }
      ],
      rationale: "Speed is calculated by dividing distance by time. Speed = 350 miles / 5 hours = 70 mph."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A basketball player makes 7 out of 10 free throws. What is the ratio of made free throws to missed free throws?",
      correctAnswer: "7:3",
      rationale: "If 7 are made out of 10, then 3 are missed. The ratio of made to missed is 7:3."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A restaurant bill is $120. A 15% tip is added, and then a 5% local tax is added to the total. What is the final amount?",
      answerOptions: [
        { text: "$144.90", isCorrect: true, rationale: "Bill with tip: $120 * 1.15 = $138. Total with tax: $138 * 1.05 = $144.90." },
        { text: "$144.00", isCorrect: false, rationale: "This is a 20% increase." },
        { text: "$138.00", isCorrect: false, rationale: "This is the bill with the tip, but before tax." },
        { text: "$126.00", isCorrect: false, rationale: "This is the bill with tax, but before tip." }
      ],
      rationale: "First, add the 15% tip: $120 * 1.15 = $138. Then, add the 5% tax to this new total: $138 * 1.05 = $144.90."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If 2.5 centimeters on a map represents 100 kilometers, how many kilometers does 4 centimeters represent?",
      answerOptions: [
        { text: "150 km", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "160 km", isCorrect: true, rationale: "The scale is 100/2.5 = 40 km/cm. So, 4 cm represents 4 * 40 = 160 km." },
        { text: "250 km", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "400 km", isCorrect: false, rationale: "This is 100*4." }
      ],
      rationale: "First, find the unit rate: 100 km / 2.5 cm = 40 km per cm. Then, multiply by the new map distance: 40 km/cm * 4 cm = 160 km."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A company\'s profits increased from $200,000 to $250,000. What was the percent increase?",
      correctAnswer: "25%",
      rationale: "The increase is $50,000. The percent increase is (increase / original amount) * 100 = (50,000 / 200,000) * 100 = 0.25 * 100 = 25%."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Simplify the ratio 45:60.",
      answerOptions: [
        { text: "3:4", isCorrect: true, rationale: "Both numbers are divisible by 15. 45/15=3, 60/15=4." },
        { text: "4:3", isCorrect: false, rationale: "This is the inverse ratio." },
        { text: "9:12", isCorrect: false, rationale: "This is simplified by 5, but not to the lowest terms." },
        { text: "15:20", isCorrect: false, rationale: "This is simplified by 3, but not to the lowest terms." }
      ],
      rationale: "The greatest common divisor of 45 and 60 is 15. Divide both parts of the ratio by 15: 45/15 = 3 and 60/15 = 4. The simplified ratio is 3:4."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "A survey of 80 students showed that 48 of them have a sibling. What is this ratio as a percentage?",
      correctAnswer: "60%",
      rationale: "The fraction of students with a sibling is 48/80. This simplifies to 6/10 or 3/5. As a percentage, 3/5 is 60%."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If 4 tickets to a play cost $90, what is the cost of 7 tickets?",
      answerOptions: [
        { text: "$157.50", isCorrect: true, rationale: "The cost per ticket is $90/4 = $22.50. So, 7 tickets cost 7 * $22.50 = $157.50." },
        { text: "$135.00", isCorrect: false, rationale: "This is for 6 tickets." },
        { text: "$180.00", isCorrect: false, rationale: "This is for 8 tickets." },
        { text: "$22.50", isCorrect: false, rationale: "This is the cost of one ticket." }
      ],
      rationale: "First, find the cost of one ticket: $90 / 4 = $22.50. Then, multiply by the number of tickets you want to buy: $22.50 * 7 = $157.50."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "A recipe needs a sugar to flour ratio of 2:5. You have 15 cups of flour. How much sugar do you need?",
      answerOptions: [
        { text: "6 cups", isCorrect: true, rationale: "The amount of flour is 3 times the ratio amount (15/5=3). So you need 3 times the sugar (2*3=6)." },
        { text: "7.5 cups", isCorrect: false, rationale: "This is 15/2." },
        { text: "10 cups", isCorrect: false, rationale: "This is 15-5." },
        { text: "37.5 cups", isCorrect: false, rationale: "This is 15*5/2." }
      ],
      rationale: "Set up a proportion: $\\frac{2 \\text{ sugar}}{5 \\text{ flour}} = \\frac{x \\text{ sugar}}{15 \\text{ flour}}$. Cross-multiply: $5x = 30$. Divide by 5: $x = 6$ cups of sugar."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A salesperson earns a 5% commission. If they sell a car for $22,000, what is their commission?",
      answerOptions: [
        { text: "$500", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$1100", isCorrect: true, rationale: "Commission = 0.05 * $22,000 = $1100." },
        { text: "$2200", isCorrect: false, rationale: "This would be a 10% commission." },
        { text: "$5500", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "To find the commission, multiply the sale price by the commission rate: 0.05 * $22,000 = $1,100."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Ratios & Proportions / Percent Applications",
  id: "math_ratios_09",
  title: "Ratios & Proportions: Quiz 9",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "In a parking lot, there are 12 cars and 8 trucks. What is the ratio of trucks to cars in simplest form?",
      answerOptions: [
        { text: "12:8", isCorrect: false, rationale: "This is the ratio of cars to trucks." },
        { text: "3:2", isCorrect: false, rationale: "This is the simplified ratio of cars to trucks." },
        { text: "2:3", isCorrect: true, rationale: "The ratio is 8:12, which simplifies to 2:3 by dividing both by 4." },
        { text: "8:20", isCorrect: false, rationale: "This is the ratio of trucks to total vehicles." }
      ],
      rationale: "The ratio of trucks to cars is 8 to 12. To simplify, find the greatest common divisor, which is 4. Divide both parts of the ratio by 4: 8/4 = 2 and 12/4 = 3. The simplified ratio is 2:3."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A product\'s price increased by 8%. If the original price was $75, what is the new price?",
      correctAnswer: "$81",
      rationale: "The price increase is 8% of $75, which is 0.08 * 75 = $6. The new price is the original price plus the increase: $75 + $6 = $81."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If a printer can print 240 pages in 8 minutes, what is its printing rate in pages per minute?",
      answerOptions: [
        { text: "20 ppm", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "30 ppm", isCorrect: true, rationale: "Rate = 240 pages / 8 minutes = 30 pages per minute." },
        { text: "40 ppm", isCorrect: false, rationale: "This would be for 6 minutes." },
        { text: "1920 ppm", isCorrect: false, rationale: "This is the product." }
      ],
      rationale: "To find the rate in pages per minute (ppm), divide the total number of pages by the time in minutes: 240 pages / 8 minutes = 30 ppm."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A recipe requires a 3:2 ratio of flour to sugar. If you use 6 cups of sugar, how much flour do you need?",
      correctAnswer: "9 cups",
      rationale: "The amount of sugar is 3 times the ratio amount (6/2=3). So you need 3 times the flour (3*3=9)."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A customer pays a total of $52.50 for an item, which includes a 5% sales tax. What was the original price of the item?",
      answerOptions: [
        { text: "$49.88", isCorrect: false, rationale: "This is the result of subtracting 5% of $52.50." },
        { text: "$50.00", isCorrect: true, rationale: "Let P be the original price. P * 1.05 = $52.50. P = $52.50 / 1.05 = $50." },
        { text: "$51.98", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$55.13", isCorrect: false, rationale: "This is the price after adding another 5% tax." }
      ],
      rationale: "Let P be the original price. The total cost is P + 0.05P = 1.05P. So, 1.05P = $52.50. To find P, divide $52.50 by 1.05: P = $50."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A company has 1200 employees. If 35% of them work in production, how many employees work in production?",
      answerOptions: [
        { text: "35", isCorrect: false, rationale: "This is the percentage." },
        { text: "420", isCorrect: true, rationale: "35% of 1200 is 0.35 * 1200 = 420." },
        { text: "780", isCorrect: false, rationale: "This is the number of employees not in production." },
        { text: "1235", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "To find the number of employees in production, convert the percentage to a decimal and multiply by the total number of employees: 0.35 * 1200 = 420."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "The ratio of cats to dogs at a shelter is 3:7. If there are 90 animals in total, how many are dogs?",
      correctAnswer: "63",
      rationale: "The total ratio parts are 3+7=10. Each part represents 90/10 = 9 animals. There are 7 parts dogs, so 7 * 9 = 63 dogs."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Solve the proportion: $\\frac{x}{4} = \\frac{9}{12}$.",
      answerOptions: [
        { text: "1", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "3", isCorrect: true, rationale: "Simplify 9/12 to 3/4. So x/4 = 3/4, which means x=3." },
        { text: "4", isCorrect: false, rationale: "This is the denominator." },
        { text: "36", isCorrect: false, rationale: "This is 9*4." }
      ],
      rationale: "The fraction 9/12 can be simplified to 3/4. The proportion is then x/4 = 3/4, which means x must be 3."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "A painter can paint 3 rooms in 5 hours. At this rate, how many hours will it take to paint 12 rooms?",
      correctAnswer: "20 hours",
      rationale: "To paint 12 rooms, the painter needs to work 4 times as long as for 3 rooms (12/3=4). So, 5 hours * 4 = 20 hours."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A survey of 60 people showed that 45 of them prefer coffee. What percentage of people prefer coffee?",
      answerOptions: [
        { text: "45%", isCorrect: false, rationale: "This is the number of people." },
        { text: "60%", isCorrect: false, rationale: "This is the total number of people." },
        { text: "75%", isCorrect: true, rationale: "(45 / 60) * 100 = 0.75 * 100 = 75%." },
        { text: "25%", isCorrect: false, rationale: "This is the percentage that do not prefer coffee." }
      ],
      rationale: "To find the percentage, divide the number of people who prefer coffee by the total number surveyed, and multiply by 100: (45 / 60) * 100 = 0.75 * 100 = 75%."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "The ratio of two numbers is 5:8. If the smaller number is 30, what is the larger number?",
      answerOptions: [
        { text: "40", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "48", isCorrect: true, rationale: "The ratio is 5:8. The smaller part (5) is 30, so the multiplier is 30/5=6. The larger number is 8*6=48." },
        { text: "64", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "30", isCorrect: false, rationale: "This is the smaller number." }
      ],
      rationale: "Set up a proportion: $\\frac{5}{8} = \\frac{30}{x}$. Cross-multiply: $5x = 240$. Divide by 5: $x = 48$."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A car\'s gas tank holds 15 gallons. If the car gets 30 miles per gallon, how far can it travel on a full tank?",
      answerOptions: [
        { text: "2 miles", isCorrect: false, rationale: "This is 30/15." },
        { text: "300 miles", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "450 miles", isCorrect: true, rationale: "Distance = 15 gallons * 30 miles/gallon = 450 miles." },
        { text: "500 miles", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "To find the total distance, multiply the tank capacity by the fuel efficiency: 15 gallons * 30 miles/gallon = 450 miles."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Ratios & Proportions / Percent Applications",
  id: "math_ratios_10",
  title: "Ratios & Proportions: Quiz 10",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "A bag contains 5 red balls and 7 blue balls. What is the ratio of red balls to the total number of balls?",
      answerOptions: [
        { text: "5:7", isCorrect: false, rationale: "This is the ratio of red to blue balls." },
        { text: "7:5", isCorrect: false, rationale: "This is the ratio of blue to red balls." },
        { text: "5:12", isCorrect: true, rationale: "There are 5 red balls and a total of 12 balls (5+7)." },
        { text: "7:12", isCorrect: false, rationale: "This is the ratio of blue balls to the total." }
      ],
      rationale: "The total number of balls is 5 (red) + 7 (blue) = 12. The ratio of red balls to the total is 5:12."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A store has a 20% off sale. If a shirt is originally $35, what is the amount of the discount?",
      correctAnswer: "$7",
      rationale: "To find the discount amount, multiply the original price by the discount percentage: $35 * 0.20 = $7."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A car can travel 400 miles on 16 gallons of gas. What is the car\'s fuel efficiency in miles per gallon (mpg)?",
      answerOptions: [
        { text: "20 mpg", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "25 mpg", isCorrect: true, rationale: "Fuel efficiency = 400 miles / 16 gallons = 25 mpg." },
        { text: "30 mpg", isCorrect: false, rationale: "This would be for a 480-mile trip." },
        { text: "40 mpg", isCorrect: false, rationale: "This would be for a 640-mile trip." }
      ],
      rationale: "To find the fuel efficiency, divide the total miles traveled by the number of gallons used: 400 miles / 16 gallons = 25 mpg."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A recipe uses 3 eggs for every 24 cookies. How many eggs are needed for 48 cookies?",
      correctAnswer: "6 eggs",
      rationale: "48 cookies is double the original recipe, so you need double the number of eggs: 3 eggs * 2 = 6 eggs."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A population of 1200 increases by 10% in one year. What is the population after the increase?",
      answerOptions: [
        { text: "120", isCorrect: false, rationale: "This is the amount of the increase." },
        { text: "1320", isCorrect: true, rationale: "The increase is 10% of 1200, which is 120. The new population is 1200 + 120 = 1320." },
        { text: "1210", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "1080", isCorrect: false, rationale: "This is a 10% decrease." }
      ],
      rationale: "First, calculate the population increase: 10% of 1200 is 0.10 * 1200 = 120. Then, add this to the original population: 1200 + 120 = 1320."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If 5 pounds of potatoes cost $3.00, what is the cost of 8 pounds of potatoes?",
      answerOptions: [
        { text: "$0.60", isCorrect: false, rationale: "This is the cost per pound." },
        { text: "$4.80", isCorrect: true, rationale: "The cost per pound is $3.00/5 = $0.60. So, 8 pounds cost 8 * $0.60 = $4.80." },
        { text: "$5.00", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$24.00", isCorrect: false, rationale: "This is 8*3." }
      ],
      rationale: "First, find the price per pound: $3.00 / 5 pounds = $0.60 per pound. Then, multiply by the desired weight: $0.60 * 8 = $4.80."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A survey of 400 people found that 60% prefer brand X. How many people prefer a different brand?",
      correctAnswer: "160",
      rationale: "If 60% prefer brand X, then 40% prefer a different brand. 40% of 400 is 0.40 * 400 = 160."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Solve the proportion: $\\frac{4}{5} = \\frac{20}{x}$.",
      answerOptions: [
        { text: "16", isCorrect: false, rationale: "This is 4*4." },
        { text: "20", isCorrect: false, rationale: "This is the numerator." },
        { text: "25", isCorrect: true, rationale: "The numerator is multiplied by 5 (4*5=20), so multiply the denominator by 5: 5*5=25." },
        { text: "100", isCorrect: false, rationale: "This is 20*5." }
      ],
      rationale: "To get from 4 to 20 in the numerator, you multiply by 5. Therefore, you must also multiply the denominator by 5: 5 * 5 = 25."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "The ratio of teachers to students in a school is 1:25. If there are 20 teachers, how many students are there?",
      correctAnswer: "500 students",
      rationale: "Set up the proportion 1/25 = 20/x. Cross-multiply to find x = 20 * 25 = 500."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "In a class, 18 out of 30 students passed an exam. What percentage of students passed?",
      answerOptions: [
        { text: "18%", isCorrect: false, rationale: "This is the number of students who passed." },
        { text: "30%", isCorrect: false, rationale: "This is the total number of students." },
        { text: "60%", isCorrect: true, rationale: "(18 / 30) * 100 = 0.6 * 100 = 60%." },
        { text: "82%", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "To find the percentage, divide the number of students who passed by the total number of students and multiply by 100: (18 / 30) * 100 = 0.6 * 100 = 60%."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "The ratio of two supplementary angles is 2:3. What is the measure of the larger angle?",
      answerOptions: [
        { text: "36°", isCorrect: false, rationale: "This is the result for one part of the ratio." },
        { text: "72°", isCorrect: false, rationale: "This is the measure of the smaller angle." },
        { text: "108°", isCorrect: true, rationale: "The total ratio parts is 5. 180/5 = 36. The larger angle is 3 * 36 = 108." },
        { text: "180°", isCorrect: false, rationale: "This is the total measure." }
      ],
      rationale: "Supplementary angles add up to 180°. The ratio 2:3 has a total of 5 parts. Divide 180° by 5 to find the value of one part: 180 / 5 = 36°. The larger angle is 3 parts, so 3 * 36° = 108°."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If a person works 8 hours and earns $120, what is their hourly wage?",
      answerOptions: [
        { text: "$12/hour", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "$15/hour", isCorrect: true, rationale: "Wage = $120 / 8 hours = $15/hour." },
        { text: "$20/hour", isCorrect: false, rationale: "This would be for 6 hours." },
        { text: "$960/hour", isCorrect: false, rationale: "This is the product." }
      ],
      rationale: "To find the hourly wage, divide the total earnings by the number of hours worked: $120 / 8 hours = $15 per hour."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Ratios & Proportions / Percent Applications",
  id: "math_ratios_11",
  title: "Ratios & Proportions: Quiz 11",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "A soccer team won 15 games and lost 5. What is the ratio of wins to total games played?",
      answerOptions: [
        { text: "15:5", isCorrect: false, rationale: "This is the ratio of wins to losses." },
        { text: "3:1", isCorrect: false, rationale: "This is the simplified ratio of wins to losses." },
        { text: "3:4", isCorrect: true, rationale: "Total games = 20. Ratio of wins to total is 15:20, which simplifies to 3:4." },
        { text: "4:3", isCorrect: false, rationale: "This is the ratio of total games to wins." }
      ],
      rationale: "The total number of games played is 15 (wins) + 5 (losses) = 20. The ratio of wins to total games is 15:20. To simplify, divide both numbers by 5. 15/5 = 3 and 20/5 = 4. The simplified ratio is 3:4."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "You get 18 questions right on a 20-question test. What is your score as a percentage?",
      correctAnswer: "90%",
      rationale: "To find the percentage, divide the number of correct questions by the total number of questions and multiply by 100: (18 / 20) * 100 = 0.90 * 100 = 90%."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A company produces 3,000 items, and 90 are defective. What percentage of items are defective?",
      answerOptions: [
        { text: "3%", isCorrect: true, rationale: "(90 / 3000) * 100 = 0.03 * 100 = 3%." },
        { text: "9%", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "30%", isCorrect: false, rationale: "This would be 900 defective items." },
        { text: "90%", isCorrect: false, rationale: "This is the number of defective items." }
      ],
      rationale: "To find the percentage, divide the number of defective items by the total number of items and multiply by 100: (90 / 3000) * 100 = 0.03 * 100 = 3%."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A map has a scale of 1 inch to 50 miles. How many inches on the map represent 200 miles?",
      correctAnswer: "4 inches",
      rationale: "To find the map distance, divide the actual distance by the scale factor: 200 miles / 50 miles/inch = 4 inches."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "A phone bill is $50 per month. With taxes and fees, the total is $54. What is the percentage of the bill that is taxes and fees?",
      answerOptions: [
        { text: "4%", isCorrect: false, rationale: "This is the amount of taxes and fees in dollars." },
        { text: "8%", isCorrect: true, rationale: "The fees are $4. ($4 / $50) * 100 = 8%." },
        { text: "92.6%", isCorrect: false, rationale: "This is the percentage of the bill that is the base cost." },
        { text: "108%", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "The amount of taxes and fees is $54 - $50 = $4. To find the percentage, divide this amount by the original bill and multiply by 100: ($4 / $50) * 100 = 0.08 * 100 = 8%."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "If 1 kilogram is approximately 2.2 pounds, how many pounds is a 5-kilogram bag of flour?",
      answerOptions: [
        { text: "2.2 lbs", isCorrect: false, rationale: "This is the weight of 1 kg." },
        { text: "10 lbs", isCorrect: false, rationale: "This is 5*2." },
        { text: "11 lbs", isCorrect: true, rationale: "5 kg * 2.2 lbs/kg = 11 lbs." },
        { text: "2.7 lbs", isCorrect: false, rationale: "This is 5/2.2." }
      ],
      rationale: "To convert kilograms to pounds, multiply the number of kilograms by the conversion factor: 5 kg * 2.2 lbs/kg = 11 pounds."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "The ratio of fiction to non-fiction books in a library is 4:3. If there are 1200 fiction books, how many non-fiction books are there?",
      correctAnswer: "900",
      rationale: "Set up the proportion 4/3 = 1200/x. 4x = 3600. x = 900."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "A survey of 50 people showed 30 preferred tea and 20 preferred coffee. What is the ratio of coffee drinkers to tea drinkers?",
      answerOptions: [
        { text: "3:2", isCorrect: false, rationale: "This is tea to coffee." },
        { text: "2:3", isCorrect: true, rationale: "The ratio is 20:30, which simplifies to 2:3." },
        { text: "2:5", isCorrect: false, rationale: "This is coffee to total." },
        { text: "3:5", isCorrect: false, rationale: "This is tea to total." }
      ],
      rationale: "The ratio of coffee drinkers to tea drinkers is 20 to 30. To simplify, divide both numbers by their greatest common divisor, 10. The simplified ratio is 2:3."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "Solve the proportion: $\\frac{7}{3} = \\frac{x}{9}$.",
      correctAnswer: "21",
      rationale: "To get from 3 to 9, you multiply by 3. So, multiply the numerator by 3: 7 * 3 = 21."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A car is traveling at an average speed of 55 mph. How long will it take to travel 330 miles?",
      answerOptions: [
        { text: "5 hours", isCorrect: false, rationale: "This would be a 275-mile trip." },
        { text: "6 hours", isCorrect: true, rationale: "Time = Distance / Speed = 330 miles / 55 mph = 6 hours." },
        { text: "7 hours", isCorrect: false, rationale: "This would be a 385-mile trip." },
        { text: "385 hours", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "To find the time, divide the distance by the speed: Time = 330 miles / 55 mph = 6 hours."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "The ratio of the angles in a triangle is 1:2:3. What is the measure of the largest angle?",
      answerOptions: [
        { text: "30°", isCorrect: false, rationale: "This is the smallest angle." },
        { text: "60°", isCorrect: false, rationale: "This is the middle angle." },
        { text: "90°", isCorrect: true, rationale: "The total ratio parts is 6. 180/6 = 30. The largest angle is 3 * 30 = 90." },
        { text: "180°", isCorrect: false, rationale: "This is the sum of the angles." }
      ],
      rationale: "The angles of a triangle sum to 180°. The ratio 1:2:3 has a total of 1+2+3=6 parts. The value of one part is 180° / 6 = 30°. The largest angle is 3 parts, so 3 * 30° = 90°."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A recipe for 4 servings requires 1.5 cups of milk. How much milk is needed for 6 servings?",
      answerOptions: [
        { text: "1.5 cups", isCorrect: false, rationale: "This is for 4 servings." },
        { text: "2 cups", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "2.25 cups", isCorrect: true, rationale: "6 servings is 1.5 times the original recipe. 1.5 * 1.5 = 2.25." },
        { text: "3 cups", isCorrect: false, rationale: "This is for 8 servings." }
      ],
      rationale: "First, find the amount of milk per serving: 1.5 cups / 4 servings = 0.375 cups/serving. Then, multiply by the desired number of servings: 0.375 * 6 = 2.25 cups."
    }
  ]
});
quizzes.push({
  subject: "Math",
  topic: "Ratios & Proportions / Percent Applications",
  id: "math_ratios_12",
  title: "Ratios & Proportions: Quiz 12",
  questions: [
    {
      questionNumber: 1,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "In a class, there are 20 boys and 25 girls. What is the ratio of boys to girls in simplest form?",
      answerOptions: [
        { text: "20:25", isCorrect: false, rationale: "This is not simplified." },
        { text: "4:5", isCorrect: true, rationale: "Divide both parts by 5." },
        { text: "5:4", isCorrect: false, rationale: "This is girls to boys." },
        { text: "4:9", isCorrect: false, rationale: "This is boys to total students." }
      ],
      rationale: "The ratio of boys to girls is 20:25. The greatest common divisor is 5. 20/5 = 4 and 25/5 = 5. The simplified ratio is 4:5."
    },
    {
      questionNumber: 2,
      type: "fillIn",
      calculator: true,
      difficulty: "medium",
      question: "A book costs $18. The sales tax is 5%. What is the total cost?",
      correctAnswer: "$18.90",
      rationale: "The tax is 0.05 * $18 = $0.90. The total cost is $18 + $0.90 = $18.90."
    },
    {
      questionNumber: 3,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A car travels 300 miles using 12 gallons of gas. How many miles per gallon does the car get?",
      answerOptions: [
        { text: "20 mpg", isCorrect: false, rationale: "This is an incorrect calculation." },
        { text: "25 mpg", isCorrect: true, rationale: "300 miles / 12 gallons = 25 mpg." },
        { text: "30 mpg", isCorrect: false, rationale: "This would be for 10 gallons." },
        { text: "36 mpg", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "To find miles per gallon, divide the distance by the gallons used: 300 miles / 12 gallons = 25 mpg."
    },
    {
      questionNumber: 4,
      type: "fillIn",
      calculator: false,
      difficulty: "easy",
      question: "A recipe for lemonade uses 1 cup of lemon juice for every 4 cups of water. If you use 3 cups of lemon juice, how much water do you need?",
      correctAnswer: "12 cups",
      rationale: "The ratio is 1:4. If you use 3 times the lemon juice, you need 3 times the water: 4 * 3 = 12."
    },
    {
      questionNumber: 5,
      type: "multipleChoice",
      calculator: true,
      difficulty: "hard",
      question: "An item is priced at $150. It is on sale for 20% off. What is the final price after the discount?",
      answerOptions: [
        { text: "$120", isCorrect: true, rationale: "The discount is 0.20 * 150 = $30. 150 - 30 = $120." },
        { text: "$30", isCorrect: false, rationale: "This is the discount amount." },
        { text: "$130", isCorrect: false, rationale: "This is a $20 discount." },
        { text: "$180", isCorrect: false, rationale: "This is a 20% markup." }
      ],
      rationale: "Calculate the discount: 20% of $150 is 0.20 * 150 = $30. Subtract the discount from the original price: $150 - $30 = $120."
    },
    {
      questionNumber: 6,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "Out of 50 people, 15 have blue eyes. What percentage of people have blue eyes?",
      answerOptions: [
        { text: "15%", isCorrect: false, rationale: "This is the number of people." },
        { text: "30%", isCorrect: true, rationale: "(15 / 50) * 100 = 0.3 * 100 = 30%." },
        { text: "35%", isCorrect: false, rationale: "This is the number of people who don\'t have blue eyes." },
        { text: "70%", isCorrect: false, rationale: "This is the percentage of people who don\'t have blue eyes." }
      ],
      rationale: "To find the percentage, divide the number of people with blue eyes by the total number of people and multiply by 100: (15 / 50) * 100 = 0.3 * 100 = 30%."
    },
    {
      questionNumber: 7,
      type: "fillIn",
      calculator: true,
      difficulty: "hard",
      question: "A population decreased from 800 to 760. What was the percent decrease?",
      correctAnswer: "5%",
      rationale: "The decrease is 40. (40 / 800) * 100 = 0.05 * 100 = 5%."
    },
    {
      questionNumber: 8,
      type: "multipleChoice",
      calculator: false,
      difficulty: "easy",
      question: "Solve the proportion: $\\frac{1}{6} = \\frac{5}{x}$.",
      answerOptions: [
        { text: "5", isCorrect: false, rationale: "This is the numerator." },
        { text: "6", isCorrect: false, rationale: "This is the denominator." },
        { text: "30", isCorrect: true, rationale: "Cross-multiply: 1*x = 6*5 -> x=30." },
        { text: "1.2", isCorrect: false, rationale: "This is 6/5." }
      ],
      rationale: "To solve for x, you can cross-multiply: 1 * x = 6 * 5, which means x = 30."
    },
    {
      questionNumber: 9,
      type: "fillIn",
      calculator: false,
      difficulty: "medium",
      question: "A map scale is 1 cm : 15 km. The distance between two cities is 12 cm. What is the actual distance?",
      correctAnswer: "180 km",
      rationale: "12 cm * 15 km/cm = 180 km."
    },
    {
      questionNumber: 10,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A store buys a hat for $10 and sells it for $16. What is the percent markup?",
      answerOptions: [
        { text: "6%", isCorrect: false, rationale: "This is the markup amount in dollars." },
        { text: "37.5%", isCorrect: false, rationale: "This is 6/16." },
        { text: "60%", isCorrect: true, rationale: "The markup is $6. (6/10)*100 = 60%." },
        { text: "160%", isCorrect: false, rationale: "This is the selling price as a percentage of the cost." }
      ],
      rationale: "The markup amount is $16 - $10 = $6. The percent markup is (markup / original cost) * 100 = ($6 / $10) * 100 = 0.6 * 100 = 60%."
    },
    {
      questionNumber: 11,
      type: "multipleChoice",
      calculator: false,
      difficulty: "hard",
      question: "The ratio of red to blue marbles is 3:5. If there are 25 blue marbles, how many red marbles are there?",
      answerOptions: [
        { text: "15", isCorrect: true, rationale: "The ratio of blue marbles is 5 times the ratio number (25/5=5), so the number of red marbles is 3*5=15." },
        { text: "25", isCorrect: false, rationale: "This is the number of blue marbles." },
        { text: "40", isCorrect: false, rationale: "This would be the total number of marbles." },
        { text: "9", isCorrect: false, rationale: "This is an incorrect calculation." }
      ],
      rationale: "Set up the proportion: $\\frac{3 \\text{ red}}{5 \\text{ blue}} = \\frac{x \\text{ red}}{25 \\text{ blue}}$. Cross-multiply: $5x = 3 \\times 25 = 75$. Divide by 5: $x = 15$."
    },
    {
      questionNumber: 12,
      type: "multipleChoice",
      calculator: true,
      difficulty: "medium",
      question: "A recipe for 4 people requires 500g of pasta. How much pasta is needed for 10 people?",
      answerOptions: [
        { text: "1000g", isCorrect: false, rationale: "This is for 8 people." },
        { text: "1250g", isCorrect: true, rationale: "10 people is 2.5 times the recipe. 2.5 * 500 = 1250g." },
        { text: "2000g", isCorrect: false, rationale: "This is for 16 people." },
        { text: "2500g", isCorrect: false, rationale: "This is for 20 people." }
      ],
      rationale: "First, find the amount of pasta per person: 500g / 4 people = 125g/person. Then, multiply by the number of people: 125g/person * 10 people = 1250g."
    }
  ]
});
