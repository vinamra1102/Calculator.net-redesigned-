import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const startH = Number(inputs.startHour ?? 0);
  const startM = Number(inputs.startMin ?? 0);
  const endH = Number(inputs.endHour ?? 0);
  const endM = Number(inputs.endMin ?? 0);
  const breakMin = Number(inputs.breakMin ?? 0);

  let totalMin = (endH * 60 + endM) - (startH * 60 + startM);
  if (totalMin < 0) totalMin += 24 * 60;
  const workMin = Math.max(0, totalMin - breakMin);
  const workHours = workMin / 60;

  return {
    results: [
      { label: "Hours worked", value: formatNumber(workHours, 2) + " hours", rawValue: workHours, large: true },
      { label: "Total time", value: `${Math.floor(totalMin / 60)}h ${totalMin % 60}m` },
      { label: "Break", value: `${breakMin} minutes` },
      { label: "Work minutes", value: `${workMin}` },
    ],
  };
}
