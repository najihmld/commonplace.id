import { HeroSection } from '@/features/marketing/home/hero-section';
import { FeaturesSection } from '@/features/marketing/home/features-section';
import { AboutParaSection } from '@/features/marketing/home/about-para-section';
import { CoomingSoonSection } from '@/features/marketing/home/coming-soon-section';
import Footer from '@/features/marketing/footer';
import Header from '@/features/marketing/header';

export default async function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <AboutParaSection />
        <CoomingSoonSection />
      </main>

      <Footer />
    </div>
  );
}
