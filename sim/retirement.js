// sim/retirement.js
// Retirement income modeling: Social Security, pensions, withdrawals

export function estimateSocialSecurity(avgMonthlyWage, retirementConfig) {
  const annualWage = avgMonthlyWage * 12;
  const { ss_replacement_bands } = retirementConfig;

  let ssAnnual = 0;
  let remaining = annualWage;

  for (const band of ss_replacement_bands) {
    if (remaining <= 0) break;
    const covered = Math.min(remaining, band.up_to);
    ssAnnual += covered * band.rate;
    remaining -= covered;
  }

  return ssAnnual / 12; // Monthly SS benefit
}

export function calculatePensionBenefit(
  careerState,
  monthsWorked,
  retirementConfig
) {
  const { pension_careers } = retirementConfig;
  if (!pension_careers.includes(careerState.career_id)) return 0;

  const yearsWorked = monthsWorked / 12;
  if (yearsWorked < 10) return 0; // Minimum vesting

  // Simple formula: 1.5% of average wage per year worked, capped at 30 years
  const effectiveYears = Math.min(yearsWorked, 30);
  const avgMonthlyWage = careerState.current_wage || 0;
  return avgMonthlyWage * 0.015 * effectiveYears;
}

export function getHealthInsuranceCost(ageYears, retirementConfig) {
  if (ageYears >= retirementConfig.medicare_eligible_age) {
    return retirementConfig.medicare_monthly_cost;
  } else {
    return retirementConfig.pre_medicare_insurance_monthly;
  }
}

export function calculateWithdrawal(investments, retirementConfig, ageYears) {
  const { withdrawal_policy } = retirementConfig;
  const balance = investments || 0;

  // Guardrails: withdraw 3-5% based on age
  let rate = withdrawal_policy.floor;
  if (ageYears > 75) {
    rate = withdrawal_policy.ceiling;
  } else if (ageYears > 70) {
    rate = (withdrawal_policy.floor + withdrawal_policy.ceiling) / 2;
  }

  return (balance * rate) / 12; // Monthly withdrawal
}

export function initRetirementIncome(player, careerState, retirementConfig) {
  const ageYears = Math.floor(player.ageMonths / 12);

  return {
    social_security: estimateSocialSecurity(
      careerState.current_wage,
      retirementConfig
    ),
    pension: calculatePensionBenefit(
      careerState,
      player.monthsWorked || 0,
      retirementConfig
    ),
    withdrawal: calculateWithdrawal(
      player.investments,
      retirementConfig,
      ageYears
    ),
    health_insurance: getHealthInsuranceCost(ageYears, retirementConfig),
  };
}

export function computeRetirementMonthlyNet(retirementIncome, taxConfig) {
  const grossIncome =
    retirementIncome.social_security +
    retirementIncome.pension +
    retirementIncome.withdrawal;

  // Simplified tax on retirement income (SS partially taxable, pension/withdrawal fully)
  const taxableIncome =
    retirementIncome.social_security * 0.85 +
    retirementIncome.pension +
    retirementIncome.withdrawal;

  const federalTax = computeFederalTaxRetirement(taxableIncome, taxConfig);

  return grossIncome - federalTax - retirementIncome.health_insurance;
}

function computeFederalTaxRetirement(monthlyTaxable, taxConfig) {
  const annualTaxable = monthlyTaxable * 12;
  let tax = 0;
  let prev = 0;

  for (const band of taxConfig.federal_bands) {
    const bracket = band.up_to - prev;
    if (annualTaxable <= prev) break;
    const taxed = Math.min(annualTaxable - prev, bracket);
    tax += taxed * band.rate;
    prev = band.up_to;
  }

  return tax / 12;
}

export function gradeRetirementOutcome(
  netWorth,
  monthlyIncome,
  monthlyExpenses,
  ageAtRetirement
) {
  // Simple grading rubric
  const replacementRatio = monthlyIncome / monthlyExpenses;

  if (netWorth >= 500000 && replacementRatio >= 1.0 && ageAtRetirement <= 67)
    return 'A';
  if (netWorth >= 300000 && replacementRatio >= 0.8) return 'B';
  if (netWorth >= 100000 && replacementRatio >= 0.6) return 'C';
  if (netWorth >= 0 && replacementRatio >= 0.4) return 'D';
  return 'F';
}
