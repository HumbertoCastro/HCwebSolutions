import { useState, type CSSProperties, type MouseEvent } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { Button, Container, Stack, Typography } from '@mui/material';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { palette } from '../theme';

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const floatSoft = keyframes`
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
`;

const Hero = styled.section`
  position: relative;
  overflow: hidden;
  padding: clamp(58px, 7vw, 112px) 0 clamp(60px, 7vw, 108px);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: linear-gradient(to bottom, black 0%, transparent 80%);
    pointer-events: none;
  }

  @media (max-width: 599px) {
    padding: 42px 0 70px;
  }
`;

const Spotlight = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: var(--spotlight-opacity, 0);
  background: radial-gradient(
    circle 380px at var(--mouse-x, 50%) var(--mouse-y, 30%),
    rgba(8, 203, 0, 0.12),
    transparent 72%
  );
  transition: opacity 220ms ease;

  @media (max-width: 899px), (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const HeroGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(360px, 0.82fr);
  gap: clamp(34px, 5.4vw, 78px);
  align-items: center;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

const HeroCopy = styled(motion.div)``;

const AnimatedBlock = styled(motion.div)``;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  width: fit-content;
  max-width: 100%;
  padding: 8px 14px;
  border: 1px solid rgba(8, 203, 0, 0.34);
  border-radius: 999px;
  background: rgba(8, 203, 0, 0.07);
  color: ${palette.text};
  font-size: clamp(0.78rem, 1vw, 0.9rem);
  font-weight: 780;
  line-height: 1.25;
`;

const HeroTitle = styled(Typography)`
  && {
    max-width: 900px;
    font-size: clamp(2.75rem, 5.45vw, 5.95rem);
    letter-spacing: 0;
    line-height: 0.98;
    color: ${palette.text};
    text-wrap: balance;

    span {
      color: ${palette.accent};
    }

    @media (max-width: 599px) {
      font-size: clamp(2.28rem, 10.8vw, 3.55rem);
      line-height: 1.02;
    }
  }
`;

const HeroText = styled(Typography)`
  && {
    max-width: 690px;
    color: ${palette.textMuted};
    font-size: clamp(1rem, 1.25vw, 1.18rem);
    line-height: 1.72;
    margin-top: 24px;
  }
`;

const TrustIndicators = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
  margin-top: 26px;
`;

const TrustItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${palette.textMuted};
  font-size: 0.92rem;
  font-weight: 720;

  svg {
    color: ${palette.accent};
    font-size: 18px;
  }
`;

const VisualWrap = styled(motion.div)`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 6% -4% auto 14%;
    height: 72%;
    border-radius: 42px;
    background: radial-gradient(circle, rgba(8, 203, 0, 0.2), transparent 62%);
    filter: blur(16px);
    opacity: 0.8;
    pointer-events: none;
  }
`;

const VisualPanel = styled.div`
  position: relative;
  min-height: 560px;
  border: 1px solid ${palette.border};
  border-radius: 32px;
  padding: 18px;
  background:
    radial-gradient(circle at 24% 12%, rgba(8, 203, 0, 0.12), transparent 30%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.028));
  box-shadow: 0 42px 110px rgba(0, 0, 0, 0.38);
  transition:
    transform 320ms ease,
    border-color 320ms ease,
    box-shadow 320ms ease;
  animation: ${floatSoft} 7s ease-in-out infinite;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(8, 203, 0, 0.36);
    box-shadow: 0 48px 120px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(8, 203, 0, 0.12);
  }

  @media (max-width: 1023px) {
    min-height: 500px;
    max-width: 680px;
  }

  @media (max-width: 599px) {
    min-height: auto;
    border-radius: 24px;
    padding: 12px;
    animation: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Browser = styled.div`
  position: relative;
  height: 100%;
  min-height: inherit;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #f5f7f9;
  color: ${palette.ink};
  transition: transform 220ms ease-out;

  @media (max-width: 899px), (prefers-reduced-motion: reduce) {
    transform: none !important;
  }
`;

const BrowserTop = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  border-bottom: 1px solid rgba(7, 10, 18, 0.08);
  background: rgba(255, 255, 255, 0.78);
`;

const WindowDots = styled.div`
  display: flex;
  gap: 7px;

  span {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #c5ccd5;
  }

  span:first-child {
    background: ${palette.accent};
  }
`;

const UrlPill = styled.div`
  min-width: 160px;
  border-radius: 999px;
  padding: 8px 12px;
  background: #e8ecef;
  color: #667184;
  font-size: 0.72rem;
  font-weight: 800;
  text-align: center;

  @media (max-width: 430px) {
    min-width: 112px;
    font-size: 0.66rem;
  }
`;

const PreviewBody = styled.div`
  padding: clamp(16px, 2.4vw, 26px);
  display: grid;
  gap: 16px;

  @media (max-width: 599px) {
    gap: 12px;
  }
`;

const LandingHeroCard = styled.div`
  border-radius: 22px;
  padding: clamp(20px, 3vw, 30px);
  background: ${palette.ink};
  color: ${palette.text};
  min-height: 206px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    right: -38px;
    top: -46px;
    width: 170px;
    height: 170px;
    border-radius: 50%;
    background: rgba(8, 203, 0, 0.18);
    filter: blur(4px);
  }
`;

const LandingTitle = styled(Typography)`
  && {
    position: relative;
    z-index: 1;
    max-width: 360px;
    font-size: clamp(1.55rem, 3.2vw, 2.55rem);
    line-height: 1.05;
  }
`;

const FakeCta = styled.div`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  min-height: 42px;
  margin-top: 18px;
  padding: 9px 14px;
  border-radius: 999px;
  background: ${palette.accent};
  color: ${palette.ink};
  font-size: 0.86rem;
  font-weight: 850;
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 430px) {
    grid-template-columns: 1fr;
  }
`;

const StatusCard = styled.div`
  opacity: 0;
  border-radius: 18px;
  border: 1px solid rgba(7, 10, 18, 0.08);
  background: #ffffff;
  padding: 14px;
  animation: ${fadeUp} 650ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;

  &:nth-child(1) {
    animation-delay: 600ms;
  }

  &:nth-child(2) {
    animation-delay: 720ms;
  }

  &:nth-child(3) {
    animation-delay: 840ms;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const StatusValue = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${palette.ink};
  font-size: 0.92rem;
  font-weight: 900;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${palette.accent};
  }
`;

const CommercialGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.88fr;
  gap: 12px;

  @media (max-width: 599px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  border-radius: 20px;
  border: 1px solid rgba(7, 10, 18, 0.08);
  background: #ffffff;
  padding: 18px;
  min-height: 154px;
`;

const ServiceLine = styled.div<{ $width: string; $accent?: boolean }>`
  width: ${(props) => props.$width};
  height: 10px;
  border-radius: 999px;
  margin-top: 11px;
  background: ${(props) => (props.$accent ? palette.accent : 'rgba(7, 10, 18, 0.11)')};
`;

const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
`;

const ToolCard = styled.div`
  border-radius: 16px;
  padding: 13px;
  border: 1px solid rgba(7, 10, 18, 0.08);
  background: #ffffff;
  color: #465160;
  font-size: 0.78rem;
  font-weight: 820;
`;

const FloatingLeadCard = styled.div`
  position: absolute;
  right: -18px;
  bottom: 42px;
  z-index: 2;
  width: min(254px, 72%);
  border-radius: 20px;
  padding: 16px;
  border: 1px solid rgba(8, 203, 0, 0.28);
  background: rgba(7, 10, 18, 0.92);
  color: ${palette.text};
  backdrop-filter: blur(16px);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.34);

  @media (max-width: 599px) {
    position: static;
    width: auto;
    margin-top: 12px;
  }
`;

const MiniProgress = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
  margin-top: 12px;

  span {
    display: block;
    width: 74%;
    height: 100%;
    border-radius: inherit;
    background: ${palette.accent};
  }
`;

type HeroSectionProps = {
  onContactClick: () => void;
};

const trustItems = ['+5 anos de experiência', 'Projetos sob medida', 'Suporte técnico contínuo'];

export function HeroSection({ onContactClick }: HeroSectionProps) {
  const [mouse, setMouse] = useState({ x: 50, y: 36, active: 0 });
  const prefersReducedMotion = useReducedMotion();

  const copyVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.11,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const mockupVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.76, delay: 0.28, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
      active: 1,
    });
  };

  const spotlightStyle = {
    '--mouse-x': `${mouse.x}%`,
    '--mouse-y': `${mouse.y}%`,
    '--spotlight-opacity': mouse.active,
  } as CSSProperties;

  const parallaxStyle = prefersReducedMotion
    ? undefined
    : ({
        transform: `translate3d(${((mouse.x - 50) / 50) * 8}px, ${((mouse.y - 36) / 50) * 8}px, 0)`,
      } as CSSProperties);

  return (
    <Hero
      id="inicio"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse((current) => ({ ...current, active: 0 }))}
    >
      <Spotlight style={spotlightStyle} />
      <Container maxWidth="xl">
        <HeroGrid>
          <HeroCopy variants={copyVariants} initial="hidden" animate="visible">
            <AnimatedBlock variants={itemVariants}>
              <Badge>Landing pages • Sites profissionais • Sistemas sob medida</Badge>
            </AnimatedBlock>

            <AnimatedBlock variants={itemVariants}>
              <HeroTitle variant="h1" mt={2.5}>
                Sites e sistemas web para pequenos negócios <span>venderem mais</span>
              </HeroTitle>
            </AnimatedBlock>

            <AnimatedBlock variants={itemVariants}>
              <HeroText>
                Criamos landing pages, sites profissionais e soluções web sob medida para ajudar
                sua empresa a divulgar serviços, captar clientes e crescer com uma presença digital
                confiável.
              </HeroText>
            </AnimatedBlock>

            <AnimatedBlock variants={itemVariants}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} mt={4}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  onClick={onContactClick}
                  size="large"
                  sx={{
                    minHeight: 54,
                    '& .MuiButton-endIcon': { transition: 'transform 180ms ease' },
                    '&:hover': { transform: 'scale(1.015)' },
                    '&:hover .MuiButton-endIcon': { transform: 'translateX(3px)' },
                  }}
                >
                  Quero um orçamento
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  endIcon={<KeyboardArrowDownIcon />}
                  href="#planos"
                  size="large"
                  sx={{
                    minHeight: 54,
                    borderColor: 'rgba(255,255,255,0.22)',
                    color: palette.text,
                    '&:hover': {
                      borderColor: palette.accent,
                      bgcolor: 'rgba(8,203,0,0.08)',
                      transform: 'scale(1.015)',
                    },
                  }}
                >
                  Ver soluções
                </Button>
              </Stack>

              <TrustIndicators aria-label="Indicadores de confiança">
                {trustItems.map((item) => (
                  <TrustItem key={item}>
                    <VerifiedOutlinedIcon />
                    {item}
                  </TrustItem>
                ))}
              </TrustIndicators>
            </AnimatedBlock>
          </HeroCopy>

          <VisualWrap variants={mockupVariants} initial="hidden" animate="visible">
            <VisualPanel aria-label="Preview de landing page para captação de clientes">
              <Browser style={parallaxStyle}>
                <BrowserTop>
                  <WindowDots aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </WindowDots>
                  <UrlPill>hcwebsolutions.com.br</UrlPill>
                </BrowserTop>

                <PreviewBody>
                  <LandingHeroCard>
                    <Typography
                      position="relative"
                      zIndex={1}
                      color={palette.accent}
                      fontWeight={850}
                      fontSize="0.78rem"
                      mb={1.2}
                    >
                      Preview de alta conversão
                    </Typography>
                    <LandingTitle variant="h2">
                      Sua empresa pronta para captar clientes
                    </LandingTitle>
                    <FakeCta>
                      Falar no WhatsApp <ArrowForwardIcon sx={{ fontSize: 18 }} />
                    </FakeCta>
                  </LandingHeroCard>

                  <StatusGrid>
                    <StatusCard>
                      <StatusValue>+ Leads</StatusValue>
                      <Typography color="#667184" fontSize="0.76rem" mt={0.8}>
                        Mais pedidos de contato
                      </Typography>
                    </StatusCard>
                    <StatusCard>
                      <StatusValue>WhatsApp conectado</StatusValue>
                      <Typography color="#667184" fontSize="0.76rem" mt={0.8}>
                        Conversa direta
                      </Typography>
                    </StatusCard>
                    <StatusCard>
                      <StatusValue>Página publicada</StatusValue>
                      <Typography color="#667184" fontSize="0.76rem" mt={0.8}>
                        Pronta para divulgar
                      </Typography>
                    </StatusCard>
                  </StatusGrid>

                  <CommercialGrid>
                    <ServiceCard>
                      <Typography color={palette.ink} fontWeight={900}>
                        Serviço em destaque
                      </Typography>
                      <ServiceLine $width="86%" />
                      <ServiceLine $width="62%" />
                      <ServiceLine $width="42%" $accent />
                    </ServiceCard>

                    <ToolGrid>
                      {['Contato direto', 'Formulário online', 'Métricas básicas', 'Google Analytics'].map(
                        (item) => (
                          <ToolCard key={item}>{item}</ToolCard>
                        ),
                      )}
                    </ToolGrid>
                  </CommercialGrid>
                </PreviewBody>
              </Browser>

              <FloatingLeadCard>
                <Typography color={palette.textMuted} fontSize="0.78rem" fontWeight={780}>
                  Presença profissional
                </Typography>
                <Typography fontWeight={900} mt={0.6}>
                  Divulgação, confiança e captação no mesmo lugar.
                </Typography>
                <MiniProgress>
                  <span />
                </MiniProgress>
              </FloatingLeadCard>
            </VisualPanel>
          </VisualWrap>
        </HeroGrid>
      </Container>
    </Hero>
  );
}
