import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";

export function calculate(inputs: InputValues): CalculatorOutput {
  const numDice = Math.max(1, Math.round(Number(inputs.numDice)));
  const sides = Math.max(2, Math.round(Number(inputs.sides)));
  const rolls: number[] = [];
  let total = 0;

  for (let i = 0; i < numDice; i++) {
    const roll = Math.floor(Math.random() * sides) + 1;
    rolls.push(roll);
    total += roll;
  }

  return {
    results: [
      { label: "Total", value: total.toLocaleString(), rawValue: total, large: true },
      { label: "Rolls", value: rolls.join(", ") },
      { label: "Dice", value: `${numDice}d${sides}` },
      { label: "Range", value: `${numDice} – ${numDice * sides}` },
    ],
  };
}
