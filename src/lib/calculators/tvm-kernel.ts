import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/engine/format";
import { compoundInterest, simpleInterest, futureValue, periodicPayment, investmentSchedule, effectiveAnnualRate, yearsToDouble } from "./tvm";
import { calculateAmortization } from "./amortization";

export function calculate(inputs: InputValues): CalculatorOutput {
  const principal = Number(inputs.principal ?? inputs.initial ?? inputs.deposit ?? inputs.price ?? 0);
  const rate = Number(inputs.rate ?? 0);
  const years = Number(inputs.years ?? inputs.term ?? 10);
  const monthly = Number(inputs.monthly ?? 0);
  const freq = Number(inputs.compoundFreq ?? 12);
  const id = String(inputs._id ?? "");

  // Compound Interest
  if (id === "compound-interest") {
    const fv = futureValue(principal, 0, rate, years, freq);
    const interest = fv - principal;
    return {
      results: [
        { label: "Future value", value: formatCurrency(fv), rawValue: fv, large: true },
        { label: "Total interest", value: formatCurrency(interest), rawValue: interest },
        { label: "Effective annual rate", value: formatPercent(effectiveAnnualRate(rate, freq)) },
      ],
    };
  }

  // Simple Interest
  if (id === "simple-interest") {
    const amount = simpleInterest(principal, rate, years);
    const interest = amount - principal;
    return {
      results: [
        { label: "Final amount", value: formatCurrency(amount), rawValue: amount, large: true },
        { label: "Interest earned", value: formatCurrency(interest), rawValue: interest },
        { label: "Total", value: formatCurrency(amount) },
      ],
    };
  }

  // Savings
  if (id === "savings") {
    const fv = futureValue(principal, monthly, rate, years, 12);
    const totalContrib = principal + monthly * years * 12;
    const interest = fv - totalContrib;
    return {
      results: [
        { label: "Future balance", value: formatCurrency(fv), rawValue: fv, large: true },
        { label: "Total contributions", value: formatCurrency(totalContrib) },
        { label: "Interest earned", value: formatCurrency(interest) },
      ],
    };
  }

  // CD
  if (id === "cd") {
    const fv = futureValue(principal, 0, rate, years / 12, freq);
    const interest = fv - principal;
    return {
      results: [
        { label: "Value at maturity", value: formatCurrency(fv), rawValue: fv, large: true },
        { label: "Interest earned", value: formatCurrency(interest) },
        { label: "Effective rate", value: formatPercent(effectiveAnnualRate(rate, freq)) },
      ],
    };
  }

  // Auto Loan
  if (id === "auto-loan") {
    const loanAmount = Math.max(0, principal - Number(inputs.down ?? 0));
    if (loanAmount <= 0) {
      return { results: [{ label: "Monthly payment", value: "$0.00", large: true }] };
    }
    const { monthlyPayment, totalInterest } = calculateAmortization(loanAmount, rate, years);
    return {
      results: [
        { label: "Monthly payment", value: formatCurrency(monthlyPayment), rawValue: monthlyPayment, large: true },
        { label: "Loan amount", value: formatCurrency(loanAmount) },
        { label: "Total interest", value: formatCurrency(totalInterest) },
        { label: "Total cost", value: formatCurrency(monthlyPayment * years * 12) },
      ],
    };
  }

  // Retirement
  if (id === "retirement") {
    const currentAge = Number(inputs.currentAge ?? 30);
    const retireAge = Number(inputs.retireAge ?? 65);
    const yearsToRetire = Math.max(1, retireAge - currentAge);
    const monthlyContrib = Number(inputs.monthlyContrib ?? 0);
    const annualSpending = Number(inputs.annualSpending ?? 60000);
    const fv = futureValue(principal, monthlyContrib, rate, yearsToRetire, 12);
    const yearsOfRetirement = 30;
    const needed = annualSpending * yearsOfRetirement;
    const surplus = fv - needed;
    return {
      results: [
        { label: "Projected savings", value: formatCurrency(fv), rawValue: fv, large: true },
        { label: "Estimated need (30yr)", value: formatCurrency(needed) },
        { label: "Surplus / deficit", value: formatCurrency(surplus) },
        { label: "Years to retirement", value: `${yearsToRetire}` },
      ],
    };
  }

  // Investment
  if (id === "investment") {
    const fv = futureValue(principal, monthly, rate, years, 12);
    const totalContrib = principal + monthly * years * 12;
    const interest = fv - totalContrib;
    return {
      results: [
        { label: "Future value", value: formatCurrency(fv), rawValue: fv, large: true },
        { label: "Total invested", value: formatCurrency(totalContrib) },
        { label: "Investment gains", value: formatCurrency(interest) },
      ],
    };
  }

  // Generic Interest
  const type = String(inputs.type ?? "compound");
  if (type === "simple") {
    const amount = simpleInterest(principal, rate, years);
    return {
      results: [
        { label: "Final amount", value: formatCurrency(amount), rawValue: amount, large: true },
        { label: "Interest earned", value: formatCurrency(amount - principal) },
      ],
    };
  } else {
    const fv = compoundInterest(principal, rate, years, 12);
    return {
      results: [
        { label: "Final amount", value: formatCurrency(fv), rawValue: fv, large: true },
        { label: "Interest earned", value: formatCurrency(fv - principal) },
      ],
    };
  }
}
