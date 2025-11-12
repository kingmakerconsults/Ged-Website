// sim/housing.js
// Housing logic: rent -> mortgage -> equity across decades

export function initHousing({ dwelling = null, region = 'MED' } = {}) {
  return {
    type: dwelling ? 'rent' : null, // null, 'rent', 'own'
    dwelling, // rent_roommate, rent_studio, rent_1br, rent_2br, or null
    homeValue: 0,
    mortgagePrincipal: 0,
    mortgageRate: 0,
    mortgageTermMonths: 0,
    mortgageMonthsPaid: 0,
    downPayment: 0,
    region,
  };
}

export function canAffordHome(player, annualGross, housingCfg) {
  const homePrice = annualGross * housingCfg.home_price_mult_annual_gross;
  const downPayment = homePrice * housingCfg.down_payment_pct;
  const closingCosts = homePrice * housingCfg.closing_costs_pct;
  const totalUpfront = downPayment + closingCosts;

  return player.cash >= totalUpfront;
}

export function purchaseHome(housing, player, annualGross, housingCfg) {
  const homePrice = annualGross * housingCfg.home_price_mult_annual_gross;
  const downPayment = homePrice * housingCfg.down_payment_pct;
  const closingCosts = homePrice * housingCfg.closing_costs_pct;
  const totalUpfront = downPayment + closingCosts;

  if (player.cash < totalUpfront) return false;

  // Deduct upfront costs
  player.cash -= totalUpfront;

  // Setup mortgage
  housing.type = 'own';
  housing.dwelling = null; // No longer renting
  housing.homeValue = homePrice;
  housing.downPayment = downPayment;
  housing.mortgagePrincipal = homePrice - downPayment;
  housing.mortgageRate = housingCfg.mortgage_apr;
  housing.mortgageTermMonths = housingCfg.mortgage_term_years * 12;
  housing.mortgageMonthsPaid = 0;

  return true;
}

export function mortgagePayment(principal, apr, termMonths) {
  if (principal <= 0 || termMonths <= 0) return 0;
  const monthlyRate = apr / 12;
  if (monthlyRate === 0) return principal / termMonths;
  return (
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
    (Math.pow(1 + monthlyRate, termMonths) - 1)
  );
}

export function advanceMortgageOneMonth(housing) {
  if (housing.type !== 'own' || housing.mortgagePrincipal <= 0)
    return { payment: 0, interest: 0, principal: 0 };

  const payment = mortgagePayment(
    housing.mortgagePrincipal,
    housing.mortgageRate,
    housing.mortgageTermMonths - housing.mortgageMonthsPaid
  );
  const interest = (housing.mortgagePrincipal * housing.mortgageRate) / 12;
  const principalPaid = payment - interest;

  housing.mortgagePrincipal = Math.max(
    0,
    housing.mortgagePrincipal - principalPaid
  );
  housing.mortgageMonthsPaid++;

  // Appreciate home value monthly
  const monthlyAppreciation = 0.03 / 12; // 3% annual default
  housing.homeValue *= 1 + monthlyAppreciation;

  return { payment, interest, principal: principalPaid };
}

export function getHomeEquity(housing) {
  if (housing.type !== 'own') return 0;
  return Math.max(0, housing.homeValue - housing.mortgagePrincipal);
}

export function sellHome(housing, player, housingCfg) {
  if (housing.type !== 'own') return 0;

  const equity = getHomeEquity(housing);
  const sellingCosts = housing.homeValue * housingCfg.selling_costs_pct;
  const netProceeds = Math.max(0, equity - sellingCosts);

  player.cash += netProceeds;

  // Reset housing to rent
  housing.type = null;
  housing.dwelling = null;
  housing.homeValue = 0;
  housing.mortgagePrincipal = 0;
  housing.mortgageMonthsPaid = 0;

  return netProceeds;
}

export function getMonthlyHousingCost(housing, basket, regionMult, housingCfg) {
  if (housing.type === 'own') {
    const mortgagePI = mortgagePayment(
      housing.mortgagePrincipal,
      housing.mortgageRate,
      housing.mortgageTermMonths - housing.mortgageMonthsPaid
    );
    const propertyTax =
      (housing.homeValue * housingCfg.property_tax_annual_pct) / 12;
    const insurance = housingCfg.home_insurance_annual / 12;
    const maintenance =
      (housing.homeValue * housingCfg.maintenance_annual_pct) / 12;
    return mortgagePI + propertyTax + insurance + maintenance;
  } else if (housing.dwelling) {
    // Rent (rule: $0 if no dwelling)
    return basket[housing.dwelling] * regionMult;
  }
  return 0;
}
