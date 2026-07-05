#!/usr/bin/env node

/**
 * Bulk-generate calculator DSL JSON files and simple kernel stubs.
 * Run once to scaffold new calculators, then review/edit the generated files.
 */

import { writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const calcDir = join(__dirname, "..", "src", "lib", "calculators");

const calculators = [
  // Financial — TVM-based
  { id: "compound-interest", category: "financial", title: "Compound Interest Calculator", summary: "See how your investment grows with compound interest over time.", inputs: [
    { id: "principal", label: "Initial investment", type: "currency", default: 10000, min: 0 },
    { id: "rate", label: "Annual interest rate", type: "percent", default: 7, min: 0, max: 50 },
    { id: "years", label: "Years", type: "number", default: 10, min: 1, max: 50 },
    { id: "compoundFreq", label: "Compounding", type: "select", default: "12", options: [
      { label: "Annually", value: "1" }, { label: "Quarterly", value: "4" },
      { label: "Monthly", value: "12" }, { label: "Daily", value: "365" }
    ]}
  ], kernel: "tvm" },
  { id: "simple-interest", category: "financial", title: "Simple Interest Calculator", summary: "Calculate simple interest earned on a principal amount.", inputs: [
    { id: "principal", label: "Principal", type: "currency", default: 5000, min: 0 },
    { id: "rate", label: "Annual rate", type: "percent", default: 5, min: 0, max: 50 },
    { id: "years", label: "Years", type: "number", default: 3, min: 1, max: 50 }
  ], kernel: "tvm" },
  { id: "savings", category: "financial", title: "Savings Calculator", summary: "Project your savings growth with regular contributions and interest.", inputs: [
    { id: "initial", label: "Initial savings", type: "currency", default: 1000, min: 0 },
    { id: "monthly", label: "Monthly contribution", type: "currency", default: 200, min: 0 },
    { id: "rate", label: "Annual interest rate", type: "percent", default: 4.5, min: 0, max: 50 },
    { id: "years", label: "Years", type: "number", default: 10, min: 1, max: 50 }
  ], kernel: "tvm" },
  { id: "cd", category: "financial", title: "CD Calculator", summary: "Calculate the return on a Certificate of Deposit at maturity.", inputs: [
    { id: "deposit", label: "Deposit amount", type: "currency", default: 10000, min: 0 },
    { id: "rate", label: "Annual rate", type: "percent", default: 5, min: 0, max: 20 },
    { id: "term", label: "Term (months)", type: "number", default: 12, min: 1, max: 120 },
    { id: "compoundFreq", label: "Compounding", type: "select", default: "12", options: [
      { label: "Daily", value: "365" }, { label: "Monthly", value: "12" }, { label: "Quarterly", value: "4" }
    ]}
  ], kernel: "tvm" },
  { id: "auto-loan", category: "financial", title: "Auto Loan Calculator", summary: "Estimate monthly car payments from price, down payment, term, and rate.", inputs: [
    { id: "price", label: "Car price", type: "currency", default: 35000, min: 0 },
    { id: "down", label: "Down payment", type: "currency", default: 5000, min: 0 },
    { id: "rate", label: "Interest rate", type: "percent", default: 6.5, min: 0, max: 30 },
    { id: "years", label: "Loan term (years)", type: "number", default: 5, min: 1, max: 8 }
  ], kernel: "tvm" },
  { id: "retirement", category: "financial", title: "Retirement Calculator", summary: "Estimate how much you need to save for retirement.", inputs: [
    { id: "currentAge", label: "Current age", type: "number", default: 30, min: 18, max: 100 },
    { id: "retireAge", label: "Retirement age", type: "number", default: 65, min: 18, max: 100 },
    { id: "currentSavings", label: "Current savings", type: "currency", default: 50000, min: 0 },
    { id: "monthlyContrib", label: "Monthly contribution", type: "currency", default: 500, min: 0 },
    { id: "rate", label: "Expected annual return", type: "percent", default: 7, min: 0, max: 30 },
    { id: "annualSpending", label: "Annual spending in retirement", type: "currency", default: 60000, min: 0 }
  ], kernel: "tvm" },
  { id: "investment", category: "financial", title: "Investment Calculator", summary: "Project investment growth with regular contributions.", inputs: [
    { id: "initial", label: "Initial investment", type: "currency", default: 10000, min: 0 },
    { id: "monthly", label: "Monthly contribution", type: "currency", default: 500, min: 0 },
    { id: "rate", label: "Expected annual return", type: "percent", default: 8, min: 0, max: 50 },
    { id: "years", label: "Years", type: "number", default: 20, min: 1, max: 50 }
  ], kernel: "tvm" },
  { id: "interest", category: "financial", title: "Interest Calculator", summary: "Calculate interest earned on any principal amount.", inputs: [
    { id: "principal", label: "Principal", type: "currency", default: 10000, min: 0 },
    { id: "rate", label: "Annual rate", type: "percent", default: 5, min: 0, max: 50 },
    { id: "years", label: "Years", type: "number", default: 5, min: 1, max: 50 },
    { id: "type", label: "Interest type", type: "select", default: "compound", options: [
      { label: "Compound (monthly)", value: "compound" }, { label: "Simple", value: "simple" }
    ]}
  ], kernel: "tvm" },
  // Fitness & Health
  { id: "body-fat", category: "fitness-health", title: "Body Fat Calculator", summary: "Estimate body fat percentage using the US Navy method.", inputs: [
    { id: "gender", label: "Gender", type: "select", default: "male", options: [
      { label: "Male", value: "male" }, { label: "Female", value: "female" }
    ]},
    { id: "height", label: "Height", type: "number", default: 175, min: 100, max: 250, unit: "cm" },
    { id: "waist", label: "Waist circumference", type: "number", default: 85, min: 30, max: 200, unit: "cm" },
    { id: "neck", label: "Neck circumference", type: "number", default: 37, min: 20, max: 80, unit: "cm" },
    { id: "hip", label: "Hip circumference", type: "number", default: 95, min: 30, max: 200, unit: "cm", hint: "Women only" }
  ], kernel: "body-fat" },
  { id: "ideal-weight", category: "fitness-health", title: "Ideal Weight Calculator", summary: "Calculate ideal body weight using multiple formulas.", inputs: [
    { id: "gender", label: "Gender", type: "select", default: "male", options: [
      { label: "Male", value: "male" }, { label: "Female", value: "female" }
    ]},
    { id: "height", label: "Height", type: "number", default: 175, min: 100, max: 250, unit: "cm" }
  ], kernel: "ideal-weight" },
  { id: "pace", category: "fitness-health", title: "Pace Calculator", summary: "Calculate running pace, time, or distance from the other two.", inputs: [
    { id: "distance", label: "Distance", type: "number", default: 5, min: 0.1, unit: "km" },
    { id: "hours", label: "Hours", type: "number", default: 0, min: 0 },
    { id: "minutes", label: "Minutes", type: "number", default: 25, min: 0, max: 59 },
    { id: "seconds", label: "Seconds", type: "number", default: 0, min: 0, max: 59 }
  ], kernel: "pace" },
  // Math
  { id: "fraction", category: "math", title: "Fraction Calculator", summary: "Add, subtract, multiply, and divide fractions.", inputs: [
    { id: "num1", label: "Numerator 1", type: "number", default: 1, step: 1 },
    { id: "den1", label: "Denominator 1", type: "number", default: 3, step: 1, min: 1 },
    { id: "num2", label: "Numerator 2", type: "number", default: 1, step: 1 },
    { id: "den2", label: "Denominator 2", type: "number", default: 4, step: 1, min: 1 }
  ], kernel: "fraction" },
  { id: "random-number", category: "math", title: "Random Number Generator", summary: "Generate a random number within a specified range.", inputs: [
    { id: "min", label: "Minimum", type: "number", default: 1, step: 1 },
    { id: "max", label: "Maximum", type: "number", default: 100, step: 1 },
    { id: "count", label: "How many", type: "number", default: 1, min: 1, max: 100, step: 1 }
  ], kernel: "random-number" },
  { id: "percent-error", category: "math", title: "Percent Error Calculator", summary: "Calculate the percent error between observed and expected values.", inputs: [
    { id: "observed", label: "Observed value", type: "number", default: 95 },
    { id: "expected", label: "Expected value", type: "number", default: 100 }
  ], kernel: "percent-error" },
  { id: "exponent", category: "math", title: "Exponent Calculator", summary: "Calculate powers and exponents.", inputs: [
    { id: "base", label: "Base", type: "number", default: 2 },
    { id: "exponent", label: "Exponent", type: "number", default: 10 }
  ], kernel: "exponent" },
  { id: "binary", category: "math", title: "Binary Calculator", summary: "Convert between binary, decimal, hexadecimal, and octal.", inputs: [
    { id: "value", label: "Value", type: "text", default: "255", placeholder: "255" },
    { id: "from", label: "From base", type: "select", default: "10", options: [
      { label: "Decimal", value: "10" }, { label: "Binary", value: "2" },
      { label: "Hexadecimal", value: "16" }, { label: "Octal", value: "8" }
    ]}
  ], kernel: "binary" },
  { id: "quadratic", category: "math", title: "Quadratic Formula Calculator", summary: "Solve quadratic equations ax² + bx + c = 0.", inputs: [
    { id: "a", label: "a", type: "number", default: 1 },
    { id: "b", label: "b", type: "number", default: -5 },
    { id: "c", label: "c", type: "number", default: 6 }
  ], kernel: "quadratic" },
  { id: "log", category: "math", title: "Logarithm Calculator", summary: "Calculate logarithms in any base.", inputs: [
    { id: "value", label: "Value", type: "number", default: 100, min: 0.0001 },
    { id: "base", label: "Base", type: "number", default: 10, min: 0.0001 }
  ], kernel: "log" },
  { id: "ratio", category: "math", title: "Ratio Calculator", summary: "Simplify ratios and find equivalent ratios.", inputs: [
    { id: "a", label: "First value", type: "number", default: 24, min: 1, step: 1 },
    { id: "b", label: "Second value", type: "number", default: 36, min: 1, step: 1 }
  ], kernel: "ratio" },
  { id: "root", category: "math", title: "Root Calculator", summary: "Calculate nth roots of numbers.", inputs: [
    { id: "value", label: "Value", type: "number", default: 27 },
    { id: "degree", label: "Root degree", type: "number", default: 3, min: 2, max: 20, step: 1 }
  ], kernel: "root" },
  { id: "lcm", category: "math", title: "LCM Calculator", summary: "Find the Least Common Multiple of two or more numbers.", inputs: [
    { id: "a", label: "First number", type: "number", default: 12, min: 1, step: 1 },
    { id: "b", label: "Second number", type: "number", default: 18, min: 1, step: 1 }
  ], kernel: "lcm" },
  { id: "gcf", category: "math", title: "GCF Calculator", summary: "Find the Greatest Common Factor of two or more numbers.", inputs: [
    { id: "a", label: "First number", type: "number", default: 48, min: 1, step: 1 },
    { id: "b", label: "Second number", type: "number", default: 36, min: 1, step: 1 }
  ], kernel: "gcf" },
  { id: "rounding", category: "math", title: "Rounding Calculator", summary: "Round numbers to any decimal place or significant figure.", inputs: [
    { id: "value", label: "Number", type: "number", default: 3.14159 },
    { id: "decimals", label: "Decimal places", type: "number", default: 2, min: 0, max: 15, step: 1 }
  ], kernel: "rounding" },
  { id: "mean-median-mode", category: "math", title: "Mean, Median, Mode Calculator", summary: "Calculate the mean, median, and mode of a data set.", inputs: [
    { id: "data", label: "Numbers (comma-separated)", type: "text", default: "4, 8, 6, 5, 3, 8, 9, 2, 8", placeholder: "4, 8, 6, 5, 3" }
  ], kernel: "mean-median-mode" },
  { id: "standard-deviation", category: "math", title: "Standard Deviation Calculator", summary: "Calculate standard deviation and variance of a data set.", inputs: [
    { id: "data", label: "Numbers (comma-separated)", type: "text", default: "10, 12, 23, 23, 16, 23, 21, 16", placeholder: "10, 12, 23, 23, 16" }
  ], kernel: "standard-deviation" },
  // Other
  { id: "date", category: "other", title: "Date Calculator", summary: "Calculate the difference between two dates or add/subtract days.", inputs: [
    { id: "startDate", label: "Start date", type: "date", default: "2024-01-01" },
    { id: "endDate", label: "End date", type: "date", default: "2024-12-31" }
  ], kernel: "date" },
  { id: "time-duration", category: "other", title: "Time Duration Calculator", summary: "Calculate the duration between two times.", inputs: [
    { id: "startHour", label: "Start hour (0-23)", type: "number", default: 9, min: 0, max: 23 },
    { id: "startMin", label: "Start minute", type: "number", default: 0, min: 0, max: 59 },
    { id: "endHour", label: "End hour (0-23)", type: "number", default: 17, min: 0, max: 23 },
    { id: "endMin", label: "End minute", type: "number", default: 30, min: 0, max: 59 }
  ], kernel: "time-duration" },
  { id: "day-counter", category: "other", title: "Day Counter", summary: "Count the number of days between two dates.", inputs: [
    { id: "startDate", label: "Start date", type: "date", default: "2024-01-01" },
    { id: "endDate", label: "End date", type: "date", default: "2025-01-01" }
  ], kernel: "date" },
  { id: "day-of-week", category: "other", title: "Day of Week Calculator", summary: "Find what day of the week a date falls on.", inputs: [
    { id: "date", label: "Date", type: "date", default: "2000-01-01" }
  ], kernel: "date" },
  { id: "hours", category: "other", title: "Hours Calculator", summary: "Calculate total hours worked between start and end times.", inputs: [
    { id: "startHour", label: "Start hour", type: "number", default: 8, min: 0, max: 23 },
    { id: "startMin", label: "Start minute", type: "number", default: 0, min: 0, max: 59 },
    { id: "endHour", label: "End hour", type: "number", default: 17, min: 0, max: 23 },
    { id: "endMin", label: "End minute", type: "number", default: 0, min: 0, max: 59 },
    { id: "breakMin", label: "Break (minutes)", type: "number", default: 30, min: 0, max: 480 }
  ], kernel: "time-duration" },
  { id: "square-footage", category: "other", title: "Square Footage Calculator", summary: "Calculate area in square feet, meters, or acres.", inputs: [
    { id: "length", label: "Length", type: "number", default: 20, min: 0.01, unit: "ft" },
    { id: "width", label: "Width", type: "number", default: 15, min: 0.01, unit: "ft" }
  ], kernel: "square-footage" },
  { id: "discount", category: "other", title: "Discount Calculator", summary: "Calculate the final price after a discount.", inputs: [
    { id: "price", label: "Original price", type: "currency", default: 100, min: 0 },
    { id: "discount", label: "Discount", type: "percent", default: 25, min: 0, max: 100 }
  ], kernel: "discount" },
  { id: "sales-tax", category: "other", title: "Sales Tax Calculator", summary: "Calculate the total price including sales tax.", inputs: [
    { id: "price", label: "Price before tax", type: "currency", default: 100, min: 0 },
    { id: "taxRate", label: "Tax rate", type: "percent", default: 8.25, min: 0, max: 50 }
  ], kernel: "sales-tax" },
  { id: "fuel-cost", category: "other", title: "Fuel Cost Calculator", summary: "Estimate fuel cost for a trip based on distance and consumption.", inputs: [
    { id: "distance", label: "Distance", type: "number", default: 300, min: 1, unit: "miles" },
    { id: "mpg", label: "Fuel efficiency", type: "number", default: 30, min: 1, unit: "mpg" },
    { id: "pricePerGallon", label: "Price per gallon", type: "currency", default: 3.50, min: 0 }
  ], kernel: "fuel-cost" },
  { id: "gas-mileage", category: "other", title: "Gas Mileage Calculator", summary: "Calculate your vehicle's fuel efficiency in MPG.", inputs: [
    { id: "miles", label: "Miles driven", type: "number", default: 350, min: 1 },
    { id: "gallons", label: "Gallons used", type: "number", default: 12, min: 0.1 }
  ], kernel: "gas-mileage" },
  { id: "password-generator", category: "other", title: "Password Generator", summary: "Generate a secure random password.", inputs: [
    { id: "length", label: "Password length", type: "number", default: 16, min: 4, max: 128, step: 1 },
    { id: "uppercase", label: "Include uppercase", type: "select", default: "yes", options: [
      { label: "Yes", value: "yes" }, { label: "No", value: "no" }
    ]},
    { id: "numbers", label: "Include numbers", type: "select", default: "yes", options: [
      { label: "Yes", value: "yes" }, { label: "No", value: "no" }
    ]},
    { id: "symbols", label: "Include symbols", type: "select", default: "yes", options: [
      { label: "Yes", value: "yes" }, { label: "No", value: "no" }
    ]}
  ], kernel: "password-generator" },
  { id: "dice-roller", category: "other", title: "Dice Roller", summary: "Roll virtual dice with any number of sides.", inputs: [
    { id: "numDice", label: "Number of dice", type: "number", default: 2, min: 1, max: 100, step: 1 },
    { id: "sides", label: "Sides per die", type: "number", default: 6, min: 2, max: 1000, step: 1 }
  ], kernel: "dice-roller" },
  // Unit conversions
  { id: "conversion", category: "other", title: "Unit Converter", summary: "Convert between units of length, weight, volume, and more.", inputs: [
    { id: "value", label: "Value", type: "number", default: 100 },
    { id: "category", label: "Category", type: "select", default: "length", options: [
      { label: "Length", value: "length" }, { label: "Weight", value: "weight" },
      { label: "Temperature", value: "temperature" }, { label: "Speed", value: "speed" },
      { label: "Volume", value: "volume" }, { label: "Area", value: "area" },
      { label: "Digital Storage", value: "data" }, { label: "Time", value: "time" }
    ]},
    { id: "from", label: "From", type: "text", default: "meter", placeholder: "meter" },
    { id: "to", label: "To", type: "text", default: "foot", placeholder: "foot" }
  ], kernel: "conversion" },
  { id: "density", category: "math", title: "Density Calculator", summary: "Calculate density, mass, or volume from the other two values.", inputs: [
    { id: "mass", label: "Mass", type: "number", default: 100, min: 0, unit: "g" },
    { id: "volume", label: "Volume", type: "number", default: 50, min: 0.001, unit: "mL" }
  ], kernel: "density" },
  { id: "speed", category: "math", title: "Speed Calculator", summary: "Calculate speed, distance, or time from the other two.", inputs: [
    { id: "distance", label: "Distance", type: "number", default: 100, min: 0, unit: "km" },
    { id: "time", label: "Time", type: "number", default: 2, min: 0.001, unit: "hours" }
  ], kernel: "speed" },
  { id: "hypotenuse", category: "math", title: "Pythagorean Theorem Calculator", summary: "Calculate the hypotenuse or any side of a right triangle.", inputs: [
    { id: "a", label: "Side a", type: "number", default: 3, min: 0.01 },
    { id: "b", label: "Side b", type: "number", default: 4, min: 0.01 }
  ], kernel: "hypotenuse" },
  { id: "triangle", category: "math", title: "Triangle Calculator", summary: "Calculate area and perimeter of a triangle.", inputs: [
    { id: "a", label: "Side a", type: "number", default: 3, min: 0.01, unit: "units" },
    { id: "b", label: "Side b", type: "number", default: 4, min: 0.01, unit: "units" },
    { id: "c", label: "Side c", type: "number", default: 5, min: 0.01, unit: "units" }
  ], kernel: "triangle" },
  { id: "circle", category: "math", title: "Circle Calculator", summary: "Calculate area, circumference, and diameter of a circle.", inputs: [
    { id: "radius", label: "Radius", type: "number", default: 5, min: 0.01, unit: "units" }
  ], kernel: "circle" },
  { id: "volume-calc", category: "math", title: "Volume Calculator", summary: "Calculate volume of common 3D shapes.", inputs: [
    { id: "shape", label: "Shape", type: "select", default: "sphere", options: [
      { label: "Sphere", value: "sphere" }, { label: "Cube", value: "cube" },
      { label: "Cylinder", value: "cylinder" }, { label: "Cone", value: "cone" }
    ]},
    { id: "radius", label: "Radius", type: "number", default: 5, min: 0.01, unit: "units" },
    { id: "height", label: "Height", type: "number", default: 10, min: 0.01, unit: "units", hint: "Cylinder and cone only" }
  ], kernel: "volume-calc" },
  { id: "slope", category: "math", title: "Slope Calculator", summary: "Calculate the slope between two points.", inputs: [
    { id: "x1", label: "X₁", type: "number", default: 1 },
    { id: "y1", label: "Y₁", type: "number", default: 2 },
    { id: "x2", label: "X₂", type: "number", default: 5 },
    { id: "y2", label: "Y₂", type: "number", default: 8 }
  ], kernel: "slope" },
  { id: "distance-calc", category: "math", title: "Distance Calculator", summary: "Calculate the distance between two points.", inputs: [
    { id: "x1", label: "X₁", type: "number", default: 0 },
    { id: "y1", label: "Y₁", type: "number", default: 0 },
    { id: "x2", label: "X₂", type: "number", default: 3 },
    { id: "y2", label: "Y₂", type: "number", default: 4 }
  ], kernel: "distance-calc" },
];

// Generate JSON files
let count = 0;
for (const calc of calculators) {
  const jsonPath = join(calcDir, `${calc.id}.calc.json`);
  if (existsSync(jsonPath)) continue;

  const json = {
    id: calc.id,
    category: calc.category,
    title: calc.title,
    summary: calc.summary,
    inputs: calc.inputs,
    kernel: `${calc.id}.calc.ts`,
  };

  writeFileSync(jsonPath, JSON.stringify(json, null, 2) + "\n");
  count++;
  console.log(`Created: ${calc.id}.calc.json`);
}

console.log(`\nGenerated ${count} new calculator JSON files.`);
