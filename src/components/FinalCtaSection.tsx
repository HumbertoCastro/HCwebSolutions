import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Container, Typography } from '@mui/material';
import styled from 'styled-components';
import { palette } from '../theme';
import { Reveal } from './Reveal';

const Section = styled.section`
  padding: clamp(64px, 8vw, 120px) 0;
  background: #f4f6f8;
  color: ${palette.ink};
`;

const CtaPanel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid rgba(7, 10, 18, 0.1);
  background: ${palette.ink};
  color: ${palette.text};
  padding: clamp(28px, 6vw, 78px);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: linear-gradient(110deg, black, transparent 72%);
    pointer-events: none;
  }
`;

const Content = styled.div`
  position: relative;
  max-width: 990px;
`;

const Title = styled(Typography)`
  && {
    font-size: clamp(2.4rem, 5.8vw, 6.2rem);
    line-height: 0.96;
  }
`;

type FinalCtaSectionProps = {
  onContactClick: () => void;
};

export function FinalCtaSection({ onContactClick }: FinalCtaSectionProps) {
  return (
    <Section aria-labelledby="final-cta-title">
      <Container maxWidth="xl">
        <Reveal>
          <CtaPanel>
            <Content>
              <Typography color={palette.accent} fontWeight={850} fontSize="0.82rem" mb={2}>
                Próximo passo
              </Typography>
              <Title id="final-cta-title" variant="h2" mb={3}>
                Vamos transformar sua ideia em uma solução web profissional?
              </Title>
              <Typography color={palette.textMuted} fontSize="1.1rem" lineHeight={1.75} mb={4}>
                Responda um briefing rápido e receba uma direção inicial para entender o melhor
                caminho: landing page, site profissional ou sistema web sob medida.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                size="large"
                onClick={onContactClick}
              >
                Solicitar orçamento agora
              </Button>
            </Content>
          </CtaPanel>
        </Reveal>
      </Container>
    </Section>
  );
}
