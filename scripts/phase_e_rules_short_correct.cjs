const { buildRule } = require('./propagate_rationale_rewrites.cjs');

module.exports = [
  buildRule(
    '5',
    '5(5) - 3 = 22 > 17. \u2713',
    'Correct because substituting x = 5 into 5x \u2212 3 gives 5(5) \u2212 3 = 22, and 22 is greater than 17, so x = 5 satisfies the inequality.'
  ),
  buildRule(
    '(2, 7)',
    'If x=2, y = 2 + 5 = 7.',
    'Correct because substituting x = 2 into y = x + 5 gives y = 2 + 5 = 7, so the ordered pair (2, 7) is a solution to the equation.'
  ),
  buildRule(
    '\\(y = x - 2\\)',
    'In y=mx+b form, b=-2.',
    'Correct because in slope-intercept form y = mx + b the constant b is the y-intercept, and y = x \u2212 2 has b = \u22122, which means the line crosses the y-axis at \u22122.'
  ),
  buildRule(
    '(1, 4)',
    'If x=1, y=3(1)+1=4.',
    'Correct because substituting x = 1 into y = 3x + 1 gives y = 3(1) + 1 = 4, so the point (1, 4) lies on the line.'
  ),
  buildRule(
    '65%',
    '100% - 35% = 65%.',
    'Correct because the probabilities of an event happening and not happening must add to 100%, so 100% \u2212 35% = 65%.'
  ),
  buildRule(
    '54 \\(in^{2}\\)',
    'Area = 6 * 9 = 54.',
    'Correct because the area of a rectangle equals length \u00d7 width, so 9 in \u00d7 6 in = 54 square inches.'
  ),
  buildRule(
    '54 in^2',
    'Area = 6 * 9 = 54.',
    'Correct because the area of a rectangle equals length \u00d7 width, so 9 in \u00d7 6 in = 54 square inches.'
  ),
  buildRule(
    'Scalene',
    'No sides are equal.',
    'Correct because a scalene triangle is defined as a triangle in which all three sides have different lengths and no two sides are equal.'
  ),
  buildRule(
    '60\u00b0',
    '180 - 120 = 60.',
    'Correct because supplementary angles add to 180\u00b0, so the supplement of a 120\u00b0 angle is 180\u00b0 \u2212 120\u00b0 = 60\u00b0.'
  ),
  buildRule(
    '703',
    '805 - 102 = 703.',
    'Correct because subtracting 102 from 805 gives 805 \u2212 102 = 703, which is the result of the subtraction.'
  ),
  buildRule(
    '12',
    '12 * 12 = 144.',
    'Correct because the square root of 144 is the number that, when multiplied by itself, equals 144, and 12 \u00d7 12 = 144.'
  ),
  buildRule(
    '15',
    '1 + 2 + 3 + 4 + 5 = 15.',
    'Correct because the sum of the first five positive integers is 1 + 2 + 3 + 4 + 5, which equals 15.'
  ),
  buildRule(
    '453',
    '502 - 49 = 453.',
    'Correct because subtracting 49 from 502 gives 502 \u2212 49 = 453, which is the result of the subtraction.'
  ),
  buildRule(
    '901',
    '1000 - 99 = 901.',
    'Correct because subtracting 99 from 1,000 gives 1,000 \u2212 99 = 901, which is the result of the subtraction.'
  ),
  buildRule(
    '503',
    '305 + 198 = 503.',
    'Correct because adding 305 and 198 gives 305 + 198 = 503, which is the sum.'
  ),
  buildRule(
    '4:5',
    'Divide both parts by 5.',
    'Correct because the ratio 20:25 simplifies by dividing both parts by their greatest common factor 5, which gives 4:5 in simplest form.'
  ),
  buildRule(
    '15.44 dollars',
    '50.00 - 34.56 = 15.44.',
    'Correct because the change owed equals the amount paid minus the bill, so $50.00 \u2212 $34.56 = $15.44.'
  ),
  buildRule(
    '7\u00b0C',
    '-8 + 15 = 7\u00b0C.',
    'Correct because adding the 15\u00b0C rise to the morning temperature of \u22128\u00b0C gives \u22128 + 15 = 7\u00b0C as the new temperature.'
  ),
  buildRule(
    '8.75 cups',
    'Correct. 2.5 cups * 3.5 = 8.75 cups.',
    'Correct because multiplying 2.5 cups by 3.5 gives 2.5 \u00d7 3.5 = 8.75 cups, which is the total amount needed.'
  ),
  buildRule(
    '9',
    '3\u00d72=6, 15-6=9.',
    'Correct because, following the order of operations, the expression in parentheses is evaluated first: 3 \u00d7 2 = 6, and then 15 \u2212 6 = 9.'
  ),
  buildRule(
    '12',
    'LCM of 3 and 4.',
    'Correct because 12 is the least common multiple of 3 and 4, since 12 = 3 \u00d7 4 = 4 \u00d7 3 and is divisible by both numbers.'
  ),
  buildRule(
    '\\(\\frac{20}{3}\\)',
    'Sum=20, divide by 3.',
    'Correct because the mean equals the sum of the values divided by the count, so (4 + 7 + 9) \u00f7 3 = 20/3.'
  ),
  buildRule(
    '10',
    '18\u00f73=6, +4=10.',
    'Correct because, following the order of operations, division is performed before addition: 18 \u00f7 3 = 6, and then 6 + 4 = 10.'
  ),
  buildRule(
    'Muckrakers',
    'Muckrakers',
    'Correct because Progressive Era journalists who investigated and exposed corruption in business and government were known as muckrakers, a term popularized by President Theodore Roosevelt.'
  ),
  buildRule(
    'The 19th Amendment',
    'The 19th Amendment',
    'Correct because the 19th Amendment to the U.S. Constitution, ratified in 1920, prohibited the federal and state governments from denying the right to vote on the basis of sex and granted women suffrage nationwide.'
  ),
  buildRule(
    '59%',
    '59%',
    'Correct because the residential sector consumes 38% of electricity and the commercial sector consumes 21%, which combine to 38% + 21% = 59%.'
  ),
  buildRule(
    '2035-2040',
    '2035-2040',
    'Correct because the chart shows the largest five-year increase in City X\u2019s projected population occurs between 2035 and 2040, which is the period of greatest growth.'
  ),
];
