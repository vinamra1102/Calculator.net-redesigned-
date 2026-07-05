/**
 * Unit conversion kernel.
 * Driven by conversion-factor tables. Adding a new conversion = adding a table entry.
 */

export interface ConversionUnit {
  name: string;
  symbol: string;
  /** Factor to convert FROM this unit TO the base unit */
  toBase: number;
}

export interface ConversionCategory {
  name: string;
  baseUnit: string;
  units: ConversionUnit[];
}

export const CONVERSION_TABLES: Record<string, ConversionCategory> = {
  length: {
    name: "Length",
    baseUnit: "meter",
    units: [
      { name: "Millimeter", symbol: "mm", toBase: 0.001 },
      { name: "Centimeter", symbol: "cm", toBase: 0.01 },
      { name: "Meter", symbol: "m", toBase: 1 },
      { name: "Kilometer", symbol: "km", toBase: 1000 },
      { name: "Inch", symbol: "in", toBase: 0.0254 },
      { name: "Foot", symbol: "ft", toBase: 0.3048 },
      { name: "Yard", symbol: "yd", toBase: 0.9144 },
      { name: "Mile", symbol: "mi", toBase: 1609.344 },
    ],
  },
  weight: {
    name: "Weight / Mass",
    baseUnit: "kilogram",
    units: [
      { name: "Milligram", symbol: "mg", toBase: 0.000001 },
      { name: "Gram", symbol: "g", toBase: 0.001 },
      { name: "Kilogram", symbol: "kg", toBase: 1 },
      { name: "Metric Ton", symbol: "t", toBase: 1000 },
      { name: "Ounce", symbol: "oz", toBase: 0.0283495 },
      { name: "Pound", symbol: "lb", toBase: 0.453592 },
      { name: "Stone", symbol: "st", toBase: 6.35029 },
      { name: "US Ton", symbol: "ton", toBase: 907.185 },
    ],
  },
  temperature: {
    name: "Temperature",
    baseUnit: "celsius",
    units: [
      { name: "Celsius", symbol: "°C", toBase: 1 },
      { name: "Fahrenheit", symbol: "°F", toBase: 1 },
      { name: "Kelvin", symbol: "K", toBase: 1 },
    ],
  },
  speed: {
    name: "Speed",
    baseUnit: "m/s",
    units: [
      { name: "Meters per second", symbol: "m/s", toBase: 1 },
      { name: "Kilometers per hour", symbol: "km/h", toBase: 0.277778 },
      { name: "Miles per hour", symbol: "mph", toBase: 0.44704 },
      { name: "Knots", symbol: "kn", toBase: 0.514444 },
      { name: "Feet per second", symbol: "ft/s", toBase: 0.3048 },
    ],
  },
  volume: {
    name: "Volume",
    baseUnit: "liter",
    units: [
      { name: "Milliliter", symbol: "mL", toBase: 0.001 },
      { name: "Liter", symbol: "L", toBase: 1 },
      { name: "Gallon (US)", symbol: "gal", toBase: 3.78541 },
      { name: "Quart (US)", symbol: "qt", toBase: 0.946353 },
      { name: "Cup (US)", symbol: "cup", toBase: 0.236588 },
      { name: "Fluid Ounce (US)", symbol: "fl oz", toBase: 0.0295735 },
      { name: "Tablespoon", symbol: "tbsp", toBase: 0.0147868 },
      { name: "Teaspoon", symbol: "tsp", toBase: 0.00492892 },
      { name: "Cubic Meter", symbol: "m³", toBase: 1000 },
    ],
  },
  area: {
    name: "Area",
    baseUnit: "sq meter",
    units: [
      { name: "Square Meter", symbol: "m²", toBase: 1 },
      { name: "Square Kilometer", symbol: "km²", toBase: 1000000 },
      { name: "Square Foot", symbol: "ft²", toBase: 0.092903 },
      { name: "Square Yard", symbol: "yd²", toBase: 0.836127 },
      { name: "Acre", symbol: "ac", toBase: 4046.86 },
      { name: "Hectare", symbol: "ha", toBase: 10000 },
      { name: "Square Mile", symbol: "mi²", toBase: 2589988 },
    ],
  },
  data: {
    name: "Digital Storage",
    baseUnit: "byte",
    units: [
      { name: "Bit", symbol: "bit", toBase: 0.125 },
      { name: "Byte", symbol: "B", toBase: 1 },
      { name: "Kilobyte", symbol: "KB", toBase: 1024 },
      { name: "Megabyte", symbol: "MB", toBase: 1048576 },
      { name: "Gigabyte", symbol: "GB", toBase: 1073741824 },
      { name: "Terabyte", symbol: "TB", toBase: 1099511627776 },
    ],
  },
  time: {
    name: "Time",
    baseUnit: "second",
    units: [
      { name: "Millisecond", symbol: "ms", toBase: 0.001 },
      { name: "Second", symbol: "s", toBase: 1 },
      { name: "Minute", symbol: "min", toBase: 60 },
      { name: "Hour", symbol: "hr", toBase: 3600 },
      { name: "Day", symbol: "day", toBase: 86400 },
      { name: "Week", symbol: "wk", toBase: 604800 },
      { name: "Month (30d)", symbol: "mo", toBase: 2592000 },
      { name: "Year (365d)", symbol: "yr", toBase: 31536000 },
    ],
  },
  pressure: {
    name: "Pressure",
    baseUnit: "pascal",
    units: [
      { name: "Pascal", symbol: "Pa", toBase: 1 },
      { name: "Kilopascal", symbol: "kPa", toBase: 1000 },
      { name: "Bar", symbol: "bar", toBase: 100000 },
      { name: "PSI", symbol: "psi", toBase: 6894.76 },
      { name: "Atmosphere", symbol: "atm", toBase: 101325 },
      { name: "mmHg", symbol: "mmHg", toBase: 133.322 },
    ],
  },
  energy: {
    name: "Energy",
    baseUnit: "joule",
    units: [
      { name: "Joule", symbol: "J", toBase: 1 },
      { name: "Kilojoule", symbol: "kJ", toBase: 1000 },
      { name: "Calorie", symbol: "cal", toBase: 4.184 },
      { name: "Kilocalorie", symbol: "kcal", toBase: 4184 },
      { name: "Watt-hour", symbol: "Wh", toBase: 3600 },
      { name: "Kilowatt-hour", symbol: "kWh", toBase: 3600000 },
      { name: "BTU", symbol: "BTU", toBase: 1055.06 },
    ],
  },
};

/** Convert temperature (special case — not a simple factor) */
export function convertTemperature(value: number, from: string, to: string): number {
  // Convert to Celsius first
  let celsius: number;
  switch (from) {
    case "°C":
    case "Celsius":
      celsius = value;
      break;
    case "°F":
    case "Fahrenheit":
      celsius = (value - 32) * (5 / 9);
      break;
    case "K":
    case "Kelvin":
      celsius = value - 273.15;
      break;
    default:
      celsius = value;
  }

  // Convert from Celsius to target
  switch (to) {
    case "°C":
    case "Celsius":
      return celsius;
    case "°F":
    case "Fahrenheit":
      return celsius * (9 / 5) + 32;
    case "K":
    case "Kelvin":
      return celsius + 273.15;
    default:
      return celsius;
  }
}

/** Generic unit conversion */
export function convert(
  value: number,
  fromUnit: ConversionUnit,
  toUnit: ConversionUnit,
  category?: string
): number {
  if (category === "temperature") {
    return convertTemperature(value, fromUnit.symbol, toUnit.symbol);
  }
  const baseValue = value * fromUnit.toBase;
  return baseValue / toUnit.toBase;
}
