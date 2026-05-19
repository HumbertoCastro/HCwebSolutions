import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Container, Typography } from '@mui/material';
import styled from 'styled-components';
import { pricingPlans } from '../data/pricingPlans';
import { Reveal } from './Reveal';
import { palette } from '../theme';

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
    ${(props) => (props.$highlighted ? 'rgba(8, 203, 0, 0.5)' : palette.border)};
  background: ${(props) =>
    props.$highlighted
      ? 'linear-gradient(180deg, rgba(8, 203, 0, 0.14), rgba(255, 255, 255, 0.045))'
      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.035))'};
  padding: clamp(24px, 3vw, 34px);
  display: flex;
  flex-direction: column;
  min-height: 100%;
  box-shadow: ${(props) =>
    props.$highlighted ? '0 26px 90px rgba(8, 203, 0, 0.12)' : 'none'};
  transition:
    transform 320ms ease,
    border-color 320ms ease,
    box-shadow 320ms ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(8, 203, 0, 0.46);
    box-shadow: ${(props) =>
      props.$highlighted
        ? '0 32px 100px rgba(8, 203, 0, 0.16)'
        : '0 28px 80px rgba(0, 0, 0, 0.22)'};
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 22px;
  right: 22px;
  border-radius: 999px;
  padding: 8px 11px;
  color: ${palette.ink};
  background: ${palette.accent};
  font-size: 0.76rem;
  font-weight: 850;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 28px 0;
  display: grid;
  gap: 12px;

  li {
    display: grid;
    grid-template-columns: 22px 1fr;
    gap: 10px;
    color: ${palette.textMuted};
    line-height: 1.45;
  }

  svg {
    color: ${palette.accent};
    font-size: 19px;
    margin-top: 1px;
  }
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
            <Title id="pricing-title" variant="h2" mb={2.4}>
              Modelos de desenvolvimento para cada fase do seu negócio
            </Title>
            <Typography color={palette.textMuted} fontSize="1.1rem" lineHeight={1.75}>
              Escolha entre uma presença digital rápida, uma solução especializada ou um sistema
              completo sob medida.
            </Typography>
          </Intro>
        </Reveal>

        <Grid>
          {pricingPlans.map((plan, index) => (
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
                  maxWidth="82%"
                >
                  {plan.name}
                </Typography>
                <Typography fontSize="clamp(1.45rem, 2.4vw, 2.35rem)" fontWeight={880} mt={3}>
                  {plan.price}
                </Typography>
                <Typography color={palette.textMuted} lineHeight={1.7} mt={2}>
                  {plan.description}
                </Typography>

                <FeatureList>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </FeatureList>

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
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
