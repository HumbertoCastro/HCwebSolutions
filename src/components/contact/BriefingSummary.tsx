import { Typography } from '@mui/material';
import styled from 'styled-components';
import { palette } from '../../theme';
import type { ContactFormData } from '../../types';

const Summary = styled.article<{ $compact?: boolean }>`
  border: 1px solid rgba(8, 203, 0, 0.24);
  border-radius: ${(props) => (props.$compact ? '18px' : '24px')};
  background:
    radial-gradient(circle at 90% 0%, rgba(8, 203, 0, 0.13), transparent 34%),
    rgba(7, 10, 18, 0.82);
  padding: ${(props) => (props.$compact ? '16px' : '20px')};
`;

const SummaryGrid = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 16px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(92px, 0.34fr) minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  padding: 10px 0;
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

type BriefingSummaryProps = {
  values: ContactFormData;
  compact?: boolean;
};

const formatValue = (value: string) => value || 'aguardando resposta';

export function BriefingSummary({ values, compact = false }: BriefingSummaryProps) {
  const rows = [
    { label: 'Tipo', value: formatValue(values.solutionType) },
    { label: 'Objetivo', value: formatValue(values.goal) },
    { label: 'Prazo', value: formatValue(values.deadline) },
    { label: 'Orçamento', value: formatValue(values.budget) },
  ];

  return (
    <Summary $compact={compact}>
      <Typography color={palette.accent} fontWeight={900} fontSize="0.8rem" mb={0.5}>
        Seu briefing
      </Typography>
      <Typography color={palette.text} fontWeight={920} fontSize={compact ? '1.05rem' : '1.35rem'}>
        Resumo do projeto
      </Typography>

      <SummaryGrid>
        {rows.map((row) => {
          const isEmpty = row.value === 'aguardando resposta';
          return (
            <Row key={row.label}>
              <Typography color={palette.textMuted} fontSize="0.78rem" fontWeight={820}>
                {row.label}
              </Typography>
              <Typography color={isEmpty ? palette.textSoft : palette.text} fontWeight={760} lineHeight={1.45}>
                {isEmpty ? <Empty>{row.value}</Empty> : row.value}
              </Typography>
            </Row>
          );
        })}
      </SummaryGrid>
    </Summary>
  );
}
