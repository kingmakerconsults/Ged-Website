// sim/investment.js
// Simple investment model (stub)

export function applyInvestment(player, opts) {
  // Only allow if emergency fund >= $1,000
  if (player.cash < 1000) return 0;
  const investable = Math.max(0, opts.amount || 0);
  // Monte-Carlo: mean 0.5%/mo, stdev 1.5%
  const r = 0.005 + (Math.random() - 0.5) * 0.03;
  const gain = investable * r;
  player.invested = (player.invested || 0) + investable + gain;
  player.cash -= investable;
  return gain;
}
