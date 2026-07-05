import { describe, it, expect } from "vitest";
import { calculateAmortization } from "@/lib/calculators/amortization";

describe("amortization", () => {
  it("calculates monthly payment correctly for a standard mortgage", () => {
    // $400,000 loan, 6.5% rate, 30 years
    const result = calculateAmortization(400000, 6.5, 30);
    expect(result.monthlyPayment).toBeCloseTo(2528.27, 2);
  });

  it("calculates total interest correctly", () => {
    const result = calculateAmortization(400000, 6.5, 30);
    expect(result.totalPayment).toBeCloseTo(result.monthlyPayment * 360, 2);
    expect(result.totalInterest).toBeCloseTo(result.totalPayment - 400000, 2);
  });

  it("handles zero interest rate", () => {
    const result = calculateAmortization(100000, 0, 10);
    expect(result.monthlyPayment).toBeCloseTo(100000 / 120, 2);
    expect(result.totalInterest).toBeCloseTo(0, 2);
  });

  it("first payment has more interest than principal", () => {
    const result = calculateAmortization(400000, 6.5, 30);
    const first = result.schedule[0];
    expect(first.interest).toBeGreaterThan(first.principal);
  });

  it("last payment has more principal than interest", () => {
    const result = calculateAmortization(400000, 6.5, 30);
    const last = result.schedule[result.schedule.length - 1];
    expect(last.principal).toBeGreaterThan(last.interest);
  });

  it("final balance is zero", () => {
    const result = calculateAmortization(400000, 6.5, 30);
    const last = result.schedule[result.schedule.length - 1];
    expect(last.balance).toBeCloseTo(0, 2);
  });

  it("schedule has correct number of entries", () => {
    const result = calculateAmortization(100000, 5, 15);
    expect(result.schedule).toHaveLength(180);
  });
});
