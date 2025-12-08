export const MATH_QUESTIONS = {
  Math: {
    icon: 'CalculatorIcon',
    categories: {
      'Quantitative Problem Solving': {
        description: 'Solve problems using numbers, data, and statistics.',
        icon: 'ChartBarIcon', // New Icon
                question:
                  "A customer's total bill is $34.56. If they pay with a $50 bill, how much change should they receive?",
            id: 'math_quant_basics',
            title: 'Whole Numbers, Fractions & Decimals',
                    text: '$15.44',
            type: 'quiz',
                    rationale: '$50.00 - $34.56 = $15.44.',
              {
                questionNumber: 1,
                    text: '$16.44',
                calculator: false,
                question:
                  'A construction project requires $\\frac{5}{8}$ inch bolts. If a worker has a bolt that is $\\frac{3}{4}$ inch, is it too large or too small, and by how much?',
                answerOptions: [
                  {
                    text: '$15.54',
                    isCorrect: true,
                    rationale:
                      'To compare $\\frac{3}{4}$ and $\\frac{5}{8}$, find a common denominator, which is 8. $\\frac{3}{4}$ is equal to $\\frac{6}{8}$, so it exceeds $\\frac{5}{8}$ by $\\frac{1}{8}$.',
                  },
                    text: '$25.44',
                    text: 'The bolt is $\\frac{1}{8}$ inch too small.',
                    isCorrect: false,
                      'This would be the change if the bill were $24.56.',
                      '$\\frac{3}{4}$ is equal to $\\frac{6}{8}$, which is larger than $\\frac{5}{8}$, not smaller.',
                  },
                  {
                    text: 'The bolt is $\\frac{1}{4}$ inch too large.',
                    isCorrect: false,
                    rationale:
                      'The difference between $\\frac{3}{4}$ and $\\frac{5}{8}$ is $\\frac{1}{8}$ inch, not $\\frac{1}{4}$ inch.',
                  },
                  {
                    text: 'The bolt matches the required size exactly.',
                    isCorrect: false,
                    rationale: 'The sizes differ by $\\frac{1}{8}$ inch.',
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['math-1'],
                calculator: false,
                question:
                  'A recipe calls for $2 \\frac{1}{2}$ cups of flour. If you want to make half the recipe, how much flour do you need?',
                answerOptions: [
                  {
                    text: '$\\frac{5}{4}$ cups',
                    isCorrect: true,
                    rationale:
                      'Half of $2 \\frac{1}{2}$ is $\\left(\\frac{5}{2}\\right) \\div 2 = \\frac{5}{4}$ cups.',
                  },
                  {
                    text: '$\\frac{3}{2}$ cups',
                    isCorrect: false,
                    rationale:
                      'This would be more than half of the original amount.',
                  },
                  {
                    text: '$1$ cup',
                    isCorrect: false,
                    rationale:
                      'This is less than half of $2 \\frac{1}{2}$ cups.',
                  },
                  {
                    text: '$\\frac{7}{4}$ cups',
                    isCorrect: false,
                    rationale: 'This is greater than the correct amount.',
                  },
                ],
              },
              {
                questionNumber: 3,
                calculator: false,
                question:
                  "A stock's price dropped by \\$1.25 on Monday and then rose by \\$2.50 on Tuesday. What was the net change in the stock's price over the two days?",
                answerOptions: [
                  {
                    text: 'A gain of \\$1.25',
                    isCorrect: true,
                    rationale:
                      'The net change is $-1.25 + 2.50 = 1.25$, so the stock gained \\$1.25.',
                  },
                  {
                    text: 'A loss of \\$1.25',
                    isCorrect: false,
                    rationale:
                      'Because the net change is positive, the stock did not lose value.',
                  },
                  {
                    text: 'A gain of \\$3.75',
                    isCorrect: false,
                    rationale:
                      'Adding the magnitudes $1.25$ and $2.50$ assumes both days were gains.',
                  },
                  {
                    text: 'A loss of \\$3.75',
                    isCorrect: false,
                    rationale:
                      'Both days were not losses, so the total change cannot be negative \\$3.75.',
                  },
                ],
              },
              {
                questionNumber: 4,
                calculator: false,
                question:
                  'If a pizza is cut into 8 slices and you eat 3 of them, what fraction of the pizza is left?',
                answerOptions: [
                  {
                    text: '$\\frac{3}{8}$',
                    isCorrect: false,
                    rationale: 'This is the fraction eaten.',
                  },
                  {
                    text: '$\\frac{5}{8}$',
                    isCorrect: true,
                    rationale:
                      'If 3 out of 8 slices are eaten, $8 - 3 = 5$ slices are left.',
                  },
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: false,
                    rationale: '$\\frac{1}{2}$ would be 4 slices.',
                  },
                  {
                    text: '$\\frac{3}{5}$',
                    isCorrect: false,
                    rationale:
                      'This incorrectly uses the eaten slices as the denominator.',
                  },
                ],
              },
              {
                questionNumber: 5,
                calculator: false,
                question:
                  "A customer's total bill is \\$34.56. If they pay with a \\$50 bill, how much change should they receive?",
                answerOptions: [
                  {
                    text: '\\$15.44',
                    isCorrect: true,
                    rationale: '\\$50.00 - \\$34.56 = \\$15.44.',
                  },
                  {
                    text: '\\$16.44',
                    isCorrect: false,
                    rationale:
                      'This result comes from subtracting incorrectly.',
                  },
                  {
                    text: '\\$15.54',
                    isCorrect: false,
                    rationale: 'The cents are miscalculated.',
                  },
                  {
                    text: '\\$25.44',
                    isCorrect: false,
                    rationale:
                      'This would be the change if the bill were \\$24.56.',
                  },
                ],
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
                    rationale: '$8 \\text{ feet} / 4 = 2 \\text{ feet}$.',
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
              },
              {
                questionNumber: 7,
                calculator: true,
                question:
                  'What is $0.75$ expressed as a fraction in simplest form?',
                answerOptions: [
                  {
                    text: '$\\frac{75}{100}$',
                    isCorrect: false,
                    rationale: 'This is correct but not in simplest form.',
                  },
                  {
                    text: '$\\frac{3}{4}$',
                    isCorrect: true,
                    rationale:
                      '$0.75$ is $\\frac{75}{100}$, which simplifies to $\\frac{3}{4}$ by dividing both numerator and denominator by 25.',
                  },
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: false,
                    rationale: '$\\frac{1}{2}$ is $0.50$.',
                  },
                  {
                    text: '$\\frac{4}{3}$',
                    isCorrect: false,
                    rationale: 'This is the reciprocal of the correct answer.',
                  },
                ],
              },
              {
                questionNumber: 8,
                calculator: true,
                question:
                  'The temperature was $-5F$ in the morning and rose to $12F$ in the afternoon. How many degrees did the temperature increase?',
                answerOptions: [
                  {
                    text: '7 degrees',
                    isCorrect: false,
                    rationale:
                      'This is the difference between 12 and 5, not 12 and -5.',
                  },
                  {
                    text: '17 degrees',
                    isCorrect: true,
                    rationale:
                      'The increase is $12 - (-5) = 12 + 5 = 17$ degrees.',
                  },
                  {
                    text: '-17 degrees',
                    isCorrect: false,
                    rationale:
                      'The temperature increased, so the change is positive.',
                  },
                  {
                    text: '12 degrees',
                    isCorrect: false,
                    rationale:
                      'This ignores the starting negative temperature.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: true,
                question:
                  'A carpenter has a board that is $10 \\frac{1}{2}$ feet long. He needs to cut a piece that is $3 \\frac{3}{4}$ feet long. How much of the board is left?',
                answerOptions: [
                  {
                    text: '$\\frac{27}{4}$ feet',
                    isCorrect: true,
                    rationale:
                      '$10 \\frac{1}{2} - 3 \\frac{3}{4} = \\frac{21}{2} - \\frac{15}{4} = \\frac{42}{4} - \\frac{15}{4} = \\frac{27}{4}$ feet.',
                  },
                  {
                    text: '$\\frac{29}{4}$ feet',
                    isCorrect: false,
                    rationale:
                      'This would come from subtracting $3 \\frac{1}{4}$ instead of $3 \\frac{3}{4}$.',
                  },
                  {
                    text: '$\\frac{13}{2}$ feet',
                    isCorrect: false,
                    rationale:
                      'This corresponds to $6 \\frac{1}{2}$ feet, which is too small.',
                  },
                  {
                    text: '7 feet',
                    isCorrect: false,
                    rationale:
                      'This ignores the fractional part of the remaining length.',
                  },
                ],
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
                    rationale: '$4.5 + 2.3 + 6.1 = 12.9$ miles.',
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
                  'Which of the following numbers is the largest: $0.6, 0.65, 0.065, 0.605$?',
                answerOptions: [
                  {
                    text: '0.6',
                    isCorrect: false,
                    rationale: '$0.6$ is equal to $0.600$.',
                  },
                  {
                    text: '0.65',
                    isCorrect: true,
                    rationale:
                      'Comparing the decimal places, $0.650$ is the largest value.',
                  },
                  {
                    text: '0.065',
                    isCorrect: false,
                    rationale: 'This is the smallest value.',
                  },
                  {
                    text: '0.605',
                    isCorrect: false,
                    rationale: '$0.605$ is smaller than $0.650$.',
                  },
                ],
              },
              {
                questionNumber: 12,
                calculator: true,
                question:
                  "A company's profit was \\$5,670 in one month. The next month, it was -\\$830 (a loss). What is the difference between the two months' profits?",
                answerOptions: [
                  {
                    text: '\\$4,840',
                    isCorrect: false,
                    rationale:
                      'This is the sum if both months were profitable.',
                  },
                  {
                    text: '\\$6,500',
                    isCorrect: true,
                    rationale:
                      'The difference is \\$5,670 - (-\\$830) = \\$5,670 + \\$830 = \\$6,500.',
                  },
                  {
                    text: '\\$5,500',
                    isCorrect: false,
                    rationale:
                      'This miscalculates the change between the months.',
                  },
                  {
                    text: '-\\$830',
                    isCorrect: false,
                    rationale:
                      'This is the profit for the second month, not the difference.',
                  },
                ],
              },
              {
                questionNumber: 13,
                calculator: true,
                question:
                  'If a baker has 12 cups of sugar and each cake requires $1 \\frac{1}{2}$ cups of sugar, how many cakes can the baker make?',
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
                      '$12 / (1 \\frac{1}{2}) = 12 / (\\frac{3}{2}) = 12 * (\\frac{2}{3}) = 24 / 3 = 8$ cakes.',
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
              },
              {
                questionNumber: 14,
                challenge_tags: ['math-1'],
                calculator: true,
                question:
                  'Order the following fractions from smallest to largest: $\\frac{1}{2}, \\frac{3}{5}, \\frac{2}{3}$.',
                answerOptions: [
                  {
                    text: '$\\frac{3}{5}, \\frac{1}{2}, \\frac{2}{3}$',
                    isCorrect: false,
                    rationale:
                      'Find a common denominator (30): $\\frac{1}{2}=\\frac{15}{30}, \\frac{3}{5}=\\frac{18}{30}, \\frac{2}{3}=\\frac{20}{30}$.',
                  },
                  {
                    text: '$\\frac{1}{2}, \\frac{3}{5}, \\frac{2}{3}$',
                    isCorrect: true,
                    rationale:
                      'In decimal form: $\\frac{1}{2}=0.5, \\frac{3}{5}=0.6, \\frac{2}{3} \\approx 0.66...$ The correct order is $\\frac{1}{2}, \\frac{3}{5}, \\frac{2}{3}$.',
                  },
                  {
                    text: '$\\frac{2}{3}, \\frac{3}{5}, \\frac{1}{2}$',
                    isCorrect: false,
                    rationale: 'This is largest to smallest.',
                  },
                  {
                    text: '$\\frac{1}{2}, \\frac{2}{3}, \\frac{3}{5}$',
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
                    rationale:
                      'This would be the depth if it descended further.',
                  },
                  {
                    text: '-230 feet',
                    isCorrect: true,
                    rationale: '$-350 + 120 = -230$ feet.',
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
              },
              {
                questionNumber: 16,
                calculator: true,
                question:
                  'A baker uses $\\frac{1}{4}$ of a bag of flour for a batch of cookies. If the bag originally contained 20 cups of flour, how many cups are left?',
                answerOptions: [
                  {
                    text: '5 cups',
                    isCorrect: false,
                    rationale:
                      'This is the amount of flour used, not the amount left.',
                  },
                  {
                    text: '15 cups',
                    isCorrect: true,
                    rationale:
                      'The baker used $\\frac{1}{4} \\times 20 = 5$ cups. The amount left is $20 - 5 = 15$ cups.',
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
              },
              {
                questionNumber: 17,
                calculator: true,
                question:
                  "Sarah's temperature was 102.5 degrees F. After taking some medicine, her temperature dropped by 3.8 degrees F. What is her new temperature?",
                answerOptions: [
                  {
                    text: '98.7 degrees F',
                    isCorrect: true,
                    rationale: '$102.5 - 3.8 = 98.7$ degrees F.',
                  },
                  {
                    text: '99.7 degrees F',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '106.3 degrees F',
                    isCorrect: false,
                    rationale:
                      'This is the result of adding the numbers, not subtracting.',
                  },
                  {
                    text: '98.2 degrees F',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                ],
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
                      'Fuel efficiency is total miles divided by gallons used: $350 / 14 = 25$ MPG.',
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
              },
              {
                questionNumber: 19,
                calculator: true,
                question:
                  'A recipe requires $\\frac{3}{4}$ cup of sugar. If you want to make a triple batch, how much sugar do you need?',
                answerOptions: [
                  {
                    text: '$\\frac{9}{4}$ cups',
                    isCorrect: true,
                    rationale:
                      'Triple batch means multiplying by 3: $3 \\times \\frac{3}{4} = \\frac{9}{4}$ cups.',
                  },
                  {
                    text: '$\\frac{3}{2}$ cups',
                    isCorrect: false,
                    rationale: 'This represents only doubling the recipe.',
                  },
                  {
                    text: '$\\frac{15}{4}$ cups',
                    isCorrect: false,
                    rationale:
                      'This would correspond to five times the original amount.',
                  },
                  {
                    text: '3 cups',
                    isCorrect: false,
                    rationale:
                      'This replaces the fraction with a whole number incorrectly.',
                  },
                ],
              },
              {
                questionNumber: 20,
                calculator: false,
                question:
                  'The temperature was -8C in the morning and rose by 15C. What is the new temperature?',
                answerOptions: [
                  {
                    text: '-23C',
                    isCorrect: false,
                    rationale:
                      'This would be the temperature if it dropped by 15 degrees.',
                  },
                  {
                    text: '7C',
                    isCorrect: true,
                    rationale: '-8 + 15 = 7C.',
                  },
                  {
                    text: '23C',
                    isCorrect: false,
                    rationale: 'Incorrect calculation.',
                  },
                  {
                    text: '-7C',
                    isCorrect: false,
                    rationale: 'Incorrect calculation.',
                  },
                ],
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
              },
            ],
          },
          {
            id: 'math_quant_ratios_percents',
            title: 'Ratios, Proportions & Percents',
            description:
              'Solving real-world problems with ratios and percentages.',
            type: 'quiz',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['math-1'],
                calculator: false,
                question:
                  'A shirt that originally costs $40 is on sale for $25\\%$ off. What is the sale price of the shirt?',
                answerOptions: [
                  {
                    text: '$10',
                    isCorrect: false,
                    rationale:
                      'This is the discount amount, not the final price.',
                  },
                  {
                    text: '$30',
                    isCorrect: true,
                    rationale:
                      'The discount is $25\\%$ of $\\$40$, which is $0.25 \\times 40 = \\$10$. The sale price is $\\$40 - \\$10 = \\$30$.',
                  },
                  {
                    text: '$50',
                    isCorrect: false,
                    rationale: 'This is the price after a 25% increase.',
                  },
                  {
                    text: '$35',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['math-1'],
                calculator: false,
                question:
                  'A map has a scale where 1 inch represents 50 miles. If two cities are 3.5 inches apart on the map, what is the actual distance between them?',
                answerOptions: [
                  {
                    text: '150 miles',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '175 miles',
                    isCorrect: true,
                    rationale:
                      'Set up a proportion: $\\frac{1 \\text{ in}}{50 \\text{ mi}} = \\frac{3.5 \\text{ in}}{x \\text{ mi}}$. Solving for x gives $3.5 \\times 50 = 175$ miles.',
                  },
                  {
                    text: '200 miles',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '14.3 miles',
                    isCorrect: false,
                    rationale: 'This is division, not multiplication.',
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['math-1'],
                calculator: false,
                question:
                  'In a bag of marbles, the ratio of blue marbles to red marbles is $3:5$. If there are 15 red marbles, how many blue marbles are there?',
                answerOptions: [
                  {
                    text: '9',
                    isCorrect: true,
                    rationale:
                      'Set up a proportion: $\\frac{3 \\text{ blue}}{5 \\text{ red}} = \\frac{x \\text{ blue}}{15 \\text{ red}}$. To get from 5 to 15, you multiply by 3. So, multiply 3 by 3 to get 9.',
                  },
                  {
                    text: '25',
                    isCorrect: false,
                    rationale:
                      'This would be the result if the ratio were 5:3.',
                  },
                  {
                    text: '15',
                    isCorrect: false,
                    rationale: 'This is the number of red marbles.',
                  },
                  {
                    text: '3',
                    isCorrect: false,
                    rationale:
                      'This is part of the ratio, not the final number.',
                  },
                ],
              },
              {
                questionNumber: 4,
                calculator: false,
                question:
                  'A restaurant bill is $80. If you want to leave a $20\\%$ tip, how much should the tip be?',
                answerOptions: [
                  {
                    text: '$8',
                    isCorrect: false,
                    rationale: 'This would be a 10% tip.',
                  },
                  {
                    text: '$16',
                    isCorrect: true,
                    rationale:
                      '$20\\%$ of $\\$80$ is $0.20 \\times 80 = \\$16$.',
                  },
                  {
                    text: '$20',
                    isCorrect: false,
                    rationale: 'This would be a 25% tip.',
                  },
                  {
                    text: '$96',
                    isCorrect: false,
                    rationale: 'This is the total bill plus the tip.',
                  },
                ],
              },
              {
                questionNumber: 5,
                challenge_tags: ['math-1'],
                calculator: false,
                question:
                  'You scored 45 out of 50 on a test. What is your score as a percentage?',
                answerOptions: [
                  {
                    text: '$85\\%$',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '$90\\%$',
                    isCorrect: true,
                    rationale:
                      '$(\\frac{45}{50}) \\times 100 = 0.9 \\times 100 = 90\\%$.',
                  },
                  {
                    text: '$95\\%$',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '$45\\%$',
                    isCorrect: false,
                    rationale: 'This is the raw score, not the percentage.',
                  },
                ],
              },
              {
                questionNumber: 6,
                challenge_tags: ['math-1'],
                calculator: true,
                question:
                  'The price of a computer increased from $500 to $600. What was the percent increase?',
                answerOptions: [
                  {
                    text: '$10\\%$',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '$20\\%$',
                    isCorrect: true,
                    rationale:
                      'The increase is $\\$100$. The percent increase is (increase / original price) * 100 = (100 / 500) * 100 = $0.2 \\times 100 = 20\\%$.',
                  },
                  {
                    text: '$25\\%$',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '$100\\%$',
                    isCorrect: false,
                    rationale: 'This would mean the price doubled.',
                  },
                ],
              },
              {
                questionNumber: 7,
                calculator: true,
                question:
                  'A car can travel 300 miles on 12 gallons of gasoline. How many gallons are needed to travel 450 miles?',
                answerOptions: [
                  {
                    text: '15 gallons',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '18 gallons',
                    isCorrect: true,
                    rationale:
                      'The car gets $\\frac{300}{12} = 25$ miles per gallon. To travel 450 miles, you need $\\frac{450}{25} = 18$ gallons.',
                  },
                  {
                    text: '20 gallons',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '24 gallons',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 8,
                calculator: true,
                question:
                  'A survey of 200 people found that 120 of them prefer coffee to tea. What is the ratio of people who prefer coffee to the total number of people surveyed, in simplest form?',
                answerOptions: [
                  {
                    text: '$120:200$',
                    isCorrect: false,
                    rationale:
                      'This is the correct ratio but not in simplest form.',
                  },
                  {
                    text: '$3:5$',
                    isCorrect: true,
                    rationale:
                      'The ratio is $\\frac{120}{200}$. Divide both sides by the greatest common divisor, 40, to get $\\frac{3}{5}$.',
                  },
                  {
                    text: '$2:3$',
                    isCorrect: false,
                    rationale:
                      'This is the ratio of tea drinkers to coffee drinkers.',
                  },
                  {
                    text: '$3:2$',
                    isCorrect: false,
                    rationale:
                      'This is the ratio of coffee drinkers to tea drinkers.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: true,
                question:
                  'If sales tax is $7\\%$, how much tax would you pay on a $150 purchase?',
                answerOptions: [
                  {
                    text: '$7.00',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '$10.50',
                    isCorrect: true,
                    rationale:
                      '$7\\%$ of $\\$150$ is $0.07 \\times 150 = \\$10.50$.',
                  },
                  {
                    text: '$15.00',
                    isCorrect: false,
                    rationale: 'This would be a 10% tax.',
                  },
                  {
                    text: '$1.05',
                    isCorrect: false,
                    rationale: 'This is a decimal placement error.',
                  },
                ],
              },
              {
                questionNumber: 10,
                calculator: true,
                question:
                  'A recipe calls for 2 cups of sugar for every 5 cups of flour. If you use 15 cups of flour, how much sugar do you need?',
                answerOptions: [
                  {
                    text: '4 cups',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '5 cups',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '6 cups',
                    isCorrect: true,
                    rationale:
                      'The ratio is $\\frac{2}{5}$. Set up the proportion $\\frac{2}{5} = \\frac{x}{15}$. To get from 5 to 15, you multiply by 3. So, $2 \\times 3 = 6$ cups.',
                  },
                  {
                    text: '7.5 cups',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 11,
                calculator: true,
                question:
                  'A store buys a TV for $200 and marks it up by $60\\%$ to sell. What is the selling price?',
                answerOptions: [
                  {
                    text: '$260',
                    isCorrect: false,
                    rationale: 'This would be a 30% markup.',
                  },
                  {
                    text: '$320',
                    isCorrect: true,
                    rationale:
                      'The markup is $60\\%$ of $\\$200$, which is $0.60 \\times 200 = \\$120$. The selling price is $\\$200 + \\$120 = \\$320$.',
                  },
                  {
                    text: '$280',
                    isCorrect: false,
                    rationale: 'This would be a 40% markup.',
                  },
                  {
                    text: '$120',
                    isCorrect: false,
                    rationale:
                      'This is the markup amount, not the final price.',
                  },
                ],
              },
              {
                questionNumber: 12,
                calculator: true,
                question:
                  "If a city's population grew by $5\\%$ last year and the original population was 80,000, what is the new population?",
                answerOptions: [
                  {
                    text: '80,400',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '84,000',
                    isCorrect: true,
                    rationale:
                      'The growth is $5\\%$ of 80,000, which is $0.05 \\times 80,000 = 4,000$. The new population is $80,000 + 4,000 = 84,000$.',
                  },
                  {
                    text: '85,000',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '120,000',
                    isCorrect: false,
                    rationale: 'This would be a 50% growth.',
                  },
                ],
              },
              {
                questionNumber: 13,
                calculator: true,
                question:
                  'Two numbers are in the ratio of $7:4$. If the smaller number is 28, what is the larger number?',
                answerOptions: [
                  {
                    text: '49',
                    isCorrect: true,
                    rationale:
                      'The ratio is $\\frac{7}{4}$. Set up the proportion $\\frac{7}{4} = \\frac{x}{28}$. To get from 4 to 28, you multiply by 7. So, $7 \\times 7 = 49$.',
                  },
                  {
                    text: '16',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '56',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '28',
                    isCorrect: false,
                    rationale: 'This is the smaller number.',
                  },
                ],
              },
              {
                questionNumber: 14,
                calculator: true,
                question:
                  'A company has 500 employees. If $15\\%$ of the employees have been with the company for more than 10 years, how many employees is that?',
                answerOptions: [
                  {
                    text: '50',
                    isCorrect: false,
                    rationale: 'This would be 10%.',
                  },
                  {
                    text: '75',
                    isCorrect: true,
                    rationale:
                      '$15\\%$ of 500 is $0.15 \\times 500 = 75$ employees.',
                  },
                  {
                    text: '100',
                    isCorrect: false,
                    rationale: 'This would be 20%.',
                  },
                  {
                    text: '150',
                    isCorrect: false,
                    rationale: 'This would be 30%.',
                  },
                ],
              },
              {
                questionNumber: 15,
                calculator: true,
                question:
                  'If you need to mix cement and sand in a ratio of $1:3$, how much sand would you need if you use 5 bags of cement?',
                answerOptions: [
                  {
                    text: '3 bags',
                    isCorrect: false,
                    rationale: 'This is the ratio value, not the total amount.',
                  },
                  {
                    text: '5 bags',
                    isCorrect: false,
                    rationale: 'This is the amount of cement.',
                  },
                  {
                    text: '15 bags',
                    isCorrect: true,
                    rationale:
                      'The ratio is 1 part cement to 3 parts sand. If you have 5 bags of cement, you need $5 \\times 3 = 15$ bags of sand.',
                  },
                  {
                    text: '20 bags',
                    isCorrect: false,
                    rationale: 'This is the total number of bags.',
                  },
                ],
              },
              {
                questionNumber: 16,
                calculator: true,
                question:
                  'A runner completes 8 laps around a track in 12 minutes. At this rate, how many laps can the runner complete in 30 minutes?',
                answerOptions: [
                  {
                    text: '15 laps',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '20 laps',
                    isCorrect: true,
                    rationale:
                      "The runner's rate is $\\frac{12 \\text{ min}}{8 \\text{ laps}} = 1.5$ minutes per lap. In 30 minutes, the runner can complete $\\frac{30}{1.5} = 20$ laps. Alternatively, set up a proportion: $\\frac{8}{12} = \\frac{x}{30}$, which gives $12x = 240$, so $x=20$.",
                  },
                  {
                    text: '24 laps',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '18 laps',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 17,
                calculator: true,
                question:
                  'The ratio of boys to girls in a school is 5:6. If there are 240 girls, what is the total number of students in the school?',
                answerOptions: [
                  {
                    text: '200',
                    isCorrect: false,
                    rationale:
                      'This is the number of boys, not the total number of students.',
                  },
                  {
                    text: '440',
                    isCorrect: true,
                    rationale:
                      'Set up the proportion $\\frac{5 \\text{ boys}}{6 \\text{ girls}} = \\frac{x \\text{ boys}}{240 \\text{ girls}}$. This gives $6x = 1200$, so $x = 200$ boys. The total number of students is 200 boys + 240 girls = 440.',
                  },
                  {
                    text: '480',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '540',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 18,
                calculator: true,
                question:
                  'A pair of jeans originally priced at $75 is on sale for 40% off. What is the sale price?',
                answerOptions: [
                  {
                    text: '$30',
                    isCorrect: false,
                    rationale:
                      'This is the discount amount, not the final sale price.',
                  },
                  {
                    text: '$45',
                    isCorrect: true,
                    rationale:
                      'The discount is $40\\%$ of $\\$75$, which is $0.40 \\times 75 = \\$30$. The sale price is the original price minus the discount: $\\$75 - \\$30 = \\$45$.',
                  },
                  {
                    text: '$105',
                    isCorrect: false,
                    rationale:
                      'This is the original price plus the discount amount.',
                  },
                  {
                    text: '$55',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
            ],
          },
          {
            id: 'math_quant_stats_probability',
            title: 'Statistics & Probability',
            description: 'Mean, median, mode, range, and basic probability.',
            type: 'quiz',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['math-6'],
                calculator: false,
                passage: 'Test Scores: 85, 92, 78, 88, 92',
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
                passage: 'Test Scores: 85, 92, 78, 88, 92',
                question:
                  'What is the mean (average) of the test scores listed?',
                answerOptions: [
                  {
                    text: '87',
                    isCorrect: true,
                    rationale:
                      'The sum of the scores ($85+92+78+88+92$) is 435. The mean is $435 / 5 = 87$.',
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
                passage: 'Test Scores: 85, 92, 78, 88, 92',
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
                    text: '$\\frac{1}{3}$',
                    isCorrect: true,
                    rationale:
                      'There are 5 blue marbles and a total of $4+5+6=15$ marbles. The probability is $\\frac{5}{15}$, which simplifies to $\\frac{1}{3}$.',
                  },
                  {
                    text: '$\\frac{1}{5}$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$\\frac{5}{10}$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$\\frac{1}{15}$',
                    isCorrect: false,
                    rationale:
                      'This would be the probability of drawing one specific marble.',
                  },
                ],
              },
              {
                questionNumber: 5,
                calculator: false,
                passage:
                  'Daily High Temperatures (F): 65, 68, 72, 72, 75, 78, 81',
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
                      'The range is the difference between the highest and lowest value: $81 - 65 = 16$.',
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
              },
              {
                questionNumber: 6,
                calculator: true,
                question:
                  'If you roll a standard six-sided die, what is the probability of rolling an even number?',
                answerOptions: [
                  {
                    text: '$\\frac{1}{6}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of rolling one specific number.',
                  },
                  {
                    text: '$\\frac{1}{3}$',
                    isCorrect: false,
                    rationale:
                      'There are 3 even numbers (2, 4, 6) out of 6 total possibilities.',
                  },
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: true,
                    rationale:
                      'There are 3 even numbers (2, 4, 6) out of 6 total possibilities. The probability is $\\frac{3}{6}$, which simplifies to $\\frac{1}{2}$.',
                  },
                  {
                    text: '$\\frac{2}{3}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of rolling a number greater than 2.',
                  },
                ],
              },
              {
                questionNumber: 7,
                calculator: true,
                passage: 'Ages of employees: 22, 25, 28, 34, 46',
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
              },
              {
                questionNumber: 8,
                calculator: true,
                question:
                  'A spinner is divided into 8 equal sections, numbered 1 through 8. What is the probability of spinning a number greater than 5?',
                answerOptions: [
                  {
                    text: '$\\frac{1}{8}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of spinning one specific number.',
                  },
                  {
                    text: '$\\frac{3}{8}$',
                    isCorrect: true,
                    rationale:
                      "The numbers greater than 5 are 6, 7, and 8. That's 3 favorable outcomes out of 8 total possibilities.",
                  },
                  {
                    text: '$\\frac{5}{8}$',
                    isCorrect: false,
                    rationale: 'This is the probability of spinning 5 or less.',
                  },
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: false,
                    rationale: '$\\frac{1}{2}$ would be 4 sections.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: true,
                passage:
                  'Number of books read per month: 2, 3, 3, 5, 7, 10',
                question: 'What is the mean number of books read per month?',
                answerOptions: [
                  { text: '3', isCorrect: false, rationale: '3 is the mode.' },
                  {
                    text: '4',
                    isCorrect: false,
                    rationale: '4 is the median.',
                  },
                  {
                    text: '5',
                    isCorrect: true,
                    rationale:
                      'The sum is $2+3+3+5+7+10 = 30$. The mean is $30 / 6 = 5$.',
                  },
                  { text: '8', isCorrect: false, rationale: '8 is the range.' },
                ],
              },
              {
                questionNumber: 10,
                calculator: true,
                question:
                  'From a standard deck of 52 cards, what is the probability of drawing a king?',
                answerOptions: [
                  {
                    text: '$\\frac{1}{52}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of drawing a specific king, not any king.',
                  },
                  {
                    text: '$\\frac{1}{13}$',
                    isCorrect: true,
                    rationale:
                      'There are 4 kings in a 52-card deck. The probability is $\\frac{4}{52}$, which simplifies to $\\frac{1}{13}$.',
                  },
                  {
                    text: '$\\frac{1}{4}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of drawing a specific suit.',
                  },
                  {
                    text: '$\\frac{4}{13}$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 11,
                calculator: true,
                passage:
                  'Points scored in 5 games: 10, 15, 12, 10, 18',
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
                  { text: '8', isCorrect: false, rationale: '8 is the range.' },
                ],
              },
              {
                questionNumber: 12,
                calculator: true,
                question:
                  'If you flip a coin twice, what is the probability of getting heads both times?',
                answerOptions: [
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of getting heads on a single flip.',
                  },
                  {
                    text: '$\\frac{1}{3}$',
                    isCorrect: false,
                    rationale:
                      'There are 4 possible outcomes (HH, HT, TH, TT).',
                  },
                  {
                    text: '$\\frac{1}{4}$',
                    isCorrect: true,
                    rationale:
                      'The probability of the first heads is $\\frac{1}{2}$. The probability of the second is $\\frac{1}{2}$. The combined probability is $\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}$.',
                  },
                  {
                    text: '1',
                    isCorrect: false,
                    rationale: 'This would mean it is a certain outcome.',
                  },
                ],
              },
              {
                questionNumber: 13,
                calculator: true,
                passage:
                  "A student's grades are 80, 85, and 90. What grade do they need on the fourth test to have an average of 85?",
                question:
                  'What grade is needed on the fourth test for an average of 85?',
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
                      'To have an average of 85 over 4 tests, the total score must be $85 \\times 4 = 340$. The current sum is $80+85+90 = 255$. The needed score is $340 - 255 = 85$.',
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
              },
              {
                questionNumber: 14,
                calculator: true,
                question:
                  'A company has 100 employees. 60 are full-time and 40 are part-time. If an employee is selected at random, what is the probability they are part-time?',
                answerOptions: [
                  {
                    text: '$\\frac{3}{5}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of selecting a full-time employee.',
                  },
                  {
                    text: '$\\frac{2}{5}$',
                    isCorrect: true,
                    rationale:
                      'The probability is $\\frac{40}{100}$, which simplifies to $\\frac{2}{5}$.',
                  },
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: false,
                    rationale: 'This would be true if there were 50 of each.',
                  },
                  {
                    text: '$\\frac{1}{40}$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 15,
                calculator: true,
                passage:
                  'Number of daily customers: 102, 115, 98, 120, 115, 130',
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
              },
              {
                questionNumber: 16,
                calculator: true,
                passage:
                  'Final Exam Scores: 75, 80, 80, 85, 90, 95, 100',
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
              },
              {
                questionNumber: 17,
                calculator: true,
                question:
                  'A bag contains 3 red marbles, 7 blue marbles, and 5 green marbles. What is the probability of NOT drawing a blue marble?',
                answerOptions: [
                  {
                    text: '$\\frac{7}{15}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of drawing a blue marble.',
                  },
                  {
                    text: '$\\frac{8}{15}$',
                    isCorrect: true,
                    rationale:
                      'There are 15 total marbles (3+7+5). The number of non-blue marbles is 3 (red) + 5 (green) = 8. So the probability is 8/15.',
                  },
                  {
                    text: '$\\frac{1}{3}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of drawing a green marble (5/15).',
                  },
                  {
                    text: '$\\frac{1}{5}$',
                    isCorrect: false,
                    rationale:
                      'This is the probability of drawing a red marble (3/15).',
                  },
                ],
              },
              {
                questionNumber: 15,
                calculator: true,
                question:
                  'A line passes through the points (0, 2) and (3, 8). What is the slope of the line?',
                answerOptions: [
                  {
                    text: '2',
                    isCorrect: true,
                    rationale:
                      'The slope is the change in y divided by the change in x: $(8 - 2) / (3 - 0) = 6 / 3 = 2$.',
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
                    text: '$\\frac{1}{2}$',
                    isCorrect: false,
                    rationale: 'This is the reciprocal of the correct slope.',
                  },
                ],
              },
              {
                questionNumber: 16,
                calculator: true,
                question:
                  'What is the y-intercept of the equation $y = 3x - 4$?',
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
                      "In the slope-intercept form $y = mx + b$, 'b' is the y-intercept. In this case, it\\'s -4.",
                  },
                  {
                    text: '4',
                    isCorrect: false,
                    rationale: 'The y-intercept is negative.',
                  },
                  {
                    text: '$\\frac{4}{3}$',
                    isCorrect: false,
                    rationale: 'This is the x-intercept.',
                  },
                ],
              },
              {
                questionNumber: 17,
                calculator: false,
                question:
                  'If $f(x) = 2x^2 + 5x - 3$, what is the value of $f(-2)$?',
                answerOptions: [
                  {
                    text: '-5',
                    isCorrect: true,
                    rationale:
                      'Substitute -2 for x: $f(-2) = 2(-2)^2 + 5(-2) - 3 = 2(4) - 10 - 3 = 8 - 10 - 3 = -5$.',
                  },
                  {
                    text: '1',
                    isCorrect: false,
                    rationale: 'Incorrect calculation. $2(4) - 10 - 3 = -5$.',
                  },
                  {
                    text: '21',
                    isCorrect: false,
                    rationale:
                      'Incorrectly handled the negative signs. $5(-2)$ is -10.',
                  },
                  {
                    text: '-15',
                    isCorrect: false,
                    rationale:
                      'Incorrect calculation of the exponent. $(-2)^2$ is 4, not -4.',
                  },
                ],
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
                      'The area of a rectangle is length times width. $8 \\times 5 = 40$.',
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
                    rationale:
                      'This would be the area if it were a square with side 8.',
                  },
                ],
              },
              {
                questionNumber: 16,
                calculator: true,
                question:
                  'What is the circumference of a circle with a radius of 5 cm? (Use $\\pi \\approx 3.14$)',
                answerOptions: [
                  {
                    text: '15.7 cm',
                    isCorrect: false,
                    rationale: 'This is the semi-circumference ($\\pi r$).',
                  },
                  {
                    text: '31.4 cm',
                    isCorrect: true,
                    rationale:
                      'The formula for circumference is $C = 2\\pi r$. So, $C = 2 \\times 3.14 \\times 5 = 31.4$ cm.',
                  },
                  {
                    text: '78.5 sq cm',
                    isCorrect: false,
                    rationale: 'This is the area of the circle ($\\pi r^2$).',
                  },
                  {
                    text: '10 cm',
                    isCorrect: false,
                    rationale: 'This is the diameter of the circle.',
                  },
                ],
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
                      'The sum of angles in a triangle is always 180 degrees. $180 - (40 + 60) = 180 - 100 = 80$ degrees.',
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
              },
              {
                questionNumber: 18,
                calculator: true,
                question:
                  'What is the volume of a cube with a side length of 4 inches?',
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
                      'The volume of a cube is the side length cubed. $V = s^3 = 4^3 = 64$ cubic inches.',
                  },
                  {
                    text: '96 sq in',
                    isCorrect: false,
                    rationale:
                      'This is the surface area of the cube ($6 \\times s^2$).',
                  },
                ],
              },
            ],
          },
        ],
      },
      'Algebraic Problem Solving': {
        description: 'Master expressions, equations, graphing, and functions.',
        icon: 'VariableIcon', // New Icon
        topics: [
          {
            id: 'math_alg_expressions',
            title: 'Expressions & Polynomials',
            description: 'Working with variables, exponents, and polynomials.',
            type: 'quiz',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['math-4'],
                calculator: false,
                question: 'Simplify the expression: $3x + 2y - x + 5y$',
                answerOptions: [
                  {
                    text: '$2x + 7y$',
                    isCorrect: true,
                    rationale:
                      'Combine like terms: $(3x - x) + (2y + 5y) = 2x + 7y$.',
                  },
                  {
                    text: '$4x + 7y$',
                    isCorrect: false,
                    rationale: 'Incorrectly added $3x$ and $x$.',
                  },
                  {
                    text: '$2x + 3y$',
                    isCorrect: false,
                    rationale: 'Incorrectly subtracted $2y$ from $5y$.',
                  },
                  {
                    text: '$9xy$',
                    isCorrect: false,
                    rationale: 'You cannot combine $x$ and $y$ terms.',
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['math-4'],
                calculator: false,
                question:
                  'If $x = 4$, what is the value of the expression $5x - 3$?',
                answerOptions: [
                  {
                    text: '17',
                    isCorrect: true,
                    rationale:
                      'Substitute $x$ with 4: $5(4) - 3 = 20 - 3 = 17$.',
                  },
                  {
                    text: '23',
                    isCorrect: false,
                    rationale: 'This would be the result if you added 3.',
                  },
                  {
                    text: '2',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '12',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['math-4'],
                calculator: false,
                question: 'What is the result of $(2x + 3) + (x - 1)$?',
                answerOptions: [
                  {
                    text: '$3x + 2$',
                    isCorrect: true,
                    rationale:
                      'Combine like terms: $(2x + x) + (3 - 1) = 3x + 2$.',
                  },
                  {
                    text: '$2x + 2$',
                    isCorrect: false,
                    rationale: 'Forgot to add the $x$ terms correctly.',
                  },
                  {
                    text: '$3x + 4$',
                    isCorrect: false,
                    rationale: 'Incorrectly added 3 and 1.',
                  },
                  {
                    text: '$2x^2 - 2$',
                    isCorrect: false,
                    rationale:
                      'This is incorrect; this is addition, not multiplication.',
                  },
                ],
              },
              {
                questionNumber: 4,
                calculator: false,
                question: 'Which of the following is equivalent to $3(x + 5)$?',
                answerOptions: [
                  {
                    text: '$3x + 5$',
                    isCorrect: false,
                    rationale:
                      'You must distribute the 3 to both terms inside the parentheses.',
                  },
                  {
                    text: '$3x + 15$',
                    isCorrect: true,
                    rationale:
                      'Using the distributive property, $3 \\times x + 3 \\times 5 = 3x + 15$.',
                  },
                  {
                    text: '$x + 15$',
                    isCorrect: false,
                    rationale: 'Forgot to multiply the $x$ by 3.',
                  },
                  {
                    text: '$8x$',
                    isCorrect: false,
                    rationale: 'This is an incorrect simplification.',
                  },
                ],
              },
              {
                questionNumber: 5,
                calculator: false,
                question: 'Simplify: $(x^2 + 4x + 5) - (x^2 - 2x - 1)$',
                answerOptions: [
                  {
                    text: '$2x^2 + 2x + 4$',
                    isCorrect: false,
                    rationale: 'Incorrectly added the $x^2$ terms.',
                  },
                  {
                    text: '$6x + 6$',
                    isCorrect: true,
                    rationale:
                      'Distribute the negative: $x^2 + 4x + 5 - x^2 + 2x + 1$. Combine like terms: $(x^2-x^2) + (4x+2x) + (5+1) = 6x + 6$.',
                  },
                  {
                    text: '$2x + 4$',
                    isCorrect: false,
                    rationale: 'Incorrectly subtracted $2x$ from $4x$.',
                  },
                  {
                    text: '$6x + 4$',
                    isCorrect: false,
                    rationale: 'Incorrectly subtracted 1 from 5.',
                  },
                ],
              },
              {
                questionNumber: 6,
                calculator: true,
                question:
                  'Evaluate the expression $2a + 3b$ if $a = 5$ and $b = -2$.',
                answerOptions: [
                  {
                    text: '16',
                    isCorrect: false,
                    rationale: 'This would be the result if $b$ were 2.',
                  },
                  {
                    text: '4',
                    isCorrect: true,
                    rationale: '$2(5) + 3(-2) = 10 - 6 = 4$.',
                  },
                  {
                    text: '10',
                    isCorrect: false,
                    rationale: 'This is just the first part of the expression.',
                  },
                  {
                    text: '1',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 7,
                calculator: true,
                question: 'What is the product of $(x + 2)(x + 3)$?',
                answerOptions: [
                  {
                    text: '$x^2 + 5x + 6$',
                    isCorrect: true,
                    rationale:
                      'Use the FOIL method: $(x \\cdot x) + (x \\cdot 3) + (2 \\cdot x) + (2 \\cdot 3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6$.',
                  },
                  {
                    text: '$x^2 + 6$',
                    isCorrect: false,
                    rationale: "Forgot the middle term (the 'OI' in FOIL).",
                  },
                  {
                    text: '$x^2 + 6x + 5$',
                    isCorrect: false,
                    rationale: 'Incorrectly added the constants.',
                  },
                  {
                    text: '$2x + 5$',
                    isCorrect: false,
                    rationale: 'This is addition, not multiplication.',
                  },
                ],
              },
              {
                questionNumber: 8,
                calculator: true,
                question: 'The expression $x^2 - 9$ is an example of:',
                answerOptions: [
                  {
                    text: 'A perfect square trinomial',
                    isCorrect: false,
                    rationale: 'A trinomial has three terms.',
                  },
                  {
                    text: 'The difference of squares',
                    isCorrect: true,
                    rationale:
                      'This is in the form $a^2 - b^2$, where $a=x$ and $b=3$. It factors to $(x-3)(x+3)$.',
                  },
                  {
                    text: 'A monomial',
                    isCorrect: false,
                    rationale: 'A monomial has one term.',
                  },
                  {
                    text: 'A cubic expression',
                    isCorrect: false,
                    rationale: 'A cubic expression has a degree of 3.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: true,
                question: 'Factor the expression: $x^2 + 7x + 12$',
                answerOptions: [
                  {
                    text: '$(x + 6)(x + 2)$',
                    isCorrect: false,
                    rationale: '$6 \\times 2 = 12$, but $6 + 2 = 8$, not 7.',
                  },
                  {
                    text: '$(x + 3)(x + 4)$',
                    isCorrect: true,
                    rationale:
                      'You need two numbers that multiply to 12 and add to 7. These numbers are 3 and 4.',
                  },
                  {
                    text: '$(x + 12)(x + 1)$',
                    isCorrect: false,
                    rationale: '$12 \\times 1 = 12$, but $12 + 1 = 13$, not 7.',
                  },
                  {
                    text: '$(x - 3)(x - 4)$',
                    isCorrect: false,
                    rationale: 'This would result in $-7x$, not $+7x$.',
                  },
                ],
              },
              {
                questionNumber: 10,
                calculator: true,
                question: 'Simplify: $5(x - 2y) - 3(x + y)$',
                answerOptions: [
                  {
                    text: '$2x - 13y$',
                    isCorrect: true,
                    rationale:
                      'Distribute: $5x - 10y - 3x - 3y$. Combine like terms: $(5x - 3x) + (-10y - 3y) = 2x - 13y$.',
                  },
                  {
                    text: '$2x - 7y$',
                    isCorrect: false,
                    rationale: 'Incorrectly added $-10y$ and $3y$.',
                  },
                  {
                    text: '$8x - 13y$',
                    isCorrect: false,
                    rationale: 'Incorrectly added $5x$ and $3x$.',
                  },
                  {
                    text: '$2x + 13y$',
                    isCorrect: false,
                    rationale: 'Incorrectly handled the signs.',
                  },
                ],
              },
              {
                questionNumber: 11,
                calculator: true,
                question:
                  'What is the degree of the polynomial $4x^3 - 2x^5 + 7x - 1$?',
                answerOptions: [
                  {
                    text: '3',
                    isCorrect: false,
                    rationale: 'This is the degree of the first term.',
                  },
                  {
                    text: '5',
                    isCorrect: true,
                    rationale:
                      'The degree of a polynomial is the highest exponent of its terms, which is 5.',
                  },
                  {
                    text: '4',
                    isCorrect: false,
                    rationale: 'This is the number of terms.',
                  },
                  {
                    text: '1',
                    isCorrect: false,
                    rationale: 'This is the degree of the third term.',
                  },
                ],
              },
              {
                questionNumber: 12,
                calculator: true,
                question: 'If $y = -3$, what is the value of $y^2 + 2y - 1$?',
                answerOptions: [
                  {
                    text: '-16',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '2',
                    isCorrect: true,
                    rationale: '$(-3)^2 + 2(-3) - 1 = 9 - 6 - 1 = 2$.',
                  },
                  {
                    text: '4',
                    isCorrect: false,
                    rationale: 'This is a calculation error.',
                  },
                  {
                    text: '-4',
                    isCorrect: false,
                    rationale: 'Incorrectly calculated $(-3)^2$ as -9.',
                  },
                ],
              },
              {
                questionNumber: 13,
                calculator: true,
                question:
                  "Which expression represents '5 less than twice a number n'?",
                answerOptions: [
                  {
                    text: '$5 - 2n$',
                    isCorrect: false,
                    rationale: "This is '5 minus twice a number'.",
                  },
                  {
                    text: '$2n - 5$',
                    isCorrect: true,
                    rationale:
                      "'Twice a number n' is $2n$, and '5 less than' means you subtract 5 from that.",
                  },
                  {
                    text: '$2(n - 5)$',
                    isCorrect: false,
                    rationale:
                      "This is 'twice the difference of a number and 5'.",
                  },
                  {
                    text: '$n - 5$',
                    isCorrect: false,
                    rationale: "This is '5 less than a number'.",
                  },
                ],
              },
              {
                questionNumber: 14,
                calculator: true,
                question: 'Expand the expression: $(2x - 1)^2$',
                answerOptions: [
                  {
                    text: '$4x^2 - 1$',
                    isCorrect: false,
                    rationale:
                      'Incorrectly squared each term. You must use FOIL: $(2x-1)(2x-1)$.',
                  },
                  {
                    text: '$4x^2 + 1$',
                    isCorrect: false,
                    rationale: 'Incorrectly squared each term.',
                  },
                  {
                    text: '$4x^2 - 4x + 1$',
                    isCorrect: true,
                    rationale:
                      '$(2x - 1)(2x - 1) = 4x^2 - 2x - 2x + 1 = 4x^2 - 4x + 1$.',
                  },
                  {
                    text: '$2x^2 - 4x + 1$',
                    isCorrect: false,
                    rationale: 'Incorrectly squared $2x$.',
                  },
                ],
              },
              {
                questionNumber: 15,
                calculator: true,
                question: 'Simplify the expression: $(8x^6) / (2x^3)$',
                answerOptions: [
                  {
                    text: '$4x^2$',
                    isCorrect: false,
                    rationale:
                      'When dividing powers with the same base, you subtract the exponents.',
                  },
                  {
                    text: '$6x^3$',
                    isCorrect: false,
                    rationale: 'Incorrectly subtracted the coefficients.',
                  },
                  {
                    text: '$4x^3$',
                    isCorrect: true,
                    rationale:
                      'Divide the coefficients ($8/2 = 4$) and subtract the exponents ($6-3 = 3$).',
                  },
                  {
                    text: '$4x^9$',
                    isCorrect: false,
                    rationale: 'Incorrectly added the exponents.',
                  },
                ],
              },
            ],
          },
          {
            id: 'math_alg_equations_inequalities',
            title: 'Equations & Inequalities',
            description:
              'Solving linear and quadratic equations and inequalities.',
            type: 'quiz',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['math-2', 'math-3'],
                calculator: false,
                question: 'Solve for x: $3x + 7 = 19$',
                answerOptions: [
                  {
                    text: '$x = 4$',
                    isCorrect: true,
                    rationale:
                      'Subtract 7 from both sides: $3x = 12$. Divide by 3: $x = 4$.',
                  },
                  {
                    text: '$x = 8.7$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x = 3$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x = 12$',
                    isCorrect: false,
                    rationale: 'This is the value of $3x$, not $x$.',
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['math-2', 'math-3'],
                calculator: false,
                question:
                  'What is the solution to the inequality $2x - 5 > 11$?',
                answerOptions: [
                  {
                    text: '$x < 8$',
                    isCorrect: false,
                    rationale: 'The inequality sign should not be reversed.',
                  },
                  {
                    text: '$x > 8$',
                    isCorrect: true,
                    rationale:
                      'Add 5 to both sides: $2x > 16$. Divide by 2: $x > 8$.',
                  },
                  {
                    text: '$x > 3$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x < 3$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['math-2', 'math-3'],
                calculator: false,
                question: 'Solve for y: $5y - 8 = 2y + 7$',
                answerOptions: [
                  {
                    text: '$y = 3$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$y = 5$',
                    isCorrect: true,
                    rationale:
                      'Subtract $2y$ from both sides: $3y - 8 = 7$. Add 8 to both sides: $3y = 15$. Divide by 3: $y = 5$.',
                  },
                  {
                    text: '$y = -1/3$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$y = 15$',
                    isCorrect: false,
                    rationale: 'This is the value of $3y$, not $y$.',
                  },
                ],
              },
              {
                questionNumber: 4,
                calculator: false,
                question:
                  'Which of the following is a solution to the equation $x^2 - 5x + 6 = 0$?',
                answerOptions: [
                  {
                    text: '$x = 1$',
                    isCorrect: false,
                    rationale: '$1^2 - 5(1) + 6 = 1 - 5 + 6 = 2$, not 0.',
                  },
                  {
                    text: '$x = 2$',
                    isCorrect: true,
                    rationale:
                      'The equation factors to $(x-2)(x-3) = 0$. The solutions are $x=2$ and $x=3$.',
                  },
                  {
                    text: '$x = 5$',
                    isCorrect: false,
                    rationale: '$5^2 - 5(5) + 6 = 25 - 25 + 6 = 6$, not 0.',
                  },
                  {
                    text: '$x = 6$',
                    isCorrect: false,
                    rationale: '$6^2 - 5(6) + 6 = 36 - 30 + 6 = 12$, not 0.',
                  },
                ],
              },
              {
                questionNumber: 5,
                calculator: false,
                question: 'Solve for x: $x/4 + 2 = 5$',
                answerOptions: [
                  {
                    text: '$x = 12$',
                    isCorrect: true,
                    rationale:
                      'Subtract 2 from both sides: $x/4 = 3$. Multiply by 4: $x = 12$.',
                  },
                  {
                    text: '$x = 28$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x = 3$',
                    isCorrect: false,
                    rationale: 'This is the value of $x/4$, not $x$.',
                  },
                  {
                    text: '$x = 7$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 6,
                calculator: true,
                question: 'Solve the inequality: $-3x + 4 \\le 16$',
                answerOptions: [
                  {
                    text: '$x \\le -4$',
                    isCorrect: false,
                    rationale:
                      'When dividing by a negative number, you must flip the inequality sign.',
                  },
                  {
                    text: '$x \\ge -4$',
                    isCorrect: true,
                    rationale:
                      'Subtract 4: $-3x \\le 12$. Divide by -3 and flip the sign: $x \\ge -4$.',
                  },
                  {
                    text: '$x \\ge 4$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x \\le 4$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 7,
                calculator: true,
                question:
                  'The sum of two consecutive integers is 35. What are the integers?',
                answerOptions: [
                  {
                    text: '15 and 20',
                    isCorrect: false,
                    rationale: 'These are not consecutive.',
                  },
                  {
                    text: '17 and 18',
                    isCorrect: true,
                    rationale:
                      'Let the integers be $x$ and $x+1$. So, $x + (x+1) = 35$. $2x + 1 = 35$. $2x = 34$. $x = 17$. The integers are 17 and 18.',
                  },
                  {
                    text: '16 and 19',
                    isCorrect: false,
                    rationale: 'These are not consecutive.',
                  },
                  {
                    text: '10 and 25',
                    isCorrect: false,
                    rationale: 'These are not consecutive.',
                  },
                ],
              },
              {
                questionNumber: 8,
                challenge_tags: ['math-5'],
                calculator: true,
                question:
                  'Solve for b: $A = \\frac{1}{2}bh$ (the formula for the area of a triangle)',
                answerOptions: [
                  {
                    text: '$b = \\frac{2A}{h}$',
                    isCorrect: true,
                    rationale:
                      'Multiply both sides by 2: $2A = bh$. Divide both sides by h: $b = \\frac{2A}{h}$.',
                  },
                  {
                    text: '$b = \\frac{A}{2h}$',
                    isCorrect: false,
                    rationale: 'Forgot to multiply by 2.',
                  },
                  {
                    text: '$b = \\frac{Ah}{2}$',
                    isCorrect: false,
                    rationale: 'Incorrectly rearranged the formula.',
                  },
                  {
                    text: '$b = \\frac{2h}{A}$',
                    isCorrect: false,
                    rationale: 'Incorrectly rearranged the formula.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: true,
                question:
                  'What are the solutions to the quadratic equation $x^2 - 16 = 0$?',
                answerOptions: [
                  {
                    text: '$x = 4$',
                    isCorrect: false,
                    rationale: 'This is only one of the solutions.',
                  },
                  {
                    text: '$x = 4$ and $x = -4$',
                    isCorrect: true,
                    rationale:
                      'Add 16 to both sides: $x^2 = 16$. Take the square root of both sides: $x = \\pm 4$.',
                  },
                  {
                    text: '$x = 8$ and $x = -8$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x = 16$',
                    isCorrect: false,
                    rationale: 'This is the value of $x^2$.',
                  },
                ],
              },
              {
                questionNumber: 10,
                calculator: true,
                question: 'Solve for x: $2(x + 3) = 14$',
                answerOptions: [
                  {
                    text: '$x = 4$',
                    isCorrect: true,
                    rationale:
                      'Distribute the 2: $2x + 6 = 14$. Subtract 6: $2x = 8$. Divide by 2: $x = 4$.',
                  },
                  {
                    text: '$x = 5.5$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x = 11$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x = 8$',
                    isCorrect: false,
                    rationale: 'This is the value of $2x$.',
                  },
                ],
              },
              {
                questionNumber: 11,
                calculator: true,
                question:
                  'A number is doubled and then 5 is subtracted from it. The result is 15. What is the number?',
                answerOptions: [
                  {
                    text: '5',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '10',
                    isCorrect: true,
                    rationale:
                      'Let the number be $x$. The equation is $2x - 5 = 15$. Add 5 to both sides: $2x = 20$. Divide by 2: $x = 10$.',
                  },
                  {
                    text: '12.5',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '20',
                    isCorrect: false,
                    rationale: 'This is the value of $2x$.',
                  },
                ],
              },
              {
                questionNumber: 12,
                calculator: true,
                question:
                  "Which inequality represents the statement 'x is at least 18'?",
                answerOptions: [
                  {
                    text: '$x < 18$',
                    isCorrect: false,
                    rationale: "This means 'x is less than 18'.",
                  },
                  {
                    text: '$x > 18$',
                    isCorrect: false,
                    rationale: "This means 'x is greater than 18'.",
                  },
                  {
                    text: '$x \\le 18$',
                    isCorrect: false,
                    rationale: "This means 'x is at most 18'.",
                  },
                  {
                    text: '$x \\ge 18$',
                    isCorrect: true,
                    rationale:
                      "'At least 18' means 18 or more, which is represented by the greater than or equal to symbol.",
                  },
                ],
              },
              {
                questionNumber: 13,
                challenge_tags: ['math-2'],
                calculator: true,
                question:
                  'Solve the system of equations: $x + y = 10$ and $x - y = 4$',
                answerOptions: [
                  {
                    text: '$x = 7, y = 3$',
                    isCorrect: true,
                    rationale:
                      'Add the two equations together: $(x+y) + (x-y) = 10+4$, which simplifies to $2x = 14$, so $x=7$. Substitute $x=7$ into the first equation: $7 + y = 10$, so $y=3$.',
                  },
                  {
                    text: '$x = 6, y = 4$',
                    isCorrect: false,
                    rationale: 'This does not satisfy the second equation.',
                  },
                  {
                    text: '$x = 8, y = 2$',
                    isCorrect: false,
                    rationale: 'This does not satisfy the second equation.',
                  },
                  {
                    text: '$x = 5, y = 5$',
                    isCorrect: false,
                    rationale: 'This does not satisfy the second equation.',
                  },
                ],
              },
              {
                questionNumber: 14,
                calculator: true,
                question: 'Solve for x: $3(x - 4) = 2(x + 1)$',
                answerOptions: [
                  {
                    text: '$x = 10$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x = 14$',
                    isCorrect: true,
                    rationale:
                      'Distribute: $3x - 12 = 2x + 2$. Subtract $2x$ from both sides: $x - 12 = 2$. Add 12 to both sides: $x = 14$.',
                  },
                  {
                    text: '$x = -13$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$x = 5$',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 15,
                challenge_tags: ['math-5'],
                calculator: true,
                question:
                  'The length of a rectangle is 5 more than its width. If the perimeter is 50, what is the width?',
                answerOptions: [
                  {
                    text: '10',
                    isCorrect: true,
                    rationale:
                      'Let $w$ be the width and $l$ be the length. $l = w + 5$. Perimeter $P = 2l + 2w$. Substitute: $50 = 2(w+5) + 2w$. $50 = 2w + 10 + 2w$. $50 = 4w + 10$. $40 = 4w$. $w = 10$.',
                  },
                  {
                    text: '15',
                    isCorrect: false,
                    rationale: '15 is the length, not the width.',
                  },
                  {
                    text: '20',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '25',
                    isCorrect: false,
                    rationale: 'This is half the perimeter.',
                  },
                ],
              },
            ],
          },
          {
            id: 'math_alg_graphing_functions',
            title: 'Graphing & Functions',
            description:
              'Understanding slope, graphing lines, and function notation.',
            type: 'quiz',
            questions: [
              {
                questionNumber: 1,
                calculator: false,
                type: 'image',
                imageUrl: 'Images/Math/math_graph_1.png',
                question: 'What is the slope of the line shown in the graph?',
                answerOptions: [
                  {
                    text: '2',
                    isCorrect: true,
                    rationale:
                      'The line passes through $(0,-1)$ and $(2,3)$. The slope is $(y_2 - y_1) / (x_2 - x_1) = (3 - (-1)) / (2 - 0) = 4 / 2 = 2$.',
                  },
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: false,
                    rationale: 'This is run/rise, not rise/run.',
                  },
                  {
                    text: '-2',
                    isCorrect: false,
                    rationale: 'The line is rising, so the slope is positive.',
                  },
                  {
                    text: '1',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 2,
                calculator: false,
                type: 'image',
                imageUrl: 'Images/Math/math_graph_1.png',
                question:
                  'What is the y-intercept of the line shown in the graph?',
                answerOptions: [
                  {
                    text: '$(2, 0)$',
                    isCorrect: false,
                    rationale: 'This is the x-intercept.',
                  },
                  {
                    text: '$(0, -1)$',
                    isCorrect: true,
                    rationale:
                      'The y-intercept is the point where the line crosses the y-axis, which is at $(0, -1)$.',
                  },
                  {
                    text: '$(0, 2)$',
                    isCorrect: false,
                    rationale: 'This is an incorrect point.',
                  },
                  {
                    text: '$(-1, 0)$',
                    isCorrect: false,
                    rationale: 'This is an incorrect point.',
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['math-2'],
                calculator: false,
                question:
                  'Which of the following equations is written in slope-intercept form ($y = mx + b$)?',
                answerOptions: [
                  {
                    text: '$y = 3x - 2$',
                    isCorrect: true,
                    rationale:
                      'This equation is in the form $y = mx + b$, where $m$ is the slope and $b$ is the y-intercept.',
                  },
                  {
                    text: '$2x + 3y = 6$',
                    isCorrect: false,
                    rationale:
                      'This is the standard form of a linear equation.',
                  },
                  {
                    text: '$y - 4 = 2(x - 1)$',
                    isCorrect: false,
                    rationale: 'This is the point-slope form.',
                  },
                  {
                    text: '$x = 5$',
                    isCorrect: false,
                    rationale: 'This is the equation of a vertical line.',
                  },
                ],
              },
              {
                questionNumber: 4,
                calculator: false,
                question: 'If $f(x) = 3x + 5$, what is $f(4)$?',
                answerOptions: [
                  {
                    text: '12',
                    isCorrect: false,
                    rationale: 'This is just $3 \\times 4$.',
                  },
                  {
                    text: '17',
                    isCorrect: true,
                    rationale:
                      'Substitute $x$ with 4: $f(4) = 3(4) + 5 = 12 + 5 = 17$.',
                  },
                  {
                    text: '23',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '8',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 5,
                calculator: false,
                question:
                  'What is the slope of the line with the equation $y = -2x + 7$?',
                answerOptions: [
                  {
                    text: '7',
                    isCorrect: false,
                    rationale: '7 is the y-intercept.',
                  },
                  {
                    text: '-2',
                    isCorrect: true,
                    rationale:
                      'In the form $y = mx + b$, $m$ represents the slope. Here, $m = -2$.',
                  },
                  {
                    text: '2',
                    isCorrect: false,
                    rationale: 'The slope is negative.',
                  },
                  {
                    text: '-7',
                    isCorrect: false,
                    rationale: 'This is an incorrect value.',
                  },
                ],
              },
              {
                questionNumber: 6,
                calculator: true,
                question:
                  'Find the slope of the line that passes through the points $(2, 3)$ and $(5, 9)$.',
                answerOptions: [
                  {
                    text: '2',
                    isCorrect: true,
                    rationale:
                      'The slope formula is $(y_2 - y_1) / (x_2 - x_1)$. $(9 - 3) / (5 - 2) = 6 / 3 = 2$.',
                  },
                  {
                    text: '$\\frac{1}{2}$',
                    isCorrect: false,
                    rationale: 'This is the reciprocal of the correct slope.',
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
                ],
              },
              {
                questionNumber: 7,
                calculator: true,
                question:
                  'Consider four points on a coordinate plane: A (-3, 4), B (4, -2), C (-5, -3), and D (2, 5). Which point is located in Quadrant IV?',
                answerOptions: [
                  {
                    text: 'Point A',
                    isCorrect: false,
                    rationale:
                      'Point A is in Quadrant II (x is negative, y is positive).',
                  },
                  {
                    text: 'Point B',
                    isCorrect: true,
                    rationale:
                      'Point B is in Quadrant IV (x is positive, y is negative).',
                  },
                  {
                    text: 'Point C',
                    isCorrect: false,
                    rationale:
                      'Point C is in Quadrant III (x is negative, y is negative).',
                  },
                  {
                    text: 'Point D',
                    isCorrect: false,
                    rationale:
                      'Point D is in Quadrant I (x is positive, y is positive).',
                  },
                ],
              },
              {
                questionNumber: 8,
                calculator: true,
                question:
                  'If a line has a slope of 3 and passes through the point $(1, 2)$, what is its equation in point-slope form?',
                answerOptions: [
                  {
                    text: '$y - 2 = 3(x - 1)$',
                    isCorrect: true,
                    rationale:
                      'Point-slope form is $y - y_1 = m(x - x_1)$. Substituting the values gives $y - 2 = 3(x - 1)$.',
                  },
                  {
                    text: '$y - 1 = 3(x - 2)$',
                    isCorrect: false,
                    rationale: 'The x and y coordinates are swapped.',
                  },
                  {
                    text: '$y = 3x - 1$',
                    isCorrect: false,
                    rationale:
                      'This is the slope-intercept form, which would be $y-2=3x-3 -> y=3x-1$.',
                  },
                  {
                    text: '$y + 2 = 3(x + 1)$',
                    isCorrect: false,
                    rationale: 'The signs are incorrect.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: true,
                question:
                  'What is the y-intercept of the line with the equation $4x + 2y = 10$?',
                answerOptions: [
                  {
                    text: '10',
                    isCorrect: false,
                    rationale: 'You must first solve for y.',
                  },
                  {
                    text: '5',
                    isCorrect: true,
                    rationale:
                      'First, convert to slope-intercept form. $2y = -4x + 10$. $y = -2x + 5$. The y-intercept (b) is 5.',
                  },
                  {
                    text: '-2',
                    isCorrect: false,
                    rationale: '-2 is the slope.',
                  },
                  {
                    text: '2.5',
                    isCorrect: false,
                    rationale: 'This is the x-intercept.',
                  },
                ],
              },
              {
                questionNumber: 10,
                calculator: true,
                question: 'If $g(x) = x^2 - 10$, what is $g(3)$?',
                answerOptions: [
                  {
                    text: '-1',
                    isCorrect: true,
                    rationale: '$g(3) = (3)^2 - 10 = 9 - 10 = -1$.',
                  },
                  {
                    text: '-4',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '19',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '8',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 11,
                challenge_tags: ['science-1'],
                calculator: true,
                type: 'image',
                imageUrl: 'Images/Math/math_graph_3.png',
                question:
                  'The graph shows the cost of renting a car based on the number of miles driven. What does the y-intercept of the graph represent?',
                answerOptions: [
                  {
                    text: 'The cost per mile.',
                    isCorrect: false,
                    rationale: 'The cost per mile is the slope of the line.',
                  },
                  {
                    text: 'The flat fee or initial cost of the rental.',
                    isCorrect: true,
                    rationale:
                      'The y-intercept represents the cost when the miles driven (x) is zero, which is the base rental fee.',
                  },
                  {
                    text: 'The total cost of the rental.',
                    isCorrect: false,
                    rationale: 'The total cost depends on the miles driven.',
                  },
                  {
                    text: 'The maximum number of miles you can drive.',
                    isCorrect: false,
                    rationale: 'The graph does not show a maximum.',
                  },
                ],
              },
              {
                questionNumber: 12,
                calculator: true,
                question:
                  'Which of the following lines is parallel to the line $y = 4x - 1$?',
                answerOptions: [
                  {
                    text: '$y = -4x + 2$',
                    isCorrect: false,
                    rationale: 'This line has a different slope.',
                  },
                  {
                    text: '$y = 4x + 5$',
                    isCorrect: true,
                    rationale:
                      'Parallel lines have the same slope. Both lines have a slope of 4.',
                  },
                  {
                    text: '$y = (1/4)x + 3$',
                    isCorrect: false,
                    rationale: 'This slope is the reciprocal, not the same.',
                  },
                  {
                    text: '$y = - (1/4)x - 1$',
                    isCorrect: false,
                    rationale: 'This is the slope of a perpendicular line.',
                  },
                ],
              },
              {
                questionNumber: 13,
                calculator: true,
                question:
                  "The function $C(t) = 20t + 50$ represents the cost of a plumber's visit, where $t$ is the number of hours. What is the cost of a 3-hour visit?",
                answerOptions: [
                  {
                    text: '$70',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '$110',
                    isCorrect: true,
                    rationale: '$C(3) = 20(3) + 50 = 60 + 50 = \\$110$.',
                  },
                  {
                    text: '$60',
                    isCorrect: false,
                    rationale: 'This is just the hourly charge for 3 hours.',
                  },
                  {
                    text: '$50',
                    isCorrect: false,
                    rationale: 'This is the flat fee.',
                  },
                ],
              },
              {
                questionNumber: 14,
                calculator: true,
                question: 'What is the x-intercept of the line $3x + 6y = 18$?',
                answerOptions: [
                  {
                    text: '3',
                    isCorrect: false,
                    rationale: '3 is the y-intercept.',
                  },
                  {
                    text: '6',
                    isCorrect: true,
                    rationale:
                      'To find the x-intercept, set $y = 0$. $3x + 6(0) = 18$. $3x = 18$. $x = 6$. The point is $(6,0)$.',
                  },
                  {
                    text: '2',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '18',
                    isCorrect: false,
                    rationale: 'This is the constant in the equation.',
                  },
                ],
              },
              {
                questionNumber: 15,
                calculator: true,
                type: 'image',
                imageUrl: 'Images/Math/math_graph_4.png',
                question:
                  'The graph shows a parabola. What are the coordinates of the vertex?',
                answerOptions: [
                  {
                    text: '$(0, 4)$',
                    isCorrect: false,
                    rationale: 'This is the y-intercept.',
                  },
                  {
                    text: '$(2, 0)$',
                    isCorrect: false,
                    rationale: 'This is one of the x-intercepts.',
                  },
                  {
                    text: '$(3, -2)$',
                    isCorrect: true,
                    rationale:
                      'The vertex is the lowest point of the parabola, which is at $(3, -2)$.',
                  },
                  {
                    text: '$(-2, 3)$',
                    isCorrect: false,
                    rationale: 'This point is not on the graph.',
                  },
                ],
              },
            ],
          },
        ],
      },
      Geometry: {
        description:
          'Calculate area, perimeter, volume, and apply geometric theorems.',
        icon: 'ShapesIcon', // New Icon
        topics: [
          {
            id: 'math_geom_basics',
            title: 'Geometry Basics',
            description:
              'Calculating area, perimeter, volume, and surface area.',
            type: 'quiz',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['math-5'],
                calculator: false,
                type: 'image',
                imageUrl: 'Images/Math/math_geo_1.png',
                question: 'What is the area of the rectangle shown?',
                answerOptions: [
                  {
                    text: '15 sq units',
                    isCorrect: false,
                    rationale: 'This is the perimeter.',
                  },
                  {
                    text: '50 sq units',
                    isCorrect: true,
                    rationale:
                      'Area of a rectangle is length times width. $A = 10 \\times 5 = 50$.',
                  },
                  {
                    text: '25 sq units',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '30 sq units',
                    isCorrect: false,
                    rationale: 'This is the perimeter.',
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['math-5'],
                calculator: false,
                type: 'image',
                imageUrl: 'Images/Math/math_geo_2.png',
                question: 'What is the area of the triangle shown?',
                answerOptions: [
                  {
                    text: '24 sq units',
                    isCorrect: true,
                    rationale:
                      'Area of a triangle is $\\frac{1}{2} \\times base \\times height$. $A = 0.5 \\times 8 \\times 6 = 24$.',
                  },
                  {
                    text: '48 sq units',
                    isCorrect: false,
                    rationale:
                      'This is base times height, without multiplying by $\\frac{1}{2}$.',
                  },
                  {
                    text: '14 sq units',
                    isCorrect: false,
                    rationale: 'This is the sum of the base and height.',
                  },
                  {
                    text: '30 sq units',
                    isCorrect: false,
                    rationale: 'This is the perimeter of a 6-8-10 triangle.',
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['math-5'],
                calculator: false,
                type: 'image',
                imageUrl: 'Images/Math/math_geo_3.png',
                question:
                  'What is the circumference of the circle shown? (Use $\\pi \\approx 3.14$)',
                answerOptions: [
                  {
                    text: '15.7',
                    isCorrect: false,
                    rationale:
                      'This is the circumference if 5 were the diameter.',
                  },
                  {
                    text: '31.4',
                    isCorrect: true,
                    rationale:
                      'Circumference is $2 \\pi r$. $C = 2 \\times 3.14 \\times 5 = 31.4$.',
                  },
                  {
                    text: '78.5',
                    isCorrect: false,
                    rationale: 'This is the area of the circle.',
                  },
                  {
                    text: '25',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 4,
                challenge_tags: ['math-5'],
                calculator: false,
                question:
                  'A box has a length of 6 inches, a width of 4 inches, and a height of 3 inches. What is its volume?',
                answerOptions: [
                  {
                    text: '13 cubic inches',
                    isCorrect: false,
                    rationale: 'This is the sum of the dimensions.',
                  },
                  {
                    text: '72 cubic inches',
                    isCorrect: true,
                    rationale:
                      'Volume of a rectangular prism is length $\\times$ width $\\times$ height. $V = 6 \\times 4 \\times 3 = 72$.',
                  },
                  {
                    text: '24 cubic inches',
                    isCorrect: false,
                    rationale: 'This is just length times width.',
                  },
                  {
                    text: '54 cubic inches',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 5,
                challenge_tags: ['math-5'],
                calculator: false,
                question:
                  'What is the perimeter of a square with a side length of 7 cm?',
                answerOptions: [
                  {
                    text: '14 cm',
                    isCorrect: false,
                    rationale: 'This is twice the side length.',
                  },
                  {
                    text: '28 cm',
                    isCorrect: true,
                    rationale:
                      'Perimeter of a square is $4s$. $P = 4 \\times 7 = 28$.',
                  },
                  {
                    text: '49 cm',
                    isCorrect: false,
                    rationale: 'This is the area of the square ($s^2$).',
                  },
                  {
                    text: '21 cm',
                    isCorrect: false,
                    rationale: 'This is three times the side length.',
                  },
                ],
              },
              {
                questionNumber: 6,
                calculator: true,
                question:
                  'A cylinder has a radius of 3 meters and a height of 10 meters. What is its volume? (Use $\\pi \\approx 3.14$)',
                answerOptions: [
                  {
                    text: '94.2 cubic meters',
                    isCorrect: false,
                    rationale: 'This is the lateral surface area.',
                  },
                  {
                    text: '282.6 cubic meters',
                    isCorrect: true,
                    rationale:
                      'Volume of a cylinder is $\\pi r^2 h$. $V = 3.14 \\times (3^2) \\times 10 = 3.14 \\times 9 \\times 10 = 282.6$.',
                  },
                  {
                    text: '90 cubic meters',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '314 cubic meters',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 7,
                challenge_tags: ['math-5'],
                calculator: true,
                question:
                  'The perimeter of a rectangle is 30 feet. If the width is 5 feet, what is the length?',
                answerOptions: [
                  {
                    text: '10 feet',
                    isCorrect: true,
                    rationale:
                      'Perimeter $P = 2l + 2w$. $30 = 2l + 2(5)$. $30 = 2l + 10$. $20 = 2l$. $l = 10$.',
                  },
                  {
                    text: '12.5 feet',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '15 feet',
                    isCorrect: false,
                    rationale: 'This is half the perimeter.',
                  },
                  {
                    text: '20 feet',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 8,
                challenge_tags: ['math-5'],
                calculator: true,
                question:
                  'What is the area of a circle with a diameter of 10 inches? (Use $\\pi \\approx 3.14$)',
                answerOptions: [
                  {
                    text: '31.4 sq inches',
                    isCorrect: false,
                    rationale: 'This is the circumference.',
                  },
                  {
                    text: '78.5 sq inches',
                    isCorrect: true,
                    rationale:
                      'The diameter is 10, so the radius is 5. Area is $\\pi r^2$. $A = 3.14 \\times 5^2 = 3.14 \\times 25 = 78.5$.',
                  },
                  {
                    text: '100 sq inches',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '314 sq inches',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: true,
                question:
                  'Find the volume of a sphere with a radius of 3 cm. (Use $\\pi \\approx 3.14$ and formula $V = \\frac{4}{3}\\pi r^3$)',
                answerOptions: [
                  {
                    text: '37.68 cubic cm',
                    isCorrect: false,
                    rationale: 'This is the surface area.',
                  },
                  {
                    text: '113.04 cubic cm',
                    isCorrect: true,
                    rationale:
                      '$V = \\frac{4}{3} \\times 3.14 \\times (3^3) = \\frac{4}{3} \\times 3.14 \\times 27 = 4 \\times 3.14 \\times 9 = 113.04$.',
                  },
                  {
                    text: '84.78 cubic cm',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '28.26 cubic cm',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 10,
                calculator: true,
                question:
                  'A right triangle has legs of length 5 and 12. What is the length of the hypotenuse?',
                answerOptions: [
                  {
                    text: '13',
                    isCorrect: true,
                    rationale:
                      'Using the Pythagorean theorem, $a^2 + b^2 = c^2$. $5^2 + 12^2 = 25 + 144 = 169$. The square root of 169 is 13.',
                  },
                  {
                    text: '17',
                    isCorrect: false,
                    rationale: 'This is the sum of the lengths.',
                  },
                  {
                    text: '7',
                    isCorrect: false,
                    rationale: 'This is the difference of the lengths.',
                  },
                  {
                    text: '60',
                    isCorrect: false,
                    rationale: 'This is the product of the lengths.',
                  },
                ],
              },
              {
                questionNumber: 11,
                challenge_tags: ['math-5'],
                calculator: true,
                question:
                  'What is the surface area of a cube with a side length of 4 inches?',
                answerOptions: [
                  {
                    text: '64 sq inches',
                    isCorrect: false,
                    rationale: 'This is the volume of the cube.',
                  },
                  {
                    text: '96 sq inches',
                    isCorrect: true,
                    rationale:
                      'A cube has 6 faces. The area of one face is $4 \\times 4 = 16$. The total surface area is $6 \\times 16 = 96$.',
                  },
                  {
                    text: '16 sq inches',
                    isCorrect: false,
                    rationale: 'This is the area of one face.',
                  },
                  {
                    text: '32 sq inches',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 12,
                challenge_tags: ['math-5'],
                calculator: true,
                question:
                  'A triangle has an area of 30 square meters. If its base is 10 meters, what is its height?',
                answerOptions: [
                  {
                    text: '3 meters',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '6 meters',
                    isCorrect: true,
                    rationale:
                      'Area = $\\frac{1}{2}bh$. $30 = \\frac{1}{2}(10)h$. $30 = 5h$. $h = 6$.',
                  },
                  {
                    text: '15 meters',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '300 meters',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 13,
                calculator: true,
                question:
                  'The circumference of a circle is 18.84 cm. What is its radius? (Use $\\pi \\approx 3.14$)',
                answerOptions: [
                  {
                    text: '3 cm',
                    isCorrect: true,
                    rationale:
                      '$C = 2 \\pi r$. $18.84 = 2 \\times 3.14 \\times r$. $18.84 = 6.28r$. $r = 18.84 / 6.28 = 3$.',
                  },
                  {
                    text: '6 cm',
                    isCorrect: false,
                    rationale: '6 is the diameter.',
                  },
                  {
                    text: '9.42 cm',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                  {
                    text: '12 cm',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 14,
                challenge_tags: ['math-5'],
                calculator: true,
                question:
                  'A parallelogram has a base of 12 inches and a height of 5 inches. What is its area?',
                answerOptions: [
                  {
                    text: '17 sq inches',
                    isCorrect: false,
                    rationale: 'This is the sum of the base and height.',
                  },
                  {
                    text: '60 sq inches',
                    isCorrect: true,
                    rationale:
                      'Area of a parallelogram is base $\\times$ height. $A = 12 \\times 5 = 60$.',
                  },
                  {
                    text: '30 sq inches',
                    isCorrect: false,
                    rationale: 'This would be the area if it were a triangle.',
                  },
                  {
                    text: '34 sq inches',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
              {
                questionNumber: 15,
                calculator: true,
                question:
                  'A trapezoid has bases of length 8 and 12, and a height of 6. What is its area?',
                answerOptions: [
                  {
                    text: '60',
                    isCorrect: true,
                    rationale:
                      'Area of a trapezoid is $\\frac{1}{2}h(b_1 + b_2)$. $A = 0.5 \\times 6 \\times (8 + 12) = 3 \\times 20 = 60$.',
                  },
                  {
                    text: '120',
                    isCorrect: false,
                    rationale: 'Forgot to multiply by $\\frac{1}{2}$.',
                  },
                  {
                    text: '26',
                    isCorrect: false,
                    rationale: 'This is the sum of the dimensions.',
                  },
                  {
                    text: '576',
                    isCorrect: false,
                    rationale: 'This is an incorrect calculation.',
                  },
                ],
              },
            ],
          },
        ],
      },
      'Functions & Relations': {
        description:
          'Identify and analyze functions using tables, graphs, and scenarios.',
        icon: 'TableCellsIcon', // New Icon
        topics: [
          {
            id: 'math_functions_identify_tables',
            title: 'Identify Functions from Tables',
            description:
              'Determine if a table of x/y values represents a function.',
            type: 'quiz',
            questions: [
              {
                questionNumber: 1,
                calculator: false,
                question: `Does the following table represent a function?

<table class="function-table"><tbody><tr><th>x</th><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><th>y</th><td>5</td><td>7</td><td>9</td><td>11</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'Each x-value maps to exactly one y-value. No x-value repeats with different y-values.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale:
                      'This table IS a function because each input has only one output.',
                  },
                  {
                    text: 'Cannot be determined',
                    isCorrect: false,
                    rationale:
                      'We can determine this is a function by checking if any x-value repeats.',
                  },
                  {
                    text: 'Only if x and y are positive',
                    isCorrect: false,
                    rationale:
                      'Functions work with any real numbers, not just positive values.',
                  },
                ],
              },
              {
                questionNumber: 2,
                calculator: false,
                question: `Does the following table represent a function?

<table class="function-table"><tbody><tr><th>x</th><td>2</td><td>2</td><td>3</td><td>4</td></tr><tr><th>y</th><td>6</td><td>8</td><td>9</td><td>10</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: false,
                    rationale:
                      'This is NOT a function because x=2 appears twice with different y-values (6 and 8).',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: true,
                    rationale:
                      'The x-value 2 maps to both 6 and 8, violating the function rule (one input â†’ one output).',
                  },
                  {
                    text: 'Yes, because y-values are different',
                    isCorrect: false,
                    rationale:
                      'Having different y-values does not make it a function if x-values repeat.',
                  },
                  {
                    text: 'Cannot be determined',
                    isCorrect: false,
                    rationale:
                      'We can clearly see x=2 repeats with different outputs.',
                  },
                ],
              },
              {
                questionNumber: 3,
                calculator: false,
                question: `Does the following table represent a function?

<table class="function-table"><tbody><tr><th>x</th><td>-2</td><td>-1</td><td>0</td><td>1</td><td>2</td></tr><tr><th>y</th><td>4</td><td>1</td><td>0</td><td>1</td><td>4</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'Each x-value appears only once. It does not matter that y-values repeat (e.g., y=1 and y=4 appear twice).',
                  },
                  {
                    text: 'No, because y-values repeat',
                    isCorrect: false,
                    rationale:
                      'Functions CAN have repeating y-values. Only repeating x-values with different y-values make it not a function.',
                  },
                  {
                    text: 'No, because of negative x-values',
                    isCorrect: false,
                    rationale:
                      'Functions can have any x-values, including negatives.',
                  },
                  {
                    text: 'Cannot be determined',
                    isCorrect: false,
                    rationale:
                      'We can determine this is a function by checking x-values.',
                  },
                ],
              },
              {
                questionNumber: 4,
                calculator: false,
                question: `Does the following table represent a function?

<table class="function-table"><tbody><tr><th>x</th><td>5</td><td>10</td><td>15</td><td>20</td></tr><tr><th>y</th><td>3</td><td>3</td><td>3</td><td>3</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'This is a constant function where every x-value maps to y=3. Each x appears only once.',
                  },
                  {
                    text: 'No, because all y-values are the same',
                    isCorrect: false,
                    rationale:
                      'A constant function is still a valid function. Same y-values are allowed.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale:
                      'This IS a function because no x-value repeats with different y-values.',
                  },
                  {
                    text: 'Only if x increases',
                    isCorrect: false,
                    rationale:
                      'Functions do not require x-values to be in order or increasing.',
                  },
                ],
              },
              {
                questionNumber: 5,
                calculator: false,
                question: `Does the following table represent a function?

<table class="function-table"><tbody><tr><th>x</th><td>1</td><td>3</td><td>5</td><td>3</td></tr><tr><th>y</th><td>2</td><td>4</td><td>6</td><td>4</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Yes, because y=4 appears twice',
                    isCorrect: false,
                    rationale:
                      'Repeating y-values alone do not determine if it is a function. Check x-values.',
                  },
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'Even though x=3 appears twice, it maps to the same y-value (4) both times. This is allowed in functions.',
                  },
                  {
                    text: 'No, because x=3 appears twice',
                    isCorrect: false,
                    rationale:
                      'If the same x maps to the SAME y, it is still a function. The issue is only when the same x maps to DIFFERENT y-values.',
                  },
                  {
                    text: 'Cannot be determined',
                    isCorrect: false,
                    rationale:
                      'We can determine this by checking if repeated x-values map to the same or different y-values.',
                  },
                ],
              },
              {
                questionNumber: 6,
                calculator: false,
                question: `Does the following table represent a function?

<table class="function-table"><tbody><tr><th>x</th><td>0</td><td>1</td><td>2</td><td>1</td></tr><tr><th>y</th><td>10</td><td>20</td><td>30</td><td>25</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: false,
                    rationale:
                      'This is NOT a function because x=1 maps to both 20 and 25.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: true,
                    rationale:
                      'The x-value 1 appears twice with different y-values (20 and 25), violating the function definition.',
                  },
                  {
                    text: 'Yes, if we remove one x=1 entry',
                    isCorrect: false,
                    rationale:
                      'We evaluate the table as given, not after modifications.',
                  },
                  {
                    text: 'Cannot be determined',
                    isCorrect: false,
                    rationale:
                      'We can clearly see x=1 maps to two different outputs.',
                  },
                ],
              },
              {
                questionNumber: 7,
                calculator: false,
                question: `Does the following table represent a function?

<table class="function-table"><tbody><tr><th>x</th><td>-3</td><td>0</td><td>3</td><td>6</td></tr><tr><th>y</th><td>9</td><td>0</td><td>9</td><td>36</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'Each x-value appears exactly once. The fact that y=9 repeats does not affect the function status.',
                  },
                  {
                    text: 'No, because y=9 appears twice',
                    isCorrect: false,
                    rationale:
                      'Repeating y-values are allowed in functions. Only repeating x-values with different y-values matter.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale:
                      'This IS a function because every x maps to exactly one y.',
                  },
                  {
                    text: 'Only if we ignore y=9',
                    isCorrect: false,
                    rationale:
                      'We do not need to ignore anything. Repeating outputs are fine.',
                  },
                ],
              },
              {
                questionNumber: 8,
                calculator: false,
                question: `Does the following table represent a function?

<table class="function-table"><tbody><tr><th>x</th><td>7</td><td>7</td><td>7</td><td>7</td></tr><tr><th>y</th><td>1</td><td>2</td><td>3</td><td>4</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: false,
                    rationale:
                      'This is NOT a function because x=7 maps to four different y-values (1, 2, 3, 4).',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: true,
                    rationale:
                      'The same input (x=7) cannot map to multiple outputs. This violates the function rule.',
                  },
                  {
                    text: 'Yes, because y-values are different',
                    isCorrect: false,
                    rationale:
                      'Different y-values do not help if the same x produces them.',
                  },
                  {
                    text: 'Cannot be determined',
                    isCorrect: false,
                    rationale: 'It is clear that x=7 has multiple outputs.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: false,
                question: `Does the following table represent a function?

<table class="function-table"><tbody><tr><th>x</th><td>10</td><td>20</td><td>30</td><td>40</td><td>50</td></tr><tr><th>y</th><td>5</td><td>10</td><td>15</td><td>20</td><td>25</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'Each x-value is unique and maps to exactly one y-value. This is a linear function.',
                  },
                  {
                    text: 'No, because values increase',
                    isCorrect: false,
                    rationale:
                      'Increasing values do not prevent something from being a function.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale: 'This IS a function because no x-value repeats.',
                  },
                  {
                    text: 'Only if y = 0.5x',
                    isCorrect: false,
                    rationale:
                      'We determine function status from the table, not the equation.',
                  },
                ],
              },
              {
                questionNumber: 10,
                calculator: false,
                question: `Does the following table represent a function?

<table class="function-table"><tbody><tr><th>x</th><td>4</td><td>5</td><td>6</td><td>5</td></tr><tr><th>y</th><td>16</td><td>25</td><td>36</td><td>30</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: false,
                    rationale:
                      'This is NOT a function because x=5 maps to both 25 and 30.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: true,
                    rationale:
                      'The input x=5 produces two different outputs (25 and 30), which violates the function definition.',
                  },
                  {
                    text: 'Yes, because most x-values are unique',
                    isCorrect: false,
                    rationale:
                      'Even one repeated x-value with different y-values makes it not a function.',
                  },
                  {
                    text: 'Cannot be determined',
                    isCorrect: false,
                    rationale:
                      'We can clearly identify that x=5 has two outputs.',
                  },
                ],
              },
              {
                questionNumber: 11,
                calculator: false,
                question: `Does the following table represent a function?

<table class="function-table"><tbody><tr><th>x</th><td>-5</td><td>-3</td><td>-1</td><td>1</td><td>3</td></tr><tr><th>y</th><td>25</td><td>9</td><td>1</td><td>1</td><td>9</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'Each x-value appears only once. Y-values can repeat (symmetry in this case).',
                  },
                  {
                    text: 'No, because y-values repeat',
                    isCorrect: false,
                    rationale:
                      'Repeating y-values do not matter. Only x-values must not repeat with different outputs.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale:
                      'This IS a function. Every x has exactly one corresponding y.',
                  },
                  {
                    text: 'Only for positive x-values',
                    isCorrect: false,
                    rationale:
                      'Functions work for all x-values in the domain, including negatives.',
                  },
                ],
              },
              {
                questionNumber: 12,
                calculator: false,
                question: `Does the following table represent a function?

<table class="function-table"><tbody><tr><th>x</th><td>8</td><td>9</td><td>10</td><td>8</td></tr><tr><th>y</th><td>64</td><td>81</td><td>100</td><td>64</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'Even though x=8 appears twice, it maps to the same y-value (64) both times, which is allowed.',
                  },
                  {
                    text: 'No, because x=8 appears twice',
                    isCorrect: false,
                    rationale:
                      'Repeating x with the SAME y is acceptable. Only different y-values cause issues.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale:
                      'This IS a function because x=8 consistently maps to y=64.',
                  },
                  {
                    text: 'Only if we remove duplicate entries',
                    isCorrect: false,
                    rationale:
                      'No modification is needed. The table as-is represents a function.',
                  },
                ],
              },
              {
                questionNumber: 13,
                calculator: false,
                question: `Does the following table represent a function?

<table class="function-table"><tbody><tr><th>x</th><td>0</td><td>0</td><td>1</td><td>2</td></tr><tr><th>y</th><td>5</td><td>10</td><td>15</td><td>20</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: false,
                    rationale:
                      'This is NOT a function because x=0 maps to both 5 and 10.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: true,
                    rationale:
                      'The input x=0 produces two different outputs (5 and 10), violating the function definition.',
                  },
                  {
                    text: 'Yes, because x=0 is special',
                    isCorrect: false,
                    rationale:
                      'No x-value is special. All inputs must map to exactly one output.',
                  },
                  {
                    text: 'Cannot be determined',
                    isCorrect: false,
                    rationale:
                      'We can clearly see x=0 has two different y-values.',
                  },
                ],
              },
              {
                questionNumber: 14,
                calculator: false,
                question: `Does the following table represent a function?

<table class="function-table"><tbody><tr><th>x</th><td>100</td><td>200</td><td>300</td><td>400</td></tr><tr><th>y</th><td>-1</td><td>-2</td><td>-3</td><td>-4</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'Each x-value is unique and maps to exactly one y-value. Negative outputs are perfectly valid.',
                  },
                  {
                    text: 'No, because y-values are negative',
                    isCorrect: false,
                    rationale:
                      'Functions can have negative outputs. Sign does not affect function status.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale: 'This IS a function because no x-value repeats.',
                  },
                  {
                    text: 'Only if we use absolute values',
                    isCorrect: false,
                    rationale:
                      'We evaluate the table as given. No transformations are needed.',
                  },
                ],
              },
              {
                questionNumber: 15,
                calculator: false,
                question: `Does the following table represent a function?

<table class="function-table"><tbody><tr><th>x</th><td>12</td><td>15</td><td>12</td><td>18</td></tr><tr><th>y</th><td>6</td><td>9</td><td>10</td><td>12</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: false,
                    rationale:
                      'This is NOT a function because x=12 maps to both 6 and 10.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: true,
                    rationale:
                      'The input x=12 produces two different outputs (6 and 10), which violates the function rule.',
                  },
                  {
                    text: 'Yes, if we average the y-values',
                    isCorrect: false,
                    rationale:
                      'We cannot modify the table. It must be evaluated as given.',
                  },
                  {
                    text: 'Cannot be determined',
                    isCorrect: false,
                    rationale:
                      'It is clear that x=12 has multiple different outputs.',
                  },
                ],
              },
            ],
          },
          {
            id: 'math_functions_multiple_tables',
            title: 'Function or Not? (Multiple Tables)',
            description:
              'Compare multiple tables and identify which represent functions.',
            type: 'quiz',
            questions: [
              {
                questionNumber: 1,
                calculator: false,
                question: `Which of the following tables represents a function?

**Table A:**
<table class="function-table"><tbody><tr><th>x</th><td>1</td><td>2</td><td>3</td><td>2</td></tr><tr><th>y</th><td>4</td><td>5</td><td>6</td><td>7</td></tr></tbody></table>

**Table B:**
<table class="function-table"><tbody><tr><th>x</th><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><th>y</th><td>4</td><td>5</td><td>6</td><td>7</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Only Table A',
                    isCorrect: false,
                    rationale:
                      'Table A is NOT a function because x=2 maps to both 5 and 7.',
                  },
                  {
                    text: 'Only Table B',
                    isCorrect: true,
                    rationale:
                      'Table B is a function because each x-value is unique. Table A has x=2 appearing twice with different y-values.',
                  },
                  {
                    text: 'Both tables',
                    isCorrect: false,
                    rationale:
                      'Table A violates the function rule due to x=2 appearing with two different outputs.',
                  },
                  {
                    text: 'Neither table',
                    isCorrect: false,
                    rationale:
                      'Table B is a valid function with unique x-values.',
                  },
                ],
              },
              {
                questionNumber: 2,
                calculator: false,
                question: `Which of the following tables represents a function?

**Table A:**
<table class="function-table"><tbody><tr><th>x</th><td>5</td><td>5</td><td>5</td><td>5</td></tr><tr><th>y</th><td>1</td><td>2</td><td>3</td><td>4</td></tr></tbody></table>

**Table B:**
<table class="function-table"><tbody><tr><th>x</th><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><th>y</th><td>5</td><td>5</td><td>5</td><td>5</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Only Table A',
                    isCorrect: false,
                    rationale:
                      'Table A is NOT a function because x=5 maps to four different y-values (1, 2, 3, 4).',
                  },
                  {
                    text: 'Only Table B',
                    isCorrect: true,
                    rationale:
                      'Table B is a constant function where each unique x-value maps to y=5. This is a valid function.',
                  },
                  {
                    text: 'Both tables',
                    isCorrect: false,
                    rationale:
                      'Table A violates the function definition by having one input map to multiple outputs.',
                  },
                  {
                    text: 'Neither table',
                    isCorrect: false,
                    rationale: 'Table B is a valid constant function.',
                  },
                ],
              },
              {
                questionNumber: 3,
                calculator: false,
                question: `Which of the following tables represents a function?

**Table A:**
<table class="function-table"><tbody><tr><th>x</th><td>-2</td><td>-1</td><td>0</td><td>1</td><td>2</td></tr><tr><th>y</th><td>4</td><td>1</td><td>0</td><td>1</td><td>4</td></tr></tbody></table>

**Table B:**
<table class="function-table"><tbody><tr><th>x</th><td>-2</td><td>-1</td><td>0</td><td>-1</td><td>2</td></tr><tr><th>y</th><td>4</td><td>1</td><td>0</td><td>1</td><td>4</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Only Table A',
                    isCorrect: true,
                    rationale:
                      'Table A is a function with unique x-values. Table B has x=-1 appearing twice with the same y-value, but we should avoid ambiguityâ€”actually both are functions if x=-1â†’1 consistently. However, Table A is clearer with no repeats.',
                  },
                  {
                    text: 'Only Table B',
                    isCorrect: false,
                    rationale:
                      'Table B has x=-1 appearing twice. Even though both map to y=1, Table A is the clearer function without any repeated x-values.',
                  },
                  {
                    text: 'Both tables',
                    isCorrect: false,
                    rationale:
                      'While Table B technically works if x=-1 consistently maps to 1, the question asks which represents "a function" and Table A is the unambiguous choice.',
                  },
                  {
                    text: 'Neither table',
                    isCorrect: false,
                    rationale:
                      'Table A is definitely a function with all unique x-values.',
                  },
                ],
              },
              {
                questionNumber: 4,
                calculator: false,
                question: `Which of the following tables does NOT represent a function?

**Table A:**
<table class="function-table"><tbody><tr><th>x</th><td>3</td><td>6</td><td>9</td><td>12</td></tr><tr><th>y</th><td>1</td><td>2</td><td>3</td><td>4</td></tr></tbody></table>

**Table B:**
<table class="function-table"><tbody><tr><th>x</th><td>3</td><td>6</td><td>9</td><td>3</td></tr><tr><th>y</th><td>1</td><td>2</td><td>3</td><td>5</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Only Table A',
                    isCorrect: false,
                    rationale:
                      'Table A IS a function because all x-values are unique.',
                  },
                  {
                    text: 'Only Table B',
                    isCorrect: true,
                    rationale:
                      'Table B is NOT a function because x=3 maps to both 1 and 5.',
                  },
                  {
                    text: 'Both tables',
                    isCorrect: false,
                    rationale: 'Table A is a valid function.',
                  },
                  {
                    text: 'Neither table',
                    isCorrect: false,
                    rationale: 'Table B does NOT represent a function.',
                  },
                ],
              },
              {
                questionNumber: 5,
                calculator: false,
                question: `How many of the following tables represent functions?

**Table A:**
<table class="function-table"><tbody><tr><th>x</th><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><th>y</th><td>0</td><td>1</td><td>4</td><td>9</td></tr></tbody></table>

**Table B:**
<table class="function-table"><tbody><tr><th>x</th><td>0</td><td>0</td><td>1</td><td>1</td></tr><tr><th>y</th><td>5</td><td>10</td><td>15</td><td>20</td></tr></tbody></table>

**Table C:**
<table class="function-table"><tbody><tr><th>x</th><td>10</td><td>20</td><td>30</td><td>40</td></tr><tr><th>y</th><td>2</td><td>2</td><td>2</td><td>2</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: '0 tables',
                    isCorrect: false,
                    rationale: 'At least two tables are functions.',
                  },
                  {
                    text: '1 table',
                    isCorrect: false,
                    rationale: 'More than one table is a function.',
                  },
                  {
                    text: '2 tables',
                    isCorrect: true,
                    rationale:
                      'Tables A and C are functions. Table B is NOT because both x=0 and x=1 appear twice with different y-values.',
                  },
                  {
                    text: '3 tables',
                    isCorrect: false,
                    rationale:
                      'Table B is not a function due to repeated x-values with different outputs.',
                  },
                ],
              },
              {
                questionNumber: 6,
                calculator: false,
                question: `Which table shows a function where every x-value is negative?

**Table A:**
<table class="function-table"><tbody><tr><th>x</th><td>-5</td><td>-3</td><td>-1</td><td>0</td></tr><tr><th>y</th><td>10</td><td>6</td><td>2</td><td>0</td></tr></tbody></table>

**Table B:**
<table class="function-table"><tbody><tr><th>x</th><td>-8</td><td>-4</td><td>-2</td><td>-1</td></tr><tr><th>y</th><td>16</td><td>8</td><td>4</td><td>2</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Only Table A',
                    isCorrect: false,
                    rationale: 'Table A includes x=0, which is not negative.',
                  },
                  {
                    text: 'Only Table B',
                    isCorrect: true,
                    rationale:
                      'Table B is a function with all negative x-values (-8, -4, -2, -1).',
                  },
                  {
                    text: 'Both tables',
                    isCorrect: false,
                    rationale:
                      'Table A has x=0, which is neither positive nor negative.',
                  },
                  {
                    text: 'Neither table',
                    isCorrect: false,
                    rationale: 'Table B meets the criteria.',
                  },
                ],
              },
              {
                questionNumber: 7,
                calculator: false,
                question: `Which tables below are functions?

**Table A:**
<table class="function-table"><tbody><tr><th>x</th><td>7</td><td>14</td><td>21</td><td>28</td></tr><tr><th>y</th><td>1</td><td>2</td><td>3</td><td>4</td></tr></tbody></table>

**Table B:**
<table class="function-table"><tbody><tr><th>x</th><td>7</td><td>14</td><td>21</td><td>7</td></tr><tr><th>y</th><td>1</td><td>2</td><td>3</td><td>1</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Only Table A',
                    isCorrect: false,
                    rationale:
                      'Both tables are actually functions. Table B has x=7 appearing twice, but it maps to the same y-value (1) both times.',
                  },
                  {
                    text: 'Only Table B',
                    isCorrect: false,
                    rationale:
                      'Table A is definitely a function, and so is Table B.',
                  },
                  {
                    text: 'Both tables',
                    isCorrect: true,
                    rationale:
                      'Table A has unique x-values. Table B has x=7 twice, but both map to y=1 consistently, making it a valid function.',
                  },
                  {
                    text: 'Neither table',
                    isCorrect: false,
                    rationale: 'Both are valid functions.',
                  },
                ],
              },
              {
                questionNumber: 8,
                calculator: false,
                question: `Which of these tables is NOT a function?

**Table A:**
<table class="function-table"><tbody><tr><th>x</th><td>2</td><td>4</td><td>6</td><td>8</td></tr><tr><th>y</th><td>10</td><td>20</td><td>30</td><td>40</td></tr></tbody></table>

**Table B:**
<table class="function-table"><tbody><tr><th>x</th><td>2</td><td>4</td><td>6</td><td>4</td></tr><tr><th>y</th><td>10</td><td>20</td><td>30</td><td>25</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Only Table A',
                    isCorrect: false,
                    rationale: 'Table A IS a function with unique x-values.',
                  },
                  {
                    text: 'Only Table B',
                    isCorrect: true,
                    rationale:
                      'Table B is NOT a function because x=4 maps to both 20 and 25.',
                  },
                  {
                    text: 'Both tables',
                    isCorrect: false,
                    rationale: 'Table A is a valid function.',
                  },
                  {
                    text: 'Neither table',
                    isCorrect: false,
                    rationale: 'Table B is not a function.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: false,
                question: `All of the following tables represent functions EXCEPT:

**Table A:**
<table class="function-table"><tbody><tr><th>x</th><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><th>y</th><td>5</td><td>5</td><td>5</td><td>5</td></tr></tbody></table>

**Table B:**
<table class="function-table"><tbody><tr><th>x</th><td>1</td><td>1</td><td>2</td><td>3</td></tr><tr><th>y</th><td>5</td><td>10</td><td>15</td><td>20</td></tr></tbody></table>

**Table C:**
<table class="function-table"><tbody><tr><th>x</th><td>5</td><td>10</td><td>15</td><td>20</td></tr><tr><th>y</th><td>1</td><td>2</td><td>3</td><td>4</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Table A',
                    isCorrect: false,
                    rationale:
                      'Table A is a constant function, which is valid.',
                  },
                  {
                    text: 'Table B',
                    isCorrect: true,
                    rationale:
                      'Table B is NOT a function because x=1 maps to both 5 and 10.',
                  },
                  {
                    text: 'Table C',
                    isCorrect: false,
                    rationale: 'Table C is a function with unique x-values.',
                  },
                  {
                    text: 'All are functions',
                    isCorrect: false,
                    rationale: 'Table B violates the function rule.',
                  },
                ],
              },
              {
                questionNumber: 10,
                calculator: false,
                question: `Which pair of tables both represent functions?

**Table A:**
<table class="function-table"><tbody><tr><th>x</th><td>-3</td><td>-2</td><td>-1</td><td>0</td></tr><tr><th>y</th><td>9</td><td>4</td><td>1</td><td>0</td></tr></tbody></table>

**Table B:**
<table class="function-table"><tbody><tr><th>x</th><td>-3</td><td>-2</td><td>-1</td><td>-2</td></tr><tr><th>y</th><td>9</td><td>4</td><td>1</td><td>0</td></tr></tbody></table>

**Table C:**
<table class="function-table"><tbody><tr><th>x</th><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><th>y</th><td>0</td><td>1</td><td>4</td><td>9</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Tables A and B',
                    isCorrect: false,
                    rationale:
                      'Table B is NOT a function because x=-2 maps to both 4 and 0.',
                  },
                  {
                    text: 'Tables A and C',
                    isCorrect: true,
                    rationale:
                      'Both Tables A and C have unique x-values, making them valid functions.',
                  },
                  {
                    text: 'Tables B and C',
                    isCorrect: false,
                    rationale: 'Table B is not a function.',
                  },
                  {
                    text: 'All three tables',
                    isCorrect: false,
                    rationale: 'Table B violates the function definition.',
                  },
                ],
              },
              {
                questionNumber: 11,
                calculator: false,
                question: `Which table represents a linear function?

**Table A:**
<table class="function-table"><tbody><tr><th>x</th><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><th>y</th><td>0</td><td>1</td><td>4</td><td>9</td></tr></tbody></table>

**Table B:**
<table class="function-table"><tbody><tr><th>x</th><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><th>y</th><td>5</td><td>8</td><td>11</td><td>14</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: 'Only Table A',
                    isCorrect: false,
                    rationale:
                      'Table A is a quadratic function (y = xÂ²), not linear.',
                  },
                  {
                    text: 'Only Table B',
                    isCorrect: true,
                    rationale:
                      'Table B shows a constant rate of change (+3 each time), making it a linear function: y = 3x + 5.',
                  },
                  {
                    text: 'Both tables',
                    isCorrect: false,
                    rationale:
                      'Table A is not linear; its rate of change increases.',
                  },
                  {
                    text: 'Neither table',
                    isCorrect: false,
                    rationale: 'Table B is a linear function.',
                  },
                ],
              },
              {
                questionNumber: 12,
                calculator: false,
                question: `How many of these tables are functions with at least one repeated y-value?

**Table A:**
<table class="function-table"><tbody><tr><th>x</th><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><th>y</th><td>7</td><td>8</td><td>9</td><td>10</td></tr></tbody></table>

**Table B:**
<table class="function-table"><tbody><tr><th>x</th><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><th>y</th><td>5</td><td>5</td><td>10</td><td>10</td></tr></tbody></table>

**Table C:**
<table class="function-table"><tbody><tr><th>x</th><td>2</td><td>4</td><td>6</td><td>8</td></tr><tr><th>y</th><td>3</td><td>3</td><td>3</td><td>3</td></tr></tbody></table>`,
                answerOptions: [
                  {
                    text: '0 tables',
                    isCorrect: false,
                    rationale: 'Tables B and C have repeated y-values.',
                  },
                  {
                    text: '1 table',
                    isCorrect: false,
                    rationale: 'More than one table meets the criteria.',
                  },
                  {
                    text: '2 tables',
                    isCorrect: true,
                    rationale:
                      'Tables B and C are functions with repeated y-values. Table A has all unique y-values.',
                  },
                  {
                    text: '3 tables',
                    isCorrect: false,
                    rationale: 'Table A does not have repeated y-values.',
                  },
                ],
              },
            ],
          },
          {
            id: 'math_functions_scenarios',
            title: 'Function Scenarios (Tables + Logic)',
            description:
              'Apply function concepts to real-world scenarios using tables.',
            type: 'quiz',
            questions: [
              {
                questionNumber: 1,
                calculator: false,
                question: `A vending machine charges different prices based on the item code. The table shows the relationship between item codes and prices:

<table class="function-table"><tbody><tr><th>Code</th><td>A1</td><td>A2</td><td>B1</td><td>B2</td></tr><tr><th>Price ($)</th><td>1.50</td><td>2.00</td><td>1.75</td><td>2.25</td></tr></tbody></table>

Does this table represent a function?`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'Each item code (input) maps to exactly one price (output). This is a function.',
                  },
                  {
                    text: 'No, because prices vary',
                    isCorrect: false,
                    rationale:
                      'Varying outputs do not prevent something from being a function.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale:
                      'This IS a function because each code has one unique price.',
                  },
                  {
                    text: 'Only if prices are equal',
                    isCorrect: false,
                    rationale: 'Functions do not require outputs to be equal.',
                  },
                ],
              },
              {
                questionNumber: 2,
                calculator: false,
                question: `A parking garage charges based on hours parked. The table shows hours and total cost:

<table class="function-table"><tbody><tr><th>Hours</th><td>1</td><td>2</td><td>3</td><td>2</td></tr><tr><th>Cost ($)</th><td>5</td><td>8</td><td>11</td><td>9</td></tr></tbody></table>

Does this represent a function?`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: false,
                    rationale:
                      'This is NOT a function because 2 hours maps to both $8 and $9.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: true,
                    rationale:
                      'The input of 2 hours produces two different costs ($8 and $9), violating the function rule.',
                  },
                  {
                    text: 'Yes, because costs increase',
                    isCorrect: false,
                    rationale:
                      'The issue is not about increasing costs, but about inconsistent outputs for the same input.',
                  },
                  {
                    text: 'Cannot be determined',
                    isCorrect: false,
                    rationale:
                      'We can clearly see 2 hours has two different costs.',
                  },
                ],
              },
              {
                questionNumber: 3,
                calculator: false,
                question: `A taxi service charges a flat rate based on distance zones. The table shows zone numbers and fares:

<table class="function-table"><tbody><tr><th>Zone</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr><tr><th>Fare ($)</th><td>10</td><td>15</td><td>15</td><td>20</td><td>25</td></tr></tbody></table>

Does this represent a function?`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'Each zone (input) maps to exactly one fare (output). The fact that zones 2 and 3 both cost $15 does not matter.',
                  },
                  {
                    text: 'No, because two zones have the same fare',
                    isCorrect: false,
                    rationale:
                      'Repeated outputs (fares) are allowed in functions. Only repeated inputs with different outputs cause issues.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale:
                      'This IS a function. Each zone has one specific fare.',
                  },
                  {
                    text: 'Only if all fares are different',
                    isCorrect: false,
                    rationale:
                      'Functions do not require all outputs to be unique.',
                  },
                ],
              },
              {
                questionNumber: 4,
                calculator: false,
                question: `A movie theater has special pricing for different age groups. The table shows ages and ticket prices:

<table class="function-table"><tbody><tr><th>Age</th><td>8</td><td>12</td><td>18</td><td>65</td></tr><tr><th>Price ($)</th><td>6</td><td>10</td><td>12</td><td>8</td></tr></tbody></table>

Does this represent a function?`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'Each age (input) maps to exactly one price (output). This is a valid function.',
                  },
                  {
                    text: 'No, because senior pricing is lower',
                    isCorrect: false,
                    rationale:
                      'Pricing patterns do not affect whether something is a function.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale: 'This IS a function with unique age inputs.',
                  },
                  {
                    text: 'Only if prices increase with age',
                    isCorrect: false,
                    rationale:
                      'Functions do not require outputs to follow any specific pattern.',
                  },
                ],
              },
              {
                questionNumber: 5,
                calculator: false,
                question: `A gym membership has different monthly rates. The table shows months committed and monthly cost:

<table class="function-table"><tbody><tr><th>Months</th><td>1</td><td>6</td><td>12</td><td>6</td></tr><tr><th>Cost/Month ($)</th><td>50</td><td>40</td><td>30</td><td>40</td></tr></tbody></table>

Does this represent a function?`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'The 6-month commitment appears twice, but both times it maps to $40/month. Consistent repeated inputs are allowed.',
                  },
                  {
                    text: 'No, because 6 months appears twice',
                    isCorrect: false,
                    rationale:
                      'If the repeated input maps to the SAME output, it is still a function.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale:
                      'This IS a function because the repeated value has a consistent output.',
                  },
                  {
                    text: 'Only if we remove duplicates',
                    isCorrect: false,
                    rationale:
                      'No modification needed. The table already represents a function.',
                  },
                ],
              },
              {
                questionNumber: 6,
                calculator: false,
                question: `A shipping company charges based on package weight. The table shows weight in pounds and shipping cost:

<table class="function-table"><tbody><tr><th>Weight (lbs)</th><td>5</td><td>10</td><td>15</td><td>10</td></tr><tr><th>Cost ($)</th><td>8</td><td>12</td><td>16</td><td>15</td></tr></tbody></table>

Does this represent a function?`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: false,
                    rationale:
                      'This is NOT a function because 10 lbs maps to both $12 and $15.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: true,
                    rationale:
                      'The weight of 10 lbs has two different costs ($12 and $15), violating the function definition.',
                  },
                  {
                    text: 'Yes, if we average the costs',
                    isCorrect: false,
                    rationale:
                      'We cannot modify the table. It must be evaluated as given.',
                  },
                  {
                    text: 'Cannot be determined',
                    isCorrect: false,
                    rationale:
                      'We can clearly see the inconsistent pricing for 10 lbs.',
                  },
                ],
              },
              {
                questionNumber: 7,
                calculator: false,
                question: `A concert venue has seat pricing based on section. The table shows sections and prices:

<table class="function-table"><tbody><tr><th>Section</th><td>A</td><td>B</td><td>C</td><td>D</td></tr><tr><th>Price ($)</th><td>100</td><td>75</td><td>75</td><td>50</td></tr></tbody></table>

Does this represent a function?`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'Each section (input) maps to exactly one price (output). Sections B and C having the same price is allowed.',
                  },
                  {
                    text: 'No, because B and C cost the same',
                    isCorrect: false,
                    rationale:
                      'Repeated outputs do not affect function status. Only repeated inputs with different outputs matter.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale:
                      'This IS a function. Each section has one specific price.',
                  },
                  {
                    text: 'Only if all sections are unique',
                    isCorrect: false,
                    rationale: 'The sections ARE all unique (A, B, C, D).',
                  },
                ],
              },
              {
                questionNumber: 8,
                calculator: false,
                question: `A tutoring service charges hourly rates based on subject. The table shows subjects and rates:

<table class="function-table"><tbody><tr><th>Subject</th><td>Math</td><td>Science</td><td>English</td><td>Math</td></tr><tr><th>Rate ($/hr)</th><td>30</td><td>35</td><td>25</td><td>32</td></tr></tbody></table>

Does this represent a function?`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: false,
                    rationale:
                      'This is NOT a function because Math appears twice with different rates ($30 and $32).',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: true,
                    rationale:
                      'The subject Math has two different hourly rates ($30 and $32), violating the function rule.',
                  },
                  {
                    text: 'Yes, because different tutors charge different rates',
                    isCorrect: false,
                    rationale:
                      'The table shows subject-to-rate mapping only. Inconsistent rates for the same subject make it not a function.',
                  },
                  {
                    text: 'Cannot be determined',
                    isCorrect: false,
                    rationale: 'It is clear that Math has two different rates.',
                  },
                ],
              },
              {
                questionNumber: 9,
                calculator: false,
                question: `A car rental company charges daily rates based on vehicle type. The table shows vehicle types and daily rates:

<table class="function-table"><tbody><tr><th>Vehicle</th><td>Sedan</td><td>SUV</td><td>Truck</td><td>Van</td></tr><tr><th>Rate ($/day)</th><td>45</td><td>65</td><td>55</td><td>60</td></tr></tbody></table>

Does this represent a function?`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'Each vehicle type (input) maps to exactly one daily rate (output). This is a valid function.',
                  },
                  {
                    text: 'No, because rates vary by vehicle',
                    isCorrect: false,
                    rationale:
                      'Varying rates are expected and do not prevent this from being a function.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale: 'This IS a function with unique vehicle types.',
                  },
                  {
                    text: 'Only if all vehicles cost the same',
                    isCorrect: false,
                    rationale:
                      'Functions do not require all outputs to be equal.',
                  },
                ],
              },
              {
                questionNumber: 10,
                calculator: false,
                question: `A phone plan charges based on data usage in GB. The table shows GB used and monthly charges:

<table class="function-table"><tbody><tr><th>GB Used</th><td>2</td><td>5</td><td>10</td><td>15</td></tr><tr><th>Charge ($)</th><td>30</td><td>40</td><td>60</td><td>80</td></tr></tbody></table>

Does this represent a function?`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'Each GB amount (input) maps to exactly one charge (output). All inputs are unique.',
                  },
                  {
                    text: 'No, because charges increase',
                    isCorrect: false,
                    rationale:
                      'Increasing outputs do not prevent something from being a function.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale:
                      'This IS a function. Each data amount has one specific charge.',
                  },
                  {
                    text: 'Only if charges are proportional',
                    isCorrect: false,
                    rationale: 'Proportionality is not required for functions.',
                  },
                ],
              },
              {
                questionNumber: 11,
                calculator: false,
                question: `A coffee shop has loyalty rewards. The table shows number of purchases and free items earned:

<table class="function-table"><tbody><tr><th>Purchases</th><td>10</td><td>20</td><td>30</td><td>20</td></tr><tr><th>Free Items</th><td>1</td><td>2</td><td>3</td><td>2</td></tr></tbody></table>

Does this represent a function?`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'The value 20 purchases appears twice, but both times it maps to 2 free items. Consistent repeated inputs are allowed.',
                  },
                  {
                    text: 'No, because 20 appears twice',
                    isCorrect: false,
                    rationale:
                      'If the repeated input has the SAME output, it is still a function.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale:
                      'This IS a function because 20 consistently maps to 2.',
                  },
                  {
                    text: 'Only if we remove duplicates',
                    isCorrect: false,
                    rationale:
                      'No modification needed. This already represents a function.',
                  },
                ],
              },
              {
                questionNumber: 12,
                calculator: false,
                question: `A bakery offers bulk discounts. The table shows dozens ordered and price per dozen:

<table class="function-table"><tbody><tr><th>Dozens</th><td>1</td><td>2</td><td>3</td><td>2</td></tr><tr><th>Price/Dozen ($)</th><td>12</td><td>11</td><td>10</td><td>11.50</td></tr></tbody></table>

Does this represent a function?`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: false,
                    rationale:
                      'This is NOT a function because 2 dozens maps to both $11 and $11.50.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: true,
                    rationale:
                      'The input of 2 dozens produces two different prices ($11 and $11.50), violating the function rule.',
                  },
                  {
                    text: 'Yes, if prices are close',
                    isCorrect: false,
                    rationale:
                      'Even small differences in outputs make it not a function if the input is the same.',
                  },
                  {
                    text: 'Cannot be determined',
                    isCorrect: false,
                    rationale:
                      'We can clearly see 2 dozens has two different prices.',
                  },
                ],
              },
              {
                questionNumber: 13,
                calculator: false,
                question: `An amusement park charges admission based on visitor age. The table shows ages and admission prices:

<table class="function-table"><tbody><tr><th>Age</th><td>5</td><td>12</td><td>18</td><td>25</td><td>65</td></tr><tr><th>Price ($)</th><td>20</td><td>35</td><td>45</td><td>45</td><td>30</td></tr></tbody></table>

Does this represent a function?`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'Each age (input) appears exactly once and maps to one price (output). Ages 18 and 25 having the same price is allowed.',
                  },
                  {
                    text: 'No, because 18 and 25 both cost $45',
                    isCorrect: false,
                    rationale:
                      'Repeated outputs do not affect function status. Only repeated inputs with different outputs matter.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale: 'This IS a function with all unique age inputs.',
                  },
                  {
                    text: 'Only if senior pricing is removed',
                    isCorrect: false,
                    rationale:
                      'All ages have unique prices defined. No removal is needed.',
                  },
                ],
              },
              {
                questionNumber: 14,
                calculator: false,
                question: `A laundromat charges based on machine size. The table shows machine sizes and prices:

<table class="function-table"><tbody><tr><th>Size</th><td>Small</td><td>Medium</td><td>Large</td><td>Medium</td></tr><tr><th>Price ($)</th><td>3.00</td><td>4.50</td><td>6.00</td><td>4.75</td></tr></tbody></table>

Does this represent a function?`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: false,
                    rationale:
                      'This is NOT a function because Medium appears twice with different prices ($4.50 and $4.75).',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: true,
                    rationale:
                      'The input Medium produces two different prices ($4.50 and $4.75), violating the function definition.',
                  },
                  {
                    text: 'Yes, because prices are similar',
                    isCorrect: false,
                    rationale:
                      'Any difference in outputs for the same input makes it not a function.',
                  },
                  {
                    text: 'Cannot be determined',
                    isCorrect: false,
                    rationale:
                      'It is clear that Medium has two different prices.',
                  },
                ],
              },
              {
                questionNumber: 15,
                calculator: false,
                question: `A streaming service has subscription tiers. The table shows tiers and monthly costs:

<table class="function-table"><tbody><tr><th>Tier</th><td>Basic</td><td>Standard</td><td>Premium</td><td>Family</td></tr><tr><th>Cost/Month ($)</th><td>9.99</td><td>13.99</td><td>17.99</td><td>19.99</td></tr></tbody></table>

Does this represent a function?`,
                answerOptions: [
                  {
                    text: 'Yes, it is a function',
                    isCorrect: true,
                    rationale:
                      'Each subscription tier (input) maps to exactly one monthly cost (output). This is a valid function.',
                  },
                  {
                    text: 'No, because costs vary',
                    isCorrect: false,
                    rationale:
                      'Varying costs are expected and do not prevent this from being a function.',
                  },
                  {
                    text: 'No, it is not a function',
                    isCorrect: false,
                    rationale: 'This IS a function with unique tier inputs.',
                  },
                  {
                    text: 'Only if tiers are numbered',
                    isCorrect: false,
                    rationale:
                      'Functions work with any type of input, including text labels.',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
};


// Legacy window attachment
if (typeof window !== 'undefined') { window.MATH_QUESTIONS = MATH_QUESTIONS; }

// Legacy window attachment
if (typeof window !== 'undefined') { window.MATH_QUESTIONS = MATH_QUESTIONS; }