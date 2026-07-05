import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const shape = String(inputs.shape ?? "sphere");
  const r = Number(inputs.radius);
  const h = Number(inputs.height ?? 10);

  let volume: number;
  let formula: string;

  switch (shape) {
    case "sphere":
      volume = (4 / 3) * Math.PI * Math.pow(r, 3);
      formula = "4/3 × π × r³";
      break;
    case "cube":
      volume = Math.pow(r * 2, 3);
      formula = "(2r)³";
      break;
    case "cylinder":
      volume = Math.PI * Math.pow(r, 2) * h;
      formula = "π × r² × h";
      break;
    case "cone":
      volume = (1 / 3) * Math.PI * Math.pow(r, 2) * h;
      formula = "1/3 × π × r² × h";
      break;
    default:
      volume = 0;
      formula = "";
  }

  return {
    results: [
      { label: "Volume", value: formatNumber(volume, 4) + " cubic units", rawValue: volume, large: true },
      { label: "Shape", value: shape.charAt(0).toUpperCase() + shape.slice(1) },
      { label: "Formula", value: formula },
    ],
  };
}
