#!/usr/bin/env node

/**
 * Generate kernel (.calc.ts) files for all calculators that don't have one yet.
 * Uses shared kernels where possible.
 */

import { writeFileSync, existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const calcDir = join(__dirname, "..", "src", "lib", "calculators");

const TVM_CALCS = new Set([
  "compound-interest", "simple-interest", "savings", "cd",
  "auto-loan", "retirement", "investment", "interest"
]);

const DATE_CALCS = new Set(["date", "day-counter", "day-of-week"]);
const CONV_CALCS = new Set(["conversion"]);

function generateKernel(id) {
  if (TVM_CALCS.has(id)) {
    return `import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { calculate } from "./tvm-kernel";

export function calc(inputs: InputValues): CalculatorOutput {
  return calculate({ ...inputs, _id: "${id}" });
}
`;
  }

  if (DATE_CALCS.has(id)) {
    return `import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { calculateAge, dateDiff, dayOfWeek, daysBetween, safeParseDate } from "./date-math";
import { format } from "date-fns";

export function calculate(inputs: InputValues): CalculatorOutput {
  ${id === "day-of-week" ? `
  const date = safeParseDate(String(inputs.date || ""));
  if (!date) return { results: [{ label: "Result", value: "Enter a valid date", large: true }] };
  return {
    results: [
      { label: "Day of week", value: dayOfWeek(date), large: true },
      { label: "Date", value: format(date, "MMMM d, yyyy") },
    ],
  };
  ` : `
  const start = safeParseDate(String(inputs.startDate || ""));
  const end = safeParseDate(String(inputs.endDate || ""));
  if (!start || !end) return { results: [{ label: "Result", value: "Enter valid dates", large: true }] };
  const diff = dateDiff(start, end);
  return {
    results: [
      { label: "Days between dates", value: \`\${Math.abs(diff.totalDays)} days\`, rawValue: Math.abs(diff.totalDays), large: true },
      { label: "In weeks", value: \`\${Math.abs(diff.weeks)}\` },
      { label: "In months", value: \`\${Math.abs(diff.months)}\` },
      { label: "In years", value: \`\${diff.years}\` },
    ],
  };
  `}
}
`;
  }

  return null;
}

// Read all .calc.json files
import { readdirSync } from "fs";
const files = readdirSync(calcDir).filter(f => f.endsWith(".calc.json"));
let created = 0;

for (const file of files) {
  const id = file.replace(".calc.json", "");
  const tsPath = join(calcDir, `${id}.calc.ts`);
  if (existsSync(tsPath)) continue;

  const kernel = generateKernel(id);
  if (kernel) {
    writeFileSync(tsPath, kernel);
    console.log(`Created: ${id}.calc.ts (shared kernel)`);
    created++;
  }
}

console.log(`\nGenerated ${created} kernel files from shared kernels.`);
