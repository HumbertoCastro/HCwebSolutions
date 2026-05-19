import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Container, Typography } from '@mui/material';
import styled from 'styled-components';
import { projects } from '../data/projects';
import { palette } from '../theme';
import type { Project } from '../types';
import { Reveal } from './Reveal';

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: clamp(76px, 9vw, 136px) 0;
  background:
    radial-gradient(circle at 88% 12%, rgba(8, 203, 0, 0.12), transparent 32%),
    ${palette.background};
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(280px, 0.46fr);
  gap: 28px;
  align-items: end;
  margin-bottom: clamp(34px, 5vw, 62px);

  @media (max-width: 899px) {
    grid-template-columns: 1fr;
  }
`;

const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  min-height: 34px;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  border: 1px solid rgba(8, 203, 0, 0.28);
  background: rgba(8, 203, 0, 0.08);
  color: ${palette.text};
  padding: 7px 12px;
  font-size: 0.78rem;
  font-weight: 840;
  margin-bottom: 18px;
`;

const Title = styled(Typography)`
  && {
    max-width: 980px;
    font-size: clamp(2.55rem, 5.7vw, 6.4rem);
    line-height: 0.96;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const CaseCard = styled.article`
  position: relative;
  min-height: 100%;
  border: 1px solid ${palette.border};
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03)),
    ${palette.surface};
  overflow: hidden;
  transition:
    transform 320ms ease,
    border-color 320ms ease,
    box-shadow 320ms ease,
    background 320ms ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    border-radius: inherit;
    border: 1px solid rgba(8, 203, 0, 0.38);
    pointer-events: none;
    transition: opacity 320ms ease;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(8, 203, 0, 0.35);
    box-shadow: 0 28px 80px rgba(0, 0, 0, 0.24);
    background:
      linear-gradient(180deg, rgba(8, 203, 0, 0.08), rgba(255, 255, 255, 0.035)),
      ${palette.surface};
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 599px) {
    border-radius: 22px;
  }
`;

const Visual = styled.div`
  padding: clamp(16px, 2.5vw, 28px);
  background:
    radial-gradient(circle at 80% 24%, rgba(8, 203, 0, 0.18), transparent 28%),
    #e8ebef;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Mockup = styled.div`
  min-height: clamp(270px, 30vw, 370px);
  border-radius: 20px;
  overflow: hidden;
  background: #fafbfc;
  color: ${palette.ink};
  box-shadow: 0 20px 60px rgba(7, 10, 18, 0.16);
`;

const MockupTop = styled.div`
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid rgba(7, 10, 18, 0.08);
  background: rgba(255, 255, 255, 0.78);
`;

const Dots = styled.div`
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

const AccentPill = styled.span`
  border-radius: 999px;
  background: ${palette.ink};
  color: ${palette.text};
  padding: 8px 11px;
  font-size: 0.72rem;
  font-weight: 860;
`;

const MockupBody = styled.div`
  display: grid;
  grid-template-columns: 0.92fr 1fr;
  gap: 16px;
  padding: clamp(16px, 2.3vw, 24px);

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const PreviewHero = styled.div`
  min-height: 214px;
  border-radius: 22px;
  padding: 18px;
  background:
    radial-gradient(circle at 80% 12%, rgba(8, 203, 0, 0.24), transparent 28%),
    ${palette.ink};
  color: ${palette.text};
`;

const MiniCta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  width: fit-content;
  min-height: 38px;
  margin-top: 18px;
  border-radius: 999px;
  background: ${palette.accent};
  color: ${palette.ink};
  padding: 8px 12px;
  font-size: 0.78rem;
  font-weight: 900;
`;

const PreviewStack = styled.div`
  display: grid;
  gap: 10px;
`;

const PreviewItem = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(7, 10, 18, 0.08);
  background: #ffffff;
  padding: 13px;
`;

const Line = styled.span<{ $width: string; $accent?: boolean }>`
  display: block;
  width: ${(props) => props.$width};
  height: 10px;
  border-radius: 999px;
  background: ${(props) => (props.$accent ? palette.accent : 'rgba(7, 10, 18, 0.12)')};
`;

const Content = styled.div`
  display: grid;
  gap: 18px;
  padding: clamp(22px, 3vw, 30px);
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

const Segment = styled.span`
  color: ${palette.accent};
  font-size: 0.82rem;
  font-weight: 860;
`;

const Result = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border-radius: 999px;
  background: rgba(8, 203, 0, 0.1);
  border: 1px solid rgba(8, 203, 0, 0.25);
  color: ${palette.text};
  padding: 8px 11px;
  font-size: 0.82rem;
  font-weight: 850;
`;

const InsightGrid = styled.div`
  display: grid;
  gap: 12px;
`;

const Insight = styled.div`
  display: grid;
  gap: 5px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  display: inline-flex;
  min-height: 31px;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 6px 10px;
  color: ${palette.textMuted};
  font-size: 0.78rem;
  font-weight: 750;
`;

function CaseVisual({ project }: { project: Project }) {
  return (
    <Visual>
      <Mockup>
        <MockupTop>
          <Dots aria-hidden="true">
            <span />
            <span />
            <span />
          </Dots>
          <AccentPill>{project.accent}</AccentPill>
        </MockupTop>
        <MockupBody>
          <PreviewHero>
            <Typography color={palette.accent} fontSize="0.76rem" fontWeight={850}>
              {project.segment}
            </Typography>
            <Typography variant="h3" fontSize="clamp(1.35rem, 2.8vw, 2rem)" lineHeight={1.08} mt={1.1}>
              {project.title}
            </Typography>
            <MiniCta>
              Pedir orçamento <ArrowOutwardIcon sx={{ fontSize: 16 }} />
            </MiniCta>
          </PreviewHero>
          <PreviewStack aria-hidden="true">
            <PreviewItem>
              <Line $width="82%" />
              <Line $width="56%" $accent style={{ marginTop: 11 }} />
            </PreviewItem>
            <PreviewItem>
              <Line $width="92%" />
              <Line $width="68%" style={{ marginTop: 11 }} />
            </PreviewItem>
            <PreviewItem>
              <Line $width="48%" $accent />
            </PreviewItem>
          </PreviewStack>
        </MockupBody>
      </Mockup>
    </Visual>
  );
}

export function PortfolioSection() {
  return (
    <Section id="projetos" aria-labelledby="projetos-title">
      <Container maxWidth="xl">
        <Reveal>
          <HeaderRow>
            <div>
              <Eyebrow>
                <AutoGraphRoundedIcon sx={{ fontSize: 17 }} />
                Cenários de sucesso
              </Eyebrow>
              <Title id="projetos-title" variant="h2">
                Cases pensados para pequenos negócios venderem melhor
              </Title>
            </div>
            <Typography color={palette.textMuted} fontSize="1.08rem" lineHeight={1.7}>
              Exemplos de jornadas que a HC Web Solutions pode construir: presença profissional,
              captação, WhatsApp organizado e sistemas para tirar processos do improviso.
            </Typography>
          </HeaderRow>
        </Reveal>

        <ProjectsGrid>
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.07}>
              <CaseCard>
                <CaseVisual project={project} />
                <Content>
                  <MetaRow>
                    <Segment>{project.segment}</Segment>
                    <Result>
                      <CheckCircleRoundedIcon sx={{ fontSize: 18 }} />
                      {project.result}
                    </Result>
                  </MetaRow>

                  <InsightGrid>
                    <Insight>
                      <Typography color={palette.textMuted} fontSize="0.78rem" fontWeight={850}>
                        Desafio
                      </Typography>
                      <Typography color={palette.text} lineHeight={1.62}>
                        {project.problem}
                      </Typography>
                    </Insight>
                    <Insight>
                      <Typography color={palette.textMuted} fontSize="0.78rem" fontWeight={850}>
                        Solução
                      </Typography>
                      <Typography color={palette.text} lineHeight={1.62}>
                        {project.solution}
                      </Typography>
                    </Insight>
                  </InsightGrid>

                  <TagRow>
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagRow>
                </Content>
              </CaseCard>
            </Reveal>
          ))}
        </ProjectsGrid>
      </Container>
    </Section>
  );
}
