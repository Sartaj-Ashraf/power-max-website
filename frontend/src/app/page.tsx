import { HeroSection } from '@/components/sections/HeroSection';
import { USPSection } from '@/components/sections/USPSection';
import { CategoriesSection } from '@/components/sections/CategoriesSection';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { StatsSection } from '@/components/sections/StatsSection';
import { TestimonialsPreview } from '@/components/sections/TestimonialsPreview';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <USPSection />
      <FeaturedProducts />
      <TestimonialsPreview />
      <CTASection />
    </>
  );
}
