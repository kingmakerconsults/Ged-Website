import React, { useState, useMemo } from 'react';

// Science Formula Practice Questions
const SCIENCE_FORMULA_PRACTICE = [
  // DENSITY PROBLEMS
  {
    id: 'density_1',
    category: 'Density',
    formulaName: 'Density',
    formulaDisplay: 'd = m / V',
    problemText:
      'A metal block has a mass of 120 g and a volume of 15 cm³. What is its density?',
    given: { m: '120 g', V: '15 cm³' },
    answer: 8,
    answerUnits: 'g/cm³',
    tolerance: 0.01,
    steps: [
      'Identify the formula: d = m / V',
      'Substitute: d = 120 g / 15 cm³',
      'Compute: d = 8 g/cm³',
    ],
  },
  {
    id: 'density_2',
    category: 'Density',
    formulaName: 'Density',
    formulaDisplay: 'd = m / V',
    problemText:
      'A piece of wood has a mass of 45 g and a volume of 60 cm³. Calculate its density.',
    given: { m: '45 g', V: '60 cm³' },
    answer: 0.75,
    answerUnits: 'g/cm³',
    tolerance: 0.01,
    steps: [
      'Use the formula: d = m / V',
      'Substitute: d = 45 g / 60 cm³',
      'Compute: d = 0.75 g/cm³',
    ],
  },
  {
    id: 'density_3',
    category: 'Density',
    formulaName: 'Density',
    formulaDisplay: 'd = m / V',
    problemText:
      'A liquid sample has a volume of 50 mL and a mass of 65 g. Find its density.',
    given: { m: '65 g', V: '50 mL' },
    answer: 1.3,
    answerUnits: 'g/mL',
    tolerance: 0.01,
    steps: [
      'Apply: d = m / V',
      'Substitute: d = 65 g / 50 mL',
      'Compute: d = 1.3 g/mL',
    ],
  },
  // SPEED PROBLEMS
  {
    id: 'speed_1',
    category: 'Speed',
    formulaName: 'Average Speed',
    formulaDisplay: 'v = d / t',
    problemText:
      'A car travels 300 miles in 5 hours. What is its average speed?',
    given: { d: '300 miles', t: '5 hours' },
    answer: 60,
    answerUnits: 'mph',
    tolerance: 0.1,
    steps: [
      'Formula: v = d / t',
      'Substitute: v = 300 miles / 5 hours',
      'Compute: v = 60 mph',
    ],
  },
  {
    id: 'speed_2',
    category: 'Speed',
    formulaName: 'Average Speed',
    formulaDisplay: 'v = d / t',
    problemText:
      'A runner completes 100 meters in 12.5 seconds. Calculate the average speed.',
    given: { d: '100 m', t: '12.5 s' },
    answer: 8,
    answerUnits: 'm/s',
    tolerance: 0.1,
    steps: [
      'Use: v = d / t',
      'Substitute: v = 100 m / 12.5 s',
      'Compute: v = 8 m/s',
    ],
  },
  // FORCE PROBLEMS
  {
    id: 'force_1',
    category: 'Force',
    formulaName: "Force (Newton's 2nd Law)",
    formulaDisplay: 'F = m × a',
    problemText: 'A 10 kg object accelerates at 3 m/s². What force is applied?',
    given: { m: '10 kg', a: '3 m/s²' },
    answer: 30,
    answerUnits: 'N',
    tolerance: 0.1,
    steps: [
      'Formula: F = m × a',
      'Substitute: F = 10 kg × 3 m/s²',
      'Compute: F = 30 N',
    ],
  },
  {
    id: 'force_2',
    category: 'Force',
    formulaName: 'Force',
    formulaDisplay: 'F = m × a',
    problemText:
      'A force of 50 N accelerates a 5 kg box. What is the acceleration?',
    given: { F: '50 N', m: '5 kg' },
    answer: 10,
    answerUnits: 'm/s²',
    tolerance: 0.1,
    steps: [
      'Rearrange: a = F / m',
      'Substitute: a = 50 N / 5 kg',
      'Compute: a = 10 m/s²',
    ],
  },
  // WORK PROBLEMS
  {
    id: 'work_1',
    category: 'Work',
    formulaName: 'Work',
    formulaDisplay: 'W = F × d',
    problemText:
      'A force of 20 N moves an object 5 meters. How much work is done?',
    given: { F: '20 N', d: '5 m' },
    answer: 100,
    answerUnits: 'J',
    tolerance: 0.1,
    steps: [
      'Formula: W = F × d',
      'Substitute: W = 20 N × 5 m',
      'Compute: W = 100 J',
    ],
  },
  {
    id: 'work_2',
    category: 'Work',
    formulaName: 'Work',
    formulaDisplay: 'W = F × d',
    problemText: 'Lifting a 50 N box 2 meters high requires how much work?',
    given: { F: '50 N', d: '2 m' },
    answer: 100,
    answerUnits: 'J',
    tolerance: 0.1,
    steps: [
      'Use: W = F × d',
      'Substitute: W = 50 N × 2 m',
      'Compute: W = 100 J',
    ],
  },
  // ── Additional Density problems ─────────────────────────────────────
  {
    id: 'density_4',
    category: 'Density',
    formulaName: 'Density',
    formulaDisplay: 'd = m / V',
    problemText:
      'Water has a density of 1 g/mL. If you have 250 mL of water, what is its mass?',
    given: { d: '1 g/mL', V: '250 mL' },
    answer: 250,
    answerUnits: 'g',
    tolerance: 0.1,
    steps: [
      'Rearrange: m = d × V',
      'Substitute: m = 1 g/mL × 250 mL',
      'Compute: m = 250 g',
    ],
  },
  {
    id: 'density_5',
    category: 'Density',
    formulaName: 'Density',
    formulaDisplay: 'd = m / V',
    problemText:
      'Gold has a density of 19.3 g/cm³. What is the volume of a gold bar that weighs 965 g?',
    given: { d: '19.3 g/cm³', m: '965 g' },
    answer: 50,
    answerUnits: 'cm³',
    tolerance: 0.5,
    steps: [
      'Rearrange: V = m / d',
      'Substitute: V = 965 g / 19.3 g/cm³',
      'Compute: V ≈ 50 cm³',
    ],
  },
  {
    id: 'density_6',
    category: 'Density',
    formulaName: 'Density',
    formulaDisplay: 'd = m / V',
    problemText:
      'Ice has a density of about 0.9 g/cm³. What is the mass of a 200 cm³ block of ice?',
    given: { d: '0.9 g/cm³', V: '200 cm³' },
    answer: 180,
    answerUnits: 'g',
    tolerance: 0.5,
    steps: [
      'Rearrange: m = d × V',
      'Substitute: m = 0.9 g/cm³ × 200 cm³',
      'Compute: m = 180 g',
    ],
  },
  {
    id: 'density_7',
    category: 'Density',
    formulaName: 'Density',
    formulaDisplay: 'd = m / V',
    problemText:
      'A rock has a density of 2.5 g/cm³ and a volume of 40 cm³. What is its mass?',
    given: { d: '2.5 g/cm³', V: '40 cm³' },
    answer: 100,
    answerUnits: 'g',
    tolerance: 0.1,
    steps: [
      'Rearrange: m = d × V',
      'Substitute: m = 2.5 g/cm³ × 40 cm³',
      'Compute: m = 100 g',
    ],
  },
  {
    id: 'density_8',
    category: 'Density',
    formulaName: 'Density',
    formulaDisplay: 'd = m / V',
    problemText:
      'An oil sample has a mass of 180 g and a density of 0.9 g/mL. What is its volume?',
    given: { m: '180 g', d: '0.9 g/mL' },
    answer: 200,
    answerUnits: 'mL',
    tolerance: 0.5,
    steps: [
      'Rearrange: V = m / d',
      'Substitute: V = 180 g / 0.9 g/mL',
      'Compute: V = 200 mL',
    ],
  },
  // ── Additional Speed problems ────────────────────────────────────────
  {
    id: 'speed_3',
    category: 'Speed',
    formulaName: 'Average Speed',
    formulaDisplay: 'v = d / t',
    problemText:
      'A train travels at 90 km/h for 3 hours. How far does it travel?',
    given: { v: '90 km/h', t: '3 h' },
    answer: 270,
    answerUnits: 'km',
    tolerance: 0.5,
    steps: [
      'Rearrange: d = v × t',
      'Substitute: d = 90 km/h × 3 h',
      'Compute: d = 270 km',
    ],
  },
  {
    id: 'speed_4',
    category: 'Speed',
    formulaName: 'Average Speed',
    formulaDisplay: 'v = d / t',
    problemText:
      'A cyclist covers 48 km at an average speed of 16 km/h. How many hours does the trip take?',
    given: { d: '48 km', v: '16 km/h' },
    answer: 3,
    answerUnits: 'hours',
    tolerance: 0.1,
    steps: [
      'Rearrange: t = d / v',
      'Substitute: t = 48 km / 16 km/h',
      'Compute: t = 3 hours',
    ],
  },
  {
    id: 'speed_5',
    category: 'Speed',
    formulaName: 'Average Speed',
    formulaDisplay: 'v = d / t',
    problemText:
      'Sound travels 340 m/s. How far does sound travel in 5 seconds?',
    given: { v: '340 m/s', t: '5 s' },
    answer: 1700,
    answerUnits: 'm',
    tolerance: 1,
    steps: [
      'Rearrange: d = v × t',
      'Substitute: d = 340 m/s × 5 s',
      'Compute: d = 1700 m',
    ],
  },
  {
    id: 'speed_6',
    category: 'Speed',
    formulaName: 'Average Speed',
    formulaDisplay: 'v = d / t',
    problemText:
      'A jet plane travels 2400 km in 3 hours. What is its average speed in km/h?',
    given: { d: '2400 km', t: '3 h' },
    answer: 800,
    answerUnits: 'km/h',
    tolerance: 1,
    steps: [
      'Use: v = d / t',
      'Substitute: v = 2400 km / 3 h',
      'Compute: v = 800 km/h',
    ],
  },
  {
    id: 'speed_7',
    category: 'Speed',
    formulaName: 'Average Speed',
    formulaDisplay: 'v = d / t',
    problemText: 'A ball rolls 15 m in 3 seconds. What is its average speed?',
    given: { d: '15 m', t: '3 s' },
    answer: 5,
    answerUnits: 'm/s',
    tolerance: 0.1,
    steps: [
      'Use: v = d / t',
      'Substitute: v = 15 m / 3 s',
      'Compute: v = 5 m/s',
    ],
  },
  // ── Additional Force problems ────────────────────────────────────────
  {
    id: 'force_3',
    category: 'Force',
    formulaName: 'Force',
    formulaDisplay: 'F = m × a',
    problemText:
      'A force of 120 N acts on an object with a mass of 15 kg. What is the acceleration?',
    given: { F: '120 N', m: '15 kg' },
    answer: 8,
    answerUnits: 'm/s²',
    tolerance: 0.1,
    steps: [
      'Rearrange: a = F / m',
      'Substitute: a = 120 N / 15 kg',
      'Compute: a = 8 m/s²',
    ],
  },
  {
    id: 'force_4',
    category: 'Force',
    formulaName: 'Force',
    formulaDisplay: 'F = m × a',
    problemText:
      'A rocket engine provides 500 N of force and produces an acceleration of 25 m/s². What is the mass of the rocket?',
    given: { F: '500 N', a: '25 m/s²' },
    answer: 20,
    answerUnits: 'kg',
    tolerance: 0.1,
    steps: [
      'Rearrange: m = F / a',
      'Substitute: m = 500 N / 25 m/s²',
      'Compute: m = 20 kg',
    ],
  },
  {
    id: 'force_5',
    category: 'Force',
    formulaName: 'Force',
    formulaDisplay: 'F = m × a',
    problemText:
      'A 0.5 kg baseball accelerates at 400 m/s² after being hit. What force was applied?',
    given: { m: '0.5 kg', a: '400 m/s²' },
    answer: 200,
    answerUnits: 'N',
    tolerance: 0.5,
    steps: [
      'Use: F = m × a',
      'Substitute: F = 0.5 kg × 400 m/s²',
      'Compute: F = 200 N',
    ],
  },
  {
    id: 'force_6',
    category: 'Force',
    formulaName: 'Weight Force',
    formulaDisplay: 'W = m × g (g = 9.8 m/s²)',
    problemText:
      'What is the weight (gravitational force) of a 70 kg person on Earth? (g = 9.8 m/s²)',
    given: { m: '70 kg', g: '9.8 m/s²' },
    answer: 686,
    answerUnits: 'N',
    tolerance: 1,
    steps: [
      'Use: F = m × a, where a = g = 9.8 m/s²',
      'Substitute: F = 70 kg × 9.8 m/s²',
      'Compute: F = 686 N',
    ],
  },
  // ── Additional Work problems ─────────────────────────────────────────
  {
    id: 'work_3',
    category: 'Work',
    formulaName: 'Work',
    formulaDisplay: 'W = F × d',
    problemText:
      'A worker pushes a cart with 80 N of force for 15 meters. How much work is done?',
    given: { F: '80 N', d: '15 m' },
    answer: 1200,
    answerUnits: 'J',
    tolerance: 1,
    steps: [
      'Use: W = F × d',
      'Substitute: W = 80 N × 15 m',
      'Compute: W = 1200 J',
    ],
  },
  {
    id: 'work_4',
    category: 'Work',
    formulaName: 'Work',
    formulaDisplay: 'W = F × d',
    problemText:
      '500 J of work is done pushing a box 10 meters. What force was applied?',
    given: { W: '500 J', d: '10 m' },
    answer: 50,
    answerUnits: 'N',
    tolerance: 0.5,
    steps: [
      'Rearrange: F = W / d',
      'Substitute: F = 500 J / 10 m',
      'Compute: F = 50 N',
    ],
  },
  {
    id: 'work_5',
    category: 'Work',
    formulaName: 'Work',
    formulaDisplay: 'W = F × d',
    problemText:
      'A machine does 2400 J of work by applying a 300 N force. Over what distance did it act?',
    given: { W: '2400 J', F: '300 N' },
    answer: 8,
    answerUnits: 'm',
    tolerance: 0.1,
    steps: [
      'Rearrange: d = W / F',
      'Substitute: d = 2400 J / 300 N',
      'Compute: d = 8 m',
    ],
  },
  // ── Power (new category) ─────────────────────────────────────────────
  {
    id: 'power_1',
    category: 'Power',
    formulaName: 'Power',
    formulaDisplay: 'P = W / t',
    problemText:
      'A motor does 3000 J of work in 10 seconds. What is the power output?',
    given: { W: '3000 J', t: '10 s' },
    answer: 300,
    answerUnits: 'W',
    tolerance: 0.5,
    steps: [
      'Use: P = W / t',
      'Substitute: P = 3000 J / 10 s',
      'Compute: P = 300 W',
    ],
  },
  {
    id: 'power_2',
    category: 'Power',
    formulaName: 'Power',
    formulaDisplay: 'P = W / t',
    problemText:
      'A light bulb uses 60 W of power. How much energy does it use in 30 seconds?',
    given: { P: '60 W', t: '30 s' },
    answer: 1800,
    answerUnits: 'J',
    tolerance: 1,
    steps: [
      'Rearrange: W = P × t',
      'Substitute: W = 60 W × 30 s',
      'Compute: W = 1800 J',
    ],
  },
  {
    id: 'power_3',
    category: 'Power',
    formulaName: 'Power',
    formulaDisplay: 'P = W / t',
    problemText:
      'A crane does 12,000 J of work and has a power output of 400 W. How long does the job take?',
    given: { W: '12000 J', P: '400 W' },
    answer: 30,
    answerUnits: 's',
    tolerance: 0.5,
    steps: [
      'Rearrange: t = W / P',
      'Substitute: t = 12000 J / 400 W',
      'Compute: t = 30 seconds',
    ],
  },
  {
    id: 'power_4',
    category: 'Power',
    formulaName: 'Power',
    formulaDisplay: 'P = W / t',
    problemText:
      'A person climbs stairs doing 2200 J of work in 5 seconds. What is their power output?',
    given: { W: '2200 J', t: '5 s' },
    answer: 440,
    answerUnits: 'W',
    tolerance: 0.5,
    steps: [
      'Use: P = W / t',
      'Substitute: P = 2200 J / 5 s',
      'Compute: P = 440 W',
    ],
  },
  // ── Kinetic Energy (new category) ────────────────────────────────────
  {
    id: 'ke_1',
    category: 'Kinetic Energy',
    formulaName: 'Kinetic Energy',
    formulaDisplay: 'KE = ½mv²',
    problemText: 'A 4 kg ball rolls at 3 m/s. What is its kinetic energy?',
    given: { m: '4 kg', v: '3 m/s' },
    answer: 18,
    answerUnits: 'J',
    tolerance: 0.5,
    steps: [
      'Use: KE = ½mv²',
      'Substitute: KE = ½ × 4 × 3²',
      'Compute: KE = ½ × 4 × 9 = 18 J',
    ],
  },
  {
    id: 'ke_2',
    category: 'Kinetic Energy',
    formulaName: 'Kinetic Energy',
    formulaDisplay: 'KE = ½mv²',
    problemText:
      'A 2 kg object has a kinetic energy of 16 J. What is its speed?',
    given: { KE: '16 J', m: '2 kg' },
    answer: 4,
    answerUnits: 'm/s',
    tolerance: 0.1,
    steps: [
      'Rearrange: v² = 2 × KE / m',
      'Substitute: v² = 2 × 16 / 2 = 16',
      'Compute: v = √16 = 4 m/s',
    ],
  },
  {
    id: 'ke_3',
    category: 'Kinetic Energy',
    formulaName: 'Kinetic Energy',
    formulaDisplay: 'KE = ½mv²',
    problemText: 'A 10 kg bicycle moves at 6 m/s. Find the kinetic energy.',
    given: { m: '10 kg', v: '6 m/s' },
    answer: 180,
    answerUnits: 'J',
    tolerance: 0.5,
    steps: [
      'Use: KE = ½mv²',
      'Substitute: KE = ½ × 10 × 6² = ½ × 10 × 36',
      'Compute: KE = 180 J',
    ],
  },
  {
    id: 'ke_4',
    category: 'Kinetic Energy',
    formulaName: 'Kinetic Energy',
    formulaDisplay: 'KE = ½mv²',
    problemText:
      'A 500 g (0.5 kg) tennis ball travels at 20 m/s. What is its kinetic energy?',
    given: { m: '0.5 kg', v: '20 m/s' },
    answer: 100,
    answerUnits: 'J',
    tolerance: 0.5,
    steps: [
      'Use: KE = ½mv²',
      'Substitute: KE = ½ × 0.5 × 20²',
      'Compute: KE = ½ × 0.5 × 400 = 100 J',
    ],
  },
  // ── Potential Energy (new category) ──────────────────────────────────
  {
    id: 'pe_1',
    category: 'Potential Energy',
    formulaName: 'Gravitational Potential Energy',
    formulaDisplay: 'PE = mgh (g = 9.8 m/s²)',
    problemText:
      'A 5 kg book sits on a shelf 2 m above the floor. What is its gravitational potential energy? (g = 9.8 m/s²)',
    given: { m: '5 kg', g: '9.8 m/s²', h: '2 m' },
    answer: 98,
    answerUnits: 'J',
    tolerance: 0.5,
    steps: [
      'Use: PE = m × g × h',
      'Substitute: PE = 5 × 9.8 × 2',
      'Compute: PE = 98 J',
    ],
  },
  {
    id: 'pe_2',
    category: 'Potential Energy',
    formulaName: 'Gravitational Potential Energy',
    formulaDisplay: 'PE = mgh',
    problemText:
      'A 10 kg object is lifted 4 m. What is its potential energy? (g = 9.8 m/s²)',
    given: { m: '10 kg', g: '9.8 m/s²', h: '4 m' },
    answer: 392,
    answerUnits: 'J',
    tolerance: 1,
    steps: [
      'Use: PE = m × g × h',
      'Substitute: PE = 10 × 9.8 × 4',
      'Compute: PE = 392 J',
    ],
  },
  {
    id: 'pe_3',
    category: 'Potential Energy',
    formulaName: 'Gravitational Potential Energy',
    formulaDisplay: 'PE = mgh',
    problemText:
      'A 2 kg rock has a potential energy of 196 J. How high is it above the ground? (g = 9.8 m/s²)',
    given: { m: '2 kg', PE: '196 J', g: '9.8 m/s²' },
    answer: 10,
    answerUnits: 'm',
    tolerance: 0.1,
    steps: [
      'Rearrange: h = PE / (m × g)',
      'Substitute: h = 196 / (2 × 9.8)',
      'Compute: h = 196 / 19.6 = 10 m',
    ],
  },
  // ── Pressure (new category) ──────────────────────────────────────────
  {
    id: 'pressure_1',
    category: 'Pressure',
    formulaName: 'Pressure',
    formulaDisplay: 'P = F / A',
    problemText:
      'A 200 N force is applied to a surface with an area of 4 m². What is the pressure?',
    given: { F: '200 N', A: '4 m²' },
    answer: 50,
    answerUnits: 'Pa',
    tolerance: 0.5,
    steps: [
      'Use: P = F / A',
      'Substitute: P = 200 N / 4 m²',
      'Compute: P = 50 Pa',
    ],
  },
  {
    id: 'pressure_2',
    category: 'Pressure',
    formulaName: 'Pressure',
    formulaDisplay: 'P = F / A',
    problemText:
      'A pressure of 25 Pa is applied to an area of 8 m². What is the force?',
    given: { P: '25 Pa', A: '8 m²' },
    answer: 200,
    answerUnits: 'N',
    tolerance: 0.5,
    steps: [
      'Rearrange: F = P × A',
      'Substitute: F = 25 Pa × 8 m²',
      'Compute: F = 200 N',
    ],
  },
  {
    id: 'pressure_3',
    category: 'Pressure',
    formulaName: 'Pressure',
    formulaDisplay: 'P = F / A',
    problemText:
      'A 600 N force creates a pressure of 150 Pa. What is the area?',
    given: { F: '600 N', P: '150 Pa' },
    answer: 4,
    answerUnits: 'm²',
    tolerance: 0.1,
    steps: [
      'Rearrange: A = F / P',
      'Substitute: A = 600 / 150',
      'Compute: A = 4 m²',
    ],
  },
  // ── Ohm's Law (new category) ─────────────────────────────────────────
  {
    id: 'ohm_1',
    category: "Ohm's Law",
    formulaName: "Ohm's Law",
    formulaDisplay: 'V = I × R',
    problemText:
      'A circuit has a current of 2 A flowing through a 6 Ω resistor. What is the voltage?',
    given: { I: '2 A', R: '6 Ω' },
    answer: 12,
    answerUnits: 'V',
    tolerance: 0.1,
    steps: ['Use: V = I × R', 'Substitute: V = 2 A × 6 Ω', 'Compute: V = 12 V'],
  },
  {
    id: 'ohm_2',
    category: "Ohm's Law",
    formulaName: "Ohm's Law",
    formulaDisplay: 'V = I × R',
    problemText:
      'A 24 V battery is connected to an 8 Ω resistor. What current flows?',
    given: { V: '24 V', R: '8 Ω' },
    answer: 3,
    answerUnits: 'A',
    tolerance: 0.1,
    steps: [
      'Rearrange: I = V / R',
      'Substitute: I = 24 V / 8 Ω',
      'Compute: I = 3 A',
    ],
  },
  {
    id: 'ohm_3',
    category: "Ohm's Law",
    formulaName: "Ohm's Law",
    formulaDisplay: 'V = I × R',
    problemText:
      'A 9 V battery drives a current of 3 A through a circuit. What is the resistance?',
    given: { V: '9 V', I: '3 A' },
    answer: 3,
    answerUnits: 'Ω',
    tolerance: 0.1,
    steps: [
      'Rearrange: R = V / I',
      'Substitute: R = 9 V / 3 A',
      'Compute: R = 3 Ω',
    ],
  },
  // ── Unit Conversions (practical numeracy) ────────────────────────────
  {
    id: 'unit_1',
    category: 'Unit Conversions',
    formulaName: 'Length: cm to m',
    formulaDisplay: '1 m = 100 cm',
    problemText: 'Convert 350 cm to meters.',
    given: { length: '350 cm' },
    answer: 3.5,
    answerUnits: 'm',
    tolerance: 0.01,
    steps: [
      'Divide by 100 (since 1 m = 100 cm)',
      '350 / 100 = 3.5',
      'Answer: 3.5 m',
    ],
  },
  {
    id: 'unit_2',
    category: 'Unit Conversions',
    formulaName: 'Mass: kg to g',
    formulaDisplay: '1 kg = 1000 g',
    problemText: 'Convert 4.5 kg to grams.',
    given: { mass: '4.5 kg' },
    answer: 4500,
    answerUnits: 'g',
    tolerance: 0.5,
    steps: [
      'Multiply by 1000 (since 1 kg = 1000 g)',
      '4.5 × 1000 = 4500',
      'Answer: 4500 g',
    ],
  },
  {
    id: 'unit_3',
    category: 'Unit Conversions',
    formulaName: 'Volume: L to mL',
    formulaDisplay: '1 L = 1000 mL',
    problemText: 'Convert 2.75 L to milliliters.',
    given: { volume: '2.75 L' },
    answer: 2750,
    answerUnits: 'mL',
    tolerance: 0.5,
    steps: [
      'Multiply by 1000 (since 1 L = 1000 mL)',
      '2.75 × 1000 = 2750',
      'Answer: 2750 mL',
    ],
  },
  {
    id: 'unit_4',
    category: 'Unit Conversions',
    formulaName: 'Time: minutes to seconds',
    formulaDisplay: '1 min = 60 s',
    problemText: 'Convert 8 minutes to seconds.',
    given: { time: '8 min' },
    answer: 480,
    answerUnits: 's',
    tolerance: 0.1,
    steps: [
      'Multiply by 60 (since 1 min = 60 s)',
      '8 × 60 = 480',
      'Answer: 480 s',
    ],
  },
  {
    id: 'unit_5',
    category: 'Unit Conversions',
    formulaName: 'Temperature: Celsius to Kelvin',
    formulaDisplay: 'K = °C + 273',
    problemText: 'Convert 25°C to Kelvin.',
    given: { temperature: '25°C' },
    answer: 298,
    answerUnits: 'K',
    tolerance: 0.5,
    steps: [
      'Add 273 to the Celsius temperature',
      '25 + 273 = 298',
      'Answer: 298 K',
    ],
  },
  {
    id: 'unit_6',
    category: 'Unit Conversions',
    formulaName: 'Speed: m/s to km/h',
    formulaDisplay: '1 m/s = 3.6 km/h',
    problemText: 'Convert 15 m/s to km/h.',
    given: { speed: '15 m/s' },
    answer: 54,
    answerUnits: 'km/h',
    tolerance: 0.5,
    steps: [
      'Multiply by 3.6 (since 1 m/s = 3.6 km/h)',
      '15 × 3.6 = 54',
      'Answer: 54 km/h',
    ],
  },
];

/**
 * ScienceFormulaPractice - Formula-based practice problems
 */
export default function ScienceFormulaPractice({ onClose, dark = false }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentProblem, setCurrentProblem] = useState(null);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showSteps, setShowSteps] = useState(false);
  const [notice, setNotice] = useState('');

  const categories = useMemo(() => {
    const cats = [...new Set(SCIENCE_FORMULA_PRACTICE.map((p) => p.category))];
    return cats.sort();
  }, []);

  const selectNewProblem = () => {
    setNotice('');
    if (!selectedCategory) {
      setNotice('Please select a category first.');
      return;
    }

    const categoryProblems = SCIENCE_FORMULA_PRACTICE.filter(
      (p) => p.category === selectedCategory
    );

    if (categoryProblems.length === 0) {
      setNotice('No problems available for this category.');
      return;
    }

    const randomProblem =
      categoryProblems[Math.floor(Math.random() * categoryProblems.length)];
    setCurrentProblem(randomProblem);
    setStudentAnswer('');
    setFeedback(null);
    setShowSteps(false);
  };

  const checkAnswer = () => {
    if (!currentProblem) return;
    setNotice('');
    if (studentAnswer.trim() === '') {
      setNotice('Please enter an answer.');
      return;
    }

    const numericAnswer = parseFloat(studentAnswer);
    if (isNaN(numericAnswer)) {
      setNotice('Please enter a valid number.');
      return;
    }

    const tolerance = currentProblem.tolerance || 0.01;
    const isCorrect =
      Math.abs(numericAnswer - currentProblem.answer) <= tolerance;

    setFeedback({
      isCorrect,
      correctAnswer: currentProblem.answer,
      units: currentProblem.answerUnits,
    });
  };

  return (
    <div
      className={`p-6 rounded-xl ${
        dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">
        ⚗️ Science Formula Practice
      </h2>

      {/* Category selector */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Select Category:</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-green-600 text-white'
                  : dark
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* New Problem button */}
      <div className="mb-6">
        <button
          onClick={selectNewProblem}
          disabled={!selectedCategory}
          className={`px-6 py-3 rounded-lg font-bold text-white transition ${
            !selectedCategory
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          New Problem
        </button>
        {notice && (
          <p
            role="alert"
            className="mt-2 text-sm text-red-700 dark:text-red-300"
          >
            {notice}
          </p>
        )}
      </div>

      {/* Current Problem Display */}
      {currentProblem && (
        <div
          className={`p-4 rounded-lg mb-4 ${
            dark ? 'bg-gray-700' : 'bg-gray-50'
          }`}
        >
          <h3 className="text-xl font-bold mb-2">
            {currentProblem.formulaName}
          </h3>

          {/* Formula Display */}
          <div
            className={`mb-3 p-3 rounded text-center ${
              dark ? 'bg-blue-900' : 'bg-white'
            }`}
          >
            <strong className={dark ? 'text-slate-100' : 'text-slate-900'}>
              Formula:{' '}
            </strong>
            <span
              className={`font-mono text-lg ${
                dark ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              {currentProblem.formulaDisplay}
            </span>
          </div>

          {/* Problem Text */}
          <div
            className={`mb-3 p-3 border-l-4 border-blue-500 ${
              dark ? 'bg-slate-800' : 'bg-white'
            }`}
          >
            <p
              className={`text-base ${
                dark ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              {currentProblem.problemText}
            </p>
          </div>

          {/* Given Values */}
          {currentProblem.given && (
            <div className="mb-3 text-slate-900 dark:text-slate-100">
              <strong>Given:</strong>
              <div className="ml-4 mt-1">
                {Object.entries(currentProblem.given).map(([key, value]) => (
                  <div key={key}>
                    {key} = {value}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Answer Input */}
          <div className="mb-3">
            <label className="block font-semibold mb-2">
              Your Answer ({currentProblem.answerUnits}):
            </label>
            <input
              type="text"
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              className={`w-full px-3 py-2 border rounded-lg ${
                dark
                  ? 'bg-gray-800 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Enter numeric answer"
            />
          </div>

          {/* Check Answer Button */}
          <button
            onClick={checkAnswer}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
          >
            Check Answer
          </button>

          {/* Feedback */}
          {feedback && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                feedback.isCorrect
                  ? 'bg-green-100 text-green-800 border-2 border-green-500'
                  : 'bg-red-100 text-red-800 border-2 border-red-500'
              }`}
            >
              {feedback.isCorrect ? (
                <p className="font-bold">✓ Correct!</p>
              ) : (
                <div>
                  <p className="font-bold">✗ Incorrect</p>
                  <p>
                    Correct answer: {feedback.correctAnswer} {feedback.units}
                  </p>
                </div>
              )}

              <button
                onClick={() => setShowSteps(!showSteps)}
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {showSteps ? 'Hide Steps' : 'View Steps'}
              </button>
            </div>
          )}

          {/* Steps Display */}
          {showSteps && currentProblem.steps && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                dark ? 'bg-gray-600' : 'bg-blue-50'
              }`}
            >
              <h4 className="font-bold mb-2">Solution Steps:</h4>
              <ol className="list-decimal ml-6">
                {currentProblem.steps.map((step, idx) => (
                  <li key={idx} className="mb-2">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      {!currentProblem && (
        <div
          className={`p-4 text-center ${
            dark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          <p>Select a category and click "New Problem" to begin.</p>
          <p className="text-sm mt-2">
            Practice with {SCIENCE_FORMULA_PRACTICE.length} formula problems!
          </p>
        </div>
      )}
    </div>
  );
}
