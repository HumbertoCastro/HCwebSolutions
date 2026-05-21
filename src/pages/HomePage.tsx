import { useEffect, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AboutSection } from '../components/AboutSection';
import { DifferentialsSection } from '../components/DifferentialsSection';
import { FinalCtaSection } from '../components/FinalCtaSection';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { PricingSection } from '../components/PricingSection';
import { palette } from '../theme';

const HomeShell = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: clip;
  background: ${palette.background};
  color: ${palette.text};
`;

const GridLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
`;

const MouseGlow = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
    circle 600px at var(--mouse-x, 50vw) var(--mouse-y, 50vh),
    rgba(0, 229, 40, 0.08),
    transparent 40%
  );

  @media (max-width: 899px), (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const Main = styled.main`
  position: relative;
  z-index: 1;
`;

export function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.location.hash) return;

    const target = window.location.hash;
    const timeout = window.setTimeout(() => {
      document.querySelector(target)?.scrollIntoView({ block: 'start' });
    }, 300);

    return () => window.clearTimeout(timeout);
  }, []);

  const goToContact = (plan?: string) => {
    const search = plan ? `?plano=${encodeURIComponent(plan)}` : '';
    navigate(`/contato${search}`);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
  };

  return (
    <HomeShell onMouseMove={handleMouseMove}>
      <GridLayer aria-hidden="true" />
      <MouseGlow aria-hidden="true" />
      <Header onContactClick={() => goToContact()} />
      <Main>
        <HeroSection onContactClick={() => goToContact()} />
        <DifferentialsSection />
        <PortfolioSection />
        <AboutSection />
        <PricingSection onPlanSelect={(plan) => goToContact(plan)} />
        <FinalCtaSection onContactClick={() => goToContact()} />
      </Main>
      <Footer />
    </HomeShell>
  );
}
