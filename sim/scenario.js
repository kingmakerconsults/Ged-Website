// sim/scenario.js
// Scenario logic

import scenarios from '../data/scenarios.json';

export function initFromScenario(scenarioDef) {
  return {
    player: {
      region: scenarioDef.region,
      cash: scenarioDef.starting_cash,
      debt: scenarioDef.starting_debt,
      has_child: scenarioDef.has_child,
      dwelling: scenarioDef.dwelling,
      recurringAdjustments: [],
      tempIncome: [],
      rentMultiplier: 1,
    },
    goal: scenarioDef.goal,
  };
}

export function checkGoal(player, goal) {
  if (goal.type === 'net_worth') {
    return player.cash - player.debt >= goal.target;
  }
  if (goal.type === 'debt_free') {
    return player.debt <= 0;
  }
  if (goal.type === 'income') {
    return player.lastNetIncome >= goal.target_monthly_net;
  }
  return false;
}
