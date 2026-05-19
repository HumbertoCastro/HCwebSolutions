import { useState, type CSSProperties, type MouseEvent } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { Button, Container, Stack, Typography } from '@mui/material';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { motionTokens } from '../motion';
import { palette } from '../theme';

const floatSoft = keyframes`
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
`;

const Hero = styled.section`
  position: relative;
  overflow: hidden;
  padding: clamp(54px, 7vw, 104px) 0 clamp(56px, 7vw, 100px);

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
    padding: 40px 0 64px;
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
  grid-template-columns: minmax(0, 0.9fr) minmax(360px, 0.86fr);
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
  gap: 9px;
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

  svg {
    color: ${palette.accent};
    font-size: 18px;
  }
`;

const HeroTitle = styled(Typography)`
  && {
    max-width: 920px;
    font-size: clamp(2.7rem, 5.25vw, 5.8rem);
    letter-spacing: 0;
    line-height: 0.98;
    color: ${palette.text};
    text-wrap: balance;

    span {
      color: ${palette.accent};
    }

    @media (max-width: 599px) {
      font-size: clamp(2.2rem, 10.5vw, 3.48rem);
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

const MiniFlow = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-top: 28px;
  max-width: 740px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const FlowStep = styled(motion.div)`
  min-height: 88px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.045);
  padding: 13px;
  transition:
    transform 260ms ease,
    border-color 260ms ease,
    background 260ms ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(8, 203, 0, 0.38);
    background: rgba(8, 203, 0, 0.075);
  }
`;

const FlowNumber = styled.span`
  color: ${palette.accent};
  font-size: 0.78rem;
  font-weight: 900;
`;

const VisualWrap = styled(motion.div)`
  position: relative;
`;

const VisualPanel = styled.div`
  position: relative;
  min-height: 560px;
  border: 1px solid ${palette.border};
  border-radius: 32px;
  padding: 18px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.028)),
    ${palette.surface};
  box-shadow: 0 42px 110px rgba(0, 0, 0, 0.38);
  transition:
    transform 320ms ease,
    border-color 320ms ease,
    box-shadow 320ms ease;
  animation: ${floatSoft} 8s ease-in-out infinite;

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
  background: #f6f8fb;
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

const CampaignHero = styled.div`
  border-radius: 24px;
  padding: clamp(20px, 3vw, 30px);
  background:
    linear-gradient(135deg, rgba(8, 203, 0, 0.2), transparent 42%),
    ${palette.ink};
  color: ${palette.text};
  min-height: 214px;
  position: relative;
  overflow: hidden;
`;

const LandingTitle = styled(Typography)`
  && {
    position: relative;
    z-index: 1;
    max-width: 380px;
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

const SignalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 430px) {
    grid-template-columns: 1fr;
  }
`;

const SignalCard = styled.div`
  border-radius: 18px;
  border: 1px solid rgba(7, 10, 18, 0.08);
  background: #ffffff;
  padding: 14px;
`;

const SignalValue = styled.div`
  color: ${palette.ink};
  font-size: 0.92rem;
  font-weight: 900;
`;

const JourneyBoard = styled.div`
  display: grid;
  grid-template-columns: 0.92fr 1fr;
  gap: 12px;

  @media (max-width: 599px) {
    grid-template-columns: 1fr;
  }
`;

const BriefingCard = styled.div`
  border-radius: 20px;
  border: 1px solid rgba(7, 10, 18, 0.08);
  background: #ffffff;
  padding: 18px;
  min-height: 154px;
`;

const Line = styled.div<{ $width: string; $accent?: boolean }>`
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
  width: min(270px, 74%);
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

type HeroSectionProps = {
  onContactClick: () => void;
};

const trustItems = ['+5 anos de experiência', 'Briefing em menos de 2 minutos', 'Solução sob medida'];
const flowItems = ['Ideia', 'Briefing', 'Proposta', 'Entrega'];

export function HeroSection({ onContactClick }: HeroSectionProps) {
  const [mouse, setMouse] = useState({ x: 50, y: 36, active: 0 });
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
      transition: { duration: motionTokens.duration.slow, ease: motionTokens.softEase },
    },
  };

  const mockupVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: motionTokens.duration.slow, delay: 0.24, ease: motionTokens.softEase },
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
        transform: `translate3d(${((mouse.x - 50) / 50) * 7}px, ${((mouse.y - 36) / 50) * 7}px, 0)`,
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
              <Badge>
                <RocketLaunchRoundedIcon />
                Landing pages, sites e sistemas para pequenos negócios
              </Badge>
            </AnimatedBlock>

            <AnimatedBlock variants={itemVariants}>
              <HeroTitle variant="h1" mt={2.5}>
                Transforme sua presença digital em uma máquina de <span>pedidos e contatos</span>
              </HeroTitle>
            </AnimatedBlock>

            <AnimatedBlock variants={itemVariants}>
              <HeroText>
                Eu desenho e desenvolvo experiências web para divulgar serviços, captar clientes,
                organizar processos e levar seu negócio para uma presença mais profissional.
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
                  sx={{ minHeight: 54 }}
                >
                  Começar briefing rápido
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

            <MiniFlow variants={copyVariants}>
              {flowItems.map((item, index) => (
                <FlowStep variants={itemVariants} key={item}>
                  <FlowNumber>0{index + 1}</FlowNumber>
                  <Typography color={palette.text} fontWeight={900} mt={1}>
                    {item}
                  </Typography>
                </FlowStep>
              ))}
            </MiniFlow>
          </HeroCopy>

          <VisualWrap variants={mockupVariants} initial="hidden" animate="visible">
            <VisualPanel aria-label="Preview de jornada de captação para clientes">
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
                  <CampaignHero>
                    <Typography color={palette.accent} fontWeight={850} fontSize="0.78rem" mb={1.2}>
                      Página de alta conversão
                    </Typography>
                    <LandingTitle variant="h2">Oferta clara, WhatsApp pronto e confiança visual</LandingTitle>
                    <FakeCta>
                      Falar no WhatsApp <ArrowForwardIcon sx={{ fontSize: 18 }} />
                    </FakeCta>
                  </CampaignHero>

                  <SignalGrid>
                    <SignalCard>
                      <SignalValue>+ Leads</SignalValue>
                      <Typography color="#667184" fontSize="0.76rem" mt={0.8}>
                        Mais pedidos de contato
                      </Typography>
                    </SignalCard>
                    <SignalCard>
                      <SignalValue>Briefing rápido</SignalValue>
                      <Typography color="#667184" fontSize="0.76rem" mt={0.8}>
                        Menos fricção
                      </Typography>
                    </SignalCard>
                    <SignalCard>
                      <SignalValue>Mobile first</SignalValue>
                      <Typography color="#667184" fontSize="0.76rem" mt={0.8}>
                        Pronto para divulgar
                      </Typography>
                    </SignalCard>
                  </SignalGrid>

                  <JourneyBoard>
                    <BriefingCard>
                      <Typography color={palette.ink} fontWeight={900}>
                        Resumo do briefing
                      </Typography>
                      <Line $width="86%" />
                      <Line $width="62%" />
                      <Line $width="42%" $accent />
                    </BriefingCard>

                    <ToolGrid>
                      {['Oferta clara', 'CTA direto', 'Prova visual', 'Métricas'].map((item) => (
                        <ToolCard key={item}>{item}</ToolCard>
                      ))}
                    </ToolGrid>
                  </JourneyBoard>
                </PreviewBody>
              </Browser>

              <FloatingLeadCard>
                <Typography color={palette.textMuted} fontSize="0.78rem" fontWeight={780}>
                  Próximo passo
                </Typography>
                <Typography fontWeight={900} mt={0.6}>
                  O usuário responde um briefing simples e chega ao WhatsApp com a ideia organizada.
                </Typography>
              </FloatingLeadCard>
            </VisualPanel>
          </VisualWrap>
        </HeroGrid>
      </Container>
    </Hero>
  );
}
