/**
 * Time Value of Money (TVM) kernel.
 * Shared by: compound interest, savings, CD, IRA, retirement, annuity, auto loan, etc.
 *
 * Core formulas:
 * - Future Value: FV = PV × (1 + r)^n + PMT × [((1 + r)^n - 1) / r]
 * - Present Value: PV = FV / (1 + r)^n
 * - Payment: PMT = (FV - PV × (1 + r)^n) × r / ((1 + r)^n - 1)
 * - Compound Interest: A = P(1 + r/n)^(nt)
 * - Simple Interest: A = P(1 + rt)
 */

export interface TVMInputs {
  presentValue?: number; // PV - initial investment/loan
  futureValue?: number;  // FV - target value
  payment?: number;      // PMT - periodic payment
  rate?: number;         // annual interest rate as percent
  periods?: number;      // number of periods
  compoundFreq?: number; // compounding frequency per year (default 12)
}

export interface TVMResult {
  futureValue: number;
  presentValue: number;
  totalContributions: number;
  totalInterest: number;
  effectiveRate: number;
}

/** Calculate future value with compound interest and periodic payments */
export function futureValue(
  pv: number,
  pmt: number,
  annualRate: number,
  years: number,
  compoundFreq = 12
): number {
  const r = annualRate / 100 / compoundFreq;
  const n = years * compoundFreq;
  if (r === 0) return pv + pmt * n;
  return pv * Math.pow(1 + r, n) + pmt * ((Math.pow(1 + r, n) - 1) / r);
}

/** Calculate present value needed to reach a future target */
export function presentValue(
  fv: number,
  pmt: number,
  annualRate: number,
  years: number,
  compoundFreq = 12
): number {
  const r = annualRate / 100 / compoundFreq;
  const n = years * compoundFreq;
  if (r === 0) return fv - pmt * n;
  return (fv - pmt * ((Math.pow(1 + r, n) - 1) / r)) / Math.pow(1 + r, n);
}

/** Calculate periodic payment needed to reach a future target */
export function periodicPayment(
  pv: number,
  fv: number,
  annualRate: number,
  years: number,
  compoundFreq = 12
): number {
  const r = annualRate / 100 / compoundFreq;
  const n = years * compoundFreq;
  if (r === 0) return (fv - pv) / n;
  return ((fv - pv * Math.pow(1 + r, n)) * r) / (Math.pow(1 + r, n) - 1);
}

/** Simple interest: A = P(1 + rt) */
export function simpleInterest(principal: number, annualRate: number, years: number): number {
  return principal * (1 + (annualRate / 100) * years);
}

/** Compound interest: A = P(1 + r/n)^(nt) */
export function compoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundFreq = 12
): number {
  const r = annualRate / 100;
  return principal * Math.pow(1 + r / compoundFreq, compoundFreq * years);
}

/** Calculate a full investment growth schedule */
export function investmentSchedule(
  pv: number,
  pmt: number,
  annualRate: number,
  years: number,
  compoundFreq = 12
): { period: number; balance: number; contributions: number; interest: number }[] {
  const r = annualRate / 100 / compoundFreq;
  const n = years * compoundFreq;
  const schedule: { period: number; balance: number; contributions: number; interest: number }[] = [];
  let balance = pv;
  let totalContrib = pv;
  let totalInterest = 0;

  for (let i = 1; i <= n; i++) {
    const interestEarned = balance * r;
    balance += interestEarned + pmt;
    totalContrib += pmt;
    totalInterest += interestEarned;

    if (i % compoundFreq === 0 || i === n) {
      schedule.push({
        period: i,
        balance,
        contributions: totalContrib,
        interest: totalInterest,
      });
    }
  }

  return schedule;
}

/** Effective annual rate from nominal rate with compounding */
export function effectiveAnnualRate(annualRate: number, compoundFreq: number): number {
  const r = annualRate / 100;
  return (Math.pow(1 + r / compoundFreq, compoundFreq) - 1) * 100;
}

/** Rule of 72 — years to double */
export function yearsToDouble(annualRate: number): number {
  return 72 / annualRate;
}
