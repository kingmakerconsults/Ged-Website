/**
 * Whole Numbers, Fractions & Decimals
 * Extracted from frontend app.jsx
 * Fixed to backend format: array of questions
 */

module.exports = [
  {
    questionNumber: 1,
    challenge_tags: ['math-1'],
    calculator: false,
    question:
      'A construction project requires \(\\(\frac{5}{8}\) inch bolts. If a worker has a bolt that is \(\\(\frac{3}{4}\) inch, is it too large or too small, and by how much?\)\)',
    answerOptions: [
      {
        text: 'The bolt is \(\\(\frac{1}{8}\) inch too large.\)',
        isCorrect: true,
        rationale:
          'To compare \(\\(\frac{3}{4}\) and \\(\frac{5}{8}\)\), find a common denominator, which is 8. \(\\(\frac{3}{4}\) is equal to \\(\frac{6}{8}\)\), so it exceeds \(\\(\frac{5}{8}\) by \\(\frac{1}{8}\)\).',
      },
      {
        text: 'The bolt is \(\\(\frac{1}{8}\) inch too small.\)',
        isCorrect: false,
        rationale:
          '\(\\(\frac{3}{4}\) is equal to \\(\frac{6}{8}\)\), which is larger than \(\\(\frac{5}{8}\)\), not smaller.',
      },
      {
        text: 'The bolt is \(\\(\frac{1}{4}\) inch too large.\)',
        isCorrect: false,
        rationale:
          'The difference between \(\\(\frac{3}{4}\) and \(\\(\frac{5}{8}\) is \(\\(\frac{1}{8}\) inch, not \(\\(\frac{1}{4}\) inch.\)\)\)\)',
      },
      {
        text: 'The bolt matches the required size exactly.',
        isCorrect: false,
        rationale: 'The sizes differ by \(\\(\frac{1}{8}\) inch.\)',
      },
    ],
  },
  {
    questionNumber: 2,
    challenge_tags: ['math-1'],
    calculator: false,
    question:
      'A recipe calls for \(2 \\(\frac{1}{2}\) cups of flour. If you want to make half the recipe, how much flour do you need?\)',
    answerOptions: [
      {
        text: '\(\\(\frac{5}{4}\) cups\)',
        isCorrect: true,
        rationale:
          'Half of \(2 \\(\frac{1}{2}\) is \\left(\\(\frac{5}{2}\)\)\\right) \\(\div 2 = \\(\frac{5}{4} cups.\)\)',
      },
      {
        text: '\(\\(\frac{3}{2}\) cups\)',
        isCorrect: false,
        rationale: 'This would be more than half of the original amount.',
      },
      {
        text: '\(1 cup\)',
        isCorrect: false,
        rationale: 'This is less than half of \(2 \\(\frac{1}{2}\) cups.\)',
      },
      {
        text: '\(\\(\frac{7}{4}\) cups\)',
        isCorrect: false,
        rationale: 'This is greater than the correct amount.',
      },
    ],
  },
  {
    questionNumber: 3,
    calculator: false,
    question:
      "A stock's price dropped by 1.25 dollars on Monday and then rose by 2.50 dollars on Tuesday. What was the net change in the stock's price over the two days?",
    answerOptions: [
      {
        text: 'A gain of 1.25 dollars',
        isCorrect: true,
        rationale:
          'The net change is \(-1.25 + 2.50 = 1.25\), so the stock gained 1.25 dollars.',
      },
      {
        text: 'A loss of 1.25 dollars',
        isCorrect: false,
        rationale:
          'Because the net change is positive, the stock did not lose value.',
      },
      {
        text: 'A gain of 3.75 dollars',
        isCorrect: false,
        rationale:
          'Adding the magnitudes 1.25 and 2.50 assumes both days were gains.',
      },
      {
        text: 'A loss of 3.75 dollars',
        isCorrect: false,
        rationale:
          'Both days were not losses, so the total change cannot be negative 3.75 dollars.',
      },
    ],
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 4,
    calculator: false,
    question:
      'If a pizza is cut into 8 slices and you eat 3 of them, what fraction of the pizza is left?',
    answerOptions: [
      {
        text: '\(\\(\frac{3}{8}\)\)',
        isCorrect: false,
        rationale: 'This is the fraction eaten.',
      },
      {
        text: '\(\\(\frac{5}{8}\)\)',
        isCorrect: true,
        rationale:
          'If 3 out of 8 slices are eaten, \(8 - 3 = 5 slices are left.\)',
      },
      {
        text: '\(\\(\frac{1}{2}\)\)',
        isCorrect: false,
        rationale: '\(\\(\frac{1}{2}\) would be 4 slices.\)',
      },
      {
        text: '\(\\(\frac{3}{5}\)\)',
        isCorrect: false,
        rationale: 'This incorrectly uses the eaten slices as the denominator.',
      },
    ],
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 5,
    calculator: false,
    question:
      "A customer's total bill is 34.56 dollars. If they pay with a 50-dollar bill, how much change should they receive?",
    answerOptions: [
      {
        text: '15.44 dollars',
        isCorrect: true,
        rationale: '50.00 - 34.56 = 15.44.',
      },
      {
        text: '16.44 dollars',
        isCorrect: false,
        rationale: 'This result comes from subtracting incorrectly.',
      },
      {
        text: '15.54 dollars',
        isCorrect: false,
        rationale: 'The cents are miscalculated.',
      },
      {
        text: '25.44 dollars',
        isCorrect: false,
        rationale: 'This would be the change if the bill were 24.56 dollars.',
      },
    ],
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 6,
    calculator: true,
    question:
      'A piece of wood is 8 feet long. If you cut it into 4 equal pieces, how long will each piece be in feet?',
    answerOptions: [
      {
        text: '2 feet',
        isCorrect: true,
        rationale: '\(8 \\text{ feet} / 4 = 2 \\text{ feet}\).',
      },
      {
        text: '4 feet',
        isCorrect: false,
        rationale: 'This would be cutting it in half.',
      },
      {
        text: '1 foot',
        isCorrect: false,
        rationale: 'This would be cutting it into 8 pieces.',
      },
      {
        text: '32 feet',
        isCorrect: false,
        rationale: 'This is multiplication, not division.',
      },
    ],
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 7,
    calculator: true,
    question: 'What is 0.75 expressed as a fraction in simplest form?',
    answerOptions: [
      {
        text: '\(\\(\frac{75}{100}\)\)',
        isCorrect: false,
        rationale: 'This is correct but not in simplest form.',
      },
      {
        text: '\(\\(\frac{3}{4}\)\)',
        isCorrect: true,
        rationale:
          '\(0.75 is \\(\frac{75}{100}\)\), which simplifies to \(\\(\frac{3}{4}\) by dividing both numerator and denominator by 25.\)',
      },
      {
        text: '\(\\(\frac{1}{2}\)\)',
        isCorrect: false,
        rationale: '\(\\(\frac{1}{2}\) is 0.50.\)',
      },
      {
        text: '\(\\(\frac{4}{3}\)\)',
        isCorrect: false,
        rationale: 'This is the reciprocal of the correct answer.',
      },
    ],
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 8,
    calculator: true,
    question:
      'The temperature was \(-5�F in the morning and rose to \(12�F in the afternoon. How many degrees did the temperature increase?\)\)',
    answerOptions: [
      {
        text: '7 degrees',
        isCorrect: false,
        rationale: 'This is the difference between 12 and 5, not 12 and -5.',
      },
      {
        text: '17 degrees',
        isCorrect: true,
        rationale: 'The increase is \(12 - (-5) = 12 + 5 = 17 degrees.\)',
      },
      {
        text: '-17 degrees',
        isCorrect: false,
        rationale: 'The temperature increased, so the change is positive.',
      },
      {
        text: '12 degrees',
        isCorrect: false,
        rationale: 'This ignores the starting negative temperature.',
      },
    ],
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 9,
    calculator: true,
    question:
      'A carpenter has a board that is \(10 \\(\frac{1}{2}\) feet long. He needs to cut a piece that is \(3 \\(\frac{3}{4}\) feet long. How much of the board is left?\)\)',
    answerOptions: [
      {
        text: '\(\\(\frac{27}{4}\) feet\)',
        isCorrect: true,
        rationale:
          '\(10 \\(\frac{1}{2}\)\) - 3 \\(\frac{3}{4}\) = \\(\frac{21}{2}\) - \\(\frac{15}{4}\) = \\(\frac{42}{4}\) - \\(\frac{15}{4}\) = \\(\frac{27}{4} feet.\)',
      },
      {
        text: '\(\\(\frac{29}{4}\) feet\)',
        isCorrect: false,
        rationale:
          'This would come from subtracting \(3 \\(\frac{1}{4}\) instead of 3 \\(\frac{3}{4}\)\).',
      },
      {
        text: '\(\\(\frac{13}{2}\) feet\)',
        isCorrect: false,
        rationale:
          'This corresponds to \(6 \\(\frac{1}{2}\) feet, which is too small.\)',
      },
      {
        text: '7 feet',
        isCorrect: false,
        rationale: 'This ignores the fractional part of the remaining length.',
      },
    ],
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 10,
    challenge_tags: ['math-4'],
    calculator: true,
    question:
      'If you drive 4.5 miles to the store, then 2.3 miles to the post office, and finally 6.1 miles home, how many miles did you drive in total?',
    answerOptions: [
      {
        text: '12.9 miles',
        isCorrect: true,
        rationale: '\(4.5 + 2.3 + 6.1 = 12.9 miles.\)',
      },
      {
        text: '11.9 miles',
        isCorrect: false,
        rationale: 'This is a calculation error.',
      },
      {
        text: '13.0 miles',
        isCorrect: false,
        rationale: 'This is a calculation error.',
      },
      {
        text: '10.9 miles',
        isCorrect: false,
        rationale: 'This is a calculation error.',
      },
    ],
  },
  {
    questionNumber: 11,
    calculator: true,
    question:
      'Which of the following numbers is the largest: 0.6, 0.65, 0.065, 0.605?',
    answerOptions: [
      {
        text: '0.6',
        isCorrect: false,
        rationale: '0.6 is equal to 0.600.',
      },
      {
        text: '0.65',
        isCorrect: true,
        rationale: 'Comparing the decimal places, 0.650 is the largest value.',
      },
      {
        text: '0.065',
        isCorrect: false,
        rationale: 'This is the smallest value.',
      },
      {
        text: '0.605',
        isCorrect: false,
        rationale: '0.605 is smaller than 0.650.',
      },
    ],
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 12,
    calculator: true,
    question:
      "A company's profit was 5,670 dollars in one month. The next month, it was -830 dollars (a loss). What is the difference between the two months' profits?",
    answerOptions: [
      {
        text: '4,840 dollars',
        isCorrect: false,
        rationale: 'This is the sum if both months were profitable.',
      },
      {
        text: '6,500 dollars',
        isCorrect: true,
        rationale: 'The difference is 5,670 - (-830) = 5,670 + 830 = 6,500.',
      },
      {
        text: '5,500 dollars',
        isCorrect: false,
        rationale: 'This miscalculates the change between the months.',
      },
      {
        text: '-830 dollars',
        isCorrect: false,
        rationale:
          'This is the profit for the second month, not the difference.',
      },
    ],
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 13,
    calculator: true,
    question:
      'If a baker has 12 cups of sugar and each cake requires \(1 \\(\frac{1}{2}\) cups of sugar, how many cakes can the baker make?\)',
    answerOptions: [
      {
        text: '6 cakes',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '8 cakes',
        isCorrect: true,
        rationale:
          '\(12 / (1 \\(\frac{1}{2}\)\)) = 12 / (\\(\frac{3}{2}\)) = 12 * (\\(\frac{2}{3}\)) = 24 / 3 = 8 cakes.',
      },
      {
        text: '9 cakes',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '18 cakes',
        isCorrect: false,
        rationale: 'This is multiplication, not division.',
      },
    ],
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 14,
    challenge_tags: ['math-1'],
    calculator: true,
    question:
      'Order the following fractions from smallest to largest: \(\\(\frac{1}{2}\)\), \\(\frac{3}{5}\), \\(\frac{2}{3}\).',
    answerOptions: [
      {
        text: '\(\\(\frac{3}{5}\)\), \\(\frac{1}{2}\), \\(\frac{2}{3}\)',
        isCorrect: false,
        rationale:
          'Find a common denominator (30): \(\\(\frac{1}{2}\)\)=\\(\frac{15}{30}\), \\(\frac{3}{5}\)=\\(\frac{18}{30}\), \\(\frac{2}{3}\)=\\(\frac{20}{30}\).',
      },
      {
        text: '\(\\(\frac{1}{2}\)\), \\(\frac{3}{5}\), \\(\frac{2}{3}\)',
        isCorrect: true,
        rationale:
          'In decimal form: \(\\(\frac{1}{2}\)\)=0.5, \\(\frac{3}{5}\)=0.6, \\(\frac{2}{3}\) \\approx 0.66...\( The correct order is \\(\frac{1}{2}\)\), \\(\frac{3}{5}\), \\(\frac{2}{3}\).',
      },
      {
        text: '\(\\(\frac{2}{3}\)\), \\(\frac{3}{5}\), \\(\frac{1}{2}\)',
        isCorrect: false,
        rationale: 'This is largest to smallest.',
      },
      {
        text: '\(\\(\frac{1}{2}\)\), \\(\frac{2}{3}\), \\(\frac{3}{5}\)',
        isCorrect: false,
        rationale: 'This order is incorrect.',
      },
    ],
  },
  {
    questionNumber: 15,
    calculator: true,
    question:
      'A submarine is at a depth of -350 feet. It then rises 120 feet. What is its new depth?',
    answerOptions: [
      {
        text: '-470 feet',
        isCorrect: false,
        rationale: 'This would be the depth if it descended further.',
      },
      {
        text: '-230 feet',
        isCorrect: true,
        rationale: '\(-350 + 120 = -230 feet.\)',
      },
      {
        text: '230 feet',
        isCorrect: false,
        rationale: 'The submarine is still below sea level.',
      },
      {
        text: '-120 feet',
        isCorrect: false,
        rationale: 'This is the amount it rose, not its new depth.',
      },
    ],
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 16,
    calculator: true,
    question:
      'A baker uses \(\\(\frac{1}{4}\) of a bag of flour for a batch of cookies. If the bag originally contained 20 cups of flour, how many cups are left?\)',
    answerOptions: [
      {
        text: '5 cups',
        isCorrect: false,
        rationale: 'This is the amount of flour used, not the amount left.',
      },
      {
        text: '15 cups',
        isCorrect: true,
        rationale:
          'The baker used \(\\(\frac{1}{4}\)\) \\(\times20 = 5 cups. The amount left is 20 - 5 = 15 cups.\)',
      },
      {
        text: '10 cups',
        isCorrect: false,
        rationale: 'This is a calculation error.',
      },
      {
        text: '16 cups',
        isCorrect: false,
        rationale: 'This is a calculation error.',
      },
    ],
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 17,
    calculator: true,
    question:
      "Sarah's temperature was 102.5�F. After taking some medicine, her temperature dropped by 3.8�F. What is her new temperature?",
    answerOptions: [
      {
        text: '98.7�F',
        isCorrect: true,
        rationale: '\(102.5 - 3.8 = 98.7\)�F.',
      },
      {
        text: '99.7�F',
        isCorrect: false,
        rationale: 'This is a calculation error.',
      },
      {
        text: '106.3�F',
        isCorrect: false,
        rationale: 'This is the result of adding the numbers, not subtracting.',
      },
      {
        text: '98.2�F',
        isCorrect: false,
        rationale: 'This is a calculation error.',
      },
    ],
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 18,
    calculator: true,
    question:
      "A car travels 350 miles on a full tank of gas. If the tank holds 14 gallons, what is the car's fuel efficiency in miles per gallon (MPG)?",
    answerOptions: [
      {
        text: '20 MPG',
        isCorrect: false,
        rationale: 'This is a calculation error.',
      },
      {
        text: '25 MPG',
        isCorrect: true,
        rationale:
          'Fuel efficiency is total miles divided by gallons used: $350 / 14 = 25 MPG.',
      },
      {
        text: '30 MPG',
        isCorrect: false,
        rationale: 'This is a calculation error.',
      },
      {
        text: '35 MPG',
        isCorrect: false,
        rationale: 'This is a calculation error.',
      },
    ],
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 19,
    calculator: true,
    question:
      'A recipe requires \(\\(\frac{3}{4}\) cup of sugar. If you want to make a triple batch, how much sugar do you need?\)',
    answerOptions: [
      {
        text: '\(\\(\frac{9}{4}\) cups\)',
        isCorrect: true,
        rationale:
          'Triple batch means multiplying by 3: \(3 \\(\times\)\) \\(\frac{3}{4}\) = \\(\frac{9}{4} cups.\)',
      },
      {
        text: '\(\\(\frac{3}{2}\) cups\)',
        isCorrect: false,
        rationale: 'This represents only doubling the recipe.',
      },
      {
        text: '\(\\(\frac{15}{4}\) cups\)',
        isCorrect: false,
        rationale: 'This would correspond to five times the original amount.',
      },
      {
        text: '3 cups',
        isCorrect: false,
        rationale:
          'This replaces the fraction with a whole number incorrectly.',
      },
    ],
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 20,
    calculator: false,
    question:
      'The temperature was -8�C in the morning and rose by 15�C. What is the new temperature?',
    answerOptions: [
      {
        text: '-23�C',
        isCorrect: false,
        rationale: 'This would be the temperature if it dropped by 15 degrees.',
      },
      {
        text: '7�C',
        isCorrect: true,
        rationale: '-8 + 15 = 7�C.',
      },
      {
        text: '23�C',
        isCorrect: false,
        rationale: 'Incorrect calculation.',
      },
      {
        text: '-7�C',
        isCorrect: false,
        rationale: 'Incorrect calculation.',
      },
    ],
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 21,
    calculator: true,
    question:
      "A runner completed a race in 45.67 seconds. The second-place runner finished 1.89 seconds slower. What was the second-place runner's time?",
    answerOptions: [
      {
        text: '43.78 seconds',
        isCorrect: false,
        rationale: 'This would be 1.89 seconds faster.',
      },
      {
        text: '47.56 seconds',
        isCorrect: true,
        rationale:
          'Slower means adding the time. 45.67 + 1.89 = 47.56 seconds.',
      },
      {
        text: '46.56 seconds',
        isCorrect: false,
        rationale: 'Incorrect calculation.',
      },
      {
        text: '47.46 seconds',
        isCorrect: false,
        rationale: 'Incorrect calculation.',
      },
    ],
    challenge_tags: ['math-1'],
  },
];
