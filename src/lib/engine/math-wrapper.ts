import { create, all } from "mathjs";

const math = create(all, {});

/**
 * Safely evaluate a math expression against a scope of variables.
 * This uses math.js's sandboxed parser — never eval() or new Function().
 */
export function evaluateExpression(expression: string, scope: Record<string, number>): number {
  try {
    const result = math.evaluate(expression, scope);
    if (typeof result === "number" && isFinite(result)) {
      return result;
    }
    throw new Error("Expression did not produce a finite number");
  } catch (err) {
    throw new Error(
      `Invalid expression: ${err instanceof Error ? err.message : "unknown error"}`
    );
  }
}

export { math };
