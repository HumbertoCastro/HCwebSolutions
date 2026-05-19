import { useState, type CSSProperties, type MouseEvent } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { Typography } from '@mui/material';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import styled from 'styled-components';
import { palette } from '../../theme';
import type { ContactBriefingValues } from '../../types';
import { BriefingSummary } from './BriefingSummary';
import { ContactSummaryCard } from './ContactSummaryCard';

const Panel = styled(motion.aside)`
  position: sticky;
  top: 96px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 32px;
  background:
    radial-gradient(circle at 16% 8%, rgba(8, 203, 0, 0.17), transparent 28%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.035));
  padding: clamp(20px, 2.4vw, 28px);
  min-height: auto;
  max-height: calc(100vh - 118px);
  overflow-y: auto;
  box-shadow: 0 34px 110px rgba(0, 0, 0, 0.32);
  scrollbar-width: thin;
  scrollbar-color: rgba(8, 203, 0, 0.35) transparent;

  @media (max-width: 1023px) {
    position: relative;
    top: auto;
    max-height: none;
    min-height: auto;
    border-radius: 26px;
    padding: 18px;
  }
`;

const Spotlight = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: var(--visual-spotlight-opacity, 0);
  background: radial-gradient(
    circle 320px at var(--visual-mouse-x, 50%) var(--visual-mouse-y, 30%),
    rgba(8, 203, 0, 0.16),
    transparent 72%
  );
  transition: opacity 220ms ease;

  @media (max-width: 899px), (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 1;
`;

const Badge = styled.span`
  display: inline-flex;
  width: fit-content;
  min-height: 34px;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 7px 12px;
  color: ${palette.text};
  background: rgba(8, 203, 0, 0.08);
  border: 1px solid rgba(8, 203, 0, 0.3);
  font-size: 0.78rem;
  font-weight: 820;
`;

const HeroCard = styled(motion.div)`
  margin-top: 18px;
  border-radius: 24px;
  border: 1px solid rgba(8, 203, 0, 0.24);
  background: ${palette.ink};
  padding: clamp(18px, 2.4vw, 24px);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.24);
`;

const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  margin-top: 14px;
  padding: 10px 13px;
  color: ${palette.ink};
  background: ${palette.accent};
  font-size: 0.82rem;
  font-weight: 900;
`;

const CardsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 14px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Flow = styled(motion.div)`
  margin-top: 16px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.22);
  padding: 16px;
`;

const FlowSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-top: 16px;

  @media (max-width: 520px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Step = styled(motion.div)`
  position: relative;
  min-height: 94px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.055);
  padding: 14px;

  svg {
    color: ${palette.accent};
    font-size: 24px;
    margin-bottom: 12px;
  }
`;

const steps = [
  { label: 'Ideia', icon: <LightbulbOutlinedIcon /> },
  { label: 'Planejamento', icon: <TuneOutlinedIcon /> },
  { label: 'Desenvolvimento', icon: <TaskAltOutlinedIcon /> },
  { label: 'Publicação', icon: <RocketLaunchOutlinedIcon /> },
];

const cards = [
  { title: 'Próximo passo', value: 'Diagnóstico inicial' },
  { title: 'Resultado esperado', value: 'Mais presença e contatos' },
];

type ContactVisualPanelProps = {
  values: ContactBriefingValues;
};

export function ContactVisualPanel({ values }: ContactVisualPanelProps) {
  const [mouse, setMouse] = useState({ x: 50, y: 30, active: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
      active: 1,
    });
  };

  const spotlightStyle = {
    '--visual-mouse-x': `${mouse.x}%`,
    '--visual-mouse-y': `${mouse.y}%`,
    '--visual-spotlight-opacity': mouse.active,
  } as CSSProperties;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.25,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Panel
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse((current) => ({ ...current, active: 0 }))}
      initial={prefersReducedMotion ? false : { opacity: 0, x: 34 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Spotlight style={spotlightStyle} />
      <Content variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <Badge>
            <CheckCircleOutlineIcon sx={{ fontSize: 17 }} />
            Processo consultivo
          </Badge>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography variant="h2" fontSize="clamp(1.65rem, 2.9vw, 3rem)" lineHeight={1.02} mt={2}>
            Seu projeto começa com clareza
          </Typography>
          <Typography color={palette.textMuted} lineHeight={1.65} mt={1.6}>
            Quanto melhor entendemos seu objetivo, mais precisa é a solução: uma página para
            captar contatos, um site para transmitir confiança ou um sistema para organizar sua
            operação.
          </Typography>
        </motion.div>

        <HeroCard variants={itemVariants}>
          <Typography color={palette.textMuted} fontSize="0.82rem" fontWeight={820}>
            Briefing recebido
          </Typography>
          <Typography fontSize="clamp(1.45rem, 2.15vw, 2rem)" fontWeight={950} lineHeight={1.04} mt={1}>
            Pronto para análise
          </Typography>
          <StatusPill>
            Diagnóstico inicial <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </StatusPill>
        </HeroCard>

        <motion.div variants={itemVariants} style={{ marginTop: 16 }}>
          <BriefingSummary values={values} />
        </motion.div>

        <CardsGrid variants={containerVariants}>
          {cards.map((card) => (
            <motion.div variants={itemVariants} key={card.title}>
              <ContactSummaryCard title={card.title} value={card.value} />
            </motion.div>
          ))}
        </CardsGrid>

        <Flow variants={itemVariants}>
          <Typography fontWeight={900}>Fluxo simples e profissional</Typography>
          <FlowSteps>
            {steps.map((step, index) => (
              <Step variants={itemVariants} key={step.label}>
                {step.icon}
                <Typography color={palette.text} fontWeight={880}>
                  {step.label}
                </Typography>
                <Typography color={palette.textMuted} fontSize="0.76rem" mt={0.7}>
                  Etapa {index + 1}
                </Typography>
              </Step>
            ))}
          </FlowSteps>
        </Flow>
      </Content>
    </Panel>
  );
}
