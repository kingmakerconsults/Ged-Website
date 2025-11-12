// sim/household.js
// Household composition: partner, kids, dependents

export function initHousehold({ hasPartner = false, hasChild = false } = {}) {
  return {
    partner: hasPartner,
    kids: hasChild ? [{ ageMonths: 0 }] : [],
    sharedExpensesPct: hasPartner ? 0.25 : 0
  };
}

export function addPartner(household) {
  household.partner = true;
  household.sharedExpensesPct = 0.25;
}

export function removePartner(household) {
  household.partner = false;
  household.sharedExpensesPct = 0;
}

export function addChild(household, childcareMonths = 48, childcareCostRange = [550, 900]) {
  const childcareCost = childcareCostRange[0] + Math.random() * (childcareCostRange[1] - childcareCostRange[0]);
  household.kids.push({
    ageMonths: 0,
    childcareUntilMonth: childcareMonths,
    childcareCost: Math.round(childcareCost)
  });
}

export function advanceHouseholdOneMonth(household) {
  // Age all kids
  household.kids.forEach(kid => {
    kid.ageMonths++;
  });
}

export function getActiveChildcareCosts(household) {
  let total = 0;
  household.kids.forEach(kid => {
    if (kid.ageMonths < kid.childcareUntilMonth) {
      total += kid.childcareCost || 0;
    }
  });
  return total;
}

export function getHouseholdSize(household) {
  return 1 + (household.partner ? 1 : 0) + household.kids.length;
}

export function applySharedExpenses(expenses, household) {
  if (!household.partner) return expenses;
  
  // Reduce shared expenses by shared percentage
  const sharedKeys = ['utilities', 'groceries', 'transport', 'internet', 'misc'];
  const adjusted = { ...expenses };
  
  sharedKeys.forEach(key => {
    if (adjusted[key]) {
      adjusted[key] *= (1 - household.sharedExpensesPct);
    }
  });
  
  return adjusted;
}
