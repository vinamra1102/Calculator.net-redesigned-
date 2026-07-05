#!/usr/bin/env node

/**
 * validate-calculators.mjs
 * 
 * Validates every .calc.json file against the calculator schema.
 * Checks required fields, input types, and basic consistency.
 */

import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const calculatorsDir = join(__dirname, "..", "src", "lib", "calculators");

const VALID_CATEGORIES = ["financial", "fitness-health", "math", "other"];
const VALID_TYPES = ["number", "currency", "percent", "text", "select", "date"];

let hasErrors = false;

function error(file, msg) {
  console.error(`  ERROR ${file}: ${msg}`);
  hasErrors = true;
}

function validateFile(filePath) {
  const filename = filePath.split(/[\\/]/).pop();
  let data;
  try {
    data = JSON.parse(readFileSync(filePath, "utf-8"));
  } catch (e) {
    error(filename, `Invalid JSON: ${e.message}`);
    return;
  }

  // Required fields
  if (!data.id) error(filename, "Missing 'id'");
  if (!data.category) error(filename, "Missing 'category'");
  if (!data.title) error(filename, "Missing 'title'");
  if (!data.summary) error(filename, "Missing 'summary'");
  if (!data.inputs || !Array.isArray(data.inputs) || data.inputs.length === 0) {
    error(filename, "Missing or empty 'inputs' array");
  }

  // Category
  if (data.category && !VALID_CATEGORIES.includes(data.category)) {
    error(filename, `Invalid category '${data.category}'. Must be one of: ${VALID_CATEGORIES.join(", ")}`);
  }

  // Inputs
  if (data.inputs) {
    for (const input of data.inputs) {
      if (!input.id) error(filename, `Input missing 'id': ${JSON.stringify(input)}`);
      if (!input.label) error(filename, `Input '${input.id}' missing 'label'`);
      if (!input.type) error(filename, `Input '${input.id}' missing 'type'`);
      if (input.type && !VALID_TYPES.includes(input.type)) {
        error(filename, `Input '${input.id}' has invalid type '${input.type}'`);
      }
      if (input.type === "select" && (!input.options || input.options.length === 0)) {
        error(filename, `Select input '${input.id}' missing 'options'`);
      }
      if (input.min !== undefined && input.max !== undefined && input.min > input.max) {
        error(filename, `Input '${input.id}' has min > max`);
      }
    }
  }

  // Check for kernel file
  if (data.kernel) {
    const kernelPath = join(calculatorsDir, data.kernel);
    try {
      readFileSync(kernelPath, "utf-8");
    } catch {
      error(filename, `Kernel file '${data.kernel}' not found`);
    }
  }

  if (!hasErrors) {
    console.log(`  OK ${filename}: ${data.title}`);
  }
}

// Main
console.log("Validating calculator definitions...\n");

const files = readdirSync(calculatorsDir).filter((f) => f.endsWith(".calc.json"));

if (files.length === 0) {
  console.log("No .calc.json files found.");
  process.exit(0);
}

for (const file of files) {
  validateFile(join(calculatorsDir, file));
}

console.log(`\nValidated ${files.length} calculator(s).`);
if (hasErrors) {
  console.log("Some validations failed.");
  process.exit(1);
} else {
  console.log("All valid!");
  process.exit(0);
}
