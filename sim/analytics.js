// sim/analytics.js
// Track and summarize run data

export function initAnalytics() {
  return {
    months: [],
    gross: [],
    fica: [],
    federal: [],
    state: [],
    net: [],
    expensesTotal: [],
    rent: [],
    cash: [],
    debt: [],
    netWorth: [],
    invested: [],
  };
}

export function pushMonth(analytics, monthSnapshot) {
  analytics.months.push(monthSnapshot.month);
  analytics.gross.push(monthSnapshot.grossIncome);
  analytics.fica.push(monthSnapshot.fica);
  analytics.federal.push(monthSnapshot.federalTax);
  analytics.state.push(monthSnapshot.stateTax);
  analytics.net.push(monthSnapshot.netIncome);
  analytics.expensesTotal.push(monthSnapshot.totalExpenses);
  analytics.rent.push(monthSnapshot.expenses.rent || 0);
  analytics.cash.push(monthSnapshot.cash);
  analytics.debt.push(monthSnapshot.debt);
  analytics.netWorth.push(monthSnapshot.netWorth);
  analytics.invested.push(monthSnapshot.invested || 0);
}

export function summarize(analytics) {
  // Sankey-ish: income → taxes/expenses/savings
  return {
    totalGross: sum(analytics.gross),
    totalNet: sum(analytics.net),
    totalExpenses: sum(analytics.expensesTotal),
    totalTaxes:
      sum(analytics.fica) + sum(analytics.federal) + sum(analytics.state),
    finalNetWorth: analytics.netWorth[analytics.netWorth.length - 1] || 0,
  };
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}
