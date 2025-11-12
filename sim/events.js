// sim/events.js
// Handles life events with age windows and recurring tracking

import eventsCfg from '../data/events.json';
import { calcMonthlyFromAnnualProb } from './economy.js';

export function initEventLog() {
  return {
    history: [], // { month, year, event_id, description }
    lastOccurrence: {}, // event_id -> month when last triggered
  };
}

export function rollMonthlyEvents(
  player,
  eventsCfg,
  eventLog,
  currentMonth,
  currentYear
) {
  let triggered = [];
  const ageYears = Math.floor((player.ageMonths || 0) / 12);

  for (const event of eventsCfg) {
    // Check age window if specified
    if (event.age_min !== undefined && ageYears < event.age_min) continue;
    if (event.age_max !== undefined && ageYears > event.age_max) continue;

    // Check recurrence: skip if triggered recently
    if (event.recurs_every_years) {
      const lastMonth = eventLog.lastOccurrence[event.id];
      if (
        lastMonth &&
        currentMonth - lastMonth < event.recurs_every_years * 12
      ) {
        continue;
      }
    }

    // Check requirements
    if (event.requires) {
      let ok = true;
      for (const req of event.requires) {
        if (req.startsWith('!')) {
          // Negated condition
          const key = req.substring(1);
          if (player[key]) ok = false;
        } else {
          if (!player[req]) ok = false;
        }
      }
      if (!ok) continue;
    }

    const prob = calcMonthlyFromAnnualProb(event.annual_prob);
    if (Math.random() < prob) {
      // Apply effects
      applyEventEffects(player, event);

      triggered.push(event.id);
      eventLog.lastOccurrence[event.id] = currentMonth;
      eventLog.history.push({
        month: currentMonth,
        year: currentYear,
        ageYears,
        event_id: event.id,
        description: event.description || event.id,
      });
    }
  }
  return triggered;
}

function applyEventEffects(player, event) {
  const eff = event.effects || {};

  // Cash impact
  if (eff.cash_delta) player.cash += eff.cash_delta;
  if (event.one_time_cost) player.cash -= event.one_time_cost;

  // Recurring expenses
  if (event.monthly_cost_add && event.duration_months) {
    player.recurringAdjustments = player.recurringAdjustments || [];
    player.recurringAdjustments.push({
      key: event.id,
      amount: event.monthly_cost_add,
      months: event.duration_months,
    });
  }

  // Rent multiplier
  if (event.monthly_rent_delta_pct && player.dwelling) {
    player.rentMultiplier =
      (player.rentMultiplier || 1) * (1 + event.monthly_rent_delta_pct);
  }

  // Temp income
  if (event.monthly_income_add && event.duration_months) {
    player.tempIncome = player.tempIncome || [];
    player.tempIncome.push({
      amount: event.monthly_income_add,
      months: event.duration_months,
    });
  }

  // Household changes
  if (eff.add_partner) player.has_partner = true;
  if (eff.remove_partner) player.has_partner = false;
  if (eff.add_child) {
    player.household = player.household || { partner: false, children: [] };
    player.household.children.push({ ageMonths: 0 });
  }

  // Unemployment
  if (eff.unemployment_months) {
    player.unemployed = true;
    player.unemploymentRemaining = eff.unemployment_months;
    player.unemploymentBenefit = eff.unemployment_benefit_pct || 0.45;
  }

  // Investment shock
  if (eff.investment_loss_pct) {
    player.investments =
      (player.investments || 0) * (1 + eff.investment_loss_pct);
  }

  // Asset split (divorce)
  if (eff.asset_split_pct) {
    const split = eff.asset_split_pct;
    player.cash *= 1 + split;
    player.investments = (player.investments || 0) * (1 + split);
    if (player.homeEquity) player.homeEquity *= 1 + split;
  }

  // Home purchase trigger
  if (eff.trigger_home_purchase) {
    player.wantsHomePurchase = true;
  }
}
