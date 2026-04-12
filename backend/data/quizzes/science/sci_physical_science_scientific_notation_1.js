// Physical Science questions with scientific notation in answer options (KaTeX-rendered)
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "difficulty": "hard",
    "passage": "The color of light can be expressed in terms of either frequency (ν) or wavelength (λ), which has units of nanometers (nm). The equation that relates the frequency and wavelength of light with the speed of light (c) is:\n\nν = c / λ\n\nThe speed of light is a constant and approximately equal to 300,000,000 meters per second.\n\nGreen lasers emit light at a wavelength of 532 nm. However, the material that is used to make most green lasers does not emit light at 532 nm. Instead, it emits light at a different wavelength, and the laser then uses a \"frequency doubler.\" This doubles the frequency of the emitted light, and the resultant light is the green 532 nm that we observe.\n\n1 meter is equal to 1,000,000,000 nanometers.",
    "question": "What is the output light frequency of the material used before doubling?",
    "answerOptions": [
      {
        "text": "$1.8 \\times 10^{14}$ Hz",
        "rationale": "This does not match any correct calculation path.",
        "isCorrect": false
      },
      {
        "text": "$2.8 \\times 10^{14}$ Hz",
        "rationale": "Correct. Green light frequency = c/λ = 3×10⁸ / (532×10⁻⁹) ≈ 5.64×10¹⁴ Hz. Before doubling: 5.64×10¹⁴ / 2 ≈ 2.8×10¹⁴ Hz.",
        "isCorrect": true
      },
      {
        "text": "$5.6 \\times 10^{14}$ Hz",
        "rationale": "This is the frequency of the green 532 nm light, not the frequency before doubling.",
        "isCorrect": false
      },
      {
        "text": "$1.1 \\times 10^{15}$ Hz",
        "rationale": "This would be the frequency if wavelength were halved rather than frequency being halved.",
        "isCorrect": false
      }
    ],
    "challenge_tags": ["science-1"],
    "skillIntent": "formula-application",
    "category": "Physical Science",
    "calculator": true
  },
  {
    "questionNumber": 2,
    "type": "multipleChoice",
    "difficulty": "medium",
    "passage": "The energy of a single photon of light can be calculated using the formula:\n\nE = hν\n\nwhere h is Planck's constant ($6.63 \\times 10^{-34}$ J·s) and ν is the frequency of the light in Hz.\n\nA red laser pointer emits light with a frequency of $4.6 \\times 10^{14}$ Hz.",
    "question": "What is the energy of a single photon from this red laser pointer?",
    "answerOptions": [
      {
        "text": "$3.0 \\times 10^{-19}$ J",
        "rationale": "Correct. E = hν = (6.63×10⁻³⁴)(4.6×10¹⁴) = 3.05×10⁻¹⁹ ≈ 3.0×10⁻¹⁹ J.",
        "isCorrect": true
      },
      {
        "text": "$3.0 \\times 10^{-48}$ J",
        "rationale": "This results from multiplying exponents incorrectly (−34 × 14 instead of −34 + 14).",
        "isCorrect": false
      },
      {
        "text": "$6.9 \\times 10^{20}$ J",
        "rationale": "This results from dividing ν by h instead of multiplying.",
        "isCorrect": false
      },
      {
        "text": "$1.4 \\times 10^{-48}$ J",
        "rationale": "This does not correspond to any correct use of the formula.",
        "isCorrect": false
      }
    ],
    "challenge_tags": ["science-1"],
    "skillIntent": "formula-application",
    "category": "Physical Science",
    "calculator": true
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "difficulty": "medium",
    "passage": "The speed of sound in air at 20°C is approximately 343 meters per second. The relationship between speed (v), frequency (f), and wavelength (λ) is:\n\nv = f × λ\n\nA dog whistle produces sound at a frequency of $2.5 \\times 10^{4}$ Hz, which is above the range of human hearing.",
    "question": "What is the wavelength of the sound produced by the dog whistle?",
    "answerOptions": [
      {
        "text": "$1.37 \\times 10^{-2}$ m",
        "rationale": "Correct. λ = v / f = 343 / (2.5×10⁴) = 0.01372 m ≈ 1.37×10⁻² m.",
        "isCorrect": true
      },
      {
        "text": "$1.37 \\times 10^{2}$ m",
        "rationale": "This results from multiplying instead of dividing.",
        "isCorrect": false
      },
      {
        "text": "$8.6 \\times 10^{6}$ m",
        "rationale": "This results from multiplying v × f instead of dividing v by f.",
        "isCorrect": false
      },
      {
        "text": "$7.3 \\times 10^{1}$ m",
        "rationale": "This does not correspond to any correct application of the formula.",
        "isCorrect": false
      }
    ],
    "challenge_tags": ["science-1"],
    "skillIntent": "formula-application",
    "category": "Physical Science",
    "calculator": true
  },
  {
    "questionNumber": 4,
    "type": "multipleChoice",
    "difficulty": "hard",
    "passage": "The gravitational force between two objects can be calculated using Newton's law of universal gravitation:\n\nF = G × (m₁ × m₂) / r²\n\nwhere G = $6.67 \\times 10^{-11}$ N·m²/kg², m₁ and m₂ are the masses in kilograms, and r is the distance between the centers of the objects in meters.\n\nThe mass of the Earth is approximately $6.0 \\times 10^{24}$ kg, and the mass of the Moon is approximately $7.3 \\times 10^{22}$ kg. The average distance between their centers is approximately $3.8 \\times 10^{8}$ m.",
    "question": "What is the approximate gravitational force between the Earth and the Moon?",
    "answerOptions": [
      {
        "text": "$2.0 \\times 10^{20}$ N",
        "rationale": "Correct. F = (6.67×10⁻¹¹)(6.0×10²⁴)(7.3×10²²) / (3.8×10⁸)² = 2.92×10³⁷ / 1.44×10¹⁷ ≈ 2.0×10²⁰ N.",
        "isCorrect": true
      },
      {
        "text": "$2.9 \\times 10^{37}$ N",
        "rationale": "This is the numerator only — it omits dividing by r².",
        "isCorrect": false
      },
      {
        "text": "$7.7 \\times 10^{28}$ N",
        "rationale": "This results from dividing by r instead of r².",
        "isCorrect": false
      },
      {
        "text": "$2.0 \\times 10^{-20}$ N",
        "rationale": "The exponent sign is wrong; the force between Earth and Moon is extremely large, not tiny.",
        "isCorrect": false
      }
    ],
    "challenge_tags": ["science-1"],
    "skillIntent": "formula-application",
    "category": "Physical Science",
    "calculator": true
  }
];
