const newMathExams = {
    "Math": {
        "icon": "CalculatorIcon",
        "categories": {
            "Quantitative Problem Solving": {
                "description": "Solve problems using numerical operations, geometric reasoning, and data analysis.",
                "topics": [
                    {
                        "id": "math_quant_problem_solving_with_percents",
                        "title": "Problem Solving with Percents",
                        "description": "Calculate and apply percents, discounts, and interest.",
                        "quizzes": [
                            {
                                "id": "math_quant_percents_quiz_1",
                                "title": "Percents Quiz 1",
                                "questions": [
                                    // Easy
                                    {
                                        "type": "multiple_choice",
                                        "question": "What is 50% of 200?",
                                        "answerOptions": ["50", "100", "150", "200"],
                                        "correctAnswer": "100",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "Convert the decimal 0.75 to a percentage.",
                                        "correctAnswer": "75%",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A shirt that costs $40 is on sale for 25% off. What is the sale price?",
                                        "answerOptions": ["$10", "$20", "$30", "$35"],
                                        "correctAnswer": "$30",
                                        "difficulty": "easy"
                                    },
                                    // Medium
                                    {
                                        "type": "multiple_choice",
                                        "question": "If a population of a town grows from 5,000 to 6,000, what is the percent increase?",
                                        "answerOptions": ["10%", "15%", "20%", "25%"],
                                        "correctAnswer": "20%",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "You invest $1,000 at a simple interest rate of 5% per year. How much interest will you earn in 3 years?",
                                        "correctAnswer": "$150",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A recipe calls for 2 cups of flour. If you want to make a batch that is 150% of the original recipe, how many cups of flour do you need?",
                                        "answerOptions": ["2.5 cups", "3 cups", "3.5 cups", "4 cups"],
                                        "correctAnswer": "3 cups",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "The price of a stock increased from $80 to $92. What was the percent increase?",
                                        "answerOptions": ["12%", "15%", "18%", "20%"],
                                        "correctAnswer": "15%",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A restaurant bill is $120. If you leave a 15% tip, what is the total amount you will pay?",
                                        "correctAnswer": "$138",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Out of 500 students, 350 voted in a school election. What percentage of students voted?",
                                        "answerOptions": ["60%", "65%", "70%", "75%"],
                                        "correctAnswer": "70%",
                                        "difficulty": "medium"
                                    },
                                    // Hard
                                    {
                                        "type": "multiple_choice",
                                        "question": "A store buys a television for $500 and marks it up by 60%. If the store then offers a 20% discount on the marked-up price, what is the final selling price?",
                                        "answerOptions": ["$600", "$640", "$680", "$720"],
                                        "correctAnswer": "$640",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "An investment of $2,000 earns compound interest at a rate of 4% per year, compounded annually. What is the value of the investment after 2 years? (Round to the nearest cent)",
                                        "correctAnswer": "$2163.20",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A company's profits decreased by 10% in one year and then increased by 20% the next year. What was the overall percentage change in profit over the two years?",
                                        "answerOptions": ["8% increase", "10% increase", "12% increase", "15% increase"],
                                        "correctAnswer": "8% increase",
                                        "difficulty": "hard"
                                    }
                                ]
                            },
                            {
                                "id": "math_quant_percents_quiz_2",
                                "title": "Percents Quiz 2",
                                "questions": [
                                    // Easy
                                    {
                                        "type": "multiple_choice",
                                        "question": "What is 25% of 400?",
                                        "answerOptions": ["50", "100", "150", "200"],
                                        "correctAnswer": "100",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "Convert 1.25 to a percentage.",
                                        "correctAnswer": "125%",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A hat that costs $20 is on sale for 10% off. What is the sale price?",
                                        "answerOptions": ["$2", "$10", "$18", "$19"],
                                        "correctAnswer": "$18",
                                        "difficulty": "easy"
                                    },
                                    // Medium
                                    {
                                        "type": "multiple_choice",
                                        "question": "If a number increases from 40 to 50, what is the percent increase?",
                                        "answerOptions": ["10%", "20%", "25%", "30%"],
                                        "correctAnswer": "25%",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "You invest $500 at a simple interest rate of 4% per year. How much interest will you earn in 5 years?",
                                        "correctAnswer": "$100",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A baker wants to make a cake that is 200% of the original recipe. If the original recipe calls for 3 cups of sugar, how many cups of sugar does the baker need?",
                                        "answerOptions": ["4 cups", "5 cups", "6 cups", "7 cups"],
                                        "correctAnswer": "6 cups",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "The price of a gallon of gas decreased from $4.00 to $3.50. What was the percent decrease?",
                                        "answerOptions": ["10%", "12.5%", "15%", "17.5%"],
                                        "correctAnswer": "12.5%",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A dinner bill is $80. If you leave a 20% tip, what is the total amount you will pay?",
                                        "correctAnswer": "$96",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "In a survey of 200 people, 80 said they prefer coffee over tea. What percentage of people prefer coffee?",
                                        "answerOptions": ["30%", "35%", "40%", "45%"],
                                        "correctAnswer": "40%",
                                        "difficulty": "medium"
                                    },
                                    // Hard
                                    {
                                        "type": "multiple_choice",
                                        "question": "A computer is priced at $1200. It is first discounted by 15% and then by an additional 10%. What is the final selling price?",
                                        "answerOptions": ["$918", "$924", "$936", "$948"],
                                        "correctAnswer": "$918",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "An investment of $1,500 earns compound interest at a rate of 3% per year, compounded annually. What is the value of the investment after 3 years? (Round to the nearest cent)",
                                        "correctAnswer": "$1639.09",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A store's sales increased by 25% in one year and then decreased by 20% the next year. What was the overall percentage change in sales over the two years?",
                                        "answerOptions": ["0% change", "5% increase", "5% decrease", "10% increase"],
                                        "correctAnswer": "0% change",
                                        "difficulty": "hard"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "math_quant_problem_solving_with_ratios_and_proportions",
                        "title": "Problem Solving with Ratios and Proportions",
                        "description": "Use ratios and proportions to solve real-world problems.",
                        "quizzes": [
                            {
                                "id": "math_quant_ratios_quiz_1",
                                "title": "Ratios and Proportions Quiz 1",
                                "questions": [
                                    // Easy
                                    {
                                        "type": "multiple_choice",
                                        "question": "Simplify the ratio 10:15.",
                                        "answerOptions": ["1:2", "2:3", "3:4", "5:6"],
                                        "correctAnswer": "2:3",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "If there are 5 apples and 7 oranges in a basket, what is the ratio of apples to oranges?",
                                        "correctAnswer": "5:7",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Solve for x in the proportion $\\frac{2}{3} = \\frac{x}{9}$",
                                        "answerOptions": ["4", "5", "6", "7"],
                                        "correctAnswer": "6",
                                        "difficulty": "easy"
                                    },
                                    // Medium
                                    {
                                        "type": "multiple_choice",
                                        "question": "A map has a scale of 1 inch = 20 miles. If two cities are 5 inches apart on the map, how far apart are they in real life?",
                                        "answerOptions": ["80 miles", "90 miles", "100 miles", "120 miles"],
                                        "correctAnswer": "100 miles",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A recipe for a smoothie calls for 3 parts yogurt to 2 parts fruit. If you use 6 ounces of yogurt, how many ounces of fruit should you use?",
                                        "correctAnswer": "4 ounces",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "The ratio of boys to girls in a class is 4:5. If there are 36 students in the class, how many are boys?",
                                        "answerOptions": ["12", "16", "20", "24"],
                                        "correctAnswer": "16",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A car travels 150 miles on 5 gallons of gas. How far can it travel on a full tank of 12 gallons?",
                                        "answerOptions": ["300 miles", "360 miles", "400 miles", "450 miles"],
                                        "correctAnswer": "360 miles",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A company has a ratio of 3 managers for every 10 employees. If there are 130 people in the company, how many managers are there?",
                                        "correctAnswer": "30",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "If it takes 2 hours to paint a room of 400 square feet, how long will it take to paint a room of 1000 square feet at the same rate?",
                                        "answerOptions": ["4 hours", "5 hours", "6 hours", "8 hours"],
                                        "correctAnswer": "5 hours",
                                        "difficulty": "medium"
                                    },
                                    // Hard
                                    {
                                        "type": "multiple_choice",
                                        "question": "In a bag of marbles, the ratio of red to blue marbles is 3:5. The ratio of blue to green marbles is 2:1. What is the ratio of red to green marbles?",
                                        "answerOptions": ["3:1", "6:5", "5:2", "3:2"],
                                        "correctAnswer": "6:5",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "Two numbers are in the ratio 7:4. If the sum of the numbers is 132, what is the larger number?",
                                        "correctAnswer": "84",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A gear ratio is 8:3. If the larger gear makes 120 revolutions, how many revolutions does the smaller gear make?",
                                        "answerOptions": ["45", "160", "240", "320"],
                                        "correctAnswer": "320",
                                        "difficulty": "hard"
                                    }
                                ]
                            },
                            {
                                "id": "math_quant_ratios_quiz_2",
                                "title": "Ratios and Proportions Quiz 2",
                                "questions": [
                                    // Easy
                                    {
                                        "type": "multiple_choice",
                                        "question": "Simplify the ratio 20:25.",
                                        "answerOptions": ["2:3", "3:4", "4:5", "5:6"],
                                        "correctAnswer": "4:5",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "If a recipe calls for 1 cup of sugar for every 2 cups of flour, what is the ratio of sugar to flour?",
                                        "correctAnswer": "1:2",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Solve for x in the proportion $\\frac{3}{5} = \\frac{x}{15}$",
                                        "answerOptions": ["6", "9", "10", "12"],
                                        "correctAnswer": "9",
                                        "difficulty": "easy"
                                    },
                                    // Medium
                                    {
                                        "type": "multiple_choice",
                                        "question": "A model car is built to a scale of 1:18. If the model is 10 inches long, how long is the actual car in inches?",
                                        "answerOptions": ["160 inches", "180 inches", "200 inches", "220 inches"],
                                        "correctAnswer": "180 inches",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A painter mixes 2 parts blue paint with 5 parts yellow paint to get a specific shade of green. If the painter uses 10 gallons of yellow paint, how many gallons of blue paint are needed?",
                                        "correctAnswer": "4 gallons",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "In a group of 45 people, the ratio of men to women is 2:7. How many women are there?",
                                        "answerOptions": ["10", "15", "25", "35"],
                                        "correctAnswer": "35",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A cyclist travels 45 miles in 3 hours. At this rate, how far can the cyclist travel in 5 hours?",
                                        "answerOptions": ["60 miles", "75 miles", "80 miles", "90 miles"],
                                        "correctAnswer": "75 miles",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A school has a student-to-teacher ratio of 15:1. If there are 600 students, how many teachers are there?",
                                        "correctAnswer": "40",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "If 3 pounds of apples cost $5, how much will 9 pounds of apples cost?",
                                        "answerOptions": ["$10", "$12", "$15", "$18"],
                                        "correctAnswer": "$15",
                                        "difficulty": "medium"
                                    },
                                    // Hard
                                    {
                                        "type": "multiple_choice",
                                        "question": "The ratio of the angles in a triangle is 2:3:4. What is the measure of the largest angle?",
                                        "answerOptions": ["60 degrees", "80 degrees", "90 degrees", "100 degrees"],
                                        "correctAnswer": "80 degrees",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A sum of money is divided between two people in the ratio of 4:9. If the person who received the larger share got $180, what was the total sum of money?",
                                        "correctAnswer": "$260",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A work crew of 6 people can complete a job in 8 days. How many fewer days would it take if the crew had 8 people?",
                                        "answerOptions": ["1 day", "2 days", "3 days", "4 days"],
                                        "correctAnswer": "2 days",
                                        "difficulty": "hard"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "math_quant_problem_solving_with_fractions_and_decimals",
                        "title": "Problem Solving with Fractions and Decimals",
                        "description": "Perform operations with fractions and decimals in various contexts.",
                        "quizzes": [
                            {
                                "id": "math_quant_fractions_decimals_quiz_1",
                                "title": "Fractions and Decimals Quiz 1",
                                "questions": [
                                    // Easy
                                    {
                                        "type": "multiple_choice",
                                        "question": "What is the decimal equivalent of the fraction $\\frac{3}{4}$?",
                                        "answerOptions": ["0.25", "0.5", "0.75", "1.25"],
                                        "correctAnswer": "0.75",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "Add the decimals: 1.5 + 2.25",
                                        "correctAnswer": "3.75",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Subtract the fractions: $\\frac{5}{8} - \\frac{1}{4}$",
                                        "answerOptions": ["$\\frac{1}{8}$", "$\\frac{3}{8}$", "$\\frac{1}{2}$", "$\\frac{5}{4}$"],
                                        "correctAnswer": "$\\frac{3}{8}$",
                                        "difficulty": "easy"
                                    },
                                    // Medium
                                    {
                                        "type": "multiple_choice",
                                        "question": "Multiply the fractions: $\\frac{2}{3} \\times \\frac{9}{10}$",
                                        "answerOptions": ["$\\frac{3}{5}$", "$\\frac{2}{5}$", "$\\frac{4}{5}$", "$\\frac{1}{2}$"],
                                        "correctAnswer": "$\\frac{3}{5}$",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "Divide the decimals: 15.6 / 3",
                                        "correctAnswer": "5.2",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A recipe requires $\\frac{3}{4}$ cup of sugar. If you are making half the recipe, how much sugar do you need?",
                                        "answerOptions": ["$\\frac{1}{4}$ cup", "$\\frac{3}{8}$ cup", "$\\frac{1}{2}$ cup", "$\\frac{5}{8}$ cup"],
                                        "correctAnswer": "$\\frac{3}{8}$ cup",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "What is the result of 0.25 multiplied by 1.6?",
                                        "answerOptions": ["0.4", "0.04", "4", "0.32"],
                                        "correctAnswer": "0.4",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A piece of wood is 8.5 feet long. If you cut off a piece that is 3.75 feet long, how long is the remaining piece?",
                                        "correctAnswer": "4.75 feet",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Order the following from least to greatest: 0.8, $\\frac{3}{5}$, 0.75",
                                        "answerOptions": ["0.8, $\\frac{3}{5}$, 0.75", "$\\frac{3}{5}$, 0.75, 0.8", "$\\frac{3}{5}$, 0.8, 0.75", "0.75, 0.8, $\\frac{3}{5}$"],
                                        "correctAnswer": "$\\frac{3}{5}$, 0.75, 0.8",
                                        "difficulty": "medium"
                                    },
                                    // Hard
                                    {
                                        "type": "multiple_choice",
                                        "question": "Divide the fractions: $\\frac{5}{6} \div \\frac{2}{3}$",
                                        "answerOptions": ["$\\frac{5}{4}$", "$\\frac{5}{9}$", "$\\frac{4}{5}$", "$\\frac{9}{5}$"],
                                        "correctAnswer": "$\\frac{5}{4}$",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A car travels at a speed of 60.5 miles per hour. How far will it travel in 2.5 hours?",
                                        "correctAnswer": "151.25 miles",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A tank is $\\frac{2}{5}$ full of water. If 50 gallons are added, the tank is $\\frac{3}{4}$ full. What is the total capacity of the tank in gallons?",
                                        "answerOptions": ["100 gallons", "120 gallons", "150 gallons", "200 gallons"],
                                        "correctAnswer": "100 gallons",
                                        "difficulty": "hard"
                                    }
                                ]
                            },
                            {
                                "id": "math_quant_fractions_decimals_quiz_2",
                                "title": "Fractions and Decimals Quiz 2",
                                "questions": [
                                    // Easy
                                    {
                                        "type": "multiple_choice",
                                        "question": "What is the fraction equivalent of the decimal 0.5?",
                                        "answerOptions": ["$\\frac{1}{4}$", "$\\frac{1}{3}$", "$\\frac{1}{2}$", "$\\frac{3}{4}$"],
                                        "correctAnswer": "$\\frac{1}{2}$",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "Subtract the decimals: 5.75 - 2.5",
                                        "correctAnswer": "3.25",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Add the fractions: $\\frac{1}{3} + \\frac{1}{6}$",
                                        "answerOptions": ["$\\frac{1}{2}$", "$\\frac{2}{3}$", "$\\frac{5}{6}$", "1"],
                                        "correctAnswer": "$\\frac{1}{2}$",
                                        "difficulty": "easy"
                                    },
                                    // Medium
                                    {
                                        "type": "multiple_choice",
                                        "question": "Divide the fractions: $\\frac{3}{4} \div \\frac{1}{2}$",
                                        "answerOptions": ["$\\frac{3}{8}$", "$\\frac{2}{3}$", "$\\frac{3}{2}$", "2"],
                                        "correctAnswer": "$\\frac{3}{2}$",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "Multiply the decimals: 2.5 * 3.2",
                                        "correctAnswer": "8",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A runner ran 2.5 miles on Monday and 3.75 miles on Tuesday. How many miles did the runner run in total?",
                                        "answerOptions": ["5.25 miles", "6 miles", "6.25 miles", "6.5 miles"],
                                        "correctAnswer": "6.25 miles",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A pizza is cut into 8 equal slices. If you eat 3 slices, what fraction of the pizza is left?",
                                        "answerOptions": ["$\\frac{1}{8}$", "$\\frac{3}{8}$", "$\\frac{5}{8}$", "$\\frac{3}{4}$"],
                                        "correctAnswer": "$\\frac{5}{8}$",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A cookie recipe calls for 1.5 cups of flour. If you want to make a triple batch, how many cups of flour do you need?",
                                        "correctAnswer": "4.5 cups",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Which is greater: $\\frac{5}{6}$ or 0.8?",
                                        "answerOptions": ["$\\frac{5}{6}$", "0.8", "They are equal", "Cannot be determined"],
                                        "correctAnswer": "$\\frac{5}{6}$",
                                        "difficulty": "medium"
                                    },
                                    // Hard
                                    {
                                        "type": "multiple_choice",
                                        "question": "A stock price dropped by $\\frac{1}{8}$ of its value. If the original price was $120, what is the new price?",
                                        "answerOptions": ["$100", "$105", "$110", "$115"],
                                        "correctAnswer": "$105",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A container has 4.5 liters of water. If you pour out 1.25 liters and then add 2.5 liters, how much water is in the container?",
                                        "correctAnswer": "5.75 liters",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Three friends share a pizza. The first friend eats $\\frac{1}{3}$ of the pizza, and the second friend eats $\\frac{1}{4}$ of the pizza. What fraction of the pizza is left for the third friend?",
                                        "answerOptions": ["$\\frac{1}{2}$", "$\\frac{5}{12}$", "$\\frac{7}{12}$", "$\\frac{1}{6}$"],
                                        "correctAnswer": "$\\frac{5}{12}$",
                                        "difficulty": "hard"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "math_alg_functions_and_word_problems",
                        "title": "Functions and Word Problems",
                        "description": "Interpret and solve word problems using functions and algebraic reasoning.",
                        "quizzes": [
                            {
                                "id": "math_alg_functions_quiz_1",
                                "title": "Functions and Word Problems Quiz 1",
                                "questions": [
                                    // Easy
                                    {
                                        "type": "multiple_choice",
                                        "question": "If f(x) = 2x + 5, what is the value of f(3)?",
                                        "answerOptions": ["8", "10", "11", "13"],
                                        "correctAnswer": "11",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "If a function is defined by g(t) = t - 8, what is g(10)?",
                                        "correctAnswer": "2",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A movie ticket costs $12. Which function C(t) represents the cost of 't' tickets?",
                                        "answerOptions": ["C(t) = t + 12", "C(t) = 12t", "C(t) = 12 - t", "C(t) = t / 12"],
                                        "correctAnswer": "C(t) = 12t",
                                        "difficulty": "easy"
                                    },
                                    // Medium
                                    {
                                        "type": "multiple_choice",
                                        "question": "Find the slope of the line passing through the points (2, 3) and (4, 7).",
                                        "answerOptions": ["1", "2", "3", "4"],
                                        "correctAnswer": "2",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A car rental company charges $40 per day plus $0.20 per mile. What is the total cost to rent a car for one day and drive 150 miles?",
                                        "correctAnswer": "$70",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "The function h(t) = -16t^2 + 64t gives the height of a ball thrown upwards, in feet, after t seconds. What is the height of the ball after 2 seconds?",
                                        "answerOptions": ["32 feet", "48 feet", "64 feet", "80 feet"],
                                        "correctAnswer": "64 feet",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "The graph of a linear function passes through the point (0, 5) and has a slope of -2. What is the equation of the function?",
                                        "answerOptions": ["y = 5x - 2", "y = -2x + 5", "y = 2x - 5", "y = -5x + 2"],
                                        "correctAnswer": "y = -2x + 5",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "If f(x) = 3x - 2 and g(x) = x + 1, find f(g(3)).",
                                        "correctAnswer": "10",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "John is 4 years older than his sister. If his sister is 's' years old, which expression represents John's age?",
                                        "answerOptions": ["s - 4", "4s", "4 - s", "s + 4"],
                                        "correctAnswer": "s + 4",
                                        "difficulty": "medium"
                                    },
                                    // Hard
                                    {
                                        "type": "multiple_choice",
                                        "question": "A rectangular garden has a length that is 5 meters greater than its width. If the perimeter is 50 meters, what is the width?",
                                        "answerOptions": ["8 meters", "10 meters", "12 meters", "15 meters"],
                                        "correctAnswer": "10 meters",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "The population of a city is modeled by the function P(t) = 100,000 * (1.02)^t, where t is the number of years since 2020. What is the projected population in 2022?",
                                        "correctAnswer": "104040",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Two trains leave a station at the same time, one traveling east at 60 mph and the other west at 75 mph. In how many hours will they be 540 miles apart?",
                                        "answerOptions": ["3 hours", "3.5 hours", "4 hours", "4.5 hours"],
                                        "correctAnswer": "4 hours",
                                        "difficulty": "hard"
                                    }
                                ]
                            },
                            {
                                "id": "math_alg_functions_quiz_2",
                                "title": "Functions and Word Problems Quiz 2",
                                "questions": [
                                    // Easy
                                    {
                                        "type": "multiple_choice",
                                        "question": "If h(x) = 4x - 3, what is the value of h(2)?",
                                        "answerOptions": ["3", "5", "7", "9"],
                                        "correctAnswer": "5",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "If a function is defined by k(n) = 2n + 1, what is k(4)?",
                                        "correctAnswer": "9",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A cell phone plan costs $30 per month plus $0.10 per text message. Which function C(m) represents the monthly cost for 'm' text messages?",
                                        "answerOptions": ["C(m) = 30 + 0.10m", "C(m) = 30.10m", "C(m) = 30m + 0.10", "C(m) = 30.10"],
                                        "correctAnswer": "C(m) = 30 + 0.10m",
                                        "difficulty": "easy"
                                    },
                                    // Medium
                                    {
                                        "type": "multiple_choice",
                                        "question": "Find the slope of the line passing through the points (1, 5) and (3, 1).",
                                        "answerOptions": ["-1", "-2", "-3", "-4"],
                                        "correctAnswer": "-2",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A plumber charges a $50 service fee and $75 per hour of work. How much would a 3-hour job cost?",
                                        "correctAnswer": "$275",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "The value of a car depreciates according to the function V(t) = 20000 * (0.85)^t, where t is the number of years since purchase. What is the value of the car after 2 years?",
                                        "answerOptions": ["$14450", "$15250", "$16150", "$17000"],
                                        "correctAnswer": "$14450",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A line has a y-intercept of -3 and a slope of 4. What is the equation of the line?",
                                        "answerOptions": ["y = 4x - 3", "y = -3x + 4", "y = 4x + 3", "y = 3x - 4"],
                                        "correctAnswer": "y = 4x - 3",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "If f(x) = x^2 + 1, what is f(f(2))?",
                                        "correctAnswer": "26",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Mary has 'd' dimes and 'q' quarters. Which expression represents the total value of her coins in cents?",
                                        "answerOptions": ["d + q", "10d + 25q", "35dq", "0.10d + 0.25q"],
                                        "correctAnswer": "10d + 25q",
                                        "difficulty": "medium"
                                    },
                                    // Hard
                                    {
                                        "type": "multiple_choice",
                                        "question": "The sum of two numbers is 30, and their difference is 6. What is the larger number?",
                                        "answerOptions": ["12", "15", "18", "21"],
                                        "correctAnswer": "18",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A company's profit is modeled by P(x) = -x^2 + 20x - 50, where x is the number of units sold. What is the maximum possible profit?",
                                        "correctAnswer": "$50",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A boat travels upstream at 10 mph and downstream at 16 mph. What is the speed of the current?",
                                        "answerOptions": ["2 mph", "3 mph", "4 mph", "6 mph"],
                                        "correctAnswer": "3 mph",
                                        "difficulty": "hard"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "math_geom_area_perimeter_volume",
                        "title": "Area, Perimeter, and Volume",
                        "description": "Solve problems involving the area, perimeter, and volume of geometric shapes.",
                        "quizzes": [
                            {
                                "id": "math_geom_area_perimeter_volume_quiz_1",
                                "title": "Area, Perimeter, and Volume Quiz 1",
                                "questions": [
                                    // Easy
                                    {
                                        "type": "multiple_choice",
                                        "question": "A rectangle has a length of 8 cm and a width of 5 cm. What is its area?",
                                        "answerOptions": ["13 cm$^2$", "26 cm$^2$", "40 cm$^2$", "80 cm$^2$"],
                                        "correctAnswer": "40 cm$^2$",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A square has a side length of 6 inches. What is its perimeter?",
                                        "correctAnswer": "24 inches",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A cube has a side length of 3 meters. What is its volume?",
                                        "answerOptions": ["9 m$^3$", "12 m$^3$", "18 m$^3$", "27 m$^3$"],
                                        "correctAnswer": "27 m$^3$",
                                        "difficulty": "easy"
                                    },
                                    // Medium
                                    {
                                        "type": "multiple_choice",
                                        "question": "A triangle has a base of 10 feet and a height of 7 feet. What is its area?",
                                        "answerOptions": ["17 ft$^2$", "35 ft$^2$", "70 ft$^2$", "100 ft$^2$"],
                                        "correctAnswer": "35 ft$^2$",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A circle has a radius of 5 cm. What is its circumference? (Use 3.14 for pi)",
                                        "correctAnswer": "31.4 cm",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A rectangular prism has dimensions 4 in x 6 in x 10 in. What is its volume?",
                                        "answerOptions": ["20 in$^3$", "64 in$^3$", "240 in$^3$", "400 in$^3$"],
                                        "correctAnswer": "240 in$^3$",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A rectangular garden is 20 feet long and 15 feet wide. How much fencing is needed to enclose the garden?",
                                        "answerOptions": ["35 feet", "70 feet", "300 feet", "600 feet"],
                                        "correctAnswer": "70 feet",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A circle has a diameter of 12 inches. What is its area? (Use 3.14 for pi)",
                                        "correctAnswer": "113.04 in$^2$",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A right triangle has legs of length 6 cm and 8 cm. What is the length of the hypotenuse?",
                                        "answerOptions": ["10 cm", "12 cm", "14 cm", "16 cm"],
                                        "correctAnswer": "10 cm",
                                        "difficulty": "medium"
                                    },
                                    // Hard
                                    {
                                        "type": "multiple_choice",
                                        "question": "A cylinder has a radius of 4 meters and a height of 10 meters. What is its volume? (Use 3.14 for pi)",
                                        "answerOptions": ["125.6 m$^3$", "251.2 m$^3$", "502.4 m$^3$", "1256 m$^3$"],
                                        "correctAnswer": "502.4 m$^3$",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A trapezoid has bases of length 8 cm and 12 cm, and a height of 5 cm. What is its area?",
                                        "correctAnswer": "50 cm$^2$",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A sphere has a radius of 3 inches. What is its surface area? (Use 3.14 for pi)",
                                        "answerOptions": ["28.26 in$^2$", "56.52 in$^2$", "113.04 in$^2$", "226.08 in$^2$"],
                                        "correctAnswer": "113.04 in$^2$",
                                        "difficulty": "hard"
                                    }
                                ]
                            },
                            {
                                "id": "math_geom_area_perimeter_volume_quiz_2",
                                "title": "Area, Perimeter, and Volume Quiz 2",
                                "questions": [
                                    // Easy
                                    {
                                        "type": "multiple_choice",
                                        "question": "A rectangle has a length of 10 feet and a width of 4 feet. What is its perimeter?",
                                        "answerOptions": ["14 feet", "28 feet", "40 feet", "100 feet"],
                                        "correctAnswer": "28 feet",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A square has an area of 49 cm$^2$. What is the length of one side?",
                                        "correctAnswer": "7 cm",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A rectangular box has a volume of 60 in$^3$. If its length is 5 in and its width is 4 in, what is its height?",
                                        "answerOptions": ["2 in", "3 in", "4 in", "5 in"],
                                        "correctAnswer": "3 in",
                                        "difficulty": "easy"
                                    },
                                    // Medium
                                    {
                                        "type": "multiple_choice",
                                        "question": "A circle has a circumference of 18.84 inches. What is its radius? (Use 3.14 for pi)",
                                        "answerOptions": ["2 inches", "3 inches", "4 inches", "6 inches"],
                                        "correctAnswer": "3 inches",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A triangle has an area of 24 m$^2$ and a height of 8 m. What is the length of its base?",
                                        "correctAnswer": "6 m",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A cylindrical can has a volume of 314 cm$^3$ and a height of 10 cm. What is its radius? (Use 3.14 for pi)",
                                        "answerOptions": ["3 cm", "4 cm", "5 cm", "10 cm"],
                                        "correctAnswer": "3 cm",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "What is the area of a right triangle with a hypotenuse of 13 cm and one leg of 5 cm?",
                                        "answerOptions": ["25 cm$^2$", "30 cm$^2$", "60 cm$^2$", "65 cm$^2$"],
                                        "correctAnswer": "30 cm$^2$",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A room is 12 feet long, 10 feet wide, and 8 feet high. What is the total area of the four walls?",
                                        "correctAnswer": "352 ft$^2$",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "The area of a circle is 78.5 square units. What is its diameter? (Use 3.14 for pi)",
                                        "answerOptions": ["5 units", "10 units", "12.5 units", "25 units"],
                                        "correctAnswer": "10 units",
                                        "difficulty": "medium"
                                    },
                                    // Hard
                                    {
                                        "type": "multiple_choice",
                                        "question": "A cone has a radius of 6 inches and a height of 8 inches. What is its volume? (Use 3.14 for pi)",
                                        "answerOptions": ["150.72 in$^3$", "301.44 in$^3$", "602.88 in$^3$", "904.32 in$^3$"],
                                        "correctAnswer": "301.44 in$^3$",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "A sphere has a volume of 904.32 cm$^3$. What is its radius? (Use 3.14 for pi)",
                                        "correctAnswer": "6 cm",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A rectangular swimming pool is 25 meters long, 10 meters wide, and 2 meters deep. The water is filled to 0.5 meters from the top. What is the volume of the water in the pool?",
                                        "answerOptions": ["375 m$^3$", "400 m$^3$", "450 m$^3$", "500 m$^3$"],
                                        "correctAnswer": "375 m$^3$",
                                        "difficulty": "hard"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            "Algebraic Problem Solving": {
                "description": "Work with algebraic expressions, equations, inequalities, and functions.",
                "topics": [
                    {
                        "id": "math_alg_expressions_and_equations",
                        "title": "Expressions and Equations",
                        "description": "Simplify expressions and solve linear equations.",
                        "quizzes": [
                            {
                                "id": "math_alg_expressions_quiz_1",
                                "title": "Expressions and Equations Quiz 1",
                                "questions": [
                                    // Easy
                                    {
                                        "type": "multiple_choice",
                                        "question": "Simplify the expression: 3x + 5x - 2x",
                                        "answerOptions": ["4x", "5x", "6x", "8x"],
                                        "correctAnswer": "6x",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "Solve for x: x + 7 = 15",
                                        "correctAnswer": "8",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Evaluate the expression 2a + 3b for a = 4 and b = 2.",
                                        "answerOptions": ["10", "12", "14", "16"],
                                        "correctAnswer": "14",
                                        "difficulty": "easy"
                                    },
                                    // Medium
                                    {
                                        "type": "multiple_choice",
                                        "question": "Solve for y: 3y - 5 = 16",
                                        "answerOptions": ["5", "6", "7", "8"],
                                        "correctAnswer": "7",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "Simplify the expression: 4(2x - 3) + 5",
                                        "correctAnswer": "8x - 7",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Solve for z: $\\frac{z}{4} + 2 = 5$",
                                        "answerOptions": ["8", "10", "12", "14"],
                                        "correctAnswer": "12",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "The sum of three consecutive integers is 45. What is the smallest of the three integers?",
                                        "answerOptions": ["13", "14", "15", "16"],
                                        "correctAnswer": "14",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "Solve for a: 5a + 9 = 2a + 24",
                                        "correctAnswer": "5",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Write an algebraic expression for 'five less than twice a number x'.",
                                        "answerOptions": ["5 - 2x", "2x - 5", "2(x - 5)", "2(5 - x)"],
                                        "correctAnswer": "2x - 5",
                                        "difficulty": "medium"
                                    },
                                    // Hard
                                    {
                                        "type": "multiple_choice",
                                        "question": "Solve for x: 2(x + 3) - 3(x - 1) = 10",
                                        "answerOptions": ["-1", "0", "1", "2"],
                                        "correctAnswer": "-1",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "Solve the inequality: 3x - 7 > 2x + 1",
                                        "correctAnswer": "x > 8",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A rectangle has a perimeter of 40 cm. The length is 4 cm more than the width. What is the area of the rectangle?",
                                        "answerOptions": ["84 cm$^2$", "96 cm$^2$", "100 cm$^2$", "108 cm$^2$"],
                                        "correctAnswer": "96 cm$^2$",
                                        "difficulty": "hard"
                                    }
                                ]
                            },
                            {
                                "id": "math_alg_expressions_quiz_2",
                                "title": "Expressions and Equations Quiz 2",
                                "questions": [
                                    // Easy
                                    {
                                        "type": "multiple_choice",
                                        "question": "Simplify the expression: 7y - 2y + 4y",
                                        "answerOptions": ["5y", "7y", "9y", "13y"],
                                        "correctAnswer": "9y",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "Solve for x: x - 5 = 12",
                                        "correctAnswer": "17",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Evaluate the expression 4c - 2d for c = 5 and d = 3.",
                                        "answerOptions": ["10", "12", "14", "16"],
                                        "correctAnswer": "14",
                                        "difficulty": "easy"
                                    },
                                    // Medium
                                    {
                                        "type": "multiple_choice",
                                        "question": "Solve for b: 4b + 7 = 31",
                                        "answerOptions": ["5", "6", "7", "8"],
                                        "correctAnswer": "6",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "Simplify the expression: 3(x + 5) - 8",
                                        "correctAnswer": "3x + 7",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Solve for m: $\\frac{m}{3} - 1 = 4$",
                                        "answerOptions": ["9", "12", "15", "18"],
                                        "correctAnswer": "15",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "The perimeter of a square is 28 inches. What is the length of one side?",
                                        "answerOptions": ["5 inches", "6 inches", "7 inches", "8 inches"],
                                        "correctAnswer": "7 inches",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "Solve for y: 7y - 11 = 3y + 5",
                                        "correctAnswer": "4",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Write an algebraic expression for 'the product of a number n and 8, increased by 3'.",
                                        "answerOptions": ["8n + 3", "8(n + 3)", "3n + 8", "n + 8 + 3"],
                                        "correctAnswer": "8n + 3",
                                        "difficulty": "medium"
                                    },
                                    // Hard
                                    {
                                        "type": "multiple_choice",
                                        "question": "Solve for x: $\\frac{2x + 1}{3} = 5$",
                                        "answerOptions": ["5", "6", "7", "8"],
                                        "correctAnswer": "7",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "Solve the inequality: 2(x - 4) < 10",
                                        "correctAnswer": "x < 9",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "A taxi service charges $2.50 as a flat fee plus $1.50 per mile. If a ride costs $14.50, how many miles was the ride?",
                                        "answerOptions": ["6 miles", "7 miles", "8 miles", "9 miles"],
                                        "correctAnswer": "8 miles",
                                        "difficulty": "hard"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            "Geometry": {
                "description": "Apply geometric concepts involving points, lines, angles, and two- and three-dimensional figures.",
                "topics": [
                    {
                        "id": "math_geom_formulas",
                        "title": "Formulas",
                        "description": "Apply formulas for area, perimeter, circumference, and volume.",
                        "quizzes": [
                            {
                                "id": "math_geom_formulas_quiz_1",
                                "title": "Formulas Quiz 1",
                                "questions": [
                                    // Easy
                                    {
                                        "type": "multiple_choice",
                                        "question": "What is the formula for the area of a rectangle?",
                                        "answerOptions": ["A = l + w", "A = 2(l + w)", "A = l * w", "A = l / w"],
                                        "correctAnswer": "A = l * w",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "What is the formula for the perimeter of a square with side length 's'?",
                                        "correctAnswer": "P = 4s",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "The formula for the circumference of a circle is C = 2 * pi * r. What does 'r' represent?",
                                        "answerOptions": ["radius", "diameter", "area", "circumference"],
                                        "correctAnswer": "radius",
                                        "difficulty": "easy"
                                    },
                                    // Medium
                                    {
                                        "type": "multiple_choice",
                                        "question": "What is the formula for the area of a triangle?",
                                        "answerOptions": ["A = b * h", "A = 1/2 * b * h", "A = 2 * b * h", "A = b / h"],
                                        "correctAnswer": "A = 1/2 * b * h",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "What is the formula for the volume of a rectangular prism (a box)?",
                                        "correctAnswer": "V = l * w * h",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "The Pythagorean theorem is stated as a^2 + b^2 = c^2. In a right triangle, what does 'c' represent?",
                                        "answerOptions": ["the shortest side", "the hypotenuse", "the area", "the perimeter"],
                                        "correctAnswer": "the hypotenuse",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "What is the formula for the area of a circle?",
                                        "answerOptions": ["A = pi * r", "A = 2 * pi * r", "A = pi * r^2", "A = pi * d"],
                                        "correctAnswer": "A = pi * r^2",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "What is the formula for the distance between two points (x1, y1) and (x2, y2) in a coordinate plane?",
                                        "correctAnswer": "d = sqrt((x2 - x1)^2 + (y2 - y1)^2)",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "The formula for simple interest is I = Prt. What does 'P' stand for?",
                                        "answerOptions": ["Profit", "Principal", "Percentage", "Period"],
                                        "correctAnswer": "Principal",
                                        "difficulty": "medium"
                                    },
                                    // Hard
                                    {
                                        "type": "multiple_choice",
                                        "question": "What is the formula for the volume of a cylinder?",
                                        "answerOptions": ["V = pi * r * h", "V = 2 * pi * r * h", "V = pi * r^2 * h", "V = 1/3 * pi * r^2 * h"],
                                        "correctAnswer": "V = pi * r^2 * h",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "What is the formula for the surface area of a sphere?",
                                        "correctAnswer": "A = 4 * pi * r^2",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "What is the quadratic formula, used to solve equations of the form ax^2 + bx + c = 0?",
                                        "answerOptions": ["x = (-b +/- sqrt(b^2 - 4ac)) / 2a", "x = (b +/- sqrt(b^2 - 4ac)) / 2a", "x = (-b +/- sqrt(b^2 + 4ac)) / 2a", "x = (-b +/- sqrt(b^2 - 4ac)) / a"],
                                        "correctAnswer": "x = (-b +/- sqrt(b^2 - 4ac)) / 2a",
                                        "difficulty": "hard"
                                    }
                                ]
                            },
                            {
                                "id": "math_geom_formulas_quiz_2",
                                "title": "Formulas Quiz 2",
                                "questions": [
                                    // Easy
                                    {
                                        "type": "multiple_choice",
                                        "question": "What is the formula for the perimeter of a rectangle?",
                                        "answerOptions": ["P = l * w", "P = 2l + 2w", "P = l + w", "P = 4s"],
                                        "correctAnswer": "P = 2l + 2w",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "In the formula C = pi * d for the circumference of a circle, what does 'd' represent?",
                                        "correctAnswer": "diameter",
                                        "difficulty": "easy"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "What is the formula for the volume of a cube with side length 's'?",
                                        "answerOptions": ["V = s^2", "V = 3s", "V = 6s^2", "V = s^3"],
                                        "correctAnswer": "V = s^3",
                                        "difficulty": "easy"
                                    },
                                    // Medium
                                    {
                                        "type": "multiple_choice",
                                        "question": "What is the formula for the area of a trapezoid?",
                                        "answerOptions": ["A = 1/2 * (b1 + b2) * h", "A = (b1 + b2) * h", "A = 1/2 * b * h", "A = b1 * b2 * h"],
                                        "correctAnswer": "A = 1/2 * (b1 + b2) * h",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "What is the formula for the volume of a cone?",
                                        "correctAnswer": "V = 1/3 * pi * r^2 * h",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "What is the formula for the slope 'm' of a line passing through points (x1, y1) and (x2, y2)?",
                                        "answerOptions": ["m = (y2 + y1) / (x2 + x1)", "m = (x2 - x1) / (y2 - y1)", "m = (y2 - y1) / (x2 - x1)", "m = y2 - y1 - x2 + x1"],
                                        "correctAnswer": "m = (y2 - y1) / (x2 - x1)",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "In the compound interest formula A = P(1 + r/n)^(nt), what does 'A' represent?",
                                        "answerOptions": ["The principal amount", "The annual interest rate", "The number of times interest is compounded per year", "The future value of the investment/loan"],
                                        "correctAnswer": "The future value of the investment/loan",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "What is the formula for the area of a parallelogram?",
                                        "correctAnswer": "A = b * h",
                                        "difficulty": "medium"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Which formula correctly represents the relationship between the diameter (d) and radius (r) of a circle?",
                                        "answerOptions": ["d = 2r", "r = 2d", "d = pi*r", "r = pi*d"],
                                        "correctAnswer": "d = 2r",
                                        "difficulty": "medium"
                                    },
                                    // Hard
                                    {
                                        "type": "multiple_choice",
                                        "question": "What is the formula for the volume of a sphere?",
                                        "answerOptions": ["V = 4 * pi * r^2", "V = 4/3 * pi * r^3", "V = pi * r^3", "V = 2/3 * pi * r^3"],
                                        "correctAnswer": "V = 4/3 * pi * r^3",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "fill_in_the_blank",
                                        "question": "What is the formula for the surface area of a cylinder?",
                                        "correctAnswer": "A = 2 * pi * r^2 + 2 * pi * r * h",
                                        "difficulty": "hard"
                                    },
                                    {
                                        "type": "multiple_choice",
                                        "question": "Heron's formula is used to find the area of a triangle when the lengths of all three sides are known. What is the formula, where 's' is the semi-perimeter?",
                                        "answerOptions": ["A = sqrt(s(s-a)(s-b)(s-c))", "A = s(s-a)(s-b)(s-c)", "A = sqrt(s(a+b+c))", "A = (s(s-a)(s-b)(s-c))/2"],
                                        "correctAnswer": "A = sqrt(s(s-a)(s-b)(s-c))",
                                        "difficulty": "hard"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    }
};
