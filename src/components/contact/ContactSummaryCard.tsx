import { Typography } from '@mui/material';
import styled from 'styled-components';
import { palette } from '../../theme';

const Card = styled.article`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
  padding: 16px;
  min-height: 112px;
  transition:
    transform 300ms ease,
    border-color 300ms ease,
    box-shadow 300ms ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(8, 203, 0, 0.36);
    box-shadow: 0 22px 58px rgba(0, 0, 0, 0.22);
  }
`;

type ContactSummaryCardProps = {
  title: string;
  value: string;
};

export function ContactSummaryCard({ title, value }: ContactSummaryCardProps) {
  return (
    <Card>
      <Typography color={palette.textMuted} fontSize="0.78rem" fontWeight={800} mb={1}>
        {title}
      </Typography>
      <Typography color={palette.text} fontWeight={900} lineHeight={1.18}>
        {value}
      </Typography>
    </Card>
  );
}
