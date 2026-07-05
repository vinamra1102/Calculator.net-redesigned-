import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { calculate } from "./tvm-kernel";

export function calc(inputs: InputValues): CalculatorOutput {
  return calculate({ ...inputs, _id: "savings" });
}
