// sim/loans.js
// Generic loan amortization for student, car, personal loans

export function initLoans() {
  return {
    student: [],
    car: [],
    personal: []
  };
}

export function addLoan(loans, type, { principal, apr, termMonths, label = '' }) {
  if (!loans[type]) loans[type] = [];
  
  loans[type].push({
    label: label || `${type} loan`,
    originalPrincipal: principal,
    principal,
    apr,
    termMonths,
    monthsPaid: 0,
    monthlyPayment: calculateMonthlyPayment(principal, apr, termMonths)
  });
}

export function calculateMonthlyPayment(principal, apr, termMonths) {
  if (principal <= 0 || termMonths <= 0) return 0;
  const monthlyRate = apr / 12;
  if (monthlyRate === 0) return principal / termMonths;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
         (Math.pow(1 + monthlyRate, termMonths) - 1);
}

export function advanceLoansOneMonth(loans) {
  let totalPayment = 0;
  let totalInterest = 0;
  
  ['student', 'car', 'personal'].forEach(type => {
    if (!loans[type]) return;
    
    loans[type] = loans[type].filter(loan => {
      if (loan.principal <= 0) return false; // Paid off
      
      const interest = (loan.principal * loan.apr) / 12;
      const principalPaid = Math.min(loan.monthlyPayment - interest, loan.principal);
      
      loan.principal -= principalPaid;
      loan.monthsPaid++;
      
      totalPayment += loan.monthlyPayment;
      totalInterest += interest;
      
      return loan.principal > 0.01; // Keep if balance remains
    });
  });
  
  return { totalPayment, totalInterest };
}

export function getTotalLoanBalance(loans) {
  let total = 0;
  ['student', 'car', 'personal'].forEach(type => {
    if (!loans[type]) return;
    loans[type].forEach(loan => {
      total += loan.principal;
    });
  });
  return total;
}

export function getTotalMonthlyPayment(loans) {
  let total = 0;
  ['student', 'car', 'personal'].forEach(type => {
    if (!loans[type]) return;
    loans[type].forEach(loan => {
      total += loan.monthlyPayment;
    });
  });
  return total;
}

export function payExtraOnLoan(loans, type, extraPayment) {
  if (!loans[type] || loans[type].length === 0) return 0;
  
  // Pay extra on highest interest loan first
  loans[type].sort((a, b) => b.apr - a.apr);
  const loan = loans[type][0];
  
  const actualExtra = Math.min(extraPayment, loan.principal);
  loan.principal -= actualExtra;
  
  return actualExtra;
}
