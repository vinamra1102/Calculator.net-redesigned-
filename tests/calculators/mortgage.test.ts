import { describe, it, expect } from "vitest";
import { calculate } from "@/lib/calculators/mortgage.calc";

describe("mortgage calculator", () => {
  const defaultInputs = {
    price: "400000",
    downPct: "20",
    years: "30",
    rate: "6.5",
  };

  it("calculates monthly payment for default inputs", () => {
    const result = calculate(defaultInputs);
    const monthlyPayment = result.results.find((r) => r.label === "Monthly payment");
    expect(monthlyPayment).toBeDefined();
    // $400k - 20% down = $320k loan at 6.5% for 30 years
    expect(monthlyPayment!.rawValue).toBeCloseTo(2022.62, 2);
  });

  it("calculates loan amount correctly", () => {
    const result = calculate(defaultInputs);
    const loanAmount = result.results.find((r) => r.label === "Loan amount");
    expect(loanAmount).toBeDefined();
    expect(loanAmount!.value).toContain("320,000");
  });

  it("calculates down payment correctly", () => {
    const result = calculate(defaultInputs);
    const downPayment = result.results.find((r) => r.label === "Down payment");
    expect(downPayment).toBeDefined();
    expect(downPayment!.value).toContain("80,000");
  });

  it("handles 100% down payment", () => {
    const result = calculate({ ...defaultInputs, downPct: "100" });
    const monthlyPayment = result.results.find((r) => r.label === "Monthly payment");
    expect(monthlyPayment!.value).toContain("0");
  });

  it("includes amortization schedule in extras", () => {
    const result = calculate(defaultInputs);
    expect(result.extras?.schedule).toBeDefined();
    expect((result.extras!.schedule as unknown[]).length).toBe(360);
  });
});
