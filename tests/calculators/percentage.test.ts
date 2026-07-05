import { describe, it, expect } from "vitest";
import { calculate } from "@/lib/calculators/percentage.calc";

describe("percentage calculator", () => {
  it("calculates X% of Y", () => {
    const result = calculate({ mode: "percent-of", value1: "25", value2: "200" });
    const main = result.results[0];
    expect(main.rawValue).toBeCloseTo(50, 2);
  });

  it("calculates what percent X is of Y", () => {
    const result = calculate({ mode: "is-what-percent", value1: "50", value2: "200" });
    const main = result.results[0];
    expect(main.rawValue).toBeCloseTo(25, 2);
  });

  it("calculates percent change from X to Y", () => {
    const result = calculate({ mode: "percent-change", value1: "100", value2: "150" });
    const main = result.results[0];
    expect(main.rawValue).toBeCloseTo(50, 2);
  });

  it("handles negative percent change", () => {
    const result = calculate({ mode: "percent-change", value1: "200", value2: "150" });
    const main = result.results[0];
    expect(main.rawValue).toBeCloseTo(-25, 2);
  });

  it("handles divide by zero in is-what-percent", () => {
    const result = calculate({ mode: "is-what-percent", value1: "50", value2: "0" });
    expect(result.results[0].value).toContain("Cannot divide by zero");
  });
});
