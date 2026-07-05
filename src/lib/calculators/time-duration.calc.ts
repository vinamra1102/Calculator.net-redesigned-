import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const hours = Math.floor(Number(inputs.endHour ?? 0)) - Math.floor(Number(inputs.startHour ?? 0));
  const mins = Math.floor(Number(inputs.endMin ?? 0)) - Math.floor(Number(inputs.startMin ?? 0));
  let totalMin = hours * 60 + mins;
  if (totalMin < 0) totalMin += 24 * 60;
  const breakMin = Number(inputs.breakMin ?? 0);
  const workMin = Math.max(0, totalMin - breakMin);

  return {
    results: [
      { label: "Total duration", value: `${Math.floor(totalMin / 60)}h ${totalMin % 60}m`, large: true },
      { label: "Work time (minus break)", value: `${Math.floor(workMin / 60)}h ${workMin % 60}m` },
      { label: "Total minutes", value: `${totalMin}` },
    ],
  };
}
