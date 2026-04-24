/**
 * GED Ready-Style Earth & Space Science — Passages and Charts
 * Modeled after GED Ready® Science exam format:
 *   - Passages on weather systems, plate tectonics, astronomy
 *   - Chart/table-based items on the rock cycle and climate data
 *   - Calculator available; no out-of-whitelist formulas required
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    difficulty: 'medium',
    topic: 'Earth & Space Science',
    contentArea: 'earth_space',
    calculatorAllowed: true,
    passage:
      'This passage describes how hurricanes form.\n\nHurricanes (also called tropical cyclones or typhoons) form over warm tropical ocean water, generally where sea-surface temperatures are at least about 26.5 °C (80 °F). Warm, moist air rises rapidly from the ocean surface, leaving an area of low pressure below. As surrounding air rushes in to replace it, the rotation of the Earth (the Coriolis effect) deflects the moving air, setting up a large rotating storm system. As the rising moist air cools higher in the atmosphere, water vapor condenses into clouds and rain, releasing latent heat. That released heat warms the air further, drives even stronger updrafts, and pulls in more moist air at the surface — a feedback loop that powers the storm.\n\nWhen a hurricane moves over land or over cooler water, it loses its main fuel source (warm, moist ocean air) and weakens. This is why hurricanes are most intense over warm oceans and rapidly weaken once they make landfall.',
    question:
      'Based on the passage, why do hurricanes typically weaken quickly after they move over land?',
    answerOptions: [
      {
        text: 'Friction with land surfaces immediately stops the rotation of the storm.',
        rationale:
          'Friction does play a small role, but the passage emphasizes loss of fuel (warm, moist ocean air) as the main reason for weakening, not the immediate stopping of rotation.',
        isCorrect: false,
      },
      {
        text: "Land removes the storm's main energy source — warm, moist ocean air — so the feedback loop driving the storm shuts down.",
        rationale:
          'Correct. The passage explicitly says hurricanes lose their "main fuel source (warm, moist ocean air)" when they cross land or cooler water, weakening the feedback loop that powered them.',
        isCorrect: true,
      },
      {
        text: 'The Coriolis effect reverses direction over land, canceling the storm.',
        rationale:
          "The Coriolis effect does not reverse over land. It depends on Earth's rotation and latitude, not on whether the storm is over ocean or land.",
        isCorrect: false,
      },
      {
        text: 'Hurricanes are absorbed by mountain ranges and re-released as snowstorms.',
        rationale:
          'The passage gives no support for this. Mountains can disrupt storms, but the central mechanism described is loss of the warm, moist ocean air supply.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 2,
    type: 'text',
    difficulty: 'medium',
    topic: 'Earth & Space Science',
    contentArea: 'earth_space',
    calculatorAllowed: true,
    passage:
      "This passage describes plate tectonics and types of plate boundaries.\n\nThe Earth's outer shell, the lithosphere, is broken into a number of large pieces called <strong>tectonic plates</strong> that slowly move over the warmer, partly molten layer beneath them. Where two plates meet is called a <strong>plate boundary</strong>, and three main types of boundaries are recognized:\n\n• <strong>Convergent boundaries:</strong> Plates move toward each other. When an oceanic plate meets a continental plate, the denser oceanic plate is pushed beneath (subducted), often producing volcanic mountain ranges and deep ocean trenches.\n• <strong>Divergent boundaries:</strong> Plates move apart, allowing magma from below to rise and form new crust — for example, along the Mid-Atlantic Ridge on the ocean floor.\n• <strong>Transform boundaries:</strong> Plates slide horizontally past each other, building stress that is released as earthquakes — for example, along California's San Andreas Fault.",
    question:
      'A geologist studies a region with frequent earthquakes but few volcanoes. Sliding motion is observed where two large plates meet horizontally. Which type of plate boundary best fits this description?',
    answerOptions: [
      {
        text: 'A convergent boundary, like a subduction zone.',
        rationale:
          'Convergent boundaries typically produce volcanoes and trenches, which the geologist does not see. Subduction also involves vertical motion, not primarily horizontal sliding.',
        isCorrect: false,
      },
      {
        text: 'A divergent boundary, like the Mid-Atlantic Ridge.',
        rationale:
          'Divergent boundaries produce new crust as magma rises — generally creating volcanic activity, not the quiet sliding described in the question.',
        isCorrect: false,
      },
      {
        text: 'A transform boundary, like the San Andreas Fault.',
        rationale:
          'Correct. The passage describes transform boundaries as places where plates slide horizontally past each other, building stress released as earthquakes — exactly what the geologist observes.',
        isCorrect: true,
      },
      {
        text: 'A boundary between two oceanic plates only, with no other features.',
        rationale:
          'The classification used in the passage (convergent, divergent, transform) describes how plates move relative to each other, not just whether they are oceanic or continental.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 3,
    type: 'text',
    difficulty: 'medium',
    topic: 'Earth & Space Science',
    contentArea: 'earth_space',
    calculatorAllowed: true,
    passage:
      'This passage describes the inner planets of our solar system.\n\n<strong>Inner Planets of the Solar System</strong>\n<table><thead><tr><th>Planet</th><th>Average Distance from Sun (million km)</th><th>Average Surface Temperature (°C)</th><th>Atmosphere</th><th>Moons</th></tr></thead><tbody><tr><td>Mercury</td><td>58</td><td>167</td><td>Almost none</td><td>0</td></tr><tr><td>Venus</td><td>108</td><td>464</td><td>Thick CO₂; runaway greenhouse effect</td><td>0</td></tr><tr><td>Earth</td><td>150</td><td>15</td><td>Nitrogen + oxygen; supports life</td><td>1</td></tr><tr><td>Mars</td><td>228</td><td>−63</td><td>Thin CO₂</td><td>2</td></tr></tbody></table>',
    question:
      'A student claims that "the closer a planet is to the Sun, the hotter its surface must be." Based on the table, which evidence most strongly contradicts that claim?',
    answerOptions: [
      {
        text: 'Mars has the lowest average surface temperature of any planet listed.',
        rationale:
          "This is consistent with the student's claim (Mars is the farthest of the four planets and is the coldest), so it does not contradict it.",
        isCorrect: false,
      },
      {
        text: 'Venus, although farther from the Sun than Mercury, has a much higher average surface temperature than Mercury.',
        rationale:
          'Correct. Mercury is closer to the Sun (58 million km) but averages 167 °C, while Venus is farther (108 million km) yet averages 464 °C — a much hotter planet at greater distance, contradicting the simple "closer = hotter" rule. This is due to Venus\'s thick CO₂ atmosphere and runaway greenhouse effect.',
        isCorrect: true,
      },
      {
        text: 'Earth has the only oxygen-rich atmosphere among the inner planets.',
        rationale:
          "This is true but is not about temperature versus distance, so it does not address the student's claim.",
        isCorrect: false,
      },
      {
        text: 'Mercury has no moons.',
        rationale:
          'The number of moons does not test the claim about distance and temperature.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 4,
    type: 'text',
    difficulty: 'easy',
    topic: 'Earth & Space Science',
    contentArea: 'earth_space',
    calculatorAllowed: true,
    passage:
      'This passage describes the rock cycle.\n\nGeologists divide rocks into three major groups based on how they form. <strong>Igneous rocks</strong> form when molten rock (magma below the surface or lava above it) cools and hardens. <strong>Sedimentary rocks</strong> form when small particles of weathered rock, plant matter, or shells settle in layers and are pressed and cemented together over long periods of time. <strong>Metamorphic rocks</strong> form when existing rocks of any type are exposed to high temperature and pressure deep within the Earth, changing their structure and minerals without melting.\n\nOver geologic time, rocks of one type can be transformed into another. For example, sedimentary rock buried deep in a mountain range can be heated and squeezed into metamorphic rock; if it eventually melts and cools again, it becomes igneous rock; and so on. This continuous transformation is called the <strong>rock cycle</strong>.',
    question:
      'A scientist describes a rock that formed from layers of seashells and sand pressed together at the bottom of an ancient ocean. Which group of rocks does this rock most likely belong to?',
    answerOptions: [
      {
        text: 'Igneous',
        rationale:
          'Igneous rocks form from cooled magma or lava, not from layered seashells and sand.',
        isCorrect: false,
      },
      {
        text: 'Sedimentary',
        rationale:
          'Correct. The passage defines sedimentary rocks as those formed when small particles, plant matter, or shells settle in layers and are pressed and cemented together over time — exactly the description in the question.',
        isCorrect: true,
      },
      {
        text: 'Metamorphic',
        rationale:
          'Metamorphic rocks form from existing rocks transformed by heat and pressure, not directly from settled seashells and sand layers.',
        isCorrect: false,
      },
      {
        text: 'A rock that does not belong to the rock cycle.',
        rationale:
          'The passage states that rocks of one type can be transformed into another over time and that this is exactly what the rock cycle describes — all rocks belong to it.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 5,
    type: 'text',
    difficulty: 'medium',
    topic: 'Earth & Space Science',
    contentArea: 'earth_space',
    calculatorAllowed: true,
    passage:
      'This passage uses climate data to compare two North American cities.\n\n<strong>Average Monthly Temperature (°C) and Precipitation (mm)</strong>\n<table><thead><tr><th>Month</th><th>Phoenix, AZ Temp</th><th>Phoenix, AZ Precip</th><th>Seattle, WA Temp</th><th>Seattle, WA Precip</th></tr></thead><tbody><tr><td>January</td><td>13</td><td>22</td><td>5</td><td>140</td></tr><tr><td>April</td><td>22</td><td>10</td><td>10</td><td>75</td></tr><tr><td>July</td><td>34</td><td>25</td><td>19</td><td>15</td></tr><tr><td>October</td><td>24</td><td>20</td><td>11</td><td>90</td></tr></tbody></table>',
    question:
      'Based on the climate table, which statement is most strongly supported?',
    answerOptions: [
      {
        text: 'Phoenix is much warmer than Seattle in every month shown, while Seattle generally receives more precipitation.',
        rationale:
          "Correct. In every month listed, Phoenix's temperature is higher than Seattle's (e.g., 34 vs. 19 in July), and Seattle's precipitation is higher than Phoenix's in every month except July (when both are low and Phoenix is slightly higher) — a clear pattern of warmer Phoenix, wetter Seattle.",
        isCorrect: true,
      },
      {
        text: 'Phoenix receives more precipitation than Seattle in every month listed.',
        rationale:
          'Phoenix has lower precipitation than Seattle in January (22 vs. 140), April (10 vs. 75), and October (20 vs. 90).',
        isCorrect: false,
      },
      {
        text: 'Seattle is warmer than Phoenix in July.',
        rationale:
          'In July, Phoenix is 34 °C and Seattle is 19 °C — Phoenix is much warmer.',
        isCorrect: false,
      },
      {
        text: 'Both cities have nearly identical climate patterns throughout the year.',
        rationale:
          'The two cities differ substantially in temperature and precipitation in every month listed; their patterns are clearly different.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 6,
    type: 'text',
    difficulty: 'hard',
    topic: 'Earth & Space Science',
    contentArea: 'earth_space',
    calculatorAllowed: true,
    passage:
      'This passage uses climate data to address climate change.\n\n<strong>Estimated Global Average Surface Temperature Anomaly Compared to the 20th-Century Average (°C)</strong>\n<table><thead><tr><th>Decade</th><th>Temperature Anomaly (°C)</th></tr></thead><tbody><tr><td>1880s</td><td>−0.20</td></tr><tr><td>1920s</td><td>−0.16</td></tr><tr><td>1960s</td><td>−0.01</td></tr><tr><td>1980s</td><td>+0.18</td></tr><tr><td>2000s</td><td>+0.51</td></tr><tr><td>2010s</td><td>+0.79</td></tr></tbody></table>',
    question:
      'Approximately how much higher was the global average surface temperature in the 2010s compared with the 1880s, based on the table?',
    answerOptions: [
      {
        text: 'About 0.59 °C higher.',
        rationale:
          "This subtracts the 1880s value from the 1980s value (0.18 − (−0.20) = 0.38 actually) using the wrong decade — and even then, that's 0.38, not 0.59. The question asks specifically about the 2010s versus the 1880s.",
        isCorrect: false,
      },
      {
        text: 'About 0.79 °C higher.',
        rationale:
          'This is the 2010s value alone (relative to the 20th-century average), not the difference between the 2010s and the 1880s.',
        isCorrect: false,
      },
      {
        text: 'About 0.99 °C higher.',
        rationale:
          'Correct. The 2010s value is +0.79 °C and the 1880s value is −0.20 °C. The difference is 0.79 − (−0.20) = 0.79 + 0.20 = 0.99 °C, so the 2010s were about 1 °C warmer than the 1880s.',
        isCorrect: true,
      },
      {
        text: 'About 0.59 °C lower.',
        rationale:
          "The table's anomalies clearly increase over time (from negative to large positive values), so the 2010s are warmer than the 1880s, not cooler.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 7,
    type: 'text',
    difficulty: 'medium',
    topic: 'Earth & Space Science',
    contentArea: 'earth_space',
    calculatorAllowed: true,
    passage:
      "This passage describes the water cycle.\n\nThe water cycle continually moves water through Earth's atmosphere, surface, and subsurface. Solar energy drives <strong>evaporation</strong>, in which liquid water at the surface (mostly from the oceans) is converted into water vapor and rises into the atmosphere. Plants also release water vapor through their leaves in a process called <strong>transpiration</strong>. As humid air rises and cools, water vapor undergoes <strong>condensation</strong>, forming tiny droplets that make clouds. When these droplets combine and grow large enough, they fall to Earth as <strong>precipitation</strong> in the form of rain, snow, sleet, or hail. Some precipitation flows over the land as <strong>runoff</strong> into rivers, lakes, and ultimately back to the ocean; some soaks into the ground as <strong>infiltration</strong>, recharging groundwater that may later emerge in springs and wells.",
    question:
      'A region that receives below-average rainfall for several years notices that local well levels also fall sharply. Which step of the water cycle described in the passage best explains the connection between rainfall and well levels?',
    answerOptions: [
      {
        text: 'Evaporation from the ocean directly fills wells.',
        rationale:
          'Wells draw from groundwater, not directly from ocean evaporation. The passage links groundwater to infiltration of precipitation, not to evaporation.',
        isCorrect: false,
      },
      {
        text: 'Less precipitation means less infiltration, which reduces the recharge of the groundwater that supplies wells.',
        rationale:
          'Correct. The passage links precipitation to infiltration, which "recharges groundwater that may later emerge in springs and wells." Lower precipitation reduces this recharge, which in turn lowers well levels.',
        isCorrect: true,
      },
      {
        text: 'Transpiration alone fully replaces water that wells lose.',
        rationale:
          'Transpiration releases water vapor from plants into the atmosphere; it does not refill wells.',
        isCorrect: false,
      },
      {
        text: 'Condensation in clouds always equals the volume of water in wells.',
        rationale:
          'There is no such direct equality. Cloud condensation produces precipitation that may or may not infiltrate the ground, depending on local conditions.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'medium',
    topic: 'Earth & Space Science',
    contentArea: 'earth_space',
    calculatorAllowed: true,
    question:
      'Which of the following best explains why Earth experiences seasons?',
    answerOptions: [
      {
        text: "Earth's orbit is highly elongated, so it is much closer to the Sun in summer than in winter.",
        rationale:
          "Earth's orbit is only slightly elliptical, and the small difference in distance does not match the seasonal pattern (the Northern and Southern Hemispheres have opposite seasons at the same distance).",
        isCorrect: false,
      },
      {
        text: "Earth's axis is tilted relative to its orbit, so different hemispheres receive sunlight more directly at different times of year.",
        rationale:
          "Correct. Earth's axial tilt of about 23.5° means that as Earth orbits the Sun, each hemisphere is tilted toward the Sun for part of the year (summer there) and away for part of the year (winter there) — producing the seasons in opposite phases between the hemispheres.",
        isCorrect: true,
      },
      {
        text: "The Sun's output of energy varies sharply over the course of a year.",
        rationale:
          "The Sun's total energy output is nearly constant on the timescale of a single year and does not produce the regular seasonal pattern.",
        isCorrect: false,
      },
      {
        text: "The Moon blocks part of the Sun's light during certain seasons.",
        rationale:
          'The Moon causes brief solar eclipses, not seasons. It does not regularly block sunlight from one hemisphere over many months.',
        isCorrect: false,
      },
    ],
  },
];
