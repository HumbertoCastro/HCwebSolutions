import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Container, Typography } from '@mui/material';
import styled, { css, keyframes } from 'styled-components';
import { projects } from '../data/projects';
import { palette } from '../theme';
import type { Project } from '../types';

const CASE_COUNT = projects.length;

type AnimatedWordsProps = {
  active: boolean;
  text: string;
};

const titleScale = keyframes`
  to {
    transform: scale(1);
  }
`;

const wordFadeIn = keyframes`
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
`;

const Section = styled.section`
  position: relative;
  height: ${(CASE_COUNT + 1) * 100}vh;
  min-height: ${(CASE_COUNT + 1) * 620}px;
  background: ${palette.background};
  scroll-margin-top: 90px;

  @media (max-width: 899px) {
    height: ${(CASE_COUNT + 1) * 100}svh;
    min-height: ${(CASE_COUNT + 1) * 620}px;
  }

  @media (max-width: 599px) {
    min-height: ${(CASE_COUNT + 1) * 660}px;
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
    height: 100svh;
    min-height: 0;
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

  @media (max-width: 899px) {
    align-items: flex-start;
    min-height: 0;
    padding: clamp(78px, 9svh, 92px) 0 clamp(36px, 6svh, 58px);
  }

  @media (max-width: 599px) {
    padding: clamp(76px, 9.5svh, 88px) 0 clamp(26px, 5svh, 42px);
  }
`;

const CaseGrid = styled.div<{ $reverse: boolean }>`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(420px, 1.05fr);
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
    gap: clamp(22px, 4svh, 34px);
    align-items: start;

    > :first-child {
      order: 2;
    }

    > :last-child {
      order: 1;
    }
  }

  @media (max-width: 599px) {
    gap: clamp(14px, 2.6svh, 22px);
  }
`;

const CaseCopy = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 899px) {
    max-width: 680px;
  }
`;

const Meta = styled.span`
  display: inline-flex;
  width: fit-content;
  min-height: 32px;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: ${palette.accent};
  padding: 7px 12px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 0.76rem;
  font-weight: 800;
`;

const AnimatedTitle = styled(Typography)<{ $active: boolean }>`
  && {
    max-width: 680px;
    margin-top: 24px;
    color: ${palette.text};
    font-size: clamp(2.55rem, 4.95vw, 5.15rem);
    font-weight: 900;
    letter-spacing: -0.055em;
    line-height: 0.98;
    overflow-wrap: break-word;
    text-wrap: balance;
    transform: scale(${(props) => (props.$active ? 0.96 : 1)});

    ${(props) =>
      props.$active &&
      css`
        animation: ${titleScale} 1100ms forwards cubic-bezier(0.5, 1, 0.89, 1);
      `}

    @media (max-width: 599px) {
      margin-top: 16px;
      font-size: clamp(1.95rem, 9.2vw, 2.45rem);
      letter-spacing: -0.04em;
      line-height: 1;
    }

    @media (max-width: 599px) and (max-height: 760px) {
      margin-top: 12px;
      font-size: clamp(1.72rem, 8.3vw, 2.08rem);
      line-height: 0.98;
    }

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      transform: none;
    }
  }
`;

const Word = styled.span<{ $active: boolean }>`
  display: inline-block;
  margin-right: 0.18em;
  opacity: ${(props) => (props.$active ? 0 : 1)};
  filter: ${(props) => (props.$active ? 'blur(4px)' : 'blur(0)')};
  transform: ${(props) => (props.$active ? 'translateY(18px)' : 'translateY(0)')};

  ${(props) =>
    props.$active &&
    css`
      animation: ${wordFadeIn} 780ms calc(var(--word-index) * 72ms) forwards
        cubic-bezier(0.11, 0, 0.5, 0);
    `}

  &:last-child {
    margin-right: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    filter: none;
    transform: none;
    animation: none;
  }
`;

const Description = styled(Typography)`
  && {
    max-width: 540px;
    margin-top: 24px;
    color: ${palette.textMuted};
    font-size: clamp(1.04rem, 1.55vw, 1.25rem);
    line-height: 1.58;
    text-wrap: pretty;

    @media (max-width: 599px) {
      margin-top: 14px;
      font-size: 0.98rem;
      line-height: 1.48;
    }

    @media (max-width: 599px) and (max-height: 760px) {
      margin-top: 10px;
      font-size: 0.9rem;
      line-height: 1.36;
    }
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;

  @media (max-width: 599px) {
    margin-top: 16px;
  }

  @media (max-width: 599px) and (max-height: 760px) {
    gap: 6px;
    margin-top: 12px;
  }
`;

const Tag = styled.span`
  display: inline-flex;
  min-height: 32px;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.045);
  color: ${palette.textMuted};
  padding: 7px 11px;
  font-size: 0.78rem;
  font-weight: 760;

  @media (max-width: 599px) {
    min-height: 30px;
    padding: 6px 10px;
  }

  @media (max-width: 599px) and (max-height: 760px) {
    min-height: 28px;
    padding: 5px 9px;
    font-size: 0.72rem;
  }
`;

const CaseLink = styled.a<{ $accent: string }>`
  display: inline-flex;
  width: fit-content;
  min-height: 46px;
  align-items: center;
  gap: 9px;
  margin-top: 30px;
  color: ${(props) => props.$accent};
  text-decoration: none;
  font-weight: 860;
  transition:
    color 180ms ease,
    transform 180ms ease;

  svg {
    transition: transform 180ms ease;
  }

  &:hover,
  &:focus-visible {
    color: ${palette.text};
    outline: none;
    transform: translateY(-2px);

    svg {
      transform: translate(3px, -3px);
    }
  }

  &:active {
    transform: scale(0.96);
  }

  @media (max-width: 599px) {
    min-height: 42px;
    margin-top: 18px;
  }

  @media (max-width: 599px) and (max-height: 760px) {
    min-height: 36px;
    margin-top: 12px;
  }
`;

const PerspectiveBox = styled.div`
  height: min(62vh, 560px);
  min-height: 430px;
  perspective: 2000px;

  &:hover .case-card-even {
    transform: rotateY(10deg) rotateX(7deg);
  }

  &:hover .case-card-odd {
    transform: rotateY(-10deg) rotateX(7deg);
  }

  @media (max-width: 899px) {
    height: clamp(300px, 56vw, 430px);
    min-height: 0;
  }

  @media (max-width: 599px) {
    height: clamp(268px, 72vw, 330px);
  }

  @media (max-width: 599px) and (max-height: 760px) {
    height: clamp(196px, 31svh, 232px);
  }
`;

const CaseCard3d = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 430px;
  transform-style: preserve-3d;
  transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;

  @media (max-width: 899px) {
    min-height: 100%;
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
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 30px;
  background: #0a0a0a;
  box-shadow: 0 34px 110px rgba(0, 0, 0, 0.46);

  @media (max-width: 599px) {
    border-radius: 22px;
  }
`;

const BrowserTop = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  gap: 9px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: #111111;
  padding: 0 16px;

  @media (max-width: 599px) {
    height: 42px;
    padding: 0 12px;
  }
`;

const Dot = styled.span<{ $accent?: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => props.$accent ?? 'rgba(255, 255, 255, 0.14)'};
`;

const Url = styled.div`
  display: flex;
  height: 26px;
  min-width: 0;
  max-width: min(430px, 72%);
  align-items: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.42);
  padding: 0 12px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 0.68rem;
  margin-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BrowserBody = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
  background: #111111;
`;

const PreviewImage = styled.img<{ $position?: string }>`
  display: block;
  width: 100%;
  height: 100%;
  min-height: 380px;
  object-fit: cover;
  object-position: ${(props) => props.$position ?? 'center top'};
  outline: 1px solid rgba(255, 255, 255, 0.1);
  transform: translateZ(40px) scale(1.015);
  transition:
    transform 520ms cubic-bezier(0.23, 1, 0.32, 1),
    filter 520ms ease;
  will-change: transform;

  ${CaseCard3d}:hover & {
    transform: translateZ(56px) scale(1.045);
    filter: saturate(1.04) contrast(1.02);
  }

  @media (max-width: 899px) {
    min-height: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    transition: none;
  }
`;

const ImageScrim = styled.div`
  position: absolute;
  inset: auto 0 0;
  height: 32%;
  background: linear-gradient(180deg, transparent, rgba(5, 5, 5, 0.82));
  pointer-events: none;
`;

const DeployedBadge = styled.div<{ $accent: string }>`
  position: absolute;
  right: 34px;
  bottom: 34px;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  border-radius: 16px;
  background: ${(props) => props.$accent};
  color: ${palette.ink};
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.34);
  padding: 13px 16px;
  font-weight: 900;
  transform: translateZ(90px);

  svg {
    font-size: 20px;
  }

  @media (max-width: 599px) {
    right: 20px;
    bottom: 20px;
    border-radius: 14px;
    padding: 10px 12px;
    font-size: 0.82rem;
  }
`;

function AnimatedWords({ active, text }: AnimatedWordsProps) {
  const words = text.split(' ');

  return (
    <AnimatedTitle $active={active} variant="h2" aria-label={text}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <Word
            $active={active}
            aria-hidden="true"
            style={{ '--word-index': index } as CSSProperties}
          >
            {word}
          </Word>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </AnimatedTitle>
  );
}

function CaseVisual({ project, index }: { project: Project; index: number }) {
  return (
    <PerspectiveBox aria-label={`Print do hero do projeto ${project.title}`}>
      <CaseCard3d className={index % 2 === 0 ? 'case-card-even' : 'case-card-odd'}>
        <Browser>
          <BrowserTop>
            <Dot $accent={project.accent} />
            <Dot />
            <Dot />
            <Url>{project.previewLabel}</Url>
          </BrowserTop>

          <BrowserBody>
            <PreviewImage
              src={project.image}
              alt={project.imageAlt}
              $position={project.imagePosition}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <ImageScrim aria-hidden="true" />
            <DeployedBadge $accent={project.accent}>
              <CheckCircleRoundedIcon />
              Preview público
            </DeployedBadge>
          </BrowserBody>
        </Browser>
      </CaseCard3d>
    </PerspectiveBox>
  );
}

function CaseContent({
  active,
  index,
  project,
}: {
  active: boolean;
  index: number;
  project: Project;
}) {
  return (
    <CaseGrid $reverse={index % 2 !== 0}>
      <CaseCopy>
        <Meta>
          0{project.id} / {project.category}
        </Meta>
        <AnimatedWords active={active} text={project.title} />
        <Description>{project.desc}</Description>

        <TagRow>
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagRow>

        <CaseLink href={project.previewUrl} target="_blank" rel="noreferrer" $accent={project.accent}>
          Abrir prévia pública
          <ArrowOutwardRoundedIcon />
        </CaseLink>
      </CaseCopy>

      <CaseVisual project={project} index={index} />
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
      const nextIndex = Math.min(projects.length - 1, Math.floor(progress * projects.length));

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
    <Section id="cases" ref={sectionRef} aria-label="Portfólio de projetos publicados">
      <LegacyAnchor id="projetos" aria-hidden="true" />

      <StickyStage>
        {projects.map((project, index) => {
          const isActive = activeCase === index;

          return (
            <CaseSlide
              key={project.id}
              $active={isActive}
              $glow={project.glow}
              aria-hidden={!isActive}
            >
              <Container maxWidth="xl">
                <CaseContent active={isActive} project={project} index={index} />
              </Container>
            </CaseSlide>
          );
        })}
      </StickyStage>

    </Section>
  );
}
