import { useNavigate } from 'react-router-dom';
import { AboutSection } from '../components/AboutSection';
import { DifferentialsSection } from '../components/DifferentialsSection';
import { FinalCtaSection } from '../components/FinalCtaSection';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { PricingSection } from '../components/PricingSection';

export function HomePage() {
  const navigate = useNavigate();

  const goToContact = (plan?: string) => {
    const search = plan ? `?plano=${encodeURIComponent(plan)}` : '';
    navigate(`/contato${search}`);
  };

  return (
    <>
      <Header onContactClick={() => goToContact()} />
      <main>
        <HeroSection onContactClick={() => goToContact()} />
        <DifferentialsSection />
        <PortfolioSection />
        <AboutSection />
        <PricingSection onPlanSelect={(plan) => goToContact(plan)} />
        <FinalCtaSection onContactClick={() => goToContact()} />
      </main>
      <Footer />
    </>
  );
}
