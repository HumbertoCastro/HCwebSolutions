import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { ContactForm, initialContactBriefingValues } from '../components/contact/ContactForm';
import { ContactSummaryPanel } from '../components/contact/ContactSummaryPanel';
import { palette } from '../theme';

const Page = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: ${palette.background};
  color: ${palette.text};

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(circle at 82% 18%, rgba(8, 203, 0, 0.18), transparent 30%),
      linear-gradient(rgba(255, 255, 255, 0.032) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.032) 1px, transparent 1px);
    background-size:
      auto,
      64px 64px,
      64px 64px;
    mask-image: linear-gradient(to bottom, black, transparent 88%);
    pointer-events: none;
  }
`;

const TopBar = styled.header`
  position: relative;
  z-index: 2;
  padding: 18px 0 0;
`;

const TopBarInner = styled.div`
  min-height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Logo = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${palette.text};
  text-decoration: none;
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  font-weight: 920;
  white-space: nowrap;

  span {
    color: ${palette.accent};
  }
`;

const LogoIcon = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 14px 36px rgba(8, 203, 0, 0.2);
`;

const Main = styled.main`
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 76px);
  display: grid;
  align-items: center;
  padding: clamp(18px, 3vw, 34px) 0 clamp(28px, 4vw, 48px);

  @media (max-width: 1023px) {
    align-items: start;
  }
`;

const Intro = styled.div`
  max-width: 850px;
  margin-bottom: clamp(18px, 2.6vw, 28px);
`;

const Badge = styled.span`
  display: inline-flex;
  width: fit-content;
  min-height: 32px;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(8, 203, 0, 0.3);
  background: rgba(8, 203, 0, 0.08);
  color: ${palette.text};
  padding: 6px 12px;
  font-size: 0.76rem;
  font-weight: 840;
`;

const Title = styled(Typography)`
  && {
    max-width: 760px;
    font-size: clamp(2rem, 4.2vw, 4.2rem);
    line-height: 1;
    margin-top: 14px;
    text-wrap: balance;
  }
`;

const Subtitle = styled(Typography)`
  && {
    max-width: 780px;
    color: ${palette.textMuted};
    font-size: clamp(0.98rem, 1.2vw, 1.1rem);
    line-height: 1.58;
    margin-top: 14px;
  }
`;

const HelperText = styled(Typography)`
  && {
    color: ${palette.textMuted};
    line-height: 1.5;
    margin-top: 8px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(310px, 0.82fr);
  gap: clamp(18px, 2.6vw, 34px);
  align-items: start;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

const FormCard = styled.section`
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 26px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.034)),
    ${palette.surface};
  padding: clamp(18px, 2.4vw, 28px);
  box-shadow: 0 32px 100px rgba(0, 0, 0, 0.26);

  @media (max-width: 599px) {
    border-radius: 20px;
    padding: 16px;
  }
`;

const DesktopSummary = styled.div`
  display: block;

  @media (max-width: 1023px) {
    display: none;
  }
`;

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const initialPlan = searchParams.get('plano') ?? undefined;
  const [briefingValues, setBriefingValues] = useState(initialContactBriefingValues);

  return (
    <Page>
      <TopBar>
        <Container maxWidth="xl">
          <TopBarInner>
            <Logo to="/" aria-label="Voltar para a página inicial">
              <LogoIcon src="/icon.png" alt="" aria-hidden="true" />
              HC Web <span>Solutions</span>
            </Logo>
            <Button
              component={Link}
              to="/"
              variant="outlined"
              color="inherit"
              startIcon={<ArrowBackIcon />}
              aria-label="Voltar para a página inicial"
              sx={{
                color: palette.text,
                borderColor: 'rgba(255,255,255,0.18)',
                whiteSpace: 'nowrap',
                minHeight: 44,
                '&:hover': { borderColor: palette.accent, bgcolor: 'rgba(8,203,0,0.08)' },
              }}
            >
              Voltar
            </Button>
          </TopBarInner>
        </Container>
      </TopBar>

      <Main>
        <Container maxWidth="xl">
          <Intro>
            <Badge>Briefing rápido para entender seu projeto</Badge>
            <Title variant="h1">Vamos entender seu projeto?</Title>
            <Subtitle>
              Responda algumas perguntas rápidas e eu preparo uma análise inicial para indicar o
              melhor caminho para sua landing page, site ou sistema web.
            </Subtitle>
            <HelperText>Não precisa saber termos técnicos. Basta contar o que você quer alcançar.</HelperText>
          </Intro>

          <Layout>
            <FormCard>
              <ContactForm
                initialPlan={initialPlan}
                values={briefingValues}
                onValuesChange={setBriefingValues}
              />
            </FormCard>

            <DesktopSummary>
              <ContactSummaryPanel values={briefingValues} />
            </DesktopSummary>
          </Layout>
        </Container>
      </Main>
    </Page>
  );
}
