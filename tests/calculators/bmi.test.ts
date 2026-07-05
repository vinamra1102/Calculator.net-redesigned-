import { describe, it, expect } from "vitest";
import { calculate } from "@/lib/calculators/bmi.calc";

describe("BMI calculator", () => {
  it("calculates BMI correctly for metric inputs", () => {
    const result = calculate({ weight: "70", height: "175" });
    const bmi = result.results.find((r) => r.label === "BMI");
    expect(bmi).toBeDefined();
    expect(bmi!.rawValue).toBeCloseTo(22.86, 1);
  });

  it("classifies normal weight correctly", () => {
    const result = calculate({ weight: "70", height: "175" });
    const category = result.results.find((r) => r.label === "Category");
    expect(category!.value).toBe("Normal weight");
  });

  it("classifies underweight correctly", () => {
    const result = calculate({ weight: "45", height: "175" });
    const category = result.results.find((r) => r.label === "Category");
    expect(category!.value).toBe("Underweight");
  });

  it("classifies overweight correctly", () => {
    const result = calculate({ weight: "85", height: "175" });
    const category = result.results.find((r) => r.label === "Category");
    expect(category!.value).toBe("Overweight");
  });

  it("classifies obese correctly", () => {
    const result = calculate({ weight: "110", height: "175" });
    const category = result.results.find((r) => r.label === "Category");
    expect(category!.value).toBe("Obese");
  });

  it("provides healthy weight range", () => {
    const result = calculate({ weight: "70", height: "175" });
    const range = result.results.find((r) => r.label === "Healthy weight range");
    expect(range).toBeDefined();
    expect(range!.value).toContain("–");
  });
});
