import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Button, Container, Stack, Typography } from '@mui/material';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import styled, { css, keyframes } from 'styled-components';
import { motionTokens } from '../motion';
import { palette } from '../theme';
import { Waves } from './ui/wave-background';

const floatOne = keyframes`
  0%, 100% {
    transform: translateZ(50px) translateY(0) translateX(0);
  }

  50% {
    transform: translateZ(50px) translateY(-15px) translateX(10px);
  }
`;

const floatTwo = keyframes`
  0%, 100% {
    transform: translateZ(100px) translateY(0) rotate(-4deg);
  }

  50% {
    transform: translateZ(100px) translateY(-25px) rotate(-2deg);
  }
`;

const floatThree = keyframes`
  0%, 100% {
    transform: translateZ(150px) translateY(0) rotate(4deg);
  }

  50% {
    transform: translateZ(150px) translateY(-20px) rotate(6deg);
  }
`;

const Hero = styled.section`
  position: relative;
  min-height: 100svh;
  display: grid;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
  background: ${palette.background};
  padding: clamp(128px, 14vw, 176px) 0 clamp(72px, 8vw, 116px);
  scroll-margin-top: 100px;

  @media (max-width: 899px) {
    min-height: auto;
    padding: 118px 0 72px;
  }
`;

const HeroWaveLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  .waves-component {
    opacity: 0.98;
    filter: brightness(1.65) contrast(1.18) saturate(1.35);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 70% 36%, rgba(0, 229, 40, 0.18), transparent 34%),
      radial-gradient(circle at 46% 74%, rgba(0, 229, 40, 0.1), transparent 34%),
      linear-gradient(90deg, transparent 0%, rgba(0, 229, 40, 0.07) 54%, transparent 100%);
    mix-blend-mode: screen;
  }
`;

const HeroReadabilityLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(5, 5, 5, 0.9) 0%, rgba(5, 5, 5, 0.76) 34%, rgba(5, 5, 5, 0.24) 62%, rgba(5, 5, 5, 0.46) 100%),
    linear-gradient(180deg, rgba(5, 5, 5, 0.2) 0%, rgba(5, 5, 5, 0.03) 48%, rgba(5, 5, 5, 0.58) 100%);

  @media (max-width: 1023px) {
    background:
      linear-gradient(180deg, rgba(5, 5, 5, 0.86) 0%, rgba(5, 5, 5, 0.52) 48%, rgba(5, 5, 5, 0.82) 100%),
      linear-gradient(90deg, rgba(5, 5, 5, 0.9) 0%, rgba(5, 5, 5, 0.36) 100%);
  }
`;

const HeroContainer = styled(Container)`
  position: relative;
  z-index: 2;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(390px, 0.86fr);
  gap: clamp(42px, 5vw, 78px);
  align-items: center;

  > * {
    min-width: 0;
  }

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

const HeroCopy = styled(motion.div)`
  position: relative;
  z-index: 2;
  min-width: 0;

  @media (max-width: 599px) {
    width: 100%;
    max-width: calc(100vw - 32px);
  }
`;

const AnimatedBlock = styled(motion.div)``;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  width: fit-content;
  min-height: 36px;
  max-width: 100%;
  border: 1px solid rgba(0, 229, 40, 0.28);
  border-radius: 999px;
  background: rgba(2, 17, 8, 0.76);
  color: #8eff9f;
  padding: 8px 13px;
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  line-height: 1.25;
  text-transform: uppercase;
  box-shadow: 0 0 0 1px rgba(0, 229, 40, 0.08), 0 18px 44px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(10px);

  svg {
    font-size: 17px;
    color: #8eff9f;
  }
`;

const HeroTitle = styled(Typography)`
  && {
    max-width: 790px;
    margin-top: clamp(28px, 3vw, 34px);
    color: ${palette.text};
    font-size: clamp(3.1rem, 6.5vw, 5.55rem);
    font-weight: 900;
    letter-spacing: -0.055em;
    line-height: 1.05;
    overflow-wrap: break-word;
    text-wrap: balance;
    text-shadow: 0 18px 54px rgba(0, 0, 0, 0.82);

    strong {
      color: ${palette.accent};
      font: inherit;
      text-shadow: 0 0 34px rgba(0, 229, 40, 0.24);
    }

    .mobile-copy {
      display: none;
    }

    @media (max-width: 599px) {
      font-size: clamp(2.35rem, 10.1vw, 2.85rem);
      letter-spacing: -0.04em;
      line-height: 1.06;

      .desktop-copy {
        display: none;
      }

      .mobile-copy {
        display: inline;
      }
    }
  }
`;

const HeroText = styled(Typography)`
  && {
    max-width: 510px;
    margin-top: 26px;
    color: rgba(255, 255, 255, 0.78);
    font-size: clamp(1.04rem, 1.45vw, 1.22rem);
    font-weight: 500;
    line-height: 1.38;
    overflow-wrap: break-word;
    text-wrap: pretty;
    text-shadow: 0 12px 32px rgba(0, 0, 0, 0.72);
  }
`;

const VisualStage = styled(motion.div)`
  position: relative;
  min-width: 0;
  min-height: 620px;
  display: grid;
  place-items: center;
  perspective: 1200px;

  @media (max-width: 1023px) {
    min-height: 560px;
  }

  @media (max-width: 599px) {
    min-height: 520px;
    transform: scale(0.88);
    transform-origin: top center;
    margin-bottom: -46px;
  }
`;

const Phone = styled.div`
  position: relative;
  width: 260px;
  height: 520px;
  border: 14px solid #111111;
  border-radius: 48px;
  background: #0a0a0a;
  box-shadow:
    0 34px 110px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.08);
  transform: rotateX(15deg) rotateY(-25deg) rotateZ(8deg);
  transform-style: preserve-3d;
  transition: transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform;

  &:hover {
    transform: rotateX(5deg) rotateY(-15deg) rotateZ(2deg);
  }

  @media (prefers-reduced-motion: reduce) {
    transform: rotateX(10deg) rotateY(-16deg) rotateZ(4deg);
    transition: none;
  }
`;

const PhoneScreen = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 32px;
  background: #050505;
  padding: 16px;
`;

const BrowserBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  padding: 0 12px;
  margin-bottom: 16px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  span:nth-child(1) {
    background: rgba(239, 68, 68, 0.56);
  }

  span:nth-child(2) {
    background: rgba(234, 179, 8, 0.56);
  }

  span:nth-child(3) {
    background: rgba(0, 229, 40, 0.56);
  }
`;

const SkeletonHero = styled.div`
  display: flex;
  height: 128px;
  flex-direction: column;
  justify-content: flex-end;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  padding: 14px;
  margin-bottom: 16px;

  span {
    display: block;
    height: 12px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
  }

  span:first-child {
    width: 50%;
    height: 16px;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 0.12);
  }

  span:last-child {
    width: 72%;
  }
`;

const PrimaryStrip = styled.div`
  display: grid;
  height: 48px;
  place-items: center;
  border-radius: 16px;
  background: ${palette.accent};
  margin-bottom: 16px;

  span {
    width: 34%;
    height: 8px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const MutedStrip = styled.div`
  height: 48px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
`;

const FloatCard = styled.div<{ $variant: 'layout' | 'chart' | 'payment' }>`
  position: absolute;
  width: ${(props) => (props.$variant === 'chart' ? '210px' : '224px')};
  border: 1px solid
    ${(props) =>
      props.$variant === 'chart' ? 'rgba(0, 229, 40, 0.22)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 18px;
  background: ${(props) => (props.$variant === 'chart' ? '#050505' : '#111111')};
  box-shadow: 0 26px 80px rgba(0, 0, 0, 0.42);
  padding: 20px;
  color: ${palette.text};
  transform-style: preserve-3d;

  ${(props) =>
    props.$variant === 'layout' &&
    css`
      top: 64px;
      right: -92px;
      animation: ${floatOne} 6s ease-in-out infinite;
    `}

  ${(props) =>
    props.$variant === 'chart' &&
    css`
      top: 196px;
      left: -78px;
      animation: ${floatTwo} 8s ease-in-out infinite;
    `}

  ${(props) =>
    props.$variant === 'payment' &&
    css`
      right: -66px;
      bottom: 78px;
      animation: ${floatThree} 7s ease-in-out infinite;
    `}

  @media (max-width: 599px) {
    width: 196px;
    padding: 16px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const FloatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const IconBox = styled.div<{ $accent?: boolean }>`
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: 10px;
  background: ${(props) => (props.$accent ? palette.accent : 'rgba(255, 255, 255, 0.05)')};
  color: ${(props) => (props.$accent ? palette.ink : palette.text)};

  svg {
    font-size: 20px;
  }
`;

const MiniLine = styled.span<{ $width?: string; $accent?: boolean }>`
  display: block;
  width: ${(props) => props.$width ?? '100%'};
  height: 9px;
  border-radius: 999px;
  background: ${(props) =>
    props.$accent ? 'rgba(0, 229, 40, 0.5)' : 'rgba(255, 255, 255, 0.08)'};
`;

const BarChart = styled.div`
  display: flex;
  align-items: end;
  gap: 8px;
  height: 64px;
  margin-top: 8px;

  span {
    flex: 1;
    border-radius: 5px 5px 2px 2px;
    background: rgba(255, 255, 255, 0.08);
  }

  span:nth-child(1) {
    height: 34%;
  }

  span:nth-child(2) {
    height: 66%;
    background: rgba(255, 255, 255, 0.12);
  }

  span:nth-child(3) {
    height: 50%;
    background: rgba(255, 255, 255, 0.2);
  }

  span:nth-child(4) {
    height: 100%;
    background: ${palette.accent};
    box-shadow: 0 0 18px rgba(0, 229, 40, 0.3);
  }
`;

const PaymentPreview = styled.div`
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 12px;
`;

const PaymentButton = styled.div`
  display: flex;
  width: 75%;
  height: 34px;
  align-items: center;
  border-radius: 10px;
  background: rgba(0, 229, 40, 0.18);
  padding: 0 12px;
`;

type HeroSectionProps = {
  onContactClick: () => void;
};

export function HeroSection({ onContactClick }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const copyVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: motionTokens.stagger.base,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionTokens.duration.slow,
        ease: motionTokens.softEase,
      },
    },
  };

  const visualVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 34, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.18,
        ease: motionTokens.softEase,
      },
    },
  };

  const scrollToServices = () => {
    document.querySelector('#servicos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Hero id="inicio" aria-labelledby="hero-title">
      <HeroWaveLayer aria-hidden="true">
        <Waves
          strokeColor="rgba(0, 229, 40, 0.46)"
          backgroundColor="#031a0a"
          pointerSize={0.5}
        />
      </HeroWaveLayer>
      <HeroReadabilityLayer aria-hidden="true" />
      <HeroContainer maxWidth="xl">
        <HeroGrid>
          <HeroCopy variants={copyVariants} initial="hidden" animate="visible">
            <AnimatedBlock variants={itemVariants}>
              <Badge>
                <FlashOnRoundedIcon />
                Soluções Web Premium
              </Badge>
            </AnimatedBlock>

            <AnimatedBlock variants={itemVariants}>
              <HeroTitle id="hero-title" variant="h1">
                <span className="desktop-copy">
                  Sites e soluções <br />
                  web para negócios <br />
                  que querem <br />
                  <strong>vender melhor</strong>
                </span>
                <span className="mobile-copy">
                  Sites e soluções <br />
                  web para <br />
                  negócios <br />
                  que querem <br />
                  <strong>vender melhor</strong>
                </span>
              </HeroTitle>
            </AnimatedBlock>

            <AnimatedBlock variants={itemVariants}>
              <HeroText>
                Landing pages, sites institucionais e soluções sob medida para divulgar seus
                serviços, captar clientes e organizar processos.
              </HeroText>
            </AnimatedBlock>

            <AnimatedBlock variants={itemVariants}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} mt={4}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowOutwardRoundedIcon />}
                  onClick={onContactClick}
                  size="large"
                  sx={{ minHeight: 56, px: 3.1 }}
                >
                  Começar briefing rápido
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  endIcon={<KeyboardArrowDownRoundedIcon />}
                  onClick={scrollToServices}
                  size="large"
                  sx={{
                    minHeight: 56,
                    px: 3.1,
                    borderColor: 'rgba(255,255,255,0.22)',
                    color: palette.text,
                    '&:hover': {
                      borderColor: palette.accent,
                      bgcolor: 'rgba(0,229,40,0.08)',
                    },
                  }}
                >
                  Ver soluções
                </Button>
              </Stack>
            </AnimatedBlock>
          </HeroCopy>

          <VisualStage variants={visualVariants} initial="hidden" animate="visible">
            <Phone aria-label="Preview visual de uma solução web premium">
              <PhoneScreen>
                <BrowserBar aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </BrowserBar>
                <SkeletonHero aria-hidden="true">
                  <span />
                  <span />
                </SkeletonHero>
                <PrimaryStrip aria-hidden="true">
                  <span />
                </PrimaryStrip>
                <MutedStrip aria-hidden="true" />
              </PhoneScreen>

              <FloatCard $variant="layout" aria-hidden="true">
                <FloatHeader>
                  <IconBox>
                    <DashboardCustomizeRoundedIcon />
                  </IconBox>
                  <MiniLine $width="104px" />
                </FloatHeader>
                <MiniLine />
                <MiniLine $width="80%" style={{ marginTop: 8 }} />
              </FloatCard>

              <FloatCard $variant="chart" aria-hidden="true">
                <FloatHeader>
                  <IconBox $accent>
                    <BarChartRoundedIcon />
                  </IconBox>
                  <MiniLine $width="70px" />
                </FloatHeader>
                <BarChart>
                  <span />
                  <span />
                  <span />
                  <span />
                </BarChart>
              </FloatCard>

              <FloatCard $variant="payment" aria-hidden="true">
                <FloatHeader>
                  <IconBox>
                    <CreditCardRoundedIcon />
                  </IconBox>
                  <MiniLine $width="86px" />
                </FloatHeader>
                <PaymentPreview />
                <PaymentButton>
                  <MiniLine $width="54%" $accent />
                </PaymentButton>
              </FloatCard>
            </Phone>
          </VisualStage>
        </HeroGrid>
      </HeroContainer>
    </Hero>
  );
}
