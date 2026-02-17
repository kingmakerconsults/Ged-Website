/**
 * Statistics & Probability
 * Extracted from frontend app.jsx
 * Fixed to backend format: array of questions
 */

module.exports = [
  {
    questionNumber: 1,
    challenge_tags: ['math-6'],
    calculator: false,
    type: 'chart',
    passage:
      "<div class='passage-text'><b>Test Scores: 85, 92, 78, 88, 92</b></div>",
    question: 'What is the mode of the test scores listed?',
    answerOptions: [
      {
        text: '87',
        isCorrect: false,
        rationale: '87 is the mean, not the mode.',
      },
      {
        text: '88',
        isCorrect: false,
        rationale: '88 is the median, not the mode.',
      },
      {
        text: '92',
        isCorrect: true,
        rationale:
          'The mode is the number that appears most frequently. 92 appears twice.',
      },
      {
        text: '14',
        isCorrect: false,
        rationale: '14 is the range, not the mode.',
      },
    ],
  },
  {
    questionNumber: 2,
    challenge_tags: ['math-6'],
    calculator: false,
    type: 'chart',
    passage:
      "<div class='passage-text'><b>Test Scores: 85, 92, 78, 88, 92</b></div>",
    question: 'What is the mean (average) of the test scores listed?',
    answerOptions: [
      {
        text: '87',
        isCorrect: true,
        rationale:
          'The sum of the scores (\\(85+92+78+88+92\\)) is 435. The mean is \\(435 / 5 = 87\\).',
      },
      {
        text: '88',
        isCorrect: false,
        rationale: '88 is the median.',
      },
      {
        text: '92',
        isCorrect: false,
        rationale: '92 is the mode.',
      },
      {
        text: '78',
        isCorrect: false,
        rationale: '78 is the lowest score.',
      },
    ],
  },
  {
    questionNumber: 3,
    challenge_tags: ['math-6'],
    calculator: false,
    type: 'chart',
    passage:
      "<div class='passage-text'><b>Test Scores: 85, 92, 78, 88, 92</b></div>",
    question: 'What is the median of the test scores listed?',
    answerOptions: [
      {
        text: '85',
        isCorrect: false,
        rationale: 'This is one of the scores, but not the median.',
      },
      {
        text: '88',
        isCorrect: true,
        rationale:
          'First, order the scores: 78, 85, 88, 92, 92. The median is the middle value, which is 88.',
      },
      {
        text: '92',
        isCorrect: false,
        rationale: '92 is the mode.',
      },
      {
        text: '87',
        isCorrect: false,
        rationale: '87 is the mean.',
      },
    ],
  },
  {
    questionNumber: 4,
    calculator: false,
    question:
      'A bag contains 4 red, 5 blue, and 6 green marbles. What is the probability of randomly drawing a blue marble?',
    answerOptions: [
      {
        text: '\\(\\frac{1}{3}\\)',
        isCorrect: true,
        rationale:
          'There are 5 blue marbles and a total of \\(4+5+6=15\\) marbles. The probability is \\(\\frac{5}{15}\\), which simplifies to \\(\\frac{1}{3}\\).',
      },
      {
        text: '\\(\\frac{1}{5}\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(\\frac{5}{10}\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(\\frac{1}{15}\\)',
        isCorrect: false,
        rationale:
          'This would be the probability of drawing one specific marble.',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 5,
    calculator: false,
    type: 'chart',
    passage:
      "<div class='passage-text'><b>Daily High Temperatures (°F): 65, 68, 72, 72, 75, 78, 81</b></div>",
    question: 'What is the range of the daily high temperatures?',
    answerOptions: [
      {
        text: '72',
        isCorrect: false,
        rationale: '72 is the mode and median.',
      },
      {
        text: '16',
        isCorrect: true,
        rationale:
          'The range is the difference between the highest and lowest value: \\(81 - 65 = 16\\).',
      },
      {
        text: '73',
        isCorrect: false,
        rationale: '73 is the mean.',
      },
      {
        text: '81',
        isCorrect: false,
        rationale: '81 is the highest temperature.',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 6,
    calculator: true,
    question:
      'If you roll a standard six-sided die, what is the probability of rolling an even number?',
    answerOptions: [
      {
        text: '\\(\\frac{1}{6}\\)',
        isCorrect: false,
        rationale: 'This is the probability of rolling one specific number.',
      },
      {
        text: '\\(\\frac{1}{3}\\)',
        isCorrect: false,
        rationale:
          'There are 3 even numbers (2, 4, 6) out of 6 total possibilities.',
      },
      {
        text: '\\(\\frac{1}{2}\\)',
        isCorrect: true,
        rationale:
          'There are 3 even numbers (2, 4, 6) out of 6 total possibilities. The probability is \\(\\frac{3}{6}\\), which simplifies to \\(\\frac{1}{2}\\).',
      },
      {
        text: '\\(\\frac{2}{3}\\)',
        isCorrect: false,
        rationale:
          'This is the probability of rolling a number greater than 2.',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 7,
    calculator: true,
    type: 'chart',
    passage:
      "<div class='passage-text'><b>Ages of employees: 22, 25, 28, 34, 46</b></div>",
    question: 'What is the median age of the employees?',
    answerOptions: [
      {
        text: '22',
        isCorrect: false,
        rationale: 'This is the minimum age.',
      },
      {
        text: '28',
        isCorrect: true,
        rationale:
          'The ages are already in order. The median is the middle value, which is 28.',
      },
      {
        text: '31',
        isCorrect: false,
        rationale: '31 is the mean.',
      },
      {
        text: '46',
        isCorrect: false,
        rationale: 'This is the maximum age.',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 8,
    calculator: true,
    question:
      'A spinner is divided into 8 equal sections, numbered 1 through 8. What is the probability of spinning a number greater than 5?',
    answerOptions: [
      {
        text: '\\(\\frac{1}{8}\\)',
        isCorrect: false,
        rationale: 'This is the probability of spinning one specific number.',
      },
      {
        text: '\\(\\frac{3}{8}\\)',
        isCorrect: true,
        rationale:
          "The numbers greater than 5 are 6, 7, and 8. That's 3 favorable outcomes out of 8 total possibilities.",
      },
      {
        text: '\\(\\frac{5}{8}\\)',
        isCorrect: false,
        rationale: 'This is the probability of spinning 5 or less.',
      },
      {
        text: '\\(\\frac{1}{2}\\)',
        isCorrect: false,
        rationale: '\\(\\frac{1}{2}\\) would be 4 sections.',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 9,
    calculator: true,
    type: 'chart',
    passage:
      "<div class='passage-text'><b>Number of books read per month: 2, 3, 3, 5, 7, 10</b></div>",
    question: 'What is the mean number of books read?',
    answerOptions: [
      {
        text: '3',
        isCorrect: false,
        rationale: '3 is the mode.',
      },
      {
        text: '4',
        isCorrect: false,
        rationale: '4 is the median.',
      },
      {
        text: '5',
        isCorrect: true,
        rationale:
          'The sum is \\(2+3+3+5+7+10 = 30\\). The mean is \\(30 / 6 = 5\\).',
      },
      {
        text: '8',
        isCorrect: false,
        rationale: '8 is the range.',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 10,
    calculator: true,
    question:
      'From a standard deck of 52 cards, what is the probability of drawing a king?',
    answerOptions: [
      {
        text: '\\(\\frac{1}{52}\\)',
        isCorrect: false,
        rationale:
          'This is the probability of drawing a specific king, not any king.',
      },
      {
        text: '\\(\\frac{1}{13}\\)',
        isCorrect: true,
        rationale:
          'There are 4 kings in a 52-card deck. The probability is \\(\\frac{4}{52}\\), which simplifies to \\(\\frac{1}{13}\\).',
      },
      {
        text: '\\(\\frac{1}{4}\\)',
        isCorrect: false,
        rationale: 'This is the probability of drawing a specific suit.',
      },
      {
        text: '\\(\\frac{4}{13}\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 11,
    calculator: true,
    type: 'chart',
    passage:
      "<div class='passage-text'><b>Points scored in 5 games: 10, 15, 12, 10, 18</b></div>",
    question: 'What is the mode of the points scored?',
    answerOptions: [
      {
        text: '10',
        isCorrect: true,
        rationale:
          'The mode is the value that appears most frequently. 10 appears twice.',
      },
      {
        text: '12',
        isCorrect: false,
        rationale: '12 is the median.',
      },
      {
        text: '13',
        isCorrect: false,
        rationale: '13 is the mean.',
      },
      {
        text: '8',
        isCorrect: false,
        rationale: '8 is the range.',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 12,
    calculator: true,
    question:
      'If you flip a coin twice, what is the probability of getting heads both times?',
    answerOptions: [
      {
        text: '\\(\\frac{1}{2}\\)',
        isCorrect: false,
        rationale: 'This is the probability of getting heads on a single flip.',
      },
      {
        text: '\\(\\frac{1}{3}\\)',
        isCorrect: false,
        rationale: 'There are 4 possible outcomes (HH, HT, TH, TT).',
      },
      {
        text: '\\(\\frac{1}{4}\\)',
        isCorrect: true,
        rationale:
          'The probability of the first heads is \\(\\frac{1}{2}\\). The probability of the second is \\(\\frac{1}{2}\\). The combined probability is \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\).',
      },
      {
        text: '1',
        isCorrect: false,
        rationale: 'This would mean it is a certain outcome.',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 13,
    calculator: true,
    type: 'chart',
    passage:
      "<div class='passage-text'><b>A student's grades are 80, 85, and 90. What grade do they need on the fourth test to have an average of 85?</b></div>",
    question: 'What grade is needed on the fourth test for an average of 85?',
    answerOptions: [
      {
        text: '80',
        isCorrect: false,
        rationale: 'This would result in an average of 83.75.',
      },
      {
        text: '85',
        isCorrect: true,
        rationale:
          'To have an average of 85 over 4 tests, the total score must be \\(85 \\times 4 = 340\\). The current sum is \\(80 + 85 + 90 = 255\\). The needed score is \\(340 - 255 = 85\\).',
      },
      {
        text: '90',
        isCorrect: false,
        rationale: 'This would result in an average of 86.25.',
      },
      {
        text: '95',
        isCorrect: false,
        rationale: 'This would result in an average of 87.5.',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 14,
    calculator: true,
    question:
      'A company has 100 employees. 60 are full-time and 40 are part-time. If an employee is selected at random, what is the probability they are part-time?',
    answerOptions: [
      {
        text: '\\(\\frac{3}{5}\\)',
        isCorrect: false,
        rationale: 'This is the probability of selecting a full-time employee.',
      },
      {
        text: '\\(\\frac{2}{5}\\)',
        isCorrect: true,
        rationale:
          'The probability is \\(\\frac{40}{100}\\), which simplifies to \\(\\frac{2}{5}\\).',
      },
      {
        text: '\\(\\frac{1}{2}\\)',
        isCorrect: false,
        rationale: 'This would be true if there were 50 of each.',
      },
      {
        text: '\\(\\frac{1}{40}\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 15,
    calculator: true,
    type: 'chart',
    passage:
      "<div class='passage-text'><b>Number of daily customers: 102, 115, 98, 120, 115, 130</b></div>",
    question: 'What is the median number of customers?',
    answerOptions: [
      {
        text: '115',
        isCorrect: true,
        rationale:
          'Order the numbers: 98, 102, 115, 115, 120, 130. The median is the average of the two middle numbers (115 and 115), which is 115.',
      },
      {
        text: '113.3',
        isCorrect: false,
        rationale: 'This is the mean.',
      },
      {
        text: '98',
        isCorrect: false,
        rationale: 'This is the minimum.',
      },
      {
        text: '32',
        isCorrect: false,
        rationale: 'This is the range.',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 16,
    calculator: true,
    type: 'chart',
    passage:
      "<div class='passage-text'><b>Final Exam Scores: 75, 80, 80, 85, 90, 95, 100</b></div>",
    question: 'What is the mode of the final exam scores?',
    answerOptions: [
      {
        text: '80',
        isCorrect: true,
        rationale:
          'The mode is the number that appears most frequently in a data set. The score 80 appears twice.',
      },
      {
        text: '85',
        isCorrect: false,
        rationale: '85 is the median of the scores.',
      },
      {
        text: '86.4',
        isCorrect: false,
        rationale: 'This is the approximate mean of the scores.',
      },
      {
        text: '25',
        isCorrect: false,
        rationale: '25 is the range of the scores (100 - 75).',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 17,
    calculator: true,
    question:
      'A bag contains 3 red marbles, 7 blue marbles, and 5 green marbles. What is the probability of NOT drawing a blue marble?',
    answerOptions: [
      {
        text: '\\(\\frac{7}{15}\\)',
        isCorrect: false,
        rationale: 'This is the probability of drawing a blue marble.',
      },
      {
        text: '\\(\\frac{8}{15}\\)',
        isCorrect: true,
        rationale:
          'There are 15 total marbles (3+7+5). The number of non-blue marbles is 3 (red) + 5 (green) = 8. So the probability is \\(\\frac{8}{15}\\).',
      },
      {
        text: '\\(\\frac{1}{3}\\)',
        isCorrect: false,
        rationale:
          'This is the probability of drawing a green marble (\\(\\frac{5}{15}\\)).',
      },
      {
        text: '\\(\\frac{1}{5}\\)',
        isCorrect: false,
        rationale:
          'This is the probability of drawing a red marble (\\(\\frac{3}{15}\\)).',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 15,
    calculator: true,
    type: 'graph',
    passage:
      "<div class='passage-text'>A line passes through the points (0, 2) and (3, 8).</div>",
    question: 'What is the slope of the line?',
    answerOptions: [
      {
        text: '2',
        isCorrect: true,
        rationale:
          'The slope is the change in y divided by the change in x: \\((8 - 2) / (3 - 0) = 6 / 3 = 2\\).',
      },
      {
        text: '3',
        isCorrect: false,
        rationale: 'This is the change in x.',
      },
      {
        text: '6',
        isCorrect: false,
        rationale: 'This is the change in y.',
      },
      {
        text: '\\(\\frac{1}{2}\\)',
        isCorrect: false,
        rationale: 'This is the reciprocal of the correct slope.',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 16,
    calculator: true,
    question: 'What is the y-intercept of the equation \\(y = 3x - 4\\)?',
    answerOptions: [
      {
        text: '3',
        isCorrect: false,
        rationale: '3 is the slope of the line.',
      },
      {
        text: '-4',
        isCorrect: true,
        rationale:
          "In the slope-intercept form \\(y = mx + b\\), 'b' is the y-intercept. In this case, it's -4.",
      },
      {
        text: '4',
        isCorrect: false,
        rationale: 'The y-intercept is negative.',
      },
      {
        text: '\\(\\frac{4}{3}\\)',
        isCorrect: false,
        rationale: 'This is the x-intercept.',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 17,
    calculator: false,
    question:
      'If \\(f(x) = 2x^2 + 5x - 3\\), what is the value of \\(f(-2)\\)?',
    answerOptions: [
      {
        text: '-5',
        isCorrect: true,
        rationale:
          'Substitute -2 for x: \\(f(-2) = 2(-2)^2 + 5(-2) - 3 = 2(4) - 10 - 3 = 8 - 10 - 3 = -5\\).',
      },
      {
        text: '1',
        isCorrect: false,
        rationale: 'Incorrect calculation. \\(2(4) - 10 - 3 = -5\\).',
      },
      {
        text: '21',
        isCorrect: false,
        rationale:
          'Incorrectly handled the negative signs. \\(5(-2) is -10.\\)',
      },
      {
        text: '-15',
        isCorrect: false,
        rationale:
          'Incorrect calculation of the exponent. \\((-2)^2 is 4, not -4.\\)',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 15,
    challenge_tags: ['math-5'],
    calculator: true,
    question:
      'A rectangle is 8 inches long and 5 inches wide. What is its area?',
    answerOptions: [
      {
        text: '40 sq in',
        isCorrect: true,
        rationale:
          'The area of a rectangle is length times width. \\(8 \\(\times\\) 5 = 40.\\)',
      },
      {
        text: '26 in',
        isCorrect: false,
        rationale: 'This is the perimeter of the rectangle.',
      },
      {
        text: '13 in',
        isCorrect: false,
        rationale: 'This is the sum of the length and width.',
      },
      {
        text: '64 sq in',
        isCorrect: false,
        rationale: 'This would be the area if it were a square with side 8.',
      },
    ],
  },
  {
    questionNumber: 16,
    calculator: true,
    question:
      'What is the circumference of a circle with a radius of 5 cm? (Use \\(\\pi \\approx 3.14\\))',
    answerOptions: [
      {
        text: '15.7 cm',
        isCorrect: false,
        rationale: 'This is the semi-circumference (\\(\\pi r\\)).',
      },
      {
        text: '31.4 cm',
        isCorrect: true,
        rationale:
          'The formula for circumference is \\(C = 2\\pi r\\). So, \\(C = 2 \\(\times\\) 3.14 \\(\times 5 = 31.4 cm.\\)\\)',
      },
      {
        text: '78.5 sq cm',
        isCorrect: false,
        rationale: 'This is the area of the circle (\\(\\pi r^{2}\\)).',
      },
      {
        text: '10 cm',
        isCorrect: false,
        rationale: 'This is the diameter of the circle.',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 17,
    calculator: false,
    question:
      'Two angles in a triangle measure 40 degrees and 60 degrees. What is the measure of the third angle?',
    answerOptions: [
      {
        text: '80 degrees',
        isCorrect: true,
        rationale:
          'The sum of angles in a triangle is always 180 degrees. \\(180 - (40 + 60) = 180 - 100 = 80 degrees.\\)',
      },
      {
        text: '100 degrees',
        isCorrect: false,
        rationale: 'This is the sum of the two given angles.',
      },
      {
        text: '90 degrees',
        isCorrect: false,
        rationale:
          'This would only be true for a right-angled triangle where the other two angles sum to 90.',
      },
      {
        text: 'Cannot be determined',
        isCorrect: false,
        rationale:
          'The third angle can be determined with the given information.',
      },
    ],
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 18,
    calculator: true,
    question: 'What is the volume of a cube with a side length of 4 inches?',
    answerOptions: [
      {
        text: '12 cubic in',
        isCorrect: false,
        rationale: 'This is the sum of the side lengths (4+4+4).',
      },
      {
        text: '16 sq in',
        isCorrect: false,
        rationale: 'This is the area of one face of the cube.',
      },
      {
        text: '64 cubic in',
        isCorrect: true,
        rationale:
          'The volume of a cube is the side length cubed. \\(V = s^{3} = 4^{3} = 64 cubic inches.\\)',
      },
      {
        text: '96 sq in',
        isCorrect: false,
        rationale:
          'This is the surface area of the cube (\\(6 \\(\times\\)\\) \\)s^{2}).',
      },
    ],
    challenge_tags: ['math-6'],
  },
];
