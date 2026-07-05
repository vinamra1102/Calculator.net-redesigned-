import { describe, it, expect } from "vitest";
import { calculate } from "@/lib/calculators/tip.calc";

describe("tip calculator", () => {
  it("calculates tip correctly", () => {
    const result = calculate({ bill: "100", tipPct: "20", people: "1" });
    const total = result.results.find((r) => r.label === "Total with tip");
    expect(total!.rawValue).toBeCloseTo(120, 2);
  });

  it("splits bill among multiple people", () => {
    const result = calculate({ bill: "100", tipPct: "20", people: "4" });
    const perPerson = result.results.find((r) => r.label === "Per person");
    expect(perPerson!.rawValue).toBeCloseTo(30, 2);
  });

  it("handles zero tip", () => {
    const result = calculate({ bill: "50", tipPct: "0", people: "2" });
    const perPerson = result.results.find((r) => r.label === "Per person");
    expect(perPerson!.rawValue).toBeCloseTo(25, 2);
  });

  it("handles single person", () => {
    const result = calculate({ bill: "85.50", tipPct: "18", people: "1" });
    const total = result.results.find((r) => r.label === "Total with tip");
    expect(total!.rawValue).toBeCloseTo(100.89, 2);
  });
});
