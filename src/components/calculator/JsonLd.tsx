import type { CalculatorDefinition } from "@/lib/engine/schema";

interface CalculatorJsonLdProps {
  definition: CalculatorDefinition;
  category: string;
  slug: string;
}

export function CalculatorJsonLd({ definition, category, slug }: CalculatorJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: definition.title,
    description: definition.summary,
    url: `https://calculator.net/calculators/${category}/${slug}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
