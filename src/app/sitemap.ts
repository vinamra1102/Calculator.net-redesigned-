import type { MetadataRoute } from "next";
import { calculatorRegistry } from "@/lib/calculators/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://calculator.net";

  const calculatorPages = calculatorRegistry.map((entry) => ({
    url: `${baseUrl}/calculators/${entry.definition.category}/${entry.definition.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/design-system`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...calculatorPages,
  ];
}
