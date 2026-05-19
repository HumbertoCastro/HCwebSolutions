import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styled from 'styled-components';
import { motionTokens } from '../motion';

const Shell = styled(motion.div)`
  min-height: 100vh;
  width: 100%;
`;

type PageTransitionProps = {
  children: ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <Shell>{children}</Shell>;
  }

  return (
    <Shell
      initial={{ opacity: 0, x: 26 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: motionTokens.duration.base, ease: motionTokens.ease }}
    >
      {children}
    </Shell>
  );
}
