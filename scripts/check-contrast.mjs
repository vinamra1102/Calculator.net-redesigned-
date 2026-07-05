#!/usr/bin/env node

/**
 * check-contrast.mjs
 * 
 * Verifies WCAG contrast ratios for all foreground/background color pairs
 * used by the design system. Computes relative luminance and contrast per
 * WCAG 2.1 algorithm. Iteratively nudges lightness until all pairs pass:
 * - 4.5:1 for normal text (< 24px, or < 19px bold)
 * - 3:1 for large text (>= 24px, or >= 19px bold) and non-text UI elements
 */

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  return {
    r: parseInt(hex.slice(0, 2), 16) / 255,
    g: parseInt(hex.slice(2, 4), 16) / 255,
    b: parseInt(hex.slice(4, 6), 16) / 255,
  };
}

function rgbToHsl(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r, g, b };
}

function rgbToHex(r, g, b) {
  const toHex = (n) =>
    Math.round(Math.max(0, Math.min(255, n * 255)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function relativeLuminance({ r, g, b }) {
  const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrastRatio(l1, l2) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function findMinContrastLightness(fgHex, bgHex, targetRatio) {
  const bgRgb = hexToRgb(bgHex);
  const bgLum = relativeLuminance(bgRgb);
  const fgHsl = rgbToHsl(...Object.values(hexToRgb(fgHex)));

  // Try darkening first (usually what's needed for light backgrounds)
  for (let l = fgHsl.l; l >= 0; l -= 0.5) {
    const testRgb = hslToRgb(fgHsl.h, fgHsl.s, l);
    const testLum = relativeLuminance(testRgb);
    if (contrastRatio(testLum, bgLum) >= targetRatio) {
      return rgbToHex(testRgb.r, testRgb.g, testRgb.b);
    }
  }
  // Try lightening
  for (let l = fgHsl.l; l <= 100; l += 0.5) {
    const testRgb = hslToRgb(fgHsl.h, fgHsl.s, l);
    const testLum = relativeLuminance(testRgb);
    if (contrastRatio(testLum, bgLum) >= targetRatio) {
      return rgbToHex(testRgb.r, testRgb.g, testRgb.b);
    }
  }
  return null;
}

// Color pairs to check: [name, foreground, background, isLargeText]
const lightTheme = {
  bg: "#f6fbfa",
  surface: "#ffffff",
  surface2: "#eaf5f3",
  text: "#101516",
  textMuted: "#46605c",
  textSubtle: "#607774",
  accent: "#54e6d4",
  accentContrast: "#08211d",
  accentText: "#0b786c",
  focusRing: "#0b786c", // uses --accent-text in light mode
  success: "#12843c",
  warning: "#b45309",
  error: "#dc2626",
};

const darkTheme = {
  bg: "#101516",
  surface: "#171d1e",
  surface2: "#1e2627",
  text: "#f2fbf9",
  textMuted: "#a8bdba",
  textSubtle: "#728885",
  accent: "#54e6d4",
  accentContrast: "#08211d",
  accentText: "#54e6d4",
  focusRing: "#54e6d4", // uses --accent in dark mode
  success: "#4ade80",
  warning: "#fbbf24",
  error: "#f87171",
};

const pairs = [
  // [name, fg, bg, requiredRatio]
  ["body text on bg", "text", "bg", 4.5],
  ["muted text on bg", "textMuted", "bg", 4.5],
  ["subtle text on bg", "textSubtle", "bg", 4.5],
  ["body text on surface", "text", "surface", 4.5],
  ["muted text on surface", "textMuted", "surface", 4.5],
  ["subtle text on surface", "textSubtle", "surface", 4.5],
  ["accent-contrast on accent", "accentContrast", "accent", 4.5],
  ["accent-text on bg", "accentText", "bg", 4.5],
  ["accent-text on surface", "accentText", "surface", 4.5],
  ["success text on bg", "success", "bg", 4.5],
  ["warning text on bg", "warning", "bg", 4.5],
  ["error text on bg", "error", "bg", 4.5],
  ["focus ring on bg", "focusRing", "bg", 3.0],
  ["focus ring on surface", "focusRing", "surface", 3.0],
];

let hasFailures = false;
const suggestions = {};

for (const themeName of ["light", "dark"]) {
  const theme = themeName === "light" ? lightTheme : darkTheme;
  console.log(`\n=== ${themeName.toUpperCase()} THEME ===`);

  for (const [name, fgKey, bgKey, required] of pairs) {
    const fg = theme[fgKey];
    const bg = theme[bgKey];
    const fgLum = relativeLuminance(hexToRgb(fg));
    const bgLum = relativeLuminance(hexToRgb(bg));
    const ratio = contrastRatio(fgLum, bgLum);
    const pass = ratio >= required;
    const status = pass ? "PASS" : "FAIL";

    console.log(
      `  ${status} ${name}: ${fg} on ${bg} = ${ratio.toFixed(2)}:1 (need ${required}:1)`
    );

    if (!pass) {
      hasFailures = true;
      const fixed = findMinContrastLightness(fg, bg, required);
      if (fixed) {
        console.log(`    → Suggested fix: change to ${fixed}`);
        if (!suggestions[themeName]) suggestions[themeName] = [];
        suggestions[themeName].push({ name, fgKey, original: fg, suggested: fixed });
      }
    }
  }
}

if (hasFailures) {
  console.log("\n=== SUGGESTED TOKEN ADJUSTMENTS ===");
  for (const [themeName, fixes] of Object.entries(suggestions)) {
    console.log(`\n${themeName} theme:`);
    for (const fix of fixes) {
      console.log(`  ${fix.fgKey}: ${fix.original} → ${fix.suggested} (${fix.name})`);
    }
  }
  process.exit(1);
} else {
  console.log("\nAll contrast ratios pass WCAG requirements!");
  process.exit(0);
}
