import { useEffect, useRef, useState } from 'react';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import TrackChangesRoundedIcon from '@mui/icons-material/TrackChangesRounded';
import { Container, Typography } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import { palette } from '../theme';

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

type Feature = {
  title: string;
  desc: string;
};

const FEATURES: Feature[] = [
  {
    title: 'Velocidade Extrema',
    desc: 'Aplicações otimizadas para carregamento instantâneo, melhorando SEO e retenção de usuários. Arquitetura moderna com tempos de resposta na casa dos milissegundos.',
  },
  {
    title: 'Foco em Conversão',
    desc: 'Design estratégico pensado para guiar o usuário e maximizar os resultados do seu negócio. Fluxos otimizados e CTAs testados para maior engajamento.',
  },
  {
    title: 'Design Premium',
    desc: 'Interfaces minimalistas, modernas e alinhadas com as maiores tendências do mercado global. Transmitimos autoridade e confiança através do design.',
  },
];

const Section = styled.section`
  position: relative;
  background: transparent;
  color: ${palette.text};
  scroll-margin-top: 92px;
`;

const SectionHeader = styled.div`
  position: relative;
  z-index: 3;
`;

const Intro = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: clamp(78px, 8vw, 112px) 0 clamp(46px, 6vw, 72px);
  text-align: center;

  @media (max-width: 699px) {
    text-align: left;
  }
`;

const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px;
  color: ${palette.accent};
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.13em;
  text-transform: uppercase;

  svg {
    font-size: 17px;
  }
`;

const Title = styled(Typography)`
  && {
    color: ${palette.text};
    font-size: clamp(2.35rem, 4.8vw, 4.9rem);
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 1;
    text-wrap: balance;
  }
`;

const Layout = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: start;
  min-height: ${FEATURES.length * 100}vh;

  @media (max-width: 899px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const StickyColumn = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  display: grid;
  height: 100vh;
  place-items: center;
  padding: clamp(72px, 9vw, 112px) 0 clamp(42px, 6vw, 76px);

  @media (max-width: 899px) {
    top: 72px;
    height: auto;
    padding: 18px 0 8px;
  }
`;

const VisualShell = styled.div`
  position: relative;
  width: min(100%, 440px);
  aspect-ratio: 1;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  background: #0a0a0a;
  box-shadow: 0 32px 100px rgba(0, 0, 0, 0.28);

  @media (max-width: 899px) {
    width: min(100%, 360px);
    border-radius: 30px;
  }
`;

const VisualPanel = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: #050505;
  opacity: ${(props) => (props.$active ? 1 : 0)};
  pointer-events: ${(props) => (props.$active ? 'auto' : 'none')};
  transition: opacity 700ms ease;
`;

const SpeedCanvas = styled.div`
  position: relative;
  width: 76%;
  height: 76%;
  transform-style: preserve-3d;
`;

const PerformanceCard = styled.div`
  position: absolute;
  top: 18px;
  left: 0;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px;
  background: #111111;
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.35);
  padding: 20px;
  animation: ${floatOne} 6s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const IconTile = styled.div<{ $solid?: boolean }>`
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  border-radius: 16px;
  background: ${(props) => (props.$solid ? palette.accent : 'rgba(0, 229, 40, 0.1)')};
  color: ${(props) => (props.$solid ? palette.ink : palette.accent)};

  svg {
    font-size: 28px;
  }
`;

const TerminalCard = styled.div`
  position: absolute;
  right: 0;
  bottom: 22px;
  width: min(230px, 82%);
  border-radius: 22px;
  background: ${palette.accent};
  color: ${palette.ink};
  box-shadow: 0 0 34px rgba(0, 229, 40, 0.22);
  padding: 20px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 0.86rem;
  font-weight: 700;
  animation: ${floatTwo} 8s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const TerminalDots = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 14px;

  span {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const ConversionCard = styled.div`
  position: relative;
  width: 76%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  background: #111111;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.36);
  padding: clamp(24px, 4vw, 34px);
`;

const ConversionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  margin-bottom: 28px;
  color: ${palette.textMuted};
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  svg {
    color: ${palette.accent};
  }
`;

const ConversionBars = styled.div`
  display: flex;
  align-items: end;
  gap: 12px;
  height: 130px;
  margin-bottom: 24px;

  span {
    position: relative;
    flex: 1;
    border-radius: 10px 10px 2px 2px;
    background: rgba(255, 255, 255, 0.08);
  }

  span:nth-child(1) {
    height: 26%;
  }

  span:nth-child(2) {
    height: 52%;
    background: rgba(255, 255, 255, 0.12);
  }

  span:nth-child(3) {
    height: 76%;
    background: rgba(255, 255, 255, 0.2);
  }

  span:nth-child(4) {
    height: 100%;
    background: ${palette.accent};
  }
`;

const RoiPill = styled.strong`
  position: absolute;
  left: 50%;
  top: -42px;
  transform: translateX(-50%);
  width: max-content;
  border-radius: 10px;
  background: ${palette.accent};
  color: ${palette.ink};
  box-shadow: 0 18px 34px rgba(0, 229, 40, 0.22);
  padding: 8px 12px;
  font-size: 0.78rem;
`;

const ConversionInput = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 52px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  padding: 0 16px;

  span:first-child {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
  }

  span:last-child {
    width: 50%;
    height: 8px;
    border-radius: 999px;
    background: rgba(0, 229, 40, 0.5);
  }
`;

const DesignBoard = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 50px 1fr 96px;
  width: 86%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  background: #0a0a0a;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);
`;

const ToolRail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  background: #050505;
  padding: 16px 0;

  span {
    width: 22px;
    height: 22px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.05);
  }

  span:first-child {
    border-color: rgba(0, 229, 40, 0.5);
    background: rgba(0, 229, 40, 0.1);
  }
`;

const Artboard = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: radial-gradient(circle at center, rgba(0, 229, 40, 0.05), transparent 60%);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.22;
    background-image:
      linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
    background-size: 28px 28px;
  }
`;

const ComponentPreview = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  width: 178px;
  height: 128px;
  align-items: center;
  justify-content: center;
  gap: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 22px;
  background: #111111;
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.42);
  transition:
    border-color 300ms ease,
    box-shadow 300ms ease;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border: 1px solid ${palette.accent};
    border-radius: inherit;
    opacity: 0;
    transition: opacity 300ms ease;
  }

  ${DesignBoard}:hover & {
    border-color: rgba(0, 229, 40, 0.5);
    box-shadow: 0 22px 70px rgba(0, 229, 40, 0.12);
  }

  ${DesignBoard}:hover &::before {
    opacity: 1;
  }
`;

const ComponentCircle = styled.span`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${palette.accent};
  box-shadow: 0 0 22px rgba(0, 229, 40, 0.34);
`;

const ComponentLines = styled.div`
  display: grid;
  gap: 9px;

  span {
    display: block;
    height: 8px;
    border-radius: 999px;
    background: ${palette.text};
  }

  span:first-child {
    width: 66px;
  }

  span:last-child {
    width: 42px;
    background: rgba(255, 255, 255, 0.28);
  }
`;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  background: #050505;
  padding: 16px;

  span {
    display: block;
    height: 8px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
  }

  span:first-child {
    background: rgba(255, 255, 255, 0.22);
  }

  span:last-child {
    margin-top: auto;
    height: 34px;
    border: 1px solid rgba(0, 229, 40, 0.2);
    border-radius: 10px;
    background: rgba(0, 229, 40, 0.1);
  }
`;

const FeatureList = styled.div`
  position: relative;
  z-index: 1;
  padding: 0 0 1px;
`;

const FeatureBlock = styled.article<{ $active: boolean }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(72px, 9vw, 112px) clamp(8px, 5vw, 76px) clamp(42px, 6vw, 76px);
  opacity: ${(props) => (props.$active ? 1 : 0.26)};
  transform: translateY(${(props) => (props.$active ? '0' : '18px')});
  transition:
    opacity 520ms ease,
    transform 520ms ease;

  @media (max-width: 899px) {
    min-height: 64vh;
    padding: 44px 0;
    opacity: 1;
    transform: none;
  }
`;

const FeatureTitle = styled(Typography)`
  && {
    color: ${palette.text};
    font-size: clamp(2.15rem, 4.5vw, 4.6rem);
    font-weight: 820;
    letter-spacing: -0.045em;
    line-height: 1.02;
    text-wrap: balance;
  }
`;

const FeatureText = styled(Typography)`
  && {
    max-width: 650px;
    margin-top: 24px;
    color: ${palette.textMuted};
    font-size: clamp(1.04rem, 1.6vw, 1.28rem);
    font-weight: 300;
    line-height: 1.72;
    text-wrap: pretty;
  }
`;

function FeatureVisual({ activeFeature }: { activeFeature: number }) {
  return (
    <VisualShell aria-hidden="true">
      <VisualPanel $active={activeFeature === 0}>
        <SpeedCanvas>
          <PerformanceCard>
            <IconTile>
              <BoltRoundedIcon />
            </IconTile>
            <div>
              <Typography color={palette.textMuted} fontSize="0.72rem" fontWeight={900} letterSpacing="0.12em">
                PERFORMANCE
              </Typography>
              <Typography color={palette.text} fontSize="2.2rem" fontWeight={900} lineHeight={1}>
                100
              </Typography>
            </div>
          </PerformanceCard>

          <TerminalCard>
            <TerminalDots>
              <span />
              <span />
            </TerminalDots>
            <div>
              <span style={{ opacity: 0.48 }}>~</span> pnpm build
            </div>
            <div style={{ marginTop: 5 }}>compiled in 12ms</div>
          </TerminalCard>
        </SpeedCanvas>
      </VisualPanel>

      <VisualPanel $active={activeFeature === 1}>
        <ConversionCard>
          <ConversionHeader>
            Conversão
            <TrackChangesRoundedIcon />
          </ConversionHeader>
          <ConversionBars>
            <span />
            <span />
            <span />
            <span>
              <RoiPill>+34% ROI</RoiPill>
            </span>
          </ConversionBars>
          <ConversionInput>
            <span />
            <span />
          </ConversionInput>
        </ConversionCard>
      </VisualPanel>

      <VisualPanel $active={activeFeature === 2}>
        <DesignBoard>
          <ToolRail>
            <span />
            <span />
            <span />
          </ToolRail>
          <Artboard>
            <ComponentPreview>
              <ComponentCircle />
              <ComponentLines>
                <span />
                <span />
              </ComponentLines>
            </ComponentPreview>
          </Artboard>
          <SidePanel>
            <span />
            <span />
            <span />
            <span />
          </SidePanel>
        </DesignBoard>
      </VisualPanel>
    </VisualShell>
  );
}

export function DifferentialsSection() {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

    const updateActiveFeature = () => {
      frameId = 0;

      const section = scrollAreaRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalScrollable = section.offsetHeight - window.innerHeight;
      const progress = totalScrollable > 0 ? clamp(-rect.top / totalScrollable) : 0;
      const nextIndex = Math.min(FEATURES.length - 1, Math.floor(progress * FEATURES.length));

      setActiveFeature((current) => (current === nextIndex ? current : nextIndex));
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateActiveFeature);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return (
    <Section id="servicos" aria-labelledby="diferenciais-title">
      <Container maxWidth="xl">
        <SectionHeader>
          <Intro>
            <Eyebrow>
              <AutoAwesomeRoundedIcon />
              Diferenciais
            </Eyebrow>
            <Title id="diferenciais-title" variant="h2">
              Por que a HC?
            </Title>
          </Intro>
        </SectionHeader>

        <Layout ref={scrollAreaRef}>
          <StickyColumn>
            <FeatureVisual activeFeature={activeFeature} />
          </StickyColumn>

          <FeatureList>
            {FEATURES.map((feature, index) => (
              <FeatureBlock
                key={feature.title}
                data-feature-index={index}
                $active={activeFeature === index}
              >
                <FeatureTitle variant="h3">{feature.title}</FeatureTitle>
                <FeatureText>{feature.desc}</FeatureText>
              </FeatureBlock>
            ))}
          </FeatureList>
        </Layout>
      </Container>
    </Section>
  );
}
