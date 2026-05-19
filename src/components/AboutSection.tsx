import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Container, Typography } from '@mui/material';
import styled from 'styled-components';
import { Reveal } from './Reveal';
import { palette } from '../theme';

const Section = styled.section`
  background: #f4f6f8;
  color: ${palette.ink};
  padding: clamp(76px, 9vw, 136px) 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(320px, 0.58fr);
  gap: clamp(32px, 6vw, 86px);
  align-items: center;

  @media (max-width: 899px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled(Typography)`
  && {
    max-width: 920px;
    font-size: clamp(2.5rem, 5.7vw, 6.1rem);
    line-height: 0.96;
    color: ${palette.ink};

    span {
      color: #aeb6c3;
    }
  }
`;

const Copy = styled(Typography)`
  && {
    max-width: 780px;
    color: #465160;
    font-size: clamp(1rem, 1.4vw, 1.16rem);
    line-height: 1.85;
  }
`;

const ProfileCard = styled.aside`
  border-radius: 28px;
  border: 1px solid rgba(7, 10, 18, 0.12);
  background: ${palette.ink};
  color: ${palette.text};
  padding: clamp(22px, 3vw, 34px);
  box-shadow: 0 24px 80px rgba(7, 10, 18, 0.16);
  transition:
    transform 320ms ease,
    border-color 320ms ease,
    box-shadow 320ms ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(8, 203, 0, 0.34);
    box-shadow: 0 30px 90px rgba(7, 10, 18, 0.22);
  }
`;

const Avatar = styled.div`
  height: 230px;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    radial-gradient(circle at 70% 24%, rgba(8, 203, 0, 0.32), transparent 22%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.02));
  display: grid;
  place-items: center;
  margin-bottom: 24px;
`;

const Initials = styled.div`
  width: 112px;
  height: 112px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: ${palette.ink};
  background: ${palette.accent};
  font-size: 2.35rem;
  font-weight: 900;
`;

const CredentialList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  display: grid;
  gap: 14px;

  li {
    display: grid;
    grid-template-columns: 22px 1fr;
    gap: 10px;
    align-items: start;
    color: ${palette.textMuted};
    line-height: 1.45;
  }

  svg {
    color: ${palette.accent};
    font-size: 20px;
    margin-top: 1px;
  }
`;

export function AboutSection() {
  const credentials = [
    '+5 anos de experiência',
    'Desenvolvedor Full Stack Sênior',
    'React, TypeScript, Node.js, Cloud e DevOps',
    'Soluções web completas',
    'Foco em pequenos negócios e operações digitais',
  ];

  return (
    <Section id="quem-somos" aria-labelledby="about-title">
      <Container maxWidth="xl">
        <Grid>
          <Reveal>
            <div>
              <Title id="about-title" variant="h2" mb={3}>
                Quem está por trás <span>da HC Web Solutions</span>
              </Title>
              <Copy mb={2.2}>
                A HC Web Solutions é liderada por Humberto Castro, desenvolvedor full stack sênior
                com mais de 5 anos de experiência no desenvolvimento de soluções web, integrações,
                infraestrutura, segurança e sistemas sob medida.
              </Copy>
              <Copy>
                O foco da marca é oferecer soluções digitais escaláveis para diferentes modelos de
                negócio, desde uma landing page profissional para validação e captação de clientes
                até sistemas web robustos com autenticação, banco de dados, integrações, dashboards e
                infraestrutura em nuvem.
              </Copy>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ProfileCard>
              <Avatar aria-hidden="true">
                <Initials>HC</Initials>
              </Avatar>
              <Typography color={palette.accent} fontWeight={850} fontSize="0.82rem" mb={1}>
                Humberto Castro
              </Typography>
              <Typography variant="h3" fontSize="clamp(1.6rem, 3vw, 2.35rem)" lineHeight={1.1}>
                Desenvolvedor Full Stack Sênior
              </Typography>
              <CredentialList>
                {credentials.map((item) => (
                  <li key={item}>
                    <CheckCircleOutlineIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </CredentialList>
            </ProfileCard>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
