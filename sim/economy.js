// sim/economy.js
// Core economic logic for Life Sim

import costOfLiving from '../config/cost_of_living.json';

export function calcRegionMultiplier(region) {
  if (region === 'LOW') return 1.0;
  if (region === 'MED') return 1.25;
  if (region === 'HIGH') return 1.6;
  return 1.0;
}

export function computeGrossIncome(careerState, monthState, player) {
  // Handle unemployment with benefits
  if (player && player.unemployed) {
    const lastWage = careerState.currentBasePay || 0;
    const monthlyWage =
      careerState.type === 'salary'
        ? lastWage / 12
        : lastWage * careerState.hours_per_week * 4.33;
    return monthlyWage * (player.unemploymentBenefit || 0.45);
  }

  if (careerState.type === 'salary') {
    return careerState.currentBasePay / 12;
  } else {
    // hourly
    let hours = careerState.hours_per_week * 4.33;
    return careerState.currentBasePay * hours;
  }
}

export function computePayrollNet(gross, taxCfg) {
  const fica = gross * taxCfg.fica;
  let taxable = gross - fica;
  let federal = 0;
  let remaining = taxable;
  for (const band of taxCfg.federal_bands) {
    if (band.up_to === null || remaining <= band.up_to) {
      federal += remaining * band.rate;
      break;
    } else {
      federal += band.up_to * band.rate;
      remaining -= band.up_to;
    }
  }
  const state = taxable * taxCfg.state_flat;
  const net = gross - fica - federal - state;
  return { net, fica, federal, state };
}

export function buildMonthlyExpenses(player, cfg, regionMult) {
  const basket = cfg.basket;
  let expenses = {};
  // Rent rule
  if (!player.dwelling) {
    expenses.rent = 0;
  } else {
    expenses.rent = basket[player.dwelling] * regionMult;
  }
  expenses.utilities = basket.utilities * regionMult;
  expenses.groceries =
    (player.has_child ? basket.groceries_family : basket.groceries_single) *
    regionMult;
  expenses.transport =
    (player.has_car ? basket.transport_car : basket.transport_transit) *
    regionMult;
  expenses.health = basket.health * regionMult;
  expenses.phone = basket.phone;
  expenses.internet = basket.internet;
  expenses.misc = basket.misc * regionMult;
  // Recurring adjustments (e.g., childcare)
  if (player.recurringAdjustments) {
    for (const adj of player.recurringAdjustments) {
      expenses[adj.key] = (expenses[adj.key] || 0) + adj.amount;
    }
  }
  return expenses;
}

export function applyInflation(expenses, cfg) {
  const infl = cfg.inflation;
  const inflatables = [
    'rent',
    'utilities',
    'groceries',
    'transport',
    'health',
    'misc',
  ];
  for (const key of inflatables) {
    if (expenses[key]) expenses[key] *= 1 + infl;
  }
  return expenses;
}

export function applyMonthlyRaises(careerState, perfScore, ageYears) {
  // Career plateau: reduce merit raises after age 55
  let meritMultiplier = 1.0;
  if (ageYears >= 55) {
    meritMultiplier = 0.5; // Half the merit raises
  }

  // COLA
  let cola = careerState.raise.cola / 12;
  // Merit
  let merit =
    ((careerState.raise.merit[0] + careerState.raise.merit[1]) / 2 / 12) *
    perfScore *
    meritMultiplier;
  careerState.currentBasePay *= 1 + cola + merit;
  careerState.monthsInRole++;

  // Promotion (not available after 55)
  let promoted = false;
  if (
    ageYears < 55 &&
    careerState.promotion &&
    careerState.promotion.to &&
    careerState.monthsInRole >= careerState.promotion.min_months
  ) {
    careerState.currentBasePay *= 1 + careerState.promotion.bump;
    careerState.currentTitle = careerState.promotion.to;
    careerState.monthsInRole = 0;
    promoted = true;
  }
  return promoted;
}

export function calcMonthlyFromAnnualProb(a) {
  return 1 - Math.pow(1 - a, 1 / 12);
}

export function advanceInvestmentsOneMonth(
  player,
  retirementConfig,
  isEmployed
) {
  if (!player.investments) player.investments = 0;

  // Monthly contribution if employed
  let contribution = 0;
  if (isEmployed && player.investmentContribution) {
    contribution = player.investmentContribution;
    player.cash -= contribution;

    // Employer match (3% of gross wage)
    const employerMatch =
      contribution * retirementConfig.investment.employer_match;
    contribution += employerMatch;
  }

  player.investments += contribution;

  // Monthly return with volatility (simple Monte Carlo)
  const annualReturn = retirementConfig.investment.mean_return;
  const annualVolatility = retirementConfig.investment.volatility;

  const monthlyReturn = annualReturn / 12;
  const monthlyVolatility = annualVolatility / Math.sqrt(12);

  // Generate random return
  const randomReturn =
    monthlyReturn + monthlyVolatility * (Math.random() - 0.5) * 2;
  player.investments *= 1 + randomReturn;

  return contribution;
}

export function handleUnemployment(player) {
  if (player.unemployed && player.unemploymentRemaining > 0) {
    player.unemploymentRemaining--;
    if (player.unemploymentRemaining <= 0) {
      player.unemployed = false;
    }
  }
}
