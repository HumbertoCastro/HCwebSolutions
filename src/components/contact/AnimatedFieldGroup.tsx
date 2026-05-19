import { type ReactNode } from 'react';
import { Typography } from '@mui/material';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import styled from 'styled-components';
import { palette } from '../../theme';

const GroupShell = styled(motion.section)`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.045);
  padding: clamp(16px, 2vw, 22px);
  scroll-margin-top: 110px;
`;

const GroupHeader = styled.div`
  margin-bottom: 16px;
`;

type AnimatedFieldGroupProps = {
  title: string;
  description: string;
  children: ReactNode;
  id?: string;
};

export function AnimatedFieldGroup({ title, description, children, id }: AnimatedFieldGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <GroupShell id={id} variants={variants}>
      <GroupHeader>
        <Typography fontWeight={900} fontSize="1.02rem" color={palette.text}>
          {title}
        </Typography>
        <Typography color={palette.textMuted} lineHeight={1.6} fontSize="0.92rem" mt={0.6}>
          {description}
        </Typography>
      </GroupHeader>
      {children}
    </GroupShell>
  );
}
