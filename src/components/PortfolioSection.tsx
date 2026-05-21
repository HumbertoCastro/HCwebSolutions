import { useEffect, useRef, useState } from 'react';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { palette } from '../theme';

type CaseItem = {
  id: number;
  title: string;
  category: string;
  desc: string;
  glow: string;
};

const MOCK_CASES: CaseItem[] = [
  {
    id: 1,
    title: 'Fintech Dashboard',
    category: 'Web App',
    desc: 'Interface de alta performance para gestão financeira complexa.',
    glow: 'rgba(59, 130, 246, 0.22)',
  },
  {
    id: 2,
    title: 'E-commerce Premium',
    category: 'Plataforma',
    desc: 'Experiência de compra fluida com foco absoluto em conversão e luxo.',
    glow: 'rgba(168, 85, 247, 0.22)',
  },
  {
    id: 3,
    title: 'SaaS Analytics',
    category: 'Interface',
    desc: 'Visualização de dados em tempo real com arquitetura escalável.',
    glow: 'rgba(0, 229, 40, 0.2)',
  },
  {
    id: 4,
    title: 'Logistics ERP',
    category: 'Sistema Web',
    desc: 'Gestão de frota e rotas com integração de mapas 3D e tracking.',
    glow: 'rgba(249, 115, 22, 0.22)',
  },
];

const Section = styled.section`
  position: relative;
  height: ${(MOCK_CASES.length + 1) * 100}vh;
  min-height: ${(MOCK_CASES.length + 1) * 620}px;
  background: ${palette.background};
  scroll-margin-top: 90px;

  @media (max-width: 899px) {
    height: auto;
    min-height: 0;
  }
`;

const LegacyAnchor = styled.span`
  position: absolute;
  top: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const StickyStage = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  min-height: 620px;
  overflow: clip;
  background: ${palette.background};

  @media (max-width: 899px) {
    display: none;
  }
`;

const CaseSlide = styled.article<{ $active: boolean; $glow: string }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background:
    radial-gradient(circle at 82% 18%, ${(props) => props.$glow}, transparent 35%),
    linear-gradient(180deg, ${(props) => props.$glow}, transparent 32%),
    ${palette.background};
  opacity: ${(props) => (props.$active ? 1 : 0)};
  pointer-events: ${(props) => (props.$active ? 'auto' : 'none')};
  transform: translateY(${(props) => (props.$active ? '0' : '24px')})
    scale(${(props) => (props.$active ? 1 : 0.985)});
  transition:
    opacity 420ms ease,
    transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
`;

const MobileCases = styled.div`
  display: none;

  @media (max-width: 899px) {
    display: grid;
  }
`;

const MobileCasePanel = styled.article<{ $glow: string }>`
  padding: 88px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background:
    radial-gradient(circle at 82% 18%, ${(props) => props.$glow}, transparent 35%),
    linear-gradient(180deg, ${(props) => props.$glow}, transparent 32%),
    ${palette.background};
`;

const CaseGrid = styled.div<{ $reverse: boolean }>`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(38px, 6vw, 84px);
  align-items: center;

  ${(props) =>
    props.$reverse &&
    `
      > :first-child {
        order: 2;
      }

      > :last-child {
        order: 1;
      }
    `}

  @media (max-width: 899px) {
    grid-template-columns: 1fr;

    > :first-child,
    > :last-child {
      order: initial;
    }
  }
`;

const CaseCopy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Meta = styled.span`
  display: inline-flex;
  width: fit-content;
  min-height: 32px;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: ${palette.accent};
  padding: 7px 12px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 0.76rem;
  font-weight: 800;
`;

const Title = styled(Typography)`
  && {
    max-width: 660px;
    margin-top: 24px;
    color: ${palette.text};
    font-size: clamp(2.55rem, 5.2vw, 5.9rem);
    font-weight: 900;
    letter-spacing: -0.055em;
    line-height: 0.98;
    text-wrap: balance;
  }
`;

const Description = styled(Typography)`
  && {
    max-width: 520px;
    margin-top: 24px;
    color: ${palette.textMuted};
    font-size: clamp(1.04rem, 1.55vw, 1.25rem);
    line-height: 1.58;
    text-wrap: pretty;
  }
`;

const CaseLink = styled(Link)`
  display: inline-flex;
  width: fit-content;
  min-height: 44px;
  align-items: center;
  gap: 9px;
  margin-top: 30px;
  color: ${palette.accent};
  text-decoration: none;
  font-weight: 800;
  transition: color 180ms ease;

  svg {
    transition: transform 180ms ease;
  }

  &:hover,
  &:focus-visible {
    color: ${palette.text};
    outline: none;

    svg {
      transform: translate(3px, -3px);
    }
  }
`;

const PerspectiveBox = styled.div`
  height: min(58vh, 520px);
  min-height: 420px;
  perspective: 2000px;

  &:hover .case-card-even {
    transform: rotateY(12deg) rotateX(8deg);
  }

  &:hover .case-card-odd {
    transform: rotateY(-12deg) rotateX(8deg);
  }

  @media (max-width: 899px) {
    height: auto;
    min-height: 420px;
  }
`;

const CaseCard3d = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 420px;
  transform-style: preserve-3d;
  transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;

  @media (max-width: 899px) {
    min-height: 420px;
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none !important;
    transition: none;
  }
`;

const Browser = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  background: #0a0a0a;
  box-shadow: 0 34px 110px rgba(0, 0, 0, 0.46);
`;

const BrowserTop = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  gap: 9px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: #111111;
  padding: 0 16px;
`;

const Dot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
`;

const Url = styled.div`
  display: flex;
  height: 26px;
  min-width: min(230px, 56%);
  align-items: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.36);
  padding: 0 12px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 0.68rem;
  margin-left: 8px;
`;

const BrowserBody = styled.div`
  position: relative;
  flex: 1;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.05), transparent 70%);
  padding: clamp(22px, 4vw, 34px);
`;

const InnerLayer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 300px;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  background: #111111;
  padding: 24px;
  transform: translateZ(40px);

  &::after {
    content: '';
    position: absolute;
    top: -52px;
    right: -52px;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: ${palette.accent};
    filter: blur(58px);
    opacity: 0.1;
  }
`;

const LayerLine = styled.span<{ $width: string; $accent?: boolean }>`
  display: block;
  width: ${(props) => props.$width};
  height: ${(props) => (props.$accent ? '100%' : '12px')};
  border-radius: ${(props) => (props.$accent ? '6px 6px 2px 2px' : '999px')};
  background: ${(props) =>
    props.$accent ? 'rgba(0, 229, 40, 0.6)' : 'rgba(255, 255, 255, 0.1)'};
`;

const ChartPanel = styled.div`
  display: flex;
  height: 132px;
  align-items: end;
  gap: 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  padding: 16px;
  margin-top: 24px;

  span {
    width: 34px;
    border-radius: 6px 6px 2px 2px;
    background: rgba(0, 229, 40, 0.5);
  }

  span:nth-child(1) {
    height: 36%;
  }

  span:nth-child(2) {
    height: 68%;
    background: rgba(0, 229, 40, 0.78);
  }

  span:nth-child(3) {
    height: 100%;
    background: ${palette.accent};
    box-shadow: 0 0 18px rgba(0, 229, 40, 0.32);
  }
`;

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: auto;

  span {
    height: 42px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
  }
`;

const DeployedBadge = styled.div`
  position: absolute;
  right: 46px;
  bottom: 46px;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  border-radius: 16px;
  background: ${palette.accent};
  color: ${palette.ink};
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.34);
  padding: 13px 16px;
  font-weight: 900;
  transform: translateZ(80px);

  svg {
    font-size: 20px;
  }

  @media (max-width: 599px) {
    right: 24px;
    bottom: 24px;
  }
`;

function CaseVisual({ caseItem, index }: { caseItem: CaseItem; index: number }) {
  return (
    <PerspectiveBox aria-label={`Preview visual do case ${caseItem.title}`}>
      <CaseCard3d className={index % 2 === 0 ? 'case-card-even' : 'case-card-odd'}>
        <Browser>
          <BrowserTop>
            <Dot />
            <Dot />
            <Dot />
            <Url>hcwebsolutions.com.br/{caseItem.id}</Url>
          </BrowserTop>

          <BrowserBody>
            <InnerLayer>
              <LayerLine $width="34%" />
              <ChartPanel>
                <span />
                <span />
                <span />
              </ChartPanel>
              <BottomGrid>
                <span />
                <span />
              </BottomGrid>
            </InnerLayer>
            <DeployedBadge>
              <CodeRoundedIcon />
              Deployed
            </DeployedBadge>
          </BrowserBody>
        </Browser>
      </CaseCard3d>
    </PerspectiveBox>
  );
}

function CaseContent({ caseItem, index }: { caseItem: CaseItem; index: number }) {
  return (
    <CaseGrid $reverse={index % 2 !== 0}>
      <CaseCopy>
        <Meta>
          0{caseItem.id} / {caseItem.category}
        </Meta>
        <Title id={index === 0 ? 'cases-title' : undefined} variant="h2">
          {caseItem.title}
        </Title>
        <Description>{caseItem.desc}</Description>
        <CaseLink to="/contato">
          Ver detalhes do projeto
          <ArrowOutwardRoundedIcon />
        </CaseLink>
      </CaseCopy>

      <CaseVisual caseItem={caseItem} index={index} />
    </CaseGrid>
  );
}

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeCase, setActiveCase] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

    const updateActiveCase = () => {
      frameId = 0;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalScrollable = section.offsetHeight - window.innerHeight;
      const progress = totalScrollable > 0 ? clamp(-rect.top / totalScrollable) : 0;
      const nextIndex = Math.min(MOCK_CASES.length - 1, Math.floor(progress * MOCK_CASES.length));

      setActiveCase((current) => (current === nextIndex ? current : nextIndex));
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateActiveCase);
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
    <Section id="cases" ref={sectionRef} aria-labelledby="cases-title">
      <LegacyAnchor id="projetos" aria-hidden="true" />

      <StickyStage>
        {MOCK_CASES.map((caseItem, index) => (
          <CaseSlide key={caseItem.id} $active={activeCase === index} $glow={caseItem.glow}>
            <Container maxWidth="xl">
              <CaseContent caseItem={caseItem} index={index} />
            </Container>
          </CaseSlide>
        ))}
      </StickyStage>

      <MobileCases>
        {MOCK_CASES.map((caseItem, index) => (
          <MobileCasePanel key={caseItem.id} $glow={caseItem.glow}>
            <Container maxWidth="xl">
              <CaseContent caseItem={caseItem} index={index} />
            </Container>
          </MobileCasePanel>
        ))}
      </MobileCases>
    </Section>
  );
}
