import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Button, Container, Typography } from '@mui/material';
import styled from 'styled-components';
import { projects } from '../data/projects';
import { Reveal } from './Reveal';
import { palette } from '../theme';

const Section = styled.section`
  padding: clamp(76px, 9vw, 136px) 0;
  background: ${palette.background};
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(280px, 0.45fr);
  gap: 28px;
  align-items: end;
  margin-bottom: clamp(34px, 5vw, 62px);

  @media (max-width: 899px) {
    grid-template-columns: 1fr;
  }
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

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.article`
  min-height: 560px;
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

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(8, 203, 0, 0.35);
    box-shadow: 0 28px 80px rgba(0, 0, 0, 0.24);
    background:
      linear-gradient(180deg, rgba(8, 203, 0, 0.08), rgba(255, 255, 255, 0.035)),
      ${palette.surface};
  }

  @media (max-width: 599px) {
    min-height: auto;
    border-radius: 22px;
  }
`;

const Visual = styled.div`
  height: clamp(260px, 34vw, 390px);
  padding: clamp(16px, 2.5vw, 28px);
  background: #e6e8eb;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Mockup = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 18px;
  overflow: hidden;
  background: #f9fafb;
  color: ${palette.ink};
  box-shadow: 0 20px 60px rgba(7, 10, 18, 0.16);
`;

const MockupHeader = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  border-bottom: 1px solid rgba(7, 10, 18, 0.08);
  font-size: 0.78rem;
  font-weight: 850;
`;

const MockupContent = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 18px;
  padding: 22px;
  height: calc(100% - 54px);

  @media (max-width: 430px) {
    grid-template-columns: 1fr;
  }
`;

const PhoneLike = styled.div`
  align-self: stretch;
  border-radius: 24px;
  border: 8px solid ${palette.ink};
  background:
    linear-gradient(180deg, rgba(8, 203, 0, 0.22), transparent 46%),
    #ffffff;
  padding: 18px 14px;
  min-height: 210px;
`;

const Lines = styled.div`
  display: grid;
  align-content: center;
  gap: 12px;

  span {
    height: 14px;
    border-radius: 999px;
    background: rgba(7, 10, 18, 0.1);
  }

  span:nth-child(2) {
    width: 78%;
    background: rgba(7, 10, 18, 0.86);
  }

  span:nth-child(3) {
    width: 56%;
    background: ${palette.accent};
  }
`;

const Content = styled.div`
  padding: clamp(22px, 3vw, 30px);
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
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

const Metric = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  background: ${palette.ink};
  color: ${palette.text};
  padding: 9px 12px;
`;

export function PortfolioSection() {
  return (
    <Section id="projetos" aria-labelledby="projetos-title">
      <Container maxWidth="xl">
        <Reveal>
          <HeaderRow>
            <div>
              <Title id="projetos-title" variant="h2">
                Projetos e soluções já desenvolvidas
              </Title>
            </div>
            <Typography color={palette.textMuted} fontSize="1.08rem" lineHeight={1.7}>
              Experiências digitais criadas para resolver problemas reais, melhorar processos e
              gerar mais confiança para negócios.
            </Typography>
          </HeaderRow>
        </Reveal>

        <ProjectsGrid>
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.07}>
              <ProjectCard>
                <Visual>
                  <Mockup>
                    <MockupHeader>
                      <span>HC / {project.accent}</span>
                      <Metric>{project.metric}</Metric>
                    </MockupHeader>
                    <MockupContent>
                      <PhoneLike>
                        <Lines>
                          <span />
                          <span />
                          <span />
                          <span />
                        </Lines>
                      </PhoneLike>
                      <Lines>
                        <span />
                        <span />
                        <span />
                        <span />
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          endIcon={<ArrowOutwardIcon />}
                          sx={{ width: 'fit-content', mt: 1 }}
                        >
                          Conversão
                        </Button>
                      </Lines>
                    </MockupContent>
                  </Mockup>
                </Visual>

                <Content>
                  <Typography variant="h3" fontSize="clamp(1.55rem, 2.5vw, 2.35rem)" mb={1.4}>
                    {project.title}
                  </Typography>
                  <Typography color={palette.textMuted} lineHeight={1.75}>
                    {project.description}
                  </Typography>
                  <TagRow>
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagRow>
                </Content>
              </ProjectCard>
            </Reveal>
          ))}
        </ProjectsGrid>
      </Container>
    </Section>
  );
}
