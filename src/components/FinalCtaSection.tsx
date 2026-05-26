import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Container, Typography } from '@mui/material';
import styled from 'styled-components';
import { palette } from '../theme';
import { Reveal } from './Reveal';
import { DottedSurface } from './ui/dotted-surface';

const Section = styled.section`
  padding: clamp(64px, 8vw, 120px) 0;
  background: #f4f6f8;
  color: ${palette.ink};
`;

const CtaPanel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid rgba(0, 229, 40, 0.18);
  background:
    radial-gradient(circle at 18% 8%, rgba(0, 229, 40, 0.13), transparent 36%),
    radial-gradient(circle at 82% 70%, rgba(0, 229, 40, 0.1), transparent 34%),
    ${palette.ink};
  color: ${palette.text};
  padding: clamp(28px, 6vw, 78px);
  box-shadow: 0 34px 100px rgba(5, 5, 5, 0.18);
`;

const SurfaceLayer = styled(DottedSurface)`
  z-index: 0;
  opacity: 0.82;

  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
    filter: saturate(1.35);
  }
`;

const SurfaceShade = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(5, 5, 5, 0.94) 0%, rgba(5, 5, 5, 0.84) 46%, rgba(5, 5, 5, 0.5) 100%),
    radial-gradient(circle at 70% 25%, rgba(0, 229, 40, 0.14), transparent 38%),
    linear-gradient(180deg, rgba(5, 5, 5, 0.08), rgba(5, 5, 5, 0.58));

  @media (max-width: 799px) {
    background:
      linear-gradient(180deg, rgba(5, 5, 5, 0.94) 0%, rgba(5, 5, 5, 0.78) 52%, rgba(5, 5, 5, 0.9) 100%),
      radial-gradient(circle at 50% 10%, rgba(0, 229, 40, 0.14), transparent 40%);
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
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
            <SurfaceLayer
              aria-hidden="true"
              dotColor={palette.accent}
              dotOpacity={0.46}
              dotSize={5.4}
              amountX={34}
              amountY={36}
              separation={138}
              speed={0.04}
              waveHeight={42}
            />
            <SurfaceShade aria-hidden="true" />
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
