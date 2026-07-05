import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";
import { CONVERSION_TABLES, convert, type ConversionUnit } from "./unit-conversion";

export function calculate(inputs: InputValues): CalculatorOutput {
  const value = Number(inputs.value);
  const category = String(inputs.category ?? "length");
  const fromName = String(inputs.from ?? "").toLowerCase();
  const toName = String(inputs.to ?? "").toLowerCase();

  const table = CONVERSION_TABLES[category];
  if (!table) return { results: [{ label: "Result", value: "Unknown category", large: true }] };

  const findUnit = (name: string): ConversionUnit | undefined =>
    table.units.find((u) => u.name.toLowerCase() === name || u.symbol.toLowerCase() === name);

  const fromUnit = findUnit(fromName);
  const toUnit = findUnit(toName);

  if (!fromUnit || !toUnit) {
    return {
      results: [
        { label: "Result", value: "Enter valid unit names", large: true },
        { label: "Available units", value: table.units.map((u) => u.name).join(", ") },
      ],
    };
  }

  const result = convert(value, fromUnit, toUnit, category);

  return {
    results: [
      { label: `${value} ${fromUnit.symbol}`, value: `${formatNumber(result, 6)} ${toUnit.symbol}`, rawValue: result, large: true },
      { label: "Category", value: table.name },
    ],
  };
}
