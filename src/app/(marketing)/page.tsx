import { HeroSection } from "@/components/calculator/HeroSection";
import { PopularCalculators } from "@/components/calculator/PopularCalculators";
import { CategoryTiles } from "@/components/calculator/CategoryTiles";

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <PopularCalculators />
      <CategoryTiles />
    </main>
  );
}
