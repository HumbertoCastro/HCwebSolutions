import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { palette } from '../../theme';
import type { ContactFormData } from '../../types';

const Panel = styled.aside<{ $compact?: boolean }>`
  position: ${(props) => (props.$compact ? 'relative' : 'sticky')};
  top: ${(props) => (props.$compact ? 'auto' : '96px')};
  overflow: hidden;
  border: 1px solid rgba(8, 203, 0, 0.22);
  border-radius: 24px;
  background:
    radial-gradient(circle at 16% 0%, rgba(8, 203, 0, 0.2), transparent 32%),
    linear-gradient(155deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.032)),
    #070a12;
  padding: ${(props) => (props.$compact ? '16px' : '22px')};
  box-shadow: ${(props) => (props.$compact ? 'none' : '0 28px 90px rgba(0, 0, 0, 0.28)')};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 34px 34px;
    mask-image: linear-gradient(145deg, black, transparent 74%);
    pointer-events: none;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const SummaryGrid = styled.div`
  display: grid;
  gap: 8px;
  margin: 16px 0;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  padding: 9px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 430px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

const Empty = styled.span`
  color: ${palette.textSoft};
  font-style: italic;
`;

const Flow = styled.ol`
  list-style: none;
  display: grid;
  gap: 8px;
  padding: 0;
  margin: 18px 0 0;
`;

const FlowItem = styled.li`
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 9px;
  align-items: center;
  color: ${palette.textMuted};
  font-size: 0.86rem;
  line-height: 1.35;

  svg {
    color: ${palette.accent};
    font-size: 19px;
  }
`;

const flow = [
  'Você envia o briefing',
  'Eu analiso o melhor caminho',
  'Te chamo no WhatsApp',
  'Definimos escopo e orçamento',
];

type ContactSummaryPanelProps = {
  values: ContactFormData;
  compact?: boolean;
};

const formatValue = (value: string) => value || 'Aguardando resposta';

export function ContactSummaryPanel({ values, compact = false }: ContactSummaryPanelProps) {
  const rows = [
    { label: 'Nome', value: formatValue(values.name.trim()) },
    { label: 'Tipo', value: formatValue(values.solutionType) },
    { label: 'Objetivo', value: formatValue(values.goal) },
    { label: 'Prazo', value: formatValue(values.deadline) },
    { label: 'Orçamento', value: formatValue(values.budget) },
  ];

  return (
    <Panel $compact={compact}>
      <Content>
        <Typography color={palette.accent} fontWeight={900} fontSize="0.78rem" mb={0.7}>
          Resumo do seu briefing
        </Typography>
        <Typography variant="h2" fontSize={compact ? '1.18rem' : 'clamp(1.45rem, 2vw, 2rem)'}>
          Um retrato rápido do projeto
        </Typography>

        <SummaryGrid>
          {rows.map((row) => {
            const isEmpty = row.value === 'Aguardando resposta';
            return (
              <Row key={row.label}>
                <Typography color={palette.textMuted} fontSize="0.78rem" fontWeight={820}>
                  {row.label}
                </Typography>
                <Typography color={isEmpty ? palette.textSoft : palette.text} fontWeight={760} lineHeight={1.4}>
                  {isEmpty ? <Empty>{row.value}</Empty> : row.value}
                </Typography>
              </Row>
            );
          })}
        </SummaryGrid>

        <Typography color={palette.textMuted} lineHeight={1.58} fontSize="0.92rem">
          Com essas informações, eu consigo entender seu momento e te responder com uma direção
          mais precisa.
        </Typography>

        <Flow aria-label="Fluxo depois do envio">
          {flow.map((item) => (
            <FlowItem key={item}>
              <CheckCircleRoundedIcon />
              <span>{item}</span>
            </FlowItem>
          ))}
        </Flow>
      </Content>
    </Panel>
  );
}
