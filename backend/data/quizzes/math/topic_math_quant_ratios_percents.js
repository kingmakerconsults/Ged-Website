module.exports = [
  {
    "questionNumber": 1,
    "calculator": false,
    "question": "A shirt that originally costs $40 is on sale for $25\\%$ off. What is the sale price of the shirt?",
    "answerOptions": [
      {
        "text": "$10",
        "isCorrect": false,
        "rationale": "This is the discount amount, not the final price."
      },
      {
        "text": "$30",
        "isCorrect": true,
        "rationale": "The discount is $25\\%$ of $\\$40$, which is $0.25 \\times 40 = \\$10$. The sale price is $\\$40 - \\$10 = \\$30$."
      },
      {
        "text": "$50",
        "isCorrect": false,
        "rationale": "This is the price after a 25% increase."
      },
      {
        "text": "$35",
        "isCorrect": false,
        "rationale": "This is a calculation error."
      }
    ]
  },
  {
    "questionNumber": 2,
    "calculator": false,
    "question": "A map has a scale where 1 inch represents 50 miles. If two cities are 3.5 inches apart on the map, what is the actual distance between them?",
    "answerOptions": [
      {
        "text": "150 miles",
        "isCorrect": false,
        "rationale": "This is a calculation error."
      },
      {
        "text": "175 miles",
        "isCorrect": true,
        "rationale": "Set up a proportion: $\\frac{1 \\text{ in}}{50 \\text{ mi}} = \\frac{3.5 \\text{ in}}{x \\text{ mi}}$. Solving for x gives $3.5 \\times 50 = 175$ miles."
      },
      {
        "text": "200 miles",
        "isCorrect": false,
        "rationale": "This is a calculation error."
      },
      {
        "text": "14.3 miles",
        "isCorrect": false,
        "rationale": "This is division, not multiplication."
      }
    ]
  },
  {
    "questionNumber": 3,
    "calculator": false,
    "question": "In a bag of marbles, the ratio of blue marbles to red marbles is $3:5$. If there are 15 red marbles, how many blue marbles are there?",
    "answerOptions": [
      {
        "text": "9",
        "isCorrect": true,
        "rationale": "Set up a proportion: $\\frac{3 \\text{ blue}}{5 \\text{ red}} = \\frac{x \\text{ blue}}{15 \\text{ red}}$. To get from 5 to 15, you multiply by 3. So, multiply 3 by 3 to get 9."
      },
      {
        "text": "25",
        "isCorrect": false,
        "rationale": "This would be the result if the ratio were 5:3."
      },
      {
        "text": "15",
        "isCorrect": false,
        "rationale": "This is the number of red marbles."
      },
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "This is part of the ratio, not the final number."
      }
    ]
  },
  {
    "questionNumber": 4,
    "calculator": false,
    "question": "A restaurant bill is $80. If you want to leave a $20\\%$ tip, how much should the tip be?",
    "answerOptions": [
      {
        "text": "$8",
        "isCorrect": false,
        "rationale": "This would be a 10% tip."
      },
      {
        "text": "$16",
        "isCorrect": true,
        "rationale": "$20\\%$ of $\\$80$ is $0.20 \\times 80 = \\$16$."
      },
      {
        "text": "$20",
        "isCorrect": false,
        "rationale": "This would be a 25% tip."
      },
      {
        "text": "$96",
        "isCorrect": false,
        "rationale": "This is the total bill plus the tip."
      }
    ]
  },
  {
    "questionNumber": 5,
    "calculator": false,
    "question": "You scored 45 out of 50 on a test. What is your score as a percentage?",
    "answerOptions": [
      {
        "text": "$85\\%$",
        "isCorrect": false,
        "rationale": "This is a calculation error."
      },
      {
        "text": "$90\\%$",
        "isCorrect": true,
        "rationale": "$(\\frac{45}{50}) \\times 100 = 0.9 \\times 100 = 90\\%$."
      },
      {
        "text": "$95\\%$",
        "isCorrect": false,
        "rationale": "This is a calculation error."
      },
      {
        "text": "$45\\%$",
        "isCorrect": false,
        "rationale": "This is the raw score, not the percentage."
      }
    ]
  },
  {
    "questionNumber": 6,
    "calculator": true,
    "question": "The price of a computer increased from $500 to $600. What was the percent increase?",
    "answerOptions": [
      {
        "text": "$10\\%$",
        "isCorrect": false,
        "rationale": "This is a calculation error."
      },
      {
        "text": "$20\\%$",
        "isCorrect": true,
        "rationale": "The increase is $\\$100$. The percent increase is (increase / original price) * 100 = (100 / 500) * 100 = $0.2 \\times 100 = 20\\%$."
      },
      {
        "text": "$25\\%$",
        "isCorrect": false,
        "rationale": "This is a calculation error."
      },
      {
        "text": "$100\\%$",
        "isCorrect": false,
        "rationale": "This would mean the price doubled."
      }
    ]
  },
  {
    "questionNumber": 7,
    "calculator": true,
    "question": "A car can travel 300 miles on 12 gallons of gasoline. How many gallons are needed to travel 450 miles?",
    "answerOptions": [
      {
        "text": "15 gallons",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "18 gallons",
        "isCorrect": true,
        "rationale": "The car gets $\\frac{300}{12} = 25$ miles per gallon. To travel 450 miles, you need $\\frac{450}{25} = 18$ gallons."
      },
      {
        "text": "20 gallons",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "24 gallons",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ]
  },
  {
    "questionNumber": 8,
    "calculator": true,
    "question": "A survey of 200 people found that 120 of them prefer coffee to tea. What is the ratio of people who prefer coffee to the total number of people surveyed, in simplest form?",
    "answerOptions": [
      {
        "text": "$120:200$",
        "isCorrect": false,
        "rationale": "This is the correct ratio but not in simplest form."
      },
      {
        "text": "$3:5$",
        "isCorrect": true,
        "rationale": "The ratio is $\\frac{120}{200}$. Divide both sides by the greatest common divisor, 40, to get $\\frac{3}{5}$."
      },
      {
        "text": "$2:3$",
        "isCorrect": false,
        "rationale": "This is the ratio of tea drinkers to coffee drinkers."
      },
      {
        "text": "$3:2$",
        "isCorrect": false,
        "rationale": "This is the ratio of coffee drinkers to tea drinkers."
      }
    ]
  },
  {
    "questionNumber": 9,
    "calculator": true,
    "question": "If sales tax is $7\\%$, how much tax would you pay on a $150 purchase?",
    "answerOptions": [
      {
        "text": "$7.00",
        "isCorrect": false,
        "rationale": "This is a calculation error."
      },
      {
        "text": "$10.50",
        "isCorrect": true,
        "rationale": "$7\\%$ of $\\$150$ is $0.07 \\times 150 = \\$10.50$."
      },
      {
        "text": "$15.00",
        "isCorrect": false,
        "rationale": "This would be a 10% tax."
      },
      {
        "text": "$1.05",
        "isCorrect": false,
        "rationale": "This is a decimal placement error."
      }
    ]
  },
  {
    "questionNumber": 10,
    "calculator": true,
    "question": "A recipe calls for 2 cups of sugar for every 5 cups of flour. If you use 15 cups of flour, how much sugar do you need?",
    "answerOptions": [
      {
        "text": "4 cups",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "5 cups",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "6 cups",
        "isCorrect": true,
        "rationale": "The ratio is $\\frac{2}{5}$. Set up the proportion $\\frac{2}{5} = \\frac{x}{15}$. To get from 5 to 15, you multiply by 3. So, $2 \\times 3 = 6$ cups."
      },
      {
        "text": "7.5 cups",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ]
  },
  {
    "questionNumber": 11,
    "calculator": true,
    "question": "A store buys a TV for $200 and marks it up by $60\\%$ to sell. What is the selling price?",
    "answerOptions": [
      {
        "text": "$260",
        "isCorrect": false,
        "rationale": "This would be a 30% markup."
      },
      {
        "text": "$320",
        "isCorrect": true,
        "rationale": "The markup is $60\\%$ of $\\$200$, which is $0.60 \\times 200 = \\$120$. The selling price is $\\$200 + \\$120 = \\$320$."
      },
      {
        "text": "$280",
        "isCorrect": false,
        "rationale": "This would be a 40% markup."
      },
      {
        "text": "$120",
        "isCorrect": false,
        "rationale": "This is the markup amount, not the final price."
      }
    ]
  },
  {
    "questionNumber": 12,
    "calculator": true,
    "question": "If a city's population grew by $5\\%$ last year and the original population was 80,000, what is the new population?",
    "answerOptions": [
      {
        "text": "80,400",
        "isCorrect": false,
        "rationale": "This is a calculation error."
      },
      {
        "text": "84,000",
        "isCorrect": true,
        "rationale": "The growth is $5\\%$ of 80,000, which is $0.05 \\times 80,000 = 4,000$. The new population is $80,000 + 4,000 = 84,000$."
      },
      {
        "text": "85,000",
        "isCorrect": false,
        "rationale": "This is a calculation error."
      },
      {
        "text": "120,000",
        "isCorrect": false,
        "rationale": "This would be a 50% growth."
      }
    ]
  },
  {
    "questionNumber": 13,
    "calculator": true,
    "question": "Two numbers are in the ratio of $7:4$. If the smaller number is 28, what is the larger number?",
    "answerOptions": [
      {
        "text": "49",
        "isCorrect": true,
        "rationale": "The ratio is $\\frac{7}{4}$. Set up the proportion $\\frac{7}{4} = \\frac{x}{28}$. To get from 4 to 28, you multiply by 7. So, $7 \\times 7 = 49$."
      },
      {
        "text": "16",
        "isCorrect": false,
        "rationale": "This is a calculation error."
      },
      {
        "text": "56",
        "isCorrect": false,
        "rationale": "This is a calculation error."
      },
      {
        "text": "28",
        "isCorrect": false,
        "rationale": "This is the smaller number."
      }
    ]
  },
  {
    "questionNumber": 14,
    "calculator": true,
    "question": "A company has 500 employees. If $15\\%$ of the employees have been with the company for more than 10 years, how many employees is that?",
    "answerOptions": [
      {
        "text": "50",
        "isCorrect": false,
        "rationale": "This would be 10%."
      },
      {
        "text": "75",
        "isCorrect": true,
        "rationale": "$15\\%$ of 500 is $0.15 \\times 500 = 75$ employees."
      },
      {
        "text": "100",
        "isCorrect": false,
        "rationale": "This would be 20%."
      },
      {
        "text": "150",
        "isCorrect": false,
        "rationale": "This would be 30%."
      }
    ]
  },
  {
    "questionNumber": 15,
    "calculator": true,
    "question": "If you need to mix cement and sand in a ratio of $1:3$, how much sand would you need if you use 5 bags of cement?",
    "answerOptions": [
      {
        "text": "3 bags",
        "isCorrect": false,
        "rationale": "This is the ratio value, not the total amount."
      },
      {
        "text": "5 bags",
        "isCorrect": false,
        "rationale": "This is the amount of cement."
      },
      {
        "text": "15 bags",
        "isCorrect": true,
        "rationale": "The ratio is 1 part cement to 3 parts sand. If you have 5 bags of cement, you need $5 \\times 3 = 15$ bags of sand."
      },
      {
        "text": "20 bags",
        "isCorrect": false,
        "rationale": "This is the total number of bags."
      }
    ]
  },
  {
    "questionNumber": 16,
    "calculator": true,
    "question": "A runner completes 8 laps around a track in 12 minutes. At this rate, how many laps can the runner complete in 30 minutes?",
    "answerOptions": [
      {
        "text": "15 laps",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "20 laps",
        "isCorrect": true,
        "rationale": "The runner's rate is $\\frac{12 \\text{ min}}{8 \\text{ laps}} = 1.5$ minutes per lap. In 30 minutes, the runner can complete $\\frac{30}{1.5} = 20$ laps. Alternatively, set up a proportion: $\\frac{8}{12} = \\frac{x}{30}$, which gives $12x = 240$, so $x=20$."
      },
      {
        "text": "24 laps",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "18 laps",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ]
  },
  {
    "questionNumber": 17,
    "calculator": true,
    "question": "The ratio of boys to girls in a school is 5:6. If there are 240 girls, what is the total number of students in the school?",
    "answerOptions": [
      {
        "text": "200",
        "isCorrect": false,
        "rationale": "This is the number of boys, not the total number of students."
      },
      {
        "text": "440",
        "isCorrect": true,
        "rationale": "Set up the proportion $\\frac{5 \\text{ boys}}{6 \\text{ girls}} = \\frac{x \\text{ boys}}{240 \\text{ girls}}$. This gives $6x = 1200$, so $x = 200$ boys. The total number of students is 200 boys + 240 girls = 440."
      },
      {
        "text": "480",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "540",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ]
  },
  {
    "questionNumber": 18,
    "calculator": true,
    "question": "A pair of jeans originally priced at $75 is on sale for 40% off. What is the sale price?",
    "answerOptions": [
      {
        "text": "$30",
        "isCorrect": false,
        "rationale": "This is the discount amount, not the final sale price."
      },
      {
        "text": "$45",
        "isCorrect": true,
        "rationale": "The discount is $40\\%$ of $\\$75$, which is $0.40 \\times 75 = \\$30$. The sale price is the original price minus the discount: $\\$75 - \\$30 = \\$45$."
      },
      {
        "text": "$105",
        "isCorrect": false,
        "rationale": "This is the original price plus the discount amount."
      },
      {
        "text": "$55",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ]
  }
];
