export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  totalInterest: number;
  totalPrincipal: number;
}

export interface AmortizationResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: AmortizationRow[];
}

/**
 * Calculate a loan amortization schedule.
 * Formula: M = P × [r(1+r)^n] / [(1+r)^n − 1]
 *
 * @param principal - Loan amount (P)
 * @param annualRate - Annual interest rate as a percentage (e.g. 6.5 for 6.5%)
 * @param termYears - Loan term in years
 * @returns Full amortization schedule
 */
export function calculateAmortization(
  principal: number,
  annualRate: number,
  termYears: number
): AmortizationResult {
  const n = termYears * 12;
  const r = annualRate / 100 / 12;

  let monthlyPayment: number;
  if (r === 0) {
    monthlyPayment = principal / n;
  } else {
    monthlyPayment = (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  }

  const schedule: AmortizationRow[] = [];
  let balance = principal;
  let totalInterest = 0;
  let totalPrincipal = 0;

  for (let month = 1; month <= n; month++) {
    const interestPayment = balance * r;
    const principalPayment = monthlyPayment - interestPayment;
    balance = Math.max(0, balance - principalPayment);
    totalInterest += interestPayment;
    totalPrincipal += principalPayment;

    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance,
      totalInterest,
      totalPrincipal,
    });
  }

  return {
    monthlyPayment,
    totalPayment: monthlyPayment * n,
    totalInterest,
    schedule,
  };
}
