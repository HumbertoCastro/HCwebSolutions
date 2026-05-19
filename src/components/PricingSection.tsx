import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import { Button, Container, Typography } from '@mui/material';
import styled from 'styled-components';
import { pricingPlans } from '../data/pricingPlans';
import { palette } from '../theme';
import { Reveal } from './Reveal';

const Section = styled.section`
  padding: clamp(76px, 9vw, 136px) 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0)),
    ${palette.background};
`;

const Intro = styled.div`
  max-width: 980px;
  margin-bottom: clamp(34px, 5vw, 60px);
`;

const Eyebrow = styled.p`
  margin: 0 0 16px;
  color: ${palette.accent};
  font-size: 0.8rem;
  font-weight: 880;
`;

const Title = styled(Typography)`
  && {
    font-size: clamp(2.5rem, 5.6vw, 6rem);
    line-height: 0.96;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  align-items: stretch;

  > div {
    height: 100%;
  }

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

const PlanCard = styled.article<{ $highlighted?: boolean }>`
  position: relative;
  border-radius: 26px;
  border: 1px solid
    ${(props) => (props.$highlighted ? 'rgba(8, 203, 0, 0.52)' : palette.border)};
  background: ${(props) =>
    props.$highlighted
      ? 'linear-gradient(180deg, rgba(8, 203, 0, 0.14), rgba(255, 255, 255, 0.045))'
      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.035))'};
  padding: clamp(22px, 2.7vw, 30px);
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: hidden;
  box-shadow: ${(props) =>
    props.$highlighted ? '0 26px 90px rgba(8, 203, 0, 0.12)' : 'none'};
  transition:
    transform 320ms ease,
    border-color 320ms ease,
    box-shadow 320ms ease;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 3px;
    background: ${palette.accent};
    transform: scaleX(${(props) => (props.$highlighted ? 1 : 0)});
    transform-origin: left;
    transition: transform 320ms ease;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(8, 203, 0, 0.46);
    box-shadow: ${(props) =>
      props.$highlighted
        ? '0 32px 100px rgba(8, 203, 0, 0.16)'
        : '0 28px 80px rgba(0, 0, 0, 0.22)'};
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const Badge = styled.span`
  width: fit-content;
  border-radius: 999px;
  padding: 8px 11px;
  color: ${palette.ink};
  background: ${palette.accent};
  font-size: 0.76rem;
  font-weight: 850;
  margin-bottom: 14px;
`;

const TopFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0 18px;
  display: grid;
  gap: 11px;

  li {
    display: grid;
    grid-template-columns: 22px 1fr;
    gap: 10px;
    color: ${palette.text};
    line-height: 1.45;
    font-weight: 720;
  }

  svg {
    color: ${palette.accent};
    font-size: 19px;
    margin-top: 1px;
  }
`;

const DetailList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 26px;
`;

const Detail = styled.span`
  display: inline-flex;
  min-height: 30px;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  color: ${palette.textMuted};
  padding: 6px 10px;
  font-size: 0.75rem;
  font-weight: 780;
`;

type PricingSectionProps = {
  onPlanSelect: (plan: string) => void;
};

export function PricingSection({ onPlanSelect }: PricingSectionProps) {
  return (
    <Section id="planos" aria-labelledby="pricing-title">
      <Container maxWidth="xl">
        <Reveal>
          <Intro>
            <Eyebrow>Soluções para cada momento</Eyebrow>
            <Title id="pricing-title" variant="h2" mb={2.4}>
              Escolha o caminho mais simples para sair do improviso digital
            </Title>
            <Typography color={palette.textMuted} fontSize="1.1rem" lineHeight={1.75}>
              Cada plano começa com um briefing rápido. A partir dele, eu indico o formato mais
              adequado para captar contatos, apresentar serviços ou criar um sistema sob medida.
            </Typography>
          </Intro>
        </Reveal>

        <Grid>
          {pricingPlans.map((plan, index) => {
            const topFeatures = plan.features.slice(0, 4);
            const details = plan.features.slice(4, 8);

            return (
              <Reveal key={plan.name} delay={index * 0.08}>
                <PlanCard $highlighted={plan.highlighted}>
                  {plan.badge && <Badge>{plan.badge}</Badge>}
                  <Typography color={palette.accent} fontWeight={850} fontSize="0.82rem" mb={1.4}>
                    HC Web Solutions
                  </Typography>
                  <Typography
                    variant="h3"
                    fontSize="clamp(1.55rem, 2.35vw, 2.25rem)"
                    lineHeight={1.08}
                    maxWidth="92%"
                  >
                    {plan.name}
                  </Typography>
                  <Typography fontSize="clamp(1.45rem, 2.4vw, 2.35rem)" fontWeight={880} mt={3}>
                    {plan.price}
                  </Typography>
                  <Typography color={palette.textMuted} lineHeight={1.7} mt={2}>
                    {plan.description}
                  </Typography>

                  <TopFeatures>
                    {topFeatures.map((feature) => (
                      <li key={feature}>
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </TopFeatures>

                  <DetailList aria-label={`Detalhes técnicos de ${plan.name}`}>
                    {details.map((feature) => (
                      <Detail key={feature}>{feature}</Detail>
                    ))}
                  </DetailList>

                  <Button
                    variant={plan.highlighted ? 'contained' : 'outlined'}
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => onPlanSelect(plan.name)}
                    sx={{
                      mt: 'auto',
                      color: plan.highlighted ? palette.ink : palette.text,
                      borderColor: plan.highlighted ? undefined : 'rgba(255,255,255,0.2)',
                      '&:hover': {
                        borderColor: palette.accent,
                        bgcolor: plan.highlighted ? undefined : 'rgba(8,203,0,0.08)',
                      },
                    }}
                  >
                    {plan.cta}
                  </Button>
                </PlanCard>
              </Reveal>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
