# Lifetime Mode - Module Completion Status

## ✅ Completed Foundation Modules (5/5)

### 1. lifetime.js - Time/Age/Pacing Engine

**Location:** `sim/lifetime.js`, `frontend/sim/lifetime.js`

**Functions:**

- `initClock(birthYear, ageMonths, retirementTargetAge, maxYears)` - Initialize age tracking
- `advanceOneMonth(clock)` - Increment age by 1 month
- `getAgeYears(clock)` - Get current age in years
- `shouldPauseForCheckpoint(clock, lastCheckpoint)` - Detect 5-year intervals after age 25
- `isRetirementAge(clock)` - Check if player reached retirement
- `reachedEnd(clock)` - Check if simulation complete
- `formatAge(ageMonths)` - Display "XX years Y months"

**Auto-Advance:**

- Default 100ms per month tick (configurable 60-120ms)
- Target: 30-minute real-time session for 50-year simulation
- 600 months × 100ms = 60 seconds + 8 checkpoint pauses (15-20 sec each) = ~3 minutes per decade

---

### 2. household.js - Family Composition Manager

**Location:** `sim/household.js`, `frontend/sim/household.js`

**Functions:**

- `initHousehold()` - Empty household state
- `addPartner(household)` - Add partner, trigger 25% shared expense reduction
- `removePartner(household)` - Remove partner (divorce)
- `addChild(household, childcareCost)` - Add child with age 0, childcare cost $550-900/mo
- `advanceHouseholdOneMonth(household)` - Age all children by 1 month
- `getActiveChildcareCosts(household)` - Sum childcare for kids under 48 months
- `getHouseholdSize(household)` - Count members for expense scaling
- `applySharedExpenses(expenses, hasPartner)` - 25% reduction on utilities/groceries/transport/internet/misc

**Key Logic:**

- Children require childcare only until 48 months old
- Partner presence reduces household expenses by 25%
- Household size affects scaling for certain expense categories

---

### 3. housing.js - Housing Lifecycle (Rent → Mortgage → Equity)

**Location:** `sim/housing.js`, `frontend/sim/housing.js`

**Functions:**

- `initHousing()` - Empty housing state (renting)
- `canAffordHome(grossIncome, homePrice, downPaymentPct)` - Affordability check (3.5x gross income)
- `purchaseHome(housing, player, homePrice, downPaymentPct, apr, termMonths, closingCostPct)` - Buy home with down payment + closing costs
- `mortgagePayment(principal, apr, termMonths)` - Standard amortization formula
- `advanceMortgageOneMonth(housing, appreciationRate)` - P&I split, equity tracking, 3% annual appreciation
- `getHomeEquity(housing)` - Current equity (value - remaining principal)
- `sellHome(housing, sellingCostPct)` - Sell home, return net proceeds (after 6% selling costs)
- `getMonthlyHousingCost(player, basket, regionMult)` - **Respects rent=$0 rule** for null dwelling, calculates mortgage+tax+insurance+maintenance for owned homes

**Key Logic:**

- Rent stays $0 until dwelling chosen (preserved from original requirement)
- Mortgage converts rent to P&I + property tax + insurance + maintenance
- Home appreciates 3% annually
- Selling costs 6% of home value
- Down payment from `retirement.json` parameters (20% standard, 3.5% FHA)

---

### 4. loans.js - Generic Loan Amortization

**Location:** `sim/loans.js`, `frontend/sim/loans.js`

**Functions:**

- `initLoans()` - Empty loan collections (student, car, personal)
- `addLoan(loans, type, { principal, apr, termMonths, label })` - Add new loan
- `calculateMonthlyPayment(principal, apr, termMonths)` - Standard amortization
- `advanceLoansOneMonth(loans)` - Process all loans, return { totalPayment, totalInterest }
- `getTotalLoanBalance(loans)` - Sum all outstanding balances
- `getTotalMonthlyPayment(loans)` - Sum all monthly payments
- `payExtraOnLoan(loans, type, extraPayment)` - Extra payment on highest-interest loan (checkpoint decisions)

**Key Logic:**

- Supports student, car, personal loan types
- Interest-first amortization (standard practice)
- Extra payments target highest APR loan first
- Loans auto-removed when paid off

**Data Integration:**

- APRs from `retirement.json`: student 5.5%, car 4.8%, personal 12%

---

### 5. retirement.js - Retirement Income Modeling

**Location:** `sim/retirement.js`, `frontend/sim/retirement.js`

**Functions:**

- `estimateSocialSecurity(avgMonthlyWage, retirementConfig)` - Band-based SS calculation (60%/40%/20%)
- `calculatePensionBenefit(careerState, monthsWorked, retirementConfig)` - 1.5% × wage × years worked (capped at 30 years, 10-year vesting)
- `getHealthInsuranceCost(ageYears, retirementConfig)` - $650/mo pre-65, $180/mo Medicare at 65+
- `calculateWithdrawal(investments, retirementConfig, ageYears)` - Guardrails 3-5% annual (3% until 70, ramping to 5% after 75)
- `initRetirementIncome(player, careerState, retirementConfig)` - Initialize all retirement income sources
- `computeRetirementMonthlyNet(retirementIncome, taxConfig)` - Tax retirement income (SS 85% taxable, pension/withdrawal 100%)
- `gradeRetirementOutcome(netWorth, monthlyIncome, monthlyExpenses, ageAtRetirement)` - A-F retirement grade

**Key Logic:**

- SS replaces 60% up to $30k wage, 40% up to $70k, 20% up to $150k
- Pension only for eligible careers (nurses, teachers per `retirement.json`)
- Medicare eligibility at 65 reduces health costs from $650 to $180/mo
- Withdrawal rate increases with age (sequence-of-returns risk modeling)
- Grading rubric: A ($500k+ net worth, 100% replacement, retire ≤67), F (negative net worth or <40% replacement)

---

## ✅ Extended Core Modules

### events.js - Age Windows & Recurring Events

**Changes:**

- Added `initEventLog()` for event history tracking
- Updated `rollMonthlyEvents()` signature: now requires `eventLog`, `currentMonth`, `currentYear`
- **Age window checking:** `age_min` and `age_max` filtering
- **Recurrence tracking:** `recurs_every_years` prevents duplicate triggers within window
- **Negated conditions:** Support `!property` in `requires` array (e.g., `!owns_home`)
- **New effects:** `add_partner`, `remove_partner`, `add_child`, `unemployment_months`, `investment_loss_pct`, `asset_split_pct`, `trigger_home_purchase`

**Data Integration:**

- Works with `life_events_long.json` (13 age-windowed lifetime events)

---

### economy.js - Career Plateau & Investment Compounding

**Changes:**

- Updated `computeGrossIncome()`: Added `player` parameter for unemployment benefit calculation (45% of last wage)
- Updated `applyMonthlyRaises()`: Added `ageYears` parameter, **merit raises reduced 50% after age 55**, **promotions disabled after 55**
- New `advanceInvestmentsOneMonth()`: Monthly contributions with 3% employer match, Monte Carlo returns (7% mean, 15% volatility), sequence-of-returns risk modeling
- New `handleUnemployment()`: Decrements `unemploymentRemaining` counter, clears `unemployed` flag when benefits expire

**Key Logic:**

- Career plateau realistically models earning stagnation in late career
- Investment volatility creates realistic portfolio swings
- Unemployment benefits last 4 months at 45% replacement (from `life_events_long.json`)

---

## 📦 Data Files Ready

### life_events_long.json

**Location:** `data/life_events_long.json`, `frontend/data/life_events_long.json`

**13 Events:**

1. `meet_partner` (age 20-35): Add partner, 25% shared expenses
2. `first_child` (age 22-40, requires partner): Add child, $650/mo childcare
3. `second_child` (age 25-42, requires partner + existing child): Add 2nd child, $900/mo childcare
4. `buy_home` (age 24-50, requires !owns_home): Trigger home purchase flow
5. `car_replace` (age 22-65, recurs every 8 years): $8k cost
6. `health_shock` (age 45-65): $5k-12k cost
7. `tuition_resume` (age 28-50): $350/mo for 24 months (education)
8. `parent_care` (age 40-60): $600/mo for 36 months
9. `promotion_major` (age 30-50): +15% wage bump
10. `job_loss` (age 25-60): Unemployment 4 months, 45% benefit
11. `market_crash` (age 30-65): -30% investments
12. `windfall` (age 25-65): +$15k cash
13. `divorce` (age 28-60, requires partner): -50% assets, remove partner

---

### retirement.json

**Location:** `data/retirement.json`, `frontend/data/retirement.json`

**Parameters:**

- **Social Security:** 3 bands (60%/40%/20% by wage tier)
- **Medicare:** Age 65, $180/mo (pre-65 insurance $650/mo)
- **Pension:** Nurses, teachers eligible (1.5% × wage × years, 10yr vesting, 30yr cap)
- **Withdrawal Policy:** 3% floor, 5% ceiling (guardrails)
- **Housing Purchase:** 3.5x gross income, 20% down, 6.5% APR, 30yr term, 2% closing costs
- **Loan APRs:** Student 5.5%, car 4.8%, personal 12%
- **Investment:** 7% mean return, 15% volatility, 3% employer match

---

## 🚀 Ready for Integration

### Next Steps: HTML Integration

1. **Load new data files:**

   ```javascript
   const lifeEventsLong = await fetch('/data/life_events_long.json').then((r) =>
     r.json()
   );
   const retirementConfig = await fetch('/data/retirement.json').then((r) =>
     r.json()
   );
   ```

2. **Initialize lifetime state:**

   ```javascript
   const clock = initClock(2000, 240, 67, 50); // Born 2000, start at age 20, retire 67, max 50 years
   const household = initHousehold();
   const housing = initHousing();
   const loans = initLoans();
   const eventLog = initEventLog();
   ```

3. **Main simulation loop (auto-advance):**

   ```javascript
   let isPaused = false;
   let lastCheckpoint = 0;

   function tick() {
     if (isPaused) return;

     // Advance time
     advanceOneMonth(clock);
     const ageYears = getAgeYears(clock);

     // Economy
     const isEmployed = !player.unemployed;
     const gross = computeGrossIncome(careerState, null, player);
     const net = computePayrollNet(gross, taxConfig);

     // Events
     const triggeredEvents = rollMonthlyEvents(
       player,
       [...eventsCfg, ...lifeEventsLong],
       eventLog,
       clock.currentMonth,
       clock.currentYear
     );

     // Household
     advanceHouseholdOneMonth(household);
     const childcareCosts = getActiveChildcareCosts(household);

     // Housing
     if (player.owns_home) {
       advanceMortgageOneMonth(housing, 0.03 / 12); // 3% annual appreciation
     }

     // Loans
     const { totalPayment: loanPayment } = advanceLoansOneMonth(loans);

     // Investments
     advanceInvestmentsOneMonth(player, retirementConfig, isEmployed);

     // Expenses
     let expenses = buildMonthlyExpenses(player, costOfLivingCfg, regionMult);
     expenses = applySharedExpenses(expenses, household.partner);
     expenses.childcare = childcareCosts;
     expenses.housing = getMonthlyHousingCost(
       player,
       costOfLivingCfg.basket,
       regionMult
     );
     expenses.loans = loanPayment;

     // Net cash flow
     player.cash +=
       net.net - Object.values(expenses).reduce((a, b) => a + b, 0);

     // Raises
     applyMonthlyRaises(careerState, perfScore, ageYears);

     // Unemployment
     handleUnemployment(player);

     // Check for retirement
     if (isRetirementAge(clock)) {
       switchToRetirement();
     }

     // Check for checkpoint pause
     if (shouldPauseForCheckpoint(clock, lastCheckpoint)) {
       isPaused = true;
       lastCheckpoint = getAgeYears(clock);
       showCheckpointModal(); // Decision point: extra loan payment, home purchase, career change
     }

     // Check for end
     if (reachedEnd(clock)) {
       endSimulation();
     }

     // Update UI
     updateTimeline();

     // Schedule next tick
     setTimeout(tick, 100); // 100ms = 10 months/sec = 5 years/min
   }
   ```

4. **Retirement income switching:**

   ```javascript
   function switchToRetirement() {
     player.isRetired = true;
     player.retirementIncome = initRetirementIncome(
       player,
       careerState,
       retirementConfig
     );
     // Stop regular paycheck, start SS + pension + withdrawals
   }
   ```

5. **End-of-simulation UI:**
   ```javascript
   function endSimulation() {
     const grade = gradeRetirementOutcome(
       player.netWorth,
       player.retirementIncome.total,
       player.monthlyExpenses,
       clock.retirementAge
     );

     // Show charts
     renderNetWorthChart(analytics.history);
     renderIncomeSourcesChart(player.retirementIncome);
     renderLifeStoryTimeline(eventLog.history);

     // Display grade and reflection prompts
     showRetirementGrade(grade);
   }
   ```

---

## 🎯 Integration Checklist

- [ ] Add data loading for `life_events_long.json` and `retirement.json`
- [ ] Initialize lifetime state (clock, household, housing, loans, eventLog)
- [ ] Implement auto-advance tick loop with 100ms interval
- [ ] Add checkpoint pause system (every 5 years after age 25)
- [ ] Build checkpoint decision modals (home purchase, extra loan payment, career change)
- [ ] Add retirement income switching at retirement age
- [ ] Build timeline HUD (decade markers, current age display)
- [ ] Add household info panel (partner status, # children, childcare costs)
- [ ] Add savings/loans info panel (investment balance, loan balances, monthly payments)
- [ ] Implement end-of-life charts (Net Worth line, Income Sources stack, Life Story timeline)
- [ ] Add retirement grade display (A-F with explanation)
- [ ] Add reflection prompts based on outcome

---

## 📊 Performance Targets

**Session Duration:** 30 minutes real-time

- 50 years × 12 months = 600 months
- 600 months × 100ms = 60 seconds of auto-play
- 8 checkpoint pauses × 15 seconds = 120 seconds
- Total: ~3 minutes base + 2 minutes decisions = **5 minutes per run** (comfortably under 30 min target)

**Adjustable Pacing:**

- 60ms tick = 10 months/sec = faster sessions (~4 min)
- 120ms tick = 5 months/sec = slower sessions (~8 min)

**Checkpoint Strategy:**

- Age 25, 30, 35, 40, 45, 50, 55, 60 = 8 pauses
- Each pause: 2-3 decision options, 15-20 seconds per decision
- Total pause time: ~2-3 minutes across full simulation

---

## 🔒 Preserved Requirements

✅ **Rent Rule:** `getMonthlyHousingCost()` returns $0 for null dwelling, switches seamlessly to mortgage for owned homes
✅ **Stage-Based Gameplay:** All existing stages remain intact (this is an extension, not a replacement)
✅ **Monthly Timesteps:** All calculations remain monthly
✅ **Data-Driven:** All new logic driven by JSON configs (no hardcoded magic numbers)
✅ **Pure Functions:** All modules use pure functions where possible for testability

---

## 📝 Module Summary

| Module        | Purpose                      | Key Functions                                                       | Status      |
| ------------- | ---------------------------- | ------------------------------------------------------------------- | ----------- |
| lifetime.js   | Time/age tracking            | initClock, advanceOneMonth, shouldPauseForCheckpoint                | ✅ Complete |
| household.js  | Family composition           | addPartner, addChild, applySharedExpenses                           | ✅ Complete |
| housing.js    | Rent → Mortgage → Equity     | purchaseHome, advanceMortgageOneMonth, sellHome                     | ✅ Complete |
| loans.js      | Generic amortization         | addLoan, advanceLoansOneMonth, payExtraOnLoan                       | ✅ Complete |
| retirement.js | Retirement income            | estimateSocialSecurity, calculateWithdrawal, gradeRetirementOutcome | ✅ Complete |
| events.js     | Age-windowed events          | rollMonthlyEvents (extended)                                        | ✅ Extended |
| economy.js    | Career plateau & investments | applyMonthlyRaises (extended), advanceInvestmentsOneMonth           | ✅ Extended |

**Total:** 5 new modules + 2 extended modules = **7 modules ready for integration**

---

## 🎮 User Experience Flow

1. **Start Screen (unchanged):** Select scenario/region/career/dwelling, see budget preview
2. **Stage 1-4 (unchanged):** Play existing stage-based gameplay with monthly decisions
3. **[NEW] Lifetime Mode Activation:** After stage 4, enter auto-advance mode
4. **[NEW] Auto-Advance Loop:** Simulation runs at 100ms/month, player watches timeline progress
5. **[NEW] Checkpoint Pauses:** Every 5 years, pause for major decisions (home, loans, career)
6. **[NEW] Retirement Switch:** At retirement age (67), income switches to SS + pension + withdrawals
7. **[NEW] End-of-Life Analytics:** Charts showing Net Worth, Income Sources, Life Story timeline
8. **[NEW] Retirement Grade:** A-F grade with reflection prompts based on outcome

---

## 💡 Next Immediate Actions

1. **Integrate into HTML:** Wire up auto-advance loop with checkpoint pauses
2. **Build UI components:** Timeline HUD, household panel, savings/loans panel
3. **Add checkpoint modals:** Home purchase, extra loan payment, career change decisions
4. **Implement retirement UI:** Income breakdown, withdrawal strategy display
5. **Build charts:** Net Worth line chart, Income Sources stacked area, Life Story timeline
6. **Test full 50-year run:** Verify all modules work together across full lifetime
7. **Tune pacing:** Adjust tick speed for target 30-minute session duration

---

**Status:** All foundation modules complete and ready for HTML integration. Next step is building the auto-advance loop and UI components.
