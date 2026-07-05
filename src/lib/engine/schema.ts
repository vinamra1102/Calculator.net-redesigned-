import { z } from "zod";

export const inputTypeSchema = z.enum([
  "number",
  "currency",
  "percent",
  "text",
  "select",
  "date",
]);

export const inputOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const inputSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: inputTypeSchema,
  default: z.union([z.number(), z.string()]).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  unit: z.string().optional(),
  placeholder: z.string().optional(),
  hint: z.string().optional(),
  options: z.array(inputOptionSchema).optional(),
  required: z.boolean().optional(),
});

export const calculatorSchema = z.object({
  id: z.string(),
  category: z.enum(["financial", "fitness-health", "math", "other"]),
  title: z.string(),
  summary: z.string(),
  inputs: z.array(inputSchema).min(1),
  kernel: z.string().optional(),
  explainer: z.string().optional(),
});

export type CalculatorInput = z.infer<typeof inputSchema>;
export type CalculatorDefinition = z.infer<typeof calculatorSchema>;
export type InputType = z.infer<typeof inputTypeSchema>;
export type InputOption = z.infer<typeof inputOptionSchema>;

export type InputValues = Record<string, number | string>;

export interface CalculatorResult {
  label: string;
  value: string;
  rawValue?: number;
  large?: boolean;
}

export interface CalculatorOutput {
  results: CalculatorResult[];
  extras?: Record<string, unknown>;
}
